// GENERATED FILE - do not edit by hand.
// Source: public/tools-data/sd-darkspace.js - regenerate with: node scripts/build-darkspace-data.mjs

import type {
  DarkSpaceData, DsSpecies, DsTechSpecies, DsArchetype, DsBackground, DsMotivation, DsTriad, DsCorruption, DsSpacersKit, DsGearItem, DsArmor, DsWeapon, DsShip, DsAdvancedTech, DsQuickRule,
} from "./darkspace-types";

export const DS_TERMS: Record<string, string> = {
  "ancestry": "Species",
  "ancestries": "Species",
  "class": "Archetype",
  "classes": "Archetypes",
  "background": "Background",
  "alignment": "Motivation",
  "deity": "Motivation",
  "title": "Rank",
  "spell": "Triad Power",
  "spells": "Triad Powers",
  "character": "Spacer",
  "currency": "cr",
  "gold": "credits"
};

export const DS_SPECIES: DsSpecies[] = [
  {
    "n": 1,
    "name": "The Triad",
    "text": "You have the use of one Triad power."
  },
  {
    "n": 2,
    "name": "Amphibious",
    "text": "You can breathe water as well as air. You can swim at full speed."
  },
  {
    "n": 3,
    "name": "Armored Skin",
    "text": "Gain +1 to your AC when not wearing armor."
  },
  {
    "n": 4,
    "name": "Covert Communication",
    "text": "You can communicate secretly with others of your species or those who understand this communication."
  },
  {
    "n": 5,
    "name": "Longsight",
    "text": "You get a +1 bonus to ranged attack and damage rolls."
  },
  {
    "n": 6,
    "name": "Hyperacute Senses",
    "text": "You can't be surprised by enemies or events."
  },
  {
    "n": 7,
    "name": "Powerful",
    "text": "You have a +1 bonus to melee attack and damage rolls."
  },
  {
    "n": 8,
    "name": "Natural Weapon",
    "text": "You have a natural weapon that deals 1d6 damage. You are proficient with it."
  },
  {
    "n": 9,
    "name": "Flight",
    "text": "You can fly and/or walk."
  },
  {
    "n": 10,
    "name": "Sneaky",
    "text": "You have advantage when trying to be deceptive."
  },
  {
    "n": 11,
    "name": "Tracking Sense",
    "text": "Once per episode, pick a target to be your quarry. You have advantage on all checks to track your quarry."
  },
  {
    "n": 12,
    "name": "Adapted for Heat",
    "text": "Can survive in hot environments. Half damage from fire or heat."
  },
  {
    "n": 13,
    "name": "Adapted for Cold",
    "text": "Can survive in cold environments. Half damage from ice or cold."
  },
  {
    "n": 14,
    "name": "Technical Knack",
    "text": "You get a +1 bonus when working with technology and machines."
  },
  {
    "n": 15,
    "name": "Natural Connection",
    "text": "You get a +1 bonus when working with plants and animals."
  },
  {
    "n": 16,
    "name": "Radiation Resistant",
    "text": "Can survive in radioactive environments. Half damage from radiation or electricity."
  },
  {
    "n": 17,
    "name": "Filtration",
    "text": "Can survive in toxic environments. Half damage from poison."
  },
  {
    "n": 18,
    "name": "Natural Climber",
    "text": "Full speed for climbing. Reduce climbing DC by one category."
  },
  {
    "n": 19,
    "name": "Extra Arms",
    "text": "Can take one extra non-attack action per turn. Increase gear slots by 2."
  },
  {
    "n": 20,
    "name": "Extra Legs",
    "text": "Can move up to DOUBLE NEAR in addition to their action. DC to be tripped increased by one category."
  }
];

export const DS_HUMAN_NOTE: string = "Humans (or human analogues) get the Ambitious trait: roll twice on your Archetype talent table at 1st level.";

export const DS_TECH_SPECIES: DsTechSpecies[] = [
  {
    "name": "Android",
    "text": "Sentient artificial intelligence in a manufactured body. Species Trait: Mechanical — you do not require food, drink, or air to function; you need a power charge (a rest) to maintain operational level. Can choose any archetype (Machine-Based if desired). Any background/motivation. Cannot take The Triad as a talent."
  },
  {
    "name": "Power Armor Spacer",
    "text": "\"A guy in a suit\" — abilities come from a suit of power armor. Species Trait: ANY, plus Life Support (you do not require external food/drink/air while connected; still rest and need a power charge). Archetype: Machine-Based. Any background/motivation. May take The Triad as a Species Trait."
  }
];

