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
    light: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.4c.7.6 1 1.3 1 2.1h6c0-.8.3-1.5 1-2.1A6 6 0 0 0 12 3z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
    wall: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 12h18M9 5v7M15 12v7"/>',
    window: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/>',
    erase: '<path d="M4 20h16"/><path d="M15 6l3 3-8 8H6l-1-1z"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    ghost: '<path d="M12 3a7 7 0 0 0-7 7v10l2.5-2 2.5 2 2-2 2 2 2.5-2 2.5 2V10a7 7 0 0 0-7-7z"/><circle cx="9.5" cy="10" r="1"/><circle cx="14.5" cy="10" r="1"/>',
    refresh: '<path d="M4 11a8 8 0 0 1 13.4-4.4L20 9"/><path d="M20 4v5h-5"/><path d="M20 13a8 8 0 0 1-13.4 4.4L4 15"/><path d="M4 20v-5h5"/>',
    move: '<path d="M12 3v18M3 12h18"/><path d="M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
    circle: '<circle cx="12" cy="12" r="8"/>',
    live: '<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11"/>',
    lasso: '<ellipse cx="12" cy="10" rx="8" ry="5.5" stroke-dasharray="3 3"/><path d="M7 15.2c-1.2 1-1.4 2.6-.4 3.8"/><circle cx="6.2" cy="19.4" r="1.4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
    laser: '<circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22M5.2 5.2l2.4 2.4M16.4 16.4l2.4 2.4M18.8 5.2l-2.4 2.4M7.6 16.4l-2.4 2.4"/>',
  };
  function ico(n, s) { return '<svg viewBox="0 0 24 24" width="' + (s || 20) + '" height="' + (s || 20) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || "") + "</svg>"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  var COLORS = ["#4ea3ff", "#c8503a", "#5ac26a", "#c8a24a", "#a06ad4", "#e0863a", "#3ac6c6", "#d45a9a"];
  var RING_COLORS = [{ n: "Gold", v: "#c8a24a" }, { n: "Red", v: "#c8503a" }, { n: "Green", v: "#5ac26a" }, { n: "Blue", v: "#4ea3ff" }, { n: "Purple", v: "#a06ad4" }, { n: "White", v: "#e6ebf2" }];
  function colorFor(id) { var h = 0; id = String(id || ""); for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0; return COLORS[Math.abs(h) % COLORS.length]; }

  // Rail tool groups — declared before shell() builds the rail HTML from them.
  var TOOL_GROUPS = [
    { id: "select", title: "Select", subs: [
      { tool: "select", icon: "select", label: "Select / move", key: "V" },
    ] },
    { id: "measure", title: "Measure", subs: [
      { tool: "ruler", icon: "ruler", label: "Standard measure", key: "R" },
      { tool: "movement", icon: "move", label: "Movement (drag a token)", key: "M" },
      { tool: "rings", icon: "target", label: "Ranges / zones", key: "Z" },
    ] },
    { id: "pointer", title: "Pointer", subs: [
      { tool: "laser", icon: "laser", label: "Pointer", key: "P" },
    ] },
  ];
  var TOOL_SUB = {}, TOOL_GROUP = {}, GROUP_ACTIVE = {};
  TOOL_GROUPS.forEach(function (g) { GROUP_ACTIVE[g.id] = g.subs[0].tool; g.subs.forEach(function (s) { TOOL_SUB[s.tool] = s; TOOL_GROUP[s.tool] = g.id; }); });
  var TOOL_HINT = {
    select: "<b>Select:</b> click a token to move it · <b>Ctrl/⌘-click</b> tokens to select several, then drag any of them to move the group.",
    movement: "<b>Movement:</b> drag a token to see how far it's moving from where it started.",
    rings: "<b>Ranges:</b> press and drag to show Close / Near / Far rings around a point.",
    laser: "<b>Pointer:</b> hold and drag to point — everyone at the table sees it live.",
  };

  injectStyles();
  mount.innerHTML = shell();
  var $ = function (id) { return document.getElementById(id); };
  var board = window.VTTBoard($("vtt-canvas"), {});
  window.__vttBoard = board;
  board.setCanMove(function (t) { return isGM || t.ownerId === V.userId; });
  board.setGm(isGM);            // the GM sees hidden tokens (ghosted); players don't
  board.setCollision(!isGM);    // players are stopped by barriers; the GM moves freely
  if (!isGM) board.setViewerId(V.userId); // a player sees fog only through THEIR own tokens
  var net = null, currentScene = null;
  var readout = $("vtt-readout"), readoutTimer = null;
  // Transient status line (saves, "now live", ruler readout, connection). It
  // auto-hides so no explainer text lingers on the canvas.
  function say(h) { readout.innerHTML = h; readout.hidden = !h; if (readoutTimer) clearTimeout(readoutTimer); if (h) readoutTimer = setTimeout(function () { readout.hidden = true; }, 4500); }
  // Push the GM's table settings (fog, snap, opacity) to connected players.
  function pushSettings() { if (net && net.settings) net.settings(); }

  // ---- rail tools -----------------------------------------------------------
  // Each rail button is a GROUP with a flyout of sub-tools (TOOL_GROUPS defined
  // above). The main button shows/activates the group's last-used sub-tool.
  function setTool(t) {
    board.setTool(t);
    var gid = TOOL_GROUP[t], sub = TOOL_SUB[t];
    if (gid) {
      GROUP_ACTIVE[gid] = t;
      var mb = $("grp-" + gid); if (mb && sub) mb.querySelector(".vtt-gi").innerHTML = ico(sub.icon, 20);
      TOOL_GROUPS.forEach(function (g) { var b = $("grp-" + g.id); if (b) b.classList.toggle("on", g.id === gid); });
      var grpEl = mb ? mb.parentNode : null;
      if (grpEl) grpEl.querySelectorAll(".vtt-sub").forEach(function (s) { s.classList.toggle("on", s.dataset.tool === t); });
    }
    if (TOOL_HINT[t]) say(TOOL_HINT[t]);
    closeFlyouts();
  }
  function closeFlyouts() { (mount.querySelectorAll(".vtt-rail-group.open") || []).forEach(function (g) { g.classList.remove("open"); }); }
  // Wire each group: main button activates its current sub-tool (or toggles the
  // flyout if already active); flyout items pick a specific sub-tool.
  TOOL_GROUPS.forEach(function (g) {
    var main = $("grp-" + g.id); if (!main) return;
    main.onclick = function (e) {
      e.stopPropagation();
      var grpEl = main.parentNode, isActive = main.classList.contains("on");
      // Single-option groups (Select, Pointer) have no flyout — just activate.
      if (g.subs.length > 1 && isActive) { grpEl.classList.toggle("open"); }
      else { setTool(GROUP_ACTIVE[g.id]); }
    };
    var grpEl = main.parentNode;
    grpEl.querySelectorAll(".vtt-sub").forEach(function (sb) {
      sb.onclick = function (e) { e.stopPropagation(); setTool(sb.dataset.tool); };
    });
  });
  document.addEventListener("pointerdown", function (e) { if (!e.target.closest(".vtt-rail-group")) closeFlyouts(); }, true);

  bind("z-in", function () { board.zoomBy(1.2); });
  bind("z-out", function () { board.zoomBy(1 / 1.2); });
  bind("z-fit", function () { board.fitToMap(); });
  bind("conn-retry", function () { if (net && net.reconnect) { setConn("connecting"); net.reconnect(); } });
  board.on("ruler", function (r) { say("<b>" + r.text + "</b>"); });
  board.on("overlay", function (o) { if (net && net.overlay) net.overlay(o); });
  board.on("multiselect", function (e) { say(e.count ? "<b>" + e.count + "</b> token" + (e.count === 1 ? "" : "s") + " selected — drag any to move them together." : "Selection cleared."); });
  board.on("open", function (e) { openSheetForToken(e.token); });
  board.on("context", function (e) { showContext(e); });
  board.on("doorclick", function (e) { handleDoor(e.index); });
  // (Scene-token changes no longer re-render the Tokens tab — that tab is now the
  // campaign library, which is independent of what's on the map.)

  window.addEventListener("keydown", function (e) {
    var el = document.activeElement, tag = el && el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el && el.isContentEditable)) return;
    // Never hijack a browser/OS shortcut (Ctrl/⌘+S, etc.).
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key.toLowerCase();
    var byKey = { v: "select", r: "ruler", m: "movement", z: "rings", p: "laser" };
    if (byKey[k]) setTool(byKey[k]);
    else if (k === "c") toggleSheet();
    // GM-only table toggles — trigger the real buttons so their UI state stays synced.
    // s = Snapping, g = GM Reveal, e = Edit Mode (wall/door editor).
    else if (isGM && k === "s") { var bs = $("f-snap"); if (bs) bs.click(); }
    else if (isGM && k === "g") { var bg = $("f-reveal"); if (bg) bg.click(); }
    else if (isGM && k === "e") { var be = $("f-setup"); if (be) be.click(); }
    else if (k === "escape") { hideContext(); closeFlyouts(); if ($("sheetpop") && !$("sheetpop").hidden) { $("sheetpop").hidden = true; $("sheet-frame").src = "about:blank"; } }
  });

  // ---- character sheet popup ------------------------------------------------
  var chars = Array.isArray(V.myCharacters) ? V.myCharacters : [];
  // Open (or toggle) the character sheet — from the rail button or the "C" key.
  function toggleSheet() {
    var pop = $("sheetpop");
    if (pop && !pop.hidden) { pop.hidden = true; $("sheet-frame").src = "about:blank"; return; }
    if (!chars.length) { say("No character sheet is linked to this campaign yet."); return; }
    chars.length === 1 ? openSheet(chars[0]) : pickSheet();
  }
  bind("t-sheet", toggleSheet);
  function openSheetForToken(t) { if (chars.length === 1) openSheet(chars[0]); else if (chars.length) pickSheet(); }
  function pickSheet() {
    var b = $("t-sheet"), r = b ? b.getBoundingClientRect() : { right: 56, top: 60 };
    menuAt(chars.map(function (c) { return { label: c.title || "Character", onClick: function () { openSheet(c); } }; }), r.right + 8, r.top);
  }
  function openSheet(c) { $("sheet-title").textContent = c.title || "Character"; $("sheet-frame").src = (V.toolBase || "/tools") + "/" + encodeURIComponent(c.tool) + "/" + encodeURIComponent(c.id) + "?embed=1"; $("sheetpop").hidden = false; }
  bind("sheet-close", function () { $("sheetpop").hidden = true; $("sheet-frame").src = "about:blank"; });
  bind("sheet-mode", function () {
    var pop = $("sheetpop"), wide = pop.classList.toggle("wide");
    this.innerHTML = ico(wide ? "mobile" : "desktop", 16);
    this.title = wide ? "Switch to mobile size" : "Switch to desktop size";
  });
  makeDraggable($("sheetpop"), $("sheet-head"));

  // ---- doors ----------------------------------------------------------------
  // Left-click a door → open/close (both in and out of setup). Right-click a door
  // in setup → lock/unlock (GM only).
  function handleDoor(i) {
    var d = board.getDoor(i); if (!d) return;
    // A locked door never opens on a left-click — for anyone. The GM unlocks it
    // with a right-click first.
    if (d.locked) { say(isGM ? "That door is <b>locked</b> — right-click to unlock." : "That door is <b>locked</b>."); return; }
    var newClosed = !d.closed;
    if (isGM) { board.setDoor(i, { closed: newClosed }); if (net && net.doorSync) net.doorSync(i); }
    else if (net && net.door) net.door(i, newClosed);
  }
  function handleDoorLock(i) {
    if (!isGM) return;
    var d = board.getDoor(i); if (!d) return;
    var lock = !d.locked;
    board.setDoor(i, { locked: lock, closed: lock ? true : d.closed });
    if (net && net.doorSync) net.doorSync(i);
    say(lock ? "Door <b>locked</b>." : "Door unlocked.");
  }
  board.on("doorlock", function (e) { handleDoorLock(e.index); });

  // ---- GM controls ----------------------------------------------------------
  if (isGM) {
    bind("side-toggle", function () { toggleSide(); });
    bind("side-close", function () { toggleSide(false); });
    // tabs
    mount.querySelectorAll(".vtt-tab").forEach(function (b) { b.addEventListener("click", function () { selectTab(b.dataset.tab); }); });
    // map controls target the popup's PREVIEW board (not the live board)
    bind("m-load", function () { $("m-file").click(); });
    $("m-file").onchange = function (e) { var f = e.target.files[0]; if (!f) return; pb().loadFile(f).then(function () { seMapName(f.name); }, function (err) { say("<b>Load failed:</b> " + esc(err.message)); }); e.target.value = ""; };
    bind("m-url", function () {
      var u = prompt("Direct image URL (must be a direct link to the image file, from a host that allows embedding — e.g. GitHub 'raw', a Discord CDN link, imgur direct):");
      if (!u) return;
      pb().loadImageMap(u.trim(), parseInt($("m-ppg").value, 10) || 70, "url").then(function () { seMapName("Linked image"); }, function () {
        say("<b>Couldn’t load that link.</b> Either it isn’t a direct image URL, or the host doesn’t allow other sites to embed its images (CORS). Try a direct link from a host that does — or use <b>Upload</b>, which always works.");
      });
    });
    $("m-ppg").onchange = function () { pb().setPpg(parseInt(this.value, 10) || 70); };
    $("m-fpc").onchange = function () { pb().setFeetPerCell(parseFloat(this.value) || 5); };
    // scene editor
    bind("sc-new", function () { openEditor(null); });
    bind("se-close", closeEditor);
    bind("se-save", saveEditor);
    bind("se-del", function () { if (editId && confirm("Delete this scene?")) { delScene(editId); closeEditor(); } });
    // Settings panel. Fog of War is now a PER-SCENE setting (in the scene editor),
    // not a live table toggle. GM Reveal (g), Snapping (s) and Edit Mode (e) also
    // have keyboard shortcuts — see the keydown handler.
    fbtn("f-reveal", function (on) { board.setShowAll(on); say(on ? "GM Reveal on — you see the whole map." : "GM Reveal off — you see what the selected/owned tokens can."); }, true); // GM-only view, not shared
    fbtn("f-snap", function (on) { board.setSnap(on); pushSettings(); say(on ? "Grid snap on — tokens snap for you and your players." : "Grid snap off for everyone."); }, true);
    fbtn("f-setup", function (on) {
      board.setFogSetup(on);
      var bar = $("setupbar"); if (bar) bar.hidden = !on;
      if (on) { setSetupTool("select"); say(setupHint("select")); } else say("");
    });
    // setup toolbar (select / wall / window / door / erase)
    ["select", "wall", "window", "door", "erase"].forEach(function (k) {
      bind("su-" + k, function () { setSetupTool(k); say(setupHint(k)); });
    });
    // token library + editor
    bind("tok-add", function () { openTokenEditor(null); });
    bind("te-close", closeTokenEditor);
    bind("te-save", saveTokenEditor);
    bind("te-del", function () { if (teId && confirm("Remove this token from the library?")) { library = library.filter(function (x) { return x.id !== teId; }); saveLibrary(); renderTokens(); closeTokenEditor(); } });
    bind("te-img", function () { $("lib-file").click(); });
    var ts = $("tok-search"); if (ts) ts.oninput = function () { tokQuery = this.value; renderTokens(); };
  }

  function setSetupTool(k) {
    board.setSetupTool(k);
    ["select", "wall", "window", "door", "erase"].forEach(function (x) { var b = $("su-" + x); if (b) b.classList.toggle("on", x === k); });
  }
  function setupHint(k) {
    if (k === "select") return "<b>Select:</b> drag to move the map · drag a wall/window/door corner to reshape it · left-click a door to open/close · right-click to lock.";
    if (k === "window") return "<b>Window:</b> drag to draw a see-through barrier (blocks movement, not sight).";
    if (k === "door") return "<b>Door:</b> drag to place a door (starts closed).";
    if (k === "erase") return "<b>Erase:</b> click a wall, window or door to remove it.";
    return "<b>Wall:</b> click to drop points and draw connected walls · click the first point (or right-click / Esc) to finish.";
  }

  // ---- live sync ------------------------------------------------------------
  function startNet() {
    var transport = window.VTTNet.httpTransport({ base: V.signalBase, campaignId: V.campaignId, me: V.userId });
    if (isGM) { net = window.VTTNet.host({ transport: transport, board: board, me: V.userId, iceServers: V.iceServers, onPeers: renderPlayers }); renderPlayers([]); }
    else { net = window.VTTNet.guest({ transport: transport, board: board, me: V.userId, name: (chars[0] && chars[0].title) || V.userName, iceServers: V.iceServers, onStatus: setConn }); setConn("waiting"); }
  }
  // Player connection state: "waiting" | "connecting" | "connected" | "failed".
  var CONN_MSG = {
    connecting: "Connecting to your GM…",
    waiting: "Waiting for your GM to open the table…",
    connected: "Connected — your GM is running the table.",
    failed: "Can’t reach your GM directly — your network may be blocking the peer-to-peer connection. Try another network, or ask your GM for a link-based map.",
  };
  function setConn(state) {
    if (state === true) state = "connected"; else if (state === false) state = "waiting";
    var d = $("conn");
    if (d) { d.className = "vtt-dot " + (state === "connected" ? "live" : state === "failed" ? "bad" : "wait"); d.title = CONN_MSG[state] || ""; }
    var rc = $("conn-retry"); if (rc) rc.hidden = (state === "connected");
    if (state === "connected") say(CONN_MSG.connected);
    else if (state === "failed") say("<b>Can’t connect.</b> " + CONN_MSG.failed);
    else say(CONN_MSG[state] || "");
  }
  function renderPlayers(list) {
    var open = (list || []).filter(function (p) { return p.open; });
    var onlineById = {}; open.forEach(function (p) { onlineById[p.id] = p; });
    var d = $("conn"); if (d && isGM) { d.className = "vtt-dot live"; d.title = open.length + " player(s) connected"; }
    var box = $("players"); if (!box) return;
    // Show the WHOLE campaign roster (everyone with a character sheet linked to this
    // campaign) so the GM can set up tokens ahead of time, even for players who
    // haven't joined yet. A green dot marks the ones currently connected. Any
    // connected peer not in the roster (edge case) is appended.
    var rosterList = Array.isArray(V.players) ? V.players : [];
    var rows = [], seen = {};
    rosterList.forEach(function (p) { seen[p.id] = true; rows.push({ id: p.id, name: p.name, online: !!onlineById[p.id] }); });
    open.forEach(function (p) { if (!seen[p.id]) { seen[p.id] = true; rows.push({ id: p.id, name: p.name, online: true }); } });
    if (!rows.length) {
      box.innerHTML = '<div class="vtt-empty">No players yet. Players appear here once they join with the campaign code and link a character sheet.</div>';
      return;
    }
    box.innerHTML = rows.map(function (r) {
      return '<div class="vtt-prow"><span class="vtt-dot" style="background:' + colorFor(r.id) + '"></span>' +
        '<span class="vtt-pname">' + esc(r.name) + "</span>" +
        '<span class="vtt-pconn' + (r.online ? " on" : "") + '" title="' + (r.online ? "Connected" : "Not connected") + '"></span></div>';
    }).join("");
  }

  // ---- tabs -----------------------------------------------------------------
  function tab() { var a = mount.querySelector(".vtt-tab.on"); return a ? a.dataset.tab : "scenes"; }
  function selectTab(name) {
    mount.querySelectorAll(".vtt-tab").forEach(function (b) { b.classList.toggle("on", b.dataset.tab === name); });
    mount.querySelectorAll(".vtt-panel").forEach(function (p) { p.hidden = p.dataset.panel !== name; });
    if (name === "scenes") loadSceneList(); else if (name === "tokens") renderTokens();
  }

  // ---- scenes ---------------------------------------------------------------
  // The GM's board is ALWAYS what players see. Opening a scene loads it on the GM's
  // canvas and it is instantly shown to every connected player — there is no
  // separate "go live" step. The open scene auto-saves as the GM edits it.
  var curKey = "vtt-scene-" + V.campaignId, liveSaveTimer = null, loadingScene = false;
  // The embedded map image last persisted for the open scene. Autosave compares the
  // live map src against this (by reference — a new import makes a new string) so a
  // routine token/wall/door edit never re-uploads the multi-MB image; only a real
  // map change does. null until a scene is open.
  var lastSavedSrc = null;
  function rememberCurrent(id) { try { localStorage.setItem(curKey, id || ""); } catch (e) {} }
  function autoLoadLast() { var id = null; try { id = localStorage.getItem(curKey); } catch (e) {} if (id) openScene(id); }
  function thumbKey(id) { return "vtt-thumb-" + id; }
  function saveThumbFrom(bd, id) { try { var t = bd.thumbnail(220); if (t) localStorage.setItem(thumbKey(id), t); } catch (e) {} }
  function getThumb(id) { try { return localStorage.getItem(thumbKey(id)); } catch (e) { return null; } }

  function loadSceneList() {
    var el = $("scene-list"); if (!el) return;
    fetch(V.sceneBase + "?campaignId=" + encodeURIComponent(V.campaignId), { credentials: "same-origin" }).then(function (r) { return r.ok ? r.json() : { scenes: [] }; }).then(function (d) {
      if (!d.scenes || !d.scenes.length) { el.innerHTML = '<div class="vtt-empty">No scenes yet. <b>New scene</b> to create one.</div>'; return; }
      // Lock the list to a stable A→Z order by title (case-insensitive) so scenes
      // never shuffle around as they're edited/opened (the server returns them by
      // most-recently-updated).
      var scenes = d.scenes.slice().sort(function (a, b) {
        return String(a.title || "").toLowerCase().localeCompare(String(b.title || "").toLowerCase());
      });
      el.innerHTML = scenes.map(function (s) {
        var th = getThumb(s.id), active = currentScene && currentScene.id === s.id;
        return '<div class="vtt-scene' + (active ? " viewing" : "") + '" data-id="' + s.id + '" data-title="' + esc(s.title) + '"><div class="vtt-thumb">' + (th ? '<img src="' + th + '" alt="">' : ico("layers", 22)) + '</div><div class="vtt-scene-name" title="' + esc(s.title) + '">' + esc(s.title) + (active ? ' <span class="vtt-live-t">SHOWING</span>' : "") + '</div><button class="vtt-mini edit" title="Edit scene">' + ico("pencil", 14) + "</button></div>";
      }).join("");
      el.querySelectorAll(".vtt-scene").forEach(function (row) {
        var id = row.dataset.id, title = row.dataset.title;
        // Left-click OPENS the scene — which shows it to the players immediately.
        // The Edit pencil (and New) open the editor popup.
        row.addEventListener("click", function (e) { if (e.target.closest(".vtt-mini")) return; openScene(id); });
        row.querySelector(".edit").onclick = function (e) { e.stopPropagation(); openEditor({ id: id, title: title }); };
        row.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          menuAt([
            { label: "Open (show players)", onClick: function () { openScene(id); } },
            { label: "Edit scene", onClick: function () { openEditor({ id: id, title: title }); } },
            { sep: true },
            { label: "Delete", danger: true, onClick: function () { if (confirm("Delete this scene?")) delScene(id); } },
          ], e.clientX, e.clientY);
        });
      });
    });
  }
  // Open a scene: load it on the GM's canvas and push it to every player at once.
  function openScene(id) {
    return fetch(V.sceneBase + "/" + id, { credentials: "same-origin" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (doc) {
      if (!doc) return;
      loadingScene = true;
      return Promise.resolve(board.loadScene(doc.data)).then(function () {
        loadingScene = false;
        // The stored scene already holds this image, so autosave can omit it until
        // the GM actually imports a different map.
        lastSavedSrc = board.state.map ? board.state.map.src : null;
        if (net && net.pushScene) net.pushScene(); // make sure players get the full scene
        saveThumbFrom(board, id); currentScene = { id: doc.id, title: doc.title }; rememberCurrent(id);
        setSceneName(); loadSceneList(); say("Showing <b>" + esc(doc.title) + "</b> to your players.");
      });
    });
  }
  function delScene(id) { fetch(V.sceneBase + "/" + id, { method: "DELETE", credentials: "same-origin" }).then(function () { if (currentScene && currentScene.id === id) { currentScene = null; rememberCurrent(null); setSceneName(); } loadSceneList(); }); }
  function setSceneName() { var b = $("scene-badge"); if (!b) return; if (currentScene && currentScene.title) { b.textContent = currentScene.title; b.hidden = false; } else { b.textContent = ""; b.hidden = true; } }

  // Auto-save the scene currently open on the GM's board as they edit it.
  function autoSaveLive() {
    if (loadingScene || !currentScene) return;
    if (liveSaveTimer) clearTimeout(liveSaveTimer);
    liveSaveTimer = setTimeout(function () {
      liveSaveTimer = null;
      var id = currentScene.id, data = board.toScene(currentScene ? currentScene.title : "Scene");
      // Don't re-upload the embedded map image on a routine edit — it's by far the
      // biggest part of the payload and only changes on a new import. When it's
      // unchanged, send the scene WITHOUT the image and flag keepSrc so the server
      // keeps the stored image; this keeps the GM's tab light and saves bandwidth.
      if (data.map && data.map.srcType === "embedded" && data.map.src && data.map.src === lastSavedSrc) {
        data = Object.assign({}, data, { map: Object.assign({}, data.map, { src: null, keepSrc: true }) });
      } else if (data.map) {
        lastSavedSrc = data.map.src; // a full save (new/changed image, or a URL map)
      }
      fetch(V.sceneBase + "/" + id, { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ data: data }) })
        .then(function () { saveThumbFrom(board, id); }).catch(function () {});
    }, 900);
  }
  board.on("map", autoSaveLive);
  board.on("token", autoSaveLive);

  // ---- scene editor popup (#3) — previews in its own board, never goes live ---
  var editId = null, pboard = null;
  function pb() {
    if (!pboard) { pboard = window.VTTBoard($("se-canvas"), {}); }
    return pboard;
  }
  function seMapName(name) { var el = $("se-mapname"); if (el) el.innerHTML = name ? (ico("upload", 14) + " " + esc(name)) : ""; var em = $("se-empty"); if (em) em.hidden = !!(pboard && pboard.state.map.widthPx); }
  function openEditor(scene) {
    editId = scene && scene.id ? scene.id : null;
    $("se-h").textContent = editId ? "Edit scene" : "New scene";
    $("se-del").hidden = !editId;
    $("scene-editor").hidden = false;
    pb().resize(); // the canvas is measurable now that the popup is shown
    var finish = function (title) {
      $("se-name").value = title || "";
      $("m-ppg").value = pboard.state.map.ppg || 70;
      $("m-fpc").value = pboard.state.feetPerCell || 5;
      // Per-scene Fog of War / grid — reflect what loadScene applied (both default on).
      $("se-fog").checked = !!pboard.state.fog.enabled;
      $("se-grid").checked = pboard.state.grid !== false;
      seMapName(pboard.state.map.src ? (pboard.state.map.srcType === "url" ? "Linked image" : "Loaded map") : "");
      pboard.resize();
    };
    if (editId) {
      fetch(V.sceneBase + "/" + editId, { credentials: "same-origin" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (doc) {
        if (!doc) { finish(scene.title); return; }
        Promise.resolve(pboard.loadScene(doc.data)).then(function () { finish(doc.title); });
      });
    } else {
      pboard.loadScene({ kind: "dcc-vtt-scene", version: 1, name: "New scene", map: {}, tokens: [] });
      finish("");
    }
  }
  function closeEditor() { $("scene-editor").hidden = true; }
  function saveEditor() {
    var name = ($("se-name").value || "").trim() || "Scene";
    // Fold the per-scene Fog of War / grid choices into the preview board before
    // serializing, so toScene() captures them.
    pb().setFog($("se-fog").checked);
    pb().setGrid($("se-grid").checked);
    var data = pb().toScene(name);
    if (editId) {
      var id = editId;
      fetch(V.sceneBase + "/" + id, { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: name, data: data }) })
        .then(function (r) { if (r.ok) { saveThumbFrom(pboard, id); loadSceneList(); say("Saved <b>" + esc(name) + "</b>"); closeEditor(); if (currentScene && currentScene.id === id) openScene(id); } else say("<b>Save failed</b>"); });
    } else {
      fetch(V.sceneBase, { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ campaignId: V.campaignId, title: name, data: data }) })
        .then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
          if (d && d.scene) { saveThumbFrom(pboard, d.scene.id); loadSceneList(); say("Saved <b>" + esc(name) + "</b> — right-click it to send live."); closeEditor(); }
          else say("<b>Save failed</b>");
        });
    }
  }

  // ---- token library (#4) — a persisted, per-campaign set of tokens ---------
  // The library is separate from what's ON the scene: "Place" drops a copy on the
  // map; removing a token from the map (Delete / right-click) never touches the
  // library, and adding to the library never touches the scene.
  var library = [], libSaveTimer = null;
  function libUid() { return "lt" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function loadLibrary() {
    if (!V.tokenBase) return;
    fetch(V.tokenBase + "?campaignId=" + encodeURIComponent(V.campaignId), { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : { tokens: [] }; })
      .then(function (d) { library = (d && Array.isArray(d.tokens)) ? d.tokens : []; if (tab() === "tokens") renderTokens(); })
      .catch(function () {});
  }
  function saveLibrary() {
    if (!V.tokenBase) return;
    if (libSaveTimer) clearTimeout(libSaveTimer);
    libSaveTimer = setTimeout(function () {
      libSaveTimer = null;
      fetch(V.tokenBase, { method: "PUT", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ campaignId: V.campaignId, tokens: library }) }).catch(function () {});
    }, 400);
  }
  var tokQuery = "", dragLibId = null, dragParty = false, stockOpen = false, stockData = null, dragStock = null;
  var roster = Array.isArray(V.players) ? V.players : [];
  function ownerLabel(id) {
    if (!id) return ""; if (id === V.userId) return "GM";
    var p = roster.filter(function (x) { return x.id === id; })[0]; if (p) return p.name;
    var pk = (net && net.peers ? net.peers() : []).filter(function (x) { return x.id === id; })[0];
    return pk ? pk.name : "Player";
  }
  // Read an uploaded image file and hand back a SMALL token data URL: downscaled so
  // its longest side is <= 256px. Tokens draw small, and a full-res photo as a token
  // bloats the library (localStorage) and, more importantly, the live-sync payload —
  // a big token image is shipped to every player, so keeping it small keeps sync
  // snappy. Falls back to the raw data URL if the image can't be decoded, and never
  // inflates an already-tiny source.
  function tokenImageFromFile(f, cb) {
    var rd = new FileReader();
    rd.onload = function () {
      var raw = rd.result, img = new Image();
      img.onload = function () {
        var w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
        if (!w || !h) return cb(raw);
        var sc = Math.min(1, 256 / Math.max(w, h));
        var tw = Math.max(1, Math.round(w * sc)), th = Math.max(1, Math.round(h * sc));
        var c = document.createElement("canvas"); c.width = tw; c.height = th;
        var out;
        try { c.getContext("2d").drawImage(img, 0, 0, tw, th); out = c.toDataURL("image/png"); }
        catch (e) { out = raw; }
        cb(out && out.length < raw.length ? out : raw);
      };
      img.onerror = function () { cb(raw); };
      img.src = raw;
    };
    rd.readAsDataURL(f);
  }
  // Build an addToken() spec from a library token, applying all its presets.
  function tokenSpec(lt) {
    var g = board.state.map.ppg || 70, sz = lt.size || 1;
    return { imageUrl: lt.imageUrl || null, name: lt.name, w: g * sz, h: g * sz, ownerId: lt.ownerId || null,
      isViewer: !!lt.isViewer, vision: typeof lt.vision === "number" ? lt.vision : null, hidden: !!lt.hidden,
      ring: !!lt.ring, ringColor: lt.ringColor || null, color: lt.ownerId ? colorFor(lt.ownerId) : "#c8a24a" };
  }
  function libRow(lt) {
    var av = lt.imageUrl ? '<img src="' + esc(lt.imageUrl) + '" alt="">' : '<span class="vtt-swatch" style="background:' + (lt.ownerId ? colorFor(lt.ownerId) : "#c8a24a") + '"></span>';
    var bits = []; if (lt.ownerId) bits.push(ownerLabel(lt.ownerId)); if (lt.isViewer) bits.push("vision"); if (lt.hidden) bits.push("hidden"); if (lt.ring) bits.push("ring");
    var sub = bits.join(" · ");
    return '<div class="vtt-trow" data-id="' + lt.id + '" draggable="true" title="Drag onto the map to place"><div class="vtt-tav">' + av + '</div><div class="vtt-tinfo"><div class="vtt-tname">' + esc(lt.name || "Token") + '</div>' + (sub ? '<div class="vtt-tsub">' + esc(sub) + "</div>" : "") + '</div><button class="vtt-mini edit" title="Edit token">' + ico("pencil", 14) + "</button></div>";
  }
  // Only the GM's OWN library tokens (not stock overrides, which live in the same
  // array but are the built-in stock set customised for this campaign).
  function realLib() { return library.filter(function (x) { return !x.stock; }); }
  // The saved override for a stock token (assignment, vision, name, …), or null.
  function stockOv(url) { for (var i = 0; i < library.length; i++) { if (library[i].stock && library[i].stockUrl === url) return library[i]; } return null; }
  // Make sure the built-in stock manifest is loaded, then run cb.
  function ensureStock(cb) {
    if (stockData) { cb && cb(); return; }
    fetch((V.stockBase || "/vtt") + "/stock-tokens.json", { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { stockData = d || { categories: [] }; cb && cb(); })
      .catch(function () { stockData = { categories: [], error: true }; cb && cb(); });
  }

  function renderTokens() {
    var el = $("token-list"); if (!el) return;
    ensureStock(function () { if (tab() === "tokens") paintTokens(el); });
    paintTokens(el);
  }
  function paintTokens(el) {
    var party = partyTokens();
    var partyBar = party.length ? '<div class="vtt-party" id="party-chip" draggable="true" title="Drag onto the map, or click, to place the whole party">' + ico("players", 16) + "<span>Place party <b>(" + party.length + ")</b></span>" + ico("move", 14) + "</div>" : "";
    var q = tokQuery.trim().toLowerCase();
    function matchQ(nm) { return !q || (nm || "").toLowerCase().indexOf(q) >= 0; }
    // Players group = anything assigned to a player (own library tokens AND assigned
    // stock tokens — both are library entries). "Tokens" = the GM's own unassigned
    // library tokens. Stock built-ins get their own collapsible section below.
    var assigned = library.filter(function (lt) { return lt.ownerId && lt.ownerId !== V.userId && matchQ(lt.name); });
    var rest = library.filter(function (lt) { return !lt.stock && !(lt.ownerId && lt.ownerId !== V.userId) && matchQ(lt.name); });
    var html = partyBar;
    // Players + custom tokens render as a 3-to-a-row tile grid (like Stock): just
    // the art + a name. For an assigned token the label is the PLAYER's name.
    if (assigned.length) html += '<div class="vtt-sec-h">Players</div><div class="vtt-stock-grid">' + assigned.map(function (lt) { return libTile(lt, ownerLabel(lt.ownerId)); }).join("") + "</div>";
    if (rest.length) html += (assigned.length ? '<div class="vtt-sec-h" style="margin-top:10px">Tokens</div>' : "") + '<div class="vtt-stock-grid">' + rest.map(function (lt) { return libTile(lt, lt.name || "Token"); }).join("") + "</div>";
    if (!assigned.length && !rest.length && !realLib().length) html += '<div class="vtt-empty">Your token library is empty. <b>Add token</b> for your own art, or open <b>Stock tokens</b> below for the built-in set.</div>';
    html += stockSectionHtml(q);
    el.innerHTML = html;
    wireParty();
    el.querySelectorAll(".vtt-ltile").forEach(function (tile) {
      var id = tile.dataset.id, lt = library.filter(function (x) { return x.id === id; })[0]; if (!lt) return;
      tile.addEventListener("dragstart", function (e) { dragLibId = id; try { e.dataTransfer.setData("text/plain", "lib:" + id); e.dataTransfer.effectAllowed = "copy"; } catch (_) {} });
      tile.addEventListener("dragend", function () { dragLibId = null; });
      tile.addEventListener("click", function (e) { if (e.target.closest(".edit")) return; var r = stage.getBoundingClientRect(); placeLibAt(lt, r.left + r.width / 2, r.top + r.height / 2); });
      var ed = tile.querySelector(".edit"); if (ed) ed.onclick = function (e) { e.stopPropagation(); openTokenEditor(lt); };
    });
    wireStock(el);
  }
  // A library-token tile for the Players / Tokens grids: art (or a colour swatch)
  // plus a single label — the player's name for assigned tokens, else the token name.
  function libTile(lt, label) {
    var av = lt.imageUrl ? '<img src="' + esc(lt.imageUrl) + '" alt="" loading="lazy">' : '<span class="vtt-tswatch" style="background:' + (lt.ownerId ? colorFor(lt.ownerId) : "#c8a24a") + '"></span>';
    return '<div class="vtt-ltile" data-id="' + esc(lt.id) + '" draggable="true" title="' + esc(label) + '">' + av + "<span>" + esc(label) + "</span>" +
      '<button class="vtt-stok-edit edit" title="Edit token">' + ico("pencil", 12) + "</button></div>";
  }
  function wireParty() {
    var pc = $("party-chip"); if (!pc) return;
    pc.onclick = function () { var r = stage.getBoundingClientRect(); placeParty(r.left + r.width / 2, r.top + r.height / 2); };
    pc.addEventListener("dragstart", function (e) { dragParty = true; try { e.dataTransfer.setData("text/plain", "party"); e.dataTransfer.effectAllowed = "copy"; } catch (_) {} });
    pc.addEventListener("dragend", function () { dragParty = false; });
  }
  function placeLibAt(lt, sx, sy) {
    var t = board.addTokenAtScreen(tokenSpec(lt), sx, sy);
    if (net) net.pushTokens(); board.select(t.id);
    say("Placed <b>" + esc(lt.name || "token") + "</b> on the map.");
  }
  // ---- stock tokens: a built-in set, shown as a collapsible section of the -----
  // library. Each can be assigned to a player, given vision, sized, hidden, ringed
  // — the full token editor minus Delete and Change-image (the art is fixed). Those
  // edits are saved as image-locked library entries (stock:true), so an assigned
  // stock token behaves exactly like any other party token (owner, vision/FoW, Place
  // party) and syncs to players.
  function stockSectionHtml(q) {
    var cats = (stockData && stockData.categories) || [];
    var open = stockOpen || !!q; // a search auto-opens the section so it reaches stock
    var head = '<div class="vtt-stock-head' + (open ? " open" : "") + '" id="stock-head"><span class="vtt-stock-chev">▸</span><span>Stock tokens</span></div>';
    if (!open) return head;
    if (stockData && stockData.error) return head + '<div class="vtt-empty">Could not load stock tokens.</div>';
    if (!stockData) return head + '<div class="vtt-empty">Loading stock tokens…</div>';
    var body = "";
    cats.forEach(function (cat) {
      var toks = (cat.tokens || []).filter(function (t) { return !q || t.name.toLowerCase().indexOf(q) >= 0; });
      if (!toks.length) return;
      body += '<div class="vtt-sec-h sub">' + esc(cat.name) + '</div><div class="vtt-stock-grid">' +
        toks.map(function (t) {
          var ov = stockOv(t.url), owned = ov && ov.ownerId && ov.ownerId !== V.userId;
          var dot = owned ? '<i class="vtt-stok-dot" style="background:' + colorFor(ov.ownerId) + '" title="' + esc(ownerLabel(ov.ownerId)) + '"></i>' : "";
          var nm = (ov && ov.name) || t.name;
          return '<div class="vtt-stok" data-url="' + esc(t.url) + '" data-name="' + esc(t.name) + '" draggable="true" title="' + esc(nm) + '">' +
            '<img src="' + esc(t.url) + '" alt="" loading="lazy"><span>' + esc(nm) + "</span>" + dot +
            '<button class="vtt-stok-edit edit" title="Edit / assign to a player">' + ico("pencil", 12) + "</button></div>";
        }).join("") + "</div>";
    });
    return head + (body || '<div class="vtt-empty">No stock tokens match “' + esc(tokQuery) + '”.</div>');
  }
  function wireStock(el) {
    var head = el.querySelector("#stock-head");
    if (head) head.onclick = function () { stockOpen = !stockOpen; renderTokens(); };
    el.querySelectorAll(".vtt-stok").forEach(function (tile) {
      var url = tile.dataset.url, name = tile.dataset.name;
      tile.addEventListener("click", function (e) { if (e.target.closest(".edit")) return; var r = stage.getBoundingClientRect(); placeStock(url, name, r.left + r.width / 2, r.top + r.height / 2); });
      tile.addEventListener("dragstart", function (e) { dragStock = { url: url, name: name }; try { e.dataTransfer.setData("text/plain", "stock:" + url); e.dataTransfer.effectAllowed = "copy"; } catch (_) {} });
      tile.addEventListener("dragend", function () { dragStock = null; });
      var ed = tile.querySelector(".edit"); if (ed) ed.onclick = function (e) { e.stopPropagation(); openStockEditor(url, name); };
    });
  }
  // Open the token editor for a stock built-in: its saved override if it has one,
  // else a fresh image-locked draft seeded from the built-in.
  function openStockEditor(url, name) {
    var ov = stockOv(url);
    if (ov) return openTokenEditor(ov);
    openTokenEditor({ id: libUid(), name: name, imageUrl: url, stock: true, stockUrl: url, size: 1, ownerId: null, isViewer: false, vision: null, hidden: false, ring: false, ringColor: "#c8a24a" });
  }
  function placeStock(url, name, sx, sy) {
    var ov = stockOv(url);
    var spec = ov ? tokenSpec(ov) : { imageUrl: url, name: name || "Token" };
    var t = board.addTokenAtScreen(spec, sx, sy);
    if (net) net.pushTokens(); board.select(t.id);
    say("Placed <b>" + esc((ov && ov.name) || name || "token") + "</b> on the map.");
  }
  // Party = library tokens assigned to a player (i.e. anyone but the GM).
  function partyTokens() { return library.filter(function (lt) { return lt.ownerId && lt.ownerId !== V.userId; }); }
  // Drop the whole party onto the map at once, clustered around (sx,sy), skipping
  // any member already on the board (matched by owner + name).
  function placeParty(sx, sy) {
    var party = partyTokens();
    if (!party.length) { say("No party members yet — assign library tokens to players first."); return; }
    var onBoard = {};
    board.state.tokens.forEach(function (t) { if (t.ownerId) onBoard[t.ownerId + "|" + (t.name || "")] = true; });
    var toPlace = party.filter(function (lt) { return !onBoard[lt.ownerId + "|" + (lt.name || "")]; });
    if (!toPlace.length) { say("The whole party is already on the map."); return; }
    var g = board.state.map.ppg || 70, sc = board.state.cam.scale;
    var cols = Math.ceil(Math.sqrt(toPlace.length)), first = null;
    toPlace.forEach(function (lt, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var ox = (col - (cols - 1) / 2) * g, oy = (row - (Math.ceil(toPlace.length / cols) - 1) / 2) * g;
      var t = board.addTokenAtScreen(tokenSpec(lt), sx + ox * sc, sy + oy * sc);
      if (!first) first = t;
    });
    if (net) net.pushTokens();
    if (first) board.select(first.id);
    say("Placed <b>" + toPlace.length + "</b> party member" + (toPlace.length === 1 ? "" : "s") + " on the map.");
  }

  // ---- token editor popup (#5) ----------------------------------------------
  var teId = null, teDraft = null;
  function openTokenEditor(lt) {
    // teId is set only when this token is already saved in the library — a stock
    // built-in opened for the first time has an id but isn't in the library yet, so
    // Save PUSHES it (adopting the override) rather than trying to replace.
    teId = (lt && lt.id && library.some(function (x) { return x.id === lt.id; })) ? lt.id : null;
    teDraft = lt ? JSON.parse(JSON.stringify(lt)) : { id: libUid(), name: "", imageUrl: null, size: 1, ownerId: null, isViewer: false, vision: null, hidden: false, ring: false, ringColor: "#c8a24a" };
    var isStock = !!(teDraft && teDraft.stock);
    $("te-h").textContent = isStock ? "Stock token" : (teId ? "Edit token" : "Add token");
    // Stock tokens can't be deleted (built-in) or have their image changed (fixed art).
    $("te-del").hidden = !teId || isStock;
    var img = $("te-img"); if (img) img.style.display = isStock ? "none" : "";
    $("te-name").value = teDraft.name || "";
    $("te-size").value = teDraft.size || 1;
    // owner options: Unassigned / Me (GM) / roster / any extra connected peers
    var opts = [{ id: "", n: "Unassigned" }, { id: V.userId, n: "Me (GM)" }];
    roster.forEach(function (p) { opts.push({ id: p.id, n: p.name }); });
    (net && net.peers ? net.peers() : []).forEach(function (p) { if (!opts.some(function (o) { return o.id === p.id; })) opts.push({ id: p.id, n: p.name }); });
    $("te-owner").innerHTML = opts.map(function (o) { return '<option value="' + esc(o.id) + '"' + (String(teDraft.ownerId || "") === o.id ? " selected" : "") + ">" + esc(o.n) + "</option>"; }).join("");
    var fpc = board.state.feetPerCell || 5;
    $("te-vdist").value = teDraft.vision != null ? String(Math.round(teDraft.vision * fpc)) : "";
    $("te-hidden").checked = !!teDraft.hidden;
    $("te-ring").checked = !!teDraft.ring;
    $("te-ringcolor").value = teDraft.ringColor || "#c8a24a";
    teAvatar();
    $("token-editor").hidden = false;
  }
  function teAvatar() { var a = $("te-av"); if (a) a.innerHTML = teDraft && teDraft.imageUrl ? '<img src="' + esc(teDraft.imageUrl) + '" alt="">' : '<span class="vtt-swatch" style="background:' + (teDraft && teDraft.ownerId ? colorFor(teDraft.ownerId) : "#c8a24a") + '"></span>'; }
  function closeTokenEditor() { $("token-editor").hidden = true; }
  function saveTokenEditor() {
    if (!teDraft) return;
    var fpc = board.state.feetPerCell || 5;
    teDraft.name = ($("te-name").value || "").trim() || teDraft.name || "Token";
    teDraft.size = Math.max(1, parseInt($("te-size").value, 10) || 1);
    teDraft.ownerId = $("te-owner").value || null;
    var vv = $("te-vdist").value;
    teDraft.vision = vv === "" ? null : (parseFloat(vv) || 0) / fpc;
    // Every token can reveal fog now (governed by FoW on/off + ownership/selection),
    // so a token is always a potential viewer — no separate "sees fog" flag.
    teDraft.isViewer = true;
    teDraft.hidden = $("te-hidden").checked;
    teDraft.ring = $("te-ring").checked;
    teDraft.ringColor = $("te-ringcolor").value;
    if (teId) { library = library.map(function (x) { return x.id === teId ? teDraft : x; }); }
    else { library.push(teDraft); }
    saveLibrary(); renderTokens(); closeTokenEditor();
  }
  // ---- token context menu ---------------------------------------------------
  function showContext(e) {
    var t = e.token, items = [];
    if (t) {
      if (isGM) {
        // Quick per-token tweaks only — Rename, Size, Vision, Hide, Ring. Owner,
        // "sees fog", image, copy and delete all live in the library editor now,
        // and the sheet opens from the rail button or the C shortcut.
        items.push({ label: "Rename…", onClick: function () { var n = prompt("Token name:", t.name || ""); if (n != null) { t.name = n; board.render(); if (net) net.pushTokens(); } } });
        items.push({ label: "Size", sub: [1, 2, 3, 4].map(function (n) { return { label: n + "× (" + n + " sq)", onClick: function () { var g = board.state.map.ppg || 70; t.w = t.h = g * n; board.render(); if (net) net.pushTokens(); } }; }) });
        // Vision is how far this token sees; Unlimited = as far as walls allow. Fog
        // reveal itself is governed by FoW on/off + who owns/selects the token.
        var visOpts = [{ v: null, l: "Unlimited" }, { ft: 120 }, { ft: 60 }, { ft: 30 }, { ft: 10 }];
        items.push({ label: "Vision", sub: visOpts.map(function (o) {
          var fpc = board.state.feetPerCell || 5, cells = o.v === null ? null : o.ft / fpc;
          var cur = cells === null ? t.vision == null : (t.vision != null && Math.abs(t.vision - cells) < 0.01);
          return { label: (o.l || o.ft + " ft") + (cur ? "  ✓" : ""), onClick: function () { t.vision = cells; t.isViewer = true; board.render(); if (net) net.pushTokens(); } };
        }) });
        items.push({ label: (t.hidden ? "✓ " : "") + "Hide from players", onClick: function () { board.setHidden(t.id, !t.hidden); if (net) net.pushTokens(); say(t.hidden ? "Token <b>hidden</b> from players." : "Token visible to players."); } });
        var ringSub = [{ label: (!t.ring ? "✓ " : "") + "Off", onClick: function () { board.setRing(t.id, false); if (net) net.pushTokens(); } }];
        RING_COLORS.forEach(function (c) { ringSub.push({ label: (t.ring && (t.ringColor || t.color) === c.v ? "✓ " : "") + c.n, onClick: function () { board.setRing(t.id, true, c.v); if (net) net.pushTokens(); } }); });
        items.push({ label: (t.ring ? "✓ " : "") + "Ring", sub: ringSub });
        // Conditions: toggle any of the built-in condition rings on this token. Each
        // stays open so several can be flipped at once; a live count shows on the item.
        var condSub = [{ label: "Clear all", onClick: function () { board.setConditions(t.id, []); if (net) net.pushTokens(); } }, { sep: true }];
        board.conditions().forEach(function (key) {
          condSub.push({ label: board.conditionName(key), keepOpen: true, check: board.tokenHasCondition(t.id, key), onClick: function () { var on = board.toggleCondition(t.id, key); if (net) net.pushTokens(); return on; } });
        });
        var cn = (t.conditions || []).length;
        items.push({ label: "Conditions" + (cn ? " (" + cn + ")" : ""), sub: condSub, subScroll: true });
      }
    }
    if (items.length) menuAt(items, e.sx, e.sy);
  }
  // Generic browser filenames (download.png, image, IMG_1234, screenshot…) make
  // lousy token names — fall back to "Token N" instead.
  function tokenName(fname, n) {
    var base = (fname || "").replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
    if (!base || /^(download|image|untitled|unnamed|photo|screenshot|clipboard|dfclip)\b/i.test(base) || /^img\s?\d*$/i.test(base)) return "Token " + (n || 1);
    return base.charAt(0).toUpperCase() + base.slice(1);
  }

  if (isGM) {
    // Token-editor "Change image" → set the draft token's image (+ default name).
    $("lib-file").onchange = function (e) {
      var f = e.target.files[0]; if (!f || !teDraft) return;
      tokenImageFromFile(f, function (url) { teDraft.imageUrl = url; if (!teDraft.name) { teDraft.name = tokenName(f.name, library.length + 1); $("te-name").value = teDraft.name; } teAvatar(); });
      e.target.value = "";
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
      var b = document.createElement("div"); b.className = "vtt-ctx-item" + (it.danger ? " danger" : "") + (it.sub ? " has-sub" : "");
      if (it.sub) {
        b.textContent = it.label + " ▸";
        var sub = document.createElement("div"); sub.className = "vtt-ctx sub" + (it.subScroll ? " scroll" : "");
        renderMenu(sub, it.sub); b.appendChild(sub);
      } else if (it.keepOpen) {
        // A toggle that stays open so several can be flipped in one visit — the mark
        // updates in place and onClick returns the new checked state.
        var ck = document.createElement("span"); ck.className = "vtt-ctx-ck"; ck.textContent = it.check ? "✓" : "";
        b.appendChild(ck); b.appendChild(document.createTextNode(it.label));
        b.addEventListener("click", function (e) { e.stopPropagation(); var on = it.onClick && it.onClick(); ck.textContent = on ? "✓" : ""; });
      } else {
        b.textContent = it.label;
        b.addEventListener("click", function () { hideContext(); it.onClick && it.onClick(); });
      }
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
    // Dragging a library token onto the map places it (with all its presets).
    var txt = ""; try { txt = (e.dataTransfer && e.dataTransfer.getData("text/plain")) || ""; } catch (_) {}
    if (dragParty || txt === "party") { dragParty = false; placeParty(e.clientX, e.clientY); return; }
    if (dragStock || txt.indexOf("stock:") === 0) { var su = dragStock ? dragStock.url : txt.slice(6), sn = dragStock ? dragStock.name : ""; dragStock = null; placeStock(su, sn, e.clientX, e.clientY); return; }
    if (dragLibId || txt.indexOf("lib:") === 0) {
      var id = dragLibId || txt.slice(4), lt = library.filter(function (x) { return x.id === id; })[0];
      dragLibId = null;
      if (lt) placeLibAt(lt, e.clientX, e.clientY);
      return;
    }
    // Dropping image files makes one-off scene tokens.
    var files = (e.dataTransfer && e.dataTransfer.files) || []; var n = 0;
    Array.prototype.forEach.call(files, function (f) { if (!/^image\//.test(f.type)) return; var ix = n++; tokenImageFromFile(f, function (url) { board.addTokenAtScreen({ imageUrl: url, name: tokenName(f.name, board.state.tokens.length + 1) }, e.clientX + ix * 8, e.clientY); if (net) net.pushTokens(); }); });
  });

  startNet(); setTool("select"); if (isGM) { setSceneName(); loadLibrary(); autoLoadLast(); }

  // ---- shell + styles -------------------------------------------------------
  function rb(id, name, label, on) { return '<button class="vtt-tbtn' + (on ? " on" : "") + '" id="' + id + '" title="' + label + '">' + ico(name) + "</button>"; }
  // A rail tool GROUP: a main button (shows the active sub-tool) + a hover/tap
  // flyout of sub-tools.
  function railGroup(g, on) {
    // A single-option group is just a plain tool button — no caret, no flyout.
    var single = g.subs.length < 2;
    var main = '<button class="vtt-tbtn vtt-groupbtn' + (on ? " on" : "") + '" id="grp-' + g.id + '" title="' + esc(single ? g.subs[0].label : g.title) + '"><span class="vtt-gi">' + ico(g.subs[0].icon, 20) + "</span>" + (single ? "" : '<i class="vtt-caret"></i>') + "</button>";
    if (single) return '<div class="vtt-rail-group single">' + main + "</div>";
    var subs = g.subs.map(function (s) {
      return '<button class="vtt-sub" data-tool="' + s.tool + '" title="' + esc(s.label) + (s.key ? "  (" + s.key + ")" : "") + '">' + ico(s.icon, 18) + "<span>" + esc(s.label) + (s.key ? ' <b class="vtt-key">' + s.key + "</b>" : "") + "</span></button>";
    }).join("");
    return '<div class="vtt-rail-group">' + main + '<div class="vtt-flyout">' + subs + "</div></div>";
  }
  function frow(id, name, label, on) { return '<button class="vtt-frow' + (on ? " on" : "") + '" id="' + id + '" role="switch" aria-checked="' + (on ? "true" : "false") + '"><span class="vtt-frow-i">' + ico(name, 18) + '</span><span class="vtt-frow-l">' + label + '</span><span class="vtt-switch" aria-hidden="true"></span></button>'; }
  function subtn(id, name, label, on) { return '<button class="vtt-sub-t' + (on ? " on" : "") + '" id="' + id + '" title="' + label + '">' + ico(name, 17) + "<span>" + label + "</span></button>"; }
  function shell() {
    var rail = TOOL_GROUPS.map(function (g, i) { return railGroup(g, i === 0); }).join("") + '<div class="vtt-rail-sep"></div>' + rb("t-sheet", "sheet", "My character sheet");
    var top = '<div class="vtt-top"><a class="vtt-tbtn" href="/dashboard" title="Back to dashboard">' + ico("home") + '</a><div class="vtt-title">' + esc(V.campaignName || "Tabletop") + '</div><span class="vtt-scene-badge" id="scene-badge" hidden></span></div>' +
      '<div class="vtt-top right"><span class="vtt-dot wait" id="conn" title="Connecting…"></span>' + (!isGM ? '<button class="vtt-tbtn" id="conn-retry" title="Reconnect to your GM" hidden>' + ico("refresh", 18) + "</button>" : "") + (isGM ? '<button class="vtt-tbtn" id="side-toggle" title="Table panel">' + ico("layers") + "</button>" : "") + "</div>";
    var side = !isGM ? "" : '<div class="vtt-side" id="vtt-side" hidden>' +
      '<button class="vtt-side-x" id="side-close" title="Close panel">' + ico("close", 16) + "</button>" +
      '<div class="vtt-tabs">' + tabBtn("scenes", "layers", "Scenes", true) + tabBtn("tokens", "token", "Tokens") + tabBtn("settings", "gear", "Settings") + "</div>" +
      // scenes: just New + the list (each row has an Edit button -> editor popup)
      '<div class="vtt-panel" data-panel="scenes"><div class="vtt-row"><button class="vtt-btn" id="sc-new">' + ico("plus", 15) + ' New scene</button></div>' +
      '<div class="vtt-scene-list" id="scene-list"></div></div>' +
      // tokens: campaign token library (decoupled from the scene)
      '<div class="vtt-panel" data-panel="tokens" hidden>' +
      '<div class="vtt-row" id="tok-addrow"><button class="vtt-btn" id="tok-add">' + ico("plus", 15) + ' Add token</button></div>' +
      '<input type="text" id="tok-search" class="vtt-search" placeholder="Search tokens & stock by name…"><div class="vtt-token-list" id="token-list"></div></div>' +
      // settings — table toggles (reveal/snap/edit), then the player roster section
      '<div class="vtt-panel" data-panel="settings" hidden>' +
      frow("f-reveal", "eye", "GM Reveal", true) + frow("f-snap", "snap", "Snapping", true) + frow("f-setup", "wrench", "Edit Mode") +
      '<div class="vtt-sec-h" style="margin-top:14px">Players</div><div id="players"></div>' +
      '</div></div>';
    var zoom = '<div class="vtt-zoom"><button class="vtt-tbtn" id="z-in" title="Zoom in">' + ico("zin") + '</button><button class="vtt-tbtn" id="z-fit" title="Fit map">' + ico("fit") + '</button><button class="vtt-tbtn" id="z-out" title="Zoom out">' + ico("zout") + "</button></div>";
    var inputs = isGM ? '<input type="file" id="m-file" accept=".uvtt,.dd2vtt,.df2vtt,.json,image/*" hidden><input type="file" id="lib-file" accept="image/*" hidden>' : "";
    var setupbar = !isGM ? "" : '<div class="vtt-setupbar" id="setupbar" hidden>' +
      subtn("su-select", "select", "Select", true) + subtn("su-wall", "wall", "Wall") + subtn("su-window", "window", "Window") + subtn("su-door", "door", "Door") + subtn("su-erase", "erase", "Erase") + "</div>";
    return '<div class="vtt-stage" id="vtt-stage"><canvas id="vtt-canvas"></canvas>' + top + '<div class="vtt-rail">' + rail + "</div>" + zoom + setupbar + '<div class="vtt-readout" id="vtt-readout" hidden></div>' + side + sheetPop() + (isGM ? sceneEditor() + tokenEditor() : "") + inputs + "</div>";
  }
  // Token editor popup (#5): presets applied whenever the token is placed.
  function tokenEditor() {
    // Vision distance: Unlimited (empty value) + capped ranges. Blank = null = sees
    // as far as walls/doors allow; a number caps the line of sight to that many feet.
    var vdOpts = ['<option value="">Unlimited</option>'].concat([120, 60, 30, 10].map(function (f) { return '<option value="' + f + '">' + f + " ft</option>"; })).join("");
    var ringOpts = RING_COLORS.map(function (c) { return '<option value="' + c.v + '">' + c.n + "</option>"; }).join("");
    return '<div id="token-editor" class="vtt-modal" hidden><div class="vtt-modal-box">' +
      '<div class="vtt-modal-head"><span id="te-h">Add token</span><button class="vtt-mini" id="te-close">' + ico("close", 16) + "</button></div>" +
      '<div class="vtt-modal-body">' +
      '<div class="vtt-te-top"><div class="vtt-te-av" id="te-av"></div><div style="flex:1"><label class="vtt-field"><span>Name</span><input type="text" id="te-name" placeholder="Token name"></label><button class="vtt-btn ghost" id="te-img">' + ico("upload", 14) + " Change image</button></div></div>" +
      '<div class="vtt-row small"><label>Size (squares) <input type="number" id="te-size" min="1" max="8" value="1"></label></div>' +
      '<label class="vtt-field"><span>Assign to</span><select id="te-owner"></select></label>' +
      '<label class="vtt-field"><span>Vision distance</span><select id="te-vdist">' + vdOpts + "</select></label>" +
      '<div class="vtt-te-checks"><label><input type="checkbox" id="te-hidden"> Hidden from players</label></div>' +
      '<div class="vtt-te-checks"><label><input type="checkbox" id="te-ring"> Ring</label><select id="te-ringcolor">' + ringOpts + "</select></div>" +
      "</div>" +
      '<div class="vtt-modal-foot"><button class="vtt-btn danger" id="te-del">' + ico("trash", 15) + " Delete</button><span style=\"flex:1\"></span><button class=\"vtt-btn primary\" id=\"te-save\">Save</button></div>" +
      "</div></div>";
  }
  // Scene editor popup — create/edit a scene's map, grid and name (#3).
  function sceneEditor() {
    return '<div id="scene-editor" class="vtt-modal" hidden><div class="vtt-modal-box">' +
      '<div class="vtt-modal-head"><span id="se-h">New scene</span><button class="vtt-mini" id="se-close">' + ico("close", 16) + "</button></div>" +
      '<div class="vtt-modal-body">' +
      '<label class="vtt-field"><span>Scene name</span><input type="text" id="se-name" placeholder="e.g. The Sunless Citadel"></label>' +
      '<div class="vtt-field-l">Map</div>' +
      '<div class="vtt-row"><button class="vtt-btn" id="m-load">' + ico("upload", 15) + ' Upload UVTT / image</button><button class="vtt-btn ghost" id="m-url">' + ico("link", 15) + " Link</button></div>" +
      '<div id="se-mapname" class="vtt-hint2"></div>' +
      '<div class="vtt-preview"><canvas id="se-canvas"></canvas><div class="vtt-preview-empty" id="se-empty">No map yet — upload a UVTT/image or paste a link.</div></div>' +
      '<div class="vtt-row small"><label>Grid px <input type="number" id="m-ppg" min="4" value="70"></label><label>ft / square <input type="number" id="m-fpc" min="1" value="5"></label></div>' +
      '<div class="vtt-te-checks"><label><input type="checkbox" id="se-fog" checked> Fog of War</label><label><input type="checkbox" id="se-grid" checked> Show grid</label></div>' +
      "</div>" +
      '<div class="vtt-modal-foot"><button class="vtt-btn danger" id="se-del">' + ico("trash", 15) + " Delete</button><span style=\"flex:1\"></span><button class=\"vtt-btn primary\" id=\"se-save\">Save scene</button></div>" +
      "</div></div>";
  }
  function tabBtn(name, icon, label, on) { return '<button class="vtt-tab' + (on ? " on" : "") + '" data-tab="' + name + '">' + ico(icon, 16) + "<span>" + label + "</span></button>"; }
  function sheetPop() { return '<div id="sheetpop" class="vtt-sheetpop" hidden><div class="vtt-sheet-head" id="sheet-head"><span id="sheet-title">Character</span><span style="flex:1"></span><button class="vtt-mini" id="sheet-mode" title="Switch to desktop size">' + ico("desktop", 16) + '</button><button class="vtt-mini" id="sheet-close">' + ico("close", 16) + '</button></div><iframe id="sheet-frame" title="Character sheet"></iframe></div>'; }

  function bind(id, fn) { var el = $(id); if (el) el.onclick = fn; }
  function fbtn(id, fn, on) { var el = $(id); if (!el) return; el.onclick = function () { var v = !el.classList.contains("on"); el.classList.toggle("on", v); el.setAttribute("aria-checked", v ? "true" : "false"); if (id === "f-reveal") { el.querySelector(".vtt-frow-i").innerHTML = ico(v ? "eye" : "eyeoff", 18); } fn(v); }; }
  function makeDraggable(box, handle) { var d = null; handle.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) return; d = { x: e.clientX, y: e.clientY, l: box.offsetLeft, t: box.offsetTop }; handle.setPointerCapture(e.pointerId); }); handle.addEventListener("pointermove", function (e) { if (!d) return; box.style.left = (d.l + e.clientX - d.x) + "px"; box.style.top = (d.t + e.clientY - d.y) + "px"; box.style.right = "auto"; }); handle.addEventListener("pointerup", function () { d = null; }); }

  function toggleSide(force) { var el = $("vtt-side"); if (!el) return; var show = force == null ? el.hidden : force; el.hidden = !show; mount.classList.toggle("side-open", show); if (show) selectTab(tab()); }

  function injectStyles() {
    var css = [
      "[hidden]{display:none!important}",
      "html,body{height:100%;margin:0;overflow:hidden;background:var(--bg,#0b0d10)}",
      "#vtt-root{position:fixed;inset:0;font:14px/1.4 'Montserrat',system-ui,sans-serif;color:#e6ebf2}",
      ".vtt-stage{position:absolute;inset:0;overflow:hidden}",
      ".vtt-rail,.vtt-top,.vtt-zoom,.vtt-setupbar,.vtt-readout,.vtt-tabs,.vtt-trow,.vtt-party,.vtt-sub,.vtt-frow,.vtt-scene{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}",
      "#vtt-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}",
      ".vtt-stage.drop::after{content:'Drop token image';position:absolute;inset:14px;border:2px dashed #c8a24a;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#c8a24a;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(200,162,74,.06);pointer-events:none;z-index:5}",
      ".vtt-tbtn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(20,24,30,.92);color:#c3ccd8;border:1px solid #2a323d;border-radius:9px;cursor:pointer;text-decoration:none;transition:.12s}",
      ".vtt-tbtn:hover{color:#fff;border-color:#3d4756}.vtt-tbtn.on{background:#c8a24a;color:#14181e;border-color:#c8a24a}",
      ".vtt-rail{position:absolute;left:12px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:7px;z-index:20}",
      ".vtt-rail-sep{height:1px;background:#2a323d;margin:3px 4px}",
      ".vtt-rail-group{position:relative}",
      ".vtt-groupbtn{position:relative}.vtt-groupbtn .vtt-gi{display:flex}",
      ".vtt-caret{position:absolute;right:3px;bottom:3px;width:0;height:0;border-left:4px solid transparent;border-bottom:4px solid currentColor;opacity:.55}",
      ".vtt-flyout{display:none;position:absolute;left:46px;top:0;flex-direction:column;gap:3px;background:rgba(18,22,28,.98);border:1px solid #2a323d;border-radius:10px;padding:5px;box-shadow:0 10px 30px rgba(0,0,0,.55);z-index:40;min-width:190px}",
      ".vtt-flyout::before{content:'';position:absolute;left:-12px;top:0;bottom:0;width:12px}",
      ".vtt-rail-group:hover .vtt-flyout,.vtt-rail-group.open .vtt-flyout{display:flex}",
      ".vtt-sub{display:flex;align-items:center;gap:9px;background:none;border:0;color:#c3ccd8;padding:7px 9px;border-radius:7px;font:600 12px/1.1 system-ui;cursor:pointer;white-space:nowrap;text-align:left;width:100%}",
      ".vtt-sub:hover{background:#232b35;color:#fff}.vtt-sub.on{background:#2a3442;color:#e6c66a}",
      ".vtt-sub .vtt-key{margin-left:6px;padding:1px 5px;border:1px solid #3a4453;border-radius:4px;font-size:10px;color:#8b97a7;font-weight:700}",
      ".vtt-groupbtn.on{background:#c8a24a;color:#14181e;border-color:#c8a24a}",
      ".vtt-top{position:absolute;top:12px;left:12px;display:flex;align-items:center;gap:10px;z-index:20}",
      ".vtt-top.right{left:auto;right:12px}",
      ".vtt-top.right,.vtt-zoom{transition:right .18s ease}",
      "#vtt-root.side-open .vtt-top.right{right:312px}#vtt-root.side-open .vtt-zoom{right:312px}",
      ".vtt-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:17px;background:rgba(11,13,16,.8);padding:6px 12px;border-radius:8px;border:1px solid #2a323d}",
      ".vtt-scene-badge{font:600 13px/1 'Montserrat',system-ui,sans-serif;color:#c8a24a;background:rgba(11,13,16,.8);padding:7px 11px;border-radius:8px;border:1px solid #2a323d;max-width:34vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".vtt-zoom{position:absolute;right:12px;bottom:12px;display:flex;flex-direction:column;gap:7px;z-index:20}",
      ".vtt-readout{position:absolute;left:64px;bottom:14px;max-width:min(560px,60vw);background:rgba(11,13,16,.9);border:1px solid #2a323d;border-radius:8px;padding:7px 12px;font-size:12px;color:#8b97a7;z-index:15}.vtt-readout b{color:#e6ebf2}",
      ".vtt-dot{width:11px;height:11px;border-radius:50%;display:inline-block;flex:0 0 auto}.vtt-dot.live{background:#5ac26a;box-shadow:0 0 8px rgba(90,194,106,.6)}.vtt-dot.wait{background:#d8b24a}.vtt-dot.bad{background:#c8503a;box-shadow:0 0 8px rgba(200,80,58,.6)}",
      ".vtt-side{position:absolute;top:0;right:0;width:300px;height:100%;background:rgba(15,18,23,.97);border-left:1px solid #2a323d;z-index:30;display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(6px)}",
      ".vtt-side-head{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #2a323d;font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#c8a24a}",
      ".vtt-tabs{display:flex;border-bottom:1px solid #2a323d}",
      ".vtt-side-x{display:none;position:absolute;top:7px;right:8px;z-index:5;width:30px;height:30px;align-items:center;justify-content:center;background:rgba(20,24,30,.9);color:#c3ccd8;border:1px solid #2a323d;border-radius:7px;cursor:pointer}",
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
      ".vtt-frow:hover{border-color:#3d4756}.vtt-frow-i{color:#8b97a7;display:inline-flex}.vtt-frow-l{flex:1;text-align:left}",
      ".vtt-frow.on{border-color:#c8a24a}.vtt-frow.on .vtt-frow-i{color:#c8a24a}",
      ".vtt-switch{flex:0 0 auto;width:34px;height:19px;border-radius:10px;background:#39424f;position:relative;transition:background .15s}",
      ".vtt-switch::after{content:'';position:absolute;top:2px;left:2px;width:15px;height:15px;border-radius:50%;background:#c3ccd8;transition:left .15s,background .15s}",
      ".vtt-frow.on .vtt-switch{background:#c8a24a}.vtt-frow.on .vtt-switch::after{left:17px;background:#14181e}",
      ".vtt-scene-list,.vtt-token-list{display:flex;flex-direction:column;gap:6px;margin-top:6px}",
      ".vtt-scene,.vtt-trow{display:flex;align-items:center;gap:9px;padding:6px;border:1px solid #2a323d;border-radius:8px;cursor:pointer;background:#161b22}",
      ".vtt-scene:hover,.vtt-trow:hover{border-color:#3d4756}.vtt-scene.active,.vtt-trow.active{border-color:#c8a24a;background:rgba(200,162,74,.08)}",
      ".vtt-thumb{width:52px;height:38px;border-radius:5px;overflow:hidden;flex:0 0 auto;background:#0b0d10;display:flex;align-items:center;justify-content:center;color:#3d4756}.vtt-thumb img{width:100%;height:100%;object-fit:cover}",
      ".vtt-scene-name{flex:1;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".vtt-tav{width:34px;height:34px;border-radius:50%;overflow:hidden;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:#0b0d10}.vtt-tav img{width:100%;height:100%;object-fit:cover}.vtt-swatch{width:20px;height:20px;border-radius:50%}",
      ".vtt-tinfo{flex:1;min-width:0}.vtt-tname{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vtt-tsub{font-size:10px;color:#8b97a7;text-transform:uppercase;letter-spacing:.05em}",
      ".vtt-prow{display:flex;align-items:center;gap:8px;padding:5px 0;font-size:13px}",
      ".vtt-pname{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".vtt-pconn{width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:#39414c;border:1px solid #2a323d}.vtt-pconn.on{background:#5ac26a;border-color:#5ac26a;box-shadow:0 0 7px rgba(90,194,106,.7)}",
      ".vtt-trow.hidden-tok .vtt-tav{opacity:.5}.vtt-mini.hide.on{color:#c8a24a}",
      ".vtt-setupbar{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:5px;background:rgba(15,18,23,.97);border:1px solid #2a323d;border-radius:10px;padding:6px 8px;z-index:22;box-shadow:0 8px 30px rgba(0,0,0,.5)}",
      ".vtt-sub-t{display:flex;align-items:center;gap:5px;background:#161b22;color:#c3ccd8;border:1px solid #2a323d;border-radius:7px;padding:6px 10px;font:600 12px/1 system-ui;cursor:pointer}",
      ".vtt-sub-t:hover{color:#fff;border-color:#3d4756}.vtt-sub-t.on{background:#c8a24a;color:#14181e;border-color:#c8a24a}",
      "@media(max-width:640px){.vtt-setupbar{top:auto;bottom:70px;flex-wrap:wrap;max-width:94vw;justify-content:center}.vtt-sub-t span{display:none}}",
      ".vtt-empty{font-size:12px;color:#8b97a7;line-height:1.5;padding:6px 0}",
      ".vtt-stock-head{display:flex;align-items:center;gap:8px;margin:12px 0 6px;padding:8px 10px;background:#161b22;border:1px solid #2a323d;border-radius:8px;color:#c3ccd8;font:700 11px system-ui;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;user-select:none}.vtt-stock-head:hover{border-color:#3a4453}.vtt-stock-head b{margin-left:auto;color:#8b97a7;font-weight:600}",
      ".vtt-stock-chev{display:inline-block;transition:transform .12s;color:#8b97a7}.vtt-stock-head.open .vtt-stock-chev{transform:rotate(90deg)}",
      ".vtt-sec-h.sub{margin:8px 0 6px;font-size:10px;color:#7c8797}",
      ".vtt-stock-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:2px 0 6px}",
      ".vtt-stok,.vtt-ltile{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;background:#161b22;border:1px solid #2a323d;border-radius:8px;padding:6px 4px;cursor:pointer;color:#c3ccd8}.vtt-stok:hover,.vtt-ltile:hover{border-color:#c8a24a}",
      ".vtt-stok img,.vtt-ltile img{width:46px;height:46px;object-fit:contain;pointer-events:none}.vtt-stok span,.vtt-ltile span{font-size:10px;text-align:center;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}",
      ".vtt-tswatch{width:46px;height:46px;border-radius:50%;display:block;border:1px solid rgba(0,0,0,.4)}",
      ".vtt-stok-dot{position:absolute;top:5px;left:5px;width:9px;height:9px;border-radius:50%;border:1px solid #0c0f14}",
      ".vtt-stok-edit{position:absolute;top:3px;right:3px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;background:rgba(12,15,20,.82);border:1px solid #2a323d;border-radius:6px;color:#c3ccd8;cursor:pointer;opacity:0;transition:opacity .12s}.vtt-stok:hover .vtt-stok-edit,.vtt-ltile:hover .vtt-stok-edit,.vtt-stok-edit:focus{opacity:1}.vtt-stok-edit:hover{border-color:#c8a24a;color:#e6c66a}",
      ".vtt-party{display:flex;align-items:center;gap:8px;margin:2px 0 10px;padding:9px 11px;border:1px solid #3a4453;border-radius:8px;background:linear-gradient(180deg,#20283a,#171d29);color:#dfe7f2;font-size:12px;font-weight:600;cursor:grab}",
      ".vtt-party:hover{border-color:#c8a24a}.vtt-party:active{cursor:grabbing}.vtt-party span{flex:1}.vtt-party b{color:#e6c66a}",
      ".vtt-hint2{font-size:11px;color:#8b97a7;line-height:1.5;margin:6px 0;display:flex;gap:6px;align-items:flex-start}.vtt-hint2 svg{flex:0 0 auto;margin-top:1px}",
      ".vtt-ctx{position:fixed;z-index:100;background:#161b22;border:1px solid #2a323d;border-radius:8px;padding:4px;min-width:160px;box-shadow:0 12px 40px rgba(0,0,0,.6)}",
      ".vtt-ctx.sub{position:absolute;left:100%;top:-5px;display:none}",
      ".vtt-ctx.sub.scroll{max-height:340px;overflow-y:auto}",
      ".vtt-ctx-ck{display:inline-block;width:14px;color:#7fd6a1;font-weight:700}",
      ".vtt-ctx-item{position:relative;padding:7px 10px;border-radius:5px;font-size:13px;cursor:pointer;white-space:nowrap;color:#e6ebf2}.vtt-ctx-item:hover{background:#232b35}.vtt-ctx-item.has-sub:hover>.vtt-ctx.sub{display:block}.vtt-ctx-item.danger{color:#f0a8a3}",
      ".vtt-ctx-sep{height:1px;background:#2a323d;margin:4px 2px}",
      ".vtt-sheetpop{position:absolute;top:60px;right:12px;width:min(510px,92vw);height:86%;background:#14181e;border:1px solid #2a323d;border-radius:10px;z-index:60;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.6)}",
      ".vtt-sheetpop.wide{width:min(1120px,96vw);height:92vh;top:4vh;right:2vw;left:auto}",
      ".vtt-sheet-head{display:flex;align-items:center;gap:6px;padding:9px 12px;background:#1b212a;cursor:move;font-weight:700}",
      ".vtt-sheetpop iframe{border:0;flex:1;width:100%;background:#fff}",
      ".vtt-modal{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;background:rgba(4,5,7,.55)}",
      ".vtt-modal-box{width:min(460px,94vw);max-height:90vh;background:#14181e;border:1px solid #2a323d;border-radius:12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6)}",
      ".vtt-modal-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #2a323d;font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#c8a24a;font-size:15px}",
      ".vtt-modal-body{padding:14px;overflow:auto}",
      ".vtt-modal-foot{display:flex;align-items:center;gap:8px;padding:12px 14px;border-top:1px solid #2a323d}",
      ".vtt-field{display:flex;flex-direction:column;gap:5px;margin-bottom:12px;font-size:12px;color:#8b97a7}.vtt-field input{background:#1b212a;border:1px solid #2a323d;color:#e6ebf2;border-radius:6px;padding:8px 10px;font-size:14px}",
      ".vtt-field-l{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8b97a7;margin:4px 0 8px}",
      ".vtt-preview{position:relative;height:200px;border:1px solid #2a323d;border-radius:8px;overflow:hidden;background:#0b0d10;margin-bottom:12px}.vtt-preview canvas{position:absolute;inset:0;width:100%;height:100%;display:block}",
      ".vtt-preview-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 20px;color:#8b97a7;font-size:12px;pointer-events:none}",
      ".vtt-live-t{font-size:9px;font-weight:800;letter-spacing:.08em;color:#0b0d10;background:#5ac26a;border-radius:3px;padding:1px 4px;vertical-align:middle}",
      ".vtt-scene.viewing{border-color:#c8a24a;background:rgba(200,162,74,.08)}",
      ".vtt-scene.live{border-color:#5ac26a;background:rgba(90,194,106,.10)}",
      ".vtt-search{width:100%;background:#1b212a;border:1px solid #2a323d;color:#e6ebf2;border-radius:6px;padding:7px 10px;font-size:13px;margin-bottom:8px}",
      ".vtt-te-top{display:flex;gap:12px;margin-bottom:12px}.vtt-te-av{width:56px;height:56px;border-radius:50%;overflow:hidden;flex:0 0 auto;background:#0b0d10;display:flex;align-items:center;justify-content:center}.vtt-te-av img{width:100%;height:100%;object-fit:cover}",
      ".vtt-field select{background:#1b212a;border:1px solid #2a323d;color:#e6ebf2;border-radius:6px;padding:8px 10px;font-size:14px}",
      ".vtt-te-checks{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:10px;font-size:13px;color:#e6ebf2}.vtt-te-checks label{display:flex;align-items:center;gap:6px}.vtt-te-checks select{background:#1b212a;border:1px solid #2a323d;color:#e6ebf2;border-radius:6px;padding:5px 8px}",
      ".vtt-trow[draggable=true]{cursor:grab}",
      ".vtt-btn.primary{flex:0 0 auto;padding:8px 18px;background:#c8a24a;color:#14181e;border-color:#c8a24a}.vtt-btn.primary:hover{background:#d8b25a}",
      ".vtt-btn.danger{flex:0 0 auto;color:#f0a8a3;border-color:#5a2f2c;background:transparent}.vtt-btn.danger:hover{background:rgba(200,80,58,.12)}",
      "@media(max-width:640px){.vtt-side{width:88vw}.vtt-side-x{display:flex}.vtt-tabs{padding-right:44px}#vtt-root.side-open .vtt-top.right,#vtt-root.side-open .vtt-zoom{right:12px}.vtt-sheetpop,.vtt-sheetpop.wide{width:94vw;height:88vh;right:3vw;left:auto;top:6vh}.vtt-readout{left:12px;bottom:64px}}",
    ].join("");
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }
})();
