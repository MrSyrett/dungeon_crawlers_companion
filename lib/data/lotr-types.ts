// Hand-authored types for The Lord of the Rings Roleplaying (5E) data layer.
//
// Canonical data: data/lotr/parts/*.mjs → scripts/build-lotr-data.mjs →
//   lib/data/lotr-data.ts (typed consts for Next pages) +
//   public/tools-data/lotr-data.js (globals for the sheet / GM Screen / builder).
// Shapes deliberately mirror the D&D records (lib/data/dnd-types.ts) wherever
// the rules overlap, so the 5E sheet/GM-screen plumbing can be shared.

import type { DndAbility, DndClassFeature, DndClassLevel, DndMonster, DndWeapon, DndArmor, DndGear } from "./dnd-types";

// LotR records use source "core"; the D&D shapes are reused with that widened.
type WithSrc<T> = Omit<T, "source"> & { source: string };
export type LotrFeature = WithSrc<DndClassFeature> & { uses?: string; [k: string]: unknown };

export type LotrAbility = DndAbility;
export type LotrSource = "core" | "Homebrew";

export interface LotrSkill { name: string; ability: LotrAbility; description: string; lotr?: boolean }
export interface LotrTrait { name: string; description: string }

export interface LotrCulture {
  name: string; flavor: string; size: string; speed: number; darkvision: number; creatureType: string;
  asi: Partial<Record<LotrAbility, number>>; asiChoice?: { count: number; amount: number };
  age: string; standardOfLiving: string; languages: string[]; startingVirtue: boolean;
  traits: LotrTrait[];
  grants?: Record<string, unknown>;
  names: { female: string; male: string; family: string };
  lineages: { name: string; asi: Partial<Record<LotrAbility, number>>; traits: LotrTrait[]; grants?: Record<string, unknown> }[];
  source: LotrSource;
}

export interface LotrBackground {
  culture: string; name: string; skillProficiencies: string[]; skillChoice?: { count: number; from: string[] };
  toolProficiencies: string[]; distinctiveFeatures: string[]; description: string; source: LotrSource;
}

export interface LotrSubcalling { name: string; className: string; flavor: string; features: LotrFeature[]; source: string }
export interface LotrCalling {
  name: string; flavor: string; primaryAbility: LotrAbility[]; hitDie: number; savingThrows: LotrAbility[];
  proficiencies: { armor: string[]; weapons: string[]; tools: string[]; skillsChoose: number; skillsFrom: string[] };
  startingEquipment: string[]; equipmentChoices: string[][][];
  spellcasting: "none"; shadowPath: string; virtueLevels: number[]; craftOrVirtueLevels: number[]; fightingStyles: string[];
  subclassLevel: number; subclassLabel: string; table: DndClassLevel[]; features: LotrFeature[]; subclasses: LotrSubcalling[];
  sneakAttack?: number[]; craftSlots?: number[]; favouredFoes?: string[]; wardedLands?: string[];
  favouredFoeCount?: number[]; wardedLandCount?: number[];
  source: string;
}

export interface LotrVirtue {
  name: string; category: string; flavor?: string;
  asi: { choose?: LotrAbility[]; amount?: number; prowess?: boolean } | null;
  benefits: string[]; uses?: string; mods?: Record<string, unknown>; grants?: Record<string, unknown>; companion?: string; source: LotrSource;
}

export interface LotrReward { name: string; item: string; description: string }
export interface LotrEnchantedReward { name: string; craftsmanship: string[]; item: string; bane: boolean | string; description: string }
export interface LotrCraft { name: string; description: string }
export interface LotrStyle { name: string; description: string }
export interface LotrCondition { name: string; description: string; lotr?: boolean }

export type LotrMonster = WithSrc<DndMonster> & { description?: string; group: string };
export type LotrWeapon = WithSrc<DndWeapon>;
export type LotrArmor = WithSrc<DndArmor> & { fatigueDisadvantage: boolean };
export type LotrGear = WithSrc<DndGear>;

export interface LotrPatron { name: string; race: string; callings: string[]; fellowship: number; advantage: string; advantageText: string; agenda: string; where: string; description: string }
