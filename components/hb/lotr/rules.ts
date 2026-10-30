// ── The Lord of the Rings Roleplaying (5E) homebrew rules (pure, no React) ────
// Vocabulary, derived values and the compose/parse pairs that turn builder data
// into the exact strings the LotR consumers already read (the /lotr reference
// pages, the LotR sheet's pools, the GM Screen adversary picker, the session
// prep builder). Imported by the "use client" builders AND by lib/homebrew.ts,
// so the live preview and the stored text always agree.
// LotR is a 5E derivative, but this file is its own: Middle-earth skills
// (Explore, Hunting, Old Lore, Riddle, Travel), no alignment, "Weapon Attack"
// stat-block wording with the book's ", or N (XdY + M) two-handed" versatile
// line, Strike Fear (Shadow from Dread), Recharges-after-a-rest usages, the
// Rewards the sheet automates (Fell / Grievous / Keen) and LotR coinage.
import { formatDice, parseDice, type Dice } from "../dice";
import type { AttackRow } from "../AttackRows";

// ── vocabulary ───────────────────────────────────────────────────────────────
export const ABILS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;
export type Abil = (typeof ABILS)[number];
const abilShort = (a: string) => a[0] + a.slice(1).toLowerCase(); // "Dex"
export const CULTURES = ["Bardings", "Dwarves of Durin's Folk", "Elves of Lindon", "Hobbits of the Shire", "Men of Bree", "Rangers of the North"] as const;
export const SKILLS: [string, Abil][] = [
  ["Acrobatics", "DEX"], ["Animal Handling", "WIS"], ["Athletics", "STR"], ["Deception", "CHA"], ["Explore", "WIS"], ["Hunting", "WIS"],
  ["Insight", "WIS"], ["Intimidation", "CHA"], ["Investigation", "INT"], ["Medicine", "INT"], ["Nature", "INT"], ["Old Lore", "INT"],
  ["Perception", "WIS"], ["Performance", "CHA"], ["Persuasion", "CHA"], ["Riddle", "INT"], ["Sleight of Hand", "DEX"], ["Stealth", "DEX"], ["Travel", "WIS"],
];
export const SKILL_NAMES = SKILLS.map((s) => s[0]);
export const DISTINCTIVE_FEATURES = ["Bold", "Cunning", "Eager", "Fair-spoken", "Faithful", "Fierce", "Generous", "Honourable", "Inquisitive", "Lordly", "Merry", "Patient", "Proud", "Rustic", "Secretive", "Stern", "Subtle", "True-hearted", "Wary", "Wilful"];
export const LANGUAGES = ["Westron", "Dalish", "Khuzdul", "Sindarin", "Quenya", "Dunlendish", "Orkish", "Black Speech", "Warg-speech"];
export const DAMAGE_TYPES = ["acid", "bludgeoning", "cold", "fire", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"] as const;
export const WEAPON_DAMAGE = ["bludgeoning", "piercing", "slashing"] as const;
export const CONDITIONS = ["Blinded", "Charmed", "Deafened", "Exhaustion", "Frightened", "Grappled", "Incapacitated", "Invisible", "Paralyzed", "Petrified", "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious"];
/** Book resistance phrases (one chip each). */
export const RESIST_PHRASES = [
  "bludgeoning, piercing, and slashing from non-magical weapons",
  "bludgeoning, piercing, and slashing from weapons not bearing the Bane of the Undead",
];
export const SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;
export const SIZE_DIE: Record<string, number> = { Tiny: 4, Small: 6, Medium: 8, Large: 10, Huge: 12, Gargantuan: 20 };
export const CREATURE_TYPES = ["Beast", "Construct", "Dragon", "Elemental", "Giant", "Humanoid", "Monstrosity", "Plant", "Undead"];
export const TYPE_TAGS = ["Orc", "Troll", "Evil Man", "Warg", "Werewolf", "Fell Wraith", "Dúnadan", "Man of Bree", "Hobbit", "Dwarf", "Elf", "Spider"];
export const MONSTER_GROUPS = ["Evil Men", "Orcs", "Trolls", "Undead", "Wolves", "Folk of Eriador", "Beasts", "Other"] as const;
export const ARMOUR_NOTES = ["natural armour", "leather shirt", "leather corslet", "hide armour", "orc-leather", "orc-mail", "heavy orc-mail", "mail-shirt", "ring-mail", "scale armour", "mail hauberk", "shield"];
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
/** Action / trait usage, written after the name as in the book: "Yell of Triumph (Recharges after a Short or Long Rest)". */
export const USES = ["Recharges after a Short or Long Rest", "Recharges after a Long Rest", "Recharge 6", "Recharge 5–6", "Recharge 4–6", "1/Turn", "1/Day", "2/Day", "3/Day"];

/** The book's signature adversary traits (book wording) — quick-add templates. */
export const ADVERSARY_TRAITS: { name: string; use?: string; description: string }[] = [
  { name: "Hatred (Dwarves)", use: "Recharges after a Short or Long Rest", description: "As a bonus action it gains advantage on attack rolls against the hated folk until the start of its next turn." },
  { name: "Reckless Hate", description: "At the start of its turn it may take advantage on all its melee weapon attacks that turn; attacks against it then have advantage until its next turn." },
  { name: "Aggressive", description: "Bonus action: move up to its speed toward a hostile creature it can see." },
  { name: "Horrible Strength", description: "Its melee weapons deal one extra die of damage (included below)." },
  { name: "Hideous Toughness", use: "Recharges after a Short or Long Rest", description: "If it takes 7 damage or less that would reduce it to 0 HP, it drops to 1 HP instead." },
  { name: "Deathless", description: "When damage drops it to 0 HP it makes a Constitution save (DC 5 + damage taken) to drop to 1 HP instead, unless the damage was radiant, from a critical hit, or from a weapon bearing the Bane of the Undead." },
  { name: "Sunlight Sensitivity", description: "In sunlight: disadvantage on attack rolls and sight-based Wisdom (Perception) checks." },
  { name: "Sunlight Weakness", description: "In sunlight: disadvantage on attack rolls, ability checks and saving throws." },
  { name: "Sunlight Curse", description: "Turns to stone (petrified) if it ends its turn in sunlight." },
  { name: "Pack Tactics", description: "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target." },
  { name: "Gang Tactics", description: "Advantage on an attack roll if an ally that isn't incapacitated is within 5 ft. of the target." },
  { name: "Keen Hearing and Smell", description: "Advantage on Perception checks that rely on hearing or smell." },
];

export const abilMod = (score: number) => Math.floor((score - 10) / 2);
export const signed = (n: number) => (n >= 0 ? "+" : "") + n;
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const int = (v: unknown, d = 0) => { const n = parseInt(String(v ?? "").replace(/^\+/, ""), 10); return Number.isFinite(n) ? n : d; };
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : v == null ? "" : String(v).trim().slice(0, max));
const strArr = (v: unknown, maxItems: number, maxLen: number) => (Array.isArray(v) ? v.map((x) => txt(x, maxLen)).filter(Boolean).slice(0, maxItems) : []);
const oneOfS = (v: unknown, list: readonly string[], d: string) => { const t = String(v ?? ""); return list.includes(t) ? t : d; };

