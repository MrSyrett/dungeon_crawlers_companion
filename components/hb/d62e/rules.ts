// ── D6 System: Second Edition (Gallant Knight Games 2024) homebrew rules ──────
// Pure — no React, no lib/data import. Shared by the components/hb/d62e/*
// builders (client) and lib/homebrew.ts normalizeD62e* (server), so the live
// preview and the stored book shape (lib/data/d62e-types.ts) agree.
//
// Die codes: "3D+2" = 3 dice + 2 pips, stored as pips (1D = 3, so 3D+2 = 11).
//
// Each type keeps a structured `build` beside the legacy book fields; the server
// re-composes the legacy fields from `build` (compose*), and an old record opens
// through *BuildFrom(), which parses the book text best-effort and LOSSLESSLY:
// text only becomes pickers when re-composing it reproduces the original exactly,
// otherwise it stays as editable text, so nothing an old record carried is lost.

export const D62E_GENRES = ["core", "fantasy", "scifi", "superhero"] as const;
export type D62eGenre = (typeof D62E_GENRES)[number];
export const D62E_GENRE_OPTS: [string, string][] = [["core", "Core"], ["fantasy", "Fantasy"], ["scifi", "Sci-Fi"], ["superhero", "Superhero"]];
export const D62E_CORE_ATTRS = ["Agility", "Brawn", "Knowledge", "Perception"] as const;
/** The four core attributes plus the optional/genre attributes (pg 62+). */
export const D62E_ALL_ATTRS = ["Agility", "Brawn", "Knowledge", "Perception", "Charm", "Mechanical", "Technical", "Mysticism", "Magic"] as const;
export const D62E_ERAS = ["Medieval", "Modern", "Science Fiction", "Magical"] as const;
export const D62E_CREATURE_KINDS = ["NPC", "Animal", "Monster", "Humanoid", "Fae", "Undead", "Robot"] as const;
export const D62E_MOVE_MODES = ["Flight", "Swimming", "Climbing", "Burrowing", "Gliding"] as const;
/** Difficulty numbers (pg 30). */
export const D62E_DIFFICULTIES: [number, string][] = [[5, "Very Easy"], [10, "Easy"], [15, "Average"], [20, "Difficult"], [25, "Very Difficult"], [30, "Extremely Difficult"], [35, "Near Impossible"], [40, "Mythical"]];
export const D62E_PSI_SKILLS = ["Kinesis", "Perceive", "Reform"] as const;
export type D62ePsiSkill = (typeof D62E_PSI_SKILLS)[number];
/** Superpower enhancements (pg 212; Super-science from Gadgets & Gear). Cost is paid at each rank. */
export const D62E_ENHANCEMENTS: [string, number][] = [["Additional Effect", 1], ["Bestow", 1], ["Extended Range", 1], ["Multiple Targets", 1], ["Super-science", 2]];
/** Superpower Power Levels (pg 212) — the creation pool in Superpower Dice. */
export const D62E_POWER_LEVELS: [string, number][] = [["Young Heroes", 8], ["Street Level", 10], ["Standard Hero", 12], ["National Heroic Team", 16], ["Worldwide Heroic Team", 20], ["Galactic & Cosmic Heroes", 24]];

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const int = (v: unknown, d = 0): number => { const n = parseInt(s(v), 10); return Number.isFinite(n) ? n : d; };
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const nint = (v: unknown, lo: number, hi: number): number | null => (v == null || v === "" ? null : clamp(int(v), lo, hi));
const oneOf = <T extends string>(v: unknown, list: readonly T[], d: T): T => (list.includes(s(v) as T) ? (s(v) as T) : d);
const list = (x: unknown) => (Array.isArray(x) ? (x as unknown[]) : []);
const strs = (x: unknown, n: number, len: number) => list(x).map(s).filter(Boolean).slice(0, n).map((t) => t.slice(0, len));

// ═══ DIE CODES ═══════════════════════════════════════════════════════════════
/** pips → "4D+2" ("+1" for a pips-only code, "0D" for 0, "" for null). */
export function d6Code(p: number | null | undefined): string {
  if (p == null || !Number.isFinite(p)) return "";
  const a = Math.max(0, Math.round(p)), d = Math.floor(a / 3), r = a % 3;
  return d ? `${d}D${r ? "+" + r : ""}` : r ? `+${r}` : "0D";
}
/** The code as written after a "+" ("1D", "1D+1", "2"). */
export const d6Add = (p: number) => { const d = Math.floor(p / 3), r = p % 3; return d ? `${d}D${r ? "+" + r : ""}` : String(r); };
/** "3D+2" / "4D" / "+1" → pips; null when not a code. */
export function d6Parse(v: unknown): number | null {
  const t = s(v).replace(/\s+/g, "").toUpperCase();
  let m = /^\+?(\d+)D(?:\+(\d))?$/.exec(t);
  if (m) return parseInt(m[1], 10) * 3 + (m[2] ? parseInt(m[2], 10) : 0);
  m = /^\+(\d)$/.exec(t);
  return m ? parseInt(m[1], 10) : null;
}
/** "Brawn+1D+1" / "1D+1" / "2" after a "+" → pips. */
const addPips = (t: string): number | null => (/D/i.test(t) ? d6Parse(t) : /^\d$/.test(t) ? int(t) : null);

