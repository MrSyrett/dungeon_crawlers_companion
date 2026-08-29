// GENERATED FILE - do not edit by hand.
// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs

import type { SwCharacter } from "./sw-types";

export const SW_CHARACTERS: SwCharacter[] = [
  {
    "name": "Standard Stormtrooper",
    "group": "Imperial",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "brawling 3D",
      "blaster 4D (reduced to 3D by armor)",
      "brawling parry 4D (reduced to 3D)",
      "dodge 4D (reduced to 3D)",
      "all other attributes and skills 2D"
    ],
    "equipment": [
      "Stormtrooper armor (+1D: strength 2D counts as 3D for damage purposes; dexterity 2D and all dexterity skills reduced by 1D)",
      "Stormtrooper blaster (damage 4D); blaster rifles (5D) are sometimes used"
    ],
    "book": "core",
    "page": 84,
    "description": "Quick-and-dirty stock character for minor Imperial troopers.",
    "notes": "Loyalty: completely loyal to the Empire; cannot be bribed, seduced or blackmailed into betraying the Emperor. Can be conned and tricked, but they aren't stupid. Used to responding to orders instantly, so player characters dressed as officers (preferably with matching identification) and good command skills stand an excellent chance of bluffing past them. Not suicidal: they surrender when confronted with overwhelming force. Speech: voices are filtered through helmet speakers; cup your hands over your mouth when speaking as one."
  },
  {
    "name": "Standard Human",
    "group": "Civilian",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "all skills 2D"
    ],
    "equipment": [],
    "book": "core",
    "page": 85,
    "description": "Innocent bystanders and the like who have no particular importance to the plot but for whom you need to make skill rolls: assume John or Jane Doe has 2D in all attributes and skills.",
    "notes": "The average player character attribute is 3D because player characters are heroes."
  },
  {
    "name": "Standard Specialist",
    "group": "Civilian",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "any three skills 4D (the skills of his profession; many specialists have bargain as one of them)"
    ],
    "equipment": [],
    "book": "core",
    "page": 85,
    "description": "Professional NPCs the player characters visit to purchase goods or services (repairmen, merchants, etc.). 4D is the skill of the average professional; on sophisticated planets, or for a higher fee, a specialist with a considerably higher skill can be found. Many employ specialty Droids who are even better with specific skills."
  },
  {
    "name": "R2 Astromech Droid",
    "group": "Droid",
    "description": "Sample Droid built with the Companion's Droid creation rules. Height 1 meter, weight 50 kilograms. Speed code 2D.",
    "attributes": {
      "Dexterity": 3,
      "Knowledge": 3,
      "Mechanical": 3,
      "Perception": 3,
      "Strength": 3,
      "Technical": 6
    },
    "skills": [
      "binary language 3D",
      "computer programming & repair 7D",
      "starship repair 7D"
    ],
    "equipment": [
      "Two wheeled legs plus retractable third leg",
      "Two arms, normally retracted (one heavy grasper, one for fine work)",
      "One video sensor extendable almost a meter from the body (+1D special feature)",
      "Small arc welder (starship repair; emergency defense)",
      "Small buzz saw",
      "Video screen for data display, with holographic projection (+1D special feature)",
      "High pitch acoustic signaller (sound coded for Binary)",
      "One small fire extinguisher"
    ],
    "notes": "Speed code 2D; +1D armor (STR 1D +1D armor). The video sensor extension and the holographic option each cost an additional 1D of building dice as special features.",
    "book": "companion",
    "page": 29,
    "superseded": {
      "name": "R2 Astromech Droid",
      "group": "Droid",
      "attributes": {
        "Dexterity": 3,
        "Knowledge": 3,
        "Mechanical": 3,
        "Perception": 3,
        "Strength": 3,
        "Technical": 3
      },
      "skills": [
        "computer programming & repair 7D",
        "starship repair 7D"
      ],
      "equipment": [
        "Three wheeled legs (has problems with stairs)",
        "Two arms, normally retracted inside body compartments: one heavy grasper, one for fine work",
        "One video sensor (eye), extendable almost a meter from the main body",
        "Small electric arc welder (starship repair; can be used in an emergency for defense)",
        "Small buzz saw (starship repair)",
        "Video screen for data display; can also project data as a holographic image",
        "One small fire extinguisher"
      ],
      "book": "core",
      "page": 83,
      "description": "Height 1 meter (3' 2\"); weight 50 kilograms. All Droid attributes are 1D. Cost 1000 credits (Cost Chart).",
      "notes": "R2 units are not equipped to communicate in Basic. They communicate with other machines by plugging into standard input-output ports and transmitting data, and have a 'beeps and whistles' language which many other Droids can interpret; with humans they normally display data on their video screens. An R2 can store pre-calculated coordinates for up to ten hyperdrive routes for an X-wing (p.58). Move 5 m per round, 10 m at top speed."
    }
  },
  {
    "name": "3PO Human-Cyborg Relations Droid",
    "group": "Droid",
    "description": "Sample protocol Droid built with the Companion's Droid creation rules. Height 1.7 meters, weight 50 kilograms.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 3,
      "Perception": 6,
      "Strength": 3,
      "Technical": 3
    },
    "skills": [
      "alien races 4D",
      "cultures 4D",
      "languages 10D",
      "planetary systems 3D"
    ],
    "equipment": [
      "Two legs (a single method of locomotion)",
      "Two arms (1D each)",
      "Two video sensors (1D each)",
      "Broad-band antenna receiver",
      "Vocabulator speech/sound system capable of an extraordinarily wide range of sounds"
    ],
    "notes": "The legs count as a single method of locomotion, while each arm and each video sensor costs 1D of building dice.",
    "book": "companion",
    "page": 29,
    "superseded": {
      "name": "3PO Human-Cyborg Relations Droid",
      "group": "Droid",
      "attributes": {
        "Dexterity": 3,
        "Knowledge": 3,
        "Mechanical": 3,
        "Perception": 3,
        "Strength": 3,
        "Technical": 3
      },
      "skills": [
        "languages 10D",
        "cultures 4D"
      ],
      "equipment": [
        "Two legs",
        "Two arms",
        "Two video sensors (eyes)",
        "Speaker capable of providing an extraordinarily wide range of sounds"
      ],
      "book": "core",
      "page": 83,
      "description": "Height 1.7 meters (5' 6\"); weight 50 kilograms. All Droid attributes are 1D. Cost 2000 credits (Cost Chart).",
      "notes": "Most Droids are programmed to avoid injuring humans and other sapients and will not do so even when ordered; unless a Droid has dice allocated to combat skills, it may not attempt to injure others. Move 5 m per round, 10 m at top speed."
    }
  },
  {
    "name": "Odeon Farnish, Customs Inspector",
    "group": "Civilian",
    "attributes": {},
    "skills": [
      "search 5D+1",
      "bargain 4D",
      "con 4D",
      "bureaucracy 6D"
    ],
    "equipment": [],
    "book": "core",
    "page": 97,
    "description": "Species: Lexlar, a three-foot-tall hair-covered hominid (looks like 'Cousin It'). Speech: always uses infinitives: 'To present your passport now, hairless one.' Example NPC from the adventure design chapter; only the codes he is expected to use are given.",
    "notes": "Objective: willing to be bribed by serious smugglers. Wants promotion, so insists on searching everyone's bags and catching minor infractions. Zealous but greedy."
  },
  {
    "name": "Mynock",
    "group": "Creature",
    "attributes": {
      "Strength": 3,
      "Dexterity": 9
    },
    "skills": [
      "claws: damage 1D",
      "bite: damage 2D"
    ],
    "equipment": [],
    "book": "core",
    "page": 102,
    "description": "Silicon-based parasitic creatures that look like giant manta-rays, with black leathery wings; one of the few creatures that can live in outer space. They attach themselves to exposed power lines and passing starships and chew on the power cables (p.60). Alien knowledge rolls of 10 or better are needed to identify them.",
    "notes": "Attack difficulty number 5 (hand-to-hand rules). PCs make opposed dexterity rolls against the Mynocks to act before they reach their targets. A Mynock that attaches its suction-cup mouth to a Droid or a blaster quickly drains half its energy; after two more rounds attached both are powerless. Shooting a Mynock attached to a PC or Droid requires 10 or better; misses hit the character under attack."
  },
  {
    "name": "Stormtroopers (Rebel Breakout)",
    "group": "Adventure",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "brawling 3D",
      "blaster 4D (reduced to 3D)",
      "brawling parry 4D (reduced to 3D)",
      "dodge 4D (reduced to 3D)",
      "all other attributes and skills 2D"
    ],
    "equipment": [
      "Stormtrooper armor (STR 2D counts as 3D for damage purposes; DEX 2D reduced to 1D)",
      "Blaster",
      "Medium repeat blaster emplacement at the mine entrance (damage 7D; difficulty to hit: point blank 5, short 10, medium 15, long 20)"
    ],
    "book": "core",
    "page": 103,
    "description": "Barezz commands a small stormtrooper squadron: three times as many stormtroopers as there are PCs (18 for six PCs). Tough, aggressive and persistent, not stupid; they know when to retreat and when to push forward.",
    "notes": "Ordered to capture the PCs if possible for interrogation, but will do whatever is necessary to stop them escaping. If four or more are incapacitated or killed, the rest fall back to regroup."
  },
  {
    "name": "Mar Barezz, ISB Agent",
    "group": "Adventure",
    "attributes": {
      "Dexterity": 12,
      "Strength": 11,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Technical": 6
    },
    "skills": [
      "blaster 5D",
      "brawling 5D+2",
      "all other attributes 2D"
    ],
    "equipment": [
      "Thermal detonator",
      "Blaster"
    ],
    "book": "core",
    "page": 106,
    "description": "A cunning Imperial Security Bureau officer who guessed that the Rebel agent Tiree was recruiting Rebels at Mesa 291 and led a squadron of stormtroopers to the mine to capture them. Holds Imperial warrants charging the PCs with treason and taunts them over the mine's PA system.",
    "notes": "Stays back out of sight and lets the troopers do the fighting; wants prisoners to interrogate. In Episode Three he jumps out wielding a thermal detonator and throws it at the PCs (difficulty 15 throw)."
  },
  {
    "name": "R2-D0 'Deo'",
    "group": "Adventure",
    "attributes": {
      "Dexterity": 3,
      "Knowledge": 3,
      "Mechanical": 3,
      "Perception": 3,
      "Strength": 3,
      "Technical": 3
    },
    "skills": [
      "as R2 astromech Droid: computer programming & repair 7D",
      "starship repair 7D"
    ],
    "equipment": [
      "Standard R2 astromech equipment",
      "Infrared receptor",
      "Built-in sensors"
    ],
    "book": "core",
    "page": 103,
    "description": "Tiree's trusted astromech Droid, the main NPC of Rebel Breakout. Bright, but stubborn and hard-headed; feels a wide range of emotions and expresses them through beeps, whistles, whines and shrieks. Knows the way to the hidden escape ship (he thinks) and carries the hyperspace jump coordinates to a Rebel base.",
    "notes": "Will never purposely injure the PCs or endanger himself, though if threatened he may charge into a pack of stormtroopers. Through a computer port he can access the mine's PA system, display a partial map, open closed blast doors, track nearby stormtroopers, jam comlinks, estimate the depth of the main shaft, control the shaft winches and emergency systems. A Mynock attached to him drains half his energy; PCs can recharge him with a live power cable and a moderate Technical roll (15). Only by fitting into a Y-wing's Droid socket can he feed the jump coordinates to the fighters' nav computers."
  },
  {
    "name": "Tiree, Rebel Agent",
    "group": "Adventure",
    "attributes": {},
    "skills": [],
    "equipment": [
      "Smouldering flight suit",
      "Shuttle (wrecked)",
      "Four hidden Y-wing starfighters"
    ],
    "book": "core",
    "page": 107,
    "description": "The Rebel agent who told the PCs to meet him at Mesa 291 on Bothan's Planet and promised to fly them to a Rebel base. When the ISB broke his cover he left his astromech Droid and supplies in the mine and drew the Imperials away in his shuttle; two AT-ATs damaged it and he crash-landed in the cavern. Found wounded (grievous injuries) beside a computer port; a moderate medical roll (15) rouses him so he can walk on his own. No attribute or skill codes are printed.",
    "notes": "After the escape he is placed in a bacta rejuve tank at the secret Rebel base."
  },
  {
    "name": "Major Lariss",
    "group": "Imperial",
    "description": "A career Imperial who specializes in quick military takeovers of native governments. He prides himself on being an expert in the cultures he ruthlessly destroys but has only superficial knowledge of them. Extremely sensitive about his appearance, especially his gargantuan nose (Alliance agents call him 'Major Nose'). Angering him on two points gets the Rebels exiled to Captivity; on all three, executed.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 5,
      "Mechanical": 3,
      "Perception": 10,
      "Strength": 9,
      "Technical": 3
    },
    "skills": [
      "blaster 3D",
      "dodge 3D+1",
      "melee parry 3D",
      "melee 3D+1",
      "alien races 2D+2",
      "cultures 2D+2",
      "command 4D+1"
    ],
    "equipment": [
      "Blaster pistol (damage 4D)",
      "Lajik whip (damage STR+1D), a souvenir from a previous campaign"
    ],
    "book": "companion",
    "page": 69
  },
  {
    "name": "Lt. Wachten",
    "group": "Imperial",
    "description": "Major Lariss's 'Wrathor' during the throne room protocol. Large, with a broad face; his voice is loud and harsh.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "dodge 3D",
      "command 4D"
    ],
    "equipment": [
      "Blaster pistol"
    ],
    "notes": "All other attributes and skills 2D.",
    "book": "companion",
    "page": 69
  },
  {
    "name": "Lt. Lewis",
    "group": "Imperial",
    "description": "Major Lariss's 'Conciliator'. Slight; speaks rapidly and clearly.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "blaster 3D",
      "dodge 3D",
      "cultures 3D",
      "bargain 4D"
    ],
    "equipment": [],
    "notes": "All other attributes and skills 2D.",
    "book": "companion",
    "page": 69
  },
  {
    "name": "Imperial Stormtroopers (throne room platoon)",
    "group": "Imperial",
    "description": "A platoon seals off the throne room; nine troopers watch the Rajah and his court and combine fire on the first Rebel who tries to escape or pulls a weapon. Use the core stormtrooper statistics; stormtroopers who can see a target may combine fire without limit.",
    "attributes": {},
    "skills": [],
    "equipment": [
      "Stormtrooper armor with sensor/com gear",
      "Blaster rifle"
    ],
    "book": "companion",
    "page": 70
  },
  {
    "name": "Rolo's Ruffians",
    "group": "Civilian",
    "description": "Andews Rolo's band of exiled cutthroats on Captivity (28 of them). They use rocks as grenades, doing STR damage at close and medium range and STR-1D at long range, and begin their attack at medium range.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "brawling parry 3D",
      "dodge 3D",
      "grenade 4D",
      "melee 3D",
      "melee parry 3D",
      "brawling 3D",
      "climbing/jumping 3D+1"
    ],
    "equipment": [
      "Rocks (thrown as grenades, STR damage)"
    ],
    "notes": "All other attributes and skills 2D.",
    "book": "companion",
    "page": 71
  },
  {
    "name": "Volq",
    "group": "Civilian",
    "description": "Rolo's champion, a slab of a man who looks like a walking chunk of cliff. He fights the Rebels' chosen brawler in a four-meter ring until one is unconscious.",
    "attributes": {
      "Dexterity": 9,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 9,
      "Strength": 12,
      "Technical": 6
    },
    "skills": [
      "blaster 4D",
      "brawling parry 4D",
      "dodge 4D+1",
      "brawling 5D"
    ],
    "equipment": [],
    "notes": "All other attributes and skills 2D. Volq's skin has been treated to increase his Strength to 4D+2 for damage purposes; the process lowered his sensory awareness - all Perception and Knowledge-based rolls are reduced by one pip.",
    "book": "companion",
    "page": 71
  },
  {
    "name": "Captain Dedelin",
    "group": "Civilian",
    "description": "Former Imperial Navy captain and hero of the New Order whose outspoken criticism of Imperial policy got him exiled to Captivity, where he leads the surviving political prisoners. Still wears his captain's cap. He believes Rebels who tell him the truth, reasoning a lie would sound more plausible.",
    "attributes": {
      "Dexterity": 8,
      "Knowledge": 9,
      "Mechanical": 11,
      "Perception": 10,
      "Strength": 7,
      "Technical": 9
    },
    "skills": [
      "blaster 3D+1",
      "brawling parry 3D+1",
      "dodge 4D",
      "heavy weapons 5D",
      "melee parry 4D",
      "melee 4D",
      "planetary systems 5D",
      "survival 5D",
      "technology 4D",
      "astrogation 4D",
      "starship gunnery 5D",
      "starship shields 4D",
      "command 6D",
      "brawling 4D",
      "climbing/jumping 4D",
      "stamina 4D",
      "starship repair 4D"
    ],
    "equipment": [
      "Crude vibroaxe (damage STR+1D+2)",
      "Captain's cap"
    ],
    "book": "companion",
    "page": 72
  },
  {
    "name": "Dedelin's Crew",
    "group": "Civilian",
    "description": "Exiled senators, sympathizers and loyal crew who follow Captain Dedelin; a dozen accompany him to the ransom exchange.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "brawling parry 3D+2",
      "dodge 3D",
      "grenade 4D",
      "melee 3D",
      "melee parry 3D",
      "brawling 4D",
      "climbing/jumping 3D+1"
    ],
    "equipment": [],
    "notes": "All other attributes and skills 2D.",
    "book": "companion",
    "page": 72
  },
  {
    "name": "Old Guards",
    "group": "Civilian",
    "description": "A pair of elderly exiles patrolling the electrified wire fence around Dedelin's camp. Rebels arriving without Dedelin must convince them with a con roll: Moderate if telling the truth, Difficult if stretching it, Very Difficult for a complete fabrication.",
    "attributes": {
      "Dexterity": 6,
      "Knowledge": 6,
      "Mechanical": 6,
      "Perception": 6,
      "Strength": 6,
      "Technical": 6
    },
    "skills": [
      "melee 2D+2",
      "brawling 2D+2"
    ],
    "equipment": [],
    "notes": "All other attributes and skills 2D.",
    "book": "companion",
    "page": 74
  },
  {
    "name": "TIE Pilots (Grehollo station patrol)",
    "group": "Imperial",
    "description": "Pilots of the four TIE/rc fighters that strafe Borolol's Claw. Combined fire is not possible due to the storm.",
    "attributes": {},
    "skills": [
      "starship piloting 4D+2",
      "starship gunnery 5D+2"
    ],
    "equipment": [
      "TIE/rc starfighter"
    ],
    "book": "companion",
    "page": 75
  }
];
