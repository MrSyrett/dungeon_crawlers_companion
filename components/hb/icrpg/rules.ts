// ── ICRPG (Index Card RPG) homebrew rules — pure, no React ───────────────────
// Shared by the components/hb/icrpg/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored strings always agree.
//
// ICRPG vocabulary used here (Master Edition): STATS STR/DEX/CON/INT/WIS/CHA
// (max +10), EFFORT types Basic d4 / Weapons & Tools d6 / Guns d8 / Magic &
// Energy d10 / Ultimate d12, DEFENSE, HEARTS (10 HP each), CLOSE/NEAR/FAR.
//
// Bonus badges are LootBonus "icrpg" kinds (public/tools-data/icrpg-loot-bonus.js):
//   stat {target str…cha, amount} · allstats {amount} · def {amount}
//   effort {target Basic|Weapons & Tools|Guns|Magic & Energy|Ultimate|All, amount}
//   heart {amount} · spell {target name} · note {target text}
// The book loot/gear data writes bonuses as `effects` strings ("+1 DEF",
// "+2 WEAPON EFFORT"); benefitEffect / parseEffect convert both ways.
import { cleanDice, type Dice } from "../dice";
import type { AttackRow } from "../AttackRows";

export const ICRPG_WORLDS: [string, string][] = [
  ["core", "Core"], ["alfheim", "Alfheim"], ["warpshell", "Warp Shell"], ["ghostmountain", "Ghost Mountain"], ["vigilantecity", "Vigilante City"], ["bloodandsnow", "Blood & Snow"],
];
export const ICRPG_STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;
export const CAST_STATS = ["INT", "WIS", "CHA"] as const;
export const RANGES = ["CLOSE", "NEAR", "FAR"] as const;

export type Effort = { key: string; die: number; label: string; word: string; lb: string };
export const EFFORTS: Effort[] = [
  { key: "basic", die: 4, label: "Basic", word: "BASIC", lb: "Basic" },
  { key: "weapon", die: 6, label: "Weapons & Tools", word: "WEAPON", lb: "Weapons & Tools" },
  { key: "gun", die: 8, label: "Guns", word: "GUNS", lb: "Guns" },
  { key: "magic", die: 10, label: "Magic & Energy", word: "MAGIC", lb: "Magic & Energy" },
  { key: "ultimate", die: 12, label: "Ultimate", word: "ULTIMATE", lb: "Ultimate" },
];
export const EFFORT_DICE = EFFORTS.map((e) => e.die);
export const effortOfDie = (d: number) => EFFORTS.find((e) => e.die === d) ?? null;
/** "d6" → Effort (or null). */
export const effortOfCode = (c: unknown) => effortOfDie(parseInt(String(c ?? "").replace(/^d/i, ""), 10));

const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const int = (v: unknown, d = 0) => { const n = parseInt(String(v ?? "").replace(/^[−–]/, "-"), 10); return Number.isFinite(n) ? n : d; };
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const sgn = (n: number) => (n >= 0 ? "+" : "-") + Math.abs(n);

// ═══ BONUS BADGES (LootBonus "icrpg") ════════════════════════════════════════
export type IcBenefit = { kind: string; target?: string; amount?: number };
const EFFORT_CHOICES = [...EFFORTS.map((e) => e.lb), "All"];
const AMT: Record<string, [number, number]> = { stat: [-10, 10], allstats: [-10, 10], def: [-10, 10], effort: [-20, 20], heart: [-10, 10] };
/** Kinds an ABILITY may carry (always on; HEARTS / spells need equip bookkeeping). */
export const ABILITY_KINDS = ["stat", "allstats", "def", "effort", "note"];
const STAT_IDS: Record<string, string> = {
  str: "str", dex: "dex", con: "con", int: "int", wis: "wis", cha: "cha",
  strength: "str", dexterity: "dex", constitution: "con", intelligence: "int", wisdom: "wis", charisma: "cha",
};

