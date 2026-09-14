// GENERATED from ds-sheet-rc-data.js + the DarkSpace sheet SD_SPELLS.
export type DsArchetype = { name:string; hd:string; weapons:string; armor:string; caster:string|null; features:string[]; ranks:Record<string,string[]>|null };
export type DsTrait = { name:string; effect:string };
export type DsPower = { name:string; tier:string; caster:string; range:string; duration:string; damage:string; desc:string };

export const DS_ARCHETYPES: DsArchetype[] = [
  {
    "name": "Soldier",
    "hd": "1d8",
    "weapons": "All weapons",
    "armor": "All armor and deflectors",
    "caster": null,
    "features": [
      "Hauler: Add CON modifier (if positive) to gear slots.",
      "Weapon Specialization: Choose a weapon type; +1 to attack and damage. Add half your level to these rolls.",
      "Grit: Choose STR or DEX; advantage on checks to overcome opposing force."
    ],
    "ranks": {
      "Lawful": [
        "Recruit",
        "Trooper",
        "Sergeant",
        "Lieutenant",
        "Commander"
      ],
      "Chaotic": [
        "Grunt",
        "Gun",
        "Enforcer",
        "Warlord",
        "Butcher"
      ],
      "Neutral": [
        "Fighter",
        "Veteran",
        "Hardcase",
        "Warchief",
        "Legend"
      ]
    }
  },
  {
    "name": "Mystic",
    "hd": "1d6",
    "weapons": "Stun baton, slug rifle, combat knife, shock maul, vibroblade, power staff, breaching hammer",
    "armor": "All armor and deflectors",
    "caster": "WIS",
    "features": [
      "Banish (bonus power, does not count toward power limit).",
      "Power Channeling (WIS). Know 2 tier 1 powers. Add powers per level.",
      "Languages: Ascendant, Void-cant, or Machine-code.",
      "Choose an Allegiance matching your alignment."
    ],
    "ranks": {
      "Lawful": [
        "Acolyte",
        "Adept",
        "Seer",
        "Oracle",
        "Ascendant"
      ],
      "Chaotic": [
        "Initiate",
        "Channeler",
        "Cultist",
        "Void-touched",
        "Herald"
      ],
      "Neutral": [
        "Seeker",
        "Wanderer",
        "Sage",
        "Elder",
        "Enlightened"
      ]
    }
  },
  {
    "name": "Scoundrel",
    "hd": "1d4",
    "weapons": "Stun baton, slug rifle, combat knife, blaster pistol, vibro-shortblade",
    "armor": "Flak weave, reinforced combat weave",
    "caster": null,
    "features": [
      "Ambush: Hit unaware target → extra weapon die damage + half level dice.",
      "Infiltration: Advantage on climbing, sneaking, disguises, traps, locks, pickpocketing."
    ],
    "ranks": {
      "Lawful": [
        "Runner",
        "Fixer",
        "Operator",
        "Handler",
        "Boss"
      ],
      "Chaotic": [
        "Thug",
        "Cutthroat",
        "Ghost",
        "Assassin",
        "Kingpin"
      ],
      "Neutral": [
        "Grifter",
        "Hustler",
        "Rogue",
        "Renegade",
        "Legend"
      ]
    }
  },
  {
    "name": "Engineer",
    "hd": "1d4",
    "weapons": "Combat knife, power staff",
    "armor": "None",
    "caster": "INT",
    "features": [
      "Power Channeling (INT). Know 3 tier 1 powers. Add powers per level.",
      "Reverse-Engineering: Study a datachip 1 day, DC 15 INT check to learn permanently.",
      "Languages: 2 additional common + 2 rare languages."
    ],
    "ranks": {
      "Lawful": [
        "Apprentice",
        "Technician",
        "Engineer",
        "Chief",
        "Architect"
      ],
      "Chaotic": [
        "Hacker",
        "Breaker",
        "Saboteur",
        "Ghost",
        "Zero"
      ],
      "Neutral": [
        "Tinker",
        "Mechanic",
        "Specialist",
        "Savant",
        "Mastermind"
      ]
    }
  },
  {
    "name": "Scout",
    "hd": "1d8",
    "weapons": "Combat knife, blaster rifle, vibroblade, blaster pistol, vibro-shortblade, shock lance, power staff",
    "armor": "Flak weave, combat weave",
    "caster": null,
    "features": [
      "Wayfinder: Advantage on Navigation, Tracking, Survival, Stealth, and Xeno-handling checks.",
      "Field Medicine (INT check): Prepare a stim. Stims expire in 3 rounds.",
      "  Medgel (DC 11): Heals 1 HP.",
      "  Combat Stim (DC 12): You can't be surprised for 10 rounds.",
      "  Target Lock (DC 13): ADV on attacks and damage against one creature type you choose for 1d6 rounds.",
      "  Antitox (DC 14): Ends one poison or disease.",
      "  Medkit (DC 15): Restores HP as a healing stimpack (Potion of Healing equivalent)."
    ],
    "ranks": {
      "Lawful": [
        "Tracker",
        "Pathfinder",
        "Ranger",
        "Warden",
        "Sentinel"
      ],
      "Chaotic": [
        "Stalker",
        "Hunter",
        "Poacher",
        "Killer",
        "Reaper"
      ],
      "Neutral": [
        "Wayfarer",
        "Rover",
        "Outlander",
        "Nomad",
        "Ghost"
      ]
    }
  },
  {
    "name": "Diplomat",
    "hd": "1d6",
    "weapons": "Slug rifle, combat knife, shock maul, blaster pistol, vibro-shortblade, shock lance, power staff",
    "armor": "Flak weave, combat weave, deflectors",
    "caster": null,
    "features": [
      "Silver Tongue: Advantage on oration, performing arts, lore, and diplomacy.",
      "Tech Dabbler: Activate datachips/gadgets using CHA. Critical fail = tech mishap.",
      "Presence (DC 12 CHA): Inspire (give luck token) or Fascinate (transfix targets ≤ lvl 4).",
      "Networker: +1d6 to learning rolls. Groups with Diplomats +1d6 to carousing.",
      "Languages: 4 additional common + 1 rare language."
    ],
    "ranks": {
      "Lawful": [
        "Attaché",
        "Liaison",
        "Diplomat",
        "Ambassador",
        "Envoy"
      ],
      "Chaotic": [
        "Grifter",
        "Charlatan",
        "Silvertongue",
        "Manipulator",
        "Kingmaker"
      ],
      "Neutral": [
        "Talker",
        "Broker",
        "Mediator",
        "Speaker",
        "Voice"
      ]
    }
  }
];

