// GENERATED FILE - do not edit by hand.
// Source: data/kob/parts/*.json - regenerate with: node scripts/build-kob-data.mjs

import type { KobBookInfo } from "./kob-types";

export const KOB_BOOKS: KobBookInfo[] = [
  {
    "key": "bikes",
    "name": "Kids on Bikes",
    "tagline": "Second Edition — collaborative storytelling in small towns full of big adventure.",
    "blurb": "A rules-light, fast-paced roleplaying game about ordinary kids, teens and adults in a small town who stumble into strange, creepy mysteries — and about the Powered Character the whole table shares control of. Six Stats rated d4–d20, Tropes to build from, Strengths, Flaws, Adversity Tokens, Lucky Breaks, and a bike you love.",
    "ageGroups": [
      {
        "name": "Child",
        "statBonus": [
          "Flight",
          "Charm"
        ],
        "freeStrength": "Quick Healing",
        "notes": "Cannot take Rebellious. Quick and generally likable. Almost no access to money."
      },
      {
        "name": "Teen",
        "statBonus": [
          "Fight",
          "Brawn"
        ],
        "freeStrength": "Rebellious",
        "notes": "Pugnacious and in their prime. Limited access to money."
      },
      {
        "name": "Adult",
        "statBonus": [
          "Brains",
          "Grit"
        ],
        "freeStrength": "Skilled at…",
        "notes": "The Skilled at… skill usually reflects a job or a long-honed talent. Can buy what they need, within reason."
      }
    ],
    "rideLabel": "Bike",
    "bagLabel": "Backpack",
    "rules": [
      "Pick a Trope (Appendix C) or build from scratch: assign d20/d12/d10/d8/d6/d4 to the six Stats.",
      "Age gives +1 to two Stats' checks and one free Strength; then choose two more Strengths and one Flaw.",
      "Start with 3 Adversity Tokens (AT). Failing a check earns 1 AT; each AT spent adds +1 to a roll (yours or a friend's in the scene).",
      "Rolling a die's maximum is a Lucky Break: reroll and add. AT never trigger Lucky Breaks.",
      "Planned Actions may take half the die's maximum instead of rolling; Snap Decisions must be rolled.",
      "One Knack at start (take a 10 once per session instead of rolling); never more than 3 Knacks, and never more than 4 Knacks + Bonded Actions combined.",
      "Choose a bike: a Color (adjective + benefit) and one Upgrade (Appendix J), or take your Trope's gift bike.",
      "The Powered Character is introduced by the GM in the first session and co-controlled by everyone through Aspects; powers run on a pool of 7 Power Tokens (d6 per PT).",
      "Harm is resolved in a single contested check after everyone agrees to the stakes; violence only between characters in the same age bracket or within two years of age."
    ]
  },
  {
    "key": "brooms",
    "name": "Kids on Brooms",
    "tagline": "Magic school adventures for students and faculty alike.",
    "blurb": "Kids on Brooms is a collaborative roleplaying game about a magical school, built on the Kids on Bikes engine. Every character is a caster with a wand, a broom and a familiar; there are no spell lists—if it could be done with magic, you can try to do it with magic, and the GM builds each spell's difficulty from its magnitude, area, duration and your experience with it.",
    "ageGroups": [
      {
        "name": "Underclass",
        "range": "14 years old and younger",
        "statBonus": [
          "Flight",
          "Charm"
        ],
        "freeStrength": "Innocence",
        "notes": "Fast and likeable. Write your favorite class on your sheet and name the teacher who teaches it. Cannot start the game with Master of…; could be Studied in… one type of magic by spending both Strengths."
      },
      {
        "name": "Upperclass",
        "range": "15 to 20 years old",
        "statBonus": [
          "Fight",
          "Brawn"
        ],
        "freeStrength": "Trained in…",
        "notes": "Pugnacious and in their prime. Trained in… one type of magic of your choice. Write your favorite class and name its teacher. Could start as Master of… a type of magic by spending both Strengths."
      },
      {
        "name": "Faculty",
        "range": "21 years and older",
        "statBonus": [
          "Brains",
          "Grit"
        ],
        "freeStrength": "Studied in…",
        "notes": "Studied in… one type of magic of your choice. Write your favorite class to teach (or your favorite class as a student) and name your best student. Could gain Master of… by spending one Strength at creation."
      }
    ],
    "rideLabel": "Broom",
    "bagLabel": "Schoolbag",
    "rules": [
      "Begin the game with 3 Adversity Tokens; add 1 each time you fail a roll.",
      "You start with your grade Strength (Innocence / Trained in… / Studied in…) and two more, plus two Flaws.",
      "Grade bonuses: Underclass +1 Flight & Charm; Upperclass +1 Fight & Brawn; Faculty +1 Brains & Grit. Bonuses never cause a Lucky Break.",
      "Every spell is a Spell Check: roll the Stat Die for that type of magic plus a d4 Magic Die, add wand and Strength bonuses, and compare to a difficulty the GM builds from magnitude + area + duration + experience.",
      "The GM must tell you a spell's difficulty before you decide whether to cast it.",
      "Your wand gives +1 to two different types of magic: one from its wood, one from its core.",
      "Your broom's benefit only applies while you are physically riding it.",
      "Familiars allow limited one-way psychic communication and can carry out simple tasks, decided narratively.",
      "Class Schedule: pick 3 classes; take up to 2 marks per session. 2 marks = Trained in… (+1), 6 marks = Studied in… (+3), 10 marks = Master of… (+5).",
      "Casting magic on an unwilling PC or NPC is a contested Spell Check; killing another character other than in self defense turns your character into an NPC.",
      "Species other than human are mechanically identical to humans; they change only how you roleplay."
    ]
  },
  {
    "key": "capes",
    "name": "Kids in Capes",
    "tagline": "Young heroes discovering their powers and learning to be a team.",
    "blurb": "Kids in Capes uses the Kids on Bikes engine to tell the story of a group of kids, teens, or adults who gain superpowers, pick a role on the team (their Cape) and a signature Power, and grow toward a Capstone ability. Combat adds Risks, Stress, Power Dice and Clock Dice; between sessions heroes spend Growth Points on their Cape and Power Skill Trees.",
    "ageGroups": [
      {
        "name": "Child",
        "range": "12 & younger",
        "statBonus": [
          "Charm",
          "Flight"
        ],
        "freeStrength": "Just Having Fun",
        "notes": "At the end of every combat, reduce your Stress by 1 before determining the effects of Stress."
      },
      {
        "name": "Teen",
        "range": "13 to 19 years",
        "statBonus": [
          "Brawn",
          "Fight"
        ],
        "freeStrength": "Rebellious",
        "notes": "+3 when persuading or resisting persuasion from children; +3 when resisting persuasion from adults."
      },
      {
        "name": "Adult",
        "range": "20 & older",
        "statBonus": [
          "Brains",
          "Grit"
        ],
        "freeStrength": "Skilled at…",
        "notes": "Choose a skill the character has learned from their life experiences or employment."
      }
    ],
    "rideLabel": null,
    "bagLabel": "Utility Belt",
    "rules": [
      "Creation order: choose and share your eventual Cape and Power; select a Trope and fill in your sheet; introduce your character and answer relationship questions; add finishing touches (p.17).",
      "Choose two Strengths and one Flaw from your Trope's lists; you may reassign Stat dice (one die per stat) and, with GM permission, take an off-list Strength or Flaw (p.24-25).",
      "Pick a Stress-Boosted Stat and a Stress-Reduced Stat (they cannot be the same stat); Stress modifies them during and after combat (p.28).",
      "Age sets two +1 stats and a free Strength: Child +1 Charm/Flight (Just Having Fun), Teen +1 Brawn/Fight (Rebellious), Adult +1 Brains/Grit (Skilled at…) (p.29).",
      "Finishing touches: three Extracurriculars (Forever, Long-Term, Recent), a Motivation, an Obligation, an optional Weak Point, and a Utility Belt of things you're never without (p.36-38).",
      "You start powerless. When powers manifest you gain a Starting Cape Ability (+1 to one Cape Stat, used when superheroing) and a Starting Power Ability with a d4 Power Die, then answer the Secret Identity questions (p.50-53).",
      "Failing any roll made with your Power costs 1 Stress; every combat check risks at least 1 Stress; after all heroes act each round, everyone takes 1 Stress (p.43, 57, 66).",
      "At 13 Stress you must immediately remove yourself from combat. After combat apply Fallout, then reduce Stress by 4. Sleep -2 per night, 2+ hours of an extracurricular -2 per day, professional help -4 (p.58, 73-74).",
      "Growth Points buy Cape Skills, Cape Stat bonuses, Power Die increases, new ways to use your Power, Team Tactics, and finally your Capstone—after which you play only one more session or short arc (p.85-90)."
    ]
  }
];
