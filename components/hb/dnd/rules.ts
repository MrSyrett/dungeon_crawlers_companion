// ── D&D 2024 homebrew rules (pure, no React) ─────────────────────────────────
// Vocabulary, derived values and the compose/parse pairs that turn builder
// data into the exact strings the D&D consumers already read (stat-block
// actions the GM Screen rolls, "Dex +6" saves, "Self (15-foot Cone)" ranges…).
// Imported by the "use client" builders AND by lib/homebrew.ts, so the live
// preview and the stored text always agree.
import { formatDice, parseDice, type Dice } from "../dice";
import type { AttackRow } from "../AttackRows";

// ── vocabulary ───────────────────────────────────────────────────────────────
export const ABILS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;
export type Abil = (typeof ABILS)[number];
export const ABIL_NAME: Record<Abil, string> = { STR: "Strength", DEX: "Dexterity", CON: "Constitution", INT: "Intelligence", WIS: "Wisdom", CHA: "Charisma" };
const abilShort = (a: Abil) => a[0] + a.slice(1).toLowerCase(); // "Dex"
export const DAMAGE_TYPES = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"] as const;
export const CONDITIONS = ["Blinded", "Charmed", "Deafened", "Exhaustion", "Frightened", "Grappled", "Incapacitated", "Invisible", "Paralyzed", "Petrified", "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious"];
export const SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;
export const SIZE_DIE: Record<string, number> = { Tiny: 4, Small: 6, Medium: 8, Large: 10, Huge: 12, Gargantuan: 20 };
export const CREATURE_TYPES = ["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"];
/** Creature type → the bestiary group the GM Screen picker files it under. */
export const TYPE_GROUP: Record<string, string> = {
  Aberration: "Aberrations", Beast: "Beasts", Celestial: "Celestials", Construct: "Constructs", Dragon: "Dragons", Elemental: "Elementals",
  Fey: "Fey", Fiend: "Fiends", Giant: "Giants", Humanoid: "Humanoids", Monstrosity: "Monstrosities", Ooze: "Oozes", Plant: "Plants", Undead: "Undead",
};
export const ALIGNMENTS = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil", "Unaligned", "Any Alignment"];
export const CR_LIST = ["0", "1/8", "1/4", "1/2", ...Array.from({ length: 30 }, (_, i) => String(i + 1))];
export const CR_XP: Record<string, number> = {
  "0": 10, "1/8": 25, "1/4": 50, "1/2": 100, "1": 200, "2": 450, "3": 700, "4": 1100, "5": 1800, "6": 2300, "7": 2900, "8": 3900, "9": 5000, "10": 5900,
  "11": 7200, "12": 8400, "13": 10000, "14": 11500, "15": 13000, "16": 15000, "17": 18000, "18": 20000, "19": 22000, "20": 25000, "21": 33000, "22": 41000,
  "23": 50000, "24": 62000, "25": 75000, "26": 90000, "27": 105000, "28": 120000, "29": 135000, "30": 155000,
};
export function crNum(cr: string): number {
  const s = String(cr ?? "").trim();
  if (s.includes("/")) { const [a, b] = s.split("/").map(Number); return b ? a / b : 0; }
  return parseFloat(s) || 0;
}
export function crPB(cr: string): number {
  const n = crNum(cr);
  return n >= 29 ? 9 : n >= 25 ? 8 : n >= 21 ? 7 : n >= 17 ? 6 : n >= 13 ? 5 : n >= 9 ? 4 : n >= 5 ? 3 : 2;
}
export const SKILLS: [string, Abil][] = [
  ["Acrobatics", "DEX"], ["Animal Handling", "WIS"], ["Arcana", "INT"], ["Athletics", "STR"], ["Deception", "CHA"], ["History", "INT"],
  ["Insight", "WIS"], ["Intimidation", "CHA"], ["Investigation", "INT"], ["Medicine", "WIS"], ["Nature", "INT"], ["Perception", "WIS"],
  ["Performance", "CHA"], ["Persuasion", "CHA"], ["Religion", "INT"], ["Sleight of Hand", "DEX"], ["Stealth", "DEX"], ["Survival", "WIS"],
];
export const LANGUAGES = ["Common", "Common Sign Language", "Draconic", "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Halfling", "Orc", "Abyssal", "Celestial", "Deep Speech", "Druidic", "Infernal", "Primordial", "Sylvan", "Thieves' Cant", "Undercommon"];
export const SENSES = ["Blindsight", "Darkvision", "Tremorsense", "Truesight"] as const;
export const SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
export const SPELL_CLASSES = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"];
export const BASE_CLASSES = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
export const FEAT_CATEGORIES = ["Origin", "General", "Fighting Style", "Epic Boon"];
export const RARITIES = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Varies"];
export const MASTERIES = ["Cleave", "Graze", "Nick", "Push", "Sap", "Slow", "Topple", "Vex"];
export const MAGIC_TYPES = ["Wondrous Item", "Ring", "Rod", "Staff", "Wand", "Potion", "Scroll", "Ammunition", "Weapon", "Armor", "Shield"];
export const GEAR_CATEGORIES = ["Adventuring Gear", "Tools", "Equipment Packs"];
export const COIN_UNITS = ["CP", "SP", "EP", "GP", "PP"];
export const ARTISAN_TOOLS = ["Alchemist's Supplies", "Brewer's Supplies", "Calligrapher's Supplies", "Carpenter's Tools", "Cartographer's Tools", "Cobbler's Tools", "Cook's Utensils", "Glassblower's Tools", "Jeweler's Tools", "Leatherworker's Tools", "Mason's Tools", "Painter's Supplies", "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools", "Woodcarver's Tools"];
export const OTHER_TOOLS = ["Disguise Kit", "Forgery Kit", "Herbalism Kit", "Navigator's Tools", "Poisoner's Kit", "Thieves' Tools", "Choose one kind of Artisan's Tools", "Choose one kind of Gaming Set", "Choose one kind of Musical Instrument"];

