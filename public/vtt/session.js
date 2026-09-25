/* Dungeon Crawler's Companion — VTT in-app session UI.
 *
 * Loaded by /play/[campaignId]. Full-bleed board with a slim left tool rail
 * (Select / Measure / Ping), a tabbed right "Table" panel (Scenes · Tokens ·
 * Fog · Players), floating zoom, right-click token menus, drag-drop tokens,
 * always-on clickable door icons, and a character-sheet popup with a
 * desktop/mobile view toggle. Wired to the board, live sync and scene storage.
 */
(function () {
  "use strict";
  var V = window.__VTT__ || {};
  var isGM = V.role === "gm";
  var mount = document.getElementById("vtt-root");
  if (!mount) return;

  var P = {
    select: '<path d="M5 3l6 16 2.2-6.3L19 10z"/>',
    ruler: '<path d="M3 9l6-6 12 12-6 6z"/><path d="M8 8l1.5 1.5M11 5l1.5 1.5M6 11l1.5 1.5M14 8l1.5 1.5M9 14l1.5 1.5"/>',
    ping: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>',
    fog: '<path d="M5 16a3.5 3.5 0 0 1 .6-6.9A5 5 0 0 1 15 7.5 3.75 3.75 0 0 1 17 16z"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>',
    eyeoff: '<path d="M4 4l16 16"/><path d="M9.5 5.6A10 10 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17 17 0 0 1-2.4 3.1M6.2 7.7A16 16 0 0 0 2 12s3.6 6.5 10 6.5a10 10 0 0 0 3-.4"/>',
    snap: '<path d="M6 3v8a6 6 0 0 0 12 0V3"/><path d="M4 3h4M16 3h4M6 8h12"/>',
    wrench: '<path d="M15 6.5a3.5 3.5 0 0 1-4.6 4.6L5 16.5 7.5 19l5.4-5.4A3.5 3.5 0 0 1 17.5 9l-2 .5L14 8l.5-2z"/>',
    door: '<path d="M5 21h14M7 21V4h10v17M13 12h.5"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    players: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M15 20a6 6 0 0 0-2.5-4.4"/>',
    token: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    zin: '<circle cx="11" cy="11" r="7"/><path d="M11 8v6M8 11h6M20 20l-3.5-3.5"/>',
    zout: '<circle cx="11" cy="11" r="7"/><path d="M8 11h6M20 20l-3.5-3.5"/>',
    fit: '<path d="M9 4H4v5M20 9V4h-5M4 15v5h5M15 20h5v-5"/>',
    sheet: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    pencil: '<path d="M4 20h4L18 10l-4-4L4 16z"/>',
    upload: '<path d="M12 16V4M8 8l4-4 4 4"/><path d="M4 16v4h16v-4"/>',
    link: '<path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/>',
    desktop: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
    mobile: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  };
  function ico(n, s) { return '<svg viewBox="0 0 24 24" width="' + (s || 20) + '" height="' + (s || 20) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || "") + "</svg>"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  var COLORS = ["#4ea3ff", "#c8503a", "#5ac26a", "#c8a24a", "#a06ad4", "#e0863a", "#3ac6c6", "#d45a9a"];
  function colorFor(id) { var h = 0; id = String(id || ""); for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0; return COLORS[Math.abs(h) % COLORS.length]; }

  injectStyles();
  mount.innerHTML = shell();
  var $ = function (id) { return document.getElementById(id); };
  var board = window.VTTBoard($("vtt-canvas"), {});
  window.__vttBoard = board;
  board.setCanMove(function (t) { return isGM || t.ownerId === V.userId; });
  var net = null, currentScene = null, tokTimer = null;
  var readout = $("vtt-readout");
  function say(h) { readout.innerHTML = h; readout.hidden = false; }

  // ---- rail tools -----------------------------------------------------------
  var HINTS = {
    select: "Drag to pan · scroll to zoom · drag or arrow-keys to move a token · right-click for options · double-click opens a sheet",
    ruler: "Click and drag to measure",
    pointer: "Click to ping a spot for everyone",
  };
  function setTool(t) { board.setTool(t); ["select", "ruler", "pointer"].forEach(function (x) { var b = $("t-" + x); if (b) b.classList.toggle("on", x === t); }); say(HINTS[t] || ""); }
  bind("t-select", function () { setTool("select"); });
  bind("t-ruler", function () { setTool("ruler"); });
  bind("t-pointer", function () { setTool("pointer"); });
  bind("z-in", function () { board.zoomBy(1.2); });
  bind("z-out", function () { board.zoomBy(1 / 1.2); });
  bind("z-fit", function () { board.fitToMap(); });
  board.on("ruler", function (r) { say("<b>" + r.text + "</b>"); });
  board.on("ping", function (p) { if (net) net.ping(p.x, p.y); });
  board.on("open", function (e) { openSheetForToken(e.token); });
  board.on("context", function (e) { showContext(e); });
  board.on("doorclick", function (e) { handleDoor(e.index); });
  board.on("token", function () { if (!tokTimer) tokTimer = setTimeout(function () { tokTimer = null; if (tab() === "tokens") renderTokens(); }, 120); });

  window.addEventListener("keydown", function (e) {
    var el = document.activeElement, tag = el && el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el && el.isContentEditable)) return;
    var k = e.key.toLowerCase();
    if (k === "v") setTool("select"); else if (k === "r") setTool("ruler"); else if (k === "p") setTool("pointer");
    else if (k === "escape") hideContext();
  });

  // ---- character sheet popup ------------------------------------------------
  var chars = Array.isArray(V.myCharacters) ? V.myCharacters : [];
  bind("t-sheet", function () { if (!chars.length) { say("No character sheet is linked to this campaign yet."); return; } chars.length === 1 ? openSheet(chars[0]) : pickSheet(); });
  function openSheetForToken(t) { if (chars.length === 1) openSheet(chars[0]); else if (chars.length) pickSheet(); }
  function pickSheet() { menuAt(chars.map(function (c) { return { label: c.title || "Character", onClick: function () { openSheet(c); } }; }), window.innerWidth - 260, 60); }
  function openSheet(c) { $("sheet-title").textContent = c.title || "Character"; $("sheet-frame").src = (V.toolBase || "/tools") + "/" + encodeURIComponent(c.tool) + "/" + encodeURIComponent(c.id); $("sheetpop").hidden = false; }
  bind("sheet-close", function () { $("sheetpop").hidden = true; $("sheet-frame").src = "about:blank"; });
  bind("sheet-mode", function () {
    var pop = $("sheetpop"), wide = pop.classList.toggle("wide");
    this.innerHTML = ico(wide ? "mobile" : "desktop", 16);
    this.title = wide ? "Switch to mobile size" : "Switch to desktop size";
  });
  makeDraggable($("sheetpop"), $("sheet-head"));

  // ---- doors ----------------------------------------------------------------
  function handleDoor(i) {
    var d = board.getDoor(i); if (!d) return;
    if (isGM && board.getFogSetup()) {
      var lock = !d.locked;
      board.setDoor(i, { locked: lock, closed: lock ? true : d.closed });
      if (net && net.doorSync) net.doorSync(i);
      say(lock ? "Door <b>locked</b>." : "Door unlocked.");
      return;
    }
    if (d.locked && !isGM) { say("That door is <b>locked</b>."); return; }
    var newClosed = !(d.closed || d.locked);
    if (isGM) { board.setDoor(i, { closed: newClosed, locked: false }); if (net && net.doorSync) net.doorSync(i); }
    else if (net && net.door) net.door(i, newClosed);
  }

  // ---- GM controls ----------------------------------------------------------
  if (isGM) {
    bind("t-addtok", function () { pendingDrop = null; $("tk-file").click(); });
    bind("side-toggle", function () { toggleSide(); });
    bind("side-close", function () { toggleSide(false); });
    // tabs
    mount.querySelectorAll(".vtt-tab").forEach(function (b) { b.addEventListener("click", function () { selectTab(b.dataset.tab); }); });
    // map
    bind("m-load", function () { $("m-file").click(); });
    $("m-file").onchange = function (e) { var f = e.target.files[0]; if (!f) return; board.loadFile(f).then(function () { say("Map loaded: <b>" + esc(f.name) + "</b>"); }, function (err) { say("<b>Load failed:</b> " + esc(err.message)); }); e.target.value = ""; };
    bind("m-url", function () { var u = prompt("Map image URL (Dropbox direct link, etc.):"); if (u) board.loadImageMap(u, parseInt($("m-ppg").value, 10) || 70, "url").then(function () { say("Map loaded from link."); }, function (err) { say("<b>Load failed:</b> " + esc(err.message)); }); });
    $("m-ppg").onchange = function () { board.setPpg(parseInt(this.value, 10) || 70); };
    $("m-fpc").onchange = function () { board.setFeetPerCell(parseFloat(this.value) || 5); };
    bind("sc-new", function () { board.loadScene({ kind: "dcc-vtt-scene", version: 1, name: "New scene", map: {}, tokens: [] }); currentScene = null; setSceneName(); });
    bind("sc-save", saveScene);
    // fog panel
    fbtn("f-fog", function (on) { board.setFog(on); say(on ? "Fog on — players see only what their tokens can." : "Fog off."); });
    fbtn("f-reveal", function (on) { board.setShowAll(on); }, true);
    fbtn("f-snap", function (on) { board.setSnap(on); }, true);
    fbtn("f-setup", function (on) { board.setFogSetup(on); say(on ? "Setup mode: walls shown; click a door to <b>lock/unlock</b> it." : ""); });
    $("f-op").oninput = function () { board.setFogOpacity(parseInt(this.value, 10) / 100); };
    // token add
    bind("tok-add", function () { pendingDrop = null; $("tk-file").click(); });
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
    var d = $("conn"); if (d && isGM) { d.className = "vtt-dot live"; d.title = open.length + " player(s) connected"; }
    var box = $("players"); if (!box) return;
    box.innerHTML = open.length ? open.map(function (p) { return '<div class="vtt-prow"><span class="vtt-dot" style="background:' + colorFor(p.id) + '"></span>' + esc(p.name) + "</div>"; }).join("") : '<div class="vtt-empty">No players connected yet. Share the campaign join code and have players open the tabletop.</div>';
  }

  // ---- tabs -----------------------------------------------------------------
  function tab() { var a = mount.querySelector(".vtt-tab.on"); return a ? a.dataset.tab : "scenes"; }
  function selectTab(name) {
    mount.querySelectorAll(".vtt-tab").forEach(function (b) { b.classList.toggle("on", b.dataset.tab === name); });
    mount.querySelectorAll(".vtt-panel").forEach(function (p) { p.hidden = p.dataset.panel !== name; });
    if (name === "scenes") loadSceneList(); else if (name === "tokens") renderTokens();
  }

  // ---- scenes ---------------------------------------------------------------
  function thumbKey(id) { return "vtt-thumb-" + id; }
  function saveThumb(id) { try { var t = board.thumbnail(220); if (t) localStorage.setItem(thumbKey(id), t); } catch (e) {} }
  function getThumb(id) { try { return localStorage.getItem(thumbKey(id)); } catch (e) { return null; } }
  function loadSceneList() {
    var el = $("scene-list"); if (!el) return;
    fetch(V.sceneBase + "?campaignId=" + encodeURIComponent(V.campaignId), { credentials: "same-origin" }).then(function (r) { return r.ok ? r.json() : { scenes: [] }; }).then(function (d) {
      if (!d.scenes || !d.scenes.length) { el.innerHTML = '<div class="vtt-empty">No saved scenes yet. Load a map, then <b>Save</b>.</div>'; return; }
      el.innerHTML = d.scenes.map(function (s) {
        var th = getThumb(s.id), active = currentScene && currentScene.id === s.id;
        return '<div class="vtt-scene' + (active ? " active" : "") + '" data-id="' + s.id + '"><div class="vtt-thumb">' + (th ? '<img src="' + th + '" alt="">' : ico("layers", 22)) + '</div><div class="vtt-scene-name" title="' + esc(s.title) + '">' + esc(s.title) + '</div><button class="vtt-mini rn" title="Rename">' + ico("pencil", 14) + '</button><button class="vtt-mini del" title="Delete">' + ico("trash", 14) + "</button></div>";
      }).join("");
      el.querySelectorAll(".vtt-scene").forEach(function (row) {
        var id = row.dataset.id;
        row.addEventListener("click", function (e) { if (e.target.closest(".vtt-mini")) return; loadSceneById(id); });
        row.querySelector(".del").onclick = function (e) { e.stopPropagation(); if (confirm("Delete this scene?")) delScene(id); };
        row.querySelector(".rn").onclick = function (e) { e.stopPropagation(); renameScene(id, row.querySelector(".vtt-scene-name").textContent); };
      });
    });
  }
  function loadSceneById(id) { fetch(V.sceneBase + "/" + id, { credentials: "same-origin" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (doc) { if (!doc) return; Promise.resolve(board.loadScene(doc.data)).then(function () { saveThumb(id); }); currentScene = { id: doc.id, title: doc.title }; setSceneName(); loadSceneList(); say("Scene: <b>" + esc(doc.title) + "</b>"); }); }
  function saveScene() {
    var data = board.toScene(currentScene ? currentScene.title : "Scene");
    if (currentScene) { fetch(V.sceneBase + "/" + currentScene.id, { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: data.name, data: data }) }).then(function (r) { if (r.ok) { saveThumb(currentScene.id); say("Saved <b>" + esc(data.name) + "</b>"); loadSceneList(); } else say("<b>Save failed</b>"); }); }
    else { var name = prompt("Name this scene:", "Scene"); if (!name) return; data.name = name; fetch(V.sceneBase, { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ campaignId: V.campaignId, title: name, data: data }) }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (d && d.scene) { currentScene = { id: d.scene.id, title: d.scene.title }; saveThumb(currentScene.id); setSceneName(); loadSceneList(); say("Saved <b>" + esc(name) + "</b>"); } else say("<b>Save failed</b>"); }); }
  }
  function renameScene(id, cur) { var name = prompt("Rename scene:", cur); if (!name) return; fetch(V.sceneBase + "/" + id, { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: name }) }).then(function () { if (currentScene && currentScene.id === id) { currentScene.title = name; setSceneName(); } loadSceneList(); }); }
  function delScene(id) { fetch(V.sceneBase + "/" + id, { method: "DELETE", credentials: "same-origin" }).then(function () { if (currentScene && currentScene.id === id) { currentScene = null; setSceneName(); } loadSceneList(); }); }
  function setSceneName() { var l = $("scene-cur"); if (l) l.textContent = currentScene ? currentScene.title : "Unsaved scene"; }

  // ---- tokens panel ---------------------------------------------------------
  function renderTokens() {
    var el = $("token-list"); if (!el) return;
    var toks = board.state.tokens;
    if (!toks.length) { el.innerHTML = '<div class="vtt-empty">No tokens yet. <b>Add token</b> or drag an image onto the map.</div>'; return; }
    el.innerHTML = toks.map(function (t) {
      var sel = t.id === board.state.selectedId;
      var av = t.imageUrl ? '<img src="' + esc(t.imageUrl) + '" alt="">' : '<span class="vtt-swatch" style="background:' + (t.color || "#c8a24a") + '"></span>';
      var who = t.ownerId === V.userId ? "GM" : (t.ownerId ? "player" : "");
      return '<div class="vtt-trow' + (sel ? " active" : "") + '" data-id="' + t.id + '"><div class="vtt-tav">' + av + '</div><div class="vtt-tinfo"><div class="vtt-tname">' + esc(t.name || "Token") + '</div>' + (who ? '<div class="vtt-tsub">' + who + (t.isViewer ? " · sees fog" : "") + "</div>" : "") + '</div><button class="vtt-mini del" title="Delete">' + ico("trash", 14) + "</button></div>";
    }).join("");
    el.querySelectorAll(".vtt-trow").forEach(function (row) {
      var id = row.dataset.id;
      row.addEventListener("click", function (e) { if (e.target.closest(".vtt-mini")) return; board.select(id); board.centerOn(id); renderTokens(); });
      row.querySelector(".del").onclick = function (e) { e.stopPropagation(); board.removeToken(id); if (net) net.pushTokens(); renderTokens(); };
    });
  }
  board.on("select", function () { if (tab() === "tokens") renderTokens(); });

  // ---- token context menu ---------------------------------------------------
  var pendingDrop = null;
  function showContext(e) {
    var t = e.token, items = [];
    if (t) {
      if (chars.length && (t.ownerId === V.userId || isGM)) items.push({ label: "Open sheet", onClick: function () { openSheetForToken(t); } });
      if (isGM) {
        items.push({ label: "Rename…", onClick: function () { var n = prompt("Token name:", t.name || ""); if (n != null) { t.name = n; board.render(); if (net) net.pushTokens(); } } });
        items.push({ label: "Size", sub: [1, 2, 3, 4].map(function (n) { return { label: n + "× (" + n + " sq)", onClick: function () { var g = board.state.map.ppg || 70; t.w = t.h = g * n; board.render(); if (net) net.pushTokens(); } }; }) });
        var owners = [{ label: "Unassigned", onClick: function () { assign(t, null); } }, { label: "Me (GM)", onClick: function () { assign(t, V.userId); } }];
        (net && net.peers ? net.peers() : []).forEach(function (p) { owners.push({ label: p.name, onClick: function () { assign(t, p.id); } }); });
        items.push({ label: "Assign to", sub: owners });
        items.push({ label: (t.isViewer ? "✓ " : "") + "Sees fog (viewer)", onClick: function () { t.isViewer = !t.isViewer; board.render(); if (net) net.pushTokens(); } });
        items.push({ label: "Duplicate", onClick: function () { var c = clone(t); c.id = null; c.x += (board.state.map.ppg || 70); var nt = board.addToken(c); if (net) net.pushTokens(); board.select(nt.id); } });
        items.push({ sep: true });
        items.push({ label: "Delete", danger: true, onClick: function () { board.removeToken(t.id); if (net) net.pushTokens(); } });
      }
    } else if (isGM) {
      items.push({ label: "Add token here…", onClick: function () { pendingDrop = { sx: e.sx, sy: e.sy }; $("tk-file").click(); } });
    }
    if (items.length) menuAt(items, e.sx, e.sy);
  }
  function assign(t, id) { t.ownerId = id; t.color = id ? colorFor(id) : "#c8a24a"; board.render(); if (net) net.pushTokens(); }
  function clone(o) { return JSON.parse(JSON.stringify({ name: o.name, imageUrl: o.imageUrl, x: o.x, y: o.y, w: o.w, h: o.h, rot: o.rot, ownerId: o.ownerId, characterDocId: o.characterDocId, isViewer: o.isViewer, color: o.color })); }

  if (isGM) {
    $("tk-file").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return; var where = pendingDrop; pendingDrop = null;
      var rd = new FileReader();
      rd.onload = function () { var sx = where ? where.sx : window.innerWidth / 2, sy = where ? where.sy : window.innerHeight / 2; var t = board.addTokenAtScreen({ imageUrl: rd.result, name: f.name.replace(/\.[^.]+$/, "") }, sx, sy); if (net) net.pushTokens(); board.select(t.id); if (tab() === "tokens") renderTokens(); };
      rd.readAsDataURL(f); e.target.value = "";
    };
  }

  // ---- popup menu -----------------------------------------------------------
  var menuEl = null;
  function menuAt(items, x, y) {
    hideContext();
    menuEl = document.createElement("div"); menuEl.className = "vtt-ctx"; renderMenu(menuEl, items); document.body.appendChild(menuEl);
    menuEl.style.left = Math.min(x, window.innerWidth - menuEl.offsetWidth - 8) + "px";
    menuEl.style.top = Math.min(y, window.innerHeight - menuEl.offsetHeight - 8) + "px";
    setTimeout(function () { document.addEventListener("pointerdown", outside, true); }, 0);
  }
  function renderMenu(container, items) {
    items.forEach(function (it) {
      if (it.sep) { var s = document.createElement("div"); s.className = "vtt-ctx-sep"; container.appendChild(s); return; }
      var b = document.createElement("div"); b.className = "vtt-ctx-item" + (it.danger ? " danger" : "") + (it.sub ? " has-sub" : ""); b.textContent = it.label + (it.sub ? " ▸" : "");
      if (it.sub) { var sub = document.createElement("div"); sub.className = "vtt-ctx sub"; renderMenu(sub, it.sub); b.appendChild(sub); }
      else b.addEventListener("click", function () { hideContext(); it.onClick && it.onClick(); });
      container.appendChild(b);
    });
  }
  function outside(e) { if (menuEl && !menuEl.contains(e.target)) hideContext(); }
  function hideContext() { if (menuEl) { menuEl.remove(); menuEl = null; document.removeEventListener("pointerdown", outside, true); } }

  // ---- drag & drop ----------------------------------------------------------
  var stage = $("vtt-stage");
  ["dragenter", "dragover"].forEach(function (ev) { stage.addEventListener(ev, function (e) { if (isGM) { e.preventDefault(); stage.classList.add("drop"); } }); });
  ["dragleave", "drop"].forEach(function (ev) { stage.addEventListener(ev, function () { stage.classList.remove("drop"); }); });
  stage.addEventListener("drop", function (e) {
    if (!isGM) return; e.preventDefault();
    var files = (e.dataTransfer && e.dataTransfer.files) || []; var n = 0;
    Array.prototype.forEach.call(files, function (f) { if (!/^image\//.test(f.type)) return; var rd = new FileReader(); rd.onload = function () { board.addTokenAtScreen({ imageUrl: rd.result, name: f.name.replace(/\.[^.]+$/, "") }, e.clientX + (n++) * 8, e.clientY); if (net) net.pushTokens(); if (tab() === "tokens") renderTokens(); }; rd.readAsDataURL(f); });
  });

  startNet(); setTool("select"); if (isGM) setSceneName();

  // ---- shell + styles -------------------------------------------------------
  function rb(id, name, label, on) { return '<button class="vtt-tbtn' + (on ? " on" : "") + '" id="' + id + '" title="' + label + '">' + ico(name) + "</button>"; }
  function frow(id, name, label, on) { return '<button class="vtt-frow' + (on ? " on" : "") + '" id="' + id + '"><span class="vtt-frow-i">' + ico(name, 18) + "</span>" + label + "</button>"; }
  function shell() {
    var rail = rb("t-select", "select", "Select / move  (V)", true) + rb("t-ruler", "ruler", "Measure  (R)") + rb("t-pointer", "ping", "Ping  (P)") + (isGM ? '<div class="vtt-rail-sep"></div>' + rb("t-addtok", "plus", "Add token") : "");
    var top = '<div class="vtt-top"><a class="vtt-tbtn" href="/dashboard" title="Back to dashboard">' + ico("home") + '</a><div class="vtt-title">' + esc(V.campaignName || "Tabletop") + "</div></div>" +
      '<div class="vtt-top right"><span class="vtt-dot wait" id="conn" title="Connecting…"></span><button class="vtt-tbtn" id="t-sheet" title="My character sheet">' + ico("sheet") + "</button>" + (isGM ? '<button class="vtt-tbtn" id="side-toggle" title="Table panel">' + ico("layers") + "</button>" : "") + "</div>";
    var side = !isGM ? "" : '<div class="vtt-side" id="vtt-side" hidden><div class="vtt-side-head"><span>Table</span><button class="vtt-mini" id="side-close">' + ico("close", 16) + "</button></div>" +
      '<div class="vtt-tabs">' + tabBtn("scenes", "layers", "Scenes", true) + tabBtn("tokens", "token", "Tokens") + tabBtn("fog", "fog", "Fog") + tabBtn("players", "players", "Players") + "</div>" +
      // scenes
      '<div class="vtt-panel" data-panel="scenes"><div class="vtt-sec-h">Map</div>' +
      '<div class="vtt-row"><button class="vtt-btn" id="m-load">' + ico("upload", 15) + ' Map / UVTT</button><button class="vtt-btn ghost" id="m-url">' + ico("link", 15) + " Link</button></div>" +
      '<div class="vtt-row small"><label>Grid px <input type="number" id="m-ppg" min="4" value="70"></label><label>ft/sq <input type="number" id="m-fpc" min="1" value="5"></label></div>' +
      '<div class="vtt-sec-h" style="margin-top:12px">Scenes <span class="vtt-cur" id="scene-cur">Unsaved scene</span></div>' +
      '<div class="vtt-row"><button class="vtt-btn" id="sc-new">' + ico("plus", 15) + ' New</button><button class="vtt-btn" id="sc-save">Save current</button></div>' +
      '<div class="vtt-scene-list" id="scene-list"></div></div>' +
      // tokens
      '<div class="vtt-panel" data-panel="tokens" hidden><div class="vtt-row"><button class="vtt-btn" id="tok-add">' + ico("plus", 15) + ' Add token</button></div><div class="vtt-hint2">Tip: drag an image straight onto the map.</div><div class="vtt-token-list" id="token-list"></div></div>' +
      // fog
      '<div class="vtt-panel" data-panel="fog" hidden>' +
      frow("f-fog", "fog", "Fog of war") + frow("f-reveal", "eye", "GM reveal (see through fog)", true) + frow("f-snap", "snap", "Snap tokens to grid", true) + frow("f-setup", "wrench", "Setup mode (walls & door locks)") +
      '<div class="vtt-row small" style="margin-top:8px"><label style="flex:1">Darkness <input type="range" id="f-op" min="40" max="100" value="90"></label></div>' +
      '<div class="vtt-hint2">' + ico("door", 15) + ' Doors show an icon on the map — click to open or close. In setup mode, click a door to lock it.</div></div>' +
      // players
      '<div class="vtt-panel" data-panel="players" hidden><div id="players"></div></div></div>';
    var zoom = '<div class="vtt-zoom"><button class="vtt-tbtn" id="z-in" title="Zoom in">' + ico("zin") + '</button><button class="vtt-tbtn" id="z-fit" title="Fit map">' + ico("fit") + '</button><button class="vtt-tbtn" id="z-out" title="Zoom out">' + ico("zout") + "</button></div>";
    var inputs = isGM ? '<input type="file" id="m-file" accept=".uvtt,.dd2vtt,.df2vtt,.json,image/*" hidden><input type="file" id="tk-file" accept="image/*" hidden>' : "";
    return '<div class="vtt-stage" id="vtt-stage"><canvas id="vtt-canvas"></canvas>' + top + '<div class="vtt-rail">' + rail + "</div>" + zoom + '<div class="vtt-readout" id="vtt-readout" hidden></div>' + side + sheetPop() + inputs + "</div>";
  }
  function tabBtn(name, icon, label, on) { return '<button class="vtt-tab' + (on ? " on" : "") + '" data-tab="' + name + '">' + ico(icon, 16) + "<span>" + label + "</span></button>"; }
  function sheetPop() { return '<div id="sheetpop" class="vtt-sheetpop" hidden><div class="vtt-sheet-head" id="sheet-head"><span id="sheet-title">Character</span><span style="flex:1"></span><button class="vtt-mini" id="sheet-mode" title="Switch to desktop size">' + ico("desktop", 16) + '</button><button class="vtt-mini" id="sheet-close">' + ico("close", 16) + '</button></div><iframe id="sheet-frame" title="Character sheet"></iframe></div>'; }

  function bind(id, fn) { var el = $(id); if (el) el.onclick = fn; }
  function fbtn(id, fn, on) { var el = $(id); if (!el) return; el.onclick = function () { var v = !el.classList.contains("on"); el.classList.toggle("on", v); if (id === "f-reveal") { el.querySelector(".vtt-frow-i").innerHTML = ico(v ? "eye" : "eyeoff", 18); } fn(v); }; }
  function makeDraggable(box, handle) { var d = null; handle.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) return; d = { x: e.clientX, y: e.clientY, l: box.offsetLeft, t: box.offsetTop }; handle.setPointerCapture(e.pointerId); }); handle.addEventListener("pointermove", function (e) { if (!d) return; box.style.left = (d.l + e.clientX - d.x) + "px"; box.style.top = (d.t + e.clientY - d.y) + "px"; box.style.right = "auto"; }); handle.addEventListener("pointerup", function () { d = null; }); }

  function toggleSide(force) { var el = $("vtt-side"); if (!el) return; var show = force == null ? el.hidden : force; el.hidden = !show; mount.classList.toggle("side-open", show); if (show) selectTab(tab()); }

  function injectStyles() {
    var css = [
      "[hidden]{display:none!important}",
      "html,body{height:100%;margin:0;overflow:hidden;background:var(--bg,#0b0d10)}",
      "#vtt-root{position:fixed;inset:0;font:14px/1.4 'Montserrat',system-ui,sans-serif;color:#e6ebf2}",
      ".vtt-stage{position:absolute;inset:0;overflow:hidden}",
      "#vtt-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}",
      ".vtt-stage.drop::after{content:'Drop token image';position:absolute;inset:14px;border:2px dashed #c8a24a;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#c8a24a;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(200,162,74,.06);pointer-events:none;z-index:5}",
      ".vtt-tbtn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(20,24,30,.92);color:#c3ccd8;border:1px solid #2a323d;border-radius:9px;cursor:pointer;text-decoration:none;transition:.12s}",
      ".vtt-tbtn:hover{color:#fff;border-color:#3d4756}.vtt-tbtn.on{background:#c8a24a;color:#14181e;border-color:#c8a24a}",
      ".vtt-rail{position:absolute;left:12px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:7px;z-index:20}",
      ".vtt-rail-sep{height:1px;background:#2a323d;margin:3px 4px}",
      ".vtt-top{position:absolute;top:12px;left:12px;display:flex;align-items:center;gap:10px;z-index:20}",
      ".vtt-top.right{left:auto;right:12px}",
      ".vtt-top.right,.vtt-zoom{transition:right .18s ease}",
      "#vtt-root.side-open .vtt-top.right{right:312px}#vtt-root.side-open .vtt-zoom{right:312px}",
      ".vtt-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:17px;background:rgba(11,13,16,.8);padding:6px 12px;border-radius:8px;border:1px solid #2a323d}",
      ".vtt-zoom{position:absolute;right:12px;bottom:12px;display:flex;flex-direction:column;gap:7px;z-index:20}",
      ".vtt-readout{position:absolute;left:64px;bottom:14px;max-width:min(560px,60vw);background:rgba(11,13,16,.9);border:1px solid #2a323d;border-radius:8px;padding:7px 12px;font-size:12px;color:#8b97a7;z-index:15}.vtt-readout b{color:#e6ebf2}",
      ".vtt-dot{width:11px;height:11px;border-radius:50%;display:inline-block;flex:0 0 auto}.vtt-dot.live{background:#5ac26a;box-shadow:0 0 8px rgba(90,194,106,.6)}.vtt-dot.wait{background:#8b97a7}",
      ".vtt-side{position:absolute;top:0;right:0;width:300px;height:100%;background:rgba(15,18,23,.97);border-left:1px solid #2a323d;z-index:30;display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(6px)}",
      ".vtt-side-head{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #2a323d;font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#c8a24a}",
      ".vtt-tabs{display:flex;border-bottom:1px solid #2a323d}",
      ".vtt-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 2px;background:none;border:0;border-bottom:2px solid transparent;color:#8b97a7;font:600 10px/1 system-ui;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}",
      ".vtt-tab.on{color:#c8a24a;border-bottom-color:#c8a24a}.vtt-tab:hover{color:#e6ebf2}",
      ".vtt-panel{padding:14px;overflow:auto;flex:1}",
      ".vtt-sec-h{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8b97a7;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}",
      ".vtt-cur{color:#c8a24a;font-weight:600;letter-spacing:0;text-transform:none;font-size:11px}",
      ".vtt-row{display:flex;gap:6px;margin-bottom:6px}.vtt-row.small{font-size:11px;color:#8b97a7;align-items:center}.vtt-row.small label{display:flex;align-items:center;gap:5px}",
      ".vtt-row input[type=number]{width:52px;background:#1b212a;border:1px solid #2a323d;color:#e6ebf2;border-radius:4px;padding:3px 5px}",
      "input[type=range]{accent-color:#c8a24a;flex:1}",
      ".vtt-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;background:#1b212a;color:#e6ebf2;border:1px solid #2a323d;border-radius:6px;padding:7px 8px;font-size:12px;font-weight:600;cursor:pointer}.vtt-btn:hover{border-color:#3d4756}.vtt-btn.ghost{background:transparent}",
      ".vtt-mini{background:none;border:0;color:#8b97a7;cursor:pointer;padding:3px;display:inline-flex;border-radius:4px}.vtt-mini:hover{color:#fff;background:#232b35}",
      ".vtt-frow{display:flex;align-items:center;gap:10px;width:100%;background:#161b22;color:#e6ebf2;border:1px solid #2a323d;border-radius:8px;padding:9px 11px;font-size:13px;font-weight:600;cursor:pointer;margin-bottom:6px}",
      ".vtt-frow:hover{border-color:#3d4756}.vtt-frow-i{color:#8b97a7;display:inline-flex}",
      ".vtt-frow.on{border-color:#c8a24a;background:rgba(200,162,74,.1)}.vtt-frow.on .vtt-frow-i{color:#c8a24a}",
      ".vtt-scene-list,.vtt-token-list{display:flex;flex-direction:column;gap:6px;margin-top:6px}",
      ".vtt-scene,.vtt-trow{display:flex;align-items:center;gap:9px;padding:6px;border:1px solid #2a323d;border-radius:8px;cursor:pointer;background:#161b22}",
      ".vtt-scene:hover,.vtt-trow:hover{border-color:#3d4756}.vtt-scene.active,.vtt-trow.active{border-color:#c8a24a;background:rgba(200,162,74,.08)}",
      ".vtt-thumb{width:52px;height:38px;border-radius:5px;overflow:hidden;flex:0 0 auto;background:#0b0d10;display:flex;align-items:center;justify-content:center;color:#3d4756}.vtt-thumb img{width:100%;height:100%;object-fit:cover}",
      ".vtt-scene-name{flex:1;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".vtt-tav{width:34px;height:34px;border-radius:50%;overflow:hidden;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:#0b0d10}.vtt-tav img{width:100%;height:100%;object-fit:cover}.vtt-swatch{width:20px;height:20px;border-radius:50%}",
      ".vtt-tinfo{flex:1;min-width:0}.vtt-tname{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vtt-tsub{font-size:10px;color:#8b97a7;text-transform:uppercase;letter-spacing:.05em}",
      ".vtt-prow{display:flex;align-items:center;gap:8px;padding:5px 0;font-size:13px}",
      ".vtt-empty{font-size:12px;color:#8b97a7;line-height:1.5;padding:6px 0}",
      ".vtt-hint2{font-size:11px;color:#8b97a7;line-height:1.5;margin:6px 0;display:flex;gap:6px;align-items:flex-start}.vtt-hint2 svg{flex:0 0 auto;margin-top:1px}",
      ".vtt-ctx{position:fixed;z-index:100;background:#161b22;border:1px solid #2a323d;border-radius:8px;padding:4px;min-width:160px;box-shadow:0 12px 40px rgba(0,0,0,.6)}",
      ".vtt-ctx.sub{position:absolute;left:100%;top:-5px;display:none}",
      ".vtt-ctx-item{position:relative;padding:7px 10px;border-radius:5px;font-size:13px;cursor:pointer;white-space:nowrap;color:#e6ebf2}.vtt-ctx-item:hover{background:#232b35}.vtt-ctx-item.has-sub:hover>.vtt-ctx.sub{display:block}.vtt-ctx-item.danger{color:#f0a8a3}",
      ".vtt-ctx-sep{height:1px;background:#2a323d;margin:4px 2px}",
      ".vtt-sheetpop{position:absolute;top:60px;right:12px;width:min(680px,92vw);height:86%;background:#14181e;border:1px solid #2a323d;border-radius:10px;z-index:60;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.6);resize:both}",
      ".vtt-sheetpop.wide{width:min(1120px,96vw);height:92vh;top:4vh;right:2vw;left:auto}",
      ".vtt-sheet-head{display:flex;align-items:center;gap:6px;padding:9px 12px;background:#1b212a;cursor:move;font-weight:700}",
      ".vtt-sheetpop iframe{border:0;flex:1;width:100%;background:#fff}",
      "@media(max-width:640px){.vtt-side{width:88vw}#vtt-root.side-open .vtt-top.right,#vtt-root.side-open .vtt-zoom{right:12px}.vtt-sheetpop,.vtt-sheetpop.wide{width:94vw;height:88vh;right:3vw;left:auto;top:6vh}.vtt-readout{left:12px;bottom:64px}}",
    ].join("");
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }
})();
