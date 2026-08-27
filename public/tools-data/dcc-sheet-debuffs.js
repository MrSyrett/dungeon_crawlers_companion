// Dungeon Crawler Carl — Debuffs / Conditions tracker
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after
// /tools-data/dcc-debuffs.js (the DCC_DEBUFFS global) and the sheet's own scripts.
//
// Upgrades the single free-text "Debuffs" field into a picker + chips tracker:
//   • ＋ button opens a searchable list of the 27 rulebook debuffs (Core p.97),
//     each with its effect, duration and whether it stacks.
//   • Active conditions show as chips with stack counters, an (i) reminder, and ✕.
//   • The chips are the source of truth for KNOWN debuffs; anything unrecognised in
//     the field is kept verbatim as a "custom" chip.
//
// It never changes the sheet's data model: the tracker serialises back into the same
// #debuffs input ("Burned, Blood Trail ×2, my custom note") and fires an input event,
// so autosave, export and collectSheet()/applySheet() keep working unchanged. On load
// (applySheet) the sheet calls window.DCCDebuffs.refresh() to re-parse the field.

(function () {
  "use strict";

  var FIELD_ID = "debuffs";
  var active = [];        // [{ name, count, custom }]
  var lastSerialized = null;

  function haveData() { return typeof DCC_DEBUFFS !== "undefined" && Array.isArray(DCC_DEBUFFS); }
  function field() { return document.getElementById(FIELD_ID); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function attr(s) { return esc(s).replace(/'/g, "&#39;"); }

  function known(name) {
    if (!haveData()) return null;
    var t = String(name).trim().toLowerCase();
    return DCC_DEBUFFS.find(function (d) { return d.name.toLowerCase() === t; }) || null;
  }

  // ── parse / serialise round-trip through the #debuffs text field ─────────────
  function parse(text) {
    var out = [];
    String(text || "").split(",").forEach(function (tok) {
      var raw = tok.trim();
      if (!raw) return;
      var m = raw.match(/^(.*?)(?:\s*[x×]\s*(\d+))?$/i);
      var name = (m ? m[1] : raw).trim();
      var count = m && m[2] ? Math.max(1, parseInt(m[2], 10)) : 1;
      if (!name) return;
      var k = known(name);
      if (k) {
        var existing = out.find(function (a) { return !a.custom && a.name === k.name; });
        if (existing) { existing.count += count; }
        else { out.push({ name: k.name, count: k.stackable ? count : 1, custom: false }); }
      } else {
        out.push({ name: raw, count: 1, custom: true }); // keep the token verbatim
      }
    });
    return out;
  }
  function serialize() {
    return active.map(function (a) {
      if (a.custom) return a.name;
      return a.count > 1 ? a.name + " ×" + a.count : a.name;
    }).join(", ");
  }
  function writeBack() {
    var el = field();
    if (!el) return;
    var s = serialize();
    lastSerialized = s;
    if (el.value !== s) {
      el.value = s;
      try {
        var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event;
        el.dispatchEvent(new Ev("input", { bubbles: true })); // trigger the sheet's autosave
      } catch (e) {}
    }
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("dccd-css")) return;
    var st = document.createElement("style");
    st.id = "dccd-css";
    st.textContent = [
      ".dccd-add{border:1px solid var(--rule,#b9b0a0);background:transparent;color:var(--muted,#7a7266);border-radius:5px;width:24px;height:24px;cursor:pointer;font-size:14px;line-height:1;flex:0 0 auto;}",
      ".dccd-add:hover{border-color:#b82018;color:#b82018;}",
      ".dccd-chips{display:flex;flex-wrap:wrap;gap:5px;margin:4px 0 2px;}",
      ".dccd-chip{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--rule,#b9b0a0);border-radius:20px;padding:2px 4px 2px 9px;font-family:'Barlow',sans-serif;font-size:11px;color:var(--ink,#26211a);background:var(--box,#f3efe6);}",
      ".dccd-chip.custom{border-style:dashed;}",
      ".dccd-chip .cnt{display:inline-flex;align-items:center;gap:2px;}",
      ".dccd-chip .stp{border:none;background:transparent;color:var(--muted,#7a7266);cursor:pointer;font-size:12px;line-height:1;padding:0 2px;}",
      ".dccd-chip .stp:hover{color:#b82018;}",
      ".dccd-chip .ico{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;border:1px solid var(--rule,#b9b0a0);color:var(--muted,#7a7266);font-size:9px;font-style:italic;cursor:pointer;}",
      ".dccd-chip .ico:hover{border-color:#b82018;color:#b82018;}",
      ".dccd-chip .rm{border:none;background:transparent;color:var(--muted,#7a7266);cursor:pointer;font-size:12px;line-height:1;}",
      ".dccd-chip .rm:hover{color:#b82018;}",
      ".dccd-none{font-family:'Barlow',sans-serif;font-size:11px;color:var(--muted,#7a7266);font-style:italic;}",
      ".dccd-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:32px 12px;overflow:auto;}",
      ".dccd-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:560px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:'Barlow',sans-serif;}",
      ".dccd-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;border-bottom:1px solid #2a2a2e;}",
      ".dccd-head h3{margin:0;font-size:15px;text-transform:uppercase;letter-spacing:.03em;color:#fff;}",
      ".dccd-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:28px;height:28px;cursor:pointer;}",
      ".dccd-x:hover{border-color:#b82018;color:#f0a8a3;}",
      ".dccd-search{margin:12px 18px 4px;}",
      ".dccd-search input{width:100%;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccd-search input:focus{outline:none;border-color:#b82018;}",
      ".dccd-list{max-height:52vh;overflow:auto;padding:6px 18px 16px;}",
      ".dccd-item{border:1px solid #2a2a2e;border-radius:8px;padding:9px 11px;margin-top:8px;cursor:pointer;}",
      ".dccd-item:hover{border-color:#b82018;}",
      ".dccd-item.on{border-color:#b82018;background:#1c1516;}",
      ".dccd-item .nm{font-weight:700;color:#f0a8a3;font-size:13px;}",
      ".dccd-item .bd{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.06em;margin-left:6px;}",
      ".dccd-item .ef{color:#c9c9cf;font-size:12px;line-height:1.45;margin-top:3px;}",
      ".dccd-item .du{color:#8a8a93;font-size:11px;margin-top:3px;}",
      ".dccd-custom{display:flex;gap:8px;padding:10px 18px 16px;border-top:1px solid #2a2a2e;}",
      ".dccd-custom input{flex:1;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccd-custom input:focus{outline:none;border-color:#b82018;}",
      ".dccd-btn{border:1px solid #2a2a2e;background:#1c1516;color:#f0a8a3;border-radius:6px;padding:0 14px;font-size:12px;font-weight:700;cursor:pointer;}",
      ".dccd-btn:hover{border-color:#b82018;}",
    ].join("\n");
    document.head.appendChild(st);
  }

  // ── chips render ──────────────────────────────────────────────────────────────
  function chipsEl() { return document.getElementById("dccd-chips"); }
  function renderChips() {
    var box = chipsEl();
    if (!box) return;
    if (!active.length) { box.innerHTML = '<span class="dccd-none">No active debuffs.</span>'; return; }
    box.innerHTML = active.map(function (a, i) {
      var k = a.custom ? null : known(a.name);
      var stackable = k && k.stackable;
      var counter = stackable
        ? '<span class="cnt"><button class="stp" title="One less" onclick="DCCDebuffs.dec(' + i + ')">−</button>×' + a.count + '<button class="stp" title="One more" onclick="DCCDebuffs.inc(' + i + ')">+</button></span>'
        : "";
      var info = (k ? '<span class="ico" title="What does it do?" onclick="DCCDebuffs.info(' + i + ')">i</span>' : "");
      return '<span class="dccd-chip ' + (a.custom ? "custom" : "") + '">' +
        esc(a.name) + counter + info +
        '<button class="rm" title="Remove" onclick="DCCDebuffs.remove(' + i + ')">✕</button></span>';
    }).join("");
  }

  // ── picker modal ──────────────────────────────────────────────────────────────
  var query = "";
  function openPicker() {
    if (!haveData()) { alert("The debuff list didn't load. Open this sheet from the app so /tools-data/dcc-debuffs.js is available."); return; }
    injectCss();
    var ov = document.getElementById("dccd-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "dccd-overlay";
      ov.className = "dccd-overlay";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) closePicker(); });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    renderPicker();
    var s = document.getElementById("dccd-search-input");
    if (s) s.focus();
  }
  function closePicker() { var ov = document.getElementById("dccd-overlay"); if (ov) ov.style.display = "none"; query = ""; }
  function renderPicker() {
    var ov = document.getElementById("dccd-overlay");
    if (!ov) return;
    var q = query.trim().toLowerCase();
    var list = DCC_DEBUFFS.filter(function (d) {
      return !q || d.name.toLowerCase().indexOf(q) >= 0 || d.effect.toLowerCase().indexOf(q) >= 0;
    });
    var rows = list.map(function (d) {
      var on = active.some(function (a) { return !a.custom && a.name === d.name; });
      return '<div class="dccd-item ' + (on ? "on" : "") + '" onclick="DCCDebuffs.pick(\'' + attr(d.name) + '\')">' +
        '<div><span class="nm">' + esc(d.name) + (on ? " ✓" : "") + '</span>' +
        '<span class="bd">' + (d.stackable ? "Stacks" : "Single") + '</span></div>' +
        '<div class="ef">' + esc(d.effect) + '</div>' +
        '<div class="du">' + esc(d.duration) + '</div></div>';
    }).join("") || '<div class="dccd-none" style="color:#8a8a93;padding:10px 0;">No debuff matches “' + esc(query) + '”.</div>';
    ov.innerHTML =
      '<div class="dccd-modal" role="dialog" aria-label="Add debuff">' +
        '<div class="dccd-head"><h3>Add a Debuff</h3><button class="dccd-x" onclick="DCCDebuffs.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dccd-search"><input id="dccd-search-input" type="search" placeholder="Search debuffs…" value="' + attr(query) + '" oninput="DCCDebuffs.search(this.value)"></div>' +
        '<div class="dccd-list">' + rows + '</div>' +
        '<div class="dccd-custom"><input id="dccd-custom-input" type="text" placeholder="Add a custom debuff…" onkeydown="if(event.key===\'Enter\')DCCDebuffs.addCustom()"><button class="dccd-btn" onclick="DCCDebuffs.addCustom()">Add</button></div>' +
      '</div>';
    var s = document.getElementById("dccd-search-input");
    if (s) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }

  // ── mount ─────────────────────────────────────────────────────────────────────
  function mount() {
    var el = field();
    if (!el || el.dataset.dccdMounted) return;
    injectCss();
    el.dataset.dccdMounted = "1";
    el.style.display = "none";       // badges-only: the chips are the display; the field just stores
    // ＋ button, next to the field inside the debuff group
    var add = document.createElement("button");
    add.type = "button";
    add.className = "dccd-add";
    add.textContent = "＋";
    add.title = "Add a debuff from the rulebook";
    add.setAttribute("aria-label", add.title);
    add.addEventListener("click", openPicker);
    el.parentNode.appendChild(add);
    // chips sit inline, to the RIGHT of the ＋ button (they wrap; info drops below)
    var chips = document.createElement("div");
    chips.id = "dccd-chips";
    chips.className = "dccd-chips";
    chips.style.flex = "1";
    chips.style.minWidth = "0";
    chips.style.margin = "0";
    el.parentNode.appendChild(chips);
    // re-parse if the player edits the raw field by hand
    el.addEventListener("change", function () { refresh(); });
    refresh();
  }

  // Re-sync chips from the field (called on mount, after applySheet, and on manual edits).
  function refresh() {
    var el = field();
    if (!el) return;
    if (el.value === lastSerialized && active.length) { renderChips(); return; }
    active = parse(el.value);
    lastSerialized = serialize();
    // normalise the field to the canonical form so ×N counts read cleanly
    if (el.value !== lastSerialized) { el.value = lastSerialized; }
    renderChips();
  }

  // ── info popup (matches the skill/spell info button) ────────────────────────
  function closeInfo() { var ov = document.getElementById("dccd-info-overlay"); if (ov) ov.style.display = "none"; }
  function showInfo(i) {
    var a = active[i]; if (!a) return;
    var k = known(a.name); if (!k) return;
    injectCss();
    var ov = document.getElementById("dccd-info-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "dccd-info-overlay";
      ov.className = "dccd-overlay";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) closeInfo(); });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    ov.innerHTML =
      '<div class="dccd-modal" role="dialog" aria-label="Debuff info">' +
        '<div class="dccd-head"><h3>' + esc(k.name) + '</h3><button class="dccd-x" onclick="DCCDebuffs.closeInfo()" aria-label="Close">✕</button></div>' +
        '<div style="padding:16px 18px 18px;"><div style="color:#e6e3da;font-size:13px;line-height:1.55;">' + esc(k.effect) + '</div>' +
          '<div style="color:#8a8a93;font-size:11px;margin-top:8px;">' + esc(k.duration) + (k.stackable ? " · Stacks" : "") + '</div></div>' +
      '</div>';
  }

  // ── public API ────────────────────────────────────────────────────────────────
  window.DCCDebuffs = {
    mount: mount,
    refresh: refresh,
    openPicker: openPicker,
    closePicker: closePicker,
    search: function (v) { query = v; renderPicker(); },
    pick: function (name) {
      var k = known(name);
      if (!k) return;
      var existing = active.find(function (a) { return !a.custom && a.name === k.name; });
      if (existing) { if (k.stackable) existing.count += 1; }
      else { active.push({ name: k.name, count: 1, custom: false }); }
      writeBack(); renderChips(); renderPicker();
    },
    addCustom: function () {
      var inp = document.getElementById("dccd-custom-input");
      if (!inp) return;
      var name = String(inp.value || "").trim();
      if (!name) return;
      if (known(name)) { this.pick(known(name).name); inp.value = ""; return; }
      if (!active.some(function (a) { return a.name.toLowerCase() === name.toLowerCase(); })) active.push({ name: name, count: 1, custom: true });
      inp.value = "";
      writeBack(); renderChips(); renderPicker();
    },
    remove: function (i) { active.splice(i, 1); writeBack(); renderChips(); },
    inc: function (i) { if (active[i]) { active[i].count += 1; writeBack(); renderChips(); } },
    dec: function (i) { if (active[i]) { active[i].count -= 1; if (active[i].count <= 0) active.splice(i, 1); writeBack(); renderChips(); } },
    info: showInfo,
    closeInfo: closeInfo,
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
