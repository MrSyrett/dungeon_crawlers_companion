// Hand-authored types for the Dragonbane data layer.
//
// Canonical data: data/db/parts/*.mjs → scripts/build-db-data.mjs →
//   lib/data/db-data.ts (typed consts for Next pages) +
//   public/tools-data/db-data.js (window.DB_* globals for the sheet / GM Screen / prep builder).
// Records carry an index signature so optional, record-specific fields (flags such as
// `metal`, `flying`, `poison`…) stay typed as `unknown` rather than failing excess-property checks.

export type DbAttr = "STR" | "CON" | "AGL" | "INT" | "WIL" | "CHA";
export type DbSource = "core" | "Homebrew";
export type DbSupply = "Common" | "Uncommon" | "Rare" | "Unique";
export type DbCoinUnit = "gold" | "silver" | "copper";
export interface DbCost { amount: number; unit: DbCoinUnit; per?: string; note?: string }

export interface DbAttribute { id: DbAttr; name: string; condition: string; text: string }
export interface DbCondition { id: string; name: string; attribute: DbAttr }

export interface DbSkill {
  id: string; name: string; attribute: DbAttr; type: "general" | "weapon" | "secondary"; school?: boolean; page: number; text: string;
  [k: string]: unknown;
}

export interface DbKinAbility { id: string; name: string; wp: number | null; timing: string; text: string }
export interface DbKin {
  id: string; name: string; page: number; roll: [number, number]; movement: number; text: string;
  abilities: DbKinAbility[]; names: string[]; [k: string]: unknown;
}

export interface DbKitItem { name?: string; choice?: string[]; qty?: number; note?: string }
export interface DbKit { items: DbKitItem[]; food: string; silver: string }
export interface DbProfession {
  id: string; name: string; page: number; roll: number; keyAttribute: DbAttr; text: string;
  skills: string[]; schoolSkills?: Record<string, string[]>;
  heroicAbilities: string[]; heroicChoice?: boolean; mage?: boolean;
  magic?: { startingSpells: number; startingRank: number; startingTricks: number; from: string; grimoire: boolean };
  kits: DbKit[]; nicknames: string[]; [k: string]: unknown;
}

export interface DbRequirement { skills?: string[]; any?: "melee" | "strMelee" | "weapon" | "magic"; level: number }
export interface DbHeroicAbility {
  id: string; name: string; requirement: DbRequirement | null; wp: number | null | "varies";
  timing: "action" | "free" | "reaction" | "passive" | "downtime" | "roundStart" | string;
  page: number; text: string; repeatable?: boolean; tags?: string[]; damage?: string; hpMax?: number; wpMax?: number;
  [k: string]: unknown;
}

export type DbSchool = "General" | "Animism" | "Elementalism" | "Mentalism";
export interface DbDice { base: string; perLevel: string; chain?: string[] }
export interface DbSpell {
  id: string; name: string; school: DbSchool | string; rank: number; prerequisite: string;
  requirements: string[]; requirementDetail?: string; castingTime: "action" | "reaction" | "stretch" | "shift" | string;
  range: string; duration: string; page: number; text: string;
  powerLevels: boolean; dodge: boolean; parry: boolean; damage?: DbDice; healing?: DbDice;
  [k: string]: unknown;
}
export interface DbMagicTrick { id: string; name: string; school: DbSchool | string; page: number; text: string; [k: string]: unknown }
export interface DbSummon {
  id: string; name: string; spell: string; movement: number; hpPerLevel: number; armor: number | null;
  attack: { name: string; damage: string; type: string; note: string }; abilities: string[]; resistances: string[]; immunities: string[];
  [k: string]: unknown;
}

export interface DbArmor { id: string; name: string; rating: number; cost: DbCost; supply: DbSupply; banes: string[]; metal: boolean; page: number; [k: string]: unknown }
export interface DbWeapon {
  id: string; name: string; grip: "1H" | "2H" | null; str: number | null; range: number | string; damage: string;
  durability: number | null; cost: DbCost | null; supply: DbSupply | null; features: string[]; skill: string | null;
  melee?: boolean; ranged?: boolean; [k: string]: unknown;
}
export interface DbGear {
  id: string; category: string; name: string; cost: DbCost | null; supply: DbSupply; weight: number | null; effect: string;
  [k: string]: unknown;
}

export interface DbMonsterAttack {
  roll: number; name: string; damage: string | null; type: string | null; targets: string; range: number;
  fear: boolean | "bane"; conditions: string[]; prone: boolean; parry: boolean; dodge: boolean; text: string;
  [k: string]: unknown;
}
export interface DbMonster {
  id: string; name: string; page: number; ferocity: number; size: "Small" | "Normal" | "Large" | "Huge" | "Swarm" | string;
  movement: number; armor: number | string | null; hp: number; text: string;
  traits: { name: string; text: string }[]; attacks: DbMonsterAttack[]; source?: DbSource;
  [k: string]: unknown;
}
export interface DbNpcWeapon { name: string; skill: number; damage: string; qty?: number }
export interface DbNpc {
  id: string; name: string; kind: string; page: number; boss?: boolean; movement?: number;
  damageBonus: Partial<Record<"STR" | "AGL", string>> | null; hp: number; wp: number | null;
  armor?: { name: string; rating: number } | null; skills: Record<string, number>; abilities: string[];
  weapons?: DbNpcWeapon[]; gear?: string[]; spells?: string[]; traits?: string[]; source?: DbSource;
  [k: string]: unknown;
}
export interface DbAnimal {
  id: string; name: string; movement: number; hp: number; attack: { name: string; skill: number; damage: string };
  skills: Record<string, number>; page: number; [k: string]: unknown;
}

export interface DbRollEntry { roll?: number | [number, number]; text: string; name?: string; [k: string]: unknown }
export interface DbTableColumn { die: string; name: string; values: string[] }
export interface DbTable {
  id: string; name: string; die?: string | null; page: number; note?: string;
  rows?: DbRollEntry[]; columns?: DbTableColumn[]; [k: string]: unknown;
}
