// ── ALIEN RPG (Year Zero Engine, key "yze") homebrew rules — pure ────────────
// Shared by the components/hb/yze/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree. Alien only:
// The Walking Dead, Mutant: Year Zero and Vaesen have their own types and code.
//
// Free League's ALIEN RPG (Evolved Edition) vocabulary, as the site's data has
// it (public/tools-data/yze-alien-data.js): twelve skills; weapons carry a gear
// bonus (extra base dice), base damage, a range span over Engaged/Adjacent ·
// Short · Medium · Long · Extreme, a class (Pistol, Rifle, Heavy, Close Combat),
// an ammo / power supply rating, special features (armor piercing, full auto…),
// a $ cost and a weight (—, ¼, ½, 1, 2…). Suits have an Armor Rating and an Air
// Supply; gear gives "+N to a skill" (Comtech +2) and may run on Power N.
//
// Storage stays in the book shapes every consumer reads (the sheet's Item
// Store, /yze/gear):
//   yze-weapon · name, class, skill, grip (legacy, kept), bonus ("+2" | "−1" |
//                ""), damage, range ("Short–Long"), ammo ("3" | "Power 2" |
//                "Single-shot" | "Single use" | "—"), special ("Armor piercing,
//                full auto; note"), cost ("$1,200"), weight, desc.
//                The builder parses these back; nothing extra is stored.
//   yze-gear   · name, weight, desc (as before) + kind ("gear" | "armor"),
//                category, cost, supply ("Power 5"), skillBonus [{skill,
//                amount}], text, and for armor rating + air ("—" | "4").
//                desc is COMPOSED from text + skillBonus in the book's wording
//                ("Troubleshoot computer systems (Comtech +2)."). A legacy
//                record has no `text`: its desc is parsed back (bonuses only
//                when the parse re-composes byte-identical), so it re-saves
//                unchanged.
// The character sheet (yze_character_sheet.html) copies skillBonus onto the
// inventory row; while the row is equipped ("in use") the bonus dice join every
// roll of that skill (skill rolls, Action-tab cards and weapon attacks).

export const ALIEN_SKILLS = [
  "Heavy Machinery", "Close Combat", "Stamina", "Mobility", "Ranged Combat", "Piloting",
  "Observation", "Comtech", "Survival", "Command", "Manipulation", "Medical Aid",
] as const;
export const SKILL_ATTR: Record<string, string> = {
  "Heavy Machinery": "STR", "Close Combat": "STR", Stamina: "STR", Mobility: "AGI", "Ranged Combat": "AGI", Piloting: "AGI",
  Observation: "WITS", Comtech: "WITS", Survival: "WITS", Command: "EMP", Manipulation: "EMP", "Medical Aid": "EMP",
};
export const WEAPON_SKILLS = ["Close Combat", "Ranged Combat"] as const;
/** Legacy (generic YZE) weapon skills → the Alien skill they roll. */
export const LEGACY_SKILL: Record<string, string> = { Melee: "Close Combat", Marksmanship: "Ranged Combat", Mobility: "Ranged Combat" };
export const WEAPON_CLASSES = ["Pistol", "Rifle", "Heavy", "Close Combat"] as const;
export const skillForClass = (cls: string) => (cls === "Close Combat" ? "Close Combat" : "Ranged Combat");

export const RANGE_BANDS = ["Engaged", "Short", "Medium", "Long", "Extreme"] as const;
export type CloseWord = "Engaged" | "Adjacent";
export const FEATURES = [
  "Armor piercing", "Full auto", "Stun", "Fire effect", "Explosive", "Aim needed",
  "Unreliable", "Smart sight", "Grenade launcher", "Harpoon effect", "Automation",
] as const;
export const WEIGHTS = ["—", "¼", "½", "1", "2", "3", "4"] as const;
export const GEAR_CATEGORIES = [
  "Comms & Diagnostics", "Vision Devices", "Tools", "Medical Supplies", "Pharmaceuticals",
  "Food & Drink", "Data Storage", "Computer Mainframes",
] as const;

