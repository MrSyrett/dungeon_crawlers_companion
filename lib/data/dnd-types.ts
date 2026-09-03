// Hand-authored types for the Dungeons & Dragons 2024 rules layer.
//
// Mechanics (ability scores, class tables, level progressions, spell
// parameters, stat blocks, item stats) are facts/game-mechanics. Descriptive
// text is either adapted in original wording or drawn from the System Reference
// Document 5.2, released by Wizards of the Coast under CC-BY-4.0 (attribution
// lives in data/dnd/LICENSE.md and on the reference pages).
//
// Canonical data: data/dnd/parts/*.json → scripts/build-dnd-data.mjs →
//   lib/data/dnd-*.ts (typed const for Next pages) +
//   public/tools-data/dnd-*.js (global const for the HTML sheet/GM screen).

// ── Core scales ───────────────────────────────────────────────────────────
export type DndAbility = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
export const DND_ABILITIES: DndAbility[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const DND_ABILITY_NAMES: Record<DndAbility, string> = {
  STR: "Strength", DEX: "Dexterity", CON: "Constitution",
  INT: "Intelligence", WIS: "Wisdom", CHA: "Charisma",
};

/** Source book an entry comes from; "srd" marks CC-BY licensed text.
 *  "Homebrew" marks a user-created entry (lib/homebrew.ts) merged into a pool. */
export type DndSource = "phb" | "dmg" | "mm" | "srd" | "eberron" | "forgotten-realms" | "Homebrew";

export type DndDamageType =
  | "acid" | "bludgeoning" | "cold" | "fire" | "force" | "lightning"
  | "necrotic" | "piercing" | "poison" | "psychic" | "radiant" | "slashing" | "thunder";

export type DndSize = "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";

export interface DndSkillInfo {
  name: string;
  ability: DndAbility;
  description: string;
}

// ── Classes ───────────────────────────────────────────────────────────────
/** One entry in a class's per-level table (levels 1–20). */
export interface DndClassLevel {
  level: number;
  /** Proficiency bonus at this level (+2 … +6). */
  profBonus: number;
  /** Names of the features gained at this level (detailed in `features`). */
  features: string[];
  /** Extra numeric columns keyed by header, e.g. { "Rages": "3", "Rage Damage": "+2" }. */
  columns?: Record<string, string>;
  /** Spell slots by slot level for full/half/pact casters, index 0 = 1st-level. */
  spellSlots?: number[];
  /** Cantrips / spells known / prepared, etc., when the class tracks them. */
  cantripsKnown?: number;
  spellsKnown?: number;
}

export interface DndClassFeature {
  name: string;
  level: number;
  /** The subclass this feature belongs to, if any. */
  subclass?: string;
  description: string;
  source: DndSource;
  /** Homebrew: optional rollable effect surfaced as a button on the sheet. */
  damage?: string;      // dice, e.g. "2d6"
  damageType?: string;  // e.g. "fire"
  heal?: string;        // dice, e.g. "1d8+3"
}

export interface DndSubclass {
  name: string;
  className: string;
  flavor: string;
  features: DndClassFeature[];
  source: DndSource;
}

export interface DndClass {
  name: string;
  /** Primary ability/abilities for the class. */
  primaryAbility: DndAbility[];
  hitDie: number; // 6, 8, 10, 12
  savingThrows: DndAbility[];
  /** Proficiencies granted at level 1. */
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skillsChoose: number;
    skillsFrom: string[];
  };
  startingEquipment: string[];
  /** "full" | "half" | "third" | "pact" | "none". */
  spellcasting: DndCasterType;
  spellcastingAbility?: DndAbility;
  /** The 1–20 progression table. */
  table: DndClassLevel[];
  /** Base-class features (not subclass) across all levels. */
  features: DndClassFeature[];
  subclasses: DndSubclass[];
  /** Level at which the subclass is chosen. */
  subclassLevel: number;
  subclassLabel: string; // e.g. "Primal Path", "Divine Domain"
  flavor: string;
  source: DndSource;
}

export type DndCasterType = "full" | "half" | "third" | "pact" | "artificer" | "none";

// ── Species (races) & backgrounds ─────────────────────────────────────────
export interface DndSpeciesTrait {
  name: string;
  description: string;
}

export interface DndSpecies {
  name: string;
  size: DndSize | DndSize[];
  speed: number;
  /** Darkvision range in feet, 0 if none. */
  darkvision: number;
  creatureType: string; // "Humanoid", etc.
  traits: DndSpeciesTrait[];
  /** Lineages / sub-options within the species (e.g. Elf: High/Wood/Drow). */
  lineages?: { name: string; traits: DndSpeciesTrait[] }[];
  flavor: string;
  source: DndSource;
}

