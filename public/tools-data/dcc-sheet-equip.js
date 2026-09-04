// Dungeon Crawler Carl — Equip Armor & Accessories from the Inventory radial
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after the
// item catalog (DCC_ITEMS) and the sheet's own scripts, alongside the Hotlist.
//
// The radial (○) on an Inventory row normally toggles the Hotlist. For rows whose
// item is ARMOR or an ACCESSORY, it instead EQUIPS the item — dropping its name
// into the matching Gear slot (or the Accessories list) and applying its bonuses
// (Damage Resistance and Stat bonuses parsed from the effect text). Clicking again
// UN-equips: the slot is cleared and the bonuses are reversed. All other item
// types (consumables, weapons, tools…) keep the Hotlist behaviour.
//
// The exact bonus deltas an equip applied are recorded on the row so an un-equip
// reverses precisely, and are saved with the sheet so the ● state and reversibility
// survive a reload (the Gear/DR/Stat fields are saved with the bonuses already in,
// so equipping is NOT re-run on load).

(function () {
  "use strict";

  var GEAR_LABELS = ["Head", "Torso", "Arms", "Hands / Holding", "Legs", "Feet"];
  var STAT_ID = {
    strength: "str", str: "str", intelligence: "int", int: "int", constitution: "con",
    con: "con", dexterity: "dex", dex: "dex", charisma: "cha", cha: "cha",
  };

  function norm(s) { return String(s == null ? "" : s).trim(); }
  function num(v) { var n = parseInt(String(v == null ? "" : v).replace(/[^0-9-]/g, ""), 10); return isNaN(n) ? 0 : n; }
  function fire(el) {
    if (!el) return;
    try { var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event; el.dispatchEvent(new Ev("input", { bubbles: true })); } catch (e) {}
  }

  function lookup(name) {
    var t = norm(name).toLowerCase();
    if (!t || typeof DCC_ITEMS === "undefined") return null;
    var strip = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ""); };
    return DCC_ITEMS.find(function (x) { return x.name.toLowerCase() === t; }) ||
      DCC_ITEMS.find(function (x) { return strip(x.name) === strip(t); }) || null;
  }
  function skillLookup(name) {
    if (typeof DCC_SKILLS === "undefined") return null;
    var t = norm(name).toLowerCase();
    if (!t) return null;
    var strip = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ""); };
    return DCC_SKILLS.find(function (x) { return x.name.toLowerCase() === t; }) ||
      DCC_SKILLS.find(function (x) { return strip(x.name) === strip(t); }) || null;
  }
  function rowName(tr) { var i = tr.querySelector('input[type="text"]'); return i ? i.value : ""; }
  // Category/slot/effect come from the row's stamped dataset (set when added from the
  // picker) or a catalog lookup by name (covers loot + hand-typed catalog items).
  function rowMeta(tr) {
    var cat = tr.dataset.cat, slot = tr.dataset.slot, effect = tr.dataset.effect;
    if (cat == null || cat === "") { var it = lookup(rowName(tr)); if (it) { cat = it.category; slot = it.slot || ""; effect = it.effect || ""; } }
    return { cat: cat || "", slot: slot || "", effect: effect || "" };
  }
  // Does an effect/name carry a bonus the sheet can actually apply on equip
  // (Damage Resistance, a Stat bonus, or a named Skill rank)? Mirrors the regexes
  // in parseBonuses so weapons/mundane items only count as equippable when they'd
  // do something — an enchanted "+3 STR" baseball bat equips; a plain club doesn't.
  function hasBonus(effect, name) {
    var e = norm(effect) + " " + norm(name);
    if (/\+(\d+)\s*(?:DR\b|Damage Resistance)/i.test(e)) return true;
    if (/\+(\d+)\s*(strength|intelligence|constitution|dexterity|charisma|str|int|con|dex|cha)\b/i.test(e)) return true;
    if (/\+(\d+)\s*(?:to\s+)?(?:a\s+)?(?:chosen\s+)?stat\b/i.test(e)) return true;
    if (/\+(\d+)\s+[A-Za-z][A-Za-z'/\- ]*?\s+skills?\b/i.test(e)) return true;
    return false;
  }
  function isEquipType(tr) {
    var m = rowMeta(tr);
    if (m.cat === "armor" || m.cat === "accessory") return true;
    // Weapons equip into the Hands / Holding slot (any bonus in the effect still applies).
    if (m.cat === "weapon") return true;
    // Other mundane items are equippable only when they carry a real bonus.
    if (m.cat === "mundane") return hasBonus(m.effect, rowName(tr));
    return false;
  }

  // ── gear slots ───────────────────────────────────────────────────────────────
  function normSlotLabel(s) {
    s = norm(s);
    if (/^hand/i.test(s) || /holding/i.test(s)) return "Hands / Holding";
    var hit = GEAR_LABELS.find(function (l) { return l.toLowerCase() === s.toLowerCase(); });
    return hit || "";
  }
  function gearInput(label) {
    var slots = document.querySelectorAll(".gear-slot");
    for (var i = 0; i < slots.length; i++) {
      var lab = slots[i].querySelector("label");
      if (lab && norm(lab.textContent).toLowerCase() === label.toLowerCase()) return slots[i].querySelector("input");
    }
    return null;
  }
  function accInputs() { return [].slice.call(document.querySelectorAll(".gear-acc-row input")); }

  // Add/remove one name in a possibly-shared text field (gear slot), comma-joined.
  function addName(el, name) {
    if (!el) return;
    var cur = norm(el.value);
    el.value = cur ? cur + ", " + name : name;
    fire(el);
  }
  function removeName(el, name) {
    if (!el) return;
    var parts = norm(el.value).split(",").map(norm).filter(Boolean);
    var lc = name.toLowerCase();
    el.value = parts.filter(function (p) { return p.toLowerCase() !== lc; }).join(", ");
    fire(el);
  }

  // ── bonus parsing ──────────────────────────────────────────────────────────
  function parseBonuses(effect, name) {
    var e = norm(effect) + " " + norm(name); // the name often carries "(+1 DR)"
    var out = { dr: 0, stats: {}, skills: [] };
    var dr = e.match(/\+(\d+)\s*(?:DR\b|Damage Resistance)/i);
    if (dr) out.dr += parseInt(dr[1], 10);
    var re = /\+(\d+)\s*(strength|intelligence|constitution|dexterity|charisma|str|int|con|dex|cha)\b/gi, m;
    while ((m = re.exec(e))) { var id = STAT_ID[m[2].toLowerCase()]; if (id) out.stats[id] = (out.stats[id] || 0) + parseInt(m[1], 10); }
    // "+N to a chosen Stat" — ask which one (rings of +N to a Stat).
    var chosen = e.match(/\+(\d+)\s*(?:to\s+)?(?:a\s+)?(?:chosen\s+)?stat\b/i);
    if (chosen && !Object.keys(out.stats).length) {
      var pick = "";
      try { pick = window.prompt("This grants +" + chosen[1] + " to a Stat. Which one? (STR / INT / CON / DEX / CHA)", ""); } catch (e2) {}
      var id2 = pick ? STAT_ID[norm(pick).toLowerCase()] : "";
      if (id2) out.stats[id2] = (out.stats[id2] || 0) + parseInt(chosen[1], 10);
    }
    // Skill bonuses: "+N <Skill> Skill(s)". Apply a concrete, named skill only —
    // skip vague grants ("+2 in a Weapon Skill of your choice"), which stay in the
    // item's effect text for the player to resolve.
    var sre = /\+(\d+)\s+([A-Za-z][A-Za-z'/\- ]*?)\s+skills?\b/gi, sm;
    while ((sm = sre.exec(e))) {
      var nm = norm(sm[2]);
      var sd = skillLookup(nm);
      var looksNamed = /^[A-Z]/.test(nm) && !/\b(a|an|in|of|your|the|chosen|any|all)\b/i.test(nm);
      if (sd || looksNamed) {
        out.skills.push({
          name: sd ? sd.name : nm, rank: parseInt(sm[1], 10),
          stat: sd && sd.stat ? String(sd.stat).toLowerCase() : "",
          passive: !!(sd && sd.passive), src: sd ? sd.name : "",
        });
      }
    }
    return out;
  }
  function applyBonus(b, sign) {
    if (b.dr) { var drEl = document.getElementById("dr-armor"); if (drEl) { drEl.value = String(num(drEl.value) + sign * b.dr); fire(drEl); } }
    Object.keys(b.stats || {}).forEach(function (id) {
      var el = document.getElementById(id + "-enh");
      if (el) { el.value = String(num(el.value) + sign * b.stats[id]); fire(el); }
    });
  }

  // ── skill bonuses (gear that grants Skill ranks) ─────────────────────────────
  function skillRowByName(name) {
    var lc = norm(name).toLowerCase();
    return [].slice.call(document.querySelectorAll("#skills-body tr")).find(function (tr) {
      var inp = tr.querySelector('input[type="text"]');
      var nm = inp ? norm(inp.value).toLowerCase() : "";
      var src = (tr.dataset && tr.dataset.src ? tr.dataset.src : "").toLowerCase();
      return (nm && nm === lc) || (src && src === lc);
    }) || null;
  }
  function addRankToRow(tr, delta) {
    var ins = tr.querySelectorAll('input[type="text"]'); // [name, rank, checkType, notes]
    if (!ins[1]) return;
    ins[1].value = String(Math.max(0, num(ins[1].value) + delta));
    fire(ins[1]);
  }
  // Equip granted skills: bump an existing row's rank, or create the skill row (with
  // stat/checkType/src so its (i) info works). Returns records for a clean unequip.
  function equipSkills(skills) {
    var rec = [];
    (skills || []).forEach(function (s) {
      var row = skillRowByName(s.name);
      if (row) { addRankToRow(row, s.rank); rec.push({ name: s.name, rank: s.rank, created: false }); return; }
      if (typeof addSkillRow !== "function") return;
      addSkillRow();
      var body = document.getElementById("skills-body");
      var tr = body ? body.lastElementChild : null;
      if (!tr) return;
      var ins = tr.querySelectorAll('input[type="text"]');
      var sel = tr.querySelector("select");
      if (ins[0]) ins[0].value = s.name;
      if (ins[1]) ins[1].value = String(s.rank);
      if (sel && s.stat) sel.value = s.stat;
      if (ins[2]) ins[2].value = s.passive ? "Passive" : "Active";
      if (ins[3]) ins[3].value = "From gear";
      if (s.src) tr.dataset.src = s.src;
      fire(ins[0]);
      rec.push({ name: s.name, rank: s.rank, created: true });
    });
    return rec;
  }
  function unequipSkills(recs) {
    (recs || []).forEach(function (s) {
      var row = skillRowByName(s.name);
      if (!row) return;
      if (s.created) row.remove();          // we added it → take it back out
      else addRankToRow(row, -s.rank);      // it was already there → subtract what we added
    });
  }

  // ── equip / unequip ──────────────────────────────────────────────────────────
  function equip(tr) {
    var meta = rowMeta(tr);
    var name = norm(rowName(tr));
    if (!name) return;
    var placed = ""; // gear-slot label or "acc" for accessories
    if (meta.cat === "accessory") {
      var slot = accInputs().find(function (i) { return !norm(i.value); });
      if (!slot) { try { alert("All 10 Accessory slots are full. Clear one first."); } catch (e) {} return; }
      slot.value = name; fire(slot); placed = "acc";
    } else { // armor or weapon
      var label = normSlotLabel(meta.slot);
      if (!label && meta.cat === "weapon") label = "Hands / Holding"; // weapons default to the Hands slot
      if (label) { addName(gearInput(label), name); placed = label; }
    }
    var bonus = parseBonuses(meta.effect, name);
    applyBonus(bonus, +1);
    // Skill bonuses add ranks to an existing skill row, or create the skill row.
    // Record what actually happened (created vs bumped) so unequip reverses it.
    bonus.skills = equipSkills(bonus.skills);
    tr.dataset.equipped = "1";
    tr.dataset.equipPlaced = placed;
    tr.dataset.equipBonus = JSON.stringify(bonus);
    // keep the resolved category/slot on the row so refresh/save don't need a re-lookup
    tr.dataset.cat = meta.cat; if (meta.slot) tr.dataset.slot = meta.slot; if (meta.effect) tr.dataset.effect = meta.effect;
    refreshRowEl(tr);
  }
  function unequip(tr) {
    var name = norm(rowName(tr));
    var placed = tr.dataset.equipPlaced || "";
    if (placed === "acc") { accInputs().forEach(function (i) { if (norm(i.value).toLowerCase() === name.toLowerCase()) { i.value = ""; fire(i); } }); }
    else if (placed) { removeName(gearInput(placed), name); }
    var bonus = {}; try { bonus = JSON.parse(tr.dataset.equipBonus || "{}"); } catch (e) {}
    applyBonus({ dr: bonus.dr || 0, stats: bonus.stats || {} }, -1);
    unequipSkills(bonus.skills || []);
    delete tr.dataset.equipped; delete tr.dataset.equipPlaced; delete tr.dataset.equipBonus;
    refreshRowEl(tr);
  }

  function radial(tr) { return tr ? tr.querySelector(".hot-pin") : null; }
  function refreshRowEl(tr) {
    var btn = radial(tr); if (!btn) return;
    var name = norm(rowName(tr));
    if (!name) { btn.style.visibility = "hidden"; return; }
    var on = tr.dataset.equipped === "1";
    btn.style.visibility = "visible";
    btn.classList.toggle("on", on);
    btn.textContent = on ? "◉" : "○";
    var c = rowMeta(tr).cat;
    btn.title = on ? "Unequip" : (c === "accessory" ? "Equip accessory" : (c === "armor" ? "Equip armor" : "Equip"));
  }
  function refreshRow(btn) { var tr = btn && btn.closest ? btn.closest("tr") : null; if (tr) refreshRowEl(tr); }

  // Called by the row radial. Equip-type rows equip/unequip; everything else falls
  // back to the Hotlist toggle so consumables/weapons still pin as before.
  function click(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    if (!tr) return;
    if (isEquipType(tr)) { if (tr.dataset.equipped === "1") unequip(tr); else equip(tr); return; }
    if (window.DCCHotlist) window.DCCHotlist.toggleRow(btn);
  }

  window.DCCEquip = { click: click, isEquipType: isEquipType, refreshRow: refreshRow };
})();
