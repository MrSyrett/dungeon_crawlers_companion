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
    "caster": false,
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
  }
];