// ── Monster: attacks ─────────────────────────────────────────────────────────
// A LotR attack is an AttackRow whose `extra` holds the stat-block bits:
//   kind "melee" | "ranged" | "both"    reach "5"    rng "80/320"
//   tgt  "one target" | "one creature"  abil "" (manual) | STR… (to-hit = PB + mod, +mod damage)
//   vers die size of the two-handed line (", or 6 (1d8 + 2) two-handed"), "" = none
//   d2/t2 a "plus 3 (1d6) poison damage" rider
// row.special is whatever follows the damage ("; a Medium or smaller target…").
export const ATK_KINDS: [string, string][] = [["melee", "Melee"], ["ranged", "Ranged"], ["both", "Melee or Ranged"]];
const KIND_WORD: Record<string, string> = { melee: "Melee", ranged: "Ranged", both: "Melee or Ranged" };
export const avg = (x: Dice) => (x.n > 0 && x.d > 0 ? Math.floor((x.n * (x.d + 1)) / 2) : 0) + (x.m || 0);
function dmgText(x: Dice, type: string): string {
  const t = type ? type.toLowerCase() + " " : "";
  if (x.n <= 0) return `${x.m || 0} ${t}damage`;
  return `${avg(x)} (${formatDice(x, { spaced: true })}) ${t}damage`;
}

export function composeLotrAttack(r: AttackRow): string {
  const e = r.extra ?? {};
  const kind = KIND_WORD[e.kind ?? "melee"] ? e.kind ?? "melee" : "melee";
  const where = [kind !== "ranged" ? `reach ${e.reach || "5"} ft.` : "", kind !== "melee" ? `range ${e.rng || "20/60"} ft.` : ""].filter(Boolean).join(" or ");
  const head = `${KIND_WORD[kind]} Weapon Attack: ${signed(r.hit ?? 0)} to hit, ${where}, ${e.tgt || "one target"}.`;
  const d2 = e.d2 ? parseDice(e.d2) : null;
  const plus = d2 && (d2.n > 0 || d2.m) ? ` plus ${dmgText(d2, e.t2 ?? "")}` : "";
  const vd = int(e.vers);
  const vers = vd && r.dice.n > 0 && kind !== "ranged" ? `, or ${avg({ ...r.dice, d: vd })} (${formatDice({ ...r.dice, d: vd }, { spaced: true })}) two-handed${kind === "both" ? " in melee" : ""}` : "";
  const sp = (r.special ?? "").trim().replace(/\.$/, "");
  const tail = !sp ? "." : /^[,;]/.test(sp) ? sp + "." : ". " + sp + ".";
  return `${head} Hit: ${dmgText(r.dice, r.dtype ?? "")}${plus}${vers}${tail}`;
}