// ═══ SKILLS ══════════════════════════════════════════════════════════════════
export const D62E_SKILL_TIMES = ["an action", "one action", "one round", "reaction", "usually a response, not an action"] as const;

// ═══ GEAR: damage / range / protection ═══════════════════════════════════════
export type D62eDamage = { attr: string; pips: number; text: string };
/** "Brawn+2D", "Brawn+1", "Brawn", "5D" (attr "" = a flat code). */
export function composeDamage(d: D62eDamage): string {
  if (d.text) return d.text;
  if (d.attr) return d.attr + (d.pips ? "+" + d6Add(d.pips) : "");
  return d.pips ? d6Code(d.pips) : "";
}
export function parseDamage(v: unknown): D62eDamage {
  const t = s(v);
  if (!t) return { attr: "", pips: 0, text: "" };
  const m = /^([A-Z][a-z]+)(?:\+(\d+D(?:\+\d)?|\d))?$/.exec(t);
  let d: D62eDamage | null = null;
  if (m && (D62E_ALL_ATTRS as readonly string[]).includes(m[1])) d = { attr: m[1], pips: m[2] ? addPips(m[2]) ?? 0 : 0, text: "" };
  else { const p = d6Parse(t); if (p != null) d = { attr: "", pips: p, text: "" }; }
  return d && composeDamage(d) === t ? d : { attr: "", pips: 0, text: t };
}
export function cleanDamage(v: unknown): D62eDamage {
  const o = (v ?? {}) as Record<string, unknown>;
  const attr = s(o.attr);
  return { attr: (D62E_ALL_ATTRS as readonly string[]).includes(attr) ? attr : "", pips: clamp(int(o.pips), 0, 90), text: s(o.text).slice(0, 60) };
}

export type D62eBand = { op: "x" | "+"; n: number };
export type D62eRange = {
  mode: "none" | "melee" | "bands" | "brawn" | "thrown" | "stationary" | "text";
  reach: number; twoHanded: boolean; canThrow: boolean;
  s: number; m: number; l: number;
  bs: D62eBand; bm: D62eBand; bl: D62eBand;
  text: string;
};
export const blankRange = (mode: D62eRange["mode"] = "none"): D62eRange => ({
  mode, reach: 0, twoHanded: false, canThrow: false, s: 10, m: 40, l: 80,
  bs: { op: "+", n: 0 }, bm: { op: "+", n: 2 }, bl: { op: "+", n: 4 }, text: "",
});
const band = (b: D62eBand) => (b.op === "x" ? `Brawn x${b.n}` : b.n ? `Brawn+${b.n}` : "Brawn");
export function composeRange(r: D62eRange): string {
  switch (r.mode) {
    case "melee": {
      const par = [r.reach ? `reach ${r.reach}` : "", r.canThrow ? "can be thrown" : ""].filter(Boolean).join(", ");
      return `melee${par ? ` (${par})` : ""}${r.twoHanded ? ", two-handed" : ""}`;
    }
    case "bands": return `S${r.s}/M${r.m}/L${r.l} m`;
    case "brawn": return `S ${band(r.bs)} / M ${band(r.bm)} / L ${band(r.bl)}`;
    case "thrown": return "thrown";
    case "stationary": return "Stationary";
    case "text": return r.text;
    default: return "";
  }
}
const parseBand = (t: string): D62eBand | null => {
  const m = /^Brawn(?: x(\d+)|\+(\d+))?$/.exec(t);
  return m ? (m[1] ? { op: "x", n: int(m[1]) } : { op: "+", n: m[2] ? int(m[2]) : 0 }) : null;
};
export function parseRange(v: unknown): D62eRange {
  const t = s(v);
  const r = blankRange();
  if (!t) return r;
  let m = /^melee(?: \(([^)]*)\))?(, two-handed)?$/.exec(t);
  if (m) {
    const parts = (m[1] ?? "").split(", ").filter(Boolean);
    const rr: D62eRange = { ...r, mode: "melee", twoHanded: !!m[2] };
    parts.forEach((p) => { const q = /^reach (\d+)$/.exec(p); if (q) rr.reach = int(q[1]); else if (p === "can be thrown") rr.canThrow = true; });
    if (composeRange(rr) === t) return rr;
  }
  m = /^S(\d+)\/M(\d+)\/L(\d+) m$/.exec(t);
  if (m) { const rr: D62eRange = { ...r, mode: "bands", s: int(m[1]), m: int(m[2]), l: int(m[3]) }; if (composeRange(rr) === t) return rr; }
  m = /^S (.+) \/ M (.+) \/ L (.+)$/.exec(t);
  if (m) {
    const [a, b, c] = [parseBand(m[1]), parseBand(m[2]), parseBand(m[3])];
    if (a && b && c) { const rr: D62eRange = { ...r, mode: "brawn", bs: a, bm: b, bl: c }; if (composeRange(rr) === t) return rr; }
  }
  if (t === "thrown") return { ...r, mode: "thrown" };
  if (t === "Stationary") return { ...r, mode: "stationary" };
  return { ...r, mode: "text", text: t };
}
const cleanBand = (v: unknown, d: D62eBand): D62eBand => { const o = (v ?? {}) as Record<string, unknown>; return { op: o.op === "x" ? "x" : o.op === "+" ? "+" : d.op, n: clamp(int(o.n, d.n), 0, 50) }; };
export function cleanRange(v: unknown): D62eRange {
  const o = (v ?? {}) as Record<string, unknown>;
  const b = blankRange();
  const sh = clamp(int(o.s, b.s), 0, 100000), md = clamp(int(o.m, b.m), sh, 200000), lg = clamp(int(o.l, b.l), md, 500000);
  return {
    mode: oneOf(o.mode, ["none", "melee", "bands", "brawn", "thrown", "stationary", "text"] as const, "none"),
    reach: clamp(int(o.reach), 0, 10), twoHanded: o.twoHanded === true, canThrow: o.canThrow === true,
    s: sh, m: md, l: lg, bs: cleanBand(o.bs, b.bs), bm: cleanBand(o.bm, b.bm), bl: cleanBand(o.bl, b.bl),
    text: s(o.text).slice(0, 80),
  };
}

