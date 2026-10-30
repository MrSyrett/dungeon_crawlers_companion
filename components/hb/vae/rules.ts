// ── VAESEN (key "vae") homebrew rules — pure ────────────────────────────────
// Shared by the components/hb/vae/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree. Vaesen only:
// the sibling Year Zero games (Alien "yze", TWD, MYZ) have their own code.
//
// Vaesen vocabulary (lib/data/vae-data.ts, core rulebook ch. 5–6): twelve
// skills under Physique / Precision / Logic / Empathy. Weapons are rolled with
// Close Combat, Ranged Combat or Force (the spear with either combat skill),
// with a BONUS ("+2" gear dice, "—" none, "-1" clumsy), DAMAGE (Conditions on a
// hit, +1 per extra success) and a RANGE counted in zones (0 = your own zone,
// "1-3" = one to three zones away). Prices are a COST 1–5, paid with Resources
// successes or Capital. Armor has Protection dice and an Agility penalty.
// Gear gives "+N" to the skill named in its use (Binoculars +2: Vigilance from
// a distance); only one item's bonus counts on a roll. Items of Power ward off
// vaesen magic ("+2 to resist Curses from trolls"); magic items have an effect
// and a risk.
//
// Storage keeps the shapes every consumer reads (/vae/gear, the sheet's Item
// Shop via public/tools-data/vae-homebrew.js):
//   vae-weapon · name, skill, bonus ("+2" | "0" | "-1" | "—"), damage (number),
//                range ("0" | "0-2"), cost ("3" | ""), desc (as before)
//                + features (["Thrown", "Two-handed"…]; omitted when none).
//   vae-gear   · name, bonus, cost, desc (as before) + kind ("gear" | "armor"
//                | "power" | "magic"), skillBonus [{skill, amount}];
//                armor: rating (Protection) + penalty (Agility, 0–3);
//                power / magic: effect, resist [{against, amount}], resistFrom
//                ("trolls"); magic: risk, consumable (true = used up).
//                bonus is COMPOSED from skillBonus ("Vigilance +2"); a legacy
//                record with no skillBonus keeps its bonus text as typed.
// Legacy records (no new fields) re-save unchanged.

export const VAE_SKILLS = [
  "Agility", "Close Combat", "Force", "Medicine", "Ranged Combat", "Stealth",
  "Investigation", "Learning", "Vigilance", "Inspiration", "Manipulation", "Observation",
] as const;
export const SKILL_ATTR: Record<string, string> = {
  Agility: "PHY", "Close Combat": "PHY", Force: "PHY", Medicine: "PRE", "Ranged Combat": "PRE", Stealth: "PRE",
  Investigation: "LOG", Learning: "LOG", Vigilance: "LOG", Inspiration: "EMP", Manipulation: "EMP", Observation: "EMP",
};
export const WEAPON_SKILLS = ["Close Combat", "Ranged Combat", "Force", "Close Combat / Ranged Combat"] as const;
export const isRanged = (skill: string) => /ranged combat/i.test(skill);
export const isMelee = (skill: string) => !/^ranged combat$/i.test(skill.trim());
/** Zones away (0 = the same zone). The book's longest reach is the cannon, 2–5. */
export const MAX_ZONE = 5;
export const FEATURES = ["Thrown", "Two-handed", "Concealable", "Slow to reload", "Silver", "Iron"] as const;
export const GEAR_KINDS = ["gear", "armor", "power", "magic"] as const;
export type GearKind = (typeof GEAR_KINDS)[number];
export const RESIST_AGAINST = ["Curses", "Trollcraft", "Enchantments", "Fear", "Vaesen powers"] as const;

const int = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v.trim().replace(/^\+/, "").replace(/[−–]/g, "-")) : NaN;
  return Number.isFinite(n) ? Math.round(n) : null;
};
export const clampN = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// ── Weapon bonus ("+2" | "—" | "-1") — the sheet reads it with /-?\d+/ ──────
export const bonusNum = (v: unknown): number => { const m = String(v ?? "").replace(/[−–]/g, "-").match(/-?\d+/); return m ? parseInt(m[0], 10) : 0; };
export const fmtBonus = (n: number) => (n > 0 ? `+${n}` : String(n));