export const DS_ARCHETYPES: DsArchetype[] = [
  {
    "name": "Strong",
    "stat": "STR",
    "hitDie": 8,
    "weapons": "All Melee weapons",
    "armor": "All Armor",
    "blurb": "Grunts, teamsters, gladiators, and bodyguards. The muscle that carry the galaxy on their shoulders.",
    "features": [
      {
        "name": "Heavy Lifter",
        "text": "Your number of gear slots is equal to your STR score (or 10) + STR mod (if positive)."
      },
      {
        "name": "Weapon Expertise",
        "text": "Pick a category of melee weapon (e.g. Blunt Weapons). +1 to attack and damage with that type; also add half your level (rounded down) to those rolls."
      },
      {
        "name": "Might",
        "text": "Advantage on checks to overcome a great feat of strength (kicking open a stuck cargo hatch, pulling a robot's arm off)."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Cleave. Deal an additional +1d4 damage when scoring a critical hit (can be taken multiple times)."
      },
      {
        "r": "3-6",
        "text": "+1 to melee attacks."
      },
      {
        "r": "7-9",
        "text": "+2 to Strength, Dexterity, or Constitution."
      },
      {
        "r": "10-11",
        "text": "Choose one category of armor. You get +1 AC from that armor."
      },
      {
        "r": "12",
        "text": "Choose a Strong Talent or +2 points to assign to stats."
      }
    ]
  },
  {
    "name": "Quick",
    "stat": "DEX",
    "hitDie": 6,
    "weapons": "Melee and Ranged Weapons (excluding all Heavy Weapons)",
    "armor": "Light Armor",
    "blurb": "Pilots, thieves, gunslingers, and assassins. Move fast and strike with precision.",
    "features": [
      {
        "name": "Quick Shot",
        "text": "If a creature doesn't notice your attack, you roll extra weapon dice for damage equal to half your level (rounded up)."
      },
      {
        "name": "Never Tell Me the Odds",
        "text": "Start each game with a Luck Token. After a rest you gain a Luck Token if you don't already have one."
      },
      {
        "name": "Reflexes",
        "text": "Advantage on DEX checks to avoid a dangerous situation (a laser mine, flying through an asteroid field)."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Trick Shot. 1/episode re-roll a missed ranged attack; on a hit it ricochets and hits as a Quick Shot. If you already have Trick Shot, gain an additional use per episode."
      },
      {
        "r": "3-5",
        "text": "Your Quick Shot deals +1 dice of damage (can be taken multiple times)."
      },
      {
        "r": "6-9",
        "text": "+2 to Dexterity, Wisdom or Charisma."
      },
      {
        "r": "10-11",
        "text": "+1 to ranged attacks."
      },
      {
        "r": "12",
        "text": "Choose a Quick Talent or +2 points to distribute to stats."
      }
    ]
  },
  {
    "name": "Tough",
    "stat": "CON",
    "hitDie": 8,
    "weapons": "Melee and Ranged Weapons (excluding Light Weapons in both)",
    "armor": "All Armor",
    "blurb": "Soldiers, bounty hunters, scrappers, and bruisers. Resilient and can survive a long haul.",
    "features": [
      {
        "name": "Sturdy",
        "text": "+2 HP when making a Tough character. Roll additional hit points gained with advantage."
      },
      {
        "name": "Resilient",
        "text": "Advantage on CON checks to resist permanent injury, disease, toxins, or extreme environmental conditions."
      },
      {
        "name": "Unyielding",
        "text": "3/episode, make a DC 18 CON check (Resilient applies) instead of a death roll. On a fail, the Death Timer still applies; on a success, get back up at 1 HP."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Shake it Off. 1/episode, ignore all damage and effects from one attack. If you already have it, gain an additional use per episode."
      },
      {
        "r": "3-5",
        "text": "+1 to melee or ranged attacks."
      },
      {
        "r": "6-9",
        "text": "+2 to either Strength, Dexterity, or Constitution."
      },
      {
        "r": "10-11",
        "text": "Choose one category of armor. You get +1 AC from that armor (can be taken multiple times)."
      },
      {
        "r": "12",
        "text": "Choose a Tough Talent or +2 points to distribute to stats."
      }
    ]
  },
  {
    "name": "Clever",
    "stat": "INT",
    "hitDie": 4,
    "weapons": "Light Ranged Weapons",
    "armor": "None",
    "blurb": "Scientists, hackers, strategists, and inventors. Use their intellect to think outside the box.",
    "features": [
      {
        "name": "Languages",
        "text": "You know two additional common languages and two rare languages."
      },
      {
        "name": "Specialization",
        "text": "Choose one non-combat specialization tied to your background. +1 to rolls associated with it; also add half your level (round down) to these rolls."
      },
      {
        "name": "Keen Support",
        "text": "3/episode, when an ally is about to make a non-combat roll, make a DC 9 INT check; on success they add +1d4 to their roll."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Improvise. 1/episode, make an INT check to overcome a non-combat obstacle instead of the expected stat check. If you already have it, gain an additional use per episode."
      },
      {
        "r": "3-5",
        "text": "Gain one additional use of Keen Support."
      },
      {
        "r": "6-8",
        "text": "+2 to Intelligence or +1 to Specialization checks."
      },
      {
        "r": "9-11",
        "text": "Learn one additional Specialization."
      },
      {
        "r": "12",
        "text": "Choose a Clever Talent or +2 points to distribute to stats."
      }
    ]
  },
  {
    "name": "Wise",
    "stat": "WIS",
    "hitDie": 4,
    "weapons": "Light Melee Weapons",
    "armor": "None",
    "blurb": "Mystics, sages, counselors, and monks. Divine the true nature of the galaxy and its inhabitants.",
    "features": [
      {
        "name": "Optimization",
        "text": "If you use a luck token, add your WIS bonus to the new roll."
      },
      {
        "name": "Enlightenment",
        "text": "3/episode, make a DC 12 WIS check; on success gain a luck token (you can't have more than one at a time)."
      },
      {
        "name": "Insightful Defense",
        "text": "Add half your level (round down, minimum 1) to your AC."
      },
      {
        "name": "Optional — The Triad",
        "text": "You may swap Enlightenment for a Triad Power if your GM allows (an additional Triad Power if your species trait is already The Triad — replace the second Wise talent with \"Gain one additional Triad Power\")."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Riposte. 1/episode, deflect a successful attack; damage the attacker or another target instead. If you already have it, gain an additional use per episode."
      },
      {
        "r": "3-6",
        "text": "Reduce your Enlightenment DC by 2."
      },
      {
        "r": "7-9",
        "text": "+2 to Intelligence, Wisdom, Constitution."
      },
      {
        "r": "10-11",
        "text": "+1 to Optimization bonus."
      },
      {
        "r": "12",
        "text": "Choose a Wise Talent or +2 points to distribute to stats."
      }
    ]
  },
  {
    "name": "Charming",
    "stat": "CHA",
    "hitDie": 6,
    "weapons": "Projectile and Energy Pistols",
    "armor": "Light Armor",
    "blurb": "Scoundrels, performers, politicians, and captains. Leaders and smooth talkers who keep the credits flowing.",
    "features": [
      {
        "name": "Languages",
        "text": "You know three additional common languages and one rare language."
      },
      {
        "name": "Friends Everywhere",
        "text": "You always seem to have a contact for resources, information, or services. In a populated area, make a CHA check DC 12 to locate a contact. Payment may still be required, but everything is off the record."
      },
      {
        "name": "Sway",
        "text": "Make a CHA check to sway an audience: Motivate (DC 12 — one target in NEAR gains a luck token if they have none) or Beguile (DC 15 — transfix targets whose total levels are up to your level + CHA mod within NEAR for 1d4 rounds). On a fail, you can't use that effect again until you rest."
      },
      {
        "name": "Wingman",
        "text": "Groups carousing with 1+ Charming characters add 1d6 to their rolls."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Scoundrel's Luck. Start each episode with a Luck Token, and gain one after a rest. If you already have this, start with one additional; you may have multiple Luck Tokens."
      },
      {
        "r": "3-6",
        "text": "+1 to melee and ranged attacks, or +1 to your carousing rolls."
      },
      {
        "r": "7-9",
        "text": "+2 to Dexterity, Intelligence, or Charisma."
      },
      {
        "r": "10-11",
        "text": "Reduce the DC of one of your Sway effects by 3."
      },
      {
        "r": "12",
        "text": "Choose a Charming Talent or +2 points to distribute to stats."
      }
    ]
  },
  {
    "name": "Machine-Based",
    "stat": "—",
    "hitDie": 6,
    "weapons": "Built-in Weapons",
    "armor": "Built-in Armor",
    "blurb": "Combat cyborgs, repair 'bots, or power armor jockeys — machine-based spacers with built-in tools and capabilities.",
    "features": [
      {
        "name": "Functions",
        "text": "Choose or roll 3 traits from the Species Traits table. You cannot take the Triad Power trait as a function (re-roll or choose a different trait)."
      },
      {
        "name": "Built-In Armor and Weapons",
        "text": "If you gain the Armored Skin or Natural Weapon trait, you are automatically proficient with it. You are not proficient with external weapons or armor to start but may learn to use them (see Downtime)."
      }
    ],
    "talents": [
      {
        "r": "2",
        "text": "Hardware Upgrade. Roll one additional Species Trait."
      },
      {
        "r": "3-6",
        "text": "Gain either the Powerful or Longsight trait. You may gain this multiple times."
      },
      {
        "r": "7-9",
        "text": "+2 to distribute to stats."
      },
      {
        "r": "10-11",
        "text": "Gain the Armored Skin trait. You may gain this multiple times."
      },
      {
        "r": "12",
        "text": "Software upgrade. Roll one additional Background."
      }
    ]
  }
];

