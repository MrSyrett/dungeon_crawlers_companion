// Hand-authored types for the ACE! (Awfully Cheerful Engine!) data layer.
// The canonical data lives in data/ace/*.json; scripts/build-ace-data.mjs emits
// lib/data/ace-*.ts (typed, for Next pages) and public/tools-data/ace-*.js
// (globals, for the HTML character sheet) from that one source.
//
// ACE! is deliberately tiny: four Stats (plus an optional Power Stat), one
// Focus per Stat, a Role that grants one special ability, a Trait that adds a
// complication, Health = Brawn, Defence = Moves × 3, and 6 Karma. Everything
// below models exactly that and nothing more.

/** The four core Stats plus the optional supernatural fifth. */
export type AceStat = "Smarts" | "Moves" | "Style" | "Brawn" | "Power";

/** Which book (the core rules or one of the eight omnibus settings) a row comes from. */
export type AceSettingKey =
  | "core"
  | "spirits"   // Spirits of Manhattan — ghost hunters in NYC
  | "montana"   // Montana Drones — 1930s artefact hunters
  | "strange"   // Strange Science — 80s kids in a weird small town
  | "beam"      // Beam Me Up — starship crew
  | "orcs"      // Orcs & Oubliettes — fantasy dungeon delvers
  | "domes"     // Domes of Thunder — post-apocalyptic waste warriors
  | "bite"      // Bite Me! — teen monster hunters
  | "aaah";     // AAAH! — Accidentally Anthropomorphic Animal Heroes

export interface AceSetting {
  key: AceSettingKey;
  name: string;
  /** Short elevator pitch for the genre. */
  tagline: string;
  /** One-paragraph overview, in the book's own voice where possible. */
  blurb: string;
  /** Book page range in the omnibus (printed page numbers). */
  pages: [number, number];
  /** Roles the book recommends for its Heroes (names, matching AceRole.name). */
  recommendedRoles: string[];
  /** Whether the setting turns on the Power Stat for some Roles. */
  usesPower: boolean;
  /** Setting-specific rule tweaks, one bullet each. */
  rules: string[];
}

export interface AceRole {
  name: string;
  /** Grouping as printed: Talking Animals, Species, Fantasy, Occupations, Superheroes, or a setting-specific group. */
  category: string;
  setting: AceSettingKey;
  /** The one special ability the Role grants, in the book's wording. */
  ability: string;
  /** True when the Role grants a Power Stat (Wizard, Alien, …). */
  power?: boolean;
  /** Focuses the Role grants for free, if any (e.g. Gangster → Intimidating). */
  grantsFocus?: string[];
  /** Stat adjustments the Role grants (e.g. Ogre → Brawn +1). */
  statMods?: Partial<Record<AceStat, number>>;
  /** Flat Health bonus (e.g. Ogre +2). */
  healthBonus?: number;
  /** Printed page in the omnibus. */
  page: number;
}

export interface AceFocus {
  name: string;
  stat: AceStat;
  setting: AceSettingKey;
  /** Rules note, e.g. "Brawling covers all melee combat." or "+2 Health". */
  note?: string;
}

export interface AceTrait {
  name: string;
  setting: AceSettingKey;
  /** Only the supplements describe their Traits; core Traits are a bare list. */
  description?: string;
}

/** Purchase difficulty bands from the core Gear table. */
export type AceGearTier = "Free" | "Normal" | "Hard" | "Herculean" | "Impossible";

export interface AceGear {
  name: string;
  setting: AceSettingKey;
  tier: AceGearTier;
  /** Style-roll Target Number to acquire (10/20/30/40), or null when free/priceless. */
  tn: number | null;
  /** Weapon, Vehicle, Gadget, Armor, Magic Item, Consumable, Kit, … */
  category: string;
  description: string;
  /** Damage for weapons. */
  damage?: number;
  /** Defence bonus for armor. */
  defence?: number;
  page: number;
}

export interface AceExtraAttack {
  name: string;
  /** Dice rolled for the attack (Stat + Focus, as printed). */
  dice: number | null;
  damage: number | null;
  note?: string;
}

export interface AceExtraFocus {
  stat: AceStat;
  name: string;
  /** Printed dice total when the book gives one (e.g. "POWER 5 (Fire 7)"). */
  dice?: number;
}

/** A Director-run character: mook, monster, villain, ghost, robot… */
export interface AceExtra {
  name: string;
  setting: AceSettingKey;
  /** Mook, Monster, Villain, Ghost, Robot, Animal, Alien, Undead, Vehicle, … */
  type: string;
  smarts: number | null;
  moves: number | null;
  style: number | null;
  brawn: number | null;
  power?: number | null;
  focuses: AceExtraFocus[];
  health: number | null;
  defence: number | null;
  attacks: AceExtraAttack[];
  /** Special abilities and quirks, one per entry. */
  notes: string[];
  /** Flavor text from the book, when it has any. */
  description?: string;
  page: number;
}

export interface AcePregen {
  name: string;
  setting: AceSettingKey;
  trait: string;
  role: string;
  smarts: number;
  moves: number;
  style: number;
  brawn: number;
  power?: number;
  /** Focus per Stat, as printed (some pregens list several for one Stat). */
  focuses: Partial<Record<AceStat, string[]>>;
  health: number;
  defence: number;
  /** The Role ability, in the book's wording. */
  ability: string;
  gear: string[];
  /** Background blurb. */
  bio: string;
  page: number;
}

export interface AceTables {
  statDescriptions: Record<AceStat, string>;
  difficulties: { name: string; tn: number | null; examples: string }[];
  weapons: { name: string; damage: number }[];
  unarmedDamage: { minBrawn: number; maxBrawn: number; damage: number }[];
  purchase: { amount: string; tn: number | null; examples: string }[];
  karmaUses: { name: string; text: string }[];
  combatCircumstances: { name: string; effect: string }[];
  creation: {
    statPoints: number;
    statMin: number;
    statMax: number;
    startingKarma: number;
    maxKarma: number;
    minDefence: number;
    defenceMultiplier: number;
    dodgingDefenceBonus: number;
    toughHealthBonus: number;
  };
  /** Short rules reminders for the sheet's help panel, in book order. */
  quickRules: { title: string; text: string }[];
}
