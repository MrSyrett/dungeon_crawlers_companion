/* Dungeon Crawler's Companion — VTT in-app session glue.
 *
 * Loaded by /play/[campaignId]. Reads window.__VTT__ (campaign, role, user, API
 * bases, ICE servers), builds the role-aware UI, instantiates the board, wires
 * scene persistence (GM), live sync (VTTNet host for GM / guest for players) and
 * the character-sheet popup. System-agnostic: it never touches game rules.
 */
(function () {
  "use strict";
  var V = window.__VTT__ || {};
  var isGM = V.role === "gm";
  var mount = document.getElementById("vtt-root");
  if (!mount) return;

  injectStyles();
  mount.innerHTML = shell();
  var $ = function (id) { return document.getElementById(id); };
  var board = window.VTTBoard($("vtt-canvas"), {});
  var readout = $("vtt-readout");
  function say(h) { readout.innerHTML = h; }

  var net = null;
  var currentScene = null; // { id, title }

  // ---- tools (both roles) ---------------------------------------------------
  function setTool(t) {
    board.setTool(t);
    ["select", "ruler", "pointer"].forEach(function (x) {
      var b = $("t-" + x); if (b) b.setAttribute("aria-pressed", x === t);
    });
  }
  $("t-select").onclick = function () { setTool("select"); };
  $("t-ruler").onclick = function () { setTool("ruler"); };
  $("t-pointer").onclick = function () { setTool("pointer"); };
  $("t-fit").onclick = function () { board.fitToMap(); };
  board.on("ruler", function (r) { say("Ruler: <b>" + r.text + "</b>"); });
  board.on("ping", function (p) { if (net) net.ping(p.x, p.y); });

  // ---- character sheet popup (own sheets only) ------------------------------
  var chars = Array.isArray(V.myCharacters) ? V.myCharacters : [];
  var sheetBtn = $("t-sheet");
  if (sheetBtn) {
    if (!chars.length) { sheetBtn.disabled = true; sheetBtn.title = "No character sheet linked to this campaign"; }
    sheetBtn.onclick = function () {
      if (chars.length === 1) openSheet(chars[0]);
      else pickSheet();
    };
  }
  function pickSheet() {
    var menu = $("vtt-sheet-menu");
    menu.innerHTML = chars.map(function (c, i) {
      return '<button class="vtt-btn ghost" data-i="' + i + '">' + esc(c.title || "Character") + "</button>";
    }).join("");
    menu.hidden = false;
    menu.querySelectorAll("button").forEach(function (b) {
      b.onclick = function () { menu.hidden = true; openSheet(chars[+b.dataset.i]); };
    });
  }
  function openSheet(c) {
    var pop = $("vtt-sheetpop");
    $("vtt-sheet-title").textContent = c.title || "Character";
    $("vtt-sheet-frame").src = (V.toolBase || "/tools") + "/" + encodeURIComponent(c.tool) + "/" + encodeURIComponent(c.id);
    pop.hidden = false;
  }
  $("vtt-sheet-close").onclick = function () { $("vtt-sheetpop").hidden = true; $("vtt-sheet-frame").src = "about:blank"; };
  makeDraggable($("vtt-sheetpop"), $("vtt-sheet-head"));

  // ---- GM-only wiring -------------------------------------------------------
  if (isGM) {
    $("m-file").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      board.loadFile(f).then(function () { say("Map loaded: <b>" + esc(f.name) + "</b>"); },
        function (err) { say("<b>Load failed:</b> " + esc(err.message)); });
      e.target.value = "";
    };
    $("m-load").onclick = function () { $("m-file").click(); };
    $("m-url").onclick = function () {
      var u = prompt("Map image URL (Dropbox direct link, etc.):"); if (!u) return;
      board.loadImageMap(u, parseInt($("m-ppg").value, 10) || 70, "url").then(function () { say("Map loaded from link."); },
        function (err) { say("<b>Load failed:</b> " + esc(err.message)); });
    };
    $("m-ppg").onchange = function () { board.setPpg(parseInt(this.value, 10) || 70); };
    $("m-fpc").onchange = function () { board.setFeetPerCell(parseFloat(this.value) || 5); };

    $("tk-file").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { board.addToken({ imageUrl: r.result, name: f.name.replace(/\.[^.]+$/, ""), isViewer: $("tk-viewer").checked }); };
      r.readAsDataURL(f); e.target.value = "";
    };
    $("tk-add").onclick = function () { $("tk-file").click(); };
    $("tk-url").onclick = function () { var u = prompt("Token image URL:"); if (u) board.addToken({ imageUrl: u, isViewer: $("tk-viewer").checked }); };

    $("f-fog").onclick = function () { var on = this.getAttribute("aria-pressed") !== "true"; this.setAttribute("aria-pressed", on); board.setFog(on); };
    $("f-reveal").onclick = function () { var on = this.getAttribute("aria-pressed") !== "true"; this.setAttribute("aria-pressed", on); board.setShowAll(on); };
    $("f-grid").onchange = function () { board.setGrid(this.checked); };

    // scene manager
    $("sc-toggle").onclick = function () { var p = $("vtt-scenes"); p.hidden = !p.hidden; if (!p.hidden) loadSceneList(); };
    $("sc-new").onclick = function () {
      board.loadScene({ kind: "dcc-vtt-scene", version: 1, name: "New scene", map: {}, tokens: [] });
      currentScene = null; setSceneLabel();
    };
    $("sc-save").onclick = saveScene;

    // selected-token panel
    board.on("select", function (t) { renderSel(t); });
    board.on("token", function () { var t = board.getToken(board.state.selectedId); if (t) renderSel(t); });
  } else {
    // player: pan/zoom/ruler/pointer + own tokens only; no editing chrome.
    say("Connecting to your GM…");
  }

  // ---- live sync ------------------------------------------------------------
  function startNet() {
    var transport = window.VTTNet.httpTransport({ base: V.signalBase, campaignId: V.campaignId, me: V.userId });
    if (isGM) {
      net = window.VTTNet.host({ transport: transport, board: board, me: V.userId, iceServers: V.iceServers, onPeers: renderPlayers });
      renderPlayers([]);
    } else {
      net = window.VTTNet.guest({
        transport: transport, board: board, me: V.userId, name: V.userName, iceServers: V.iceServers,
        onStatus: function (up) { setConn(up); },
      });
    }
  }

  // ---- scene persistence (GM) ----------------------------------------------
  function loadSceneList() {
    fetch(V.sceneBase + "?campaignId=" + encodeURIComponent(V.campaignId), { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : { scenes: [] }; })
      .then(function (d) {
        var list = $("vtt-scene-list");
        list.innerHTML = (d.scenes || []).map(function (s) {
          return '<div class="vtt-scene-row" data-id="' + s.id + '"><span>' + esc(s.title) + '</span>' +
            '<span><button class="vtt-btn ghost sc-load" data-id="' + s.id + '">Load</button>' +
            '<button class="vtt-btn ghost sc-del" data-id="' + s.id + '">✕</button></span></div>';
        }).join("") || '<div class="vtt-hint" style="padding:8px">No saved scenes yet.</div>';
        list.querySelectorAll(".sc-load").forEach(function (b) { b.onclick = function () { loadSceneById(b.dataset.id); }; });
        list.querySelectorAll(".sc-del").forEach(function (b) { b.onclick = function () { delScene(b.dataset.id); }; });
      });
  }
  function loadSceneById(id) {
    fetch(V.sceneBase + "/" + id, { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (doc) {
        if (!doc) return;
        try { board.loadScene(doc.data); currentScene = { id: doc.id, title: doc.title }; setSceneLabel(); say("Scene loaded: <b>" + esc(doc.title) + "</b>"); }
        catch (e) { say("<b>Could not load scene:</b> " + esc(e.message)); }
      });
  }
  function saveScene() {
    var data = board.toScene(currentScene ? currentScene.title : "Scene");
    if (currentScene) {
      fetch(V.sceneBase + "/" + currentScene.id, {
        method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: data.name, data: data }),
      }).then(function (r) { say(r.ok ? "Saved <b>" + esc(data.name) + "</b>" : "<b>Save failed</b>"); });
    } else {
      var name = prompt("Name this scene:", "Scene") || "Scene";
      data.name = name;
      fetch(V.sceneBase, {
        method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" },
        body: JSON.stringify({ campaignId: V.campaignId, title: name, data: data }),
      }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        if (d && d.scene) { currentScene = { id: d.scene.id, title: d.scene.title }; setSceneLabel(); say("Saved <b>" + esc(name) + "</b>"); loadSceneList(); }
        else say("<b>Save failed</b>");
      });
    }
  }
  function delScene(id) {
    fetch(V.sceneBase + "/" + id, { method: "DELETE", credentials: "same-origin" }).then(function () {
      if (currentScene && currentScene.id === id) { currentScene = null; setSceneLabel(); }
      loadSceneList();
    });
  }
  function setSceneLabel() { var l = $("sc-label"); if (l) l.textContent = currentScene ? currentScene.title : "Unsaved scene"; }

  // ---- selected-token panel (GM) -------------------------------------------
  function renderSel(t) {
    var box = $("vtt-sel");
    if (!t) { box.hidden = true; return; }
    box.hidden = false;
    var players = net && net.peers ? net.peers() : [];
    var opts = '<option value="">Unassigned</option><option value="' + esc(V.userId) + '"' + (t.ownerId === V.userId ? " selected" : "") + '>Me (GM)</option>';
    players.forEach(function (p) { opts += '<option value="' + esc(p.id) + '"' + (t.ownerId === p.id ? " selected" : "") + '>' + esc(p.name) + "</option>"; });
    $("sel-name").textContent = t.name || "Token";
    $("sel-owner").innerHTML = opts;
    $("sel-viewer").checked = !!t.isViewer;
    $("sel-owner").onchange = function () { t.ownerId = this.value || null; if (net) net.pushTokens(); };
    $("sel-viewer").onchange = function () { t.isViewer = this.checked; board.render(); if (net) net.pushTokens(); };
    $("sel-del").onclick = function () { board.removeToken(t.id); box.hidden = true; if (net) net.pushTokens(); };
  }

  // ---- players list (GM) ----------------------------------------------------
  function renderPlayers(list) {
    var el = $("vtt-players"); if (!el) return;
    var n = (list || []).filter(function (p) { return p.open; }).length;
    el.innerHTML = '<span class="vtt-hint">Players: <b>' + n + "</b></span>";
    if (!board.state.selectedId) return;
    renderSel(board.getToken(board.state.selectedId));
  }
  function setConn(up) {
    var el = $("vtt-conn"); if (el) el.innerHTML = up ? '<span style="color:var(--green,#5ac26a)">● live</span>' : '<span style="color:var(--muted)">● connecting…</span>';
    if (up) say("Connected. Your GM is driving the table.");
  }

  startNet();
  setTool("select");

  // ---- templates & helpers --------------------------------------------------
  function shell() {
    var tools =
      '<div class="group"><button class="vtt-btn" id="t-select" aria-pressed="true">Select</button>' +
      '<button class="vtt-btn" id="t-ruler">Ruler</button>' +
      '<button class="vtt-btn" id="t-pointer">Pointer</button>' +
      '<button class="vtt-btn ghost" id="t-fit">Fit</button></div>';
    var gm = !isGM ? "" :
      '<div class="group"><button class="vtt-btn" id="m-load">Map/UVTT…</button>' +
      '<button class="vtt-btn ghost" id="m-url">Link…</button>' +
      '<label class="vtt-inline">px<input type="number" id="m-ppg" min="4" value="70"></label>' +
      '<label class="vtt-inline">ft<input type="number" id="m-fpc" min="1" value="5"></label></div>' +
      '<div class="group"><button class="vtt-btn" id="tk-add">Token…</button>' +
      '<button class="vtt-btn ghost" id="tk-url">Link…</button>' +
      '<label class="vtt-inline"><input type="checkbox" id="tk-viewer"> viewer</label></div>' +
      '<div class="group"><button class="vtt-btn" id="f-fog" aria-pressed="false">Fog</button>' +
      '<button class="vtt-btn" id="f-reveal" aria-pressed="true">Reveal</button>' +
      '<label class="vtt-inline"><input type="checkbox" id="f-grid" checked> grid</label></div>' +
      '<div class="group"><button class="vtt-btn" id="sc-toggle">Scenes ▾</button>' +
      '<button class="vtt-btn" id="sc-save">Save</button><span class="vtt-hint" id="sc-label">Unsaved scene</span></div>';
    var right =
      '<div class="group" style="margin-left:auto;border:0">' +
      '<button class="vtt-btn" id="t-sheet">My Sheet</button>' +
      (isGM ? '<span id="vtt-players" class="vtt-hint"></span>' : '<span id="vtt-conn" class="vtt-hint"></span>') +
      '<a class="vtt-btn ghost" href="/dashboard">← Home</a></div>';
    return '<div class="vtt-toolbar"><h1>' + esc(V.campaignName || "VTT") + "</h1>" + tools + gm + right + "</div>" +
      '<div class="vtt-stage"><canvas id="vtt-canvas"></canvas>' +
      '<div class="vtt-readout" id="vtt-readout">' + (isGM ? "Load a map or open a saved scene to begin." : "Connecting…") + "</div>" +
      '<div id="vtt-sheet-menu" class="vtt-menu" hidden></div>' +
      (isGM ? sceneDrawer() + selPanel() : "") +
      sheetPop() + "</div>";
  }
  function sceneDrawer() {
    return '<div id="vtt-scenes" class="vtt-scene-panel" hidden><div class="vtt-scene-head">Scenes' +
      '<button class="vtt-btn ghost" id="sc-new">＋ New</button></div><div id="vtt-scene-list"></div></div>';
  }
  function selPanel() {
    return '<div id="vtt-sel" class="vtt-sel" hidden><b id="sel-name">Token</b>' +
      '<label class="vtt-inline">Owner <select id="sel-owner"></select></label>' +
      '<label class="vtt-inline"><input type="checkbox" id="sel-viewer"> sees fog</label>' +
      '<button class="vtt-btn ghost" id="sel-del">Delete</button></div>';
  }
  function sheetPop() {
    return '<div id="vtt-sheetpop" class="vtt-sheetpop" hidden><div class="vtt-sheet-head" id="vtt-sheet-head">' +
      '<span id="vtt-sheet-title">Character</span><button class="vtt-btn ghost" id="vtt-sheet-close">✕</button></div>' +
      '<iframe id="vtt-sheet-frame" title="Character sheet"></iframe></div>';
  }

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function makeDraggable(box, handle) {
    var down = null;
    handle.addEventListener("pointerdown", function (e) { down = { x: e.clientX, y: e.clientY, l: box.offsetLeft, t: box.offsetTop }; handle.setPointerCapture(e.pointerId); });
    handle.addEventListener("pointermove", function (e) { if (!down) return; box.style.left = (down.l + e.clientX - down.x) + "px"; box.style.top = (down.t + e.clientY - down.y) + "px"; box.style.right = "auto"; });
    handle.addEventListener("pointerup", function () { down = null; });
  }

  function injectStyles() {
    var css = ""
      + ".vtt-menu{position:absolute;top:56px;right:12px;background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:6px;display:flex;flex-direction:column;gap:4px;z-index:40}"
      + ".vtt-scene-panel{position:absolute;top:12px;left:12px;width:240px;background:var(--panel);border:1px solid var(--border);border-radius:8px;z-index:30;max-height:70%;overflow:auto}"
      + ".vtt-scene-head{display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid var(--border);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:var(--gold)}"
      + ".vtt-scene-row{display:flex;justify-content:space-between;align-items:center;padding:6px 10px;font-size:13px;border-bottom:1px solid var(--border)}"
      + ".vtt-sel{position:absolute;bottom:12px;right:12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:10px;display:flex;gap:10px;align-items:center;z-index:30;flex-wrap:wrap;max-width:60%}"
      + ".vtt-sheetpop{position:absolute;top:60px;right:12px;width:420px;height:70%;background:var(--panel);border:1px solid var(--border);border-radius:8px;z-index:50;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.5)}"
      + ".vtt-sheet-head{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--panel-2);cursor:move;font-weight:700}"
      + ".vtt-sheetpop iframe{border:0;flex:1;width:100%;background:#fff}"
      + "@media(max-width:640px){.vtt-sheetpop{width:94vw;right:3vw}.vtt-sel{max-width:94vw}}";
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }
})();
