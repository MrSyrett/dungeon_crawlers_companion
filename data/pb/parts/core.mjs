// Pirate Borg — core rules (Player's Guidebook v1.0, Limithron 2025; printed page numbers).
// Numbers, names and table entries are exact; rules prose is paraphrased for this app.
// Pirate Borg is a MÖRK BORG derivative: d20 ± ability ≥ DR (roll high). No levels, XP points,
// AC, proficiency, saving throws, advantage/disadvantage or spell slots.

export const PB_ABILITIES = [
  { id: "STRENGTH", short: "STR", name: "Strength", uses: "Crush, lift, strike, grapple.",
    tests: ["melee attacks", "lifting", "grappling", "Come About (naval crew action)"] },
  { id: "AGILITY", short: "AGI", name: "Agility", uses: "Defend, balance, swim, flee.",
    tests: ["defense", "balance", "swimming", "fleeing", "Full Sail (naval crew action)"] },
  { id: "PRESENCE", short: "PRE", name: "Presence", uses: "Smarts, ranged weapons, perceive, charm.",
    tests: ["ranged attacks", "perception", "charm", "Fire Broadsides / Fire Small Arms / Repair (naval crew actions)"] },
  { id: "TOUGHNESS", short: "TOU", name: "Toughness", uses: "Drink grog, resist poison & rum, hold breath, survive falling.",
    tests: ["drinking grog", "resisting poison", "holding breath", "surviving falls"] },
  { id: "SPIRIT", short: "SPI", name: "Spirit", uses: "Willpower, using ancient relics, casting arcane rituals.",
    tests: ["willpower", "ancient relics (after use)", "arcane rituals"] },
];

// 3d6 → modifier (pg. 28). Only the modifier is kept.
export const PB_ABILITY_TABLE = [
  { roll: [3, 4], mod: -3 },
  { roll: [5, 6], mod: -2 },
  { roll: [7, 8], mod: -1 },
  { roll: [9, 12], mod: 0 },
  { roll: [13, 14], mod: 1 },
  { roll: [15, 16], mod: 2 },
  { roll: [17, 18], mod: 3 },
];

export const PB_DR = [
  { dr: 6, label: "easy", text: "Easy, even for a landlubber." },
  { dr: 8, label: "routine", text: "Routine, but some chance of failure." },
  { dr: 10, label: "pretty simple", text: "Pretty simple, but not too simple." },
  { dr: 12, label: "normal", text: "Normal — the standard difficulty.", standard: true },
  { dr: 14, label: "difficult", text: "Difficult." },
  { dr: 16, label: "really hard", text: "Really hard." },
  { dr: 18, label: "nigh impossible", text: "Nigh impossible." },
];

