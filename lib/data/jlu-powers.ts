// GENERATED FILE - do not edit by hand.
// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs

import type { JluPower } from "./jlu-types";

export const JLU_POWERS = [
  {
    "name": "Animal Mimicry",
    "category": "Superpower",
    "paxPerGrade": 3,
    "summary": "Channel the Red to manifest animal traits — claws, wings, hide, hooves.",
    "note": "When used, manifest a number of Animal Adaptations equal to your Grade, spending 1 Resolve per activated Adaptation. Adaptations last for the Scene.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Beast Claws",
            "activation": "Adaptation",
            "text": "Manifest natural weapons. Your Damage Die increases by one step when making unarmed attacks."
          },
          {
            "name": "Reinforced Hide",
            "activation": "Adaptation",
            "text": "Your skin thickens like rhino hide. Gain a Defense bonus equal to your Grade in this power, +1."
          },
          {
            "name": "Bear Strength",
            "activation": "Adaptation",
            "text": "Channel a great animal's strength. Gain a bonus to Potency Tests equal to your Grade +2."
          },
          {
            "name": "Feline Agility",
            "activation": "Adaptation",
            "text": "Move with a predator's grace. Gain Advantage on your Agility Tests."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Eagle Wings",
            "activation": "Adaptation",
            "text": "Manifest wings, gaining Flight at a Grade equal to your Grade in this power (max 4)."
          },
          {
            "name": "Hunter Senses",
            "activation": "Adaptation",
            "text": "Manifest a wolf's smell or an eagle's sight, gaining Advantage on tests involving smell or sight."
          }
        ]
      }
    ]
  },
  {
    "name": "Combat Training",
    "category": "Kit Power",
    "summary": "Trained martial skill. Part of the Amazon Power Kit; in play, use Martial Training. Full rules expected in the full release.",
    "note": "Referenced by origin Power Kits.",
    "grades": []
  },
  {
    "name": "Elasticity",
    "category": "Superpower",
    "paxPerGrade": 5,
    "summary": "Your body has no fixed form and is completely malleable.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Malleable Body",
            "passive": true,
            "text": "Flatten to pass under doors and through cracks, and absorb damage. Gain Damage Reduction equal to your Grade +1 against Physical damage."
          },
          {
            "name": "Extended Reach",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Stretch your limbs to extend your reach up to Close range. Spend 1 extra Resolve each Round you keep it active."
          },
          {
            "name": "Parachute Form",
            "activation": "1 Action",
            "cost": "Resolve",
            "text": "Transform into a wide, flattened shape. Carry a number of allies equal to your Grade +2 and safely glide from any height."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Bounce Back",
            "activation": "Reaction",
            "cost": "2 Resolve",
            "text": "When hit, assume a ball-like form: you are knocked back 1 distance and take half the Damage dealt."
          },
          {
            "name": "Elastic Prison",
            "activation": "2 Actions",
            "cost": "2 Resolve",
            "text": "Wrap an adjacent target, who gains Immobilized and must win an Opposed Potency Test vs your Resistance to escape. Gain a bonus equal to your Grade on the Test."
          }
        ]
      }
    ]
  },
  {
    "name": "Elemental Manipulation",
    "category": "Superpower",
    "paxPerGrade": 5,
    "chooseElement": "Fire, Ice, Water, Air, Earth, Electricity, or Toxic (each element bought separately).",
    "damageAttr": "Potency or Spirit (chosen when added)",
    "summary": "Create, manipulate, amplify and diminish a chosen element. +2 per Grade on elemental Tests.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Elemental Ray",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "A ranged attack at Close range with your element, gaining +Grade to hit and Damage. On a Splash Page the target gains a status by element (Fire: Burned, Ice: Frozen, Earth: Immobilized, Electricity: Stunned, Toxic: Poisoned)."
          },
          {
            "name": "Elemental Shield",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Create an immobile barrier protecting you and a number of allies equal to your Grade, giving +Grade+1 Defense (solid elements like Earth/Ice give +Grade+2). Dismissed when an attack hits you."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Elemental Propulsion",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Propel yourself: until the end of your next Turn, move 2 Distances instead of 1 with movement actions."
          },
          {
            "name": "Elementalize",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Force the target to make an Opposed Resistance Test vs your Spirit. On a fail they suffer an element status until your next Turn (Fire: Engulfed, Water/Air: Slowed, Earth: Prone, Ice: Immobilized, Electricity: Stunned, Toxic: Engulfed)."
          }
        ]
      }
    ]
  },
  {
    "name": "Energy Blast",
    "category": "Superpower",
    "paxPerGrade": 4,
    "damageAttr": "Potency or Spirit (chosen when added)",
    "summary": "Project energy — eye-beams, hand-blasts, charged breath.",
    "note": "You may make a simple ranged attack with your Damage Die without spending Resolve (and without Energy Blast's extra benefits).",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Energy Shot",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Fire energy at an Adjacent or Close enemy. Attack and Damage gain a bonus of 1 + your Grade."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Brutal Blast",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "When you hit with Energy Blast, the target makes an Opposed Resistance Test vs your Potency or Spirit or is pushed 1 Distance."
          }
        ]
      }
    ]
  },
  {
    "name": "Enhanced Resistance",
    "category": "Superpower",
    "paxPerGrade": 3,
    "summary": "A body more durable than normal — hardened skin, plates, scales or superhuman constitution.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Robust Body",
            "passive": true,
            "text": "Your Resistance increases by +2, and Damage Reduction increases by +1 per Grade in Enhanced Resistance."
          },
          {
            "name": "Brace for Impact",
            "activation": "2 Actions",
            "cost": "1 Resolve",
            "text": "Until your next turn, add your Grade to Damage Reduction against the next attack you receive."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Superhuman Vigor",
            "passive": true,
            "text": "Immune to all non-magical poisons and diseases; hold your breath for hours; resist extreme heat and cold."
          }
        ]
      }
    ]
  },
  {
    "name": "Enhanced Senses",
    "category": "Kit Power",
    "summary": "Superhuman perception. Part of the Kryptonian Power Kit; full rules are not detailed in the Quickstart.",
    "note": "Referenced by origin Power Kits. Detailed rules expected in the full release.",
    "grades": []
  },
  {
    "name": "Exoskeleton",
    "category": "Technology",
    "paxPerGrade": 8,
    "summary": "Powered armor that turns an ordinary person into a one-man army. Counts as armor.",
    "note": "Choose 2 Improvements when acquired, +1 per further Grade. Activation cost by Grade: 1/2/4/6/8 Resolve. At 0 Resolve the armor enters emergency mode until recharged. Improvements: Strength Systems (Potency becomes 10 at G1, +3/Grade), Integrated Weaponry (Energy Blast at armor Grade), Flight Thrusters (Flight at armor Grade), Force Field Generator (Force Field at armor Grade), Composite Armor (+1 Defense/Grade, DR 2), Sensor Package (Special Senses at armor Grade), Sealed Suit (vacuum/underwater; immune to extreme heat/cold, Burned, Frozen), Onboard Computer (gain Tech Knowledge while worn).",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Build Your Exoskeleton",
            "text": "Choose 2 Improvements from the Exoskeleton list; add 1 more with each new Grade. See the note for the full Improvement list and per-Grade Resolve costs."
          }
        ]
      }
    ]
  },
  {
    "name": "Flight",
    "category": "Superpower",
    "paxPerGrade": 3,
    "summary": "Take to the skies at incredible speeds.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Basic Flight",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Take flight. In the air gain +Grade on Agility Tests; spend 1 Resolve each Round after the first that you stay airborne."
          },
          {
            "name": "Superhero Landing",
            "passive": true,
            "text": "When you enter a combat Scene by landing from flight, gain +Grade to your Initiative roll."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Aerial Ride",
            "passive": true,
            "text": "Carry one ally with you while flying, with no penalty to speed."
          },
          {
            "name": "Cruising Speed",
            "passive": true,
            "text": "If you have Superhuman Speed, your flight speed matches your running speed and you may use its Dash movement."
          }
        ]
      }
    ]
  },
  {
    "name": "Force Field",
    "category": "Superpower",
    "paxPerGrade": 3,
    "summary": "Generate powerful force fields to block attacks, form platforms, or imprison enemies.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Field Generation",
            "activation": "1 Action (or Reaction)",
            "cost": "1 Resolve",
            "text": "Generate a field on yourself (or an Adjacent target): +2 Defense and Damage Reduction 1 for 1 Round."
          },
          {
            "name": "I Won't Hold Much Longer!",
            "activation": "Reaction",
            "cost": "1 Resolve",
            "text": "Dramatically declare the field is failing: it gains a bonus equal to twice your Grade to Defense and Damage Reduction, then is dismissed at end of Turn."
          },
          {
            "name": "Saving Field",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "When used in Heroic Actions during Rescue Scenes, protect a small group of civilians, gaining +2 per Grade on field actions."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Expanded Protection",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Field Generation increases to +3 Defense and Damage Reduction 2, and may also affect 1 target within Close distance."
          },
          {
            "name": "Platform",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Create a static platform within Close distance supporting a number of targets equal to your Spirit (min 1), lasting 1 Round."
          }
        ]
      }
    ]
  },
  {
    "name": "Invulnerability",
    "category": "Kit Power",
    "summary": "Near-imperviousness to harm. Part of the Kryptonian Power Kit; full rules are not detailed in the Quickstart.",
    "note": "Referenced by origin Power Kits. Detailed rules expected in the full release.",
    "grades": []
  },
  {
    "name": "Marksman",
    "category": "Martial Training",
    "paxPerGrade": 6,
    "summary": "Master of ranged combat — bows, firearms, energy projectiles.",
    "note": "Techniques: at Grade 1 choose 2 (only 1 Passive); each further Grade grants 1 more of equal or lower Grade.",
    "grades": [
      {
        "grade": 1,
        "activationCost": "1 Resolve",
        "abilities": [
          {
            "name": "Favorite Weapon",
            "passive": true,
            "text": "Choose one ranged weapon type; using it, gain +Grade to Attack and Damage."
          },
          {
            "name": "Special Ammunition",
            "activation": "Free Action",
            "text": "At the start of your turn declare special ammo (uses = your Grade). Choose: Impact Shot (push 1 Distance) or Pinning Shot (Slowed 1 Round)."
          },
          {
            "name": "Ricochet Shot",
            "activation": "1 Action",
            "text": "Attack a target; on a hit, ricochet to a second target within Close, dealing half Damage."
          }
        ]
      },
      {
        "grade": 2,
        "activationCost": "2 Resolve",
        "abilities": [
          {
            "name": "Instinctive Shooter",
            "passive": true,
            "text": "Make ranged attacks against Adjacent targets without Disadvantage."
          },
          {
            "name": "Special Ammunition (Improved)",
            "text": "Adds options: Smoke Shot (cover + Blinded to Adjacent) and Boxing Glove Shot (Opposed Resistance vs your Accuracy or Stunned)."
          },
          {
            "name": "Barrage of Shots",
            "activation": "2 Actions",
            "text": "Fire into an area, attacking up to 3 targets within Close of a chosen point, each taking half Damage."
          }
        ]
      }
    ]
  },
  {
    "name": "Martial Master",
    "category": "Martial Training",
    "paxPerGrade": 6,
    "summary": "Your body is a living weapon — unarmed strikes, holds and stuns.",
    "note": "Techniques: at Grade 1 you gain access to two techniques (only 1 Passive); each further Grade grants 1 more of equal or lower Grade.",
    "grades": [
      {
        "grade": 1,
        "activationCost": "1 Resolve",
        "abilities": [
          {
            "name": "Acrobatic Fighter",
            "passive": true,
            "text": "Add your Martial Master Grade to your Defense."
          },
          {
            "name": "Martial Artist",
            "passive": true,
            "text": "Add your Martial Master Grade to your Spirit and to your Unarmed Attack Tests."
          },
          {
            "name": "Brawler",
            "passive": true,
            "text": "Add your Martial Master Grade to your Potency and to Unarmed Attack Damage."
          },
          {
            "name": "Jab-Cross",
            "passive": true,
            "text": "Your Multiple-attack penalty becomes -4 instead of -5."
          },
          {
            "name": "High Guard",
            "activation": "1 Action",
            "text": "Your Block action gains a bonus equal to your Martial Master Grade."
          },
          {
            "name": "Precise Strike",
            "activation": "1 Action",
            "text": "Make an Unarmed Attack, adding your Damage Die as a bonus to the Attack Test."
          }
        ]
      },
      {
        "grade": 2,
        "activationCost": "2 Resolve",
        "abilities": [
          {
            "name": "Body Fortification",
            "passive": true,
            "text": "Add your Martial Master Grade to your Damage Reduction and total Resolve."
          },
          {
            "name": "Fists of Steel",
            "activation": "1 Action",
            "text": "Until end of turn, Unarmed Attacks deal additional Damage equal to your Grade +1."
          },
          {
            "name": "Acrobatic Kicks",
            "activation": "1 Action",
            "text": "Move one distance and kick a group; gain Attack/Damage bonus equal to enemies surrounding you. Advantage vs a Group descriptor."
          },
          {
            "name": "Swift Sweep",
            "activation": "1 Action",
            "text": "Sweep up to 3 adjacent enemies (Attack at -2, no damage); those hit lose an Opposed Agility Test vs your Potency or gain Prone."
          }
        ]
      }
    ]
  },
  {
    "name": "Speed Force",
    "category": "Superpower",
    "paxPerGrade": 12,
    "summary": "An avatar of the fundamental force of speed — far beyond a mere speedster.",
    "note": "A character may not possess both Speed Force and Superhuman Speed.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Kinetic Connection",
            "passive": true,
            "text": "Your connection grants +3 Agility per Grade in this power."
          },
          {
            "name": "Kinetic Impact",
            "passive": true,
            "text": "When you spend a Movement Action before a Melee Attack, you may use Agility instead of Potency for Damage."
          },
          {
            "name": "Accelerated Mind",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Absorb a data source in a fraction of a second, gaining Advantage on your next Mind Test to analyze or learn about it."
          },
          {
            "name": "Accelerated Movement",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Move two Distances with a single Movement Action."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Barrage of Blows",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "With a single Attack roll, strike multiple times, dealing +1 Damage Die."
          },
          {
            "name": "Instant Punch",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Make a Melee Attack against any target up to Far distance away."
          },
          {
            "name": "Scarlet Tornado",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Create a vortex: attack all targets within Close, dealing half your Agility (round up), or pull/push them 1 Distance."
          },
          {
            "name": "Accelerated Burst",
            "activation": "Free",
            "cost": "2 Resolve",
            "text": "Push faster: gain +1 Movement Action or +1 Dodge this Turn. At the end of the Scene, mark one Condition."
          }
        ]
      }
    ]
  },
  {
    "name": "Super Strength",
    "category": "Superpower",
    "paxPerGrade": 3,
    "summary": "Herculean feats — lifting vehicles, shattering walls, hurling debris.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Brute Strength",
            "passive": true,
            "text": "Your Potency increases by +2 per Grade in Super Strength."
          },
          {
            "name": "Powerful Strike",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "On a Melee Attack that hits, roll one additional Damage Die."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Saving Strength",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "In Rescue Scenes using Super Strength in Heroic Actions, gain Advantage on your Tests."
          }
        ]
      }
    ]
  },
  {
    "name": "Super-Breath",
    "category": "Kit Power",
    "summary": "Gale-force breath and freezing exhalation. Part of the Kryptonian Power Kit; full rules are not detailed in the Quickstart.",
    "note": "Referenced by origin Power Kits. Detailed rules expected in the full release.",
    "grades": []
  },
  {
    "name": "Superhuman Speed",
    "category": "Superpower",
    "paxPerGrade": 3,
    "summary": "Very fast — incredible feats of agility and momentum (but not a Speed Force avatar).",
    "note": "A character may not possess both Superhuman Speed and Speed Force.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Natural Runner",
            "passive": true,
            "text": "Your Agility increases by +2 per Grade in Superhuman Speed."
          },
          {
            "name": "Dash",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "While on the ground, move up to two Distances instead of one."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Quick Reflexes",
            "passive": true,
            "text": "Add your Grade in Superhuman Speed to your Initiative rolls."
          }
        ]
      }
    ]
  },
  {
    "name": "Swordsman",
    "category": "Martial Training",
    "paxPerGrade": 6,
    "summary": "Mastery of melee weapons — sword, trident, or staff as an extension of your will.",
    "note": "Techniques: at Grade 1 choose 2 (only 1 Passive); each further Grade grants 1 more Technique of equal or lower Grade.",
    "grades": [
      {
        "grade": 1,
        "activationCost": "1 Resolve",
        "abilities": [
          {
            "name": "Singular Weapon",
            "passive": true,
            "text": "Fighting with a single type of melee weapon, add your Swordsman Grade to Attack Tests and Defense."
          },
          {
            "name": "Two-Weapon Fighting",
            "passive": true,
            "text": "With a weapon in each hand, your Multiple-attack penalty becomes -4 instead of -5."
          },
          {
            "name": "Sudden Charge",
            "activation": "1 Action",
            "text": "Move one distance and attack; the attack adds half your Agility bonus to the Attack Test."
          },
          {
            "name": "Violent Attack",
            "activation": "1 Action",
            "text": "Add double your Swordsman Grade to damage, but roll the Attack Test with Disadvantage."
          },
          {
            "name": "Defensive Stance",
            "activation": "1 Action",
            "text": "Your Block action gains a bonus equal to your Swordsman Grade."
          },
          {
            "name": "Precise Attack",
            "activation": "1 Action",
            "text": "Add your Damage Die as a bonus to your Attack Test."
          }
        ]
      },
      {
        "grade": 2,
        "activationCost": "2 Resolve",
        "abilities": [
          {
            "name": "Quick Draw",
            "passive": true,
            "text": "Gain +Grade to Initiative; your first attack each Scene gains Advantage."
          },
          {
            "name": "Parry Blow",
            "activation": "Reaction",
            "text": "When targeted by a melee attack, make an Opposed Test pitting your Attack against theirs; if you win, their attack is negated."
          },
          {
            "name": "Arc Attack",
            "activation": "1 Action",
            "text": "One attack hits up to 3 adjacent enemies, each taking half your normal Damage."
          },
          {
            "name": "Tempest of Blows",
            "activation": "2 Actions",
            "text": "Three attacks in succession; the Multiple-attack penalty is only -2 for each."
          }
        ]
      }
    ]
  },
  {
    "name": "Technological Spheres",
    "category": "Technology",
    "paxPerGrade": 4,
    "summary": "High-tech drones that act as your eyes, shields and weapons.",
    "note": "Active Functions = your Grade. Identical Functions don't stack. At 0 Resolve the Spheres deactivate.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Defense Mode",
            "activation": "Free",
            "cost": "2 Resolve",
            "text": "Spheres orbit and intercept: gain +Grade Defense until end of Scene."
          },
          {
            "name": "Attack Mode",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Gain Energy Blast at your Grade until end of Scene."
          },
          {
            "name": "Propulsion Mode",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Gain Flight (Grade 1) until end of Scene."
          },
          {
            "name": "Electromagnetic Pulse",
            "activation": "1 Action",
            "cost": "3 Resolve",
            "text": "Nearby tech-based/robotic enemies make a Resistance Test (Tension 16) or lose technological abilities for 1 Round."
          },
          {
            "name": "Tactical Analysis",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Scan the area: Advantage on your next Mind Test to find clues, hidden enemies or tech anomalies in the Zone until end of Scene."
          }
        ]
      }
    ]
  },
  {
    "name": "Teleportation",
    "category": "Superpower",
    "paxPerGrade": 5,
    "summary": "Bend space or pierce dimensions to travel instantly, ignoring barriers.",
    "grades": [
      {
        "grade": 1,
        "abilities": [
          {
            "name": "Spatial Sense",
            "passive": true,
            "text": "Gain +Grade on Agility checks involving moving/jumping and +Grade+1 to Defense."
          },
          {
            "name": "Tactical Jump",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Blink to any point you can see within Near range. In Rescue Scenes, ignore difficult terrain and simply appear at victims in precarious spots."
          },
          {
            "name": "Space Warp",
            "activation": "1 Action",
            "cost": "1 Resolve",
            "text": "Teleport Adjacent to an enemy and make a Melee Attack in the same movement with Advantage."
          }
        ]
      },
      {
        "grade": 2,
        "abilities": [
          {
            "name": "Quick Extraction",
            "activation": "1 Action",
            "cost": "2 Resolve",
            "text": "Touch an ally, civilian or object (up to motorcycle-sized) and leap to any Distant point. To teleport an enemy, win an Opposed Agility Test vs their higher of Potency/Agility."
          },
          {
            "name": "Evasive Teleport",
            "activation": "Reaction",
            "cost": "2 Resolve",
            "text": "When targeted by an attack, add your Teleportation Grade to Block or Dodge; if it misses, reappear anywhere within Near range."
          }
        ]
      }
    ]
  }
] as unknown as JluPower[];
