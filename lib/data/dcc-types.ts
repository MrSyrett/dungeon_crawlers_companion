// Hand-authored schema contract for the Dungeon Crawler Carl data layer.
//
// This is the SINGLE source of truth for the *shape* of every DCC dataset.
// The canonical *content* lives as JSON under data/dcc/, and
// scripts/build-dcc-data.mjs emits two things from it:
//   • lib/data/dcc-*.ts  — typed `export const` modules (import these types)
//   • public/tools-data/dcc-*.js — plain `const` globals for the HTML tools
//
// Do NOT hand-edit the generated files; edit data/dcc/*.json and re-run
//   node scripts/build-dcc-data.mjs
// This file, by contrast, IS hand-edited — change an interface here when the
// data model changes, then update the JSON to match.

/** The five core stats. Abbreviation = the modifier; full name = the score. */
export type DccStat = "STR" | "INT" | "CON" | "DEX" | "CHA";

/** Which system list a race is drawn from (Earth-born vs Alien crawler). */
export type DccRaceGroup = "Earth" | "Alien";

/** Short code for the rulebook a row came from. */
export type DccSource =
  | "Core"            // Carl RPG Core Rulebook (Royal Court Edition)
  | "Crawlers"        // Customization & Crawlers
  | "GM Toolkit"      // Gamemaster's Campaign Toolkit
  | "Survival"        // Rules for Survival
  | "Par"             // Par for the Course
  | "Atlas"           // Atlas: Tutorial Floors
  | "Base"            // base (mundane) gear library — chassis for the magic tables
  | "Homebrew";       // user homebrew, or content converted/adapted for DCC

/** A rank-gated upgrade a skill or spell picks up at Rank 5 / 10 / 15. */
export interface DccUpgrade {
  rank: 5 | 10 | 15;
  text: string;
}

// ── Skills (attack + utility share one shape) ───────────────────────────────
export interface DccSkill {
  name: string;
  category: "attack" | "utility";
  /** Governing stat for the check; null for pure passives that never roll. */
  stat: DccStat | null;
  passive: boolean;
  interrupt: boolean;
  /** Grouping tag, e.g. "Edged", "Ranged", "Hand-to-Hand", "Damage Effect". */
  group?: string;
  // Attack skills only:
  damage?: string;        // base damage dice, e.g. "1d6"
  damageType?: string;    // e.g. "Slashing"
  range?: string;         // e.g. "Melee", "Reach (10 ft)", "60 ft"
  cooldown?: string;
  limitations?: string;   // e.g. "Class-only", "Limited Skill", "magic-only"
  desc: string;
  upgrades: DccUpgrade[];
  page: number;
  source: DccSource;
}

// ── Spells ──────────────────────────────────────────────────────────────────
export interface DccSpell {
  name: string;
  mana: number;
  type: "attack" | "utility" | "heal";
  /** Stat used to hit/damage; most spells use INT, a few CHA/CON. */
  stat: DccStat;
  passive: boolean;
  aiFavor?: number;
  desc: string;
  upgrades: DccUpgrade[];
  page: number;
  source: DccSource;
}

// ── Races & Classes (flat lists of one-time mechanical grants) ──────────────
export interface DccRace {
  name: string;
  group: DccRaceGroup;
  size: number;           // 1..8 (see DccTables.sizes)
  grants: string[];       // bullet list of mechanical benefits
  prerequisites?: string;
  page: number;
  source: DccSource;
}

export interface DccClass {
  name: string;
  /** Base category/categories, e.g. ["Fighter"] or a hybrid ["Bard","Rogue"]. */
  categories: string[];
  grants: string[];
  prerequisites?: string;
  /** Earth Classes hand out a Silver Earth Box when chosen. */
  earthClass: boolean;
  page: number;
  source: DccSource;
}

// ── Deities & worship ───────────────────────────────────────────────────────
export interface DccDeityTier {
  tier: "Acolyte" | "Devotee" | "Zealot";
  benefits: string[];
}

export interface DccDeity {
  name: string;
  temple?: string;
  offering?: string;
  rival?: string;
  sponsor?: string;
  signatureSkills: string[];
  signatureStat?: DccStat;
  symbol?: string;
  tiers: DccDeityTier[];
  page: number;
  source: DccSource;
}

// ── Backgrounds (character-creation Step 1 skill tables) ────────────────────
export interface DccBackground {
  name: string;
  era: "Childhood" | "Adolescence" | "Career" | "Hobby";
  /** Human crawlers vs animal crawlers draw from different background tables. */
  kind: "human" | "animal";
  /** The three skills the background offers; the player takes two. */
  skills: string[];
  rank: number;
  roll?: number;          // its 1d12 (human) or 1d6 (animal) index on the era table
  page: number;
  source: DccSource;
}