/** Server-side sanitiser (mirrors icrpg-loot-bonus.js): kinds whitelist, clamps, trims. */
export function cleanIcrpgBenefits(v: unknown, only?: string[]): IcBenefit[] {
  if (!Array.isArray(v)) return [];
  const out: IcBenefit[] = [];
  for (const raw of v.slice(0, 24)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = s(o.kind).toLowerCase(), t = s(o.target), n = Math.trunc(Number(o.amount) || 0);
    if (only && !only.includes(kind)) continue;
    if (kind === "stat") {
      const st = STAT_IDS[t.toLowerCase()];
      if (st && n) out.push({ kind, target: st, amount: clamp(n, ...AMT.stat) });
    } else if (kind === "effort") {
      const c = EFFORT_CHOICES.find((x) => x.toLowerCase() === t.toLowerCase());
      if (c && n) out.push({ kind, target: c, amount: clamp(n, ...AMT.effort) });
    } else if (kind in AMT) { if (n) out.push({ kind, amount: clamp(n, ...AMT[kind]) }); }
    else if (kind === "spell") { if (t) out.push({ kind, target: t.slice(0, 60) }); }
    else if (kind === "note") { if (t) out.push({ kind, target: t.slice(0, 160) }); }
  }
  return out;
}

const EFFORT_WORD: Record<string, string> = Object.fromEntries(EFFORTS.map((e) => [e.lb, e.word]));
/** One badge as the book's `effects` string ("+1 DEF", "+2 WEAPON EFFORT"); notes → null. */
export function benefitEffect(b: IcBenefit): string | null {
  const n = int(b.amount);
  switch (b.kind) {
    case "stat": return `${sgn(n)} ${s(b.target).toUpperCase()}`;
    case "allstats": return `${sgn(n)} all STATS`;
    case "def": return `${sgn(n)} DEF`;
    case "heart": return `${sgn(n)} HEART${Math.abs(n) === 1 ? "" : "S"}`;
    case "effort": return `${sgn(n)} ${b.target && b.target !== "All" ? EFFORT_WORD[b.target] + " " : ""}EFFORT`;
    case "spell": return `Spell: ${s(b.target)}`;
    default: return null;
  }
}
const EFF_FROM_WORD: Record<string, string> = { BASIC: "Basic", WEAPON: "Weapons & Tools", WEAPONS: "Weapons & Tools", GUN: "Guns", GUNS: "Guns", MAGIC: "Magic & Energy", ULTIMATE: "Ultimate" };
/** Parse one `effects` string into badges — null unless EVERY part is a bonus. */
export function parseEffect(text: string): IcBenefit[] | null {
  const parts = s(text).split(/\s*[,;]\s*/).filter(Boolean);
  if (!parts.length) return null;
  const out: IcBenefit[] = [];
  for (const p of parts) {
    let m: RegExpMatchArray | null;
    if ((m = p.match(/^([+-]\d+)\s+(STR|DEX|CON|INT|WIS|CHA)$/i))) out.push({ kind: "stat", target: m[2].toLowerCase(), amount: int(m[1]) });
    else if ((m = p.match(/^([+-]\d+)\s+all\s+STATS$/i))) out.push({ kind: "allstats", amount: int(m[1]) });
    else if ((m = p.match(/^([+-]\d+)\s+DEF(?:ENSE)?$/i))) out.push({ kind: "def", amount: int(m[1]) });
    else if ((m = p.match(/^([+-]\d+)\s+HEARTS?$/i))) out.push({ kind: "heart", amount: int(m[1]) });
    else if ((m = p.match(/^([+-]\d+)\s+(?:(BASIC|WEAPONS?|GUNS?|MAGIC|ULTIMATE)\s+)?EFFORT$/i))) out.push({ kind: "effort", target: m[2] ? EFF_FROM_WORD[m[2].toUpperCase()] : "All", amount: int(m[1]) });
    else if ((m = p.match(/^Spell:\s*(.+)$/i))) out.push({ kind: "spell", target: m[1].trim() });
    else return null;
  }
  return out.filter((b) => b.kind === "spell" || b.amount);
}

