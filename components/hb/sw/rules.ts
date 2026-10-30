// ── Star Wars (WEG d6, 1st edition + Sourcebook + Rules Companion) homebrew rules ──
// Pure — no React, no sw-*.ts data import. Shared by the components/hb/sw/*
// builders (client) and lib/homebrew.ts normalizeSw* (server), so the live
// preview and the stored book shape (lib/data/sw-types.ts) agree.
//
// Everything is a die code: "4D+2" = 4 dice + 2 pips; 3 pips make 1D, so a code
// is stored as pips (4D+2 = 14) and pips never exceed 2 in a written code.
//
// Each type keeps a structured `build` beside the legacy book fields; the server
// re-composes the legacy fields from `build` (compose*), and old records open via
// *BuildFrom(), which parses the book text best-effort and LOSSLESSLY: a value
// is only turned into pickers when re-composing it reproduces the original text
// exactly; otherwise it stays as editable text, so nothing is ever rewritten.

export const SW_ATTRS = ["Dexterity", "Knowledge", "Mechanical", "Perception", "Strength", "Technical"] as const;
export type SwAttr = (typeof SW_ATTRS)[number];
export const SW_ATTR_ABBR: Record<SwAttr, string> = { Dexterity: "DEX", Knowledge: "KNO", Mechanical: "MEC", Perception: "PER", Strength: "STR", Technical: "TEC" };
export const SW_BOOKS = ["core", "sourcebook", "companion"] as const;
export const SW_BOOK_OPTS: [string, string][] = [["core", "Core"], ["sourcebook", "Sourcebook"], ["companion", "Companion"]];
export const SW_WEAPON_KINDS = ["Blaster", "Slugthrower", "Archaic", "Melee", "Thrown", "Grenade", "Explosive", "Heavy", "Vehicle", "Starship", "Capital", "Artillery", "Droid"] as const;
export const SW_GEAR_CATEGORIES = ["Armor", "Medical", "Tool", "Communication", "Survival", "Droid", "Clothing", "Misc"] as const;
export const SW_CHAR_GROUPS = ["Imperial", "Rebel", "Civilian", "Alien", "Droid", "Creature", "Hero", "Villain"] as const;
export const SW_FORCE_KEYS = ["Control", "Sense", "Alter"] as const;
export type SwForceKey = (typeof SW_FORCE_KEYS)[number];
/** Companion difficulty scale (sw-tables difficulties). */
export const SW_DIFFICULTIES: [string, string][] = [["Very Easy", "3–5"], ["Easy", "6–10"], ["Moderate", "11–15"], ["Difficult", "16–20"], ["Very Difficult", "21–30"]];
export const SW_OPPOSED = "a Perception or Control roll for the target";
export const SW_FORCE_MODS: [string, string][] = [["", "—"], ["proximity", "modified by proximity"], ["relationship", "modified by relationship"], ["proximity and relationship", "modified by proximity and relationship"]];
export const SW_TIMES = ["one round", "two rounds", "one minute", "a few minutes", "five minutes", "half an hour", "one hour", "hours"] as const;
export const SW_RARITY: [number, string][] = [[1, "1 · readily available"], [2, "2 · large cities and space ports"], [3, "3 · specialized / planet of origin"], [4, "4 · rare, hard to find anywhere"]];
export const SW_LEGAL: [string, string][] = [["", "—"], ["F", "F · fee or permit required"], ["R", "R · restricted"], ["X", "X · illegal"]];
/** Rules Companion range difficulties (to-hit by band). */
export const SW_RANGE_DIFF: [string, string][] = [["Point-blank", "Very Easy"], ["Short", "Easy"], ["Medium", "Moderate"], ["Long", "Difficult"]];

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const int = (v: unknown, d = 0): number => { const n = parseInt(s(v).replace(/,/g, ""), 10); return Number.isFinite(n) ? n : d; };
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const nint = (v: unknown, lo: number, hi: number): number | null => (v == null || v === "" ? null : clamp(int(v), lo, hi));
const oneOf = <T extends string>(v: unknown, list: readonly T[], d: T): T => (list.includes(s(v) as T) ? (s(v) as T) : d);

