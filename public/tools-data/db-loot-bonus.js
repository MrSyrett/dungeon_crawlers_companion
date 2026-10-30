// Dragonbane item bonuses for the shared badge model (loot-bonus.js). In Dragonbane
// a magic item is an item with an Enchanting spell bound to it (Book of Magic), so
// the main badge is the enchantment + power level. The automatable ones expand
// (LootBonus.effective) into plain kinds: Epic Armor → +armor, Epic Weapon →
// +2 damage per level, Fleet Step → +4 Movement, Power Item → +2 max WP, Concealing
// → boon on Sneaking, Warming / Fireproof → armor vs cold / fire.
(function () {
  "use strict";
  if (!window.LootBonus) return;
  function g(n) { try { return (0, eval)("typeof " + n + "!=='undefined'?" + n + ":undefined"); } catch (e) { return undefined; } }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function pick(a) { return a && a.length ? a[Math.floor(Math.random() * a.length)] : null; }
  function ench() { return arr(g("DB_SPELLS")).filter(function (s) { return s.school === "Enchanting"; }); }
  var STATS = [["str", "STR", "Strength"], ["con", "CON", "Constitution"], ["agl", "AGL", "Agility"], ["int", "INT", "Intelligence"], ["wil", "WIL", "Willpower"], ["cha", "CHA", "Charisma"]];
  var KINDS = [
    { k: "enchant", label: "Enchantment", target: "list:enchant", amount: true, optAmount: true, amountPh: "Power level", color: "purple", tip: "An Enchanting spell bound to the item, with its power level", label_: function (b) { return b.target + (b.amount > 1 ? " " + b.amount : ""); } },
    { k: "armor", label: "Armor", amount: true, color: "blue", fmt: "{n} Armor", tip: "+N armor rating while worn" },
    { k: "damage", label: "Damage", amount: true, color: "red", fmt: "{n} Damage", tip: "+N damage with this weapon" },
    { k: "boon", label: "Boon", target: "list:skill", color: "green", fmt: "Boon: {t}", tip: "A boon on rolls with a skill" },
    { k: "resist", label: "Resist", target: "choice", choices: ["Cold", "Fire"], amount: true, color: "teal", fmt: "Armor {n} vs {t}", tip: "Extra armor rating against a damage type" },
    { k: "move", label: "Movement", amount: true, color: "gold", fmt: "{n} Movement", tip: "+N Movement" },
    { k: "wp", label: "WP", amount: true, color: "purple", fmt: "{n} max WP", tip: "+N maximum Willpower Points" },
    { k: "hp", label: "HP", amount: true, color: "green", fmt: "{n} max HP", tip: "+N maximum Hit Points" },
    { k: "note", label: "Note", target: "text", color: "grey", tip: "Anything the sheet can't automate — shown on the item" },
  ];
  function expand(b) {
    if (b.kind !== "enchant") return null;
    var pl = Math.max(1, b.amount || 1), n = String(b.target || "").toLowerCase();
    if (n === "epic armor") return [{ kind: "armor", amount: pl }];
    if (n === "epic weapon") return [{ kind: "damage", amount: 2 * pl }];
    if (n === "fleet step") return [{ kind: "move", amount: 4 * pl }];
    if (n === "power item") return [{ kind: "wp", amount: 2 * pl }];
    if (n === "concealing") return [{ kind: "boon", target: "Sneaking" }];
    if (n === "warming") return [{ kind: "resist", target: "Cold", amount: 6 * pl }];
    if (n === "fireproof") return [{ kind: "resist", target: "Fire", amount: 6 * pl }];
    return [b];
  }
  function parse(text) {
    var t = String(text || ""), out = [], m;
    ench().forEach(function (s) { if (new RegExp("\\b" + s.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(t)) out.push({ kind: "enchant", target: s.name }); });
    if ((m = t.match(/\+(\d+)\s+armor/i))) out.push({ kind: "armor", amount: +m[1] });
    if ((m = t.match(/\+(\d+)\s+damage/i))) out.push({ kind: "damage", amount: +m[1] });
    return out;
  }
  function fits(s, cat) {
    var w = String(s.text || "");
    if (cat === "weapon") return /weapon|quiver|slashing|piercing|bludgeoning|sling|bow/i.test(w.slice(0, 80));
    if (cat === "armor") return /armor|clothing|helmet|headwear|hat/i.test(w.slice(0, 80));
    return true;
  }
  function enchant(tier, cat) {
    var pool = ench().filter(function (s) { return fits(s, cat); }); var s = pick(pool.length ? pool : ench()); if (!s) return [];
    var pl = s.powerLevels === false ? 1 : 1 + (Math.random() < 0.3 ? 1 : 0);
    return [{ kind: "enchant", target: s.name, amount: pl }];
  }
  function roll(tier, cat) { var b = enchant(tier, cat); return b.length ? { name: "", notes: "", benefits: b } : null; }
  window.LootBonus.register("db", {
    stats: STATS, kinds: KINDS, fromText: parse, roll: roll, enchant: enchant, expand: expand,
    lists: {
      enchant: function () { return ench().map(function (s) { return { name: s.name, meta: "Rank " + s.rank + " · " + String(s.text || "").slice(0, 50) }; }); },
      skill: function () { return arr(g("DB_SKILLS")).map(function (s) { return { name: s.name, meta: s.attribute || "" }; }); },
    },
  });
})();
