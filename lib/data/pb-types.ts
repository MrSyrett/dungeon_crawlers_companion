// Hand-authored types for the Pirate Borg data layer.
//
// Canonical data: data/pb/parts/*.mjs → scripts/build-pb-data.mjs →
//   lib/data/pb-data.ts (typed consts for Next pages) +
//   public/tools-data/pb-data.js (window.PB_* globals for the sheet / GM Screen / prep builder).
// Records carry an index signature so optional, record-specific hint fields stay typed as `unknown`
// rather than failing excess-property checks.
//
// Pirate Borg vocabulary: Test (d20 ± ability ≥ DR), DR, ability (−3…+6), armor tier/die, Devil's Luck,
// Broken, Getting Better. There are no levels, XP, AC, saves or spell slots.

export type PbAbilityId = "STRENGTH" | "AGILITY" | "PRESENCE" | "TOUGHNESS" | "SPIRIT";
export type PbAbilityMods = Record<PbAbilityId, number>;
export type PbSourceName = "Player's Guidebook" | "Core Rules" | "The Curse of Skeleton Point" | "Trapped in the Tropics" | "Homebrew" | string;
/** A die roll result or inclusive range, e.g. 4 or [1, 20]. */
export type PbRoll = number | [number, number];

export interface PbAbility { id: PbAbilityId; short: string; name: string; uses: string; tests: string[] }
export interface PbAbilityRow { roll: [number, number]; mod: number }
export interface PbDrLabel { dr: number; label: string; text: string; standard?: boolean }

/** Generic table row. `sub` = a nested roll (e.g. "[d2] 1: … 2: …"). */
export interface PbRollEntry {
  roll: PbRoll; text: string; name?: string; sub?: { die: string; rows: PbRollEntry[] }; [k: string]: unknown;
}
export interface PbTableColumn { die: string; name: string; values: string[] }
export interface PbTable {
  id: string; name: string; die: string; page: number; source?: PbSourceName; note?: string;
  rows?: PbRollEntry[]; columns?: PbTableColumn[]; [k: string]: unknown;
}
export interface PbTest { ability?: PbAbilityId; dr: number | string; [k: string]: unknown }

/** Machine-readable automation hint on a feature / ailment / ancestry. See classes.mjs header for the vocabulary. */
export interface PbEffect {
  type: "dr" | "damage" | "ability" | "hpMax" | "armor" | "extraArmor" | "crit" | "reload" | "item" | "weapon" | "weaponDamage"
    | "immune" | "attacks" | "ritual" | "relic" | "test" | "action" | "note" | "enemyMorale" | "consumableHeal" | "heal"
    | "upkeep" | "noRestHealing" | "movement" | "cheatDeath" | "sense" | string;
  value?: number | string; applies?: string | string[]; when?: string; [k: string]: unknown;
}

