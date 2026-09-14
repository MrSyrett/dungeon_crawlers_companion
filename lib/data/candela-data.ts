// GENERATED from public/tools-data/co-data.js — do not edit by hand.
export type CoDrive = { name: string; blurb: string; actions: string[] };
export type CoAction = { name: string; drive: string; sub: string; desc: string };
export type CoAbility = { name: string; desc: string };
export type CoSpecialty = {
  name: string; primaryDrive: string; focus: string;
  starting: { actions: Record<string, number>; drives: Record<string, number> };
  gilded: string; illumination: string[]; gear: string[]; abilities: CoAbility[];
};
export type CoRole = { role: string; mastery: string; desc: string; abilities: CoAbility[]; specialties: CoSpecialty[] };
export type CoGear = { name: string; type: string; desc: string };
export type CoMark = { name: string; desc: string };
export type CoRule = { title: string; text: string };

export const CO_DRIVES: CoDrive[] = [
  {
    "name": "Nerve",
    "blurb": "Grit, daring, and physical resolve.",
    "actions": [
      "Move",
      "Strike",
      "Control"
    ]
  },
  {
    "name": "Cunning",
    "blurb": "Wit, charm, and social savvy.",
    "actions": [
      "Sway",
      "Read",
      "Hide"
    ]
  },
  {
    "name": "Intuition",
    "blurb": "Perception, insight, and arcane sense.",
    "actions": [
      "Survey",
      "Focus",
      "Sense"
    ]
  }
];

export const CO_ACTIONS: CoAction[] = [
  {
    "name": "Move",
    "drive": "Nerve",
    "sub": "Run · Dodge · Navigate",
    "desc": "Physical movement — climbing, sprinting, leaping, dodging, leading a charge."
  },
  {
    "name": "Strike",
    "drive": "Nerve",
    "sub": "Punch · Break · Grapple",
    "desc": "Raw strength applied — hitting an enemy, lifting, wrestling, busting a door."
  },
  {
    "name": "Control",
    "drive": "Nerve",
    "sub": "Drive · Shoot · Finesse",
    "desc": "Dexterity and hand-eye coordination — locks, thrown blades, firearms, vehicles."
  },
  {
    "name": "Sway",
    "drive": "Cunning",
    "sub": "Convince · Command · Consort",
    "desc": "Charisma and presence — intimidating, charming, ordering, persuading."
  },
  {
    "name": "Read",
    "drive": "Cunning",
    "sub": "Interpret Body Language · Spot Lies · Gather Motives",
    "desc": "Insight into people — reading intentions, spotting the suspicious, decoding."
  },
  {
    "name": "Hide",
    "drive": "Cunning",
    "sub": "Sneak · Deceive · Sleight of Hand",
    "desc": "Blending in and misdirection — sneaking, disguises, distractions, pickpocketing."
  },
  {
    "name": "Survey",
    "drive": "Intuition",
    "sub": "Search · Track · Spot",
    "desc": "Situational awareness — following tracks, finding exits, spotting clues."
  },
  {
    "name": "Focus",
    "drive": "Intuition",
    "sub": "Inspect · Analyze · Remember",
    "desc": "Mental acuity — inspecting artifacts, translating text, recalling weaknesses."
  },
  {
    "name": "Sense",
    "drive": "Intuition",
    "sub": "Attune · Channel · Reveal",
    "desc": "Connection to magick — examining bleed, channeling, perceiving phenomena."
  }
];

