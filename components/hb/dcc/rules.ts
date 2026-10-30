// ── Dungeon Crawler Carl homebrew rules (pure, no React, no prisma) ──────────
// Imported by the DCC builders (components/hb/dcc/*) for live previews AND by
// the server normalisers (lib/homebrew.ts) so the stored legacy fields — the
// DccMonster / DccSkill / DccSpell shapes the GM Screen, bestiary, session-prep
// builder and DCC sheet read — are always composed the same way.
//
// Monster attacks ⇄ DccMonsterAttack {name, toHit "13+F", damage "2d6+3",
//   damageType, range "30ft range, 10ft Blast radius", rider}
//   composeDccAttack(row) / parseDccAttack(a) / cleanDccAttackRows(raw)
//   AttackRow.extra: area ("" | blast | cone | burst | line), size ("10"),
//   ap ("" | "ap" → ", Armor-Piercing"), dmgF ("" | "F" → damage "+F").
// Notes ⇄ "Name—rules text"                composeDccNote / parseDccNote
// Upgrades ⇄ {rank, text} where the text carries the sheet-parsed clauses
//   "+1d4 base damage" and "add 1 Rank damage die" (dcc_character_sheet
//   dccDiceAtRank / dccRankDiceFor)       composeDccUpgrade / parseDccUpgrade
// Skill range ⇄ "Melee" | "60 ft" | "Reach (10 ft)" | other text
import { cleanDice, formatDice, type Dice } from "../dice";
import type { AttackRow } from "../AttackRows";

export const DCC_DICE = [4, 6, 8, 10, 12, 20];
export const DCC_STAT_KEYS = ["STR", "INT", "CON", "DEX", "CHA"] as const;
// Core p.70 sizes (DccTables.sizes).
export const DCC_SIZES: [number, string][] = [
  [1, "Tiny"], [2, "Small"], [3, "Petite"], [4, "Medium"], [5, "Large"], [6, "Huge"], [7, "Colossal"], [8, "Gargantuan"],
];
export const sizeName = (n: number) => DCC_SIZES.find(([s]) => s === n)?.[1] ?? "";
// DccTables.damageTypes (common + uncommon) plus the few the book's blocks also print.
export const DCC_DAMAGE_TYPES = [
  "Bludgeoning", "Piercing", "Slashing", "Fire", "Poison",
  "Acid", "Electric", "Force", "Holy", "Ice", "Necrotic", "Psychic", "Sonic", "Psionic",
];
// The type tags the book's monster blocks use most.
export const DCC_MONSTER_TAGS = [
  "Humanoid", "Beastly", "Undead", "Animal", "Aberration", "Beast", "Construct", "Reptile",
  "Monstrous", "Mutated", "Shapeshifter", "Insectoid", "Ooze", "Mimic", "Elemental", "Plant", "Demonic", "Swarm",
];
// Attack reach as the book prints it ("5ft range" is melee).
export const DCC_ATTACK_RANGES = [
  "5ft range", "10ft range", "15ft range", "20ft range", "25ft range", "30ft range", "40ft range",
  "50ft range", "60ft range", "100ft range", "200ft range", "Self",
];
export const DCC_AREAS: [string, string][] = [["", "—"], ["blast", "Blast radius"], ["cone", "Cone"], ["burst", "Burst radius"], ["line", "Line"]];
export const DCC_AREA_SIZES = ["5", "10", "15", "20", "25", "30", "40", "50", "60"];
const AREA_TEXT: Record<string, string> = { blast: "Blast radius", cone: "Cone", burst: "Burst radius", line: "Line" };

