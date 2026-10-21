// Dragonbane (Free League, 2023) — core rules data.
// Mechanics and table values are game facts from the Dragonbane Core Rules
// (2nd printing); all descriptive text is original paraphrase written for
// this app. Page numbers refer to the printed Core Rules book.

export const DB_ATTRIBUTES = [
  { id: "STR", name: "Strength", condition: "Exhausted", text: "Raw muscle power." },
  { id: "CON", name: "Constitution", condition: "Sickly", text: "Physical fitness and staying power." },
  { id: "AGL", name: "Agility", condition: "Dazed", text: "Body control, speed and fine motor control." },
  { id: "INT", name: "Intelligence", condition: "Angry", text: "Sharpness of mind, reasoning and intellect." },
  { id: "WIL", name: "Willpower", condition: "Scared", text: "Self-discipline and focus." },
  { id: "CHA", name: "Charisma", condition: "Disheartened", text: "Force of personality and empathy." },
];

// Six conditions — each gives a bane on rolls against its attribute and on
// skill rolls based on it (p.32, p.51).
export const DB_CONDITIONS = [
  { id: "exhausted", name: "Exhausted", attribute: "STR" },
  { id: "sickly", name: "Sickly", attribute: "CON" },
  { id: "dazed", name: "Dazed", attribute: "AGL" },
  { id: "angry", name: "Angry", attribute: "INT" },
  { id: "scared", name: "Scared", attribute: "WIL" },
  { id: "disheartened", name: "Disheartened", attribute: "CHA" },
];

// 30 core skills (p.33–35) + the three schools of magic (secondary skills, p.57).
export const DB_SKILLS = [
  { id: "acrobatics", name: "Acrobatics", attribute: "AGL", type: "general", page: 33, text: "Jumping, climbing, balancing and similar feats of body control." },
  { id: "awareness", name: "Awareness", attribute: "INT", type: "general", page: 33, text: "Watching and listening for threats — opposed by Sneaking. Passive rolls can't be pushed, and others can't help." },
  { id: "bartering", name: "Bartering", attribute: "CHA", type: "general", page: 33, text: "Haggling: success moves the price 20% your way; a Dragon halves or doubles it; a Demon offends the other party and ends the deal." },
  { id: "beast-lore", name: "Beast Lore", attribute: "INT", type: "general", page: 33, text: "Identifying animals and monsters and recalling their habits, abilities and weaknesses." },
  { id: "bluffing", name: "Bluffing", attribute: "CHA", type: "general", page: 34, text: "Coming up with a convincing lie on the spot. A weak story earns a bane; an impossible one fails outright." },
  { id: "bushcraft", name: "Bushcraft", attribute: "INT", type: "general", page: 34, text: "Finding the way through the wild, making camp, cooking and keeping warm." },
  { id: "crafting", name: "Crafting", attribute: "STR", type: "general", page: 34, text: "Repairing and making gear — usually a shift of work with the right tools." },
  { id: "evade", name: "Evade", attribute: "AGL", type: "general", page: 34, text: "Dodging attacks and getting away from a fight." },
  { id: "healing", name: "Healing", attribute: "INT", type: "general", page: 34, text: "Saving the dying and tending wounds." },
  { id: "hunting-fishing", name: "Hunting & Fishing", attribute: "AGL", type: "general", page: 34, text: "Tracking game and catching food in the wild." },
  { id: "languages", name: "Languages", attribute: "INT", type: "general", page: 34, text: "Understanding foreign and ancient tongues. Everyone speaks the common tongue; non-human kin also know their own language." },
  { id: "myths-legends", name: "Myths & Legends", attribute: "INT", type: "general", page: 34, text: "Remembering old stories, far-off lands and links to the past." },
  { id: "performance", name: "Performance", attribute: "CHA", type: "general", page: 34, text: "Singing, reciting, joking — entertaining a crowd." },
  { id: "persuasion", name: "Persuasion", attribute: "CHA", type: "general", page: 34, text: "Winning people over by charm, threats or reason. Asking for something costly makes it opposed by the target's WIL. Monsters can't be persuaded unless noted." },
  { id: "riding", name: "Riding", attribute: "AGL", type: "general", page: 34, text: "Advanced manoeuvres on horseback; special rules apply in combat." },
  { id: "seamanship", name: "Seamanship", attribute: "INT", type: "general", page: 34, text: "Steering a vessel in hard conditions, and navigation." },
  { id: "sleight-of-hand", name: "Sleight of Hand", attribute: "AGL", type: "general", page: 34, text: "Stealing unnoticed, picking locks and other fiddly handwork." },
  { id: "sneaking", name: "Sneaking", attribute: "AGL", type: "general", page: 34, text: "Moving unseen. Opposed by Awareness when someone is searching. In a group, one failure gives everyone away." },
  { id: "spot-hidden", name: "Spot Hidden", attribute: "INT", type: "general", page: 35, text: "Searching for something concealed — about a stretch per search, one try per place." },
  { id: "swimming", name: "Swimming", attribute: "AGL", type: "general", page: 35, text: "Harder swimming and diving; see the swimming and drowning rules." },
  { id: "axes", name: "Axes", attribute: "STR", type: "weapon", page: 35, text: "Fighting with axes of all kinds, including throwing them." },
  { id: "bows", name: "Bows", attribute: "AGL", type: "weapon", page: 35, text: "Shooting bows of every kind except crossbows." },
  { id: "brawling", name: "Brawling", attribute: "STR", type: "weapon", page: 35, text: "Unarmed fighting with fists, feet, teeth or claws." },
  { id: "crossbows", name: "Crossbows", attribute: "AGL", type: "weapon", page: 35, text: "Shooting crossbows of all kinds." },
  { id: "hammers", name: "Hammers", attribute: "STR", type: "weapon", page: 35, text: "Warhammers and other blunt weapons such as clubs and maces." },
  { id: "knives", name: "Knives", attribute: "AGL", type: "weapon", page: 35, text: "Knives and daggers, including throwing them." },
  { id: "slings", name: "Slings", attribute: "AGL", type: "weapon", page: 35, text: "Attacking with a sling." },
  { id: "spears", name: "Spears", attribute: "STR", type: "weapon", page: 35, text: "Spears and tridents, thrown or held — and lances." },
  { id: "staves", name: "Staves", attribute: "AGL", type: "weapon", page: 35, text: "Fighting with a staff." },
  { id: "swords", name: "Swords", attribute: "STR", type: "weapon", page: 35, text: "All kinds of swords." },
  { id: "animism", name: "Animism", attribute: "INT", type: "secondary", school: true, page: 57, text: "Magic lent by the spirits that dwell in all living things and places." },
  { id: "elementalism", name: "Elementalism", attribute: "INT", type: "secondary", school: true, page: 57, text: "Magic of the four elements — wind, water, earth and fire." },
  { id: "mentalism", name: "Mentalism", attribute: "INT", type: "secondary", school: true, page: 57, text: "Magic drawn from within through discipline of mind and body." },
];

