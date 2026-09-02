// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
const DND_SPECIES = [
  {
    "name": "Human",
    "size": [
      "Medium",
      "Small"
    ],
    "speed": 30,
    "darkvision": 0,
    "creatureType": "Humanoid",
    "flavor": "Ambitious, adaptable, and found everywhere — humans make up for a lack of innate magic with drive and versatility.",
    "source": "srd",
    "traits": [
      {
        "name": "Resourceful",
        "description": "You gain Heroic Inspiration whenever you finish a Long Rest."
      },
      {
        "name": "Skillful",
        "description": "You gain proficiency in one skill of your choice."
      },
      {
        "name": "Versatile",
        "description": "You gain an Origin feat of your choice (Skilled is a common pick)."
      }
    ]
  },
  {
    "name": "Elf",
    "size": "Medium",
    "speed": 30,
    "darkvision": 60,
    "creatureType": "Humanoid",
    "flavor": "Graceful and long-lived, elves carry a spark of the Feywild — reflected in their chosen lineage.",
    "source": "srd",
    "traits": [
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light (shades of gray)."
      },
      {
        "name": "Fey Ancestry",
        "description": "You have Advantage on saving throws to avoid or end the Charmed condition."
      },
      {
        "name": "Keen Senses",
        "description": "You gain proficiency in one of Insight, Perception, or Survival."
      },
      {
        "name": "Trance",
        "description": "You don't need to sleep and can't be put to sleep by magic; you finish a Long Rest in 4 hours of light meditative activity."
      },
      {
        "name": "Elven Lineage",
        "description": "Choose a lineage below at level 1. It grants a cantrip now and additional always-prepared spells at levels 3 and 5, each castable once per Long Rest without a slot (or with slots if you can cast). Choose the spellcasting ability (Int, Wis, or Cha) when you select the lineage."
      }
    ],
    "lineages": [
      {
        "name": "Drow",
        "traits": [
          {
            "name": "Superior Darkvision",
            "description": "Your Darkvision range increases to 120 feet."
          },
          {
            "name": "Drow Magic",
            "description": "You know the Dancing Lights cantrip. At level 3 you gain Faerie Fire; at level 5, Darkness."
          }
        ]
      },
      {
        "name": "High Elf",
        "traits": [
          {
            "name": "High Elven Magic",
            "description": "You know the Prestidigitation cantrip (you can swap it whenever you finish a Long Rest). At level 3 you gain Detect Magic; at level 5, Misty Step."
          }
        ]
      },
      {
        "name": "Wood Elf",
        "traits": [
          {
            "name": "Fleet of Foot",
            "description": "Your Speed increases to 35 feet."
          },
          {
            "name": "Wood Elf Magic",
            "description": "You know the Druidcraft cantrip. At level 3 you gain Longstrider; at level 5, Pass without Trace."
          }
        ]
      }
    ]
  },
  {
    "name": "Dwarf",
    "size": "Medium",
    "speed": 30,
    "darkvision": 120,
    "creatureType": "Humanoid",
    "flavor": "Stout, enduring folk of stone and forge, famed for resilience and a deep connection to the earth.",
    "source": "srd",
    "traits": [
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 120 feet as if it were bright light, and in darkness as if it were dim light."
      },
      {
        "name": "Dwarven Resilience",
        "description": "You have Resistance to Poison damage and Advantage on saving throws to avoid or end the Poisoned condition."
      },
      {
        "name": "Dwarven Toughness",
        "description": "Your Hit Point maximum increases by 1, and by 1 again each time you gain a level."
      },
      {
        "name": "Stonecunning",
        "description": "As a Bonus Action you gain Tremorsense with a range of 60 feet (through stone) for 10 minutes, a number of times per Long Rest equal to your proficiency bonus."
      }
    ]
  },
  {
    "name": "Halfling",
    "size": "Small",
    "speed": 30,
    "darkvision": 0,
    "creatureType": "Humanoid",
    "flavor": "Cheerful, brave, and improbably lucky small folk who slip through danger with a smile.",
    "source": "srd",
    "traits": [
      {
        "name": "Brave",
        "description": "You have Advantage on saving throws to avoid or end the Frightened condition."
      },
      {
        "name": "Halfling Nimbleness",
        "description": "You can move through the space of any creature that is a size larger than you, though it isn't Difficult Terrain for you."
      },
      {
        "name": "Luck",
        "description": "When you roll a 1 on the d20 of a D20 Test (attack roll, ability check, or save), you can reroll the die and must use the new roll."
      },
      {
        "name": "Naturally Stealthy",
        "description": "You can take the Hide action even when obscured only by a creature that is at least one size larger than you."
      }
    ]
  },
  {
    "name": "Dragonborn",
    "size": "Medium",
    "speed": 30,
    "darkvision": 60,
    "creatureType": "Humanoid",
    "flavor": "Proud, draconic humanoids who carry an elemental breath and, in time, the wings of their ancestors.",
    "source": "srd",
    "traits": [
      {
        "name": "Draconic Ancestry",
        "description": "Choose a kind of dragon from the Draconic Ancestry options; this sets your Breath Weapon's damage type and your Damage Resistance (e.g. Red = Fire, Blue = Lightning, White = Cold, and so on)."
      },
      {
        "name": "Breath Weapon",
        "description": "When you take the Attack action you can replace one attack with an exhalation in a 15-foot Cone or 30-foot Line. Each creature there makes a Dexterity save (DC 8 + Con modifier + proficiency bonus) for 1d10 damage of your ancestry's type, half on a success. Damage increases at levels 5/11/17. Uses equal your proficiency bonus per Long Rest."
      },
      {
        "name": "Damage Resistance",
        "description": "You have Resistance to the damage type determined by your Draconic Ancestry."
      },
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light."
      },
      {
        "name": "Draconic Flight",
        "description": "Starting at level 5, as a Bonus Action you can sprout spectral wings for 10 minutes, gaining a Fly Speed equal to your Speed. Usable once per Long Rest."
      }
    ]
  },
  {
    "name": "Gnome",
    "size": "Small",
    "speed": 30,
    "darkvision": 60,
    "creatureType": "Humanoid",
    "flavor": "Small, endlessly curious tinkerers and illusionists with a mind resistant to magical meddling.",
    "source": "srd",
    "traits": [
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light."
      },
      {
        "name": "Gnomish Cunning",
        "description": "You have Advantage on Intelligence, Wisdom, and Charisma saving throws."
      },
      {
        "name": "Gnomish Lineage",
        "description": "Choose a lineage below at level 1. Choose the spellcasting ability (Int, Wis, or Cha) for its spells."
      }
    ],
    "lineages": [
      {
        "name": "Forest Gnome",
        "traits": [
          {
            "name": "Forest Cunning",
            "description": "You know the Minor Illusion cantrip, and you always have the Speak with Animals spell prepared, castable without a slot a number of times per Long Rest equal to your proficiency bonus."
          }
        ]
      },
      {
        "name": "Rock Gnome",
        "traits": [
          {
            "name": "Artificer's Lore",
            "description": "You know the Mending and Prestidigitation cantrips."
          },
          {
            "name": "Tinker",
            "description": "Using Tinker's Tools over a short time you can build a Tiny clockwork device (a toy, lighter, or music box) that operates for a time; you can maintain up to three at once."
          }
        ]
      }
    ]
  },
  {
    "name": "Orc",
    "size": "Medium",
    "speed": 30,
    "darkvision": 120,
    "creatureType": "Humanoid",
    "flavor": "Powerful, tireless warriors gifted with the endurance to keep fighting long past when others would fall.",
    "source": "srd",
    "traits": [
      {
        "name": "Adrenaline Rush",
        "description": "You can take the Dash action as a Bonus Action, and when you do you gain Temporary Hit Points equal to your proficiency bonus. Usable a number of times per Short or Long Rest equal to your proficiency bonus."
      },
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 120 feet as if it were bright light, and in darkness as if it were dim light."
      },
      {
        "name": "Relentless Endurance",
        "description": "When you're reduced to 0 Hit Points but not killed outright, you can drop to 1 Hit Point instead. Once per Long Rest."
      }
    ]
  },
  {
    "name": "Goliath",
    "size": "Medium",
    "speed": 35,
    "darkvision": 0,
    "creatureType": "Humanoid",
    "flavor": "Towering descendants of giants, each carrying a supernatural gift from a giant bloodline.",
    "source": "srd",
    "traits": [
      {
        "name": "Giant Ancestry",
        "description": "Choose one supernatural boon from a giant lineage — Cloud's Jaunt (Bonus Action teleport 30 ft), Fire's Burn (extra Fire damage on a hit), Frost's Chill (extra Cold damage + reduce target's Speed), Hill's Tumble (knock a creature Prone on a hit), Stone's Endurance (Reaction to reduce damage), or Storm's Thunder (Reaction Thunder damage when hit). Uses equal your proficiency bonus per Long Rest."
      },
      {
        "name": "Large Form",
        "description": "Starting at level 5, as a Bonus Action you can become Large for 10 minutes (if you have room): your reach increases by 5 feet, you gain Advantage on Strength checks, and your Speed increases by 10 feet. Once per Long Rest."
      },
      {
        "name": "Powerful Build",
        "description": "You have Advantage on saving throws against being Grappled, and you count as one size larger for carrying capacity and for dragging, lifting, and pushing."
      }
    ]
  },
  {
    "name": "Tiefling",
    "size": [
      "Medium",
      "Small"
    ],
    "speed": 30,
    "darkvision": 60,
    "creatureType": "Humanoid",
    "flavor": "Heirs to a fiendish legacy — Abyssal, Chthonic, or Infernal — that grants resistances and dark magic.",
    "source": "srd",
    "traits": [
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light. (Increases to 120 feet if your legacy grants it via a feat later.)"
      },
      {
        "name": "Otherworldly Presence",
        "description": "You know the Thaumaturgy cantrip, cast with the spellcasting ability you choose for your Fiendish Legacy."
      },
      {
        "name": "Fiendish Legacy",
        "description": "Choose a legacy below at level 1. It grants a damage resistance and a cantrip now, plus always-prepared spells at levels 3 and 5, each castable once per Long Rest without a slot. Choose the spellcasting ability (Int, Wis, or Cha) when you select the legacy."
      }
    ],
    "lineages": [
      {
        "name": "Abyssal",
        "traits": [
          {
            "name": "Abyssal Legacy",
            "description": "You have Resistance to Poison damage. You know the Poison Spray cantrip; at level 3 you gain Ray of Sickness; at level 5, Hold Person."
          }
        ]
      },
      {
        "name": "Chthonic",
        "traits": [
          {
            "name": "Chthonic Legacy",
            "description": "You have Resistance to Necrotic damage. You know the Chill Touch cantrip; at level 3 you gain False Life; at level 5, Ray of Enfeeblement."
          }
        ]
      },
      {
        "name": "Infernal",
        "traits": [
          {
            "name": "Infernal Legacy",
            "description": "You have Resistance to Fire damage. You know the Fire Bolt cantrip; at level 3 you gain Hellish Rebuke; at level 5, Darkness."
          }
        ]
      }
    ]
  },
  {
    "name": "Aasimar",
    "size": [
      "Medium",
      "Small"
    ],
    "speed": 30,
    "darkvision": 60,
    "creatureType": "Humanoid",
    "flavor": "Mortals touched by the light of the Upper Planes, carrying celestial power that can blaze forth in moments of need.",
    "source": "phb",
    "traits": [
      {
        "name": "Celestial Resistance",
        "description": "You have Resistance to Necrotic damage and Radiant damage."
      },
      {
        "name": "Darkvision",
        "description": "You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light."
      },
      {
        "name": "Healing Hands",
        "description": "As a Magic action you touch a creature and roll a number of d4s equal to your proficiency bonus, restoring that many Hit Points. Once per Long Rest."
      },
      {
        "name": "Light Bearer",
        "description": "You know the Light cantrip, cast using Charisma."
      },
      {
        "name": "Celestial Revelation",
        "description": "Starting at level 3, as a Bonus Action you can transform for 1 minute, once per Long Rest. Choose one form when you gain this trait: Heavenly Wings (a Fly Speed and extra radiant damage), Inner Radiance (emit light, deal radiant damage to nearby foes), or Necrotic Shroud (frighten nearby foes and deal extra necrotic damage). While transformed, once per turn you add extra damage of the form's type to one attack or harmful spell."
      }
    ]
  }
];
if (typeof window !== "undefined") window.DND_SPECIES = DND_SPECIES;
