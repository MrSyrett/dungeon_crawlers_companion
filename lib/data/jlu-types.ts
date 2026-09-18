// GENERATED consumers rely on these shapes; the build asserts data against them.
// Justice League Unlimited RPG (Quickstart). SystemKey JLU.

export interface JluTier {
  key: string;
  name: string;
  label: string;
  value: number;
  playable: boolean;
  description: string;
  pax?: number;
  resolve?: number;
  defense?: number;
  attackBonus?: number;
  damageDie?: string;
  attrLimit?: number;
  powerLimit?: number;
}

export interface JluAttribute {
  name: string;
  summary: string;
  uses: string[];
}

export interface JluCondition {
  name: string;
  order: number;
  effect: string;
}

export interface JluStatus {
  name: string;
  effect: string;
}

export interface JluCrisis {
  roll: number;
  name: string;
  effect: string;
}

export interface JluOriginFeature {
  name: string;
  text: string;
}

export interface JluOrigin {
  name: string;
  summary: string;
  description: string;
  powerKit: string[];
  canBuyOutsideKit: boolean;
  features: JluOriginFeature[];
  freePower: string;
  limitation?: string;
}

export interface JluArchetypeAbility {
  name: string;
  text: string;
}

export interface JluArchetype {
  name: string;
  summary: string;
  examples: string;
  drawback: { name: string; text: string };
  abilities: JluArchetypeAbility[];
}

export interface JluPowerAbility {
  name: string;
  activation?: string;
  cost?: string;
  passive?: boolean;
  text: string;
}

export interface JluPowerGrade {
  grade: number;
  activationCost?: string;
  abilities: JluPowerAbility[];
}

export interface JluPower {
  name: string;
  category: "Superpower" | "Martial Training" | "Technology" | "Kit Power";
  paxPerGrade?: number;
  summary: string;
  note?: string;
  damageAttr?: string;
  chooseElement?: string;
  grades: JluPowerGrade[];
}

export interface JluKnowledgeAbility {
  name: string;
  text: string;
}

export interface JluKnowledge {
  name: string;
  cost: number;
  summary: string;
  abilities: JluKnowledgeAbility[];
}

export interface JluTrait {
  name: string;
  cost: number;
  kind: string;
  text: string;
}

export interface JluEquipment {
  name: string;
  category: "Weapon" | "Material" | "Gear";
  cost: string;
  text: string;
}

export interface JluLimitation {
  name: string;
  text: string;
  example: string;
}

export interface JluAttack {
  name: string;
  bonus: number;
  damage: string;
  type?: string;
  range?: string;
}

export interface JluAbility {
  name: string;
  text: string;
}

export interface JluBestiary {
  name: string;
  role: string;
  tier: string;
  origin?: string;
  realName?: string;
  attributes: {
    potency: number;
    accuracy: number;
    agility: number;
    resistance: number;
    spirit: number;
    mind: number;
  };
  resolve?: number;
  defense: number;
  damageReduction?: string;
  attacks?: JluAttack[];
  powers?: string[];
  knowledge?: string[];
  traits?: string[];
  equipment?: string[];
  abilities?: JluAbility[];
  archetypeSkills?: JluAbility[];
  limitations?: JluAbility[];
  description?: string;
  conditionBoxes?: number;
}

export interface JluRule {
  key: string;
  title: string;
  order: number;
  body: string;
}