export const abilMod = (score: number) => Math.floor((score - 10) / 2);
export const signed = (n: number) => (n >= 0 ? "+" : "") + n;
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const int = (v: unknown, d = 0) => { const n = parseInt(String(v ?? "").replace(/^\+/, ""), 10); return Number.isFinite(n) ? n : d; };
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : v == null ? "" : String(v).trim().slice(0, max));
const strArr = (v: unknown, maxItems: number, maxLen: number) => (Array.isArray(v) ? v.map((x) => txt(x, maxLen)).filter(Boolean).slice(0, maxItems) : []);

// ── Monster: attacks ─────────────────────────────────────────────────────────
// A D&D attack is an AttackRow whose `extra` holds the stat-block bits:
//   kind  "melee" | "ranged" | "both"     reach "5"      rng "80/320"
//   atype ""  → 2024 wording ("Melee Attack Roll: +5, reach 5 ft. Hit: …")
//         "Weapon" | "Spell" → the 2014/SRD 5.1 wording the book data uses
//         ("Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: …")
//   tgt   "one target" (2014 wording; optional in 2024)
//   abil  "" (manual) | STR… → to-hit = PB + mod, damage +mod, kept live
//   d2/t2 a second "plus 7 (2d6) fire damage" rider    slot "action" | "bonus"
// row.special is whatever follows the damage (", and the target is grappled…").
export const ATK_KINDS: [string, string][] = [["melee", "Melee"], ["ranged", "Ranged"], ["both", "Melee or Ranged"]];
const KIND_WORD: Record<string, string> = { melee: "Melee", ranged: "Ranged", both: "Melee or Ranged" };

export const dndAvg = (x: Dice) => (x.n > 0 && x.d > 0 ? Math.floor((x.n * (x.d + 1)) / 2) : 0) + (x.m || 0);

function dmgText(x: Dice, type: string, legacy: boolean): string {
  const t = type ? (legacy ? type.toLowerCase() : cap(type.toLowerCase())) + " " : "";
  if (x.n <= 0) return `${x.m || 0} ${t}damage`;
  return `${dndAvg(x)} (${formatDice(x, { spaced: true })}) ${t}damage`;
}

export function composeDndAttack(r: AttackRow): string {
  const e = r.extra ?? {};
  const kind = KIND_WORD[e.kind ?? "melee"] ? e.kind ?? "melee" : "melee";
  const legacy = e.atype === "Weapon" || e.atype === "Spell";
  const hit = signed(r.hit ?? 0);
  const where = [kind !== "ranged" ? `reach ${e.reach || "5"} ft.` : "", kind !== "melee" ? `range ${e.rng || "30/120"} ft.` : ""].filter(Boolean).join(" or ");
  const head = legacy
    ? `${KIND_WORD[kind]} ${e.atype} Attack: ${hit} to hit, ${where}, ${e.tgt || "one target"}.`
    : `${KIND_WORD[kind]} Attack Roll: ${hit}, ${where}${e.tgt ? ", " + e.tgt : ""}`.replace(/\.?$/, ".");
  const d2 = e.d2 ? parseDice(e.d2) : null;
  const plus = d2 && (d2.n > 0 || d2.m) ? ` plus ${dmgText(d2, e.t2 ?? "", legacy)}` : "";
  const sp = (r.special ?? "").trim().replace(/\.$/, "");
  const tail = !sp ? "." : /^[,;]/.test(sp) || /^or\b/.test(sp) ? (sp.startsWith("or") ? " " : "") + sp + "." : ". " + sp + ".";
  return `${head} Hit: ${dmgText(r.dice, r.dtype ?? "", legacy)}${plus}${tail}`;
}

const DMG_RE = /^(\d+) \((\d+d\d+(?: [+-] \d+)?)\) (?:([A-Za-z]+) )?damage/;
const FLAT_RE = /^(\d+) (?:([A-Za-z]+) )?damage/;

/** Parse one stat-block action into an attack row, or null. Only accepted when
 *  composing the row reproduces the text exactly, so nothing is ever reworded. */
export function parseDndAttack(name: string, desc: string, pb?: number, abilities?: Record<string, number>): AttackRow | null {
  const t = String(desc ?? "").trim();
  let m = t.match(/^(Melee or Ranged|Melee|Ranged) (Weapon|Spell) Attack: ([+-]\d+) to hit, (.+?), ([^,.]+?)\. Hit: ([\s\S]*)$/);
  let kindW: string, atype = "", hit: number, where: string, tgt = "", rest: string;
  if (m) { [, kindW, atype] = m; hit = int(m[3]); where = m[4]; tgt = m[5]; rest = m[6]; }
  else {
    m = t.match(/^(Melee or Ranged|Melee|Ranged) Attack Roll: ([+-]\d+), (.+?)\. Hit: ([\s\S]*)$/);
    if (!m) return null;
    kindW = m[1]; hit = int(m[2]); where = m[3]; rest = m[4];
    const tm = where.match(/^(.*? ft)\.?, (one [^,]+)$/); if (tm) { where = tm[1]; tgt = tm[2]; }
  }
  const kind = kindW === "Melee" ? "melee" : kindW === "Ranged" ? "ranged" : "both";
  const reach = where.match(/reach (\d+) ft/)?.[1] ?? "";
  const rng = where.match(/range (\d+(?:\/\d+)?) ft/)?.[1] ?? "";
  let dice: Dice, dtype = "", after: string;
  let dm = rest.match(DMG_RE);
  if (dm) { dice = parseDice(dm[2].replace(/\s+/g, "")) ?? { n: 0, d: 6, m: 0 }; dtype = (dm[3] ?? "").toLowerCase(); after = rest.slice(dm[0].length); }
  else {
    dm = rest.match(FLAT_RE);
    if (!dm) return null;
    dice = { n: 0, d: 6, m: int(dm[1]) }; dtype = (dm[2] ?? "").toLowerCase(); after = rest.slice(dm[0].length);
  }
  let d2 = "", t2 = "";
  const pm = after.match(/^ plus (\d+) \((\d+d\d+(?: [+-] \d+)?)\) ([A-Za-z]+) damage/);
  if (pm) { d2 = pm[2].replace(/\s+/g, ""); t2 = pm[3].toLowerCase(); after = after.slice(pm[0].length); }
  let special = after.trim();
  if (special.startsWith(". ")) special = special.slice(2);
  special = special.replace(/\.$/, "").replace(/^\.$/, "");
  const row: AttackRow = {
    name: String(name ?? "").trim(), count: 1, hit, dice, dtype, special,
    extra: { kind, atype, reach: reach || "5", rng: rng || "30/120", tgt, abil: "", d2, t2, slot: "action" },
  };
  if (composeDndAttack(row) !== t) return null;
  if (pb != null && abilities && dice.n > 0) {
    for (const a of kind === "ranged" ? ["DEX", "STR", "CON", "INT", "WIS", "CHA"] : ["STR", "DEX", "CON", "INT", "WIS", "CHA"]) {
      const mod = abilMod(abilities[a] ?? 10);
      if (hit === pb + mod && dice.m === mod) { row.extra!.abil = a; break; }
    }
  }
  return row;
}

