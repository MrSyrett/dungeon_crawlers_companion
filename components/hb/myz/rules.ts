// ── MUTANT: YEAR ZERO (key "myz") homebrew rules — pure ────────────────────
// Shared by the components/hb/myz/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree. MYZ only: the
// sibling Year Zero games (Alien "yze", TWD, Vaesen) have their own code.
//
// Mutant: Year Zero vocabulary (lib/data/myz-data.ts): twelve skills plus one
// specialist skill per role; weapons are melee (Fight) or ranged (Shoot) with
// a GEAR BONUS (black gear dice), base DAMAGE (+1 per extra success), a range
// band (Arm's Length · Near · Short · Long · Distant) and an item weight
// (tiny 0 · light ½ · normal 1 · heavy 2). Firearms eat Bullets, the Ark's
// currency; bows use arrows, the flamethrower booze, the scrap cannon a
// charge. Armor has an Armor Rating. Gear grants "+N to a skill" (Binoculars
// +3 Scout). Artifacts from the Old Age carry a DEV requirement and DEV bonus
// (Food Supply · Culture · Technology · Warfare) for the Ark.
//
// Storage keeps the original shapes every consumer reads (/myz/gear, the
// sheet's Item Shop via public/tools-data/myz-homebrew.js):
//   myz-weapon · name, skill ("Fight" | "Shoot"), bonus (number), damage
//                (number), range, weight ("½" | "1" | "2"…), desc (as before)
//                + optional: blast (Blast Power), ammo ("Bullets" | "Arrows" |
//                "Booze" | "Charge" | "Single use"), features (string[]),
//                value (bullets), artifact (true) + devReq {area, level} +
//                devBonus [{area, amount: "+1".."+3" | "+D6"}].
//   myz-gear   · name, weight, desc (as before) + kind ("gear" | "armor"),
//                skillBonus [{skill, amount}] (gear), rating (armor only — the
//                sheet routes any record with `rating` to its Armor tab),
//                value, artifact, devReq, devBonus (as above).
// Legacy records (no new fields) re-save unchanged.

export const MYZ_SKILLS = [
  "Endure", "Force", "Fight", "Sneak", "Move", "Shoot",
  "Scout", "Comprehend", "Know the Zone", "Sense Emotion", "Manipulate", "Heal",
] as const;
/** Role specialist skills (Enforcer … Grunt). */
export const MYZ_SPECIALIST = [
  "Intimidate", "Jury-Rig", "Find the Path", "Make a Deal", "Sic a Dog", "Inspire", "Command", "Shake it Off",
] as const;
export const ALL_SKILLS: readonly string[] = [...MYZ_SKILLS, ...MYZ_SPECIALIST];
export const SKILL_ATTR: Record<string, string> = {
  Endure: "STR", Force: "STR", Fight: "STR", Sneak: "AGI", Move: "AGI", Shoot: "AGI",
  Scout: "WIT", Comprehend: "WIT", "Know the Zone": "WIT", "Sense Emotion": "EMP", Manipulate: "EMP", Heal: "EMP",
  Intimidate: "Enforcer", "Jury-Rig": "Gearhead", "Find the Path": "Stalker", "Make a Deal": "Fixer",
  "Sic a Dog": "Dog Handler", Inspire: "Chronicler", Command: "Boss", "Shake it Off": "Grunt",
};
export const RANGES = ["Arm's Length", "Near", "Short", "Long", "Distant"] as const;
export const MELEE_RANGES = ["Arm's Length", "Near"] as const;
/** Item weight → slots string the sheet's itemWeight() reads. */
export const WEIGHTS: [string, string][] = [["0", "Tiny (0)"], ["½", "Light (½)"], ["1", "Normal (1)"], ["2", "Heavy (2)"]];
export const AMMO = ["Bullets", "Arrows", "Booze", "Charge", "Single use"] as const;
export const AMMO_HELP: Record<string, string> = {
  Bullets: "Each shot spends 1 Bullet (the sheet takes it).",
  Arrows: "Uses arrows, not bullets — silent.",
  Booze: "Each attack burns 1 dose of booze (fuel).",
  Charge: "Each shot needs an explosive charge.",
  "Single use": "Thrown or fired once, then it's gone.",
};
export const FEATURES = [
  "Jury-Rigged", "Two-handed", "Thrown", "Clip", "Full auto", "Silent", "Burns",
  "Reload each shot", "Can't be carried", "Needs electricity",
] as const;
export const DEV_AREAS = ["Food Supply", "Culture", "Technology", "Warfare"] as const;
export const DEV_AMOUNTS = ["+1", "+2", "+3", "+D6"] as const;