const DMG_RE = /^(\d+) \((\d+d\d+(?: [+-] \d+)?)\) (?:([A-Za-z]+) )?damage/;
const FLAT_RE = /^(\d+) (?:([A-Za-z]+) )?damage/;

/** Parse one stat-block action into an attack row, or null. Only accepted when
 *  composing the row reproduces the text exactly, so nothing is ever reworded. */
export function parseLotrAttack(name: string, desc: string, pb?: number, abilities?: Record<string, number>): AttackRow | null {
  const t = String(desc ?? "").trim();
  const m = t.match(/^(Melee or Ranged|Melee|Ranged) Weapon Attack: ([+-]\d+) to hit, (.+?), (one [^,.]+?)\. Hit: ([\s\S]*)$/);
  if (!m) return null;
  const kind = m[1] === "Melee" ? "melee" : m[1] === "Ranged" ? "ranged" : "both";
  const hit = int(m[2]), where = m[3], tgt = m[4];
  let rest = m[5];
  const reach = where.match(/reach (\d+) ft/)?.[1] ?? "";
  const rng = where.match(/range (\d+(?:\/\d+)?) ft/)?.[1] ?? "";
  let dice: Dice, dtype = "";
  let dm = rest.match(DMG_RE);
  if (dm) { dice = parseDice(dm[2].replace(/\s+/g, "")) ?? { n: 0, d: 6, m: 0 }; dtype = (dm[3] ?? "").toLowerCase(); rest = rest.slice(dm[0].length); }
  else {
    dm = rest.match(FLAT_RE);
    if (!dm) return null;
    dice = { n: 0, d: 6, m: int(dm[1]) }; dtype = (dm[2] ?? "").toLowerCase(); rest = rest.slice(dm[0].length);
  }
  let d2 = "", t2 = "", vers = "";
  const pm = rest.match(/^ plus (\d+) \((\d+d\d+(?: [+-] \d+)?)\) ([A-Za-z]+) damage/);
  if (pm) { d2 = pm[2].replace(/\s+/g, ""); t2 = pm[3].toLowerCase(); rest = rest.slice(pm[0].length); }
  const vm = rest.match(/^, or \d+ \((\d+)d(\d+)(?: [+-] \d+)?\) two-handed(?: in melee)?/);
  if (vm) { vers = vm[2]; rest = rest.slice(vm[0].length); }
  let special = rest.trim();
  if (special.startsWith(". ")) special = special.slice(2);
  special = special.replace(/\.$/, "");
  const row: AttackRow = {
    name: String(name ?? "").trim(), count: 1, hit, dice, dtype, special,
    extra: { kind, reach: reach || "5", rng: rng || "20/60", tgt, abil: "", vers, d2, t2 },
  };
  if (composeLotrAttack(row) !== t) return null;
  if (pb != null && abilities && dice.n > 0) {
    for (const a of kind === "ranged" ? ["DEX", "STR"] : ["STR", "DEX"]) {
      const mod = abilMod(abilities[a] ?? 10);
      if (hit === pb + mod && dice.m === mod) { row.extra!.abil = a; break; }
    }
  }
  return row;
}

/** Re-derive to-hit / damage mod of rows tied to an ability (after scores / CR change). */
export function syncLotrAttacks(rows: AttackRow[], pb: number, abilities: Record<string, number>): AttackRow[] {
  return rows.map((r) => {
    const a = r.extra?.abil;
    if (!a || !(a in abilities)) return r;
    const mod = abilMod(abilities[a]);
    if (r.hit === pb + mod && r.dice.m === mod) return r;
    return { ...r, hit: pb + mod, dice: { ...r.dice, m: r.dice.n > 0 ? mod : r.dice.m } };
  });
}

export function cleanLotrAttackRows(v: unknown): AttackRow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 20).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    const e = (o.extra ?? {}) as Record<string, unknown>;
    const dice = (o.dice ?? {}) as Record<string, unknown>;
    const d = int(dice.d, 6);
    const kind = ["melee", "ranged", "both"].includes(String(e.kind)) ? String(e.kind) : "melee";
    const rng = txt(e.rng, 12).match(/^\d{1,4}(\/\d{1,4})?$/)?.[0] ?? "20/60";
    const d2p = parseDice(txt(e.d2, 16));
    const vers = int(e.vers);
    return {
      name: txt(o.name, 60),
      count: 1,
      hit: clamp(int(o.hit), -5, 30),
      dice: { n: clamp(int(dice.n), 0, 40), d: d === 0 ? 6 : clamp(d, 2, 100), m: clamp(int(dice.m), -20, 99) },
      dtype: (DAMAGE_TYPES as readonly string[]).includes(String(o.dtype ?? "").toLowerCase()) ? String(o.dtype).toLowerCase() : "",
      special: txt(o.special, 600),
      extra: {
        kind,
        reach: String(clamp(int(e.reach, 5), 5, 120)),
        rng,
        tgt: txt(e.tgt, 60) || "one target",
        abil: (ABILS as readonly string[]).includes(String(e.abil)) ? String(e.abil) : "",
        vers: [4, 6, 8, 10, 12, 20].includes(vers) ? String(vers) : "",
        d2: d2p && d2p.n > 0 ? formatDice({ n: clamp(d2p.n, 1, 40), d: clamp(d2p.d, 2, 100), m: 0 }) : "",
        t2: (DAMAGE_TYPES as readonly string[]).includes(String(e.t2 ?? "").toLowerCase()) ? String(e.t2).toLowerCase() : "",
      },
    };
  });
}