/** Re-derive to-hit / damage mod of rows tied to an ability (after scores / CR change). */
export function syncDndAttacks(rows: AttackRow[], pb: number, abilities: Record<string, number>): AttackRow[] {
  return rows.map((r) => {
    const a = r.extra?.abil;
    if (!a || !(a in abilities)) return r;
    const mod = abilMod(abilities[a]);
    if (r.hit === pb + mod && r.dice.m === mod) return r;
    return { ...r, hit: pb + mod, dice: { ...r.dice, m: r.dice.n > 0 ? mod : r.dice.m } };
  });
}

export function cleanDndAttackRows(v: unknown): AttackRow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 20).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    const e = (o.extra ?? {}) as Record<string, unknown>;
    const dice = (o.dice ?? {}) as Record<string, unknown>;
    const d = int(dice.d, 6);
    const kind = ["melee", "ranged", "both"].includes(String(e.kind)) ? String(e.kind) : "melee";
    const rng = txt(e.rng, 12).match(/^\d{1,4}(\/\d{1,4})?$/)?.[0] ?? "30/120";
    const d2p = parseDice(txt(e.d2, 16));
    return {
      name: txt(o.name, 60),
      count: 1,
      hit: clamp(int(o.hit), -5, 30),
      dice: { n: clamp(int(dice.n), 0, 40), d: d === 0 ? 6 : clamp(d, 2, 100), m: clamp(int(dice.m), -20, 99) },
      dtype: (DAMAGE_TYPES as readonly string[]).includes(String(o.dtype ?? "").toLowerCase()) ? String(o.dtype).toLowerCase() : "",
      special: txt(o.special, 600),
      extra: {
        kind,
        atype: ["Weapon", "Spell"].includes(String(e.atype)) ? String(e.atype) : "",
        reach: String(clamp(int(e.reach, 5), 5, 120)),
        rng,
        tgt: txt(e.tgt, 60),
        abil: (ABILS as readonly string[]).includes(String(e.abil)) ? String(e.abil) : "",
        d2: d2p && d2p.n > 0 ? formatDice({ n: clamp(d2p.n, 1, 40), d: clamp(d2p.d, 2, 100), m: clamp(d2p.m, -20, 99) }) : "",
        t2: (DAMAGE_TYPES as readonly string[]).includes(String(e.t2 ?? "").toLowerCase()) ? String(e.t2).toLowerCase() : "",
        slot: e.slot === "bonus" ? "bonus" : "action",
      },
    };
  });
}

export type NameDesc = { name: string; description: string };
export const cleanNameDesc = (v: unknown, maxItems: number): NameDesc[] =>
  Array.isArray(v)
    ? v.map((x) => { const o = (x ?? {}) as Record<string, unknown>; return { name: txt(o.name, 120), description: txt(o.description, 4000) }; }).filter((r) => r.name || r.description).slice(0, maxItems)
    : [];

/** actions / bonusActions from the attack rows + plain action rows. Multiattack leads. */
export function composeDndActions(rows: AttackRow[], actionRows: NameDesc[], bonusRows: NameDesc[]) {
  const atk = (slot: string) => rows.filter((r) => (r.extra?.slot ?? "action") === slot && r.name).map((r) => ({ name: r.name, description: composeDndAttack(r) }));
  const multi = actionRows.filter((a) => /^multiattack/i.test(a.name));
  const rest = actionRows.filter((a) => !/^multiattack/i.test(a.name));
  return { actions: [...multi, ...atk("action"), ...rest], bonusActions: [...atk("bonus"), ...bonusRows] };
}

// ── Monster: the rest of the stat block ──────────────────────────────────────
// `sb` (stored on the record) holds the structured block; composeDndBlock turns
// it into the legacy strings every consumer reads.
export type DndBlock = {
  hd: Dice;               // hit dice; d = size die and m = n × CON when hpAuto
  hpAuto: boolean;
  hp: number;             // manual HP (used when !hpAuto)
  speed: { walk: number; burrow: number; climb: number; fly: number; swim: number; hover: boolean; notes: string[] };
  saves: string[];        // proficient saves (STR…)
  saveBonus: Record<string, number>;   // a book value that isn't mod + PB (kept as-is)
  skills: Record<string, number>;      // skill → 1 proficient | 2 expertise
  skillBonus: Record<string, number>;
  senses: { blindsight: number; blindBeyond: boolean; darkvision: number; tremorsense: number; truesight: number; notes: string[] };
  ppBonus: number | null; // a passive Perception that isn't 10 + Perception (kept)
  langs: string[];
  telepathy: number;
  dres: string[]; dimm: string[]; dvul: string[]; cimm: string[];
  xpAuto: boolean;
  xp: number;
};

