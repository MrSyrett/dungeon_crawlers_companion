// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
const DND_MONSTERS = [
  {
    "name": "Goblin",
    "size": "Small",
    "type": "Humanoid (Goblinoid)",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(leather armor, shield)",
    "hp": 7,
    "hpFormula": "7 (2d6)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 8,
      "DEX": 14,
      "CON": 10,
      "INT": 10,
      "WIS": 8,
      "CHA": 8
    },
    "skills": "Stealth +6",
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Common, Goblin",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Nimble Escape",
        "description": "As a bonus action on each of its turns, the goblin can slip away by taking the Disengage or Hide action."
      }
    ],
    "actions": [
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Goblin Boss",
    "size": "Small",
    "type": "Humanoid (Goblinoid)",
    "alignment": "Neutral Evil",
    "ac": 17,
    "acNote": "(chain shirt, shield)",
    "hp": 21,
    "hpFormula": "21 (6d6)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 14,
      "CON": 10,
      "INT": 10,
      "WIS": 8,
      "CHA": 10
    },
    "skills": "Stealth +6",
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Common, Goblin",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Nimble Escape",
        "description": "As a bonus action on each of its turns, the boss can take the Disengage or Hide action."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The goblin makes two attacks with its scimitar. The second attack is made with disadvantage."
      },
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ],
    "reactions": [
      {
        "name": "Redirect Attack",
        "description": "When a creature the boss can see targets it with an attack, the boss picks a goblin within 5 feet; the two swap places and that goblin becomes the target instead."
      }
    ],
    "group": "Humanoids",
    "source": "mm"
  },
  {
    "name": "Hobgoblin",
    "size": "Medium",
    "type": "Humanoid (Goblinoid)",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(chain mail, shield)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 12,
      "CON": 12,
      "INT": 10,
      "WIS": 10,
      "CHA": 9
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Goblin",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Martial Advantage",
        "description": "Once per turn, the hobgoblin deals an extra 7 (2d6) damage to a target it hits with a weapon attack if an ally of the hobgoblin is within 5 feet of that target and isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands."
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Bugbear",
    "size": "Medium",
    "type": "Humanoid (Goblinoid)",
    "alignment": "Chaotic Evil",
    "ac": 16,
    "acNote": "(hide armor, shield)",
    "hp": 27,
    "hpFormula": "27 (5d8 + 5)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 14,
      "CON": 13,
      "INT": 8,
      "WIS": 11,
      "CHA": 9
    },
    "skills": "Stealth +6, Survival +2",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Goblin",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Brute",
        "description": "The bugbear rolls one extra die of damage whenever it hits with a melee weapon (already included below)."
      },
      {
        "name": "Surprise Attack",
        "description": "If the bugbear catches a creature off guard in the first round of combat, that target takes an extra 7 (2d6) damage from any attack the bugbear lands against it."
      }
    ],
    "actions": [
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 9 (2d6 + 2) piercing damage in melee or 5 (1d6 + 2) piercing damage at range."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Kobold",
    "size": "Small",
    "type": "Humanoid (Kobold)",
    "alignment": "Lawful Evil",
    "ac": 12,
    "hp": 5,
    "hpFormula": "5 (2d6 - 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 7,
      "DEX": 15,
      "CON": 9,
      "INT": 8,
      "WIS": 7,
      "CHA": 8
    },
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "Common, Draconic",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the kobold has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Pack Tactics",
        "description": "The kobold attacks with advantage against any creature that has at least one of the kobold's allies within 5 feet of it and not incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "name": "Sling",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Orc",
    "size": "Medium",
    "type": "Humanoid (Orc)",
    "alignment": "Chaotic Evil",
    "ac": 13,
    "acNote": "(hide armor)",
    "hp": 15,
    "hpFormula": "15 (2d8 + 6)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 12,
      "CON": 16,
      "INT": 7,
      "WIS": 11,
      "CHA": 10
    },
    "skills": "Intimidation +2",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Orc",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aggressive",
        "description": "As a bonus action, the orc can dash straight toward an enemy it can see, moving up to its speed."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Orc War Chief",
    "size": "Medium",
    "type": "Humanoid (Orc)",
    "alignment": "Chaotic Evil",
    "ac": 16,
    "acNote": "(chain mail)",
    "hp": 93,
    "hpFormula": "93 (11d8 + 44)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 12,
      "CON": 18,
      "INT": 11,
      "WIS": 11,
      "CHA": 16
    },
    "savingThrows": "Str +6, Con +6, Wis +2",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Orc",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aggressive",
        "description": "As a bonus action, the war chief can rush up to its speed straight toward an enemy it can see."
      },
      {
        "name": "Gruumsh's Fury",
        "description": "The war chief's weapon attacks deal an extra 4 (1d8) damage, granted by its god of war (included below)."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The war chief makes two greataxe attacks, or two spear attacks."
      },
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) slashing damage plus 4 (1d8) slashing damage."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 7 (1d6 + 4) piercing damage plus 4 (1d8) piercing damage, or 8 (1d8 + 4) piercing damage plus 4 (1d8) piercing damage if used with two hands to make a melee attack."
      }
    ],
    "group": "Humanoids",
    "source": "mm"
  },
  {
    "name": "Gnoll",
    "size": "Medium",
    "type": "Humanoid (Gnoll)",
    "alignment": "Chaotic Evil",
    "ac": 15,
    "acNote": "(hide armor, shield)",
    "hp": 22,
    "hpFormula": "22 (5d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 12,
      "CON": 11,
      "INT": 6,
      "WIS": 10,
      "CHA": 7
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Gnoll",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Rampage",
        "description": "When it drops a creature to 0 hit points with a melee attack, the gnoll can use a bonus action to move up to half its speed and make a bite attack."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack."
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Bandit",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Non-Lawful",
    "ac": 12,
    "acNote": "(leather armor)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 12,
      "CON": 12,
      "INT": 10,
      "WIS": 10,
      "CHA": 10
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
      },
      {
        "name": "Light Crossbow",
        "description": "Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Bandit Captain",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Non-Lawful",
    "ac": 15,
    "acNote": "(studded leather)",
    "hp": 65,
    "hpFormula": "65 (10d8 + 20)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 16,
      "CON": 14,
      "INT": 14,
      "WIS": 11,
      "CHA": 14
    },
    "savingThrows": "Str +4, Dex +5, Wis +2",
    "skills": "Athletics +4, Deception +4",
    "senses": "Passive Perception 10",
    "languages": "Any two languages",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The captain makes three melee attacks: two with its scimitar and one with its dagger. Or it makes two ranged attacks with its daggers."
      },
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "name": "Dagger",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The captain adds 2 to its AC against one melee attack that would hit it, provided it can see the attacker and is wielding a melee weapon."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Guard",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 16,
    "acNote": "(chain shirt, shield)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 12,
      "CON": 12,
      "INT": 10,
      "WIS": 11,
      "CHA": 10
    },
    "skills": "Perception +2",
    "senses": "Passive Perception 12",
    "languages": "Any one language (usually Common)",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Knight",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 18,
    "acNote": "(plate armor)",
    "hp": 52,
    "hpFormula": "52 (8d8 + 16)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 11,
      "CON": 14,
      "INT": 11,
      "WIS": 11,
      "CHA": 15
    },
    "savingThrows": "Con +4, Wis +2",
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Brave",
        "description": "The knight has advantage on saving throws against being frightened."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The knight makes two melee attacks."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      },
      {
        "name": "Heavy Crossbow",
        "description": "Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage."
      },
      {
        "name": "Leadership (Recharges after a Short or Long Rest)",
        "description": "For 1 minute, the knight can utter a special command or warning whenever a nonhostile creature it can see within 30 feet makes an attack roll or saving throw; that creature adds a d4 to the roll, provided it can hear and understand the knight. The knight can use this only while not incapacitated, and a creature can benefit from just one Leadership die at a time."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The knight adds 2 to its AC against one melee attack that would hit it, provided it can see the attacker and is wielding a melee weapon."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Cultist",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Non-Good",
    "ac": 12,
    "acNote": "(leather armor)",
    "hp": 9,
    "hpFormula": "9 (2d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 12,
      "CON": 10,
      "INT": 10,
      "WIS": 11,
      "CHA": 10
    },
    "skills": "Deception +2, Religion +2",
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dark Devotion",
        "description": "The cultist's fanaticism grants it advantage on saving throws against being charmed or frightened."
      }
    ],
    "actions": [
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Cult Fanatic",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Non-Good",
    "ac": 13,
    "acNote": "(leather armor)",
    "hp": 33,
    "hpFormula": "33 (6d8 + 6)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 14,
      "CON": 12,
      "INT": 10,
      "WIS": 13,
      "CHA": 14
    },
    "skills": "Deception +4, Persuasion +4, Religion +2",
    "senses": "Passive Perception 11",
    "languages": "Any one language (usually Common)",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dark Devotion",
        "description": "The fanatic's zeal gives it advantage on saving throws against being charmed or frightened."
      },
      {
        "name": "Spellcasting",
        "description": "The fanatic is a 4th-level spellcaster using Wisdom (spell save DC 11, +3 to hit with spell attacks). It knows the following cleric spells: Cantrips — light, mage hand, thaumaturgy; 1st level (4 slots) — command, inflict wounds, shield of faith; 2nd level (3 slots) — hold person, spiritual weapon."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The fanatic makes two melee attacks."
      },
      {
        "name": "Dagger",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 4 (1d4 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Acolyte",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 10,
    "hp": 9,
    "hpFormula": "9 (2d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 10,
      "CON": 10,
      "INT": 10,
      "WIS": 14,
      "CHA": 11
    },
    "skills": "Medicine +4, Religion +2",
    "senses": "Passive Perception 12",
    "languages": "Any one language (usually Common)",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The acolyte is a 1st-level spellcaster using Wisdom (spell save DC 12, +4 to hit with spell attacks). It has access to the following cleric spells: Cantrips — light, sacred flame, thaumaturgy; 1st level (3 slots) — bless, cure wounds, sanctuary."
      }
    ],
    "actions": [
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Priest",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 13,
    "acNote": "(chain shirt)",
    "hp": 27,
    "hpFormula": "27 (5d8 + 5)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 10,
      "CON": 12,
      "INT": 13,
      "WIS": 16,
      "CHA": 13
    },
    "skills": "Medicine +7, Persuasion +3, Religion +4",
    "senses": "Passive Perception 13",
    "languages": "Any two languages",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Divine Eminence",
        "description": "As a bonus action, the priest can expend a spell slot to make its melee weapon strike sear with holy power, dealing an extra 10 (3d6) radiant damage on a hit. A slot of 2nd level or higher adds 1d6 for each level above 1st, up to 5d6."
      },
      {
        "name": "Spellcasting",
        "description": "The priest is a 5th-level spellcaster using Wisdom (spell save DC 13, +5 to hit with spell attacks). It has the following cleric spells prepared: Cantrips — light, sacred flame, thaumaturgy; 1st level (4 slots) — cure wounds, guiding bolt, sanctuary; 2nd level (3 slots) — lesser restoration, spiritual weapon; 3rd level (2 slots) — dispel magic, spirit guardians."
      }
    ],
    "actions": [
      {
        "name": "Mace",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Mage",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 12,
    "acNote": "(15 with mage armor)",
    "hp": 40,
    "hpFormula": "40 (9d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 9,
      "DEX": 14,
      "CON": 11,
      "INT": 17,
      "WIS": 12,
      "CHA": 11
    },
    "savingThrows": "Int +6, Wis +4",
    "skills": "Arcana +6, History +6",
    "senses": "Passive Perception 11",
    "languages": "Any four languages",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The mage is a 9th-level spellcaster using Intelligence (spell save DC 14, +6 to hit with spell attacks). It has the following wizard spells prepared: Cantrips — fire bolt, light, mage hand, prestidigitation; 1st level (4 slots) — detect magic, mage armor, magic missile, shield; 2nd level (3 slots) — misty step, suggestion; 3rd level (3 slots) — counterspell, fireball, fly; 4th level (3 slots) — greater invisibility, ice storm; 5th level (1 slot) — cone of cold."
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Archmage",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 12,
    "acNote": "(15 with mage armor)",
    "hp": 99,
    "hpFormula": "99 (18d8 + 18)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 14,
      "CON": 12,
      "INT": 20,
      "WIS": 15,
      "CHA": 16
    },
    "savingThrows": "Int +9, Wis +6",
    "skills": "Arcana +13, History +13",
    "damageResistances": "damage from spells; nonmagical bludgeoning, piercing, and slashing (from stoneskin)",
    "senses": "Passive Perception 12",
    "languages": "Any six languages",
    "cr": "12",
    "xp": 8400,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The archmage rolls with advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Spellcasting",
        "description": "The archmage is an 18th-level spellcaster using Intelligence (spell save DC 17, +9 to hit with spell attacks). It can cast disguise self and invisibility at will and has the following wizard spells prepared: Cantrips — fire bolt, light, mage hand, prestidigitation, shocking grasp; 1st level (4 slots) — detect magic, identify, mage armor, magic missile; 2nd level (3 slots) — detect thoughts, mirror image, misty step; 3rd level (3 slots) — counterspell, fly, lightning bolt; 4th level (3 slots) — banishment, fire shield, stoneskin; 5th level (3 slots) — cone of cold, scrying, wall of force; 6th level (1 slot) — globe of invulnerability; 7th level (1 slot) — teleport; 8th level (1 slot) — mind blank; 9th level (1 slot) — time stop."
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Assassin",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Non-Good",
    "ac": 15,
    "acNote": "(studded leather)",
    "hp": 78,
    "hpFormula": "78 (12d8 + 24)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 16,
      "CON": 14,
      "INT": 13,
      "WIS": 11,
      "CHA": 10
    },
    "savingThrows": "Dex +6, Int +4",
    "skills": "Acrobatics +6, Deception +3, Perception +3, Stealth +9",
    "damageResistances": "poison",
    "senses": "Passive Perception 13",
    "languages": "Thieves' cant plus any two languages",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Assassinate",
        "description": "During its first turn, the assassin has advantage on attack rolls against any creature that hasn't yet taken a turn. Any hit it scores against a surprised creature is a critical hit."
      },
      {
        "name": "Evasion",
        "description": "When subjected to an effect allowing a Dexterity save for half damage, the assassin takes no damage on a success and only half on a failure."
      },
      {
        "name": "Sneak Attack",
        "description": "Once per turn, the assassin deals an extra 14 (4d6) damage when it hits with a weapon attack while it has advantage, or when the target has an ally of the assassin within 5 feet and the assassin isn't at disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The assassin makes two shortsword attacks."
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and the target must succeed on a DC 15 Constitution saving throw or take 24 (7d6) poison damage, taking half as much on a success."
      },
      {
        "name": "Light Crossbow",
        "description": "Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 7 (1d8 + 3) piercing damage, and the target must succeed on a DC 15 Constitution saving throw or take 24 (7d6) poison damage, taking half as much on a success."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Berserker",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Chaotic",
    "ac": 13,
    "acNote": "(hide armor)",
    "hp": 67,
    "hpFormula": "67 (9d8 + 27)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 12,
      "CON": 17,
      "INT": 9,
      "WIS": 11,
      "CHA": 9
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Reckless",
        "description": "At the start of its turn, the berserker can throw caution aside to gain advantage on melee weapon attack rolls for the turn, but attack rolls against it also have advantage until its next turn."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Scout",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 13,
    "acNote": "(leather armor)",
    "hp": 16,
    "hpFormula": "16 (3d8 + 3)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 14,
      "CON": 12,
      "INT": 11,
      "WIS": 13,
      "CHA": 11
    },
    "skills": "Nature +4, Perception +5, Stealth +6, Survival +5",
    "senses": "Passive Perception 15",
    "languages": "Any one language (usually Common)",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Sight",
        "description": "The scout has advantage on Wisdom (Perception) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The scout makes two melee attacks or two ranged attacks."
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Spy",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 12,
    "hp": 27,
    "hpFormula": "27 (6d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 15,
      "CON": 10,
      "INT": 12,
      "WIS": 14,
      "CHA": 16
    },
    "skills": "Deception +5, Insight +4, Investigation +5, Perception +6, Persuasion +5, Sleight of Hand +4, Stealth +4",
    "senses": "Passive Perception 16",
    "languages": "Any two languages",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Cunning Action",
        "description": "On each of its turns, the spy can use a bonus action to take the Dash, Disengage, or Hide action."
      },
      {
        "name": "Sneak Attack",
        "description": "Once per turn, the spy deals an extra 7 (2d6) damage when it hits with a weapon attack while it has advantage, or when an ally is within 5 feet of the target and the spy isn't at disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The spy makes two melee attacks."
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Hand Crossbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Thug",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Non-Good",
    "ac": 11,
    "acNote": "(leather armor)",
    "hp": 32,
    "hpFormula": "32 (5d8 + 10)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 11,
      "CON": 14,
      "INT": 10,
      "WIS": 10,
      "CHA": 11
    },
    "skills": "Intimidation +2",
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The thug attacks with advantage against a creature that has at least one of the thug's allies within 5 feet of it and not incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The thug makes two melee attacks."
      },
      {
        "name": "Mace",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage."
      },
      {
        "name": "Heavy Crossbow",
        "description": "Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Tribal Warrior",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 12,
    "acNote": "(hide armor)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 11,
      "CON": 12,
      "INT": 8,
      "WIS": 11,
      "CHA": 8
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The warrior attacks with advantage against a creature that has at least one of its allies within 5 feet of it and not incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Veteran",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 17,
    "acNote": "(splint armor)",
    "hp": 58,
    "hpFormula": "58 (9d8 + 18)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 13,
      "CON": 14,
      "INT": 10,
      "WIS": 11,
      "CHA": 10
    },
    "skills": "Athletics +5, Perception +2",
    "senses": "Passive Perception 12",
    "languages": "Any one language (usually Common)",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The veteran makes two longsword attacks. If it has drawn its shortsword, it can also make one shortsword attack."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "name": "Heavy Crossbow",
        "description": "Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Commoner",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 10,
    "hp": 4,
    "hpFormula": "4 (1d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 10,
      "CON": 10,
      "INT": 10,
      "WIS": 10,
      "CHA": 10
    },
    "senses": "Passive Perception 10",
    "languages": "Any one language (usually Common)",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Noble",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 15,
    "acNote": "(breastplate)",
    "hp": 9,
    "hpFormula": "9 (2d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 12,
      "CON": 11,
      "INT": 12,
      "WIS": 14,
      "CHA": 16
    },
    "skills": "Deception +5, Insight +4, Persuasion +5",
    "senses": "Passive Perception 12",
    "languages": "Any two languages",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Rapier",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The noble adds 2 to its AC against one melee attack that would hit it, provided it can see the attacker and is wielding a melee weapon."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Druid",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 11,
    "acNote": "(16 with barkskin)",
    "hp": 27,
    "hpFormula": "27 (5d8 + 5)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 12,
      "CON": 13,
      "INT": 12,
      "WIS": 15,
      "CHA": 11
    },
    "skills": "Medicine +4, Nature +3, Perception +4",
    "senses": "Passive Perception 14",
    "languages": "Druidic plus any two languages",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The druid is a 4th-level spellcaster using Wisdom (spell save DC 12, +4 to hit with spell attacks). It has the following druid spells prepared: Cantrips — druidcraft, produce flame, shillelagh; 1st level (4 slots) — entangle, longstrider, speak with animals, thunderwave; 2nd level (3 slots) — animal messenger, barkskin."
      }
    ],
    "actions": [
      {
        "name": "Quarterstaff",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage, or 4 (1d8) bludgeoning damage if used with two hands, or 6 (1d8 + 2) if wielded with shillelagh."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Gladiator",
    "size": "Medium",
    "type": "Humanoid (any race)",
    "alignment": "Any Alignment",
    "ac": 16,
    "acNote": "(studded leather, shield)",
    "hp": 112,
    "hpFormula": "112 (15d8 + 45)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 16,
      "INT": 10,
      "WIS": 12,
      "CHA": 15
    },
    "savingThrows": "Str +7, Dex +5, Con +6",
    "skills": "Athletics +10, Intimidation +5",
    "senses": "Passive Perception 11",
    "languages": "Any one language (usually Common)",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Brave",
        "description": "The gladiator has advantage on saving throws against being frightened."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The gladiator makes three melee attacks or two ranged attacks."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. and range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack."
      },
      {
        "name": "Shield Bash",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 9 (2d4 + 4) bludgeoning damage. If the target is Medium or smaller, it must succeed on a DC 15 Strength saving throw or be knocked prone."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The gladiator adds 3 to its AC against one melee attack that would hit it, provided it can see the attacker and is wielding a melee weapon."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Lizardfolk",
    "size": "Medium",
    "type": "Humanoid (Lizardfolk)",
    "alignment": "Neutral",
    "ac": 15,
    "acNote": "(natural armor, shield)",
    "hp": 22,
    "hpFormula": "22 (4d8 + 4)",
    "speed": "30 ft., swim 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 10,
      "CON": 13,
      "INT": 7,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +3, Stealth +4, Survival +5",
    "senses": "Passive Perception 13",
    "languages": "Draconic",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The lizardfolk can hold its breath for up to 15 minutes."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The lizardfolk makes two melee attacks, each with a different weapon."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Heavy Club",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Spiked Shield",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Sahuagin",
    "size": "Medium",
    "type": "Humanoid (Sahuagin)",
    "alignment": "Lawful Evil",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 22,
    "hpFormula": "22 (4d8 + 4)",
    "speed": "30 ft., swim 40 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 11,
      "CON": 12,
      "INT": 12,
      "WIS": 13,
      "CHA": 9
    },
    "skills": "Perception +5",
    "senses": "Darkvision 120 ft., Passive Perception 15",
    "languages": "Sahuagin",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The sahuagin has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Limited Amphibiousness",
        "description": "The sahuagin can breathe both air and water, but it must submerge in water at least once every 4 hours to avoid suffocating."
      },
      {
        "name": "Shark Telepathy",
        "description": "The sahuagin can telepathically command any shark within 120 feet, using a limited range of instinctive commands."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The sahuagin makes two melee attacks: one with its bite and one with its claws or spear."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ],
    "group": "Humanoids",
    "source": "srd"
  },
  {
    "name": "Bullywug",
    "size": "Medium",
    "type": "Humanoid (Bullywug)",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(hide armor, shield)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "20 ft., swim 40 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 12,
      "CON": 13,
      "INT": 7,
      "WIS": 10,
      "CHA": 7
    },
    "skills": "Stealth +3",
    "senses": "Passive Perception 10",
    "languages": "Bullywug",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The bullywug can breathe air and water alike."
      },
      {
        "name": "Speak with Frogs and Toads",
        "description": "The bullywug can communicate simple ideas to frogs and toads through sounds and gestures."
      },
      {
        "name": "Swamp Camouflage",
        "description": "The bullywug has advantage on Dexterity (Stealth) checks made to hide in swampy terrain."
      },
      {
        "name": "Standing Leap",
        "description": "The bullywug's long jump is up to 20 feet and its high jump up to 10 feet, with or without a running start."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The bullywug makes two attacks: one with its bite and one with its spear."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      }
    ],
    "group": "Humanoids",
    "source": "mm"
  },
  {
    "name": "Kuo-toa",
    "size": "Medium",
    "type": "Humanoid (Kuo-toa)",
    "alignment": "Neutral Evil",
    "ac": 13,
    "acNote": "(natural armor, shield)",
    "hp": 18,
    "hpFormula": "18 (4d8)",
    "speed": "30 ft., swim 30 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 10,
      "CON": 11,
      "INT": 11,
      "WIS": 10,
      "CHA": 8
    },
    "skills": "Perception +4",
    "senses": "Darkvision 120 ft., Passive Perception 14",
    "languages": "Undercommon",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The kuo-toa can breathe both air and water."
      },
      {
        "name": "Otherworldly Perception",
        "description": "The kuo-toa can sense the presence of any creature within 30 feet that is invisible or on the Ethereal Plane. It can pinpoint such a creature that is moving."
      },
      {
        "name": "Slippery",
        "description": "The kuo-toa has advantage on ability checks and saving throws made to escape a grapple."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the kuo-toa has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The kuo-toa makes two melee attacks: one with its bite and one with its spear or unarmed strike."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
      },
      {
        "name": "Net",
        "description": "Ranged Weapon Attack: +2 to hit, range 5/15 ft., one Large or smaller creature. Hit: The target is restrained. A creature can free itself or another creature within reach with an action and a DC 10 Strength check, or by dealing 5 slashing damage to the net (AC 10)."
      }
    ],
    "reactions": [
      {
        "name": "Sticky Shield",
        "description": "When a creature misses the kuo-toa with a melee attack, the kuo-toa uses its shield's adhesive coating to try to catch the weapon. The attacker must succeed on a DC 11 Strength saving throw or the weapon sticks to the shield. If the weapon's wielder can't or won't let go, it is grappled while the weapon is stuck."
      }
    ],
    "group": "Humanoids",
    "source": "mm"
  },
  {
    "name": "Drow",
    "size": "Medium",
    "type": "Humanoid (Elf)",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(chain shirt)",
    "hp": 13,
    "hpFormula": "13 (3d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 14,
      "CON": 10,
      "INT": 11,
      "WIS": 11,
      "CHA": 12
    },
    "skills": "Perception +2, Stealth +4",
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "Elvish, Undercommon",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Fey Ancestry",
        "description": "The drow has advantage on saving throws against being charmed, and magic can't put it to sleep."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The drow's innate spellcasting ability is Charisma (spell save DC 11). It can innately cast the following spells, requiring no material components: at will — dancing lights; 1/day each — darkness, faerie fire."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the drow has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Hand Crossbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the save fails by 5 or more, the target also falls unconscious while poisoned this way, waking if it takes damage or another creature uses an action to shake it awake."
      }
    ],
    "group": "Humanoids",
    "source": "mm"
  },
  {
    "name": "Duergar",
    "size": "Medium",
    "type": "Humanoid (Dwarf)",
    "alignment": "Lawful Evil",
    "ac": 16,
    "acNote": "(scale mail, shield)",
    "hp": 26,
    "hpFormula": "26 (4d8 + 8)",
    "speed": "25 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 11,
      "CON": 14,
      "INT": 11,
      "WIS": 10,
      "CHA": 9
    },
    "damageResistances": "poison",
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Dwarvish, Undercommon",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Duergar Resilience",
        "description": "The duergar has advantage on saving throws against poison, spells, and illusions, as well as against being charmed or paralyzed."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the duergar has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Enlarge (Recharges after a Short or Long Rest)",
        "description": "For 1 minute, the duergar magically grows to Large along with anything it is wearing or carrying. While enlarged it has advantage on Strength checks and saves, and its weapon attacks deal an extra die of damage (included below)."
      },
      {
        "name": "War Pick",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, or 11 (2d8 + 2) piercing damage while enlarged."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 9 (2d6 + 2) piercing damage while enlarged."
      },
      {
        "name": "Invisibility (Recharges after a Short or Long Rest)",
        "description": "The duergar magically turns invisible until it attacks, casts a spell, or uses its Enlarge, or until its concentration ends (as if concentrating on a spell). Any equipment it wears or carries is invisible with it."
      }
    ],
    "group": "Humanoids",
    "source": "mm"
  },
  {
    "name": "Red Dragon Wyrmling",
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 75,
    "hpFormula": "75 (10d8 + 30)",
    "speed": "30 ft., climb 30 ft., fly 60 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 10,
      "CON": 17,
      "INT": 12,
      "WIS": 11,
      "CHA": 15
    },
    "savingThrows": "Dex +2, Con +5, Wis +2, Cha +4",
    "skills": "Perception +4, Stealth +2",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageImmunities": "fire",
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage plus 3 (1d6) fire damage."
      },
      {
        "name": "Fire Breath (Recharge 5–6)",
        "description": "The dragon exhales a torrent of flame in a 15-foot cone. Each creature in the area makes a DC 13 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Red Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 178,
    "hpFormula": "178 (17d10 + 85)",
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 10,
      "CON": 21,
      "INT": 14,
      "WIS": 11,
      "CHA": 19
    },
    "savingThrows": "Dex +4, Con +9, Wis +4, Cha +8",
    "skills": "Perception +8, Stealth +4",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 18",
    "languages": "Common, Draconic",
    "cr": "10",
    "xp": 5900,
    "proficiencyBonus": 4,
    "damageImmunities": "fire",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 3 (1d6) fire damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Fire Breath (Recharge 5–6)",
        "description": "The dragon exhales a torrent of flame in a 30-foot cone. Each creature in the area makes a DC 17 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Red Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 256,
    "hpFormula": "256 (19d12 + 133)",
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 27,
      "DEX": 10,
      "CON": 25,
      "INT": 16,
      "WIS": 13,
      "CHA": 21
    },
    "savingThrows": "Dex +6, Con +13, Wis +7, Cha +11",
    "skills": "Perception +13, Stealth +6",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 23",
    "languages": "Common, Draconic",
    "cr": "17",
    "xp": 18000,
    "proficiencyBonus": 6,
    "damageImmunities": "fire",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 19 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Fire Breath (Recharge 5–6)",
        "description": "The dragon exhales a torrent of flame in a 60-foot cone. Each creature in the area makes a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Ancient Red Dragon",
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 22,
    "acNote": "(natural armor)",
    "hp": 546,
    "hpFormula": "546 (28d20 + 252)",
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 30,
      "DEX": 10,
      "CON": 29,
      "INT": 18,
      "WIS": 15,
      "CHA": 23
    },
    "savingThrows": "Dex +7, Con +16, Wis +9, Cha +13",
    "skills": "Perception +16, Stealth +7",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 26",
    "languages": "Common, Draconic",
    "cr": "24",
    "xp": 62000,
    "proficiencyBonus": 7,
    "damageImmunities": "fire",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 21 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Fire Breath (Recharge 5–6)",
        "description": "The dragon exhales a torrent of flame in a 90-foot cone. Each creature in the area makes a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 feet must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Blue Dragon Wyrmling",
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 52,
    "hpFormula": "52 (8d8 + 16)",
    "speed": "30 ft., burrow 15 ft., fly 60 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 10,
      "CON": 15,
      "INT": 12,
      "WIS": 11,
      "CHA": 15
    },
    "savingThrows": "Dex +2, Con +4, Wis +2, Cha +4",
    "skills": "Perception +4, Stealth +2",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageImmunities": "lightning",
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage plus 3 (1d6) lightning damage."
      },
      {
        "name": "Lightning Breath (Recharge 5–6)",
        "description": "The dragon exhales a bolt of lightning in a 30-foot line that is 5 feet wide. Each creature in the area makes a DC 12 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Blue Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 152,
    "hpFormula": "152 (16d10 + 64)",
    "speed": "40 ft., burrow 20 ft., fly 80 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 10,
      "CON": 19,
      "INT": 14,
      "WIS": 13,
      "CHA": 17
    },
    "savingThrows": "Dex +4, Con +8, Wis +5, Cha +7",
    "skills": "Perception +9, Stealth +4",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 19",
    "languages": "Common, Draconic",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "damageImmunities": "lightning",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage plus 5 (1d10) lightning damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage."
      },
      {
        "name": "Lightning Breath (Recharge 5–6)",
        "description": "The dragon exhales a bolt of lightning in a 60-foot line that is 5 feet wide. Each creature in the area makes a DC 16 Dexterity saving throw, taking 55 (10d10) lightning damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Blue Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 225,
    "hpFormula": "225 (18d12 + 108)",
    "speed": "40 ft., burrow 30 ft., fly 80 ft.",
    "abilities": {
      "STR": 25,
      "DEX": 10,
      "CON": 23,
      "INT": 16,
      "WIS": 15,
      "CHA": 19
    },
    "savingThrows": "Dex +5, Con +11, Wis +7, Cha +9",
    "skills": "Perception +12, Stealth +5",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "cr": "16",
    "xp": 15000,
    "proficiencyBonus": 5,
    "damageImmunities": "lightning",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage plus 5 (1d10) lightning damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 17 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Lightning Breath (Recharge 5–6)",
        "description": "The dragon exhales a bolt of lightning in a 90-foot line that is 5 feet wide. Each creature in the area makes a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Ancient Blue Dragon",
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 22,
    "acNote": "(natural armor)",
    "hp": 481,
    "hpFormula": "481 (26d20 + 208)",
    "speed": "40 ft., burrow 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 29,
      "DEX": 10,
      "CON": 27,
      "INT": 18,
      "WIS": 17,
      "CHA": 21
    },
    "savingThrows": "Dex +7, Con +15, Wis +10, Cha +12",
    "skills": "Perception +17, Stealth +7",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "cr": "23",
    "xp": 50000,
    "proficiencyBonus": 7,
    "damageImmunities": "lightning",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage plus 11 (2d10) lightning damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 20 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Lightning Breath (Recharge 5–6)",
        "description": "The dragon exhales a bolt of lightning in a 120-foot line that is 5 feet wide. Each creature in the area makes a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 feet must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Green Dragon Wyrmling",
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 38,
    "hpFormula": "38 (7d8 + 7)",
    "speed": "30 ft., fly 60 ft., swim 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 12,
      "CON": 13,
      "INT": 14,
      "WIS": 11,
      "CHA": 13
    },
    "savingThrows": "Dex +3, Con +3, Wis +2, Cha +3",
    "skills": "Perception +4, Stealth +3",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 3 (1d6) poison damage."
      },
      {
        "name": "Poison Breath (Recharge 5–6)",
        "description": "The dragon exhales a cloud of poisonous gas in a 15-foot cone. Each creature in the area makes a DC 11 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Green Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 136,
    "hpFormula": "136 (16d10 + 48)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 12,
      "CON": 17,
      "INT": 16,
      "WIS": 13,
      "CHA": 15
    },
    "savingThrows": "Dex +4, Con +6, Wis +4, Cha +5",
    "skills": "Perception +7, Stealth +4, Deception +5",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 17",
    "languages": "Common, Draconic",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 7 (2d6) poison damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "name": "Poison Breath (Recharge 5–6)",
        "description": "The dragon exhales a cloud of poisonous gas in a 30-foot cone. Each creature in the area makes a DC 14 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Green Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 207,
    "hpFormula": "207 (18d12 + 90)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 12,
      "CON": 21,
      "INT": 18,
      "WIS": 15,
      "CHA": 17
    },
    "savingThrows": "Dex +6, Con +10, Wis +7, Cha +8",
    "skills": "Perception +12, Stealth +6, Insight +7, Persuasion +8, Deception +8",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "cr": "15",
    "xp": 13000,
    "proficiencyBonus": 5,
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) poison damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 16 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Poison Breath (Recharge 5–6)",
        "description": "The dragon exhales a cloud of poisonous gas in a 60-foot cone. Each creature in the area makes a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Ancient Green Dragon",
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Lawful Evil",
    "ac": 21,
    "acNote": "(natural armor)",
    "hp": 385,
    "hpFormula": "385 (22d20 + 154)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 27,
      "DEX": 12,
      "CON": 25,
      "INT": 20,
      "WIS": 17,
      "CHA": 19
    },
    "savingThrows": "Dex +8, Con +14, Wis +10, Cha +11",
    "skills": "Perception +17, Stealth +8, Insight +10, Persuasion +11, Deception +11",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27",
    "languages": "Common, Draconic",
    "cr": "22",
    "xp": 41000,
    "proficiencyBonus": 7,
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 10 (3d6) poison damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 22 (4d6 + 8) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 19 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Poison Breath (Recharge 5–6)",
        "description": "The dragon exhales a cloud of poisonous gas in a 90-foot cone. Each creature in the area makes a DC 22 Constitution saving throw, taking 77 (22d6) poison damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 feet must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Black Dragon Wyrmling",
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 33,
    "hpFormula": "33 (6d8 + 6)",
    "speed": "30 ft., fly 60 ft., swim 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 14,
      "CON": 13,
      "INT": 10,
      "WIS": 11,
      "CHA": 13
    },
    "savingThrows": "Dex +4, Con +3, Wis +2, Cha +3",
    "skills": "Perception +4, Stealth +4",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageImmunities": "acid",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) acid damage."
      },
      {
        "name": "Acid Breath (Recharge 5–6)",
        "description": "The dragon exhales a stream of acid in a 15-foot line that is 5 feet wide. Each creature in the area makes a DC 11 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Black Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 127,
    "hpFormula": "127 (15d10 + 45)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 14,
      "CON": 17,
      "INT": 12,
      "WIS": 11,
      "CHA": 15
    },
    "savingThrows": "Dex +5, Con +6, Wis +3, Cha +5",
    "skills": "Perception +6, Stealth +5",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16",
    "languages": "Common, Draconic",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "damageImmunities": "acid",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) acid damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "name": "Acid Breath (Recharge 5–6)",
        "description": "The dragon exhales a stream of acid in a 30-foot line that is 5 feet wide. Each creature in the area makes a DC 14 Dexterity saving throw, taking 49 (11d8) acid damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Black Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 195,
    "hpFormula": "195 (17d12 + 85)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 14,
      "CON": 21,
      "INT": 14,
      "WIS": 13,
      "CHA": 17
    },
    "savingThrows": "Dex +7, Con +10, Wis +6, Cha +8",
    "skills": "Perception +11, Stealth +7",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "cr": "14",
    "xp": 11500,
    "proficiencyBonus": 5,
    "damageImmunities": "acid",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 16 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Acid Breath (Recharge 5–6)",
        "description": "The dragon exhales a stream of acid in a 60-foot line that is 5 feet wide. Each creature in the area makes a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Ancient Black Dragon",
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 22,
    "acNote": "(natural armor)",
    "hp": 367,
    "hpFormula": "367 (21d20 + 147)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 27,
      "DEX": 14,
      "CON": 25,
      "INT": 16,
      "WIS": 15,
      "CHA": 19
    },
    "savingThrows": "Dex +9, Con +14, Wis +9, Cha +11",
    "skills": "Perception +16, Stealth +9",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 26",
    "languages": "Common, Draconic",
    "cr": "21",
    "xp": 33000,
    "proficiencyBonus": 7,
    "damageImmunities": "acid",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 19 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Acid Breath (Recharge 5–6)",
        "description": "The dragon exhales a stream of acid in a 90-foot line that is 5 feet wide. Each creature in the area makes a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 feet must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "White Dragon Wyrmling",
    "size": "Medium",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 32,
    "hpFormula": "32 (5d8 + 10)",
    "speed": "30 ft., burrow 15 ft., fly 60 ft., swim 30 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 10,
      "CON": 14,
      "INT": 5,
      "WIS": 10,
      "CHA": 11
    },
    "savingThrows": "Dex +2, Con +4, Wis +2, Cha +2",
    "skills": "Perception +4, Stealth +2",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 14",
    "languages": "Draconic",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageImmunities": "cold",
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) cold damage."
      },
      {
        "name": "Cold Breath (Recharge 5–6)",
        "description": "The dragon exhales a blast of freezing air in a 15-foot cone. Each creature in the area makes a DC 12 Constitution saving throw, taking 22 (5d8) cold damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young White Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 133,
    "hpFormula": "133 (14d10 + 56)",
    "speed": "40 ft., burrow 20 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 10,
      "CON": 18,
      "INT": 6,
      "WIS": 11,
      "CHA": 12
    },
    "savingThrows": "Dex +3, Con +7, Wis +3, Cha +4",
    "skills": "Perception +6, Stealth +3",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16",
    "languages": "Common, Draconic",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "damageImmunities": "cold",
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) cold damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "name": "Cold Breath (Recharge 5–6)",
        "description": "The dragon exhales a blast of freezing air in a 30-foot cone. Each creature in the area makes a DC 15 Constitution saving throw, taking 45 (10d8) cold damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult White Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 200,
    "hpFormula": "200 (16d12 + 96)",
    "speed": "40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 22,
      "DEX": 10,
      "CON": 22,
      "INT": 8,
      "WIS": 12,
      "CHA": 12
    },
    "savingThrows": "Dex +5, Con +11, Wis +6, Cha +6",
    "skills": "Perception +11, Stealth +5",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "damageImmunities": "cold",
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) cold damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 14 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Cold Breath (Recharge 5–6)",
        "description": "The dragon exhales a blast of freezing air in a 60-foot cone. Each creature in the area makes a DC 19 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Ancient White Dragon",
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Chaotic Evil",
    "ac": 20,
    "acNote": "(natural armor)",
    "hp": 333,
    "hpFormula": "333 (18d20 + 144)",
    "speed": "40 ft., burrow 40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 26,
      "DEX": 10,
      "CON": 26,
      "INT": 10,
      "WIS": 13,
      "CHA": 14
    },
    "savingThrows": "Dex +6, Con +14, Wis +7, Cha +8",
    "skills": "Perception +13, Stealth +6",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 23",
    "languages": "Common, Draconic",
    "cr": "20",
    "xp": 25000,
    "proficiencyBonus": 6,
    "damageImmunities": "cold",
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) cold damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 16 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Cold Breath (Recharge 5–6)",
        "description": "The dragon exhales a blast of freezing air in a 90-foot cone. Each creature in the area makes a DC 22 Constitution saving throw, taking 72 (16d8) cold damage on a failed save, or half as much on a success."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 feet must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Gold Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 178,
    "hpFormula": "178 (17d10 + 85)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 14,
      "CON": 21,
      "INT": 16,
      "WIS": 13,
      "CHA": 20
    },
    "savingThrows": "Dex +6, Con +9, Wis +5, Cha +9",
    "skills": "Perception +9, Stealth +6, Insight +5, Persuasion +9",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 19",
    "languages": "Common, Draconic",
    "cr": "10",
    "xp": 5900,
    "proficiencyBonus": 4,
    "damageImmunities": "fire",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nFire Breath: A 30-foot cone of fire damage; DC 17 Dexterity save for 55 (10d10) fire, half on a success.\nWeakening Breath: A 30-foot cone; DC 17 Strength save or disadvantage on Strength-based attacks, checks, and saves for 1 minute (save ends)."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Gold Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 256,
    "hpFormula": "256 (19d12 + 133)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 27,
      "DEX": 14,
      "CON": 25,
      "INT": 16,
      "WIS": 15,
      "CHA": 24
    },
    "savingThrows": "Dex +8, Con +13, Wis +8, Cha +13",
    "skills": "Perception +14, Stealth +8, Insight +8, Persuasion +13",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 24",
    "languages": "Common, Draconic",
    "cr": "17",
    "xp": 18000,
    "proficiencyBonus": 6,
    "damageImmunities": "fire",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 21 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nFire Breath: A 60-foot cone of fire damage; DC 21 Dexterity save for 66 (12d10) fire, half on a success.\nWeakening Breath: A 60-foot cone; DC 21 Strength save or disadvantage on Strength-based attacks, checks, and saves for 1 minute (save ends)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Silver Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 168,
    "hpFormula": "168 (16d10 + 80)",
    "speed": "40 ft., fly 80 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 10,
      "CON": 21,
      "INT": 14,
      "WIS": 11,
      "CHA": 19
    },
    "savingThrows": "Dex +4, Con +9, Wis +4, Cha +8",
    "skills": "Perception +8, Stealth +4, Arcana +6, History +6",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 18",
    "languages": "Common, Draconic",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "damageImmunities": "cold",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nCold Breath: A 30-foot cone of cold damage; DC 17 Constitution save for 54 (12d8) cold, half on a success.\nParalyzing Breath: A 30-foot cone; DC 17 Constitution save or paralyzed for 1 minute (save ends at end of each turn)."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Silver Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 243,
    "hpFormula": "243 (18d12 + 126)",
    "speed": "40 ft., fly 80 ft.",
    "abilities": {
      "STR": 27,
      "DEX": 10,
      "CON": 25,
      "INT": 16,
      "WIS": 13,
      "CHA": 21
    },
    "savingThrows": "Dex +5, Con +12, Wis +6, Cha +10",
    "skills": "Perception +11, Stealth +5, Arcana +8, History +8",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "cr": "16",
    "xp": 15000,
    "proficiencyBonus": 5,
    "damageImmunities": "cold",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 18 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nCold Breath: A 60-foot cone of cold damage; DC 20 Constitution save for 58 (13d8) cold, half on a success.\nParalyzing Breath: A 60-foot cone; DC 20 Constitution save or paralyzed for 1 minute (save ends at end of each turn)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Bronze Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 142,
    "hpFormula": "142 (15d10 + 60)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 10,
      "CON": 19,
      "INT": 14,
      "WIS": 13,
      "CHA": 17
    },
    "savingThrows": "Dex +3, Con +7, Wis +4, Cha +6",
    "skills": "Perception +7, Stealth +3, Insight +4",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 17",
    "languages": "Common, Draconic",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "damageImmunities": "lightning",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nLightning Breath: A 60-foot line of lightning damage; DC 15 Dexterity save for 55 (10d10) lightning, half on a success.\nRepulsion Breath: A 30-foot cone; DC 15 Strength save or pushed 60 feet away from the dragon on a failed save."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Bronze Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Lawful Good",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 212,
    "hpFormula": "212 (17d12 + 102)",
    "speed": "40 ft., fly 80 ft., swim 40 ft.",
    "abilities": {
      "STR": 25,
      "DEX": 10,
      "CON": 23,
      "INT": 16,
      "WIS": 15,
      "CHA": 19
    },
    "savingThrows": "Dex +5, Con +11, Wis +7, Cha +9",
    "skills": "Perception +12, Stealth +5, Insight +7",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "cr": "15",
    "xp": 13000,
    "proficiencyBonus": 5,
    "damageImmunities": "lightning",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 17 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nLightning Breath: A 90-foot line of lightning damage; DC 19 Dexterity save for 66 (12d10) lightning, half on a success.\nRepulsion Breath: A 30-foot cone; DC 19 Strength save or pushed 60 feet away from the dragon on a failed save."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Brass Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 110,
    "hpFormula": "110 (13d10 + 39)",
    "speed": "40 ft., burrow 20 ft., fly 80 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 10,
      "CON": 17,
      "INT": 12,
      "WIS": 11,
      "CHA": 15
    },
    "savingThrows": "Dex +3, Con +6, Wis +3, Cha +5",
    "skills": "Perception +6, Stealth +3, Persuasion +5",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16",
    "languages": "Common, Draconic",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "damageImmunities": "fire",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nFire Breath: A 40-foot line of fire damage; DC 14 Dexterity save for 42 (12d6) fire, half on a success.\nSleep Breath: A 30-foot cone; DC 14 Constitution save or falls unconscious for 1 minute; the sleep ends if it takes damage or someone rouses it."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Brass Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 172,
    "hpFormula": "172 (15d12 + 75)",
    "speed": "40 ft., burrow 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 10,
      "CON": 21,
      "INT": 14,
      "WIS": 13,
      "CHA": 17
    },
    "savingThrows": "Dex +5, Con +10, Wis +6, Cha +8",
    "skills": "Perception +11, Stealth +5, History +7, Persuasion +8",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21",
    "languages": "Common, Draconic",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "damageImmunities": "fire",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 16 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nFire Breath: A 60-foot line of fire damage; DC 18 Dexterity save for 45 (13d6) fire, half on a success.\nSleep Breath: A 60-foot cone; DC 18 Constitution save or falls unconscious for 1 minute; the sleep ends if it takes damage or someone rouses it."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Young Copper Dragon",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 119,
    "hpFormula": "119 (14d10 + 42)",
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 12,
      "CON": 17,
      "INT": 16,
      "WIS": 13,
      "CHA": 15
    },
    "savingThrows": "Dex +4, Con +6, Wis +4, Cha +5",
    "skills": "Perception +7, Stealth +4, Deception +5",
    "senses": "Blindsight 30 ft., Darkvision 120 ft., Passive Perception 17",
    "languages": "Common, Draconic",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "damageImmunities": "acid",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nAcid Breath: A 40-foot line of acid damage; DC 14 Dexterity save for 40 (9d8) acid, half on a success.\nSlowing Breath: A 30-foot cone; DC 14 Constitution save or its speed is halved and it can't take reactions; on its turn it may act or move, not both (save ends after 1 minute)."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Adult Copper Dragon",
    "size": "Huge",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 184,
    "hpFormula": "184 (16d12 + 80)",
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 12,
      "CON": 21,
      "INT": 18,
      "WIS": 15,
      "CHA": 17
    },
    "savingThrows": "Dex +6, Con +10, Wis +7, Cha +8",
    "skills": "Perception +12, Stealth +6, Deception +8",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22",
    "languages": "Common, Draconic",
    "cr": "14",
    "xp": 11500,
    "proficiencyBonus": 5,
    "damageImmunities": "acid",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead. It can do this three times per day."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon uses its Frightful Presence, then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice within 120 feet that can sense the dragon must make a DC 16 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. On a success, or when the effect ends, that creature is immune to this dragon's Frightful Presence for 24 hours."
      },
      {
        "name": "Breath Weapons (Recharge 5–6)",
        "description": "The dragon uses one of these breath weapons.\nAcid Breath: A 60-foot line of acid damage; DC 18 Dexterity save for 54 (12d8) acid, half on a success.\nSlowing Breath: A 60-foot cone; DC 18 Constitution save or its speed is halved and it can't take reactions; on its turn it may act or move, not both (save ends after 1 minute)."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes one tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 feet must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Pseudodragon",
    "size": "Tiny",
    "type": "Dragon",
    "alignment": "Neutral Good",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 7,
    "hpFormula": "7 (2d4 + 2)",
    "speed": "15 ft., fly 60 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 15,
      "CON": 13,
      "INT": 10,
      "WIS": 12,
      "CHA": 10
    },
    "skills": "Perception +3, Stealth +4",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 13",
    "languages": "understands Common and Draconic but can't speak",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Senses",
        "description": "The pseudodragon has advantage on Wisdom (Perception) checks that rely on sight, hearing, or smell."
      },
      {
        "name": "Magic Resistance",
        "description": "The creature rolls with advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Limited Telepathy",
        "description": "The pseudodragon can telepathically share simple ideas, emotions, and images with any creature within 100 feet that can understand a language."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Wyvern",
    "size": "Large",
    "type": "Dragon",
    "alignment": "Unaligned",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 110,
    "hpFormula": "110 (13d10 + 39)",
    "speed": "20 ft., fly 80 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 10,
      "CON": 16,
      "INT": 5,
      "WIS": 12,
      "CHA": 6
    },
    "skills": "Perception +4",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "—",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The wyvern makes two attacks: one with its bite and one with its stinger. While flying, it can use its claws in place of one other attack."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "name": "Stinger",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage. The target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Dragon Turtle",
    "size": "Gargantuan",
    "type": "Dragon",
    "alignment": "Neutral",
    "ac": 20,
    "acNote": "(natural armor)",
    "hp": 341,
    "hpFormula": "341 (22d20 + 110)",
    "speed": "20 ft., swim 40 ft.",
    "abilities": {
      "STR": 25,
      "DEX": 10,
      "CON": 20,
      "INT": 10,
      "WIS": 12,
      "CHA": 12
    },
    "savingThrows": "Dex +6, Con +11, Wis +7",
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Aquan, Draconic",
    "cr": "17",
    "xp": 18000,
    "proficiencyBonus": 6,
    "damageResistances": "fire",
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe both air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon turtle makes three attacks: one with its bite and two with its claws. It can make one tail attack in place of its two claw attacks."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 16 (2d8 + 7) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be pushed up to 10 feet away from the dragon turtle and knocked prone."
      },
      {
        "name": "Steam Breath (Recharge 5–6)",
        "description": "The dragon turtle exhales a cloud of scalding steam in a 60-foot cone. Each creature in the area makes a DC 18 Constitution saving throw, taking 52 (15d6) fire damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Dragons",
    "source": "srd"
  },
  {
    "name": "Faerie Dragon",
    "size": "Tiny",
    "type": "Dragon",
    "alignment": "Chaotic Good",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 14,
    "hpFormula": "14 (4d4 + 4)",
    "speed": "10 ft., fly 60 ft.",
    "abilities": {
      "STR": 3,
      "DEX": 19,
      "CON": 12,
      "INT": 14,
      "WIS": 11,
      "CHA": 16
    },
    "skills": "Arcana +4, Perception +2, Stealth +6",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Draconic, telepathy 60 ft.",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Limited Telepathy",
        "description": "The faerie dragon can telepathically share simple ideas, emotions, and images with any creature within 100 feet that can understand a language."
      },
      {
        "name": "Magic Resistance",
        "description": "The faerie dragon rolls with advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Superior Invisibility",
        "description": "As a bonus action the faerie dragon can turn invisible, taking whatever it is wearing or carrying with it. The invisibility lasts while it maintains focus, as though concentrating on a spell."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The faerie dragon casts spells using Charisma (save DC 13). It can innately cast a handful of cantrips at will, such as dancing lights, mage hand, and minor illusion, and knows a few 1st-level tricks it can cast once each per day; its exact repertoire grows with age and coloration."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      },
      {
        "name": "Euphoria Breath (Recharge 5–6)",
        "description": "The faerie dragon breathes a puff of euphoria gas in a 15-foot cone. Each creature there must succeed on a DC 11 Wisdom saving throw or be overcome by giddy euphoria for 1 minute: it can't take reactions and, on each of its turns, acts unpredictably rather than as it intends. An affected creature repeats the save at the end of each of its turns, ending the effect on itself on a success."
      }
    ],
    "group": "Dragons",
    "source": "mm"
  },
  {
    "name": "Skeleton",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "ac": 13,
    "acNote": "(armor scraps)",
    "hp": 13,
    "hpFormula": "13 (2d8 + 4)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 14,
      "CON": 15,
      "INT": 6,
      "WIS": 8,
      "CHA": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "understands the languages it knew in life but can't speak",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "damageVulnerabilities": "bludgeoning",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Poisoned",
    "traits": [],
    "actions": [
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Warhorse Skeleton",
    "size": "Large",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "ac": 13,
    "acNote": "(barding scraps)",
    "hp": 22,
    "hpFormula": "22 (3d10 + 6)",
    "speed": "60 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 12,
      "CON": 15,
      "INT": 2,
      "WIS": 8,
      "CHA": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "damageVulnerabilities": "bludgeoning",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Poisoned",
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Minotaur Skeleton",
    "size": "Large",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 67,
    "hpFormula": "67 (9d10 + 18)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 11,
      "CON": 15,
      "INT": 6,
      "WIS": 8,
      "CHA": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "understands Abyssal but can't speak",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageVulnerabilities": "bludgeoning",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Poisoned",
    "traits": [
      {
        "name": "Charge",
        "description": "If the skeleton rushes at least 10 feet in a straight line and then gores a target on the same turn, the strike carries an extra 9 (2d8) piercing damage. A Large or smaller target that is hit must also succeed on a DC 14 Strength save or be knocked prone."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage."
      },
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Zombie",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 8,
    "hp": 22,
    "hpFormula": "22 (3d8 + 9)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 6,
      "CON": 16,
      "INT": 3,
      "WIS": 6,
      "CHA": 5
    },
    "savingThrows": "Wis +0",
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "understands the languages it knew in life but can't speak",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "When damage would drop the zombie to 0 hit points, it makes a Constitution save (DC 5 plus the damage taken) unless the blow was radiant or a critical hit. On a success it clings to unlife with 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Ogre Zombie",
    "size": "Large",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 8,
    "hp": 85,
    "hpFormula": "85 (9d10 + 36)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 6,
      "CON": 18,
      "INT": 3,
      "WIS": 6,
      "CHA": 5
    },
    "savingThrows": "Wis +0",
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "understands Common and Giant but can't speak",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "When damage would drop the zombie to 0 hit points, it makes a Constitution save (DC 5 plus the damage taken) unless the blow was radiant or a critical hit. On a success it stays standing with 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Ghoul",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "hp": 22,
    "hpFormula": "22 (5d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 15,
      "CON": 10,
      "INT": 7,
      "WIS": 10,
      "CHA": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Exhaustion, Poisoned",
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage. A creature that isn't an elf or undead must succeed on a DC 10 Constitution save or be paralyzed for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Ghast",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 13,
    "hp": 36,
    "hpFormula": "36 (8d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 17,
      "CON": 10,
      "INT": 11,
      "WIS": 10,
      "CHA": 8
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageResistances": "necrotic",
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Exhaustion, Poisoned",
    "traits": [
      {
        "name": "Stench",
        "description": "The reek of decay clings to the ghast. Any creature that starts its turn within 5 feet must succeed on a DC 10 Constitution save or be poisoned until the start of its next turn. A creature that saves is immune to this ghast's stench for 24 hours."
      },
      {
        "name": "Turn Defiance",
        "description": "The ghast and any ghouls within 30 feet of it have advantage on saves against effects that turn undead."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 12 (2d8 + 3) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. A creature that isn't an elf or undead must succeed on a DC 10 Constitution save or be paralyzed for 1 minute, repeating the save at the end of each of its turns."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Wight",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 14,
    "acNote": "(studded leather)",
    "hp": 45,
    "hpFormula": "45 (6d8 + 18)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 14,
      "CON": 16,
      "INT": 10,
      "WIS": 13,
      "CHA": 15
    },
    "skills": "Perception +3, Stealth +4",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "the languages it knew in life",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageResistances": "necrotic; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Poisoned",
    "traits": [
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the wight attacks with disadvantage and makes Wisdom (Perception) checks that rely on sight with disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The wight makes two longsword attacks or two longbow attacks. It can substitute one Life Drain for one of these attacks."
      },
      {
        "name": "Life Drain",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) necrotic damage. The target makes a DC 13 Constitution save; on a failure its hit point maximum drops by the damage dealt until it finishes a long rest, and it dies if this reduces its maximum to 0. A humanoid slain this way rises as a zombie under the wight's control the following midnight."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage, or 7 (1d10 + 2) slashing damage if wielded in two hands."
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Specter",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "hp": 22,
    "hpFormula": "22 (5d8)",
    "speed": "0 ft., fly 50 ft. (hover)",
    "abilities": {
      "STR": 1,
      "DEX": 14,
      "CON": 11,
      "INT": 10,
      "WIS": 10,
      "CHA": 11
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "understands the languages it knew in life but can't speak",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "damageResistances": "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious",
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The specter can drift through creatures and solid objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the specter attacks with disadvantage and makes sight-based Perception checks with disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Life Drain",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target makes a DC 10 Constitution save; on a failure its hit point maximum drops by the damage dealt until it finishes a long rest, and it dies if this reduces its maximum to 0."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Shadow",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "hp": 16,
    "hpFormula": "16 (3d8 + 3)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 14,
      "CON": 13,
      "INT": 6,
      "WIS": 10,
      "CHA": 8
    },
    "skills": "Stealth +4 (+6 in dim light or darkness)",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "damageResistances": "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "necrotic, poison",
    "damageVulnerabilities": "radiant",
    "conditionImmunities": "Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained",
    "traits": [
      {
        "name": "Amorphous",
        "description": "The shadow can squeeze through any opening as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Shadow Stealth",
        "description": "While in dim light or darkness, the shadow can take the Hide action as a bonus action."
      },
      {
        "name": "Sunlight Weakness",
        "description": "While in direct sunlight, the shadow has disadvantage on attack rolls, ability checks, and saving throws."
      }
    ],
    "actions": [
      {
        "name": "Strength Drain",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) necrotic damage, and the target's Strength score drops by 1d4 until it finishes a short or long rest. The target dies if this reduces its Strength to 0. A humanoid reduced to 0 Strength this way rises as a new shadow in 1d4 hours."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Wraith",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 13,
    "hp": 67,
    "hpFormula": "67 (9d8 + 27)",
    "speed": "0 ft., fly 60 ft. (hover)",
    "abilities": {
      "STR": 6,
      "DEX": 16,
      "CON": 16,
      "INT": 12,
      "WIS": 14,
      "CHA": 15
    },
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "the languages it knew in life",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageResistances": "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained",
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The wraith can pass through creatures and solid objects as if they were difficult terrain, taking 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the wraith attacks with disadvantage and makes sight-based Perception checks with disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Life Drain",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target makes a DC 14 Constitution save; on a failure its hit point maximum drops by the damage dealt until it finishes a long rest, and it dies if this reduces its maximum to 0."
      },
      {
        "name": "Create Specter",
        "description": "The wraith targets a humanoid that has died within the last minute and lies within 10 feet. The corpse rises as a specter under the wraith's command. The wraith can have no more than seven specters bound to it at once."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Ghost",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Any Alignment",
    "ac": 11,
    "hp": 45,
    "hpFormula": "45 (10d8)",
    "speed": "0 ft., fly 40 ft. (hover)",
    "abilities": {
      "STR": 7,
      "DEX": 13,
      "CON": 10,
      "INT": 10,
      "WIS": 12,
      "CHA": 17
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "the languages it knew in life",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageResistances": "acid, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "cold, necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained",
    "traits": [
      {
        "name": "Ethereal Sight",
        "description": "The ghost can see 60 feet into the Ethereal Plane while it is on the Material Plane, and vice versa."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The ghost can move through creatures and solid objects as difficult terrain, taking 5 (1d10) force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "name": "Withering Touch",
        "description": "Melee Spell Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) necrotic damage."
      },
      {
        "name": "Etherealness",
        "description": "The ghost steps onto the Ethereal Plane (or back to the Material Plane) from a region overlapping the Border Ethereal. While ethereal it can't affect or be affected by anything on the other plane."
      },
      {
        "name": "Horrifying Visage",
        "description": "Each non-undead creature within 60 feet that can see the ghost must succeed on a DC 13 Wisdom save or be frightened for 1 minute, repeating the save at the end of each of its turns. A creature that fails by 5 or more also ages 1d4 x 10 years. A target that saves is immune to this ghost's visage for 24 hours."
      },
      {
        "name": "Possession (Recharge 6)",
        "description": "One humanoid within 5 feet that the ghost can see must succeed on a DC 13 Charisma save or be possessed; the ghost vanishes into the target and controls its body while keeping its own alignment and mental scores. The target repeats the save whenever it takes damage and at the end of the ghost's turns."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Poltergeist",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "hp": 22,
    "hpFormula": "22 (5d8)",
    "speed": "0 ft., fly 50 ft. (hover)",
    "abilities": {
      "STR": 1,
      "DEX": 14,
      "CON": 11,
      "INT": 10,
      "WIS": 10,
      "CHA": 11
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "understands the languages it knew in life but can't speak",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageResistances": "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious",
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The poltergeist can drift through creatures and solid objects as difficult terrain, taking 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Invisibility",
        "description": "The poltergeist is invisible, revealing itself only in the moment it hurls an object or lashes out."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "In direct sunlight the poltergeist attacks with disadvantage and makes sight-based Perception checks with disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Forceful Slam",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) force damage."
      },
      {
        "name": "Telekinetic Thrust",
        "description": "The poltergeist hurls a loose object of up to 5 pounds at a target within 30 feet. Ranged Weapon Attack: +4 to hit. Hit: 10 (3d6) bludgeoning damage, and a Medium or smaller target must succeed on a DC 12 Strength save or be knocked prone."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Will-o'-Wisp",
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 19,
    "hp": 22,
    "hpFormula": "22 (9d4)",
    "speed": "0 ft., fly 50 ft. (hover)",
    "abilities": {
      "STR": 1,
      "DEX": 28,
      "CON": 10,
      "INT": 13,
      "WIS": 14,
      "CHA": 11
    },
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "the languages it knew in life",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageResistances": "acid, cold, fire, necrotic, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "lightning, poison",
    "conditionImmunities": "Exhaustion, Grappled, Paralyzed, Poisoned, Prone, Restrained, Unconscious",
    "traits": [
      {
        "name": "Consume Life",
        "description": "As a bonus action the wisp can target a creature it can see within 5 feet that has 0 hit points but is still alive. The target makes a DC 10 Constitution save; on a failure it dies, and the wisp regains 10 (3d6) hit points."
      },
      {
        "name": "Ephemeral",
        "description": "The wisp is a mote of light and can't wear or carry anything."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The wisp can move through creatures and solid objects as difficult terrain, taking 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Variable Illumination",
        "description": "The wisp sheds bright light in a 5- to 20-foot radius and dim light for an equal distance beyond. As a bonus action it can widen, narrow, or extinguish this glow."
      }
    ],
    "actions": [
      {
        "name": "Shock",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d8) lightning damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Mummy",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "ac": 11,
    "acNote": "(natural armor)",
    "hp": 58,
    "hpFormula": "58 (9d8 + 18)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 8,
      "CON": 15,
      "INT": 6,
      "WIS": 10,
      "CHA": 12
    },
    "savingThrows": "Wis +2",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "the languages it knew in life",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageVulnerabilities": "fire",
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The mummy uses its Dreadful Glare and makes one Rotting Fist attack."
      },
      {
        "name": "Rotting Fist",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 10 (3d6) necrotic damage. The target must succeed on a DC 12 Constitution save or be cursed with mummy rot: it can't regain hit points, and its hit point maximum drops by 10 (3d6) each day at midnight. The curse lasts until removed by magic, and the victim crumbles to dust if reduced to 0 maximum hit points."
      },
      {
        "name": "Dreadful Glare",
        "description": "The mummy fixes its gaze on one creature it can see within 60 feet. The target must succeed on a DC 11 Wisdom save or be frightened until the end of the mummy's next turn; a creature that fails by 5 or more is also paralyzed for the same duration. A target that saves is immune to this mummy's glare for 24 hours."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Mummy Lord",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 97,
    "hpFormula": "97 (13d8 + 39)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 10,
      "CON": 17,
      "INT": 11,
      "WIS": 18,
      "CHA": 16
    },
    "savingThrows": "Con +8, Int +5, Wis +9, Cha +8",
    "skills": "History +5, Religion +5",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "the languages it knew in life",
    "cr": "15",
    "xp": 13000,
    "proficiencyBonus": 5,
    "damageVulnerabilities": "fire",
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The mummy lord has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Rejuvenation",
        "description": "As long as its preserved heart remains intact, a destroyed mummy lord reknits itself from dust within 24 hours and returns with full hit points near the heart."
      },
      {
        "name": "Spellcasting",
        "description": "The mummy lord casts as a priest of its buried faith (spell save DC 16, +8 to hit). It draws on cleric spells such as command, guiding bolt, hold person, spirit guardians, dispel magic, and insect plague."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The mummy lord uses its Dreadful Glare and makes one Rotting Fist attack."
      },
      {
        "name": "Rotting Fist",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage plus 21 (6d6) necrotic damage. The target must succeed on a DC 16 Constitution save or be cursed with mummy rot: it can't regain hit points, and its hit point maximum falls by 10 (3d6) each midnight until the curse is lifted or the victim crumbles to dust."
      },
      {
        "name": "Dreadful Glare",
        "description": "The mummy lord fixes its gaze on a creature within 60 feet. The target must succeed on a DC 16 Wisdom save or be frightened until the end of the mummy lord's next turn, and is also paralyzed for that time if it fails by 5 or more. A creature that saves is immune to this glare for 24 hours."
      }
    ],
    "legendaryActions": [
      {
        "name": "Attack",
        "description": "The mummy lord makes one Rotting Fist attack."
      },
      {
        "name": "Blinding Dust",
        "description": "Grave dust swirls around the mummy lord. Each creature within 5 feet must succeed on a DC 16 Constitution save or be blinded until the end of its next turn."
      },
      {
        "name": "Dread Command (Costs 2 Actions)",
        "description": "The mummy lord speaks a word of the tomb. Undead within 60 feet gain advantage on their next attack and move up to their speed toward a foe of the mummy lord's choice."
      },
      {
        "name": "Channel Negative Energy (Costs 2 Actions)",
        "description": "The mummy lord looses a wave of death. Each non-undead creature within 60 feet must make a DC 16 Constitution save, taking 21 (6d6) necrotic damage on a failure or half as much on a success."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Vampire",
    "size": "Medium",
    "type": "Undead (Shapechanger)",
    "alignment": "Lawful Evil",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 144,
    "hpFormula": "144 (17d8 + 68)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 18,
      "CON": 18,
      "INT": 17,
      "WIS": 15,
      "CHA": 18
    },
    "savingThrows": "Dex +9, Wis +7, Cha +9",
    "skills": "Perception +7, Stealth +9",
    "senses": "Darkvision 120 ft., Passive Perception 17",
    "languages": "the languages it knew in life",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "damageResistances": "necrotic; bludgeoning, piercing, and slashing from nonmagical attacks",
    "traits": [
      {
        "name": "Shapechanger",
        "description": "Unless it is in sunlight or running water, the vampire can use its action to become a Tiny bat or a cloud of mist, or to return to its true form. Its statistics are the same in bat form aside from its speed (5 ft., fly 30 ft.), and it can't attack or cast spells while misty."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Misty Escape",
        "description": "When it drops to 0 hit points outside sunlight or running water, the vampire dissolves into mist instead of being destroyed and must reach its resting place within 2 hours or be slain. Once there it reforms and regains consciousness after resting 1 hour with 1 hit point."
      },
      {
        "name": "Regeneration",
        "description": "The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point and is not in sunlight or running water. If it takes radiant damage or damage from holy water, this trait doesn't function at the start of its next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb sheer and inverted surfaces without an ability check, leaving its hands free."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The vampire can't enter a residence uninvited, is destroyed by piercing its heart with a wooden stake while incapacitated in its resting place, withers 20 (4d10) each turn it starts in running water, and if it starts its turn in sunlight it takes 20 (4d10) radiant damage and attacks and checks with disadvantage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack (Vampire Form Only)",
        "description": "The vampire makes two attacks, only one of which can be a bite."
      },
      {
        "name": "Unarmed Strike",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8 + 4) bludgeoning damage. Instead of dealing damage the vampire can grapple the target (escape DC 18)."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature or one that is grappled, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target's hit point maximum drops by the necrotic damage taken and the vampire regains that many hit points; the target dies if this reduces its maximum to 0, and a humanoid slain this way can rise as a vampire spawn under the vampire's control."
      },
      {
        "name": "Charm",
        "description": "The vampire targets one humanoid it can see within 30 feet. The target must succeed on a DC 17 Wisdom save or be charmed, regarding the vampire as a trusted friend and offering no resistance to its bite. The charm lasts 24 hours, until the vampire is destroyed, or until it takes an action to end it."
      },
      {
        "name": "Children of the Night (1/Day)",
        "description": "The vampire calls swarms of bats or rats, or a pack of wolves, that arrive in 1d4 rounds and obey its spoken commands for 1 hour."
      }
    ],
    "legendaryActions": [
      {
        "name": "Move",
        "description": "The vampire moves up to its speed without provoking opportunity attacks."
      },
      {
        "name": "Unarmed Strike",
        "description": "The vampire makes one Unarmed Strike."
      },
      {
        "name": "Bite (Costs 2 Actions)",
        "description": "The vampire makes one bite attack."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Vampire Spawn",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 82,
    "hpFormula": "82 (11d8 + 33)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 16,
      "CON": 16,
      "INT": 11,
      "WIS": 10,
      "CHA": 12
    },
    "savingThrows": "Dex +6, Wis +3",
    "skills": "Perception +3, Stealth +6",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "the languages it knew in life",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageResistances": "necrotic; bludgeoning, piercing, and slashing from nonmagical attacks",
    "traits": [
      {
        "name": "Regeneration",
        "description": "The spawn regains 10 hit points at the start of its turn if it has at least 1 hit point and is not in sunlight or running water. Radiant damage or damage from holy water suppresses this at the start of its next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The spawn can climb difficult surfaces, including upside down along ceilings, without an ability check."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The spawn can't enter a home uninvited, is destroyed by a wooden stake driven through its heart while it lies helpless in its resting place, withers 20 (4d10) each turn it starts in running water, and takes 20 (4d10) radiant damage while starting its turn in sunlight, attacking and checking with disadvantage that turn."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The spawn makes two attacks, only one of which can be a bite."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4 + 3) slashing damage. Instead of dealing damage the spawn can grapple the target (escape DC 13)."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one willing creature or one that is grappled, incapacitated, or restrained. Hit: 7 (1d6 + 3) piercing damage plus 7 (2d6) necrotic damage. The target's hit point maximum drops by the necrotic damage taken and the spawn regains that many hit points; the target dies if this reduces its maximum to 0."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Lich",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Any Evil Alignment",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 135,
    "hpFormula": "135 (18d8 + 54)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 16,
      "CON": 16,
      "INT": 20,
      "WIS": 14,
      "CHA": 16
    },
    "savingThrows": "Con +10, Int +12, Wis +9",
    "skills": "Arcana +18, History +12, Insight +9, Perception +9",
    "senses": "Truesight 120 ft., Passive Perception 19",
    "languages": "Common plus up to five other languages",
    "cr": "21",
    "xp": 33000,
    "proficiencyBonus": 7,
    "damageResistances": "cold, lightning, necrotic",
    "damageImmunities": "poison; bludgeoning, piercing, and slashing from nonmagical attacks",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the lich fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Rejuvenation",
        "description": "So long as its phylactery is intact, a destroyed lich gathers itself anew from the vessel's dark energy, forming a fresh body nearby within 1d10 days."
      },
      {
        "name": "Turn Resistance",
        "description": "The lich has advantage on saving throws against any effect that turns undead."
      },
      {
        "name": "Spellcasting",
        "description": "The lich casts as an archmage of vast learning (spell save DC 20, +12 to hit), with the full spell list of an 18th-level wizard including counterspell, fireball, dimension door, cloudkill, finger of death, and power word kill."
      }
    ],
    "actions": [
      {
        "name": "Paralyzing Touch",
        "description": "Melee Spell Attack: +12 to hit, reach 5 ft., one creature. Hit: 10 (3d6) cold damage, and the target must succeed on a DC 18 Constitution save or be paralyzed for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "legendaryActions": [
      {
        "name": "Cantrip",
        "description": "The lich casts one of its cantrips."
      },
      {
        "name": "Paralyzing Touch (Costs 2 Actions)",
        "description": "The lich uses its Paralyzing Touch."
      },
      {
        "name": "Frightening Gaze (Costs 2 Actions)",
        "description": "The lich fixes its gaze on a creature within 10 feet. The target must succeed on a DC 18 Wisdom save or be frightened for 1 minute, repeating the save at the end of each turn; a creature that saves is immune to this gaze for 24 hours."
      },
      {
        "name": "Disrupt Life (Costs 3 Actions)",
        "description": "The lich unleashes a pulse of death. Each non-undead creature within 20 feet must make a DC 18 Constitution save, taking 21 (6d6) necrotic damage on a failure or half as much on a success."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Death Knight",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 20,
    "acNote": "(plate, shield)",
    "hp": 180,
    "hpFormula": "180 (19d8 + 95)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 11,
      "CON": 20,
      "INT": 12,
      "WIS": 16,
      "CHA": 18
    },
    "savingThrows": "Dex +6, Wis +9, Cha +10",
    "senses": "Darkvision 120 ft., Passive Perception 13",
    "languages": "Abyssal, Common",
    "cr": "17",
    "xp": 18000,
    "proficiencyBonus": 6,
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Exhaustion, Frightened, Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The death knight has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Marshal Undead",
        "description": "Undead within 60 feet of the death knight that can hear it have advantage on saving throws against effects that turn undead."
      },
      {
        "name": "Spellcasting",
        "description": "The death knight casts as a fallen paladin (spell save DC 18, +10 to hit), calling on spells such as command, compelled duel, hold person, dispel magic, elemental weapon, and destructive wave."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The death knight makes three longsword attacks."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) slashing damage, or 10 (1d10 + 5) slashing damage if wielded in two hands, plus 18 (4d8) necrotic damage."
      },
      {
        "name": "Hellfire Orb (Recharge 5-6)",
        "description": "The death knight hurls a magical orb that bursts in a 20-foot-radius sphere at a point within 120 feet. Each creature in the area makes a DC 18 Dexterity save, taking 35 (10d6) fire damage and 35 (10d6) necrotic damage on a failure, or half as much on a success."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The death knight adds 6 to its AC against one melee attack that would hit it, provided it can see the attacker and is wielding a melee weapon."
      }
    ],
    "legendaryActions": [
      {
        "name": "Longsword Attack",
        "description": "The death knight makes one longsword attack."
      },
      {
        "name": "Grave Command (Costs 2 Actions)",
        "description": "The death knight commands the fallen. Each undead ally within 60 feet can immediately move up to its speed and make one weapon attack."
      },
      {
        "name": "Withering Presence (Costs 2 Actions)",
        "description": "Cold dread rolls off the death knight. Each living creature within 15 feet must succeed on a DC 18 Constitution save or take 10 (3d6) necrotic damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Revenant",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Neutral",
    "ac": 13,
    "acNote": "(leather armor)",
    "hp": 136,
    "hpFormula": "136 (16d8 + 64)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 14,
      "CON": 18,
      "INT": 13,
      "WIS": 16,
      "CHA": 18
    },
    "savingThrows": "Str +7, Con +7, Wis +6, Cha +7",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "the languages it knew in life",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageResistances": "necrotic, psychic",
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Poisoned, Stunned",
    "traits": [
      {
        "name": "Regeneration",
        "description": "The revenant regains 10 hit points at the start of its turn while it has at least 1 hit point. If it takes fire or radiant damage, this trait doesn't function on its next turn. The revenant is destroyed only if it starts its turn at 0 hit points and doesn't regenerate."
      },
      {
        "name": "Rejuvenation",
        "description": "When its body is destroyed, the revenant's soul lingers. After 24 hours it possesses another suitable corpse and reforms unless its sworn vengeance has been fulfilled, in which case it finally rests."
      },
      {
        "name": "Turn Immunity",
        "description": "The revenant is immune to effects that turn undead."
      },
      {
        "name": "Vengeful Tracker",
        "description": "The revenant always knows the direction and distance to the creature that wronged it, so long as both are on the same plane. It also senses when that foe uses a portal to leave the plane."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The revenant makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 4) bludgeoning damage. If the target is the revenant's sworn foe, the strike deals an extra 14 (4d6) bludgeoning damage. The revenant can forgo the extra damage to instead grapple the target (escape DC 14) with one hand."
      },
      {
        "name": "Vengeful Glare",
        "description": "The revenant fixes its gaze on a creature it can see within 30 feet that it has grappled or that has wronged it. The target must succeed on a DC 15 Wisdom save or be paralyzed until the end of the revenant's next turn; if the target is the sworn foe, it is also frightened while paralyzed."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Flameskull",
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 13,
    "hp": 40,
    "hpFormula": "40 (9d4 + 18)",
    "speed": "0 ft., fly 40 ft. (hover)",
    "abilities": {
      "STR": 1,
      "DEX": 17,
      "CON": 14,
      "INT": 16,
      "WIS": 10,
      "CHA": 11
    },
    "skills": "Arcana +5, Perception +2",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Common",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageResistances": "lightning, necrotic, piercing",
    "damageImmunities": "cold, fire, poison",
    "conditionImmunities": "Charmed, Frightened, Paralyzed, Poisoned, Prone",
    "traits": [
      {
        "name": "Illumination",
        "description": "Green flame wreathes the skull, shedding bright light in a 15-foot radius and dim light for another 15 feet."
      },
      {
        "name": "Magic Resistance",
        "description": "The flameskull has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Rejuvenation",
        "description": "If it is destroyed, the flameskull knits itself back together with full hit points within 1 hour unless holy water is sprinkled on its remains or a dispel magic is cast on them."
      },
      {
        "name": "Spellcasting",
        "description": "The flameskull casts as its living self once did (spell save DC 13, +5 to hit), keeping mage armor and blur active on itself and hurling flaming sphere and fireball at intruders."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The flameskull makes two Fire Ray attacks."
      },
      {
        "name": "Fire Ray",
        "description": "Ranged Spell Attack: +5 to hit, range 30 ft., one target. Hit: 10 (3d6) fire damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Bone Naga",
    "size": "Large",
    "type": "Undead",
    "alignment": "Lawful Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 58,
    "hpFormula": "58 (9d10 + 9)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 16,
      "CON": 12,
      "INT": 15,
      "WIS": 15,
      "CHA": 15
    },
    "savingThrows": "Dex +5, Con +3, Wis +4",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Common plus one other language",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Exhaustion, Paralyzed, Poisoned",
    "traits": [
      {
        "name": "Spellcasting",
        "description": "A bone naga raised from a spirit naga still commands its old arcane arts (spell save DC 12, +4 to hit), casting spells such as mage armor, ray of sickness, hold person, and lightning bolt from memory."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 10 ft., one creature. Hit: 10 (2d6 + 3) piercing damage plus 10 (3d6) poison damage."
      }
    ],
    "group": "Undead",
    "source": "mm"
  },
  {
    "name": "Banshee",
    "size": "Medium",
    "type": "Undead",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "hp": 58,
    "hpFormula": "58 (13d8)",
    "speed": "0 ft., fly 40 ft. (hover)",
    "abilities": {
      "STR": 1,
      "DEX": 14,
      "CON": 10,
      "INT": 12,
      "WIS": 11,
      "CHA": 17
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Common, Elvish",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageResistances": "acid, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "cold, necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained",
    "traits": [
      {
        "name": "Detect Life",
        "description": "The banshee can sense the presence and general location of any living creature within 5 miles, learning only that it is a living thing and roughly where it lies."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The banshee drifts through creatures and solid objects as difficult terrain, taking 5 (1d10) force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "name": "Corrupting Touch",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one target. Hit: 12 (3d6 + 2) necrotic damage."
      },
      {
        "name": "Wail (1/Day)",
        "description": "The banshee looses a mournful cry; it has no effect on constructs or undead. Every other creature within 30 feet that can hear it must make a DC 13 Constitution save. On a failure the target drops to 0 hit points; on a success it takes 10 (3d6) psychic damage."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Crawling Claw",
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 12,
    "hp": 2,
    "hpFormula": "2 (1d4)",
    "speed": "20 ft., climb 20 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 14,
      "CON": 11,
      "INT": 5,
      "WIS": 10,
      "CHA": 4
    },
    "senses": "Blindsight 30 ft. (blind beyond this radius), Passive Perception 10",
    "languages": "understands one language it knew in life but can't speak",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Exhaustion, Poisoned",
    "traits": [
      {
        "name": "Turn Immunity",
        "description": "The severed hand is immune to effects that turn undead."
      }
    ],
    "actions": [
      {
        "name": "Rotting Claw",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning or slashing damage, chosen by the claw as it strikes."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Demilich",
    "size": "Tiny",
    "type": "Undead",
    "alignment": "Neutral Evil",
    "ac": 20,
    "acNote": "(natural armor)",
    "hp": 80,
    "hpFormula": "80 (32d4)",
    "speed": "0 ft., fly 30 ft. (hover)",
    "abilities": {
      "STR": 1,
      "DEX": 20,
      "CON": 20,
      "INT": 20,
      "WIS": 17,
      "CHA": 20
    },
    "savingThrows": "Con +11, Int +11, Wis +9, Cha +11",
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "—",
    "cr": "18",
    "xp": 20000,
    "proficiencyBonus": 6,
    "damageResistances": "bludgeoning, piercing, and slashing from magical attacks",
    "damageImmunities": "necrotic, poison, psychic; bludgeoning, piercing, and slashing from nonmagical attacks",
    "conditionImmunities": "Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned, Prone, Stunned",
    "traits": [
      {
        "name": "Avoidance",
        "description": "If the demilich is subjected to an effect that allows a saving throw for half damage, it instead takes no damage on a success and only half on a failure."
      },
      {
        "name": "Legendary Resistance (3/Day)",
        "description": "If the demilich fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Rejuvenation",
        "description": "So long as trapped souls remain in its gem-studded skull, a destroyed demilich reforms as a heap of dust within 1d10 days and rebuilds itself into a skull once more."
      },
      {
        "name": "Turn Immunity",
        "description": "The demilich is immune to effects that turn undead."
      }
    ],
    "actions": [
      {
        "name": "Howl (Recharge 5-6)",
        "description": "The demilich emits a soul-rending shriek. Each creature within 30 feet that can hear it must make a DC 15 Constitution save. On a failure the target drops to 0 hit points; on a success it is frightened until the end of its next turn. Constructs and undead are unaffected."
      },
      {
        "name": "Life Drain",
        "description": "The demilich targets up to three creatures it can see within 10 feet. Each must succeed on a DC 19 Constitution save or take 21 (6d6) necrotic damage and have its hit point maximum reduced by that amount until it finishes a long rest. The demilich regains hit points equal to the total drained, and a creature dies if its maximum drops to 0."
      }
    ],
    "legendaryActions": [
      {
        "name": "Flight",
        "description": "The demilich flies up to half its flying speed without provoking opportunity attacks."
      },
      {
        "name": "Cloud of Dust",
        "description": "The demilich swirls a cloud of grave dust in a 10-foot-radius sphere centered on itself. Each creature in the area, including around corners, must succeed on a DC 15 Constitution save or be blinded until the end of the demilich's next turn."
      },
      {
        "name": "Energy Drain (Costs 2 Actions)",
        "description": "Each creature within 30 feet must make a DC 19 Constitution save, taking 21 (6d6) necrotic damage and having its hit point maximum reduced by that amount on a failure, or half damage with no reduction on a success."
      },
      {
        "name": "Vile Curse (Costs 3 Actions)",
        "description": "The demilich fixes one creature it can see within 30 feet with a curse. The target must succeed on a DC 19 Wisdom save or have disadvantage on attack rolls, ability checks, and saving throws for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "group": "Undead",
    "source": "srd"
  },
  {
    "name": "Wolf",
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 15,
      "CON": 12,
      "INT": 3,
      "WIS": 12,
      "CHA": 6
    },
    "skills": "Perception +3, Stealth +4",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Perception checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf attacks with advantage against any creature that has at least one of the wolf's allies within 5 feet of it and not incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength save or be knocked prone."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Dire Wolf",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 37,
    "hpFormula": "37 (5d10 + 10)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 15,
      "CON": 15,
      "INT": 3,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +3, Stealth +4",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The dire wolf has advantage on Perception checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The dire wolf attacks with advantage against a creature if at least one of its allies is within 5 feet of that creature and isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength save or be knocked prone."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Black Bear",
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 11,
    "acNote": "(natural armor)",
    "hp": 19,
    "hpFormula": "19 (3d8 + 6)",
    "speed": "40 ft., climb 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 10,
      "CON": 14,
      "INT": 2,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +3",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Perception checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Brown Bear",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 11,
    "acNote": "(natural armor)",
    "hp": 34,
    "hpFormula": "34 (4d10 + 12)",
    "speed": "40 ft., climb 30 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 10,
      "CON": 16,
      "INT": 2,
      "WIS": 13,
      "CHA": 7
    },
    "skills": "Perception +3",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Perception checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Spider",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 26,
    "hpFormula": "26 (4d10 + 4)",
    "speed": "30 ft., climb 30 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 16,
      "CON": 12,
      "INT": 2,
      "WIS": 11,
      "CHA": 4
    },
    "skills": "Stealth +7",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 10",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature also in contact with that web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 11 Constitution save, taking 9 (2d6) poison damage on a failure or half as much on a success. If the poison reduces the target to 0 hit points, it is stable but poisoned for 1 hour, and paralyzed while poisoned this way."
      },
      {
        "name": "Web",
        "description": "Ranged Weapon Attack (Recharge 5–6): +5 to hit, range 30/60 ft., one creature. Hit: The target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, freeing itself on a success. The webbing can also be attacked and destroyed (AC 10; HP 5; vulnerability to fire; immune to bludgeoning, poison, and psychic)."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Rat",
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 7,
    "hpFormula": "7 (2d6)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 7,
      "DEX": 15,
      "CON": 11,
      "INT": 2,
      "WIS": 10,
      "CHA": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "—",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Perception checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat attacks with advantage against a creature that has at least one of the rat's allies within 5 feet of it and not incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Rat",
    "size": "Tiny",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 10,
    "hp": 1,
    "hpFormula": "1 (1d4 − 1)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 2,
      "DEX": 11,
      "CON": 9,
      "INT": 2,
      "WIS": 10,
      "CHA": 4
    },
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "—",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Perception checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Boar",
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 11,
    "acNote": "(natural armor)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 11,
      "CON": 12,
      "INT": 2,
      "WIS": 9,
      "CHA": 5
    },
    "senses": "Passive Perception 9",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 feet straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage and must succeed on a DC 11 Strength save or be knocked prone."
      },
      {
        "name": "Relentless",
        "description": "Once per short or long rest, if damage would reduce the boar to 0 hit points but not kill it outright, it is left with 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Tusk",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Boar",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 42,
    "hpFormula": "42 (5d10 + 15)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 10,
      "CON": 16,
      "INT": 2,
      "WIS": 7,
      "CHA": 5
    },
    "senses": "Passive Perception 8",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 feet straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 7 (2d6) slashing damage and must succeed on a DC 13 Strength save or be knocked prone."
      },
      {
        "name": "Relentless",
        "description": "Once per short or long rest, if 10 or less damage would reduce the boar to 0 hit points but not kill it outright, it is left with 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Tusk",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Panther",
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 13,
    "hpFormula": "13 (3d8)",
    "speed": "50 ft., climb 40 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 15,
      "CON": 10,
      "INT": 3,
      "WIS": 14,
      "CHA": 7
    },
    "skills": "Perception +4, Stealth +6",
    "senses": "Passive Perception 14",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The panther has advantage on Perception checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the panther moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, the target must succeed on a DC 12 Strength save or be knocked prone. If the target is prone, the panther can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Lion",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 26,
    "hpFormula": "26 (4d10 + 4)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 15,
      "CON": 13,
      "INT": 3,
      "WIS": 12,
      "CHA": 8
    },
    "skills": "Perception +3, Stealth +6",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The lion has advantage on Perception checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The lion attacks with advantage against a creature that has at least one of the lion's allies within 5 feet of it and not incapacitated."
      },
      {
        "name": "Pounce",
        "description": "If the lion moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, the target must succeed on a DC 13 Strength save or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action."
      },
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, the lion can long jump up to 25 feet."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Tiger",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 37,
    "hpFormula": "37 (5d10 + 10)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 15,
      "CON": 14,
      "INT": 3,
      "WIS": 12,
      "CHA": 8
    },
    "skills": "Perception +3, Stealth +6",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The tiger has advantage on Perception checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, the target must succeed on a DC 13 Strength save or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Ape",
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 19,
    "hpFormula": "19 (3d8 + 6)",
    "speed": "30 ft., climb 30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 14,
      "CON": 14,
      "INT": 6,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Athletics +5, Perception +3",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ape makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Ape",
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 157,
    "hpFormula": "157 (15d12 + 60)",
    "speed": "40 ft., climb 40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 14,
      "CON": 18,
      "INT": 5,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Athletics +9, Perception +4",
    "senses": "Passive Perception 14",
    "languages": "—",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ape makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) bludgeoning damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 50/100 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Eagle",
    "size": "Large",
    "type": "Beast",
    "alignment": "Neutral Good",
    "ac": 13,
    "hp": 26,
    "hpFormula": "26 (4d10 + 4)",
    "speed": "10 ft., fly 80 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 17,
      "CON": 13,
      "INT": 8,
      "WIS": 14,
      "CHA": 10
    },
    "skills": "Perception +4",
    "senses": "Passive Perception 14",
    "languages": "Understands Common and Auran but can't speak them, Giant Eagle",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The eagle has advantage on Perception checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The eagle makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Eagle",
    "size": "Small",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 3,
    "hpFormula": "3 (1d6)",
    "speed": "10 ft., fly 60 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 15,
      "CON": 10,
      "INT": 2,
      "WIS": 14,
      "CHA": 7
    },
    "skills": "Perception +4",
    "senses": "Passive Perception 14",
    "languages": "—",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The eagle has advantage on Perception checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Constrictor Snake",
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 60,
    "hpFormula": "60 (8d12 + 8)",
    "speed": "30 ft., swim 30 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 14,
      "CON": 12,
      "INT": 1,
      "WIS": 10,
      "CHA": 3
    },
    "skills": "Perception +2",
    "senses": "Blindsight 10 ft., Passive Perception 12",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The snake makes two attacks: one with its bite and one to constrict."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage."
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Constrictor Snake",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 13,
    "hpFormula": "13 (2d10 + 2)",
    "speed": "30 ft., swim 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 14,
      "CON": 12,
      "INT": 1,
      "WIS": 10,
      "CHA": 3
    },
    "senses": "Blindsight 10 ft., Passive Perception 10",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Crocodile",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 19,
    "hpFormula": "19 (3d10 + 3)",
    "speed": "20 ft., swim 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 10,
      "CON": 13,
      "INT": 2,
      "WIS": 10,
      "CHA": 5
    },
    "skills": "Stealth +2",
    "senses": "Passive Perception 10",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 15 minutes."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Crocodile",
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 85,
    "hpFormula": "85 (9d12 + 27)",
    "speed": "30 ft., swim 50 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 9,
      "CON": 17,
      "INT": 2,
      "WIS": 10,
      "CHA": 7
    },
    "skills": "Stealth +5",
    "senses": "Passive Perception 10",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 30 minutes."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The crocodile makes two attacks: one with its bite and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (3d10 + 5) piercing damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the crocodile can't bite another target."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target not grappled by the crocodile. Hit: 14 (2d8 + 5) bludgeoning damage, and the target must succeed on a DC 16 Strength save or be knocked prone."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Rhinoceros",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 11,
    "acNote": "(natural armor)",
    "hp": 45,
    "hpFormula": "45 (6d10 + 12)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 8,
      "CON": 15,
      "INT": 2,
      "WIS": 12,
      "CHA": 6
    },
    "senses": "Passive Perception 11",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the rhinoceros moves at least 20 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) bludgeoning damage and must succeed on a DC 15 Strength save or be knocked prone."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Elephant",
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 76,
    "hpFormula": "76 (8d12 + 24)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 22,
      "DEX": 9,
      "CON": 17,
      "INT": 3,
      "WIS": 11,
      "CHA": 6
    },
    "senses": "Passive Perception 10",
    "languages": "—",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the elephant moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, the target must succeed on a DC 12 Strength save or be knocked prone. If the target is prone, the elephant can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) piercing damage."
      },
      {
        "name": "Stomp",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Mammoth",
    "size": "Huge",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 126,
    "hpFormula": "126 (11d12 + 55)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 24,
      "DEX": 9,
      "CON": 21,
      "INT": 3,
      "WIS": 11,
      "CHA": 6
    },
    "senses": "Passive Perception 10",
    "languages": "—",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the mammoth moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, the target must succeed on a DC 18 Strength save or be knocked prone. If the target is prone, the mammoth can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 25 (4d8 + 7) piercing damage."
      },
      {
        "name": "Stomp",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one prone creature. Hit: 29 (4d10 + 7) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Giant Scorpion",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 52,
    "hpFormula": "52 (7d10 + 14)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 13,
      "CON": 15,
      "INT": 1,
      "WIS": 9,
      "CHA": 3
    },
    "senses": "Blindsight 60 ft., Passive Perception 9",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The scorpion makes three attacks: two with its claws and one with its sting."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 12). The scorpion has two claws, each of which can grapple only one target."
      },
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 12 Constitution save, taking 22 (4d10) poison damage on a failure or half as much on a success."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Swarm of Rats",
    "size": "Medium",
    "type": "Swarm of Tiny Beasts",
    "alignment": "Unaligned",
    "ac": 10,
    "hp": 24,
    "hpFormula": "24 (7d8 − 7)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 9,
      "DEX": 11,
      "CON": 9,
      "INT": 2,
      "WIS": 10,
      "CHA": 3
    },
    "senses": "Darkvision 30 ft., Passive Perception 10",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "damageResistances": "bludgeoning, piercing, slashing",
    "conditionImmunities": "Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned",
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The swarm has advantage on Perception checks that rely on smell."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and it can move through any opening large enough for a Tiny rat. It can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +2 to hit, reach 0 ft., one creature in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Swarm of Bats",
    "size": "Medium",
    "type": "Swarm of Tiny Beasts",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 22,
    "hpFormula": "22 (5d8)",
    "speed": "0 ft., fly 30 ft.",
    "abilities": {
      "STR": 5,
      "DEX": 15,
      "CON": 10,
      "INT": 2,
      "WIS": 12,
      "CHA": 4
    },
    "senses": "Blindsight 60 ft., Passive Perception 11",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "damageResistances": "bludgeoning, piercing, slashing",
    "conditionImmunities": "Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned",
    "traits": [
      {
        "name": "Echolocation",
        "description": "The swarm can't use its blindsight while deafened."
      },
      {
        "name": "Keen Hearing",
        "description": "The swarm has advantage on Perception checks that rely on hearing."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and it can move through any opening large enough for a Tiny bat. It can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm's space. Hit: 5 (2d4) piercing damage, or 2 (1d4) piercing damage if the swarm has half of its hit points or fewer."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Warhorse",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 11,
    "hp": 19,
    "hpFormula": "19 (3d10 + 3)",
    "speed": "60 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 12,
      "CON": 13,
      "INT": 2,
      "WIS": 12,
      "CHA": 7
    },
    "senses": "Passive Perception 11",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the horse moves at least 20 feet straight toward a creature and then hits it with a hooves attack on the same turn, the target must succeed on a DC 14 Strength save or be knocked prone. If the target is prone, the horse can make another hooves attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Riding Horse",
    "size": "Large",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 10,
    "hp": 13,
    "hpFormula": "13 (2d10 + 2)",
    "speed": "60 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 10,
      "CON": 12,
      "INT": 2,
      "WIS": 11,
      "CHA": 7
    },
    "senses": "Passive Perception 10",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Mastiff",
    "size": "Medium",
    "type": "Beast",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 5,
    "hpFormula": "5 (1d8 + 1)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 14,
      "CON": 12,
      "INT": 3,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +3",
    "senses": "Passive Perception 13",
    "languages": "—",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The mastiff has advantage on Perception checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength save or be knocked prone."
      }
    ],
    "group": "Beasts",
    "source": "srd"
  },
  {
    "name": "Owlbear",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 59,
    "hpFormula": "59 (7d10 + 21)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 12,
      "CON": 17,
      "INT": 3,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +3",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The owlbear has advantage on Perception checks that rely on sight or smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The owlbear makes two attacks: one with its beak and one with its claws."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 10 (1d10 + 5) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Ankheg",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 14,
    "acNote": "(natural armor), 11 while prone",
    "hp": 39,
    "hpFormula": "39 (6d10 + 6)",
    "speed": "30 ft., burrow 10 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 11,
      "CON": 13,
      "INT": 1,
      "WIS": 13,
      "CHA": 6
    },
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 11",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until this grapple ends, the ankheg can bite only the grappled creature and has advantage on attack rolls to do so."
      },
      {
        "name": "Acid Spray",
        "description": "Recharge 6. The ankheg spits acid in a line 30 feet long and 5 feet wide, provided it has no creature grappled. Each creature in the line must make a DC 13 Dexterity save, taking 10 (3d6) acid damage on a failure or half as much on a success."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Basilisk",
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 52,
    "hpFormula": "52 (8d8 + 16)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 8,
      "CON": 15,
      "INT": 2,
      "WIS": 8,
      "CHA": 7
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Petrifying Gaze",
        "description": "If a creature starts its turn within 30 feet of the basilisk and the two can see each other, the basilisk can force it to make a DC 12 Constitution save if the basilisk isn't incapacitated. On a failure, the creature begins to turn to stone and is restrained, then repeats the save at the end of its next turn — succeeding ends the effect, failing petrifies it. A creature that avoids looking can shield its eyes but attacks the basilisk with disadvantage; if it looks at the basilisk in the meantime and the basilisk sees its own reflection in bright light, the basilisk can be caught by its own gaze."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Bulette",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 94,
    "hpFormula": "94 (9d10 + 45)",
    "speed": "40 ft., burrow 40 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 11,
      "CON": 21,
      "INT": 2,
      "WIS": 10,
      "CHA": 5
    },
    "skills": "Perception +6",
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 16",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Standing Leap",
        "description": "The bulette's long jump is up to 30 feet and its high jump up to 15 feet, with or without a running start."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12 + 4) piercing damage."
      },
      {
        "name": "Deadly Leap",
        "description": "The bulette jumps up to 30 feet and lands on its feet in a space that contains one or more creatures. Each of those creatures must make a DC 16 Strength or Dexterity save (its choice). On a failure, a creature takes 14 (3d6 + 4) bludgeoning damage and 14 (3d6 + 4) slashing damage and is knocked prone; on a success, it takes half the damage and is pushed 5 feet out of the bulette's space into an unoccupied space of its choice."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Chimera",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 114,
    "hpFormula": "114 (12d10 + 48)",
    "speed": "30 ft., fly 60 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 11,
      "CON": 19,
      "INT": 3,
      "WIS": 14,
      "CHA": 10
    },
    "skills": "Perception +8",
    "senses": "Darkvision 60 ft., Passive Perception 18",
    "languages": "Understands Draconic but can't speak",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of its bite."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage."
      },
      {
        "name": "Horns",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) bludgeoning damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      },
      {
        "name": "Fire Breath",
        "description": "Recharge 5–6. The dragon head exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity save, taking 31 (7d8) fire damage on a failure or half as much on a success."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Cockatrice",
    "size": "Small",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 11,
    "hp": 27,
    "hpFormula": "27 (6d6 + 6)",
    "speed": "20 ft., fly 40 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 12,
      "CON": 12,
      "INT": 2,
      "WIS": 13,
      "CHA": 5
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) piercing damage, and the target must succeed on a DC 11 Constitution save or begin to turn to stone. The target is restrained until the start of the cockatrice's next turn, when it either recovers or becomes petrified for 24 hours."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Displacer Beast",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 85,
    "hpFormula": "85 (10d10 + 30)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 16,
      "INT": 6,
      "WIS": 12,
      "CHA": 8
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Avoidance",
        "description": "If the displacer beast is subjected to an effect that allows a Dexterity save for half damage, it instead takes no damage on a success and only half damage on a failure."
      },
      {
        "name": "Displacement",
        "description": "A light-bending illusion makes the beast appear to stand near its true position, so any creature attacking it has disadvantage on the roll. The illusion is disrupted until the start of the beast's next turn whenever it takes damage, and it fails to function while the beast is incapacitated or its speed is 0."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The displacer beast makes two tentacle attacks."
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 3 (1d6) piercing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "mm"
  },
  {
    "name": "Griffon",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 59,
    "hpFormula": "59 (7d10 + 21)",
    "speed": "30 ft., fly 80 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 16,
      "INT": 2,
      "WIS": 13,
      "CHA": 8
    },
    "skills": "Perception +5",
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The griffon has advantage on Perception checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The griffon makes two attacks: one with its beak and one with its claws."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Harpy",
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "ac": 11,
    "hp": 38,
    "hpFormula": "38 (7d8 + 7)",
    "speed": "20 ft., fly 40 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 13,
      "CON": 12,
      "INT": 7,
      "WIS": 10,
      "CHA": 13
    },
    "senses": "Passive Perception 10",
    "languages": "Common",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The harpy makes two attacks: one with its claws and one with its club."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage."
      },
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage."
      },
      {
        "name": "Luring Song",
        "description": "The harpy sings a magical melody as an action. Every humanoid and giant within 300 feet that can hear it must succeed on a DC 11 Wisdom save or be charmed until the song ends. While charmed, a target is incapacitated, ignores other harpy songs, and moves toward the harpy by the most direct route, risking opportunity attacks and stopping when within 5 feet. It repeats the save at the end of each of its turns; a success ends the effect and grants immunity to that harpy's song for 24 hours."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Hippogriff",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 11,
    "hp": 19,
    "hpFormula": "19 (3d10 + 3)",
    "speed": "40 ft., fly 60 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 13,
      "CON": 13,
      "INT": 2,
      "WIS": 12,
      "CHA": 8
    },
    "skills": "Perception +5",
    "senses": "Passive Perception 15",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hippogriff has advantage on Perception checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The hippogriff makes two attacks: one with its beak and one with its claws."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Hydra",
    "size": "Huge",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 172,
    "hpFormula": "172 (15d12 + 75)",
    "speed": "30 ft., swim 30 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 12,
      "CON": 20,
      "INT": 2,
      "WIS": 10,
      "CHA": 7
    },
    "skills": "Perception +6",
    "senses": "Darkvision 60 ft., Passive Perception 16",
    "languages": "—",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The hydra can hold its breath for 1 hour."
      },
      {
        "name": "Multiple Heads",
        "description": "The hydra has five heads. Whenever it takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies. At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since then. The hydra regains 10 hit points for each head regrown this way."
      },
      {
        "name": "Reactive Heads",
        "description": "For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks."
      },
      {
        "name": "Wakeful",
        "description": "While the hydra sleeps, at least one of its heads is awake."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The hydra makes as many bite attacks as it has heads."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Manticore",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Lawful Evil",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 68,
    "hpFormula": "68 (8d10 + 24)",
    "speed": "30 ft., fly 50 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 16,
      "CON": 17,
      "INT": 7,
      "WIS": 12,
      "CHA": 8
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Common",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Tail Spike Regrowth",
        "description": "The manticore has twenty-four tail spikes. Used spikes regrow when it finishes a long rest."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The manticore makes three attacks: one with its bite and two with its claws, or three with its tail spikes."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "name": "Tail Spike",
        "description": "Ranged Weapon Attack: +5 to hit, range 100/200 ft., one target. Hit: 7 (1d8 + 3) piercing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Minotaur",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 76,
    "hpFormula": "76 (9d10 + 27)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 11,
      "CON": 16,
      "INT": 6,
      "WIS": 16,
      "CHA": 9
    },
    "skills": "Perception +7",
    "senses": "Darkvision 60 ft., Passive Perception 17",
    "languages": "Abyssal",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the minotaur moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d6) piercing damage and, if it is a creature, must succeed on a DC 14 Strength save or be pushed up to 10 feet away and knocked prone."
      },
      {
        "name": "Labyrinthine Recall",
        "description": "The minotaur can perfectly recall any path it has ever walked."
      },
      {
        "name": "Reckless",
        "description": "At the start of its turn, the minotaur can gain advantage on all its melee weapon attacks this turn, but attacks against it have advantage until the start of its next turn."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage."
      },
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Peryton",
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 33,
    "hpFormula": "33 (6d8 + 6)",
    "speed": "20 ft., fly 60 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 12,
      "CON": 13,
      "INT": 9,
      "WIS": 12,
      "CHA": 10
    },
    "skills": "Perception +5",
    "senses": "Passive Perception 15",
    "languages": "Understands Common and Elvish but can't speak",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dive Attack",
        "description": "If the peryton is flying and dives at least 30 feet straight toward a target and then hits it with a melee attack on the same turn, the attack deals an extra 9 (2d8) damage of its type."
      },
      {
        "name": "Flyby",
        "description": "The peryton doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      },
      {
        "name": "Keen Sight and Smell",
        "description": "The peryton has advantage on Perception checks that rely on sight or smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The peryton makes one gore attack and one talon attack."
      },
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) piercing damage."
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Rust Monster",
    "size": "Medium",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 27,
    "hpFormula": "27 (5d8 + 5)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 12,
      "CON": 13,
      "INT": 2,
      "WIS": 13,
      "CHA": 6
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Iron Scent",
        "description": "The rust monster can pinpoint, by scent, the location of ferrous metal within 30 feet of it."
      },
      {
        "name": "Rust Metal",
        "description": "Any nonmagical weapon made of metal that hits the rust monster corrodes: after dealing damage, the weapon takes a permanent and cumulative −1 penalty to its damage rolls. A weapon reduced to −5 is destroyed. Nonmagical metal ammunition that hits is destroyed after dealing damage."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage."
      },
      {
        "name": "Antennae",
        "description": "The rust monster corrodes a nonmagical ferrous metal object it can see within 5 feet of it. If the object isn't being worn or carried, the touch destroys a 1-foot cube of it. If the object is worn or carried, the creature holding it can make a DC 11 Dexterity save to avoid the touch. Metal armor touched this way takes a permanent and cumulative −1 penalty to the AC it offers (armor reduced to an AC of 10 is destroyed); a metal weapon takes a permanent and cumulative −1 penalty to damage (destroyed at −5)."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Winter Wolf",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 75,
    "hpFormula": "75 (10d10 + 20)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 13,
      "CON": 14,
      "INT": 7,
      "WIS": 12,
      "CHA": 8
    },
    "skills": "Perception +5, Stealth +4",
    "senses": "Passive Perception 15",
    "languages": "Common, Giant, Winter Wolf",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageImmunities": "cold",
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Perception checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf attacks with advantage against a creature that has at least one of the wolf's allies within 5 feet of it and not incapacitated."
      },
      {
        "name": "Snow Camouflage",
        "description": "The wolf has advantage on Stealth checks made to hide in snowy terrain."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength save or be knocked prone."
      },
      {
        "name": "Cold Breath",
        "description": "Recharge 5–6. The wolf exhales a blast of freezing wind in a 15-foot cone. Each creature in that area must make a DC 12 Dexterity save, taking 18 (4d8) cold damage on a failure or half as much on a success."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Worg",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Neutral Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 26,
    "hpFormula": "26 (4d10 + 4)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 13,
      "CON": 13,
      "INT": 7,
      "WIS": 11,
      "CHA": 8
    },
    "skills": "Perception +4",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Goblin, Worg",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The worg has advantage on Perception checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength save or be knocked prone."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Yeti",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 51,
    "hpFormula": "51 (6d10 + 18)",
    "speed": "40 ft., climb 40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 13,
      "CON": 16,
      "INT": 8,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +3, Stealth +3",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Yeti",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageImmunities": "cold",
    "traits": [
      {
        "name": "Fear of Fire",
        "description": "If the yeti takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn."
      },
      {
        "name": "Keen Smell",
        "description": "The yeti has advantage on Perception checks that rely on smell."
      },
      {
        "name": "Snow Camouflage",
        "description": "The yeti has advantage on Stealth checks made to hide in snowy terrain."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The yeti makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) slashing damage plus 3 (1d6) cold damage."
      },
      {
        "name": "Chilling Gaze",
        "description": "The yeti targets one creature it can see within 30 feet of it. If the target can see the yeti, it must succeed on a DC 13 Constitution save against this magic or take 10 (3d6) cold damage and be paralyzed for 1 minute, unless it is immune to cold damage. The target repeats the save at the end of each of its turns, ending the effect on a success. If a target's save succeeds or the effect ends for it, it is immune to this yeti's gaze for 1 hour."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Roc",
    "size": "Gargantuan",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 248,
    "hpFormula": "248 (16d20 + 80)",
    "speed": "20 ft., fly 120 ft.",
    "abilities": {
      "STR": 28,
      "DEX": 10,
      "CON": 20,
      "INT": 3,
      "WIS": 10,
      "CHA": 9
    },
    "savingThrows": "Dex +4, Con +9, Wis +4, Cha +3",
    "skills": "Perception +4",
    "senses": "Passive Perception 14",
    "languages": "—",
    "cr": "11",
    "xp": 7200,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The roc has advantage on Perception checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The roc makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 27 (4d8 + 9) piercing damage."
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 23 (4d6 + 9) slashing damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained, and the roc can't use its talons on another target."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Purple Worm",
    "size": "Gargantuan",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 247,
    "hpFormula": "247 (15d20 + 90)",
    "speed": "50 ft., burrow 30 ft.",
    "abilities": {
      "STR": 28,
      "DEX": 7,
      "CON": 22,
      "INT": 1,
      "WIS": 8,
      "CHA": 4
    },
    "savingThrows": "Con +11, Wis +2",
    "senses": "Blindsight 30 ft., Tremorsense 60 ft., Passive Perception 9",
    "languages": "—",
    "cr": "15",
    "xp": 13000,
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Tunneler",
        "description": "The worm can burrow through solid rock at half its burrow speed and leaves a 10-foot-diameter tunnel in its wake."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The worm makes two attacks: one with its bite and one with its stinger."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d8 + 9) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Dexterity save or be swallowed. A swallowed creature is blinded and restrained, has total cover against attacks from outside the worm, and takes 21 (6d6) acid damage at the start of each of the worm's turns. If the worm takes 30 or more damage in a single turn from a swallowed creature, it must succeed on a DC 21 Constitution save at the end of that turn or regurgitate all swallowed creatures, which fall prone within 10 feet. If the worm dies, a swallowed creature is no longer restrained and can escape the corpse using 20 feet of movement, exiting prone."
      },
      {
        "name": "Tail Stinger",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 19 (3d6 + 9) piercing damage, and the target must make a DC 19 Constitution save, taking 21 (6d6) poison damage on a failure or half as much on a success."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Gorgon",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 114,
    "hpFormula": "114 (12d10 + 48)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 11,
      "CON": 18,
      "INT": 2,
      "WIS": 12,
      "CHA": 7
    },
    "skills": "Perception +4",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "conditionImmunities": "Petrified",
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the gorgon moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, the target must succeed on a DC 16 Strength save or be knocked prone. If the target is prone, the gorgon can make one attack with its hooves against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (2d12 + 5) piercing damage."
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage."
      },
      {
        "name": "Petrifying Breath",
        "description": "Recharge 5–6. The gorgon exhales petrifying gas in a 30-foot cone. Each creature in that area must succeed on a DC 13 Constitution save. On a failure, a target begins to turn to stone and is restrained, then repeats the save at the end of its next turn — succeeding ends the effect, failing petrifies it for 24 hours."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Phase Spider",
    "size": "Large",
    "type": "Monstrosity",
    "alignment": "Unaligned",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 32,
    "hpFormula": "32 (5d10 + 5)",
    "speed": "30 ft., climb 30 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 15,
      "CON": 12,
      "INT": 6,
      "WIS": 10,
      "CHA": 6
    },
    "skills": "Stealth +6",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "—",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Jaunt",
        "description": "As a bonus action, the spider can shift from the Material Plane to the Ethereal Plane, or vice versa."
      },
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 11 Constitution save, taking 18 (4d8) poison damage on a failure or half as much on a success. If the poison reduces the target to 0 hit points, it is stable but poisoned for 1 hour, and paralyzed while poisoned this way."
      }
    ],
    "group": "Monstrosities",
    "source": "srd"
  },
  {
    "name": "Dretch",
    "size": "Small",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 11,
    "acNote": "(natural armor)",
    "hp": 18,
    "hpFormula": "18 (4d6 + 4)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 11,
      "CON": 12,
      "INT": 5,
      "WIS": 8,
      "CHA": 3
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Abyssal, telepathy 60 ft. (works only with creatures that understand Abyssal)",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dretch makes one bite attack and one claws attack."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage."
      },
      {
        "name": "Fetid Cloud (1/Day)",
        "description": "The dretch belches a 10-foot cloud of stinking vapor. Each creature that starts its turn in the area must succeed on a DC 11 Constitution saving throw or be unable to take reactions until the start of its next turn, and it can use either a bonus action or an action on its turn, not both."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Manes",
    "size": "Small",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 9,
    "hp": 9,
    "hpFormula": "9 (2d6 + 2)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 9,
      "CON": 13,
      "INT": 3,
      "WIS": 8,
      "CHA": 4
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "understands Abyssal but can't speak",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Quasit",
    "size": "Tiny",
    "type": "Fiend (Demon, Shapechanger)",
    "alignment": "Chaotic Evil",
    "ac": 13,
    "hp": 7,
    "hpFormula": "7 (3d4)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 5,
      "DEX": 17,
      "CON": 10,
      "INT": 7,
      "WIS": 10,
      "CHA": 10
    },
    "skills": "Stealth +5",
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Abyssal, Common",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Shapechanger",
        "description": "As an action, the quasit can shift into the form of a bat, centipede, or toad, or back into its true fiendish shape. Its statistics are the same in each form, except for the movement its beast form provides. Anything it carries transforms with it, and it reverts on death."
      },
      {
        "name": "Magic Resistance",
        "description": "The quasit has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Claws (Bite in Beast Form)",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute. The target can repeat the save at the end of each of its turns, ending the effect on a success."
      },
      {
        "name": "Scare (1/Day)",
        "description": "One creature within 20 feet that the quasit can see must succeed on a DC 10 Wisdom saving throw or be frightened for 1 minute (or until the quasit is more than 20 feet away). The target repeats the save at the end of each of its turns, with disadvantage while it can see the quasit, ending the effect on a success."
      },
      {
        "name": "Invisibility",
        "description": "The quasit magically turns invisible until it attacks or uses Scare, or until its concentration ends. Any equipment it wears or carries is invisible with it."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Vrock",
    "size": "Large",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 104,
    "hpFormula": "104 (11d10 + 44)",
    "speed": "40 ft., fly 60 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 15,
      "CON": 18,
      "INT": 8,
      "WIS": 13,
      "CHA": 8
    },
    "savingThrows": "Dex +3, Wis +4, Cha +2",
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Abyssal, telepathy 120 ft.",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The vrock has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The vrock makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage."
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage."
      },
      {
        "name": "Spores (Recharge 6)",
        "description": "A cloud of toxic spores bursts in a 20-foot radius. Each creature there must succeed on a DC 14 Constitution saving throw or be poisoned. While poisoned this way, a creature takes 5 (1d10) poison damage at the start of each of its turns. A creature can repeat the save at the end of each of its turns, ending the effect on a success; a lesser restoration spell or comparable magic also ends it."
      },
      {
        "name": "Stunning Screech (1/Day)",
        "description": "The vrock emits a piercing screech. Each creature within 20 feet that can hear it (other than demons) must succeed on a DC 14 Constitution saving throw or be stunned until the end of the vrock's next turn."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Hezrou",
    "size": "Large",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 136,
    "hpFormula": "136 (13d10 + 65)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 17,
      "CON": 20,
      "INT": 5,
      "WIS": 12,
      "CHA": 13
    },
    "savingThrows": "Str +7, Con +8, Wis +4",
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Abyssal, telepathy 120 ft.",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The hezrou has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Stench",
        "description": "Any creature that starts its turn within 10 feet of the hezrou must succeed on a DC 14 Constitution saving throw or be poisoned until the start of its next turn. On a success, the creature is immune to this hezrou's stench for 24 hours."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The hezrou makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d4 + 4) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Glabrezu",
    "size": "Large",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 157,
    "hpFormula": "157 (15d10 + 75)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 15,
      "CON": 21,
      "INT": 19,
      "WIS": 17,
      "CHA": 16
    },
    "savingThrows": "Str +9, Con +9, Wis +7, Cha +7",
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "Abyssal, telepathy 120 ft.",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The glabrezu has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The glabrezu's spellcasting ability is Charisma (spell save DC 16). It can innately cast the following spells, requiring no material components: At will — darkness, detect magic, dispel magic; 1/day each — confusion, fly, power word stun."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it can make two pincer attacks and cast one spell."
      },
      {
        "name": "Pincer",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it is grappled (escape DC 15). The glabrezu has two pincers, each of which can grapple only one target."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (1d4 + 5) bludgeoning damage."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Nalfeshnee",
    "size": "Large",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 184,
    "hpFormula": "184 (16d10 + 96)",
    "speed": "20 ft., fly 30 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 10,
      "CON": 22,
      "INT": 19,
      "WIS": 12,
      "CHA": 15
    },
    "savingThrows": "Con +11, Int +8, Wis +6, Cha +7",
    "senses": "Truesight 120 ft., Passive Perception 11",
    "languages": "Abyssal, telepathy 120 ft.",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The nalfeshnee has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The nalfeshnee uses Horror Nimbus if it can. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage."
      },
      {
        "name": "Horror Nimbus (Recharge 5-6)",
        "description": "The nalfeshnee flares with unnatural light. Each creature within 15 feet that can see it must succeed on a DC 15 Wisdom saving throw or be frightened for 1 minute. A frightened creature repeats the save at the end of each of its turns, ending the effect on a success. On a success, or once the effect ends for it, the creature is immune to this nalfeshnee's Horror Nimbus for 24 hours."
      },
      {
        "name": "Teleport",
        "description": "The nalfeshnee magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Marilith",
    "size": "Large",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 189,
    "hpFormula": "189 (18d10 + 90)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 20,
      "CON": 20,
      "INT": 18,
      "WIS": 16,
      "CHA": 20
    },
    "savingThrows": "Str +9, Con +11, Wis +8, Cha +10",
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "Abyssal, telepathy 120 ft.",
    "cr": "16",
    "xp": 15000,
    "proficiencyBonus": 5,
    "damageResistances": "cold, fire, lightning",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The marilith has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The marilith's weapon attacks are magical."
      },
      {
        "name": "Reactive",
        "description": "The marilith can take one reaction on every turn in combat, not just its own."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The marilith makes seven attacks: six with its longswords and one with its tail."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) bludgeoning damage. If the target is Medium or smaller, it is grappled (escape DC 19). Until the grapple ends, the target is restrained, the marilith can automatically hit it with its tail, and the marilith can't use its tail against other targets."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The marilith adds 5 to its AC against one melee attack that would hit it. To do so, it must see the attacker and be wielding a melee weapon."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Balor",
    "size": "Huge",
    "type": "Fiend (Demon)",
    "alignment": "Chaotic Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 262,
    "hpFormula": "262 (21d12 + 126)",
    "speed": "40 ft., fly 80 ft.",
    "abilities": {
      "STR": 26,
      "DEX": 15,
      "CON": 22,
      "INT": 20,
      "WIS": 16,
      "CHA": 22
    },
    "savingThrows": "Str +14, Con +12, Wis +9, Cha +12",
    "senses": "Truesight 120 ft., Passive Perception 13",
    "languages": "Abyssal, telepathy 120 ft.",
    "cr": "19",
    "xp": 22000,
    "proficiencyBonus": 6,
    "damageResistances": "cold, lightning; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Death Throes",
        "description": "When the balor dies, it erupts in a fiery blast. Each creature within 30 feet must make a DC 20 Dexterity saving throw, taking 70 (20d6) fire damage on a failure, or half as much on a success. The explosion ignites flammable objects not being worn or carried and destroys the balor's weapons."
      },
      {
        "name": "Fire Aura",
        "description": "At the start of each of the balor's turns, any creature within 5 feet takes 10 (3d6) fire damage. A creature that touches the balor or hits it with a melee attack while within 5 feet takes the same fire damage."
      },
      {
        "name": "Magic Resistance",
        "description": "The balor has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The balor's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The balor makes two attacks: one with its longsword and one with its whip."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) slashing damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls damage dice three times instead of twice."
      },
      {
        "name": "Whip",
        "description": "Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) slashing damage plus 10 (3d6) fire damage, and the target must succeed on a DC 20 Strength saving throw or be pulled up to 25 feet toward the balor."
      },
      {
        "name": "Teleport",
        "description": "The balor magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ],
    "legendaryActions": [
      {
        "name": "Attack",
        "description": "The balor makes one longsword attack."
      },
      {
        "name": "Lash (Costs 2 Actions)",
        "description": "The balor makes one whip attack, then teleports up to 30 feet to an unoccupied space it can see."
      },
      {
        "name": "Kindle (Costs 2 Actions)",
        "description": "Flames roar around the balor. Each creature within 15 feet must succeed on a DC 20 Dexterity saving throw or take 14 (4d6) fire damage."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Lemure",
    "size": "Medium",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 7,
    "hp": 13,
    "hpFormula": "13 (3d8)",
    "speed": "15 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 5,
      "CON": 11,
      "INT": 1,
      "WIS": 11,
      "CHA": 3
    },
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "understands Infernal but can't speak",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "damageResistances": "cold",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Charmed, Frightened, Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the lemure's darkvision."
      },
      {
        "name": "Hellish Rejuvenation",
        "description": "A lemure that dies in the Nine Hells comes back to life with all its hit points in 1d10 days unless it is killed by a good-aligned creature with a bless spell cast on that creature or its remains are sprinkled with holy water."
      }
    ],
    "actions": [
      {
        "name": "Fists",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Imp",
    "size": "Tiny",
    "type": "Fiend (Devil, Shapechanger)",
    "alignment": "Lawful Evil",
    "ac": 13,
    "hp": 10,
    "hpFormula": "10 (3d4 + 3)",
    "speed": "20 ft., fly 40 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 17,
      "CON": 13,
      "INT": 11,
      "WIS": 12,
      "CHA": 14
    },
    "skills": "Deception +4, Insight +3, Persuasion +4, Stealth +5",
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Infernal, Common",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Shapechanger",
        "description": "As an action, the imp can shift into the form of a rat (speed 20 ft.), a raven (20 ft., fly 60 ft.), or a spider (20 ft., climb 20 ft.), or back into its true devil form. Its statistics are the same in each form, except for speed. It reverts on death."
      },
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the imp's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The imp has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Sting (Bite in Beast Form)",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failure, or half as much on a success."
      },
      {
        "name": "Invisibility",
        "description": "The imp magically turns invisible until it attacks or until its concentration ends. Any equipment it wears or carries is invisible with it."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Spined Devil",
    "size": "Small",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 22,
    "hpFormula": "22 (5d6 + 5)",
    "speed": "20 ft., fly 60 ft.",
    "abilities": {
      "STR": 13,
      "DEX": 15,
      "CON": 12,
      "INT": 11,
      "WIS": 14,
      "CHA": 8
    },
    "skills": "Perception +4",
    "senses": "Darkvision 120 ft., Passive Perception 14",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "damageResistances": "cold",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Flyby",
        "description": "The devil doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      },
      {
        "name": "Limited Spine Regrowth",
        "description": "The devil has twelve tail spines. Used spines regrow when it finishes a long rest."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes two attacks: one with its forked tail and one with its tail spine, or two with its tail spines."
      },
      {
        "name": "Forked Tail",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."
      },
      {
        "name": "Tail Spine",
        "description": "Ranged Weapon Attack: +4 to hit, range 20/80 ft., one target. Hit: 6 (2d4 + 1) piercing damage plus 3 (1d6) fire damage."
      }
    ],
    "group": "Fiends",
    "source": "mm"
  },
  {
    "name": "Bearded Devil",
    "size": "Medium",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 52,
    "hpFormula": "52 (8d8 + 16)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 15,
      "CON": 15,
      "INT": 9,
      "WIS": 11,
      "CHA": 11
    },
    "savingThrows": "Str +5, Con +4, Wis +2",
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Steadfast",
        "description": "The devil can't be frightened while it can see an allied creature within 30 feet of it."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes two attacks: one with its beard and one with its glaive."
      },
      {
        "name": "Beard",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned this way, the target can't regain hit points. It repeats the save at the end of each of its turns, ending the effect on a success."
      },
      {
        "name": "Glaive",
        "description": "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the ongoing damage increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Barbed Devil",
    "size": "Medium",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 110,
    "hpFormula": "110 (13d8 + 52)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 17,
      "CON": 18,
      "INT": 12,
      "WIS": 14,
      "CHA": 14
    },
    "savingThrows": "Str +6, Con +7, Wis +5, Cha +5",
    "skills": "Deception +5, Insight +5, Perception +8",
    "senses": "Darkvision 120 ft., Passive Perception 18",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Barbed Hide",
        "description": "At the start of each of its turns, the barbed devil deals 5 (1d10) piercing damage to any creature grappling it."
      },
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage."
      },
      {
        "name": "Hurl Flame",
        "description": "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Chain Devil",
    "size": "Medium",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 85,
    "hpFormula": "85 (10d8 + 40)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 18,
      "INT": 11,
      "WIS": 12,
      "CHA": 14
    },
    "savingThrows": "Con +7, Wis +4, Cha +5",
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes two attacks with its chains."
      },
      {
        "name": "Chain",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn't already grappling a creature. Until the grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns."
      },
      {
        "name": "Animate Chains (Recharge 6)",
        "description": "Up to four chains the devil can see within 60 feet magically spring to life under its control, provided they aren't being worn or carried. Each animated chain is an object with AC 20, 20 hit points, resistance to piercing damage, and immunity to psychic and thunder damage. When the devil uses Multiattack on its turn, it can make one attack with each animated chain. An animated chain drops lifeless when reduced to 0 hit points or when the devil is incapacitated or dies."
      }
    ],
    "reactions": [
      {
        "name": "Unnerving Mask",
        "description": "When a creature the devil can see starts its turn within 30 feet, the devil can create the illusion that it takes on the appearance of one of the creature's departed loved ones or bitter enemies. The creature must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its turn."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Bone Devil",
    "size": "Large",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 142,
    "hpFormula": "142 (15d10 + 60)",
    "speed": "40 ft., fly 40 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 16,
      "CON": 18,
      "INT": 13,
      "WIS": 14,
      "CHA": 16
    },
    "savingThrows": "Int +5, Wis +6, Cha +7",
    "senses": "Darkvision 120 ft., Passive Perception 12",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three attacks: two with its claws and one with its sting."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage."
      },
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the save at the end of each of its turns, ending the effect on a success."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Horned Devil",
    "size": "Large",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 178,
    "hpFormula": "178 (17d10 + 85)",
    "speed": "20 ft., fly 60 ft.",
    "abilities": {
      "STR": 22,
      "DEX": 17,
      "CON": 21,
      "INT": 12,
      "WIS": 16,
      "CHA": 17
    },
    "savingThrows": "Str +10, Dex +7, Wis +7, Cha +7",
    "senses": "Darkvision 120 ft., Passive Perception 13",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "11",
    "xp": 7200,
    "proficiencyBonus": 4,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three melee attacks: two with its fork and one with its tail. It can use Hurl Flame in place of any melee attack."
      },
      {
        "name": "Fork",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) piercing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 17 Constitution saving throw or lose 10 (3d6) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the ongoing damage increases by 10 (3d6). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing."
      },
      {
        "name": "Hurl Flame",
        "description": "Ranged Spell Attack: +7 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Ice Devil",
    "size": "Large",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 180,
    "hpFormula": "180 (19d10 + 76)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 14,
      "CON": 18,
      "INT": 18,
      "WIS": 15,
      "CHA": 18
    },
    "savingThrows": "Dex +7, Con +9, Wis +7, Cha +9",
    "senses": "Blindsight 60 ft., Darkvision 120 ft., Passive Perception 12",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "14",
    "xp": 11500,
    "proficiencyBonus": 5,
    "damageImmunities": "cold, fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three attacks: one with its bite, one with its claws, and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage plus 10 (3d6) cold damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 10 (1d8 + 5) slashing damage plus 10 (3d6) cold damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage plus 10 (3d6) cold damage."
      },
      {
        "name": "Wall of Ice (Recharge 6)",
        "description": "The devil magically forms an opaque wall of ice on a solid surface it can see within 60 feet. The wall can be up to 60 feet long, 10 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. When the wall appears, each creature in its space is pushed out to the side of the wall it chooses. A creature that tries to move through it takes 17 (5d6) cold damage. Each 10-foot section has AC 12 and 30 hit points, and destroying a section leaves a gap."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Erinyes",
    "size": "Medium",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(plate)",
    "hp": 153,
    "hpFormula": "153 (18d8 + 72)",
    "speed": "30 ft., fly 60 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 16,
      "CON": 18,
      "INT": 14,
      "WIS": 14,
      "CHA": 18
    },
    "savingThrows": "Dex +7, Con +8, Wis +6, Cha +8",
    "senses": "Truesight 120 ft., Passive Perception 12",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "12",
    "xp": 8400,
    "proficiencyBonus": 4,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The erinyes has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The erinyes's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The erinyes makes three attacks."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage."
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned. The poison lasts until it is removed by the lesser restoration spell or comparable magic."
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "description": "The erinyes adds 4 to its AC against one melee attack that would hit it. To do so, it must see the attacker and be wielding a melee weapon."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Pit Fiend",
    "size": "Large",
    "type": "Fiend (Devil)",
    "alignment": "Lawful Evil",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 300,
    "hpFormula": "300 (24d10 + 168)",
    "speed": "30 ft., fly 60 ft.",
    "abilities": {
      "STR": 26,
      "DEX": 14,
      "CON": 24,
      "INT": 22,
      "WIS": 18,
      "CHA": 24
    },
    "savingThrows": "Dex +8, Con +13, Wis +10",
    "senses": "Truesight 120 ft., Passive Perception 14",
    "languages": "Infernal, telepathy 120 ft.",
    "cr": "20",
    "xp": 25000,
    "proficiencyBonus": 6,
    "damageResistances": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "traits": [
      {
        "name": "Fear Aura",
        "description": "Any creature hostile to the pit fiend that starts its turn within 20 feet must succeed on a DC 21 Wisdom saving throw or be frightened until the start of its next turn. If the save succeeds, the creature is immune to this pit fiend's Fear Aura for 24 hours."
      },
      {
        "name": "Magic Resistance",
        "description": "The pit fiend has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The pit fiend's weapon attacks are magical."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The pit fiend's spellcasting ability is Charisma (spell save DC 21). It can innately cast the following spells, requiring no material components: At will — detect magic, fireball; 3/day each — hold monster, wall of fire."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The pit fiend makes four attacks: one with its bite, one with its claw, one with its mace, and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) piercing damage. The target must succeed on a DC 21 Constitution saving throw or become poisoned. While poisoned, it takes 21 (6d6) poison damage at the start of each of its turns, and it can't regain hit points. It repeats the save at the end of each turn, ending the effect on a success."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 17 (2d8 + 8) slashing damage."
      },
      {
        "name": "Mace",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) bludgeoning damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 24 (3d10 + 8) bludgeoning damage."
      }
    ],
    "legendaryActions": [
      {
        "name": "Tail Sweep",
        "description": "The pit fiend makes one tail attack."
      },
      {
        "name": "Wing (Costs 2 Actions)",
        "description": "The pit fiend beats its wings. Each creature within 15 feet must succeed on a DC 22 Dexterity saving throw or take 14 (4d6) bludgeoning damage and be knocked prone. The pit fiend can then fly up to half its flying speed."
      },
      {
        "name": "Infernal Command (Costs 2 Actions)",
        "description": "The pit fiend directs its allies. Each fiend within 30 feet that can hear it can immediately use its reaction to move up to its speed or make one weapon attack."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Hell Hound",
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 45,
    "hpFormula": "45 (7d8 + 14)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 12,
      "CON": 14,
      "INT": 6,
      "WIS": 13,
      "CHA": 6
    },
    "skills": "Perception +5",
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "understands Infernal but can't speak",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "damageImmunities": "fire",
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The hound has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The hound has advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage."
      },
      {
        "name": "Fire Breath (Recharge 5-6)",
        "description": "The hound exhales fire in a 15-foot cone. Each creature there must make a DC 12 Dexterity saving throw, taking 21 (6d6) fire damage on a failure, or half as much on a success."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Succubus/Incubus",
    "size": "Medium",
    "type": "Fiend (Shapechanger)",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 66,
    "hpFormula": "66 (12d8 + 12)",
    "speed": "30 ft., fly 60 ft.",
    "abilities": {
      "STR": 8,
      "DEX": 17,
      "CON": 13,
      "INT": 15,
      "WIS": 12,
      "CHA": 20
    },
    "skills": "Deception +9, Insight +5, Perception +5, Persuasion +9, Stealth +7",
    "senses": "Darkvision 60 ft., Passive Perception 15",
    "languages": "Abyssal, Common, Infernal, telepathy 60 ft.",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageResistances": "cold, fire, lightning, poison",
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "The fiend ignores the range restriction on its telepathy when communicating with a creature it has charmed. The two don't even need to be on the same plane of existence."
      },
      {
        "name": "Shapechanger",
        "description": "As an action, the fiend can shift its form into that of a Small or Medium humanoid, or back into its true form. Without wings it loses its flying speed. Its statistics are otherwise unchanged, and it reverts on death."
      }
    ],
    "actions": [
      {
        "name": "Claw (Fiend Form Only)",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "name": "Charm",
        "description": "One humanoid the fiend can see within 30 feet must succeed on a DC 15 Wisdom saving throw or be magically charmed for 1 day. The charmed target obeys the fiend's verbal or telepathic commands. Each time the target takes damage, it repeats the save, ending the effect on a success. The effect ends after 24 hours, if the fiend is destroyed, or if it ends the effect as a bonus action. If a target's save succeeds, the target is immune to this fiend's Charm for the next 24 hours."
      },
      {
        "name": "Draining Kiss",
        "description": "The fiend kisses a creature charmed by it or a willing creature. The target must make a DC 15 Constitution saving throw, taking 32 (5d10 + 5) psychic damage on a failure, or half as much on a success. The target's hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest, and the target dies if its hit point maximum drops to 0."
      },
      {
        "name": "Etherealness",
        "description": "The fiend magically enters the Ethereal Plane from the Material Plane, or vice versa."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Night Hag",
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Neutral Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 112,
    "hpFormula": "112 (15d8 + 45)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 16,
      "INT": 16,
      "WIS": 14,
      "CHA": 16
    },
    "skills": "Deception +7, Insight +6, Perception +6, Stealth +6",
    "senses": "Darkvision 120 ft., Passive Perception 16",
    "languages": "Abyssal, Common, Infernal, Primordial",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageResistances": "cold, fire; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "conditionImmunities": "Charmed",
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The night hag's spellcasting ability is Charisma (spell save DC 14). She can innately cast the following spells, requiring no material components: At will — detect magic, magic missile; 2/day each — plane shift (self only), ray of enfeeblement, sleep."
      },
      {
        "name": "Magic Resistance",
        "description": "The hag has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Claws (Hag Form Only)",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage."
      },
      {
        "name": "Change Shape",
        "description": "The hag magically polymorphs into a Small or Medium female humanoid, or back into her true form. Her statistics are the same in each form, except she loses the ability to fly if the new form lacks it. Her equipment isn't transformed, and she reverts on death."
      },
      {
        "name": "Nightmare Haunting (1/Day)",
        "description": "While on the Ethereal Plane, the hag magically touches a sleeping humanoid on the Material Plane. A protection from evil and good spell cast on the target prevents this contact, as does a magic circle. As long as the contact persists, the target has dreadful visions. If these visions last for at least 1 hour, the target gains no benefit from its rest, and its hit point maximum is reduced by 5 (1d10). If this effect reduces the target's hit point maximum to 0, the target dies, and if the target was a spellcaster, its soul is trapped in the hag's heartstone. The reduction lasts until removed by the greater restoration spell or similar magic."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Rakshasa",
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Lawful Evil",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 110,
    "hpFormula": "110 (13d8 + 52)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 17,
      "CON": 18,
      "INT": 13,
      "WIS": 16,
      "CHA": 20
    },
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Common, Infernal",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Limited Magic Immunity",
        "description": "The rakshasa can't be affected or detected by spells of 6th level or lower unless it wishes to be. It has advantage on saving throws against all other spells and magical effects."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The rakshasa's spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). It can innately cast the following spells, requiring no material components: At will — detect thoughts, disguise self, mage hand, minor illusion; 3/day each — charm person, detect magic, invisibility, major image, suggestion; 1/day each — dominate person, fly, plane shift, true seeing."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The rakshasa makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage, and the target is cursed if it is a creature. The magical curse takes effect whenever the target takes a short or long rest, filling the target's thoughts with horrible images and dreams. The cursed target gains no benefit from finishing a short or long rest. The curse lasts until it is lifted by a remove curse spell or similar magic."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Cambion",
    "size": "Medium",
    "type": "Fiend",
    "alignment": "Any Evil Alignment",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 82,
    "hpFormula": "82 (11d8 + 33)",
    "speed": "30 ft., fly 60 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 18,
      "CON": 16,
      "INT": 14,
      "WIS": 12,
      "CHA": 16
    },
    "savingThrows": "Str +7, Con +6, Int +5, Cha +6",
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Abyssal, Common, Infernal",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageResistances": "cold, fire, lightning, poison; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    "traits": [
      {
        "name": "Fiendish Blessing",
        "description": "The AC of the cambion includes its Charisma bonus."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The cambion's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring no material components: At will — alter self, command, detect magic; 3/day — plane shift (self only)."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The cambion makes two attacks, either with its spear or its fire ray."
      },
      {
        "name": "Spear",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage, or 8 (1d8 + 4) piercing damage if used with two hands, plus 3 (1d6) fire damage."
      },
      {
        "name": "Fire Ray",
        "description": "Ranged Spell Attack: +7 to hit, range 120 ft., one target. Hit: 10 (3d6) fire damage."
      }
    ],
    "group": "Fiends",
    "source": "srd"
  },
  {
    "name": "Deva",
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 136,
    "hpFormula": "136 (16d8 + 64)",
    "speed": "30 ft., fly 90 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 18,
      "CON": 18,
      "INT": 17,
      "WIS": 20,
      "CHA": 20
    },
    "savingThrows": "Wis +9, Cha +9",
    "skills": "Insight +9, Perception +9",
    "senses": "Darkvision 120 ft., Passive Perception 19",
    "languages": "all, telepathy 120 ft.",
    "cr": "10",
    "xp": 5900,
    "proficiencyBonus": 4,
    "damageResistances": "radiant; bludgeoning, piercing, and slashing from nonmagical attacks",
    "conditionImmunities": "Charmed, Exhaustion, Frightened",
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The deva's weapon attacks are magical. When it hits with any weapon, the weapon deals an extra 4d8 radiant damage (included below)."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The deva's spellcasting ability is Charisma (spell save DC 17). It can innately cast the following spells, requiring only verbal components: At will — detect evil and good; 1/day each — commune, raise dead."
      },
      {
        "name": "Magic Resistance",
        "description": "The deva has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The deva makes two melee attacks."
      },
      {
        "name": "Mace",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) radiant damage."
      },
      {
        "name": "Healing Touch (3/Day)",
        "description": "The deva touches another creature. The target magically regains 20 (4d8 + 2) hit points and is freed from any curse, disease, poison, blindness, or deafness."
      },
      {
        "name": "Change Shape",
        "description": "The deva magically polymorphs into a humanoid or beast with a challenge rating no higher than its own, or back into its true form. It reverts on death. Any equipment it is wearing or carrying is absorbed or borne by the new form. In a new form, the deva keeps its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and special senses are replaced by those of the new form, and it gains any statistics and capabilities the new form has that a deva otherwise lacks."
      }
    ],
    "group": "Celestials",
    "source": "srd"
  },
  {
    "name": "Planetar",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 200,
    "hpFormula": "200 (16d10 + 112)",
    "speed": "40 ft., fly 120 ft.",
    "abilities": {
      "STR": 24,
      "DEX": 20,
      "CON": 24,
      "INT": 19,
      "WIS": 22,
      "CHA": 25
    },
    "savingThrows": "Con +12, Wis +11, Cha +12",
    "skills": "Perception +11",
    "senses": "Truesight 120 ft., Passive Perception 21",
    "languages": "all, telepathy 120 ft.",
    "cr": "16",
    "xp": 15000,
    "proficiencyBonus": 5,
    "damageResistances": "radiant; bludgeoning, piercing, and slashing from nonmagical attacks",
    "conditionImmunities": "Charmed, Exhaustion, Frightened",
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The planetar's weapon attacks are magical. When it hits with any weapon, the weapon deals an extra 5d8 radiant damage (included below)."
      },
      {
        "name": "Divine Awareness",
        "description": "The planetar knows if it hears a lie."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The planetar's spellcasting ability is Charisma (spell save DC 20). It can innately cast the following spells, requiring no material components: At will — detect evil and good, invisibility (self only); 3/day each — blade barrier, dispel evil and good, flame strike, raise dead; 1/day each — commune, control weather, insect plague."
      },
      {
        "name": "Magic Resistance",
        "description": "The planetar has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The planetar makes two melee attacks."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 21 (4d6 + 7) slashing damage plus 22 (5d8) radiant damage."
      },
      {
        "name": "Healing Touch (4/Day)",
        "description": "The planetar touches another creature. The target magically regains 30 (6d8 + 3) hit points and is freed from any curse, disease, poison, blindness, or deafness."
      }
    ],
    "group": "Celestials",
    "source": "srd"
  },
  {
    "name": "Solar",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "ac": 21,
    "acNote": "(natural armor)",
    "hp": 243,
    "hpFormula": "243 (18d10 + 144)",
    "speed": "50 ft., fly 150 ft.",
    "abilities": {
      "STR": 26,
      "DEX": 22,
      "CON": 26,
      "INT": 25,
      "WIS": 25,
      "CHA": 30
    },
    "savingThrows": "Int +14, Wis +14, Cha +17",
    "skills": "Perception +14",
    "senses": "Truesight 120 ft., Passive Perception 24",
    "languages": "all, telepathy 120 ft.",
    "cr": "21",
    "xp": 33000,
    "proficiencyBonus": 7,
    "damageResistances": "radiant; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "necrotic, poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Poisoned",
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The solar's weapon attacks are magical. When it hits with any weapon, the weapon deals an extra 6d8 radiant damage (included below)."
      },
      {
        "name": "Divine Awareness",
        "description": "The solar knows if it hears a lie."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The solar's spellcasting ability is Charisma (spell save DC 25). It can innately cast the following spells, requiring no material components: At will — detect evil and good, invisibility (self only); 3/day each — blade barrier, dispel evil and good, resurrection; 1/day each — commune, control weather."
      },
      {
        "name": "Magic Resistance",
        "description": "The solar has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The solar makes two greatsword attacks."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +15 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) slashing damage plus 27 (6d8) radiant damage."
      },
      {
        "name": "Slaying Longbow",
        "description": "Ranged Weapon Attack: +13 to hit, range 150/600 ft., one target. Hit: 15 (2d8 + 6) piercing damage plus 27 (6d8) radiant damage. If the target is a creature that has 100 hit points or fewer, it must succeed on a DC 21 Constitution saving throw or die."
      },
      {
        "name": "Flying Sword",
        "description": "The solar releases its greatsword to hover magically in an unoccupied space within 5 feet of it. If the solar can see the sword, it can mentally command it as a bonus action to fly up to 50 feet and either make one attack against a target or return to the solar's hands. If the hovering sword is targeted by any effect, the solar is considered to be holding it. The hovering sword falls if the solar dies."
      },
      {
        "name": "Healing Touch (4/Day)",
        "description": "The solar touches another creature. The target magically regains 40 (8d8 + 4) hit points and is freed from any curse, disease, poison, blindness, or deafness."
      }
    ],
    "legendaryActions": [
      {
        "name": "Teleport",
        "description": "The solar magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      },
      {
        "name": "Searing Burst (Costs 2 Actions)",
        "description": "The solar emits magical, divine energy. Each creature of its choice in a 10-foot radius must make a DC 23 Dexterity saving throw, taking 14 (4d6) fire damage plus 14 (4d6) radiant damage on a failure, or half as much on a success."
      },
      {
        "name": "Blinding Gaze (Costs 3 Actions)",
        "description": "The solar targets one creature it can see within 30 feet. If the target can see it, the target must succeed on a DC 15 Constitution saving throw or be blinded until magic such as the lesser restoration spell removes the blindness."
      }
    ],
    "group": "Celestials",
    "source": "srd"
  },
  {
    "name": "Pegasus",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Chaotic Good",
    "ac": 12,
    "hp": 59,
    "hpFormula": "59 (7d10 + 21)",
    "speed": "60 ft., fly 90 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 16,
      "INT": 10,
      "WIS": 15,
      "CHA": 13
    },
    "savingThrows": "Dex +4, Wis +4, Cha +3",
    "skills": "Perception +6",
    "senses": "Passive Perception 16",
    "languages": "understands Celestial, Common, Elvish, and Sylvan but can't speak",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ],
    "group": "Celestials",
    "source": "srd"
  },
  {
    "name": "Unicorn",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "ac": 12,
    "hp": 67,
    "hpFormula": "67 (9d10 + 18)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 14,
      "CON": 15,
      "INT": 11,
      "WIS": 17,
      "CHA": 16
    },
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Celestial, Elvish, Sylvan, telepathy 60 ft.",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Paralyzed, Poisoned",
    "traits": [
      {
        "name": "Charge",
        "description": "If the unicorn moves at least 20 feet straight toward a target and then hits it with a horn attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The unicorn's innate spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring no components: At will — detect evil and good, druidcraft, pass without trace; 1/day each — calm emotions, dispel evil and good, entangle."
      },
      {
        "name": "Magic Resistance",
        "description": "The unicorn has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The unicorn's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The unicorn makes two attacks: one with its hooves and one with its horn."
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      },
      {
        "name": "Horn",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."
      },
      {
        "name": "Healing Touch (3/Day)",
        "description": "The unicorn touches another creature with its horn. The target magically regains 11 (2d8 + 2) hit points. In addition, the touch removes all diseases and neutralizes all poisons afflicting the target."
      },
      {
        "name": "Teleport (1/Day)",
        "description": "The unicorn magically teleports itself and up to three willing creatures it can see within 5 feet, along with any equipment they are wearing or carrying, to a location the unicorn is familiar with, up to 1 mile away."
      }
    ],
    "legendaryActions": [
      {
        "name": "Hooves",
        "description": "The unicorn makes one attack with its hooves."
      },
      {
        "name": "Shimmering Shield (Costs 2 Actions)",
        "description": "The unicorn creates a shimmering, magical field around itself or another creature it can see within 60 feet. The target gains a +2 bonus to AC until the end of the unicorn's next turn."
      },
      {
        "name": "Heal Self (Costs 3 Actions)",
        "description": "The unicorn magically regains 11 (2d8 + 2) hit points."
      }
    ],
    "group": "Celestials",
    "source": "srd"
  },
  {
    "name": "Couatl",
    "size": "Medium",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "ac": 19,
    "acNote": "(natural armor)",
    "hp": 97,
    "hpFormula": "97 (13d8 + 39)",
    "speed": "30 ft., fly 90 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 20,
      "CON": 17,
      "INT": 18,
      "WIS": 20,
      "CHA": 18
    },
    "savingThrows": "Con +5, Wis +7, Cha +6",
    "senses": "Truesight 120 ft., Passive Perception 15",
    "languages": "all, telepathy 120 ft.",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "damageResistances": "radiant; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "psychic",
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The couatl has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The couatl's weapon attacks are magical."
      },
      {
        "name": "Shielded Mind",
        "description": "The couatl is immune to scrying and to any effect that would sense its emotions, read its thoughts, or detect its location."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The couatl's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal components: At will — detect evil and good, detect magic, detect thoughts; 3/day each — bless, create food and water, cure wounds, lesser restoration, protection from poison, sanctuary, shield; 1/day each — dream, greater restoration, scrying."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours. Until this poison ends, the target is unconscious. Another creature can use an action to shake the target awake."
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15). Until this grapple ends, the target is restrained, and the couatl can't constrict another target."
      },
      {
        "name": "Change Shape",
        "description": "The couatl magically polymorphs into a humanoid or beast with a challenge rating equal to or less than its own, or back into its true form. It reverts on death. Any equipment it is wearing or carrying is absorbed or borne by the new form. In a new form, the couatl keeps its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and special senses are replaced by those of the new form, and it gains any statistics and capabilities the new form has that the couatl otherwise lacks."
      }
    ],
    "group": "Celestials",
    "source": "srd"
  },
  {
    "name": "Ki-rin",
    "size": "Large",
    "type": "Celestial",
    "alignment": "Lawful Good",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 172,
    "hpFormula": "172 (15d10 + 90)",
    "speed": "60 ft., fly 240 ft. (hover)",
    "abilities": {
      "STR": 18,
      "DEX": 18,
      "CON": 22,
      "INT": 20,
      "WIS": 22,
      "CHA": 22
    },
    "skills": "Insight +11, Perception +11, Persuasion +10",
    "senses": "Truesight 120 ft., Passive Perception 21",
    "languages": "all, telepathy 120 ft.",
    "cr": "12",
    "xp": 8400,
    "proficiencyBonus": 4,
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Frightened, Poisoned",
    "traits": [
      {
        "name": "Magical Being",
        "description": "The ki-rin doesn't require air, food, drink, or sleep, and it can't be transformed against its will by any effect it doesn't allow."
      },
      {
        "name": "Magic Resistance",
        "description": "The ki-rin has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The ki-rin's spellcasting ability is Wisdom (spell save DC 19). It can innately cast the following spells, requiring no material components: At will — bless, create food and water, detect evil and good, sending; 3/day each — control weather, dispel evil and good, greater restoration, wind walk; 1/day each — hallow, plane shift, wall of force."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ki-rin makes two hooves attacks."
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 18 (4d8) radiant damage."
      },
      {
        "name": "Sky Bolt (Recharge 5-6)",
        "description": "The ki-rin unleashes a storm of divine energy at a point it can see within 120 feet. Each creature within 20 feet of that point must make a DC 19 Dexterity saving throw, taking 27 (6d8) radiant damage plus 27 (6d8) thunder damage on a failure, or half as much on a success."
      }
    ],
    "group": "Celestials",
    "source": "mm"
  },
  {
    "name": "Dryad",
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral",
    "ac": 11,
    "acNote": "(16 with barkskin)",
    "hp": 22,
    "hpFormula": "22 (5d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 12,
      "CON": 11,
      "INT": 14,
      "WIS": 15,
      "CHA": 18
    },
    "skills": "Perception +4, Stealth +5",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Elvish, Sylvan",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The dryad's innate spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring no material components: At will — druidcraft; 3/day each — entangle, goodberry; 1/day each — barkskin, pass without trace, shillelagh."
      },
      {
        "name": "Magic Resistance",
        "description": "The dryad has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Speak with Beasts and Plants",
        "description": "The dryad can communicate with beasts and plants as if they shared a language."
      },
      {
        "name": "Tree Stride",
        "description": "Once on each of its turns, the dryad can use 10 feet of its movement to step magically into one living tree within its reach and emerge from a second living tree within 60 feet, appearing in an unoccupied space within 5 feet of the second tree. Both trees must be Large or bigger."
      }
    ],
    "actions": [
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage, or 8 (1d8 + 4) bludgeoning damage with shillelagh (+6 to hit)."
      },
      {
        "name": "Fey Charm",
        "description": "The dryad targets one humanoid or beast that it can see within 30 feet. If the target can see the dryad, it must succeed on a DC 14 Wisdom saving throw or be magically charmed. The charmed creature regards the dryad as a trusted friend to be heeded and protected. The effect ends if the dryad or its allies harm the target, or after 24 hours, or if the dryad ends it as a bonus action. A target that succeeds is immune to this dryad's Fey Charm for 24 hours. The dryad can charm only one humanoid and up to three beasts at a time."
      }
    ],
    "group": "Fey",
    "source": "srd"
  },
  {
    "name": "Satyr",
    "size": "Medium",
    "type": "Fey",
    "alignment": "Chaotic Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 31,
    "hpFormula": "31 (7d8)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 16,
      "CON": 11,
      "INT": 12,
      "WIS": 10,
      "CHA": 14
    },
    "skills": "Perception +2, Performance +6, Stealth +5",
    "senses": "Passive Perception 12",
    "languages": "Common, Elvish, Sylvan",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The satyr has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) bludgeoning damage."
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
      }
    ],
    "group": "Fey",
    "source": "srd"
  },
  {
    "name": "Sprite",
    "size": "Tiny",
    "type": "Fey",
    "alignment": "Neutral Good",
    "ac": 15,
    "acNote": "(leather armor)",
    "hp": 2,
    "hpFormula": "2 (1d4)",
    "speed": "10 ft., fly 40 ft.",
    "abilities": {
      "STR": 3,
      "DEX": 18,
      "CON": 10,
      "INT": 14,
      "WIS": 13,
      "CHA": 11
    },
    "skills": "Perception +3, Stealth +8",
    "senses": "Passive Perception 13",
    "languages": "Common, Elvish, Sylvan",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 slashing damage."
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +6 to hit, range 40/160 ft., one target. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If its saving throw fails by 5 or more, the target instead falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake."
      },
      {
        "name": "Heart Sight",
        "description": "The sprite touches a creature and magically knows its current emotional state. If the target fails a DC 10 Charisma saving throw, the sprite also knows its alignment. Celestials, fiends, and undead automatically fail the save."
      },
      {
        "name": "Invisibility",
        "description": "The sprite magically turns invisible until it attacks or casts a spell, or until its concentration ends. Any equipment the sprite wears or carries is invisible with it."
      }
    ],
    "group": "Fey",
    "source": "srd"
  },
  {
    "name": "Pixie",
    "size": "Tiny",
    "type": "Fey",
    "alignment": "Neutral Good",
    "ac": 15,
    "hp": 1,
    "hpFormula": "1 (1d4 - 1)",
    "speed": "10 ft., fly 30 ft.",
    "abilities": {
      "STR": 2,
      "DEX": 20,
      "CON": 8,
      "INT": 10,
      "WIS": 14,
      "CHA": 15
    },
    "skills": "Perception +4, Stealth +7",
    "senses": "Passive Perception 14",
    "languages": "Sylvan",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The pixie has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The pixie's innate spellcasting ability is Charisma (spell save DC 12). It can innately cast the following spells, requiring only somatic components: At will — druidcraft; 1/day each — confusion, dancing lights, detect evil and good, detect thoughts, dispel magic, entangle, fly, phantasmal force, polymorph, sleep."
      }
    ],
    "actions": [
      {
        "name": "Superior Invisibility",
        "description": "The pixie magically turns invisible until its concentration ends (as if concentrating on a spell). Any equipment the pixie wears or carries is invisible with it."
      }
    ],
    "group": "Fey",
    "source": "mm"
  },
  {
    "name": "Blink Dog",
    "size": "Medium",
    "type": "Fey",
    "alignment": "Lawful Good",
    "ac": 13,
    "hp": 22,
    "hpFormula": "22 (4d8 + 4)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 17,
      "CON": 12,
      "INT": 10,
      "WIS": 13,
      "CHA": 11
    },
    "skills": "Perception +3, Stealth +5",
    "senses": "Passive Perception 13",
    "languages": "Blink Dog, understands Sylvan but can't speak it",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The dog has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage."
      },
      {
        "name": "Teleport",
        "description": "The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack."
      }
    ],
    "group": "Fey",
    "source": "srd"
  },
  {
    "name": "Sea Hag",
    "size": "Medium",
    "type": "Fey",
    "alignment": "Chaotic Evil",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 52,
    "hpFormula": "52 (7d8 + 21)",
    "speed": "30 ft., swim 40 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 13,
      "CON": 16,
      "INT": 12,
      "WIS": 12,
      "CHA": 13
    },
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Aquan, Common, Giant",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Horrific Appearance",
        "description": "Any humanoid that starts its turn within 30 feet of the hag and can see her true form must make a DC 11 Wisdom saving throw. On a failure, the creature is frightened for 1 minute. It can repeat the save at the end of each of its turns, with disadvantage if the hag is within line of sight, ending the effect on a success. On a success, or once the effect ends, the creature is immune to this hag's Horrific Appearance for 24 hours. A creature can avert its eyes to avoid the initial save but then has disadvantage on attacks against the hag until the start of its next turn."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."
      },
      {
        "name": "Death Glare",
        "description": "The hag targets one frightened creature she can see within 30 feet. If the target can see the hag, it must succeed on a DC 11 Wisdom saving throw against this magic or drop to 0 hit points."
      },
      {
        "name": "Illusory Appearance",
        "description": "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like an ugly creature of her general size and humanoid shape. The effect ends if the hag takes a bonus action to end it or if she dies. Physical inspection reveals the illusion, as a creature can use its action to inspect the hag and succeed on a DC 16 Intelligence (Investigation) check to discern that she is disguised."
      }
    ],
    "group": "Fey",
    "source": "srd"
  },
  {
    "name": "Green Hag",
    "size": "Medium",
    "type": "Fey",
    "alignment": "Neutral Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 82,
    "hpFormula": "82 (11d8 + 33)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 12,
      "CON": 16,
      "INT": 13,
      "WIS": 14,
      "CHA": 14
    },
    "skills": "Arcana +3, Deception +4, Perception +4, Stealth +3",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Common, Draconic, Sylvan",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The hag's innate spellcasting ability is Charisma (spell save DC 12). She can innately cast the following spells, requiring no material components: At will — dancing lights, minor illusion, vicious mockery."
      },
      {
        "name": "Mimicry",
        "description": "The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations with a successful DC 14 Wisdom (Insight) check."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) slashing damage."
      },
      {
        "name": "Illusory Appearance",
        "description": "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like another creature of her general size and humanoid shape. The effect ends if the hag takes a bonus action to end it or if she dies. A creature can use its action to inspect the hag and discern the disguise with a successful DC 20 Intelligence (Investigation) check."
      },
      {
        "name": "Invisible Passage",
        "description": "The hag magically turns invisible until she attacks or casts a spell, or until her concentration ends. While invisible, she leaves no physical evidence of her passage, so she can be tracked only by magic. Any equipment she wears or carries is invisible with her."
      }
    ],
    "group": "Fey",
    "source": "srd"
  },
  {
    "name": "Redcap",
    "size": "Small",
    "type": "Fey",
    "alignment": "Chaotic Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 45,
    "hpFormula": "45 (6d6 + 24)",
    "speed": "25 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 13,
      "CON": 19,
      "INT": 8,
      "WIS": 12,
      "CHA": 9
    },
    "skills": "Perception +3",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Common, Sylvan",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Heavy Boots",
        "description": "The redcap's iron boots let it stand its ground. It has advantage on saving throws against being knocked prone, and difficult terrain caused by ice or snow costs it no extra movement."
      },
      {
        "name": "Ironbound Pursuit",
        "description": "If the redcap ends its turn within 30 feet of an enemy that is fleeing or has moved away from it, the redcap can move up to its speed toward that enemy as part of the same turn."
      },
      {
        "name": "Outsize Strength",
        "description": "While grappling, the redcap is considered Medium and has advantage on ability checks and saving throws made to grapple or be grappled."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The redcap makes two attacks with its wicked sickle."
      },
      {
        "name": "Wicked Sickle",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) slashing damage."
      },
      {
        "name": "Stomp",
        "description": "The redcap makes one attack with its iron boots against a prone creature it can reach. Melee Weapon Attack: +5 to hit, reach 5 ft., one prone target. Hit: 7 (2d4 + 2) bludgeoning damage."
      }
    ],
    "group": "Fey",
    "source": "mm"
  },
  {
    "name": "Ogre",
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "ac": 11,
    "acNote": "(hide armor)",
    "hp": 59,
    "hpFormula": "59 (7d10 + 21)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 8,
      "CON": 16,
      "INT": 5,
      "WIS": 7,
      "CHA": 7
    },
    "senses": "Darkvision 60 ft., Passive Perception 8",
    "languages": "Common, Giant",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "actions": [
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage."
      }
    ],
    "group": "Giants",
    "source": "srd",
    "traits": []
  },
  {
    "name": "Half-Ogre",
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "acNote": "(hide armor)",
    "hp": 30,
    "hpFormula": "30 (4d10 + 8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 10,
      "CON": 14,
      "INT": 7,
      "WIS": 9,
      "CHA": 10
    },
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "Common, Giant",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "actions": [
      {
        "name": "Battleaxe",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d8 + 3) slashing damage, or 12 (2d10 + 3) slashing damage if used with two hands."
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 10 (2d6 + 3) piercing damage."
      }
    ],
    "group": "Giants",
    "source": "mm",
    "traits": []
  },
  {
    "name": "Ettin",
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 85,
    "hpFormula": "85 (10d10 + 30)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 8,
      "CON": 17,
      "INT": 6,
      "WIS": 10,
      "CHA": 8
    },
    "skills": "Perception +4",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Giant, Orc",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Two Heads",
        "description": "With a head watching each direction, the ettin has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious."
      },
      {
        "name": "Wakeful",
        "description": "While the ettin sleeps, one of its two heads remains awake and alert."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ettin makes two attacks: one with its battleaxe and one with its morningstar."
      },
      {
        "name": "Battleaxe",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage."
      },
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage."
      }
    ],
    "group": "Giants",
    "source": "mm"
  },
  {
    "name": "Troll",
    "size": "Large",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 84,
    "hpFormula": "84 (8d10 + 40)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 13,
      "CON": 20,
      "INT": 7,
      "WIS": 9,
      "CHA": 7
    },
    "skills": "Perception +2",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Giant",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The troll has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Regeneration",
        "description": "The troll regains 10 hit points at the start of its turn. If it takes acid or fire damage, this regeneration fails at the start of its next turn. It dies only if it begins its turn at 0 hit points and cannot regenerate."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The troll makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."
      }
    ],
    "group": "Giants",
    "source": "srd"
  },
  {
    "name": "Hill Giant",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 105,
    "hpFormula": "105 (10d12 + 40)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 8,
      "CON": 19,
      "INT": 5,
      "WIS": 9,
      "CHA": 6
    },
    "skills": "Perception +2",
    "senses": "Passive Perception 12",
    "languages": "Giant",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatclub attacks."
      },
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +8 to hit, range 60/240 ft., one target. Hit: 21 (3d10 + 5) bludgeoning damage."
      }
    ],
    "group": "Giants",
    "source": "srd",
    "traits": []
  },
  {
    "name": "Stone Giant",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 126,
    "hpFormula": "126 (11d12 + 55)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 15,
      "CON": 20,
      "INT": 10,
      "WIS": 12,
      "CHA": 9
    },
    "savingThrows": "Dex +5, Con +8, Wis +4",
    "skills": "Athletics +12, Perception +4",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "Giant",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "The giant has advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatclub attacks."
      },
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone."
      }
    ],
    "reactions": [
      {
        "name": "Rock Catching",
        "description": "If a rock or similar object is hurled at the giant, it can catch the missile if it makes a DC 10 Dexterity saving throw."
      }
    ],
    "group": "Giants",
    "source": "srd"
  },
  {
    "name": "Frost Giant",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(patchwork armor)",
    "hp": 138,
    "hpFormula": "138 (12d12 + 60)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 9,
      "CON": 21,
      "INT": 9,
      "WIS": 10,
      "CHA": 12
    },
    "savingThrows": "Con +8, Wis +3, Cha +4",
    "skills": "Athletics +9, Perception +3",
    "damageImmunities": "cold",
    "senses": "Passive Perception 13",
    "languages": "Giant",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greataxe attacks."
      },
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 25 (3d12 + 6) slashing damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage."
      }
    ],
    "reactions": [
      {
        "name": "Rock Catching",
        "description": "If a rock or similar object is hurled at the giant, it can catch the missile if it makes a DC 10 Dexterity saving throw."
      }
    ],
    "group": "Giants",
    "source": "srd",
    "traits": []
  },
  {
    "name": "Fire Giant",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(plate armor)",
    "hp": 162,
    "hpFormula": "162 (13d12 + 78)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 25,
      "DEX": 9,
      "CON": 23,
      "INT": 10,
      "WIS": 14,
      "CHA": 13
    },
    "savingThrows": "Dex +3, Con +10, Cha +5",
    "skills": "Athletics +11, Perception +6",
    "damageImmunities": "fire",
    "senses": "Passive Perception 16",
    "languages": "Giant",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatsword attacks."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 28 (6d6 + 7) slashing damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +11 to hit, range 60/240 ft., one target. Hit: 29 (4d10 + 7) bludgeoning damage."
      }
    ],
    "group": "Giants",
    "source": "srd",
    "traits": []
  },
  {
    "name": "Cloud Giant",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Neutral Good (50%) or Neutral Evil (50%)",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 200,
    "hpFormula": "200 (16d12 + 96)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 27,
      "DEX": 10,
      "CON": 22,
      "INT": 12,
      "WIS": 16,
      "CHA": 16
    },
    "savingThrows": "Con +10, Wis +7, Cha +7",
    "skills": "Insight +7, Perception +7",
    "senses": "Passive Perception 17",
    "languages": "Common, Giant",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The giant has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma (spell save DC 15). It can cast the following spells without material components: At will — detect magic, fog cloud, light; 3/day each — feather fall, fly, misty step, telekinesis; 1/day each — control weather, gaseous form."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two morningstar attacks."
      },
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) piercing damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10 + 8) bludgeoning damage."
      }
    ],
    "group": "Giants",
    "source": "srd"
  },
  {
    "name": "Storm Giant",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Good",
    "ac": 16,
    "acNote": "(scale mail)",
    "hp": 230,
    "hpFormula": "230 (20d12 + 100)",
    "speed": "50 ft., swim 50 ft.",
    "abilities": {
      "STR": 29,
      "DEX": 14,
      "CON": 20,
      "INT": 16,
      "WIS": 18,
      "CHA": 18
    },
    "savingThrows": "Str +14, Con +10, Wis +9, Cha +9",
    "skills": "Arcana +8, Athletics +14, History +8, Perception +9",
    "damageResistances": "cold",
    "damageImmunities": "lightning, thunder",
    "senses": "Darkvision 120 ft., Passive Perception 19",
    "languages": "Common, Giant",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The giant can breathe air and water."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma (spell save DC 17). It can cast the following spells without material components: At will — detect magic, feather fall, levitate, light; 3/day each — control weather, water breathing."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatsword attacks."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 30 (6d6 + 9) slashing damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +14 to hit, range 60/240 ft., one target. Hit: 35 (4d12 + 9) bludgeoning damage."
      },
      {
        "name": "Lightning Strike (Recharge 5-6)",
        "description": "The giant hurls a bolt of lightning at a point it can see within 500 feet. Each creature within 10 feet of that point must make a DC 17 Dexterity saving throw, taking 55 (10d10) lightning damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Giants",
    "source": "srd"
  },
  {
    "name": "Cyclops",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 138,
    "hpFormula": "138 (12d12 + 60)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 22,
      "DEX": 11,
      "CON": 20,
      "INT": 8,
      "WIS": 6,
      "CHA": 10
    },
    "senses": "Passive Perception 8",
    "languages": "Giant",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Poor Depth Perception",
        "description": "With only a single eye, the cyclops has disadvantage on any attack roll against a target more than 30 feet away."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The cyclops makes two greatclub attacks."
      },
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 30/120 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage."
      }
    ],
    "group": "Giants",
    "source": "mm"
  },
  {
    "name": "Fomorian",
    "size": "Huge",
    "type": "Giant",
    "alignment": "Chaotic Evil",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 149,
    "hpFormula": "149 (13d12 + 65)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 10,
      "CON": 20,
      "INT": 9,
      "WIS": 14,
      "CHA": 6
    },
    "skills": "Perception +8, Stealth +3",
    "senses": "Darkvision 120 ft., Passive Perception 18",
    "languages": "Giant, Undercommon",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "actions": [
      {
        "name": "Multiattack",
        "description": "The fomorian makes two greatclub attacks, or uses Evil Eye once and makes one greatclub attack."
      },
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 27 (4d8 + 6) bludgeoning damage, and if the target is Medium or smaller it must succeed on a DC 14 Constitution saving throw or be cursed with a magical deformity, taking disadvantage on ability checks and attack rolls until the curse ends."
      },
      {
        "name": "Evil Eye (Recharge 5-6)",
        "description": "The fomorian fixes its malevolent gaze on one creature it can see within 60 feet. The target must succeed on a DC 14 Charisma saving throw or take 27 (6d8) psychic damage and be knocked prone; on a success it takes half damage and is not knocked prone."
      }
    ],
    "group": "Giants",
    "source": "mm",
    "traits": []
  },
  {
    "name": "Air Elemental",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 15,
    "hp": 90,
    "hpFormula": "90 (12d10 + 24)",
    "speed": "0 ft., fly 90 ft. (hover)",
    "abilities": {
      "STR": 14,
      "DEX": 20,
      "CON": 14,
      "INT": 6,
      "WIS": 10,
      "CHA": 6
    },
    "damageResistances": "lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Grappled, Paralyzed, Petrified, Prone, Restrained, Unconscious",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Auran",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Air Form",
        "description": "The elemental can move through a space as narrow as 1 inch wide without squeezing."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage."
      },
      {
        "name": "Whirlwind (Recharge 4-6)",
        "description": "Each creature in the elemental's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8 + 4) bludgeoning damage and is flung up to 20 feet away and knocked prone. On a success, it takes half damage and isn't flung or knocked prone."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Earth Elemental",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 126,
    "hpFormula": "126 (12d10 + 60)",
    "speed": "30 ft., burrow 30 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 8,
      "CON": 20,
      "INT": 5,
      "WIS": 10,
      "CHA": 5
    },
    "damageVulnerabilities": "thunder",
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Paralyzed, Petrified, Poisoned, Unconscious",
    "senses": "Darkvision 60 ft., Tremorsense 60 ft., Passive Perception 10",
    "languages": "Terran",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The elemental can burrow through nonmagical, unworked earth and stone without disturbing the material it moves through."
      },
      {
        "name": "Siege Monster",
        "description": "The elemental deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Fire Elemental",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 13,
    "hp": 102,
    "hpFormula": "102 (12d10 + 36)",
    "speed": "50 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 17,
      "CON": 16,
      "INT": 6,
      "WIS": 10,
      "CHA": 7
    },
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Exhaustion, Grappled, Paralyzed, Petrified, Prone, Restrained, Unconscious",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fire Form",
        "description": "The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches it or hits it with a melee attack while within 5 feet takes 5 (1d10) fire damage. The elemental can enter a hostile creature's space and stop there, and it ignites flammable objects it touches that aren't being worn or carried."
      },
      {
        "name": "Illumination",
        "description": "The elemental sheds bright light in a 30-foot radius and dim light for an additional 30 feet."
      },
      {
        "name": "Water Susceptibility",
        "description": "For every 5 feet the elemental moves in water, or for each gallon of water splashed on it, it takes 1 cold damage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two touch attacks."
      },
      {
        "name": "Touch",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) fire damage. If the target is a creature or a flammable object, it ignites. Until someone takes an action to douse the fire, the target takes 5 (1d10) fire damage at the start of each of its turns."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Water Elemental",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 114,
    "hpFormula": "114 (12d10 + 48)",
    "speed": "30 ft., swim 90 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 14,
      "CON": 18,
      "INT": 5,
      "WIS": 10,
      "CHA": 8
    },
    "damageResistances": "acid; bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Grappled, Paralyzed, Petrified, Prone, Restrained, Unconscious",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Aquan",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Water Form",
        "description": "The elemental can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Freeze",
        "description": "If the elemental takes cold damage, it partially freezes; its speed is reduced by 20 feet until the end of its next turn."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      },
      {
        "name": "Whirlpool (Recharge 4-6)",
        "description": "Each creature in the elemental's space must make a DC 14 Strength saving throw. On a failure, a target takes 13 (2d8 + 4) bludgeoning damage and, if it is Large or smaller, is grappled (escape DC 14) and pulled to the center of the space. On a success, it takes half damage and isn't grappled."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Azer",
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Lawful Neutral",
    "ac": 17,
    "acNote": "(natural armor, shield)",
    "hp": 39,
    "hpFormula": "39 (6d8 + 12)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 12,
      "CON": 15,
      "INT": 12,
      "WIS": 13,
      "CHA": 10
    },
    "savingThrows": "Con +4",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "senses": "Passive Perception 11",
    "languages": "Ignan",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the azer or hits it with a melee attack while within 5 feet takes 5 (1d10) fire damage."
      },
      {
        "name": "Heated Weapon",
        "description": "When the azer hits with a metal melee weapon, it deals an extra 3 (1d6) fire damage (included in the attack)."
      },
      {
        "name": "Illumination",
        "description": "The azer sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "name": "Warhammer",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Salamander",
    "size": "Large",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 90,
    "hpFormula": "90 (12d10 + 24)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 14,
      "CON": 15,
      "INT": 11,
      "WIS": 10,
      "CHA": 12
    },
    "damageVulnerabilities": "cold",
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "fire",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the salamander or hits it with a melee attack while within 5 feet takes 7 (2d6) fire damage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The salamander makes two attacks: one with its spear and one with its tail."
      },
      {
        "name": "Spear",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands, plus 3 (1d6) fire damage."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) fire damage, and the target is grappled (escape DC 14). Until this grapple ends, the target is restrained, the salamander can automatically hit it with its tail, and it can't make tail attacks against other targets."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Gargoyle",
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Chaotic Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 52,
    "hpFormula": "52 (7d8 + 21)",
    "speed": "30 ft., fly 60 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 11,
      "CON": 16,
      "INT": 6,
      "WIS": 11,
      "CHA": 7
    },
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Petrified, Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Terran",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the gargoyle remains motionless, it is indistinguishable from an inanimate statue."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The gargoyle makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Invisible Stalker",
    "size": "Medium",
    "type": "Elemental",
    "alignment": "Neutral",
    "ac": 14,
    "hp": 104,
    "hpFormula": "104 (16d8 + 32)",
    "speed": "50 ft., fly 50 ft. (hover)",
    "abilities": {
      "STR": 16,
      "DEX": 19,
      "CON": 14,
      "INT": 10,
      "WIS": 15,
      "CHA": 11
    },
    "skills": "Perception +8, Stealth +10",
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "poison",
    "conditionImmunities": "Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious",
    "senses": "Darkvision 60 ft., Passive Perception 18",
    "languages": "Auran, understands Common but doesn't speak it",
    "cr": "6",
    "xp": 2300,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Invisibility",
        "description": "The stalker is invisible."
      },
      {
        "name": "Faultless Tracker",
        "description": "The stalker is given a quarry by its summoner and knows the direction and distance to that creature as long as they are on the same plane of existence. It also knows the location of its summoner."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The stalker makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Magmin",
    "size": "Small",
    "type": "Elemental",
    "alignment": "Chaotic Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 9,
    "hpFormula": "9 (2d6 + 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 7,
      "DEX": 15,
      "CON": 12,
      "INT": 8,
      "WIS": 11,
      "CHA": 10
    },
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "damageImmunities": "fire",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the magmin dies, it explodes in a burst of fire and magma. Each creature within 10 feet must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much on a success. Flammable objects that aren't being worn or carried in that area are ignited."
      },
      {
        "name": "Ignited Illumination",
        "description": "As a bonus action, the magmin can set itself ablaze or extinguish its flames. While ablaze, it sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "name": "Touch",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d6) fire damage. If the target is a creature or flammable object, it ignites. Until someone takes an action to douse the fire, the target takes 3 (1d6) fire damage at the start of each of its turns."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Dust Mephit",
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "ac": 12,
    "hp": 17,
    "hpFormula": "17 (5d6)",
    "speed": "30 ft., fly 30 ft.",
    "abilities": {
      "STR": 5,
      "DEX": 14,
      "CON": 10,
      "INT": 9,
      "WIS": 11,
      "CHA": 10
    },
    "skills": "Perception +2, Stealth +4",
    "damageVulnerabilities": "fire",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Auran, Terran",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it bursts into a cloud of dust. Each creature within 5 feet must succeed on a DC 10 Constitution saving throw or be blinded for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
      },
      {
        "name": "Blinding Breath (Recharge 6)",
        "description": "The mephit exhales a 15-foot cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Ice Mephit",
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "ac": 11,
    "hp": 21,
    "hpFormula": "21 (6d6)",
    "speed": "30 ft., fly 30 ft.",
    "abilities": {
      "STR": 7,
      "DEX": 13,
      "CON": 10,
      "INT": 9,
      "WIS": 11,
      "CHA": 12
    },
    "skills": "Perception +2, Stealth +3",
    "damageVulnerabilities": "bludgeoning, fire",
    "damageImmunities": "cold, poison",
    "conditionImmunities": "Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Aquan, Auran",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it shatters into shards of ice. Each creature within 5 feet must make a DC 10 Dexterity saving throw, taking 4 (1d8) slashing damage on a failed save, or half as much on a success."
      },
      {
        "name": "False Appearance",
        "description": "While the mephit remains motionless, it is indistinguishable from an ordinary shard of ice."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) cold damage."
      },
      {
        "name": "Frost Breath (Recharge 6)",
        "description": "The mephit exhales a 15-foot cone of cold air. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 5 (2d4) cold damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Magma Mephit",
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "ac": 11,
    "hp": 22,
    "hpFormula": "22 (5d6 + 5)",
    "speed": "30 ft., fly 30 ft.",
    "abilities": {
      "STR": 8,
      "DEX": 12,
      "CON": 12,
      "INT": 7,
      "WIS": 10,
      "CHA": 10
    },
    "skills": "Stealth +3",
    "damageVulnerabilities": "cold",
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Ignan, Terran",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of lava. Each creature within 5 feet must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much on a success."
      },
      {
        "name": "False Appearance",
        "description": "While the mephit remains motionless, it is indistinguishable from an ordinary mound of magma."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) fire damage."
      },
      {
        "name": "Fire Breath (Recharge 6)",
        "description": "The mephit exhales a 15-foot cone of fire. Each creature in that area must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Steam Mephit",
    "size": "Small",
    "type": "Elemental",
    "alignment": "Neutral Evil",
    "ac": 10,
    "hp": 21,
    "hpFormula": "21 (6d6)",
    "speed": "30 ft., fly 30 ft.",
    "abilities": {
      "STR": 5,
      "DEX": 11,
      "CON": 10,
      "INT": 11,
      "WIS": 10,
      "CHA": 12
    },
    "damageImmunities": "fire, poison",
    "conditionImmunities": "Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "Aquan, Ignan",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a cloud of steam. Each creature within 5 feet must make a DC 10 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much on a success."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) slashing damage plus 2 (1d4) fire damage."
      },
      {
        "name": "Steam Breath (Recharge 6)",
        "description": "The mephit exhales a 15-foot cone of scalding steam. Each creature in that area must make a DC 10 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Elementals",
    "source": "srd"
  },
  {
    "name": "Animated Armor",
    "size": "Medium",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 33,
    "hpFormula": "33 (6d8 + 6)",
    "speed": "25 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 11,
      "CON": 13,
      "INT": 1,
      "WIS": 3,
      "CHA": 1
    },
    "damageImmunities": "poison, psychic",
    "conditionImmunities": "Blinded, Charmed, Deafened, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "—",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, it must succeed on a DC 15 Constitution saving throw or fall unconscious for 1 minute."
      },
      {
        "name": "False Appearance",
        "description": "While the armor remains motionless, it is indistinguishable from a normal suit of armor."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The armor makes two melee attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Flying Sword",
    "size": "Small",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 17,
    "hpFormula": "17 (5d6)",
    "speed": "0 ft., fly 50 ft. (hover)",
    "abilities": {
      "STR": 12,
      "DEX": 15,
      "CON": 11,
      "INT": 1,
      "WIS": 5,
      "CHA": 1
    },
    "savingThrows": "Dex +4",
    "damageImmunities": "poison, psychic",
    "conditionImmunities": "Blinded, Charmed, Deafened, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 7",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The sword is incapacitated while in the area of an antimagic field. If targeted by dispel magic, it must succeed on a DC 15 Constitution saving throw or fall unconscious for 1 minute."
      },
      {
        "name": "False Appearance",
        "description": "While the sword remains motionless and isn't flying, it is indistinguishable from a normal sword."
      }
    ],
    "actions": [
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Rug of Smothering",
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 12,
    "hp": 33,
    "hpFormula": "33 (6d10)",
    "speed": "10 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 14,
      "CON": 10,
      "INT": 1,
      "WIS": 3,
      "CHA": 1
    },
    "savingThrows": "Dex +4",
    "damageImmunities": "poison, psychic",
    "conditionImmunities": "Blinded, Charmed, Deafened, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The rug is incapacitated while in the area of an antimagic field. If targeted by dispel magic, it must succeed on a DC 15 Constitution saving throw or fall unconscious for 1 minute."
      },
      {
        "name": "Damage Transfer",
        "description": "While it is grappling a creature, the rug takes only half the damage dealt to it, and the creature it grapples takes the other half."
      },
      {
        "name": "False Appearance",
        "description": "While the rug remains motionless, it is indistinguishable from a normal rug."
      }
    ],
    "actions": [
      {
        "name": "Smother",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one Medium or smaller creature. Hit: The creature is grappled (escape DC 13). Until this grapple ends, the target is restrained, blinded, and at risk of suffocating, and the rug can't smother another target. At the start of each of the rug's turns, the grappled target takes 10 (2d6 + 3) bludgeoning damage."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Clay Golem",
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 133,
    "hpFormula": "133 (14d10 + 56)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 9,
      "CON": 18,
      "INT": 3,
      "WIS": 8,
      "CHA": 1
    },
    "damageImmunities": "acid, poison, psychic; bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 9",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Acid Absorption",
        "description": "Whenever the golem is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt."
      },
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn with 60 hit points or fewer, roll a d6. On a 6, the golem goes berserk and attacks the nearest creature until it is destroyed or its creator calms it."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a creature, its hit point maximum is reduced by an amount equal to the damage taken, and the golem regains hit points equal to that amount. The reduction lasts until removed by a greater restoration spell or similar magic."
      },
      {
        "name": "Haste (Recharge 5-6)",
        "description": "Until the end of its next turn, the golem magically gains a +2 bonus to its AC, has advantage on Dexterity saving throws, and can use its slam attack as a bonus action."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Flesh Golem",
    "size": "Medium",
    "type": "Construct",
    "alignment": "Neutral",
    "ac": 9,
    "hp": 93,
    "hpFormula": "93 (11d8 + 44)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 9,
      "CON": 18,
      "INT": 6,
      "WIS": 10,
      "CHA": 5
    },
    "damageImmunities": "lightning, poison; bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk and attacks the nearest creature until it is destroyed or its rage is calmed."
      },
      {
        "name": "Aversion of Fire",
        "description": "If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Lightning Absorption",
        "description": "Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Stone Golem",
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 178,
    "hpFormula": "178 (17d10 + 85)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 22,
      "DEX": 9,
      "CON": 20,
      "INT": 3,
      "WIS": 11,
      "CHA": 1
    },
    "damageImmunities": "poison, psychic; bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "10",
    "xp": 5900,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."
      },
      {
        "name": "Slow (Recharge 5-6)",
        "description": "The golem targets one or more creatures it can see within 10 feet. Each target must make a DC 17 Wisdom saving throw. On a failed save, a target is affected as if by the slow spell for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Iron Golem",
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 20,
    "acNote": "(natural armor)",
    "hp": 210,
    "hpFormula": "210 (20d10 + 100)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 24,
      "DEX": 9,
      "CON": 20,
      "INT": 3,
      "WIS": 11,
      "CHA": 1
    },
    "damageImmunities": "fire, poison, psychic; bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned",
    "senses": "Darkvision 120 ft., Passive Perception 10",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "16",
    "xp": 15000,
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Fire Absorption",
        "description": "Whenever the golem is subjected to fire damage, it takes no damage and instead regains a number of hit points equal to the fire damage dealt."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two attacks: one with its slam and one with its sword."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage."
      },
      {
        "name": "Sword",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 23 (3d10 + 7) slashing damage."
      },
      {
        "name": "Poison Breath (Recharge 6)",
        "description": "The golem exhales poisonous gas in a 15-foot cone. Each creature in that area must make a DC 19 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much on a success."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Homunculus",
    "size": "Tiny",
    "type": "Construct",
    "alignment": "Neutral",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 5,
    "hpFormula": "5 (2d4)",
    "speed": "20 ft., fly 40 ft.",
    "abilities": {
      "STR": 4,
      "DEX": 15,
      "CON": 11,
      "INT": 10,
      "WIS": 10,
      "CHA": 7
    },
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "While the homunculus is on the same plane of existence as its master, it can magically convey what it senses to its master, and the two can communicate telepathically."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If it fails the save by 5 or more, the target is instead poisoned for 5 minutes and unconscious while poisoned in this way."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Shield Guardian",
    "size": "Large",
    "type": "Construct",
    "alignment": "Unaligned",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 142,
    "hpFormula": "142 (15d10 + 60)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 8,
      "CON": 18,
      "INT": 7,
      "WIS": 10,
      "CHA": 3
    },
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned",
    "senses": "Blindsight 10 ft., Darkvision 60 ft., Passive Perception 10",
    "languages": "understands commands given in any language but can't speak",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Bound",
        "description": "The guardian is magically bound to an amulet. As long as the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet."
      },
      {
        "name": "Regeneration",
        "description": "The guardian regains 10 hit points at the start of its turn if it has at least 1 hit point."
      },
      {
        "name": "Spell Storing",
        "description": "A spellcaster who wears the guardian's amulet can store one spell of 4th level or lower in the guardian. To do so, the wearer must cast the spell on the guardian. The guardian can then cast the spell later, using the wearer's spellcasting ability."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The guardian makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."
      }
    ],
    "reactions": [
      {
        "name": "Shield",
        "description": "When a creature makes an attack against the wearer of the guardian's amulet, the guardian grants a +2 bonus to the wearer's AC if the guardian is within 5 feet of the wearer."
      }
    ],
    "group": "Constructs",
    "source": "srd"
  },
  {
    "name": "Helmed Horror",
    "size": "Medium",
    "type": "Construct",
    "alignment": "Neutral",
    "ac": 20,
    "acNote": "(plate armor, shield)",
    "hp": 60,
    "hpFormula": "60 (8d8 + 24)",
    "speed": "30 ft., fly 30 ft. (hover)",
    "abilities": {
      "STR": 18,
      "DEX": 13,
      "CON": 16,
      "INT": 10,
      "WIS": 10,
      "CHA": 10
    },
    "damageImmunities": "force, necrotic, poison",
    "conditionImmunities": "Blinded, Charmed, Deafened, Frightened, Paralyzed, Petrified, Poisoned, Stunned",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 10",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The helmed horror has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Spell Immunity",
        "description": "The helmed horror is immune to three spells chosen by its creator. Typical immunities include fireball, heat metal, and lightning bolt."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The helmed horror makes two longsword attacks."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
      }
    ],
    "group": "Constructs",
    "source": "mm"
  },
  {
    "name": "Scarecrow",
    "size": "Medium",
    "type": "Construct",
    "alignment": "Chaotic Evil",
    "ac": 11,
    "hp": 36,
    "hpFormula": "36 (8d8)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 13,
      "CON": 11,
      "INT": 10,
      "WIS": 10,
      "CHA": 13
    },
    "damageVulnerabilities": "fire",
    "damageImmunities": "poison",
    "conditionImmunities": "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned, Unconscious",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "understands the languages of its creator but can't speak",
    "cr": "1",
    "xp": 200,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the scarecrow remains motionless, it is indistinguishable from an ordinary, inanimate scarecrow."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The scarecrow makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage. If the target is a creature, it must succeed on a DC 11 Wisdom saving throw or be frightened until the end of its next turn."
      },
      {
        "name": "Terrifying Glare",
        "description": "The scarecrow targets one creature it can see within 30 feet. If the target can see the scarecrow, it must succeed on a DC 11 Wisdom saving throw or be frightened for 1 minute, repeating the save at the end of each of its turns. A creature already frightened by the scarecrow that fails this save is paralyzed instead."
      }
    ],
    "group": "Constructs",
    "source": "mm"
  },
  {
    "name": "Aboleth",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "ac": 17,
    "acNote": "(natural armor)",
    "hp": 135,
    "hpFormula": "135 (18d10 + 36)",
    "speed": "10 ft., swim 40 ft.",
    "abilities": {
      "STR": 21,
      "DEX": 9,
      "CON": 15,
      "INT": 18,
      "WIS": 15,
      "CHA": 18
    },
    "savingThrows": "Con +6, Int +8, Wis +6",
    "skills": "History +12, Perception +10",
    "senses": "Darkvision 120 ft., Passive Perception 20",
    "languages": "Deep Speech, telepathy 120 ft.",
    "cr": "10",
    "xp": 5900,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The aboleth can breathe air and water."
      },
      {
        "name": "Mucous Cloud",
        "description": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or hits it with a melee attack while within 5 feet must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours and can breathe only underwater."
      },
      {
        "name": "Probing Telepathy",
        "description": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if it can see the creature."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The aboleth makes three tentacle attacks."
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, and it must remain in water or take 6 (1d12) acid damage every 10 minutes."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) bludgeoning damage."
      },
      {
        "name": "Enslave (3/Day)",
        "description": "The aboleth targets one creature it can see within 30 feet. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or is on a different plane. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically over any distance."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The aboleth makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Swipe",
        "description": "The aboleth makes one tail attack."
      },
      {
        "name": "Psychic Drain (Costs 2 Actions)",
        "description": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage dealt."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Mind Flayer",
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "ac": 15,
    "acNote": "(breastplate)",
    "hp": 71,
    "hpFormula": "71 (13d8 + 13)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 11,
      "DEX": 12,
      "CON": 12,
      "INT": 19,
      "WIS": 17,
      "CHA": 17
    },
    "savingThrows": "Int +7, Wis +6, Cha +6",
    "skills": "Arcana +7, Deception +6, Insight +6, Perception +6, Persuasion +6, Stealth +4",
    "senses": "Darkvision 120 ft., Passive Perception 16",
    "languages": "Deep Speech, Undercommon, telepathy 120 ft.",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The mind flayer has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Innate Spellcasting (Psionics)",
        "description": "The mind flayer's innate spellcasting ability is Intelligence (spell save DC 15). It can innately cast the following spells, requiring no components: At will — detect thoughts, levitate; 1/day each — dominate monster, plane shift (self only)."
      }
    ],
    "actions": [
      {
        "name": "Tentacles",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 15 (2d10 + 4) psychic damage. If the target is Medium or smaller, it is grappled (escape DC 15) and must succeed on a DC 15 Intelligence saving throw or be stunned until this grapple ends."
      },
      {
        "name": "Extract Brain",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one incapacitated humanoid grappled by the mind flayer. Hit: 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, the mind flayer kills the target by extracting and devouring its brain."
      },
      {
        "name": "Mind Blast (Recharge 5-6)",
        "description": "The mind flayer emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 15 Intelligence saving throw, taking 22 (4d8 + 4) psychic damage and being stunned for 1 minute on a failure, or half damage and not stunned on a success. A stunned creature repeats the save at the end of each of its turns to end the effect."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Beholder",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "ac": 18,
    "acNote": "(natural armor)",
    "hp": 180,
    "hpFormula": "180 (19d10 + 76)",
    "speed": "0 ft., fly 20 ft. (hover)",
    "abilities": {
      "STR": 10,
      "DEX": 14,
      "CON": 18,
      "INT": 17,
      "WIS": 15,
      "CHA": 17
    },
    "savingThrows": "Int +8, Wis +7, Cha +8",
    "skills": "Perception +12",
    "conditionImmunities": "Prone",
    "senses": "Darkvision 120 ft., Passive Perception 22",
    "languages": "Deep Speech, Undercommon",
    "cr": "13",
    "xp": 10000,
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Antimagic Cone",
        "description": "The beholder's central eye creates an area of antimagic, as in the antimagic field spell, in a 150-foot cone. At the start of each of its turns, the beholder decides which way the cone faces and whether it is active. Within the cone, spells can't be cast, active spells are suppressed, and the beholder's own eye rays can't be used."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (4d6) piercing damage."
      },
      {
        "name": "Eye Rays",
        "description": "The beholder shoots three of the following magical eye rays at random (reroll duplicates), choosing one to three targets it can see within 120 feet: (1) Charm Ray — DC 16 Wis save or charmed for 1 hour; (2) Paralyzing Ray — DC 16 Con save or paralyzed for 1 minute; (3) Fear Ray — DC 16 Wis save or frightened for 1 minute; (4) Slowing Ray — DC 16 Dex save or halved speed and penalties for 1 minute; (5) Enervation Ray — DC 16 Con save, 36 (8d8) necrotic or half; (6) Telekinetic Ray — moves or restrains a target (Str contest); (7) Sleep Ray — DC 16 Wis save or falls asleep; (8) Petrification Ray — DC 16 Dex save or begins turning to stone; (9) Disintegration Ray — DC 16 Dex save, 45 (10d8) force or half; (10) Death Ray — DC 16 Dex save, 55 (10d10) necrotic or half."
      }
    ],
    "legendaryActions": [
      {
        "name": "Eye Ray",
        "description": "The beholder uses one random eye ray against a target it can see within 120 feet."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Spectator",
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Lawful Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 39,
    "hpFormula": "39 (6d8 + 12)",
    "speed": "0 ft., fly 30 ft. (hover)",
    "abilities": {
      "STR": 8,
      "DEX": 14,
      "CON": 14,
      "INT": 13,
      "WIS": 14,
      "CHA": 11
    },
    "skills": "Perception +6",
    "conditionImmunities": "Prone",
    "senses": "Darkvision 120 ft., Passive Perception 16",
    "languages": "Deep Speech, Undercommon, telepathy 120 ft.",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Guardian",
        "description": "The spectator is summoned to guard a treasure or location for up to 101 years, obeying its summoner and defending its charge with single-minded devotion."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 - 1) piercing damage."
      },
      {
        "name": "Eye Rays",
        "description": "The spectator shoots two of the following magical eye rays at random (reroll duplicates), choosing one or two targets it can see within 90 feet: (1) Confusion Ray — DC 13 Wis save or can't take reactions and moves and acts randomly until the end of its next turn; (2) Paralyzing Ray — DC 13 Con save or paralyzed for 1 minute; (3) Fear Ray — DC 13 Wis save or frightened for 1 minute; (4) Wounding Ray — DC 13 Con save, 16 (3d10) necrotic or half."
      }
    ],
    "reactions": [
      {
        "name": "Spell Reflection",
        "description": "If the spectator makes a successful saving throw against a spell, or a spell attack misses it, the spectator can redirect the spell at one creature it can see within 30 feet of it as a reaction."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Gibbering Mouther",
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral",
    "ac": 9,
    "hp": 67,
    "hpFormula": "67 (9d8 + 27)",
    "speed": "10 ft., swim 10 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 8,
      "CON": 16,
      "INT": 3,
      "WIS": 10,
      "CHA": 6
    },
    "conditionImmunities": "Prone",
    "senses": "Darkvision 60 ft., Passive Perception 10",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aberrant Ground",
        "description": "The ground in a 10-foot radius around the mouther is doughlike difficult terrain. Each creature that starts its turn in that area must succeed on a DC 10 Strength saving throw or have its speed reduced to 0 until the start of its next turn."
      },
      {
        "name": "Gibbering",
        "description": "The mouther babbles incoherently while it can see any creature and isn't incapacitated. Each creature that starts its turn within 20 feet and can hear the gibbering must succeed on a DC 10 Wisdom saving throw or, on a failure, roll to determine whether it can act normally, moves randomly, or wastes its action."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The mouther makes one bite attack and, if it can, uses its Blinding Spittle."
      },
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 17 (5d6) piercing damage. If the target is Medium or smaller, it must succeed on a DC 10 Strength saving throw or fall prone. If the target is killed by this damage, it is absorbed into the mouther."
      },
      {
        "name": "Blinding Spittle (Recharge 5-6)",
        "description": "The mouther spits a chemical glob at a point it can see within 15 feet. The glob explodes in a blinding flash of light on impact. Each creature within 5 feet of the flash must succeed on a DC 10 Dexterity saving throw or be blinded until the end of the mouther's next turn."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Otyugh",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 114,
    "hpFormula": "114 (12d10 + 48)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 11,
      "CON": 19,
      "INT": 6,
      "WIS": 13,
      "CHA": 6
    },
    "savingThrows": "Con +7",
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "Otyugh, telepathy 120 ft. (limited to simple ideas)",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Limited Telepathy",
        "description": "The otyugh can magically transmit simple messages and images to any creature within 120 feet that can understand a language. This telepathy doesn't allow the receiving creature to telepathically respond."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The otyugh makes three attacks: one with its bite and two with its tentacles."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the target must repeat the save, reducing its hit point maximum by 5 (1d10) on a failure until cured."
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) piercing damage. If the target is Medium or smaller, it is grappled (escape DC 13) and restrained until the grapple ends. The otyugh has two tentacles, each of which can grapple one target."
      },
      {
        "name": "Tentacle Slam",
        "description": "The otyugh slams creatures grappled by it into each other or a solid surface. Each creature must succeed on a DC 14 Constitution saving throw or take 10 (2d6 + 3) bludgeoning damage and be stunned until the end of the otyugh's next turn. On a success, the target takes half the damage and isn't stunned."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Cloaker",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 78,
    "hpFormula": "78 (12d10 + 12)",
    "speed": "10 ft., fly 40 ft.",
    "abilities": {
      "STR": 17,
      "DEX": 15,
      "CON": 12,
      "INT": 13,
      "WIS": 12,
      "CHA": 14
    },
    "skills": "Stealth +5",
    "senses": "Darkvision 60 ft., Passive Perception 11",
    "languages": "Deep Speech, Undercommon",
    "cr": "8",
    "xp": 3900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Damage Transfer",
        "description": "While attached to a creature, the cloaker takes only half the damage dealt to it, and the creature it is attached to takes the other half."
      },
      {
        "name": "False Appearance",
        "description": "While the cloaker remains motionless without its underside exposed, it is indistinguishable from a dark leather cloak."
      },
      {
        "name": "Light Sensitivity",
        "description": "While in bright light, the cloaker has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The cloaker makes two attacks: one with its bite and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) piercing damage. If the target is Large or smaller, the cloaker attaches to it. While attached, the cloaker can attack only the target but has advantage on its attack rolls; the target is blinded and unable to breathe, and the cloaker moves with it."
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 7 (1d8 + 3) slashing damage."
      },
      {
        "name": "Moan",
        "description": "Each creature within 60 feet of the cloaker that can hear its moan and that isn't an aberration must succeed on a DC 13 Wisdom saving throw or become frightened until the end of the cloaker's next turn. A creature that succeeds is immune to this cloaker's moan for 24 hours."
      },
      {
        "name": "Phantasms (Recharge After a Short or Long Rest)",
        "description": "The cloaker magically creates three illusory duplicates of itself if it isn't in bright light. The duplicates move with it and mimic its actions, making it hard to tell which is real. When the cloaker takes damage while duplicates remain, roll to see whether a duplicate is destroyed instead."
      }
    ],
    "reactions": [
      {
        "name": "Fog",
        "description": "When damaged, the cloaker releases a cloud of inky fog if it is in an area of dim light or darkness. The fog fills a 10-foot cube and heavily obscures the area; each creature other than the cloaker in that area is blinded while in it."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Chuul",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Evil",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 93,
    "hpFormula": "93 (11d10 + 33)",
    "speed": "30 ft., swim 30 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 10,
      "CON": 16,
      "INT": 5,
      "WIS": 11,
      "CHA": 5
    },
    "skills": "Perception +4",
    "damageImmunities": "poison",
    "conditionImmunities": "Poisoned",
    "senses": "Darkvision 60 ft., Passive Perception 14",
    "languages": "understands Deep Speech but can't speak",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The chuul can breathe air and water."
      },
      {
        "name": "Sense Magic",
        "description": "The chuul senses magic within 120 feet of it at will. This trait otherwise works like the detect magic spell but isn't itself magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The chuul makes two pincer attacks. If it is grappling a creature, it can also use its tentacles once."
      },
      {
        "name": "Pincer",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature and the chuul doesn't have two other creatures grappled."
      },
      {
        "name": "Tentacles",
        "description": "One creature grappled by the chuul must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target repeats the save at the end of each of its turns, ending the effect on a success."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Grell",
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "ac": 12,
    "hp": 55,
    "hpFormula": "55 (10d8 + 10)",
    "speed": "10 ft., fly 30 ft. (hover)",
    "abilities": {
      "STR": 15,
      "DEX": 14,
      "CON": 13,
      "INT": 12,
      "WIS": 11,
      "CHA": 9
    },
    "skills": "Perception +2, Stealth +6",
    "damageImmunities": "lightning",
    "conditionImmunities": "Blinded, Prone",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 12",
    "languages": "Grell",
    "cr": "3",
    "xp": 700,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Weightlessness",
        "description": "The grell floats effortlessly through the air, unaffected by its own weight as it drifts and hunts."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The grell makes two attacks: one with its tentacles and one with its beak."
      },
      {
        "name": "Tentacles",
        "description": "Melee Weapon Attack: +4 to hit, reach 10 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed, repeating the save at the end of each of its turns. The target is also grappled (escape DC 15); until this grapple ends, the target is restrained, and the grell can't use its tentacles on another target."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage."
      }
    ],
    "group": "Aberrations",
    "source": "mm"
  },
  {
    "name": "Nothic",
    "size": "Medium",
    "type": "Aberration",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 45,
    "hpFormula": "45 (6d8 + 18)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 16,
      "CON": 16,
      "INT": 13,
      "WIS": 10,
      "CHA": 8
    },
    "skills": "Arcana +3, Insight +4, Perception +2, Stealth +5",
    "senses": "Truesight 120 ft., Passive Perception 12",
    "languages": "Undercommon",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The nothic has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The nothic makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."
      },
      {
        "name": "Rotting Gaze",
        "description": "The nothic targets one creature it can see within 30 feet. The target must make a DC 12 Constitution saving throw against this magic, taking 10 (3d6) necrotic damage on a failed save, or half as much on a success."
      },
      {
        "name": "Weird Insight",
        "description": "The nothic targets one creature it can see within 30 feet. The target must contest its Charisma (Deception) check against the nothic's Wisdom (Insight) check. If the nothic wins, it magically learns one fact or secret about the target."
      }
    ],
    "group": "Aberrations",
    "source": "mm"
  },
  {
    "name": "Intellect Devourer",
    "size": "Tiny",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "ac": 12,
    "hp": 21,
    "hpFormula": "21 (6d4 + 6)",
    "speed": "40 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 14,
      "CON": 13,
      "INT": 12,
      "WIS": 11,
      "CHA": 10
    },
    "skills": "Perception +2, Stealth +4",
    "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
    "conditionImmunities": "Blinded",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 12",
    "languages": "understands Deep Speech and Undercommon but can't speak",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Detect Sentience",
        "description": "The intellect devourer can sense the presence and location of any creature within 300 feet that has an Intelligence of 3 or higher, regardless of interposing barriers, unless the creature is protected against divination magic."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The intellect devourer makes one claw attack and uses Devour Intellect."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d6) slashing damage."
      },
      {
        "name": "Devour Intellect",
        "description": "The intellect devourer targets one creature it can see within 10 feet that has a brain. The target must succeed on a DC 12 Intelligence saving throw or take 11 (2d10) psychic damage. On a failure, the target's Intelligence is reduced by 1d4; if this reduces it to 0, the target is stunned until it regains at least one point of Intelligence."
      },
      {
        "name": "Body Thief",
        "description": "The intellect devourer makes an Intelligence check contested by the Intelligence check of an incapacitated humanoid within 5 feet. On a success, it magically consumes the target's brain, teleports into its skull, and takes control of the body."
      }
    ],
    "group": "Aberrations",
    "source": "srd"
  },
  {
    "name": "Slaad, Red",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "ac": 14,
    "acNote": "(natural armor)",
    "hp": 93,
    "hpFormula": "93 (11d10 + 33)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 15,
      "CON": 16,
      "INT": 6,
      "WIS": 6,
      "CHA": 8
    },
    "skills": "Perception +2",
    "senses": "Darkvision 60 ft., Passive Perception 12",
    "languages": "Slaad, telepathy 60 ft.",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The slaad regains 10 hit points at the start of its turn if it has at least 1 hit point."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The slaad makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 4) slashing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be infected with a slaad egg. Roughly three months later, a slaad tadpole emerges, consuming the host from within."
      }
    ],
    "group": "Aberrations",
    "source": "mm"
  },
  {
    "name": "Slaad, Blue",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Chaotic Neutral",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 123,
    "hpFormula": "123 (13d10 + 52)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 20,
      "DEX": 15,
      "CON": 18,
      "INT": 7,
      "WIS": 7,
      "CHA": 9
    },
    "skills": "Perception +3",
    "senses": "Darkvision 60 ft., Passive Perception 13",
    "languages": "Slaad, telepathy 60 ft.",
    "cr": "7",
    "xp": 2900,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The slaad regains 10 hit points at the start of its turn if it has at least 1 hit point."
      },
      {
        "name": "Magic Resistance",
        "description": "The slaad has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The slaad makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage. If the target is a humanoid, it must succeed on a DC 15 Constitution saving throw or contract a wasting disease that transforms it into a red slaad over time."
      }
    ],
    "group": "Aberrations",
    "source": "mm"
  },
  {
    "name": "Gray Ooze",
    "size": "Medium",
    "type": "Ooze",
    "alignment": "Unaligned",
    "ac": 8,
    "hp": 22,
    "hpFormula": "22 (3d8 + 9)",
    "speed": "10 ft., climb 10 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 6,
      "CON": 16,
      "INT": 1,
      "WIS": 6,
      "CHA": 2
    },
    "skills": "Stealth +2",
    "damageResistances": "acid, cold, fire",
    "conditionImmunities": "Blinded, Charmed, Deafened, Exhaustion, Frightened, Prone",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The ooze can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Corrode Metal",
        "description": "Nonmagical metal that touches the ooze corrodes. Each time the ooze hits nonmagical metal armor or a weapon, the item takes a permanent -1 penalty and is destroyed once the penalty reaches -5 or -4 respectively."
      },
      {
        "name": "False Appearance",
        "description": "While the ooze remains motionless, it is indistinguishable from an oily pool or wet rock."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage plus 7 (2d6) acid damage, and if the target is wearing nonmagical metal armor, its armor is partly corroded and takes a permanent -1 penalty to the AC it offers."
      }
    ],
    "group": "Oozes",
    "source": "srd"
  },
  {
    "name": "Ochre Jelly",
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "ac": 8,
    "hp": 45,
    "hpFormula": "45 (6d10 + 12)",
    "speed": "10 ft., climb 10 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 6,
      "CON": 14,
      "INT": 2,
      "WIS": 6,
      "CHA": 1
    },
    "damageResistances": "acid",
    "damageImmunities": "lightning, slashing",
    "conditionImmunities": "Blinded, Charmed, Deafened, Exhaustion, Frightened, Prone",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The jelly can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Spider Climb",
        "description": "The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Split",
        "description": "When a jelly with at least 10 hit points is subjected to lightning or slashing damage, it splits into two new jellies if it has enough hit points. Each new jelly has hit points equal to half the original's, rounded down, and shares its statistics."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) bludgeoning damage plus 3 (1d6) acid damage."
      }
    ],
    "group": "Oozes",
    "source": "srd"
  },
  {
    "name": "Black Pudding",
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "ac": 7,
    "hp": 85,
    "hpFormula": "85 (10d10 + 30)",
    "speed": "20 ft., climb 20 ft.",
    "abilities": {
      "STR": 16,
      "DEX": 5,
      "CON": 16,
      "INT": 1,
      "WIS": 6,
      "CHA": 1
    },
    "damageImmunities": "acid, cold, lightning, slashing",
    "conditionImmunities": "Blinded, Charmed, Deafened, Exhaustion, Frightened, Prone",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "—",
    "cr": "4",
    "xp": 1100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The pudding can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Corrosive Form",
        "description": "A creature that touches the pudding or hits it with a melee attack while within 5 feet takes 4 (1d8) acid damage. Any nonmagical weapon that hits the pudding corrodes, taking a permanent -1 penalty to damage. Nonmagical ammunition that hits it is destroyed. The pudding can eat through 2 inches of nonmagical material each round."
      },
      {
        "name": "Spider Climb",
        "description": "The pudding can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Split",
        "description": "When a pudding with at least 10 hit points is subjected to lightning or slashing damage, it splits into two new puddings if it has enough hit points. Each new pudding has hit points equal to half the original's, rounded down, and shares its statistics."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage. If the target is wearing nonmagical armor, its armor is partly dissolved and takes a permanent -1 penalty to the AC it offers, and the armor is destroyed if this penalty reduces its AC to 10."
      }
    ],
    "group": "Oozes",
    "source": "srd"
  },
  {
    "name": "Gelatinous Cube",
    "size": "Large",
    "type": "Ooze",
    "alignment": "Unaligned",
    "ac": 6,
    "hp": 84,
    "hpFormula": "84 (8d10 + 40)",
    "speed": "15 ft.",
    "abilities": {
      "STR": 14,
      "DEX": 3,
      "CON": 20,
      "INT": 1,
      "WIS": 6,
      "CHA": 1
    },
    "conditionImmunities": "Blinded, Charmed, Deafened, Exhaustion, Frightened, Prone",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 8",
    "languages": "—",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ooze Cube",
        "description": "The cube takes up its entire space. Other creatures can enter that space, but doing so subjects them to the cube's Engulf and risks being caught in acid. A creature in the cube's space can be seen but has total cover."
      },
      {
        "name": "Transparent",
        "description": "Even when the cube is in plain sight, it takes a successful DC 15 Wisdom (Perception) check to spot a cube that has neither moved nor attacked. A creature that tries to enter the cube's space while unaware of it is surprised by the cube."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) acid damage."
      },
      {
        "name": "Engulf",
        "description": "The cube moves up to its speed. While doing so, it can enter Large or smaller creatures' spaces. Each creature whose space it enters must succeed on a DC 12 Dexterity saving throw. On a success, the creature can choose to be pushed 5 feet aside. On a failure, the creature is engulfed, restrained, unable to breathe, and takes 21 (6d6) acid damage at the start of each of the cube's turns."
      }
    ],
    "group": "Oozes",
    "source": "srd"
  },
  {
    "name": "Shambling Mound",
    "size": "Large",
    "type": "Plant",
    "alignment": "Unaligned",
    "ac": 15,
    "acNote": "(natural armor)",
    "hp": 136,
    "hpFormula": "136 (16d10 + 48)",
    "speed": "20 ft., swim 20 ft.",
    "abilities": {
      "STR": 18,
      "DEX": 8,
      "CON": 16,
      "INT": 5,
      "WIS": 10,
      "CHA": 5
    },
    "skills": "Stealth +2",
    "damageResistances": "cold, fire",
    "damageImmunities": "lightning",
    "conditionImmunities": "Blinded, Deafened, Exhaustion",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 10",
    "languages": "—",
    "cr": "5",
    "xp": 1800,
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Lightning Absorption",
        "description": "Whenever the shambling mound is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The shambling mound makes two slam attacks. If both hit the same Medium or smaller target, the target is grappled (escape DC 14), and the mound uses its Engulf on it."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."
      },
      {
        "name": "Engulf",
        "description": "The shambling mound engulfs a Medium or smaller creature grappled by it. The engulfed target is blinded, restrained, and unable to breathe, and it must succeed on a DC 14 Constitution saving throw at the start of each of the mound's turns or take 13 (2d8 + 4) bludgeoning damage. If the mound moves, the engulfed target moves with it. The mound can have only one creature engulfed at a time."
      }
    ],
    "group": "Plants",
    "source": "srd"
  },
  {
    "name": "Treant",
    "size": "Huge",
    "type": "Plant",
    "alignment": "Chaotic Good",
    "ac": 16,
    "acNote": "(natural armor)",
    "hp": 138,
    "hpFormula": "138 (12d12 + 60)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 23,
      "DEX": 8,
      "CON": 21,
      "INT": 12,
      "WIS": 16,
      "CHA": 12
    },
    "damageResistances": "bludgeoning, piercing",
    "damageVulnerabilities": "fire",
    "senses": "Passive Perception 13",
    "languages": "Common, Druidic, Elvish, Sylvan",
    "cr": "9",
    "xp": 5000,
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the treant remains motionless, it is indistinguishable from a normal tree."
      },
      {
        "name": "Siege Monster",
        "description": "The treant deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The treant makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 16 (3d6 + 6) bludgeoning damage."
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +10 to hit, range 60/180 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage."
      },
      {
        "name": "Animate Trees (1/Day)",
        "description": "The treant magically animates one or two trees it can see within 60 feet. These trees have the same statistics as a treant, except they have Intelligence and Charisma scores of 1, can't speak, and have only the slam action. An animated tree acts as an ally of the treant and remains animate for 1 day or until it dies, the treant dies, or the treant dismisses it as a bonus action."
      }
    ],
    "group": "Plants",
    "source": "srd"
  },
  {
    "name": "Awakened Tree",
    "size": "Huge",
    "type": "Plant",
    "alignment": "Unaligned",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 59,
    "hpFormula": "59 (7d12 + 14)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 19,
      "DEX": 6,
      "CON": 15,
      "INT": 10,
      "WIS": 10,
      "CHA": 7
    },
    "damageResistances": "bludgeoning, piercing",
    "damageVulnerabilities": "fire",
    "senses": "Passive Perception 10",
    "languages": "one language known by its creator",
    "cr": "2",
    "xp": 450,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the tree remains motionless, it is indistinguishable from a normal tree."
      }
    ],
    "actions": [
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage."
      }
    ],
    "group": "Plants",
    "source": "srd"
  },
  {
    "name": "Twig Blight",
    "size": "Small",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "ac": 13,
    "acNote": "(natural armor)",
    "hp": 4,
    "hpFormula": "4 (1d6 + 1)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 6,
      "DEX": 13,
      "CON": 12,
      "INT": 4,
      "WIS": 8,
      "CHA": 3
    },
    "skills": "Stealth +3",
    "damageVulnerabilities": "fire",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 9",
    "languages": "understands Common but can't speak",
    "cr": "1/8",
    "xp": 25,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the twig blight remains motionless, it is indistinguishable from a dead shrub."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage."
      }
    ],
    "group": "Plants",
    "source": "srd"
  },
  {
    "name": "Needle Blight",
    "size": "Medium",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 11,
    "hpFormula": "11 (2d8 + 2)",
    "speed": "30 ft.",
    "abilities": {
      "STR": 12,
      "DEX": 12,
      "CON": 13,
      "INT": 4,
      "WIS": 8,
      "CHA": 3
    },
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 9",
    "languages": "understands Common but can't speak",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (2d4) piercing damage."
      },
      {
        "name": "Needles",
        "description": "Ranged Weapon Attack: +3 to hit, range 30/60 ft., one target. Hit: 8 (2d6 + 1) piercing damage."
      }
    ],
    "group": "Plants",
    "source": "srd",
    "traits": []
  },
  {
    "name": "Vine Blight",
    "size": "Medium",
    "type": "Plant",
    "alignment": "Neutral Evil",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 26,
    "hpFormula": "26 (4d8 + 8)",
    "speed": "10 ft.",
    "abilities": {
      "STR": 15,
      "DEX": 8,
      "CON": 14,
      "INT": 5,
      "WIS": 10,
      "CHA": 3
    },
    "skills": "Stealth +1",
    "senses": "Blindsight 60 ft. (blind beyond this radius), Passive Perception 10",
    "languages": "understands Common but can't speak",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the vine blight remains motionless, it is indistinguishable from a tangle of vines."
      }
    ],
    "actions": [
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +4 to hit, reach 10 ft., one creature. Hit: 9 (2d6 + 2) bludgeoning damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the vine blight can't constrict another target."
      },
      {
        "name": "Entangling Plants (Recharge 5-6)",
        "description": "Grasping roots and vines sprout in a 15-foot radius centered on the blight, turning the ground there into difficult terrain until the effect ends. Each creature other than the blight in that area when it appears must succeed on a DC 12 Strength saving throw or be restrained. A creature can free itself or another with a successful DC 12 Strength check as an action."
      }
    ],
    "group": "Plants",
    "source": "srd"
  },
  {
    "name": "Myconid Adult",
    "size": "Medium",
    "type": "Plant",
    "alignment": "Lawful Neutral",
    "ac": 12,
    "acNote": "(natural armor)",
    "hp": 22,
    "hpFormula": "22 (4d8 + 4)",
    "speed": "20 ft.",
    "abilities": {
      "STR": 10,
      "DEX": 10,
      "CON": 12,
      "INT": 10,
      "WIS": 13,
      "CHA": 7
    },
    "senses": "Darkvision 120 ft., Passive Perception 11",
    "languages": "—",
    "cr": "1/2",
    "xp": 100,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Distress Spores",
        "description": "When the myconid takes damage, all other myconids within 240 feet can sense its pain and communicate its distress through their spore network."
      },
      {
        "name": "Sun Sickness",
        "description": "While in sunlight, the myconid has disadvantage on ability checks, attack rolls, and saving throws. It also gains one level of exhaustion for each hour spent in the sun."
      }
    ],
    "actions": [
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) bludgeoning damage."
      },
      {
        "name": "Pacifying Spores (3/Day)",
        "description": "The myconid releases spores at one creature it can see within 5 feet. The target must succeed on a DC 11 Constitution saving throw or be stunned for 1 minute, repeating the save at the end of each of its turns to end the effect."
      }
    ],
    "group": "Plants",
    "source": "srd"
  },
  {
    "name": "Shrieker",
    "size": "Medium",
    "type": "Plant",
    "alignment": "Unaligned",
    "ac": 5,
    "hp": 13,
    "hpFormula": "13 (3d8)",
    "speed": "0 ft.",
    "abilities": {
      "STR": 1,
      "DEX": 1,
      "CON": 10,
      "INT": 1,
      "WIS": 3,
      "CHA": 1
    },
    "conditionImmunities": "Blinded, Charmed, Deafened, Frightened",
    "senses": "Blindsight 30 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "—",
    "cr": "0",
    "xp": 10,
    "proficiencyBonus": 2,
    "reactions": [
      {
        "name": "Shriek",
        "description": "When bright light or a creature comes within 30 feet of the shrieker, it emits a piercing shriek audible up to 300 feet away. The shrieker continues to shriek until the disturbance moves out of range and for 1d4 of its turns afterward."
      }
    ],
    "group": "Plants",
    "source": "srd",
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the shrieker remains motionless, it is indistinguishable from an ordinary fungus."
      }
    ],
    "actions": []
  },
  {
    "name": "Violet Fungus",
    "size": "Medium",
    "type": "Plant",
    "alignment": "Unaligned",
    "ac": 5,
    "hp": 18,
    "hpFormula": "18 (4d8)",
    "speed": "5 ft.",
    "abilities": {
      "STR": 3,
      "DEX": 1,
      "CON": 10,
      "INT": 1,
      "WIS": 3,
      "CHA": 1
    },
    "conditionImmunities": "Blinded, Deafened, Frightened",
    "senses": "Blindsight 30 ft. (blind beyond this radius), Passive Perception 6",
    "languages": "—",
    "cr": "1/4",
    "xp": 50,
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the violet fungus remains motionless, it is indistinguishable from an ordinary fungus."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The fungus makes 1d4 rotting touch attacks."
      },
      {
        "name": "Rotting Touch",
        "description": "Melee Weapon Attack: +2 to hit, reach 10 ft., one creature. Hit: 4 (1d8) necrotic damage."
      }
    ],
    "group": "Plants",
    "source": "srd"
  }
];
if (typeof window !== "undefined") window.DND_MONSTERS = DND_MONSTERS;
