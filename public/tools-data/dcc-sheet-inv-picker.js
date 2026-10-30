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
// The Enchanted tab builds a one-off magic item — a base item plus bonus badges,
// rolled from the loot tables at a tier or added by hand — or a Spell Scroll /
// Magic Tome / Spellbook holding a spell (Spell badges only).
//
// This only fills the existing inventory row inputs and fires an input event so
// autosave picks it up; the sheet's addInvRow()/collectSheet() are unchanged.

(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function attr(s) { return esc(s).replace(/'/g, "&#39;"); }
  function jsq(s) { return esc(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'"); }
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
  // The filter chips. There is no Enchanted builder on the sheet: enchanted gear only
  // comes out of loot boxes (the GM Screen's Loot Drop), never from a shop.
  var CHIPS = GROUPS;
  // Tiered weapons / armor / accessories (the book's named magic items, homebrew
  // ones with a loot tier) are loot-box finds, so the Add Item list leaves them out.
  // Tiered consumables (potions, scratchers…) stay. A custom name can still be typed.
  function lootOnly(it) {
    var tier = String(it && it.tier || "");
    return !!it && /^(weapon|armor|accessory)$/.test(it.category || "") && !!tier && !/^mundane$/i.test(tier);
  }
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
          // Shared with the equip engine and the weapon → skill lookup, which read
          // window.__DCC_HB_ITEMS (it was never published, so a homebrew item's own
          // data was invisible to them).
          window.__DCC_HB_ITEMS = hbItems;
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
  // ── CSS (mirrors the skill picker's dccs- styling with a dcci- prefix) ───────
  function injectCss() {
    if (document.getElementById("dcci-css")) return;
    var st = document.createElement("style");
    st.id = "dcci-css";
    st.textContent = [
      ".dcci-overlay{position:fixed;inset:var(--dd-bar-h,0px) 0 0 0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:32px 12px;overflow:auto;}",
      ".dcci-modal{margin:auto;background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:620px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:'Barlow',sans-serif;}",
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
      ".dcci-spells{margin-top:14px;border-top:1px solid #2a2a2e;padding-top:10px;}",
      ".dcci-spells .grp{text-transform:uppercase;letter-spacing:.08em;font-size:10px;font-weight:700;}",
      ".dcci-spells .sp{margin-top:10px;}",
      ".dcci-spells .sp-h{color:#e6c15a;font-size:14px;font-weight:700;}",
      ".dcci-spells .mt{margin:2px 0 6px;}",
      ".dcci-spells .up{margin-top:6px;font-size:12px;line-height:1.45;color:#c9c9cf;}",
      ".dcci-spells .up b{color:#f0a8a3;}",
      ".dcci-spells .up.on b{color:#8fd18f;}",
      ".dcci-spells .up.off{opacity:.55;}",
      ".dcci-ench{display:flex;flex-direction:column;gap:10px;padding:12px 18px 14px;}",
      ".dcci-ench label{display:flex;flex-direction:column;gap:4px;color:#8a8a93;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;}",
      ".dcci-ench select,.dcci-ench input[type=text]{background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;text-transform:none;letter-spacing:0;font-weight:400;}",
      ".dcci-ench select:focus,.dcci-ench input:focus{outline:none;border-color:#c8892a;}",
      ".dcci-ench select option,.dcci-ench select optgroup{background:#141416;color:#ece9e1;}",
      ".dcci-ench-row{display:flex;gap:8px;align-items:flex-end;}",
      ".dcci-ench-row label{flex:0 0 160px;}",
      ".dcci-ench-row .dcci-btn{height:35px;}",
      ".dcci-ench-ef{color:#a8a59c;font-size:12px;line-height:1.45;margin-top:-4px;}",
      ".dcci-ench-lbl{color:#8a8a93;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:-4px;}",
      "#dcci-ench-bon{color:#ece9e1;--dcbn-font:'Barlow',sans-serif;--dcbn-pop-bg:#141416;--dcbn-pop-fg:#ece9e1;--dcbn-pop-bd:#2a2a2e;--dcbn-acc:#c8892a}",
      "#dcci-ench-bon .dcbn-b{font-size:12.5px}",
      ".dcci-foot .dcci-ench-note{flex:1;color:#8a8a93;font-size:12px;align-self:center;}",
      ".dcci-btn[disabled]{opacity:.45;cursor:default;}",
      ".dcci-foot .dcci-btn{min-height:32px;}",
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
    // Already carrying it? Add to that row's Quantity instead of a second row.
    var nm0 = name || (it ? it.name : "");
    if (nm0 && window.DCCFx && window.DCCFx.invRowByName(nm0)) {
      window.DCCFx.stackAdd(nm0, 1);
      if (it && it.category === "weapon" && window.DCCSkills && window.DCCSkills.ensureWeaponSkill) { try { window.DCCSkills.ensureWeaponSkill(nm0, { base: it.name, effect: it.effect }); } catch (e) {} }
      return;
    }
    var tr = newInvRow();
    fillRow(tr, name || (it ? it.name : ""), it ? notesOf(it) : "");
    // Stamp category/slot/effect so the row's radial can equip it (works for
    // homebrew armor/accessories too, which a name lookup wouldn't find).
    if (tr && it) { tr.dataset.cat = it.category || ""; if (it.slot) tr.dataset.slot = it.slot; if (it.effect) tr.dataset.effect = it.effect; if (window.DCCEquip && window.DCCEquip.setBenefits) { var bl = (Array.isArray(it.benefits) && it.benefits.length) ? it.benefits : (window.DCCBonus ? window.DCCBonus.fromText(it.effect || "").filter(function (b) { return b.kind !== "note"; }) : []); window.DCCEquip.setBenefits(tr, bl); try { window.DCCEquip.refreshRow(tr.querySelector(".hot-pin")); } catch (e) {} } }
    autoEquip(tr, it);
    // A weapon brings its weapon skill onto the Skills list (which rolls To Hit + Damage).
    if (it && it.category === "weapon" && window.DCCSkills && window.DCCSkills.ensureWeaponSkill) {
      try { window.DCCSkills.ensureWeaponSkill(name || it.name, { base: it.name, effect: it.effect }); } catch (e) {}
    }
  }
  // Auto-equip body-slot gear straight into the Gear slots instead of leaving
  // it to be pinned to the Hotlist.
  function autoEquip(tr, it) {
    var equipped = false;
    // Not when the hands are full — picking up a third weapon just carries it.
    if (tr && it && isBodySlot(it.slot) && window.DCCEquip && typeof window.DCCEquip.isEquipType === "function" && window.DCCEquip.isEquipType(tr)
        && (!window.DCCEquip.fits || window.DCCEquip.fits(tr))) {
      var pin = tr.querySelector(".hot-pin");
      if (pin && tr.dataset.equipped !== "1") { try { window.DCCEquip.click(pin); equipped = true; } catch (e) {} }
    }
    if (!equipped) { try { if (window.DCCHotlist) window.DCCHotlist.refresh(); } catch (e) {} }
  }

  // ── picker ──────────────────────────────────────────────────────────────────
  var query = "";
  var filterKey = "all";
  var expanded = {};
  var view = "items";        // 'items' | 'ench'

  function openPicker() {
    if (!haveData()) { alert("The item catalog didn't load. Open this sheet from the app so /tools-data/dcc-items.js is available."); return; }
    injectCss();
    expanded = {};
    view = "items"; ench = null; if (filterKey === "ench") filterKey = "all";
    overlay("dcci-overlay");
    renderPicker();
    var s = document.getElementById("dcci-search-input");
    if (s) s.focus();
  }
  function closePicker() {
    var ov = document.getElementById("dcci-overlay"); if (ov) ov.style.display = "none";
    query = ""; expanded = {}; view = "items"; ench = null;
    if (window.DCCBonus) { try { window.DCCBonus.closePicker(); } catch (e) {} }
  }

  function itemHtml(it) {
    var open = !!expanded[it.name];
    var detail = open
      ? '<div class="detail"><div class="ef">' + esc(it.effect || "No description on file.") + '</div></div>'
      : "";
    return '<div class="dcci-item' + (open ? " open" : "") + '">' +
      '<div class="row">' +
        '<div class="body" onclick="DCCItems.add(\'' + jsq(it.name) + '\')" title="Add to your inventory">' +
          '<div class="nm">' + esc(it.name) + '</div>' +
          '<div class="mt">' + esc(metaLine(it)) + '</div>' +
        '</div>' +
        '<button class="dcci-i' + (open ? " on" : "") + '" title="' + (open ? "Hide details" : "What does it do?") + '" onclick="DCCItems.toggle(\'' + jsq(it.name) + '\')">i</button>' +
      '</div>' + detail +
    '</div>';
  }
  function renderPicker() {
    if (view === "ench") return renderEnchant();
    var ov = document.getElementById("dcci-overlay");
    if (!ov) return;
    var q = query.trim().toLowerCase();
    var g = GROUPS.find(function (x) { return x.key === filterKey; }) || GROUPS[0];
    var list = itemsAZ().filter(function (it) {
      if (lootOnly(it)) return false;
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
    var chips = CHIPS.map(function (f) {
      return '<button class="dcci-chip' + (filterKey === f.key ? " on" : "") + '" onclick="DCCItems.filter(\'' + f.key + '\')">' + esc(f.label) + '</button>';
    }).join("");
    ov.innerHTML =
      '<div class="dcci-modal" role="dialog" aria-label="Add an item">' +
        '<div class="dcci-head"><h3>Add an Item</h3><button class="dcci-x" onclick="DCCItems.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-search"><input id="dcci-search-input" type="search" placeholder="Search items…" value="' + attr(query) + '" oninput="DCCItems.search(this.value)"></div>' +
        '<div class="dcci-filters">' + chips + '</div>' +
        '<div class="dcci-list">' + rows + '</div>' +
      '</div>';
    var s = document.getElementById("dcci-search-input");
    if (s) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }

  // ── Spell scroll / tome writer ─────────────────────────────────────────────
  // Picking a Spell Scroll, Magic Tome or Spellbook asks which Spell it holds (a
  // blank scroll does nothing). This used to be a full Enchanted-item builder;
  // gear enchanting was removed from the sheet — enchanted gear only comes from
  // loot boxes (the GM Screen's Loot Drop).
  var ench = null;   // { base, name, nameTouched, tier, benefits }
  var BASE_GROUPS = [["spell", "Spell Scrolls & Tomes"]];
  function baseKind(it) { return carriesSpell(it) ? "spell" : (it && BASE_GROUPS.some(function (g) { return g[0] === it.category; }) ? it.category : ""); }
  function bases() { return itemsAZ().filter(function (it) { return !!baseKind(it); }); }
  function defaultName(e) {
    var it = lookup(e.base); if (!it) return e.name;
    if (carriesSpell(it)) { var sp = (e.benefits || []).find(function (b) { return b.kind === "spell"; }); return it.name + (sp ? ": " + sp.target : ""); }
    return "Enchanted " + it.name;
  }
  function openEnchant(baseName) {
    var it = baseName ? lookup(baseName) : null;
    ench = { base: it ? it.name : "", name: "", nameTouched: false, tier: "Gold", benefits: [] };
    if (it) ench.name = defaultName(ench);
    view = "ench"; filterKey = "scroll";
    renderEnchant();
  }
  function renderEnchant() {
    var ov = document.getElementById("dcci-overlay"); if (!ov || !ench) return;
    var it = lookup(ench.base), spell = carriesSpell(it);
    var chips = CHIPS.map(function (f) { return '<button class="dcci-chip' + (f.key === "scroll" ? " on" : "") + '" onclick="DCCItems.filter(\'' + f.key + '\')">' + esc(f.label) + "</button>"; }).join("");
    var opts = '<option value="">— choose a scroll or tome —</option>' + BASE_GROUPS.map(function (g) {
      var list = bases().filter(function (b) { return baseKind(b) === g[0]; });
      return list.length ? '<optgroup label="' + attr(g[1]) + '">' + list.map(function (b) { return '<option value="' + attr(b.name) + '"' + (b.name === ench.base ? " selected" : "") + ">" + esc(b.name) + (b.slot && g[0] !== "spell" ? " — " + esc(b.slot) : "") + "</option>"; }).join("") + "</optgroup>" : "";
    }).join("");
    ov.innerHTML =
      '<div class="dcci-modal" role="dialog" aria-label="Spell scroll or tome">' +
        '<div class="dcci-head"><h3>Spell Scroll / Tome</h3><button class="dcci-x" onclick="DCCItems.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-filters">' + chips + "</div>" +
        '<div class="dcci-ench">' +
          '<label>Item<select id="dcci-ench-base" onchange="DCCItems.enchBase(this.value)">' + opts + "</select></label>" +
          (it ? '<div class="dcci-ench-ef">' + esc((it.slot ? it.slot + " — " : "") + (it.effect || "")) + "</div>" : "") +
          '<label>Name<input id="dcci-ench-name" type="text" maxlength="80" placeholder="Name your item" value="' + attr(ench.name) + '" oninput="DCCItems.enchName(this.value)"></label>' +
          (it ? '<div class="dcci-ench-lbl">Spell</div><div id="dcci-ench-bon"></div>' : '<div class="dcci-grp">Pick a Spell Scroll, Magic Tome or Spellbook, then the Spell it holds.</div>') +
        "</div>" +
        '<div class="dcci-foot"><span class="dcci-ench-note">' + (it ? "A scroll casts its Spell once (free); a tome teaches it." : "") + "</span>" +
          '<button class="dcci-btn" type="button" onclick="DCCItems.enchAdd()"' + (it ? "" : " disabled") + ">Add to Inventory</button></div>" +
      "</div>";
    var host = document.getElementById("dcci-ench-bon");
    if (host && window.DCCBonus && spell) {
      ench.ed = window.DCCBonus.editor(host, { benefits: ench.benefits, empty: "No spell yet", kinds: ["spell"], noCharges: true, addLabel: "+ Spell", onChange: enchChanged,
        extra: [{ label: "🎲", title: "A random spell", onClick: function () { var r = window.DCCBonus.randomSpell(); if (r) { ench.benefits = [r]; ench.ed.set(ench.benefits); enchChanged(ench.benefits); } } }] });
    }
  }
  function enchChanged(list) {
    ench.benefits = list;
    if (!ench.nameTouched) { ench.name = defaultName(ench); var n = document.getElementById("dcci-ench-name"); if (n) n.value = ench.name; }
  }
  function enchAdd() {
    var it = lookup(ench && ench.base); if (!it || !carriesSpell(it)) return;   // spell scrolls / tomes only
    var name = String(ench.name || "").trim() || defaultName(ench);
    var tr = newInvRow();
    fillRow(tr, name, "");
    if (tr) {
      tr.dataset.cat = it.category || "";
      if (it.slot) tr.dataset.slot = it.slot;
      // The base item, kept on the row (and saved), so a renamed enchanted weapon
      // still knows which weapon skill it uses.
      tr.dataset.base = it.name;
      // The base item keeps what it already did (Bitchass Buckler's +3 DR) — the
      // enchantment ADDS to it. Same bonus twice is kept once.
      var baseB = carriesSpell(it) ? [] : ((Array.isArray(it.benefits) && it.benefits.length) ? it.benefits : (window.DCCBonus ? window.DCCBonus.fromText(it.effect || "").filter(function (b) { return b.kind !== "note"; }) : []));
      var all = [], seen = {};
      baseB.concat(ench.benefits || []).forEach(function (b) { var k = window.DCCBonus ? window.DCCBonus.label(b) : JSON.stringify(b); if (!seen[k]) { seen[k] = 1; all.push(b); } });
      if (window.DCCEquip && window.DCCEquip.setBenefits) { window.DCCEquip.setBenefits(tr, all); try { window.DCCEquip.refreshRow(tr.querySelector(".hot-pin")); } catch (e) {} }
    }
    // Same as any other add: worn gear goes straight on, and a weapon brings its
    // BASE weapon's skill ("Enchanted Baseball Bat" → Baseball Bat) to the Skills list.
    // A scroll/tome is read, not worn, so it skips both.
    if (!carriesSpell(it)) {
      autoEquip(tr, it);
      if (it.category === "weapon" && window.DCCSkills && window.DCCSkills.ensureWeaponSkill) {
        try { window.DCCSkills.ensureWeaponSkill(name, { base: it.name, effect: it.effect }); } catch (e) {}
      }
    } else { try { if (window.DCCHotlist) window.DCCHotlist.refresh(); } catch (e) {} }
    closePicker();
  }

  // ── info panel (per-row (i) button on the Inventory table) ──────────────────
  // The Spell(s) a scroll / tome / spellbook row holds: its Spell badges first (GM
  // Loot Box, the scroll writer), else the name ("Spell Scroll: Fireball (Rank 3)",
  // "Tome of Fireball"). → [{ sp, rank }] (rank 0 = not stated).
  function spellEntry(n) {
    var k = String(n || "").toLowerCase().replace(/[^a-z0-9]/g, ""); if (!k) return null;
    var all = (typeof DCC_SPELLS !== "undefined" ? DCC_SPELLS : []).concat(Array.isArray(window.__DCC_HB_SPELLS) ? window.__DCC_HB_SPELLS : []);
    return all.find(function (x) { return x && String(x.name).toLowerCase().replace(/[^a-z0-9]/g, "") === k; }) || null;
  }
  function heldSpells(tr, name) {
    var out = [];
    try {
      var bl = window.DCCEquip && window.DCCEquip.benefitsOf && tr ? window.DCCEquip.benefitsOf(tr) : [];
      (bl || []).forEach(function (b) { if (b && b.kind === "spell") { var sp = spellEntry(b.target); if (sp) out.push({ sp: sp, rank: parseInt(b.amount, 10) || 0 }); } });
    } catch (e) {}
    if (!out.length) {
      var m = String(name || "").match(/^(?:spell\s+scroll|scroll|magic\s+tome|tome|spellbook|grimoire)\s*(?:of)?\s*[:\-–—]?\s*(.+?)(?:\s*\(rank\s*(\d+)\))?$/i);
      var sp2 = m ? spellEntry(m[1]) : null;
      if (sp2) out.push({ sp: sp2, rank: m[2] ? parseInt(m[2], 10) : 0 });
    }
    return out;
  }
  function spellHtml(h, isScroll) {
    var sp = h.sp, R = h.rank || (isScroll ? 1 : 0);
    var meta = [sp.mana != null ? sp.mana + " Mana" : "", sp.type || "", sp.stat || "", R ? "Rank " + R : ""].filter(Boolean).join(" · ");
    var ups = (sp.upgrades || []).map(function (u) {
      var on = R && Number(u.rank) <= R;
      return '<div class="up' + (R ? (on ? " on" : " off") : "") + '"><b>Rank ' + esc(u.rank) + ":</b> " + esc(u.text) + "</div>";
    }).join("");
    return '<div class="sp"><div class="sp-h">✦ ' + esc(sp.name) + '</div><div class="mt">' + esc(meta) + '</div><div class="ef">' + esc(sp.desc || "") + "</div>" + ups + "</div>";
  }
  function info(name, tr) {
    injectCss();
    var it = lookup(name);
    var held = heldSpells(tr, tr ? (tr.querySelector('input[type="text"]') || {}).value : name);
    var scroll = /scroll/i.test(String(name) + " " + (it ? it.name : ""));
    var spells = held.length ? '<div class="dcci-spells"><div class="grp">' + (held.length > 1 ? "Spells it holds" : "The Spell it holds") + "</div>" + held.map(function (h) { return spellHtml(h, scroll); }).join("") + "</div>" : "";
    var ov = overlay("dcci-info-overlay");
    var inner = it
      ? '<div class="dcci-head"><h3>' + esc(it.name) + '</h3><button class="dcci-x" onclick="DCCItems.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-info-body"><div class="mt">' + esc(metaLine(it)) + '</div><div class="ef">' + esc(it.effect || "No description on file.") + '</div>' + spells + '</div>'
      : '<div class="dcci-head"><h3>' + esc(name || "Item") + '</h3><button class="dcci-x" onclick="DCCItems.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dcci-info-body">' + (spells || '<div class="grp">No catalog entry matches “' + esc(name || "") + '”. It may be a custom, renamed, or looted item — check its Notes.</div>') + '</div>';
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
    info(hit || name, tr);
  }

  window.DCCItems = {
    openPicker: openPicker,
    closePicker: closePicker,
    info: info,
    closeInfo: closeInfo,
    infoRow: infoRow,
    search: function (v) { query = v; renderPicker(); },
    filter: function (key) { if (key === "ench") key = "scroll"; filterKey = key; view = "items"; ench = null; renderPicker(); },
    toggle: function (name) { expanded[name] = !expanded[name]; renderPicker(); },
    add: function (name) {
      var it = lookup(name);
      // A spell-bearing item asks which Spell it holds.
      if (it && carriesSpell(it)) { openEnchant(it.name); return; }
      addToSheet(it, it ? it.name : name);
    },
    addCustom: function () {
      var inp = document.getElementById("dcci-custom-input");
      var name = inp ? String(inp.value || "").trim() : "";
      if (!name) return;
      var it = lookup(name);
      if (it && carriesSpell(it)) { openEnchant(it.name); if (inp) inp.value = ""; return; }
      addToSheet(it, it ? it.name : name);
      if (inp) inp.value = "";
      closePicker();
    },
    addBlank: function () { newInvRow(); closePicker(); },
    // Spell scroll / tome writer (gear enchanting is loot-only — GM Screen)
    openEnchant: function (n) { var it = lookup(n); if (it && carriesSpell(it)) openEnchant(it.name); },
    enchBase: function (v) {
      var was = carriesSpell(lookup(ench.base)), now = carriesSpell(lookup(v));
      ench.base = v; if (was !== now) ench.benefits = [];
      if (!ench.nameTouched) ench.name = defaultName(ench);
      renderEnchant();
    },
    enchName: function (v) { ench.name = v; ench.nameTouched = !!String(v).trim(); },
    enchAdd: enchAdd,
    refreshHomebrew: fetchHomebrew,
  };

  // Pull the user's saved homebrew items once the module is ready.
  fetchHomebrew();
})();
