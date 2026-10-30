// ── Nimble homebrew rules (pure, no React) ───────────────────────────────────
// Vocabulary, the Monster Builder table and the compose/parse pairs that turn
// builder data into the exact strings the Nimble consumers already read:
//   item     damage "1d8+STR Slashing", armor "6+DEX (max 2)", properties
//            "2-handed, Range 16 (Req. 1 STR)", cost "60 gp" (sheet store,
//            equip, attack roller, equipment page)
//   monster  abilities [{name, text}] — "Stab (2×)" / "(Reach 2) 1d6+15. OR:";
//            the GM Screen rolls the first NdX±M in each text (no to-hit roll:
//            a 1 on the primary die misses, its top face crits); saves "STR+, INT–"
//   spell    text "Range: 8. Damage: 1d10. … High Levels: +5 damage every 5
//            levels." (the sheet's Cast reads Damage: and the scaling line)
//   ancestry trait text "+2 max Hit Dice, +1 max Wounds, –1 Speed. …" plus a
//            structured `grants` list the sheet applies directly
// Imported by the "use client" builders AND by lib/homebrew.ts, so the live
// preview and the stored text always agree.
import { formatDice, type Dice } from "../dice";
import type { AttackRow } from "../AttackRows";

// ── vocabulary ───────────────────────────────────────────────────────────────
export const NIM_STATS = ["STR", "DEX", "INT", "WIL"] as const;
export const NIM_SKILLS = ["Arcana", "Examination", "Finesse", "Influence", "Insight", "Lore", "Might", "Naturecraft", "Perception", "Stealth"] as const;
export const NIM_SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;
export const NIM_LANGUAGES = ["Common", "Dwarvish", "Elvish", "Goblin", "Infernal", "Thieves’ Cant", "Celestial", "Draconic", "Primordial", "Deep Speak"] as const;
export const NIM_ITEM_CATEGORIES = ["Melee Weapon", "Ranged Weapon", "Cloth", "Leather", "Mail", "Plate", "Shield", "Key Equipment", "Adventuring Gear", "Magic Item", "Spell Scroll", "Wand"] as const;
export const NIM_ARMOR_CATS = ["Cloth", "Leather", "Mail", "Plate"] as const;
export const NIM_WEAPON_CATS = ["Melee Weapon", "Ranged Weapon"] as const;
export const NIM_DICE = [4, 6, 8, 10, 12, 20];
export const NIM_PHYS_TYPES = ["Bludgeoning", "Piercing", "Slashing"] as const;
export const NIM_DAMAGE_TYPES = ["acid", "bludgeoning", "cold", "fire", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing"] as const;
export const NIM_RARITIES = ["Uncommon", "Rare", "Very Rare", "Legendary", "Combat Item", "Reward", "Story Item"] as const;
export const NIM_SCHOOLS = ["Fire", "Ice", "Lightning", "Wind", "Radiant", "Necrotic"] as const;
export const NIM_TARGETING = ["Single Target", "Single Target+", "2 Targets", "Multi-target", "AoE", "Self", "Single Target/Self", "Summon", "Special", "Utility"] as const;
export const NIM_ACTIONS = ["1 Action", "2 Actions", "3 Actions", "5 Actions", "Casting Time: 1 min", "Casting Time: 10 min", "Casting Time: 1 hour", "Casting Time: 24 hours"] as const;
export const NIM_CONCENTRATION = ["Up to 1 minute", "Up to 10 minutes", "Up to 1 hour"] as const;
export const NIM_MON_LEVELS = ["1/4", "1/3", "1/2", ...Array.from({ length: 30 }, (_, i) => String(i + 1))];
export const NIM_FAMILIES = ["Kobolds", "Goblins", "Bandits", "Snakemen", "Dungeon Denizens", "Hill & Field", "Undead", "Forest Denizens", "Cultists/Horrors", "Underground", "Legendary"];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const int = (v: unknown, d = 0) => { const n = parseInt(String(v ?? "").replace(/[–−]/g, "-"), 10); return Number.isFinite(n) ? n : d; };
const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
/** Book-style signed number: "+2" / "–1" (en dash). */
export const nimSigned = (n: number) => (n < 0 ? `–${-n}` : `+${n}`);

// ── LootBonus "nim" benefits (server-side validator; mirrors nim-loot-bonus.js)
export type NimBenefit = { kind: string; target?: string; amount?: number };
const LB_AMOUNT: Record<string, [number, number]> = { armor: [-10, 10], damage: [-20, 20], save: [-5, 5], hp: [-50, 50], speed: [-6, 12], stat: [-5, 5] };
const LB_DICE = ["d4", "d6", "d8", "d10", "d12"];
const LB_STATS: Record<string, string> = { str: "str", strength: "str", dex: "dex", dexterity: "dex", int: "int", intelligence: "int", wil: "wil", will: "wil" };
export function cleanNimBenefits(v: unknown): NimBenefit[] {
  if (!Array.isArray(v)) return [];
  const out: NimBenefit[] = [];
  for (const raw of v.slice(0, 24)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = s(o.kind).trim().toLowerCase(), t = s(o.target).trim(), n = Math.trunc(Number(o.amount) || 0);
    if (kind in LB_AMOUNT && kind !== "stat") { if (n) out.push({ kind, amount: clamp(n, ...LB_AMOUNT[kind]) }); }
    else if (kind === "stat") { const st = LB_STATS[t.toLowerCase()]; if (st && n) out.push({ kind, target: st, amount: clamp(n, ...LB_AMOUNT.stat) }); }
    else if (kind === "die") { const d = LB_DICE.find((x) => x === t.toLowerCase()); if (d) out.push({ kind, target: d }); }
    else if (kind === "spell") { if (t) out.push({ kind, target: t.slice(0, 60) }); }
    else if (kind === "note") { if (t) out.push({ kind, target: t.slice(0, 160) }); }
  }
  return out;
}

// ═══ ITEMS ═══════════════════════════════════════════════════════════════════
export type NimProps = {
  twoHanded: boolean; light: boolean; vicious: boolean;
  range: number; reach: number; thrown: number; load: number; stack: number; req: number;
  extra: string[];
};
export type NimItemBuild = {
  dmg: Dice;                  // n dice of d, + flat m
  dmgStat: string;            // "" | STR | DEX | KEY
  dmgTypes: string[];         // Bludgeoning / Piercing / Slashing
  dmgText: string;            // legacy damage that didn't parse — wins when set
  props: NimProps;
  armor: number;              // base armor (armor) / armor value (shield)
  armorDex: "full" | "max2" | "none";
  cost: number;               // 0 = no price
  costUnit: "gp" | "sp";
  costText: string;           // legacy cost that isn't "N gp/sp" ("5–50 gp") — wins when set
  tier: number;               // spell scroll / wand: 0 = cantrip, −1 = not stated
  charges: number;            // wand charges (0 = not shown)
  effect: string;             // gear / key equipment one-liner (the book's properties column)
};

export const blankProps = (): NimProps => ({ twoHanded: false, light: false, vicious: false, range: 0, reach: 0, thrown: 0, load: 0, stack: 0, req: 0, extra: [] });
export const isWeaponCat = (c: string) => (NIM_WEAPON_CATS as readonly string[]).includes(c);
export const isArmorCat = (c: string) => (NIM_ARMOR_CATS as readonly string[]).includes(c);
export const isSpellItemCat = (c: string) => c === "Spell Scroll" || c === "Wand";
/** Categories whose properties column is the structured weapon/armor list (else it's an effect line). */
export const hasPropList = (c: string) => isWeaponCat(c) || isArmorCat(c) || c === "Shield";

export function composeNimProps(p: NimProps): string {
  const parts: string[] = [];
  if (p.twoHanded) parts.push("2-handed");
  if (p.light) parts.push("Light");
  if (p.load) parts.push(`Load: ${p.load} action${p.load === 1 ? "" : "s"}`);
  if (p.range) parts.push(`Range ${p.range}`);
  if (p.reach) parts.push(`Reach ${p.reach}`);
  if (p.thrown) parts.push(`Thrown ${p.thrown}`);
  if (p.stack) parts.push(`Stack of ${p.stack}`);
  if (p.vicious) parts.push("Vicious");
  parts.push(...p.extra.map((x) => x.trim()).filter(Boolean));
  const base = parts.join(", ");
  if (!p.req) return base;
  return base ? `${base} (Req. ${p.req} STR)` : `Req. ${p.req} STR`;
}
export function parseNimProps(raw: string): NimProps {
  const p = blankProps();
  let t = s(raw).trim();
  const rq = /\s*\(Req\. (\d+) STR\)$/.exec(t);
  if (rq) { p.req = int(rq[1]); t = t.slice(0, rq.index).trim(); }
  for (const part of t ? t.split(/,\s*/) : []) {
    let m: RegExpExecArray | null;
    if (part === "2-handed") p.twoHanded = true;
    else if (part === "Light") p.light = true;
    else if (part === "Vicious") p.vicious = true;
    else if ((m = /^Range (\d+)$/.exec(part))) p.range = int(m[1]);
    else if ((m = /^Reach (\d+)$/.exec(part))) p.reach = int(m[1]);
    else if ((m = /^Thrown (\d+)$/.exec(part))) p.thrown = int(m[1]);
    else if ((m = /^Load: (\d+) actions?$/.exec(part))) p.load = int(m[1]);
    else if ((m = /^Stack of (\d+)$/.exec(part))) p.stack = int(m[1]);
    else if ((m = /^Req\. (\d+) STR$/.exec(part)) && !p.req) p.req = int(m[1]);
    else p.extra.push(part);
  }
  return p;
}

export function composeNimDamage(b: Pick<NimItemBuild, "dmg" | "dmgStat" | "dmgTypes" | "dmgText">): string {
  if (b.dmgText.trim()) return b.dmgText.trim();
  if (b.dmg.n <= 0) return "";
  const base = formatDice({ n: b.dmg.n, d: b.dmg.d, m: b.dmg.m }) + (b.dmgStat ? `+${b.dmgStat}` : "");
  return b.dmgTypes.length ? `${base} ${b.dmgTypes.join("/")}` : base;
}
export function parseNimDamage(raw: string): Pick<NimItemBuild, "dmg" | "dmgStat" | "dmgTypes" | "dmgText"> {
  const t = s(raw).trim();
  const m = /^(\d+)d(\d+)(?:([+-])(\d+))?(?:\+(STR|DEX|KEY))?(?: ((?:Bludgeoning|Piercing|Slashing)(?:\/(?:Bludgeoning|Piercing|Slashing))*))?$/.exec(t);
  if (!m) return { dmg: { n: 1, d: 6, m: 0 }, dmgStat: "STR", dmgTypes: [], dmgText: t };
  return {
    dmg: { n: int(m[1]), d: int(m[2]), m: m[3] ? (m[3] === "-" ? -1 : 1) * int(m[4]) : 0 },
    dmgStat: m[5] ?? "", dmgTypes: m[6] ? m[6].split("/") : [], dmgText: "",
  };
}

export function composeNimArmor(cat: string, b: Pick<NimItemBuild, "armor" | "armorDex">): string {
  if (cat === "Shield") return String(b.armor);
  return b.armorDex === "full" ? `${b.armor}+DEX` : b.armorDex === "max2" ? `${b.armor}+DEX (max 2)` : String(b.armor);
}
export function parseNimArmor(raw: string): Pick<NimItemBuild, "armor" | "armorDex"> | null {
  const m = /^(\d+)(\+DEX)?( \(max 2\))?$/.exec(s(raw).trim());
  if (!m) return null;
  return { armor: int(m[1]), armorDex: m[2] ? (m[3] ? "max2" : "full") : "none" };
}

export function composeNimCost(b: Pick<NimItemBuild, "cost" | "costUnit" | "costText">): string {
  if (b.costText.trim()) return b.costText.trim();
  return b.cost > 0 ? `${b.cost.toLocaleString("en-US")} ${b.costUnit}` : "";
}
export function parseNimCost(raw: string): Pick<NimItemBuild, "cost" | "costUnit"> | null {
  const m = /^([\d,]+) (gp|sp)$/.exec(s(raw).trim());
  return m ? { cost: int(m[1].replace(/,/g, "")), costUnit: m[2] as "gp" | "sp" } : null;
}

/** Wand "Tier 2 (3 charges)" / "Cantrip (3 charges)"; scroll "Tier 2". */
export function composeNimSpellItem(cat: string, b: Pick<NimItemBuild, "tier" | "charges">): string {
  if (b.tier < 0) return "";
  const t = b.tier ? `Tier ${b.tier}` : "Cantrip";
  return cat === "Wand" && b.charges ? `${t} (${b.charges} charge${b.charges === 1 ? "" : "s"})` : t;
}
export function parseNimSpellItem(raw: string): Pick<NimItemBuild, "tier" | "charges"> | null {
  const m = /^(?:Tier (\d)|Cantrip)(?: \((\d+) charges?\))?$/.exec(s(raw).trim());
  return m ? { tier: m[1] ? int(m[1]) : 0, charges: m[2] ? int(m[2]) : 0 } : null;
}

export function blankItemBuild(): NimItemBuild {
  return { dmg: { n: 1, d: 6, m: 0 }, dmgStat: "STR", dmgTypes: ["Slashing"], dmgText: "", props: blankProps(), armor: 3, armorDex: "full", cost: 10, costUnit: "gp", costText: "", tier: 1, charges: 0, effect: "" };
}

/** Clamp a stored/posted build (server + client). */
export function cleanItemBuild(raw: unknown): NimItemBuild {
  const o = (raw ?? {}) as Record<string, unknown>;
  const b = blankItemBuild();
  const d = (o.dmg ?? {}) as Record<string, unknown>;
  const p = (o.props ?? {}) as Record<string, unknown>;
  const n0 = (v: unknown, hi: number) => clamp(int(v), 0, hi);
  return {
    dmg: { n: n0(d.n, 10), d: NIM_DICE.includes(int(d.d)) ? int(d.d) : 6, m: clamp(int(d.m), -20, 50) },
    dmgStat: ["STR", "DEX", "KEY"].includes(s(o.dmgStat)) ? s(o.dmgStat) : "",
    dmgTypes: (Array.isArray(o.dmgTypes) ? o.dmgTypes : []).map(s).filter((x) => (NIM_PHYS_TYPES as readonly string[]).includes(x)),
    dmgText: s(o.dmgText).trim().slice(0, 60),
    props: {
      twoHanded: !!p.twoHanded, light: !!p.light, vicious: !!p.vicious,
      range: n0(p.range, 60), reach: n0(p.reach, 10), thrown: n0(p.thrown, 30), load: n0(p.load, 5), stack: n0(p.stack, 20), req: n0(p.req, 10),
      extra: (Array.isArray(p.extra) ? p.extra : []).map((x) => s(x).trim().slice(0, 60)).filter(Boolean).slice(0, 8),
    },
    armor: n0(o.armor ?? b.armor, 30),
    armorDex: o.armorDex === "max2" || o.armorDex === "none" ? o.armorDex : "full",
    cost: n0(o.cost, 10_000_000),
    costUnit: o.costUnit === "sp" ? "sp" : "gp",
    costText: s(o.costText).trim().slice(0, 40),
    tier: clamp(int(o.tier, -1), -1, 9),
    charges: n0(o.charges, 20),
    effect: s(o.effect).trim().slice(0, 200),
  };
}

/** The book-shape fields an item's build composes (category decides which). */
export function composeItemFields(cat: string, b: NimItemBuild, rarity = ""): { damage?: string; armor?: string; properties?: string; cost?: string } {
  const out: { damage?: string; armor?: string; properties?: string; cost?: string } = {};
  if (isWeaponCat(cat)) { const dm = composeNimDamage(b); if (dm) out.damage = dm; }
  if (isArmorCat(cat) || cat === "Shield") out.armor = composeNimArmor(cat, b);
  const props = hasPropList(cat) ? composeNimProps(b.props) : isSpellItemCat(cat) ? composeNimSpellItem(cat, b) || b.effect.trim() : b.effect.trim();
  if (props) out.properties = props;
  // A priceless magic item lists its rarity as its cost, as the book does.
  const cost = composeNimCost(b) || rarity.trim();
  if (cost) out.cost = cost;
  return out;
}

/** Best-effort: a legacy (text-only) item → a build. Unparseable text is kept verbatim. */
export function parseItemBuild(d: Record<string, unknown>): NimItemBuild {
  const cat = s(d.category);
  const b = blankItemBuild();
  b.dmgStat = ""; b.dmgTypes = [];
  if (s(d.damage)) Object.assign(b, parseNimDamage(s(d.damage)));
  else if (isWeaponCat(cat)) { b.dmgStat = "STR"; b.dmgTypes = ["Slashing"]; }
  const ar = parseNimArmor(s(d.armor));
  if (ar) Object.assign(b, ar);
  else if (cat === "Shield") b.armor = 2;
  const props = s(d.properties);
  if (hasPropList(cat)) b.props = parseNimProps(props);
  else if (isSpellItemCat(cat)) { const si = props ? parseNimSpellItem(props) : { tier: -1, charges: 0 }; if (si) Object.assign(b, si); else { b.tier = -1; b.effect = props; } }
  else b.effect = props;
  const c = parseNimCost(s(d.cost));
  b.cost = 0;
  if (c) Object.assign(b, c);
  else if (s(d.cost) && s(d.cost) !== s(d.rarity)) b.costText = s(d.cost);
  return b;
}

// ═══ MONSTERS ════════════════════════════════════════════════════════════════
// Monster Builder table (GM's Guide p.29): HP by armor, damage per round, save DC.
export const NIM_MON_TABLE: Record<string, { hp: [number, number, number]; dpr: number; dc: number; sample: string }> = {
  "1/4": { hp: [12, 9, 7], dpr: 3, dc: 9, sample: "1d4+1" }, "1/3": { hp: [15, 11, 8], dpr: 5, dc: 9, sample: "1d6+2" }, "1/2": { hp: [18, 15, 11], dpr: 7, dc: 10, sample: "1d6+3" },
  "1": { hp: [26, 20, 16], dpr: 11, dc: 10, sample: "2d8+2 or (2×) 1d8+1" }, "2": { hp: [34, 27, 20], dpr: 13, dc: 11, sample: "2d8+4 or (2×) 1d8+3" },
  "3": { hp: [41, 33, 25], dpr: 15, dc: 11, sample: "2d8+6 or (2×) 1d8+4" }, "4": { hp: [49, 39, 29], dpr: 18, dc: 12, sample: "2d8+9 or (2×) 1d8+5" },
  "5": { hp: [58, 46, 35], dpr: 19, dc: 12, sample: "2d8+10 or (2×) 1d8+6" }, "6": { hp: [68, 54, 41], dpr: 21, dc: 13, sample: "2d8+12 or (2×) 1d8+7" },
  "7": { hp: [79, 63, 47], dpr: 24, dc: 13, sample: "3d8+10 or (2×) 2d8+4" }, "8": { hp: [91, 73, 55], dpr: 26, dc: 14, sample: "3d8+12 or (2×) 2d8+5" },
  "9": { hp: [104, 83, 62], dpr: 28, dc: 14, sample: "4d8+10 or (2×) 2d8+6" }, "10": { hp: [118, 94, 71], dpr: 30, dc: 15, sample: "4d8+12 or (2×) 2d8+7" },
  "11": { hp: [133, 106, 80], dpr: 33, dc: 15, sample: "5d8+11 or (2×) 3d8+3" }, "12": { hp: [149, 119, 89], dpr: 35, dc: 16, sample: "5d8+13 or (2×) 3d8+4" },
  "13": { hp: [166, 132, 100], dpr: 38, dc: 16, sample: "6d8+11 or (2×) 3d8+6" }, "14": { hp: [184, 147, 110], dpr: 40, dc: 17, sample: "6d8+13 or (2×) 3d8+7" },
  "15": { hp: [203, 162, 122], dpr: 43, dc: 17, sample: "7d8+11 or (2×) 3d8+8" }, "16": { hp: [223, 178, 134], dpr: 45, dc: 18, sample: "7d8+13 or (2×) 4d8+5" },
  "17": { hp: [244, 195, 146], dpr: 48, dc: 18, sample: "8d8+12 or (2×) 4d8+6" }, "18": { hp: [266, 213, 160], dpr: 50, dc: 19, sample: "8d8+14 or (2×) 4d8+7" },
  "19": { hp: [289, 231, 173], dpr: 52, dc: 19, sample: "9d8+12 or (2×) 4d8+8" }, "20": { hp: [313, 250, 189], dpr: 54, dc: 20, sample: "9d8+13 or (2×) 4d8+9" },
};
/** Builder-table HP for a level + armor ("" / M / H); null when off the table. */
export function nimMonsterHp(level: string, armor: string): number | null {
  const r = NIM_MON_TABLE[level];
  return r ? r.hp[armor === "H" ? 2 : armor === "M" ? 1 : 0] : null;
}
/** Average damage per round of the attack rows (an "OR" alternative counts its best option). */
export function nimAvgDpr(rows: AttackRow[]): number {
  const avg = (r: AttackRow) => (r.dice.n * (r.dice.d + 1)) / 2 + r.dice.m;
  let total = 0, group = 0;
  for (const r of rows) {
    group = Math.max(group, avg(r) * Math.max(1, r.count));
    if (r.extra?.join !== "OR") { total += group; group = 0; }
  }
  return Math.round(total + group);
}

// Saves: per-stat advantage steps (+3 … −3) or one ALL value.
export type NimSaves = { all: number; STR: number; DEX: number; INT: number; WIL: number };
export const blankSaves = (): NimSaves => ({ all: 0, STR: 0, DEX: 0, INT: 0, WIL: 0 });
const saveSym = (n: number) => (n > 0 ? "+".repeat(n) : "–".repeat(-n));
export function composeNimSaves(v: NimSaves): string {
  if (v.all) return `ALL${saveSym(v.all)}`;
  return NIM_STATS.filter((k) => v[k]).map((k) => `${k}${saveSym(v[k])}`).join(", ");
}
export function parseNimSaves(raw: string): NimSaves | null {
  const out = blankSaves();
  const t = s(raw).trim();
  if (!t) return out;
  for (const part of t.split(/,\s*/)) {
    const m = /^(STR|DEX|INT|WIL|ALL)(\++|[–−-]+)$/.exec(part);
    if (!m) return null;
    const n = clamp((m[2][0] === "+" ? 1 : -1) * m[2].length, -3, 3);
    if (m[1] === "ALL") out.all = n; else out[m[1] as keyof NimSaves] = n;
  }
  return out;
}
export function cleanSaves(raw: unknown): NimSaves {
  const o = (raw ?? {}) as Record<string, unknown>;
  const c = (v: unknown) => clamp(int(v), -3, 3);
  return { all: c(o.all), STR: c(o.STR), DEX: c(o.DEX), INT: c(o.INT), WIL: c(o.WIL) };
}

// Attack rows → book ability lines. Row: name, count (×N), dice, dtype, special,
// range ("Melee" | "Reach" | "Range"), extra { dist, target, join ("" | OR | Then) },
// plus book-wording flags: dw "1" → "2d6 damage" with no type, sj "sp" → the special
// follows a space ("1d6 melee/ranged (…)"), end "none" → no closing "." ("1d4 (escape DC 9) OR:").
export const NIM_ATK_RANGES = ["Melee", "Reach", "Range"];
export type NimTrait = { name: string; text: string; at: number };

export function composeNimAttack(r: AttackRow): { name: string; text: string } {
  const name = r.name.trim() + (r.count > 1 ? ` (${r.count}×)` : "");
  const dist = r.range === "Reach" || r.range === "Range" ? `${r.range} ${Math.max(1, int(r.extra?.dist, 1))}` : "";
  // Distance normally leads ("(Reach 2) 1d6+15."); book rows written "1d6+2 (Range 8)." keep it trailing (extra.rpos "after").
  const after = !!dist && r.extra?.rpos === "after" && !(r.extra?.target ?? "").trim();
  const pre = after ? "" : [dist, (r.extra?.target ?? "").trim()].filter(Boolean).join(", ");
  let body = (pre ? `(${pre}) ` : "") + formatDice(r.dice) + (r.dtype ? ` ${r.dtype} damage` : r.extra?.dw === "1" ? " damage" : "") + (after ? ` (${dist})` : "");
  const sp = r.special.trim();
  if (sp) body += (sp[0] === "(" || r.extra?.sj === "sp" ? " " : sp[0] === "," ? "" : ". ") + sp;
  if (r.extra?.end !== "none" && (!/[.!?:)]$/.test(body) || /\)$/.test(body))) body += ".";
  const join = r.extra?.join ?? "";
  if (join === "OR" || join === "Then") body += ` ${join}:`;
  return { name, text: body };
}
/** Parse one book ability as an attack row; null unless it re-composes byte-exact. */
export function parseNimAttack(a: { name: string; text: string }): AttackRow | null {
  const nm = /^(.*?)\s*\((\d+)×\)$/.exec(a.name.trim());
  const name = nm ? nm[1] : a.name.trim();
  const count = nm ? int(nm[2], 1) : 1;
  let t = a.text.trim();
  let join = "";
  const j = / (OR|Then):$/.exec(t);
  if (j) { join = j[1]; t = t.slice(0, j.index); }
  const types = NIM_DAMAGE_TYPES.join("|");
  const m = new RegExp(`^(?:\\(([^)]*)\\) )?(\\d+)d(\\d+)(?:([+-])(\\d+))?(?: (?:(${types}) )?(damage)(?=[ .,]|$))?(.*)$`).exec(t);
  if (!m) return null;
  let range = "Melee", dist = "", target = "";
  if (m[1] != null) {
    const p = /^(Reach|Range) (\d+)(?:, (.*))?$/.exec(m[1]);
    if (p) { range = p[1]; dist = p[2]; target = p[3] ?? ""; } else target = m[1];
  }
  let rest = m[8];
  let rpos = "";
  const post = /^ \((Reach|Range) (\d+)\)(?=\.|$)/.exec(rest);
  if (post && m[1] == null) { range = post[1]; dist = post[2]; rpos = "after"; rest = rest.slice(post[0].length); }
  // The special and how it joins: ". On hit…" | " (…)" | ", on hit…" | " to all enemies…" (sj "sp").
  let base: string, sj = "";
  if (rest === "." || rest === "") base = "";
  else if (rest.startsWith(". ")) base = rest.slice(2);
  else if (rest.startsWith(" (")) base = rest.slice(1);
  else if (rest.startsWith(",")) base = rest;
  else if (rest.startsWith(" ")) { base = rest.slice(1); sj = "sp"; }
  else return null;
  const flags = { ...(m[7] && !m[6] ? { dw: "1" } : {}), ...(sj ? { sj } : {}) };
  for (const special of base.endsWith(".") ? [base, base.slice(0, -1)] : [base]) {
    for (const end of ["", "none"]) {
      const row: AttackRow = {
        name, count, hit: null,
        dice: { n: int(m[2]), d: int(m[3]), m: m[4] ? (m[4] === "-" ? -1 : 1) * int(m[5]) : 0 },
        range, dtype: m[6] ?? "", special,
        extra: { dist: dist || (range === "Melee" ? "" : "1"), target, join, ...(rpos ? { rpos } : {}), ...flags, ...(end ? { end } : {}) },
      };
      const back = composeNimAttack(row);
      if (back.name === a.name.trim() && back.text === a.text.trim()) return row;
    }
  }
  return null;
}