// ═══ LOOT / GEAR ═════════════════════════════════════════════════════════════
// The desc lead ("Food, …", "INT Spell, …") is what the sheet's Action tab reads
// to tell consumables, spell scrolls, weapons and armor apart.
export const LOOT_KINDS = ["Item", "Weapon", "Armor", "Food", "Potion", "Scroll", "Explosive", "Spell", "Trap", "Tool", "Book", "Wand", "Ammo", "Vehicle"] as const;
export const LOOT_TABLES = ["Homebrew", "Ancient", "Bizarre", "Cursed", "Epic", "GhostMountain", "Magic", "SciFi", "Shabby"] as const;
export const GEAR_CATS: [string, string][] = [["gear", "Gear"], ["tool", "Tool"], ["weapon", "Weapon"], ["firearm", "Firearm"], ["armor", "Armor"]];

export type ItemBuild = {
  kind: string;        // loot desc lead ("" = none); gear: unused
  stat: string;        // "Spell" lead: INT / WIS / CHA
  text: string;        // the rest of the description
  heal: Dice;          // n = 0 → none; d = 0 → flat N HP
  uses: number;        // 0 = not counted
  extras: string[];    // other effects (free text, kept verbatim)
};
export const blankBuild = (): ItemBuild => ({ kind: "", stat: "INT", text: "", heal: { n: 0, d: 6, m: 0 }, uses: 0, extras: [] });

export const healEffect = (h: Dice) => (h.n > 0 ? `Heal ${h.d === 0 ? h.n : `${h.n}D${h.d}`} HP` : "");
const parseHeal = (t: string): Dice | null => {
  const m = s(t).match(/^Heal\s+(?:(\d+)D(\d+)|(\d+))\s+HP$/i);
  return m ? (m[3] ? { n: int(m[3]), d: 0, m: 0 } : { n: int(m[1]), d: int(m[2]), m: 0 }) : null;
};

/** Compose the stored `desc` from the builder fields (lead, text, uses). */
export function composeItemDesc(b: ItemBuild, loot: boolean): string {
  const lead = loot && b.kind ? (b.kind === "Spell" ? `${b.stat} Spell` : b.kind) : "";
  const uses = b.uses > 0 ? `${b.uses} use${b.uses === 1 ? "" : "s"}` : "";
  if (loot) return [lead, s(b.text), uses].filter(Boolean).join(", ");
  return [s(b.text), uses ? `(${uses})` : ""].filter(Boolean).join(" ");
}
/** The stored `effects` list: bonus badges first, then heal, then the extras. */
export function composeItemEffects(benefits: IcBenefit[], b: ItemBuild): string[] {
  return [...benefits.map(benefitEffect).filter((x): x is string => !!x), healEffect(b.heal), ...b.extras.map(s)].filter(Boolean);
}

