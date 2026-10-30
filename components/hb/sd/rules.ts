// ── Shadowdark homebrew rules (pure, no React, no prisma) ────────────────────
// Imported by the SD builders (components/hb/sd/*) for live previews AND by the
// server normalisers (lib/homebrew.ts) so the stored legacy strings — the ones
// the GM Screen, session-prep builder, /bestiary and the SD sheet read — are
// always composed the same way from the structured builder data.
//
// Monster attacks  ⇄  the SD_MONSTERS `atk` string
//   "2 claw +4 (1d8) or 1 bite (near) +3 (2d6 + poison)"
//   composeSdAttacks(rows) / parseSdAttacks(atk) / cleanSdAttackRows(raw)
// Movement  ⇄  "double near (fly, swim)"   composeSdMove / parseSdMove
// Traits    ⇄  "Name: text. Name: text."   composeSdTraits / parseSdTraits
// Monster HP from level: floor(LV × 4.5) + CON mod (min 1) — matches the book.
// Spell duration ⇄ "Instant" | "Focus" | "5 rounds" | "1d8 days" | …
import { cleanDice, formatDice, parseDice, type Dice } from "../dice";
import type { AttackRow } from "../AttackRows";

export const SD_DICE = [4, 6, 8, 10, 12, 20];
export const SD_ATTACK_RANGES = ["Close", "Near", "Far", "Close/Near", "Close/Far", "Double near"];
export const SD_ALIGNMENTS: [string, string][] = [["L", "Lawful"], ["N", "Neutral"], ["C", "Chaotic"]];
export const SD_STATS: [string, string][] = [["s", "STR"], ["d", "DEX"], ["c", "CON"], ["i", "INT"], ["w", "WIS"], ["ch", "CHA"]];
export const SD_MOD_MIN = -5;
export const SD_MOD_MAX = 10;