// ── Range in zones ("0", "0-2", "1–3") ───────────────────────────────────────
export type Range = { from: number; to: number };
export function parseRange(v: unknown): Range | null {
  const m = String(v ?? "").trim().match(/^(\d)(?:\s*[-–—]\s*(\d))?$/);
  if (!m) return null;
  const from = Number(m[1]), to = m[2] != null ? Number(m[2]) : from;
  return from <= MAX_ZONE && to <= MAX_ZONE && to >= from ? { from, to } : null;
}
export const fmtRange = (r: Range) => (r.to > r.from ? `${r.from}-${r.to}` : String(r.from));
const zoneWord = (n: number) => (n === 0 ? "your zone" : n === 1 ? "1 zone" : `${n} zones`);
/** "your zone to 2 zones away" — the preview's plain-words reading. */
export function rangeWords(r: Range): string {
  if (r.to === 0) return "your own zone (engaged)";
  if (r.from === r.to) return `${zoneWord(r.from)} away`;
  return `${r.from === 0 ? "your zone" : zoneWord(r.from)} to ${zoneWord(r.to)} away`;
}

// ── Skill bonuses ("Vigilance +2, Investigation +2") ─────────────────────────
export type SkillBonus = { skill: string; amount: number };
export function cleanSkillBonus(v: unknown): SkillBonus[] {
  if (!Array.isArray(v)) return [];
  const out: SkillBonus[] = [];
  for (const x of v.slice(0, 6)) {
    const o = (x ?? {}) as Record<string, unknown>;
    const want = typeof o.skill === "string" ? o.skill.trim().toLowerCase() : "";
    const skill = VAE_SKILLS.find((s) => s.toLowerCase() === want);
    const n = int(o.amount);
    if (!skill || n == null || n <= 0 || out.some((b) => b.skill === skill)) continue;
    out.push({ skill, amount: clampN(n, 1, 5) });
  }
  return out;
}
export const fmtSkillBonus = (b: SkillBonus[]) => b.map((x) => `${x.skill} +${x.amount}`).join(", ");
/** Best effort for an old record: "Vigilance +2, Learning +1" exactly, or a bare
 *  "+2" whose description names the skills it helps (book style). */
export function parseLegacyBonus(bonus: string, desc: string): SkillBonus[] {
  const t = bonus.trim();
  if (!t || t === "—") return [];
  const parts = t.split(/\s*,\s*/).map((p) => p.match(/^(.+?)\s*\+\s*(\d)$/));
  if (parts.every(Boolean)) {
    const b = cleanSkillBonus(parts.map((m) => ({ skill: m![1], amount: m![2] })));
    if (b.length === parts.length && fmtSkillBonus(b) === t) return b;
    return [];
  }
  const bare = t.match(/^\+(\d)$/);
  if (!bare) return [];
  const named = VAE_SKILLS.filter((s) => new RegExp(`\\b${s}\\b`, "i").test(desc));
  return cleanSkillBonus(named.map((skill) => ({ skill, amount: bare[1] })));
}

// ── Resistance (Items of Power) ──────────────────────────────────────────────
export type Resist = { against: string; amount: number };
export function cleanResist(v: unknown): Resist[] {
  if (!Array.isArray(v)) return [];
  const out: Resist[] = [];
  for (const x of v.slice(0, 4)) {
    const o = (x ?? {}) as Record<string, unknown>;
    const against = RESIST_AGAINST.find((a) => a.toLowerCase() === String(o.against ?? "").trim().toLowerCase());
    const n = int(o.amount);
    if (!against || n == null || n <= 0 || out.some((r) => r.against === against)) continue;
    out.push({ against, amount: clampN(n, 1, 5) });
  }
  return out;
}
/** "+2 to resist Curses and +1 to Fear tests (from trolls)" — the book's wording. */
export function fmtResist(r: Resist[], from = ""): string {
  if (!r.length) return "";
  const bits = r.map((x) => (x.against === "Fear" ? `+${x.amount} to Fear tests` : `+${x.amount} to resist ${x.against}`));
  return bits.join(", ") + (from.trim() ? ` from ${from.trim()}` : "");
}

// ── Cost 1–5 (Resources successes / Capital); "" = not for sale ──────────────
export const COST_MAX = 8;
export const costNum = (v: unknown): number | null => { const n = int(v); return n != null && n > 0 && String(v).trim().match(/^\d+$/) ? clampN(n, 1, COST_MAX) : null; };

/** The sheet / reference-page line for a gear record (note text). */
export function gearRuleText(d: { kind?: string; skillBonus?: SkillBonus[]; effect?: string; resist?: Resist[]; resistFrom?: string; risk?: string; penalty?: number }): string {
  const bits: string[] = [];
  if (d.effect?.trim()) bits.push(d.effect.trim().replace(/\.?$/, "."));
  const res = fmtResist(d.resist ?? [], d.resistFrom);
  if (res) bits.push(res.charAt(0).toUpperCase() + res.slice(1) + ".");
  if (d.kind === "armor" && d.penalty) bits.push(`Agility -${d.penalty}.`);
  if (d.risk?.trim()) bits.push(`Risk: ${d.risk.trim().replace(/\.?$/, ".")}`);
  return bits.join(" ");
}
