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
  },
  {
    "name": "Bard",
    "primaryAbility": [
      "CHA"
    ],
    "hitDie": 8,
    "savingThrows": [
      "DEX",
      "CHA"
    ],
    "proficiencies": {
      "armor": [
        "Light armor"
      ],
      "weapons": [
        "Simple weapons"
      ],
      "tools": [
        "3 Musical Instruments"
      ],
      "skillsChoose": 3,
      "skillsFrom": [
        "Any"
      ]
    },
    "startingEquipment": [
      "Leather Armor, 2 Daggers, Musical Instrument, Entertainer's Pack, 19 GP",
      "or 90 GP"
    ],
    "spellcasting": "full",
    "spellcastingAbility": "CHA",
    "subclassLevel": 3,
    "subclassLabel": "Bard Subclass",
    "flavor": "A spellcasting performer whose magic uplifts allies and unravels foes — the party's face, utility caster, and jack of all trades.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Bardic Inspiration",
          "Spellcasting"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Bardic Die": "d6",
          "Cantrips": "2",
          "Prepared Spells": "4"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Expertise",
          "Jack of All Trades"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Bardic Die": "d6",
          "Cantrips": "2",
          "Prepared Spells": "5"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Bard Subclass"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Bardic Die": "d6",
          "Cantrips": "2",
          "Prepared Spells": "6"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Bardic Die": "d6",
          "Cantrips": "3",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Font of Inspiration"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Bardic Die": "d8",
          "Cantrips": "3",
          "Prepared Spells": "9"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Bardic Die": "d8",
          "Cantrips": "3",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Countercharm"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Bardic Die": "d8",
          "Cantrips": "3",
          "Prepared Spells": "11"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Bardic Die": "d8",
          "Cantrips": "3",
          "Prepared Spells": "12"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Expertise"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Bardic Die": "d8",
          "Cantrips": "3",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Magical Secrets"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d10",
          "Cantrips": "4",
          "Prepared Spells": "15"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d10",
          "Cantrips": "4",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d10",
          "Cantrips": "4",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d10",
          "Cantrips": "4",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d10",
          "Cantrips": "4",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d12",
          "Cantrips": "4",
          "Prepared Spells": "19"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d12",
          "Cantrips": "4",
          "Prepared Spells": "19"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d12",
          "Cantrips": "4",
          "Prepared Spells": "20"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Superior Inspiration"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d12",
          "Cantrips": "4",
          "Prepared Spells": "20"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d12",
          "Cantrips": "4",
          "Prepared Spells": "21"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Words of Creation"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Bardic Die": "d12",
          "Cantrips": "4",
          "Prepared Spells": "22"
        }
      }
    ],
    "features": [
      {
        "name": "Bardic Inspiration",
        "level": 1,
        "source": "srd",
        "description": "As a Bonus Action you give another creature within 60 feet a Bardic Inspiration die (starting at d6, growing to d12). Within 10 minutes it can add the die to one attack roll, ability check, or saving throw. You have a number of uses equal to your Charisma modifier (min 1), regained on a Long Rest (and, from level 5, a Short Rest)."
      },
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Bard spells using Charisma, preparing a growing list (shown on the table) plus cantrips. Save DC is 8 + Charisma modifier + proficiency bonus; attack bonus is Charisma modifier + proficiency bonus. You can use a Musical Instrument as a spellcasting focus."
      },
      {
        "name": "Expertise",
        "level": 2,
        "source": "srd",
        "description": "Choose two skill proficiencies to gain Expertise (double proficiency). Choose two more at level 9."
      },
      {
        "name": "Jack of All Trades",
        "level": 2,
        "source": "srd",
        "description": "You can add half your proficiency bonus (rounded down) to any ability check you make that doesn't already include it."
      },
      {
        "name": "Font of Inspiration",
        "level": 5,
        "source": "srd",
        "description": "You regain all uses of Bardic Inspiration on a Short or Long Rest, and you can expend a spell slot (no action) to regain one use."
      },
      {
        "name": "Countercharm",
        "level": 7,
        "source": "srd",
        "description": "As a Magic action you can start a performance that lasts until the end of your next turn: you and allies within 30 feet have Advantage on saving throws to avoid or end the Frightened and Charmed conditions."
      },
      {
        "name": "Magical Secrets",
        "level": 10,
        "source": "srd",
        "description": "Whenever you prepare Bard spells, you can also choose from the Cleric, Druid, and Wizard spell lists — the divine, primal, and arcane traditions are open to you."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Superior Inspiration",
        "level": 18,
        "source": "srd",
        "description": "When you roll Initiative, you regain expended uses of Bardic Inspiration until you have two."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Spell Recall is a fitting choice."
      },
      {
        "name": "Words of Creation",
        "level": 20,
        "source": "srd",
        "description": "You always have Power Word Heal and Power Word Kill prepared, and when you cast either you can target a second creature within 10 feet of the first."
      }
    ],
    "subclasses": [
      {
        "name": "College of Lore",
        "className": "Bard",
        "flavor": "A collector of secrets and skills who can deflate a foe's success with a well-placed word.",
        "source": "srd",
        "features": [
          {
            "name": "Bonus Proficiencies",
            "level": 3,
            "subclass": "College of Lore",
            "source": "srd",
            "description": "You gain proficiency with three skills of your choice."
          },
          {
            "name": "Cutting Words",
            "level": 3,
            "subclass": "College of Lore",
            "source": "srd",
            "description": "When a creature within 60 feet you can see makes a damage roll or succeeds on an attack roll or ability check, you can use a Reaction to expend a Bardic Inspiration die and subtract it from the roll, potentially turning a hit into a miss."
          },
          {
            "name": "Magical Discoveries",
            "level": 6,
            "subclass": "College of Lore",
            "source": "srd",
            "description": "You learn two spells of your choice from the Cleric, Druid, or Wizard lists; they count as Bard spells and are always prepared."
          },
          {
            "name": "Peerless Skill",
            "level": 14,
            "subclass": "College of Lore",
            "source": "srd",
            "description": "When you fail an ability check or attack roll, you can expend a Bardic Inspiration die and add it to the roll, possibly turning failure into success."
          }
        ]
      },
      {
        "name": "College of Dance",
        "className": "Bard",
        "flavor": "A bard whose art is motion — a whirling dancer who fights unarmed and flows untouched through the fray.",
        "source": "phb",
        "features": [
          {
            "name": "Dazzling Footwork",
            "level": 3,
            "subclass": "College of Dance",
            "source": "phb",
            "description": "While unarmored and not using a Shield, your AC equals 10 + Dexterity modifier + Charisma modifier, and you gain an Unarmed Strike that uses a Bardic Inspiration die for damage plus Agile Strikes (a free Unarmed Strike when you spend Bardic Inspiration)."
          },
          {
            "name": "Inspiring Movement",
            "level": 6,
            "subclass": "College of Dance",
            "source": "phb",
            "description": "When an enemy ends its turn within 5 feet of you, you can use a Reaction to move and let an ally within 60 feet move, expending a Bardic Inspiration die that they add to their next roll."
          },
          {
            "name": "Leading Evasion",
            "level": 14,
            "subclass": "College of Dance",
            "source": "phb",
            "description": "When you make a Dexterity save for half damage, you take none on a success and half on a failure, and you can extend this protection to allies within 5 feet."
          }
        ]
      },
      {
        "name": "College of Glamour",
        "className": "Bard",
        "flavor": "A bard touched by the Feywild whose beauty commands and beguiles, rallying allies and awing enemies into submission.",
        "source": "phb",
        "features": [
          {
            "name": "Beguiling Magic",
            "level": 3,
            "subclass": "College of Glamour",
            "source": "phb",
            "description": "You always have Charm Person and Mirror Image prepared. When you cast an Enchantment or Illusion spell of level 1+, you can force a creature you can see to make a Wisdom save or be Charmed or Frightened until the end of your next turn. Also gain Mantle of Inspiration: spend Bardic Inspiration to grant nearby allies Temporary HP and a free Reaction move."
          },
          {
            "name": "Mantle of Majesty",
            "level": 6,
            "subclass": "College of Glamour",
            "source": "phb",
            "description": "As a Bonus Action you can cast Command without a slot and radiate majesty for 1 minute, casting Command each round as a Bonus Action; creatures have Disadvantage to resist. Once per Long Rest without a slot."
          },
          {
            "name": "Unbreakable Majesty",
            "level": 14,
            "subclass": "College of Glamour",
            "source": "phb",
            "description": "As a Bonus Action you assume an awe-inspiring presence for 1 minute; the first time a creature attacks you each turn it must make a Charisma save or lose the attack, and it has Disadvantage on saves against your spells."
          }
        ]
      },
      {
        "name": "College of Valor",
        "className": "Bard",
        "flavor": "A skald and warrior-poet who fights on the front line and lends martial vigor to comrades.",
        "source": "phb",
        "features": [
          {
            "name": "Combat Inspiration",
            "level": 3,
            "subclass": "College of Valor",
            "source": "phb",
            "description": "A creature holding one of your Bardic Inspiration dice can add it to a weapon's damage roll, or use it as a Reaction to boost AC against one attack. You also gain proficiency with Martial weapons, Medium armor, and Shields."
          },
          {
            "name": "Extra Attack",
            "level": 6,
            "subclass": "College of Valor",
            "source": "phb",
            "description": "You can attack twice whenever you take the Attack action. You can replace one of these attacks with a cantrip that has a casting time of an action."
          },
          {
            "name": "Battle Magic",
            "level": 14,
            "subclass": "College of Valor",
            "source": "phb",
            "description": "When you take the Magic action to cast a Bard spell, you can make one weapon attack as a Bonus Action."
          }
        ]
      }
    ]
  },
  {
    "name": "Cleric",
    "primaryAbility": [
      "WIS"
    ],
    "hitDie": 8,
    "savingThrows": [
      "WIS",
      "CHA"
    ],
    "proficiencies": {
      "armor": [
        "Light armor",
        "Medium armor",
        "Shields"
      ],
      "weapons": [
        "Simple weapons"
      ],
      "tools": [],
      "skillsChoose": 2,
      "skillsFrom": [
        "History",
        "Insight",
        "Medicine",
        "Persuasion",
        "Religion"
      ]
    },
    "startingEquipment": [
      "Chain Shirt, Shield, Mace, Holy Symbol, Priest's Pack, 7 GP",
      "or 110 GP"
    ],
    "spellcasting": "full",
    "spellcastingAbility": "WIS",
    "subclassLevel": 3,
    "subclassLabel": "Cleric Subclass",
    "flavor": "A divine agent who channels a god's power to heal, smite, and turn the undead — a versatile caster and stalwart support.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Spellcasting",
          "Divine Order"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Channel Divinity": "—",
          "Cantrips": "3",
          "Prepared Spells": "4"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Channel Divinity"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Channel Divinity": "2",
          "Cantrips": "3",
          "Prepared Spells": "5"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Cleric Subclass"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Channel Divinity": "2",
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
          "Channel Divinity": "2",
          "Cantrips": "4",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Sear Undead"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Channel Divinity": "2",
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
          "Channel Divinity": "3",
          "Cantrips": "4",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Blessed Strikes"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Channel Divinity": "3",
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
          "Channel Divinity": "3",
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
          "Channel Divinity": "3",
          "Cantrips": "4",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Divine Intervention"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Channel Divinity": "3",
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
          "Channel Divinity": "3",
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
          "Channel Divinity": "3",
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
          "Channel Divinity": "3",
          "Cantrips": "5",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Improved Blessed Strikes"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Channel Divinity": "3",
          "Cantrips": "5",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Channel Divinity": "3",
          "Cantrips": "5",
          "Prepared Spells": "18"
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
          "Channel Divinity": "3",
          "Cantrips": "5",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Channel Divinity": "3",
          "Cantrips": "5",
          "Prepared Spells": "19"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Channel Divinity": "4",
          "Cantrips": "5",
          "Prepared Spells": "20"
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
          "Channel Divinity": "4",
          "Cantrips": "5",
          "Prepared Spells": "21"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Greater Divine Intervention"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Channel Divinity": "4",
          "Cantrips": "5",
          "Prepared Spells": "22"
        }
      }
    ],
    "features": [
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Cleric spells using Wisdom, preparing a growing list (shown on the table) plus cantrips from the full Cleric list each day. Save DC is 8 + Wisdom modifier + proficiency bonus; attack bonus is Wisdom modifier + proficiency bonus. You use a Holy Symbol as your focus."
      },
      {
        "name": "Divine Order",
        "level": 1,
        "source": "srd",
        "description": "Choose your calling: Protector (proficiency with Martial weapons and Heavy armor) or Thaumaturge (an extra Cleric cantrip, and you add your Wisdom modifier to Arcana and Religion checks)."
      },
      {
        "name": "Channel Divinity",
        "level": 2,
        "source": "srd",
        "description": "You can channel divine energy a number of times per rest (shown on the table; regain one on a Short Rest, all on a Long Rest). Options: Divine Spark — a Magic action to heal a creature or deal Radiant/Necrotic damage (a save for half), scaling with level; and Turn Undead — force nearby Undead to make a Wisdom save or be Frightened and forced to flee."
      },
      {
        "name": "Sear Undead",
        "level": 5,
        "source": "srd",
        "description": "When you use Turn Undead, you also deal Radiant damage (a number of d8s equal to your Wisdom modifier) to each Undead that fails its save."
      },
      {
        "name": "Blessed Strikes",
        "level": 7,
        "source": "srd",
        "description": "Choose one: Divine Strike (once per turn, add 1d8 Radiant or Necrotic damage to a weapon hit) or Potent Spellcasting (add your Wisdom modifier to the damage of your Cleric cantrips)."
      },
      {
        "name": "Divine Intervention",
        "level": 10,
        "source": "srd",
        "description": "As a Magic action you can cast any Cleric spell of level 5 or lower without expending a slot or providing Material components. Once per Long Rest."
      },
      {
        "name": "Improved Blessed Strikes",
        "level": 14,
        "source": "srd",
        "description": "Your Blessed Strikes choice improves — the extra damage increases and, for Potent Spellcasting, once per turn you can also grant Temporary HP."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Fate is a fitting choice."
      },
      {
        "name": "Greater Divine Intervention",
        "level": 20,
        "source": "srd",
        "description": "Your Divine Intervention can now produce the effect of any Cleric spell, and once per Long Rest you can use it without expending its normal use."
      }
    ],
    "subclasses": [
      {
        "name": "Life Domain",
        "className": "Cleric",
        "flavor": "A healer channeling the positive energy of life itself, mending wounds better than any other.",
        "source": "srd",
        "features": [
          {
            "name": "Disciple of Life",
            "level": 3,
            "subclass": "Life Domain",
            "source": "srd",
            "description": "Whenever a level 1+ spell restores HP to a creature, it regains extra HP equal to 2 + the spell's level. You also gain Life Domain spells always prepared (Bless, Cure Wounds, and more as you level)."
          },
          {
            "name": "Preserve Life",
            "level": 3,
            "subclass": "Life Domain",
            "source": "srd",
            "description": "A Channel Divinity option: as a Magic action you restore HP equal to five times your Cleric level, divided among creatures within 30 feet, up to half each one's HP maximum."
          },
          {
            "name": "Blessed Healer",
            "level": 6,
            "subclass": "Life Domain",
            "source": "srd",
            "description": "When you cast a level 1+ spell that restores HP to another creature, you also regain HP equal to 2 + the spell's level."
          },
          {
            "name": "Supreme Healing",
            "level": 17,
            "subclass": "Life Domain",
            "source": "srd",
            "description": "When you would roll dice to restore HP with a spell, you instead use the highest possible number for each die."
          }
        ]
      },
      {
        "name": "Light Domain",
        "className": "Cleric",
        "flavor": "A cleric of a sun or fire god who scorches foes with radiance and blinds the wicked.",
        "source": "phb",
        "features": [
          {
            "name": "Radiance of the Dawn",
            "level": 3,
            "subclass": "Light Domain",
            "source": "phb",
            "description": "You gain the Light cantrip and Light Domain spells (Burning Hands, Faerie Fire, and more). Warding Flare: as a Reaction you can impose Disadvantage on an attack against you or a nearby creature. Radiance of the Dawn (Channel Divinity): dispel magical darkness and deal Radiant damage to enemies within 30 feet (a Constitution save for half)."
          },
          {
            "name": "Improved Warding Flare",
            "level": 6,
            "subclass": "Light Domain",
            "source": "phb",
            "description": "You regain all uses of Warding Flare on a Short Rest, and when you use it you also grant the protected creature Temporary HP."
          },
          {
            "name": "Corona of Light",
            "level": 17,
            "subclass": "Light Domain",
            "source": "phb",
            "description": "As a Magic action you emit an aura of sunlight for 1 minute; enemies in it have Disadvantage on saves against spells that deal Fire or Radiant damage."
          }
        ]
      },
      {
        "name": "Trickery Domain",
        "className": "Cleric",
        "flavor": "A cleric of mischief and misdirection who conjures duplicates and blesses allies with stealthy cunning.",
        "source": "phb",
        "features": [
          {
            "name": "Invoke Duplicity",
            "level": 3,
            "subclass": "Trickery Domain",
            "source": "phb",
            "description": "You gain Trickery Domain spells (Charm Person, Disguise Self, and more) and Blessing of the Trickster (grant a creature Advantage on Stealth). Invoke Duplicity (Channel Divinity): create an illusory duplicate of yourself for 1 minute that you can move and cast spells through, and that gives you Advantage on attacks against creatures near it."
          },
          {
            "name": "Trickster's Transposition",
            "level": 6,
            "subclass": "Trickery Domain",
            "source": "phb",
            "description": "When you or your Invoke Duplicity illusion would be targeted, you can swap places with the duplicate as a Bonus Action."
          },
          {
            "name": "Improved Duplicity",
            "level": 17,
            "subclass": "Trickery Domain",
            "source": "phb",
            "description": "Your Invoke Duplicity is stronger — allies near the illusion gain benefits, and when it ends you can heal creatures near it."
          }
        ]
      },
      {
        "name": "War Domain",
        "className": "Cleric",
        "flavor": "A martial priest who leads the charge, guiding weapons with divine will and fighting like a seasoned soldier.",
        "source": "phb",
        "features": [
          {
            "name": "Guided Strike",
            "level": 3,
            "subclass": "War Domain",
            "source": "phb",
            "description": "You gain proficiency with Martial weapons and Heavy armor and War Domain spells (Divine Favor, Shield of Faith, and more). War Priest: make an extra weapon attack as a Bonus Action a number of times per rest. Guided Strike (Channel Divinity): add +10 to one attack roll after seeing it."
          },
          {
            "name": "War God's Blessing",
            "level": 6,
            "subclass": "War Domain",
            "source": "phb",
            "description": "You can expend a use of Channel Divinity to cast Shield of Faith or Spiritual Weapon without a spell slot."
          },
          {
            "name": "Avatar of Battle",
            "level": 17,
            "subclass": "War Domain",
            "source": "phb",
            "description": "You have Resistance to Bludgeoning, Piercing, and Slashing damage."
          }
        ]
      }
    ]
  },
  {
    "name": "Druid",
    "primaryAbility": [
      "WIS"
    ],
    "hitDie": 8,
    "savingThrows": [
      "INT",
      "WIS"
    ],
    "proficiencies": {
      "armor": [
        "Light armor",
        "Shields"
      ],
      "weapons": [
        "Simple weapons"
      ],
      "tools": [
        "Herbalism Kit"
      ],
      "skillsChoose": 2,
      "skillsFrom": [
        "Animal Handling",
        "Arcana",
        "Insight",
        "Medicine",
        "Nature",
        "Perception",
        "Religion",
        "Survival"
      ]
    },
    "startingEquipment": [
      "Leather Armor, Shield, Sickle, Quarterstaff (Druidic Focus), Explorer's Pack, Herbalism Kit, 9 GP",
      "or 50 GP"
    ],
    "spellcasting": "full",
    "spellcastingAbility": "WIS",
    "subclassLevel": 3,
    "subclassLabel": "Druid Subclass",
    "flavor": "A keeper of the primal world who prepares nature's magic and takes the shape of beasts — a shapeshifting caster and wilderness guide.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Spellcasting",
          "Druidic",
          "Primal Order"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Wild Shape": "—",
          "Cantrips": "2",
          "Prepared Spells": "4"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Wild Shape",
          "Wild Companion"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Wild Shape": "2",
          "Cantrips": "2",
          "Prepared Spells": "5"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Druid Subclass"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Wild Shape": "2",
          "Cantrips": "2",
          "Prepared Spells": "6"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Wild Shape": "2",
          "Cantrips": "3",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Wild Resurgence"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Wild Shape": "2",
          "Cantrips": "3",
          "Prepared Spells": "9"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "3",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Elemental Fury"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "3",
          "Prepared Spells": "11"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "3",
          "Prepared Spells": "12"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 3,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "3",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "15"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Improved Elemental Fury"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "3",
          "Cantrips": "4",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "4",
          "Cantrips": "4",
          "Prepared Spells": "19"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Beast Spells"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "4",
          "Cantrips": "4",
          "Prepared Spells": "20"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "4",
          "Cantrips": "4",
          "Prepared Spells": "21"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Archdruid"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Wild Shape": "4",
          "Cantrips": "4",
          "Prepared Spells": "22"
        }
      }
    ],
    "features": [
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Druid spells using Wisdom, preparing a growing list (shown on the table) plus cantrips from the full Druid list each day. Save DC is 8 + Wisdom modifier + proficiency bonus. You use a Druidic Focus (or the like) as your focus."
      },
      {
        "name": "Druidic",
        "level": 1,
        "source": "srd",
        "description": "You know Druidic, the secret language of druids, and can leave hidden messages that only those who know it (or use magic) can perceive. You also always have the Speak with Animals spell prepared."
      },
      {
        "name": "Primal Order",
        "level": 1,
        "source": "srd",
        "description": "Choose your path: Magician (an extra Druid cantrip, and you add your Wisdom modifier to Arcana and Nature checks) or Warden (proficiency with Martial weapons and Medium armor)."
      },
      {
        "name": "Wild Shape",
        "level": 2,
        "source": "srd",
        "description": "As a Bonus Action you can transform into a Beast you've learned, for a number of hours; you gain the form's physical stats and abilities and Temporary HP, keeping your mind and some traits. You have a number of uses per rest (shown on the table)."
      },
      {
        "name": "Wild Companion",
        "level": 2,
        "source": "srd",
        "description": "You can expend a use of Wild Shape to cast Find Familiar without a slot, summoning a nature spirit in animal form."
      },
      {
        "name": "Wild Resurgence",
        "level": 5,
        "source": "srd",
        "description": "Once per turn, if you have no Wild Shape uses left, you can expend a spell slot to regain one. You can also convert a Wild Shape use into a level 1 spell slot once per Long Rest."
      },
      {
        "name": "Elemental Fury",
        "level": 7,
        "source": "srd",
        "description": "Choose one: Potent Spellcasting (add your Wisdom modifier to the damage of your Druid cantrips) or Primal Strike (once per turn while in Wild Shape, deal extra elemental damage — a d8 of Cold, Fire, Lightning, or Thunder — on a hit)."
      },
      {
        "name": "Improved Elemental Fury",
        "level": 15,
        "source": "srd",
        "description": "Your Elemental Fury choice improves: the cantrip range increases, or the Primal Strike damage die grows to a d10."
      },
      {
        "name": "Beast Spells",
        "level": 18,
        "source": "srd",
        "description": "You can cast spells in Wild Shape form, using your natural abilities in place of the usual Somatic and Verbal components (Material components still needed)."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Dimensional Travel is a fitting choice."
      },
      {
        "name": "Archdruid",
        "level": 20,
        "source": "srd",
        "description": "You can use Wild Shape an unlimited number of times, you can ignore the Verbal and Somatic components of your Druid spells, and you can convert unexpended Wild Shape uses to regain spell slots. You also age far more slowly."
      }
    ],
    "subclasses": [
      {
        "name": "Circle of the Land",
        "className": "Druid",
        "flavor": "A druid bound to a particular land — desert, mountains, forest, or coast — drawing extra spells and protection from it.",
        "source": "srd",
        "features": [
          {
            "name": "Land's Aid",
            "level": 3,
            "subclass": "Circle of the Land",
            "source": "srd",
            "description": "You gain a set of always-prepared Circle Spells tied to a chosen land type (Arid, Polar, Temperate, or Tropical). As a Magic action you can expend a Wild Shape use to sap life in a 10-foot area: enemies take Necrotic damage (a Constitution save for half) and one creature is healed."
          },
          {
            "name": "Natural Recovery",
            "level": 6,
            "subclass": "Circle of the Land",
            "source": "srd",
            "description": "Once per day on a Short Rest you can recover expended spell slots with a combined level up to half your Druid level, and you can cast one of your Circle Spells without a slot once per Long Rest."
          },
          {
            "name": "Nature's Ward",
            "level": 10,
            "subclass": "Circle of the Land",
            "source": "srd",
            "description": "You're immune to the Poisoned condition, and you have Resistance to a damage type determined by your land choice."
          },
          {
            "name": "Nature's Sanctuary",
            "level": 14,
            "subclass": "Circle of the Land",
            "source": "srd",
            "description": "As a Magic action you conjure protective spirits in a 15-foot Cube for 1 minute; you and your allies in it gain Half Cover and Resistance to your land's damage type, and you can move the effect on later turns."
          }
        ]
      },
      {
        "name": "Circle of the Moon",
        "className": "Druid",
        "flavor": "A fierce shapeshifter who wades into battle as a dire beast, mending wounds mid-transformation.",
        "source": "phb",
        "features": [
          {
            "name": "Circle Forms",
            "level": 3,
            "subclass": "Circle of the Moon",
            "source": "phb",
            "description": "Your Wild Shape forms are combat-ready: you can take on more powerful Beasts, gain extra Temporary HP based on your Druid level, and your natural attacks count as magical. You also learn to expend a spell slot as a Bonus Action to heal in beast form."
          },
          {
            "name": "Moonlight Step",
            "level": 6,
            "subclass": "Circle of the Moon",
            "source": "phb",
            "description": "As a Bonus Action you can teleport up to 30 feet and gain Advantage on your next attack. You have a number of uses per Long Rest (regained by spending a spell slot)."
          },
          {
            "name": "Improved Circle Forms",
            "level": 10,
            "subclass": "Circle of the Moon",
            "source": "phb",
            "description": "While in Wild Shape you add your Wisdom modifier to your Constitution saves, and you can spend a Wild Shape use to add Radiant damage to your natural attacks."
          },
          {
            "name": "Lunar Form",
            "level": 14,
            "subclass": "Circle of the Moon",
            "source": "phb",
            "description": "Your beast forms gain extra Radiant damage once per turn, and when you use Moonlight Step you can bring an ally along."
          }
        ]
      },
      {
        "name": "Circle of the Sea",
        "className": "Druid",
        "flavor": "A druid of tides and storms who wraps themselves in a lashing sea and rides the wind.",
        "source": "phb",
        "features": [
          {
            "name": "Wrath of the Sea",
            "level": 3,
            "subclass": "Circle of the Sea",
            "source": "phb",
            "description": "You gain Sea-tied Circle Spells. As a Bonus Action you can expend a Wild Shape use to surround yourself with a spectral sea aura for 10 minutes; when you hit a creature in it with a spell you can push it and deal Cold damage."
          },
          {
            "name": "Aquatic Affinity",
            "level": 6,
            "subclass": "Circle of the Sea",
            "source": "phb",
            "description": "The radius of your Wrath of the Sea aura grows, you gain a Swim Speed, and you can breathe underwater."
          },
          {
            "name": "Stormborn",
            "level": 10,
            "subclass": "Circle of the Sea",
            "source": "phb",
            "description": "While your aura is active you gain a Fly Speed and Resistance to Cold, Lightning, and Thunder damage."
          },
          {
            "name": "Oceanic Gift",
            "level": 14,
            "subclass": "Circle of the Sea",
            "source": "phb",
            "description": "You can share your Wrath of the Sea aura with an ally, and its damage increases."
          }
        ]
      },
      {
        "name": "Circle of the Stars",
        "className": "Druid",
        "flavor": "A stargazer who charts the constellations and takes on their radiant, guiding forms.",
        "source": "phb",
        "features": [
          {
            "name": "Starry Form",
            "level": 3,
            "subclass": "Circle of the Stars",
            "source": "phb",
            "description": "You record a Star Map that acts as a Druidic Focus and grants extra Guidance/Guiding Bolt casts. As a Bonus Action you can expend a Wild Shape use to take a glowing Starry Form for 10 minutes — Archer (a radiant ranged attack), Chalice (healing when you cast healing spells), or Dragon (steady Concentration and better checks)."
          },
          {
            "name": "Cosmic Omen",
            "level": 6,
            "subclass": "Circle of the Stars",
            "source": "phb",
            "description": "After a Long Rest, roll a die to determine a Weal or Woe omen; you can use a Reaction to add or subtract a d6 on rolls made by creatures near you."
          },
          {
            "name": "Twinkling Constellations",
            "level": 10,
            "subclass": "Circle of the Stars",
            "source": "phb",
            "description": "Your Starry Form improves — the Archer and Chalice dice grow to d10s, the Dragon grants a Fly Speed, and you can change your form each turn."
          },
          {
            "name": "Full of Stars",
            "level": 14,
            "subclass": "Circle of the Stars",
            "source": "phb",
            "description": "While in Starry Form you become partly incorporeal, gaining Resistance to Bludgeoning, Piercing, and Slashing damage."
          }
        ]
      }
    ]
  },
  {
    "name": "Monk",
    "primaryAbility": [
      "DEX",
      "WIS"
    ],
    "hitDie": 8,
    "savingThrows": [
      "STR",
      "DEX"
    ],
    "proficiencies": {
      "armor": [],
      "weapons": [
        "Simple weapons",
        "Martial weapons with the Light property"
      ],
      "tools": [
        "One Artisan's Tools or Musical Instrument"
      ],
      "skillsChoose": 2,
      "skillsFrom": [
        "Acrobatics",
        "Athletics",
        "History",
        "Insight",
        "Religion",
        "Stealth"
      ]
    },
    "startingEquipment": [
      "Spear, 5 Daggers, Artisan's Tools or Musical Instrument, Explorer's Pack, 11 GP",
      "or 50 GP"
    ],
    "spellcasting": "none",
    "subclassLevel": 3,
    "subclassLabel": "Monk Subclass",
    "flavor": "A martial artist who channels inner Focus into flurries of blows, superhuman movement, and mystical techniques — fast, evasive, and deadly unarmed.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Martial Arts",
          "Unarmored Defense"
        ],
        "columns": {
          "Martial Arts": "1d6",
          "Focus": "—",
          "Unarmored Move": "—"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Monk's Focus",
          "Unarmored Movement",
          "Uncanny Metabolism"
        ],
        "columns": {
          "Martial Arts": "1d6",
          "Focus": "2",
          "Unarmored Move": "+10"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Deflect Attacks",
          "Monk Subclass"
        ],
        "columns": {
          "Martial Arts": "1d6",
          "Focus": "3",
          "Unarmored Move": "+10"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement",
          "Slow Fall"
        ],
        "columns": {
          "Martial Arts": "1d6",
          "Focus": "4",
          "Unarmored Move": "+10"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Extra Attack",
          "Stunning Strike"
        ],
        "columns": {
          "Martial Arts": "1d8",
          "Focus": "5",
          "Unarmored Move": "+10"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Empowered Strikes",
          "Subclass Feature"
        ],
        "columns": {
          "Martial Arts": "1d8",
          "Focus": "6",
          "Unarmored Move": "+15"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Evasion"
        ],
        "columns": {
          "Martial Arts": "1d8",
          "Focus": "7",
          "Unarmored Move": "+15"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Martial Arts": "1d8",
          "Focus": "8",
          "Unarmored Move": "+15"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Acrobatic Movement"
        ],
        "columns": {
          "Martial Arts": "1d8",
          "Focus": "9",
          "Unarmored Move": "+15"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Heightened Focus",
          "Self-Restoration"
        ],
        "columns": {
          "Martial Arts": "1d8",
          "Focus": "10",
          "Unarmored Move": "+20"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Martial Arts": "1d10",
          "Focus": "11",
          "Unarmored Move": "+20"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Martial Arts": "1d10",
          "Focus": "12",
          "Unarmored Move": "+20"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [
          "Deflect Energy"
        ],
        "columns": {
          "Martial Arts": "1d10",
          "Focus": "13",
          "Unarmored Move": "+20"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Disciplined Survivor"
        ],
        "columns": {
          "Martial Arts": "1d10",
          "Focus": "14",
          "Unarmored Move": "+25"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Perfect Focus"
        ],
        "columns": {
          "Martial Arts": "1d10",
          "Focus": "15",
          "Unarmored Move": "+25"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Martial Arts": "1d10",
          "Focus": "16",
          "Unarmored Move": "+25"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Martial Arts": "1d12",
          "Focus": "17",
          "Unarmored Move": "+25"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Superior Defense"
        ],
        "columns": {
          "Martial Arts": "1d12",
          "Focus": "18",
          "Unarmored Move": "+30"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Martial Arts": "1d12",
          "Focus": "19",
          "Unarmored Move": "+30"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Body and Mind"
        ],
        "columns": {
          "Martial Arts": "1d12",
          "Focus": "20",
          "Unarmored Move": "+30"
        }
      }
    ],
    "features": [
      {
        "name": "Martial Arts",
        "level": 1,
        "source": "srd",
        "description": "Your Unarmed Strikes and Monk weapons (Simple Melee and Light Martial weapons) can use Dexterity for attack and damage, deal damage equal to your Martial Arts die, and let you make one Unarmed Strike as a Bonus Action after you Attack. The die grows from 1d6 to 1d12."
      },
      {
        "name": "Unarmored Defense",
        "level": 1,
        "source": "srd",
        "description": "While wearing no armor and not using a Shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier."
      },
      {
        "name": "Monk's Focus",
        "level": 2,
        "source": "srd",
        "description": "You gain Focus Points (equal to your Monk level) that fuel: Flurry of Blows (spend 1 for two Unarmed Strikes as a Bonus Action), Patient Defense (Disengage, or Disengage + Dodge for 1 point), and Step of the Wind (Dash, or Dash + Disengage for 1 point). Regain all on a Short or Long Rest."
      },
      {
        "name": "Unarmored Movement",
        "level": 2,
        "source": "srd",
        "description": "Your Speed increases while you wear no armor and use no Shield (the bonus grows to +30 feet)."
      },
      {
        "name": "Uncanny Metabolism",
        "level": 2,
        "source": "srd",
        "description": "Once per Long Rest, when you roll Initiative you can regain all expended Focus Points and heal (roll your Martial Arts die + Monk level)."
      },
      {
        "name": "Deflect Attacks",
        "level": 3,
        "source": "srd",
        "description": "When an attack deals Bludgeoning, Piercing, or Slashing damage to you, you can use a Reaction to reduce it (roll 1d10 + Dexterity modifier + Monk level). If you reduce it to 0 you can spend a Focus Point to redirect it as a thrown strike at another creature."
      },
      {
        "name": "Slow Fall",
        "level": 4,
        "source": "srd",
        "description": "You can use a Reaction when you fall to reduce the falling damage by five times your Monk level."
      },
      {
        "name": "Extra Attack",
        "level": 5,
        "source": "srd",
        "description": "You can attack twice whenever you take the Attack action on your turn."
      },
      {
        "name": "Stunning Strike",
        "level": 5,
        "source": "srd",
        "description": "Once per turn when you hit a creature with a Monk weapon or Unarmed Strike, you can spend 1 Focus Point to force a Constitution save; on a failure the target is Stunned until the start of your next turn (on a success, its Speed is halved and attacks against it have Advantage)."
      },
      {
        "name": "Empowered Strikes",
        "level": 6,
        "source": "srd",
        "description": "Your Unarmed Strikes can deal Force damage instead of their normal type, letting them bypass most resistances."
      },
      {
        "name": "Evasion",
        "level": 7,
        "source": "srd",
        "description": "When you make a Dexterity save for half damage, you take none on a success and only half on a failure (not while Incapacitated)."
      },
      {
        "name": "Acrobatic Movement",
        "level": 9,
        "source": "srd",
        "description": "While you have no armor or Shield, you can move along vertical surfaces and across liquids on your turn without falling during the move."
      },
      {
        "name": "Heightened Focus",
        "level": 10,
        "source": "srd",
        "description": "Your Focus abilities improve: Flurry of Blows makes three strikes, Patient Defense grants Temporary HP, and Step of the Wind lets an ally move too."
      },
      {
        "name": "Self-Restoration",
        "level": 10,
        "source": "srd",
        "description": "You can end the Charmed, Frightened, or Poisoned condition on yourself (no action) at the end of your turn, and you no longer need food or water."
      },
      {
        "name": "Deflect Energy",
        "level": 13,
        "source": "srd",
        "description": "Your Deflect Attacks can now reduce damage of any type, not just Bludgeoning/Piercing/Slashing."
      },
      {
        "name": "Disciplined Survivor",
        "level": 14,
        "source": "srd",
        "description": "You gain proficiency in all saving throws, and you can spend 1 Focus Point to reroll a save you fail."
      },
      {
        "name": "Perfect Focus",
        "level": 15,
        "source": "srd",
        "description": "When you roll Initiative with fewer than 4 Focus Points, you regain enough to have 4."
      },
      {
        "name": "Superior Defense",
        "level": 18,
        "source": "srd",
        "description": "As a Bonus Action you can spend 3 Focus Points to give yourself Resistance to all damage except Force for 1 minute."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Irresistible Offense is a fitting choice."
      },
      {
        "name": "Body and Mind",
        "level": 20,
        "source": "srd",
        "description": "Your Dexterity and Wisdom scores increase by 4, to a maximum of 25."
      }
    ],
    "subclasses": [
      {
        "name": "Warrior of the Open Hand",
        "className": "Monk",
        "flavor": "A master of unarmed combat who manipulates a foe's balance and mends their own body through discipline.",
        "source": "srd",
        "features": [
          {
            "name": "Open Hand Technique",
            "level": 3,
            "subclass": "Warrior of the Open Hand",
            "source": "srd",
            "description": "Whenever you hit with a Flurry of Blows strike, you can impose one effect on the target: Addle (it can't take Opportunity Attacks until its next turn), Push (a Strength save or be pushed 15 feet), or Topple (a Dexterity save or fall Prone)."
          },
          {
            "name": "Wholeness of Body",
            "level": 6,
            "subclass": "Warrior of the Open Hand",
            "source": "srd",
            "description": "As a Bonus Action you heal yourself (roll your Martial Arts die + Wisdom modifier). Uses equal to your Wisdom modifier per Long Rest."
          },
          {
            "name": "Fleet Step",
            "level": 11,
            "subclass": "Warrior of the Open Hand",
            "source": "srd",
            "description": "When you take a Bonus Action other than Step of the Wind, you can also use Step of the Wind after it, for free."
          },
          {
            "name": "Quivering Palm",
            "level": 17,
            "subclass": "Warrior of the Open Hand",
            "source": "srd",
            "description": "When you hit a creature with an Unarmed Strike you can spend 4 Focus Points to plant lethal vibrations in it for a number of days equal to your Monk level. While the vibrations last you can, as a Magic action, end them to force a Constitution save; on a failure the target drops to 0 HP, and on a success takes heavy Force damage."
          }
        ]
      },
      {
        "name": "Warrior of Mercy",
        "className": "Monk",
        "flavor": "A physician-monk who channels Focus to knit wounds or stop hearts with the same touch.",
        "source": "phb",
        "features": [
          {
            "name": "Hand of Harm and Healing",
            "level": 3,
            "subclass": "Warrior of Mercy",
            "source": "phb",
            "description": "You gain Implements of Mercy (Insight and Medicine proficiency, a Herbalism Kit). When you hit with an Unarmed Strike you can spend a Focus Point for Hand of Harm (extra Necrotic damage) or, as a Bonus Action touch, Hand of Healing (restore HP with your Martial Arts die + Wisdom modifier)."
          },
          {
            "name": "Physician's Touch",
            "level": 6,
            "subclass": "Warrior of Mercy",
            "source": "phb",
            "description": "Hand of Harm can also inflict the Poisoned condition, and Hand of Healing can also end a condition on the creature you heal."
          },
          {
            "name": "Flurry of Healing and Harm",
            "level": 11,
            "subclass": "Warrior of Mercy",
            "source": "phb",
            "description": "When you use Flurry of Blows you can replace each strike with a Hand of Healing (no Focus cost), and each Flurry strike that hits can carry Hand of Harm."
          },
          {
            "name": "Hand of Ultimate Mercy",
            "level": 17,
            "subclass": "Warrior of Mercy",
            "source": "phb",
            "description": "As a Magic action you can spend 5 Focus Points to touch a creature that died within the last minute and return it to life with HP and freed of conditions. Once per Long Rest."
          }
        ]
      },
      {
        "name": "Warrior of Shadow",
        "className": "Monk",
        "flavor": "A ninja-like monk who wields darkness itself — cloaking, teleporting, and striking from the black.",
        "source": "phb",
        "features": [
          {
            "name": "Shadow Arts",
            "level": 3,
            "subclass": "Warrior of Shadow",
            "source": "phb",
            "description": "You gain the Minor Illusion cantrip and Darkvision, and you can spend a Focus Point to cast Darkness, seeing through the darkness you create and moving it on later turns."
          },
          {
            "name": "Shadow Step",
            "level": 6,
            "subclass": "Warrior of Shadow",
            "source": "phb",
            "description": "While in Dim Light or Darkness, as a Bonus Action you can teleport up to 60 feet to an unoccupied space you can see that's also in Dim Light or Darkness, gaining Advantage on your next melee attack this turn."
          },
          {
            "name": "Improved Shadow Step",
            "level": 11,
            "subclass": "Warrior of Shadow",
            "source": "phb",
            "description": "You can Shadow Step from any lighting, and after teleporting you can make an Unarmed Strike as part of the same Bonus Action."
          },
          {
            "name": "Cloak of Shadows",
            "level": 17,
            "subclass": "Warrior of Shadow",
            "source": "phb",
            "description": "As a Magic action you can spend 3 Focus Points to become Invisible for 1 minute and gain the ability to move through occupied spaces and objects as if difficult terrain."
          }
        ]
      },
      {
        "name": "Warrior of the Elements",
        "className": "Monk",
        "flavor": "A monk who bends the four elements, striking at range and wreathing blows in fire, cold, and lightning.",
        "source": "phb",
        "features": [
          {
            "name": "Manifest Elements",
            "level": 3,
            "subclass": "Warrior of the Elements",
            "source": "phb",
            "description": "You can spend a Focus Point as a Bonus Action to channel the elements for 10 minutes: your Unarmed Strikes gain reach and elemental (Cold, Fire, Lightning, or Thunder) damage, and you can push or pull creatures you hit."
          },
          {
            "name": "Elemental Burst",
            "level": 6,
            "subclass": "Warrior of the Elements",
            "source": "phb",
            "description": "As a Magic action you can spend 2 Focus Points to hurl a 20-foot burst of elemental energy up to 120 feet; creatures make a Dexterity save for half damage."
          },
          {
            "name": "Stride of the Elements",
            "level": 11,
            "subclass": "Warrior of the Elements",
            "source": "phb",
            "description": "While Manifest Elements is active you gain a Fly Speed and a Swim Speed equal to your Speed."
          },
          {
            "name": "Epitome of Elements",
            "level": 17,
            "subclass": "Warrior of the Elements",
            "source": "phb",
            "description": "Manifest Elements no longer costs Focus to maintain, its reach and damage increase, and Elemental Burst grows larger."
          }
        ]
      }
    ]
  },
  {
    "name": "Paladin",
    "primaryAbility": [
      "STR",
      "CHA"
    ],
    "hitDie": 10,
    "savingThrows": [
      "WIS",
      "CHA"
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
        "Athletics",
        "Insight",
        "Intimidation",
        "Medicine",
        "Persuasion",
        "Religion"
      ]
    },
    "startingEquipment": [
      "Chain Mail, Shield, Longsword, 6 Javelins, Holy Symbol, Priest's Pack, 9 GP",
      "or 150 GP"
    ],
    "spellcasting": "half",
    "spellcastingAbility": "CHA",
    "subclassLevel": 3,
    "subclassLabel": "Paladin Subclass",
    "flavor": "A holy warrior bound by a sacred oath, blending martial might with divine magic — smiting evil, warding allies with a protective aura, and healing with a touch.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Lay On Hands",
          "Spellcasting",
          "Weapon Mastery"
        ],
        "columns": {
          "Channel Divinity": "—",
          "Prepared Spells": "2"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Fighting Style",
          "Paladin's Smite"
        ],
        "columns": {
          "Channel Divinity": "—",
          "Prepared Spells": "3"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Channel Divinity",
          "Paladin Subclass"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "4"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "5"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Extra Attack",
          "Faithful Steed"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "6"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Aura of Protection"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "6"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Abjure Foes"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "9"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Aura of Courage"
        ],
        "columns": {
          "Channel Divinity": "2",
          "Prepared Spells": "9"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Radiant Strikes"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "11"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Restoring Touch"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "11"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "12"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "12"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Aura Expansion"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "15"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Channel Divinity": "3",
          "Prepared Spells": "15"
        }
      }
    ],
    "features": [
      {
        "name": "Lay On Hands",
        "level": 1,
        "source": "srd",
        "description": "You have a pool of healing power that refreshes on a Long Rest, equal to five times your Paladin level. As a Bonus Action you can touch a creature and draw from the pool to restore HP; you can also spend 5 points from the pool to neutralize a poison or end a disease."
      },
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Paladin spells using Charisma, preparing a growing list (shown on the table) from the full Paladin list each day; you have no cantrips. Save DC is 8 + Charisma modifier + proficiency bonus. You use a Holy Symbol as your focus."
      },
      {
        "name": "Weapon Mastery",
        "level": 1,
        "source": "srd",
        "description": "You can use the Mastery property of two kinds of weapon you're proficient with. You can change your choices after a Long Rest."
      },
      {
        "name": "Fighting Style",
        "level": 2,
        "source": "srd",
        "description": "You gain a Fighting Style feat (Defense, Dueling, Great Weapon Fighting, or Protection are common)."
      },
      {
        "name": "Paladin's Smite",
        "level": 2,
        "source": "srd",
        "description": "You always have the Divine Smite spell prepared, and once per Long Rest you can cast it without expending a spell slot."
      },
      {
        "name": "Channel Divinity",
        "level": 3,
        "source": "srd",
        "description": "You can channel divine energy a number of times per rest (shown on the table; regain one on a Short Rest, all on a Long Rest). All Paladins gain Divine Sense (as a Bonus Action, know the location of Aberrations, Celestials, Fiends, and Undead nearby, and detect consecrated or desecrated places). Your subclass adds more options."
      },
      {
        "name": "Extra Attack",
        "level": 5,
        "source": "srd",
        "description": "You can attack twice whenever you take the Attack action on your turn."
      },
      {
        "name": "Faithful Steed",
        "level": 5,
        "source": "srd",
        "description": "You always have the Find Steed spell prepared, and once per Long Rest you can cast it without a spell slot."
      },
      {
        "name": "Aura of Protection",
        "level": 6,
        "source": "srd",
        "description": "You and allies within 10 feet add your Charisma modifier (min +1) to their saving throws while you're conscious."
      },
      {
        "name": "Abjure Foes",
        "level": 9,
        "source": "srd",
        "description": "A Channel Divinity option: as a Magic action you cow enemies within 60 feet — each must succeed on a Wisdom save or be Frightened (and unable to take Reactions) for a time."
      },
      {
        "name": "Aura of Courage",
        "level": 10,
        "source": "srd",
        "description": "You and allies within 10 feet can't be Frightened while you're conscious; if one was already Frightened, the condition is suspended in the aura."
      },
      {
        "name": "Radiant Strikes",
        "level": 11,
        "source": "srd",
        "description": "Each of your weapon and Unarmed Strike hits deals an extra 1d8 Radiant damage."
      },
      {
        "name": "Restoring Touch",
        "level": 14,
        "source": "srd",
        "description": "When you use Lay On Hands you can also end one condition (such as Blinded, Charmed, Frightened, Paralyzed, Poisoned, or Stunned) by spending 5 points from the pool per condition."
      },
      {
        "name": "Aura Expansion",
        "level": 18,
        "source": "srd",
        "description": "Your Aura of Protection and Aura of Courage (and other Paladin auras) expand to a 30-foot radius."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Truesight is a fitting choice."
      }
    ],
    "subclasses": [
      {
        "name": "Oath of Devotion",
        "className": "Paladin",
        "flavor": "The paragon of the paladin ideal — honesty, courage, compassion, and honor — smiting evil with a blessed weapon.",
        "source": "srd",
        "features": [
          {
            "name": "Sacred Weapon",
            "level": 3,
            "subclass": "Oath of Devotion",
            "source": "srd",
            "description": "You gain Oath of Devotion spells always prepared (Protection from Evil and Good, Shield of Faith, and more). Sacred Weapon (Channel Divinity): as a Bonus Action, for 10 minutes your weapon shines with light, adds your Charisma modifier to its attack rolls, and deals Radiant damage."
          },
          {
            "name": "Aura of Devotion",
            "level": 7,
            "subclass": "Oath of Devotion",
            "source": "srd",
            "description": "You and allies within your Aura of Protection can't be Charmed while you're conscious; a suspended Charm is held off within the aura."
          },
          {
            "name": "Smite of Protection",
            "level": 15,
            "subclass": "Oath of Devotion",
            "source": "srd",
            "description": "Whenever you cast Divine Smite, you and allies in your aura gain Half Cover until the start of your next turn."
          },
          {
            "name": "Holy Nimbus",
            "level": 20,
            "subclass": "Oath of Devotion",
            "source": "srd",
            "description": "As a Bonus Action you can shroud yourself in radiant light for 10 minutes: it sheds Bright Light, enemies that start their turn in your aura take Radiant damage, and you have Advantage on saves against spells cast by Fiends and Undead. Once per Long Rest, or by expending a spell slot."
          }
        ]
      },
      {
        "name": "Oath of Glory",
        "className": "Paladin",
        "flavor": "A paladin who pursues heroic legend, empowering allies to feats of greatness and racing to their side.",
        "source": "phb",
        "features": [
          {
            "name": "Inspiring Smite",
            "level": 3,
            "subclass": "Oath of Glory",
            "source": "phb",
            "description": "You gain Oath of Glory spells. Peerless Athlete (Channel Divinity): a Bonus Action to gain Advantage on Athletics and Acrobatics and greater jump/carry for 10 minutes. Inspiring Smite (Channel Divinity): after casting Divine Smite, distribute Temporary HP among creatures you choose."
          },
          {
            "name": "Aura of Alacrity",
            "level": 7,
            "subclass": "Oath of Glory",
            "source": "phb",
            "description": "Your Speed increases by 10 feet, and allies who start their turn within 5 feet of you gain +10 feet of Speed until the end of their turn."
          },
          {
            "name": "Glorious Defense",
            "level": 15,
            "subclass": "Oath of Glory",
            "source": "phb",
            "description": "When you or a creature in your aura is hit by an attack, you can use a Reaction to add your Charisma modifier to their AC against it (possibly turning the hit into a miss) and, if it still misses, make a weapon attack against the attacker."
          },
          {
            "name": "Living Legend",
            "level": 20,
            "subclass": "Oath of Glory",
            "source": "phb",
            "description": "As a Bonus Action for 1 minute you become the stuff of legend: you're Charismatically unstoppable (Advantage on Charisma checks), can turn a missed attack into a hit once per turn, and can force yourself to succeed on a failed save. Once per Long Rest, or by expending a spell slot."
          }
        ]
      },
      {
        "name": "Oath of the Ancients",
        "className": "Paladin",
        "flavor": "A paladin sworn to the light and life of the world, warding against darkness and enduring beyond mortal limits.",
        "source": "phb",
        "features": [
          {
            "name": "Nature's Wrath",
            "level": 3,
            "subclass": "Oath of the Ancients",
            "source": "phb",
            "description": "You gain Oath of the Ancients spells (Ensnaring Strike, Speak with Animals, and more). Nature's Wrath (Channel Divinity): a Magic action to conjure spectral vines that Restrain nearby creatures that fail a save."
          },
          {
            "name": "Aura of Warding",
            "level": 7,
            "subclass": "Oath of the Ancients",
            "source": "phb",
            "description": "You and allies in your aura have Resistance to Necrotic, Psychic, and Radiant damage."
          },
          {
            "name": "Undying Sentinel",
            "level": 15,
            "subclass": "Oath of the Ancients",
            "source": "phb",
            "description": "When you would drop to 0 HP and don't die outright, you drop to 1 HP instead (once per Long Rest), and you don't age unwillingly."
          },
          {
            "name": "Elder Champion",
            "level": 20,
            "subclass": "Oath of the Ancients",
            "source": "phb",
            "description": "As a Bonus Action you take on an ancient nature-guardian form for 1 minute: regain HP each turn, cast Paladin spells faster, and enemies in your aura have Disadvantage on saves against your spells and Channel Divinity. Once per Long Rest, or by expending a spell slot."
          }
        ]
      },
      {
        "name": "Oath of Vengeance",
        "className": "Paladin",
        "flavor": "A grim avenger who hunts a foe without mercy, marking a single enemy for a relentless, focused end.",
        "source": "phb",
        "features": [
          {
            "name": "Vow of Enmity",
            "level": 3,
            "subclass": "Oath of Vengeance",
            "source": "phb",
            "description": "You gain Oath of Vengeance spells (Bane, Hunter's Mark, and more). Vow of Enmity (Channel Divinity): as a Bonus Action, mark a creature within 30 feet for 1 minute — you have Advantage on attack rolls against it (moving the vow if it drops)."
          },
          {
            "name": "Relentless Avenger",
            "level": 7,
            "subclass": "Oath of Vengeance",
            "source": "phb",
            "description": "When you hit a creature with an Opportunity Attack, you can move up to half your Speed right after, and that movement doesn't provoke Opportunity Attacks."
          },
          {
            "name": "Soul of Vengeance",
            "level": 15,
            "subclass": "Oath of Vengeance",
            "source": "phb",
            "description": "When a creature under your Vow of Enmity attacks, you can use a Reaction to make a melee attack against it."
          },
          {
            "name": "Avenging Angel",
            "level": 20,
            "subclass": "Oath of Vengeance",
            "source": "phb",
            "description": "As a Bonus Action for 10 minutes you gain a Fly Speed and a frightful aura — enemies that start their turn within 30 feet must save or be Frightened while your form lasts. Once per Long Rest, or by expending a spell slot."
          }
        ]
      }
    ]
  },
  {
    "name": "Ranger",
    "primaryAbility": [
      "DEX",
      "WIS"
    ],
    "hitDie": 10,
    "savingThrows": [
      "STR",
      "DEX"
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
      "skillsChoose": 3,
      "skillsFrom": [
        "Animal Handling",
        "Athletics",
        "Insight",
        "Investigation",
        "Nature",
        "Perception",
        "Stealth",
        "Survival"
      ]
    },
    "startingEquipment": [
      "Studded Leather, Scimitar, Shortsword, Longbow, 20 Arrows, Quiver, Druidic Focus, Explorer's Pack, 7 GP",
      "or 150 GP"
    ],
    "spellcasting": "half",
    "spellcastingAbility": "WIS",
    "subclassLevel": 3,
    "subclassLabel": "Ranger Subclass",
    "flavor": "A wilderness warrior and hunter who blends martial skill, primal magic, and a relentless mark that hounds a chosen quarry.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Spellcasting",
          "Favored Enemy",
          "Weapon Mastery"
        ],
        "columns": {
          "Prepared Spells": "2"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Deft Explorer",
          "Fighting Style"
        ],
        "columns": {
          "Prepared Spells": "3"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Ranger Subclass"
        ],
        "columns": {
          "Prepared Spells": "4"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Prepared Spells": "5"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Extra Attack"
        ],
        "columns": {
          "Prepared Spells": "6"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Roving"
        ],
        "columns": {
          "Prepared Spells": "6"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Prepared Spells": "7"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Prepared Spells": "7"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Expertise"
        ],
        "columns": {
          "Prepared Spells": "9"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Tireless"
        ],
        "columns": {
          "Prepared Spells": "9"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Prepared Spells": "10"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Prepared Spells": "10"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [
          "Relentless Hunter"
        ],
        "columns": {
          "Prepared Spells": "11"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Nature's Veil"
        ],
        "columns": {
          "Prepared Spells": "11"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Prepared Spells": "12"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Prepared Spells": "12"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Precise Hunter"
        ],
        "columns": {
          "Prepared Spells": "14"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Feral Senses"
        ],
        "columns": {
          "Prepared Spells": "14"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Prepared Spells": "15"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Foe Slayer"
        ],
        "columns": {
          "Prepared Spells": "15"
        }
      }
    ],
    "features": [
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Ranger spells using Wisdom, preparing a growing list (shown on the table) from the full Ranger list; you have no cantrips. Save DC is 8 + Wisdom modifier + proficiency bonus. You can use a Druidic Focus."
      },
      {
        "name": "Favored Enemy",
        "level": 1,
        "source": "srd",
        "description": "You always have the Hunter's Mark spell prepared, and you can cast it without a spell slot a number of times per Long Rest equal to your proficiency bonus."
      },
      {
        "name": "Weapon Mastery",
        "level": 1,
        "source": "srd",
        "description": "You can use the Mastery property of two kinds of weapon you're proficient with. You can change your choices after a Long Rest."
      },
      {
        "name": "Deft Explorer",
        "level": 2,
        "source": "srd",
        "description": "You gain Expertise in one skill you're proficient in and learn two languages of your choice."
      },
      {
        "name": "Fighting Style",
        "level": 2,
        "source": "srd",
        "description": "You gain a Fighting Style feat (Archery, Defense, Druidic Warrior, or Two-Weapon Fighting are common)."
      },
      {
        "name": "Extra Attack",
        "level": 5,
        "source": "srd",
        "description": "You can attack twice whenever you take the Attack action on your turn."
      },
      {
        "name": "Roving",
        "level": 6,
        "source": "srd",
        "description": "Your Speed increases by 10 feet, and you gain a Climb Speed and a Swim Speed equal to your Speed, while you aren't wearing Heavy armor."
      },
      {
        "name": "Expertise",
        "level": 9,
        "source": "srd",
        "description": "Choose two skill proficiencies to gain Expertise (double proficiency)."
      },
      {
        "name": "Tireless",
        "level": 10,
        "source": "srd",
        "description": "As a Magic action you can give yourself Temporary HP (roll 1d8 + Wisdom modifier), a number of times per Long Rest equal to your proficiency bonus, and finishing a Short Rest reduces your Exhaustion level by 1."
      },
      {
        "name": "Relentless Hunter",
        "level": 13,
        "source": "srd",
        "description": "Taking damage can't break your Concentration on Hunter's Mark."
      },
      {
        "name": "Nature's Veil",
        "level": 14,
        "source": "srd",
        "description": "As a Bonus Action you can become Invisible until the end of your next turn, a number of times per Long Rest equal to your proficiency bonus (or by expending a spell slot)."
      },
      {
        "name": "Precise Hunter",
        "level": 17,
        "source": "srd",
        "description": "You have Advantage on attack rolls against the creature currently marked by your Hunter's Mark."
      },
      {
        "name": "Feral Senses",
        "level": 18,
        "source": "srd",
        "description": "You gain Blindsight with a range of 30 feet, letting you sense creatures you can't see nearby, and you always know the direction to your Hunter's Mark target."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Dimensional Travel is a fitting choice."
      },
      {
        "name": "Foe Slayer",
        "level": 20,
        "source": "srd",
        "description": "Your Hunter's Mark damage die becomes a d10, and once per turn you can add your Wisdom modifier to an attack roll or damage roll against your marked target."
      }
    ],
    "subclasses": [
      {
        "name": "Hunter",
        "className": "Ranger",
        "flavor": "A monster-slayer trained to fell the great threats to civilization — whether a lone giant or a swarming horde.",
        "source": "srd",
        "features": [
          {
            "name": "Hunter's Prey",
            "level": 3,
            "subclass": "Hunter",
            "source": "srd",
            "description": "You gain Hunter's Lore (learn a marked creature's damage immunities/resistances/vulnerabilities). Choose Hunter's Prey: Colossus Slayer (once per turn, +1d8 damage to a creature below its HP maximum) or Horde Breaker (once per turn, a second attack against a different creature within 5 feet of the first)."
          },
          {
            "name": "Defensive Tactics",
            "level": 7,
            "subclass": "Hunter",
            "source": "srd",
            "description": "Choose Escape the Horde (Opportunity Attacks against you have Disadvantage) or Multiattack Defense (after a creature hits you, it has Disadvantage on further attacks against you this turn)."
          },
          {
            "name": "Superior Hunter's Prey",
            "level": 11,
            "subclass": "Hunter",
            "source": "srd",
            "description": "When you damage your Hunter's Mark target, you can also deal the Hunter's Mark bonus damage to one other creature nearby."
          },
          {
            "name": "Superior Hunter's Defense",
            "level": 15,
            "subclass": "Hunter",
            "source": "srd",
            "description": "When you take damage, you can use a Reaction to give yourself Resistance to that damage (and to that damage type until the start of your next turn)."
          }
        ]
      },
      {
        "name": "Beast Master",
        "className": "Ranger",
        "flavor": "A ranger bonded to a primal companion that fights at their side, growing fiercer as the bond deepens.",
        "source": "phb",
        "features": [
          {
            "name": "Primal Companion",
            "level": 3,
            "subclass": "Beast Master",
            "source": "phb",
            "description": "You magically summon a Primal Beast companion (Land, Sea, or Sky) that obeys you, shares your proficiency bonus, and acts on your turn — taking the Attack action when you command it as a Bonus Action. If it drops, you can revive it or resummon it after a rest."
          },
          {
            "name": "Exceptional Training",
            "level": 7,
            "subclass": "Beast Master",
            "source": "phb",
            "description": "On your turn you can command your companion to take the Dash, Disengage, Dodge, or Help action as a Bonus Action, and its attacks deal Force damage if you wish."
          },
          {
            "name": "Bestial Fury",
            "level": 11,
            "subclass": "Beast Master",
            "source": "phb",
            "description": "Your companion makes two attacks when it takes the Attack action, and once per turn it can add your Hunter's Mark bonus damage."
          },
          {
            "name": "Share Spells",
            "level": 15,
            "subclass": "Beast Master",
            "source": "phb",
            "description": "When you cast a spell targeting yourself, you can also affect your companion if it's within 30 feet."
          }
        ]
      },
      {
        "name": "Fey Wanderer",
        "className": "Ranger",
        "flavor": "A ranger touched by the Feywild — uncanny charm, dread magical strikes, and fey allies that appear at need.",
        "source": "phb",
        "features": [
          {
            "name": "Dreadful Strikes",
            "level": 3,
            "subclass": "Fey Wanderer",
            "source": "phb",
            "description": "You gain Fey Wanderer spells and Otherworldly Glamour (add your Wisdom modifier to Charisma checks, and proficiency in a Charisma skill). Once per turn, your weapon hits deal extra Psychic damage."
          },
          {
            "name": "Beguiling Twist",
            "level": 7,
            "subclass": "Fey Wanderer",
            "source": "phb",
            "description": "You have Advantage on saves against being Charmed or Frightened, and when a creature near you succeeds on a save against those conditions, you can use a Reaction to redirect the effect onto another creature."
          },
          {
            "name": "Fey Reinforcements",
            "level": 11,
            "subclass": "Fey Wanderer",
            "source": "phb",
            "description": "You always have Summon Fey prepared and can cast it once without a spell slot per Long Rest, and the summoned fey can turn Invisible."
          },
          {
            "name": "Misty Wanderer",
            "level": 15,
            "subclass": "Fey Wanderer",
            "source": "phb",
            "description": "You can cast Misty Step without a spell slot a number of times per Long Rest equal to your Wisdom modifier, and you can bring a willing creature with you."
          }
        ]
      },
      {
        "name": "Gloom Stalker",
        "className": "Ranger",
        "flavor": "An ambusher of the dark places of the world, striking first and hardest and vanishing into shadow.",
        "source": "phb",
        "features": [
          {
            "name": "Dread Ambusher",
            "level": 3,
            "subclass": "Gloom Stalker",
            "source": "phb",
            "description": "You gain Gloom Stalker spells and Umbral Sight (Darkvision, and you're invisible to creatures relying on Darkvision to see you). On your first turn of combat your Speed increases and you make an extra weapon attack that deals bonus Psychic damage, and you add your Wisdom modifier to your Initiative."
          },
          {
            "name": "Iron Mind",
            "level": 7,
            "subclass": "Gloom Stalker",
            "source": "phb",
            "description": "You gain proficiency in Wisdom saving throws (or another mental save if you already have it)."
          },
          {
            "name": "Stalker's Flurry",
            "level": 11,
            "subclass": "Gloom Stalker",
            "source": "phb",
            "description": "Once per turn when you miss with an attack, you can make another weapon attack as part of the same action."
          },
          {
            "name": "Shadowy Dodge",
            "level": 15,
            "subclass": "Gloom Stalker",
            "source": "phb",
            "description": "When a creature attacks you and doesn't have Advantage, you can use a Reaction to impose Disadvantage on the roll and teleport up to 30 feet to an unoccupied space you can see."
          }
        ]
      }
    ]
  },
  {
    "name": "Sorcerer",
    "primaryAbility": [
      "CHA"
    ],
    "hitDie": 6,
    "savingThrows": [
      "CON",
      "CHA"
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
        "Deception",
        "Insight",
        "Intimidation",
        "Persuasion",
        "Religion"
      ]
    },
    "startingEquipment": [
      "Spear, 2 Daggers, Arcane Focus (Crystal), Dungeoneer's Pack, 28 GP",
      "or 50 GP"
    ],
    "spellcasting": "full",
    "spellcastingAbility": "CHA",
    "subclassLevel": 3,
    "subclassLabel": "Sorcerer Subclass",
    "flavor": "A caster whose magic wells up from within, reshaped on the fly by Metamagic and Sorcery Points — flexible, explosive, and unmistakably innate.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Spellcasting",
          "Innate Sorcery"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Sorcery Points": "—",
          "Cantrips": "4",
          "Prepared Spells": "2"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Font of Magic",
          "Metamagic"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Sorcery Points": "2",
          "Cantrips": "4",
          "Prepared Spells": "4"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Sorcerer Subclass"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Sorcery Points": "3",
          "Cantrips": "4",
          "Prepared Spells": "6"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Sorcery Points": "4",
          "Cantrips": "5",
          "Prepared Spells": "7"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Sorcerous Restoration"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Sorcery Points": "5",
          "Cantrips": "5",
          "Prepared Spells": "9"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Sorcery Points": "6",
          "Cantrips": "5",
          "Prepared Spells": "10"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Sorcery Incarnate"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Sorcery Points": "7",
          "Cantrips": "5",
          "Prepared Spells": "11"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 5,
        "columns": {
          "Sorcery Points": "8",
          "Cantrips": "5",
          "Prepared Spells": "12"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 5,
        "columns": {
          "Sorcery Points": "9",
          "Cantrips": "5",
          "Prepared Spells": "14"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Metamagic"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "10",
          "Cantrips": "6",
          "Prepared Spells": "15"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "11",
          "Cantrips": "6",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "12",
          "Cantrips": "6",
          "Prepared Spells": "16"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "13",
          "Cantrips": "6",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "14",
          "Cantrips": "6",
          "Prepared Spells": "17"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "15",
          "Cantrips": "6",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "16",
          "Cantrips": "6",
          "Prepared Spells": "18"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Metamagic"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "17",
          "Cantrips": "6",
          "Prepared Spells": "19"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "18",
          "Cantrips": "6",
          "Prepared Spells": "20"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "19",
          "Cantrips": "6",
          "Prepared Spells": "21"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Arcane Apotheosis"
        ],
        "cantripsKnown": 6,
        "columns": {
          "Sorcery Points": "20",
          "Cantrips": "6",
          "Prepared Spells": "22"
        }
      }
    ],
    "features": [
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "srd",
        "description": "You cast Sorcerer spells using Charisma, preparing a growing list (shown on the table) plus cantrips from the full Sorcerer list. Save DC is 8 + Charisma modifier + proficiency bonus. You can use an Arcane Focus."
      },
      {
        "name": "Innate Sorcery",
        "level": 1,
        "source": "srd",
        "description": "As a Bonus Action you unleash your innate magic for 1 minute: your Sorcerer spell save DC increases by 1 and you have Advantage on Sorcerer spell attack rolls. Twice per Long Rest."
      },
      {
        "name": "Font of Magic",
        "level": 2,
        "source": "srd",
        "description": "You gain Sorcery Points (shown on the table). As a Bonus Action you can convert Sorcery Points into spell slots, or expend spell slots to gain Sorcery Points."
      },
      {
        "name": "Metamagic",
        "level": 2,
        "source": "srd",
        "description": "You learn two Metamagic options (such as Careful, Distant, Empowered, Extended, Quickened, Subtle, or Twinned Spell) that reshape your spells for a cost in Sorcery Points. You learn two more at levels 10 and 17, and can swap options when you level up."
      },
      {
        "name": "Sorcerous Restoration",
        "level": 5,
        "source": "srd",
        "description": "When you finish a Short Rest, you can regain expended Sorcery Points (up to half your Sorcerer level). Once per Long Rest."
      },
      {
        "name": "Sorcery Incarnate",
        "level": 7,
        "source": "srd",
        "description": "If you have no uses of Innate Sorcery left, you can activate it by spending 2 Sorcery Points, and while it's active you can apply up to two Metamagic options to a single spell."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Spell Recall is a fitting choice."
      },
      {
        "name": "Arcane Apotheosis",
        "level": 20,
        "source": "srd",
        "description": "While your Innate Sorcery is active, you can use one Metamagic option on each of your turns without spending Sorcery Points."
      }
    ],
    "subclasses": [
      {
        "name": "Draconic Sorcery",
        "className": "Sorcerer",
        "flavor": "A sorcerer with dragon blood, warded by scaled resilience and commanding an elemental heritage — eventually sprouting wings.",
        "source": "srd",
        "features": [
          {
            "name": "Draconic Resilience",
            "level": 3,
            "subclass": "Draconic Sorcery",
            "source": "srd",
            "description": "Your HP maximum increases by 1 per Sorcerer level, and while you wear no armor your AC equals 10 + Dexterity modifier + Charisma modifier. You also gain Draconic Spells always prepared and choose a draconic damage type."
          },
          {
            "name": "Elemental Affinity",
            "level": 6,
            "subclass": "Draconic Sorcery",
            "source": "srd",
            "description": "When you cast a spell that deals your draconic damage type, you add your Charisma modifier to one damage roll, and you can spend a Sorcery Point to gain Resistance to that damage type for an hour."
          },
          {
            "name": "Dragon Wings",
            "level": 14,
            "subclass": "Draconic Sorcery",
            "source": "srd",
            "description": "As a Bonus Action you can sprout dragon wings and gain a Fly Speed equal to your Speed for as long as you like (while not wearing armor that doesn't accommodate them)."
          },
          {
            "name": "Dragon Companion",
            "level": 18,
            "subclass": "Draconic Sorcery",
            "source": "srd",
            "description": "You can cast Summon Dragon (always prepared) once without a spell slot per Long Rest, and while concentrating on it you gain a Frightful Presence you can unleash."
          }
        ]
      },
      {
        "name": "Aberrant Sorcery",
        "className": "Sorcerer",
        "flavor": "A sorcerer whose power seeps from the Far Realm — psionic whispers, telepathy, and flesh that warps to alien will.",
        "source": "phb",
        "features": [
          {
            "name": "Psionic Sorcery",
            "level": 3,
            "subclass": "Aberrant Sorcery",
            "source": "phb",
            "description": "You gain Psionic Spells and Telepathic Speech (a Bonus Action to form a telepathic link with a creature you can see). You can cast your psionic spells by spending Sorcery Points instead of slots and can cast them without Verbal or Somatic components."
          },
          {
            "name": "Psychic Defenses",
            "level": 6,
            "subclass": "Aberrant Sorcery",
            "source": "phb",
            "description": "You have Resistance to Psychic damage and Advantage on saves against being Charmed or Frightened, and when a creature deals Psychic damage to you or tries to read your mind, you can lash back with Psychic damage."
          },
          {
            "name": "Revelation in Flesh",
            "level": 14,
            "subclass": "Aberrant Sorcery",
            "source": "phb",
            "description": "As a Bonus Action you can spend Sorcery Points to physically transform for 10 minutes, gaining benefits such as a Fly or Swim Speed, Darkvision and See Invisibility, or a squeezing, boneless body."
          },
          {
            "name": "Warping Implosion",
            "level": 18,
            "subclass": "Aberrant Sorcery",
            "source": "phb",
            "description": "As a Magic action you can teleport up to 120 feet and unleash a burst of Force damage on creatures near the space you left, pulling them toward it. Once per Long Rest, or by spending Sorcery Points."
          }
        ]
      },
      {
        "name": "Clockwork Sorcery",
        "className": "Sorcerer",
        "flavor": "A sorcerer aligned with the cosmic force of Order, smoothing away chaos and cloaking allies in inevitable law.",
        "source": "phb",
        "features": [
          {
            "name": "Restore Balance",
            "level": 3,
            "subclass": "Clockwork Sorcery",
            "source": "phb",
            "description": "You gain Clockwork Spells. As a Reaction when a creature you can see is about to roll with Advantage or Disadvantage, you can cancel it, forcing a straight roll. Uses equal to your proficiency bonus per Long Rest."
          },
          {
            "name": "Bastion of Law",
            "level": 6,
            "subclass": "Clockwork Sorcery",
            "source": "phb",
            "description": "As a Magic action you can spend 1-5 Sorcery Points to shield a creature with a ward of dice; the creature can expend those dice to reduce damage it takes."
          },
          {
            "name": "Trance of Order",
            "level": 14,
            "subclass": "Clockwork Sorcery",
            "source": "phb",
            "description": "As a Bonus Action you enter perfect focus for 1 minute: attack rolls against you can't benefit from Advantage, and once each turn you can treat a d20 roll of 9 or lower as a 10. Once per Long Rest, or by spending Sorcery Points."
          },
          {
            "name": "Clockwork Cavalcade",
            "level": 18,
            "subclass": "Clockwork Sorcery",
            "source": "phb",
            "description": "As a Magic action you summon spirits of order in a 30-foot Cube that heal creatures, repair objects, and end one spell of level 6 or lower on each creature. Once per Long Rest, or by spending Sorcery Points."
          }
        ]
      },
      {
        "name": "Wild Magic Sorcery",
        "className": "Sorcerer",
        "flavor": "A sorcerer riddled with raw chaos, whose spells sometimes spark unpredictable surges — and who can bend that luck at will.",
        "source": "phb",
        "features": [
          {
            "name": "Wild Magic Surge",
            "level": 3,
            "subclass": "Wild Magic Sorcery",
            "source": "phb",
            "description": "Your spellcasting can trigger a random magical Surge (roll on the Wild Magic table). You also gain Tides of Chaos: give yourself Advantage on one d20 roll; using it may trigger a Surge, and a Surge refreshes it."
          },
          {
            "name": "Bend Luck",
            "level": 6,
            "subclass": "Wild Magic Sorcery",
            "source": "phb",
            "description": "As a Reaction when a creature you can see makes a d20 roll, you can spend 1 Sorcery Point to add or subtract 1d4 from it."
          },
          {
            "name": "Controlled Chaos",
            "level": 14,
            "subclass": "Wild Magic Sorcery",
            "source": "phb",
            "description": "Whenever you roll on the Wild Magic table, you roll twice and choose which result to use."
          },
          {
            "name": "Spell Bombardment",
            "level": 18,
            "subclass": "Wild Magic Sorcery",
            "source": "phb",
            "description": "Once per turn, when you roll damage for a spell and a die shows its highest value, you can roll it again and add it to the damage."
          }
        ]
      }
    ]
  },
  {
    "name": "Warlock",
    "primaryAbility": [
      "CHA"
    ],
    "hitDie": 8,
    "savingThrows": [
      "WIS",
      "CHA"
    ],
    "proficiencies": {
      "armor": [
        "Light armor"
      ],
      "weapons": [
        "Simple weapons"
      ],
      "tools": [],
      "skillsChoose": 2,
      "skillsFrom": [
        "Arcana",
        "Deception",
        "History",
        "Intimidation",
        "Investigation",
        "Nature",
        "Religion"
      ]
    },
    "startingEquipment": [
      "Leather Armor, Sickle, 2 Daggers, Arcane Focus (Orb), Book (Occult Lore), Scholar's Pack, 15 GP",
      "or 100 GP"
    ],
    "spellcasting": "pact",
    "spellcastingAbility": "CHA",
    "subclassLevel": 3,
    "subclassLabel": "Warlock Subclass",
    "flavor": "A caster bound to an otherworldly patron, wielding a small set of hard-hitting slots that recharge on a Short Rest, endlessly customized by Eldritch Invocations.",
    "source": "srd",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Pact Magic",
          "Eldritch Invocations"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "2",
          "Invocations": "1"
        }
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Magical Cunning"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "3",
          "Invocations": "3"
        }
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Warlock Subclass"
        ],
        "cantripsKnown": 2,
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "4",
          "Invocations": "3"
        }
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "5",
          "Invocations": "3"
        }
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "6",
          "Invocations": "5"
        }
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "7",
          "Invocations": "5"
        }
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "8",
          "Invocations": "6"
        }
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "9",
          "Invocations": "6"
        }
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Contact Patron"
        ],
        "cantripsKnown": 3,
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "10",
          "Invocations": "7"
        }
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "10",
          "Invocations": "7"
        }
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Mystic Arcanum (Level 6 Spell)"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "11",
          "Invocations": "7"
        }
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "11",
          "Invocations": "8"
        }
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [
          "Mystic Arcanum (Level 7 Spell)"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "12",
          "Invocations": "8"
        }
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "12",
          "Invocations": "8"
        }
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Mystic Arcanum (Level 8 Spell)"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "13",
          "Invocations": "9"
        }
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "13",
          "Invocations": "9"
        }
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [
          "Mystic Arcanum (Level 9 Spell)"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "14",
          "Invocations": "9"
        }
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "14",
          "Invocations": "10"
        }
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "15",
          "Invocations": "10"
        }
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Eldritch Master"
        ],
        "cantripsKnown": 4,
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "15",
          "Invocations": "10"
        }
      }
    ],
    "features": [
      {
        "name": "Pact Magic",
        "level": 1,
        "source": "srd",
        "description": "You cast Warlock spells using Charisma. Your spell slots are all the same level (rising to level 5) and few in number, and you regain them on a Short or Long Rest. You prepare a small list (shown on the table) plus cantrips. Save DC is 8 + Charisma modifier + proficiency bonus. You can use an Arcane Focus."
      },
      {
        "name": "Eldritch Invocations",
        "level": 1,
        "source": "srd",
        "description": "You learn Eldritch Invocations — magical customizations that grant new abilities, alter your Eldritch Blast, or forge a pact with a weapon (Pact of the Blade), tome (Pact of the Tome), or familiar (Pact of the Chain). You learn more as you level (shown on the table) and can swap them when you level up."
      },
      {
        "name": "Magical Cunning",
        "level": 2,
        "source": "srd",
        "description": "Once per Long Rest you can perform a 1-minute ritual to regain expended Pact Magic spell slots (up to half your maximum, rounded up)."
      },
      {
        "name": "Contact Patron",
        "level": 9,
        "source": "srd",
        "description": "You always have the Contact Other Plane spell prepared, and you can cast it to contact your patron without risk of harm, once per Long Rest without a slot."
      },
      {
        "name": "Mystic Arcanum",
        "level": 11,
        "source": "srd",
        "description": "You gain a level 6 spell of your choice from the Warlock list as an Arcanum; you can cast it once per Long Rest without a spell slot. You gain a level 7 Arcanum at 13th, level 8 at 15th, and level 9 at 17th level."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "srd",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "srd",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Fate is a fitting choice."
      },
      {
        "name": "Eldritch Master",
        "level": 20,
        "source": "srd",
        "description": "You can take a Magic action to regain all your expended Pact Magic spell slots. Once per Long Rest."
      }
    ],
    "subclasses": [
      {
        "name": "Fiend Patron",
        "className": "Warlock",
        "flavor": "A pact with a devil or demon of the Lower Planes, rewarding slaughter with vitality and infernal luck.",
        "source": "srd",
        "features": [
          {
            "name": "Dark One's Blessing",
            "level": 3,
            "subclass": "Fiend Patron",
            "source": "srd",
            "description": "You gain Fiend spells always prepared (Burning Hands, Command, and more). When you reduce a creature to 0 HP, or one dies near you, you gain Temporary HP equal to your Charisma modifier + Warlock level."
          },
          {
            "name": "Dark One's Own Luck",
            "level": 6,
            "subclass": "Fiend Patron",
            "source": "srd",
            "description": "When you make an ability check or saving throw, you can add 1d10 to it after seeing the roll. Uses equal to your Charisma modifier per Long Rest."
          },
          {
            "name": "Fiendish Resilience",
            "level": 10,
            "subclass": "Fiend Patron",
            "source": "srd",
            "description": "After a Short or Long Rest, choose a damage type; you have Resistance to it until you choose a different one (except damage from Silvered or Magical weapons)."
          },
          {
            "name": "Hurl Through Hell",
            "level": 14,
            "subclass": "Fiend Patron",
            "source": "srd",
            "description": "Once per turn when you hit a creature with an attack, you can banish it on a hellish journey; at the start of your next turn it returns and takes heavy Psychic damage. Uses equal to your proficiency bonus per Long Rest."
          }
        ]
      },
      {
        "name": "Archfey Patron",
        "className": "Warlock",
        "flavor": "A bargain with a lord or lady of the Feywild — misty steps, beguiling wards, and fey-touched trickery.",
        "source": "phb",
        "features": [
          {
            "name": "Steps of the Fey",
            "level": 3,
            "subclass": "Archfey Patron",
            "source": "phb",
            "description": "You gain Archfey spells and can cast Misty Step without a slot a number of times per Long Rest; each casting also grants a Refreshing Step (Temporary HP) or Taunting Step (nearby enemies have Disadvantage attacking others)."
          },
          {
            "name": "Misty Escape",
            "level": 6,
            "subclass": "Archfey Patron",
            "source": "phb",
            "description": "When you take damage, you can use a Reaction to turn Invisible and teleport up to 60 feet (part of your Steps of the Fey), gaining Advantage on your next attack."
          },
          {
            "name": "Beguiling Defenses",
            "level": 10,
            "subclass": "Archfey Patron",
            "source": "phb",
            "description": "You're immune to the Charmed condition, and when a creature tries to Charm you, you can use a Reaction to turn the effect back on it (a Wisdom save or be Charmed and take Psychic damage each turn)."
          },
          {
            "name": "Bewitching Magic",
            "level": 14,
            "subclass": "Archfey Patron",
            "source": "phb",
            "description": "When you cast an Enchantment or Illusion spell of level 1+ using a spell slot, you can immediately cast Misty Step as part of the same action, without expending a use."
          }
        ]
      },
      {
        "name": "Celestial Patron",
        "className": "Warlock",
        "flavor": "A pact with a being of the Upper Planes, channeling radiant power to heal allies and scour the wicked.",
        "source": "phb",
        "features": [
          {
            "name": "Healing Light",
            "level": 3,
            "subclass": "Celestial Patron",
            "source": "phb",
            "description": "You gain Celestial spells and the Light and Sacred Flame cantrips. You have a pool of d6 healing dice (equal to 1 + your Warlock level) that you can spend as a Bonus Action to restore a creature's HP; the pool refreshes on a Long Rest."
          },
          {
            "name": "Radiant Soul",
            "level": 6,
            "subclass": "Celestial Patron",
            "source": "phb",
            "description": "You have Resistance to Radiant damage, and once per turn you add your Charisma modifier to one Radiant or Fire damage roll of a spell you cast."
          },
          {
            "name": "Celestial Resilience",
            "level": 10,
            "subclass": "Celestial Patron",
            "source": "phb",
            "description": "You gain Temporary HP when you finish a Short or Long Rest, and can share Temporary HP with allies."
          },
          {
            "name": "Searing Vengeance",
            "level": 14,
            "subclass": "Celestial Patron",
            "source": "phb",
            "description": "When you would make a Death Saving Throw, you can instead spring back up with HP and radiant power, dealing Radiant damage to and Blinding nearby enemies. Once per Long Rest."
          }
        ]
      },
      {
        "name": "Great Old One Patron",
        "className": "Warlock",
        "flavor": "A pact with an incomprehensible entity of the Far Realm — telepathy, mind-rending magic, and psychic dominion.",
        "source": "phb",
        "features": [
          {
            "name": "Awakened Mind",
            "level": 3,
            "subclass": "Great Old One Patron",
            "source": "phb",
            "description": "You gain Psychic spells and can telepathically speak with any creature you can see within 30 feet. You also gain Whispers of the Grave (cast Detect Thoughts a number of times per Long Rest) and Tongue of the Void."
          },
          {
            "name": "Psychic Spells",
            "level": 6,
            "subclass": "Great Old One Patron",
            "source": "phb",
            "description": "When you cast a Warlock spell that deals damage, you can change its damage type to Psychic, and Enchantment/Illusion spells can be cast without Verbal or Somatic components."
          },
          {
            "name": "Clairvoyant Combatant",
            "level": 10,
            "subclass": "Great Old One Patron",
            "source": "phb",
            "description": "When you telepathically speak to a creature, you can force a Wisdom save; on a failure it has Disadvantage on attacks against you and you have Advantage against it for 1 minute. Once per Short or Long Rest."
          },
          {
            "name": "Create Thrall",
            "level": 14,
            "subclass": "Great Old One Patron",
            "source": "phb",
            "description": "You can cast Summon Aberration without a slot once per Long Rest, and you can Charm an Incapacitated creature you touch, making it your psychically bound thrall."
          }
        ]
      }
    ]
  },
  {
    "name": "Artificer",
    "primaryAbility": [
      "INT"
    ],
    "hitDie": 8,
    "savingThrows": [
      "CON",
      "INT"
    ],
    "proficiencies": {
      "armor": [
        "Light armor",
        "Medium armor",
        "Shields"
      ],
      "weapons": [
        "Simple weapons"
      ],
      "tools": [
        "Thieves' Tools",
        "Tinker's Tools",
        "one other Artisan's Tools of your choice"
      ],
      "skillsChoose": 2,
      "skillsFrom": [
        "Arcana",
        "History",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Sleight of Hand"
      ]
    },
    "startingEquipment": [
      "Studded Leather Armor, Dagger, Thieves' Tools, Tinker's Tools, two Simple weapons, a Spellcasting Focus (any Artisan's Tools you're proficient with), Dungeoneer's Pack, 12 GP",
      "or 150 GP"
    ],
    "spellcasting": "artificer",
    "spellcastingAbility": "INT",
    "subclassLevel": 3,
    "subclassLabel": "Artificer Specialist",
    "flavor": "An inventor who channels magic through tools and tinkered devices — infusing ordinary gear with power, replicating wondrous items, and improvising a fix for any problem.",
    "source": "eberron",
    "table": [
      {
        "level": 1,
        "profBonus": 2,
        "features": [
          "Magical Tinkering",
          "Spellcasting"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "2"
        },
        "cantripsKnown": 2
      },
      {
        "level": 2,
        "profBonus": 2,
        "features": [
          "Replicate Magic Item"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "3"
        },
        "cantripsKnown": 2
      },
      {
        "level": 3,
        "profBonus": 2,
        "features": [
          "Artificer Subclass",
          "Right Tool for the Job"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "4"
        },
        "cantripsKnown": 2
      },
      {
        "level": 4,
        "profBonus": 2,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "5"
        },
        "cantripsKnown": 2
      },
      {
        "level": 5,
        "profBonus": 3,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "6"
        },
        "cantripsKnown": 2
      },
      {
        "level": 6,
        "profBonus": 3,
        "features": [
          "Magic Item Tinker"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "6"
        },
        "cantripsKnown": 2
      },
      {
        "level": 7,
        "profBonus": 3,
        "features": [
          "Flash of Genius"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "7"
        },
        "cantripsKnown": 2
      },
      {
        "level": 8,
        "profBonus": 3,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "7"
        },
        "cantripsKnown": 2
      },
      {
        "level": 9,
        "profBonus": 4,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Cantrips": "2",
          "Prepared Spells": "9"
        },
        "cantripsKnown": 2
      },
      {
        "level": 10,
        "profBonus": 4,
        "features": [
          "Magic Item Adept"
        ],
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "9"
        },
        "cantripsKnown": 3
      },
      {
        "level": 11,
        "profBonus": 4,
        "features": [
          "Spell-Storing Item"
        ],
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "10"
        },
        "cantripsKnown": 3
      },
      {
        "level": 12,
        "profBonus": 4,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "10"
        },
        "cantripsKnown": 3
      },
      {
        "level": 13,
        "profBonus": 5,
        "features": [],
        "columns": {
          "Cantrips": "3",
          "Prepared Spells": "11"
        },
        "cantripsKnown": 3
      },
      {
        "level": 14,
        "profBonus": 5,
        "features": [
          "Advanced Artifice"
        ],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "11"
        },
        "cantripsKnown": 4
      },
      {
        "level": 15,
        "profBonus": 5,
        "features": [
          "Subclass Feature"
        ],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "12"
        },
        "cantripsKnown": 4
      },
      {
        "level": 16,
        "profBonus": 5,
        "features": [
          "Ability Score Improvement"
        ],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "12"
        },
        "cantripsKnown": 4
      },
      {
        "level": 17,
        "profBonus": 6,
        "features": [],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "14"
        },
        "cantripsKnown": 4
      },
      {
        "level": 18,
        "profBonus": 6,
        "features": [
          "Magic Item Master"
        ],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "14"
        },
        "cantripsKnown": 4
      },
      {
        "level": 19,
        "profBonus": 6,
        "features": [
          "Epic Boon"
        ],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "15"
        },
        "cantripsKnown": 4
      },
      {
        "level": 20,
        "profBonus": 6,
        "features": [
          "Soul of Artifice"
        ],
        "columns": {
          "Cantrips": "4",
          "Prepared Spells": "15"
        },
        "cantripsKnown": 4
      }
    ],
    "features": [
      {
        "name": "Magical Tinkering",
        "level": 1,
        "source": "eberron",
        "description": "Using your tools, you can touch a tiny nonmagical object and give it one minor magical property: it can emit light, a recorded message (up to 6 words), a smell, or a static visual effect. You can affect a number of objects equal to your Intelligence modifier, and can end an effect as an action."
      },
      {
        "name": "Spellcasting",
        "level": 1,
        "source": "eberron",
        "description": "You cast Artificer spells using Intelligence and a set of Artisan's Tools (or Thieves' Tools) as your Spellcasting Focus. You know two cantrips and prepare a number of leveled spells shown on the table, drawn from the Artificer list; unusually, you gain spell slots at 1st level. Save DC is 8 + Intelligence modifier + proficiency bonus. To cast a spell you must have a spellcasting focus in hand."
      },
      {
        "name": "Replicate Magic Item",
        "level": 2,
        "source": "eberron",
        "description": "You learn to reproduce specific magic items with your tools. Choose items from the Replicable Items lists (the number you can have replicated grows as you level); creating one takes time during a rest and it functions as the normal magic item while it exists. You can change your choices when you finish a Long Rest."
      },
      {
        "name": "Right Tool for the Job",
        "level": 3,
        "source": "eberron",
        "description": "Over a Short or Long Rest you can magically fabricate one set of Artisan's Tools of your choice in an unoccupied space near you, saving you from ever being caught without the right tools."
      },
      {
        "name": "Ability Score Improvement",
        "level": 4,
        "source": "eberron",
        "description": "Increase one ability score by 2, or two by 1 (max 20), or take a feat. Repeats at 8th, 12th, and 16th level."
      },
      {
        "name": "Magic Item Tinker",
        "level": 6,
        "source": "eberron",
        "description": "As a Magic action you can manipulate the magic of an item you're holding: Charge (restore an expended charge — limited uses per day), Drain (destroy a nonpermanent item to regain a spell slot), or Transmute (change the item into a different one you could replicate)."
      },
      {
        "name": "Flash of Genius",
        "level": 7,
        "source": "eberron",
        "description": "When you or a creature you can see within 30 feet makes an ability check or saving throw, you can use a Reaction to add your Intelligence modifier to the roll. You can do this a number of times equal to your Intelligence modifier per Long Rest."
      },
      {
        "name": "Magic Item Adept",
        "level": 10,
        "source": "eberron",
        "description": "You can attune to up to four magic items at once, and you can replicate magic items faster and more cheaply than normal."
      },
      {
        "name": "Spell-Storing Item",
        "level": 11,
        "source": "eberron",
        "description": "When you finish a Long Rest you can store one Artificer spell of level 1 or 2 (that has a casting time of an action) into an item you hold. A creature holding the item can cast that spell from it, a total number of times equal to twice your Intelligence modifier before it's used up."
      },
      {
        "name": "Advanced Artifice",
        "level": 14,
        "source": "eberron",
        "description": "You can attune to one additional magic item (five total), and when you roll Initiative with no uses of Flash of Genius left, you regain one use."
      },
      {
        "name": "Magic Item Master",
        "level": 18,
        "source": "eberron",
        "description": "You can attune to up to six magic items at once."
      },
      {
        "name": "Epic Boon",
        "level": 19,
        "source": "eberron",
        "description": "You gain an Epic Boon feat or another feat you qualify for. Boon of Skill or Boon of Spell Recall are fitting choices."
      },
      {
        "name": "Soul of Artifice",
        "level": 20,
        "source": "eberron",
        "description": "You gain a +1 bonus to all saving throws for each magic item you're attuned to. In addition, when you're reduced to 0 Hit Points but not killed outright, you can use a Reaction to end one of your attunements and drop to 1 Hit Point instead."
      }
    ],
    "subclasses": [
      {
        "name": "Alchemist",
        "className": "Artificer",
        "flavor": "A master of potions and reagents who brews restorative and destructive concoctions on the fly.",
        "source": "eberron",
        "features": [
          {
            "name": "Experimental Elixir",
            "level": 3,
            "subclass": "Alchemist",
            "source": "eberron",
            "description": "You gain Alchemist spells (always prepared) and proficiency with Alchemist's Supplies. After a Long Rest you can magically produce Experimental Elixirs (their effect rolled randomly or chosen at higher levels) — a Healing, Swiftness, Resilience, Boldness, Flight, or Transformation elixir a creature can drink as a Bonus Action. You make more elixirs as you gain levels."
          },
          {
            "name": "Alchemical Savant",
            "level": 5,
            "subclass": "Alchemist",
            "source": "eberron",
            "description": "When you cast a spell using Alchemist's Supplies as your focus, you add your Intelligence modifier to one roll of the spell that restores Hit Points or deals Acid, Fire, Necrotic, or Poison damage."
          },
          {
            "name": "Restorative Reagents",
            "level": 9,
            "subclass": "Alchemist",
            "source": "eberron",
            "description": "Whenever a creature drinks one of your Experimental Elixirs it also gains Temporary Hit Points, and you can cast Lesser Restoration without expending a spell slot a limited number of times per Long Rest using your supplies."
          },
          {
            "name": "Chemical Mastery",
            "level": 15,
            "subclass": "Alchemist",
            "source": "eberron",
            "description": "You gain Resistance to Acid and Poison damage and immunity to the Poisoned condition, and you can cast Greater Restoration and Heal without expending spell slots (once each per Long Rest) using your Alchemist's Supplies."
          }
        ]
      },
      {
        "name": "Armorer",
        "className": "Artificer",
        "flavor": "An artificer who lives inside a suit of arcane power armor, reshaping it for defense or infiltration.",
        "source": "eberron",
        "features": [
          {
            "name": "Arcane Armor",
            "level": 3,
            "subclass": "Armorer",
            "source": "eberron",
            "description": "You gain Armorer spells and turn a suit of armor into Arcane Armor you can don or doff quickly; it needs no Strength requirement, incorporates your tools, and can't be removed against your will. You choose an Armor Model — Guardian (a thundering gauntlet melee weapon plus a taunt) or Infiltrator (a ranged Lightning Launcher and stealth boosts) — and can reconfigure it on a rest."
          },
          {
            "name": "Extra Attack",
            "level": 5,
            "subclass": "Armorer",
            "source": "eberron",
            "description": "You can attack twice whenever you take the Attack action on your turn."
          },
          {
            "name": "Armor Modifications",
            "level": 9,
            "subclass": "Armorer",
            "source": "eberron",
            "description": "You can attune to and infuse the pieces of your Arcane Armor (armor, weapon, boots, helmet) as separate items, letting you carry more magical enhancements at once, and you can replicate more items."
          },
          {
            "name": "Perfected Armor",
            "level": 15,
            "subclass": "Armorer",
            "source": "eberron",
            "description": "Your Armor Model gains a potent upgrade: Guardian can pull a distant creature toward you when its melee weapon hits, and Infiltrator's ranged weapon can force a save that reduces speed and imposes a penalty on its next attack."
          }
        ]
      },
      {
        "name": "Artillerist",
        "className": "Artificer",
        "flavor": "A battlefield engineer who conjures an Eldritch Cannon to blast, protect, and control the field.",
        "source": "eberron",
        "features": [
          {
            "name": "Eldritch Cannon",
            "level": 3,
            "subclass": "Artillerist",
            "source": "eberron",
            "description": "You gain Artillerist spells and can magically create an Eldritch Cannon (Flamethrower, Force Ballista, or Protector) using your tools. It's a Small or Tiny object you can command as a Bonus Action to attack or produce its effect, and you can dismiss and rebuild it. You also gain the Arcane Firearm option to boost your spells."
          },
          {
            "name": "Arcane Firearm",
            "level": 5,
            "subclass": "Artillerist",
            "source": "eberron",
            "description": "You can turn a Wand, Staff, or Rod into an Arcane Firearm spellcasting focus; when you cast an Artificer spell through it, you add an extra 1d8 to one of the spell's damage rolls."
          },
          {
            "name": "Explosive Cannon",
            "level": 9,
            "subclass": "Artillerist",
            "source": "eberron",
            "description": "Your Eldritch Cannon deals extra damage, and as an action you can command it to detonate, destroying it in a burst of force damage that all nearby creatures must save against."
          },
          {
            "name": "Fortified Position",
            "level": 15,
            "subclass": "Artillerist",
            "source": "eberron",
            "description": "You and your allies have Half Cover while within 10 feet of your cannon, and you can have two Eldritch Cannons active at once, commanding both with a single Bonus Action."
          }
        ]
      },
      {
        "name": "Battle Smith",
        "className": "Artificer",
        "flavor": "A protector-artificer who fights beside a loyal mechanical Steel Defender and wields arcane weapons with Intelligence.",
        "source": "eberron",
        "features": [
          {
            "name": "Battle Ready",
            "level": 3,
            "subclass": "Battle Smith",
            "source": "eberron",
            "description": "You gain Battle Smith spells and proficiency with Martial weapons; you can use Intelligence instead of Strength or Dexterity for the attack and damage rolls of magic weapons and weapons you're wielding. You also build a Steel Defender — a construct ally that obeys you, shares your proficiency bonus, and acts on your turn (defending allies and making a Force-Empowered Rend attack)."
          },
          {
            "name": "Extra Attack",
            "level": 5,
            "subclass": "Battle Smith",
            "source": "eberron",
            "description": "You can attack twice whenever you take the Attack action on your turn."
          },
          {
            "name": "Arcane Jolt",
            "level": 9,
            "subclass": "Battle Smith",
            "source": "eberron",
            "description": "When you or your Steel Defender hits with a weapon or the Defender's attack, you can either deal extra Force damage or heal a nearby creature. You can do this a number of times per Long Rest equal to your Intelligence modifier."
          },
          {
            "name": "Improved Defender",
            "level": 15,
            "subclass": "Battle Smith",
            "source": "eberron",
            "description": "Your Arcane Jolt damage and healing increase, and your Steel Defender gains a bonus to its AC, adds your Arcane Jolt effect to its Rend, and gains a Reaction to impose Disadvantage on an attack against a creature it protects."
          }
        ]
      }
    ]
  }
];
if (typeof window !== "undefined") window.DND_CLASSES = DND_CLASSES;