const int = (v: unknown, dflt = 0) => {
  const n = parseInt(String(v ?? "").replace(/^\+/, ""), 10);
  return Number.isFinite(n) ? n : dflt;
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const txt = (v: unknown, max: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

// ── Monster attacks ──────────────────────────────────────────────────────────
export type DccAttackOut = { name: string; toHit: string; damage: string; damageType?: string; range?: string; rider?: string };

export function composeDccRange(r: AttackRow): string {
  const area = r.extra?.area ?? "";
  const size = r.extra?.size || "10";
  const base = String(r.range ?? "").trim();
  let out = base === "Self" && area ? "" : base;
  if (area === "blast") out = [base && base !== "Self" ? base : "", `${size}ft Blast radius`].filter(Boolean).join(", ");
  else if (AREA_TEXT[area]) out = `${size}ft ${AREA_TEXT[area]}`;
  if (r.extra?.ap === "ap") out = [out, "Armor-Piercing"].filter(Boolean).join(", ");
  return out;
}

export function composeDccDamage(r: AttackRow): string {
  const d = formatDice(r.dice);
  const f = r.extra?.dmgF === "F";
  if (!d) return f ? "F" : "No damage";
  return f ? `${d}+F` : d;
}

export function composeDccAttack(r: AttackRow): DccAttackOut {
  const out: DccAttackOut = {
    name: txt(r.name, 120),
    toHit: r.hit == null ? "" : `${r.hit}+F`,
    damage: composeDccDamage(r),
  };
  if (r.dtype) out.damageType = txt(r.dtype, 40);
  const range = composeDccRange(r);
  if (range) out.range = range.slice(0, 80);
  if (txt(r.special, 600)) out.rider = txt(r.special, 600);
  return out;
}

export const composeDccAttacks = (rows: AttackRow[]) => rows.map(composeDccAttack).filter((a) => a.name);

/** Parse a stored range string into range + area extras; unknown text stays as the range verbatim. */
function parseRange(raw: string): { range: string; extra: Record<string, string> } {
  const t = String(raw ?? "").trim();
  const extra: Record<string, string> = { area: "", size: "10", ap: "", dmgF: "" };
  let rest = t;
  if (/,\s*Armor-Piercing$/i.test(rest) || /^Armor-Piercing$/i.test(rest)) {
    extra.ap = "ap";
    rest = rest.replace(/,?\s*Armor-Piercing$/i, "").trim();
  }
  let m = rest.match(/^(?:(\d+ft range),\s*)?(\d+)ft (Blast radius|Cone|Burst radius|Line)$/i);
  if (m) {
    const area = Object.entries(AREA_TEXT).find(([, v]) => v.toLowerCase() === m![3].toLowerCase())?.[0] ?? "";
    extra.area = area;
    extra.size = m[2];
    const range = m[1] ?? "Self";
    if (area !== "blast" && m[1]) return { range: t, extra: { area: "", size: "10", ap: "", dmgF: "" } }; // e.g. "30ft range, 15ft Cone" — keep verbatim
    return { range, extra };
  }
  m = rest.match(/^(\d+)\s*ft\.?\s*range$/i);
  if (m) return { range: `${m[1]}ft range`, extra };
  if (!rest) return { range: "", extra };
  // Unrecognised: keep the full original string as the range (AttackRows shows it).
  return { range: t, extra: { area: "", size: "10", ap: "", dmgF: "" } };
}

/** A stored DccMonsterAttack → an AttackRow. Anything that won't structure is kept in `special`. */
export function parseDccAttack(a: Record<string, unknown>): AttackRow {
  const rider: string[] = [];
  const hitRaw = String(a.toHit ?? "").trim();
  let hit: number | null = null;
  const hm = hitRaw.match(/^(-?\d+)\s*\+\s*F$/i);
  if (hm) hit = int(hm[1]);
  else if (hitRaw && !/^(none|passive|—|-)$/i.test(hitRaw)) rider.push(`To hit ${hitRaw}.`);

  const { range, extra } = parseRange(String(a.range ?? ""));
  const dmgRaw = String(a.damage ?? "").trim();
  let dice: Dice = { n: 0, d: 6, m: 0 };
  const dm = dmgRaw.match(/^(\d*)d(\d+)\s*(?:([+-])\s*(\d+))?\s*(\+\s*F)?$/i);
  if (dm) {
    dice = { n: dm[1] ? int(dm[1]) : 1, d: int(dm[2]), m: dm[3] ? (dm[3] === "-" ? -1 : 1) * int(dm[4]) : 0 };
    if (dm[5]) extra.dmgF = "F";
  } else if (/^F$/i.test(dmgRaw)) extra.dmgF = "F";
  else if (dmgRaw && !/^no damage$/i.test(dmgRaw)) rider.push(`Damage ${dmgRaw}.`);

  const r = String(a.rider ?? "").trim();
  if (r) rider.push(r);
  return {
    name: String(a.name ?? ""),
    count: 1,
    hit,
    dice,
    range,
    dtype: String(a.damageType ?? ""),
    special: rider.join(" "),
    extra,
  };
}

/** Server-side validator for builder attack rows. */
export function cleanDccAttackRows(raw: unknown): AttackRow[] {
  if (!Array.isArray(raw)) return [];
  return (raw as unknown[]).slice(0, 12).flatMap((x): AttackRow[] => {
    const o = (x ?? {}) as Record<string, unknown>;
    const e = (o.extra ?? {}) as Record<string, unknown>;
    const area = String(e.area ?? "");
    const size = String(e.size ?? "10");
    const hit = o.hit == null || o.hit === "" ? null : clamp(int(o.hit), -10, 60);
    if (!txt(o.name, 120)) return [];
    return [{
      name: txt(o.name, 120),
      count: 1,
      hit,
      dice: cleanDice(o.dice, { maxCount: 40, dice: DCC_DICE, minMod: -20, maxMod: 99 }),
      range: txt(o.range, 80),
      dtype: txt(o.dtype, 40),
      special: txt(o.special, 600),
      extra: {
        area: AREA_TEXT[area] ? area : "",
        size: /^\d{1,3}$/.test(size) ? size : "10",
        ap: e.ap === "ap" ? "ap" : "",
        dmgF: e.dmgF === "F" ? "F" : "",
      },
    }];
  });
}

// ── Notes (named abilities) ──────────────────────────────────────────────────
export type DccNote = { name: string; text: string };
export const parseDccNote = (s: string): DccNote => {
  const m = String(s ?? "").match(/^([^—]{1,60})—([\s\S]*)$/);
  return m ? { name: m[1], text: m[2] } : { name: "", text: String(s ?? "") };
};
export const composeDccNote = (n: DccNote) => {
  const name = n.name.replace(/—/g, "-").trim();
  const text = n.text.trim();
  return name ? `${name}—${text}` : text;
};

// ── Rank upgrades ────────────────────────────────────────────────────────────
// add: extra base-damage dice (the sheet sums only dice of the base's size);
// rankDie: "add 1 Rank damage die" (Core p.176, Table 37); text: everything else.
export type DccUpgradeRow = { rank: number; add: Dice; rankDie: boolean; text: string };
export const DCC_UPGRADE_RANKS = [5, 10, 15];

export function composeDccUpgrade(u: DccUpgradeRow): string {
  const parts: string[] = [];
  if (u.add.n > 0) parts.push(`+${u.add.n}d${u.add.d} base damage`);
  if (u.rankDie) parts.push(parts.length ? "and add 1 Rank damage die" : "Add 1 Rank damage die");
  let out = parts.join(" ");
  const t = u.text.trim();
  if (t) out = out ? `${out}. ${t}` : t;
  return out;
}

/** Stored {rank, text} → row. Structured only when re-composing gives back the exact text. */
export function parseDccUpgrade(o: { rank?: unknown; text?: unknown }, baseDie = 6): DccUpgradeRow {
  const rank = DCC_UPGRADE_RANKS.includes(int(o.rank)) ? int(o.rank) : 5;
  const text = String(o.text ?? "");
  const raw: DccUpgradeRow = { rank, add: { n: 0, d: baseDie, m: 0 }, rankDie: false, text };
  const m = text.match(/^(?:\+(\d+)d(\d+) base damage)?(?:\s*(?:and )?(add 1 Rank damage die))?(?:\.\s+([\s\S]*))?$/i);
  if (!m || (!m[1] && !m[3])) return raw;
  const row: DccUpgradeRow = {
    rank,
    add: m[1] ? { n: int(m[1]), d: int(m[2]), m: 0 } : { n: 0, d: baseDie, m: 0 },
    rankDie: !!m[3],
    text: m[4] ?? "",
  };
  return composeDccUpgrade(row) === text ? row : raw;
}

// ── Skill range ──────────────────────────────────────────────────────────────
export type DccSkillRange = { kind: "" | "melee" | "ft" | "reach" | "custom"; ft: number; text: string };
export function parseDccSkillRange(s: string): DccSkillRange {
  const t = String(s ?? "").trim();
  if (!t) return { kind: "", ft: 30, text: "" };
  if (/^melee$/i.test(t)) return { kind: "melee", ft: 5, text: "" };
  let m = t.match(/^(\d+)\s*ft$/i);
  if (m) return { kind: "ft", ft: int(m[1]), text: "" };
  m = t.match(/^Reach \((\d+)\s*ft\)$/i);
  if (m) return { kind: "reach", ft: int(m[1]), text: "" };
  return { kind: "custom", ft: 30, text: t };
}
export function composeDccSkillRange(r: DccSkillRange): string {
  if (r.kind === "melee") return "Melee";
  if (r.kind === "ft") return `${r.ft} ft`;
  if (r.kind === "reach") return `Reach (${r.ft} ft)`;
  if (r.kind === "custom") return r.text.trim();
  return "";
}

/** "1d6 + STR Slashing" — the book's Base Damage line. */
export function dccBaseDamageLine(dice: string, stat: string, dtype: string) {
  if (!dice) return "";
  return [dice + (stat ? ` + ${stat}` : ""), dtype].filter(Boolean).join(" ");
}