const int = (v: unknown, dflt = 0) => {
  const n = parseInt(String(v ?? "").replace(/^\+/, ""), 10);
  return Number.isFinite(n) ? n : dflt;
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const signed = (n: number) => (n >= 0 ? "+" : "") + n;
const titleCase = (s: string) => s.split("/").map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("/");

// ── Attacks ──────────────────────────────────────────────────────────────────
// Text that would break the GM Screen's attack parser (it splits on " or " /
// " and " and reads the parenthesised group) is softened, never dropped.
const soften = (s: string) =>
  String(s ?? "").replace(/[()]/g, "").replace(/\s+or\s+/gi, " / ").replace(/\s+and\s+/gi, " & ").replace(/\s+/g, " ").trim();

/** One attack → "2 claw (near) +4 (1d8 + grab)". A row with no name is legacy raw text (special verbatim). */
export function composeSdAttack(a: AttackRow): string {
  const name = soften(a.name);
  if (!name) return String(a.special ?? "").trim();
  const parts = [`${Math.max(1, a.count || 1)} ${name}`];
  const range = a.range && a.range !== "Close" ? a.range.toLowerCase() : "";
  if (range) parts.push(`(${range})`);
  if (a.hit != null) parts.push(signed(a.hit));
  const dmg = formatDice(a.dice, { spaced: true });
  const special = soften(a.special);
  const inner = [dmg, special].filter(Boolean).join(dmg ? " + " : "");
  if (inner) parts.push(`(${inner})`);
  return parts.join(" ");
}

/** All rows joined the book's way; row i>0 carries extra.join = "or" | "and". */
export function composeSdAttacks(rows: AttackRow[]): string {
  let out = "";
  rows.forEach((r) => {
    const t = composeSdAttack(r);
    if (!t) return;
    out += out ? ` ${r.extra?.join === "and" ? "and" : "or"} ${t}` : t;
  });
  return out;
}

const RANGE_RE = /^(?:double near|(close|near|far)(\/(close|near|far))?)$/i;

function parseDamageGroup(g: string): { dice: Dice; special: string } {
  const t = g.trim();
  let m = t.match(/^(\d+)d(\d+)(?:\s*([+-])\s*(\d+)(?![\dd]))?\s*(?:[,+]\s*(.+))?$/i);
  if (m) return { dice: { n: int(m[1]), d: int(m[2]), m: m[3] ? (m[3] === "-" ? -1 : 1) * int(m[4]) : 0 }, special: (m[5] ?? "").trim() };
  m = t.match(/^(\d+)(?:\s*[,+]\s*(.+))?$/);
  if (m) return { dice: { n: 0, d: 6, m: int(m[1]) }, special: (m[2] ?? "").trim() };
  return { dice: { n: 0, d: 6, m: 0 }, special: t };
}

/** One "N name (range) +H (dmg)" chunk → row; anything unreadable → { name: "", special: text }. */
export function parseSdAttack(text: string): AttackRow {
  const t = text.trim();
  const m = t.match(/^(?:(\d+)\s+)?([A-Za-z][\w' \-/]*?)\s*(?:\(([^)]*)\))?\s*([+-]\s*\d+)?\s*(?:\(([^)]*)\))?\s*$/);
  if (!m) return { name: "", count: 1, hit: null, dice: { n: 0, d: 6, m: 0 }, range: "Close", special: t };
  let range = "Close";
  let dmgGroup = m[5];
  if (m[3] != null) {
    if (RANGE_RE.test(m[3].trim())) range = titleCase(m[3].trim());
    else if (dmgGroup == null && m[4] == null) dmgGroup = m[3];
    else return { name: "", count: 1, hit: null, dice: { n: 0, d: 6, m: 0 }, range: "Close", special: t };
  }
  const dg = dmgGroup != null ? parseDamageGroup(dmgGroup) : { dice: { n: 0, d: 6, m: 0 }, special: "" };
  return {
    name: m[2].trim(),
    count: m[1] ? int(m[1], 1) : 1,
    hit: m[4] != null ? int(m[4].replace(/\s+/g, "")) : null,
    dice: dg.dice,
    range,
    special: dg.special,
  };
}

/** Legacy `atk` text → rows (best effort; lossless — unparsed text stays in special). */
export function parseSdAttacks(atk: string): AttackRow[] {
  const s = String(atk ?? "").trim();
  if (!s) return [];
  const bits = s.split(/\s+(or|and)\s+/i);
  const rows: AttackRow[] = [];
  for (let i = 0; i < bits.length; i += 2) {
    const r = parseSdAttack(bits[i]);
    if (i > 0) r.extra = { join: String(bits[i - 1]).toLowerCase() === "and" ? "and" : "or" };
    rows.push(r);
  }
  return rows;
}

/** Server-side validation of builder rows (clamped, trimmed, max 12). */
export function cleanSdAttackRows(raw: unknown): AttackRow[] {
  if (!Array.isArray(raw)) return [];
  return (raw as unknown[]).slice(0, 12).map((x, i) => {
    const o = (x ?? {}) as Record<string, unknown>;
    const ex = (o.extra ?? {}) as Record<string, unknown>;
    const range = SD_ATTACK_RANGES.includes(String(o.range)) ? String(o.range) : "Close";
    const row: AttackRow = {
      name: String(o.name ?? "").trim().slice(0, 60),
      count: clamp(int(o.count, 1), 1, 10),
      hit: o.hit == null || o.hit === "" ? null : clamp(int(o.hit), -10, 30),
      dice: cleanDice(o.dice, { maxCount: 20, dice: SD_DICE, minMod: -20, maxMod: 20 }),
      range,
      special: String(o.special ?? "").trim().slice(0, 160),
    };
    if (i > 0) row.extra = { join: ex.join === "and" ? "and" : "or" };
    return row;
  }).filter((r) => r.name || r.special);
}

// ── Movement ─────────────────────────────────────────────────────────────────
export const SD_MOVE_MULTS: [string, string][] = [["", "—"], ["double", "Double"], ["triple", "Triple"]];
export const SD_MOVE_DISTS: [string, string][] = [["close", "Close"], ["near", "Near"], ["far", "Far"], ["none", "None"]];
export const SD_MOVE_MODES = ["climb", "fly", "swim", "burrow", "teleport", "mount"];
export type SdMove = { mult: string; dist: string; modes: string[] };

export function composeSdMove(m: SdMove): string {
  if (m.dist === "none") return "none";
  const base = `${m.mult ? m.mult + " " : ""}${m.dist || "near"}`;
  const modes = m.modes.filter((x) => SD_MOVE_MODES.includes(x));
  return modes.length ? `${base} (${modes.join(", ")})` : base;
}

/** "double near (fly)" → parts; null when it isn't the book's grammar. */
export function parseSdMove(mv: string): SdMove | null {
  const t = String(mv ?? "").trim().toLowerCase();
  if (!t) return { mult: "", dist: "near", modes: [] };
  if (t === "none") return { mult: "", dist: "none", modes: [] };
  const m = t.match(/^(?:(double|triple)\s+)?(close|near|far)(?:\s*\(([a-z ,]+)\))?$/);
  if (!m) return null;
  const modes = (m[3] ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  if (modes.some((x) => !SD_MOVE_MODES.includes(x))) return null;
  return { mult: m[1] ?? "", dist: m[2], modes };
}

// ── Traits ───────────────────────────────────────────────────────────────────
export type SdTrait = { name: string; text: string };

/** Rows → "Name: text. Name: text." (the shape the GM Screen splits into lines). */
export function composeSdTraits(rows: SdTrait[]): string {
  return rows
    .map((r) => {
      const name = String(r.name ?? "").replace(/:/g, "").trim();
      let text = String(r.text ?? "").trim();
      if (text && !/[.!?]$/.test(text)) text += ".";
      return name ? `${name}: ${text}`.trim() : text;
    })
    .filter(Boolean)
    .join(" ");
}

/** Mirror of the GM Screen's splitTraits(): "Name: body." runs → rows. */
export function parseSdTraits(notes: string): SdTrait[] {
  const s = String(notes ?? "").trim();
  if (!s) return [];
  const re = /(^|\.\s+)((?:[A-Z][A-Za-z0-9'’\-]*[ ]){0,3}[A-Z][A-Za-z0-9'’\-]*)[ ]*:[ ]*/g;
  const marks: { start: number; bodyAt: number; name: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) marks.push({ start: m.index + m[1].length, bodyAt: m.index + m[0].length, name: m[2] });
  if (!marks.length) return [{ name: "", text: s }];
  const out: SdTrait[] = [];
  const pre = s.slice(0, marks[0].start).trim();
  if (pre) out.push({ name: "", text: pre });
  marks.forEach((mk, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : s.length;
    out.push({ name: mk.name, text: s.slice(mk.bodyAt, end).trim() });
  });
  return out;
}

// ── Monster numbers ──────────────────────────────────────────────────────────
/** The book's monster HP: LV d8 averaged (×4.5, rounded down) + CON mod, min 1. */
export const sdMonsterHp = (lv: number, con: number) => Math.max(1, Math.floor(Math.max(0, lv) * 4.5) + con);

export const sdMod = (v: unknown) => clamp(int(v), SD_MOD_MIN, SD_MOD_MAX);
export const sdModStr = (v: unknown) => signed(sdMod(v));

// ── Spells ───────────────────────────────────────────────────────────────────
/** Class spell lists a homebrew spell may also appear on (sheet spell-shop filters). */
export const SD_SPELL_LISTS = ["Wizard", "Priest", "Witch", "Druid", "Mage", "Sorcerer", "Necromancer", "Seer"];

// ── Spell duration ───────────────────────────────────────────────────────────
// kind: Instant | Focus | rounds | hours | days | weeks | years | Permanent | Indefinite | custom
export const SD_DURATION_KINDS: [string, string][] = [
  ["Instant", "Instant"], ["Focus", "Focus"], ["rounds", "Rounds"], ["hours", "Hours"], ["days", "Days"],
  ["weeks", "Weeks"], ["years", "Years"], ["Permanent", "Permanent"], ["Indefinite", "Indefinite"], ["custom", "Custom…"],
];
const TIMED = ["rounds", "hours", "days", "weeks", "years"];
export const isTimedDuration = (k: string) => TIMED.includes(k);
export type SdDuration = { kind: string; amount: Dice; text: string };

export function composeSdDuration(d: SdDuration): string {
  if (d.kind === "custom") return d.text.trim();
  if (!isTimedDuration(d.kind)) return d.kind;
  const amt = d.amount.d === 0 ? Math.max(1, d.amount.n) : null;
  const unit = amt === 1 ? d.kind.replace(/s$/, "") : d.kind;
  return `${amt ?? formatDice({ ...d.amount, n: Math.max(1, d.amount.n) })} ${unit}`;
}

export function parseSdDuration(s: string): SdDuration {
  const t = String(s ?? "").trim();
  const blank: Dice = { n: 1, d: 0, m: 0 };
  if (!t) return { kind: "Instant", amount: blank, text: "" };
  const fixed = SD_DURATION_KINDS.find(([k]) => !isTimedDuration(k) && k !== "custom" && k.toLowerCase() === t.toLowerCase());
  if (fixed) return { kind: fixed[0], amount: blank, text: "" };
  const m = t.match(/^(\S+)\s+(round|hour|day|week|year)s?$/i);
  if (m) {
    const n = m[1].match(/^\d+$/) ? { n: int(m[1]), d: 0, m: 0 } : parseDice(m[1]);
    if (n && (n.d === 0 || n.n > 0)) return { kind: m[2].toLowerCase() + "s", amount: { ...n, m: 0 }, text: "" };
  }
  return { kind: "custom", amount: blank, text: t };
}

// ── Weapon damage ────────────────────────────────────────────────────────────
/** "1d8" or versatile "1d8/1d10" (one-handed / two-handed). */
export function composeSdWeaponDamage(main: Dice, versatile: Dice | null): string {
  const a = formatDice(main) || "1";
  return versatile ? `${a}/${formatDice(versatile) || a}` : a;
}
export function parseSdWeaponDamage(s: string): { main: Dice; versatile: Dice | null } {
  const [a, b] = String(s ?? "").split("/").map((x) => x.trim());
  const main = parseDice(a ?? "") ?? { n: 1, d: 4, m: 0 };
  const vers = b ? parseDice(b) : null;
  return { main, versatile: vers };
}
