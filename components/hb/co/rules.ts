// ── Candela Obscura homebrew rules — pure ────────────────────────────────────
// Shared by the components/hb/co/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree.
//
// Illuminated Worlds vocabulary (public/tools-data/co-data.js): three drives —
// Nerve, Cunning, Intuition — each holding three actions (Move/Strike/Control,
// Sway/Read/Hide, Survey/Focus/Sense). Drive points are spent for +1d or to
// power abilities; every 3 max points give 1 resistance, burned to reroll or
// soak. Body / Brain / Bleed marks (3 each, the 4th becomes a scar). Gilded
// dice refresh drive. Five roles, two specialties each; abilities are granted
// by a role or a specialty and are often limited "once per assignment".
//
// Storage keeps the legacy shapes every consumer reads:
//   co-ability · name, source ("Role" | "Specialty"), owner (role / specialty
//                name), desc — desc is COMPOSED by the server from the new
//                optional fields: uses {n, per}, cost (badges), actions
//                (string[] of the nine), effects (badges) and text (free
//                rules text). A legacy record has no `text`: its desc becomes
//                the text, so it re-composes byte-identical.
//   co-gear    · name, type, desc — desc composed the same way from uses,
//                actions, effects and text; new optional `owner` (the
//                specialty for Specialty gear).
// The character sheet (co_character_sheet.html) copies an ability's `uses`,
// `cost` and `actions` onto its row: a "Use" button pays the cost (drive
// points, resistance, marks) and ticks a use; each action gets a roll button.

export const CO_DRIVES = ["Nerve", "Cunning", "Intuition"] as const;
export type CoDrive = (typeof CO_DRIVES)[number];
export const CO_ACTIONS = ["Move", "Strike", "Control", "Sway", "Read", "Hide", "Survey", "Focus", "Sense"] as const;
export const ACTION_DRIVE: Record<string, CoDrive> = {
  Move: "Nerve", Strike: "Nerve", Control: "Nerve", Sway: "Cunning", Read: "Cunning", Hide: "Cunning", Survey: "Intuition", Focus: "Intuition", Sense: "Intuition",
};
export const CO_MARKS = ["Body", "Brain", "Bleed"] as const;
export const CIRCLE_RESOURCES = ["Stitch", "Refresh", "Train"] as const;
/** Roles → their two specialties (co-data.js CO_ROLES). */
export const CO_ROLES: { role: string; mastery: string; specialties: string[] }[] = [
  { role: "Face", mastery: "the people", specialties: ["Journalist", "Magician"] },
  { role: "Muscle", mastery: "the body", specialties: ["Explorer", "Soldier"] },
  { role: "Scholar", mastery: "the mind", specialties: ["Doctor", "Professor"] },
  { role: "Slink", mastery: "the unknown", specialties: ["Criminal", "Detective"] },
  { role: "Weird", mastery: "the arcane", specialties: ["Medium", "Occultist"] },
];
export const ROLE_NAMES = CO_ROLES.map((r) => r.role);
export const SPECIALTY_NAMES = CO_ROLES.flatMap((r) => r.specialties);
export const roleOfSpecialty = (s: string) => CO_ROLES.find((r) => r.specialties.includes(s))?.role ?? "";

export const GEAR_TYPES = ["Standard", "Specialty"] as const;
export const USE_PERS = ["assignment", "session", "between"] as const;
export type UsePer = (typeof USE_PERS)[number];
export type Uses = { n: number; per: UsePer };
export type CoBadge = { kind: string; target?: string; amount?: number };

const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const int = (v: unknown, d: number) => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : d; };
const cap = (t: string) => (t ? t[0].toUpperCase() + t.slice(1) : t);
const times = (n: number) => (n === 1 ? "once" : n === 2 ? "twice" : n === 3 ? "three times" : `${n} times`);

// ── Uses ─────────────────────────────────────────────────────────────────────
export function cleanUses(v: unknown): Uses | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const per = (USE_PERS as readonly string[]).includes(s(o.per)) ? (s(o.per) as UsePer) : null;
  if (!per) return null;
  return { n: per === "between" ? 1 : clamp(int(o.n, 1), 1, 5), per };
}
export function usesLabel(u: Uses | null): string {
  if (!u) return "";
  if (u.per === "between") return "between assignments";
  return `${times(u.n)} per ${u.per}`;
}

// ── Costs (badges) ───────────────────────────────────────────────────────────
// drive  · spend N points of a drive ("any" = a drive of your choice)
// resist · burn N resistance of a drive
// mark   · take N marks of a kind
// scar   · take a scar of a kind
// circle · spend N of a circle resource
export const COST_KINDS = ["drive", "resist", "mark", "scar", "circle"] as const;
const DRIVE_ANY = [...CO_DRIVES, "any"] as const;
const COST_TARGETS: Record<string, readonly string[]> = {
  drive: DRIVE_ANY, resist: DRIVE_ANY, mark: CO_MARKS, scar: [...CO_MARKS, "any"], circle: CIRCLE_RESOURCES,
};
export function costLabel(b: CoBadge): string {
  const n = b.amount ?? 1, t = b.target ?? "";
  switch (b.kind) {
    case "drive": return t === "any" ? `spend ${n} drive point${n === 1 ? "" : "s"} of your choice` : `spend ${n} ${t}`;
    case "resist": return t === "any" ? `burn ${n} resistance` : `burn ${n} ${t} resistance`;
    case "mark": return n === 1 ? `take a ${t} mark` : `take ${n} ${t} marks`;
    case "scar": return t === "any" ? "take a scar" : `take a ${t} scar`;
    case "circle": return `spend ${n} ${t}`;
    default: return "";
  }
}

