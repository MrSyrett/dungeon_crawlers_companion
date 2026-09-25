/* Table Tools popover: Party, Vision and Stage tabs (plain JS, no bundler).
 *
 * PARTY is the original Party Tokens feature, described below. VISION and
 * STAGE only write settings here: player metadata NS/vision for the preview,
 * scene/room metadata NS/stage for the curtain. The background page
 * (background.js) watches those and does the drawing, so both keep working
 * with this popover closed.
 *
 * Uses window.OBR from the vendored /obr/sdk.js (SDK v3).
 *
 * THE IDEA
 *   The roster lives in ROOM metadata, which persists across every scene in the
 *   room. Each entry maps an Owlbear player id to a "template": a copy of the
 *   token item minus its scene-specific fields (id, position, attachments...).
 *   Dropping the party re-creates each template in the current scene with
 *   createdUserId set to that player, which is how Owlbear Rodeo decides
 *   ownership.
 *
 * OWNERSHIP
 *   The item reference lists createdUserId as read-only. In practice the SDK
 *   sends it with addItems/updateItems like any other field. We try
 *   updateItems first, read the item back, and, if Owlbear kept the old owner,
 *   fall back to re-creating the item. Whatever happens is read back and
 *   reported honestly in the status line, so a host-side refusal shows up as a
 *   message rather than silently wrong tokens.
 *
 * Every party token placed or assigned here carries metadata[TAG] = { playerId },
 * which is how "already in this scene", "Fix owners" and duplicate-skipping work.
 */