export function blankBlock(): DndBlock {
  return {
    hd: { n: 2, d: 8, m: 0 }, hpAuto: true, hp: 9,
    speed: { walk: 30, burrow: 0, climb: 0, fly: 0, swim: 0, hover: false, notes: [] },
    saves: [], saveBonus: {}, skills: {}, skillBonus: {},
    senses: { blindsight: 0, blindBeyond: false, darkvision: 0, tremorsense: 0, truesight: 0, notes: [] },
    ppBonus: null, langs: ["Common"], telepathy: 0, dres: [], dimm: [], dvul: [], cimm: [], xpAuto: true, xp: 0,
  };
}

export function blockHp(b: DndBlock, size: string, con: number): { hp: number; formula: string } {
  if (b.hpAuto) {
    const n = Math.max(1, b.hd.n), d = SIZE_DIE[size] ?? 8, m = n * abilMod(con);
    const hp = Math.max(1, dndAvg({ n, d, m }));
    return { hp, formula: `${hp} (${formatDice({ n, d, m }, { spaced: true })})` };
  }
  const hp = Math.max(1, b.hp);
  const f = formatDice(b.hd, { spaced: true });
  return { hp, formula: b.hd.n > 0 && f ? `${hp} (${f})` : String(hp) };
}
export const saveValue = (b: DndBlock, a: string, abilities: Record<string, number>, pb: number) =>
  b.saveBonus[a] ?? abilMod(abilities[a] ?? 10) + pb;
export const skillValue = (b: DndBlock, s: string, abilities: Record<string, number>, pb: number) => {
  if (b.skillBonus[s] != null) return b.skillBonus[s];
  const ab = SKILLS.find((x) => x[0] === s)?.[1] ?? "WIS";
  return abilMod(abilities[ab] ?? 10) + pb * (b.skills[s] ?? 0);
};
export const passivePerception = (b: DndBlock, abilities: Record<string, number>, pb: number) =>
  b.ppBonus ?? 10 + (b.skills.Perception || b.skillBonus.Perception != null ? skillValue(b, "Perception", abilities, pb) : abilMod(abilities.WIS ?? 10));

function joinDmg(list: string[]): string {
  const plain = list.filter((x) => (DAMAGE_TYPES as readonly string[]).includes(x.toLowerCase()));
  const other = list.filter((x) => !(DAMAGE_TYPES as readonly string[]).includes(x.toLowerCase()));
  return [plain.join(", "), ...other].filter(Boolean).join("; ");
}
export function splitDmg(s: string): string[] {
  const out: string[] = [];
  String(s ?? "").split(";").map((x) => x.trim()).filter(Boolean).forEach((seg) => {
    if (/\b(from|that|nonmagical|except|while|unless)\b/i.test(seg)) { out.push(seg); return; }
    seg.split(/,\s*(?:and\s+)?|\s+and\s+/).map((x) => x.trim()).filter(Boolean).forEach((x) => out.push(x));
  });
  return out;
}

export function composeDndBlock(b: DndBlock, abilities: Record<string, number>, cr: string, size: string) {
  const pb = crPB(cr);
  const { hp, formula } = blockHp(b, size, abilities.CON ?? 10);
  const sp = b.speed;
  const speed = [
    `${sp.walk} ft.`,
    sp.burrow ? `burrow ${sp.burrow} ft.` : "",
    sp.climb ? `climb ${sp.climb} ft.` : "",
    sp.fly ? `fly ${sp.fly} ft.${sp.hover ? " (hover)" : ""}` : "",
    sp.swim ? `swim ${sp.swim} ft.` : "",
    ...sp.notes,
  ].filter(Boolean).join(", ");
  const savingThrows = ABILS.filter((a) => b.saves.includes(a)).map((a) => `${abilShort(a)} ${signed(saveValue(b, a, abilities, pb))}`).join(", ");
  const skills = SKILLS.filter(([s]) => b.skills[s] || b.skillBonus[s] != null).map(([s]) => `${s} ${signed(skillValue(b, s, abilities, pb))}`)
    .concat(Object.keys(b.skillBonus).filter((s) => !SKILLS.some((x) => x[0] === s)).map((s) => `${s} ${signed(b.skillBonus[s])}`)).join(", ");
  const se = b.senses;
  const senses = [
    se.blindsight ? `Blindsight ${se.blindsight} ft.${se.blindBeyond ? " (blind beyond this radius)" : ""}` : "",
    se.darkvision ? `Darkvision ${se.darkvision} ft.` : "",
    se.tremorsense ? `Tremorsense ${se.tremorsense} ft.` : "",
    se.truesight ? `Truesight ${se.truesight} ft.` : "",
    ...se.notes,
    `Passive Perception ${passivePerception(b, abilities, pb)}`,
  ].filter(Boolean).join(", ");
  const languages = [...b.langs, b.telepathy ? `telepathy ${b.telepathy} ft.` : ""].filter(Boolean).join(", ") || "—";
  return {
    hp, hpFormula: formula, speed, savingThrows, skills, senses, languages,
    damageResistances: joinDmg(b.dres), damageImmunities: joinDmg(b.dimm), damageVulnerabilities: joinDmg(b.dvul),
    conditionImmunities: b.cimm.join(", "),
    xp: b.xpAuto ? CR_XP[cr] ?? 0 : b.xp, proficiencyBonus: pb,
  };
}

/** Best-effort structured block from a legacy (text-only) record. Anything not
 *  understood is kept in the notes / bonus overrides, never dropped. */