// ── Monster: text rows with a usage ("Name (Recharge 6)") ────────────────────
export type UseRow = { name: string; use: string; description: string };
export const composeUseName = (r: UseRow) => (r.use ? `${r.name} (${r.use})` : r.name);
/** {name, description} → UseRow, lifting a known usage out of the name. */
export function splitUse(name: string, description: string): UseRow {
  const m = String(name ?? "").match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  const use = m ? USES.find((u) => u.toLowerCase() === m[2].trim().toLowerCase()) : undefined;
  return use && m ? { name: m[1].trim(), use, description: String(description ?? "") } : { name: String(name ?? "").trim(), use: "", description: String(description ?? "") };
}
export function cleanUseRows(v: unknown, max = 20): UseRow[] {
  return Array.isArray(v)
    ? v.map((x) => { const o = (x ?? {}) as Record<string, unknown>; return { name: txt(o.name, 120), use: oneOfS(o.use, USES, ""), description: txt(o.description, 4000) }; })
      .filter((r) => r.name || r.description).slice(0, max)
    : [];
}
export const composeUseRows = (rows: UseRow[]) => rows.filter((r) => r.name.trim() || r.description.trim()).map((r) => ({ name: composeUseName({ ...r, name: r.name.trim() }), description: r.description.trim() }));

// ── Monster: Strike Fear (Shadow points from Dread) ──────────────────────────
export type Fear = { on: boolean; points: number; dc: number; dcAuto: boolean };
export const blankFear = (): Fear => ({ on: false, points: 1, dc: 12, dcAuto: true });
export const fearDC = (f: Fear, pb: number, cha: number) => (f.dcAuto ? 8 + pb + abilMod(cha) : f.dc);
export function composeFear(points: number, dc: number): string {
  return `Each non-undead creature it chooses within 60 ft. that is aware of it gains ${points} Shadow point${points === 1 ? "" : "s"} from Dread, resisted by a DC ${dc} Charisma saving throw. On a failure the target is frightened for 1 minute (also stunned if it fails by 5 or more), repeating the save at the end of each of its turns. A creature that succeeds or recovers is immune to this creature's Strike Fear for 24 hours.`;
}
export function parseFear(name: string, desc: string): { points: number; dc: number } | null {
  if (String(name ?? "").trim() !== "Strike Fear") return null;
  const m = String(desc ?? "").match(/gains (\d+) Shadow points? from Dread, resisted by a DC (\d+) Charisma/);
  if (!m) return null;
  const f = { points: int(m[1], 1), dc: int(m[2], 12) };
  return composeFear(f.points, f.dc) === String(desc).trim() ? f : null;
}
export function cleanFear(v: unknown): Fear {
  const o = (v ?? {}) as Record<string, unknown>;
  return { on: !!o.on, points: clamp(int(o.points, 1), 1, 6), dc: clamp(int(o.dc, 12), 5, 30), dcAuto: o.dcAuto !== false };
}

/** actions from Multiattack, the attack rows, Strike Fear and the other action rows (book order). */
export function composeLotrActions(rows: AttackRow[], fear: Fear, actionRows: UseRow[], pb: number, cha: number) {
  const out = composeUseRows(actionRows);
  const multi = out.filter((a) => /^multiattack/i.test(a.name));
  const rest = out.filter((a) => !/^multiattack/i.test(a.name));
  const atk = rows.filter((r) => r.name.trim()).map((r) => ({ name: r.name.trim(), description: composeLotrAttack(r) }));
  const sf = fear.on ? [{ name: "Strike Fear", description: composeFear(fear.points, fearDC(fear, pb, cha)) }] : [];
  return [...multi, ...atk, ...sf, ...rest];
}

