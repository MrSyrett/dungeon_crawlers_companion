// ── Homebrew effect vocabulary — single source of truth ──────────────────────
// Every homebrew mechanical effect (on a class talent, class feature, or
// ancestry trait) has a `target` drawn from this list. The label map and the
// `effectLabel()` renderer below are the ONE place these are defined for the
// TypeScript side of the app: the reference pages (Classes, Ancestries) and the
// Effect Builder (HomebrewManager) all import from here, so a change to a target
// name or its wording happens once.
//
// This module is deliberately dependency-free (no prisma, no React) so it is
// safe to import from both server components and the "use client" builder.
//
// The character sheet template can't import TypeScript, so it keeps its own
// mirror (HB_TALENT_LABEL / _hbEffOne). To keep the two in lockstep, the build
// step (scripts/extract-game-data.mjs) regenerates the sheet's label map from
// TALENT_TARGETS below — edit here, then re-run the extract.

export type EffectTargetKey =
  | "meleeAtk" | "meleeDmg" | "meleeAtkDmg"
  | "rangedAtk" | "rangedDmg" | "rangedAtkDmg"
  | "mrAtk" | "mrDmg" | "mrAtkDmg"
  | "ac" | "hp" | "gearSlots"
  | "str" | "dex" | "con" | "int" | "wis" | "cha"
  | "statChoice" | "spellKnown" | "spellCheck" | "weaponDie"
  | "advSpell" | "featureCharges" | "playerTalent" | "perDay";

// The "thing being bonused". Order matters: it's the order the Effect Builder's
// target dropdown presents. `[key, label]` pairs.
export const TALENT_TARGETS: [string, string][] = [
  ["meleeAtk", "Melee Attacks"],
  ["meleeDmg", "Melee Damage"],
  ["meleeAtkDmg", "Melee Attack & Damage"],
  ["rangedAtk", "Ranged Attacks"],
  ["rangedDmg", "Ranged Damage"],
  ["rangedAtkDmg", "Ranged Attack & Damage"],
  ["mrAtk", "Melee & Ranged Attacks"],
  ["mrDmg", "Melee & Ranged Damage"],
  ["mrAtkDmg", "Melee & Ranged Attack & Damage"],
  ["ac", "AC"],
  ["hp", "HP"],
  ["gearSlots", "Gear Slots"],
  ["str", "Strength"],
  ["dex", "Dexterity"],
  ["con", "Constitution"],
  ["int", "Intelligence"],
  ["wis", "Wisdom"],
  ["cha", "Charisma"],
  ["statChoice", "Stat (player choice)"],
  ["spellKnown", "Learn Spell"],
  ["spellCheck", "Spellcasting Checks"],
  ["weaponDie", "Weapon Damage Die"],
  ["advSpell", "Advantage: Cast Spell"],
  ["featureCharges", "Charges"],
  ["playerTalent", "Player Choice"],
  ["perDay", "Per Day (uses)"],
];

export const TALENT_TARGET_KEYS: string[] = TALENT_TARGETS.map(([k]) => k);

export const TALENT_LABEL: Map<string, string> = new Map(TALENT_TARGETS);

// The shape an effect can take. All fields optional except target/amount so this
// accepts both the strict HbEffect (lib/homebrew) and the looser page-level
// records without casting.
export interface EffectLike {
  amount?: number | string;
  target?: string;
  weapon?: string;
  spell?: string;
  feature?: string;
}

// Human-readable one-line label for a single effect. This is the ONE renderer
// the reference pages use; the sheet mirrors its logic in _hbEffOne (with its
// own "Label +N" word order for the sheet's talent table).
export function effectLabel(e: EffectLike): string {
  const amt = Number(e.amount) || 0;
  const target = String(e.target ?? "");
  const label = TALENT_LABEL.get(target) ?? target;
  if (target === "perDay") return `${amt}/day`;
  if (target === "weaponDie") {
    const w = String(e.weapon ?? "");
    return `d${amt} weapon damage${w ? ` (${w})` : ""}`;
  }
  if (target === "spellKnown") {
    const sp = String(e.spell ?? "");
    return sp && sp !== "Player Choice" ? `Learn ${sp}` : "Learn Spell";
  }
  if (target === "advSpell") {
    const sp = String(e.spell ?? "");
    return sp ? `Advantage casting ${sp}` : "Advantage on a spell";
  }
  if (target === "playerTalent") return "Player Choice";
  if (target === "featureCharges") {
    const f = String(e.feature ?? "");
    return `+${amt} charge${amt === 1 ? "" : "s"}${f ? ` to ${f}` : ""}`;
  }
  return `${amt >= 0 ? "+" : ""}${amt} ${label}`;
}