export const DS_BACKGROUNDS: DsBackground[] = [
  {
    "n": 1,
    "name": "Street Rat",
    "text": "You know the merciless streets of cities and villainous hives."
  },
  {
    "n": 2,
    "name": "Outlaw",
    "text": "You're a wanted criminal hiding from jail or worse."
  },
  {
    "n": 3,
    "name": "Hacker",
    "text": "Datanets are no match for you."
  },
  {
    "n": 4,
    "name": "Operative",
    "text": "You have crime syndicate connections, contacts, and debts."
  },
  {
    "n": 5,
    "name": "Roughneck",
    "text": "Mining, hauling, or salvaging, you work best in extreme environments."
  },
  {
    "n": 6,
    "name": "Mechanic",
    "text": "You can fix and tinker on a device or vehicle."
  },
  {
    "n": 7,
    "name": "Politician",
    "text": "You navigate bureaucracy like some navigate the stars."
  },
  {
    "n": 8,
    "name": "Fence",
    "text": "You can appraise value and know where to find a buyer."
  },
  {
    "n": 9,
    "name": "Gambler",
    "text": "You never turn down a good bet."
  },
  {
    "n": 10,
    "name": "Corpo",
    "text": "The ways of the corporate world are second nature to you."
  },
  {
    "n": 11,
    "name": "Mercenary",
    "text": "You would fight friend and foe alike for your credits."
  },
  {
    "n": 12,
    "name": "Pilot",
    "text": "Pirate, privateer, or merchant — the stars are yours."
  },
  {
    "n": 13,
    "name": "Acolyte",
    "text": "You're well-trained in religious rites and doctrines."
  },
  {
    "n": 14,
    "name": "Soldier",
    "text": "You serve as a fighter in an organized army."
  },
  {
    "n": 15,
    "name": "Ranger",
    "text": "The frontier is your true home, surviving on stealth and wits."
  },
  {
    "n": 16,
    "name": "Scientist",
    "text": "You seek discovery through experimentation rather than study."
  },
  {
    "n": 17,
    "name": "Celebrity",
    "text": "You've traveled far with your charm and talent."
  },
  {
    "n": 18,
    "name": "Academic",
    "text": "You seek discovery through study rather than experimentation."
  },
  {
    "n": 19,
    "name": "Noble",
    "text": "A famous name has opened many doors for you."
  },
  {
    "n": 20,
    "name": "Medic",
    "text": "You know anatomy, surgery, and first aid."
  }
];

export const DS_MOTIVATIONS: DsMotivation[] = [
  {
    "code": "S",
    "name": "The Survivor",
    "text": "Adapt, overcome, and do whatever is necessary to survive.",
    "startBonus": "Roll on the Citizen Starting Equipment chart for an extra piece of gear.",
    "effect": "Receive a Luck Token when acting in a way that exemplifies resilience and adaptability."
  },
  {
    "code": "VL",
    "name": "The Vile",
    "text": "Embraced darker aspects such as ambition and greed; manipulate, betray, or take advantage by any means.",
    "startBonus": "Start with an extra 2d10 credits.",
    "effect": "Receive a Luck Token when acting in self-interest or engaging in morally dubious actions."
  },
  {
    "code": "VR",
    "name": "The Virtuous",
    "text": "Guided by courage, justice, and loyalty; act for the greater good even at personal sacrifice.",
    "startBonus": "1d3 trusted contacts (define before or during play) who will always assist you if able.",
    "effect": "Receive a Luck Token when engaging in actions that uphold your principles."
  }
];