/** Interleave traits (each placed after `at` attacks) and attacks into book abilities. */
export function composeNimAbilities(attacks: AttackRow[], traits: NimTrait[]): { name: string; text: string }[] {
  const out: { name: string; text: string }[] = [];
  const tr = traits.filter((t) => t.name.trim() || t.text.trim());
  for (let k = 0; k <= attacks.length; k++) {
    tr.filter((t) => clamp(t.at, 0, attacks.length) === k).forEach((t) => out.push({ name: t.name.trim(), text: t.text.trim() }));
    if (k < attacks.length && (attacks[k].name.trim() || attacks[k].dice.n)) out.push(composeNimAttack(attacks[k]));
  }
  return out;
}
export function parseNimAbilities(list: { name: string; text: string }[]): { attacks: AttackRow[]; traits: NimTrait[] } {
  const attacks: AttackRow[] = [], traits: NimTrait[] = [];
  for (const a of list) {
    const row = parseNimAttack(a);
    if (row) attacks.push(row); else traits.push({ name: a.name, text: a.text, at: attacks.length });
  }
  return { attacks, traits };
}

/** Server-side clamp for posted attack rows. */
export function cleanNimAttackRows(v: unknown): AttackRow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 16).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    const d = (o.dice ?? {}) as Record<string, unknown>;
    const ex = (o.extra ?? {}) as Record<string, unknown>;
    const range = NIM_ATK_RANGES.includes(s(o.range)) ? s(o.range) : "Melee";
    return {
      name: s(o.name).trim().slice(0, 60), count: clamp(int(o.count, 1), 1, 10), hit: null,
      dice: { n: clamp(int(d.n), 0, 20), d: clamp(int(d.d, 6), 2, 100), m: clamp(int(d.m), -50, 200) },
      range, dtype: (NIM_DAMAGE_TYPES as readonly string[]).includes(s(o.dtype)) ? s(o.dtype) : "",
      special: s(o.special).trim().slice(0, 300),
      extra: {
        dist: range === "Melee" ? "" : String(clamp(int(ex.dist, 1), 1, 60)),
        target: s(ex.target).trim().slice(0, 60),
        join: ex.join === "OR" || ex.join === "Then" ? s(ex.join) : "",
        ...(ex.rpos === "after" ? { rpos: "after" } : {}),
        ...(ex.dw === "1" ? { dw: "1" } : {}),
        ...(ex.sj === "sp" ? { sj: "sp" } : {}),
        ...(ex.end === "none" ? { end: "none" } : {}),
      },
    };
  });
}
export function cleanNimTraits(v: unknown): NimTrait[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 30).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    return { name: s(o.name).trim().slice(0, 120), text: s(o.text).trim().slice(0, 1000), at: clamp(int(o.at), 0, 16) };
  }).filter((t) => t.name || t.text);
}

