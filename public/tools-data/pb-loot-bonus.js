// Pirate Borg item bonuses for the shared badge model (loot-bonus.js). Items can
// raise an ability, attack / damage / defense, the armor tier and HP, or carry an
// Ancient Relic or Arcane Ritual (shown, used from the sheet as usual).
(function () {
  "use strict";
  if (!window.LootBonus) return;
  function g(n) { try { return (0, eval)("typeof " + n + "!=='undefined'?" + n + ":undefined"); } catch (e) { return undefined; } }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function pick(a) { return a && a.length ? a[Math.floor(Math.random() * a.length)] : null; }
  var STATS = [["str", "STR", "Strength"], ["agi", "AGI", "Agility"], ["pre", "PRE", "Presence"], ["tou", "TGH", "Toughness"], ["spi", "SPI", "Spirit"]];
  var KINDS = [
    { k: "stat", label: "Ability", amount: true, target: "stat", color: "blue", fmt: "{n} {t}", tip: "+N to an ability" },
    { k: "attack", label: "Attack", amount: true, color: "red", fmt: "{n} Attack", tip: "+N to attack tests (this weapon, or all if not a weapon)" },
    { k: "damage", label: "Damage", amount: true, color: "red", fmt: "{n} Damage", tip: "+N damage (this weapon, or all if not a weapon)" },
    { k: "defense", label: "Defense", amount: true, color: "teal", fmt: "{n} Defense", tip: "+N to defense tests" },
    { k: "armor", label: "Armor tier", amount: true, color: "blue", fmt: "{n} Armor tier", tip: "+N armor tier (max tier 3) while worn" },
    { k: "hp", label: "HP", amount: true, color: "green", fmt: "{n} max HP", tip: "+N maximum HP" },
    { k: "relic", label: "Relic", target: "list:relic", color: "purple", fmt: "Relic: {t}", tip: "The item holds an Ancient Relic's power" },
    { k: "ritual", label: "Ritual", target: "list:ritual", color: "purple", fmt: "Ritual: {t}", tip: "The item lets you cast an Arcane Ritual" },
    { k: "note", label: "Note", target: "text", color: "grey", tip: "Anything the sheet can't automate — shown on the item" },
  ];
  function parse(text) {
    var t = String(text || ""), out = [], m;
    var re = /([+-]\d+)\s+(?:to\s+)?(STR|AGI|PRE|TGH|TOU|SPI|Strength|Agility|Presence|Toughness|Spirit)\b(?!\s+test)/gi;
    while ((m = re.exec(t))) out.push({ kind: "stat", target: /^tou/i.test(m[2]) ? "tou" : m[2], amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+to\s+attack/i))) out.push({ kind: "attack", amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+(?:to\s+)?damage/i))) out.push({ kind: "damage", amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+(?:to\s+)?defen[cs]e/i))) out.push({ kind: "defense", amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+(?:max(?:imum)?\s+)?HP\b/i))) out.push({ kind: "hp", amount: +m[1] });
    return out;
  }
  function enchant(tier, cat) {
    if (cat === "armor") return [{ kind: "armor", amount: 1 }];
    if (cat === "weapon") return pick([[{ kind: "attack", amount: 1 }], [{ kind: "damage", amount: 1 }], [{ kind: "attack", amount: 1 }, { kind: "damage", amount: 1 }]]);
    var r = pick(arr(g("PB_RELICS"))); return r ? [{ kind: "relic", target: r.name }] : [{ kind: "defense", amount: 1 }];
  }
  function roll(tier, cat) {
    var r = pick(arr(g("PB_RELICS"))); if (!r) return null;
    return { name: r.name, notes: "Ancient relic · " + (r.text || ""), benefits: [{ kind: "relic", target: r.name }] };
  }
  window.LootBonus.register("pb", {
    stats: STATS, kinds: KINDS, fromText: parse, roll: roll, enchant: enchant,
    lists: {
      relic: function () { return arr(g("PB_RELICS")).map(function (r) { return { name: r.name, meta: String(r.text || "").slice(0, 60) }; }); },
      ritual: function () { return arr(g("PB_RITUALS")).map(function (r) { return { name: r.name, meta: String(r.text || "").slice(0, 60) }; }); },
    },
  });
})();
