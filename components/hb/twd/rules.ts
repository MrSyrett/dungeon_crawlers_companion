// ── THE WALKING DEAD UNIVERSE RPG (key "twd") homebrew rules — pure ─────────
// Shared by the components/hb/twd/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree. TWD only: the
// sibling Year Zero Engine games (Alien "yze", MYZ, Vaesen) have their own code.
//
// Free League's TWD Universe RPG vocabulary, as the site's data has it
// (lib/data/twd-data.ts): twelve skills; weapons are Close or Ranged, with a
// gear BONUS (extra base dice), DAMAGE (or Blast Power "BP 8" for explosives),
// a range category (Close · Short · Long · Extreme) and SLOTS of encumbrance
// (—, ½, 1, 2, 3 · carry limit Strength + 2). Armor has an Armor Level (dice
// rolled when hit) and a Mobility penalty. Gear grants "+N to a skill" (Scout
// +2); only one item's bonus counts on a given roll.
//
// Storage stays in the book shapes every consumer reads (/twd/gear, the sheet's
// pickers via public/tools-data/twd-homebrew.js):
//   twd-weapon · name, kind ("Close" | "Ranged"), bonus ("+2" | "0" | "−1"),
//                damage (number | "BP 8"), range, slots, desc (as before)
//                + ammo ("Bullets" | "Arrows (12)" | "Single use"; omitted when
//                none), noise ("Quiet" | "Loud" | "Silenced"; omitted when
//                unset), features (["Two-handed", "Thrown"…]; omitted when none).
//   twd-gear   · name, slots, bonus, desc (as before) + kind ("gear" | "armor"),
//                skillBonus [{skill, amount}], and for armor level (Armor Level)
//                + penalty ("−2" Mobility, book style; "0" = none).
//                bonus is COMPOSED from skillBonus ("Scout +2, Survival +1"); a
//                legacy record whose bonus text doesn't parse keeps it as typed.
// The sheet (twd_character_sheet.html) copies skillBonus onto the inventory row;
// while that row is "in use" its best bonus joins the skill's rolls.

export const TWD_SKILLS = [
  "Close Combat", "Endure", "Force", "Mobility", "Ranged Combat", "Stealth",
  "Scout", "Survival", "Tech", "Leadership", "Manipulation", "Medicine",
] as const;
export const SKILL_ATTR: Record<string, string> = {
  "Close Combat": "STR", Endure: "STR", Force: "STR", Mobility: "AGI", "Ranged Combat": "AGI", Stealth: "AGI",
  Scout: "WITS", Survival: "WITS", Tech: "WITS", Leadership: "EMP", Manipulation: "EMP", Medicine: "EMP",
};
export const WEAPON_KINDS = ["Close", "Ranged"] as const;
export type WeaponKind = (typeof WEAPON_KINDS)[number];
export const skillForKind = (k: string) => (k === "Ranged" ? "Ranged Combat" : "Close Combat");
export const RANGES = ["Close", "Short", "Long", "Extreme"] as const;
/** Encumbrance slots: — = tiny/free, X = can't be carried (vehicle-mounted). */
export const SLOTS = ["—", "½", "1", "2", "3", "4", "X"] as const;
export const NOISES = ["Quiet", "Loud", "Silenced"] as const;
export const FEATURES = [
  "Two-handed", "Thrown", "Automatic fire", "Scope", "Fire", "Blunt", "Edged",
  "Improvised", "Slow reload", "Unreliable", "Concealable",
] as const;
export const AMMO_TYPES = ["Bullets", "Shells", "Arrows", "Bolts", "Fuel", "Rockets"] as const;

const int = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v.replace(/[−–]/g, "-")) : NaN;
  return Number.isFinite(n) ? Math.round(n) : null;
};
const clampN = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// ── Gear bonus ("+2", "0", "−1" — the book writes "0" for none) ─────────────
export const fmtBonus = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "0");
/** "+2" / "2" / "−1" / "0" / "" / "—" → number; anything else → null. */
export function parseBonus(s: string): number | null {
  const t = s.trim();
  if (!t || t === "—" || t === "-") return 0;
  const m = /^([+\-−–]?)\s*(\d{1,2})$/.exec(t);
  if (!m) return null;
  const n = Number(m[2]);
  return m[1] && m[1] !== "+" ? -n : n;
}