export const DS_TRIAD: DsTriad = {
  "intro": "The Triad represents metaphysical abilities — a mystical connection, scientific experimentation, or natural psionics. Choose a power you don't know when you gain a Triad power; gaining all three shows mastery. There are no pre-defined \"spells\" — a Feat is any check to accomplish a metaphysical effect within the confines of that power, at the GM's discretion.",
  "powers": [
    {
      "name": "Body",
      "stat": "CON",
      "text": "Affecting your physical body or the material world. Examples: Enhanced Strength, Increased Speed, Power Leaping, Telekinesis, Pyrokinesis, Levitation."
    },
    {
      "name": "Mind",
      "stat": "INT",
      "text": "Affecting your mind and the minds of others. Examples: Perfect Recall, Telepathy, Thought Reading, Mind Blasts, Enhancing Senses."
    },
    {
      "name": "Soul",
      "stat": "WIS",
      "text": "Affecting your connection to the metaphysical and transcendent. Examples: Precognition, Remote Viewing, Calming Emotions, Astral Projection, Life Sense, Empathic Perception."
    }
  ],
  "feats": [
    {
      "diff": "Easy",
      "dc": 9,
      "die": "d4"
    },
    {
      "diff": "Normal",
      "dc": 12,
      "die": "d6"
    },
    {
      "diff": "Hard",
      "dc": 15,
      "die": "d8"
    },
    {
      "diff": "Extreme",
      "dc": 18,
      "die": "d10"
    }
  ],
  "notes": "Make the Feat check with the power's stat. A crit doubles one numerical component. A crit fail ends that power until you rest. Effects that deal damage/healing use the die matching the DC beaten (see table). Sustained feats need a new check each turn.",
  "exampleFeats": [
    {
      "power": "Body",
      "name": "Force Field",
      "text": "Create an invisible solid barrier of psychic energy. Make a BODY check; the total is the barrier's HP. Focus (DC 9/round)."
    },
    {
      "power": "Body",
      "name": "Inner Light",
      "text": "Cause part or all of your body to glow. DC 11 BODY check: glow up to CLOSE for one hour of real time."
    },
    {
      "power": "Body",
      "name": "Levitation",
      "text": "Lift a creature off the ground and move it with your mind (DC by size). A resisting target makes a CON check vs your roll. On a success, move it NEAR. Focus."
    },
    {
      "power": "Body",
      "name": "Psychic Healing",
      "text": "Accelerate the body's healing. BODY check vs a DC on the Feat table; the result is HP the target regains."
    },
    {
      "power": "Body",
      "name": "Pyrokinesis",
      "text": "Create and project fire. BODY check vs a DC; the result is damage. The target checks vs your roll to resist or avoid it."
    },
    {
      "power": "Body",
      "name": "Telekinesis",
      "text": "Lift and move an object (DC by size). On a success move it NEAR; it can be thrown as a projectile — attack with BODY, damage die by the lifting DC. Focus."
    },
    {
      "power": "Mind",
      "name": "Coercion",
      "text": "Influence a sentient being to follow a mental command. Contested MIND vs their INT/MIND (ADV if it opposes their Motivation). On a success it takes one action. Focus."
    },
    {
      "power": "Mind",
      "name": "Enhance Senses",
      "text": "Extend your senses. DC 12 MIND check: ADV on checks involving your senses (not darkvision). Focus (DC 12/round)."
    },
    {
      "power": "Mind",
      "name": "Mental Blast",
      "text": "Deal psychic damage. MIND check vs a DC for the damage die; the target checks vs your total to resist or avoid it."
    },
    {
      "power": "Mind",
      "name": "Mental Illusions",
      "text": "Make creatures perceive an illusion. Contested MIND vs INT/MIND against a number of targets equal to your level. Focus."
    },
    {
      "power": "Mind",
      "name": "Telepathy",
      "text": "Communicate mentally. MIND check vs a DC; the die rolled is how many targets up to FAR you reach. Targets resist with INT/MIND. Focus."
    },
    {
      "power": "Soul",
      "name": "Astral Projection",
      "text": "Leave your body and travel to a place you know (DC 15 SOUL). Your body is inert; other psychic entities can see you. Focus."
    },
    {
      "power": "Soul",
      "name": "Clairvoyance",
      "text": "See into and interact with the astral plane up to NEAR (DC 11 SOUL). You still can't physically interact. Focus."
    },
    {
      "power": "Soul",
      "name": "Empathy",
      "text": "Sense (and later influence) creatures' emotions. SOUL check vs a DC for how many targets up to FAR; targets resist with WIS/SOUL. Focus to influence with a contested check."
    },
    {
      "power": "Soul",
      "name": "Psychometry",
      "text": "Glean sense-memories of a place or object (DC 15 SOUL, target present). The GM gives the most important memory/emotion. Focus for more each round."
    }
  ]
};

export const DS_CORRUPTION: DsCorruption = {
  "intro": "Corruption is a catch-all for any slow descent toward a permanent end — addiction, mutation, a virus, cyberpsychosis, the dark side, void madness. These optional rules should be agreed on at the start of a campaign, as they can result in character loss.",
  "check": "When a situation would corrupt a Spacer, they make a check (stat and DC set by the GM — e.g. addiction vs CON, psychosis vs WIS, dark side vs CHA). Failure = +1 Corruption Point. A critical failure also inflicts a Side Effect. A critical success grants immediate Restoration.",
  "threshold": "If Corruption Points ever exceed the Spacer's WIS score, they have succumbed — death, loss of free will or reason, or turning villain (GM and player decide the ending together).",
  "restoration": "On a rest, a Spacer may forgo healing to instead reduce Corruption Points by their WIS bonus (minimum 1).",
  "sideEffects": {
    "Technological": [
      "Weeping Metal — an oily, mercury-like substance weeps from your eyes, ears, or pores.",
      "Data-Glitch Skin — your skin flickers like a corrupted hologram, showing static or code.",
      "Vox Scramble — your voice is intermittently replaced by bursts of harsh static.",
      "Cable Tendrils — thin black wires like optical fibers grow from beneath your skin.",
      "Heat Sink Vents — grilled vents open along your spine or torso, venting hot steam.",
      "Ocular Lens — one eye's iris and pupil become a camera's aperture.",
      "Sonic Hum — your body emits a constant low-frequency hum.",
      "Fused Plating — patches of skin harden into overlapping alloy plates, restricting movement."
    ],
    "Biological": [
      "Asymmetrical Growth — a limb becomes unnaturally long and jointed.",
      "Mycelial Veins — your veins glow with faint pulsing bioluminescence.",
      "Crystalline Growths — translucent crystals sprout from your skeleton, tearing through skin.",
      "Translucent Flesh — your skin turns transparent, revealing shifting organs.",
      "Corrosive Touch — your sweat and saliva are acidic, slowly rusting metal.",
      "Poly-Phalangeal Hands — your fingers split into many spindly, twitching digits.",
      "Second Mouth — a second, non-functional mouth forms somewhere on your body.",
      "Abiotic Respiration — you no longer seem to breathe; you exhale a thin ammonia mist."
    ],
    "Mental": [
      "Memory Fragmentation — your memories are jumbled.",
      "Visual Ghosts — you perceive flickering afterimages of people and objects.",
      "Logic Conversion — you struggle to process emotional reasoning.",
      "Apophenia Cascade — you see sinister patterns; nonexistent conspiracies feel real.",
      "Synesthesia — your senses merge unnaturally (you \"smell\" lies, \"hear\" colors).",
      "Identity Protocol — you lose your sense of self, referring to yourself in the third person.",
      "Aphasia — under stress you lose the ability to form coherent words.",
      "Obsessive Calculation — your brain runs constant low-level calculations about everything."
    ],
    "Emotional": [
      "Empathy Inversion — you take pleasure in others' suffering; their joy causes you anxiety.",
      "Phobia Imprint — a new, overwhelming, irrational fear.",
      "Cold Rage — your anger becomes silent, placid, merciless focus.",
      "Social Agnosia — you can no longer intuitively read body language.",
      "State Shift — your moods flip instantly from stoicism to volatile emotion.",
      "Xenomorphic Longing — deep homesickness for a place you've never been.",
      "Object Imprint — a deep, protective, loving bond with an inanimate object.",
      "Machine Paranoia — an unshakable feeling that networked machines are watching you."
    ]
  },
  "sources": {
    "Technological": [
      "A black-market cybernetic implant",
      "Malfunctioning repair nanites",
      "A failed teleportation",
      "Prolonged neural interface",
      "An experimental starship reactor core",
      "A \"data-phage\" virus",
      "A piece of \"dead\" alien technology",
      "An assimilating cyborg hive"
    ],
    "Biological": [
      "Stung by a hyper-mutagenic creature",
      "A symbiotic parasite",
      "Exposure to a tailored retrovirus",
      "Inhaling alien spores",
      "A forbidden gene-splicing procedure",
      "A regenerative alien mold",
      "A failed cloning — you're the unstable copy",
      "Contaminated synthetic blood"
    ],
    "Mental": [
      "Deciphering a signal of non-Euclidean origin",
      "Staring into the heart of a functioning alien artifact",
      "Telepathic contact with a vast alien hive-mind",
      "A region of space where physical laws are unstable",
      "Witnessing the birth of a cosmic horror",
      "Years in deep space, leading to \"void madness\"",
      "A full, unredacted data-infusion",
      "A powerful, dreaming alien entity"
    ],
    "Emotional": [
      "A \"psychic echo\" left in a place of terror",
      "An entity replaced your emotions with cold purpose",
      "Inhaling alien pheromones",
      "A relic imprinted with alien malice",
      "Your personality overwritten by an alien entity",
      "Surviving a catastrophic event",
      "Telepathic link with an alien emotional spectrum",
      "Witnessing an entity of pure chaos"
    ]
  }
};

