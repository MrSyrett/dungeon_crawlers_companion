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