// ═══ DIE CODES ═══════════════════════════════════════════════════════════════
/** pips → "4D+2" ("+1" for a pips-only code, "0D" for 0, "" for null). */
export function swCode(p: number | null | undefined): string {
  if (p == null || !Number.isFinite(p)) return "";
  const neg = p < 0, a = Math.abs(Math.round(p)), d = Math.floor(a / 3), r = a % 3;
  const c = d ? `${d}D${r ? "+" + r : ""}` : r ? `+${r}` : "0D";
  return neg ? "-" + c.replace(/^\+/, "") : c;
}
/** The code as written after a "+" or "-" ("1D", "1D+1", "2"). */
export const swAdd = (p: number) => { const d = Math.floor(p / 3), r = p % 3; return d ? `${d}D${r ? "+" + r : ""}` : String(r); };
/** "3D+2" / "4D" / "+1" / "5D-1" → pips; null when not a code. */
export function swParseCode(v: unknown): number | null {
  const t = s(v).replace(/\s+/g, "").toUpperCase();
  let m = /^(\d+)D([+-]\d+)?$/.exec(t);
  if (m) return parseInt(m[1], 10) * 3 + (m[2] ? parseInt(m[2], 10) : 0);
  m = /^\+(\d)$/.exec(t);
  return m ? parseInt(m[1], 10) : null;
}
export const fmtNum = (n: number) => (n >= 1000 ? n.toLocaleString("en-US") : String(n));

// ═══ COST / AVAILABILITY ═════════════════════════════════════════════════════
export type SwCost = { mode: "cr" | "nfs" | "none" | "text"; n: number; text: string };
export const blankCost = (n = 0): SwCost => ({ mode: n ? "cr" : "none", n, text: "" });
export function composeCost(c: SwCost): string {
  if (c.mode === "cr") return String(c.n);
  if (c.mode === "nfs") return "Not for sale (—)";
  if (c.mode === "text") return c.text;
  return "";
}
export function parseCost(v: unknown): SwCost {
  const t = s(v);
  if (!t) return blankCost();
  if (/^\d+$/.test(t)) return { mode: "cr", n: int(t), text: "" };
  if (t === "Not for sale (—)") return { mode: "nfs", n: 0, text: "" };
  return { mode: "text", n: 0, text: t };
}
export function cleanCost(v: unknown): SwCost {
  const o = (v ?? {}) as Record<string, unknown>;
  return { mode: oneOf(o.mode, ["cr", "nfs", "none", "text"] as const, "none"), n: clamp(int(o.n), 0, 100_000_000), text: s(o.text).slice(0, 80) };
}

export type SwAvail = { r: number; code: "" | "F" | "R" | "X"; note: string; text: string };
export const blankAvail = (): SwAvail => ({ r: 0, code: "", note: "", text: "" });
export function composeAvail(a: SwAvail): string {
  if (a.text) return a.text;
  if (!a.r) return "";
  return `${a.r}${a.code ? ", " + a.code : ""}${a.note ? " — " + a.note : ""}`;
}
export function parseAvail(v: unknown): SwAvail {
  const t = s(v);
  if (!t) return blankAvail();
  const m = /^([1-4])(?:, ([FRX]))?(?: — (.+))?$/.exec(t);
  const a: SwAvail = m ? { r: int(m[1]), code: (m[2] ?? "") as SwAvail["code"], note: m[3] ?? "", text: "" } : { ...blankAvail(), text: t };
  return composeAvail(a) === t ? a : { ...blankAvail(), text: t };
}
export function cleanAvail(v: unknown): SwAvail {
  const o = (v ?? {}) as Record<string, unknown>;
  return { r: clamp(int(o.r), 0, 4), code: oneOf(o.code, ["", "F", "R", "X"] as const, ""), note: s(o.note).slice(0, 80), text: s(o.text).slice(0, 80) };
}

