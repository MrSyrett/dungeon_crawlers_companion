// D62e die-code helpers (server-side twin of the sheet's helpers).
// Die codes are stored as pips: 1D = 3 pips, each +1 = 1 pip.
//   9 -> "3D",  11 -> "3D+2",  2 -> "+2",  0 -> "0D"

export function code(pips: number): string {
  const p = Math.round(Number(pips) || 0);
  const d = Math.floor(p / 3);
  const r = p % 3;
  if (d <= 0) return r ? `+${r}` : "0D";
  return `${d}D${r ? `+${r}` : ""}`;
}

/** Parse "3D+2" / "4D" / "+2" into pips. Returns 0 for empty/invalid. */
export function pips(codeStr: string): number {
  const s = String(codeStr ?? "").trim().toUpperCase().replace(/\s+/g, "");
  if (!s) return 0;
  const m = s.match(/^(\d+)D(?:\+(\d+))?$/);
  if (m) return parseInt(m[1], 10) * 3 + (m[2] ? parseInt(m[2], 10) : 0);
  const p = s.match(/^\+(\d+)$/);
  if (p) return parseInt(p[1], 10);
  const n = s.match(/^(\d+)$/);
  if (n) return parseInt(n[1], 10) * 3; // bare number = that many dice
  return 0;
}
