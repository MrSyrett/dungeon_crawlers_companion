// Dungeon Crawler Carl — equip gear from the Inventory, and everything it grants.
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after the
// catalog (DCC_ITEMS / DCC_SKILLS / DCC_SPELLS / DCC_BUFFS), dcc-bonus.js and the
// sheet's own scripts, alongside the Hotlist.
//
// An item's bonuses are ONE structured list (window.DCCBonus — see dcc-bonus.js),
// shown as badges on its Inventory row. Those badges are exactly what equipping
// applies:
//   stat / allstats           → that Stat's Enhanced score (plain numbers — the
//                               book's "+N% Stat" is a flat +N here)
//   dr / evade / move / step  → DR·Armor, Evade buffs, Move, Step
//   skill                     → ranks on the Skill's row (the row is created if the
//                               crawler doesn't have it); Rank = Floor uses the Floor
//   spell                     → a Spell row while worn (access only — casting costs Mana)
//   buff                      → the Buffs tracker
//   note                      → shown on the item only
// The badges on an Inventory row are read-only: bonuses are set where the item is
// built (GM Screen loot box / Homebrew), never added once it's in the inventory.
// Every granted Skill / Spell row wears a badge naming the item behind it, and
// un-equipping reverses exactly what was applied (recorded on the row, saved with
// the sheet, so it survives a reload — equipping is never re-run on load).
//
// The radial (○) on an Inventory row equips armor, accessories, weapons and any
// item that grants something; other items keep the Hotlist behaviour.