// ═══ WEAPONS ═════════════════════════════════════════════════════════════════
export type SwRange = { mode: "bands" | "none" | "text"; pb: number; s: number; m: number; l: number; text: string };
export const blankRange = (): SwRange => ({ mode: "bands", pb: 3, s: 10, m: 30, l: 120, text: "" });
export function composeRange(r: SwRange): string {
  if (r.mode === "none") return "";
  if (r.mode === "text") return r.text;
  return `${fmtNum(r.pb)}-${fmtNum(r.s)}/${fmtNum(r.s + 1)}-${fmtNum(r.m)}/${fmtNum(r.m + 1)}-${fmtNum(r.l)}`;
}
export function parseRange(v: unknown): SwRange {
  const t = s(v);
  if (!t) return { ...blankRange(), mode: "none" };
  const m = /^([\d,]+)-([\d,]+)\/([\d,]+)-([\d,]+)\/([\d,]+)-([\d,]+)$/.exec(t);
  if (m) {
    const r: SwRange = { mode: "bands", pb: int(m[1]), s: int(m[2]), m: int(m[4]), l: int(m[6]), text: "" };
    if (composeRange(r) === t) return r;
  }
  return { ...blankRange(), mode: "text", text: t };
}
export function cleanRange(v: unknown): SwRange {
  const o = (v ?? {}) as Record<string, unknown>;
  const pb = clamp(int(o.pb, 3), 0, 1_000_000), sh = clamp(int(o.s, 10), pb + 1, 1_000_000);
  const md = clamp(int(o.m, 30), sh + 1, 2_000_000), lg = clamp(int(o.l, 120), md + 1, 5_000_000);
  return { mode: oneOf(o.mode, ["bands", "none", "text"] as const, "none"), pb, s: sh, m: md, l: lg, text: s(o.text).slice(0, 80) };
}

export type SwDamage = { str: boolean; pips: number; note: string; text: string };
export const blankDamage = (pips = 12): SwDamage => ({ str: false, pips, note: "", text: "" });
/** Book damage text: "4D", "STR+1D", "STR", "3D (stun damage only)". */
export function composeDamage(d: SwDamage): string {
  if (d.text) return d.text;
  if (!d.str && !d.pips) return "";
  const core = d.str ? "STR" + (d.pips ? "+" + swAdd(d.pips) : "") : swCode(d.pips);
  return core + (d.note ? ` (${d.note})` : "");
}
/** Stored `damage` pips: the code (or the dice added to STR); null for bare STR / text. */
export const damagePips = (d: SwDamage, legacy: number | null = null): number | null => (d.text ? legacy : !d.pips ? null : d.pips);
export function parseDamage(v: unknown): SwDamage {
  const t = s(v);
  if (!t) return blankDamage(0);
  const m = /^(STR)?(?:\+?(\d+D(?:\+\d)?|\d))?(?: \(([^()]+)\))?$/.exec(t);
  if (m && (m[1] || m[2])) {
    const code = m[2] ? (/D/.test(m[2]) ? swParseCode(m[2]) : int(m[2])) : 0;
    const d: SwDamage = { str: !!m[1], pips: code ?? 0, note: m[3] ?? "", text: "" };
    if (composeDamage(d) === t) return d;
  }
  return { ...blankDamage(0), text: t };
}
export function cleanDamage(v: unknown): SwDamage {
  const o = (v ?? {}) as Record<string, unknown>;
  return { str: o.str === true, pips: clamp(int(o.pips), 0, 120), note: s(o.note).slice(0, 80), text: s(o.text).slice(0, 400) };
}

