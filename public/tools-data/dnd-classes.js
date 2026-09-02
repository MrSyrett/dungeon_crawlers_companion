// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
const DND_CLASSES = [
  {
    "name": "Barbarian",
    "primaryAbility": [
      "STR"
    ],
    "hitDie": 12,
    "savingThrows": [
      "STR",
      "CON"
    ],
    "proficiencies": {
      "armor": [
        "Light armor",
        "Medium armor",
        "Shields"
      ],
      "weapons": [
        "Simple weapons",
        "Martial weapons"
      ],
      "tools": [],
      "skillsChoose": 2,
      "skillsFrom": [
        "Animal Handling",
        "Athletics",
        "Intimidation",
        "Nature",
        "Perception",
        "Survival"
      ]
    },
    "startingEquipment": [
      "Greataxe",
      "4 Handaxes",
      "Explorer's Pack",
      "15 GP",
      "or 75 GP"
    ],
    "spellcasting": "none",
    "subclassLevel": 3,
    "subclassLabel": "Barbarian Subclass",
    "flavor": "A fierce warrior who channels a primal Rage into savage, unstoppable violence — trading defense for raw power and shrugging off blows that would fell others.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Rage",
          "Unarmored Defense",
          "Weapon Mastery"
        ],
        "columns": {
          "Rages": "2",
          "Rage Damage": "+2",
          "Weapon Mastery": "2"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Danger Sense",
          "Reckless Attack"
        ],
        "columns": {
          "Rages": "2",
          "Rage Damage": "+2",
          "Weapon Mastery": "2"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Barbarian Subclass",
          "Primal Knowledge"
        ],
        "columns": {
          "Rages": "3",
          "Rage Damage": "+2",
          "Weapon Mastery": "2"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Rages": "3",
          "Rage Damage": "+2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Extra Attack",
          "Fast Movement"
        ],
        "columns": {
          "Rages": "3",
          "Rage Damage": "+2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Rages": "4",
          "Rage Damage": "+2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Feral Instinct",
          "Instinctive Pounce"
        ],
        "columns": {
          "Rages": "4",
          "Rage Damage": "+2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Rages": "4",
          "Rage Damage": "+2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Brutal Strike"
        ],
        "columns": {
          "Rages": "4",
          "Rage Damage": "+3",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Rages": "4",
          "Rage Damage": "+3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Relentless Rage"
        ],
        "columns": {
          "Rages": "4",
          "Rage Damage": "+3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Rages": "5",
          "Rage Damage": "+3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [
          "Improved Brutal Strike"
        ],
        "columns": {
          "Rages": "5",
          "Rage Damage": "+3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Rages": "5",
          "Rage Damage": "+3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Persistent Rage"
        ],
        "columns": {
          "Rages": "5",
          "Rage Damage": "+3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Rages": "5",
          "Rage Damage": "+4",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Improved Brutal Strike"
        ],
        "columns": {
          "Rages": "6",
          "Rage Damage": "+4",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Indomitable Might"
        ],
        "columns": {
          "Rages": "6",
          "Rage Damage": "+4",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Rages": "6",
          "Rage Damage": "+4",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Primal Champion"
        ],
        "columns": {
          "Rages": "Unlimited",
          "Rage Damage": "+4",
          "Weapon Mastery": "4"
        }
      }
    ],
    "features": [
      {
        "name": "Rage",
        "level": 1,
        "source": "srd",
        "description": "As a Bonus Action you enter a Rage for up to 10 minutes (a number of times per Long Rest shown on the table; regain 1 on a Short Rest). While raging and not wearing Heavy armor you have Advantage on Strength checks and saves, add the Rage Damage bonus to Strength-based melee weapon (and unarmed) hits, and have Resistance to Bludgeoning, Piercing, and Slashing damage. Rage ends early if you don Heavy armor, are Incapacitated, or don't attack/take damage/Bonus-Action-extend it each turn. You can't cast or concentrate on spells while raging."
      },
      {
        "name": "Unarmored Defense",
        "level": 1,
        "source": "srd",
        "description": "While not wearing armor, your base AC equals 10 + your Dexterity modifier + your Constitution modifier. A Shield still adds its bonus."
      },
      {
        "name": "Weapon Mastery",
        "level": 1,
        "source": "srd",
        "description": "You can use the Mastery property of a number of weapon kinds shown on the table (2 at level 1), provided you have proficiency with them. You can change your choices when you finish a Long Rest."
      },
      {
        "name": "Danger Sense",
        "level": 2,
        "source": "srd",
        "description": "You have Advantage on Dexterity saving throws against effects you can see, such as traps and spells (not while Incapacitated)."
      },
      {
        "name": "Reckless Attack",
        "level": 2,
        "source": "srd",
        "description": "When you make your first attack on your turn you can attack recklessly: gain Advantage on Strength-based attack rolls this turn, but attack rolls against you have Advantage until your next turn."
      },
      {
        "name": "Primal Knowledge",
        "level": 3,
        "source": "srd",
        "description": "You gain proficiency in one more skill from the Barbarian list. While raging you can channel that ferocity into your movement — you can use Strength (instead of the usual ability) for Acrobatics, Intimidation, Perception, Stealth, or Survival checks."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Extra Attack",
        "level": 5,
        "source": "srd",
        "description": "You can attack twice, instead of once, whenever you take the Attack action on your turn."
      },
      {
        "name": "Fast Movement",
        "level": 5,
        "source": "srd",
        "description": "Your Speed increases by 10 feet while you aren't wearing Heavy armor."
      },
      {
        "name": "Feral Instinct",
        "level": 7,
        "source": "srd",
        "description": "You have Advantage on Initiative rolls."
      },
      {
        "name": "Instinctive Pounce",
        "level": 7,
        "source": "srd",
        "description": "As part of the Bonus Action you take to enter your Rage, you can move up to half your Speed."
      },
      {
        "name": "Brutal Strike",
        "level": 9,
        "source": "srd",
        "description": "When you use Reckless Attack you can forgo its Advantage on one attack to instead deal an extra 1d10 damage on a hit and apply one Brutal Strike effect: Forceful Blow (push the target 15 feet and move with it) or Hamstring Blow (reduce the target's Speed by 15 feet)."
      },
      {
        "name": "Relentless Rage",
        "level": 11,
        "source": "srd",
        "description": "If you drop to 0 HP while raging and don't die outright, you can make a DC 10 Constitution save to drop to 1 HP instead. The DC increases by 5 each time you use it, resetting on a Short or Long Rest."
      },
      {
        "name": "Improved Brutal Strike",
        "level": 13,
        "source": "srd",
        "description": "You gain two more Brutal Strike effects to choose from — Staggering Blow (the target has Disadvantage on its next save and can't take Reactions) and Sundering Blow (the next attack against it gains a bonus). At 17th level you can apply two different Brutal Strike effects with a single Brutal Strike."
      },
      {
        "name": "Persistent Rage",
        "level": 15,
        "source": "srd",
        "description": "Your Rage is so fierce it ends early only if you fall Unconscious or choose to end it. Also, when you roll Initiative and have no Rages left, you regain one."
      },
      {
        "name": "Indomitable Might",
        "level": 18,
        "source": "srd",
        "description": "If your total for a Strength check or Strength saving throw is less than your Strength score, you can use that score in place of the total."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Irresistible Offense (Strength) is a fitting choice."
      },
      {
        "name": "Primal Champion",
        "level": 20,
        "source": "srd",
        "description": "Your Strength and Constitution scores increase by 4, to a maximum of 25."
      }
    ],
    "subclasses": [
      {
        "name": "Path of the Berserker",
        "className": "Barbarian",
        "flavor": "You channel Rage into an all-out fury, striking with reckless abandon and cowing your foes with sheer menace.",
        "source": "srd",
        "features": [
          {
            "name": "Frenzy",
            "level": 3,
            "subclass": "Path of the Berserker",
            "source": "srd",
            "description": "While raging, when you use Reckless Attack you deal extra damage on your Reckless Attack hits: on a hit, add a number of d6s equal to your Rage Damage bonus (once per turn)."
          },
          {
            "name": "Mindless Rage",
            "level": 6,
            "subclass": "Path of the Berserker",
            "source": "srd",
            "description": "You can't be Charmed or Frightened while raging. If you were Charmed or Frightened when you enter your Rage, that condition ends."
          },
          {
            "name": "Retaliation",
            "level": 10,
            "subclass": "Path of the Berserker",
            "source": "srd",
            "description": "When you take damage from a creature within 5 feet, you can take a Reaction to make one melee attack against it."
          },
          {
            "name": "Intimidating Presence",
            "level": 14,
            "subclass": "Path of the Berserker",
            "source": "srd",
            "description": "As a Bonus Action you can strike terror into creatures within 30 feet: each must succeed on a Wisdom save (DC 8 + your proficiency bonus + Strength modifier) or be Frightened of you for 1 minute (repeat the save at the end of each of its turns). Regain the use on a Short or Long Rest, or by spending a Rage."
          }
        ]
      },
      {
        "name": "Path of the Wild Heart",
        "className": "Barbarian",
        "flavor": "Your Rage draws on a spiritual bond with animals, letting you borrow their strengths and speak with the natural world.",
        "source": "phb",
        "features": [
          {
            "name": "Rage of the Wilds",
            "level": 3,
            "subclass": "Path of the Wild Heart",
            "source": "phb",
            "description": "You gain the Speak with Animals spell as an always-prepared ritual. When you Rage, choose an animal aspect for that Rage: Bear (Resistance to every damage type except Force, Necrotic, Psychic, and Radiant), Eagle (Dash as a Bonus Action and impose Disadvantage on an attacker's Opportunity Attacks), or Wolf (allies have Advantage to attack enemies within 5 feet of you)."
          },
          {
            "name": "Aspect of the Wilds",
            "level": 6,
            "subclass": "Path of the Wild Heart",
            "source": "phb",
            "description": "Choose a lasting animal aspect: Owl (Darkvision 60 ft.), Panther (Climb Speed), or Salmon (Swim Speed). You can change it after a Long Rest."
          },
          {
            "name": "Nature Speaker",
            "level": 10,
            "subclass": "Path of the Wild Heart",
            "source": "phb",
            "description": "You can cast Commune with Nature as a Ritual, communing with the spirits of the land."
          },
          {
            "name": "Power of the Wilds",
            "level": 14,
            "subclass": "Path of the Wild Heart",
            "source": "phb",
            "description": "When you Rage, choose an added benefit for its duration: Falcon (a Fly Speed while unarmored), Lion (creatures within 5 feet have Disadvantage attacking anyone but you), or Ram (knock a target Prone when you hit it)."
          }
        ]
      },
      {
        "name": "Path of the World Tree",
        "className": "Barbarian",
        "flavor": "Your Rage draws vitality from the cosmic World Tree, letting you shield allies, lash foes with astral branches, and travel between its boughs.",
        "source": "phb",
        "features": [
          {
            "name": "Vitality of the Tree",
            "level": 3,
            "subclass": "Path of the World Tree",
            "source": "phb",
            "description": "When you enter your Rage you gain Temporary HP equal to your Barbarian level. At the start of each of your later turns while raging you can grant Temporary HP (a number of d6s) to yourself or a nearby ally."
          },
          {
            "name": "Branches of the Tree",
            "level": 6,
            "subclass": "Path of the World Tree",
            "source": "phb",
            "description": "While raging, when a creature you can see within 30 feet hits you or an ally with an attack, you can use a Reaction to summon spectral branches: the creature is teleported to an empty space within 5 feet of you (its choice of space fails on a Strength save), and its Speed is 0 until the start of its next turn."
          },
          {
            "name": "Battering Roots",
            "level": 10,
            "subclass": "Path of the World Tree",
            "source": "phb",
            "description": "Your reach with Melee weapons that have the Heavy or Versatile property increases by 10 feet, and when you hit with such a weapon you can use the Push or Topple weapon mastery even if the weapon lacks it."
          },
          {
            "name": "Travel along the Tree",
            "level": 14,
            "subclass": "Path of the World Tree",
            "source": "phb",
            "description": "When you enter or extend your Rage you can teleport up to 60 feet to an unoccupied space you can see. Once per Rage you can teleport up to 150 feet instead and bring willing creatures with you."
          }
        ]
      },
      {
        "name": "Path of the Zealot",
        "className": "Barbarian",
        "flavor": "A divine warrior whose Rage is fueled by a god of battle — death itself struggles to keep you down.",
        "source": "phb",
        "features": [
          {
            "name": "Divine Fury",
            "level": 3,
            "subclass": "Path of the Zealot",
            "source": "phb",
            "description": "While raging, the first creature you hit each turn takes extra damage — 1d6 + half your Barbarian level — of Necrotic or Radiant damage (your choice). You also gain the Warrior of the Gods benefit: a bonus pool of d12 healing dice a friendly caster can use to restore your HP."
          },
          {
            "name": "Fanatical Focus",
            "level": 6,
            "subclass": "Path of the Zealot",
            "source": "phb",
            "description": "Once per Rage, if you fail a saving throw while raging, you can reroll it and must use the new result."
          },
          {
            "name": "Zealous Presence",
            "level": 10,
            "subclass": "Path of the Zealot",
            "source": "phb",
            "description": "As a Bonus Action you unleash a battle cry: up to 10 creatures of your choice within 60 feet gain Advantage on attack rolls and saving throws until the start of your next turn. Regain the use on a Long Rest, or by spending a Rage."
          },
          {
            "name": "Rage of the Gods",
            "level": 14,
            "subclass": "Path of the Zealot",
            "source": "phb",
            "description": "When you enter your Rage you can take on a divine avatar's form for 1 minute: gain a Fly Speed, Resistance to Necrotic/Psychic/Radiant, and the ability to return a dying ally to life. Once per Long Rest."
          }
        ]
      }
    ]
  },
  {
    "name": "Fighter",
    "primaryAbility": [
      "STR",
      "DEX"
    ],
    "hitDie": 10,
    "savingThrows": [
      "STR",
      "CON"
    ],
    "proficiencies": {
      "armor": [
        "Light armor",
        "Medium armor",
        "Heavy armor",
        "Shields"
      ],
      "weapons": [
        "Simple weapons",
        "Martial weapons"
      ],
      "tools": [],
      "skillsChoose": 2,
      "skillsFrom": [
        "Acrobatics",
        "Animal Handling",
        "Athletics",
        "History",
        "Insight",
        "Intimidation",
        "Persuasion",
        "Perception",
        "Survival"
      ]
    },
    "startingEquipment": [
      "Chain Mail, Greatsword, Flail, 8 Javelins, Dungeoneer's Pack, 4 GP",
      "or Studded Leather, Scimitar, Shortsword, Longbow, 20 Arrows, Quiver, Dungeoneer's Pack, 11 GP",
      "or 155 GP"
    ],
    "spellcasting": "none",
    "subclassLevel": 3,
    "subclassLabel": "Fighter Subclass",
    "flavor": "A master of weapons and armor whose training turns any fight to advantage — striking more often than anyone, surging into extra action, and shrugging off what should have stopped them.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Fighting Style",
          "Second Wind",
          "Weapon Mastery"
        ],
        "columns": {
          "Second Wind": "2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Action Surge",
          "Tactical Mind"
        ],
        "columns": {
          "Second Wind": "2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Fighter Subclass"
        ],
        "columns": {
          "Second Wind": "2",
          "Weapon Mastery": "3"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Second Wind": "3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Extra Attack",
          "Tactical Shift"
        ],
        "columns": {
          "Second Wind": "3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Second Wind": "3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Second Wind": "3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Second Wind": "3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Indomitable",
          "Tactical Master"
        ],
        "columns": {
          "Second Wind": "3",
          "Weapon Mastery": "4"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "5"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Two Extra Attacks"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "5"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "5"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [
          "Indomitable (two uses)",
          "Studied Attacks"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "5"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "5"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "5"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "6"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Action Surge (two uses)",
          "Indomitable (three uses)"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "6"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "6"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "6"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Three Extra Attacks"
        ],
        "columns": {
          "Second Wind": "4",
          "Weapon Mastery": "6"
        }
      }
    ],
    "features": [
      {
        "name": "Fighting Style",
        "level": 1,
        "source": "srd",
        "description": "You gain a Fighting Style feat of your choice (such as Archery, Defense, Great Weapon Fighting, or Two-Weapon Fighting)."
      },
      {
        "name": "Second Wind",
        "level": 1,
        "source": "srd",
        "description": "As a Bonus Action you regain 1d10 + your Fighter level HP. You have a number of uses shown on the table and regain one on a Short Rest and all on a Long Rest."
      },
      {
        "name": "Weapon Mastery",
        "level": 1,
        "source": "srd",
        "description": "You can use the Mastery property of a number of weapon kinds shown on the table (3 at level 1), provided you're proficient. You can change your choices after a Long Rest."
      },
      {
        "name": "Action Surge",
        "level": 2,
        "source": "srd",
        "description": "On your turn you can take one additional action (any except casting a spell). Once per Short or Long Rest (twice at level 17)."
      },
      {
        "name": "Tactical Mind",
        "level": 2,
        "source": "srd",
        "description": "When you fail an ability check, you can spend a use of Second Wind (without regaining HP) to add 1d10 to the check, potentially turning the failure into a success."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 6th, 8th, 12th, 14th, and 16th level."
      },
      {
        "name": "Extra Attack",
        "level": 5,
        "source": "srd",
        "description": "You can attack twice whenever you take the Attack action (three times at level 11, four times at level 20)."
      },
      {
        "name": "Tactical Shift",
        "level": 5,
        "source": "srd",
        "description": "When you activate Second Wind you can move up to half your Speed without provoking Opportunity Attacks."
      },
      {
        "name": "Indomitable",
        "level": 9,
        "source": "srd",
        "description": "You can reroll a saving throw you fail and must use the new roll. You gain a use back on a Long Rest (two uses at 13th, three at 17th level)."
      },
      {
        "name": "Tactical Master",
        "level": 9,
        "source": "srd",
        "description": "When you attack with a weapon whose Mastery you can use, you can replace that property with the Push, Sap, or Slow mastery for that attack."
      },
      {
        "name": "Studied Attacks",
        "level": 13,
        "source": "srd",
        "description": "If you miss a creature with an attack, you have Advantage on your next attack roll against it before the end of your next turn."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Combat Prowess is a fitting choice."
      }
    ],
    "subclasses": [
      {
        "name": "Champion",
        "className": "Fighter",
        "flavor": "A paragon of physical excellence who lands more critical hits, excels at athletic feats, and refuses to fall.",
        "source": "srd",
        "features": [
          {
            "name": "Improved Critical",
            "level": 3,
            "subclass": "Champion",
            "source": "srd",
            "description": "Your weapon attacks score a Critical Hit on a roll of 19 or 20."
          },
          {
            "name": "Remarkable Athlete",
            "level": 3,
            "subclass": "Champion",
            "source": "srd",
            "description": "You have Advantage on Initiative and on Strength (Athletics) checks. Once per turn, immediately after a Critical Hit, you can move up to half your Speed without provoking Opportunity Attacks."
          },
          {
            "name": "Additional Fighting Style",
            "level": 7,
            "subclass": "Champion",
            "source": "srd",
            "description": "You gain a second Fighting Style feat of your choice."
          },
          {
            "name": "Heroic Warrior",
            "level": 10,
            "subclass": "Champion",
            "source": "srd",
            "description": "During combat you can give yourself Heroic Advantage — Advantage on one attack roll, ability check, or saving throw — at the start of each of your turns if you have none already."
          },
          {
            "name": "Superior Critical",
            "level": 15,
            "subclass": "Champion",
            "source": "srd",
            "description": "Your weapon attacks now score a Critical Hit on a roll of 18–20."
          },
          {
            "name": "Survivor",
            "level": 18,
            "subclass": "Champion",
            "source": "srd",
            "description": "You have Advantage on Death Saving Throws, and at the start of each of your turns in combat you regain HP (5 + your Constitution modifier) if you're below half your HP maximum and have at least 1 HP."
          }
        ]
      },
      {
        "name": "Battle Master",
        "className": "Fighter",
        "flavor": "A student of martial technique who spends Superiority Dice on precise maneuvers — disarming, goading, and outmaneuvering foes.",
        "source": "phb",
        "features": [
          {
            "name": "Combat Superiority",
            "level": 3,
            "subclass": "Battle Master",
            "source": "phb",
            "description": "You learn maneuvers fueled by Superiority Dice (four d8s, regained on a Short or Long Rest). Maneuvers such as Trip Attack, Disarming Attack, Riposte, and Precision Attack let you add a die to a roll and create an effect. The save DC is 8 + your proficiency bonus + your Strength or Dexterity modifier. You learn more maneuvers and gain more dice as you level."
          },
          {
            "name": "Student of War",
            "level": 3,
            "subclass": "Battle Master",
            "source": "phb",
            "description": "You gain proficiency with one type of Artisan's Tools and in one skill from the Fighter list."
          },
          {
            "name": "Know Your Enemy",
            "level": 7,
            "subclass": "Battle Master",
            "source": "phb",
            "description": "As a Bonus Action you can spend one Superiority Die to study a creature you can see and learn whether it has more or fewer HP than you, plus one other characteristic of your choice."
          },
          {
            "name": "Improved Combat Superiority",
            "level": 10,
            "subclass": "Battle Master",
            "source": "phb",
            "description": "Your Superiority Dice become d10s."
          },
          {
            "name": "Relentless",
            "level": 15,
            "subclass": "Battle Master",
            "source": "phb",
            "description": "When you roll Initiative and have no Superiority Dice, you regain one."
          },
          {
            "name": "Ultimate Combat Superiority",
            "level": 18,
            "subclass": "Battle Master",
            "source": "phb",
            "description": "Your Superiority Dice become d12s."
          }
        ]
      },
      {
        "name": "Eldritch Knight",
        "className": "Fighter",
        "flavor": "A warrior who weaves Wizard magic into swordplay — warding themselves, binding a weapon, and striking with spell and steel at once.",
        "source": "phb",
        "features": [
          {
            "name": "Spellcasting",
            "level": 3,
            "subclass": "Eldritch Knight",
            "source": "phb",
            "description": "You learn cantrips and a small number of spells from the Wizard list (mostly Abjuration and Evocation), casting with Intelligence. You prepare a growing list and cast using your Fighter level as a one-third caster."
          },
          {
            "name": "War Bond",
            "level": 3,
            "subclass": "Eldritch Knight",
            "source": "phb",
            "description": "You can bond with weapons: bonded weapons can't be disarmed while conscious, and you can summon one you can see to your hand as a Bonus Action."
          },
          {
            "name": "War Magic",
            "level": 7,
            "subclass": "Eldritch Knight",
            "source": "phb",
            "description": "When you take the Attack action you can replace one attack with casting a cantrip."
          },
          {
            "name": "Eldritch Strike",
            "level": 10,
            "subclass": "Eldritch Knight",
            "source": "phb",
            "description": "When you hit a creature with a weapon, it has Disadvantage on the next saving throw against a spell you cast before the end of your next turn."
          },
          {
            "name": "Arcane Charge",
            "level": 15,
            "subclass": "Eldritch Knight",
            "source": "phb",
            "description": "When you use Action Surge you can teleport up to 30 feet to an unoccupied space you can see, before or after the extra action."
          },
          {
            "name": "Improved War Magic",
            "level": 18,
            "subclass": "Eldritch Knight",
            "source": "phb",
            "description": "When you take the Attack action you can replace one attack with casting a level 1 or 2 spell."
          }
        ]
      },
      {
        "name": "Psi Warrior",
        "className": "Fighter",
        "flavor": "A soldier awakened to psionic power, wielding telekinetic force to shield allies, hurl enemies, and strike from afar.",
        "source": "phb",
        "features": [
          {
            "name": "Psionic Power",
            "level": 3,
            "subclass": "Psi Warrior",
            "source": "phb",
            "description": "You have a pool of Psionic Energy Dice (starting as d6s) that fuel: Protective Field (Reaction to reduce damage to a nearby creature), Psionic Strike (once per turn add Force damage to a hit), and Telekinetic Movement (move an object or creature with your mind). You regain a die on a Short Rest and all on a Long Rest; the dice grow larger as you level."
          },
          {
            "name": "Telekinetic Adept",
            "level": 7,
            "subclass": "Psi Warrior",
            "source": "phb",
            "description": "You gain Psi-Powered Leap (a Bonus Action Fly Speed for one move) and Telekinetic Thrust (Psionic Strike can knock the target Prone or push it 10 feet)."
          },
          {
            "name": "Guarded Mind",
            "level": 10,
            "subclass": "Psi Warrior",
            "source": "phb",
            "description": "You have Resistance to Psychic damage, and you can spend a Psionic Energy Die to end the Charmed or Frightened condition on yourself."
          },
          {
            "name": "Bulwark of Force",
            "level": 15,
            "subclass": "Psi Warrior",
            "source": "phb",
            "description": "As a Bonus Action you can grant yourself and nearby allies Half Cover for 1 minute via telekinetic shields. Once per Long Rest, or by spending a Psionic Energy Die."
          },
          {
            "name": "Telekinetic Master",
            "level": 18,
            "subclass": "Psi Warrior",
            "source": "phb",
            "description": "You can cast Telekinesis without a spell slot (Intelligence is your spellcasting ability), and while concentrating on it you can still make one weapon attack as a Bonus Action."
          }
        ]
      }
    ]
  },
  {
    "name": "Rogue",
    "primaryAbility": [
      "DEX"
    ],
    "hitDie": 8,
    "savingThrows": [
      "DEX",
      "INT"
    ],
    "proficiencies": {
      "armor": [
        "Light armor"
      ],
      "weapons": [
        "Simple weapons",
        "Martial weapons with Finesse or Light"
      ],
      "tools": [
        "Thieves' Tools"
      ],
      "skillsChoose": 4,
      "skillsFrom": [
        "Acrobatics",
        "Athletics",
        "Deception",
        "Insight",
        "Intimidation",
        "Investigation",
        "Perception",
        "Persuasion",
        "Sleight of Hand",
        "Stealth"
      ]
    },
    "startingEquipment": [
      "Leather Armor, 2 Daggers, Shortsword, Shortbow, 20 Arrows, Quiver, Thieves' Tools, Burglar's Pack, 8 GP",
      "or 100 GP"
    ],
    "spellcasting": "none",
    "subclassLevel": 3,
    "subclassLabel": "Rogue Subclass",
    "flavor": "A precise, deadly specialist who strikes where it hurts, dances out of danger, and turns skills into an art — the party's scout, striker, and problem-solver.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Expertise",
          "Sneak Attack",
          "Thieves' Cant",
          "Weapon Mastery"
        ],
        "columns": {
          "Sneak Attack": "1d6"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Cunning Action"
        ],
        "columns": {
          "Sneak Attack": "1d6"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Rogue Subclass",
          "Steady Aim"
        ],
        "columns": {
          "Sneak Attack": "2d6"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Sneak Attack": "2d6"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Cunning Strike",
          "Uncanny Dodge"
        ],
        "columns": {
          "Sneak Attack": "3d6"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Expertise"
        ],
        "columns": {
          "Sneak Attack": "3d6"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Evasion",
          "Reliable Talent"
        ],
        "columns": {
          "Sneak Attack": "4d6"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Sneak Attack": "4d6"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Sneak Attack": "5d6"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Sneak Attack": "5d6"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Improved Cunning Strike"
        ],
        "columns": {
          "Sneak Attack": "6d6"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Sneak Attack": "6d6"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Sneak Attack": "7d6"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Devious Strikes"
        ],
        "columns": {
          "Sneak Attack": "7d6"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Slippery Mind"
        ],
        "columns": {
          "Sneak Attack": "8d6"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Sneak Attack": "8d6"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Sneak Attack": "9d6"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Elusive"
        ],
        "columns": {
          "Sneak Attack": "9d6"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Sneak Attack": "10d6"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Stroke of Luck"
        ],
        "columns": {
          "Sneak Attack": "10d6"
        }
      }
    ],
    "features": [
      {
        "name": "Expertise",
        "level": 1,
        "source": "srd",
        "description": "Choose two of your skill proficiencies; your proficiency bonus is doubled for any ability check you make with them. You choose two more at level 6."
      },
      {
        "name": "Sneak Attack",
        "level": 1,
        "source": "srd",
        "description": "Once per turn you can deal extra damage (shown on the table, starting at 1d6) to one creature you hit with a Finesse or Ranged weapon, if you have Advantage on the attack — or if an ally is within 5 feet of the target and you don't have Disadvantage. The extra damage matches the weapon's type."
      },
      {
        "name": "Thieves' Cant",
        "level": 1,
        "source": "srd",
        "description": "You know Thieves' Cant, a secret mix of dialect, jargon, and hand signs, plus a set of covert marks and messages."
      },
      {
        "name": "Weapon Mastery",
        "level": 1,
        "source": "srd",
        "description": "You can use the Mastery property of two kinds of weapon you're proficient with. You can change your choices after a Long Rest."
      },
      {
        "name": "Cunning Action",
        "level": 2,
        "source": "srd",
        "description": "On your turn you can take a Bonus Action to Dash, Disengage, or Hide."
      },
      {
        "name": "Steady Aim",
        "level": 3,
        "source": "srd",
        "description": "As a Bonus Action you give yourself Advantage on your next attack this turn, provided you haven't moved. Your Speed is 0 until the end of the turn."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 10th, 12th, and 16th level."
      },
      {
        "name": "Cunning Strike",
        "level": 5,
        "source": "srd",
        "description": "When you deal Sneak Attack damage you can forgo some of its dice to add an effect: Poison (Poisoned condition), Trip (knock Prone), or Withdraw (move without provoking). Each effect costs a set number of Sneak Attack dice."
      },
      {
        "name": "Uncanny Dodge",
        "level": 5,
        "source": "srd",
        "description": "When an attacker you can see hits you, you can use a Reaction to halve the attack's damage against you."
      },
      {
        "name": "Evasion",
        "level": 7,
        "source": "srd",
        "description": "When you make a Dexterity save to take half damage, you instead take no damage on a success and only half on a failure. You can't use it while Incapacitated."
      },
      {
        "name": "Reliable Talent",
        "level": 7,
        "source": "srd",
        "description": "Whenever you make an ability check with a skill or tool you're proficient in, treat a d20 roll of 9 or lower as a 10."
      },
      {
        "name": "Improved Cunning Strike",
        "level": 11,
        "source": "srd",
        "description": "You can apply two different Cunning Strike effects with a single Sneak Attack (paying the die cost of each)."
      },
      {
        "name": "Devious Strikes",
        "level": 14,
        "source": "srd",
        "description": "You gain three more Cunning Strike options: Daze, Knock Out, and Obscure."
      },
      {
        "name": "Slippery Mind",
        "level": 15,
        "source": "srd",
        "description": "You gain proficiency in Wisdom and Charisma saving throws."
      },
      {
        "name": "Elusive",
        "level": 18,
        "source": "srd",
        "description": "No attack roll can have Advantage against you while you aren't Incapacitated."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Dimensional Travel is a fitting choice."
      },
      {
        "name": "Stroke of Luck",
        "level": 20,
        "source": "srd",
        "description": "Once per Short or Long Rest, you can turn a missed attack into a hit, or a failed ability check into a success — treat the d20 as a 20."
      }
    ],
    "subclasses": [
      {
        "name": "Thief",
        "className": "Rogue",
        "flavor": "A nimble burglar and treasure-hunter, quick of hand and quick to exploit any magic item you can lay hands on.",
        "source": "srd",
        "features": [
          {
            "name": "Fast Hands",
            "level": 3,
            "subclass": "Thief",
            "source": "srd",
            "description": "You can use your Cunning Action Bonus Action to make a Sleight of Hand check, use Thieves' Tools to disarm a trap or open a lock, or take the Utilize action."
          },
          {
            "name": "Second-Story Work",
            "level": 3,
            "subclass": "Thief",
            "source": "srd",
            "description": "You gain a Climb Speed equal to your Speed, and your running jump distance is measured using your Dexterity instead of your Strength."
          },
          {
            "name": "Supreme Sneak",
            "level": 9,
            "subclass": "Thief",
            "source": "srd",
            "description": "You have Advantage on Dexterity (Stealth) checks if you move no more than half your Speed on the same turn, and you can make a Stealth check as part of your Cunning Action Hide."
          },
          {
            "name": "Use Magic Device",
            "level": 13,
            "subclass": "Thief",
            "source": "srd",
            "description": "You can attune to up to four magic items at once, can use any magic item's activated properties even if you don't meet its requirements, and can wring extra charges from a wand or staff (risking a mishap)."
          },
          {
            "name": "Thief's Reflexes",
            "level": 17,
            "subclass": "Thief",
            "source": "srd",
            "description": "You can take two turns during the first round of any combat — one at your Initiative and one at your Initiative minus 10."
          }
        ]
      },
      {
        "name": "Assassin",
        "className": "Rogue",
        "flavor": "A cold, methodical killer who strikes first and hardest, wears any face, and coats blades in death.",
        "source": "phb",
        "features": [
          {
            "name": "Assassinate",
            "level": 3,
            "subclass": "Assassin",
            "source": "phb",
            "description": "You have Advantage on attacks against any creature that hasn't taken a turn yet in combat, and you always have Initiative Advantage. On your first turn, your Sneak Attack deals extra damage (dice equal to your Rogue level) to any creature you Surprise or that hasn't acted."
          },
          {
            "name": "Assassin's Tools",
            "level": 3,
            "subclass": "Assassin",
            "source": "phb",
            "description": "You gain a Disguise Kit, a Poisoner's Kit, and proficiency with both."
          },
          {
            "name": "Infiltration Expertise",
            "level": 9,
            "subclass": "Assassin",
            "source": "phb",
            "description": "As a Study action you can create or maintain a false identity, and you can flawlessly mimic the speech, writing, and behavior of another person you've studied."
          },
          {
            "name": "Envenom Weapons",
            "level": 13,
            "subclass": "Assassin",
            "source": "phb",
            "description": "When you use the Poison option of Cunning Strike, the target takes extra Poison damage (your Rogue level) and its Poisoned condition is harder to shake."
          },
          {
            "name": "Death Strike",
            "level": 17,
            "subclass": "Assassin",
            "source": "phb",
            "description": "When you hit a Surprised creature with an attack, it must make a Constitution save (DC 8 + Dexterity modifier + proficiency bonus) or take double damage from the attack."
          }
        ]
      },
      {
        "name": "Arcane Trickster",
        "className": "Rogue",
        "flavor": "A spell-thief who laces stealth and larceny with enchantment and illusion — a phantom hand, a nudge to the mind, a stolen spell.",
        "source": "phb",
        "features": [
          {
            "name": "Spellcasting",
            "level": 3,
            "subclass": "Arcane Trickster",
            "source": "phb",
            "description": "You learn cantrips and spells from the Wizard list (mostly Enchantment and Illusion), casting with Intelligence as a one-third caster."
          },
          {
            "name": "Mage Hand Legerdemain",
            "level": 3,
            "subclass": "Arcane Trickster",
            "source": "phb",
            "description": "You know Mage Hand and can cast it invisibly, and use it to perform Sleight of Hand, pick locks, and disarm traps at a distance."
          },
          {
            "name": "Magical Ambush",
            "level": 9,
            "subclass": "Arcane Trickster",
            "source": "phb",
            "description": "If you're Hidden from a creature when you cast a spell on it, it has Disadvantage on any saving throw against that spell."
          },
          {
            "name": "Versatile Trickster",
            "level": 13,
            "subclass": "Arcane Trickster",
            "source": "phb",
            "description": "You can use Mage Hand as a Bonus Action to distract a creature within 5 feet of the hand, giving you Advantage on attack rolls against it until the end of the turn."
          },
          {
            "name": "Spell Thief",
            "level": 17,
            "subclass": "Arcane Trickster",
            "source": "phb",
            "description": "When a creature casts a spell that targets you, you can use a Reaction to force a save; on a failure you negate the spell and steal knowledge of it for 8 hours. Once per Long Rest."
          }
        ]
      },
      {
        "name": "Soulknife",
        "className": "Rogue",
        "flavor": "A psionic assassin who manifests blades of pure mind-force, striking from range and slipping through the world unseen.",
        "source": "phb",
        "features": [
          {
            "name": "Psionic Power",
            "level": 3,
            "subclass": "Soulknife",
            "source": "phb",
            "description": "You have a pool of Psionic Energy Dice (starting as d6s). You can manifest Psychic Blades — thrown or melee attacks of psychic force that carry your Sneak Attack — and add a Psionic Energy Die to certain ability checks. The dice grow larger as you level and refresh on rests."
          },
          {
            "name": "Soul Blades",
            "level": 9,
            "subclass": "Soulknife",
            "source": "phb",
            "description": "You gain Homing Strikes (spend a die to turn a missed Psychic Blade attack into a hit) and Psychic Teleportation (throw a blade to teleport up to 10 feet times the die rolled)."
          },
          {
            "name": "Psychic Veil",
            "level": 13,
            "subclass": "Soulknife",
            "source": "phb",
            "description": "As a Magic action you can turn Invisible for 1 hour or until you attack or force a save. Once per Long Rest, or by spending a Psionic Energy Die."
          },
          {
            "name": "Rend Mind",
            "level": 17,
            "subclass": "Soulknife",
            "source": "phb",
            "description": "When you deal Sneak Attack damage with your Psychic Blades, you can force the target to make a Wisdom save or be Stunned for 1 minute (repeating the save each turn). Once per Long Rest, or by spending three Psionic Energy Dice."
          }
        ]
      }
    ]
  },
  {
    "name": "Wizard",
    "primaryAbility": [
      "INT"
    ],
    "hitDie": 6,
    "savingThrows": [
      "INT",
      "WIS"
    ],
    "proficiencies": {
      "armor": [],
      "weapons": [
        "Simple weapons"
      ],
      "tools": [],
      "skillsChoose": 2,
      "skillsFrom": [
        "Arcana",
        "History",
        "Insight",
        "Investigation",
        "Medicine",
        "Nature",
        "Religion"
      ]
    },
    "startingEquipment": [
      "2 Daggers, Arcane Focus (Quarterstaff), Robe, Spellbook, Scholar's Pack, 5 GP",
      "or 55 GP"
    ],
    "spellcasting": "full",
    "spellcastingAbility": "INT",
    "subclassLevel": 3,
    "subclassLabel": "Wizard Subclass",
    "flavor": "A scholar of the arcane whose spellbook is an arsenal — preparing exactly the right spells for the day and bending raw magic to precise, devastating effect.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Spellcasting",
          "Ritual Adept",
          "Arcane Recovery"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "4"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Scholar"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "5"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Wizard Subclass"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "6"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Memorize Spell"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "9"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "11"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "12"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "15"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "19"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "21"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "22"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Spell Mastery"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "23"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "24"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Signature Spells"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Cantrips": "5",
          "Prepared Spells": "26"
        }
      }
    ],
    "features": [
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Wizard spells using Intelligence, drawing them from a Spellbook. Each day after a Long Rest you prepare a number of spells from the book (shown on the table) plus cantrips. Your spell save DC is 8 + Intelligence modifier + proficiency bonus, and your attack bonus is Intelligence modifier + proficiency bonus. You can copy new spells you find into your book for a cost of time and gold."
      },
      {
        "name": "Ritual Adept",
        "level": 1,
        "source": "srd",
        "description": "You can cast any spell in your Spellbook that has the Ritual tag as a Ritual, even if it isn't prepared."
      },
      {
        "name": "Arcane Recovery",
        "level": 1,
        "source": "srd",
        "description": "Once per day on a Short Rest, you can recover expended spell slots with a combined level up to half your Wizard level (rounded up), none of them level 6 or higher."
      },
      {
        "name": "Scholar",
        "level": 2,
        "source": "srd",
        "description": "You gain Expertise (double proficiency) in one skill of your choice from Arcana, History, Investigation, Medicine, Nature, or Religion (you must already be proficient)."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Memorize Spell",
        "level": 5,
        "source": "srd",
        "description": "Whenever you finish a Short Rest, you can swap one prepared spell for another from your Spellbook."
      },
      {
        "name": "Spell Mastery",
        "level": 18,
        "source": "srd",
        "description": "Choose one level 1 and one level 2 spell in your Spellbook; you can cast them at their lowest level without expending a spell slot. You can swap the choices after a Long Rest."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Spell Recall is a fitting choice."
      },
      {
        "name": "Signature Spells",
        "level": 20,
        "source": "srd",
        "description": "Choose two level 3 spells in your Spellbook as Signature Spells; they're always prepared and you can cast each once at level 3 without a slot, regaining the ability on a Short or Long Rest."
      }
    ],
    "subclasses": [
      {
        "name": "Evoker",
        "className": "Wizard",
        "flavor": "A master of raw elemental force who shapes blasts around allies and squeezes every point of damage from a spell.",
        "source": "srd",
        "features": [
          {
            "name": "Evocation Savant",
            "level": 3,
            "subclass": "Evoker",
            "source": "srd",
            "description": "Evocation spells cost less time and gold to copy into your book, and you always have two Evocation spells prepared without counting against your prepared limit."
          },
          {
            "name": "Potent Cantrip",
            "level": 3,
            "subclass": "Evoker",
            "source": "srd",
            "description": "When a creature succeeds on a save against your cantrip, it still takes half the cantrip's damage (and suffers no other effect)."
          },
          {
            "name": "Sculpt Spells",
            "level": 6,
            "subclass": "Evoker",
            "source": "srd",
            "description": "When you cast an Evocation spell that affects other creatures you can see, you can protect a number of them (1 + the spell's level): they automatically succeed on their save and take no damage from the spell."
          },
          {
            "name": "Empowered Evocation",
            "level": 10,
            "subclass": "Evoker",
            "source": "srd",
            "description": "You add your Intelligence modifier to one damage roll of any Wizard Evocation spell you cast."
          },
          {
            "name": "Overchannel",
            "level": 14,
            "subclass": "Evoker",
            "source": "srd",
            "description": "When you cast a Wizard spell of level 1–5 that deals damage, you can deal maximum damage with it. The first use each Long Rest is free; each further use before a Long Rest deals escalating Necrotic damage to you."
          }
        ]
      },
      {
        "name": "Abjurer",
        "className": "Wizard",
        "flavor": "A warding specialist who wraps themselves in a self-renewing shield of magic and unravels hostile spells.",
        "source": "phb",
        "features": [
          {
            "name": "Abjuration Savant",
            "level": 3,
            "subclass": "Abjurer",
            "source": "phb",
            "description": "Abjuration spells cost less to copy into your book, and you gain an Arcane Ward: when you cast an Abjuration spell, a pool of Temporary-HP-like ward force absorbs damage to you (its size scales with the spell level and your Wizard level, recharging as you cast more abjurations)."
          },
          {
            "name": "Projected Ward",
            "level": 6,
            "subclass": "Abjurer",
            "source": "phb",
            "description": "When a creature you can see within 30 feet takes damage, you can use your Reaction to have your Arcane Ward absorb that damage instead."
          },
          {
            "name": "Spell Breaker",
            "level": 10,
            "subclass": "Abjurer",
            "source": "phb",
            "description": "You always have Counterspell and Dispel Magic prepared, and when you cast either using a higher-level slot its effectiveness improves."
          },
          {
            "name": "Spell Resistance",
            "level": 14,
            "subclass": "Abjurer",
            "source": "phb",
            "description": "You have Advantage on saving throws against spells, and Resistance to the damage of spells."
          }
        ]
      },
      {
        "name": "Diviner",
        "className": "Wizard",
        "flavor": "A seer who glimpses the strands of fate and rewrites a roll of the dice before it lands.",
        "source": "phb",
        "features": [
          {
            "name": "Divination Savant",
            "level": 3,
            "subclass": "Diviner",
            "source": "phb",
            "description": "Divination spells cost less to copy, and you gain Portent: after a Long Rest, roll two d20s and record them. You can replace any attack roll, saving throw, or ability check (yours or a creature's you can see) with one of these foretold rolls."
          },
          {
            "name": "Expert Divination",
            "level": 6,
            "subclass": "Diviner",
            "source": "phb",
            "description": "When you cast a Divination spell of level 2 or higher, you regain an expended spell slot of a lower level."
          },
          {
            "name": "The Third Eye",
            "level": 10,
            "subclass": "Diviner",
            "source": "phb",
            "description": "As a Bonus Action you gain one benefit until your next rest: Darkvision, an increased understanding of a language, See Invisibility, or greater awareness of your surroundings."
          },
          {
            "name": "Greater Portent",
            "level": 14,
            "subclass": "Diviner",
            "source": "phb",
            "description": "You roll three d20s for your Portent feature instead of two."
          }
        ]
      },
      {
        "name": "Illusionist",
        "className": "Wizard",
        "flavor": "A weaver of deception whose illusions grow so convincing they gain a sliver of reality.",
        "source": "phb",
        "features": [
          {
            "name": "Illusion Savant",
            "level": 3,
            "subclass": "Illusionist",
            "source": "phb",
            "description": "Illusion spells cost less to copy, and your Minor Illusion improves: you can create both a sound and an image at once, and shape the illusion as a Bonus Action."
          },
          {
            "name": "Phantasmal Creatures",
            "level": 6,
            "subclass": "Illusionist",
            "source": "phb",
            "description": "You always have Summon Beast and Summon Fey prepared, and can cast either once without a slot per Long Rest, conjuring an illusory creature."
          },
          {
            "name": "Illusory Self",
            "level": 10,
            "subclass": "Illusionist",
            "source": "phb",
            "description": "When a creature hits you with an attack, you can use a Reaction to interpose an illusory duplicate, causing the attack to miss. Recharge on a rest, or by expending a spell slot."
          },
          {
            "name": "Illusory Reality",
            "level": 14,
            "subclass": "Illusionist",
            "source": "phb",
            "description": "When you cast an Illusion spell of level 1+, you can make one inanimate, nonmagical part of the illusion real for 1 minute — a bridge you can cross, a wall that blocks, and so on."
          }
        ]
      }
    ]
  }
];
if (typeof window !== "undefined") window.DND_CLASSES = DND_CLASSES;
