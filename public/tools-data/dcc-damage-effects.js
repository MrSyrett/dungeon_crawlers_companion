// ── DCC Damage Effects ────────────────────────────────────────────────────────
// A Damage Effect is a passive Skill (Core p.180) that changes what an Attack does
// when you choose it "before rolling to hit": Skullcracker on a Noggin Nocker
// headbutt, Powerful Strike on a kick or punch, Toss on a Wrasslin' hold. Having
// the Skill on your sheet gives each COMPATIBLE attack an extra roll option — the
// DCC take on another system's Sneak Attack.
//
// Compatibility follows the book: each effect names the attacks it works with
// ("A Noggin Nocker Damage Effect"), and those attacks name it back. A homebrew
// Damage Effect (components/hb/dcc/SkillBuilder, stored on the skill as `effect`)
// can instead pick whole weapon GROUPS (Edged, Bashing, Reach, Ranged, Hand-to-
// Hand…) and/or specific attack skills — e.g. a "Backstab" for every Edged weapon.
//
// THE SHAPE (book and homebrew alike):
//   { name, attacks: [skill names], groups: [skill groups], condition: "",
//     tiers: [{ rank, dice: "1d4"|"", rankDice: 0, mult: 0|2|3|"rank", multOf: "base"|"total",
//               stat: ""|"str"…, debuffs: [names], note: "", cooldown: "" }] }
// Each tier is the WHOLE effect from that Rank up (not a delta), so the sheet just
// takes the highest tier at or below the Damage Effect's own Rank.
//   dice      extra base damage dice (base damage → doubled on a Critical Hit)
//   rankDice  extra Rank damage dice (Table 37, at the Damage Effect's Rank)
//   mult      multiply the base damage dice result ("rank" = by the effect's Rank)
//             or the whole total (multOf "total")
//   stat      a Stat Mod added to damage (Toss: + STR)
//   debuffs   what the target gains on a hit — logged for the GM
//   condition when the effect applies ("Target is your size") — the player chooses
//             it, so the sheet trusts them and shows the condition in the log
(function () {
  "use strict";

  var BOOK = [
    { name: "Skullcracker", attacks: ["Noggin Nocker"], condition: "Target is the same size as you",
      tiers: [
        { rank: 0, dice: "1d4" },
        { rank: 5, dice: "2d4" },
        { rank: 10, dice: "2d4", rankDice: 1, debuffs: ["Stunned"] },
        { rank: 15, dice: "2d4", rankDice: 2, debuffs: ["Stunned", "Blood Trail"] },
      ] },
    { name: "Iron Punch", attacks: ["Pugilism"],
      tiers: [
        { rank: 0, dice: "1d2" },
        { rank: 5, dice: "1d2", rankDice: 1 },
        { rank: 10, dice: "1d2", rankDice: 1, note: "You may give the target Stunned instead of rolling damage" },
        { rank: 15, dice: "1d2", rankDice: 2, debuffs: ["Stunned"] },
      ] },
    { name: "Powerful Strike", attacks: ["Foot Soldier", "Noggin Nocker", "Pugilism"],
      tiers: [
        { rank: 0, mult: "rank", multOf: "base", cooldown: "30 hours" },
        { rank: 5, mult: "rank", multOf: "base", cooldown: "10 hours" },
        { rank: 10, mult: "rank", multOf: "base", cooldown: "5 hours" },
        { rank: 15, mult: "rank", multOf: "base", cooldown: "2 hours" },
      ] },
    { name: "Dirty Fighting", attacks: ["Pugilism", "Wrasslin'"],
      tiers: [
        { rank: 0, debuffs: ["Woozy"], note: "Critical Fail: lose 1 Popularity" },
        { rank: 5, debuffs: ["Woozy", "The Taint"], note: "Critical Fail: lose 1 Popularity" },
        { rank: 10, debuffs: ["Woozy", "The Taint", "Blinded"] },
        { rank: 15, debuffs: ["Woozy", "The Taint", "Blinded", "Minor Injury"] },
      ] },
    { name: "Choke Out", attacks: ["Wrasslin'"],
      tiers: [
        { rank: 0, mult: 2, multOf: "total", cond: "Target at 10% Health Bar or less" },
        { rank: 5, mult: 2, multOf: "total", cond: "Target at 20% Health Bar or less" },
        { rank: 10, mult: 4, multOf: "total", cond: "Target at 40% Health Bar or less" },
        { rank: 15, mult: 8, multOf: "total", cond: "Target at 80% Health Bar or less" },
      ] },
    { name: "Smush", attacks: ["Foot Soldier"],
      tiers: [
        { rank: 0, mult: 2, multOf: "total", cond: "Target at 20% Health Bar or less", note: "Has a cooldown" },
        { rank: 5, mult: 3, multOf: "total", cond: "Target at 30% Health Bar or less", note: "Has a cooldown" },
        { rank: 10, mult: 3, multOf: "total", cond: "Target at 30% Health Bar or less", note: "No cooldown" },
        { rank: 15, mult: 4, multOf: "total", cond: "Target at 40% Health Bar or less", note: "No cooldown" },
      ] },
    { name: "Toss", attacks: ["Wrasslin'"],
      tiers: [
        { rank: 0, dice: "1d8", stat: "str", debuffsEnd: ["Held"], toss: true, cond: "Target smaller than you" },
        { rank: 5, dice: "1d8", stat: "str", debuffsEnd: ["Held"], toss: true, cond: "Target your size or smaller" },
        { rank: 10, dice: "1d8", stat: "str", debuffsEnd: ["Held"], toss: true, cond: "Target up to one size larger" },
        { rank: 15, dice: "2d8", stat: "str", debuffsEnd: ["Held"], toss: true, cond: "Target up to two sizes larger" },
      ] },
  ];
  // ATTACK OPTIONS from other skills: not Damage Effects, but the same idea — a skill
  // that changes an attack when you choose to use it. `minRank` = the option only
  // exists from that Rank. Tier extras: adv / dis (the attack roll), hitRank (add
  // this skill's Rank to the Attack Check), flat (extra damage dice that are NOT base
  // damage, so not doubled on a Critical Hit).
  var OPTIONS = [
    // "When making a Ranged Attack, you can add your Ranks in this Skill to your Attack
    // Skill Check if you choose to make the Check with Disadvantage. On Success, add 1d4
    // to the damage." R5 +1d4 damage, R10/R15 +1d4 base damage each.
    { name: "Aiming", groups: ["Ranged"], option: true,
      tiers: [
        { rank: 0, dis: true, hitRank: true, flat: "1d4" },
        { rank: 5, dis: true, hitRank: true, flat: "2d4" },
        { rank: 10, dis: true, hitRank: true, flat: "2d4", dice: "1d4" },
        { rank: 15, dis: true, hitRank: true, flat: "2d4", dice: "2d4" },
      ] },
    // A surprise Attack (after winning the Ambush Check): unseen, so with Advantage;
    // R5+ adds an Ambush Rank damage die.
    { name: "Ambush", groups: ["Edged", "Bashing", "Ranged", "Reach", "Hand-to-Hand", "Animal/Pet Strike"], option: true,
      condition: "Your surprise Action, after winning the Ambush Check",
      tiers: [
        { rank: 0, adv: true },
        { rank: 5, adv: true, rankDice: 1 },
      ] },
    // R10: "Add 1 Cesta Punta Rank damage die to thrown damaging Attacks."
    { name: "Cesta Punta", option: true, minRank: 10, condition: "Thrown with the xistera",
      attacks: ["Javelin", "Shuriken", "Throwing Knives", "Boomerang", "Bolas", "Throwing Hammer", "Molotov Cocktail"],
      tiers: [{ rank: 10, rankDice: 1 }] },
    // R5: "Your Pugilism and Slice Attacks with the Paw add 1 Astral Paw Rank damage die."
    { name: "Astral Paw", option: true, minRank: 5, condition: "Attacking with the conjured Paw",
      attacks: ["Pugilism", "Slice Attack"],
      tiers: [{ rank: 5, rankDice: 1 }] },
  ];
  BOOK = BOOK.concat(OPTIONS);

  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function arr(v) { return Array.isArray(v) ? v : []; }

  // A homebrew Damage Effect skill → the shape above. Homebrew stores `effect`
  // (lib/homebrew.ts normalizeDccEffect); anything malformed is dropped.
  function fromHomebrew(sk) {
    if (!sk || !sk.name || !sk.effect || typeof sk.effect !== "object") return null;
    var e = sk.effect;
    var tiers = arr(e.tiers).map(function (t) {
      return { rank: Math.max(0, parseInt(t.rank, 10) || 0), dice: String(t.dice || ""), rankDice: Math.max(0, parseInt(t.rankDice, 10) || 0),
        mult: t.mult === "rank" ? "rank" : (parseInt(t.mult, 10) || 0), multOf: t.multOf === "total" ? "total" : "base",
        stat: String(t.stat || "").toLowerCase(), debuffs: arr(t.debuffs).map(String), note: String(t.note || "") };
    }).sort(function (a, b) { return a.rank - b.rank; });
    if (!tiers.length) return null;
    return { name: String(sk.name), attacks: arr(e.attacks).map(String), groups: arr(e.groups).map(String),
      condition: String(e.condition || ""), tiers: tiers, homebrew: true };
  }
  function homebrew() {
    var hb = Array.isArray(window.__DCC_HB_SKILLS) ? window.__DCC_HB_SKILLS : [];
    return hb.map(fromHomebrew).filter(Boolean);
  }
  // Every known Damage Effect. A homebrew skill with a book effect's name wins.
  function all() {
    var hb = homebrew(), seen = {};
    hb.forEach(function (x) { seen[norm(x.name)] = 1; });
    return hb.concat(BOOK.filter(function (x) { return !seen[norm(x.name)]; }));
  }
  function find(name) { var k = norm(name); if (!k) return null; return all().find(function (x) { return norm(x.name) === k; }) || null; }
  function isEffect(name) { return !!find(name); }

  // The rulebook / homebrew attack skill behind a Skills row (by its stored source,
  // then its name) — for its name and group.
  function attackEntry(tr) {
    var t = tr.querySelector('input[type="text"]');
    var keys = [tr.dataset && tr.dataset.src, t ? t.value : ""].filter(Boolean);
    var lists = [];
    try { if (typeof DCC_SKILLS !== "undefined") lists = lists.concat(DCC_SKILLS); } catch (e) {}
    if (Array.isArray(window.__DCC_HB_SKILLS)) lists = window.__DCC_HB_SKILLS.concat(lists);
    for (var i = 0; i < keys.length; i++) {
      var k = norm(keys[i]);
      var hit = lists.find(function (s) { return s && norm(s.name) === k; });
      if (hit) return hit;
    }
    return null;
  }
  function rowRank(tr) { var t = tr.querySelectorAll('input[type="text"]'); var n = parseInt(t[1] ? t[1].value : "", 10); return isNaN(n) ? 0 : n; }

  // The Damage Effect skills on this sheet: [{ fx, rank, tr }].
  function owned() {
    var out = [];
    [].slice.call(document.querySelectorAll("#skills-body tr")).forEach(function (tr) {
      var t = tr.querySelector('input[type="text"]');
      var fx = find(tr.dataset && tr.dataset.src) || find(t ? t.value : "");
      if (fx && !out.some(function (o) { return o.fx.name === fx.name; })) out.push({ fx: fx, rank: rowRank(tr), tr: tr });
    });
    return out;
  }
  // Which owned Damage Effects this attack row can use.
  function forAttack(tr) {
    var e = attackEntry(tr);
    var t = tr.querySelector('input[type="text"]');
    var names = [norm(tr.dataset && tr.dataset.src), norm(t ? t.value : ""), e ? norm(e.name) : ""].filter(Boolean);
    var group = e && e.group ? norm(e.group) : "";
    // "Cannot choose a Damage Effect" (Unarmed Combat) shuts every effect out.
    var noFx = e && /cannot choose a damage effect/i.test(String(e.desc || "") + " " + String(e.limitations || ""));
    if (e && norm(e.group) === "damageeffect") return [];
    return owned().filter(function (o) {
      var fx = o.fx;
      if (o.rank < (fx.minRank || 0)) return false;
      if (noFx && !fx.option) return false;   // "Cannot choose a Damage Effect" — other options still apply
      if (arr(fx.attacks).some(function (a) { return names.indexOf(norm(a)) >= 0; })) return true;
      return !!group && arr(fx.groups).some(function (g) { return norm(g) === group; });
    });
  }
  function tierAt(fx, rank) {
    var best = null;
    arr(fx.tiers).forEach(function (t) { if (t.rank <= rank && (!best || t.rank >= best.rank)) best = t; });
    return best || arr(fx.tiers)[0] || null;
  }
  // One line for a button title / Turn card: what choosing it does at this Rank.
  function summary(fx, rank) {
    var t = tierAt(fx, rank); if (!t) return "";
    var bits = [];
    if (t.adv) bits.push("Advantage");
    if (t.dis) bits.push("Disadvantage");
    if (t.hitRank) bits.push("+" + rank + " to hit (Rank)");
    if (t.flat) bits.push("+" + t.flat + " damage");
    if (t.dice) bits.push("+" + t.dice + " base damage");
    if (t.rankDice) bits.push("+" + (t.rankDice > 1 ? t.rankDice + "× " : "") + "Rank die");
    if (t.stat) bits.push("+" + t.stat.toUpperCase());
    if (t.mult === "rank") bits.push("base dice ×" + Math.max(1, rank) + " (Rank)");
    else if (t.mult) bits.push("×" + t.mult + (t.multOf === "total" ? " total damage" : " base dice"));
    if (arr(t.debuffs).length) bits.push("target gains " + t.debuffs.join(", "));
    if (t.toss) bits.push("throw " + tossFeet(rank) + " ft, ends Held");
    var cond = t.cond || fx.condition;
    if (t.cooldown) bits.push("cooldown " + t.cooldown);
    return bits.join(" · ") + (cond ? " — if: " + cond : "") + (t.note ? " (" + t.note + ")" : "");
  }
  function tossFeet(rank) { return Math.max(5, Math.floor((parseInt(rank, 10) || 0) / 5) * 5); }

  window.DCCDmgFx = { BOOK: BOOK, all: all, find: find, isEffect: isEffect, owned: owned, forAttack: forAttack,
    tierAt: tierAt, summary: summary, tossFeet: tossFeet, attackEntry: attackEntry };
  // The sheet may already have linked its attacks before this loaded — draw the buttons now.
  try { if (typeof window.syncLinkedAttacks === "function") window.syncLinkedAttacks(); } catch (e) {}
})();
