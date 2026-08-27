// Dungeon Crawler Carl — Hotlist pins
// Loaded by tools/templates/dcc_character_sheet.html as <script src>.
//
// The Hotlist is 10 quick-access slots (the cards under the Attacks block). This lets
// you pin a Spell (from the Skills tab) or an Item (from the Inventory tab) into the
// Hotlist — and unpin it — with the radial-dot control (on / off) just left of the name.
//
// A pinned slot carries the entry's Name, its Quantity (items only) and Notes, e.g.
// "Healing Potion ×3 — heals 10" or "Fire Fingers — 2 Mana · attack". Membership is
// tracked by the NAME portion only, so a slot still matches its row after the qty or
// notes change, and a wizard-added entry like "Heal — 2 Mana…" ties back to the Heal
// skill. Slots stay hand-editable and the data model is unchanged (10 strings).
//
// A skill row only shows the pin when it's a Spell; inventory rows always show it.

(function () {
  "use strict";

  function norm(s) { return String(s == null ? "" : s).trim(); }
  function slots() { return [].slice.call(document.querySelectorAll("#hotlist-grid textarea")); }
  function fire(el) {
    if (!el) return;
    try { var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event; el.dispatchEvent(new Ev("input", { bubbles: true })); } catch (e) {}
  }
  // The name portion of a slot: everything before the first " ×qty" or " — notes".
  function nameOfSlot(v) { v = norm(v); var i = v.search(/\s×|\s—/); return norm(i >= 0 ? v.slice(0, i) : v); }
  function isPinned(name) {
    name = norm(name); if (!name) return false;
    var lc = name.toLowerCase();
    return slots().some(function (t) { return nameOfSlot(t.value).toLowerCase() === lc; });
  }
  function addText(text) {
    text = norm(text); if (!text) return false;
    if (isPinned(nameOfSlot(text))) return false;
    var empty = slots().filter(function (t) { return !norm(t.value); })[0];
    if (!empty) return false;      // hotlist full
    empty.value = text; fire(empty); return true;
  }
  function remove(name) {
    name = norm(name); var lc = name.toLowerCase(), any = false;
    slots().forEach(function (t) { if (nameOfSlot(t.value).toLowerCase() === lc) { t.value = ""; fire(t); any = true; } });
    return any;
  }

  function rowNameOf(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    var inp = tr ? tr.querySelector('input[type="text"]') : null;
    return inp ? inp.value : "";
  }
  // Composite pinned text: Name (+ " ×qty" for items) (+ " — notes").
  function pinnedText(tr) {
    var inInv = tr.closest && tr.closest("#inv-body");
    var texts = tr.querySelectorAll('input[type="text"]');
    var name = norm(texts[0] ? texts[0].value : "");
    if (!name) return "";
    var qty = inInv ? norm(texts[1] ? texts[1].value : "") : "";
    var notes = inInv ? norm(texts[2] ? texts[2].value : "") : norm(texts[3] ? texts[3].value : "");
    var s = name;
    if (qty) s += " ×" + qty;
    if (notes) s += " — " + notes;
    return s;
  }

  // A skill row qualifies for a Hotlist pin only if it's a spell.
  function skillRowIsSpell(tr) {
    var texts = tr.querySelectorAll('input[type="text"]'); // [name, rank, checkType, notes]
    var checkType = texts[2] ? texts[2].value : "";
    var notes = texts[3] ? texts[3].value : "";
    if (/spell/i.test(checkType) || /\bmana\b/i.test(notes)) return true;
    var src = tr.dataset && tr.dataset.src ? tr.dataset.src : "";
    if (src && typeof DCC_SPELLS !== "undefined") {
      var lc = String(src).toLowerCase();
      return DCC_SPELLS.some(function (s) { return s.name.toLowerCase() === lc; });
    }
    return false;
  }
  function refreshRow(btn) {
    if (!btn || !btn.closest) return;
    var tr = btn.closest("tr");
    var inInv = tr.closest && tr.closest("#inv-body");
    var name = norm(rowNameOf(btn));
    // Hide the pin on blank rows, and on non-spell skill rows.
    if (!name || (!inInv && !skillRowIsSpell(tr))) { btn.style.visibility = "hidden"; btn.classList.remove("on"); return; }
    btn.style.visibility = "visible";
    var on = isPinned(name);
    btn.classList.toggle("on", on);
    btn.textContent = on ? "◉" : "○";   // ◉ pinned / ○ not
    btn.title = on ? "Remove from Hotlist" : (inInv ? "Add item to Hotlist" : "Add spell to Hotlist");
  }
  function refreshAll() { [].slice.call(document.querySelectorAll(".hot-pin")).forEach(refreshRow); }

  function toggleRow(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    if (!tr) return;
    var name = norm(rowNameOf(btn));
    if (!name) return;
    if (isPinned(name)) remove(name);
    else if (!addText(pinnedText(tr))) { try { alert("The Hotlist is full (10 slots). Clear one to add another."); } catch (e) {} }
    refreshAll();
  }

  // Keep pins in sync when names, notes, or the hotlist cards themselves change.
  function wire() {
    ["skills-body", "inv-body", "hotlist-grid"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.dataset.hotWired) { el.dataset.hotWired = "1"; el.addEventListener("input", refreshAll); }
    });
    refreshAll();
  }

  window.DCCHotlist = { toggleRow: toggleRow, refresh: wire, refreshRow: refreshRow, isPinned: isPinned };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
})();
