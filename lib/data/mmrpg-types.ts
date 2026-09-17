// GENERATED consumers rely on these shapes; the build asserts data against them.
// Marvel Multiverse RPG (d616). SystemKey MMRPG.
export type MmrpgGenre = "core";

export interface MmrpgOrigin {
  name: string;
  genre: MmrpgGenre;
  description: string;
  examples?: string;
  tags?: string;
  traits?: string;
  /** Suggested occupation. */
  occupation?: string;
  /** Powers granted/required by the origin (must be picked first). */
  powers?: string;
  limitation?: string;
  source?: string;
}

export interface MmrpgOccupation {
  name: string;
  genre: MmrpgGenre;
  description: string;
  examples?: string;
  tags?: string;
  traits?: string;
  source?: string;
}

export interface MmrpgTrait {
  name: string;
  genre: MmrpgGenre;
  description: string;
  source?: string;
}

export interface MmrpgTag {
  name: string;
  genre: MmrpgGenre;
  description: string;
  source?: string;
}

export interface MmrpgAbilities {
  melee: number;
  agility: number;
  resilience: number;
  vigilance: number;
  ego: number;
  logic: number;
}

/** A pre-generated hero/villain stat block from the core rulebook (Chapter 8). */
export interface MmrpgCharacter {
  id: string;
  name: string;
  realName?: string;
  genre: MmrpgGenre;
  rank: number;
  health: number;
  focus: number;
  karma: number | null;
  abilities: MmrpgAbilities;
  speed?: Record<string, number>;
  occupation?: string;
  origin?: string;
  teams?: string;
  base?: string;
  /** Traits carried by the character (name + any parenthetical). */
  traits?: string[];
  /** Tags carried by the character. */
  tags?: string[];
  /** Powers grouped by power set ("" or "Basic" = basic powers). */
  powers?: { set: string; names: string[] }[];
  source?: string;
}

/** A piece of equipment — weapon, gear or vehicle. Core book has weapons;
 *  gear and vehicles arrive with the expansions. */
export interface MmrpgEquipment {
  name: string;
  /** "Weapon" | "Gear" | "Vehicle". */
  category: string;
  /** Weapons: "melee" | "ranged". */
  weaponClass?: string;
  /** Ability a weapon attacks with. */
  ability?: string;
  /** "Reach" for close weapons, or a number of spaces for ranged. */
  range?: string;
  /** Display string for the damage-multiplier bonus ("+1", "×2", "—"). */
  damageBonus?: string;
  /** Numeric bonus added to the damage multiplier (rank + multBonus). */
  multBonus?: number;
  /** A flat damage multiplier that replaces the attacker's (e.g. a grenade's ×2). */
  flatMult?: number;
  /** Deals no Health damage (e.g. a flash-bang). */
  noDamage?: boolean;
  notes?: string;
  source?: string;
}

export interface MmrpgPower {
  name: string;
  genre: MmrpgGenre;
  /** Power set the power belongs to ("None" = a basic power). */
  powerSet: string;
  prerequisites?: string;
  action?: string;
  trigger?: string;
  duration?: string;
  range?: string;
  cost?: string;
  effect: string;
  fantastic?: string;
  description?: string;
  source?: string;
}
