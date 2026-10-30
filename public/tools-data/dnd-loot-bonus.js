// D&D 2024 item bonuses for the shared badge model (public/tools-data/loot-bonus.js).
// Registers "dnd" and — with the same 5e mechanics — "lotr" (The Lord of the Rings
// 5e), which differs only in its stats list being the same, no spells, and its
// Enchanted Rewards as the magic-item roll.
(function () {
  "use strict";
  if (!window.LootBonus) return;
  function g(n) { try { return (0, eval)("typeof " + n + "!=='undefined'?" + n + ":undefined"); } catch (e) { return undefined; } }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function pick(a) { return a && a.length ? a[Math.floor(Math.random() * a.length)] : null; }
  var STATS = [["str", "STR", "Strength"], ["dex", "DEX", "Dexterity"], ["con", "CON", "Constitution"], ["int", "INT", "Intelligence"], ["wis", "WIS", "Wisdom"], ["cha", "CHA", "Charisma"]];
  var DAMAGE = ["Acid", "Bludgeoning", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Piercing", "Poison", "Psychic", "Radiant", "Slashing", "Thunder"];
  var STAT_FULL = { strength: "str", dexterity: "dex", constitution: "con", intelligence: "int", wisdom: "wis", charisma: "cha" };

  function kinds(withSpells) {
    var k = [
      { k: "plus", label: "Magic", amount: true, color: "gold", fmt: "{n} Magic", tip: "A +N weapon: +N to its attack and damage rolls. +N armor or shield: +N AC." },
      { k: "ac", label: "AC", amount: true, color: "blue", fmt: "{n} AC", tip: "+N Armor Class" },
      { k: "attack", label: "Attack", amount: true, color: "red", fmt: "{n} Attack", tip: "+N to attack rolls" },
      { k: "damage", label: "Damage", amount: true, color: "red", fmt: "{n} Damage", tip: "+N to damage rolls" },
      { k: "save", label: "Saves", amount: true, color: "blue", fmt: "{n} Saves", tip: "+N to all saving throws" },
      { k: "stat", label: "Stat", amount: true, target: "stat", color: "blue", fmt: "{n} {t}", tip: "+N to an ability score" },
      { k: "setstat", label: "Set Stat", amount: true, target: "stat", color: "blue", amountPh: "score", tip: "The ability score becomes N while worn (if it's lower)", label_: function (b, cfg) { var s = cfg.stats.find(function (x) { return x[0] === b.target; }); return (s ? s[1] : b.target) + " " + b.amount; } },
      { k: "resist", label: "Resist", target: "choice", choices: DAMAGE, color: "teal", fmt: "Resist {t}", tip: "Resistance to a damage type" },
      { k: "speed", label: "Speed", amount: true, color: "gold", fmt: "{n} ft Speed", tip: "+N feet of Speed" },
    ];
    if (withSpells) k.push({ k: "spell", label: "Spell", target: "list:spell", color: "purple", fmt: "Spell: {t}", tip: "A spell the item lets you cast" });
    k.push({ k: "note", label: "Note", target: "text", color: "grey", tip: "Anything the sheet can't automate — shown on the item, not applied" });
    return k;
  }

  // Read the automatable bonuses out of a 5e item's name + description.
  function parse(text) {
    var t = String(text || ""), out = [], m;
    var plus = t.match(/(?:^|[\s(,])(?:Weapon|Armor|Armour|Shield|Ammunition)\s*,\s*\+(\d)\b/i) || t.match(/^\s*\+(\d)\s+[A-Z]/) || t.match(/\+(\d)\s+bonus to attack and damage rolls/i) || t.match(/\+(\d)\s+(?:to\s+)?attack and damage\b/i);
    if (plus) out.push({ kind: "plus", amount: +plus[1] });
    var acm = t.match(/\+(\d)\s+bonus to (?:your )?(?:AC|Armor Class)\b/i) || t.match(/\+(\d)\s+AC\b/i);
    if (acm && !(plus && /armor|armour|shield/i.test(t.slice(0, 40)))) out.push({ kind: "ac", amount: +acm[1] });
    if ((m = t.match(/\+(\d)\s+bonus to (?:(?:your )?(?:AC|Armor Class) and )?(?:to )?(?:all )?(?:your )?saving throws/i)) || (m = t.match(/\+(\d)\s+to (?:all )?saving throws/i))) out.push({ kind: "save", amount: +m[1] });
    var re = /(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) score (?:is|becomes|changes to|of)\s+(\d+)/gi;
    while ((m = re.exec(t))) out.push({ kind: "setstat", target: STAT_FULL[m[1].toLowerCase()], amount: +m[2] });
    var re2 = /\+(\d)\s+(?:bonus to (?:your )?)?(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma|STR|DEX|CON|INT|WIS|CHA)\b(?! saving)/gi;
    while ((m = re2.exec(t))) out.push({ kind: "stat", target: m[2], amount: +m[1] });
    var re3 = /resistance to (\w+)(?: and (\w+))? damage/gi;
    while ((m = re3.exec(t))) { [m[1], m[2]].forEach(function (d) { if (d) { var hit = DAMAGE.find(function (x) { return x.toLowerCase() === d.toLowerCase(); }); if (hit) out.push({ kind: "resist", target: hit }); } }); }
    if ((m = t.match(/(?:your )?(?:walking )?speed increases by (\d+) feet/i))) out.push({ kind: "speed", amount: +m[1] });
    return out;
  }

  // D&D magic items by party level band (the Treasure panel's tier select).
  var RARITY_BY_TIER = { "1": ["Common", "Uncommon"], "5": ["Uncommon", "Rare"], "11": ["Rare", "Very Rare"], "17": ["Very Rare", "Legendary"] };
  function rollDnd(tier, cat) {
    var items = arr(g("DND_MAGIC_ITEMS")); if (!items.length) return null;
    var rar = RARITY_BY_TIER[String(tier || "1")] || RARITY_BY_TIER["1"];
    var pool = items.filter(function (m) {
      if (rar.indexOf(m.rarity) < 0 && !rar.some(function (r) { return String(m.rarity || "").indexOf(r) === 0; })) return false;
      if (cat === "weapon") return /^Weapon/i.test(m.type);
      if (cat === "armor") return /^(Armor|Shield)/i.test(m.type);
      return true;
    });
    var m = pick(pool.length ? pool : items); if (!m) return null;
    var benefits = parse(m.name + ". " + (m.description || ""));
    return { name: m.name, notes: [m.rarity, m.type, m.attunement ? "attunement" : ""].filter(Boolean).join(" · "), benefits: benefits };
  }
  // LotR: an Enchanted Reward (or a plain Reward) fitting the item.
  function rollLotr(tier, cat) {
    var ench = arr(g("LOTR_ENCHANTED_REWARDS")), plain = arr(g("LOTR_REWARDS"));
    var fits = function (r) { var it = String(r.item || ""); return cat === "armor" ? /armou?r|shield|helm/i.test(it) : cat === "weapon" ? /weapon/i.test(it) : true; };
    var pool = ench.filter(fits); if (!pool.length) pool = plain.filter(fits); if (!pool.length) pool = ench.concat(plain);
    var r = pick(pool); if (!r) return null;
    var desc = String(r.description || "");
    var benefits = parse(desc);
    var rest = desc.replace(/\+\d\s+(?:AC|attack and damage)\s*;?\s*/gi, "").trim();
    benefits.push({ kind: "note", target: (r.name + (rest ? ": " + rest : "")).slice(0, 160) });
    return { name: "", notes: r.name, benefits: benefits };
  }

  // +N by level band (DMG: +1 uncommon, +2 rare, +3 very rare).
  function plusFor(tier) { var t = String(tier || "1"); return t === "17" ? 3 : t === "11" ? 2 + (Math.random() < 0.3 ? 1 : 0) : t === "5" ? 1 + (Math.random() < 0.4 ? 1 : 0) : 1; }
  function enchantDnd(tier, cat) {
    if (cat === "weapon" || cat === "armor") return [{ kind: "plus", amount: plusFor(tier) }];
    var r = rollDnd(tier, "magic"); return r ? r.benefits : [];
  }
  function enchantLotr(tier, cat) { var r = rollLotr(tier, cat); return r ? r.benefits : []; }
  window.LootBonus.register("dnd", {
    stats: STATS, kinds: kinds(true), fromText: parse, roll: rollDnd, enchant: enchantDnd,
    lists: { spell: function () { return arr(g("DND_SPELLS")).map(function (s) { return { name: s.name, meta: [s.level != null ? (s.level ? "Level " + s.level : "Cantrip") : "", s.school].filter(Boolean).join(" · ") }; }); } },
  });
  window.LootBonus.register("lotr", {
    stats: STATS, kinds: kinds(false), fromText: parse, roll: rollLotr, enchant: enchantLotr, lists: {},
  });
})();