// ── Monster: the rest of the stat block ──────────────────────────────────────
export type LotrBlock = {
  hd: Dice; hpAuto: boolean; hp: number;
  speed: { walk: number; burrow: number; climb: number; fly: number; swim: number; hover: boolean; notes: string[] };
  saves: string[]; saveBonus: Record<string, number>;
  skills: Record<string, number>; skillBonus: Record<string, number>;
  senses: { blindsight: number; darkvision: number; tremorsense: number; truesight: number; notes: string[] };
  ppBonus: number | null; ppNote: string;   // "(20 by hearing or smell)"
  langs: string[];
  dres: string[]; dimm: string[]; dvul: string[]; cimm: string[];
  xpAuto: boolean; xp: number;
};
export function blankBlock(): LotrBlock {
  return {
    hd: { n: 2, d: 8, m: 0 }, hpAuto: true, hp: 9,
    speed: { walk: 30, burrow: 0, climb: 0, fly: 0, swim: 0, hover: false, notes: [] },
    saves: [], saveBonus: {}, skills: {}, skillBonus: {},
    senses: { blindsight: 0, darkvision: 0, tremorsense: 0, truesight: 0, notes: [] },
    ppBonus: null, ppNote: "", langs: ["Westron"], dres: [], dimm: [], dvul: [], cimm: [], xpAuto: true, xp: 0,
  };
}
export function blockHp(b: LotrBlock, size: string, con: number): { hp: number; formula: string } {
  if (b.hpAuto) {
    const n = Math.max(1, b.hd.n), d = SIZE_DIE[size] ?? 8, m = n * abilMod(con);
    const hp = Math.max(1, avg({ n, d, m }));
    return { hp, formula: `${hp} (${formatDice({ n, d, m }, { spaced: true })})` };
  }
  const hp = Math.max(1, b.hp);
  const f = formatDice(b.hd, { spaced: true });
  return { hp, formula: b.hd.n > 0 && f ? `${hp} (${f})` : String(hp) };
}
export const saveValue = (b: LotrBlock, a: string, abilities: Record<string, number>, pb: number) => b.saveBonus[a] ?? abilMod(abilities[a] ?? 10) + pb;
export const skillValue = (b: LotrBlock, s: string, abilities: Record<string, number>, pb: number) => {
  if (b.skillBonus[s] != null) return b.skillBonus[s];
  const ab = SKILLS.find((x) => x[0] === s)?.[1] ?? "WIS";
  return abilMod(abilities[ab] ?? 10) + pb * (b.skills[s] ?? 0);
};
export const passivePerception = (b: LotrBlock, abilities: Record<string, number>, pb: number) =>
  b.ppBonus ?? 10 + (b.skills.Perception || b.skillBonus.Perception != null ? skillValue(b, "Perception", abilities, pb) : abilMod(abilities.WIS ?? 10));

const isDmgType = (x: string) => (DAMAGE_TYPES as readonly string[]).includes(x.toLowerCase());
function joinDmg(list: string[]): string {
  return [list.filter(isDmgType).join(", "), ...list.filter((x) => !isDmgType(x))].filter(Boolean).join("; ");
}
export function splitDmg(s: string): string[] {
  const out: string[] = [];
  String(s ?? "").split(";").map((x) => x.trim()).filter(Boolean).forEach((seg) => {
    if (/\b(from|that|except|while|unless)\b/i.test(seg)) { out.push(seg); return; }
    seg.split(/,\s*(?:and\s+)?|\s+and\s+/).map((x) => x.trim()).filter(Boolean).forEach((x) => out.push(x));
  });
  return out;
}

export function composeLotrBlock(b: LotrBlock, abilities: Record<string, number>, cr: string, size: string) {
  const pb = crPB(cr);
  const { hp, formula } = blockHp(b, size, abilities.CON ?? 10);
  const sp = b.speed;
  const others = [sp.burrow ? `burrow ${sp.burrow} ft.` : "", sp.climb ? `climb ${sp.climb} ft.` : "", sp.fly ? `fly ${sp.fly} ft.${sp.hover ? " (hover)" : ""}` : "", sp.swim ? `swim ${sp.swim} ft.` : ""].filter(Boolean);
  const speed = [sp.walk || !others.length ? `${sp.walk} ft.` : "", ...others, ...sp.notes].filter(Boolean).join(", ");
  const savingThrows = ABILS.filter((a) => b.saves.includes(a)).map((a) => `${abilShort(a)} ${signed(saveValue(b, a, abilities, pb))}`).join(", ");
  const skills = SKILLS.filter(([s]) => b.skills[s] || b.skillBonus[s] != null).map(([s]) => `${s} ${signed(skillValue(b, s, abilities, pb))}`)
    .concat(Object.keys(b.skillBonus).filter((s) => !SKILLS.some((x) => x[0] === s)).map((s) => `${s} ${signed(b.skillBonus[s])}`)).join(", ");
  const se = b.senses;
  const senses = [
    se.blindsight ? `Blindsight ${se.blindsight} ft.` : "",
    se.darkvision ? `Darkvision ${se.darkvision} ft.` : "",
    se.tremorsense ? `Tremorsense ${se.tremorsense} ft.` : "",
    se.truesight ? `Truesight ${se.truesight} ft.` : "",
    ...se.notes,
    `Passive Perception ${passivePerception(b, abilities, pb)}${b.ppNote ? " " + b.ppNote : ""}`,
  ].filter(Boolean).join(", ");
  return {
    hp, hpFormula: formula, speed, savingThrows, skills, senses, languages: b.langs.join(", ") || "—",
    damageResistances: joinDmg(b.dres), damageImmunities: joinDmg(b.dimm), damageVulnerabilities: joinDmg(b.dvul),
    conditionImmunities: b.cimm.join(", "),
    xp: b.xpAuto ? CR_XP[cr] ?? 0 : b.xp, proficiencyBonus: pb,
  };
}