/** Open any loot/gear record: structured `build` when present, else parse desc/effects. */
export function itemFromData(d: Record<string, unknown>, loot: boolean): { build: ItemBuild; benefits: IcBenefit[] } {
  const raw = (d.build ?? null) as Record<string, unknown> | null;
  const effects = Array.isArray(d.effects) ? (d.effects as unknown[]).map(s).filter(Boolean) : [];
  const hasBen = Array.isArray(d.benefits);
  let benefits = hasBen ? cleanIcrpgBenefits(d.benefits) : [];
  if (raw) return { build: cleanBuild(raw), benefits };
  // Legacy: bonuses / heal out of `effects`, the lead + uses out of `desc`.
  const b = blankBuild();
  const composed = new Set(benefits.map(benefitEffect).filter(Boolean) as string[]);
  for (const e of effects) {
    if (composed.has(e)) continue;
    const p = hasBen ? null : parseEffect(e);
    const h = parseHeal(e);
    if (p) benefits = [...benefits, ...p];
    else if (h && b.heal.n === 0) b.heal = h;
    else b.extras.push(e);
  }
  let text = s(d.desc);
  if (loot) {
    const m = text.match(/^((?:INT|WIS|CHA)\s+)?([A-Za-z]+),\s*/);
    const k = m ? LOOT_KINDS.find((x) => x.toLowerCase() === m[2].toLowerCase()) : undefined;
    if (m && k && (!m[1] || k === "Spell")) { b.kind = k; if (m[1]) b.stat = m[1].trim().toUpperCase(); text = text.slice(m[0].length); }
    const u = text.match(/,\s*(\d+) uses?$/);
    if (u) { b.uses = int(u[1]); text = text.slice(0, u.index); }
  } else {
    const u = text.match(/\s*\((\d+) uses?\)$/);
    if (u) { b.uses = int(u[1]); text = text.slice(0, u.index); }
  }
  b.text = text;
  // Only keep the parse if it re-composes the same desc (else the raw desc stays as text).
  if (composeItemDesc(b, loot) !== s(d.desc)) { b.kind = ""; b.uses = 0; b.text = s(d.desc); }
  return { build: b, benefits: cleanIcrpgBenefits(benefits) };
}
export function cleanBuild(raw: unknown): ItemBuild {
  const o = (raw ?? {}) as Record<string, unknown>;
  const h = cleanDice(o.heal, { maxCount: 10, dice: [4, 6, 8, 10, 12, 20], allowFlat: true, minMod: 0, maxMod: 0 });
  return {
    kind: LOOT_KINDS.find((k) => k === s(o.kind)) ?? "",
    stat: (CAST_STATS as readonly string[]).includes(s(o.stat)) ? s(o.stat) : "INT",
    text: s(o.text).slice(0, 2800),
    heal: { ...h, m: 0 },
    uses: clamp(int(o.uses), 0, 99),
    extras: (Array.isArray(o.extras) ? o.extras : []).map(s).filter(Boolean).slice(0, 12).map((x) => x.slice(0, 200)),
  };
}

// ═══ SPELLS ══════════════════════════════════════════════════════════════════
export const SPELL_SCHOOLS = ["Arcane", "Holy", "Infernal", "Alfheim"] as const;
export const SPELL_TARGETS = ["One target", "One ally", "All enemies", "All allies", "Everyone"] as const;
export const SPELL_RANGES = ["Self", "Touch", "CLOSE", "NEAR", "FAR", "Sight"] as const;
export const composeSpellTarget = (who: string, range: string) =>
  [who, (RANGES as readonly string[]).includes(range) ? `${range} range` : range].filter(Boolean).join(", ");
/** "One target, NEAR range" → {who, range}; null when it isn't builder-shaped. */
export function parseSpellTarget(t: string): { who: string; range: string } | null {
  const v = s(t);
  if (!v) return { who: "", range: "" };
  const m = v.match(/^(?:([^,]+?)(?:,\s*|$))?(Self|Touch|CLOSE range|NEAR range|FAR range|Sight)?$/);
  if (!m) return null;
  const who = m[1] ?? "", range = (m[2] ?? "").replace(/ range$/, "");
  if (who && !(SPELL_TARGETS as readonly string[]).includes(who)) {
    const r = (SPELL_RANGES as readonly string[]).find((x) => composeSpellTarget("", x) === who);
    return r && !range ? { who: "", range: r } : null;
  }
  return composeSpellTarget(who, range) === v ? { who, range } : null;
}

// ═══ MONSTERS ════════════════════════════════════════════════════════════════
export const MONSTER_TIERS = ["Tier I", "Tier II", "Tier III", "Tier IV", "Villain", "Megafauna", "Special"] as const;
export const AREAS: [string, string][] = [["", "one target"], ["all CLOSE", "all CLOSE"], ["all NEAR", "all NEAR"], ["all FAR", "all FAR"]];

