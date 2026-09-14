// Hand-authored types for the DarkSpace data layer (Science Fiction for
// Shadowdark, DMing the World Press).
//
// Canonical data lives in the sheet module public/tools-data/sd-darkspace.js
// (window.DARKSPACE). scripts/build-darkspace-data.mjs evaluates that module and
// emits lib/data/darkspace.ts (typed `export const`s the Next reference pages
// import). Edit the .js source, then regenerate:
//   node scripts/build-darkspace-data.mjs

export type DarkSpaceStat = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

/** A d20 Species Trait. */
export interface DsSpecies {
  n: number;
  name: string;
  text: string;
}

/** Android / Power Armor Spacer — the manufactured/suit species. */
export interface DsTechSpecies {
  name: string;
  text: string;
}

export interface DsArchetypeFeature {
  name: string;
  text: string;
}

/** One band of a 2d6 archetype talent table (r is a result or range: "2", "3-6"). */
export interface DsTalentRow {
  r: string;
  text: string;
}

export interface DsArchetype {
  name: string;
  /** Prime stat, or "—" for Machine-Based. */
  stat: string;
  hitDie: number;
  weapons: string;
  armor: string;
  blurb: string;
  features: DsArchetypeFeature[];
  talents: DsTalentRow[];
}

/** A d20 Background. */
export interface DsBackground {
  n: number;
  name: string;
  text: string;
}

export interface DsMotivation {
  /** Short code: S / VL / VR. */
  code: string;
  name: string;
  text: string;
  startBonus: string;
  effect: string;
}

export interface DsTriadPower {
  name: string;
  stat: string;
  text: string;
}

export interface DsTriadFeat {
  diff: string;
  dc: number;
  die: string;
}

export interface DsTriadExampleFeat {
  power: string;
  name: string;
  text: string;
}

export interface DsTriad {
  intro: string;
  powers: DsTriadPower[];
  feats: DsTriadFeat[];
  notes: string;
  exampleFeats?: DsTriadExampleFeat[];
}

export interface DsCorruption {
  intro: string;
  check: string;
  threshold: string;
  restoration: string;
  sideEffects: Record<string, string[]>;
  sources: Record<string, string[]>;
}

export interface DsGearItem {
  name: string;
  cost: number;
  /** Slot text, e.g. "1", "2 per slot", "free to carry". */
  slot: string;
  /** Whether it needs an Energy Cell to run. */
  ec: boolean;
  desc: string;
}

export interface DsArmor {
  name: string;
  cost: number;
  /** Usually a number of gear slots; a few are text ("+1"). */
  slots: number | string;
  ac: string;
  props: string;
}

export interface DsWeapon {
  name: string;
  cost: number;
  range: string;
  dmg: string;
  props: string;
  /** Ranged weapons group into Projectile / Disabling / Energy. */
  group?: string;
}

export interface DsShipWeapon {
  name: string;
  cost: number;
  range: string;
  dmg: string;
  props: string;
}

export interface DsShipArmor {
  name: string;
  cost: number;
  ac: string;
  props: string;
}

export interface DsStockClass {
  name: string;
  text: string;
}

export interface DsShipClassFeature {
  name: string;
  text: string;
}

export interface DsShipClassTalent {
  r: string;
  text: string;
}

/** A playable ship Classification — the ship equivalent of a character class. */
export interface DsShipClassification {
  name: string;
  blurb: string;
  /** Base System slots. */
  sysSlots: number;
  /** Base Feature slots. */
  featSlots: number;
  /** Component granted free at creation (takes a slot, costs nothing). */
  freeComponent: string;
  /** HP die rolled per level. */
  hpDie: string;
  features: DsShipClassFeature[];
  talents: DsShipClassTalent[];
}

/** A purchasable ship component (System or Feature). */
export interface DsShipComponent {
  name: string;
  cost: number;
  maint: number;
  type: "System" | "Feature";
  advanced: boolean;
  costNote?: string;
  desc: string;
}

export interface DsCommandCrewRole {
  role: string;
  text: string;
}

export interface DsShip {
  design: string[];
  classes: string[];
  baseSystems: string[];
  classifications: DsShipClassification[];
  components: DsShipComponent[];
  weaponProps: Record<string, string>;
  armorProps: Record<string, string>;
  commandCrew: DsCommandCrewRole[];
  weapons: DsShipWeapon[];
  armor: DsShipArmor[];
  stockClasses: DsStockClass[];
}

export interface DsAdvancedTech {
  name: string;
  text: string;
}

export interface DsQuickRule {
  title: string;
  text: string;
}

export interface DsSpacersKit {
  cost: number;
  slots: number;
  note: string;
  items: string[];
}

/** A DarkSpace "Denizen" (bestiary stat block). Living creatures carry
 *  s/d/c/i/w/ch; digital entities (Interface constructs) carry acc/ctl/net. */
export interface DsMonster {
  name: string;
  ac: string;
  hp: string;
  atk: string;
  mv: string;
  lv: string;
  /** Motivation code (Vl / Vr / S / Su / Vi / Any). */
  mo?: string;
  s?: string; d?: string; c?: string; i?: string; w?: string; ch?: string;
  acc?: string; ctl?: string; net?: string;
  /** True for ship-scale denizens (attack/damage at ship scale). */
  shipScale?: boolean;
  desc?: string;
  notes?: string;
}

export interface DarkSpaceData {
  terms: Record<string, string>;
  species: DsSpecies[];
  humanNote: string;
  techSpecies: DsTechSpecies[];
  archetypes: DsArchetype[];
  backgrounds: DsBackground[];
  motivations: DsMotivation[];
  triad: DsTriad;
  corruption: DsCorruption;
  credits: { note: string };
  citizenGear: string[];
  spacersKit: DsSpacersKit;
  gear: DsGearItem[];
  armor: DsArmor[];
  meleeWeapons: DsWeapon[];
  rangedWeapons: DsWeapon[];
  explosives: DsWeapon[];
  weaponProps: Record<string, string>;
  ship: DsShip;
  advancedTech: DsAdvancedTech[];
  advancedTechNote: string;
  quickRules: DsQuickRule[];
}