export const DS_CREDITS: { note: string } = {
  "note": "DarkSpace simplifies currency to credits (cr). CredChits occupy one gear slot per 100. Citizens (0-level) start with 1d4 items from the Citizen Starting Gear table. Rookies (1st) start with 2d6×10 credits."
};

export const DS_CITIZEN_GEAR: string[] = [
  "Glowrod",
  "Light Edged Weapon",
  "Medkit",
  "Light Projectile Pistol",
  "Cable, Synthetic",
  "Energy Cells (2)",
  "Multitool",
  "Communicator",
  "Rebreather",
  "Grapple",
  "Light Blunt Weapon",
  "Rations (3 pack)"
];

export const DS_SPACERS_KIT: DsSpacersKit = {
  "cost": 40,
  "slots": 5,
  "note": "A Spacer's Kit (40cr, 5 slots) contains the essentials.",
  "items": [
    "Backpack (free, 3 slots)",
    "Cable, Synthetic",
    "Energy Cells (2)",
    "Glowrod",
    "Grapple",
    "Rations (3 pack)"
  ]
};

export const DS_GEAR: DsGearItem[] = [
  {
    "name": "Ammo Magazine",
    "cost": 3,
    "slot": "2 per slot",
    "ec": false,
    "desc": "Ammo for Projectile Weapons. See the Am (Ammo) property."
  },
  {
    "name": "Backpack",
    "cost": 3,
    "slot": "1 (first free to carry)",
    "ec": false,
    "desc": "Holds your gear. If lost, your gear is lost."
  },
  {
    "name": "Cable, Polymer",
    "cost": 20,
    "slot": "1",
    "ec": false,
    "desc": "60' long, 2,000 lb tensile strength."
  },
  {
    "name": "Cable, Synthetic",
    "cost": 10,
    "slot": "1",
    "ec": false,
    "desc": "60' long, 1,000 lb tensile strength."
  },
  {
    "name": "Communicator",
    "cost": 20,
    "slot": "1",
    "ec": true,
    "desc": "Planet-wide communication, configurable channels."
  },
  {
    "name": "CredStick",
    "cost": 3,
    "slot": "free to carry",
    "ec": false,
    "desc": "Tracks your legal currency account. Don't lose it."
  },
  {
    "name": "Datapad",
    "cost": 50,
    "slot": "1",
    "ec": true,
    "desc": "Personal computation device for datanets and files. (ACC +0, CTL +0, NET +0)"
  },
  {
    "name": "Energy Cell",
    "cost": 5,
    "slot": "2 per slot",
    "ec": false,
    "desc": "Plasma-based energy storage that powers EC gear."
  },
  {
    "name": "Glowrod",
    "cost": 10,
    "slot": "1",
    "ec": true,
    "desc": "Sheds light to NEAR. One EC lasts one hour of real time."
  },
  {
    "name": "Grapple",
    "cost": 2,
    "slot": "1",
    "ec": false,
    "desc": "Hook and clip; can be fired from a projectile weapon."
  },
  {
    "name": "Hacking Interface",
    "cost": 60,
    "slot": "1",
    "ec": true,
    "desc": "Base model hacking device. (ACC +1, CTL +0, NET +0)"
  },
  {
    "name": "Mag-Lock Boots",
    "cost": 20,
    "slot": "1",
    "ec": false,
    "desc": "Magnetic boots for walking in Zero-G."
  },
  {
    "name": "Medkit",
    "cost": 20,
    "slot": "1",
    "ec": false,
    "desc": "Basic medical supplies. Advantage on stabilizing rolls for organic lifeforms."
  },
  {
    "name": "Multitool",
    "cost": 10,
    "slot": "1",
    "ec": false,
    "desc": "Common tools for mechanical repairs. Advantage on stabilizing rolls for androids."
  },
  {
    "name": "Ration Packs (3)",
    "cost": 5,
    "slot": "1",
    "ec": false,
    "desc": "Packaged food and water for three days."
  },
  {
    "name": "Rebreather",
    "cost": 20,
    "slot": "1",
    "ec": true,
    "desc": "Self-contained breathing device. One hour per EC. Upgradeable."
  },
  {
    "name": "Scanner, Handheld",
    "cost": 50,
    "slot": "1",
    "ec": true,
    "desc": "Detects life signs, environmental data, and energy signatures."
  },
  {
    "name": "Security Kit",
    "cost": 35,
    "slot": "1",
    "ec": false,
    "desc": "Tools for bypassing security controls."
  },
  {
    "name": "StimPak",
    "cost": 10,
    "slot": "2 per slot",
    "ec": false,
    "desc": "One-time use. Stabilize and heal 1d4 HP."
  },
  {
    "name": "Vision Enhancer",
    "cost": 30,
    "slot": "1",
    "ec": true,
    "desc": "Digital binoculars."
  }
];

