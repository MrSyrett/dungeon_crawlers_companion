// GENERATED FILE - do not edit by hand.
// Source: data/dcc/loot.json - regenerate with: node scripts/build-dcc-data.mjs

const DCC_LOOT = {
  "tiers": [
    {
      "tier": "Bronze",
      "gearRolls": 0,
      "gold": "1d10",
      "xValue": "mundane (no enchant rolls)",
      "contents": [
        "Healing Potion",
        "Mana Potion",
        "random armor +1 DR",
        "Spell Scroll",
        "Magic Tome",
        "1d6 Bandages",
        "Rope (50 ft)",
        "Torches ×10",
        "Stick of Basic Dynamite"
      ],
      "page": 216,
      "source": "Core"
    },
    {
      "tier": "Silver",
      "gearRolls": 1,
      "gold": "1d10 ×100",
      "xValue": "+1 Skill Rank or +2 Stat",
      "contents": [
        "Silver Ring of +2 to a Stat",
        "Potion of +1 Skill (Permanent)",
        "Spell Scrolls",
        "Spellbooks",
        "Magic Paper",
        "2 Poison Antidotes",
        "100 Crawler Biscuits",
        "Good Healing Potion",
        "Stick of Good Goblin Dynamite"
      ],
      "page": 216,
      "source": "Core"
    },
    {
      "tier": "Gold",
      "gearRolls": 2,
      "gold": "1d6 ×1000",
      "xValue": "+1–3 Skill Rank or +3–5 Stat",
      "contents": [
        "Golden Ring of +3 to a Stat",
        "Potion of +2 Skill (Permanent)",
        "Spellbooks",
        "Spell Scrolls",
        "a Crafting Table",
        "Gold Standard Healing Potion",
        "Scroll of Upgrade"
      ],
      "page": 217,
      "source": "Core"
    },
    {
      "tier": "Platinum",
      "gearRolls": 3,
      "gold": "2d6 ×1000",
      "xValue": "+2–4 Skill Rank or +5% Stat",
      "contents": [
        "+4 to a Stat item",
        "Potion of +3 Skill (Permanent)",
        "Supreme Healing Potion",
        "Scratcher tickets",
        "Crafting Tables + Upgrade Coupons",
        "Personal Space Coupons",
        "Good Mana Refill Potion",
        "Scroll of Upgrade"
      ],
      "page": 218,
      "source": "Core"
    },
    {
      "tier": "Legendary",
      "gearRolls": 4,
      "gold": "1d10 ×10,000",
      "xValue": "+5 Skill Rank or +10% Stat",
      "contents": [
        "+10% to a Stat item",
        "Potion of +5 Skill (Permanent)",
        "Rare Spellbook",
        "Rare Spell Scroll",
        "Crafting Tables + Upgrade Coupons",
        "Heal Severe Injury Potion"
      ],
      "page": 219,
      "source": "Core"
    },
    {
      "tier": "Celestial",
      "gearRolls": 5,
      "gold": "none",
      "xValue": "+6 Skill Rank or +20% Stat",
      "contents": [
        "Divine Items",
        "overpowered weapons/armor/gear",
        "Potions that Max Out a Skill (Permanent)",
        "Items that Rewrite Stats",
        "Life-Altering Effects"
      ],
      "page": 219,
      "source": "Core"
    }
  ],
  "tables": [
    {
      "name": "Table 38: Item Type",
      "die": "d6",
      "page": 219,
      "rows": [
        {
          "roll": "1–2",
          "result": "Enchanted Mundane Item or Weapon (Table 39)"
        },
        {
          "roll": "3–4",
          "result": "Enchanted Clothing (Table 40)"
        },
        {
          "roll": "5–6",
          "result": "Enchanted Accessory (Table 41)"
        }
      ]
    },
    {
      "name": "Table 39: Enchanted Mundane Item or Weapon",
      "die": "d6",
      "page": 219,
      "rows": [
        {
          "roll": "1",
          "result": "+X Stat Bonus"
        },
        {
          "roll": "2",
          "result": "+X Skill Bonus"
        },
        {
          "roll": "3",
          "result": "A Buff (not Skill/Stat)"
        },
        {
          "roll": "4",
          "result": "Passive Skill at Rank = Floor Number"
        },
        {
          "roll": "5",
          "result": "Inherent Spell (no Mana; GM-set cooldown)"
        },
        {
          "roll": "6",
          "result": "Something Unique (Table 42)"
        }
      ]
    },
    {
      "name": "Table 40: Enchanted Clothing",
      "die": "d6",
      "page": 219,
      "rows": [
        {
          "roll": "1",
          "result": "+X Stat"
        },
        {
          "roll": "2",
          "result": "+X Skill"
        },
        {
          "roll": "3",
          "result": "A Buff"
        },
        {
          "roll": "4",
          "result": "Resistance to an uncommon damage type"
        },
        {
          "roll": "5",
          "result": "+1 Damage Resistance"
        },
        {
          "roll": "6",
          "result": "Something Unique (Table 42)"
        }
      ]
    },
    {
      "name": "Table 41: Enchanted Accessory",
      "die": "d6",
      "page": 219,
      "rows": [
        {
          "roll": "1",
          "result": "+X Stat"
        },
        {
          "roll": "2",
          "result": "+X Skill"
        },
        {
          "roll": "3",
          "result": "A Buff"
        },
        {
          "roll": "4",
          "result": "External Buff of Recovery (full Health) or Restore (full Mana) once per Floor"
        },
        {
          "roll": "5",
          "result": "Inherent Spell"
        },
        {
          "roll": "6",
          "result": "Something Unique (Table 42)"
        }
      ]
    },
    {
      "name": "Table 42: Something Unique",
      "die": "d6",
      "page": 220,
      "rows": [
        {
          "roll": "1",
          "result": "GM's choice"
        },
        {
          "roll": "2",
          "result": "Interacts with a god"
        },
        {
          "roll": "3",
          "result": "The thing is intelligent"
        },
        {
          "roll": "4",
          "result": "Summon minions to fight for you"
        },
        {
          "roll": "5",
          "result": "Mimics something from the encounter where the box was earned"
        },
        {
          "roll": "6",
          "result": "Player's choice (GM approval)"
        }
      ]
    }
  ],
  "goldByFloor": [
    {
      "floor": "First",
      "gold": "Nuthin'"
    },
    {
      "floor": "Second",
      "gold": "1d6 gold"
    },
    {
      "floor": "Third",
      "gold": "2d4 gold"
    },
    {
      "floor": "Fourth",
      "gold": "2d6 gold"
    },
    {
      "floor": "Fifth",
      "gold": "2d8 gold"
    }
  ],
  "notes": [
    "A typical box holds one magic item or scroll, a consumable or two, plus gold (GM's discretion).",
    "Gear rolls per box: Bronze 0, Silver 1, Gold 2, Platinum 3, Legendary 4, Celestial 5 — roll d6 on Table 38 per gear item.",
    "Percentage Stat boosts: compute the value when acquired, round down, record the number (not the %).",
    "A Skill Rank bonus in a Skill you lack means you now have that Skill at that Rank.",
    "Looting Mobs: each dead Mob carries 1d6 Misc. Junk + gold by floor; roll once and multiply by bodies."
  ]
};