/** Armor: "+3D" or "+2D physical / +1D energy". */
export type D62eProt = { phys: number; energy: number | null; text: string };
export function composeProt(p: D62eProt): string {
  if (p.text) return p.text;
  if (!p.phys && p.energy == null) return "";
  return p.energy == null ? `+${d6Add(p.phys)}` : `+${d6Add(p.phys)} physical / +${d6Add(p.energy)} energy`;
}
export function parseProt(v: unknown): D62eProt {
  const t = s(v);
  if (!t) return { phys: 0, energy: null, text: "" };
  let m = /^\+(\d+D(?:\+\d)?|\d)$/.exec(t);
  let p: D62eProt | null = m ? { phys: addPips(m[1]) ?? 0, energy: null, text: "" } : null;
  m = /^\+(\d+D(?:\+\d)?|\d) physical \/ \+(\d+D(?:\+\d)?|\d) energy$/.exec(t);
  if (m) p = { phys: addPips(m[1]) ?? 0, energy: addPips(m[2]) ?? 0, text: "" };
  return p && composeProt(p) === t ? p : { phys: 0, energy: null, text: t };
}
export function cleanProt(v: unknown): D62eProt {
  const o = (v ?? {}) as Record<string, unknown>;
  return { phys: clamp(int(o.phys), 0, 60), energy: nint(o.energy, 0, 60), text: s(o.text).slice(0, 120) };
}

export type D62eGearBuild = { dmg: D62eDamage; range: D62eRange; prot: D62eProt };
export const blankGearBuild = (): D62eGearBuild => ({ dmg: { attr: "Brawn", pips: 3, text: "" }, range: blankRange("melee"), prot: { phys: 6, energy: null, text: "" } });
export function gearBuildFrom(d: Record<string, unknown>): D62eGearBuild {
  if (d.build && typeof d.build === "object") return cleanGearBuild(d.build);
  const cat = s(d.category);
  const b = blankGearBuild();
  return {
    dmg: d.damage != null || cat === "weapon" ? parseDamage(d.damage) : b.dmg,
    range: d.range != null || cat === "weapon" ? parseRange(d.range) : b.range,
    prot: d.protection != null || cat === "armor" ? parseProt(d.protection) : b.prot,
  };
}
export function cleanGearBuild(v: unknown): D62eGearBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  return { dmg: cleanDamage(o.dmg), range: cleanRange(o.range), prot: cleanProt(o.prot) };
}
/** The category's mechanical fields (damage/range for weapons, protection for armor). */
export function composeGear(category: string, b: D62eGearBuild): Record<string, string> {
  const out: Record<string, string> = {};
  if (category === "weapon") {
    const dm = composeDamage(b.dmg); if (dm) out.damage = dm;
    const rg = composeRange(b.range); if (rg) out.range = rg;
  }
  if (category === "armor") { const p = composeProt(b.prot); if (p) out.protection = p; }
  return out;
}