export interface DndBackground {
  name: string;
  /** The three ability scores this background can raise (2024 style). */
  abilityScores: DndAbility[];
  feat: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  /** Fixed starting equipment or gold. */
  equipment: string[];
  description: string;
  source: DndSource;
}

// ── Feats ─────────────────────────────────────────────────────────────────
export type DndFeatCategory = "Origin" | "General" | "Fighting Style" | "Epic Boon";

export interface DndFeat {
  name: string;
  category: DndFeatCategory;
  /** Prerequisite text, empty if none. */
  prerequisite: string;
  /** Ability score increase this feat can grant, if any. */
  abilityScores?: DndAbility[];
  /** The feat's benefit bullets, in original wording / SRD. */
  benefits: string[];
  repeatable?: boolean;
  source: DndSource;
}

// ── Spells ────────────────────────────────────────────────────────────────
export interface DndSpell {
  name: string;
  level: number; // 0 = cantrip
  school: string; // "Evocation", …
  castingTime: string;
  range: string;
  components: string; // "V, S, M (a pinch of dust)"
  duration: string;
  concentration: boolean;
  ritual: boolean;
  /** Classes whose lists include the spell. */
  classes: string[];
  description: string;
  /** "At Higher Levels" / cantrip-scaling text. */
  higherLevels?: string;
  source: DndSource;
  /** Homebrew: structured combat fields the sheet rolls on cast. */
  roll?: "attack" | "save";
  saveAbility?: DndAbility;
  damage?: string;      // dice, e.g. "3d6"
  damageType?: string;  // e.g. "fire"
  heal?: string;        // dice, e.g. "2d8"
  upcast?: string;      // extra dice per slot level above base, e.g. "1d6"
}

// ── Equipment ─────────────────────────────────────────────────────────────
export interface DndWeapon {
  name: string;
  category: "Simple" | "Martial";
  kind: "Melee" | "Ranged";
  cost: string;
  damage: string; // "1d8"
  damageType: DndDamageType;
  weight: string;
  properties: string[];
  mastery: string; // 2024 weapon mastery property
  source: DndSource;
}

export interface DndArmor {
  name: string;
  category: "Light" | "Medium" | "Heavy" | "Shield";
  cost: string;
  baseAC: string; // "11 + Dex modifier", "18", "+2"
  strength: string; // min STR requirement text
  stealthDisadvantage: boolean;
  weight: string;
  source: DndSource;
}

export interface DndGear {
  name: string;
  category: string; // "Adventuring Gear", "Tools", "Mounts", …
  cost: string;
  weight: string;
  description?: string;
  source: DndSource;
}

// ── Magic items ───────────────────────────────────────────────────────────
export interface DndMagicItem {
  name: string;
  type: string; // "Wondrous Item", "Weapon (any)", …
  rarity: "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" | "Artifact" | "Varies";
  attunement: boolean;
  attunementNote?: string;
  description: string;
  source: DndSource;
  /** Homebrew: mechanical bonuses the sheet applies while equipped, and the base
   *  weapon that makes a "Weapon (X)" item equippable as an attack. */
  bonuses?: { target: string; amount: number }[];
  baseWeapon?: string;
}

// ── Monsters ──────────────────────────────────────────────────────────────
export interface DndMonsterAction {
  name: string;
  description: string;
}

export interface DndMonster {
  name: string;
  size: DndSize;
  type: string; // "Dragon", "Undead (Wizard)", …
  alignment: string;
  ac: number;
  acNote?: string; // "(natural armor)"
  hp: number;
  hpFormula: string; // "18 (4d8)"
  speed: string;
  abilities: Record<DndAbility, number>;
  savingThrows?: string;
  skills?: string;
  senses: string;
  languages: string;
  cr: string; // "1/4", "5", …
  xp: number;
  proficiencyBonus: number;
  damageResistances?: string;
  damageImmunities?: string;
  damageVulnerabilities?: string;
  conditionImmunities?: string;
  traits: DndMonsterAction[];
  actions: DndMonsterAction[];
  bonusActions?: DndMonsterAction[];
  reactions?: DndMonsterAction[];
  legendaryActions?: DndMonsterAction[];
  /** Grouping for the GM-screen bestiary picker. */
  group?: string;
  source: DndSource;
}

// ── Rules glossary / conditions ───────────────────────────────────────────
export interface DndCondition {
  name: string;
  description: string;
}

export interface DndRule {
  name: string;
  category: string; // "Combat", "Exploration", "The Order of Combat", …
  text: string;
}

// ── Tables / creation data ────────────────────────────────────────────────
export interface DndTables {
  /** Standard array, point-buy costs, level→proficiency, XP thresholds, etc. */
  standardArray: number[];
  pointBuyCosts: Record<string, number>;
  proficiencyByLevel: number[];
  /** Encumbrance, carrying capacity multipliers, and other misc lookups. */
  misc: Record<string, unknown>;
}