const int = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v.replace(/[−–]/g, "-")) : NaN;
  return Number.isFinite(n) ? Math.round(n) : null;
};
const clampN = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// ── Gear bonus ("+2", "−1"; 0 = "") ─────────────────────────────────────────
export function fmtBonus(n: number | null): string {
  if (!n) return "";
  return n > 0 ? `+${n}` : `−${-n}`;
}
/** "+2" / "2" / "−1" / "-1" → number; "" / "—" → 0; anything else → null. */
export function parseBonus(s: string): number | null {
  const t = s.trim();
  if (!t || t === "—" || t === "-") return 0;
  const m = /^([+\-−–]?)\s*(\d{1,2})$/.exec(t);
  if (!m) return null;
  const n = Number(m[2]);
  return m[1] && m[1] !== "+" ? -n : n;
}

// ── Range span ("Short–Long", "Adjacent") ───────────────────────────────────
export type RangeSpan = { min: number; max: number; word: CloseWord };
export const bandName = (i: number, word: CloseWord) => (i === 0 ? word : RANGE_BANDS[i]);
export function composeRange(r: RangeSpan): string {
  const lo = clampN(Math.min(r.min, r.max), 0, 4), hi = clampN(Math.max(r.min, r.max), 0, 4);
  return lo === hi ? bandName(lo, r.word) : `${bandName(lo, r.word)}–${bandName(hi, r.word)}`;
}
export function parseRange(s: string): RangeSpan | null {
  const parts = s.trim().split(/\s*(?:–|-|\bto\b)\s*/i).filter(Boolean);
  if (!parts.length || parts.length > 2) return null;
  let word: CloseWord = "Engaged";
  const idx = parts.map((p) => {
    const t = p.toLowerCase();
    if (t === "adjacent") { word = "Adjacent"; return 0; }
    return RANGE_BANDS.findIndex((b) => b.toLowerCase() === t);
  });
  if (idx.some((i) => i < 0)) return null;
  const span = { min: idx[0], max: idx[idx.length - 1], word };
  return composeRange(span) === s.trim() ? span : null;
}

// ── Ammo / power supply ─────────────────────────────────────────────────────
export type AmmoKind = "none" | "ammo" | "power" | "single-shot" | "single-use";
export type Ammo = { kind: AmmoKind; n: number };
export function composeAmmo(a: Ammo): string {
  const n = clampN(a.n || 1, 1, 10);
  switch (a.kind) {
    case "ammo": return String(n);
    case "power": return `Power ${n}`;
    case "single-shot": return "Single-shot";
    case "single-use": return "Single use";
    default: return "—";
  }
}
export function parseAmmo(s: string): Ammo | null {
  const t = s.trim();
  if (!t || t === "—" || t === "-") return { kind: "none", n: 1 };
  if (/^\d{1,2}$/.test(t)) return { kind: "ammo", n: Number(t) };
  const p = /^power\s+(\d{1,2})$/i.exec(t);
  if (p) return { kind: "power", n: Number(p[1]) };
  if (/^single[- ]shot$/i.test(t)) return { kind: "single-shot", n: 1 };
  if (/^single[- ]use$/i.test(t)) return { kind: "single-use", n: 1 };
  return null;
}

// ── Special features ("Armor piercing, full auto; can fire smoke") ──────────
const lowerFirst = (t: string) => (t.length > 1 && /[a-z]/.test(t[1]) ? t[0].toLowerCase() + t.slice(1) : t);
const upperFirst = (t: string) => (t ? t[0].toUpperCase() + t.slice(1) : t);
export function composeSpecial(features: string[], note: string): string {
  const f = features.map((x) => x.trim()).filter(Boolean).map((x, i) => (i ? lowerFirst(x) : upperFirst(x))).join(", ");
  const n = note.trim();
  return f && n ? `${f}; ${n}` : f || n;
}
/** Split a special string into feature chips + a trailing note. Known features
 *  come back in their canonical spelling; unknown comma items become custom
 *  chips. Returns null when the split would not re-compose to the same text. */