(function () {
  "use strict";

  var GEAR_LABELS = ["Head", "Torso", "Arms", "Hands / Holding", "Legs", "Feet"];
  var STAT_IDS = ["str", "int", "con", "dex", "cha"];
  var B = function () { return window.DCCBonus; };

  function norm(s) { return String(s == null ? "" : s).trim(); }
  function num(v) { var n = parseInt(String(v == null ? "" : v).replace(/[^0-9-]/g, ""), 10); return isNaN(n) ? 0 : n; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fire(el) {
    if (!el) return;
    try { var Ev = (el.ownerDocument && el.ownerDocument.defaultView && el.ownerDocument.defaultView.Event) || Event; el.dispatchEvent(new Ev("input", { bubbles: true })); } catch (e) {}
  }
  function save() { try { if (typeof scheduleAutosave === "function") scheduleAutosave(); } catch (e) {} }

  function lookup(name) {
    var t = norm(name).toLowerCase();
    if (!t || typeof DCC_ITEMS === "undefined") return null;
    var hb = Array.isArray(window.__DCC_HB_ITEMS) ? window.__DCC_HB_ITEMS : [];
    var all = DCC_ITEMS.concat(hb);
    var strip = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ""); };
    return all.find(function (x) { return x && x.name && x.name.toLowerCase() === t; }) ||
      all.find(function (x) { return x && x.name && strip(x.name) === strip(t); }) || null;
  }
  function rowName(tr) { var i = tr.querySelector('input[type="text"]'); return i ? i.value : ""; }
  function rowNotes(tr) { var i = tr.querySelectorAll('input[type="text"]')[2]; return i ? i.value : ""; }

  // ── an item's bonuses ───────────────────────────────────────────────────────
  // New rows (bv=2) carry the authoritative list in data-benefits. Older rows are
  // migrated once: a catalog/homebrew item's own structured benefits, else the
  // bonuses read from its effect text (the perks a loot box arrived with — "+5%
  // CON" reads as +5 CON, "Inherent Spell: …" as a Spell). An old hidden JSON copy that could
  // disagree with the text the GM actually edited is NOT trusted.
  function benefitsOf(tr) {
    var Bn = B(); if (!Bn) return [];
    if (tr.dataset.bv === "2") return Bn.normalize(tr.dataset.benefits || "[]");
    var it = lookup(rowName(tr)), list = [];
    if (it && Array.isArray(it.benefits) && it.benefits.length) list = Bn.normalize(it.benefits);
    else {
      var text = tr.dataset.effect || (it && it.effect) || rowNotes(tr).replace(/^[^—]{1,30}\s—\s/, "");
      list = Bn.fromText(text);
      // Free text that isn't a recognisable bonus stays in Notes, not as a badge.
      if (!list.some(function (b) { return b.kind !== "note"; })) list = [];
    }
    setBenefits(tr, list);
    return list;
  }
  function setBenefits(tr, list) {
    tr.dataset.bv = "2";
    try { tr.dataset.benefits = JSON.stringify(B() ? B().normalize(list) : list || []); } catch (e) { tr.dataset.benefits = "[]"; }
    if (B() && list && list.length) tr.dataset.effect = B().summary(list);
  }
  function rowMeta(tr) {
    var cat = tr.dataset.cat, slot = tr.dataset.slot;
    if (cat == null || cat === "") { var it = lookup(rowName(tr)); if (it) { cat = it.category; slot = it.slot || ""; } }
    return { cat: cat || "", slot: slot || "", benefits: benefitsOf(tr) };
  }
  function isEquipType(tr) {
    var m = rowMeta(tr);
    if (m.cat === "armor" || m.cat === "accessory" || m.cat === "weapon") return true;
    if (m.cat === "scroll" || m.cat === "tome") return false;   // a scroll/tome's spell is read, not worn
    return m.benefits.some(function (b) { return b.kind !== "note"; });
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
  function addName(el, name) { if (!el) return; var cur = norm(el.value); el.value = cur ? cur + ", " + name : name; fire(el); }
  function removeName(el, name) {
    if (!el) return;
    var lc = name.toLowerCase();
    el.value = norm(el.value).split(",").map(norm).filter(Boolean).filter(function (p) { return p.toLowerCase() !== lc; }).join(", ");
    fire(el);
  }

  // ── numbers: stats, DR, Evade, Move, Step ────────────────────────────────────
  function addTo(id, delta) { var el = document.getElementById(id); if (el && delta) { el.value = String(num(el.value) + delta); fire(el); } }
  function applyNumbers(rec, sign) {
    addTo("dr-armor", sign * (rec.dr || 0));
    addTo("evade-buffs", sign * (rec.evade || 0));
    addTo("evade-move", sign * (rec.move || 0));
    addTo("evade-step", sign * (rec.step || 0));
    Object.keys(rec.stats || {}).forEach(function (id) { addTo(id + "-enh", sign * rec.stats[id]); });
  }
  function floorNow() { try { if (typeof getFloor === "function") return getFloor(); } catch (e) {} return 1; }

  // ── Skills / Spells granted by gear ──────────────────────────────────────────
  function skillRows() { return [].slice.call(document.querySelectorAll("#skills-body tr")); }
  function skillRowByName(name) {
    var lc = norm(name).toLowerCase(); if (!lc) return null;
    return skillRows().find(function (tr) {
      var inp = tr.querySelector('input[type="text"]');
      var nm = inp ? norm(inp.value).toLowerCase() : "";
      var src = (tr.dataset && tr.dataset.src ? tr.dataset.src : "").toLowerCase();
      return (nm && nm === lc) || (src && src === lc);
    }) || null;
  }
  function grantsOf(tr) { try { var g = JSON.parse(tr.dataset.grants || "[]"); return Array.isArray(g) ? g : []; } catch (e) { return []; } }
  function setGrants(tr, g) { if (g.length) tr.dataset.grants = JSON.stringify(g); else delete tr.dataset.grants; renderGrantBadges(tr); }
  function renderGrantBadges(tr) {
    var sub = tr.querySelector(".dl-sub"); if (!sub) return;
    var box = sub.querySelector(".gr-badges");
    var g = grantsOf(tr);
    if (!g.length) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("span"); box.className = "gr-badges"; }
    if (box.parentNode !== sub || box !== sub.lastElementChild) sub.appendChild(box);   // after the row's other info
    box.innerHTML = g.map(function (x) {
      if (x.kind === "spell" && x.uses) {
        var left = Math.max(0, num(x.left));
        var tip = "Inherent Spell from " + x.item + " — no Mana while worn. " + left + " of " + x.uses + " charge" + (x.uses === 1 ? "" : "s") + " left; recharges on a " + RESET_TXT[x.reset || "long"] +
          (tr.dataset.grantCreated === "1" ? ". Lost when the item is unequipped." : ". You know this spell too, so once the charges are spent it costs Mana.");
        return '<span class="gr-badge gr-spell' + (left ? "" : " spent") + '" title="' + esc(tip) + '">' + esc(x.item) + " " + left + "/" + x.uses + " · " + esc(RESET_SHORT[x.reset || "long"]) + "</span>";
      }
      var what = x.kind === "spell" ? "Granted by " + x.item : (x.rank ? "+" + x.rank + " rank" + (x.rank === 1 ? "" : "s") + " from " + x.item : "Granted by " + x.item);
      return '<span class="gr-badge" title="' + esc(what) + ' — goes away when it\'s unequipped">' + esc(x.item) + (x.kind !== "spell" && x.rank ? " +" + x.rank : "") + "</span>";
    }).join("");
  }
  var RESET_TXT = { short: "short rest", long: "long rest", floor: "Floor change" };
  var RESET_SHORT = { short: "short rest", long: "long rest", floor: "Floor" };
  function chargeNote(uses, reset) { return "Item spell · no Mana · " + uses + "/" + RESET_SHORT[reset || "long"]; }
  function renderAllGrantBadges() { skillRows().forEach(renderGrantBadges); }
  // Create a Skill/Spell row the way the + Skills picker would (stat, check type,
  // src so the (i) info works), without stealing focus.
  function createSkillRow(name, kind, rank, opts) {
    if (typeof addSkillRow !== "function") return null;
    addSkillRow();
    var body = document.getElementById("skills-body"); var tr = body ? body.lastElementChild : null;
    if (!tr) return null;
    var ins = tr.querySelectorAll('input[type="text"]'); // [name, rank, checkType, notes]
    var sel = tr.querySelector("select");
    var Bn = B();
    var d = kind === "spell" ? (Bn && Bn.findSpell(name)) : (Bn && Bn.findSkill(name));
    if (ins[0]) ins[0].value = d ? d.name : name;
    if (ins[1]) ins[1].value = String(rank);
    if (d) tr.dataset.src = d.name;
    if (sel && d && d.stat) sel.value = String(d.stat).toLowerCase();
    if (kind === "spell") {
      if (ins[2]) ins[2].value = "Spell";
      // An Inherent Spell (Core, tables 39–41): no Mana, a few charges per rest/Floor.
      if (ins[3]) ins[3].value = chargeNote(opts && opts.uses || 1, opts && opts.reset) + (d && d.type ? " · " + d.type : "");
    } else {
      if (ins[2]) ins[2].value = d && d.passive ? "Passive" : "Active";
      if (ins[3]) ins[3].value = d && d.group ? d.group : "";
    }
    tr.dataset.grantCreated = "1";
    fire(ins[0]);
    return tr;
  }
  function addRank(tr, delta) {
    var ins = tr.querySelectorAll('input[type="text"]');
    if (!ins[1] || !delta) return;
    ins[1].value = String(Math.max(0, num(ins[1].value) + delta));
    fire(ins[1]);
  }
  // SKILLS: GEAR TEACHES; IT DOESN'T LEND. A Skill from an item is LEARNED (the
  // crawler keeps it), and the item's Ranks are a BONUS on top. Taking the item off
  // removes only those bonus Ranks — the Skill stays on the list (at Rank 0 if the item
  // was the only source). The rulebook has no ruling on removal ("Gain new Skills via
  // gear with Skill bonuses"; "You must be holding or wearing it to gain any Skill
  // bonuses it grants"), so this follows the novels, by the user's call.
  //
  // SPELLS ARE THE EXCEPTION — an Inherent Spell (Core, tables 39–41 footnote): it has
  // a fixed Rank, costs NO Mana, and is limited instead — here as charges (X uses per
  // short rest / long rest / Floor; 1 per long rest if the item doesn't say). It's the
  // ITEM's spell, so it goes when the item comes off, unless the crawler knows it
  // anyway (a tome, the + Skills picker) — then it stays theirs and the item only adds
  // its free charges. Spells learned from tomes / spellbooks are normal Mana spells.
  function grant(iid, item, b) {
    var kind = b.kind, name = b.target;
    var tr = skillRowByName(name), created = false;
    if (kind === "spell") {
      var uses = Math.max(1, Math.min(20, num(b.uses) || 1)), reset = RESET_TXT[b.reset] ? b.reset : "long";
      var srank = Math.max(1, b.amount || 0);
      if (!tr) { tr = createSkillRow(name, kind, srank, { uses: uses, reset: reset }); created = true; if (!tr) return null; }
      var gs = grantsOf(tr); gs.push({ iid: iid, item: item, kind: kind, rank: 0, uses: uses, reset: reset, left: uses });
      setGrants(tr, gs);
      try { if (typeof refreshSpellManaState === "function") refreshSpellManaState(); } catch (e) {}
      return { name: tr.dataset.src || name, kind: kind, rank: 0, uses: uses, reset: reset, created: created };
    }
    var rank = b.floor ? floorNow() : (b.amount || 0);
    if (!tr) { tr = createSkillRow(name, kind, rank); created = true; if (!tr) return null; }
    else addRank(tr, rank);
    var g = grantsOf(tr); g.push({ iid: iid, item: item, kind: kind, rank: rank });
    setGrants(tr, g);
    return { name: tr.dataset.src || name, kind: kind, rank: rank, created: created, floor: !!(kind === "skill" && b.floor) };
  }
  function dropSkillRow(tr) {
    // The Skills module's removal also clears its Hotlist pin and re-syncs attacks.
    if (window.DCCSkills && window.DCCSkills.removeRow) { window.DCCSkills.removeRow(tr); return; }
    tr.remove(); save();
    try { if (typeof syncLinkedAttacks === "function") syncLinkedAttacks(); } catch (e) {}
    try { if (typeof renderTurn === "function") renderTurn(); } catch (e) {}
  }
  function ungrant(iid, rec) {
    var tr = skillRowByName(rec.name); if (!tr) return;
    var all = grantsOf(tr);
    var mine = all.filter(function (x) { return x.iid === iid; });
    var g = all.filter(function (x) { return x.iid !== iid; });
    if (rec.kind === "spell" && (rec.uses || mine.some(function (x) { return x.uses; }))) {
      // An item's spell. Gear-only (no other item still grants it) → it's gone.
      var still = g.some(function (x) { return x.kind === "spell"; });
      if (tr.dataset.grantCreated === "1" && !still) { dropSkillRow(tr); return; }
      // Older records added Rank to a spell the crawler already had; take that back.
      var lr = mine.reduce(function (a, x) { return a + (num(x.rank) || 0); }, 0);
      if (lr && tr.dataset.grantCreated !== "1") addRank(tr, -lr);
      setGrants(tr, g);
      try { if (typeof refreshSpellManaState === "function") refreshSpellManaState(); } catch (e) {}
      return;
    }
    // Skills: only the bonus comes off.
    var r = rec.rank || (rec.kind === "spell" && rec.created ? 1 : 0);
    if (r) addRank(tr, -r);
    delete tr.dataset.grantCreated;   // learned now — no longer "only here because of gear"
    setGrants(tr, g);
    try { if (typeof syncLinkedAttacks === "function") syncLinkedAttacks(); } catch (e) {}
  }

  // ── Item-spell charges ───────────────────────────────────────────────────────
  // The first gear grant on a spell row that still has a charge (null if none).
  function chargeOf(tr) {
    var g = grantsOf(tr).filter(function (x) { return x.kind === "spell" && x.uses; });
    if (!g.length) return null;
    var live = g.find(function (x) { return num(x.left) > 0; });
    var soonest = g.slice().sort(function (a, b) { return ORDER[a.reset || "long"] - ORDER[b.reset || "long"]; })[0];
    return { has: !!live, grant: live || null, gearOnly: tr.dataset.grantCreated === "1",
      left: g.reduce(function (a, x) { return a + Math.max(0, num(x.left)); }, 0),
      uses: g.reduce(function (a, x) { return a + num(x.uses); }, 0),
      reset: soonest.reset || "long", resetText: RESET_TXT[soonest.reset || "long"] };
  }
  var ORDER = { short: 0, floor: 1, long: 2 };
  // Spend one charge of a spell row; returns the charge state after, or null if none.
  function spendCharge(tr) {
    var c = chargeOf(tr); if (!c || !c.has) return null;
    var g = grantsOf(tr), hit = false;
    g.forEach(function (x) { if (!hit && x.kind === "spell" && x.uses && num(x.left) > 0 && x.iid === c.grant.iid) { x.left = num(x.left) - 1; hit = true; } });
    setGrants(tr, g); save();
    return chargeOf(tr);
  }
  // Recharge item spells whose reset is one of `kinds` ("short" | "long" | "floor").
  function recharge(kinds) {
    var n = 0;
    skillRows().forEach(function (tr) {
      var g = grantsOf(tr), ch = false;
      g.forEach(function (x) { if (x.kind === "spell" && x.uses && kinds.indexOf(x.reset || "long") >= 0 && num(x.left) < x.uses) { x.left = x.uses; ch = true; n++; } });
      if (ch) setGrants(tr, g);
    });
    if (n) { save(); try { if (typeof refreshSpellManaState === "function") refreshSpellManaState(); } catch (e) {} }
    return n;
  }
  // The crawler now KNOWS a spell they had only through gear (a tome, the picker):
  // it becomes a normal Mana spell and stays when the item comes off.
  function adopt(tr) {
    if (!tr) return;
    delete tr.dataset.grantCreated;
    var ins = tr.querySelectorAll('input[type="text"]');
    var d = B() ? B().findSpell(tr.dataset.src || (ins[0] ? ins[0].value : "")) : null;
    if (ins[3]) { ins[3].value = [d && d.mana != null ? d.mana + " Mana" : "", d && d.type ? d.type : ""].filter(Boolean).join(" · "); fire(ins[3]); }
    renderGrantBadges(tr); save();
  }

  // ── Buffs granted by gear ────────────────────────────────────────────────────
  function buffField() { return document.getElementById("buffs"); }
  function buffNames() { var f = buffField(); return f ? f.value.split(",").map(norm).filter(Boolean) : []; }
  function writeBuffs(list) { var f = buffField(); if (!f) return; f.value = list.join(", "); fire(f); try { if (window.DCCBuffs) window.DCCBuffs.refresh(); } catch (e) {} }

  // ── equip / unequip ──────────────────────────────────────────────────────────
  // ── Hands (Core: a crawler has two) ──────────────────────────────────────────
  // How many hands an item takes while worn: a two-handed weapon 2 (its own text, or
  // its weapon skill "Requires two hands to wield."), any other weapon or held item
  // (a shield / buckler — slot "Hands/Holding") 1, gloves (slot "Hands") 0.
  function skillEntry(n) {
    if (!n) return null;
    var k = String(n).toLowerCase();
    var all = [];
    try { if (typeof DCC_SKILLS !== "undefined") all = all.concat(DCC_SKILLS); } catch (e) {}
    if (Array.isArray(window.__DCC_HB_SKILLS)) all = window.__DCC_HB_SKILLS.concat(all);
    return all.find(function (x) { return x && String(x.name).toLowerCase() === k; }) || null;
  }
  function weaponSkillOf(tr) {
    try { return window.DCCSkills && window.DCCSkills.weaponSkillFor ? window.DCCSkills.weaponSkillFor(rowName(tr), tr.dataset.base || "", rowNotes(tr)) : null; } catch (e) { return null; }
  }
  function handsOf(tr, meta) {
    meta = meta || rowMeta(tr);
    var slot = String(meta.slot || "");
    if (meta.cat === "weapon") {
      var it = lookup(rowName(tr)) || lookup(tr.dataset.base || "");
      var sk = skillEntry(weaponSkillOf(tr));
      var txt = [it && it.effect, sk && sk.limitations, sk && sk.desc, rowNotes(tr)].filter(Boolean).join(" ");
      return /two hands|two-handed|both hands/i.test(txt) ? 2 : 1;
    }
    if (/holding/i.test(slot) && meta.cat !== "accessory") return 1;
    return 0;
  }
  function holders(except) {
    return [].slice.call(document.querySelectorAll("#inv-body tr")).filter(function (r) {
      return r !== except && r.dataset.equipped === "1" && handsOf(r) > 0;
    });
  }

  function equip(tr) {
    var meta = rowMeta(tr);
    var name = norm(rowName(tr));
    if (!name) return;
    // Only two hands: wielding this may mean putting something else away first.
    var need = handsOf(tr, meta);
    if (need > 0) {
      var held = holders(tr), used = held.reduce(function (a, r) { return a + handsOf(r); }, 0);
      if (used + need > 2) {
        var list = held.map(function (r) { return norm(rowName(r)) + (handsOf(r) > 1 ? " (two-handed)" : ""); }).join(", ");
        var ok = false;
        try { ok = window.confirm(name + (need > 1 ? " needs both hands" : " needs a free hand") + ". Your hands hold: " + list + ".\n\nPut " + (held.length > 1 ? "them" : "it") + " away and wield " + name + "?"); } catch (e) {}
        if (!ok) return;
        // Put away the fewest held items that frees enough hands, last-equipped first.
        for (var hi = held.length - 1; hi >= 0 && used + need > 2; hi--) { used -= handsOf(held[hi]); unequip(held[hi]); }
      }
    }
    var placed = "";
    if (meta.cat === "accessory") {
      var slot = accInputs().find(function (i) { return !norm(i.value); });
      if (!slot) { try { alert("All 10 Accessory slots are full. Clear one first."); } catch (e) {} return; }
      slot.value = name; fire(slot); placed = "acc";
    } else if (meta.cat === "armor" || meta.cat === "weapon") {
      var label = normSlotLabel(meta.slot);
      if (!label && meta.cat === "weapon") label = "Hands / Holding";
      if (label) { addName(gearInput(label), name); placed = label; }
    }
    // A book ring "of +N to a Stat" asks which Stat once, and becomes a real Stat bonus.
    var CHOSEN_RX = /\+\s*(\d+)\s*(?:to\s+)?(?:a\s+|one\s+)?(?:chosen\s+)?stat\b(?!s)/i;
    var chosen = meta.benefits.findIndex(function (b) { return b.kind === "note" && CHOSEN_RX.test(b.target); });
    // Every add path drops "note" bonuses, so the ring's own text is checked too
    // (Silver/Golden Ring "+2/+3 to a chosen Stat").
    var chosenTxt = "";
    if (chosen < 0) {
      var cat0 = lookup(name);
      var src0 = [tr.dataset.effect, cat0 && cat0.effect, rowNotes(tr)].filter(Boolean).join(" ");
      var mm0 = src0.match(CHOSEN_RX);
      if (mm0) chosenTxt = mm0[0];
    }
    if ((chosen >= 0 || chosenTxt) && !meta.benefits.some(function (b) { return b.kind === "stat"; })) {
      var n = parseInt((chosen >= 0 ? meta.benefits[chosen].target : chosenTxt).replace(/[^0-9]/g, ""), 10) || 1, pick = "";
      try { pick = window.prompt("This grants +" + n + " to a Stat. Which one? (STR / INT / CON / DEX / CHA)", ""); } catch (e) {}
      var sid = { str: "str", strength: "str", int: "int", intelligence: "int", con: "con", constitution: "con", dex: "dex", dexterity: "dex", cha: "cha", charisma: "cha" }[norm(pick).toLowerCase()];
      if (sid) { if (chosen >= 0) meta.benefits[chosen] = { kind: "stat", target: sid, amount: n }; else meta.benefits.push({ kind: "stat", target: sid, amount: n }); setBenefits(tr, meta.benefits); }
    }
    var iid = tr.dataset.iid || ("it" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
    tr.dataset.iid = iid;
    var rec = { v: 2, dr: 0, evade: 0, move: 0, step: 0, stats: {}, grants: [], buffs: [] };
    meta.benefits.forEach(function (b) {
      switch (b.kind) {
        case "stat": rec.stats[b.target] = (rec.stats[b.target] || 0) + b.amount; break;
        case "allstats": STAT_IDS.forEach(function (id) { rec.stats[id] = (rec.stats[id] || 0) + b.amount; }); break;
        case "dr": rec.dr += b.amount; break;
        case "evade": rec.evade += b.amount; break;
        case "move": rec.move += b.amount; break;
        case "step": rec.step += b.amount; break;
      }
    });
    applyNumbers(rec, +1);
    meta.benefits.forEach(function (b) {
      if (b.kind === "skill" || b.kind === "spell") { var g = grant(iid, name, b); if (g) rec.grants.push(g); }
      else if (b.kind === "buff") {
        var have = buffNames();
        if (!have.some(function (n) { return n.toLowerCase() === b.target.toLowerCase(); })) { have.push(b.target); writeBuffs(have); rec.buffs.push(b.target); }
      }
    });
    // Wielding a weapon needs its weapon skill: an enchanted or renamed one
    // ("Enchanted Baseball Bat") brings its BASE weapon's skill at Rank 0 if the
    // crawler doesn't have it yet — learned, so it stays when the weapon comes off.
    if (meta.cat === "weapon" && window.DCCSkills && window.DCCSkills.ensureWeaponSkill) {
      try { window.DCCSkills.ensureWeaponSkill(name, { base: tr.dataset.base || "", effect: rowNotes(tr) }); tr.dataset.wsk = "1"; } catch (e) {}
    }
    try { if (typeof floatHealToTop === "function") floatHealToTop(); } catch (e) {}
    try { if (typeof syncLinkedAttacks === "function") syncLinkedAttacks(); } catch (e) {}
    tr.dataset.equipped = "1";
    tr.dataset.equipPlaced = placed;
    tr.dataset.equipBonus = JSON.stringify(rec);
    tr.dataset.cat = meta.cat; if (meta.slot) tr.dataset.slot = meta.slot;
    refreshRowEl(tr);
    save();
  }
  function unequip(tr) {
    var name = norm(rowName(tr));
    var placed = tr.dataset.equipPlaced || "";
    if (placed === "acc") { accInputs().forEach(function (i) { if (norm(i.value).toLowerCase() === name.toLowerCase()) { i.value = ""; fire(i); } }); }
    else if (placed) { removeName(gearInput(placed), name); }
    var rec = {}; try { rec = JSON.parse(tr.dataset.equipBonus || "{}"); } catch (e) {}
    applyNumbers({ dr: rec.dr, evade: rec.evade, move: rec.move, step: rec.step, stats: rec.stats || {} }, -1);
    if (rec.v === 2) {
      (rec.grants || []).forEach(function (g) { ungrant(tr.dataset.iid, g); });
      if ((rec.buffs || []).length) {
        // Another worn item that grants the same Buff keeps it on — and takes over
        // owning it, so it comes off when THAT item does.
        var drop = rec.buffs.filter(function (bn) {
          var other = [].slice.call(document.querySelectorAll("#inv-body tr")).find(function (r) {
            return r !== tr && r.dataset.equipped === "1" && benefitsOf(r).some(function (b) { return b.kind === "buff" && String(b.target).toLowerCase() === String(bn).toLowerCase(); });
          });
          if (!other) return true;
          try { var orec = JSON.parse(other.dataset.equipBonus || "{}"); orec.buffs = (orec.buffs || []).concat([bn]); other.dataset.equipBonus = JSON.stringify(orec); } catch (e) {}
          return false;
        }).map(function (n) { return n.toLowerCase(); });
        if (drop.length) writeBuffs(buffNames().filter(function (n) { return drop.indexOf(n.toLowerCase()) < 0; }));
      }
    } else {
      // Equipped before the rebuild: { skills:[{name,rank,created}] }.
      (rec.skills || []).forEach(function (s) {
        var row = skillRowByName(s.name); if (!row) return;
        addRank(row, -s.rank);   // the Skill stays learned; only the bonus goes
      });
    }
    delete tr.dataset.equipped; delete tr.dataset.equipPlaced; delete tr.dataset.equipBonus;
    refreshRowEl(tr);
    save();
  }

  // ── the Inventory row: radial + bonus badges ────────────────────────────────
  function radial(tr) { return tr ? tr.querySelector(".hot-pin") : null; }
  function renderBonus(tr) {
    var main = tr.querySelector(".dl-row"); if (!main || !B()) return;
    var list = benefitsOf(tr);
    var cat = tr.dataset.cat || ((lookup(rowName(tr)) || {}).category) || "";
    var show = list.length > 0;
    var box = main.querySelector(".dl-bon");
    if (!show) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("div"); box.className = "dl-bon"; main.appendChild(box); }
    // Read-only: an item's bonuses are set when it's built (GM Screen / Homebrew),
    // not once it's in a crawler's inventory.
    if (box._ed) { box._ed.set(list); return; }
    box._ed = B().editor(box, { benefits: list, readonly: true });
  }
  function refreshRowEl(tr) {
    var btn = radial(tr); if (!btn) return;
    var name = norm(rowName(tr));
    if (!name) { btn.style.visibility = "hidden"; return; }
    renderBonus(tr);
    if (!isEquipType(tr)) return;   // Hotlist owns the radial for everything else
    var on = tr.dataset.equipped === "1";
    btn.style.visibility = "visible";
    btn.classList.toggle("on", on);
    btn.textContent = on ? "◉" : "○";
    var c = rowMeta(tr).cat;
    btn.title = on ? "Unequip" : (c === "accessory" ? "Equip accessory" : (c === "armor" ? "Equip armor" : "Equip"));
  }
  function refreshRow(btn) { var tr = btn && btn.closest ? btn.closest("tr") : null; if (tr) refreshRowEl(tr); }
  function refreshAll() {
    [].slice.call(document.querySelectorAll("#inv-body tr")).forEach(function (tr) { if (norm(rowName(tr))) renderBonus(tr); });
    // Older gear spells had no charges (and for a while cost Mana). Give each one the
    // default — 1 per long rest — and, on a gear-only row, the Inherent Spell note.
    skillRows().forEach(function (tr) {
      var g = grantsOf(tr), ch = false;
      g.forEach(function (x) { if (x.kind === "spell" && !x.uses) { x.uses = 1; x.reset = "long"; x.left = 1; ch = true; } });
      if (ch) tr.dataset.grants = JSON.stringify(g);
      if (tr.dataset.grantCreated !== "1" || !g.some(function (x) { return x.kind === "spell"; })) return;
      var ins = tr.querySelectorAll('input[type="text"]');
      if (!ins[3] || /^Item spell/.test(ins[3].value)) return;
      var d = B() ? B().findSpell(tr.dataset.src || (ins[0] ? ins[0].value : "")) : null;
      var first = g.find(function (x) { return x.kind === "spell"; });
      ins[3].value = chargeNote(first.uses, first.reset) + (d && d.type ? " · " + d.type : "");
      fire(ins[3]);
    });
    renderAllGrantBadges();
  }

  function click(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null;
    if (!tr) return;
    if (isEquipType(tr)) { if (tr.dataset.equipped === "1") unequip(tr); else equip(tr); return; }
    if (window.DCCHotlist) window.DCCHotlist.toggleRow(btn);
  }
  // Deleting a worn item takes its bonuses off first.
  function removeRow(btn) {
    var tr = btn && btn.closest ? btn.closest("tr") : null; if (!tr) return;
    if (tr.dataset.equipped === "1") unequip(tr);
    tr.remove(); save();
  }

  function injectCss() {
    if (document.getElementById("dcc-equip-css")) return;
    var st = document.createElement("style"); st.id = "dcc-equip-css";
    st.textContent =
      ".iv-grid{grid-template-areas:'pin name num ctrl' 'pin sub num ctrl' 'pin bon bon bon'!important}" +
      ".dl-row .dl-bon{grid-area:bon;padding:2px 0 1px}" +
      ".dl-row .dl-bon .dcbn{--dcbn-font:'Barlow Condensed',sans-serif}" +
      ".dl-row .dl-bon .dcbn-b{font-size:12px}" +
      ".gr-badges{display:inline-flex;gap:3px;flex:0 1 auto;min-width:0;max-width:60%;overflow:hidden;margin-left:4px}" +
      ".gr-badge{display:inline-block;max-width:100%;padding:0 7px;border-radius:999px;font:700 10.5px/17px 'Barlow Condensed',sans-serif;letter-spacing:.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" +
        "color:var(--gold-ink,#8a6c0c);background:color-mix(in srgb,var(--gold,#c8a020) 16%,transparent);border:1px solid color-mix(in srgb,var(--gold,#c8a020) 55%,transparent)}" +
      ".gr-badge::before{content:'\\2726 ';opacity:.8}" +
      ".gr-badge.spent{opacity:.5;text-decoration:line-through}";
    (document.head || document.documentElement).appendChild(st);
  }
  injectCss();

  // A "Passive Skill at Rank = Floor" from worn gear follows the Floor: when it
  // changes, each such grant moves by the difference (and remembers its new Rank, so
  // unequipping still takes back exactly what it gave).
  function refloor() {
    var F = floorNow();
    [].slice.call(document.querySelectorAll("#inv-body tr")).forEach(function (tr) {
      if (tr.dataset.equipped !== "1") return;
      var rec; try { rec = JSON.parse(tr.dataset.equipBonus || "{}"); } catch (e) { return; }
      if (rec.v !== 2 || !(rec.grants || []).length) return;
      var floorSkills = benefitsOf(tr).filter(function (b) { return b.kind === "skill" && b.floor; }).map(function (b) { return String(b.target).toLowerCase(); });
      var changed = false;
      rec.grants.forEach(function (g) {
        if (g.kind !== "skill" || !(g.floor || floorSkills.indexOf(String(g.name).toLowerCase()) >= 0)) return;
        var delta = F - (g.rank || 0); if (!delta) return;
        var row = skillRowByName(g.name); if (!row) return;
        addRank(row, delta);
        g.rank = F; g.floor = true; changed = true;
        setGrants(row, grantsOf(row).map(function (x) { return x.iid === tr.dataset.iid ? Object.assign({}, x, { rank: F }) : x; }));
      });
      if (changed) { tr.dataset.equipBonus = JSON.stringify(rec); save(); }
    });
  }
  // The equipped weapon rows that wield a given attack skill (for "is it in hand?").
  function wielding(skillName) {
    var k = String(skillName || "").toLowerCase(); if (!k) return [];
    return [].slice.call(document.querySelectorAll("#inv-body tr")).filter(function (r) {
      if (r.dataset.equipped !== "1" || rowMeta(r).cat !== "weapon") return false;
      return String(weaponSkillOf(r) || "").toLowerCase() === k;
    });
  }
  window.DCCEquip = {
    handsOf: handsOf, wielding: wielding, refloor: refloor,
    chargeOf: chargeOf, spendCharge: spendCharge, recharge: recharge, adopt: adopt,
    // Would this row fit in the free hands right now (no prompt)?
    fits: function (tr) { var need = handsOf(tr); if (!need) return true; return holders(tr).reduce(function (a, r) { return a + handsOf(r); }, 0) + need <= 2; },
    click: click, isEquipType: isEquipType, refreshRow: refreshRow, refreshAll: refreshAll,
    removeRow: removeRow, equip: equip, unequip: unequip, setBenefits: setBenefits, benefitsOf: benefitsOf,
    renderGrantBadges: renderGrantBadges,
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(refreshAll, 0); });
  else setTimeout(refreshAll, 0);
})();