// ── Damage (base damage, or Blast Power for explosives) ─────────────────────
export type Damage = { blast: boolean; n: number };
export const composeDamage = (d: Damage): number | string => (d.blast ? `BP ${clampN(d.n, 1, 20)}` : clampN(d.n, 0, 10));
export function parseDamage(v: unknown): Damage | null {
  if (typeof v === "number" && Number.isFinite(v)) return { blast: false, n: clampN(Math.round(v), 0, 10) };
  const t = String(v ?? "").trim();
  const bp = /^BP\s*(\d{1,2})$/i.exec(t);
  if (bp) return { blast: true, n: clampN(Number(bp[1]), 1, 20) };
  if (/^\d{1,2}$/.test(t)) return { blast: false, n: clampN(Number(t), 0, 10) };
  return null;
}

// ── Ammo ("—" | "Bullets" | "Arrows (12)" | "Single use") ───────────────────
export type Ammo = { kind: "none" | "ammo" | "single"; type: string; n: number | null };
export function composeAmmo(a: Ammo): string {
  if (a.kind === "single") return "Single use";
  if (a.kind !== "ammo") return "";
  const t = a.type.trim().slice(0, 20) || "Bullets";
  return a.n ? `${t} (${clampN(a.n, 1, 99)})` : t;
}
export function parseAmmo(s: string): Ammo | null {
  const t = s.trim();
  if (!t || t === "—" || t === "-") return { kind: "none", type: "Bullets", n: null };
  if (/^single[- ]use$/i.test(t)) return { kind: "single", type: "Bullets", n: null };
  const m = /^([A-Za-z][A-Za-z ]{0,19}?)(?:\s*\((\d{1,2})\))?$/.exec(t);
  if (!m) return null;
  const a: Ammo = { kind: "ammo", type: m[1], n: m[2] ? Number(m[2]) : null };
  return composeAmmo(a) === t ? a : null;
}

// ── Armor Mobility penalty ("−2"; "0" = none) ───────────────────────────────
export const fmtPenalty = (n: number) => (n > 0 ? `−${n}` : "0");
export function parsePenalty(v: unknown): number {
  const m = /(\d{1,2})/.exec(String(v ?? ""));
  return m ? clampN(Number(m[1]), 0, 5) : 0;
}

// ── Skill bonuses ("Scout +2, Survival +1") ─────────────────────────────────
export type SkillBonus = { skill: string; amount: number };
export function cleanSkillBonus(v: unknown): SkillBonus[] {
  if (!Array.isArray(v)) return [];
  const out: SkillBonus[] = [];
  for (const x of v.slice(0, 6)) {
    const o = (x ?? {}) as Record<string, unknown>;
    const skill = typeof o.skill === "string" ? TWD_SKILLS.find((s) => s.toLowerCase() === String(o.skill).trim().toLowerCase()) : undefined;
    const n = int(o.amount);
    if (!skill || n == null || n === 0) continue;
    out.push({ skill, amount: clampN(n, -3, 3) });
  }
  return out;
}
const signedN = (n: number) => (n > 0 ? `+${n}` : `−${-n}`);
export const fmtSkillBonus = (b: SkillBonus[]) => b.map((x) => `${x.skill} ${signedN(x.amount)}`).join(", ");
/** Legacy bonus text → bonuses, only when it re-composes exactly; else null. */
export function parseSkillBonus(s: string): SkillBonus[] | null {
  const t = s.trim();
  if (!t || t === "—") return [];
  const out: SkillBonus[] = [];
  for (const it of t.split(",").map((x) => x.trim())) {
    const p = /^(.+?)\s+([+\-−])(\d)$/.exec(it);
    const skill = p ? TWD_SKILLS.find((k) => k === p[1]) : undefined;
    if (!p || !skill) return null;
    out.push({ skill, amount: (p[2] === "+" ? 1 : -1) * Number(p[3]) });
  }
  return fmtSkillBonus(out) === t ? out : null;
}