// ═══ SPELLS ══════════════════════════════════════════════════════════════════
export type NimSpellBuild = {
  req: string;                                   // leading "Shadowmancer only." etc.
  conc: string;                                  // "" | "Up to 1 minute" …
  dist: { kind: string; n: number };             // "" | Range | Reach | ReachUpTo | Cone | Line
  dmg: { on: boolean; dice: Dice; stat: string; dtype: string; note: string; ignoreArmor: boolean; noMiss: boolean };
  effect: string;
  scale: { kind: string; n: number; d: number; text: string }; // "" | dmg | dice | die | range | custom
};
export const NIM_SPELL_DIST: [string, string][] = [["", "— none —"], ["Range", "Range"], ["Reach", "Reach"], ["ReachUpTo", "Reach (up to)"], ["Cone", "Cone"], ["Line", "Line"]];
export const NIM_SPELL_STATS = ["", "KEY", "INT", "WIL", "LVL"];
export const NIM_DIE_STEPS = "Increment the die size 1 step every 5 levels (d6 » d8 » d10 » d12)";

export function blankSpellBuild(): NimSpellBuild {
  return {
    req: "", conc: "", dist: { kind: "Range", n: 8 },
    dmg: { on: true, dice: { n: 1, d: 10, m: 0 }, stat: "", dtype: "", note: "", ignoreArmor: false, noMiss: false },
    effect: "", scale: { kind: "dmg", n: 5, d: 10, text: "" },
  };
}
function composeDist(d: NimSpellBuild["dist"]): string {
  if (!d.kind) return "";
  const n = Math.max(1, d.n);
  return d.kind === "Range" ? `Range: ${n}.` : d.kind === "Reach" ? `Reach: ${n}.` : d.kind === "ReachUpTo" ? `Reach: Up to ${n}.` : d.kind === "Cone" ? `Reach: Cone ${n}.` : d.kind === "Line" ? `Line: ${n}.` : "";
}
export function composeNimSpellDamage(g: NimSpellBuild["dmg"]): string {
  if (!g.on) return "";
  const dice = formatDice({ ...g.dice, m: g.dice.m }) + (g.stat ? `+${g.stat}` : "");
  return `Damage: ${dice}${g.dtype ? " " + g.dtype : ""}${g.note.trim() ? " " + g.note.trim() : ""}${g.ignoreArmor ? " (ignoring armor)" : ""}${g.noMiss ? ", does not miss" : ""}.`;
}
export function composeNimScale(tier: number, sc: NimSpellBuild["scale"], distKind: string): string {
  const head = tier === 0 ? "High Levels: " : "Upcast: ";
  const n = Math.max(1, sc.n);
  const every = tier === 0 ? " every 5 levels" : "";
  switch (sc.kind) {
    case "dmg": return `${head}+${n} damage${every}.`;
    case "dice": return tier === 0 ? `${head}+${n}d${sc.d} every 5 levels.` : `${head}+${n}d${sc.d} damage.`;
    case "die": return tier === 0 ? `${head}${NIM_DIE_STEPS}.` : "";
    case "range": return `${head}+${n} ${distKind === "Range" ? "Range" : "Reach"}${every}.`;
    case "custom": return sc.text.trim() ? `${head}${sc.text.trim()}` : "";
    default: return "";
  }
}
export function composeNimSpellText(tier: number, b: NimSpellBuild): string {
  return [
    b.req.trim(),
    b.conc ? `Concentration: ${b.conc}.` : "",
    composeDist(b.dist),
    composeNimSpellDamage(b.dmg),
    b.effect.trim(),
    composeNimScale(tier, b.scale, b.dist.kind),
  ].filter(Boolean).join(" ");
}
/** Best-effort parse of book/legacy spell text; falls back to all-effect text when it doesn't re-compose exactly. */
export function parseNimSpellText(tier: number, text: string): NimSpellBuild {
  const raw = s(text).trim();
  const fallback = (): NimSpellBuild => ({ ...blankSpellBuild(), dist: { kind: "", n: 8 }, dmg: { ...blankSpellBuild().dmg, on: false }, effect: raw, scale: { kind: "", n: 1, d: 6, text: "" } });
  const b: NimSpellBuild = { ...fallback(), effect: "" };
  let head = raw;
  const sm = /(?:^| )(High Levels|Upcast): (.*)$/.exec(raw);
  if (sm && (sm[1] === "High Levels") === (tier === 0)) {
    head = raw.slice(0, sm.index).trim();
    const body = sm[2];
    let m: RegExpExecArray | null;
    if ((m = /^\+(\d+) damage(?: every 5 levels)?\.$/.exec(body))) b.scale = { kind: "dmg", n: int(m[1]), d: 6, text: "" };
    else if ((m = /^\+(\d+)d(\d+)(?: every 5 levels| damage)\.$/.exec(body))) b.scale = { kind: "dice", n: int(m[1]), d: int(m[2]), text: "" };
    else if (body === NIM_DIE_STEPS + ".") b.scale = { kind: "die", n: 1, d: 6, text: "" };
    else if ((m = /^\+(\d+) (Range|Reach)(?: every 5 levels)?\.$/.exec(body))) b.scale = { kind: "range", n: int(m[1]), d: 6, text: "" };
    else b.scale = { kind: "custom", n: 1, d: 6, text: body };
  }
  const tok = /(?:^|\. )(Concentration: |Range: |Reach: |Line: |Damage: )/.exec(head);
  let rest = head;
  if (tok) {
    const at = tok.index + (tok[0].startsWith(". ") ? 2 : 0);
    b.req = head.slice(0, at).trim();
    rest = head.slice(at);
    let m: RegExpExecArray | null;
    if ((m = /^Concentration: ([^.]+)\.\s*/.exec(rest))) { b.conc = m[1]; rest = rest.slice(m[0].length); }
    if ((m = /^(Range|Reach|Line): (Up to |Cone )?(\d+)\.\s*/.exec(rest))) {
      const kind = m[2] === "Up to " ? "ReachUpTo" : m[2] === "Cone " ? "Cone" : m[1];
      if (!(m[1] !== "Reach" && m[2])) { b.dist = { kind, n: int(m[3]) }; rest = rest.slice(m[0].length); }
    }
    if ((m = /^Damage: (\d+)d(\d+)(?:([+-])(\d+))?(?:\+(KEY|INT|WIL|LVL))?([^.]*)\.\s*/.exec(rest))) {
      let tail = m[6];
      const g = { on: true, dice: { n: int(m[1]), d: int(m[2]), m: m[3] ? (m[3] === "-" ? -1 : 1) * int(m[4]) : 0 }, stat: m[5] ?? "", dtype: "", note: "", ignoreArmor: false, noMiss: false };
      if (tail.endsWith(", does not miss")) { g.noMiss = true; tail = tail.slice(0, -15); }
      if (tail.endsWith(" (ignoring armor)")) { g.ignoreArmor = true; tail = tail.slice(0, -17); }
      const ty = new RegExp(`^ (${NIM_DAMAGE_TYPES.join("|")})(?= |$)`).exec(tail);
      if (ty) { g.dtype = ty[1]; tail = tail.slice(ty[0].length); }
      g.note = tail.trim();
      b.dmg = g; rest = rest.slice(m[0].length);
    }
    if (!b.conc && !b.dist.kind && !b.dmg.on) { b.req = ""; rest = head; }
  }
  b.effect = rest.trim();
  return composeNimSpellText(tier, b) === raw ? b : fallback();
}
export function cleanSpellBuild(raw: unknown): NimSpellBuild {
  const o = (raw ?? {}) as Record<string, unknown>;
  const d = (o.dist ?? {}) as Record<string, unknown>, g = (o.dmg ?? {}) as Record<string, unknown>, gd = (g.dice ?? {}) as Record<string, unknown>, sc = (o.scale ?? {}) as Record<string, unknown>;
  const kinds = NIM_SPELL_DIST.map(([v]) => v);
  return {
    req: s(o.req).trim().slice(0, 200),
    conc: s(o.conc).trim().slice(0, 40),
    dist: { kind: kinds.includes(s(d.kind)) ? s(d.kind) : "", n: clamp(int(d.n, 1), 1, 100) },
    dmg: {
      on: !!g.on, dice: { n: clamp(int(gd.n, 1), 0, 20), d: clamp(int(gd.d, 6), 2, 100), m: clamp(int(gd.m), -20, 100) },
      stat: NIM_SPELL_STATS.includes(s(g.stat)) ? s(g.stat) : "",
      dtype: (NIM_DAMAGE_TYPES as readonly string[]).includes(s(g.dtype)) ? s(g.dtype) : "",
      note: s(g.note).trim().slice(0, 120), ignoreArmor: !!g.ignoreArmor, noMiss: !!g.noMiss,
    },
    effect: s(o.effect).trim().slice(0, 2500),
    scale: { kind: ["", "dmg", "dice", "die", "range", "custom"].includes(s(sc.kind)) ? s(sc.kind) : "", n: clamp(int(sc.n, 1), 1, 50), d: clamp(int(sc.d, 6), 2, 20), text: s(sc.text).trim().slice(0, 300) },
  };
}

