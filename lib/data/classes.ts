// GENERATED FILE — do not edit by hand.
// Source: tools/templates/sd_character_sheet.html (RC_CLASSES, RC_CLASS_INFO, RC_TITLES)
// Regenerate with: node scripts/extract-game-data.mjs

export type SdClass = {
  name: string;
  hd: string;
  weapons: string;
  armor: string;
  talent: string[];
  talentBands: [number, number][] | null;
  features: string[];
  caster: boolean;
  optional: boolean;
  titles: { Lawful: string[]; Chaotic: string[]; Neutral: string[] } | null;
};

export const SD_CLASSES: SdClass[] = [
  {
    "name": "Fighter",
    "hd": "1d8",
    "weapons": "All weapons",
    "armor": "All armor and shields",
    "talent": [
      "Gain Weapon Mastery with one additional weapon type",
      "+1 to melee and ranged attacks",
      "+1 to melee and ranged attacks",
      "+1 to melee and ranged attacks",
      "+1 to melee and ranged attacks",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "Choose one armor type, get +1 AC from it",
      "Choose one armor type, get +1 AC from it",
      "Choose a talent or +2 stat points"
    ],
    "talentBands": null,
    "features": [
      "Hauler: Add CON modifier (if positive) to gear slots.",
      "Weapon Mastery: Choose a weapon type; +1 to attack and damage. Add half your level to these rolls.",
      "Grit: Choose STR or DEX; advantage on checks to overcome opposing force."
    ],
    "caster": false,
    "optional": false,
    "titles": {
      "Lawful": [
        "Squire",
        "Cavalier",
        "Knight",
        "Thane",
        "Lord/Lady"
      ],
      "Chaotic": [
        "Knave",
        "Bandit",
        "Slayer",
        "Reaver",
        "Warlord"
      ],
      "Neutral": [
        "Warrior",
        "Barbarian",
        "Battlerager",
        "Warchief",
        "Chieftain"
      ]
    }
  },
  {
    "name": "Priest",
    "hd": "1d6",
    "weapons": "Club, crossbow, dagger, mace, longsword, staff, warhammer",
    "armor": "All armor and shields",
    "talent": [
      "Gain advantage on casting one spell you know",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to priest spellcasting checks",
      "+1 to priest spellcasting checks",
      "+1 to priest spellcasting checks",
      "+1 to priest spellcasting checks",
      "+2 to Strength or Wisdom stat",
      "+2 to Strength or Wisdom stat",
      "Choose a talent or +2 stat points"
    ],
    "talentBands": null,
    "features": [
      "Turn Undead (bonus spell, does not count toward spell limit).",
      "Spellcasting (WIS). Know 2 tier 1 spells. Add spells per level.",
      "Languages: Celestial, Diabolic, or Primordial.",
      "Choose a Deity matching your alignment."
    ],
    "caster": true,
    "optional": false,
    "titles": {
      "Lawful": [
        "Acolyte",
        "Crusader",
        "Templar",
        "Champion",
        "Paladin"
      ],
      "Chaotic": [
        "Initiate",
        "Zealot",
        "Cultist",
        "Scourge",
        "Chaos Knight"
      ],
      "Neutral": [
        "Seeker",
        "Invoker",
        "Haruspex",
        "Mystic",
        "Oracle"
      ]
    }
  },
  {
    "name": "Thief",
    "hd": "1d4",
    "weapons": "Club, crossbow, dagger, shortbow, shortsword",
    "armor": "Leather armor, mithral chainmail",
    "talent": [
      "1/day, all attacks that would hit you this round miss instead",
      "Backstab deals +1 dice of damage",
      "Backstab deals +1 dice of damage",
      "Backstab deals +1 dice of damage",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+1 to melee and ranged attacks",
      "+1 to melee and ranged attacks",
      "Choose a talent or +2 stat points"
    ],
    "talentBands": null,
    "features": [
      "Backstab: Hit unaware target → extra weapon die damage + half level dice.",
      "Thievery: Advantage on climbing, sneaking, disguises, traps, locks, pickpocketing."
    ],
    "caster": false,
    "optional": false,
    "titles": {
      "Lawful": [
        "Footpad",
        "Burglar",
        "Rook",
        "Underboss",
        "Boss"
      ],
      "Chaotic": [
        "Thug",
        "Cutthroat",
        "Shadow",
        "Assassin",
        "Wraith"
      ],
      "Neutral": [
        "Robber",
        "Outlaw",
        "Rogue",
        "Renegade",
        "Bandit King/Queen"
      ]
    }
  },
  {
    "name": "Wizard",
    "hd": "1d4",
    "weapons": "Dagger, staff",
    "armor": "None",
    "talent": [
      "Make 1 random magic item (your choice of type)",
      "+2 to Intelligence stat or +1 to spellcasting checks",
      "+2 to Intelligence stat or +1 to spellcasting checks",
      "+2 to Intelligence stat or +1 to spellcasting checks",
      "+2 to Intelligence stat or +1 to spellcasting checks",
      "+2 to Intelligence stat or +1 to spellcasting checks",
      "Advantage on casting one spell you know",
      "Advantage on casting one spell you know",
      "Advantage on casting one spell you know",
      "Learn one additional wizard spell of any tier you know",
      "Learn one additional wizard spell of any tier you know",
      "Choose a talent or +2 stat points"
    ],
    "talentBands": null,
    "features": [
      "Spellcasting (INT). Know 3 tier 1 spells. Add spells per level.",
      "Learning Spells: Study scroll 1 day, DC 15 INT check to learn permanently.",
      "Languages: 2 additional common + 2 rare languages."
    ],
    "caster": true,
    "optional": false,
    "titles": {
      "Lawful": [
        "Apprentice",
        "Conjurer",
        "Arcanist",
        "Mage",
        "Archmage"
      ],
      "Chaotic": [
        "Adept",
        "Channeler",
        "Witch/Warlock",
        "Diabolist",
        "Sorcerer"
      ],
      "Neutral": [
        "Shaman",
        "Seer",
        "Warden",
        "Sage",
        "Druid"
      ]
    }
  },
  {
    "name": "Bard",
    "hd": "1d6",
    "weapons": "Crossbow, dagger, mace, shortbow, shortsword, spear, staff",
    "armor": "Leather armor, chainmail, shields",
    "talent": [
      "You find a random wand (you choose)",
      "+1 to melee/ranged attacks or +1 to Magical Dabbler rolls",
      "+1 to melee/ranged attacks or +1 to Magical Dabbler rolls",
      "+1 to melee/ranged attacks or +1 to Magical Dabbler rolls",
      "+1 to melee/ranged attacks or +1 to Magical Dabbler rolls",
      "+1 to melee/ranged attacks or +1 to Magical Dabbler rolls",
      "+2 points to any stats",
      "+2 points to any stats",
      "+2 points to any stats",
      "Presence effects become DC 9 to enact",
      "Presence effects become DC 9 to enact",
      "Choose a talent"
    ],
    "talentBands": null,
    "features": [
      "Bardic Arts: Advantage on oration, performing arts, lore, and diplomacy.",
      "Magical Dabbler: Activate scrolls/wands using CHA. Critical fail = wizard mishap.",
      "Presence (DC 12 CHA): Inspire (give luck token) or Fascinate (transfix targets ≤ lvl 4).",
      "Prolific: +1d6 to learning rolls. Groups with bards +1d6 to carousing.",
      "Languages: 4 additional common + 1 rare language."
    ],
    "caster": true,
    "optional": false,
    "titles": {
      "Lawful": [
        "Storyteller",
        "Balladeer",
        "Philosopher",
        "Poet",
        "Master Poet"
      ],
      "Chaotic": [
        "Guttersnipe",
        "Charlatan",
        "Satirist",
        "Silvertongue",
        "Doomspeaker"
      ],
      "Neutral": [
        "Seeker",
        "Witness",
        "Speaker",
        "Voice",
        "Truthbearer"
      ]
    }
  },
  {
    "name": "Ranger",
    "hd": "1d8",
    "weapons": "Dagger, longbow, longsword, shortbow, shortsword, spear, staff",
    "armor": "Leather armor, chainmail",
    "talent": [
      "You deal d12 damage with one weapon type you choose",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+2 to Strength, Dexterity, or Intelligence stat",
      "+2 to Strength, Dexterity, or Intelligence stat",
      "+2 to Strength, Dexterity, or Intelligence stat",
      "+2 to Strength, Dexterity, or Intelligence stat",
      "ADV on Herbalism checks for a remedy you choose",
      "ADV on Herbalism checks for a remedy you choose",
      "Choose a talent or +2 stat points"
    ],
    "talentBands": null,
    "features": [
      "Wayfinder: Advantage on Navigation, Tracking, Bushcraft, Stealth, Wild animal checks.",
      "Herbalism (INT check): Prepare a herbal remedy. Remedies expire in 3 rounds.",
      "  Salve (DC 11): Heals 1 HP.",
      "  Stimulant (DC 12): You can't be surprised for 10 rounds.",
      "  Foebane (DC 13): ADV on attacks and damage against one creature type you choose for 1d6 rounds.",
      "  Restorative (DC 14): Ends one poison or disease.",
      "  Curative (DC 15): Equivalent to a Potion of Healing."
    ],
    "caster": false,
    "optional": false,
    "titles": {
      "Lawful": [
        "Wanderer",
        "Strider",
        "Warden",
        "Guardian",
        "Sentinel"
      ],
      "Chaotic": [
        "Hood",
        "Outlaw",
        "Fugitive",
        "Exile",
        "Pariah"
      ],
      "Neutral": [
        "Stranger",
        "Wayfarer",
        "Outlander",
        "Recluse",
        "Hermit"
      ]
    }
  },
  {
    "name": "Witch",
    "hd": "1d4",
    "weapons": "Dagger, staff",
    "armor": "Leather armor",
    "talent": [
      "1/day, teleport to your familiar's location as a move",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "Gain advantage on casting one spell you know",
      "Gain advantage on casting one spell you know",
      "Gain advantage on casting one spell you know",
      "Learn an additional witch spell of any tier you can cast",
      "Learn an additional witch spell of any tier you can cast",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": [
      [
        2,
        2
      ],
      [
        3,
        7
      ],
      [
        8,
        9
      ],
      [
        10,
        11
      ],
      [
        12,
        12
      ]
    ],
    "features": [
      "Familiar: A small animal (raven, rat, frog) serves you loyally and speaks Common. It can be the source of your spells — treat it as you for spell ranges. If it dies, restore it by permanently sacrificing 1d4 HP.",
      "Spellcasting (CHA). Know 3 tier 1 witch spells. DC is 10 + spell tier. Add spells per level.",
      "Languages: Diabolic, Primordial, Sylvan."
    ],
    "caster": true,
    "optional": true,
    "titles": {
      "Lawful": [
        "Fortune Teller",
        "Far Seer",
        "Prophet",
        "Wise One",
        "Baba"
      ],
      "Chaotic": [
        "Whisperer",
        "Hexer",
        "Hag/Elder",
        "Crone/Uncle",
        "Baba"
      ],
      "Neutral": [
        "Shaman",
        "Conjurer",
        "Soothsayer",
        "Conduit",
        "Baba"
      ]
    }
  },
  {
    "name": "Pit Fighter",
    "hd": "1d8",
    "weapons": "All weapons",
    "armor": "Leather armor, shields",
    "talent": [
      "1/day, ignore all damage and effects from one attack",
      "You gain +1 to melee weapon damage",
      "You gain +1 to melee weapon damage",
      "You gain +1 to melee weapon damage",
      "You gain +1 to melee weapon damage",
      "You gain +1 to melee weapon damage",
      "+2 to Strength or Constitution stat, or +1 to melee attacks",
      "+2 to Strength or Constitution stat, or +1 to melee attacks",
      "+2 to Strength or Constitution stat, or +1 to melee attacks",
      "Increase the HP you gain from Flourish by 1d6",
      "Increase the HP you gain from Flourish by 1d6",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Flourish: 3/day, regain 1d6 HP when you hit an enemy with a melee attack.",
      "Implacable: Advantage on Constitution checks to resist injury, poison, or endure extreme environments.",
      "Last Stand: You get up from dying with 1 HP on a natural d20 roll of 18-20.",
      "Relentless: 3/day, when reduced to 0 HP, make a DC 18 Constitution check (Implacable applies). On a success, you go to 1 HP instead."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Rookie",
        "Gladiator",
        "Hero",
        "Champion",
        "Legend"
      ],
      "Chaotic": [
        "Ruffian",
        "Brawler",
        "Heel",
        "Villain",
        "Legend"
      ],
      "Neutral": [
        "Underdog",
        "Dark Horse",
        "Wild Card",
        "Victor",
        "Legend"
      ]
    }
  },
  {
    "name": "Knight of St. Ydris",
    "hd": "1d6",
    "weapons": "All melee weapons, crossbow",
    "armor": "All armor and shields",
    "talent": [
      "Your Demonic Possession bonus increases by 1 point",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "+2 to Charisma stat or +1 to witch spellcasting checks",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Demonic Possession: 3/day, gain a +1 bonus to your damage rolls that lasts 3 rounds. In addition, add half your level to the damage bonus (round down).",
      "Spellcasting (CHA): Cast witch spells you know. Beginning at level 3, learn new witch spells per the Witch Spells Known table. DC is 10 + the spell's tier.",
      "Languages: Diabolic."
    ],
    "caster": true,
    "optional": true,
    "titles": {
      "Lawful": [
        "Arbiter",
        "Enforcer",
        "Knight Marshal",
        "Judge",
        "Justiciar"
      ],
      "Chaotic": [
        "Traitor",
        "Fallen",
        "Oathbreaker",
        "Blackguard",
        "Demonlord"
      ],
      "Neutral": [
        "Brother/Sister",
        "Exorcist",
        "Reverend Knight",
        "Inquisitor",
        "Grand Inquisitor"
      ]
    }
  },
  {
    "name": "Warlock",
    "hd": "1d6",
    "weapons": "Club, crossbow, dagger, mace, longsword",
    "armor": "Leather armor, chainmail, and shields",
    "talent": [
      "Roll a Patron Boon from any patron; an unexplained gift",
      "Add +1 point to two stats (they must be different)",
      "Add +1 point to two stats (they must be different)",
      "Add +1 point to two stats (they must be different)",
      "Add +1 point to two stats (they must be different)",
      "Add +1 point to two stats (they must be different)",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "+1 to melee or ranged attacks",
      "Roll two Patron Boons and choose one to keep",
      "Roll two Patron Boons and choose one to keep",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Patron: Choose a patron to serve (Mugdulblub, Titania, or The Willowman) — the source of your supernatural gifts. Your patron may grant or withhold its gifts at any time.",
      "Patron Boon: At 1st level, gain a random Patron Boon talent from your patron's table. Whenever you gain a new talent roll, you may roll on your Patron Boon table instead of the Warlock Talents table.",
      "Languages: Choose one — Celestial, Diabolic, Draconic, Primordial, or Sylvan."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Favored",
        "Herald",
        "Eminent",
        "Exalted",
        "Incarnation"
      ],
      "Chaotic": [
        "Marked",
        "Zealot",
        "Occultist",
        "Champion",
        "Harbinger"
      ],
      "Neutral": [
        "Chosen",
        "Channeler",
        "Prophesied",
        "Transcendent",
        "Avatar"
      ]
    }
  },
  {
    "name": "Desert Rider",
    "hd": "1d8",
    "weapons": "Club, dagger, javelin, longsword, pike, shortbow, scimitar, spear, whip",
    "armor": "Leather armor, shields",
    "talent": [
      "You can use any rider-bearing creature as your mount",
      "You gain +1 to attacks or damage",
      "You gain +1 to attacks or damage",
      "You gain +1 to attacks or damage",
      "You gain +1 to attacks or damage",
      "You gain +1 to attacks or damage",
      "+2 to Strength or Dexterity stat, or +1 to melee attacks",
      "+2 to Strength or Dexterity stat, or +1 to melee attacks",
      "+2 to Strength or Dexterity stat, or +1 to melee attacks",
      "Gain an additional use of your Charge talent each day",
      "Gain an additional use of your Charge talent each day",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Charge: 3/day, charge into combat by moving at least near before attacking; your melee attacks deal double damage that round.",
      "Mount: You have a common camel or horse with a reliable or lovely demeanor. It comes when you call and never spooks. While riding, you and your mount gain a bonus to AC equal to half your level (round down); your mount has additional levels equal to half your level. You may leap on or off once per round."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Outrider",
        "Sandrunner",
        "Trailblazer",
        "Swift Wind",
        "Stormrunner"
      ],
      "Chaotic": [
        "Bandit",
        "Robber",
        "Raider",
        "Scourge",
        "Bandit King/Queen"
      ],
      "Neutral": [
        "Rat",
        "Fox",
        "Wolf",
        "Tiger",
        "Dragon"
      ]
    }
  },
  {
    "name": "Ras-Godai",
    "hd": "1d6",
    "weapons": "Blowgun, bolas, dagger, razor chain, scimitar, shuriken, spear",
    "armor": "Leather armor",
    "talent": [
      "You are trained in the use of poisons",
      "Roll an additional talent on the Black Lotus Talents table",
      "Roll an additional talent on the Black Lotus Talents table",
      "Roll an additional talent on the Black Lotus Talents table",
      "Roll an additional talent on the Black Lotus Talents table",
      "Roll an additional talent on the Black Lotus Talents table",
      "+2 to Strength or Dexterity stat, or +1 to melee attacks",
      "+2 to Strength or Dexterity stat, or +1 to melee attacks",
      "+2 to Strength or Dexterity stat, or +1 to melee attacks",
      "Gain an additional use of your Smoke Step talent",
      "Gain an additional use of your Smoke Step talent",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Assassin: Advantage on checks to sneak and hide. Your attacks deal double damage against targets that are unaware of your presence.",
      "Smoke Step: 3/day, teleport to a location you can see within near. This does not use your action.",
      "Black Lotus: Roll one talent on the Black Lotus Talents table (d12)."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Acolyte",
        "Mirror Path",
        "Monk",
        "Master",
        "White Lotus"
      ],
      "Chaotic": [
        "Acolyte",
        "Shadow Path",
        "Monk",
        "Assassin",
        "Black Lotus"
      ],
      "Neutral": [
        "Acolyte",
        "Fire Path",
        "Monk",
        "Demon Blade",
        "Red Lotus"
      ]
    }
  },
  {
    "name": "Sea Wolf",
    "hd": "1d8",
    "weapons": "Dagger, greataxe, handaxe, longbow, longsword, spear",
    "armor": "Leather armor, chainmail, shields",
    "talent": [
      "1/day, go berserk: immune to damage for 3 rounds",
      "Your attacks deal +1 damage",
      "Your attacks deal +1 damage",
      "Your attacks deal +1 damage",
      "Your attacks deal +1 damage",
      "Your attacks deal +1 damage",
      "+2 to Strength or Constitution stat, or +1 to attacks",
      "+2 to Strength or Constitution stat, or +1 to attacks",
      "+2 to Strength or Constitution stat, or +1 to attacks",
      "Duality; choose two different Old Gods effects each day",
      "Duality; choose two different Old Gods effects each day",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Seafarer: Advantage on checks related to navigating and crewing boats.",
      "Old Gods: After each rest, choose one — Odin (regain 1d4 HP each time you kill an enemy); Freya (once a day, gain a luck token if you have none; each luck token adds 1d6 to your roll); Loki (advantage on checks to lie, sneak, and hide).",
      "Shield Wall: If you wield a shield, use your action to take a defensive stance; your AC becomes 20 until your next turn."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Freefolk",
        "Shieldman/maiden",
        "Thane",
        "Jarl",
        "King/Queen"
      ],
      "Chaotic": [
        "Rabble",
        "Raider",
        "Reaver",
        "Conqueror",
        "Usurper"
      ],
      "Neutral": [
        "Wanderer",
        "Explorer",
        "Adventurer",
        "Renowned",
        "Legendary"
      ]
    }
  },
  {
    "name": "Seer",
    "hd": "1d6",
    "weapons": "Dagger, stave, spear",
    "armor": "Leather armor",
    "talent": [
      "Learn an additional seer spell from any tier you can cast",
      "Gain an additional use of your Omen talent each day",
      "Gain an additional use of your Omen talent each day",
      "Gain an additional use of your Omen talent each day",
      "Gain an additional use of your Omen talent each day",
      "Gain an additional use of your Omen talent each day",
      "+2 to WIS or CHA stat, or +1 to spellcasting checks",
      "+2 to WIS or CHA stat, or +1 to spellcasting checks",
      "+2 to WIS or CHA stat, or +1 to spellcasting checks",
      "Increase the die category of your Destined talent by one",
      "Increase the die category of your Destined talent by one",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Destined: Whenever you use a luck token, add 1d6 to the roll.",
      "Omen: 3/day, make a DC 9 WIS check. On a success, gain a luck token (you can't have more than one at a time).",
      "Spellcasting (WIS): Cast seer spells you know. Know one tier 1 seer spell to start; learn more per the Seer Spells Known table. DC is 10 + the spell's tier. On a natural 1, you can't cast that spell again until you complete Seer Penance."
    ],
    "caster": true,
    "optional": true,
    "titles": {
      "Lawful": [
        "Guide",
        "Chanter",
        "Rune Reader",
        "Wise One",
        "Seer of Odin"
      ],
      "Chaotic": [
        "Hedge Witch",
        "Whisperer",
        "Bone Reader",
        "Dreaded One",
        "Seer of Loki"
      ],
      "Neutral": [
        "Fortune Teller",
        "Singer",
        "Star Reader",
        "Blessed One",
        "Seer of Freya"
      ]
    }
  },
  {
    "name": "Basilisk Warrior",
    "hd": "1d8",
    "weapons": "Boomerang, club, dagger, spear, spear-thrower",
    "armor": "None",
    "talent": [
      "You find a basilisk egg; a loyal hatchling emerges in 1d4 days",
      "+1 to weapon attacks and damage",
      "+1 to weapon attacks and damage",
      "+1 to weapon attacks and damage",
      "+1 to weapon attacks and damage",
      "+1 to weapon attacks and damage",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+1 use per day of Petrifying Gaze",
      "+1 use per day of Petrifying Gaze",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Basilisk Blood: Advantage on Constitution checks to avoid harmful maladies, poisons, or afflictions.",
      "Petrifying Gaze: One creature of your level or less that meets your gaze must pass a DC 15 CON check or be petrified for 1d4 rounds (it still takes damage while petrified). Usable per day equal to your CON modifier (minimum 1).",
      "Stone Skin: Add 2 + half your level (round down) to your AC while unarmored. Advantage on checks to hide in natural environments."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Stone Warrior",
        "Strong Stone",
        "Protector",
        "Sun Serpent",
        "Amber Basilisk"
      ],
      "Chaotic": [
        "Stone Warrior",
        "Sharp Stone",
        "Slayer",
        "Moon Serpent",
        "Obsidian Basilisk"
      ],
      "Neutral": [
        "Stone Warrior",
        "Silent Stone",
        "Watcher",
        "Sky Serpent",
        "Sapphire Basilisk"
      ]
    }
  },
  {
    "name": "Delver",
    "hd": "1d6",
    "weapons": "Club, crossbow, dagger, javelin, mace, shortbow, shortsword, spear, staff",
    "armor": "Leather armor, chainmail, shields",
    "talent": [
      "You gain 2 gear slots and an additional Trusty Gear",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+1 to melee or ranged attacks and damage",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "+2 to Strength, Dexterity, or Constitution stat",
      "Add one more point to your Scavenger success range",
      "Add one more point to your Scavenger success range",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Languages: You know two additional common languages.",
      "Scavenger: When you expend the last of a consumable item carried since your last rest, roll a d6. On a 5 or 6, you regain one use of that item.",
      "Trailblazer: Advantage on Climbing, Swimming, Foraging, understanding unknown languages, and avoiding or escaping natural terrain hazards.",
      "Trusty Gear: Choose one type of gear or weapon you can wield. Gain 1 + half your level (round down) on checks or attack rolls made with that type."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Explorer",
        "Researcher",
        "Antiquarian",
        "Archaeologist",
        "Professor"
      ],
      "Chaotic": [
        "Intruder",
        "Opportunist",
        "Larcenist",
        "Tomb Robber",
        "Defiler"
      ],
      "Neutral": [
        "Investigator",
        "Observer",
        "Pathfinder",
        "Trailblazer",
        "Pioneer"
      ]
    }
  },
  {
    "name": "Wyrdling",
    "hd": "1d6",
    "weapons": "Club, crossbow, dagger, pseudopod, shortbow, shortsword, spear",
    "armor": "Leather armor, chainmail, shields",
    "talent": [
      "Gain two new Corruption talents",
      "+2 to Strength, Dexterity, or Charisma stats",
      "+2 to Strength, Dexterity, or Charisma stats",
      "+2 to Strength, Dexterity, or Charisma stats",
      "+2 to Strength, Dexterity, or Charisma stats",
      "+2 to Strength, Dexterity, or Charisma stats",
      "Gain a new Corruption talent",
      "Gain a new Corruption talent",
      "Gain a new Corruption talent",
      "Gain +1 to attacks and damage rolls with your pseudopod",
      "Gain +1 to attacks and damage rolls with your pseudopod",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Languages: You know Primordial.",
      "Corruption: Roll one talent on the Corruption table (d10).",
      "Hideous Biology: You can stretch your body to fit through inch-wide cracks. It takes 3 rounds to pass through an obstacle this way.",
      "Pseudopod: Sprout a clawed pseudopod — melee, near range, 1d6 damage, Finesse (use STR or DEX)."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Chosen One",
        "Cursed",
        "Haunted",
        "Tortured",
        "Crazed One"
      ],
      "Chaotic": [
        "Chosen One",
        "Blessed",
        "Consecrated",
        "Revered",
        "Exalted One"
      ],
      "Neutral": [
        "Chosen One",
        "Seeker",
        "Listener",
        "Watcher",
        "Learned One"
      ]
    }
  },
  {
    "name": "Duelist",
    "hd": "1d8",
    "weapons": "Dagger, all swords",
    "armor": "Leather armor, mithral chainmail",
    "talent": [
      "1/day, all attacks that would hit you this round miss instead",
      "+1 to melee attacks and damage or +1 Parry per day",
      "+1 to melee attacks and damage or +1 Parry per day",
      "+1 to melee attacks and damage or +1 Parry per day",
      "+1 to melee attacks and damage or +1 Parry per day",
      "+1 to melee attacks and damage or +1 Parry per day",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+2 to Strength, Dexterity, or Charisma stat",
      "+2 to Strength, Dexterity, or Charisma stat",
      "Deal +1d6 damage when you hit with a Taunt attack",
      "Deal +1d6 damage when you hit with a Taunt attack",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": null,
    "features": [
      "Parry: 1/day, an attack of your choice that would hit you misses instead.",
      "Tale Spinner: Make a DC 15 CHA check; on a pass, strangers believe you are famous and important for the rest of your interaction. The same individual can't be fooled twice.",
      "Taunt: When an enemy misses you with an attack, you have advantage on attacks against that enemy next round."
    ],
    "caster": false,
    "optional": true,
    "titles": {
      "Lawful": [
        "Fencer",
        "Defender",
        "Mongoose",
        "Wolf",
        "Swordmaster"
      ],
      "Chaotic": [
        "Ruffian",
        "Heckler",
        "Viper",
        "Cobra",
        "Swordmaster"
      ],
      "Neutral": [
        "Student",
        "Challenger",
        "Mouser",
        "Panther",
        "Swordmaster"
      ]
    }
  },
  {
    "name": "Roustabout",
    "hd": "1d4",
    "weapons": "Club, dagger, hammer, staff",
    "armor": "Leather armor",
    "talent": [
      "+1 to any stat and roll another talent",
      "Gain the ability to wield a new weapon or armor",
      "Gain the ability to wield a new weapon or armor",
      "Gain the ability to wield a new weapon or armor",
      "Gain the ability to wield a new weapon or armor",
      "Gain the ability to wield a new weapon or armor",
      "+1 to any two stats (they can't be the same)",
      "+1 to any two stats (they can't be the same)",
      "+1 to any two stats (they can't be the same)",
      "Roll an extra hit points die this level",
      "Roll an extra hit points die this level",
      "Learn any spell of a tier equal to half your level rounded down (min 1). Cast it using that class's spellcasting stat"
    ],
    "talentBands": null,
    "features": [
      "Knowaguy: Advantage on checks related to interacting with commoners and sourcing favors.",
      "Lucksmith: Whenever another player uses your luck token, they have advantage on the new roll.",
      "Surprising Guts: When reduced to half your HP or lower, make a DC 12 Wisdom check. On a success, you have advantage on your next roll."
    ],
    "caster": false,
    "optional": true,
    "titles": null
  },
  {
    "name": "Necromancer",
    "hd": "1d6",
    "weapons": "Crossbow, dagger, longsword, scimitar, staff, stave",
    "armor": "Leather armor, chainmail",
    "talent": [
      "The next time you die, you may return to life with full HP",
      "+1 to your spellcasting checks or +1 to melee attacks",
      "+1 to your spellcasting checks or +1 to melee attacks",
      "+1 to your spellcasting checks or +1 to melee attacks",
      "+1 to your spellcasting checks or +1 to melee attacks",
      "+1 to your spellcasting checks or +1 to melee attacks",
      "+2 to Strength, Constitution, or Charisma stat",
      "+2 to Strength, Constitution, or Charisma stat",
      "+2 to Strength, Constitution, or Charisma stat",
      "Gain advantage on casting one spell you know",
      "Gain advantage on casting one spell you know",
      "Choose a talent or +2 points to distribute to stats"
    ],
    "talentBands": [
      [
        2,
        2
      ],
      [
        3,
        7
      ],
      [
        8,
        9
      ],
      [
        10,
        11
      ],
      [
        12,
        12
      ]
    ],
    "features": [
      "Death Sense: Sense the location and general nature of undead and dying creatures within near.",
      "River of Death: You do not die at 0 CON, and you roll a d6 for your death timer instead of a d4.",
      "Spellcasting (CHA): Cast necromancer spells you know. Know two tier 1 necromancer spells to start; learn more per the Necromancer Spells Known table. DC is 10 + the spell's tier."
    ],
    "caster": true,
    "optional": true,
    "titles": null
  }
];
