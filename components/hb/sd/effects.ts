// ── Shadowdark badge vocabularies ────────────────────────────────────────────
// SD keeps its own, already-automated storage — the badges are only the UI:
//   • Gear `bonuses` [{amount, target}] (target ∈ BONUS_TARGETS) — the SD sheet
//     folds them in on equip (equippedItemBonusTotals → findHomebrewItem).
//   • Class talent / feature and ancestry trait `effects` (HbEffect rows,
//     target ∈ lib/effects TALENT_TARGETS) — applied by the creation wizard.
// gearBonusKinds / effectKinds are BonusBadges configs; the to/from helpers map
// between the stored rows and Badge[] so nothing about storage changes.
import type { Badge, BadgeKind } from "../BonusBadges";
import { effectLabel } from "@/lib/effects";

const STATS: [string, string][] = [
  ["str", "Strength"], ["dex", "Dexterity"], ["con", "Constitution"],
  ["int", "Intelligence"], ["wis", "Wisdom"], ["cha", "Charisma"],
];
export const SD_STAT_KEYS = STATS.map(([k]) => k);

// ── Gear bonuses (applied while equipped) ────────────────────────────────────
export type GearBonus = { amount: string | number; target: string };
export const gearBonusKinds: BadgeKind[] = [
  { k: "ac", label: "AC", color: "blue", amount: true, fmt: "{n} AC", tip: "+N Armor Class while equipped" },
  { k: "meleeAtk", label: "Melee Attack", color: "red", amount: true, fmt: "{n} Melee Attack", tip: "+N to melee attack rolls" },
  { k: "meleeDmg", label: "Melee Damage", color: "red", amount: true, fmt: "{n} Melee Damage", tip: "+N to melee damage rolls" },
  { k: "rangedAtk", label: "Ranged Attack", color: "red", amount: true, fmt: "{n} Ranged Attack", tip: "+N to ranged attack rolls" },
  { k: "rangedDmg", label: "Ranged Damage", color: "red", amount: true, fmt: "{n} Ranged Damage", tip: "+N to ranged damage rolls" },
  { k: "stat", label: "Stat", color: "blue", amount: true, target: "stat", fmt: "{n} {t}", tip: "+N to an ability score" },
  { k: "hp", label: "HP", color: "green", amount: true, fmt: "{n} max HP", tip: "+N maximum hit points" },
  { k: "slots", label: "Gear Slots", color: "teal", amount: true, fmt: "{n} Gear Slots", tip: "+N gear slots" },
];
export const gearBonusStats = STATS;
export const gearBonusesToBadges = (list: GearBonus[]): Badge[] =>
  list
    .filter((b) => b && b.target)
    .map((b) => (SD_STAT_KEYS.includes(b.target)
      ? { kind: "stat", target: b.target, amount: Number(b.amount) || 0 }
      : { kind: b.target, amount: Number(b.amount) || 0 }));
export const badgesToGearBonuses = (list: Badge[]): GearBonus[] =>
  list.map((b) => ({ amount: String(b.amount ?? 0), target: b.kind === "stat" ? String(b.target || "str") : b.kind }));

// ── Talent / feature / trait effects ────────────────────────────────────────
export type Effect = { amount: string; target: string; weapon: string; spell: string; feature: string };
const COMBAT: Record<string, Record<string, string>> = {
  melee: { atk: "meleeAtk", dmg: "meleeDmg", atkdmg: "meleeAtkDmg" },
  ranged: { atk: "rangedAtk", dmg: "rangedDmg", atkdmg: "rangedAtkDmg" },
  mr: { atk: "mrAtk", dmg: "mrDmg", atkdmg: "mrAtkDmg" },
};
const COMBAT_CHOICES: [string, string][] = [["atk", "Attack"], ["dmg", "Damage"], ["atkdmg", "Attack & Damage"]];
const STAT_CHOICES: [string, string][] = [...STATS, ["statChoice", "Player Choice"]];

