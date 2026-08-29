// Hand-authored types for Star Wars: The Roleplaying Game (West End Games,
// 1st edition 1987), The Star Wars Sourcebook (1987) and the Rules Companion
// (1989) revisions layered on top.
//
// Everything is measured in six-sided dice: a "die code" like 3D+2 is stored
// as pips (3D+2 = 11 pips; one die = 3 pips) so the sheet can add and round
// codes the way the Companion describes. `toCode()`/`fromCode()` live in
// lib/sw-dice.ts and in the sheet.
//
// Canonical data: data/sw/parts/{core,companion}.json → scripts/build-sw-data.mjs.

export type SwBook = "core" | "sourcebook" | "companion";

export type SwAttribute = "Dexterity" | "Knowledge" | "Mechanical" | "Perception" | "Strength" | "Technical";
export const SW_ATTRIBUTES: SwAttribute[] = ["Dexterity", "Knowledge", "Mechanical", "Perception", "Strength", "Technical"];

export interface SwAttributeInfo {
  name: SwAttribute;
  description: string;
}

export interface SwSkill {
  name: string;
  attribute: SwAttribute;
  description: string;
  /** Companion: how long a use takes, e.g. "one round", "one hour". */
  time?: string;
  /** Companion-added or -revised skill. */
  book: SwBook;
  /** Reaction skills (dodge, parry…) can be used out of turn. */
  reaction?: boolean;
  page: number;
  /** The core entry this Companion revision replaced (set by the build). */
  superseded?: SwSkill;
}

/** One of the 24 character templates. */
export interface SwTemplate {
  name: string;
  /** Attribute die codes in pips (3D+1 = 10). */
  attributes: Record<SwAttribute, number>;
  background: string;
  personality: string;
  quote?: string;
  connection?: string;
  specialRule?: string;
  equipment: string[];
  /** Starting credits, if stated in the equipment list. */
  credits?: string;
  page: number;
}

export interface SwWeapon {
  name: string;
  /** Blaster, Melee, Grenade, Heavy, Vehicle, Starship… */
  kind: string;
  /** Damage die code in pips, or null when variable. */
  damage: number | null;
  damageText?: string;
  /** Range bands as printed, e.g. "3-10/30/120". */
  range?: string;
  /** Skill used to fire it. */
  skill?: string;
  notes?: string;
  cost?: string;
  availability?: string;
  book: SwBook;
  page: number;
  /** The core entry this Companion revision replaced (set by the build). */
  superseded?: SwWeapon;
}

export interface SwGear {
  name: string;
  /** Armor, Medical, Tool, Communication, Survival, Droid, Misc… */
  category: string;
  description: string;
  cost?: string;
  /** Armor: protection die code in pips; other stats as text. */
  stats?: string;
  book: SwBook;
  page: number;
  /** The core entry this Companion revision replaced (set by the build). */
  superseded?: SwGear;
}

export interface SwVehicleWeapon {
  name: string;
  count?: string;
  fireControl?: string;
  damage?: string;
  range?: string;
  notes?: string;
}

/** Starships, capital ships, speeders, walkers. */
export interface SwVehicle {
  name: string;
  /** Starfighter, Space Transport, Capital Ship, Speeder, Walker, Airspeeder… */
  kind: string;
  craft?: string;
  scale?: string;
  crew?: string;
  passengers?: string;
  cargo?: string;
  consumables?: string;
  hyperdrive?: string;
  nav?: string;
  /** Space speed / Speed code as printed. */
  speed?: string;
  atmosphere?: string;
  maneuverability?: string;
  hull?: string;
  shields?: string;
  sensors?: string;
  weapons: SwVehicleWeapon[];
  description?: string;
  cost?: string;
  book: SwBook;
  page: number;
  /** The core entry this Companion revision replaced (set by the build). */
  superseded?: SwVehicle;
}

/** GM characters: stormtroopers, officers, aliens, droids, creatures. */
export interface SwCharacter {
  name: string;
  /** Imperial, Rebel, Civilian, Alien, Droid, Creature… */
  group: string;
  description?: string;
  /** Attribute die codes in pips (partial for creatures); for a species this is the typical member. */
  attributes: Partial<Record<SwAttribute, number>>;
  /** Sourcebook species: allowed range per attribute as printed, e.g. "1D/4D". */
  attributeRange?: Partial<Record<SwAttribute, string>>;
  /** Move rate as printed (Sourcebook). */
  move?: string;
  /** "blaster 4D" style skill lines, as printed. */
  skills: string[];
  equipment: string[];
  /** Move, special abilities, etc. */
  notes?: string;
  book: SwBook;
  page: number;
  /** The core entry this Companion revision replaced (set by the build). */
  superseded?: SwCharacter;
}

export interface SwForcePower {
  name: string;
  /** Control, Sense, Alter, or combinations like "Control & Sense". */
  attribute: string;
  difficulty: string;
  time?: string;
  /** Prerequisite powers, if any. */
  requires?: string[];
  description: string;
  book: SwBook;
  page: number;
  /** The core entry this Companion revision replaced (set by the build). */
  superseded?: SwForcePower;
}

export interface SwTables {
  attributes: SwAttributeInfo[];
  difficulties: { name: string; range: string; text: string }[];
  woundLevels: { name: string; text: string }[];
  damageResults: { range: string; text: string }[];
  ranges: { name: string; modifier: string; text: string }[];
  combatModifiers: { name: string; text: string }[];
  creation: { attributeDice: string; skillDice: number; templateNote: string; forcePoints: number; skillPointsNote: string };
  advancement: { name: string; text: string }[];
  force: { name: string; text: string }[];
  starship: { name: string; text: string }[];
  /** Short reminders for the sheet's help panel. */
  quickRules: { title: string; text: string; book: SwBook }[];
  /** Core tables replaced by a Companion revision, keyed like the fields above. */
  superseded: Partial<Record<"difficulties" | "woundLevels" | "damageResults" | "ranges" | "combatModifiers" | "advancement" | "force" | "starship", { name?: string; range?: string; modifier?: string; text: string }[]>>;
}
