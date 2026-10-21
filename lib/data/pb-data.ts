// GENERATED FILE - do not edit by hand.
// Source: data/pb/parts/*.mjs - regenerate with: node scripts/build-pb-data.mjs
// Pirate Borg (Limithron). Mechanics and table values are game facts;
// descriptive text is original paraphrase written for this app.
import type { PbAbility, PbAbilityRow, PbAmmo, PbArmorRepair, PbBackground, PbBomb, PbBombRules, PbCardDeck, PbClass, PbClothing, PbContainer, PbCrewAction, PbCrewMod, PbDeity, PbDrLabel, PbGear, PbGearRoll, PbHat, PbMishap, PbMonster, PbNameRow, PbNamedRoll, PbNavalRules, PbPointOfSail, PbPrayer, PbPrice, PbRelic, PbRitual, PbRollEntry, PbRuleNote, PbRules, PbShanty, PbShantyRules, PbShip, PbShipStat, PbShipwright, PbSpecialtyCrew, PbSpell, PbTable, PbTravel, PbWeapon, PbWind } from "./pb-types";

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
  "source": "Trapped in the Tropics",
  "page": 27
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
  "source": "Trapped in the Tropics",
  "page": 15
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
  "source": "Trapped in the Tropics",
  "page": 15
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
  "source": "Trapped in the Tropics",
  "page": 48
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
  "source": "Player's Guidebook",
  "page": 45
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
  "source": "Player's Guidebook",
  "page": 65
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
  "source": "Player's Guidebook",
  "page": 67
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
  "source": "Trapped in the Tropics",
  "page": 34,
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
  "source": "Trapped in the Tropics",
  "page": 34,
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
  "source": "Trapped in the Tropics",
  "page": 35
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
  "source": "Trapped in the Tropics",
  "page": 35
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
 }
];

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