// AttackRow with ICRPG meaning:
//   dice      EFFORT: die = type (d4 Basic … d12 Ultimate), n = how many (4D12), +m flat; n = 0 → no damage
//   range     CLOSE / NEAR / FAR ("CLOSE" is not written)
//   extra.area  "" | "all CLOSE" | "all NEAR" | "all FAR" (→ "all NEAR enemies")
//   extra.stat  "" (auto) | STR … CHA — the attack roll
//   extra.txt   the attack as printed (legacy text that didn't re-compose) — wins
//   special   free text rider, last
// Composed: "Claw, WEAPON Effort, NEAR range, DEX attack, grabs on 6+" — the
// GM Screen, the bestiary page and the prep builder read these strings.
export const newIcrpgAttack = (p: Partial<AttackRow> = {}): AttackRow => ({
  name: "", count: 1, hit: null, dice: { n: 1, d: 6, m: 0 }, range: "CLOSE", special: "", extra: { area: "", stat: "", txt: "" }, ...p,
});
export function effortText(d: Dice): string {
  if (d.n <= 0) return "";
  const e = effortOfDie(d.d);
  const base = e ? `${d.n > 1 ? `${d.n}D${d.d} ` : ""}${e.word} Effort` : `${d.n}D${d.d}`;
  return base + (d.m ? ` ${sgn(d.m)}` : "");
}
export function composeIcrpgAttack(r: AttackRow): string {
  const x = r.extra ?? {}, name = s(r.name);
  if (s(x.txt)) return name ? `${name}, ${s(x.txt)}` : s(x.txt);
  const area = s(x.area);
  return [
    name, effortText(r.dice),
    area ? `${area} enemies` : r.range && r.range !== "CLOSE" ? `${r.range} range` : "",
    s(x.stat) ? `${s(x.stat)} attack` : "",
    s(r.special),
  ].filter(Boolean).join(", ");
}
export const composeIcrpgAttacks = (rows: AttackRow[]) => rows.map(composeIcrpgAttack).filter(Boolean);

/** Legacy attack string → row. Exact builder shape → structured; else kept as printed. */
export function parseIcrpgAttack(text: string): AttackRow {
  const t = s(text);
  const parts = t.split(/,\s*/);
  const name = parts.length > 1 && parts[0].length <= 40 ? parts[0] : "";
  const rest = name ? t.slice(t.indexOf(",") + 1).trim() : t;
  // Strict pass: [effort], [range|area], [STAT attack], [special…]
  const row = newIcrpgAttack({ name, dice: { n: 0, d: 6, m: 0 } });
  const toks = name ? parts.slice(1) : parts;
  let i = 0;
  const em = toks[i]?.match(/^(?:(\d+)D(\d+) )?(BASIC|WEAPON|GUNS|MAGIC|ULTIMATE) Effort(?: ([+-]\d+))?$/);
  if (em) {
    const e = EFFORTS.find((x) => x.word === em[3])!;
    if (!em[2] || int(em[2]) === e.die) { row.dice = { n: em[1] ? int(em[1]) : 1, d: e.die, m: em[4] ? int(em[4]) : 0 }; i++; }
  }
  const am = toks[i]?.match(/^(all (?:CLOSE|NEAR|FAR)) enemies$/), rm = toks[i]?.match(/^(NEAR|FAR) range$/);
  if (am) { row.extra = { ...row.extra, area: am[1] }; i++; } else if (rm) { row.range = rm[1]; i++; }
  const sm = toks[i]?.match(/^(STR|DEX|CON|INT|WIS|CHA) attack$/);
  if (sm) { row.extra = { ...row.extra, stat: sm[1] }; i++; }
  row.special = toks.slice(i).join(", ");
  // The effort die a printed attack implies, guessed from its words (as the GM Screen does).
  const g =/\bultimate\b/i.test(rest) ? 12 : /\b(magic|energy)\b/i.test(rest) ? 10 : /\bguns?\b/i.test(rest) ? 8 : /\bweapon\b/i.test(rest) ? 6 : /\bbasic\b/i.test(rest) ? 4 : 0;
  if (composeIcrpgAttack(row) === t && (row.dice.n > 0 || !g)) return row;
  return newIcrpgAttack({ name, dice: { n: g ? 1 : 0, d: g || 6, m: 0 }, extra: { area: "", stat: "", txt: rest } });
}
export function cleanIcrpgAttackRows(v: unknown): AttackRow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 12).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>, x = (o.extra ?? {}) as Record<string, unknown>;
    const dice = cleanDice(o.dice, { maxCount: 10, dice: EFFORT_DICE, minMod: -10, maxMod: 30 });
    const range = (RANGES as readonly string[]).includes(s(o.range)) ? s(o.range) : "CLOSE";
    const area = AREAS.some(([k]) => k === s(x.area)) ? s(x.area) : "";
    const stat = (ICRPG_STATS as readonly string[]).includes(s(x.stat)) ? s(x.stat) : "";
    return newIcrpgAttack({ name: s(o.name).slice(0, 60), dice, range, special: s(o.special).slice(0, 160), extra: { area, stat, txt: s(x.txt).slice(0, 240) } });
  });
}