export const DB_KIN = [
  {
    id: "human", name: "Human", page: 10, roll: [1, 4], movement: 10,
    text: "The youngest kin, now spread across most of the known world — farmers clustered around castles, the warriors sworn to guard them, and the bold few who seek gold, glory and knowledge in the unknown.",
    abilities: [{ id: "adaptive", name: "Adaptive", wp: 3, timing: "free", text: "When rolling for a skill, you may roll a different skill of your choice instead, as long as you can justify how it applies. The GM decides, but should be generous." }],
    names: ["Joruna", "Tym", "Halvelda", "Garmander", "Verolun", "Lothar"],
  },
  {
    id: "halfling", name: "Halfling", page: 11, roll: [5, 7], movement: 8,
    text: "Small, good-natured folk of the hilly farmlands who love home, hearth and a full larder — and old songs and tales, which now and then lure them out on adventures. Wary of the tall folk, they are good at hiding and slipping out of trouble.",
    abilities: [{ id: "hard-to-catch", name: "Hard to Catch", wp: 3, timing: "reaction", text: "Activate when dodging an attack to get a boon on the Evade roll." }],
    names: ["Snappy", "Brine", "Cottar", "Bumble", "Perrywick", "Theoline"],
  },
  {
    id: "dwarf", name: "Dwarf", page: 11, roll: [8, 9], movement: 8,
    text: "The oldest of the elder folk by their own reckoning — proud, traditional, bound to the bedrock and famed as smiths, stoneworkers and fierce wielders of axe and hammer.",
    abilities: [{ id: "unforgiving", name: "Unforgiving", wp: 3, timing: "free", text: "Activate when attacking someone who has ever dealt you at least 1 point of damage to get a boon on the roll, no matter how long ago it happened. Keeping a list of names is wise." }],
    names: ["Tinderrock", "Halwyld", "Tymolana", "Traut", "Urd", "Fermer"],
  },
  {
    id: "elf", name: "Elf", page: 12, roll: [10, 10], movement: 10,
    text: "Ancient wardens of the forests who look to the stars for guidance. Their inward, meditative ways can be hard for outsiders to follow, yet their warriors are praised in song for skill with sword and bow.",
    abilities: [{ id: "inner-peace", name: "Inner Peace", wp: null, timing: "rest", text: "You can meditate deeply during a stretch rest, healing an extra D6 HP and D6 WP and recovering from one additional condition. While meditating you are completely unresponsive and can't be woken." }],
    names: ["Arasin", "Illyriana", "Galvander", "Tyrindelia", "Erwilnor", "Andremone"],
  },
  {
    id: "mallard", name: "Mallard", page: 12, roll: [11, 11], movement: 8,
    text: "Feathered humanoids of mysterious origin — a sunken island realm, or a magical experiment gone wrong? Born traders whose quacking fills every marketplace, though some take up piracy or the sword, small but feared for their temper.",
    abilities: [
      { id: "ill-tempered", name: "Ill-Tempered", wp: 3, timing: "free", text: "Activate (no action) when making a skill roll to get a boon, and become Angry if you aren't already. Can't be used for rolls against INT or INT-based skills." },
      { id: "webbed-feet", name: "Webbed Feet", wp: null, timing: "passive", text: "You get a boon on all Swimming rolls and always move at full speed in or under water." },
    ],
    names: ["Qwucksum", "Splats", "Moggee", "Groddy", "Blisandina", "Hackleswell"],
  },
  {
    id: "wolfkin", name: "Wolfkin", page: 13, roll: [12, 12], movement: 12,
    text: "The untamed fury of the wild — thoughtful and often brilliant, yet carrying ancient hunting instincts and old anger over wrongs done to wolves and the wilderness. Unmatched hunters and pathfinders.",
    abilities: [{ id: "hunting-instincts", name: "Hunting Instincts", wp: 3, timing: "action", text: "Mark a creature you can see or smell as your prey (an action in combat). You can follow its scent for a full day, and spend 1 more WP (not an action) to get a boon on an attack against it." }],
    names: ["Wyld", "Wolfshadow", "Lunariem", "Obdurian", "Frostbite", "Wuldenhall"],
  },
];

