// GENERATED FILE - do not edit by hand.
// Source: data/pb/parts/*.mjs - regenerate with: node scripts/build-pb-data.mjs
// Pirate Borg (Limithron). Mechanics and table values are game facts;
// descriptive text is original paraphrase written for this app.
import type { PbAbility, PbAbilityRow, PbAlchemy, PbAmmo, PbArmorRepair, PbAsh, PbBackground, PbBomb, PbBombRules, PbCaptain, PbCardDeck, PbCargo, PbClass, PbClothing, PbContainer, PbCrewAction, PbCrewMod, PbDeity, PbDrLabel, PbEnemyBuilder, PbFaction, PbGear, PbGearRoll, PbGenerator, PbHat, PbMarrowCannons, PbMishap, PbModule, PbMonster, PbNameRow, PbNamedRoll, PbNavalRules, PbPirateGen, PbPointOfSail, PbPrayer, PbPrice, PbRelic, PbRitual, PbRollEntry, PbRuleNote, PbRules, PbSetting, PbShanty, PbShantyRules, PbShip, PbShipStat, PbShipTemplate, PbShipsAtSea, PbShipwright, PbSpecialtyCrew, PbSpell, PbTable, PbTravel, PbTravelEvents, PbTreasureMaps, PbWeapon, PbWind } from "./pb-types";

export const PB_ABILITIES: PbAbility[] = [
 {
  "id": "STRENGTH",
  "short": "STR",
  "name": "Strength",
  "uses": "Crush, lift, strike, grapple.",
  "tests": [
   "melee attacks",
   "lifting",
   "grappling",
   "Come About (naval crew action)"
  ]
 },
 {
  "id": "AGILITY",
  "short": "AGI",
  "name": "Agility",
  "uses": "Defend, balance, swim, flee.",
  "tests": [
   "defense",
   "balance",
   "swimming",
   "fleeing",
   "Full Sail (naval crew action)"
  ]
 },
 {
  "id": "PRESENCE",
  "short": "PRE",
  "name": "Presence",
  "uses": "Smarts, ranged weapons, perceive, charm.",
  "tests": [
   "ranged attacks",
   "perception",
   "charm",
   "Fire Broadsides / Fire Small Arms / Repair (naval crew actions)"
  ]
 },
 {
  "id": "TOUGHNESS",
  "short": "TOU",
  "name": "Toughness",
  "uses": "Drink grog, resist poison & rum, hold breath, survive falling.",
  "tests": [
   "drinking grog",
   "resisting poison",
   "holding breath",
   "surviving falls"
  ]
 },
 {
  "id": "SPIRIT",
  "short": "SPI",
  "name": "Spirit",
  "uses": "Willpower, using ancient relics, casting arcane rituals.",
  "tests": [
   "willpower",
   "ancient relics (after use)",
   "arcane rituals"
  ]
 }
];

export const PB_ABILITY_TABLE: PbAbilityRow[] = [
 {
  "roll": [
   3,
   4
  ],
  "mod": -3
 },
 {
  "roll": [
   5,
   6
  ],
  "mod": -2
 },
 {
  "roll": [
   7,
   8
  ],
  "mod": -1
 },
 {
  "roll": [
   9,
   12
  ],
  "mod": 0
 },
 {
  "roll": [
   13,
   14
  ],
  "mod": 1
 },
 {
  "roll": [
   15,
   16
  ],
  "mod": 2
 },
 {
  "roll": [
   17,
   18
  ],
  "mod": 3
 }
];

export const PB_ALCHEMY: PbAlchemy = {
 "page": 70,
 "source": "Core Rules",
 "methods": [
  {
   "id": "fast",
   "name": "Fast",
   "text": "Roll 1d20 and read straight across."
  },
  {
   "id": "random",
   "name": "Random",
   "text": "Roll 6d20 (one per column) and let fate decide. Add extra ingredients to taste."
  },
  {
   "id": "precise",
   "name": "Precise",
   "text": "Pick and choose like the true alchemist you are."
  }
 ],
 "notes": [
  "Results are never guaranteed.",
  "Most potions cost d100 silver pieces of eight from a reliable source — good luck finding one.",
  "Side quest hook: finding potion ingredients.",
  "The DR can be used as the TOUGHNESS DR to resist the potion, or the PRESENCE DR to craft it."
 ],
 "cost": "d100",
 "resistAbility": "TOUGHNESS",
 "craftAbility": "PRESENCE",
 "deliveryBands": [
  {
   "roll": [
    1,
    5
   ],
   "name": "Inhalation"
  },
  {
   "roll": [
    6,
    10
   ],
   "name": "Touch Skin"
  },
  {
   "roll": [
    11,
    15
   ],
   "name": "Enter Bloodstream"
  },
  {
   "roll": [
    16,
    20
   ],
   "name": "Ingestion"
  }
 ],
 "drBands": [
  {
   "roll": [
    1,
    3
   ],
   "dr": 8
  },
  {
   "roll": [
    4,
    6
   ],
   "dr": 10
  },
  {
   "roll": [
    7,
    9
   ],
   "dr": 12
  },
  {
   "roll": [
    10,
    12
   ],
   "dr": 14
  },
  {
   "roll": [
    13,
    15
   ],
   "dr": 16
  },
  {
   "roll": [
    16,
    18
   ],
   "dr": 18
  },
  {
   "roll": [
    19,
    20
   ],
   "dr": 20
  }
 ],
 "rows": [
  {
   "roll": 1,
   "ingredientA": "Rum",
   "ingredientB": "Wild Flowers",
   "color": "Black",
   "delivery": "Inhalation",
   "dr": 8,
   "effect": "Instant, horrific death or after subject is killed, resurrect with 1 HP."
  },
  {
   "roll": 2,
   "ingredientA": "Sugar",
   "ingredientB": "Ashes",
   "color": "Blue",
   "delivery": "Inhalation",
   "dr": 8,
   "effect": "Death in d6 hours.",
   "duration": "d6 hours"
  },
  {
   "roll": 3,
   "ingredientA": "Tobacco",
   "ingredientB": "Black Powder",
   "color": "Green",
   "delivery": "Inhalation",
   "dr": 8,
   "effect": "Paralysis (d8 hours).",
   "duration": "d8 hours"
  },
  {
   "roll": 4,
   "ingredientA": "Chicken Flesh",
   "ingredientB": "Raisins",
   "color": "Red",
   "delivery": "Inhalation",
   "dr": 10,
   "effect": "Subject becomes a ghost."
  },
  {
   "roll": 5,
   "ingredientA": "Oxtail",
   "ingredientB": "Tree Bark",
   "color": "Purple",
   "delivery": "Inhalation",
   "dr": 10,
   "effect": "d6 damage and blind for 1 hour.",
   "damage": "d6"
  },
  {
   "roll": 6,
   "ingredientA": "Candy",
   "ingredientB": "Bone Powder",
   "color": "Yellow",
   "delivery": "Touch Skin",
   "dr": 10,
   "effect": "Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds.",
   "duration": "d6 rounds"
  },
  {
   "roll": 7,
   "ingredientA": "Flour",
   "ingredientB": "Graveyard Dirt",
   "color": "Orange",
   "delivery": "Touch Skin",
   "dr": 12,
   "effect": "Polymorph into a random beast (d12 hour)."
  },
  {
   "roll": 8,
   "ingredientA": "Sassafras Root",
   "ingredientB": "Jaguar Claw",
   "color": "White",
   "delivery": "Touch Skin",
   "dr": 12,
   "effect": "Polymorph into a random beast (permanent)."
  },
  {
   "roll": 9,
   "ingredientA": "Hyla Tree Frog",
   "ingredientB": "Bat Wing",
   "color": "Metallic",
   "delivery": "Touch Skin",
   "dr": 12,
   "effect": "Polymorph into a horrific monster (permanent)."
  },
  {
   "roll": 10,
   "ingredientA": "Polychaete Worm",
   "ingredientB": "Cow's Tongue",
   "color": "Clear",
   "delivery": "Touch Skin",
   "dr": 14,
   "effect": "d8 acidic damage.",
   "damage": "d8"
  },
  {
   "roll": 11,
   "ingredientA": "Large Toad",
   "ingredientB": "Crow's Foot",
   "color": "Glows in the Dark",
   "delivery": "Enter Bloodstream",
   "dr": 14,
   "effect": "Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR."
  },
  {
   "roll": 12,
   "ingredientA": "Pufferfish",
   "ingredientB": "Cacao Seeds",
   "color": "Pearlescent",
   "delivery": "Enter Bloodstream",
   "dr": 14,
   "effect": "Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR."
  },
  {
   "roll": 13,
   "ingredientA": "Psilocybin Mushroom",
   "ingredientB": "Tamarind Leaves",
   "color": "Iridescent",
   "delivery": "Enter Bloodstream",
   "dr": 16,
   "effect": "Heal d6.",
   "heal": "d6"
  },
  {
   "roll": 14,
   "ingredientA": "Pig Blood",
   "ingredientB": "Castor Oil",
   "color": "Brown",
   "delivery": "Enter Bloodstream",
   "dr": 16,
   "effect": "Heal d8.",
   "heal": "d8"
  },
  {
   "roll": 15,
   "ingredientA": "Human Blood",
   "ingredientB": "Maggots",
   "color": "Gray",
   "delivery": "Enter Bloodstream",
   "dr": 16,
   "effect": "Heal to max HP.",
   "heal": "max"
  },
  {
   "roll": 16,
   "ingredientA": "Whale Blubber",
   "ingredientB": "Bush Rat",
   "color": "Space-Like",
   "delivery": "Ingestion",
   "dr": 18,
   "effect": "Strange hallucinations (d4 hours)."
  },
  {
   "roll": 17,
   "ingredientA": "Monkey Paw",
   "ingredientB": "Kola Nut",
   "color": "Pink",
   "delivery": "Ingestion",
   "dr": 18,
   "effect": "Run away in terror (lasts d6 rounds)."
  },
  {
   "roll": 18,
   "ingredientA": "Chicken Head",
   "ingredientB": "Coconut",
   "color": "Turquoise",
   "delivery": "Ingestion",
   "dr": 18,
   "effect": "All tests are DR -4 for d8 hours."
  },
  {
   "roll": 19,
   "ingredientA": "Crocodile Tooth",
   "ingredientB": "Sage",
   "color": "Opalescent",
   "delivery": "Ingestion",
   "dr": 20,
   "effect": "A random result from the Mystical Mishaps table (pg. 66).",
   "table": "mishaps"
  },
  {
   "roll": 20,
   "ingredientA": "Human Remains",
   "ingredientB": "Banana Peel",
   "color": "Sanguine",
   "delivery": "Ingestion",
   "dr": 20,
   "effect": "Roll again twice.",
   "rollAgain": 2
  }
 ]
};

export const PB_ALCHEMY_TABLE: PbTable = {
 "id": "alchemy",
 "name": "Alchemy Potion Generator",
 "die": "d20",
 "page": 70,
 "source": "Core Rules",
 "note": "Fast: roll 1d20 and read across. Random: roll 6d20, one per column. Precise: pick. The DR is the TOUGHNESS DR to resist or the PRESENCE DR to craft. Most potions cost d100s. Results are never guaranteed.",
 "columns": [
  {
   "die": "d20",
   "name": "Ingredient",
   "values": [
    "Rum",
    "Sugar",
    "Tobacco",
    "Chicken Flesh",
    "Oxtail",
    "Candy",
    "Flour",
    "Sassafras Root",
    "Hyla Tree Frog",
    "Polychaete Worm",
    "Large Toad",
    "Pufferfish",
    "Psilocybin Mushroom",
    "Pig Blood",
    "Human Blood",
    "Whale Blubber",
    "Monkey Paw",
    "Chicken Head",
    "Crocodile Tooth",
    "Human Remains"
   ]
  },
  {
   "die": "d20",
   "name": "Ingredient",
   "values": [
    "Wild Flowers",
    "Ashes",
    "Black Powder",
    "Raisins",
    "Tree Bark",
    "Bone Powder",
    "Graveyard Dirt",
    "Jaguar Claw",
    "Bat Wing",
    "Cow's Tongue",
    "Crow's Foot",
    "Cacao Seeds",
    "Tamarind Leaves",
    "Castor Oil",
    "Maggots",
    "Bush Rat",
    "Kola Nut",
    "Coconut",
    "Sage",
    "Banana Peel"
   ]
  },
  {
   "die": "d20",
   "name": "Resulting Color",
   "values": [
    "Black",
    "Blue",
    "Green",
    "Red",
    "Purple",
    "Yellow",
    "Orange",
    "White",
    "Metallic",
    "Clear",
    "Glows in the Dark",
    "Pearlescent",
    "Iridescent",
    "Brown",
    "Gray",
    "Space-Like",
    "Pink",
    "Turquoise",
    "Opalescent",
    "Sanguine"
   ]
  },
  {
   "die": "d20",
   "name": "Delivery Method",
   "values": [
    "Inhalation",
    "Inhalation",
    "Inhalation",
    "Inhalation",
    "Inhalation",
    "Touch Skin",
    "Touch Skin",
    "Touch Skin",
    "Touch Skin",
    "Touch Skin",
    "Enter Bloodstream",
    "Enter Bloodstream",
    "Enter Bloodstream",
    "Enter Bloodstream",
    "Enter Bloodstream",
    "Ingestion",
    "Ingestion",
    "Ingestion",
    "Ingestion",
    "Ingestion"
   ]
  },
  {
   "die": "d20",
   "name": "DR",
   "values": [
    "DR8",
    "DR8",
    "DR8",
    "DR10",
    "DR10",
    "DR10",
    "DR12",
    "DR12",
    "DR12",
    "DR14",
    "DR14",
    "DR14",
    "DR16",
    "DR16",
    "DR16",
    "DR18",
    "DR18",
    "DR18",
    "DR20",
    "DR20"
   ]
  },
  {
   "die": "d20",
   "name": "Effect",
   "values": [
    "Instant, horrific death or after subject is killed, resurrect with 1 HP.",
    "Death in d6 hours.",
    "Paralysis (d8 hours).",
    "Subject becomes a ghost.",
    "d6 damage and blind for 1 hour.",
    "Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds.",
    "Polymorph into a random beast (d12 hour).",
    "Polymorph into a random beast (permanent).",
    "Polymorph into a horrific monster (permanent).",
    "d8 acidic damage.",
    "Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR.",
    "Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR.",
    "Heal d6.",
    "Heal d8.",
    "Heal to max HP.",
    "Strange hallucinations (d4 hours).",
    "Run away in terror (lasts d6 rounds).",
    "All tests are DR -4 for d8 hours.",
    "A random result from the Mystical Mishaps table (pg. 66).",
    "Roll again twice."
   ]
  }
 ],
 "rows": [
  {
   "roll": 1,
   "ingredientA": "Rum",
   "ingredientB": "Wild Flowers",
   "color": "Black",
   "delivery": "Inhalation",
   "dr": 8,
   "effect": "Instant, horrific death or after subject is killed, resurrect with 1 HP.",
   "text": "Black potion of Rum & Wild Flowers (Inhalation, DR8): Instant, horrific death or after subject is killed, resurrect with 1 HP."
  },
  {
   "roll": 2,
   "ingredientA": "Sugar",
   "ingredientB": "Ashes",
   "color": "Blue",
   "delivery": "Inhalation",
   "dr": 8,
   "effect": "Death in d6 hours.",
   "duration": "d6 hours",
   "text": "Blue potion of Sugar & Ashes (Inhalation, DR8): Death in d6 hours."
  },
  {
   "roll": 3,
   "ingredientA": "Tobacco",
   "ingredientB": "Black Powder",
   "color": "Green",
   "delivery": "Inhalation",
   "dr": 8,
   "effect": "Paralysis (d8 hours).",
   "duration": "d8 hours",
   "text": "Green potion of Tobacco & Black Powder (Inhalation, DR8): Paralysis (d8 hours)."
  },
  {
   "roll": 4,
   "ingredientA": "Chicken Flesh",
   "ingredientB": "Raisins",
   "color": "Red",
   "delivery": "Inhalation",
   "dr": 10,
   "effect": "Subject becomes a ghost.",
   "text": "Red potion of Chicken Flesh & Raisins (Inhalation, DR10): Subject becomes a ghost."
  },
  {
   "roll": 5,
   "ingredientA": "Oxtail",
   "ingredientB": "Tree Bark",
   "color": "Purple",
   "delivery": "Inhalation",
   "dr": 10,
   "effect": "d6 damage and blind for 1 hour.",
   "damage": "d6",
   "text": "Purple potion of Oxtail & Tree Bark (Inhalation, DR10): d6 damage and blind for 1 hour."
  },
  {
   "roll": 6,
   "ingredientA": "Candy",
   "ingredientB": "Bone Powder",
   "color": "Yellow",
   "delivery": "Touch Skin",
   "dr": 10,
   "effect": "Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds.",
   "duration": "d6 rounds",
   "text": "Yellow potion of Candy & Bone Powder (Touch Skin, DR10): Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds."
  },
  {
   "roll": 7,
   "ingredientA": "Flour",
   "ingredientB": "Graveyard Dirt",
   "color": "Orange",
   "delivery": "Touch Skin",
   "dr": 12,
   "effect": "Polymorph into a random beast (d12 hour).",
   "text": "Orange potion of Flour & Graveyard Dirt (Touch Skin, DR12): Polymorph into a random beast (d12 hour)."
  },
  {
   "roll": 8,
   "ingredientA": "Sassafras Root",
   "ingredientB": "Jaguar Claw",
   "color": "White",
   "delivery": "Touch Skin",
   "dr": 12,
   "effect": "Polymorph into a random beast (permanent).",
   "text": "White potion of Sassafras Root & Jaguar Claw (Touch Skin, DR12): Polymorph into a random beast (permanent)."
  },
  {
   "roll": 9,
   "ingredientA": "Hyla Tree Frog",
   "ingredientB": "Bat Wing",
   "color": "Metallic",
   "delivery": "Touch Skin",
   "dr": 12,
   "effect": "Polymorph into a horrific monster (permanent).",
   "text": "Metallic potion of Hyla Tree Frog & Bat Wing (Touch Skin, DR12): Polymorph into a horrific monster (permanent)."
  },
  {
   "roll": 10,
   "ingredientA": "Polychaete Worm",
   "ingredientB": "Cow's Tongue",
   "color": "Clear",
   "delivery": "Touch Skin",
   "dr": 14,
   "effect": "d8 acidic damage.",
   "damage": "d8",
   "text": "Clear potion of Polychaete Worm & Cow's Tongue (Touch Skin, DR14): d8 acidic damage."
  },
  {
   "roll": 11,
   "ingredientA": "Large Toad",
   "ingredientB": "Crow's Foot",
   "color": "Glows in the Dark",
   "delivery": "Enter Bloodstream",
   "dr": 14,
   "effect": "Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR.",
   "text": "Glows in the Dark potion of Large Toad & Crow's Foot (Enter Bloodstream, DR14): Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR."
  },
  {
   "roll": 12,
   "ingredientA": "Pufferfish",
   "ingredientB": "Cacao Seeds",
   "color": "Pearlescent",
   "delivery": "Enter Bloodstream",
   "dr": 14,
   "effect": "Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR.",
   "text": "Pearlescent potion of Pufferfish & Cacao Seeds (Enter Bloodstream, DR14): Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR."
  },
  {
   "roll": 13,
   "ingredientA": "Psilocybin Mushroom",
   "ingredientB": "Tamarind Leaves",
   "color": "Iridescent",
   "delivery": "Enter Bloodstream",
   "dr": 16,
   "effect": "Heal d6.",
   "heal": "d6",
   "text": "Iridescent potion of Psilocybin Mushroom & Tamarind Leaves (Enter Bloodstream, DR16): Heal d6."
  },
  {
   "roll": 14,
   "ingredientA": "Pig Blood",
   "ingredientB": "Castor Oil",
   "color": "Brown",
   "delivery": "Enter Bloodstream",
   "dr": 16,
   "effect": "Heal d8.",
   "heal": "d8",
   "text": "Brown potion of Pig Blood & Castor Oil (Enter Bloodstream, DR16): Heal d8."
  },
  {
   "roll": 15,
   "ingredientA": "Human Blood",
   "ingredientB": "Maggots",
   "color": "Gray",
   "delivery": "Enter Bloodstream",
   "dr": 16,
   "effect": "Heal to max HP.",
   "heal": "max",
   "text": "Gray potion of Human Blood & Maggots (Enter Bloodstream, DR16): Heal to max HP."
  },
  {
   "roll": 16,
   "ingredientA": "Whale Blubber",
   "ingredientB": "Bush Rat",
   "color": "Space-Like",
   "delivery": "Ingestion",
   "dr": 18,
   "effect": "Strange hallucinations (d4 hours).",
   "text": "Space-Like potion of Whale Blubber & Bush Rat (Ingestion, DR18): Strange hallucinations (d4 hours)."
  },
  {
   "roll": 17,
   "ingredientA": "Monkey Paw",
   "ingredientB": "Kola Nut",
   "color": "Pink",
   "delivery": "Ingestion",
   "dr": 18,
   "effect": "Run away in terror (lasts d6 rounds).",
   "text": "Pink potion of Monkey Paw & Kola Nut (Ingestion, DR18): Run away in terror (lasts d6 rounds)."
  },
  {
   "roll": 18,
   "ingredientA": "Chicken Head",
   "ingredientB": "Coconut",
   "color": "Turquoise",
   "delivery": "Ingestion",
   "dr": 18,
   "effect": "All tests are DR -4 for d8 hours.",
   "text": "Turquoise potion of Chicken Head & Coconut (Ingestion, DR18): All tests are DR -4 for d8 hours."
  },
  {
   "roll": 19,
   "ingredientA": "Crocodile Tooth",
   "ingredientB": "Sage",
   "color": "Opalescent",
   "delivery": "Ingestion",
   "dr": 20,
   "effect": "A random result from the Mystical Mishaps table (pg. 66).",
   "table": "mishaps",
   "text": "Opalescent potion of Crocodile Tooth & Sage (Ingestion, DR20): A random result from the Mystical Mishaps table (pg. 66)."
  },
  {
   "roll": 20,
   "ingredientA": "Human Remains",
   "ingredientB": "Banana Peel",
   "color": "Sanguine",
   "delivery": "Ingestion",
   "dr": 20,
   "effect": "Roll again twice.",
   "rollAgain": 2,
   "text": "Sanguine potion of Human Remains & Banana Peel (Ingestion, DR20): Roll again twice."
  }
 ]
};

export const PB_AMMO: PbAmmo[] = [
 {
  "id": "shot",
  "name": "20 rounds of shot",
  "qty": 20,
  "cost": 10,
  "damage": null,
  "for": [
   "flintlock-pistol",
   "blunderbuss",
   "musket",
   "buccaneer-musket"
  ]
 },
 {
  "id": "berserk-darts",
  "name": "10 berserk darts",
  "qty": 10,
  "cost": 20,
  "damage": "d4",
  "dart": true,
  "effect": "Target tests TOUGHNESS DR12 or must attack the closest creature for d4 rounds.",
  "targetTest": {
   "ability": "TOUGHNESS",
   "dr": 12
  }
 },
 {
  "id": "poison-darts",
  "name": "10 poison darts",
  "qty": 10,
  "cost": 20,
  "damage": "d4",
  "dart": true,
  "effect": "Target tests TOUGHNESS DR12 or takes d6 damage.",
  "targetTest": {
   "ability": "TOUGHNESS",
   "dr": 12
  },
  "failDamage": "d6"
 },
 {
  "id": "sleep-darts",
  "name": "10 sleep darts",
  "qty": 10,
  "cost": 20,
  "damage": "d4",
  "dart": true,
  "effect": "Target tests TOUGHNESS DR12 or falls asleep for d6 rounds.",
  "targetTest": {
   "ability": "TOUGHNESS",
   "dr": 12
  }
 }
];

export const PB_ARMOR_REPAIR: PbArmorRepair = {
 "page": 53,
 "rows": [
  {
   "from": 1,
   "to": 2,
   "cost": 25,
   "text": "Tier 1 to tier 2"
  },
  {
   "from": 2,
   "to": 3,
   "cost": 40,
   "text": "Tier 2 to tier 3"
  }
 ],
 "note": "Armor can't be repaired to a tier higher than its original. Armor reduced below tier 1 is ruined and can't be repaired."
};

export const PB_ASH: PbAsh = {
 "page": 10,
 "source": "Core Rules",
 "text": "ASH is the dust left by destroyed undead, first found in the Dark Caribbean. Eaten, snorted or smoked it has physiological and psychedelic effects; it is extremely valuable and drives conflicts, trade disputes and black markets. Addicts show sunken eye sockets, darkened lips and faintly glowing bones.",
 "dose": {
  "text": "~5 lbs., or one per skeleton",
  "standardRate": 50
 },
 "marketNote": "The standard rate per dose is 50s. Roll in each new port or each day.",
 "market": {
  "id": "ashMarket",
  "name": "Current ASH Market",
  "die": "2d6",
  "page": 10,
  "source": "Core Rules",
  "note": "Standard rate 50s per dose (~5 lbs., or one per skeleton). Roll in each new port or each day; changes apply to the last rate.",
  "rows": [
   {
    "roll": 2,
    "name": "Buyer's market",
    "text": "Buyer's market (can't give it away).",
    "multiplier": 0
   },
   {
    "roll": 3,
    "name": "Flooded",
    "text": "Flooded: half the rate.",
    "multiplier": 0.5
   },
   {
    "roll": [
     4,
     5
    ],
    "name": "Surplus",
    "text": "Surplus: lower last rate by 20%.",
    "multiplier": 0.8
   },
   {
    "roll": [
     6,
     8
    ],
    "name": "Holding steady",
    "text": "Holding steady.",
    "multiplier": 1
   },
   {
    "roll": [
     9,
     10
    ],
    "name": "In demand",
    "text": "In demand: raise rate by 20%.",
    "multiplier": 1.2
   },
   {
    "roll": 11,
    "name": "Rare",
    "text": "Rare: double the last rate.",
    "multiplier": 2
   },
   {
    "roll": 12,
    "name": "Seller's market",
    "text": "Seller's market (name your price).",
    "multiplier": null
   }
  ]
 },
 "effects": {
  "id": "ashEffects",
  "name": "Effects of Consuming ASH",
  "die": "d20",
  "page": 10,
  "source": "Core Rules",
  "duration": "2d6 minutes",
  "note": "Most effects last for 2d6 minutes.",
  "rows": [
   {
    "roll": 1,
    "name": "Overdose",
    "text": "Overdose. Pass out for d4 rounds. Test TOUGHNESS DR12 or instant death.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 12
    },
    "death": true
   },
   {
    "roll": 2,
    "text": "Roll a Mystical Mishap (pg. 66).",
    "table": "mishaps"
   },
   {
    "roll": 3,
    "text": "Lose d4 HP and become infected.",
    "damage": "d4",
    "condition": "infected"
   },
   {
    "roll": 4,
    "text": "Permanent -1 to all abilities.",
    "permanent": true,
    "abilities": {
     "all": -1
    }
   },
   {
    "roll": 5,
    "text": "The world turns gray and lifeless. You no longer see the joy in living. All seems dead."
   },
   {
    "roll": 6,
    "text": "Everyone around you appears to be (d4): 1. undead 2. soldiers 3. sea creatures. 4. all 3.",
    "sub": {
     "die": "d4",
     "rows": [
      {
       "roll": 1,
       "text": "undead"
      },
      {
       "roll": 2,
       "text": "soldiers"
      },
      {
       "roll": 3,
       "text": "sea creatures"
      },
      {
       "roll": 4,
       "text": "all 3"
      }
     ]
    }
   },
   {
    "roll": 7,
    "text": "You think you're an animal (d6, pg. 86).",
    "table": "darkFaunaTerrestrial"
   },
   {
    "roll": 8,
    "text": "One of your limbs (d4) rots away permanently. It is replaced by a ghost limb at sunset.",
    "permanent": true
   },
   {
    "roll": 9,
    "text": "You fear the sun and thirst for blood, brains, or both."
   },
   {
    "roll": 10,
    "text": "You hear color, see sound, and feel taste."
   },
   {
    "roll": 11,
    "text": "Gain the effects of tier 3 armor.",
    "effects": [
     {
      "type": "armor",
      "value": 3
     }
    ]
   },
   {
    "roll": 12,
    "text": "Time slows down. Take 2 actions or attacks each round.",
    "effects": [
     {
      "type": "attacks",
      "value": 2
     }
    ]
   },
   {
    "roll": 13,
    "text": "Attack and defend at -4 DR.",
    "effects": [
     {
      "type": "dr",
      "value": -4,
      "applies": [
       "attack",
       "defense"
      ]
     }
    ]
   },
   {
    "roll": 14,
    "text": "Gain d12 temporary hit points.",
    "tempHp": "d12"
   },
   {
    "roll": 15,
    "text": "You can see in the dark. Everything that has ever lived glows neon colors.",
    "effects": [
     {
      "type": "sense",
      "value": "darkvision"
     }
    ]
   },
   {
    "roll": 16,
    "text": "Move double your speed (up to 60'/turn).",
    "effects": [
     {
      "type": "movement",
      "value": 60
     }
    ]
   },
   {
    "roll": 17,
    "text": "+2 to STRENGTH and AGILITY for 24 hours.",
    "duration": "24 hours",
    "effects": [
     {
      "type": "ability",
      "applies": [
       "STRENGTH",
       "AGILITY"
      ],
      "value": 2
     }
    ]
   },
   {
    "roll": 18,
    "name": "Mental transcendence",
    "text": "Mental transcendence. Permanent +1 to PRESENCE.",
    "permanent": true,
    "abilities": {
     "PRESENCE": 1
    }
   },
   {
    "roll": 19,
    "name": "One with the universe",
    "text": "You are one with the universe. Permanent +1 to SPIRIT.",
    "permanent": true,
    "abilities": {
     "SPIRIT": 1
    }
   },
   {
    "roll": 20,
    "text": "Roll d10+10 three times on this table (duplicate results have no effect).",
    "reroll": {
     "die": "d10+10",
     "times": 3
    }
   }
  ]
 },
 "notes": [
  "Cargo: d20 crates of ASH is a Special Cargo result (pg. 115).",
  "Skeletons that fail a morale test without a Cap'n or Warlock crumble into ASH (pg. 93).",
  "Jars of cremated sacrifices in the Sanctum count as ASH (pg. 151)."
 ]
};

export const PB_BACKGROUNDS: PbBackground[] = [
 {
  "id": "sailor",
  "roll": [
   1,
   20
  ],
  "name": "Sailor",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a reason to go to sea"
 },
 {
  "id": "actor",
  "roll": 21,
  "name": "Actor",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a play or book"
 },
 {
  "id": "apothecary",
  "roll": 22,
  "name": "Apothecary",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "healing kit"
 },
 {
  "id": "artist",
  "roll": 23,
  "name": "Artist",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "art supplies"
 },
 {
  "id": "assassin",
  "roll": 24,
  "name": "Assassin",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a dagger",
  "gear": [
   "knife-dagger"
  ]
 },
 {
  "id": "bandit",
  "roll": 25,
  "name": "Bandit",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a club"
 },
 {
  "id": "barkeep",
  "roll": 26,
  "name": "Barkeep",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a flask of fine rum",
  "gear": [
   "flask"
  ]
 },
 {
  "id": "blacksmith",
  "roll": 27,
  "name": "Blacksmith",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a set of files and tools",
  "gear": [
   "metal-file"
  ]
 },
 {
  "id": "bosun",
  "roll": 28,
  "name": "Bosun",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "the respect of some crew"
 },
 {
  "id": "business-person",
  "roll": 29,
  "name": "Business Person",
  "silver": "3d6",
  "silverMultiplier": 10,
  "item": "a profitable past"
 },
 {
  "id": "cabin-boy-girl",
  "roll": 30,
  "name": "Cabin Boy/Girl",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a small toy or trinket"
 },
 {
  "id": "captain",
  "roll": 31,
  "name": "Captain",
  "silver": "2d8",
  "silverMultiplier": 10,
  "item": "a spyglass",
  "gear": [
   "spyglass"
  ]
 },
 {
  "id": "former-captive",
  "roll": 32,
  "name": "Former Captive",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "your freedom"
 },
 {
  "id": "castaway",
  "roll": 33,
  "name": "Castaway",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a keepsake from the island"
 },
 {
  "id": "chef",
  "roll": 34,
  "name": "Chef",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a book of recipes"
 },
 {
  "id": "cook",
  "roll": 35,
  "name": "Cook",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "some fine cooking spices"
 },
 {
  "id": "craftsman",
  "roll": 36,
  "name": "Craftsman",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a set of tools"
 },
 {
  "id": "criminal",
  "roll": 37,
  "name": "Criminal",
  "silver": "1d10",
  "silverMultiplier": 10,
  "item": "lock picks or a crowbar",
  "gearChoice": [
   "lock-picks"
  ]
 },
 {
  "id": "cultist",
  "roll": 38,
  "name": "Cultist",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a book of scripture"
 },
 {
  "id": "deserter",
  "roll": 39,
  "name": "Deserter",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a small bounty on your head"
 },
 {
  "id": "doctor",
  "roll": 40,
  "name": "Doctor",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a medical kit",
  "gear": [
   "medical-kit"
  ]
 },
 {
  "id": "explorer",
  "roll": 41,
  "name": "Explorer",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a map and compass",
  "gear": [
   "compass"
  ]
 },
 {
  "id": "farmer",
  "roll": 42,
  "name": "Farmer",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a reason to leave your farm"
 },
 {
  "id": "first-mate",
  "roll": 43,
  "name": "First Mate",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a loyal friend"
 },
 {
  "id": "gambler",
  "roll": 44,
  "name": "Gambler",
  "silver": "1d12",
  "silverMultiplier": 10,
  "item": "a sizable debt"
 },
 {
  "id": "grave-robber",
  "roll": 45,
  "name": "Grave Robber",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "something from a corpse"
 },
 {
  "id": "guard",
  "roll": 46,
  "name": "Guard",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a keen eye for mischief"
 },
 {
  "id": "gunner",
  "roll": 47,
  "name": "Gunner",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "skill at shooting"
 },
 {
  "id": "harlot",
  "roll": 48,
  "name": "Harlot",
  "silver": "2d8",
  "silverMultiplier": 10,
  "item": "an admirer and syphilis"
 },
 {
  "id": "heretic",
  "roll": 49,
  "name": "Heretic",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a blasphemous disposition"
 },
 {
  "id": "homemaker",
  "roll": 50,
  "name": "Homemaker",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a loved one back home"
 },
 {
  "id": "hunter",
  "roll": 51,
  "name": "Hunter",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a hunting knife",
  "gear": [
   "knife-dagger"
  ]
 },
 {
  "id": "former-servant",
  "roll": 52,
  "name": "Former Servant",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "someone looking for you"
 },
 {
  "id": "innkeeper",
  "roll": 53,
  "name": "Innkeeper",
  "silver": "3d4",
  "silverMultiplier": 10,
  "item": "a small inn somewhere"
 },
 {
  "id": "landowner",
  "roll": 54,
  "name": "Landowner",
  "silver": "3d6",
  "silverMultiplier": 10,
  "item": "property somewhere"
 },
 {
  "id": "loner",
  "roll": 55,
  "name": "Loner",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a dislike of others"
 },
 {
  "id": "cartographer",
  "roll": 56,
  "name": "Cartographer",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "map making tools"
 },
 {
  "id": "marine",
  "roll": 57,
  "name": "Marine",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a military cutlass",
  "gear": [
   "cutlass"
  ]
 },
 {
  "id": "medic",
  "roll": 58,
  "name": "Medic",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a medical kit",
  "gear": [
   "medical-kit"
  ]
 },
 {
  "id": "merchant",
  "roll": 59,
  "name": "Merchant",
  "silver": "2d8",
  "silverMultiplier": 10,
  "item": "good negotiating skills"
 },
 {
  "id": "military",
  "roll": 60,
  "name": "Military",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "combat training"
 },
 {
  "id": "missionary",
  "roll": 61,
  "name": "Missionary",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a holy symbol and scripture"
 },
 {
  "id": "monk",
  "roll": 62,
  "name": "Monk",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a holy symbol and scripture"
 },
 {
  "id": "musician",
  "roll": 63,
  "name": "Musician",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "[roll on instrument table, pg. 27]",
  "table": "instruments"
 },
 {
  "id": "naval-deserter",
  "roll": 64,
  "name": "Naval Deserter",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a price on your head"
 },
 {
  "id": "navigator",
  "roll": 65,
  "name": "Navigator",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a compass",
  "gear": [
   "compass"
  ]
 },
 {
  "id": "noble",
  "roll": 66,
  "name": "Noble",
  "silver": "3d6",
  "silverMultiplier": 10,
  "item": "good manners"
 },
 {
  "id": "nobody",
  "roll": 67,
  "name": "Nobody",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a desire for a purpose"
 },
 {
  "id": "nurse",
  "roll": 68,
  "name": "Nurse",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a medical kit",
  "gear": [
   "medical-kit"
  ]
 },
 {
  "id": "officer",
  "roll": 69,
  "name": "Officer",
  "silver": "2d8",
  "silverMultiplier": 10,
  "item": "a cutlass and military training",
  "gear": [
   "cutlass"
  ]
 },
 {
  "id": "orphan",
  "roll": 70,
  "name": "Orphan",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a longing for new parental figures"
 },
 {
  "id": "performer",
  "roll": 71,
  "name": "Performer",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "[roll on instrument table, pg. 27]",
  "table": "instruments"
 },
 {
  "id": "philosopher",
  "roll": 72,
  "name": "Philosopher",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a book and a puzzling disposition"
 },
 {
  "id": "pilot",
  "roll": 73,
  "name": "Pilot",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a compass",
  "gear": [
   "compass"
  ]
 },
 {
  "id": "pirate",
  "roll": 74,
  "name": "Pirate",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "an empty bottle of rum"
 },
 {
  "id": "politician",
  "roll": 75,
  "name": "Politician",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "skill at deception"
 },
 {
  "id": "priest",
  "roll": 76,
  "name": "Priest",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a holy symbol and scripture"
 },
 {
  "id": "privateer",
  "roll": 77,
  "name": "Privateer",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a letter of marque"
 },
 {
  "id": "quartermaster",
  "roll": 78,
  "name": "Quartermaster",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "the respect of a ship's crew"
 },
 {
  "id": "refugee",
  "roll": 79,
  "name": "Refugee",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "strong survival instincts"
 },
 {
  "id": "religious-follower",
  "roll": 80,
  "name": "Religious Follower",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a strong sense of faith"
 },
 {
  "id": "revolutionary",
  "roll": 81,
  "name": "Revolutionary",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "bold plans and a few allies"
 },
 {
  "id": "rumored-sorcerer",
  "roll": 82,
  "name": "Rumored Sorcerer",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "dark and powerful knowledge"
 },
 {
  "id": "runaway",
  "roll": 83,
  "name": "Runaway",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a desire for a new home"
 },
 {
  "id": "sail-maker",
  "roll": 84,
  "name": "Sail Maker",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "skill with sails"
 },
 {
  "id": "scholar",
  "roll": 85,
  "name": "Scholar",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a few books"
 },
 {
  "id": "scoundrel",
  "roll": 86,
  "name": "Scoundrel",
  "silver": "2d8",
  "silverMultiplier": 10,
  "item": "a few enemies along the way"
 },
 {
  "id": "scout",
  "roll": 87,
  "name": "Scout",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "keen senses and a map"
 },
 {
  "id": "shaman",
  "roll": 88,
  "name": "Shaman",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "herbs and mystic knowledge"
 },
 {
  "id": "shipwright",
  "roll": 89,
  "name": "Shipwright",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "skill with woodworking"
 },
 {
  "id": "smuggler",
  "roll": 90,
  "name": "Smuggler",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a bounty on your head"
 },
 {
  "id": "soldier",
  "roll": 91,
  "name": "Soldier",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a tactical mind"
 },
 {
  "id": "spy",
  "roll": 92,
  "name": "Spy",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a dark cloak"
 },
 {
  "id": "student",
  "roll": 93,
  "name": "Student",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a strong will to learn"
 },
 {
  "id": "surgeon",
  "roll": 94,
  "name": "Surgeon",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a medical kit",
  "gear": [
   "medical-kit"
  ]
 },
 {
  "id": "thief",
  "roll": 95,
  "name": "Thief",
  "silver": "1d12",
  "silverMultiplier": 10,
  "item": "lock picks",
  "gear": [
   "lock-picks"
  ]
 },
 {
  "id": "vagabond",
  "roll": 96,
  "name": "Vagabond",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a leather backpack",
  "gear": [
   "backpack"
  ]
 },
 {
  "id": "victim",
  "roll": 97,
  "name": "Victim",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a haunted past"
 },
 {
  "id": "warrior",
  "roll": 98,
  "name": "Warrior",
  "silver": "2d4",
  "silverMultiplier": 10,
  "item": "a cultural weapon"
 },
 {
  "id": "whaler",
  "roll": 99,
  "name": "Whaler",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "a harpoon",
  "gear": [
   "harpoon"
  ]
 },
 {
  "id": "writer",
  "roll": 100,
  "name": "Writer",
  "silver": "2d6",
  "silverMultiplier": 10,
  "item": "ink, quills, and parchment",
  "gear": [
   "ink-quill-parchment"
  ]
 }
];

export const PB_BOMBS: PbBomb[] = [
 {
  "id": "smoke-bomb",
  "roll": 1,
  "name": "Smoke Bomb",
  "damage": null,
  "cost": 10,
  "effect": "Smoke cloud: blind for d4 rounds."
 },
 {
  "id": "improvised-grenade",
  "roll": 2,
  "name": "Improvised Grenade",
  "damage": "d10",
  "cost": 20
 },
 {
  "id": "clay-grenade",
  "roll": 3,
  "name": "Clay Grenade",
  "damage": "2d8",
  "cost": 30
 },
 {
  "id": "iron-grenade",
  "roll": 4,
  "name": "Iron Grenade",
  "damage": "3d6",
  "cost": 40
 },
 {
  "id": "fire-pot",
  "roll": 5,
  "name": "Fire Pot",
  "damage": "d6",
  "cost": 15,
  "effect": "Roll d6 each turn: 1-2 it spreads, 6 the fire goes out; otherwise take d6 damage.",
  "burning": {
   "die": "d6",
   "spreads": [
    1,
    2
   ],
   "out": 6,
   "damage": "d6"
  }
 },
 {
  "id": "stink-ball",
  "roll": 6,
  "name": "Stink Ball",
  "damage": "2d4",
  "cost": 20,
  "effect": "TOUGHNESS DR12 or poisoned.",
  "targetTest": {
   "ability": "TOUGHNESS",
   "dr": 12
  }
 }
];

export const PB_BOMB_RULES: PbBombRules = {
 "page": 53,
 "throw": {
  "ability": "AGILITY",
  "dr": 12
 },
 "blast": {
  "feet": 5,
  "test": {
   "ability": "AGILITY",
   "dr": 12
  }
 },
 "text": "Light the fuse and throw: test AGILITY DR12 to hit an area. Creatures within 5' of it test AGILITY DR12 or take the damage. Crit: double damage. Fumble: it hits you and/or d4 allies instead."
};

export const PB_BURIED_TREASURE: PbTable = {
 "id": "buriedTreasure",
 "name": "Buried Treasure",
 "die": "d100",
 "page": 118,
 "source": "Core Rules",
 "note": "Roll d100 for what lies in the chest.",
 "rows": [
  {
   "roll": 1,
   "text": "The Black Spot on a folded piece of paper. Whoever unfolds it dies in d8 days (unless they find a way to lift the curse)."
  },
  {
   "roll": 2,
   "text": "A Spanish gold treasure hoard worth 50,000s. They want it back NOW."
  },
  {
   "roll": 3,
   "text": "3 flags: British, Spanish, French. One torn, one blood spattered, one outdated."
  },
  {
   "roll": 4,
   "text": "Freshly decapitated head. It looks exactly like one of the PCs. In its mouth is a pearl the size of a plum."
  },
  {
   "roll": 5,
   "text": "Emerald the size of a coconut."
  },
  {
   "roll": 6,
   "text": "6 stylized animal heads carved from wood, one on top of the next."
  },
  {
   "roll": 7,
   "text": "7 rare gold coins worth d100 silver each."
  },
  {
   "roll": 8,
   "text": "Each player rolls all of the dice they have with them: the total in silver.",
   "silver": "all dice"
  },
  {
   "roll": 9,
   "text": "An enormous dinosaur bone."
  },
  {
   "roll": 10,
   "text": "2 black flintlocks, the name \"Blackwood\" engraved on both. DR -1 to hit."
  },
  {
   "roll": 11,
   "text": "A bag of marbles."
  },
  {
   "roll": 12,
   "text": "Thick leather belt, an iron kraken buckle. Wearer gets +1 STRENGTH."
  },
  {
   "roll": 13,
   "text": "A pure white flintlock pistol. It crits on 18+ but shatters on a fumble."
  },
  {
   "roll": 14,
   "text": "Half of a metal medallion."
  },
  {
   "roll": 15,
   "text": "15 dead men on a dead man's chest. The crew learns 1 random Shanty (pg. 68).",
   "table": "shanties"
  },
  {
   "roll": 16,
   "text": "An elaborate brass anchor."
  },
  {
   "roll": 17,
   "text": "An ancient circular stone calendar. Its last entry is the day after tomorrow..."
  },
  {
   "roll": 18,
   "text": "5,000 gold coins (they are painted wood)."
  },
  {
   "roll": 19,
   "text": "D6 black candles. Burning them makes all other light sources dim by half."
  },
  {
   "roll": 20,
   "text": "D20 silver bars (50s each)."
  },
  {
   "roll": 21,
   "text": "8' marble statue of a sea monster with rubies for eyes."
  },
  {
   "roll": 22,
   "text": "Detailed journal with drawings and descriptions of the local flora and fauna."
  },
  {
   "roll": 23,
   "text": "Golden crown and scepter."
  },
  {
   "roll": 24,
   "text": "A flute carved from a femur."
  },
  {
   "roll": 25,
   "text": "D6 bladders from some sea creature. Each contains a potion (pg. 70).",
   "table": "alchemy",
   "count": "d6"
  },
  {
   "roll": 26,
   "text": "Jet black sphere."
  },
  {
   "roll": 27,
   "text": "Mother of pearl-encrusted lobster shell."
  },
  {
   "roll": 28,
   "text": "Black cannon in the shape of a dragon. A ship with it always deals +1 damage."
  },
  {
   "roll": 29,
   "text": "Book written in an ancient script. It contains the best recipes known to man."
  },
  {
   "roll": 30,
   "text": "300 dead monkeys."
  },
  {
   "roll": 31,
   "text": "Dead pirate captain. There is a 2,000s reward for his head."
  },
  {
   "roll": 32,
   "text": "32 golden teeth and a set of silver pliers."
  },
  {
   "roll": 33,
   "text": "Skeleton of a small animal."
  },
  {
   "roll": 34,
   "text": "Single golden arrow."
  },
  {
   "roll": 35,
   "text": "35' of hempen rope that will (almost) never break."
  },
  {
   "roll": 36,
   "text": "Small sandstone pyramid. Smashing it reveals a black diamond worth 2,000s."
  },
  {
   "roll": 37,
   "text": "Mesoan coin on a necklace."
  },
  {
   "roll": 38,
   "text": "703 pieces of eight in a wooden crate."
  },
  {
   "roll": 39,
   "text": "Dark gemstones. Looking into them reveals an underwater location."
  },
  {
   "roll": 40,
   "text": "Ornate model frigate inside a bottle."
  },
  {
   "roll": 41,
   "text": "Large fang the size of a femur."
  },
  {
   "roll": 42,
   "text": "A fine wooden armoire. Inside are d12 outfits fit for royalty."
  },
  {
   "roll": 43,
   "text": "Iron scarab. On sand it explodes for d6 damage, underwater it swims to treasure."
  },
  {
   "roll": 44,
   "text": "Large jar filled with 2d20 dried seahorses. Eating one recovers 1 HP. Don't eat too many..."
  },
  {
   "roll": 45,
   "text": "Pair of finely crafted boots. +1 AGILITY."
  },
  {
   "roll": 46,
   "text": "Bloody leather bag with 3 silver rings, 7 stone rings, and 9 iron rings."
  },
  {
   "roll": 47,
   "text": "Polished obsidian disc. If you look at the sun through it you immediately gain experience, then it shatters.",
   "experience": true
  },
  {
   "roll": 48,
   "text": "4' x 8' stone slab covered in glyphs. It depicts a woman entering a portal."
  },
  {
   "roll": 49,
   "text": "Carved ivory sailing ship."
  },
  {
   "roll": 50,
   "text": "Sarcophagus (5,000s). Inside is a scepter that turns human ashes into silver dust."
  },
  {
   "roll": 51,
   "text": "Dark green cloak. +1 PRESENCE."
  },
  {
   "roll": 52,
   "text": "D20 bottles of the finest rum ever made."
  },
  {
   "roll": 53,
   "text": "Barrel-sized egg. The inside stirs..."
  },
  {
   "roll": 54,
   "text": "Taxidermy dog. In its belly is a severed hand holding a set of keys."
  },
  {
   "roll": 55,
   "text": "Severed finger. If rested on a map it will point to a lost city of gold."
  },
  {
   "roll": 56,
   "text": "D4 barrels filled with blood."
  },
  {
   "roll": 57,
   "text": "Smoking pipe shaped like a galleon."
  },
  {
   "roll": 58,
   "text": "Hollow cannonball. Inside: a map."
  },
  {
   "roll": 59,
   "text": "Clay dagger with glyphs carved in the blade. Read them: learn one random ritual (pg. 64) then it crumbles.",
   "table": "rituals"
  },
  {
   "roll": 60,
   "text": "Chest with 4 different colored vials."
  },
  {
   "roll": 61,
   "text": "A figurehead of a gorgeous woman. If attached to a ship, it comes alive and screams in terror."
  },
  {
   "roll": 62,
   "text": "Clay jar filled with 13 snakes."
  },
  {
   "roll": 63,
   "text": "A skeleton key, pg. 63.",
   "relic": "skeleton-key"
  },
  {
   "roll": 64,
   "text": "Locked iron box. Inside is a rotten head that can speak. It knows the way to Hell."
  },
  {
   "roll": 65,
   "text": "Set of 6 jade goblets."
  },
  {
   "roll": 66,
   "text": "Everything within 66' dies immediately. (Optional: all PCs gain the Haunted Soul: Skeleton class until the treasure is reburied.)"
  },
  {
   "roll": 67,
   "text": "Silver bracelet of a snake eating its tail."
  },
  {
   "roll": 68,
   "text": "Handheld crystal mirror."
  },
  {
   "roll": 69,
   "text": "3d20 large pearls."
  },
  {
   "roll": 70,
   "text": "Collection of exotic bird feathers (300s)."
  },
  {
   "roll": 71,
   "text": "Shriveled heart. It starts beating if submerged in sea water."
  },
  {
   "roll": 72,
   "text": "Wood coffin. Inside is (d4): 1 a skeleton 2 a mummy 3 a vampire 4 1,000s."
  },
  {
   "roll": 73,
   "text": "Map of the Dark Caribbean. A trail of blood appears along your path."
  },
  {
   "roll": 74,
   "text": "Jaguar skull made of diamond."
  },
  {
   "roll": 75,
   "text": "Key made of water. Glows if submerged."
  },
  {
   "roll": 76,
   "text": "Jade gecko wrapped around a coconut sized granite globe."
  },
  {
   "roll": 77,
   "text": "Vial of water. Drinking it secretly gives d100 HP."
  },
  {
   "roll": 78,
   "text": "Satchel of hauntingly poetic love letters."
  },
  {
   "roll": 79,
   "text": "Chess set carved from onyx and jade."
  },
  {
   "roll": 80,
   "text": "Wood tube with d6 scrolls, each with a different Ritual (pg. 64). They always succeed but burn up once used.",
   "table": "rituals",
   "count": "d6"
  },
  {
   "roll": 81,
   "text": "Stone tankard, covered with Mesoan glyphs. It never runs out of ale."
  },
  {
   "roll": 82,
   "text": "Golden peg leg."
  },
  {
   "roll": 83,
   "text": "Gold ship's bell. Ringing it changes the winds direction."
  },
  {
   "roll": 84,
   "text": "Plain gold ring with no signs of wear (in fire it projects a clue, pg. 121).",
   "table": "riddles"
  },
  {
   "roll": 85,
   "text": "A chest inside a chest. Roll again.",
   "rollAgain": 1
  },
  {
   "roll": 86,
   "text": "Necklace of bones, each with a different engraved rune. +1 TOUGHNESS."
  },
  {
   "roll": 87,
   "text": "Gray, pointy hat. Wearer gets +1 SPIRIT."
  },
  {
   "roll": 88,
   "text": "Trident etched with antediluvian runes."
  },
  {
   "roll": 89,
   "text": "Bronze skull with d2 gems for eyes."
  },
  {
   "roll": 90,
   "text": "Bullwhip. Hits on DR8, d6 dmg, 10' range."
  },
  {
   "roll": 91,
   "text": "Amulet of the Sun. Elaborately carved, Ancient, and extremely valuable."
  },
  {
   "roll": 92,
   "text": "A large crate. d100 skulls are inside."
  },
  {
   "roll": 93,
   "text": "Volcanic glass sculpture of an island. Holding it to the sun reveals a small ruby inside. It's a map."
  },
  {
   "roll": 94,
   "text": "Spyglass. It seems broken, but actually peers 24 hours into the past."
  },
  {
   "roll": 95,
   "text": "Book of 7 maps in 7 different languages. Each is of a different small island."
  },
  {
   "roll": 96,
   "text": "3 turtles shells of different colors. Each is filled with gems worth d100 silver."
  },
  {
   "roll": 97,
   "text": "Go. A bag of black stones, a bag of white stones, and a bamboo game board."
  },
  {
   "roll": 98,
   "text": "Oil lamp. (The genie inside will grant one wish, but in the worst way possible)."
  },
  {
   "roll": 99,
   "text": "A wooden box with 24 stacks of 20 gold coins (500s each) and 6 loaded flintlocks."
  },
  {
   "roll": 100,
   "text": "1 million pieces of eight. Good luck."
  }
 ]
};

export const PB_CAPTAINS: PbCaptain[] = [
 {
  "id": "naval-mastermind",
  "name": "The Naval Mastermind",
  "page": 110,
  "source": "Core Rules",
  "faction": "english-crown",
  "text": "Tactical geniuses from naval academies, hunting pirates, treasure fleets and enemies of the Crown.",
  "captain": "the-naval-mastermind",
  "officers": [
   "naval-officer"
  ],
  "crew": [
   "naval-crew"
  ],
  "ships": "navy-ships",
  "vessels": [
   "frigate",
   "man-of-war",
   "ship-of-the-line"
  ],
  "aboard": "That ship's attacks are −2 DR to hit, and it may take 1 extra crew action each turn."
 },
 {
  "id": "inquisitor",
  "name": "The Inquisitor",
  "page": 111,
  "source": "Core Rules",
  "faction": "inquisition",
  "text": "Tyrannical zealots commanding armored conquistadors and devoted priests to hunt heretics.",
  "captain": "the-inquisitor",
  "officers": [
   "purge-priest"
  ],
  "crew": [
   "conquistador"
  ],
  "ships": "inquisitor-ships",
  "vessels": [
   "galleon",
   "fluyt"
  ],
  "aboard": "Spend a crew action and test DR14 to change the wind direction (one hex face) and speed (±1)."
 },
 {
  "id": "necromancer",
  "name": "The Necromancer",
  "page": 112,
  "source": "Core Rules",
  "text": "Former captains consumed by dark sorcery who drain the life from the living.",
  "captain": "the-necromancer",
  "officers": [
   "living-thralls"
  ],
  "crew": [
   "skeleton-crew"
  ],
  "ships": "ship-of-bone-fleet",
  "vessels": [
   "brigantine",
   "fluyt",
   "frigate",
   "galleon",
   "galley"
  ],
  "aboard": "Bones fired from its cannons onto an enemy ship can be animated with the Necromancer's action; it can spend a crew action to recover d8 ship HP."
 },
 {
  "id": "sunken-one",
  "name": "The Sunken One",
  "page": 113,
  "source": "Core Rules",
  "faction": "the-wretched",
  "text": "Wretched cult leaders bound to the Old Ones: shipwrecked captains who prayed to the Abyss and became abominations anchored to the sea.",
  "captain": "the-sunken-one",
  "officers": [
   "thing-from-below"
  ],
  "crew": [
   "lost-sailor"
  ],
  "ships": "vessel-from-the-deep-fleet",
  "vessels": [
   "galleon",
   "fluyt",
   "man-of-war",
   "ship-of-the-line"
  ],
  "aboard": "Wave Call: d8 damage to another ship and push it 1 hex (recharges after 4 rounds). Spend 2d4 consecutive crew actions to summon (d6) sharks, a whale, the Kraken, Davy Jones, the Leviathan or a maelstrom."
 }
];

export const PB_CARD_DECK: PbCardDeck = {
 "cards": 54,
 "black": 26,
 "red": 26,
 "jokers": 2,
 "ranks": {
  "A": 1,
  "J": 11,
  "Q": 12,
  "K": 13
 },
 "note": "Ace counts 1 and J/Q/K count 11/12/13; \"9+\" means a rank of 9 or higher."
};

export const PB_CARGO: PbCargo = {
 "page": 115,
 "source": "Core Rules",
 "note": "Roll once for each cargo slot, or pick what is appropriate. Values are only suggestions and can fluctuate ±50% from port to port.",
 "marketSwing": 0.5,
 "mundane": {
  "id": "cargoMundane",
  "name": "Mundane Cargo",
  "die": "d12",
  "page": 115,
  "source": "Core Rules",
  "note": "Values in silver; ±50% from port to port. 12 = roll Special Cargo.",
  "rows": [
   {
    "roll": 1,
    "text": "food or crops, 250s",
    "value": 250
   },
   {
    "roll": 2,
    "text": "spices or oils, 350s",
    "value": 350
   },
   {
    "roll": 3,
    "text": "trade goods, 400s",
    "value": 400
   },
   {
    "roll": 4,
    "text": "livestock, 400s",
    "value": 400
   },
   {
    "roll": 5,
    "text": "sugar, 500s",
    "value": 500
   },
   {
    "roll": 6,
    "text": "rum, 1000s",
    "value": 1000
   },
   {
    "roll": 7,
    "text": "munitions, 2000s",
    "value": 2000
   },
   {
    "roll": 8,
    "text": "tobacco, 1000s",
    "value": 1000
   },
   {
    "roll": 9,
    "text": "wine, 2000s",
    "value": 2000
   },
   {
    "roll": 10,
    "text": "antiques, 2000s",
    "value": 2000
   },
   {
    "roll": 11,
    "text": "lumber, 1000s",
    "value": 1000
   },
   {
    "roll": 12,
    "text": "special cargo",
    "table": "cargoSpecial"
   }
  ]
 },
 "special": {
  "id": "cargoSpecial",
  "name": "Special Cargo",
  "die": "d12",
  "page": 115,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "raw silver ore, 5000s",
    "value": 5000
   },
   {
    "roll": 2,
    "text": "golden coins and treasures, 10000s",
    "value": 10000
   },
   {
    "roll": 3,
    "text": "religious leader(s)"
   },
   {
    "roll": 4,
    "text": "important prisoner(s)"
   },
   {
    "roll": 5,
    "text": "political or military figure(s)"
   },
   {
    "roll": 6,
    "text": "relics or a rare artifact, 4000s",
    "value": 4000
   },
   {
    "roll": 7,
    "text": "sea monster bones, 2500s",
    "value": 2500
   },
   {
    "roll": 8,
    "text": "exotic animals, 2000s",
    "value": 2000
   },
   {
    "roll": 9,
    "text": "d10 locked chests, 2d8 x 100s each",
    "value": "2d8 × 100s each",
    "count": "d10"
   },
   {
    "roll": 10,
    "text": "d20 crates of ASH, see pg. 10",
    "count": "d20",
    "ash": true
   },
   {
    "roll": 11,
    "text": "imprisoned undead"
   },
   {
    "roll": 12,
    "text": "a sorcerer with a tome of d4 Arcane Rituals (pg. 64)",
    "table": "rituals"
   }
  ]
 },
 "plotTwist": {
  "id": "cargoPlotTwist",
  "name": "Optional Plot Twist",
  "die": "d8",
  "page": 115,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Deadly disease on board."
   },
   {
    "roll": 2,
    "text": "Crew are impostors."
   },
   {
    "roll": 3,
    "text": "Crew is mute."
   },
   {
    "roll": 4,
    "text": "The PCs know this crew."
   },
   {
    "roll": 5,
    "text": "Everyone on board was thought to be dead."
   },
   {
    "roll": 6,
    "text": "Ghost ship."
   },
   {
    "roll": 7,
    "text": "They're all zombies."
   },
   {
    "roll": 8,
    "text": "Someone on board is related to a PC's backstory."
   }
  ]
 },
 "marketRates": {
  "ashStandardRate": 50,
  "text": "Cargo values are suggestions that swing ±50% between ports. ASH sells at a standard 50s per dose, adjusted by the Current ASH Market roll (pg. 10). A Veteran Quartermaster sells cargo for 50% more (pg. 76)."
 }
};

export const PB_CAROUSING: PbTable = {
 "id": "carousing",
 "name": "Carousing",
 "die": "d20",
 "dice": "4d20",
 "page": 2,
 "source": "Core Rules",
 "note": "Roll 4d20 (or 1d20 and read across). You are hungover for the lowest die in hours. Add the dice together: 4-49 is how much silver you spent or lost; 50+ is how much you won or stole. Read each die on its own column: Last night you… [who?] — You wake up… — and now you are…",
 "hangover": "lowest die in hours",
 "silver": {
  "spentBelow": 50,
  "text": "4-49 spent/lost in silver, 50+ won/stole in silver"
 },
 "columns": [
  {
   "die": "d20",
   "name": "Last night you…",
   "values": [
    "??? (you don't remember)",
    "got lucky with",
    "went swimming with",
    "made enemies with",
    "did some ASH with",
    "got in a fight with",
    "started a riot with",
    "stole from",
    "had a debate with",
    "became friends with",
    "played cards with",
    "spent the night with",
    "gambled with",
    "got drunk with",
    "fell in love with",
    "had a run-in with",
    "killed",
    "married",
    "saw the sunrise with",
    "had dinner with"
   ]
  },
  {
   "die": "d20",
   "name": "[who?]",
   "values": [
    "??? (you don't know).",
    "an enemy.",
    "a pig.",
    "a stranger.",
    "a crewmate.",
    "a monkey.",
    "a priest.",
    "your crew.",
    "a ghost.",
    "a skeleton.",
    "a barmaid/barkeep.",
    "some wenches.",
    "some soldiers.",
    "yourself.",
    "a beautiful person.",
    "the Devil.",
    "the captain.",
    "a VIP.",
    "a parrot.",
    "a VIP's adult progeny."
   ]
  },
  {
   "die": "d20",
   "name": "You wake up…",
   "values": [
    "??? (you're blind/it's dark)",
    "tied to a spit over a fire",
    "in your bunk or cabin",
    "in a gibbet cage",
    "in the hold of a ship",
    "deep in the jungle",
    "tied to a stake",
    "swinging from a mast",
    "in a dark cave",
    "in a coffin",
    "with a noose around your neck",
    "in a brothel or tavern",
    "locked in a cell",
    "on a tavern floor",
    "on the beach",
    "naked in the street",
    "in a captain's cabin",
    "in a church",
    "floating in water",
    "in a mansion"
   ]
  },
  {
   "die": "d20",
   "name": "and now you are…",
   "values": [
    "??? (confused).",
    "dead or dying.",
    "missing a limb.",
    "terrible (-1 to all stats).",
    "haggard (only d4 HP left).",
    "missing a digit or eye.",
    "on a wanted poster.",
    "in debt (3d10 x10 silver).",
    "haunted.",
    "really sad.",
    "ravenously hungry.",
    "soon to be a parent.",
    "in pain from a new tattoo.",
    "a year older.",
    "in love.",
    "rich (3d10 x 10 silver).",
    "the Captain now.",
    "the owner of a ship.",
    "amazing (gain experience).",
    "filthy rich (+1k silver)."
   ]
  }
 ],
 "rows": [
  {
   "roll": 1,
   "text": "??? (you don't remember) · ??? (you don't know). · ??? (you're blind/it's dark) · ??? (confused)."
  },
  {
   "roll": 2,
   "text": "got lucky with · an enemy. · tied to a spit over a fire · dead or dying."
  },
  {
   "roll": 3,
   "text": "went swimming with · a pig. · in your bunk or cabin · missing a limb."
  },
  {
   "roll": 4,
   "text": "made enemies with · a stranger. · in a gibbet cage · terrible (-1 to all stats)."
  },
  {
   "roll": 5,
   "text": "did some ASH with · a crewmate. · in the hold of a ship · haggard (only d4 HP left)."
  },
  {
   "roll": 6,
   "text": "got in a fight with · a monkey. · deep in the jungle · missing a digit or eye."
  },
  {
   "roll": 7,
   "text": "started a riot with · a priest. · tied to a stake · on a wanted poster."
  },
  {
   "roll": 8,
   "text": "stole from · your crew. · swinging from a mast · in debt (3d10 x10 silver)."
  },
  {
   "roll": 9,
   "text": "had a debate with · a ghost. · in a dark cave · haunted."
  },
  {
   "roll": 10,
   "text": "became friends with · a skeleton. · in a coffin · really sad."
  },
  {
   "roll": 11,
   "text": "played cards with · a barmaid/barkeep. · with a noose around your neck · ravenously hungry."
  },
  {
   "roll": 12,
   "text": "spent the night with · some wenches. · in a brothel or tavern · soon to be a parent."
  },
  {
   "roll": 13,
   "text": "gambled with · some soldiers. · locked in a cell · in pain from a new tattoo."
  },
  {
   "roll": 14,
   "text": "got drunk with · yourself. · on a tavern floor · a year older."
  },
  {
   "roll": 15,
   "text": "fell in love with · a beautiful person. · on the beach · in love."
  },
  {
   "roll": 16,
   "text": "had a run-in with · the Devil. · naked in the street · rich (3d10 x 10 silver)."
  },
  {
   "roll": 17,
   "text": "killed · the captain. · in a captain's cabin · the Captain now."
  },
  {
   "roll": 18,
   "text": "married · a VIP. · in a church · the owner of a ship."
  },
  {
   "roll": 19,
   "text": "saw the sunrise with · a parrot. · floating in water · amazing (gain experience)."
  },
  {
   "roll": 20,
   "text": "had dinner with · a VIP's adult progeny. · in a mansion · filthy rich (+1k silver)."
  }
 ]
};

export const PB_CHANGING_WINDS: PbRollEntry[] = [
 {
  "roll": 2,
  "name": "Becalmed",
  "text": "All ships speed 0.",
  "speed": "zero"
 },
 {
  "roll": 3,
  "name": "Fog",
  "text": "All weapon ranges are reduced to 6 hexes.",
  "range": 6
 },
 {
  "roll": [
   4,
   5
  ],
  "name": "Calm",
  "text": "Decrease all max speeds by 1.",
  "speedMod": -1
 },
 {
  "roll": [
   6,
   8
  ],
  "name": "Fair",
  "text": "Normal wind speed."
 },
 {
  "roll": [
   9,
   10
  ],
  "name": "Heavy",
  "text": "Increase all max speeds by 1.",
  "speedMod": 1
 },
 {
  "roll": 11,
  "name": "Changing Winds",
  "text": "Reroll the wind direction.",
  "rerollDirection": true
 },
 {
  "roll": 12,
  "name": "Storm",
  "text": "Reroll the wind direction each round. On a repeated result, all ships lose d6 HP (no hull protection).",
  "rerollDirection": "each round",
  "damage": "d6"
 }
];

export const PB_CHEAP_GEAR: PbGearRoll[] = [
 {
  "roll": 1,
  "text": "Lantern (d6 hours of oil)",
  "item": "lantern",
  "extra": {
   "item": "lantern-oil",
   "note": "d6 hours of oil"
  }
 },
 {
  "roll": 2,
  "text": "d4 candles (1 hour each)",
  "item": "candle",
  "qty": "d4"
 },
 {
  "roll": 3,
  "text": "30' of rope",
  "item": "rope-30"
 },
 {
  "roll": 4,
  "text": "Shovel",
  "item": "shovel"
 },
 {
  "roll": 5,
  "text": "Medical kit (stops bleeding/poison/infection and heals d6 HP, PRESENCE + 4 uses)",
  "item": "medical-kit"
 },
 {
  "roll": 6,
  "text": "Weighted dice",
  "item": null
 },
 {
  "roll": 7,
  "text": "Flint & steel",
  "item": "flint-and-steel"
 },
 {
  "roll": 8,
  "text": "Hammer & nails",
  "item": "hammer"
 },
 {
  "roll": 9,
  "text": "Mess kit",
  "item": "mess-kit"
 },
 {
  "roll": 10,
  "text": "Pipe & tobacco pouch",
  "item": "smoking-pipe",
  "extra": {
   "item": "tobacco"
  }
 },
 {
  "roll": 11,
  "text": "d6 torches (1 hour each)",
  "item": "torch",
  "qty": "d6"
 },
 {
  "roll": 12,
  "text": "A pet (d10)",
  "table": "pets"
 }
];

export const PB_CLASSES: PbClass[] = [
 {
  "id": "brute",
  "name": "Brute",
  "roll": 1,
  "optional": false,
  "page": 34,
  "tagline": "A tough melee combatant prone to fits of RAGE.",
  "text": "When you aren't bashing, smashing, slashing or crashing you're… well, that's all you really know. Your muscles are basically magic — you can't use arcane rituals.",
  "abilities": {
   "STRENGTH": 1,
   "AGILITY": 0,
   "PRESENCE": -1,
   "TOUGHNESS": 1,
   "SPIRIT": -1
  },
  "hpDie": "d12",
  "luckDie": "d2",
  "weapon": {
   "trusted": true,
   "table": "trustedWeapon"
  },
  "clothingDie": "d10",
  "hatDie": "d12",
  "restrictions": {
   "rituals": false,
   "relics": true,
   "magicArmorTier": 1,
   "metal": true
  },
  "tables": [
   {
    "id": "trustedWeapon",
    "name": "Trusted Weapon",
    "die": "d6",
    "when": "start",
    "picks": 1,
    "note": "Your trusted weapon never breaks, but you drop it on a Fumble. It is DR −2 to attack with. Name it!",
    "trustedRule": {
     "neverBreaks": true,
     "dropOnFumble": true,
     "dr": -2
    },
    "rows": [
     {
      "id": "brass-anchor",
      "roll": 1,
      "name": "Brass Anchor",
      "damage": "d8",
      "hands": 2,
      "text": "Two-handed. d8 damage, and the target's armor is reduced by one tier (−d2) for the attack.",
      "effects": [
       {
        "type": "weapon",
        "name": "Brass Anchor",
        "damage": "d8",
        "hands": 2,
        "special": "target armor −1 tier during the attack"
       }
      ]
     },
     {
      "id": "whaling-harpoon",
      "roll": 2,
      "name": "Whaling Harpoon",
      "damage": "d8",
      "thrown": {
       "ability": "AGILITY",
       "dr": 10
      },
      "text": "d8 damage; can be thrown by testing AGILITY DR10.",
      "effects": [
       {
        "type": "weapon",
        "name": "Whaling Harpoon",
        "damage": "d8",
        "thrown": {
         "ability": "AGILITY",
         "dr": 10
        }
       }
      ]
     },
     {
      "id": "meat-cleaver",
      "roll": 3,
      "name": "Meat Cleaver",
      "damage": "d4",
      "text": "Caked in old blood. d4 damage; on a damage roll of 1 it passes on a disease from a prior victim — the target loses d6 HP at the start of each of its next two turns.",
      "effects": [
       {
        "type": "weapon",
        "name": "Meat Cleaver",
        "damage": "d4",
        "special": "damage roll of 1: target loses d6 HP at the start of its next two turns"
       }
      ]
     },
     {
      "id": "broken-mast",
      "roll": 4,
      "name": "Part of a Broken Mast",
      "damage": "d8",
      "critExtra": "d6",
      "text": "A rusty nail juts from one end. d8 damage, plus an extra d6 on a critical hit.",
      "effects": [
       {
        "type": "weapon",
        "name": "Part of a Broken Mast",
        "damage": "d8",
        "critExtra": "d6"
       }
      ]
     },
     {
      "id": "runic-machete",
      "roll": 5,
      "name": "Runic Machete",
      "damage": "d6",
      "text": "d6 damage. Great for chopping vines and fopdoodles; glows in the dark when undead are near.",
      "effects": [
       {
        "type": "weapon",
        "name": "Runic Machete",
        "damage": "d6",
        "special": "glows in the dark when undead are nearby"
       }
      ]
     },
     {
      "id": "rotten-cargo-net",
      "roll": 6,
      "name": "Rotten Cargo Net",
      "damage": null,
      "thrown": {
       "ability": "AGILITY",
       "dr": 12
      },
      "text": "Test AGILITY DR12 to throw it at something and stop it moving for d2 rounds. Trapped targets take d2 damage per round.",
      "effects": [
       {
        "type": "weapon",
        "name": "Rotten Cargo Net",
        "damage": null,
        "thrown": {
         "ability": "AGILITY",
         "dr": 12
        },
        "special": "target can't move for d2 rounds; trapped targets take d2/round"
       }
      ]
     }
    ]
   },
   {
    "id": "gettingBetter",
    "name": "Getting Better",
    "die": "d6",
    "when": "experience",
    "rerollRepeats": true,
    "maxPicksEach": 1,
    "note": "Each time you gain experience gain one (reroll repeats).",
    "rows": [
     {
      "id": "liars-dice",
      "roll": 1,
      "name": "Liar's Dice",
      "text": "A small bag of 5d6. Roll them at the start of combat: if the total is even, your melee attacks are −2 DR but you defend at +2 DR.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "melee-attack",
        "when": "combat-start 5d6 total is even"
       },
       {
        "type": "dr",
        "value": 2,
        "applies": "defense",
        "when": "combat-start 5d6 total is even"
       }
      ],
      "roll5d6": true
     },
     {
      "id": "boomstick",
      "roll": 2,
      "name": "Boomstick",
      "text": "You find a top-of-the-line blunderbuss, \"Boomstick\": DR8 to hit and d10 damage in melee range, otherwise DR12 and d4 damage.",
      "effects": [
       {
        "type": "item",
        "item": "\"Boomstick\" Blunderbuss",
        "damage": "d10 (melee range, DR8) / d4 (DR12)",
        "blackPowder": true
       }
      ]
     },
     {
      "id": "blood-frenzy",
      "roll": 3,
      "name": "Blood Frenzy",
      "text": "+2 to damage rolls for each enemy you've killed so far this battle. Resets after 10 rounds (1 minute) without a death.",
      "effects": [
       {
        "type": "damage",
        "value": 2,
        "applies": "all",
        "per": "enemy killed this battle"
       }
      ]
     },
     {
      "id": "tavern-boxer",
      "roll": 4,
      "name": "Tavern Boxer",
      "text": "Your fists deal 2d4 and ignore Fumbles.",
      "effects": [
       {
        "type": "weapon",
        "name": "Fists",
        "damage": "2d4",
        "special": "ignores Fumbles"
       }
      ]
     },
     {
      "id": "thick-skinned",
      "roll": 5,
      "name": "Thick Skinned",
      "text": "You count as wearing light armor (tier 1, −d2) even when you aren't.",
      "effects": [
       {
        "type": "armor",
        "tier": 1,
        "die": "d2"
       }
      ]
     },
     {
      "id": "grog-breath",
      "roll": 6,
      "name": "Grog Breath",
      "text": "In melee range, belch to stun an opponent for 1 round. Once an hour, unless you drink more grog.",
      "effects": [
       {
        "type": "action",
        "name": "Grog Breath",
        "text": "stun 1 opponent in melee range for 1 round",
        "per": "hour"
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "rapscallion",
  "name": "Rapscallion",
  "roll": 2,
  "optional": false,
  "page": 36,
  "tagline": "A sneaky cutthroat scallywag. You will need a deck of playing cards…",
  "text": "Good at backstabbing, breaking and entering, stealing, cheating and escaping. Found in taverns, shadows and shallow graves.",
  "abilities": {
   "STRENGTH": -1,
   "AGILITY": 2,
   "PRESENCE": 0,
   "TOUGHNESS": -1,
   "SPIRIT": 0
  },
  "hpDie": "d8",
  "luckDie": "d2",
  "weapon": {
   "die": "d6"
  },
  "clothingDie": "d6",
  "hatDie": "d10",
  "restrictions": {
   "rituals": true,
   "relics": true,
   "magicArmorTier": 1,
   "metal": true
  },
  "usesCards": true,
  "tables": [
   {
    "id": "specialty",
    "name": "Specialty",
    "die": "d6",
    "when": "both",
    "picks": 1,
    "repeatUpgrades": true,
    "maxPicksEach": 2,
    "note": "Roll when you begin and whenever you gain experience. Rolling a specialty you have applies its \"if taken again\" upgrade.",
    "rows": [
     {
      "id": "back-stabber",
      "roll": 1,
      "name": "Back Stabber",
      "text": "Attacking by surprise (from hiding, a distracted enemy, etc.) lowers the attack DR by 2 and deals an extra d2 damage.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "attack",
        "when": "attacking by surprise"
       },
       {
        "type": "damage",
        "value": "d2",
        "applies": "attack",
        "when": "attacking by surprise"
       }
      ],
      "again": {
       "text": "Draw a card. Black: lower the DR by 1 more. Red: increase the damage die (d2 > d4 > d6 > d8). Joker: both.",
       "card": {
        "black": {
         "dr": -1
        },
        "red": {
         "dieChain": [
          "d2",
          "d4",
          "d6",
          "d8"
         ]
        },
        "joker": "both"
       }
      }
     },
     {
      "id": "burglar",
      "roll": 2,
      "name": "Burglar",
      "text": "You begin with lock picks. Pickpocketing, disarming an enemy or disabling a trap is −4 DR.",
      "effects": [
       {
        "type": "item",
        "item": "lock picks"
       },
       {
        "type": "dr",
        "value": -4,
        "applies": "test",
        "when": "pickpocket, disarm an enemy, disable a trap"
       }
      ],
      "again": {
       "text": "An additional −2 DR.",
       "effects": [
        {
         "type": "dr",
         "value": -2,
         "applies": "test",
         "when": "pickpocket, disarm an enemy, disable a trap"
        }
       ]
      }
     },
     {
      "id": "skylarker",
      "roll": 3,
      "name": "Skylarker",
      "text": "As nimble in the rigging as on deck: if you attack after swinging, jumping or an acrobatic maneuver, test AGILITY DR10 to hit automatically and deal +2 damage.",
      "effects": [
       {
        "type": "test",
        "ability": "AGILITY",
        "dr": 10,
        "when": "attacking after swinging, jumping or an acrobatic maneuver",
        "success": "automatic hit, +2 damage"
       }
      ],
      "again": {
       "text": "Increase the extra damage by +1.",
       "effects": [
        {
         "type": "damage",
         "value": 1,
         "when": "Skylarker attack"
        }
       ]
      }
     },
     {
      "id": "sneaky-bastard",
      "roll": 4,
      "name": "Sneaky Bastard",
      "text": "When striking from the shadows or while sneaking, test AGILITY DR12: on a success you automatically deal a critical hit.",
      "effects": [
       {
        "type": "test",
        "ability": "AGILITY",
        "dr": 12,
        "when": "striking from the shadows or while sneaking",
        "success": "automatic critical hit"
       }
      ],
      "again": {
       "text": "−2 to the DR.",
       "effects": [
        {
         "type": "dr",
         "value": -2,
         "applies": "test",
         "when": "Sneaky Bastard test"
        }
       ]
      }
     },
     {
      "id": "lucky-devil",
      "roll": 5,
      "name": "Lucky Devil",
      "text": "Whenever you use Devil's Luck, draw a card. 9+: regain 1 Luck. Joker: roll on the Joker table.",
      "card": {
       "regainOn": 9,
       "regain": 1,
       "joker": "joker"
      },
      "again": {
       "text": "Lower the card number needed to regain Luck by 1.",
       "card": {
        "regainOn": -1
       }
      }
     },
     {
      "id": "grog-brewer",
      "roll": 6,
      "name": "Grog Brewer",
      "text": "Each day brew d4 servings of potent grog. Soak melee weapons in it to use as a poison: grog in a wound means a TOUGHNESS DR14 test or −d6 HP.",
      "brewPerDay": "d4",
      "poison": {
       "ability": "TOUGHNESS",
       "dr": 14,
       "damage": "d6"
      },
      "again": {
       "text": "Draw a card. Black: +2 to the DR. Red: increase the damage die (d6 > d8 > d10 > d12). Joker: both.",
       "card": {
        "black": {
         "dr": 2
        },
        "red": {
         "dieChain": [
          "d6",
          "d8",
          "d10",
          "d12"
         ]
        },
        "joker": "both"
       }
      }
     }
    ]
   }
  ],
  "joker": "joker"
 },
 {
  "id": "buccaneer",
  "name": "Buccaneer",
  "roll": 3,
  "optional": false,
  "page": 38,
  "tagline": "Skilled trackers and survivalists; expert sharpshooters.",
  "text": "Deadly with muskets and rifles: reloading black powder weapons takes you 1 round instead of 2.",
  "abilities": {
   "STRENGTH": 0,
   "AGILITY": -1,
   "PRESENCE": 2,
   "TOUGHNESS": 0,
   "SPIRIT": -1
  },
  "hpDie": "d8",
  "luckDie": "d2",
  "weapon": {
   "fixed": [
    "musket"
   ]
  },
  "startingAmmo": {
   "item": "rounds of shot",
   "qty": "10 + PRESENCE"
  },
  "clothingDie": "d10",
  "hatDie": "d12",
  "restrictions": {
   "rituals": true,
   "relics": true,
   "magicArmorTier": 1,
   "metal": true
  },
  "classEffects": [
   {
    "type": "reload",
    "rounds": 1,
    "applies": "black powder"
   }
  ],
  "tables": [
   {
    "id": "feature",
    "name": "Feature",
    "die": "d6",
    "when": "both",
    "picks": 1,
    "maxPicksEach": 2,
    "rerollAfterMax": true,
    "note": "Roll when you begin and whenever you gain experience. Each can be taken twice (reroll on a third).",
    "rows": [
     {
      "id": "treasure-hunter",
      "roll": 1,
      "name": "Treasure Hunter",
      "maxPicks": 2,
      "text": "Tests for mapping, navigating, treasure hunting, finding and disarming traps, and tracking prey are −3 DR.",
      "effects": [
       {
        "type": "dr",
        "value": -3,
        "applies": "test",
        "when": "mapping, navigating, treasure hunting, finding & disarming traps, tracking prey"
       }
      ],
      "again": {
       "text": "−6 DR instead.",
       "effects": [
        {
         "type": "dr",
         "value": -3,
         "applies": "test",
         "when": "mapping, navigating, treasure hunting, finding & disarming traps, tracking prey"
        }
       ]
      }
     },
     {
      "id": "crack-shot",
      "roll": 2,
      "name": "Crack Shot",
      "maxPicks": 2,
      "text": "All ranged attacks are −2 DR.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "ranged-attack"
       }
      ],
      "again": {
       "text": "−4 DR instead.",
       "effects": [
        {
         "type": "dr",
         "value": -2,
         "applies": "ranged-attack"
        }
       ]
      }
     },
     {
      "id": "fix-bayonets",
      "roll": 3,
      "name": "Fix Bayonets!",
      "maxPicks": 2,
      "text": "You gain a bayonet (d4) and can attack with it on the same turn you reload.",
      "effects": [
       {
        "type": "item",
        "item": "bayonet",
        "damage": "d4"
       },
       {
        "type": "note",
        "text": "May attack with the bayonet on a turn spent reloading."
       }
      ],
      "again": {
       "text": "The bayonet deals d6 instead.",
       "effects": [
        {
         "type": "weaponDamage",
         "item": "bayonet",
         "damage": "d6"
        }
       ]
      }
     },
     {
      "id": "focused-aim",
      "roll": 4,
      "name": "Focused Aim",
      "maxPicks": 2,
      "text": "Attacks against enemies you've already shot at this combat are −4 DR to hit.",
      "effects": [
       {
        "type": "dr",
        "value": -4,
        "applies": "attack",
        "when": "target already shot at this combat"
       }
      ],
      "again": {
       "text": "Those attacks also deal an extra d4 damage.",
       "effects": [
        {
         "type": "damage",
         "value": "d4",
         "applies": "attack",
         "when": "target already shot at this combat"
        }
       ]
      }
     },
     {
      "id": "buccan-cook",
      "roll": 5,
      "name": "Buccan Cook",
      "maxPicks": 2,
      "text": "Island life taught you buccan-fire cooking. Start with d8 rations of smoked meat; eating one immediately heals d4 HP. Make d4 more rations from any edible animal you kill.",
      "effects": [
       {
        "type": "item",
        "item": "smoked meat ration",
        "qty": "d8",
        "heal": "d4"
       }
      ],
      "again": {
       "text": "Rations heal d6 instead.",
       "effects": [
        {
         "type": "consumableHeal",
         "item": "smoked meat ration",
         "heal": "d6"
        }
       ]
      }
     },
     {
      "id": "survivalist",
      "roll": 6,
      "name": "Survivalist",
      "maxPicks": 2,
      "text": "Your body is tuned for the wild: +1 TOUGHNESS, you can't become infected, sick or poisoned, and your max HP rises by d4.",
      "effects": [
       {
        "type": "ability",
        "ability": "TOUGHNESS",
        "value": 1
       },
       {
        "type": "immune",
        "conditions": [
         "infected",
         "sick",
         "poisoned"
        ]
       },
       {
        "type": "hpMax",
        "dice": "d4"
       }
      ],
      "again": {
       "text": "+1 TOUGHNESS and another d4 max HP.",
       "effects": [
        {
         "type": "ability",
         "ability": "TOUGHNESS",
         "value": 1
        },
        {
         "type": "hpMax",
         "dice": "d4"
        }
       ]
      }
     }
    ]
   }
  ]
 },
 {
  "id": "swashbuckler",
  "name": "Swashbuckler",
  "roll": 4,
  "optional": false,
  "page": 40,
  "tagline": "A brash fighter with bravado & swagger.",
  "text": "A flashy duelist who lives for the fight.",
  "abilities": {
   "STRENGTH": 1,
   "AGILITY": 1,
   "PRESENCE": -1,
   "TOUGHNESS": 0,
   "SPIRIT": -1
  },
  "hpDie": "d10",
  "luckDie": "d2",
  "weapon": {
   "die": "d10"
  },
  "clothingDie": "d10",
  "hatDie": "d12",
  "restrictions": {
   "rituals": true,
   "relics": true,
   "magicArmorTier": 1,
   "metal": true
  },
  "tables": [
   {
    "id": "fightingStyle",
    "name": "Fighting Style",
    "die": "d6",
    "when": "start",
    "picks": 1,
    "rows": [
     {
      "id": "ostentatious-fencer",
      "roll": 1,
      "name": "Ostentatious Fencer",
      "text": "Melee attack and defense are DR −2 while wielding a rapier or cutlass. When dueling one-on-one you deal +1 damage.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "melee-attack",
        "when": "wielding a rapier or cutlass"
       },
       {
        "type": "dr",
        "value": -2,
        "applies": "defense",
        "when": "wielding a rapier or cutlass"
       },
       {
        "type": "damage",
        "value": 1,
        "when": "dueling one-on-one"
       }
      ]
     },
     {
      "id": "flintlock-fanatic",
      "roll": 2,
      "name": "Flintlock Fanatic",
      "text": "Attack with up to three pistols on your turn (if you have them). Reloading one pistol takes you only one round.",
      "effects": [
       {
        "type": "attacks",
        "count": 3,
        "applies": "pistols"
       },
       {
        "type": "reload",
        "rounds": 1,
        "applies": "pistol"
       }
      ]
     },
     {
      "id": "scurvy-scallywag",
      "roll": 3,
      "name": "Scurvy Scallywag",
      "text": "You don't fight fair: −2 DR when attacking an enemy that has already been attacked this turn.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "attack",
        "when": "target already attacked this turn"
       }
      ]
     },
     {
      "id": "inspiring-leader",
      "roll": 4,
      "name": "Inspiring Leader",
      "text": "Once each combat, roll a d4. Each of your allies may add or subtract that value from any one roll during this combat.",
      "effects": [
       {
        "type": "action",
        "name": "Inspiring Leader",
        "roll": "d4",
        "per": "combat"
       }
      ]
     },
     {
      "id": "knife-knave",
      "roll": 5,
      "name": "Knife Knave",
      "text": "Start with 2 knives. Attacking with them you make two attacks a turn at DR −2 to hit, and if the first hits the second hits automatically.",
      "effects": [
       {
        "type": "item",
        "item": "knife/dagger",
        "qty": 2
       },
       {
        "type": "attacks",
        "count": 2,
        "applies": "knives"
       },
       {
        "type": "dr",
        "value": -2,
        "applies": "attack",
        "when": "attacking with knives"
       }
      ]
     },
     {
      "id": "black-powder-poet",
      "roll": 6,
      "name": "Black Powder Poet",
      "text": "Start with explosives: roll d4 times on the Bombs table (pg. 53). Your DR is −2 when throwing bombs.",
      "effects": [
       {
        "type": "item",
        "item": "bombs",
        "table": "bombs",
        "rolls": "d4"
       },
       {
        "type": "dr",
        "value": -2,
        "applies": "throw-bomb"
       }
      ]
     }
    ]
   },
   {
    "id": "experience",
    "name": "Experience",
    "die": "d6",
    "when": "experience",
    "rerollRepeats": true,
    "maxPicksEach": 1,
    "note": "Each time you gain experience gain one (reroll if already taken).",
    "rows": [
     {
      "id": "shakespeare-of-insults",
      "roll": 1,
      "name": "Shakespeare of Insults",
      "text": "Your tongue is as quick as your blade: +1 to all your damage rolls.",
      "effects": [
       {
        "type": "damage",
        "value": 1,
        "applies": "all"
       }
      ]
     },
     {
      "id": "military-mastermind",
      "roll": 2,
      "name": "Military Mastermind",
      "text": "When combat starts, test PRESENCE DR10 to take a surprise round against the enemy or prevent them surprising you.",
      "effects": [
       {
        "type": "test",
        "ability": "PRESENCE",
        "dr": 10,
        "when": "combat starts",
        "success": "surprise round, or prevent being surprised"
       }
      ]
     },
     {
      "id": "sword-master",
      "roll": 3,
      "name": "Sword Master",
      "text": "−2 to DR when attacking with a sword.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "sword-attack"
       }
      ]
     },
     {
      "id": "intimidating-presence",
      "roll": 4,
      "name": "Intimidating Presence",
      "text": "Enemies close to you suffer −2 Morale.",
      "effects": [
       {
        "type": "enemyMorale",
        "value": -2
       }
      ]
     },
     {
      "id": "dazzling-acrobatics",
      "roll": 5,
      "name": "Dazzling Acrobatics",
      "text": "Your AGILITY is +2 when defending.",
      "effects": [
       {
        "type": "dr",
        "value": -2,
        "applies": "defense",
        "note": "AGILITY +2 when defending"
       }
      ]
     },
     {
      "id": "calculating-cutthroat",
      "roll": 6,
      "name": "Calculating Cutthroat",
      "text": "You crit on natural 19 and 20 when attacking and defending.",
      "effects": [
       {
        "type": "crit",
        "range": 19,
        "applies": [
         "attack",
         "defense"
        ]
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "zealot",
  "name": "Zealot",
  "roll": 5,
  "optional": false,
  "page": 42,
  "tagline": "A clergy member, cultist, shaman or believer.",
  "text": "Thou may use ancient relics and arcane rituals whilst wearing medium armor (tier 2 or lower).",
  "abilities": {
   "STRENGTH": 0,
   "AGILITY": -1,
   "PRESENCE": 0,
   "TOUGHNESS": -1,
   "SPIRIT": 2
  },
  "hpDie": "d8",
  "luckDie": "d4",
  "weapon": {
   "die": "d8"
  },
  "clothingDie": "d8",
  "hatDie": null,
  "restrictions": {
   "rituals": true,
   "relics": true,
   "magicArmorTier": 2,
   "metal": true
  },
  "prayers": {
   "usesPerDay": "d2 + SPIRIT",
   "reset": "dawn",
   "action": true,
   "noRollUnlessNoted": true
  },
  "tables": [
   {
    "id": "deity",
    "name": "Whom Dost Thou Serve?",
    "die": "d8",
    "when": "start",
    "picks": 1,
    "rows": [
     {
      "id": "the-one-true-god",
      "roll": 1,
      "numeral": "I",
      "name": "The One True God"
     },
     {
      "id": "mother-nature",
      "roll": 2,
      "numeral": "II",
      "name": "Mother Nature"
     },
     {
      "id": "the-ancient-gods",
      "roll": 3,
      "numeral": "III",
      "name": "The Ancient Gods"
     },
     {
      "id": "chaos",
      "roll": 4,
      "numeral": "IV",
      "name": "Chaos"
     },
     {
      "id": "the-deep",
      "roll": 5,
      "numeral": "V",
      "name": "The Deep"
     },
     {
      "id": "the-dark-one",
      "roll": 6,
      "numeral": "666",
      "name": "The Dark One"
     },
     {
      "id": "the-church",
      "roll": 7,
      "numeral": "VII",
      "name": "The Church"
     },
     {
      "id": "the-great-old-one",
      "roll": 8,
      "numeral": "VIII",
      "name": "The Great Old One"
     }
    ]
   },
   {
    "id": "prayers",
    "name": "Prayers",
    "die": "d10",
    "when": "both",
    "picks": 1,
    "rerollRepeats": true,
    "maxPicksEach": 1,
    "note": "Learn one random prayer when you begin and every time you improve (reroll duplicates). Pray d2 + SPIRIT times a day (reroll at dawn); praying uses your action but needs no roll unless noted.",
    "rows": [
     {
      "id": "heal",
      "roll": 1,
      "numeral": "I",
      "name": "Heal",
      "text": "Heal yourself or another for d8 HP.",
      "heal": "d8"
     },
     {
      "id": "curse",
      "roll": 2,
      "numeral": "II",
      "name": "Curse",
      "test": {
       "ability": "SPIRIT",
       "dr": 10
      },
      "damage": "d8 + SPIRIT",
      "text": "Test SPIRIT DR10 to deal d8 + SPIRIT damage to an enemy you cannot see; DR8 if it's already been hurt this fight."
     },
     {
      "id": "death-ward",
      "roll": 3,
      "numeral": "III",
      "name": "Death Ward",
      "test": {
       "ability": "SPIRIT",
       "dr": 10
      },
      "text": "Touch the corpse of someone who just died and test SPIRIT DR10: they return to life with 1 HP. Crit: full HP. Fumble: they come back as a zombie and attack you."
     },
     {
      "id": "control-weather",
      "roll": 4,
      "numeral": "IV",
      "name": "Control Weather",
      "test": {
       "ability": "SPIRIT",
       "dr": 10
      },
      "text": "Test SPIRIT DR10 to change the wind's direction; succeed by 5 or more and you can also conjure or repel precipitation. Crit: lightning strikes your enemy for d12. Fumble: lightning strikes you for d6."
     },
     {
      "id": "blessed-guidance",
      "roll": 5,
      "numeral": "V",
      "name": "Blessed Guidance",
      "noAction": true,
      "bonus": "d4",
      "text": "Add d4 to any roll you or another player makes. Usable any time, even after the roll, and doesn't take your action."
     },
     {
      "id": "holy-protection",
      "roll": 6,
      "numeral": "VI",
      "name": "Holy Protection",
      "noAction": true,
      "dr": -4,
      "text": "You or an ally gets −4 DR to defend against one attack. Usable any time, even after the roll, and doesn't take your action."
     },
     {
      "id": "divine-light",
      "roll": 7,
      "numeral": "VII",
      "name": "Divine Light",
      "duration": "d6 × 10 minutes",
      "text": "Bright light radiates from you for up to d6 × 10 minutes. Enemies that see it are −2 DR to defend against."
     },
     {
      "id": "silence",
      "roll": 8,
      "numeral": "VIII",
      "name": "Silence",
      "duration": "2d6 × 10 minutes",
      "text": "For 2d6 × 10 minutes everything within 25' of you makes no sound. It ends only when the time expires."
     },
     {
      "id": "sanctuary",
      "roll": 9,
      "numeral": "IX",
      "name": "Sanctuary",
      "heal": "d4",
      "text": "All your brethren in sight heal d4 HP."
     },
     {
      "id": "commune",
      "roll": 10,
      "numeral": "X",
      "name": "Commune",
      "test": {
       "ability": "SPIRIT",
       "dr": 8
      },
      "text": "Test SPIRIT DR8 to ask your deity a single yes-or-no question. The answer may be \"unclear\", or there may be none."
     }
    ]
   }
  ]
 },
 {
  "id": "sorcerer",
  "name": "Sorcerer",
  "roll": 6,
  "optional": false,
  "page": 44,
  "tagline": "An eldritch occultist; a conduit for spirits and devious necromantic entities.",
  "text": "You draw power from supernatural spirits and ghosts: weak in body, strong in the old magic. You may use ancient relics and arcane rituals while wearing medium armor, but never near cold iron or while holding metal.",
  "abilities": {
   "STRENGTH": -1,
   "AGILITY": 0,
   "PRESENCE": 0,
   "TOUGHNESS": -1,
   "SPIRIT": 2
  },
  "hpDie": "d8",
  "luckDie": "d4",
  "weapon": {
   "choice": [
    {
     "name": "Wooden Knife",
     "damage": "d4",
     "wooden": true
    },
    {
     "weapon": "belaying-pin",
     "damage": "d4"
    }
   ],
   "note": "wooden knife (d4) or belaying pin (d4)"
  },
  "clothingDie": "d6",
  "hatDie": null,
  "restrictions": {
   "rituals": true,
   "relics": true,
   "magicArmorTier": 2,
   "metal": false,
   "noColdIron": true
  },
  "spells": {
   "castsPerDay": "d2 + SPIRIT",
   "reset": "sunset",
   "action": true,
   "noRollUnlessNoted": true,
   "startRank": 1,
   "maxRank": 3
  },
  "tables": [
   {
    "id": "spells",
    "name": "Spells",
    "die": "d6",
    "when": "both",
    "picks": 1,
    "repeatUpgrades": true,
    "maxPicksEach": 3,
    "note": "Begin with one rank I spell. On each experience roll again: a spell you already know rises a rank (max III). Cast d2 + SPIRIT spells a day, resetting at sunset.",
    "rows": [
     {
      "id": "dead-head",
      "roll": 1,
      "name": "Dead Head",
      "test": {
       "ability": "SPIRIT",
       "dr": 12
      },
      "ignoresArmor": true,
      "text": "Summon a flying ghostly skull. Spend your action and test SPIRIT DR12 to have it damage 1 target, ignoring armor. It dissipates after 1 minute or once it deals any damage. Fumble: it attacks you.",
      "ranks": {
       "I": {
        "damage": "2d4"
       },
       "II": {
        "damage": "2d6"
       },
       "III": {
        "damage": "2d8"
       }
      }
     },
     {
      "id": "spiritual-possession",
      "roll": 2,
      "name": "Spiritual Possession",
      "text": "One random creature is possessed by a spirit or ghost. Ally: −2 DR to attack and defense. Enemy: −2 DR to attack or defend against it. Any fumble involving the creature makes the spirit leave, stunning the host for 1 round.",
      "ranks": {
       "I": {
        "duration": "d2 rounds"
       },
       "II": {
        "duration": "d4 rounds"
       },
       "III": {
        "duration": "until combat ends"
       }
      }
     },
     {
      "id": "protection",
      "roll": 3,
      "name": "Protection",
      "duration": "1 hour",
      "extraArmor": "d2",
      "text": "Summon a ghost or spirit to watch over the souls of you and your allies: −d2 protection for an hour, in addition to armor.",
      "ranks": {
       "I": {
        "targets": 1
       },
       "II": {
        "targets": 2
       },
       "III": {
        "targets": 3
       }
      }
     },
     {
      "id": "clairvoyance",
      "roll": 4,
      "name": "Clairvoyance",
      "text": "Ask the spirits a question about an adjacent room or area — their answer may be a lie. Test SPIRIT to know if they are telling the truth.",
      "ranks": {
       "I": {
        "dr": 12
       },
       "II": {
        "dr": 10
       },
       "III": {
        "dr": 8
       }
      }
     },
     {
      "id": "necro-sleep",
      "roll": 5,
      "name": "Necro-Sleep",
      "test": {
       "ability": "SPIRIT",
       "dr": 12
      },
      "text": "A living creature appears to fall over dead, but remembers everything when it wakes. Test SPIRIT DR12 to see if it falls \"dead\" asleep.",
      "ranks": {
       "I": {
        "duration": "d2 rounds"
       },
       "II": {
        "duration": "d6 rounds"
       },
       "III": {
        "duration": "d8 hours"
       }
      }
     },
     {
      "id": "raise-the-dead",
      "roll": 6,
      "name": "Raise the Dead",
      "summon": "skeletal-thrall",
      "text": "Create skeletal thralls from nearby corpses. They are stupid but obey your verbal commands, and tumble into bones at sunrise. Skeletal Thrall: HP 4, Morale –, Claw/Bite d4.",
      "ranks": {
       "I": {
        "count": "1"
       },
       "II": {
        "count": "2"
       },
       "III": {
        "count": "d2+2"
       }
      }
     }
    ]
   }
  ]
 },
 {
  "id": "haunted-soul",
  "name": "Haunted Soul",
  "roll": 7,
  "optional": true,
  "page": 46,
  "tagline": "A possessed, infected, cursed, troubled or undead individual.",
  "text": "Roll a d6 for your ailment, then roll d6 for an additional (normal) class, which supplies your abilities, HP, weapon, clothing, hat, Devil's Luck and features.",
  "secondaryClass": {
   "die": "d6",
   "required": true
  },
  "abilities": null,
  "hpDie": null,
  "luckDie": null,
  "weapon": null,
  "clothingDie": null,
  "hatDie": null,
  "restrictions": null,
  "tables": [
   {
    "id": "ailment",
    "name": "Ailment",
    "die": "d6",
    "when": "start",
    "picks": 1,
    "rows": [
     {
      "id": "ghost",
      "roll": 1,
      "name": "Ghost",
      "short": "Apparate: SPIRIT DR14, d12.",
      "text": "A lost soul from beyond the grave inhabiting another's body. Once per night you can apparate and terrify a target with your ghostly visage: test SPIRIT DR14 to deal d12 damage. Reduced to 1 HP or exorcised, you become incorporeal and must find a new host within d12 hours or dissipate into the void. Possessing a new target: test SPIRIT DR16 (one attempt per target).",
      "effects": [
       {
        "type": "action",
        "name": "Apparate",
        "test": {
         "ability": "SPIRIT",
         "dr": 14
        },
        "damage": "d12",
        "per": "night"
       }
      ]
     },
     {
      "id": "conduit",
      "roll": 2,
      "name": "Conduit",
      "short": "Random ritual each dawn.",
      "text": "Restless spirits speak through you. Every dawn roll a random arcane ritual (pg. 64): you can use it once without testing SPIRIT, then the spirits leave your body. If you don't cast it by dawn you lose d2 HP.",
      "effects": [
       {
        "type": "ritual",
        "random": 1,
        "per": "dawn",
        "noTest": true,
        "uncastPenalty": "d2 HP"
       }
      ]
     },
     {
      "id": "eldritch-mind",
      "roll": 3,
      "name": "Eldritch Mind",
      "short": "Might panic in combat.",
      "text": "Something terrible wells beneath your thoughts; you are drawn to The Deep and its antediluvian horrors. Every time combat starts, test PRESENCE DR12. Fail: you panic — attacks are +4 DR to hit, but you may make 2 a turn. Pass: you harness the fear — attacks are −2 DR to hit this combat.",
      "effects": [
       {
        "type": "test",
        "ability": "PRESENCE",
        "dr": 12,
        "when": "combat starts",
        "success": "attacks −2 DR this combat",
        "failure": "attacks +4 DR but 2 attacks a turn"
       }
      ]
     },
     {
      "id": "zombie",
      "roll": 4,
      "name": "Zombie",
      "short": "Must eat flesh daily. Brains = good.",
      "text": "You are secretly a zombie and your flesh slowly rots away. You lose d2 HP every day you don't eat human flesh. Eating a human brain restores 2d6 HP. As long as your brain is intact you control all your body parts, attached or not.",
      "effects": [
       {
        "type": "upkeep",
        "text": "lose d2 HP each day without human flesh"
       },
       {
        "type": "heal",
        "source": "human brain",
        "heal": "2d6"
       }
      ]
     },
     {
      "id": "vampirism",
      "roll": 5,
      "name": "Vampirism",
      "short": "Must drink blood to heal.",
      "text": "Infected by a fiendish creature. Resting and normal means can't heal you, but fresh animal blood restores d2 HP and fresh human blood d6 HP, at most once an hour. You are faster at night (move 40' a turn) but hungover in sunlight (−2 TOUGHNESS).",
      "effects": [
       {
        "type": "noRestHealing"
       },
       {
        "type": "heal",
        "source": "fresh animal blood",
        "heal": "d2",
        "per": "hour"
       },
       {
        "type": "heal",
        "source": "fresh human blood",
        "heal": "d6",
        "per": "hour"
       },
       {
        "type": "movement",
        "feet": 40,
        "when": "night"
       },
       {
        "type": "ability",
        "ability": "TOUGHNESS",
        "value": -2,
        "when": "in sunlight"
       }
      ]
     },
     {
      "id": "skeleton",
      "roll": 6,
      "name": "Skeleton",
      "short": "Might reform if killed.",
      "text": "An undead skeleton reanimated by unknowable dark magic, yet with free will. If you are killed, reroll the damage dice that killed you: on 3 or less your bones reform and you return to life with 1 HP.",
      "effects": [
       {
        "type": "cheatDeath",
        "reroll": "killing damage dice",
        "successAtOrBelow": 3,
        "hp": 1
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "tall-tale",
  "name": "Tall Tale",
  "roll": 8,
  "optional": true,
  "page": 48,
  "tagline": "Legends of the sea made flesh.",
  "text": "Roll d6: 1-2 Merfolk, 3-4 Aquatic Mutant, 5-6 Sentient Animal.",
  "abilities": null,
  "hpDie": null,
  "luckDie": null,
  "weapon": null,
  "clothingDie": null,
  "hatDie": null,
  "restrictions": null,
  "variants": [
   {
    "roll": [
     1,
     2
    ],
    "id": "merfolk",
    "name": "Merfolk",
    "secondaryClass": {
     "die": "d6",
     "required": true
    },
    "text": "A child of Poseidon: a fish-like lower half and gills, both of which can be magically hidden. All DRs are −4 underwater. You die if you go 1 ± TOUGHNESS days (minimum 1) without submerging in fresh seawater. Roll d6 for an additional class.",
    "effects": [
     {
      "type": "dr",
      "value": -4,
      "applies": "all",
      "when": "underwater"
     },
     {
      "type": "upkeep",
      "text": "die after 1 ± TOUGHNESS days (min 1) without submerging in seawater"
     }
    ]
   },
   {
    "roll": [
     3,
     4
    ],
    "id": "aquatic-mutant",
    "name": "Aquatic Mutant",
    "secondaryClass": {
     "die": "d6",
     "required": true
    },
    "text": "Spawn of an abominable union between man and the sea. Roll d8 for the creature that makes up half your ancestry, then d6 for an additional class.",
    "table": {
     "id": "ancestry",
     "name": "Aquatic Ancestry",
     "die": "d8",
     "rows": [
      {
       "roll": 1,
       "id": "anglerfish",
       "name": "Anglerfish",
       "text": "See in the dark. Bite: d4.",
       "effects": [
        {
         "type": "sense",
         "name": "darkvision"
        },
        {
         "type": "weapon",
         "name": "Bite",
         "damage": "d4"
        }
       ]
      },
      {
       "roll": 2,
       "id": "crab",
       "name": "Crab",
       "text": "Pincher: d6.",
       "effects": [
        {
         "type": "weapon",
         "name": "Pincher",
         "damage": "d6"
        }
       ]
      },
      {
       "roll": 3,
       "id": "jellyfish",
       "name": "Jellyfish",
       "text": "Tendril: d2 & stun 1 round, 10' reach.",
       "effects": [
        {
         "type": "weapon",
         "name": "Tendril",
         "damage": "d2",
         "reach": 10,
         "special": "stun 1 round"
        }
       ]
      },
      {
       "roll": 4,
       "id": "octopus",
       "name": "Octopus",
       "text": "Tentacles: 2d4.",
       "effects": [
        {
         "type": "weapon",
         "name": "Tentacles",
         "damage": "2d4"
        }
       ]
      },
      {
       "roll": 5,
       "id": "sea-turtle",
       "name": "Sea Turtle",
       "text": "Extra −d2 to armor.",
       "effects": [
        {
         "type": "extraArmor",
         "die": "d2"
        }
       ]
      },
      {
       "roll": 6,
       "id": "electric-eel",
       "name": "Electric Eel",
       "text": "+1 to AGILITY. Electric skin: d6.",
       "effects": [
        {
         "type": "ability",
         "ability": "AGILITY",
         "value": 1
        },
        {
         "type": "weapon",
         "name": "Electric skin",
         "damage": "d6"
        }
       ]
      },
      {
       "roll": 7,
       "id": "shark",
       "name": "Shark",
       "text": "Bite: d8.",
       "effects": [
        {
         "type": "weapon",
         "name": "Bite",
         "damage": "d8"
        }
       ]
      },
      {
       "roll": 8,
       "id": "great-old-one",
       "name": "The Great Old One",
       "text": "Learn one random ritual (pg. 64).",
       "effects": [
        {
         "type": "ritual",
         "random": 1
        }
       ]
      }
     ]
    }
   },
   {
    "roll": [
     5,
     6
    ],
    "id": "sentient-animal",
    "name": "Sentient Animal",
    "secondaryClass": null,
    "text": "A mystically intelligent animal (no normal class) — maybe you were human once. Roll 3d6 for each ability, with −2 to every modifier except as listed. Reroll backstory details that make no sense; give away or leave behind equipment you can't carry. Devil's Luck d4 unless listed.",
    "table": {
     "id": "animal",
     "name": "Sentient Animal",
     "die": "d6",
     "rows": [
      {
       "roll": 1,
       "id": "foul-fowl",
       "name": "Foul Fowl",
       "abilities": {
        "STRENGTH": -2,
        "AGILITY": -2,
        "PRESENCE": -2,
        "TOUGHNESS": -2,
        "SPIRIT": 3
       },
       "hpDie": "d4",
       "luckDie": "d4",
       "weapon": {
        "name": "Beak Peck",
        "damage": "d2"
       },
       "text": "Gain the ability from one random relic and one random ritual. When you are killed, the ghosts of a hundred chickens swarm your assailant, ripping its spiritual soul from its flesh.",
       "effects": [
        {
         "type": "relic",
         "random": 1
        },
        {
         "type": "ritual",
         "random": 1
        }
       ]
      },
      {
       "roll": 2,
       "id": "jaguar",
       "name": "Jaguar",
       "abilities": {
        "STRENGTH": 2,
        "AGILITY": 2,
        "PRESENCE": -2,
        "TOUGHNESS": -2,
        "SPIRIT": -2
       },
       "hpDie": "d8",
       "luckDie": "d4",
       "weapon": {
        "name": "Bite/Claws",
        "damage": "d8"
       },
       "text": "A deadly jungle cat."
      },
      {
       "roll": 3,
       "id": "crocodile",
       "name": "Crocodile",
       "abilities": {
        "STRENGTH": 3,
        "AGILITY": -2,
        "PRESENCE": -2,
        "TOUGHNESS": 1,
        "SPIRIT": -2
       },
       "hpDie": "d10",
       "luckDie": "d4",
       "weapon": {
        "name": "Bite",
        "damage": "d10"
       },
       "text": "You swim and hide well in water."
      },
      {
       "roll": 4,
       "id": "bilge-rat",
       "name": "Bilge Rat",
       "abilities": {
        "STRENGTH": -2,
        "AGILITY": 3,
        "PRESENCE": -2,
        "TOUGHNESS": 2,
        "SPIRIT": -2
       },
       "hpDie": "d2",
       "luckDie": "d4",
       "weapon": {
        "name": "Diseased Bite",
        "damage": "d2",
        "special": "1-in-6 chance the target dies in d4 rounds from whatever disease you carry"
       },
       "text": "A filthy rodent. Your diseased bite has a 1-in-6 chance of killing the target in d4 rounds."
      },
      {
       "roll": 5,
       "id": "lucky-parrot",
       "name": "Lucky Parrot",
       "abilities": {
        "STRENGTH": -2,
        "AGILITY": 1,
        "PRESENCE": 2,
        "TOUGHNESS": -2,
        "SPIRIT": -2
       },
       "hpDie": "d2",
       "luckDie": "d6",
       "luckDaily": true,
       "weapon": {
        "name": "Beak Peck",
        "damage": "d4"
       },
       "text": "A colorful, talking, flying bird. Roll d6 for Devil's Luck points each day."
      },
      {
       "roll": 6,
       "id": "clever-monkey",
       "name": "Clever Monkey",
       "abilities": {
        "STRENGTH": -1,
        "AGILITY": 2,
        "PRESENCE": 0,
        "TOUGHNESS": -2,
        "SPIRIT": -2
       },
       "hpDie": "d6",
       "luckDie": "d4",
       "weapon": {
        "name": "Bite",
        "damage": "d4"
       },
       "startingWeaponDie": "d10",
       "text": "An excellent climber. Roll d10 for a starting weapon (pg. 50) as well as your bite."
      }
     ]
    }
   }
  ],
  "tables": []
 }
];

export const PB_CLOTHING: PbClothing[] = [
 {
  "id": "rags",
  "roll": [
   1,
   2
  ],
  "name": "Rags",
  "tier": 0,
  "armorDie": null,
  "cost": null,
  "agilityDR": 0,
  "defenseDR": 0
 },
 {
  "id": "common-clothes",
  "roll": [
   3,
   4
  ],
  "name": "Common Clothes",
  "tier": 0,
  "armorDie": null,
  "cost": 2,
  "agilityDR": 0,
  "defenseDR": 0
 },
 {
  "id": "old-uniform",
  "roll": 5,
  "name": "Old Uniform",
  "tier": 0,
  "armorDie": null,
  "cost": 8,
  "agilityDR": 0,
  "defenseDR": 0
 },
 {
  "id": "fancy-clothes",
  "roll": 6,
  "name": "Fancy Clothes",
  "tier": 0,
  "armorDie": null,
  "cost": 250,
  "agilityDR": 0,
  "defenseDR": 0,
  "special": "You look amazing."
 },
 {
  "id": "leather-armor",
  "roll": 7,
  "name": "Leather Armor",
  "tier": 1,
  "armorDie": "d2",
  "cost": 20,
  "agilityDR": 0,
  "defenseDR": 0
 },
 {
  "id": "hide-armor",
  "roll": 8,
  "name": "Hide Armor",
  "tier": 1,
  "armorDie": "d2",
  "cost": 25,
  "agilityDR": 0,
  "defenseDR": 0
 },
 {
  "id": "chain-shirt",
  "roll": 9,
  "name": "Chain Shirt",
  "tier": 2,
  "armorDie": "d4",
  "cost": 100,
  "agilityDR": 2,
  "defenseDR": 2,
  "metal": true,
  "special": "DR +2 on AGILITY tests, including defense."
 },
 {
  "id": "conquistador-plate",
  "roll": 10,
  "name": "Conquistador Plate",
  "tier": 3,
  "armorDie": "d6",
  "cost": 200,
  "agilityDR": 4,
  "defenseDR": 2,
  "metal": true,
  "sinks": true,
  "special": "DR +4 on AGILITY tests; defense is DR +2. You'll most likely sink and drown in water."
 }
];

export const PB_CLOTHING_RULES: PbRuleNote = {
 "page": 52,
 "notCarried": true,
 "text": "Pirates and sailors almost never wear armor or carry shields: black powder ignores armor, and armor gets you snagged, thrown overboard and drowned. Hats and clothing don't count toward carrying capacity. Check your class for your clothing die; landlubbers roll d10. Relics and arcane rituals almost never work in tier 2 or 3 armor or while wielding cold iron."
};

export const PB_CONTAINERS: PbContainer[] = [
 {
  "id": "bucket",
  "roll": 1,
  "name": "Bucket",
  "capacity": 4,
  "size": "normal",
  "text": "A bucket for 4 normal-sized items."
 },
 {
  "id": "bandolier",
  "roll": 2,
  "name": "Bandolier",
  "capacity": 6,
  "size": "small",
  "text": "A bandolier for 6 small-sized items."
 },
 {
  "id": "satchel",
  "roll": 3,
  "name": "Satchel",
  "capacity": 8,
  "size": "normal",
  "text": "A satchel for 8 normal-sized items."
 },
 {
  "id": "backpack",
  "roll": 4,
  "name": "Backpack",
  "capacity": 10,
  "size": "normal",
  "text": "A backpack for 10 normal-sized items."
 },
 {
  "id": "sea-chest-large",
  "roll": 5,
  "name": "Large Sea Chest",
  "capacity": 20,
  "size": "normal",
  "orChoice": true,
  "text": "A large sea chest for 20 normal-sized items, or one of the above of your choice."
 },
 {
  "id": "dinghy",
  "roll": 6,
  "name": "Dinghy",
  "capacity": null,
  "orChoice": true,
  "ship": "dinghy",
  "text": "A dinghy, or one of the above of your choice."
 }
];

export const PB_CREW_ACTIONS: PbCrewAction[] = [
 {
  "id": "fire-broadsides",
  "name": "Fire Broadsides",
  "test": {
   "ship": "skill",
   "pc": "PRESENCE",
   "dr": 12
  },
  "multi": true,
  "arc": true,
  "text": "Test the ship's CREW SKILL (+PC PRESENCE) DR12: attack with each of the ship's broadside attacks. The target must be in the ship's arc of fire."
 },
 {
  "id": "fire-small-arms",
  "name": "Fire Small Arms",
  "test": {
   "ship": "skill",
   "pc": "PRESENCE",
   "dr": 12
  },
  "multi": true,
  "text": "Test the ship's CREW SKILL (+PC PRESENCE) DR12: attack with each of the ship's small arms attacks."
 },
 {
  "id": "full-sail",
  "name": "Full Sail",
  "test": {
   "ship": "agility",
   "pc": "AGILITY",
   "dr": 12
  },
  "text": "Test ship AGILITY (+PC AGILITY) DR12: move one extra hex."
 },
 {
  "id": "come-about",
  "name": "Come About",
  "test": {
   "ship": "agility",
   "pc": "STRENGTH",
   "dr": 12
  },
  "text": "Test ship AGILITY (+PC STRENGTH) DR12: rotate one extra hex face."
 },
 {
  "id": "drop-anchor",
  "name": "Drop Anchor",
  "test": null,
  "text": "Reduce the ship's speed to zero."
 },
 {
  "id": "weigh-anchor",
  "name": "Weigh Anchor",
  "test": null,
  "text": "The ship is no longer anchored."
 },
 {
  "id": "repair",
  "name": "Repair",
  "test": {
   "ship": "skill",
   "pc": "PRESENCE",
   "dr": 12
  },
  "heal": "d6",
  "maxPercent": 50,
  "text": "Test the ship's CREW SKILL (+PC PRESENCE) DR12: the ship recovers d6 HP or repairs misfired cannons and small arms. This action can only restore a ship to 50% of its maximum HP."
 },
 {
  "id": "boarding-party",
  "name": "Boarding Party",
  "test": null,
  "text": "If touching another ship, the crew may board and attack. Switch to melee combat."
 },
 {
  "id": "ram",
  "name": "Ram",
  "test": null,
  "exclusive": true,
  "text": "A ship that ends its movement touching another ship can ram. All ships involved roll ram damage, adding +1 for each hex that ship traveled on its last move. A ramming ship can't take any other crew actions that turn."
 },
 {
  "id": "something-else",
  "name": "Something Else",
  "test": null,
  "text": "Use a relic or ritual, inspire the crew, hide, abandon ship, etc."
 }
];

export const PB_CREW_MODS: PbCrewMod[] = [
 {
  "condition": "Shortage of food",
  "mod": -1
 },
 {
  "condition": "Shortage of water",
  "mod": -3
 },
 {
  "condition": "Rum is gone",
  "mod": -5
 },
 {
  "condition": "Ship HP ≤ 50%",
  "mod": -2
 },
 {
  "condition": "Ship HP ≤ 25%",
  "mod": -5
 },
 {
  "condition": "Haven't taken a prize",
  "mod": -1,
  "per": "week"
 },
 {
  "condition": "Haven't divided the plunder",
  "mod": -3,
  "per": "month"
 },
 {
  "condition": "Shore leave",
  "recover": 2,
  "text": "recover 2"
 },
 {
  "condition": "Take a prize",
  "recover": 4,
  "text": "recover 4"
 },
 {
  "condition": "Divide the plunder",
  "reset": true,
  "text": "reset"
 },
 {
  "condition": "Under manned",
  "mod": -2
 },
 {
  "condition": "Inexperienced crew",
  "mod": -1,
  "permanent": true
 },
 {
  "condition": "Crew \"gains experience\"",
  "mod": 1,
  "permanent": true
 },
 {
  "condition": "Military discipline",
  "mod": 2,
  "permanent": true
 }
];

export const PB_DEITIES: PbDeity[] = [
 {
  "id": "the-one-true-god",
  "roll": 1,
  "numeral": "I",
  "name": "The One True God"
 },
 {
  "id": "mother-nature",
  "roll": 2,
  "numeral": "II",
  "name": "Mother Nature"
 },
 {
  "id": "the-ancient-gods",
  "roll": 3,
  "numeral": "III",
  "name": "The Ancient Gods"
 },
 {
  "id": "chaos",
  "roll": 4,
  "numeral": "IV",
  "name": "Chaos"
 },
 {
  "id": "the-deep",
  "roll": 5,
  "numeral": "V",
  "name": "The Deep"
 },
 {
  "id": "the-dark-one",
  "roll": 6,
  "numeral": "666",
  "name": "The Dark One"
 },
 {
  "id": "the-church",
  "roll": 7,
  "numeral": "VII",
  "name": "The Church"
 },
 {
  "id": "the-great-old-one",
  "roll": 8,
  "numeral": "VIII",
  "name": "The Great Old One"
 }
];

export const PB_DERELICT: PbRollEntry[] = [
 {
  "roll": [
   1,
   2
  ],
  "text": "No effect."
 },
 {
  "roll": 3,
  "text": "Sinks in d2 rounds.",
  "sinks": "d2 rounds"
 },
 {
  "roll": 4,
  "text": "Sinks next round.",
  "sinks": "next round"
 },
 {
  "roll": 5,
  "text": "Sinks now.",
  "sinks": "now"
 },
 {
  "roll": 6,
  "text": "Minor explosion: all aboard test AGILITY DR12 or take d6 damage.",
  "test": {
   "ability": "AGILITY",
   "dr": 12
  },
  "damage": "d6"
 },
 {
  "roll": 7,
  "text": "Major explosion: the ship sinks and all aboard take d8 damage.",
  "sinks": "now",
  "damage": "d8"
 },
 {
  "roll": 8,
  "text": "Magazine explosion: instant death to all aboard.",
  "sinks": "now",
  "death": true
 }
];

export const PB_DERELICT_GEN: PbGenerator = {
 "page": 116,
 "source": "Core Rules",
 "note": "Roll on each table to build a derelict ship to explore.",
 "tables": {
  "whereIsIt": {
   "id": "derelictWhere",
   "name": "Where Is It?",
   "die": "d12",
   "page": 116,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "shallow waters (submerged at high tide)"
    },
    {
     "roll": 2,
     "text": "suspended on shoals (half underwater)"
    },
    {
     "roll": 3,
     "text": "beach wrecked"
    },
    {
     "roll": 4,
     "text": "adrift at sea"
    },
    {
     "roll": 5,
     "text": "anchored off the coast"
    },
    {
     "roll": 6,
     "text": "suspended on rocks or a coastal cliff"
    },
    {
     "roll": 7,
     "text": "up a dried-up riverbed"
    },
    {
     "roll": 8,
     "text": "in the middle of the jungle, forest, or desert"
    },
    {
     "roll": 9,
     "text": "drifting into port"
    },
    {
     "roll": 10,
     "text": "orbiting a maelstrom"
    },
    {
     "roll": 11,
     "text": "floating the waters that lead to the underworld"
    },
    {
     "roll": 12,
     "text": "in the nightmares of cursed sailors"
    }
   ]
  },
  "typeOfShip": {
   "id": "derelictType",
   "name": "Type of Ship",
   "die": "d12",
   "page": 116,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "several ships fastened together (roll d2 more times)",
     "rollAgain": "d2"
    },
    {
     "roll": 2,
     "text": "sloop",
     "ship": "sloop"
    },
    {
     "roll": 3,
     "text": "tartane",
     "ship": "tartane"
    },
    {
     "roll": 4,
     "text": "giant jury-rigged raft",
     "ship": "raft"
    },
    {
     "roll": 5,
     "text": "brigantine",
     "ship": "brigantine"
    },
    {
     "roll": 6,
     "text": "frigate",
     "ship": "frigate"
    },
    {
     "roll": 7,
     "text": "ancient vessel",
     "ship": "galley"
    },
    {
     "roll": 8,
     "text": "galleon",
     "ship": "galleon"
    },
    {
     "roll": 9,
     "text": "fluyt",
     "ship": "fluyt"
    },
    {
     "roll": 10,
     "text": "man-of-war",
     "ship": "man-of-war"
    },
    {
     "roll": 11,
     "text": "ship of the line",
     "ship": "ship-of-the-line"
    },
    {
     "roll": 12,
     "text": "otherworldly"
    }
   ]
  },
  "whatHappened": {
   "id": "derelictWhatHappened",
   "name": "What Happened Here?",
   "die": "d8",
   "page": 116,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "demolished during a storm or hurricane"
    },
    {
     "roll": 2,
     "text": "abandoned for an unknown reason, mostly intact"
    },
    {
     "roll": 3,
     "text": "ripped in two by a monster from the deep"
    },
    {
     "roll": 4,
     "text": "run aground or scrapped some shoals"
    },
    {
     "roll": 5,
     "text": "raided by blood-thirsty undead"
    },
    {
     "roll": 6,
     "text": "destroyed in naval combat"
    },
    {
     "roll": 7,
     "text": "wrecked in foggy conditions"
    },
    {
     "roll": 8,
     "text": "mutiny fueled blood bath"
    }
   ]
  },
  "inOneOfTheRooms": {
   "id": "derelictRoom",
   "name": "In One of the Rooms",
   "die": "d8",
   "page": 116,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "filled with large eggs"
    },
    {
     "roll": 2,
     "text": "bodies of former crew, freshly dead, terror on their faces"
    },
    {
     "roll": 3,
     "text": "indecipherable glyphs carved into the wood beams"
    },
    {
     "roll": 4,
     "text": "water damaged books and letters"
    },
    {
     "roll": 5,
     "text": "hundreds of eyeballs hanging from strings"
    },
    {
     "roll": 6,
     "text": "a gaping hole in the hull"
    },
    {
     "roll": 7,
     "text": "rotting food and animal corpses"
    },
    {
     "roll": 8,
     "text": "glass bottles filled with [d6]: 1 rum, 2 potions (pg. 70), 3 fortified wine, 4 blood, 5 holy water, 6 excrement (human?)",
     "sub": {
      "die": "d6",
      "rows": [
       {
        "roll": 1,
        "text": "rum"
       },
       {
        "roll": 2,
        "text": "potions (pg. 70)",
        "table": "alchemy"
       },
       {
        "roll": 3,
        "text": "fortified wine"
       },
       {
        "roll": 4,
        "text": "blood"
       },
       {
        "roll": 5,
        "text": "holy water"
       },
       {
        "roll": 6,
        "text": "excrement (human?)"
       }
      ]
     }
    }
   ]
  },
  "oddFeature": {
   "id": "derelictOddFeature",
   "name": "Odd Feature",
   "die": "d12",
   "page": 117,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "walls and floor covered in coral and barnacles"
    },
    {
     "roll": 2,
     "text": "piles of bleached white bones throughout"
    },
    {
     "roll": 3,
     "text": "hundreds of small crab's nests"
    },
    {
     "roll": 4,
     "text": "cargo hold is filled with 6\" of blood"
    },
    {
     "roll": 5,
     "text": "charred wood and fire damage"
    },
    {
     "roll": 6,
     "text": "faintly glows in the dark"
    },
    {
     "roll": 7,
     "text": "mysterious slime covers most surfaces"
    },
    {
     "roll": 8,
     "text": "ornately decorated in gold leaf and velvet"
    },
    {
     "roll": 9,
     "text": "a thick layer of ash coats everything"
    },
    {
     "roll": 10,
     "text": "gravity behaves as if underwater"
    },
    {
     "roll": 11,
     "text": "signs of torture, sacrifice, and blood-letting"
    },
    {
     "roll": 12,
     "text": "bioluminescent plants bloom from hull at night"
    }
   ]
  },
  "development": {
   "id": "derelictDevelopment",
   "name": "Development",
   "die": "d8",
   "page": 117,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Sails! Ship spotted."
    },
    {
     "roll": 2,
     "text": "Derelict starts to sink or collapse."
    },
    {
     "roll": 3,
     "text": "Adversaries arrive: other pirates, monsters, the military."
    },
    {
     "roll": 4,
     "text": "Explosion or fire."
    },
    {
     "roll": 5,
     "text": "Extreme weather."
    },
    {
     "roll": 6,
     "text": "Thing from the deep complicates things."
    },
    {
     "roll": 7,
     "text": "Undead floating nearby."
    },
    {
     "roll": 8,
     "text": "A stowaway emerges."
    }
   ]
  },
  "currentOccupant": {
   "id": "derelictOccupant",
   "name": "Current Occupant",
   "die": "d12",
   "page": 117,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Ghosts of dead sailors. Their speech sounds like whale song.",
     "monster": "ghost-crew"
    },
    {
     "roll": 2,
     "text": "Poisonous necro-plague rats, their mother the size of a wolf.",
     "monster": "bilge-rat"
    },
    {
     "roll": 3,
     "text": "Dormant zombies waiting for fresh brains, their smell detectable for miles.",
     "monster": "bilge-rat-zombie"
    },
    {
     "roll": 4,
     "text": "A starving crew of pirate-turned-cannibals, some with freshly missing limbs."
    },
    {
     "roll": 5,
     "text": "Skeleton marauders celebrating a recent raid. The captain is an asshole.",
     "monster": "skeleton-capn"
    },
    {
     "roll": 6,
     "text": "Cultists, chanting, summoning Great Old Ones via human sacrifice.",
     "monster": "cultists"
    },
    {
     "roll": 7,
     "text": "3 beautiful sirens. They lust for pearls and have a hoard hidden nearby.",
     "monster": "siren"
    },
    {
     "roll": 8,
     "text": "A tribe of intelligent goblin-like monkeys. They love shiny things and rum."
    },
    {
     "roll": 9,
     "text": "A necromancer living in exile with a pet undead jaguar or shark.",
     "monster": "the-necromancer"
    },
    {
     "roll": 10,
     "text": "Deep Ones, lead by a shaman, scouting for valuables. Her magic requires water.",
     "monster": "deep-ones"
    },
    {
     "roll": 11,
     "text": "Hundreds of carrion gulls, feasting on a corpse hanging from a mast.",
     "monster": "carrion-gull"
    },
    {
     "roll": 12,
     "text": "Dozens of blood drained corpses. A weakened vampire hides below deck."
    }
   ]
  },
  "originalCargo": {
   "id": "derelictCargo",
   "name": "Original Cargo",
   "die": "d20",
   "page": 117,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "tea leaves or spices"
    },
    {
     "roll": 2,
     "text": "art or antiques"
    },
    {
     "roll": 3,
     "text": "coffee beans"
    },
    {
     "roll": 4,
     "text": "sugar or sugar cane"
    },
    {
     "roll": 5,
     "text": "rum or wine"
    },
    {
     "roll": 6,
     "text": "weapons and ammo"
    },
    {
     "roll": 7,
     "text": "tobacco or cocoa"
    },
    {
     "roll": 8,
     "text": "exotic creatures"
    },
    {
     "roll": 9,
     "text": "rice or crops"
    },
    {
     "roll": 10,
     "text": "black powder [d100 barrels]"
    },
    {
     "roll": 11,
     "text": "contraband"
    },
    {
     "roll": 12,
     "text": "textiles"
    },
    {
     "roll": 13,
     "text": "sacrificial victims"
    },
    {
     "roll": 14,
     "text": "prisoners"
    },
    {
     "roll": 15,
     "text": "lumber"
    },
    {
     "roll": 16,
     "text": "livestock"
    },
    {
     "roll": 17,
     "text": "a large statue"
    },
    {
     "roll": 18,
     "text": "hoards of treasure"
    },
    {
     "roll": 19,
     "text": "native medicine"
    },
    {
     "roll": 20,
     "text": "a cursed relic"
    }
   ]
  },
  "condition": {
   "id": "derelictCondition",
   "name": "Cargo Condition",
   "die": "d6",
   "page": 117,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "missing or ruined",
     "valueMultiplier": 0
    },
    {
     "roll": [
      2,
      3
     ],
     "text": "salvageable (x1/2)",
     "valueMultiplier": 0.5
    },
    {
     "roll": [
      4,
      5
     ],
     "text": "good (x1)",
     "valueMultiplier": 1
    },
    {
     "roll": 6,
     "text": "rare and valuable (x2)",
     "valueMultiplier": 2
    }
   ]
  }
 }
};

export const PB_DR: PbDrLabel[] = [
 {
  "dr": 6,
  "label": "easy",
  "text": "Easy, even for a landlubber."
 },
 {
  "dr": 8,
  "label": "routine",
  "text": "Routine, but some chance of failure."
 },
 {
  "dr": 10,
  "label": "pretty simple",
  "text": "Pretty simple, but not too simple."
 },
 {
  "dr": 12,
  "label": "normal",
  "text": "Normal — the standard difficulty.",
  "standard": true
 },
 {
  "dr": 14,
  "label": "difficult",
  "text": "Difficult."
 },
 {
  "dr": 16,
  "label": "really hard",
  "text": "Really hard."
 },
 {
  "dr": 18,
  "label": "nigh impossible",
  "text": "Nigh impossible."
 }
];

export const PB_ENEMY_BUILDER: PbEnemyBuilder = {
 "page": 91,
 "source": "Core Rules",
 "note": "A crash course in designing enemies — or just roll some dice. Most of the horror comes from your description.",
 "procedure": [
  "hp",
  "morale",
  "armor",
  "damage",
  "special"
 ],
 "tables": {
  "hp": {
   "id": "enemyHp",
   "name": "HP",
   "die": "d10",
   "page": 91,
   "source": "Core Rules",
   "note": "How tough or big is it?",
   "rows": [
    {
     "roll": 1,
     "text": "HP 1-3: Barely worth fighting.",
     "hp": [
      1,
      3
     ]
    },
    {
     "roll": 2,
     "text": "HP 4-6: A weak human.",
     "hp": [
      4,
      6
     ]
    },
    {
     "roll": 3,
     "text": "HP 7-9: An average human.",
     "hp": [
      7,
      9
     ]
    },
    {
     "roll": 4,
     "text": "HP 10-12: A tough human or animal.",
     "hp": [
      10,
      12
     ]
    },
    {
     "roll": 5,
     "text": "HP 13-15: A challenge to new PCs.",
     "hp": [
      13,
      15
     ]
    },
    {
     "roll": 6,
     "text": "HP 16-19: A serious threat to new PCs.",
     "hp": [
      16,
      19
     ]
    },
    {
     "roll": 7,
     "text": "HP 20-24: A low level boss.",
     "hp": [
      20,
      24
     ]
    },
    {
     "roll": 8,
     "text": "HP 25-29: A regional boss.",
     "hp": [
      25,
      29
     ]
    },
    {
     "roll": 9,
     "text": "HP 30-39: Huge or legendary.",
     "hp": [
      30,
      39
     ]
    },
    {
     "roll": 10,
     "text": "HP 40+: Naval threat, TPK zone.",
     "hp": [
      40,
      null
     ]
    }
   ]
  },
  "morale": {
   "id": "enemyMorale",
   "name": "Morale",
   "die": "2d6",
   "page": 91,
   "source": "Core Rules",
   "note": "How much courage does it have?",
   "rows": [
    {
     "roll": 2,
     "text": "Morale 2: Easily scared, likely to flee.",
     "morale": 2
    },
    {
     "roll": 3,
     "text": "Morale 3: Bottom of the food chain.",
     "morale": 3
    },
    {
     "roll": 4,
     "text": "Morale 4: Runs when danger is sensed.",
     "morale": 4
    },
    {
     "roll": 5,
     "text": "Morale 5: Fearful, but willing to fight.",
     "morale": 5
    },
    {
     "roll": 6,
     "text": "Morale 6: Untrained, average human.",
     "morale": 6
    },
    {
     "roll": 7,
     "text": "Morale 7: Combat experience.",
     "morale": 7
    },
    {
     "roll": 8,
     "text": "Morale 8: Military training.",
     "morale": 8
    },
    {
     "roll": 9,
     "text": "Morale 9: A brave leader.",
     "morale": 9
    },
    {
     "roll": 10,
     "text": "Morale 10: Unwise in their courage.",
     "morale": 10
    },
    {
     "roll": 11,
     "text": "Morale 11: Insane, heroic, or both.",
     "morale": 11
    },
    {
     "roll": 12,
     "text": "Morale –: Unintelligent, fights to the death, or compelled by an external force.",
     "morale": null
    }
   ]
  },
  "armor": {
   "id": "enemyArmor",
   "name": "Armor",
   "die": "d4",
   "page": 91,
   "source": "Core Rules",
   "note": "Traditional armor does not stop bullets.",
   "rows": [
    {
     "roll": 1,
     "text": "Tier 0 (−0): No armor. Skin or flesh.",
     "armor": null
    },
    {
     "roll": 2,
     "text": "Tier 1 (−d2): Leather, thick fur, scales.",
     "armor": {
      "name": "Armor",
      "die": "d2",
      "tier": 1
     }
    },
    {
     "roll": 3,
     "text": "Tier 2 (−d4): Chain mail, thick hide, blessed.",
     "armor": {
      "name": "Armor",
      "die": "d4",
      "tier": 2
     }
    },
    {
     "roll": 4,
     "text": "Tier 3 (−d6): Plate, armor, or blubber.",
     "armor": {
      "name": "Armor",
      "die": "d6",
      "tier": 3
     }
    }
   ]
  },
  "damage": {
   "id": "enemyDamage",
   "name": "Damage",
   "die": "d12",
   "page": 91,
   "source": "Core Rules",
   "note": "How deadly is it? Black powder weapons roll double damage but take 2 actions to reload.",
   "rows": [
    {
     "roll": 1,
     "text": "d2: A broken bottle, fist, weak claw, weak bite, harsh language.",
     "damage": "d2"
    },
    {
     "roll": 2,
     "text": "d4: Knife, hook, claw, improvised weapon, club.",
     "damage": "d4"
    },
    {
     "roll": 3,
     "text": "d6: Cutlass, axe, animal bite, tentacles slam.",
     "damage": "d6"
    },
    {
     "roll": 4,
     "text": "d8: Fine rapier, big sword, claw from a large beast.",
     "damage": "d8"
    },
    {
     "roll": 5,
     "text": "d10: Two-handed weapon, monster's bite, anchor.",
     "damage": "d10"
    },
    {
     "roll": 6,
     "text": "d12: Executioner's axe, kraken's maw.",
     "damage": "d12"
    },
    {
     "roll": 7,
     "text": "2d4: Flintlock pistol.",
     "damage": "2d4",
     "blackPowder": true
    },
    {
     "roll": 8,
     "text": "2d6: Standard black powder musket.",
     "damage": "2d6",
     "blackPowder": true
    },
    {
     "roll": 9,
     "text": "2d8: Buccaneer musket.",
     "damage": "2d8",
     "blackPowder": true
    },
    {
     "roll": 10,
     "text": "2d10: Mounted swivel gun.",
     "damage": "2d10",
     "blackPowder": true
    },
    {
     "roll": 11,
     "text": "2d12: Cannon shot in melee.",
     "damage": "2d12",
     "blackPowder": true
    },
    {
     "roll": 12,
     "text": "3d6: Some form of arcana.",
     "damage": "3d6"
    }
   ]
  },
  "special": {
   "id": "enemySpecial",
   "name": "Special",
   "die": "d10",
   "page": 91,
   "source": "Core Rules",
   "note": "What makes it unique? Mix and match for thematic adversaries.",
   "rows": [
    {
     "roll": 1,
     "name": "Quick/small/guarded",
     "text": "Quick/small/guarded: DR14 to attack/defend.",
     "dr": {
      "attack": 14,
      "defend": 14
     }
    },
    {
     "roll": 2,
     "name": "Slow/big/reckless",
     "text": "Slow/big/reckless: DR10 to attack/defend.",
     "dr": {
      "attack": 10,
      "defend": 10
     }
    },
    {
     "roll": 3,
     "name": "Poisonous",
     "text": "Poisonous: Test TOUGHNESS DR12 or become infected.",
     "test": {
      "ability": "TOUGHNESS",
      "dr": 12
     }
    },
    {
     "roll": 4,
     "name": "Combatant",
     "text": "Combatant: Takes 2 attacks each round.",
     "attacksPerRound": 2
    },
    {
     "roll": 5,
     "name": "Arcane/willpower",
     "text": "Arcane/willpower: Test SPIRIT DR12 or STRENGTH/AGILITY are −2 for the combat.",
     "test": {
      "ability": "SPIRIT",
      "dr": 12
     }
    },
    {
     "roll": 6,
     "name": "Outsmart/stun",
     "text": "Outsmart/stun: Test PRESENCE DR12 or skip the next d2 turns.",
     "test": {
      "ability": "PRESENCE",
      "dr": 12
     }
    },
    {
     "roll": 7,
     "name": "Terrifying",
     "text": "Terrifying: Test SPIRIT DR12 or must run away for d2 rounds. Or force NPCs to make MORALE tests.",
     "test": {
      "ability": "SPIRIT",
      "dr": 12
     }
    },
    {
     "roll": 8,
     "name": "Leadership",
     "text": "Leadership: Nearby allies are +2 DR to attack/defend."
    },
    {
     "roll": 9,
     "name": "Relic",
     "text": "Relic: They have d2 from pg. 62.",
     "table": "relics"
    },
    {
     "roll": 10,
     "name": "Ritual",
     "text": "Ritual: They know 1 from pg. 64.",
     "table": "rituals"
    }
   ]
  }
 },
 "variants": {
  "skeletons": {
   "page": 92,
   "ids": [
    "skeleton-lookout",
    "skeleton-rank-and-vile",
    "skeleton-dead-eye",
    "skeleton-hulk",
    "skeleton-bosun",
    "skeleton-warlock",
    "skeleton-capn"
   ],
   "rule": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock, skeletons that fail a morale test crumble into ASH."
  },
  "zombies": {
   "page": 94,
   "ids": [
    "bilge-rat-zombie",
    "deck-ghoul-zombie",
    "grog-barrel-zombie",
    "zombie-the-admiral"
   ],
   "appearanceTable": "zombieAppearance",
   "rule": "Zombies don't breathe air. A bite means TOUGHNESS DR8 or death within two days and rising as a zombie. A zombie that eats flesh recovers d4 HP (d8 for a brain)."
  },
  "ghosts": {
   "page": 96,
   "ids": [
    "ghost-monkey",
    "ghost-crew",
    "ghost-quartermaster",
    "ghost-captain"
   ],
   "rule": "Anyone seeing ghosts for the first time tests SPIRIT DR12 or flees in terror (test again each turn). Ghosts love grog and rum, especially with black powder in it; some plant roots harm them."
  },
  "customisable": {
   "note": "Blocks marked \"Choose 1 or 2\" (attackChoice: \"pick 1-2\") let the GM arm each minion from its weapon list.",
   "ids": [
    "skeleton-rank-and-vile",
    "deep-ones",
    "naval-crew",
    "conquistador",
    "skeleton-crew",
    "living-thralls",
    "thing-from-below",
    "lost-sailor"
   ]
  }
 }
};

export const PB_FACTIONS: PbFaction[] = [
 {
  "id": "brethren",
  "name": "Brethren of the Coast",
  "aka": [
   "Republic of Pirates"
  ],
  "page": 12,
  "seat": "Nassau",
  "source": "Core Rules",
  "text": "An outcast band of rebels, thieves and vagabonds whose lust for riches and debauchery is matched only by their demand for freedom; they wait in Nassau for the call of the sea."
 },
 {
  "id": "english-crown",
  "name": "The English Crown & West India Co.",
  "aka": [
   "British Empire",
   "West India Company"
  ],
  "page": 14,
  "seat": "Port Royal, Jamaica",
  "source": "Core Rules",
  "text": "An empire bled dry by war. The few ports still flying the Union Jack bow to Lord Hamilton, the scheming governor of Jamaica, who hires a fleet of shadowy privateers to stave off ruin."
 },
 {
  "id": "french-indies",
  "name": "The French Indies",
  "page": 16,
  "seat": "Petit-Goâve & Guadeloupe",
  "source": "Core Rules",
  "text": "Revolution brews in Petit-Goâve under a distracted king, while Guadeloupe's hedonistic aristocrats ignore their bloated, incompetent military."
 },
 {
  "id": "new-spain",
  "name": "Viceroyalty of New Spain",
  "aka": [
   "Spain",
   "Havana"
  ],
  "page": 18,
  "seat": "Havana",
  "source": "Core Rules",
  "text": "A dying kingdom run on intrigue and propaganda from Havana, guarding an impenetrable harbor where the treasure fleets gather."
 },
 {
  "id": "inquisition",
  "name": "The Inquisition",
  "aka": [
   "The Citadel"
  ],
  "page": 19,
  "seat": "Maracaibo",
  "source": "Core Rules",
  "text": "Religious hunters of heresy weaving their web from the citadel and dungeons at Maracaibo. Their captains appear as the Inquisitor archetype (pg. 111)."
 },
 {
  "id": "the-wretched",
  "name": "The Wretched",
  "page": 20,
  "seat": "hidden; The Abyss",
  "source": "Core Rules",
  "text": "A secret cult with eldritch ambitions hidden among sailors and townsfolk. Each solstice their prophet, The Sunken One, sinks into the shallows and returns with omens from the Great Old Ones, written into the Necronomicon. Their altar is The Abyss; their prayer is for what once was to return from the deep."
 }
];

export const PB_FANCY_GEAR: PbGearRoll[] = [
 {
  "roll": 1,
  "text": "Compass",
  "item": "compass"
 },
 {
  "roll": 2,
  "text": "Spyglass",
  "item": "spyglass"
 },
 {
  "roll": 3,
  "text": "Fishing rod",
  "item": "fishing-rod"
 },
 {
  "roll": 4,
  "text": "1 random Ancient Relic (pg. 62)",
  "table": "relics"
 },
 {
  "roll": 5,
  "text": "Bottle of fine rum",
  "item": null
 },
 {
  "roll": 6,
  "text": "Old pocket watch",
  "item": "pocket-watch"
 },
 {
  "roll": 7,
  "text": "Blanket & pillow",
  "item": "blanket-and-pillow"
 },
 {
  "roll": 8,
  "text": "Ink, quill, parchment",
  "item": "ink-quill-parchment"
 },
 {
  "roll": 9,
  "text": "Worn out book",
  "item": null
 },
 {
  "roll": 10,
  "text": "Tent",
  "item": "tent"
 },
 {
  "roll": 11,
  "text": "Whetstone",
  "item": "whetstone"
 },
 {
  "roll": 12,
  "text": "Instrument (d10)",
  "table": "instruments"
 }
];

export const PB_FLAWS: PbRollEntry[] = [
 {
  "roll": 1,
  "text": "Drunken lush"
 },
 {
  "roll": 2,
  "text": "Stubborn"
 },
 {
  "roll": 3,
  "text": "Mocking, sardonic cheer"
 },
 {
  "roll": 4,
  "text": "Way too loud"
 },
 {
  "roll": 5,
  "text": "Stupid"
 },
 {
  "roll": 6,
  "text": "Coward"
 },
 {
  "roll": 7,
  "text": "Cocky"
 },
 {
  "roll": 8,
  "text": "Slightly deranged"
 },
 {
  "roll": 9,
  "text": "Aggressive"
 },
 {
  "roll": 10,
  "text": "Anxious"
 },
 {
  "roll": 11,
  "text": "Cheater"
 },
 {
  "roll": 12,
  "text": "Selfish"
 },
 {
  "roll": 13,
  "text": "Lazy"
 },
 {
  "roll": 14,
  "text": "Hedonistic"
 },
 {
  "roll": 15,
  "text": "Impulsive"
 },
 {
  "roll": 16,
  "text": "Ostentatious"
 },
 {
  "roll": 17,
  "text": "Paranoid"
 },
 {
  "roll": 18,
  "text": "Pretentious"
 },
 {
  "roll": 19,
  "text": "Sadistic"
 },
 {
  "roll": 20,
  "text": "Disloyal"
 }
];

export const PB_FOUL_WEATHER: PbRollEntry[] = [
 {
  "roll": 2,
  "text": "Deep cold, well below the line."
 },
 {
  "roll": 3,
  "text": "Nauseating, green mist."
 },
 {
  "roll": 4,
  "text": "Thick, low-lying fog."
 },
 {
  "roll": 5,
  "text": "Oppressively overcast."
 },
 {
  "roll": 6,
  "text": "Hellfire, sweltering sunlight."
 },
 {
  "roll": 7,
  "text": "Gentle breeze, smell of decay."
 },
 {
  "roll": 8,
  "text": "Calm before the storm."
 },
 {
  "roll": 9,
  "text": "Soft, cold rain."
 },
 {
  "roll": 10,
  "text": "Frigid trade winds."
 },
 {
  "roll": 11,
  "text": "Torrential downpours."
 },
 {
  "roll": 12,
  "text": "Catastrophic tempest."
 }
];

export const PB_GEAR: PbGear[] = [
 {
  "id": "backpack",
  "name": "Backpack",
  "cost": 6,
  "costText": "6s",
  "category": "container",
  "capacity": 10
 },
 {
  "id": "bandolier",
  "name": "Bandolier",
  "cost": 4,
  "costText": "4s",
  "category": "container",
  "capacity": 6,
  "small": true
 },
 {
  "id": "blanket-and-pillow",
  "name": "Blanket & Pillow",
  "cost": 5,
  "costText": "5s",
  "category": "gear"
 },
 {
  "id": "bucket",
  "name": "Bucket",
  "cost": 3,
  "costText": "3s",
  "category": "container",
  "capacity": 4
 },
 {
  "id": "candle",
  "name": "Candle",
  "cost": 1,
  "costText": "1s",
  "category": "gear",
  "light": true,
  "duration": "1 hour",
  "consumable": true
 },
 {
  "id": "cannon-ball",
  "name": "Cannon Ball",
  "cost": 3,
  "costText": "3s",
  "category": "gear"
 },
 {
  "id": "compass",
  "name": "Compass",
  "cost": 75,
  "costText": "75s",
  "category": "gear"
 },
 {
  "id": "dinghy",
  "name": "Dinghy",
  "cost": 250,
  "costText": "250s",
  "category": "vessel",
  "note": "core book, pg. 80",
  "ship": "dinghy"
 },
 {
  "id": "dried-food",
  "name": "Dried Food",
  "cost": 1,
  "costText": "1s",
  "category": "gear",
  "duration": "1 day",
  "consumable": true,
  "ration": true,
  "aliases": [
   "ration",
   "rations"
  ]
 },
 {
  "id": "fishing-rod",
  "name": "Fishing Rod",
  "cost": 25,
  "costText": "25s",
  "category": "gear"
 },
 {
  "id": "flask",
  "name": "Flask",
  "cost": 2,
  "costText": "2s",
  "category": "gear"
 },
 {
  "id": "flint-and-steel",
  "name": "Flint and Steel",
  "cost": 3,
  "costText": "3s",
  "category": "gear",
  "aliases": [
   "flint & steel"
  ]
 },
 {
  "id": "hammer",
  "name": "Hammer",
  "cost": 8,
  "costText": "8s",
  "category": "gear"
 },
 {
  "id": "ink-quill-parchment",
  "name": "Ink, Quill, Parchment",
  "cost": 20,
  "costText": "20s",
  "category": "gear"
 },
 {
  "id": "lantern",
  "name": "Lantern",
  "cost": 10,
  "costText": "10s",
  "category": "gear",
  "light": true,
  "fuel": "lantern-oil"
 },
 {
  "id": "lantern-oil",
  "name": "Lantern Oil",
  "cost": 5,
  "costText": "5s",
  "category": "gear",
  "duration": "d6 hours",
  "consumable": true,
  "fuelFor": "lantern"
 },
 {
  "id": "livestock",
  "name": "Livestock",
  "cost": null,
  "costText": "20-200s",
  "category": "gear",
  "costMin": 20,
  "costMax": 200
 },
 {
  "id": "lock-picks",
  "name": "Lock Picks",
  "cost": 5,
  "costText": "5s",
  "category": "gear"
 },
 {
  "id": "longboat",
  "name": "Longboat",
  "cost": 500,
  "costText": "500s",
  "category": "vessel",
  "note": "core book, pg. 81",
  "ship": "longboat"
 },
 {
  "id": "manacles",
  "name": "Manacles",
  "cost": 10,
  "costText": "10s",
  "category": "gear"
 },
 {
  "id": "medical-kit",
  "name": "Medical Kit",
  "cost": 15,
  "costText": "15s",
  "category": "gear",
  "uses": "PRESENCE + 4",
  "consumable": true,
  "heal": "d6",
  "cures": [
   "bleeding",
   "poison",
   "infection"
  ],
  "effect": "Stops bleeding, poison or infection and heals d6 HP."
 },
 {
  "id": "mess-kit",
  "name": "Mess Kit",
  "cost": 8,
  "costText": "8s",
  "category": "gear"
 },
 {
  "id": "metal-file",
  "name": "Metal File",
  "cost": 10,
  "costText": "10s",
  "category": "gear"
 },
 {
  "id": "mirror",
  "name": "Mirror",
  "cost": 15,
  "costText": "15s",
  "category": "gear"
 },
 {
  "id": "musical-instrument",
  "name": "Musical Instrument",
  "cost": 250,
  "costText": "250s+",
  "category": "gear",
  "costMin": 250,
  "table": "instruments"
 },
 {
  "id": "peg-leg",
  "name": "Peg Leg",
  "cost": 15,
  "costText": "15s",
  "category": "gear"
 },
 {
  "id": "pocket-watch",
  "name": "Pocket Watch",
  "cost": 45,
  "costText": "45s",
  "category": "gear"
 },
 {
  "id": "rope-30",
  "name": "Rope (30')",
  "cost": 4,
  "costText": "4s",
  "category": "gear",
  "aliases": [
   "rope",
   "30' of rope"
  ]
 },
 {
  "id": "satchel",
  "name": "Satchel",
  "cost": 5,
  "costText": "5s",
  "category": "container",
  "capacity": 8
 },
 {
  "id": "sea-chest-large",
  "name": "Sea Chest, Large",
  "cost": 50,
  "costText": "50s",
  "category": "container",
  "capacity": 20
 },
 {
  "id": "sea-chest-small",
  "name": "Sea Chest, Small",
  "cost": 20,
  "costText": "20s",
  "category": "container",
  "capacity": null
 },
 {
  "id": "shovel",
  "name": "Shovel",
  "cost": 5,
  "costText": "5s",
  "category": "gear"
 },
 {
  "id": "smoking-pipe",
  "name": "Smoking Pipe",
  "cost": 10,
  "costText": "10s",
  "category": "gear"
 },
 {
  "id": "speaking-trumpet",
  "name": "Speaking Trumpet",
  "cost": 30,
  "costText": "30s",
  "category": "gear"
 },
 {
  "id": "spyglass",
  "name": "Spyglass",
  "cost": 150,
  "costText": "150s",
  "category": "gear"
 },
 {
  "id": "tankard",
  "name": "Tankard",
  "cost": 2,
  "costText": "2s",
  "category": "gear"
 },
 {
  "id": "tattoo",
  "name": "Tattoo",
  "cost": null,
  "costText": "10-150s",
  "category": "gear",
  "costMin": 10,
  "costMax": 150
 },
 {
  "id": "tent",
  "name": "Tent",
  "cost": 25,
  "costText": "25s",
  "category": "gear"
 },
 {
  "id": "tobacco",
  "name": "Tobacco",
  "cost": 10,
  "costText": "10s",
  "category": "gear",
  "uses": "d6",
  "consumable": true
 },
 {
  "id": "torch",
  "name": "Torch",
  "cost": 2,
  "costText": "2s",
  "category": "gear",
  "light": true,
  "duration": "1 hour",
  "consumable": true
 },
 {
  "id": "water-skin",
  "name": "Water Skin",
  "cost": 2,
  "costText": "2s",
  "category": "gear"
 },
 {
  "id": "whetstone",
  "name": "Whetstone",
  "cost": 5,
  "costText": "5s",
  "category": "gear"
 }
];

export const PB_GM_TABLES: Record<string, PbTable> = {
 "reaction": {
  "id": "reaction",
  "name": "Reaction",
  "die": "2d6",
  "page": 31,
  "source": "Player's Guidebook",
  "note": "Roll when meeting creatures whose reaction is uncertain.",
  "rows": [
   {
    "roll": [
     2,
     3
    ],
    "text": "Bloodthirsty"
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Angered or alarmed"
   },
   {
    "roll": [
     7,
     8
    ],
    "text": "Indifferent, neutral"
   },
   {
    "roll": [
     9,
     10
    ],
    "text": "Almost friendly"
   },
   {
    "roll": [
     11,
     12
    ],
    "text": "Helpful"
   }
  ]
 },
 "morale": {
  "id": "morale",
  "name": "Morale",
  "die": "2d6",
  "page": 31,
  "source": "Player's Guidebook",
  "note": "Most enemies won't fight to the death. Roll 2d6 when a trigger happens: a result greater than the creature's Morale means it is demoralized — roll d6: 1-3 it flees, 4-6 it surrenders. Creatures with Morale '–' never break.",
  "triggers": [
   "The leader is killed.",
   "Half of the group is eliminated.",
   "A single enemy has only 1/3 of its HP left."
  ],
  "check": {
   "die": "2d6",
   "breaksIf": "greater than Morale"
  },
  "rows": [
   {
    "roll": [
     1,
     3
    ],
    "text": "Flees"
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Surrenders"
   }
  ],
  "rowsDie": "d6"
 },
 "broken": {
  "id": "broken",
  "name": "Broken (0 HP)",
  "die": "d6",
  "page": 32,
  "source": "Player's Guidebook",
  "note": "At exactly 0 HP you are Broken: roll d6.",
  "rows": [
   {
    "roll": 1,
    "name": "Instant death",
    "text": "Instant death: Instant death.",
    "dead": true
   },
   {
    "roll": 2,
    "name": "Hemorrhage",
    "text": "Hemorrhage: Death in d2 hours unless treated. All tests are DR16 the first hour and DR18 the last hour.",
    "deathIn": "d2 hours",
    "testDR": [
     16,
     18
    ]
   },
   {
    "roll": 3,
    "name": "Brain injury",
    "text": "Brain injury: You wake in 1 hour with −3 to PRESENCE for d8 days.",
    "ability": {
     "PRESENCE": -3
    },
    "duration": "d8 days"
   },
   {
    "roll": 4,
    "name": "Limb or eye",
    "text": "Limb or eye: Roll d6: 1-5 a broken or severed limb, 6 a lost eye. You can't act for d4 rounds, then become active with d4 HP.",
    "sub": {
     "die": "d6",
     "rows": [
      {
       "roll": [
        1,
        5
       ],
       "text": "Broken or severed limb"
      },
      {
       "roll": 6,
       "text": "Lost eye"
      }
     ]
    },
    "outRounds": "d4",
    "hp": "d4"
   },
   {
    "roll": 5,
    "name": "Unconscious",
    "text": "Unconscious: Fall unconscious for d4 rounds, then wake with 1 HP and 0 Devil's Luck.",
    "outRounds": "d4",
    "hp": 1,
    "luck": 0
   },
   {
    "roll": 6,
    "name": "Dazed",
    "text": "Dazed: Fall unconscious for d2 rounds, then wake with d4 HP and d2 Devil's Luck.",
    "outRounds": "d2",
    "hp": "d4",
    "luck": "d2"
   }
  ]
 },
 "misfire": {
  "id": "misfire",
  "name": "Misfire (black powder fumble)",
  "die": "d6",
  "page": 30,
  "source": "Player's Guidebook",
  "rows": [
   {
    "roll": [
     1,
     2
    ],
    "name": "Backfire",
    "text": "Backfire: Take d2 damage.",
    "damage": "d2"
   },
   {
    "roll": [
     3,
     4
    ],
    "name": "Broken",
    "text": "Broken: The weapon is broken.",
    "weaponBroken": true
   },
   {
    "roll": [
     5,
     6
    ],
    "name": "Both",
    "text": "Both: Take d2 damage and the weapon is broken.",
    "damage": "d2",
    "weaponBroken": true
   }
  ]
 },
 "amongTheDead": {
  "id": "amongTheDead",
  "name": "Among the Dead You Find",
  "die": "d6",
  "page": 33,
  "source": "Player's Guidebook",
  "note": "Rolled as part of gaining experience.",
  "rows": [
   {
    "roll": [
     1,
     2
    ],
    "text": "Nothing."
   },
   {
    "roll": 3,
    "text": "A weapon (roll d10 on the starting weapon table, pg. 50).",
    "table": "startingWeapons",
    "die": "d10"
   },
   {
    "roll": 4,
    "text": "3d10 silver.",
    "silver": "3d10"
   },
   {
    "roll": 5,
    "text": "1 ancient relic (pg. 62).",
    "table": "relics"
   },
   {
    "roll": 6,
    "text": "1 arcane ritual (pg. 64).",
    "table": "rituals"
   }
  ]
 },
 "joker": {
  "id": "joker",
  "name": "Joker Table",
  "die": "d20",
  "page": 37,
  "source": "Player's Guidebook",
  "note": "Rapscallion Lucky Devil: drawing a Joker after using Devil's Luck.",
  "rows": [
   {
    "roll": 1,
    "name": "The Devil",
    "text": "The Devil comes for your soul. You are sucked into a fiery portal — this is the end of your story.",
    "dead": true
   },
   {
    "roll": [
     2,
     9
    ],
    "text": "Lose all of your remaining Luck points.",
    "luck": "zero"
   },
   {
    "roll": [
     10,
     19
    ],
    "text": "Regain 2 Luck points.",
    "luck": 2
   },
   {
    "roll": 20,
    "text": "Gain 4 Luck points (to a max of 4).",
    "luck": 4,
    "luckMax": 4
   }
  ]
 },
 "relics": {
  "id": "relics",
  "name": "Ancient Relics",
  "die": "d20",
  "page": 62,
  "source": "Player's Guidebook",
  "note": "Use your action to activate a relic you carry. After using it, test SPIRIT DR12. Relics almost never work while wearing tier 2 or 3 armor or wielding cold iron.",
  "rows": [
   {
    "roll": 1,
    "name": "Cross of the Paragon",
    "text": "Cross of the Paragon: One ally gets +1 to attack and +1 to damage for d6 turns.",
    "duration": "d6 turns",
    "target": "ally",
    "bonus": {
     "attack": 1,
     "damage": 1
    }
   },
   {
    "roll": 2,
    "name": "Conch Shell from the Abyss",
    "text": "Conch Shell from the Abyss: Ask a nearby corpse (or any creature that died at sea within 100 miles) one question."
   },
   {
    "roll": 3,
    "name": "Map Inked in Ectoplasm",
    "text": "Map Inked in Ectoplasm: Learn the location of all traps and secret doors within 30' for d4+SPIRIT rounds.",
    "duration": "d4+SPIRIT rounds"
   },
   {
    "roll": 4,
    "name": "Will-o'-the-Wisp Lantern",
    "text": "Will-o'-the-Wisp Lantern: Emit 15' of light or darkness for d6+SPIRIT rounds.",
    "duration": "d6+SPIRIT rounds"
   },
   {
    "roll": 5,
    "name": "Pages from the Necronomicon",
    "text": "Pages from the Necronomicon: All creatures that can hear your voice test DR14 or lose d4+SPIRIT HP (ignore armor).",
    "damage": "d4+SPIRIT",
    "ignoresArmor": true,
    "targetTest": {
     "dr": 14
    },
    "area": "all who hear"
   },
   {
    "roll": 6,
    "name": "Rune Encrusted Flintlock Pistol",
    "text": "Rune Encrusted Flintlock Pistol: One creature you see loses d6+SPIRIT HP (ignore armor). Takes 1 action to reload.",
    "damage": "d6+SPIRIT",
    "ignoresArmor": true,
    "reload": 1
   },
   {
    "roll": 7,
    "name": "Jade Die",
    "text": "Jade Die: Roll a die. Odd: you gain d8 temporary HP. Even: choose a creature — it gets +d8 on its next damage roll.",
    "tempHp": "d8"
   },
   {
    "roll": 8,
    "name": "Undead Bird",
    "text": "Undead Bird: It can speak with animals (dead or alive) for d6+SPIRIT rounds.",
    "duration": "d6+SPIRIT rounds"
   },
   {
    "roll": 9,
    "name": "Mermaid Scales",
    "text": "Mermaid Scales: Eat a scale: breathe underwater for d4 hours.",
    "duration": "d4 hours",
    "consumable": true
   },
   {
    "roll": 10,
    "name": "Charon's Obol",
    "text": "Charon's Obol: If you are killed, return to life the next round with 1 HP. Disappears after one use.",
    "singleUse": true,
    "cheatDeath": {
     "hp": 1
    }
   },
   {
    "roll": 11,
    "name": "Cup of the Carpenter",
    "text": "Cup of the Carpenter: Choose a creature to regain d6+SPIRIT HP.",
    "heal": "d6+SPIRIT"
   },
   {
    "roll": 12,
    "name": "Heart of the Sea",
    "text": "Heart of the Sea: Create or destroy 15 gallons of water or 30 cubic feet of fog."
   },
   {
    "roll": 13,
    "name": "Necklace of Eyeballs",
    "text": "Necklace of Eyeballs: Become invisible for d6+SPIRIT rounds or until you attack or take damage. Attack and defend with DR6.",
    "duration": "d6+SPIRIT rounds",
    "attackDR": 6,
    "defenseDR": 6
   },
   {
    "roll": 14,
    "name": "Crown of the Sunken Lord",
    "text": "Crown of the Sunken Lord: A water shield surrounds you: −d2 protection for d2+SPIRIT rounds (in addition to armor).",
    "duration": "d2+SPIRIT rounds",
    "extraArmor": "d2"
   },
   {
    "roll": 15,
    "name": "Crystalline Skull",
    "text": "Crystalline Skull: The skull can hear and repeat the thoughts of a nearby creature for d6+SPIRIT minutes.",
    "duration": "d6+SPIRIT minutes"
   },
   {
    "roll": 16,
    "name": "Codex Tablet",
    "text": "Codex Tablet: Read and understand any language, glyphs or runes for 1+SPIRIT rounds.",
    "duration": "1+SPIRIT rounds"
   },
   {
    "roll": 17,
    "name": "Skeleton Key",
    "text": "Skeleton Key: Open any door or lock. Crumbles after 1 use.",
    "singleUse": true
   },
   {
    "roll": 18,
    "name": "Mummified Monkey Head",
    "text": "Mummified Monkey Head: The head speaks: 1 creature tests SPIRIT DR12 or must obey a 1-word command.",
    "targetTest": {
     "ability": "SPIRIT",
     "dr": 12
    }
   },
   {
    "roll": 19,
    "name": "Great Old One Figurine",
    "text": "Great Old One Figurine: One human is terrorized for d4 rounds unless they succeed at a PRESENCE DR14 test. They can test each round.",
    "duration": "d4 rounds",
    "targetTest": {
     "ability": "PRESENCE",
     "dr": 14
    }
   },
   {
    "roll": 20,
    "name": "Broken Compass",
    "text": "Broken Compass: The compass points toward an object you know of for 1+SPIRIT rounds.",
    "duration": "1+SPIRIT rounds"
   }
  ]
 },
 "rituals": {
  "id": "rituals",
  "name": "Arcane Rituals",
  "die": "d20",
  "page": 64,
  "source": "Player's Guidebook",
  "note": "Every dawn roll d4 + SPIRIT for how many rituals you can cast that day. Use your action (or longer) and test SPIRIT DR12. Rituals almost always fail if the caster carries anything made of cold iron or touches metal. Brutes can't use rituals.",
  "modifiers": [
   {
    "id": "duress",
    "text": "Casting under duress",
    "dr": 2,
    "orMore": true
   },
   {
    "id": "minute",
    "text": "Take 1 minute to cast",
    "dr": -2
   },
   {
    "id": "hour",
    "text": "Take 1 hour to cast",
    "dr": -4
   },
   {
    "id": "together",
    "text": "Several casters working together: roll twice, keep the higher roll",
    "rollTwiceKeepHigh": true
   },
   {
    "id": "blood",
    "text": "Spend HP in blood",
    "drPerHp": -1
   }
  ],
  "rows": [
   {
    "roll": 1,
    "numeral": "I",
    "name": "Call of the Sea",
    "text": "Call of the Sea: d6 creatures can breathe underwater and swim 40' a round for d4+SPIRIT hours.",
    "targets": "d6",
    "duration": "d4+SPIRIT hours"
   },
   {
    "roll": 2,
    "numeral": "II",
    "name": "Curse of the Drowned",
    "text": "Curse of the Drowned: For d6 rounds a creature gets +4 to all DRs and is DR −4 to defend against.",
    "duration": "d6 rounds"
   },
   {
    "roll": 3,
    "numeral": "III",
    "name": "Dark Delusions",
    "text": "Dark Delusions: An illusion or vision of your design appears in the mind of any creatures you can see for d4+SPIRIT minutes.",
    "duration": "d4+SPIRIT minutes"
   },
   {
    "roll": 4,
    "numeral": "IV",
    "name": "Obfuscate Time",
    "text": "Obfuscate Time: d2 creatures recover 2d10+SPIRIT HP, but age 2d10 months.",
    "targets": "d2",
    "heal": "2d10+SPIRIT"
   },
   {
    "roll": 5,
    "numeral": "V",
    "name": "Eldritch Tentacles",
    "text": "Eldritch Tentacles: Tentacles appear and attack up to d6 creatures of your choice, dealing d6 damage each.",
    "targets": "d6",
    "damage": "d6"
   },
   {
    "roll": 6,
    "numeral": "VI",
    "name": "Heart Hex",
    "text": "Heart Hex: Raise one creature's reaction by one level (pg. 31). If it is already friendly, it falls in love with a creature of your choice for d4+SPIRIT days.",
    "duration": "d4+SPIRIT days"
   },
   {
    "roll": 7,
    "numeral": "VII",
    "name": "Thalassomancy",
    "text": "Thalassomancy: The lungs of d2+SPIRIT creatures fill with sea water: they suffocate for d4 rounds, losing d4 HP each round.",
    "targets": "d2+SPIRIT",
    "damage": "d4 per round for d4 rounds"
   },
   {
    "roll": 8,
    "numeral": "VIII",
    "name": "Light of a Thousand Stars",
    "text": "Light of a Thousand Stars: 30' of light radiates from an object for 2d12 hours and can't be extinguished. All attacks are −4 DR to hit / +4 to defend.",
    "duration": "2d12 hours"
   },
   {
    "roll": 9,
    "numeral": "IX",
    "name": "Return from the Locker",
    "text": "Return from the Locker: A recently killed creature returns to life with 1 HP, its lungs expelling black ichor and bilge water."
   },
   {
    "roll": 10,
    "numeral": "X",
    "name": "Mind Manacles",
    "text": "Mind Manacles: One creature you can see must obey your commands for d2+SPIRIT rounds.",
    "duration": "d2+SPIRIT rounds"
   },
   {
    "roll": 11,
    "numeral": "XI",
    "name": "Mists of Confusion",
    "text": "Mists of Confusion: d4+SPIRIT creatures each roll a new reaction (pg. 31).",
    "targets": "d4+SPIRIT"
   },
   {
    "roll": 12,
    "numeral": "XII",
    "name": "Divination",
    "text": "Divination: Ask the spirits or gods 3 yes-or-no questions."
   },
   {
    "roll": 13,
    "numeral": "XIII",
    "name": "Phantasmal Fauna",
    "text": "Phantasmal Fauna: Summon a ghostly hound or shark that obeys your commands and dissipates at sunset. HP 5, Morale –, ghostly form −d2, bite d6.",
    "summon": "phantasmal-fauna"
   },
   {
    "roll": 14,
    "numeral": "XIV",
    "name": "Release the Kraken",
    "text": "Release the Kraken: The Kraken appears in nearby waters."
   },
   {
    "roll": 15,
    "numeral": "XV",
    "name": "Reopen the Grave",
    "text": "Reopen the Grave: Summon d2+SPIRIT zombies or skeletons under your control.",
    "targets": "d2+SPIRIT"
   },
   {
    "roll": 16,
    "numeral": "XVI",
    "name": "Mermaid's Kiss",
    "text": "Mermaid's Kiss: A creature gains +1 to STRENGTH, AGILITY and TOUGHNESS for d4 days.",
    "duration": "d4 days",
    "abilityBonus": {
     "STRENGTH": 1,
     "AGILITY": 1,
     "TOUGHNESS": 1
    }
   },
   {
    "roll": 17,
    "numeral": "XVII",
    "name": "Spiritual Ward",
    "text": "Spiritual Ward: One creature gains −d4 protection for d2 days, in addition to armor.",
    "duration": "d2 days",
    "extraArmor": "d4"
   },
   {
    "roll": 18,
    "numeral": "XVIII",
    "name": "Summon the Ferryman",
    "text": "Summon the Ferryman: A human of your choice loses 3d8 HP. If you fail the cast, you or an ally loses the HP instead (don't roll a Mishap).",
    "damage": "3d8",
    "failureOverride": "you or an ally loses the HP instead; no mishap"
   },
   {
    "roll": 19,
    "numeral": "XIX",
    "name": "The Black Spot",
    "text": "The Black Spot: Name a human you have met. They must test DR12 or die within d8 days.",
    "targetTest": {
     "dr": 12
    }
   },
   {
    "roll": 20,
    "numeral": "XX",
    "name": "Weathercraft",
    "text": "Weathercraft: For the next d4 hours the weather obeys you: change the wind's direction and speed (all ships get ±1 speed) and start or stop rain, fog or thunderstorms.",
    "duration": "d4 hours"
   }
  ]
 },
 "mishaps": {
  "id": "mishaps",
  "name": "Mystical Mishaps",
  "die": "d20",
  "page": 66,
  "source": "Player's Guidebook",
  "note": "Rolled on a failed ritual. Text in the `hidden` field is something the caster might not immediately realize. If the same mishap is rolled twice, the caster's body slowly melts into sea water.",
  "rows": [
   {
    "roll": 1,
    "text": "Everything before you vanishes and you are alone on a gray island. A figure robed in black can be seen on a boat in the distance. Welcome to purgatory.",
    "hidden": "Welcome to purgatory."
   },
   {
    "roll": 2,
    "text": "Everyone within d20 feet vomits briny water and sea urchins (and loses 4 HP).",
    "damage": 4
   },
   {
    "roll": 3,
    "text": "A wraith appears — the ghost of an old captain. Roll reaction for it (pg. 31). It leaves after d6 rounds.",
    "hidden": "It leaves after d6 rounds."
   },
   {
    "roll": 4,
    "text": "You are possessed by an ancient, arcane spirit for d4 rounds. Roll reaction (pg. 31) to see how you react to others."
   },
   {
    "roll": 5,
    "text": "You go insane, convinced this world is a dream you must wake from. Test SPIRIT DR12 every dawn to see if you come to your senses."
   },
   {
    "roll": 6,
    "text": "Nothing happens… …until the Kraken appears in d6 days.",
    "hidden": "…until the Kraken appears in d6 days."
   },
   {
    "roll": 7,
    "text": "Gravity behaves as if everything within 30' is underwater… …for d8 minutes.",
    "hidden": "…for d8 minutes."
   },
   {
    "roll": 8,
    "text": "d12 BIRDS! They swarm you and all around. HP 2, Morale –, no armor, bite d2. They flee when half are defeated.",
    "hidden": "They flee when half are defeated.",
    "summon": "mishap-birds"
   },
   {
    "roll": 9,
    "text": "All metal within 30' becomes molten hot and glows red for 1 minute. Anyone touching metal after the first round is burned for d2 damage.",
    "hidden": "Anyone touching metal after the first round is burned for d2 damage."
   },
   {
    "roll": 10,
    "text": "Your vision permanently fills with water; the world looks submerged and obscured. PRESENCE tests involving sight are +4 DR from now on. Underwater you see like a fish.",
    "hidden": "Underwater you see like a fish."
   },
   {
    "roll": 11,
    "text": "The weather and time of day are immediately, completely different. You and everything within a 3-mile radius have traveled 4d12 hours into the future.",
    "hidden": "You and everything within a 3-mile radius have traveled 4d12 hours into the future."
   },
   {
    "roll": 12,
    "text": "Clouds darken, winds pick up and the temperature drops d10 × 10 degrees. A thunderstorm moves in.",
    "hidden": "A thunderstorm moves in."
   },
   {
    "roll": 13,
    "text": "A massive earthquake shakes the ground. At sea, tidal waves swell."
   },
   {
    "roll": 14,
    "text": "You've simply forgotten how to cast the ritual. You no longer know it — remove it from your sheet.",
    "hidden": "You no longer know it — remove it from your sheet.",
    "removeRitual": true
   },
   {
    "roll": 15,
    "text": "Eldritch voices whisper in your ears. Test SPIRIT DR12 or take d2 damage out of horror. If you pass, the next time you consider accessing the arcane you discover you know one random new ritual.",
    "hidden": "If you pass, the next time you consider accessing the arcane you discover you know one random new ritual."
   },
   {
    "roll": 16,
    "text": "The ritual succeeds, but in the worst way possible. GM decides: a different target, it goes off at the wrong time, you cast it on yourself, etc."
   },
   {
    "roll": 17,
    "text": "Your mind is lost at sea for what seems like 3d10 years, yet no time has passed. Others watch as you age 3d10 years in a matter of seconds.",
    "hidden": "Others watch as you age 3d10 years in a matter of seconds."
   },
   {
    "roll": 18,
    "text": "Hundreds of tiny crabs swarm you. They're harmless and provide an extra −d2 damage reduction (not armor). They leave after d6 days, but return every full moon.",
    "hidden": "They leave after d6 days, but return every full moon.",
    "extraArmor": "d2"
   },
   {
    "roll": 19,
    "text": "Everyone you can see recovers 3d6 HP… …including your enemies.",
    "hidden": "…including your enemies.",
    "heal": "3d6"
   },
   {
    "roll": 20,
    "text": "Time stops and you experience a moment of absolute cosmic understanding and bliss. When you regain your composure, time resumes, you have learned a new ritual of your choice and your SPIRIT is increased by +1.",
    "hidden": "When you regain your composure, time resumes, you have learned a new ritual of your choice and your SPIRIT is increased by +1.",
    "ability": {
     "SPIRIT": 1
    }
   }
  ]
 },
 "names": {
  "id": "names",
  "name": "Pirate Name Generator",
  "die": "d66",
  "page": 79,
  "corePage": 125,
  "source": "Player's Guidebook",
  "note": "Roll d66 × 4: a first name (either column), a surname and two nicknames. Mix and match to taste.",
  "columns": [
   {
    "die": "d66",
    "name": "Name (male)",
    "values": [
     "Esteban",
     "Richard",
     "Hendrik",
     "Raymond",
     "John",
     "Edmund",
     "Charles",
     "Peter",
     "Olivier",
     "Barth",
     "Henry",
     "Roger",
     "Don",
     "Martín",
     "Louis",
     "Fredrick",
     "Willem",
     "Nicholas",
     "Jerry",
     "Edward",
     "Alvaro",
     "Gaspar",
     "Francisco",
     "Johan",
     "Carlos",
     "Francis",
     "Jacques",
     "Jack",
     "François",
     "Silas",
     "Thomas",
     "Jacob",
     "Juan",
     "Philippe",
     "Jean",
     "William/Billy"
    ]
   },
   {
    "die": "d66",
    "name": "Name (female)",
    "values": [
     "Bridget",
     "Juliette",
     "Esther",
     "Rose",
     "Beatrice",
     "Olive",
     "Antonia",
     "Charlotte",
     "Isabel",
     "Adine",
     "Angela",
     "Cécile",
     "Edwidge",
     "Catalina",
     "Elizabeth",
     "Madeleine",
     "Anastasia",
     "Emma",
     "Mary",
     "Francisca",
     "Ana",
     "Agnes",
     "Marie",
     "Eleanor",
     "Anne",
     "Henrietta",
     "Alice",
     "Margaret",
     "Jeannette",
     "Camela",
     "Catherine",
     "Ursula",
     "Anette",
     "Gabriel",
     "Esme",
     "Marion"
    ]
   },
   {
    "die": "d66",
    "name": "Surname",
    "values": [
     "Pérez",
     "Thompson",
     "Jansen",
     "Williams",
     "Alva",
     "Dubois",
     "Leon",
     "Brown",
     "Jones",
     "Johnson",
     "Thatch",
     "Davies",
     "Archer",
     "Blanc",
     "Evans",
     "Wright",
     "Smith",
     "Wilson",
     "Bernard",
     "Roberts",
     "White",
     "Jean",
     "Santiago",
     "Morel",
     "Rodríguez",
     "Garcia",
     "Robinson",
     "López",
     "Baker",
     "Black",
     "Bonnet",
     "Walker",
     "Martin",
     "Jackson",
     "Diaz",
     "Taylor"
    ]
   },
   {
    "die": "d66",
    "name": "Nickname (roll ×2)",
    "values": [
     "Sir/Madam",
     "Sea",
     "Turtle",
     "Siren",
     "Red",
     "One-Eye/Arm/Leg",
     "Crimson",
     "Blue",
     "Water",
     "Skull",
     "Tall-Tale",
     "Old",
     "Blood",
     "Mr./Mrs./Miss",
     "Gunpowder",
     "King/Queen",
     "Bow-legged",
     "Fish",
     "Whale",
     "Bones",
     "Squid",
     "Scurvy",
     "Bilge",
     "Shark",
     "Heart",
     "The Bride/Groom",
     "Black",
     "White",
     "Death",
     "Dark",
     "Devil",
     "Knife",
     "Claw",
     "Rat",
     "Green",
     "Planktooth"
    ]
   }
  ],
  "rows": [
   {
    "roll": 11,
    "text": "Esteban / Bridget · Pérez · \"Sir/Madam\"",
    "male": "Esteban",
    "female": "Bridget",
    "surname": "Pérez",
    "nickname": "Sir/Madam"
   },
   {
    "roll": 12,
    "text": "Richard / Juliette · Thompson · \"Sea\"",
    "male": "Richard",
    "female": "Juliette",
    "surname": "Thompson",
    "nickname": "Sea"
   },
   {
    "roll": 13,
    "text": "Hendrik / Esther · Jansen · \"Turtle\"",
    "male": "Hendrik",
    "female": "Esther",
    "surname": "Jansen",
    "nickname": "Turtle"
   },
   {
    "roll": 14,
    "text": "Raymond / Rose · Williams · \"Siren\"",
    "male": "Raymond",
    "female": "Rose",
    "surname": "Williams",
    "nickname": "Siren"
   },
   {
    "roll": 15,
    "text": "John / Beatrice · Alva · \"Red\"",
    "male": "John",
    "female": "Beatrice",
    "surname": "Alva",
    "nickname": "Red"
   },
   {
    "roll": 16,
    "text": "Edmund / Olive · Dubois · \"One-Eye/Arm/Leg\"",
    "male": "Edmund",
    "female": "Olive",
    "surname": "Dubois",
    "nickname": "One-Eye/Arm/Leg"
   },
   {
    "roll": 21,
    "text": "Charles / Antonia · Leon · \"Crimson\"",
    "male": "Charles",
    "female": "Antonia",
    "surname": "Leon",
    "nickname": "Crimson"
   },
   {
    "roll": 22,
    "text": "Peter / Charlotte · Brown · \"Blue\"",
    "male": "Peter",
    "female": "Charlotte",
    "surname": "Brown",
    "nickname": "Blue"
   },
   {
    "roll": 23,
    "text": "Olivier / Isabel · Jones · \"Water\"",
    "male": "Olivier",
    "female": "Isabel",
    "surname": "Jones",
    "nickname": "Water"
   },
   {
    "roll": 24,
    "text": "Barth / Adine · Johnson · \"Skull\"",
    "male": "Barth",
    "female": "Adine",
    "surname": "Johnson",
    "nickname": "Skull"
   },
   {
    "roll": 25,
    "text": "Henry / Angela · Thatch · \"Tall-Tale\"",
    "male": "Henry",
    "female": "Angela",
    "surname": "Thatch",
    "nickname": "Tall-Tale"
   },
   {
    "roll": 26,
    "text": "Roger / Cécile · Davies · \"Old\"",
    "male": "Roger",
    "female": "Cécile",
    "surname": "Davies",
    "nickname": "Old"
   },
   {
    "roll": 31,
    "text": "Don / Edwidge · Archer · \"Blood\"",
    "male": "Don",
    "female": "Edwidge",
    "surname": "Archer",
    "nickname": "Blood"
   },
   {
    "roll": 32,
    "text": "Martín / Catalina · Blanc · \"Mr./Mrs./Miss\"",
    "male": "Martín",
    "female": "Catalina",
    "surname": "Blanc",
    "nickname": "Mr./Mrs./Miss"
   },
   {
    "roll": 33,
    "text": "Louis / Elizabeth · Evans · \"Gunpowder\"",
    "male": "Louis",
    "female": "Elizabeth",
    "surname": "Evans",
    "nickname": "Gunpowder"
   },
   {
    "roll": 34,
    "text": "Fredrick / Madeleine · Wright · \"King/Queen\"",
    "male": "Fredrick",
    "female": "Madeleine",
    "surname": "Wright",
    "nickname": "King/Queen"
   },
   {
    "roll": 35,
    "text": "Willem / Anastasia · Smith · \"Bow-legged\"",
    "male": "Willem",
    "female": "Anastasia",
    "surname": "Smith",
    "nickname": "Bow-legged"
   },
   {
    "roll": 36,
    "text": "Nicholas / Emma · Wilson · \"Fish\"",
    "male": "Nicholas",
    "female": "Emma",
    "surname": "Wilson",
    "nickname": "Fish"
   },
   {
    "roll": 41,
    "text": "Jerry / Mary · Bernard · \"Whale\"",
    "male": "Jerry",
    "female": "Mary",
    "surname": "Bernard",
    "nickname": "Whale"
   },
   {
    "roll": 42,
    "text": "Edward / Francisca · Roberts · \"Bones\"",
    "male": "Edward",
    "female": "Francisca",
    "surname": "Roberts",
    "nickname": "Bones"
   },
   {
    "roll": 43,
    "text": "Alvaro / Ana · White · \"Squid\"",
    "male": "Alvaro",
    "female": "Ana",
    "surname": "White",
    "nickname": "Squid"
   },
   {
    "roll": 44,
    "text": "Gaspar / Agnes · Jean · \"Scurvy\"",
    "male": "Gaspar",
    "female": "Agnes",
    "surname": "Jean",
    "nickname": "Scurvy"
   },
   {
    "roll": 45,
    "text": "Francisco / Marie · Santiago · \"Bilge\"",
    "male": "Francisco",
    "female": "Marie",
    "surname": "Santiago",
    "nickname": "Bilge"
   },
   {
    "roll": 46,
    "text": "Johan / Eleanor · Morel · \"Shark\"",
    "male": "Johan",
    "female": "Eleanor",
    "surname": "Morel",
    "nickname": "Shark"
   },
   {
    "roll": 51,
    "text": "Carlos / Anne · Rodríguez · \"Heart\"",
    "male": "Carlos",
    "female": "Anne",
    "surname": "Rodríguez",
    "nickname": "Heart"
   },
   {
    "roll": 52,
    "text": "Francis / Henrietta · Garcia · \"The Bride/Groom\"",
    "male": "Francis",
    "female": "Henrietta",
    "surname": "Garcia",
    "nickname": "The Bride/Groom"
   },
   {
    "roll": 53,
    "text": "Jacques / Alice · Robinson · \"Black\"",
    "male": "Jacques",
    "female": "Alice",
    "surname": "Robinson",
    "nickname": "Black"
   },
   {
    "roll": 54,
    "text": "Jack / Margaret · López · \"White\"",
    "male": "Jack",
    "female": "Margaret",
    "surname": "López",
    "nickname": "White"
   },
   {
    "roll": 55,
    "text": "François / Jeannette · Baker · \"Death\"",
    "male": "François",
    "female": "Jeannette",
    "surname": "Baker",
    "nickname": "Death"
   },
   {
    "roll": 56,
    "text": "Silas / Camela · Black · \"Dark\"",
    "male": "Silas",
    "female": "Camela",
    "surname": "Black",
    "nickname": "Dark"
   },
   {
    "roll": 61,
    "text": "Thomas / Catherine · Bonnet · \"Devil\"",
    "male": "Thomas",
    "female": "Catherine",
    "surname": "Bonnet",
    "nickname": "Devil"
   },
   {
    "roll": 62,
    "text": "Jacob / Ursula · Walker · \"Knife\"",
    "male": "Jacob",
    "female": "Ursula",
    "surname": "Walker",
    "nickname": "Knife"
   },
   {
    "roll": 63,
    "text": "Juan / Anette · Martin · \"Claw\"",
    "male": "Juan",
    "female": "Anette",
    "surname": "Martin",
    "nickname": "Claw"
   },
   {
    "roll": 64,
    "text": "Philippe / Gabriel · Jackson · \"Rat\"",
    "male": "Philippe",
    "female": "Gabriel",
    "surname": "Jackson",
    "nickname": "Rat"
   },
   {
    "roll": 65,
    "text": "Jean / Esme · Diaz · \"Green\"",
    "male": "Jean",
    "female": "Esme",
    "surname": "Diaz",
    "nickname": "Green"
   },
   {
    "roll": 66,
    "text": "William/Billy / Marion · Taylor · \"Planktooth\"",
    "male": "William/Billy",
    "female": "Marion",
    "surname": "Taylor",
    "nickname": "Planktooth"
   }
  ]
 },
 "derelict": {
  "id": "derelict",
  "name": "Derelict Takes More Damage",
  "die": "d8",
  "page": 74,
  "source": "Player's Guidebook",
  "note": "A ship at zero HP or less is derelict: speed 0, no crew actions in combat. Roll whenever it takes more damage.",
  "rows": [
   {
    "roll": [
     1,
     2
    ],
    "text": "No effect."
   },
   {
    "roll": 3,
    "text": "Sinks in d2 rounds.",
    "sinks": "d2 rounds"
   },
   {
    "roll": 4,
    "text": "Sinks next round.",
    "sinks": "next round"
   },
   {
    "roll": 5,
    "text": "Sinks now.",
    "sinks": "now"
   },
   {
    "roll": 6,
    "text": "Minor explosion: all aboard test AGILITY DR12 or take d6 damage.",
    "test": {
     "ability": "AGILITY",
     "dr": 12
    },
    "damage": "d6"
   },
   {
    "roll": 7,
    "text": "Major explosion: the ship sinks and all aboard take d8 damage.",
    "sinks": "now",
    "damage": "d8"
   },
   {
    "roll": 8,
    "text": "Magazine explosion: instant death to all aboard.",
    "sinks": "now",
    "death": true
   }
  ]
 },
 "windDirection": {
  "id": "windDirection",
  "name": "Wind Direction",
  "die": "d6",
  "page": 78,
  "source": "Player's Guidebook",
  "note": "At the start of naval combat roll d6 for the hex edge the wind is coming from. A ship's point of sail is set at the start of its turn and doesn't change during its movement.",
  "columns": [
   {
    "die": "d6",
    "name": "Flat-top hexes",
    "values": [
     "N",
     "NE",
     "SE",
     "S",
     "SW",
     "NW"
    ]
   },
   {
    "die": "d6",
    "name": "Pointed-top hexes",
    "values": [
     "NE",
     "E",
     "SE",
     "SW",
     "W",
     "NW"
    ]
   }
  ],
  "rows": [
   {
    "roll": 1,
    "text": "N (flat) / NE (pointed)"
   },
   {
    "roll": 2,
    "text": "NE (flat) / E (pointed)"
   },
   {
    "roll": 3,
    "text": "SE (flat) / SE (pointed)"
   },
   {
    "roll": 4,
    "text": "S (flat) / SW (pointed)"
   },
   {
    "roll": 5,
    "text": "SW (flat) / W (pointed)"
   },
   {
    "roll": 6,
    "text": "NW (flat) / NW (pointed)"
   }
  ]
 },
 "changingWinds": {
  "id": "changingWinds",
  "name": "Changing Winds",
  "die": "2d6",
  "page": 78,
  "source": "Player's Guidebook",
  "note": "Roll when thematic, when Weathercraft is in use, or randomly.",
  "rows": [
   {
    "roll": 2,
    "name": "Becalmed",
    "text": "Becalmed: All ships speed 0.",
    "speed": "zero"
   },
   {
    "roll": 3,
    "name": "Fog",
    "text": "Fog: All weapon ranges are reduced to 6 hexes.",
    "range": 6
   },
   {
    "roll": [
     4,
     5
    ],
    "name": "Calm",
    "text": "Calm: Decrease all max speeds by 1.",
    "speedMod": -1
   },
   {
    "roll": [
     6,
     8
    ],
    "name": "Fair",
    "text": "Fair: Normal wind speed."
   },
   {
    "roll": [
     9,
     10
    ],
    "name": "Heavy",
    "text": "Heavy: Increase all max speeds by 1.",
    "speedMod": 1
   },
   {
    "roll": 11,
    "name": "Changing Winds",
    "text": "Changing Winds: Reroll the wind direction.",
    "rerollDirection": true
   },
   {
    "roll": 12,
    "name": "Storm",
    "text": "Storm: Reroll the wind direction each round. On a repeated result, all ships lose d6 HP (no hull protection).",
    "rerollDirection": "each round",
    "damage": "d6"
   }
  ]
 },
 "foulWeather": {
  "id": "foulWeather",
  "name": "Foul Weather",
  "die": "2d6",
  "page": 78,
  "source": "Player's Guidebook",
  "rows": [
   {
    "roll": 2,
    "text": "Deep cold, well below the line."
   },
   {
    "roll": 3,
    "text": "Nauseating, green mist."
   },
   {
    "roll": 4,
    "text": "Thick, low-lying fog."
   },
   {
    "roll": 5,
    "text": "Oppressively overcast."
   },
   {
    "roll": 6,
    "text": "Hellfire, sweltering sunlight."
   },
   {
    "roll": 7,
    "text": "Gentle breeze, smell of decay."
   },
   {
    "roll": 8,
    "text": "Calm before the storm."
   },
   {
    "roll": 9,
    "text": "Soft, cold rain."
   },
   {
    "roll": 10,
    "text": "Frigid trade winds."
   },
   {
    "roll": 11,
    "text": "Torrential downpours."
   },
   {
    "roll": 12,
    "text": "Catastrophic tempest."
   }
  ]
 },
 "shanties": {
  "id": "shanties",
  "name": "Sea Shanties",
  "die": "d12",
  "page": 68,
  "source": "Player's Guidebook",
  "note": "Each day the crew can sing 1 ± the Captain's SPIRIT shanties; test CREW SKILL DR12.",
  "rows": [
   {
    "roll": 1,
    "name": "Fifteen Men on a Dead Man's Chest",
    "text": "Fifteen Men on a Dead Man's Chest: The ship gains d2 Devil's Luck that it can use like a PC.",
    "shipLuck": "d2"
   },
   {
    "roll": 2,
    "name": "Dead Horse",
    "text": "Dead Horse: The ship recovers d10 HP and any misfired cannons are repaired.",
    "heal": "d10"
   },
   {
    "roll": 3,
    "name": "Spanish Ladies",
    "text": "Spanish Ladies: The ship can't get lost today."
   },
   {
    "roll": 4,
    "name": "Leave Her Johnny",
    "text": "Leave Her Johnny: Reroll Changing Winds (pg. 78)."
   },
   {
    "roll": 5,
    "name": "Blow the Man Down",
    "text": "Blow the Man Down: The ship is +2 DR to hit until the end of combat."
   },
   {
    "roll": 6,
    "name": "Drunken Sailor",
    "text": "Drunken Sailor: One ship's crew skill is −4 for d6 rounds.",
    "duration": "d6 rounds"
   },
   {
    "roll": 7,
    "name": "Fish in the Sea",
    "text": "Fish in the Sea: Choose a direction: the wind blows that way for d4 hours.",
    "duration": "d4 hours"
   },
   {
    "roll": 8,
    "name": "Captain Kidd",
    "text": "Captain Kidd: Attacks from this ship are DR −2 for d6 rounds.",
    "duration": "d6 rounds"
   },
   {
    "roll": 9,
    "name": "A Drop of Nelson's Blood",
    "text": "A Drop of Nelson's Blood: Increase the ship's speed by 1 for d8 hours.",
    "duration": "d8 hours"
   },
   {
    "roll": 10,
    "name": "All For Me Grog",
    "text": "All For Me Grog: Raise the ship's morale by 2. The crew can't mutiny today."
   },
   {
    "roll": 11,
    "name": "Fire Down Below",
    "text": "Fire Down Below: Extinguish all fires on the ship and repair d6 HP.",
    "heal": "d6"
   },
   {
    "roll": 12,
    "name": "Down Among the Dead Men",
    "text": "Down Among the Dead Men: Dark waves crash against another ship: move it 1 hex (1\") in any direction and it loses d8 HP.",
    "damage": "d8"
   }
  ]
 },
 "maritimeEvents": {
  "id": "maritimeEvents",
  "name": "Maritime Events & Encounters",
  "die": "d12",
  "page": 36,
  "source": "Trapped in the Tropics",
  "note": "When to roll (pick one): one event per leg of the journey; 2-in-6 per 50-mile hex traveled; 2-in-6 per 4-hour watch; or just when something should happen. The GM decides details and outcomes.",
  "rows": [
   {
    "roll": 1,
    "name": "Massive storm",
    "text": "Massive storm: man overboard, hull or sails damaged, shipwreck, or thrown off course."
   },
   {
    "roll": 2,
    "name": "Fog or becalmed",
    "text": "Fog or becalmed: a day of travel is lost at sea. Run aground. Uneasy crew."
   },
   {
    "roll": 3,
    "name": "Short on supplies",
    "text": "Short on supplies: food, water or rum stores are spent or sabotaged. Lower morale, hunger, starvation, a risky stop to resupply."
   },
   {
    "roll": 4,
    "name": "Rocks/shoals/reef",
    "text": "Rocks, shoals or reef: emergency repairs required. Ship HP loss. Time wasted."
   },
   {
    "roll": 5,
    "name": "Crew infighting",
    "text": "Crew infighting: a gambling dispute, love triangle, or rum/grog/ASH leads to an argument, violence and/or lower morale."
   },
   {
    "roll": 6,
    "name": "Merchant ship",
    "text": "Merchant ship: a fluyt bound for port.",
    "ship": "fluyt"
   },
   {
    "roll": 7,
    "name": "Backstory event",
    "text": "Backstory event: something tied to one PC's backstory — a complication needing their Background, an NPC with news of their Unfortunate Incident, their Thing of Importance becoming relevant, or a dream or premonition."
   },
   {
    "roll": 8,
    "name": "Antediluvian crustacean",
    "text": "Antediluvian crustacean: it climbs aboard; gemstones are embedded in its shell (HP 50, Morale 6, Thick Shell −d4, Claws d10 & d6).",
    "monster": "antediluvian-crustacean"
   },
   {
    "roll": 9,
    "name": "French aristocrats",
    "text": "French aristocrats in a fancy fluyt: well armed, but flying a blue and yellow signal flag to show they want to communicate (in the adventure, to buy ASH).",
    "ship": "fluyt"
   },
   {
    "roll": 10,
    "name": "Flotilla of zombies",
    "text": "Flotilla of zombies: some are recognizable as recently deceased PCs or NPCs."
   },
   {
    "roll": 11,
    "name": "Privateers",
    "text": "West India Co. privateers in a sloop, looking to plunder Spanish or French ships — but they'll settle for pirate bounty hunting.",
    "ship": "sloop"
   },
   {
    "roll": 12,
    "name": "Another pirate crew",
    "text": "Another pirate crew in an old sloop. Who are they? What do they want? Roll reaction if needed.",
    "ship": "sloop"
   }
  ]
 },
 "plunder": {
  "id": "plunder",
  "name": "Plunder (cargo)",
  "die": "d12",
  "page": 36,
  "source": "Trapped in the Tropics",
  "note": "Roll (or pick) for each cargo slot. Values are only suggestions.",
  "rows": [
   {
    "roll": 1,
    "text": "Empty"
   },
   {
    "roll": 2,
    "text": "Empty"
   },
   {
    "roll": 3,
    "text": "Empty"
   },
   {
    "roll": 4,
    "text": "Crops, food, or spices (d4 × 100s)",
    "value": "d4 × 100s"
   },
   {
    "roll": 5,
    "text": "Livestock (d4 × 100s)",
    "value": "d4 × 100s"
   },
   {
    "roll": 6,
    "text": "Rum, grog, or wine (d2 × 1,000s)",
    "value": "d2 × 1,000s"
   },
   {
    "roll": 7,
    "text": "Lumber (d4 × 1,000s)",
    "value": "d4 × 1,000s"
   },
   {
    "roll": 8,
    "text": "Sugar or tobacco (d4 × 1,000s)",
    "value": "d4 × 1,000s"
   },
   {
    "roll": 9,
    "text": "Munitions (d4 × 1,000s)",
    "value": "d4 × 1,000s"
   },
   {
    "roll": 10,
    "text": "Treasure (d6 × 1,000s)",
    "value": "d6 × 1,000s"
   },
   {
    "roll": 11,
    "text": "Treasure (d8 × 1,000s)",
    "value": "d8 × 1,000s"
   },
   {
    "roll": 12,
    "text": "Artifacts or VIPs (d10 × 1,000s)",
    "value": "d10 × 1,000s"
   }
  ]
 },
 "zombieAppearance": {
  "id": "zombieAppearance",
  "name": "Zombie Appearance",
  "die": "d6",
  "page": 26,
  "source": "Trapped in the Tropics",
  "note": "See pg. 52 of the Guidebook for clothing and armor details.",
  "rows": [
   {
    "roll": 1,
    "text": "Pirate or sailor (or a recently deceased PC), dead for d6 days, in rags."
   },
   {
    "roll": 2,
    "text": "Monk or nun, dead for d6 years."
   },
   {
    "roll": 3,
    "text": "Conquistador, dead for d6 years, wearing a morion or conquistador plate."
   },
   {
    "roll": 4,
    "text": "Redcoat soldier, dead for d6 months, in an old uniform."
   },
   {
    "roll": 5,
    "text": "European merchant, dead for d6 months, wearing fancy clothes or a hat."
   },
   {
    "roll": 6,
    "text": "Mesoan warrior or North American indigenous explorer, mummified skin."
   }
  ]
 },
 "traps": {
  "id": "traps",
  "name": "It's a Trap!",
  "die": "d12",
  "page": 58,
  "source": "Trapped in the Tropics",
  "note": "Roll 1d12 (fast), 5d12 across the trap, bait, trigger, state and complication tables (random), or pick. Adapt results so they make sense; some traps have their trigger built in.",
  "rows": [
   {
    "roll": 1,
    "name": "Bear trap",
    "text": "Spring-loaded metal bear trap, chained to a tree or staked down. AGILITY DR12 or d6 damage and the foot is trapped (likely permanently gnarled); 1-in-6 chance the main weapon is destroyed.",
    "test": {
     "ability": "AGILITY",
     "dr": 12
    },
    "damage": "d6"
   },
   {
    "roll": 2,
    "name": "Cargo net",
    "text": "Cargo net camouflaged on the ground, rigged to a pulley and a spring-pole tree. No damage, but can trap up to 8 targets in the air."
   },
   {
    "roll": 3,
    "name": "Sailcloth & rocks",
    "text": "Sailcloth weighted with 8 sandbags drops from the canopy when triggered, covering up to 6 targets; then d6 rocks fall from higher up, d4 damage each (TOUGHNESS DR12 to avoid each rock).",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 12
    },
    "damage": "d4 per rock"
   },
   {
    "roll": 4,
    "name": "Swinging mass",
    "text": "An old anchor (1 target, d10), a large cannon (2 targets, d6 each) or a ship's mast (4 targets, d4 each) smashes into the triggered area. AGILITY DR10 to avoid.",
    "test": {
     "ability": "AGILITY",
     "dr": 10
    }
   },
   {
    "roll": 5,
    "name": "Pit trap",
    "text": "Pit covered with twigs, leaves, mud, fronds or grass. Deep (TOUGHNESS DR12 or d8 damage) or lined with wooden spikes (AGILITY DR10 or 3d4 damage)."
   },
   {
    "roll": 6,
    "name": "Falling cage",
    "text": "A heavy cage of bamboo, vines and stones, big enough for 4 people, drops from above when triggered."
   },
   {
    "roll": 7,
    "name": "Buried brig cell",
    "text": "A ship's brig cell buried in the dirt with a spring-loaded door that slams shut when triggered; the target may fall in or be shoved in by the door."
   },
   {
    "roll": 8,
    "name": "Guillotine",
    "text": "A guillotine blade on old vines swings at neck height when triggered. AGILITY DR12 or d6 damage and a nasty facial scar; fail by more than 4 and the target is decapitated.",
    "test": {
     "ability": "AGILITY",
     "dr": 12
    },
    "damage": "d6"
   },
   {
    "roll": 9,
    "name": "Collapsing walkway",
    "text": "A gangplank or rope bridge leads to the bait; the last section gives way and dumps the target into a deep pit, large barrel, or a cage that springs shut and locks."
   },
   {
    "roll": 10,
    "name": "Blunderbuss",
    "text": "A blunderbuss aimed at the trigger area fires via a pull string: d10 damage within 5', d4 within 10'; 2-in-6 a random inventory item is damaged."
   },
   {
    "roll": 11,
    "name": "Nail mine",
    "text": "An old pistol's flintlock ignites a gunpowder mine of nails, forks and glass: d4 damage to all within 20', 1-in-6 chance of losing an eye.",
    "damage": "d4"
   },
   {
    "roll": 12,
    "name": "Snare",
    "text": "A noose or foot snare lifts the target 20' up. Neck: TOUGHNESS DR8 or die of a broken neck, then use the holding-breath rules. Foot: TOUGHNESS DR8 or the ankle breaks. Either way they're stuck in the air.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 8
    }
   }
  ]
 },
 "trapDetails": {
  "id": "trapDetails",
  "name": "Trap Bait, Trigger, State & Complication",
  "die": "d12",
  "page": 59,
  "source": "Trapped in the Tropics",
  "note": "Roll d12 on each column (or pick) to dress a trap.",
  "columns": [
   {
    "die": "d12",
    "name": "Bait",
    "values": [
     "A human head on a spike.",
     "A wood plank covered in pig brains.",
     "A human silhouette painted on an old door.",
     "A cowbell rigged to a sail; it rings with the wind.",
     "A small, fancy chest atop a pile of rocks.",
     "A scarecrow dressed like a pirate.",
     "None — trap hidden under leaves and brush.",
     "None — trap hidden among rocks.",
     "None, but the trap is hard to see.",
     "None, and the trap is easy to see in daylight.",
     "A live human captive in a locked gibbet cage.",
     "A pirate (alive), acting like a captive, in an unlocked gibbet cage."
    ]
   },
   {
    "die": "d12",
    "name": "Trigger",
    "values": [
     "Tied directly to the bait; triggers when taken.",
     "Thread tripwire; triggers by breaking.",
     "Counterweight held by stones; triggers when displaced.",
     "Taut rope tripwire that blends in with the ground.",
     "Loose vine tripwire; triggers if pulled too far.",
     "Metal tripwire, hard to see.",
     "Large, flat stone pressure plate.",
     "Stepping-stone-sized pressure plate.",
     "Barrel-lid pressure plate.",
     "Wood plank seesaw, end tied to the trap.",
     "Fallen-tree seesaw, end tied to a counterweight.",
     "Spring-loaded metal mechanism."
    ]
   },
   {
    "die": "d12",
    "name": "State",
    "values": [
     "Sprung, zombie inside/nearby.",
     "Sprung, lots of (zombie) body parts.",
     "Sprung, human inside or nearby (alive but wounded).",
     "Sprung, goat or boar screaming.",
     "Broken.",
     "Set but appears sprung; skeleton inside/nearby.",
     "Set, terribly: 5-in-6 chance it won't fire.",
     "Set, poorly: 3-in-6 chance it won't fire.",
     "Set, ready to fire.",
     "Set, ready to fire.",
     "Set, ready to fire.",
     "Set, expertly rigged: deals double damage."
    ]
   },
   {
    "die": "d12",
    "name": "Complication",
    "values": [
     "Rigged alarm: a loud ship's bell.",
     "Rigged alarm: pots and pans clang.",
     "Rigged alarm: pokes a loud rooster.",
     "Rigged alarm: fires a firework out of a musket.",
     "Also dumps a barrel of tar on the target.",
     "Watched by a conniving parrot sentry.",
     "Triggered by an elaborate chain reaction.",
     "It's a decoy for the real trap just ahead.",
     "The trap maker's corpse is here.",
     "The trap fires 10' behind the trigger.",
     "So obvious no one living could fall for it.",
     "Bright paint explodes onto the target, making them easy to track."
    ]
   }
  ]
 },
 "carousing": {
  "id": "carousing",
  "name": "Carousing",
  "die": "d20",
  "dice": "4d20",
  "page": 2,
  "source": "Core Rules",
  "note": "Roll 4d20 (or 1d20 and read across). You are hungover for the lowest die in hours. Add the dice together: 4-49 is how much silver you spent or lost; 50+ is how much you won or stole. Read each die on its own column: Last night you… [who?] — You wake up… — and now you are…",
  "hangover": "lowest die in hours",
  "silver": {
   "spentBelow": 50,
   "text": "4-49 spent/lost in silver, 50+ won/stole in silver"
  },
  "columns": [
   {
    "die": "d20",
    "name": "Last night you…",
    "values": [
     "??? (you don't remember)",
     "got lucky with",
     "went swimming with",
     "made enemies with",
     "did some ASH with",
     "got in a fight with",
     "started a riot with",
     "stole from",
     "had a debate with",
     "became friends with",
     "played cards with",
     "spent the night with",
     "gambled with",
     "got drunk with",
     "fell in love with",
     "had a run-in with",
     "killed",
     "married",
     "saw the sunrise with",
     "had dinner with"
    ]
   },
   {
    "die": "d20",
    "name": "[who?]",
    "values": [
     "??? (you don't know).",
     "an enemy.",
     "a pig.",
     "a stranger.",
     "a crewmate.",
     "a monkey.",
     "a priest.",
     "your crew.",
     "a ghost.",
     "a skeleton.",
     "a barmaid/barkeep.",
     "some wenches.",
     "some soldiers.",
     "yourself.",
     "a beautiful person.",
     "the Devil.",
     "the captain.",
     "a VIP.",
     "a parrot.",
     "a VIP's adult progeny."
    ]
   },
   {
    "die": "d20",
    "name": "You wake up…",
    "values": [
     "??? (you're blind/it's dark)",
     "tied to a spit over a fire",
     "in your bunk or cabin",
     "in a gibbet cage",
     "in the hold of a ship",
     "deep in the jungle",
     "tied to a stake",
     "swinging from a mast",
     "in a dark cave",
     "in a coffin",
     "with a noose around your neck",
     "in a brothel or tavern",
     "locked in a cell",
     "on a tavern floor",
     "on the beach",
     "naked in the street",
     "in a captain's cabin",
     "in a church",
     "floating in water",
     "in a mansion"
    ]
   },
   {
    "die": "d20",
    "name": "and now you are…",
    "values": [
     "??? (confused).",
     "dead or dying.",
     "missing a limb.",
     "terrible (-1 to all stats).",
     "haggard (only d4 HP left).",
     "missing a digit or eye.",
     "on a wanted poster.",
     "in debt (3d10 x10 silver).",
     "haunted.",
     "really sad.",
     "ravenously hungry.",
     "soon to be a parent.",
     "in pain from a new tattoo.",
     "a year older.",
     "in love.",
     "rich (3d10 x 10 silver).",
     "the Captain now.",
     "the owner of a ship.",
     "amazing (gain experience).",
     "filthy rich (+1k silver)."
    ]
   }
  ],
  "rows": [
   {
    "roll": 1,
    "text": "??? (you don't remember) · ??? (you don't know). · ??? (you're blind/it's dark) · ??? (confused)."
   },
   {
    "roll": 2,
    "text": "got lucky with · an enemy. · tied to a spit over a fire · dead or dying."
   },
   {
    "roll": 3,
    "text": "went swimming with · a pig. · in your bunk or cabin · missing a limb."
   },
   {
    "roll": 4,
    "text": "made enemies with · a stranger. · in a gibbet cage · terrible (-1 to all stats)."
   },
   {
    "roll": 5,
    "text": "did some ASH with · a crewmate. · in the hold of a ship · haggard (only d4 HP left)."
   },
   {
    "roll": 6,
    "text": "got in a fight with · a monkey. · deep in the jungle · missing a digit or eye."
   },
   {
    "roll": 7,
    "text": "started a riot with · a priest. · tied to a stake · on a wanted poster."
   },
   {
    "roll": 8,
    "text": "stole from · your crew. · swinging from a mast · in debt (3d10 x10 silver)."
   },
   {
    "roll": 9,
    "text": "had a debate with · a ghost. · in a dark cave · haunted."
   },
   {
    "roll": 10,
    "text": "became friends with · a skeleton. · in a coffin · really sad."
   },
   {
    "roll": 11,
    "text": "played cards with · a barmaid/barkeep. · with a noose around your neck · ravenously hungry."
   },
   {
    "roll": 12,
    "text": "spent the night with · some wenches. · in a brothel or tavern · soon to be a parent."
   },
   {
    "roll": 13,
    "text": "gambled with · some soldiers. · locked in a cell · in pain from a new tattoo."
   },
   {
    "roll": 14,
    "text": "got drunk with · yourself. · on a tavern floor · a year older."
   },
   {
    "roll": 15,
    "text": "fell in love with · a beautiful person. · on the beach · in love."
   },
   {
    "roll": 16,
    "text": "had a run-in with · the Devil. · naked in the street · rich (3d10 x 10 silver)."
   },
   {
    "roll": 17,
    "text": "killed · the captain. · in a captain's cabin · the Captain now."
   },
   {
    "roll": 18,
    "text": "married · a VIP. · in a church · the owner of a ship."
   },
   {
    "roll": 19,
    "text": "saw the sunrise with · a parrot. · floating in water · amazing (gain experience)."
   },
   {
    "roll": 20,
    "text": "had dinner with · a VIP's adult progeny. · in a mansion · filthy rich (+1k silver)."
   }
  ],
  "group": "Carousing & Taverns"
 },
 "namesD12": {
  "id": "namesD12",
  "name": "What's in a Name?",
  "die": "d12",
  "page": 2,
  "source": "Core Rules",
  "note": "Quick names: roll d12 on any column.",
  "columns": [
   {
    "die": "d12",
    "name": "Name",
    "values": [
     "Ed(mund)",
     "Roger(s)",
     "Jack",
     "David",
     "Pete(r)",
     "Angelica",
     "Sam(uel)",
     "Morgan",
     "Diego",
     "Ed(ward)",
     "Isabel(la)",
     "Charles"
    ]
   },
   {
    "die": "d12",
    "name": "Name",
    "values": [
     "James",
     "Chris(topher)",
     "Robert(s)",
     "Francois",
     "Juan",
     "John(athan)",
     "Butch(er)",
     "(Old) Ben",
     "Will(iam)",
     "Louis",
     "Jean",
     "Stede"
    ]
   },
   {
    "die": "d12",
    "name": "Name",
    "values": [
     "Meathook",
     "Jose",
     "Fernando",
     "Henry",
     "Mary",
     "Anne",
     "Philip",
     "Scraggs",
     "Eliza(beth)",
     "Hector",
     "Genny",
     "Thom(as)"
    ]
   }
  ],
  "rows": [
   {
    "roll": 1,
    "text": "Ed(mund) / James / Meathook"
   },
   {
    "roll": 2,
    "text": "Roger(s) / Chris(topher) / Jose"
   },
   {
    "roll": 3,
    "text": "Jack / Robert(s) / Fernando"
   },
   {
    "roll": 4,
    "text": "David / Francois / Henry"
   },
   {
    "roll": 5,
    "text": "Pete(r) / Juan / Mary"
   },
   {
    "roll": 6,
    "text": "Angelica / John(athan) / Anne"
   },
   {
    "roll": 7,
    "text": "Sam(uel) / Butch(er) / Philip"
   },
   {
    "roll": 8,
    "text": "Morgan / (Old) Ben / Scraggs"
   },
   {
    "roll": 9,
    "text": "Diego / Will(iam) / Eliza(beth)"
   },
   {
    "roll": 10,
    "text": "Ed(ward) / Louis / Hector"
   },
   {
    "roll": 11,
    "text": "Isabel(la) / Jean / Genny"
   },
   {
    "roll": 12,
    "text": "Charles / Stede / Thom(as)"
   }
  ],
  "group": "Names"
 },
 "npcMotivation": {
  "id": "npcMotivation",
  "name": "NPC Motivation",
  "die": "d20",
  "page": 3,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "escape"
   },
   {
    "roll": 2,
    "text": "happiness"
   },
   {
    "roll": 3,
    "text": "recovery"
   },
   {
    "roll": 4,
    "text": "pleasure"
   },
   {
    "roll": 5,
    "text": "exploration"
   },
   {
    "roll": 6,
    "text": "love or sex"
   },
   {
    "roll": 7,
    "text": "revenge"
   },
   {
    "roll": 8,
    "text": "fear"
   },
   {
    "roll": 9,
    "text": "wealth"
   },
   {
    "roll": 10,
    "text": "hunger"
   },
   {
    "roll": 11,
    "text": "reputation"
   },
   {
    "roll": 12,
    "text": "aggression"
   },
   {
    "roll": 13,
    "text": "adventure"
   },
   {
    "roll": 14,
    "text": "guilt"
   },
   {
    "roll": 15,
    "text": "leisure"
   },
   {
    "roll": 16,
    "text": "protection"
   },
   {
    "roll": 17,
    "text": "intoxication"
   },
   {
    "roll": 18,
    "text": "family"
   },
   {
    "roll": 19,
    "text": "religion"
   },
   {
    "roll": 20,
    "text": "occult"
   }
  ],
  "group": "NPCs"
 },
 "lootTheBody": {
  "id": "lootTheBody",
  "name": "Loot the Body",
  "die": "d100",
  "page": 3,
  "source": "Core Rules",
  "note": "Text in the `hidden` part is not immediately obvious. Add the number rolled in silver for extra loot. 00 (100) = roll again twice.",
  "addRollAsSilver": true,
  "rows": [
   {
    "roll": [
     1,
     20
    ],
    "text": "The result on the Ancient Relics table (pg. 62).",
    "table": "relics"
   },
   {
    "roll": 21,
    "text": "Skull with glowing green sockets."
   },
   {
    "roll": 22,
    "text": "A nasty-looking knife (d6).",
    "damage": "d6"
   },
   {
    "roll": 23,
    "text": "Wanted poster with a picture of one of the PCs on it."
   },
   {
    "roll": 24,
    "text": "Black candle.",
    "hidden": "When lit its purple flame forms a skull."
   },
   {
    "roll": 25,
    "text": "Single golden manacle with 5 links."
   },
   {
    "roll": 26,
    "text": "A leather journal.",
    "hidden": "Contains 1 sea shanty (pg. 68).",
    "table": "shanties"
   },
   {
    "roll": 27,
    "text": "Oil lantern filled with dark green liquid.",
    "hidden": "It burns a pale green light for 5', but never runs out."
   },
   {
    "roll": 28,
    "text": "Fine metal flask."
   },
   {
    "roll": 29,
    "text": "Bag of white powder."
   },
   {
    "roll": 30,
    "text": "Small box with d12 black pearls",
    "hidden": "worth a fortune."
   },
   {
    "roll": 31,
    "text": "Sea shell lined with mother of pearl."
   },
   {
    "roll": 32,
    "text": "Pipe carved out of whale bone.",
    "hidden": "A mysterious map is carved in the bowl."
   },
   {
    "roll": 33,
    "text": "Dead rat."
   },
   {
    "roll": 34,
    "text": "Jewel encrusted egg.",
    "hidden": "AGILITY DR18 to open or it breaks. Clockwork inside, worth 500s."
   },
   {
    "roll": 35,
    "text": "d8 crab claws.",
    "hidden": "Throwing them before casting a ritual lowers the DR by 1."
   },
   {
    "roll": 36,
    "text": "Stone ring with an engraved rune."
   },
   {
    "roll": 37,
    "text": "Deep blue gemstone.",
    "hidden": "It sparkles in the moonlight."
   },
   {
    "roll": 38,
    "text": "Obsidian figurine of a kraken.",
    "hidden": "The Kraken won't attack you."
   },
   {
    "roll": 39,
    "text": "Parrot feather.",
    "hidden": "+1 Devil's Luck each dawn."
   },
   {
    "roll": 40,
    "text": "Some rotten dried fruit."
   },
   {
    "roll": 41,
    "text": "Recipe for turtle stew.",
    "hidden": "If made, everyone who can smell it passes out. At sea, the crew awakes with their ship drifting near a mysterious island."
   },
   {
    "roll": 42,
    "text": "Small book on tying sailor knots."
   },
   {
    "roll": 43,
    "text": "Deck of playing cards.",
    "hidden": "The queens are mermaids."
   },
   {
    "roll": 44,
    "text": "Random bomb (pg. 53).",
    "table": "bombs"
   },
   {
    "roll": 45,
    "text": "Jar of d10 eyeballs preserved in white rum. They still see."
   },
   {
    "roll": 46,
    "text": "Set of lock picks."
   },
   {
    "roll": 47,
    "text": "Paper doll painted with blood."
   },
   {
    "roll": 48,
    "text": "Deep green gemstone",
    "hidden": "worth 100s."
   },
   {
    "roll": 49,
    "text": "Small wood flute."
   },
   {
    "roll": [
     50,
     59
    ],
    "text": "The result in silver.",
    "silver": "roll"
   },
   {
    "roll": 60,
    "text": "Leather eye patch.",
    "hidden": "That eye can see in the dark."
   },
   {
    "roll": 61,
    "text": "Flintlock pistol with tally marks."
   },
   {
    "roll": 62,
    "text": "d4 gold teeth."
   },
   {
    "roll": 63,
    "text": "Letter from a bonnie lass."
   },
   {
    "roll": 64,
    "text": "A ship's schedule",
    "hidden": "with details of a treasure ship."
   },
   {
    "roll": 65,
    "text": "Jar of black sand."
   },
   {
    "roll": 66,
    "text": "Book of dark rituals.",
    "hidden": "Test SPIRIT DR14 to learn one random ritual (pg. 64) or else permanently lose 1 SPIRIT."
   },
   {
    "roll": 67,
    "text": "Handwritten collection of ghost stories."
   },
   {
    "roll": 68,
    "text": "Book: A Guide to Sailor Tattoos."
   },
   {
    "roll": 69,
    "text": "A live rat."
   },
   {
    "roll": 70,
    "text": "d4 dead fish."
   },
   {
    "roll": 71,
    "text": "Vial of blowfish poison.",
    "hidden": "Test TOUGHNESS DR12 or take d10 damage."
   },
   {
    "roll": 72,
    "text": "Treasure map (pg. 119).",
    "table": "treasureMaps"
   },
   {
    "roll": 73,
    "text": "A glass eye",
    "hidden": "that always looks West."
   },
   {
    "roll": 74,
    "text": "Broken cutlass hilt (d4)."
   },
   {
    "roll": 75,
    "text": "Glass dagger.",
    "hidden": "(3d4), breaks after 1 use."
   },
   {
    "roll": 76,
    "text": "Book: The Secret Art of Fencing in the Age of Gunpowder.",
    "hidden": "Test PRESENCE DR12 to permanently gain +1 STRENGTH. It only works once."
   },
   {
    "roll": 77,
    "text": "Bottle filled with iridescent dust."
   },
   {
    "roll": 78,
    "text": "Lint.",
    "hidden": "Flammable."
   },
   {
    "roll": 79,
    "text": "Golden idol.",
    "hidden": "Priceless, belongs in a museum."
   },
   {
    "roll": [
     80,
     89
    ],
    "text": "d8 gold doubloons",
    "hidden": "worth the result in silver."
   },
   {
    "roll": [
     90,
     99
    ],
    "text": "Random Thing of Importance (pg. 60).",
    "table": "things"
   },
   {
    "roll": 100,
    "text": "Roll again twice (00).",
    "rollAgain": 2
   }
  ],
  "group": "Loot & Treasure"
 },
 "ashMarket": {
  "id": "ashMarket",
  "name": "Current ASH Market",
  "die": "2d6",
  "page": 10,
  "source": "Core Rules",
  "note": "Standard rate 50s per dose (~5 lbs., or one per skeleton). Roll in each new port or each day; changes apply to the last rate.",
  "rows": [
   {
    "roll": 2,
    "name": "Buyer's market",
    "text": "Buyer's market (can't give it away).",
    "multiplier": 0
   },
   {
    "roll": 3,
    "name": "Flooded",
    "text": "Flooded: half the rate.",
    "multiplier": 0.5
   },
   {
    "roll": [
     4,
     5
    ],
    "name": "Surplus",
    "text": "Surplus: lower last rate by 20%.",
    "multiplier": 0.8
   },
   {
    "roll": [
     6,
     8
    ],
    "name": "Holding steady",
    "text": "Holding steady.",
    "multiplier": 1
   },
   {
    "roll": [
     9,
     10
    ],
    "name": "In demand",
    "text": "In demand: raise rate by 20%.",
    "multiplier": 1.2
   },
   {
    "roll": 11,
    "name": "Rare",
    "text": "Rare: double the last rate.",
    "multiplier": 2
   },
   {
    "roll": 12,
    "name": "Seller's market",
    "text": "Seller's market (name your price).",
    "multiplier": null
   }
  ],
  "group": "ASH"
 },
 "ashEffects": {
  "id": "ashEffects",
  "name": "Effects of Consuming ASH",
  "die": "d20",
  "page": 10,
  "source": "Core Rules",
  "duration": "2d6 minutes",
  "note": "Most effects last for 2d6 minutes.",
  "rows": [
   {
    "roll": 1,
    "name": "Overdose",
    "text": "Overdose. Pass out for d4 rounds. Test TOUGHNESS DR12 or instant death.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 12
    },
    "death": true
   },
   {
    "roll": 2,
    "text": "Roll a Mystical Mishap (pg. 66).",
    "table": "mishaps"
   },
   {
    "roll": 3,
    "text": "Lose d4 HP and become infected.",
    "damage": "d4",
    "condition": "infected"
   },
   {
    "roll": 4,
    "text": "Permanent -1 to all abilities.",
    "permanent": true,
    "abilities": {
     "all": -1
    }
   },
   {
    "roll": 5,
    "text": "The world turns gray and lifeless. You no longer see the joy in living. All seems dead."
   },
   {
    "roll": 6,
    "text": "Everyone around you appears to be (d4): 1. undead 2. soldiers 3. sea creatures. 4. all 3.",
    "sub": {
     "die": "d4",
     "rows": [
      {
       "roll": 1,
       "text": "undead"
      },
      {
       "roll": 2,
       "text": "soldiers"
      },
      {
       "roll": 3,
       "text": "sea creatures"
      },
      {
       "roll": 4,
       "text": "all 3"
      }
     ]
    }
   },
   {
    "roll": 7,
    "text": "You think you're an animal (d6, pg. 86).",
    "table": "darkFaunaTerrestrial"
   },
   {
    "roll": 8,
    "text": "One of your limbs (d4) rots away permanently. It is replaced by a ghost limb at sunset.",
    "permanent": true
   },
   {
    "roll": 9,
    "text": "You fear the sun and thirst for blood, brains, or both."
   },
   {
    "roll": 10,
    "text": "You hear color, see sound, and feel taste."
   },
   {
    "roll": 11,
    "text": "Gain the effects of tier 3 armor.",
    "effects": [
     {
      "type": "armor",
      "value": 3
     }
    ]
   },
   {
    "roll": 12,
    "text": "Time slows down. Take 2 actions or attacks each round.",
    "effects": [
     {
      "type": "attacks",
      "value": 2
     }
    ]
   },
   {
    "roll": 13,
    "text": "Attack and defend at -4 DR.",
    "effects": [
     {
      "type": "dr",
      "value": -4,
      "applies": [
       "attack",
       "defense"
      ]
     }
    ]
   },
   {
    "roll": 14,
    "text": "Gain d12 temporary hit points.",
    "tempHp": "d12"
   },
   {
    "roll": 15,
    "text": "You can see in the dark. Everything that has ever lived glows neon colors.",
    "effects": [
     {
      "type": "sense",
      "value": "darkvision"
     }
    ]
   },
   {
    "roll": 16,
    "text": "Move double your speed (up to 60'/turn).",
    "effects": [
     {
      "type": "movement",
      "value": 60
     }
    ]
   },
   {
    "roll": 17,
    "text": "+2 to STRENGTH and AGILITY for 24 hours.",
    "duration": "24 hours",
    "effects": [
     {
      "type": "ability",
      "applies": [
       "STRENGTH",
       "AGILITY"
      ],
      "value": 2
     }
    ]
   },
   {
    "roll": 18,
    "name": "Mental transcendence",
    "text": "Mental transcendence. Permanent +1 to PRESENCE.",
    "permanent": true,
    "abilities": {
     "PRESENCE": 1
    }
   },
   {
    "roll": 19,
    "name": "One with the universe",
    "text": "You are one with the universe. Permanent +1 to SPIRIT.",
    "permanent": true,
    "abilities": {
     "SPIRIT": 1
    }
   },
   {
    "roll": 20,
    "text": "Roll d10+10 three times on this table (duplicate results have no effect).",
    "reroll": {
     "die": "d10+10",
     "times": 3
    }
   }
  ],
  "group": "ASH"
 },
 "history": {
  "id": "history",
  "name": "A General History of the Dark Caribbean",
  "die": "d66",
  "page": 25,
  "source": "Core Rules",
  "note": "Six storylines (columns) told over six chapters (rows), ending in Armageddon. Use the events as records, rumors, plot hooks or current events; reveal them in order or roll d66 for a random one (first die = storyline, second die = chapter — the book doesn't specify the order).",
  "storylines": [
   "The Greater Antilles War",
   "The Rise and Fall of Nassau",
   "The Scourge of the New World",
   "The Ashes of Tortuga",
   "And The Wretched Exalted",
   "Eldritch Tides of Doom"
  ],
  "columns": [
   {
    "die": "d6",
    "name": "The Greater Antilles War",
    "values": [
     "Spain and England are at war; both recruit privateers and pay in advance.",
     "Constant war: the battle for the Greater Antilles rages on with no end in sight.",
     "A Spanish treasure fleet wrecks off Florida; nations and pirates race to it.",
     "A region-wide cease fire as nations deal with tragedy; hundreds of warships are abandoned.",
     "Derelict ships litter the sea; salvagers get rich and reset the status quo.",
     "The skies shift from smoke-gray to crimson and putrid orange; sunlight becomes a myth."
    ]
   },
   {
    "die": "d6",
    "name": "The Rise and Fall of Nassau",
    "values": [
     "Port Royal is destroyed in an earthquake; thousands dead, more homeless.",
     "Nassau is sacked; the \"Republic of Pirates\", the region's first true democracy, is founded.",
     "Famous pirates are executed and hung in gibbet cages; their cursed corpses scream at passers-by.",
     "Edward \"Blackbeard\" Thatch goes on a killing spree and is slain in a skirmish with the Royal Navy.",
     "Blackbeard, a sorcerer, returns from the grave with an army of the dead; the living fight back.",
     "Nassau falls to The Scourge; escapees border on insanity and fear becomes currency."
    ]
   },
   {
    "die": "d6",
    "name": "The Scourge of the New World",
    "values": [
     "Horrifying screams from the sea are reported region-wide, source unknown.",
     "They walk again! The dead rise from grave and sea — a few at first, then hordes.",
     "The undead, now called \"The Scourge\", ravage settlements; a state of emergency is declared.",
     "Freshly killed fish and livestock animate and writhe at sunset; no one seems to mind anymore.",
     "A mass exodus of birds and beasts; no wildlife is seen for weeks.",
     "All marine life dies and washes ashore; the fishing industry collapses into famine."
    ]
   },
   {
    "die": "d6",
    "name": "The Ashes of Tortuga",
    "values": [
     "ASH, the dust of destroyed undead, is found to have physiological and psychedelic properties.",
     "A black market grows around ASH; Tortuga becomes its epicenter.",
     "Tortuga decays from a buccaneer bastion into a cesspool of thieves; not even pirates are safe there.",
     "Revolution! Citizens take to the streets of Hispaniola and the government is overthrown.",
     "Thousands flee for safety; Havana, Jamaica and Guadeloupe explode in population.",
     "Everyone who ever used ASH becomes Scourge; rum turns to water and escapism evaporates."
    ]
   },
   {
    "die": "d6",
    "name": "And The Wretched Exalted",
    "values": [
     "Religious fanatics take over the Old Stone Church in Havana; occult influence is suspected.",
     "Mysterious ruins are found in the Yucatán; an expedition sets out and none return alive.",
     "A lone figure with abyss-black eyes emerges from the jungle, terrible to behold.",
     "Ships of bone and flesh rise from the sea; their skeletal crews terrorize the shipping lanes.",
     "Havana burns in a fire rumored to have started at the Old Stone Church — which still stands.",
     "An ominous tempest settles permanently over Cuba, leaving a wasteland."
    ]
   },
   {
    "die": "d6",
    "name": "Eldritch Tides of Doom",
    "values": [
     "The climate shifts: darkened skies, raging storms and an omnipresent foul mist.",
     "\"The Abyss\" opens south of Cuba: the ocean pours into a 6-mile-long fissure.",
     "The Kraken attacks! Over 500 ships are lost at sea; large rewards go uncollected.",
     "The ruins of Atlantis rise in the Devil's Triangle; humanoid sea creatures attack.",
     "Otherworldly monstrosities spew from the sea, devouring whole vessels.",
     "A maelstrom forms around The Abyss; earthquakes crumble islands into the sea."
    ]
   }
  ],
  "rows": [
   {
    "roll": 11,
    "storyline": "The Greater Antilles War",
    "chapter": 1,
    "text": "Spain and England are at war; both recruit privateers and pay in advance."
   },
   {
    "roll": 12,
    "storyline": "The Greater Antilles War",
    "chapter": 2,
    "text": "Constant war: the battle for the Greater Antilles rages on with no end in sight."
   },
   {
    "roll": 13,
    "storyline": "The Greater Antilles War",
    "chapter": 3,
    "text": "A Spanish treasure fleet wrecks off Florida; nations and pirates race to it."
   },
   {
    "roll": 14,
    "storyline": "The Greater Antilles War",
    "chapter": 4,
    "text": "A region-wide cease fire as nations deal with tragedy; hundreds of warships are abandoned."
   },
   {
    "roll": 15,
    "storyline": "The Greater Antilles War",
    "chapter": 5,
    "text": "Derelict ships litter the sea; salvagers get rich and reset the status quo."
   },
   {
    "roll": 16,
    "storyline": "The Greater Antilles War",
    "chapter": 6,
    "text": "The skies shift from smoke-gray to crimson and putrid orange; sunlight becomes a myth."
   },
   {
    "roll": 21,
    "storyline": "The Rise and Fall of Nassau",
    "chapter": 1,
    "text": "Port Royal is destroyed in an earthquake; thousands dead, more homeless."
   },
   {
    "roll": 22,
    "storyline": "The Rise and Fall of Nassau",
    "chapter": 2,
    "text": "Nassau is sacked; the \"Republic of Pirates\", the region's first true democracy, is founded."
   },
   {
    "roll": 23,
    "storyline": "The Rise and Fall of Nassau",
    "chapter": 3,
    "text": "Famous pirates are executed and hung in gibbet cages; their cursed corpses scream at passers-by."
   },
   {
    "roll": 24,
    "storyline": "The Rise and Fall of Nassau",
    "chapter": 4,
    "text": "Edward \"Blackbeard\" Thatch goes on a killing spree and is slain in a skirmish with the Royal Navy."
   },
   {
    "roll": 25,
    "storyline": "The Rise and Fall of Nassau",
    "chapter": 5,
    "text": "Blackbeard, a sorcerer, returns from the grave with an army of the dead; the living fight back."
   },
   {
    "roll": 26,
    "storyline": "The Rise and Fall of Nassau",
    "chapter": 6,
    "text": "Nassau falls to The Scourge; escapees border on insanity and fear becomes currency."
   },
   {
    "roll": 31,
    "storyline": "The Scourge of the New World",
    "chapter": 1,
    "text": "Horrifying screams from the sea are reported region-wide, source unknown."
   },
   {
    "roll": 32,
    "storyline": "The Scourge of the New World",
    "chapter": 2,
    "text": "They walk again! The dead rise from grave and sea — a few at first, then hordes."
   },
   {
    "roll": 33,
    "storyline": "The Scourge of the New World",
    "chapter": 3,
    "text": "The undead, now called \"The Scourge\", ravage settlements; a state of emergency is declared."
   },
   {
    "roll": 34,
    "storyline": "The Scourge of the New World",
    "chapter": 4,
    "text": "Freshly killed fish and livestock animate and writhe at sunset; no one seems to mind anymore."
   },
   {
    "roll": 35,
    "storyline": "The Scourge of the New World",
    "chapter": 5,
    "text": "A mass exodus of birds and beasts; no wildlife is seen for weeks."
   },
   {
    "roll": 36,
    "storyline": "The Scourge of the New World",
    "chapter": 6,
    "text": "All marine life dies and washes ashore; the fishing industry collapses into famine."
   },
   {
    "roll": 41,
    "storyline": "The Ashes of Tortuga",
    "chapter": 1,
    "text": "ASH, the dust of destroyed undead, is found to have physiological and psychedelic properties."
   },
   {
    "roll": 42,
    "storyline": "The Ashes of Tortuga",
    "chapter": 2,
    "text": "A black market grows around ASH; Tortuga becomes its epicenter."
   },
   {
    "roll": 43,
    "storyline": "The Ashes of Tortuga",
    "chapter": 3,
    "text": "Tortuga decays from a buccaneer bastion into a cesspool of thieves; not even pirates are safe there."
   },
   {
    "roll": 44,
    "storyline": "The Ashes of Tortuga",
    "chapter": 4,
    "text": "Revolution! Citizens take to the streets of Hispaniola and the government is overthrown."
   },
   {
    "roll": 45,
    "storyline": "The Ashes of Tortuga",
    "chapter": 5,
    "text": "Thousands flee for safety; Havana, Jamaica and Guadeloupe explode in population."
   },
   {
    "roll": 46,
    "storyline": "The Ashes of Tortuga",
    "chapter": 6,
    "text": "Everyone who ever used ASH becomes Scourge; rum turns to water and escapism evaporates."
   },
   {
    "roll": 51,
    "storyline": "And The Wretched Exalted",
    "chapter": 1,
    "text": "Religious fanatics take over the Old Stone Church in Havana; occult influence is suspected."
   },
   {
    "roll": 52,
    "storyline": "And The Wretched Exalted",
    "chapter": 2,
    "text": "Mysterious ruins are found in the Yucatán; an expedition sets out and none return alive."
   },
   {
    "roll": 53,
    "storyline": "And The Wretched Exalted",
    "chapter": 3,
    "text": "A lone figure with abyss-black eyes emerges from the jungle, terrible to behold."
   },
   {
    "roll": 54,
    "storyline": "And The Wretched Exalted",
    "chapter": 4,
    "text": "Ships of bone and flesh rise from the sea; their skeletal crews terrorize the shipping lanes."
   },
   {
    "roll": 55,
    "storyline": "And The Wretched Exalted",
    "chapter": 5,
    "text": "Havana burns in a fire rumored to have started at the Old Stone Church — which still stands."
   },
   {
    "roll": 56,
    "storyline": "And The Wretched Exalted",
    "chapter": 6,
    "text": "An ominous tempest settles permanently over Cuba, leaving a wasteland."
   },
   {
    "roll": 61,
    "storyline": "Eldritch Tides of Doom",
    "chapter": 1,
    "text": "The climate shifts: darkened skies, raging storms and an omnipresent foul mist."
   },
   {
    "roll": 62,
    "storyline": "Eldritch Tides of Doom",
    "chapter": 2,
    "text": "\"The Abyss\" opens south of Cuba: the ocean pours into a 6-mile-long fissure."
   },
   {
    "roll": 63,
    "storyline": "Eldritch Tides of Doom",
    "chapter": 3,
    "text": "The Kraken attacks! Over 500 ships are lost at sea; large rewards go uncollected."
   },
   {
    "roll": 64,
    "storyline": "Eldritch Tides of Doom",
    "chapter": 4,
    "text": "The ruins of Atlantis rise in the Devil's Triangle; humanoid sea creatures attack."
   },
   {
    "roll": 65,
    "storyline": "Eldritch Tides of Doom",
    "chapter": 5,
    "text": "Otherworldly monstrosities spew from the sea, devouring whole vessels."
   },
   {
    "roll": 66,
    "storyline": "Eldritch Tides of Doom",
    "chapter": 6,
    "text": "A maelstrom forms around The Abyss; earthquakes crumble islands into the sea."
   }
  ],
  "group": "Setting"
 },
 "alchemy": {
  "id": "alchemy",
  "name": "Alchemy Potion Generator",
  "die": "d20",
  "page": 70,
  "source": "Core Rules",
  "note": "Fast: roll 1d20 and read across. Random: roll 6d20, one per column. Precise: pick. The DR is the TOUGHNESS DR to resist or the PRESENCE DR to craft. Most potions cost d100s. Results are never guaranteed.",
  "columns": [
   {
    "die": "d20",
    "name": "Ingredient",
    "values": [
     "Rum",
     "Sugar",
     "Tobacco",
     "Chicken Flesh",
     "Oxtail",
     "Candy",
     "Flour",
     "Sassafras Root",
     "Hyla Tree Frog",
     "Polychaete Worm",
     "Large Toad",
     "Pufferfish",
     "Psilocybin Mushroom",
     "Pig Blood",
     "Human Blood",
     "Whale Blubber",
     "Monkey Paw",
     "Chicken Head",
     "Crocodile Tooth",
     "Human Remains"
    ]
   },
   {
    "die": "d20",
    "name": "Ingredient",
    "values": [
     "Wild Flowers",
     "Ashes",
     "Black Powder",
     "Raisins",
     "Tree Bark",
     "Bone Powder",
     "Graveyard Dirt",
     "Jaguar Claw",
     "Bat Wing",
     "Cow's Tongue",
     "Crow's Foot",
     "Cacao Seeds",
     "Tamarind Leaves",
     "Castor Oil",
     "Maggots",
     "Bush Rat",
     "Kola Nut",
     "Coconut",
     "Sage",
     "Banana Peel"
    ]
   },
   {
    "die": "d20",
    "name": "Resulting Color",
    "values": [
     "Black",
     "Blue",
     "Green",
     "Red",
     "Purple",
     "Yellow",
     "Orange",
     "White",
     "Metallic",
     "Clear",
     "Glows in the Dark",
     "Pearlescent",
     "Iridescent",
     "Brown",
     "Gray",
     "Space-Like",
     "Pink",
     "Turquoise",
     "Opalescent",
     "Sanguine"
    ]
   },
   {
    "die": "d20",
    "name": "Delivery Method",
    "values": [
     "Inhalation",
     "Inhalation",
     "Inhalation",
     "Inhalation",
     "Inhalation",
     "Touch Skin",
     "Touch Skin",
     "Touch Skin",
     "Touch Skin",
     "Touch Skin",
     "Enter Bloodstream",
     "Enter Bloodstream",
     "Enter Bloodstream",
     "Enter Bloodstream",
     "Enter Bloodstream",
     "Ingestion",
     "Ingestion",
     "Ingestion",
     "Ingestion",
     "Ingestion"
    ]
   },
   {
    "die": "d20",
    "name": "DR",
    "values": [
     "DR8",
     "DR8",
     "DR8",
     "DR10",
     "DR10",
     "DR10",
     "DR12",
     "DR12",
     "DR12",
     "DR14",
     "DR14",
     "DR14",
     "DR16",
     "DR16",
     "DR16",
     "DR18",
     "DR18",
     "DR18",
     "DR20",
     "DR20"
    ]
   },
   {
    "die": "d20",
    "name": "Effect",
    "values": [
     "Instant, horrific death or after subject is killed, resurrect with 1 HP.",
     "Death in d6 hours.",
     "Paralysis (d8 hours).",
     "Subject becomes a ghost.",
     "d6 damage and blind for 1 hour.",
     "Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds.",
     "Polymorph into a random beast (d12 hour).",
     "Polymorph into a random beast (permanent).",
     "Polymorph into a horrific monster (permanent).",
     "d8 acidic damage.",
     "Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR.",
     "Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR.",
     "Heal d6.",
     "Heal d8.",
     "Heal to max HP.",
     "Strange hallucinations (d4 hours).",
     "Run away in terror (lasts d6 rounds).",
     "All tests are DR -4 for d8 hours.",
     "A random result from the Mystical Mishaps table (pg. 66).",
     "Roll again twice."
    ]
   }
  ],
  "rows": [
   {
    "roll": 1,
    "ingredientA": "Rum",
    "ingredientB": "Wild Flowers",
    "color": "Black",
    "delivery": "Inhalation",
    "dr": 8,
    "effect": "Instant, horrific death or after subject is killed, resurrect with 1 HP.",
    "text": "Black potion of Rum & Wild Flowers (Inhalation, DR8): Instant, horrific death or after subject is killed, resurrect with 1 HP."
   },
   {
    "roll": 2,
    "ingredientA": "Sugar",
    "ingredientB": "Ashes",
    "color": "Blue",
    "delivery": "Inhalation",
    "dr": 8,
    "effect": "Death in d6 hours.",
    "duration": "d6 hours",
    "text": "Blue potion of Sugar & Ashes (Inhalation, DR8): Death in d6 hours."
   },
   {
    "roll": 3,
    "ingredientA": "Tobacco",
    "ingredientB": "Black Powder",
    "color": "Green",
    "delivery": "Inhalation",
    "dr": 8,
    "effect": "Paralysis (d8 hours).",
    "duration": "d8 hours",
    "text": "Green potion of Tobacco & Black Powder (Inhalation, DR8): Paralysis (d8 hours)."
   },
   {
    "roll": 4,
    "ingredientA": "Chicken Flesh",
    "ingredientB": "Raisins",
    "color": "Red",
    "delivery": "Inhalation",
    "dr": 10,
    "effect": "Subject becomes a ghost.",
    "text": "Red potion of Chicken Flesh & Raisins (Inhalation, DR10): Subject becomes a ghost."
   },
   {
    "roll": 5,
    "ingredientA": "Oxtail",
    "ingredientB": "Tree Bark",
    "color": "Purple",
    "delivery": "Inhalation",
    "dr": 10,
    "effect": "d6 damage and blind for 1 hour.",
    "damage": "d6",
    "text": "Purple potion of Oxtail & Tree Bark (Inhalation, DR10): d6 damage and blind for 1 hour."
   },
   {
    "roll": 6,
    "ingredientA": "Candy",
    "ingredientB": "Bone Powder",
    "color": "Yellow",
    "delivery": "Touch Skin",
    "dr": 10,
    "effect": "Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds.",
    "duration": "d6 rounds",
    "text": "Yellow potion of Candy & Bone Powder (Touch Skin, DR10): Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds."
   },
   {
    "roll": 7,
    "ingredientA": "Flour",
    "ingredientB": "Graveyard Dirt",
    "color": "Orange",
    "delivery": "Touch Skin",
    "dr": 12,
    "effect": "Polymorph into a random beast (d12 hour).",
    "text": "Orange potion of Flour & Graveyard Dirt (Touch Skin, DR12): Polymorph into a random beast (d12 hour)."
   },
   {
    "roll": 8,
    "ingredientA": "Sassafras Root",
    "ingredientB": "Jaguar Claw",
    "color": "White",
    "delivery": "Touch Skin",
    "dr": 12,
    "effect": "Polymorph into a random beast (permanent).",
    "text": "White potion of Sassafras Root & Jaguar Claw (Touch Skin, DR12): Polymorph into a random beast (permanent)."
   },
   {
    "roll": 9,
    "ingredientA": "Hyla Tree Frog",
    "ingredientB": "Bat Wing",
    "color": "Metallic",
    "delivery": "Touch Skin",
    "dr": 12,
    "effect": "Polymorph into a horrific monster (permanent).",
    "text": "Metallic potion of Hyla Tree Frog & Bat Wing (Touch Skin, DR12): Polymorph into a horrific monster (permanent)."
   },
   {
    "roll": 10,
    "ingredientA": "Polychaete Worm",
    "ingredientB": "Cow's Tongue",
    "color": "Clear",
    "delivery": "Touch Skin",
    "dr": 14,
    "effect": "d8 acidic damage.",
    "damage": "d8",
    "text": "Clear potion of Polychaete Worm & Cow's Tongue (Touch Skin, DR14): d8 acidic damage."
   },
   {
    "roll": 11,
    "ingredientA": "Large Toad",
    "ingredientB": "Crow's Foot",
    "color": "Glows in the Dark",
    "delivery": "Enter Bloodstream",
    "dr": 14,
    "effect": "Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR.",
    "text": "Glows in the Dark potion of Large Toad & Crow's Foot (Enter Bloodstream, DR14): Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR."
   },
   {
    "roll": 12,
    "ingredientA": "Pufferfish",
    "ingredientB": "Cacao Seeds",
    "color": "Pearlescent",
    "delivery": "Enter Bloodstream",
    "dr": 14,
    "effect": "Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR.",
    "text": "Pearlescent potion of Pufferfish & Cacao Seeds (Enter Bloodstream, DR14): Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR."
   },
   {
    "roll": 13,
    "ingredientA": "Psilocybin Mushroom",
    "ingredientB": "Tamarind Leaves",
    "color": "Iridescent",
    "delivery": "Enter Bloodstream",
    "dr": 16,
    "effect": "Heal d6.",
    "heal": "d6",
    "text": "Iridescent potion of Psilocybin Mushroom & Tamarind Leaves (Enter Bloodstream, DR16): Heal d6."
   },
   {
    "roll": 14,
    "ingredientA": "Pig Blood",
    "ingredientB": "Castor Oil",
    "color": "Brown",
    "delivery": "Enter Bloodstream",
    "dr": 16,
    "effect": "Heal d8.",
    "heal": "d8",
    "text": "Brown potion of Pig Blood & Castor Oil (Enter Bloodstream, DR16): Heal d8."
   },
   {
    "roll": 15,
    "ingredientA": "Human Blood",
    "ingredientB": "Maggots",
    "color": "Gray",
    "delivery": "Enter Bloodstream",
    "dr": 16,
    "effect": "Heal to max HP.",
    "heal": "max",
    "text": "Gray potion of Human Blood & Maggots (Enter Bloodstream, DR16): Heal to max HP."
   },
   {
    "roll": 16,
    "ingredientA": "Whale Blubber",
    "ingredientB": "Bush Rat",
    "color": "Space-Like",
    "delivery": "Ingestion",
    "dr": 18,
    "effect": "Strange hallucinations (d4 hours).",
    "text": "Space-Like potion of Whale Blubber & Bush Rat (Ingestion, DR18): Strange hallucinations (d4 hours)."
   },
   {
    "roll": 17,
    "ingredientA": "Monkey Paw",
    "ingredientB": "Kola Nut",
    "color": "Pink",
    "delivery": "Ingestion",
    "dr": 18,
    "effect": "Run away in terror (lasts d6 rounds).",
    "text": "Pink potion of Monkey Paw & Kola Nut (Ingestion, DR18): Run away in terror (lasts d6 rounds)."
   },
   {
    "roll": 18,
    "ingredientA": "Chicken Head",
    "ingredientB": "Coconut",
    "color": "Turquoise",
    "delivery": "Ingestion",
    "dr": 18,
    "effect": "All tests are DR -4 for d8 hours.",
    "text": "Turquoise potion of Chicken Head & Coconut (Ingestion, DR18): All tests are DR -4 for d8 hours."
   },
   {
    "roll": 19,
    "ingredientA": "Crocodile Tooth",
    "ingredientB": "Sage",
    "color": "Opalescent",
    "delivery": "Ingestion",
    "dr": 20,
    "effect": "A random result from the Mystical Mishaps table (pg. 66).",
    "table": "mishaps",
    "text": "Opalescent potion of Crocodile Tooth & Sage (Ingestion, DR20): A random result from the Mystical Mishaps table (pg. 66)."
   },
   {
    "roll": 20,
    "ingredientA": "Human Remains",
    "ingredientB": "Banana Peel",
    "color": "Sanguine",
    "delivery": "Ingestion",
    "dr": 20,
    "effect": "Roll again twice.",
    "rollAgain": 2,
    "text": "Sanguine potion of Human Remains & Banana Peel (Ingestion, DR20): Roll again twice."
   }
  ],
  "group": "Alchemy"
 },
 "flotsam": {
  "id": "flotsam",
  "name": "Flotsam & Jetsam",
  "die": "d12",
  "page": 79,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Message in a bottle."
   },
   {
    "roll": 2,
    "text": "2d10 crates (pg. 115).",
    "table": "cargo"
   },
   {
    "roll": 3,
    "text": "d4 adrift sailors."
   },
   {
    "roll": 4,
    "text": "Large, locked sea chest."
   },
   {
    "roll": 5,
    "text": "Green sea turtle, a map carved in its shell."
   },
   {
    "roll": 6,
    "text": "A coffin, nailed shut."
   },
   {
    "roll": 7,
    "text": "Sentient ship's figurehead."
   },
   {
    "roll": 8,
    "text": "Massive dead blue whale, something living inside."
   },
   {
    "roll": 9,
    "text": "A tentacle, d100 feet long."
   },
   {
    "roll": 10,
    "text": "d8 x 100 glowing jellyfish."
   },
   {
    "roll": 11,
    "text": "Dinghy filled with treasure."
   },
   {
    "roll": 12,
    "text": "Derelict ship (pg. 116).",
    "table": "derelictShip"
   }
  ],
  "group": "Maritime Travel Events"
 },
 "seaEncounters": {
  "id": "seaEncounters",
  "name": "Encounters at Sea",
  "die": "d20",
  "page": 79,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "The Kraken.",
    "monster": "the-kraken"
   },
   {
    "roll": 2,
    "text": "Navy Ship of the Line.",
    "ship": "ship-of-the-line",
    "captain": "naval-mastermind"
   },
   {
    "roll": 3,
    "text": "Privateers: d2 sloops & 1 frigate.",
    "ships": [
     "sloop",
     "frigate"
    ]
   },
   {
    "roll": 4,
    "text": "2d4 canoes.",
    "ship": "canoe"
   },
   {
    "roll": 5,
    "text": "No-talent pirates in a tartane.",
    "ship": "tartane"
   },
   {
    "roll": 6,
    "text": "Sloop of rookie pirates.",
    "ship": "sloop"
   },
   {
    "roll": 7,
    "text": "Fugitives in a ship's boat.",
    "ship": "longboat"
   },
   {
    "roll": 8,
    "text": "Raft with d6 dying passengers.",
    "ship": "raft"
   },
   {
    "roll": 9,
    "text": "d2 people in a dinghy.",
    "ship": "dinghy"
   },
   {
    "roll": 10,
    "text": "Old galleon crewed by monkeys.",
    "ship": "galleon"
   },
   {
    "roll": 11,
    "text": "Merchantman with lots of goods.",
    "ship": "fluyt"
   },
   {
    "roll": 12,
    "text": "2d20 zombies on floating debris."
   },
   {
    "roll": 13,
    "text": "Man-of-War, famous pirate.",
    "ship": "man-of-war"
   },
   {
    "roll": 14,
    "text": "3d6 war canoes, en route to raid.",
    "ship": "canoe"
   },
   {
    "roll": 15,
    "text": "Blood drenched Ship of the Dead.",
    "ship": "ghost-ship"
   },
   {
    "roll": 16,
    "text": "Treasure galleon & d4 sloops.",
    "ships": [
     "galleon",
     "sloop"
    ]
   },
   {
    "roll": 17,
    "text": "d2 undead megalodons.",
    "monster": "undead-megalodon"
   },
   {
    "roll": 18,
    "text": "d6 fluyts preparing for battle.",
    "ship": "fluyt"
   },
   {
    "roll": 19,
    "text": "A flotilla: pirate lords are meeting."
   },
   {
    "roll": 20,
    "text": "Ornate galleon: a floating brothel.",
    "ship": "galleon"
   }
  ],
  "group": "Maritime Travel Events"
 },
 "seaEvents": {
  "id": "seaEvents",
  "name": "Events at Sea",
  "die": "d20",
  "page": 79,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "A huge shark or sea monster harasses the hull. DR12 AGILITY tests or overboard!",
    "test": {
     "ability": "AGILITY",
     "dr": 12
    }
   },
   {
    "roll": 2,
    "text": "A corpse floats by the ship. If rescued, it comes to life after d10 minutes."
   },
   {
    "roll": 3,
    "text": "Shipworms or barnacles infect the hull. Ship: -1 speed each week until careened.",
    "shipSpeed": -1
   },
   {
    "roll": 4,
    "text": "d4 sirens on rocks or a desert island beckon the crew with serene melodies.",
    "monster": "siren"
   },
   {
    "roll": 5,
    "text": "The rum is gone! The culprit is at large."
   },
   {
    "roll": 6,
    "text": "Man overboard! d6 rounds to solve."
   },
   {
    "roll": 7,
    "text": "Mutiny! Roll reactions for all of the crew (pg. 31).",
    "table": "reaction"
   },
   {
    "roll": 8,
    "text": "Maggots have infested the bread. Resting at sea requires a DR10 TOUGHNESS test.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 10
    }
   },
   {
    "roll": 9,
    "text": "A crew member is gravely wounded while performing their duties around the ship."
   },
   {
    "roll": 10,
    "text": "An NPC knows something troubling related to a PC's background or unfortunate incident."
   },
   {
    "roll": 11,
    "text": "A slimy ghost is spotted eating the food in the galley."
   },
   {
    "roll": 12,
    "text": "A maelstrom (whirlpool) opens nearby. Eminent danger."
   },
   {
    "roll": 13,
    "text": "Everyone is haunted by eldritch or stygian dreams. The Great Old One calls..."
   },
   {
    "roll": 14,
    "text": "d4 of the crew are quarreling. Fisticuffs?"
   },
   {
    "roll": 15,
    "text": "Things are missing: there is a stowaway."
   },
   {
    "roll": 16,
    "text": "Unexpected shoals and coral require precision navigation and piloting."
   },
   {
    "roll": 17,
    "text": "Something gruesome and terrible is found in the cargo hold."
   },
   {
    "roll": 18,
    "text": "d2 mermaids visit the ship. Secretly roll reaction (pg. 31) to know their intent.",
    "table": "reaction"
   },
   {
    "roll": 19,
    "text": "A mysterious, uncharted island is spotted. See pg. 122.",
    "table": "islands"
   },
   {
    "roll": 20,
    "text": "An albatross is spotted flying with the sails. Everyone gains 1 Devil's Luck point.",
    "luck": 1
   }
  ],
  "group": "Maritime Travel Events"
 },
 "enemyHp": {
  "id": "enemyHp",
  "name": "HP",
  "die": "d10",
  "page": 91,
  "source": "Core Rules",
  "note": "How tough or big is it?",
  "rows": [
   {
    "roll": 1,
    "text": "HP 1-3: Barely worth fighting.",
    "hp": [
     1,
     3
    ]
   },
   {
    "roll": 2,
    "text": "HP 4-6: A weak human.",
    "hp": [
     4,
     6
    ]
   },
   {
    "roll": 3,
    "text": "HP 7-9: An average human.",
    "hp": [
     7,
     9
    ]
   },
   {
    "roll": 4,
    "text": "HP 10-12: A tough human or animal.",
    "hp": [
     10,
     12
    ]
   },
   {
    "roll": 5,
    "text": "HP 13-15: A challenge to new PCs.",
    "hp": [
     13,
     15
    ]
   },
   {
    "roll": 6,
    "text": "HP 16-19: A serious threat to new PCs.",
    "hp": [
     16,
     19
    ]
   },
   {
    "roll": 7,
    "text": "HP 20-24: A low level boss.",
    "hp": [
     20,
     24
    ]
   },
   {
    "roll": 8,
    "text": "HP 25-29: A regional boss.",
    "hp": [
     25,
     29
    ]
   },
   {
    "roll": 9,
    "text": "HP 30-39: Huge or legendary.",
    "hp": [
     30,
     39
    ]
   },
   {
    "roll": 10,
    "text": "HP 40+: Naval threat, TPK zone.",
    "hp": [
     40,
     null
    ]
   }
  ],
  "group": "Enemy Builder"
 },
 "enemyMorale": {
  "id": "enemyMorale",
  "name": "Morale",
  "die": "2d6",
  "page": 91,
  "source": "Core Rules",
  "note": "How much courage does it have?",
  "rows": [
   {
    "roll": 2,
    "text": "Morale 2: Easily scared, likely to flee.",
    "morale": 2
   },
   {
    "roll": 3,
    "text": "Morale 3: Bottom of the food chain.",
    "morale": 3
   },
   {
    "roll": 4,
    "text": "Morale 4: Runs when danger is sensed.",
    "morale": 4
   },
   {
    "roll": 5,
    "text": "Morale 5: Fearful, but willing to fight.",
    "morale": 5
   },
   {
    "roll": 6,
    "text": "Morale 6: Untrained, average human.",
    "morale": 6
   },
   {
    "roll": 7,
    "text": "Morale 7: Combat experience.",
    "morale": 7
   },
   {
    "roll": 8,
    "text": "Morale 8: Military training.",
    "morale": 8
   },
   {
    "roll": 9,
    "text": "Morale 9: A brave leader.",
    "morale": 9
   },
   {
    "roll": 10,
    "text": "Morale 10: Unwise in their courage.",
    "morale": 10
   },
   {
    "roll": 11,
    "text": "Morale 11: Insane, heroic, or both.",
    "morale": 11
   },
   {
    "roll": 12,
    "text": "Morale –: Unintelligent, fights to the death, or compelled by an external force.",
    "morale": null
   }
  ],
  "group": "Enemy Builder"
 },
 "enemyArmor": {
  "id": "enemyArmor",
  "name": "Armor",
  "die": "d4",
  "page": 91,
  "source": "Core Rules",
  "note": "Traditional armor does not stop bullets.",
  "rows": [
   {
    "roll": 1,
    "text": "Tier 0 (−0): No armor. Skin or flesh.",
    "armor": null
   },
   {
    "roll": 2,
    "text": "Tier 1 (−d2): Leather, thick fur, scales.",
    "armor": {
     "name": "Armor",
     "die": "d2",
     "tier": 1
    }
   },
   {
    "roll": 3,
    "text": "Tier 2 (−d4): Chain mail, thick hide, blessed.",
    "armor": {
     "name": "Armor",
     "die": "d4",
     "tier": 2
    }
   },
   {
    "roll": 4,
    "text": "Tier 3 (−d6): Plate, armor, or blubber.",
    "armor": {
     "name": "Armor",
     "die": "d6",
     "tier": 3
    }
   }
  ],
  "group": "Enemy Builder"
 },
 "enemyDamage": {
  "id": "enemyDamage",
  "name": "Damage",
  "die": "d12",
  "page": 91,
  "source": "Core Rules",
  "note": "How deadly is it? Black powder weapons roll double damage but take 2 actions to reload.",
  "rows": [
   {
    "roll": 1,
    "text": "d2: A broken bottle, fist, weak claw, weak bite, harsh language.",
    "damage": "d2"
   },
   {
    "roll": 2,
    "text": "d4: Knife, hook, claw, improvised weapon, club.",
    "damage": "d4"
   },
   {
    "roll": 3,
    "text": "d6: Cutlass, axe, animal bite, tentacles slam.",
    "damage": "d6"
   },
   {
    "roll": 4,
    "text": "d8: Fine rapier, big sword, claw from a large beast.",
    "damage": "d8"
   },
   {
    "roll": 5,
    "text": "d10: Two-handed weapon, monster's bite, anchor.",
    "damage": "d10"
   },
   {
    "roll": 6,
    "text": "d12: Executioner's axe, kraken's maw.",
    "damage": "d12"
   },
   {
    "roll": 7,
    "text": "2d4: Flintlock pistol.",
    "damage": "2d4",
    "blackPowder": true
   },
   {
    "roll": 8,
    "text": "2d6: Standard black powder musket.",
    "damage": "2d6",
    "blackPowder": true
   },
   {
    "roll": 9,
    "text": "2d8: Buccaneer musket.",
    "damage": "2d8",
    "blackPowder": true
   },
   {
    "roll": 10,
    "text": "2d10: Mounted swivel gun.",
    "damage": "2d10",
    "blackPowder": true
   },
   {
    "roll": 11,
    "text": "2d12: Cannon shot in melee.",
    "damage": "2d12",
    "blackPowder": true
   },
   {
    "roll": 12,
    "text": "3d6: Some form of arcana.",
    "damage": "3d6"
   }
  ],
  "group": "Enemy Builder"
 },
 "enemySpecial": {
  "id": "enemySpecial",
  "name": "Special",
  "die": "d10",
  "page": 91,
  "source": "Core Rules",
  "note": "What makes it unique? Mix and match for thematic adversaries.",
  "rows": [
   {
    "roll": 1,
    "name": "Quick/small/guarded",
    "text": "Quick/small/guarded: DR14 to attack/defend.",
    "dr": {
     "attack": 14,
     "defend": 14
    }
   },
   {
    "roll": 2,
    "name": "Slow/big/reckless",
    "text": "Slow/big/reckless: DR10 to attack/defend.",
    "dr": {
     "attack": 10,
     "defend": 10
    }
   },
   {
    "roll": 3,
    "name": "Poisonous",
    "text": "Poisonous: Test TOUGHNESS DR12 or become infected.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 12
    }
   },
   {
    "roll": 4,
    "name": "Combatant",
    "text": "Combatant: Takes 2 attacks each round.",
    "attacksPerRound": 2
   },
   {
    "roll": 5,
    "name": "Arcane/willpower",
    "text": "Arcane/willpower: Test SPIRIT DR12 or STRENGTH/AGILITY are −2 for the combat.",
    "test": {
     "ability": "SPIRIT",
     "dr": 12
    }
   },
   {
    "roll": 6,
    "name": "Outsmart/stun",
    "text": "Outsmart/stun: Test PRESENCE DR12 or skip the next d2 turns.",
    "test": {
     "ability": "PRESENCE",
     "dr": 12
    }
   },
   {
    "roll": 7,
    "name": "Terrifying",
    "text": "Terrifying: Test SPIRIT DR12 or must run away for d2 rounds. Or force NPCs to make MORALE tests.",
    "test": {
     "ability": "SPIRIT",
     "dr": 12
    }
   },
   {
    "roll": 8,
    "name": "Leadership",
    "text": "Leadership: Nearby allies are +2 DR to attack/defend."
   },
   {
    "roll": 9,
    "name": "Relic",
    "text": "Relic: They have d2 from pg. 62.",
    "table": "relics"
   },
   {
    "roll": 10,
    "name": "Ritual",
    "text": "Ritual: They know 1 from pg. 64.",
    "table": "rituals"
   }
  ],
  "group": "Enemy Builder"
 },
 "vesselClass": {
  "id": "vesselClass",
  "name": "Vessel Class",
  "die": "d10",
  "page": 114,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "raft",
    "ship": "raft"
   },
   {
    "roll": 2,
    "text": "longboat",
    "ship": "longboat"
   },
   {
    "roll": 3,
    "text": "tartane",
    "ship": "tartane"
   },
   {
    "roll": 4,
    "text": "sloop",
    "ship": "sloop"
   },
   {
    "roll": 5,
    "text": "brigantine",
    "ship": "brigantine"
   },
   {
    "roll": 6,
    "text": "fluyt",
    "ship": "fluyt"
   },
   {
    "roll": 7,
    "text": "frigate",
    "ship": "frigate"
   },
   {
    "roll": 8,
    "text": "galleon",
    "ship": "galleon"
   },
   {
    "roll": 9,
    "text": "man-of-war",
    "ship": "man-of-war"
   },
   {
    "roll": 10,
    "text": "ship of the line",
    "ship": "ship-of-the-line"
   }
  ],
  "group": "Ships at Sea"
 },
 "armament": {
  "id": "armament",
  "name": "Armament",
  "die": "d6",
  "page": 114,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Merchant: No weapons.",
    "weapons": "none"
   },
   {
    "roll": 2,
    "text": "Lightly armed: reduce damage die size by one.",
    "attackDieStep": -1
   },
   {
    "roll": [
     3,
     5
    ],
    "text": "Normal armament."
   },
   {
    "roll": 6,
    "text": "Warship: Double broadsides.",
    "broadsidesMultiplier": 2
   }
  ],
  "group": "Ships at Sea"
 },
 "crewQuantity": {
  "id": "crewQuantity",
  "name": "Crew Quantity",
  "die": "d6",
  "page": 114,
  "source": "Core Rules",
  "note": "Modify DRs where appropriate.",
  "rows": [
   {
    "roll": 1,
    "text": "Short-handed: half as many.",
    "crewMultiplier": 0.5
   },
   {
    "roll": [
     2,
     3
    ],
    "text": "Standard crew.",
    "crewMultiplier": 1
   },
   {
    "roll": [
     4,
     5
    ],
    "text": "Ready for war: twice as many.",
    "crewMultiplier": 2
   },
   {
    "roll": 6,
    "text": "Ready to raid: as many as possible.",
    "crewMultiplier": "max"
   }
  ],
  "group": "Ships at Sea"
 },
 "crewQuality": {
  "id": "crewQuality",
  "name": "Crew Quality",
  "die": "2d6",
  "page": 114,
  "source": "Core Rules",
  "note": "Modify DRs where appropriate.",
  "rows": [
   {
    "roll": [
     2,
     3
    ],
    "text": "Near mutiny and/or untrained."
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Miserable and/or novice."
   },
   {
    "roll": [
     7,
     8
    ],
    "text": "Average."
   },
   {
    "roll": [
     9,
     10
    ],
    "text": "Fresh from shore leave and/or experienced."
   },
   {
    "roll": [
     11,
     12
    ],
    "text": "Prosperous/loyal and/or military training."
   }
  ],
  "group": "Ships at Sea"
 },
 "shipName": {
  "id": "shipName",
  "name": "Ship Name",
  "die": "d66",
  "page": 114,
  "source": "Core Rules",
  "columns": [
   {
    "die": "d66",
    "name": "Name",
    "values": [
     "Banshee's Wail",
     "Revenant",
     "Void Ripper",
     "Mermaid's Tear",
     "Carrion Crow",
     "Executioner's Hand",
     "Poseidon's Rage",
     "Adventure's Ghost",
     "Widow's Revenge",
     "Blood Moon",
     "Devil's Scorn",
     "Gilded Parrot",
     "Monolith",
     "Black Tide",
     "Raven's Wrath",
     "Coral Corsair",
     "Hellspire",
     "Vendetta",
     "Crimson Tempest",
     "Royal Tomb",
     "Guillotine",
     "Neptune's Maiden",
     "Cadaver's Call",
     "Heart of the Sea",
     "Demonwake",
     "Bride of the Abyss",
     "Annihilation",
     "Golden Glaive",
     "Necrobile",
     "Grave Witch",
     "Loa's Lament",
     "Hunsi Kanzo",
     "Dragon from the Deep",
     "Leviathan's Flood",
     "Kraken's Maw",
     "Harlequin's Curse"
    ]
   }
  ],
  "rows": [
   {
    "roll": 11,
    "text": "Banshee's Wail"
   },
   {
    "roll": 12,
    "text": "Revenant"
   },
   {
    "roll": 13,
    "text": "Void Ripper"
   },
   {
    "roll": 14,
    "text": "Mermaid's Tear"
   },
   {
    "roll": 15,
    "text": "Carrion Crow"
   },
   {
    "roll": 16,
    "text": "Executioner's Hand"
   },
   {
    "roll": 21,
    "text": "Poseidon's Rage"
   },
   {
    "roll": 22,
    "text": "Adventure's Ghost"
   },
   {
    "roll": 23,
    "text": "Widow's Revenge"
   },
   {
    "roll": 24,
    "text": "Blood Moon"
   },
   {
    "roll": 25,
    "text": "Devil's Scorn"
   },
   {
    "roll": 26,
    "text": "Gilded Parrot"
   },
   {
    "roll": 31,
    "text": "Monolith"
   },
   {
    "roll": 32,
    "text": "Black Tide"
   },
   {
    "roll": 33,
    "text": "Raven's Wrath"
   },
   {
    "roll": 34,
    "text": "Coral Corsair"
   },
   {
    "roll": 35,
    "text": "Hellspire"
   },
   {
    "roll": 36,
    "text": "Vendetta"
   },
   {
    "roll": 41,
    "text": "Crimson Tempest"
   },
   {
    "roll": 42,
    "text": "Royal Tomb"
   },
   {
    "roll": 43,
    "text": "Guillotine"
   },
   {
    "roll": 44,
    "text": "Neptune's Maiden"
   },
   {
    "roll": 45,
    "text": "Cadaver's Call"
   },
   {
    "roll": 46,
    "text": "Heart of the Sea"
   },
   {
    "roll": 51,
    "text": "Demonwake"
   },
   {
    "roll": 52,
    "text": "Bride of the Abyss"
   },
   {
    "roll": 53,
    "text": "Annihilation"
   },
   {
    "roll": 54,
    "text": "Golden Glaive"
   },
   {
    "roll": 55,
    "text": "Necrobile"
   },
   {
    "roll": 56,
    "text": "Grave Witch"
   },
   {
    "roll": 61,
    "text": "Loa's Lament"
   },
   {
    "roll": 62,
    "text": "Hunsi Kanzo"
   },
   {
    "roll": 63,
    "text": "Dragon from the Deep"
   },
   {
    "roll": 64,
    "text": "Leviathan's Flood"
   },
   {
    "roll": 65,
    "text": "Kraken's Maw"
   },
   {
    "roll": 66,
    "text": "Harlequin's Curse"
   }
  ],
  "group": "Ships at Sea"
 },
 "cargoMundane": {
  "id": "cargoMundane",
  "name": "Mundane Cargo",
  "die": "d12",
  "page": 115,
  "source": "Core Rules",
  "note": "Values in silver; ±50% from port to port. 12 = roll Special Cargo.",
  "rows": [
   {
    "roll": 1,
    "text": "food or crops, 250s",
    "value": 250
   },
   {
    "roll": 2,
    "text": "spices or oils, 350s",
    "value": 350
   },
   {
    "roll": 3,
    "text": "trade goods, 400s",
    "value": 400
   },
   {
    "roll": 4,
    "text": "livestock, 400s",
    "value": 400
   },
   {
    "roll": 5,
    "text": "sugar, 500s",
    "value": 500
   },
   {
    "roll": 6,
    "text": "rum, 1000s",
    "value": 1000
   },
   {
    "roll": 7,
    "text": "munitions, 2000s",
    "value": 2000
   },
   {
    "roll": 8,
    "text": "tobacco, 1000s",
    "value": 1000
   },
   {
    "roll": 9,
    "text": "wine, 2000s",
    "value": 2000
   },
   {
    "roll": 10,
    "text": "antiques, 2000s",
    "value": 2000
   },
   {
    "roll": 11,
    "text": "lumber, 1000s",
    "value": 1000
   },
   {
    "roll": 12,
    "text": "special cargo",
    "table": "cargoSpecial"
   }
  ],
  "group": "Cargo"
 },
 "cargoSpecial": {
  "id": "cargoSpecial",
  "name": "Special Cargo",
  "die": "d12",
  "page": 115,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "raw silver ore, 5000s",
    "value": 5000
   },
   {
    "roll": 2,
    "text": "golden coins and treasures, 10000s",
    "value": 10000
   },
   {
    "roll": 3,
    "text": "religious leader(s)"
   },
   {
    "roll": 4,
    "text": "important prisoner(s)"
   },
   {
    "roll": 5,
    "text": "political or military figure(s)"
   },
   {
    "roll": 6,
    "text": "relics or a rare artifact, 4000s",
    "value": 4000
   },
   {
    "roll": 7,
    "text": "sea monster bones, 2500s",
    "value": 2500
   },
   {
    "roll": 8,
    "text": "exotic animals, 2000s",
    "value": 2000
   },
   {
    "roll": 9,
    "text": "d10 locked chests, 2d8 x 100s each",
    "value": "2d8 × 100s each",
    "count": "d10"
   },
   {
    "roll": 10,
    "text": "d20 crates of ASH, see pg. 10",
    "count": "d20",
    "ash": true
   },
   {
    "roll": 11,
    "text": "imprisoned undead"
   },
   {
    "roll": 12,
    "text": "a sorcerer with a tome of d4 Arcane Rituals (pg. 64)",
    "table": "rituals"
   }
  ],
  "group": "Cargo"
 },
 "cargoPlotTwist": {
  "id": "cargoPlotTwist",
  "name": "Optional Plot Twist",
  "die": "d8",
  "page": 115,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Deadly disease on board."
   },
   {
    "roll": 2,
    "text": "Crew are impostors."
   },
   {
    "roll": 3,
    "text": "Crew is mute."
   },
   {
    "roll": 4,
    "text": "The PCs know this crew."
   },
   {
    "roll": 5,
    "text": "Everyone on board was thought to be dead."
   },
   {
    "roll": 6,
    "text": "Ghost ship."
   },
   {
    "roll": 7,
    "text": "They're all zombies."
   },
   {
    "roll": 8,
    "text": "Someone on board is related to a PC's backstory."
   }
  ],
  "group": "Cargo"
 },
 "derelictWhere": {
  "id": "derelictWhere",
  "name": "Where Is It?",
  "die": "d12",
  "page": 116,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "shallow waters (submerged at high tide)"
   },
   {
    "roll": 2,
    "text": "suspended on shoals (half underwater)"
   },
   {
    "roll": 3,
    "text": "beach wrecked"
   },
   {
    "roll": 4,
    "text": "adrift at sea"
   },
   {
    "roll": 5,
    "text": "anchored off the coast"
   },
   {
    "roll": 6,
    "text": "suspended on rocks or a coastal cliff"
   },
   {
    "roll": 7,
    "text": "up a dried-up riverbed"
   },
   {
    "roll": 8,
    "text": "in the middle of the jungle, forest, or desert"
   },
   {
    "roll": 9,
    "text": "drifting into port"
   },
   {
    "roll": 10,
    "text": "orbiting a maelstrom"
   },
   {
    "roll": 11,
    "text": "floating the waters that lead to the underworld"
   },
   {
    "roll": 12,
    "text": "in the nightmares of cursed sailors"
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictType": {
  "id": "derelictType",
  "name": "Type of Ship",
  "die": "d12",
  "page": 116,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "several ships fastened together (roll d2 more times)",
    "rollAgain": "d2"
   },
   {
    "roll": 2,
    "text": "sloop",
    "ship": "sloop"
   },
   {
    "roll": 3,
    "text": "tartane",
    "ship": "tartane"
   },
   {
    "roll": 4,
    "text": "giant jury-rigged raft",
    "ship": "raft"
   },
   {
    "roll": 5,
    "text": "brigantine",
    "ship": "brigantine"
   },
   {
    "roll": 6,
    "text": "frigate",
    "ship": "frigate"
   },
   {
    "roll": 7,
    "text": "ancient vessel",
    "ship": "galley"
   },
   {
    "roll": 8,
    "text": "galleon",
    "ship": "galleon"
   },
   {
    "roll": 9,
    "text": "fluyt",
    "ship": "fluyt"
   },
   {
    "roll": 10,
    "text": "man-of-war",
    "ship": "man-of-war"
   },
   {
    "roll": 11,
    "text": "ship of the line",
    "ship": "ship-of-the-line"
   },
   {
    "roll": 12,
    "text": "otherworldly"
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictWhatHappened": {
  "id": "derelictWhatHappened",
  "name": "What Happened Here?",
  "die": "d8",
  "page": 116,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "demolished during a storm or hurricane"
   },
   {
    "roll": 2,
    "text": "abandoned for an unknown reason, mostly intact"
   },
   {
    "roll": 3,
    "text": "ripped in two by a monster from the deep"
   },
   {
    "roll": 4,
    "text": "run aground or scrapped some shoals"
   },
   {
    "roll": 5,
    "text": "raided by blood-thirsty undead"
   },
   {
    "roll": 6,
    "text": "destroyed in naval combat"
   },
   {
    "roll": 7,
    "text": "wrecked in foggy conditions"
   },
   {
    "roll": 8,
    "text": "mutiny fueled blood bath"
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictRoom": {
  "id": "derelictRoom",
  "name": "In One of the Rooms",
  "die": "d8",
  "page": 116,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "filled with large eggs"
   },
   {
    "roll": 2,
    "text": "bodies of former crew, freshly dead, terror on their faces"
   },
   {
    "roll": 3,
    "text": "indecipherable glyphs carved into the wood beams"
   },
   {
    "roll": 4,
    "text": "water damaged books and letters"
   },
   {
    "roll": 5,
    "text": "hundreds of eyeballs hanging from strings"
   },
   {
    "roll": 6,
    "text": "a gaping hole in the hull"
   },
   {
    "roll": 7,
    "text": "rotting food and animal corpses"
   },
   {
    "roll": 8,
    "text": "glass bottles filled with [d6]: 1 rum, 2 potions (pg. 70), 3 fortified wine, 4 blood, 5 holy water, 6 excrement (human?)",
    "sub": {
     "die": "d6",
     "rows": [
      {
       "roll": 1,
       "text": "rum"
      },
      {
       "roll": 2,
       "text": "potions (pg. 70)",
       "table": "alchemy"
      },
      {
       "roll": 3,
       "text": "fortified wine"
      },
      {
       "roll": 4,
       "text": "blood"
      },
      {
       "roll": 5,
       "text": "holy water"
      },
      {
       "roll": 6,
       "text": "excrement (human?)"
      }
     ]
    }
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictOddFeature": {
  "id": "derelictOddFeature",
  "name": "Odd Feature",
  "die": "d12",
  "page": 117,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "walls and floor covered in coral and barnacles"
   },
   {
    "roll": 2,
    "text": "piles of bleached white bones throughout"
   },
   {
    "roll": 3,
    "text": "hundreds of small crab's nests"
   },
   {
    "roll": 4,
    "text": "cargo hold is filled with 6\" of blood"
   },
   {
    "roll": 5,
    "text": "charred wood and fire damage"
   },
   {
    "roll": 6,
    "text": "faintly glows in the dark"
   },
   {
    "roll": 7,
    "text": "mysterious slime covers most surfaces"
   },
   {
    "roll": 8,
    "text": "ornately decorated in gold leaf and velvet"
   },
   {
    "roll": 9,
    "text": "a thick layer of ash coats everything"
   },
   {
    "roll": 10,
    "text": "gravity behaves as if underwater"
   },
   {
    "roll": 11,
    "text": "signs of torture, sacrifice, and blood-letting"
   },
   {
    "roll": 12,
    "text": "bioluminescent plants bloom from hull at night"
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictDevelopment": {
  "id": "derelictDevelopment",
  "name": "Development",
  "die": "d8",
  "page": 117,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Sails! Ship spotted."
   },
   {
    "roll": 2,
    "text": "Derelict starts to sink or collapse."
   },
   {
    "roll": 3,
    "text": "Adversaries arrive: other pirates, monsters, the military."
   },
   {
    "roll": 4,
    "text": "Explosion or fire."
   },
   {
    "roll": 5,
    "text": "Extreme weather."
   },
   {
    "roll": 6,
    "text": "Thing from the deep complicates things."
   },
   {
    "roll": 7,
    "text": "Undead floating nearby."
   },
   {
    "roll": 8,
    "text": "A stowaway emerges."
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictOccupant": {
  "id": "derelictOccupant",
  "name": "Current Occupant",
  "die": "d12",
  "page": 117,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Ghosts of dead sailors. Their speech sounds like whale song.",
    "monster": "ghost-crew"
   },
   {
    "roll": 2,
    "text": "Poisonous necro-plague rats, their mother the size of a wolf.",
    "monster": "bilge-rat"
   },
   {
    "roll": 3,
    "text": "Dormant zombies waiting for fresh brains, their smell detectable for miles.",
    "monster": "bilge-rat-zombie"
   },
   {
    "roll": 4,
    "text": "A starving crew of pirate-turned-cannibals, some with freshly missing limbs."
   },
   {
    "roll": 5,
    "text": "Skeleton marauders celebrating a recent raid. The captain is an asshole.",
    "monster": "skeleton-capn"
   },
   {
    "roll": 6,
    "text": "Cultists, chanting, summoning Great Old Ones via human sacrifice.",
    "monster": "cultists"
   },
   {
    "roll": 7,
    "text": "3 beautiful sirens. They lust for pearls and have a hoard hidden nearby.",
    "monster": "siren"
   },
   {
    "roll": 8,
    "text": "A tribe of intelligent goblin-like monkeys. They love shiny things and rum."
   },
   {
    "roll": 9,
    "text": "A necromancer living in exile with a pet undead jaguar or shark.",
    "monster": "the-necromancer"
   },
   {
    "roll": 10,
    "text": "Deep Ones, lead by a shaman, scouting for valuables. Her magic requires water.",
    "monster": "deep-ones"
   },
   {
    "roll": 11,
    "text": "Hundreds of carrion gulls, feasting on a corpse hanging from a mast.",
    "monster": "carrion-gull"
   },
   {
    "roll": 12,
    "text": "Dozens of blood drained corpses. A weakened vampire hides below deck."
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictCargo": {
  "id": "derelictCargo",
  "name": "Original Cargo",
  "die": "d20",
  "page": 117,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "tea leaves or spices"
   },
   {
    "roll": 2,
    "text": "art or antiques"
   },
   {
    "roll": 3,
    "text": "coffee beans"
   },
   {
    "roll": 4,
    "text": "sugar or sugar cane"
   },
   {
    "roll": 5,
    "text": "rum or wine"
   },
   {
    "roll": 6,
    "text": "weapons and ammo"
   },
   {
    "roll": 7,
    "text": "tobacco or cocoa"
   },
   {
    "roll": 8,
    "text": "exotic creatures"
   },
   {
    "roll": 9,
    "text": "rice or crops"
   },
   {
    "roll": 10,
    "text": "black powder [d100 barrels]"
   },
   {
    "roll": 11,
    "text": "contraband"
   },
   {
    "roll": 12,
    "text": "textiles"
   },
   {
    "roll": 13,
    "text": "sacrificial victims"
   },
   {
    "roll": 14,
    "text": "prisoners"
   },
   {
    "roll": 15,
    "text": "lumber"
   },
   {
    "roll": 16,
    "text": "livestock"
   },
   {
    "roll": 17,
    "text": "a large statue"
   },
   {
    "roll": 18,
    "text": "hoards of treasure"
   },
   {
    "roll": 19,
    "text": "native medicine"
   },
   {
    "roll": 20,
    "text": "a cursed relic"
   }
  ],
  "group": "Derelict Ship"
 },
 "derelictCondition": {
  "id": "derelictCondition",
  "name": "Cargo Condition",
  "die": "d6",
  "page": 117,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "missing or ruined",
    "valueMultiplier": 0
   },
   {
    "roll": [
     2,
     3
    ],
    "text": "salvageable (x1/2)",
    "valueMultiplier": 0.5
   },
   {
    "roll": [
     4,
     5
    ],
    "text": "good (x1)",
    "valueMultiplier": 1
   },
   {
    "roll": 6,
    "text": "rare and valuable (x2)",
    "valueMultiplier": 2
   }
  ],
  "group": "Derelict Ship"
 },
 "buriedTreasure": {
  "id": "buriedTreasure",
  "name": "Buried Treasure",
  "die": "d100",
  "page": 118,
  "source": "Core Rules",
  "note": "Roll d100 for what lies in the chest.",
  "rows": [
   {
    "roll": 1,
    "text": "The Black Spot on a folded piece of paper. Whoever unfolds it dies in d8 days (unless they find a way to lift the curse)."
   },
   {
    "roll": 2,
    "text": "A Spanish gold treasure hoard worth 50,000s. They want it back NOW."
   },
   {
    "roll": 3,
    "text": "3 flags: British, Spanish, French. One torn, one blood spattered, one outdated."
   },
   {
    "roll": 4,
    "text": "Freshly decapitated head. It looks exactly like one of the PCs. In its mouth is a pearl the size of a plum."
   },
   {
    "roll": 5,
    "text": "Emerald the size of a coconut."
   },
   {
    "roll": 6,
    "text": "6 stylized animal heads carved from wood, one on top of the next."
   },
   {
    "roll": 7,
    "text": "7 rare gold coins worth d100 silver each."
   },
   {
    "roll": 8,
    "text": "Each player rolls all of the dice they have with them: the total in silver.",
    "silver": "all dice"
   },
   {
    "roll": 9,
    "text": "An enormous dinosaur bone."
   },
   {
    "roll": 10,
    "text": "2 black flintlocks, the name \"Blackwood\" engraved on both. DR -1 to hit."
   },
   {
    "roll": 11,
    "text": "A bag of marbles."
   },
   {
    "roll": 12,
    "text": "Thick leather belt, an iron kraken buckle. Wearer gets +1 STRENGTH."
   },
   {
    "roll": 13,
    "text": "A pure white flintlock pistol. It crits on 18+ but shatters on a fumble."
   },
   {
    "roll": 14,
    "text": "Half of a metal medallion."
   },
   {
    "roll": 15,
    "text": "15 dead men on a dead man's chest. The crew learns 1 random Shanty (pg. 68).",
    "table": "shanties"
   },
   {
    "roll": 16,
    "text": "An elaborate brass anchor."
   },
   {
    "roll": 17,
    "text": "An ancient circular stone calendar. Its last entry is the day after tomorrow..."
   },
   {
    "roll": 18,
    "text": "5,000 gold coins (they are painted wood)."
   },
   {
    "roll": 19,
    "text": "D6 black candles. Burning them makes all other light sources dim by half."
   },
   {
    "roll": 20,
    "text": "D20 silver bars (50s each)."
   },
   {
    "roll": 21,
    "text": "8' marble statue of a sea monster with rubies for eyes."
   },
   {
    "roll": 22,
    "text": "Detailed journal with drawings and descriptions of the local flora and fauna."
   },
   {
    "roll": 23,
    "text": "Golden crown and scepter."
   },
   {
    "roll": 24,
    "text": "A flute carved from a femur."
   },
   {
    "roll": 25,
    "text": "D6 bladders from some sea creature. Each contains a potion (pg. 70).",
    "table": "alchemy",
    "count": "d6"
   },
   {
    "roll": 26,
    "text": "Jet black sphere."
   },
   {
    "roll": 27,
    "text": "Mother of pearl-encrusted lobster shell."
   },
   {
    "roll": 28,
    "text": "Black cannon in the shape of a dragon. A ship with it always deals +1 damage."
   },
   {
    "roll": 29,
    "text": "Book written in an ancient script. It contains the best recipes known to man."
   },
   {
    "roll": 30,
    "text": "300 dead monkeys."
   },
   {
    "roll": 31,
    "text": "Dead pirate captain. There is a 2,000s reward for his head."
   },
   {
    "roll": 32,
    "text": "32 golden teeth and a set of silver pliers."
   },
   {
    "roll": 33,
    "text": "Skeleton of a small animal."
   },
   {
    "roll": 34,
    "text": "Single golden arrow."
   },
   {
    "roll": 35,
    "text": "35' of hempen rope that will (almost) never break."
   },
   {
    "roll": 36,
    "text": "Small sandstone pyramid. Smashing it reveals a black diamond worth 2,000s."
   },
   {
    "roll": 37,
    "text": "Mesoan coin on a necklace."
   },
   {
    "roll": 38,
    "text": "703 pieces of eight in a wooden crate."
   },
   {
    "roll": 39,
    "text": "Dark gemstones. Looking into them reveals an underwater location."
   },
   {
    "roll": 40,
    "text": "Ornate model frigate inside a bottle."
   },
   {
    "roll": 41,
    "text": "Large fang the size of a femur."
   },
   {
    "roll": 42,
    "text": "A fine wooden armoire. Inside are d12 outfits fit for royalty."
   },
   {
    "roll": 43,
    "text": "Iron scarab. On sand it explodes for d6 damage, underwater it swims to treasure."
   },
   {
    "roll": 44,
    "text": "Large jar filled with 2d20 dried seahorses. Eating one recovers 1 HP. Don't eat too many..."
   },
   {
    "roll": 45,
    "text": "Pair of finely crafted boots. +1 AGILITY."
   },
   {
    "roll": 46,
    "text": "Bloody leather bag with 3 silver rings, 7 stone rings, and 9 iron rings."
   },
   {
    "roll": 47,
    "text": "Polished obsidian disc. If you look at the sun through it you immediately gain experience, then it shatters.",
    "experience": true
   },
   {
    "roll": 48,
    "text": "4' x 8' stone slab covered in glyphs. It depicts a woman entering a portal."
   },
   {
    "roll": 49,
    "text": "Carved ivory sailing ship."
   },
   {
    "roll": 50,
    "text": "Sarcophagus (5,000s). Inside is a scepter that turns human ashes into silver dust."
   },
   {
    "roll": 51,
    "text": "Dark green cloak. +1 PRESENCE."
   },
   {
    "roll": 52,
    "text": "D20 bottles of the finest rum ever made."
   },
   {
    "roll": 53,
    "text": "Barrel-sized egg. The inside stirs..."
   },
   {
    "roll": 54,
    "text": "Taxidermy dog. In its belly is a severed hand holding a set of keys."
   },
   {
    "roll": 55,
    "text": "Severed finger. If rested on a map it will point to a lost city of gold."
   },
   {
    "roll": 56,
    "text": "D4 barrels filled with blood."
   },
   {
    "roll": 57,
    "text": "Smoking pipe shaped like a galleon."
   },
   {
    "roll": 58,
    "text": "Hollow cannonball. Inside: a map."
   },
   {
    "roll": 59,
    "text": "Clay dagger with glyphs carved in the blade. Read them: learn one random ritual (pg. 64) then it crumbles.",
    "table": "rituals"
   },
   {
    "roll": 60,
    "text": "Chest with 4 different colored vials."
   },
   {
    "roll": 61,
    "text": "A figurehead of a gorgeous woman. If attached to a ship, it comes alive and screams in terror."
   },
   {
    "roll": 62,
    "text": "Clay jar filled with 13 snakes."
   },
   {
    "roll": 63,
    "text": "A skeleton key, pg. 63.",
    "relic": "skeleton-key"
   },
   {
    "roll": 64,
    "text": "Locked iron box. Inside is a rotten head that can speak. It knows the way to Hell."
   },
   {
    "roll": 65,
    "text": "Set of 6 jade goblets."
   },
   {
    "roll": 66,
    "text": "Everything within 66' dies immediately. (Optional: all PCs gain the Haunted Soul: Skeleton class until the treasure is reburied.)"
   },
   {
    "roll": 67,
    "text": "Silver bracelet of a snake eating its tail."
   },
   {
    "roll": 68,
    "text": "Handheld crystal mirror."
   },
   {
    "roll": 69,
    "text": "3d20 large pearls."
   },
   {
    "roll": 70,
    "text": "Collection of exotic bird feathers (300s)."
   },
   {
    "roll": 71,
    "text": "Shriveled heart. It starts beating if submerged in sea water."
   },
   {
    "roll": 72,
    "text": "Wood coffin. Inside is (d4): 1 a skeleton 2 a mummy 3 a vampire 4 1,000s."
   },
   {
    "roll": 73,
    "text": "Map of the Dark Caribbean. A trail of blood appears along your path."
   },
   {
    "roll": 74,
    "text": "Jaguar skull made of diamond."
   },
   {
    "roll": 75,
    "text": "Key made of water. Glows if submerged."
   },
   {
    "roll": 76,
    "text": "Jade gecko wrapped around a coconut sized granite globe."
   },
   {
    "roll": 77,
    "text": "Vial of water. Drinking it secretly gives d100 HP."
   },
   {
    "roll": 78,
    "text": "Satchel of hauntingly poetic love letters."
   },
   {
    "roll": 79,
    "text": "Chess set carved from onyx and jade."
   },
   {
    "roll": 80,
    "text": "Wood tube with d6 scrolls, each with a different Ritual (pg. 64). They always succeed but burn up once used.",
    "table": "rituals",
    "count": "d6"
   },
   {
    "roll": 81,
    "text": "Stone tankard, covered with Mesoan glyphs. It never runs out of ale."
   },
   {
    "roll": 82,
    "text": "Golden peg leg."
   },
   {
    "roll": 83,
    "text": "Gold ship's bell. Ringing it changes the winds direction."
   },
   {
    "roll": 84,
    "text": "Plain gold ring with no signs of wear (in fire it projects a clue, pg. 121).",
    "table": "riddles"
   },
   {
    "roll": 85,
    "text": "A chest inside a chest. Roll again.",
    "rollAgain": 1
   },
   {
    "roll": 86,
    "text": "Necklace of bones, each with a different engraved rune. +1 TOUGHNESS."
   },
   {
    "roll": 87,
    "text": "Gray, pointy hat. Wearer gets +1 SPIRIT."
   },
   {
    "roll": 88,
    "text": "Trident etched with antediluvian runes."
   },
   {
    "roll": 89,
    "text": "Bronze skull with d2 gems for eyes."
   },
   {
    "roll": 90,
    "text": "Bullwhip. Hits on DR8, d6 dmg, 10' range."
   },
   {
    "roll": 91,
    "text": "Amulet of the Sun. Elaborately carved, Ancient, and extremely valuable."
   },
   {
    "roll": 92,
    "text": "A large crate. d100 skulls are inside."
   },
   {
    "roll": 93,
    "text": "Volcanic glass sculpture of an island. Holding it to the sun reveals a small ruby inside. It's a map."
   },
   {
    "roll": 94,
    "text": "Spyglass. It seems broken, but actually peers 24 hours into the past."
   },
   {
    "roll": 95,
    "text": "Book of 7 maps in 7 different languages. Each is of a different small island."
   },
   {
    "roll": 96,
    "text": "3 turtles shells of different colors. Each is filled with gems worth d100 silver."
   },
   {
    "roll": 97,
    "text": "Go. A bag of black stones, a bag of white stones, and a bamboo game board."
   },
   {
    "roll": 98,
    "text": "Oil lamp. (The genie inside will grant one wish, but in the worst way possible)."
   },
   {
    "roll": 99,
    "text": "A wooden box with 24 stacks of 20 gold coins (500s each) and 6 loaded flintlocks."
   },
   {
    "roll": 100,
    "text": "1 million pieces of eight. Good luck."
   }
  ],
  "group": "Loot & Treasure"
 },
 "mapType": {
  "id": "mapType",
  "name": "Type of Map",
  "die": "d4",
  "page": 119,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "name": "Simple",
    "text": "Simple. A geographic area, X marks the spot."
   },
   {
    "roll": 2,
    "name": "Point Crawl",
    "text": "Point Crawl. The map shows several icons (pg. 120), but they must be traveled to sequentially to find the next one."
   },
   {
    "roll": 3,
    "name": "Scavenger Hunt",
    "text": "Scavenger Hunt. The map has only one point of interest or one clue, but finding it reveals more maps or clues."
   },
   {
    "roll": 4,
    "name": "Arcane",
    "text": "Arcane. The map only reveals the next step when the previous one is completed."
   }
  ],
  "group": "Treasure Maps"
 },
 "mapMaterial": {
  "id": "mapMaterial",
  "name": "Material",
  "die": "d12",
  "page": 119,
  "source": "Core Rules",
  "rows": [
   {
    "roll": [
     1,
     4
    ],
    "text": "Parchment paper."
   },
   {
    "roll": 5,
    "text": "In an old book."
   },
   {
    "roll": 6,
    "text": "Only in someone's mind or memories."
   },
   {
    "roll": 7,
    "text": "Burnt into leather."
   },
   {
    "roll": 8,
    "text": "Whittled into a bone or skull."
   },
   {
    "roll": 9,
    "text": "Minted on a unique coin."
   },
   {
    "roll": 10,
    "text": "Embossed into a sea turtle shell."
   },
   {
    "roll": 11,
    "text": "Scratched into driftwood."
   },
   {
    "roll": 12,
    "text": "Etched into a glass bottle."
   }
  ],
  "group": "Treasure Maps"
 },
 "mapGeography": {
  "id": "mapGeography",
  "name": "Geography",
  "die": "d8",
  "page": 119,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Island"
   },
   {
    "roll": 2,
    "text": "Coast"
   },
   {
    "roll": 3,
    "text": "Peninsula"
   },
   {
    "roll": 4,
    "text": "Cove"
   },
   {
    "roll": 5,
    "text": "Archipelago"
   },
   {
    "roll": 6,
    "text": "River"
   },
   {
    "roll": 7,
    "text": "Lake"
   },
   {
    "roll": 8,
    "text": "Inland"
   }
  ],
  "group": "Treasure Maps"
 },
 "mapStarts": {
  "id": "mapStarts",
  "name": "It Starts…",
  "die": "d6",
  "page": 119,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "at a totally unknown location."
   },
   {
    "roll": 2,
    "text": "nearby."
   },
   {
    "roll": 3,
    "text": "within a mile."
   },
   {
    "roll": 4,
    "text": "a day's walk away."
   },
   {
    "roll": 5,
    "text": "a day's sail away."
   },
   {
    "roll": 6,
    "text": "near a well known place."
   }
  ],
  "group": "Treasure Maps"
 },
 "mapInvisibleInk": {
  "id": "mapInvisibleInk",
  "name": "The Invisible Ink Is Revealed…",
  "die": "d10",
  "page": 119,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "with heat or fire."
   },
   {
    "roll": 2,
    "text": "under star or moon light."
   },
   {
    "roll": 3,
    "text": "during an eclipse."
   },
   {
    "roll": 4,
    "text": "when underwater."
   },
   {
    "roll": 5,
    "text": "if soaked in alcohol."
   },
   {
    "roll": 6,
    "text": "with magic or a ritual."
   },
   {
    "roll": 7,
    "text": "when you speak the password."
   },
   {
    "roll": 8,
    "text": "when near a key location or object."
   },
   {
    "roll": 9,
    "text": "during the solstice or equinox."
   },
   {
    "roll": 10,
    "text": "at a certain time of day."
   }
  ],
  "group": "Treasure Maps"
 },
 "mapComplication": {
  "id": "mapComplication",
  "name": "Complication",
  "die": "d8",
  "page": 119,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Another crew is there when the PCs arrive."
   },
   {
    "roll": 2,
    "text": "Monsters guard it."
   },
   {
    "roll": 3,
    "text": "It has already been found or is missing."
   },
   {
    "roll": 4,
    "text": "It's cursed."
   },
   {
    "roll": 5,
    "text": "There are hundreds of corpses."
   },
   {
    "roll": 6,
    "text": "The PCs become incredibly lost on the way."
   },
   {
    "roll": 7,
    "text": "The whole thing is a setup."
   },
   {
    "roll": 8,
    "text": "There is so much treasure everyone becomes murderously paranoid."
   }
  ],
  "group": "Treasure Maps"
 },
 "mapIcons": {
  "id": "mapIcons",
  "name": "Icons",
  "die": "d20",
  "page": 120,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "rope bridge"
   },
   {
    "roll": 2,
    "text": "waterfall"
   },
   {
    "roll": 3,
    "text": "volcano caldera"
   },
   {
    "roll": 4,
    "text": "skull rock"
   },
   {
    "roll": 5,
    "text": "wicked tree"
   },
   {
    "roll": 6,
    "text": "jungle"
   },
   {
    "roll": 7,
    "text": "beach caves"
   },
   {
    "roll": 8,
    "text": "whale graveyard"
   },
   {
    "roll": 9,
    "text": "white sand beach"
   },
   {
    "roll": 10,
    "text": "lagoon"
   },
   {
    "roll": 11,
    "text": "ancient ruins"
   },
   {
    "roll": 12,
    "text": "burnt down cabin"
   },
   {
    "roll": 13,
    "text": "swamp"
   },
   {
    "roll": 14,
    "text": "shipwreck"
   },
   {
    "roll": 15,
    "text": "cliff side"
   },
   {
    "roll": 16,
    "text": "large hill"
   },
   {
    "roll": 17,
    "text": "quicksand"
   },
   {
    "roll": 18,
    "text": "mountain's peak"
   },
   {
    "roll": 19,
    "text": "highest point"
   },
   {
    "roll": 20,
    "text": "lowest point"
   }
  ],
  "group": "Treasure Maps"
 },
 "mapClueContainer": {
  "id": "mapClueContainer",
  "name": "Clue Container",
  "die": "d10",
  "page": 120,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Note in a scroll case."
   },
   {
    "roll": 2,
    "text": "Small stone, instructions carved underneath."
   },
   {
    "roll": 3,
    "text": "Coconut shell."
   },
   {
    "roll": 4,
    "text": "Message in a bottle."
   },
   {
    "roll": 5,
    "text": "Metal plaque."
   },
   {
    "roll": 6,
    "text": "Letter in a small box."
   },
   {
    "roll": 7,
    "text": "Etched cannon ball."
   },
   {
    "roll": 8,
    "text": "Burnt or carved into wood."
   },
   {
    "roll": 9,
    "text": "Dried blood on a skull."
   },
   {
    "roll": 10,
    "text": "A potion. The drinker \"knows\" the next clue, but TOUGHNESS DR12 or becomes poisoned.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 12
    }
   }
  ],
  "group": "Treasure Maps"
 },
 "mapDirection": {
  "id": "mapDirection",
  "name": "Direction",
  "die": "d8",
  "page": 120,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "north"
   },
   {
    "roll": 2,
    "text": "northeast"
   },
   {
    "roll": 3,
    "text": "east"
   },
   {
    "roll": 4,
    "text": "southeast"
   },
   {
    "roll": 5,
    "text": "south"
   },
   {
    "roll": 6,
    "text": "southwest"
   },
   {
    "roll": 7,
    "text": "west"
   },
   {
    "roll": 8,
    "text": "northwest"
   }
  ],
  "group": "Treasure Maps"
 },
 "mapMarkers": {
  "id": "mapMarkers",
  "name": "Markers",
  "die": "d20",
  "page": 120,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "large boulder"
   },
   {
    "roll": 2,
    "text": "dead man's bones"
   },
   {
    "roll": 3,
    "text": "makeshift grave"
   },
   {
    "roll": 4,
    "text": "old anchor"
   },
   {
    "roll": 5,
    "text": "ruined rowboat"
   },
   {
    "roll": 6,
    "text": "lone palm tree"
   },
   {
    "roll": 7,
    "text": "ship's wheel"
   },
   {
    "roll": 8,
    "text": "painted rock"
   },
   {
    "roll": 9,
    "text": "cannonball"
   },
   {
    "roll": 10,
    "text": "pile of skulls"
   },
   {
    "roll": 11,
    "text": "volcanic glass"
   },
   {
    "roll": 12,
    "text": "rusty cutlass"
   },
   {
    "roll": 13,
    "text": "broken oar"
   },
   {
    "roll": 14,
    "text": "broken barrel"
   },
   {
    "roll": 15,
    "text": "ruined cannon"
   },
   {
    "roll": 16,
    "text": "tallest tree"
   },
   {
    "roll": 17,
    "text": "strange sea shell"
   },
   {
    "roll": 18,
    "text": "rotting crate"
   },
   {
    "roll": 19,
    "text": "stone statue"
   },
   {
    "roll": 20,
    "text": "tombstone"
   }
  ],
  "group": "Treasure Maps"
 },
 "riddles": {
  "id": "riddles",
  "name": "Riddles",
  "die": "d12",
  "page": 121,
  "source": "Core Rules",
  "note": "Fill [icon], [marker] and [direction] from the tables on pg. 120. The `answer` is the GM's explanation.",
  "rows": [
   {
    "roll": 1,
    "text": "Arrive at the [icon] but you won't see the [marker] in the light, travel [2d6] paces to the [direction] and wait until day turns to night.",
    "answer": "The marker only appears in the dark."
   },
   {
    "roll": 2,
    "text": "Set your course for the [icon] and ready a shanty, for singing near the [marker] will turn \"none\" into \"plenty\".",
    "answer": "The treasure or clue appears once music is played."
   },
   {
    "roll": 3,
    "text": "Find the [marker] by the [icon], ye soothsayers and witches, for only magic or prayers can lead to these riches.",
    "answer": "Using a Relic, Ritual, Spell, or Prayer magically reveals the clue or treasure."
   },
   {
    "roll": 4,
    "text": "Look not high for salvation, but low for an X, crossed trees you will find, but beware of the hex.",
    "answer": "Two fallen trees cover the clue or treasure; it's booby trapped."
   },
   {
    "roll": 5,
    "text": "In shallow waters near [icon] the [marker] rests under waves, it points in the direction of nearby caves.",
    "answer": "The marker has a carved or painted arrow that points to a nearby cave with the clue/treasure."
   },
   {
    "roll": 6,
    "text": "Head [d8 x 10] paces [direction] of the [icon] then dig a hole, under the [marker] lies the key to your goal.",
    "answer": "Dig for the clue/treasure."
   },
   {
    "roll": 7,
    "text": "Make for the [icon] before the sun hits the sea, the secret lies between the [marker] and a tree.",
    "answer": "Can't be found during the night."
   },
   {
    "roll": 8,
    "text": "Only dead men know this hidden locale, for of all who've seen the [marker] by the [icon] none have lived to tell.",
    "answer": "Tragedy, a trap, or both haunt this location."
   },
   {
    "roll": 9,
    "text": "Near [icon] at midnight the dead rise from their graves, but the one near the [marker] is a crooked-nosed knave.",
    "answer": "Harmless ghosts rise here at midnight, but one near the marker knows the location of the clue/treasure. He will only reveal it if his body, hanging from a nearby noose, is laid to rest."
   },
   {
    "roll": 10,
    "text": "Travel [direction] for 2d2 miles, find the [icon] then rest, only candlelight will reveal the [marker] over the chest.",
    "answer": "The marker only appears in candle light. The clue/treasure is under it."
   },
   {
    "roll": 11,
    "text": "From the [icon] at low tide you will be able to see, the [marker] just [direction] of a large fruit tree.",
    "answer": "The clue/treasure is buried in the shadow of the tree."
   },
   {
    "roll": 12,
    "text": "[Direction] of the [icon] you will find a sight rarely seen, find the [marker] that's hidden under a blanket of green.",
    "answer": "The marker is hidden under foliage, moss, or grass growing in an odd place."
   }
  ],
  "group": "Treasure Maps"
 },
 "islandSize": {
  "id": "islandSize",
  "name": "Size",
  "die": "d6",
  "page": 122,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Tiny."
   },
   {
    "roll": 2,
    "text": "Small."
   },
   {
    "roll": 3,
    "text": "Medium."
   },
   {
    "roll": 4,
    "text": "Large."
   },
   {
    "roll": 5,
    "text": "Large."
   },
   {
    "roll": 6,
    "text": "Huge."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandTerrain": {
  "id": "islandTerrain",
  "name": "Terrain",
  "die": "2d6",
  "page": 122,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "An atoll."
   },
   {
    "roll": 3,
    "text": "It's two islands."
   },
   {
    "roll": 4,
    "text": "Gentle hills."
   },
   {
    "roll": 5,
    "text": "Flat with a mountainous ridge."
   },
   {
    "roll": 6,
    "text": "Mostly flat."
   },
   {
    "roll": 7,
    "text": "Mostly flat."
   },
   {
    "roll": 8,
    "text": "Mostly flat."
   },
   {
    "roll": 9,
    "text": "Flat with one prominent hill."
   },
   {
    "roll": 10,
    "text": "Gentle hills."
   },
   {
    "roll": 11,
    "text": "A single mountain."
   },
   {
    "roll": 12,
    "text": "Mountainous and rugged."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandVegetation": {
  "id": "islandVegetation",
  "name": "Vegetation",
  "die": "2d6",
  "page": 122,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "One single palm tree."
   },
   {
    "roll": 3,
    "text": "Barren: rocks."
   },
   {
    "roll": 4,
    "text": "Swampy grasslands."
   },
   {
    "roll": 5,
    "text": "Thorny scrub."
   },
   {
    "roll": 6,
    "text": "Sand and meadows."
   },
   {
    "roll": 7,
    "text": "Fertile grasslands."
   },
   {
    "roll": 8,
    "text": "Fertile grasslands."
   },
   {
    "roll": 9,
    "text": "Fields and woods."
   },
   {
    "roll": 10,
    "text": "Small pine forests."
   },
   {
    "roll": 11,
    "text": "Forests and meadows."
   },
   {
    "roll": 12,
    "text": "Rainforest."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandFeature": {
  "id": "islandFeature",
  "name": "Prominent Natural Feature",
  "die": "2d6",
  "page": 122,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "Volcanic."
   },
   {
    "roll": 3,
    "text": "Huge sand dunes."
   },
   {
    "roll": 4,
    "text": "Numerous sea stacks."
   },
   {
    "roll": 5,
    "text": "Black sand beaches."
   },
   {
    "roll": 6,
    "text": "Lagoon."
   },
   {
    "roll": 7,
    "text": "Azure water, white sand."
   },
   {
    "roll": 8,
    "text": "Waterfall(s)."
   },
   {
    "roll": 9,
    "text": "Fruit trees."
   },
   {
    "roll": 10,
    "text": "Mangrove forest."
   },
   {
    "roll": 11,
    "text": "Sea cliffs."
   },
   {
    "roll": 12,
    "text": "A huge skull-shaped rock."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandAnimals": {
  "id": "islandAnimals",
  "name": "Notable Animal Inhabitants",
  "die": "2d6",
  "page": 122,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "Sharks. So many sharks."
   },
   {
    "roll": 3,
    "text": "Glowing jellyfish swarms."
   },
   {
    "roll": 4,
    "text": "Monkeys."
   },
   {
    "roll": 5,
    "text": "Fist sized orange beetles."
   },
   {
    "roll": 6,
    "text": "Sleek black seals."
   },
   {
    "roll": 7,
    "text": "Nothing to write home about."
   },
   {
    "roll": 8,
    "text": "Pigs and boars (large)."
   },
   {
    "roll": 9,
    "text": "Dog-sized lizards."
   },
   {
    "roll": 10,
    "text": "Large seabird colony."
   },
   {
    "roll": 11,
    "text": "Large flightless birds."
   },
   {
    "roll": 12,
    "text": "Dancing jewel-colored birds."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandInhabitants": {
  "id": "islandInhabitants",
  "name": "Inhabitants",
  "die": "2d6",
  "page": 122,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "A witch."
   },
   {
    "roll": 3,
    "text": "Pearl divers."
   },
   {
    "roll": 4,
    "text": "A robust but primitive city."
   },
   {
    "roll": 5,
    "text": "Small primitive village."
   },
   {
    "roll": 6,
    "text": "Recently struck camps."
   },
   {
    "roll": 7,
    "text": "Uninhabited."
   },
   {
    "roll": 8,
    "text": "Don't know, but they're all dead."
   },
   {
    "roll": 9,
    "text": "Religious adherents."
   },
   {
    "roll": 10,
    "text": "Farming settlers."
   },
   {
    "roll": 11,
    "text": "Military."
   },
   {
    "roll": 12,
    "text": "A hidden pirate town."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandHideTreasure": {
  "id": "islandHideTreasure",
  "name": "Best Place on the Island to Hide Treasure?",
  "die": "2d6",
  "page": 123,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "Old ruins."
   },
   {
    "roll": 3,
    "text": "A large rock shaped like a ship."
   },
   {
    "roll": 4,
    "text": "Under a huge lightning scarred oak."
   },
   {
    "roll": 5,
    "text": "A large natural rock arch."
   },
   {
    "roll": 6,
    "text": "An old lava tunnel."
   },
   {
    "roll": 7,
    "text": "Somewhere else."
   },
   {
    "roll": 8,
    "text": "Two palm trees cross in an X."
   },
   {
    "roll": 9,
    "text": "A large rock resembling a monkey."
   },
   {
    "roll": 10,
    "text": "A sink hole."
   },
   {
    "roll": 11,
    "text": "Near the strange ancient statues."
   },
   {
    "roll": 12,
    "text": "In the sea caves."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandFortune": {
  "id": "islandFortune",
  "name": "Anything Here Worth a Fortune?",
  "die": "2d6",
  "page": 123,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "Wealthy shipwreck survivors."
   },
   {
    "roll": 3,
    "text": "Rare poisons."
   },
   {
    "roll": 4,
    "text": "Oysters here make red pearls."
   },
   {
    "roll": 5,
    "text": "Buried treasure... somewhere."
   },
   {
    "roll": 6,
    "text": "An excellent natural harbor. Build a town!"
   },
   {
    "roll": 7,
    "text": "Not really. Good fishing though."
   },
   {
    "roll": 8,
    "text": "Not exactly, but there's a rich trade route nearby."
   },
   {
    "roll": 9,
    "text": "Caves of bat guano."
   },
   {
    "roll": 10,
    "text": "Wild horses."
   },
   {
    "roll": 11,
    "text": "Whale spawning grounds."
   },
   {
    "roll": 12,
    "text": "A naturally hidden, excellent harbor."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandHazards": {
  "id": "islandHazards",
  "name": "Natural Hazards",
  "die": "2d6",
  "page": 123,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "Manchineel trees. Everywhere."
   },
   {
    "roll": 3,
    "text": "Large whirlpools frequently form."
   },
   {
    "roll": 4,
    "text": "Quicksand."
   },
   {
    "roll": 5,
    "text": "Low lying areas flood. Frequently."
   },
   {
    "roll": 6,
    "text": "Coral reefs."
   },
   {
    "roll": 7,
    "text": "None."
   },
   {
    "roll": 8,
    "text": "Dangerous rocky shallows."
   },
   {
    "roll": 9,
    "text": "Dangerous currents."
   },
   {
    "roll": 10,
    "text": "Frequent earthquakes."
   },
   {
    "roll": 11,
    "text": "Animals infect humans with hemorrhagic fever."
   },
   {
    "roll": 12,
    "text": "A new volcano is about to erupt."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandConflicts": {
  "id": "islandConflicts",
  "name": "Current Conflicts",
  "die": "2d6",
  "page": 123,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "10 pirate ships here for a secret meeting."
   },
   {
    "roll": 3,
    "text": "Imperial fleet firing upon inhabitants."
   },
   {
    "roll": 4,
    "text": "Imperial military building an outpost."
   },
   {
    "roll": 5,
    "text": "Pirates just raided, or are about to."
   },
   {
    "roll": 6,
    "text": "Explorers hunting animals to extinction."
   },
   {
    "roll": 7,
    "text": "None."
   },
   {
    "roll": 8,
    "text": "Recent shipwreck. Survivors stranded."
   },
   {
    "roll": 9,
    "text": "Current inhabitants diseased."
   },
   {
    "roll": 10,
    "text": "Religious order building a mission."
   },
   {
    "roll": 11,
    "text": "A party of 6 ruthless treasure hunters is here (not including you...)."
   },
   {
    "roll": 12,
    "text": "Rebels."
   }
  ],
  "group": "Uncharted Islands"
 },
 "islandDarkness": {
  "id": "islandDarkness",
  "name": "Darkness",
  "die": "2d6",
  "page": 123,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 2,
    "text": "A kraken dwells here."
   },
   {
    "roll": 3,
    "text": "Cultists."
   },
   {
    "roll": 4,
    "text": "An ancient graveyard full of ghosts."
   },
   {
    "roll": 5,
    "text": "A ghost ship haunts its waters."
   },
   {
    "roll": 6,
    "text": "Ancient rock altar of sacrifice. Well used."
   },
   {
    "roll": 7,
    "text": "Nothing to speak of."
   },
   {
    "roll": 8,
    "text": "Unspeakable monstrosities wash up on shore often."
   },
   {
    "roll": 9,
    "text": "Animals that die here don't stay dead."
   },
   {
    "roll": 10,
    "text": "Zombies walk at night."
   },
   {
    "roll": 11,
    "text": "Blood spilled here animates."
   },
   {
    "roll": 12,
    "text": "If you eat the food or drink the water here you can never leave."
   }
  ],
  "group": "Uncharted Islands"
 },
 "pirateA": {
  "id": "pirateA",
  "name": "Table A — A…",
  "die": "d12",
  "page": 124,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "rugged individual"
   },
   {
    "roll": 2,
    "text": "shady vagabond"
   },
   {
    "roll": 3,
    "text": "scurvy gutter worm"
   },
   {
    "roll": 4,
    "text": "famous captain"
   },
   {
    "roll": 5,
    "text": "escaped prisoner"
   },
   {
    "roll": 6,
    "text": "wanted cutthroat"
   },
   {
    "roll": 7,
    "text": "notorious privateer"
   },
   {
    "roll": 8,
    "text": "cloaked figure"
   },
   {
    "roll": 9,
    "text": "rum-drunk goon"
   },
   {
    "roll": 10,
    "text": "horrific wretch"
   },
   {
    "roll": 11,
    "text": "cocky explorer"
   },
   {
    "roll": 12,
    "text": "dread pirate lord"
   }
  ],
  "group": "Pirate Generator",
  "note": "Roll 3d12 and read Tables A to C (save the dice): \"A [A] with [B] wielding a [C]\". The greatest die is its Morale; the lowest die +2 is its HP (double it for a mighty pirate). Whichever table rolled highest sets its armor: A no armor, B −d2, C −d4. Then roll d66 ×4 on the name table; they carry the highest result in silver."
 },
 "pirateB": {
  "id": "pirateB",
  "name": "Table B — with…",
  "die": "d12",
  "page": 124,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "horrible breath"
   },
   {
    "roll": 2,
    "text": "unmatched beauty"
   },
   {
    "roll": 3,
    "text": "a hook for a hand"
   },
   {
    "roll": 4,
    "text": "a fancy hat"
   },
   {
    "roll": 5,
    "text": "a makeshift peg leg"
   },
   {
    "roll": 6,
    "text": "barnacle covered skin"
   },
   {
    "roll": 7,
    "text": "calico clothing"
   },
   {
    "roll": 8,
    "text": "filthy rags"
   },
   {
    "roll": 9,
    "text": "weather-worn doublet"
   },
   {
    "roll": 10,
    "text": "natty hair"
   },
   {
    "roll": 11,
    "text": "a pet bird"
   },
   {
    "roll": 12,
    "text": "bloody bandages"
   }
  ],
  "group": "Pirate Generator",
  "note": "Roll 3d12 and read Tables A to C (save the dice): \"A [A] with [B] wielding a [C]\". The greatest die is its Morale; the lowest die +2 is its HP (double it for a mighty pirate). Whichever table rolled highest sets its armor: A no armor, B −d2, C −d4. Then roll d66 ×4 on the name table; they carry the highest result in silver."
 },
 "pirateC": {
  "id": "pirateC",
  "name": "Table C — wielding a…",
  "die": "d12",
  "page": 124,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "pair of fists [d2]",
    "damage": "d2"
   },
   {
    "roll": 2,
    "text": "broken bottle [d2]",
    "damage": "d2"
   },
   {
    "roll": 3,
    "text": "bullwhip [d4]",
    "damage": "d4"
   },
   {
    "roll": 4,
    "text": "hook [d4]",
    "damage": "d4"
   },
   {
    "roll": 5,
    "text": "rusty knife [d4]",
    "damage": "d4"
   },
   {
    "roll": 6,
    "text": "evil cutlass [d6]",
    "damage": "d6"
   },
   {
    "roll": 7,
    "text": "ornate scimitar [d6]",
    "damage": "d6"
   },
   {
    "roll": 8,
    "text": "officer's rapier [d8]",
    "damage": "d8"
   },
   {
    "roll": 9,
    "text": "ancient crossbow [d8]",
    "damage": "d8"
   },
   {
    "roll": 10,
    "text": "flintlock pistol [2d4]",
    "damage": "2d4",
    "blackPowder": true
   },
   {
    "roll": 11,
    "text": "musket [2d6]",
    "damage": "2d6",
    "blackPowder": true
   },
   {
    "roll": 12,
    "text": "blunderbuss [d4/d10]",
    "damage": "d4",
    "closeDamage": "d10",
    "blackPowder": true
   }
  ],
  "group": "Pirate Generator",
  "note": "Roll 3d12 and read Tables A to C (save the dice): \"A [A] with [B] wielding a [C]\". The greatest die is its Morale; the lowest die +2 is its HP (double it for a mighty pirate). Whichever table rolled highest sets its armor: A no armor, B −d2, C −d4. Then roll d66 ×4 on the name table; they carry the highest result in silver."
 },
 "jobHook": {
  "id": "jobHook",
  "name": "Hook",
  "die": "d20",
  "page": 126,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Capture a prize."
   },
   {
    "roll": 2,
    "text": "Raid a port."
   },
   {
    "roll": 3,
    "text": "Treasure hunt."
   },
   {
    "roll": 4,
    "text": "Find someone/something."
   },
   {
    "roll": 5,
    "text": "Capture, interrogate, or kill someone."
   },
   {
    "roll": 6,
    "text": "Establish a new safe house, base, or hideout."
   },
   {
    "roll": 7,
    "text": "Sink a ship."
   },
   {
    "roll": 8,
    "text": "Steal an item."
   },
   {
    "roll": 9,
    "text": "Spy on someone."
   },
   {
    "roll": 10,
    "text": "Scavenge a wreck."
   },
   {
    "roll": 11,
    "text": "Explore or defend a location."
   },
   {
    "roll": 12,
    "text": "Sneak into somewhere."
   },
   {
    "roll": 13,
    "text": "Steal something."
   },
   {
    "roll": 14,
    "text": "Meet someone."
   },
   {
    "roll": 15,
    "text": "Establish trading or fencing relations with someone."
   },
   {
    "roll": 16,
    "text": "Free or rescue a person or group from a location."
   },
   {
    "roll": 17,
    "text": "Sabotage something."
   },
   {
    "roll": 18,
    "text": "Defend a location."
   },
   {
    "roll": 19,
    "text": "Free captives or prisoners."
   },
   {
    "roll": 20,
    "text": "Escape."
   }
  ],
  "group": "Jobs & Quests"
 },
 "jobPatron": {
  "id": "jobPatron",
  "name": "Patron or Key NPC",
  "die": "d10",
  "page": 126,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "A government leader."
   },
   {
    "roll": 2,
    "text": "A famous pirate captain."
   },
   {
    "roll": 3,
    "text": "The governor's daughter or son."
   },
   {
    "roll": 4,
    "text": "The local drunk."
   },
   {
    "roll": 5,
    "text": "A shady figure."
   },
   {
    "roll": 6,
    "text": "Some cultists."
   },
   {
    "roll": 7,
    "text": "An old friend."
   },
   {
    "roll": 8,
    "text": "Important looking pirates."
   },
   {
    "roll": 9,
    "text": "A love interest."
   },
   {
    "roll": 10,
    "text": "A mermaid."
   }
  ],
  "group": "Jobs & Quests"
 },
 "jobRequirement": {
  "id": "jobRequirement",
  "name": "Requirement",
  "die": "d6",
  "page": 126,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Stay out of combat."
   },
   {
    "roll": 2,
    "text": "Kill only one person."
   },
   {
    "roll": 3,
    "text": "Kill everyone."
   },
   {
    "roll": 4,
    "text": "Make it look like someone else did it."
   },
   {
    "roll": 5,
    "text": "Bring a hostage back alive."
   },
   {
    "roll": 6,
    "text": "Vital information must be obtained."
   }
  ],
  "group": "Jobs & Quests"
 },
 "jobTime": {
  "id": "jobTime",
  "name": "Time Restraint",
  "die": "d6",
  "page": 126,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Immediately!"
   },
   {
    "roll": 2,
    "text": "Within the hour."
   },
   {
    "roll": 3,
    "text": "By tonight."
   },
   {
    "roll": 4,
    "text": "By tomorrow."
   },
   {
    "roll": 5,
    "text": "Next week."
   },
   {
    "roll": 6,
    "text": "This month."
   }
  ],
  "group": "Jobs & Quests"
 },
 "jobComplication": {
  "id": "jobComplication",
  "name": "Complication",
  "die": "d6",
  "page": 126,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "It's a setup."
   },
   {
    "roll": 2,
    "text": "The intel is wrong."
   },
   {
    "roll": 3,
    "text": "Another crew is already on the job."
   },
   {
    "roll": 4,
    "text": "Some who's not supposed to be there is."
   },
   {
    "roll": 5,
    "text": "The reward is suspiciously big."
   },
   {
    "roll": 6,
    "text": "Everything is proceeding as planned."
   }
  ],
  "group": "Jobs & Quests"
 },
 "rumors": {
  "id": "rumors",
  "name": "Rumors",
  "die": "d20",
  "page": 127,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "A nation's navy is coming in 3d6 days. Everyone is on edge."
   },
   {
    "roll": 2,
    "text": "A rich group of merchants are hiring mercenaries to escort them."
   },
   {
    "roll": 3,
    "text": "A treasure fleet is rumored to be departing soon."
   },
   {
    "roll": 4,
    "text": "An important NPC is recruiting people to explore or scout an area."
   },
   {
    "roll": 5,
    "text": "A group of leaders is meeting soon. The PCs have been summoned."
   },
   {
    "roll": 6,
    "text": "Someone the PCs know has been killed or captured."
   },
   {
    "roll": 7,
    "text": "2d12 pirates are in town spending the earnings from their latest prize."
   },
   {
    "roll": 8,
    "text": "Pirates, marines, or revolutionaries are planning to raid a port."
   },
   {
    "roll": 9,
    "text": "There are rumors of a rich prize nearby. Crews are recruiting."
   },
   {
    "roll": 10,
    "text": "Someone uncovered a clue or map to a fabled treasure and need brains, muscle, or both."
   },
   {
    "roll": 11,
    "text": "A corpse has been found in an alley or on the beach. Everyone is suspicious."
   },
   {
    "roll": 12,
    "text": "A ship with valuable cargo wrecked nearby."
   },
   {
    "roll": 13,
    "text": "A lonely widow (20+d50 years old) is looking for a date to the Governor's Ball."
   },
   {
    "roll": 14,
    "text": "It is not safe here at night. The reasons given sound like tall tales or ghost stories."
   },
   {
    "roll": 15,
    "text": "A recent fire destroyed a ship, a port, or a farmstead."
   },
   {
    "roll": 16,
    "text": "Two allied factions are now at war."
   },
   {
    "roll": 17,
    "text": "There is a party tonight to honor a deceased NPC."
   },
   {
    "roll": 18,
    "text": "The governor's adult daughter/son is the most beautiful person ever seen."
   },
   {
    "roll": 19,
    "text": "A group of cultists have been up to some unusual activity recently."
   },
   {
    "roll": 20,
    "text": "Undead have destroyed yet another settlement."
   }
  ],
  "group": "Rumors"
 },
 "spDay": {
  "id": "spDay",
  "name": "Black Coral Bay: Daytime Encounters",
  "die": "2d6",
  "page": 135,
  "source": "The Curse of Skeleton Point",
  "note": "Roll when changing locations; skip if the action is moving.",
  "rows": [
   {
    "roll": 2,
    "text": "1 confused Deep One named S'pht'Gl'Koo. He doesn't speak \"human.\"",
    "monster": "deep-ones"
   },
   {
    "roll": 3,
    "text": "2d12 bilge rats (pg. 86).",
    "monster": "bilge-rat"
   },
   {
    "roll": 4,
    "text": "1d4 new zombies (pg. 94). They are hungry.",
    "monster": "bilge-rat-zombie"
   },
   {
    "roll": 5,
    "text": "d2 rabid jaguars (pg. 86) hunting for their cubs.",
    "monster": "rabid-jaguar"
   },
   {
    "roll": 6,
    "text": "The Three-Headed Monkey (pg. 86) that lives in the shipwreck on the castle (pg. 158).",
    "monster": "three-headed-monkey"
   },
   {
    "roll": 7,
    "text": "1d6 pirates (pg. 124) looking for trouble.",
    "table": "pirateGenerator"
   },
   {
    "roll": 8,
    "text": "3d4 carrion gulls (pg. 87).",
    "monster": "carrion-gull"
   },
   {
    "roll": 9,
    "text": "Captain Davies and d12 of his men: moving cargo, patrolling, carousing, or chasing another NPC.",
    "monster": "captain-davies"
   },
   {
    "roll": 10,
    "text": "Tela Fafane gathering ingredients for a ritual or potion.",
    "monster": "tela-fafane"
   },
   {
    "roll": 11,
    "text": "An old man named Clayborn. He lives in a tree house and knows a lot about the island."
   },
   {
    "roll": 12,
    "text": "Veronique Barlette painting a landscape. She does not trust people she does not know.",
    "monster": "veronique-barlette"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spNight": {
  "id": "spNight",
  "name": "Black Coral Bay: Nighttime Encounters",
  "die": "2d6",
  "page": 135,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 2,
    "text": "Governor Barlette huddled over a fire pit mid-ritual, 2d4 sea wraiths circling him. He pretends he is under attack.",
    "monster": "claude-barlette"
   },
   {
    "roll": [
     3,
     4
    ],
    "text": "d100 fireflies glowing pale blue."
   },
   {
    "roll": [
     5,
     6
    ],
    "text": "3d6 weak zombies (pg. 94): starving but slow, 1 HP each.",
    "monster": "bilge-rat-zombie"
   },
   {
    "roll": [
     7,
     8
    ],
    "text": "2d4 skeletons (pg. 92) looking for trouble.",
    "monster": "skeleton-rank-and-vile"
   },
   {
    "roll": 9,
    "text": "d4 of The Drowned (pg. 100), wandering inland from Carcass Beach.",
    "monster": "the-drowned"
   },
   {
    "roll": 10,
    "text": "The Three-Headed Monkey (pg. 158).",
    "monster": "three-headed-monkey"
   },
   {
    "roll": 11,
    "text": "The Baron \"hunting\" the living.",
    "monster": "the-baron"
   },
   {
    "roll": 12,
    "text": "The grim reaper points at a PC and vanishes. A spot appears on their body."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spShipsDocked": {
  "id": "spShipsDocked",
  "name": "Coral Town: Ships Docked",
  "die": "d12",
  "page": 139,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "The Dark Diamond — small, fast sloop of smugglers (rum, sugar, prisoners of war).",
    "ship": "sloop"
   },
   {
    "roll": 2,
    "text": "Jade Rebellion — a strange ship from a distant land selling spices and stranger stories; chests of carved jade in the hold."
   },
   {
    "roll": 3,
    "text": "The Ranger — brigantine with a small, loyal crew and a batshit-crazy captain.",
    "ship": "brigantine"
   },
   {
    "roll": 4,
    "text": "Mist Walker — tartane with two big triangle sails; a fence vessel for stolen pirate cargo.",
    "ship": "tartane"
   },
   {
    "roll": 5,
    "text": "The Tyrant — an outrigger canoe with one small sail, a fearsome reputation and a mysterious owner.",
    "ship": "canoe"
   },
   {
    "roll": 6,
    "text": "Gilded Raven — fast frigate, well-trained crew of deserter marines, black sails.",
    "ship": "frigate"
   },
   {
    "roll": 7,
    "text": "The Royal Dragon — large decorated fluyt stolen from nobles; the figurehead talks; recruiting for a raid.",
    "ship": "fluyt"
   },
   {
    "roll": 8,
    "text": "King of Spires — an old, ruined galleon that hasn't left the docks in years.",
    "ship": "galleon"
   },
   {
    "roll": 9,
    "text": "The Sea Bat — small jet-black sloop; its 4-person crew could become friends… or rivals.",
    "ship": "sloop"
   },
   {
    "roll": 10,
    "text": "Storm's End — a sloop with an old, wise captain and his pet owl.",
    "ship": "sloop"
   },
   {
    "roll": 11,
    "text": "Queen Isabella's Malice — frigate with a hotshot crew nobody likes.",
    "ship": "frigate"
   },
   {
    "roll": 12,
    "text": "Scorn of the West — a very old, well-maintained war vessel."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spTownRumors": {
  "id": "spTownRumors",
  "name": "Coral Town Rumors",
  "die": "2d6",
  "page": 139,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 2,
    "text": "Without his perfume the Governor smells like bilge water."
   },
   {
    "roll": 3,
    "text": "Strange lights, chanting and roaring fires deep in the jungle at night."
   },
   {
    "roll": 4,
    "text": "Veronique is beautiful, but something is off about her paintings."
   },
   {
    "roll": 5,
    "text": "Dead things don't stay dead here."
   },
   {
    "roll": 6,
    "text": "Stay inside at night — the island is cursed!"
   },
   {
    "roll": 7,
    "text": "The Governor's daughter is missing and he pays over 1,000s for information."
   },
   {
    "roll": 8,
    "text": "A 30' skeleton lives in the castle."
   },
   {
    "roll": 9,
    "text": "The castle's treasure hoard is guarded by the ghost of a sea serpent."
   },
   {
    "roll": 10,
    "text": "The witch in the swamp is responsible for the curse."
   },
   {
    "roll": 11,
    "text": "The broken lighthouse sometimes still lights up at night."
   },
   {
    "roll": 12,
    "text": "There are secret tunnels under the graveyard."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spCarcassBeach": {
  "id": "spCarcassBeach",
  "name": "Carcass Beach: What's Happening Now?",
  "die": "3d6",
  "page": 143,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 3,
    "text": "A Spanish treasure galleon has wrecked near Florida; everyone scrambles to set sail."
   },
   {
    "roll": 4,
    "text": "3d6 Deep Ones, d4 Gorilla Crabs and a Deep One Shaman are in a standoff with the pirates.",
    "monster": "deep-ones"
   },
   {
    "roll": 5,
    "text": "A pirate has betrayed the code; Captain Davies presides over a tribunal."
   },
   {
    "roll": 6,
    "text": "The caves are deserted."
   },
   {
    "roll": 7,
    "text": "All calm: some pirates fish, others are passed out on the beach."
   },
   {
    "roll": 8,
    "text": "A mob of 2d4 Drowned have wandered into the caves.",
    "monster": "the-drowned"
   },
   {
    "roll": 9,
    "text": "The pirates are fighting amongst themselves."
   },
   {
    "roll": 10,
    "text": "The pirates are drunk."
   },
   {
    "roll": 11,
    "text": "Davies is recruiting crew for smuggling and pirating."
   },
   {
    "roll": 12,
    "text": "A captured merchantman full of fresh food means a huge feast soon."
   },
   {
    "roll": 13,
    "text": "The pirates are distracted by visiting courtesans from the Treasured Chest."
   },
   {
    "roll": 14,
    "text": "The musical group Ship of Fools are performing (tonight/soon/now)."
   },
   {
    "roll": 15,
    "text": "Sir Francis Drake's ghost should appear tonight in the Cagafuego wreck."
   },
   {
    "roll": 16,
    "text": "The Brethren are meeting in Nassau to plan a massive raid in d12 days."
   },
   {
    "roll": 17,
    "text": "\"Scuttles\", a young pirate, went missing near the cenote."
   },
   {
    "roll": 18,
    "text": "Pirate hunters are attacking. Blood is everywhere."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spJungle": {
  "id": "spJungle",
  "name": "The Jungle: Points of Interest",
  "die": "d20",
  "page": 144,
  "source": "The Curse of Skeleton Point",
  "note": "Fast: 1d20 and read across. Random: 4d20, one per column (plus Encounters). Custom: choose.",
  "columns": [
   {
    "die": "d20",
    "name": "Terrain",
    "values": [
     "dense underbrush",
     "grove of coconut trees",
     "grove of banana trees",
     "calm, sun or moon lit clearing",
     "small, moss filled cave",
     "larges, ancient deciduous trees",
     "granite cliff with a climbable crack",
     "serene lagoon with turquoise water",
     "swamp, water lilies, mangrove trees",
     "a clearing circled by palm trees",
     "shoulder-high grass",
     "thick tangle of vines and brambles",
     "waterfall, dropping from 50' up",
     "high point with a great view",
     "sandstone rock formation",
     "small babbling creek",
     "shady ferns and lush foliage",
     "large tree (with a tree house)",
     "pine forest with low branches",
     "sinkhole (to the Nameless Temple)"
    ]
   },
   {
    "die": "d20",
    "name": "Contents",
    "values": [
     "a 10' tall carved stone idol",
     "a skeleton",
     "a recently buried corpse",
     "colorful wild flowers",
     "hundreds of mushrooms",
     "a dinghy, hidden under fronds",
     "a head impaled on a spike",
     "a small wrecked ship",
     "lanterns hanging from stakes",
     "ruins from an ancient civilization",
     "the nest of a carnivorous animal",
     "a large, bloody pile of bones",
     "a secret cache of cargo",
     "a large volcanic rock",
     "a large, wooden crate",
     "a corpse hanging from noose",
     "an abandoned campsite",
     "a fresh water spring",
     "a colony of d100 macaws",
     "blood dripped on to foliage"
    ]
   },
   {
    "die": "d20",
    "name": "Environment",
    "values": [
     "blistering heat",
     "buzzing flies carrying disease",
     "extremely loud insects",
     "eerie fog",
     "abnormally cold",
     "huge insects that bite",
     "calm, sea breeze",
     "absolute bliss fills the air",
     "distant sound of chanting",
     "a large bonfire and spit",
     "growling sounds",
     "feeling of being watched",
     "vultures circle above",
     "distant sound of cannon fire",
     "large fire ant mound",
     "intensely putrid death smell",
     "quicksand",
     "500+ butterflies or fireflies",
     "fast, howling winds",
     "a faint green glow"
    ]
   },
   {
    "die": "d20",
    "name": "Encounters",
    "values": [
     "mundane jungle mammals",
     "skeletons (pg. 92), sauntering",
     "Governor Barlette (pg. 132)",
     "Dark Fauna: Terrestrial (pg. 86)",
     "zombies (pg. 94), skulking",
     "Dark Flora (pg. 90)",
     "Dark Fauna: Avian (pg. 87)",
     "d2+1 (romantic) pirates",
     "Tela Fafane (pg. 133), gathering",
     "small undead animals",
     "a terrified pirate, fleeing",
     "dangerous jungle mammals",
     "jungle birds, singing",
     "Veronique (pg. 132), painting",
     "Pedro (pg. 147) & d8 riflemen",
     "Xoth (pg. 147), stalking",
     "Catherwood (pg. 147), searching",
     "Clayborn, annoyed and curious",
     "Beatrice (pg. 147) and d4+1 crew",
     "Clementius (pg. 147), 23 followers"
    ]
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spTempleHooks": {
  "id": "spTempleHooks",
  "name": "Nameless Temple: Plot Hooks",
  "die": "d6",
  "page": 146,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "Catherwood haunts the Green Kraken searching for the temple from his late wife's journal; he shares discoveries with helpers."
   },
   {
    "roll": 2,
    "text": "A PC dreams of the Omega Stone; each morning they wake knowing which way the entrance lies."
   },
   {
    "roll": 3,
    "text": "Father Wallace has seen hooded figures land by night and walk into the jungle; fewer return each morning."
   },
   {
    "roll": 4,
    "text": "Tela Fafane pays 1,000s to anyone who captures Xoth for her studies."
   },
   {
    "roll": 5,
    "text": "Pirates swap stories of treasure-filled temples — and one on this island; the last group to look never came back."
   },
   {
    "roll": 6,
    "text": "Searchers for Veronique or jungle explorers stumble into the entrance, fall under the tree, or swim deep into the Carcass Beach cenote."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spShrine": {
  "id": "spShrine",
  "name": "Shrine of the Nameless Skull: Encounters",
  "die": "d6",
  "page": 149,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "3 pirates (HP 5, Morale 8, Cutlass d6) who found the shrine an hour ago — greedy, stupid, reeking of grog and sweat.",
    "monster": "shrine-pirates"
   },
   {
    "roll": 2,
    "text": "Hans (from #7), scratching symbols into the walls and/or speaking in tongues."
   },
   {
    "roll": 3,
    "text": "A palm viper protecting her nest of 2d10 neonates (HP 1, Morale 6, Bite d2).",
    "monster": "palm-viper"
   },
   {
    "roll": 4,
    "text": "d4 hive vines slowly wrap around one PC's legs.",
    "monster": "hive-vines"
   },
   {
    "roll": 5,
    "text": "2 psychedelic macaws courting; they ignore those who ignore them.",
    "monster": "psychedelic-macaw"
   },
   {
    "roll": 6,
    "text": "1 necro-swine (see #8).",
    "monster": "necro-swine"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spSanctum": {
  "id": "spSanctum",
  "name": "Sanctum of Nameless Blood: Encounters",
  "die": "d6",
  "page": 151,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "Trained guard dogs (HP 7, Morale 6, Bite d6) — mangy, starving; roll reactions for each.",
    "monster": "guard-dogs"
   },
   {
    "roll": 2,
    "text": "Selena, a frantic prisoner in shock, bloody and filthy, carrying an arm."
   },
   {
    "roll": 3,
    "text": "A pile of bloody body parts — leftovers from Xoth's latest meal."
   },
   {
    "roll": 4,
    "text": "d4 cultists (HP 3, Morale 7, Dagger d4) and a priest (HP 8, Morale 9, Dark hex spell d8, 50').",
    "monster": "cultists"
   },
   {
    "roll": 5,
    "text": "Clementius, on his way to the Omega Chamber.",
    "monster": "high-wizard-clementius"
   },
   {
    "roll": 6,
    "text": "Xoth, crawling the walls and ceilings, hunting for food.",
    "monster": "xoth-the-imp"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spLake": {
  "id": "spLake",
  "name": "Lake of the Nameless One: Encounters",
  "die": "d6",
  "page": 153,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "Accursed, maddening silence."
   },
   {
    "roll": 2,
    "text": "A drop of water falls, rippling the lake's surface."
   },
   {
    "roll": 3,
    "text": "An icy, terrifying chill washes over you."
   },
   {
    "roll": 4,
    "text": "d8 swarms of bats (HP 1, Morale 5, Bite 1) swarm, then flee via the Omega Stone opening.",
    "monster": "swarm-of-bats"
   },
   {
    "roll": 5,
    "text": "d2 eldritch eels disturb the surface like glossy tentacles.",
    "monster": "eldritch-eel"
   },
   {
    "roll": 6,
    "text": "The Nameless One awakens. All will end soon.",
    "monster": "the-nameless-one"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spSwamp": {
  "id": "spSwamp",
  "name": "Death's Head Swamp: Encounters",
  "die": "d10",
  "page": 154,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "Fat, twisted trees hung with Spanish moss; their faces sing in sleepers' dreams."
   },
   {
    "roll": 2,
    "text": "A bubbling, putrid bog; mud-caked logs (and zombies) drift slowly past."
   },
   {
    "roll": 3,
    "text": "Giant water lilies; frogs feasting on dragonflies croak so loud it's hard to think."
   },
   {
    "roll": 4,
    "text": "Red and yellow mushrooms: poisonous spore clouds when touched, but delicious, and +1 TOUGHNESS for a while."
   },
   {
    "roll": 5,
    "text": "An abandoned, moss-covered campsite and skeleton with a humming aquamarine crystal the size of a cannonball."
   },
   {
    "roll": 6,
    "text": "A waterlogged boat with a rusty knife and a map; a dire crocodile suns here in clear weather.",
    "monster": "dire-crocodile"
   },
   {
    "roll": 7,
    "text": "2d10 candle-lit human skulls hang from vines, leading to a stone altar in the muck."
   },
   {
    "roll": 8,
    "text": "d10 bone-and-feather effigies forming a ½-mile perimeter around Tela's cabin (they keep the undead out)."
   },
   {
    "roll": 9,
    "text": "Strange orbs of light bobbing through the air like fishing lures."
   },
   {
    "roll": 10,
    "text": "A spike-fenced camp of muddy tents: the eccentric musicians called the Ship of Fools."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spSwampRumors": {
  "id": "spSwampRumors",
  "name": "Death's Head Swamp: Rumors",
  "die": "d6",
  "page": 154,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "A cannibalistic witch lives in a hut deep in the swamp."
   },
   {
    "roll": 2,
    "text": "Nomadic musicians camp in the swamp — bad singers, great for dancing."
   },
   {
    "roll": 3,
    "text": "A beautiful nymph wanders the reeds at night."
   },
   {
    "roll": 4,
    "text": "A 30' man-eating crocodile lives near an old boat."
   },
   {
    "roll": 5,
    "text": "Fist-sized insects there eat eyes."
   },
   {
    "roll": 6,
    "text": "A red and yellow flower growing outside caves has powerful medicinal effects."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spReef": {
  "id": "spReef",
  "name": "Black Coral Reef: Encounters",
  "die": "d6",
  "page": 156,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "d4 fishermen in a small boat."
   },
   {
    "roll": 2,
    "text": "d6 mermaids, scared of humans but curious."
   },
   {
    "roll": 3,
    "text": "d3 sirens; one of them doesn't eat \"human\".",
    "monster": "siren"
   },
   {
    "roll": 4,
    "text": "d6 black coral crabs.",
    "monster": "black-coral-crab"
   },
   {
    "roll": 5,
    "text": "4d20 black coral crabs.",
    "monster": "black-coral-crab"
   },
   {
    "roll": 6,
    "text": "d2 acid jellyfish, with 3d6 more arriving gradually.",
    "monster": "acid-jellyfish"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spCastleDay": {
  "id": "spCastleDay",
  "name": "Skeleton Point: Random Encounters (Day)",
  "die": "d10",
  "page": 159,
  "source": "The Curse of Skeleton Point",
  "note": "1-in-6 chance of an encounter in each room.",
  "rows": [
   {
    "roll": 1,
    "text": "The corpse of a once-famous pirate, with loot and an invisible-ink treasure map."
   },
   {
    "roll": 2,
    "text": "A grove of carnivorous plants.",
    "monster": "carnivorous-plant"
   },
   {
    "roll": 3,
    "text": "d100 bilge rats chewing on something disgusting.",
    "monster": "bilge-rat"
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "The Baron (ghost): sad, haunting, cold.",
    "monster": "the-baron"
   },
   {
    "roll": 7,
    "text": "3 rooks (use carrion gulls): curious, stupid and fat.",
    "monster": "carrion-gull"
   },
   {
    "roll": 8,
    "text": "The Three-Headed Monkey; he's hungry.",
    "monster": "three-headed-monkey"
   },
   {
    "roll": 9,
    "text": "A crew of d10 pirates looking for treasure.",
    "table": "pirateGenerator"
   },
   {
    "roll": 10,
    "text": "Veronique, irritated at the intrusion.",
    "monster": "veronique-barlette"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spCastleNight": {
  "id": "spCastleNight",
  "name": "Skeleton Point: Random Encounters (Night)",
  "die": "d10",
  "page": 161,
  "source": "The Curse of Skeleton Point",
  "note": "1-in-6 chance of an encounter in each room.",
  "rows": [
   {
    "roll": 1,
    "text": "The ghost of a once-famous pirate who knows the trick to reveal the map on his corpse (pg. 119)."
   },
   {
    "roll": [
     2,
     4
    ],
    "text": "d6 skeletons: mindless, fast, terrifying — only 1 HP each.",
    "monster": "skeleton-rank-and-vile"
   },
   {
    "roll": [
     5,
     6
    ],
    "text": "3 Ghost Crew trying to be scary, looking for a fight, stench of death.",
    "monster": "ghost-crew"
   },
   {
    "roll": [
     7,
     8
    ],
    "text": "The Baron (skeleton), furious and hostile, with d4 ghostly fossil sharks swimming through the air.",
    "monster": "the-baron"
   },
   {
    "roll": 9,
    "text": "d10 pirate corpses, savagely murdered."
   },
   {
    "roll": 10,
    "text": "Veronique in black nightclothes, terrified of the intrusion.",
    "monster": "veronique-barlette"
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spPlotHooks": {
  "id": "spPlotHooks",
  "name": "Plot Hooks",
  "die": "d6",
  "page": 131,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "News and rumors can be bought at the Treasured Chest; ask for Madame Dubois."
   },
   {
    "roll": 2,
    "text": "The Governor's daughter is missing and he'll pay a hefty reward for her return."
   },
   {
    "roll": 3,
    "text": "Every tavern tells of a treasure hoard in the castle at Skeleton Point — none who entered have returned."
   },
   {
    "roll": 4,
    "text": "Father Wallace is gathering anyone willing to help exorcise the castle's spirits."
   },
   {
    "roll": 5,
    "text": "Rumors of an evil witch in the swamp — is she behind the curse, or does she sell potions?"
   },
   {
    "roll": 6,
    "text": "Captain Davies is recruiting pirates for a raid at the Green Kraken."
   }
  ],
  "group": "The Curse of Skeleton Point"
 },
 "spDevelopment": {
  "id": "spDevelopment",
  "name": "If the Players Do Nothing",
  "die": "d6",
  "page": 131,
  "source": "The Curse of Skeleton Point",
  "note": "Use in order (one per session) or when the PCs leave for a long time.",
  "rows": [
   {
    "roll": 1,
    "text": "The Governor raises his reward by 100s a day until someone investigates the castle."
   },
   {
    "roll": 2,
    "text": "Father Wallace tries to exorcise the castle alone and is killed; the church falls further into ruin."
   },
   {
    "roll": 3,
    "text": "Davies dies in a skirmish with the Royal Navy; after a huge beach wake a power vacuum opens, and his ghost ship haunts the surrounding waters."
   },
   {
    "roll": 4,
    "text": "A returning search party reveals Veronique left willingly; the furious Governor hires every pirate to drag her back."
   },
   {
    "roll": 5,
    "text": "The pirates storm the castle and Veronique dies; the Governor's rage razes the island and the dead rise as undead."
   },
   {
    "roll": 6,
    "text": "Tela Fafane strikes back with her own zombie horde; the Governor is defeated, the curse lifts and pirates return."
   }
  ],
  "group": "The Curse of Skeleton Point"
 }
};

export const PB_HATS: PbHat[] = [
 {
  "id": "no-hat",
  "roll": [
   1,
   4
  ],
  "name": "None",
  "cost": null,
  "none": true
 },
 {
  "id": "wig",
  "roll": 5,
  "name": "Wig",
  "cost": 8
 },
 {
  "id": "bandanna",
  "roll": 6,
  "name": "Bandanna",
  "cost": 2
 },
 {
  "id": "cavalier",
  "roll": 7,
  "name": "Cavalier",
  "cost": 15
 },
 {
  "id": "bicorne",
  "roll": 8,
  "name": "Bicorne",
  "cost": 15
 },
 {
  "id": "plain-tricorne",
  "roll": 9,
  "name": "Plain Tricorne",
  "cost": 10
 },
 {
  "id": "fancy-tricorne",
  "roll": 10,
  "name": "Fancy Tricorne",
  "cost": 90
 },
 {
  "id": "metal-lined-hat",
  "roll": 11,
  "name": "Metal Lined Hat",
  "cost": 20,
  "damageReduction": 1,
  "metal": true,
  "special": "−1 damage."
 },
 {
  "id": "morion",
  "roll": 12,
  "name": "Morion (conquistador helmet)",
  "cost": 90,
  "damageReduction": 1,
  "metal": true,
  "sacrifice": true,
  "special": "−1 damage. Or choose to ignore all damage from one attack, but the helmet breaks."
 }
];

export const PB_HISTORY: PbTable = {
 "id": "history",
 "name": "A General History of the Dark Caribbean",
 "die": "d66",
 "page": 25,
 "source": "Core Rules",
 "note": "Six storylines (columns) told over six chapters (rows), ending in Armageddon. Use the events as records, rumors, plot hooks or current events; reveal them in order or roll d66 for a random one (first die = storyline, second die = chapter — the book doesn't specify the order).",
 "storylines": [
  "The Greater Antilles War",
  "The Rise and Fall of Nassau",
  "The Scourge of the New World",
  "The Ashes of Tortuga",
  "And The Wretched Exalted",
  "Eldritch Tides of Doom"
 ],
 "columns": [
  {
   "die": "d6",
   "name": "The Greater Antilles War",
   "values": [
    "Spain and England are at war; both recruit privateers and pay in advance.",
    "Constant war: the battle for the Greater Antilles rages on with no end in sight.",
    "A Spanish treasure fleet wrecks off Florida; nations and pirates race to it.",
    "A region-wide cease fire as nations deal with tragedy; hundreds of warships are abandoned.",
    "Derelict ships litter the sea; salvagers get rich and reset the status quo.",
    "The skies shift from smoke-gray to crimson and putrid orange; sunlight becomes a myth."
   ]
  },
  {
   "die": "d6",
   "name": "The Rise and Fall of Nassau",
   "values": [
    "Port Royal is destroyed in an earthquake; thousands dead, more homeless.",
    "Nassau is sacked; the \"Republic of Pirates\", the region's first true democracy, is founded.",
    "Famous pirates are executed and hung in gibbet cages; their cursed corpses scream at passers-by.",
    "Edward \"Blackbeard\" Thatch goes on a killing spree and is slain in a skirmish with the Royal Navy.",
    "Blackbeard, a sorcerer, returns from the grave with an army of the dead; the living fight back.",
    "Nassau falls to The Scourge; escapees border on insanity and fear becomes currency."
   ]
  },
  {
   "die": "d6",
   "name": "The Scourge of the New World",
   "values": [
    "Horrifying screams from the sea are reported region-wide, source unknown.",
    "They walk again! The dead rise from grave and sea — a few at first, then hordes.",
    "The undead, now called \"The Scourge\", ravage settlements; a state of emergency is declared.",
    "Freshly killed fish and livestock animate and writhe at sunset; no one seems to mind anymore.",
    "A mass exodus of birds and beasts; no wildlife is seen for weeks.",
    "All marine life dies and washes ashore; the fishing industry collapses into famine."
   ]
  },
  {
   "die": "d6",
   "name": "The Ashes of Tortuga",
   "values": [
    "ASH, the dust of destroyed undead, is found to have physiological and psychedelic properties.",
    "A black market grows around ASH; Tortuga becomes its epicenter.",
    "Tortuga decays from a buccaneer bastion into a cesspool of thieves; not even pirates are safe there.",
    "Revolution! Citizens take to the streets of Hispaniola and the government is overthrown.",
    "Thousands flee for safety; Havana, Jamaica and Guadeloupe explode in population.",
    "Everyone who ever used ASH becomes Scourge; rum turns to water and escapism evaporates."
   ]
  },
  {
   "die": "d6",
   "name": "And The Wretched Exalted",
   "values": [
    "Religious fanatics take over the Old Stone Church in Havana; occult influence is suspected.",
    "Mysterious ruins are found in the Yucatán; an expedition sets out and none return alive.",
    "A lone figure with abyss-black eyes emerges from the jungle, terrible to behold.",
    "Ships of bone and flesh rise from the sea; their skeletal crews terrorize the shipping lanes.",
    "Havana burns in a fire rumored to have started at the Old Stone Church — which still stands.",
    "An ominous tempest settles permanently over Cuba, leaving a wasteland."
   ]
  },
  {
   "die": "d6",
   "name": "Eldritch Tides of Doom",
   "values": [
    "The climate shifts: darkened skies, raging storms and an omnipresent foul mist.",
    "\"The Abyss\" opens south of Cuba: the ocean pours into a 6-mile-long fissure.",
    "The Kraken attacks! Over 500 ships are lost at sea; large rewards go uncollected.",
    "The ruins of Atlantis rise in the Devil's Triangle; humanoid sea creatures attack.",
    "Otherworldly monstrosities spew from the sea, devouring whole vessels.",
    "A maelstrom forms around The Abyss; earthquakes crumble islands into the sea."
   ]
  }
 ],
 "rows": [
  {
   "roll": 11,
   "storyline": "The Greater Antilles War",
   "chapter": 1,
   "text": "Spain and England are at war; both recruit privateers and pay in advance."
  },
  {
   "roll": 12,
   "storyline": "The Greater Antilles War",
   "chapter": 2,
   "text": "Constant war: the battle for the Greater Antilles rages on with no end in sight."
  },
  {
   "roll": 13,
   "storyline": "The Greater Antilles War",
   "chapter": 3,
   "text": "A Spanish treasure fleet wrecks off Florida; nations and pirates race to it."
  },
  {
   "roll": 14,
   "storyline": "The Greater Antilles War",
   "chapter": 4,
   "text": "A region-wide cease fire as nations deal with tragedy; hundreds of warships are abandoned."
  },
  {
   "roll": 15,
   "storyline": "The Greater Antilles War",
   "chapter": 5,
   "text": "Derelict ships litter the sea; salvagers get rich and reset the status quo."
  },
  {
   "roll": 16,
   "storyline": "The Greater Antilles War",
   "chapter": 6,
   "text": "The skies shift from smoke-gray to crimson and putrid orange; sunlight becomes a myth."
  },
  {
   "roll": 21,
   "storyline": "The Rise and Fall of Nassau",
   "chapter": 1,
   "text": "Port Royal is destroyed in an earthquake; thousands dead, more homeless."
  },
  {
   "roll": 22,
   "storyline": "The Rise and Fall of Nassau",
   "chapter": 2,
   "text": "Nassau is sacked; the \"Republic of Pirates\", the region's first true democracy, is founded."
  },
  {
   "roll": 23,
   "storyline": "The Rise and Fall of Nassau",
   "chapter": 3,
   "text": "Famous pirates are executed and hung in gibbet cages; their cursed corpses scream at passers-by."
  },
  {
   "roll": 24,
   "storyline": "The Rise and Fall of Nassau",
   "chapter": 4,
   "text": "Edward \"Blackbeard\" Thatch goes on a killing spree and is slain in a skirmish with the Royal Navy."
  },
  {
   "roll": 25,
   "storyline": "The Rise and Fall of Nassau",
   "chapter": 5,
   "text": "Blackbeard, a sorcerer, returns from the grave with an army of the dead; the living fight back."
  },
  {
   "roll": 26,
   "storyline": "The Rise and Fall of Nassau",
   "chapter": 6,
   "text": "Nassau falls to The Scourge; escapees border on insanity and fear becomes currency."
  },
  {
   "roll": 31,
   "storyline": "The Scourge of the New World",
   "chapter": 1,
   "text": "Horrifying screams from the sea are reported region-wide, source unknown."
  },
  {
   "roll": 32,
   "storyline": "The Scourge of the New World",
   "chapter": 2,
   "text": "They walk again! The dead rise from grave and sea — a few at first, then hordes."
  },
  {
   "roll": 33,
   "storyline": "The Scourge of the New World",
   "chapter": 3,
   "text": "The undead, now called \"The Scourge\", ravage settlements; a state of emergency is declared."
  },
  {
   "roll": 34,
   "storyline": "The Scourge of the New World",
   "chapter": 4,
   "text": "Freshly killed fish and livestock animate and writhe at sunset; no one seems to mind anymore."
  },
  {
   "roll": 35,
   "storyline": "The Scourge of the New World",
   "chapter": 5,
   "text": "A mass exodus of birds and beasts; no wildlife is seen for weeks."
  },
  {
   "roll": 36,
   "storyline": "The Scourge of the New World",
   "chapter": 6,
   "text": "All marine life dies and washes ashore; the fishing industry collapses into famine."
  },
  {
   "roll": 41,
   "storyline": "The Ashes of Tortuga",
   "chapter": 1,
   "text": "ASH, the dust of destroyed undead, is found to have physiological and psychedelic properties."
  },
  {
   "roll": 42,
   "storyline": "The Ashes of Tortuga",
   "chapter": 2,
   "text": "A black market grows around ASH; Tortuga becomes its epicenter."
  },
  {
   "roll": 43,
   "storyline": "The Ashes of Tortuga",
   "chapter": 3,
   "text": "Tortuga decays from a buccaneer bastion into a cesspool of thieves; not even pirates are safe there."
  },
  {
   "roll": 44,
   "storyline": "The Ashes of Tortuga",
   "chapter": 4,
   "text": "Revolution! Citizens take to the streets of Hispaniola and the government is overthrown."
  },
  {
   "roll": 45,
   "storyline": "The Ashes of Tortuga",
   "chapter": 5,
   "text": "Thousands flee for safety; Havana, Jamaica and Guadeloupe explode in population."
  },
  {
   "roll": 46,
   "storyline": "The Ashes of Tortuga",
   "chapter": 6,
   "text": "Everyone who ever used ASH becomes Scourge; rum turns to water and escapism evaporates."
  },
  {
   "roll": 51,
   "storyline": "And The Wretched Exalted",
   "chapter": 1,
   "text": "Religious fanatics take over the Old Stone Church in Havana; occult influence is suspected."
  },
  {
   "roll": 52,
   "storyline": "And The Wretched Exalted",
   "chapter": 2,
   "text": "Mysterious ruins are found in the Yucatán; an expedition sets out and none return alive."
  },
  {
   "roll": 53,
   "storyline": "And The Wretched Exalted",
   "chapter": 3,
   "text": "A lone figure with abyss-black eyes emerges from the jungle, terrible to behold."
  },
  {
   "roll": 54,
   "storyline": "And The Wretched Exalted",
   "chapter": 4,
   "text": "Ships of bone and flesh rise from the sea; their skeletal crews terrorize the shipping lanes."
  },
  {
   "roll": 55,
   "storyline": "And The Wretched Exalted",
   "chapter": 5,
   "text": "Havana burns in a fire rumored to have started at the Old Stone Church — which still stands."
  },
  {
   "roll": 56,
   "storyline": "And The Wretched Exalted",
   "chapter": 6,
   "text": "An ominous tempest settles permanently over Cuba, leaving a wasteland."
  },
  {
   "roll": 61,
   "storyline": "Eldritch Tides of Doom",
   "chapter": 1,
   "text": "The climate shifts: darkened skies, raging storms and an omnipresent foul mist."
  },
  {
   "roll": 62,
   "storyline": "Eldritch Tides of Doom",
   "chapter": 2,
   "text": "\"The Abyss\" opens south of Cuba: the ocean pours into a 6-mile-long fissure."
  },
  {
   "roll": 63,
   "storyline": "Eldritch Tides of Doom",
   "chapter": 3,
   "text": "The Kraken attacks! Over 500 ships are lost at sea; large rewards go uncollected."
  },
  {
   "roll": 64,
   "storyline": "Eldritch Tides of Doom",
   "chapter": 4,
   "text": "The ruins of Atlantis rise in the Devil's Triangle; humanoid sea creatures attack."
  },
  {
   "roll": 65,
   "storyline": "Eldritch Tides of Doom",
   "chapter": 5,
   "text": "Otherworldly monstrosities spew from the sea, devouring whole vessels."
  },
  {
   "roll": 66,
   "storyline": "Eldritch Tides of Doom",
   "chapter": 6,
   "text": "A maelstrom forms around The Abyss; earthquakes crumble islands into the sea."
  }
 ]
};

export const PB_HOSPITALITY: PbPrice[] = [
 {
  "name": "Night at an inn",
  "cost": 4,
  "costText": "4s"
 },
 {
  "name": "Night at a brothel",
  "cost": null,
  "costText": "15-250s",
  "costMin": 15,
  "costMax": 250
 },
 {
  "name": "Grog",
  "cost": 1,
  "costText": "1s",
  "drink": true
 },
 {
  "name": "Good rum",
  "cost": 3,
  "costText": "3s",
  "drink": true
 },
 {
  "name": "Fine wine",
  "cost": 10,
  "costText": "10s",
  "drink": true
 },
 {
  "name": "A day's rations",
  "cost": 1,
  "costText": "1s",
  "ration": true
 },
 {
  "name": "Decent meal",
  "cost": 2,
  "costText": "2s"
 },
 {
  "name": "Admiral's feast",
  "cost": 25,
  "costText": "25s"
 }
];

export const PB_IDIOSYNCRASIES: PbRollEntry[] = [
 {
  "roll": 1,
  "text": "You smoke constantly, and cough even more."
 },
 {
  "roll": 2,
  "text": "\"Functioning\" alcoholic. You're probably drunk right now."
 },
 {
  "roll": 3,
  "text": "You bet on everything possible."
 },
 {
  "roll": 4,
  "text": "Constantly counting. Teeth, cannon balls… everything."
 },
 {
  "roll": 5,
  "text": "Rats are your favorite meal."
 },
 {
  "roll": 6,
  "text": "You know every tall tale ever told. You make sure everyone else knows you know them."
 },
 {
  "roll": 7,
  "text": "You are afraid of prime numbers larger than 3. d20 rolls of 5, 7, 11, 13, 17, and 19 fill you with superstitious terror."
 },
 {
  "roll": 8,
  "text": "You become a murderous grump when hungry."
 },
 {
  "roll": 9,
  "text": "Habitual procrastinator… if you even finish the task."
 },
 {
  "roll": 10,
  "text": "You are a voluntary insomniac. Sleep is for the dead."
 },
 {
  "roll": 11,
  "text": "You prefer to shoot first and never ask questions."
 },
 {
  "roll": 12,
  "text": "Overly, annoyingly religious."
 },
 {
  "roll": 13,
  "text": "You collect something, and you often talk to your collection. They are your friends."
 },
 {
  "roll": 14,
  "text": "Always trying to trick your crewmates, just for fun."
 },
 {
  "roll": 15,
  "text": "Why pay for anything when you can steal it?"
 },
 {
  "roll": 16,
  "text": "You talk to yourself when alone, but you often think you are alone when you aren't."
 },
 {
  "roll": 17,
  "text": "You secretly enjoy the taste of human flesh."
 },
 {
  "roll": 18,
  "text": "You always say you \"know the right way\" but are prone to getting lost."
 },
 {
  "roll": 19,
  "text": "You blame everyone but yourself for all of your mistakes."
 },
 {
  "roll": 20,
  "text": "Extremely obsessive with tasks and relationships."
 }
];

export const PB_INCIDENTS: PbRollEntry[] = [
 {
  "roll": 1,
  "text": "Your loved ones were burned alive. Revenge is imminent."
 },
 {
  "roll": 2,
  "text": "You are a known pirate. You face the gallows if caught."
 },
 {
  "roll": 3,
  "text": "You betrayed former crewmates. Now they hunt you."
 },
 {
  "roll": 4,
  "text": "You were marooned on an island for far too long. The voices must be real."
 },
 {
  "roll": 5,
  "text": "You stole a ship. The owner wants your money or your head, but will settle for both."
 },
 {
  "roll": 6,
  "text": "You escaped captivity, and will never go back."
 },
 {
  "roll": 7,
  "text": "A close relative has become your greatest enemy."
 },
 {
  "roll": 8,
  "text": "The last three ships you crewed all sank."
 },
 {
  "roll": 9,
  "text": "Your last crew was killed by undead. They left you alive on purpose."
 },
 {
  "roll": 10,
  "text": "Political leaders hold your loved one(s) captive."
 },
 {
  "roll": 11,
  "text": "An undead spirit you don't like possesses you regularly."
 },
 {
  "roll": 12,
  "text": "You wronged an infamous pirate lord."
 },
 {
  "roll": 13,
  "text": "You narrowly escaped a cannibalistic ending, but you didn't escape that smell."
 },
 {
  "roll": 14,
  "text": "You slaughtered them. Like animals."
 },
 {
  "roll": 15,
  "text": "You are the mysterious lone survivor of a treasure expedition gone awry."
 },
 {
  "roll": 16,
  "text": "[d2] 1: Failed mutineer. 2: Successful mutineer.",
  "sub": {
   "die": "d2",
   "rows": [
    {
     "roll": 1,
     "text": "Failed mutineer."
    },
    {
     "roll": 2,
     "text": "Successful mutineer."
    }
   ]
  }
 },
 {
  "roll": 17,
  "text": "A silent ghost haunts you. It is always there, but only you can see it."
 },
 {
  "roll": 18,
  "text": "You deserted the military, but you're not sure who knows so."
 },
 {
  "roll": 19,
  "text": "You have no memory before a few days ago."
 },
 {
  "roll": 20,
  "text": "You died once already, but Hell didn't want you."
 }
];

export const PB_INSTRUMENTS: PbNamedRoll[] = [
 {
  "roll": 1,
  "name": "Concertina"
 },
 {
  "roll": 2,
  "name": "Drum"
 },
 {
  "roll": 3,
  "name": "Flute"
 },
 {
  "roll": 4,
  "name": "Fiddle"
 },
 {
  "roll": 5,
  "name": "Banjo"
 },
 {
  "roll": 6,
  "name": "Horn"
 },
 {
  "roll": 7,
  "name": "Hurdy-Gurdy"
 },
 {
  "roll": 8,
  "name": "Guitar"
 },
 {
  "roll": 9,
  "name": "Mandolin"
 },
 {
  "roll": 10,
  "name": "Voice of an Angel",
  "notAnItem": true
 }
];

export const PB_ISLANDS: PbGenerator = {
 "page": 122,
 "source": "Core Rules",
 "note": "Roll on each table to build an uncharted island. Written by Jacob Hurst of Swordfish Islands.",
 "tables": {
  "size": {
   "id": "islandSize",
   "name": "Size",
   "die": "d6",
   "page": 122,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Tiny."
    },
    {
     "roll": 2,
     "text": "Small."
    },
    {
     "roll": 3,
     "text": "Medium."
    },
    {
     "roll": 4,
     "text": "Large."
    },
    {
     "roll": 5,
     "text": "Large."
    },
    {
     "roll": 6,
     "text": "Huge."
    }
   ]
  },
  "terrain": {
   "id": "islandTerrain",
   "name": "Terrain",
   "die": "2d6",
   "page": 122,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "An atoll."
    },
    {
     "roll": 3,
     "text": "It's two islands."
    },
    {
     "roll": 4,
     "text": "Gentle hills."
    },
    {
     "roll": 5,
     "text": "Flat with a mountainous ridge."
    },
    {
     "roll": 6,
     "text": "Mostly flat."
    },
    {
     "roll": 7,
     "text": "Mostly flat."
    },
    {
     "roll": 8,
     "text": "Mostly flat."
    },
    {
     "roll": 9,
     "text": "Flat with one prominent hill."
    },
    {
     "roll": 10,
     "text": "Gentle hills."
    },
    {
     "roll": 11,
     "text": "A single mountain."
    },
    {
     "roll": 12,
     "text": "Mountainous and rugged."
    }
   ]
  },
  "vegetation": {
   "id": "islandVegetation",
   "name": "Vegetation",
   "die": "2d6",
   "page": 122,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "One single palm tree."
    },
    {
     "roll": 3,
     "text": "Barren: rocks."
    },
    {
     "roll": 4,
     "text": "Swampy grasslands."
    },
    {
     "roll": 5,
     "text": "Thorny scrub."
    },
    {
     "roll": 6,
     "text": "Sand and meadows."
    },
    {
     "roll": 7,
     "text": "Fertile grasslands."
    },
    {
     "roll": 8,
     "text": "Fertile grasslands."
    },
    {
     "roll": 9,
     "text": "Fields and woods."
    },
    {
     "roll": 10,
     "text": "Small pine forests."
    },
    {
     "roll": 11,
     "text": "Forests and meadows."
    },
    {
     "roll": 12,
     "text": "Rainforest."
    }
   ]
  },
  "naturalFeature": {
   "id": "islandFeature",
   "name": "Prominent Natural Feature",
   "die": "2d6",
   "page": 122,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "Volcanic."
    },
    {
     "roll": 3,
     "text": "Huge sand dunes."
    },
    {
     "roll": 4,
     "text": "Numerous sea stacks."
    },
    {
     "roll": 5,
     "text": "Black sand beaches."
    },
    {
     "roll": 6,
     "text": "Lagoon."
    },
    {
     "roll": 7,
     "text": "Azure water, white sand."
    },
    {
     "roll": 8,
     "text": "Waterfall(s)."
    },
    {
     "roll": 9,
     "text": "Fruit trees."
    },
    {
     "roll": 10,
     "text": "Mangrove forest."
    },
    {
     "roll": 11,
     "text": "Sea cliffs."
    },
    {
     "roll": 12,
     "text": "A huge skull-shaped rock."
    }
   ]
  },
  "animals": {
   "id": "islandAnimals",
   "name": "Notable Animal Inhabitants",
   "die": "2d6",
   "page": 122,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "Sharks. So many sharks."
    },
    {
     "roll": 3,
     "text": "Glowing jellyfish swarms."
    },
    {
     "roll": 4,
     "text": "Monkeys."
    },
    {
     "roll": 5,
     "text": "Fist sized orange beetles."
    },
    {
     "roll": 6,
     "text": "Sleek black seals."
    },
    {
     "roll": 7,
     "text": "Nothing to write home about."
    },
    {
     "roll": 8,
     "text": "Pigs and boars (large)."
    },
    {
     "roll": 9,
     "text": "Dog-sized lizards."
    },
    {
     "roll": 10,
     "text": "Large seabird colony."
    },
    {
     "roll": 11,
     "text": "Large flightless birds."
    },
    {
     "roll": 12,
     "text": "Dancing jewel-colored birds."
    }
   ]
  },
  "inhabitants": {
   "id": "islandInhabitants",
   "name": "Inhabitants",
   "die": "2d6",
   "page": 122,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "A witch."
    },
    {
     "roll": 3,
     "text": "Pearl divers."
    },
    {
     "roll": 4,
     "text": "A robust but primitive city."
    },
    {
     "roll": 5,
     "text": "Small primitive village."
    },
    {
     "roll": 6,
     "text": "Recently struck camps."
    },
    {
     "roll": 7,
     "text": "Uninhabited."
    },
    {
     "roll": 8,
     "text": "Don't know, but they're all dead."
    },
    {
     "roll": 9,
     "text": "Religious adherents."
    },
    {
     "roll": 10,
     "text": "Farming settlers."
    },
    {
     "roll": 11,
     "text": "Military."
    },
    {
     "roll": 12,
     "text": "A hidden pirate town."
    }
   ]
  },
  "hideTreasure": {
   "id": "islandHideTreasure",
   "name": "Best Place on the Island to Hide Treasure?",
   "die": "2d6",
   "page": 123,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "Old ruins."
    },
    {
     "roll": 3,
     "text": "A large rock shaped like a ship."
    },
    {
     "roll": 4,
     "text": "Under a huge lightning scarred oak."
    },
    {
     "roll": 5,
     "text": "A large natural rock arch."
    },
    {
     "roll": 6,
     "text": "An old lava tunnel."
    },
    {
     "roll": 7,
     "text": "Somewhere else."
    },
    {
     "roll": 8,
     "text": "Two palm trees cross in an X."
    },
    {
     "roll": 9,
     "text": "A large rock resembling a monkey."
    },
    {
     "roll": 10,
     "text": "A sink hole."
    },
    {
     "roll": 11,
     "text": "Near the strange ancient statues."
    },
    {
     "roll": 12,
     "text": "In the sea caves."
    }
   ]
  },
  "fortune": {
   "id": "islandFortune",
   "name": "Anything Here Worth a Fortune?",
   "die": "2d6",
   "page": 123,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "Wealthy shipwreck survivors."
    },
    {
     "roll": 3,
     "text": "Rare poisons."
    },
    {
     "roll": 4,
     "text": "Oysters here make red pearls."
    },
    {
     "roll": 5,
     "text": "Buried treasure... somewhere."
    },
    {
     "roll": 6,
     "text": "An excellent natural harbor. Build a town!"
    },
    {
     "roll": 7,
     "text": "Not really. Good fishing though."
    },
    {
     "roll": 8,
     "text": "Not exactly, but there's a rich trade route nearby."
    },
    {
     "roll": 9,
     "text": "Caves of bat guano."
    },
    {
     "roll": 10,
     "text": "Wild horses."
    },
    {
     "roll": 11,
     "text": "Whale spawning grounds."
    },
    {
     "roll": 12,
     "text": "A naturally hidden, excellent harbor."
    }
   ]
  },
  "hazards": {
   "id": "islandHazards",
   "name": "Natural Hazards",
   "die": "2d6",
   "page": 123,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "Manchineel trees. Everywhere."
    },
    {
     "roll": 3,
     "text": "Large whirlpools frequently form."
    },
    {
     "roll": 4,
     "text": "Quicksand."
    },
    {
     "roll": 5,
     "text": "Low lying areas flood. Frequently."
    },
    {
     "roll": 6,
     "text": "Coral reefs."
    },
    {
     "roll": 7,
     "text": "None."
    },
    {
     "roll": 8,
     "text": "Dangerous rocky shallows."
    },
    {
     "roll": 9,
     "text": "Dangerous currents."
    },
    {
     "roll": 10,
     "text": "Frequent earthquakes."
    },
    {
     "roll": 11,
     "text": "Animals infect humans with hemorrhagic fever."
    },
    {
     "roll": 12,
     "text": "A new volcano is about to erupt."
    }
   ]
  },
  "conflicts": {
   "id": "islandConflicts",
   "name": "Current Conflicts",
   "die": "2d6",
   "page": 123,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "10 pirate ships here for a secret meeting."
    },
    {
     "roll": 3,
     "text": "Imperial fleet firing upon inhabitants."
    },
    {
     "roll": 4,
     "text": "Imperial military building an outpost."
    },
    {
     "roll": 5,
     "text": "Pirates just raided, or are about to."
    },
    {
     "roll": 6,
     "text": "Explorers hunting animals to extinction."
    },
    {
     "roll": 7,
     "text": "None."
    },
    {
     "roll": 8,
     "text": "Recent shipwreck. Survivors stranded."
    },
    {
     "roll": 9,
     "text": "Current inhabitants diseased."
    },
    {
     "roll": 10,
     "text": "Religious order building a mission."
    },
    {
     "roll": 11,
     "text": "A party of 6 ruthless treasure hunters is here (not including you...)."
    },
    {
     "roll": 12,
     "text": "Rebels."
    }
   ]
  },
  "darkness": {
   "id": "islandDarkness",
   "name": "Darkness",
   "die": "2d6",
   "page": 123,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 2,
     "text": "A kraken dwells here."
    },
    {
     "roll": 3,
     "text": "Cultists."
    },
    {
     "roll": 4,
     "text": "An ancient graveyard full of ghosts."
    },
    {
     "roll": 5,
     "text": "A ghost ship haunts its waters."
    },
    {
     "roll": 6,
     "text": "Ancient rock altar of sacrifice. Well used."
    },
    {
     "roll": 7,
     "text": "Nothing to speak of."
    },
    {
     "roll": 8,
     "text": "Unspeakable monstrosities wash up on shore often."
    },
    {
     "roll": 9,
     "text": "Animals that die here don't stay dead."
    },
    {
     "roll": 10,
     "text": "Zombies walk at night."
    },
    {
     "roll": 11,
     "text": "Blood spilled here animates."
    },
    {
     "roll": 12,
     "text": "If you eat the food or drink the water here you can never leave."
    }
   ]
  }
 }
};

export const PB_JOBS: PbGenerator = {
 "page": 126,
 "source": "Core Rules",
 "note": "Roll on each table to build a job: Hook, Patron or Key NPC, Requirement, Time Restraint and Complication.",
 "tables": {
  "hook": {
   "id": "jobHook",
   "name": "Hook",
   "die": "d20",
   "page": 126,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Capture a prize."
    },
    {
     "roll": 2,
     "text": "Raid a port."
    },
    {
     "roll": 3,
     "text": "Treasure hunt."
    },
    {
     "roll": 4,
     "text": "Find someone/something."
    },
    {
     "roll": 5,
     "text": "Capture, interrogate, or kill someone."
    },
    {
     "roll": 6,
     "text": "Establish a new safe house, base, or hideout."
    },
    {
     "roll": 7,
     "text": "Sink a ship."
    },
    {
     "roll": 8,
     "text": "Steal an item."
    },
    {
     "roll": 9,
     "text": "Spy on someone."
    },
    {
     "roll": 10,
     "text": "Scavenge a wreck."
    },
    {
     "roll": 11,
     "text": "Explore or defend a location."
    },
    {
     "roll": 12,
     "text": "Sneak into somewhere."
    },
    {
     "roll": 13,
     "text": "Steal something."
    },
    {
     "roll": 14,
     "text": "Meet someone."
    },
    {
     "roll": 15,
     "text": "Establish trading or fencing relations with someone."
    },
    {
     "roll": 16,
     "text": "Free or rescue a person or group from a location."
    },
    {
     "roll": 17,
     "text": "Sabotage something."
    },
    {
     "roll": 18,
     "text": "Defend a location."
    },
    {
     "roll": 19,
     "text": "Free captives or prisoners."
    },
    {
     "roll": 20,
     "text": "Escape."
    }
   ]
  },
  "patron": {
   "id": "jobPatron",
   "name": "Patron or Key NPC",
   "die": "d10",
   "page": 126,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "A government leader."
    },
    {
     "roll": 2,
     "text": "A famous pirate captain."
    },
    {
     "roll": 3,
     "text": "The governor's daughter or son."
    },
    {
     "roll": 4,
     "text": "The local drunk."
    },
    {
     "roll": 5,
     "text": "A shady figure."
    },
    {
     "roll": 6,
     "text": "Some cultists."
    },
    {
     "roll": 7,
     "text": "An old friend."
    },
    {
     "roll": 8,
     "text": "Important looking pirates."
    },
    {
     "roll": 9,
     "text": "A love interest."
    },
    {
     "roll": 10,
     "text": "A mermaid."
    }
   ]
  },
  "requirement": {
   "id": "jobRequirement",
   "name": "Requirement",
   "die": "d6",
   "page": 126,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Stay out of combat."
    },
    {
     "roll": 2,
     "text": "Kill only one person."
    },
    {
     "roll": 3,
     "text": "Kill everyone."
    },
    {
     "roll": 4,
     "text": "Make it look like someone else did it."
    },
    {
     "roll": 5,
     "text": "Bring a hostage back alive."
    },
    {
     "roll": 6,
     "text": "Vital information must be obtained."
    }
   ]
  },
  "timeRestraint": {
   "id": "jobTime",
   "name": "Time Restraint",
   "die": "d6",
   "page": 126,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Immediately!"
    },
    {
     "roll": 2,
     "text": "Within the hour."
    },
    {
     "roll": 3,
     "text": "By tonight."
    },
    {
     "roll": 4,
     "text": "By tomorrow."
    },
    {
     "roll": 5,
     "text": "Next week."
    },
    {
     "roll": 6,
     "text": "This month."
    }
   ]
  },
  "complication": {
   "id": "jobComplication",
   "name": "Complication",
   "die": "d6",
   "page": 126,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "It's a setup."
    },
    {
     "roll": 2,
     "text": "The intel is wrong."
    },
    {
     "roll": 3,
     "text": "Another crew is already on the job."
    },
    {
     "roll": 4,
     "text": "Some who's not supposed to be there is."
    },
    {
     "roll": 5,
     "text": "The reward is suspiciously big."
    },
    {
     "roll": 6,
     "text": "Everything is proceeding as planned."
    }
   ]
  }
 }
};

export const PB_JOKER_TABLE: PbTable = {
 "id": "joker",
 "name": "Joker Table",
 "die": "d20",
 "page": 37,
 "source": "Player's Guidebook",
 "note": "Rapscallion Lucky Devil: drawing a Joker after using Devil's Luck.",
 "rows": [
  {
   "roll": 1,
   "name": "The Devil",
   "text": "The Devil comes for your soul. You are sucked into a fiery portal — this is the end of your story.",
   "dead": true
  },
  {
   "roll": [
    2,
    9
   ],
   "text": "Lose all of your remaining Luck points.",
   "luck": "zero"
  },
  {
   "roll": [
    10,
    19
   ],
   "text": "Regain 2 Luck points.",
   "luck": 2
  },
  {
   "roll": 20,
   "text": "Gain 4 Luck points (to a max of 4).",
   "luck": 4,
   "luckMax": 4
  }
 ]
};

export const PB_LANDLUBBER: PbClass = {
 "id": "landlubber",
 "name": "Landlubber",
 "page": 27,
 "text": "A PC with no class. Landlubbers may roll 4d6 and drop the lowest die for each ability.",
 "abilityRoll": "4d6 drop lowest",
 "abilities": {
  "STRENGTH": 0,
  "AGILITY": 0,
  "PRESENCE": 0,
  "TOUGHNESS": 0,
  "SPIRIT": 0
 },
 "hpDie": "d10",
 "luckDie": "d2",
 "weapon": {
  "die": "d10"
 },
 "clothingDie": "d10",
 "hatDie": "d12",
 "restrictions": {
  "rituals": true,
  "relics": true,
  "magicArmorTier": 1,
  "metal": true
 },
 "tables": []
};

export const PB_LOOT_THE_BODY: PbTable = {
 "id": "lootTheBody",
 "name": "Loot the Body",
 "die": "d100",
 "page": 3,
 "source": "Core Rules",
 "note": "Text in the `hidden` part is not immediately obvious. Add the number rolled in silver for extra loot. 00 (100) = roll again twice.",
 "addRollAsSilver": true,
 "rows": [
  {
   "roll": [
    1,
    20
   ],
   "text": "The result on the Ancient Relics table (pg. 62).",
   "table": "relics"
  },
  {
   "roll": 21,
   "text": "Skull with glowing green sockets."
  },
  {
   "roll": 22,
   "text": "A nasty-looking knife (d6).",
   "damage": "d6"
  },
  {
   "roll": 23,
   "text": "Wanted poster with a picture of one of the PCs on it."
  },
  {
   "roll": 24,
   "text": "Black candle.",
   "hidden": "When lit its purple flame forms a skull."
  },
  {
   "roll": 25,
   "text": "Single golden manacle with 5 links."
  },
  {
   "roll": 26,
   "text": "A leather journal.",
   "hidden": "Contains 1 sea shanty (pg. 68).",
   "table": "shanties"
  },
  {
   "roll": 27,
   "text": "Oil lantern filled with dark green liquid.",
   "hidden": "It burns a pale green light for 5', but never runs out."
  },
  {
   "roll": 28,
   "text": "Fine metal flask."
  },
  {
   "roll": 29,
   "text": "Bag of white powder."
  },
  {
   "roll": 30,
   "text": "Small box with d12 black pearls",
   "hidden": "worth a fortune."
  },
  {
   "roll": 31,
   "text": "Sea shell lined with mother of pearl."
  },
  {
   "roll": 32,
   "text": "Pipe carved out of whale bone.",
   "hidden": "A mysterious map is carved in the bowl."
  },
  {
   "roll": 33,
   "text": "Dead rat."
  },
  {
   "roll": 34,
   "text": "Jewel encrusted egg.",
   "hidden": "AGILITY DR18 to open or it breaks. Clockwork inside, worth 500s."
  },
  {
   "roll": 35,
   "text": "d8 crab claws.",
   "hidden": "Throwing them before casting a ritual lowers the DR by 1."
  },
  {
   "roll": 36,
   "text": "Stone ring with an engraved rune."
  },
  {
   "roll": 37,
   "text": "Deep blue gemstone.",
   "hidden": "It sparkles in the moonlight."
  },
  {
   "roll": 38,
   "text": "Obsidian figurine of a kraken.",
   "hidden": "The Kraken won't attack you."
  },
  {
   "roll": 39,
   "text": "Parrot feather.",
   "hidden": "+1 Devil's Luck each dawn."
  },
  {
   "roll": 40,
   "text": "Some rotten dried fruit."
  },
  {
   "roll": 41,
   "text": "Recipe for turtle stew.",
   "hidden": "If made, everyone who can smell it passes out. At sea, the crew awakes with their ship drifting near a mysterious island."
  },
  {
   "roll": 42,
   "text": "Small book on tying sailor knots."
  },
  {
   "roll": 43,
   "text": "Deck of playing cards.",
   "hidden": "The queens are mermaids."
  },
  {
   "roll": 44,
   "text": "Random bomb (pg. 53).",
   "table": "bombs"
  },
  {
   "roll": 45,
   "text": "Jar of d10 eyeballs preserved in white rum. They still see."
  },
  {
   "roll": 46,
   "text": "Set of lock picks."
  },
  {
   "roll": 47,
   "text": "Paper doll painted with blood."
  },
  {
   "roll": 48,
   "text": "Deep green gemstone",
   "hidden": "worth 100s."
  },
  {
   "roll": 49,
   "text": "Small wood flute."
  },
  {
   "roll": [
    50,
    59
   ],
   "text": "The result in silver.",
   "silver": "roll"
  },
  {
   "roll": 60,
   "text": "Leather eye patch.",
   "hidden": "That eye can see in the dark."
  },
  {
   "roll": 61,
   "text": "Flintlock pistol with tally marks."
  },
  {
   "roll": 62,
   "text": "d4 gold teeth."
  },
  {
   "roll": 63,
   "text": "Letter from a bonnie lass."
  },
  {
   "roll": 64,
   "text": "A ship's schedule",
   "hidden": "with details of a treasure ship."
  },
  {
   "roll": 65,
   "text": "Jar of black sand."
  },
  {
   "roll": 66,
   "text": "Book of dark rituals.",
   "hidden": "Test SPIRIT DR14 to learn one random ritual (pg. 64) or else permanently lose 1 SPIRIT."
  },
  {
   "roll": 67,
   "text": "Handwritten collection of ghost stories."
  },
  {
   "roll": 68,
   "text": "Book: A Guide to Sailor Tattoos."
  },
  {
   "roll": 69,
   "text": "A live rat."
  },
  {
   "roll": 70,
   "text": "d4 dead fish."
  },
  {
   "roll": 71,
   "text": "Vial of blowfish poison.",
   "hidden": "Test TOUGHNESS DR12 or take d10 damage."
  },
  {
   "roll": 72,
   "text": "Treasure map (pg. 119).",
   "table": "treasureMaps"
  },
  {
   "roll": 73,
   "text": "A glass eye",
   "hidden": "that always looks West."
  },
  {
   "roll": 74,
   "text": "Broken cutlass hilt (d4)."
  },
  {
   "roll": 75,
   "text": "Glass dagger.",
   "hidden": "(3d4), breaks after 1 use."
  },
  {
   "roll": 76,
   "text": "Book: The Secret Art of Fencing in the Age of Gunpowder.",
   "hidden": "Test PRESENCE DR12 to permanently gain +1 STRENGTH. It only works once."
  },
  {
   "roll": 77,
   "text": "Bottle filled with iridescent dust."
  },
  {
   "roll": 78,
   "text": "Lint.",
   "hidden": "Flammable."
  },
  {
   "roll": 79,
   "text": "Golden idol.",
   "hidden": "Priceless, belongs in a museum."
  },
  {
   "roll": [
    80,
    89
   ],
   "text": "d8 gold doubloons",
   "hidden": "worth the result in silver."
  },
  {
   "roll": [
    90,
    99
   ],
   "text": "Random Thing of Importance (pg. 60).",
   "table": "things"
  },
  {
   "roll": 100,
   "text": "Roll again twice (00).",
   "rollAgain": 2
  }
 ]
};

export const PB_MARROW_CANNONS: PbMarrowCannons = {
 "page": 108,
 "source": "Core Rules",
 "author": "Christian Eichhorn",
 "text": "Sentient undead cannons built by necrosmiths from human, livestock and fish remains plundered from graveyards and battlefields. The mightiest have smoothbore whalebone barrels and are named after the first city they reduced to rubble. They fight as creatures in melee and as weapons in naval combat; Ships of Bone carry them (pg. 85).",
 "monsters": [
  "marrow-carronade",
  "marrow-mortar",
  "bane-of-barbados"
 ]
};

export const PB_MISHAPS: PbMishap[] = [
 {
  "roll": 1,
  "text": "Everything before you vanishes and you are alone on a gray island. A figure robed in black can be seen on a boat in the distance.",
  "hidden": "Welcome to purgatory."
 },
 {
  "roll": 2,
  "text": "Everyone within d20 feet vomits briny water and sea urchins (and loses 4 HP).",
  "damage": 4
 },
 {
  "roll": 3,
  "text": "A wraith appears — the ghost of an old captain. Roll reaction for it (pg. 31).",
  "hidden": "It leaves after d6 rounds."
 },
 {
  "roll": 4,
  "text": "You are possessed by an ancient, arcane spirit for d4 rounds. Roll reaction (pg. 31) to see how you react to others."
 },
 {
  "roll": 5,
  "text": "You go insane, convinced this world is a dream you must wake from. Test SPIRIT DR12 every dawn to see if you come to your senses."
 },
 {
  "roll": 6,
  "text": "Nothing happens…",
  "hidden": "…until the Kraken appears in d6 days."
 },
 {
  "roll": 7,
  "text": "Gravity behaves as if everything within 30' is underwater…",
  "hidden": "…for d8 minutes."
 },
 {
  "roll": 8,
  "text": "d12 BIRDS! They swarm you and all around. HP 2, Morale –, no armor, bite d2.",
  "hidden": "They flee when half are defeated.",
  "summon": "mishap-birds"
 },
 {
  "roll": 9,
  "text": "All metal within 30' becomes molten hot and glows red for 1 minute.",
  "hidden": "Anyone touching metal after the first round is burned for d2 damage."
 },
 {
  "roll": 10,
  "text": "Your vision permanently fills with water; the world looks submerged and obscured. PRESENCE tests involving sight are +4 DR from now on.",
  "hidden": "Underwater you see like a fish."
 },
 {
  "roll": 11,
  "text": "The weather and time of day are immediately, completely different.",
  "hidden": "You and everything within a 3-mile radius have traveled 4d12 hours into the future."
 },
 {
  "roll": 12,
  "text": "Clouds darken, winds pick up and the temperature drops d10 × 10 degrees.",
  "hidden": "A thunderstorm moves in."
 },
 {
  "roll": 13,
  "text": "A massive earthquake shakes the ground. At sea, tidal waves swell."
 },
 {
  "roll": 14,
  "text": "You've simply forgotten how to cast the ritual.",
  "hidden": "You no longer know it — remove it from your sheet.",
  "removeRitual": true
 },
 {
  "roll": 15,
  "text": "Eldritch voices whisper in your ears. Test SPIRIT DR12 or take d2 damage out of horror.",
  "hidden": "If you pass, the next time you consider accessing the arcane you discover you know one random new ritual."
 },
 {
  "roll": 16,
  "text": "The ritual succeeds, but in the worst way possible. GM decides: a different target, it goes off at the wrong time, you cast it on yourself, etc."
 },
 {
  "roll": 17,
  "text": "Your mind is lost at sea for what seems like 3d10 years, yet no time has passed.",
  "hidden": "Others watch as you age 3d10 years in a matter of seconds."
 },
 {
  "roll": 18,
  "text": "Hundreds of tiny crabs swarm you. They're harmless and provide an extra −d2 damage reduction (not armor).",
  "hidden": "They leave after d6 days, but return every full moon.",
  "extraArmor": "d2"
 },
 {
  "roll": 19,
  "text": "Everyone you can see recovers 3d6 HP…",
  "hidden": "…including your enemies.",
  "heal": "3d6"
 },
 {
  "roll": 20,
  "text": "Time stops and you experience a moment of absolute cosmic understanding and bliss.",
  "hidden": "When you regain your composure, time resumes, you have learned a new ritual of your choice and your SPIRIT is increased by +1.",
  "ability": {
   "SPIRIT": 1
  }
 }
];

export const PB_MODULE_SKELETON_POINT: PbModule = {
 "id": "curse-of-skeleton-point",
 "name": "The Curse of Skeleton Point",
 "page": 128,
 "source": "The Curse of Skeleton Point",
 "book": "Core Rules",
 "overview": "A sandbox location guide, NPC dossier and dungeon crawl on Black Coral Bay, a gloomy, cursed tropical island of ~1,500 people. Coral Town is a run-down pirate haven ruled by Governor Claude Barlette — secretly a 150-year-old necromancer who keeps the island cursed. On the islet of Skeleton Point stands an old castle (a shipwreck impaled on one turret) that is serene by day and deadly by night, haunted by The Baron. The Governor's daughter Veronique is missing: she has run away to live with The Baron, with whom she is in love.",
 "secret": "Anything that dies on the island rises as a zombie the next sunset. The Governor maintains the curse with monthly rituals; if The Baron is destroyed he reforms in the castle crypt. Not even Father Wallace suspects; the witch Tela Fafane might, if convinced to care.",
 "starts": [
  "Campaign: the PCs arrive on the docks and explore — Captain Davies teaches sailing and naval combat, the Green Kraken has rumors and jobs, and the Governor or Father Wallace point them at the castle.",
  "Short arc or one-shot: start aboard a sloop with a simple naval combat, meet the Governor on docking and head for the castle quickly.",
  "Locations and NPCs can be lifted into any setting."
 ],
 "reward": "The Governor pays 1,000s (rising 100s a day) for information leading to Veronique's return.",
 "plotHooks": {
  "id": "spPlotHooks",
  "name": "Plot Hooks",
  "die": "d6",
  "page": 131,
  "source": "The Curse of Skeleton Point",
  "rows": [
   {
    "roll": 1,
    "text": "News and rumors can be bought at the Treasured Chest; ask for Madame Dubois."
   },
   {
    "roll": 2,
    "text": "The Governor's daughter is missing and he'll pay a hefty reward for her return."
   },
   {
    "roll": 3,
    "text": "Every tavern tells of a treasure hoard in the castle at Skeleton Point — none who entered have returned."
   },
   {
    "roll": 4,
    "text": "Father Wallace is gathering anyone willing to help exorcise the castle's spirits."
   },
   {
    "roll": 5,
    "text": "Rumors of an evil witch in the swamp — is she behind the curse, or does she sell potions?"
   },
   {
    "roll": 6,
    "text": "Captain Davies is recruiting pirates for a raid at the Green Kraken."
   }
  ]
 },
 "development": {
  "id": "spDevelopment",
  "name": "If the Players Do Nothing",
  "die": "d6",
  "page": 131,
  "source": "The Curse of Skeleton Point",
  "note": "Use in order (one per session) or when the PCs leave for a long time.",
  "rows": [
   {
    "roll": 1,
    "text": "The Governor raises his reward by 100s a day until someone investigates the castle."
   },
   {
    "roll": 2,
    "text": "Father Wallace tries to exorcise the castle alone and is killed; the church falls further into ruin."
   },
   {
    "roll": 3,
    "text": "Davies dies in a skirmish with the Royal Navy; after a huge beach wake a power vacuum opens, and his ghost ship haunts the surrounding waters."
   },
   {
    "roll": 4,
    "text": "A returning search party reveals Veronique left willingly; the furious Governor hires every pirate to drag her back."
   },
   {
    "roll": 5,
    "text": "The pirates storm the castle and Veronique dies; the Governor's rage razes the island and the dead rise as undead."
   },
   {
    "roll": 6,
    "text": "Tela Fafane strikes back with her own zombie horde; the Governor is defeated, the curse lifts and pirates return."
   }
  ]
 },
 "npcs": [
  {
   "source": "The Curse of Skeleton Point",
   "id": "claude-barlette",
   "name": "Claude Barlette",
   "role": "The Governor (secret necromancer)",
   "page": 132,
   "monster": "claude-barlette",
   "wants": "Seems to want his daughter back, the 'ghost problem' gone and taxes; really wants his daughter, control of the island and his secret kept.",
   "doing": {
    "die": "d10",
    "rows": [
     {
      "roll": [
       0,
       2
      ],
      "text": "Counting taxes, overindulging or sleeping in his mansion."
     },
     {
      "roll": [
       3,
       5
      ],
      "text": "About town."
     },
     {
      "roll": [
       6,
       8
      ],
      "text": "In meetings about his daughter."
     },
     {
      "roll": 9,
      "text": "Conducting a blood ritual in the lighthouse basement."
     }
    ]
   }
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "veronique-barlette",
   "name": "Veronique Barlette",
   "role": "The Governor's daughter",
   "page": 132,
   "monster": "veronique-barlette",
   "wants": "To marry the Baron (not if he becomes human), to paint his portrait, freedom from her father, painting supplies (pays up to 100s).",
   "doing": {
    "die": "d10",
    "rows": [
     {
      "roll": 0,
      "text": "With the Baron."
     },
     {
      "roll": [
       1,
       3
      ],
      "text": "Painting storm clouds on the castle terrace."
     },
     {
      "roll": [
       4,
       6
      ],
      "text": "Gathering supplies or painting in the jungle."
     },
     {
      "roll": [
       7,
       8
      ],
      "text": "Wandering or reading in the castle."
     },
     {
      "roll": 9,
      "text": "Sleeping in the Baron's chambers."
     }
    ]
   }
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "the-baron",
   "name": "The Baron",
   "role": "The monster",
   "page": 132,
   "monster": "the-baron",
   "wants": "Death to intruders, Veronique's happiness, to remember his past — and, if he learns of it, the curse lifted and revenge on its caster.",
   "doing": {
    "die": "d10",
    "rows": [
     {
      "roll": 0,
      "text": "With Veronique."
     },
     {
      "roll": [
       1,
       2
      ],
      "text": "Patrolling the nearby jungle."
     },
     {
      "roll": [
       3,
       4
      ],
      "text": "Torturing a prisoner in the dungeon."
     },
     {
      "roll": [
       5,
       6
      ],
      "text": "Training new skeletons in swordplay."
     },
     {
      "roll": [
       7,
       8
      ],
      "text": "Patrolling the castle (d20 for the room, pg. 158)."
     },
     {
      "roll": 9,
      "text": "Staring vacantly out to sea: \"Who am I?\""
     }
    ]
   }
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "tela-fafane",
   "name": "Tela Fafane",
   "role": "The \"witch\"",
   "page": 133,
   "monster": "tela-fafane",
   "wants": "A modest living from her concoctions, to scare the villagers, rare ingredients and antiquities. Sells relics, rituals and potions (pg. 155).",
   "doing": {
    "die": "d10",
    "rows": [
     {
      "roll": 0,
      "text": "Conducting a candlelight ritual."
     },
     {
      "roll": [
       1,
       4
      ],
      "text": "In her swamp cabin."
     },
     {
      "roll": [
       5,
       6
      ],
      "text": "Feeding her chickens."
     },
     {
      "roll": [
       7,
       8
      ],
      "text": "Gathering ingredients in the swamp or jungle."
     },
     {
      "roll": 9,
      "text": "In disguise in Coral Town's market."
     }
    ]
   }
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "father-wallace",
   "name": "Father Wallace",
   "role": "The abbot",
   "page": 133,
   "monster": "father-wallace",
   "wants": "To exorcise the castle, recruit followers, and see his altar boy Rupert take over the church.",
   "doing": {
    "die": "d10",
    "rows": [
     {
      "roll": 0,
      "text": "Praying at the castle bridge, turning back unprepared adventurers."
     },
     {
      "roll": [
       1,
       4
      ],
      "text": "Conducting mass or taking confessions."
     },
     {
      "roll": [
       5,
       8
      ],
      "text": "Reading, writing or teaching Rupert in the church."
     },
     {
      "roll": 9,
      "text": "Sleeping in his Shanty Town tent (night only)."
     }
    ]
   }
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "captain-davies",
   "name": "Captain Davies",
   "role": "The pirate boss, captain of The Eye of Chaos",
   "page": 133,
   "monster": "captain-davies",
   "wants": "Profit from smuggling, plunder or gambling — and intimate attention, preferably while drunk.",
   "doing": {
    "die": "d10",
    "rows": [
     {
      "roll": [
       0,
       1
      ],
      "text": "About town, surveying the docks."
     },
     {
      "roll": [
       2,
       3
      ],
      "text": "Counting supplies with pirates in the Carcass Beach caves."
     },
     {
      "roll": [
       4,
       6
      ],
      "text": "Carousing, holding court or playing cards at the Green Kraken or aboard The Eye of Chaos."
     },
     {
      "roll": 7,
      "text": "Trading with Tela Fafane."
     },
     {
      "roll": [
       8,
       9
      ],
      "text": "Away at sea."
     }
    ]
   }
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "beatrice-boivin",
   "name": "Beatrice Boivin",
   "role": "French privateer (Le Mercure)",
   "page": 147,
   "monster": "beatrice-boivin"
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "pedro-de-balboa",
   "name": "Pedro de Balboa",
   "role": "Spanish conquistador, Church enforcer",
   "page": 147,
   "monster": "pedro-de-balboa"
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "john-lloyd-catherwood",
   "name": "John Lloyd Catherwood",
   "role": "English artist and cartographer",
   "page": 147,
   "monster": "john-lloyd-catherwood"
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "high-wizard-clementius",
   "name": "High Wizard Clementius",
   "role": "Sect leader of The Wretched",
   "page": 147,
   "monster": "high-wizard-clementius"
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "xoth",
   "name": "Xoth, Imp from the Dark Shore",
   "role": "Clementius's demon pet",
   "page": 147,
   "monster": "xoth-the-imp"
  },
  {
   "source": "The Curse of Skeleton Point",
   "id": "the-nameless-one",
   "name": "The Nameless One",
   "role": "Sealed deep-sea horror",
   "page": 147,
   "monster": "the-nameless-one"
  }
 ],
 "locations": [
  {
   "id": "coral-town",
   "num": 1,
   "name": "Coral Town",
   "page": 138,
   "text": "Run-down port full of pirates and miscreants: docks, shanty town, taverns, brothels and an old church. Use the Job & Quest Generator (pg. 126) whenever someone might have work.",
   "areas": [
    "The Docks (d12 vessels in port)",
    "The Green Kraken tavern (barkeep Jonesy; Davies's booth)",
    "The Shipwright (Helga; standard shipwright prices, pg. 77)",
    "The Eye of Chaos (Davies's restored galleon)",
    "Shanty Town & Marketplace (most items under 40s)",
    "The Treasured Chest (Madam Dubois; rumors 10s each)",
    "Governor's Mansion (masquerade ball every 3 months)",
    "The Old Church (Father Wallace, altar boy Rupert; crypt with secret passage)",
    "The Graveyard (tunnels to the church; good spot for a dungeon crawl)"
   ]
  },
  {
   "id": "lighthouse",
   "num": 2,
   "name": "The Old Lighthouse",
   "page": 140,
   "text": "Ruined lighthouse haunted at night by the ghost of keeper Cornelius Willem, who longs to make amends with his daughter Famke (now a widowed sailmaker in town). A hidden ritual chamber in the cellar is the Governor's.",
   "areas": [
    "1 Keeper's Quarters",
    "2 Lower Tower",
    "3 Mid Tower",
    "4 Upper Tower",
    "5 Cellar",
    "6 Ritual Chamber (casting here at night: +5 to the roll, auto-pass with human blood, once a night; failure summons a Shadow Demon instead of a Mishap)"
   ]
  },
  {
   "id": "carcass-beach",
   "num": 3,
   "name": "Carcass Beach",
   "page": 142,
   "text": "Bone-sand beach and sea caves where Davies runs his smuggling operation; the bow of the Cagafuego lies wrecked here.",
   "areas": [
    "1 The Beach",
    "2 Bow of the Cagafuego (Drake's ghost holds court each full moon)",
    "3 The Store Room",
    "4 Rocky Passage",
    "5 Cenote (to the reef and underground lake)",
    "6 The Meeting Hall",
    "7 Captain's Quarters"
   ]
  },
  {
   "id": "skeleton-point",
   "num": 4,
   "name": "Skeleton Point",
   "page": 158,
   "text": "The Baron's seaside castle with a galleon wedged in a turret: calm by day, haunted by night.",
   "areas": [
    "1 Portcullis & Courtyard",
    "2 Foyer",
    "3 Dining Hall",
    "4 Rookery",
    "5 Galleon",
    "6 Captain's Cabin (Three-Headed Monkey)",
    "7 Library",
    "8 The Baron's Chambers",
    "9 Studio",
    "10 Laboratory",
    "11 Kitchen",
    "12 Butler's Chambers",
    "13 Servant's Quarters",
    "14 Locked Door",
    "15 Treasure Vault",
    "16 Storage Chamber",
    "17 Crypt",
    "18 Mausoleum",
    "19 Dungeon",
    "20 Secret Cave"
   ]
  },
  {
   "id": "the-jungle",
   "num": 5,
   "name": "The Jungle",
   "page": 144,
   "text": "Dense jungle full of hungry predators by day and hungry undead by night. The Nameless Temple lies hidden beneath a great tree.",
   "areas": [
    "Clayborn's Tree House",
    "The Temple Entrance",
    "Cultists Glow (night)"
   ]
  },
  {
   "id": "nameless-temple",
   "name": "The Nameless Temple",
   "page": 146,
   "text": "Three layered locations built over an underground healing lake where a Mesoan shaman's summoned horror, The Nameless One, was sealed behind the Omega Stone. The Wretched now sacrifice there to wake it.",
   "levels": [
    {
     "name": "Shrine of the Nameless Skull",
     "page": 148,
     "areas": [
      "1 Main Chamber",
      "2 Circular Carving",
      "3 Storage Chamber",
      "4 Entrance Chamber",
      "5 Entrance Corridor",
      "6 Rotting Room",
      "7 Round Room (Hans)",
      "8 Cave-in Room",
      "9 Well Room"
     ]
    },
    {
     "name": "Sanctum of Nameless Blood",
     "page": 150,
     "areas": [
      "1 Entrance Chamber",
      "2 Paneled Room",
      "3 Hidden Tomb",
      "4 Encampment",
      "5 Dungeon",
      "6 Room of Bone",
      "7 Mine Tunnel",
      "8 Ceremonial Hall",
      "9 Blood Pool",
      "10 Ziggurat Chamber",
      "11 Omega Chamber"
     ]
    },
    {
     "name": "The Lake of the Nameless One",
     "page": 152,
     "areas": [
      "1 Ledge, Scaffold, Steps",
      "2 Landing",
      "3 Bone Pile",
      "4 Stepping Stones",
      "5 The Island",
      "6 The Lake",
      "7 The Wreck",
      "8 Cavern Lair",
      "9 Cenote Entrance",
      "10 Cenote"
     ]
    }
   ]
  },
  {
   "id": "deaths-head-swamp",
   "num": 6,
   "name": "Death's Head Swamp",
   "page": 154,
   "text": "Dark, muddy and depressing; home of Tela Fafane, who can teach Arcane Rituals or brew Alchemy Potions for a price. Beware crocodiles and the musicians called the Ship of Fools."
  },
  {
   "id": "black-coral-reef",
   "num": 7,
   "name": "Black Coral Reef",
   "page": 156,
   "text": "A reef turned black by millions of black coral crabs, with giant pearls (500s-5,000s) in 3' darkpoint oysters and drifting acid jellyfish.",
   "areas": [
    "1 Lagoon",
    "2 Shipwreck (stern of the Cagafuego; eel-fighting club)",
    "3 Kelp Forest",
    "4 Sea Caves (a hibernating Coral Shoggoth)",
    "5 Sunken Ruins",
    "6 Escarpment"
   ]
  }
 ],
 "shop": {
  "id": "telasPrices",
  "name": "Tela's Prices",
  "page": 155,
  "source": "The Curse of Skeleton Point",
  "note": "Prices may swing from 50% to 300% depending on ingredients, supply, demand and Tela's mood. Potions are 50% off if the buyer provides a needed ingredient (roll or pick on pg. 70).",
  "relics": [
   {
    "name": "Undead Bird",
    "cost": 25,
    "relic": "undead-bird"
   },
   {
    "name": "Will-o'-the-Wisp Lantern",
    "cost": 50,
    "relic": "will-o-the-wisp-lantern"
   },
   {
    "name": "Mummified Monkey Head",
    "cost": 75,
    "relic": "mummified-monkey-head"
   }
  ],
  "rituals": [
   {
    "name": "Divination",
    "cost": 50,
    "costText": "50s per question (the first is free)",
    "ritual": "divination"
   },
   {
    "name": "Return From The Locker",
    "cost": 1000,
    "ritual": "return-from-the-locker"
   },
   {
    "name": "Weathercraft",
    "cost": 150,
    "ritual": "weathercraft"
   },
   {
    "name": "Learn one of the above (3-day course)",
    "costText": "×10",
    "multiplier": 10
   }
  ],
  "potions": [
   {
    "name": "Love potion (lasts 1 day)",
    "cost": 50
   },
   {
    "name": "Love potion (permanent)",
    "cost": 1000
   },
   {
    "name": "Healing potion (injection, heal d6)",
    "cost": 50,
    "heal": "d6"
   },
   {
    "name": "Paralysis (ingestion, DR10, d8 hours)",
    "cost": 40
   },
   {
    "name": "Random potion",
    "cost": 100,
    "table": "alchemy"
   },
   {
    "name": "Identify the effect of a potion",
    "cost": 25
   }
  ]
 },
 "tables": {
  "dayEncounters": {
   "id": "spDay",
   "name": "Black Coral Bay: Daytime Encounters",
   "die": "2d6",
   "page": 135,
   "source": "The Curse of Skeleton Point",
   "note": "Roll when changing locations; skip if the action is moving.",
   "rows": [
    {
     "roll": 2,
     "text": "1 confused Deep One named S'pht'Gl'Koo. He doesn't speak \"human.\"",
     "monster": "deep-ones"
    },
    {
     "roll": 3,
     "text": "2d12 bilge rats (pg. 86).",
     "monster": "bilge-rat"
    },
    {
     "roll": 4,
     "text": "1d4 new zombies (pg. 94). They are hungry.",
     "monster": "bilge-rat-zombie"
    },
    {
     "roll": 5,
     "text": "d2 rabid jaguars (pg. 86) hunting for their cubs.",
     "monster": "rabid-jaguar"
    },
    {
     "roll": 6,
     "text": "The Three-Headed Monkey (pg. 86) that lives in the shipwreck on the castle (pg. 158).",
     "monster": "three-headed-monkey"
    },
    {
     "roll": 7,
     "text": "1d6 pirates (pg. 124) looking for trouble.",
     "table": "pirateGenerator"
    },
    {
     "roll": 8,
     "text": "3d4 carrion gulls (pg. 87).",
     "monster": "carrion-gull"
    },
    {
     "roll": 9,
     "text": "Captain Davies and d12 of his men: moving cargo, patrolling, carousing, or chasing another NPC.",
     "monster": "captain-davies"
    },
    {
     "roll": 10,
     "text": "Tela Fafane gathering ingredients for a ritual or potion.",
     "monster": "tela-fafane"
    },
    {
     "roll": 11,
     "text": "An old man named Clayborn. He lives in a tree house and knows a lot about the island."
    },
    {
     "roll": 12,
     "text": "Veronique Barlette painting a landscape. She does not trust people she does not know.",
     "monster": "veronique-barlette"
    }
   ]
  },
  "nightEncounters": {
   "id": "spNight",
   "name": "Black Coral Bay: Nighttime Encounters",
   "die": "2d6",
   "page": 135,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 2,
     "text": "Governor Barlette huddled over a fire pit mid-ritual, 2d4 sea wraiths circling him. He pretends he is under attack.",
     "monster": "claude-barlette"
    },
    {
     "roll": [
      3,
      4
     ],
     "text": "d100 fireflies glowing pale blue."
    },
    {
     "roll": [
      5,
      6
     ],
     "text": "3d6 weak zombies (pg. 94): starving but slow, 1 HP each.",
     "monster": "bilge-rat-zombie"
    },
    {
     "roll": [
      7,
      8
     ],
     "text": "2d4 skeletons (pg. 92) looking for trouble.",
     "monster": "skeleton-rank-and-vile"
    },
    {
     "roll": 9,
     "text": "d4 of The Drowned (pg. 100), wandering inland from Carcass Beach.",
     "monster": "the-drowned"
    },
    {
     "roll": 10,
     "text": "The Three-Headed Monkey (pg. 158).",
     "monster": "three-headed-monkey"
    },
    {
     "roll": 11,
     "text": "The Baron \"hunting\" the living.",
     "monster": "the-baron"
    },
    {
     "roll": 12,
     "text": "The grim reaper points at a PC and vanishes. A spot appears on their body."
    }
   ]
  },
  "shipsDocked": {
   "id": "spShipsDocked",
   "name": "Coral Town: Ships Docked",
   "die": "d12",
   "page": 139,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "The Dark Diamond — small, fast sloop of smugglers (rum, sugar, prisoners of war).",
     "ship": "sloop"
    },
    {
     "roll": 2,
     "text": "Jade Rebellion — a strange ship from a distant land selling spices and stranger stories; chests of carved jade in the hold."
    },
    {
     "roll": 3,
     "text": "The Ranger — brigantine with a small, loyal crew and a batshit-crazy captain.",
     "ship": "brigantine"
    },
    {
     "roll": 4,
     "text": "Mist Walker — tartane with two big triangle sails; a fence vessel for stolen pirate cargo.",
     "ship": "tartane"
    },
    {
     "roll": 5,
     "text": "The Tyrant — an outrigger canoe with one small sail, a fearsome reputation and a mysterious owner.",
     "ship": "canoe"
    },
    {
     "roll": 6,
     "text": "Gilded Raven — fast frigate, well-trained crew of deserter marines, black sails.",
     "ship": "frigate"
    },
    {
     "roll": 7,
     "text": "The Royal Dragon — large decorated fluyt stolen from nobles; the figurehead talks; recruiting for a raid.",
     "ship": "fluyt"
    },
    {
     "roll": 8,
     "text": "King of Spires — an old, ruined galleon that hasn't left the docks in years.",
     "ship": "galleon"
    },
    {
     "roll": 9,
     "text": "The Sea Bat — small jet-black sloop; its 4-person crew could become friends… or rivals.",
     "ship": "sloop"
    },
    {
     "roll": 10,
     "text": "Storm's End — a sloop with an old, wise captain and his pet owl.",
     "ship": "sloop"
    },
    {
     "roll": 11,
     "text": "Queen Isabella's Malice — frigate with a hotshot crew nobody likes.",
     "ship": "frigate"
    },
    {
     "roll": 12,
     "text": "Scorn of the West — a very old, well-maintained war vessel."
    }
   ]
  },
  "townRumors": {
   "id": "spTownRumors",
   "name": "Coral Town Rumors",
   "die": "2d6",
   "page": 139,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 2,
     "text": "Without his perfume the Governor smells like bilge water."
    },
    {
     "roll": 3,
     "text": "Strange lights, chanting and roaring fires deep in the jungle at night."
    },
    {
     "roll": 4,
     "text": "Veronique is beautiful, but something is off about her paintings."
    },
    {
     "roll": 5,
     "text": "Dead things don't stay dead here."
    },
    {
     "roll": 6,
     "text": "Stay inside at night — the island is cursed!"
    },
    {
     "roll": 7,
     "text": "The Governor's daughter is missing and he pays over 1,000s for information."
    },
    {
     "roll": 8,
     "text": "A 30' skeleton lives in the castle."
    },
    {
     "roll": 9,
     "text": "The castle's treasure hoard is guarded by the ghost of a sea serpent."
    },
    {
     "roll": 10,
     "text": "The witch in the swamp is responsible for the curse."
    },
    {
     "roll": 11,
     "text": "The broken lighthouse sometimes still lights up at night."
    },
    {
     "roll": 12,
     "text": "There are secret tunnels under the graveyard."
    }
   ]
  },
  "carcassBeachNow": {
   "id": "spCarcassBeach",
   "name": "Carcass Beach: What's Happening Now?",
   "die": "3d6",
   "page": 143,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 3,
     "text": "A Spanish treasure galleon has wrecked near Florida; everyone scrambles to set sail."
    },
    {
     "roll": 4,
     "text": "3d6 Deep Ones, d4 Gorilla Crabs and a Deep One Shaman are in a standoff with the pirates.",
     "monster": "deep-ones"
    },
    {
     "roll": 5,
     "text": "A pirate has betrayed the code; Captain Davies presides over a tribunal."
    },
    {
     "roll": 6,
     "text": "The caves are deserted."
    },
    {
     "roll": 7,
     "text": "All calm: some pirates fish, others are passed out on the beach."
    },
    {
     "roll": 8,
     "text": "A mob of 2d4 Drowned have wandered into the caves.",
     "monster": "the-drowned"
    },
    {
     "roll": 9,
     "text": "The pirates are fighting amongst themselves."
    },
    {
     "roll": 10,
     "text": "The pirates are drunk."
    },
    {
     "roll": 11,
     "text": "Davies is recruiting crew for smuggling and pirating."
    },
    {
     "roll": 12,
     "text": "A captured merchantman full of fresh food means a huge feast soon."
    },
    {
     "roll": 13,
     "text": "The pirates are distracted by visiting courtesans from the Treasured Chest."
    },
    {
     "roll": 14,
     "text": "The musical group Ship of Fools are performing (tonight/soon/now)."
    },
    {
     "roll": 15,
     "text": "Sir Francis Drake's ghost should appear tonight in the Cagafuego wreck."
    },
    {
     "roll": 16,
     "text": "The Brethren are meeting in Nassau to plan a massive raid in d12 days."
    },
    {
     "roll": 17,
     "text": "\"Scuttles\", a young pirate, went missing near the cenote."
    },
    {
     "roll": 18,
     "text": "Pirate hunters are attacking. Blood is everywhere."
    }
   ]
  },
  "junglePoints": {
   "id": "spJungle",
   "name": "The Jungle: Points of Interest",
   "die": "d20",
   "page": 144,
   "source": "The Curse of Skeleton Point",
   "note": "Fast: 1d20 and read across. Random: 4d20, one per column (plus Encounters). Custom: choose.",
   "columns": [
    {
     "die": "d20",
     "name": "Terrain",
     "values": [
      "dense underbrush",
      "grove of coconut trees",
      "grove of banana trees",
      "calm, sun or moon lit clearing",
      "small, moss filled cave",
      "larges, ancient deciduous trees",
      "granite cliff with a climbable crack",
      "serene lagoon with turquoise water",
      "swamp, water lilies, mangrove trees",
      "a clearing circled by palm trees",
      "shoulder-high grass",
      "thick tangle of vines and brambles",
      "waterfall, dropping from 50' up",
      "high point with a great view",
      "sandstone rock formation",
      "small babbling creek",
      "shady ferns and lush foliage",
      "large tree (with a tree house)",
      "pine forest with low branches",
      "sinkhole (to the Nameless Temple)"
     ]
    },
    {
     "die": "d20",
     "name": "Contents",
     "values": [
      "a 10' tall carved stone idol",
      "a skeleton",
      "a recently buried corpse",
      "colorful wild flowers",
      "hundreds of mushrooms",
      "a dinghy, hidden under fronds",
      "a head impaled on a spike",
      "a small wrecked ship",
      "lanterns hanging from stakes",
      "ruins from an ancient civilization",
      "the nest of a carnivorous animal",
      "a large, bloody pile of bones",
      "a secret cache of cargo",
      "a large volcanic rock",
      "a large, wooden crate",
      "a corpse hanging from noose",
      "an abandoned campsite",
      "a fresh water spring",
      "a colony of d100 macaws",
      "blood dripped on to foliage"
     ]
    },
    {
     "die": "d20",
     "name": "Environment",
     "values": [
      "blistering heat",
      "buzzing flies carrying disease",
      "extremely loud insects",
      "eerie fog",
      "abnormally cold",
      "huge insects that bite",
      "calm, sea breeze",
      "absolute bliss fills the air",
      "distant sound of chanting",
      "a large bonfire and spit",
      "growling sounds",
      "feeling of being watched",
      "vultures circle above",
      "distant sound of cannon fire",
      "large fire ant mound",
      "intensely putrid death smell",
      "quicksand",
      "500+ butterflies or fireflies",
      "fast, howling winds",
      "a faint green glow"
     ]
    },
    {
     "die": "d20",
     "name": "Encounters",
     "values": [
      "mundane jungle mammals",
      "skeletons (pg. 92), sauntering",
      "Governor Barlette (pg. 132)",
      "Dark Fauna: Terrestrial (pg. 86)",
      "zombies (pg. 94), skulking",
      "Dark Flora (pg. 90)",
      "Dark Fauna: Avian (pg. 87)",
      "d2+1 (romantic) pirates",
      "Tela Fafane (pg. 133), gathering",
      "small undead animals",
      "a terrified pirate, fleeing",
      "dangerous jungle mammals",
      "jungle birds, singing",
      "Veronique (pg. 132), painting",
      "Pedro (pg. 147) & d8 riflemen",
      "Xoth (pg. 147), stalking",
      "Catherwood (pg. 147), searching",
      "Clayborn, annoyed and curious",
      "Beatrice (pg. 147) and d4+1 crew",
      "Clementius (pg. 147), 23 followers"
     ]
    }
   ]
  },
  "templeHooks": {
   "id": "spTempleHooks",
   "name": "Nameless Temple: Plot Hooks",
   "die": "d6",
   "page": 146,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "Catherwood haunts the Green Kraken searching for the temple from his late wife's journal; he shares discoveries with helpers."
    },
    {
     "roll": 2,
     "text": "A PC dreams of the Omega Stone; each morning they wake knowing which way the entrance lies."
    },
    {
     "roll": 3,
     "text": "Father Wallace has seen hooded figures land by night and walk into the jungle; fewer return each morning."
    },
    {
     "roll": 4,
     "text": "Tela Fafane pays 1,000s to anyone who captures Xoth for her studies."
    },
    {
     "roll": 5,
     "text": "Pirates swap stories of treasure-filled temples — and one on this island; the last group to look never came back."
    },
    {
     "roll": 6,
     "text": "Searchers for Veronique or jungle explorers stumble into the entrance, fall under the tree, or swim deep into the Carcass Beach cenote."
    }
   ]
  },
  "shrineEncounters": {
   "id": "spShrine",
   "name": "Shrine of the Nameless Skull: Encounters",
   "die": "d6",
   "page": 149,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "3 pirates (HP 5, Morale 8, Cutlass d6) who found the shrine an hour ago — greedy, stupid, reeking of grog and sweat.",
     "monster": "shrine-pirates"
    },
    {
     "roll": 2,
     "text": "Hans (from #7), scratching symbols into the walls and/or speaking in tongues."
    },
    {
     "roll": 3,
     "text": "A palm viper protecting her nest of 2d10 neonates (HP 1, Morale 6, Bite d2).",
     "monster": "palm-viper"
    },
    {
     "roll": 4,
     "text": "d4 hive vines slowly wrap around one PC's legs.",
     "monster": "hive-vines"
    },
    {
     "roll": 5,
     "text": "2 psychedelic macaws courting; they ignore those who ignore them.",
     "monster": "psychedelic-macaw"
    },
    {
     "roll": 6,
     "text": "1 necro-swine (see #8).",
     "monster": "necro-swine"
    }
   ]
  },
  "sanctumEncounters": {
   "id": "spSanctum",
   "name": "Sanctum of Nameless Blood: Encounters",
   "die": "d6",
   "page": 151,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "Trained guard dogs (HP 7, Morale 6, Bite d6) — mangy, starving; roll reactions for each.",
     "monster": "guard-dogs"
    },
    {
     "roll": 2,
     "text": "Selena, a frantic prisoner in shock, bloody and filthy, carrying an arm."
    },
    {
     "roll": 3,
     "text": "A pile of bloody body parts — leftovers from Xoth's latest meal."
    },
    {
     "roll": 4,
     "text": "d4 cultists (HP 3, Morale 7, Dagger d4) and a priest (HP 8, Morale 9, Dark hex spell d8, 50').",
     "monster": "cultists"
    },
    {
     "roll": 5,
     "text": "Clementius, on his way to the Omega Chamber.",
     "monster": "high-wizard-clementius"
    },
    {
     "roll": 6,
     "text": "Xoth, crawling the walls and ceilings, hunting for food.",
     "monster": "xoth-the-imp"
    }
   ]
  },
  "lakeEncounters": {
   "id": "spLake",
   "name": "Lake of the Nameless One: Encounters",
   "die": "d6",
   "page": 153,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "Accursed, maddening silence."
    },
    {
     "roll": 2,
     "text": "A drop of water falls, rippling the lake's surface."
    },
    {
     "roll": 3,
     "text": "An icy, terrifying chill washes over you."
    },
    {
     "roll": 4,
     "text": "d8 swarms of bats (HP 1, Morale 5, Bite 1) swarm, then flee via the Omega Stone opening.",
     "monster": "swarm-of-bats"
    },
    {
     "roll": 5,
     "text": "d2 eldritch eels disturb the surface like glossy tentacles.",
     "monster": "eldritch-eel"
    },
    {
     "roll": 6,
     "text": "The Nameless One awakens. All will end soon.",
     "monster": "the-nameless-one"
    }
   ]
  },
  "swampEncounters": {
   "id": "spSwamp",
   "name": "Death's Head Swamp: Encounters",
   "die": "d10",
   "page": 154,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "Fat, twisted trees hung with Spanish moss; their faces sing in sleepers' dreams."
    },
    {
     "roll": 2,
     "text": "A bubbling, putrid bog; mud-caked logs (and zombies) drift slowly past."
    },
    {
     "roll": 3,
     "text": "Giant water lilies; frogs feasting on dragonflies croak so loud it's hard to think."
    },
    {
     "roll": 4,
     "text": "Red and yellow mushrooms: poisonous spore clouds when touched, but delicious, and +1 TOUGHNESS for a while."
    },
    {
     "roll": 5,
     "text": "An abandoned, moss-covered campsite and skeleton with a humming aquamarine crystal the size of a cannonball."
    },
    {
     "roll": 6,
     "text": "A waterlogged boat with a rusty knife and a map; a dire crocodile suns here in clear weather.",
     "monster": "dire-crocodile"
    },
    {
     "roll": 7,
     "text": "2d10 candle-lit human skulls hang from vines, leading to a stone altar in the muck."
    },
    {
     "roll": 8,
     "text": "d10 bone-and-feather effigies forming a ½-mile perimeter around Tela's cabin (they keep the undead out)."
    },
    {
     "roll": 9,
     "text": "Strange orbs of light bobbing through the air like fishing lures."
    },
    {
     "roll": 10,
     "text": "A spike-fenced camp of muddy tents: the eccentric musicians called the Ship of Fools."
    }
   ]
  },
  "swampRumors": {
   "id": "spSwampRumors",
   "name": "Death's Head Swamp: Rumors",
   "die": "d6",
   "page": 154,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "A cannibalistic witch lives in a hut deep in the swamp."
    },
    {
     "roll": 2,
     "text": "Nomadic musicians camp in the swamp — bad singers, great for dancing."
    },
    {
     "roll": 3,
     "text": "A beautiful nymph wanders the reeds at night."
    },
    {
     "roll": 4,
     "text": "A 30' man-eating crocodile lives near an old boat."
    },
    {
     "roll": 5,
     "text": "Fist-sized insects there eat eyes."
    },
    {
     "roll": 6,
     "text": "A red and yellow flower growing outside caves has powerful medicinal effects."
    }
   ]
  },
  "reefEncounters": {
   "id": "spReef",
   "name": "Black Coral Reef: Encounters",
   "die": "d6",
   "page": 156,
   "source": "The Curse of Skeleton Point",
   "rows": [
    {
     "roll": 1,
     "text": "d4 fishermen in a small boat."
    },
    {
     "roll": 2,
     "text": "d6 mermaids, scared of humans but curious."
    },
    {
     "roll": 3,
     "text": "d3 sirens; one of them doesn't eat \"human\".",
     "monster": "siren"
    },
    {
     "roll": 4,
     "text": "d6 black coral crabs.",
     "monster": "black-coral-crab"
    },
    {
     "roll": 5,
     "text": "4d20 black coral crabs.",
     "monster": "black-coral-crab"
    },
    {
     "roll": 6,
     "text": "d2 acid jellyfish, with 3d6 more arriving gradually.",
     "monster": "acid-jellyfish"
    }
   ]
  },
  "castleDay": {
   "id": "spCastleDay",
   "name": "Skeleton Point: Random Encounters (Day)",
   "die": "d10",
   "page": 159,
   "source": "The Curse of Skeleton Point",
   "note": "1-in-6 chance of an encounter in each room.",
   "rows": [
    {
     "roll": 1,
     "text": "The corpse of a once-famous pirate, with loot and an invisible-ink treasure map."
    },
    {
     "roll": 2,
     "text": "A grove of carnivorous plants.",
     "monster": "carnivorous-plant"
    },
    {
     "roll": 3,
     "text": "d100 bilge rats chewing on something disgusting.",
     "monster": "bilge-rat"
    },
    {
     "roll": [
      4,
      6
     ],
     "text": "The Baron (ghost): sad, haunting, cold.",
     "monster": "the-baron"
    },
    {
     "roll": 7,
     "text": "3 rooks (use carrion gulls): curious, stupid and fat.",
     "monster": "carrion-gull"
    },
    {
     "roll": 8,
     "text": "The Three-Headed Monkey; he's hungry.",
     "monster": "three-headed-monkey"
    },
    {
     "roll": 9,
     "text": "A crew of d10 pirates looking for treasure.",
     "table": "pirateGenerator"
    },
    {
     "roll": 10,
     "text": "Veronique, irritated at the intrusion.",
     "monster": "veronique-barlette"
    }
   ]
  },
  "castleNight": {
   "id": "spCastleNight",
   "name": "Skeleton Point: Random Encounters (Night)",
   "die": "d10",
   "page": 161,
   "source": "The Curse of Skeleton Point",
   "note": "1-in-6 chance of an encounter in each room.",
   "rows": [
    {
     "roll": 1,
     "text": "The ghost of a once-famous pirate who knows the trick to reveal the map on his corpse (pg. 119)."
    },
    {
     "roll": [
      2,
      4
     ],
     "text": "d6 skeletons: mindless, fast, terrifying — only 1 HP each.",
     "monster": "skeleton-rank-and-vile"
    },
    {
     "roll": [
      5,
      6
     ],
     "text": "3 Ghost Crew trying to be scary, looking for a fight, stench of death.",
     "monster": "ghost-crew"
    },
    {
     "roll": [
      7,
      8
     ],
     "text": "The Baron (skeleton), furious and hostile, with d4 ghostly fossil sharks swimming through the air.",
     "monster": "the-baron"
    },
    {
     "roll": 9,
     "text": "d10 pirate corpses, savagely murdered."
    },
    {
     "roll": 10,
     "text": "Veronique in black nightclothes, terrified of the intrusion.",
     "monster": "veronique-barlette"
    }
   ]
  }
 }
};

export const PB_MONSTERS: PbMonster[] = [
 {
  "homebrew": false,
  "id": "redcoat-soldier",
  "name": "Redcoat Soldier",
  "category": "npc",
  "group": "Redcoats",
  "hp": 5,
  "morale": 5,
  "armor": null,
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   }
  ],
  "specials": [],
  "text": "British soldier patrolling the islands.",
  "source": "Trapped in the Tropics",
  "page": 15
 },
 {
  "homebrew": false,
  "id": "redcoat-gunner",
  "name": "Redcoat Gunner",
  "category": "npc",
  "group": "Redcoats",
  "hp": 3,
  "morale": 5,
  "armor": null,
  "attacks": [
   {
    "name": "Musket",
    "damage": "2d6",
    "notes": "Reload: 2 actions"
   },
   {
    "name": "Bayonet",
    "damage": "d4"
   }
  ],
  "specials": [],
  "blackPowder": true,
  "text": "Redcoat musketeer.",
  "source": "Trapped in the Tropics",
  "page": 15
 },
 {
  "homebrew": false,
  "id": "redcoat-officer",
  "name": "Redcoat Officer",
  "category": "npc",
  "group": "Redcoats",
  "hp": 10,
  "morale": 9,
  "armor": {
   "name": "Doublet",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Officer's Cutlass",
    "damage": "d8"
   },
   {
    "name": "Flintlock",
    "damage": "2d4",
    "notes": "Reload: 2 actions"
   }
  ],
  "specials": [
   {
    "name": "Leader",
    "text": "Nearby crew are +3 Morale and DR +2 to defend against."
   }
  ],
  "blackPowder": true,
  "text": "Commands a Redcoat detachment.",
  "source": "Trapped in the Tropics",
  "page": 15
 },
 {
  "homebrew": false,
  "id": "bilge-rat-zombie",
  "name": "\"Bilge Rat\" Zombie",
  "category": "undead",
  "group": "Zombies",
  "hp": 5,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Claw",
    "damage": "d4+1"
   },
   {
    "name": "Bite",
    "damage": "d4",
    "notes": "+ Zombie Infection"
   }
  ],
  "specials": [
   {
    "name": "Zombie Infection",
    "text": "Anyone bitten by a zombie tests TOUGHNESS DR8 or dies within two days, then rises as a zombie. A zombie that eats flesh recovers d4 HP (d8 if it's a brain)."
   }
  ],
  "text": "A shambling, brain-hungry zombie.",
  "source": "Core Rules",
  "page": 94,
  "sources": [
   {
    "source": "Core Rules",
    "page": 94
   },
   {
    "source": "Trapped in the Tropics",
    "page": 27
   }
  ]
 },
 {
  "homebrew": false,
  "id": "deck-ghoul-zombie",
  "name": "\"Deck Ghoul\" Zombie",
  "category": "undead",
  "group": "Zombies",
  "hp": 7,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Claw",
    "damage": "d6"
   },
   {
    "name": "Bite",
    "damage": "d4",
    "notes": "+ Zombie Infection"
   }
  ],
  "specials": [
   {
    "name": "Quick",
    "text": "DR14 to attack and defend against."
   },
   {
    "name": "Zombie Infection",
    "text": "Anyone bitten by a zombie tests TOUGHNESS DR8 or dies within two days, then rises as a zombie. A zombie that eats flesh recovers d4 HP (d8 if it's a brain)."
   }
  ],
  "dr": {
   "attack": 14,
   "defend": 14
  },
  "text": "Fast sprinters. Great climbers.",
  "source": "Core Rules",
  "page": 94,
  "sources": [
   {
    "source": "Core Rules",
    "page": 94
   },
   {
    "source": "Trapped in the Tropics",
    "page": 15
   }
  ]
 },
 {
  "homebrew": false,
  "id": "grog-barrel-zombie",
  "name": "\"Grog Barrel\" Zombie",
  "category": "undead",
  "group": "Zombies",
  "hp": 20,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Bilge-Vomit",
    "damage": "d6",
    "notes": "+ TOUGHNESS DR12 or become poisoned"
   },
   {
    "name": "Slam",
    "damage": "d10"
   },
   {
    "name": "Bite",
    "damage": "d8",
    "notes": "+ Zombie Infection"
   }
  ],
  "specials": [
   {
    "name": "Fat and Slow",
    "text": "DR10 to hit."
   },
   {
    "name": "Zombie Infection",
    "text": "Anyone bitten by a zombie tests TOUGHNESS DR8 or dies within two days, then rises as a zombie. A zombie that eats flesh recovers d4 HP (d8 if it's a brain)."
   }
  ],
  "dr": {
   "attack": 10
  },
  "text": "A bloated, barrel-bellied zombie.",
  "source": "Core Rules",
  "page": 95,
  "sources": [
   {
    "source": "Core Rules",
    "page": 95
   },
   {
    "source": "Trapped in the Tropics",
    "page": 15
   }
  ]
 },
 {
  "homebrew": false,
  "id": "beltran-de-ordaz",
  "name": "Beltran de Ordaz",
  "category": "npc",
  "named": true,
  "hp": 20,
  "morale": 9,
  "armor": {
   "name": "Conquistador Plate",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Flintlock",
    "damage": "3d4",
    "notes": "2d4 for anyone else who wields it"
   },
   {
    "name": "Finely Crafted Rapier",
    "damage": "d8"
   }
  ],
  "specials": [
   {
    "name": "Superior Tactician",
    "text": "Once per combat he can let one ally reroll an attack, defense or damage roll."
   }
  ],
  "blackPowder": true,
  "text": "A brash, cocky conquistador in his late 50s, set on finding the lost Silent Angel — even if it means hiring pirates.",
  "source": "Trapped in the Tropics",
  "page": 11
 },
 {
  "homebrew": false,
  "id": "mother-iris",
  "name": "Mother Iris",
  "category": "npc",
  "named": true,
  "hp": 30,
  "morale": 11,
  "armor": null,
  "attacks": [
   {
    "name": "Cross and Rosary",
    "damage": "d2",
    "notes": "melee; or d12 against undead (ranged, only works in her hands)"
   },
   {
    "name": "Divine Wrath",
    "damage": "d8",
    "notes": "one target loses d8 HP, ignores armor"
   },
   {
    "name": "Angelic Heal",
    "damage": null,
    "notes": "everyone within 10' heals d6 HP"
   }
  ],
  "specials": [],
  "text": "A stern Inquisition nun with mystical powers who has long studied the arcane — and secretly works with The Wretched.",
  "source": "Trapped in the Tropics",
  "page": 11
 },
 {
  "homebrew": false,
  "id": "marooned-pirate",
  "name": "Marooned Pirate",
  "category": "npc",
  "hp": 4,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Bamboo Spear",
    "damage": "d4"
   }
  ],
  "specials": [],
  "text": "Castaway pirates; can serve as replacement PCs.",
  "source": "Trapped in the Tropics",
  "page": 18
 },
 {
  "homebrew": false,
  "id": "pire",
  "name": "Pire",
  "category": "npc",
  "named": true,
  "hp": 12,
  "morale": 8,
  "armor": {
   "name": "Leather Vest",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "\"Marla\" (his blunderbuss)",
    "damage": "d4",
    "notes": "d10 within 10'; Reload: 2 actions"
   },
   {
    "name": "\"Baybuh\" (his scimitar)",
    "damage": "d8"
   }
  ],
  "specials": [
   {
    "name": "Glowing Bones",
    "text": "His skeleton can be seen glowing faintly through his skin at night."
   }
  ],
  "blackPowder": true,
  "text": "The witty, sarcastic pirate \"in charge\" of the Scrub Island outpost while the captain is away.",
  "source": "Trapped in the Tropics",
  "page": 29
 },
 {
  "homebrew": false,
  "id": "dodson",
  "name": "Dodson",
  "category": "npc",
  "named": true,
  "hp": 9,
  "morale": 10,
  "armor": null,
  "attacks": [
   {
    "name": "Hand-crafted Viking Hatchet",
    "damage": "d8"
   },
   {
    "name": "Jury-rigged Nail Grenade",
    "damage": "d6",
    "notes": "up to 3 targets"
   }
  ],
  "specials": [
   {
    "name": "Fast",
    "text": "DR16 to attack and defend against."
   },
   {
    "name": "Glowing Bones",
    "text": "His skeleton can be seen glowing faintly through his skin at night."
   }
  ],
  "dr": {
   "attack": 16,
   "defend": 16
  },
  "text": "A frenetic, obsessive trap-builder who hauls zombie parts from Eel Island.",
  "source": "Trapped in the Tropics",
  "page": 29
 },
 {
  "homebrew": false,
  "id": "antediluvian-crustacean",
  "name": "Antediluvian Crustacean",
  "category": "beast",
  "hp": 50,
  "morale": 6,
  "armor": {
   "name": "Thick Shell",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Claws",
    "damage": "d10 & d6",
    "notes": "2 attacks"
   }
  ],
  "attacksPerRound": 2,
  "specials": [],
  "text": "A colossal crustacean that climbs aboard ships; gemstones are embedded in its shell.",
  "source": "Trapped in the Tropics",
  "page": 36
 },
 {
  "homebrew": false,
  "id": "infernal-pelican",
  "name": "Infernal Pelican",
  "category": "beast",
  "group": "Dark Fauna: Avian",
  "roll": 4,
  "hp": 4,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Hell Lava Spray",
    "damage": "d6",
    "notes": "defend with TOUGHNESS instead of AGILITY; armor is reduced one tier and the target loses d4 HP for the next 2 rounds as it burns through flesh (armor doesn't reduce this). Removing the armor stops it."
   }
  ],
  "specials": [],
  "defendWith": "TOUGHNESS",
  "loot": [
   {
    "name": "Beak",
    "value": "10s"
   },
   {
    "name": "Lava",
    "value": "60s/jar",
    "note": "melts most materials"
   }
  ],
  "text": "Fishing birds that flew too far and visited the shores of the Netherworld; soot-singed feathers glowing molten orange from within. Often seen in flocks (d6 × 10).",
  "source": "Core Rules",
  "page": 87,
  "sources": [
   {
    "source": "Core Rules",
    "page": 87
   },
   {
    "source": "Trapped in the Tropics",
    "page": 48
   }
  ]
 },
 {
  "homebrew": false,
  "id": "merfolk-ghost",
  "name": "Merfolk Ghost",
  "category": "undead",
  "hp": 2,
  "morale": 8,
  "armor": {
   "name": "Spectral",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Claws",
    "damage": "d2"
   },
   {
    "name": "Coral Hammer",
    "damage": "d4"
   },
   {
    "name": "Spear",
    "damage": "d6"
   }
  ],
  "attackChoice": "one of",
  "specials": [
   {
    "name": "Preoccupied",
    "text": "Always roll for a reaction (unless Ephyra summons them for defense)."
   }
  ],
  "text": "Ghostly servants of Ephyra, usually too busy gathering sand or chanting laments to bother intruders.",
  "source": "Trapped in the Tropics",
  "page": 54
 },
 {
  "homebrew": false,
  "id": "tube-worm",
  "name": "Tube Worm",
  "category": "beast",
  "hp": 5,
  "morale": 5,
  "armor": {
   "name": "Rock Skin",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Pinchers",
    "damage": "d6"
   }
  ],
  "specials": [
   {
    "name": "Camouflage",
    "text": "+4 DR to defend against in the first round of combat. PRESENCE DR14 to spot (if looking)."
   }
  ],
  "text": "Arm-sized lava-tube worms with hundreds of tiny legs and six arms near the head; they look like volcanic rock until they strike.",
  "source": "Trapped in the Tropics",
  "page": 54
 },
 {
  "homebrew": false,
  "id": "volcanic-lizard",
  "name": "Volcanic Lizard",
  "category": "beast",
  "hp": 3,
  "morale": 3,
  "armor": null,
  "attacks": [
   {
    "name": "Tongue Whip",
    "damage": "d6",
    "notes": "10' range"
   },
   {
    "name": "Claw",
    "damage": "d4"
   }
  ],
  "attackChoice": "one of",
  "specials": [
   {
    "name": "Fast",
    "text": "+2 DR to attack and defend against."
   },
   {
    "name": "Heat-resistant",
    "text": "Immune to fire and heat."
   }
  ],
  "dr": {
   "attack": 14,
   "defend": 14
  },
  "text": "Horned lizards basking in lava tubes, glowing faintly from a diet of glow worms. Territorial; found in large numbers (d6 × 10).",
  "source": "Trapped in the Tropics",
  "page": 54
 },
 {
  "homebrew": false,
  "id": "necro-jelly",
  "name": "Necro Jelly",
  "category": "beast",
  "hp": 1,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Skull Sting",
    "damage": "d2",
    "notes": "ignores armor; instead of lowering HP the damage depletes Devil's Luck. A PC with no Devil's Luck left permanently lowers their highest ability by 1 (min −3)."
   }
  ],
  "specials": [],
  "ignoresArmor": true,
  "text": "Jellyfish of volcanically heated pools that feed on the energy of the living; the older they are, the more their hoods resemble human skulls.",
  "source": "Trapped in the Tropics",
  "page": 54
 },
 {
  "homebrew": false,
  "id": "ephyra-deceiver-of-thoth",
  "name": "Ephyra, Deceiver of Thoth",
  "category": "monster",
  "boss": true,
  "hp": 40,
  "morale": 10,
  "armor": {
   "name": "Spectral",
   "die": "d4",
   "tier": 2
  },
  "attacks": [],
  "attacksPerRound": "1 per 2 PCs",
  "attackTable": {
   "die": "d6",
   "note": "Ephyra attacks once for every two PCs in the party; roll d6 for each attack.",
   "rows": [
    {
     "roll": [
      1,
      2
     ],
     "name": "Sandblast",
     "text": "Everyone tests TOUGHNESS DR10 or takes d4 damage.",
     "damage": "d4",
     "test": {
      "ability": "TOUGHNESS",
      "dr": 10
     }
    },
    {
     "roll": [
      3,
      4
     ],
     "name": "Feed",
     "text": "Ephyra eats red sand and regains d8 HP.",
     "heal": "d8"
    },
    {
     "roll": [
      5,
      6
     ],
     "name": "Vampiric Orb",
     "text": "Ephyra becomes a flaming skull and blasts toward a random PC: AGILITY DR14 or part of their body turns to red sand (d4: 1 a hand or foot, 2 a finger, toe, ear or nose, 3 an arm or leg, 4 torso, head or entire body).",
     "test": {
      "ability": "AGILITY",
      "dr": 14
     },
     "sub": {
      "die": "d4",
      "rows": [
       {
        "roll": 1,
        "text": "A hand or foot"
       },
       {
        "roll": 2,
        "text": "A finger, toe, ear, or nose"
       },
       {
        "roll": 3,
        "text": "An arm or leg"
       },
       {
        "roll": 4,
        "text": "Torso, head, or entire body"
       }
      ]
     }
    }
   ]
  },
  "specials": [
   {
    "name": "Volcanic Link",
    "text": "When Ephyra takes damage, the attacking player rolls the volcano die. She can't be destroyed unless the volcano die is a d2 or the volcano is erupting."
   }
  ],
  "text": "A monstrosity of myth — soucouyant, nereid, Scylla, sea hag — that turns mortals into blood-soaked sand and feasts on it like a ravenous ghoul.",
  "source": "Trapped in the Tropics",
  "page": 55
 },
 {
  "homebrew": false,
  "id": "skeletal-thrall",
  "name": "Skeletal Thrall",
  "category": "undead",
  "summoned": true,
  "hp": 4,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Claw/Bite",
    "damage": "d4"
   }
  ],
  "specials": [
   {
    "name": "Thrall",
    "text": "Stupid, but obeys its creator's verbal commands. Tumbles into bones at sunrise."
   }
  ],
  "text": "Raised from nearby corpses by the Sorcerer's Raise the Dead spell.",
  "source": "Core Rules",
  "page": 45,
  "sources": [
   {
    "source": "Core Rules",
    "page": 45
   },
   {
    "source": "Player's Guidebook",
    "page": 45
   }
  ]
 },
 {
  "homebrew": false,
  "id": "phantasmal-fauna",
  "name": "Phantasmal Fauna",
  "category": "spirit",
  "summoned": true,
  "hp": 5,
  "morale": null,
  "armor": {
   "name": "Ghostly Form",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d6"
   }
  ],
  "specials": [
   {
    "name": "Summoned",
    "text": "A ghostly hound or shark that obeys its summoner and dissipates at sunset."
   }
  ],
  "text": "Summoned by the arcane ritual Phantasmal Fauna.",
  "source": "Core Rules",
  "page": 65,
  "sources": [
   {
    "source": "Core Rules",
    "page": 65
   },
   {
    "source": "Player's Guidebook",
    "page": 65
   }
  ]
 },
 {
  "homebrew": false,
  "id": "mishap-birds",
  "name": "Mishap Birds",
  "category": "beast",
  "summoned": true,
  "hp": 2,
  "morale": null,
  "armor": null,
  "count": "d12",
  "attacks": [
   {
    "name": "Bite",
    "damage": "d2"
   }
  ],
  "specials": [
   {
    "name": "Swarm",
    "text": "They flee when half are defeated."
   }
  ],
  "text": "A swarm of d12 birds called up by Mystical Mishap 8.",
  "source": "Core Rules",
  "page": 67,
  "sources": [
   {
    "source": "Core Rules",
    "page": 67
   },
   {
    "source": "Player's Guidebook",
    "page": 67
   }
  ]
 },
 {
  "homebrew": false,
  "id": "bilge-rat",
  "name": "Bilge Rat",
  "category": "beast",
  "group": "Dark Fauna: Terrestrial",
  "roll": 1,
  "hp": 1,
  "morale": 4,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "1",
    "notes": "+ Disease"
   }
  ],
  "specials": [
   {
    "name": "Disease",
    "text": "Test TOUGHNESS DR8 or become infected."
   },
   {
    "name": "Swarm",
    "text": "When several rats attack the same target, add their damage into one sum; the target tests only once for disease."
   }
  ],
  "text": "Disgusting vermin that breed in the foul bilge water of cargo holds; carriers of countless diseases.",
  "source": "Core Rules",
  "page": 86
 },
 {
  "homebrew": false,
  "id": "dire-crocodile",
  "name": "Dire Crocodile",
  "category": "beast",
  "group": "Dark Fauna: Terrestrial",
  "roll": 2,
  "hp": 15,
  "morale": 9,
  "armor": {
   "name": "Reptile Skin",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d10"
   }
  ],
  "specials": [
   {
    "name": "Water Lurker",
    "text": "PRESENCE DR16 to spot."
   }
  ],
  "loot": [
   {
    "name": "Hide",
    "value": "50s"
   },
   {
    "name": "Teeth",
    "value": "1s"
   }
  ],
  "text": "Overgrown, ancient predators with thick leathery hides that stalk murky shallows. Fast swimmers, slow on land, and so far impossible to wipe out.",
  "source": "Core Rules",
  "page": 86
 },
 {
  "homebrew": false,
  "id": "necro-swine",
  "name": "Necro-Swine",
  "category": "beast",
  "group": "Dark Fauna: Terrestrial",
  "roll": 3,
  "hp": 6,
  "morale": null,
  "armor": {
   "name": "Hog-bristle",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Tusks",
    "damage": "d6"
   },
   {
    "name": "Bite",
    "damage": "d8"
   }
  ],
  "specials": [
   {
    "name": "Necro-steam",
    "text": "Anyone breathing the steam for more than a few minutes tests SPIRIT DR12. Fail: +4 STRENGTH and AGILITY for d2 hours; when it wears off, lose d8 HP. Anything killed this way becomes undead and emits the steam too."
   }
  ],
  "loot": [
   {
    "name": "Swine skin",
    "value": "25s"
   },
   {
    "name": "Necro-steam",
    "value": "150s/jar"
   }
  ],
  "text": "Pigs once; now a foul cyan steam drifts from their mouths and eyes and slowly fills the air where they graze. If you see \"the glow\" it's already too late.",
  "source": "Core Rules",
  "page": 86
 },
 {
  "homebrew": false,
  "id": "palm-viper",
  "name": "Palm Viper",
  "category": "beast",
  "group": "Dark Fauna: Terrestrial",
  "roll": 4,
  "hp": 4,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d2",
    "notes": "+ Venom"
   }
  ],
  "specials": [
   {
    "name": "Venom",
    "text": "d10 rounds after the bite the target is completely paralyzed for d6 × 10 minutes and experiences (d6): 1-5 complete euphoria, 6 a hellish nightmare."
   }
  ],
  "loot": [
   {
    "name": "Snake skin",
    "value": "5s"
   },
   {
    "name": "Fang",
    "value": "2s"
   },
   {
    "name": "Venom",
    "value": "75s/dose"
   }
  ],
  "text": "Dark green and brown serpents hiding in sand, around fallen coconuts and in banana trees.",
  "source": "Core Rules",
  "page": 86
 },
 {
  "homebrew": false,
  "id": "rabid-jaguar",
  "name": "Rabid Jaguar",
  "category": "beast",
  "group": "Dark Fauna: Terrestrial",
  "roll": 5,
  "hp": 14,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d6",
    "notes": "+ TOUGHNESS DR12 or become infected"
   },
   {
    "name": "Claw",
    "damage": "d4",
    "notes": "makes 2 attacks"
   }
  ],
  "specials": [
   {
    "name": "Fast",
    "text": "Attacks and defense against it are DR14."
   }
  ],
  "dr": {
   "attack": 14,
   "defend": 14
  },
  "loot": [
   {
    "name": "Spotted pelt",
    "value": "20s"
   },
   {
    "name": "Black pelt",
    "value": "30s"
   },
   {
    "name": "White pelt",
    "value": "50s"
   },
   {
    "name": "Iridescent pelt",
    "value": "200s"
   }
  ],
  "text": "Fast, ferocious, disease-stricken jungle cats and excellent climbers; some rare kinds have exotic fur.",
  "source": "Core Rules",
  "page": 86
 },
 {
  "homebrew": false,
  "id": "three-headed-monkey",
  "name": "Three-Headed Monkey",
  "category": "beast",
  "group": "Dark Fauna: Terrestrial",
  "roll": 6,
  "hp": 8,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Bite/Claws",
    "damage": "d6",
    "notes": "+ Monkey Head"
   }
  ],
  "specials": [
   {
    "name": "Monkey Head",
    "text": "One of its 3 heads curses a nearby creature (d4): 1 See — SPIRIT DR12 or blind for d2 rounds; 2 Hear — SPIRIT DR12 or deaf for d2 rounds; 3 Speak — SPIRIT DR12 or mute for d2 rounds; 4 All three — SPIRIT DR12 or all three."
   }
  ],
  "effectTable": {
   "die": "d4",
   "name": "Monkey Head Curse",
   "note": "Monkey Head curse (one nearby creature, SPIRIT DR12 to resist, lasts d2 rounds).",
   "rows": [
    {
     "roll": 1,
     "name": "See",
     "text": "SPIRIT DR12 or blind for d2 rounds.",
     "test": {
      "ability": "SPIRIT",
      "dr": 12
     }
    },
    {
     "roll": 2,
     "name": "Hear",
     "text": "SPIRIT DR12 or deaf for d2 rounds.",
     "test": {
      "ability": "SPIRIT",
      "dr": 12
     }
    },
    {
     "roll": 3,
     "name": "Speak",
     "text": "SPIRIT DR12 or mute for d2 rounds.",
     "test": {
      "ability": "SPIRIT",
      "dr": 12
     }
    },
    {
     "roll": 4,
     "name": "All three",
     "text": "SPIRIT DR12 or blind, deaf and mute for d2 rounds.",
     "test": {
      "ability": "SPIRIT",
      "dr": 12
     }
    }
   ]
  },
  "text": "Mythical creatures said to reveal secrets and hidden treasure to those who bring them gifts.",
  "source": "Core Rules",
  "page": 86
 },
 {
  "homebrew": false,
  "id": "carrion-gull",
  "name": "Carrion Gull",
  "category": "beast",
  "group": "Dark Fauna: Avian",
  "roll": 1,
  "hp": 2,
  "morale": 5,
  "armor": null,
  "attacks": [
   {
    "name": "Beak",
    "damage": "d4"
   }
  ],
  "specials": [
   {
    "name": "Flock",
    "text": "They circle in flocks and attack in swarms if any of them are killed."
   }
  ],
  "loot": [
   {
    "name": "Carcass",
    "value": "1 disgusting ration"
   }
  ],
  "text": "Possessive seabirds grown fond of the region's plentiful dead flesh, often stained blood red from feasting.",
  "source": "Core Rules",
  "page": 87
 },
 {
  "homebrew": false,
  "id": "harbinger-albatross",
  "name": "Harbinger Albatross",
  "category": "beast",
  "group": "Dark Fauna: Avian",
  "roll": 2,
  "hp": 8,
  "morale": 10,
  "armor": {
   "name": "Evil Luck",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Beak",
    "damage": "d6"
   }
  ],
  "specials": [
   {
    "name": "Omen",
    "text": "If it gets more than 1 mile away from the PCs, roll d6: 1 all PCs lose all Devil's Luck; 2 trigger a Dark Caribbean historical event (pg. 25); 3 FIRE!; 4 SAILS! (pg. 114) or d8 random pirates (pg. 124), or both; 5 ominous foul weather moves in abruptly (pg. 78); 6 one random person dies instantly."
   },
   {
    "name": "Captured alive",
    "text": "All rolls are +1 while it is near."
   },
   {
    "name": "Killed",
    "text": "The killer gains d4 Devil's Luck (can exceed the normal maximum)."
   }
  ],
  "omenTable": {
   "die": "d6",
   "name": "Albatross Omen",
   "note": "Rolled if the albatross gets more than 1 mile away from the PCs.",
   "rows": [
    {
     "roll": 1,
     "text": "All PCs lose all Devil's Luck."
    },
    {
     "roll": 2,
     "text": "Trigger a Dark Caribbean historical event (pg. 25)."
    },
    {
     "roll": 3,
     "text": "FIRE!"
    },
    {
     "roll": 4,
     "text": "SAILS! (pg. 114) or d8 random pirates (pg. 124)… or both."
    },
    {
     "roll": 5,
     "text": "Ominous, foul weather moves in abruptly (pg. 78)."
    },
    {
     "roll": 6,
     "text": "One random person dies instantly."
    }
   ]
  },
  "text": "A massive black seabird with a 15' wingspan and deep red eyes. Once a herald of good luck, now it only foreshadows doom. Travels alone.",
  "source": "Core Rules",
  "page": 87
 },
 {
  "homebrew": false,
  "id": "hex-chicken",
  "name": "Hex Chicken",
  "category": "beast",
  "group": "Dark Fauna: Avian",
  "roll": 3,
  "hp": 1,
  "morale": 2,
  "armor": null,
  "attacks": [
   {
    "name": "Beak",
    "damage": "d2"
   }
  ],
  "specials": [
   {
    "name": "Plague Repository",
    "text": "Holding a hex chicken for an hour cures infection, but eating one causes it."
   }
  ],
  "text": "Some sorcerers cure disease and infection by transferring it into chickens. Don't eat one.",
  "source": "Core Rules",
  "page": 87
 },
 {
  "homebrew": false,
  "id": "psychedelic-macaw",
  "name": "Psychedelic Macaw",
  "category": "beast",
  "group": "Dark Fauna: Avian",
  "roll": 5,
  "hp": 3,
  "morale": 5,
  "armor": null,
  "attacks": [
   {
    "name": "Beak",
    "damage": "d4"
   }
  ],
  "specials": [
   {
    "name": "Cosmic Fractals",
    "text": "Test morale when a macaw is frightened. On a failure cosmic fractals radiate in all directions: spectators go blind for d6 rounds and test SPIRIT DR12 or lose their mind for d8 hours (GM controls them). When they \"return\" they immediately gain experience (pg. 33) and learn 1 random ritual (pg. 64)."
   }
  ],
  "loot": [
   {
    "name": "Feather",
    "value": "10s"
   },
   {
    "name": "Alive",
    "value": "200s"
   },
   {
    "name": "Its friendship",
    "value": "Priceless"
   }
  ],
  "text": "Brightly colored, naturally intelligent parrots that glow faintly in the dark.",
  "source": "Core Rules",
  "page": 87
 },
 {
  "homebrew": false,
  "id": "peregrim-falcon",
  "name": "Peregrim Falcon",
  "category": "beast",
  "group": "Dark Fauna: Avian",
  "roll": 6,
  "hp": 6,
  "morale": 9,
  "armor": {
   "name": "Killer Instincts",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Claws",
    "damage": "d8"
   }
  ],
  "specials": [
   {
    "name": "Fast",
    "text": "DR16 to attack and defend against."
   }
  ],
  "dr": {
   "attack": 16,
   "defend": 16
  },
  "loot": [
   {
    "name": "Claw",
    "value": "15s"
   },
   {
    "name": "Body",
    "value": "—",
    "note": "turns to ashes when killed"
   }
  ],
  "text": "Fierce birds of prey with a taste for dead flesh.",
  "source": "Core Rules",
  "page": 87
 },
 {
  "homebrew": false,
  "id": "acid-jellyfish",
  "name": "Acid Jellyfish",
  "category": "beast",
  "group": "Dark Fauna: Aquatic",
  "roll": 1,
  "hp": 5,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Acid Tendrils",
    "damage": "d4",
    "notes": "+ special"
   }
  ],
  "specials": [
   {
    "name": "Tendrils",
    "text": "Tendrils wrap around a limb, restraining the victim. On the victim's turn: STRENGTH DR12 to escape, or −4 to AGILITY and armor is reduced 1 tier."
   }
  ],
  "loot": [
   {
    "name": "Tendril",
    "value": "5s each"
   },
   {
    "name": "Body",
    "value": "20s"
   }
  ],
  "text": "Bizarre gelatinous oddities that emit acid to aid digestion.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "brine-piranha",
  "name": "Brine Piranha",
  "category": "beast",
  "group": "Dark Fauna: Aquatic",
  "roll": 2,
  "hp": 5,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d8"
   }
  ],
  "specials": [
   {
    "name": "Blood-rich Meat",
    "text": "Eating it gives +1 to using rituals and relics for d4 hours."
   }
  ],
  "loot": [
   {
    "name": "Piranha meat",
    "value": "5s/fish"
   }
  ],
  "text": "Huge, carnivorous saltwater fish.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "chthonic-octopus",
  "name": "Chthonic Octopus",
  "category": "beast",
  "group": "Dark Fauna: Aquatic",
  "roll": 3,
  "hp": 9,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d6",
    "notes": "+ brain feast"
   }
  ],
  "specials": [
   {
    "name": "Brain Feast",
    "text": "Test AGILITY DR12 or it attaches to its prey's skull. The prey is under its control and auto-fails its defense until it passes a DR12 PRESENCE test (tested at the start of each of the prey's turns)."
   }
  ],
  "loot": [
   {
    "name": "Tentacle",
    "value": "10s"
   },
   {
    "name": "Alive",
    "value": "50s",
    "note": "×10 to a scientist"
   }
  ],
  "text": "Alien in origin; naturally green but often camouflaged. They feed on mammal brains and control their prey while they feast.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "eldritch-eel",
  "name": "Eldritch Eel",
  "category": "beast",
  "group": "Dark Fauna: Aquatic",
  "roll": 4,
  "hp": 2,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d6",
    "notes": "+ Eldritch Shock"
   }
  ],
  "specials": [
   {
    "name": "Eldritch Shock",
    "text": "Any creature that touches it tests TOUGHNESS DR12 or is paralyzed for the next turn."
   }
  ],
  "loot": [
   {
    "name": "Glowing bones",
    "value": "20s/skeleton"
   }
  ],
  "text": "Translucent pack hunters of reefs, kelp forests and shipwrecks; their bones glow from within, even after death.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "primeval-lurker",
  "name": "Primeval Lurker",
  "category": "beast",
  "group": "Dark Fauna: Aquatic",
  "roll": 5,
  "hp": 20,
  "morale": 8,
  "armor": {
   "name": "Hide",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d10"
   },
   {
    "name": "Tail",
    "damage": "d6",
    "notes": "2 attacks"
   }
  ],
  "specials": [
   {
    "name": "Primeval Shriek",
    "text": "It echoes into the deep: everything underwater within 100 miles can hear it."
   }
  ],
  "loot": [
   {
    "name": "Bones",
    "value": "200s/set"
   },
   {
    "name": "Alive",
    "value": "1,000s"
   }
  ],
  "text": "Ancient reptiles from before mankind, lurking in the deep.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "squid-of-despair",
  "name": "Squid of Despair",
  "category": "beast",
  "group": "Dark Fauna: Aquatic",
  "roll": 6,
  "hp": 12,
  "morale": 8,
  "armor": null,
  "attacks": [
   {
    "name": "Tentacle Slam",
    "damage": "d4"
   },
   {
    "name": "Ink of Despair",
    "damage": null,
    "notes": "squirts ink in a 30 sq ft cloud underwater or a 30' line above water"
   }
  ],
  "specials": [
   {
    "name": "Ink of Despair",
    "text": "Anyone near the ink tests AGILITY DR12 or is stricken with despair. At the start of each of their turns they roll 2d6 + SPIRIT: ≤4 Self-destructive thoughts (inflict d2 damage on themselves); 5-7 Sad (skip their action this turn); 8-10 Melancholy (skip this turn but return to normal next turn); 11+ Right as rain (return to normal)."
   }
  ],
  "effectTable": {
   "die": "2d6 + SPIRIT",
   "name": "Despair",
   "note": "Rolled by a creature stricken with despair at the start of each of its turns.",
   "rows": [
    {
     "roll": [
      2,
      4
     ],
     "name": "Self-destructive thoughts",
     "text": "Inflict d2 damage on themselves.",
     "damage": "d2",
     "orLess": true
    },
    {
     "roll": [
      5,
      7
     ],
     "name": "Sad",
     "text": "Skip their action this turn."
    },
    {
     "roll": [
      8,
      10
     ],
     "name": "Melancholy",
     "text": "Skip this turn but return to normal next turn."
    },
    {
     "roll": [
      11,
      12
     ],
     "name": "Right as rain",
     "text": "Return to normal.",
     "orMore": true
    }
   ]
  },
  "loot": [
   {
    "name": "Carcass",
    "value": "10s"
   },
   {
    "name": "Ink",
    "value": "150s a sack"
   }
  ],
  "armorNote": "The block prints \"No armor –\"; the Creature Index (pg. 164) lists −d2.",
  "text": "Cold-water mollusks with sad eyes and gray, depressing skin, often stranded ashore by deep currents; they poison would-be predators' thoughts with psychotropic ink.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "zombie-sea-turtle",
  "name": "Zombie Sea Turtle",
  "category": "undead",
  "group": "Dark Fauna: Aquatic",
  "roll": 7,
  "hp": 1,
  "morale": null,
  "armor": {
   "name": "Shell",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d6"
   }
  ],
  "specials": [
   {
    "name": "Undead",
    "text": "1-in-4 chance it reanimates when killed."
   }
  ],
  "loot": [
   {
    "name": "Skull",
    "value": "10s"
   },
   {
    "name": "Shell",
    "value": "75s",
    "note": "1-in-10 chance its symbols are a treasure map, pg. 119"
   }
  ],
  "text": "Marine creatures given horrible new life by some evil force; their shells are covered in strange symbols and glyphs.",
  "source": "Core Rules",
  "page": 88
 },
 {
  "homebrew": false,
  "id": "fossil-shark",
  "name": "Fossil Shark",
  "category": "undead",
  "group": "Dark Fauna: Aquatic (big)",
  "roll": 1,
  "hp": 10,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d10"
   }
  ],
  "specials": [
   {
    "name": "Fast",
    "text": "DR14 to attack and defend against."
   },
   {
    "name": "Undead Fortitude",
    "text": "If killed, roll d6: on 1 or 2 it reassembles with 1 HP."
   }
  ],
  "dr": {
   "attack": 14,
   "defend": 14
  },
  "naval": {
   "hp": 2,
   "morale": null,
   "armor": null,
   "speed": 5,
   "agility": 3,
   "attacks": [
    {
     "name": "Puncture",
     "damage": "1"
    }
   ]
  },
  "text": "Fossilized bones of fast, deadly predators, given new life by some unnatural force.",
  "source": "Core Rules",
  "page": 89
 },
 {
  "homebrew": false,
  "id": "hammer-drones",
  "name": "Hammer Drones",
  "category": "beast",
  "group": "Dark Fauna: Aquatic (big)",
  "roll": 2,
  "hp": 15,
  "morale": 8,
  "armor": {
   "name": "Shark Skin",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d8"
   }
  ],
  "specials": [],
  "naval": {
   "hp": 3,
   "morale": 8,
   "armor": null,
   "speed": 5,
   "agility": 3,
   "attacks": [
    {
     "name": "Ram",
     "damage": "d4"
    }
   ]
  },
  "text": "Sharks that swim in schools so thick they turn the water black and blot out the sun.",
  "source": "Core Rules",
  "page": 89
 },
 {
  "homebrew": false,
  "id": "the-mouth-of-a-thousand-corpses",
  "name": "The Mouth of a Thousand Corpses",
  "category": "monster",
  "group": "Dark Fauna: Aquatic (big)",
  "roll": 3,
  "boss": true,
  "hp": 75,
  "morale": 10,
  "armor": {
   "name": "Runes",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d12"
   }
  ],
  "specials": [
   {
    "name": "Unholy Strength",
    "text": "Recovers d10 HP every time it eats someone."
   }
  ],
  "naval": {
   "hp": 15,
   "morale": 10,
   "armor": {
    "name": "Runes",
    "die": "d2",
    "tier": 1
   },
   "speed": 4,
   "agility": 2,
   "attacks": [
    {
     "name": "Ram",
     "damage": "2d8"
    }
   ]
  },
  "text": "An ancient great white shark corrupted by the Dark Caribbean's necrotic energy; its hundreds of scars have become glowing runes of some unknown civilization.",
  "source": "Core Rules",
  "page": 89
 },
 {
  "homebrew": false,
  "id": "cursed-orca",
  "name": "Cursed Orca",
  "category": "beast",
  "group": "Dark Fauna: Aquatic (big)",
  "roll": 4,
  "hp": 27,
  "morale": 9,
  "armor": {
   "name": "Blubber",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d12"
   }
  ],
  "specials": [],
  "naval": {
   "hp": 5,
   "morale": 9,
   "armor": null,
   "speed": 4,
   "agility": 3,
   "attacks": [
    {
     "name": "Ram",
     "damage": "d8"
    }
   ]
  },
  "text": "Intelligent hunters hexed by foul magic, used by their masters to track targets, patrol, and deliver supplies or messages.",
  "source": "Core Rules",
  "page": 89
 },
 {
  "homebrew": false,
  "id": "barnacled-humpback",
  "name": "Barnacled Humpback",
  "category": "beast",
  "group": "Dark Fauna: Aquatic (big)",
  "roll": 5,
  "hp": 50,
  "morale": null,
  "armor": {
   "name": "Barnacle Infestation",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Slam & Scrape",
    "damage": "d8",
    "notes": "+ special"
   }
  ],
  "specials": [
   {
    "name": "Crush",
    "text": "If between the whale and a solid object (ship, rocks), test STRENGTH DR12 or take d8 more damage."
   }
  ],
  "naval": {
   "hp": 10,
   "morale": null,
   "armor": null,
   "speed": 3,
   "agility": 2,
   "attacks": [
    {
     "name": "Slam & Scrape",
     "damage": "2d8",
     "notes": "+ everyone on board tests AGILITY DR8 or is thrown overboard"
    }
   ]
  },
  "text": "Once-docile whales driven to primal rage by carnivorous barnacles, scraping against anything that might ease the pain.",
  "source": "Core Rules",
  "page": 89
 },
 {
  "homebrew": false,
  "id": "the-black-whale",
  "name": "The Black Whale",
  "category": "monster",
  "group": "Dark Fauna: Aquatic (big)",
  "roll": 6,
  "boss": true,
  "hp": 150,
  "morale": 11,
  "armor": {
   "name": "Blubber",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "d20",
    "notes": "DR8 to defend"
   },
   {
    "name": "Swallow",
    "damage": null,
    "notes": "AGILITY DR8 to dodge or be consumed"
   }
  ],
  "dr": {
   "defend": 8
  },
  "specials": [],
  "naval": {
   "hp": 30,
   "morale": 11,
   "armor": {
    "name": "Blubber",
    "die": "d4",
    "tier": 2
   },
   "speed": 3,
   "agility": 1,
   "attacks": [
    {
     "name": "Ram",
     "damage": "3d8"
    }
   ]
  },
  "text": "A massive, obsidian-skinned sperm whale with a taste for human flesh; some say a colony of sailors lives in its belly.",
  "source": "Core Rules",
  "page": 89
 },
 {
  "homebrew": false,
  "id": "sargasso-entity",
  "name": "Sargasso Entity",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 1,
  "hp": 18,
  "morale": 9,
  "armor": null,
  "attacks": [
   {
    "name": "Sargassum Whip",
    "damage": "d6",
    "notes": "15' range"
   },
   {
    "name": "Horrific Vision",
    "damage": null,
    "notes": "one creature tests SPIRIT DR12 or suffers visions of cosmic horrors: all its DRs are +4 for d6 rounds"
   }
  ],
  "specials": [
   {
    "name": "Eat Sargasso Seaweed",
    "text": "Recovers d2 HP."
   }
  ],
  "text": "Spawned from the mire of seaweed drifting in the Devil's Triangle.",
  "source": "Core Rules",
  "page": 90
 },
 {
  "homebrew": false,
  "id": "carnivorous-plant",
  "name": "Carnivorous Plant",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 2,
  "hp": 18,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Tendrils",
    "damage": "d4",
    "notes": "up to 4"
   },
   {
    "name": "Bite",
    "damage": "d8"
   }
  ],
  "attacksPerRound": 5,
  "specials": [],
  "loot": [
   {
    "name": "Tendril",
    "value": "2s"
   },
   {
    "name": "Head",
    "value": "25s"
   },
   {
    "name": "Gem heart",
    "value": "200s"
   }
  ],
  "text": "Mutated by undead energy, they lurk in swamps and jungles waiting for small animals to fall into their traps.",
  "source": "Core Rules",
  "page": 90
 },
 {
  "homebrew": false,
  "id": "electric-coral",
  "name": "Electric Coral",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 3,
  "hazard": true,
  "hp": 5,
  "hpText": "d10",
  "hpDice": "d10",
  "morale": null,
  "armor": {
   "name": "Exoskeleton",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Shock",
    "damage": "2d8",
    "notes": "when threatened: everything within 50' loses 2d8 HP (ignores armor, double if wearing metal); recharges in an hour"
   }
  ],
  "specials": [],
  "loot": [
   {
    "name": "Reward",
    "value": "d20 × 50s a pound"
   }
  ],
  "text": "Bright, colorful, valuable and deadly: it shocks predators with a powerful electric surge.",
  "source": "Core Rules",
  "page": 90
 },
 {
  "homebrew": false,
  "id": "sentient-fungus",
  "name": "Sentient Fungus",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 4,
  "hp": 11,
  "morale": 6,
  "armor": {
   "name": "Thick Epidermis",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Slam",
    "damage": "d8"
   },
   {
    "name": "Spore Gas",
    "damage": null,
    "notes": "TOUGHNESS DR12 or become infected and lose d4 HP (ignores armor)"
   }
  ],
  "specials": [
   {
    "name": "Slow",
    "text": "DR8 to attack and dodge."
   }
  ],
  "dr": {
   "attack": 8,
   "defend": 8
  },
  "loot": [
   {
    "name": "Young spore",
    "value": "1s/cap"
   },
   {
    "name": "Mature",
    "value": "50s/cap"
   }
  ],
  "text": "Grog-barrel-sized spores that grow limbs when mature and mimic slow wildlife, masquerading as tree trunks, sea chests and small mammals.",
  "source": "Core Rules",
  "page": 90
 },
 {
  "homebrew": false,
  "id": "kelp-forest",
  "name": "Kelp Forest",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 5,
  "hazard": true,
  "hp": 0,
  "hpText": "N/A",
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Mental Lure",
    "damage": null,
    "notes": "weak-minded creatures (negative PRESENCE or SPIRIT) that see the kelp test the weaker of the two at DR8; fail: jump overboard and swim to \"join them\""
   }
  ],
  "specials": [
   {
    "name": "Harmless?",
    "text": "Harmless, except for the voice sailors hear urging them to \"join us\". The Drowned (pg. 100) must be close."
   }
  ],
  "text": "A drifting forest of kelp that calls sailors overboard.",
  "source": "Core Rules",
  "page": 90,
  "sources": [
   {
    "source": "Core Rules",
    "page": 90
   },
   {
    "source": "The Curse of Skeleton Point",
    "page": 157,
    "note": "Black Coral Reef, area 3"
   }
  ]
 },
 {
  "homebrew": false,
  "id": "hive-vines",
  "name": "Hive Vines",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 6,
  "hp": 4,
  "hpText": "4 each",
  "morale": 4,
  "armor": null,
  "attacks": [
   {
    "name": "Entangled",
    "damage": null,
    "notes": "AGILITY DR12 or entangled in vines; STRENGTH DR14 to escape"
   },
   {
    "name": "Strangle",
    "damage": "d4",
    "notes": "entangled creatures only; auto-hit"
   }
  ],
  "specials": [],
  "loot": [
   {
    "name": "Vines",
    "value": "1s per 10'"
   },
   {
    "name": "Made into rope",
    "value": "1s/ft"
   }
  ],
  "text": "Said to be among the largest organisms in the Dark Caribbean: networks of fast-moving vines that entangle and juice their prey.",
  "source": "Core Rules",
  "page": 90
 },
 {
  "homebrew": false,
  "id": "death-bloom",
  "name": "Death Bloom",
  "category": "flora",
  "group": "Dark Flora",
  "roll": 7,
  "hazard": true,
  "hp": 1,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Pollinate",
    "damage": null,
    "notes": "when touched it discharges pollen: TOUGHNESS DR12 or become infected"
   }
  ],
  "specials": [
   {
    "name": "Additional Infection Effects",
    "text": "Every morning and evening the infected tests TOUGHNESS DR x, where x = days since infection + 1. Fail: overcome by the urge to travel deep into the jungle NOW. Fumble: as fail, but on reaching the jungle plant growth explodes through their veins, killing them instantly. Crit: cured of the pollen."
   }
  ],
  "loot": [
   {
    "name": "Pollen",
    "value": "20s/gram"
   },
   {
    "name": "Flower",
    "value": "d12 × 10s"
   }
  ],
  "text": "Jungle flowers that look like treasure; when touched they explode with mind-controlling pollen that gestates inside the host.",
  "source": "Core Rules",
  "page": 90
 },
 {
  "homebrew": false,
  "id": "skeleton-lookout",
  "name": "Skeleton: Lookout",
  "category": "undead",
  "group": "Skeletons",
  "hp": 4,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Musket",
    "damage": "2d6",
    "notes": "Reload 1"
   },
   {
    "name": "Bayonet",
    "damage": "d4"
   }
  ],
  "blackPowder": true,
  "specials": [
   {
    "name": "Watchful",
    "text": "DR8 to notice things when on watch."
   },
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "text": "Cowards. Easily distracted.",
  "source": "Core Rules",
  "page": 92
 },
 {
  "homebrew": false,
  "id": "skeleton-rank-and-vile",
  "name": "Skeleton: Rank & Vile",
  "category": "undead",
  "group": "Skeletons",
  "hp": 5,
  "morale": 8,
  "armor": null,
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Grave Breath",
    "damage": "d2"
   },
   {
    "name": "Knife",
    "damage": "d4"
   },
   {
    "name": "Dagger",
    "damage": "d4"
   },
   {
    "name": "Scimitar",
    "damage": "d6"
   },
   {
    "name": "Small Axe",
    "damage": "d6"
   }
  ],
  "specials": [
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "text": "Rotten, undead scallywags.",
  "source": "Core Rules",
  "page": 92
 },
 {
  "homebrew": false,
  "id": "skeleton-dead-eye",
  "name": "Skeleton: Dead Eye",
  "category": "undead",
  "group": "Skeletons",
  "hp": 7,
  "morale": 8,
  "armor": null,
  "attacks": [
   {
    "name": "Flintlocks",
    "damage": "2d4",
    "notes": "ranged"
   },
   {
    "name": "Claw",
    "damage": "d2"
   }
  ],
  "blackPowder": true,
  "specials": [
   {
    "name": "Pistol Brace",
    "text": "Carries d4 flintlock pistols and fires them all before stopping to reload; can reload 2 flintlocks as a single action."
   },
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "text": "Wily. Shifty. Quick.",
  "source": "Core Rules",
  "page": 92
 },
 {
  "homebrew": false,
  "id": "skeleton-hulk",
  "name": "Skeleton: Hulk",
  "category": "undead",
  "group": "Skeletons",
  "hp": 12,
  "morale": 8,
  "armor": {
   "name": "Thick Bones",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Harpoon",
    "damage": "d6"
   },
   {
    "name": "Mast",
    "damage": "d8"
   }
  ],
  "attackChoice": "one of",
  "specials": [
   {
    "name": "Huge",
    "text": "DR10 to attack and defend against."
   },
   {
    "name": "Fishing",
    "text": "The harpoon is tied to a broken mast and can be used to \"fish\" for targets and reel the skewered in."
   },
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "dr": {
   "attack": 10,
   "defend": 10
  },
  "text": "Huge. Slow. Strong.",
  "source": "Core Rules",
  "page": 92
 },
 {
  "homebrew": false,
  "id": "skeleton-bosun",
  "name": "Skeleton: Bosun",
  "category": "undead",
  "group": "Skeletons",
  "hp": 11,
  "morale": 9,
  "armor": null,
  "attacks": [
   {
    "name": "Smallsword",
    "damage": "d6"
   },
   {
    "name": "Cat o' Nine Tails",
    "damage": "d4"
   }
  ],
  "attacksPerRound": 2,
  "specials": [
   {
    "name": "Two Weapons",
    "text": "Can attack with both weapons each turn."
   },
   {
    "name": "Bossy",
    "text": "Skeletons within 20' automatically pass morale tests."
   },
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "text": "Loud. Bossy. Cruel. Alert.",
  "source": "Core Rules",
  "page": 93
 },
 {
  "homebrew": false,
  "id": "skeleton-warlock",
  "name": "Skeleton: Warlock",
  "category": "undead",
  "group": "Skeletons",
  "hp": 6,
  "morale": 9,
  "armor": {
   "name": "Arcane Shield",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Oar Staff",
    "damage": "d4"
   }
  ],
  "specials": [
   {
    "name": "Sorcery",
    "text": "Can cast one spell per turn: Reanimate (a dead skeleton rebuilds itself and recovers d6 HP); Weathercraft (the wind blows a desired direction); Necro-Gust (one creature it can see tests TOUGHNESS DR14 or takes d8 damage); Crow Sight (sees through its crow's eyes)."
   },
   {
    "name": "Crow",
    "text": "Accompanied by a crow: HP 2, Morale –, no armor, Beak d2 or Claws d2."
   },
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "spells": [
   {
    "name": "Reanimate",
    "text": "A dead skeleton rebuilds itself and recovers d6 HP.",
    "heal": "d6"
   },
   {
    "name": "Weathercraft",
    "text": "The wind blows a desired direction."
   },
   {
    "name": "Necro-Gust",
    "text": "One creature it can see tests TOUGHNESS DR14 or takes d8 damage.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 14
    },
    "damage": "d8"
   },
   {
    "name": "Crow Sight",
    "text": "See from the crow's eyes."
   }
  ],
  "text": "Vile. Maniacal. Cunning.",
  "source": "Core Rules",
  "page": 93
 },
 {
  "homebrew": false,
  "id": "crow",
  "name": "Crow",
  "category": "beast",
  "group": "Skeletons",
  "hp": 2,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Beak",
    "damage": "d2"
   },
   {
    "name": "Claws",
    "damage": "d2"
   }
  ],
  "attackChoice": "one of",
  "specials": [],
  "text": "The Skeleton Warlock's familiar; the warlock can see through its eyes.",
  "source": "Core Rules",
  "page": 93
 },
 {
  "homebrew": false,
  "id": "skeleton-capn",
  "name": "Skeleton: Cap'n",
  "category": "undead",
  "group": "Skeletons",
  "hp": 10,
  "morale": 10,
  "armor": {
   "name": "Leather Coat",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Hook",
    "damage": "d4"
   },
   {
    "name": "Flintlock",
    "damage": "2d4",
    "notes": "Reload 2"
   }
  ],
  "blackPowder": true,
  "specials": [
   {
    "name": "Unnatural Leader",
    "text": "Other skeletons within 20' are DR +2 to defend against."
   },
   {
    "name": "Horror of Nature",
    "text": "At the start of combat PCs test SPIRIT DR12 or are frozen in fear for d4 rounds; they may test again each round."
   },
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "text": "Terrifying and extremely intelligent: they remember all their naval skills from life and are ferocious leaders.",
  "source": "Core Rules",
  "page": 93
 },
 {
  "homebrew": false,
  "id": "zombie-the-admiral",
  "name": "Zombie: \"The Admiral\"",
  "category": "undead",
  "group": "Zombies",
  "hp": 20,
  "morale": 10,
  "armor": {
   "name": "Ghostly Aura",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Death-gaze",
    "damage": "d6",
    "notes": "300' range"
   },
   {
    "name": "Cutlass",
    "damage": "d8"
   }
  ],
  "specials": [
   {
    "name": "Rise!",
    "text": "d6 destroyed undead rise with 1 HP."
   },
   {
    "name": "Black Firestorm",
    "text": "d4 creatures test AGILITY DR10 or each take d6 damage."
   },
   {
    "name": "Spirit-siphon",
    "text": "One creature tests SPIRIT DR12 or permanently loses 1 STRENGTH, and \"The Admiral\" recovers d8 HP."
   }
  ],
  "text": "Not truly a zombie: a sorcerer turned to wicked necromancy, now undead. Intelligent commanders who lurk unseen; many keep soul crypts deep underwater or in ruined jungle temples.",
  "source": "Core Rules",
  "page": 95
 },
 {
  "homebrew": false,
  "id": "ghost-monkey",
  "name": "Ghost Monkey",
  "category": "spirit",
  "group": "Ghosts",
  "hp": 4,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Claws/bite",
    "damage": "d4"
   },
   {
    "name": "Monkey See, Monkey Poo",
    "damage": null,
    "notes": "test AGILITY DR12 or become poisoned"
   }
  ],
  "specials": [
   {
    "name": "Ethereal",
    "text": "Can be invisible until it attacks, then it is DR16 to hit."
   },
   {
    "name": "Ghostly Terror",
    "text": "Anyone seeing ghosts for the first time tests SPIRIT DR12 or flees in terror; they may test again at the start of each turn. Ghosts love grog and rum (especially with black powder in it), and some plant roots are dangerous to them."
   }
  ],
  "dr": {
   "attack": 16
  },
  "text": "Excellent climbers and pickpockets that eat everything in sight. They love coconuts; bananas upset their stomachs (and bowels).",
  "source": "Core Rules",
  "page": 96
 },
 {
  "homebrew": false,
  "id": "ghost-crew",
  "name": "Ghost Crew",
  "category": "spirit",
  "group": "Ghosts",
  "hp": 7,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Harpoon",
    "damage": "d8",
    "notes": "can be thrown 30'"
   }
  ],
  "specials": [
   {
    "name": "Ethereal",
    "text": "Can be invisible until it attacks, then it is DR14 to hit."
   },
   {
    "name": "Ghostly Terror",
    "text": "Anyone seeing ghosts for the first time tests SPIRIT DR12 or flees in terror; they may test again at the start of each turn. Ghosts love grog and rum (especially with black powder in it), and some plant roots are dangerous to them."
   }
  ],
  "dr": {
   "attack": 14
  },
  "text": "Sailors and pirates lost at sea, forever bound to carry out their captain's orders… and to search for grog.",
  "source": "Core Rules",
  "page": 96
 },
 {
  "homebrew": false,
  "id": "ghost-quartermaster",
  "name": "Ghost Quartermaster",
  "category": "spirit",
  "group": "Ghosts",
  "hp": 10,
  "morale": 9,
  "armor": null,
  "attacks": [
   {
    "name": "Scimitar",
    "damage": "d8"
   },
   {
    "name": "Flintlock",
    "damage": "2d4"
   }
  ],
  "specials": [
   {
    "name": "Vicious Leader",
    "text": "All Ghost Crew within 10' are DR14 to defend against, and only make morale tests if the Quartermaster or Captain is destroyed."
   },
   {
    "name": "Ethereal",
    "text": "Hidden until it attacks. Attacks against it are DR14."
   },
   {
    "name": "Ghostly Terror",
    "text": "Anyone seeing ghosts for the first time tests SPIRIT DR12 or flees in terror; they may test again at the start of each turn. Ghosts love grog and rum (especially with black powder in it), and some plant roots are dangerous to them."
   }
  ],
  "dr": {
   "attack": 14
  },
  "text": "Mean, foul second-in-command. In life they punished the crew; in death they punish everyone.",
  "source": "Core Rules",
  "page": 97
 },
 {
  "homebrew": false,
  "id": "ghost-captain",
  "name": "Ghost Captain",
  "category": "spirit",
  "group": "Ghosts",
  "hp": 15,
  "morale": 10,
  "armor": {
   "name": "Gibbet Cage",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Chain Whip",
    "damage": "d8",
    "notes": "10' reach"
   },
   {
    "name": "Spectral Cutlass",
    "damage": "d8",
    "notes": "+ Life Drain"
   }
  ],
  "specials": [
   {
    "name": "Life Drain",
    "text": "Test SPIRIT DR12 or the captain drains all abilities by 1 until the next dawn and recovers d6 HP."
   },
   {
    "name": "Ethereal",
    "text": "Hidden until it attacks. DR14 to hit."
   },
   {
    "name": "Hover",
    "text": "Can fly up to 50' each turn."
   },
   {
    "name": "Ghostly Terror",
    "text": "Anyone seeing ghosts for the first time tests SPIRIT DR12 or flees in terror; they may test again at the start of each turn. Ghosts love grog and rum (especially with black powder in it), and some plant roots are dangerous to them."
   }
  ],
  "dr": {
   "attack": 14
  },
  "text": "Hanged for their crimes at sea, these full-body apparitions are horrifying to behold.",
  "source": "Core Rules",
  "page": 97
 },
 {
  "homebrew": false,
  "id": "scavenging-seagull",
  "name": "Scavenging Seagull",
  "category": "beast",
  "hp": 4,
  "morale": 6,
  "moraleText": "6*",
  "armor": {
   "name": "Metallic Feathers",
   "die": "d2",
   "tier": 1
  },
  "count": "2d4",
  "attacks": [
   {
    "name": "Claws",
    "damage": "d4"
   },
   {
    "name": "Bite",
    "damage": "d4",
    "notes": "1-in-4 risk of infection"
   }
  ],
  "specials": [
   {
    "name": "Flock",
    "text": "Only test Morale when a seagull is left alone; they wreak havoc in flocks of 2d4."
   },
   {
    "name": "Metal Eaters",
    "text": "Drawn to anything that glitters; the metal they eat becomes part of their bodies."
   }
  ],
  "lootTable": {
   "die": "d10",
   "name": "In the Belly of a Seagull",
   "note": "In the belly of a seagull.",
   "rows": [
    {
     "roll": 1,
     "text": "A coin with an engraved map."
    },
    {
     "roll": 2,
     "text": "An unbreakable thread (1' long)."
    },
    {
     "roll": 3,
     "text": "A dozen rusty nails."
    },
    {
     "roll": 4,
     "text": "A black dagger."
    },
    {
     "roll": 5,
     "text": "Two dozen silver."
    },
    {
     "roll": 6,
     "text": "A shimmering necklace of skull pieces."
    },
    {
     "roll": 7,
     "text": "Three fingers."
    },
    {
     "roll": 8,
     "text": "Blackened sludge."
    },
    {
     "roll": 9,
     "text": "A miniature metal statue."
    },
    {
     "roll": 10,
     "text": "Two poisonous needles."
    }
   ]
  },
  "text": "When the sea lies still as a painting, these terrible birds can shatter the silence with a cacophony of screams. Written by Pelle Nilsson.",
  "source": "Core Rules",
  "page": 98
 },
 {
  "homebrew": false,
  "id": "obscure-oyster-cult",
  "name": "Obscure Oyster Cult",
  "category": "beast",
  "hp": 6,
  "morale": 7,
  "armor": {
   "name": "Ornamented Shell",
   "die": "d6",
   "tier": 3
  },
  "count": "d4+2",
  "attacks": [
   {
    "name": "Crash",
    "damage": "d4"
   },
   {
    "name": "Snatch",
    "damage": "d6",
    "notes": "1-in-6: lose a finger"
   }
  ],
  "specials": [
   {
    "name": "Cult Name",
    "text": "Roll d4 twice: 1 Molluscan / Depth, 2 Silent / Streams, 3 Waving / Entity, 4 Endless / Deadbeats."
   },
   {
    "name": "Charge",
    "text": "On land they tend to run at their prey and crash into it."
   }
  ],
  "cultName": {
   "die": "d4",
   "first": [
    "Molluscan",
    "Silent",
    "Waving",
    "Endless"
   ],
   "second": [
    "Depth",
    "Streams",
    "Entity",
    "Deadbeats"
   ]
  },
  "text": "Huge (for an oyster) mollusks that hum and meditate peacefully at sea, but crawl ashore on crooked limbs hunting blood and flesh for their enlightenment rituals. Always found in groups of d4+2, each shell ornamented with otherworldly symbols. Written by Pelle Nilsson.",
  "source": "Core Rules",
  "page": 99
 },
 {
  "homebrew": false,
  "id": "deep-ones",
  "name": "Deep Ones",
  "category": "monster",
  "hp": 11,
  "morale": 8,
  "armor": {
   "name": "Scales",
   "die": "d2",
   "tier": 1
  },
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Mollusk Shell Spear",
    "damage": "d8",
    "notes": "thrown or 10' reach"
   },
   {
    "name": "Shark Tooth Blade",
    "damage": "d6"
   },
   {
    "name": "Coral Staff",
    "damage": "d4",
    "notes": "or the effect of one Ancient Relic (pg. 62)"
   },
   {
    "name": "Ritual (pg. 64)",
    "damage": null,
    "notes": "takes d4 rounds to cast (DR10)"
   }
  ],
  "specials": [],
  "text": "Fishfolk humanoids once thought a myth: excellent swimmers, somewhat intelligent; their shamans know sea magic.",
  "source": "Core Rules",
  "page": 100
 },
 {
  "homebrew": false,
  "id": "the-drowned",
  "name": "The Drowned",
  "category": "undead",
  "hp": 9,
  "morale": 9,
  "armor": {
   "name": "Kelp Shroud",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Claws and Seaweed Snare",
    "damage": "d4",
    "notes": "+ AGILITY DR12 or Entangled: can't move; STRENGTH DR12 (an action) to break free"
   },
   {
    "name": "Submerge",
    "damage": null,
    "notes": "pulls an entangled victim underwater; see Holding Your Breath (pg. 28)"
   }
  ],
  "specials": [],
  "text": "Mariners lost to the dark tide: waterlogged ghouls drifting in kelp forests waiting for sailors to pass.",
  "source": "Core Rules",
  "page": 100
 },
 {
  "homebrew": false,
  "id": "gorilla-crab",
  "name": "Gorilla Crab",
  "category": "beast",
  "hp": 12,
  "morale": 7,
  "armor": {
   "name": "Shell",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Big Claw",
    "damage": "d8"
   },
   {
    "name": "Little Claw",
    "damage": "d2"
   }
  ],
  "attacksPerRound": 2,
  "specials": [
   {
    "name": "Combatant",
    "text": "Makes two attacks, one with each claw."
   },
   {
    "name": "Climber",
    "text": "Can climb and hide in trees."
   }
  ],
  "text": "Large, territorial crustaceans of coral reefs and coastal jungles, named for the way they move; known to charge when threatened.",
  "source": "Core Rules",
  "page": 101
 },
 {
  "homebrew": false,
  "id": "sea-wraith",
  "name": "Sea Wraith",
  "category": "spirit",
  "hp": 16,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Blood Freeze",
    "damage": "d2",
    "notes": "+ TOUGHNESS DR14 or Frozen: no movement or actions; take d2 at the start of your turn, then test again"
   }
  ],
  "specials": [
   {
    "name": "Ethereal",
    "text": "DR14 to hit."
   }
  ],
  "dr": {
   "attack": 14
  },
  "text": "Ghosts of captains lost at sea, bound to the world by unfinished business. They float in water and air.",
  "source": "Core Rules",
  "page": 101
 },
 {
  "homebrew": false,
  "id": "siren",
  "name": "Siren",
  "category": "monster",
  "hp": 12,
  "morale": 8,
  "armor": {
   "name": "Scales",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Claw",
    "damage": "d4"
   },
   {
    "name": "Tentacles",
    "damage": null,
    "notes": "AGILITY DR12 or grappled in a tentacle; may test again at the end of each turn"
   },
   {
    "name": "Consume",
    "damage": null,
    "notes": "sucks the soul of a creature caught in its tentacles: TOUGHNESS DR12 or lose d12 HP"
   }
  ],
  "specials": [
   {
    "name": "Siren's Song",
    "text": "Each turn, a creature that can hear a siren singing tests SPIRIT DR12 or spends its turn moving closer to a siren and defending it."
   }
  ],
  "text": "They often form covens of three. Out of water their hypnotic song draws sailors from miles away; underwater they sound like tormented banshees.",
  "source": "Core Rules",
  "page": 102
 },
 {
  "homebrew": false,
  "id": "black-coral-crab",
  "name": "Black Coral Crab",
  "category": "beast",
  "hp": 1,
  "morale": 5,
  "armor": {
   "name": "Shell",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Claws",
    "damage": "d2"
   },
   {
    "name": "Spikes",
    "damage": "d2"
   }
  ],
  "specials": [
   {
    "name": "Soft Belly",
    "text": "Unarmored from beneath."
   }
  ],
  "text": "Invasive, spiky crustaceans that feast on coral, swarming so thickly that whole reefs look like black, shifting masses.",
  "source": "Core Rules",
  "page": 102
 },
 {
  "homebrew": false,
  "id": "coral-shoggoth",
  "name": "Coral Shoggoth",
  "category": "monster",
  "boss": true,
  "hp": 50,
  "morale": 8,
  "armor": {
   "name": "Coral",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Hydrothermal Breath",
    "damage": "d10",
    "notes": "10'"
   },
   {
    "name": "Stomp (land)",
    "damage": null,
    "notes": "shock waves ripple 25' out: STRENGTH DR12 or fall prone for the next turn"
   },
   {
    "name": "Coral Spike Bash",
    "damage": "d8",
    "notes": "creatures in its path test AGILITY DR10 or take d8 each"
   }
  ],
  "specials": [],
  "text": "Extremely intelligent abominations from a forgotten age that have grown to resemble their surroundings.",
  "source": "Core Rules",
  "page": 103
 },
 {
  "homebrew": false,
  "id": "undead-megalodon",
  "name": "Undead Megalodon",
  "category": "monster",
  "boss": true,
  "hp": 40,
  "morale": null,
  "armor": {
   "name": "Shark Skin",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Zombie Vomit",
    "damage": null,
    "notes": "d4 zombies emerge"
   },
   {
    "name": "Bite",
    "damage": "d12",
    "notes": "DR8 to dodge"
   }
  ],
  "specials": [
   {
    "name": "Fearless",
    "text": "Only scared of bigger fish."
   },
   {
    "name": "Elusive",
    "text": "DR16 to hit when underwater (if it can even be seen), DR8 when surfacing."
   },
   {
    "name": "Undying",
    "text": "If reduced to 0 HP or less, it tests DR12 to drop to 1 HP instead."
   },
   {
    "name": "Sea Monster",
    "text": "In Naval Combat sea monsters aren't affected by wind and can move up to their speed in any direction."
   }
  ],
  "dr": {
   "attack": 16,
   "defend": 8
  },
  "drNote": "DR16 to hit underwater (if it can even be seen), DR8 when surfacing; its bite is DR8 to dodge.",
  "naval": {
   "hp": 8,
   "morale": null,
   "armor": null,
   "speed": 6,
   "agility": 3,
   "attacks": [
    {
     "name": "Spike Ram",
     "damage": "d12"
    }
   ]
  },
  "text": "A colossal undead shark.",
  "source": "Core Rules",
  "page": 104
 },
 {
  "homebrew": false,
  "id": "the-kraken",
  "name": "The Kraken",
  "category": "monster",
  "boss": true,
  "hp": 200,
  "morale": 9,
  "armor": {
   "name": "Rubbery Skin",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Tentacle Slam",
    "damage": "d6",
    "notes": "4 per turn"
   },
   {
    "name": "Grab",
    "damage": null,
    "notes": "AGILITY DR12 to dodge"
   },
   {
    "name": "Eat",
    "damage": null,
    "notes": "death to one grabbed creature"
   }
  ],
  "attacksPerRound": 4,
  "specials": [
   {
    "name": "Huge",
    "text": "DR8 to hit."
   },
   {
    "name": "Optional",
    "text": "Its 8 tentacles have 25 HP each."
   },
   {
    "name": "Sea Monster",
    "text": "In Naval Combat sea monsters aren't affected by wind and can move up to their speed in any direction."
   }
  ],
  "dr": {
   "attack": 8
  },
  "naval": {
   "hp": 40,
   "morale": 9,
   "armor": null,
   "speed": 4,
   "agility": 1,
   "attacks": [
    {
     "name": "Tentacles",
     "damage": "d6",
     "notes": "up to 4 per turn"
    },
    {
     "name": "Entangle",
     "damage": null,
     "notes": "the ship can't move, but attacks against the Kraken are DR6"
    }
   ]
  },
  "text": "The legendary many-armed terror of the deep.",
  "source": "Core Rules",
  "page": 105
 },
 {
  "homebrew": false,
  "id": "davy-jones",
  "name": "Davy Jones",
  "category": "monster",
  "boss": true,
  "hp": 200,
  "morale": 10,
  "armor": {
   "name": "Shell",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Bite",
    "damage": "3d12"
   },
   {
    "name": "Fin Spikes",
    "damage": "2d8"
   },
   {
    "name": "Soul Rend",
    "damage": null,
    "notes": "test PRESENCE DR12 or go mad; test again each turn; fail three times: permanent insanity"
   }
  ],
  "specials": [
   {
    "name": "Telepathic",
    "text": "Highly intelligent, but communicates only telepathically."
   },
   {
    "name": "Sea Monster",
    "text": "In Naval Combat sea monsters aren't affected by wind and can move up to their speed in any direction."
   }
  ],
  "naval": {
   "hp": 40,
   "morale": 10,
   "armor": {
    "name": "Shell",
    "die": "d4",
    "tier": 2
   },
   "speed": 6,
   "agility": 3,
   "attacks": [
    {
     "name": "Spike Ram",
     "damage": "d12"
    }
   ]
  },
  "text": "A legendary monster often mistaken for a small island, eyes swirling like a maelstrom. Some call him the god who guides the dead to their watery graves; others say he was once a man who dabbled in dark sorcery.",
  "source": "Core Rules",
  "page": 106
 },
 {
  "homebrew": false,
  "id": "the-leviathan",
  "name": "The Leviathan",
  "category": "monster",
  "boss": true,
  "hp": 400,
  "morale": 8,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "3d12"
   },
   {
    "name": "Tentacles",
    "damage": "2d8"
   }
  ],
  "specials": [
   {
    "name": "Terrifying",
    "text": "Creatures seeing the Leviathan for the first time test PRESENCE or SPIRIT DR12 (PC's choice) or flee in terror; they may test again at the start of each turn."
   },
   {
    "name": "Sea Monster",
    "text": "In Naval Combat sea monsters aren't affected by wind and can move up to their speed in any direction."
   }
  ],
  "naval": {
   "hp": 80,
   "morale": 8,
   "armor": null,
   "speed": 3,
   "agility": 1,
   "attacks": [
    {
     "name": "Tentacles",
     "damage": "d12"
    }
   ]
  },
  "text": "An antediluvian creature lurking in the darkest abyss, waiting to devour the world.",
  "source": "Core Rules",
  "page": 107
 },
 {
  "homebrew": false,
  "id": "marrow-carronade",
  "name": "Marrow Carronade",
  "category": "construct",
  "group": "Marrow Cannons",
  "hp": 24,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Round Shot",
    "damage": "d8",
    "notes": "melee & naval combat"
   },
   {
    "name": "Canister Shot",
    "damage": "d4",
    "notes": "once per turn roll d6: on a 6 it fires canister shot, d4 to every creature in a small cone in front of it"
   }
  ],
  "specials": [
   {
    "name": "Marrow Cannon",
    "text": "A sentient undead cannon built by necrosmiths from human, livestock and fish remains. Usable in melee and naval combat."
   }
  ],
  "text": "A squat bone cannon on a wheeled carriage.",
  "source": "Core Rules",
  "page": 108
 },
 {
  "homebrew": false,
  "id": "marrow-mortar",
  "name": "Marrow Mortar",
  "category": "construct",
  "group": "Marrow Cannons",
  "hp": 12,
  "morale": 5,
  "armor": null,
  "attacks": [
   {
    "name": "Indirect Fire",
    "damage": "2d6",
    "notes": "shells a creature an ally attacked since the mortar's last turn: AGILITY DR14 or take 2d6"
   }
  ],
  "specials": [
   {
    "name": "Marrow Cannon",
    "text": "A sentient undead cannon built by necrosmiths from human, livestock and fish remains."
   }
  ],
  "text": "A wide-mouthed mortar riding on a cart of ribs and skulls.",
  "source": "Core Rules",
  "page": 109
 },
 {
  "homebrew": false,
  "id": "bane-of-barbados",
  "name": "Bane of Barbados",
  "category": "construct",
  "group": "Marrow Cannons",
  "named": true,
  "hp": 48,
  "morale": 10,
  "armor": {
   "name": "Steel Plating",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Round Shot",
    "damage": "d12",
    "notes": "melee & naval combat"
   },
   {
    "name": "Explosive Shot",
    "damage": "3d6",
    "notes": "creatures in a 10' radius test AGILITY DR14: fail 3d6 damage, pass half"
   }
  ],
  "specials": [
   {
    "name": "Marrow Cannon",
    "text": "The mightiest marrow cannons have smoothbore whalebone barrels and are named after the cities they first reduced to rubble."
   }
  ],
  "text": "A great whalebone-barreled marrow cannon.",
  "source": "Core Rules",
  "page": 109
 },
 {
  "homebrew": false,
  "id": "vessel-from-the-deep-claw",
  "name": "Vessel from the Deep: Claw",
  "category": "monster",
  "group": "Vessel from the Deep",
  "hp": 10,
  "morale": null,
  "armor": {
   "name": "Shell",
   "die": "d6",
   "tier": 3
  },
  "count": 2,
  "attacks": [
   {
    "name": "Pinch",
    "damage": "d12"
   }
  ],
  "specials": [],
  "text": "One of the two great claws of a Vessel from the Deep, fought in melee.",
  "source": "Core Rules",
  "page": 85
 },
 {
  "homebrew": false,
  "id": "vessel-from-the-deep-tentacle",
  "name": "Vessel from the Deep: Tentacle",
  "category": "monster",
  "group": "Vessel from the Deep",
  "hp": 2,
  "morale": null,
  "armor": null,
  "count": 8,
  "attacks": [
   {
    "name": "Slam",
    "damage": "d4",
    "notes": "+ AGILITY DR12 or entangled; STRENGTH DR12 to escape each round"
   }
  ],
  "specials": [],
  "text": "One of the eight tentacles of a Vessel from the Deep, fought in melee.",
  "source": "Core Rules",
  "page": 85
 },
 {
  "homebrew": false,
  "id": "the-naval-mastermind",
  "name": "The Naval Mastermind",
  "category": "npc",
  "group": "Archetype Captain: Naval Mastermind",
  "captain": "naval-mastermind",
  "boss": true,
  "hp": 13,
  "morale": 9,
  "armor": {
   "name": "Leather Doublet",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Captain's Cutlass",
    "damage": "d8",
    "notes": "DR +2 to attack & defend"
   },
   {
    "name": "Dueling Pistol",
    "damage": "2d4",
    "notes": "DR16 to defend if aimed for 1 turn; Reload 2"
   }
  ],
  "blackPowder": true,
  "specials": [
   {
    "name": "When aboard a ship",
    "text": "That ship's attacks are −2 DR to hit, and it may take 1 extra crew action each turn."
   }
  ],
  "dr": {
   "attack": 14,
   "defend": 14
  },
  "drNote": "DR +2 applies while he fights with the Captain's Cutlass; once he has aimed the Dueling Pistol for 1 turn it is DR16 to defend.",
  "text": "Tactical geniuses shaped by naval academies and decades at sea, hunting pirates, treasure fleets and enemies of the Crown.",
  "source": "Core Rules",
  "page": 110
 },
 {
  "homebrew": false,
  "id": "naval-officer",
  "name": "Naval Officer",
  "category": "npc",
  "group": "Archetype Captain: Naval Mastermind",
  "captain": "naval-mastermind",
  "hp": 8,
  "morale": 8,
  "armor": null,
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Flintlock",
    "damage": "2d4",
    "notes": "Reload 2 actions"
   },
   {
    "name": "Issue Command",
    "damage": null,
    "notes": "attacks/defense for one nearby ally are DR16 for one turn"
   }
  ],
  "blackPowder": true,
  "specials": [
   {
    "name": "Nearby Crew",
    "text": "Nearby crew are DR14 to defend against and +3 Morale."
   }
  ],
  "text": "Lieutenants, midshipmen, mates, bosuns and quartermasters: soldiers who are weapons of war.",
  "source": "Core Rules",
  "page": 110
 },
 {
  "homebrew": false,
  "id": "naval-crew",
  "name": "Naval Crew",
  "category": "npc",
  "group": "Archetype Captain: Naval Mastermind",
  "captain": "naval-mastermind",
  "hp": 4,
  "morale": 5,
  "armor": null,
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Cudgel",
    "damage": "d4"
   },
   {
    "name": "Flintlock",
    "damage": "2d4"
   },
   {
    "name": "Musket",
    "damage": "2d6"
   }
  ],
  "blackPowder": true,
  "specials": [],
  "text": "Enlisted men, sailors and press-ganged drunks living short, harsh lives.",
  "source": "Core Rules",
  "page": 110
 },
 {
  "homebrew": false,
  "id": "the-inquisitor",
  "name": "The Inquisitor",
  "category": "npc",
  "group": "Archetype Captain: Inquisitor",
  "captain": "inquisitor",
  "boss": true,
  "hp": 15,
  "morale": 8,
  "armor": {
   "name": "Plate",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Blessed Rapier",
    "damage": "d8",
    "notes": "+2 DR to defend"
   },
   {
    "name": "Banner Pole",
    "damage": "d6",
    "notes": "STRENGTH DR10 or knocked over (can't move next turn)"
   },
   {
    "name": "The Power of the Holy Spirit",
    "damage": null,
    "notes": "one creature is stunned for one turn"
   },
   {
    "name": "Revel in the Sacrament",
    "damage": null,
    "notes": "d6 of its allies recover d4 HP"
   },
   {
    "name": "Holy Flame",
    "damage": "d10",
    "notes": "one creature tests SPIRIT DR10 or loses d10 HP"
   }
  ],
  "specials": [
   {
    "name": "When aboard a ship",
    "text": "The Inquisitor can spend a crew action and test DR14 to change the wind direction (one hex face) and speed (±1 speed)."
   }
  ],
  "dr": {
   "defend": 14
  },
  "text": "Religious, tyrannical, patriarchal commanders of armored conquistadors and devoted priests, hunting down anyone they deem a heretic.",
  "source": "Core Rules",
  "page": 111
 },
 {
  "homebrew": false,
  "id": "conquistador",
  "name": "Conquistador",
  "category": "npc",
  "group": "Archetype Captain: Inquisitor",
  "captain": "inquisitor",
  "hp": 9,
  "morale": 8,
  "armor": {
   "name": "Plate",
   "die": "d6",
   "tier": 3
  },
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Rapier",
    "damage": "d8"
   },
   {
    "name": "Pike",
    "damage": "d10",
    "notes": "2 hands"
   },
   {
    "name": "Crossbow",
    "damage": "d8",
    "notes": "Reload 1"
   },
   {
    "name": "Musket",
    "damage": "2d6",
    "notes": "Reload 2"
   }
  ],
  "blackPowder": true,
  "specials": [],
  "text": "Strong, arrogant, heavily armored paladins.",
  "source": "Core Rules",
  "page": 111
 },
 {
  "homebrew": false,
  "id": "purge-priest",
  "name": "Purge Priest",
  "category": "npc",
  "group": "Archetype Captain: Inquisitor",
  "captain": "inquisitor",
  "hp": 4,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Fisticuffs",
    "damage": "d2+1"
   },
   {
    "name": "Touch of God",
    "damage": null,
    "notes": "touch one creature to heal it d4 HP"
   }
  ],
  "specials": [],
  "text": "Corrupted, maniacal and devout.",
  "source": "Core Rules",
  "page": 111
 },
 {
  "homebrew": false,
  "id": "the-necromancer",
  "name": "The Necromancer",
  "category": "undead",
  "group": "Archetype Captain: Necromancer",
  "captain": "necromancer",
  "boss": true,
  "hp": 20,
  "morale": 10,
  "armor": {
   "name": "Lich-like",
   "die": "d2",
   "tier": 1
  },
  "armorNote": "−d4 against non-iron weapons",
  "attacks": [
   {
    "name": "Legendary Cutlass",
    "damage": "d10"
   },
   {
    "name": "Necro Blast",
    "damage": "2d6",
    "notes": "50' range, recharge 1"
   },
   {
    "name": "Reanimate",
    "damage": null,
    "notes": "d4 dead creatures or piles of bone animate as Skeleton Crew"
   },
   {
    "name": "Soul Harvest",
    "damage": null,
    "notes": "touch a recently killed human to recover d8 HP"
   }
  ],
  "specials": [
   {
    "name": "Unholy",
    "text": "\"Healing\" magic damages it, bypassing armor."
   },
   {
    "name": "When aboard a ship",
    "text": "Bones can be fired from its cannons onto an enemy ship; the Necromancer can spend its action to animate them."
   }
  ],
  "text": "Less human than human: once captains, now consumed by dark sorcery and compelled to drain the life from the living.",
  "source": "Core Rules",
  "page": 112
 },
 {
  "homebrew": false,
  "id": "skeleton-crew",
  "name": "Skeleton Crew",
  "category": "undead",
  "group": "Archetype Captain: Necromancer",
  "captain": "necromancer",
  "hp": 4,
  "morale": null,
  "armor": null,
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Scimitar",
    "damage": "d6"
   },
   {
    "name": "Claws",
    "damage": "d4"
   },
   {
    "name": "Femur Club",
    "damage": "d6"
   },
   {
    "name": "Ghost Chains",
    "damage": "d4",
    "notes": "10' range, hits 2 targets"
   }
  ],
  "specials": [
   {
    "name": "Skeleton",
    "text": "Any skeleton that takes more than 5 damage (after armor) at once tumbles into a pile of bones. Without a Cap'n or Warlock nearby, skeletons that fail a morale test crumble into ASH."
   }
  ],
  "text": "Crew of the dead, driven by eldritch ambition: they remember their sailing and combat skills from life, but none of the desire to live.",
  "source": "Core Rules",
  "page": 112
 },
 {
  "homebrew": false,
  "id": "living-thralls",
  "name": "Living Thralls",
  "category": "npc",
  "group": "Archetype Captain: Necromancer",
  "captain": "necromancer",
  "hp": 6,
  "morale": 7,
  "armor": null,
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Knife",
    "damage": "d6"
   },
   {
    "name": "Flintlock",
    "damage": "2d4",
    "notes": "Reload 2"
   },
   {
    "name": "Exploding Bone Grenades",
    "damage": "d6",
    "notes": "d4 creatures test AGILITY DR10 or take d6 each"
   }
  ],
  "blackPowder": true,
  "specials": [],
  "text": "Servants and students of the dark captain.",
  "source": "Core Rules",
  "page": 112
 },
 {
  "homebrew": false,
  "id": "the-sunken-one",
  "name": "The Sunken One",
  "category": "monster",
  "group": "Archetype Captain: Sunken One",
  "captain": "sunken-one",
  "boss": true,
  "hp": 24,
  "morale": 10,
  "armor": {
   "name": "Crustacean Carapace",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Claw",
    "damage": "d12"
   },
   {
    "name": "Leg Stab",
    "damage": "d6",
    "notes": "2 targets"
   },
   {
    "name": "Trident",
    "damage": "d10",
    "notes": "10' range, can be thrown"
   }
  ],
  "specials": [
   {
    "name": "Wave Call (aboard a ship)",
    "text": "Deal d8 damage to another ship and push it 1 hex in any direction. Recharges after 4 rounds."
   }
  ],
  "text": "Wretched cult leaders bound by a pact with The Old Ones: shipwrecked captains who prayed to the Abyss for salvation, now abominations anchored to the sea.",
  "source": "Core Rules",
  "page": 113
 },
 {
  "homebrew": false,
  "id": "thing-from-below",
  "name": "Thing from Below",
  "category": "monster",
  "group": "Archetype Captain: Sunken One",
  "captain": "sunken-one",
  "hp": 9,
  "hpText": "2d8",
  "hpDice": "2d8",
  "morale": 9,
  "moraleText": "d6+6",
  "moraleDice": "d6+6",
  "armor": {
   "name": "Scaly Skin",
   "die": "d2",
   "tier": 1
  },
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Claws",
    "damage": "d4"
   },
   {
    "name": "Bite",
    "damage": "d6"
   },
   {
    "name": "Stinger",
    "damage": "d6"
   },
   {
    "name": "Tentacles",
    "damage": "d6",
    "notes": "2 targets"
   },
   {
    "name": "Urchin Flail",
    "damage": "d8"
   },
   {
    "name": "Squid Ink Sack Spray",
    "damage": null,
    "notes": "d4 nearby targets test AGILITY DR12 or are blind for 1 round"
   }
  ],
  "specials": [],
  "text": "Aquatic mutants corrupted by years under water.",
  "source": "Core Rules",
  "page": 113
 },
 {
  "homebrew": false,
  "id": "lost-sailor",
  "name": "Lost Sailor",
  "category": "npc",
  "group": "Archetype Captain: Sunken One",
  "captain": "sunken-one",
  "hp": 6,
  "morale": 5,
  "armor": null,
  "attackChoice": "pick 1-2",
  "attacks": [
   {
    "name": "Sea Shell",
    "damage": "d4"
   },
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Harpoon",
    "damage": "d8"
   },
   {
    "name": "Anchor",
    "damage": "d10"
   },
   {
    "name": "Fishhook Mace",
    "damage": "d8"
   },
   {
    "name": "Cargo Net",
    "damage": null,
    "notes": "AGILITY DR12 or trapped; test again at the end of each turn"
   }
  ],
  "specials": [],
  "text": "Mariners lost at sea who now serve The Deep.",
  "source": "Core Rules",
  "page": 113
 },
 {
  "homebrew": false,
  "id": "claude-barlette",
  "name": "Claude Barlette",
  "category": "npc",
  "named": true,
  "boss": true,
  "group": "Skeleton Point NPCs",
  "hp": 25,
  "morale": 11,
  "armor": {
   "name": "Necro-aura",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Death Touch",
    "damage": "d10",
    "notes": "+ Shriveling Spell"
   },
   {
    "name": "Shriveling Spell",
    "damage": null,
    "notes": "touch drains all stats by 1 for d20 hours; he regains d6 HP"
   },
   {
    "name": "Levitate",
    "damage": null,
    "notes": "fly 60' a turn"
   }
  ],
  "specials": [
   {
    "name": "Anti-magic",
    "text": "Any PC trying to use a Relic or Ritual against him must first test SPIRIT DR16."
   }
  ],
  "text": "The Governor: a short, fat aristocrat, a terrible leader frantic about his missing daughter — and secretly a 150-year-old necromancer who keeps the island cursed with monthly rituals.",
  "source": "The Curse of Skeleton Point",
  "page": 132
 },
 {
  "homebrew": false,
  "id": "veronique-barlette",
  "name": "Veronique Barlette",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 5,
  "morale": 9,
  "armor": null,
  "attacks": [
   {
    "name": "Teenage Insults",
    "damage": "d2"
   }
  ],
  "specials": [
   {
    "name": "Tragic Paintings",
    "text": "Her paintings are tragically beautiful; many weep after gazing at them for any length of time."
   }
  ],
  "text": "The Governor's daughter: a pale, dark landscape painter who fell in love with The Baron and ran away to live with him.",
  "source": "The Curse of Skeleton Point",
  "page": 132
 },
 {
  "homebrew": false,
  "id": "the-baron",
  "name": "The Baron",
  "category": "undead",
  "named": true,
  "boss": true,
  "group": "Skeleton Point NPCs",
  "hp": 20,
  "morale": null,
  "armor": {
   "name": "Plate",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Expert Rapier",
    "damage": "d10"
   },
   {
    "name": "Scream of Death",
    "damage": "d6",
    "notes": "all who hear it test PRESENCE DR12 or take d6"
   }
  ],
  "specials": [
   {
    "name": "Cursed",
    "text": "If killed, he reforms at dawn in the crypt (at sunset in the mausoleum per pg. 160) while the curse holds."
   },
   {
    "name": "Incorporeal",
    "text": "Incorporeal during the day: a ghostly apparition by day, a 10' armored skeleton by night."
   }
  ],
  "text": "Once a powerful conquistador whose family built the castle on Skeleton Point; his name long forgotten, he kills all who disturb the castle at night — except Veronique.",
  "source": "The Curse of Skeleton Point",
  "page": 132
 },
 {
  "homebrew": false,
  "id": "tela-fafane",
  "name": "Tela Fafane",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 15,
  "morale": 11,
  "armor": {
   "name": "Spirits",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Unarmed",
    "damage": "d2"
   },
   {
    "name": "Acid Potion",
    "damage": "d8",
    "notes": "thrown; reduces armor 1 tier"
   },
   {
    "name": "Ritual Magic",
    "damage": null,
    "notes": "knows many Rituals and casts them as needed — or for the right price (pg. 154)"
   }
  ],
  "specials": [],
  "text": "The \"witch\" of Death's Head Swamp: a kind-hearted, cryptic young green witch who sells potions and rituals and mostly hates people.",
  "source": "The Curse of Skeleton Point",
  "page": 133
 },
 {
  "homebrew": false,
  "id": "father-wallace",
  "name": "Father Wallace",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 6,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Unarmed",
    "damage": "d2"
   },
   {
    "name": "Holy Prayer",
    "damage": null,
    "notes": "heal a creature d4"
   },
   {
    "name": "Divine Summons",
    "damage": "4d8",
    "notes": "calls lightning on one creature: it loses 4d8 HP (ignores armor); once a week"
   }
  ],
  "specials": [],
  "text": "The abbot: an old, robed wizard of a man running a broke, empty church while secretly living in a tent in Shanty Town.",
  "source": "The Curse of Skeleton Point",
  "page": 133
 },
 {
  "homebrew": false,
  "id": "captain-davies",
  "name": "Captain Davies",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 9,
  "morale": 9,
  "armor": {
   "name": "Leather",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Flintlock (x2)",
    "damage": "2d4",
    "notes": "Reload 2 actions"
   }
  ],
  "blackPowder": true,
  "specials": [],
  "text": "The pirate boss: sardonic, sea-worn captain of The Eye of Chaos, running a smuggling operation from the sea caves of Carcass Beach. Recruitable — or a double-crosser. Probably both.",
  "source": "The Curse of Skeleton Point",
  "page": 133
 },
 {
  "homebrew": false,
  "id": "shadow-demon",
  "name": "Shadow Demon",
  "category": "spirit",
  "group": "Skeleton Point",
  "hp": 15,
  "morale": null,
  "armor": {
   "name": "Immaterial",
   "die": "d4",
   "tier": 2
  },
  "attacks": [
   {
    "name": "Claws",
    "damage": "d8"
   },
   {
    "name": "Screech",
    "damage": "d10",
    "notes": "2-in-6 chance"
   }
  ],
  "specials": [
   {
    "name": "Hunter",
    "text": "Appears in the caster's shape when a ritual in the lighthouse chamber fails; it never stops hunting its maker."
   }
  ],
  "text": "A shadow in the shape of a failed ritual-caster.",
  "source": "The Curse of Skeleton Point",
  "page": 141
 },
 {
  "homebrew": false,
  "id": "beatrice-boivin",
  "name": "Beatrice Boivin",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 15,
  "morale": 8,
  "armor": null,
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   },
   {
    "name": "Flintlock (x2)",
    "damage": "2d4"
   }
  ],
  "blackPowder": true,
  "specials": [],
  "text": "French privateer of Le Mercure hunting pirates and her kidnapped lover Mélanie.",
  "source": "The Curse of Skeleton Point",
  "page": 147
 },
 {
  "homebrew": false,
  "id": "pedro-de-balboa",
  "name": "Pedro de Balboa",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 10,
  "morale": 9,
  "armor": {
   "name": "Plate",
   "die": "d6",
   "tier": 3
  },
  "attacks": [
   {
    "name": "Fine Rapier",
    "damage": "d8"
   },
   {
    "name": "Crossbow",
    "damage": "d6"
   }
  ],
  "specials": [],
  "text": "Spanish conquistador and Church enforcer famous for hunting heretics; hires pirates when he needs muscle.",
  "source": "The Curse of Skeleton Point",
  "page": 147
 },
 {
  "homebrew": false,
  "id": "john-lloyd-catherwood",
  "name": "John Lloyd Catherwood",
  "category": "npc",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 5,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Knife",
    "damage": "d4"
   },
   {
    "name": "Musket",
    "damage": "2d6"
   }
  ],
  "blackPowder": true,
  "specials": [],
  "text": "An English artist and cartographer searching for the temple described in his late wife's journal.",
  "source": "The Curse of Skeleton Point",
  "page": 147
 },
 {
  "homebrew": false,
  "id": "high-wizard-clementius",
  "name": "High Wizard Clementius",
  "category": "npc",
  "named": true,
  "boss": true,
  "group": "Skeleton Point NPCs",
  "hp": 12,
  "morale": 10,
  "armor": null,
  "attacks": [
   {
    "name": "Dagger",
    "damage": "d4"
   },
   {
    "name": "Soul-harvest",
    "damage": "d8",
    "notes": "d2 creatures test SPIRIT DR14 or lose d8 HP; he regains half the total"
   },
   {
    "name": "Mind Cloud",
    "damage": null,
    "notes": "d4 creatures test SPIRIT DR10 or lose their next turn"
   }
  ],
  "specials": [],
  "text": "Sect leader of The Wretched, convinced The Nameless One can be made to serve.",
  "source": "The Curse of Skeleton Point",
  "page": 147
 },
 {
  "homebrew": false,
  "id": "xoth-the-imp",
  "name": "Xoth, the Imp",
  "category": "monster",
  "named": true,
  "group": "Skeleton Point NPCs",
  "hp": 20,
  "morale": null,
  "armor": {
   "name": "Rocky Skin",
   "die": "d2",
   "tier": 1
  },
  "attacks": [
   {
    "name": "Claws/bite",
    "damage": "d8"
   },
   {
    "name": "Hell-blast",
    "damage": "d4",
    "notes": "100' range"
   }
  ],
  "specials": [
   {
    "name": "Wall Crawler",
    "text": "Crawls all over the walls."
   }
  ],
  "text": "Xoth, Imp from the Dark Shore: a four-armed, one-eyed demon summoned by The Wretched, kept as Clementius's pet.",
  "source": "The Curse of Skeleton Point",
  "page": 147
 },
 {
  "homebrew": false,
  "id": "the-nameless-one",
  "name": "The Nameless One",
  "category": "monster",
  "named": true,
  "boss": true,
  "group": "Skeleton Point NPCs",
  "hp": 200,
  "morale": null,
  "armor": null,
  "attacks": [
   {
    "name": "Tentacle (x4)",
    "damage": "d6"
   },
   {
    "name": "Bite",
    "damage": "3d6"
   },
   {
    "name": "Ink Blast",
    "damage": null,
    "notes": "in and out of water: d6 targets test AGILITY DR12 or are blind for d4 rounds"
   }
  ],
  "attacksPerRound": 5,
  "specials": [],
  "text": "A horrible deep-sea monster called from The Abyss by a shaman, sealed beneath the Omega Stone: glowing eyes, countless tentacles, teeth everywhere.",
  "source": "The Curse of Skeleton Point",
  "page": 147
 },
 {
  "homebrew": false,
  "id": "neonates-baby-snakes",
  "name": "Neonates (Baby Snakes)",
  "category": "beast",
  "group": "Skeleton Point",
  "hp": 1,
  "morale": 6,
  "armor": null,
  "count": "2d10",
  "attacks": [
   {
    "name": "Bite",
    "damage": "d2"
   }
  ],
  "specials": [],
  "text": "A palm viper's nest of newborn snakes.",
  "source": "The Curse of Skeleton Point",
  "page": 149
 },
 {
  "homebrew": false,
  "id": "cultists",
  "name": "Cultists",
  "category": "npc",
  "group": "Skeleton Point",
  "hp": 3,
  "morale": 7,
  "armor": null,
  "attacks": [
   {
    "name": "Dagger",
    "damage": "d4"
   }
  ],
  "specials": [],
  "text": "Hooded members of The Wretched serving in the Sanctum of Nameless Blood.",
  "source": "The Curse of Skeleton Point",
  "page": 150
 },
 {
  "homebrew": false,
  "id": "priest",
  "name": "Priest",
  "category": "npc",
  "group": "Skeleton Point",
  "hp": 8,
  "morale": 9,
  "armor": null,
  "attacks": [
   {
    "name": "Dark Hex Spell",
    "damage": "d8",
    "notes": "50'"
   }
  ],
  "specials": [],
  "text": "A priest of The Wretched leading cultists in the Sanctum.",
  "source": "The Curse of Skeleton Point",
  "page": 151
 },
 {
  "homebrew": false,
  "id": "shrine-pirates",
  "name": "Shrine Pirates",
  "category": "npc",
  "group": "Skeleton Point",
  "hp": 5,
  "morale": 8,
  "armor": null,
  "count": 3,
  "attacks": [
   {
    "name": "Cutlass",
    "damage": "d6"
   }
  ],
  "specials": [],
  "text": "Greedy, stupid pirates who found the Shrine of the Nameless Skull an hour ago, reeking of grog and sweat.",
  "source": "The Curse of Skeleton Point",
  "page": 149
 },
 {
  "homebrew": false,
  "id": "swarm-of-bats",
  "name": "Swarm of Bats",
  "category": "beast",
  "group": "Skeleton Point",
  "hp": 1,
  "morale": 5,
  "armor": null,
  "count": "d8",
  "attacks": [
   {
    "name": "Bite",
    "damage": "1"
   }
  ],
  "specials": [],
  "text": "Bat swarms of the underground lake; they swarm, then flee through the Omega Stone opening.",
  "source": "The Curse of Skeleton Point",
  "page": 153
 },
 {
  "homebrew": false,
  "id": "guard-dogs",
  "name": "Guard Dogs",
  "category": "beast",
  "group": "Skeleton Point",
  "hp": 7,
  "morale": 6,
  "armor": null,
  "attacks": [
   {
    "name": "Bite",
    "damage": "d6"
   }
  ],
  "specials": [],
  "text": "Trained, mangy, starving guard dogs; roll reactions for each.",
  "source": "The Curse of Skeleton Point",
  "page": 151
 }
];

export const PB_NAMES: PbNameRow[] = [
 {
  "roll": 11,
  "male": "Esteban",
  "female": "Bridget",
  "surname": "Pérez",
  "nickname": "Sir/Madam"
 },
 {
  "roll": 12,
  "male": "Richard",
  "female": "Juliette",
  "surname": "Thompson",
  "nickname": "Sea"
 },
 {
  "roll": 13,
  "male": "Hendrik",
  "female": "Esther",
  "surname": "Jansen",
  "nickname": "Turtle"
 },
 {
  "roll": 14,
  "male": "Raymond",
  "female": "Rose",
  "surname": "Williams",
  "nickname": "Siren"
 },
 {
  "roll": 15,
  "male": "John",
  "female": "Beatrice",
  "surname": "Alva",
  "nickname": "Red"
 },
 {
  "roll": 16,
  "male": "Edmund",
  "female": "Olive",
  "surname": "Dubois",
  "nickname": "One-Eye/Arm/Leg"
 },
 {
  "roll": 21,
  "male": "Charles",
  "female": "Antonia",
  "surname": "Leon",
  "nickname": "Crimson"
 },
 {
  "roll": 22,
  "male": "Peter",
  "female": "Charlotte",
  "surname": "Brown",
  "nickname": "Blue"
 },
 {
  "roll": 23,
  "male": "Olivier",
  "female": "Isabel",
  "surname": "Jones",
  "nickname": "Water"
 },
 {
  "roll": 24,
  "male": "Barth",
  "female": "Adine",
  "surname": "Johnson",
  "nickname": "Skull"
 },
 {
  "roll": 25,
  "male": "Henry",
  "female": "Angela",
  "surname": "Thatch",
  "nickname": "Tall-Tale"
 },
 {
  "roll": 26,
  "male": "Roger",
  "female": "Cécile",
  "surname": "Davies",
  "nickname": "Old"
 },
 {
  "roll": 31,
  "male": "Don",
  "female": "Edwidge",
  "surname": "Archer",
  "nickname": "Blood"
 },
 {
  "roll": 32,
  "male": "Martín",
  "female": "Catalina",
  "surname": "Blanc",
  "nickname": "Mr./Mrs./Miss"
 },
 {
  "roll": 33,
  "male": "Louis",
  "female": "Elizabeth",
  "surname": "Evans",
  "nickname": "Gunpowder"
 },
 {
  "roll": 34,
  "male": "Fredrick",
  "female": "Madeleine",
  "surname": "Wright",
  "nickname": "King/Queen"
 },
 {
  "roll": 35,
  "male": "Willem",
  "female": "Anastasia",
  "surname": "Smith",
  "nickname": "Bow-legged"
 },
 {
  "roll": 36,
  "male": "Nicholas",
  "female": "Emma",
  "surname": "Wilson",
  "nickname": "Fish"
 },
 {
  "roll": 41,
  "male": "Jerry",
  "female": "Mary",
  "surname": "Bernard",
  "nickname": "Whale"
 },
 {
  "roll": 42,
  "male": "Edward",
  "female": "Francisca",
  "surname": "Roberts",
  "nickname": "Bones"
 },
 {
  "roll": 43,
  "male": "Alvaro",
  "female": "Ana",
  "surname": "White",
  "nickname": "Squid"
 },
 {
  "roll": 44,
  "male": "Gaspar",
  "female": "Agnes",
  "surname": "Jean",
  "nickname": "Scurvy"
 },
 {
  "roll": 45,
  "male": "Francisco",
  "female": "Marie",
  "surname": "Santiago",
  "nickname": "Bilge"
 },
 {
  "roll": 46,
  "male": "Johan",
  "female": "Eleanor",
  "surname": "Morel",
  "nickname": "Shark"
 },
 {
  "roll": 51,
  "male": "Carlos",
  "female": "Anne",
  "surname": "Rodríguez",
  "nickname": "Heart"
 },
 {
  "roll": 52,
  "male": "Francis",
  "female": "Henrietta",
  "surname": "Garcia",
  "nickname": "The Bride/Groom"
 },
 {
  "roll": 53,
  "male": "Jacques",
  "female": "Alice",
  "surname": "Robinson",
  "nickname": "Black"
 },
 {
  "roll": 54,
  "male": "Jack",
  "female": "Margaret",
  "surname": "López",
  "nickname": "White"
 },
 {
  "roll": 55,
  "male": "François",
  "female": "Jeannette",
  "surname": "Baker",
  "nickname": "Death"
 },
 {
  "roll": 56,
  "male": "Silas",
  "female": "Camela",
  "surname": "Black",
  "nickname": "Dark"
 },
 {
  "roll": 61,
  "male": "Thomas",
  "female": "Catherine",
  "surname": "Bonnet",
  "nickname": "Devil"
 },
 {
  "roll": 62,
  "male": "Jacob",
  "female": "Ursula",
  "surname": "Walker",
  "nickname": "Knife"
 },
 {
  "roll": 63,
  "male": "Juan",
  "female": "Anette",
  "surname": "Martin",
  "nickname": "Claw"
 },
 {
  "roll": 64,
  "male": "Philippe",
  "female": "Gabriel",
  "surname": "Jackson",
  "nickname": "Rat"
 },
 {
  "roll": 65,
  "male": "Jean",
  "female": "Esme",
  "surname": "Diaz",
  "nickname": "Green"
 },
 {
  "roll": 66,
  "male": "William/Billy",
  "female": "Marion",
  "surname": "Taylor",
  "nickname": "Planktooth"
 }
];

export const PB_NAMES_D12: PbTable = {
 "id": "namesD12",
 "name": "What's in a Name?",
 "die": "d12",
 "page": 2,
 "source": "Core Rules",
 "note": "Quick names: roll d12 on any column.",
 "columns": [
  {
   "die": "d12",
   "name": "Name",
   "values": [
    "Ed(mund)",
    "Roger(s)",
    "Jack",
    "David",
    "Pete(r)",
    "Angelica",
    "Sam(uel)",
    "Morgan",
    "Diego",
    "Ed(ward)",
    "Isabel(la)",
    "Charles"
   ]
  },
  {
   "die": "d12",
   "name": "Name",
   "values": [
    "James",
    "Chris(topher)",
    "Robert(s)",
    "Francois",
    "Juan",
    "John(athan)",
    "Butch(er)",
    "(Old) Ben",
    "Will(iam)",
    "Louis",
    "Jean",
    "Stede"
   ]
  },
  {
   "die": "d12",
   "name": "Name",
   "values": [
    "Meathook",
    "Jose",
    "Fernando",
    "Henry",
    "Mary",
    "Anne",
    "Philip",
    "Scraggs",
    "Eliza(beth)",
    "Hector",
    "Genny",
    "Thom(as)"
   ]
  }
 ],
 "rows": [
  {
   "roll": 1,
   "text": "Ed(mund) / James / Meathook"
  },
  {
   "roll": 2,
   "text": "Roger(s) / Chris(topher) / Jose"
  },
  {
   "roll": 3,
   "text": "Jack / Robert(s) / Fernando"
  },
  {
   "roll": 4,
   "text": "David / Francois / Henry"
  },
  {
   "roll": 5,
   "text": "Pete(r) / Juan / Mary"
  },
  {
   "roll": 6,
   "text": "Angelica / John(athan) / Anne"
  },
  {
   "roll": 7,
   "text": "Sam(uel) / Butch(er) / Philip"
  },
  {
   "roll": 8,
   "text": "Morgan / (Old) Ben / Scraggs"
  },
  {
   "roll": 9,
   "text": "Diego / Will(iam) / Eliza(beth)"
  },
  {
   "roll": 10,
   "text": "Ed(ward) / Louis / Hector"
  },
  {
   "roll": 11,
   "text": "Isabel(la) / Jean / Genny"
  },
  {
   "roll": 12,
   "text": "Charles / Stede / Thom(as)"
  }
 ]
};

export const PB_NAVAL_RULES: PbNavalRules = {
 "page": 73,
 "crew": "Ships without enough crew can take only one crew action, however many PCs are aboard. Ships can carry double their max crew for short trips (less than a day).",
 "range": {
  "hexes": 12,
  "text": "Standard range of fire is 12 hexes. Broadside cannons fire only at a 45° angle from the ship's side; small arms (muskets, swivel guns) can always fire."
 },
 "scaling": {
  "ratio": 5,
  "text": "Ship HP and damage aren't the same as PC HP and damage: convert at 1:5. A 20 HP ship has 100 HP against a PC's musket; a d8 cannon deals d8 × 5 to a skeleton."
 },
 "round": {
  "seconds": 30,
  "text": "Ship combat rounds are flexible but typically about 30 seconds. PCs still take only 1 action each round."
 },
 "movement": {
  "hexInches": 1,
  "hexFeet": 50,
  "text": "Play on a hex grid (1\" ≈ 50 feet). A ship can rotate twice during each move (60°, one hex face), only once per hex, at any point along its path. Ships must move at least 1 hex each turn unless in close combat, ramming, anchored or In Irons.",
  "rotationsPerMove": 2,
  "minMove": 1
 },
 "initiative": {
  "roll": "d6 + ship AGILITY",
  "rerollEachRound": true,
  "tiesTo": "PC ships",
  "text": "Every round each ship rolls d6 + ship AGILITY; highest goes first and PC ships win ties."
 },
 "turnOrder": [
  {
   "step": 0,
   "text": "Check point of sail (if using the wind rules)."
  },
  {
   "step": 1,
   "text": "The Captain uses their action to move the ship up to its speed in hexes."
  },
  {
   "step": 2,
   "text": "Non-captain PCs take 1 crew action each."
  },
  {
   "step": 3,
   "text": "A ship that hasn't taken at least 2 crew actions can take up to 2 crew actions total."
  },
  {
   "step": 4,
   "text": "Switch to close combat when appropriate. Ships in close combat count as anchored and can't take crew actions."
  }
 ],
 "crewActionRules": "Each crew action can be chosen only once per ship's turn. Every ship gets at least 2 actions (more with PCs aboard). PCs taking crew actions add the ability in parentheses. Larger ships may make some attack actions several times: if one PC takes the action they roll all of the ship's attacks but add their PRESENCE only to the first; if several PCs take it, each adds PRESENCE to one roll (one PC per attack roll).",
 "critical": {
  "natural": 20,
  "text": "Double damage, then the target's hull is reduced one tier (e.g. −d6 > −d4). Hulls can't be repaired at sea — see Shipwright.",
  "damageMultiplier": 2,
  "hullTier": -1
 },
 "fumble": {
  "natural": 1,
  "text": "Cannons or small arms misfire: weapons that have misfired must be repaired before they can fire again. The GM decides the outcome for other crew actions.",
  "misfire": true
 },
 "sinking": {
  "text": "At zero HP or less a ship is derelict: speed drops to zero and it can't take crew actions in combat. When a derelict takes more damage, roll on the Derelict table (d8)."
 },
 "morale": {
  "roll": "2d6 + current crew skill",
  "threshold": 4,
  "failure": "surrender or mutiny",
  "text": "At the GM's discretion, ships under attack or in low spirits test morale: roll 2d6 + current CREW SKILL; under 4 means surrender or mutiny.",
  "triggers": [
   "another ship raises the black",
   "shots are fired",
   "taking a crit",
   "falling below 1/3 HP",
   "being boarded",
   "the rum runs out"
  ]
 },
 "cargo": "Ships have abstract cargo slots; the value of cargo is up to the GM.",
 "repairing": "At sea a ship can only be repaired to 50% HP (using the Repair crew action). The rest must be repaired while moored or by a shipwright.",
 "careening": {
  "everyMonths": 3,
  "speedPenaltyPerMonth": -1,
  "text": "Ships need careening every 3 months to remove barnacles and shipworm and repair leaks; they are −1 speed for each month over 3 without it."
 },
 "payingCrew": "Pirates don't pay wages: they divide the plunder equally, though the captain and officers often take larger shares."
};

export const PB_NPC_MOTIVATION: PbTable = {
 "id": "npcMotivation",
 "name": "NPC Motivation",
 "die": "d20",
 "page": 3,
 "source": "Core Rules",
 "rows": [
  {
   "roll": 1,
   "text": "escape"
  },
  {
   "roll": 2,
   "text": "happiness"
  },
  {
   "roll": 3,
   "text": "recovery"
  },
  {
   "roll": 4,
   "text": "pleasure"
  },
  {
   "roll": 5,
   "text": "exploration"
  },
  {
   "roll": 6,
   "text": "love or sex"
  },
  {
   "roll": 7,
   "text": "revenge"
  },
  {
   "roll": 8,
   "text": "fear"
  },
  {
   "roll": 9,
   "text": "wealth"
  },
  {
   "roll": 10,
   "text": "hunger"
  },
  {
   "roll": 11,
   "text": "reputation"
  },
  {
   "roll": 12,
   "text": "aggression"
  },
  {
   "roll": 13,
   "text": "adventure"
  },
  {
   "roll": 14,
   "text": "guilt"
  },
  {
   "roll": 15,
   "text": "leisure"
  },
  {
   "roll": 16,
   "text": "protection"
  },
  {
   "roll": 17,
   "text": "intoxication"
  },
  {
   "roll": 18,
   "text": "family"
  },
  {
   "roll": 19,
   "text": "religion"
  },
  {
   "roll": 20,
   "text": "occult"
  }
 ]
};

export const PB_PETS: PbNamedRoll[] = [
 {
  "roll": 1,
  "name": "Snake"
 },
 {
  "roll": 2,
  "name": "Rat"
 },
 {
  "roll": 3,
  "name": "Lizard"
 },
 {
  "roll": 4,
  "name": "Monkey"
 },
 {
  "roll": 5,
  "name": "Parrot"
 },
 {
  "roll": 6,
  "name": "Cat"
 },
 {
  "roll": 7,
  "name": "Dog"
 },
 {
  "roll": 8,
  "name": "Hawk"
 },
 {
  "roll": 9,
  "name": "Hermit Crab"
 },
 {
  "roll": 10,
  "name": "Fish in a Jar"
 }
];

export const PB_PIRATE_GEN: PbPirateGen = {
 "page": 124,
 "source": "Core Rules",
 "note": "Roll 3d12 and read Tables A to C (save the dice): \"A [A] with [B] wielding a [C]\". The greatest die is its Morale; the lowest die +2 is its HP (double it for a mighty pirate). Whichever table rolled highest sets its armor: A no armor, B −d2, C −d4. Then roll d66 ×4 on the name table; they carry the highest result in silver.",
 "procedure": {
  "dice": "3d12",
  "morale": "highest die",
  "hp": "lowest die + 2",
  "mightyHp": "× 2",
  "armorByHighestTable": {
   "A": null,
   "B": {
    "name": "Armor",
    "die": "d2",
    "tier": 1
   },
   "C": {
    "name": "Armor",
    "die": "d4",
    "tier": 2
   }
  },
  "silver": "highest name d66 result"
 },
 "tableA": {
  "id": "pirateA",
  "name": "Table A — A…",
  "die": "d12",
  "page": 124,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "rugged individual"
   },
   {
    "roll": 2,
    "text": "shady vagabond"
   },
   {
    "roll": 3,
    "text": "scurvy gutter worm"
   },
   {
    "roll": 4,
    "text": "famous captain"
   },
   {
    "roll": 5,
    "text": "escaped prisoner"
   },
   {
    "roll": 6,
    "text": "wanted cutthroat"
   },
   {
    "roll": 7,
    "text": "notorious privateer"
   },
   {
    "roll": 8,
    "text": "cloaked figure"
   },
   {
    "roll": 9,
    "text": "rum-drunk goon"
   },
   {
    "roll": 10,
    "text": "horrific wretch"
   },
   {
    "roll": 11,
    "text": "cocky explorer"
   },
   {
    "roll": 12,
    "text": "dread pirate lord"
   }
  ]
 },
 "tableB": {
  "id": "pirateB",
  "name": "Table B — with…",
  "die": "d12",
  "page": 124,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "horrible breath"
   },
   {
    "roll": 2,
    "text": "unmatched beauty"
   },
   {
    "roll": 3,
    "text": "a hook for a hand"
   },
   {
    "roll": 4,
    "text": "a fancy hat"
   },
   {
    "roll": 5,
    "text": "a makeshift peg leg"
   },
   {
    "roll": 6,
    "text": "barnacle covered skin"
   },
   {
    "roll": 7,
    "text": "calico clothing"
   },
   {
    "roll": 8,
    "text": "filthy rags"
   },
   {
    "roll": 9,
    "text": "weather-worn doublet"
   },
   {
    "roll": 10,
    "text": "natty hair"
   },
   {
    "roll": 11,
    "text": "a pet bird"
   },
   {
    "roll": 12,
    "text": "bloody bandages"
   }
  ]
 },
 "tableC": {
  "id": "pirateC",
  "name": "Table C — wielding a…",
  "die": "d12",
  "page": 124,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "pair of fists [d2]",
    "damage": "d2"
   },
   {
    "roll": 2,
    "text": "broken bottle [d2]",
    "damage": "d2"
   },
   {
    "roll": 3,
    "text": "bullwhip [d4]",
    "damage": "d4"
   },
   {
    "roll": 4,
    "text": "hook [d4]",
    "damage": "d4"
   },
   {
    "roll": 5,
    "text": "rusty knife [d4]",
    "damage": "d4"
   },
   {
    "roll": 6,
    "text": "evil cutlass [d6]",
    "damage": "d6"
   },
   {
    "roll": 7,
    "text": "ornate scimitar [d6]",
    "damage": "d6"
   },
   {
    "roll": 8,
    "text": "officer's rapier [d8]",
    "damage": "d8"
   },
   {
    "roll": 9,
    "text": "ancient crossbow [d8]",
    "damage": "d8"
   },
   {
    "roll": 10,
    "text": "flintlock pistol [2d4]",
    "damage": "2d4",
    "blackPowder": true
   },
   {
    "roll": 11,
    "text": "musket [2d6]",
    "damage": "2d6",
    "blackPowder": true
   },
   {
    "roll": 12,
    "text": "blunderbuss [d4/d10]",
    "damage": "d4",
    "closeDamage": "d10",
    "blackPowder": true
   }
  ]
 },
 "names": "names"
};

export const PB_POINT_OF_SAIL: PbPointOfSail[] = [
 {
  "id": "with",
  "name": "With the Wind",
  "relativeEdges": [
   3,
   4,
   5
  ],
  "speed": "full",
  "text": "Full speed."
 },
 {
  "id": "close",
  "name": "Close to the Wind",
  "relativeEdges": [
   2,
   6
  ],
  "speed": "half",
  "min": 1,
  "text": "½ speed (round down, minimum 1)."
 },
 {
  "id": "irons",
  "name": "In Irons",
  "relativeEdges": [
   1
  ],
  "speed": 0,
  "rotations": 1,
  "text": "Speed 0; can only rotate once (60°)."
 }
];

export const PB_PRAYERS: PbPrayer[] = [
 {
  "id": "heal",
  "roll": 1,
  "numeral": "I",
  "name": "Heal",
  "text": "Heal yourself or another for d8 HP.",
  "heal": "d8"
 },
 {
  "id": "curse",
  "roll": 2,
  "numeral": "II",
  "name": "Curse",
  "test": {
   "ability": "SPIRIT",
   "dr": 10
  },
  "damage": "d8 + SPIRIT",
  "text": "Test SPIRIT DR10 to deal d8 + SPIRIT damage to an enemy you cannot see; DR8 if it's already been hurt this fight."
 },
 {
  "id": "death-ward",
  "roll": 3,
  "numeral": "III",
  "name": "Death Ward",
  "test": {
   "ability": "SPIRIT",
   "dr": 10
  },
  "text": "Touch the corpse of someone who just died and test SPIRIT DR10: they return to life with 1 HP. Crit: full HP. Fumble: they come back as a zombie and attack you."
 },
 {
  "id": "control-weather",
  "roll": 4,
  "numeral": "IV",
  "name": "Control Weather",
  "test": {
   "ability": "SPIRIT",
   "dr": 10
  },
  "text": "Test SPIRIT DR10 to change the wind's direction; succeed by 5 or more and you can also conjure or repel precipitation. Crit: lightning strikes your enemy for d12. Fumble: lightning strikes you for d6."
 },
 {
  "id": "blessed-guidance",
  "roll": 5,
  "numeral": "V",
  "name": "Blessed Guidance",
  "noAction": true,
  "bonus": "d4",
  "text": "Add d4 to any roll you or another player makes. Usable any time, even after the roll, and doesn't take your action."
 },
 {
  "id": "holy-protection",
  "roll": 6,
  "numeral": "VI",
  "name": "Holy Protection",
  "noAction": true,
  "dr": -4,
  "text": "You or an ally gets −4 DR to defend against one attack. Usable any time, even after the roll, and doesn't take your action."
 },
 {
  "id": "divine-light",
  "roll": 7,
  "numeral": "VII",
  "name": "Divine Light",
  "duration": "d6 × 10 minutes",
  "text": "Bright light radiates from you for up to d6 × 10 minutes. Enemies that see it are −2 DR to defend against."
 },
 {
  "id": "silence",
  "roll": 8,
  "numeral": "VIII",
  "name": "Silence",
  "duration": "2d6 × 10 minutes",
  "text": "For 2d6 × 10 minutes everything within 25' of you makes no sound. It ends only when the time expires."
 },
 {
  "id": "sanctuary",
  "roll": 9,
  "numeral": "IX",
  "name": "Sanctuary",
  "heal": "d4",
  "text": "All your brethren in sight heal d4 HP."
 },
 {
  "id": "commune",
  "roll": 10,
  "numeral": "X",
  "name": "Commune",
  "test": {
   "ability": "SPIRIT",
   "dr": 8
  },
  "text": "Test SPIRIT DR8 to ask your deity a single yes-or-no question. The answer may be \"unclear\", or there may be none."
 }
];

export const PB_RELICS: PbRelic[] = [
 {
  "id": "cross-of-the-paragon",
  "roll": 1,
  "name": "Cross of the Paragon",
  "text": "One ally gets +1 to attack and +1 to damage for d6 turns.",
  "duration": "d6 turns",
  "target": "ally",
  "bonus": {
   "attack": 1,
   "damage": 1
  }
 },
 {
  "id": "conch-shell-from-the-abyss",
  "roll": 2,
  "name": "Conch Shell from the Abyss",
  "text": "Ask a nearby corpse (or any creature that died at sea within 100 miles) one question."
 },
 {
  "id": "map-inked-in-ectoplasm",
  "roll": 3,
  "name": "Map Inked in Ectoplasm",
  "text": "Learn the location of all traps and secret doors within 30' for d4+SPIRIT rounds.",
  "duration": "d4+SPIRIT rounds"
 },
 {
  "id": "will-o-the-wisp-lantern",
  "roll": 4,
  "name": "Will-o'-the-Wisp Lantern",
  "text": "Emit 15' of light or darkness for d6+SPIRIT rounds.",
  "duration": "d6+SPIRIT rounds"
 },
 {
  "id": "pages-from-the-necronomicon",
  "roll": 5,
  "name": "Pages from the Necronomicon",
  "text": "All creatures that can hear your voice test DR14 or lose d4+SPIRIT HP (ignore armor).",
  "damage": "d4+SPIRIT",
  "ignoresArmor": true,
  "targetTest": {
   "dr": 14
  },
  "area": "all who hear"
 },
 {
  "id": "rune-encrusted-flintlock-pistol",
  "roll": 6,
  "name": "Rune Encrusted Flintlock Pistol",
  "text": "One creature you see loses d6+SPIRIT HP (ignore armor). Takes 1 action to reload.",
  "damage": "d6+SPIRIT",
  "ignoresArmor": true,
  "reload": 1
 },
 {
  "id": "jade-die",
  "roll": 7,
  "name": "Jade Die",
  "text": "Roll a die. Odd: you gain d8 temporary HP. Even: choose a creature — it gets +d8 on its next damage roll.",
  "tempHp": "d8"
 },
 {
  "id": "undead-bird",
  "roll": 8,
  "name": "Undead Bird",
  "text": "It can speak with animals (dead or alive) for d6+SPIRIT rounds.",
  "duration": "d6+SPIRIT rounds"
 },
 {
  "id": "mermaid-scales",
  "roll": 9,
  "name": "Mermaid Scales",
  "text": "Eat a scale: breathe underwater for d4 hours.",
  "duration": "d4 hours",
  "consumable": true
 },
 {
  "id": "charons-obol",
  "roll": 10,
  "name": "Charon's Obol",
  "text": "If you are killed, return to life the next round with 1 HP. Disappears after one use.",
  "singleUse": true,
  "cheatDeath": {
   "hp": 1
  }
 },
 {
  "id": "cup-of-the-carpenter",
  "roll": 11,
  "name": "Cup of the Carpenter",
  "text": "Choose a creature to regain d6+SPIRIT HP.",
  "heal": "d6+SPIRIT"
 },
 {
  "id": "heart-of-the-sea",
  "roll": 12,
  "name": "Heart of the Sea",
  "text": "Create or destroy 15 gallons of water or 30 cubic feet of fog."
 },
 {
  "id": "necklace-of-eyeballs",
  "roll": 13,
  "name": "Necklace of Eyeballs",
  "text": "Become invisible for d6+SPIRIT rounds or until you attack or take damage. Attack and defend with DR6.",
  "duration": "d6+SPIRIT rounds",
  "attackDR": 6,
  "defenseDR": 6
 },
 {
  "id": "crown-of-the-sunken-lord",
  "roll": 14,
  "name": "Crown of the Sunken Lord",
  "text": "A water shield surrounds you: −d2 protection for d2+SPIRIT rounds (in addition to armor).",
  "duration": "d2+SPIRIT rounds",
  "extraArmor": "d2"
 },
 {
  "id": "crystalline-skull",
  "roll": 15,
  "name": "Crystalline Skull",
  "text": "The skull can hear and repeat the thoughts of a nearby creature for d6+SPIRIT minutes.",
  "duration": "d6+SPIRIT minutes"
 },
 {
  "id": "codex-tablet",
  "roll": 16,
  "name": "Codex Tablet",
  "text": "Read and understand any language, glyphs or runes for 1+SPIRIT rounds.",
  "duration": "1+SPIRIT rounds"
 },
 {
  "id": "skeleton-key",
  "roll": 17,
  "name": "Skeleton Key",
  "text": "Open any door or lock. Crumbles after 1 use.",
  "singleUse": true
 },
 {
  "id": "mummified-monkey-head",
  "roll": 18,
  "name": "Mummified Monkey Head",
  "text": "The head speaks: 1 creature tests SPIRIT DR12 or must obey a 1-word command.",
  "targetTest": {
   "ability": "SPIRIT",
   "dr": 12
  }
 },
 {
  "id": "great-old-one-figurine",
  "roll": 19,
  "name": "Great Old One Figurine",
  "text": "One human is terrorized for d4 rounds unless they succeed at a PRESENCE DR14 test. They can test each round.",
  "duration": "d4 rounds",
  "targetTest": {
   "ability": "PRESENCE",
   "dr": 14
  }
 },
 {
  "id": "broken-compass",
  "roll": 20,
  "name": "Broken Compass",
  "text": "The compass points toward an object you know of for 1+SPIRIT rounds.",
  "duration": "1+SPIRIT rounds"
 }
];

export const PB_RITUALS: PbRitual[] = [
 {
  "id": "call-of-the-sea",
  "roll": 1,
  "numeral": "I",
  "name": "Call of the Sea",
  "text": "d6 creatures can breathe underwater and swim 40' a round for d4+SPIRIT hours.",
  "targets": "d6",
  "duration": "d4+SPIRIT hours"
 },
 {
  "id": "curse-of-the-drowned",
  "roll": 2,
  "numeral": "II",
  "name": "Curse of the Drowned",
  "text": "For d6 rounds a creature gets +4 to all DRs and is DR −4 to defend against.",
  "duration": "d6 rounds"
 },
 {
  "id": "dark-delusions",
  "roll": 3,
  "numeral": "III",
  "name": "Dark Delusions",
  "text": "An illusion or vision of your design appears in the mind of any creatures you can see for d4+SPIRIT minutes.",
  "duration": "d4+SPIRIT minutes"
 },
 {
  "id": "obfuscate-time",
  "roll": 4,
  "numeral": "IV",
  "name": "Obfuscate Time",
  "text": "d2 creatures recover 2d10+SPIRIT HP, but age 2d10 months.",
  "targets": "d2",
  "heal": "2d10+SPIRIT"
 },
 {
  "id": "eldritch-tentacles",
  "roll": 5,
  "numeral": "V",
  "name": "Eldritch Tentacles",
  "text": "Tentacles appear and attack up to d6 creatures of your choice, dealing d6 damage each.",
  "targets": "d6",
  "damage": "d6"
 },
 {
  "id": "heart-hex",
  "roll": 6,
  "numeral": "VI",
  "name": "Heart Hex",
  "text": "Raise one creature's reaction by one level (pg. 31). If it is already friendly, it falls in love with a creature of your choice for d4+SPIRIT days.",
  "duration": "d4+SPIRIT days"
 },
 {
  "id": "thalassomancy",
  "roll": 7,
  "numeral": "VII",
  "name": "Thalassomancy",
  "text": "The lungs of d2+SPIRIT creatures fill with sea water: they suffocate for d4 rounds, losing d4 HP each round.",
  "targets": "d2+SPIRIT",
  "damage": "d4 per round for d4 rounds"
 },
 {
  "id": "light-of-a-thousand-stars",
  "roll": 8,
  "numeral": "VIII",
  "name": "Light of a Thousand Stars",
  "text": "30' of light radiates from an object for 2d12 hours and can't be extinguished. All attacks are −4 DR to hit / +4 to defend.",
  "duration": "2d12 hours"
 },
 {
  "id": "return-from-the-locker",
  "roll": 9,
  "numeral": "IX",
  "name": "Return from the Locker",
  "text": "A recently killed creature returns to life with 1 HP, its lungs expelling black ichor and bilge water."
 },
 {
  "id": "mind-manacles",
  "roll": 10,
  "numeral": "X",
  "name": "Mind Manacles",
  "text": "One creature you can see must obey your commands for d2+SPIRIT rounds.",
  "duration": "d2+SPIRIT rounds"
 },
 {
  "id": "mists-of-confusion",
  "roll": 11,
  "numeral": "XI",
  "name": "Mists of Confusion",
  "text": "d4+SPIRIT creatures each roll a new reaction (pg. 31).",
  "targets": "d4+SPIRIT"
 },
 {
  "id": "divination",
  "roll": 12,
  "numeral": "XII",
  "name": "Divination",
  "text": "Ask the spirits or gods 3 yes-or-no questions."
 },
 {
  "id": "phantasmal-fauna",
  "roll": 13,
  "numeral": "XIII",
  "name": "Phantasmal Fauna",
  "text": "Summon a ghostly hound or shark that obeys your commands and dissipates at sunset. HP 5, Morale –, ghostly form −d2, bite d6.",
  "summon": "phantasmal-fauna"
 },
 {
  "id": "release-the-kraken",
  "roll": 14,
  "numeral": "XIV",
  "name": "Release the Kraken",
  "text": "The Kraken appears in nearby waters."
 },
 {
  "id": "reopen-the-grave",
  "roll": 15,
  "numeral": "XV",
  "name": "Reopen the Grave",
  "text": "Summon d2+SPIRIT zombies or skeletons under your control.",
  "targets": "d2+SPIRIT"
 },
 {
  "id": "mermaids-kiss",
  "roll": 16,
  "numeral": "XVI",
  "name": "Mermaid's Kiss",
  "text": "A creature gains +1 to STRENGTH, AGILITY and TOUGHNESS for d4 days.",
  "duration": "d4 days",
  "abilityBonus": {
   "STRENGTH": 1,
   "AGILITY": 1,
   "TOUGHNESS": 1
  }
 },
 {
  "id": "spiritual-ward",
  "roll": 17,
  "numeral": "XVII",
  "name": "Spiritual Ward",
  "text": "One creature gains −d4 protection for d2 days, in addition to armor.",
  "duration": "d2 days",
  "extraArmor": "d4"
 },
 {
  "id": "summon-the-ferryman",
  "roll": 18,
  "numeral": "XVIII",
  "name": "Summon the Ferryman",
  "text": "A human of your choice loses 3d8 HP. If you fail the cast, you or an ally loses the HP instead (don't roll a Mishap).",
  "damage": "3d8",
  "failureOverride": "you or an ally loses the HP instead; no mishap"
 },
 {
  "id": "the-black-spot",
  "roll": 19,
  "numeral": "XIX",
  "name": "The Black Spot",
  "text": "Name a human you have met. They must test DR12 or die within d8 days.",
  "targetTest": {
   "dr": 12
  }
 },
 {
  "id": "weathercraft",
  "roll": 20,
  "numeral": "XX",
  "name": "Weathercraft",
  "text": "For the next d4 hours the weather obeys you: change the wind's direction and speed (all ships get ±1 speed) and start or stop rain, fog or thunderstorms.",
  "duration": "d4 hours"
 }
];

export const PB_RULES: PbRules = {
 "abilities": {
  "page": 28,
  "min": -3,
  "max": 6,
  "generation": "3d6",
  "landlubberGeneration": "4d6 drop lowest",
  "text": "Roll 3d6 for each ability and keep only the modifier from the table; the sum is then discarded. Class modifiers are applied afterwards. Landlubbers (no class) may roll 4d6 and drop the lowest die instead. Abilities can never go below −3 or above +6."
 },
 "tests": {
  "page": 28,
  "formula": "d20 ± ability ≥ DR",
  "standardDR": 12,
  "text": "Roll d20 and add or subtract the relevant ability. Equal to or higher than the Difficulty Rating (DR) succeeds. Creatures don't have abilities: they roll a plain d20 against the DR.",
  "examples": [
   {
    "text": "Pick the jail lock",
    "dr": 14
   },
   {
    "text": "Climb the rigging",
    "dr": 12
   },
   {
    "text": "Lift the broken mast",
    "dr": 16
   }
  ]
 },
 "holdingBreath": {
  "page": 28,
  "ability": "TOUGHNESS",
  "minutes": "1 + TOUGHNESS",
  "minMinutes": 1,
  "duress": "half (minimum 30 seconds)",
  "test": {
   "ability": "TOUGHNESS",
   "dr": 12,
   "drIncreasePerRound": 2,
   "failure": "lose 1 HP"
  },
  "text": "You can hold your breath for 1 + TOUGHNESS minutes (at least 1 minute), halved under physical duress such as fast swimming, combat or lifting (at least 30 seconds). After that, test TOUGHNESS DR12 every round — the DR rises by 2 each round — or lose 1 HP. At 0 HP you drown."
 },
 "carrying": {
  "page": 29,
  "normalItems": "8 + STRENGTH",
  "overloadPenalty": {
   "dr": 2,
   "applies": [
    "STRENGTH",
    "AGILITY"
   ]
  },
  "max": "(8 + STRENGTH) × 2",
  "excluded": [
   "hats",
   "clothing"
  ],
  "normalSized": [
   "cargo nets",
   "muskets",
   "shovels"
  ],
  "notNormalSized": [
   "cannons",
   "sea chests",
   "oars",
   "corpses"
  ],
  "text": "You can carry 8 + STRENGTH normal-sized items without trouble. Beyond that, STRENGTH and AGILITY tests are DR +2. You can never carry more than double (8 + STRENGTH). Hats and clothing don't count."
 },
 "violence": {
  "page": 30,
  "text": "Players roll to attack and to defend; enemies never roll dice in combat. Enemies attack once per round unless noted otherwise.",
  "initiative": {
   "die": "d6",
   "rows": [
    {
     "roll": [
      1,
      3
     ],
     "text": "Enemies go first"
    },
    {
     "roll": [
      4,
      6
     ],
     "text": "PCs go first"
    }
   ],
   "individual": "d6 + AGILITY"
  },
  "attacks": [
   {
    "id": "melee",
    "name": "Melee attack",
    "ability": "STRENGTH",
    "dr": 12
   },
   {
    "id": "ranged",
    "name": "Ranged attack",
    "ability": "PRESENCE",
    "dr": 12
   },
   {
    "id": "defense",
    "name": "Defense",
    "ability": "AGILITY",
    "dr": 12,
    "failure": "The enemy hits you: take its damage minus your armor die."
   }
  ],
  "critical": {
   "natural": 20,
   "attack": "Deal double damage, then the target's armor/protection is reduced one tier.",
   "defense": "The PC makes an immediate free attack.",
   "effects": {
    "attack": {
     "damageMultiplier": 2,
     "targetArmorTier": -1
    },
    "defense": {
     "freeAttack": true
    }
   }
  },
  "fumble": {
   "natural": 1,
   "attack": "The weapon breaks or is lost.",
   "defense": "The PC takes double damage, then their armor is reduced one tier.",
   "blackPowder": "Fumbling an attack with a black powder weapon: roll on the Misfire table instead.",
   "effects": {
    "attack": {
     "weaponLost": true
    },
    "defense": {
     "damageMultiplier": 2,
     "armorTier": -1
    }
   }
  },
  "misfire": {
   "die": "d6",
   "rows": [
    {
     "roll": [
      1,
      2
     ],
     "name": "Backfire",
     "text": "Take d2 damage.",
     "damage": "d2"
    },
    {
     "roll": [
      3,
      4
     ],
     "name": "Broken",
     "text": "The weapon is broken.",
     "weaponBroken": true
    },
    {
     "roll": [
      5,
      6
     ],
     "name": "Both",
     "text": "Take d2 damage and the weapon is broken.",
     "damage": "d2",
     "weaponBroken": true
    }
   ]
  },
  "rounds": {
   "seconds": 6,
   "text": "A round is about 6 seconds: enough to attack, run across a ship's deck, use a relic or complete a ritual."
  },
  "movement": {
   "feet": 30,
   "squares": 6,
   "halved": [
    "difficult terrain",
    "swimming"
   ],
   "text": "Most creatures move 30' (six 5-foot squares) a round; half speed in difficult terrain or while swimming."
  },
  "reload": {
   "actions": 2,
   "buccaneer": 1,
   "text": "Black powder guns take 2 actions (rounds) to reload — Buccaneers reload in 1."
  }
 },
 "armor": {
  "page": 30,
  "tiers": [
   {
    "tier": 0,
    "die": null,
    "name": "None"
   },
   {
    "tier": 1,
    "die": "d2",
    "name": "Light"
   },
   {
    "tier": 2,
    "die": "d4",
    "name": "Medium",
    "agilityDR": 2,
    "defenseDR": 2
   },
   {
    "tier": 3,
    "die": "d6",
    "name": "Heavy",
    "agilityDR": 4,
    "defenseDR": 2
   }
  ],
  "blackPowderIgnoresArmor": true,
  "text": "When you take damage, roll your armor die and subtract it from the damage. Black powder weapons ignore armor. Armor damaged by a fumble or critical drops a tier but keeps its STRENGTH/AGILITY test penalties. Armor reduced below tier 1 is ruined and can't be repaired. Armor can never be repaired above its original tier.",
  "magic": "Ancient relics and arcane rituals almost never work while wearing tier 2 or 3 armor or wielding cold iron (Zealots and Sorcerers may use them in tier 2)."
 },
 "rest": {
  "page": 31,
  "short": {
   "duration": "about 10 minutes",
   "heal": "d4"
  },
  "long": {
   "duration": "overnight",
   "heal": "d8"
  },
  "starvation": {
   "heal": 0,
   "afterDays": 2,
   "lossPerDay": "d4",
   "text": "Without food or drink you restore 0 HP; after two days of starving you lose d4 HP per day."
  },
  "infection": {
   "lossPerMorning": "d6",
   "conditions": [
    "infected",
    "sick",
    "bleeding",
    "poisoned"
   ],
   "text": "Infected, sick, bleeding or poisoned characters lose d6 HP every morning instead of recovering."
  }
 },
 "reaction": {
  "page": 31,
  "die": "2d6",
  "text": "Roll when meeting creatures whose reaction is uncertain.",
  "rows": [
   {
    "roll": [
     2,
     3
    ],
    "text": "Bloodthirsty"
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Angered or alarmed"
   },
   {
    "roll": [
     7,
     8
    ],
    "text": "Indifferent, neutral"
   },
   {
    "roll": [
     9,
     10
    ],
    "text": "Almost friendly"
   },
   {
    "roll": [
     11,
     12
    ],
    "text": "Helpful"
   }
  ]
 },
 "morale": {
  "page": 31,
  "die": "2d6",
  "triggers": [
   "The leader is killed.",
   "Half of the group is eliminated.",
   "A single enemy has only 1/3 of its HP left."
  ],
  "text": "Most enemies won't fight to the death. Roll 2d6 when a trigger happens: a result greater than the creature's Morale means it is demoralized — roll d6: 1-3 it flees, 4-6 it surrenders. Creatures with Morale '–' never break.",
  "result": {
   "die": "d6",
   "rows": [
    {
     "roll": [
      1,
      3
     ],
     "text": "Flees"
    },
    {
     "roll": [
      4,
      6
     ],
     "text": "Surrenders"
    }
   ]
  }
 },
 "hitPoints": {
  "page": 32,
  "landlubber": "d10 ± TOUGHNESS",
  "minimumStart": 1,
  "text": "Starting HP comes from your class die ± TOUGHNESS (landlubbers d10 ± TOUGHNESS). You never start with less than 1 HP."
 },
 "broken": {
  "page": 32,
  "die": "d6",
  "text": "At exactly 0 HP you are Broken: roll d6.",
  "rows": [
   {
    "roll": 1,
    "name": "Instant death",
    "text": "Instant death.",
    "dead": true
   },
   {
    "roll": 2,
    "name": "Hemorrhage",
    "text": "Death in d2 hours unless treated. All tests are DR16 the first hour and DR18 the last hour.",
    "deathIn": "d2 hours",
    "testDR": [
     16,
     18
    ]
   },
   {
    "roll": 3,
    "name": "Brain injury",
    "text": "You wake in 1 hour with −3 to PRESENCE for d8 days.",
    "ability": {
     "PRESENCE": -3
    },
    "duration": "d8 days"
   },
   {
    "roll": 4,
    "name": "Limb or eye",
    "text": "Roll d6: 1-5 a broken or severed limb, 6 a lost eye. You can't act for d4 rounds, then become active with d4 HP.",
    "sub": {
     "die": "d6",
     "rows": [
      {
       "roll": [
        1,
        5
       ],
       "text": "Broken or severed limb"
      },
      {
       "roll": 6,
       "text": "Lost eye"
      }
     ]
    },
    "outRounds": "d4",
    "hp": "d4"
   },
   {
    "roll": 5,
    "name": "Unconscious",
    "text": "Fall unconscious for d4 rounds, then wake with 1 HP and 0 Devil's Luck.",
    "outRounds": "d4",
    "hp": 1,
    "luck": 0
   },
   {
    "roll": 6,
    "name": "Dazed",
    "text": "Fall unconscious for d2 rounds, then wake with d4 HP and d2 Devil's Luck.",
    "outRounds": "d2",
    "hp": "d4",
    "luck": "d2"
   }
  ]
 },
 "death": {
  "page": 32,
  "text": "Reduced below 0 HP you are Dead — skip Broken. Down to Davy Jones' Locker with ye! Optionally the GM may let a dead PC return as a Haunted Soul (pg. 46).",
  "hauntedSoulOption": true
 },
 "grog": {
  "page": 37,
  "test": {
   "ability": "TOUGHNESS",
   "dr": "8 + drinks in the last hour"
  },
  "heal": "d4",
  "failure": "Vomit for d2 rounds.",
  "agilityPerDrink": -1,
  "durationPerDrink": "1 hour",
  "text": "Drinking grog or rum: test TOUGHNESS DR8 + the number of drinks you've had in the last hour to heal d4 HP; on a failure you vomit for d2 rounds. Each drink also gives −1 AGILITY, lasting one hour per drink."
 },
 "devilsLuck": {
  "page": 54,
  "landlubberDie": "d2",
  "start": "Roll your class's Devil's Luck die.",
  "recharge": "After resting at least 6 hours, if (and only if) your Luck is depleted, roll your class die and regain that much Luck.",
  "rechargeRestHours": 6,
  "rechargeOnlyWhenEmpty": true,
  "uses": [
   {
    "id": "maxDamage",
    "text": "Deal maximum damage with one attack."
   },
   {
    "id": "reroll",
    "text": "Reroll any die roll."
   },
   {
    "id": "lowerDR",
    "text": "Lower one test's DR by 4.",
    "dr": -4
   },
   {
    "id": "reduceDamage",
    "text": "Lower damage dealt to you by d6 (roll when you take the damage).",
    "reduce": "d6"
   },
   {
    "id": "neutralize",
    "text": "Neutralize a Crit or a Fumble."
   }
  ],
  "variant": "Optional for large groups (5+ PCs): Devil's Luck may only be spent on yourself or a player sitting next to you."
 },
 "experience": {
  "page": 33,
  "when": "The GM decides when characters improve — e.g. after taking a prize, raiding a port, dividing the plunder, burying treasure or exploring a temple.",
  "steps": [
   {
    "id": "abilities",
    "name": "Ability changes",
    "text": "Roll d6 for every ability. A result equal to or higher than the ability raises it by 1 (max +6); lower results reduce it by 1. Abilities from −3 to +1 always rise by 1 unless the d6 shows 1, in which case they drop by 1 (never below −3)."
   },
   {
    "id": "hp",
    "name": "More HP",
    "text": "Increase maximum HP by d6. Current HP only rises by resting or healing.",
    "hpMax": "d6"
   },
   {
    "id": "feature",
    "name": "Gain a class feature",
    "text": "See your class description."
   },
   {
    "id": "amongTheDead",
    "name": "Among the dead you find",
    "text": "Roll on the Among the Dead table (d6)."
   }
  ],
  "abilityProcedure": {
   "die": "d6",
   "lowRange": [
    -3,
    1
   ],
   "lowFailOn": 1,
   "min": -3,
   "max": 6
  },
  "amongTheDead": {
   "die": "d6",
   "rows": [
    {
     "roll": [
      1,
      2
     ],
     "text": "Nothing."
    },
    {
     "roll": 3,
     "text": "A weapon (roll d10 on the starting weapon table, pg. 50).",
     "table": "startingWeapons",
     "die": "d10"
    },
    {
     "roll": 4,
     "text": "3d10 silver.",
     "silver": "3d10"
    },
    {
     "roll": 5,
     "text": "1 ancient relic (pg. 62).",
     "table": "relics"
    },
    {
     "roll": 6,
     "text": "1 arcane ritual (pg. 64).",
     "table": "rituals"
    }
   ]
  }
 },
 "relics": {
  "page": 62,
  "action": true,
  "afterUse": {
   "ability": "SPIRIT",
   "dr": 12
  },
  "failure": "Stunned for the next round, and that relic can't be used again until the next dawn.",
  "fumble": "The relic is permanently destroyed or depleted, and you lose d2 HP.",
  "crit": "GM decides the effect, if any.",
  "text": "Use your action to activate a relic you carry. After using it, test SPIRIT DR12. Relics almost never work while wearing tier 2 or 3 armor or wielding cold iron."
 },
 "rituals": {
  "page": 64,
  "castsPerDay": "d4 + SPIRIT",
  "reset": "dawn",
  "test": {
   "ability": "SPIRIT",
   "dr": 12
  },
  "success": "Subtract 1 from your daily total.",
  "failure": "Roll on Mystical Mishaps (d20); that ritual can't be used again until dawn.",
  "critOrFumble": "GM decides the effect, if any.",
  "text": "Every dawn roll d4 + SPIRIT for how many rituals you can cast that day. Use your action (or longer) and test SPIRIT DR12. Rituals almost always fail if the caster carries anything made of cold iron or touches metal. Brutes can't use rituals.",
  "modifiers": [
   {
    "id": "duress",
    "text": "Casting under duress",
    "dr": 2,
    "orMore": true
   },
   {
    "id": "minute",
    "text": "Take 1 minute to cast",
    "dr": -2
   },
   {
    "id": "hour",
    "text": "Take 1 hour to cast",
    "dr": -4
   },
   {
    "id": "together",
    "text": "Several casters working together: roll twice, keep the higher roll",
    "rollTwiceKeepHigh": true
   },
   {
    "id": "blood",
    "text": "Spend HP in blood",
    "drPerHp": -1
   }
  ],
  "repeatedMishap": "If the same mishap is rolled twice, the caster's body slowly melts into sea water."
 },
 "creation": {
  "page": 27,
  "steps": [
   {
    "id": "gear",
    "text": "Roll on each starting gear table: container (d6), cheap gear (d12) and fancy gear (d12)."
   },
   {
    "id": "abilities",
    "text": "Roll ability scores: 3d6 for each ability (landlubbers may roll 4d6 and drop the lowest)."
   },
   {
    "id": "class",
    "text": "Choose or roll a class (d6, or d8 to include the optional Haunted Soul and Tall Tale), or be a landlubber with no class. The class sets HP, weapon, clothing, hat and Devil's Luck."
   },
   {
    "id": "background",
    "text": "Choose or roll background details: Background & silver (d100), Distinctive Flaw (d20), Physical Trademark (d20), Idiosyncrasies (d20), Unfortunate Incidents & Conditions (d20), Thing of Importance (d100)."
   },
   {
    "id": "name",
    "text": "Name your pirate: d66 × 4 on the name generator (pg. 79)."
   }
  ],
  "classDie": "d6",
  "classDieOptional": "d8"
 }
};

export const PB_RUMORS: PbTable = {
 "id": "rumors",
 "name": "Rumors",
 "die": "d20",
 "page": 127,
 "source": "Core Rules",
 "rows": [
  {
   "roll": 1,
   "text": "A nation's navy is coming in 3d6 days. Everyone is on edge."
  },
  {
   "roll": 2,
   "text": "A rich group of merchants are hiring mercenaries to escort them."
  },
  {
   "roll": 3,
   "text": "A treasure fleet is rumored to be departing soon."
  },
  {
   "roll": 4,
   "text": "An important NPC is recruiting people to explore or scout an area."
  },
  {
   "roll": 5,
   "text": "A group of leaders is meeting soon. The PCs have been summoned."
  },
  {
   "roll": 6,
   "text": "Someone the PCs know has been killed or captured."
  },
  {
   "roll": 7,
   "text": "2d12 pirates are in town spending the earnings from their latest prize."
  },
  {
   "roll": 8,
   "text": "Pirates, marines, or revolutionaries are planning to raid a port."
  },
  {
   "roll": 9,
   "text": "There are rumors of a rich prize nearby. Crews are recruiting."
  },
  {
   "roll": 10,
   "text": "Someone uncovered a clue or map to a fabled treasure and need brains, muscle, or both."
  },
  {
   "roll": 11,
   "text": "A corpse has been found in an alley or on the beach. Everyone is suspicious."
  },
  {
   "roll": 12,
   "text": "A ship with valuable cargo wrecked nearby."
  },
  {
   "roll": 13,
   "text": "A lonely widow (20+d50 years old) is looking for a date to the Governor's Ball."
  },
  {
   "roll": 14,
   "text": "It is not safe here at night. The reasons given sound like tall tales or ghost stories."
  },
  {
   "roll": 15,
   "text": "A recent fire destroyed a ship, a port, or a farmstead."
  },
  {
   "roll": 16,
   "text": "Two allied factions are now at war."
  },
  {
   "roll": 17,
   "text": "There is a party tonight to honor a deceased NPC."
  },
  {
   "roll": 18,
   "text": "The governor's adult daughter/son is the most beautiful person ever seen."
  },
  {
   "roll": 19,
   "text": "A group of cultists have been up to some unusual activity recently."
  },
  {
   "roll": 20,
   "text": "Undead have destroyed yet another settlement."
  }
 ]
};

export const PB_SETTING: PbSetting = {
 "page": 8,
 "source": "Core Rules",
 "name": "The Dark Caribbean",
 "summary": "Settlers came to the islands expecting paradise. On a solstice the undead began crawling out of the black sea — drowned sailors, displaced ghosts, seaweed-wrapped skeletons and worse — and hordes soon overran settlements; the dead who were buried rose again at dusk. Survivors fortified their cities, and the discovery of ASH (the dust of destroyed undead) set a new, grim status quo.",
 "scourge": "The Scourge: the undead hordes that rose from the sea and the grave across the Dark Caribbean (pg. 8-9).",
 "ash": "ASH — see PB_ASH (pg. 10): the remnants of destroyed undead, a valuable psychedelic drug and the region's primary black-market commodity.",
 "map": {
  "page": 6,
  "places": [
   "Havana",
   "Nassau",
   "Black Coral Bay",
   "The Abyss",
   "The Dark Yucatán",
   "Port Royal",
   "Tortuga",
   "Petit-Goâve",
   "Guadeloupe",
   "Barbados",
   "Maracaibo"
  ],
  "scale": "hex map, 50-mile hexes"
 },
 "places": [
  {
   "id": "nassau",
   "name": "Nassau",
   "page": 12,
   "faction": "brethren",
   "text": "Ruins of an imperial colony on New Providence, now a sprawl of driftwood shacks and tents. Home of the Brethren of the Coast and a bastion against law and order beneath a crumbling seaside fort."
  },
  {
   "id": "tortuga",
   "name": "Tortuga",
   "page": 12,
   "faction": "brethren",
   "text": "A small pirate outpost to the south that has rotted into a cesspool of vagrants; the epicenter of the ASH trade, with taverns, brothels, gambling and ASH dens."
  },
  {
   "id": "port-royal",
   "name": "Port Royal",
   "page": 14,
   "faction": "english-crown",
   "text": "Jamaica's port, being rebuilt after a preternatural earthquake while its governor hires privateers."
  },
  {
   "id": "petit-goave",
   "name": "Petit-Goâve",
   "page": 17,
   "faction": "french-indies",
   "text": "A festering French colony on western Hispaniola, a rotting figurehead of the monarchy where spies, assassins, crime syndicates and cultists flourish."
  },
  {
   "id": "guadeloupe",
   "name": "Guadeloupe",
   "page": 17,
   "faction": "french-indies",
   "text": "Opulent palace and gaudy forts above impoverished slums in the Lesser Antilles; everything is for sale — munitions, letters of marque, agents, ASH, sanctuary."
  },
  {
   "id": "havana",
   "name": "Havana",
   "page": 18,
   "faction": "new-spain",
   "text": "Capital of the Viceroyalty of New Spain on western Cuba: an overcrowded, corrupt metropolis behind cannon-studded fortresses, where treasure fleets of silver, gold and ASH gather before sailing east."
  },
  {
   "id": "maracaibo",
   "name": "Maracaibo (The Citadel)",
   "page": 19,
   "faction": "inquisition",
   "text": "A coral-sharp citadel at the mouth of Lake Maracaibo; the Inquisition's nest, with endless dungeons for heretics. Sailors flee the 'banshee' — the screams of the damned."
  },
  {
   "id": "the-abyss",
   "name": "The Abyss",
   "page": 20,
   "faction": "the-wretched",
   "text": "A vast fissure south of Cuba into which the ocean falls; the altar of The Wretched."
  },
  {
   "id": "dark-yucatan",
   "name": "The Dark Yucatán",
   "page": 22,
   "text": "Far to the west: a rotting jungle labyrinth of rumored golden cities and temples. None who venture in return."
  },
  {
   "id": "black-coral-bay",
   "name": "Black Coral Bay",
   "page": 134,
   "text": "The cursed island of the module The Curse of Skeleton Point."
  }
 ]
};

export const PB_SHANTIES: PbShanty[] = [
 {
  "id": "fifteen-men-on-a-dead-mans-chest",
  "roll": 1,
  "name": "Fifteen Men on a Dead Man's Chest",
  "text": "The ship gains d2 Devil's Luck that it can use like a PC.",
  "shipLuck": "d2"
 },
 {
  "id": "dead-horse",
  "roll": 2,
  "name": "Dead Horse",
  "text": "The ship recovers d10 HP and any misfired cannons are repaired.",
  "heal": "d10"
 },
 {
  "id": "spanish-ladies",
  "roll": 3,
  "name": "Spanish Ladies",
  "text": "The ship can't get lost today."
 },
 {
  "id": "leave-her-johnny",
  "roll": 4,
  "name": "Leave Her Johnny",
  "text": "Reroll Changing Winds (pg. 78)."
 },
 {
  "id": "blow-the-man-down",
  "roll": 5,
  "name": "Blow the Man Down",
  "text": "The ship is +2 DR to hit until the end of combat."
 },
 {
  "id": "drunken-sailor",
  "roll": 6,
  "name": "Drunken Sailor",
  "text": "One ship's crew skill is −4 for d6 rounds.",
  "duration": "d6 rounds"
 },
 {
  "id": "fish-in-the-sea",
  "roll": 7,
  "name": "Fish in the Sea",
  "text": "Choose a direction: the wind blows that way for d4 hours.",
  "duration": "d4 hours"
 },
 {
  "id": "captain-kidd",
  "roll": 8,
  "name": "Captain Kidd",
  "text": "Attacks from this ship are DR −2 for d6 rounds.",
  "duration": "d6 rounds"
 },
 {
  "id": "a-drop-of-nelsons-blood",
  "roll": 9,
  "name": "A Drop of Nelson's Blood",
  "text": "Increase the ship's speed by 1 for d8 hours.",
  "duration": "d8 hours"
 },
 {
  "id": "all-for-me-grog",
  "roll": 10,
  "name": "All For Me Grog",
  "text": "Raise the ship's morale by 2. The crew can't mutiny today."
 },
 {
  "id": "fire-down-below",
  "roll": 11,
  "name": "Fire Down Below",
  "text": "Extinguish all fires on the ship and repair d6 HP.",
  "heal": "d6"
 },
 {
  "id": "down-among-the-dead-men",
  "roll": 12,
  "name": "Down Among the Dead Men",
  "text": "Dark waves crash against another ship: move it 1 hex (1\") in any direction and it loses d8 HP.",
  "damage": "d8"
 }
];

export const PB_SHANTY_RULES: PbShantyRules = {
 "page": 68,
 "perDay": "1 ± the Captain's SPIRIT",
 "test": {
  "ship": "skill",
  "dr": 12
 },
 "text": "Each day the crew can sing a number of sea shanties equal to 1 ± the Captain's SPIRIT. Choose from the crew's known shanties and test CREW SKILL DR12. Success activates the effect and uses one of the day's shanties. Failure sounds horrible and does nothing, and shanties can't be used for the next hour. The GM decides the effect of a Crit or Fumble."
};

export const PB_SHIPS: PbShip[] = [
 {
  "homebrew": false,
  "id": "dinghy",
  "name": "Dinghy",
  "type": "boat",
  "hp": 4,
  "hull": null,
  "agility": 3,
  "speed": 2,
  "skill": null,
  "skillNote": "Use passengers' stats.",
  "broadsides": null,
  "smallArms": "d2",
  "ram": null,
  "crew": {
   "min": 1,
   "max": 4
  },
  "cargo": 0,
  "special": "Use passengers' stats. Not affected by wind.",
  "windImmune": true,
  "text": "A utility rowboat towed behind medium ships or stored on the deck of larger ones. The perfect espionage vessel.",
  "source": "Core Rules",
  "page": 80,
  "sources": [
   {
    "source": "Core Rules",
    "page": 80
   },
   {
    "source": "Trapped in the Tropics",
    "page": 34
   }
  ],
  "cost": 250
 },
 {
  "homebrew": false,
  "id": "longboat",
  "name": "Longboat",
  "type": "boat",
  "hp": 5,
  "hull": null,
  "agility": 3,
  "speed": 3,
  "skill": null,
  "skillNote": "Use passengers' stats.",
  "broadsides": null,
  "smallArms": "d4",
  "ram": null,
  "crew": {
   "min": 2,
   "max": 10
  },
  "cargo": 0,
  "special": "Use passengers' stats. Not affected by wind.",
  "windImmune": true,
  "text": "Watercraft often used to ferry crew from larger ships to land; some have small collapsible sails. Often used for fishing.",
  "source": "Core Rules",
  "page": 81,
  "sources": [
   {
    "source": "Core Rules",
    "page": 81
   },
   {
    "source": "Trapped in the Tropics",
    "page": 34
   }
  ],
  "cost": 500
 },
 {
  "homebrew": false,
  "id": "sloop",
  "name": "Sloop",
  "type": "ship",
  "hp": 30,
  "hull": {
   "tier": 1,
   "die": "d2"
  },
  "agility": 2,
  "speed": 5,
  "skill": -1,
  "broadsides": "d6",
  "smallArms": "d4",
  "ram": "d4",
  "crew": {
   "min": 3,
   "max": 10
  },
  "cargo": 2,
  "special": "Can travel at full speed when Close to the Wind.",
  "closeToWindFullSpeed": true,
  "text": "A small, single-masted vessel — the \"perfect\" pirate ship thanks to its speed, shallow draft and maneuverability.",
  "source": "Core Rules",
  "page": 82,
  "sources": [
   {
    "source": "Core Rules",
    "page": 82
   },
   {
    "source": "Trapped in the Tropics",
    "page": 35
   }
  ]
 },
 {
  "homebrew": false,
  "id": "fluyt",
  "name": "Fluyt",
  "type": "ship",
  "hp": 50,
  "hull": {
   "tier": 2,
   "die": "d4"
  },
  "agility": -1,
  "speed": 3,
  "skill": 0,
  "broadsides": "d10",
  "smallArms": "d6",
  "ram": "d6",
  "crew": {
   "min": 10,
   "max": 40
  },
  "cargo": 5,
  "special": null,
  "text": "A slow, high-sided merchant vessel. Not ideal for piracy, but good for carrying cargo, troops and treasure.",
  "source": "Core Rules",
  "page": 82,
  "sources": [
   {
    "source": "Core Rules",
    "page": 82
   },
   {
    "source": "Trapped in the Tropics",
    "page": 35
   }
  ]
 },
 {
  "homebrew": false,
  "id": "fort-amsterdam",
  "name": "Fort Amsterdam",
  "type": "fortification",
  "hp": 60,
  "hull": null,
  "agility": null,
  "speed": 0,
  "skill": 3,
  "broadsides": "d12",
  "broadsidesAttacks": 2,
  "smallArms": null,
  "ram": null,
  "crew": null,
  "cargo": null,
  "special": "Stationary (DR8 to hit). Makes 1 attack for each block of 50 HP it has remaining, rounded up.",
  "stationary": true,
  "dr": {
   "attack": 8
  },
  "statLabels": {
   "hull": "Armor",
   "broadsides": "Cannons"
  },
  "statText": {
   "broadsides": "2 @ d12"
  },
  "text": "Hilltop fort guarding Gibbet Town on St. Martin: three cannon-lined bastions and ~75 Redcoat soldiers.",
  "source": "Trapped in the Tropics",
  "page": 42
 },
 {
  "homebrew": false,
  "id": "raft",
  "name": "Raft",
  "type": "boat",
  "hp": 2,
  "hull": null,
  "agility": -1,
  "speed": 1,
  "skill": null,
  "skillNote": "Use passengers' stats.",
  "broadsides": null,
  "smallArms": null,
  "ram": null,
  "crew": {
   "min": 1,
   "max": 3
  },
  "cargo": 0,
  "special": "Use passengers' stats.",
  "text": "A makeshift raft, often jury-rigged by those marooned on desert islands.",
  "source": "Core Rules",
  "page": 80
 },
 {
  "homebrew": false,
  "id": "canoe",
  "name": "Canoe",
  "type": "boat",
  "hp": 3,
  "hull": null,
  "agility": 3,
  "speed": 3,
  "skill": null,
  "skillNote": "Use passengers' stats.",
  "broadsides": null,
  "smallArms": "d2",
  "ram": null,
  "crew": {
   "min": 1,
   "max": 3
  },
  "cargo": 0,
  "special": "Use passengers' stats. Not affected by wind.",
  "windImmune": true,
  "text": "Carved from a single log: fast, maneuverable boats perfect for swamps and streams.",
  "source": "Core Rules",
  "page": 80
 },
 {
  "homebrew": false,
  "id": "piragua",
  "name": "Piragua",
  "type": "boat",
  "hp": 10,
  "hull": null,
  "agility": 3,
  "speed": 3,
  "skill": null,
  "skillNote": "Use passengers' stats.",
  "broadsides": null,
  "smallArms": "d6",
  "ram": null,
  "crew": {
   "min": 2,
   "max": 20
  },
  "cargo": 0,
  "special": "Use passengers' stats.",
  "text": "Dugout boats made from tree trunks; simple construction and a big crew capacity make them a swashbuckler favorite.",
  "source": "Core Rules",
  "page": 81
 },
 {
  "homebrew": false,
  "id": "tartane",
  "name": "Tartane",
  "type": "ship",
  "hp": 20,
  "hull": {
   "tier": 1,
   "die": "d2"
  },
  "agility": 2,
  "speed": 5,
  "skill": -1,
  "broadsides": "d4",
  "smallArms": "d4",
  "ram": "d4",
  "crew": {
   "min": 3,
   "max": 9
  },
  "cargo": 1,
  "special": "Can travel at full speed when Close to the Wind.",
  "closeToWindFullSpeed": true,
  "text": "A small ship used for fishing, trading and rum running; triangular sails and rigging make it very nimble.",
  "source": "Core Rules",
  "page": 81
 },
 {
  "homebrew": false,
  "id": "brigantine",
  "name": "Brigantine",
  "type": "ship",
  "hp": 40,
  "hull": {
   "tier": 2,
   "die": "d4"
  },
  "agility": 1,
  "speed": 4,
  "skill": 0,
  "broadsides": "d8",
  "smallArms": "d4",
  "ram": "d6",
  "crew": {
   "min": 15,
   "max": 30
  },
  "cargo": 3,
  "special": null,
  "text": "A nimble, square-rigged two-masted vessel suited to medium crews; common as a merchant ship.",
  "source": "Core Rules",
  "page": 82
 },
 {
  "homebrew": false,
  "id": "galley",
  "name": "Galley",
  "type": "ship",
  "hp": 60,
  "hull": {
   "tier": 2,
   "die": "d4"
  },
  "agility": 1,
  "speed": 5,
  "skill": 2,
  "broadsides": null,
  "smallArms": "d10",
  "ram": "d10",
  "crew": {
   "min": 80,
   "max": 120
  },
  "cargo": 3,
  "special": "May always move 3\" regardless of wind.",
  "windMinMove": 3,
  "text": "A relic of a bygone era propelled by sails or oars, often crewed by undead from distant lands.",
  "source": "Core Rules",
  "page": 83
 },
 {
  "homebrew": false,
  "id": "frigate",
  "name": "Frigate",
  "type": "ship",
  "hp": 60,
  "hull": {
   "tier": 2,
   "die": "d4"
  },
  "agility": 0,
  "speed": 4,
  "skill": 1,
  "broadsides": "d8",
  "broadsidesAttacks": 2,
  "statText": {
   "broadsides": "2 @ d8"
  },
  "smallArms": "d6",
  "ram": "d6",
  "crew": {
   "min": 24,
   "max": 48
  },
  "cargo": 4,
  "special": "Makes 2 broadsides when over half HP.",
  "multiAttackAboveHalfHp": true,
  "text": "Not as nimble as a sloop, but fast; their size and armament make decent pirate flagships.",
  "source": "Core Rules",
  "page": 83
 },
 {
  "homebrew": false,
  "id": "galleon",
  "name": "Galleon",
  "type": "ship",
  "hp": 65,
  "hull": {
   "tier": 3,
   "die": "d6"
  },
  "agility": -3,
  "speed": 2,
  "skill": 1,
  "broadsides": "d10",
  "broadsidesAttacks": 2,
  "statText": {
   "broadsides": "2 @ d10"
  },
  "smallArms": "d6",
  "ram": "d8",
  "crew": {
   "min": 30,
   "max": 60
  },
  "cargo": 6,
  "special": "Makes 2 broadsides when over half HP.",
  "multiAttackAboveHalfHp": true,
  "text": "Heavily armed, slow vessels of a previous age, often used to carry cargo… and treasure hoards.",
  "source": "Core Rules",
  "page": 83
 },
 {
  "homebrew": false,
  "id": "man-of-war",
  "name": "Man-of-War",
  "type": "ship",
  "hp": 75,
  "hull": {
   "tier": 3,
   "die": "d6"
  },
  "agility": -2,
  "speed": 3,
  "skill": 2,
  "broadsides": "d8",
  "broadsidesAttacks": 3,
  "statText": {
   "broadsides": "3 @ d8"
  },
  "smallArms": "d8",
  "ram": "d8",
  "crew": {
   "min": 50,
   "max": 150
  },
  "cargo": 4,
  "special": "Makes 3 broadsides when > 2/3 HP; 2 > 1/3 HP.",
  "attackScaling": {
   "broadsides": [
    {
     "above": 0.6666666666666666,
     "attacks": 3
    },
    {
     "above": 0.3333333333333333,
     "attacks": 2
    },
    {
     "above": 0,
     "attacks": 1
    }
   ]
  },
  "text": "Built for naval combat but needing a large, trained crew; used almost exclusively by navies.",
  "source": "Core Rules",
  "page": 84
 },
 {
  "homebrew": false,
  "id": "ship-of-the-line",
  "name": "Ship of the Line",
  "type": "ship",
  "hp": 95,
  "hull": {
   "tier": 3,
   "die": "d6"
  },
  "agility": -3,
  "speed": 3,
  "skill": 3,
  "broadsides": "d10",
  "broadsidesAttacks": 3,
  "smallArms": "d8",
  "smallArmsAttacks": 2,
  "statText": {
   "broadsides": "3 @ d10",
   "smallArms": "2 @ d8"
  },
  "ram": "d8",
  "crew": {
   "min": 150,
   "max": 350
  },
  "cargo": 4,
  "special": "Makes 3 broadsides when > 2/3 HP; 2 > 1/3 HP. Makes 2 small arms attacks when > 1/2 HP.",
  "attackScaling": {
   "broadsides": [
    {
     "above": 0.6666666666666666,
     "attacks": 3
    },
    {
     "above": 0.3333333333333333,
     "attacks": 2
    },
    {
     "above": 0,
     "attacks": 1
    }
   ],
   "smallArms": [
    {
     "above": 0.5,
     "attacks": 2
    },
    {
     "above": 0,
     "attacks": 1
    }
   ]
  },
  "text": "A floating fortress and the flagship of any navy; in wartime several line up to make a wall of black powder death.",
  "source": "Core Rules",
  "page": 84
 },
 {
  "homebrew": false,
  "id": "fort",
  "name": "Fort",
  "type": "fortification",
  "hp": 200,
  "hull": null,
  "agility": null,
  "speed": 0,
  "skill": 3,
  "broadsides": "d12",
  "broadsidesAttacks": 4,
  "smallArms": null,
  "ram": null,
  "crew": null,
  "cargo": null,
  "special": "Stationary (DR8 to hit). Makes 1 attack for each block of 50 HP it has remaining. Customize: add one d12 attack per 50 HP; add armor for an extra challenge.",
  "stationary": true,
  "dr": {
   "attack": 8
  },
  "attackPerHp": 50,
  "statLabels": {
   "hull": "Armor",
   "broadsides": "Cannons"
  },
  "statText": {
   "broadsides": "4 @ d12"
  },
  "text": "Seaside fortifications built to protect ports and towns.",
  "source": "Core Rules",
  "page": 84
 }
];

export const PB_SHIPS_AT_SEA: PbShipsAtSea = {
 "page": 114,
 "source": "Core Rules",
 "note": "Sails! Roll for a vessel spotted at sea. *Modify DRs where appropriate (crew quantity and quality).",
 "vesselClass": {
  "id": "vesselClass",
  "name": "Vessel Class",
  "die": "d10",
  "page": 114,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "raft",
    "ship": "raft"
   },
   {
    "roll": 2,
    "text": "longboat",
    "ship": "longboat"
   },
   {
    "roll": 3,
    "text": "tartane",
    "ship": "tartane"
   },
   {
    "roll": 4,
    "text": "sloop",
    "ship": "sloop"
   },
   {
    "roll": 5,
    "text": "brigantine",
    "ship": "brigantine"
   },
   {
    "roll": 6,
    "text": "fluyt",
    "ship": "fluyt"
   },
   {
    "roll": 7,
    "text": "frigate",
    "ship": "frigate"
   },
   {
    "roll": 8,
    "text": "galleon",
    "ship": "galleon"
   },
   {
    "roll": 9,
    "text": "man-of-war",
    "ship": "man-of-war"
   },
   {
    "roll": 10,
    "text": "ship of the line",
    "ship": "ship-of-the-line"
   }
  ]
 },
 "armament": {
  "id": "armament",
  "name": "Armament",
  "die": "d6",
  "page": 114,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Merchant: No weapons.",
    "weapons": "none"
   },
   {
    "roll": 2,
    "text": "Lightly armed: reduce damage die size by one.",
    "attackDieStep": -1
   },
   {
    "roll": [
     3,
     5
    ],
    "text": "Normal armament."
   },
   {
    "roll": 6,
    "text": "Warship: Double broadsides.",
    "broadsidesMultiplier": 2
   }
  ]
 },
 "crewQuantity": {
  "id": "crewQuantity",
  "name": "Crew Quantity",
  "die": "d6",
  "page": 114,
  "source": "Core Rules",
  "note": "Modify DRs where appropriate.",
  "rows": [
   {
    "roll": 1,
    "text": "Short-handed: half as many.",
    "crewMultiplier": 0.5
   },
   {
    "roll": [
     2,
     3
    ],
    "text": "Standard crew.",
    "crewMultiplier": 1
   },
   {
    "roll": [
     4,
     5
    ],
    "text": "Ready for war: twice as many.",
    "crewMultiplier": 2
   },
   {
    "roll": 6,
    "text": "Ready to raid: as many as possible.",
    "crewMultiplier": "max"
   }
  ]
 },
 "crewQuality": {
  "id": "crewQuality",
  "name": "Crew Quality",
  "die": "2d6",
  "page": 114,
  "source": "Core Rules",
  "note": "Modify DRs where appropriate.",
  "rows": [
   {
    "roll": [
     2,
     3
    ],
    "text": "Near mutiny and/or untrained."
   },
   {
    "roll": [
     4,
     6
    ],
    "text": "Miserable and/or novice."
   },
   {
    "roll": [
     7,
     8
    ],
    "text": "Average."
   },
   {
    "roll": [
     9,
     10
    ],
    "text": "Fresh from shore leave and/or experienced."
   },
   {
    "roll": [
     11,
     12
    ],
    "text": "Prosperous/loyal and/or military training."
   }
  ]
 },
 "name": {
  "id": "shipName",
  "name": "Ship Name",
  "die": "d66",
  "page": 114,
  "source": "Core Rules",
  "columns": [
   {
    "die": "d66",
    "name": "Name",
    "values": [
     "Banshee's Wail",
     "Revenant",
     "Void Ripper",
     "Mermaid's Tear",
     "Carrion Crow",
     "Executioner's Hand",
     "Poseidon's Rage",
     "Adventure's Ghost",
     "Widow's Revenge",
     "Blood Moon",
     "Devil's Scorn",
     "Gilded Parrot",
     "Monolith",
     "Black Tide",
     "Raven's Wrath",
     "Coral Corsair",
     "Hellspire",
     "Vendetta",
     "Crimson Tempest",
     "Royal Tomb",
     "Guillotine",
     "Neptune's Maiden",
     "Cadaver's Call",
     "Heart of the Sea",
     "Demonwake",
     "Bride of the Abyss",
     "Annihilation",
     "Golden Glaive",
     "Necrobile",
     "Grave Witch",
     "Loa's Lament",
     "Hunsi Kanzo",
     "Dragon from the Deep",
     "Leviathan's Flood",
     "Kraken's Maw",
     "Harlequin's Curse"
    ]
   }
  ],
  "rows": [
   {
    "roll": 11,
    "text": "Banshee's Wail"
   },
   {
    "roll": 12,
    "text": "Revenant"
   },
   {
    "roll": 13,
    "text": "Void Ripper"
   },
   {
    "roll": 14,
    "text": "Mermaid's Tear"
   },
   {
    "roll": 15,
    "text": "Carrion Crow"
   },
   {
    "roll": 16,
    "text": "Executioner's Hand"
   },
   {
    "roll": 21,
    "text": "Poseidon's Rage"
   },
   {
    "roll": 22,
    "text": "Adventure's Ghost"
   },
   {
    "roll": 23,
    "text": "Widow's Revenge"
   },
   {
    "roll": 24,
    "text": "Blood Moon"
   },
   {
    "roll": 25,
    "text": "Devil's Scorn"
   },
   {
    "roll": 26,
    "text": "Gilded Parrot"
   },
   {
    "roll": 31,
    "text": "Monolith"
   },
   {
    "roll": 32,
    "text": "Black Tide"
   },
   {
    "roll": 33,
    "text": "Raven's Wrath"
   },
   {
    "roll": 34,
    "text": "Coral Corsair"
   },
   {
    "roll": 35,
    "text": "Hellspire"
   },
   {
    "roll": 36,
    "text": "Vendetta"
   },
   {
    "roll": 41,
    "text": "Crimson Tempest"
   },
   {
    "roll": 42,
    "text": "Royal Tomb"
   },
   {
    "roll": 43,
    "text": "Guillotine"
   },
   {
    "roll": 44,
    "text": "Neptune's Maiden"
   },
   {
    "roll": 45,
    "text": "Cadaver's Call"
   },
   {
    "roll": 46,
    "text": "Heart of the Sea"
   },
   {
    "roll": 51,
    "text": "Demonwake"
   },
   {
    "roll": 52,
    "text": "Bride of the Abyss"
   },
   {
    "roll": 53,
    "text": "Annihilation"
   },
   {
    "roll": 54,
    "text": "Golden Glaive"
   },
   {
    "roll": 55,
    "text": "Necrobile"
   },
   {
    "roll": 56,
    "text": "Grave Witch"
   },
   {
    "roll": 61,
    "text": "Loa's Lament"
   },
   {
    "roll": 62,
    "text": "Hunsi Kanzo"
   },
   {
    "roll": 63,
    "text": "Dragon from the Deep"
   },
   {
    "roll": 64,
    "text": "Leviathan's Flood"
   },
   {
    "roll": 65,
    "text": "Kraken's Maw"
   },
   {
    "roll": 66,
    "text": "Harlequin's Curse"
   }
  ]
 }
};

export const PB_SHIPWRIGHT: PbShipwright = {
 "page": 77,
 "crewRepairs": [
  {
   "id": "crew-repairs",
   "name": "Repairs",
   "effect": "Recover 2 HP/day.",
   "hpPerDay": 2,
   "cost": "25s per HP",
   "costPerHp": 25
  },
  {
   "id": "crew-careen",
   "name": "Careen",
   "effect": "Clean the hull: 1 day per 10 max HP.",
   "daysPerMaxHp": 10,
   "cost": "–"
  }
 ],
 "shipwright": [
  {
   "id": "repair-hp",
   "name": "Repair HP",
   "effect": "Recover 10 HP/day.",
   "hpPerDay": 10,
   "cost": "50s per HP",
   "costPerHp": 50
  },
  {
   "id": "repair-armor",
   "name": "Repair armor",
   "effect": "Repair hull armor; takes 1 week.",
   "cost": "ship's HP × 25s",
   "hpMultiplier": 25
  },
  {
   "id": "careen",
   "name": "Careen",
   "effect": "Clean the hull: 1 day per 25 max HP.",
   "daysPerMaxHp": 25,
   "cost": "ship's HP × 10s",
   "hpMultiplier": 10
  }
 ],
 "upgrades": [
  {
   "id": "upgrade-swivels",
   "name": "Upgrade swivels",
   "effect": "Small arms deal +2 damage.",
   "cost": "ship's HP × 25s",
   "hpMultiplier": 25,
   "onePerShip": true,
   "mods": {
    "smallArmsDamage": 2
   }
  },
  {
   "id": "extra-swivels",
   "name": "Extra swivels",
   "effect": "Add an extra small arms attack.",
   "cost": "ship's HP × 50s",
   "hpMultiplier": 50,
   "onePerShip": true,
   "mods": {
    "smallArmsAttacks": 1
   }
  },
  {
   "id": "upgrade-cannons",
   "name": "Upgrade cannons",
   "effect": "Broadsides deal +2 damage.",
   "cost": "ship's HP × 50s",
   "hpMultiplier": 50,
   "onePerShip": true,
   "mods": {
    "broadsidesDamage": 2
   }
  },
  {
   "id": "extra-cannons",
   "name": "Extra cannons",
   "effect": "Add an extra broadside attack.",
   "cost": "ship's HP × 100s",
   "hpMultiplier": 100,
   "onePerShip": true,
   "mods": {
    "broadsidesAttacks": 1
   }
  },
  {
   "id": "armored-hull",
   "name": "Armored hull",
   "effect": "Raise armor one tier; Speed −1.",
   "cost": "ship's HP × 200s",
   "hpMultiplier": 200,
   "onePerShip": true,
   "mods": {
    "hullTier": 1,
    "speed": -1
   }
  },
  {
   "id": "ram-upgrade",
   "name": "Ram upgrade",
   "effect": "Double the ram die.",
   "cost": "ship's HP × 25s",
   "hpMultiplier": 25,
   "onePerShip": true,
   "mods": {
    "ramDice": 2
   }
  },
  {
   "id": "improved-sails",
   "name": "Improved sails",
   "effect": "+1 Speed, +1 Agility.",
   "cost": "ship's HP × 100s",
   "hpMultiplier": 100,
   "onePerShip": true,
   "mods": {
    "speed": 1,
    "agility": 1
   }
  }
 ],
 "note": "Upgrades are limited to once per ship. Hulls can't be repaired at sea."
};

export const PB_SHIP_STATS: PbShipStat[] = [
 {
  "id": "hp",
  "name": "HP",
  "text": "The vessel's condition plus the crew's health and morale."
 },
 {
  "id": "hull",
  "name": "Hull",
  "text": "Armor for vessels (an armor tier and die, e.g. −d6), as for characters (pg. 30)."
 },
 {
  "id": "agility",
  "name": "Agility",
  "text": "How nimble and maneuverable the vessel is (a modifier)."
 },
 {
  "id": "speed",
  "name": "Speed",
  "text": "How many hexes the vessel can move each turn."
 },
 {
  "id": "skill",
  "name": "Skill",
  "text": "The crew's skill and training (a modifier for crew-action tests)."
 },
 {
  "id": "broadsides",
  "name": "Broadsides",
  "text": "Damage the main cannons deal."
 },
 {
  "id": "smallArms",
  "name": "Small Arms",
  "text": "Damage the swivel guns and muskets deal."
 },
 {
  "id": "ram",
  "name": "Ram",
  "text": "Damage dealt when involved in a Ram action."
 },
 {
  "id": "crew",
  "name": "Crew",
  "text": "The minimum/maximum crew the ship can carry without penalty."
 },
 {
  "id": "cargo",
  "name": "Cargo",
  "text": "Number of cargo slots the vessel can carry."
 }
];

export const PB_SHIP_TEMPLATES: PbShipTemplate[] = [
 {
  "id": "ghost-ship",
  "name": "Ghost Ship",
  "page": 85,
  "source": "Core Rules",
  "undead": true,
  "text": "Reanimated shipwrecks piloted by ghosts and skeletons, typically seen only at night. Use the base stats of another vessel.",
  "traits": [
   {
    "name": "Undead",
    "text": "Can only be crewed by the dead, and sinks when the captain is destroyed."
   },
   {
    "name": "Winds of Hell",
    "text": "Not affected by wind conditions (can always move its full speed).",
    "windImmune": true
   },
   {
    "name": "Terrifying",
    "text": "At the start of combat, ships and PCs can't take crew actions until they pass a Morale test.",
    "terrifying": true
   }
  ]
 },
 {
  "id": "ship-of-bone",
  "name": "Ship of Bone",
  "page": 85,
  "source": "Core Rules",
  "undead": true,
  "text": "Skeletal constructs held together with flesh, leaving a sea of blood in their wake. Use the base stats of another vessel.",
  "traits": [
   {
    "name": "Undead Fortitude",
    "text": "If reduced to 0 HP or less, test DR12 to drop to 1 HP instead.",
    "cheatDeath": {
     "dr": 12,
     "hp": 1
    }
   },
   {
    "name": "Marrow Cannons",
    "text": "Armed with Marrow Cannons (pg. 108).",
    "monsters": [
     "marrow-carronade",
     "marrow-mortar",
     "bane-of-barbados"
    ]
   },
   {
    "name": "Terrifying",
    "text": "At the start of combat, ships and PCs can't take crew actions until they pass a Morale test.",
    "terrifying": true
   }
  ]
 },
 {
  "id": "vessel-from-the-deep",
  "name": "Vessel from the Deep",
  "page": 85,
  "source": "Core Rules",
  "undead": true,
  "text": "More monster than ship: recompiled shipwrecks, coral constructs and possessed vessels lost at sea. Use the base stats of another vessel.",
  "traits": [
   {
    "name": "Down to the Locker!",
    "text": "Can submerge or surface instead of attacking. Speed 3\" when underwater.",
    "underwaterSpeed": 3
   },
   {
    "name": "Melee Attacks",
    "text": "Claws ×2 (HP 10, Shell −d6, Pinch d12). Tentacles ×8 (HP 2, no armor, Slam d4 + AGILITY DR12 or entangled; STRENGTH DR12 to escape each round).",
    "monsters": [
     {
      "id": "vessel-from-the-deep-claw",
      "count": 2
     },
     {
      "id": "vessel-from-the-deep-tentacle",
      "count": 8
     }
    ]
   }
  ]
 },
 {
  "id": "navy-ships",
  "name": "Navy Ships",
  "page": 110,
  "source": "Core Rules",
  "captain": "naval-mastermind",
  "baseShips": [
   "frigate",
   "man-of-war",
   "ship-of-the-line"
  ],
  "text": "Navy fleets are sparse in the Dark Caribbean, but the ships that patrol these waters are well armed.",
  "traits": [
   {
    "name": "Superior Firepower",
    "text": "Increase attack dice by one size (e.g. d6 → d8).",
    "attackDieStep": 1
   }
  ]
 },
 {
  "id": "inquisitor-ships",
  "name": "Inquisitor Ships",
  "page": 111,
  "source": "Core Rules",
  "captain": "inquisitor",
  "baseShips": [
   "galleon",
   "fluyt"
  ],
  "text": "Large, slow ships of out-of-date construction with thick hulls of old-world timber.",
  "traits": [
   {
    "name": "Old World Hull",
    "text": "Increase Hull by one tier (e.g. −d4 → −d6).",
    "hullTier": 1
   }
  ]
 },
 {
  "id": "ship-of-bone-fleet",
  "name": "Ship of Bone (Necromancer)",
  "page": 112,
  "source": "Core Rules",
  "captain": "necromancer",
  "baseShips": [
   "brigantine",
   "fluyt",
   "frigate",
   "galleon",
   "galley"
  ],
  "template": "ship-of-bone",
  "text": "Some sail wooden ships decorated with bones; others have vessels built entirely from the dead.",
  "traits": [
   {
    "name": "Special",
    "text": "The Necromancer can spend a crew action to recover d8 of the ship's HP.",
    "heal": "d8"
   }
  ]
 },
 {
  "id": "vessel-from-the-deep-fleet",
  "name": "Vessel from the Deep (Sunken One)",
  "page": 113,
  "source": "Core Rules",
  "captain": "sunken-one",
  "baseShips": [
   "galleon",
   "fluyt",
   "man-of-war",
   "ship-of-the-line"
  ],
  "template": "vessel-from-the-deep",
  "text": "Living ships infested with coral and deep-sea parasites.",
  "traits": [
   {
    "name": "Special",
    "text": "The Sunken One can spend 2d4 consecutive crew actions to summon (d6): 1 d100 sharks (pg. 89), 2 a whale (pg. 89), 3 The Kraken (pg. 105), 4 Davy Jones (pg. 106), 5 The Leviathan (pg. 107), 6 a maelstrom.",
    "summon": {
     "actions": "2d4",
     "die": "d6",
     "rows": [
      {
       "roll": 1,
       "text": "d100 sharks (pg. 89)",
       "monster": "hammer-drones"
      },
      {
       "roll": 2,
       "text": "a whale (pg. 89)",
       "monster": "barnacled-humpback"
      },
      {
       "roll": 3,
       "text": "The Kraken (pg. 105)",
       "monster": "the-kraken"
      },
      {
       "roll": 4,
       "text": "Davy Jones (pg. 106)",
       "monster": "davy-jones"
      },
      {
       "roll": 5,
       "text": "The Leviathan (pg. 107)",
       "monster": "the-leviathan"
      },
      {
       "roll": 6,
       "text": "a maelstrom"
      }
     ]
    }
   }
  ]
 }
];

export const PB_SPECIALTY_CREW: PbSpecialtyCrew[] = [
 {
  "id": "legendary-captain",
  "name": "Legendary Captain",
  "text": "Take an extra crew action each round, even one that has already been taken.",
  "extraCrewAction": 1
 },
 {
  "id": "veteran-quartermaster",
  "name": "Veteran Quartermaster",
  "text": "Crew morale tests are +3. Cargo sells for 50% more in port.",
  "morale": 3,
  "cargoValue": 1.5
 },
 {
  "id": "strict-bosun",
  "name": "Strict Bosun",
  "text": "Once per combat, reroll one crew action test.",
  "rerollPerCombat": 1
 },
 {
  "id": "master-gunner",
  "name": "Master Gunner",
  "text": "Ship attacks are −2 DR.",
  "dr": -2,
  "applies": "ship-attack"
 },
 {
  "id": "master-of-sails",
  "name": "Master of Sails",
  "text": "Ship AGILITY tests are −2 DR.",
  "dr": -2,
  "applies": "ship-agility"
 },
 {
  "id": "deck-sorcerer-or-priest",
  "name": "Deck Sorcerer or Priest",
  "text": "Once per combat, change the speed and direction of the wind."
 },
 {
  "id": "master-carpenter",
  "name": "Master Carpenter",
  "text": "Repair actions are −5 DR.",
  "dr": -5,
  "applies": "repair"
 },
 {
  "id": "drunk-crew",
  "name": "Drunk Crew",
  "text": "+2 DR for all the ship's rolls.",
  "dr": 2,
  "applies": "all"
 }
];

export const PB_SPELLS: PbSpell[] = [
 {
  "id": "dead-head",
  "roll": 1,
  "name": "Dead Head",
  "test": {
   "ability": "SPIRIT",
   "dr": 12
  },
  "ignoresArmor": true,
  "text": "Summon a flying ghostly skull. Spend your action and test SPIRIT DR12 to have it damage 1 target, ignoring armor. It dissipates after 1 minute or once it deals any damage. Fumble: it attacks you.",
  "ranks": {
   "I": {
    "damage": "2d4"
   },
   "II": {
    "damage": "2d6"
   },
   "III": {
    "damage": "2d8"
   }
  }
 },
 {
  "id": "spiritual-possession",
  "roll": 2,
  "name": "Spiritual Possession",
  "text": "One random creature is possessed by a spirit or ghost. Ally: −2 DR to attack and defense. Enemy: −2 DR to attack or defend against it. Any fumble involving the creature makes the spirit leave, stunning the host for 1 round.",
  "ranks": {
   "I": {
    "duration": "d2 rounds"
   },
   "II": {
    "duration": "d4 rounds"
   },
   "III": {
    "duration": "until combat ends"
   }
  }
 },
 {
  "id": "protection",
  "roll": 3,
  "name": "Protection",
  "duration": "1 hour",
  "extraArmor": "d2",
  "text": "Summon a ghost or spirit to watch over the souls of you and your allies: −d2 protection for an hour, in addition to armor.",
  "ranks": {
   "I": {
    "targets": 1
   },
   "II": {
    "targets": 2
   },
   "III": {
    "targets": 3
   }
  }
 },
 {
  "id": "clairvoyance",
  "roll": 4,
  "name": "Clairvoyance",
  "text": "Ask the spirits a question about an adjacent room or area — their answer may be a lie. Test SPIRIT to know if they are telling the truth.",
  "ranks": {
   "I": {
    "dr": 12
   },
   "II": {
    "dr": 10
   },
   "III": {
    "dr": 8
   }
  }
 },
 {
  "id": "necro-sleep",
  "roll": 5,
  "name": "Necro-Sleep",
  "test": {
   "ability": "SPIRIT",
   "dr": 12
  },
  "text": "A living creature appears to fall over dead, but remembers everything when it wakes. Test SPIRIT DR12 to see if it falls \"dead\" asleep.",
  "ranks": {
   "I": {
    "duration": "d2 rounds"
   },
   "II": {
    "duration": "d6 rounds"
   },
   "III": {
    "duration": "d8 hours"
   }
  }
 },
 {
  "id": "raise-the-dead",
  "roll": 6,
  "name": "Raise the Dead",
  "summon": "skeletal-thrall",
  "text": "Create skeletal thralls from nearby corpses. They are stupid but obey your verbal commands, and tumble into bones at sunrise. Skeletal Thrall: HP 4, Morale –, Claw/Bite d4.",
  "ranks": {
   "I": {
    "count": "1"
   },
   "II": {
    "count": "2"
   },
   "III": {
    "count": "d2+2"
   }
  }
 }
];

export const PB_STARTING_WEAPONS: PbTable = {
 "id": "startingWeapons",
 "name": "Starting Weapon",
 "die": "d10",
 "page": 50,
 "note": "Roll your class's weapon die on this table (d6 → entries 1-6, d8 → 1-8, d10 → all). Guns start with 10 + PRESENCE rounds of shot.",
 "rows": [
  {
   "roll": 1,
   "text": "Marlinspike or Belaying Pin (d4)",
   "choice": [
    "marlinspike",
    "belaying-pin"
   ],
   "damage": "d4"
  },
  {
   "roll": 2,
   "text": "Knife or Bayonet (d4)",
   "choice": [
    "knife-dagger",
    "bayonet"
   ],
   "damage": "d4"
  },
  {
   "roll": 3,
   "text": "Smallsword or Machete (d4)",
   "choice": [
    "smallsword",
    "machete"
   ],
   "damage": "d4"
  },
  {
   "roll": 4,
   "text": "Cat O' Nine Tails (d4, 10' reach)",
   "weapon": "cat-o-nine-tails",
   "damage": "d4"
  },
  {
   "roll": 5,
   "text": "Boarding Axe (d6)",
   "weapon": "boarding-axe",
   "damage": "d6"
  },
  {
   "roll": 6,
   "text": "Cutlass (d6)",
   "weapon": "cutlass",
   "damage": "d6"
  },
  {
   "roll": 7,
   "text": "Flintlock Pistol (2d4, Reload 2 actions, range 30', ammo: 10 + PRESENCE rounds of shot)",
   "weapon": "flintlock-pistol",
   "damage": "2d4",
   "ammo": {
    "item": "rounds of shot",
    "qty": "10 + PRESENCE"
   }
  },
  {
   "roll": 8,
   "text": "Finely Crafted Rapier (d8)",
   "weapon": "finely-crafted-rapier",
   "damage": "d8"
  },
  {
   "roll": 9,
   "text": "Boarding Pike (d10, 10' reach)",
   "weapon": "boarding-pike",
   "damage": "d10"
  },
  {
   "roll": 10,
   "text": "Musket (2d6, Reload 2 actions, range 150', ammo: 10 + PRESENCE rounds of shot)",
   "weapon": "musket",
   "damage": "2d6",
   "ammo": {
    "item": "rounds of shot",
    "qty": "10 + PRESENCE"
   }
  }
 ]
};

export const PB_THINGS: PbRollEntry[] = [
 {
  "roll": 1,
  "text": "animal pelt"
 },
 {
  "roll": 2,
  "text": "oyster pearl"
 },
 {
  "roll": 3,
  "text": "silver locket"
 },
 {
  "roll": 4,
  "text": "conch shell"
 },
 {
  "roll": 5,
  "text": "pipe carved from wood"
 },
 {
  "roll": 6,
  "text": "pipe carved from bone"
 },
 {
  "roll": 7,
  "text": "small jade figurine"
 },
 {
  "roll": 8,
  "text": "ancient gold coin"
 },
 {
  "roll": 9,
  "text": "ruined piece of a treasure map"
 },
 {
  "roll": 10,
  "text": "map of an unknown place"
 },
 {
  "roll": 11,
  "text": "diary written by an ancestor"
 },
 {
  "roll": 12,
  "text": "silver ring"
 },
 {
  "roll": 13,
  "text": "ivory chess piece"
 },
 {
  "roll": 14,
  "text": "sea creature carved from obsidian"
 },
 {
  "roll": 15,
  "text": "spherical prism"
 },
 {
  "roll": 16,
  "text": "jar containing a severed hand"
 },
 {
  "roll": 17,
  "text": "necklace of bones & feathers"
 },
 {
  "roll": 18,
  "text": "book of scripture"
 },
 {
  "roll": 19,
  "text": "novel you loved as a child"
 },
 {
  "roll": 20,
  "text": "bizarre silk handkerchief"
 },
 {
  "roll": 21,
  "text": "pouch containing animal teeth"
 },
 {
  "roll": 22,
  "text": "old fillet knife"
 },
 {
  "roll": 23,
  "text": "fossil of an extinct fish"
 },
 {
  "roll": 24,
  "text": "piece of colorful coral"
 },
 {
  "roll": 25,
  "text": "small ship in a bottle"
 },
 {
  "roll": 26,
  "text": "letter from a loved one"
 },
 {
  "roll": 27,
  "text": "the journal of a dead explorer"
 },
 {
  "roll": 28,
  "text": "stone embossed with a mermaid"
 },
 {
  "roll": 29,
  "text": "vial of holy water from clergy in your hometown"
 },
 {
  "roll": 30,
  "text": "the remains of a small squid in a jar"
 },
 {
  "roll": 31,
  "text": "precious cooking salts in a tiny chest"
 },
 {
  "roll": 32,
  "text": "tankard made from a horn"
 },
 {
  "roll": 33,
  "text": "jar of the finest tobacco"
 },
 {
  "roll": 34,
  "text": "golden letter opener"
 },
 {
  "roll": 35,
  "text": "small, cast bronze owl figurine"
 },
 {
  "roll": 36,
  "text": "collection of sea shells and rocks"
 },
 {
  "roll": 37,
  "text": "necklace carved from jade"
 },
 {
  "roll": 38,
  "text": "a recently deceased relative's will naming you as the sole heir"
 },
 {
  "roll": 39,
  "text": "drawing of a loved one"
 },
 {
  "roll": 40,
  "text": "bag of \"magical\" white powder"
 },
 {
  "roll": 41,
  "text": "old rusted key with a blue gem that glows in the moonlight"
 },
 {
  "roll": 42,
  "text": "compass that doesn't point north"
 },
 {
  "roll": 43,
  "text": "clay jar you are using as an urn"
 },
 {
  "roll": 44,
  "text": "definitive proof of an enemy's (or loved one's) crime"
 },
 {
  "roll": 45,
  "text": "small golden bell"
 },
 {
  "roll": 46,
  "text": "old bottle of red wine (Bordeaux, incredible vintage)"
 },
 {
  "roll": 47,
  "text": "jar of dried jellyfish dust"
 },
 {
  "roll": 48,
  "text": "multi-colored feather"
 },
 {
  "roll": 49,
  "text": "necklace from a loved one"
 },
 {
  "roll": 50,
  "text": "ring that doesn't fit on your fingers"
 },
 {
  "roll": 51,
  "text": "single diamond earring"
 },
 {
  "roll": 52,
  "text": "finely made leather eye patch"
 },
 {
  "roll": 53,
  "text": "set of gardening tools"
 },
 {
  "roll": 54,
  "text": "dried flower"
 },
 {
  "roll": 55,
  "text": "animal skull"
 },
 {
  "roll": 56,
  "text": "human skull"
 },
 {
  "roll": 57,
  "text": "gem that glows in seawater"
 },
 {
  "roll": 58,
  "text": "dinosaur or monster bone or claw"
 },
 {
  "roll": 59,
  "text": "jar of fireflies"
 },
 {
  "roll": 60,
  "text": "leather-bound tome in a language you don't recognize"
 },
 {
  "roll": 61,
  "text": "blueprints to a new type of ship"
 },
 {
  "roll": 62,
  "text": "carved arrowhead"
 },
 {
  "roll": 63,
  "text": "stone tablet inscribed with ancient pictographs or hieroglyphs"
 },
 {
  "roll": 64,
  "text": "perfect cube made of crystal"
 },
 {
  "roll": 65,
  "text": "tattoo, d4: 1 love, 2 revenge, 3 ancestors, 4 unknown origin",
  "sub": {
   "die": "d4",
   "rows": [
    {
     "roll": 1,
     "text": "love"
    },
    {
     "roll": 2,
     "text": "revenge"
    },
    {
     "roll": 3,
     "text": "ancestors"
    },
    {
     "roll": 4,
     "text": "unknown origin"
    }
   ]
  }
 },
 {
  "roll": 66,
  "text": "bottle of perfumed oil"
 },
 {
  "roll": 67,
  "text": "broken set of manacles"
 },
 {
  "roll": 68,
  "text": "broken compass"
 },
 {
  "roll": 69,
  "text": "pistol with one shot meant for someone special"
 },
 {
  "roll": 70,
  "text": "flag of personal significance"
 },
 {
  "roll": 71,
  "text": "broken spyglass with a scroll or map hidden inside"
 },
 {
  "roll": 72,
  "text": "length of rope you made"
 },
 {
  "roll": 73,
  "text": "carved gaming pieces"
 },
 {
  "roll": 74,
  "text": "set of runestones"
 },
 {
  "roll": 75,
  "text": "twig from a very old tree"
 },
 {
  "roll": 76,
  "text": "noose taken from a corpse"
 },
 {
  "roll": 77,
  "text": "6' length of chain"
 },
 {
  "roll": 78,
  "text": "4d10 scars from lashes on your back",
  "dice": "4d10"
 },
 {
  "roll": 79,
  "text": "long scar on your face"
 },
 {
  "roll": 80,
  "text": "two coconut shells"
 },
 {
  "roll": 81,
  "text": "dark robe, cape, or cloak"
 },
 {
  "roll": 82,
  "text": "cask of strong sassafras beer"
 },
 {
  "roll": 83,
  "text": "set of keys on a large key ring"
 },
 {
  "roll": 84,
  "text": "small keg of something valuable (rum, powder, ashes, ASH)"
 },
 {
  "roll": 85,
  "text": "magnifying lens (glass only)"
 },
 {
  "roll": 86,
  "text": "cork from a bottle, from a special occasion"
 },
 {
  "roll": 87,
  "text": "cannonball"
 },
 {
  "roll": 88,
  "text": "deck of cards with d4 cards missing and d6 \"extra\" cards",
  "dice": [
   "d4",
   "d6"
  ]
 },
 {
  "roll": 89,
  "text": "garment from someone special"
 },
 {
  "roll": 90,
  "text": "wanted poster, d4: 1 legend, 2 enemy, 3 loved one, 4 stranger",
  "sub": {
   "die": "d4",
   "rows": [
    {
     "roll": 1,
     "text": "legend"
    },
    {
     "roll": 2,
     "text": "enemy"
    },
    {
     "roll": 3,
     "text": "loved one"
    },
    {
     "roll": 4,
     "text": "stranger"
    }
   ]
  }
 },
 {
  "roll": 91,
  "text": "fancy wig"
 },
 {
  "roll": 92,
  "text": "letter of political importance"
 },
 {
  "roll": 93,
  "text": "tanned whale skin or jar of blubber"
 },
 {
  "roll": 94,
  "text": "petrified egg"
 },
 {
  "roll": 95,
  "text": "monkey paw extending 1 finger"
 },
 {
  "roll": 96,
  "text": "memorized poem that sounds like a map"
 },
 {
  "roll": 97,
  "text": "medallion that might be the top of a staff"
 },
 {
  "roll": 98,
  "text": "talisman shaped like a snake"
 },
 {
  "roll": 99,
  "text": "glass vial of dark blood"
 },
 {
  "roll": 100,
  "text": "shard of crystal"
 }
];

export const PB_TRADEMARKS: PbRollEntry[] = [
 {
  "roll": 1,
  "text": "Cursed: visibly part skeleton/ghost/water/flames/coral."
 },
 {
  "roll": 2,
  "text": "Missing an eye."
 },
 {
  "roll": 3,
  "text": "Matted, dreaded hair."
 },
 {
  "roll": 4,
  "text": "Missing a leg: peg leg or crutch."
 },
 {
  "roll": 5,
  "text": "Missing a hand: hook or claw instead."
 },
 {
  "roll": 6,
  "text": "Missing an ear."
 },
 {
  "roll": 7,
  "text": "Many, many tattoos."
 },
 {
  "roll": 8,
  "text": "Never blinks. Ever."
 },
 {
  "roll": 9,
  "text": "Rotten or broken teeth."
 },
 {
  "roll": 10,
  "text": "Twitches constantly, especially trigger finger."
 },
 {
  "roll": 11,
  "text": "A nigh incurable case of scurvy: permanently bleeding gums."
 },
 {
  "roll": 12,
  "text": "Infested with bugs."
 },
 {
  "roll": 13,
  "text": "Gnarly facial scar."
 },
 {
  "roll": 14,
  "text": "Hideously ugly."
 },
 {
  "roll": 15,
  "text": "Corpulent."
 },
 {
  "roll": 16,
  "text": "Increasingly gangrenous."
 },
 {
  "roll": 17,
  "text": "Putrid, bilge stench."
 },
 {
  "roll": 18,
  "text": "Contagious."
 },
 {
  "roll": 19,
  "text": "Gaunt & frail."
 },
 {
  "roll": 20,
  "text": "So good-looking people are jealous."
 }
];

export const PB_TRAVEL: PbTravel = {
 "page": 76,
 "hexMiles": 50,
 "text": "Ships can move up to their speed in 50-mile hexes each day. In the Dark Caribbean, ships traveling northeast, east or southeast move −1 hex a day (minimum 1).",
 "againstTrades": {
  "directions": [
   "NE",
   "E",
   "SE"
  ],
  "hexesPerDay": -1,
  "min": 1
 }
};

export const PB_TRAVEL_EVENTS: PbTravelEvents = {
 "page": 79,
 "source": "Core Rules",
 "note": "Roll while traveling at sea (see Maritime Travel, pg. 76). Highlighted words are prompts; the GM decides details.",
 "flotsam": {
  "id": "flotsam",
  "name": "Flotsam & Jetsam",
  "die": "d12",
  "page": 79,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "Message in a bottle."
   },
   {
    "roll": 2,
    "text": "2d10 crates (pg. 115).",
    "table": "cargo"
   },
   {
    "roll": 3,
    "text": "d4 adrift sailors."
   },
   {
    "roll": 4,
    "text": "Large, locked sea chest."
   },
   {
    "roll": 5,
    "text": "Green sea turtle, a map carved in its shell."
   },
   {
    "roll": 6,
    "text": "A coffin, nailed shut."
   },
   {
    "roll": 7,
    "text": "Sentient ship's figurehead."
   },
   {
    "roll": 8,
    "text": "Massive dead blue whale, something living inside."
   },
   {
    "roll": 9,
    "text": "A tentacle, d100 feet long."
   },
   {
    "roll": 10,
    "text": "d8 x 100 glowing jellyfish."
   },
   {
    "roll": 11,
    "text": "Dinghy filled with treasure."
   },
   {
    "roll": 12,
    "text": "Derelict ship (pg. 116).",
    "table": "derelictShip"
   }
  ]
 },
 "encounters": {
  "id": "seaEncounters",
  "name": "Encounters at Sea",
  "die": "d20",
  "page": 79,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "The Kraken.",
    "monster": "the-kraken"
   },
   {
    "roll": 2,
    "text": "Navy Ship of the Line.",
    "ship": "ship-of-the-line",
    "captain": "naval-mastermind"
   },
   {
    "roll": 3,
    "text": "Privateers: d2 sloops & 1 frigate.",
    "ships": [
     "sloop",
     "frigate"
    ]
   },
   {
    "roll": 4,
    "text": "2d4 canoes.",
    "ship": "canoe"
   },
   {
    "roll": 5,
    "text": "No-talent pirates in a tartane.",
    "ship": "tartane"
   },
   {
    "roll": 6,
    "text": "Sloop of rookie pirates.",
    "ship": "sloop"
   },
   {
    "roll": 7,
    "text": "Fugitives in a ship's boat.",
    "ship": "longboat"
   },
   {
    "roll": 8,
    "text": "Raft with d6 dying passengers.",
    "ship": "raft"
   },
   {
    "roll": 9,
    "text": "d2 people in a dinghy.",
    "ship": "dinghy"
   },
   {
    "roll": 10,
    "text": "Old galleon crewed by monkeys.",
    "ship": "galleon"
   },
   {
    "roll": 11,
    "text": "Merchantman with lots of goods.",
    "ship": "fluyt"
   },
   {
    "roll": 12,
    "text": "2d20 zombies on floating debris."
   },
   {
    "roll": 13,
    "text": "Man-of-War, famous pirate.",
    "ship": "man-of-war"
   },
   {
    "roll": 14,
    "text": "3d6 war canoes, en route to raid.",
    "ship": "canoe"
   },
   {
    "roll": 15,
    "text": "Blood drenched Ship of the Dead.",
    "ship": "ghost-ship"
   },
   {
    "roll": 16,
    "text": "Treasure galleon & d4 sloops.",
    "ships": [
     "galleon",
     "sloop"
    ]
   },
   {
    "roll": 17,
    "text": "d2 undead megalodons.",
    "monster": "undead-megalodon"
   },
   {
    "roll": 18,
    "text": "d6 fluyts preparing for battle.",
    "ship": "fluyt"
   },
   {
    "roll": 19,
    "text": "A flotilla: pirate lords are meeting."
   },
   {
    "roll": 20,
    "text": "Ornate galleon: a floating brothel.",
    "ship": "galleon"
   }
  ]
 },
 "events": {
  "id": "seaEvents",
  "name": "Events at Sea",
  "die": "d20",
  "page": 79,
  "source": "Core Rules",
  "rows": [
   {
    "roll": 1,
    "text": "A huge shark or sea monster harasses the hull. DR12 AGILITY tests or overboard!",
    "test": {
     "ability": "AGILITY",
     "dr": 12
    }
   },
   {
    "roll": 2,
    "text": "A corpse floats by the ship. If rescued, it comes to life after d10 minutes."
   },
   {
    "roll": 3,
    "text": "Shipworms or barnacles infect the hull. Ship: -1 speed each week until careened.",
    "shipSpeed": -1
   },
   {
    "roll": 4,
    "text": "d4 sirens on rocks or a desert island beckon the crew with serene melodies.",
    "monster": "siren"
   },
   {
    "roll": 5,
    "text": "The rum is gone! The culprit is at large."
   },
   {
    "roll": 6,
    "text": "Man overboard! d6 rounds to solve."
   },
   {
    "roll": 7,
    "text": "Mutiny! Roll reactions for all of the crew (pg. 31).",
    "table": "reaction"
   },
   {
    "roll": 8,
    "text": "Maggots have infested the bread. Resting at sea requires a DR10 TOUGHNESS test.",
    "test": {
     "ability": "TOUGHNESS",
     "dr": 10
    }
   },
   {
    "roll": 9,
    "text": "A crew member is gravely wounded while performing their duties around the ship."
   },
   {
    "roll": 10,
    "text": "An NPC knows something troubling related to a PC's background or unfortunate incident."
   },
   {
    "roll": 11,
    "text": "A slimy ghost is spotted eating the food in the galley."
   },
   {
    "roll": 12,
    "text": "A maelstrom (whirlpool) opens nearby. Eminent danger."
   },
   {
    "roll": 13,
    "text": "Everyone is haunted by eldritch or stygian dreams. The Great Old One calls..."
   },
   {
    "roll": 14,
    "text": "d4 of the crew are quarreling. Fisticuffs?"
   },
   {
    "roll": 15,
    "text": "Things are missing: there is a stowaway."
   },
   {
    "roll": 16,
    "text": "Unexpected shoals and coral require precision navigation and piloting."
   },
   {
    "roll": 17,
    "text": "Something gruesome and terrible is found in the cargo hold."
   },
   {
    "roll": 18,
    "text": "d2 mermaids visit the ship. Secretly roll reaction (pg. 31) to know their intent.",
    "table": "reaction"
   },
   {
    "roll": 19,
    "text": "A mysterious, uncharted island is spotted. See pg. 122.",
    "table": "islands"
   },
   {
    "roll": 20,
    "text": "An albatross is spotted flying with the sails. Everyone gains 1 Devil's Luck point.",
    "luck": 1
   }
  ]
 }
};

export const PB_TREASURE_MAPS: PbTreasureMaps = {
 "page": 119,
 "source": "Core Rules",
 "note": "Pick and choose from these tables as needed, then grab parchment and a quill and get to work.",
 "tables": {
  "type": {
   "id": "mapType",
   "name": "Type of Map",
   "die": "d4",
   "page": 119,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "name": "Simple",
     "text": "Simple. A geographic area, X marks the spot."
    },
    {
     "roll": 2,
     "name": "Point Crawl",
     "text": "Point Crawl. The map shows several icons (pg. 120), but they must be traveled to sequentially to find the next one."
    },
    {
     "roll": 3,
     "name": "Scavenger Hunt",
     "text": "Scavenger Hunt. The map has only one point of interest or one clue, but finding it reveals more maps or clues."
    },
    {
     "roll": 4,
     "name": "Arcane",
     "text": "Arcane. The map only reveals the next step when the previous one is completed."
    }
   ]
  },
  "material": {
   "id": "mapMaterial",
   "name": "Material",
   "die": "d12",
   "page": 119,
   "source": "Core Rules",
   "rows": [
    {
     "roll": [
      1,
      4
     ],
     "text": "Parchment paper."
    },
    {
     "roll": 5,
     "text": "In an old book."
    },
    {
     "roll": 6,
     "text": "Only in someone's mind or memories."
    },
    {
     "roll": 7,
     "text": "Burnt into leather."
    },
    {
     "roll": 8,
     "text": "Whittled into a bone or skull."
    },
    {
     "roll": 9,
     "text": "Minted on a unique coin."
    },
    {
     "roll": 10,
     "text": "Embossed into a sea turtle shell."
    },
    {
     "roll": 11,
     "text": "Scratched into driftwood."
    },
    {
     "roll": 12,
     "text": "Etched into a glass bottle."
    }
   ]
  },
  "geography": {
   "id": "mapGeography",
   "name": "Geography",
   "die": "d8",
   "page": 119,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Island"
    },
    {
     "roll": 2,
     "text": "Coast"
    },
    {
     "roll": 3,
     "text": "Peninsula"
    },
    {
     "roll": 4,
     "text": "Cove"
    },
    {
     "roll": 5,
     "text": "Archipelago"
    },
    {
     "roll": 6,
     "text": "River"
    },
    {
     "roll": 7,
     "text": "Lake"
    },
    {
     "roll": 8,
     "text": "Inland"
    }
   ]
  },
  "itStarts": {
   "id": "mapStarts",
   "name": "It Starts…",
   "die": "d6",
   "page": 119,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "at a totally unknown location."
    },
    {
     "roll": 2,
     "text": "nearby."
    },
    {
     "roll": 3,
     "text": "within a mile."
    },
    {
     "roll": 4,
     "text": "a day's walk away."
    },
    {
     "roll": 5,
     "text": "a day's sail away."
    },
    {
     "roll": 6,
     "text": "near a well known place."
    }
   ]
  },
  "invisibleInk": {
   "id": "mapInvisibleInk",
   "name": "The Invisible Ink Is Revealed…",
   "die": "d10",
   "page": 119,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "with heat or fire."
    },
    {
     "roll": 2,
     "text": "under star or moon light."
    },
    {
     "roll": 3,
     "text": "during an eclipse."
    },
    {
     "roll": 4,
     "text": "when underwater."
    },
    {
     "roll": 5,
     "text": "if soaked in alcohol."
    },
    {
     "roll": 6,
     "text": "with magic or a ritual."
    },
    {
     "roll": 7,
     "text": "when you speak the password."
    },
    {
     "roll": 8,
     "text": "when near a key location or object."
    },
    {
     "roll": 9,
     "text": "during the solstice or equinox."
    },
    {
     "roll": 10,
     "text": "at a certain time of day."
    }
   ]
  },
  "complication": {
   "id": "mapComplication",
   "name": "Complication",
   "die": "d8",
   "page": 119,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Another crew is there when the PCs arrive."
    },
    {
     "roll": 2,
     "text": "Monsters guard it."
    },
    {
     "roll": 3,
     "text": "It has already been found or is missing."
    },
    {
     "roll": 4,
     "text": "It's cursed."
    },
    {
     "roll": 5,
     "text": "There are hundreds of corpses."
    },
    {
     "roll": 6,
     "text": "The PCs become incredibly lost on the way."
    },
    {
     "roll": 7,
     "text": "The whole thing is a setup."
    },
    {
     "roll": 8,
     "text": "There is so much treasure everyone becomes murderously paranoid."
    }
   ]
  },
  "icons": {
   "id": "mapIcons",
   "name": "Icons",
   "die": "d20",
   "page": 120,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "rope bridge"
    },
    {
     "roll": 2,
     "text": "waterfall"
    },
    {
     "roll": 3,
     "text": "volcano caldera"
    },
    {
     "roll": 4,
     "text": "skull rock"
    },
    {
     "roll": 5,
     "text": "wicked tree"
    },
    {
     "roll": 6,
     "text": "jungle"
    },
    {
     "roll": 7,
     "text": "beach caves"
    },
    {
     "roll": 8,
     "text": "whale graveyard"
    },
    {
     "roll": 9,
     "text": "white sand beach"
    },
    {
     "roll": 10,
     "text": "lagoon"
    },
    {
     "roll": 11,
     "text": "ancient ruins"
    },
    {
     "roll": 12,
     "text": "burnt down cabin"
    },
    {
     "roll": 13,
     "text": "swamp"
    },
    {
     "roll": 14,
     "text": "shipwreck"
    },
    {
     "roll": 15,
     "text": "cliff side"
    },
    {
     "roll": 16,
     "text": "large hill"
    },
    {
     "roll": 17,
     "text": "quicksand"
    },
    {
     "roll": 18,
     "text": "mountain's peak"
    },
    {
     "roll": 19,
     "text": "highest point"
    },
    {
     "roll": 20,
     "text": "lowest point"
    }
   ]
  },
  "clueContainer": {
   "id": "mapClueContainer",
   "name": "Clue Container",
   "die": "d10",
   "page": 120,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "Note in a scroll case."
    },
    {
     "roll": 2,
     "text": "Small stone, instructions carved underneath."
    },
    {
     "roll": 3,
     "text": "Coconut shell."
    },
    {
     "roll": 4,
     "text": "Message in a bottle."
    },
    {
     "roll": 5,
     "text": "Metal plaque."
    },
    {
     "roll": 6,
     "text": "Letter in a small box."
    },
    {
     "roll": 7,
     "text": "Etched cannon ball."
    },
    {
     "roll": 8,
     "text": "Burnt or carved into wood."
    },
    {
     "roll": 9,
     "text": "Dried blood on a skull."
    },
    {
     "roll": 10,
     "text": "A potion. The drinker \"knows\" the next clue, but TOUGHNESS DR12 or becomes poisoned.",
     "test": {
      "ability": "TOUGHNESS",
      "dr": 12
     }
    }
   ]
  },
  "direction": {
   "id": "mapDirection",
   "name": "Direction",
   "die": "d8",
   "page": 120,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "north"
    },
    {
     "roll": 2,
     "text": "northeast"
    },
    {
     "roll": 3,
     "text": "east"
    },
    {
     "roll": 4,
     "text": "southeast"
    },
    {
     "roll": 5,
     "text": "south"
    },
    {
     "roll": 6,
     "text": "southwest"
    },
    {
     "roll": 7,
     "text": "west"
    },
    {
     "roll": 8,
     "text": "northwest"
    }
   ]
  },
  "markers": {
   "id": "mapMarkers",
   "name": "Markers",
   "die": "d20",
   "page": 120,
   "source": "Core Rules",
   "rows": [
    {
     "roll": 1,
     "text": "large boulder"
    },
    {
     "roll": 2,
     "text": "dead man's bones"
    },
    {
     "roll": 3,
     "text": "makeshift grave"
    },
    {
     "roll": 4,
     "text": "old anchor"
    },
    {
     "roll": 5,
     "text": "ruined rowboat"
    },
    {
     "roll": 6,
     "text": "lone palm tree"
    },
    {
     "roll": 7,
     "text": "ship's wheel"
    },
    {
     "roll": 8,
     "text": "painted rock"
    },
    {
     "roll": 9,
     "text": "cannonball"
    },
    {
     "roll": 10,
     "text": "pile of skulls"
    },
    {
     "roll": 11,
     "text": "volcanic glass"
    },
    {
     "roll": 12,
     "text": "rusty cutlass"
    },
    {
     "roll": 13,
     "text": "broken oar"
    },
    {
     "roll": 14,
     "text": "broken barrel"
    },
    {
     "roll": 15,
     "text": "ruined cannon"
    },
    {
     "roll": 16,
     "text": "tallest tree"
    },
    {
     "roll": 17,
     "text": "strange sea shell"
    },
    {
     "roll": 18,
     "text": "rotting crate"
    },
    {
     "roll": 19,
     "text": "stone statue"
    },
    {
     "roll": 20,
     "text": "tombstone"
    }
   ]
  }
 },
 "riddles": {
  "id": "riddles",
  "name": "Riddles",
  "die": "d12",
  "page": 121,
  "source": "Core Rules",
  "note": "Fill [icon], [marker] and [direction] from the tables on pg. 120. The `answer` is the GM's explanation.",
  "rows": [
   {
    "roll": 1,
    "text": "Arrive at the [icon] but you won't see the [marker] in the light, travel [2d6] paces to the [direction] and wait until day turns to night.",
    "answer": "The marker only appears in the dark."
   },
   {
    "roll": 2,
    "text": "Set your course for the [icon] and ready a shanty, for singing near the [marker] will turn \"none\" into \"plenty\".",
    "answer": "The treasure or clue appears once music is played."
   },
   {
    "roll": 3,
    "text": "Find the [marker] by the [icon], ye soothsayers and witches, for only magic or prayers can lead to these riches.",
    "answer": "Using a Relic, Ritual, Spell, or Prayer magically reveals the clue or treasure."
   },
   {
    "roll": 4,
    "text": "Look not high for salvation, but low for an X, crossed trees you will find, but beware of the hex.",
    "answer": "Two fallen trees cover the clue or treasure; it's booby trapped."
   },
   {
    "roll": 5,
    "text": "In shallow waters near [icon] the [marker] rests under waves, it points in the direction of nearby caves.",
    "answer": "The marker has a carved or painted arrow that points to a nearby cave with the clue/treasure."
   },
   {
    "roll": 6,
    "text": "Head [d8 x 10] paces [direction] of the [icon] then dig a hole, under the [marker] lies the key to your goal.",
    "answer": "Dig for the clue/treasure."
   },
   {
    "roll": 7,
    "text": "Make for the [icon] before the sun hits the sea, the secret lies between the [marker] and a tree.",
    "answer": "Can't be found during the night."
   },
   {
    "roll": 8,
    "text": "Only dead men know this hidden locale, for of all who've seen the [marker] by the [icon] none have lived to tell.",
    "answer": "Tragedy, a trap, or both haunt this location."
   },
   {
    "roll": 9,
    "text": "Near [icon] at midnight the dead rise from their graves, but the one near the [marker] is a crooked-nosed knave.",
    "answer": "Harmless ghosts rise here at midnight, but one near the marker knows the location of the clue/treasure. He will only reveal it if his body, hanging from a nearby noose, is laid to rest."
   },
   {
    "roll": 10,
    "text": "Travel [direction] for 2d2 miles, find the [icon] then rest, only candlelight will reveal the [marker] over the chest.",
    "answer": "The marker only appears in candle light. The clue/treasure is under it."
   },
   {
    "roll": 11,
    "text": "From the [icon] at low tide you will be able to see, the [marker] just [direction] of a large fruit tree.",
    "answer": "The clue/treasure is buried in the shadow of the tree."
   },
   {
    "roll": 12,
    "text": "[Direction] of the [icon] you will find a sight rarely seen, find the [marker] that's hidden under a blanket of green.",
    "answer": "The marker is hidden under foliage, moss, or grass growing in an odd place."
   }
  ]
 }
};

export const PB_WEAPONS: PbWeapon[] = [
 {
  "id": "unarmed-insults",
  "name": "Unarmed/Insults",
  "type": "melee",
  "damage": "d2",
  "cost": null,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "aliases": [
   "unarmed",
   "insults",
   "fists"
  ]
 },
 {
  "id": "broken-bottle",
  "name": "Broken Bottle",
  "type": "melee",
  "damage": "d2",
  "cost": null,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "knife-dagger",
  "name": "Knife/Dagger",
  "type": "melee",
  "damage": "d4",
  "cost": 10,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "aliases": [
   "knife",
   "dagger"
  ]
 },
 {
  "id": "hook",
  "name": "Hook",
  "type": "melee",
  "damage": "d4",
  "cost": 8,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "bayonet",
  "name": "Bayonet",
  "type": "melee",
  "damage": "d4",
  "cost": 15,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "belaying-pin",
  "name": "Belaying Pin",
  "type": "melee",
  "damage": "d4",
  "cost": 10,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "marlinspike",
  "name": "Marlinspike",
  "type": "melee",
  "damage": "d4",
  "cost": 10,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "wood-plank",
  "name": "Wood Plank",
  "type": "melee",
  "damage": "d4",
  "cost": null,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "whale-bone",
  "name": "Whale Bone",
  "type": "melee",
  "damage": "d4",
  "cost": null,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "smallsword",
  "name": "Smallsword",
  "type": "melee",
  "damage": "d4",
  "cost": 20,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true
 },
 {
  "id": "cudgel",
  "name": "Cudgel",
  "type": "melee",
  "damage": "d4",
  "cost": 10,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "cat-o-nine-tails",
  "name": "Cat O' Nine Tails",
  "type": "melee",
  "damage": "d4",
  "cost": 15,
  "hands": 1,
  "reach": 10,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "machete",
  "name": "Machete",
  "type": "melee",
  "damage": "d4",
  "cost": 25,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "heavy-club",
  "name": "Heavy Club",
  "type": "melee",
  "damage": "d6",
  "cost": 20,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "chain",
  "name": "Chain",
  "type": "melee",
  "damage": "d6",
  "cost": 25,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "grappling-hook",
  "name": "Grappling Hook",
  "type": "melee",
  "damage": "d6",
  "cost": 35,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "boarding-axe",
  "name": "Boarding Axe",
  "type": "melee",
  "damage": "d6",
  "cost": 20,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "hatchet",
  "name": "Hatchet",
  "type": "melee",
  "damage": "d6",
  "cost": 20,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "tomahawk",
  "name": "Tomahawk",
  "type": "melee",
  "damage": "d6",
  "cost": 20,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "cutlass",
  "name": "Cutlass",
  "type": "melee",
  "damage": "d6",
  "cost": 25,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true
 },
 {
  "id": "scimitar",
  "name": "Scimitar",
  "type": "melee",
  "damage": "d6",
  "cost": 25,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true
 },
 {
  "id": "rapier",
  "name": "Rapier",
  "type": "melee",
  "damage": "d6",
  "cost": 30,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true
 },
 {
  "id": "broadsword",
  "name": "Broadsword",
  "type": "melee",
  "damage": "d8",
  "cost": 35,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true
 },
 {
  "id": "officers-cutlass",
  "name": "Officer's Cutlass",
  "type": "melee",
  "damage": "d8",
  "cost": 50,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true
 },
 {
  "id": "harpoon",
  "name": "Harpoon",
  "type": "melee",
  "damage": "d8",
  "cost": 35,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "finely-crafted-rapier",
  "name": "Finely Crafted Rapier",
  "type": "melee",
  "damage": "d8",
  "cost": 50,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "sword": true,
  "aliases": [
   "fine rapier"
  ]
 },
 {
  "id": "anchor",
  "name": "Anchor",
  "type": "melee",
  "damage": "d10",
  "cost": 60,
  "hands": 2,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "boarding-pike",
  "name": "Boarding Pike",
  "type": "melee",
  "damage": "d10",
  "cost": 60,
  "hands": 2,
  "reach": 10,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null
 },
 {
  "id": "throwing-knives",
  "name": "Throwing Knives",
  "type": "ranged",
  "damage": "d4",
  "cost": 8,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "thrown": true
 },
 {
  "id": "blowpipe",
  "name": "Blowpipe",
  "type": "ranged",
  "damage": null,
  "cost": 30,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": "darts",
  "special": "Uses darts (see Ammo). Fumble: hit yourself or an ally.",
  "damageFromAmmo": true
 },
 {
  "id": "throwing-axes",
  "name": "Throwing Axes",
  "type": "ranged",
  "damage": "d6",
  "cost": 20,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": null,
  "thrown": true
 },
 {
  "id": "harpoon-gun",
  "name": "Harpoon Gun",
  "type": "ranged",
  "damage": "d8",
  "cost": 60,
  "hands": 1,
  "reach": null,
  "range": null,
  "reload": null,
  "blackPowder": false,
  "ammo": null,
  "special": "Target tests STRENGTH DR12 or is pulled to the shooter.",
  "targetTest": {
   "ability": "STRENGTH",
   "dr": 12
  }
 },
 {
  "id": "flintlock-pistol",
  "name": "Flintlock Pistol",
  "type": "ranged",
  "damage": "2d4",
  "cost": 50,
  "hands": 1,
  "reach": null,
  "range": 30,
  "reload": 2,
  "blackPowder": true,
  "ammo": "shot",
  "special": null,
  "pistol": true
 },
 {
  "id": "blunderbuss",
  "name": "Blunderbuss",
  "type": "ranged",
  "damage": "d4",
  "cost": 65,
  "hands": 1,
  "reach": null,
  "range": 30,
  "reload": 2,
  "blackPowder": true,
  "ammo": "shot",
  "special": "Deals d10 within 10'.",
  "closeDamage": "d10",
  "closeRange": 10
 },
 {
  "id": "musket",
  "name": "Musket",
  "type": "ranged",
  "damage": "2d6",
  "cost": 80,
  "hands": 2,
  "reach": null,
  "range": 150,
  "reload": 2,
  "blackPowder": true,
  "ammo": "shot",
  "special": null
 },
 {
  "id": "buccaneer-musket",
  "name": "Buccaneer Musket",
  "type": "ranged",
  "damage": "2d8",
  "cost": 100,
  "hands": 2,
  "reach": null,
  "range": 150,
  "reload": 2,
  "blackPowder": true,
  "ammo": "shot",
  "special": null
 }
];

export const PB_WIND: PbWind = {
 "page": 78,
 "optional": true,
 "text": "At the start of naval combat roll d6 for the hex edge the wind is coming from. A ship's point of sail is set at the start of its turn and doesn't change during its movement.",
 "flat": [
  {
   "roll": 1,
   "dir": "N"
  },
  {
   "roll": 2,
   "dir": "NE"
  },
  {
   "roll": 3,
   "dir": "SE"
  },
  {
   "roll": 4,
   "dir": "S"
  },
  {
   "roll": 5,
   "dir": "SW"
  },
  {
   "roll": 6,
   "dir": "NW"
  }
 ],
 "pointed": [
  {
   "roll": 1,
   "dir": "NE"
  },
  {
   "roll": 2,
   "dir": "E"
  },
  {
   "roll": 3,
   "dir": "SE"
  },
  {
   "roll": 4,
   "dir": "SW"
  },
  {
   "roll": 5,
   "dir": "W"
  },
  {
   "roll": 6,
   "dir": "NW"
  }
 ]
};

