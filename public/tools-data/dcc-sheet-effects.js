// Dungeon Crawler Carl — automated Spell & Item effects
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after the data
// files (DCC_SPELLS / DCC_ITEMS / DCC_BUFFS) and the sheet's own scripts.
//
// What it automates (Core pp. 93-99, 202-219):
//   SPELLS (cast from the Skills tab Roll button or the Turn tab Hotlist)
//     • Heal (2 slots) / Heal Self (1d4 → 1d6 → 2d6 → full + short rest by Rank)
//       / Intimate Touches (CHA Mod slots, self or ally) / Nature's Breath (self, pet
//       or ally) restore your Health Bar; Heal Critter refills the Pet bar; Heal Others
//       rolls the slots for the ally.
//     • Shield / Hot Stuff Aura mark Shield slots over the Health Bar.
//     • Oakhide / Bang Bro / Wisp Armor / Water Breathing add their Buff chip
//       (Oakhide's DR and Bang Bro's +2 (+1d6 per Rank 5/10/15) damage are applied by the sheet while active).
//     • Utility spells that call for no Check just cast (Mana spent, effect logged) —
//       no pointless d20. Attack spells and anything with a Check still roll.
//   ITEMS (Use on the Turn tab Hotlist — pin them from the Inventory tab)
//     • Consumables spend one of their Quantity; at 0 the row (and its Hotlist pin) go.
//     • Healing Potions heal their slots; Heal Pet Potion heals the Pet bar.
//     • Mana Potion fills Mana; Good Mana Refill adds 15 now.
//     • Bandages clear Blood Trail; Poison Antidote clears Poisoned.
//     • Dynamite rolls its damage.
//     • Potion of +N Skill adds N Ranks to a skill you pick (2 per crawler, ever).
//     • Spell Scroll: <Spell> casts it free; Magic Tome / Spellbook: <Spell> teaches it.
//   STACKING: adding an item you already carry raises its Quantity (DCCFx.stackAdd).