export const CO_ROLES: CoRole[] = [
  {
    "role": "Face",
    "mastery": "the people",
    "desc": "The spokesperson, heart, or charismatic member — confident, skilled in acting, persuasion, or motivation.",
    "abilities": [
      {
        "name": "I Know a Guy",
        "desc": "Once per assignment, ask the GM who you know nearby who could help; they name the NPC and why they have insight into the case."
      },
      {
        "name": "Sweet Talk",
        "desc": "After small talk with someone, add +1d to Read rolls targeting them. If your Cunning resistance is 2+, that die is gilded."
      },
      {
        "name": "Cool Under Pressure",
        "desc": "On any high-stakes roll, you may spend Cunning in place of the drive the action normally falls under."
      }
    ],
    "specialties": [
      {
        "name": "Journalist",
        "primaryDrive": "Cunning",
        "focus": "Collecting and assessing information.",
        "starting": {
          "actions": {
            "Read": 1,
            "Survey": 2,
            "Focus": 1,
            "Sense": 1
          },
          "drives": {
            "Cunning": 3
          }
        },
        "gilded": "Survey",
        "illumination": [
          "Gather Statements",
          "Hunt Down a Lead",
          "Speak Truth to Power"
        ],
        "gear": [
          "Press Credentials",
          "Camera"
        ],
        "abilities": [
          {
            "name": "Insider Access",
            "desc": "Once per assignment, use Press Credentials to automatically gain access to an important person or place."
          },
          {
            "name": "Open Book",
            "desc": "When you connect by sharing something deeply personal, add dice equal to your Cunning resistance to a Sway roll. On a success, they reciprocate."
          },
          {
            "name": "Lie Detector",
            "desc": "On a Read roll to tell if someone is truthful, gild an extra die; the first Cunning you spend is worth +2d."
          },
          {
            "name": "Press Conference",
            "desc": "Spend 1 Cunning to assemble a crowd (announce, question, distract). All Cunning rolls at the assembly get +1d."
          },
          {
            "name": "In the Trenches",
            "desc": "Once per assignment, burn 1 Cunning resistance to soak a Body mark."
          },
          {
            "name": "Well-Researched",
            "desc": "Spend 1 Intuition to ask the GM a specific question about a place, group, or concept you may have researched beforehand."
          }
        ]
      },
      {
        "name": "Magician",
        "primaryDrive": "Intuition",
        "focus": "Performing and detecting tricks.",
        "starting": {
          "actions": {
            "Sway": 2,
            "Read": 1,
            "Hide": 1,
            "Focus": 1
          },
          "drives": {
            "Cunning": 1,
            "Intuition": 2
          }
        },
        "gilded": "Sway",
        "illumination": [
          "Perform a Trick",
          "Spot a Ruse",
          "Seek Out Real Magick"
        ],
        "gear": [
          "Deck of Cards",
          "Hidden Compartment"
        ],
        "abilities": [
          {
            "name": "Misdirection",
            "desc": "When you distract a target from what is really happening, make a Hide roll; the first Cunning you or an ally spends is worth +2d."
          },
          {
            "name": "Escape Artist",
            "desc": "Spend 1 Nerve to automatically escape ropes, cuffs, manacles, or a grappling creature."
          },
          {
            "name": "Practiced Patter",
            "desc": "On a Sway or Hide roll, you may spend Intuition instead of Cunning."
          },
          {
            "name": "Uncanny Eye",
            "desc": "Spend 1 Intuition to ask the GM: how can I leverage something here? what doesn’t work as it appears? what is out of place?"
          },
          {
            "name": "Flourish",
            "desc": "On a roll where you could spend Cunning, if you miss or get a mixed success, spend 2 Cunning to push the result up one tier."
          },
          {
            "name": "The Prestige",
            "desc": "You have one real trick. Roll Sense to perform it; on a success, take a Bleed mark. Pick one: change appearance, levitate, summon a mundane object, short teleport, or throw your voice."
          }
        ]
      }
    ]
  },
  {
    "role": "Muscle",
    "mastery": "the body",
    "desc": "The protector, fighter, or daring member — intrepid, skilled in combat, tactics, or physical feats.",
    "abilities": [
      {
        "name": "Behind Me",
        "desc": "Spend 1 Nerve to take a phenomenon’s mark in place of an ally in the same scene."
      },
      {
        "name": "Adrenaline Rush",
        "desc": "For each mark you take, immediately refresh a drive point of your choice."
      },
      {
        "name": "Endurance",
        "desc": "When marks would incapacitate you, instead roll d6 equal to your Nerve resistance. On a 6, you aren’t incapacitated and take no scar."
      }
    ],
    "specialties": [
      {
        "name": "Explorer",
        "primaryDrive": "Nerve",
        "focus": "Endurance and confronting danger.",
        "starting": {
          "actions": {
            "Move": 1,
            "Strike": 2,
            "Survey": 1,
            "Focus": 1
          },
          "drives": {
            "Nerve": 3
          }
        },
        "gilded": "Move",
        "illumination": [
          "Study an Artifact",
          "Discuss History",
          "Run into Danger"
        ],
        "gear": [
          "Climbing Gear",
          "Field Journal"
        ],
        "abilities": [
          {
            "name": "Obscure Lexicon",
            "desc": "When you meet an ancient or esoteric language, spend 1 Intuition to understand what it says."
          },
          {
            "name": "Field Experience",
            "desc": "Once per assignment, relate a past adventure to the current one and refresh 1 Nerve for everyone in your circle."
          },
          {
            "name": "Mind Over Matter",
            "desc": "When told to use a specific action, take a Brain mark to use an alternative action instead (and spend that action’s drive)."
          },
          {
            "name": "Tenacious",
            "desc": "While you have 1+ Bleed marks, gild an extra die on Move, Strike, and Control rolls made in danger."
          },
          {
            "name": "Narrow Escape",
            "desc": "Add +1d to a Move roll made to escape a trap or ambush."
          },
          {
            "name": "Not Again",
            "desc": "Once per assignment, take a scar for an automatic full success. Narrate the scar as long-held; do not adjust action ratings for it."
          }
        ]
      },
      {
        "name": "Soldier",
        "primaryDrive": "Intuition",
        "focus": "Combat strategy and discipline.",
        "starting": {
          "actions": {
            "Move": 2,
            "Strike": 2,
            "Control": 1
          },
          "drives": {
            "Nerve": 1,
            "Intuition": 2
          }
        },
        "gilded": "Strike",
        "illumination": [
          "Use Violence of Action",
          "Protect Someone",
          "Act Tactically"
        ],
        "gear": [
          "Sidearm",
          "Field Kit"
        ],
        "abilities": [
          {
            "name": "Basic Training",
            "desc": "On a Survey roll in a dangerous place, add dice equal to your Nerve resistance."
          },
          {
            "name": "Geared Up",
            "desc": "You and one ally may mark an additional gear slot each assignment."
          },
          {
            "name": "Sharpshooter",
            "desc": "Spend 1 Nerve to steady a ranged attack, adding +2d to your next shot at that target."
          },
          {
            "name": "Tactician",
            "desc": "In a dangerous scenario, spend 1 Nerve to ask the GM: how do I reach safety? what’s the biggest threat? where will the target move next?"
          },
          {
            "name": "Compartmentalization",
            "desc": "Once per assignment, burn 1 Nerve resistance to soak a Brain mark."
          },
          {
            "name": "Volunteer Duty",
            "desc": "Between assignments, aid your Lightkeeper instead of spending resources, refilling 1 point in any circle resource. You may spend no resources during this downtime."
          }
        ]
      }
    ]
  },
  {
    "role": "Scholar",
    "mastery": "the mind",
    "desc": "The studious, logical, or intellectual member — educated, skilled in academics, critical thinking, or technical work.",
    "abilities": [
      {
        "name": "Well-Read",
        "desc": "When you spend Intuition on a roll and get a 3 or less, earn back any Intuition you spent."
      },
      {
        "name": "Occult Researcher",
        "desc": "Take 1 Brain mark to ask the GM for an unrevealed occult detail you’d recognize from study. If there are none, clear that Brain mark."
      },
      {
        "name": "Meticulous Notes",
        "desc": "While your Cunning resistance is 2+, add +1d to all Focus rolls. After an assignment, add 1 extra point to the Illumination track."
      }
    ],
    "specialties": [
      {
        "name": "Doctor",
        "primaryDrive": "Intuition",
        "focus": "Anatomy and healing.",
        "starting": {
          "actions": {
            "Control": 1,
            "Read": 1,
            "Survey": 1,
            "Focus": 2
          },
          "drives": {
            "Intuition": 3
          }
        },
        "gilded": "Read",
        "illumination": [
          "Avoid a Fight",
          "Aid an Ally",
          "Comfort Someone"
        ],
        "gear": [
          "Medical Bag",
          "Surgical Tools"
        ],
        "abilities": [
          {
            "name": "Patch Up",
            "desc": "In calm, make a Focus roll to heal 1 Body mark on an ally. 6: spend 1 Intuition. 4–5: spend 2 Intuition. 3 or less: take a Brain mark to take the 4–5 result."
          },
          {
            "name": "Non-Combatant",
            "desc": "If you haven’t hurt anyone this assignment, when you take a mark each ally in the scene recovers 1 drive point of their choice."
          },
          {
            "name": "Dissection",
            "desc": "On a Focus roll to dissect bleed-affected organic matter, gild an extra die; you can’t take Bleed marks from the inspection."
          },
          {
            "name": "Resuscitation",
            "desc": "When a nearby ally takes a scar, make a Focus roll to revive them. 6: they’re up (scar remains). 4–5: costs 3 drive points. Not usable on a 4th scar."
          },
          {
            "name": "Lifesaver",
            "desc": "Between assignments, spend 1 Stitch and make a Focus roll to heal an ally’s scar (crit fills 3, 6 fills 2, 4–5 fills 1). Full track heals the scar and shifts 1 action point."
          },
          {
            "name": "Anatomical Strike",
            "desc": "When attacking an enemy, you may roll Focus instead of Strike."
          }
        ]
      },
      {
        "name": "Professor",
        "primaryDrive": "Cunning",
        "focus": "Critical thinking and leveraging expertise.",
        "starting": {
          "actions": {
            "Sway": 1,
            "Survey": 2,
            "Focus": 2
          },
          "drives": {
            "Cunning": 2,
            "Intuition": 1
          }
        },
        "gilded": "Focus",
        "illumination": [
          "Mentor an Ally",
          "Reference Research",
          "Make a Plan"
        ],
        "gear": [
          "Laboratory Equipment",
          "Reference Tomes"
        ],
        "abilities": [
          {
            "name": "Steel Mind",
            "desc": "Once per assignment, burn 1 Intuition resistance to soak a Brain mark."
          },
          {
            "name": "University Resources",
            "desc": "Once per session, describe an alum you know and ask the GM where they can be found locally."
          },
          {
            "name": "Learn from My Mistakes",
            "desc": "On any roll of 3 or less, describe the lesson learned and refresh 1 drive point of your choice."
          },
          {
            "name": "Better Part of Valor",
            "desc": "On a Control or Move roll to flee danger, gild a die; the first Nerve you spend is worth +2d."
          },
          {
            "name": "Verbose",
            "desc": "When your speech or conversation assists an ally, the die you give them is gilded."
          },
          {
            "name": "Chemical Concoction",
            "desc": "With Laboratory Equipment as gear, spend a few minutes to concoct a mixture: acidic, explosive, flammable, loud, sleep-inducing, sticky, or toxic."
          }
        ]
      }
    ]
  },
  {
    "role": "Slink",
    "mastery": "the unknown",
    "desc": "The streetsmart, roguish, or nefarious member — subversive and clever, skilled in crime, the underworld, or clandestine work.",
    "abilities": [
      {
        "name": "Scout",
        "desc": "With time to observe a location, spend 1 Intuition to ask a question: what do I notice that others miss? what here is of use? what path should we follow?"
      },
      {
        "name": "Saw This Coming",
        "desc": "Three times per assignment, add +1d to a circle member’s roll without spending drive by saying how you prepared together."
      },
      {
        "name": "Death Defy",
        "desc": "Once per assignment, when you would take 1+ marks from an enemy, escape unscathed instead."
      }
    ],
    "specialties": [
      {
        "name": "Criminal",
        "primaryDrive": "Cunning",
        "focus": "Street connections and nefarious activities.",
        "starting": {
          "actions": {
            "Control": 1,
            "Hide": 2,
            "Survey": 1,
            "Focus": 1
          },
          "drives": {
            "Nerve": 1,
            "Cunning": 2
          }
        },
        "gilded": "Hide",
        "illumination": [
          "Do Something Illegal",
          "Make a Deal",
          "Stand Up to Authority"
        ],
        "gear": [
          "Burglary Tools",
          "Concealed Blade"
        ],
        "abilities": [
          {
            "name": "Street Smarts",
            "desc": "On any Survey roll, you may spend any drive instead of only Intuition."
          },
          {
            "name": "Leverage",
            "desc": "On a successful Read, ask the GM what the target truly wants. Sway rolls using that add dice equal to your Cunning resistance."
          },
          {
            "name": "Hardened",
            "desc": "When you take a scar, you may choose not to shift any action points."
          },
          {
            "name": "Born in the Shadows",
            "desc": "When avoiding security or detection, gild an extra Hide die."
          },
          {
            "name": "Tricks of the Trade",
            "desc": "On any Hide or Sway roll, spend 1 Nerve to lower the stakes before rolling (not usable if already low stakes)."
          },
          {
            "name": "Sticky Fingers",
            "desc": "After a successful melee attack, spend 1 Cunning to pilfer an item from the target undetected."
          }
        ]
      },
      {
        "name": "Detective",
        "primaryDrive": "Nerve",
        "focus": "Uncovering the truth and stopping malefactors.",
        "starting": {
          "actions": {
            "Control": 1,
            "Hide": 1,
            "Survey": 2,
            "Focus": 1
          },
          "drives": {
            "Nerve": 2,
            "Cunning": 1
          }
        },
        "gilded": "Control",
        "illumination": [
          "Probe a Witness",
          "Track a Target",
          "Reveal a Clue"
        ],
        "gear": [
          "Magnifying Glass",
          "Case Notes"
        ],
        "abilities": [
          {
            "name": "Mind Palace",
            "desc": "Burn 1 Intuition resistance to have the GM tell you how two clues relate or where they point."
          },
          {
            "name": "Interrogation",
            "desc": "When questioning someone resistant to revealing information, add dice equal to your Cunning resistance to the Read roll."
          },
          {
            "name": "Back Against the Wall",
            "desc": "On a high-stakes roll, take a Brain mark to make any Nerve you spend worth +2d."
          },
          {
            "name": "Inspection",
            "desc": "On a Survey roll to gather evidence about what happened here, gild an extra die."
          },
          {
            "name": "Stakeout",
            "desc": "When tailing a suspect or conducting surveillance, you may use Survey instead of Hide."
          },
          {
            "name": "One Step Ahead",
            "desc": "Once per assignment, produce a useful mundane object you’ve had all along; it fills an empty gear slot and doesn’t count toward your limit."
          }
        ]
      }
    ]
  },
  {
    "role": "Weird",
    "mastery": "the arcane",
    "desc": "The arcane, magickal, or supernatural member — connected to the occult, skilled in enigmatic lore, psychic ability, and thinnings.",
    "abilities": [
      {
        "name": "Great Wards",
        "desc": "Inscribe and maintain a warding symbol on one person (they hold a binding material). They take +1d on Move rolls against phenomena."
      },
      {
        "name": "Let Them In",
        "desc": "Whenever you take 1+ Bleed marks, ask the GM one question about the source of the bleed that harmed you."
      },
      {
        "name": "Ritual",
        "desc": "With a few minutes, take a Bleed mark to perform a ritual on yourself or an ally: Circle of Protection (soak 1 Body mark), Reinvigorate (refresh 1 resistance), or Remote Viewing."
      }
    ],
    "specialties": [
      {
        "name": "Medium",
        "primaryDrive": "Intuition",
        "focus": "Divination and connecting with spirits.",
        "starting": {
          "actions": {
            "Read": 2,
            "Survey": 1,
            "Sense": 2
          },
          "drives": {
            "Cunning": 1,
            "Intuition": 2
          }
        },
        "gilded": "Sense",
        "illumination": [
          "Connect with Someone",
          "Sense Phenomena",
          "Make a Scene"
        ],
        "gear": [
          "Spirit Board",
          "Mourning Locket"
        ],
        "abilities": [
          {
            "name": "Miasma",
            "desc": "Spend 1 Intuition to tell if and how a person or object has been affected by bleed."
          },
          {
            "name": "Bending Spoons",
            "desc": "Make a Sense roll to move a small object with your mind. On a mixed success, take a Bleed mark to make it a full success."
          },
          {
            "name": "Cold Read",
            "desc": "On a successful Sense roll, learn an ailment, stress, or loss a person hides."
          },
          {
            "name": "Premonitions",
            "desc": "When an ally is about to take 1+ marks, burn an Intuition resistance to warn them, then soak one of those marks."
          },
          {
            "name": "Last Moments",
            "desc": "Touching a corpse, burn an Intuition resistance to sense its last moments; take a Bleed mark to see the last thing it saw."
          },
          {
            "name": "Commune",
            "desc": "Take a Brain mark and make a Sense roll to open a telepathic link with a nearby sentient phenomenon and ask a question."
          }
        ]
      },
      {
        "name": "Occultist",
        "primaryDrive": "Intuition",
        "focus": "Ritual and knowledge of the arcane.",
        "starting": {
          "actions": {
            "Control": 1,
            "Read": 1,
            "Focus": 1,
            "Sense": 2
          },
          "drives": {
            "Intuition": 3
          }
        },
        "gilded": "Focus",
        "illumination": [
          "Consult Arcane Texts",
          "Collect Oddities",
          "Act Bizarre"
        ],
        "gear": [
          "Ghostblade",
          "Ritual Chalk"
        ],
        "abilities": [
          {
            "name": "Ghostblade",
            "desc": "Attune a ritual knife. Coat it in your blood (take a Body mark) to make it effective against magickal beings and able to strike ethereal enemies."
          },
          {
            "name": "Blood of the Covenant",
            "desc": "The first time a dangerous phenomenon marks anyone in your circle, refresh points in any drive equal to your Intuition resistance."
          },
          {
            "name": "Speak Their Language",
            "desc": "You can speak the supernatural language of any phenomenon you encounter."
          },
          {
            "name": "Play the Bait",
            "desc": "Make a Sense roll to draw a nearby phenomenon toward you."
          },
          {
            "name": "Extend Your Senses",
            "desc": "On a Sense roll to learn more about a phenomenon you’ve met, add dice equal to your Intuition resistance."
          },
          {
            "name": "Forbidden Ritual",
            "desc": "Perform a highly dangerous ritual and immediately take a Bleed scar. Choose its effect: change the environment, conjure a phenomenon, or save a dying person."
          }
        ]
      }
    ]
  }
];