/** Best-effort structured block from a legacy (text-only) record. Anything not
 *  understood is kept in the notes / bonus overrides, never dropped. */
export function parseLotrBlock(d: Record<string, unknown>, abilities: Record<string, number>): LotrBlock {
  const b = blankBlock();
  const cr = String(d.cr ?? "1"), pb = crPB(cr), size = String(d.size ?? "Medium");
  const hp = int(d.hp, 1);
  const fm = String(d.hpFormula ?? "").match(/\((\d+)d(\d+)(?:\s*([+\-−])\s*(\d+))?\)/);
  b.hp = hp;
  if (fm) {
    b.hd = { n: int(fm[1]), d: int(fm[2]), m: fm[3] ? (fm[3] === "+" ? 1 : -1) * int(fm[4]) : 0 };
    b.hpAuto = b.hd.d === (SIZE_DIE[size] ?? 8) && b.hd.m === b.hd.n * abilMod(abilities.CON ?? 10) && avg(b.hd) === hp;
  } else { b.hd = { n: 0, d: SIZE_DIE[size] ?? 8, m: 0 }; b.hpAuto = false; }
  const sp = b.speed; sp.walk = 0;
  String(d.speed ?? "").split(/,\s*/).map((x) => x.trim()).filter(Boolean).forEach((seg, i) => {
    let m = seg.match(/^(\d+) ft\.?$/);
    if (m && i === 0) { sp.walk = int(m[1]); return; }
    m = seg.match(/^(burrow|climb|fly|swim) (\d+) ft\.?( \(hover\))?$/i);
    if (m) { const k = m[1].toLowerCase() as "burrow" | "climb" | "fly" | "swim"; sp[k] = int(m[2]); if (m[3]) sp.hover = true; return; }
    sp.notes.push(seg);
  });
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
  let pp: number | null = null;
  String(d.senses ?? "").split(/,\s*(?![^()]*\))/).map((x) => x.trim()).filter(Boolean).forEach((seg) => {
    let m = seg.match(/^Passive Perception (\d+)(?: (\(.+\)))?$/i); if (m) { pp = int(m[1]); b.ppNote = m[2] ?? ""; return; }
    m = seg.match(/^(Blindsight|Darkvision|Tremorsense|Truesight) (\d+) ft\.?$/i);
    if (m) { const k = m[1].toLowerCase() as "blindsight" | "darkvision" | "tremorsense" | "truesight"; b.senses[k] = int(m[2]); return; }
    b.senses.notes.push(seg);
  });
  if (pp != null && pp !== passivePerception(b, abilities, pb)) b.ppBonus = pp;
  b.langs = String(d.languages ?? "").split(/,\s*/).map((x) => x.trim()).filter((x) => x && x !== "—" && x !== "-");
  b.dres = splitDmg(String(d.damageResistances ?? ""));
  b.dimm = splitDmg(String(d.damageImmunities ?? ""));
  b.dvul = splitDmg(String(d.damageVulnerabilities ?? ""));
  b.cimm = String(d.conditionImmunities ?? "").split(/,\s*/).map((x) => x.trim()).filter(Boolean); // book case kept ("poisoned"); chips match case-insensitively
  const xp = int(d.xp, 0);
  b.xpAuto = !xp || xp === CR_XP[cr];
  b.xp = xp || CR_XP[cr] || 0;
  return b;
}

export function cleanLotrBlock(v: unknown): LotrBlock {
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
  b.senses = { blindsight: ft(se.blindsight), darkvision: ft(se.darkvision), tremorsense: ft(se.tremorsense), truesight: ft(se.truesight), notes: strArr(se.notes, 6, 80) };
  b.ppBonus = o.ppBonus == null || o.ppBonus === "" ? null : clamp(int(o.ppBonus, 10), 0, 40);
  b.ppNote = txt(o.ppNote, 60).match(/^\(.*\)$/) ? txt(o.ppNote, 60) : "";
  b.langs = strArr(o.langs, 20, 60);
  b.dres = strArr(o.dres, 16, 120); b.dimm = strArr(o.dimm, 16, 120); b.dvul = strArr(o.dvul, 16, 120);
  b.cimm = strArr(o.cimm, 16, 60);
  b.xpAuto = o.xpAuto !== false;
  b.xp = clamp(int(o.xp), 0, 1000000);
  return b;
}