export const DS_TRAITS: DsTrait[] = [
  {
    "name": "Ambitious",
    "effect": "+1 bonus talent roll at 1st level."
  },
  {
    "name": "Keen Optics",
    "effect": "+1 to ranged attack rolls OR +1 to power checks."
  },
  {
    "name": "Reinforced",
    "effect": "Start with +2 HP. Roll hit points with advantage."
  },
  {
    "name": "Cloaked",
    "effect": "Once per day, become invisible for 3 rounds."
  },
  {
    "name": "Augmented",
    "effect": "+1 to attack and damage with melee weapons."
  },
  {
    "name": "Motion Sense",
    "effect": "You cannot be surprised."
  },
  {
    "name": "Armored Hide",
    "effect": "+1 AC when unarmored."
  },
  {
    "name": "Longsight",
    "effect": "+1 to ranged attack and damage."
  },
  {
    "name": "Natural Weapon",
    "effect": "You have a natural weapon dealing 1d6 damage (you are proficient with it)."
  },
  {
    "name": "Flight",
    "effect": "You can fly and/or walk."
  },
  {
    "name": "Sneaky",
    "effect": "Advantage on deception checks."
  },
  {
    "name": "Amphibious",
    "effect": "You breathe water and air; swim at full speed."
  },
  {
    "name": "Tracking Sense",
    "effect": "1/session, mark a quarry; advantage to track it."
  },
  {
    "name": "Heat Adapted",
    "effect": "Survive hot environments; take half fire/heat damage."
  },
  {
    "name": "Cold Adapted",
    "effect": "Survive cold environments; take half ice/cold damage."
  },
  {
    "name": "Rad-Shielded",
    "effect": "Survive radioactive environments; take half radiation/electric damage."
  },
  {
    "name": "Filtration",
    "effect": "Survive toxic environments; take half poison damage."
  },
  {
    "name": "Technical Knack",
    "effect": "+1 to checks working with technology and machines."
  },
  {
    "name": "Beast Affinity",
    "effect": "+1 to checks working with creatures and xenofauna."
  },
  {
    "name": "Natural Climber",
    "effect": "Climb at full speed; reduce the DC of climbing checks by one category."
  },
  {
    "name": "Covert Comms",
    "effect": "You can communicate secretly with others of your own kind."
  },
  {
    "name": "Extra Arms",
    "effect": "One extra non-attack action per turn; +2 gear slots."
  },
  {
    "name": "Extra Legs",
    "effect": "Move up to double near in addition to your action; +1 category on checks to resist being tripped."
  },
  {
    "name": "Mechanical",
    "effect": "Synthetic body: you need no food, drink, or air; you recharge on a rest."
  },
  {
    "name": "Life Support",
    "effect": "Sealed suit: no food, drink, or air needed while powered; you still rest to recharge."
  }
];