export type SwWeaponBuild = { kind: string; dmg: SwDamage; range: SwRange; skill: string; ammo: number; cost: SwCost; avail: SwAvail };
export const blankWeaponBuild = (): SwWeaponBuild => ({ kind: "Blaster", dmg: blankDamage(12), range: blankRange(), skill: "blaster", ammo: 0, cost: blankCost(500), avail: { r: 1, code: "R", note: "", text: "" } });
export function weaponBuildFrom(d: Record<string, unknown>): SwWeaponBuild {
  if (d.build && typeof d.build === "object") return cleanWeaponBuild(d.build);
  const dmg = parseDamage(d.damageText || (typeof d.damage === "number" ? swCode(d.damage) : ""));
  return { kind: s(d.kind) || "Blaster", dmg, range: parseRange(d.range), skill: s(d.skill), ammo: clamp(int(d.ammo), 0, 1000), cost: parseCost(d.cost), avail: parseAvail(d.availability) };
}
export function cleanWeaponBuild(v: unknown): SwWeaponBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  return { kind: s(o.kind).slice(0, 30) || "Blaster", dmg: cleanDamage(o.dmg), range: cleanRange(o.range), skill: s(o.skill).slice(0, 60), ammo: clamp(int(o.ammo), 0, 1000), cost: cleanCost(o.cost), avail: cleanAvail(o.avail) };
}
/** The SwWeapon fields every consumer reads (sheet, GM Screen loot, /sw/equipment). */
export function composeWeapon(b: SwWeaponBuild, legacyPips: number | null = null) {
  const out: Record<string, unknown> = { kind: b.kind, damage: damagePips(b.dmg, legacyPips) };
  const dt = composeDamage(b.dmg); if (dt) out.damageText = dt;
  const rg = composeRange(b.range); if (rg) out.range = rg;
  if (b.skill) out.skill = b.skill;
  const c = composeCost(b.cost); if (c) out.cost = c;
  const a = composeAvail(b.avail); if (a) out.availability = a;
  if (b.ammo) out.ammo = b.ammo;
  return out;
}

// ═══ GEAR / ARMOR ════════════════════════════════════════════════════════════
export type SwGearBuild = { armor: number; dex: number; stats: string; cost: SwCost };
export const blankGearBuild = (): SwGearBuild => ({ armor: 3, dex: 0, stats: "", cost: blankCost(300) });
/** "Armor code 1D (3 pips); -1D Dexterity; <other stats>" — the sheet reads the first code as the armor's pips. */
export function composeGearStats(b: SwGearBuild, category: string): string {
  const parts: string[] = [];
  if (category === "Armor" && b.armor) {
    parts.push(`Armor code ${swCode(b.armor)} (${b.armor} pip${b.armor === 1 ? "" : "s"})`);
    if (b.dex) parts.push(`-${swAdd(b.dex)} Dexterity`);
  }
  if (b.stats) parts.push(b.stats);
  return parts.join("; ");
}
export function gearBuildFrom(d: Record<string, unknown>): SwGearBuild {
  if (d.build && typeof d.build === "object") return cleanGearBuild(d.build);
  const cat = s(d.category), t = s(d.stats), cost = parseCost(d.cost);
  const m = /^Armor code (\S+) \((\d+) pips?\)(?:; -(\d+D(?:\+\d)?|\d) Dexterity)?(?:; (.+))?$/.exec(t);
  if (cat === "Armor" && m) {
    const b: SwGearBuild = { armor: swParseCode(m[1]) ?? 0, dex: m[3] ? (/D/.test(m[3]) ? swParseCode(m[3]) ?? 0 : int(m[3])) : 0, stats: m[4] ?? "", cost };
    if (composeGearStats(b, cat) === t) return b;
  }
  return { armor: 0, dex: 0, stats: t, cost };
}
export function cleanGearBuild(v: unknown): SwGearBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  return { armor: clamp(int(o.armor), 0, 30), dex: clamp(int(o.dex), 0, 30), stats: s(o.stats).slice(0, 200), cost: cleanCost(o.cost) };
}