export const DS_ARMOR: DsArmor[] = [
  {
    "name": "Light Armor",
    "cost": 25,
    "slots": 1,
    "ac": "11 + DEX mod",
    "props": "Ph"
  },
  {
    "name": "Medium Armor",
    "cost": 50,
    "slots": 2,
    "ac": "13 + DEX mod",
    "props": "Ph, DisADV on stealth & swim"
  },
  {
    "name": "Heavy Armor",
    "cost": 75,
    "slots": 3,
    "ac": "15",
    "props": "Ph, DisADV on stealth, no swim"
  },
  {
    "name": "Energy Armor",
    "cost": 100,
    "slots": 1,
    "ac": "15",
    "props": "EC, En"
  },
  {
    "name": "Helmet",
    "cost": 10,
    "slots": 1,
    "ac": "+1",
    "props": "Ph, DisADV on perception"
  },
  {
    "name": "Exosuit Conversion",
    "cost": 50,
    "slots": "+1",
    "ac": "—",
    "props": "Adds Rebreather & Radiation Resistance"
  },
  {
    "name": "Ballistic Shield",
    "cost": 20,
    "slots": 1,
    "ac": "+2",
    "props": "1H, Ph"
  },
  {
    "name": "Energy Shield",
    "cost": 30,
    "slots": 0,
    "ac": "+2",
    "props": "EC, 1H, En"
  }
];

export const DS_MELEE_WEAPONS: DsWeapon[] = [
  {
    "name": "Blunt, Light",
    "cost": 1,
    "range": "C/N",
    "dmg": "1d4",
    "props": "Th"
  },
  {
    "name": "Blunt, Medium",
    "cost": 3,
    "range": "C",
    "dmg": "1d6/1d8",
    "props": "V"
  },
  {
    "name": "Blunt, Heavy",
    "cost": 5,
    "range": "C",
    "dmg": "1d10",
    "props": "2H"
  },
  {
    "name": "Force, Light",
    "cost": 5,
    "range": "C/N",
    "dmg": "1d6",
    "props": "EC, Th"
  },
  {
    "name": "Force, Medium",
    "cost": 10,
    "range": "C",
    "dmg": "1d8/1d10",
    "props": "EC, V"
  },
  {
    "name": "Force, Heavy",
    "cost": 15,
    "range": "C",
    "dmg": "1d12",
    "props": "EC, 2H"
  },
  {
    "name": "Edged, Light",
    "cost": 1,
    "range": "C/N",
    "dmg": "1d4",
    "props": "Th"
  },
  {
    "name": "Edged, Medium",
    "cost": 3,
    "range": "C",
    "dmg": "1d6/1d8",
    "props": "V"
  },
  {
    "name": "Edged, Heavy",
    "cost": 5,
    "range": "C",
    "dmg": "1d10",
    "props": "2H"
  },
  {
    "name": "Vibro, Light",
    "cost": 5,
    "range": "C/N",
    "dmg": "1d6",
    "props": "EC, Th"
  },
  {
    "name": "Vibro, Medium",
    "cost": 10,
    "range": "C",
    "dmg": "1d8/1d10",
    "props": "EC, V"
  },
  {
    "name": "Vibro, Heavy",
    "cost": 15,
    "range": "C",
    "dmg": "1d12",
    "props": "EC, 2H"
  },
  {
    "name": "Stun Baton",
    "cost": 15,
    "range": "C",
    "dmg": "Disabling (DC 9)",
    "props": "EC, D"
  }
];

export const DS_RANGED_WEAPONS: DsWeapon[] = [
  {
    "name": "Pistol, Light",
    "cost": 5,
    "range": "N",
    "dmg": "1d4",
    "props": "Am",
    "group": "Projectile"
  },
  {
    "name": "Pistol, Medium",
    "cost": 10,
    "range": "N",
    "dmg": "1d6",
    "props": "Am",
    "group": "Projectile"
  },
  {
    "name": "Pistol, Heavy",
    "cost": 15,
    "range": "N",
    "dmg": "1d8",
    "props": "Am",
    "group": "Projectile"
  },
  {
    "name": "Rifle, Light",
    "cost": 20,
    "range": "F",
    "dmg": "1d4",
    "props": "Am, 2H",
    "group": "Projectile"
  },
  {
    "name": "Rifle, Medium",
    "cost": 25,
    "range": "F",
    "dmg": "1d6",
    "props": "Am, 2H",
    "group": "Projectile"
  },
  {
    "name": "Rifle, Heavy",
    "cost": 30,
    "range": "F",
    "dmg": "1d8",
    "props": "Am, 2H, R",
    "group": "Projectile"
  },
  {
    "name": "Ion Pistol",
    "cost": 30,
    "range": "N",
    "dmg": "Disabling (DC 12)",
    "props": "EC, D",
    "group": "Disabling"
  },
  {
    "name": "Ion Rifle",
    "cost": 50,
    "range": "F",
    "dmg": "Disabling (DC 15)",
    "props": "EC, D, 2H",
    "group": "Disabling"
  },
  {
    "name": "Energy Pistol, Light",
    "cost": 10,
    "range": "N",
    "dmg": "1d6",
    "props": "EC",
    "group": "Energy"
  },
  {
    "name": "Energy Pistol, Medium",
    "cost": 25,
    "range": "N",
    "dmg": "1d8",
    "props": "EC",
    "group": "Energy"
  },
  {
    "name": "Energy Pistol, Heavy",
    "cost": 50,
    "range": "N",
    "dmg": "1d10",
    "props": "EC, R",
    "group": "Energy"
  },
  {
    "name": "Energy Rifle, Light",
    "cost": 25,
    "range": "F",
    "dmg": "1d6",
    "props": "EC, 2H",
    "group": "Energy"
  },
  {
    "name": "Energy Rifle, Medium",
    "cost": 45,
    "range": "F",
    "dmg": "1d8",
    "props": "EC, 2H",
    "group": "Energy"
  },
  {
    "name": "Energy Rifle, Heavy",
    "cost": 65,
    "range": "F",
    "dmg": "1d10",
    "props": "EC, AP, 2H, R",
    "group": "Energy"
  }
];

