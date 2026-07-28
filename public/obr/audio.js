/*
 * DCCAudio — WebRTC glue for the GM-screen → players audio broadcast.
 *
 * One broadcaster (the GM's GM-screen tab, capturing its own tab audio) sends a
 * single audio track to many receivers (each player's Owlbear extension popover)
 * over a small mesh: the GM holds one RTCPeerConnection per player, send-only;
 * each player holds one, receive-only. Signaling (SDP + ICE) rides the campaign
 * `/signal` endpoint, polled by ascending id — the same shape as the rolls log.
 *
 * Exposes two factories on window.DCCAudio:
 *   createBroadcaster({ campaignId, stream, token?, pollMs?, onCount, onError })
 *   createReceiver({ campaignId, audioEl, token?, pollMs?, onState, onError })
 *
 * `token` is the player's VTT access code (sent as x-vtt-token); omit it for the
 * GM, whose session cookie authenticates same-origin requests.
 */
(function () {
  "use strict";

  function randKey() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  function authHeaders(token, json) {
    var h = {};
    if (json) h["content-type"] = "application/json";
    if (token) h["x-vtt-token"] = token;
    return h;
  }

  var FALLBACK_ICE = [{ urls: "stun:stun.l.google.com:19302" }];

  function fetchIce(token) {
    return fetch("/api/turn-credentials", { headers: authHeaders(token, false) })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { return d && d.iceServers && d.iceServers.length ? d.iceServers : FALLBACK_ICE; })
      .catch(function () { return FALLBACK_ICE; });
  }

  // Signaling transport over the campaign /signal endpoint. Keeps its own `since`
  // cursor; poll() fetches new messages addressed to us and hands each to onMsg.
  function makeSignal(campaignId, myKey, token) {
    var base = "/api/campaigns/" + encodeURIComponent(campaignId) + "/signal";
    var since = 0;
    return {
      send: function (kind, toKey, payload) {
        return fetch(base, {
          method: "POST",
          headers: authHeaders(token, true),
          body: JSON.stringify({ fromKey: myKey, toKey: toKey || null, kind: kind, payload: payload || "" }),
          keepalive: kind === "bye",
        }).catch(function () {});
      },
      poll: function (onMsg) {
        return fetch(base + "?since=" + since + "&key=" + encodeURIComponent(myKey), {
          headers: authHeaders(token, false),
        })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (d) {
            if (!d) return;
            if (typeof d.last === "number") since = d.last;
            var msgs = d.messages || [];
            for (var i = 0; i < msgs.length; i++) onMsg(msgs[i]);
          })
          .catch(function () {});
      },
    };
  }

  // A peer wrapper that buffers ICE candidates arriving before the remote
  // description is set (they'd throw otherwise), flushing them once it is.
  function wrapPeer(pc) {
    var haveRemote = false;
    var pending = [];
    return {
      pc: pc,
      setRemote: function (desc) {
        return pc.setRemoteDescription(desc).then(function () {
          haveRemote = true;
          var q = pending; pending = [];
          return Promise.all(q.map(function (c) { return pc.addIceCandidate(c).catch(function () {}); }));
        });
      },
      addIce: function (cand) {
        if (!cand) return Promise.resolve();
        if (!haveRemote) { pending.push(cand); return Promise.resolve(); }
        return pc.addIceCandidate(cand).catch(function () {});
      },
    };
  }

  // Serialize inbound-message handling so an offer is fully applied before the
  // ICE candidates that follow it in the same poll batch.
  function serializer() {
    var chain = Promise.resolve();
    return function (fn) { chain = chain.then(fn).catch(function () {}); return chain; };
  }

  // ── Broadcaster (GM) ──────────────────────────────────────────────────────
  function createBroadcaster(opts) {
    var campaignId = opts.campaignId;
    var stream = opts.stream;
    var token = opts.token || null;
    var pollMs = opts.pollMs || 1200;
    var onCount = opts.onCount || function () {};
    var onError = opts.onError || function () {};

    var myKey = randKey();
    var signal = makeSignal(campaignId, myKey, token);
    var peers = {}; // playerKey -> wrapPeer
    var iceServers = FALLBACK_ICE;
    var pollTimer = null, beatTimer = null, stopped = false;
    var run = serializer();

    function count() {
      var n = 0;
      for (var k in peers) {
        if (!peers.hasOwnProperty(k)) continue;
        var st = peers[k].pc.connectionState;
        if (st === "connected" || st === "completed") n++;
      }
      onCount(n);
    }

    function drop(playerKey) {
      var w = peers[playerKey];
      if (!w) return;
      try { w.pc.close(); } catch (e) {}
      delete peers[playerKey];
      count();
    }

    function offerTo(playerKey) {
      if (peers[playerKey]) drop(playerKey); // re-join: start fresh
      var pc = new RTCPeerConnection({ iceServers: iceServers });
      var w = wrapPeer(pc);
      peers[playerKey] = w;

      try {
        stream.getTracks().forEach(function (t) { pc.addTrack(t, stream); });
      } catch (e) { onError(e); }

      pc.onicecandidate = function (e) {
        if (e.candidate) signal.send("ice", playerKey, JSON.stringify(e.candidate));
      };
      pc.onconnectionstatechange = function () {
        var st = pc.connectionState;
        if (st === "failed" || st === "closed" || st === "disconnected") drop(playerKey);
        else count();
      };

      return pc.createOffer()
        .then(function (offer) { return pc.setLocalDescription(offer); })
        .then(function () { return signal.send("offer", playerKey, JSON.stringify(pc.localDescription)); })
        .catch(function (e) { onError(e); drop(playerKey); });
    }

    function onMsg(m) {
      run(function () {
        if (m.kind === "hello") {
          // A player is waiting. If we already have a live peer for them, leave
          // it; otherwise (re)offer.
          var existing = peers[m.fromKey];
          if (existing) {
            var st = existing.pc.connectionState;
            if (st === "connected" || st === "completed" || st === "connecting" || st === "new") return;
          }
          return offerTo(m.fromKey);
        }
        if (m.kind === "answer") {
          var w = peers[m.fromKey];
          if (w) return w.setRemote(JSON.parse(m.payload));
          return;
        }
        if (m.kind === "ice") {
          var wi = peers[m.fromKey];
          if (wi) return wi.addIce(new RTCIceCandidate(JSON.parse(m.payload)));
          return;
        }
        if (m.kind === "bye") { drop(m.fromKey); }
      });
    }

    function beat() {
      // Owner-only heartbeat via the session cookie (same-origin). Also our
      // presence signal to players polling /api/vtt/audio.
      fetch("/api/campaigns/" + encodeURIComponent(campaignId) + "/audio-status", {
        method: "POST",
        headers: authHeaders(token, true),
        body: JSON.stringify({ live: true }),
      }).catch(function () {});
    }

    // Kick off.
    fetchIce(token).then(function (srv) {
      if (stopped) return;
      iceServers = srv;
      beat();
      beatTimer = setInterval(beat, 8000);
      var polling = false;
      pollTimer = setInterval(function () {
        if (polling) return;
        polling = true;
        signal.poll(onMsg).finally(function () { polling = false; });
      }, pollMs);
    });

    function stop() {
      if (stopped) return;
      stopped = true;
      if (pollTimer) clearInterval(pollTimer);
      if (beatTimer) clearInterval(beatTimer);
      signal.send("bye", null, "");
      // Clear the live flag so players see it end at once.
      fetch("/api/campaigns/" + encodeURIComponent(campaignId) + "/audio-status", {
        method: "POST",
        headers: authHeaders(token, true),
        body: JSON.stringify({ live: false }),
        keepalive: true,
      }).catch(function () {});
      for (var k in peers) { if (peers.hasOwnProperty(k)) { try { peers[k].pc.close(); } catch (e) {} } }
      peers = {};
    }

    window.addEventListener("beforeunload", stop);
    return { stop: stop, key: myKey };
  }

  // ── Receiver (player) ─────────────────────────────────────────────────────
  function createReceiver(opts) {
    var campaignId = opts.campaignId;
    var audioEl = opts.audioEl;
    var token = opts.token || null;
    var pollMs = opts.pollMs || 1200;
    var onState = opts.onState || function () {};
    var onError = opts.onError || function () {};

    var myKey = randKey();
    var signal = makeSignal(campaignId, myKey, token);
    var iceServers = FALLBACK_ICE;
    var wrap = null;      // current wrapPeer
    var gmKey = null;     // learned from the offer's fromKey
    var pollTimer = null, helloTimer = null, stopped = false;
    var run = serializer();

    function teardownPeer() {
      if (wrap) { try { wrap.pc.close(); } catch (e) {} wrap = null; }
    }

    function handleOffer(fromKey, offer) {
      gmKey = fromKey;
      teardownPeer(); // fresh peer per offer (new broadcast / renegotiation)
      var pc = new RTCPeerConnection({ iceServers: iceServers });
      wrap = wrapPeer(pc);

      pc.ontrack = function (e) {
        var s = e.streams && e.streams[0] ? e.streams[0] : new MediaStream([e.track]);
        audioEl.srcObject = s;
        var p = audioEl.play();
        if (p && p.catch) p.catch(function () { onState("needs-tap"); });
      };
      pc.onicecandidate = function (e) {
        if (e.candidate) signal.send("ice", gmKey, JSON.stringify(e.candidate));
      };
      pc.onconnectionstatechange = function () {
        var st = pc.connectionState;
        if (st === "connected" || st === "completed") onState("connected");
        else if (st === "failed") onState("failed");
        else if (st === "disconnected") onState("reconnecting");
        else if (st === "closed") onState("ended");
      };

      return wrap.setRemote(new RTCSessionDescription(offer))
        .then(function () { return pc.createAnswer(); })
        .then(function (ans) { return pc.setLocalDescription(ans); })
        .then(function () { return signal.send("answer", gmKey, JSON.stringify(pc.localDescription)); })
        .catch(function (e) { onError(e); });
    }

    function onMsg(m) {
      run(function () {
        if (m.kind === "offer") return handleOffer(m.fromKey, JSON.parse(m.payload));
        if (m.kind === "ice") {
          if (wrap && (!gmKey || m.fromKey === gmKey)) return wrap.addIce(new RTCIceCandidate(JSON.parse(m.payload)));
          return;
        }
        if (m.kind === "bye") {
          if (!gmKey || m.fromKey === gmKey) { teardownPeer(); audioEl.srcObject = null; onState("ended"); }
        }
      });
    }

    function hello() { signal.send("hello", null, ""); }

    onState("connecting");
    fetchIce(token).then(function (srv) {
      if (stopped) return;
      iceServers = srv;
      hello();
      // Re-announce until connected, in case the GM went live after we joined.
      helloTimer = setInterval(function () {
        var st = wrap && wrap.pc ? wrap.pc.connectionState : null;
        if (st !== "connected" && st !== "completed") hello();
      }, 3000);
      var polling = false;
      pollTimer = setInterval(function () {
        if (polling) return;
        polling = true;
        signal.poll(onMsg).finally(function () { polling = false; });
      }, pollMs);
    });

    function retryPlay() {
      var p = audioEl.play();
      if (p && p.catch) p.catch(function () {});
    }

    function stop() {
      if (stopped) return;
      stopped = true;
      if (pollTimer) clearInterval(pollTimer);
      if (helloTimer) clearInterval(helloTimer);
      signal.send("bye", gmKey, "");
      teardownPeer();
      try { audioEl.srcObject = null; } catch (e) {}
      onState("stopped");
    }

    window.addEventListener("beforeunload", stop);
    return { stop: stop, retryPlay: retryPlay, key: myKey };
  }

  window.DCCAudio = { createBroadcaster: createBroadcaster, createReceiver: createReceiver };
})();