// ── Effects (badges) ─────────────────────────────────────────────────────────
const ACTION_ANY = [...CO_ACTIONS, "any"] as const;
const EFFECT_TARGETS: Record<string, readonly string[] | "text" | null> = {
  dice: ACTION_ANY, gild: ACTION_ANY, worth: DRIVE_ANY, swapAct: CO_ACTIONS, swapDrive: DRIVE_ANY, resDice: CO_DRIVES,
  soak: CO_MARKS, protect: CO_MARKS, refresh: DRIVE_ANY, clear: CO_MARKS, ask: "text", auto: "text", tier: null, illum: null, note: "text",
};
export const EFFECT_KINDS = Object.keys(EFFECT_TARGETS);
const AMOUNT_KINDS = new Set(["dice", "soak", "refresh", "clear", "illum"]);
export function effectLabel(b: CoBadge): string {
  const n = b.amount ?? 1, t = b.target ?? "";
  switch (b.kind) {
    case "dice": return t === "any" ? `+${n}d to the roll` : `+${n}d to ${t} rolls`;
    case "gild": return t === "any" ? "gild an extra die" : `gild an extra ${t} die`;
    case "worth": return t === "any" ? "the first drive point you spend is worth +2d" : `the first ${t} you spend is worth +2d`;
    case "swapAct": return `you may roll ${t} instead`;
    case "swapDrive": return t === "any" ? "you may spend any drive in place of the usual one" : `you may spend ${t} in place of the usual drive`;
    case "resDice": return `add dice equal to your ${t} resistance`;
    case "soak": return `soak ${n} ${t} mark${n === 1 ? "" : "s"}`;
    case "protect": return `you can't take ${t} marks from it`;
    case "refresh": return t === "any" ? `refresh ${n} drive point${n === 1 ? "" : "s"} of your choice` : `refresh ${n} ${t}`;
    case "clear": return `clear ${n} ${t} mark${n === 1 ? "" : "s"}`;
    case "ask": return t ? `ask the GM: ${t}` : "ask the GM a question";
    case "auto": return `automatically ${t}`;
    case "tier": return "push the result up one tier";
    case "illum": return `add ${n} to the Illumination track`;
    case "note": return t;
    default: return "";
  }
}

function cleanBadges(v: unknown, targets: Record<string, readonly string[] | "text" | null>, amountKinds: Set<string>, max: number): CoBadge[] {
  if (!Array.isArray(v)) return [];
  const out: CoBadge[] = [];
  for (const x of v) {
    if (!x || typeof x !== "object") continue;
    const o = x as Record<string, unknown>;
    const kind = s(o.kind);
    if (!(kind in targets)) continue;
    const T = targets[kind];
    const b: CoBadge = { kind };
    if (T === "text") {
      const t = s(o.target).slice(0, 160);
      if (!t && kind !== "ask") continue;
      if (t) b.target = t;
    } else if (T) {
      const t = s(o.target);
      if (!T.includes(t)) continue;
      b.target = t;
    }
    if (amountKinds.has(kind)) b.amount = clamp(int(o.amount, 1), 1, 6);
    out.push(b);
    if (out.length >= max) break;
  }
  return out;
}
export const cleanCosts = (v: unknown) => cleanBadges(v, COST_TARGETS, new Set(["drive", "resist", "mark", "circle"]), 4);
export const cleanEffects = (v: unknown) => cleanBadges(v, EFFECT_TARGETS, AMOUNT_KINDS, 8);
export const cleanActions = (v: unknown): string[] =>
  Array.isArray(v) ? CO_ACTIONS.filter((a) => v.includes(a)) : [];

// ── Composition ──────────────────────────────────────────────────────────────
export type CoParts = { uses: Uses | null; cost: CoBadge[]; actions: string[]; effects: CoBadge[]; text: string };
/** The description consumers show: "Once per assignment, spend 1 Nerve, roll Sense: +1d to the roll. <text>".
 *  Gear lists its actions separately (they're what it helps with, not a roll it makes). */
export function composeDesc(p: CoParts, gear = false): string {
  const head = [usesLabel(p.uses), ...p.cost.map(costLabel), p.actions.length && !gear ? `roll ${p.actions.join(" or ")}` : ""].filter(Boolean).join(", ");
  const eff = p.effects.map(effectLabel).filter(Boolean).join("; ");
  const text = p.text.trim();
  if (!head && !eff) return text;
  const lead = head && eff ? `${cap(head)}: ${eff}.` : head ? `${cap(head)}.` : `${cap(eff)}.`;
  return text ? `${lead} ${text}` : lead;
}
