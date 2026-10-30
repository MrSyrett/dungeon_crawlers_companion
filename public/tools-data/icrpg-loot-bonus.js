// ICRPG item bonuses for the shared badge model (loot-bonus.js). ICRPG LOOT is
// all about flat bonuses: +N to a STAT, +N DEFENSE, +N to an EFFORT, +N HEARTS,
// plus spells — the loot tables' "effects" read straight into these badges.
(function () {
  "use strict";
  if (!window.LootBonus) return;
  function g(n) { try { return (0, eval)("typeof " + n + "!=='undefined'?" + n + ":undefined"); } catch (e) { return undefined; } }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function pick(a) { return a && a.length ? a[Math.floor(Math.random() * a.length)] : null; }
  var STATS = [["str", "STR", "Strength"], ["dex", "DEX", "Dexterity"], ["con", "CON", "Constitution"], ["int", "INT", "Intelligence"], ["wis", "WIS", "Wisdom"], ["cha", "CHA", "Charisma"]];
  var EFFORTS = ["Basic", "Weapons & Tools", "Guns", "Magic & Energy", "Ultimate", "All"];
  var KINDS = [
    { k: "stat", label: "Stat", amount: true, target: "stat", color: "blue", fmt: "{n} {t}", tip: "+N to a STAT" },
    { k: "allstats", label: "All Stats", amount: true, color: "blue", fmt: "{n} all STATS", tip: "+N to every STAT (every ATTEMPT)" },
    { k: "def", label: "Defense", amount: true, color: "teal", fmt: "{n} DEFENSE", tip: "+N DEFENSE" },
    { k: "effort", label: "Effort", amount: true, target: "choice", choices: EFFORTS, color: "red", fmt: "{n} {t} EFFORT", tip: "+N to an EFFORT die's result. On a weapon it powers that weapon's attacks only (its own EFFORT or ULTIMATE); on other items it applies to every roll of that EFFORT" },
    { k: "heart", label: "Hearts", amount: true, color: "green", fmt: "{n} HEART", tip: "+N HEARTS (10 HP each)" },
    { k: "spell", label: "Spell", target: "list:spell", color: "purple", fmt: "Spell: {t}", tip: "A spell the item holds or lets you cast" },
    { k: "note", label: "Note", target: "text", color: "grey", tip: "Anything the sheet can't automate — shown on the item" },
  ];
  function parse(text) {
    var t = String(text || ""), out = [], m;
    var re = /([+-]\d+)\s+(STR|DEX|CON|INT|WIS|CHA)\b/gi;
    while ((m = re.exec(t))) out.push({ kind: "stat", target: m[2], amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+all\s+STATS/i)) || (m = t.match(/([+-]\d+)\s+ATTEMPTS?\b/i))) out.push({ kind: "allstats", amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+DEF(?:ENSE)?\b/i))) out.push({ kind: "def", amount: +m[1] });
    if ((m = t.match(/([+-]\d+)\s+HEARTS?\b/i))) out.push({ kind: "heart", amount: +m[1] });
    var ef = [[/WEAPONS?\s+EFFORT/i, "Weapons & Tools"], [/GUNS?\s+EFFORT/i, "Guns"], [/MAGIC\s+EFFORT/i, "Magic & Energy"], [/ULTIMATE\s+EFFORT/i, "Ultimate"], [/BASIC\s+EFFORT/i, "Basic"]];
    var hit = false;
    ef.forEach(function (e) { var r = new RegExp("([+-]\\d+)\\s+" + e[0].source, "i"), mm = t.match(r); if (mm) { hit = true; out.push({ kind: "effort", target: e[1], amount: +mm[1] }); } });
    if (!hit && (m = t.match(/([+-]\d+)\s+(?:ATTEMPT\/)?EFFORT\b/i))) out.push({ kind: "effort", target: "All", amount: +m[1] });
    return out;
  }
  function withEffects() { return arr(g("ICRPG_LOOT")).filter(function (l) { return arr(l.effects).some(function (e) { return /^[+-]\d+\s/.test(e); }); }); }
  function roll(tier, cat) {
    var l = pick(withEffects()); if (!l) return null;
    return { name: l.name, notes: [l.table, l.desc].filter(Boolean).join(" · ").slice(0, 160), benefits: parse(arr(l.effects).join("; ")) };
  }
  function enchant(tier, cat) {
    if (cat === "armor") return [{ kind: "def", amount: 1 + (Math.random() < 0.3 ? 1 : 0) }];
    if (cat === "weapon") return [{ kind: "effort", target: "Weapons & Tools", amount: 1 + (Math.random() < 0.3 ? 1 : 0) }];
    var l = pick(withEffects()); return l ? parse(arr(l.effects).join("; ")) : [];
  }
  window.LootBonus.register("icrpg", {
    stats: STATS, kinds: KINDS, fromText: parse, roll: roll, enchant: enchant,
    lists: { spell: function () { return arr(g("ICRPG_SPELLS")).map(function (s) { return { name: s.name, meta: s.school || "" }; }); } },
  });
})();
