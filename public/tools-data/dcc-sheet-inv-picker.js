// Dungeon Crawler Carl — Inventory item picker + info lookup
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after
// /tools-data/dcc-items.js (the DCC_ITEMS global) and the sheet's own scripts.
//
// The "+ Add Item" button opens a searchable picker of every catalog item
// (consumables, weapons, armor, gear, scrolls & tomes). Picking one adds a
// pre-filled row to the Inventory table (name, qty 1, notes = slot + effect).
// An (i) button on each item expands its full effect / tier / price inline, so
// players can look an item up without leaving the sheet. A footer lets you add a
// custom item by name or a blank row — same shape as the "Add Skill" picker.
//
// This only fills the existing inventory row inputs and fires an input event so
// autosave picks it up; the sheet's addInvRow()/collectSheet() are unchanged.

(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function attr(s) { return esc(s).replace(/'/g, "&#39;"); }
  function haveData() { return typeof DCC_ITEMS !== "undefined" && DCC_ITEMS.length; }

  // ── filter buckets (fewer, friendlier than the 9 raw categories) ─────────────
  var GROUPS = [
    { key: "all", label: "All", cats: null },
    { key: "consumable", label: "Consumables", cats: ["consumable"] },
    { key: "weapon", label: "Weapons", cats: ["weapon"] },
    { key: "armor", label: "Armor", cats: ["armor"] },
    { key: "gear", label: "Gear", cats: ["accessory", "mundane", "tool", "material"] },
    { key: "scroll", label: "Scrolls & Tomes", cats: ["scroll", "tome"] },
  ];
  function groupOf(cat) {
    for (var i = 1; i < GROUPS.length; i++) { if (GROUPS[i].cats.indexOf(cat) >= 0) return GROUPS[i]; }
    return null;
  }
  var TIER_ORDER = ["Bronze", "Silver", "Gold", "Platinum", "Legendary", "Celestial"];

  // The user's saved homebrew items (own + campaign-shared), fetched from the app
  // at load. Empty when the sheet is opened standalone (no /api).
  var hbItems = [];
  function fetchHomebrew() {
    try {
      fetch("/api/homebrew?type=dcc-item", { credentials: "same-origin" })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !Array.isArray(j.items)) return;
          hbItems = j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; });
          var ov = document.getElementById("dcci-overlay");
          if (ov && ov.style.display === "flex") renderPicker();   // refresh if open
        })
        .catch(function () {});
    } catch (e) {}
  }

  // Catalog = the official DCC items plus the user's saved homebrew items.
  function itemCatalog() {
    var a = (typeof DCC_ITEMS !== "undefined" ? DCC_ITEMS : []);
    return a.concat(hbItems || []);
  }
  function itemsAZ() {
    return itemCatalog().slice().sort(function (a, b) {
      return String(a.name).localeCompare(String(b.name), "en");
    });
  }
  function notesOf(it) { return (it.slot ? it.slot + " — " : "") + (it.effect || ""); }
  function metaLine(it) {
    var bits = [];
    var g = groupOf(it.category);
    bits.push(g ? g.label.replace(/s$/, "") : it.category);
    if (it.slot) bits.push(it.slot);
    if (it.tier) bits.push(it.tier);
    if (typeof it.price === "number") bits.push(it.price.toLocaleString("en") + " g");
    if (it.source === "Homebrew") bits.push("Homebrew");
    return bits.join(" · ");
  }
  function lookup(name) {
    var t = String(name || "").trim().toLowerCase();
    if (!t) return null;
    var all = itemsAZ();
    return all.find(function (it) { return it.name.toLowerCase() === t; }) ||
      all.find(function (it) { return it.name.toLowerCase().replace(/[^a-z]/g, "") === t.replace(/[^a-z]/g, ""); }) || null;
  }

  // ── spell-bearing items (a spell can be written on them) ─────────────────────
  // Spell Scroll, Magic Tome, Spellbook (and homebrew whose name carries those
  // words) hold a specific spell — after you pick the item you pick the spell.
  function carriesSpell(it) { return !!it && /\b(spell scroll|magic tome|spellbook|grimoire)\b/i.test(it.name); }
  function spellsAZ() {
    return (typeof DCC_SPELLS !== "undefined" ? DCC_SPELLS : []).slice().sort(function (a, b) {
      return String(a.name).localeCompare(String(b.name), "en");
    });
  }
  function spellMeta(sp) {
    var bits = ["Spell"];
    if (sp.type) bits.push(sp.type);
    if (sp.mana != null) bits.push(sp.mana + " Mana");
    if (sp.stat) bits.push(String(sp.stat).toUpperCase());
    return bits.join(" · ");
  }
  // The finished inventory row for a spell item, once the spell is chosen.
  function spellItemName(it, spellName) { return it.name + ": " + spellName; }
  function spellItemNotes(it, spellName) { return (it.effect ? it.effect + " — " : "") + "Spell: " + spellName; }

  // ── CSS (mirrors the skill picker's dccs- styling with a dcci- prefix) ───────
  function injectCss() {
    if (document.getElementById("dcci-css")) return;
    var st = document.createElement("style");
    st.id = "dcci-css";
    st.textContent = [
      ".dcci-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:32px 12px;overflow:auto;}",
      ".dcci-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:620px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:'Barlow',sans-serif;}",
      ".dcci-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;border-bottom:1px solid #2a2a2e;}",
      ".dcci-head h3{margin:0;font-size:15px;text-transform:uppercase;letter-spacing:.03em;color:#fff;}",
      ".dcci-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:28px;height:28px;cursor:pointer;}",
      ".dcci-x:hover{border-color:#c8892a;color:#e6c15a;}",
      ".dcci-search{margin:12px 18px 4px;}",
      ".dcci-search input{width:100%;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dcci-search input:focus{outline:none;border-color:#c8892a;}",
      ".dcci-filters{display:flex;flex-wrap:wrap;gap:6px;padding:8px 18px 2px;}",
      ".dcci-chip{border:1px solid #2a2a2e;background:transparent;color:#8a8a93;border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;cursor:pointer;}",
      ".dcci-chip:hover{border-color:#c8892a;color:#e6c15a;}",
      ".dcci-chip.on{border-color:#c8892a;background:#1c1610;color:#e6c15a;}",
      ".dcci-list{max-height:52vh;overflow:auto;padding:6px 18px 10px;}",
      ".dcci-grp{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin:12px 0 2px;}",
      ".dcci-item{border:1px solid #2a2a2e;border-radius:8px;padding:8px 10px;margin-top:8px;}",
      ".dcci-item .row{display:flex;align-items:flex-start;gap:8px;}",
      ".dcci-item .body{flex:1;min-width:0;cursor:pointer;}",
      ".dcci-item:hover,.dcci-item.open{border-color:#c8892a;}",
      ".dcci-item .nm{font-weight:700;color:#e6c15a;font-size:13px;}",
      ".dcci-item .mt{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}",
      ".dcci-item .detail{margin-top:8px;padding-top:8px;border-top:1px solid #2a2a2e;}",
      ".dcci-item .detail .ef{color:#d8d5cc;font-size:12.5px;line-height:1.5;}",
      ".dcci-i{flex:0 0 auto;width:20px;height:20px;border-radius:50%;border:1px solid #3a3a40;background:transparent;color:#8a8a93;font-size:11px;font-style:italic;cursor:pointer;}",
      ".dcci-i:hover,.dcci-i.on{border-color:#c8892a;color:#e6c15a;}",
      ".dcci-i.on{background:#1c1610;}",
      ".dcci-foot{display:flex;gap:8px;padding:10px 18px 16px;border-top:1px solid #2a2a2e;}",
      ".dcci-foot input{flex:1;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dcci-btn{border:1px solid #2a2a2e;background:#1c1610;color:#e6c15a;border-radius:6px;padding:0 14px;font-size:12px;font-weight:700;cursor:pointer;}",
      ".dcci-btn:hover{border-color:#c8892a;}",
      ".dcci-btn.plain{background:#161618;color:#c9c9cf;}",
      ".dcci-info-body{padding:14px 18px 18px;}",
      ".dcci-info-body .mt{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;}",
      ".dcci-info-body .ef{color:#d8d5cc;font-size:13px;line-height:1.55;}",
      ".dcci-info-body .grp{color:#8a8a93;font-size:12px;line-height:1.5;}",
    ].join("\n");
    document.head.appendChild(st);
  }

  function overlay(id) {
    var ov = document.getElementById(id);
    if (!ov) {
      ov = document.createElement("div");
      ov.id = id;
      ov.className = "dcci-overlay";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) ov.style.display = "none"; });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    return ov;
  }

  // ── inventory writes (mirrors dcc-sheet-loot.js) ────────────────────────────
  function fireInput(el) {
    if (!el) return;
    try {
      var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event;
      el.dispatchEvent(new Ev("input", { bubbles: true }));
    } catch (e) {}
  }
  function newInvRow() {
    if (typeof addInvRow !== "function") return null;
    addInvRow();
    var body = document.getElementById("inv-body");
    return body ? body.lastElementChild : null;
  }
  function fillRow(tr, name, notes) {
    if (!tr) return;
    var ins = tr.querySelectorAll('input[type="text"]');   // [item, qty, notes]
    if (ins[0]) ins[0].value = name;
    if (ins[1]) ins[1].value = "1";
    if (ins[2]) ins[2].value = notes || "";
    fireInput(ins[0]);
    fireInput(ins[1]);
    fireInput(ins[2]);
    try { tr.scrollIntoView({ block: "nearest" }); } catch (_) {}
  }
  // Gear that occupies a body slot (Head / Torso / Arms / Hands·Holding / Legs /
  // Feet) is worn, not pinned — so it auto-equips into the Gear slots on add.
  function isBodySlot(slot) {
    var s = String(slot == null ? "" : slot).trim().toLowerCase();
    if (!s || s === "accessory") return false;
    return /^(head|torso|arms|legs|feet)$/.test(s) || /hand|holding/.test(s);
  }
  function addToSheet(it, name) {
    var tr = newInvRow();
    fillRow(tr, name || (it ? it.name : ""), it ? notesOf(it) : "");
    // Stamp category/slot/effect so the row's radial can equip it (works for
    // homebrew armor/accessories too, which a name lookup wouldn't find).
    if (tr && it) { tr.dataset.cat = it.category || ""; if (it.slot) tr.dataset.slot = it.slot; if (it.effect) tr.dataset.effect = it.effect; }
    // Auto-equip body-slot gear straight into the Gear slots instead of leaving
    // it to be pinned to the Hotlist.
    var equipped = false;
    if (tr && it && isBodySlot(it.slot) && window.DCCEquip && typeof window.DCCEquip.isEquipType === "function" && window.DCCEquip.isEquipType(tr)) {
      var pin = tr.querySelector(".hot-pin");
      if (pin && tr.dataset.equipped !== "1") { try { window.DCCEquip.click(pin); equipped = true; } catch (e) {} }
    }
    if (!equipped) { try { if (window.DCCHotlist) window.DCCHotlist.refresh(); } catch (e) {} }
  }

  // ── picker ──────────────────────────────────────────────────────────────────
  var query = "";
  var filterKey = "all";
  var expanded = {};
  var view = "items";        // 'items' | 'spell'
  var spellFor = null;       // the item we're choosing a spell for
  var spellQuery = "";
  var spellExpanded = {};

  function openPicker() {
    if (!haveData()) { alert("The item catalog didn't load. Open this sheet from the app so /tools-data/dcc-items.js is available."); return; }
    injectCss();
    expanded = {};
    view = "items"; spellFor = null; spellQuery = ""; spellExpanded = {};
    overlay("dcci-overlay");
    renderPicker();
    var s = document.getElementById("dcci-search-input");
    if (s) s.focus();
  }
  function closePicker() {
    var ov = document.getElementById("dcci-overlay"); if (ov) ov.style.display = "none";
    query = ""; expanded = {}; view = "items"; spellFor = null; spellQuery = ""; spellExpanded = {};
  }

  function itemHtml(it) {
    var open = !!expanded[it.name];
    var detail = open
      ? '<div class="detail"><div class="ef">' + esc(it.effect || "No description on file.") + '</div></div>'
      : "";
    return '<div class="dcci-item' + (open ? " open" : "") + '">' +
      '<div class="row">' +
        '<div class="body" onclick="DCCItems.add(\'' + attr(it.name) + '\')" title="Add to your inventory">' +
          '<div class="nm">' + esc(it.name) + '</div>' +
          '<div class="mt">' + esc(metaLine(it)) + '</div>' +
        '</div>' +
        '<button class="dcci-i' + (open ? " on" : "") + '" title="' + (open ? "Hide details" : "What does it do?") + '" onclick="DCCItems.toggle(\'' + attr(it.name) + '\')">i</button>' +
      '</div>' + detail +
    '</div>';
  }
  function renderPicker() {
    if (view === "spell") return renderSpellPicker();
    var ov = document.getElementById("dcci-overlay");
    if (!ov) return;
    var q = query.trim().toLowerCase();
    var g = GROUPS.find(function (x) { return x.key === filterKey; }) || GROUPS[0];
    var list = itemsAZ().filter(function (it) {
      if (g.cats && g.cats.indexOf(it.category) < 0) return false;
      if (!q) return true;
      return it.name.toLowerCase().indexOf(q) >= 0 ||
        (it.effect && it.effect.toLowerCase().indexOf(q) >= 0) ||
        (it.slot && it.slot.toLowerCase().indexOf(q) >= 0);
    });
    // Group the results under the same friendly buckets, in a stable order.
    var rows = "";
    GROUPS.slice(1).forEach(function (grp) {
      var inGrp = list.filter(function (it) { return grp.cats.indexOf(it.category) >= 0; });
      if (inGrp.length) rows += '<div class="dcci-grp">' + esc(grp.label) + '</div>' + inGrp.map(itemHtml).join("");
    });
    if (!rows) rows = '<div class="dcci-grp">No item matches' + (query ? ' “' + esc(query) + '”' : "") + '.</div>';
    var chips = GROUPS.map(function (f) {
      return '<button class="dcci-chip' + (filterKey === f.key ? " on" : "") + '" onclick="DCCItems.filter(\'' + f.key + '\')">' + esc(f.label) + '</button>';
    }).join("");
    ov.innerHTML =
      '<div class="dcci-modal" role="dialog" aria-label="Add an item">' +
        '<div class="dcci-head"><h3>Add an Item</h3><button class="dcci-x" onclick="DCCItems.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-search"><input id="dcci-search-input" type="search" placeholder="Search items…" value="' + attr(query) + '" oninput="DCCItems.search(this.value)"></div>' +
        '<div class="dcci-filters">' + chips + '</div>' +
        '<div class="dcci-list">' + rows + '</div>' +
        '<div class="dcci-foot"><input id="dcci-custom-input" type="text" placeholder="…or type a custom item name" onkeydown="if(event.key===\'Enter\')DCCItems.addCustom()">' +
          '<button class="dcci-btn" onclick="DCCItems.addCustom()">Add</button></div>' +
      '</div>';
    var s = document.getElementById("dcci-search-input");
    if (s) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }

  // ── spell chooser (shown after picking a spell-bearing item) ────────────────
  function spellHtml(sp) {
    var open = !!spellExpanded[sp.name];
    var detail = open ? '<div class="detail"><div class="ef">' + esc(sp.desc || "No description on file.") + '</div></div>' : "";
    return '<div class="dcci-item' + (open ? " open" : "") + '">' +
      '<div class="row">' +
        '<div class="body" onclick="DCCItems.chooseSpell(\'' + attr(sp.name) + '\')" title="Write this spell on the item">' +
          '<div class="nm">' + esc(sp.name) + '</div>' +
          '<div class="mt">' + esc(spellMeta(sp)) + '</div>' +
        '</div>' +
        '<button class="dcci-i' + (open ? " on" : "") + '" title="' + (open ? "Hide details" : "What does it do?") + '" onclick="DCCItems.toggleSpell(\'' + attr(sp.name) + '\')">i</button>' +
      '</div>' + detail +
    '</div>';
  }
  function renderSpellPicker() {
    var ov = document.getElementById("dcci-overlay");
    if (!ov || !spellFor) return;
    var q = spellQuery.trim().toLowerCase();
    var list = spellsAZ().filter(function (sp) {
      if (!q) return true;
      return sp.name.toLowerCase().indexOf(q) >= 0 || (sp.desc && sp.desc.toLowerCase().indexOf(q) >= 0) || (sp.type && sp.type.toLowerCase().indexOf(q) >= 0);
    });
    var rows = list.length ? list.map(spellHtml).join("")
      : '<div class="dcci-grp">No spell matches' + (spellQuery ? ' “' + esc(spellQuery) + '”' : "") + '.</div>';
    ov.innerHTML =
      '<div class="dcci-modal" role="dialog" aria-label="Choose the spell">' +
        '<div class="dcci-head"><h3>Spell on the ' + esc(spellFor.name) + '</h3><button class="dcci-x" onclick="DCCItems.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-search"><input id="dcci-spell-search" type="search" placeholder="Search spells…" value="' + attr(spellQuery) + '" oninput="DCCItems.searchSpell(this.value)"></div>' +
        '<div class="dcci-list">' + rows + '</div>' +
        '<div class="dcci-foot"><input id="dcci-spell-custom" type="text" placeholder="…or type a custom spell name" onkeydown="if(event.key===\'Enter\')DCCItems.chooseSpellCustom()">' +
          '<button class="dcci-btn" onclick="DCCItems.chooseSpellCustom()">Add</button>' +
          '<button class="dcci-btn plain" onclick="DCCItems.skipSpell()">No spell yet</button>' +
          '<button class="dcci-btn plain" onclick="DCCItems.backToItems()">← Items</button></div>' +
      '</div>';
    var s = document.getElementById("dcci-spell-search");
    if (s) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }
  function finalizeSpell(spellName) {
    var it = spellFor;
    if (!it) return;
    if (spellName) fillRow(newInvRow(), spellItemName(it, spellName), spellItemNotes(it, spellName));
    else fillRow(newInvRow(), it.name, notesOf(it));   // "No spell yet" → plain item row
    try { if (window.DCCHotlist) window.DCCHotlist.refresh(); } catch (e) {}
    view = "items"; spellFor = null; spellQuery = ""; spellExpanded = {};
    renderPicker();
  }

  // ── info panel (per-row (i) button on the Inventory table) ──────────────────
  function info(name) {
    injectCss();
    var it = lookup(name);
    var ov = overlay("dcci-info-overlay");
    var inner = it
      ? '<div class="dcci-head"><h3>' + esc(it.name) + '</h3><button class="dcci-x" onclick="DCCItems.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-info-body"><div class="mt">' + esc(metaLine(it)) + '</div><div class="ef">' + esc(it.effect || "No description on file.") + '</div></div>'
      : '<div class="dcci-head"><h3>' + esc(name || "Item") + '</h3><button class="dcci-x" onclick="DCCItems.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-info-body"><div class="grp">No catalog entry matches “' + esc(name || "") + '”. It may be a custom, renamed, or looted item — check its Notes.</div></div>';
    ov.innerHTML = '<div class="dcci-modal" role="dialog" aria-label="Item info">' + inner + '</div>';
  }
  function closeInfo() { var ov = document.getElementById("dcci-info-overlay"); if (ov) ov.style.display = "none"; }
  function infoRow(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    if (!tr) return;
    var texts = tr.querySelectorAll('input[type="text"]');   // [item, qty, notes]
    var name = texts[0] ? texts[0].value : "";
    // Try, in order: the raw name, the part before a ":" (spell-bearing items read
    // "Spell Scroll: Fireball" — the catalog item is "Spell Scroll"), and the name
    // with a trailing parenthetical removed. First one the catalog knows wins.
    var cands = [];
    if (name) cands.push(name);
    var beforeColon = String(name).split(":")[0].trim();
    if (beforeColon && cands.indexOf(beforeColon) < 0) cands.push(beforeColon);
    var stripped = String(name).replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (stripped && cands.indexOf(stripped) < 0) cands.push(stripped);
    var hit = null;
    for (var i = 0; i < cands.length && !hit; i++) { if (lookup(cands[i])) hit = cands[i]; }
    info(hit || name);
  }

  window.DCCItems = {
    openPicker: openPicker,
    closePicker: closePicker,
    info: info,
    closeInfo: closeInfo,
    infoRow: infoRow,
    search: function (v) { query = v; renderPicker(); },
    filter: function (key) { filterKey = key; renderPicker(); },
    toggle: function (name) { expanded[name] = !expanded[name]; renderPicker(); },
    add: function (name) {
      var it = lookup(name);
      // A spell-bearing item opens the spell chooser instead of adding straight away.
      if (it && carriesSpell(it)) { view = "spell"; spellFor = it; spellQuery = ""; spellExpanded = {}; renderPicker(); return; }
      addToSheet(it, it ? it.name : name);
    },
    addCustom: function () {
      var inp = document.getElementById("dcci-custom-input");
      var name = inp ? String(inp.value || "").trim() : "";
      if (!name) return;
      var it = lookup(name);
      if (it && carriesSpell(it)) { view = "spell"; spellFor = it; spellQuery = ""; spellExpanded = {}; renderPicker(); if (inp) inp.value = ""; return; }
      addToSheet(it, it ? it.name : name);
      if (inp) inp.value = "";
      closePicker();
    },
    addBlank: function () { newInvRow(); closePicker(); },
    // spell chooser
    searchSpell: function (v) { spellQuery = v; renderSpellPicker(); },
    toggleSpell: function (name) { spellExpanded[name] = !spellExpanded[name]; renderSpellPicker(); },
    chooseSpell: function (name) { finalizeSpell(name); },
    chooseSpellCustom: function () {
      var inp = document.getElementById("dcci-spell-custom");
      var name = inp ? String(inp.value || "").trim() : "";
      if (!name) return;
      finalizeSpell(name);
    },
    skipSpell: function () { finalizeSpell(""); },
    backToItems: function () { view = "items"; spellFor = null; spellQuery = ""; spellExpanded = {}; renderPicker(); },
    refreshHomebrew: fetchHomebrew,
  };

  // Pull the user's saved homebrew items once the module is ready.
  fetchHomebrew();
})();
