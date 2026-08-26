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
  function haveData() { return typeof DCC_SKILLS !== "undefined" || typeof DCC_SPELLS !== "undefined"; }

  // ── unified index of skills + spells ────────────────────────────────────────
  function entries() {
    var out = [];
    (typeof DCC_SKILLS !== "undefined" ? DCC_SKILLS : []).forEach(function (s) {
      out.push({
        kind: s.category === "attack" ? "attack" : "skill",
        name: s.name, stat: s.stat || "", passive: !!s.passive, interrupt: !!s.interrupt,
        group: s.group || "", desc: s.desc || "", upgrades: s.upgrades || [],
        damage: s.damage || "", range: s.range || "", src: s,
      });
    });
    (typeof DCC_SPELLS !== "undefined" ? DCC_SPELLS : []).forEach(function (sp) {
      out.push({
        kind: "spell", name: sp.name, stat: sp.stat || "", passive: !!sp.passive,
        mana: sp.mana, type: sp.type || "", desc: sp.desc || "", upgrades: sp.upgrades || [], src: sp,
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
      ".dccs-list{max-height:56vh;overflow:auto;padding:6px 18px 10px;}",
      ".dccs-grp{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin:12px 0 2px;}",
      ".dccs-item{display:flex;align-items:flex-start;gap:8px;border:1px solid #2a2a2e;border-radius:8px;padding:8px 10px;margin-top:8px;}",
      ".dccs-item .body{flex:1;min-width:0;cursor:pointer;}",
      ".dccs-item:hover{border-color:#b82018;}",
      ".dccs-item .nm{font-weight:700;color:#f0a8a3;font-size:13px;}",
      ".dccs-item .mt{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}",
      ".dccs-item .ef{color:#c9c9cf;font-size:12px;line-height:1.45;margin-top:4px;}",
      ".dccs-item .up{color:#9a9aa2;font-size:11px;line-height:1.4;margin-top:3px;}",
      ".dccs-i{flex:0 0 auto;width:20px;height:20px;border-radius:50%;border:1px solid #3a3a40;background:transparent;color:#8a8a93;font-size:11px;font-style:italic;cursor:pointer;}",
      ".dccs-i:hover{border-color:#b82018;color:#f0a8a3;}",
      ".dccs-foot{display:flex;gap:8px;padding:10px 18px 16px;border-top:1px solid #2a2a2e;}",
      ".dccs-foot input{flex:1;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccs-btn{border:1px solid #2a2a2e;background:#1c1516;color:#f0a8a3;border-radius:6px;padding:0 14px;font-size:12px;font-weight:700;cursor:pointer;}",
      ".dccs-btn:hover{border-color:#b82018;}",
      ".dccs-btn.plain{background:#161618;color:#c9c9cf;}",
      // info panel
      ".dccs-info .ef{color:#e6e3da;font-size:13px;line-height:1.55;margin-top:8px;}",
      ".dccs-info .uprow{margin-top:8px;font-size:12px;color:#c9c9cf;line-height:1.5;}",
      ".dccs-info .uprow b{color:#f0a8a3;}",
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
  function openPicker() {
    if (!haveData()) { alert("The skill and spell lists didn't load. Open this sheet from the app so /tools-data/dcc-skills.js and dcc-spells.js are available."); return; }
    injectCss();
    overlay("dccs-overlay");
    renderPicker();
    var s = document.getElementById("dccs-search-input");
    if (s) s.focus();
  }
  function closePicker() { var ov = document.getElementById("dccs-overlay"); if (ov) ov.style.display = "none"; query = ""; }
  function itemHtml(e) {
    return '<div class="dccs-item">' +
      '<div class="body" onclick="DCCSkills.add(\'' + attr(e.name) + '\')" title="Add to your skills">' +
        '<div class="nm">' + esc(e.name) + '</div>' +
        '<div class="mt">' + esc(metaLine(e)) + '</div>' +
      '</div>' +
      '<button class="dccs-i" title="What does it do?" onclick="DCCSkills.info(\'' + attr(e.name) + '\')">i</button>' +
    '</div>';
  }
  function renderPicker() {
    var ov = document.getElementById("dccs-overlay");
    if (!ov) return;
    var q = query.trim().toLowerCase();
    var all = entries().filter(function (e) { return !q || e.name.toLowerCase().indexOf(q) >= 0 || (e.desc && e.desc.toLowerCase().indexOf(q) >= 0) || (e.group && e.group.toLowerCase().indexOf(q) >= 0); });
    var util = all.filter(function (e) { return e.kind === "skill"; });
    var atk = all.filter(function (e) { return e.kind === "attack"; });
    var spells = all.filter(function (e) { return e.kind === "spell"; });
    var rows = "";
    if (util.length) rows += '<div class="dccs-grp">Utility Skills</div>' + util.map(itemHtml).join("");
    if (atk.length) rows += '<div class="dccs-grp">Attack Skills</div>' + atk.map(itemHtml).join("");
    if (spells.length) rows += '<div class="dccs-grp">Spells</div>' + spells.map(itemHtml).join("");
    if (!all.length) rows = '<div class="dccs-grp">No skill or spell matches “' + esc(query) + '”.</div>';
    ov.innerHTML =
      '<div class="dccs-modal" role="dialog" aria-label="Add a skill or spell">' +
        '<div class="dccs-head"><h3>Add a Skill or Spell</h3><button class="dccs-x" onclick="DCCSkills.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dccs-search"><input id="dccs-search-input" type="search" placeholder="Search skills &amp; spells…" value="' + attr(query) + '" oninput="DCCSkills.search(this.value)"></div>' +
        '<div class="dccs-list">' + rows + '</div>' +
        '<div class="dccs-foot"><input id="dccs-custom-input" type="text" placeholder="…or type a custom skill name" onkeydown="if(event.key===\'Enter\')DCCSkills.addCustom()">' +
          '<button class="dccs-btn" onclick="DCCSkills.addCustom()">Add</button>' +
          '<button class="dccs-btn plain" onclick="DCCSkills.addBlank()">Blank row</button></div>' +
      '</div>';
    var s = document.getElementById("dccs-search-input");
    if (s) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }

  // ── info panel (shared by picker and per-row (i) buttons) ───────────────────
  function upgradesHtml(e) {
    if (!e.upgrades || !e.upgrades.length) return "";
    return e.upgrades.map(function (u) { return '<div class="uprow"><b>Rank ' + esc(u.rank) + ':</b> ' + esc(u.text) + '</div>'; }).join("");
  }
  function info(name) {
    injectCss();
    var e = lookup(name);
    var ov = overlay("dccs-info-overlay");
    var inner = e
      ? '<div class="dccs-head"><h3>' + esc(e.name) + '</h3><button class="dccs-x" onclick="DCCSkills.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dccs-info-body dccs-info"><div class="mt">' + esc(metaLine(e)) + '</div><div class="ef">' + esc(e.desc || "No description on file.") + '</div>' + upgradesHtml(e) + '</div>'
      : '<div class="dccs-head"><h3>' + esc(name || "Skill") + '</h3><button class="dccs-x" onclick="DCCSkills.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div class="dccs-info-body"><div class="dccs-grp">No rulebook entry matches “' + esc(name || "") + '”. It may be a custom or renamed skill.</div></div>';
    ov.innerHTML = '<div class="dccs-modal dccs-info" role="dialog" aria-label="Skill info">' + inner + '</div>';
  }
  function closeInfo() { var ov = document.getElementById("dccs-info-overlay"); if (ov) ov.style.display = "none"; }
  function infoRow(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    if (!tr) return;
    var nameInput = tr.querySelector('input[type="text"]');
    info(nameInput ? nameInput.value : "");
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
      if (sel && e.stat) sel.value = String(e.stat).toLowerCase();
      if (inputs[2]) inputs[2].value = checkTypeOf(e);
      if (inputs[3]) inputs[3].value = e.kind === "spell" ? ((e.mana != null ? e.mana + " Mana" : "") + (e.type ? " · " + e.type : "")) : (e.group || "");
    }
    fireInput(inputs[0]);
    try { tr.scrollIntoView({ block: "nearest" }); } catch (_) {}
    var rank = inputs[1]; if (rank) { try { rank.focus(); } catch (_) {} }
  }

  window.DCCSkills = {
    openPicker: openPicker,
    closePicker: closePicker,
    search: function (v) { query = v; renderPicker(); },
    info: info,
    closeInfo: closeInfo,
    infoRow: infoRow,
    add: function (name) { var e = lookup(name); fillRow(newRow(), e ? e.name : name, e); },
    addCustom: function () {
      var inp = document.getElementById("dccs-custom-input");
      var name = inp ? String(inp.value || "").trim() : "";
      if (!name) return;
      var e = lookup(name);
      fillRow(newRow(), e ? e.name : name, e);
      if (inp) inp.value = "";
      closePicker();
    },
    addBlank: function () { newRow(); closePicker(); },
  };
})();