// ---- rules -------------------------------------------------------------------------------
export interface PbRuleNote { page: number; text: string; [k: string]: unknown }
export interface PbRules {
  abilities: PbRuleNote; tests: PbRuleNote; holdingBreath: PbRuleNote; carrying: PbRuleNote;
  violence: PbRuleNote & {
    initiative: { die: string; rows: PbRollEntry[]; individual: string };
    attacks: { id: "melee" | "ranged" | "defense"; name: string; ability: PbAbilityId; dr: number; failure?: string }[];
    critical: { natural: number; attack: string; defense: string; effects: Record<string, unknown> };
    fumble: { natural: number; attack: string; defense: string; blackPowder: string; effects: Record<string, unknown> };
    misfire: { die: string; rows: PbRollEntry[] };
    rounds: { seconds: number; text: string }; movement: { feet: number; squares: number; halved: string[]; text: string };
    reload: { actions: number; buccaneer: number; text: string };
  };
  armor: PbRuleNote & { tiers: { tier: number; die: string | null; name: string; agilityDR?: number; defenseDR?: number }[]; blackPowderIgnoresArmor: boolean; magic: string };
  rest: { page: number; short: { duration: string; heal: string }; long: { duration: string; heal: string }; starvation: { text: string; [k: string]: unknown }; infection: { text: string; [k: string]: unknown } };
  reaction: PbRuleNote & { die: string; rows: PbRollEntry[] };
  morale: PbRuleNote & { die: string; triggers: string[]; result: { die: string; rows: PbRollEntry[] } };
  hitPoints: PbRuleNote; broken: PbRuleNote & { die: string; rows: PbRollEntry[] }; death: PbRuleNote;
  grog: PbRuleNote;
  devilsLuck: { page: number; landlubberDie: string; start: string; recharge: string; rechargeRestHours: number; rechargeOnlyWhenEmpty: boolean; uses: { id: string; text: string; [k: string]: unknown }[]; variant: string };
  experience: { page: number; when: string; steps: { id: string; name: string; text: string; [k: string]: unknown }[];
    abilityProcedure: { die: string; lowRange: [number, number]; lowFailOn: number; min: number; max: number };
    amongTheDead: { die: string; rows: PbRollEntry[] } };
  relics: PbRuleNote; rituals: PbRuleNote & { castsPerDay: string; reset: string; modifiers: { id: string; text: string; dr?: number; [k: string]: unknown }[]; repeatedMishap: string };
  creation: { page: number; steps: { id: string; text: string }[]; classDie: string; classDieOptional: string };
  [k: string]: unknown;
}

// ---- classes -----------------------------------------------------------------------------
export interface PbFeature {
  id: string; roll: PbRoll; name: string; text?: string; effects?: PbEffect[];
  again?: { text: string; effects?: PbEffect[]; [k: string]: unknown }; maxPicks?: number; [k: string]: unknown;
}
export interface PbClassTable {
  id: string; name: string; die: string; when: "start" | "experience" | "both"; picks?: number; note?: string;
  rerollRepeats?: boolean; repeatUpgrades?: boolean; maxPicksEach?: number; rows: PbFeature[]; [k: string]: unknown;
}
export interface PbClassWeapon {
  die?: string; fixed?: string[]; trusted?: boolean; table?: string;
  choice?: { name?: string; weapon?: string; damage: string; [k: string]: unknown }[]; note?: string;
}
export interface PbRestrictions { rituals: boolean; relics: boolean; magicArmorTier: number; metal: boolean; noColdIron?: boolean }
export interface PbClass {
  id: string; name: string; roll?: number; optional?: boolean; page: number; tagline?: string; text: string;
  abilities: PbAbilityMods | null; hpDie: string | null; luckDie: string | null;
  weapon: PbClassWeapon | null; clothingDie: string | null; hatDie: string | null;
  restrictions: PbRestrictions | null; tables: PbClassTable[];
  startingAmmo?: { item: string; qty: string }; classEffects?: PbEffect[];
  prayers?: { usesPerDay: string; reset: string; action: boolean; noRollUnlessNoted: boolean };
  spells?: { castsPerDay: string; reset: string; action: boolean; noRollUnlessNoted: boolean; startRank: number; maxRank: number };
  secondaryClass?: { die: string; required: boolean } | null;
  variants?: { roll: PbRoll; id: string; name: string; text: string; secondaryClass: { die: string; required: boolean } | null; effects?: PbEffect[];
    table?: { id: string; name: string; die: string; rows: (PbFeature & { abilities?: PbAbilityMods; hpDie?: string; luckDie?: string; weapon?: { name: string; damage: string; special?: string } })[] } }[];
  [k: string]: unknown;
}
export interface PbCardDeck { cards: number; black: number; red: number; jokers: number; ranks: Record<string, number>; note: string }
export interface PbPrayer { id: string; roll: number; numeral: string; name: string; text: string; test?: PbTest; [k: string]: unknown }
export interface PbDeity { id: string; roll: number; numeral: string; name: string }
export type PbRank = "I" | "II" | "III";
export interface PbSpell { id: string; roll: number; name: string; text: string; ranks: Record<PbRank, Record<string, unknown>>; test?: PbTest; [k: string]: unknown }