export function parseDndBlock(d: Record<string, unknown>, abilities: Record<string, number>): DndBlock {
  const b = blankBlock();
  const cr = String(d.cr ?? "1"), pb = crPB(cr), size = String(d.size ?? "Medium");
  const hp = int(d.hp, 1);
  const fm = String(d.hpFormula ?? "").match(/\((\d+)d(\d+)(?:\s*([+\-−])\s*(\d+))?\)/);
  b.hp = hp;
  if (fm) {
    b.hd = { n: int(fm[1]), d: int(fm[2]), m: fm[3] ? (fm[3] === "+" ? 1 : -1) * int(fm[4]) : 0 };
    b.hpAuto = b.hd.d === (SIZE_DIE[size] ?? 8) && b.hd.m === b.hd.n * abilMod(abilities.CON ?? 10) && dndAvg(b.hd) === hp;
  } else { b.hd = { n: 0, d: SIZE_DIE[size] ?? 8, m: 0 }; b.hpAuto = false; }
  // speed
  const sp = b.speed; sp.walk = 0;
  String(d.speed ?? "").split(/,\s*/).map((x) => x.trim()).filter(Boolean).forEach((seg, i) => {
    let m = seg.match(/^(\d+) ft\.?$/);
    if (m && i === 0) { sp.walk = int(m[1]); return; }
    m = seg.match(/^(burrow|climb|fly|swim) (\d+) ft\.?( \(hover\))?$/i);
    if (m) { const k = m[1].toLowerCase() as "burrow" | "climb" | "fly" | "swim"; sp[k] = int(m[2]); if (m[3]) sp.hover = true; return; }
    sp.notes.push(seg);
  });
  // saves / skills
  String(d.savingThrows ?? "").replace(/\b(Str|Dex|Con|Int|Wis|Cha)\w*\s*([+-]\s*\d+)/gi, (_, a: string, v: string) => {
    const ab = a.slice(0, 3).toUpperCase(); const n = int(v.replace(/\s+/g, ""));
    if (!b.saves.includes(ab)) b.saves.push(ab);
    if (n !== abilMod(abilities[ab] ?? 10) + pb) b.saveBonus[ab] = n;
    return "";
  });
  String(d.skills ?? "").split(/,\s*/).forEach((seg) => {
    const m = seg.trim().match(/^(.+?)\s*([+-]\s*\d+)$/); if (!m) return;
    const name = SKILLS.find((x) => x[0].toLowerCase() === m[1].toLowerCase())?.[0] ?? m[1].trim();
    const n = int(m[2].replace(/\s+/g, ""));
    const ab = SKILLS.find((x) => x[0] === name)?.[1];
    if (!ab) { b.skillBonus[name] = n; return; }
    const base = abilMod(abilities[ab] ?? 10);
    if (n === base + pb) b.skills[name] = 1; else if (n === base + 2 * pb) b.skills[name] = 2; else { b.skills[name] = 1; b.skillBonus[name] = n; }
  });
  // senses
  let pp: number | null = null;
  String(d.senses ?? "").split(/,\s*/).map((x) => x.trim()).filter(Boolean).forEach((seg) => {
    let m = seg.match(/^Passive Perception (\d+)$/i); if (m) { pp = int(m[1]); return; }
    m = seg.match(/^(Blindsight|Darkvision|Tremorsense|Truesight) (\d+) ft\.?( \(blind beyond this radius\))?$/i);
    if (m) { const k = m[1].toLowerCase() as "blindsight" | "darkvision" | "tremorsense" | "truesight"; b.senses[k] = int(m[2]); if (m[3]) b.senses.blindBeyond = true; return; }
    b.senses.notes.push(seg);
  });
  if (pp != null && pp !== passivePerception(b, abilities, pb)) b.ppBonus = pp;
  // languages
  b.langs = [];
  String(d.languages ?? "").split(/,\s*/).map((x) => x.trim()).filter((x) => x && x !== "—" && x !== "-").forEach((seg) => {
    const m = seg.match(/^telepathy (\d+) ft\.?$/i);
    if (m) b.telepathy = int(m[1]); else b.langs.push(seg);
  });
  b.dres = splitDmg(String(d.damageResistances ?? ""));
  b.dimm = splitDmg(String(d.damageImmunities ?? ""));
  b.dvul = splitDmg(String(d.damageVulnerabilities ?? ""));
  b.cimm = String(d.conditionImmunities ?? "").split(/,\s*/).map((x) => x.trim()).filter(Boolean).map((x) => CONDITIONS.find((c) => c.toLowerCase() === x.toLowerCase()) ?? x);
  const xp = int(d.xp, 0);
  b.xpAuto = !xp || xp === CR_XP[cr];
  b.xp = xp || CR_XP[cr] || 0;
  return b;
}

