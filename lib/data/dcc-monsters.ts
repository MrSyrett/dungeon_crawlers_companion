// GENERATED FILE - do not edit by hand.
// Source: data/dcc/monsters.json - regenerate with: node scripts/build-dcc-data.mjs

import type { DccMonster } from "./dcc-types";

export const DCC_MONSTERS: DccMonster[] = [
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
        "range": "5ft range",
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
      "Pineapple Club—The Goblin starts with a pineapple attached to the end of their club, which adds +1d4 damage, but it falls off if the attack deals 3 or more HB slots of damage to the crawler.",
      "Spunk—The Goblin has an unusual, rage-filled drive to kill. Melee attacks can only remove 1 Health Bar slot from the Goblin per hit unless it's an Amazing Success or better. The Goblin attacks with a +1 bonus to damage when below full Health."
    ],
    "page": 136,
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
        "range": "60ft range; 5ft Blast radius (see Unstable Bombs)"
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
      "Unstable Bombs—These bombs have a chance to explode early, which changes the space in which it explodes to one between the intended target and the bomb bard. When using Bomb, roll a d20 to determine how far the bomb travels before it explodes. 1: 0ft; 2–4: 10ft; 5–8: 20ft; 9–12: 30ft; 13–20: 60ft."
    ],
    "page": 137,
    "source": "GM Toolkit"
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
        "range": "10ft range (only while mounted)"
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
      "Fragile Wings—Brindled vespas have large wings that can be targeted by attacks (with a –2 penalty). If it loses 1 or more HB slots this way, remove their Acid Goo attack and Flight abilities."
    ],
    "page": 140,
    "source": "GM Toolkit"
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
        "range": "20ft Line",
        "rider": "The Hoarder makes a free 20ft move during this attack."
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
      "Amalgamation—The Ball of Swine is a 15-foot-tall ball comprised of 30 Tuskling Knights (Level 4) and 30 Tuskling Courtesans (Level 5). When reduced to less than half Health it starts to unravel and the Tusklings inside become individual Mobs that must be killed to defeat the Boss. All 60 are disoriented and do not fight back; each has 0 DR and 2 HB slots remaining each with a 2 in them.",
      "Constant Momentum—The Ball of Swine can instantly change the direction it is traveling without losing speed.",
      "Snagged—The Ball of Swine can be stopped by reducing the space it has for traveling. This takes three successful checks from different crawlers using appropriate skills. When Snagged, attacks against it are made with Advantage."
    ],
    "page": 142,
    "source": "GM Toolkit"
  },
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
      "Undead Minions—A Moderate group are in the Boss Chamber. These have the same stat block as the Pack Rat, except that they deal Necrotic damage."
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
        "rider": "If a crawler does not successfully Evade, they gain the Swallowed Debuff."
      },
      {
        "name": "Heartstrings",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "100ft range, 20ft Blast radius",
        "rider": "Crawlers make a free Cha Stat Check vs Difficulty 15+F or they gain the Mesmerized Debuff."
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
      "Mesmerized—The Beloved Mimic perfectly mimics whomever the crawler loves the most. While Mesmerized, crawlers cannot attack the Mimic and must spend their 10ft Step to move towards it. Each time a crawler takes any damage, they may make an Int Stat Check vs Difficulty 15+F to remove this Debuff.",
      "Swallowed—The Beloved Mimic swallows the crawler whole. When an attack against the Mimic results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff. Swallowed crawlers take 1d8+F Acid at the end of each round, attack with Disadvantage, but the Mimic has no DR against such an attack, and Slashing attacks deal ×2 damage."
    ],
    "page": 145,
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
  }
];