// ═══ PERKS / FLAWS / TALENTS / ASSETS / TROUBLES ═════════════════════════════
export const D62E_TRAIT_KINDS = ["perk", "flaw", "talent", "asset", "trouble"] as const;
export type D62eTraitKind = (typeof D62E_TRAIT_KINDS)[number];
export const TROUBLE_COST = "+1 Hero Point";
export const ASSET_COST = "+3D or +1 Hero Point";
/** rmin/rmax: rank range (perks/flaws); open: "per rank (R1 or more)"; n/perRank: talent cost. */
export type D62eTraitBuild = { rmin: number; rmax: number; open: boolean; n: number; perRank: boolean; text: string };
export const blankTraitBuild = (): D62eTraitBuild => ({ rmin: 1, rmax: 3, open: false, n: 2, perRank: false, text: "" });
/** The book cost string (pg 102): "-1D to -3D (R1-R3)", "+2D (R2)", "-1D per rank (R1 or more)", "3 per rank". */
export function composeTraitCost(kind: string, b: D62eTraitBuild): string {
  if (b.text) return b.text;
  if (kind === "trouble") return TROUBLE_COST;
  if (kind === "asset") return ASSET_COST;
  if (kind === "talent") return b.n ? `${b.n}${b.perRank ? " per rank" : ""}` : "";
  const sg = kind === "flaw" ? "+" : "-";
  if (b.open) return `${sg}1D per rank (R${b.rmin} or more)`;
  if (b.rmin === b.rmax) return `${sg}${b.rmin}D (R${b.rmin})`;
  return `${sg}${b.rmin}D to ${sg}${b.rmax}D (R${b.rmin}-R${b.rmax})`;
}
export function traitBuildFrom(d: Record<string, unknown>): D62eTraitBuild {
  if (d.build && typeof d.build === "object") return cleanTraitBuild(d.build);
  const kind = s(d.kind) || "perk", t = s(d.cost), b = blankTraitBuild();
  if (!t) return kind === "talent" ? { ...b, n: 0 } : b;
  let c: D62eTraitBuild | null = null;
  if (kind === "talent") { const m = /^(\d+)( per rank)?$/.exec(t); if (m) c = { ...b, n: int(m[1]), perRank: !!m[2] }; }
  else if (kind === "perk" || kind === "flaw") {
    let m = /^[+-]1D per rank \(R(\d+) or more\)$/.exec(t);
    if (m) c = { ...b, open: true, rmin: int(m[1]), rmax: Math.max(int(m[1]), 5) };
    m = /^[+-](\d+)D \(R\d+\)$/.exec(t); if (m) c = { ...b, rmin: int(m[1]), rmax: int(m[1]) };
    m = /^[+-](\d+)D to [+-](\d+)D \(R\d+-R\d+\)$/.exec(t); if (m) c = { ...b, rmin: int(m[1]), rmax: int(m[2]) };
  } else if (t === (kind === "trouble" ? TROUBLE_COST : kind === "asset" ? ASSET_COST : "")) c = b;
  return c && composeTraitCost(kind, c) === t ? c : { ...b, text: t };
}
export function cleanTraitBuild(v: unknown): D62eTraitBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  const rmin = clamp(int(o.rmin, 1), 1, 10);
  return { rmin, rmax: clamp(int(o.rmax, rmin), rmin, 10), open: o.open === true, n: clamp(int(o.n), 0, 20), perRank: o.perRank === true, text: s(o.text).slice(0, 60) };
}
/** Skill-dice effect at a rank (creation, pg 102): negative = costs dice, positive = gives dice back. */
export function traitDiceAt(kind: string, b: D62eTraitBuild, rank: number): number {
  if (kind === "perk") return -rank;
  if (kind === "flaw") return rank;
  if (kind === "talent") return -(b.perRank ? b.n * rank : b.n);
  return 0;
}
/** The ranks the creation wizard offers for this trait. */
export function traitRanks(kind: string, b: D62eTraitBuild): [number, number] {
  if (kind === "perk" || kind === "flaw") return b.open ? [b.rmin, 5] : [b.rmin, b.rmax];
  if (kind === "talent" && b.perRank) return [1, 5];
  return [1, 1];
}