// ── Items: cost, weight, weapon properties, Rewards ─────────────────────────
// LotR coinage: GP / SP (silver pennies) / CP; "—" when free.
export const COIN_UNITS = ["CP", "SP", "GP"];
export type Cost = { n: number; unit: string };
export const composeCost = (c: Cost) => (c.n > 0 ? `${c.n} ${c.unit}` : "—");
export function parseCost(s: string): Cost {
  const m = String(s ?? "").replace(/,/g, "").match(/(\d+)\s*(CP|SP|GP)\b/i);
  return m ? { n: int(m[1]), unit: m[2].toUpperCase() } : { n: 0, unit: "SP" };
}
/** Weight in whole pounds + an optional half ("1½ lb", "½ lb") and a kept suffix ("(full)"). */
export type Weight = { lb: number; half: boolean; note: string };
export const composeWeight = (w: Weight) => (w.lb > 0 || w.half ? `${w.lb > 0 ? w.lb : ""}${w.half ? "½" : ""} lb${w.note ? " " + w.note : ""}` : "—");
export function parseWeight(s: string): Weight {
  const m = String(s ?? "").trim().match(/^(\d+)?(½)?\s*lb\.?\s*(.*)$/);
  return m && (m[1] || m[2]) ? { lb: int(m[1]), half: !!m[2], note: m[3].trim() } : { lb: 0, half: false, note: "" };
}
export const WEAPON_PROPS = ["Ammunition", "Finesse", "Heavy", "Light", "Reach", "Thrown", "Two-Handed", "Versatile"];
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
/** The weapon Rewards the LotR sheet automates on an inventory row (data-rewards). */
export const WEAPON_REWARDS: [string, string][] = [
  ["Keen", "Keen — critical hit on 19–20"],
  ["Fell", "Fell — two extra damage dice on a critical hit"],
  ["Grievous", "Grievous — +1 damage"],
];
export const GEAR_CATEGORIES = ["Adventuring Gear", "Artisan's Tools", "Gaming Set", "Musical Instrument", "Other Tools", "Pipe-weed"];