export function cleanDndBlock(v: unknown): DndBlock {
  const o = (v ?? {}) as Record<string, unknown>;
  const b = blankBlock();
  const hd = (o.hd ?? {}) as Record<string, unknown>;
  b.hd = { n: clamp(int(hd.n), 0, 99), d: clamp(int(hd.d, 8), 2, 20), m: clamp(int(hd.m), -500, 2000) };
  b.hpAuto = o.hpAuto !== false;
  b.hp = clamp(int(o.hp, 1), 1, 5000);
  const sp = (o.speed ?? {}) as Record<string, unknown>;
  const ft = (x: unknown) => clamp(int(x), 0, 1000);
  b.speed = { walk: ft(sp.walk), burrow: ft(sp.burrow), climb: ft(sp.climb), fly: ft(sp.fly), swim: ft(sp.swim), hover: !!sp.hover, notes: strArr(sp.notes, 6, 80) };
  b.saves = strArr(o.saves, 6, 3).filter((a) => (ABILS as readonly string[]).includes(a));
  const nums = (x: unknown, keys: (k: string) => boolean) => {
    const out: Record<string, number> = {};
    Object.entries((x ?? {}) as Record<string, unknown>).slice(0, 24).forEach(([k, n]) => { const kk = txt(k, 40); if (kk && keys(kk)) out[kk] = clamp(int(n), -20, 40); });
    return out;
  };
  b.saveBonus = nums(o.saveBonus, (k) => (ABILS as readonly string[]).includes(k));
  b.skills = {};
  Object.entries((o.skills ?? {}) as Record<string, unknown>).forEach(([k, n]) => { if (SKILLS.some((s) => s[0] === k) && (int(n) === 1 || int(n) === 2)) b.skills[k] = int(n); });
  b.skillBonus = nums(o.skillBonus, () => true);
  const se = (o.senses ?? {}) as Record<string, unknown>;
  b.senses = { blindsight: ft(se.blindsight), blindBeyond: !!se.blindBeyond, darkvision: ft(se.darkvision), tremorsense: ft(se.tremorsense), truesight: ft(se.truesight), notes: strArr(se.notes, 6, 80) };
  b.ppBonus = o.ppBonus == null || o.ppBonus === "" ? null : clamp(int(o.ppBonus, 10), 0, 40);
  b.langs = strArr(o.langs, 20, 60);
  b.telepathy = ft(o.telepathy);
  b.dres = strArr(o.dres, 16, 120); b.dimm = strArr(o.dimm, 16, 120); b.dvul = strArr(o.dvul, 16, 120);
  b.cimm = strArr(o.cimm, 16, 60);
  b.xpAuto = o.xpAuto !== false;
  b.xp = clamp(int(o.xp), 0, 1000000);
  return b;
}