// Monster EFFORT bonuses / actions per turn → the first ability line, in the
// book's wording ("+4 EFFORT", "+8 WEAPON EFFORT, 2 actions per turn") which
// the GM Screen's icrpgBonuses reads.
export type EffortBonus = Record<string, number>; // all | basic | weapon | gun | magic | ultimate
export const EFFORT_BONUS_KEYS: [string, string][] = [["all", "All EFFORT"], ...EFFORTS.map((e) => [e.key, e.word] as [string, string])];
export function composeMonsterLine(eb: EffortBonus, actions: number): string {
  const parts = EFFORT_BONUS_KEYS.filter(([k]) => int(eb[k])).map(([k]) => `${sgn(int(eb[k]))} ${k === "all" ? "" : EFFORTS.find((e) => e.key === k)!.word + " "}EFFORT`);
  if (actions > 1) parts.push(`${actions} actions per turn`);
  return parts.join(", ");
}
/** The first ability line back into bonuses — null unless it re-composes exactly. */
export function parseMonsterLine(line: string): { eb: EffortBonus; actions: number } | null {
  const eb: EffortBonus = {};
  let actions = 1;
  for (const p of s(line).split(/,\s*/)) {
    let m: RegExpMatchArray | null;
    if ((m = p.match(/^([+-]\d+) (?:(BASIC|WEAPON|GUNS|MAGIC|ULTIMATE) )?EFFORT$/))) eb[m[2] ? EFFORTS.find((e) => e.word === m![2])!.key : "all"] = int(m[1]);
    else if ((m = p.match(/^(\d+) actions per turn$/))) actions = int(m[1]);
    else return null;
  }
  return composeMonsterLine(eb, actions) === s(line) && s(line) ? { eb, actions } : null;
}
export function cleanEffortBonus(v: unknown): EffortBonus {
  const o = (v ?? {}) as Record<string, unknown>, out: EffortBonus = {};
  for (const [k] of EFFORT_BONUS_KEYS) { const n = clamp(int(o[k]), -10, 20); if (n) out[k] = n; }
  return out;
}

// ═══ HERO TYPES ══════════════════════════════════════════════════════════════
export type StartLoot = { name: string; desc: string; benefits: IcBenefit[] };
export const composeStartLoot = (r: StartLoot) => (s(r.desc) ? `${s(r.name)}: ${s(r.desc)}` : s(r.name));
export function parseStartLoot(t: string): StartLoot {
  const v = s(t), i = v.indexOf(": ");
  return i > 0 && i <= 60 ? { name: v.slice(0, i), desc: v.slice(i + 2), benefits: [] } : { name: v, desc: "", benefits: [] };
}