// ═══ LIMITATIONS (pg 224) ════════════════════════════════════════════════════
/** values[i] = Superpower Dice the limitation cuts at rank i+1. */
export type D62eLimitBuild = { values: number[]; text: string };
const WORDS = ["one", "two", "three", "four", "five"];
/** "Cost 3 for one rank, 4 for two. " / "Cost 2 / 3 / 4 for ranks 1 / 2 / 3. " (one rank → ""). */
export function limitCostLine(values: number[]): string {
  if (values.length < 2) return "";
  if (values.length === 2) return `Cost ${values[0]} for one rank, ${values[1]} for two.`;
  return `Cost ${values.join(" / ")} for ranks ${values.map((_, i) => i + 1).join(" / ")}.`;
}
export function composeLimitDesc(b: D62eLimitBuild): string { return [limitCostLine(b.values), b.text].filter(Boolean).join(" "); }
/** Per-rank values from a description's leading cost line; [value] when there is none. */
export function limitValuesFrom(value: number, desc: string): { values: number[]; text: string } {
  const t = s(desc);
  let m = /^Cost (\d+) for one rank, (\d+) for two\.(?: ([\s\S]*))?$/.exec(t);
  if (m) return { values: [int(m[1]), int(m[2])], text: m[3] ?? "" };
  m = /^Cost ((?:\d+ \/ )+\d+) for ranks ((?:\d+ \/ )+\d+)\.(?: ([\s\S]*))?$/.exec(t);
  if (m) {
    const v = m[1].split(" / ").map((x) => int(x));
    const b = { values: v, text: m[3] ?? "" };
    if (composeLimitDesc(b) === t) return b;
  }
  return { values: [value], text: t };
}
export function limitBuildFrom(d: Record<string, unknown>): D62eLimitBuild {
  if (d.build && typeof d.build === "object") return cleanLimitBuild(d.build);
  const v = d.value == null || d.value === "" ? 1 : clamp(int(d.value, 1), 0, 9);
  const b = limitValuesFrom(v, s(d.description));
  return b.values[0] === v && composeLimitDesc(b) === s(d.description) ? b : { values: [v], text: s(d.description) };
}
export function cleanLimitBuild(v: unknown): D62eLimitBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  const values = list(o.values).slice(0, 5).map((x) => clamp(int(x, 1), 0, 9));
  return { values: values.length ? values : [1], text: s(o.text).slice(0, 2900) };
}
export const limitWords = WORDS;

