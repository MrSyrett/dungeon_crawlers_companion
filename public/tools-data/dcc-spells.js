// GENERATED FILE - do not edit by hand.
// Source: data/dcc/spells.json - regenerate with: node scripts/build-dcc-data.mjs

const DCC_SPELLS = [
  {
    "name": "Air Buddy",
    "mana": 12,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You launch yourself with enough force to fly, hurtling forward from your current position up to 10 x your INT Mod away. You land safely if you land on solid ground; otherwise, you fall (see p. 76). You can cast this twice in a row to \"double jump\" just like in platforming video games. Favored: Mage.",
    "upgrades": [
      {
        "rank": 5,
        "text": "You may choose one additional willing target up to your size at touch range, who you bring with you."
      },
      {
        "rank": 10,
        "text": "You can fly up to 20 x your INT Mod away with this spell."
      },
      {
        "rank": 15,
        "text": "You may choose up to five additional willing targets up to your size at touch range to bring with you."
      }
    ],
    "page": 202,
    "source": "Core"
  },
  {
    "name": "Astral Paw",
    "mana": 12,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You conjure a spectral hand, paw, or claw, looking much like your own. You can use this astral appendage to manipulate objects up to 30 ft away by spending an Action. You can use the Astral Paw to make Skill Checks but suffer Disadvantage due to a lack of fine control. Duration: until the end of combat or 5 minutes. Also known as Astral Hand or Astral Claw.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Your Pugilism and Slice Attacks with the Paw add 1 Astral Paw Rank damage die."
      },
      {
        "rank": 10,
        "text": "You can conjure a paw up to four size categories larger than your own, and the range increases to 50 feet."
      },
      {
        "rank": 15,
        "text": "The caster no longer suffers Disadvantage when performing suitable Skill Checks using the paw, and the duration is 15 minutes."
      }
    ],
    "page": 203,
    "source": "Core"
  },
  {
    "name": "Bad Faith",
    "mana": 10,
    "type": "attack",
    "stat": "CHA",
    "passive": false,
    "desc": "An unholy presence invades your victim's mind, body, and soul. Range 40 feet. Base Damage: 1d8 + CHA Necrotic. Favored: Cleric.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d8 base damage, +5ft Splash."
      },
      {
        "rank": 10,
        "text": "+1d8 base damage, and end all Buffs on the victims for the duration of the combat."
      },
      {
        "rank": 15,
        "text": "+1d8 base damage, +5ft Splash."
      }
    ],
    "page": 203,
    "source": "Core"
  },
  {
    "name": "Bang Bro",
    "mana": 5,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "Place a hot and crackling temporary enchantment on a weapon you are holding. Your weapon deals +2 mixed Fire and Electric damage. Range 5 feet. Duration: 5 minutes + 1 minute per Rank. Cooldown: 15 minutes.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d6 Fire and Electric damage."
      },
      {
        "rank": 10,
        "text": "+1d6 Fire and Electric damage, and on an Amazing Success, the target of the weapon attack gains the Burned Debuff."
      },
      {
        "rank": 15,
        "text": "+1d6 Fire and Electric damage, and on an Amazing Success, the target of the weapon attack also gains the Shocked Debuff."
      }
    ],
    "page": 203,
    "source": "Core"
  },
  {
    "name": "Clockwork Triplicate",
    "mana": 26,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "When you cast this spell upon your pet or minion, it splits into three, each with its full complement of abilities. You must spend an Action making an Unopposed Animal Handling Skill Check to issue a new command to each one separately. Range 5 feet. Duration: 1 minute per Rank. Only castable on pets and minions.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Duration is 2 minutes per Rank."
      },
      {
        "rank": 10,
        "text": "Duration is 3 minutes per Rank."
      },
      {
        "rank": 15,
        "text": "When you command your pet or minion, the clockwork versions follow suit."
      }
    ],
    "page": 203,
    "source": "Core"
  },
  {
    "name": "Confusing Fog",
    "mana": 6,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You create a billowing cloud of fog that you, your party members, and friendly NPCs can see through, but it obscures the area from Mobs, making it more difficult for them to attack you. Mobs attack with Disadvantage against targets in the fog. This fog fills a 25 x 25 ft area. Smart Mobs may attempt to move the combat out of the fog if able. Range 40 feet. Duration: until the end of two full rounds of combat or 20 seconds. Cooldown: 15 minutes.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The fog fills a 50 x 50 ft area, and its duration is 1 minute."
      },
      {
        "rank": 10,
        "text": "The fog fills a 100 x 100 ft area and lasts for 5 minutes."
      },
      {
        "rank": 15,
        "text": "The fog fills a 500 x 500 ft area and lasts for 15 minutes."
      }
    ],
    "page": 204,
    "source": "Core"
  },
  {
    "name": "Dirt Clod",
    "mana": 1,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "aiFavor": 2,
    "desc": "You hurl a magical clod of dirt, leaving dirt and pebbles strewn about near the target. Range 100 feet. Base Damage: 1d2 + INT Bludgeoning.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+2d2 base damage."
      },
      {
        "rank": 10,
        "text": "+1d2 base damage, and the target gains the Woozy Debuff."
      },
      {
        "rank": 15,
        "text": "+1d2 base damage, and 1 Rank damage die."
      }
    ],
    "page": 204,
    "source": "Core"
  },
  {
    "name": "Drain Life",
    "mana": 14,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "For a brief instant, you create a disgusting blood vein that reaches out and wraps itself around your target. Range 30 feet. Base Damage: 1d6 + INT Necrotic.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d6 base damage, and if the target loses at least 3 Health Bar slots, you heal 1 Health Bar slot."
      },
      {
        "rank": 10,
        "text": "+1d6 base damage, and if you heal this way, heal +1 Health Bar slot."
      },
      {
        "rank": 15,
        "text": "+1d6 base damage, and if you heal this way, heal +1 Health Bar slot."
      }
    ],
    "page": 204,
    "source": "Core"
  },
  {
    "name": "Earworm",
    "mana": 6,
    "type": "attack",
    "stat": "CHA",
    "passive": false,
    "desc": "Sing a terrible song targeting the ear holes of a victim. Yes, sing a few bars so the GM understands the pain you're inflicting. Range 30 ft. Cooldown: once per round. Base Damage: 1d6 + CHA Sonic. Favored: Bard.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d6 base damage."
      },
      {
        "rank": 10,
        "text": "+1d6 base damage, and the target gains the Queasy Debuff."
      },
      {
        "rank": 15,
        "text": "+1d6 base damage and +10ft Splash."
      }
    ],
    "page": 204,
    "source": "Core"
  },
  {
    "name": "Fear",
    "mana": 3,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "Target a non-Boss Mob of half your level or less. On a Standard Success, it stands its ground, but it loses its DEX Mod for the duration of the combat. On a higher success, it uses two of its Actions during the next round to run away. Range 25 feet. Scary-ass Mobs are immune to Fear effects (GM's discretion).",
    "upgrades": [],
    "page": 204,
    "source": "Core"
  },
  {
    "name": "Fire Fingers",
    "mana": 3,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "aiFavor": 1,
    "desc": "Brilliant flame leaps from your fingers. Range Melee. Base Damage: 1d4 + INT Fire.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d4 base damage."
      },
      {
        "rank": 10,
        "text": "+1d4 base damage, and the target gains the Burned Debuff."
      },
      {
        "rank": 15,
        "text": "+1d4 base damage, and your hands begin to intermittently burn. Your Pugilism, Unarmed Combat, and Slice Attack strikes add 1 Fire Fingers Rank damage die (Fire)."
      }
    ],
    "page": 205,
    "source": "Core"
  },
  {
    "name": "Fireball",
    "mana": 45,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "A creeping beach ball-sized sphere of fire emanates from you. Since it moves so slowly, your attack is made with Disadvantage. When the impact zone has been determined, each creature in a 10 ft Blast radius takes full damage. On Fail, roll 1d8 for direction; the amount the Skill Check missed by is the distance away in feet it impacts. Range 80 feet. Cooldown: once per scene. Base Damage: 1d12 + INT Fire, 10 ft Blast radius.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d12 base damage. Those who lose 1 or more Health Bar slots via this attack gain the Burned Debuff."
      },
      {
        "rank": 10,
        "text": "+1d12 base damage and becomes an 80ft Line attack (and keeps the Blast)."
      },
      {
        "rank": 15,
        "text": "+1d12 base damage and +40ft Splash (on the Blast)."
      }
    ],
    "page": 205,
    "source": "Core"
  },
  {
    "name": "Frost Scar",
    "mana": 2,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "aiFavor": 1,
    "desc": "With a slice of your frigid hand, you leave a scar of rime on your target. Range Melee. Base Damage: 1d4 + INT Ice.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d4 base damage, and the target cannot heal themselves in the next combat round."
      },
      {
        "rank": 10,
        "text": "+1d4 base damage, and the target gains the Stiff Legs Debuff."
      },
      {
        "rank": 15,
        "text": "+1d4 base damage, and the target gains The Taint Debuff."
      }
    ],
    "page": 205,
    "source": "Core"
  },
  {
    "name": "Grand Illusion",
    "mana": 7,
    "type": "utility",
    "stat": "INT",
    "passive": false,
    "desc": "You create an illusion that might trick your foes. Make a single INT-Opposed Spell Check vs. foes who can see it. Your same roll is used against foes who see it even after the casting round. Mundane illusions seeking only to impress might be rolled with Advantage, while complex illusions seeking a specific response or images that suddenly pop up during combat might be rolled with Disadvantage (GM's discretion). On Success, they believe your illusion. Range 40 feet. Duration: 2 minutes. Cooldown: 15 minutes.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Those who believe gain the Woozy Debuff or similar based on the desired response."
      },
      {
        "rank": 10,
        "text": "Those who believe also gain the Queasy Debuff or similar based on the desired response."
      },
      {
        "rank": 15,
        "text": "Those who believe also gain the Shocked Debuff or similar based on the desired response."
      }
    ],
    "page": 205,
    "source": "Core"
  },
  {
    "name": "Heal",
    "mana": 2,
    "type": "heal",
    "stat": "INT",
    "passive": true,
    "desc": "Heal 2 Health Bar slots. Range: Self only. Rank 1 maximum.",
    "upgrades": [],
    "page": 206,
    "source": "Core"
  },
  {
    "name": "Heal Critter",
    "mana": 8,
    "type": "heal",
    "stat": "INT",
    "passive": true,
    "desc": "The target glows as they heal back to 100% Health Bar. Range 30 feet. May only be cast on pets and minions (sorry, Donut).",
    "upgrades": [
      {
        "rank": 5,
        "text": "The target mends a Minor Injury Debuff."
      },
      {
        "rank": 10,
        "text": "The target mends a Major Injury Debuff."
      },
      {
        "rank": 15,
        "text": "The target regrows all lost appendages."
      }
    ],
    "page": 206,
    "source": "Core"
  },
  {
    "name": "Heal Others",
    "mana": 6,
    "type": "heal",
    "stat": "INT",
    "passive": true,
    "desc": "A wave of positive vibes engulfs the target. They heal 1d4 Health Bar slots. Range 30 feet. You can't cast this Spell on yourself, pets, or minions.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The target heals 1d6 Health Bar slots."
      },
      {
        "rank": 10,
        "text": "The target heals 2d6 Health Bar slots."
      },
      {
        "rank": 15,
        "text": "Instead of a single target, all party members within a 20ft Burst radius are healed."
      }
    ],
    "page": 206,
    "source": "Core"
  },
  {
    "name": "Heal Self",
    "mana": 1,
    "type": "heal",
    "stat": "INT",
    "passive": true,
    "desc": "You center yourself, using magic to make yourself whole. You heal 1d4 Health Bar slots. Range: Self only. You can only cast this Spell on yourself.",
    "upgrades": [
      {
        "rank": 5,
        "text": "You heal 1d6 Health Bar slots and mend a Minor Injury, Poison, or Disease Debuff."
      },
      {
        "rank": 10,
        "text": "You heal 2d6 Health Bar slots and mend a Major Injury or other Debuff."
      },
      {
        "rank": 15,
        "text": "You heal to full and gain the benefits of a short rest."
      }
    ],
    "page": 206,
    "source": "Core"
  },
  {
    "name": "Hole",
    "mana": 12,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You create a temporary cylindrical hole in a surface or material within range, to a depth of 1 inch per Spell Rank and a diameter of 2 ft. Anything that can fit in the hole can pass through it if the hole is deep enough to penetrate to the other side of the surface. Range 10 feet. Duration: until the end of the combat or 5 minutes. Can't be used on saferoom doors or living things.",
    "upgrades": [
      {
        "rank": 5,
        "text": "You can reduce the diameter of the hole to a smaller size when cast."
      },
      {
        "rank": 10,
        "text": "You can widen the hole's diameter by 1 inch for every inch of depth you sacrifice when cast."
      },
      {
        "rank": 15,
        "text": "The caster may end the spell with a thought (like an Interrupt, but it doesn't cost an Action). Anything in the hole at that time is destroyed."
      }
    ],
    "page": 206,
    "source": "Core"
  },
  {
    "name": "Holy Aura",
    "mana": 7,
    "type": "attack",
    "stat": "CHA",
    "passive": false,
    "desc": "You channel your deity and emanate their essence to hurt only the enemies around you. Range: 5 ft Burst radius. Cooldown: once per round. Base Damage: 1d4 + CHA Holy, 5 ft Burst radius. Favored: Cleric & Paladin.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d4 base damage, and affected undead Mobs take double damage."
      },
      {
        "rank": 10,
        "text": "+1d4 base damage and +5ft Burst radius."
      },
      {
        "rank": 15,
        "text": "+1d4 base damage and +5ft Burst radius."
      }
    ],
    "page": 207,
    "source": "Core"
  },
  {
    "name": "Hot Stuff Aura",
    "mana": 8,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You create a shield of pure sex appeal around you against all damage types with a number of Health Bar slots equal to your CHA Mod, and a 2 in each slot. It also protects all allies within the radius. When depleted, it disappears. These slots cannot be healed. Range: 5 ft Burst radius. Duration: 2 rounds. Cooldown: 5 minutes. Favored: Bard.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Increase the Health to 4 in each slot."
      },
      {
        "rank": 10,
        "text": "+5ft Burst radius, with a 6 in each slot."
      },
      {
        "rank": 15,
        "text": "+10ft Burst radius, with a 8 in each slot."
      }
    ],
    "page": 207,
    "source": "Core"
  },
  {
    "name": "Ice Blast",
    "mana": 9,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "With the howl of blizzard winds, you let loose a compact pocket of freezing cold and ice. Range 40 feet. Base Damage: 1d8 + INT Ice.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d8 base damage."
      },
      {
        "rank": 10,
        "text": "+1d8 base damage, and the target is pushed 10 feet away from you."
      },
      {
        "rank": 15,
        "text": "+1d8 base damage, and you can change the range to a 15ft Cone Attack."
      }
    ],
    "page": 207,
    "source": "Core"
  },
  {
    "name": "Icicles",
    "mana": 19,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "Seizing upon the ice that runs through your veins, icicle projectiles shoot forth from your palms towards distant foes. Range 60 feet. Base Damage: 1d12 + INT Ice.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d12 base damage."
      },
      {
        "rank": 10,
        "text": "+1d12 base damage, and the target gains the Stiff Legs Debuff."
      },
      {
        "rank": 15,
        "text": "+1d12 base damage, and the damage is Armor-Piercing."
      }
    ],
    "page": 207,
    "source": "Core"
  },
  {
    "name": "Intimate Touches",
    "mana": 8,
    "type": "heal",
    "stat": "CHA",
    "passive": true,
    "desc": "You lay hands on the target (which could be you), who heals Health Bar slots equal to your CHA Mod. Range 5 feet. Unlike most healing, this spell is not an Interrupt. Favored: Cleric & Paladin.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The target also heals a Minor Injury Debuff."
      },
      {
        "rank": 10,
        "text": "The target also heals a Major Injury Debuff."
      },
      {
        "rank": 15,
        "text": "The target also heals all Poison & Disease Debuffs."
      }
    ],
    "page": 208,
    "source": "Core"
  },
  {
    "name": "Lightning Bolt",
    "mana": 15,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "With a thunderous clap, you let loose a bolt of lightning. Range 100 feet. Base Damage: 1d10 + INT Electric.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d10 base damage."
      },
      {
        "rank": 10,
        "text": "+1d10 base damage and becomes a 100ft Line Attack."
      },
      {
        "rank": 15,
        "text": "+1d10 base damage. The lightning bolt forks, and you may choose to apply your Attack against any number of additional targets within 15 feet of the previous target (within the range limit). Each successful Attack (including against the primary target) deals half damage."
      }
    ],
    "page": 208,
    "source": "Core"
  },
  {
    "name": "Magic Missile",
    "mana": 5,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "aiFavor": 1,
    "desc": "From glowing eyes, fingers, or whatever, a streak of pure force shoots out. Range: within your line of sight. Base Damage: 1d4 + INT Force.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d4 base damage, and you can cast the Spell at a higher or lower Mana cost. 3 Mana: -4 damage. 4 Mana: -2 damage. 6 Mana: Add 1 Rank damage die."
      },
      {
        "rank": 10,
        "text": "+1d4 base damage, and the missiles deal Force and Fire damage. The target gains the Burned Debuff."
      },
      {
        "rank": 15,
        "text": "This attack deals base damage x3."
      }
    ],
    "page": 208,
    "source": "Core"
  },
  {
    "name": "Mind Tickle",
    "mana": 2,
    "type": "attack",
    "stat": "CHA",
    "passive": false,
    "aiFavor": 2,
    "desc": "You infect your target with a small headache. Range 40 feet. Base Damage: 1d2 + CHA Psychic. Favored: Cleric.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d2 base damage."
      },
      {
        "rank": 10,
        "text": "+1d2 base damage, and the target gains the Sore as Shit Debuff."
      },
      {
        "rank": 15,
        "text": "+1d2 base damage, and the target gains the Muted Debuff."
      }
    ],
    "page": 208,
    "source": "Core"
  },
  {
    "name": "Minion Army",
    "mana": 50,
    "type": "utility",
    "stat": "INT",
    "passive": false,
    "desc": "When you cast this spell, choose a target within range. On a Standard Success, 1 in 50 Mobs in the affected area (min 1) become an ally and fight for you without needing to command them. Higher levels of success can turn additional Mobs into allies (GM's discretion). Range: 50 ft Burst radius. Duration: 2 minutes. Cooldown: 5 hours. 5-minute casting time, and the caster cannot move while casting. Only works against Mobs with an Intelligence of 2+.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The casting time is 4 minutes. Duration is 5 minutes."
      },
      {
        "rank": 10,
        "text": "Add your Charisma Stat to the Burst radius. Duration is 10 minutes."
      },
      {
        "rank": 15,
        "text": "Add your Charisma Stat to the Burst radius. Duration is 15 minutes."
      }
    ],
    "page": 209,
    "source": "Core"
  },
  {
    "name": "Nature's Breath",
    "mana": 6,
    "type": "heal",
    "stat": "INT",
    "passive": true,
    "desc": "You blow cool, fresh air over the target's wounds (could be yourself), healing them. Roll a Nature's Breath Rank damage die. That is how many Health Bar slots the target heals. May also target pets and minions. Range 5 feet. Favored: Druid.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Add 1 to your die roll."
      },
      {
        "rank": 10,
        "text": "Add 1 to your die roll, and remove a Minor Injury Debuff."
      },
      {
        "rank": 15,
        "text": "Add 1 to your die roll, and remove a Major Injury Debuff."
      }
    ],
    "page": 209,
    "source": "Core"
  },
  {
    "name": "Oakhide",
    "mana": 5,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "Your skin turns into solid wood, giving you great protection. You have +2 Damage Resistance for the duration of this spell. Range: Self. Duration: 2 minutes. Cooldown: 10 minutes. Favored: Druid.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+2 DR. Duration is 3 minutes."
      },
      {
        "rank": 10,
        "text": "+2 DR. You may target party members and NPCs up to 10 feet away with this spell."
      },
      {
        "rank": 15,
        "text": "+2 DR. Duration is 4 minutes."
      }
    ],
    "page": 209,
    "source": "Core"
  },
  {
    "name": "Paladin's Smite",
    "mana": 11,
    "type": "attack",
    "stat": "CHA",
    "passive": false,
    "desc": "You channel a torrent of divine wrath toward a soon-to-be repentant foe. Range 30 feet. Base Damage: 1d8 + CHA Holy. Favored: Paladin.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d8 base damage."
      },
      {
        "rank": 10,
        "text": "+1d8 base damage, and the target gains the Take Down Debuff."
      },
      {
        "rank": 15,
        "text": "+1d8 base damage, and the damage is Armor-Piercing (ignores DR)."
      }
    ],
    "page": 209,
    "source": "Core"
  },
  {
    "name": "Panty Dropper",
    "mana": 10,
    "type": "utility",
    "stat": "CHA",
    "passive": false,
    "desc": "Make an INT-Opposed Spell Check against a non-Boss target, even in combat. On Success, the target wants to jump your bones and won't let anyone stop them (they cease attacking or doing other things). Range 10 feet. Duration: 2 minutes or until you finish. Cooldown: 5 minutes. Favored: Bard.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The duration is 5 minutes."
      },
      {
        "rank": 10,
        "text": "The duration is 10 minutes."
      },
      {
        "rank": 15,
        "text": "The duration is 15 minutes."
      }
    ],
    "page": 209,
    "source": "Core"
  },
  {
    "name": "Ping",
    "mana": 5,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "Sends out an audible ping that gives the distance and location of all non-crawlers and non-red-tagged Mobs in a circle around you. It will mark targets beyond the range of your map. You receive information about the Mobs that is \"somewhat complete.\" Targets hit with Ping will hear an audible ping noise, but they will not know where the ping originated. Environmental factors and obstacles may increase or decrease range. Range: 1 mile Burst radius. Cooldown: 5 minutes.",
    "upgrades": [
      {
        "rank": 5,
        "text": "If you know the Fear Spell, you may cast it at no Action cost to affect all eligible Mobs within the Ping range. You only pay the Mana."
      },
      {
        "rank": 10,
        "text": "Environmental factors and obstacles no longer decrease the range, and you receive \"mostly complete\" information."
      },
      {
        "rank": 15,
        "text": "You pay no Mana to add the Fear Spell, and you receive \"entirely complete\" information."
      }
    ],
    "page": 210,
    "source": "Core"
  },
  {
    "name": "Protective Shell",
    "mana": 0,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You create a 10 + INT-foot Burst radius magic shell around yourself and nearby party members. This shell pushes away all Mobs in its Area, which is the shell's radius + 5 ft. Mobs cannot enter the shell (unless non-corporeal) or physically attack those inside. The shell does not protect against magic effects. Crawlers inside may attack as usual. Range: 10 ft Burst radius. Duration: 5 seconds (only long enough to push foes away and protect against a single physical attack). Cooldown: 30 hours. Spell must be imbued onto something you are wearing. The shell cannot be moved by any means.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Duration is 10 seconds. In addition to knocking enemies away, it protects the occupants from all non-Spell attacks originating from outside the shell until the end of the current combat round."
      },
      {
        "rank": 10,
        "text": "Duration is 20 seconds or two rounds."
      },
      {
        "rank": 15,
        "text": "Duration is 30 seconds or three rounds."
      }
    ],
    "page": 210,
    "source": "Core"
  },
  {
    "name": "Puddle Jumper",
    "mana": 20,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You and up to 3 party members of your choice teleport to another location. Everyone feels a tingling sensation while waiting for the effect to resolve. Range: line-of-sight to the destination surface. There is a 10-second delay before the effect takes place. Cooldown: 5 hours.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The delay is 2 seconds, and the destination doesn't have to be a surface."
      },
      {
        "rank": 10,
        "text": "The delay is 1 second, and the destination can be anywhere within 1,000 yards in any direction, even if the exact destination cannot be seen."
      },
      {
        "rank": 15,
        "text": "There is no delay, and the destination can be anywhere within 1 mile in any direction, even if the exact destination cannot be seen."
      }
    ],
    "page": 210,
    "source": "Core"
  },
  {
    "name": "Rise, Dead Minion!",
    "mana": 10,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "At your command, a Medium (4) size skeleton emerges from the ground to attack your foe in melee combat, dealing 1d8 + INT Necrotic damage. After the Attack, the skeleton collapses, creating difficult terrain in the space it occupied. Range 30 feet. Duration: 1 round. Favored: Necromancer.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The skeleton attacks twice before collapsing."
      },
      {
        "rank": 10,
        "text": "The skeleton increases to size Large (5), and its Attack range is 10 feet. +1d8 base damage."
      },
      {
        "rank": 15,
        "text": "The skeleton increases to size Colossal (7), and its Attack range is 15 feet. Add one Rise, Dead Minion! Rank damage die to the damage."
      }
    ],
    "page": 211,
    "source": "Core"
  },
  {
    "name": "Rootfoot",
    "mana": 5,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "Roots reach up from the ground to ensnare a victim of up to Size 4 (Medium). On Success, the victim gains the Held Debuff. The Rank of this Spell is used in the Opposed Difficulty to escape, instead of the default STR. Range 30 feet. Duration: 2 rounds. Favored: Druid.",
    "upgrades": [
      {
        "rank": 5,
        "text": "Can target victims up to size Large (5). Duration is 3 rounds."
      },
      {
        "rank": 10,
        "text": "Can target victims up to size Huge (6). Duration is 4 rounds."
      },
      {
        "rank": 15,
        "text": "Can target victims up to size Colossal (7). The victim also gains the Poisoned Debuff."
      }
    ],
    "page": 211,
    "source": "Core"
  },
  {
    "name": "Second Chance",
    "mana": 10,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You raise a Mob with a level lower than your own from the dead. The Mob temporarily becomes your Undead Minion with half of its original Health Bar slots. You spend one Action to command it, then it acts independently with 1 Move Action and 1 other Action (usually an Attack) until given new instructions. Range 10 feet. Duration: 1 minute.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The Mob can be up to 5 levels higher than you, and the duration is 5 minutes."
      },
      {
        "rank": 10,
        "text": "The Mob can be up to 10 levels higher than the caster, with a duration of 15 minutes."
      },
      {
        "rank": 15,
        "text": "The Mob can be up to 15 levels higher than the caster, with a duration of 45 minutes."
      }
    ],
    "page": 211,
    "source": "Core"
  },
  {
    "name": "Shield",
    "mana": 8,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You are surrounded by a translucent force field that moves with you and reduces non-magic damage you take. The Shield has 2 Health Bar slots, each with your CON Mod. When you take damage, reduce these Health Bar slots first. The Spell ends early if the shield loses all its Health Bar slots. You can't heal a Shield. Range: Self. Duration: 5 minutes.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The Shield has 5 Health Bar slots."
      },
      {
        "rank": 10,
        "text": "The Shield has 10 Health Bar slots."
      },
      {
        "rank": 15,
        "text": "The Shield has 15 Health Bar slots."
      }
    ],
    "page": 211,
    "source": "Core"
  },
  {
    "name": "Shock Treatment",
    "mana": 2,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "aiFavor": 2,
    "desc": "Like a deranged emperor, bolts of electricity shoot out from your fingers. Range 30 feet. Base Damage: 1d2 + INT Electric.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d2 base damage, and you may choose to afflict the target with the Stunned Debuff instead of dealing damage."
      },
      {
        "rank": 10,
        "text": "+1d2 base damage, and add 1 Rank damage die (Electric) at the end of the round."
      },
      {
        "rank": 15,
        "text": "+1d2 base damage, and if you make this attack at melee range, you deal x5 the total damage."
      }
    ],
    "page": 212,
    "source": "Core"
  },
  {
    "name": "Solsplash",
    "mana": 13,
    "type": "attack",
    "stat": "CON",
    "passive": false,
    "desc": "Beams of concentrated \"sunlight\" fall upon the victim and those around them. Range 30 feet. Base Damage: 1d8 + CON Fire. Favored: Druid.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d8 base damage, +5ft Splash."
      },
      {
        "rank": 10,
        "text": "+1d8 base damage and +10ft Splash. Each affected entity who loses at least 3 Health Bar slots this way gains the Burned Debuff."
      },
      {
        "rank": 15,
        "text": "+1d8 base damage and +15ft Splash."
      }
    ],
    "page": 212,
    "source": "Core"
  },
  {
    "name": "Soul Collector",
    "mana": 4,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "aiFavor": 1,
    "desc": "With a twist of your hand, you siphon the spirit from your target. Range 50 feet. Base Damage: 1d4 + INT Necrotic.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d4 base damage, and if this Spell deals the killing blow to a foe of at least half your level, it deals +1 bonus damage until you complete a long rest. This damage bonus is cumulative up to the Spell's Rank."
      },
      {
        "rank": 10,
        "text": "+1d4 base damage, and the bonus continues for one week."
      },
      {
        "rank": 15,
        "text": "+1d4 base damage, and the bonus continues for as long as you remain on your current floor."
      }
    ],
    "page": 212,
    "source": "Core"
  },
  {
    "name": "Thunderlash",
    "mana": 12,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "You unleash a whip-like emanation of pure sound which thunders through the air. Range 50 feet. Base Damage: 1d10 + INT Sonic.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d10 base damage."
      },
      {
        "rank": 10,
        "text": "+1d10 base damage, and this attack deals Armor-Piercing damage (ignores DR)."
      },
      {
        "rank": 15,
        "text": "+1d10 base damage, and you can change the range to a 15ft Cone attack."
      }
    ],
    "page": 212,
    "source": "Core"
  },
  {
    "name": "Torch",
    "mana": 1,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You create a magical orb of light that follows slightly above and behind you. It provides bright light for a 20 ft radius and dim light for a 20 ft radius past that. Range: Self. Duration: until you enter a saferoom or descend to a new floor.",
    "upgrades": [
      {
        "rank": 5,
        "text": "You can move the orb up to 20 feet away from you."
      },
      {
        "rank": 10,
        "text": "You can move the orb up to 60 feet away from you and can double the radius of the brightness with a thought."
      },
      {
        "rank": 15,
        "text": "You can move the orb up to 100 feet away from you and attach it to a surface as an Action."
      }
    ],
    "page": 212,
    "source": "Core"
  },
  {
    "name": "Tripper",
    "mana": 0,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "With a snap of your fingers, every movement, heat, and weight-triggered trap in the area \"goes off.\" Blades swing, bombs blow, and creatures are released. Range: 30 ft Burst radius. Cooldown: 5 hours. Does not detonate traps with very specific triggers. Must be imbued onto something you are wearing.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+Intelligence Burst radius."
      },
      {
        "rank": 10,
        "text": "+Intelligence Burst radius."
      },
      {
        "rank": 15,
        "text": "+Intelligence Burst radius, and all damage taken is considered Splash (half damage)."
      }
    ],
    "page": 213,
    "source": "Core"
  },
  {
    "name": "Turn Undead",
    "mana": 9,
    "type": "attack",
    "stat": "CHA",
    "passive": false,
    "desc": "Make a single CHA-Opposed Spell Check vs. the Undead Mobs in the affected area. On Success, the Undead Mob runs away for the duration of the Spell. Range: 10 ft Cone. Duration: 3 rounds. Cooldown: 5 minutes. Does not work against Bosses. Favored: Bard, Cleric, & Paladin.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+5ft Cone. Duration is 5 rounds."
      },
      {
        "rank": 10,
        "text": "+10ft Cone. Duration is 10 rounds."
      },
      {
        "rank": 15,
        "text": "+15ft Cone. Duration is 15 rounds. On an Amazing Success or better, the Undead Mob is destroyed."
      }
    ],
    "page": 213,
    "source": "Core"
  },
  {
    "name": "Twinkle Toes",
    "mana": 2,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "Target a pet or minion within range. It has Move x2 for the duration. Range 5 feet. Duration: a number of seconds equal to your Intelligence.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The pet or minion has Move x3 for the duration."
      },
      {
        "rank": 10,
        "text": "The pet or minion has Move x4 for the duration."
      },
      {
        "rank": 15,
        "text": "The pet or minion has Move x5 for the duration."
      }
    ],
    "page": 213,
    "source": "Core"
  },
  {
    "name": "Unnecessary Force",
    "mana": 13,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "A shockwave akin to that of an A-bomb crashes over your target. Range 40 feet. Base Damage: 1d12 + INT Force.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d12 base damage."
      },
      {
        "rank": 10,
        "text": "+1d12 base damage, and the target is pushed 10 feet."
      },
      {
        "rank": 15,
        "text": "+1d12 base damage, and the target is pushed 15 feet."
      }
    ],
    "page": 213,
    "source": "Core"
  },
  {
    "name": "Vine Porn",
    "mana": 3,
    "type": "attack",
    "stat": "CON",
    "passive": false,
    "aiFavor": 1,
    "desc": "Magical vines with pulsating veins shoot up from the ground or sprout from the target's own body to rip and tear and smack them around a bit. Range 20 feet. Base Damage: 1d4 + CON Piercing. Favored: Druid.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d4 base damage."
      },
      {
        "rank": 10,
        "text": "+1d4 base damage, and this Attack deals Armor-Piercing damage (ignores DR)."
      },
      {
        "rank": 15,
        "text": "+1d4 base damage. On a Critical Hit, the target takes x4 damage."
      }
    ],
    "page": 213,
    "source": "Core"
  },
  {
    "name": "Wall of Fire",
    "mana": 15,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "Creates a 30 ft-long x 7 ft-high x 2 ft-thick wall of fire. Base Damage: 1d2 Fire for every 1 ft of wall the victim passes through, and they gain the Burned Debuff. Range 30 feet. Duration: 2 rounds.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d2 base damage. The wall can be turned into a ring of fire. Duration is 5 rounds."
      },
      {
        "rank": 10,
        "text": "+1d2 base damage. Creates a 50ft-long x 10ft-high x 3ft-thick wall. Duration is 10 rounds."
      },
      {
        "rank": 15,
        "text": "+1d2 base damage. Creates a 100ft-long x 20ft-high x 5ft-thick wall. Duration is 15 rounds."
      }
    ],
    "page": 214,
    "source": "Core"
  },
  {
    "name": "Water Breathing",
    "mana": 2,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "The target can breathe underwater without issue. Range: Self. Duration: a number of seconds equal to the caster's Intelligence x3.",
    "upgrades": [
      {
        "rank": 5,
        "text": "You may now cast this upon others at a range of 5 feet."
      },
      {
        "rank": 10,
        "text": "The targets roll Swimming Skill Checks with Advantage."
      },
      {
        "rank": 15,
        "text": "You can target any or all individuals within a 15ft Burst radius."
      }
    ],
    "page": 214,
    "source": "Core"
  },
  {
    "name": "Web",
    "mana": 6,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "A cone of sticky webbing shoots from your fingers. Make a single Spell Attack Skill Check vs. each friend and foe's Evade (if any). On Success, that entity gains the Held Debuff. The Rank of this spell is used in the Opposed Difficulty to escape, instead of STR. Range: 20 ft Cone. Duration: 2 rounds.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+5ft Cone. Duration is 5 rounds."
      },
      {
        "rank": 10,
        "text": "+5ft Cone. Duration is 10 rounds."
      },
      {
        "rank": 15,
        "text": "+5ft Cone. Duration is 15 rounds."
      }
    ],
    "page": 214,
    "source": "Core"
  },
  {
    "name": "Wilbur's Slowbuild Fireblast",
    "mana": 60,
    "type": "attack",
    "stat": "INT",
    "passive": false,
    "desc": "This Spell can be cast and held as a swirling ring of fire around your ring finger until you unleash it. Only one ring may be held at a time. The next time you perform an Attack Action, it must be this Spell (at no additional Mana cost). If anyone touches the ring with the intent to diffuse it (you may oppose that Action), the Attack hits them for half damage. The appendage they touched you with smolders, useless for a number of rounds equal to the damage inflicted. Range 50 feet. Base Damage: 1d8 + INT Fire, and the target gains the Burned Debuff.",
    "upgrades": [
      {
        "rank": 5,
        "text": "+1d8 base damage. For each full day you hold the spell, +1d8 Fire damage."
      },
      {
        "rank": 10,
        "text": "+1d8 base damage and +5ft Splash."
      },
      {
        "rank": 15,
        "text": "+1d8 base damage and +5ft Splash."
      }
    ],
    "page": 214,
    "source": "Core"
  },
  {
    "name": "Wisp Armor",
    "mana": 5,
    "type": "utility",
    "stat": "INT",
    "passive": true,
    "desc": "You conjure a protective barrier that reduces all magic damage (typically Spells) down to its Rank 1 base damage (1 die + Stat Mod) without any Upgrades or other bonuses. This Spell also makes you immune to Mind Control. Range: Self. Duration: 5 minutes. Cooldown: 5 minutes.",
    "upgrades": [
      {
        "rank": 5,
        "text": "The duration is 10 minutes."
      },
      {
        "rank": 10,
        "text": "The duration is 15 minutes."
      },
      {
        "rank": 15,
        "text": "The duration is 20 minutes."
      }
    ],
    "page": 214,
    "source": "Core"
  }
];
