// ── Homebrew builder kit · dice helpers (pure, no React) ─────────────────────
// Safe to import from server code (lib/homebrew.ts normalisers) AND from the
// "use client" builders, so the client preview and the stored string agree.
//
//   type Dice = { n, d, m }        n dice of size d, plus flat m.
//                                   n = 0 → no dice (m alone is a flat value).
//                                   d = 0 → "flat count" (n is a plain number,
//                                   e.g. a duration of "5 rounds").
//   formatDice({n:2,d:6,m:1})        → "2d6+1"
//   formatDice(x, { spaced: true })  → "2d6 + 1"   (book stat-block style)
//   parseDice("1d8 + 2")             → {n:1,d:8,m:2}   (null when not dice)
//   cleanDice(raw, opts)             → clamped Dice (server-side validator)
//   STANDARD_DICE                    → [4, 6, 8, 10, 12, 20]

export type Dice = { n: number; d: number; m: number };

export const STANDARD_DICE = [4, 6, 8, 10, 12, 20];

export const noDice = (): Dice => ({ n: 0, d: 6, m: 0 });

const int = (v: unknown, dflt = 0): number => {
  const n = parseInt(String(v ?? "").replace(/\s+/g, ""), 10);
  return Number.isFinite(n) ? n : dflt;
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** True when the Dice says nothing (no dice, no flat value). */
export function isEmptyDice(x: Dice | null | undefined): boolean {
  return !x || (x.n <= 0 && !x.m);
}

/** "2d6+1" / "2d6 + 1" / "3" (flat) / "" (empty). d = 0 renders n as a plain number. */
export function formatDice(x: Dice | null | undefined, opts: { spaced?: boolean } = {}): string {
  if (!x) return "";
  const sp = opts.spaced ? " " : "";
  if (x.d === 0) return x.n > 0 ? String(x.n) : "";
  const base = x.n > 0 ? `${x.n}d${x.d}` : "";
  if (!x.m) return base;
  if (!base) return String(x.m);
  return `${base}${sp}${x.m > 0 ? "+" : "-"}${sp}${Math.abs(x.m)}`;
}

/** Parse "NdX", "NdX+M", "dX", "N" (flat). Returns null for anything else. */
export function parseDice(raw: string): Dice | null {
  const t = String(raw ?? "").trim();
  let m = t.match(/^(\d*)\s*d\s*(\d+)\s*(?:([+-])\s*(\d+))?$/i);
  if (m) return { n: m[1] ? int(m[1]) : 1, d: int(m[2]), m: m[3] ? (m[3] === "-" ? -1 : 1) * int(m[4]) : 0 };
  m = t.match(/^([+-]?\d+)$/);
  if (m) return { n: 0, d: 6, m: int(m[1]) };
  return null;
}

/** Server-side validator: coerce anything into a bounded Dice. */
export function cleanDice(
  raw: unknown,
  opts: { maxCount?: number; dice?: number[]; minMod?: number; maxMod?: number; allowFlat?: boolean } = {},
): Dice {
  const o = (raw ?? {}) as Record<string, unknown>;
  const dice = opts.dice ?? STANDARD_DICE;
  let d = int(o.d, dice[0]);
  if (!(opts.allowFlat && d === 0) && !dice.includes(d)) d = clamp(d, 2, 100);
  return {
    n: clamp(int(o.n), 0, opts.maxCount ?? 20),
    d,
    m: clamp(int(o.m), opts.minMod ?? -99, opts.maxMod ?? 99),
  };
}