// ── Experiences (Third-Floor+ fast-forward creation) ────────────────────────
export interface DccExperience {
  name: string;        // the entry's short title
  table: string;       // its source table, e.g. "Interactions with Other Crawlers"
  /** Floor the events represent: 2 = tutorial tables (usable at F3+), 3 = Third Floor Events, 4 = Fourth Floor Events. */
  floor: number;
  roll?: number;       // 1d12 index on its table
  skills: string[];    // the 4 candidate skills (the crawler picks 2)
  desc?: string;       // short narrative
  page: number;
  source: DccSource;
}

// ── Bestiary (Mob / Boss / Rival stat blocks) ───────────────────────────────
export type DccMonsterRole =
  | "Mob"
  | "Neighborhood Boss"
  | "Borough Boss"
  | "City Boss"
  | "Province Boss"
  | "Country Boss"
  | "Floor Boss"
  | "Quest Boss"      // used in the Core adventure chapters
  | "Elite"           // used in the Core adventure chapters
  | "Rival Crawler"
  | "NPC";

export interface DccMonsterAttack {
  name: string;
  toHit: string;          // e.g. "5+F" (F = Floor Number)
  damage: string;         // e.g. "2d6+3"
  damageType?: string;
  range?: string;         // e.g. "Melee", "30 ft", "20ft Cone"
  rider?: string;         // on-hit / debuff effect text
}

export interface DccMonster {
  name: string;
  role: DccMonsterRole;
  size: number;           // 1..8
  tags: string[];         // descriptor tags from the type line
  level: number;
  /** Health-Bar slot values left→right (10 for Mobs, up to 13 for Bosses). */
  hbSlots: number[];
  surprise: string;       // "N+F"
  evade: string;          // "N+F"
  move: string;           // "N+S" or a plain number
  dr: number | string;    // usually a number; a few blocks print "F" (DR = Floor Number)
  stats: Record<DccStat, { score: number; mod: number }>;
  attacks: DccMonsterAttack[];
  notes: string[];        // named passive abilities
  page: number;
  source: DccSource;
}

// ── Debuffs ─────────────────────────────────────────────────────────────────
export interface DccDebuff {
  name: string;
  effect: string;
  duration: string;
  stackable: boolean;
}

// ── Buffs (positive conditions; Core p.95-96) ───────────────────────────────
export interface DccBuff {
  name: string;
  /** Internal = always-on personal effect; External = trigger-activated, Rule of Three (max 3). */
  kind: "internal" | "external";
  effect: string;
  duration?: string;
}

// ── Loot & items (Core ch.4b) ───────────────────────────────────────────────
export type DccItemCategory =
  | "consumable" | "weapon" | "armor" | "accessory"
  | "mundane" | "tool" | "material" | "scroll" | "tome";

export type DccLootTier =
  | "Mundane" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Legendary" | "Celestial";

export interface DccItem {
  name: string;
  category: DccItemCategory;
  tier?: DccLootTier;
  /** Equip slot for wearable gear. */
  slot?: string;
  effect: string;
  price?: number;         // gold, where the rulebook gives one
  page?: number;
  source: DccSource;
  /** Flavor origin for base gear: "Fantasy" | "Modern" | "Pop Culture". */
  theme?: string;
}

export interface DccLootTierRow {
  tier: DccLootTier;
  gearRolls: number;      // enchant rolls per gear item (Table 38)
  gold: string;           // gold formula, e.g. "1d10 ×100"
  xValue: string;         // enchant X-value guideline
  contents: string[];     // sample contents
  page: number;
  source: DccSource;
}
export interface DccLootTableRow { roll: string; result: string; }
export interface DccLootTable {
  name: string;
  die: string;            // e.g. "d6"
  rows: DccLootTableRow[];
  page: number;
}
export interface DccLoot {
  tiers: DccLootTierRow[];
  tables: DccLootTable[];               // Tables 38-42
  goldByFloor: { floor: string; gold: string }[];
  notes: string[];
}

// ── Reference tables (the ladders that drive sheet automation) ──────────────
export interface DccStatModRow {
  min: number;
  max: number | null;     // null = open-ended top band (300+)
  mod: number;
}
export interface DccRankDamageRow {
  minRank: number;
  maxRank: number;
  dice: string;           // e.g. "+1d8 & +1d6"
}
export interface DccSizeRow {
  size: number;
  name: string;
  examples: string;
}
export interface DccCoreStatRow {
  key: DccStat;
  name: string;
  role: string;
}
export interface DccDegreeRow {
  result: string;
  margin: string;
  attack?: string;
  evade?: string;
  nonCombat?: string;
}
export interface DccTables {
  statMods: DccStatModRow[];
  rankDamage: DccRankDamageRow[];
  sizes: DccSizeRow[];
  coreStats: DccCoreStatRow[];
  degrees: DccDegreeRow[];
  damageTypes: { common: string[]; uncommon: string[] };
}