// ═══ FORCE POWERS ════════════════════════════════════════════════════════════
export type SwForceDiff = { level: string; mods: string; note: string };
export type SwForceBuild = { keys: SwForceKey[]; diff: Partial<Record<SwForceKey, SwForceDiff>>; diffText: string; time: string; timeNote: string; keptUp: boolean };
export const blankForceDiff = (): SwForceDiff => ({ level: "Easy", mods: "", note: "" });
export const blankForceBuild = (): SwForceBuild => ({ keys: ["Control"], diff: { Control: blankForceDiff() }, diffText: "", time: "one round", timeNote: "", keptUp: false });
const KEY_ORDER = (k: SwForceKey[]) => SW_FORCE_KEYS.filter((x) => k.includes(x));
/** "Control", "Control & Sense", "Control, Sense & Alter". */
export function composeForceAttr(keys: SwForceKey[]): string {
  const k = KEY_ORDER(keys);
  return k.length <= 1 ? k[0] ?? "Control" : `${k.slice(0, -1).join(", ")} & ${k[k.length - 1]}`;
}
function diffPhrase(d: SwForceDiff): string {
  const lvl = d.level === "opposed" ? SW_OPPOSED : d.level;
  return `${lvl}${d.mods ? ", modified by " + d.mods : ""}${d.note ? "; " + d.note : ""}.`;
}
export function composeForceDiff(b: SwForceBuild): string {
  if (b.diffText) return b.diffText;
  const k = KEY_ORDER(b.keys);
  if (k.length === 1) { const p = diffPhrase(b.diff[k[0]] ?? blankForceDiff()); return p.charAt(0) === "a" ? "Make " + p : p; }
  return k.map((key) => `${key}: ${diffPhrase(b.diff[key] ?? blankForceDiff())}`).join(" ");
}
export function composeForceTime(b: SwForceBuild): string {
  return [b.time, b.keptUp ? "may be kept up" : "", b.timeNote].filter(Boolean).join("; ");
}
function parseDiffPhrase(t: string): SwForceDiff | null {
  const m = /^(?:Make )?(a Perception or Control roll for the target|Very Easy|Easy|Moderate|Very Difficult|Difficult)(?:, modified by (proximity and relationship|proximity|relationship))?(?:; (.+))?\.$/.exec(t);
  return m ? { level: m[1] === SW_OPPOSED ? "opposed" : m[1], mods: m[2] ?? "", note: m[3] ?? "" } : null;
}
export function forceBuildFrom(d: Record<string, unknown>): SwForceBuild {
  if (d.build && typeof d.build === "object") return cleanForceBuild(d.build);
  const attr = s(d.attribute) || "Control";
  const keys = SW_FORCE_KEYS.filter((k) => attr.includes(k));
  const b: SwForceBuild = { ...blankForceBuild(), keys: keys.length ? keys : ["Control"], diff: {} };
  // time: "<base>; may be kept up; <note>"
  const tt = s(d.time), tp = tt.split("; ");
  b.time = tp[0] ?? ""; let rest = tp.slice(1);
  if (rest[0] === "may be kept up") { b.keptUp = true; rest = rest.slice(1); }
  b.timeNote = rest.join("; ");
  if (composeForceTime(b) !== tt) { b.time = tt; b.keptUp = false; b.timeNote = ""; }
  // difficulty: per key, or kept as text
  const dt = s(d.difficulty);
  if (b.keys.length === 1) {
    const p = parseDiffPhrase(dt); if (p) b.diff[b.keys[0]] = p;
  } else {
    const segs = dt.split(/ (?=(?:Control|Sense|Alter): )/);
    segs.forEach((sg) => { const m = /^(Control|Sense|Alter): (.+)$/.exec(sg); const p = m ? parseDiffPhrase(m[2]) : null; if (m && p) b.diff[m[1] as SwForceKey] = p; });
  }
  for (const k of b.keys) if (!b.diff[k]) b.diff[k] = blankForceDiff();
  // Unparsed (or an unusual attribute text): keep the difficulty verbatim as text.
  b.diffText = dt && (composeForceAttr(b.keys) !== attr || composeForceDiff(b) !== dt) ? dt : "";
  return b;
}
export function cleanForceBuild(v: unknown): SwForceBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  const keys = Array.isArray(o.keys) ? SW_FORCE_KEYS.filter((k) => (o.keys as unknown[]).includes(k)) : [];
  const dIn = (o.diff ?? {}) as Record<string, unknown>;
  const diff: Partial<Record<SwForceKey, SwForceDiff>> = {};
  for (const k of keys.length ? keys : (["Control"] as SwForceKey[])) {
    const x = (dIn[k] ?? {}) as Record<string, unknown>;
    const lvl = s(x.level);
    diff[k] = {
      level: lvl === "opposed" || SW_DIFFICULTIES.some(([n]) => n === lvl) ? lvl : "Easy",
      mods: oneOf(x.mods, ["", "proximity", "relationship", "proximity and relationship"] as const, ""),
      note: s(x.note).replace(/\.+$/, "").slice(0, 300),
    };
  }
  return { keys: keys.length ? keys : ["Control"], diff, diffText: s(o.diffText).slice(0, 2000), time: s(o.time).slice(0, 80), timeNote: s(o.timeNote).slice(0, 120), keptUp: o.keptUp === true };
}