// ═══ POWERS ══════════════════════════════════════════════════════════════════
export const D62E_POWER_KINDS = ["magic", "psionic", "superpower"] as const;
export type D62ePowerKind = (typeof D62E_POWER_KINDS)[number];
export const MAGIC_CAST_TIMES = ["one action", "two actions", "one round", "Two turns", "one minute", "ten minutes"] as const;
export const MAGIC_DURATIONS = ["Instant", "One round", "Ten minutes", "One hour", "One day", "Permanent"] as const;
export const MAGIC_RANGES = ["Self", "Melee", "Senses", "Senses (Sight)", "Ten meters", "Line of sight"] as const;
export const MAGIC_TARGETS = ["Self", "One", "One target", "Two", "All in range"] as const;
export const MAGIC_RESIST_KINDS = ["Complete Nullification", "Partial Nullification"] as const;
export type D62eEnh = { name: string; cost: number };
export type D62eLimitRef = { name: string; rank: number; value: number };
export type D62ePowerBuild = {
  /** Magic: the Spell School skill; psionic/superpower: a skill as written when not built from parts. */
  school: string;
  diff: number | null; diffNote: string; diffText: string;
  // magic — magicOpts false = the option lines were kept as written (in `extra`)
  magicOpts: boolean; cast: string; power: number; resist: boolean; resistKind: string; resistSkill: string;
  duration: string; range: string; target: string;
  // psionic
  psi: D62ePsiSkill[];
  // superpower — costText keeps an unparseable legacy cost as written
  base: number; perRank: boolean; costText: string; enh: D62eEnh[]; limits: D62eLimitRef[];
  /** Option lines the builder doesn't structure ("Range: sight or voice"), kept in order after the composed ones. */
  extra: string[];
};
export const blankPowerBuild = (): D62ePowerBuild => ({
  school: "Spell School: Change (Alteration)", diff: 10, diffNote: "", diffText: "",
  magicOpts: true, cast: "one action", power: 1, resist: false, resistKind: "Complete Nullification", resistSkill: "Willpower",
  duration: "Instant", range: "Melee", target: "One", psi: ["Kinesis"], base: 3, perRank: true, costText: "", enh: [], limits: [], extra: [],
});
export const composePsiSkill = (k: D62ePsiSkill[]) => D62E_PSI_SKILLS.filter((x) => k.includes(x)).join(" + ");
export function composeResist(b: D62ePowerBuild) { return b.resist ? `Yes (${[b.resistKind, b.resistSkill].filter(Boolean).join(", ")})` : "No"; }
/** Per-rank cost of a superpower: base + every enhancement (each paid at each rank). */
export const powerUnitCost = (b: D62ePowerBuild) => b.base + b.enh.reduce((n, e) => n + e.cost, 0);
export const powerLimitCut = (b: D62ePowerBuild) => b.limits.reduce((n, l) => n + l.value, 0);
/** Total Superpower Dice at a rank, after limitations — never below 1 for a power that costs anything (pg 224). */
export function powerCostAt(b: D62ePowerBuild, rank: number): number {
  const gross = b.perRank ? powerUnitCost(b) * rank : powerUnitCost(b);
  return gross ? Math.max(1, gross - powerLimitCut(b)) : 0;
}
export const composePowerDiff = (b: D62ePowerBuild) => b.diffText || (b.diff != null ? `${b.diff}${b.diffNote ? ` (${b.diffNote})` : ""}` : "");
export function magicOptions(b: D62ePowerBuild): string[] {
  if (!b.magicOpts) return [...b.extra];
  return [`Casting Time: ${b.cast}`, `Power: ${b.power}`, `Resist: ${composeResist(b)}`, `Duration: ${b.duration}`, `Range: ${b.range}`, `Target: ${b.target}`, ...b.extra];
}
export type D62ePowerOut = { skill?: string; difficulty?: string; cost?: string; options: string[]; limitations?: { name: string; value: number }[] };
/** The book's power fields: skill / difficulty / cost / options (+ built-in limitations, which the creation wizard subtracts). */
export function composePower(kind: string, b: D62ePowerBuild): D62ePowerOut {
  const out: D62ePowerOut = { options: [] };
  const diff = composePowerDiff(b); if (diff) out.difficulty = diff;
  if (kind === "magic") {
    if (b.school) out.skill = b.school;
    out.options = magicOptions(b);
    return out;
  }
  if (kind === "psionic") {
    const sk = composePsiSkill(b.psi) || b.school; if (sk) out.skill = sk;
    out.options = [...b.extra];
    return out;
  }
  if (b.school) out.skill = b.school;
  out.cost = b.costText || `${powerUnitCost(b)}${b.perRank ? " per rank" : ""}`;
  out.options = [...b.enh.map((e) => `Enhancement: ${e.name} (+${e.cost}${b.perRank ? " per rank" : ""})`), ...b.limits.map((l) => `Limitation: ${l.name}${l.rank > 1 ? ` R${l.rank}` : ""} (−${l.value})`), ...b.extra];
  if (b.limits.length) out.limitations = b.limits.map((l) => ({ name: l.name, value: l.value }));
  return out;
}
const OPT_RE = /^(Casting Time|Power|Resist|Duration|Range|Target): (.*)$/;
export function powerBuildFrom(d: Record<string, unknown>): D62ePowerBuild {
  if (d.build && typeof d.build === "object") return cleanPowerBuild(d.build);
  const kind = s(d.kind) || "magic", b = blankPowerBuild();
  const opts = strs(d.options, 20, 120);
  const diff = s(d.difficulty), skill = s(d.skill);
  b.school = skill; b.extra = opts; b.enh = []; b.limits = [];
  if (kind === "magic") {
    const m: D62ePowerBuild = { ...b, cast: "", power: 0, resist: false, resistKind: "", resistSkill: "", duration: "", range: "", target: "", extra: [] };
    const seen = new Set<string>();
    opts.forEach((o) => {
      const x = OPT_RE.exec(o);
      if (!x || seen.has(x[1])) { m.extra.push(o); return; }
      const v = x[2];
      if (x[1] === "Power") { if (/^\d+$/.test(v)) { m.power = int(v); seen.add("Power"); } else m.extra.push(o); return; }
      if (x[1] === "Resist") {
        const r = /^Yes \(([^,()]+)(?:, ([^()]+))?\)$/.exec(v);
        if (v === "No") seen.add("Resist");
        else if (r) { m.resist = true; m.resistKind = r[1]; m.resistSkill = r[2] ?? ""; seen.add("Resist"); }
        else m.extra.push(o);
        return;
      }
      seen.add(x[1]);
      if (x[1] === "Casting Time") m.cast = v; else if (x[1] === "Duration") m.duration = v; else if (x[1] === "Range") m.range = v; else m.target = v;
    });
    // Adopt the structure only if re-composing gives back exactly the same lines in the same order.
    if (seen.size === 6 && JSON.stringify(magicOptions(m)) === JSON.stringify(opts)) Object.assign(b, m);
    else Object.assign(b, { magicOpts: false, resist: false });
  } else if (kind === "psionic") {
    const psi = D62E_PSI_SKILLS.filter((x) => skill.split(" + ").includes(x));
    if (psi.length && composePsiSkill(psi) === skill) { b.psi = psi; b.school = ""; } else b.psi = [];
  } else {
    const c = s(d.cost), m = /^(\d+)( per rank)?$/.exec(c);
    b.base = m ? int(m[1]) : 0; b.perRank = !!(m && m[2]); b.costText = m || !c ? "" : c;
    if (!c) { b.base = 0; b.perRank = false; }
  }
  // Difficulty: a number (± a parenthesised note), else kept as written.
  const dm = /^(\d+)(?: \((.+)\))?$/.exec(diff);
  b.diffNote = "";
  if (!diff) { b.diff = null; b.diffText = ""; }
  else if (dm) { b.diff = int(dm[1]); b.diffNote = dm[2] ?? ""; b.diffText = ""; }
  else { b.diff = null; b.diffText = diff; }
  return b;
}
export function cleanPowerBuild(v: unknown): D62ePowerBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  return {
    school: s(o.school).slice(0, 120), diff: nint(o.diff, 0, 60), diffNote: s(o.diffNote).slice(0, 200), diffText: s(o.diffText).slice(0, 300),
    magicOpts: o.magicOpts !== false, cast: s(o.cast).slice(0, 60), power: clamp(int(o.power), 0, 30), resist: o.resist === true, resistKind: s(o.resistKind).slice(0, 40), resistSkill: s(o.resistSkill).slice(0, 40),
    duration: s(o.duration).slice(0, 60), range: s(o.range).slice(0, 60), target: s(o.target).slice(0, 60),
    psi: D62E_PSI_SKILLS.filter((k) => list(o.psi).includes(k)),
    base: clamp(int(o.base), 0, 30), perRank: o.perRank === true, costText: s(o.costText).slice(0, 60),
    enh: list(o.enh).slice(0, 10).map((x) => { const e = (x ?? {}) as Record<string, unknown>; return { name: s(e.name).slice(0, 60), cost: clamp(int(e.cost, 1), 0, 10) }; }).filter((e) => e.name),
    limits: list(o.limits).slice(0, 10).map((x) => { const e = (x ?? {}) as Record<string, unknown>; return { name: s(e.name).slice(0, 60), rank: clamp(int(e.rank, 1), 1, 5), value: clamp(int(e.value, 1), 0, 9) }; }).filter((e) => e.name),
    extra: strs(o.extra, 20, 120),
  };
}

