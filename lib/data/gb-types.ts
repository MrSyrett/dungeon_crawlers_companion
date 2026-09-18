// GENERATED consumers rely on these shapes; the build asserts data against them.
// Ghostbusters International (West End Games, 1989) — the proto-D6 system.
// SystemKey GB.

export interface GbTrait {
  name: string;
  summary: string;
  high: string;
  low: string;
  covers: string;
}

export interface GbTalent {
  name: string;
  trait: string;
}

export interface GbGoal {
  name: string;
  description: string;
  award: string;
  penalty: string;
}

export interface GbDifficulty {
  name: string;
  range: string;
  low: number | null;
  high: number | null;
  examples: string[];
}

export interface GbEquipment {
  name: string;
  category: string;            // "Weapon (ranged)" | "Weapon (melee)" | "Gear"
  hands: string;
  muscles: number;             // encumbrance / carry cost
  rangeMax?: number | null;    // ranged weapons: max range in hexes
  rangeIncrement?: number | null; // hexes per +1 UHM difficulty level
  toHit?: string;              // bonus to-hit dice, e.g. "+2"
  damage?: string;             // bonus damage dice, e.g. "+6"
  special?: string;            // A / S2 / G* / effect notes
  description: string;
}

export interface GbPower {
  name: string;
  description: string;
}

export interface GbGhostAbility {
  name: string;
  category: string;            // "Lesser" | "Greater" | "Both"
  requiresPower: boolean;
  description: string;
}

export interface GbGhostWeakness {
  name: string;
  description: string;
}

export interface GbToughness {
  toughness: string;
  power: string;
  abilities: string;
  ectopresence: string;
  brainsCool: string;
}

export interface GbBestiaryTalent {
  trait: string;
  name: string;
  value: number;
}

export interface GbBestiary {
  name: string;
  role: string;
  entityType?: string;         // "Physical · Intelligent" etc.
  brains: number;
  muscles: number;
  moves: number;
  cool: number;
  talents: GbBestiaryTalent[];
  power?: number;
  powers?: string[];           // special abilities
  ectopresence?: number;       // ghostly "health" — trapped at 0
  weaknesses?: string;
  goal: string;
  tags: string;
  description: string;
}

export interface GbRule {
  key: string;
  title: string;
  order: number;
  body: string;
}
