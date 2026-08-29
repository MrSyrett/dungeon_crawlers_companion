// GENERATED FILE - do not edit by hand.
// Source: data/nimble/parts/*.json - regenerate with: node scripts/build-nimble-data.mjs

import type { NimbleMonster } from "./nimble-types";

export const NIMBLE_MONSTERS: NimbleMonster[] = [
  {
    "name": "Kobold Minion",
    "family": "Kobolds",
    "level": "1/4",
    "size": "small",
    "hp": null,
    "armor": null,
    "legendary": false,
    "minion": true,
    "abilities": [
      {
        "name": "Stab",
        "text": "1d4 (follows minion rules)."
      }
    ],
    "familyTrait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "page": 32
  },
  {
    "name": "Kobold",
    "family": "Kobolds",
    "level": "1/3",
    "size": "small",
    "hp": 12,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Stab",
        "text": "1d4+2 (or Sling, Range 8)."
      }
    ],
    "familyTrait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "page": 32
  },
  {
    "name": "Kobold Sneak",
    "family": "Kobolds",
    "level": "1/2",
    "size": "small",
    "hp": 15,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Revenge!",
        "text": "When an ally dies, you may move up to 6 spaces before using your Nooooo! ability."
      },
      {
        "name": "Stab",
        "text": "1d4+2 (or Sling, Range 8)."
      }
    ],
    "familyTrait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "page": 32
  },
  {
    "name": "Kobold Clanger",
    "family": "Kobolds",
    "level": "1",
    "hp": 16,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "CLANG!",
        "text": "Allies who hear your clanging, roll 1 additional die whenever they attack."
      }
    ],
    "familyTrait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "page": 32
  },
  {
    "name": "Kobold Trapper",
    "family": "Kobolds",
    "level": "1",
    "size": "small",
    "hp": 26,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Throw Scorpion (2×)",
        "text": "(Range 8) 1d4+2."
      },
      {
        "name": "Trap!",
        "text": "When an enemy moves adjacent to you or an ally, they trigger one of your traps! (1/encounter each). BEEES! Deal 5d4 damage (doesn't miss). Half as much to ALL adjacent creatures. HIDDEN NET! Restrained (escape DC 10)."
      }
    ],
    "familyTrait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "page": 32
  },
  {
    "name": "Kobold Denwarden",
    "family": "Kobolds",
    "level": "1",
    "hp": 20,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Hold!",
        "text": "Adjacent allies gain Medium Armor."
      },
      {
        "name": "Stab (2×)",
        "text": "1d4+2 (or Sling, Range 8)."
      }
    ],
    "familyTrait": "Nooooo! When an ally within 2 spaces dies, attack once for free.",
    "page": 32
  },
  {
    "name": "Goblin Minion",
    "family": "Goblins",
    "level": "1/4",
    "size": "small",
    "hp": null,
    "armor": null,
    "legendary": false,
    "minion": true,
    "abilities": [
      {
        "name": "Stab",
        "text": "1d6 (follows minion rules)."
      }
    ],
    "familyTrait": "Haha, Missed Me! Whenever an attack misses you, deal 1 psychic damage in return.",
    "page": 33
  },
  {
    "name": "Goblin",
    "family": "Goblins",
    "level": "1/3",
    "size": "small",
    "hp": 15,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Stab",
        "text": "1d6+2 (or Shoot, Range 8)."
      }
    ],
    "familyTrait": "Haha, Missed Me! Whenever an attack misses you, deal 1 psychic damage in return.",
    "page": 33
  },
  {
    "name": "Bugbear",
    "family": "Goblins",
    "level": "2",
    "hp": 30,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Cleave",
        "text": "2d6+4. OR:"
      },
      {
        "name": "Javelin",
        "text": "1d6+2 (Range 8)."
      }
    ],
    "familyTrait": "Haha, Missed Me! Whenever an attack misses you, deal 1 psychic damage in return.",
    "page": 33
  },
  {
    "name": "Goblin Taskmaster",
    "family": "Goblins",
    "level": "2",
    "size": "small",
    "hp": 30,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Meat Shield",
        "text": "Can force other goblins to Interpose for him."
      },
      {
        "name": "Stab",
        "text": "1d6+2 (or Shoot, Range 8). Then:"
      },
      {
        "name": "Get in here!",
        "text": "Call a goblin minion to the fight."
      }
    ],
    "familyTrait": "Haha, Missed Me! Whenever an attack misses you, deal 1 psychic damage in return.",
    "page": 33
  },
  {
    "name": "Goblin Ratrider",
    "family": "Goblins",
    "level": "2",
    "hp": 30,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "CHAAARGE!",
        "text": "If you move at least 4 spaces in a straight line, attack with advantage once."
      },
      {
        "name": "Bite & Stab (2×)",
        "text": "1d6+2. On crit: Prone."
      }
    ],
    "familyTrait": "Haha, Missed Me! Whenever an attack misses you, deal 1 psychic damage in return.",
    "description": "Speed 10.",
    "page": 33
  },
  {
    "name": "Bandit Minion",
    "family": "Bandits",
    "level": "1/4",
    "hp": null,
    "armor": null,
    "legendary": false,
    "minion": true,
    "abilities": [
      {
        "name": "Stab",
        "text": "1d8 (follows minion rules)."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Bandit",
    "family": "Bandits",
    "level": "1/3",
    "hp": 12,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Stab",
        "text": "1d8+1 (or Shoot, Range 8)."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Bandit Bruiser",
    "family": "Bandits",
    "level": "2",
    "hp": 24,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Bash",
        "text": "2d8+4."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Bandit Captain",
    "family": "Bandits",
    "level": "4",
    "hp": 36,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Slice (3×)",
        "text": "1d8+1 (or Shoot, Range 8)."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Bandit Hunter",
    "family": "Bandits",
    "level": "1",
    "hp": 22,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Battlebow",
        "text": "2d8+2 (Range 12)."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Bandit Assassin",
    "family": "Bandits",
    "level": "2",
    "hp": 24,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Sneak",
        "text": "You are invisible until you attack."
      },
      {
        "name": "Poison Blade (2×)",
        "text": "1d8+2. On damage: Dazed."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Bandit Mage",
    "family": "Bandits",
    "level": "4",
    "hp": 41,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Spark Step",
        "text": "When damaged, teleport up to 4 spaces."
      },
      {
        "name": "Arc Lightning",
        "text": "3d8 (Range 12). Also strikes the next closest creature. On miss: damage self instead."
      }
    ],
    "familyTrait": "Parry. Treat attacks against you that roll 2 as a miss.",
    "page": 34
  },
  {
    "name": "Snakeman Minion",
    "family": "Snakemen",
    "level": "1/4",
    "hp": null,
    "armor": null,
    "legendary": false,
    "minion": true,
    "abilities": [
      {
        "name": "Strike",
        "text": "1d6 melee/ranged (follows minion rules)."
      }
    ],
    "familyTrait": "Coiling Strike. On melee crit: Grapple (escape DC 10).",
    "page": 34
  },
  {
    "name": "Snakeman",
    "family": "Snakemen",
    "level": "1",
    "hp": 26,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Slash",
        "text": "1d6+6 (or Spit, Range 8)."
      }
    ],
    "familyTrait": "Coiling Strike. On melee crit: Grapple (escape DC 10).",
    "page": 34
  },
  {
    "name": "Cobra Captain",
    "family": "Snakemen",
    "level": "4",
    "hp": 36,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Slash (2×)",
        "text": "1d6+6 (or Spit, Range 8)."
      }
    ],
    "familyTrait": "Coiling Strike. On melee crit: Grapple (escape DC 10).",
    "page": 34
  },
  {
    "name": "Giant Cobra",
    "family": "Snakemen",
    "level": "8",
    "size": "large",
    "hp": 80,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Crush",
        "text": "2d6+20. Advantage vs. smaller creatures."
      }
    ],
    "familyTrait": "Coiling Strike. On melee crit: Grapple (escape DC 10).",
    "page": 34
  },
  {
    "name": "Stirge",
    "family": "Dungeon Denizens",
    "level": "1/2",
    "size": "tiny",
    "hp": 10,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Latch On",
        "text": "1d4+2. On hit: Latched On."
      },
      {
        "name": "Latched On",
        "text": "You move where your target moves until either dies. Your attacks can't miss or be Defended/Interposed against. Attacks that miss you damage your target instead."
      }
    ],
    "familyTrait": "Evasive Flier. Attacks against stirges are made with disadvantage.",
    "description": "Stirges.",
    "page": 35
  },
  {
    "name": "Greater Stirge",
    "family": "Dungeon Denizens",
    "level": "6",
    "size": "small",
    "hp": 60,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Latch On",
        "text": "1d12+10. On hit: Latched On."
      },
      {
        "name": "Latched On",
        "text": "You move where your target moves until either dies. Your attacks can't miss or be Defended/Interposed against. Attacks that miss you damage your target instead."
      }
    ],
    "familyTrait": "Evasive Flier. Attacks against stirges are made with disadvantage.",
    "description": "Stirges.",
    "page": 35
  },
  {
    "name": "Tiny Mimic",
    "family": "Dungeon Denizens",
    "level": "1",
    "hp": 28,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Pseudopod",
        "text": "1d4 (escape DC 9) OR:"
      },
      {
        "name": "Bite",
        "text": "(a Grappled creature) 1d12."
      },
      {
        "name": "Sticky",
        "text": "Mimic hits also Grapple and can Grapple any number of creatures. When crit: release 1 creature (attacker's choice)."
      }
    ],
    "familyTrait": "Ambusher. Mimics always start first and heroes roll Initiative with disadvantage.",
    "description": "Mimics. Disguises: Cup, Shoe, Apple, Candlestick, Potion, Pebble.",
    "page": 35
  },
  {
    "name": "Small Mimic",
    "family": "Dungeon Denizens",
    "level": "2",
    "hp": 41,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Pseudopod",
        "text": "1d6 (escape DC 11) OR:"
      },
      {
        "name": "Bite",
        "text": "(a Grappled creature) 1d20."
      },
      {
        "name": "Sticky",
        "text": "Mimic hits also Grapple and can Grapple any number of creatures. When crit: release 1 creature (attacker's choice)."
      }
    ],
    "familyTrait": "Ambusher. Mimics always start first and heroes roll Initiative with disadvantage.",
    "description": "Mimics. Disguises: Backpack, Shield/Weapon, Chair, Crate, Tree Stump.",
    "page": 35
  },
  {
    "name": "Medium Mimic",
    "family": "Dungeon Denizens",
    "level": "6",
    "hp": 79,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Pseudopod",
        "text": "1d8 (escape DC 13) OR:"
      },
      {
        "name": "Bite",
        "text": "(a Grappled creature) 2d20."
      },
      {
        "name": "Sticky",
        "text": "Mimic hits also Grapple and can Grapple any number of creatures. When crit: release 1 creature (attacker's choice)."
      }
    ],
    "familyTrait": "Ambusher. Mimics always start first and heroes roll Initiative with disadvantage.",
    "description": "Mimics. Disguises: Table, Treasure Chest, Barrel, Bookshelf, Door, Bed.",
    "page": 35
  },
  {
    "name": "Gray Ooze",
    "family": "Dungeon Denizens",
    "level": "1",
    "hp": 28,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Acidic Touch (2×)",
        "text": "1d6+2."
      },
      {
        "name": "Digestive Touch",
        "text": "Contact with an ooze inflicts the Digested condition: they deal an additional 2 damage for each time the target has been Digested this encounter."
      }
    ],
    "familyTrait": "Digestive Touch. Contact with an ooze inflicts the Digested condition: they deal an additional X damage for each time the target has been Digested this encounter (X = the ooze's damage bonus).",
    "description": "Oozes.",
    "page": 35
  },
  {
    "name": "Ochre Jelly",
    "family": "Dungeon Denizens",
    "level": "4",
    "size": "large",
    "hp": 52,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Acidic Touch (2×)",
        "text": "1d6+3."
      },
      {
        "name": "Digestive Touch",
        "text": "Contact with an ooze inflicts the Digested condition: they deal an additional 3 damage for each time the target has been Digested this encounter."
      }
    ],
    "familyTrait": "Digestive Touch. Contact with an ooze inflicts the Digested condition: they deal an additional X damage for each time the target has been Digested this encounter (X = the ooze's damage bonus).",
    "description": "Oozes.",
    "page": 35
  },
  {
    "name": "Black Pudding",
    "family": "Dungeon Denizens",
    "level": "8",
    "size": "large",
    "hp": 90,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Acidic Touch (2×)",
        "text": "(Reach 2) 1d6+5."
      },
      {
        "name": "Digestive Touch",
        "text": "Contact with an ooze inflicts the Digested condition: they deal an additional 5 damage for each time the target has been Digested this encounter."
      }
    ],
    "familyTrait": "Digestive Touch. Contact with an ooze inflicts the Digested condition: they deal an additional X damage for each time the target has been Digested this encounter (X = the ooze's damage bonus).",
    "description": "Oozes.",
    "page": 35
  },
  {
    "name": "Elder Ooze",
    "family": "Dungeon Denizens",
    "level": "12",
    "size": "huge",
    "hp": 150,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Acidic Touch (3×)",
        "text": "(Reach 3) 1d6+6."
      },
      {
        "name": "Digestive Touch",
        "text": "Contact with an ooze inflicts the Digested condition: they deal an additional 6 damage for each time the target has been Digested this encounter."
      },
      {
        "name": "Goopy",
        "text": "When crit or dealt any slashing damage: summon 6 ooze minions (size: d6); their attacks inflict Digested."
      }
    ],
    "familyTrait": "Digestive Touch. Contact with an ooze inflicts the Digested condition: they deal an additional X damage for each time the target has been Digested this encounter (X = the ooze's damage bonus).",
    "description": "Oozes.",
    "page": 35
  },
  {
    "name": "Gnoll",
    "family": "Hill & Field",
    "level": "1",
    "hp": 28,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Ravage (2×)",
        "text": "1d10. OR:"
      },
      {
        "name": "Shoot",
        "text": "(Range 12) 1d10."
      }
    ],
    "familyTrait": "Frenzy. Advantage against Bloodied creatures.",
    "description": "Gnolls.",
    "page": 36
  },
  {
    "name": "Gnoll Packleader",
    "family": "Hill & Field",
    "level": "4",
    "hp": 39,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Bark Orders",
        "text": "2 allies can move. Then:"
      },
      {
        "name": "Ravage (3×)",
        "text": "1d10."
      }
    ],
    "familyTrait": "Frenzy. Advantage against Bloodied creatures.",
    "description": "Gnolls.",
    "page": 36
  },
  {
    "name": "Worg",
    "family": "Hill & Field",
    "level": "1",
    "size": "large",
    "hp": 28,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Savage",
        "text": "Always crits when attacking a Grappled creature."
      },
      {
        "name": "Rip Apart (2×)",
        "text": "1d6+2. On hit: Grappled (escape DC 10)."
      }
    ],
    "description": "Speed 10.",
    "page": 36
  },
  {
    "name": "Hill Giant",
    "family": "Hill & Field",
    "level": "12",
    "size": "huge",
    "hp": 140,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Brute",
        "text": "On hit: Knockback Primary Die spaces."
      },
      {
        "name": "Smash (2×)",
        "text": "(Reach 2) 1d6+15. OR:"
      },
      {
        "name": "Boulder!",
        "text": "(Range 12) 1d6+20."
      }
    ],
    "description": "Speed 8.",
    "page": 36
  },
  {
    "name": "Bulette",
    "family": "Hill & Field",
    "level": "10",
    "size": "large",
    "hp": 74,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Burst Forth!",
        "text": "Combat with a Bulette starts with the heaviest character making a DC 14 DEX save or they are Grappled (escape DC 14) and take 1d12+20 damage (half on save)."
      },
      {
        "name": "Drag Below",
        "text": "(A Grappled creature) 2d12 then drag below and burrow away. OR:"
      },
      {
        "name": "Leap & Bite",
        "text": "(If not grappling) leap 6, and attack for 1d12+20. On hit: Grappled."
      }
    ],
    "description": "Burrow.",
    "page": 36
  },
  {
    "name": "Troll",
    "family": "Hill & Field",
    "level": "10",
    "size": "large",
    "hp": 100,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Regenerate",
        "text": "Does not die at 0 HP. Only fire, radiant, or a crit while at 0 HP can kill it."
      },
      {
        "name": "Claws",
        "text": "Choose twice: (Reach 2) 1d4+10. On crit: Prone."
      },
      {
        "name": "Bite",
        "text": "Choose twice: (A Prone creature) 1d4+20."
      }
    ],
    "description": "Speed 8.",
    "page": 36
  },
  {
    "name": "Blue Drake",
    "family": "Hill & Field",
    "level": "2",
    "hp": 34,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Shocking Bite",
        "text": "1d12+5 (ignores metal armor)."
      },
      {
        "name": "On Death",
        "text": "Deal 1d12 damage back (ignores metal armor)."
      }
    ],
    "description": "Fly 12.",
    "page": 36
  },
  {
    "name": "Griffon",
    "family": "Hill & Field",
    "level": "4",
    "size": "large",
    "hp": 50,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Talons",
        "text": "2d6+10, on hit: Grappled (escape DC 14) OR:"
      },
      {
        "name": "Fly & Drop",
        "text": "(if grappling) Fly upward 12 and release (6d6 fall damage)."
      }
    ],
    "description": "Fly 12.",
    "page": 36
  },
  {
    "name": "Roc",
    "family": "Hill & Field",
    "level": "17",
    "size": "gargantuan",
    "hp": 195,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Pluck Up",
        "text": "(Reach 4, target up to 2 creatures) 3d12+20. On hit: Grappled (escape DC 18). OR:"
      },
      {
        "name": "Crush & Drop",
        "text": "Fly upward 20 spaces, deal 20 damage to Grappled creatures, then release (10d6 fall damage)."
      }
    ],
    "description": "Fly 20.",
    "page": 36
  },
  {
    "name": "Skeleton",
    "family": "Undead",
    "level": "1/3",
    "hp": 10,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Grave Arrow",
        "text": "1d4+3 (Range 8)."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Zombie",
    "family": "Undead",
    "level": "1/2",
    "hp": 15,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Crunch",
        "text": "1d4+4. On damage: Grappled."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Ghoul",
    "family": "Undead",
    "level": "1",
    "hp": 20,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Sickening Claw",
        "text": "1d4+8. On damage: Dazed."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Specter",
    "family": "Undead",
    "level": "3",
    "hp": 30,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Deathly Touch",
        "text": "1d4. On damage: set HP to 0."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "description": "Fly.",
    "page": 37
  },
  {
    "name": "Ogre Zombie",
    "family": "Undead",
    "level": "5",
    "size": "large",
    "hp": 46,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Greatclub (2×)",
        "text": "1d4+8. On crit: Prone."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Mummy",
    "family": "Undead",
    "level": "6",
    "hp": 54,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Slam (2×)",
        "text": "1d4+8. On damage: Dazed."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Giant Zombie",
    "family": "Undead",
    "level": "8",
    "size": "huge",
    "hp": 73,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Decaying Swipe (2×)",
        "text": "1d4+10. On damage: knockback Primary Die spaces."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Wraith",
    "family": "Undead",
    "level": "10",
    "hp": 94,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Soul Rend (2×)",
        "text": "(Range 8) 1d4+10. On damage: deal 1 Wound."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "description": "Fly.",
    "page": 37
  },
  {
    "name": "Mummy Lord",
    "family": "Undead",
    "level": "21",
    "hp": 280,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Cursed Gaze",
        "text": "When crit: DC 20 INT save, or suffer 1 Wound."
      },
      {
        "name": "Scarab Swarm",
        "text": "Summon 10 scarab minions (d6) within 6 spaces. Then:"
      },
      {
        "name": "Slam (2×)",
        "text": "1d4+20. On damage: Dazed."
      }
    ],
    "familyTrait": "Unliving, Undying. The first time this dies, reset to 1 HP instead (excluding minions).",
    "page": 37
  },
  {
    "name": "Duskprowler",
    "family": "Forest Denizens",
    "level": "6",
    "size": "large",
    "hp": 70,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Illusory Aura",
        "text": "Attacks against the Duskprowler have Disadvantage 2. Damage suppresses this effect until the end of the next hero's turn."
      },
      {
        "name": "Ravage (2×)",
        "text": "2d8+2."
      }
    ],
    "page": 38
  },
  {
    "name": "Basilisk",
    "family": "Forest Denizens",
    "level": "7",
    "hp": 48,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Stone Gaze",
        "text": "Daze 1 creature within sight, then:"
      },
      {
        "name": "Envenom",
        "text": "1d8+10, advantage vs Dazed targets."
      },
      {
        "name": "Flesh to Stone",
        "text": "Creatures Dazed by the Basilisk remain so for 10 minutes. Dazed 3 times = Petrified."
      }
    ],
    "page": 38
  },
  {
    "name": "Druid",
    "family": "Forest Denizens",
    "level": "8",
    "hp": 90,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Beastshift",
        "text": "+4 speed, gain Medium armor this round. 4d4+10. OR:"
      },
      {
        "name": "Hurricane",
        "text": "(Reach 3) 4d4+10 to all enemies within reach. On damage: move targets anywhere else in Reach."
      }
    ],
    "page": 38
  },
  {
    "name": "Seedling",
    "family": "Forest Denizens",
    "level": "1/2",
    "size": "small",
    "hp": 8,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Thorn Seed",
        "text": "(Range 6) 2d6+2."
      }
    ],
    "familyTrait": "Peeling Bark. Damage degrades Armor 1 step: Heavy » Medium » None.",
    "description": "Briarbane. Armor H* (Peeling Bark).",
    "page": 38
  },
  {
    "name": "Acidpod",
    "family": "Forest Denizens",
    "level": "1",
    "size": "small",
    "hp": 8,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Caustic Eruption",
        "text": "On death: 4d6 acid damage to ALL adjacent creatures."
      },
      {
        "name": "Grab",
        "text": "DC 12 DEX save or Grappled."
      }
    ],
    "familyTrait": "Peeling Bark. Damage degrades Armor 1 step: Heavy » Medium » None.",
    "description": "Briarbane. Armor H* (Peeling Bark).",
    "page": 38
  },
  {
    "name": "Tangler",
    "family": "Forest Denizens",
    "level": "2",
    "hp": 20,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Tangle (2×)",
        "text": "(Reach 6) 1d6+2. On hit: Grappled (escape DC 12, or any fire or slashing damage)."
      }
    ],
    "familyTrait": "Peeling Bark. Damage degrades Armor 1 step: Heavy » Medium » None.",
    "description": "Briarbane. Armor H* (Peeling Bark).",
    "page": 38
  },
  {
    "name": "Rootbreaker",
    "family": "Forest Denizens",
    "level": "5",
    "size": "large",
    "hp": 50,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Slam",
        "text": "3d6+6. On crit: knockback 2."
      }
    ],
    "familyTrait": "Peeling Bark. Damage degrades Armor 1 step: Heavy » Medium » None.",
    "description": "Briarbane. Armor H* (Peeling Bark).",
    "page": 38
  },
  {
    "name": "Treant",
    "family": "Forest Denizens",
    "level": "14",
    "size": "huge",
    "hp": 170,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Enrage",
        "text": "Attack with advantage when unarmored."
      },
      {
        "name": "Slam",
        "text": "Choose twice: (Reach 3) 2d6+10. On damage: Prone."
      },
      {
        "name": "Stomp",
        "text": "Choose twice: (Hampered target) 2d6+20."
      }
    ],
    "familyTrait": "Peeling Bark. Damage degrades Armor 1 step: Heavy » Medium » None.",
    "description": "Briarbane. Armor H* (Peeling Bark).",
    "page": 38
  },
  {
    "name": "Cultist",
    "family": "Cultists/Horrors",
    "level": "1",
    "hp": 28,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Oblation of Blood!",
        "text": "If undamaged, attack self for 2 damage. Adjacent enemies are inflicted with Despair. OR:"
      },
      {
        "name": "Dreadful Blade",
        "text": "1d6+6. OR:"
      },
      {
        "name": "Blood Boil",
        "text": "(Range 12, Bloodied creature) 3d6+6."
      },
      {
        "name": "Despair",
        "text": "Disadvantage on the next attack you make this encounter."
      }
    ],
    "familyTrait": "Fanatical Zeal. While not at max HP, make all rolls with advantage. Your crits also inflict Despair. (Despair: Disadvantage on the next attack you make this encounter.)",
    "description": "Cultists.",
    "page": 39
  },
  {
    "name": "Fanatic",
    "family": "Cultists/Horrors",
    "level": "3",
    "hp": 41,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Oblation of Blood!",
        "text": "If undamaged, attack self for 2 damage. Adjacent enemies are inflicted with Despair. OR:"
      },
      {
        "name": "Whispers of Madness",
        "text": "Contested STR check or Grappled (reroll to escape, or any radiant damage); if successful, deal 3d6+6 psychic damage (cannot be Defended or Interposed against)."
      },
      {
        "name": "Despair",
        "text": "Disadvantage on the next attack you make this encounter."
      }
    ],
    "familyTrait": "Fanatical Zeal. While not at max HP, make all rolls with advantage. Your crits also inflict Despair. (Despair: Disadvantage on the next attack you make this encounter.)",
    "description": "Cultists.",
    "page": 39
  },
  {
    "name": "Doomsayer",
    "family": "Cultists/Horrors",
    "level": "5",
    "hp": 58,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Feverish Chant",
        "text": "(Concentration) Reduce all damage done to allies who can hear you to 1. OR:"
      },
      {
        "name": "Ecstatic Ravings",
        "text": "2d6 psychic damage to all enemies who can hear you."
      },
      {
        "name": "Despair",
        "text": "Disadvantage on the next attack you make this encounter."
      }
    ],
    "familyTrait": "Fanatical Zeal. While not at max HP, make all rolls with advantage. Your crits also inflict Despair. (Despair: Disadvantage on the next attack you make this encounter.)",
    "description": "Cultists.",
    "page": 39
  },
  {
    "name": "Stenchling",
    "family": "Cultists/Horrors",
    "level": "1/2",
    "size": "small",
    "hp": 18,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Bite",
        "text": "2d6."
      },
      {
        "name": "Putrid Cloud",
        "text": "On Death: 2d6 poison damage to enemies within Reach 2."
      }
    ],
    "page": 39
  },
  {
    "name": "Spiny Fiend",
    "family": "Cultists/Horrors",
    "level": "4",
    "hp": 49,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Spines",
        "text": "Melee attackers take 3 damage."
      },
      {
        "name": "Claws (2×)",
        "text": "1d6+6. OR:"
      },
      {
        "name": "Shoot Spine",
        "text": "(Range 12) 1d6+6."
      }
    ],
    "page": 39
  },
  {
    "name": "Glabrezu",
    "family": "Cultists/Horrors",
    "level": "14",
    "size": "large",
    "hp": 110,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Doomclaw (2×)",
        "text": "(Reach 2) 3d6+10. On damage: Grappled (escape DC 17). If the same creature is Grappled by both of the glabrezu's claws, it must escape from each of them separately. OR:"
      },
      {
        "name": "Tear Asunder",
        "text": "(A creature Grappled by both of the glabrezu's claws) 50 unpreventable damage. If the target is at 0 HP: DC 17 STR save or be torn in two, dying instantly."
      }
    ],
    "page": 39
  },
  {
    "name": "Giant Spider",
    "family": "Underground",
    "level": "2",
    "hp": 27,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Shoot Web",
        "text": "(Range 6) 1d8+2. On hit: Restrained (escape DC 12, or any slashing/fire damage). OR:"
      },
      {
        "name": "Bite",
        "text": "(Hampered target) 2d8+4, Poisoned (magical healing ends)."
      }
    ],
    "page": 40
  },
  {
    "name": "Ettercap",
    "family": "Underground",
    "level": "4",
    "hp": 49,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Web Garrote",
        "text": "1d8+2. On hit: Grappled (escape DC 13), Silenced until target escapes."
      },
      {
        "name": "Silenced",
        "text": "Cannot cast spells or use other abilities that require speaking (e.g. Commander's Orders)."
      }
    ],
    "page": 40
  },
  {
    "name": "Nestweaver",
    "family": "Underground",
    "level": "6",
    "size": "large",
    "hp": 54,
    "armor": "M",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Summon",
        "text": "Summon 2 spider minions (d8). Then choose 1:"
      },
      {
        "name": "Shoot Web",
        "text": "(Range 6) 1d8+2. On hit: Restrained (escape DC 12, or any slashing/fire damage). OR:"
      },
      {
        "name": "Bite",
        "text": "(Hampered target) 3d8+6 and Poisoned (magical healing ends)."
      }
    ],
    "page": 40
  },
  {
    "name": "Great Worm",
    "family": "Underground",
    "level": "16",
    "size": "huge",
    "hp": 140,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Tremor Sight",
        "text": "Advantage against creatures that moved since the worm's last turn."
      },
      {
        "name": "Crush",
        "text": "Creatures in a 2×6 area take 50 damage on a failed DC 18 DEX save. (Creatures who fail can spend 1 Action to dive out of the way instead of taking this damage. They move half their speed and land Prone.) OR:"
      },
      {
        "name": "Bite/Swallow",
        "text": "1d4+40. On crit: Swallowed."
      },
      {
        "name": "Swallowed",
        "text": "You take 20 damage at the start of your turn. Your attacks cannot miss and ignore armor."
      }
    ],
    "description": "Burrow 8.",
    "page": 40
  },
  {
    "name": "Cloaker",
    "family": "Underground",
    "level": "13",
    "size": "large",
    "hp": 110,
    "armor": null,
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Ambusher",
        "text": "Cloakers always start first and heroes roll Initiative with disadvantage."
      },
      {
        "name": "Mutual Harm",
        "text": "You take half damage from attacks while grappling a creature (they take the other half)."
      },
      {
        "name": "Wrap",
        "text": "2d10+20. On Hit: Grappled (escape DC 16). OR:"
      },
      {
        "name": "Horrifying Wail",
        "text": "DC 16 WIL save, or creatures within 6 spaces are Frightened and must spend 1 Action moving as far away as possible."
      }
    ],
    "description": "Fly 10.",
    "page": 40
  },
  {
    "name": "Umber Hulk",
    "family": "Underground",
    "level": "10",
    "size": "large",
    "hp": 70,
    "armor": "H",
    "legendary": false,
    "minion": false,
    "abilities": [
      {
        "name": "Confounding Pheromones",
        "text": "Enemies make a DC 15 WIL save at the start of their turns or Confused this turn. Gain advantage 1 on the save for each failure this encounter."
      },
      {
        "name": "Mandible & Claws (2×)",
        "text": "1d10+10 damage."
      },
      {
        "name": "Confused",
        "text": "The GM spends your next action."
      }
    ],
    "page": 40
  },
  {
    "name": "Pudge the Blunderer",
    "family": "Legendary",
    "level": "2",
    "hp": 75,
    "armor": "M",
    "saves": "STR+, INT–",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Move & Smack",
        "text": "Move 8, attack for 1d8+2. On damage: Prone."
      },
      {
        "name": "Grab & Throw",
        "text": "1d8+2, on damage: they are thrown at another hero within 6 spaces. Both make a DC 12 DEX save or take 1d8+2 damage and are knocked Prone, half damage on save."
      },
      {
        "name": "BLOODIED",
        "text": "At 37 HP, Pudge's damage increases to 1d12+2."
      },
      {
        "name": "LAST STAND",
        "text": "Pudge is dying! 20 more damage and he dies. Until then, Pudge can move 6 spaces, and use Grab & Throw each turn."
      }
    ],
    "description": "Level 2 Solo Dumb Ogre. Example legendary: for a level 2 party he has 75 HP and Medium Armor; his small attack hits for slightly less than suggested and his big attack for slightly more.",
    "page": 44
  },
  {
    "name": "Kelebek, Entomancer",
    "family": "Legendary",
    "level": "3",
    "hp": 60,
    "armor": "M",
    "saves": "INT+, WIL+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Vinelash",
        "text": "Move 6, then 2d6. On damage: move target to an unoccupied space within 10 spaces."
      },
      {
        "name": "BLOODIED",
        "text": "When Kelebek is reduced to 30 HP, Poppy always Interposes for him."
      },
      {
        "name": "LAST STAND",
        "text": "When Poppy dies, the room is filled with noxious gas: all heroes have a maximum of 2 actions each turn."
      }
    ],
    "description": "Level 3 Solo Bug Druid & His Stinky Pet (Kelebek & Poppy, a Legendary Team). After each hero's turn, choose Kelebek OR Poppy to act.",
    "page": 44
  },
  {
    "name": "Poppy, Giant Stinkbug",
    "family": "Legendary",
    "level": "3",
    "hp": 60,
    "armor": "H",
    "saves": "STR+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Stink Cloud",
        "text": "When damaged, enemies within 2 spaces make a STR save (DC equal to the higher of 10 or the damage done). On a failure, they must spend their next action vomiting, and they cannot take reactions this round."
      },
      {
        "name": "Crushing Mandibles",
        "text": "Move 6. 4d6 damage, up to 2 adjacent creatures."
      },
      {
        "name": "BLOODIED",
        "text": "When Kelebek is reduced to 30 HP, Poppy always Interposes for him."
      },
      {
        "name": "LAST STAND",
        "text": "When Poppy dies, the room is filled with noxious gas: all heroes have a maximum of 2 actions each turn."
      }
    ],
    "description": "Level 3 Solo Bug Druid & His Stinky Pet (Kelebek & Poppy, a Legendary Team). After each hero's turn, choose Kelebek OR Poppy to act.",
    "page": 44
  },
  {
    "name": "Grimbeak, the Unyielding",
    "family": "Legendary",
    "level": "3",
    "size": "large",
    "hp": 100,
    "armor": "M",
    "saves": "STR+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Brutal",
        "text": "Treat the highest die rolled as the Primary Die. On crit: knock Prone."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Savage Screech",
        "text": "(1 use) All enemies within reach 12 suffer 2d6 damage (ignoring armor). DC 11 WIL save or become Frightened for 1 round."
      },
      {
        "name": "Rend & Tear",
        "text": "Attack for 2d6+10 damage."
      },
      {
        "name": "Beak",
        "text": "Move 8. Attack for 2d6 damage."
      },
      {
        "name": "BLOODIED",
        "text": "At 50 HP, Savage Screech recharges."
      },
      {
        "name": "LAST STAND",
        "text": "Grimbeak is dying! 30 more damage and she dies. Until then, her Attacks use d10s instead of d6s."
      }
    ],
    "description": "Level 3 Solo Large Owlbear.",
    "page": 45
  },
  {
    "name": "Thorn Quickblade",
    "family": "Legendary",
    "level": "4",
    "hp": 125,
    "armor": "M",
    "saves": "DEX+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Strike Back",
        "text": "When crit, make a Heart Piercer or Stormquill attack in return."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Stormquill (Crossbow)",
        "text": "Move 4, 4d4+10 damage (Range 8)."
      },
      {
        "name": "Heart Piercer (Rapier)",
        "text": "Move 8, 2d4+3 damage. On crit: Dazed."
      },
      {
        "name": "BLOODIED: Smoke Bomb",
        "text": "At 62 HP, Thorn immediately becomes invisible (until the end of his next turn), then moves 8, ignoring opportunity attacks."
      },
      {
        "name": "LAST STAND: Mortal Panic!",
        "text": "Thorn is dying! 30 more damage and he's dead! Until then he'll Strike Back EVERY time he's hit (1/turn)."
      }
    ],
    "description": "Level 4 Solo Human Criminal.",
    "page": 46
  },
  {
    "name": "Ravager of the Lowlands",
    "family": "Legendary",
    "level": "5",
    "size": "large",
    "hp": 130,
    "armor": "M",
    "saves": "STR+, DEX+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Feral Instinct",
        "text": "Whenever Ravager is crit, he can fly 10."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Venomous Stinger",
        "text": "(1 use) Reach 3, 5d12 damage."
      },
      {
        "name": "Ravage",
        "text": "Attack for 1d12+20 damage."
      },
      {
        "name": "Claw",
        "text": "Fly 10, attack for 1d12+6 damage."
      },
      {
        "name": "BLOODIED",
        "text": "At 65 HP, his Venomous Stinger recharges."
      },
      {
        "name": "LAST STAND",
        "text": "The Ravager is dying! 40 more damage and he dies. Until then, the first time each turn he takes damage, he uses Move & Claw."
      }
    ],
    "description": "Level 5 Solo Large Manticore.",
    "page": 47
  },
  {
    "name": "Queen Aranya, Broodmother",
    "family": "Legendary",
    "level": "6",
    "size": "large",
    "hp": 160,
    "armor": "M",
    "saves": "ALL+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Weave Web",
        "text": "Creatures she hits are entangled in a sticky web (Dazed)."
      },
      {
        "name": "Flammable Webs",
        "text": "Fire critical hits suppress the Broodmother's Weave Web for 1 turn."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Impale",
        "text": "(Reach 2) 2d8+8 damage. Then skitter away up to 8 spaces."
      },
      {
        "name": "Hatch Brood",
        "text": "Summon spiderling minions (1/hero, size: d8); they act only when commanded."
      },
      {
        "name": "Dinner Time!",
        "text": "Command all of your spiderling minions to move up to 6 spaces and attack once each."
      },
      {
        "name": "BLOODIED: \"Avenge Your Queen, My Brood!\"",
        "text": "At 80 HP, summon 3 spiderling minions/hero anywhere within Reach 8."
      },
      {
        "name": "LAST STAND",
        "text": "Aranya is dying! 40 more damage and she dies. Until then, Hatch Brood after each of her turns."
      }
    ],
    "description": "Level 6 Solo Large Matriarch of Spiders.",
    "page": 48
  },
  {
    "name": "Nalzar, Apex Predator",
    "family": "Legendary",
    "level": "6",
    "size": "large",
    "hp": 180,
    "armor": "M",
    "saves": "STR+, DEX+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Tail Swipe",
        "text": "When dealt slashing or lightning damage: knock a hero within 3 spaces Prone."
      },
      {
        "name": "Torn Wings",
        "text": "Each slashing crit reduces the Wing Buffet DC by 1."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Devour",
        "text": "(Prone creatures only, Reach 2) 4d12+6."
      },
      {
        "name": "Wing Buffet",
        "text": "Fly 8, then land. Cone 8: 1d12, then DC 14 STR save or also knocked Prone (advantage if behind cover or another hero)."
      },
      {
        "name": "BLOODIED",
        "text": "At 90 HP, her Wing Buffet Range and DC increase by 2."
      },
      {
        "name": "LAST STAND",
        "text": "Nalzar is dying! 60 more damage and she dies. Until then, each turn, she moves 6, then uses Devour (ignoring the Prone requirement)."
      }
    ],
    "description": "Level 6 Solo Large Grey Drake.",
    "page": 49
  },
  {
    "name": "Florindris, Bane of the Forest",
    "family": "Legendary",
    "level": "7",
    "size": "large",
    "hp": 200,
    "armor": "M",
    "saves": "ALL+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Aura of Wind",
        "text": "Ranged attacks against you have disadvantage. End of turn: push adjacent creatures 2 spaces away."
      },
      {
        "name": "Wither",
        "text": "Resistant to necrotic damage, but it suppresses Aura of Wind for 1 turn."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Petal Storm",
        "text": "(1 use) 3d10+10 damage to all enemies within Reach 8, half on a DC 13 DEX save."
      },
      {
        "name": "Rend",
        "text": "Fly 10 before or after attacking. (Reach 2) 1d10+10 damage to up to 2 targets within reach. On hit: Gain Thornblight. (Thornblight: Suffer 5 damage for each space you are forcibly moved. Magical healing ends this effect.)"
      },
      {
        "name": "Gust",
        "text": "(Reach 8) Move a target 1d10 spaces."
      },
      {
        "name": "BLOODIED",
        "text": "At 100 HP, enemies within Reach 12 gain Thornblight, and Petal Storm recharges."
      },
      {
        "name": "LAST STAND",
        "text": "Florindris is dying! 70 more damage and she dies. Until then, Aura of Wind and Gust move creatures twice as far."
      }
    ],
    "description": "Level 7 Solo Large Floral Dragon.",
    "page": 50
  },
  {
    "name": "General Flameheart",
    "family": "Legendary",
    "level": "8",
    "size": "huge",
    "hp": 175,
    "armor": "H",
    "saves": "STR+, WIL+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Cinder Armor",
        "text": "Immune to fire. When damaged, deal 5 fire damage to all adjacent creatures."
      },
      {
        "name": "Extinguish Flame",
        "text": "Cold or radiant crits extinguish all areas ignited by Molten Fury and suppress Cinder Armor for 1 turn."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Inferno Cleave",
        "text": "Move 8 then strike a 2×2 square area for 2d10+10 fire damage."
      },
      {
        "name": "Molten Fury",
        "text": "Lob a molten fireball at the furthest hero not already in the flames, igniting a 2×2 square area. Creatures there take 2d10+10 damage; and another 10 damage at the end of each of their turns if they remain in the area."
      },
      {
        "name": "BLOODIED",
        "text": "At 87 HP, on his next turn, he uses Molten Fury a number of times equal to half the number of heroes (rounded up)."
      },
      {
        "name": "LAST STAND",
        "text": "Flameheart is dying! 80 more damage and he dies. Until then, the area of his attacks increase to a 3×3 square."
      }
    ],
    "description": "Level 8 Solo Huge Flame Titan.",
    "page": 51
  },
  {
    "name": "Vael, Undying Necromancer",
    "family": "Legendary",
    "level": "9",
    "hp": 250,
    "armor": null,
    "saves": "INT++, WIL++",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Protect Master!",
        "text": "Whenever Vael would fail a save or take 20 or more damage, he may sacrifice his Lifebinding Spirit, Bane, instead. He spends his next turn moving up to 6 spaces and summoning Bane."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, Bane attacks for 1d12+6 then Vael chooses one:"
      },
      {
        "name": "DOOM",
        "text": "(Range 12, undamaged target) DC 14 WIL save or 5d12 damage. Half on save."
      },
      {
        "name": "Veilwalker's Rebuke",
        "text": "(Range 8) 2d12+6. Double damage against those behind cover. 1/round you may swap places with them."
      },
      {
        "name": "Cruelty's Edge",
        "text": "1d4+2. On hit: DC 14 WIL save or Dazed and Frightened. Then move 6."
      },
      {
        "name": "BLOODIED",
        "text": "At 125 HP, Vael gains the reaction Shield of Cruelty. (1 time use) If Vael would be damaged, instead he may reflect that much radiant damage back at the attacker."
      },
      {
        "name": "LAST STAND: DEATH, AN OLD FRIEND",
        "text": "Vael is dying! 90 more damage and he dies. Until then, he gains Heavy Armor, the hero that most recently damaged him is reduced to 0 HP, and Bane is sacrificed into a Vengeful Spirit. It deals 1d12+6 necrotic damage to creatures within reach 3 at the end of each of his turns."
      }
    ],
    "description": "Level 9 Solo Luminary of Malice.",
    "page": 52
  },
  {
    "name": "Titan of the Deep Woods",
    "family": "Legendary",
    "level": "10",
    "size": "gargantuan",
    "hp": 240,
    "armor": "H",
    "saves": "STR+++",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Splintering Legions",
        "text": "Bludgeoning damage or any crit cause bones to splinter off and animate, forming a d10 minion."
      },
      {
        "name": "Brittle Bones",
        "text": "Resistant to piercing, vulnerable to bludgeoning."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose 1:"
      },
      {
        "name": "Devastating Strike",
        "text": "(Reach 4) 1d4+30 damage. On hit: Knockback 6."
      },
      {
        "name": "Crushing Stomp",
        "text": "Move up to 10 spaces. Deal 1d4+20 damage to up to 2 targets along the path. On hit: Prone."
      },
      {
        "name": "Beckoning Doom",
        "text": "The 2 furthest heroes make a DC 16 STR save or are moved adjacent to Titan."
      },
      {
        "name": "LAST STAND: Shattered Legion",
        "text": "At 0 HP Titan collapses into 4 skeleton minions/hero (d10 sized). If any remain, they reassemble into the Titan the next evening."
      }
    ],
    "description": "Level 10 Solo Gargantuan Skeleton.",
    "page": 53
  },
  {
    "name": "Ul'vek, Psionic Despot",
    "family": "Legendary",
    "level": "11",
    "size": "medium",
    "hp": 300,
    "armor": null,
    "saves": "INT++, WIL++, DEX+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Mind Shield",
        "text": "Whenever Ul' would fail a save or take more than 30 damage while he has a creature Dominated, he may avoid the attack instead, but all Dominated creatures come to their senses."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Dominate",
        "text": "(If no creatures are Dominated) Choose half of the heroes to suffer 2d12 psychic damage (ignoring armor). DC 15 WIL save or Dominated as well. (Dominated: Rolls are made with disadvantage while Dominated. Ul' spends your first action on each of your turns, moving, making a weapon attack, or casting a cantrip. Damage ends.)"
      },
      {
        "name": "Consume",
        "text": "(Dominated creature) Contested DEX or STR check, on success: Grappled and 6d12. Cannot be Defended or Interposed against."
      },
      {
        "name": "Control",
        "text": "Teleport 8. (Reach 8) DC 15 WIL save, force an enemy to spend one Action to make a weapon attack or cast a cantrip. On save, they attack with disadvantage."
      },
      {
        "name": "BLOODIED",
        "text": "At 150 HP gain Illusory Shift. Reaction, when attacked (1 use): Swap places with a Dominated creature, making them the new target of the attack."
      },
      {
        "name": "LAST STAND",
        "text": "Ul' is dying! 110 more damage and he dies. Until then, Dominated no longer ends on taking damage. Every hero makes a WIL save or become Dominated."
      }
    ],
    "description": "Level 11 Solo Medium Brain-Eating Aberration.",
    "page": 54
  },
  {
    "name": "Dravok, All-Seeing Tyrant",
    "family": "Legendary",
    "level": "12",
    "size": "large",
    "hp": 325,
    "armor": null,
    "saves": "INT++, WIL++",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "My plans, flawless!",
        "text": "Dravok makes all saves with +1 Advantage, attacks against him have Disadvantage."
      },
      {
        "name": "Weakness",
        "text": "Taking more than 12 piercing or slashing damage: Dravok's plans are FLAWED! (until the end of the next hero's turn.)"
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, Move 6 and then either use Eye Ray (Range 10, randomly chosen ray then choose target) OR Terrible Maw."
      },
      {
        "name": "Terrible Maw",
        "text": "Melee attack. 4d4, EVERY die can crit and is Vicious."
      },
      {
        "name": "1. Warping Ray",
        "text": "3d6. On hit: Dazed, exchange places with target."
      },
      {
        "name": "2. Petrification Ray",
        "text": "Permanently Dazed. Healing ends. (3 stacks, Petrified)."
      },
      {
        "name": "3. Terror Ray",
        "text": "5d10 psychic damage & Terrified: You are Frightened, and your screams give allies within 6 disadvantage on rolls. Ends when Dravok's plans are FLAWED."
      },
      {
        "name": "4. Gravitation Ray",
        "text": "2d6 damage. Push that many spaces. Knocked Prone on 7+."
      },
      {
        "name": "5. Charm Ray",
        "text": "DC 16 WIL save or you spend 3 Actions attacking with or moving them, 2 actions on save. (Cannot spend resources, they regain spent actions afterward.)"
      },
      {
        "name": "6. Death Ray",
        "text": "DC 16 STR save or drop to 0 HP. On save, gain 1 Wound. If a Dying creature fails this, they die."
      },
      {
        "name": "BLOODIED: To Dust!",
        "text": "At 110 HP, use Petrification Ray against every enemy. His save DC increases to 18."
      },
      {
        "name": "LAST STAND",
        "text": "Dravok is dying! 70 more damage and he dies. Until then, each turn he will move or use Warping Ray and then Devastation Beam. 2d12+20 in a 10 space long, 2 space wide line."
      }
    ],
    "description": "Level 12 Solo Large Aberration, all TEETH & EYES.",
    "page": 55
  },
  {
    "name": "Azriel, Lord of Pain & Flame",
    "family": "Legendary",
    "level": "14",
    "size": "huge",
    "hp": 320,
    "armor": "H",
    "saves": "ALL+",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "PAIN!",
        "text": "Crits against Azriel are Vicious, he deals damage equal to the crit dice back to the attacker."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose 1:"
      },
      {
        "name": "Crackling Whip",
        "text": "Move 6. (Reach 6) 3d12 damage. On hit: Grappled and pulled adjacent to Azriel (escape DC 17 STR, DEX, or until he uses the whip again)."
      },
      {
        "name": "Doom Sword",
        "text": "3d12+10 fire damage to all creatures within Reach 2."
      },
      {
        "name": "BLOODIED",
        "text": "At 160 HP, Azriel can use Crackling Whip twice each turn."
      },
      {
        "name": "LAST STAND: YES, MORE PAIN!",
        "text": "Azriel is dying! 180 more damage and he dies. Until then, EVERY hit against him is a crit."
      }
    ],
    "description": "Level 14 Solo Huge Balor Feeling Hot & Spicy.",
    "page": 56
  },
  {
    "name": "Gloomwing the Cruel",
    "family": "Legendary",
    "level": "15",
    "size": "huge",
    "hp": 320,
    "armor": "H",
    "saves": "ALL++",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Aura of Rot",
        "text": "Creatures within 6 spaces take 5 necrotic damage at the end of their turns."
      },
      {
        "name": "Light Sensitivity",
        "text": "Radiant damage suppresses Aura of Rot until the end of the next hero's turn."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose one:"
      },
      {
        "name": "Rot Breath",
        "text": "(1 use) Fly 10, then (Cone 8) DC 17 DEX save or 8d10 necrotic, half on save."
      },
      {
        "name": "Bite",
        "text": "(Reach 2) Move 6, then 3d10. On damage: Cruelty's Gift. (Cruelty's Gift: Healing is halved and Vulnerable to necrotic damage. Healing ends.)"
      },
      {
        "name": "Claws",
        "text": "(Reach 2) 3d10 slashing +10 necrotic."
      },
      {
        "name": "Tail",
        "text": "(Reach 4) 1d10, and knocked back that many spaces."
      },
      {
        "name": "BLOODIED",
        "text": "At 160 HP Gloomwing's Rot Breath recharges."
      },
      {
        "name": "LAST STAND",
        "text": "Gloomwing is dying! 150 more damage and he dies. Until then, the damage and range of his Aura of Rot is doubled."
      }
    ],
    "description": "Level 15 Solo Huge Rot Dragon.",
    "page": 57
  },
  {
    "name": "Alaric Draegoth, the Crimson Count",
    "family": "Legendary",
    "level": "16",
    "hp": 320,
    "armor": null,
    "saves": "ALL++",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Sanguine Cloak",
        "text": "(1/turn) Deal 1d10 necrotic damage whenever you are hit, the attack is reduced by this amount."
      },
      {
        "name": "Sunscorn",
        "text": "Vulnerable to radiant. After taking radiant damage, use Beguile as a Reaction, they roll with disadvantage."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, summon 1 blood bat minion (d10) within 8 spaces, then choose 1:"
      },
      {
        "name": "Ebonfang",
        "text": "Deal 1d10+15 damage, your target is considered Bloodied for 1 round. Fly 8 before or after attacking."
      },
      {
        "name": "Beguile",
        "text": "If no creature is Beguiled, Beguile a target on a failed DC 18 WIL save (w/ disadvantage if Bloodied). (Beguiled: Dazed. Cannot Defend or allow anyone to Interpose for you. Damage ends.)"
      },
      {
        "name": "Beckon & Bite",
        "text": "Move a Beguiled creature adjacent to you and bite them: 2d10+30 damage and 1 Wound."
      },
      {
        "name": "BLOODIED",
        "text": "At 160 HP, gain Mistform. Not vulnerable to radiant. Bat Decoy. Whenever Alaric would take damage, instead first swap places with a bat minion, 1/round."
      },
      {
        "name": "LAST STAND",
        "text": "Alaric is dying! 160 more damage and he dies. Until then, his Sanguine Cloak, attacks, and bats roll d20s instead of d10s."
      }
    ],
    "description": "Level 16 Solo Vampire Lord.",
    "page": 58
  },
  {
    "name": "Caerys, the Hollow Star",
    "family": "Legendary",
    "level": "20",
    "hp": 620,
    "armor": "H",
    "saves": "ALL+++",
    "legendary": true,
    "minion": false,
    "abilities": [
      {
        "name": "Ravages of Time",
        "text": "At the beginning of each round, all heroes suffer 1 Wound."
      },
      {
        "name": "Slipstream",
        "text": "3/encounter when she would suffer any negative effect she can swap places with a creature of her choice making them the target instead. All heroes recover 1 Wound."
      },
      {
        "name": "Actions",
        "text": "After each hero's turn, choose 1 not yet chosen (reset when all have been chosen):"
      },
      {
        "name": "Wormhole",
        "text": "Teleport 12. 3d20 to a creature adjacent to where you began or ended."
      },
      {
        "name": "Immensity",
        "text": "(Reach 12) DC 20 STR save (disadvantage if within Reach 4) or suffer 3d20 damage and Prone. Half on save."
      },
      {
        "name": "Glimpse Your End",
        "text": "DC 20 WIL save or DOOMED: Concentration ends, the next damage roll against you is maximized."
      },
      {
        "name": "Plasma Storm",
        "text": "Reach 6, DC 20 DEX save or 2d20 lightning and 2d20 fire damage. Half on save."
      },
      {
        "name": "Singularity",
        "text": "Reach 2, 5d20 bludgeoning damage."
      },
      {
        "name": "Almighty Push & Pull",
        "text": "(Range 12) DC 20 STR save or be launched 20 ft. into the air, repeat until the target saves. Fall damage for this attack is 1d20 for every 10 ft. fallen."
      },
      {
        "name": "BLOODIED",
        "text": "At 310 HP, Gravitational Mastery. Move ALL objects and creatures within 16 spaces anywhere else within the area. Gravitational Lensing. The hero with the most HP is marked by Caerys. She takes half damage from all sources, her mark takes the other half. This lasts until the mark drops to 0 HP."
      },
      {
        "name": "LAST STAND",
        "text": "Use Gravitational Mastery, then Caerys is dying! 200 more damage and she dies. Until then she chooses twice each turn. If still alive after 1 round: Reset Time: she resets back to full HP."
      }
    ],
    "description": "Level 20 Solo World-Ending Cataclysm. She Who Is Our Desire & End.",
    "page": 60
  }
];