export const DS_BACKGROUNDS: string[] = ["Station Rat","Wanted","Cult Initiate","Syndicate","Exiled","Orphaned","Engineer Trainee","Tech","Medic","Frontier-born","Merc","Void Sailor","Devotee","Soldier","Scout","Recon","Broadcaster","Scholar","Corporate","Field Surgeon"];

export const DS_POWERS: DsPower[] = [
  {
    "name": "Mend",
    "tier": "1",
    "caster": "Mystic",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Touch a creature to restore 1 + half your level (round down) d6 HP."
  },
  {
    "name": "Psi-Edge",
    "tier": "1",
    "caster": "Mystic",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "One touched weapon deals +1d6 damage (1d8 vs reanimated)."
  },
  {
    "name": "Floodlight",
    "tier": "1",
    "caster": "Both",
    "range": "Close",
    "duration": "1 hour",
    "damage": "",
    "desc": "One object glows with bright cold light illuminating near range."
  },
  {
    "name": "Deflector Field",
    "tier": "1",
    "caster": "Both",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "Chaotic creatures have disadvantage on attacks vs target. Target has ADV on saves vs chaotic effects."
  },
  {
    "name": "Force of Will",
    "tier": "1",
    "caster": "Mystic",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "+2 bonus to AC for duration."
  },
  {
    "name": "Banish",
    "tier": "1",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Reanimated and synthetic hostiles in near flee (CHA vs your power check). Fail by 10+ and ≤ your level = destroyed."
  },
  {
    "name": "Precognition",
    "tier": "2",
    "caster": "Mystic",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask if an action in the next hour will bring good or ill. Answer is weal, woe, weal and woe, or nothing."
  },
  {
    "name": "Embolden",
    "tier": "2",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Up to 3 allies in near gain +1 to attacks and saves."
  },
  {
    "name": "Sensory Overload",
    "tier": "2",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "DC 13 CON or one target is blinded or deafened (your choice)."
  },
  {
    "name": "Purge Edge",
    "tier": "2",
    "caster": "Mystic",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "1d4",
    "desc": "Touched weapon deals +1d4 damage (+1d6 vs reanimated) for duration."
  },
  {
    "name": "Psi-Strike",
    "tier": "2",
    "caster": "Mystic",
    "range": "Close",
    "duration": "Instant",
    "damage": "2d6",
    "desc": "Your next weapon attack deals +2d6 psychic damage."
  },
  {
    "name": "Truth Field",
    "tier": "2",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Creatures in near-sized area cannot lie. DC 13 CHA to resist."
  },
  {
    "name": "Compel",
    "tier": "3",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "DC 14 WIS or one target follows a one-word command each round."
  },
  {
    "name": "Dispatch",
    "tier": "3",
    "caster": "Mystic",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Permanently destroy one reanimated creature you touch. DC 14 CON to resist."
  },
  {
    "name": "Mass Mend",
    "tier": "3",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "All allies in near regain 2d6 HP."
  },
  {
    "name": "Psychic Burst",
    "tier": "3",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Instant",
    "damage": "4d6",
    "desc": "All reanimated and chaotic creatures in near take 4d6 psychic damage. DC 14 CON half."
  },
  {
    "name": "Proximity Sensor",
    "tier": "1",
    "caster": "Engineer",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Ward a door or threshold. You are mentally alerted when a creature passes through."
  },
  {
    "name": "Flame Projector",
    "tier": "1",
    "caster": "Engineer",
    "range": "Close",
    "duration": "Instant",
    "damage": "2d6",
    "desc": "A jet of flame roars out to a close area. DC 11 DEX half."
  },
  {
    "name": "Neural Override",
    "tier": "1",
    "caster": "Engineer",
    "range": "Near",
    "duration": "1d8 days",
    "damage": "",
    "desc": "Override one humanoid of level 2 or less in near. Regards you as a trusted friend."
  },
  {
    "name": "Diagnostic Scan",
    "tier": "1",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Sense powered tech and active powers within near. Focus 2 rounds to learn general properties."
  },
  {
    "name": "Mag-Seal",
    "tier": "1",
    "caster": "Engineer",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Magnetically hold a portal closed for duration."
  },
  {
    "name": "Nano-Weave",
    "tier": "1",
    "caster": "Engineer",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Your AC becomes 14 (18 on critical success)."
  },
  {
    "name": "Micro-Missile",
    "tier": "1",
    "caster": "Engineer",
    "range": "Far",
    "duration": "Instant",
    "damage": "1d4",
    "desc": "ADV on cast check. A guided micro-missile deals 1d4 damage to one target."
  },
  {
    "name": "Sedation Field",
    "tier": "1",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Creatures level 2 or less in a near cube fall unconscious."
  },
  {
    "name": "Corrosive Bolt",
    "tier": "2",
    "caster": "Engineer",
    "range": "Far",
    "duration": "Instant",
    "damage": "4d4",
    "desc": "Bolt of acid deals 4d4 damage, then 2d4 next round."
  },
  {
    "name": "Morphware",
    "tier": "2",
    "caster": "Engineer",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Assume a different humanoid form for the duration."
  },
  {
    "name": "Mind Probe",
    "tier": "2",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Learn the surface thoughts of one creature you can see each round."
  },
  {
    "name": "Bypass",
    "tier": "2",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Open one electronically locked door, chest, or portal."
  },
  {
    "name": "Repulsors",
    "tier": "2",
    "caster": "Engineer",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Rise or descend up to a near distance per round. You hover if not moving."
  },
  {
    "name": "Holo-Decoys",
    "tier": "2",
    "caster": "Engineer",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "3 holographic duplicates. Attackers have a 1-in-4 chance of hitting the real you."
  },
  {
    "name": "Blink Drive",
    "tier": "2",
    "caster": "Engineer",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Teleport a near distance to a visible location."
  },
  {
    "name": "Dampening Field",
    "tier": "2",
    "caster": "Engineer",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "A field of silence in a near cube. No powers can be cast within."
  },
  {
    "name": "Foam Sprayer",
    "tier": "2",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Sticky foam fills a near cube. DC 12 STR to move through."
  },
  {
    "name": "Plasma Charge",
    "tier": "3",
    "caster": "Engineer",
    "range": "Far",
    "duration": "Instant",
    "damage": "6d6",
    "desc": "Explosion in a near cube at far. 6d6 damage. DC 14 DEX half."
  },
  {
    "name": "Grav-Harness",
    "tier": "3",
    "caster": "Engineer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature can fly at double near speed for duration."
  },
  {
    "name": "Arc Lance",
    "tier": "3",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Instant",
    "damage": "6d6",
    "desc": "Bolt of lightning strikes near range in a line. 6d6 damage. DC 14 DEX half."
  },
  {
    "name": "Containment Field",
    "tier": "3",
    "caster": "Engineer",
    "range": "Close",
    "duration": "1 hour",
    "damage": "",
    "desc": "Ward an area against chaotic or lawful creatures (choose). They cannot enter or affect those within."
  },
  {
    "name": "Genesplice",
    "tier": "3",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Transform one creature into a beast you choose. Target uses beast stats."
  },
  {
    "name": "Ablative Plating",
    "tier": "3",
    "caster": "Engineer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "Target gains +4 AC and resistance to non-powered weapon damage."
  },
  {
    "name": "Reanimate Drone",
    "tier": "4",
    "caster": "Engineer",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Reactivate a humanoid corpse as a husk or drone under your control."
  },
  {
    "name": "Communion",
    "tier": "4",
    "caster": "Mystic",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask your Allegiance 3 yes/no questions. Truthful answers."
  },
  {
    "name": "Control Fluid",
    "tier": "4",
    "caster": "Mystic",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Control a body of liquid up to 100 feet wide. Raise, lower, redirect."
  },
  {
    "name": "Orbital Strike",
    "tier": "4",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Instant",
    "damage": "8d6",
    "desc": "A column of searing fire strikes a near-sized area. 8d6 damage. DC 15 DEX half."
  },
  {
    "name": "Grav-Lift",
    "tier": "4",
    "caster": "Engineer",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Lift a creature or object up to 1,000 lbs and move it a near distance."
  },
  {
    "name": "Teleporter",
    "tier": "4",
    "caster": "Engineer",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Teleport yourself and up to 4 willing targets up to 100 miles."
  },
  {
    "name": "Mind Wrath",
    "tier": "5",
    "caster": "Mystic",
    "range": "Near",
    "duration": "Instant",
    "damage": "10d6",
    "desc": "Unleash a psychic shockwave. All enemies in near take 10d6 damage. DC 18 DEX half."
  },
  {
    "name": "Domination",
    "tier": "5",
    "caster": "Mystic",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "DC 18 WIS or control one creature you can see. They obey commands."
  },
  {
    "name": "Full Restore",
    "tier": "5",
    "caster": "Mystic",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One touched creature is restored to full HP and cured of all conditions."
  },
  {
    "name": "Assemble Warframe",
    "tier": "5",
    "caster": "Engineer",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Assemble a powerful combat drone to serve you for 1 day."
  },
  {
    "name": "Stasis Lock",
    "tier": "5",
    "caster": "Engineer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Paralyze one creature you can see. DC 18 CON each round to resist."
  }
];
