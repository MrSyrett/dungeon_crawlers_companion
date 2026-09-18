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
  category: string;
  hands: string;
  muscles: number;
  description: string;
}

export interface GbPower {
  name: string;
  description: string;
}

export interface GbBestiaryTalent {
  trait: string;
  name: string;
  value: number;
}

export interface GbBestiary {
  name: string;
  role: string;
  brains: number;
  muscles: number;
  moves: number;
  cool: number;
  talents: GbBestiaryTalent[];
  power?: number;
  powers?: string[];
  ectopresence?: number;
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
