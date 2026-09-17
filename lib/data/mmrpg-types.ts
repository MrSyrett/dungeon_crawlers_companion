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

/** Automation hints the character sheet applies for a condition (mirrors the
 *  sheet's CONDMECH). Ability keys are lowercase (melee/agility/…). */
export interface MmrpgConditionMech {
  halveSpeed?: boolean;
  troubleAll?: boolean;
  trouble?: string[];
  troubleAtk?: string[];
  disable?: string[];
  disableAll?: boolean;
  noMove?: boolean;
}
export interface MmrpgCondition {
  name: string;
  genre: MmrpgGenre;
  description: string;
  source?: string;
  /** Present when the sheet auto-applies penalties for this condition. */
  mech?: MmrpgConditionMech;
}

export interface MmrpgVehicle {
  name: string;
  genre: MmrpgGenre;
  /** "Named" (a specific vehicle) or "Basic" (generic type). */
  tier: string;
  size?: string;
  speed?: string;
  health?: string;
  damageReduction?: string;
  passengers?: string;
  description?: string;
  powers?: string;
  notes?: string;
  weapons?: string;
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
  /** Distinguishing features (blank when the book lists "None"). */
  features?: string;
  /** History narrative. */
  history?: string;
  /** Personality narrative. */
  personality?: string;
  /** Traits carried by the character (name + any parenthetical). */
  traits?: string[];
  /** Tags carried by the character. */
  tags?: string[];
  /** Powers grouped by power set ("" or "Basic" = basic powers). */
  powers?: { set: string; names: string[] }[];
  /** Starting equipment (names referencing MmrpgEquipment), e.g. an iconic weapon. */
  equipment?: string[];
  source?: string;
}

/** Movement mode granted by a power or piece of equipment. The sheet computes
 *  the speed as `mult` × the character's `base` speed (currently always "run"). */
export interface MmrpgMovementGrant {
  /** "Flight" | "Glide" | "Swingline" | "Climb" | … */
  mode: string;
  /** Multiplier applied to the base speed. */
  mult: number;
  /** Base speed the multiplier applies to (default "run"). */
  base?: string;
}

/** A piece of equipment. Organised on two axes:
 *  tier = Common | Narrative | Iconic, and type = Weapon | Item | Armor.
 *  The core book has the common weapons plus the iconic weapons/items pulled
 *  from the Characters chapter; narrative gear and armor arrive with expansions. */
export interface MmrpgEquipment {
  name: string;
  /** "Common" | "Narrative" | "Iconic". */
  tier?: string;
  /** "Weapon" | "Item" | "Armor". */
  type?: string;
  /** Legacy axis, kept in sync with `type` for the character sheet. */
  category: string;
  /** Signature character for an iconic item (used to label it in the picker). */
  owner?: string;
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
  /** Attack abilities the multiplier bonus applies to (e.g. ["melee","agility"]);
   *  defaults to the weapon's own `ability` when absent. */
  multAbilities?: string[];
  /** A flat damage multiplier that replaces the attacker's (e.g. a grenade's ×2). */
  flatMult?: number;
  /** Deals no Health damage (e.g. a flash-bang). */
  noDamage?: boolean;
  /** Movement modes granted while equipped (shown in the Speed section). */
  grantsMovement?: MmrpgMovementGrant[];
  /** Conditional/narrative mechanical text the player applies manually. */
  special?: string;
  notes?: string;
  source?: string;
  // ── Iconic items: what the item grants and what it costs. ──
  /** Origin the iconic item grants its owner. */
  grantsOrigin?: string;
  /** Comma-separated list of powers the iconic item grants. */
  grantsPowers?: string;
  /** Power picks required to own the iconic item. */
  powerValue?: number;
  // ── Vehicle fields (type = "Vehicle"): a vehicle is just a kind of equipment. ──
  /** "Named" (a specific vehicle) or "Basic" (a generic type). */
  vehicleClass?: string;
  size?: string;
  speed?: string;
  health?: string;
  damageReduction?: string;
  passengers?: string;
  /** Onboard powers / weapons for a vehicle. */
  powers?: string;
  weapons?: string;
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