// ---- equipment ---------------------------------------------------------------------------
export interface PbWeapon {
  id: string; name: string; type: "melee" | "ranged"; damage: string | null; cost: number | null; hands: 1 | 2;
  reach: number | null; range: number | null; reload: number | null; blackPowder: boolean; ammo: string | null; special: string | null;
  sword?: boolean; thrown?: boolean; aliases?: string[]; [k: string]: unknown;
}
export interface PbAmmo { id: string; name: string; qty: number; cost: number; damage: string | null; effect?: string; [k: string]: unknown }
export interface PbBomb { id: string; roll: number; name: string; damage: string | null; cost: number; effect?: string; [k: string]: unknown }
export interface PbBombRules { page: number; text: string; throw: PbTest; blast: { feet: number; test: PbTest } }
export interface PbClothing {
  id: string; roll: PbRoll; name: string; tier: 0 | 1 | 2 | 3; armorDie: string | null; cost: number | null;
  agilityDR: number; defenseDR: number; metal?: boolean; special?: string; [k: string]: unknown;
}
export interface PbHat { id: string; roll: PbRoll; name: string; cost: number | null; damageReduction?: number; metal?: boolean; sacrifice?: boolean; special?: string; none?: boolean; [k: string]: unknown }
export interface PbGear {
  id: string; name: string; cost: number | null; costText: string; category: "gear" | "container" | "vessel" | string;
  capacity?: number | null; uses?: string; consumable?: boolean; heal?: string; duration?: string; effect?: string; [k: string]: unknown;
}
export interface PbContainer { id: string; roll: number; name: string; capacity: number | null; text: string; [k: string]: unknown }
export interface PbGearRoll { roll: number; text: string; item?: string | null; qty?: string; table?: string; extra?: { item: string; note?: string } }
export interface PbNamedRoll { roll: number; name: string; [k: string]: unknown }
export interface PbPrice { name: string; cost: number | null; costText: string; [k: string]: unknown }
export interface PbArmorRepair { page: number; rows: { from: number; to: number; cost: number; text: string }[]; note: string }

// ---- backgrounds -------------------------------------------------------------------------
export interface PbBackground {
  id: string; roll: PbRoll; name: string; silver: string; silverMultiplier: number; item: string;
  gear?: string[]; gearChoice?: string[]; table?: string;
}
export interface PbNameRow { roll: number; male: string; female: string; surname: string; nickname: string }

// ---- magic -------------------------------------------------------------------------------
export interface PbRelic { id: string; roll: number; name: string; text: string; duration?: string; [k: string]: unknown }
export interface PbRitual { id: string; roll: number; numeral: string; name: string; text: string; duration?: string; [k: string]: unknown }
export interface PbMishap { roll: number; text: string; hidden?: string; [k: string]: unknown }

// ---- naval -------------------------------------------------------------------------------
export interface PbShipStat { id: string; name: string; text: string }
export interface PbCrewAction {
  id: string; name: string; text: string; test: { ship: "skill" | "agility"; pc: PbAbilityId; dr: number } | null; [k: string]: unknown;
}
export interface PbNavalRules {
  page: number; crew: string; range: { hexes: number; text: string }; scaling: { ratio: number; text: string };
  round: { seconds: number; text: string }; movement: { text: string; rotationsPerMove: number; minMove: number; [k: string]: unknown };
  initiative: { roll: string; rerollEachRound: boolean; tiesTo: string; text: string }; turnOrder: { step: number; text: string }[];
  crewActionRules: string; critical: { natural: number; text: string; [k: string]: unknown }; fumble: { natural: number; text: string; [k: string]: unknown };
  sinking: { text: string }; morale: { roll: string; threshold: number; failure: string; text: string; triggers: string[] };
  cargo: string; repairing: string; careening: { everyMonths: number; speedPenaltyPerMonth: number; text: string }; payingCrew: string;
}
export interface PbSpecialtyCrew { id: string; name: string; text: string; dr?: number; applies?: string; [k: string]: unknown }
export interface PbCrewMod { condition: string; mod?: number; per?: string; recover?: number; reset?: boolean; permanent?: boolean; text?: string }
export interface PbShantyRules { page: number; perDay: string; test: { ship: string; dr: number }; text: string }
export interface PbShanty { id: string; roll: number; name: string; text: string; [k: string]: unknown }
export interface PbWind { page: number; optional: boolean; text: string; flat: { roll: number; dir: string }[]; pointed: { roll: number; dir: string }[] }
export interface PbPointOfSail { id: "with" | "close" | "irons"; name: string; relativeEdges: number[]; speed: "full" | "half" | 0; text: string; [k: string]: unknown }
export interface PbShipwrightRow { id: string; name: string; effect: string; cost: string; [k: string]: unknown }
export interface PbShipwright { page: number; crewRepairs: PbShipwrightRow[]; shipwright: PbShipwrightRow[]; upgrades: PbShipwrightRow[]; note: string }
export interface PbTravel { page: number; hexMiles: number; text: string; againstTrades: { directions: string[]; hexesPerDay: number; min: number } }

