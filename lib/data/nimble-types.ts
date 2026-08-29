// Hand-authored types for the Nimble (2nd edition) data layer: Core Rules,
// Heroes (the classes) and the GM's Guide (bestiary, rewards).
//
// Canonical data lives in data/nimble/parts/{core,heroes,gmg}.json;
// scripts/build-nimble-data.mjs merges them and emits lib/data/nimble-*.ts +
// public/tools-data/nimble-*.js.

export type NimbleBook = "core" | "heroes" | "gmg";
export type NimbleStat = "STR" | "DEX" | "INT" | "WIL";
export const NIMBLE_STATS: NimbleStat[] = ["STR", "DEX", "INT", "WIL"];

export type NimbleSkillName =
  | "Arcana" | "Examination" | "Finesse" | "Influence" | "Insight"
  | "Lore" | "Might" | "Naturecraft" | "Perception" | "Stealth";

export interface NimbleSkill {
  name: NimbleSkillName;
  stat: NimbleStat;
  description: string;
}

export interface NimbleAncestry {
  name: string;
  /** Common or Exotic. */
  group: "Common" | "Exotic";
  size: string;
  description: string;
  /** Named trait(s): "Tenacious. +1 to all skills and Initiative." */
  traits: { name: string; text: string }[];
  page: number;
}

export interface NimbleBackground {
  name: string;
  description: string;
  page: number;
}

export interface NimbleMotivation {
  name: string;
  description: string;
  page: number;
}

/** Armor, shields, weapons, key/misc equipment, magical items, scrolls & wands. */
export interface NimbleItem {
  name: string;
  /** "Cloth" | "Leather" | "Mail" | "Plate" | "Shield" | "Melee Weapon" | "Ranged Weapon" | "Key Equipment" | "Adventuring Gear" | "Magic Item" | "Spell Scroll" | "Wand" */
  category: string;
  /** Armor value text for armor/shields ("2+DEX", "6+DEX (max 2)", "10"). */
  armor?: string;
  /** Weapon damage text ("1d8+STR Slashing"). */
  damage?: string;
  /** Weapon/armor properties as printed ("2-handed, Reach 2", "Req. 2 STR"). */
  properties?: string;
  /** Cost as printed ("60 gp"), or rarity for magic items. */
  cost?: string;
  rarity?: string;
  description?: string;
  page: number;
}

export interface NimbleSpell {
  name: string;
  /** Fire, Ice, Lightning, Wind, Radiant, Necrotic — or Utility. */
  school: string;
  /** 0 for cantrips, 1–9 for tiered spells. */
  tier: number;
  /** "1 Action", "2 Actions", "Casting Time: 1 min"… */
  actions: string;
  /** Single Target / AoE / Self / Utility… */
  targeting?: string;
  text: string;
  /** Utility spells belong to a school's utility list. */
  utility?: boolean;
  page: number;
}

export interface NimbleCondition {
  name: string;
  text: string;
}

export interface NimbleFeature {
  level: number;
  name: string;
  text: string;
}

export interface NimbleAbility {
  name: string;
  text: string;
}

export interface NimbleSubclass {
  name: string;
  /** e.g. "Path of the …" for the Berserker. */
  description: string;
  features: NimbleFeature[];
  /** Story-based subclasses (Oathbreaker, Spellblade, Reaver, Beastmaster) note how they are obtained. */
  story?: string;
  page: number;
}

export interface NimbleClass {
  name: string;
  tagline: string;
  description: string;
  keyStats: NimbleStat[];
  hitDie: number;
  startingHp: number;
  /** "STR+, INT–" as advantaged / disadvantaged saves. */
  saves: { advantaged: NimbleStat; disadvantaged: NimbleStat };
  armor: string;
  weapons: string;
  startingGear: string[];
  /** Every LEVEL n entry from the class table, in order. */
  features: NimbleFeature[];
  /** The class's choosable ability pool (Savage Arsenal, Underhanded Abilities, Spellshaper…). */
  abilityPool?: { name: string; note?: string; abilities: NimbleAbility[] };
  /** Secondary pools (e.g. Stormshifter Direbeast Forms, Shepherd Sacred Graces…). */
  extraPools?: { name: string; note?: string; abilities: NimbleAbility[] }[];
  subclasses: NimbleSubclass[];
  /** Spellcasting summary if the class casts (schools, mana progression note). */
  spellcasting?: string;
  page: number;
}

export interface NimbleMonsterAbility {
  name: string;
  text: string;
}

export interface NimbleMonster {
  name: string;
  /** Group heading in the bestiary (Kobolds, Goblins, Undead…) or "Legendary". */
  family: string;
  /** Printed level, e.g. "1/4", "1", "3", "Solo 5". */
  level: string;
  size?: string;
  hp: number | null;
  /** "M" medium / "H" heavy / null. */
  armor: "M" | "H" | null;
  /** Legendary saves line, e.g. "STR+++, DEX–". */
  saves?: string;
  legendary: boolean;
  minion: boolean;
  abilities: NimbleMonsterAbility[];
  /** Family-wide traits that apply (e.g. Kobolds' "Nooooo!"). */
  familyTrait?: string;
  description?: string;
  page: number;
}

export interface NimbleMonsterFamily {
  name: string;
  blurb: string;
  trait?: string;
  sampleEncounters?: string[];
  loot?: string;
  page: number;
}

export interface NimbleTables {
  statDescriptions: Record<NimbleStat, string>;
  difficulties: { name: string; dc: string; example: string }[];
  statArrays: { name: string; values: number[] }[];
  languages: { name: string; spokenBy: string }[];
  creation: {
    skillPointsAtL1: number;
    inventorySlotsBase: number;
    maxWounds: number;
    speed: number;
    actions: number;
    startingGold: number;
    maxStat: number;
    maxSkill: number;
  };
  sizes: { name: string; text: string }[];
  weaponProperties: { name: string; text: string }[];
  rests: { name: string; text: string }[];
  downtime: { name: string; text: string }[];
  lodging: { name: string; cost: string; text: string }[];
  /** GM Guide reward tables: temporary boons, epic boons, lodging boons… */
  boons: { kind: string; name: string; text: string }[];
  /** Monster builder / encounter guidelines summarised. */
  encounters: { name: string; text: string }[];
  /** Short reminders for the sheet's help panel. */
  quickRules: { title: string; text: string }[];
}