// ── Equipment ────────────────────────────────────────────────────────────────
export type Cost = { n: number; unit: string };
export const composeCost = (c: Cost) => (c.n > 0 ? `${c.n} ${c.unit}` : "—");
export function parseCost(s: string): Cost {
  const m = String(s ?? "").replace(/,/g, "").match(/(\d+)\s*(CP|SP|EP|GP|PP)/i);
  return m ? { n: int(m[1]), unit: m[2].toUpperCase() } : { n: 0, unit: "GP" };
}
export const composeWeight = (n: number) => (n > 0 ? `${n} lb` : "—");
export function parseWeight(s: string): number {
  const t = String(s ?? "");
  const f = t.match(/(\d+)\s*\/\s*(\d+)/); if (f) return Math.round((int(f[1]) / int(f[2], 1)) * 100) / 100;
  const m = t.match(/(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0;
}
export const WEAPON_PROPS = ["Ammunition", "Finesse", "Heavy", "Light", "Loading", "Reach", "Thrown", "Two-Handed", "Versatile"];
export type WeaponProps = { props: string[]; thrown: string; ammo: string; versatile: number; extra: string[] };
export function parseWeaponProps(list: string[]): WeaponProps {
  const out: WeaponProps = { props: [], thrown: "20/60", ammo: "80/320", versatile: 8, extra: [] };
  (list ?? []).forEach((raw) => {
    const p = String(raw ?? "").trim(); if (!p) return;
    let m = p.match(/^Thrown \((\d+\/\d+)\)$/i); if (m) { out.props.push("Thrown"); out.thrown = m[1]; return; }
    m = p.match(/^Ammunition \((\d+\/\d+)\)$/i); if (m) { out.props.push("Ammunition"); out.ammo = m[1]; return; }
    m = p.match(/^Versatile \(1d(\d+)\)$/i); if (m) { out.props.push("Versatile"); out.versatile = int(m[1], 8); return; }
    const k = WEAPON_PROPS.find((x) => x.toLowerCase() === p.toLowerCase());
    if (k && !["Thrown", "Ammunition", "Versatile"].includes(k)) out.props.push(k); else out.extra.push(p);
  });
  return out;
}
export function composeWeaponProps(w: WeaponProps): string[] {
  return [
    ...WEAPON_PROPS.filter((p) => w.props.includes(p)).map((p) =>
      p === "Thrown" ? `Thrown (${w.thrown})` : p === "Ammunition" ? `Ammunition (${w.ammo})` : p === "Versatile" ? `Versatile (1d${w.versatile})` : p),
    ...w.extra,
  ];
}
export type ArmorAC = { ac: number; dex: "full" | "max2" | "none" };
export function composeArmorAC(category: string, a: ArmorAC): string {
  if (category === "Shield") return `+${a.ac}`;
  return a.dex === "full" ? `${a.ac} + Dex modifier` : a.dex === "max2" ? `${a.ac} + Dex modifier (max 2)` : String(a.ac);
}
export function parseArmorAC(s: string, category: string): ArmorAC {
  const t = String(s ?? "");
  const ac = int(t.match(/\d+/)?.[0], category === "Shield" ? 2 : 11);
  const dex = /dex/i.test(t) ? (/max/i.test(t) ? "max2" : "full") : category === "Light" && !t ? "full" : "none";
  return { ac, dex };
}
export const defaultArmorDex = (category: string): ArmorAC["dex"] => (category === "Light" ? "full" : category === "Medium" ? "max2" : "none");
/** The `type` string the sheet keys magic weapons / armor / shields on. */
export function composeMagicType(itemType: string, base: string, custom: string): string {
  if (itemType === "Weapon") return `Weapon (${base || "any"})`;
  if (itemType === "Armor") return base ? `Armor (${base})` : "Armor (any)";
  if (itemType === "Shield") return "Shield";
  if (itemType === "Custom") return custom || "Wondrous Item";
  return itemType || "Wondrous Item";
}
export function parseMagicType(type: string): { itemType: string; base: string; custom: string } {
  const t = String(type ?? "").trim();
  let m = t.match(/^Weapon \((.+)\)$/i); if (m) return { itemType: "Weapon", base: m[1] === "any" ? "" : m[1], custom: "" };
  m = t.match(/^Armor \((.+)\)$/i); if (m) return { itemType: "Armor", base: m[1] === "any" ? "" : m[1], custom: "" };
  const k = MAGIC_TYPES.find((x) => x.toLowerCase() === t.toLowerCase());
  if (k) return { itemType: k, base: "", custom: "" };
  return t ? { itemType: "Custom", base: "", custom: t } : { itemType: "Wondrous Item", base: "", custom: "" };
}

// Legacy homebrew magic-item `bonuses` ({target, amount}) ↔ LootBonus `benefits`.
// The sheet's loot automation covers ac/save/speed/stats/+N; these four have no
// LootBonus kind, so they stay as `bonuses` rows the sheet adds on top.
export const EXTRA_BONUS_TARGETS = ["hp", "init", "spellAtk", "spellDC"] as const;
export type LootBenefit = { kind: string; target?: string; amount?: number };
export function bonusesToBenefits(bonuses: { target: string; amount: number }[], isWeapon: boolean): LootBenefit[] {
  const out: LootBenefit[] = [];
  (bonuses ?? []).forEach((b) => {
    const n = int(b?.amount); if (!n) return;
    const t = String(b?.target ?? "");
    if (t === "ac" || t === "save" || t === "speed") out.push({ kind: t, amount: n });
    else if (["str", "dex", "con", "int", "wis", "cha"].includes(t)) out.push({ kind: "stat", target: t, amount: n });
    else if (t === "atk") { if (isWeapon) out.push({ kind: "plus", amount: n }); else out.push({ kind: "attack", amount: n }, { kind: "damage", amount: n }); }
  });
  return out;
}
/** The `bonuses` mirror kept for inventory rows saved before benefits existed. */
export function benefitsToBonuses(list: LootBenefit[], magicType: string): { target: string; amount: number }[] {
  const out: { target: string; amount: number }[] = [];
  const armorish = /^(Armor|Shield)/i.test(magicType);
  list.forEach((b) => {
    const n = int(b.amount); if (!n) return;
    if (b.kind === "ac" || b.kind === "save" || b.kind === "speed") out.push({ target: b.kind, amount: n });
    else if (b.kind === "stat" && b.target) out.push({ target: b.target, amount: n });
    else if (b.kind === "plus") out.push({ target: armorish ? "ac" : "atk", amount: n });
    else if (b.kind === "attack") out.push({ target: "atk", amount: n });
  });
  return out;
}

// ── Spells ───────────────────────────────────────────────────────────────────
export const CAST_TIMES = ["Action", "Bonus Action", "Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"];
export type CastTime = { base: string; trigger: string; custom: string };
export function parseCastTime(s: string): CastTime {
  const t = String(s ?? "").trim();
  const base = CAST_TIMES.find((x) => t.toLowerCase() === x.toLowerCase() || t.toLowerCase().startsWith(x.toLowerCase() + ","));
  if (base) return { base, trigger: t.slice(base.length).replace(/^,\s*/, ""), custom: "" };
  return t ? { base: "custom", trigger: "", custom: t } : { base: "Action", trigger: "", custom: "" };
}
export const composeCastTime = (c: CastTime) => (c.base === "custom" ? c.custom || "Action" : c.base + (c.trigger.trim() ? ", " + c.trigger.trim() : ""));

export const RANGE_KINDS: [string, string][] = [["self", "Self"], ["touch", "Touch"], ["feet", "Feet"], ["miles", "Miles"], ["area", "Self (area)"], ["sight", "Sight"], ["unlimited", "Unlimited"], ["special", "Special"]];
export const AREA_SHAPES = ["Cone", "Cube", "Cylinder", "Emanation", "Line", "Radius", "Sphere"];
export type SpellRange = { kind: string; n: number; shape: string; custom: string };
export function composeRange(r: SpellRange): string {
  switch (r.kind) {
    case "self": return "Self";
    case "touch": return "Touch";
    case "feet": return `${r.n} feet`;
    case "miles": return `${r.n} mile${r.n === 1 ? "" : "s"}`;
    case "area": return `Self (${r.n}-foot ${r.shape})`;
    case "sight": return "Sight";
    case "unlimited": return "Unlimited";
    case "special": return "Special";
    default: return r.custom || "Self";
  }
}
export function parseRange(s: string): SpellRange {
  const t = String(s ?? "").trim();
  const r: SpellRange = { kind: "feet", n: 60, shape: "Cone", custom: "" };
  let m;
  if ((m = t.match(/^(\d+) feet$/i))) return { ...r, kind: "feet", n: int(m[1]) };
  if ((m = t.match(/^(\d+) miles?$/i))) return { ...r, kind: "miles", n: int(m[1]) };
  if ((m = t.match(/^Self \((\d+)-(?:foot|mile) (\w+)\)$/i)) && /-foot/.test(t)) {
    const shape = AREA_SHAPES.find((x) => x.toLowerCase() === m![2].toLowerCase());
    if (shape) return { ...r, kind: "area", n: int(m[1]), shape };
  }
  const k = RANGE_KINDS.find(([, l]) => l.toLowerCase() === t.toLowerCase() && !["feet", "miles", "area"].includes(l.toLowerCase()));
  if (k && ["self", "touch", "sight", "unlimited", "special"].includes(k[0])) return { ...r, kind: k[0] };
  return t ? { ...r, kind: "custom", custom: t } : r;
}

export const DUR_KINDS: [string, string][] = [["inst", "Instantaneous"], ["round", "Rounds"], ["minute", "Minutes"], ["hour", "Hours"], ["day", "Days"], ["dispelled", "Until Dispelled"], ["triggered", "Until Dispelled or Triggered"], ["special", "Special"]];
export type SpellDuration = { kind: string; n: number; upTo: boolean; custom: string };
const UNIT: Record<string, string> = { round: "Round", minute: "Minute", hour: "Hour", day: "Day" };
export function composeDuration(d: SpellDuration, conc: boolean): string {
  if (d.kind === "custom") return d.custom || "Instantaneous";
  if (d.kind === "inst") return "Instantaneous";
  if (d.kind === "dispelled") return "Until Dispelled";
  if (d.kind === "triggered") return "Until Dispelled or Triggered";
  if (d.kind === "special") return "Special";
  const x = `${d.n} ${UNIT[d.kind] ?? "Minute"}${d.n === 1 ? "" : "s"}`;
  return conc ? `Concentration, up to ${x}` : d.upTo ? `Up to ${x}` : x;
}
export function parseDuration(s: string): { d: SpellDuration; conc: boolean } {
  const t = String(s ?? "").trim();
  const base: SpellDuration = { kind: "inst", n: 1, upTo: false, custom: "" };
  let conc = false, rest = t, upTo = false;
  let m = rest.match(/^Concentration,\s*up to\s+(.*)$/i); if (m) { conc = true; rest = m[1]; }
  else { m = rest.match(/^Up to\s+(.*)$/i); if (m) { upTo = true; rest = m[1]; } }
  m = rest.match(/^(\d+)\s+(round|minute|hour|day)s?$/i);
  if (m) return { d: { ...base, kind: m[2].toLowerCase(), n: int(m[1]), upTo }, conc };
  const k = DUR_KINDS.find(([, l]) => l.toLowerCase() === t.toLowerCase());
  if (k && !conc) return { d: { ...base, kind: k[0] }, conc };
  return { d: t ? { ...base, kind: "custom", custom: t } : base, conc };
}
export type Components = { v: boolean; s: boolean; m: boolean; mat: string };
export const composeComponents = (c: Components) => [c.v ? "V" : "", c.s ? "S" : "", c.m ? `M${c.mat.trim() ? ` (${c.mat.trim()})` : ""}` : ""].filter(Boolean).join(", ") || "V, S";
export function parseComponents(s: string): Components {
  const t = String(s ?? "");
  const mat = t.match(/M\s*\(([\s\S]*)\)\s*$/)?.[1] ?? "";
  const head = t.replace(/\([\s\S]*\)/, "");
  return { v: /\bV\b/.test(head), s: /\bS\b/.test(head), m: /\bM\b/.test(head), mat };
}

// ── Feats ────────────────────────────────────────────────────────────────────
// The prerequisite string the sheet's featEligibility() parses ("Level 4+",
// "Strength or Dexterity 13+", "proficiency with Medium armor", "…feature",
// "X feat"), built from structured parts. Unrecognised text stays in `other`.
export const PREREQ_PROFS = ["Light armor", "Medium armor", "Heavy armor", "Shields", "a Martial weapon"];
export type Prereq = { level: number; abils: string[]; abilMin: number; prof: string; caster: "" | "spellcasting" | "spellOrPact"; feat: string; other: string };
export const blankPrereq = (): Prereq => ({ level: 0, abils: [], abilMin: 13, prof: "", caster: "", feat: "", other: "" });
function orList(xs: string[]): string {
  if (xs.length <= 1) return xs.join("");
  if (xs.length === 2) return `${xs[0]} or ${xs[1]}`;
  return `${xs.slice(0, -1).join(", ")}, or ${xs[xs.length - 1]}`;
}
export function composePrereq(p: Prereq): string {
  const parts = [
    p.level > 1 ? `Level ${p.level}+` : "",
    p.abils.length ? `${orList(ABILS.filter((a) => p.abils.includes(a)).map((a) => ABIL_NAME[a]))} ${p.abilMin}+` : "",
    p.prof ? `proficiency with ${p.prof}` : "",
    p.caster === "spellcasting" ? "Spellcasting feature" : p.caster === "spellOrPact" ? "Spellcasting or Pact Magic feature" : "",
    p.feat.trim() ? `${p.feat.trim()} feat` : "",
    p.other.trim(),
  ].filter(Boolean);
  if (parts.length === 2 && p.level > 1 && !p.feat.trim()) return `${parts[0]} and ${parts[1].replace(/^Spellcasting/, "spellcasting")}`;
  return parts.join(", ");
}
export function parsePrereq(s: string): Prereq {
  const t = String(s ?? "").trim();
  const p = blankPrereq();
  if (!t) return p;
  let m = t.match(/Level (\d+)\+/i); if (m) p.level = int(m[1]);
  m = t.match(/((?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)(?:,?\s*(?:or\s+)?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma))*)\s+(\d+)\+/i);
  if (m) { p.abils = (m[1].match(/Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma/gi) ?? []).map((a) => a.slice(0, 3).toUpperCase()); p.abilMin = int(m[2], 13); }
  m = t.match(/proficiency with (Light armor|Medium armor|Heavy armor|Shields|a Martial weapon)\b/i);
  if (m) p.prof = PREREQ_PROFS.find((x) => x.toLowerCase() === m![1].toLowerCase()) ?? "";
  if (/spellcasting or pact magic feature/i.test(t)) p.caster = "spellOrPact"; else if (/spellcasting feature/i.test(t)) p.caster = "spellcasting";
  m = t.match(/(?:^|,\s*|and\s+)([A-Z][A-Za-z' ()]+?) feat\b/); if (m) p.feat = m[1].trim();
  if (composePrereq(p).toLowerCase() !== t.toLowerCase()) return { ...blankPrereq(), other: t };
  return p;
}
export type Benefit = { name: string; text: string };
export const parseBenefit = (s: string): Benefit => { const m = String(s ?? "").match(/^([^:]{2,40}):\s*([\s\S]*)$/); return m ? { name: m[1].trim(), text: m[2] } : { name: "", text: String(s ?? "") }; };
export const composeBenefit = (b: Benefit) => (b.name.trim() ? `${b.name.trim()}: ${b.text.trim()}` : b.text.trim());
