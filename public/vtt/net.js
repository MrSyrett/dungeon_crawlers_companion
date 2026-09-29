/* Dungeon Crawler's Companion — VTT live sync (host-authoritative, peer-to-peer).
 *
 * The GM's browser is the host and the source of truth. Players connect directly
 * to it over a WebRTC data channel (browser-to-browser — no relay server). Our
 * own site does only the tiny handshake ("signaling"), over a polling channel.
 * The map image is shipped host -> player over the data channel, so a local /
 * UVTT map needs no hosting.
 *
 * v1 trust model: the host sends the full scene (all tokens) to players and each
 * player's browser renders fog locally. Good enough for a home game; hiding a
 * monster's data from a determined client is a later hardening.
 *
 * Exposes window.VTTNet = { httpTransport, host, guest }.
 */
(function (root) {
  "use strict";

  var CHUNK = 12000; // chars of the base64 map string per data-channel message

  // ---- signaling transport over the app's polling endpoint ------------------
  function httpTransport(opts) {
    var base = opts.base, campaignId = opts.campaignId, me = opts.me;
    var since = 0, stopped = false, handler = null, timer = null;
    var url = base + "/" + encodeURIComponent(campaignId);

    function send(to, kind, payload) {
      return fetch(url, {
        method: "POST", credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ from: me, to: to, kind: kind, payload: payload }),
      }).catch(function () {});
    }
    function poll() {
      if (stopped) return;
      fetch(url + "?me=" + encodeURIComponent(me) + "&since=" + since, { credentials: "same-origin" })
        .then(function (r) { return r.ok ? r.json() : { messages: [], last: since }; })
        .then(function (d) {
          if (typeof d.last === "number") since = Math.max(since, d.last);
          (d.messages || []).forEach(function (m) { if (handler) handler(m); });
        })
        .catch(function () {})
        .finally(function () { if (!stopped) timer = setTimeout(poll, opts.interval || 700); });
    }
    return {
      send: send,
      onMessage: function (cb) { handler = cb; },
      start: function () { stopped = false; poll(); },
      stop: function () { stopped = true; if (timer) clearTimeout(timer); },
    };
  }

  function rtc(iceServers) {
    return new RTCPeerConnection({ iceServers: iceServers || [{ urls: "stun:stun.l.google.com:19302" }] });
  }
  function desc(d) { return { type: d.type, sdp: d.sdp }; }

  // ---- host (GM) ------------------------------------------------------------
  function host(opts) {
    var transport = opts.transport, board = opts.board, me = opts.me;
    var iceServers = opts.iceServers, status = opts.onStatus || function () {};
    var peers = {}; // peerId -> { pc, dc, ice:[], open, name }
    var tokenTimer = null;
    // When false, GM board edits are NOT pushed to players (the GM is previewing
    // a scene on their own canvas). Going "live" sets this true and pushes once.
    var live = opts.live !== false;
    var onPeers = opts.onPeers || function () {};
    function peersList() { return Object.keys(peers).map(function (k) { return { id: k, name: peers[k].name || k, open: peers[k].open }; }); }
    function emitPeers() { onPeers(peersList()); }

    function connectTo(peerId) {
      if (peers[peerId]) { try { peers[peerId].pc.close(); } catch (e) {} }
      var pc = rtc(iceServers);
      var dc = pc.createDataChannel("vtt");
      var peer = peers[peerId] = { pc: pc, dc: dc, ice: [], open: false };
      pc.onicecandidate = function (e) { if (e.candidate) transport.send(peerId, "ice", e.candidate.toJSON()); };
      pc.onconnectionstatechange = function () {
        if (pc.connectionState === "failed" || pc.connectionState === "closed") { delete peers[peerId]; status(peerCount()); }
      };
      dc.onopen = function () { peer.open = true; pushFull(peer); status(peerCount()); emitPeers(); };
      dc.onclose = function () { peer.open = false; status(peerCount()); emitPeers(); };
      dc.onmessage = function (ev) { onGuestMsg(peerId, ev.data); };
      pc.createOffer().then(function (o) { return pc.setLocalDescription(o).then(function () { transport.send(peerId, "offer", desc(o)); }); });
    }

    function onSignal(m) {
      if (m.kind === "join") { connectTo(m.from); if (peers[m.from]) peers[m.from].name = (m.payload && m.payload.name) || m.from; }
      else if (m.kind === "answer") { var p = peers[m.from]; if (p) p.pc.setRemoteDescription(m.payload).then(function () { flushIce(p); }); }
      else if (m.kind === "ice") { var q = peers[m.from]; if (q) { if (q.pc.remoteDescription) q.pc.addIceCandidate(m.payload).catch(function () {}); else q.ice.push(m.payload); } }
    }
    function flushIce(p) { p.ice.forEach(function (c) { p.pc.addIceCandidate(c).catch(function () {}); }); p.ice = []; }

    function peerCount() { return Object.keys(peers).filter(function (k) { return peers[k].open; }).length; }

    function mapPayload() {
      var m = board.state.map;
      return {
        ppg: m.ppg, walls: m.walls, windows: m.windows, doors: m.doors, lights: m.lights,
        widthPx: m.widthPx, heightPx: m.heightPx, srcType: m.srcType,
        url: m.srcType === "url" ? m.src : null,
      };
    }
    // Players never receive tokens the GM has hidden — they're filtered out here
    // (not merely undrawn), so a hidden monster's position never leaves the GM.
    function visibleWire() {
      return board.state.tokens.filter(function (t) { return !t.hidden; }).map(tokenWire);
    }
    // `shipping` tells the guest an embedded image is (re)coming right after this
    // scene, so it applies the new geometry atomically at mapEnd instead of now.
    // `snap` carries the GM's grid-snap setting so players snap like the GM does.
    function scenePayload(shipping) {
      var p = { t: "scene", map: mapPayload(), tokens: visibleWire(), fog: { enabled: board.state.fog.enabled, opacity: board.state.fog.opacity, snap: !!(board.getSnap && board.getSnap()) } };
      p.map.shipping = !!shipping;
      return p;
    }
    function embeddedSrc() {
      var m = board.state.map;
      return (m.srcType !== "url" && typeof m.src === "string" && m.src.length) ? m.src : null;
    }

    function sendObj(peer, obj) { if (peer.open) { try { peer.dc.send(JSON.stringify(obj)); } catch (e) {} } }
    function broadcast(obj) { Object.keys(peers).forEach(function (k) { sendObj(peers[k], obj); }); }

    function pushFull(peer) {
      if (!live) return; // nothing is live yet — a joiner sees an empty board until the GM goes live
      var src = embeddedSrc();
      sendObj(peer, scenePayload(!!src));
      if (src) shipMap(peer, src);
    }
    // Ship the embedded map in chunks WITH backpressure — a big data-URL would
    // otherwise blow past the data channel's send buffer and silently drop chunks,
    // leaving the player without the new map. We pause when the buffer is high.
    function shipMap(peer, dataUrl) {
      if (!peer.open) return;
      try { peer.dc.send(JSON.stringify({ t: "mapBegin", len: dataUrl.length })); } catch (e) { return; }
      var i = 0;
      function pump() {
        if (!peer.open) return;
        try {
          while (i < dataUrl.length) {
            if (peer.dc.bufferedAmount > 4 * 1024 * 1024) { setTimeout(pump, 40); return; }
            peer.dc.send(JSON.stringify({ t: "mapChunk", s: dataUrl.slice(i, i + CHUNK) }));
            i += CHUNK;
          }
          peer.dc.send(JSON.stringify({ t: "mapEnd" }));
        } catch (e) { /* channel closed mid-ship — the guest will re-request on reconnect */ }
      }
      pump();
    }

    function pushTokens() { broadcast({ t: "tokens", tokens: visibleWire() }); }

    // Live presence overlays (laser pointer, measure line, range rings) — the GM's
    // own overlay only reaches players while the board is live; positions are
    // throttled, a "clear" (kind:null) always goes out at once.
    var overlayTimer = null, overlayPending = null;
    function pushOverlay(o) {
      if (!live && o && o.kind != null) return;
      broadcast({ t: "overlay", from: me, o: o || { kind: null } });
    }
    function hostOverlay(o) {
      if (o && o.kind != null) {
        overlayPending = o;
        if (!overlayTimer) overlayTimer = setTimeout(function () { overlayTimer = null; var pend = overlayPending; overlayPending = null; if (pend) pushOverlay(pend); }, 50);
      } else {
        overlayPending = null; if (overlayTimer) { clearTimeout(overlayTimer); overlayTimer = null; }
        pushOverlay({ kind: null });
      }
    }
    var lastShipSrc = null;
    function pushScene() {
      // Re-ship the (embedded) map image only when it actually changed — a wall,
      // door or lighting edit updates metadata without re-sending the whole map.
      var src = embeddedSrc(), willShip = !!src && src !== lastShipSrc;
      broadcast(scenePayload(willShip));
      if (willShip) {
        lastShipSrc = src;
        Object.keys(peers).forEach(function (k) { if (peers[k].open) shipMap(peers[k], src); });
      }
    }
    // Broadcast the GM's table settings (fog on/off + opacity, grid snap) so they
    // apply to every player live — not gated by `live` (they're not scene content).
    function pushSettings() {
      broadcast({ t: "settings", fog: { enabled: board.state.fog.enabled, opacity: board.state.fog.opacity }, snap: !!(board.getSnap && board.getSnap()) });
    }

    function onGuestMsg(peerId, raw) {
      var msg; try { msg = JSON.parse(raw); } catch (e) { return; }
      if (msg.t === "moveToken") {
        var t = board.getToken(msg.id);
        // Authoritative check: a player may only move a token they own, and only
        // to a spot reachable without crossing a wall/window/closed door. If the
        // path is blocked we clamp to just short of the barrier and echo back the
        // corrected position, so a tampered client can't walk through walls.
        if (t && t.ownerId === peerId) {
          var nx = msg.x, ny = msg.y;
          var c = board.clampMovement(t.x, t.y, nx, ny, board.moveRadius ? board.moveRadius(t) : 0);
          nx = c.x; ny = c.y;
          board.setRemoteApply(true);
          t.x = nx; t.y = ny; if (typeof msg.rot === "number") t.rot = msg.rot;
          board.setRemoteApply(false);
          board.render();
          scheduleTokens();
        }
      } else if (msg.t === "ping") {
        board.ping(msg.x, msg.y, "#4ea3ff");
        Object.keys(peers).forEach(function (k) { if (k !== peerId) sendObj(peers[k], { t: "ping", x: msg.x, y: msg.y }); });
      } else if (msg.t === "door") {
        // A player may open/close an UNLOCKED door; locking is GM-only.
        var d = board.state.map.doors[msg.index];
        if (d && !d.locked) { board.setDoor(msg.index, { closed: !!msg.closed }); syncDoor(msg.index); }
      } else if (msg.t === "overlay") {
        // A player's live overlay: show it to the GM and relay to other players.
        var o = msg.o || { kind: null };
        board.setOverlay(peerId, o);
        Object.keys(peers).forEach(function (k) { if (k !== peerId) sendObj(peers[k], { t: "overlay", from: peerId, o: o }); });
      }
    }
    function syncDoor(i) { var d = board.state.map.doors[i]; if (d) broadcast({ t: "door", index: i, closed: d.closed, locked: d.locked }); }

    function scheduleTokens() { if (tokenTimer) return; tokenTimer = setTimeout(function () { tokenTimer = null; if (live) pushTokens(); }, 60); }

    // Wire board changes -> broadcast, but only while live (see `live` above).
    board.on("token", function () { if (live) scheduleTokens(); });
    board.on("map", function () { if (live) pushScene(); });
    board.on("scene", function () { if (live) pushScene(); });

    transport.onMessage(onSignal);
    transport.start();
    return {
      pushScene: pushScene, pushTokens: pushTokens, peerCount: peerCount, peers: peersList,
      setLive: function (b) { live = !!b; }, isLive: function () { return live; },
      settings: pushSettings,
      overlay: hostOverlay,
      ping: function (x, y) { broadcast({ t: "ping", x: x, y: y }); },
      doorSync: function (i) { syncDoor(i); },
      stop: function () { transport.stop(); Object.keys(peers).forEach(function (k) { try { peers[k].pc.close(); } catch (e) {} }); },
    };
  }

  // ---- guest (player) -------------------------------------------------------
  function guest(opts) {
    var transport = opts.transport, board = opts.board, me = opts.me;
    var iceServers = opts.iceServers, status = opts.onStatus || function () {};
    var conn = null; // { pc, dc, ice:[], open }
    var joinTries = 0, joinTimer = null, connState = "waiting";
    var mapBuf = null, pendingMap = null;

    // Report a coarse connection state to the UI:
    //   "waiting"    — sent a join, no GM host has answered yet (GM tab not open?)
    //   "connecting" — a host answered; negotiating the peer connection
    //   "connected"  — data channel open
    //   "failed"     — the network blocked the direct connection (strict NAT / no TURN)
    function setState(s) { if (connState === s) return; connState = s; try { status(s); } catch (e) {} }

    // Keep trying to reach the GM forever, with a gentle backoff — a player who
    // opens before the GM, or during a GM refresh, should connect on their own
    // once the host is there, without a page reload.
    function join() {
      if (conn && conn.open) return;
      transport.send("*", "join", { name: opts.name || me });
      joinTries++;
      if (connState !== "connecting") setState(joinTries >= 2 ? "waiting" : "connecting");
      var delay = Math.min(6000, 1000 + joinTries * 700); // ~1.7s → 6s
      joinTimer = setTimeout(join, delay);
    }

    function onSignal(m) {
      if (m.kind === "offer") {
        if (conn) { try { conn.pc.close(); } catch (e) {} }
        setState("connecting");
        var pc = rtc(iceServers);
        conn = { pc: pc, dc: null, ice: [], open: false, hostId: m.from };
        pc.onicecandidate = function (e) { if (e.candidate) transport.send(m.from, "ice", e.candidate.toJSON()); };
        pc.ondatachannel = function (ev) { wireDc(ev.channel); };
        pc.onconnectionstatechange = function () {
          var st = pc.connectionState;
          if (st === "failed") { setState("failed"); resumeJoining(); }
          else if (st === "disconnected") { if (conn) conn.open = false; setState("waiting"); resumeJoining(); }
        };
        pc.setRemoteDescription(m.payload)
          .then(function () { return pc.createAnswer(); })
          .then(function (a) { return pc.setLocalDescription(a).then(function () { transport.send(m.from, "answer", desc(a)); }); })
          .then(function () { conn.ice.forEach(function (c) { pc.addIceCandidate(c).catch(function () {}); }); conn.ice = []; });
      } else if (m.kind === "ice" && conn) {
        if (conn.pc.remoteDescription) conn.pc.addIceCandidate(m.payload).catch(function () {});
        else conn.ice.push(m.payload);
      }
    }

    // Resume the join loop if it isn't already running (after a drop/failure).
    function resumeJoining() {
      if (conn && conn.open) return;
      if (joinTimer) return; // already looping
      joinTries = 0;
      join();
    }

    function wireDc(dc) {
      conn.dc = dc;
      dc.onopen = function () { conn.open = true; joinTries = 0; if (joinTimer) { clearTimeout(joinTimer); joinTimer = null; } setState("connected"); };
      dc.onclose = function () { if (conn) conn.open = false; setState("waiting"); resumeJoining(); };
      dc.onmessage = function (ev) { onHostMsg(ev.data); };
    }

    function onHostMsg(raw) {
      var msg; try { msg = JSON.parse(raw); } catch (e) { return; }
      if (msg.t === "scene") {
        board.setRemoteApply(true);
        board.setFog(msg.fog && msg.fog.enabled); board.setFogOpacity((msg.fog && msg.fog.opacity) || 1);
        board.setShowAll(false); // players always see through fog, never GM-reveal
        if (msg.fog && typeof msg.fog.snap === "boolean") board.setSnap(msg.fog.snap); // GM's snap setting carries
        pendingMap = msg.map;
        var mp = msg.map || {};
        if (mp.srcType === "url" && mp.url) {
          board.applyMapMeta(mp);
          board.loadMapState({ src: mp.url, srcType: "url", ppg: mp.ppg, walls: mp.walls, windows: mp.windows, doors: mp.doors, lights: mp.lights, widthPx: mp.widthPx, heightPx: mp.heightPx })
            .then(function () { board.setRemoteApply(false); });
          board.syncTokens(msg.tokens || []);
        } else if (mp.shipping) {
          // An embedded image is being (re)shipped right after this: DON'T apply the
          // new walls yet, or the player would briefly see the OLD image under the
          // NEW walls. mapEnd applies the whole map (image + walls + size) at once.
          board.syncTokens(msg.tokens || []);
          board.setRemoteApply(false);
        } else {
          // Metadata-only update (a wall/door edit; no image re-ship) — apply now.
          if (msg.map) board.applyMapMeta(msg.map);
          board.syncTokens(msg.tokens || []);
          board.setRemoteApply(false);
        }
      } else if (msg.t === "settings") {
        // GM table settings carry to players: fog on/off + opacity, grid snap.
        board.setFog(msg.fog && msg.fog.enabled); board.setFogOpacity((msg.fog && msg.fog.opacity) || 1);
        board.setShowAll(false);
        if (typeof msg.snap === "boolean") board.setSnap(msg.snap);
      } else if (msg.t === "tokens") {
        board.setRemoteApply(true); board.syncTokens(msg.tokens || []); board.setRemoteApply(false);
      } else if (msg.t === "ping") { board.ping(msg.x, msg.y, "#4ea3ff"); }
      else if (msg.t === "overlay") { board.setOverlay(msg.from || "gm", msg.o || { kind: null }); }
      else if (msg.t === "door") { board.setDoor(msg.index, { closed: msg.closed, locked: msg.locked }); }
      else if (msg.t === "mapBegin") { mapBuf = ""; }
      else if (msg.t === "mapChunk") { if (mapBuf !== null) mapBuf += msg.s; }
      else if (msg.t === "mapEnd") {
        var m = pendingMap || {};
        board.setRemoteApply(true);
        board.loadMapState({ src: mapBuf, srcType: "embedded", ppg: m.ppg, walls: m.walls, windows: m.windows, doors: m.doors, lights: m.lights, widthPx: m.widthPx, heightPx: m.heightPx })
          .then(function () { board.setRemoteApply(false); });
        mapBuf = null;
      }
    }

    function sendHost(obj) { if (conn && conn.open) { try { conn.dc.send(JSON.stringify(obj)); } catch (e) {} } }

    // A player dragging their OWN token asks the host to move it (host is
    // authoritative and echoes the result back to everyone).
    var moveTimer = {};
    board.on("token", function (t) {
      if (!t || t.ownerId !== me) return;
      if (moveTimer[t.id]) return;
      moveTimer[t.id] = setTimeout(function () {
        moveTimer[t.id] = null;
        sendHost({ t: "moveToken", id: t.id, x: t.x, y: t.y, rot: t.rot });
      }, 40);
    });

    // A player's live overlay (laser/measure/rings) to the GM, throttled; the GM
    // relays it to the other players. A "clear" always goes out at once.
    var goTimer = null, goPending = null;
    function guestOverlay(o) {
      if (o && o.kind != null) {
        goPending = o;
        if (!goTimer) goTimer = setTimeout(function () { goTimer = null; var pend = goPending; goPending = null; if (pend) sendHost({ t: "overlay", o: pend }); }, 50);
      } else {
        goPending = null; if (goTimer) { clearTimeout(goTimer); goTimer = null; }
        sendHost({ t: "overlay", o: { kind: null } });
      }
    }

    transport.onMessage(onSignal);
    transport.start();
    join();
    return {
      connected: function () { return !!(conn && conn.open); },
      state: function () { return connState; },
      overlay: guestOverlay,
      // Manual "Reconnect" — tear down any half-open peer and start fresh.
      reconnect: function () {
        if (conn) { try { conn.pc.close(); } catch (e) {} conn = null; }
        if (joinTimer) { clearTimeout(joinTimer); joinTimer = null; }
        joinTries = 0; setState("connecting"); join();
      },
      ping: function (x, y) { sendHost({ t: "ping", x: x, y: y }); },
      door: function (i, closed) { sendHost({ t: "door", index: i, closed: closed }); },
      stop: function () { transport.stop(); if (joinTimer) clearTimeout(joinTimer); if (conn) { try { conn.pc.close(); } catch (e) {} } },
    };
  }

  function tokenWire(t) {
    return {
      id: t.id, name: t.name, imageUrl: t.imageUrl, x: t.x, y: t.y, w: t.w, h: t.h,
      rot: t.rot || 0, ownerId: t.ownerId, characterDocId: t.characterDocId, isViewer: !!t.isViewer,
      color: t.color, vision: t.vision, hp: t.hp, ring: t.ring, ringColor: t.ringColor,
    };
    // NB: `hidden` is deliberately NOT wired — hidden tokens are filtered out
    // before send, so a guest never learns they exist.
  }

  root.VTTNet = { httpTransport: httpTransport, host: host, guest: guest };
})(typeof window !== "undefined" ? window : this);