// Character-creation and derived-rating tables (p.9, p.24–28).
export const DB_TABLES = {
  kinDie: "D12",
  professionDie: "D10",
  creationSteps: [
    "Choose or roll your kin", "Note your innate ability", "Choose or roll your profession", "Choose or roll your age",
    "Choose or roll your name", "Roll your attributes", "Calculate your derived ratings", "Choose your trained skills",
    "Note your heroic ability", "Choose or roll a weakness (optional)", "Choose or roll your gear",
    "Choose or roll a memento (optional)", "Choose or roll your appearance",
  ],
  attributeRoll: { dice: "4D6", drop: "lowest", min: 3, max: 18, swapTwo: true },
  ages: [
    { id: "young", name: "Young", roll: [1, 3], trainedSkills: 8, professionSkills: 6, freeSkills: 2, mods: { AGL: 1, CON: 1 } },
    { id: "adult", name: "Adult", roll: [4, 5], trainedSkills: 10, professionSkills: 6, freeSkills: 4, mods: {} },
    { id: "old", name: "Old", roll: [6, 6], trainedSkills: 12, professionSkills: 6, freeSkills: 6, mods: { STR: -2, AGL: -2, CON: -2, INT: 1, WIL: 1 } },
  ],
  attributeMax: 18,
  // Attribute score → base chance (p.25). Trained skills start at twice the base chance.
  baseChance: [{ min: 1, max: 5, value: 3 }, { min: 6, max: 8, value: 4 }, { min: 9, max: 12, value: 5 }, { min: 13, max: 15, value: 6 }, { min: 16, max: 18, value: 7 }],
  trainedMultiplier: 2,
  skillMax: 18,
  // Movement = kin base + AGL modifier (p.25).
  movementAgl: [{ min: 1, max: 6, mod: -4 }, { min: 7, max: 9, mod: -2 }, { min: 10, max: 12, mod: 0 }, { min: 13, max: 15, mod: 2 }, { min: 16, max: 18, mod: 4 }],
  // STR / AGL damage bonus (p.25). Crossbows never add a damage bonus.
  damageBonus: [{ min: 1, max: 12, value: null }, { min: 13, max: 16, value: "D4" }, { min: 17, max: 99, value: "D6" }],
  hp: { attribute: "CON", perRobust: 2 },
  wp: { attribute: "WIL", perFocused: 2 },
  preparedSpells: "Equal to your INT base chance (magic tricks don't count).",
  // Encumbrance (p.28).
  encumbrance: { carry: "ceil(STR/2)", backpack: 2, weaponsAtHand: 3, rationsPerItem: 4, coinsPerItem: 100, quiverItems: 1 },
  coins: { copperPerSilver: 10, silverPerGold: 10, units: ["gold", "silver", "copper"] },
  // Units of time (p.7).
  time: [
    { id: "round", name: "Round", length: "10 seconds", use: "One combat action; a round rest." },
    { id: "stretch", name: "Stretch", length: "15 minutes", use: "Explore a room; a stretch rest." },
    { id: "shift", name: "Shift", length: "6 hours", use: "Hike about 15 km; a shift rest. Four per day: morning, day, evening, night." },
  ],
  // Rolls (p.31–33).
  rolls: {
    dragon: 1, demon: 20, defaultNpcSkill: 5, monsterDefense: 15,
    boon: "Roll an extra D20 and keep the lowest.", bane: "Roll an extra D20 and keep the highest.",
    boonsCancelBanes: true, oneHelper: true,
  },
  // Resting (p.52).
  rests: [
    { id: "round", name: "Round Rest", length: "round", hp: null, wp: "D6", conditions: 0, perShift: 1, note: "An action in combat." },
    { id: "stretch", name: "Stretch Rest", length: "stretch", hp: "D6", hpTended: "2D6", wp: "D6", conditions: 1, perShift: 1, note: "2D6 HP if someone tends you with a successful Healing roll (they can't rest and can tend only one person)." },
    { id: "shift", name: "Shift Rest", length: "shift", hp: "all", wp: "all", conditions: "all", perShift: null, note: "Only in a safe place with no enemies near; interrupted by combat or hard work, it has no effect." },
  ],
  // Death and dying (p.50).
  death: {
    deathRoll: "CON", successes: 3, failures: 3, recoverHp: "D6", dragonCounts: 2, demonCounts: 2,
    damageAtZero: "Counts as one failed death roll.", rallyRange: 10, rallySelf: "WIL with a bane",
    saveLife: "Healing roll by someone adjacent (bane without bandages); success stops death rolls and restores D6 HP.",
    instantDeath: "A single attack that takes you to negative HP equal to your maximum HP kills outright.",
    severeInjury: "If you survive reaching zero HP, roll CON; on a failure roll on the severe injury table.",
  },
  // Light sources: radius and the die rolled after every stretch — 1 means it goes out (p.52, p.78).
  light: [
    { item: "Torch", radius: 10, die: "D6", note: "Also roll when used as a weapon." },
    { item: "Oil Lamp", radius: 10, die: "D6" },
    { item: "Lantern", radius: 10, die: "D8" },
    { item: "Tallow Candle", radius: 4, die: "D4", note: "Also roll when the bearer attacks or is attacked." },
  ],
  // Poisons (p.52–53): open opposed roll potency vs CON.
  poisons: {
    potency: { weak: 9, moderate: 12, strong: 15 },
    types: [
      { id: "lethal", name: "Lethal", full: "D6 damage each round on your turn until zero HP; an antidote stops it.", limited: "D6 damage on your next turn." },
      { id: "paralyzing", name: "Paralyzing", full: "Exhausted, and a CON roll each turn or you can't move or act that round; wears off after a stretch or with an antidote.", limited: "Exhausted." },
      { id: "sleeping", name: "Sleeping", full: "Dazed, and a CON roll each turn or you fall asleep for a shift; an antidote or any damage wakes you.", limited: "Dazed." },
    ],
    monsters: "Poison has no effect on monsters.",
  },
  fear: { roll: "WIL", table: "fear" },
  falling: "D6 bludgeoning per full 2 m fallen (half the height, rounded down); a fall under 2 m does nothing. A successful Acrobatics roll halves the dice (rounded up). Armor doesn't help.",
  // Combat quick reference (p.41–49).
  combat: {
    initiative: "Each round everyone draws an initiative card (1–10); lowest acts first. Monsters draw one card per point of Ferocity.",
    turn: "On your turn you may move up to your Movement and perform one action, in either order (you may split movement around the action).",
    freeActions: ["Draw, swap or put away a weapon at hand", "Drop prone or stand up", "Drop an item", "Shout a few words"],
    actions: ["Dash", "Melee Attack", "Ranged Attack", "Parry (reaction)", "Dodge (reaction)", "Pick Up Item", "Equip/Unequip Armor or Helmet", "First Aid", "Rally", "Break Down Door", "Pick Lock", "Use Item", "Activate Ability", "Cast Spell", "Help", "Round Rest"],
    meleeRange: 2, longRange: 4, squareSize: 2,
    proneTarget: "Boon on the attack and +D6 damage.",
    rangedTooClose: "Bane when the target is within 2 m.",
    longRangeShot: "Up to twice the listed range with a bane.",
  },
};
