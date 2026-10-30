// GENERATED from public/tools-data/dcc-damage-effects.js (BOOK) — the seven book
// Damage Effects in the homebrew `effect` shape, so templating a homebrew skill
// from one (TemplatePicker → "Skullcracker") pre-fills its effect settings.
// Per-tier conditions and riders the sheet handles specially (Toss, Choke Out
// thresholds, cooldowns) become the tier note.
export const DCC_FX_BOOK: Record<string, { attacks: string[]; groups: string[]; condition: string; tiers: { rank: number; dice: string; rankDice: number; mult: number | "rank"; multOf: "base" | "total"; stat: string; debuffs: string[]; note: string }[] }> = {
  "Skullcracker": {
    "attacks": [
      "Noggin Nocker"
    ],
    "groups": [],
    "condition": "Target is the same size as you",
    "tiers": [
      {
        "rank": 0,
        "dice": "1d4",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": ""
      },
      {
        "rank": 5,
        "dice": "2d4",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": ""
      },
      {
        "rank": 10,
        "dice": "2d4",
        "rankDice": 1,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Stunned"
        ],
        "note": ""
      },
      {
        "rank": 15,
        "dice": "2d4",
        "rankDice": 2,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Stunned",
          "Blood Trail"
        ],
        "note": ""
      }
    ]
  },
  "Iron Punch": {
    "attacks": [
      "Pugilism"
    ],
    "groups": [],
    "condition": "",
    "tiers": [
      {
        "rank": 0,
        "dice": "1d2",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": ""
      },
      {
        "rank": 5,
        "dice": "1d2",
        "rankDice": 1,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": ""
      },
      {
        "rank": 10,
        "dice": "1d2",
        "rankDice": 1,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": "You may give the target Stunned instead of rolling damage"
      },
      {
        "rank": 15,
        "dice": "1d2",
        "rankDice": 2,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Stunned"
        ],
        "note": ""
      }
    ]
  },
  "Powerful Strike": {
    "attacks": [
      "Foot Soldier",
      "Noggin Nocker",
      "Pugilism"
    ],
    "groups": [],
    "condition": "",
    "tiers": [
      {
        "rank": 0,
        "dice": "",
        "rankDice": 0,
        "mult": "rank",
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": "Cooldown 30 hours"
      },
      {
        "rank": 5,
        "dice": "",
        "rankDice": 0,
        "mult": "rank",
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": "Cooldown 10 hours"
      },
      {
        "rank": 10,
        "dice": "",
        "rankDice": 0,
        "mult": "rank",
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": "Cooldown 5 hours"
      },
      {
        "rank": 15,
        "dice": "",
        "rankDice": 0,
        "mult": "rank",
        "multOf": "base",
        "stat": "",
        "debuffs": [],
        "note": "Cooldown 2 hours"
      }
    ]
  },
  "Dirty Fighting": {
    "attacks": [
      "Pugilism",
      "Wrasslin'"
    ],
    "groups": [],
    "condition": "",
    "tiers": [
      {
        "rank": 0,
        "dice": "",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Woozy"
        ],
        "note": "Critical Fail: lose 1 Popularity"
      },
      {
        "rank": 5,
        "dice": "",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Woozy",
          "The Taint"
        ],
        "note": "Critical Fail: lose 1 Popularity"
      },
      {
        "rank": 10,
        "dice": "",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Woozy",
          "The Taint",
          "Blinded"
        ],
        "note": ""
      },
      {
        "rank": 15,
        "dice": "",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "",
        "debuffs": [
          "Woozy",
          "The Taint",
          "Blinded",
          "Minor Injury"
        ],
        "note": ""
      }
    ]
  },
  "Choke Out": {
    "attacks": [
      "Wrasslin'"
    ],
    "groups": [],
    "condition": "",
    "tiers": [
      {
        "rank": 0,
        "dice": "",
        "rankDice": 0,
        "mult": 2,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 10% Health Bar or less"
      },
      {
        "rank": 5,
        "dice": "",
        "rankDice": 0,
        "mult": 2,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 20% Health Bar or less"
      },
      {
        "rank": 10,
        "dice": "",
        "rankDice": 0,
        "mult": 4,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 40% Health Bar or less"
      },
      {
        "rank": 15,
        "dice": "",
        "rankDice": 0,
        "mult": 8,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 80% Health Bar or less"
      }
    ]
  },
  "Smush": {
    "attacks": [
      "Foot Soldier"
    ],
    "groups": [],
    "condition": "",
    "tiers": [
      {
        "rank": 0,
        "dice": "",
        "rankDice": 0,
        "mult": 2,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 20% Health Bar or less. Has a cooldown"
      },
      {
        "rank": 5,
        "dice": "",
        "rankDice": 0,
        "mult": 3,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 30% Health Bar or less. Has a cooldown"
      },
      {
        "rank": 10,
        "dice": "",
        "rankDice": 0,
        "mult": 3,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 30% Health Bar or less. No cooldown"
      },
      {
        "rank": 15,
        "dice": "",
        "rankDice": 0,
        "mult": 4,
        "multOf": "total",
        "stat": "",
        "debuffs": [],
        "note": "Only if: Target at 40% Health Bar or less. No cooldown"
      }
    ]
  },
  "Toss": {
    "attacks": [
      "Wrasslin'"
    ],
    "groups": [],
    "condition": "",
    "tiers": [
      {
        "rank": 0,
        "dice": "1d8",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "str",
        "debuffs": [],
        "note": "Only if: Target smaller than you. Ends Held and throws the target 5 ft per 5 Ranks"
      },
      {
        "rank": 5,
        "dice": "1d8",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "str",
        "debuffs": [],
        "note": "Only if: Target your size or smaller. Ends Held and throws the target 5 ft per 5 Ranks"
      },
      {
        "rank": 10,
        "dice": "1d8",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "str",
        "debuffs": [],
        "note": "Only if: Target up to one size larger. Ends Held and throws the target 5 ft per 5 Ranks"
      },
      {
        "rank": 15,
        "dice": "2d8",
        "rankDice": 0,
        "mult": 0,
        "multOf": "base",
        "stat": "str",
        "debuffs": [],
        "note": "Only if: Target up to two sizes larger. Ends Held and throws the target 5 ft per 5 Ranks"
      }
    ]
  }
};