(function () {
  "use strict";

  var OBR = window.OBR;
  var NS = "com.dungeoncrawlerscompanion.party";
  var ROSTER_KEY = NS + "/roster";
  var TAG = NS + "/token";
  var VISION_KEY = NS + "/vision";
  var STAGE_KEY = NS + "/stage";
  // Room metadata is capped at 16 kB for ALL extensions together, so leave
  // plenty of headroom for everyone else.
  var ROSTER_BUDGET = 9000;

  // Fields that belong to one scene and must never be copied into another.
  var SCENE_FIELDS = [
    "id", "position", "attachedTo", "zIndex", "lastModified",
    "lastModifiedUserId", "createdUserId",
  ];

  var state = {
    ready: false,
    sceneReady: false,
    role: "PLAYER",
    me: { id: "", name: "" },
    party: [],       // connected players (excludes me)
    roster: {},      // playerId -> { playerName, token }
    selection: [],   // selected CHARACTER-ish image items
    inScene: {},     // playerId -> [items] carrying our tag
    items: [],       // every item in the scene (for names + vision stats)
    tab: "party",
    vision: { mode: "off", tokenId: null, opacity: 0.9 },
    roomStage: { auto: false, message: "" },
    sceneStage: null,
  };

  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var statusTimer = null;
  function status(msg, kind) {
    var el = $("status");
    el.textContent = msg || "";
    el.className = kind || "";
    clearTimeout(statusTimer);
    if (msg && kind !== "err") statusTimer = setTimeout(function () { status(""); }, 6000);
  }

  function isGM() { return state.role === "GM"; }

  function isTokenCandidate(item) {
    return item && item.type === "IMAGE" && item.image && item.image.url &&
      (item.layer === "CHARACTER" || item.layer === "MOUNT" || item.layer === "PROP");
  }

  function tokenName(item) {
    var t = item && item.text && item.text.plainText;
    return (t && t.trim()) || (item && item.name) || "Token";
  }

  // ---------------------------------------------------------------- roster --

  function playerName(pid) {
    if (pid === state.me.id) return state.me.name + " (you)";
    for (var i = 0; i < state.party.length; i++) {
      if (state.party[i].id === pid) return state.party[i].name;
    }
    var r = state.roster[pid];
    return (r && r.playerName) || "Unknown player";
  }

  function isOnline(pid) {
    if (pid === state.me.id) return true;
    for (var i = 0; i < state.party.length; i++) if (state.party[i].id === pid) return true;
    return false;
  }

  function makeTemplate(item, keepForeignMeta) {
    var t = clone(item);
    SCENE_FIELDS.forEach(function (k) { delete t[k]; });
    t.locked = false;
    var meta = t.metadata || {};
    delete meta[TAG];
    // Other extensions' metadata (e.g. Dynamic Fog vision settings) is worth
    // keeping — it's what makes a dropped token "just work" — unless it blows
    // the room-metadata budget.
    t.metadata = keepForeignMeta ? meta : {};
    return t;
  }

  function rosterSize(r) { return JSON.stringify(r).length; }

  async function saveRoster(next) {
    var patch = {};
    patch[ROSTER_KEY] = { v: 1, players: next };
    await OBR.room.setMetadata(patch);
    state.roster = next;
  }

  async function loadRoster() {
    var meta = await OBR.room.getMetadata();
    var r = meta && meta[ROSTER_KEY];
    state.roster = (r && r.players) || {};
  }

  // ------------------------------------------------------------- ownership --

  // Hand `items` (already in the scene) to `playerId` and tag them. Returns the
  // number that really ended up owned by that player.
  async function giveTo(items, playerId) {
    if (!items.length) return 0;
    var ids = items.map(function (i) { return i.id; });

    await OBR.scene.items.updateItems(ids, function (drafts) {
      drafts.forEach(function (d) {
        d.createdUserId = playerId;
        d.metadata[TAG] = { playerId: playerId };
      });
    });

    var after = await OBR.scene.items.getItems(ids);
    var stuck = after.filter(function (i) { return i.createdUserId !== playerId; });
    if (!stuck.length) return ids.length;

    // Owlbear kept the old owner on update — re-create those items instead.
    var fresh = stuck.map(function (i) {
      var n = clone(i);
      n.id = uuid();
      n.createdUserId = playerId;
      n.lastModifiedUserId = state.me.id;
      n.lastModified = new Date().toISOString();
      n.metadata[TAG] = { playerId: playerId };
      delete n.attachedTo;
      return n;
    });
    await OBR.scene.items.addItems(fresh);
    var check = await OBR.scene.items.getItems(fresh.map(function (i) { return i.id; }));
    var ok = check.filter(function (i) { return i.createdUserId === playerId; });
    if (ok.length) {
      // Only retire the originals whose replacement took.
      var okIds = {};
      ok.forEach(function (i) { okIds[i.id] = true; });
      var retire = stuck.filter(function (_, idx) { return okIds[fresh[idx].id]; }).map(function (i) { return i.id; });
      await OBR.scene.items.deleteItems(retire);
    }
    // Replacements that still didn't take are removed so we don't leave copies.
    var bad = check.filter(function (i) { return i.createdUserId !== playerId; }).map(function (i) { return i.id; });
    if (bad.length) await OBR.scene.items.deleteItems(bad);

    return ids.length - stuck.length + ok.length;
  }

  // --------------------------------------------------------------- actions --

  async function assignSelected() {
    var item = state.selection[0];
    var pid = $("player-pick").value;
    if (!item || !pid) return;

    var next = clone(state.roster);
    // One token per player, one player per token: clear any other player who
    // had this exact image, so re-assigning a token moves it rather than
    // duplicating it.
    Object.keys(next).forEach(function (k) {
      if (k !== pid && next[k].token && next[k].token.image && next[k].token.image.url === item.image.url) {
        delete next[k];
      }
    });

    next[pid] = { playerName: playerName(pid).replace(/ \(you\)$/, ""), token: makeTemplate(item, true) };
    var trimmed = false;
    if (rosterSize(next) > ROSTER_BUDGET) {
      next[pid].token = makeTemplate(item, false);
      trimmed = true;
    }
    if (rosterSize(next) > ROSTER_BUDGET) {
      status("The room is out of space for more party tokens. Remove one first.", "err");
      return;
    }

    try {
      await saveRoster(next);
      var owned = await giveTo([item], pid);
      render();
      var who = playerName(pid);
      if (owned) {
        status(tokenName(item) + " now belongs to " + who + "." + (trimmed ? " (Other extensions' settings on it weren't saved, to fit the room.)" : ""), "ok");
      } else {
        status("Saved " + tokenName(item) + " for " + who + ", but Owlbear Rodeo refused to change the owner. Tokens will still drop, owned by you.", "err");
      }
    } catch (e) {
      console.error(e);
      status("Couldn't assign that token: " + (e && e.message ? e.message : e), "err");
    }
  }

  async function anchorPoint() {
    var sel = await OBR.player.getSelection();
    if (sel && sel.length) {
      try {
        var b = await OBR.scene.items.getItemBounds(sel);
        if (b && b.center) return { point: b.center, fromSelection: true };
      } catch (e) { /* fall through to the viewport */ }
    }
    var w = await OBR.viewport.getWidth();
    var h = await OBR.viewport.getHeight();
    var p = await OBR.viewport.inverseTransformPoint({ x: w / 2, y: h / 2 });
    return { point: p, fromSelection: false };
  }

  // Width of a token in grid cells, from its own grid dpi and scale.
  function cellsOf(t) {
    var dpi = (t.grid && t.grid.dpi) || 150;
    var w = (t.image && t.image.width) || dpi;
    var sx = Math.abs((t.scale && t.scale.x) || 1);
    return Math.max(1, Math.ceil((w / dpi) * sx - 0.01));
  }

  async function drop(pids) {
    pids = pids.filter(function (pid) {
      return state.roster[pid] && !(state.inScene[pid] && state.inScene[pid].length);
    });
    if (!pids.length) {
      status("Everyone is already in this scene.", "ok");
      return;
    }

    try {
      var anchor = await anchorPoint();
      var sceneDpi = await OBR.scene.grid.getDpi();
      var step = sceneDpi * Math.max.apply(null, pids.map(function (p) { return cellsOf(state.roster[p].token); }));

      // Fan out in a compact square, centred on the anchor. When dropping next
      // to a selection, start one step to the right so we don't bury it.
      var cols = Math.ceil(Math.sqrt(pids.length));
      var rows = Math.ceil(pids.length / cols);
      var ox = anchor.fromSelection ? step : -((cols - 1) * step) / 2;
      var oy = -((rows - 1) * step) / 2;

      var now = new Date().toISOString();
      var z = Date.now();
      var items = [];
      for (var i = 0; i < pids.length; i++) {
        var pid = pids[i];
        var t = clone(state.roster[pid].token);
        var pos = {
          x: anchor.point.x + ox + (i % cols) * step,
          y: anchor.point.y + oy + Math.floor(i / cols) * step,
        };
        try { pos = await OBR.scene.grid.snapPosition(pos); } catch (e) { /* unsnapped is fine */ }
        t.id = uuid();
        t.position = pos;
        t.createdUserId = pid;
        t.lastModifiedUserId = state.me.id;
        t.lastModified = now;
        t.zIndex = z + i;
        t.metadata = t.metadata || {};
        t.metadata[TAG] = { playerId: pid };
        items.push(t);
      }

      await OBR.scene.items.addItems(items);
      var back = await OBR.scene.items.getItems(items.map(function (i) { return i.id; }));
      var wrong = back.filter(function (i) { return i.metadata[TAG] && i.createdUserId !== i.metadata[TAG].playerId; });
      if (wrong.length) {
        // Try the update path for anything Owlbear re-owned on the way in.
        for (var j = 0; j < wrong.length; j++) await giveTo([wrong[j]], wrong[j].metadata[TAG].playerId);
        back = await OBR.scene.items.getItems(items.map(function (i) { return i.id; }));
        wrong = back.filter(function (i) { return i.metadata[TAG] && i.createdUserId !== i.metadata[TAG].playerId; });
      }

      if (wrong.length) {
        status("Dropped " + items.length + " token" + (items.length === 1 ? "" : "s") + ", but Owlbear Rodeo kept " + wrong.length + " owned by you.", "err");
      } else {
        status("Dropped " + items.length + " token" + (items.length === 1 ? "" : "s") + ".", "ok");
      }
    } catch (e) {
      console.error(e);
      status("Couldn't drop tokens: " + (e && e.message ? e.message : e), "err");
    }
  }

  // Re-own every tagged token in the scene, and adopt untagged tokens whose
  // image matches a roster entry (e.g. dragged in by hand from the library).
  async function fixOwners() {
    try {
      var all = await OBR.scene.items.getItems(isTokenCandidate);
      var byPid = {};
      var byUrl = {};
      Object.keys(state.roster).forEach(function (pid) {
        var t = state.roster[pid].token;
        if (t && t.image) byUrl[t.image.url] = pid;
      });
      all.forEach(function (i) {
        var tagged = i.metadata && i.metadata[TAG] && i.metadata[TAG].playerId;
        var pid = tagged || byUrl[i.image.url];
        if (!pid || !state.roster[pid]) return;
        if (tagged && i.createdUserId === pid) return;
        (byPid[pid] = byPid[pid] || []).push(i);
      });
      var pids = Object.keys(byPid);
      if (!pids.length) { status("Every party token here already has the right owner.", "ok"); return; }
      var total = 0, owned = 0;
      for (var k = 0; k < pids.length; k++) {
        total += byPid[pids[k]].length;
        owned += await giveTo(byPid[pids[k]], pids[k]);
      }
      if (owned === total) status("Fixed " + total + " token" + (total === 1 ? "" : "s") + ".", "ok");
      else status("Fixed " + owned + " of " + total + ". Owlbear Rodeo refused the rest.", "err");
    } catch (e) {
      console.error(e);
      status("Couldn't fix owners: " + (e && e.message ? e.message : e), "err");
    }
  }

  async function removeEntry(pid) {
    var next = clone(state.roster);
    delete next[pid];
    try {
      await saveRoster(next);
      render();
      status("Removed. Tokens already on the map stay where they are.", "ok");
    } catch (e) {
      status("Couldn't remove: " + (e && e.message ? e.message : e), "err");
    }
  }

  // ---------------------------------------------------------------- render --

  function renderPicker() {
    var pick = $("player-pick");
    var prev = pick.value;
    var seen = {};
    var opts = [];
    state.party.forEach(function (p) {
      if (seen[p.id]) return;
      seen[p.id] = true;
      opts.push({ id: p.id, label: p.name + (state.roster[p.id] ? " (replace)" : "") });
    });
    // Assigned-but-offline players stay pickable so a token can be swapped
    // between sessions.
    Object.keys(state.roster).forEach(function (pid) {
      if (seen[pid] || pid === state.me.id) return;
      seen[pid] = true;
      opts.push({ id: pid, label: (state.roster[pid].playerName || "Player") + " (offline, replace)" });
    });
    opts.push({ id: state.me.id, label: state.me.name + " (you)" + (state.roster[state.me.id] ? " (replace)" : "") });

    pick.innerHTML = '<option value="">Choose a player…</option>' + opts.map(function (o) {
      return '<option value="' + esc(o.id) + '">' + esc(o.label) + "</option>";
    }).join("");
    if (prev && (seen[prev] || prev === state.me.id)) pick.value = prev;
  }

  function render() {
    var gm = isGM();
    $("not-ready").hidden = state.sceneReady;
    $("gm-assign").hidden = !gm || !state.sceneReady;
    $("gm-drop").hidden = !gm;
    $("roster-title").textContent = gm ? "Party" : "Your token";
    $("note").hidden = !gm;
    $("intro").textContent = gm
      ? "Assign each player a token once. Drop the whole party into any scene, already owned by the right players."
      : "Your GM keeps your token ready for every scene. If it's missing, drop it in yourself.";

    // Selection line
    if (gm) {
      var sel = state.selection;
      var line = $("sel-line");
      if (sel.length === 1) line.innerHTML = "Selected: <strong>" + esc(tokenName(sel[0])) + "</strong>";
      else if (sel.length > 1) line.textContent = "Select just one token to assign it.";
      else line.textContent = "Select a character token on the map.";
      renderPicker();
      $("assign").disabled = sel.length !== 1 || !$("player-pick").value;
    }

    // Roster
    var pids = Object.keys(state.roster);
    if (!gm) pids = pids.filter(function (p) { return p === state.me.id; });
    pids.sort(function (a, b) { return playerName(a).localeCompare(playerName(b)); });

    var html = pids.map(function (pid) {
      var e = state.roster[pid];
      var t = e.token || {};
      var here = state.inScene[pid] || [];
      var wrongOwner = here.some(function (i) { return i.createdUserId !== pid; });
      var tag = !state.sceneReady ? "" : here.length
        ? (wrongOwner ? '<span class="tag warn">In scene · wrong owner</span>' : '<span class="tag">In scene</span>')
        : "";
      var acts = "";
      if (state.sceneReady && !here.length) acts += '<button class="btn sm" data-drop="' + esc(pid) + '">Drop</button>';
      if (gm) acts += '<button class="btn sm ghost" data-remove="' + esc(pid) + '" title="Forget this assignment">✕</button>';
      return '<div class="pc">' +
        '<img alt="" src="' + esc(t.image && t.image.url) + '">' +
        '<div class="who"><div class="tok">' + esc(tokenName(t)) + "</div>" +
        '<div class="ply"><span class="dot' + (isOnline(pid) ? " on" : "") + '"></span>' + esc(playerName(pid)) + "</div>" +
        tag + "</div>" +
        '<div class="acts">' + acts + "</div></div>";
    }).join("");

    if (!pids.length) {
      html = '<div class="empty">' + (gm
        ? "No one has a token yet. Select a token on the map, choose a player and click Assign."
        : "Your GM hasn't assigned you a token yet.") + "</div>";
    }
    $("roster").innerHTML = html;

    if (gm) {
      var missing = Object.keys(state.roster).filter(function (p) { return !(state.inScene[p] && state.inScene[p].length); });
      $("drop-all").disabled = !state.sceneReady || !missing.length;
      $("drop-all").textContent = missing.length && state.sceneReady ? "Drop party (" + missing.length + ")" : "Drop party";
      $("fix").disabled = !state.sceneReady || !Object.keys(state.roster).length;
    }
    renderTabs();
    if (gm) { renderVision(); renderStage(); }
  }

  // ------------------------------------------------------------------ tabs --

  function renderTabs() {
    var gm = isGM();
    if (!gm) state.tab = "party";
    $("tabs").hidden = !gm;
    ["party", "vision", "stage"].forEach(function (t) {
      $("tab-" + t).hidden = state.tab !== t;
    });
    var btns = $("tabs").querySelectorAll("button[data-tab]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-selected", btns[i].dataset.tab === state.tab ? "true" : "false");
    }
    $("stage-pill").hidden = !(gm && state.sceneReady && stageHidden());
  }

  // ---------------------------------------------------------------- vision --

  function itemById(id) {
    for (var i = 0; i < state.items.length; i++) if (state.items[i].id === id) return state.items[i];
    return null;
  }

  function renderVision() {
    var v = state.vision;
    var mode = v.mode || "off";
    $("v-token").setAttribute("aria-pressed", mode === "token" ? "true" : "false");
    $("v-party").setAttribute("aria-pressed", mode === "party" ? "true" : "false");
    $("v-off").setAttribute("aria-pressed", mode === "off" ? "true" : "false");
    $("v-token").disabled = !state.sceneReady || (state.selection.length !== 1 && mode !== "token");
    $("v-party").disabled = !state.sceneReady;
    var op = Math.round((Number(v.opacity) || 0.9) * 100);
    if (document.activeElement !== $("v-opacity")) $("v-opacity").value = String(op);

    var line = $("v-state");
    if (!state.sceneReady) line.textContent = "Open a scene to preview vision.";
    else if (mode === "token") {
      var t = itemById(v.tokenId);
      line.innerHTML = "Showing what <strong>" + esc(t ? tokenName(t) : "that token") + "</strong> sees." +
        (state.selection.length === 1 && state.selection[0].id !== v.tokenId ? " Click This token to switch to the selected one." : "");
    } else if (mode === "party") line.textContent = "Showing what the whole party sees.";
    else line.textContent = "Select a token, then choose This token. Or right-click a token → See what they see.";

    var stats = "";
    if (state.sceneReady && window.TTVision) {
      try {
        var lights = window.TTVision.lights(state.items);
        var prim = lights.filter(function (l) { return l.type === "PRIMARY"; }).length;
        var walls = window.TTVision.walls(state.items).length;
        stats = walls + " wall segment" + (walls === 1 ? "" : "s") + " · " + prim + " primary / " +
          (lights.length - prim) + " secondary light" + (lights.length - prim === 1 ? "" : "s");
        if (!lights.length) stats += " · No Dynamic Fog lights in this scene, so everything will be dark.";
        if (mode === "token") {
          var own = lights.filter(function (l) { return l.type === "PRIMARY" && (l.id === v.tokenId || l.attachedTo === v.tokenId); });
          if (!own.length) stats += " · This token has no light of its own.";
        }
      } catch (e) { stats = ""; }
    }
    $("v-stats").textContent = stats;
  }

  async function setVision(next) {
    var cur = Object.assign({}, state.vision, next);
    state.vision = cur;
    var patch = {};
    patch[VISION_KEY] = cur;
    renderVision();
    try { await OBR.player.setMetadata(patch); }
    catch (e) { status("Couldn't change the vision preview: " + (e && e.message ? e.message : e), "err"); }
  }

  // ----------------------------------------------------------------- stage --

  function stageHidden() {
    return state.sceneStage === "staged" || (!!state.roomStage.auto && state.sceneStage !== "live");
  }

  function renderStage() {
    var ready = state.sceneReady;
    var hid = ready && stageHidden();
    var st = $("s-state"), sub = $("s-sub"), btn = $("s-toggle");
    if (!ready) {
      st.className = "big"; st.textContent = "No scene open";
      sub.textContent = "Open a scene to hide it or make it live.";
      btn.disabled = true; btn.textContent = "Make live";
    } else if (hid) {
      st.className = "big hid"; st.textContent = "Hidden from players";
      sub.textContent = "Players see the curtain. Set things up, then make it live.";
      btn.disabled = false; btn.textContent = "Make live";
    } else {
      st.className = "big live"; st.textContent = "Live";
      sub.textContent = "Players can see this scene.";
      btn.disabled = false; btn.textContent = "Hide from players";
    }
    $("s-auto").checked = !!state.roomStage.auto;
    if (document.activeElement !== $("s-msg")) $("s-msg").value = state.roomStage.message || "";
  }

  async function toggleStage() {
    var next = stageHidden() ? "live" : "staged";
    var patch = {};
    patch[STAGE_KEY] = next;
    try {
      await OBR.scene.setMetadata(patch);
      state.sceneStage = next;
      render();
      status(next === "live" ? "The scene is live." : "Hidden. Players see the curtain.", "ok");
    } catch (e) {
      status("Couldn't change the scene: " + (e && e.message ? e.message : e), "err");
    }
  }

  async function saveRoomStage(next) {
    var cur = Object.assign({}, state.roomStage, next);
    state.roomStage = cur;
    var patch = {};
    patch[STAGE_KEY] = cur;
    try { await OBR.room.setMetadata(patch); render(); }
    catch (e) { status("Couldn't save: " + (e && e.message ? e.message : e), "err"); }
  }

  // ----------------------------------------------------------- scene watch --

  function indexScene(items) {
    state.items = items;
    var map = {};
    items.forEach(function (i) {
      var tag = i.metadata && i.metadata[TAG];
      if (tag && tag.playerId) (map[tag.playerId] = map[tag.playerId] || []).push(i);
    });
    state.inScene = map;
  }

  async function refreshSelection() {
    if (!state.sceneReady) { state.selection = []; return; }
    var ids = (await OBR.player.getSelection()) || [];
    if (!ids.length) { state.selection = []; return; }
    var items = await OBR.scene.items.getItems(ids);
    state.selection = items.filter(isTokenCandidate);
  }

  var unsubItems = null;
  async function onSceneReady(ready) {
    state.sceneReady = ready;
    if (unsubItems) { unsubItems(); unsubItems = null; }
    if (ready) {
      var sm = await OBR.scene.getMetadata();
      state.sceneStage = sm[STAGE_KEY] || null;
      indexScene(await OBR.scene.items.getItems());
      await refreshSelection();
      unsubItems = OBR.scene.items.onChange(function (items) {
        indexScene(items);
        render();
      });
    } else {
      state.inScene = {};
      state.items = [];
      state.selection = [];
      state.sceneStage = null;
    }
    render();
  }

  // ------------------------------------------------------------------ boot --

  function wire() {
    $("assign").addEventListener("click", assignSelected);
    $("player-pick").addEventListener("change", function () {
      $("assign").disabled = state.selection.length !== 1 || !$("player-pick").value;
    });
    $("drop-all").addEventListener("click", function () { drop(Object.keys(state.roster)); });
    $("fix").addEventListener("click", fixOwners);
    $("tabs").addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-tab]");
      if (!b) return;
      state.tab = b.dataset.tab;
      status("");
      render();
    });
    $("v-token").addEventListener("click", function () {
      var sel = state.selection[0];
      if (sel) setVision({ mode: "token", tokenId: sel.id });
    });
    $("v-party").addEventListener("click", function () { setVision({ mode: "party", tokenId: null }); });
    $("v-off").addEventListener("click", function () { setVision({ mode: "off", tokenId: null }); });
    $("v-opacity").addEventListener("change", function () {
      setVision({ opacity: Number($("v-opacity").value) / 100 });
    });
    $("s-toggle").addEventListener("click", toggleStage);
    $("s-auto").addEventListener("change", function () { saveRoomStage({ auto: $("s-auto").checked }); });
    $("s-msg").addEventListener("change", function () { saveRoomStage({ message: $("s-msg").value.trim() }); });
    $("roster").addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b) return;
      if (b.dataset.drop) drop([b.dataset.drop]);
      else if (b.dataset.remove) removeEntry(b.dataset.remove);
    });
  }

  function boot() {
    if (!OBR || !OBR.isAvailable) {
      document.body.innerHTML = '<p class="sub" style="padding:10px">Open this inside Owlbear Rodeo: add the extension with its manifest URL, then click Table Tools in a room.</p>';
      return;
    }
    wire();
    OBR.onReady(async function () {
      state.me.id = OBR.player.id;
      state.me.name = await OBR.player.getName();
      state.role = await OBR.player.getRole();
      state.party = await OBR.party.getPlayers();
      await loadRoster();
      var pm = await OBR.player.getMetadata();
      if (pm && pm[VISION_KEY]) state.vision = pm[VISION_KEY];
      var rm = await OBR.room.getMetadata();
      if (rm && rm[STAGE_KEY]) state.roomStage = rm[STAGE_KEY];

      OBR.player.onChange(async function (p) {
        state.role = p.role;
        state.me.name = p.name;
        if (p.metadata && p.metadata[VISION_KEY]) state.vision = p.metadata[VISION_KEY];
        if (state.sceneReady) {
          var items = p.selection && p.selection.length ? await OBR.scene.items.getItems(p.selection) : [];
          state.selection = items.filter(isTokenCandidate);
        }
        render();
      });
      OBR.party.onChange(function (players) { state.party = players; render(); });
      OBR.room.onMetadataChange(function (meta) {
        var r = meta && meta[ROSTER_KEY];
        state.roster = (r && r.players) || {};
        state.roomStage = (meta && meta[STAGE_KEY]) || { auto: false, message: "" };
        render();
      });
      OBR.scene.onMetadataChange(function (m) {
        state.sceneStage = m[STAGE_KEY] || null;
        render();
      });
      OBR.scene.onReadyChange(onSceneReady);
      await onSceneReady(await OBR.scene.isReady());
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
