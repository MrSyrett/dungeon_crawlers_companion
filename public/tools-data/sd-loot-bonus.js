// Shadowdark item bonuses for the shared badge model (public/tools-data/loot-bonus.js).
// Magic weapons and armor carry a +N (weapon: attack & damage; armor: AC), and the
// Randomized Magic Items tables (sd-book-gen.js) add benefits / curses and spells.
(function () {
  "use strict";
  if (!window.LootBonus) return;
  function g(n) { try { return (0, eval)("typeof " + n + "!=='undefined'?" + n + ":undefined"); } catch (e) { return undefined; } }
  function arr(v) { return Array.isArray(v) ? v : []; }
  var STATS = [["str", "STR", "Strength"], ["dex", "DEX", "Dexterity"], ["con", "CON", "Constitution"], ["int", "INT", "Intelligence"], ["wis", "WIS", "Wisdom"], ["cha", "CHA", "Charisma"]];
  var DAMAGE = ["Acid", "Cold", "Fire", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder", "Bludgeoning", "Piercing", "Slashing", "Magic"];
  var KINDS = [
    { k: "plus", label: "Magic", amount: true, color: "gold", fmt: "{n} Magic", tip: "A +N weapon: +N to its attack and damage rolls. +N armor or shield: +N AC." },
    { k: "ac", label: "AC", amount: true, color: "blue", fmt: "{n} AC", tip: "+N Armor Class" },
    { k: "attack", label: "Attack", amount: true, color: "red", fmt: "{n} Attack", tip: "+N to attack rolls" },
    { k: "damage", label: "Damage", amount: true, color: "red", fmt: "{n} Damage", tip: "+N to damage rolls" },
    { k: "stat", label: "Stat", amount: true, target: "stat", color: "blue", fmt: "{n} {t}", tip: "+N to a stat" },
    { k: "hp", label: "HP", amount: true, color: "green", fmt: "{n} max HP", tip: "+N maximum Hit Points" },
    { k: "spell", label: "Spell", target: "text", color: "purple", fmt: "Spell: {t}", targetPh: "Spell name (and tier)", tip: "A spell the item holds (scroll / wand) or lets you cast", label_: function (b) { return "Spell: " + b.target; } },
    { k: "resist", label: "Resist", target: "choice", choices: DAMAGE, color: "teal", fmt: "Resist {t}", tip: "Resistance to a damage type" },
    { k: "immune", label: "Immune", target: "choice", choices: DAMAGE, color: "teal", fmt: "Immune {t}", tip: "Immunity to a damage type" },
    { k: "note", label: "Note", target: "text", color: "grey", tip: "A benefit, curse or anything the sheet can't automate — shown on the item" },
  ];
  function parse(text) {
    var t = String(text || ""), out = [], m;
    if ((m = t.match(/^\s*\+(\d)\s+[A-Za-z]/))) out.push({ kind: "plus", amount: +m[1] });
    else if ((m = t.match(/\+(\d)\s+(?:to\s+)?attack and damage/i))) out.push({ kind: "plus", amount: +m[1] });
    if ((m = t.match(/\+(\d)\s+(?:bonus\s+)?(?:to\s+)?AC\b/i))) out.push({ kind: "ac", amount: +m[1] });
    var re = /\+(\d)\s+(?:to\s+)?(STR|DEX|CON|INT|WIS|CHA|Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\b(?!\s*check)/gi;
    while ((m = re.exec(t))) out.push({ kind: "stat", target: m[2], amount: +m[1] });
    if ((m = t.match(/\+(\d)\s+(?:to\s+)?(?:max(?:imum)?\s+)?(?:HP|hit points)\b/i))) out.push({ kind: "hp", amount: +m[1] });
    var rr = /(resist(?:ance)?|immun(?:e|ity))\s+(?:to\s+)?(acid|cold|fire|lightning|necrotic|poison|psychic|radiant|thunder|bludgeoning|piercing|slashing|magic)/gi;
    while ((m = rr.exec(t))) out.push({ kind: /^immun/i.test(m[1]) ? "immune" : "resist", target: m[2].charAt(0).toUpperCase() + m[2].slice(1).toLowerCase() });
    return out;
  }
  // A magic item from the book's Randomized Magic Items tables (via SDBookGen).
  function roll(tier, cat) {
    var gen = window.SDBookGen; if (!gen || typeof gen.magicItem !== "function") return null;
    var type = cat === "weapon" ? "Weapon" : cat === "armor" ? "Armor" : undefined;
    var m = gen.magicItem(type), benefits = [];
    if (m.bonus) { var n = parseInt(String(m.bonus).replace(/[^0-9]/g, ""), 10); if (n) benefits.push({ kind: "plus", amount: n }); }
    if (m.spell) benefits.push({ kind: "spell", target: m.spell + (m.tier ? " (tier " + m.tier + ")" : "") });
    arr(m.benefits).forEach(function (x) { var p = parse(x); if (p.length) benefits = benefits.concat(p); else benefits.push({ kind: "note", target: "Benefit: " + x }); });
    arr(m.curses).forEach(function (x) { benefits.push({ kind: "note", target: "Curse: " + x }); });
    return { name: m.name, notes: m.feature || "", benefits: benefits };
  }
  // Re-roll an existing weapon / armor's magic (the book's bonus, benefits and curses).
  function enchant(tier, cat) {
    var r = roll(tier, cat === "weapon" || cat === "armor" ? cat : "weapon"); if (!r) return [];
    var b = r.benefits.filter(function (x) { return x.kind !== "spell"; });
    if (!b.some(function (x) { return x.kind === "plus"; }) && (cat === "weapon" || cat === "armor")) {
      var t = String(tier || "1"); b.unshift({ kind: "plus", amount: t === "10" ? 3 : t === "7" ? 2 : 1 });
    }
    return b;
  }
  window.LootBonus.register("sd", { stats: STATS, kinds: KINDS, fromText: parse, roll: roll, enchant: enchant, lists: {} });
})();
