/* Dungeon Crawler's Companion — VTT in-app session UI.
 *
 * Loaded by /play/[campaignId]. Reads window.__VTT__ and builds a clean,
 * VTT-style interface over a full-bleed board: a floating left tool rail, a
 * right scene/players panel (GM), floating zoom controls, right-click token
 * menus, drag-and-drop tokens, and a character-sheet popup — wired to the board,
 * live sync (VTTNet) and scene persistence. System-agnostic throughout.
 */
(function () {
  "use strict";
  var V = window.__VTT__ || {};
  var isGM = V.role === "gm";
  var mount = document.getElementById("vtt-root");
  if (!mount) return;

  // ---- icons (24x24, stroke = currentColor) ---------------------------------
  var P = {
    select: '<path d="M5 3l6 16 2.2-6.3L19 10z"/>',
    ruler: '<path d="M3 9l6-6 12 12-6 6z"/><path d="M8 8l1.5 1.5M11 5l1.5 1.5M6 11l1.5 1.5M14 8l1.5 1.5M9 14l1.5 1.5"/>',
    ping: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>',
    fog: '<path d="M5 16a3.5 3.5 0 0 1 .6-6.9A5 5 0 0 1 15 7.5 3.75 3.75 0 0 1 17 16z"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>',
    eyeoff: '<path d="M4 4l16 16"/><path d="M9.5 5.6A10 10 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17 17 0 0 1-2.4 3.1M6.2 7.7A16 16 0 0 0 2 12s3.6 6.5 10 6.5a10 10 0 0 0 3-.4"/>',
    snap: '<path d="M6 3v8a6 6 0 0 0 12 0V3"/><path d="M4 3h4M16 3h4M6 8h12"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    players: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M15 20a6 6 0 0 0-2.5-4.4"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    zin: '<circle cx="11" cy="11" r="7"/><path d="M11 8v6M8 11h6M20 20l-3.5-3.5"/>',
    zout: '<circle cx="11" cy="11" r="7"/><path d="M8 11h6M20 20l-3.5-3.5"/>',
    fit: '<path d="M9 4H4v5M20 9V4h-5M4 15v5h5M15 20h5v-5"/>',
    sheet: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    pencil: '<path d="M4 20h4L18 10l-4-4L4 16z"/>',
    dup: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V4h12"/>',
    upload: '<path d="M12 16V4M8 8l4-4 4 4"/><path d="M4 16v4h16v-4"/>',
    link: '<path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/>',
  };
  function ico(n, size) { return '<svg viewBox="0 0 24 24" width="' + (size || 20) + '" height="' + (size || 20) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || "") + "</svg>"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }

  var PLAYER_COLORS = ["#4ea3ff", "#c8503a", "#5ac26a", "#c8a24a", "#a06ad4", "#e0863a", "#3ac6c6", "#d45a9a"];
  function colorFor(id) { var h = 0; id = String(id || ""); for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0; return PLAYER_COLORS[Math.abs(h) % PLAYER_COLORS.length]; }

  injectStyles();
  mount.innerHTML = shell();
  var $ = function (id) { return document.getElementById(id); };
  var board = window.VTTBoard($("vtt-canvas"), {});
  window.__vttBoard = board;
  var net = null, currentScene = null;
  var readout = $("vtt-readout");
  function say(h) { readout.innerHTML = h; readout.hidden = false; }

  // ---- tools ----------------------------------------------------------------
  function setTool(t) {
    board.setTool(t);
    ["select", "ruler", "pointer"].forEach(function (x) { var b = $("t-" + x); if (b) b.classList.toggle("on", x === t); });
    say(HINTS[t] || "");
  }
  var HINTS = {
    select: "Drag to pan · scroll to zoom · drag a token to move · right-click for options · double-click to open a sheet",
    ruler: "Click and drag to measure distance",
    pointer: "Click to ping a spot for everyone",
  };
  bind("t-select", function () { setTool("select"); });
  bind("t-ruler", function () { setTool("ruler"); });
  bind("t-pointer", function () { setTool("pointer"); });
  bind("t-fit", function () { board.fitToMap(); });
  bind("z-in", function () { board.zoomBy(1.2); });
  bind("z-out", function () { board.zoomBy(1 / 1.2); });
  bind("z-fit", function () { board.fitToMap(); });
  board.on("ruler", function (r) { say("<b>" + r.text + "</b>"); });
  board.on("ping", function (p) { if (net) net.ping(p.x, p.y); });
  board.on("open", function (e) { openSheetForToken(e.token); });
  board.on("context", function (e) { showContext(e); });

  // keyboard shortcuts (ignore while typing)
  window.addEventListener("keydown", function (e) {
    var el = document.activeElement, tag = el && el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || (el && el.isContentEditable)) return;
    var k = e.key.toLowerCase();
    if (k === "v") setTool("select"); else if (k === "r") setTool("ruler"); else if (k === "p") setTool("pointer");
    else if (k === "escape") { hideContext(); }
  });

  // ---- character sheet popup ------------------------------------------------
  var chars = Array.isArray(V.myCharacters) ? V.myCharacters : [];
  bind("t-sheet", function () { if (!chars.length) { say("No character sheet is linked to this campaign yet."); return; } chars.length === 1 ? openSheet(chars[0]) : pickSheet(); });
  function openSheetForToken(t) {
    // Open my own linked sheet if the token is mine; else just select it.
    if (t && t.ownerId === V.userId && chars.length) { openSheet(chars[0]); return; }
    if (chars.length === 1) openSheet(chars[0]); else if (chars.length) pickSheet();
  }
  function pickSheet() {
    var items = chars.map(function (c) { return { label: c.title || "Character", onClick: function () { openSheet(c); } }; });
    menuAt(items, window.innerWidth - 260, 60);
  }
  function openSheet(c) {
    $("sheet-title").textContent = c.title || "Character";
    $("sheet-frame").src = (V.toolBase || "/tools") + "/" + encodeURIComponent(c.tool) + "/" + encodeURIComponent(c.id);
    $("sheetpop").hidden = false;
  }
  bind("sheet-close", function () { $("sheetpop").hidden = true; $("sheet-frame").src = "about:blank"; });
  makeDraggable($("sheetpop"), $("sheet-head"));

  // ---- GM: map / tokens / fog / scenes --------------------------------------
  if (isGM) {
    bind("t-fog", function () { var on = !this.classList.contains("on"); this.classList.toggle("on", on); board.setFog(on); say(on ? "Fog on — players see only what their tokens can." : "Fog off."); });
    bind("t-reveal", function () { var on = !this.classList.contains("on"); this.classList.toggle("on", on); board.setShowAll(on); this.innerHTML = ico(on ? "eye" : "eyeoff"); this.title = on ? "GM reveal: seeing through fog" : "GM reveal: seeing fog as players do"; });
    bind("t-snap", function () { var on = !this.classList.contains("on"); this.classList.toggle("on", on); board.setSnap(on); say(on ? "Grid snap on." : "Grid snap off."); });
    bind("t-addtok", function () { $("tk-file").click(); });
    $("tk-file").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () { var t = board.addTokenAtScreen({ imageUrl: rd.result, name: f.name.replace(/\.[^.]+$/, "") }, window.innerWidth / 2, window.innerHeight / 2); if (net) net.pushTokens(); board.select(t.id); };
      rd.readAsDataURL(f); e.target.value = "";
    };
    // sidebar toggle
    bind("side-toggle", function () { toggleSide(); });
    bind("side-close", function () { toggleSide(false); });
    // scene section
    bind("m-load", function () { $("m-file").click(); });
    $("m-file").onchange = function (e) { var f = e.target.files[0]; if (!f) return; board.loadFile(f).then(function () { say("Map loaded: <b>" + esc(f.name) + "</b>"); }, function (err) { say("<b>Load failed:</b> " + esc(err.message)); }); e.target.value = ""; };
    bind("m-url", function () { var u = prompt("Map image URL (Dropbox direct link, etc.):"); if (u) board.loadImageMap(u, parseInt($("m-ppg").value, 10) || 70, "url").then(function () { say("Map loaded from link."); }, function (err) { say("<b>Load failed:</b> " + esc(err.message)); }); });
    $("m-ppg").onchange = function () { board.setPpg(parseInt(this.value, 10) || 70); };
    $("m-fpc").onchange = function () { board.setFeetPerCell(parseFloat(this.value) || 5); };
    bind("sc-new", function () { board.loadScene({ kind: "dcc-vtt-scene", version: 1, name: "New scene", map: {}, tokens: [] }); currentScene = null; setSceneName(); });
    bind("sc-save", saveScene);
    board.on("select", function (t) { /* selection reflected via context menu */ });
  }

  // ---- live sync ------------------------------------------------------------
  function startNet() {
    var transport = window.VTTNet.httpTransport({ base: V.signalBase, campaignId: V.campaignId, me: V.userId });
    if (isGM) { net = window.VTTNet.host({ transport: transport, board: board, me: V.userId, iceServers: V.iceServers, onPeers: renderPlayers }); renderPlayers([]); }
    else { net = window.VTTNet.guest({ transport: transport, board: board, me: V.userId, name: V.userName, iceServers: V.iceServers, onStatus: setConn }); setConn(false); }
  }
  function setConn(up) { var d = $("conn"); if (d) { d.className = "vtt-dot " + (up ? "live" : "wait"); d.title = up ? "Connected to your GM" : "Connecting…"; } if (up) say("Connected — your GM is running the table."); }
  function renderPlayers(list) {
    var open = (list || []).filter(function (p) { return p.open; });
    var d = $("conn"); if (d) { d.className = "vtt-dot live"; d.title = open.length + " player(s) connected"; }
    var box = $("players"); if (!box) return;
    box.innerHTML = open.length ? open.map(function (p) { return '<div class="vtt-prow"><span class="vtt-dot" style="background:' + colorFor(p.id) + '"></span>' + esc(p.name) + "</div>"; }).join("") : '<div class="vtt-empty">No players connected yet. Share the campaign join code and have players open the tabletop.</div>';
  }

  // ---- scenes (GM) ----------------------------------------------------------
  function thumbKey(id) { return "vtt-thumb-" + id; }
  function saveThumb(id) { try { var t = board.thumbnail(220); if (t) localStorage.setItem(thumbKey(id), t); } catch (e) {} }
  function getThumb(id) { try { return localStorage.getItem(thumbKey(id)); } catch (e) { return null; } }
  function loadSceneList() {
    fetch(V.sceneBase + "?campaignId=" + encodeURIComponent(V.campaignId), { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : { scenes: [] }; })
      .then(function (d) {
        var el = $("scene-list");
        if (!d.scenes || !d.scenes.length) { el.innerHTML = '<div class="vtt-empty">No saved scenes yet. Load a map, then <b>Save</b>.</div>'; return; }
        el.innerHTML = d.scenes.map(function (s) {
          var th = getThumb(s.id);
          var active = currentScene && currentScene.id === s.id;
          return '<div class="vtt-scene' + (active ? " active" : "") + '" data-id="' + s.id + '">' +
            '<div class="vtt-thumb">' + (th ? '<img src="' + th + '" alt="">' : ico("layers", 22)) + "</div>" +
            '<div class="vtt-scene-name" title="' + esc(s.title) + '">' + esc(s.title) + "</div>" +
            '<button class="vtt-mini rn" title="Rename">' + ico("pencil", 14) + "</button>" +
            '<button class="vtt-mini del" title="Delete">' + ico("trash", 14) + "</button></div>";
        }).join("");
        el.querySelectorAll(".vtt-scene").forEach(function (row) {
          var id = row.dataset.id;
          row.addEventListener("click", function (e) { if (e.target.closest(".vtt-mini")) return; loadSceneById(id); });
          row.querySelector(".del").onclick = function (e) { e.stopPropagation(); if (confirm("Delete this scene?")) delScene(id); };
          row.querySelector(".rn").onclick = function (e) { e.stopPropagation(); renameScene(id, row.querySelector(".vtt-scene-name").textContent); };
        });
      });
  }
  function loadSceneById(id) {
    fetch(V.sceneBase + "/" + id, { credentials: "same-origin" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (doc) {
      if (!doc) return;
      Promise.resolve(board.loadScene(doc.data)).then(function () { saveThumb(id); });
      currentScene = { id: doc.id, title: doc.title }; setSceneName(); loadSceneList(); say("Scene: <b>" + esc(doc.title) + "</b>");
    });
  }
  function saveScene() {
    var data = board.toScene(currentScene ? currentScene.title : "Scene");
    if (currentScene) {
      fetch(V.sceneBase + "/" + currentScene.id, { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: data.name, data: data }) })
        .then(function (r) { if (r.ok) { saveThumb(currentScene.id); say("Saved <b>" + esc(data.name) + "</b>"); loadSceneList(); } else say("<b>Save failed</b>"); });
    } else {
      var name = prompt("Name this scene:", "Scene"); if (!name) return; data.name = name;
      fetch(V.sceneBase, { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ campaignId: V.campaignId, title: name, data: data }) })
        .then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (d && d.scene) { currentScene = { id: d.scene.id, title: d.scene.title }; saveThumb(currentScene.id); setSceneName(); loadSceneList(); say("Saved <b>" + esc(name) + "</b>"); } else say("<b>Save failed</b>"); });
    }
  }
  function renameScene(id, cur) {
    var name = prompt("Rename scene:", cur); if (!name) return;
    fetch(V.sceneBase + "/" + id, { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: name }) }).then(function () { if (currentScene && currentScene.id === id) { currentScene.title = name; setSceneName(); } loadSceneList(); });
  }
  function delScene(id) { fetch(V.sceneBase + "/" + id, { method: "DELETE", credentials: "same-origin" }).then(function () { if (currentScene && currentScene.id === id) { currentScene = null; setSceneName(); } loadSceneList(); }); }
  function setSceneName() { var l = $("scene-cur"); if (l) l.textContent = currentScene ? currentScene.title : "Unsaved scene"; }

  // ---- token context menu ---------------------------------------------------
  function showContext(e) {
    var t = e.token, items = [];
    if (t) {
      if (chars.length && (t.ownerId === V.userId || isGM)) items.push({ label: "Open sheet", onClick: function () { openSheetForToken(t); } });
      if (isGM) {
        items.push({ label: "Rename…", onClick: function () { var n = prompt("Token name:", t.name || ""); if (n != null) { t.name = n; board.render(); if (net) net.pushTokens(); } } });
        items.push({ label: "Size", sub: [1, 2, 3, 4].map(function (n) { return { label: n + "× (" + n + " sq)", onClick: function () { var g = board.state.map.ppg || 70; t.w = t.h = g * n; board.render(); if (net) net.pushTokens(); } }; }) });
        var owners = [{ label: "Unassigned", onClick: function () { t.ownerId = null; recolor(t); } }, { label: "Me (GM)", onClick: function () { t.ownerId = V.userId; recolor(t); } }];
        (net && net.peers ? net.peers() : []).forEach(function (p) { owners.push({ label: p.name, onClick: function () { t.ownerId = p.id; recolor(t); } }); });
        items.push({ label: "Assign to", sub: owners });
        items.push({ label: (t.isViewer ? "✓ " : "") + "Sees fog (viewer)", onClick: function () { t.isViewer = !t.isViewer; board.render(); if (net) net.pushTokens(); } });
        items.push({ label: "Duplicate", onClick: function () { var c = clone(t); c.id = null; c.x += (board.state.map.ppg || 70); var nt = board.addToken(c); if (net) net.pushTokens(); board.select(nt.id); } });
        items.push({ sep: true });
        items.push({ label: "Delete", danger: true, onClick: function () { board.removeToken(t.id); if (net) net.pushTokens(); } });
      }
    } else if (isGM) {
      items.push({ label: "Add token here…", onClick: function () { pendingDrop = { sx: e.sx, sy: e.sy }; $("tk-file").click(); } });
    }
    if (!items.length) return;
    menuAt(items, e.sx, e.sy);
  }
  function recolor(t) { t.color = t.ownerId ? colorFor(t.ownerId) : "#c8a24a"; board.render(); if (net) net.pushTokens(); }
  function clone(o) { return JSON.parse(JSON.stringify({ name: o.name, imageUrl: o.imageUrl, x: o.x, y: o.y, w: o.w, h: o.h, rot: o.rot, ownerId: o.ownerId, characterDocId: o.characterDocId, isViewer: o.isViewer, color: o.color })); }

  // Add-token-here uses the same file input; remember where to drop.
  var pendingDrop = null;
  if (isGM) {
    var tf = $("tk-file");
    var orig = tf.onchange;
    tf.onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      var where = pendingDrop; pendingDrop = null;
      var rd = new FileReader();
      rd.onload = function () {
        var sx = where ? where.sx : window.innerWidth / 2, sy = where ? where.sy : window.innerHeight / 2;
        var t = board.addTokenAtScreen({ imageUrl: rd.result, name: f.name.replace(/\.[^.]+$/, "") }, sx, sy);
        if (net) net.pushTokens(); board.select(t.id);
      };
      rd.readAsDataURL(f); e.target.value = "";
    };
  }

  // ---- generic popup menu ---------------------------------------------------
  var menuEl = null;
  function menuAt(items, x, y) {
    hideContext();
    menuEl = document.createElement("div"); menuEl.className = "vtt-ctx";
    renderMenu(menuEl, items);
    document.body.appendChild(menuEl);
    var w = menuEl.offsetWidth, h = menuEl.offsetHeight;
    menuEl.style.left = Math.min(x, window.innerWidth - w - 8) + "px";
    menuEl.style.top = Math.min(y, window.innerHeight - h - 8) + "px";
    setTimeout(function () { document.addEventListener("pointerdown", outside, true); }, 0);
  }
  function renderMenu(container, items) {
    items.forEach(function (it) {
      if (it.sep) { var s = document.createElement("div"); s.className = "vtt-ctx-sep"; container.appendChild(s); return; }
      var b = document.createElement("div"); b.className = "vtt-ctx-item" + (it.danger ? " danger" : "") + (it.sub ? " has-sub" : "");
      b.textContent = it.label + (it.sub ? " ▸" : "");
      if (it.sub) {
        var sub = document.createElement("div"); sub.className = "vtt-ctx sub"; renderMenu(sub, it.sub); b.appendChild(sub);
      } else {
        b.addEventListener("click", function () { hideContext(); it.onClick && it.onClick(); });
      }
      container.appendChild(b);
    });
  }
  function outside(e) { if (menuEl && !menuEl.contains(e.target)) hideContext(); }
  function hideContext() { if (menuEl) { menuEl.remove(); menuEl = null; document.removeEventListener("pointerdown", outside, true); } }

  // ---- drag & drop tokens onto the board ------------------------------------
  var stage = $("vtt-stage");
  ["dragenter", "dragover"].forEach(function (ev) { stage.addEventListener(ev, function (e) { if (isGM) { e.preventDefault(); stage.classList.add("drop"); } }); });
  ["dragleave", "drop"].forEach(function (ev) { stage.addEventListener(ev, function () { stage.classList.remove("drop"); }); });
  stage.addEventListener("drop", function (e) {
    if (!isGM) return; e.preventDefault();
    var files = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : [];
    var dropped = 0;
    Array.prototype.forEach.call(files, function (f) {
      if (!/^image\//.test(f.type)) return;
      var rd = new FileReader();
      rd.onload = function () { var t = board.addTokenAtScreen({ imageUrl: rd.result, name: f.name.replace(/\.[^.]+$/, "") }, e.clientX + (dropped++ ) * 8, e.clientY); if (net) net.pushTokens(); };
      rd.readAsDataURL(f);
    });
  });

  startNet();
  setTool("select");
  if (isGM) { setSceneName(); }

  // ---- shell + styles -------------------------------------------------------
  function railBtn(id, name, label, on) { return '<button class="vtt-tbtn' + (on ? " on" : "") + '" id="' + id + '" title="' + label + '">' + ico(name) + "</button>"; }
  function shell() {
    var rail = railBtn("t-select", "select", "Select / move  (V)", true) +
      railBtn("t-ruler", "ruler", "Measure  (R)") +
      railBtn("t-pointer", "ping", "Ping  (P)") +
      (isGM ? '<div class="vtt-rail-sep"></div>' +
        railBtn("t-addtok", "plus", "Add token") +
        railBtn("t-fog", "fog", "Fog of war on/off") +
        railBtn("t-reveal", "eye", "GM reveal (see through fog)", true) +
        railBtn("t-snap", "snap", "Snap to grid", true) : "");
    var top = '<div class="vtt-top">' +
      '<a class="vtt-tbtn" href="/dashboard" title="Back to dashboard">' + ico("home") + "</a>" +
      '<div class="vtt-title">' + esc(V.campaignName || "Tabletop") + "</div></div>" +
      '<div class="vtt-top right">' +
      '<span class="vtt-dot wait" id="conn" title="Connecting…"></span>' +
      '<button class="vtt-tbtn" id="t-sheet" title="My character sheet">' + ico("sheet") + "</button>" +
      (isGM ? '<button class="vtt-tbtn" id="side-toggle" title="Scenes & players">' + ico("layers") + "</button>" : "") +
      "</div>";
    var side = !isGM ? "" : '<div class="vtt-side" id="vtt-side" hidden>' +
      '<div class="vtt-side-head"><span>Table</span><button class="vtt-mini" id="side-close">' + ico("close", 16) + "</button></div>" +
      '<div class="vtt-sec"><div class="vtt-sec-h">Map</div>' +
      '<div class="vtt-row"><button class="vtt-btn" id="m-load">' + ico("upload", 15) + " Map / UVTT</button><button class=\"vtt-btn ghost\" id=\"m-url\">" + ico("link", 15) + " Link</button></div>" +
      '<div class="vtt-row small"><label>Grid px <input type="number" id="m-ppg" min="4" value="70"></label><label>ft/sq <input type="number" id="m-fpc" min="1" value="5"></label></div></div>' +
      '<div class="vtt-sec"><div class="vtt-sec-h">Scenes <span class="vtt-cur" id="scene-cur">Unsaved scene</span></div>' +
      '<div class="vtt-row"><button class="vtt-btn" id="sc-new">' + ico("plus", 15) + " New</button><button class=\"vtt-btn\" id=\"sc-save\">Save</button></div>" +
      '<div class="vtt-scene-list" id="scene-list"></div></div>' +
      '<div class="vtt-sec"><div class="vtt-sec-h">Players</div><div id="players"></div></div></div>';
    var floatUI = '<div class="vtt-zoom"><button class="vtt-tbtn" id="z-in" title="Zoom in">' + ico("zin") + '</button><button class="vtt-tbtn" id="z-fit" title="Fit map">' + ico("fit") + '</button><button class="vtt-tbtn" id="z-out" title="Zoom out">' + ico("zout") + "</button></div>";
    var inputs = isGM ? '<input type="file" id="m-file" accept=".uvtt,.dd2vtt,.df2vtt,.json,image/*" hidden><input type="file" id="tk-file" accept="image/*" hidden>' : "";
    return '<div class="vtt-stage" id="vtt-stage"><canvas id="vtt-canvas"></canvas>' +
      top + '<div class="vtt-rail">' + rail + "</div>" + floatUI +
      '<div class="vtt-readout" id="vtt-readout" hidden></div>' +
      side + sheetPop() + inputs + "</div>";
  }
  function sheetPop() {
    return '<div id="sheetpop" class="vtt-sheetpop" hidden><div class="vtt-sheet-head" id="sheet-head"><span id="sheet-title">Character</span><button class="vtt-mini" id="sheet-close">' + ico("close", 16) + "</button></div><iframe id=\"sheet-frame\" title=\"Character sheet\"></iframe></div>";
  }

  function bind(id, fn) { var el = $(id); if (el) el.onclick = fn; }
  function makeDraggable(box, handle) {
    var d = null;
    handle.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) return; d = { x: e.clientX, y: e.clientY, l: box.offsetLeft, t: box.offsetTop }; handle.setPointerCapture(e.pointerId); });
    handle.addEventListener("pointermove", function (e) { if (!d) return; box.style.left = (d.l + e.clientX - d.x) + "px"; box.style.top = (d.t + e.clientY - d.y) + "px"; box.style.right = "auto"; });
    handle.addEventListener("pointerup", function () { d = null; });
  }

  function injectStyles() {
    var css = [
      "[hidden]{display:none!important}",
      "html,body{height:100%;margin:0;overflow:hidden;background:var(--bg,#0b0d10)}",
      "#vtt-root{position:fixed;inset:0;font:14px/1.4 'Montserrat',system-ui,sans-serif;color:var(--text,#e6ebf2)}",
      ".vtt-stage{position:absolute;inset:0;overflow:hidden}",
      "#vtt-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}",
      ".vtt-stage.drop::after{content:'Drop token image';position:absolute;inset:14px;border:2px dashed var(--gold,#c8a24a);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--gold,#c8a24a);font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(200,162,74,.06);pointer-events:none;z-index:5}",
      // tool buttons
      ".vtt-tbtn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(20,24,30,.92);color:#c3ccd8;border:1px solid #2a323d;border-radius:9px;cursor:pointer;text-decoration:none;transition:.12s}",
      ".vtt-tbtn:hover{color:#fff;border-color:#3d4756}",
      ".vtt-tbtn.on{background:var(--gold,#c8a24a);color:#14181e;border-color:var(--gold,#c8a24a)}",
      // rail
      ".vtt-rail{position:absolute;left:12px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:7px;z-index:20}",
      ".vtt-rail-sep{height:1px;background:#2a323d;margin:3px 4px}",
      // top bars
      ".vtt-top{position:absolute;top:12px;left:12px;display:flex;align-items:center;gap:10px;z-index:20}",
      ".vtt-top.right{left:auto;right:12px}",
      ".vtt-top.right,.vtt-zoom{transition:right .18s ease}",
      "#vtt-root.side-open .vtt-top.right{right:312px}",
      "#vtt-root.side-open .vtt-zoom{right:312px}",
      ".vtt-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:17px;background:rgba(11,13,16,.8);padding:6px 12px;border-radius:8px;border:1px solid #2a323d}",
      // zoom
      ".vtt-zoom{position:absolute;right:12px;bottom:12px;display:flex;flex-direction:column;gap:7px;z-index:20}",
      // readout
      ".vtt-readout{position:absolute;left:64px;bottom:14px;max-width:min(560px,60vw);background:rgba(11,13,16,.9);border:1px solid #2a323d;border-radius:8px;padding:7px 12px;font-size:12px;color:#8b97a7;z-index:15}",
      ".vtt-readout b{color:#e6ebf2}",
      // dots
      ".vtt-dot{width:11px;height:11px;border-radius:50%;display:inline-block;flex:0 0 auto}",
      ".vtt-dot.live{background:#5ac26a;box-shadow:0 0 8px rgba(90,194,106,.6)}",
      ".vtt-dot.wait{background:#8b97a7}",
      // sidebar
      ".vtt-side{position:absolute;top:0;right:0;width:300px;height:100%;background:rgba(15,18,23,.97);border-left:1px solid #2a323d;z-index:30;display:flex;flex-direction:column;overflow:auto;backdrop-filter:blur(6px)}",
      ".vtt-side-head{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #2a323d;font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--gold,#c8a24a)}",
      ".vtt-sec{padding:12px 14px;border-bottom:1px solid #20262e}",
      ".vtt-sec-h{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8b97a7;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}",
      ".vtt-cur{color:var(--gold,#c8a24a);font-weight:600;letter-spacing:0;text-transform:none;font-size:11px}",
      ".vtt-row{display:flex;gap:6px;margin-bottom:6px}",
      ".vtt-row.small{font-size:11px;color:#8b97a7}.vtt-row.small label{display:flex;align-items:center;gap:4px}",
      ".vtt-row input[type=number]{width:52px;background:#1b212a;border:1px solid #2a323d;color:#e6ebf2;border-radius:4px;padding:3px 5px}",
      ".vtt-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;background:#1b212a;color:#e6ebf2;border:1px solid #2a323d;border-radius:6px;padding:7px 8px;font-size:12px;font-weight:600;cursor:pointer}",
      ".vtt-btn:hover{border-color:#3d4756}.vtt-btn.ghost{background:transparent}",
      ".vtt-mini{background:none;border:0;color:#8b97a7;cursor:pointer;padding:3px;display:inline-flex;border-radius:4px}",
      ".vtt-mini:hover{color:#fff;background:#232b35}",
      // scene cards
      ".vtt-scene-list{display:flex;flex-direction:column;gap:6px;margin-top:4px}",
      ".vtt-scene{display:flex;align-items:center;gap:9px;padding:6px;border:1px solid #2a323d;border-radius:8px;cursor:pointer;background:#161b22}",
      ".vtt-scene:hover{border-color:#3d4756}",
      ".vtt-scene.active{border-color:var(--gold,#c8a24a);background:rgba(200,162,74,.08)}",
      ".vtt-thumb{width:52px;height:38px;border-radius:5px;overflow:hidden;flex:0 0 auto;background:#0b0d10;display:flex;align-items:center;justify-content:center;color:#3d4756}",
      ".vtt-thumb img{width:100%;height:100%;object-fit:cover}",
      ".vtt-scene-name{flex:1;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".vtt-prow{display:flex;align-items:center;gap:8px;padding:5px 0;font-size:13px}",
      ".vtt-empty{font-size:12px;color:#8b97a7;line-height:1.5;padding:4px 0}",
      // context menu
      ".vtt-ctx{position:fixed;z-index:100;background:#161b22;border:1px solid #2a323d;border-radius:8px;padding:4px;min-width:160px;box-shadow:0 12px 40px rgba(0,0,0,.6)}",
      ".vtt-ctx.sub{position:absolute;left:100%;top:-5px;display:none}",
      ".vtt-ctx-item{position:relative;padding:7px 10px;border-radius:5px;font-size:13px;cursor:pointer;white-space:nowrap;color:#e6ebf2}",
      ".vtt-ctx-item:hover{background:#232b35}",
      ".vtt-ctx-item.has-sub:hover>.vtt-ctx.sub{display:block}",
      ".vtt-ctx-item.danger{color:#f0a8a3}",
      ".vtt-ctx-sep{height:1px;background:#2a323d;margin:4px 2px}",
      // sheet popup
      ".vtt-sheetpop{position:absolute;top:60px;right:12px;width:min(680px,92vw);height:86%;background:#14181e;border:1px solid #2a323d;border-radius:10px;z-index:60;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.6);resize:both}",
      ".vtt-sheet-head{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:#1b212a;cursor:move;font-weight:700}",
      ".vtt-sheetpop iframe{border:0;flex:1;width:100%;background:#fff}",
      "@media(max-width:640px){.vtt-side{width:88vw}.vtt-sheetpop{width:94vw;right:3vw}.vtt-readout{left:12px;bottom:64px}#vtt-root.side-open .vtt-top.right,#vtt-root.side-open .vtt-zoom{right:12px}}",
    ].join("");
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }

  function toggleSide(force) {
    var el = $("vtt-side"); if (!el) return;
    var show = force == null ? el.hidden : force;
    el.hidden = !show;
    mount.classList.toggle("side-open", show);
    if (show) loadSceneList();
  }
})();