export const DS_EXPLOSIVES: DsWeapon[] = [
  {
    "name": "Molotov Cocktail",
    "cost": 5,
    "range": "N",
    "dmg": "1d4",
    "props": "Bl, Th, 1U"
  },
  {
    "name": "Grenade, Frag",
    "cost": 50,
    "range": "N",
    "dmg": "1d10",
    "props": "Bl, Th, 1U"
  },
  {
    "name": "Grenade, Ion",
    "cost": 75,
    "range": "N",
    "dmg": "Disabling (DC 15)",
    "props": "Bl, D, Th, 1U"
  },
  {
    "name": "Grenade, Energy",
    "cost": 100,
    "range": "N",
    "dmg": "1d12",
    "props": "AP, Bl, Th, 1U"
  },
  {
    "name": "Flamethrower",
    "cost": 75,
    "range": "N",
    "dmg": "1d8/round",
    "props": "Am (Fuel), Bl, 2H"
  },
  {
    "name": "Land Mine",
    "cost": 75,
    "range": "C",
    "dmg": "2d8",
    "props": "AP, Bl, 1U, Dl"
  },
  {
    "name": "Plastic Explosive",
    "cost": 100,
    "range": "C",
    "dmg": "3d6",
    "props": "AP, Bl, 1U, Dl"
  },
  {
    "name": "Rocket",
    "cost": 100,
    "range": "requires launcher",
    "dmg": "4d6",
    "props": "AP, Bl, 1U"
  },
  {
    "name": "Grenade Launcher",
    "cost": 100,
    "range": "F",
    "dmg": "varies",
    "props": "varies"
  },
  {
    "name": "Rocket Launcher",
    "cost": 200,
    "range": "F",
    "dmg": "requires rocket",
    "props": "2H"
  }
];

export const DS_WEAPON_PROPS: Record<string, string> = {
  "1U": "Single Use — consumed after one use.",
  "2H": "Two-Handed — requires two hands and two gear slots.",
  "Am": "Ammo — needs an ammo magazine; on a nat 1 attack it runs out (swap as an action).",
  "AP": "Armor Piercing — target's AC is as if unarmored; ignores ship scale.",
  "Bl": "Blast — roll 1d6 for extra targets affected besides the intended target.",
  "C": "Close range.",
  "D": "Disabling — on a hit, target makes a CON check vs the DC or is stunned 1d10 minutes (Automata DisADV).",
  "Dl": "Delay — can be given a delay (see description).",
  "EC": "Energy Cell — needs an energy cell; on a nat 1 attack it's exhausted (swap as an action).",
  "En": "Energy Armor — Disabling (D) weapons affect this armor.",
  "F": "Far range.",
  "N": "Near range.",
  "Ph": "Physical Armor — Armor Piercing (AP) weapons ignore this armor.",
  "R": "Repeating — alternate mode for a second shot at disadvantage.",
  "Th": "Thrown — can be thrown (Light melee to NEAR).",
  "V": "Versatile — one- or two-handed; two-handed uses the larger die."
};

export const DS_SHIP: DsShip = {
  "design": [
    "Roll base stats (STR/DEX/CON/INT/WIS/CHA) like a Shadowdark character. HP = 10 + CON mod. AC = 10 + DEX mod.",
    "Design Budget = (1d10+5) × 1000cr (or use saved credits). Customizing a stock ship: 1d10 × 1000cr.",
    "Base systems required to operate: Sublight Drive, Communications Array, Memory Bank.",
    "Choose a Classification (Explorer, Fighter, Freighter, Gunship, Researcher, Yacht) for system/feature slots and a free starting component.",
    "Additional System/Feature slots cost 1000cr each (max 10 each). Stat increases: +1 per 1000cr cumulative, max 18.",
    "Advanced systems cost +1 slot: grant advantage on that system; Advanced Sublight/FTL halve travel time; Advanced Energy Shields grant +4 AC vs energy.",
    "A ship's level is always ≥ the average Crew Level; it levels like a Shadowdark character when Crew Level rises."
  ],
  "classes": [
    "Explorer",
    "Fighter",
    "Freighter",
    "Gunship",
    "Researcher",
    "Yacht"
  ],
  "weapons": [
    {
      "name": "Projectile Cannon, Light",
      "cost": 100,
      "range": "N",
      "dmg": "1d4",
      "props": "Am"
    },
    {
      "name": "Projectile Cannon",
      "cost": 200,
      "range": "N",
      "dmg": "1d6",
      "props": "Am"
    },
    {
      "name": "Projectile Cannon, Heavy",
      "cost": 300,
      "range": "N",
      "dmg": "1d8",
      "props": "Am, AP"
    },
    {
      "name": "Laser Cannon, Light",
      "cost": 200,
      "range": "F",
      "dmg": "1d6",
      "props": "EG"
    },
    {
      "name": "Laser Cannon",
      "cost": 300,
      "range": "F",
      "dmg": "1d8",
      "props": "EG"
    },
    {
      "name": "Laser Cannon, Heavy",
      "cost": 400,
      "range": "F",
      "dmg": "1d10",
      "props": "EG, AP"
    },
    {
      "name": "Ion Cannon",
      "cost": 500,
      "range": "F",
      "dmg": "Disabling (DC 12)",
      "props": "EG, D"
    },
    {
      "name": "Explosive Missile",
      "cost": 200,
      "range": "N",
      "dmg": "1d10",
      "props": "Single Use, AP, Bl, L"
    },
    {
      "name": "Energy Torpedo",
      "cost": 300,
      "range": "N",
      "dmg": "1d12",
      "props": "Single Use, AP, Bl, L"
    },
    {
      "name": "Ion Torpedo",
      "cost": 400,
      "range": "N",
      "dmg": "Disabling (DC 15)",
      "props": "Single Use, Bl, D, L"
    }
  ],
  "armor": [
    {
      "name": "Armor Plating, Light",
      "cost": 300,
      "ac": "11 + Ship DEX mod",
      "props": "Ph"
    },
    {
      "name": "Armor Plating, Medium",
      "cost": 400,
      "ac": "13 + Ship DEX mod",
      "props": "Ph, DEX mod halved (round down) for maneuver checks"
    },
    {
      "name": "Armor Plating, Heavy",
      "cost": 500,
      "ac": "15",
      "props": "Ph, no DEX mod for maneuver checks"
    },
    {
      "name": "Energy Shields",
      "cost": 300,
      "ac": "+2 vs energy weapons",
      "props": "En, EG, S(1)"
    }
  ],
  "stockClasses": [
    {
      "name": "Explorers",
      "text": "Balanced ships built for long-range exploration and survey work."
    },
    {
      "name": "Fighters",
      "text": "Fast, agile, lightly-armored combat craft."
    },
    {
      "name": "Freighters",
      "text": "Cargo haulers with room for goods and a modest crew."
    },
    {
      "name": "Gunships",
      "text": "Heavily-armed warships built to dish out damage."
    },
    {
      "name": "Researchers",
      "text": "Science vessels loaded with sensors and labs."
    },
    {
      "name": "Yachts",
      "text": "Luxury craft for the wealthy and well-connected."
    }
  ]
};