export const PB_RULES = {
  abilities: {
    page: 28, min: -3, max: 6, generation: "3d6", landlubberGeneration: "4d6 drop lowest",
    text: "Roll 3d6 for each ability and keep only the modifier from the table; the sum is then discarded. Class modifiers are applied afterwards. Landlubbers (no class) may roll 4d6 and drop the lowest die instead. Abilities can never go below −3 or above +6.",
  },
  tests: {
    page: 28, formula: "d20 ± ability ≥ DR", standardDR: 12,
    text: "Roll d20 and add or subtract the relevant ability. Equal to or higher than the Difficulty Rating (DR) succeeds. Creatures don't have abilities: they roll a plain d20 against the DR.",
    examples: [{ text: "Pick the jail lock", dr: 14 }, { text: "Climb the rigging", dr: 12 }, { text: "Lift the broken mast", dr: 16 }],
  },
  holdingBreath: {
    page: 28, ability: "TOUGHNESS", minutes: "1 + TOUGHNESS", minMinutes: 1, duress: "half (minimum 30 seconds)",
    test: { ability: "TOUGHNESS", dr: 12, drIncreasePerRound: 2, failure: "lose 1 HP" },
    text: "You can hold your breath for 1 + TOUGHNESS minutes (at least 1 minute), halved under physical duress such as fast swimming, combat or lifting (at least 30 seconds). After that, test TOUGHNESS DR12 every round — the DR rises by 2 each round — or lose 1 HP. At 0 HP you drown.",
  },
  carrying: {
    page: 29, normalItems: "8 + STRENGTH", overloadPenalty: { dr: 2, applies: ["STRENGTH", "AGILITY"] }, max: "(8 + STRENGTH) × 2",
    excluded: ["hats", "clothing"],
    normalSized: ["cargo nets", "muskets", "shovels"], notNormalSized: ["cannons", "sea chests", "oars", "corpses"],
    text: "You can carry 8 + STRENGTH normal-sized items without trouble. Beyond that, STRENGTH and AGILITY tests are DR +2. You can never carry more than double (8 + STRENGTH). Hats and clothing don't count.",
  },
  violence: {
    page: 30,
    text: "Players roll to attack and to defend; enemies never roll dice in combat. Enemies attack once per round unless noted otherwise.",
    initiative: { die: "d6", rows: [{ roll: [1, 3], text: "Enemies go first" }, { roll: [4, 6], text: "PCs go first" }], individual: "d6 + AGILITY" },
    attacks: [
      { id: "melee", name: "Melee attack", ability: "STRENGTH", dr: 12 },
      { id: "ranged", name: "Ranged attack", ability: "PRESENCE", dr: 12 },
      { id: "defense", name: "Defense", ability: "AGILITY", dr: 12, failure: "The enemy hits you: take its damage minus your armor die." },
    ],
    critical: {
      natural: 20,
      attack: "Deal double damage, then the target's armor/protection is reduced one tier.",
      defense: "The PC makes an immediate free attack.",
      effects: { attack: { damageMultiplier: 2, targetArmorTier: -1 }, defense: { freeAttack: true } },
    },
    fumble: {
      natural: 1,
      attack: "The weapon breaks or is lost.",
      defense: "The PC takes double damage, then their armor is reduced one tier.",
      blackPowder: "Fumbling an attack with a black powder weapon: roll on the Misfire table instead.",
      effects: { attack: { weaponLost: true }, defense: { damageMultiplier: 2, armorTier: -1 } },
    },
    misfire: {
      die: "d6",
      rows: [
        { roll: [1, 2], name: "Backfire", text: "Take d2 damage.", damage: "d2" },
        { roll: [3, 4], name: "Broken", text: "The weapon is broken.", weaponBroken: true },
        { roll: [5, 6], name: "Both", text: "Take d2 damage and the weapon is broken.", damage: "d2", weaponBroken: true },
      ],
    },
    rounds: { seconds: 6, text: "A round is about 6 seconds: enough to attack, run across a ship's deck, use a relic or complete a ritual." },
    movement: { feet: 30, squares: 6, halved: ["difficult terrain", "swimming"], text: "Most creatures move 30' (six 5-foot squares) a round; half speed in difficult terrain or while swimming." },
    reload: { actions: 2, buccaneer: 1, text: "Black powder guns take 2 actions (rounds) to reload — Buccaneers reload in 1." },
  },
  armor: {
    page: 30,
    tiers: [
      { tier: 0, die: null, name: "None" },
      { tier: 1, die: "d2", name: "Light" },
      { tier: 2, die: "d4", name: "Medium", agilityDR: 2, defenseDR: 2 },
      { tier: 3, die: "d6", name: "Heavy", agilityDR: 4, defenseDR: 2 },
    ],
    blackPowderIgnoresArmor: true,
    text: "When you take damage, roll your armor die and subtract it from the damage. Black powder weapons ignore armor. Armor damaged by a fumble or critical drops a tier but keeps its STRENGTH/AGILITY test penalties. Armor reduced below tier 1 is ruined and can't be repaired. Armor can never be repaired above its original tier.",
    magic: "Ancient relics and arcane rituals almost never work while wearing tier 2 or 3 armor or wielding cold iron (Zealots and Sorcerers may use them in tier 2).",
  },
  rest: {
    page: 31,
    short: { duration: "about 10 minutes", heal: "d4" },
    long: { duration: "overnight", heal: "d8" },
    starvation: { heal: 0, afterDays: 2, lossPerDay: "d4", text: "Without food or drink you restore 0 HP; after two days of starving you lose d4 HP per day." },
    infection: { lossPerMorning: "d6", conditions: ["infected", "sick", "bleeding", "poisoned"], text: "Infected, sick, bleeding or poisoned characters lose d6 HP every morning instead of recovering." },
  },
  reaction: {
    page: 31, die: "2d6", text: "Roll when meeting creatures whose reaction is uncertain.",
    rows: [
      { roll: [2, 3], text: "Bloodthirsty" },
      { roll: [4, 6], text: "Angered or alarmed" },
      { roll: [7, 8], text: "Indifferent, neutral" },
      { roll: [9, 10], text: "Almost friendly" },
      { roll: [11, 12], text: "Helpful" },
    ],
  },
  morale: {
    page: 31, die: "2d6",
    triggers: ["The leader is killed.", "Half of the group is eliminated.", "A single enemy has only 1/3 of its HP left."],
    text: "Most enemies won't fight to the death. Roll 2d6 when a trigger happens: a result greater than the creature's Morale means it is demoralized — roll d6: 1-3 it flees, 4-6 it surrenders. Creatures with Morale '–' never break.",
    result: { die: "d6", rows: [{ roll: [1, 3], text: "Flees" }, { roll: [4, 6], text: "Surrenders" }] },
  },
  hitPoints: {
    page: 32, landlubber: "d10 ± TOUGHNESS", minimumStart: 1,
    text: "Starting HP comes from your class die ± TOUGHNESS (landlubbers d10 ± TOUGHNESS). You never start with less than 1 HP.",
  },
  broken: {
    page: 32, die: "d6", text: "At exactly 0 HP you are Broken: roll d6.",
    rows: [
      { roll: 1, name: "Instant death", text: "Instant death.", dead: true },
      { roll: 2, name: "Hemorrhage", text: "Death in d2 hours unless treated. All tests are DR16 the first hour and DR18 the last hour.", deathIn: "d2 hours", testDR: [16, 18] },
      { roll: 3, name: "Brain injury", text: "You wake in 1 hour with −3 to PRESENCE for d8 days.", ability: { PRESENCE: -3 }, duration: "d8 days" },
      { roll: 4, name: "Limb or eye", text: "Roll d6: 1-5 a broken or severed limb, 6 a lost eye. You can't act for d4 rounds, then become active with d4 HP.", sub: { die: "d6", rows: [{ roll: [1, 5], text: "Broken or severed limb" }, { roll: 6, text: "Lost eye" }] }, outRounds: "d4", hp: "d4" },
      { roll: 5, name: "Unconscious", text: "Fall unconscious for d4 rounds, then wake with 1 HP and 0 Devil's Luck.", outRounds: "d4", hp: 1, luck: 0 },
      { roll: 6, name: "Dazed", text: "Fall unconscious for d2 rounds, then wake with d4 HP and d2 Devil's Luck.", outRounds: "d2", hp: "d4", luck: "d2" },
    ],
  },
  death: {
    page: 32,
    text: "Reduced below 0 HP you are Dead — skip Broken. Down to Davy Jones' Locker with ye! Optionally the GM may let a dead PC return as a Haunted Soul (pg. 46).",
    hauntedSoulOption: true,
  },
  grog: {
    page: 37, test: { ability: "TOUGHNESS", dr: "8 + drinks in the last hour" }, heal: "d4",
    failure: "Vomit for d2 rounds.", agilityPerDrink: -1, durationPerDrink: "1 hour",
    text: "Drinking grog or rum: test TOUGHNESS DR8 + the number of drinks you've had in the last hour to heal d4 HP; on a failure you vomit for d2 rounds. Each drink also gives −1 AGILITY, lasting one hour per drink.",
  },
  devilsLuck: {
    page: 54, landlubberDie: "d2", start: "Roll your class's Devil's Luck die.",
    recharge: "After resting at least 6 hours, if (and only if) your Luck is depleted, roll your class die and regain that much Luck.",
    rechargeRestHours: 6, rechargeOnlyWhenEmpty: true,
    uses: [
      { id: "maxDamage", text: "Deal maximum damage with one attack." },
      { id: "reroll", text: "Reroll any die roll." },
      { id: "lowerDR", text: "Lower one test's DR by 4.", dr: -4 },
      { id: "reduceDamage", text: "Lower damage dealt to you by d6 (roll when you take the damage).", reduce: "d6" },
      { id: "neutralize", text: "Neutralize a Crit or a Fumble." },
    ],
    variant: "Optional for large groups (5+ PCs): Devil's Luck may only be spent on yourself or a player sitting next to you.",
  },
  experience: {
    page: 33,
    when: "The GM decides when characters improve — e.g. after taking a prize, raiding a port, dividing the plunder, burying treasure or exploring a temple.",
    steps: [
      { id: "abilities", name: "Ability changes", text: "Roll d6 for every ability. A result equal to or higher than the ability raises it by 1 (max +6); lower results reduce it by 1. Abilities from −3 to +1 always rise by 1 unless the d6 shows 1, in which case they drop by 1 (never below −3)." },
      { id: "hp", name: "More HP", text: "Increase maximum HP by d6. Current HP only rises by resting or healing.", hpMax: "d6" },
      { id: "feature", name: "Gain a class feature", text: "See your class description." },
      { id: "amongTheDead", name: "Among the dead you find", text: "Roll on the Among the Dead table (d6)." },
    ],
    // Machine-readable ability procedure: low (−3..+1): d6 = 1 → −1, else +1. High (≥ +2): d6 ≥ value → +1, else −1.
    abilityProcedure: { die: "d6", lowRange: [-3, 1], lowFailOn: 1, min: -3, max: 6 },
    amongTheDead: {
      die: "d6",
      rows: [
        { roll: [1, 2], text: "Nothing." },
        { roll: 3, text: "A weapon (roll d10 on the starting weapon table, pg. 50).", table: "startingWeapons", die: "d10" },
        { roll: 4, text: "3d10 silver.", silver: "3d10" },
        { roll: 5, text: "1 ancient relic (pg. 62).", table: "relics" },
        { roll: 6, text: "1 arcane ritual (pg. 64).", table: "rituals" },
      ],
    },
  },
  relics: {
    page: 62, action: true, afterUse: { ability: "SPIRIT", dr: 12 },
    failure: "Stunned for the next round, and that relic can't be used again until the next dawn.",
    fumble: "The relic is permanently destroyed or depleted, and you lose d2 HP.",
    crit: "GM decides the effect, if any.",
    text: "Use your action to activate a relic you carry. After using it, test SPIRIT DR12. Relics almost never work while wearing tier 2 or 3 armor or wielding cold iron.",
  },
  rituals: {
    page: 64, castsPerDay: "d4 + SPIRIT", reset: "dawn", test: { ability: "SPIRIT", dr: 12 },
    success: "Subtract 1 from your daily total.",
    failure: "Roll on Mystical Mishaps (d20); that ritual can't be used again until dawn.",
    critOrFumble: "GM decides the effect, if any.",
    text: "Every dawn roll d4 + SPIRIT for how many rituals you can cast that day. Use your action (or longer) and test SPIRIT DR12. Rituals almost always fail if the caster carries anything made of cold iron or touches metal. Brutes can't use rituals.",
    modifiers: [
      { id: "duress", text: "Casting under duress", dr: 2, orMore: true },
      { id: "minute", text: "Take 1 minute to cast", dr: -2 },
      { id: "hour", text: "Take 1 hour to cast", dr: -4 },
      { id: "together", text: "Several casters working together: roll twice, keep the higher roll", rollTwiceKeepHigh: true },
      { id: "blood", text: "Spend HP in blood", drPerHp: -1 },
    ],
    repeatedMishap: "If the same mishap is rolled twice, the caster's body slowly melts into sea water.",
  },
  creation: {
    page: 27,
    steps: [
      { id: "gear", text: "Roll on each starting gear table: container (d6), cheap gear (d12) and fancy gear (d12)." },
      { id: "abilities", text: "Roll ability scores: 3d6 for each ability (landlubbers may roll 4d6 and drop the lowest)." },
      { id: "class", text: "Choose or roll a class (d6, or d8 to include the optional Haunted Soul and Tall Tale), or be a landlubber with no class. The class sets HP, weapon, clothing, hat and Devil's Luck." },
      { id: "background", text: "Choose or roll background details: Background & silver (d100), Distinctive Flaw (d20), Physical Trademark (d20), Idiosyncrasies (d20), Unfortunate Incidents & Conditions (d20), Thing of Importance (d100)." },
      { id: "name", text: "Name your pirate: d66 × 4 on the name generator (pg. 79)." },
    ],
    classDie: "d6", classDieOptional: "d8",
  },
};
