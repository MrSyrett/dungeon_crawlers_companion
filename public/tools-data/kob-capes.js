// GENERATED FILE - do not edit by hand.
// Source: data/kob/parts/*.json - regenerate with: node scripts/build-kob-data.mjs

const KOB_CAPES = [
  {
    "name": "Brawler",
    "description": "Your classic close-up fighter. They may be a martial artist, a cybernetically enhanced mutant, or anything in between. Your role on the team is to get up close and personal when things get rough. Cape Stats: Brawn, Fight, Flight.",
    "skills": [
      {
        "name": "Stick and Move",
        "kind": "Constant",
        "description": "+X bonus to your defense rolls in close combat.",
        "tiers": {
          "starting": "+2",
          "intermediate": "+4",
          "advanced": "+6"
        }
      },
      {
        "name": "Grapple",
        "kind": "Action",
        "description": "Instead of hitting opponent, you may grapple them.",
        "tiers": {
          "starting": "Keeps them from moving; they can still attack.",
          "intermediate": "Prevents them from attacking.",
          "advanced": "Gives teammates +3 on attacks against them."
        }
      },
      {
        "name": "Combo Strike",
        "kind": "Action",
        "description": "Take 1 Stress to attack X additional times.",
        "tiers": {
          "starting": "1",
          "intermediate": "2",
          "advanced": "3"
        }
      },
      {
        "name": "Strike Back",
        "kind": "Reaction",
        "description": "When hit, you may counterattack.",
        "tiers": {
          "starting": "Only when you take Stress from an attack.",
          "intermediate": "Take 1 Stress to activate even if you defend successfully.",
          "advanced": "Activate when attacked without taking Stress."
        }
      },
      {
        "name": "Knockout Blow",
        "kind": "Constant",
        "description": "On high enough attack rolls, you immediately knock out an opponent (if narratively appropriate).",
        "tiers": {
          "starting": "+10 or higher.",
          "intermediate": "+8 or higher.",
          "advanced": "+5 or higher."
        }
      },
      {
        "name": "Spot Weakness",
        "kind": "Constant",
        "description": "Once per combat per enemy, you may make a Brains check to spot that enemy's weakness, difficulty 10. If successful, +X bonus to attack rolls against that enemy for the rest of combat.",
        "tiers": {
          "starting": "3",
          "intermediate": "5",
          "advanced": "7"
        }
      }
    ],
    "page": 149
  },
  {
    "name": "Cryptic",
    "description": "Wields mysterious powers that allow them to see and manipulate reality in a way that looks like magic to most people—ancient mystic arts, or powers to read or affect other creatures' minds. Your role will be one of stealth and manipulation, swinging the battle in your team's favor. Cape Stats: Brawn, Charm, Flight.",
    "skills": [
      {
        "name": "Deflect",
        "kind": "Reaction",
        "description": "Take less stress when attacked.",
        "tiers": {
          "starting": "Not available.",
          "intermediate": "Reduce all attacks against you by 1 Stress.",
          "advanced": "…and once per round, ignore all Stress from an attack against you."
        }
      },
      {
        "name": "Evade",
        "kind": "Constant",
        "description": "You get limited invisibility. +X bonus to all defense rolls.",
        "tiers": {
          "starting": "1",
          "intermediate": "2",
          "advanced": "3"
        }
      },
      {
        "name": "Illusion",
        "kind": "Action",
        "description": "You create an illusion. When an enemy tries to attack you, you make a Charm or Flight check at the indicated difficulty. On a success, your enemy targets the illusion, automatically hitting it and dispelling it.",
        "tiers": {
          "starting": "12",
          "intermediate": "9",
          "advanced": "6"
        }
      },
      {
        "name": "Stun",
        "kind": "Action",
        "description": "Before a henchperson acts, you make a Brawn, Charm, or Flight check at the indicated difficulty. If successful, they cannot act during the Villain Action.",
        "tiers": {
          "starting": "12",
          "intermediate": "9",
          "advanced": "6"
        }
      },
      {
        "name": "Shield",
        "kind": "Reaction",
        "description": "(Limited) Prevent all teammates from taking 1 Stress at the end of the turn.",
        "tiers": {
          "starting": "Once per combat.",
          "intermediate": "Twice per combat.",
          "advanced": "Prevent all teammates from taking 1 Stress at the end of the Hero Actions."
        }
      },
      {
        "name": "Dimensional Step",
        "kind": "Reaction",
        "description": "Teleport a short distance. You cannot use this to avoid being hit in combat.",
        "tiers": {
          "starting": "5 feet.",
          "intermediate": "10 feet.",
          "advanced": "20 feet."
        }
      }
    ],
    "page": 150
  },
  {
    "name": "Guardian",
    "description": "Supports other team members or the team as a whole—in addition to some offense. A superior athlete with armor and a shield, or someone who manipulates force fields to block villains' attacks. Your role will be more one of supporting other team members in a fight. Cape Stats: Brains, Charm, Grit.",
    "skills": [
      {
        "name": "Aid",
        "kind": "Reaction",
        "description": "After a teammate attempts to attack or defend, you may add a bonus to their roll.",
        "tiers": {
          "starting": "+2",
          "intermediate": "Roll Power Die and use result.",
          "advanced": "Roll Power Die twice and use either result."
        }
      },
      {
        "name": "Force Field",
        "kind": "Constant",
        "description": "+X bonus to another character's defense rolls in combat.",
        "tiers": {
          "starting": "2",
          "intermediate": "4",
          "advanced": "6"
        }
      },
      {
        "name": "Defend",
        "kind": "Reaction",
        "description": "Help defend teammates. You roll an appropriate defense check when they do at the same difficulty.",
        "tiers": {
          "starting": "If you are successful, add the amount you are over your check to theirs. If you fail, take 1 Stress.",
          "intermediate": "If you are successful, add the amount +2 you are over your check to theirs.",
          "advanced": "If you are successful, add the amount +5 you are over your check to theirs."
        }
      },
      {
        "name": "Fast Thinking",
        "kind": "Constant",
        "description": "Allow yourself or another player to make a Snap Decision as a Planned Action. You may only do this as many times as indicated in the level of this ability.",
        "tiers": {
          "starting": "Once per combat.",
          "intermediate": "Three times per combat.",
          "advanced": "Once per round."
        }
      },
      {
        "name": "Reassure",
        "kind": "Action",
        "description": "Once per combat, decrease the Stress of all teammates by X.",
        "tiers": {
          "starting": "1",
          "intermediate": "2",
          "advanced": "4"
        }
      },
      {
        "name": "Shield",
        "kind": "Reaction",
        "description": "(Limited) Prevent all teammates from taking 1 Stress at the end of the turn.",
        "tiers": {
          "starting": "Once per combat.",
          "intermediate": "Twice per combat.",
          "advanced": "Prevent all teammates from taking 1 Stress at the end of the Hero Actions."
        }
      }
    ],
    "page": 152
  },
  {
    "name": "Shooter",
    "description": "To ranged combat as the Brawler is to close combat—wielding mysterious cosmic radiation or hurling massive rains of rock at your foes. Your role is to bring the offense from a distance with any variety of projected powers. Cape Stats: Brains, Fight, Grit.",
    "skills": [
      {
        "name": "Burst Shot",
        "kind": "Action",
        "description": "Hit all combatants in an area.",
        "tiers": {
          "starting": "1 Success against all enemies in area. 3 Stress to all teammates in area.",
          "intermediate": "1 Success against all enemies in area. 1 Stress to all teammates in area.",
          "advanced": "1 Success against all enemies in area."
        }
      },
      {
        "name": "Combo Strike",
        "kind": "Action",
        "description": "Take 1 Stress to make X additional attacks.",
        "tiers": {
          "starting": "1",
          "intermediate": "2",
          "advanced": "3"
        }
      },
      {
        "name": "Blast",
        "kind": "Action",
        "description": "Damage something in the environment, causing a mechanical impact that applies to a number of enemies until the end of the next Villains' Actions.",
        "tiers": {
          "starting": "Applies to up to 3 enemies.",
          "intermediate": "Applies to up to 6 enemies.",
          "advanced": "Applies to all enemies."
        }
      },
      {
        "name": "Indirect",
        "kind": "Action",
        "description": "Make an attack against a foe in range that you can't see. The attack passes through walls, or other solid objects without damaging them. You have to know that the foe is there.",
        "tiers": {
          "starting": "Difficulty for the attack is Standard Difficulty +6.",
          "intermediate": "Difficulty for the attack is Standard Difficulty +3.",
          "advanced": "Difficulty for the attack is Standard Difficulty."
        }
      },
      {
        "name": "Suppressing Fire",
        "kind": "Action",
        "description": "Make an attack against a henchperson. If successful, remove that henchperson from combat and…",
        "tiers": {
          "starting": "…prevent 1 other henchperson from attacking during the next Villain Actions.",
          "intermediate": "…prevent 3 other henchpeople from attacking during the next Villain Actions.",
          "advanced": "…prevent all henchpeople from attacking during the next Villain Actions."
        }
      },
      {
        "name": "Take Cover",
        "kind": "Constant",
        "description": "After attacking, if cover is available…",
        "tiers": {
          "starting": "…+3 to your defense rolls during the Villain Actions.",
          "intermediate": "…+5 to your defense rolls during the Villain Actions.",
          "advanced": "…+5 to your defense rolls during the Villain action and counterattack for free, even if you are not the target."
        }
      }
    ],
    "page": 153
  },
  {
    "name": "Tactician",
    "description": "Leads the team. They may be the most powerful member of the team or just a regular person with technology and the mind of the world's greatest detective. Your role will be to make critical calls, generally on the fly, in tough situations. Cape Stats: Brains, Charm, Flight.",
    "skills": [
      {
        "name": "Aid",
        "kind": "Reaction",
        "description": "After a teammate attempts to attack or defend, you may add a bonus to their roll.",
        "tiers": {
          "starting": "+2",
          "intermediate": "Roll Power Die and use result.",
          "advanced": "Roll Power Die twice and use either result."
        }
      },
      {
        "name": "Fast Thinking",
        "kind": "Constant",
        "description": "Allow yourself or another player to make a Snap Decision as a Planned Action. You may only do this as many times as indicated in the level of this ability.",
        "tiers": {
          "starting": "Once per combat.",
          "intermediate": "Three times per combat.",
          "advanced": "Once per round."
        }
      },
      {
        "name": "Reassure",
        "kind": "Action",
        "description": "Once per combat, decrease the Stress of all teammates by X.",
        "tiers": {
          "starting": "1",
          "intermediate": "2",
          "advanced": "4"
        }
      },
      {
        "name": "Spot Weakness",
        "kind": "Constant",
        "description": "Once per combat per enemy, you may make a Brains check to spot that enemy's weakness, difficulty 10. If successful, +X bonus to attack rolls against that enemy for the rest of combat.",
        "tiers": {
          "starting": "3",
          "intermediate": "5",
          "advanced": "7"
        }
      },
      {
        "name": "Stick and Move",
        "kind": "Constant",
        "description": "+X bonus to your defense rolls in close combat.",
        "tiers": {
          "starting": "+2",
          "intermediate": "+4",
          "advanced": "+6"
        }
      },
      {
        "name": "Teach",
        "kind": "Constant",
        "description": "Transfer AT to a teammate.",
        "tiers": {
          "starting": "Spend 1 AT to give 1 AT to a teammate.",
          "intermediate": "Spend up to 5 AT to give that many AT to a teammate.",
          "advanced": "Spend up to 4 AT to give twice that many AT to that teammate."
        }
      }
    ],
    "page": 155
  },
  {
    "name": "Tank",
    "description": "Anchors the group in battle. Generally easy to spot by their size—but not always. What is always true is their ability to take a lot of damage from extremely tough armor or the ability to redirect it away from team members. Your role will be to draw attacks away from other team members to yourself. Cape Stats: Brawn, Fight, Grit.",
    "skills": [
      {
        "name": "Aggro Foe",
        "kind": "Reaction",
        "description": "Instead of hitting your opponent, redirect an attack to you.",
        "tiers": {
          "starting": "Make defense check at -3. If unsuccessful, you both suffer penalty as normal.",
          "intermediate": "Make defense check. If unsuccessful, you suffer penalty as normal, but original target takes only 1 Stress.",
          "advanced": "Make defense check at +5. Original target takes no Stress, even if you are unsuccessful."
        }
      },
      {
        "name": "Defend",
        "kind": "Reaction",
        "description": "Help defend teammates. You roll an appropriate defense check when they do at the same difficulty.",
        "tiers": {
          "starting": "If you are successful, add the amount you are over your check to theirs. If you fail, take 1 Stress.",
          "intermediate": "If you are successful, add the amount +2 you are over your check to theirs.",
          "advanced": "If you are successful, add the amount +5 you are over your check to theirs."
        }
      },
      {
        "name": "Grapple",
        "kind": "Action",
        "description": "Instead of hitting opponent, you may grapple them.",
        "tiers": {
          "starting": "Keeps them from moving; they can still attack.",
          "intermediate": "Prevents them from attacking.",
          "advanced": "Gives teammates +3 on attacks against them."
        }
      },
      {
        "name": "Heavy Hitter",
        "kind": "Constant",
        "description": "+X bonus to your attack rolls in close combat.",
        "tiers": {
          "starting": "2",
          "intermediate": "4",
          "advanced": "6"
        }
      },
      {
        "name": "Deflect",
        "kind": "Reaction",
        "description": "Take less stress when attacked.",
        "tiers": {
          "starting": "Not available.",
          "intermediate": "Reduce all attacks against you by 1 Stress.",
          "advanced": "…and once per round, ignore all Stress from an attack against you."
        }
      },
      {
        "name": "Shelter Teammate",
        "kind": "Reaction",
        "description": "At the start of Villain Actions each round, pick one teammate. During this round of Villain Actions, you make defense checks any time that teammate would.",
        "tiers": {
          "starting": "If either of you is successful, you take any Stress they would have. They take no Stress. If both of you are unsuccessful, you both take Stress based on your rolls.",
          "intermediate": "If both of you are successful, you take the Stress from the better result. They take no Stress. Otherwise, you take any Stress they would have. They take no Stress.",
          "advanced": "If only one of you is successful, you take 1 Stress. They take no Stress. If both of you are successful, neither of you takes Stress."
        }
      }
    ],
    "page": 156
  }
];
