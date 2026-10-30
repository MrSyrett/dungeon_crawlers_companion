// Nimble item bonuses for the shared badge model (loot-bonus.js). Nimble's magic
// items give flat Armor, extra damage (flat or an extra die), save and stat
// bonuses, and hold spells (scrolls / wands).
(function () {
  "use strict";
  if (!window.LootBonus) return;
  function g(n) { try { return (0, eval)("typeof " + n + "!=='undefined'?" + n + ":undefined"); } catch (e) { return undefined; } }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function pick(a) { return a && a.length ? a[Math.floor(Math.random() * a.length)] : null; }
  var STATS = [["str", "STR", "Strength"], ["dex", "DEX", "Dexterity"], ["int", "INT", "Intelligence"], ["wil", "WIL", "Will"]];
  var DICE = ["d4", "d6", "d8", "d10", "d12"];
  var KINDS = [
    { k: "armor", label: "Armor", amount: true, color: "blue", fmt: "{n} Armor", tip: "+N Armor while worn" },
    { k: "damage", label: "Damage", amount: true, color: "red", fmt: "{n} Damage", tip: "+N damage with this weapon" },
    { k: "die", label: "Extra die", target: "choice", choices: DICE, color: "red", fmt: "+1{t} Damage", tip: "Roll an extra die of damage with this weapon" },
    { k: "stat", label: "Stat", amount: true, target: "stat", color: "blue", fmt: "{n} {t}", tip: "+N to a stat" },
    { k: "save", label: "Saves", amount: true, color: "blue", fmt: "{n} Saves", tip: "+N to all saves" },
    { k: "hp", label: "HP", amount: true, color: "green", fmt: "{n} max HP", tip: "+N maximum Hit Points" },
    { k: "speed", label: "Speed", amount: true, color: "gold", fmt: "{n} Speed", tip: "+N Speed (spaces)" },
    { k: "spell", label: "Spell", target: "list:spell", color: "purple", fmt: "Spell: {t}", tip: "A spell the item holds or lets you cast" },
    { k: "note", label: "Note", target: "text", color: "grey", tip: "Anything the sheet can't automate — shown on the item" },
  ];
  function parse(text) {
    var t = String(text || ""), out = [], m;
    if ((m = t.match(/\+(\d+)\s+Armor\b/i))) out.push({ kind: "armor", amount: +m[1] });
    if ((m = t.match(/\+(\d+)\s+(?:to\s+)?damage\b/i))) out.push({ kind: "damage", amount: +m[1] });
    if ((m = t.match(/(?:additional|extra|\+1)\s*(d4|d6|d8|d10|d12)\b(?:[^.]*damage)?/i)) && /damage/i.test(t)) out.push({ kind: "die", target: m[1].toLowerCase() });
    if ((m = t.match(/([+–−-]\d+)\s+to\s+(?:the\s+)?saves/i))) out.push({ kind: "save", amount: parseInt(m[1].replace(/[–−]/, "-"), 10) });
    var re = /\+(\d+)\s+(STR|DEX|INT|WIL|Strength|Dexterity|Intelligence|Will)\b/gi;
    while ((m = re.exec(t))) out.push({ kind: "stat", target: m[2], amount: +m[1] });
    if ((m = t.match(/\+(\d+)\s+(?:max(?:imum)?\s+)?(?:HP|hit points)\b/i))) out.push({ kind: "hp", amount: +m[1] });
    if ((m = t.match(/\+(\d+)\s+speed\b/i))) out.push({ kind: "speed", amount: +m[1] });
    return out;
  }
  function plusFor(tier) { var t = String(tier || "1"); return t === "10" ? 3 : t === "7" ? 2 : t === "4" ? 1 + (Math.random() < 0.5 ? 1 : 0) : 1; }
  function enchant(tier, cat) {
    var n = plusFor(tier);
    if (cat === "armor") return [{ kind: "armor", amount: n }];
    if (cat === "weapon") return Math.random() < 0.5 ? [{ kind: "damage", amount: n }] : [{ kind: "die", target: DICE[Math.min(4, n - 1 + Math.floor(Math.random() * 2))] }];
    var sp = pick(arr(g("NIMBLE_SPELLS")));
    return pick([[{ kind: "save", amount: 1 }], [{ kind: "hp", amount: 2 * n }], [{ kind: "speed", amount: 1 }], sp ? [{ kind: "spell", target: sp.name }] : [{ kind: "save", amount: 1 }]]);
  }
  function roll(tier, cat) {
    var items = arr(g("NIMBLE_ITEMS")).filter(function (x) { return /Magic Item|Wand|Spell Scroll/.test(x.category); });
    var it = pick(items); if (!it) return null;
    return { name: it.name, notes: [it.rarity, it.category].filter(Boolean).join(" · "), benefits: parse(it.description) };
  }
  window.LootBonus.register("nim", {
    stats: STATS, kinds: KINDS, fromText: parse, roll: roll, enchant: enchant,
    lists: { spell: function () { return arr(g("NIMBLE_SPELLS")).map(function (s) { return { name: s.name, meta: [s.school, s.tier != null ? (s.tier ? "Tier " + s.tier : "Cantrip") : ""].filter(Boolean).join(" · ") }; }); } },
  });
})();
