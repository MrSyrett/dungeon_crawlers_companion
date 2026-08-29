// Die-code helpers for Star Wars D6 — pips ↔ "3D+2". Mirrors the sheet's
// toCode/fromCode so server pages and the HTML tools agree.
export function toCode(pips: number, signed = false): string {
  pips = Math.round(pips); const neg = pips < 0; pips = Math.abs(pips);
  const d = Math.floor(pips / 3), p = pips % 3;
  let s = d ? `${d}D${p ? "+" + p : ""}` : p ? `+${p}` : "0D";
  if (neg) s = "-" + s.replace(/^\+/, ""); else if (signed && pips && d) s = "+" + s;
  return s;
}
export function fromCode(str: string): number | null {
  const s = String(str ?? "").replace(/\s+/g, "").toUpperCase(); if (!s) return null;
  const m = /^([+-])?(?:(\d+)D)?(?:\+?(\d+))?$/.exec(s); if (!m || (m[2] === undefined && m[3] === undefined)) return null;
  const pips = Number(m[2] ?? 0) * 3 + Number(m[3] ?? 0); return m[1] === "-" ? -pips : pips;
}
