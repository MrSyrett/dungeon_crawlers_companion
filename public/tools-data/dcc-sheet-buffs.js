// Dungeon Crawler Carl — Buffs tracker
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after
// /tools-data/dcc-buffs.js (the DCC_BUFFS global) and the sheet's own scripts.
//
// The buff analogue of the Debuffs tracker: a ＋ button opens a searchable list of
// the rulebook buffs (Core p.95-96) — Internal (always-on) and External (trigger-
// activated, Rule of Three) — each with its effect and duration. Picked buffs show
// as chips with an (i) reminder and a ✕. Buffs don't stack, so there are no counters.
//
// Like the Debuffs tracker it changes no data model: chips serialise into a single
// #buffs text input ("Iron Skin, Safe Fall, my custom aura") and fire an input event,
// so autosave keeps working. collectSheet() ALSO mirrors the value into the legacy
// extBuffs array so the PDF/print exports keep rendering. Unknown tokens are kept
// verbatim as dashed "custom" chips. On load, applySheet() calls DCCBuffs.refresh().

(function () {
  "use strict";

  var FIELD_ID = "buffs";
  var active = [];        // [{ name, kind, custom }]
  var lastSerialized = null;
  var infoOpen = {};

  function haveData() { return typeof DCC_BUFFS !== "undefined" && Array.isArray(DCC_BUFFS); }
  function field() { return document.getElementById(FIELD_ID); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function attr(s) { return esc(s).replace(/'/g, "&#39;"); }

  function known(name) {
    if (!haveData()) return null;
    var t = String(name).trim().toLowerCase();
    return DCC_BUFFS.find(function (b) { return b.name.toLowerCase() === t; }) || null;
  }

  // ── parse / serialise round-trip through the #buffs text field ──────────────
  function parse(text) {
    var out = [];
    String(text || "").split(",").forEach(function (tok) {
      var name = tok.trim();
      if (!name) return;
      var k = known(name);
      if (k) {
        if (!out.some(function (a) { return !a.custom && a.name === k.name; })) out.push({ name: k.name, kind: k.kind, custom: false });
      } else {
        out.push({ name: name, kind: "", custom: true });
      }
    });
    return out;
  }
  function serialize() { return active.map(function (a) { return a.name; }).join(", "); }
  function writeBack() {
    var el = field();
    if (!el) return;
    var s = serialize();
    lastSerialized = s;
    if (el.value !== s) {
      el.value = s;
      try {
        var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event;
        el.dispatchEvent(new Ev("input", { bubbles: true }));
      } catch (e) {}
    }
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("dccb-css")) return;
    var st = document.createElement("style");
    st.id = "dccb-css";
    st.textContent = [
      ".dccb-add{border:1px solid var(--rule,#b9b0a0);background:transparent;color:var(--muted,#7a7266);border-radius:5px;width:24px;height:24px;cursor:pointer;font-size:14px;line-height:1;flex:0 0 auto;}",
      ".dccb-add:hover{border-color:#2f7d55;color:#2f7d55;}",
      ".dccb-chips{display:flex;flex-wrap:wrap;gap:5px;margin:4px 0 2px;}",
      ".dccb-chip{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--rule,#b9b0a0);border-radius:20px;padding:2px 4px 2px 9px;font-family:'Barlow',sans-serif;font-size:11px;color:var(--ink,#26211a);background:var(--box,#f3efe6);}",
      ".dccb-chip.ext{border-color:#3a7d5c;}",
      ".dccb-chip.custom{border-style:dashed;}",
      ".dccb-chip .ico{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;border:1px solid var(--rule,#b9b0a0);color:var(--muted,#7a7266);font-size:9px;font-style:italic;cursor:pointer;}",
      ".dccb-chip .ico:hover{border-color:#2f7d55;color:#2f7d55;}",
      ".dccb-chip .rm{border:none;background:transparent;color:var(--muted,#7a7266);cursor:pointer;font-size:12px;line-height:1;}",
      ".dccb-chip .rm:hover{color:#b82018;}",
      ".dccb-none{font-family:'Barlow',sans-serif;font-size:11px;color:var(--muted,#7a7266);font-style:italic;}",
      ".dccb-warn{font-family:'Barlow',sans-serif;font-size:11px;color:#c8892a;flex-basis:100%;}",
      ".dccb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:32px 12px;overflow:auto;}",
      ".dccb-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:560px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:'Barlow',sans-serif;}",
      ".dccb-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;border-bottom:1px solid #2a2a2e;}",
      ".dccb-head h3{margin:0;font-size:15px;text-transform:uppercase;letter-spacing:.03em;color:#fff;}",
      ".dccb-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:28px;height:28px;cursor:pointer;}",
      ".dccb-x:hover{border-color:#2f7d55;color:#8fd7ac;}",
      ".dccb-search{margin:12px 18px 4px;}",
      ".dccb-search input{width:100%;background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;}",
      ".dccb-search input:focus{outline:none;border-color:#2f7d55;}",
      ".dccb-list{max-height:52vh;overflow:auto;padding:6px 18px 16px;}",
      ".dccb-grp{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin:12px 0 2px;}",
      ".dccb-item{border:1px solid #2a2a2e;border-radius:8px;padding:9px 11px;margin-top:8px;cursor:pointer;}",
      ".dccb-item:hover{border-color:#2f7d55;}",
      ".dccb-item.on{border-color:#2f7d55;background:#141c17;}",
      ".dccb-item .nm{font-weight:700;color:#8fd7ac;font-size:13px;}",
      ".dccb-item .bd{color:#8a8a93;font-size:10px;text-transform:uppercase;letter-spacing:.06em;margin-left:6px;}",
      ".dccb-item .ef{color:#c9c9cf;font-size:12px;line-height:1.45;margin-top:3px;}",
      ".dccb-item .du{color:#8a8a93;font-size:11px;margin-top:3px;}",
    ].join("\n");
    document.head.appendChild(st);
  }

  // ── chips render ──────────────────────────────────────────────────────────────
  function chipsEl() { return document.getElementById("dccb-chips"); }
  function extCount() { return active.filter(function (a) { return !a.custom && a.kind === "external"; }).length; }
  function renderChips() {
    var box = chipsEl();
    if (!box) return;
    if (!active.length) { box.innerHTML = '<span class="dccb-none">No active buffs.</span>'; return; }
    var html = active.map(function (a, i) {
      var k = a.custom ? null : known(a.name);
      var info = (k ? '<span class="ico" title="What does it do?" onclick="DCCBuffs.info(' + i + ')">i</span>' : "");
      var detail = (infoOpen[i] && k)
        ? '<span class="dccb-none" style="flex-basis:100%;font-style:normal;color:var(--ink,#26211a);">' + esc(k.effect) + (k.duration ? ' <em style="color:var(--muted,#7a7266);">(' + esc(k.duration) + ')</em>' : "") + '</span>'
        : "";
      return '<span class="dccb-chip ' + (a.custom ? "custom" : a.kind === "external" ? "ext" : "") + '">' +
        esc(a.name) + info +
        '<button class="rm" title="Remove" onclick="DCCBuffs.remove(' + i + ')">✕</button></span>' + detail;
    }).join("");
    // Rule of Three: at most 3 External Buffs active at once (Core p.96).
    var ext = extCount();
    if (ext > 3) html += '<span class="dccb-warn">⚠ ' + ext + ' External Buffs active — the Rule of Three allows only 3 at once.</span>';
    box.innerHTML = html;
  }

  // ── picker modal ──────────────────────────────────────────────────────────────
  var query = "";
  function openPicker() {
    if (!haveData()) { alert("The buff list didn't load. Open this sheet from the app so /tools-data/dcc-buffs.js is available."); return; }
    injectCss();
    var ov = document.getElementById("dccb-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "dccb-overlay";
      ov.className = "dccb-overlay";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) closePicker(); });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    renderPicker();
  }
  function closePicker() { var ov = document.getElementById("dccb-overlay"); if (ov) ov.style.display = "none"; query = ""; }
  function itemHtml(b) {
    var on = active.some(function (a) { return !a.custom && a.name === b.name; });
    return '<div class="dccb-item ' + (on ? "on" : "") + '" onclick="DCCBuffs.pick(\'' + attr(b.name) + '\')">' +
      '<div><span class="nm">' + esc(b.name) + (on ? " ✓" : "") + '</span>' +
      '<span class="bd">' + (b.kind === "external" ? "External" : "Internal") + '</span></div>' +
      '<div class="ef">' + esc(b.effect) + '</div>' +
      (b.duration ? '<div class="du">' + esc(b.duration) + '</div>' : "") + '</div>';
  }
  function renderPicker() {
    var ov = document.getElementById("dccb-overlay");
    if (!ov) return;
    var q = query.trim().toLowerCase();
    var list = DCC_BUFFS.filter(function (b) { return !q || b.name.toLowerCase().indexOf(q) >= 0 || b.effect.toLowerCase().indexOf(q) >= 0; });
    var internal = list.filter(function (b) { return b.kind !== "external"; });
    var external = list.filter(function (b) { return b.kind === "external"; });
    var rows = "";
    if (internal.length) rows += '<div class="dccb-grp">Internal — always-on</div>' + internal.map(itemHtml).join("");
    if (external.length) rows += '<div class="dccb-grp">External — trigger-activated (Rule of Three)</div>' + external.map(itemHtml).join("");
    if (!list.length) rows = '<div class="dccb-none" style="color:#8a8a93;padding:10px 0;">No buff matches “' + esc(query) + '”.</div>';
    ov.innerHTML =
      '<div class="dccb-modal" role="dialog" aria-label="Add buff">' +
        '<div class="dccb-head"><h3>Add a Buff</h3><button class="dccb-x" onclick="DCCBuffs.closePicker()" aria-label="Close">✕</button></div>' +
        '<div class="dccb-search"><input id="dccb-search-input" type="search" placeholder="Search buffs…" value="' + attr(query) + '" oninput="DCCBuffs.search(this.value)"></div>' +
        '<div class="dccb-list">' + rows + '</div>' +
      '</div>';
    var s = document.getElementById("dccb-search-input");
    if (s) { s.focus(); try { s.setSelectionRange(s.value.length, s.value.length); } catch (e) {} }
  }

  // ── mount ─────────────────────────────────────────────────────────────────────
  function mount() {
    var el = field();
    if (!el || el.dataset.dccbMounted) return;
    injectCss();
    el.dataset.dccbMounted = "1";
    var add = document.createElement("button");
    add.type = "button";
    add.className = "dccb-add";
    add.textContent = "＋";
    add.title = "Add a buff from the rulebook";
    add.setAttribute("aria-label", add.title);
    add.addEventListener("click", openPicker);
    el.parentNode.appendChild(add);
    var chips = document.createElement("div");
    chips.id = "dccb-chips";
    chips.className = "dccb-chips";
    var host = el.closest(".buffs-field") || el.parentNode;
    host.parentNode.insertBefore(chips, host.nextSibling);
    el.addEventListener("change", function () { refresh(); });
    refresh();
  }

  function refresh() {
    var el = field();
    if (!el) return;
    if (el.value === lastSerialized && active.length) { renderChips(); return; }
    active = parse(el.value);
    infoOpen = {};
    lastSerialized = serialize();
    if (el.value !== lastSerialized) { el.value = lastSerialized; }
    renderChips();
  }

  // ── public API ────────────────────────────────────────────────────────────────
  window.DCCBuffs = {
    mount: mount,
    refresh: refresh,
    openPicker: openPicker,
    closePicker: closePicker,
    search: function (v) { query = v; renderPicker(); },
    pick: function (name) {
      var k = known(name);
      if (!k) return;
      if (!active.some(function (a) { return !a.custom && a.name === k.name; })) active.push({ name: k.name, kind: k.kind, custom: false });
      writeBack(); renderChips(); renderPicker();
    },
    remove: function (i) { active.splice(i, 1); infoOpen = {}; writeBack(); renderChips(); },
    info: function (i) { infoOpen[i] = !infoOpen[i]; renderChips(); },
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