const int = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v.replace(/[−–]/g, "-")) : NaN;
  return Number.isFinite(n) ? Math.round(n) : null;
};
export const clampN = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// ── Skill bonuses ("Scout +3, Find the Path +3") ────────────────────────────
export type SkillBonus = { skill: string; amount: number };
export function cleanSkillBonus(v: unknown): SkillBonus[] {
  if (!Array.isArray(v)) return [];
  const out: SkillBonus[] = [];
  for (const x of v.slice(0, 6)) {
    const o = (x ?? {}) as Record<string, unknown>;
    const want = typeof o.skill === "string" ? o.skill.trim().toLowerCase() : "";
    const skill = ALL_SKILLS.find((s) => s.toLowerCase() === want);
    const n = int(o.amount);
    if (!skill || n == null || n === 0 || out.some((b) => b.skill === skill)) continue;
    out.push({ skill, amount: clampN(n, -3, 5) });
  }
  return out;
}
const signedN = (n: number) => (n > 0 ? `+${n}` : `−${-n}`);
export const fmtSkillBonus = (b: SkillBonus[]) => b.map((x) => `${x.skill} ${signedN(x.amount)}`).join(", ");

// ── Artifacts (DEV requirement / bonus) ─────────────────────────────────────
export type DevReq = { area: string; level: number };
export type DevBonus = { area: string; amount: string };
const area = (v: unknown) => DEV_AREAS.find((a) => a.toLowerCase() === String(v ?? "").trim().toLowerCase()) ?? null;
export function cleanDevReq(v: unknown): DevReq | null {
  const o = (v ?? {}) as Record<string, unknown>;
  const a = area(o.area), n = int(o.level);
  return a && n != null && n > 0 ? { area: a, level: clampN(n, 1, 60) } : null;
}
export function cleanDevBonus(v: unknown): DevBonus[] {
  if (!Array.isArray(v)) return [];
  const out: DevBonus[] = [];
  for (const x of v.slice(0, 4)) {
    const o = (x ?? {}) as Record<string, unknown>;
    const a = area(o.area);
    const amt = String(o.amount ?? "").trim().replace(/d6/i, "D6");
    if (!a || !(DEV_AMOUNTS as readonly string[]).includes(amt) || out.some((b) => b.area === a)) continue;
    out.push({ area: a, amount: amt });
  }
  return out;
}
export const fmtDevReq = (r: DevReq | null) => (r ? `${r.area} ${r.level}` : "");
export const fmtDevBonus = (b: DevBonus[]) => b.map((x) => `${x.area} ${x.amount}`).join(", ");
/** "DEV Req: Technology 10. DEV Bonus: Technology +D6." — the book's wording. */
export function fmtDev(req: DevReq | null, bonus: DevBonus[]): string {
  return [req ? `DEV Req: ${fmtDevReq(req)}.` : "", bonus.length ? `DEV Bonus: ${fmtDevBonus(bonus)}.` : ""].filter(Boolean).join(" ");
}

// ── Bullet value (the site's Item Shop formula, lib/data/myz-data MYZ_VALUES) ─
// Artifacts base 15, scrap 2; +2 per gear bonus, +2 per damage / Armor Rating.
export function suggestValue(o: { artifact: boolean; bonus?: number; damage?: number; rating?: number; skillBonus?: number }): number {
  const base = o.artifact ? 15 : 2;
  return base + 2 * Math.max(0, o.bonus ?? 0) + 2 * Math.max(0, o.damage ?? 0) + 2 * Math.max(0, o.rating ?? 0) + 2 * Math.max(0, o.skillBonus ?? 0);
}

/** Artifact + value fields shared by both kinds; writes into `out`, sanitised. */
export function cleanArtifactValue(o: Record<string, unknown>, out: Record<string, unknown>) {
  const v = int(o.value);
  if (v != null && v > 0) out.value = clampN(v, 1, 999);
  if (o.artifact === true || o.artifact === "true") {
    out.artifact = true;
    const req = cleanDevReq(o.devReq);
    if (req) out.devReq = req;
    const bonus = cleanDevBonus(o.devBonus);
    if (bonus.length) out.devBonus = bonus;
  }
}
