// GENERATED FILE - do not edit by hand.
// Source: data/dcc/monsters.json - regenerate with: node scripts/build-dcc-data.mjs

const DCC_MONSTERS = [
  {
    "name": "Prosperity Prophet",
    "role": "City Boss",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 23,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "16+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 55,
        "mod": 6
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 25,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Necrotic",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Drain Blood Debuff: Take 1d8+F Necrotic at the end of each round and the Prophet heals 1 HB slot, until the combat ends."
      },
      {
        "name": "Claw",
        "toHit": "15+F",
        "damage": "3d12+5",
        "damageType": "Necrotic",
        "range": "5ft range"
      },
      {
        "name": "Sleep Spell",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "50ft range, 20ft Blast radius",
        "rider": "Each affected crawler makes a free Con Stat Check vs Difficulty 16+F or they gain the Unconscious Debuff: They are prone and cannot take actions. If they take damage, they wake up."
      }
    ],
    "notes": [
      "Drain Blood—If a creature perishes due to Drain Blood, they must make a Con Stat Check vs Difficulty 15+F or become an Undead Minion under the control of the Prosperity Prophet.",
      "Flight—Prosperity Prophets can move through the air as though on the ground and hover in place.",
      "Money Grubbing—Throwing gold at the Prosperity Prophet stops him in his tracks, and he becomes distracted picking it up. The Prosperity Prophet loses one Action for each 100 gold that is thrown at him as an Action.",
      "Undead Minions—A Moderate group are in the Boss Chamber. These have the same stat block as the Pack Rat (see p. 31), except that they deal Necrotic damage."
    ],
    "page": 144,
    "source": "GM Toolkit"
  },
  {
    "name": "Beloved Mimic",
    "role": "City Boss",
    "size": 7,
    "tags": [
      "Aberration"
    ],
    "level": 25,
    "hbSlots": [
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7
    ],
    "surprise": "15+F",
    "evade": "13+F",
    "move": "5",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 100,
        "mod": 7
      },
      "DEX": {
        "score": 9,
        "mod": 3
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d12+5",
        "damageType": "Piercing",
        "range": "15ft range",
        "rider": "If a crawler does not successfully Evade, they gain the Swallowed Debuff (see below)."
      },
      {
        "name": "Heartstrings",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "100ft range, 20ft Blast radius",
        "rider": "Crawlers make a free Cha Stat Check vs Difficulty 15+F or they gain the Mesmerized Debuff (see below)."
      },
      {
        "name": "Psionic Strike",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Psychic",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Mental Scarring Debuff: Subtract 1 from the crawler's Int Mod until the end of the combat."
      }
    ],
    "notes": [
      "Mesmerized—The Beloved Mimic perfectly mimics whomever the crawler loves the most. While Mesmerized, crawlers cannot attack the Mimic and must spend their 10ft Step to move towards the Mimic. Each time a crawler takes any damage, they may make an Int Stat Check vs Difficulty 15+F to remove this Debuff.",
      "Swallowed—The Beloved Mimic swallows the crawler whole. When an attack against the Mimic results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff. Swallowed crawlers take 1d8+F Acid at the end of each round. Swallowed crawlers attack with Disadvantage, but the Mimic has no DR against such an attack, and Slashing attacks deal x2 damage."
    ],
    "page": 145,
    "source": "GM Toolkit"
  },
  {
    "name": "Station Mimic",
    "role": "City Boss",
    "size": 8,
    "tags": [
      "Aberration",
      "Mimic"
    ],
    "level": 80,
    "hbSlots": [
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 155,
        "mod": 8
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 201,
        "mod": 9
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 24,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Neck Snap",
        "toHit": "18+F",
        "damage": "7d10+8",
        "damageType": "Bludgeoning",
        "range": "50ft range"
      },
      {
        "name": "Acid Spit",
        "toHit": "15+F",
        "damage": "6d8",
        "damageType": "Acid",
        "range": "50ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Bite",
        "toHit": "18+F",
        "damage": "5d8+8",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "Armor-Piercing. Any hit crawler gains the Swallowed Debuff: The crawler is swallowed whole. When an attack against the Mimic results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff. Swallowed crawlers take 1d8+F Acid at the end of each round. Swallowed crawlers attack with Disadvantage vs. 0 DR, and Slashing attacks deal x2 damage."
      },
      {
        "name": "Shaken and Stirred",
        "toHit": "18+F",
        "damage": "6d8+8",
        "damageType": "Bludgeoning",
        "range": "100ft Burst radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down and Terrified Debuffs. Only uses this every other round."
      }
    ],
    "notes": [
      "Down and Out—Station Mimics double their STR mod for any damage done against a crawler that has the Take Down Debuff.",
      "Mimic Regeneration—When the Station Mimic takes 2+ HB in damage, a piece of the Station Mimic is sliced off. This piece grows legs and crawls back to the main body and reattaches on the Station Mimic's next turn. When it reattaches to the main body, the Mimic regains Health Bar slots equal to half of what was lost when the piece was sliced off. If returning piece receives 1 HB or more of damage, it is destroyed.",
      "Minions—Once per round as an action, the Station Mimic can produce 3d8 car-sized slobbering mouths each on centipede-like legs (use the Level 20 Mimic, p. 432).",
      "She's a Brick House—Station Mimics have Resistance to Bludgeoning damage.",
      "Sliced and Diced—Station Mimics have Disadvantage against Slashing attacks and take x2 damage from them.",
      "Stealthy—Any Station Mimic that is not surprised attacks with Advantage during the first round of combat."
    ],
    "page": 438,
    "source": "Core"
  },
  {
    "name": "Ringmaster Grimaldi",
    "role": "City Boss",
    "size": 7,
    "tags": [
      "Plant"
    ],
    "level": 85,
    "hbSlots": [
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9,
      9
    ],
    "surprise": "17+F",
    "evade": "14+F",
    "move": "10+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 109,
        "mod": 7
      },
      "INT": {
        "score": 103,
        "mod": 7
      },
      "CON": {
        "score": 201,
        "mod": 9
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 22,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Commanding the Retinue",
        "toHit": "17+F",
        "damage": "No damage",
        "range": "50ft range",
        "rider": "Any hit crawler has 3d6 of Grimaldi's minions (Former Circus Lemurs, Giraffes, Mold Lions, Clowns, and Ogres) appear and attack them."
      },
      {
        "name": "Mental Link",
        "toHit": "17+F",
        "damage": "No damage",
        "range": "100ft Burst radius",
        "rider": "Any hit crawler gains the Mental Intrusion Debuff: Grimaldi shares a collective consciousness with those infected by his parasites. He can speak directly into their minds, see their memories, and even attempt to exert a \"mental tug\" to stop their actions. Crawlers must make an INT Stat Check. On Fail, they gain the Paralyzed Debuff. Crawlers can attempt this Check again once per round."
      },
      {
        "name": "Vinally Yours",
        "toHit": "17+F",
        "damage": "6d10+7",
        "damageType": "Piercing",
        "range": "100ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Vined For Good Debuff: The crawler gains the Blood Trail and Sepsis Debuffs as vines begin growing from and through their body."
      }
    ],
    "notes": [
      "Elite \"Plot Armor\"—Grimaldi remains \"center stage\" in the big top arena, where his performers continue to act out a parody of their original circus routines while ignoring outside threats unless specifically engaged.",
      "Rounded Up—Grimaldi takes x4 damage from Poison.",
      "Sentimental—Grimaldi has Disadvantage on all attacks for the round the first time Signet is mentioned to him. If Signet is allied with the crawlers and fighting with them, the number of attacks Grimaldi can make is reduced by 2 for the first three rounds."
    ],
    "page": 422,
    "source": "Core"
  },
  {
    "name": "Ball of Swine",
    "role": "Borough Boss",
    "size": 7,
    "tags": [
      "Amalgamation"
    ],
    "level": 15,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 4,
        "mod": 2
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Assimilated",
        "toHit": "14+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff, having been caught up in the rolling orgy ball."
      },
      {
        "name": "Bowled Over",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Bludgeoning",
        "range": "40ft Line",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Amalgamation—The Ball of Swine is a 15-foot-tall ball comprised of 30 Tuskling Knights (Level 4) and 30 Tuskling Courtesans (Level 5). All are unarmed and untrained. When the Ball of Swine is reduced to less than half Health it starts to unravel and the Tusklings inside become individual Mobs that must be killed to defeat the Boss. All 60 of the Tuskling Mobs are disoriented and do not fight back. Each has 0 DR, and 2 HB slots remaining each with a 2 in them.",
      "Constant Momentum—The Ball of Swine can instantly change the direction it is traveling without losing speed.",
      "Snagged—The Ball of Swine can be stopped by reducing the space it has for traveling. This takes three successful checks from different crawlers using appropriate skills (GM determined). When Snagged, attacks against it are made with Advantage."
    ],
    "page": 142,
    "source": "GM Toolkit"
  },
  {
    "name": "Rakish Werehound Shocker",
    "role": "Borough Boss",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 19,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 21,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "(Secret!) On an Evade Major Fail or worse, the crawler gains the Lycanthropy Debuff: The crawler turns into a Werehound the following night. The Debuff is removed if the crawler has the Dying Debuff."
      },
      {
        "name": "Claw",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Headbutt",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler must make a Cha Stat Check vs Difficulty 15+F or gain the Charmed Debuff: The crawler is enamored with the Werehound's perfect hair, spending their next Action to apply a Health Potion to the Boss."
      },
      {
        "name": "Lightning Bolt Spell",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Electric",
        "range": "30ft Line",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Shocked Debuff."
      }
    ],
    "notes": [
      "Savagely Sexy—Rakish Werehound Shocker double their Str Mod for damage done to cats, royalty, and women aged 40+.",
      "Silver Weakness—Silver weapons do x2 damage to Werehounds, bypass DR, and apply The Taint Debuff."
    ],
    "page": 147,
    "source": "GM Toolkit"
  },
  {
    "name": "King Ghiduckrah",
    "role": "Borough Boss",
    "size": 8,
    "tags": [
      "Reptile"
    ],
    "level": 42,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 60,
        "mod": 6
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 70,
        "mod": 6
      },
      "DEX": {
        "score": 28,
        "mod": 5
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Piercing",
        "range": "40ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Swallowed Debuff: Swallowed crawlers take 1d8+F Acid at the end of each round, but cannot be attacked. Swallowed crawlers attack with Disadvantage vs. 0 DR, and Slashing attacks deal x2 damage."
      },
      {
        "name": "Lightning Blast Spell",
        "toHit": "16+F",
        "damage": "4d6+5",
        "damageType": "Electric",
        "range": "500ft range, 20ft Blast radius (if the target is in the water)",
        "rider": "Any crawler who loses 3+ HB slots gains the Shocked Debuff."
      }
    ],
    "notes": [
      "Cold Vulnerability—Ice attacks do x2 damage to King Ghiduckhra.",
      "Necktied—After declaring an attack against a neck, inform the crawler that the attack is made with Disadvantage. If any single attack deals 4+ HB slots of damage to one of King Ghiduckhra's necks, that neck is severed and their number of attacks is reduced by 1 for the remainder of the combat. Even if all three heads are cut off, the body still acts.",
      "Poisonous Blood—Any crawler who damages King Ghiduckhra with a melee attack is inflicted with a Poisoned Debuff doing 1d8+F Poison per round. This Debuff is stackable and only removed with a Poison Antidote."
    ],
    "page": 498,
    "source": "Core"
  },
  {
    "name": "Penthos",
    "role": "Borough Boss",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 62,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "17+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 22,
        "mod": 5
      },
      "INT": {
        "score": 100,
        "mod": 7
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 36,
        "mod": 6
      },
      "CHA": {
        "score": 65,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Dagger",
        "toHit": "15+F",
        "damage": "7d4+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Heighten Emotion Spell",
        "toHit": "17+F",
        "damage": "No damage",
        "range": "sight range, 15ft Blast radius",
        "rider": "Any hit crawlers gain a Debuff of his (GM's) choice for 1 round. On an Evade Major Fail or worse, he applies two Debuffs of his choice for 2 rounds."
      },
      {
        "name": "Sabotage",
        "toHit": "17+F",
        "damage": "6d8",
        "damageType": "Acid/Electric/Fire/Ice (depends on equipment sabotaged)",
        "range": "15ft Cone from sabotaged equipment",
        "rider": "Each sabotaged piece of equipment can only trigger once, unless reset by Rivet. On an Evade Major Fail or worse, the crawler gains the Enraged Debuff."
      }
    ],
    "notes": [
      "Battle High—Penthos gains +1 to damage after each successful attack; duration lasts until an attack misses, where the count resets and starts over.",
      "Demoralize—Worried Mobs or NPCs must make a CHA Stat Check each round. On Fail, they gain the Terrified Debuff.",
      "Mind Control—Mobs and NPCs with the Terrified Debuff become Penthos's minions. They have only 1 Action per round, and must act as his ally. Penthos can spend one of his Actions to make all minions perform an additional action of his choosing during crawler actions.",
      "Power of a Name—If Penthos knows the true name of an entity, he knows their exact location, and that entity has Disadvantage against his Heighten Emotion Spell."
    ],
    "page": 465,
    "source": "Core"
  },
  {
    "name": "Fowl Player",
    "role": "Borough Boss",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 65,
    "hbSlots": [
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 52,
        "mod": 6
      },
      "INT": {
        "score": 53,
        "mod": 6
      },
      "CON": {
        "score": 102,
        "mod": 7
      },
      "DEX": {
        "score": 54,
        "mod": 6
      },
      "CHA": {
        "score": 24,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Berserk Howl",
        "toHit": "16+F",
        "damage": "6d10+6",
        "damageType": "Sonic",
        "range": "40ft Burst radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Paralyzed Debuff."
      },
      {
        "name": "Fowl Hug",
        "toHit": "16+F",
        "damage": "6d12+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any crawler hit gains the Held Debuff."
      },
      {
        "name": "Pounce",
        "toHit": "16+F",
        "damage": "6d10+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Staggered and Take Down Debuffs."
      },
      {
        "name": "Talon Strike",
        "toHit": "16+F",
        "damage": "7d12+6",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "The Ceiling—A ranged attack that can reach 50 feet and deal 12+ damage causes a portion of the ceiling to collapse, dealing 4d10 damage to each combatant below the targeted section. If the Boss is flying at the time, it takes x2 damage. (Secret: This works twice.)",
      "Fanatic—Fowl Player is immune to fear, charm, and mind-affecting abilities.",
      "Flight—Fowl Player can move through the air as though on the ground when in a Skyfowl form.",
      "No Fowl Fool—When reduced to half Health Bars or less, Fowl Player shifts to Elf form and attempts to hide among his minions, where crawlers have Disadvantage to hit him.",
      "Shift Stick—Fowl Player can shift into various Elf and Skyfowl forms as an action. Crawlers have Advantage to hit Fowl Player during a round in which Fowl Player is shifting."
    ],
    "page": 399,
    "source": "Core"
  },
  {
    "name": "More Dread",
    "role": "Borough Boss",
    "size": 6,
    "tags": [
      "Construct"
    ],
    "level": 70,
    "hbSlots": [
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 100,
        "mod": 7
      },
      "INT": {
        "score": 50,
        "mod": 6
      },
      "CON": {
        "score": 100,
        "mod": 7
      },
      "DEX": {
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Huge-Ass Sword",
        "toHit": "17+F",
        "damage": "7d10+7",
        "damageType": "Slashing",
        "range": "10ft range"
      },
      {
        "name": "Crushing Step",
        "toHit": "17+F",
        "damage": "6d6+7",
        "damageType": "Bludgeoning",
        "range": "10ft Burst Radius",
        "rider": "Any hit crawler gains the Take Down Debuff."
      },
      {
        "name": "Just Dreadful",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "30ft Burst radius",
        "rider": "Any hit crawler gains the Terrified Debuff."
      }
    ],
    "notes": [
      "Split the Party—More Dread can spend his Move to decouple the subway cars. A crawler on the subway car must make a DEX Stat Check to avoid falling off the car. On Fail, the crawler falls and takes 5d6 Bludgeoning."
    ],
    "page": 520,
    "source": "Core"
  },
  {
    "name": "The Hoarder",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 7,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 8,
        "mod": 3
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 9,
        "mod": 3
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Punch",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      },
      {
        "name": "Drop and Roll",
        "toHit": "13+F",
        "damage": "1d8+4",
        "damageType": "Bludgeoning",
        "range": "20ft Line (see below)",
        "rider": "The Hoarder makes a free 20ft move during this attack."
      },
      {
        "name": "Regurgitate",
        "toHit": "",
        "damage": "",
        "rider": "see Infested below"
      },
      {
        "name": "Throw Trash",
        "toHit": "13+F",
        "damage": "1d6+3",
        "range": "60ft range"
      }
    ],
    "notes": [
      "Infested—Either a Weak group of Hissing Scatterers or Scatterer Brood Guardians emerge from the Hoarder's mouth at the start of each round. These Scatterers don't act until the following round. They share the Hoarder's space and have a +4 bonus to Evade during the round they emerge. Killing all the emerging Scatterers by the end of that round kills the Hoarder by choking her on Scatterers trying to emerge from behind the corpses."
    ],
    "page": 143,
    "source": "GM Toolkit"
  },
  {
    "name": "The Juicer",
    "role": "Neighborhood Boss",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 9,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "11+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 1,
        "mod": 1
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Choke",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Fiery Weight",
        "toHit": "10+F",
        "damage": "1d8+5",
        "damageType": "Bludgeoning",
        "range": "50ft range (see Feel the Burn below)",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed back 10ft."
      }
    ],
    "notes": [
      "Feel the Burn—The Juicer throws barbell weights with such speed and force they catch fire in the air and explode if they don't hit their intended target. On any Evade Success vs Fiery Weight, the weight hits the closest object or wall behind the target and explodes, dealing 1d8+F Fire to entities within 10ft of the impact.",
      "Get Your Blood Pumping—The Juicer's bulging veins are susceptible to being cut open. The Juicer has a -2 penalty to DR against edged weapons. Crawlers may roll attacks with Disadvantage in order to target his bulging veins. If they hit, apply the Blood Trail Debuff."
    ],
    "page": 147,
    "source": "GM Toolkit"
  },
  {
    "name": "General Kong",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Primate"
    ],
    "level": 10,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14",
    "evade": "16",
    "move": "20",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 19,
        "mod": 4
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Kong Smash",
        "toHit": "16",
        "damage": "3d6+4",
        "damageType": "bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Explosive Barrel",
        "toHit": "14",
        "damage": "2d8",
        "damageType": "Bludgeoning",
        "range": "60ft range, 20ft Blast radius",
        "rider": "Once per round."
      }
    ],
    "notes": [
      "This Neighborhood Boss prints only 10 Health Bar slots (10%-100%), not the usual 13.",
      "Commanding—As an Action, General Kong shouts tactical commands at his Back Nine Battle Baboons to grant them all a bonus of +2 damage to their Golf Swing attacks. He does this only if all of the PCs are at 30% Health Bar or greater, and if there are at least three Baboons remaining.",
      "Tyrannical Loyalty—If General Kong loses 4+ Health Bar slots in a single blow, the nearest Baboon (if any) dives in the way and takes the damage instead.",
      "Jar Crack—The first time any crawler hits Kong with an Amazing Success or better, he drops the peanut butter jar, and it breaks. Rosie comes spilling out, growing to full size, but clearly in trouble. Since the lid wasn't properly removed, she is dying and will be dead after two rounds due to her Con Mod of +2. This creates an immediate dilemma: finish the fight or save Rosie."
    ],
    "page": 22,
    "source": "Par"
  },
  {
    "name": "Krakaren Clone",
    "role": "Neighborhood Boss",
    "size": 8,
    "tags": [
      "Aberrant"
    ],
    "level": 10,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Tentacles",
        "toHit": "14+F",
        "damage": "2d4+5",
        "damageType": "Bludgeoning",
        "range": "15ft Cone",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Constrict",
        "toHit": "None",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "Auto-hits a Held foe"
      },
      {
        "name": "Beak Bite",
        "toHit": "15+F",
        "damage": "2d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Spit Spray",
        "toHit": "12+F",
        "damage": "3d6+2",
        "damageType": "Poison",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      },
      {
        "name": "Pyramid Pitch",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "50ft range",
        "rider": "Make a free Cha Stat Check vs the attack. On Fail, must spend next Action attacking an ally."
      }
    ],
    "notes": [
      "Bad Hair Day—Krakarens believe they have a flattering hairstyle, and if it gets messed up, they are frantic. Any attack that results in an Amazing Success or better causes all Held Debuffs to cease."
    ],
    "page": 146,
    "source": "GM Toolkit"
  },
  {
    "name": "Ralph the Frenzied Gerbil",
    "role": "Neighborhood Boss",
    "size": 1,
    "tags": [
      "Beastly"
    ],
    "level": 11,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 14,
        "mod": 4
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Ravening Jaw",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Rat Bite Fever Debuff: Take 1d6+F Poison at the end of each round until the combat ends."
      },
      {
        "name": "Scratch",
        "toHit": "14+F",
        "damage": "2d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Squeal",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Sonic",
        "range": "60ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Cuteness Appeal—At the start of combat, all crawlers who see Ralph must make an Int or Cha Stat Check with a Difficulty of 14+F. On Fail, Ralph's cuteness causes them to make attacks with Disadvantage during the first round of combat.",
      "Frenzied—Ralph has a Step distance of 20ft instead of 10ft.",
      "Hatred of Humans—Ralph prioritizes attacking humans, and all his attacks deal an additional +5 bonus damage against them.",
      "Still a Tiny Gerbil—If a Dingo eats Ralph, the Gerbil uses two actions to kill and escape from the Dingo at the start of the next round. All attacks against Ralph have Advantage during that next round."
    ],
    "page": 148,
    "source": "GM Toolkit"
  },
  {
    "name": "Heather the Bear",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Animal"
    ],
    "level": 19,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Bear Hug",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Boring Parasites",
        "toHit": "15+F",
        "damage": "2d10+6",
        "damageType": "Piercing",
        "range": "10ft range, Armor-Piercing",
        "rider": "Any hit crawler gains the Mental Intrusion Debuff: Parasites begin talking directly into the crawler's mind, giving them the Queasy and Staggered Debuffs."
      },
      {
        "name": "Worm Claw Whip",
        "toHit": "16+F",
        "damage": "2d8+5",
        "damageType": "Bludgeoning",
        "range": "20ft range",
        "rider": "On an Evade Major Fail or worse, the crawler is pulled 10ft and gains the Held Debuff."
      }
    ],
    "notes": [
      "I Got Better—If Heather is healed by a crawler, her attacks are made with Disadvantage in the following round.",
      "Unbearable—If Heather fails to deal any damage during a round of combat, she gives up and asks to be put out of her misery."
    ],
    "page": 421,
    "source": "Core"
  },
  {
    "name": "Big Daddy Nick",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 25,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 15,
        "mod": 4
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bowie Knife",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Candy Shot",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "100ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sugar Rush Debuff: Take 1d8+F Poison damage each round until the end of combat (stackable). Allows a free Move action each round, but all Moves must be for the full possible distance. If a crawler Moves twice in one round as per the Debuff, they lose the Sugar Rush Debuff and gain the Sugar Crash Debuff until end of combat: No Stat Mods added to rolls, ends if Sugar Rush Debuff is regained."
      },
      {
        "name": "Triple Treat",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Fire",
        "range": "60ft range, 10ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Delusional—Crawlers can make an INT-Opposed Deception Skill Check to convince Big Daddy Nick an alien invasion is imminent. On Success, Big Daddy Nick gains the Enraged Debuff.",
      "Survivalist's Stash—Big Daddy Nick keeps improvised grenades in camouflaged nets attached to the roof of his cabin. These grenades can be targeted with an attack with an Evade of 10+F to hit and made to drop, dealing 3d6 Fire and exploding in a 20ft Burst radius around Nick and his minions if they are led under them (they don't expect the explosion so they don't Evade)."
    ],
    "page": 366,
    "source": "Core"
  },
  {
    "name": "Centurion Skyfowl",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Beastly"
    ],
    "level": 25,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 21,
        "mod": 5
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Aerial Head Slam",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Bludgeoning",
        "range": "5 ft range",
        "rider": "Any hit crawler gains the Staggered and Take Down Debuffs."
      },
      {
        "name": "Sonic Screech",
        "toHit": "14+F",
        "damage": "2d10+4",
        "damageType": "Sonic",
        "range": "30ft Cone, +5ft Splash",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Terrified Debuff."
      },
      {
        "name": "Talon Slash",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Slashing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Heavy Hitter—If Jack Screecher's previous attack hits a crawler, that crawler has Disadvantage on their next Evade attempt. If Jack Screecher's previous attack misses a crawler, that crawler has Advantage on their next Evade attempt.",
      "Flight—Jack Screecher can move through the air as though on the ground."
    ],
    "page": 342,
    "source": "Core"
  },
  {
    "name": "The Divider",
    "role": "Neighborhood Boss",
    "size": 7,
    "tags": [
      "Monstrous"
    ],
    "level": 27,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 31,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 27,
        "mod": 5
      },
      "DEX": {
        "score": 23,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Piercing",
        "range": "15ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff. The Divider has learned that diving deep underwater after grabbing prey is a quick way to finish them off and eat in peace. Crawlers with the Held Debuff must make a STR-Opposed Escape Artist Skill Check, or a STR Stat Check at the same Difficulty. On Fail, they are dragged underwater and gain the Drowning Debuff."
      },
      {
        "name": "Tail Swipe",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Bludgeoning",
        "range": "60ft Cone",
        "rider": "The Divider's Tail Swipe is powerful enough to generate tsunami-like waves even in open water in a cone that's 60ft in length. Any boats within hit by the attack have a 50% of capsizing, though someone piloting a boat can attempt an appropriate Unopposed Skill Check to prevent capsizing. On Fail, they capsize. Anyone in the water in the area must make a Swimming Skill Check. On Fail, they gain the Drowning Debuff."
      }
    ],
    "notes": [
      "Eating With Your Mouth Full—When a crawler is Held in one of the Divider's mouths, that mouth can't Bite without releasing the crawler; the crawler automatically moves with the Divider when it moves with no penalties to the Divider's Move or Step.",
      "Easily Distracted—Decoys and dummy boats can be used to distract the Divider. The presence of 1 or more of these reduces the Divider's attacks by 1 for 1d4 rounds.",
      "Enormous Size—When the Divider is in water, it can move into or through spaces occupied by entities or objects smaller than itself, causing them to be pushed 10ft in a direction perpendicular to the Divider's movement. The Divider has Disadvantage on attacks within 20ft of shore due to its size.",
      "Swim—The Divider can move through water as on the ground."
    ],
    "page": 354,
    "source": "Core"
  },
  {
    "name": "The Dispenser",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Beastly"
    ],
    "level": 30,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 52,
        "mod": 6
      },
      "INT": {
        "score": 12,
        "mod": 4
      },
      "CON": {
        "score": 24,
        "mod": 5
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Aerial Slam",
        "toHit": "16+F",
        "damage": "3d10+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Take Down Debuff."
      },
      {
        "name": "Caustic Mist",
        "toHit": "15+F",
        "damage": "3d8+4",
        "damageType": "Acid",
        "range": "20ft Cone +10ft Splash",
        "rider": "Any crawler who fails to Evade gains the Burned Debuff."
      },
      {
        "name": "Tail Whip",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Slashing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Camouflage—The Dispenser has Advantage on its attacks during the first round of combat. The Dispenser dispenses his attacks against crawlers in pairs when able. If it is going to use Aerial Slam against a crawler, it uses it as its first attack against that crawler.",
      "Them's Good Eatin'—The Dispenser will spend an action to swallow any crawler that gains the Take Down Debuff from Aerial Slam. The crawler must make a STR Stat Check. On Fail, they have the Swallowed Debuff: They take 1d10+F Acid at the end of each round until they escape. To escape, they must make a STR-Opposed Escape Artist Skill Check, or a STR Stat Check at the same Difficulty. While Swallowed, The Dispenser's DR does not apply to that crawler's attacks.",
      "Big Head, But Beady Eyes—Attacks to The Dispenser's rear have Advantage.",
      "Flight—The Dispenser can move through the air as though on the ground."
    ],
    "page": 378,
    "source": "Core"
  },
  {
    "name": "Yakov",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Sasquatch"
    ],
    "level": 30,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 51,
        "mod": 6
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      },
      {
        "name": "Chewed Up",
        "toHit": "16+F",
        "damage": "3d6+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Sepsis Debuff. This attack may only be made against Held crawlers."
      },
      {
        "name": "Landmine Frisbee",
        "toHit": "16+F",
        "damage": "4d8",
        "damageType": "Force",
        "range": "30ft range, 10ft Blast radius"
      },
      {
        "name": "Whistle Stop",
        "toHit": "13+F",
        "damage": "4d6+3",
        "damageType": "Sonic",
        "range": "30ft Burst radius",
        "rider": "Any crawler who fails to Evade gains the Muted Debuff. Can be used once per day."
      }
    ],
    "notes": [
      "Listen to Coach—Yakov can spend an Action to coordinate attacks of the Sporto Teen Wolves, granting any within 30ft Advantage on their next attack.",
      "Take the Lead—A crawler can spend an Action to make an INT Stat Check to determine the pattern of the landmines. On Success, Yakov is led into one and takes 4d8 Fire damage. This can be done only once per round.",
      "We're Cool—A crawler can make an INT-Opposed Deception Check at the beginning of combat to convince Yakov they are with Steph. On Success, all crawlers gain Advantage on their first attack."
    ],
    "page": 388,
    "source": "Core"
  },
  {
    "name": "Pooka",
    "role": "Neighborhood Boss",
    "size": 2,
    "tags": [
      "Shapeshifter"
    ],
    "level": 35,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Mind Devour",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Psychic",
        "range": "30ft range"
      },
      {
        "name": "Head Butt",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Woozy Debuff. This attack can only be used in goat form."
      },
      {
        "name": "Sweet Song",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "40ft Burst radius",
        "rider": "Any crawler who fails to Evade gains the Unconscious Debuff: They are prone and cannot take actions. If they take damage, they wake up."
      },
      {
        "name": "Vitamin Shot",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Size ranges from Small (2) to Huge (6).",
      "Transformational—When attacked, a Pooka transforms into a huge goat.",
      "Your Friendly Neighborhood Drug Dealer—If Pooka is outnumbered, they can call upon Mobs that are their clients to help deal with the crawlers. Use some of the other Mobs in this section as example clients."
    ],
    "page": 442,
    "source": "Core"
  },
  {
    "name": "Flavisham the Tinkerer",
    "role": "Neighborhood Boss",
    "size": 7,
    "tags": [
      "Construct"
    ],
    "level": 37,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 35,
        "mod": 5
      },
      "INT": {
        "score": 29,
        "mod": 5
      },
      "CON": {
        "score": 30,
        "mod": 5
      },
      "DEX": {
        "score": 32,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Pin-Saw",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Net",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "60ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Sludge Spit",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Acid",
        "range": "30ft range, 10ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Bio-Mechanical—Flavisham the Tinkerer loses all DR and takes x2 damage when removed from his cockpit. Removing him should take at least two crawlers working together for two rounds and coming up with a great plan.",
      "Attack the Legs—Crawlers can declare attacks against the legs. Only then tell them it's made with Disadvantage. If the Flav loses 2+ HB slots from such an attack, he loses a leg and also loses one Action."
    ],
    "page": 488,
    "source": "Core"
  },
  {
    "name": "War Mage",
    "role": "Neighborhood Boss",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 37,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "17+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 101,
        "mod": 7
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Elemental Attack Spell",
        "toHit": "17+F",
        "damage": "5d6+7",
        "damageType": "damage (type depends on Spell Specialization)",
        "range": "100ft range, 10ft Blast radius"
      },
      {
        "name": "Cloud Attack Spell",
        "toHit": "17+F",
        "damage": "4d8+7",
        "damageType": "damage (type depends on Spell Specialization)",
        "range": "100ft range, 20ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Pull Spell",
        "toHit": "17+F",
        "damage": "4d8+7",
        "damageType": "Bludgeoning",
        "range": "100ft range",
        "rider": "Any hit crawler is pulled up to 30ft in the direction of the War Mage's choosing."
      },
      {
        "name": "Skin Peel",
        "toHit": "17+F",
        "damage": "4d8+7",
        "damageType": "Slashing",
        "range": "60ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      }
    ],
    "notes": [
      "Sapient Moment of Destruction—Ten minutes after death, a War Mage's head will explode dealing 5d12+7 Force damage, 100ft Burst radius. A crawler can temporarily delay this by putting the head in their inventory, which pauses the 10-minute timer.",
      "Spell Specialization—War Mages have a specialty area (such as Fire Spells, Force Spells, or Healing Spells) and can cast any Spells in that area of specialization at Rank 15.",
      "What a Know-It-All—War Mages have access to hundreds of different Spells and can spend their move to recall one and then use it. War Mages can cast virtually any Spell at Rank 10.",
      "You're Not Done Yet Spell—When cast on a fallen crawler or Mob, it rips the flesh from their body and creates a Flesher (see p. 434)."
    ],
    "page": 439,
    "source": "Core"
  },
  {
    "name": "Mantaur",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Mantaur"
    ],
    "level": 40,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 53,
        "mod": 6
      },
      "INT": {
        "score": 13,
        "mod": 3
      },
      "CON": {
        "score": 51,
        "mod": 5
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Claws",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Slashing",
        "range": "10ft range"
      },
      {
        "name": "Grab",
        "toHit": "16+F",
        "damage": "4d8+6",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Headbutt",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Woozy Debuff."
      },
      {
        "name": "Tripple Stomp",
        "toHit": "16+F",
        "damage": "5d10+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sore as Shit Debuff."
      }
    ],
    "notes": [
      "Four Armed is Four Warned—Mantaur can spend their Move to use one set of arms to hold a crawler. The crawler must make a STR-Opposed Escape Artist Skill Check. On Fail, the crawler gains the Held Debuff.",
      "Group Berserking—When exposed to Megadeth and other music similar in style and genre, Mantuars gain the Berserk Buff: They gain an additional attack each round, but all their attacks are at Disadvantage. In addition, attacks against Mantuars gain Advantage while they are Berserk.",
      "Magic Resistance—Mantuars are immune to Spells below Rank 5, and also specifically immune to Magic Missile below Rank 11."
    ],
    "page": 440,
    "source": "Core"
  },
  {
    "name": "Revengineer",
    "role": "Neighborhood Boss",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 41,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 38,
        "mod": 5
      },
      "INT": {
        "score": 30,
        "mod": 5
      },
      "CON": {
        "score": 40,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Fire Axe",
        "toHit": "15+F",
        "damage": "5d10+5",
        "damageType": "Fire",
        "range": "5ft range"
      },
      {
        "name": "Burning Agony",
        "toHit": "14+F",
        "damage": "4d8",
        "damageType": "Fire",
        "range": "30ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Fleeting—Unless he is wet, the Revengineer is immune to damage that does not specifically affect ephemeral enemies.",
      "Steam Punked—The Revengineer died by steam and is afraid of it. Crawlers Evade all his attacks with Advantage if he's within steam, or merely his next attack if he is sprayed with steam."
    ],
    "page": 476,
    "source": "Core"
  },
  {
    "name": "Switchmaster Scotty",
    "role": "Neighborhood Boss",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 45,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "16+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 50,
        "mod": 6
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 24,
        "mod": 5
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "An Actual Fucking Train",
        "toHit": "16+F",
        "damage": "4d10",
        "damageType": "Bludgeoning",
        "range": "60ft Line",
        "rider": "Any hit crawler gains the Take Down and Woozy Debuffs. This attack uses the train switches."
      },
      {
        "name": "Switch Handle",
        "toHit": "15+F",
        "damage": "5d10+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      },
      {
        "name": "Train Car Club",
        "toHit": "16+F",
        "damage": "3d12",
        "damageType": "Bludgeoning",
        "range": "20ft range",
        "rider": "Any hit crawler gains the Hit By a Train Debuff: The crawler is pushed 15ft, and gains the Stunned, Staggered, and Sore as Shit Debuffs. This attack uses the crane."
      }
    ],
    "notes": [
      "Blindsided—The crane cab has limited visibility. Crawlers that attack from the periphery or rear gain Advantage on their attacks.",
      "No Power For You—The crane is powered by a complex dwarven battery. Crawlers can make an Unopposed Engineering Skill Check. On Success, the control room and crane lose power, preventing Switchmaster Scotty from using An Actual Fucking Train and Train Car Club for 1d4 rounds as he works to reroute power.",
      "Reroute—Crawlers can make an INT Stat Check to reroute the train cars. On Success, they prevent Switchmaster Scotty from using An Actual Fucking Train for 1d4 rounds."
    ],
    "page": 453,
    "source": "Core"
  },
  {
    "name": "Kibril Atheras Darkoak",
    "role": "Quest Boss",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 60,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 55,
        "mod": 6
      },
      "INT": {
        "score": 55,
        "mod": 6
      },
      "CON": {
        "score": 30,
        "mod": 5
      },
      "DEX": {
        "score": 55,
        "mod": 6
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Kinetic Blast",
        "toHit": "16+F",
        "damage": "6d10+6",
        "damageType": "Force",
        "range": "50ft range"
      },
      {
        "name": "Choking Gas",
        "toHit": "16+F",
        "damage": "6d6+6",
        "damageType": "Poison",
        "range": "30ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Deadly D4s",
        "toHit": "16+F",
        "damage": "7d4+6",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Fire Storm",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Fire",
        "range": "50ft range, 20ft Blast radius +10ft Splash",
        "rider": "Any crawler who fails to Evade gains the Burned Debuff."
      }
    ],
    "notes": [
      "Boss of the 'A Shelf on an Elf' Quest (a.k.a. Keeble). Type line printed as \"Quest Boss\".",
      "Earthen Wall—Kibril Altheras Darkoak can create earth or stone walls to separate and isolate crawlers as an action. This gives Kibril Altheras Darkoak Advantage on their attacks against isolated crawlers.",
      "Soul Crystal Shield—Kibril Altheras Darkoak has several marble-size soul crystals orbiting around him. They have the same Evade as Kibril Altheras Darkoak, and if one is hit, it disrupts Kibril Altheras Darkoak' use of the ability for one round. A crawler can make an INT-Opposed Perception Check or an INT Stat Check of the same Difficulty. On Success, the crawler can identify which soul crystals are used for which effects. In addition, each time a crystal is hit, it lowers his DR and Evade by 1 during the following round."
    ],
    "page": 410,
    "source": "Core"
  },
  {
    "name": "Tsarina Signet",
    "role": "Elite",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 60,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 22,
        "mod": 5
      },
      "INT": {
        "score": 53,
        "mod": 6
      },
      "CON": {
        "score": 25,
        "mod": 5
      },
      "DEX": {
        "score": 53,
        "mod": 6
      },
      "CHA": {
        "score": 52,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Energy Bolt Spell",
        "toHit": "16+F",
        "damage": "7d6+6",
        "damageType": "Force",
        "range": "50ft range"
      },
      {
        "name": "Charming Seduction Spell",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "10ft range",
        "rider": "Any hit crawler must make an INT Stat Check. On Fail, they gain the Charmed Debuff: They cannot attack Signet and must stand still or obey basic, non-aggressive commands. The crawler can attempt an INT Stat Check again to break free of the Charmed Debuff once per day or any time the crawler takes damage. (This is a Mind Control effect.)"
      },
      {
        "name": "Sacrificial Blade",
        "toHit": "15+F",
        "damage": "6d4+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Water Lily Spell",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "10ft range",
        "rider": "Any hit crawler must make an INT Stat Check. On Fail, they gain the Unconscious Debuff: They are prone and cannot take actions until Signet cancels Water Lily, even if attacked and damaged. This attack can be used once per day."
      }
    ],
    "notes": [
      "Type line printed as \"Elite\" (an Elite NPC in The Show Must Go On).",
      "Blood Magic—When a creature or crawler marked with her tattoo goes to 0% HB, their blood flies through the air to her, which powers her Ink Marauder ability.",
      "Ink Marauder—Signet can animate one or more of the tattoos on her body using Blood Magic, creating two-dimensional \"paper\" versions of the Mobs they depict. Each animated tattoo has Stats equal to half of that of the creature depicted. If the animated creature is killed, it returns to tattoo form on Signet's body.",
      "Water Cursed—Water cannot touch her skin. Signet has Immunity to Ice damage."
    ],
    "page": 416,
    "source": "Core"
  },
  {
    "name": "Bruiser",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Human"
    ],
    "level": 5,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 4,
        "mod": 2
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Pointy Stick",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Piercing",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 136,
    "source": "GM Toolkit"
  },
  {
    "name": "Wise-Guy",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Human"
    ],
    "level": 5,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "13+F",
    "evade": "11+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 4,
        "mod": 2
      },
      "DEX": {
        "score": 2,
        "mod": 1
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Magic Missile Spell",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Force",
        "range": "Line of Sight range"
      }
    ],
    "notes": [],
    "page": 136,
    "source": "GM Toolkit"
  },
  {
    "name": "Derrick Qu",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Human"
    ],
    "level": 7,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14",
    "evade": "16",
    "move": "25+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Nutcracker",
        "toHit": "15",
        "damage": "2d6+3",
        "damageType": "Bludgeoning"
      },
      {
        "name": "An unarmed strike to the crotch",
        "toHit": "",
        "damage": "",
        "rider": "On an Evade Major Fail or worse, a crawler with external genitals gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Block type line is \"Crawler, Medium (4), Human\" (Crawler #12,330,875); mapped to Rival Crawler. Rosie's grandson, initially antagonistic (traps her, flees) then becomes a reluctant ally NPC who sacrifices himself to clear a path into the Boss Chamber.",
      "Skills — Wild Child: Stealth (2), Survival (3).",
      "Skills — Weirdo: Aliens & UFOs (5), Intimidate (3).",
      "Skills — Peanut Butter Factory Worker: Fabricate (3), Repair (4).",
      "Skills — Gym Rat: Running (5), Swimming (3).",
      "Skills — Other: Explosives Handling (5), Throw (3)."
    ],
    "page": 14,
    "source": "Par"
  },
  {
    "name": "Tigran Warrior",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 19,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 13,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Iron Paw",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      },
      {
        "name": "Leg Sweep",
        "toHit": "15+5",
        "damage": "2d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Cat-Like Reflexes—A Tigran has Advantage on DEX Stat Checks.",
      "Easily Distracted—A Tigran has Disadvantage on distraction related Checks designed to draw their attention away from their current task.",
      "Stat block for Gustav \"Gus\" Johannson (Crawler #9,483,176), a Rival/NPC crawler; flavor line lists Level 21 but the stat block is Level 19.",
      "Leg Sweep to-hit is printed as \"15+5\" in the book (likely a typo for 15+F)."
    ],
    "page": 487,
    "source": "Core"
  },
  {
    "name": "Cat Girl",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 24,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 11,
        "mod": 4
      },
      "INT": {
        "score": 21,
        "mod": 5
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 21,
        "mod": 5
      },
      "CHA": {
        "score": 12,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Hairball",
        "toHit": "15+F",
        "damage": "3d6",
        "damageType": "Acid",
        "range": "20ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Tail Lash",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Klepto—Cat Girls can't be trusted, obviously. Crawlers encountering a Cat Girl for the first time must make an INT Stat Check. On Fail, the crawler loses one low value item they are wearing without realizing it.",
      "Pheromones—Cat Girls secrete a pheromone that makes others agreeable with them. Crawlers that join a party with a Cat Girl must make an INT Stat Check. On Fail, they must comply with the first non-harmful suggestion made by the Cat Girl."
    ],
    "page": 341,
    "source": "Core"
  },
  {
    "name": "Krakaren Crotch Dumpling",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Aberration"
    ],
    "level": 1,
    "hbSlots": [
      1
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "5",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 2,
        "mod": 1
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 2,
        "mod": 1
      },
      "DEX": {
        "score": 2,
        "mod": 1
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bore",
        "toHit": "11+F",
        "damage": "1d2+1",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Fast Growth—Krakaren Crotch Dumplings double in size at the end of each round of combat. Each time they increase in size they gain an additional HB slot, and their CON Mod (in their HB slots) and damage each increase by +1."
    ],
    "page": 502,
    "source": "Core"
  },
  {
    "name": "Rat",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Beastly"
    ],
    "level": 1,
    "hbSlots": [
      1
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "20+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 2,
        "mod": 1
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "12+F",
        "damage": "1d4+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poison Debuff."
      }
    ],
    "notes": [
      "Janitor Mob—This Mob is responsible for cleaning messes on floor 1 and prioritizes eating corpses. It attacks crawlers when provoked, or when no other food options are nearby."
    ],
    "page": 138,
    "source": "GM Toolkit"
  },
  {
    "name": "Rot Sticker",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Beastly"
    ],
    "level": 1,
    "hbSlots": [
      1
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 2,
        "mod": 1
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Stick",
        "toHit": "12+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "On any Evade Fail, the Rot Sticker has attached itself to the crawler (see Overly-Attached below)."
      },
      {
        "name": "Explode",
        "toHit": "13+F",
        "damage": "1d6+1",
        "damageType": "Bludgeoning",
        "range": "0ft range (see Overly Attached below)",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Overly-Attached—Stick attaches a Rot Sticker to its target, causing it to share the target's space and move with it. A Rot Sticker can only Explode if attached, and uses an Attack Action to do so. Explode kills the Rot Sticker. When attacking an attached Rot Sticker, on Fail, the attacker takes the damage. On an Amazing Success or better, all attached Rot Stickers are removed and destroyed.",
      "Sticky—Rot Stickers can stick to vertical surfaces and upside down on ceilings, but they can't move along them."
    ],
    "page": 138,
    "source": "GM Toolkit"
  },
  {
    "name": "Scatterer",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beastly"
    ],
    "level": 1,
    "hbSlots": [
      2
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 4,
        "mod": 2
      },
      "DEX": {
        "score": 1,
        "mod": 1
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "11+F",
        "damage": "1d6+1",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Spit",
        "toHit": "11+F",
        "damage": "1d4+1",
        "damageType": "Poison",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      }
    ],
    "notes": [
      "Wall Walker—Scatterers can move along vertical surfaces and upside down on ceilings as though on the ground."
    ],
    "page": 138,
    "source": "GM Toolkit"
  },
  {
    "name": "Brindle Grub",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beastly"
    ],
    "level": 2,
    "hbSlots": [
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "5+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 7,
        "mod": 3
      },
      "DEX": {
        "score": 1,
        "mod": 1
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Chew",
        "toHit": "11+F",
        "damage": "1d4+1",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Janitor Mob—This Mob is responsible for cleaning messes on the Second Floor and prioritizes eating corpses. It targets crawlers when no other food options are nearby. The System AI spawns 1 to 15 Brindle Grubs each time an entity dies in the area, up to 5,000 active Brindle Grubs per quarter. When a Brindle Grub has eaten enough corpses, it levels up to become a Cow-Tailed Brindle Grub.",
      "Overcrowding—Up to 5 Brindle Grubs can share a space. Entities can attempt to move through a space containing Brindle Grubs but must make a roll Dex Stat Check with a Difficulty of 4 x the number of Brindle Grubs in the space. On Fail, the entity steps on and kills one of the Brindle Grubs, triggering the System AI to spawn more Brindle Grubs to eat the corpse."
    ],
    "page": 139,
    "source": "GM Toolkit"
  },
  {
    "name": "Goblin",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 2,
    "hbSlots": [
      1,
      1
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Club",
        "toHit": "11+F",
        "damage": "1d6+1",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Pineapple Club—The Goblin starts with a pineapple attached to the end their club, which adds +1d4 damage, but it falls off if the attack deals 3 or more HB slots of damage to the crawler.",
      "Spunk—The Goblin has an unusual, rage-filled drive to kill. Melee attacks can only remove 1 Health Bar slot from the Goblin per hit unless it's an Amazing Success or better. The Goblin attacks with a +1 bonus to damage when below full Health."
    ],
    "page": 136,
    "source": "GM Toolkit"
  },
  {
    "name": "Hissing Scatterer",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beastly"
    ],
    "level": 2,
    "hbSlots": [
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 4,
        "mod": 2
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 4,
        "mod": 2
      },
      "DEX": {
        "score": 1,
        "mod": 1
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      },
      {
        "name": "Leaping Kick",
        "toHit": "11+F",
        "damage": "1d6+2",
        "damageType": "Bludgeoning",
        "range": "5ft range (see Leaper below)"
      }
    ],
    "notes": [
      "Leaper—Hissing Scatterers can start a round up to 15ft away from their Leaping Kick target, jumping into range prior to the attack instead of using a Step.",
      "Wall Walker—Scatterers can move along vertical surfaces and upside down on ceilings as though on the ground."
    ],
    "page": 139,
    "source": "GM Toolkit"
  },
  {
    "name": "Troglodyte Pygmy",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Mutated"
    ],
    "level": 2,
    "hbSlots": [
      1,
      1
    ],
    "surprise": "12+F",
    "evade": "12+F",
    "move": "30+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 2,
        "mod": 1
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 2,
        "mod": 1
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "11+F",
        "damage": "1d6+1",
        "damageType": "Piercing",
        "range": "5ft range (see below)",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Dine and Dash—Troglodyte pygmies hunt in packs and take turns darting in and out at targets, taking advantage of their speed to kill prey with their combined venom rather than brute force. Pygmies Move in and attack their prey, then Step Away."
    ],
    "page": 142,
    "source": "GM Toolkit"
  },
  {
    "name": "Bad Llama",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Mutated"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Lava Spit",
        "toHit": "13+F",
        "damage": "1d8+3",
        "damageType": "Fire",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the target gains the Burning Debuff."
      }
    ],
    "notes": [
      "Bad Reflux—Attacks can target the lava pouch in the Llama's throat during rounds when it uses Lava Spit, but this adds a +2 to the Llama's Evade. The pouch ruptures if such an attack deals damage, killing the Llama and setting its corpse aflame."
    ],
    "page": 136,
    "source": "GM Toolkit"
  },
  {
    "name": "Cow-Tailed Brindle Grub",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Beastly"
    ],
    "level": 3,
    "hbSlots": [
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "10+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 4,
        "mod": 2
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 7,
        "mod": 3
      },
      "DEX": {
        "score": 1,
        "mod": 1
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Sting",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Upgraded Janitor Mob—This Mob is the leveled-up form of the Brindle Grub. It continues to prioritize eating corpses and upon eating enough to level up again, transforms into a pupa for 10 hours, then transforms again into a Brindled Vespa. As a pupa, it has the same Stats but can't attack and gains a +2 DR Buff from encasing itself in a cocoon. Killing it as a pupa prevents it from becoming a Brindled Vespa. When a crawler rolls an Amazing Success or better with a melee weapon and kills a Cow-Tailed Brindle Grub, the crawler is covered in white goo. They suffer Disadvantage to Dexterity-based skills until cleaned off in a saferoom."
    ],
    "page": 139,
    "source": "GM Toolkit"
  },
  {
    "name": "Goblin Engineer",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 3,
    "hbSlots": [
      1,
      1,
      1
    ],
    "surprise": "12+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Sword",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Metal Shard",
        "toHit": "13+F",
        "damage": "1d4+3",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stiff Legs Debuff."
      }
    ],
    "notes": [
      "Incel—Goblin engineers prioritize attacking entities who appear female to them.",
      "Pilot—Engineers can construct a single-seat Goblin vehicle out of scrap metal in an hour or something larger with additional time. The steam boiler of multi-passenger Goblin vehicles may overheat and explode during combat if the engineer leaves its relief valves unattended for more than 1 minute."
    ],
    "page": 137,
    "source": "GM Toolkit"
  },
  {
    "name": "Kobold",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Humanoid"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 2,
        "mod": 1
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Spear",
        "toHit": "13+F",
        "damage": "1d8+3",
        "damageType": "Piercing",
        "range": "10ft range"
      },
      {
        "name": "Bite",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Yap",
        "toHit": "11+F",
        "damage": "1d4+1",
        "damageType": "Sonic",
        "range": "30ft Burst radius"
      }
    ],
    "notes": [
      "Pack Defense—When two or more Kobolds are adjacent to each other, they form a phalanx with their spears. Each pair of Kobolds can make one free Attack at no Action cost. A Kobold can only be part of one pair (if two or three Kobolds are adjacent to each other, they get one free attack, four or five get two attacks, and so forth)."
    ],
    "page": 140,
    "source": "GM Toolkit"
  },
  {
    "name": "Back Nine Battle Baboon",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Primate"
    ],
    "level": 4,
    "hbSlots": [
      3,
      3,
      3,
      3
    ],
    "surprise": "13",
    "evade": "14",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Golf Club",
        "toHit": "15",
        "damage": "1d6+3",
        "damageType": "Bludgeoning"
      }
    ],
    "notes": [
      "If someone is hit by a golf ball, at least 1d4+1 Baboons in the vicinity attack that creature for that round."
    ],
    "page": 11,
    "source": "Par"
  },
  {
    "name": "Scatterer Brood Guardian",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beastly"
    ],
    "level": 4,
    "hbSlots": [
      3,
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "30+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "13+F",
        "damage": "1d8+3",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      }
    ],
    "notes": [
      "Guardian—Brood guardians are so aggressive that their presence distracts foes. Other types of Scatterers adjacent to a brood guardian gain a non-stacking +3 bonus to their Evade.",
      "Wall Walker—Scatterers can move along vertical surfaces and upside down on ceilings as though on the ground.",
      "Riled Up—During the first round of combat, add their Stat Mod to the damage a second time."
    ],
    "page": 139,
    "source": "GM Toolkit"
  },
  {
    "name": "Troglodyte Virtuoso",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Mutated"
    ],
    "level": 4,
    "hbSlots": [
      2,
      2,
      2,
      2
    ],
    "surprise": "12+F",
    "evade": "13+F",
    "move": "25+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Tongue Whip",
        "toHit": "13+F",
        "damage": "1d6+2",
        "damageType": "Bludgeoning",
        "range": "15ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      },
      {
        "name": "Bite",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Got Your Tongue—The target of a Tongue Whip can attempt a Wrasslin' attack to grab the tongue as an Interrupt Action instead of making an Evade Check, with any success also counting as an Evade Success against the attack.",
      "Tongue of War—When a virtuoso's tongue is Held or the crawler is Held, it can use an Action to try to pull its tongue back. The target must make a Str Stat Check. On Success, the virtuoso pulls itself adjacent to the target, while the target is pulled adjacent to the virtuoso on Fail. Whoever is pulled takes 1d4+F Bludgeoning per 5ft moved due to the pull."
    ],
    "page": 142,
    "source": "GM Toolkit"
  },
  {
    "name": "Danger Dingo",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Beastly"
    ],
    "level": 5,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "12+F",
    "evade": "11+F",
    "move": "30+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 7,
        "mod": 3
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 2,
        "mod": 1
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Rabies Debuff: 1d6+F Poison damage at the end of each round until the combat ends."
      },
      {
        "name": "Ravage",
        "toHit": "11+F",
        "damage": "2d6+3",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or Worse, the target gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Good Impressions—An injured Dingo may become non-hostile to a crawler party if none of the crawlers attack any member of the Dingo's pack, and the crawlers heal or feed the Dingo or play music from metal bands the Dingo likes.",
      "Ravager—If a Danger Dingo moves at least 20ft in a straight line at its Ravage target before attacking, add +1d6 to the damage."
    ],
    "page": 141,
    "source": "GM Toolkit"
  },
  {
    "name": "Goblin Bomb Bard",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 5,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 4,
        "mod": 2
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bomb",
        "toHit": "14+F",
        "damage": "2d8",
        "damageType": "Bludgeoning",
        "range": "60ft range; 5ft Blast radius",
        "rider": "see Unstable Bombs"
      },
      {
        "name": "Dynamite",
        "toHit": "14+F",
        "damage": "1d6",
        "damageType": "Bludgeoning",
        "range": "40ft range; 5ft Blast radius +5ft Splash"
      }
    ],
    "notes": [
      "Explosive Demise—Goblin bomb bards explode when they die, dealing 2d8+F damage to adjacent entities.",
      "Unstable Bombs—These bombs have a chance to explode early, which changes the space in which it explodes to one between the intended target and the bomb bard. When using Bomb, roll a d20 to determine how far the bomb travels before it explodes. 1: 0ft (explodes on Bomb Bard); 2-4: 10ft; 5-8: 20ft; 9-12 30ft; 13-20: 60ft. Distances farther than the target space mean the bomb reaches the target space."
    ],
    "page": 137,
    "source": "GM Toolkit"
  },
  {
    "name": "Kobold Rider",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Humanoid"
    ],
    "level": 5,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Lance",
        "toHit": "14+F",
        "damage": "2d12+4",
        "damageType": "Piercing",
        "range": "10ft range, (only while mounted)"
      },
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "1d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Capnocytophaga Debuff: Take 1d6+F Poison at the end of each round until the combat ends."
      },
      {
        "name": "Crossbow",
        "toHit": "12+F",
        "damage": "2d8",
        "damageType": "Piercing",
        "range": "50ft range"
      }
    ],
    "notes": [
      "Dingo Rider—Kobold Riders use Danger Dingoes as mounts and ride into battle on them. Their lances are ridiculously large and can only attack targets in the direction their mount is facing. A dismounted Kobold Rider can't use its Lance."
    ],
    "page": 140,
    "source": "GM Toolkit"
  },
  {
    "name": "Charmed Drek",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Humanoid"
    ],
    "level": 6,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "25+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 4,
        "mod": 2
      },
      "CHA": {
        "score": 4,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing."
      },
      {
        "name": "Claw",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Swarming Behavior—Charmed Dreks travel in packs of 50 or more. When 10 or more attack the same crawler, the crawler has Disadvantage on all Evade Checks against Charmed Dreks.",
      "Wall Walker—A Charmed Drek moves along vertical surfaces and ceilings as though on the ground.",
      "Warped by Magic—During a gender reveal, Charmed Dreks can be mutated into a humanoid hybrid on the Conga Line. When this happens, they go berserk, attacking the nearest target without distinguishing friend from foe. They also grow to Medium size unless otherwise specified and gain 4 HB slots, a +1 bonus to hit, one additional damage die, and traits determined by Race."
    ],
    "page": 458,
    "source": "Core"
  },
  {
    "name": "Drek",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Demon"
    ],
    "level": 6,
    "hbSlots": [
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 7,
        "mod": 3
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Claw",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Sore as Shit Debuff."
      }
    ],
    "notes": [
      "Suckle Blood—As an action, a Drek may attempt to attach themselves to any crawler with the Blood Trail Debuff. The crawler must make a STR-Opposed Escape Artist Skill Check. On Fail, the Drek attaches to the crawler and the Blood Trail Debuff damage increases by 1d4 each round. When attached, a Drek no longer attacks.",
      "Swarming Behavior—Dreks travel in packs of 50 or more. When 10 or more attack the same crawler, the crawler has Disadvantage on all Evade Checks against all Drek.",
      "Wall Walker—Dreks can move along vertical surfaces and upside down on ceilings as though on the ground."
    ],
    "page": 432,
    "source": "Core"
  },
  {
    "name": "Troglodyte Basher",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 6,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 7,
        "mod": 3
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 7,
        "mod": 3
      },
      "DEX": {
        "score": 7,
        "mod": 3
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Venom Spit",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Poison",
        "range": "20ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Slimed!—Troglodytes secrete a slime that's kinda gross when some gets splashed onto you. When an adjacent crawler rolls an Amazing Success or better with an attack, they gain the Queasy Debuff."
    ],
    "page": 142,
    "source": "GM Toolkit"
  },
  {
    "name": "Goblin Shamanka",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 7,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "14+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 2,
        "mod": 1
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Agony Missile",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Psychic",
        "range": "50ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains one of the following Debuffs: Blood Trail, Woozy, or Stunned."
      }
    ],
    "notes": [
      "Revenge—Goblin vehicles tend to explode when destroyed. Shamankas enchant their clan's vehicles to direct all damage from those explosions toward the entity responsible for the destruction, though the damage can be avoided by any normal means of avoiding an explosion."
    ],
    "page": 137,
    "source": "GM Toolkit"
  },
  {
    "name": "Brindled Vespa",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Mutated"
    ],
    "level": 8,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "11+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Acid Goo",
        "toHit": "11+F",
        "damage": "2d6+1",
        "damageType": "Acid",
        "range": "40ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Acid Goo Debuff: 1d6+F Acid at the end of each round until the combat ends."
      },
      {
        "name": "Sting",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Piercing",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Flight—Brindled vespas can move through the air as though on the ground and hover in place.",
      "Fragile Wings—Brindled vespas have large wings that can be targeted by attacks (with a -2 penalty). If it loses 1 or more HB slots this way, remove their Acid Goo attack and Flight abilities."
    ],
    "page": 140,
    "source": "GM Toolkit"
  },
  {
    "name": "Former Circus Lemur",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Animal"
    ],
    "level": 8,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 7,
        "mod": 3
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Skinning Knives",
        "toHit": "14+F",
        "damage": "2d4+3",
        "damageType": "Piercing",
        "range": "15ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Vicious Bites",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Sore as Shit Debuff."
      }
    ],
    "notes": [
      "Jumpy—Former Circus Lemurs can jump a distance equal to twice their Move as an Action by swinging off a ledge, lamp post, or giraffe's neck.",
      "Stealthy—Former Circus Lemurs do not appear on a crawler's mini-map until the Lemur has initiated an attack."
    ],
    "page": 413,
    "source": "Core"
  },
  {
    "name": "Fat Clown",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 9,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "12+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 3
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 11,
        "mod": 3
      },
      "DEX": {
        "score": 4,
        "mod": 2
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Dirty Nails",
        "toHit": "13+F",
        "damage": "1d10+3",
        "damageType": "Slashing",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      },
      {
        "name": "Honker Horn",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Sonic",
        "range": "15ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Muted Debuff."
      }
    ],
    "notes": [
      "Freakish Smile—Crawlers who move within 10ft of a Stilt Clown for the first time must succeed at an INT Stat Check. On Fail, they gain the Terrified Debuff.",
      "Roiling Belly—Fat Clowns have stomachs that rumble and shift, making them immune to Poisoned."
    ],
    "page": 415,
    "source": "Core"
  },
  {
    "name": "Ruin Flocker",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Animal"
    ],
    "level": 9,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 11,
        "mod": 3
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Slam",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      },
      {
        "name": "Trample",
        "toHit": "13+F",
        "damage": "1d6+4",
        "damageType": "Bludgeoning",
        "range": "25ft Line",
        "rider": "Any hit crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "What the Flock—When 3 or more Ruin Flockers are within 10ft of a crawler, coordinate Trample Attacks, causing the crawler to suffer Disadvantage to Evade for attacks when surrounded."
    ],
    "page": 370,
    "source": "Core"
  },
  {
    "name": "Beat Cop",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Construct"
    ],
    "level": 10,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Beatbox",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Sonic",
        "range": "15ft Burst radius"
      },
      {
        "name": "Truncheon",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [
      "It's Curtains for You—Beat Cops dance in sync even when not attacking. Any crawler witnessing two or more Beat Cops dancing together must make a CHA Stat Check with a Difficulty of 10+F plus the number of Beat Cops. On Fail, the crawler gains the Terrified Debuff.",
      "On the Beat—Beat Cops prefer fighting in sync. When adjacent Beat Cops perform the same attack during a round, each one gains a +1 bonus to hit and damage for each adjacent attacking Beat Cop, up to a maximum of +3. When a crawler is hit for 3+ HB slots, they can make a free Unopposed Performance Skill Check to see the pattern. On Success, they notice the pattern and can add their INT as a bonus to Evade these attacks. Once one crawler notices the pattern, the remaining crawlers do also and gain the same INT bonus.",
      "Robot—Beat Cops are metal robots and immune to Psychic damage, but their DR is 0 against Electric attacks. Can they bleed or be poisoned? Probably! (They bleed oil and suffer corrosion—robots, they're just like us!)"
    ],
    "page": 345,
    "source": "Core"
  },
  {
    "name": "Brain Boiler",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Weird"
    ],
    "level": 10,
    "hbSlots": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "12+F",
        "damage": "3d4+2",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Flying Face Hug",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "15ft range",
        "rider": "Any hit crawler must make a STR Stat Check. On a Fail, they gain the Wrapped Debuff: Their head is covered by the Brain Boiler and they gain the Burned Debuff until the creature is killed or removed. It cannot be extinguished as per the Burned Debuff rules."
      }
    ],
    "notes": [
      "Wrapped—As an action, a crawler with the Wrapped Debuff may make a STR-Opposed Escape Artist Skill Check, or a STR Stat Check at the same Difficulty to escape. Attacks against the Brain Boiler by anyone other than the affected crawler do half their damage to the crawler and half to the Brain Boiler."
    ],
    "page": 333,
    "source": "Core"
  },
  {
    "name": "Flesher",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 10,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Boned Spell",
        "toHit": "13+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "This ability can only be used on Skeletons. Any hit skeleton becomes animated and under the control of the Flesher."
      },
      {
        "name": "Smother",
        "toHit": "14+F",
        "damage": "2d4+4",
        "damageType": "Acid",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Burned and Held Debuffs."
      }
    ],
    "notes": [
      "Fire Immunity—Fleshers take no damage from Fire.",
      "Re-Sleeving—When a Flesher attacks and consumes a Symbiote, it becomes a more intelligent and powerful Symbiote.",
      "Symbiote Formation—When a Flesher successfully animates a skeleton, the two combined entities become a Symbiote.",
      "War Mage—If a Symbiote is Re-Sleeved at least a dozen time, it becomes sapient and fuses into a single powerful being known as a War Mage."
    ],
    "page": 434,
    "source": "Core"
  },
  {
    "name": "Giraffe",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Animal"
    ],
    "level": 10,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "13+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Back Kick",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Stunned Debuff."
      },
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Hail of Lemurs",
        "toHit": "13+F",
        "damage": "No damage",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Held Debuff. Can be used twice per combat."
      }
    ],
    "notes": [
      "Burst of Speed—Giraffes can take one free Move Action once per combat.",
      "Disruption—After using Burst of Speed to get close to target, Giraffes can divide enemy groups by dropping 2d6 Former Circus Lemurs among them.",
      "Hail of Lemurs—Giraffes can fling 2d6 Former Circus Lemurs by whipping their necks. These Former Circus Lemurs then swarm the target and attack. This can be done twice per combat."
    ],
    "page": 413,
    "source": "Core"
  },
  {
    "name": "Hobgoblin Mortuary Assistant",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 10,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Cleaning Spray",
        "toHit": "14+F",
        "damage": "1d6+4",
        "damageType": "Acid",
        "range": "15ft Cone",
        "rider": "Any crawler who fails to Evade gains the Poisoned Debuff."
      },
      {
        "name": "Scalpel",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Death by a Thousand Cuts—When two or more Hobgoblin Mortuary Assistants are adjacent to a target, and the target has no adjacent allies, the target has Disadvantage to Evade."
    ],
    "page": 371,
    "source": "Core"
  },
  {
    "name": "Stilt Clown",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 10,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Arm Whip",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler is pushed 10 feet."
      },
      {
        "name": "Butcher Knife",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Freakish Smile—Crawlers who move within 10ft of a Stilt Clown for the first time must succeed at an INT Stat Check. On Fail, they gain the Terrified Debuff.",
      "Rubbery Arms—Stilt Clowns can stretch their arms and head to twice their normal length as part of an attack. The range of their next attack, however, is limited to 5ft as their arms quickly retract."
    ],
    "page": 414,
    "source": "Core"
  },
  {
    "name": "Ogre",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 11,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 7,
        "mod": 3
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bear Hug",
        "toHit": "15+F",
        "damage": "2d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Club",
        "toHit": "15+F",
        "damage": "3d4+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Battle Worn—Ogres gain Advantage on attacks against crawlers of equal or higher Level than they are."
    ],
    "page": 416,
    "source": "Core"
  },
  {
    "name": "Gobblin' Hog",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Monstrous"
    ],
    "level": 12,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "11+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 4
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Gobble",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "Any hit crawler must make a CON Stat Check. On Fail, they immediately gain the Major Injury Debuff. This attack can only be used on targets at 20% HB or less."
      },
      {
        "name": "Thrown Tusk",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "This attack can only be used at night."
      },
      {
        "name": "Tusk",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail, the target loses a carried or worn item to the Gobblin' Hog's stomach."
      }
    ],
    "notes": [
      "Charge!—If a Gobblin' Hog travels its full Move distance before hitting with a melee attack, the target must make a STR Stat Check. On Fail, the target gains the Take Down Debuff. The target has Advantage to Evade this move-attack combo.",
      "Night Hunter—The INT and DEX mod of Gobblin' Hogs flip at night, becoming INT (+4) and DEX (+1), with Surprise 14+F and Evade 11+F.",
      "Nocturnal—Gobbln' Hogs can see in nonmagical darkness.",
      "Swamp Native—Gobblin' Hogs can travel through swampy terrain such as water, mud, and underbrush with no penalty to their Move or Step."
    ],
    "page": 358,
    "source": "Core"
  },
  {
    "name": "Shambling Berserker",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Undead"
    ],
    "level": 12,
    "hbSlots": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "10+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 32,
        "mod": 5
      },
      "INT": {
        "score": 2,
        "mod": 1
      },
      "CON": {
        "score": 1,
        "mod": 1
      },
      "DEX": {
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Grab",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      },
      {
        "name": "Slam",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed 15ft."
      }
    ],
    "notes": [
      "Night Berzerking—Shambling Berzerkers are 4x more powerful at night. When the sun goes down, their CON and STR Mods and Move are all 4x higher.",
      "Shambling Pack—Shambling Berzerkers travel in packs. If two or more Shambling Berzerkers are adjacent to a crawler, the crawler has Disadvantage to Evade.",
      "Tenacious—Once a Shambling Berzerker has targeted a crawler it does not stop until it has been destroyed or the crawler has been killed."
    ],
    "page": 369,
    "source": "Core"
  },
  {
    "name": "Night Ray",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Animal"
    ],
    "level": 13,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 4
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 13,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Barbed Spines",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned and Blood Trail Debuffs."
      },
      {
        "name": "Sting",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Glimmering Hide—Night Rays have Resistance to all Spell damage as their glimmering hide is able to partially reflect them.",
      "Gills—Night Rays can breathe underwater.",
      "Glide—Night Rays can soar in the air up to half their move each round.",
      "Swim—Night Rays can move through the water as though on the ground."
    ],
    "page": 404,
    "source": "Core"
  },
  {
    "name": "Over City Skyfowl",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 13,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 11,
        "mod": 4
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 7,
        "mod": 3
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Crossbow",
        "toHit": "14+F",
        "damage": "3d6",
        "damageType": "Piercing",
        "range": "30ft range"
      },
      {
        "name": "Spear",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Grab",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "Any crawler hit gains the Held Debuff."
      }
    ],
    "notes": [
      "Catch and Release—Held crawlers are flown to a height of 30 feet and dropped the next round.",
      "Flight—Over City Skyfowl can move through the air as though on the ground.",
      "Riled Up—During the first round of combat, Over City Skyfowl add their Stat Mod to damage a second time."
    ],
    "page": 336,
    "source": "Core"
  },
  {
    "name": "City Elf (404th Revolutionary)",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 13,
        "mod": 4
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Firestorm Spell",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Fire",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Any crawler who fails to Evade gains the Burned Debuff."
      },
      {
        "name": "Force Spear Spell",
        "toHit": "14+F",
        "damage": "3d10+4",
        "damageType": "Force",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      },
      {
        "name": "Lightning Rod",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Electric",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Shocked Debuff."
      }
    ],
    "notes": [
      "Printed block title is \"City Elf\"; this is the 404th Revolutionary Legion variant (distinct from the Heavensworth City Elves, p334).",
      "Ambush—404th Revolutionary City Elves gain Advantage on attacks when they are 10ft or more above their target.",
      "Brotherly Rage—404th Revolutionary City Elves gain Advantage when attacking and Disadvantage when Evading City Elves from the 201st."
    ],
    "page": 403,
    "source": "Core"
  },
  {
    "name": "City Elves",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 4
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Butterfly Knife",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Desert Eagle",
        "toHit": "14+F",
        "damage": "3d6",
        "damageType": "Piercing",
        "range": "50ft range",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed 10ft."
      }
    ],
    "notes": [
      "Fanatical—City Elves are immune to fear, charm, and mind-affecting effects."
    ],
    "page": 334,
    "source": "Core"
  },
  {
    "name": "Cool Kid",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 8,
        "mod": 3
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 8,
        "mod": 3
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Blue Steel Look",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "20ft range",
        "rider": "Any hit crawler gains the Paralyzed Debuff."
      },
      {
        "name": "Icy Touch",
        "toHit": "13+F",
        "damage": "3d4+3",
        "damageType": "Ice",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Stiff Legs Debuff."
      },
      {
        "name": "Slam",
        "toHit": "13+F",
        "damage": "3d6+3",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Peer Pressure—Crawlers must make an INT Stat Check prior to each attack against a Cool Kid. On Fail, they have Disadvantage on their attack as they contemplate joining the clique. On Success, they never make this Check again."
    ],
    "page": 381,
    "source": "Core"
  },
  {
    "name": "Effective Detective",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 11,
        "mod": 4
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Gat",
        "toHit": "14+F",
        "damage": "2d10",
        "damageType": "Piercing",
        "range": "100ft range"
      },
      {
        "name": "Lowdown Peeper (Spell)",
        "toHit": "15+F",
        "damage": "2d4+5",
        "damageType": "Psychic",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Queasy Debuff."
      },
      {
        "name": "Punch",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Collared Debuff: Cannot use attacks with Rank higher than 5."
      }
    ],
    "notes": [
      "Qualified Immunity—An Effective Detective's badge expands into a body-length shield when wielded, adding a +2 DR Buff against foes directly in front of them. Multiple Effective Detectives can stand side by side, forming a phalanx that increases this bonus to +4 but reduces their Step to 0ft."
    ],
    "page": 346,
    "source": "Core"
  },
  {
    "name": "Elven Enforcer",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 4
      },
      "INT": {
        "score": 7,
        "mod": 3
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Knife",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Desert Eagle",
        "toHit": "14+F",
        "damage": "3d6",
        "damageType": "Piercing",
        "range": "50ft range",
        "rider": "Any hit crawler is pushed 10ft."
      }
    ],
    "notes": [
      "Fanatical—Elven Enforcers are immune to fear, charm, and mind-affecting abilities."
    ],
    "page": 392,
    "source": "Core"
  },
  {
    "name": "Harvester",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Construct"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 15,
        "mod": 4
      },
      "INT": {
        "score": 8,
        "mod": 3
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 16,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Cauterizer",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Fire",
        "range": "20ft range",
        "rider": "On an Evade Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Man-Opener",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Cluster Fucked—When two or more Harvesters attack the same target, they gain Advantage on their attacks.",
      "Signal Senses—Harvesters ignore crawlers wearing signal dampeners."
    ],
    "page": 481,
    "source": "Core"
  },
  {
    "name": "Hobgoblin Undertaker",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 9,
        "mod": 3
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 13,
        "mod": 4
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Cleaning Spray",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Acid",
        "range": "15ft Cone",
        "rider": "Any crawler who fails to Evade gains the Poisoned Debuff."
      },
      {
        "name": "Scalpel",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Lead to Death—When two or more Hobgoblins are adjacent to a target, and the target has no adjacent allies, the target has Disadvantage to Evade."
    ],
    "page": 376,
    "source": "Core"
  },
  {
    "name": "Merry Militiaman",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 11,
        "mod": 4
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Apito's Blow",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Apito's Double Barrel Spell",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Necrotic",
        "range": "50ft range",
        "rider": "Can hit up to two targets with one attack."
      },
      {
        "name": "Apito's Shower Spell",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Necrotic",
        "range": "60ft range, 10ft Blast radius"
      },
      {
        "name": "Apito's Thirst Spell",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "On Evade Major Fail or worse, the crawler gains the Blood Drain Debuff: Take 1d8+F Necrotic at the end of each round and the Merry Militiaman heals 1 HB, until the combat ends."
      }
    ],
    "notes": [],
    "page": 357,
    "source": "Core"
  },
  {
    "name": "Mold Lion",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Animal"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Pounce",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      },
      {
        "name": "Roar",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Sonic",
        "range": "30ft Cone",
        "rider": "Any hit crawler gains the Terrified Debuff."
      }
    ],
    "notes": [
      "Pride Power—Mold Lions gain Advantage on attacks when two or more are adjacent to the same target."
    ],
    "page": 415,
    "source": "Core"
  },
  {
    "name": "Rumble Weed",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 15,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 22,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff. This attack may only be made at night."
      },
      {
        "name": "Trample",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Bludgeoning",
        "range": "30ft Line",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered and Take Down Debuffs."
      }
    ],
    "notes": [
      "Night Predator—At night Rumble Weeds can track crawlers, gaining Advantage on their first attack of the combat."
    ],
    "page": 370,
    "source": "Core"
  },
  {
    "name": "Grulke",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 16,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Polearm",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Slashing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Slam",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      },
      {
        "name": "Tongue",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Poison",
        "range": "20ft range",
        "rider": "Any hit crawler gains the Paralyzed Debuff."
      }
    ],
    "notes": [
      "Great Leaper—Grulke can leap a distance equal to their Move."
    ],
    "page": 335,
    "source": "Core"
  },
  {
    "name": "Krasue",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Cursed"
    ],
    "level": 16,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 4,
        "mod": 2
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 14,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "2d6+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Blood Drain Debuff: Take 1d8+F Necrotic at the end of each round and the Krasue attaches to the crawler and heals 1 HB slot, until the Krasue is killed or removed. If the Krasue remains attached for two or more successive rounds, the crawler gains the Woozy Debuff."
      },
      {
        "name": "Strangle",
        "toHit": "15+F",
        "damage": "3d8+2",
        "damageType": "Bludgeoning",
        "range": "15ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Flight—Krasue move through the air as though on the ground and can hover in place.",
      "Ghostly—Krasue can only be harmed by magic or enchanted items.",
      "I Can Show You the World—Targets hit by a Krasue's Strangle attack are Held by their entrails and lifted 5ft into the sky. The Krasue's Step is reduced to 5ft and Move to 10 while holding a creature in this manner, and they'll typically fly straight upward after grabbing a creature until they reach a deadly height to drop them. To escape, a crawler with the I Can Show You the World Debuff must make a STR-Opposed Escape Artist Skill Check, or a STR Stat Check at the same Difficulty."
    ],
    "page": 359,
    "source": "Core"
  },
  {
    "name": "Babababoon",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Beastly"
    ],
    "level": 17,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 18,
        "mod": 4
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 16,
        "mod": 4
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Wild Swing",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Fecal Fling",
        "toHit": "14+F",
        "damage": "2d4+4",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Augmented—A Babababoon has crude cybernetic augmentations throughout their body. They take x2 damage from Electric attacks."
    ],
    "page": 479,
    "source": "Core"
  },
  {
    "name": "Gray Cornet",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Undead"
    ],
    "level": 17,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 19,
        "mod": 4
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 19,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Feral Leap",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "range": "20ft range",
        "rider": "Any hit crawler gains the Take Down Debuff."
      },
      {
        "name": "Talons",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Manic—A Gray Cornet may travel up to its full Move every time it uses Feral Leap."
    ],
    "page": 469,
    "source": "Core"
  },
  {
    "name": "Jikininki",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 17,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 13,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Broom Bash",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      },
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d4+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Sweep",
        "toHit": "15+F",
        "damage": "3d4+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler is pushed 10ft."
      }
    ],
    "notes": [
      "Blood Sense—Jikininki gain Advantage on Perception Checks to detect any crawler with the Blood Trail Debuff.",
      "Janitor Mob—This Mob is responsible for cleaning messes on Floor 4 and prioritizes cleaning up corpses. It attacks crawlers when provoked, or when crawlers have the Blood Trail Debuff."
    ],
    "page": 433,
    "source": "Core"
  },
  {
    "name": "Merry Caroler",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 17,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "14+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 4,
        "mod": 2
      },
      "INT": {
        "score": 14,
        "mod": 4
      },
      "CON": {
        "score": 5,
        "mod": 2
      },
      "DEX": {
        "score": 8,
        "mod": 3
      },
      "CHA": {
        "score": 25,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Don't Rest Ye Merry Gentle Elves Spell",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "30ft Burst radius",
        "rider": "Any hit crawler gains the You'll Listen to Us and Like It, Don't Forget to Tip for Apito Debuff: The crawler has Disadvantage on Evade Checks against Merry Carolers' attacks and a fleeting desire to tithe to a random god, which ends the Debuff if they do so."
      },
      {
        "name": "Have You Ever Seen the Rain? Spell",
        "toHit": "14+F",
        "damage": "3d6+5",
        "damageType": "Ice",
        "range": "60ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stiff Legs Debuff."
      },
      {
        "name": "Jingle Balls Spell",
        "toHit": "14+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "60ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Hypothermia Debuff: Take 1d6+F Ice each round (Stacks. After losing 1+ HB Slots via this Debuff, the crawler must make an Unopposed Survival Skill Check. On Fail, they remove one piece of clothing at the start of each round."
      },
      {
        "name": "Shattering High Note Spell",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Sonic",
        "range": "5ft Burst radius"
      },
      {
        "name": "Silent Night Spell",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "50ft Burst radius",
        "rider": "Any hit crawler gains the Muted Debuff."
      },
      {
        "name": "Space Oddity Spell",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Force",
        "range": "40ft range, 10ft Blast radius",
        "rider": "Any hit crawler must make a CHA or INT Stat Check (their choice). On Fail, they gain the Aerial Suspension Debuff: Crawler gains the Held Debuff and is magically floating 30ft in the air until the end of the next round. Then they fall!"
      }
    ],
    "notes": [],
    "page": 359,
    "source": "Core"
  },
  {
    "name": "Mook",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 17,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 16,
        "mod": 4
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Improvised Melee Weapon",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Improvised Thrown Weapon",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "20ft range"
      },
      {
        "name": "Big Fuckin' Insult",
        "toHit": "13+F",
        "damage": "No damage",
        "range": "60ft range",
        "rider": "Any hit crawler gains the Enraged or Terrified Debuff (GM's choice depending on character's personality)."
      }
    ],
    "notes": [
      "Yer Goin' Down with Me—Mooks were dealt bad hands in life, and their anger at the world means they want to take everyone else down with them. When Mooks have fewer than half of their HB slots left, they gain the Enraged Debuff, focusing their attacks on whoever last damaged them and gaining a +2 bonus to hit and damage."
    ],
    "page": 346,
    "source": "Core"
  },
  {
    "name": "Neo-Maxie-Zoom-Dweebie",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Goblin"
    ],
    "level": 17,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "15+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 5,
        "mod": 2
      },
      "INT": {
        "score": 35,
        "mod": 5
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Calculated Risk",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Psychic",
        "range": "10ft range, 5ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      },
      {
        "name": "Code Break",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Sonic",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Fatigued Debuff."
      }
    ],
    "notes": [
      "En Masse—When 3 or more Neo-Maxie-Zoom-Dweebies are within 5ft of a crawler, they surround them, causing the crawler to have Disadvantage to Evade."
    ],
    "page": 381,
    "source": "Core"
  },
  {
    "name": "Torpedo",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Shark",
      "Humanoid"
    ],
    "level": 17,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Chomp",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Submachine Gun",
        "toHit": "14+F",
        "damage": "2d10",
        "damageType": "Piercing",
        "range": "60ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed 10ft."
      },
      {
        "name": "Torpedo",
        "toHit": "15+F",
        "damage": "2d12+5",
        "damageType": "Fire",
        "range": "15ft Burst radius",
        "rider": "Any hit crawler gains the Burned Debuff. Can be used once per combat; deals full damage to self as well."
      }
    ],
    "notes": [
      "Blow 'Em Down—Torpedoes are out to kill their mark, and they don't care who else they off along the way. Similarly, they have no problem catching allies or bystanders in the crossfire of their submachine guns."
    ],
    "page": 348,
    "source": "Core"
  },
  {
    "name": "Concierge Wereshark",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Cursed"
    ],
    "level": 18,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Chomp",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff. Can only be used when in shark form."
      },
      {
        "name": "Crowd Control Spray",
        "toHit": "13+F",
        "damage": "2d6+F",
        "damageType": "Acid",
        "range": "30ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blinded Debuff."
      },
      {
        "name": "Punch",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Woozy Debuff. Can only be used when in Human form."
      }
    ],
    "notes": [
      "Blood Berserk—Concierge Weresharks go berserk when a creature with the Blood Trail Debuff is within 100 feet, attacking the closest target without distinguishing ally from foe. They take a -2 penalty to hit and roll one additional damage die while berserk.",
      "Fish Out of Water—Concierge Weresharks take 1 HB damage each round when in Shark form and not submerged in water.",
      "Werecreature—Concierge Weresharks can transform between Human and shark forms, with certain actions only available to each form. Contact with 1+ liters of liquid transforms them from Human to shark while drying off transforms them from shark back to Human."
    ],
    "page": 457,
    "source": "Core"
  },
  {
    "name": "Gross Atomizer",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Aberration"
    ],
    "level": 18,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "15+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 15,
        "mod": 4
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 19,
        "mod": 4
      },
      "DEX": {
        "score": 19,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Envelop",
        "toHit": "14+F",
        "damage": "2d4+4",
        "damageType": "Acid",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Burned Debuff."
      },
      {
        "name": "Poison Cloud",
        "toHit": "12+F",
        "damage": "2d6+2",
        "damageType": "Poison",
        "range": "10ft Burst radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Flight—Gross Atomizers can move through the air as though on the ground and hover in place."
    ],
    "page": 470,
    "source": "Core"
  },
  {
    "name": "Non-Sparkly Vampire",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 18,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 9,
        "mod": 3
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Drained Debuff: Take 1d6+F Necrotic at the end of each round until the combat ends, and that Non-Sparkly Vampire heals 1 HB."
      },
      {
        "name": "Sing Spell",
        "toHit": "13+F",
        "damage": "3d4+3",
        "damageType": "Sonic",
        "range": "25ft Cone",
        "rider": "Any crawler who fails to Evade gains the Fatigued Debuff."
      }
    ],
    "notes": [],
    "page": 382,
    "source": "Core"
  },
  {
    "name": "School of Mythfish",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Fish"
    ],
    "level": 18,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 2,
        "mod": 1
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 16,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Nibbles",
        "toHit": "11+F",
        "damage": "3d6+1",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Fatigued Debuff."
      },
      {
        "name": "Psychic Visions",
        "toHit": "15+F",
        "damage": "2d6+5",
        "damageType": "Psychic",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Visionary—A crawler hit by Psychic Visions gains glimpses into the minds of nearby creatures. The crawler gains Advantage on their next Attack or Evade attempt."
    ],
    "page": 493,
    "source": "Core"
  },
  {
    "name": "Skegga Union Repair Dwarf",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 18,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 18,
        "mod": 4
      },
      "INT": {
        "score": 9,
        "mod": 3
      },
      "CON": {
        "score": 17,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Flame Thrower",
        "toHit": "14+F",
        "damage": "2d10",
        "damageType": "Fire",
        "range": "20ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Wrench",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Obsessively Alcoholic—After they have completed their work for the day, Skegga Union Repair Dwarves gain the Shit-Faced Debuff."
    ],
    "page": 446,
    "source": "Core"
  },
  {
    "name": "Broadside Bootleggers",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 19,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 12,
        "mod": 4
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 21,
        "mod": 5
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Cutlass",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler drops one thing they were holding."
      },
      {
        "name": "Talons",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Flight—Broadside Bootleggers can move through the air as though on the ground."
    ],
    "page": 391,
    "source": "Core"
  },
  {
    "name": "Cave Mudge Bonker",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 19,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 26,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Bonk",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Charge—Bonkers gain 10ft to their Move when moving toward an opponent they intend to Bonk."
    ],
    "page": 491,
    "source": "Core"
  },
  {
    "name": "Gumshoe",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 19,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 16,
        "mod": 4
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Expose Spell",
        "toHit": "15+F",
        "damage": "2d8+5",
        "damageType": "Psychic",
        "range": "60ft range, 15ft Blast radius",
        "rider": "Any hit crawler must make an INT Stat Check. On Fail, they gain the Dodgy Reputation Debuff: The crawler's HUD is flooded with dark secrets about one other crawler who is participating in the combat, chosen by the Gumshoe. Any Buffs provided by the chosen crawler are ineffective until the end of the encounter. This Debuff stacks for each unique subject of Expose."
      },
      {
        "name": "Gat",
        "toHit": "15+F",
        "damage": "3d10",
        "damageType": "Piercing",
        "range": "100ft range"
      }
    ],
    "notes": [
      "Clean Sneak—Gumshoes can Hide in Shadows. Crawlers must make an INT-Opposed Perception Skill Check to spot them. On Fail, the Gumshoes may successfully Ambush the crawlers.",
      "Glom a Bulge—That means \"spotting an advantage\" in noir slang. Get your mind out of the gutter! A Gumshoe can shout out advice about a target to an ally instead of attacking, granting the ally Advantage on their attack against the target.",
      "Grab Air—Gumshoes can leap high into the air when they Move, allowing them to move over occupied spaces without triggering Interrupts and land up to 10ft higher than their starting space."
    ],
    "page": 347,
    "source": "Core"
  },
  {
    "name": "Sporto Teen Wolf",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Beastly"
    ],
    "level": 19,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "(Secret!) On an Evade Major Fail or worse, the crawler gains the Lycanthropy Debuff: The crawler turns into a Sporto Teen Wolf the following night. The Debuff is removed if the crawler has the Dying Debuff."
      },
      {
        "name": "Stick",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      },
      {
        "name": "Wedgie",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      }
    ],
    "notes": [
      "Silver Weakness—Silver weapons do x2 damage to Sporto Teen Wolves, bypass DR, and apply The Taint Debuff."
    ],
    "page": 383,
    "source": "Core"
  },
  {
    "name": "Student Body",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Amalgamation"
    ],
    "level": 19,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Acid Breath",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Acid",
        "range": "20ft Cone",
        "rider": "Any crawler who fails to Evade gains the Queasy Debuff."
      },
      {
        "name": "Grab",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Enrolled—Crawlers who gain the Held Debuff start becoming assimilated into the Student Body. They must make a STR-Opposed Escape Artist Skill Check, or a STR Stat Check at the same Difficulty. On Fail, the crawler begins moving with the Student Body, taking 1d8+F damage each round until they Escape or the Mob is killed."
    ],
    "page": 382,
    "source": "Core"
  },
  {
    "name": "Blister Ghoul",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "12+F",
    "evade": "15+F",
    "move": "15+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 15,
        "mod": 4
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Tenacious Swarming—Blister Ghouls can completely cover a vehicle or crawler, overwhelming them. When 5 or more Blister Ghouls are adjacent to a crawler, the crawler has Disadvantage to their Evade attempts."
    ],
    "page": 445,
    "source": "Core"
  },
  {
    "name": "Bone Collector",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Aberration"
    ],
    "level": 20,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 22,
        "mod": 5
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 19,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Grind",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Pounce",
        "toHit": "15+F",
        "damage": "3d4+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Oozy—A Bone Collector can squeeze through size Small (2) and larger openings."
    ],
    "page": 480,
    "source": "Core"
  },
  {
    "name": "Brain Teaser",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Aberration",
      "Swarm"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 19,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bore",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      },
      {
        "name": "Skull-Cracker",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Intellect Hound—Every successful hit from a Brain Teaser causes the crawler to lose Mana instead of decreasing HB slots. Once all Mana has been depleted, the damage affects HB slots.",
      "Mana Depletion—Once all Mana has been depleted from a crawler, each successful attack by a Brain Teaser temporarily Debuffs the crawler's Intelligence by 1."
    ],
    "page": 470,
    "source": "Core"
  },
  {
    "name": "Cave Mudge Judge",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 9,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Dirt Clod Spell",
        "toHit": "15+F",
        "damage": "3d2+5",
        "damageType": "Bludgeoning",
        "range": "100ft range",
        "rider": "Any hit crawler gains the Woozy Debuff."
      },
      {
        "name": "Throw Insult",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Brain Washed—The brain of a Cave Mudge Judge can be used as an ingredient for potions that boost Perception."
    ],
    "page": 491,
    "source": "Core"
  },
  {
    "name": "Gun Doll",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Construct"
    ],
    "level": 20,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 11,
        "mod": 3
      },
      "INT": {
        "score": 14,
        "mod": 3
      },
      "CON": {
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 12,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bean Shooter",
        "toHit": "15+F",
        "damage": "3d6",
        "damageType": "Piercing",
        "range": "80ft range"
      },
      {
        "name": "Pocket Knife",
        "toHit": "15+F",
        "damage": "3d6+3",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Blues Got You Down—If a crawler kills a Gun Doll with a melee attack, she whispers her tragic backstory with her dying breaths. The crawler gains Disadvantage on their next attack.",
      "Swarm—While Gun Dolls prefer their eponymous weapons, their small size allows up to 6 of them to share the space of a medium or larger creature. If outmatched at range, their last resort is to all clamber onto a single target and stab, stab, stab! They each gain Advantage on their first attack against that target."
    ],
    "page": 347,
    "source": "Core"
  },
  {
    "name": "Hangman's Hawks",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 8,
        "mod": 3
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 14,
        "mod": 4
      },
      "CHA": {
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Acid Blast Spell",
        "toHit": "15+F",
        "damage": "2d8+5",
        "damageType": "Acid",
        "range": "15ft Cone + 5ft Splash",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Explosive Charge",
        "toHit": "14+F",
        "damage": "2d6",
        "damageType": "Fire",
        "range": "20ft range, 15ft Blast radius",
        "rider": "Any crawler who fails to Evade gains the Queasy Debuff."
      }
    ],
    "notes": [
      "Even Keeled—Intelligence and Charisma-based Skills used against Hangman's Hawks are rolled with Disadvantage.",
      "Flight—Hangman's Hawks can move through the air as though on the ground."
    ],
    "page": 392,
    "source": "Core"
  },
  {
    "name": "Mimic",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Aberration",
      "Mimic"
    ],
    "level": 20,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "10+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Tongue Lash",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Stealthy—Any Mimic that is not surprised attacks with Advantage during the first round of combat.",
      "Twice Bitten—Mimics gain Advantage on their Bite attack against crawlers with the Held Debuff. If Mimics succeed on their Bite first attack against a crawler with the Held Debuff, they gain a second attack at Disadvantage."
    ],
    "page": 432,
    "source": "Core"
  },
  {
    "name": "Scolopendrini",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Animal"
    ],
    "level": 20,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 13,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Pincer",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Poison Breath",
        "toHit": "14+F",
        "damage": "2d10+4",
        "damageType": "Poison",
        "range": "20ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Slice and Dice",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Cold Weakness—Scolopendrini have Disadvantage to Evade Ice attacks and take x2 damage from them."
    ],
    "page": 404,
    "source": "Core"
  },
  {
    "name": "Skyfowl Crowcorps",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Dagger Feathers",
        "toHit": "14+F",
        "damage": "3d4+4",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Gusty Winds Spell",
        "toHit": "15+F",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "range": "30ft Cone +10ft Splash",
        "rider": "Any crawler who loses 2+ HB slots gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Flight—Skyfowl Crowcorps can move through the air as though on the ground.",
      "Observant—Skyfowl Crowcorps gain Advantage on Investigation and Perception Checks."
    ],
    "page": 393,
    "source": "Core"
  },
  {
    "name": "Peregrin Perch Prowlers",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 21,
    "hbSlots": [
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 8,
        "mod": 3
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Crossbow",
        "toHit": "15+F",
        "damage": "3d6",
        "damageType": "Piercing",
        "range": "50ft range"
      },
      {
        "name": "Spear",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Grab",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Catch and Release—Held crawlers are flown up 30 feet and dropped the next round. To escape, they must make a STR-Opposed Escape Artist Skill Check, or a STR Stat Check with the same Difficulty.",
      "Flight—Peregrin Perch Prowlers can move through the air as though on the ground.",
      "Riled Up—During the first round of combat, add their Stat Mod to the damage a second time."
    ],
    "page": 393,
    "source": "Core"
  },
  {
    "name": "Bugaboo",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 22,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 13,
        "mod": 4
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Boo Hug",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Glad Handed",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Queasy Debuff."
      },
      {
        "name": "Two-Fisted Take Down",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff. Can only be used every other round."
      }
    ],
    "notes": [
      "Extreme Body Odor—Crawlers ending their turn within 5ft of a Bugaboo must make a CON Stat Check with a Difficulty. On Fail, the crawler gains the Woozy Debuff."
    ],
    "page": 333,
    "source": "Core"
  },
  {
    "name": "Drake Bitch",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Reptile"
    ],
    "level": 22,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 35,
        "mod": 5
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 9,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Egg Cloud",
        "toHit": "14+F",
        "damage": "2d6",
        "damageType": "Acid",
        "range": "30ft Cone",
        "rider": "Any crawler who loses even one HB slot gains the Ovulated Debuff: A drake egg has lodged itself inside them. Their Health Bar cannot rise above 90% until the egg is removed."
      }
    ],
    "notes": [
      "Fly—Drake Bitches can move through the air as though on the ground, and their Move increases to 30."
    ],
    "page": 492,
    "source": "Core"
  },
  {
    "name": "Drake Stud",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Reptile"
    ],
    "level": 22,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 3,
        "mod": 2
      },
      "CON": {
        "score": 35,
        "mod": 5
      },
      "DEX": {
        "score": 12,
        "mod": 4
      },
      "CHA": {
        "score": 9,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Sperm Stream",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Force",
        "range": "30ft Line",
        "rider": "On an Evade Fail or worse, a crawler with the Ovulated Debuff gains the Gravid Debuff: A baby drake starts growing inside them. They lose 1 HB each day, and HB lost this way cannot be healed until the Gravid Debuff is removed. If the crawler reaches 0% HB, they die and a baby drake is born."
      }
    ],
    "notes": [],
    "page": 492,
    "source": "Core"
  },
  {
    "name": "Psycho Sticker",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Monstrous"
    ],
    "level": 22,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "13+F",
    "evade": "13+F",
    "move": "15+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 30,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 24,
        "mod": 5
      },
      "DEX": {
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Quill Shot",
        "toHit": "13+F",
        "damage": "2d6+5",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Spine",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Shielded Back—A Psycho Sticker's DR is 8 for foes attacking from behind or to their side.",
      "Spiky Back—When pushed into a space adjacent to the side or back of a Psycho Sticker, the crawler must make a DEX Stat Check. On Fail, they take 2d6+5 Piercing damage. On Success, they take half as much damage."
    ],
    "page": 458,
    "source": "Core"
  },
  {
    "name": "Razor Fox",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Beast"
    ],
    "level": 22,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 15,
        "mod": 4
      },
      "INT": {
        "score": 9,
        "mod": 3
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 34,
        "mod": 5
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Ninja Slash",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Shuriken Throw",
        "toHit": "15+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "30ft range"
      }
    ],
    "notes": [
      "Sneaky Quiet—If crawlers don't surprise attack a Razor Fox, its first round attack is made with Advantage."
    ],
    "page": 469,
    "source": "Core"
  },
  {
    "name": "Skegga Repair Dwarf Foredwarf",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 22,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 23,
        "mod": 5
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Inspiring Prod",
        "toHit": "15+F",
        "damage": "2d8+5",
        "damageType": "Electric",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Shocked Debuff."
      }
    ],
    "notes": [
      "Motivational Tool—Skegga Repair Dwarf Foredwarves are tasked with motivating their teams. Once per day they can encourage the dwarves within a 30ft Burst radius, granting them a +1 Buff to their STR and CON Mods for the next 8 hours."
    ],
    "page": 447,
    "source": "Core"
  },
  {
    "name": "Energy Vampire",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Outsider"
    ],
    "level": 23,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 19,
        "mod": 4
      },
      "CHA": {
        "score": 24,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Devour Energy",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Psychic",
        "range": "20ft range",
        "rider": "Any hit crawler loses Mana instead of decreasing HB slots. Once all Mana has been depleted, the damage affects HB slots."
      }
    ],
    "notes": [
      "Energy Depletion—Each time a crawler is hit by an Energy Vampire they must make a CON Stat Check. On Fail, they receive a temporary Debuff to both Charisma and Intelligence, each reduced by 2 for 2 hours. Stackable."
    ],
    "page": 471,
    "source": "Core"
  },
  {
    "name": "Clurichaun Aspirant",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Fairy"
    ],
    "level": 30,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 4
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 21,
        "mod": 5
      },
      "CHA": {
        "score": 24,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Cough",
        "toHit": "15+F",
        "damage": "5d8",
        "damageType": "Poison",
        "range": "10ft range"
      },
      {
        "name": "Sneeze",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "15ft Cone",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Promoter—Clurichaun Aspirants sell the highly addictive \"Rev-Up\" moonshine. Any crawlers that drink the moonshine must make a CON Stat Check. On Fail, they gain the Shit-Faced Debuff."
    ],
    "page": 502,
    "source": "Core"
  },
  {
    "name": "Gristle Gang Member",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 35,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Gross Solids",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      },
      {
        "name": "Gristle Grapple",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      },
      {
        "name": "Gross Liquids",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Acid",
        "range": "20ft range",
        "rider": "Any hit crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Oozy—A Gristle Gang Member can squeeze through size Small (2) and larger openings."
    ],
    "page": 511,
    "source": "Core"
  },
  {
    "name": "Jikininki Custodial Consultant",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 35,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Broom",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      },
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Sweep",
        "toHit": "15+F",
        "damage": "5d4+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler is pushed 10ft."
      }
    ],
    "notes": [
      "Blood Sense—Crawlers with the Blood Trail Debuff have Disadvantage on Stealth, Ambush, and Social Skill Checks against Jikininki.",
      "Janitor Mob—This Mob is responsible for cleaning messes on the Fourth Floor and prioritizes cleaning up corpses. It attacks crawlers when provoked, or when crawlers have the Blood Trail Debuff."
    ],
    "page": 503,
    "source": "Core"
  },
  {
    "name": "Tape Head",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Construct"
    ],
    "level": 35,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "16+F",
    "move": "15+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Terrible Tunes",
        "toHit": "16+F",
        "damage": "5d6",
        "damageType": "Sonic",
        "range": "20ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sepsis Debuff."
      }
    ],
    "notes": [],
    "page": 514,
    "source": "Core"
  },
  {
    "name": "Trash Knight",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Amalgamation"
    ],
    "level": 35,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Rebar Sword",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Trash Lance",
        "toHit": "15+F",
        "damage": "4d12",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Staggered Debuff. Can only be used when Mounted."
      }
    ],
    "notes": [
      "Mounted—When mounted on their flying ostriches, Trash Knights can move through the air as though on the ground, and their Move increases to 30."
    ],
    "page": 512,
    "source": "Core"
  },
  {
    "name": "Gelatinous Boob",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Aberration"
    ],
    "level": 40,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Engulf",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Acid",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Swallowed Debuff: The crawler is swallowed whole and cannot be attacked. When an attack against the Gelatinous Boob results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff. Swallowed crawlers take 1d8+F Acid at the end of each round. Swallowed crawlers attack with Disadvantage vs. 0 DR."
      }
    ],
    "notes": [
      "Oozy—A Gelatinous Boob can squeeze through size Small (2) and larger openings.",
      "Permeable—The Gelatinous Boob is immune to Piercing and Slashing damage."
    ],
    "page": 513,
    "source": "Core"
  },
  {
    "name": "Lobe Ganger",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Aberration"
    ],
    "level": 40,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "16+F",
    "evade": "15+F",
    "move": "15+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 55,
        "mod": 6
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Mind Blast Spell",
        "toHit": "16+F",
        "damage": "5d8",
        "damageType": "Psychic",
        "range": "60ft range, 5ft Blast radius"
      },
      {
        "name": "Unsightly",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Psychic",
        "range": "10ft Burst radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Terrified Debuff."
      }
    ],
    "notes": [],
    "page": 512,
    "source": "Core"
  },
  {
    "name": "Pooka Goal Digger",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Shapeshifter"
    ],
    "level": 40,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Head Butt",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      },
      {
        "name": "Mind Devour",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Psychic",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Paralyzed Debuff."
      },
      {
        "name": "Sweet Song",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "40ft Burst radius",
        "rider": "Any hit crawler gains the Unconscious Debuff: They are prone and cannot take actions. If they take damage, they wake up. Uses this attack every other round."
      },
      {
        "name": "Vitamin Shot",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Size ranges from Small (2) to Huge (6).",
      "Transformational—When attacked, a Pooka Goal Digger transforms into a huge goat."
    ],
    "page": 501,
    "source": "Core"
  },
  {
    "name": "Graffiti Mimic",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Aberration",
      "Mimic"
    ],
    "level": 50,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 52,
        "mod": 6
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 51,
        "mod": 6
      },
      "DEX": {
        "score": 24,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Piercing",
        "range": "10ft range"
      },
      {
        "name": "Acid Spit",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Acid",
        "range": "15ft range",
        "rider": "Any hit crawler gains the Burned Debuff."
      },
      {
        "name": "Psychic Smother",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Psychic",
        "range": "20ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Stealthy—Any Graffiti Mimic that is not surprised attacks with Advantage during the first round of combat."
    ],
    "page": 510,
    "source": "Core"
  },
  {
    "name": "Pooka Harmacist",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Shapeshifter"
    ],
    "level": 50,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 55,
        "mod": 6
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 25,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Head Butt",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      },
      {
        "name": "Psychedelics",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Poison",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Shit-Faced Debuff."
      },
      {
        "name": "Vitamin Shot",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Size ranges from Small (2) to Huge (6).",
      "Transformational—When attacked, a Pooka Harmacist transforms into a huge goat."
    ],
    "page": 503,
    "source": "Core"
  },
  {
    "name": "Clurichaun Aspirant Super Duper Star",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Fairy"
    ],
    "level": 55,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 50,
        "mod": 6
      },
      "CON": {
        "score": 30,
        "mod": 5
      },
      "DEX": {
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Cuss",
        "toHit": "16+F",
        "damage": "3d8+5",
        "damageType": "Sonic",
        "range": "15ft Burst radius",
        "rider": "Any hit crawler gains the Terrified Debuff."
      },
      {
        "name": "Kiss",
        "toHit": "16+F",
        "damage": "5d8+5",
        "damageType": "Poison",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      },
      {
        "name": "Stomp",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "15ft Burst radius",
        "rider": "Any hit crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Promoter—Clurichaun Aspirant Super Duper Stars sell the highly addictive \"Rev-Up\" moonshine. Any crawlers that drink the moonshine must make a CON Stat Check. On Fail, they gain the Shit-Faced Debuff.",
      "Winner Winner Chicken Dinner—Clurichaun Aspirant Super Duper Star gains Advantage on the first Attack or Skill Check they make in Combat.",
      "Stat block for Haddley Luanne Montgomery."
    ],
    "page": 503,
    "source": "Core"
  },
  {
    "name": "Village Guard",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 75,
    "hbSlots": [
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "15+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 70,
        "mod": 6
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 100,
        "mod": 7
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Commanding Shout Spell",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "100ft range",
        "rider": "Any hit crawler gains the Terrified Debuff for 2 rounds."
      },
      {
        "name": "Longsword",
        "toHit": "16+F",
        "damage": "7d10+6",
        "damageType": "Slashing",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Letter of the Law—Village Guards don't compromise or show mercy. If they know someone has broken a law, they attempt to kill the target on sight. They end their pursuit if the target leaves the settlement but remember the target if they return."
    ],
    "page": 335,
    "source": "Core"
  },
  {
    "name": "Rage Elemental",
    "role": "Mob",
    "size": 7,
    "tags": [
      "Elemental"
    ],
    "level": 93,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "11+F",
    "evade": "14+F",
    "move": "60+S",
    "dr": 13,
    "stats": {
      "STR": {
        "score": 136,
        "mod": 7
      },
      "INT": {
        "score": 1,
        "mod": 1
      },
      "CON": {
        "score": 66,
        "mod": 6
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 66,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "17+F",
        "damage": "5d8+7",
        "damageType": "Slashing",
        "range": "10ft range"
      },
      {
        "name": "Reverse Gravity Spell",
        "toHit": "Passive",
        "damage": "No damage",
        "range": "60ft range, 20ft Blast radius",
        "rider": "see below"
      },
      {
        "name": "Roar",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "20ft Burst radius",
        "rider": "Any hit crawler gains the Paralyzed Debuff."
      }
    ],
    "notes": [
      "Elemental—Rage elementals are immune to non-magical physical damage (but can be harmed by elemental damage, enchanted objects, spells, and explosives, among other effects).",
      "Gravity Reversed—All creatures in the affected area fall in the wrong direction, taking 1d6 Bludgeoning damage for every 10 feet \"fallen.\" At the end of the round, it goes back to normal, and unsecured creatures will fall again.",
      "Reincarnation—Rage elementals claim the souls of entities they kill. Each soul they claim allows them to revive once at full Health when they're killed. They take 1 minute to reform and are immune to all damage during that time.",
      "Soul Reaper—Rage elementals dissipate after claiming 666 souls."
    ],
    "page": 141,
    "source": "GM Toolkit"
  },
  {
    "name": "Songstress",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 8,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "12+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 7,
        "mod": 3
      },
      "CHA": {
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "38 Special",
        "toHit": "13+F",
        "damage": "2d6",
        "damageType": "Piercing",
        "range": "20ft range"
      },
      {
        "name": "Blow a Kiss",
        "toHit": "12+F",
        "damage": "2d4+2",
        "damageType": "Psychic",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Woozy Debuff."
      }
    ],
    "notes": [
      "Sultry Singer—Crawlers hearing an Orc Singer song must make an INT Stat Check. On Fail, the crawler gains the Captivated Debuff: They cannot hear anything else until the song ends"
    ],
    "page": 352,
    "source": "Core"
  },
  {
    "name": "Grease Gremlin",
    "role": "NPC",
    "size": 2,
    "tags": [
      "Humanoid"
    ],
    "level": 18,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 13,
        "mod": 4
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Fast Disassemble",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "Any hit crawler has one carried or worn mechanical device (usually a weapon or piece of armor) disassembled and made unusable until the crawler spends two actions to reassemble it."
      },
      {
        "name": "Multi-Weapon",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning, Piercing, or Slashing (their choice)",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Minor Injury Debuff."
      }
    ],
    "notes": [
      "Fast Assembly—A Grease Gremlin can repair a mechanical device in one third the normal time.",
      "Irritable Worker—A Grease Gremlin ignores crawlers while the Grease Gremlin is repairing items. When a crawler disrupts their repair work, a Grease Gremlin gains Advantage on their first attack against that crawler."
    ],
    "page": 435,
    "source": "Core"
  },
  {
    "name": "Blaster Master",
    "role": "NPC",
    "size": 2,
    "tags": [
      "Construct"
    ],
    "level": 20,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "10+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Rock On",
        "toHit": "14+F",
        "damage": "3d4",
        "damageType": "Sonic",
        "range": "15ft Burst range",
        "rider": "Any hit crawler gains the Stunned."
      }
    ],
    "notes": [],
    "page": 514,
    "source": "Core"
  },
  {
    "name": "Captain Raptor",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "25+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 32,
        "mod": 5
      },
      "INT": {
        "score": 11,
        "mod": 4
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 13,
        "mod": 4
      },
      "CHA": {
        "score": 23,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Cutlass",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler immediately gains the Major Injury Debuff."
      },
      {
        "name": "Fast Talking",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "20ft Burst Radius",
        "rider": "Any hit crawler must make an INT-Opposed Detect Lies Skill check or INT Stat Check at the same Difficulty. On Fail, the crawler is enamored with Captain Raptor's birdshit words and can do nothing but listen until the start of Captain Raptor's next turn."
      },
      {
        "name": "Flask Fling",
        "toHit": "15+F",
        "damage": "4d10+6",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Shit-Faced Debuff."
      }
    ],
    "notes": [
      "Flight—Captain Raptor can move through the air as though on the ground.",
      "Lovable Liar—Captain Raptor gains Advantage on Deception Checks."
    ],
    "page": 394,
    "source": "Core"
  },
  {
    "name": "Headhunter Harriet",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 11,
        "mod": 4
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 32,
        "mod": 5
      },
      "CHA": {
        "score": 12,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Evil Eye",
        "toHit": "16+F",
        "damage": "4d10+6",
        "damageType": "Psionic",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Muted Debuff."
      },
      {
        "name": "Instill Fear",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Terrified Debuff."
      },
      {
        "name": "Iron Talon",
        "toHit": "15+F",
        "damage": "5d10+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Veiled Threat",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Paralyzed Debuff."
      }
    ],
    "notes": [
      "Printed block title is \"Hangman's Hawks\" (shared with the p392 Mob); this is Headhunter Harriet's NPC stat block.",
      "Flight—Headhunter Harriet can move through the air as though on the ground.",
      "Summon Fixer—Headhunter Harriet can spend an action to summon 1d4 Elven Enforcers who will magically appear in 1d4 rounds."
    ],
    "page": 394,
    "source": "Core"
  },
  {
    "name": "Hobgoblin Interdictor",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 20,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 12,
        "mod": 4
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Spanner",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Staggered Debuff."
      },
      {
        "name": "Improvised Explosive",
        "toHit": "14+F",
        "damage": "2d8",
        "damageType": "Fire",
        "range": "20ft range, 10ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Creative—Hobgoblins gain Advantage on all Explosives and Repair related Checks."
    ],
    "page": 436,
    "source": "Core"
  },
  {
    "name": "Dwarven Lift Engineer",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 25,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 21,
        "mod": 5
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Dance Dance Evolution",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Queasy Debuff."
      },
      {
        "name": "Disapproving Glare",
        "toHit": "14+F",
        "damage": "2d6+5",
        "damageType": "Psychic",
        "range": "25ft range",
        "rider": "Any hit crawler gains the Terrified Debuff."
      },
      {
        "name": "Wrench",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Craft Master—Dwarven Lift Engineers can assist crawlers in crafting. Crawlers gain Advantage on their crafting Skill Checks when aided in this manner.",
      "Dancing Queen—Dwarven Lift Engineers are in a constant whirl of motion. Crawlers attempting to follow their movements must make an INT-Opposed Tracking Skill Check. On Fail, the crawler gains the Fatigued Debuff.",
      "Ready Access Tools—Dwarven Lift Engineers have an Inventory system built into their ornate beard braids. They can instantly retrieve any required tool smaller than themselves as needed."
    ],
    "page": 340,
    "source": "Core"
  },
  {
    "name": "Grapple",
    "role": "NPC",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 25,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "13+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 11,
        "mod": 4
      },
      "DEX": {
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Grab",
        "toHit": "16+F",
        "damage": "3d8+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Highly Suggestible—Grapples have Disadvantage against all attempts to charm, deceive, or persuade them.",
      "Squirrelly—Grapples left without direction for 8 hours or more become restless and start behaving erratically. This may include running around in circles, rearranging furniture, and closely following crawlers and mimicking their actions."
    ],
    "page": 437,
    "source": "Core"
  },
  {
    "name": "Shade Gnoll",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 27,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 22,
        "mod": 5
      },
      "INT": {
        "score": 13,
        "mod": 4
      },
      "CON": {
        "score": 22,
        "mod": 5
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 4,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Expandable Baton",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      },
      {
        "name": "Pulse Rifle",
        "toHit": "15+F",
        "damage": "2d8",
        "damageType": "Fire",
        "range": "80ft range",
        "rider": "Any hit crawler gains the Burned Debuff."
      },
      {
        "name": "Pressure Point",
        "toHit": "15+F",
        "damage": "2d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Paralyzed or Take Down Debuff (Shade Gnoll's choice)."
      }
    ],
    "notes": [
      "Pack Hunters—When two or more Shade Gnolls are adjacent to a target, they gain Advantage on their attacks.",
      "Riot Shields—Two or more Shade Gnolls equipped with a Riot Shield can each spend their Move to form a movable wall. Each Shade Gnoll in the wall gains Advantage to Area of Effect and Evade Checks while part of the wall but also gain Disadvantage on all their attacks."
    ],
    "page": 435,
    "source": "Core"
  },
  {
    "name": "Teen Bully",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 27,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 12,
        "mod": 4
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Blue Magnum Look",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "20ft range",
        "rider": "Any hit crawler gains the Paralyzed Debuff."
      },
      {
        "name": "Icy Touch",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Ice",
        "range": "5ft range"
      },
      {
        "name": "Piercing Glare",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Piercing",
        "range": "25ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Manipulative—Crawlers attempting Charisma-based Skills against Steph do so with Disadvantage."
    ],
    "page": 385,
    "source": "Core"
  },
  {
    "name": "Hector",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 28,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 25,
        "mod": 5
      },
      "DEX": {
        "score": 14,
        "mod": 4
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Booze Bomb",
        "toHit": "15+F",
        "damage": "2d8",
        "damageType": "Fire",
        "range": "30ft range, 5ft Blast radius",
        "rider": "Any hit crawler gains the Shit-Faced Debuff."
      }
    ],
    "notes": [],
    "page": 453,
    "source": "Core"
  },
  {
    "name": "Elder Gremlin",
    "role": "NPC",
    "size": 2,
    "tags": [
      "Humanoid"
    ],
    "level": 30,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 13,
        "mod": 4
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 23,
        "mod": 5
      },
      "DEX": {
        "score": 23,
        "mod": 5
      },
      "CHA": {
        "score": 13,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Fast Disassemble",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "5ft range",
        "rider": "Any hit crawler has one carried or worn mechanical device (usually a weapon or piece of armor) disassembled and made unusable until the crawler spends two actions to reassemble it."
      },
      {
        "name": "Knife",
        "toHit": "15+F",
        "damage": "3d6+4",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Armor-Piercing. On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Fast Assembly—A Grease Gremlin can repair a mechanical device in one third the normal time.",
      "Long Memories—Elder Grease Gremlins will go out of their way to help those who help them and theirs. Crawlers that aid an Elder Grease Gremlin have Advantage on CHA Stat Checks when dealing with them in the future. Those that cross Elder Grease Gremlins gain Disadvantage on CHA Stat Checks when dealing with them in the future.",
      "Stat block for Elder Grease Gremlin Rosie."
    ],
    "page": 486,
    "source": "Core"
  },
  {
    "name": "Dwarf Employee",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 32,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 21,
        "mod": 5
      },
      "CON": {
        "score": 51,
        "mod": 6
      },
      "DEX": {
        "score": 11,
        "mod": 4
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Clipboard",
        "toHit": "14+F",
        "damage": "5d4+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Enraged Debuff."
      },
      {
        "name": "Conducting",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "10ft Burst radius",
        "rider": "Any hit crawler gains the Compliant Debuff: The crawler must make a CHA Stat Check. On Fail, the crawler must obey the Dwarf Conductor's next command."
      },
      {
        "name": "Unarmed Attack",
        "toHit": "14+F",
        "damage": "5d4+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Pre-Production Stupor—When a Dwarf Conductor completes their line, they blink out and reset at the depot or station. They are dazed and highly suggestible until their next shift begins. Crawlers have Advantage on Skill Checks and attacks against them during this time."
    ],
    "page": 436,
    "source": "Core"
  },
  {
    "name": "Cyborg Mechanic",
    "role": "NPC",
    "size": 6,
    "tags": [
      "Cyborg"
    ],
    "level": 45,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 23,
        "mod": 5
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 57,
        "mod": 6
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 13,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Fast Disassemble",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "10ft range",
        "rider": "Any hit crawler must make a DEX Stat Check. On Fail, one item the crawler is holding is disassembled and unusable until they spend 2 Actions to reassemble it."
      },
      {
        "name": "Monkey Wrench",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      },
      {
        "name": "Multi-Weapon",
        "toHit": "15+F",
        "damage": "5d10+5",
        "damageType": "Bludgeoning, Piercing, or Slashing (her choice)",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Woozy Debuff."
      }
    ],
    "notes": [
      "This is Helga Elfcrusher's NPC stat block (Giant Mechanic).",
      "Identify Weakness—Helga Elfcrusher can spend an Action to study a crawler and gains Advantage on her next attack against them."
    ],
    "page": 405,
    "source": "Core"
  },
  {
    "name": "Pebbles",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 45,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 35,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 40,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Punch",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Fire Blast",
        "toHit": "14+F",
        "damage": "3d8+6",
        "damageType": "Fire",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Grease Bomb",
        "toHit": "15+F",
        "damage": "2d12",
        "damageType": "Acid",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Any crawler who fails to Evade gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Hot Body—Pebbles overheats during combat, dealing 1d6+F Fire, 5ft Burst as a free Attack each round, and it always hits."
    ],
    "page": 463,
    "source": "Core"
  },
  {
    "name": "Rivet",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 45,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 35,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 40,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Punch",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Electric Blast",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Electric",
        "range": "30ft range",
        "rider": "Any crawler who fails to Evade gains The Taint Debuff."
      },
      {
        "name": "Grease Bomb",
        "toHit": "15+F",
        "damage": "2d12",
        "damageType": "Acid",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Any crawler who fails to Evade gains the Stunned Debuff."
      }
    ],
    "notes": [
      "Repair—Rivet's cybernetic implants allow him to use an action to disable, trigger, or reset one piece of sabotaged equipment within 30ft."
    ],
    "page": 464,
    "source": "Core"
  },
  {
    "name": "Toothless Nana",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 45,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 35,
        "mod": 5
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 40,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Punch",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Ice Blast",
        "toHit": "14+F",
        "damage": "3d8+4",
        "damageType": "Ice",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stiff Legs Debuff."
      },
      {
        "name": "Grease Bomb",
        "toHit": "15+F",
        "damage": "2d12",
        "damageType": "Acid",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Any crawler who fails to Evade gains The Taint Debuff."
      }
    ],
    "notes": [
      "Commanding Voice—WORRIED Mobs within 15ft who can hear Toothless Nana are immune to Penthos's Demoralize if she's helping the crawlers or have Disadvantage on their Opposed Check if she's helping Penthos."
    ],
    "page": 464,
    "source": "Core"
  },
  {
    "name": "Demon",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Demonic"
    ],
    "level": 50,
    "hbSlots": [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 23,
        "mod": 5
      },
      "INT": {
        "score": 27,
        "mod": 5
      },
      "CON": {
        "score": 50,
        "mod": 6
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "4d8+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains The Taint Debuff for 2 rounds."
      },
      {
        "name": "Unsaintly Claws",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Not So Jolly—When they first encounter a demon, crawlers must make an INT Stat Check. On Fail, the crawler gains the Terrified Debuff."
    ],
    "page": 364,
    "source": "Core"
  },
  {
    "name": "Superior Forge Sprite",
    "role": "NPC",
    "size": 3,
    "tags": [
      "Elemental"
    ],
    "level": 70,
    "hbSlots": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "25+S",
    "dr": 4,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 87,
        "mod": 6
      },
      "CON": {
        "score": 28,
        "mod": 5
      },
      "DEX": {
        "score": 63,
        "mod": 6
      },
      "CHA": {
        "score": 25,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Fire Blast",
        "toHit": "16+F",
        "damage": "5d10+6",
        "damageType": "Fire",
        "range": "60ft range, 10ft Blast radius +5ft Splash",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Angry—Superior Forge Sprites have the Enraged Debuff."
    ],
    "page": 452,
    "source": "Core"
  }
];