export const DS_ADVANCED_TECH: DsAdvancedTech[] = [
  {
    "name": "Alien Incubation Pod",
    "text": "Activate to hatch an alien larva that attacks the nearest creature for 5 rounds. Drawback: the larva grows into an alien beast within 1d12 hours."
  },
  {
    "name": "Auditory Amplifier",
    "text": "Cybernetic ears: ADV on auditory perception, DisADV on checks to prevent sonic damage."
  },
  {
    "name": "Ballistic Accelerator",
    "text": "Projectile weapon upgrade: range increases to the next increment."
  },
  {
    "name": "Beam Saber",
    "text": "Metal hilt generating an energy blade. Counts as a Light Edged Weapon dealing d12 with Armor Piercing. EC."
  },
  {
    "name": "Blink Drive",
    "text": "Experimental Advanced FTL: short FTL jump to FAR with an Astrogation check (DC 12); on a fail it's drained until next episode. (Ship upgrade.)"
  },
  {
    "name": "Concussive Wave Emitter",
    "text": "Projectile upgrade: alternate Blast mode dealing non-lethal damage."
  },
  {
    "name": "Cryotube",
    "text": "Fully suspends a creature's life functions, pausing a death timer. They are effectively dead until revived; lose power and they die."
  },
  {
    "name": "Cybernetic Part",
    "text": "Cybernetic implant replacing a body part; can be upgraded once."
  },
  {
    "name": "Cyberweapon",
    "text": "Replaces an arm with an integrated, concealable weapon (Am/EC still apply)."
  },
  {
    "name": "Datajack",
    "text": "Internal hacking interface with ACC/CTL/NET equal to your INT/WIS/CHA; keeps working past 0 HP but further data costs HP."
  },
  {
    "name": "Dermal Plating",
    "text": "Flexible armor plating skin: +1 AC. Upgradeable once."
  },
  {
    "name": "Encrypted Datastream",
    "text": "Ship comms upgrade: attempts to intercept your transmissions are at DisADV."
  },
  {
    "name": "Entertainment Suite",
    "text": "Ship downtime upgrade: +1 to Carousing Rolls."
  },
  {
    "name": "Focusing Aperture",
    "text": "Energy weapon upgrade: range increases to the next increment."
  },
  {
    "name": "Force Shield",
    "text": "Energy Shields upgrade using forcefields to mitigate projectile damage: +2 AC against ALL weapons. (Ship upgrade.)"
  },
  {
    "name": "Haptic Radar",
    "text": "Augmented-senses upgrade granting spatial awareness."
  }
];

export const DS_ADVANCED_TECH_NOTE: string = "The rulebook lists many more Advanced Tech items (pgs 232–247). The list above is a representative subset; the full list can be added.";

export const DS_QUICK_RULES: DsQuickRule[] = [
  {
    "title": "DarkSpace",
    "text": "Science fiction for Shadowdark. Characters are Spacers; 100% compatible with Shadowdark with some renamed terms: Ancestry → Species, Class → Archetype, Alignment → Motivation, magic → The Triad / tech."
  },
  {
    "title": "Citizens & Rookies",
    "text": "0-level Spacers (Citizens) have HP = CON mod (min 1), Beginner's Luck (proficiency with all gear until 1st level), and 1d4 items from the Citizen Starting Gear table. 1st-level Spacers (Rookies) get HP by Archetype + CON mod, and 2d6×10 starting credits."
  },
  {
    "title": "Luck Tokens",
    "text": "Spend a Luck Token to re-roll or gain advantage (per your Archetype/table). Several Archetypes grant and regain Luck Tokens."
  },
  {
    "title": "The Triad",
    "text": "Metaphysical powers (Body/Mind/Soul) resolved with a stat check; the DC beaten sets the damage/healing die. See the Triad reference."
  },
  {
    "title": "Energy Cell (EC) & Ammo (Am)",
    "text": "EC gear/weapons and Am weapons run out on a natural 1 attack roll — swap the cell/magazine as an action."
  },
  {
    "title": "Motivations",
    "text": "The Survivor, The Vile, or The Virtuous — each gives a one-time starting bonus and a recurring way to earn Luck Tokens."
  },
  {
    "title": "Starships",
    "text": "A ship is built like a character (Stats, HP = 10 + CON, AC = 10 + DEX), with a Classification, System/Feature slots, weapons, armor and components. It levels with the crew."
  }
];

export const DARKSPACE: DarkSpaceData = {
  terms: DS_TERMS,
  species: DS_SPECIES,
  humanNote: DS_HUMAN_NOTE,
  techSpecies: DS_TECH_SPECIES,
  archetypes: DS_ARCHETYPES,
  backgrounds: DS_BACKGROUNDS,
  motivations: DS_MOTIVATIONS,
  triad: DS_TRIAD,
  corruption: DS_CORRUPTION,
  credits: DS_CREDITS,
  citizenGear: DS_CITIZEN_GEAR,
  spacersKit: DS_SPACERS_KIT,
  gear: DS_GEAR,
  armor: DS_ARMOR,
  meleeWeapons: DS_MELEE_WEAPONS,
  rangedWeapons: DS_RANGED_WEAPONS,
  explosives: DS_EXPLOSIVES,
  weaponProps: DS_WEAPON_PROPS,
  ship: DS_SHIP,
  advancedTech: DS_ADVANCED_TECH,
  advancedTechNote: DS_ADVANCED_TECH_NOTE,
  quickRules: DS_QUICK_RULES,
};