(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function norm(s) { return String(s == null ? "" : s).trim().toLowerCase(); }
  function fire(el) { if (!el) return; try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {} }
  function log(a, b, c, t) { if (typeof addLog === "function") addLog(a, b, c || "", t || "normal"); }
  function roll(n, sides) { var t = 0, r = []; for (var i = 0; i < n; i++) { var v = Math.floor(Math.random() * sides) + 1; r.push(v); t += v; } return { total: t, rolls: r }; }
  function save() { try { if (typeof scheduleAutosave === "function") scheduleAutosave(); } catch (e) {} }
  function statMod(id) { try { return typeof getStatMod === "function" ? (getStatMod(id) || 0) : 0; } catch (e) { return 0; } }
  function spellBy(name) {
    var k = norm(String(name || "").replace(/\s*\(spell\)\s*$/i, ""));
    if (!k || typeof DCC_SPELLS === "undefined") return null;
    var all = DCC_SPELLS.concat(Array.isArray(window.__DCC_HB_SPELLS) ? window.__DCC_HB_SPELLS : []);
    return all.find(function (s) { return norm(s.name) === k; }) || null;
  }
  function itemBy(name) {
    var k = norm(name);
    if (!k || typeof DCC_ITEMS === "undefined") return null;
    return DCC_ITEMS.find(function (i) { return norm(i.name) === k; }) || null;
  }

  // ── Health Bar / Pet bar / Mana / Shield helpers ─────────────────────────────
  function healSelf(n) { return typeof healHpSlots === "function" ? healHpSlots(n) : 0; }
  function healFull() { return healSelf(10); }
  function healPet(n, which) {
    var pips = [].slice.call(document.querySelectorAll("#" + (which || "pet-hb") + " .comp-hb-pip"));
    var lost = pips.filter(function (p) { return p.dataset.active === "false"; }).sort(function (a, b) { return (+a.dataset.pct) - (+b.dataset.pct); }).slice(0, n);
    lost.forEach(function (p) { p.dataset.active = "true"; p.classList.remove("dimmed"); });
    save(); return lost.length;
  }
  function manaMax() { var el = document.getElementById("mana-max"); return parseInt(el && el.value, 10) || 0; }
  function addMana(n, full) {
    var el = document.getElementById("mana-current"); if (!el) return 0;
    var cur = parseInt(el.value, 10) || 0, max = manaMax();
    var next = full ? max : (max ? Math.min(max, cur + n) : cur + n);
    el.value = String(next); fire(el);
    try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e) {}
    return next - cur;
  }
  function setShields(n) {
    var cells = [].slice.call(document.querySelectorAll(".hp-shield"));
    cells.forEach(function (c, i) { var on = i < n; c.dataset.active = on ? "true" : "false"; c.classList.toggle("on", on); });
    save(); return Math.min(n, cells.length);
  }
  function addBuff(name) {
    try { if (window.DCCBuffs && DCCBuffs.pick) { DCCBuffs.pick(name); return; } } catch (e) {}
    var el = document.getElementById("buffs"); if (!el) return;
    if (!new RegExp("(^|,)\\s*" + name + "\\s*(,|$)", "i").test(el.value)) { el.value = [el.value.trim(), name].filter(Boolean).join(", "); fire(el); }
  }
  function removeDebuff(name) { if (typeof dccRemoveDebuff === "function") dccRemoveDebuff(name); }
  function hasDebuff(name) { return new RegExp("(^|,)\\s*" + name + "\\b", "i").test((document.getElementById("debuffs") || {}).value || ""); }

  // ── tiny chooser (Self / Ally / Pet, or a skill list) ────────────────────────
  function choose(title, options, cb) {
    var ov = document.getElementById("dccfx-overlay");
    if (!ov) {
      ov = document.createElement("div"); ov.id = "dccfx-overlay";
      ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10050;display:flex;align-items:center;justify-content:center;padding:16px;";
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) ov.remove(); });
      document.body.appendChild(ov);
    }
    ov.innerHTML = '<div style="background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:380px;width:100%;max-height:80vh;overflow:auto;font-family:Barlow,sans-serif;box-shadow:0 24px 60px rgba(0,0,0,.5);">' +
      '<div style="padding:14px 16px;border-bottom:1px solid #2a2a2e;font-weight:800;text-transform:uppercase;letter-spacing:.04em;font-size:14px;">' + esc(title) + '</div>' +
      '<div style="padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;">' +
      options.map(function (o, i) { return '<button data-i="' + i + '" style="text-align:left;border:1px solid #3a3a40;background:#1c1516;color:#f0a8a3;border-radius:8px;padding:9px 12px;font-weight:700;font-size:13px;cursor:pointer;">' + esc(o.label) + (o.sub ? '<div style="color:#8a8a93;font-weight:600;font-size:11px;margin-top:2px;">' + esc(o.sub) + '</div>' : '') + '</button>'; }).join("") +
      '<button data-x style="border:1px solid #333;background:transparent;color:#888;border-radius:8px;padding:7px;cursor:pointer;">Cancel</button></div></div>';
    ov.querySelectorAll("button[data-i]").forEach(function (b) { b.addEventListener("click", function () { ov.remove(); cb(options[+b.dataset.i].value); }); });
    ov.querySelector("button[data-x]").addEventListener("click", function () { ov.remove(); });
  }
  // Table 37 Rank damage die (sheet helper), with a d4 fallback if it isn't loaded.
  function rankDieRoll(rank) { if (typeof dccRollRankDie === "function") return dccRollRankDie(rank); var r = roll(1, 4); return { total: r.total, parts: ["d4(" + r.total + ")"] }; }
  function rankDieLabel(rank) {
    if (typeof dccRankDieSpec !== "function") return "d4";
    return dccRankDieSpec(rank).map(function (x) { return x[1] === 1 ? "1" : (x[0] > 1 ? x[0] : "") + "d" + x[1]; }).join("+") || "1";
  }
  function rankTier(rank, tiers) { var v = tiers[0]; [5, 10, 15].forEach(function (r, i) { if (rank >= r && tiers[i + 1] != null) v = tiers[i + 1]; }); return v; }

  // ── SPELL effects ────────────────────────────────────────────────────────────
  // Returns true when the effect fully handled the cast (no d20 roll needed).
  // Mana is already spent by the sheet's rollSkill() before this runs.
  function spellEffect(name, rank, opts) {
    opts = opts || {};
    var sp = spellBy(opts.src) || spellBy(name);
    if (!sp) return false;
    var n = sp.name, R = rank || 1, tag = opts.scroll ? " (scroll)" : "";
    switch (n) {
      case "Heal": {
        var h = healSelf(2);
        log("Heal" + tag, h ? "+" + h + " HB" : "Full", h ? "Restored " + h + " Health Bar slot" + (h === 1 ? "" : "s") : "Health Bar already full", "crit");
        return true;
      }
      case "Heal Self": {
        if (R >= 15) { healFull(); addMana(Math.floor(manaMax() / 2)); log("Heal Self" + tag, "Full HB", "Healed to full + short-rest benefits (Rank 15)", "crit"); return true; }
        var dice = rankTier(R, [[1, 4], [1, 6], [2, 6]]), r = roll(dice[0], dice[1]), got = healSelf(r.total);
        log("Heal Self" + tag, "+" + got + " HB", dice[0] + "d" + dice[1] + "(" + r.rolls.join("+") + ")=" + r.total + " slots" + (R >= 5 ? " · also mend a " + (R >= 10 ? "Major Injury or other Debuff" : "Minor Injury, Poison or Disease Debuff") : ""), "crit");
        return true;
      }
      case "Heal Others": {
        var d2 = rankTier(R, [[1, 4], [1, 6], [2, 6]]), r2 = roll(d2[0], d2[1]);
        log("Heal Others" + tag, "+" + r2.total + " HB", "Target ally heals " + d2[0] + "d" + d2[1] + "(" + r2.rolls.join("+") + ") slots" + (R >= 15 ? " — every party member within 20 ft" : ""), "crit");
        return true;
      }
      case "Heal Critter": {
        var p = healPet(10, "pet-hb");
        log("Heal Critter" + tag, "Pet 100%", "Pet healed " + p + " slot" + (p === 1 ? "" : "s") + " back to full" + (R >= 5 ? " · mends a " + (R >= 10 ? "Major" : "Minor") + " Injury" : ""), "crit");
        return true;
      }
      case "Intimate Touches": {
        var amt = Math.max(1, statMod("cha"));
        choose("Intimate Touches — heal " + amt + " slots", [{ label: "Myself", value: "self" }, { label: "An ally", value: "ally" }], function (who) {
          if (who === "self") { var g = healSelf(amt); log("Intimate Touches" + tag, "+" + g + " HB", "Healed " + g + " slots (CHA Mod " + amt + ")", "crit"); }
          else log("Intimate Touches" + tag, "+" + amt + " HB", "Ally heals " + amt + " slots (CHA Mod)", "crit");
        });
        return true;
      }
      case "Nature's Breath": {
        // "Roll a Nature's Breath Rank damage die" — Table 37 (Core p.176), +1 per upgrade tier.
        var bonus = R >= 15 ? 3 : R >= 10 ? 2 : R >= 5 ? 1 : 0, r3 = rankDieRoll(R), tot = r3.total + bonus;
        choose("Nature's Breath — heal " + tot + " slots", [{ label: "Myself", value: "self" }, { label: "My pet", value: "pet" }, { label: "An ally", value: "ally" }], function (who) {
          var detail = r3.parts.join("+") + (bonus ? "+" + bonus : "") + "=" + tot + " slots";
          if (who === "self") { var g = healSelf(tot); log("Nature's Breath" + tag, "+" + g + " HB", detail, "crit"); }
          else if (who === "pet") { var gp = healPet(tot, "pet-hb"); log("Nature's Breath" + tag, "Pet +" + gp + " HB", detail, "crit"); }
          else log("Nature's Breath" + tag, "+" + tot + " HB", "Ally heals · " + detail, "crit");
        });
        return true;
      }
      case "Shield": {
        var sh = rankTier(R, [2, 5, 10, 15]), set = setShields(sh);
        log("Shield" + tag, set + " shield slots", "Each holds your CON Mod (" + statMod("con") + "); take damage from these first · 5 minutes", "crit");
        return true;
      }
      case "Hot Stuff Aura": {
        var cnt = Math.max(1, statMod("cha")), per = rankTier(R, [2, 4, 6, 8]);
        setShields(cnt);
        log("Hot Stuff Aura" + tag, cnt + " shield slots", per + " in each slot · protects allies in the burst · 2 rounds", "crit");
        return true;
      }
      case "Oakhide": case "Bang Bro": case "Wisp Armor": case "Water Breathing": {
        addBuff(n);
        log(n + tag, "Buff on", (sp.desc || "").split(". ").slice(0, 2).join(". "), "crit");
        return true;
      }
    }
    // A homebrew heal spell (SpellBuilder type "heal") carries its healing dice in
    // `damage` (+ rank upgrades, + its damage Stat) — heal yourself or an ally.
    if (sp.type === "heal" && /^\d*d\d+$/i.test(String(sp.damage || ""))) {
      var hd = typeof dccDiceAtRank === "function" ? dccDiceAtRank(sp.damage, sp.upgrades || [], R) : sp.damage;
      var hm = hd.match(/(\d*)d(\d+)/i), hr = roll(parseInt(hm[1] || "1", 10), parseInt(hm[2], 10));
      var hs = sp.damageStat && sp.damageStat !== "none" ? String(sp.damageStat).toLowerCase() : "", hsm = hs ? statMod(hs) : 0;
      var amt2 = Math.max(0, hr.total + hsm), why = hd + "(" + hr.rolls.join("+") + ")" + (hs ? "+" + hs.toUpperCase() + "(" + hsm + ")" : "") + "=" + amt2 + " slots";
      choose(n + " — heal " + amt2 + " slots", [{ label: "Myself", value: "self" }, { label: "An ally", value: "ally" }], function (who) {
        if (who === "self") { var g3 = healSelf(amt2); log(n + tag, "+" + g3 + " HB", why, "crit"); }
        else log(n + tag, "+" + amt2 + " HB", "An ally heals " + why, "crit");
      });
      return true;
    }
    // Utility spells that call for no Check: just cast (no d20).
    var desc = sp.desc || "";
    if (sp.type !== "attack" && !/\bcheck\b|opposed|attack/i.test(desc)) {
      log(n + tag, "Cast", desc.split(". ").slice(0, 2).join(". "), "normal");
      return true;
    }
    return false;
  }

  // ── ITEM effects ─────────────────────────────────────────────────────────────
  var CONSUMABLE_RX = /potion|bandage|antidote|dynamite|biscuit|ration|scroll|tome|spellbook|ticket|torch|energy drink|flare|glow stick|smoke bomb|sharpening stone|elixir|tonic|grenade|molotov/i;
  function rowOf(tr) {
    var t = tr ? tr.querySelectorAll('input[type="text"]') : [];
    return { tr: tr, nameEl: t[0], qtyEl: t[1], notesEl: t[2], name: t[0] ? String(t[0].value).trim() : "", qty: t[1] ? (parseInt(t[1].value, 10) || 0) : 0, notes: t[2] ? t[2].value : "" };
  }
  function isConsumable(tr) {
    var r = rowOf(tr); if (!r.name) return false;
    var cat = (tr.dataset && tr.dataset.cat) || ((itemBy(r.name) || {}).category) || "";
    if (/^(consumable|scroll|tome)$/i.test(cat)) return true;
    if (/^(weapon|armor|accessory|tool)$/i.test(cat)) return false;
    return CONSUMABLE_RX.test(r.name);
  }
  function clip(s, n) { s = String(s || "").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  // An Inventory row the Action tab's Equipment section can Use — or null. Only items
  // that are used up AND have one set effect are listed (potions, scrolls, tomes,
  // bandages, antidotes, dynamite, torches, flares…). Reusable / versatile gear (rope,
  // lockpicks, kits, lanterns, worn accessories), Rations (eaten at a rest) and
  // cooldown items (Scratchers) stay in the Inventory.
  // { tr, name, qty, notes, cons, sub }
  var NOT_LISTED_RX = /crawler biscuits|\brations?\b|energy drink|scratcher|waterskin|wineskin/i;
  function usable(tr) {
    var r = rowOf(tr); if (!r.name) return null;
    var it = itemBy(r.name), cat = (tr.dataset && tr.dataset.cat) || (it && it.category) || "";
    if (/^(weapon|armor|material|accessory|tool)$/i.test(cat)) return null;
    if (!isConsumable(tr) || NOT_LISTED_RX.test(r.name)) return null;
    var eff = (it && it.effect) || "";
    if (!eff && /^(?:magic\s+tome|spellbook|tome)\b/i.test(r.name)) eff = "Read it to learn the Spell (uses up the tome)";
    if (!eff && /^(?:spell\s+)?scroll\b/i.test(r.name)) eff = "Cast the Spell once — no Mana, usable untrained";
    var lit = lightOf(r.name);
    if (lit && (!eff || /^adventuring gear\.?$/i.test(eff) || /torches/i.test(r.name))) eff = lit;
    if (/smoke bomb/i.test(r.name) && (!eff || /^adventuring gear\.?$/i.test(eff))) eff = SMOKE;
    var sub = clip(eff && !/^adventuring gear\.?$/i.test(eff) ? eff : r.notes, 90);
    return { tr: tr, name: r.name, qty: r.qty, notes: r.notes, cons: true, sub: sub, worn: false };
  }
  // Consumed light sources: what lighting one does.
  function lightOf(name) {
    if (/torch/i.test(name)) return "Bright 20 ft / dim 20 ft for about an hour";
    if (/glow stick/i.test(name)) return "Dim light 10 ft for several hours";
    if (/\bflare\b/i.test(name)) return "Bright red light 20 ft for about 15 minutes";
    return "";
  }
  var SMOKE = "Fills about a 10 ft area with thick smoke — blocks sight";

  // Keep a pinned Hotlist slot's "×qty" in step (or clear it at 0).
  function syncHotQty(name, qty) {
    var k = norm(name);
    [].slice.call(document.querySelectorAll("#hotlist-grid textarea")).forEach(function (ta) {
      var v = String(ta.value || "").trim(); if (!v) return;
      var head = norm(v.split(/\s[×x]\s?\d+|\s[—–-]\s|:\s|\s\(/)[0]), full = norm(v.split(/\s[×x]\s?\d+|\s[—–]\s/)[0]);
      if (head !== k && full !== k) return;
      if (qty <= 0) ta.value = "";
      else if (/\s[×x]\s?\d+/.test(v)) ta.value = v.replace(/\s[×x]\s?\d+/, " ×" + qty);
      else ta.value = v.replace(/^(.*?)(\s[—–-]\s|$)/, function (m0, a, b) { return a + " ×" + qty + (b || ""); });
      fire(ta);
    });
    try { if (window.DCCHotlist) DCCHotlist.refresh(); } catch (e) {}
  }
  function consumeOne(tr) {
    var r = rowOf(tr); if (!r.tr) return;
    var left = Math.max(0, (r.qty || 1) - 1);
    if (left <= 0) { tr.remove(); syncHotQty(r.name, 0); }
    else { r.qtyEl.value = String(left); fire(r.qtyEl); syncHotQty(r.name, left); }
    save();
    try { if (typeof renderTurn === "function") renderTurn(); } catch (e) {}
    return left;
  }

  // Apply an item's effect by name (+ its notes). Returns true if the item was "used up".
  // The spell a scroll/tome holds as a Spell badge (the GM Loot Box, the Enchanted
  // builder) — { sp, rank } — or null. Its name may be just "Spell Scroll".
  function spellBadge(tr) {
    if (!tr || !window.DCCEquip || !window.DCCEquip.benefitsOf) return null;
    var b = (window.DCCEquip.benefitsOf(tr) || []).find(function (x) { return x && x.kind === "spell" && x.target; });
    var sp = b ? spellBy(b.target) : null;
    return sp ? { sp: sp, rank: parseInt(b.amount, 10) || 0 } : null;
  }
  function itemEffect(name, notes, after, tr) {
    var it = itemBy(name), nm = String(name || ""), low = norm(nm), text = ((it && it.effect) || "") + " " + (notes || "");
    var m, badge = spellBadge(tr), cat = tr && tr.dataset ? String(tr.dataset.cat || "") : "";
    // Spell Scroll — cast once, free, at a fixed Rank. The spell (and Rank) come from its
    // Spell badge when it has one, else from its name ("Spell Scroll: Fireball (Rank 3)").
    var isScroll = cat === "scroll" || /^(?:spell\s+)?scroll\b/i.test(nm);
    if (isScroll && badge) { castFromScroll(badge.sp, badge.rank || 1); return after(true); }
    if ((m = nm.match(/^(?:spell\s+)?scroll(?:\s+of)?\s*[:\-–—]?\s*(.+?)(?:\s*\(rank\s*(\d+)\))?$/i)) && spellBy(m[1])) {
      castFromScroll(spellBy(m[1]), parseInt(m[2], 10) || 1); return after(true);
    }
    // Magic Tome / Spellbook / "Tome of <Spell>" — reading it teaches the Spell and uses the tome up.
    // Rank: the badge's Rank, else the Rank written on the tome (the creation wizard's tomes
    // note "at Rank N"), else 1d6−1 (min 1).
    // Already know it? Nothing to learn — the tome is kept (it can still be traded or sold).
    var isTome = cat === "tome" || /^(?:magic\s+tome|spellbook|tome)\b/i.test(nm);
    if ((isTome && badge) || ((m = nm.match(/^(?:magic\s+tome|spellbook|tome)\s*(?:of)?\s*[:\-–—]?\s*(.+)$/i)) && spellBy(m[1]))) {
      var sp = isTome && badge ? badge.sp : spellBy(m[1]);
      if (isTome && badge && badge.rank) notes = (notes ? notes + " " : "") + "Rank " + badge.rank;
      var rowOf = function () { return [].slice.call(document.querySelectorAll("#skills-body tr")).find(function (tr) { var t = tr.querySelector('input[type="text"]'); return t && norm(t.value) === norm(sp.name); }); };
      if (rowOf()) { log("Read " + nm, "Already known", "You already know " + sp.name + " — the tome is kept", "normal"); return after(false); }
      var noted = String(notes || "").match(/\brank\s*(\d+)/i);
      var rk = noted ? Math.max(1, Math.min(10, parseInt(noted[1], 10))) : Math.max(1, roll(1, 6).total - 1);
      try { if (window.DCCSkills && DCCSkills.learn) DCCSkills.learn("spell", sp.name); } catch (e) {}
      var row = rowOf();
      if (row) { var ins = row.querySelectorAll('input[type="text"]'); if (ins[1]) { ins[1].value = String(rk); fire(ins[1]); } }
      log("Read " + nm, sp.name + " · Rank " + rk, noted ? "Learned the spell at the tome's Rank" : "Learned the spell (Rank 1d6−1, min 1)", "crit");
      return after(true);
    }
    if (/heal pet/i.test(low)) { var hp = parseInt((text.match(/(\d+)\s*Health Bar/i) || [])[1], 10) || 5; var gp = healPet(hp, "pet-hb"); log("Use " + nm, "Pet +" + gp + " HB", "Pet healed " + gp + " slots", "crit"); return after(true); }
    if ((m = text.match(/heals?\s+(\d+)\s*(?:health bar\s*)?slots?/i)) && /potion|elixir|heal/i.test(nm + " " + text)) {
      var got = healSelf(parseInt(m[1], 10));
      var mm = text.match(/mends?[^.;]*/i), mend = mm ? " · " + mm[0] : "";
      log("Use " + nm, got ? "+" + got + " HB" : "Full", "Healed " + got + " Health Bar slot" + (got === 1 ? "" : "s") + mend, "crit");
      return after(true);
    }
    if (/fully restores mana|mana potion$/i.test(text + " " + low) || /^mana potion/i.test(low)) {
      var gm = addMana(0, true); log("Use " + nm, "+" + gm + " Mana", "Mana fully restored", "crit"); return after(true);
    }
    if ((m = text.match(/restores?\s+(\d+)\s+mana/i))) {
      var gm2 = addMana(parseInt(m[1], 10)); log("Use " + nm, "+" + gm2 + " Mana", text.trim(), "crit"); return after(true);
    }
    if (/bandage/i.test(low)) { var had = hasDebuff("Blood Trail"); removeDebuff("Blood Trail"); log("Use " + nm, had ? "Blood Trail cleared" : "—", had ? "Bandaged the wound" : "No Blood Trail to treat", "normal"); return after(true); }
    if (/antidote/i.test(low)) { var hadP = hasDebuff("Poisoned") || hasDebuff("Potion Sickness"); removeDebuff("Poisoned"); removeDebuff("Potion Sickness"); log("Use " + nm, hadP ? "Poison cured" : "—", hadP ? "Poisoned cleared" : "Not poisoned", "normal"); return after(true); }
    if (/iron skin/i.test(low)) { addBuff("Iron Skin"); log("Use " + nm, "Iron Skin", "DR doubled for 30 minutes", "crit"); return after(true); }
    if ((m = text.match(/(\d*)d(\d+)\s+(\w+)/)) && /dynamite|grenade|molotov|bomb/i.test(nm + " " + text)) {
      var dn = parseInt(m[1] || "1", 10), ds = parseInt(m[2], 10), rd = roll(dn, ds);
      log("Throw " + nm, rd.total + " dmg", dn + "d" + ds + "(" + rd.rolls.join("+") + ") " + m[3] + (text.match(/\d+\s*ft[^.]*/) ? " · " + text.match(/\d+\s*ft[^.]*/)[0] : ""), "normal");
      return after(true);
    }
    if ((m = nm.match(/potion of \+?(\d+) skill/i))) {
      var plus = parseInt(m[1], 10), used = parseInt(window.__dccSkillPotions || 0, 10) || 0;
      if (used >= 2) { log("Use " + nm, "✗", "You've already drunk 2 Skill potions — that's the lifetime limit", "fumble"); return after(false); }
      var skills = [].slice.call(document.querySelectorAll("#skills-body tr")).map(function (tr) { var t = tr.querySelectorAll('input[type="text"]'); return { tr: tr, name: t[0] ? t[0].value.trim() : "", rank: t[1] ? (parseInt(t[1].value, 10) || 0) : 0 }; }).filter(function (s) { return s.name; });
      if (!skills.length) { log("Use " + nm, "✗", "Learn a skill first", "fumble"); return after(false); }
      choose(nm + " — pick a skill", skills.map(function (s) { return { label: s.name, sub: "Rank " + s.rank + " → " + (s.rank + plus), value: s }; }), function (s) {
        var t = s.tr.querySelectorAll('input[type="text"]'); t[1].value = String(s.rank + plus); fire(t[1]);
        window.__dccSkillPotions = used + 1;
        log("Use " + nm, s.name + " +" + plus, "Rank " + s.rank + " → " + (s.rank + plus) + " · Skill potions drunk: " + (used + 1) + "/2", "crit");
        after(true);
      });
      return;
    }
    if (/scratcher/i.test(low)) { log("Use " + nm, "Scratch!", ((it && it.effect) || "Random effect — GM rolls on p.218") + " · reusable after its Cooldown", "normal"); return after(false); }
    if (lightOf(nm)) { log("Light " + nm.replace(/\s*[×x]\s*\d+$/, ""), "Lit", lightOf(nm), "normal"); return after(true); }
    if (/smoke bomb/i.test(low)) { log("Use " + nm, "Smoke", SMOKE, "normal"); return after(true); }
    log("Use " + nm, "Used", (it && it.effect && !/^adventuring gear\.?$/i.test(it.effect) ? it.effect : "") || notes || "", "normal");
    return after(true);
  }

  // Cast a scroll's spell: no Mana, untrained-usable, at the scroll's fixed Rank.
  function castFromScroll(sp, rank) {
    if (spellEffect(sp.name, rank, { scroll: true })) return;
    var m = String(sp.desc || "").match(/Base Damage:\s*(\d*)d(\d+)\s*\+\s*(STR|INT|CON|DEX|CHA)?/i);
    // A homebrew attack spell carries its dice (and damage Stat) as fields, not prose.
    if (!m && sp.type === "attack" && /^\d*d\d+$/i.test(String(sp.damage || ""))) {
      var hm2 = String(sp.damage).match(/^(\d*)d(\d+)$/i);
      m = [sp.damage, hm2[1], hm2[2], sp.damageStat && sp.damageStat !== "none" ? sp.damageStat : (sp.damageStat === "none" ? "" : sp.stat)];
    }
    var stat = m && m[3] ? String(m[3]).toLowerCase() : String(sp.stat || "int").toLowerCase(), sm = statMod(stat);
    var d20 = roll(1, 20).total, hit = d20 + rank + sm;
    var type = d20 === 20 ? "crit" : d20 === 1 ? "fumble" : "normal";
    if (m) {
      var dice = typeof dccDiceAtRank === "function" ? dccDiceAtRank((m[1] || "1") + "d" + m[2], sp.upgrades || [], rank) : (m[1] || "1") + "d" + m[2];
      var dm = dice.match(/(\d+)d(\d+)/), r = roll(parseInt(dm[1], 10) * (d20 === 20 ? 2 : 1), parseInt(dm[2], 10)), dmg = r.total + sm;   // Nat 20: double base dice (Core p.79)
      log(sp.name + " (scroll)" + (d20 === 20 ? " ★ NAT 20" : d20 === 1 ? " ✗ NAT 1" : ""), "Hit: " + hit + "  |  Dmg: " + dmg, "d20(" + d20 + ")+Rank(" + rank + ")+" + stat.toUpperCase() + "(" + sm + ")=" + hit + "  |  " + dice + "(" + r.rolls.join("+") + ")+" + stat.toUpperCase() + "(" + sm + ")=" + dmg, type);
    } else {
      log(sp.name + " (scroll)", hit, "Spell Check d20(" + d20 + ")+Rank(" + rank + ")+" + stat.toUpperCase() + "(" + sm + ")=" + hit, type);
    }
  }

  // Use an Inventory row (Inventory tab "Use", or Turn tab Hotlist "Use").
  function useRow(trOrBtn) {
    var tr = trOrBtn && trOrBtn.closest ? trOrBtn.closest("tr") : trOrBtn;
    if (!tr) return false;
    var r = rowOf(tr), cons = isConsumable(tr);
    itemEffect(r.name, r.notes, function (spent) { if (spent && cons) consumeOne(tr); else save(); }, tr);
    return true;
  }
  // Use by name (a Hotlist slot with no matching Inventory row).
  function useByName(name, notes) { itemEffect(name, notes, function () {}); return true; }
  function invRowByName(name) {
    var k = norm(String(name || "").replace(/\s[×x]\s?\d+\s*$/, ""));
    return [].slice.call(document.querySelectorAll("#inv-body tr")).find(function (tr) { return norm(rowOf(tr).name) === k; }) || null;
  }

  // ── stacking: add N of an item, merging into an existing row ────────────────
  function stackAdd(name, qty) {
    var tr = invRowByName(name); if (!tr) return null;
    var r = rowOf(tr), n = (r.qty || 1) + (parseInt(qty, 10) || 1);
    r.qtyEl.value = String(n); fire(r.qtyEl); syncHotQty(r.name, n);
    try { tr.scrollIntoView({ block: "nearest" }); } catch (e) {}
    save();
    return tr;
  }

  // Show the Inventory "Use" button only on consumables.
  function refreshUse() {
    [].slice.call(document.querySelectorAll("#inv-body tr")).forEach(function (tr) {
      var b = tr.querySelector(".dl-use"); if (b) b.style.display = isConsumable(tr) ? "" : "none";
    });
  }
  function wire() {
    var body = document.getElementById("inv-body");
    if (body && !body.dataset.fxWired) {
      body.dataset.fxWired = "1";
      body.addEventListener("input", refreshUse);
      try { new MutationObserver(refreshUse).observe(body, { childList: true }); } catch (e) {}
    }
    refreshUse();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire); else wire();

  // Short effect line for a spell card ("Heal 2 Bars"), by Rank. Empty when the spell
  // has no automated effect worth summarising.
  function spellSummary(name, rank, src) {
    var sp = spellBy(src) || spellBy(name); if (!sp) return "";
    var R = rank || 1, t = function (a) { return rankTier(R, a); };
    switch (sp.name) {
      case "Heal": return "Heal 2 Bars";
      case "Heal Self": return R >= 15 ? "Heal to full" : "Heal " + t(["1d4", "1d6", "2d6"]) + " Bars";
      case "Heal Others": return "Ally heals " + t(["1d4", "1d6", "2d6"]) + " Bars";
      case "Heal Critter": return "Pet heals to full";
      case "Intimate Touches": return "Heal " + Math.max(1, statMod("cha")) + " Bars";
      case "Nature's Breath": return "Heal " + rankDieLabel(R) + (R >= 5 ? "+" + (R >= 15 ? 3 : R >= 10 ? 2 : 1) : "") + " Bars";
      case "Shield": return t([2, 5, 10, 15]) + " Shield slots";
      case "Hot Stuff Aura": return Math.max(1, statMod("cha")) + " Shield slots";
      case "Oakhide": return "+" + (2 + (R >= 5 ? 2 : 0) + (R >= 10 ? 2 : 0) + (R >= 15 ? 2 : 0)) + " DR";
      case "Bang Bro": return "+2" + (R >= 5 ? "+" + (R >= 15 ? 3 : R >= 10 ? 2 : 1) + "d6" : "") + " weapon damage";
    }
    return "";
  }

  window.DCCFx = {
    spellSummary: spellSummary,
    spellEffect: spellEffect, useRow: useRow, useByName: useByName, invRowByName: invRowByName,
    stackAdd: stackAdd, isConsumable: isConsumable, refreshUse: refreshUse, choose: choose,
    usable: usable,
    listable: function (name) { var it = itemBy(name), cat = (it && it.category) || ""; if (/^(weapon|armor|material|accessory|tool|mundane)$/i.test(cat) && !CONSUMABLE_RX.test(name)) return false; return (/^(consumable|scroll|tome)$/i.test(cat) || CONSUMABLE_RX.test(name)) && !NOT_LISTED_RX.test(name); },
  };
})();
