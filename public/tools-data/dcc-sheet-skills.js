// Dungeon Crawler Carl — Skill / Spell picker + info lookup
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after
// /tools-data/dcc-skills.js and /tools-data/dcc-spells.js (the DCC_SKILLS /
// DCC_SPELLS globals) and the sheet's own scripts.
//
// Two jobs:
//   1. The "+ Add Skill" button opens a searchable picker of every Skill AND Spell
//      (spells ARE skills in DCC — they go on the same list). Picking one adds a
//      pre-filled row to the Skills table (name, linked stat, check type, notes).
//   2. An (i) button on each skill row (and in the picker) opens an info panel with
//      the full effect text and the Rank 5/10/15 upgrades, so players can look a
//      skill or spell up without leaving the sheet.
//
// The sheet's own addSkillRow()/collectSheet() are unchanged in shape — this only
// fills the existing row inputs and fires an input event so autosave picks it up.

(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function attr(s) { return esc(s).replace(/'/g, "&#39;"); }
  function haveData() {
    return typeof DCC_SKILLS !== "undefined" || typeof DCC_SPELLS !== "undefined" ||
      (Array.isArray(window.__DCC_HB_SKILLS) && window.__DCC_HB_SKILLS.length) ||
      (Array.isArray(window.__DCC_HB_SPELLS) && window.__DCC_HB_SPELLS.length);
  }

  // The user's saved homebrew skills/spells (own + campaign-shared), pulled from
  // the app once on load. Stored in the exact DCC_SKILLS / DCC_SPELLS shape, so
  // they slot straight into the index below. Empty when opened standalone.
  function hbSkills() { return Array.isArray(window.__DCC_HB_SKILLS) ? window.__DCC_HB_SKILLS : []; }
  function hbSpells() { return Array.isArray(window.__DCC_HB_SPELLS) ? window.__DCC_HB_SPELLS : []; }

  // ── unified index of skills + spells ────────────────────────────────────────
  function entries() {
    var out = [];
    var skills = (typeof DCC_SKILLS !== "undefined" ? DCC_SKILLS : []).concat(hbSkills());
    var spells = (typeof DCC_SPELLS !== "undefined" ? DCC_SPELLS : []).concat(hbSpells());
    skills.forEach(function (s) {
      out.push({
        kind: s.category === "attack" ? "attack" : "skill",
        name: s.name, stat: s.stat || "", passive: !!s.passive, interrupt: !!s.interrupt,
        group: s.group || "", desc: s.desc || "", upgrades: s.upgrades || [],
        damage: s.damage || "", range: s.range || "", homebrew: s.source === "Homebrew", src: s,
      });
    });
    spells.forEach(function (sp) {
      out.push({
        kind: "spell", name: sp.name, stat: sp.stat || "", passive: !!sp.passive,
        mana: sp.mana, type: sp.type || "", desc: sp.desc || "", upgrades: sp.upgrades || [],
        homebrew: sp.source === "Homebrew", src: sp,
      });
    });
    return out;
  }
  function lookup(name) {
    var t = String(name || "").trim().toLowerCase();
    if (!t) return null;
    var all = entries();
    return all.find(function (e) { return e.name.toLowerCase() === t; }) ||
      all.find(function (e) { return e.name.toLowerCase().replace(/[^a-z]/g, "") === t.replace(/[^a-z]/g, ""); }) || null;
  }
  function checkTypeOf(e) {
    if (e.kind === "spell") return "Spell";
    if (e.passive) return "Passive";
    if (e.interrupt) return "Interrupt";
    return "Active";
  }
  function metaLine(e) {
    var bits = [];
    if (e.kind === "spell") { bits.push("Spell"); if (e.type) bits.push(e.type); if (e.mana != null) bits.push(e.mana + " Mana"); }
    else { bits.push(e.kind === "attack" ? "Attack" : "Utility"); if (e.group) bits.push(e.group); if (e.passive) bits.push("Passive"); if (e.interrupt) bits.push("Interrupt"); }
    if (e.stat) bits.push(String(e.stat).toUpperCase());
    if (e.damage) bits.push(e.damage + (e.range ? " · " + e.range : ""));
    if (e.homebrew) bits.push("Homebrew");
    return bits.join(" · ");
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("dccs-css")) return;
    var st = document.createElement("style");
    st.id = "dccs-css";
    st.textContent = [
      ".dccs-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:32px 12px;overflow:auto;}",
      ".dccs-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:620px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:'Barlow',sans-serif;}",
      ".dccs-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;border-bottom:1px solid #2a2a2e;}",
      ".dccs-head h3{margin:0;font-size:15px;text-transform:uppercase;letter-spacing:.03em;color:#fff;}",
      ".dccs-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:28px;height:28px;cursor:pointer;}",
      ".dccs-x:hover{border-color:#b82018;color:#f0a8a3;}",
      ".dccs-search{margin:12px 18px 4px;}",
      ".dccs-search input{width:100%;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccs-search input:focus{outline:none;border-color:#b82018;}",
      ".dccs-filters{display:flex;flex-wrap:wrap;gap:6px;padding:8px 18px 2px;}",
      ".dccs-chip{border:1px solid #2a2a2e;background:transparent;color:#8a8a93;border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;cursor:pointer;}",
      ".dccs-chip:hover{border-color:#b82018;color:#f0a8a3;}",
      ".dccs-chip.on{border-color:#b82018;background:#1c1516;color:#f0a8a3;}",
      ".dccs-list{max-height:52vh;overflow:auto;padding:6px 18px 10px;}",
      ".dccs-grp{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin:12px 0 2px;}",
      ".dccs-item{border:1px solid #2a2a2e;border-radius:8px;padding:8px 10px;margin-top:8px;}",
      ".dccs-item .row{display:flex;align-items:flex-start;gap:8px;}",
      ".dccs-item .body{flex:1;min-width:0;cursor:pointer;}",
      ".dccs-item:hover,.dccs-item.open{border-color:#b82018;}",
      ".dccs-item .nm{font-weight:700;color:#f0a8a3;font-size:13px;}",
      ".dccs-item .mt{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}",
      ".dccs-item .detail{margin-top:8px;padding-top:8px;border-top:1px solid #2a2a2e;}",
      ".dccs-item .detail .ef{color:#d8d5cc;font-size:12.5px;line-height:1.5;}",
      ".dccs-item .detail .uprow{margin-top:6px;font-size:11.5px;color:#c9c9cf;line-height:1.45;}",
      ".dccs-item .detail .uprow b{color:#f0a8a3;}",
      ".dccs-i{flex:0 0 auto;width:20px;height:20px;border-radius:50%;border:1px solid #3a3a40;background:transparent;color:#8a8a93;font-size:11px;font-style:italic;cursor:pointer;}",
      ".dccs-i:hover,.dccs-i.on{border-color:#b82018;color:#f0a8a3;}",
      ".dccs-i.on{background:#1c1516;}",
      ".dccs-foot{display:flex;gap:8px;padding:10px 18px 16px;border-top:1px solid #2a2a2e;}",
      ".dccs-foot input{flex:1;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccs-btn{border:1px solid #2a2a2e;background:#1c1516;color:#f0a8a3;border-radius:6px;padding:0 14px;font-size:12px;font-weight:700;cursor:pointer;}",
      ".dccs-btn:hover{border-color:#b82018;}",
      ".dccs-btn.plain{background:#161618;color:#c9c9cf;}",
      ".dccs-item.adding{border-color:#b82018;}",
      ".dccs-addbar{display:flex;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid #2a2a2e;}",
      ".dccs-rename{flex:1;min-width:0;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:7px 9px;font-size:13px;font-family:inherit;}",
      ".dccs-rename:focus{outline:none;border-color:#b82018;}",
      ".dccs-hint{padding:9px 18px 16px;font-size:11px;color:#8a8a93;text-align:center;}",
      // info panel
      ".dccs-info .ef{color:#e6e3da;font-size:13px;line-height:1.55;margin-top:8px;}",
      ".dccs-info .uprow{margin-top:8px;font-size:12px;color:#c9c9cf;line-height:1.5;}",
      ".dccs-info .uprow b{color:#f0a8a3;}",
      ".dccs-info .uphdr{margin-top:14px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#8a8a93;border-top:1px solid #2a2a2e;padding-top:10px;}",
      ".dccs-info .uphdr .upnow{color:#e6c15a;text-transform:none;letter-spacing:0;}",
      ".dccs-info .uprow.on{color:#e6e3da;}",
      ".dccs-info .uprow.on b{color:#8fd18f;}",
      ".dccs-info .uprow.off{opacity:.55;}",
      ".dccs-info .uprow .upmark{display:inline-block;width:1.3em;}",
      ".dccs-info .mt{color:#8a8a93;font-size:11px;text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}",
      ".dccs-info-body{padding:16px 18px 18px;}",
    ].join("\n");
    document.head.appendChild(st);
  }

  function overlay(id) {
    var ov = document.getElementById(id);
    if (!ov) {
      ov = document.createElement("div");
      ov.id = id;
      ov.className = "dccs-overlay";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) ov.style.display = "none"; });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    return ov;
  }

  // ── picker ────────────────────────────────────────────────────────────────────
  var query = "";
  var filterKind = "all";   // 'all' | 'utility' | 'attack' | 'spell'
  var expanded = {};        // kind:name -> inline detail open in the picker
  var adding = null;        // kind:name -> rename/confirm bar open (only one at a time)
  var FILTERS = [
    { key: "all", label: "All" },
    { key: "utility", label: "Utility" },
    { key: "attack", label: "Attack" },
    { key: "spell", label: "Spells" },
  ];
  function ekey(e) { return e.kind + ":" + e.name; }
  function openPicker() {
    if (!haveData()) { alert("The skill and spell lists didn't load. Open this sheet from the app so /tools-data/dcc-skills.js and dcc-spells.js are available."); return; }
    injectCss();
    expanded = {};
    overlay("dccs-overlay");
    renderPicker();
    var s = document.getElementById("dccs-search-input");
    if (s) s.focus();
  }
  function closePicker() { var ov = document.getElementById("dccs-overlay"); if (ov) ov.style.display = "none"; query = ""; expanded = {}; adding = null; }
  function itemHtml(e) {
    var k = ekey(e);
    var open = !!expanded[k];
    var addOpen = adding === k;
    var detail = open
      ? '<div class="detail"><div class="ef">' + esc(e.desc || "No description on file.") + '</div>' + upgradesHtml(e) + '</div>'
      : "";
    // Tapping a skill opens a rename bar (pre-filled) so it can be renamed before
    // it's added — the rulebook original is still remembered as its source.
    var addBar = addOpen
      ? '<div class="dccs-addbar">' +
          '<input class="dccs-rename" type="text" value="' + attr(e.name) + '" data-kind="' + attr(e.kind) + '" data-name="' + attr(e.name) + '" ' +
          'onkeydown="if(event.key===\'Enter\')DCCSkills.confirmAdd(this)">' +
          '<button class="dccs-btn" onclick="DCCSkills.confirmAdd(this.previousElementSibling)">Add to sheet</button>' +
        '</div>'
      : "";
    return '<div class="dccs-item' + (open ? " open" : "") + (addOpen ? " adding" : "") + '">' +
      '<div class="row">' +
        '<div class="body" onclick="DCCSkills.pick(\'' + attr(e.kind) + '\',\'' + attr(e.name) + '\')" title="Add to your skills — rename it first if you like">' +
          '<div class="nm">' + esc(e.name) + '</div>' +
          '<div class="mt">' + esc(metaLine(e)) + '</div>' +
        '</div>' +
        '<button class="dccs-i' + (open ? " on" : "") + '" title="' + (open ? "Hide details" : "What does it do?") + '" onclick="DCCSkills.toggle(\'' + attr(e.kind) + '\',\'' + attr(e.name) + '\')">i</button>' +
      '</div>' + addBar + detail +
    '</div>';
  }
  function renderPicker() {
    var ov = document.getElementById("dccs-overlay");
    if (!ov) return;
    // Preserve the list's scroll position and whether the search box was focused,
    // so toggling a skill's info (or opening its rename bar) doesn't jump to top.
    var prevList = ov.querySelector(".dccs-list");
    var savedScroll = prevList ? prevList.scrollTop : 0;
    var searchWasFocused = document.activeElement && document.activeElement.id === "dccs-search-input";
    var q = query.trim().toLowerCase();
    var all = entries().filter(function (e) { return !q || e.name.toLowerCase().indexOf(q) >= 0 || (e.desc && e.desc.toLowerCase().indexOf(q) >= 0) || (e.group && e.group.toLowerCase().indexOf(q) >= 0); });
    var util = all.filter(function (e) { return e.kind === "skill"; });
    var atk = all.filter(function (e) { return e.kind === "attack"; });
    var spells = all.filter(function (e) { return e.kind === "spell"; });
    var rows = "";
    var showU = filterKind === "all" || filterKind === "utility";
    var showA = filterKind === "all" || filterKind === "attack";
    var showS = filterKind === "all" || filterKind === "spell";
    if (showU && util.length) rows += '<div class="dccs-grp">Utility Skills</div>' + util.map(itemHtml).join("");
    if (showA && atk.length) rows += '<div class="dccs-grp">Attack Skills</div>' + atk.map(itemHtml).join("");
    if (showS && spells.length) rows += '<div class="dccs-grp">Spells</div>' + spells.map(itemHtml).join("");
    if (!rows) rows = '<div class="dccs-grp">No ' + (filterKind === "all" ? "skill or spell" : filterKind) + ' matches' + (query ? ' “' + esc(query) + '”' : "") + '.</div>';
    var chips = FILTERS.map(function (f) {
      return '<button class="dccs-chip' + (filterKind === f.key ? " on" : "") + '" onclick="DCCSkills.filter(\'' + f.key + '\')">' + esc(f.label) + '</button>';
    }).join("");
    ov.innerHTML =
      '<div class="dccs-modal" role="dialog" aria-label="Add a skill or spell">' +
        '<div class="dccs-head"><h3>Add a Skill or Spell</h3><button class="dccs-x" onclick="DCCSkills.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dccs-search"><input id="dccs-search-input" type="search" placeholder="Search skills &amp; spells…" value="' + attr(query) + '" oninput="DCCSkills.search(this.value)"></div>' +
        '<div class="dccs-filters">' + chips + '</div>' +
        '<div class="dccs-list">' + rows + '</div>' +
        '<div class="dccs-hint">Tap a skill to rename &amp; add it · tap the “i” for details</div>' +
      '</div>';
    var newList = ov.querySelector(".dccs-list");
    if (newList) newList.scrollTop = savedScroll;
    // Only pull focus back to search if it was already there — never steal it from
    // an open rename field.
    var s = document.getElementById("dccs-search-input");
    if (s && searchWasFocused) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }

  // ── info panel (shared by picker and per-row (i) buttons) ───────────────────
  function upgradesHtml(e, rank) {
    if (!e.upgrades || !e.upgrades.length) return "";
    var haveRank = typeof rank === "number" && !isNaN(rank);
    return '<div class="uphdr">Rank Upgrades' + (haveRank ? ' <span class="upnow">(at Rank ' + rank + ')</span>' : "") + '</div>' +
      e.upgrades.map(function (u) {
        var on = haveRank && Number(u.rank) <= rank;
        var mark = haveRank ? '<span class="upmark">' + (on ? "✓" : "🔒") + "</span> " : "";
        return '<div class="uprow' + (on ? " on" : (haveRank ? " off" : "")) + '">' + mark + '<b>Rank ' + esc(u.rank) + ':</b> ' + esc(u.text) + '</div>';
      }).join("");
  }
  function info(name, rank) {
    injectCss();
    var e = lookup(name);
    var ov = overlay("dccs-info-overlay");
    var inner = e
      ? '<div class="dccs-head"><h3>' + esc(e.name) + '</h3><button class="dccs-x" onclick="DCCSkills.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dccs-info-body dccs-info"><div class="mt">' + esc(metaLine(e)) + '</div><div class="ef">' + esc(e.desc || "No description on file.") + '</div>' + upgradesHtml(e, rank) + '</div>'
      : '<div class="dccs-head"><h3>' + esc(name || "Skill") + '</h3><button class="dccs-x" onclick="DCCSkills.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dccs-info-body"><div class="dccs-grp">No rulebook entry matches “' + esc(name || "") + '”. It may be a custom or renamed skill.</div></div>';
    ov.innerHTML = '<div class="dccs-modal dccs-info" role="dialog" aria-label="Skill info">' + inner + '</div>';
  }
  function closeInfo() { var ov = document.getElementById("dccs-info-overlay"); if (ov) ov.style.display = "none"; }
  function infoRow(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    if (!tr) return;
    var texts = tr.querySelectorAll('input[type="text"]');
    var name = texts[0] ? texts[0].value : "";
    // Try, in order: the stored rulebook original (a reskinned/renamed skill keeps it in
    // data-src), the name minus a trailing "(Spell)"/parenthetical, the raw name, then —
    // for attack rows — the Effects field, which may name the source skill/spell for a
    // renamed weapon (e.g. "Longsword skill") or spell.
    var cands = [];
    if (tr.dataset && tr.dataset.src) cands.push(tr.dataset.src);
    var stripped = String(name).replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (stripped) cands.push(stripped);
    if (name && name !== stripped) cands.push(name);
    var isAttack = tr.closest && tr.closest("#attacks-body");
    if (isAttack && texts[3] && texts[3].value) {
      String(texts[3].value).split(/[·,;]/).forEach(function (p) {
        var t = p.replace(/\bskill\b/i, "").trim();
        if (t) cands.push(t);
      });
    }
    var hit = null;
    for (var i = 0; i < cands.length && !hit; i++) { if (lookup(cands[i])) hit = cands[i]; }
    // Current Rank drives which upgrades show as unlocked. An attack row's own Rank
    // may be blank/linked, so prefer the matching Skills-list row's Rank.
    var rank = NaN;
    var t1 = texts[1] ? parseInt(texts[1].value, 10) : NaN;
    var hitName = String(hit || name).replace(/\s*\([^)]*\)\s*$/, "").trim().toLowerCase();
    var srcName = (tr.dataset && tr.dataset.src ? tr.dataset.src : "").toLowerCase();
    [].slice.call(document.querySelectorAll("#skills-body tr")).some(function (r) {
      var rt = r.querySelectorAll('input[type="text"]');
      var nm = rt[0] ? String(rt[0].value).trim().toLowerCase() : "";
      var sc = (r.dataset && r.dataset.src ? r.dataset.src : "").toLowerCase();
      if ((hitName && (nm === hitName || sc === hitName)) || (srcName && (nm === srcName || sc === srcName))) {
        var rv = rt[1] ? parseInt(rt[1].value, 10) : NaN;
        if (!isNaN(rv)) { rank = rv; return true; }
      }
      return false;
    });
    if (isNaN(rank) && !isNaN(t1)) rank = t1;   // fall back to this row's own Rank
    info(hit || name, isNaN(rank) ? undefined : rank);
  }

  // ── add a filled / blank row to the Skills table ────────────────────────────
  function fireInput(el) {
    if (!el) return;
    try {
      var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event;
      el.dispatchEvent(new Ev("input", { bubbles: true }));
    } catch (e) {}
  }
  function newRow() {
    if (typeof addSkillRow !== "function") return null;
    addSkillRow();
    var body = document.getElementById("skills-body");
    return body ? body.lastElementChild : null;
  }
  function fillRow(tr, name, e) {
    if (!tr) return;
    var inputs = tr.querySelectorAll('input[type="text"]'); // [name, rank, checkType, notes]
    var sel = tr.querySelector("select");
    if (inputs[0]) inputs[0].value = name;
    if (e) {
      tr.dataset.src = e.name;   // remember the rulebook original so a rename still looks it up
      if (sel && e.stat) sel.value = String(e.stat).toLowerCase();
      if (inputs[2]) inputs[2].value = checkTypeOf(e);
      if (inputs[3]) inputs[3].value = e.kind === "spell" ? ((e.mana != null ? e.mana + " Mana" : "") + (e.type ? " · " + e.type : "")) : (e.group || "");
    }
    fireInput(inputs[0]);
    try { tr.scrollIntoView({ block: "nearest" }); } catch (_) {}
    var rank = inputs[1]; if (rank) { try { rank.focus(); } catch (_) {} }
  }

  // An attack skill / attack spell also belongs in the Attacks section (Core p.176:
  // write attack skills in BOTH the Attacks block and the Skills list). Add a matching
  // attack row so the To Hit / Damage math is available too.
  function isAttackEntry(e) { return !!e && (e.kind === "attack" || (e.kind === "spell" && e.type === "attack")); }
  function newAttackRow() {
    if (typeof addAttackRow !== "function") return null;
    addAttackRow();
    var body = document.getElementById("attacks-body");
    return body ? body.lastElementChild : null;
  }
  function fillAttackRow(tr, name, e) {
    if (!tr) return;
    var inputs = tr.querySelectorAll('input[type="text"]'); // [name, rank, dice, effects]
    var sel = tr.querySelector("select");
    if (inputs[0]) inputs[0].value = name;
    if (e) {
      tr.dataset.src = e.name;                                   // keep the original for lookups
      if (sel && e.stat) sel.value = String(e.stat).toLowerCase();
      if (inputs[2] && e.damage) inputs[2].value = e.damage;     // attack skills carry base dice
      if (inputs[3]) inputs[3].value = e.kind === "spell" ? ((e.mana != null ? e.mana + " Mana" : "") + (e.type ? " · " + e.type : "")) : "";
    }
    if (typeof recalcAttackRow === "function") { try { recalcAttackRow(tr); } catch (_) {} }
    fireInput(inputs[0]);
  }
  function addToSheet(name, e) {
    fillRow(newRow(), name, e);                                  // always goes on the Skills list
    if (isAttackEntry(e)) fillAttackRow(newAttackRow(), name, e); // …and the Attacks section too
    if (typeof floatHealToTop === "function") { try { floatHealToTop(); } catch (_) {} }
    // Link the new attack to its skill so Rank + damage upgrades track together.
    if (typeof window.syncLinkedAttacks === "function") { try { window.syncLinkedAttacks(); } catch (_) {} }
  }

  // ── attack rows keyed to a Skills-tab row (used by the Hotlist spell pin) ───
  function attackRowMatches(tr, keys) {
    var texts = tr.querySelectorAll('input[type="text"]');
    var nm = texts[0] ? String(texts[0].value) : "";
    var nmStripped = nm.replace(/\s*\(spell\)\s*$/i, "").trim().toLowerCase();
    var src = (tr.dataset && tr.dataset.src ? tr.dataset.src : "").toLowerCase();
    return keys.some(function (k) { k = String(k || "").toLowerCase(); return !!k && (k === src || k === nmStripped || k === nm.toLowerCase()); });
  }
  function findAttackRows(keys) {
    return [].slice.call(document.querySelectorAll("#attacks-body tr")).filter(function (tr) { return attackRowMatches(tr, keys); });
  }
  function rowKeys(tr) {
    var texts = tr.querySelectorAll('input[type="text"]');
    var name = texts[0] ? String(texts[0].value).trim() : "";
    var src = tr.dataset && tr.dataset.src ? tr.dataset.src : "";
    return [src, name].filter(Boolean);
  }

  // ── attack-skill radial (○/◉ on the Skills row toggles its Attacks row) ──────
  // An attack SKILL's radial equips/unequips its attack row instead of pinning to
  // the Hotlist; the ◉ state mirrors whether that attack row currently exists.
  function isAttackSkillRow(tr) {
    if (!tr) return false;
    var texts = tr.querySelectorAll('input[type="text"]');
    var name = texts[0] ? String(texts[0].value).trim() : "";
    var src = tr.dataset && tr.dataset.src ? tr.dataset.src : "";
    var e = lookup(src) || lookup(name);
    return !!e && e.kind === "attack";
  }
  function hasAttackRow(tr) { return findAttackRows(rowKeys(tr)).length > 0; }
  function skillRadialEl(tr) { return tr ? tr.querySelector(".hot-pin") : null; }
  function refreshSkillRadial(tr) {
    var btn = skillRadialEl(tr); if (!btn || !isAttackSkillRow(tr)) return;
    var on = hasAttackRow(tr);
    btn.classList.toggle("on", on);
    btn.textContent = on ? "◉" : "○";
    btn.title = on ? "Remove this attack from the Attacks list" : "Add this attack to the Attacks list";
    btn.setAttribute("aria-label", btn.title);
  }
  function refreshAllSkillRadials() {
    [].slice.call(document.querySelectorAll("#skills-body tr")).forEach(function (tr) { if (isAttackSkillRow(tr)) refreshSkillRadial(tr); });
  }
  function toggleAttack(tr) {
    if (!tr) return;
    var rows = findAttackRows(rowKeys(tr));
    if (rows.length) { rows.forEach(function (r) { r.remove(); }); }
    else {
      var texts = tr.querySelectorAll('input[type="text"]');
      var name = texts[0] ? String(texts[0].value).trim() : "";
      var src = tr.dataset && tr.dataset.src ? tr.dataset.src : "";
      var e = lookup(src) || lookup(name);
      if (isAttackEntry(e)) fillAttackRow(newAttackRow(), name || e.name, e);
    }
    refreshSkillRadial(tr);
    if (typeof window.syncLinkedAttacks === "function") { try { window.syncLinkedAttacks(); } catch (_) {} }
  }

  window.DCCSkills = {
    isAttackSkillRow: isAttackSkillRow,
    hasAttackRow: hasAttackRow,
    toggleAttack: toggleAttack,
    refreshSkillRadial: refreshSkillRadial,
    refreshAllSkillRadials: refreshAllSkillRadials,
    openPicker: openPicker,
    closePicker: closePicker,
    search: function (v) { query = v; renderPicker(); },
    filter: function (kind) { filterKind = kind; renderPicker(); },
    toggle: function (kind, name) { var k = kind + ":" + name; expanded[k] = !expanded[k]; renderPicker(); },
    info: info,
    closeInfo: closeInfo,
    infoRow: infoRow,
    add: function (name) { var e = lookup(name); if (e) addToSheet(e.name, e); },
    // Tap a skill → open its rename bar (pre-filled). Tapping again closes it.
    pick: function (kind, name) {
      var k = kind + ":" + name;
      adding = (adding === k) ? null : k;
      renderPicker();
      if (adding) {
        var inp = document.querySelector(".dccs-item.adding .dccs-rename");
        if (inp) { try { inp.focus(); inp.select(); } catch (e) {} inp.scrollIntoView({ block: "nearest" }); }
      }
    },
    // Add the picked skill/spell under its (possibly renamed) display name; the
    // rulebook original stays as the row's source so links + info still resolve.
    confirmAdd: function (inp) {
      if (!inp) return;
      var e = lookup(inp.dataset.name);
      if (!e) return;                                   // official/homebrew only
      var display = String(inp.value || "").trim() || e.name;
      addToSheet(display, e);
      adding = null;
      renderPicker();
    },
    // Mirror a Skills-tab spell into the Attacks section (used by the Hotlist pin).
    // Only attack skills/spells get an attack row; no-op for utility/heal or duplicates.
    addAttackForRow: function (tr) {
      if (!tr) return false;
      var texts = tr.querySelectorAll('input[type="text"]');
      var name = texts[0] ? String(texts[0].value).trim() : "";
      var src = tr.dataset && tr.dataset.src ? tr.dataset.src : "";
      var e = lookup(src) || lookup(name);
      if (!isAttackEntry(e)) return false;
      if (findAttackRows(rowKeys(tr)).length) return false;   // already present
      fillAttackRow(newAttackRow(), name || e.name, e);
      return true;
    },
    removeAttackForRow: function (tr) {
      if (!tr) return false;
      var rows = findAttackRows(rowKeys(tr));
      rows.forEach(function (r) { r.remove(); });
      return rows.length > 0;
    },
  };

  // Pull the user's saved homebrew skills & spells so the picker lists them too.
  (function () {
    function pull(type, slot) {
      try {
        fetch("/api/homebrew?type=" + type, { credentials: "same-origin" })
          .then(function (r) { return r && r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j || !Array.isArray(j.items)) return;
            window[slot] = j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; });
            var ov = document.getElementById("dccs-overlay");
            if (ov && ov.style.display === "flex") renderPicker();  // refresh if open
          })
          .catch(function () {});
      } catch (e) {}
    }
    pull("dcc-skill", "__DCC_HB_SKILLS");
    pull("dcc-spell", "__DCC_HB_SPELLS");
  })();
})();