export function effectToBadge(e: Effect): Badge {
  const amount = Number(e.amount) || 0;
  for (const [cat, map] of Object.entries(COMBAT)) {
    const hit = Object.entries(map).find(([, t]) => t === e.target);
    if (hit) return { kind: cat, target: hit[0], amount };
  }
  if (SD_STAT_KEYS.includes(e.target) || e.target === "statChoice") return { kind: "stat", target: e.target, amount };
  if (e.target === "spellKnown" || e.target === "advSpell") return { kind: e.target, ...(e.spell ? { target: e.spell } : {}) };
  if (e.target === "weaponDie") return { kind: e.target, amount, ...(e.weapon ? { target: e.weapon } : {}) };
  if (e.target === "featureCharges") return { kind: e.target, amount, ...(e.feature ? { target: e.feature } : {}) };
  if (e.target === "playerTalent") return { kind: e.target };
  return { kind: e.target, amount };
}

export function badgeToEffect(b: Badge): Effect {
  const e: Effect = { amount: b.amount != null ? String(b.amount) : "", target: b.kind, weapon: "", spell: "", feature: "" };
  if (COMBAT[b.kind]) e.target = COMBAT[b.kind][b.target ?? "atk"] ?? COMBAT[b.kind].atk;
  else if (b.kind === "stat") e.target = b.target || "str";
  else if (b.kind === "spellKnown" || b.kind === "advSpell") e.spell = b.target ?? "";
  else if (b.kind === "weaponDie") e.weapon = b.target ?? "";
  else if (b.kind === "featureCharges") e.feature = b.target ?? "";
  return e;
}

const fmtEffect = (b: Badge) => effectLabel(badgeToEffect(b));

/** Effect badge kinds. Spell / weapon names feed the pickers (free text allowed). */
export function effectKinds(spells: string[], weapons: string[]): BadgeKind[] {
  const spellList = [{ name: "Player Choice", meta: "chosen at creation" }, ...spells.map((n) => ({ name: n }))];
  const weaponList = [{ name: "Strikes", meta: "unarmed" }, ...weapons.map((n) => ({ name: n }))];
  const combat = (k: string, label: string, tip: string): BadgeKind => ({
    k, label, color: "red", amount: true, target: "choice", choices: COMBAT_CHOICES, tip, format: fmtEffect,
  });
  return [
    combat("melee", "Melee", "+N to melee attacks, damage, or both"),
    combat("ranged", "Ranged", "+N to ranged attacks, damage, or both"),
    combat("mr", "Melee & Ranged", "+N to all attacks, damage, or both"),
    { k: "ac", label: "AC", color: "blue", amount: true, tip: "+N Armor Class", format: fmtEffect },
    { k: "hp", label: "HP", color: "green", amount: true, tip: "+N hit points", format: fmtEffect },
    { k: "stat", label: "Stat", color: "blue", amount: true, target: "choice", choices: STAT_CHOICES, tip: "+N to an ability score (or the player's choice)", format: fmtEffect },
    { k: "gearSlots", label: "Gear Slots", color: "teal", amount: true, tip: "+N gear slots", format: fmtEffect },
    { k: "spellCheck", label: "Spellcasting", color: "purple", amount: true, tip: "+N to spellcasting checks", format: fmtEffect },
    { k: "spellKnown", label: "Learn Spell", color: "purple", target: "list", optTarget: true, list: spellList, targetPh: "Spell name (blank = player choice)", tip: "Learn a spell (or the player picks one)", format: fmtEffect },
    { k: "advSpell", label: "Advantage: Spell", color: "purple", target: "list", optTarget: true, list: spellList, targetPh: "Spell name (blank = any)", tip: "Advantage when casting a spell", format: fmtEffect },
    { k: "weaponDie", label: "Weapon Die", color: "gold", amount: true, amountPh: "12 = d12", target: "list", optTarget: true, list: weaponList, targetPh: "Weapon (blank = player choice)", tip: "A weapon's damage die becomes dN", format: fmtEffect },
    { k: "perDay", label: "Uses / Day", color: "gold", amount: true, amountPh: "uses", tip: "Limited use: N times per day (tick boxes on the sheet)", format: fmtEffect },
    { k: "featureCharges", label: "Charges", color: "gold", amount: true, target: "text", optTarget: true, targetPh: "Feature name (blank = this one)", tip: "+N uses of a feature", format: (b) => effectLabel(badgeToEffect(b)) },
    { k: "playerTalent", label: "Player Choice", color: "grey", tip: "The player picks a talent", format: fmtEffect },
  ];
}