// ---- bestiary ----------------------------------------------------------------------------
export interface PbArmor { name: string; die: string; tier?: number }
export interface PbAttack { name: string; damage: string | null; notes?: string }
export interface PbSpecial { name: string; text: string }
export interface PbMonster {
  id: string; name: string; category: "npc" | "undead" | "beast" | "spirit" | "monster" | string;
  hp: number; morale: number | null; armor: PbArmor | null; attacks: PbAttack[]; specials: PbSpecial[];
  /** PC-side DRs when the block changes them (default 12). */
  dr?: { attack?: number; defend?: number };
  attackTable?: { die: string; note: string; rows: PbRollEntry[] };
  text: string; source: PbSourceName; page: number; homebrew: boolean; [k: string]: unknown;
}
export interface PbShip {
  id: string; name: string; type: "boat" | "ship" | "fortification" | string;
  hp: number; hull: { tier: number; die: string } | null; agility: number | null; speed: number;
  skill: number | null; skillNote?: string; broadsides: string | null; smallArms: string | null; ram: string | null;
  crew: { min: number; max: number } | null; cargo: number | null; special: string | null;
  text: string; source: PbSourceName; page: number; homebrew: boolean; [k: string]: unknown;
}

// ---- Core Rules additions (pg. 2-3, 8-25, 70-71, 79-127, 128-161) ------------------------------------
// Sources now include "Core Rules" and "The Curse of Skeleton Point" (the module inside the Core Rules).
// PbMonster entries may also carry (all optional, already allowed by its index signature):
//   sources?: { source, page, note? }[]  — every book the block appears in (primary = `source`/`page`)
//   group?: string; roll?: number         — gallery/table the creature belongs to (e.g. "Dark Fauna: Aquatic", d7 roll)
//   hpText?, hpDice?, moraleText?, moraleDice? — rolled or non-numeric stats ("2d8", "d6+6", "4 each", "N/A")
//   attackChoice?: "one of" | "pick 1-2"; attacksPerRound?; count?   — customisable minions and group sizes
//   naval?: PbMonsterNaval                — sea monster's Naval Combat block
//   loot?: { name, value, note? }[]; lootTable? / omenTable? / effectTable?: { die, name, note, rows }  — NOT attacks
//   drNote?, armorNote?, captain?, hazard?, boss?, named?, spells?
export interface PbSourceRef { source: PbSourceName; page: number; note?: string }
export interface PbMonsterNaval { hp: number; morale: number | null; armor: PbArmor | null; speed: number; agility: number; attacks: PbAttack[] }
export interface PbGenerator { page: number; source: PbSourceName; note?: string; tables: Record<string, PbTable>; [k: string]: unknown }