// LootBonus "lotr" benefits (public/tools-data/dnd-loot-bonus.js registers the
// kinds) — the server re-validates what the badge UI emits.
const LB_STATS = ["str", "dex", "con", "int", "wis", "cha"];
const LB_RESIST = ["Acid", "Bludgeoning", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Piercing", "Poison", "Psychic", "Radiant", "Slashing", "Thunder"];
const LB_AMOUNT: Record<string, [number, number]> = { plus: [-5, 5], ac: [-10, 10], attack: [-10, 10], damage: [-10, 20], save: [-10, 10], speed: [-60, 120], stat: [-10, 10], setstat: [1, 30] };
export type LotrBenefit = { kind: string; target?: string; amount?: number };
export function cleanLotrBenefits(v: unknown): LotrBenefit[] {
  if (!Array.isArray(v)) return [];
  const out: LotrBenefit[] = [];
  for (const raw of v.slice(0, 24)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = String(o.kind ?? "").trim().toLowerCase(), t = String(o.target ?? "").trim(), n = Math.trunc(Number(o.amount) || 0);
    if (kind === "stat" || kind === "setstat") { const st = t.toLowerCase().slice(0, 3); if (LB_STATS.includes(st) && n) out.push({ kind, target: st, amount: clamp(n, ...LB_AMOUNT[kind]) }); }
    else if (kind in LB_AMOUNT) { if (n) out.push({ kind, amount: clamp(n, ...LB_AMOUNT[kind]) }); }
    else if (kind === "resist") { const r = LB_RESIST.find((x) => x.toLowerCase() === t.toLowerCase()); if (r) out.push({ kind, target: r }); }
    else if (kind === "note") { if (t) out.push({ kind, target: t.slice(0, 160) }); }
  }
  return out;
}

// ── Virtues: usage, ability increase, structured effects ────────────────────
// `uses` is the string the sheet's resource trackers parse ("PB/long", "1/short",
// "WIS/long"). `mods` / `grants` / `companion` are the fields the LotR sheet,
// creation wizard and level-up read (same keys the book virtues carry).
export const USE_COUNTS = ["1", "2", "3", "PB", "STR", "DEX", "CON", "INT", "WIS", "CHA"];
export type VirtueUses = { count: string; rest: "short" | "long" };
export const composeUses = (u: VirtueUses) => (u.count ? `${u.count}/${u.rest}` : "");
export function parseUses(s: string): VirtueUses {
  const m = String(s ?? "").trim().match(/^(\d+|PB|STR|DEX|CON|INT|WIS|CHA)\s*\/\s*(short|long)/i);
  return m ? { count: /^\d+$/.test(m[1]) ? m[1] : m[1].toUpperCase(), rest: m[2].toLowerCase() as "short" | "long" } : { count: "", rest: "long" };
}
/** Effect badges ↔ {mods, grants, companion}. */
export type VirtueEffect = { kind: string; target?: string; amount?: number };
const MOD_KINDS = ["fellowship", "acNoShield", "strDamage", "hpPerLevel"] as const;
export function effectsToFields(list: VirtueEffect[]) {
  const mods: Record<string, number | boolean> = {}, skills: string[] = [], expertise: string[] = [], saves: string[] = [];
  let companion = "";
  (list ?? []).forEach((b) => {
    const n = clamp(int(b.amount), -5, 10);
    if ((MOD_KINDS as readonly string[]).includes(b.kind)) { if (n) mods[b.kind] = ((mods[b.kind] as number) || 0) + n; }
    else if (b.kind === "maxHitDice") mods.maxHitDice = true;
    else if (b.kind === "skill" && SKILL_NAMES.includes(String(b.target)) && !skills.includes(String(b.target))) skills.push(String(b.target));
    else if (b.kind === "expertise" && SKILL_NAMES.includes(String(b.target)) && !expertise.includes(String(b.target))) expertise.push(String(b.target));
    else if (b.kind === "save" && (ABILS as readonly string[]).includes(String(b.target).toUpperCase()) && !saves.includes(String(b.target).toUpperCase())) saves.push(String(b.target).toUpperCase());
    else if (b.kind === "pony") companion = "Pony";
  });
  const grants: Record<string, string[]> = {};
  if (skills.length) grants.skills = skills;
  if (expertise.length) grants.expertise = expertise;
  if (saves.length) grants.saves = saves;
  return { mods, grants, companion };
}
export function fieldsToEffects(d: Record<string, unknown>): VirtueEffect[] {
  const out: VirtueEffect[] = [];
  const mods = (d.mods ?? {}) as Record<string, unknown>, grants = (d.grants ?? {}) as Record<string, unknown>;
  MOD_KINDS.forEach((k) => { const n = int(mods[k]); if (n) out.push({ kind: k, amount: n }); });
  if (mods.maxHitDice) out.push({ kind: "maxHitDice" });
  strArr(grants.skills, 19, 40).forEach((s) => out.push({ kind: "skill", target: s }));
  strArr(grants.expertise, 19, 40).forEach((s) => out.push({ kind: "expertise", target: s }));
  strArr(grants.saves, 6, 3).forEach((s) => out.push({ kind: "save", target: s.toUpperCase() }));
  if (d.companion === "Pony") out.push({ kind: "pony" });
  return out;
}
/** Server: keep only the effect fields the sheet reads, bounded. Unknown book-style keys pass through untouched. */
export function cleanVirtueFields(o: Record<string, unknown>) {
  const { mods, grants, companion } = effectsToFields(Array.isArray(o.effects) ? (o.effects as VirtueEffect[]) : fieldsToEffects(o));
  return { mods, grants, companion };
}

// ── Backgrounds: the tool proficiency string the creation wizard parses ─────
// lotr-sheet-builder.js toolOptions(): "Smith's tools" (fixed), "Brewer's
// supplies or cook's utensils" (choose), "A musical instrument of your choice",
// "A gaming set of your choice", "A gaming set or a musical instrument of your
// choice", "One tool of your choice".
export const TOOLS = [
  "Brewer's supplies", "Calligrapher's supplies", "Carpenter's tools", "Cartographer's tools", "Cobbler's tools", "Cook's utensils", "Glassblower's tools",
  "Jeweller's tools", "Leatherworker's tools", "Mason's tools", "Painter's supplies", "Potter's tools", "Smith's tools", "Weaver's tools", "Woodcarver's tools",
  "Herbalism kit", "Navigator's tools", "Thieves' tools", "Pipes", "Land vehicles", "Water vehicles",
];
export const TOOL_KINDS: [string, string][] = [["list", "Specific tool(s)"], ["instrument", "A musical instrument of choice"], ["gaming", "A gaming set of choice"], ["either", "A gaming set or instrument"], ["any", "Any one tool"], ["none", "None"], ["custom", "Custom text"]];
export type ToolSpec = { kind: string; tools: string[]; custom: string };
const lcFirst = (s: string) => (s ? s[0].toLowerCase() + s.slice(1) : s);
export function composeTool(t: ToolSpec): string {
  switch (t.kind) {
    case "instrument": return "A musical instrument of your choice";
    case "gaming": return "A gaming set of your choice";
    case "either": return "A gaming set or a musical instrument of your choice";
    case "any": return "One tool of your choice";
    case "none": return "";
    case "custom": return t.custom.trim();
    default: {
      const xs = t.tools.filter(Boolean).map((x, i) => (i ? lcFirst(x) : cap(x)));
      if (xs.length <= 2) return xs.join(" or ");
      return `${xs.slice(0, -1).join(", ")}, or ${xs[xs.length - 1]}`;
    }
  }
}
export function parseTool(s: string): ToolSpec {
  const t = String(s ?? "").trim();
  const base: ToolSpec = { kind: "list", tools: [], custom: "" };
  if (!t) return { ...base, kind: "none" };
  for (const k of ["instrument", "gaming", "either", "any"]) if (composeTool({ ...base, kind: k }).toLowerCase() === t.toLowerCase()) return { ...base, kind: k };
  const parts = t.split(/,\s*(?:or\s+)?|\s+or\s+/i).map((x) => x.trim()).filter(Boolean);
  const tools = parts.map((p) => TOOLS.find((x) => x.toLowerCase() === p.toLowerCase()));
  if (tools.every(Boolean) && composeTool({ ...base, tools: tools as string[] }).toLowerCase() === t.toLowerCase()) return { ...base, tools: tools as string[] };
  return { ...base, kind: "custom", custom: t };
}
