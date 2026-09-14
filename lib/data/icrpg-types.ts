// GENERATED-adjacent hand type file for ICRPG (Index Card RPG) data.
// The generated data files (icrpg-*.ts) import these shapes.

export interface IcrpgWorld { key: string; name: string; blurb: string; era: string; }
export interface IcrpgStat { name: string; abbr: string; desc: string; }
export interface IcrpgEffortType { name: string; die: string; desc: string; }
export interface IcrpgRule { title: string; text: string; }
export interface IcrpgLifeForm { name: string; world: string; statBonus?: string; desc: string; }
export interface IcrpgType {
  name: string; world: string; desc: string;
  statFocus?: string; startingLoot?: string[]; abilities?: string[];
}
export interface IcrpgAbility { name: string; kind: string; world: string; desc: string; }
export interface IcrpgLoot { name: string; table: string; roll?: string; desc: string; effects?: string[]; }
export interface IcrpgGear { name: string; world: string; category: string; desc: string; effects?: string[]; }
export interface IcrpgSpell { name: string; school: string; desc: string; target?: string; effort?: string; }
export interface IcrpgMonster {
  name: string; tier?: string; hearts?: number; hp?: number; defense?: number;
  stats?: Record<string, number>; attacks?: string[]; abilities?: string[]; desc: string; world?: string;
}
