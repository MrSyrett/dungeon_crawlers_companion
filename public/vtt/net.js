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
        ppg: m.ppg, walls: m.walls, doors: m.doors,
        widthPx: m.widthPx, heightPx: m.heightPx, srcType: m.srcType,
        url: m.srcType === "url" ? m.src : null,
      };
    }
    function scenePayload() {
      return { t: "scene", map: mapPayload(), tokens: board.state.tokens.map(tokenWire), fog: { enabled: board.state.fog.enabled, opacity: board.state.fog.opacity } };
    }

    function sendObj(peer, obj) { if (peer.open) { try { peer.dc.send(JSON.stringify(obj)); } catch (e) {} } }
    function broadcast(obj) { Object.keys(peers).forEach(function (k) { sendObj(peers[k], obj); }); }

    function pushFull(peer) {
      sendObj(peer, scenePayload());
      var m = board.state.map;
      if (m.srcType !== "url" && typeof m.src === "string" && m.src.length) shipMap(peer, m.src);
    }
    function shipMap(peer, dataUrl) {
      sendObj(peer, { t: "mapBegin", len: dataUrl.length });
      for (var i = 0; i < dataUrl.length; i += CHUNK) sendObj(peer, { t: "mapChunk", s: dataUrl.slice(i, i + CHUNK) });
      sendObj(peer, { t: "mapEnd" });
    }

    function pushTokens() { broadcast({ t: "tokens", tokens: board.state.tokens.map(tokenWire) }); }
    function pushScene() {
      broadcast(scenePayload());
      var m = board.state.map;
      if (m.srcType !== "url" && typeof m.src === "string" && m.src.length) {
        Object.keys(peers).forEach(function (k) { if (peers[k].open) shipMap(peers[k], m.src); });
      }
    }

    function onGuestMsg(peerId, raw) {
      var msg; try { msg = JSON.parse(raw); } catch (e) { return; }
      if (msg.t === "moveToken") {
        var t = board.getToken(msg.id);
        // Authoritative check: a player may only move a token they own.
        if (t && t.ownerId === peerId) {
          board.setRemoteApply(true);
          t.x = msg.x; t.y = msg.y; if (typeof msg.rot === "number") t.rot = msg.rot;
          board.setRemoteApply(false);
          board.render();
          scheduleTokens();
        }
      } else if (msg.t === "ping") {
        board.ping(msg.x, msg.y, "#4ea3ff");
        Object.keys(peers).forEach(function (k) { if (k !== peerId) sendObj(peers[k], { t: "ping", x: msg.x, y: msg.y }); });
      }
    }

    function scheduleTokens() { if (tokenTimer) return; tokenTimer = setTimeout(function () { tokenTimer = null; pushTokens(); }, 60); }

    // Wire board changes -> broadcast. GM edits fire these; remote-apply is guarded.
    board.on("token", function () { scheduleTokens(); });
    board.on("map", function () { pushScene(); });
    board.on("scene", function () { pushScene(); });

    transport.onMessage(onSignal);
    transport.start();
    return {
      pushScene: pushScene, pushTokens: pushTokens, peerCount: peerCount, peers: peersList,
      ping: function (x, y) { broadcast({ t: "ping", x: x, y: y }); },
      stop: function () { transport.stop(); Object.keys(peers).forEach(function (k) { try { peers[k].pc.close(); } catch (e) {} }); },
    };
  }

  // ---- guest (player) -------------------------------------------------------
  function guest(opts) {
    var transport = opts.transport, board = opts.board, me = opts.me;
    var iceServers = opts.iceServers, status = opts.onStatus || function () {};
    var conn = null; // { pc, dc, ice:[], open }
    var joinTries = 0, joinTimer = null;
    var mapBuf = null, pendingMap = null;

    function join() {
      if (conn && conn.open) return;
      if (joinTries++ > 20) return;
      transport.send("*", "join", { name: opts.name || me });
      joinTimer = setTimeout(join, 1200);
    }

    function onSignal(m) {
      if (m.kind === "offer") {
        if (conn) { try { conn.pc.close(); } catch (e) {} }
        var pc = rtc(iceServers);
        conn = { pc: pc, dc: null, ice: [], open: false, hostId: m.from };
        pc.onicecandidate = function (e) { if (e.candidate) transport.send(m.from, "ice", e.candidate.toJSON()); };
        pc.ondatachannel = function (ev) { wireDc(ev.channel); };
        pc.setRemoteDescription(m.payload)
          .then(function () { return pc.createAnswer(); })
          .then(function (a) { return pc.setLocalDescription(a).then(function () { transport.send(m.from, "answer", desc(a)); }); })
          .then(function () { conn.ice.forEach(function (c) { pc.addIceCandidate(c).catch(function () {}); }); conn.ice = []; });
      } else if (m.kind === "ice" && conn) {
        if (conn.pc.remoteDescription) conn.pc.addIceCandidate(m.payload).catch(function () {});
        else conn.ice.push(m.payload);
      }
    }

    function wireDc(dc) {
      conn.dc = dc;
      dc.onopen = function () { conn.open = true; if (joinTimer) clearTimeout(joinTimer); status(true); };
      dc.onclose = function () { conn.open = false; status(false); };
      dc.onmessage = function (ev) { onHostMsg(ev.data); };
    }

    function onHostMsg(raw) {
      var msg; try { msg = JSON.parse(raw); } catch (e) { return; }
      if (msg.t === "scene") {
        board.setRemoteApply(true);
        board.setFog(msg.fog && msg.fog.enabled); board.setFogOpacity((msg.fog && msg.fog.opacity) || 1);
        board.setShowAll(false); // players always see through fog, never GM-reveal
        pendingMap = msg.map;
        if (msg.map && msg.map.srcType === "url" && msg.map.url) {
          board.loadMapState({ src: msg.map.url, srcType: "url", ppg: msg.map.ppg, walls: msg.map.walls, doors: msg.map.doors, widthPx: msg.map.widthPx, heightPx: msg.map.heightPx })
            .then(function () { board.setRemoteApply(false); });
        }
        board.syncTokens(msg.tokens || []);
        // if embedded map, applied when mapEnd arrives; keep remote flag until then
        if (!(msg.map && msg.map.srcType === "url")) board.setRemoteApply(false);
      } else if (msg.t === "tokens") {
        board.setRemoteApply(true); board.syncTokens(msg.tokens || []); board.setRemoteApply(false);
      } else if (msg.t === "ping") { board.ping(msg.x, msg.y, "#4ea3ff"); }
      else if (msg.t === "mapBegin") { mapBuf = ""; }
      else if (msg.t === "mapChunk") { if (mapBuf !== null) mapBuf += msg.s; }
      else if (msg.t === "mapEnd") {
        var m = pendingMap || {};
        board.setRemoteApply(true);
        board.loadMapState({ src: mapBuf, srcType: "embedded", ppg: m.ppg, walls: m.walls, doors: m.doors, widthPx: m.widthPx, heightPx: m.heightPx })
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

    transport.onMessage(onSignal);
    transport.start();
    join();
    return {
      connected: function () { return !!(conn && conn.open); },
      ping: function (x, y) { sendHost({ t: "ping", x: x, y: y }); },
      stop: function () { transport.stop(); if (joinTimer) clearTimeout(joinTimer); if (conn) { try { conn.pc.close(); } catch (e) {} } },
    };
  }

  function tokenWire(t) {
    return {
      id: t.id, name: t.name, imageUrl: t.imageUrl, x: t.x, y: t.y, w: t.w, h: t.h,
      rot: t.rot || 0, ownerId: t.ownerId, characterDocId: t.characterDocId, isViewer: !!t.isViewer, color: t.color,
    };
  }

  root.VTTNet = { httpTransport: httpTransport, host: host, guest: guest };
})(typeof window !== "undefined" ? window : this);
