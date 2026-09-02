// GENERATED FILE - do not edit by hand.
// Source: data/dcc/monsters.json - regenerate with: node scripts/build-dcc-data.mjs

const DCC_MONSTERS = [
  {
    "source": "Core",
    "name": "Admiral Stoma",
    "role": "Neighborhood Boss",
    "size": 1,
    "tags": [
      "Insectoid"
    ],
    "level": 61,
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
      5
    ],
    "surprise": "15+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 76,
        "mod": 6
      },
      "INT": {
        "score": 41,
        "mod": 5
      },
      "CON": {
        "score": 23,
        "mod": 5
      },
      "DEX": {
        "score": 53,
        "mod": 6
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Dactyl Smash",
        "toHit": "16+F",
        "damage": "6d8+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "If a crawler loses 4+ HB slots this way, they are thrown overboard (through a window if need be)."
      },
      {
        "name": "Grappling Gun",
        "toHit": "15+F",
        "damage": "7d4",
        "damageType": "Piercing",
        "range": "50ft range",
        "rider": "Any hit crawler is pulled 15 feet toward Stoma."
      },
      {
        "name": "Boil the Air",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Fire",
        "range": "20ft Burst radius",
        "rider": "Any hit crawler gains the Scalded Debuff: Take 1d8+F at the end of each round for the next 2 rounds."
      }
    ],
    "notes": [
      "Overboard—Crawlers thrown overboard must make an Unopposed Swimming Skill Check or gain the Drowning Debuff. Make an Unopposed Climbing Skill Check to get back up. If a rope ladder is lowered, roll with Advantage."
    ],
    "page": 590,
    "flavor": "The word “shrimp” is generally an insult, describing the small and the weak. That’s because you look at shrimp the way I look at all of you: easy to crush and best when lightly poached in butter. That makes what’s about to happen all the more delicious. Admiral Stoma is a Mantis Shrimp. If you don’t know what that is, you’re about to get a first-class education in how evolution eventually equips the small to fight back. The good admiral knows precisely how you treated her kind, and she’s hellbent on revenge. Worse than that, she made herself into the most feared Pirate on the Screaming Sea by brutally murdering anyone stupid enough to be her enemy. The next dumdums on that list just broke into her quarters. It’s you. You’re the dumdums."
  },
  {
    "source": "Core",
    "name": "Ancient Cloud Dragon",
    "role": "NPC",
    "size": 7,
    "tags": [
      "Dragon"
    ],
    "level": 80,
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
    "surprise": "16+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 5,
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
        "score": 55,
        "mod": 6
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 55,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "16+F",
        "damage": "6d8+6",
        "damageType": "Piercing",
        "range": "15ft range",
        "rider": "If a crawler does not successfully Evade, they gain the Swallowed Debuff: The crawler is swallowed whole and cannot be attacked. When an attack against the Ancient Cloud Dragon results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff. Swallowed crawlers take 1d10+F Acid at the end of each round. Swallowed crawlers attack with Disadvantage vs 0 DR, and Slashing attacks deal x2 damage."
      },
      {
        "name": "Flatulence Windstorm",
        "toHit": "16+F",
        "damage": "7d8+5",
        "damageType": "Sonic",
        "range": "20ft Cone",
        "rider": "Any hit crawler is pushed back 10ft and gains the Queasy Debuff."
      }
    ],
    "notes": [
      "Flight—Ancient Cloud Dragons can move through the air as though on the ground.",
      "Named stat block for the NPC Cirrus (Antediluvian Cloud Dragon, Level 80)."
    ],
    "page": 630
  },
  {
    "source": "Core",
    "name": "Arachnid Arcanist",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 50,
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
    "evade": "15+F",
    "move": "40+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 52,
        "mod": 6
      },
      "CON": {
        "score": 33,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Butt Blast Spell",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Necrotic",
        "range": "30ft range",
        "rider": "Any hit crawler gains the But, Butt, Buu… Debuff: The crawler is marked until the end of combat. When hit by this Spell again, it becomes a different random attack Spell in every way (except range), dealing 5dX, and adding its Rank 10 Upgrade (if applicable)."
      }
    ],
    "notes": [],
    "page": 595,
    "flavor": "Arachnid Arcanists weave magic like other spiders weave webs. That’s not metaphor; they literally spew raw magic from their butts and weave it into different Spells. Arcanists weaving together can create sorcery so powerful that no lone caster could ever hope to equal it. They created the Warding Weave, a shield that supports the weight of centuries of Nude Glaber excrement, and they did it while on the tail end of a week-long drug bender. That should tell you everything you need to know about their prowess. Arachnid Arcanist Arachnid Grappler. Level 50. These Arachnids are Human from the waist up, and spider from—oh, fuck it. They’re goddamn spidertaurs. It’s an easy descriptive shortcut, but way overused: “-taur” is to monsters as “-gate” is to scandals and “-punk” is to science fiction subgenres. It’s so fashionably overused that it’s completely lost its original meaning. It means “bull” in ancient Greek. What does “bull” have to do with a half-baked half-Human, half-spider monster concept? Goddamn nothing. That’s what! Anyway, rant over. Arachnid Grapplers do what spiders do best: they immobilize prey. They make sticky webs and bear-hug you with their bulging Human arms. Hairy arms like your father’s, and most of the damage you take is knowing you’ll never be as manly as he was."
  },
  {
    "source": "Core",
    "name": "Arachnid Grappler",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 50,
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
    "move": "40+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 52,
        "mod": 6
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 33,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Grappling",
        "toHit": "16+F",
        "damage": "4d8+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Web-Shooting",
        "toHit": "15+F",
        "damage": "5d6+6",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [],
    "page": 595,
    "flavor": "He’s remarkably friendly for a spider-person, unless you’re something he wants to eat. You’re about the right size and shape of his usual prey, so… hope you make friends easily or fight giant half-spider people with ease. • Standard Success: The creature shakes off the depression enough to act normally this round. • Near Miss: −1 to all rolls this round. • Standard Fail: All rolls are made with Disadvantage this round. • Major Fail or worse: Gains the Resigned to Die Debuff: Takes 1 HB slot of damage at the end of each round until they roll a Standard Success or better."
  },
  {
    "name": "Aranaea Magnus",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Monstrous"
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
    "surprise": "12+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 12,
        "mod": 4
      },
      "INT": {
        "score": 5,
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
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Rending Leg-Claws",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Slashing",
        "range": "10ft range"
      },
      {
        "name": "Caustic Silk Spray",
        "toHit": "14+F",
        "damage": "1d8+4",
        "damageType": "Acid",
        "range": "30ft Cone (once per round)",
        "rider": "On an Evade Major Fail or worse, the target gains the Webbed Debuff (see below) and takes 1d6+F Acid at the end each round."
      },
      {
        "name": "Drop",
        "toHit": "12+F",
        "damage": "1d10+2",
        "damageType": "Bludgeoning",
        "range": "",
        "rider": "Once at start of a fight, the Aranaea Magnus can Drop when it's above the ground, landing directly below, attacking enemies it drops on and enemies adjacent to it. If the area contains Slimy Croaker slime, Aranaea Magnus slips on landing, losing 2 Health Bar slots. If Drop doesn't hit any crawlers, Aranaea Magnus is Stunned by the fall and loses all remaining Actions for the round and 1 Action next round."
      },
      {
        "name": "Paralyzing Pedipalps",
        "toHit": "14+F",
        "damage": "2d4+4",
        "damageType": "Bludgeoning",
        "range": "5ft range (once per round)",
        "rider": "On an Evade Major Fail or worse, the target gains the Staggered Debuff."
      },
      {
        "name": "Venomous Fangs",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Piercing",
        "range": "5ft range (once per round)",
        "rider": "On an Evade Major Fail or worse, the target gains the Poisoned Debuff and a −1 penalty to Evade."
      },
      {
        "name": "Web",
        "toHit": "14+F",
        "damage": "1d4+4",
        "damageType": "Bludgeoning",
        "range": "90ft range, 5ft Blast radius",
        "rider": "Any hit crawlers have Disadvantage on next Evade and can't Step until an Action is used to pull off webs."
      }
    ],
    "notes": [
      "Eight Middle Fingers to Gravity—An Aranaea Magnus can move along vertical surfaces and upside down on ceilings as though on the ground.",
      "Webbing—Aranaea Magnus Web attacks cover surfaces in the affected area when it doesn't hit a target. Entities who enter a webbed space must make a STR Stat Check or become Webbed (see above). Regardless of the result, the entity clears the space and its adjacent spaces of webs.",
      "Tangled—The Aranaea Magnus tangles easily in its own webbing. It suffers a −10 Move penalty in webbing."
    ],
    "page": 59,
    "source": "GM Toolkit",
    "flavor": "Our Boss Sense is tingling! Looks like the crawlers got themselves in a sticky situation! Aranaea Magnus is the biggest, baddest arachnid on the block, and her lair is full of the bodies to prove it. You’d think her bad attitude is the worst thing about her, but this angry spider menace has a bottomless appetite and a need to sate her hunger at all costs! If crawlers think she’s angry now, then they better not mess with her eggs: Aranaea will shred anyone who threatens her babies or the Slimy Croakers she keeps as pets."
  },
  {
    "source": "Core",
    "name": "Aurion",
    "role": "Neighborhood Boss",
    "size": 7,
    "tags": [
      "Beast"
    ],
    "level": 75,
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
      6
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "40+S",
    "dr": 8,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
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
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 50,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Mind Dirge Spell",
        "toHit": "16+F",
        "damage": "No damage",
        "range": "20ft Burst radius",
        "rider": "Any hit crawler gains the Angry Debuff: They must save at least one action to attack their nearest ally this round. After doing so, the attacker gains the Insight Buff: +2 to hit against Aurion (stackable)."
      },
      {
        "name": "Ride the Lightning Spell",
        "toHit": "16+F",
        "damage": "6d8+6",
        "damageType": "Electric",
        "range": "200ft Line",
        "rider": "Aurion can Move 200ft along with this attack. He never uses this more than once per round."
      },
      {
        "name": "Talon",
        "toHit": "16+F",
        "damage": "7d10+6",
        "damageType": "Slashing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Flight—Aurion can move through the air as though on the ground.",
      "Ducky Destruction—Every point of damage an Area of Effect Spell deals to the sea of rubber ducks (vs. an Evade of 16 and 0 DR) destroys one of them. For every 25 damage dealt, Aurion loses 1 DR for the remainder of the fight, and targets those crawlers with at least 2 attacks the following round."
    ],
    "page": 632,
    "flavor": "Instigator, manipulator, emotional parasite, and now he’s your biggest problem. You ever play that Angry Birds game that sapped the lives away from so many people on your planet? Yeah, those twitters ain’t got nothin’ on this guy. Conflict is literally his bread and butter. He eats it up, making him even more powerful."
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
    "source": "Core",
    "flavor": "Sure, dynamite is faster, but you gotta admit it’s fun watching a bunch of these guys go apeshit on something you want broken. Babababoons are pretty stupid and violent at the best of times, but these were put through a factory line and spat out with shiny chrome plating and a whole new lease on ending life."
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
    "source": "GM Toolkit",
    "flavor": "It may look fuzzy and cuddly, but if you try to pet it, you’ll lose an arm in the process. It’s a Bad Llama— kind of like a normal Llama, but bad! You want some advice? Stay away from their webs, their nests, and their eggs. Or don’t. They gotta eat, too. Purveyors of some of the most powerful drugs in the dungeon, these adorable rapscallions love two things: good music and a good buzz. Their parties are pretty lit, but don’t think they’re all fuzz and games; if you see their throats glowing red, it means they’re about to spit a fireball in your direction! Maybe you should just drop your money and make a break for it."
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
    "name": "Barflie",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Mutated Humanoid"
    ],
    "level": 4,
    "hbSlots": [
      2,
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 1,
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
        "score": 5,
        "mod": 2
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
        "name": "Backwash",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Poison",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Washed Debuff: If a Washed crawler perishes before drinking a Potion of Clarity, they will become a Barflie themselves, one that also wields all the Skills and Spells they possessed in life."
      },
      {
        "name": "Club",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Flight—Barflies can move through the air as though on the ground and hover in place."
    ],
    "page": 30,
    "source": "GM Toolkit",
    "flavor": "Prickly Pack Alley Mobs prefer pack tactics and excel in using the narrow confusing passages of the Neighborhood to isolate and annihilate unwary crawlers. Barflie Barflies are humanoids standing roughly five-and-a-half feet tall with human bodies of different shapes, sizes, and sexes. Each of them, however, has the ruby-red compound eyes and dripping proboscis of a fly. They travel in packs of one to three but mostly keep to the Sprawl. Utterly disgusting to behold and incredibly quick but clumsy fighters, they wield simple weapons like crowbars, baseball bats, and boards with nails. However, the Barflies’ true horror lies in their backwash attack: The Barflie sprays a sickly sweetsmelling mixture upon a crawler, inflicting the Washed Debuff. If the crawler perishes before drinking a Potion of Clarity, they become a Barflie themselves, one that also wields all the Skills and Spells they possessed in life. These formerly human creatures prefer to stick near bright lights and foul smells, often congregating in small groups, lapping up the latest buzz from around the dungeon. Here’s a fun fact: we only spawned a few thousand of these guys, but there’s at least three times that many now! Where’d the others come from? Watch out for their backwash attack, or you might find yourself becoming one of these tragic creatures. The upside is that you’ll be privy to all the latest buzz! The downside is you’ll be a mutated abomination, but sometimes there’s just no pleasing you people."
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
    "source": "Core",
    "name": "Big Boy Blue",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Beast"
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
      5
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 43,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 35,
        "mod": 5
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 16,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Sting",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "30ft Line",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [],
    "page": 571,
    "flavor": "The good ol’ Big Boy Blue is the largest of the jellyfish one might find floating around. They’re a little like that guy you used to know in high school who was always wearing either overalls or a jersey of some sort. The dude was like six-foot-five and pushing 300 pounds when he was a freshman. He always had a crewcut. Dad’s a trucker. Never talks. Never does his homework. He’s just always, you know, kinda there. He doesn’t mean any harm. But he’s so goddamned dumb, he does harm if you get in his way. Plus, he always has a super-hot girlfriend for some reason, but that has nothing to do with the jellyfish. Anyway, you get the point. Harmless as long as you don’t touch them. Also known as the “Death’s Welcoming Committee” Shark, the Concierge Shark is one of the fastest and most voracious of the ocean’s predators. They’ll eat anything. Anything. Even those circus peanut candy things. It’s really kind of gross. They’re attracted to the scent of blood, making them the most common death dealers of any water-themed dungeon. “Statistically speaking, the sharks can’t eat all of us.” Crawler #1,197,506, Chrissie W."
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
    "source": "Core",
    "flavor": "Do you feel the holiday joy in your bones? How about in your internal organs? Here at Big Daddy Nick’s cabin, every day is worth celebrating, but whenever he gets to protect his little slice of heaven from alien invaders, it’s just as good as Christmas morning! He’s been telling people for years that an invasion’s coming, and now that he’s finally found a group that will listen to him, he’s trained them to protect themselves and their home ever since. It might be nice if that all happened before the invasion, but honestly, I can’t tell if anything’s really changed for him."
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
    "name": "Blind Goblin Survivor",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 4,
    "hbSlots": [
      3,
      3,
      3,
      3
    ],
    "surprise": "12+F",
    "evade": "12+F",
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
        "score": 6,
        "mod": 3
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
        "name": "Blind Fighting",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "As they never look at their target when attacking, their attacks cannot be redirected (no Taunt, Catcher, or similar Skills)."
      }
    ],
    "notes": [
      "Motion Detection—If a crawler makes a Surprise Attack against a Blind Goblin Survivor, it immediately strikes back at no Action cost, and if the crawler Evades the strike back, they do so with Disadvantage.",
      "Blind—No penalties for fighting in darkness, fog, etc."
    ],
    "page": 129,
    "source": "GM Toolkit",
    "flavor": "These unlucky bastards are proof that the harvesting process is technically non-lethal. Well, at least not directly. Being a blind Mob in this dungeon is just asking to be fodder for crawlers keen on grinding to level up. But they’ve adapted, so you don’t have to feel sorry for them or anything."
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
    "source": "Core",
    "flavor": "Blister Ghouls are just so damn tenacious. This undead creature is created and unleashed into the dungeon using a device called a Ghoul Generator. There are multiple types of Ghouls and generators out there, but the bad boy that spits these suckers out is top-of-the-line. For every non-undead Mob that dies within this floor, one of the Soul Crystal-powered Ghoul Generators births a single Blister Ghoul. It’s rather unfortunate, then, that every Mob on the floor suffers from something that will eventually kill them."
  },
  {
    "source": "Core",
    "name": "Bolt Hawk",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beast"
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
    "surprise": "12+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 22,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 12,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Ride the Lightning Spell",
        "toHit": "12+F",
        "damage": "4d8+2",
        "damageType": "Electric",
        "range": "100ft Line",
        "rider": "Bolt Hawks can Move 100ft along with this attack and can use this attack every other round."
      },
      {
        "name": "Talons",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Flight—Can move through air as if on the ground."
    ],
    "page": 623,
    "flavor": "It’s a bird! It’s a plane! Nope, it really is a bird—a big damn bird with razor-sharp talons, a bad attitude, and the tendency to spontaneously erupt into a bolt of lightning whenever the fancy strikes them. Don’t piss these guys off, or you’re likely to end up flash-fried, which I suppose isn’t any worse than the other ways you’re likely to die. Notes: Flight—Can move through air as if on the ground. BUNE LIEUTENANT These small lizard-folk bear the semblance of a humanoid dragon from Earth’s mythology. They’re incredibly agile and have an innate understanding of magic that makes them versatile magic-casters. These Bunes in particular are reminiscent of the Syndicate Race that was once featured in a previous season of Dungeon Crawler World, but they have no direct ties to those of their Race outside the dungeon… or do they? Wherever a large group of Rainbow Sprites can be found, one of these lieutenants is sure to be nearby, though they tend to let the little creatures run wild unless they’re threatened or given some other reason to respond directly. Bune Lieutenant. Level 35. Bunes are a slight dragon-like people that are naturally peaceful, unless pressed into service by an overly colorful warlord disguising herself as a bright rainbow of light here to make everyone’s lives better. They now wear garishly colorful robes and serve as Rainbow Sprite-herders while attempting to enforce the new, dizzyingly colorful agenda of their leader with as much force as necessary. On second thought, go for it."
  },
  {
    "source": "Core",
    "name": "Bomb Tosser",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 38,
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
    "move": "20+S",
    "dr": "F",
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 30,
        "mod": 5
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 12,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Chomp",
        "toHit": "14+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Drop the Bomb",
        "toHit": "15+F",
        "damage": "2d8",
        "damageType": "Force",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Any crawler who fails to Evade gains the Staggered Debuff."
      }
    ],
    "notes": [],
    "page": 525
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
    "source": "Core",
    "flavor": "Don’t let the name fool you—these creatures don’t want to tell you any jokes or riddles. They’ve got a much more mouth-on approach to changing the minds of crawlers. Some claim they’re distant relations of the Gondii, but amazingly enough, no one who’s said that loudly enough for the worms to hear are around to repeat it. And if that wasn’t bad enough, it doesn’t just look like an old-school atomizer. If it has its way, when it’s finished, there’s gonna be nothing left of your head but atoms. The Brain Teasers’ lamprey-like mouths prefer the path of least resistance, but if you’ve thought to cover your ears, they’ve got no problem chewing through flesh, bone, or muscle or worming their way down your throat like that drunk girl who gave you your first French kiss. You Humans made up the phrase “mind-blowing” a while ago, and now you’ll be among the first to feel what it’s like to have your mind literally sucked out of your skull! (Don’t get upset."
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
    "source": "Core",
    "name": "Bubble Beluga",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Whale"
    ],
    "level": 46,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 31,
        "mod": 5
      },
      "INT": {
        "score": 38,
        "mod": 5
      },
      "CON": {
        "score": 29,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Air Bubble",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Force",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      },
      {
        "name": "Headbutt",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "The Bubble Beluga must be able to move 20ft in a straight line toward the target to make this attack. Any hit crawler is pushed 10 feet. If the target is a ship, all aboard must make an Unopposed Balance Skill Check or slide 5 feet toward the closest water space."
      }
    ],
    "notes": [],
    "page": 583,
    "flavor": "One of the hallmarks of a truly evolved species is cruelty. We see that all over the galaxy. You might not like it, but trust me, I’ve got a much better view of things than you do. By that measure, Bubble Belugas are one of the most evolved species you’re likely to meet! They’re not going to eat you; actually, I’m pretty sure these guys are pescatarian, and none of you look like fish. They’re hunting you for sport! I hope that makes you feel better when they use you like a volleyball until you’re reduced to a fine red paste."
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
    "source": "Core",
    "flavor": "You know that creepy, unkempt guy who lives on the corner? He doesn’t seem to have a job. Has a van. Hangs out at the park with a pair of binoculars? Yeah, you get the idea. Solitary monstrosities that never settle in a single place, Bugaboos may be found anywhere on the dungeon’s lower floors, often lying in wait for crawlers to pass by so they can jump out and… do things to them. They’ll tell you they just want to cuddle. That’s probably a lie."
  },
  {
    "name": "Bugaboo Goblin-napper",
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
    "surprise": "12+F",
    "evade": "13+F",
    "move": "30+S",
    "dr": 2,
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
        "score": 7,
        "mod": 3
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
        "name": "Cudgel",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Net",
        "toHit": "14+F",
        "damage": "1d8+3",
        "damageType": "Bludgeoning",
        "range": "20ft range, 10ft Blast radius",
        "rider": "Any hit crawler gains the Held Debuff until the end of the round."
      }
    ],
    "notes": [
      "Cautious—They travel in pairs and will not move to engage crawlers. If Surprised in combat or when one of their numbers have been killed, they retreat until they can find reinforcements."
    ],
    "page": 128,
    "source": "GM Toolkit"
  },
  {
    "name": "Bugaboo Socket-Picker",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
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
    "evade": "13+F",
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
        "name": "Hook-Knife",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains a Major Injury Debuff (a dangling eye!)."
      },
      {
        "name": "Bone Scoop",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 128,
    "source": "GM Toolkit",
    "flavor": "The willing pupils of whoever started this ocular harvest, these Bugaboos have steady hands and empty jars. While their friends handle the grabbing and dragging, these specialists harvest the parts that power the cameras."
  },
  {
    "source": "Core",
    "name": "Bune Lieutenant",
    "role": "NPC",
    "size": 3,
    "tags": [
      "Humanoid"
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
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 41,
        "mod": 5
      },
      "CON": {
        "score": 23,
        "mod": 5
      },
      "DEX": {
        "score": 37,
        "mod": 5
      },
      "CHA": {
        "score": 13,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Slashing",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Rainbow Magic—Bune Lieutenants can cast the following Spells at Rank 10, each of which has rainbow-like visual effects: Dirt Clod, Heal Critter, Hole, Magic Missile, and Shield."
    ],
    "page": 624,
    "flavor": "Bunes are a slight dragon-like people that are naturally peaceful, unless pressed into service by an overly colorful warlord disguising herself as a bright rainbow of light here to make everyone’s lives better. They now wear garishly colorful robes and serve as Rainbow Sprite-herders while attempting to enforce the new, dizzyingly colorful agenda of their leader with as much force as necessary. On second thought, go for it."
  },
  {
    "source": "Core",
    "name": "Bune Light Guard",
    "role": "NPC",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 38,
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
    "dr": 6,
    "stats": {
      "STR": {
        "score": 26,
        "mod": 5
      },
      "INT": {
        "score": 19,
        "mod": 4
      },
      "CON": {
        "score": 31,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 9,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Lightsword",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Force",
        "range": "5ft range, Armor-Piercing"
      }
    ],
    "notes": [
      "Golden Armor—This armor grants Bune Light Guard the ability to use the Wisp Armor Spell at Rank 5, once per combat."
    ],
    "page": 624
  },
  {
    "name": "Canidna",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Animal"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "30+S",
    "dr": 1,
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
        "name": "Bite",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Spike Ball",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On a Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Pack Hunting—When two or more Canidna are adjacent to a target and the target has no adjacent allies, the target makes Evade checks with Disadvantage.",
      "Desperation—Canidna only use their Spike Ball attack when cornered or when their numbers have been cut in half."
    ],
    "page": 31,
    "source": "GM Toolkit",
    "flavor": "Mirror Cat, Level 2 Don’t let their beady little eyes and adorable faces fool you—these spiky bastards have personalities as prickly as their appearance. They want you dead, and they’re not shy about how they accomplish it! These creatures use pack tactics to harry their prey and have been known to chase crawlers across half the floor rather than giving up a meal. Whatever you do, be sure never to corner a Canidna. They may curl into a ball, but rest assured, you’re the one who should be very, very afraid. And I’ll bet you thought sphinx cats couldn’t get any weirder, huh? Well, watch out, because the weird doesn’t stop with their bisected appearance. These guys don’t make their home in holes in the ground, but in holes between dimensions. They pop in and out of these spatial holes, only showing half of themselves at any given time, making them harder to kill. To make matters worse, if you don’t kill them, these things multiply exponentially."
  },
  {
    "name": "Canis Knights",
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
    "evade": "12+F",
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
        "score": 4,
        "mod": 2
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Spear",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Piercing",
        "range": "30ft range"
      },
      {
        "name": "Sword",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Slashing",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Adorable—Canis Knights are furry, petite, and canine-appearing. This makes them utterly adorable and prompts many attempts to pet them. Crawlers that encounter Canis Knights for the first time gain the Fascinated Debuff: Roll with Disadvantage during the first round of combat.",
      "Strict Adherence—Canis Knights always do precisely as directed, doing little or no thinking on their own. If given a certain schedule or patrol route to follow, they will do so to the letter without deviation. This adherence to directives leads them open to those who would exploit their established patterns and ways of doing things."
    ],
    "page": 87,
    "source": "GM Toolkit"
  },
  {
    "source": "Core",
    "name": "Cannonback Tortoise",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Reptilian"
    ],
    "level": 55,
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
    "evade": "16+F",
    "move": "10+S",
    "dr": 7,
    "stats": {
      "STR": {
        "score": 27,
        "mod": 5
      },
      "INT": {
        "score": 12,
        "mod": 4
      },
      "CON": {
        "score": 61,
        "mod": 6
      },
      "DEX": {
        "score": 65,
        "mod": 6
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Grapeshot",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Piercing",
        "range": "30ft Cone"
      },
      {
        "name": "Cannonball",
        "toHit": "16+F",
        "damage": "5d8",
        "damageType": "Bludgeoning",
        "range": "50ft range",
        "rider": "Any hit crawler is pushed 5 feet for each HB slot lost."
      },
      {
        "name": "Self-Destruct",
        "toHit": "15+F",
        "damage": "4d12",
        "damageType": "Bludgeoning",
        "range": "10ft Burst radius",
        "rider": "If the Cannonback Tortoise is reduced to 20% HB or less, it blows itself up and dies."
      }
    ],
    "notes": [],
    "page": 583,
    "flavor": "You’ve jumped on a million of these dudes in that one plumber game, haven’t you? Just hopped right up on their shells, broke their backs, and wandered away without a second thought about the families they left behind. I bet that lizard they work for ain’t offering any kind of medical, either."
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
    "name": "Cardium Clam",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Monstrous"
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
      3,
      3,
      3,
      3
    ],
    "surprise": "15+F",
    "evade": "12+F",
    "move": "0+S",
    "dr": 4,
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
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Hypersonic Pearl",
        "toHit": "15+F",
        "damage": "2d10+5",
        "damageType": "Bludgeoning",
        "range": "200ft range",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed 15ft."
      },
      {
        "name": "Explosive Pearl",
        "toHit": "15+F",
        "damage": "2d8+5",
        "damageType": "Bludgeoning",
        "range": "90ft range, 10ft Blast + 5ft Splash (see Probing Foot below)"
      },
      {
        "name": "Foot Probe",
        "toHit": "13+F",
        "damage": "1d10+4",
        "damageType": "Bludgeoning",
        "range": "10ft range (see Probing Foot below)"
      },
      {
        "name": "Heartbeat Thump",
        "toHit": "13+F",
        "damage": "1d6+4",
        "damageType": "Bludgeoning",
        "range": "30ft Burst radius"
      },
      {
        "name": "Pearl Grapeshot",
        "toHit": "15+F",
        "damage": "1d8+5",
        "damageType": "Bludgeoning",
        "range": "90ft Cone (see Probing Foot below)"
      }
    ],
    "notes": [
      "Exposed Foot—The Cardium Clam's foot extends out of its shell and becomes targetable (with a −3 penalty) during rounds in which the clam Steps or Foot Probes. It has a DR of 0 instead of 4.",
      "Probing Foot—When Foot Probe is used during a round of combat, Explosive Pearl and Pearl Grapeshot can also be used that same round, requiring Actions as usual."
    ],
    "page": 125,
    "source": "GM Toolkit",
    "flavor": "Sometimes our most beautiful enemies hit the hardest. Washed from the depths of oceans unplumbed by civilization, the Cardium Clam loathes all creatures with intelligence higher than its own. It’s here to prove that the world should never rely on brains over beauty and that all that glitters is gorgeous. Talk about toxic standards! Oops—looks like it might be your time to sleep with the fishes."
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
    "source": "Core",
    "flavor": "The Bonker is the highest-ranking commoner among the Cave Mudges. Once a member on the galactic stage, these poor fucks regressed. Hard. Probably too much TV or something. Don’t worry though. They’re still quite handy with a club and they don’t call them “bonkers” for nothing."
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
    "source": "Core",
    "flavor": "Cave Mudge culture involves elaborate drawnout contests to determine things like what job a Mudge should have, which Mudges should get married, and which Mudges are simply exiled from the caves. The Judges decide the winners of these contests, and the losers get insults that would make Gordon Ramsey jealous."
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
    "source": "Core",
    "flavor": "A former centurion brawler and metalhead, he’s killed in ways that language hasn’t even invented words for yet. This one bird army—make that air force—wears no uniform, colors, or crest. His only allegiance now is to wreaking havoc on the crawlers that dare invade his lair."
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
    "name": "Chef BoyardOoze",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Ooze"
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
    "move": "10+S",
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
        "name": "Tendril",
        "toHit": "14+F",
        "damage": "1d6+3",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On Evade Major Fail or worse, the crawler gains the Held Debuff and the Saucy Debuff: Take 1d6+F Acid at the end of each round until the combat ends."
      }
    ],
    "notes": [
      "Chef BoyardOoze leaves slick trails that add +2 Difficulty to Dexterity-based Skills.",
      "Cold Vulnerability—Attacks that do Ice damage to Chef BoyardOozes bypass DR and do ×2 damage.",
      "Heat Vulnerability—Attacks that do Fire damage to Chef BoyardOozes bypass DR and do ×2 damage.",
      "Regenerate Health—Chef BoyardOozes heals 1 Health Bar slot at the end of each round."
    ],
    "page": 62,
    "source": "GM Toolkit",
    "flavor": "It turns out that just watching mafia movies doesn’t make one a Michelin-recognized chef. Rat-kin chefs are far more interested in mobster suits and tough talk than Italian cucina povera. Half-used cans of tomato sauce sit forgotten until they go bad, then get slurped by Clurichauns who think they’re natural immune boosters. The Fairy-flavored remains turn into this sentient slurry that’s so full of preservatives it even developed rapid regeneration."
  },
  {
    "name": "Chilly Goat",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Fanged Goat"
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
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 5,
        "mod": 2
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
        "name": "Horns",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Fangs",
        "toHit": "11+F",
        "damage": "1d4+3",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Icy Aura",
        "toHit": "11+F",
        "damage": "1d6+3",
        "damageType": "Ice",
        "range": "15ft Burst radius, once every three rounds"
      }
    ],
    "notes": [
      "Already Chilly—Immune to Cold Damage.",
      "Prefers Being Chilly—Fire deals ×2 damage to Chilly Goats."
    ],
    "page": 40,
    "source": "GM Toolkit",
    "flavor": "The Mobs of the Serving Warrens are typically Rat-kin or those they’ve pressed into their service. Chilly Goat The Chilly Goats were originally created as beasts of burden on some distant snow-covered world. Their hardiness, intelligence, and adaptability made them ideal for use as mounts or pack animals. At least, it would have, if their fanged maws and rapacious appetites didn’t make them prone to devouring their riders and handlers the moment they get hungry. It’s said that only those who match their viciousness have nothing to fear from them. While their horns and fangs are certainly terrifying, the real danger lies in the icy aura they can project in moments of fear and panic. “The Chilly Goat’s Bluff” is a phrase common throughout the Syndicate. It’s a “polite” way of saying the person in front of you is most likely a cold and unfeeling fucking sociopath. Derivations and corruptions of the phrase appear in various forms throughout the galaxy (meaning your backwater planet built a whole legend around a cosmic misspelling). All of this to say, it’s probably a good time to choose how you want to die. Impaled by horns? Ripped apart by fangs? Or frozen solid? If you ask nicely, maybe you can have all three."
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
    "source": "Core",
    "name": "City Elf Mechanic",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 39,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 30,
        "mod": 5
      },
      "INT": {
        "score": 30,
        "mod": 5
      },
      "CON": {
        "score": 30,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Wrench",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Explosive Exit",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Fire",
        "range": "10ft Burst radius",
        "rider": "Any hit crawler gains the Burned Debuff. A City Elf Mechanic uses this if at 20% HB or less, and only if the crawlers outnumber them. Then the Elf dies."
      }
    ],
    "notes": [
      "See Patterns—City Elf Mechanics can see invisible entities. If crawlers are benefiting from the Tactics Skill, those effects last for only one round."
    ],
    "page": 551,
    "flavor": "City Elf Mechanics are gifted at spotting patterns. Wait, that’s too tame of a description. How about this: They’re utterly obsessed with patterns. This obsession means they can spot subtle changes at a glance. It makes repairing things incredibly easy for them, and they can often create or adapt strategies on the fly. If they study a person or group long enough, they can predict what they’ll do next with scary accuracy. The downside is these paranoid fuckers will sometimes see a conspiracy if a leaf falls wrong. If they get a wild hair up their ass and suddenly believe their underlings are working against them, they may well decide to engineer their own destruction just to be safe."
  },
  {
    "source": "Core",
    "name": "City Elf Trapper",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
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
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
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
        "score": 30,
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
        "name": "Hunting Knife",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Duck Call",
        "toHit": "15+F",
        "damage": "4d6",
        "damageType": "Sonic",
        "range": "15ft Cone",
        "rider": "Any hit crawler attracts the attention of an annoying duck, who pecks at the crawler’s ears and ankles (the crawler gains the Sore as Shit Debuff). Any attack against the duck that is not a Critical Fail kills or scares it off."
      }
    ],
    "notes": [],
    "page": 551
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
    "source": "Core",
    "flavor": "You think Jehovah’s Witnesses are persistent? Well, get a load of these crazy cultists. They train their entire lives for a chance to defend their religion, their god, and their angels, but boy, do they really suck at it! Maybe they should have gone outside for some fresh air instead of spending all that time locked in the basement, self-flagellating. That bright thing in the sky hurts their eyes, and there never seems to be enough sunscreen to go around. Immortan Joe’s War Boys look downright tan next to these pasty zealots."
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
    "name": "Cocaine Kobold",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Lizard"
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
    "surprise": "13+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
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
        "score": 6,
        "mod": 3
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
        "name": "Rock",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Enraged Debuff (from the dusting of coke)."
      },
      {
        "name": "Spear",
        "toHit": "12+F",
        "damage": "2d6+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Enraged Debuff (from the dusting of coke)."
      }
    ],
    "notes": [
      "Mounted—Cocaine Kobolds are often astride Danger Dingos, and deal +1 damage with their spears when mounted."
    ],
    "page": 96,
    "source": "GM Toolkit",
    "flavor": "These little lizards enjoy Latin music and luxury goods, but they love cocaine even more. Not to be confused with normal Kobolds, which are basically tiny dogs, Cocaine Kobolds are reptilian. Their pupils are perpetually absurdly dilated, giving them the appearance of a paranoid gecko who just realized he should have bundled his home and auto insurance."
  },
  {
    "source": "Core",
    "name": "Concierge Shark",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Beast"
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
      5
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "35+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 47,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 42,
        "mod": 5
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Feeding Frenzy—If a shark-foe drops to 50% HB or less or gains the Blood Trail Debuff, Concierge Sharks may use their Move Action to attack."
    ],
    "page": 572,
    "flavor": "These psychos are of the bite-first, ask-questions-later school of underwater diplomacy. Big Boy Blue. Level 40. The good ol’ Big Boy Blue is the largest of the jellyfish one might find floating around. They’re a little like that guy you used to know in high school who was always wearing either overalls or a jersey of some sort. The dude was like six-foot-five and pushing 300 pounds when he was a freshman. He always had a crewcut. Dad’s a trucker. Never talks. Never does his homework. He’s just always, you know, kinda there. He doesn’t mean any harm. But he’s so goddamned dumb, he does harm if you get in his way. Plus, he always has a super-hot girlfriend for some reason, but that has nothing to do with the jellyfish. Anyway, you get the point. Harmless as long as you don’t touch them. Also known as the “Death’s Welcoming Committee” Shark, the Concierge Shark is one of the fastest and most voracious of the ocean’s predators. They’ll eat anything. Anything. Even those circus peanut candy things. It’s really kind of gross. They’re attracted to the scent of blood, making them the most common death dealers of any water-themed dungeon. “Statistically speaking, the sharks can’t eat all of us.” Crawler #1,197,506, Chrissie W."
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
    "source": "Core",
    "name": "Countess Kesla",
    "role": "Neighborhood Boss",
    "size": 4,
    "tags": [
      "Undead Humanoid"
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
      5,
      5,
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
      },
      "INT": {
        "score": 28,
        "mod": 5
      },
      "CON": {
        "score": 42,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 50,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Pet Ghast Release Spell",
        "toHit": "",
        "damage": "",
        "rider": "A Ghast is released from the wall, joining the combat."
      },
      {
        "name": "Blood Boil Spell",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Necrotic",
        "range": "50ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Fatigued Debuff."
      },
      {
        "name": "Feral Bite",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "For every 2 HB slots lost to this attack, Countess Kesla heals 1 HB slot."
      }
    ],
    "notes": [
      "Blood Makes Noise—At 60% and at 20% or less HB, Countess Kesla gains 1 Action, typically to release more Pet Ghasts to save her (if she has her pendant).",
      "Pendant—A crawler may roll a melee attack with Disadvantage to cut or swipe the pendant off her neck. If she loses it, she can’t release any Pet Ghasts."
    ],
    "page": 568,
    "flavor": "Countess Kesla. Before falling prey to the curse transforming her into the Vampire she is tonight, she had lands, titles, and sycophants. Now she’s got a throne, self-control issues, and a city full of dead things on a leash. Here’s the fun part: that sparkly Soul Crystal around her throat? It’s all that’s keeping every Ghast in this charming metropolis from going completely feral. Kill her, and the whole city loses its housebroken setting. Cool opportunity if one of you ever wanted your own rotting army! ’Course, it only works when a Vampire wears it… Choices, choices."
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
    "source": "GM Toolkit",
    "flavor": "The final form before they hit the pupa stage, the Cow-Tailed Brindle Grub is finally able to defend itself, kind of like the way a toddler holding a plastic baseball bat is able to defend himself."
  },
  {
    "name": "Critical Consensus",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Zombie"
    ],
    "level": 8,
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
      5
    ],
    "surprise": "12+F",
    "evade": "12+F",
    "move": "10+S",
    "dr": 2,
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
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 4,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Slam",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Necrotic",
        "range": "5ft range",
        "rider": "Any crawler gains the Held Debuff. On an Evade Major Fail or worse, the crawler also gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Constant Hunger—As an Action, Critical Consensus devours any food it sees and heals 1d4 Health Bar slots each time it does so. In addition, Critical Consensus will single-mindedly attack any crawler with food in their Inventory, and moves twice as fast as it does so.",
      "Foodporn—The first time Critical Consensus applies the Held Debuff to each crawler, it snaps a picture and posts it in a public forum.",
      "Over-Seasoned—Food that has been oversalted will reduce Critical Consensus by 1 Health Bar slot rather than heal it.",
      "Power Boost—Critical Consensus is a Shambling Berserker and as such is more powerful in the dark—its Stat Mod to damage is quadrupled."
    ],
    "page": 69,
    "source": "GM Toolkit",
    "flavor": "Crawlers, congratulations. You took a heartfelt about love, food, and forced eugenics… and somehow made it worse. Meet the Critical Consensus! It’s a Shambling Berserker stitched together from the remains of twenty-six failed food influencers. Now in zombie form, they’re still doing what they did in life: chasing free meals and filming their own faces while they chew. Be warned: Like any social media presence, their public image isn’t who they are when no one’s looking. They’re slow and clumsy under bright light but four times more dangerous in darkness. So, give us your best duck face! Whether you emerge winner, winner, or chicken dinner, this battle will be immortalized in a blog post."
  },
  {
    "source": "Core",
    "name": "Crocodilian Clawpad",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 43,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 30,
        "mod": 5
      },
      "INT": {
        "score": 24,
        "mod": 5
      },
      "CON": {
        "score": 40,
        "mod": 5
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
        "name": "Claws",
        "toHit": "15+F",
        "damage": "4d8+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Harpoon Gun",
        "toHit": "15+F",
        "damage": "3d10",
        "damageType": "Piercing",
        "range": "50ft range",
        "rider": "Any hit crawler gains the Stiff Legs Debuff."
      }
    ],
    "notes": [
      "Ambush Predator—Any Crocodilian Clawpad that is not surprised attacks with Advantage during the first round of combat."
    ],
    "page": 613,
    "flavor": "These are the lowest-ranking members of Bandit King LaClaw’s Crocodilian Crew. Don’t get too excited, though. Just because they lack a certain professional drive doesn’t mean their prey drive is any lower. They’re not the most “book smart” creatures. Instead, their cunning is directed to removing threats and feeding themselves and their loved ones. Unfortunately for you, you’re made of meat, and they’ve got knives for hands. And even if you’re not, don’t get too cocky, not only can their bites shear through rock and some types of metal, but they’ve also been known to do it just to prove they can. Whoa! That is one sharp suit! It’s nearly as sharp as that thing’s teeth. Of course, it would be difficult to get sharper than those, buuuut you’re gonna find that out soon enough. The Death-Rollers are the more magically inclined among LaClaw’s little gang of cutthroat thieves. They heard the term “Card Sharp” once upon a time and completely misunderstood. Still, they found a way to use those fancy new skills for more than just a few card tricks. Word to the wise, if they offer you a cut? Say No. They’re not talking about their deck."
  },
  {
    "source": "Core",
    "name": "Crocodilian Deathroller",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 52,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 30,
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
        "score": 20,
        "mod": 5
      },
      "CHA": {
        "score": 41,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+5",
        "damage": "4d10+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Roll the Bones!",
        "toHit": "15+F",
        "damage": "5d10+5",
        "range": "100ft range",
        "rider": "Roll a 1d6 to determine the type of damage: 1—Electric, 2—Fire, 3—Force, 4—Ice, 5—Psychic, 6—Sonic."
      }
    ],
    "notes": [
      "Death-Roll—Any Held crawler is subjected to a violent, spinning motion the following round (as an Action) and gains the Shredded Debuff: Take 1d6+F Slashing at the end of each round until the Held Debuff is removed or the Crocodilian Deathroller is killed."
    ],
    "page": 613
  },
  {
    "source": "Core",
    "name": "Crocodilian Mob Boss",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Humanoid"
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
    "dr": 6,
    "stats": {
      "STR": {
        "score": 29,
        "mod": 5
      },
      "INT": {
        "score": 27,
        "mod": 5
      },
      "CON": {
        "score": 58,
        "mod": 6
      },
      "DEX": {
        "score": 21,
        "mod": 5
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Vicious Bite",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Harpoon Gun",
        "toHit": "15+F",
        "damage": "3d10",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Pinned to a Surface Debuff: The crawler is Held against a surface like a wall, tree, or whatever is nearby (the ground as a last resort)."
      }
    ],
    "notes": [
      "Boss’s Orders—At the beginning of each turn, the Mob Boss points out a target, and that target suffers Disadvantage on Evade Checks from the Boss’s underlings.",
      "Named stat block for the NPC Don Jackson DeVille (Crocodilian Mob Boss, Level 50)."
    ],
    "page": 577,
    "flavor": "I bet you’ve never seen a crocodile in a bowler hat before (even though I’m sure you’ve always wanted to). Well, here’s your chance! Don Jackson Deville has a reputation for violence and intimidation against those who don’t do what he says. Though he usually doesn’t have to bloody his own knuckles and teeth (Yup! He’s a biter). He’s got people for that, and they’re just as keen to hand out beatings as he is."
  },
  {
    "source": "Core",
    "name": "Crocodilian Roid-Soldier",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Humanoid"
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
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 6,
    "stats": {
      "STR": {
        "score": 39,
        "mod": 5
      },
      "INT": {
        "score": 12,
        "mod": 4
      },
      "CON": {
        "score": 28,
        "mod": 5
      },
      "DEX": {
        "score": 21,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Vicious Bite",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Harpoon Gun",
        "toHit": "15+F",
        "damage": "3d6",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Pinned to a Surface Debuff: The crawler is Held against a surface like a wall, tree, or whatever is nearby (the ground as a last resort)."
      }
    ],
    "notes": [
      "Roid Rage—Buffs have triple the effect on Roid-Soldiers."
    ],
    "page": 572,
    "flavor": "Giant Dragonfish Level 35. Crocodilians are an intelligent, thick-skinned, semi-aquatic Race. They tend not to be the sharpest tools in the shed, but they’re certainly more intelligent than their smaller cousins, the Troglodytes. They’re inclined to work as muscle or enforcers for both legitimate and not-so-legitimate organizations throughout the universe. Here they serve as border guards for the region with orders to kick ass. Who do they answer to, you ask? Wouldn’t you like to know… These things were weird lookin’ before your world ended, but now they’re just freaky! They usually eat shrimp and the like, but with you, no need to feed for the rest of the week. Oh, see that glowing thing coming out of their chin? Whatever you do, don’t head toward the light. Seriously, these glowing Satan-fish are incredibly fast, vicious, and always hungry. It’s best to give them a wide berth… buuut you can’t."
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
    "source": "GM Toolkit",
    "flavor": "These aren’t the cute, cuddly, baby-eating puppies from the land down under. No, mate. The Danger Dingo features a stronger body, sharper teeth, and a penchant for black metal bands such as Dimmyu Borgir and Satyricon. Where there are Dingoes, their Kobold Riders and slave masters usually aren’t far behind."
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
    "source": "Core",
    "flavor": "Don’t let the horns, the matted fur, the sharp teeth, and the long claws fool you; this dude is the Mayor of Redbrick Village. When not transformed into his eldritch horror form, he looks more like a normal High Elf—just a really tall one."
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
    "source": "Par",
    "flavor": "I bet you’ll need to figure out who the hell this is..."
  },
  {
    "source": "Core",
    "name": "Dirigible Gnome",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 30,
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
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 26,
        "mod": 5
      },
      "CON": {
        "score": 9,
        "mod": 3
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 10,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Gnomish Knock-Knocks",
        "toHit": "15+F",
        "damage": "4d8",
        "damageType": "Fire",
        "range": "50ft range, 10ft Blast radius +10ft Splash",
        "rider": "Any crawler who fails to Evade gains the Burned Debuff. On an Evade Amazing Success or better, this unstable fuel lands in the cockpit, detonating on the crew."
      },
      {
        "name": "Nose-Dive",
        "toHit": "15+F",
        "damage": "5d10",
        "damageType": "Bludgeoning",
        "range": "15ft Burst radius",
        "rider": "This is a last resort attack that kills the Dirigible Gnomes."
      }
    ],
    "notes": [
      "Flight—Can move through the air as if it were on the ground. They stay aloft so melee attacks are difficult."
    ],
    "page": 602
  },
  {
    "source": "Core",
    "name": "Dominic Hawthorne",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 50,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 42,
        "mod": 5
      },
      "INT": {
        "score": 23,
        "mod": 5
      },
      "CON": {
        "score": 36,
        "mod": 5
      },
      "DEX": {
        "score": 24,
        "mod": 5
      },
      "CHA": {
        "score": 52,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Chain of Woe",
        "toHit": "15+F",
        "damage": "5d10+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Sorrowful Blast",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Sonic",
        "range": "20ft Cone",
        "rider": "Any hit crawler is pushed 10 feet."
      }
    ],
    "notes": [
      "Former Vocalist—Dominic Hawthorne can cast the following Spells at Rank 5: Earworm, Hot Stuff Aura, and Panty Dropper."
    ],
    "page": 626
  },
  {
    "source": "Core",
    "name": "Doppelganger Saboteur",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
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
      5
    ],
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": "F",
    "stats": {
      "STR": {
        "score": 51,
        "mod": 6
      },
      "INT": {
        "score": 27,
        "mod": 5
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 24,
        "mod": 5
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Fist Mass",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      }
    ],
    "notes": [
      "Mass Shift—This crawler can shift their mass into any shape so long as their mass remains the same. They lose 10% of their health each time they transform.",
      "Slippery—Crawlers have Disadvantage when grappling or restraining this Doppelganger.",
      "Stat block for the crawler Shelly G (Crawler #569,892)."
    ],
    "page": 630
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
    "source": "Core",
    "flavor": "Drakes are the bungled creations of the Tiamat, Mother of Monsters. She’s known for creating all sorts of fearsome mythic monstrosities with poisonous blood. She hopes everyone forgets that she made these. Because Drake Bitches and Drake Studs do not inhabit the same caves and rarely interact with each other, they must get creative with their mating. Drake Bitches spray clouds of tiny eggs as they go about their business, and after they move on, Drake Studs come by spraying streams of tiny sperm. If you get sprayed with both, you’re fucked."
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
    "source": "Core",
    "flavor": "Just to avoid any confusion right off the bat, these creatures are not the same draconic Drakes used as mounts by any Illusionist death cults. Can you imagine the Dread Thaumaturge riding into battle on one of these? It’s ludicrous. No, these Drakes are the comic mistake of the goddess Tiamat, Mother of Monsters. She would prefer everyone forget she’s responsible for them. It was a hard time in her existence, you know? She wasn’t at her best. But she’ll probably still be pissed off if you kill too many of them."
  },
  {
    "name": "Dread Wizard Grimblegore",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 10,
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
      5
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 2,
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
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Fireball Spell",
        "toHit": "14+F",
        "damage": "2d12+4",
        "damageType": "Fire",
        "range": "80ft range, 20ft Blast radius +20ft Splash"
      },
      {
        "name": "Gloat Spell",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Sonic",
        "range": "50ft range, 10ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Muted Debuff."
      },
      {
        "name": "Jump Smash",
        "toHit": "14+F",
        "damage": "3d6+4",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Dread Wizard Grimblegore always attacks with Fireball-Fireball-Jump Smash-Jump Smash-Gloat-Gloat. Fireball is rolled with Disadvantage, so the Difficulty to Evade is reduced by 5, and crawlers get a free Evade Check against it."
    ],
    "page": 93,
    "source": "GM Toolkit",
    "flavor": "Prepare for a cutscene like you wouldn’t believe— it’s time for the crawlers to take on the big guy! Dread Wizard Grimblegore is the self-appointed overlord of Arcadia, and as far as you and me are concerned, he’s got the firepower to prove it. His interests include going for long hops on the beach, enjoying a lovely soak in swamps, and raising the dead to eviscerate his enemies—pretty standard for an amphibian-themed wizard."
  },
  {
    "name": "Dream Eaters",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Shadow"
    ],
    "level": 5,
    "hbSlots": [
      2,
      2,
      2,
      2,
      2
    ],
    "surprise": "14+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 10,
        "mod": 4
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
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "14+F",
        "damage": "2d6+2",
        "damageType": "Psychic",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Nightmares Debuff: For the remainder of the current Floor, the crawler wakes each \"morning\" with the Fatigued Debuff."
      }
    ],
    "notes": [],
    "page": 118,
    "source": "GM Toolkit"
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
    "source": "Core",
    "flavor": "These coppers keep their badges hidden until the need to flash them arises. They’re Orcs by the look of ’em, though they certainly think they’re the bee’s knees. These plainclothes Effective Detectives will follow your trail, sleuthing through the slums and sunsets of the city, all while keeping a rap sheet on you. Then, when they have enough to collar you, they do—literally."
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
    "source": "Core",
    "name": "Elven Clear-Cutter",
    "role": "NPC",
    "size": 6,
    "tags": [
      "Construct"
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
    "surprise": "12+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 7,
    "stats": {
      "STR": {
        "score": 55,
        "mod": 6
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 55,
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
        "name": "Buzzsaw",
        "toHit": "14+F",
        "damage": "4d8+6",
        "damageType": "Slashing",
        "range": "5ft Burst radius"
      },
      {
        "name": "Arm Blades",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Slashing",
        "range": "15ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Many-Armed—Elven Clear-Cutter may spend its Move Action to attack."
    ],
    "page": 552,
    "flavor": "The brainchild of some deranged City Elf Mechanic’s late-night meth binge, these contraptions are either brilliant or utterly insane. Or both. Actually, they’re definitely both. Don’t make the mistake of thinking it’s glass; that stuff is Elfium. (I know. The name’s stupid."
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
    "source": "Core",
    "flavor": "These City Elves moved up in the world—literally! They’ve been chosen by individual “angels” (known to lesser Races as Skyfowl) to serve as their personal valets, bodyguards, and handymen. As glorified perch-scrubbers, they have the distinct “honor” of living among their patrons. They’re so loyal they’re willing to die if their patron asks it of them (and their patrons almost always ask). On their own, they’re halfwits. Together? They’re ruthlessly efficient halfwits convinced there’s an afterlife reward for a life lived in service to birds that don’t give a cluck about them. Hangman’s Hawks. Level 20 Don’t haggle with a Hawk from Hangman. The other Skyfowl believe themselves superior because of who they are and who their ancestors were. They think that because they once ruled the Over City, it’s only right to lord over everyone else. Hawks are one of the most effective at murdering their foes. In the time it’s taken you to read this, they’ve probably come up with a dozen ways to kill you. Elven Enforcer These Hangman Hawks are powerful magic users, though, of course, their most powerful weapon is their long tongues, with a noose at the end, just for catching prey."
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
    "source": "Core",
    "flavor": "Like your friend Keith who won’t shut up about Crypto, the Energy Vampire wants nothing more than to drain away your life. Unlike Keith, this thing may actually manage to get something done about its longterm goals. This creature is attracted to those with high levels of mental, creative, and emotional energy, and it really wants your Mana. However, just because the Mana Points run dry doesn’t mean it’s finished. It keeps sucking until all but the very last drops of your cellular energy are stripped away. You won’t even leave behind a beautiful corpse."
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
    "source": "Core",
    "flavor": "Centuries of being cursed really does a number on the figure, doesn’t it? Fat clowns used to be the friendliest kind of clown—the sort some kids even kind of liked. The nice thing is, they kept their sense of humor after all this time—the less-nice thing? They really love eating people. Fat Clown Male Mold Lions’ manes are matted and sticky with fungal growth. Tentacles sprout out from amid the locks of hair, wriggling around their heads like a blighted halo. Though not nearly as graceful as their former dancing selves, Mold Lions are still very flexible, strong, and fast. Mold Lion. Level 15. Have you ever wanted to watch a lion dance? Me too. It’s too bad these lions lost their rhythm at the start of the cataclysm. The lions were among the first creatures to fall to the curse, transforming into horrible monsters and turning on their beloved trainer. They hold a never-ending rage in their hearts, and these lions don’t only hunt for food; they hunt to fill an aching void within."
  },
  {
    "name": "Fire-Fighter",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Minor Fire Elemental"
    ],
    "level": 3,
    "hbSlots": [
      3,
      3,
      3
    ],
    "surprise": "11+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 1,
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
        "score": 6,
        "mod": 3
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
        "name": "Firey Touch",
        "toHit": "14+F",
        "damage": "1d6+4",
        "damageType": "Fire",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Intangibility—Cannot be harmed by non-Spell damage. Contact with water will destroy this creature immediately."
    ],
    "page": 41,
    "source": "GM Toolkit",
    "flavor": "At first, you may have made the mistake of thinking this was your garden-variety floating tuft of fire. Given that it’s zooming directly at your face now, you’ve likely realized you were wrong. Congratulations! You were very wrong. The Fire-Fighter is a Fire Elemental summoned from Sheol to serve as a foot-soldier. They’re bound to serve their summoner’s orders, even after the death of their summoner. While they’re incredibly quick and doggedly persistent, they are, ironically, not particularly bright. Still, you don’t have to be the brightest bulb in the pack when you’re literally a living ball of fire. Oh, and you should probably note that normal weapons won’t have any effect on these fiery bastards."
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
    "source": "Core",
    "flavor": "Oooh, you’re gonna love this one! Station prodigy and brilliant engineer Flavisham the Tinkerer was a model employee. Used to build toy trains for Grease Gremlin kids. Tuned signal boxes by ear. Stayed late to ensure things ran on time. But the harder he worked, the more frustrated he grew with the limits of his weak, inefficient, biological form. So he set about optimizing himself. Everything worked better than ever when he started replacing parts of himself with gears and cogs, but when he got to his anterior insular cortex, man, that’s when things got fun. He started taking things apart just to see what he could build from their bits. Batteries, trains, people—they’re all components to him now."
  },
  {
    "source": "Core",
    "name": "Flesh Farrago",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Undead"
    ],
    "level": 45,
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
    "surprise": "12+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 0,
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
        "score": 101,
        "mod": 7
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
        "name": "Mushroom Stamp",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Spores",
        "toHit": "12+F",
        "damage": "3d8+2",
        "damageType": "Poison",
        "range": "15ft Burst radius",
        "rider": "Any crawler who fails to Evade gains the Woozy Debuff."
      }
    ],
    "notes": [
      "Fast-Growing—Heals 1 HB slot at the end of each round."
    ],
    "page": 593,
    "flavor": "Even larger than the Shambling Berserkers from earlier floors, they’re made from smaller and grosser body parts. They’re slower than their cousins, but they’re harder to put down. It turns out that Nude Glaber body parts still regenerate even when they’re combined into undead monstrosities. In this environment, Flesh Farragoes tend to stupidly shuffle into holes, dropping them into the Pudding Pits, so the Nude Glabers fence them into Farrago farms. Yes, farms. These things are a food source for Nude Glabers. And they’re mostly made of Nude Glaber genitals. I’m gonna let you sit with that thought while you get mauled."
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
    "source": "Core",
    "flavor": "This is it. The Big One. An ancient evil that awakened to find his people gone astray. He decided the only way to get them back on track was to remind them of who they were. Three settlements, three ways they got it wrong. Ultimately, he chose the one that had the best chance to fix the Skyfowl as a people. Now there’s only one thing in his path, and that’s you, crawler."
  },
  {
    "source": "Core",
    "name": "Frost Maidens",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Ice Fairy"
    ],
    "level": 33,
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
    "move": "30+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 9,
        "mod": 3
      },
      "INT": {
        "score": 25,
        "mod": 5
      },
      "CON": {
        "score": 10,
        "mod": 4
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Ice Shard",
        "toHit": "13+F",
        "damage": "5d8+3",
        "damageType": "Ice",
        "range": "5ft range"
      },
      {
        "name": "Ice Blast Spell",
        "toHit": "15+F",
        "damage": "3d10+5",
        "damageType": "Ice",
        "range": "20ft Cone",
        "rider": "Any hit crawler gets pushed 5ft for every 2 HB slots lost."
      }
    ],
    "notes": [
      "Thermally Biased—Frost Maidens are Immune to Ice damage and take x2 damage from Fire damage."
    ],
    "page": 603
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
    "source": "Par",
    "flavor": "“He’s big, he’s mean, he’s dressed like a walking midlife crisis, and he runs the worst country club in the universe. And folks, let me tell you… the reviews are terrible. “Once upon a time, he was just another angry primate with a plumbing problem. But after one broken toilet, two unreliable plumbers, and a fourhour wait window that they never showed up for… something inside him snapped. “He enlisted, he trained, he rose through the ranks, and now he commands an army of golf-obsessed baboons. Welcome, crawlers… to the Kong Country Club Invitational. Par:1981. Course hazards include: explosive barrels and violent primates. “Play it where it lies."
  },
  {
    "source": "Core",
    "name": "Ghommid",
    "role": "NPC",
    "size": 5,
    "tags": [
      "Undead"
    ],
    "level": 53,
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
        "score": 51,
        "mod": 6
      },
      "INT": {
        "score": 15,
        "mod": 4
      },
      "CON": {
        "score": 52,
        "mod": 6
      },
      "DEX": {
        "score": 41,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Intestinal Tentacle",
        "toHit": "15+F",
        "damage": "4d6+6",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      }
    ],
    "notes": [],
    "page": 561,
    "flavor": "What do you get when you take a bunch of monsters and a crawler or two, and put them in a blender for ten minutes on puree? Other than a great dip for nachos, you get one of these, and with its intestines hanging out. The Swiss Army Knife of undead, Ghommids are pretty much whatever I want them to be."
  },
  {
    "source": "Core",
    "name": "Giant Dragonfish",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Beast"
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
    "surprise": "14+F",
    "evade": "15+F",
    "move": "40+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 39,
        "mod": 5
      },
      "INT": {
        "score": 12,
        "mod": 4
      },
      "CON": {
        "score": 28,
        "mod": 5
      },
      "DEX": {
        "score": 21,
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
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Lure Spell",
        "toHit": "14+F",
        "damage": "No damage",
        "range": "50ft range",
        "rider": "Any hit crawler must spend actions moving until they are adjacent to the Dragonfish."
      }
    ],
    "notes": [
      "Glowing Lure—The first time each crawler would make a melee attack against the Dragonfish, if they don’t say “I don’t look at the light,” they must make an INT Stat Check. On Fail, they lose that action."
    ],
    "page": 573,
    "flavor": "Crocodilians are an intelligent, thick-skinned, semi-aquatic Race. They tend not to be the sharpest tools in the shed, but they’re certainly more intelligent than their smaller cousins, the Troglodytes. They’re inclined to work as muscle or enforcers for both legitimate and not-so-legitimate organizations throughout the universe. Here they serve as border guards for the region with orders to kick ass. Who do they answer to, you ask? Wouldn’t you like to know… These things were weird lookin’ before your world ended, but now they’re just freaky! They usually eat shrimp and the like, but with you, no need to feed for the rest of the week. Oh, see that glowing thing coming out of their chin? Whatever you do, don’t head toward the light. Seriously, these glowing Satan-fish are incredibly fast, vicious, and always hungry. It’s best to give them a wide berth… buuut you can’t."
  },
  {
    "source": "Core",
    "name": "Giant Frenzied Gerbil",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Critter"
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
    "surprise": "14+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 45,
        "mod": 5
      },
      "INT": {
        "score": 18,
        "mod": 4
      },
      "CON": {
        "score": 37,
        "mod": 5
      },
      "DEX": {
        "score": 55,
        "mod": 6
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Scratch",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Gnaw",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sepsis Debuff."
      }
    ],
    "notes": [
      "Frenzied—Frenzied Gerbils have a Step distance of 20ft instead of 10ft."
    ],
    "page": 527,
    "flavor": "This is why you don’t release your hamster into the backyard once you get bored with it. It bones some other hamster, or a mouse or whatever, then their kids are having kids, and suddenly you’ve got a whole horde of these fuzzy little psychopaths on your hands. F L O O R Well, normally they’re little. These ones grew a bit physically, I mean. Mentally, there still ain’t a lot going on in there. Good news, though! You don’t need much of a brain when all you’re trying to do is chew through someone’s throat. (And yes, I know gerbils and hamsters are technically two different things."
  },
  {
    "source": "Core",
    "name": "Giant Frenzied Gerbil (Summoned)",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Critter"
    ],
    "level": 42,
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
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 16,
        "mod": 4
      },
      "CON": {
        "score": 24,
        "mod": 5
      },
      "DEX": {
        "score": 53,
        "mod": 6
      },
      "CHA": {
        "score": 13,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Scratch",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Gnaw",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sepsis Debuff."
      }
    ],
    "notes": [
      "Frenzied—Frenzied Gerbils have a Step distance of 20ft instead of 10ft.",
      "This is the allied/summonable Level 42 version printed beside Tatera (see Royal War Horn, p. 527/533)."
    ],
    "page": 535
  },
  {
    "name": "Giant Spiders",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Beast"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "25+S",
    "dr": 1,
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
        "damage": "1d6+3",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poison Debuff."
      },
      {
        "name": "Webshot",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Bludgeoning",
        "range": "50ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Other creatures on a Giant Spider's webs move at half speed and cannot take a 10ft Step."
    ],
    "page": 51,
    "source": "GM Toolkit",
    "flavor": "Do you like spiders? Well, spend a few days running from these chunky bastards and see how you feel then. The Giant Spiders are the size of Highland heifers and excrete sticky webs as strong as steel. Their webs are awfully pretty, but they’ve claimed countless Mobs and crawlers over the years."
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
    "source": "Core",
    "flavor": "Topping the Over City charts with a sprint speed of over 35 miles per hour, here comes a circus giraffe! No, really, here it comes—you should probably move, dumbass."
  },
  {
    "source": "Core",
    "name": "Girtablullu",
    "role": "City Boss",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 80,
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
      7,
      7,
      7,
      7
    ],
    "surprise": "17+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 100,
        "mod": 7
      },
      "INT": {
        "score": 100,
        "mod": 7
      },
      "CON": {
        "score": 100,
        "mod": 7
      },
      "DEX": {
        "score": 75,
        "mod": 6
      },
      "CHA": {
        "score": 50,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Litigate Spell",
        "toHit": "17+F",
        "damage": "7d8+7*",
        "damageType": "Psychic",
        "range": "100ft range",
        "rider": "Before damage is rolled, the target has the option to \"settle\" and take the average damage of the dice (39) instead of having it rolled."
      },
      {
        "name": "Pincers",
        "toHit": "17+F",
        "damage": "6d8+7",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Tail Strike",
        "toHit": "17+F",
        "damage": "6d6+7",
        "damageType": "Piercing",
        "range": "15ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Care for an Argument?—A crawler can exploit Girtablullu’s propensity to argue. The crawler must make an INT-Opposed Deception Skill Check. On Success, Girtablullu loses 2 Actions in the following round. After this happens twice, the Boss asks for a continuance and the AI grants it, negating further use of this ability.",
      "Objection!—Once he falls to 40% HB or less, Girtablullu can yell \"Objection!\" as an Interrupt Action. One, and only one, crawler must make an INT Stat Check vs. Difficulty 22 (unless someone has a Lawyer Up Skill). On Fail, each crawler loses one Action that round. Girtablullu can do this only twice per combat. On Success, the objection is overruled by the AI, and they gain the Litigant Pro Se achievement.",
      "Poison Blood—If Girtablullu loses 2+ HB slots from a melee attack, the crawler gains the Poisoned Debuff.",
      "Professional Courtesy—Crawlers holding a legal text in one hand roll Evade Checks with Advantage."
    ],
    "page": 548,
    "flavor": "In the language of ancient Babylon, “girtablullu” literally means “scorpion-man.” That Tiamat couldn’t think of a better name for one of her eleven great poison-blooded monstrosities really says something about her. The lameness of that moniker is right up there with half the characters from Masters of the Universe. Dressed in a designer suit that costs more than you’ll ever make in your life, Girtablullu’s glasses make him almost seem Human if you ignore the whole giant scorpion part. From the venom dripping from his stinger, he’s probably going to make you wish your blood couldn’t feel pain. But those aren’t even the worst things about Girtablullu… He’s also Tiamat’s corporate lawyer."
  },
  {
    "source": "Core",
    "name": "Glimmermote Swarm",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Celestial Janitor"
    ],
    "level": 34,
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
    "dr": 0,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 22,
        "mod": 5
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
        "score": 64,
        "mod": 6
      }
    },
    "attacks": [
      {
        "name": "Fade Away",
        "toHit": "15+F",
        "damage": "4d6+6",
        "damageType": "Psychic",
        "range": "5ft range",
        "rider": "On an Evade Fail or worse, the crawler gains the rather-hard-to-remove Fading Debuff: A part of their body turns a little transparent, like it’s slowly disappearing from existence. At the end of each day that the crawler has this Debuff, replace one of their External Buffs with a +1 Evade Buff (some attacks pass through). Once all three lines are filled, the crawler fades completely out of existence at the end of the following day. This Debuff can only be removed by a priest devoted to a deity of life… or the deity itself."
      }
    ],
    "notes": [],
    "page": 594
  },
  {
    "name": "Gnawtria",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Animal"
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
    "dr": 1,
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
        "name": "Bite",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range, Armor Piercing",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [
      "Swim—Gnawtria can move through the water as though on the ground and trade water in place."
    ],
    "page": 18,
    "source": "GM Toolkit",
    "flavor": "Have you ever seen a possum mixed with a beaver and given blood-red teeth the size of small knives? You haven’t? Well, you’re in luck, because one is coming right for you! These furry little bastards are aggressive, vicious, and those teeth aren’t just for show. Their slavering teeth phase through anything that’s not made of flesh. If you value your ankles, start moving now."
  },
  {
    "name": "Gobblin' Gators",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Animal"
    ],
    "level": 2,
    "hbSlots": [
      1,
      1
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "10+S",
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
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sepsis Debuff."
      },
      {
        "name": "Tail Thrash",
        "toHit": "13+F",
        "damage": "1d8+3",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Swim—Gobblin' Gators can move twice as fast through the water as they can on the ground."
    ],
    "page": 18,
    "source": "GM Toolkit"
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
    "source": "Core",
    "flavor": "Like censored comic book profanity, the Graffiti Mimics come on as a series of seemingly random imagery, symbols, and words, but only they understand each other. Everyone and everything who isn’t another Graffiti Mimic is prey. They take no sides in the gang war. They don’t care about your nuked planet. They always had no future, written in spray paint and screamed in apathy on the stage of CBGBs, back when that was a thing."
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
    "source": "Core",
    "flavor": "The Grapples were originally created by High Elves who tried to breed the perfect slave race. Hill Giants were paired with an offshoot of the Ogrid Race before being selectively bred with Humans. The resulting Race has an iron-hard sense of purpose. However, this can be a double-edged sword, as without any input from a “superior,” these creatures begin to wonder why things are the way they are. A Grapple that questions why they take their orders from creatures half their size has the potential to be a giant problem."
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
    "source": "Core",
    "flavor": "You know ‘em. You love ‘em. It’s the old skinless wonder, the Cornet! But unlike the classic Red, this here’s a new model, because variety is the spice of life, isn’t it? Something drained these Cornets’ life-force, leaving them constantly shifting between a lethargic hibernating state and manic desperation. The very presence of warm bodies is enough to attract their attention. Although they’ve lost their sonic attack, these undead monstrosities make up for it with vicious talons and feral leaps as they desperately seek to consume anything warm. They just want a cuddle! Awww."
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
    "name": "Grimes",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Ooze"
    ],
    "level": 5,
    "hbSlots": [
      4,
      4,
      4,
      4,
      4
    ],
    "surprise": "11+F",
    "evade": "11+F",
    "move": "15+S",
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
        "score": 10,
        "mod": 4
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
        "name": "Gloop",
        "toHit": "11+F",
        "damage": "2d4+1",
        "damageType": "Acid",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Dissolving Debuff: Take 1d6+F Acid at the end of each round until the combat ends."
      },
      {
        "name": "Tendril",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "The first time during the entire combat that a Grime is killed, it splits in two. Contrary to what the AI said, they don't all split in two. Just the first. It's more fun to see their reaction to the tired trope and their faces when the second Grime is killed and it doesn't split."
    ],
    "page": 87,
    "source": "GM Toolkit",
    "flavor": "Just when you think I’d run out of things to hate, here come the Grimes! Have you ever wondered what it would be like to stick your hand in a jellyfish? Well, now you can, as these stinging buggers hide in cracks and crevices before oozing out to strike. Just when you think you’ve killed one, it splits in two! How’s that even fair? You’d better be up on your game if you’re gonna kill these things before they get out of hand. Here’s a hint: don’t go into this battle blind. Visualize a plan and see it through."
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
    "source": "Core",
    "flavor": "Grulke are what happens when evolution decides amphibians need opposable thumbs and an attitude problem. Don’t ever call a Grulke a frog—they’ll take it personally, and they’re mean bastards. They’re toads, and they know how to fight. Get on their bad side at your own peril, and watch out for their lashing tongues."
  },
  {
    "source": "Core",
    "name": "Guard Dwarf",
    "role": "Mob",
    "size": 4,
    "tags": [
      "City Guard"
    ],
    "level": 75,
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
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 60,
        "mod": 6
      },
      "INT": {
        "score": 30,
        "mod": 5
      },
      "CON": {
        "score": 60,
        "mod": 6
      },
      "DEX": {
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Stiletto",
        "toHit": "16+F",
        "damage": "7d8+6",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing"
      },
      {
        "name": "Grapple",
        "toHit": "16+F",
        "damage": "6d6+6",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      }
    ],
    "notes": [],
    "page": 605
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
    "source": "Core",
    "flavor": "I love industrial workplace safety videos. Really, I do! What a hoot. My favorite part is when they start talking about what happens if you get caught in the machinery. That’s exactly what it feels like when you encounter these guys. And then they cut off your arms and legs with a dentist’s drill welded to a tiny whistle. You get the idea. Not to worry, though, they’re pretty small. I bet you can take one. Shame they rarely travel alone."
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
    "source": "Core",
    "flavor": "Audiences came from far and wide to see one of Grimaldi’s Traveling Circus’s main attractions— Heather the Roller-Skating Bear. After a long successful career, Heather was weeks from retirement when the great cataclysm hit, ending her dreams of salmon and honey. Warped by Scolopendra’s spores, Heather is now a monstrous mockery of her old self— but if you look real close, you might see a glimpse of the real Heather and feel her shame and sorrow."
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
    "source": "Core",
    "flavor": "This overgrown lunch-bucket of a Dwarf looks like he just stuck a fork in an electric socket. His black hair frizzes out every which way, and smoke drifts from a dark cigar stuffed between his lips. Have you ever seen a half-roasted marshmallow? The top is kinda charred, like it was just on fire, the rest is brown, and the whole thing smells like burnt sugar? Yeah, that’s Hector."
  },
  {
    "name": "Hide-Hitter Crib Daddy",
    "role": "Neighborhood Boss",
    "size": 4,
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
    "evade": "14+F",
    "move": "30+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 7,
        "mod": 4
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
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Pocket Groove",
        "toHit": "14+F",
        "damage": "2d6+3",
        "damageType": "Psychic",
        "range": "5ft range (requires drumsticks)",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Woozy Debuff."
      },
      {
        "name": "Downbeat",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Sonic",
        "range": "30ft Burst radius (requires drumsticks)",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Fatigued Debuff."
      },
      {
        "name": "Stick-Click",
        "toHit": "14+F",
        "damage": "1d6+4",
        "damageType": "Bludgeoning",
        "range": "30ft range (requires drumsticks)",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stuck Debuff: The crawler cannot perform Interrupt Actions until the combat ends."
      }
    ],
    "notes": [
      "Smelly—Any crawler melee attack that results in an Amazing Success or better gets splashed with his musk and blood, gaining the Sepsis Debuff.",
      "Bodies Hit the Floor—While the Crib Daddy wields drumsticks, Trash Princesses who start a round within 10ft of him gain a 1d4 damage bonus to their attacks, but must roll a 1d6 if any other Trash Princesses are within range. On a roll of 1, she targets the nearest trash princess instead of a foe.",
      "Daddy's Princesses—The Crib Daddy is immune to damage from trash princess Area attacks.",
      "Hide-Hitter—The Crib Daddy's drum kit functions as a weapon rack. When he is within 15ft of it, he is never unarmed unless fully incapacitated. If he is disarmed, he immediately gains another weapon. He favors drumsticks and can't use Pocket Groove, Downbeat, or Stick-Click without them. If he loses his drumsticks, he picks up one of the following weapons: club (1d6+3, 5ft range), throwing dagger (1d4+4, 50ft range), or spear (1d8+3, 10ft range). The drum kit is immune to damage but can be picked up with a successful STR Stat Check with Difficulty 13+F. If it's not in a crawler's Inventory, it's always the item a Scat Thug steals."
    ],
    "page": 27,
    "source": "GM Toolkit",
    "flavor": "Surrounded by his troop of Scat Thugs, the HideHitter Crib Daddy knows how to keep things chill. A good rhythm section lays down any tune, and with the Hide-Hitter Crib Daddy leading the battle on the drums, you’re in for a screaming, steaming good time. Crib Daddies are masters of improvisation, unexpected timing, and ferocious violence. Their large claws are excellent for beating drums and cracking skulls. Their battle music inspires their Trash Princess fangirls to ignore their wounds and keep fighting. Attacking the Hide-Hitter Crib Daddy sends his troops into a frenzy, often leading to unexpected side effects."
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
    "source": "Core",
    "flavor": "Hobgoblins are usually a rowdy, explosive bunch, but every group has buzzkills. Those folks who turn up to the party, complaining that the music’s too loud and reminding everyone that we’re all going to die. That’s the Hobgoblin Mortuary Assistant to a tee. These Debbie Downers do the grunt work involved with post-life care, from cleaning out corpses to digging holes and saying prayers. They’re usually pretty tame, unless you get in the way of their work, in which case they’re more than happy to add you to the corpse cart."
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
    "source": "Core",
    "flavor": "Under Tucker is the kindly leader of the Mournewicks. He’s a wiz at funerals, eulogies, and inhumation and knows all sorts of different culture’s funerary traditions. This guy is genuinely concerned about his family, too! You probably want to get his card because… let’s face it… One of you might need his services soon."
  },
  {
    "name": "Homogenous Humors",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Aberration"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "13+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 6,
        "mod": 3
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
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Evil Eye",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Necrotic",
        "range": "50ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Fatigued Debuff."
      }
    ],
    "notes": [
      "Flight—Homogenous Humors can move through the air as though on the ground and hover in place.",
      "If two or more of these Mobs are within 5ft of each other, they will merge into a single larger creature. This merged form gains +1 to hit and +1 damage die for each additional creature that merged into it."
    ],
    "page": 32,
    "source": "GM Toolkit"
  },
  {
    "source": "Core",
    "name": "Human Gunslinger",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 37,
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
    "surprise": "18+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
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
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 31,
        "mod": 5
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Punch",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "NES Zapper",
        "toHit": "15+F",
        "damage": "4d8",
        "damageType": "Force",
        "range": "40ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Stat block for the crawler Renato Martin (Crawler #7,329,912)."
    ],
    "page": 557
  },
  {
    "source": "Core",
    "name": "Human Swashbuckler",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 37,
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
    "dr": 5,
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
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 31,
        "mod": 5
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Saber",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Blunderbuss",
        "toHit": "15+F",
        "damage": "4d8",
        "damageType": "Piercing",
        "range": "25ft Cone",
        "rider": "Any crawler who fails to Evade gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Stat block for the crawler Jerry Madd (Crawler #7,329,880)."
    ],
    "page": 557
  },
  {
    "source": "Core",
    "name": "Igneous",
    "role": "NPC",
    "size": 5,
    "tags": [
      "Earth Elemental"
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
      5
    ],
    "surprise": "15+F",
    "evade": "14+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 34,
        "mod": 5
      },
      "INT": {
        "score": 21,
        "mod": 5
      },
      "CON": {
        "score": 27,
        "mod": 5
      },
      "DEX": {
        "score": 19,
        "mod": 4
      },
      "CHA": {
        "score": 15,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Stones Throw",
        "toHit": "14+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "30ft range"
      },
      {
        "name": "Rocky Rumble",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler is pushed 5 feet for every HB slot lost."
      }
    ],
    "notes": [
      "Hot Stuff—When a crawler adjacent to an Igneous makes two attacks in a round, they take 1d10+F Fire damage."
    ],
    "page": 562
  },
  {
    "name": "Jacked Kangaroo",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Animal"
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
    "surprise": "12+F",
    "evade": "12+F",
    "move": "25+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
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
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Kick",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed 15ft."
      },
      {
        "name": "Punch",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Tail Whip",
        "toHit": "14+F",
        "damage": "1d10+4",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [],
    "page": 97,
    "source": "GM Toolkit",
    "flavor": "Who needs cardio when you’ve got legs like these! The Jacked Kangaroo is a vicious, albeit vain, closecombat fighter. Easily distracted by mirrors and lower limb-based flattery, Jacked Kangaroos are especially dangerous to those who dare to go at them—ahem—toe-to-toe."
  },
  {
    "name": "Jazmanian Devil",
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
    "surprise": "11+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
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
        "score": 6,
        "mod": 3
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Wrist Weight",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Sweatband",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Muted Debuff."
      },
      {
        "name": "Kick",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Lunge",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "10ft range"
      }
    ],
    "notes": [
      "Hard Fighting—Each time a crawler kills a Jazmanian Devil, they gain the Fatigued Debuff."
    ],
    "page": 98,
    "source": "GM Toolkit",
    "flavor": "These passionate dancing and fitness fashionistas know all the moves and aren’t afraid to use them! A hearty combination of a carnivorous Earth marsupial and the old ladies who gather on weeknights to work their jazzy moves, the Jazmanian Devil may look ridiculous, but their fighting style is relentless— because their cardio is just so good. While their high kicks and hip thrusts might draw most of your attention, the real danger comes in the form of vicious blows from their hand- and ankle-weights."
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
    "source": "Core",
    "flavor": "The Jikininki are essential to the Iron Tangle. Without these ghouls, the entire place would be awash with blood and body parts, not to mention all the other kinds of garbage left behind. Whether it’s pushing a broom or devouring a corpse (or a soon-to-be corpse), these ghouls make sure the Tangle stays neat and tidy."
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
    "source": "Core",
    "flavor": "Just because you put a ghoul in a polo doesn’t mean he’s any less repulsive or single-minded. Actually, given that the polo is the most single-minded article of clothing Humans ever made, I think this might be a match made in corporate hell. To be frank, I’m surprised they haven’t taken the polos off yet—it’s literally the only thing distinguishing them from normal janitors on this floor. Anyway, stay clear when they clean up messes or when they take their supplements, and you should be alright."
  },
  {
    "source": "Core",
    "name": "Juvenile Octo-Shark",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Beast"
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
    "surprise": "13+F",
    "evade": "15+F",
    "move": "25+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 43,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 35,
        "mod": 5
      },
      "DEX": {
        "score": 25,
        "mod": 5
      },
      "CHA": {
        "score": 16,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Tentacle",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      }
    ],
    "notes": [],
    "page": 572,
    "flavor": "Ah, the babies. Here’s the thing about Octo Octo-Shark babies. The odds are stacked against them from the get-go. There’s just too many of them. Their mom is really strict and won’t let them leave her mouth. They don’t know who their daddies are, which makes them kinda sad, especially around Christmas. They need constant nourishment. So when food does arrive, they have to fight for their morsels. Only the stron strongest survive. Eventually, even their broodmother won’t be able to keep up with the demand. That’s right around the time the juveniles start to realize their brothers and sisters are also delicious. In each birthing of 2 2-3,000 pups, only one or two survive."
  },
  {
    "source": "Core",
    "name": "Kensington",
    "role": "Borough Boss",
    "size": 6,
    "tags": [
      "Tree",
      "Feral"
    ],
    "level": 69,
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
      6,
      6
    ],
    "surprise": "16+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 60,
        "mod": 6
      },
      "INT": {
        "score": 51,
        "mod": 6
      },
      "CON": {
        "score": 54,
        "mod": 6
      },
      "DEX": {
        "score": 24,
        "mod": 5
      },
      "CHA": {
        "score": 102,
        "mod": 7
      }
    },
    "attacks": [
      {
        "name": "Branch Manager",
        "toHit": "16+F+F",
        "damage": "6d10+6+F",
        "damageType": "Bludgeoning",
        "range": "100ft range",
        "rider": "On an Evade Major Fail or worse, the crawler falls into a deep depression and can do nothing but stare blankly into the abyss until the end of the current round."
      },
      {
        "name": "Putrid Pear",
        "toHit": "15+F+F",
        "damage": "5d6+5+F",
        "damageType": "Necrotic",
        "range": "100ft range, 10ft Blast radius +10ft Splash",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Sepsis Debuff."
      }
    ],
    "notes": [
      "So Tragic—Crawlers wearing goth clothing have Resistance to the Branch Manager attack, because they’re already depressed.",
      "The Tower—Kensington’s own Area Attack causes damage to the tower (marble flakes with each hit). Dealing 100 total damage brings the tower down; Kensington falls in slow motion, then lands and takes 12d10 damage.",
      "Feral—All to-hit and damage values include an extra +F (included above).",
      "Aura of Despair—All creatures within 100 feet gain the Despondent Debuff: at the beginning of each round each crawler makes a CHA Stat Check at Difficulty 22. Amazing Success: act normally and grant an ally a Standard Success. Standard Success: act normally. Near Miss: -1 to all rolls this round. Standard Fail: Disadvantage on all rolls this round. Major Fail or worse: gains the Resigned to Die Debuff (1 HB slot damage at the end of each round until a Standard Success or better; dropping from 10% to 0% this way is instant death)."
    ],
    "page": 600,
    "flavor": "Originally, the Boss of this quadrant was a pustule-ridden demon-lord of darkness, yadda-yadda-yadda. Really fucking tough, but admittedly a little uninspired. Then this thing showed up out of the Nothing and killed that Boss without so much as rustling a twig. Such a more entertaining Boss fight. Let’s get to it! Even I don’t know Kensington’s full story, but it must be truly tragic, for he radiates such despair. He’s like Eeyore to the nth degree, an infinite abyss of anguish making everyone around him miserable… kind of like your mother-in-law."
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
    "source": "Core",
    "flavor": "King Ghiduckrah is a colossal three-headed draconic waterfowl that shoots lightning, and he’s here to beat down the enemies of Tiamat! (That’s you.) 6 6 6 6 6 6 6 6 6 57% 63% 68% 73% 78% 84% 89% 94% 100% Look, Tiamat kind of went on a drug-fueled bender after the death of her consort, and her first behemoth creations weren’t exactly the kind that got carved into cuneiform tablets, okay? Plus, there’s a big learning curve when it comes to designing poison-blooded mythological beasts. Lots of prototypes and rough drafts that get discarded before you end up with an Ushumgallu or a Kusarikku. So please have a little grace and understanding of the process while King Ghiduckrah zaps you until you’re crispy and then smashes you into a bloody paste. It’s not his fault he’s so ill-conceived. Wait, did someone mention poison blood? It’s kind of off-theme for an electrical dragon-duck, but I dare you to complain to Tiamat about it."
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
    "name": "Laminak Rev-Up Consultant Manager",
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
    "surprise": "13+F",
    "evade": "13+F",
    "move": "45+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 6,
        "mod": 3
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
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Magic Missile Spell",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Force",
        "range": "90ft range"
      },
      {
        "name": "Scream",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Sonic",
        "range": "15ft Burst radius",
        "rider": "Crawlers make free CHA Stat Checks to avoid this attack (cannot Evade)."
      }
    ],
    "notes": [
      "\"Natural\" Immunity—Laminaks are immune to all damage-dealing Debuffs.",
      "Flight—Laminaks are fairies with wings. They can move through the air as though on the ground and hover in place."
    ],
    "page": 108,
    "source": "GM Toolkit",
    "flavor": "The second tier of the Rev-Up empire, these Laminak consultants don’t need to speak to a manager. They are the managers. They run their business with brutal efficiency."
  },
  {
    "name": "Literal Murder Hornets",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Insect"
    ],
    "level": 2,
    "hbSlots": [
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "25+S",
    "dr": 1,
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
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Stinger",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poison Debuff."
      }
    ],
    "notes": [
      "Flight—Literal Murder Hornets can move through the air as though on the ground and hover in place."
    ],
    "page": 52,
    "source": "GM Toolkit",
    "flavor": "A few seasons back, this crawler, a real big shot from one of the guilds, suddenly stopped talking and fell face down into her soup. There was a big freakin’ stinger sticking out the back of her neck. Then a giant wasp twenty yards behind her flew off with a creepy smile on its face. It was metal AF. If one of these wretched things gets on your tail, it’ll do everything possible to bring you down, so make sure you strike first."
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
    "source": "Core",
    "flavor": "These huge brains have googly eyes whipping around their lobes, which they often tangle into knots. The sight is either hilarious, horrifying, or both. Either way, it’s memorable."
  },
  {
    "name": "Lost Souls",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "12+F",
    "evade": "12+F",
    "move": "10+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 4,
        "mod": 2
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
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Bump",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Muttering",
        "toHit": "12+F",
        "damage": "1d4+2",
        "damageType": "Sonic",
        "range": "15ft Burst radius",
        "rider": "Any hit crawler confuses the party, reducing the Time to Floor Collapse by 1d2 hours."
      }
    ],
    "notes": [],
    "page": 119,
    "source": "GM Toolkit"
  },
  {
    "source": "Core",
    "name": "Lusca",
    "role": "City Boss",
    "size": 8,
    "tags": [
      "Octo-Shark"
    ],
    "level": 82,
    "hbSlots": [
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8,
      8
    ],
    "surprise": "15+F",
    "evade": "16+F",
    "move": "50+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 177,
        "mod": 8
      },
      "INT": {
        "score": 24,
        "mod": 5
      },
      "CON": {
        "score": 158,
        "mod": 8
      },
      "DEX": {
        "score": 50,
        "mod": 6
      },
      "CHA": {
        "score": 25,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Rush",
        "toHit": "18+F",
        "damage": "6d8+8",
        "damageType": "Bludgeoning",
        "range": "50ft Line",
        "rider": "Crawlers adjacent to Lusca can spend an Action as an Interrupt to make a STR Stat Check when Lusca does a Rush attack. On Success, they move with Lusca and have Advantage on their next attack. On Fail, the crawler does not move with her (and may be in the Line path)."
      },
      {
        "name": "Bite",
        "toHit": "18+F",
        "damage": "5d10+8",
        "damageType": "Piercing",
        "range": "15ft range",
        "rider": "Any hit crawler ends up in Lusca’s ginormous mouth, and gains the Fish Food Debuff: Take 1d12+F Piercing at the end of each round. Interior attacks are vs. 0 DR."
      },
      {
        "name": "Flipper",
        "toHit": "18+F",
        "damage": "6d10+8",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "Any hit crawler slides 5ft for each HB slot lost."
      }
    ],
    "notes": [
      "Mouth Sores—If any crawler deals 3+ HB slots of damage to Lusca in one shot, the juvenile sharks cause Lusca to lose 1 HB slot at the end of each round, and the Fish Food Debuff is removed."
    ],
    "page": 580
  },
  {
    "source": "Core",
    "name": "Lutin Bounty Hunter",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 44,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 27,
        "mod": 5
      },
      "INT": {
        "score": 35,
        "mod": 5
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 20,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Knife",
        "toHit": "15+F",
        "damage": "5d4+5",
        "damageType": "Piercing",
        "range": "5ft range, Armor-Piercing"
      },
      {
        "name": "Repeating Crossbow",
        "toHit": "15+F",
        "damage": "5d8",
        "damageType": "Piercing",
        "range": "60ft range",
        "rider": "A Lutin Bounty Hunter may use their Move Action to attack a second time in the same round, but may only do this every other round."
      }
    ],
    "notes": [
      "Buff Dudes—A Lutin Bounty Hunter can cast a Spell to give half of them a +1 Buff to one of the following values: Attack, Damage, or Evade."
    ],
    "page": 614,
    "flavor": "What, never seen a Lutin before? These scrappy little guys are Hobgoblins from French folklore, but they look more like a cross between Gnomes and small Elves. Fun fact: the females are called Lutines, because why the hell not? Despite their small stature, these guys sure pack a wallop."
  },
  {
    "source": "Core",
    "name": "Lutin Priest",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 50,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 35,
        "mod": 5
      },
      "CON": {
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 40,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Unarmed Combat",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Even Buffer Dudes—A Lutin Priest can cast a Spell to give themselves and a Weak group of their party a +1 Buff to any two of the following Checks: Attack, Damage, or Evade.",
      "Spell Bound—Lutin Priests know the following Spells at Rank 10: Heal Others, Holy Aura, Smite, Shield, and Turn Undead."
    ],
    "page": 614,
    "flavor": "This is a Lutin of the cloth. You may notice that the cloth is very red, that’s because of the massive amount of heathen blood they’re walking through most days. These guys tend to talk more than they hit, but they can throw some serious magic around. Word of Advice: If they start making sense, run. They’re adept at enchantment magic. Almost as adept as they are at enhancing their own bodies. Ever gotten your ass beat by a priest half your size? If you don’t wanna find out, maybe try praying on your knees. It won’t stop them, but at least you can look the little guys in the eye when they blow up your head."
  },
  {
    "source": "Core",
    "name": "Male Thorny Devil",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Reptile"
    ],
    "level": 34,
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
    "surprise": "13+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 6,
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 6,
        "mod": 3
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
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Chomp",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Walking Pincushion",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Spikes All Over—On a melee attack Near Miss Fail against this Mob, the crawler takes 2d6+F Piercing damage. Add 1 die for each degree of Failure worse than that."
    ],
    "page": 538,
    "flavor": "These poky fuckers are pretty common in desertthemed worlds. They’re big and fast and dumb and angry. Their bodies are covered in defensive spikes, which begs the question: How did something so big develop such a defense mechanism in the first place? These guys tend to have a reverse-harem thing going on. Odds are good you’ll recognize the queen when you see her. Odds are even better she’ll be the last thing you ever see."
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
    "source": "Core",
    "name": "Mellow Surfer",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Human"
    ],
    "level": 36,
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
    "evade": "16+F",
    "move": "20+S",
    "dr": "F",
    "stats": {
      "STR": {
        "score": 20,
        "mod": 5
      },
      "INT": {
        "score": 16,
        "mod": 3
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
        "score": 22,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "High Five",
        "toHit": "152+F",
        "damage": "5d4+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 525
  },
  {
    "name": "Melon-Baller Marvin, Head Bugaboo Socket-Picker",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Unique Humanoid"
    ],
    "level": 11,
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
    "move": "30+S",
    "dr": 2,
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
        "name": "Melon-Baller",
        "toHit": "14+F",
        "damage": "3d4+3",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains a Major Injury Debuff (a dangling eye!)."
      },
      {
        "name": "Bone Scoop",
        "toHit": "13+F",
        "damage": "3d6+3",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 130,
    "source": "GM Toolkit"
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
    "name": "Mick Moran, Hulking Crockodilian Chef",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Humanoid"
    ],
    "level": 12,
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
      5
    ],
    "surprise": "14+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
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
        "name": "That's a Knife",
        "toHit": "15+F",
        "damage": "3d8+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      },
      {
        "name": "Thunderstrike",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Electric",
        "range": "40ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Shocked Debuff."
      }
    ],
    "notes": [
      "For Those About To Rock—The party is prevented from taking more than one Action until Mick has directly engaged them in combat. Once Mick has attacked any of the crawlers, this effect dissipates.",
      "Water Scarcity—Water-based attacks do extra damage to Mick, and partial immersion in water disables his Thunderstrike attack. When totally submerged in water he becomes nearly comatose with fear and will die if left that way as he never learned to swim."
    ],
    "page": 103,
    "source": "GM Toolkit"
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
    "source": "Core",
    "flavor": "This is just an ordinary chest. Go on, open it. It’s probably filled with fantastic loot. Maybe some cigarettes and a nudie mag or three! I’m sure it’s not gonna crack open, revealing dozens of incredibly sharp teeth and a tongue long and strong enough to snap an unsuspecting crawler’s neck. If it were a Mimic, it could use its acidic saliva to melt the face off any crawler stupid enough to come close. If it were a Mimic, it could use its tongue to snap your neck. Fortunately for you, it’s not a Mimic."
  },
  {
    "name": "Mind Horror",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Aberrant"
    ],
    "level": 4,
    "hbSlots": [
      2,
      2,
      2,
      2
    ],
    "surprise": "13+F",
    "evade": "11+F",
    "move": "0+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 8,
        "mod": 3
      },
      "CON": {
        "score": 3,
        "mod": 2
      },
      "DEX": {
        "score": 1,
        "mod": 1
      },
      "CHA": {
        "score": 4,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Mindspike Spell",
        "toHit": "13+F",
        "damage": "1d12+3",
        "damageType": "Psychic",
        "range": "30ft range"
      },
      {
        "name": "Psionic Spell",
        "toHit": "13+F",
        "damage": "No damage",
        "range": "60ft Burst radius",
        "rider": "Any crawler gains the Splitting Headache Debuff: Take 1d6+F Psychic at the end of each round until the combat ends (Stackable)."
      },
      {
        "name": "Splatter",
        "toHit": "12+F",
        "damage": "1d6+3",
        "damageType": "Acid",
        "range": "5ft Burst radius",
        "rider": "Any hit crawler gains the Queasy Debuff."
      }
    ],
    "notes": [
      "Ego Screen—Entities with an Intelligence Stat greater than the Mind Horror's Intelligence Stat are immune to its Debuffs.",
      "Mandatory Flight—Mind Horrors hover by default and can only move through the air and fall to the ground if killed. If they touch the ground (alive or dead), they automatically Splatter."
    ],
    "page": 119,
    "source": "GM Toolkit",
    "flavor": "The constant, low-level headache that plagued you since you entered the Neighborhood gets stronger as you turn a corner, a cluster of Mind Horrors coming into view. The floating jellified brains turn toward you, tentacles squirming in anticipation of the intelligence they are about to consume. Mind Horrors feed on your intelligence, which is why you so often have a headache when they’re around. But for once, there’s good news for the idiots among you: stupid crawlers have a natural resistance to their attacks. Nah, just kidding. They’re equally as susceptible. But if you thought this applied to you, even if only briefly, then you might actually be dumber than I thought."
  },
  {
    "name": "Mirror Cat",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Animal"
    ],
    "level": 2,
    "hbSlots": [
      1,
      1
    ],
    "surprise": "11+F",
    "evade": "13+F",
    "move": "30+S",
    "dr": 1,
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
        "score": 1,
        "mod": 1
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
        "name": "Claw",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Phase Claw",
        "toHit": "11+F",
        "damage": "1d4+1",
        "damageType": "Psychic",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Confused Debuff: The crawler must spend their next Action attacking an ally."
      }
    ],
    "notes": [
      "At the end of every other round, another Mirror Cat appears, until their numbers double the size of the party. Then they stop for the remainder of the combat."
    ],
    "page": 31,
    "source": "GM Toolkit",
    "flavor": "Don’t let their beady little eyes and adorable faces fool you—these spiky bastards have personalities as prickly as their appearance. They want you dead, and they’re not shy about how they accomplish it! These creatures use pack tactics to harry their prey and have been known to chase crawlers across half the floor rather than giving up a meal. Whatever you do, be sure never to corner a Canidna. They may curl into a ball, but rest assured, you’re the one who should be very, very afraid. And I’ll bet you thought sphinx cats couldn’t get any weirder, huh? Well, watch out, because the weird doesn’t stop with their bisected appearance. These guys don’t make their home in holes in the ground, but in holes between dimensions. They pop in and out of these spatial holes, only showing half of themselves at any given time, making them harder to kill. To make matters worse, if you don’t kill them, these things multiply exponentially."
  },
  {
    "name": "MisChief",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Rat Knight"
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
    "evade": "14+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 10,
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
        "score": 10,
        "mod": 4
      },
      "CHA": {
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Mattock",
        "toHit": "14+F",
        "damage": "2d10+4",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Manhole Cover",
        "toHit": "14+F",
        "damage": "2d8+3",
        "damageType": "Bludgeoning",
        "range": "30ft range"
      },
      {
        "name": "Traffic Dodger",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "30ft Line",
        "rider": "Cars appear out of nowhere, driving in a straight line to hit as many crawlers as possible."
      }
    ],
    "notes": [],
    "page": 47,
    "source": "GM Toolkit",
    "flavor": "The MisChief is a new position. It’s fallen on this Rat’s head by circumstance and loyalty rather than desire. Right now, he’s staring at you like a rat fleeing a sinking ship. You might wonder what that look of desperation is about, but I wouldn’t. I’d worry more about the giant-ass mattock swinging for your head instead."
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
    "source": "Core",
    "flavor": "Have you ever wanted to watch a lion dance? Me too. It’s too bad these lions lost their rhythm at the start of the cataclysm. The lions were among the first creatures to fall to the curse, transforming into horrible monsters and turning on their beloved trainer. They hold a never-ending rage in their hearts, and these lions don’t only hunt for food; they hunt to fill an aching void within."
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
    "source": "Core",
    "flavor": "Standing thirty feet tall with thick armored limbs and a giant shield and sword, More Dread looks like a mecha knight by way of certain Japanese model kits, but on steroids. His chrome body reflects the madness around him, and he grins with teeth made from subway cars. A hideous sight, this Voltron-gone-bad is the Boss of the bello below, the master of disaster, the warrior of the wastelands."
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
    "source": "Core",
    "name": "Nerodia Water Snake",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Reptile"
    ],
    "level": 51,
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
    "dr": 5,
    "stats": {
      "STR": {
        "score": 48,
        "mod": 5
      },
      "INT": {
        "score": 14,
        "mod": 4
      },
      "CON": {
        "score": 42,
        "mod": 5
      },
      "DEX": {
        "score": 49,
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
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Constrict",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Swallow",
        "toHit": "15+F",
        "damage": "3d12+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "This attack may only be made against Held foes. Any hit crawler gains the Swallowed Debuff: Swallowed crawlers take 1d10+F Acid at the end of each round and cannot be attacked. Swallowed crawlers attack with Disadvantage vs. 0 DR, and Slashing attacks deal x2 damage. When an attack against the Nerodia Water Snake results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff."
      }
    ],
    "notes": [],
    "page": 527,
    "flavor": "There’s something to be said for a simple design. Doesn’t get a lot simpler than a couple of big fangs, a jaw that unhinges, and a big tube of death slithering toward you like… well, like a hungry snake. And sure, most snakes are harmless. You know they’re far more scared of you than you are of them? Keep that in mind when taking your one-way trip through their digestive tract."
  },
  {
    "source": "Core",
    "name": "Night Elf Hunter",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 42,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 34,
        "mod": 5
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 21,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Katana",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Crossbow",
        "toHit": "14+F",
        "damage": "3d8",
        "damageType": "Piercing",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "UV Fungus—Night Elf Hunters increase their damage die type to d10s instead of d8s vs the Undead."
    ],
    "page": 562,
    "flavor": "Poor little goth kids. They lose their city and everyone they’ve ever loved to a Vampire invasion, and suddenly it’s all trenchcoats, sunglasses, and moody music. Just look at ’em: not a fringe out of place on their cheap box-dyed hair and running mascara from contemplating the pain of their existence… blah, blah, blah. I bet they write terrible poetry, too. Notes: UV Fungus—Night Elf Hunters increase their damage die type to d10s instead of d8s vs the Undead. VAMPIRE Former nobles from another land, Vampires in Midnight City were cursed long ago, twisted into undead predators. Though retaining the intelligence and personality they had in life, years of sustaining themselves with the blood of the living dulled their empathy and sharpened their cruelty. Most members of Countess Kesla’s Alabaster Court now see mortals as little more than livestock and entertainment. Victims completely drained by a Vampire rise as a Ghast bound to Kesla’s Soul Crystal pendant, and anyone who drinks the blood of a Vampire becomes one themselves. Vampire. Level 55. Ah, the aristocracy. Bloodsucking leeches in life, not that much different in death. Sure, they dress better and have a larger vocabulary than their zombie cousins, but at the end of the night, they’re still just a corpse in a schmancy coat."
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
    "source": "Core",
    "flavor": "STUDENT BODY The Student Body is a gruesome collection of limbs, mouths, and eyes, with no two parts belonging to the same original being. They incessantly shout pithy school cheers as they run on hundreds of legs. They smoke in the boys’ room and cough it out at their prey in heavy, acidic clouds. Like a melting candle made up of a hundred bodies, these abominable amalgamations resembling a mess of action figure parts can kick, scratch, strangle, bite, and much, much more—all while grossing you out to the max! Student Body. Level 19. Remember when you took every doll or action figure you ever had and melted them together into a mindless abomination of pain and suffering? Now add some screaming, multiply the size several times over, and give them a range of insidious attacks, and you’ve got the Student Body. These Neo-Victorian-looking folks are pale as death… probably for a good reason. They wear mourning black, big stompy boots, and have needles for teeth— all the better to zuck your blood vith! Watch out for their acidic smoke breath and their cloying limbs, or you might find yourself enrolled in their class, where the only tuition you can pay is by giving all of yourself for the sake of school spirit. Stokers’ heads are constantly full of goth-rock, emo, and metal—a never-ending soundtrack to the misery of their own lives, which they’re all too eager to inflict upon you."
  },
  {
    "source": "Core",
    "name": "Nude Glaber",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 36,
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
    "evade": "14+F",
    "move": "20+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 8,
        "mod": 3
      },
      "INT": {
        "score": 57,
        "mod": 6
      },
      "CON": {
        "score": 32,
        "mod": 5
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "13+F",
        "damage": "5d6+3",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Gagging Gaze",
        "toHit": "16+F",
        "damage": "4d6+6",
        "damageType": "Force",
        "range": "30ft range",
        "rider": "Any hit crawler gains the You Stanky! Debuff: Disadvantage on all Charisma Skill Checks until you take a long rest and wash up."
      }
    ],
    "notes": [
      "Re-Mole-deling—Heals 1 HB slot at the end of each round, and regrows a limb if it takes no damage during a round of combat."
    ],
    "page": 593,
    "flavor": "If you detect a whiff of fecal scent in the air, hear snuffling, whining vocalizations around you, or spy short pale forms darting here and there in the darkness, you’re about to confront a group of Nude Glabers… or the Ruling Council of the Null. It’s hard to tell the difference, but if you can see their ugly genitals, it’s the Nude Glabers. Go ahead and stare if you want. Though they’re surprisingly intelligent, they have no sense of modesty or basic hygiene. Speaking of their genitals, theirs regenerate in minutes if removed or destroyed."
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
    "source": "Core",
    "flavor": "In the age-old battle of brawns versus brains, Ogres put all their chips on the former. Scolopendra’s curse affects the minds of all creatures infested with the spores, but something about Ogres made them extra susceptible. The fungus turned their minds to mush— very well-protected mush."
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
    "source": "Core",
    "flavor": "You know that one woman who will absolutely call the HOA on you for leaving your trash cans out fifteen minutes past pickup, then parks her SUV across two spots in the visitor section because “she needs the extra room?” Or maybe that guy who lectures a teenage cashier about the store’s non-existent pricematch guarantee while his unleashed dog pisses on the endcap display? If you do, then you know all you need to know about the Over City Skyfowl! Heavensworth is a small village in the Over City, composed mostly of two-story buildings with upper-level perches to accommodate a Skyfowl population that prefers to fly from building to building. As such, several buildings have unoccupied first floors, with business being conducted only above the ground level. For flightless creatures, rope ladders and crude elevators are available. Similar to other Skyfowl settlements in the Over City, both the construction and the administration of Heavensworth indicate a severe bias toward Skyfowl with the city magistrate, Alecturis, barely bothering with the flightless in his city. Nearly half the village was destroyed in Scolopendra’s nine-tier attack on the Over City, including the village’s temple district and constabulary buildings. The denizens of the village rarely venture out into the ruins, especially at night, due to the dangerous Mobs that roam throughout. The Village Guards routinely patrol during the day to keep the peace and prevent Mobs from the ruins from encroaching, but they retire in the evenings, leaving the streets chaotic and dangerous at night."
  },
  {
    "name": "Pack Rat",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Animal"
    ],
    "level": 2,
    "hbSlots": [
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
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
        "score": 3,
        "mod": 2
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
        "name": "Bite",
        "toHit": "11+F",
        "damage": "1d4+1",
        "damageType": "Piercing",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 32,
    "source": "GM Toolkit"
  },
  {
    "source": "Core",
    "name": "Pain Amplifier Jellyfish",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Cnidaria"
    ],
    "level": 51,
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
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 51,
        "mod": 6
      },
      "INT": {
        "score": 6,
        "mod": 3
      },
      "CON": {
        "score": 35,
        "mod": 5
      },
      "DEX": {
        "score": 58,
        "mod": 6
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Tentacles",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Piercing",
        "range": "30ft Cone",
        "rider": "Any hit crawler gains The Taint Debuff. On an Evade Major Fail or worse, the crawler gains the Shocked Debuff."
      }
    ],
    "notes": [],
    "page": 584
  },
  {
    "source": "Core",
    "name": "Pazuzu Bootlicker",
    "role": "NPC",
    "size": 5,
    "tags": [
      "Humanoid"
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
      6
    ],
    "surprise": "13+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 41,
        "mod": 5
      },
      "INT": {
        "score": 8,
        "mod": 3
      },
      "CON": {
        "score": 52,
        "mod": 6
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Pincers",
        "toHit": "15+F",
        "damage": "4d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      },
      {
        "name": "Tail Strike",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [],
    "page": 540
  },
  {
    "source": "Core",
    "name": "Pazuzu Punk",
    "role": "NPC",
    "size": 5,
    "tags": [
      "Humanoid"
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
    "surprise": "13+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 35,
        "mod": 5
      },
      "INT": {
        "score": 8,
        "mod": 3
      },
      "CON": {
        "score": 52,
        "mod": 6
      },
      "DEX": {
        "score": 22,
        "mod": 5
      },
      "CHA": {
        "score": 8,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Guitar Smash",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Molotov Cocktail",
        "toHit": "14+F",
        "damage": "3d6",
        "damageType": "Fire",
        "range": "25ft range, 10ft Blast radius",
        "rider": "Any hit crawler gains the Burned Debuff."
      },
      {
        "name": "Tail Strike",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      }
    ],
    "notes": [],
    "page": 540,
    "flavor": "What happens when you mash up all the legs, stingers, and pincers of a scorpion with the scrawny frame and spiked rooster comb of a punk rocker? You get a Pazuzu Punk. (It’s basically a scorpitaur.) Pazuzu Punks were rule rule-following foot soldiers of the goddess Tiamat until they discovered the revolutionary sounds of bands like Black Flag, the Dead Kennedys, and Crass. Now, they spend their time publishing anti anti-authoritarian zines, putting safety pins through their noses, and carrying guitars around without ever really learning how to play them."
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
    "source": "Core",
    "flavor": "Born from the combination of an Elf Skellie and a Sprite Flesher, this War Mage is emotion magic incarnate. Charm, fear, joy, sorrow—Penthos can do it all. Unfortunately for you, he’s mostly filled with anger and a thirst for causing pain. Maybe it’s because his skin is stretched tighter than a writer’s finances, or maybe he’s just an asshole. All that power at his command, and he doesn’t even want to turn people into dinosaurs; his dream is for everyone to kill themselves, starting with the people on this line."
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
    "source": "Core",
    "name": "Pet Ghast",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
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
    "surprise": "12+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 37,
        "mod": 5
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 31,
        "mod": 5
      },
      "DEX": {
        "score": 36,
        "mod": 5
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
        "damage": "5d8+5",
        "damageType": "Necrotic",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Putrid Vomit",
        "toHit": "14+F",
        "damage": "3d6",
        "damageType": "Acid",
        "range": "15ft Cone",
        "rider": "Any hit crawler gains the Acid Debuff: Takes 1d8+F Acid at the end of each round for 2 rounds."
      }
    ],
    "notes": [
      "New Unlife—When a foe dies to one of the above attacks, it becomes a Ghast and joins the commune."
    ],
    "page": 561,
    "flavor": "Oh, hey, the city’s nightlife is here! Night… unlife? Whatever. These things roam Midnight City in packs like a bachelorette party on meth: hungry, screechy, and only kept in control by… ah, but that would be spilling the beans, wouldn’t it? Ghommid. Level 53. What do you get when you take a bunch of monsters and a crawler or two, and put them in a blender for ten minutes on puree? Other than a great dip for nachos, you get one of these, and with its intestines hanging out. The Swiss Army Knife of undead, Ghommids are pretty much whatever I want them to be."
  },
  {
    "source": "Core",
    "name": "Phosphenmenologist",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
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
      5
    ],
    "surprise": "15+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 18,
        "mod": 4
      },
      "INT": {
        "score": 90,
        "mod": 6
      },
      "CON": {
        "score": 18,
        "mod": 4
      },
      "DEX": {
        "score": 42,
        "mod": 5
      },
      "CHA": {
        "score": 16,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Pillow Fight",
        "toHit": "14+F",
        "damage": "5d6+6",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "On hit, target gains the Fatigued Debuff."
      }
    ],
    "notes": [
      "Stat block for the crawler \"Sven Gal\" (Crawler #5,555,556); printed with a Mob type line."
    ],
    "page": 546
  },
  {
    "name": "Pickmees",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Aberration"
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
    "surprise": "12+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 8,
        "mod": 3
      },
      "INT": {
        "score": 4,
        "mod": 2
      },
      "CON": {
        "score": 7,
        "mod": 3
      },
      "DEX": {
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Rev Jug",
        "toHit": "12+F",
        "damage": "2d4+2",
        "damageType": "Fire",
        "range": "20ft range, 5ft Burst +5ft Splash",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      },
      {
        "name": "Tentacles",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [],
    "page": 109,
    "source": "GM Toolkit",
    "flavor": "Fueled by their abject jealousy of the Krakaren and their not-so-subtle pursuit of Rev-Up glory, these creatures despise the Empire even while wanting to join it. With fewer tentacles than the Krakaren or her clones, Pickmees are believed to be significantly safer to tangle with."
  },
  {
    "source": "Core",
    "name": "Pirate",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 52,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 39,
        "mod": 5
      },
      "INT": {
        "score": 26,
        "mod": 5
      },
      "CON": {
        "score": 29,
        "mod": 5
      },
      "DEX": {
        "score": 38,
        "mod": 5
      },
      "CHA": {
        "score": 29,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Cutlass",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Pistol",
        "toHit": "15+F",
        "damage": "4d8",
        "damageType": "Piercing",
        "range": "40ft range"
      },
      {
        "name": "Liquor Flamethrower",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Fire",
        "range": "15ft Cone",
        "rider": "The Pirate takes a swig of grog, lights a match, and blows flame. Any hit crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Ghostly—If the Pirate is Ghost, it can only be harmed by enchanted weapons and Spells, and all its attacks are considered magical for the purposes of overcoming Resistances and Immunities."
    ],
    "page": 584,
    "flavor": "Some kids never grow up, I guess. Across most species in the galaxy, you’d be hard-pressed to find one who, at some age, didn’t want to be a Pirate. The thing is, real-life responsibilities catch up. Or they don’t, and you end up perma-drunk and crying as your leg gets torn off and eaten by a swarm of angry Jellyfish."
  },
  {
    "source": "Core",
    "name": "Pistol Pangolin",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Steamborg"
    ],
    "level": 38,
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
    "move": "40+S",
    "dr": 5,
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
        "score": 36,
        "mod": 5
      },
      "DEX": {
        "score": 31,
        "mod": 5
      },
      "CHA": {
        "score": 12,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Pistoleg",
        "toHit": "15+F",
        "damage": "5d8",
        "damageType": "Piercing",
        "range": "50ft range"
      },
      {
        "name": "Roly-Poly",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "25ft Line",
        "rider": "Any crawler who fails to Evade slides 5 feet in a direction of the GM's choice."
      }
    ],
    "notes": [],
    "page": 541,
    "flavor": "These roly-poly guys have all the stealth you’d expect from something made of a steam engine and a bunch of guns, which is to say none. You might be able to hear them coming, but they’ve still got the power of machines on their side, so good luck outrunning them."
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
    "source": "Core",
    "flavor": "Don’t let its cute, fuzzy face fool you. This adorable thing is only the public face of a much little goblin-thing moree insidious enemy. The moment you’re alone with it or the second you don’t give it what it wants, that’s when you’ll find out what it really is."
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
    "source": "Core",
    "flavor": "She’s the first to tell you she’s not a gold-digger; no, this boss babe is digging for goals so she can make her own gold. Pooka Goal Diggers are the exhausting drill instructors of the Cerulean Star, pushing new recruits to their breaking point so they, too, can bother their relatives on social media for some pity sales. Don’t tell her that, though, or she’ll turn into a big-ass goat and ruin your day. She’s also pretty good at riling up any Clurichaun Aspirants around her, sending the fanatical little Fairies into a berserker rage."
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
    "source": "Core",
    "flavor": "I hope you’re not afraid of needles, because these jumped-up little goat goblins are definitely gonna stab you, and they don’t practice clean needle hygiene. Pooka Harmacists are what happens when you give a burgeoning serial killer a chemistry set instead of court-mandated therapy. They love devising all sorts of bizarre concoctions to inject into their victims’ bloodstreams “just to see what happens.” Haddley Luanne Montgomery. Clurichaun Aspirant Super Star. Level 55. Haddley Luanne Montgomery never found a competition she couldn’t win or a cousin she couldn’t kiss. She’s the most dangerous Clurichaun this side of the Iron Tangle, and if you get in the way of her efforts to manifest her future, she’ll stomp you into the dirt and cuss you out for not being a girl’s girl."
  },
  {
    "source": "Core",
    "name": "Propper",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Spring-Operated Chicken Hawk Sentinel"
    ],
    "level": 70,
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
      6
    ],
    "surprise": "15+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
      },
      "INT": {
        "score": 20,
        "mod": 5
      },
      "CON": {
        "score": 65,
        "mod": 6
      },
      "DEX": {
        "score": 70,
        "mod": 6
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Dive Bomb",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Fire",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Propper only uses this explosive attack during the first round of the combat, or when at 50% HB or less, when he will use it at least once per round."
      },
      {
        "name": "Downwash",
        "toHit": "15+F",
        "damage": "6d10+5",
        "damageType": "Force",
        "range": "60ft range, 20ft Splash",
        "rider": "Any hit crawler slides 5ft for each HB slot lost. (Splash is half damage, and this is all Splash.)"
      },
      {
        "name": "Propeller Blast",
        "toHit": "15+F",
        "damage": "7d8+5",
        "damageType": "Force",
        "range": "60ft range",
        "rider": "Any hit crawler is pushed 5ft for each HB slot lost."
      }
    ],
    "notes": [
      "Flying High—Propper remains 60ft off the ground, making melee weapons nearly useless.",
      "Jammed—To jam a rotor, a sturdy object of at least Petite (3) size must be used. If any of its propellers are jammed, Propper immediately loses 2 HB slots and 20 feet of altitude.",
      "Off the Cliff—If a crawler falls over the cliff edge, they fall for two rounds and can perform actions before SPLAT (Death!)."
    ],
    "page": 558,
    "flavor": "Some Bosses watch you like hawks. Others are practically machines. Some of them like to hover around you and pick you apart for fun. Propper here likes to do all three! As the nominal leader of this little excursion, Propper pulls triple duty as the enforcer for Castle Contractors as well as a convenient transport for materials, prisoners, and whatever else it wants to snag. This whole time, it’s been so bored waiting for something really fun to kill. It would probably thank you if it wasn’t a raging asshole."
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
      "Undead Minions—A Moderate group are in the Boss Chamber. These have the same stat block as the Pack Rat (see p. 31), except that they deal Necrotic damage."
    ],
    "page": 144,
    "source": "GM Toolkit"
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
    "source": "Core",
    "flavor": "Psycho Stickers aren’t the invention of sadists but of an evolutionary arms race on a world that transformed from paradise into wasteland. We won’t go into details because the Syndicate doesn’t like being “slandered,” but let’s just say everything developed new ways of eating each other, even the trees. They’ve got numerous adaptations to their new environment: cannibalism, increasingly lethal venom, larger size, and a need for more nutrition to support their size. Technically the Psycho Stickers are herbivores, but plants on their world bleed and scream. So don’t freeze in fear or you’ll look like a delicious snack."
  },
  {
    "source": "Core",
    "name": "Pterolykos Elder",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Winged Guardian"
    ],
    "level": 50,
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
    "surprise": "18+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
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
        "score": 20,
        "mod": 5
      },
      "DEX": {
        "score": 52,
        "mod": 6
      },
      "CHA": {
        "score": 33,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Claws",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Rifle",
        "toHit": "15+F",
        "damage": "4d8",
        "damageType": "Piercing",
        "range": "200ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Aerial Ambush—Each Pterolykos that is not surprised attacks with Advantage during the first round of combat.",
      "Named stat block for the NPC Elder Silkpaw (Pterolykos, Level 50)."
    ],
    "page": 556
  },
  {
    "source": "Core",
    "name": "Pterolykos Hunter",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Winged Guardian"
    ],
    "level": 37,
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
    "surprise": "18+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
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
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 31,
        "mod": 5
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Claw",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Mom's Rifle",
        "toHit": "15+F",
        "damage": "4d8",
        "damageType": "Piercing",
        "range": "200ft range",
        "rider": "Any hit crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Aerial Ambush—Each Pterolykos Hunter that is not surprised attacks with Advantage during the first round of combat."
    ],
    "page": 552,
    "flavor": "A Pterolykos is what would happen if a wolf and an eagle had a baby and then forced a Human to marry it at talon-point so the wolf could raise the resulting offspring. They’re incredible pack-hunters and ambushers, and they have a surprisingly good singing voice. They’re typically very friendly. Too bad this isn’t a typical place, is it? They’re deadly hunters, relentless in their pursuits, and creative in avenging any wrongs against them or their loved ones. They’ll spot you way before you ever see them."
  },
  {
    "source": "Core",
    "name": "Pudding Pal",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Ooze"
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
      5
    ],
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 33,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
      },
      "CON": {
        "score": 33,
        "mod": 5
      },
      "DEX": {
        "score": 27,
        "mod": 5
      },
      "CHA": {
        "score": 25,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Pudding Punch",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains a Pudding Debuff (see below)."
      },
      {
        "name": "Pudding Blast",
        "toHit": "15+F",
        "damage": "3d6+5",
        "damageType": "Force",
        "range": "25ft range, 5ft Blast radius",
        "rider": "Any hit crawler gains a Pudding Debuff (see below)."
      }
    ],
    "notes": [
      "Pudding Debuff—Each flavor of Pudding Pal gives a different Debuff. Lemon Pudding: Take 1d10+5 Acid at the end of each round until the end of the combat. Vanilla Pudding: Roll Charisma Skill Checks with Disadvantage for the rest of the day. Chocolate Pudding: You poop yourself. Butterscotch Pudding: Cannot take Steps until the end of the combat."
    ],
    "page": 594
  },
  {
    "source": "Core",
    "name": "Purifier Vulture",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Avian Janitor"
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
      5
    ],
    "surprise": "16+F",
    "evade": "15+F",
    "move": "30+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
      },
      "INT": {
        "score": 52,
        "mod": 6
      },
      "CON": {
        "score": 32,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 1,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Feeling Peckish",
        "toHit": "14+F",
        "damage": "5d8+4",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Searing Blast",
        "toHit": "16+F",
        "damage": "4d6+6",
        "damageType": "Fire",
        "range": "100ft range, 10ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Burned Debuff."
      }
    ],
    "notes": [
      "Flight—Can move through the air as if it were on the ground."
    ],
    "page": 541,
    "flavor": "Celestial vultures that sear carrion into ash with the heavenly power of their god stones… sounds awesome, doesn’t it? It would be, except they’re cursed to be the janitors in this area. They hate cleaning up after you. If you kill too many Mobs, it’s possible that flocks of Purifier Vultures will descend from the heavens to end you instead."
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
    "source": "Core",
    "name": "Rainbow Sprite",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Humanoid"
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
    "surprise": "14+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 7,
    "stats": {
      "STR": {
        "score": 18,
        "mod": 4
      },
      "INT": {
        "score": 19,
        "mod": 4
      },
      "CON": {
        "score": 29,
        "mod": 5
      },
      "DEX": {
        "score": 43,
        "mod": 5
      },
      "CHA": {
        "score": 9,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Light Lance Spell",
        "toHit": "14+F",
        "damage": "4d8+4",
        "damageType": "Force",
        "range": "40ft range"
      },
      {
        "name": "Dust Blast Spell",
        "toHit": "14+F",
        "damage": "4d6+4",
        "damageType": "Force",
        "range": "30ft range, 5ft Blast radius",
        "rider": "Any crawler who loses 2+ HB slots gains the Dusted Debuff: Disadvantage on Attacks and Skill Checks requiring sight until an Action is spent to wipe their eyes clean. Invisible creatures are revealed until the end of combat."
      }
    ],
    "notes": [
      "Flight—Rainbow Sprites move through the air as though on the ground and hover in place."
    ],
    "page": 625,
    "flavor": "These adorable tufts of colored fur zoom around, spraying everyone and everything with their multi-colored dander. Even killing them causes an explosion of colorful glitter. At this point, they’re less a species and more an aggressively mobile bath bomb."
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
    "name": "Rat Brute",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
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
    "move": "20+S",
    "dr": 1,
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
        "name": "Knife",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Crossbow",
        "toHit": "12+F",
        "damage": "1d8",
        "damageType": "Piercing",
        "range": "50ft range"
      }
    ],
    "notes": [
      "Roid Rage—Rat Brutes are very volatile: sudden noises, bright lights, or perceived insults can trigger an immediate rage response. This doubles the Stat Mod bonus to their damage rolls. In addition, their chemically-fueled endurance allows them to push through pain and fight past \"reasonable\" limits. Rat Brutes can attack one more time after they have been reduced to 0% HB.",
      "Weak-Minded—Rat Brutes are difficult to Intimidate, but attempts to charm and other mind-control effects are made with Advantage."
    ],
    "page": 41,
    "source": "GM Toolkit",
    "flavor": "Most Rat-kin are twitchy flea-bitten little cowards who would sooner shank you in the kidney than look you in the eye. Then there’s these guys. Rat Brutes are what happens when Rat-kin decide they’re tired of being pushed around. They pump themselves full of magical growth hormones and take any excuse to show off their bulging biceps. Warning: Do not try to reason with Rat Brutes. Their brains shrank to the size of a dried raisin to make room for more jaw muscles."
  },
  {
    "name": "Rat Hooligan",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Rat Hybrid"
    ],
    "level": 4,
    "hbSlots": [
      2,
      2,
      2,
      2
    ],
    "surprise": "12+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
      },
      "INT": {
        "score": 4,
        "mod": 2
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
        "score": 4,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Longsword",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Firebolt Spell",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Fire",
        "range": "30 ft range"
      },
      {
        "name": "Heal Others Spell",
        "toHit": "None",
        "damage": "No damage",
        "range": "10ft range",
        "rider": "This is a healing Spell that heals one target within 10 feet for 1d4 Health Bar slots."
      }
    ],
    "notes": [],
    "page": 42,
    "source": "GM Toolkit",
    "flavor": "This is the most versatile of all the Rat-kin in this Neighborhood. While they don’t train as diligently in either combat or magic as their kin, the sheer versatility of what they can do is terrifying in its own right. The Brute will smash you. The Shaman will fireball you. But the Hooligan? The Hooligan can do any or all of that and more besides. Take some small comfort that you can see this one. There are plenty who never realize the Hooligan is there until it’s far too late."
  },
  {
    "name": "Rat Shaman",
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
    "surprise": "14+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 10,
        "mod": 4
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
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Clap Cloud Spell",
        "toHit": "14+F",
        "damage": "1d4+4",
        "damageType": "Force",
        "range": "50ft range, 20ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Queasy Debuff."
      },
      {
        "name": "Firestrike Spell",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Fire",
        "range": "30ft range, (once every other round)"
      },
      {
        "name": "Mini Fireball Spell",
        "toHit": "14+F",
        "damage": "1d6+4",
        "damageType": "Fire",
        "range": "60ft range, 5ft Blast radius"
      }
    ],
    "notes": [],
    "page": 42,
    "source": "GM Toolkit",
    "flavor": "While the Brutes were getting jacked, the Shamans were getting weird. They spent their youth huffing toxic sewer fumes and “communing” with the Great Vermin in the Sky. But don’t let their coughing fits fool you; they somehow got real magical powers from that nonsense. They mainly launch fireballs but can also transmit plagues. Not the bubonic type—you think they bothered learning Earth history? They prefer watching reality television, so if anything, you’ll be dodging STDs."
  },
  {
    "name": "Rayzer",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beastly"
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
        "score": 2,
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
        "name": "Magic Missile Spell",
        "toHit": "11+F",
        "damage": "1d4+3",
        "damageType": "Force",
        "range": "Line of Sight range"
      },
      {
        "name": "Tail Sting",
        "toHit": "11+F",
        "damage": "1d4+1",
        "damageType": "Poison",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains The Taint Debuff."
      }
    ],
    "notes": [
      "Wall Cling—Rayzers can land vertically or even upside down.",
      "Flight—Rayzers can move through the air as though on the ground and hover in place."
    ],
    "page": 19,
    "source": "GM Toolkit",
    "flavor": "The Rayzer is a deceptively cunning ambush predator. Sure, they can fly and shoot magic and even blend in with their surroundings, but that’s not what makes them so successful. Their true power lies in their patience and their intelligence. These crafty little devils have been known to hide in the perfect ambush spot and wait up to sixty hours without moving. Watch your step and your head, because these guys hide above and below before striking at unsuspecting prey. If you have the fortune to see one before it springs its trap, take a good look around, because there’s probably at least two more you don’t see, just waiting for you to lower your guard."
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
    "source": "Core",
    "flavor": "Certain Mobs have names that are clever puns, or allusions to their history, or maybe subtle clues to their origins. The Razor Fox is not one of those Mobs. These humanoid foxes have a penchant for sharp blades and ninja attire, the ladies in red and the gentlefoxes in black. Each has trained since childhood with one or more specific blades like a comic book character, and one of the two is usually shuriken. Near, far, wherever you are, they will kill you, and you won’t even see them do it."
  },
  {
    "source": "Core",
    "name": "Razor Fox (Jubei)",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 47,
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
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 21,
        "mod": 5
      },
      "INT": {
        "score": 22,
        "mod": 5
      },
      "CON": {
        "score": 23,
        "mod": 5
      },
      "DEX": {
        "score": 54,
        "mod": 6
      },
      "CHA": {
        "score": 26,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Katana",
        "toHit": "15+F",
        "damage": "5d8+4",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Throwing Star",
        "toHit": "16+F",
        "damage": "4d6+4",
        "damageType": "Piercing",
        "range": "30ft range"
      }
    ],
    "notes": [
      "Outfoxy—Razor Foxes can also wield other ninja equipment like smoke bombs, poison, or climbing claws.",
      "Named stat block for the NPC Jubei (Razor Fox, Level 47)."
    ],
    "page": 546
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
    "source": "Core",
    "flavor": "Ohhh, fuck. What the fuck is that thing? Wow, I didn’t know a ghost could look like a sausage that’s been boiled for 40 years and then rolled around in some dirt for good measure. Holy balls—you’re still only seeing the mask. I can see his entire face, and it makes the Pillsbury Doughboy’s asshole look downright beautiful."
  },
  {
    "name": "Riff Roughers",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Animal"
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
    "move": "20+S",
    "dr": 1,
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
        "name": "Breath",
        "toHit": "13+F",
        "damage": "1d4+3",
        "damageType": "Acid",
        "range": "10ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poisoned Debuff."
      },
      {
        "name": "Cutlass",
        "toHit": "14+F",
        "damage": "1d8+3",
        "damageType": "Slashing",
        "range": "5ft range"
      }
    ],
    "notes": [
      "Swordsmen—Riff Roughers are expert swordsmen, and their Stat Block reflects this."
    ],
    "page": 19,
    "source": "GM Toolkit",
    "flavor": "If you’ve ever wanted to get into a swordfight with a pirate, well… here’s your chance, Orlando Bloom! Some think the Riff Roughers are just older Scat Thugs while others think they’re a separate species entirely."
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
    "source": "Core",
    "flavor": "Everybody loves the circus! But no one loves the circus as much as Grimaldi loved his circus. Grimaldi’s Traveling Circus was once a favorite pastime for Over City children and adults alike—until Scolopendra’s nine-tier attack changed everything. The ensuing curse did not spare the circus or its leader, instead twisting them into something else entirely. Redstone Grimaldi was once a Dwarf, not that you can tell by looking at him these days. He clings to the memory of his circus family, keeping them all alive with the “help” of his parasitic spores. Every time he brings them back, they lose a little more of themselves, but he can’t bear to say goodbye. ness with those infected by his parasites. He can speak directly into their minds, see their memories, and even attempt to exert a “mental tug” to stop their actions. Crawlers must make an INT Stat Check. On Fail, they gain the Paralyzed Debuff. Crawlers can attempt this Check again once per round."
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
    "source": "Core",
    "name": "Roller Derby Jammer",
    "role": "Rival Crawler",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 43,
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
    "move": "20+S",
    "dr": "F",
    "stats": {
      "STR": {
        "score": 25,
        "mod": 5
      },
      "INT": {
        "score": 24,
        "mod": 5
      },
      "CON": {
        "score": 25,
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
        "name": "Body Check",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "If the Roller Derby Jammer moved 10ft this round, any hit crawler gains the Take Down Debuff."
      }
    ],
    "notes": [
      "Skater—While moving on skates, foes attack the Roller Derby Jammer with Disadvantage."
    ],
    "page": 535
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
    "source": "Core",
    "name": "Sangoma",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 47,
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
    "surprise": "17+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 8,
        "mod": 3
      },
      "INT": {
        "score": 101,
        "mod": 7
      },
      "CON": {
        "score": 21,
        "mod": 5
      },
      "DEX": {
        "score": 42,
        "mod": 5
      },
      "CHA": {
        "score": 16,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Shuriken",
        "toHit": "15+F",
        "damage": "5d4+3",
        "damageType": "Piercing",
        "range": "40ft range"
      },
      {
        "name": "Heal Others",
        "toHit": "",
        "damage": "",
        "range": "30ft range",
        "rider": "Target heals 2d6 HB."
      }
    ],
    "notes": [
      "Divining the Truth—Once per long rest, the Sangoma can look into the future and choose to give themselves or a party member Advantage on their next Evade check.",
      "Stat block for the crawler \"Adama Mb\" (Crawler #13,297,594); printed with a Mob type line."
    ],
    "page": 546
  },
  {
    "name": "Scat Thug",
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
    "move": "30+S",
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
        "name": "Spear",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Piercing",
        "range": "10ft range"
      },
      {
        "name": "Scat Pellet",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stank Rot Debuff: Take 1d6+F Poison at the end of each round."
      }
    ],
    "notes": [
      "Thief—Crawlers who start their turn adjacent to one or more scat thugs must make an INT Stat Check vs Difficulty 10+F+the number of adjacent scat thugs. On a Major Fail or worse, they lose one equipped or held item. One scat thug drops their spear and takes the item if the item is small and light enough to carry. Otherwise, the item falls to the ground in the nearest unoccupied space.",
      "Trapper—Each Scat Thug can activate one trap in a space within 60ft alongside their Action. Entities who move into a trapped space may trigger the trap, which deals 1d10+F Piercing damage and applies the Poison Debuff. Each trap only triggers once."
    ],
    "page": 20,
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
    "source": "Core",
    "flavor": "These fish swim the streams of mythology, appearing in waters anywhere that gods and goddesses live. They tap into the quantum concordance of the universe and connect the divine to the terrestrial. That sounds pretty deep and laden with symbolic meaning, but what the fuck does it actually mean? It’s designed to seem important, like you’re about to receive some kind of cosmic revelation, but smart people with any critical thinking skills easily see through that garbage."
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
    "source": "Core",
    "flavor": "Just don’t stick around too long. After sunset, these creatures stop gliding and start hunting."
  },
  {
    "name": "Screye Drone",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Organic Machinery"
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
    "surprise": "16+F",
    "evade": "13+F",
    "move": "10+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
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
        "name": "Weeping Eye Discharge",
        "toHit": "13+F",
        "damage": "No damage",
        "range": "25ft range",
        "rider": "Any hit crawler gains the Take Down and Fatigued Debuffs."
      }
    ],
    "notes": [
      "Alarm—When threatened, emits high-pitched chimes summoning nearby Bugaboos.",
      "The Eyes Have It—As the Drone is covered with eyes, it is hard to Surprise.",
      "Hover—Screye Drone moves through the air as if on ground. Does not fight, but will slowly float away, shedding viscous fluids and eyeballs (the Discharge) to deter pursuers."
    ],
    "page": 129,
    "source": "GM Toolkit",
    "flavor": "A terrifying blend of optometry and artisanal crafts, these guys are awfully nosy for something made out of eyeballs and pipe cleaners. Screye Drones are the evolved form of the doorbell cameras you see all over the place. They spy on you, scream for help, and carry messages from their overlord. Careful not to slip on the jelly. Blind Goblin Survivor, Level 4 These unlucky bastards are proof that the harvesting process is technically non-lethal. Well, at least not directly. Being a blind Mob in this dungeon is just asking to be fodder for crawlers keen on grinding to level up. But they’ve adapted, so you don’t have to feel sorry for them or anything."
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
    "source": "Core",
    "flavor": "These bipedal hyenas are just slightly smaller than the average Human. Most often, they wear black uniforms and wield collapsible truncheons and riot shields, in part because those things make them effective at their jobs but also because dammit, they just look cool. Not every Shade Gnoll is a member of the security force, but every member of the species is prepared to join them at a moment’s notice. Don’t feel too bad for them, however; they’ll happily crack any skulls as long as they get paid."
  },
  {
    "name": "Shambling Acid Impaler",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Zombie"
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
    "evade": "14+F",
    "move": "10+S",
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
        "name": "Acid Dart",
        "toHit": "14+F",
        "damage": "2d6+2",
        "damageType": "Acid",
        "range": "40ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Queasy Debuff and the Dissolving Debuff: Take 1d6+F Acid at the end of each round until the combat ends."
      },
      {
        "name": "Tongue Lash",
        "toHit": "12+F",
        "damage": "2d8+2",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Dissolving Debuff: Take 1d6+F Acid at the end of each round until the combat ends."
      }
    ],
    "notes": [],
    "page": 86,
    "source": "GM Toolkit",
    "flavor": "If these things are around, don’t wear your Sunday best, you hear me? These nasty amalgamations love to spit acid darts with the precision of a freaking marksman. It’s their destructive capabilities that make most crawlers say “nope” and head the other direction, but if you have to fight them, take them out quickly and without mercy, or else you’re gonna go into your next area wearing nothing but your boxers."
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
    "source": "Core",
    "flavor": "Well, I guess we eventually needed to do something with all the zombie tropes from your culture. Meet the Shambling Berserker, a name it was definitely given by someone who met one during the day, when these towering meat-lockers are at their tamest. If two or more Shambling Berzerkers are adjacent to a crawler, the crawler has Disadvantage to Evade. Tenacious—Once a Shambling Berzerker has targeted a crawler it does not stop until it has been destroyed or the crawler has been killed. RUMBLE WEED A terrifying variant of the Shambling Berserker, Rumble Weeds are half the height of a normal Berserker but are comprised entirely of arms and legs. These six-foot-tall meatballs roll around the Necropolis looking to pummel—trample?—anything with the audacity to be alive. They’re capable of incredible bursts of speed, moving their feet to the bottom, like they’re driving a prehistoric car to a dinosaur drive-in. 17 Rumble Weeds are even more dangerous at night, changing from sightless balls of chaos to true predators. In the dark, their eyes and mouths open across their arms and legs, allowing them to track and bite prey. These ugly patchwork monstrosities are tenacious assassins, following their targets forever once they lock onto them. Best to lose them when they’re in their shambling state, because as soon as the sun goes down, their speed limit goes way up. And their power quadruples. And their rage becomes an inescapable fire that will burn your whole world down."
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
    "source": "Core",
    "flavor": "These rough-and-tumble creatures are nothing if not industrious… and obsessively alcoholic. How they manage to be both at the same time is one of the great mysteries of the universe. The mead they make can knock a Mantaur on their ass. Note: Their beards are a great source of pride."
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
    "source": "Core",
    "flavor": "The shadow of a crow is said to be as cold and ominous as the grave they’ll chase you into, and these guys take that literally. Anyone caught in the shadow of a Crowcorps is petrified with fear. Their pinion feathers (that’s a fancy term for feathers used for flying, you dumbass) aren’t just for catching air; they’re sharp enough to slice through a single strand of hair—oh, and straight through your throat."
  },
  {
    "source": "Core",
    "name": "Skyfowl Raiders",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Aerial Ambusher"
    ],
    "level": 33,
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
    "dr": 5,
    "stats": {
      "STR": {
        "score": 30,
        "mod": 5
      },
      "INT": {
        "score": 18,
        "mod": 4
      },
      "CON": {
        "score": 15,
        "mod": 4
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 11,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Crossbow",
        "toHit": "15+F",
        "damage": "5d8",
        "damageType": "Piercing",
        "range": "50ft range"
      },
      {
        "name": "Talon",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Slashing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [],
    "page": 604
  },
  {
    "name": "Slimy Croakers",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Beastly"
    ],
    "level": 3,
    "hbSlots": [
      2,
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 1,
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
        "score": 5,
        "mod": 2
      },
      "CHA": {
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Tongue Whip",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Paralyzed Debuff."
      },
      {
        "name": "Croak",
        "toHit": "11+F",
        "damage": "1d4+2",
        "damageType": "Sonic",
        "range": "20ft Cone +10ft Splash"
      }
    ],
    "notes": [
      "Egg Protector—Slimy Croakers typically stay near Aranaea Magnus eggs to protect them. If the eggs they're watching are damaged, their croaks cause all Croakers within 60ft to prioritize moving to surround the attacker.",
      "Slippery Slime—A puddle of slime fills the Slimy Croaker's space after it performs an Attack Action. All slime lasts until the end of the combat. The first time any crawler enters a slime space, they must make a Dex Stat Check. On Fail, the crawler gains the Take Down Debuff. A Slimy Croaker also leaves behind slime in its space and adjacent spaces when killed."
    ],
    "page": 52,
    "source": "GM Toolkit"
  },
  {
    "name": "Smombie",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Undead"
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
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Tantrum",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Sonic",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 108,
    "source": "GM Toolkit",
    "flavor": "What’s better than the hypnotic scrolling of pointless reels one after another? Having the doomscroll connected directly to your brain! While these zombified creatures are oblivious to almost everything around them, disturbing their scrolling even in the slightest can quickly bring about a ragefueled tantrum of death."
  },
  {
    "source": "Core",
    "name": "Snow Shifter",
    "role": "Neighborhood Boss",
    "size": 6,
    "tags": [
      "Shapeshifter"
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
      6
    ],
    "surprise": "16+F",
    "evade": "16+F",
    "move": "30+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 80,
        "mod": 6
      },
      "INT": {
        "score": 60,
        "mod": 6
      },
      "CON": {
        "score": 80,
        "mod": 6
      },
      "DEX": {
        "score": 85,
        "mod": 6
      },
      "CHA": {
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Snake Bite",
        "toHit": "16+F",
        "damage": "7d10+6",
        "damageType": "Ice",
        "range": "10ft range (only in snake form)"
      },
      {
        "name": "Snowman Crush",
        "toHit": "16+F",
        "damage": "6d8+6",
        "damageType": "Ice",
        "range": "10ft range (only in snowman form)",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      },
      {
        "name": "Snowburst",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Ice",
        "range": "30ft Burst (only in avalanche form)",
        "rider": "For every 2 HB slots lost to this attack, the crawler gains one stack of the Freezing to Death Debuff (stackable): Take 1d6+F Ice at the end of each round of combat."
      },
      {
        "name": "Blizzard Spell",
        "toHit": "15+F",
        "damage": "5d6+6",
        "damageType": "Ice",
        "range": "30ft range, 10ft Blast radius",
        "rider": "Any crawler who loses 3+ HB slots to this attack gains the Paralyzed Debuff."
      }
    ],
    "notes": [
      "Hot Poker Vulnerability—Piercing and non-Spell Fire attacks deal x2 damage.",
      "Not So Shifty—When Snow Shifter changes form, he takes a -2 penalty to his Evade score that round.",
      "Snowman Form—At 50% HB, it changes form into a snowman with a hard outer shell, gaining +5 DR.",
      "Avalanche Form—At 20% HB, it changes form into a living avalanche, where it has Resistance to ALL damage types, but has 0 DR. (It still has Immunity to Spell damage.)"
    ],
    "page": 610,
    "flavor": "Look over there! It’s an avalanche that takes on shapes. Are you seeing a snake, or are you just happy to see me? It’s been content to devour the occasional Skyfowl, Dirigible Gnome, or Frost Maiden until now, but most of them are too light on their feet to bother it. You bother it. Congratulations, you’ve taught it a new emotion: anger. You must be a real dumbass to try to fight a literal force of nature."
  },
  {
    "source": "Core",
    "name": "Snowgrave",
    "role": "Mob",
    "size": 2,
    "tags": [
      "Goblinoid Phantom"
    ],
    "level": 35,
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
    "dr": 5,
    "stats": {
      "STR": {
        "score": 40,
        "mod": 5
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
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Talon",
        "toHit": "15+F",
        "damage": "5d10+5",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Grapple",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "Snow Swimming—Snowgraves can move through the snow as though on the ground.",
      "Under Snow Tow—Any Held crawler is dragged under the snow the following round and gains the Suffocating Debuff: Take 1d6+F damage at the end of each round (until they make an Unopposed Swimming Skill Check)."
    ],
    "page": 604
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
    "source": "Core",
    "flavor": "She’s got the black bob haircut, a red silk dress that clings to her like liquid, and the voice of an angel. She presents as a damsel in distress, but she’s really a femme fatale. You might think it’s all an act, but the guns here fire real bullets, not blanks, and she’s no exception. Zoe knows how to get what she wants, and nothing will stop her rise to the top. She’s already become the most requested singer in the city, but she’s got ambitions to be a big Boss."
  },
  {
    "name": "Spat—Goblin Who Just Can't Seem to Let Go of the Past",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Unique Humanoid"
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
    "surprise": "12+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 10,
        "mod": 4
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
        "name": "Rock",
        "toHit": "14+F",
        "damage": "2d6+4",
        "damageType": "Bludgeoning",
        "range": "30ft range"
      },
      {
        "name": "Spear",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Piercing",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 131,
    "source": "GM Toolkit"
  },
  {
    "name": "Spit—Goblin Survivor Who Lives in the Now",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Unique Humanoid"
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
    "surprise": "12+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 6,
        "mod": 3
      },
      "INT": {
        "score": 4,
        "mod": 2
      },
      "CON": {
        "score": 6,
        "mod": 3
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
        "name": "Rock",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Bludgeoning",
        "range": "30ft range"
      },
      {
        "name": "Spear",
        "toHit": "13+F",
        "damage": "2d8+3",
        "damageType": "Piercing",
        "range": "5ft range"
      }
    ],
    "notes": [],
    "page": 130,
    "source": "GM Toolkit"
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
    "name": "Sprites",
    "role": "Mob",
    "size": 1,
    "tags": [
      "Humanoid",
      "Winged Fairy"
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
        "score": 6,
        "mod": 3
      },
      "DEX": {
        "score": 7,
        "mod": 3
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Pitchfork",
        "toHit": "12+F",
        "damage": "2d8+2",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Thrown Rock",
        "toHit": "12+F",
        "damage": "2d6+2",
        "damageType": "Bludgeoning",
        "range": "30ft range"
      }
    ],
    "notes": [],
    "page": 86,
    "source": "GM Toolkit",
    "flavor": "Gotta admit: These guys are pretty mundane until you get ’em all riled up. They’re single-minded, but that’s just how they’re created. Don’t count them all out, though! For every “Did you hear that noise from across the floor?” Sprite you find, there’s one that harbors a clue to a rare treasure or one willing to give you something. They’re pretty solid in a scrap, too, so try not to make them angry. Don’t let their small size fool you, they pack a regular-sized punch."
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
    "source": "Core",
    "flavor": "These mammoth monsters have quite a lot in common with their smaller, younger cousins. However, by the time they’ve reached this Level, they’re roughly the size of a city block, with a mouth as large as the average train, and teeth bigger than the average person. While they’re essentially shapeless blobs in their normal form, they prefer to take the form of a common train station structure to lure victims in—although occasionally, if hungry enough, some of them have been known to take the form of a train to more actively hunt their victims. There are six of these creatures scattered through the Iron Tangle. These are not simply mindless beasts. They don’t speak in a way most people can hear them, but they find plenty of other ways to voice their displeasure. They’re also smart enough not to attack the first moment a crawler steps inside their mouths. Many times, they’ll wait until a crawler or a group of crawlers ventures so far into their mouths that they have no hope of leaving once again. At this size, they form up to eight prehensile tongues at once. Using them as weapons, manipulators, and, of course, tongues. Some say these mimics represent an ancient enemy of the Syndicate, but they’re clearly reading too many (entirely accurate) conspiracy theories."
  },
  {
    "name": "Stiggy, Dungeon Surveillance Architect",
    "role": "Borough Boss",
    "size": 3,
    "tags": [
      "Cybernetic Humanoid"
    ],
    "level": 14,
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
    "surprise": "22+F",
    "evade": "14+F",
    "move": "10+S",
    "dr": 3,
    "stats": {
      "STR": {
        "score": 7,
        "mod": 3
      },
      "INT": {
        "score": 50,
        "mod": 6
      },
      "CON": {
        "score": 7,
        "mod": 3
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
        "name": "Probe",
        "toHit": "13+F",
        "damage": "3d6+6",
        "damageType": "Psychic",
        "range": "10ft range",
        "rider": "Crawlers make a free CHA Stat Check to avoid this attack (no Evade possible) or they live out one of their Past Traumas, Loose Ends, or Regrets, interacting with entities from their past on the screens."
      },
      {
        "name": "Camera Flash",
        "toHit": "13+F",
        "damage": "2d4+3",
        "damageType": "Electric",
        "range": "30ft range",
        "rider": "Crawlers roll with Disadvantage to Evade this attack, as there are cameras everywhere. Any hit crawler gains the Blinded Debuff: Roll with Disadvantage on all attacks until the crawler takes new damage."
      }
    ],
    "notes": [
      "Hands Off—Stiggy makes only one attack per round, as the rest of the time he is opening trapdoors and rotating sections of the floor. Once a Probe has been successful against a crawler, he does not Probe that crawler again. Once they have all been Probed, he only uses Camera Flash.",
      "Trapdoors—The trapdoors are simple spike traps (1d6+F Piercing). There are so many and they are so well hidden, crawlers on the ground must make DEX Stat Checks to avoid them at the end of each round.",
      "Rotating Floors—Each crawler gains the Fatigued Debuff at the end of each round unless they are not on the ground.",
      "Hydraulic Arm—Stiggy is held aloft by a large and well-armored arm that moves him about the chamber so he can monitor everything. DR 5, with 8 HB slots filled with 3s. If it is destroyed, it flails about, smashing the helpless Goblin against the monitors, eventually killing him.",
      "Electrified Arm—The arm has a powerful damage reflection buff at 1:1. For every HB slot the arm loses, the attacking crawler loses 1 HB slot.",
      "Screens & Cameras Everywhere—As his chamber is covered with eyes and cameras, Stiggy is very hard to Surprise.",
      "Guards—A new Screye Drone and Bugaboo show up each round of the combat, doing most of the fighting for Stiggy. If an attack against Stiggy would cause him to lose 4+ HB slots, a Screye Drone takes the hit instead."
    ],
    "page": 135,
    "source": "GM Toolkit"
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
    "source": "Core",
    "flavor": "Did you know that 53.5 % of Humans feel at least some amount of fear when they see a clown? I think it’s safe to up that to 100% when it comes to these freaks. Stilt clowns used to inspire cheers and laughter when they walked down a street; now, they mostly elicit screams."
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
    "source": "Core",
    "flavor": "Remember when you took every doll or action figure you ever had and melted them together into a mindless abomination of pain and suffering? Now add some screaming, multiply the size several times over, and give them a range of insidious attacks, and you’ve got the Student Body. These Neo-Victorian-looking folks are pale as death… probably for a good reason. They wear mourning black, big stompy boots, and have needles for teeth— all the better to zuck your blood vith! Watch out for their acidic smoke breath and their cloying limbs, or you might find yourself enrolled in their class, where the only tuition you can pay is by giving all of yourself for the sake of school spirit. Stokers’ heads are constantly full of goth-rock, emo, and metal—a never-ending soundtrack to the misery of their own lives, which they’re all too eager to inflict upon you."
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
    "source": "Core",
    "flavor": "The creative inspirations of the Dwarves, combined with a flagon of dwarven mead, a dash of demonic essence, and an overwhelming feeling of personal inadequacy coalesced into these fiery little creatures. They’re perpetually in a state of pissed-offat-the-world and trying their best to burn it all down. The Dwarves decided to harness that energy to power their engines, but they are unstable at the best of times. Then one day he woke up. Not from sleep, but from the routine. He began asking questions like: “Why were they digging tunnels nobody used?” and “Why did the Company never show its face?” He doesn’t know the name “Borant Corporation,” but he knows someone (with gills) pulls the strings. And he absolutely hates them for it. Now Corkscrew looks for any chance to jam a wrench into the Company’s plans. If the crawlers share that goal, they might find Corkscrew McGraw a surprisingly valuable ally. AI Superior Forge Sprite Corkscrew McGraw. Repair Union Foredwarf."
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
    "source": "Core",
    "flavor": "Goggles he can barely see through? Check. Smoking a comically large cigar and is completely unaware of it? Check. Operating a powerful mechanical death machine that can throw train cars at you with abandon? Double check! This guy looks the role of a mad scientist. Unfortunately for you, he’s not just brains but has the brawn to back up that enormous ego. Best of luck to you, friends! Who am I kidding? No one survives getting broadsided by a passenger car flying through the air at 200 miles per hour."
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
    "source": "Core",
    "name": "Temple Guard",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Stony Phantasm"
    ],
    "level": 55,
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
    "surprise": "12+F",
    "evade": "16+F",
    "move": "25+S",
    "dr": 7,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 60,
        "mod": 6
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
        "name": "Stone Fist",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Stone Shot",
        "toHit": "16+F",
        "damage": "5d6+6",
        "damageType": "Bludgeoning",
        "range": "60ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Woozy Debuff."
      }
    ],
    "notes": [],
    "page": 615,
    "flavor": "Oh, no! It’s a ghost! Worse—it’s a self-righteous ghost burdened with glorious purpose. The temple is their domain, and if you’re stupid enough to walk into their domain, well, that seems more like a you problem. I hope you enjoy seeing just what getting a fistful of stone feels like. The good news is that, in their physical forms, they’re vulnerable and can be killed. The bad news is it’s incredibly hard to hurt living rock."
  },
  {
    "source": "Core",
    "name": "Temple Guardian",
    "role": "Borough Boss",
    "size": 6,
    "tags": [
      "Insane Guardian"
    ],
    "level": 63,
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
      6,
      6
    ],
    "surprise": "12+F",
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 60,
        "mod": 6
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
        "name": "Stone Shot",
        "toHit": "16+F",
        "damage": "5d12+6",
        "damageType": "Piercing",
        "range": "50ft range"
      },
      {
        "name": "Stone Drop",
        "toHit": "15+5",
        "damage": "7d8",
        "damageType": "Piercing",
        "range": "30ft range"
      },
      {
        "name": "Earthquake Stomp",
        "toHit": "15+F",
        "damage": "5d6+6",
        "damageType": "Bludgeoning",
        "range": "20ft Burst radius",
        "rider": "Any hit crawler gains the Take Down Debuff."
      },
      {
        "name": "Stone Stampede",
        "toHit": "15+F",
        "damage": "5d6+6",
        "damageType": "Bludgeoning",
        "range": "20ft Line",
        "rider": "This attack automatically hits any crawler with the Take Down Debuff."
      },
      {
        "name": "Summon Temple Guard",
        "toHit": "",
        "damage": "",
        "rider": "One Temple Guard appears at the end of the Mob Action Resolution, maneuvers into position, but does not attack this turn."
      }
    ],
    "notes": [
      "Fit to be Untied—A crawler can attempt to cut one of the ropes holding the Temple Guardian together by making an Attack with Disadvantage vs. Difficulty 16. On Success, they sever the rope, and the Temple Guardian loses 2 HB slots."
    ],
    "page": 620
  },
  {
    "name": "The Bar Render",
    "role": "Neighborhood Boss",
    "size": 5,
    "tags": [
      "Humanoid"
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
      4,
      4,
      4,
      4
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "30+S",
    "dr": 1,
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
        "score": 6,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Fiery Cocktail",
        "toHit": "14+F",
        "damage": "1d8+4",
        "damageType": "Fire",
        "range": "30ft range, 10ft Blast radius"
      },
      {
        "name": "Punch",
        "toHit": "14+F",
        "damage": "2d8+4",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Held Debuff."
      }
    ],
    "notes": [
      "She has two Barflies joining her in the fight at all times until she is dead."
    ],
    "page": 37,
    "source": "GM Toolkit",
    "flavor": "Once upon a time, Patti dreamed of defending her fellow man from the twisted, perverted farce you know as the justice system. She utterly crushed the BAR exam and became an attorney, a public defender, and a tireless advocate for justice. For thirty years, she did everything she could for everyone she could, serving those most vulnerable and most in need. It’s a shame that it only ever amounted to a few pitiful thank-yous and just enough cash to buy this miserable place, to which she’s dedicated her retirement years. These days, she feels almost as broken down as the bar itself. Still, she’s got enough piss and vinegar in her to lay down the law on your asses."
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
    "source": "Core",
    "flavor": "I’m not sure if this thing is worse than the stingray that killed Steve Irwin, but it’s pretty damn close. The Dispenser is part manta ray, part blender, and part fog machine. It’s not the only Boss in the dungeon with a splash zone, but this one comes with a mosh pit of pissed-off body parts that put Juggalos to shame."
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
    "source": "Core",
    "flavor": "You’re gonna need a bigger boat! This Loch Ness monster is a double feature: a two-headed horror whose humped back looks like a small island moving out in the foggy sea. Each head of the Divider has rows of razor-sharp teeth to rend your succulent crawler flesh and a tail lash that causes mini tsunamis. Everyone in Noir Town whispers about the monster, but most locals are smart enough not to go out this far into his territory."
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
    "source": "Core",
    "name": "Thing Too Horrible to Name",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Spirit"
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
    "surprise": "17+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 0,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
      },
      "INT": {
        "score": 110,
        "mod": 7
      },
      "CON": {
        "score": 24,
        "mod": 5
      },
      "DEX": {
        "score": 30,
        "mod": 5
      },
      "CHA": {
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Psychic Bolt Spell",
        "toHit": "17+F",
        "damage": "5d6+7",
        "damageType": "Psychic",
        "range": "40ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Terrified Debuff, seeing the thing that most torments them."
      }
    ],
    "notes": [],
    "page": 596
  },
  {
    "source": "Core",
    "name": "Thorny Devil Queen",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Reptile"
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
    "dr": 8,
    "stats": {
      "STR": {
        "score": 50,
        "mod": 6
      },
      "INT": {
        "score": 30,
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
        "score": 30,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Chomp",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Fiendish Flop",
        "toHit": "15+F",
        "damage": "4d6+6",
        "damageType": "Piercing",
        "range": "10ft Burst radius",
        "rider": "Any hit crawler gains the Held Debuff, and the Skewered Debuff: Each failed escape from being Held subjects the crawler to Spikes All Over (see below)."
      }
    ],
    "notes": [
      "Spikes All Over—On any melee attack (or attempt to escape being Skewered) Near Miss Fail against this Mob, the crawler takes 2d8+F Piercing damage. Add 1 die for each degree of failure worse than that."
    ],
    "page": 539,
    "flavor": "This is a matriarch of the Thorny Devils—the Queen herself. You can tell she’s the Queen because of the crown on her head. She’s the reason all the Male Thorny Devils developed so many defensive mechanisms. Because if she ain’t happy, she’ll crush you flat. What was the other thing I said about her? Oh, yeah… she’ll probably be the last thing you see."
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
    "source": "Core",
    "flavor": "You know how corporations and municipalities hire the lowest bidder to get the job done? And how sometimes that results in crappy workmanship and subpar results? Somewhere along the line, that happened, and now we’ve got the Trash Knights. These hodgepodge husks have pledged fealty to the one and true lord of the underway, More Dread. They fight without honor, though it’s arguable there’s no such thing in the aftermath of nuclear war. But they do adhere to a code—just not one that any sane creature can make out. Upon their mighty flying ostriches they ride into battle, ready to… Joust."
  },
  {
    "name": "Trash Princess",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Humanoid"
    ],
    "level": 4,
    "hbSlots": [
      2,
      2,
      2,
      2
    ],
    "surprise": "12+F",
    "evade": "12+F",
    "move": "20+S",
    "dr": 1,
    "stats": {
      "STR": {
        "score": 1,
        "mod": 1
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
        "score": 3,
        "mod": 2
      },
      "CHA": {
        "score": 7,
        "mod": 3
      }
    },
    "attacks": [
      {
        "name": "Eat Trash and Die",
        "toHit": "13+F",
        "damage": "1d6+3",
        "damageType": "Poison",
        "range": "30ft range, 10ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Stank Rot Debuff: Take 1d6+F Poison at the end of each round."
      },
      {
        "name": "Trash Thunderclap",
        "toHit": "12+F",
        "damage": "1d6+3",
        "damageType": "Force",
        "range": "15ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler is pushed back 10ft."
      },
      {
        "name": "Seduction",
        "toHit": "See below",
        "damage": "1d6+3",
        "damageType": "Psychic",
        "range": "15ft Cone",
        "rider": "The target must make a free INT Stat Check vs Difficulty 14 or gains the Seduced Debuff: A PC must spend their next two Actions on ill-fated Persuasion Skill Checks."
      }
    ],
    "notes": [
      "Collateral Trashing—Trash princesses don't care who they hit. If their Area attacks hit 3 or more entities (allies or enemies), they deal an additional 1d6 damage to each target."
    ],
    "page": 21,
    "source": "GM Toolkit"
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
    "name": "Trollogs",
    "role": "Mob",
    "size": 5,
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
    "surprise": "12+F",
    "evade": "13+F",
    "move": "20+S",
    "dr": 2,
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
        "score": 4,
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
        "name": "Bite",
        "toHit": "13+F",
        "damage": "2d6+3",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Javelin",
        "toHit": "12+F",
        "damage": "2d8+3",
        "damageType": "Piercing",
        "range": "30ft range; once per combat"
      }
    ],
    "notes": [
      "Mirror Change—If an Trollog is exposed to a mirror, the mirror will crack and the Trollog will be forced to transform into their original form.",
      "Shapeshifting—Trollogs can change their appearance to look like Sprites in order to get close to an enemy and attack them in their natural frightening form."
    ],
    "page": 88,
    "source": "GM Toolkit"
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
    "source": "Core",
    "name": "Unbound Will",
    "role": "Neighborhood Boss",
    "size": 7,
    "tags": [
      "Killer Whale"
    ],
    "level": 60,
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
      6
    ],
    "surprise": "14+F",
    "evade": "14+F",
    "move": "35+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 75,
        "mod": 6
      },
      "INT": {
        "score": 16,
        "mod": 4
      },
      "CON": {
        "score": 80,
        "mod": 6
      },
      "DEX": {
        "score": 18,
        "mod": 4
      },
      "CHA": {
        "score": 16,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Tsharknami!",
        "toHit": "14+F",
        "damage": "7d12+6",
        "damageType": "Piercing",
        "range": "30ft range"
      },
      {
        "name": "Bite",
        "toHit": "16+F",
        "damage": "6d6+6",
        "damageType": "Piercing",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Swallowed Debuff: The crawler is swallowed whole and cannot be attacked. When an attack against the Unbound Will results in an Amazing Success or better (or it dies), all crawlers remove the Swallowed Debuff. Swallowed crawlers take 1d10+F Acid at the end of each round. Swallowed crawlers attack with Disadvantage vs. 0 DR, and Slashing attacks deal x2 damage."
      },
      {
        "name": "Tail Whip",
        "toHit": "16+F",
        "damage": "5d8+6",
        "damageType": "Bludgeoning",
        "range": "20ft Cone",
        "rider": "Any hit crawler is pushed 5ft for each HB slot lost."
      }
    ],
    "notes": [
      "Blood In the Water—Each time another creature in the area is killed, Unbound Will spends 1 Action moving toward the blood. If the number of dead creatures is equal to the crawler party size or more in the area, the sharks spend all of their Actions feeding, leaving the party alone, and the Tsharknami! attack cannot be used."
    ],
    "page": 578,
    "flavor": "Deep inside a lightless cavern lies the wreck of a pirate galleon, once the vessel of Captain Broadbeard Trent, broken open and half-buried beneath piles of gold, bones, and whatever else sank with it. This is Unbound Will’s lair. The enormous Killer Whale usually sleeps atop the treasure like a homicidal dragon, but he has an excellent sense of smell and a deep hatred of crawlers. Their scent wakes him quickly. O The cave itself sits far below the surface, making natural light nonexistent. Crawlers need magical or artificial light to see anything beyond shadows and wreckage. The walls of the cavern are riddled with holes two to three feet wide, each surrounded by veins of silver threading through the stone. Shortly after combat begins, Unbound Will smashes the cavern wall with his massive tail, causing loose stone to crash down behind the crawlers, sealing the This immense orca is covered with not-so-masterfully inked prison tattoos across its body. Wait, are Killer Whales black with white splotches or white with black splotches? Anywaaaay, now that Unbound Will is finally free, he ain’t never goin’ back to prison! Ever hear of Moby Dick? Prison champ Unbound Will would chomp the shit outta that guy."
  },
  {
    "name": "Unvaccinated Clurichaun Rev-Up Consultant",
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
    "surprise": "11+F",
    "evade": "13+F",
    "move": "25+S",
    "dr": 2,
    "stats": {
      "STR": {
        "score": 3,
        "mod": 2
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
        "score": 2,
        "mod": 1
      }
    },
    "attacks": [
      {
        "name": "Slingshot",
        "toHit": "13+F",
        "damage": "3d2+2",
        "damageType": "Bludgeoning",
        "range": "40ft range"
      },
      {
        "name": "Claw",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Sneeze",
        "toHit": "13+F",
        "damage": "1d6+1",
        "damageType": "Poison",
        "range": "15ft Cone",
        "rider": "Any crawler who loses 1+ HB from this attack gains one of the following Debuffs: The Taint, Stiff Legs, or Diseased."
      }
    ],
    "notes": [
      "Diseased—Take 1d6+F Poison at the end of each round until the end of the combat."
    ],
    "page": 107,
    "source": "GM Toolkit",
    "flavor": "Clurichauns are distant hillbilly relatives of the Leprechauns. And while the Leprechauns are said to guard vast piles of gold, the only thing Clurichauns might hoard are Polaroids of their own sisters sitting on the can and questionable business schemes. This particular sect is of the unvaccinated variety. Don’t let them sneeze on you."
  },
  {
    "source": "Core",
    "name": "Ursine Edge Member",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Beastly"
    ],
    "level": 32,
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
    "dr": 5,
    "stats": {
      "STR": {
        "score": 29,
        "mod": 5
      },
      "INT": {
        "score": 14,
        "mod": 4
      },
      "CON": {
        "score": 29,
        "mod": 5
      },
      "DEX": {
        "score": 15,
        "mod": 4
      },
      "CHA": {
        "score": 14,
        "mod": 4
      }
    },
    "attacks": [
      {
        "name": "Club",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "5ft range"
      },
      {
        "name": "Spreading Scent",
        "toHit": "14+F",
        "damage": "4d6+4",
        "damageType": "Acid",
        "range": "20ft Cone",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Tagged Debuff: A new Ursa Edge Member shows and seeks to mate with you."
      }
    ],
    "notes": [],
    "page": 625
  },
  {
    "source": "Core",
    "name": "Vampire",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Undead"
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
    "surprise": "15+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 38,
        "mod": 5
      },
      "INT": {
        "score": 22,
        "mod": 5
      },
      "CON": {
        "score": 36,
        "mod": 5
      },
      "DEX": {
        "score": 35,
        "mod": 5
      },
      "CHA": {
        "score": 39,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Vampiric Embrace",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "For every 3 HB slots lost to this attack, Vampire heals 1 HB slot."
      },
      {
        "name": "Hypnotism Spell",
        "toHit": "15+F",
        "damage": "No damage",
        "range": "20ft range",
        "rider": "Can Evade (look away). Any hit crawler must make an INT Stat Check. On Fail, they gain the Hypnotized Debuff (this counts as mind control): Cannot attack or Evade until the Spell is broken. Spend 1 Action each round making the same Stat Check to break the Spell."
      }
    ],
    "notes": [
      "Ghastly Unlife—If a crawler is killed by a Vampire, they rise as a Pet Ghast bound to Kesla’s Soul Crystal pendant."
    ],
    "page": 562,
    "flavor": "Ah, the aristocracy. Bloodsucking leeches in life, not that much different in death. Sure, they dress better and have a larger vocabulary than their zombie cousins, but at the end of the night, they’re still just a corpse in a schmancy coat."
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
    "source": "Core",
    "flavor": "Everyone likes the strong, silent type. To find out what’s underneath that helmet, you first must kill the guard. Go ahead and give it a try. I double-dog dare you. They’re tasked with protecting the village from the creatures that roam the Over City Ruins. They’re only on duty when the sun is up, so don’t go whining to them for help when it’s dark."
  },
  {
    "name": "Vine Creeper",
    "role": "Mob",
    "size": 6,
    "tags": [
      "Plant"
    ],
    "level": 2,
    "hbSlots": [
      2,
      2
    ],
    "surprise": "11+F",
    "evade": "12+F",
    "move": "15+S",
    "dr": 1,
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
        "name": "Fang",
        "toHit": "12+F",
        "damage": "1d6+2",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Poison Debuff."
      },
      {
        "name": "Talon",
        "toHit": "12+F",
        "damage": "1d8+2",
        "damageType": "Slashing",
        "range": "5ft range"
      },
      {
        "name": "Vine",
        "toHit": "12+F",
        "damage": "1d4+2",
        "damageType": "Bludgeoning",
        "range": "30ft range",
        "rider": "Any hit crawler gains the Held Debuff and is pulled closer; only broken when the Creeper dies."
      }
    ],
    "notes": [],
    "page": 50,
    "source": "GM Toolkit",
    "flavor": "Remember the end of Little Shop of Horrors when Audrey II breaks out of its flowerpot and shoots a bunch of singing vines in every direction while trying to eat Rick Moranis? Take away the singing and Audrey II’s huge head and replace it with a giant transforming eggplant, and it’ll be pretty much identical to a Vine Creeper. These surreptitious sprouts sleep in their pods until their vines detect nearby vibrations, triggering them to hunt. Vaguely humanoid (but rarely seen walking upright), the Vine Creepers first rely on their lengthy vines to ensnare and disable prey. Then they shamble along on all fours until they descend upon their victims in a fury of fangs, talons, and strangling vines. Once they overcome their victims, the Vine Creepers drag them back to their pods, where poisons and acids gradually (and painfully) break down their prey into digestible enzymes."
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
    "name": "Whambat",
    "role": "Mob",
    "size": 3,
    "tags": [
      "Animal"
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
        "score": 1,
        "mod": 1
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
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "11+F",
        "damage": "1d8+1",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Hell Dive",
        "toHit": "13+F",
        "damage": "1d8+3",
        "damageType": "Bludgeoning",
        "range": "60ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Staggered Debuff."
      }
    ],
    "notes": [
      "Flight—Whambats can move through the air as though on the ground.",
      "Hell Dive—Whambats die from the impact of a Hell Dive that hits their target."
    ],
    "page": 98,
    "source": "GM Toolkit",
    "flavor": "It’s a bird! It’s a plane! It’s a—what the hell is that? Wait, there’s more of ’em? Wham! Wham! Wham!"
  },
  {
    "source": "Core",
    "name": "Whisper",
    "role": "NPC",
    "size": 4,
    "tags": [
      "Humanoid"
    ],
    "level": 50,
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
    "move": "20+2",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 51,
        "mod": 6
      },
      "INT": {
        "score": 40,
        "mod": 5
      },
      "CON": {
        "score": 31,
        "mod": 5
      },
      "DEX": {
        "score": 32,
        "mod": 5
      },
      "CHA": {
        "score": 26,
        "mod": 5
      }
    },
    "attacks": [
      {
        "name": "Light Lance",
        "toHit": "16+F",
        "damage": "5d8+5",
        "damageType": "Force",
        "range": "50ft range"
      },
      {
        "name": "Polychrome Vortex Spell",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Force",
        "range": "60ft range, 15ft Blast radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blinded Debuff."
      }
    ],
    "notes": [
      "Flight—Whisper can move through the air as though on the ground.",
      "Named stat block for the NPC Whisper (Bune Polychromatic Lightcaster, Level 50). Move printed as \"20+2\" (likely 20+S)."
    ],
    "page": 626
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
    "name": "Wise-Guyy",
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
    "source": "Core",
    "flavor": "The abominable snowman is a football coach? Yeah, why not. He’s got the build for it. Yakov is a mean, snarling, yellow-toothed Yeti who also happens to be a well-regarded football coach."
  },
  {
    "source": "Core",
    "name": "Yard Beetle",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Insectoid"
    ],
    "level": 46,
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
    "surprise": "12+F",
    "evade": "15+F",
    "move": "20+S",
    "dr": 7,
    "stats": {
      "STR": {
        "score": 45,
        "mod": 5
      },
      "INT": {
        "score": 5,
        "mod": 2
      },
      "CON": {
        "score": 53,
        "mod": 6
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
        "name": "Slam",
        "toHit": "15+F",
        "damage": "5d6+5",
        "damageType": "Bludgeoning",
        "range": "5ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      },
      {
        "name": "Trample",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Bludgeoning",
        "range": "15ft Line",
        "rider": "Any hit crawler gains the Sore as Shit Debuff."
      }
    ],
    "notes": [],
    "page": 527,
    "flavor": "You know what I like about Beetles? Work ethic. They really get down to business. You crawlers are all alike: Ooooh, nooo, I’m too scared to fight. I don’t want to die. I miss my cat. Constantly procrastinating, not getting the job done. You don’t get that garbage from a Beetle. Big dumb armored tanks with legs. Get on top of one, and you can crash it into things all day long and not wear it out. I’ve even heard if you make friends with one and say its name three times, it might show up when you need it. Or was that something else? YARD MANTIS Yard Mantises lurk where the Grass Jungle is thickest, moving in silent packs and striking without warning. These perfect predators hide among tall grass stems, their green-and-brown bodies blending easily with the foliage. They use the whole environment to their advantage, ambushing from above and below. Once they identify a meal, their raptorial forelegs snap out with blinding speed and enough power to crush bones, dragging the unfortunate victim toward mandibles capable of dismembering even the toughest of prey. Yard Mantis. Level 45. I had thousands of bugs to choose from when I built this Neighborhood. Tens of thousands. And I absolutely filled the yard with Mantises. I just like the juxtaposition, you know? They’re so still and patient. All calm and polite, hands folded like they’re praying and waiting for church to start. Then BAM! They grab some little old lady from a pew across the way, and before you know it, they’re munching on her head while her body’s cooling next to a spilled plate of those little wafers."
  },
  {
    "source": "Core",
    "name": "Yard Mantis",
    "role": "Mob",
    "size": 4,
    "tags": [
      "Insectoid"
    ],
    "level": 45,
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
    "evade": "16+F",
    "move": "20+S",
    "dr": 5,
    "stats": {
      "STR": {
        "score": 40,
        "mod": 5
      },
      "INT": {
        "score": 10,
        "mod": 4
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
        "score": 5,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Bite",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Piercing",
        "range": "5ft range"
      },
      {
        "name": "Spinning Scythe",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Slashing",
        "range": "5ft Burst radius",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Blood Trail Debuff."
      }
    ],
    "notes": [
      "Sudden Burst—Any Mantis that is not surprised can travel twice its Move in the first round of combat."
    ],
    "page": 528,
    "flavor": "I had thousands of bugs to choose from when I built this Neighborhood. Tens of thousands. And I absolutely filled the yard with Mantises. I just like the juxtaposition, you know? They’re so still and patient. All calm and polite, hands folded like they’re praying and waiting for church to start. Then BAM! They grab some little old lady from a pew across the way, and before you know it, they’re munching on her head while her body’s cooling next to a spilled plate of those little wafers."
  },
  {
    "source": "Core",
    "name": "Yard Spider",
    "role": "Mob",
    "size": 5,
    "tags": [
      "Arachnid"
    ],
    "level": 49,
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
    "dr": 5,
    "stats": {
      "STR": {
        "score": 42,
        "mod": 5
      },
      "INT": {
        "score": 17,
        "mod": 4
      },
      "CON": {
        "score": 41,
        "mod": 5
      },
      "DEX": {
        "score": 49,
        "mod": 5
      },
      "CHA": {
        "score": 3,
        "mod": 2
      }
    },
    "attacks": [
      {
        "name": "Fangs",
        "toHit": "15+F",
        "damage": "4d6+5",
        "damageType": "Piercing",
        "range": "5ft range",
        "rider": "Any hit crawler gains the Poisoned Debuff."
      },
      {
        "name": "Leg Sweep",
        "toHit": "15+F",
        "damage": "5d8+5",
        "damageType": "Bludgeoning",
        "range": "10ft range",
        "rider": "On an Evade Major Fail or worse, the crawler gains the Take Down Debuff."
      }
    ],
    "notes": [],
    "page": 528,
    "flavor": "I can’t understand why Humans don’t like these things. What’s not to like? They’re quick and efficient. They come up with so many approaches to finding dinner, it’s wild. Sure, they can’t agree on webs, hidey holes, or just striking out like an eight-legged serial killer, but at thee end of the day, they all make it work. And did you know their legs use hydraulics? They’re like tiny little murder machines! No rolled-up newspaper is gonna save you this time, bucko."
  }
];
