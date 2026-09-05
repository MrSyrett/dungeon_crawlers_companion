// GENERATED FILE - do not edit by hand.
// Source: data/d62e/parts/*.json - regenerate with: node scripts/build-d62e-data.mjs

const D62E_TEMPLATES = [
  {
    "name": "Athlete",
    "genre": "core",
    "attributes": {
      "Agility": 15,
      "Brawn": 12,
      "Knowledge": 3,
      "Perception": 6
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 10, Parry 25. Recommended skills: Acrobatics, Athletics, Stamina. Add 7D of skills to complete the character.",
    "page": 138
  },
  {
    "name": "Brawler",
    "genre": "core",
    "attributes": {
      "Agility": 9,
      "Brawn": 15,
      "Knowledge": 3,
      "Perception": 9
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 15, Parry 15. Recommended skills: Athletics, Melee, Stamina. Add 7D of skills to complete the character.",
    "page": 138
  },
  {
    "name": "Doctor",
    "genre": "core",
    "attributes": {
      "Agility": 9,
      "Brawn": 9,
      "Knowledge": 12,
      "Perception": 6
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 10, Parry 15. Recommended skills: Medicine, Sciences, Scholar. Add 7D of skills to complete the character.",
    "page": 138
  },
  {
    "name": "Driver",
    "genre": "core",
    "attributes": {
      "Agility": 9,
      "Brawn": 6,
      "Knowledge": 9,
      "Perception": 12
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 20, Parry 15. Recommended skills: Driving, Sciences, Stamina. Add 7D of skills to complete the character.",
    "page": 139
  },
  {
    "name": "Investigator",
    "genre": "core",
    "attributes": {
      "Agility": 6,
      "Brawn": 6,
      "Knowledge": 9,
      "Perception": 15
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 25, Parry 10. Recommended skills: Investigation, Languages, Stealth. Add 7D of skills to complete the character.",
    "page": 139
  },
  {
    "name": "Jack of all Trades",
    "genre": "core",
    "attributes": {
      "Agility": 9,
      "Brawn": 9,
      "Knowledge": 9,
      "Perception": 9
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 15, Parry 15. Recommended skills: Any and all. Add 7D of skills to complete the character.",
    "page": 139
  },
  {
    "name": "Scholar",
    "genre": "core",
    "attributes": {
      "Agility": 9,
      "Brawn": 6,
      "Knowledge": 15,
      "Perception": 6
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 20, Parry 15. Recommended skills: Languages, Scholar, Sciences. Add 7D of skills to complete the character.",
    "page": 139
  },
  {
    "name": "Thief",
    "genre": "core",
    "attributes": {
      "Agility": 12,
      "Brawn": 6,
      "Knowledge": 6,
      "Perception": 12
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 20, Parry 20. Recommended skills: Acrobatics, Sleight of Hand, Stealth. Add 7D of skills to complete the character.",
    "page": 139
  },
  {
    "name": "Veteran",
    "genre": "core",
    "attributes": {
      "Agility": 12,
      "Brawn": 12,
      "Knowledge": 6,
      "Perception": 6
    },
    "heroPoints": 1,
    "description": "Defenses: Dodge 20, Parry 10. Recommended skills: Athletics, Melee, Shooting. Add 7D of skills to complete the character.",
    "page": 139
  },
  {
    "name": "Occultist",
    "genre": "fantasy",
    "archetype": "Scholar of Magic",
    "attributes": {
      "Agility": 6,
      "Brawn": 6,
      "Charm": 12,
      "Knowledge": 15,
      "Magic": 3,
      "Mysticism": 12,
      "Perception": 9
    },
    "talents": [
      "Recommended Skills: Arcane World, Esoterica, Identify Magic, Scholar"
    ],
    "description": "One who studies magic in the world around them (much like a theoretical scientist), rather than one who puts it to use as a tool. Defenses: Dodge 15, Parry 10.",
    "page": 168
  },
  {
    "name": "Priest",
    "genre": "fantasy",
    "archetype": "Divine Caster",
    "attributes": {
      "Agility": 6,
      "Brawn": 6,
      "Charm": 9,
      "Knowledge": 12,
      "Magic": 3,
      "Mysticism": 12,
      "Perception": 6
    },
    "talents": [
      "Recommended Skills: Esoterica, Prayer, Scholar, Ritual"
    ],
    "description": "A servant of the divine, channeling faith and ritual. Defenses: Dodge 10, Parry 10.",
    "page": 169
  },
  {
    "name": "Warrior",
    "genre": "fantasy",
    "archetype": "Warrior",
    "attributes": {
      "Agility": 12,
      "Brawn": 15,
      "Charm": 9,
      "Knowledge": 9,
      "Magic": 3,
      "Mysticism": 3,
      "Perception": 12
    },
    "talents": [
      "Recommended Skills: Athletics, Melee, Shooting, Stamina, Throwing"
    ],
    "description": "A martial powerhouse focused on physical combat and endurance. Defenses: Dodge 20, Parry 20.",
    "page": 170
  },
  {
    "name": "Wizard",
    "genre": "fantasy",
    "archetype": "Arcane Caster",
    "attributes": {
      "Agility": 3,
      "Brawn": 6,
      "Charm": 9,
      "Knowledge": 15,
      "Magic": 15,
      "Mysticism": 6,
      "Perception": 9
    },
    "talents": [
      "Recommended Skills: Arcane World, Identify Magic, Spell School (must spend 1D from assigned skill dice and select at least one specialization for Spell School)"
    ],
    "description": "One who puts magic to use as a tool (much like an engineer uses science). Defenses: Dodge 15, Parry 5.",
    "page": 171
  },
  {
    "name": "Engineer",
    "genre": "scifi",
    "archetype": "Technician",
    "attributes": {
      "Agility": 9,
      "Brawn": 6,
      "Charm": 6,
      "Knowledge": 12,
      "Mechanical": 15,
      "Perception": 9,
      "Technical": 6
    },
    "description": "A starship and systems specialist who keeps everything running. Dodge 15, Parry 15. Recommended skills: Communications, Navigation, Piloting, Use/Repair Mechanical.",
    "page": 200
  },
  {
    "name": "Gunslinger",
    "genre": "scifi",
    "archetype": "Fighter",
    "attributes": {
      "Agility": 15,
      "Brawn": 12,
      "Charm": 9,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 9,
      "Technical": 6
    },
    "description": "A quick-drawing frontier shooter. Dodge 15, Parry 25. Recommended skills: Intimidation, Shooting, Sleight of Hand, Stealth.",
    "page": 201
  },
  {
    "name": "Hacker",
    "genre": "scifi",
    "archetype": "Technician",
    "attributes": {
      "Agility": 9,
      "Brawn": 6,
      "Charm": 6,
      "Knowledge": 15,
      "Mechanical": 3,
      "Perception": 9,
      "Technical": 15
    },
    "description": "A cybernetic infiltrator who breaks into systems. Dodge 15, Parry 15. Recommended skills: Computers, Sciences, Use/Repair Technical, Upgrade.",
    "page": 201
  },
  {
    "name": "Medic",
    "genre": "scifi",
    "archetype": "Support",
    "attributes": {
      "Agility": 6,
      "Brawn": 6,
      "Charm": 12,
      "Knowledge": 15,
      "Mechanical": 9,
      "Perception": 6,
      "Technical": 9
    },
    "description": "A field healer and doctor. Dodge 10, Parry 10. Recommended skills: Medicine, Sciences, Use/Repair Mechanical, Use/Repair Technical.",
    "page": 202
  },
  {
    "name": "Blaster",
    "genre": "superhero",
    "archetype": "Ranged Striker",
    "attributes": {
      "Agility": 15,
      "Brawn": 6,
      "Charm": 9,
      "Knowledge": 6,
      "Perception": 9
    },
    "skills": [
      {
        "name": "Acrobatics"
      },
      {
        "name": "Flying"
      },
      {
        "name": "Persuasion"
      },
      {
        "name": "Shooting"
      }
    ],
    "powers": [
      "Energy Ranged Weapon (3)",
      "Infravision (1 rank)",
      "Teleportation (2 ranks)"
    ],
    "heroPoints": 3,
    "description": "An agile ranged combatant who blasts foes with energy and blinks about the battlefield. Dodge 15, Parry 25. Skills listed are recommended.",
    "page": 238
  },
  {
    "name": "Bruiser",
    "genre": "superhero",
    "archetype": "Durable Melee Fighter",
    "attributes": {
      "Agility": 12,
      "Brawn": 12,
      "Charm": 6,
      "Knowledge": 6,
      "Perception": 9
    },
    "skills": [
      {
        "name": "Medicine"
      },
      {
        "name": "Melee"
      },
      {
        "name": "Stamina"
      },
      {
        "name": "Stealth"
      }
    ],
    "powers": [
      "Accelerated Healing (4)",
      "Armor Piercing Attack (1 rank)",
      "Attack Resistance - Energy Attacks (1)",
      "Extra Sense - Undersea Sonar (2 ranks)"
    ],
    "heroPoints": 3,
    "description": "A tough, self-healing brawler resistant to energy attacks and sensitive to undersea sonar. Dodge 15, Parry 20. Skills listed are recommended.",
    "page": 238
  },
  {
    "name": "Paragon",
    "genre": "superhero",
    "archetype": "All-Rounder",
    "attributes": {
      "Agility": 12,
      "Brawn": 12,
      "Charm": 9,
      "Knowledge": 6,
      "Perception": 6
    },
    "skills": [
      {
        "name": "Acrobatics"
      },
      {
        "name": "Flying"
      },
      {
        "name": "Melee"
      },
      {
        "name": "Persuasion"
      }
    ],
    "powers": [
      "Flight (1 rank)",
      "Natural Armor (2 ranks)",
      "Natural Hand-to-Hand Weapon (2)",
      "Super-Speed (1 rank)"
    ],
    "heroPoints": 3,
    "description": "A classic flying paragon with armored skin, natural weapons, and enhanced speed. Dodge 10, Parry 20. Skills listed are recommended.",
    "page": 239
  },
  {
    "name": "Tank",
    "genre": "superhero",
    "archetype": "Bruiser Powerhouse",
    "attributes": {
      "Agility": 9,
      "Brawn": 15,
      "Charm": 6,
      "Knowledge": 6,
      "Perception": 9
    },
    "skills": [
      {
        "name": "Melee"
      },
      {
        "name": "Intimidation"
      },
      {
        "name": "Stamina"
      },
      {
        "name": "Willpower"
      }
    ],
    "powers": [
      "Attack Resistance - Energy Attacks (2)",
      "Extra Body Part - Trunk (0)",
      "Natural Armor (3 ranks)",
      "Natural Hand-to-Hand Weapon - Tusks (2)"
    ],
    "heroPoints": 3,
    "description": "A massive, armored powerhouse with a prehensile trunk and goring tusks, resistant to energy attacks. Dodge 15, Parry 15. Skills listed are recommended.",
    "page": 239
  }
];