// ═══ ANCESTRIES ══════════════════════════════════════════════════════════════
// A grant is a badge {kind, target?, amount?}; the sheet applies the structured
// list (data.grants) and the composed phrase reads like the book.
export type NimGrant = { kind: string; target?: string; amount?: number };
export type NimAncTrait = { name: string; text: string; grants: NimGrant[] };
export const NIM_GRANT_KINDS = ["skill", "allSkills", "init", "initAdv", "armor", "speed", "wounds", "hitDice", "language"] as const;

function grantPhrases(gs: NimGrant[]): string[] {
  const out: string[] = [];
  const all = gs.find((g) => g.kind === "allSkills"), init = gs.find((g) => g.kind === "init");
  for (const g of gs) {
    const n = g.amount ?? 0;
    if (g.kind === "allSkills") out.push(init && init.amount === n ? `+${n} to all skills and Initiative` : `+${n} to all skills`);
    else if (g.kind === "init") { if (!(all && all.amount === n)) out.push(`${nimSigned(n)} Initiative`); }
    else if (g.kind === "initAdv") out.push("Advantage on Initiative");
    else if (g.kind === "skill") out.push(`${nimSigned(n)} ${g.target}`);
    else if (g.kind === "armor") out.push(`${nimSigned(n)} Armor`);
    else if (g.kind === "speed") out.push(`${nimSigned(n)} Speed`);
    else if (g.kind === "wounds") out.push(`${nimSigned(n)} max Wounds`);
    else if (g.kind === "hitDice") out.push(`${nimSigned(n)} max Hit Dice`);
  }
  return out;
}
export function composeAncTraitText(t: NimAncTrait): string {
  const ph = grantPhrases(t.grants);
  const langs = t.grants.filter((g) => g.kind === "language" && g.target).map((g) => `You know ${g.target} if your INT is not negative.`);
  return [ph.length ? ph.join(", ") + "." : "", t.text.trim(), ...langs].filter(Boolean).join(" ");
}
function phraseGrant(p: string): NimGrant[] | null {
  let m: RegExpExecArray | null;
  const sn = (sg: string, n: string) => (sg === "+" ? 1 : -1) * int(n);
  if ((m = /^\+(\d+) to all skills and Initiative$/.exec(p))) return [{ kind: "allSkills", amount: int(m[1]) }, { kind: "init", amount: int(m[1]) }];
  if ((m = /^\+(\d+) to all skills$/.exec(p))) return [{ kind: "allSkills", amount: int(m[1]) }];
  if ((m = new RegExp(`^([+–−-])(\\d+) (?:to )?(${NIM_SKILLS.join("|")})$`).exec(p))) return [{ kind: "skill", target: m[3], amount: sn(m[1] === "+" ? "+" : "-", m[2]) }];
  if ((m = /^([+–−-])(\d+) Initiative$/.exec(p))) return [{ kind: "init", amount: sn(m[1] === "+" ? "+" : "-", m[2]) }];
  if (p === "Advantage on Initiative") return [{ kind: "initAdv" }];
  if ((m = /^([+–−-])(\d+) Armor$/.exec(p))) return [{ kind: "armor", amount: sn(m[1] === "+" ? "+" : "-", m[2]) }];
  if ((m = /^([+–−-])(\d+) [Ss]peed$/.exec(p))) return [{ kind: "speed", amount: sn(m[1] === "+" ? "+" : "-", m[2]) }];
  if ((m = /^([+–−-])(\d+) max Wounds$/.exec(p))) return [{ kind: "wounds", amount: sn(m[1] === "+" ? "+" : "-", m[2]) }];
  if ((m = /^([+–−-])(\d+) max Hit Dice?$/.exec(p))) return [{ kind: "hitDice", amount: sn(m[1] === "+" ? "+" : "-", m[2]) }];
  return null;
}
/** Pull pure-grant sentences and "You know X…" sentences out of a trait's text. */
export function parseAncTrait(t: { name: string; text: string }): NimAncTrait {
  const sentences = s(t.text).trim().match(/[^.]+(?:\.|$)/g) ?? [];
  const grants: NimGrant[] = [], langs: NimGrant[] = [], keep: string[] = [];
  for (const raw of sentences) {
    const sen = raw.trim();
    if (!sen) continue;
    const lang = /^You know (\S+) if your INT is not negative\.$/.exec(sen);
    if (lang && (NIM_LANGUAGES as readonly string[]).includes(lang[1])) { langs.push({ kind: "language", target: lang[1] }); continue; }
    const parts = sen.replace(/\.$/, "").split(/,\s*/);
    const got = parts.map(phraseGrant);
    if (sen.endsWith(".") && got.every(Boolean)) { got.forEach((g) => grants.push(...(g as NimGrant[]))); continue; }
    keep.push(sen);
  }
  return { name: s(t.name).trim(), text: keep.join(" "), grants: [...grants, ...langs] };
}
export function cleanGrants(v: unknown): NimGrant[] {
  if (!Array.isArray(v)) return [];
  const out: NimGrant[] = [];
  for (const raw of v.slice(0, 16)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const k = s(o.kind), n = clamp(int(o.amount), -6, 6), t = s(o.target).trim();
    if (!(NIM_GRANT_KINDS as readonly string[]).includes(k)) continue;
    if (k === "initAdv") out.push({ kind: k });
    else if (k === "language") { if (t) out.push({ kind: k, target: t.slice(0, 40) }); }
    else if (k === "skill") { const sk = NIM_SKILLS.find((x) => x.toLowerCase() === t.toLowerCase()); if (sk && n) out.push({ kind: k, target: sk, amount: n }); }
    else if (n) out.push({ kind: k, amount: n });
  }
  return out;
}