// ═══ CREATURES ═══════════════════════════════════════════════════════════════
/** mode skill: "Shooting 2D" (dice ADDED to the attribute); group: "Agility Skills 4D"; text: the line as written. */
export type D62eSkillRow = { mode: "skill" | "group" | "text"; name: string; pips: number };
export type D62eNatAtk = { name: string; attr: string; pips: number; skill: string; special: string };
export type D62eCreatureBuild = {
  attrs: Record<string, number | null>;
  skills: D62eSkillRow[];
  dodge: { auto: boolean; n: number | null };
  parry: { auto: boolean; n: number | null };
  attacks: D62eNatAtk[];
  special: string[];
  move: { n: number | null; modes: string[]; text: string };
};
export const blankCreatureBuild = (): D62eCreatureBuild => ({
  attrs: { Agility: 6, Brawn: 6, Knowledge: 6, Perception: 6 },
  skills: [], dodge: { auto: true, n: null }, parry: { auto: true, n: null }, attacks: [], special: [], move: { n: null, modes: [], text: "" },
});
export const composeSkillRow = (r: D62eSkillRow) => (r.mode === "text" ? r.name : r.mode === "group" ? `${r.name} Skills ${d6Code(r.pips)}` : `${r.name} ${d6Code(r.pips)}`);
/** Dodge = 5 × Perception dice; Parry = 5 × Agility dice (creation, pg 36). */
export const autoDodge = (a: D62eCreatureBuild["attrs"]) => 5 * Math.floor((a.Perception ?? 0) / 3);
export const autoParry = (a: D62eCreatureBuild["attrs"]) => 5 * Math.floor((a.Agility ?? 0) / 3);
export const atkDamage = (a: D62eNatAtk) => composeDamage({ attr: a.attr, pips: a.pips, text: "" }) || "0D";
export const composeAtk = (a: D62eNatAtk) => `Damage: ${a.name} (${atkDamage(a)})${a.skill ? `, rolled with ${a.skill}` : ""}${a.special ? `. ${a.special}` : ""}`;
export const composeMove = (m: D62eCreatureBuild["move"]) => m.text || [m.n ? String(m.n) : "", ...m.modes].filter(Boolean).join(", ");
export function composeCreature(b: D62eCreatureBuild) {
  const attributes: Record<string, number> = {};
  for (const [k, p] of Object.entries(b.attrs)) if (p != null) attributes[k] = p;
  const dodge = b.dodge.auto ? autoDodge(b.attrs) : b.dodge.n, parry = b.parry.auto ? autoParry(b.attrs) : b.parry.n;
  const special = [
    ...(dodge != null ? [`Dodge ${dodge}`] : []), ...(parry != null ? [`Parry ${parry}`] : []),
    ...b.attacks.filter((a) => a.name).map(composeAtk), ...b.special.filter(Boolean),
  ];
  const out: Record<string, unknown> = { attributes, skills: b.skills.filter((r) => r.name).map(composeSkillRow) };
  if (special.length) out.special = special;
  const mv = composeMove(b.move); if (mv) out.move = mv;
  return out;
}
export function parseSkillRow(t: string): D62eSkillRow {
  let m = /^([A-Z][a-z]+) Skills (\d+D(?:\+\d)?)$/.exec(t);
  if (m && (D62E_ALL_ATTRS as readonly string[]).includes(m[1])) { const r: D62eSkillRow = { mode: "group", name: m[1], pips: d6Parse(m[2]) ?? 0 }; if (composeSkillRow(r) === t) return r; }
  m = /^(.+?) (\d+D(?:\+\d)?)$/.exec(t);
  if (m) { const r: D62eSkillRow = { mode: "skill", name: m[1], pips: d6Parse(m[2]) ?? 0 }; if (composeSkillRow(r) === t) return r; }
  return { mode: "text", name: t, pips: 0 };
}
export function parseAtk(t: string): D62eNatAtk | null {
  const m = /^Damage: (.+?) \(([^()]+)\)(?:, rolled with ([^.]+?))?(?:\. ([\s\S]+))?$/.exec(t);
  if (!m) return null;
  const dm = parseDamage(m[2]);
  if (dm.text) return null;
  const a: D62eNatAtk = { name: m[1], attr: dm.attr, pips: dm.pips, skill: m[3] ?? "", special: m[4] ?? "" };
  return composeAtk(a) === t ? a : null;
}
export function creatureBuildFrom(d: Record<string, unknown>): D62eCreatureBuild {
  if (d.build && typeof d.build === "object") return cleanCreatureBuild(d.build);
  const A = (d.attributes ?? {}) as Record<string, unknown>;
  const attrs: Record<string, number | null> = {};
  for (const [k, v] of Object.entries(A)) if (typeof v === "number") attrs[k] = v;
  // Pre-builder form posts (top-level "3D+2" codes) never reach storage, but read them anyway.
  for (const a of D62E_CORE_ATTRS) if (attrs[a] == null && d[a] != null) attrs[a] = d6Parse(d[a]);
  const b: D62eCreatureBuild = { ...blankCreatureBuild(), attrs, skills: strs(d.skills, 40, 120).map(parseSkillRow) };
  let lines = strs(d.special, 40, 400);
  // Dodge / Parry lead the composed list; take them only from the front, and only as plain numbers.
  const take = (key: "Dodge" | "Parry", auto: number) => {
    const m = lines[0] ? new RegExp(`^${key} (\\d+)$`).exec(lines[0]) : null;
    if (!m) return { auto: false, n: null };
    lines = lines.slice(1);
    const n = int(m[1]);
    return n === auto ? { auto: true, n: null } : { auto: false, n };
  };
  b.dodge = take("Dodge", autoDodge(attrs));
  b.parry = take("Parry", autoParry(attrs));
  // A leading run of "Damage: Name (Brawn+2D)" lines becomes natural attacks (order is kept).
  let lead = true;
  for (const l of lines) { const a = lead ? parseAtk(l) : null; if (a) b.attacks.push(a); else { lead = false; b.special.push(l); } }
  const mv = s(d.move);
  if (mv) {
    const parts = mv.split(", ");
    const n = /^\d+$/.test(parts[0]) ? int(parts[0]) : null;
    const modes = parts.slice(n != null ? 1 : 0);
    const m = { n, modes, text: "" };
    b.move = modes.every((x) => (D62E_MOVE_MODES as readonly string[]).includes(x)) && composeMove(m) === mv ? m : { n: null, modes: [], text: mv };
  }
  return b;
}
export function cleanCreatureBuild(v: unknown): D62eCreatureBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  const A = (o.attrs ?? {}) as Record<string, unknown>;
  const attrs: Record<string, number | null> = {};
  for (const [k, p] of Object.entries(A).slice(0, 12)) { const key = s(k).slice(0, 30); if (key) attrs[key] = nint(p, 0, 90); }
  const def = (x: unknown) => { const q = (x ?? {}) as Record<string, unknown>; return { auto: q.auto === true, n: nint(q.n, 0, 99) }; };
  const mv = (o.move ?? {}) as Record<string, unknown>;
  return {
    attrs,
    skills: list(o.skills).slice(0, 40).map((x) => { const r = (x ?? {}) as Record<string, unknown>; return { mode: oneOf(r.mode, ["skill", "group", "text"] as const, "skill"), name: s(r.name).slice(0, 120), pips: clamp(int(r.pips), 0, 90) }; }).filter((r) => r.name),
    dodge: def(o.dodge), parry: def(o.parry),
    attacks: list(o.attacks).slice(0, 12).map((x) => {
      const r = (x ?? {}) as Record<string, unknown>; const attr = s(r.attr);
      return { name: s(r.name).slice(0, 60), attr: (D62E_ALL_ATTRS as readonly string[]).includes(attr) ? attr : "", pips: clamp(int(r.pips), 0, 90), skill: s(r.skill).slice(0, 60), special: s(r.special).slice(0, 200) };
    }).filter((r) => r.name),
    special: strs(o.special, 30, 400),
    move: { n: nint(mv.n, 0, 999), modes: strs(mv.modes, 5, 30).filter((m) => (D62E_MOVE_MODES as readonly string[]).includes(m)), text: s(mv.text).slice(0, 60) },
  };
}
/** Total pips a creature rolls for a skill row's governing attribute + its added dice. */
export function skillTotal(b: D62eCreatureBuild, r: D62eSkillRow, attrOf: (name: string) => string | null): number | null {
  if (r.mode === "text") return null;
  if (r.mode === "group") return r.pips;
  const a = attrOf(r.name);
  return (a && b.attrs[a] != null ? (b.attrs[a] as number) : 0) + r.pips;
}