// ═══ CHARACTERS / NPCs ═══════════════════════════════════════════════════════
export type SwSkillRow = { name: string; pips: number | null; note: string };
export type SwWeaponRow = { name: string; str: boolean; pips: number; skill: string; special: string };
export type SwMove = { mode: "none" | "code" | "text"; pips: number; text: string };
export type SwCharBuild = {
  attrs: Partial<Record<SwAttr, number | null>>;
  move: SwMove;
  skills: SwSkillRow[];
  force: Partial<Record<SwForceKey, number | null>>;
  fp: number; dsp: number;
  weapons: SwWeaponRow[];
  gear: string[];
};
export const blankCharBuild = (): SwCharBuild => ({
  attrs: Object.fromEntries(SW_ATTRS.map((a) => [a, 6])) as Record<SwAttr, number>,
  move: { mode: "none", pips: 6, text: "" }, skills: [], force: {}, fp: 0, dsp: 0, weapons: [], gear: [],
});
export const composeSkill = (r: SwSkillRow) => (r.pips == null ? r.name : `${r.name} ${swCode(r.pips)}${r.note ? ` (${r.note})` : ""}`);
export const weaponRowDamage = (w: SwWeaponRow) => (w.str ? "STR" + (w.pips ? "+" + swAdd(w.pips) : "") : swCode(w.pips));
export const composeWeaponRow = (w: SwWeaponRow) => `${w.name} (damage ${weaponRowDamage(w)}${w.special ? "; " + w.special : ""})`;
export function composeForceLine(f: SwCharBuild["force"]): string {
  const parts = SW_FORCE_KEYS.filter((k) => f[k] != null).map((k) => `${k} ${swCode(f[k] as number)}`);
  return parts.length ? `Force skills: ${parts.join(", ")}` : "";
}
export const composeMove = (m: SwMove) => (m.mode === "code" ? `Speed Code ${swCode(m.pips)}` : m.mode === "text" ? m.text : "");
export function composeChar(b: SwCharBuild) {
  const attributes: Record<string, number> = {};
  for (const a of SW_ATTRS) { const p = b.attrs[a]; if (p != null) attributes[a] = p; }
  const fl = composeForceLine(b.force);
  const skills = [...b.skills.filter((r) => r.name).map(composeSkill), ...(fl ? [fl] : [])];
  const equipment = [...b.weapons.filter((w) => w.name).map(composeWeaponRow), ...b.gear.filter(Boolean)];
  const out: Record<string, unknown> = { attributes, skills, equipment };
  const mv = composeMove(b.move); if (mv) out.move = mv;
  if (b.fp) out.forcePoints = b.fp;
  if (b.dsp) out.darkSidePoints = b.dsp;
  return out;
}
export function parseSkill(t: string): SwSkillRow {
  const m = /^(.+?) (\d+D(?:\+\d)?)(?: \((.+)\))?$/.exec(t);
  if (m) { const r: SwSkillRow = { name: m[1], pips: swParseCode(m[2]), note: m[3] ?? "" }; if (composeSkill(r) === t) return r; }
  return { name: t, pips: null, note: "" };
}
export function parseWeaponRow(t: string): SwWeaponRow | null {
  const m = /^(.+?) \(damage (STR)?(?:\+?(\d+D(?:\+\d)?|\d))?(?:; (.+))?\)$/.exec(t);
  if (!m || (!m[2] && !m[3])) return null;
  const w: SwWeaponRow = { name: m[1], str: !!m[2], pips: m[3] ? (/D/.test(m[3]) ? swParseCode(m[3]) ?? 0 : int(m[3])) : 0, skill: "", special: m[4] ?? "" };
  return composeWeaponRow(w) === t ? w : null;
}
export function charBuildFrom(d: Record<string, unknown>): SwCharBuild {
  if (d.build && typeof d.build === "object") return cleanCharBuild(d.build);
  const A = (d.attributes ?? {}) as Record<string, unknown>;
  const attrs: SwCharBuild["attrs"] = {};
  for (const a of SW_ATTRS) attrs[a] = typeof A[a] === "number" ? (A[a] as number) : null;
  const lines = Array.isArray(d.skills) ? (d.skills as unknown[]).map(s).filter(Boolean) : [];
  const force: SwCharBuild["force"] = {};
  const last = lines[lines.length - 1] ?? "";
  const fm = /^Force skills: (.+)$/.exec(last);
  if (fm) {
    const ok = fm[1].split(", ").every((p) => { const m = /^(Control|Sense|Alter) (\d+D(?:\+\d)?)$/.exec(p); if (m) force[m[1] as SwForceKey] = swParseCode(m[2]); return !!m; });
    if (ok && composeForceLine(force) === last) lines.pop(); else for (const k of SW_FORCE_KEYS) delete force[k];
  }
  const eq = Array.isArray(d.equipment) ? (d.equipment as unknown[]).map(s).filter(Boolean) : [];
  const weapons: SwWeaponRow[] = [], gear: string[] = [];
  // Weapon rows lead the composed list, so only a leading run of "X (damage 4D)" lines becomes rows (order is kept).
  let lead = true;
  for (const e of eq) { const w = lead ? parseWeaponRow(e) : null; if (w) weapons.push(w); else { lead = false; gear.push(e); } }
  const mv = s(d.move), mm = /^Speed Code (\d+D(?:\+\d)?)$/.exec(mv);
  const move: SwMove = !mv ? { mode: "none", pips: 6, text: "" } : mm ? { mode: "code", pips: swParseCode(mm[1]) ?? 6, text: "" } : { mode: "text", pips: 6, text: mv };
  return { attrs, move, skills: lines.map(parseSkill), force, fp: clamp(int(d.forcePoints), 0, 99), dsp: clamp(int(d.darkSidePoints), 0, 99), weapons, gear };
}
export function cleanCharBuild(v: unknown): SwCharBuild {
  const o = (v ?? {}) as Record<string, unknown>;
  const A = (o.attrs ?? {}) as Record<string, unknown>;
  const attrs: SwCharBuild["attrs"] = {};
  for (const a of SW_ATTRS) attrs[a] = nint(A[a], 0, 90);
  const F = (o.force ?? {}) as Record<string, unknown>;
  const force: SwCharBuild["force"] = {};
  for (const k of SW_FORCE_KEYS) { const p = nint(F[k], 0, 90); if (p != null) force[k] = p; }
  const mv = (o.move ?? {}) as Record<string, unknown>;
  const list = (x: unknown) => (Array.isArray(x) ? (x as unknown[]) : []);
  return {
    attrs,
    move: { mode: oneOf(mv.mode, ["none", "code", "text"] as const, "none"), pips: clamp(int(mv.pips, 6), 0, 90), text: s(mv.text).slice(0, 80) },
    skills: list(o.skills).slice(0, 60).map((r) => { const x = (r ?? {}) as Record<string, unknown>; return { name: s(x.name).slice(0, 120), pips: nint(x.pips, 0, 90), note: s(x.note).slice(0, 80) }; }).filter((r) => r.name),
    force, fp: clamp(int(o.fp), 0, 99), dsp: clamp(int(o.dsp), 0, 99),
    weapons: list(o.weapons).slice(0, 20).map((r) => { const x = (r ?? {}) as Record<string, unknown>; return { name: s(x.name).slice(0, 80), str: x.str === true, pips: clamp(int(x.pips), 0, 120), skill: s(x.skill).slice(0, 60), special: s(x.special).slice(0, 100) }; }).filter((r) => r.name),
    gear: list(o.gear).map(s).filter(Boolean).slice(0, 40).map((g) => g.slice(0, 200)),
  };
}
/** Sum of attribute pips and the skill dice added above their attributes (WEG creation: 18D attributes, 7D skills). */
export function charTotals(b: SwCharBuild, skillAttr: (name: string) => SwAttr | null) {
  const attrPips = SW_ATTRS.reduce((n, a) => n + (b.attrs[a] ?? 0), 0);
  let skillPips = 0;
  for (const r of b.skills) { if (r.pips == null) continue; const a = skillAttr(r.name); if (a) skillPips += Math.max(0, r.pips - (b.attrs[a] ?? 0)); }
  return { attrPips, skillPips };
}