export interface PbAsh {
  page: number; source: PbSourceName; text: string; dose: { text: string; standardRate: number }; marketNote: string;
  market: PbTable; effects: PbTable & { duration: string }; notes: string[];
}
export interface PbAlchemyRow {
  roll: number; ingredientA: string; ingredientB: string; color: string; delivery: "Inhalation" | "Touch Skin" | "Enter Bloodstream" | "Ingestion";
  dr: number; effect: string; [k: string]: unknown;
}
export interface PbAlchemy {
  page: number; source: PbSourceName; methods: { id: string; name: string; text: string }[]; notes: string[];
  cost: string; resistAbility: PbAbilityId; craftAbility: PbAbilityId;
  deliveryBands: { roll: [number, number]; name: string }[]; drBands: { roll: [number, number]; dr: number }[]; rows: PbAlchemyRow[];
}
export interface PbTravelEvents { page: number; source: PbSourceName; note: string; flotsam: PbTable; encounters: PbTable; events: PbTable }
export interface PbShipsAtSea {
  page: number; source: PbSourceName; note: string;
  vesselClass: PbTable; armament: PbTable; crewQuantity: PbTable; crewQuality: PbTable; name: PbTable;
}
export interface PbCargo {
  page: number; source: PbSourceName; note: string; marketSwing: number;
  mundane: PbTable; special: PbTable; plotTwist: PbTable; marketRates: { ashStandardRate: number; text: string };
}
export interface PbTreasureMaps extends PbGenerator { riddles: PbTable }
export interface PbPirateGen {
  page: number; source: PbSourceName; note: string;
  procedure: { dice: string; morale: string; hp: string; mightyHp: string; armorByHighestTable: Record<"A" | "B" | "C", PbArmor | null>; silver: string };
  tableA: PbTable; tableB: PbTable; tableC: PbTable; names: string;
}
export interface PbPlace { id: string; name: string; page: number; faction?: string; text: string }
export interface PbSetting {
  page: number; source: PbSourceName; name: string; summary: string; scourge: string; ash: string;
  map: { page: number; places: string[]; scale: string }; places: PbPlace[];
}
export interface PbFaction { id: string; name: string; aka?: string[]; page: number; seat: string; source: PbSourceName; text: string }
export interface PbCaptain {
  id: string; name: string; page: number; source: PbSourceName; faction?: string; text: string;
  /** PB_MONSTERS ids */ captain: string; officers: string[]; crew: string[];
  /** PB_SHIP_TEMPLATES id */ ships: string; /** PB_SHIPS ids */ vessels: string[]; aboard: string;
}
export interface PbShipTrait { name: string; text: string; [k: string]: unknown }
/** "Use the base stats of another vessel": a modifier applied on top of a PB_SHIPS entry. */
export interface PbShipTemplate {
  id: string; name: string; page: number; source: PbSourceName; text: string; traits: PbShipTrait[];
  undead?: boolean; captain?: string; baseShips?: string[]; template?: string;
}
export interface PbMarrowCannons { page: number; source: PbSourceName; author: string; text: string; monsters: string[] }
export interface PbEnemyBuilder {
  page: number; source: PbSourceName; note: string; procedure: ("hp" | "morale" | "armor" | "damage" | "special")[];
  tables: Record<"hp" | "morale" | "armor" | "damage" | "special", PbTable>;
  variants: Record<string, { page?: number; ids: string[]; rule?: string; note?: string; appearanceTable?: string }>;
}
export interface PbModuleNpc {
  id: string; name: string; role: string; page: number; source: PbSourceName; monster: string;
  wants?: string; doing?: { die: string; rows: PbRollEntry[] };
}
export interface PbModuleLocation {
  id: string; num?: number; name: string; page: number; text: string; areas?: string[];
  levels?: { name: string; page: number; areas: string[] }[];
}
export interface PbShopItem { name: string; cost?: number; costText?: string; [k: string]: unknown }
export interface PbModule {
  id: string; name: string; page: number; source: PbSourceName; book: PbSourceName;
  overview: string; secret: string; starts: string[]; reward: string;
  plotHooks: PbTable; development: PbTable; npcs: PbModuleNpc[]; locations: PbModuleLocation[];
  shop: { id: string; name: string; page: number; source: PbSourceName; note: string; relics: PbShopItem[]; rituals: PbShopItem[]; potions: PbShopItem[] };
  tables: Record<string, PbTable>;
}
