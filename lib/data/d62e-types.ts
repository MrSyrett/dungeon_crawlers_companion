// Hand-authored types for D6 System: Second Edition (D62e), Gallant Knight
// Games 2024 — a genre-agnostic evolution of the West End Games D6 System.
//
// One book, four genre lenses. Every row is tagged with a `genre`
// ("core" applies to every game; "fantasy" / "scifi" / "superhero" are the
// genre modules). Unlike the Star Wars data there is no book layering.
//
// Die codes ("3D+2") are stored as pips where 1D = 3 pips and each +1 = 1 pip
// (3D+2 = 11). lib/d62e-dice.ts has code()/pips(); the sheet has the twins.
//
// Canonical data: data/d62e/parts/*.json → scripts/build-d62e-data.mjs.

export type D62eGenre = "core" | "fantasy" | "scifi" | "superhero";

/** The four core attributes. Genre modules add more (stored in the attributes list). */
export type D62eCoreAttribute = "Agility" | "Brawn" | "Knowledge" | "Perception";
export const D62E_ATTRIBUTES: D62eCoreAttribute[] = ["Agility", "Brawn", "Knowledge", "Perception"];

export interface D62eAttributeInfo {
  name: string;
  /** True for the four core attributes; false for optional/genre attributes. */
  core: boolean;
  description: string;
  genre: D62eGenre;
  page: number;
}

export interface D62eSkill {
  name: string;
  /** Governing attribute name. */
  attribute: string;
  genre: D62eGenre;
  description: string;
  /** Sample specializations, if the book lists any. */
  specializations?: string[];
  /** How long a use takes, when noted. */
  time?: string;
  page: number;
}

export interface D62eTemplateSkill {
  name: string;
  /** The skill's die code in pips (absent when the template lists a skill without a code). */
  pips?: number;
}

/** A "partially completed character" — pick one and add 7D of skills. */
export interface D62eTemplate {
  name: string;
  genre: D62eGenre;
  archetype?: string;
  /** Attribute die codes in pips (the four core plus any genre attributes). */
  attributes: Record<string, number>;
  /** Pre-set skill die codes, if the template lists any. */
  skills?: D62eTemplateSkill[];
  perks?: string[];
  flaws?: string[];
  talents?: string[];
  equipment: string[];
  heroPoints?: number;
  description?: string;
  quote?: string;
  page: number;
}

export interface D62eEquipment {
  name: string;
  /** "weapon" | "armor" | "gear". */
  category: string;
  genre: D62eGenre;
  era?: string;
  /** Weapons: damage die-code text (e.g. "STR+2D", "5D"). */
  damage?: string | null;
  range?: string | null;
  skill?: string | null;
  /** Armor: protection text (e.g. "+2D physical / +1D energy"). */
  protection?: string | null;
  cost?: string | null;
  description?: string;
  page: number;
}

export interface D62eCreature {
  name: string;
  genre: D62eGenre;
  kind?: string;
  /** Attribute die codes in pips (partial allowed). */
  attributes: Record<string, number>;
  /** Skill lines as printed, e.g. "brawling 4D". */
  skills?: string[];
  talents?: string[];
  powers?: string[];
  special?: string[];
  move?: string;
  description?: string;
  page: number;
}

export interface D62ePerk {
  name: string;
  /** "perk" | "flaw" | "talent" | "trouble" | "asset". */
  kind: string;
  /** Printed die/point cost (perks cost, flaws give back). */
  cost?: string | null;
  description: string;
  genre: D62eGenre;
  page: number;
}

export interface D62ePower {
  name: string;
  /** "superpower" | "psionic" | "magic". */
  kind: string;
  genre: D62eGenre;
  skill?: string | null;
  difficulty?: string | null;
  cost?: string | null;
  description: string;
  options?: string[];
  page: number;
}

export interface D62eVehicleWeapon {
  name: string;
  damage?: string;
  fireControl?: string;
  range?: string;
  notes?: string;
}

export interface D62eVehicle {
  name: string;
  kind: string;
  genre: D62eGenre;
  scale?: string;
  crew?: string;
  passengers?: string;
  cargo?: string;
  speed?: string;
  maneuver?: string;
  body?: string;
  shields?: string;
  weapons?: D62eVehicleWeapon[];
  cost?: string;
  description?: string;
  page: number;
}

export interface D62eModule {
  name: string;
  /** "Core Module" | "Fantasy Module" | "Science Fiction Module" | "Superhero Module". */
  category: string;
  genre: D62eGenre;
  summary: string;
  page: number;
}

export interface D62eTables {
  difficulties: { name: string; range: string; text: string }[];
  woundLevels: { name: string; text: string }[];
  damageResults: { range: string; text: string }[];
  combatModifiers: { name: string; text: string }[];
  creation: {
    attributeDice: string;
    skillDice: string;
    heroPoints: number;
    dodge: string;
    parry: string;
    note?: string;
  };
  heroPoints: { name: string; text: string }[];
  /** Short reminders for the sheet's help panel. */
  quickRules: { title: string; text: string }[];
}