export const CO_GEAR: CoGear[] = [
  {
    "name": "Bleed Containment Vial",
    "type": "Standard",
    "desc": "Holds remnants of magickal phenomena; protects the carrier from Bleed marks from anything inside."
  },
  {
    "name": "Hand Weapon",
    "type": "Standard",
    "desc": "A concealable handgun, knife, or brass knuckles — better than facing danger empty-handed."
  },
  {
    "name": "Bleed Detector",
    "type": "Standard",
    "desc": "A lamp, spyglass, or device that lets you perceive the evidence of phenomena."
  }
];

export const CO_MARKS: CoMark[] = [
  {
    "name": "Body",
    "desc": "Physical harm — lacerations, bites, broken bones."
  },
  {
    "name": "Brain",
    "desc": "Mental strain — exhaustion, anxiety, stress, fear."
  },
  {
    "name": "Bleed",
    "desc": "Magickal corruption — a ghost’s touch, venom, harmful arcane energy."
  }
];

export const CO_RULES: CoRule[] = [
  {
    "title": "Action Roll",
    "text": "Take d6 equal to your action rating (0–3). Spend a drive point or accept help for +1d, to a max of six dice. Read the highest die."
  },
  {
    "title": "Results",
    "text": "6 = full success · 4–5 = mixed success (a cost) · 1–3 = miss · two or more 6s = critical."
  },
  {
    "title": "Rating 0",
    "text": "Roll two dice and take the lowest — no crit possible."
  },
  {
    "title": "Gilded",
    "text": "A gilded action replaces one die with a gilded die; take its result (even if lower) to refresh a point in that action’s drive."
  },
  {
    "title": "Resistance",
    "text": "For every 3 maximum drive points you have 1 resistance in that drive. Burn one to reroll dice equal to the action’s rating."
  },
  {
    "title": "Marks & Scars",
    "text": "Body / Brain / Bleed each hold 3 marks; the 4th drops you and becomes a scar — clear the track, note the scar, shift one action point."
  },
  {
    "title": "Stakes",
    "text": "Low / Standard / High — the GM sets how bad a mixed success or miss will be before you roll."
  }
];