export function parseSpecial(s: string): { features: string[]; note: string } | null {
  const t = s.trim();
  if (!t || t === "—") return { features: [], note: "" };
  const semi = t.indexOf(";");
  const head = semi >= 0 ? t.slice(0, semi) : t;
  const note = semi >= 0 ? t.slice(semi + 1).trim() : "";
  const features = head.split(",").map((x) => x.trim()).filter(Boolean).map((x) => FEATURES.find((f) => f.toLowerCase() === x.toLowerCase()) ?? upperFirst(x));
  const out = { features, note };
  return composeSpecial(features, note) === t ? out : null;
}

// ── Cost ("$1,200") ─────────────────────────────────────────────────────────
export const fmtCost = (n: number | null) => (n == null ? "" : `$${n.toLocaleString("en-US")}`);
export function parseCost(s: string): number | null {
  const m = /^\$\s?([\d,]{1,12})$/.exec(s.trim());
  return m ? Number(m[1].replace(/,/g, "")) : null;
}

// ── Skill bonuses ───────────────────────────────────────────────────────────
export type SkillBonus = { skill: string; amount: number };
export function cleanSkillBonus(v: unknown): SkillBonus[] {
  if (!Array.isArray(v)) return [];
  const out: SkillBonus[] = [];
  for (const x of v.slice(0, 8)) {
    const o = (x ?? {}) as Record<string, unknown>;
    const skill = typeof o.skill === "string" ? ALIEN_SKILLS.find((s) => s.toLowerCase() === o.skill!.toString().trim().toLowerCase()) : undefined;
    const n = int(o.amount);
    if (!skill || n == null || n === 0) continue;
    out.push({ skill, amount: clampN(n, -3, 3) });
  }
  return out;
}
const signedN = (n: number) => (n > 0 ? `+${n}` : `−${-n}`);
/** "Comtech +2, Observation −1". */
export const fmtSkillBonus = (b: SkillBonus[]) => b.map((x) => `${x.skill} ${signedN(x.amount)}`).join(", ");

/** desc = text with the bonuses in brackets, before a closing full stop when
 *  there is one: "Record and play music (Manipulation +1)." */
export function composeGearDesc(text: string, bonuses: SkillBonus[]): string {
  const t = text.trim();
  if (!bonuses.length) return t;
  const b = `(${fmtSkillBonus(bonuses)})`;
  if (!t) return b;
  return t.endsWith(".") ? `${t.slice(0, -1)} ${b}.` : `${t} ${b}`;
}
/** Legacy desc → text + bonuses; bonuses only when it re-composes exactly. */
export function parseGearDesc(desc: string): { text: string; bonuses: SkillBonus[] } {
  const d = desc.trim();
  const m = /^([\s\S]*?)\s*\(([^()]+)\)(\.?)$/.exec(d);
  if (m) {
    const items = m[2].split(",").map((x) => x.trim());
    const bonuses: SkillBonus[] = [];
    for (const it of items) {
      const p = /^(.+?)\s+([+\-−])(\d)$/.exec(it);
      const skill = p ? ALIEN_SKILLS.find((s) => s === p[1]) : undefined;
      if (!p || !skill) { bonuses.length = 0; break; }
      bonuses.push({ skill, amount: (p[2] === "+" ? 1 : -1) * Number(p[3]) });
    }
    if (bonuses.length) {
      const text = m[1] + m[3];
      if (composeGearDesc(text, bonuses) === d) return { text, bonuses };
    }
  }
  return { text: desc, bonuses: [] };
}

// ── Armor ───────────────────────────────────────────────────────────────────
export const fmtAir = (n: number | null) => (n ? String(n) : "—");
export function parseAir(v: unknown): number | null {
  const n = int(v);
  return n && n > 0 ? clampN(n, 1, 10) : null;
}
export function parseSupply(v: unknown): number | null {
  const m = /(\d{1,2})/.exec(String(v ?? ""));
  return m && Number(m[1]) > 0 ? clampN(Number(m[1]), 1, 10) : null;
}
export const fmtSupply = (n: number | null) => (n ? `Power ${n}` : "");
