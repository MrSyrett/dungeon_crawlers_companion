// Hand-authored types for the Kids on Bikes family data layer: Kids on Bikes
// (2nd edition) plus its two genre variants, Kids on Brooms and Kids in Capes.
// All three share one engine — six Stats rated d4–d20, Tropes, Strengths and
// Flaws, Adversity Tokens, Lucky Breaks — and each variant layers a little on
// top (Brooms: wand/broom/familiar and Spell Checks; Capes: Cape/Power/Stress).
// The app treats them as one system ("KOB") with a per-character `book`.
//
// Canonical data lives in data/kob/parts/<book>.json; scripts/build-kob-data.mjs
// merges the parts and emits lib/data/kob-*.ts + public/tools-data/kob-*.js.

export type KobBook = "bikes" | "brooms" | "capes";

export type KobStat = "Brains" | "Brawn" | "Fight" | "Flight" | "Charm" | "Grit";
export const KOB_STATS: KobStat[] = ["Brains", "Brawn", "Fight", "Flight", "Charm", "Grit"];

export type KobDie = 4 | 6 | 8 | 10 | 12 | 20;

export interface KobBookInfo {
  key: KobBook;
  name: string;
  tagline: string;
  blurb: string;
  /** What the age/grade groups are called in this book (Child/Teen/Adult; Underclass/Upperclass/Faculty). */
  ageGroups: KobAgeGroup[];
  /** What the personal transport is called (Bike / Broom) or null (Capes has none). */
  rideLabel: string | null;
  /** What the inventory is called (Backpack / Schoolbag / Backpack). */
  bagLabel: string;
  /** Book-specific rule tweaks, one bullet each. */
  rules: string[];
}

export interface KobAgeGroup {
  name: string;
  /** e.g. "12 & younger" */
  range?: string;
  /** The two Stats that get +1 on checks. */
  statBonus: KobStat[];
  /** The Strength the group gets for free. */
  freeStrength: string;
  notes?: string;
}

export interface KobTrope {
  name: string;
  book: KobBook;
  /** Which die each Stat gets. */
  dice: Record<KobStat, KobDie>;
  /** Age/grade groups the Trope suggests ("Any" allowed). */
  ages: string[];
  suggestedStrengths: string[];
  suggestedFlaws: string[];
  /** The two Trope-specific questions. */
  questions: string[];
  /** Suggested bike/broom text as printed (e.g. "Child: Blue, Bell · Teen: Orange, Trading Cards"). */
  suggestedRide?: string;
  /** Any other printed suggestion (Capes: suggested Cape/Power; Brooms: familiar, wand…). */
  extras?: Record<string, string>;
  page: number;
}

export interface KobStrength {
  name: string;
  book: KobBook;
  /** Adversity Token cost as printed ("2 AT", "Always active", "1 AT per +3"…). */
  cost: string;
  description: string;
  page: number;
}

export interface KobFlaw {
  name: string;
  book: KobBook;
  description?: string;
  page: number;
}

export interface KobQuestion {
  book: KobBook;
  /** positive / negative = about a character you know; unknown = one you don't. */
  kind: "positive" | "negative" | "unknown";
  n: number;
  text: string;
}

/**
 * Book-specific pick lists that don't warrant their own type:
 *   bikes:  "bike-color", "bike-accessory", "aspect" (Powered Character aspects), "motivation", "fear", "obligation"
 *   brooms: "wand-wood" (stat = magic type it boosts), "wand-core", "broom" (benefit), "familiar", "class"
 *   capes:  "power-category", "power-skill", "motivation", "fear", "obligation"
 */
export interface KobListItem {
  book: KobBook;
  kind: string;
  name: string;
  description?: string;
  /** For wand woods: the Stat/magic type the +1 applies to. For brooms: the rider adjective. */
  stat?: KobStat;
  tag?: string;
  /** Mechanical benefit text (brooms, aspects, power skills). */
  benefit?: string;
  page: number;
}

export interface KobCapeSkill {
  name: string;
  kind: "Constant" | "Action" | "Reaction";
  description: string;
  tiers: { starting: string; intermediate: string; advanced: string };
}

/** A Kids in Capes team role. */
export interface KobCape {
  name: string;
  description: string;
  skills: KobCapeSkill[];
  page: number;
}

export interface KobTables {
  statDescriptions: Record<KobStat, { text: string; verbs: string[] }>;
  dice: { die: KobDie; label: string; text: string }[];
  difficulties: { range: string; text: string; examples: string }[];
  adversity: { name: string; text: string }[];
  creation: { startingAT: number; strengthsToPick: number; flawsToPick: number; knackTakes: number };
  /** Kids on Brooms spell difficulty builders. */
  spell: {
    magnitude: { name: string; mod: number; text: string }[];
    area: { name: string; mod: number; text: string }[];
    duration: { name: string; mod: number; text: string }[];
    experience: { name: string; mod: number; text: string }[];
    magicTypes: { stat: KobStat; text: string; classes?: string }[];
    failure: { range: string; text: string }[];
  };
  /** Kids in Capes combat/stress tables. */
  capes: {
    stress: { range: string; narrative: string; effect: string }[];
    degrees: { range: string; attacking: string; takeHit: string; dodge: string }[];
    combatSequence: string[];
    powerDie: { die: KobDie; cost: string }[];
    growth: { name: string; text: string }[];
    fallout: { range: string; text: string }[];
  };
  /** Short reminders for the sheet's help panel; `book` null = shared core. */
  quickRules: { book: KobBook | null; title: string; text: string }[];
}
