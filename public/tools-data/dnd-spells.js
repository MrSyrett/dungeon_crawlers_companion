// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
const DND_SPELLS = [
  {
    "name": "Acid Splash",
    "level": 0,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Hurl a bubble of acid at one creature, or at two creatures that are within 5 feet of each other. Each target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
    "higherLevels": "The damage climbs by one die at higher levels: 2d6 at level 5, 3d6 at level 11, and 4d6 at level 17.",
    "source": "srd"
  },
  {
    "name": "Blade Ward",
    "level": 0,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "1 Round",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You weave a warding gesture that armors you against physical harm. Until the end of your next turn, you have resistance to bludgeoning, piercing, and slashing damage.",
    "source": "srd"
  },
  {
    "name": "Chill Touch",
    "level": 0,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Channeling grave energy into your hand, you make a melee spell attack against a creature. On a hit it takes 1d10 necrotic damage and can't regain hit points until the start of your next turn.",
    "higherLevels": "The necrotic damage increases by 1d10 at level 5 (2d10), level 11 (3d10), and level 17 (4d10).",
    "source": "srd"
  },
  {
    "name": "Dancing Lights",
    "level": 0,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a bit of phosphorus or wychwood, or a glowworm)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You conjure up to four torch-sized lights (or merge them into one faintly humanoid glowing form) that hover in the air and shed dim light in a 10-foot radius. As a Bonus Action you can move the lights up to 60 feet, and any light that leaves the spell's range winks out.",
    "source": "srd"
  },
  {
    "name": "Druidcraft",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You produce a small natural effect: forecast the next day's weather, make a flower bloom or a seed pod burst, create a harmless sensory sign like a puff of wind or a whiff of scent, or light or snuff a small flame such as a candle or campfire.",
    "source": "srd"
  },
  {
    "name": "Eldritch Blast",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock"
    ],
    "description": "You launch a crackling beam of eldritch force at a creature, making a ranged spell attack. On a hit the target takes 1d10 force damage.",
    "higherLevels": "You create additional beams at higher levels: two at level 5, three at level 11, and four at level 17. Each beam can strike the same or different targets, and you make a separate attack roll for each.",
    "source": "srd"
  },
  {
    "name": "Elementalism",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You conjure a minor elemental effect within range: kick up a brief gust of wind, raise or clear a small patch of fog, briefly modify the appearance of nearby earth or stone, dampen or dry an object, or send a shower of harmless sparks. The effects are cosmetic and cause no damage.",
    "source": "phb"
  },
  {
    "name": "Fire Bolt",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You hurl a mote of flame at a creature or object, making a ranged spell attack. On a hit the target takes 1d10 fire damage, and a flammable object that isn't being worn or carried catches fire.",
    "higherLevels": "The fire damage increases by 1d10 at level 5 (2d10), level 11 (3d10), and level 17 (4d10).",
    "source": "srd"
  },
  {
    "name": "Friends",
    "level": 0,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "10 feet",
    "components": "S, M (a small amount of makeup applied to the face as this spell is cast)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You gain an edge in dealing with one creature that isn't hostile toward you, giving yourself Advantage on Charisma checks you make to influence it for the duration. When the spell ends the creature realizes you used magic to sway it and may become hostile.",
    "source": "srd"
  },
  {
    "name": "Guidance",
    "level": 0,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You touch a willing creature and lend it a spark of divine insight. Once before the spell ends, the target can roll 1d4 and add the result to one ability check of its choice, deciding to use it after seeing the roll but before knowing the outcome.",
    "source": "srd"
  },
  {
    "name": "Light",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, M (a firefly or phosphorescent moss)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You touch an object no larger than 10 feet in any dimension, causing it to shed bright light in a 20-foot radius and dim light for another 20 feet. A target held by an unwilling creature can avoid the effect with a Dexterity saving throw, and you can dismiss the light by recasting the spell.",
    "source": "srd"
  },
  {
    "name": "Mage Hand",
    "level": 0,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A spectral floating hand appears at a point you choose within range. As an Action you can control it to manipulate objects, open unlocked doors or containers, or pour out a vial's contents, and it can carry up to 10 pounds. It can't attack, activate magic items, or move more than 30 feet from you.",
    "source": "srd"
  },
  {
    "name": "Mending",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "1 Minute",
    "range": "Touch",
    "components": "V, S, M (two lodestones)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You repair a single break or tear in an object you touch, such as a snapped chain link, two halves of a broken key, a torn cloak, or a leaking wineskin, so long as the damage is no larger than 1 foot in any dimension. The spell leaves no trace of the former damage but can't restore magic to a broken magic item.",
    "source": "srd"
  },
  {
    "name": "Message",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a short piece of copper wire)",
    "duration": "1 Round",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You point toward a creature within range and murmur a message that only that target can hear, and it can whisper a reply that only you hear. The message can travel around corners and through barriers but is blocked by 1 foot of stone, an inch of common metal, a thin sheet of lead, or 3 feet of wood.",
    "source": "srd"
  },
  {
    "name": "Mind Sliver",
    "level": 0,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You drive a spike of psychic noise into a creature's mind. It must make an Intelligence saving throw, taking 1d6 psychic damage on a failure and subtracting 1d4 from its next saving throw made before the end of your next turn.",
    "higherLevels": "The psychic damage increases by 1d6 at level 5 (2d6), level 11 (3d6), and level 17 (4d6).",
    "source": "phb"
  },
  {
    "name": "Minor Illusion",
    "level": 0,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "S, M (a bit of fleece)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You create either a sound or an image of an object (no larger than a 5-foot cube) within range for the duration. A creature that studies the illusion can make an Intelligence (Investigation) check against your spell save DC to discern it as false, and physical interaction reveals a visual illusion because objects pass through it.",
    "source": "srd"
  },
  {
    "name": "Poison Spray",
    "level": 0,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You spray a puff of noxious gas at a creature within range. The target must succeed on a Constitution saving throw or take 1d12 poison damage.",
    "higherLevels": "The poison damage increases by 1d12 at level 5 (2d12), level 11 (3d12), and level 17 (4d12).",
    "source": "srd"
  },
  {
    "name": "Prestidigitation",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "10 feet",
    "components": "V, S",
    "duration": "Up to 1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You perform a minor magical trick within range: create a harmless sensory effect, instantly light or snuff a small flame, clean or soil an object up to 1 cubic foot, chill, warm, or flavor nonliving material, produce a trinket or illusory mark that lasts a round, or leave a small color or symbol on a surface. You can keep up to three non-instantaneous effects going at once.",
    "source": "srd"
  },
  {
    "name": "Produce Flame",
    "level": 0,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "10 Minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "A flickering flame appears in your hand, shedding bright light in a 10-foot radius and dim light for another 10 feet without harming you or your gear. On the same turn or a later one you can fling the flame at a creature within 60 feet as a ranged spell attack, dealing 1d8 fire damage on a hit and ending the spell.",
    "higherLevels": "The fire damage increases by 1d8 at level 5 (2d8), level 11 (3d8), and level 17 (4d8).",
    "source": "srd"
  },
  {
    "name": "Ray of Frost",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A freezing beam streaks toward a creature as a ranged spell attack. On a hit the target takes 1d8 cold damage and its Speed is reduced by 10 feet until the start of your next turn.",
    "higherLevels": "The cold damage increases by 1d8 at level 5 (2d8), level 11 (3d8), and level 17 (4d8).",
    "source": "srd"
  },
  {
    "name": "Resistance",
    "level": 0,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a miniature cloak)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You touch a willing creature and bolster its defenses. Once before the spell ends, the target can roll 1d4 and add the result to one saving throw of its choice, deciding to use it after rolling but before learning whether it succeeds.",
    "source": "srd"
  },
  {
    "name": "Sacred Flame",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Radiant fire descends on a creature you can see within range. It must succeed on a Dexterity saving throw or take 1d8 radiant damage, and the target gains no benefit from cover for this save.",
    "higherLevels": "The radiant damage increases by 1d8 at level 5 (2d8), level 11 (3d8), and level 17 (4d8).",
    "source": "srd"
  },
  {
    "name": "Shillelagh",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S, M (mistletoe, a shamrock leaf, and a club or quarterstaff)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You imbue a club or quarterstaff you're holding with nature's power. For the duration the weapon counts as magical, you can use your spellcasting ability instead of Strength for its attack and damage rolls, and its damage die becomes 1d8 dealing force damage. The effect ends early if you cast the spell again or let go of the weapon.",
    "source": "srd"
  },
  {
    "name": "Shocking Grasp",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Lightning arcs from your hand as you make a melee spell attack, with Advantage if the target is wearing armor made of metal. On a hit the creature takes 1d8 lightning damage and can't make Opportunity Attacks until the start of its next turn.",
    "higherLevels": "The lightning damage increases by 1d8 at level 5 (2d8), level 11 (3d8), and level 17 (4d8).",
    "source": "srd"
  },
  {
    "name": "Sorcerous Burst",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer"
    ],
    "description": "You fling raw sorcerous energy at a creature or object as a ranged spell attack, dealing 1d8 damage of a type you choose from acid, cold, fire, lightning, poison, psychic, or thunder. Whenever you roll the maximum on one of these dice you can roll an additional die and add it, though the total number of dice can't exceed your spellcasting ability modifier.",
    "higherLevels": "The base damage increases by 1d8 at level 5 (2d8), level 11 (3d8), and level 17 (4d8), before any bonus dice from rolling maximums.",
    "source": "phb"
  },
  {
    "name": "Spare the Dying",
    "level": 0,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "15 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You steady the failing life of a creature within range that has 0 hit points, instantly stabilizing it so it no longer needs to make death saving throws. The spell has no effect on Undead or Constructs.",
    "higherLevels": "The range grows with level: 30 feet at level 5, 60 feet at level 11, and 120 feet at level 17.",
    "source": "srd"
  },
  {
    "name": "Starry Wisp",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid"
    ],
    "description": "You fling a mote of light at a creature as a ranged spell attack, dealing 1d8 radiant damage on a hit. A struck target also sheds dim light in a 10-foot radius and can't benefit from the Invisible condition until the end of your next turn.",
    "higherLevels": "The radiant damage increases by 1d8 at level 5 (2d8), level 11 (3d8), and level 17 (4d8).",
    "source": "phb"
  },
  {
    "name": "Thaumaturgy",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V",
    "duration": "Up to 1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You produce a minor wonder within range: amplify your voice to three times its normal volume, cause flames to flare, dim, or change color, make the ground tremble harmlessly, create an ominous sound, throw open or slam shut an unlocked door or window, or alter the appearance of your eyes. You can sustain up to three of these effects at once and end them as an Action.",
    "source": "srd"
  },
  {
    "name": "Thorn Whip",
    "level": 0,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (the stem of a plant with thorns)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You conjure a vine-like whip covered in thorns and lash out with a melee spell attack against a creature within range. On a hit the target takes 1d6 piercing damage, and if it is Large or smaller you can pull it up to 10 feet closer to you.",
    "higherLevels": "The piercing damage increases by 1d6 at level 5 (2d6), level 11 (3d6), and level 17 (4d6).",
    "source": "srd"
  },
  {
    "name": "Thunderclap",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (5-foot Radius)",
    "components": "S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You unleash a burst of thunderous sound audible up to 100 feet away. Each creature other than you within 5 feet must make a Constitution saving throw, taking 1d6 thunder damage on a failure.",
    "higherLevels": "The thunder damage increases by 1d6 at level 5 (2d6), level 11 (3d6), and level 17 (4d6).",
    "source": "phb"
  },
  {
    "name": "Toll the Dead",
    "level": 0,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard"
    ],
    "description": "A mournful bell tolls around a creature you can see within range. It must make a Wisdom saving throw or take 1d8 necrotic damage, which becomes 1d12 if the target is already missing any of its hit points.",
    "higherLevels": "The damage die increases at higher levels: 2d8 or 2d12 at level 5, 3d8 or 3d12 at level 11, and 4d8 or 4d12 at level 17.",
    "source": "phb"
  },
  {
    "name": "True Strike",
    "level": 0,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "S, M (a weapon worth 1+ CP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Guided by divine insight, you make one attack with a weapon you're holding as part of casting this spell. You can use your spellcasting ability instead of Strength or Dexterity for the attack and damage rolls, and on a hit you may deal radiant damage in place of the weapon's normal damage type.",
    "higherLevels": "On a hit the attack deals extra radiant damage: 1d6 at level 5, 2d6 at level 11, and 3d6 at level 17.",
    "source": "srd"
  },
  {
    "name": "Vicious Mockery",
    "level": 0,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard"
    ],
    "description": "You hurl a string of magically charged insults at a creature that can hear you. It must succeed on a Wisdom saving throw or take 1d6 psychic damage and have Disadvantage on the next attack roll it makes before the end of its next turn.",
    "higherLevels": "The psychic damage increases by 1d6 at level 5 (2d6), level 11 (3d6), and level 17 (4d6).",
    "source": "srd"
  },
  {
    "name": "Word of Radiance",
    "level": 0,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (5-foot Radius)",
    "components": "V, M (a holy symbol)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Burning radiance flares out from you toward foes of your choice. Each creature you pick within 5 feet must make a Constitution saving throw or take 1d6 radiant damage.",
    "higherLevels": "The radiant damage increases by 1d6 at level 5 (2d6), level 11 (3d6), and level 17 (4d6).",
    "source": "phb"
  },
  {
    "name": "Alarm",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "1 Minute",
    "range": "30 feet",
    "components": "V, S, M (a bell and silver wire)",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Ranger",
      "Wizard"
    ],
    "description": "You ward a door, window, or an area up to a 20-foot cube for the duration. When a creature you didn't exempt touches or enters the warded zone, you receive an alert. You choose a mental alarm that only wakes you if within 1 mile, or an audible chime that anyone nearby can hear for 10 seconds.",
    "source": "srd"
  },
  {
    "name": "Animal Friendship",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a morsel of food)",
    "duration": "24 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "description": "You attempt to convince a Beast that you mean it no harm. A target with Intelligence 4 or higher is unaffected; otherwise it makes a Wisdom saving throw and, on a failure, gains the Charmed condition toward you for the duration.",
    "higherLevels": "Using a level 2 slot or higher lets you target one additional Beast per slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Armor of Agathys",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S, M (a cup of water)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock"
    ],
    "description": "A protective frost surrounds you, granting 5 Temporary Hit Points. While those Temporary Hit Points last, any creature that hits you with a melee attack takes 5 Cold damage.",
    "higherLevels": "Both the Temporary Hit Points and the Cold damage increase by 5 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Arms of Hadar",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self (10-foot Radius)",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock"
    ],
    "description": "Dark tendrils erupt from you and lash every creature within 10 feet. Each makes a Strength saving throw, taking 2d6 Necrotic damage on a failure or half as much on a success. A creature that fails also can't take Reactions until its next turn.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Bane",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a drop of blood)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "description": "Up to three creatures you choose must succeed on a Charisma saving throw or be affected. An affected creature subtracts 1d4 from each attack roll and saving throw it makes until the spell ends.",
    "higherLevels": "You can target one additional creature for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Bless",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a Holy Symbol)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "You bless up to three creatures of your choice. Until the spell ends, each blessed creature adds 1d4 to every attack roll and saving throw it makes.",
    "higherLevels": "You can bless one additional creature for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Burning Hands",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (15-foot Cone)",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Flames spread from your fingertips in a 15-foot cone. Each creature in the area makes a Dexterity saving throw, taking 3d6 Fire damage on a failure or half as much on a success. Flammable objects in the area that aren't being worn or carried catch fire.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Charm Person",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You try to charm a Humanoid you can see. It makes a Wisdom saving throw, with Advantage if you or an ally are fighting it, and on a failure gains the Charmed condition toward you until the spell ends or you or your allies harm it. When the spell ends, the target knows it was charmed by you.",
    "higherLevels": "You can target one additional Humanoid for each spell slot level above 1, and they must be within 30 feet of each other.",
    "source": "srd"
  },
  {
    "name": "Chromatic Orb",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a diamond worth 50+ GP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You hurl an orb of energy, choosing Acid, Cold, Fire, Lightning, Poison, or Thunder for its type. Make a ranged spell attack; on a hit the target takes 3d8 damage of the chosen type. If you roll the same number on two or more of the damage dice, the orb leaps to a different creature within 30 feet, which you make a new attack roll against.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Color Spray",
    "level": 1,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Self (15-foot Cone)",
    "components": "V, S, M (a pinch of colorful powder)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A dazzling burst of color springs from your hand. Each creature in a 15-foot cone must succeed on a Constitution saving throw or gain the Blinded condition until the end of your next turn.",
    "source": "srd"
  },
  {
    "name": "Command",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Paladin"
    ],
    "description": "You speak a one-word command to a creature that can hear you. It makes a Wisdom saving throw and, on a failure, follows the command on its next turn. Typical commands include Approach, Drop, Flee, Grovel, or Halt; the spell fails on a creature that can't understand you or if your order is directly harmful to it.",
    "higherLevels": "You can affect one additional creature for each spell slot level above 1, and they must be within 30 feet of each other.",
    "source": "srd"
  },
  {
    "name": "Compelled Duel",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Bonus Action",
    "range": "30 feet",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "You challenge one creature to fight you. It makes a Wisdom saving throw and, on a failure, has Disadvantage on attack rolls against anyone but you and can't willingly move more than 30 feet away from you. The spell ends if you attack another creature, cast a spell on an enemy other than the target, harm the target with something other than an attack, or move more than 60 feet from it.",
    "source": "phb"
  },
  {
    "name": "Comprehend Languages",
    "level": 1,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a pinch of soot and salt)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "For the duration you understand the literal meaning of any spoken language you hear and of any written language you touch, though reading takes about a minute per page. The spell doesn't decode secret messages or symbols not part of a written language.",
    "source": "srd"
  },
  {
    "name": "Create or Destroy Water",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a drop of water if creating or a pinch of dust if destroying)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You either create up to 10 gallons of clean water in an open container or as rainfall within a 30-foot cube, or you destroy up to 10 gallons of water in a container or fog in that same-sized area.",
    "higherLevels": "You create or destroy an additional 10 gallons, or the cube grows by 5 feet, for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Cure Wounds",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "description": "A creature you touch regains Hit Points equal to 2d8 plus your spellcasting ability modifier. This spell has no effect on Undead or Constructs.",
    "higherLevels": "The healing increases by 2d8 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Detect Evil and Good",
    "level": 1,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "For the duration you sense the location of any Aberration, Celestial, Elemental, Fey, Fiend, or Undead within 30 feet, though not its identity. You also detect whether such a creature's magic has been used to consecrate or desecrate a place or object nearby. Full cover blocks the sense.",
    "source": "srd"
  },
  {
    "name": "Detect Magic",
    "level": 1,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": true,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "For the duration you sense the presence of magic within 30 feet. As an action you can focus on a visible aura you detect to learn its school of magic. Full cover blocks the sense.",
    "source": "srd"
  },
  {
    "name": "Detect Poison and Disease",
    "level": 1,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a yew leaf)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": true,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "description": "For the duration you sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet, and you identify the kind of poison, creature, or malady. Full cover blocks the sense.",
    "source": "srd"
  },
  {
    "name": "Disguise Self",
    "level": 1,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You make yourself, including clothing and gear, look different for the duration, altering height by up to a foot and changing build. The change is purely visual, so physical inspection reveals the illusion, and a creature can use its action to make an Intelligence (Investigation) check against your spell save DC to see through it.",
    "source": "srd"
  },
  {
    "name": "Dissonant Whispers",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard"
    ],
    "description": "You whisper a discordant melody only one target can hear. It makes a Wisdom saving throw, taking 3d6 Psychic damage on a failure or half as much on a success. On a failure it must also immediately use its Reaction, if available, to move as far from you as it can by the safest route.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Divine Favor",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "Divine radiance charges your weapon strikes. Until the spell ends, each time you hit with a weapon the target takes an extra 1d4 Radiant damage.",
    "source": "srd"
  },
  {
    "name": "Divine Smite",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "Cast immediately after you hit a target with a melee weapon or an Unarmed Strike, this spell channels radiant power into the blow, dealing an extra 2d8 Radiant damage. The bonus rises to 3d8 if the target is a Fiend or Undead.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Ensnaring Strike",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "The next time you hit a creature with a weapon before the spell ends, grasping thorny vines erupt around it. The target makes a Strength saving throw or gains the Restrained condition until the spell ends. While restrained, it takes 1d6 Piercing damage at the start of each of its turns, and it can repeat the save on its turns to end the effect.",
    "higherLevels": "The Piercing damage increases by 1d6 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Entangle",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "Grasping weeds and vines sprout across a 20-foot square, turning it into Difficult Terrain. Each creature in the area when you cast the spell makes a Strength saving throw or gains the Restrained condition until the spell ends. A restrained creature can use its action to make a Strength (Athletics) check against your spell save DC to free itself.",
    "source": "srd"
  },
  {
    "name": "Expeditious Retreat",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "This spell lets you move at an incredible pace. When you cast it, and again as a Bonus Action on each of your later turns until it ends, you can take the Dash action.",
    "source": "srd"
  },
  {
    "name": "Faerie Fire",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid"
    ],
    "description": "Objects and creatures in a 20-foot cube are outlined in colored light. Each creature there makes a Dexterity saving throw; on a failure it is outlined for the duration. Attack rolls against an outlined creature or object have Advantage if the attacker can see it, and an outlined creature can't benefit from the Invisible condition.",
    "source": "srd"
  },
  {
    "name": "False Life",
    "level": 1,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a drop of alcohol)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A brief surge of necromantic vitality grants you 2d4 + 4 Temporary Hit Points.",
    "higherLevels": "You gain an additional 5 Temporary Hit Points for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Feather Fall",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Reaction",
    "range": "60 feet",
    "components": "V, M (a small feather or piece of down)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Cast as a Reaction when you or a creature within range falls, this spell slows the descent of up to five falling creatures to 60 feet per round. If a target lands before the spell ends, it takes no damage from the fall and can land on its feet, and the spell then ends for that creature.",
    "source": "srd"
  },
  {
    "name": "Find Familiar",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "1 Hour",
    "range": "10 feet",
    "components": "V, S, M (burning incense worth 10+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Wizard"
    ],
    "description": "You summon a spirit that takes the form of a Tiny animal familiar with its own stat block. It obeys your commands, acts on your turn, and can deliver your touch-range spells. While it's within 100 feet you can use your action to see and hear through its senses. If it drops to 0 Hit Points it vanishes, and you can recast the spell to return it.",
    "source": "srd"
  },
  {
    "name": "Fog Cloud",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You conjure a 20-foot-radius sphere of fog centered on a point in range, and the area is Heavily Obscured. A wind of moderate or greater speed disperses it.",
    "higherLevels": "The sphere's radius increases by 20 feet for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Goodberry",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a sprig of mistletoe)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You create up to ten berries infused with magic. A creature can use its Bonus Action to eat one, regaining 1 Hit Point, and a single berry also provides enough nourishment for a day. Uneaten berries lose their power after 24 hours.",
    "source": "srd"
  },
  {
    "name": "Grease",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a bit of pork rind or butter)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Slick grease coats a 10-foot square, making it Difficult Terrain for the duration. Each creature standing in the area when it appears makes a Dexterity saving throw or falls Prone, as does any creature that enters the area or ends its turn there.",
    "source": "srd"
  },
  {
    "name": "Guiding Bolt",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "1 Round",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You hurl a lance of light and make a ranged spell attack. On a hit the target takes 4d6 Radiant damage, and the next attack roll made against it before the end of your next turn has Advantage.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Hail of Thorns",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "The next time you hit a creature with a Ranged weapon before the spell ends, a burst of thorns rains down. Each creature within 5 feet of your target makes a Dexterity saving throw, taking 1d10 Piercing damage on a failure or half as much on a success.",
    "higherLevels": "The Piercing damage increases by 1d10 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Healing Word",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Bonus Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "description": "A creature of your choice that you can see regains Hit Points equal to 2d4 plus your spellcasting ability modifier. This spell has no effect on Undead or Constructs.",
    "higherLevels": "The healing increases by 2d4 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Hellish Rebuke",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Reaction",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock"
    ],
    "description": "Cast as a Reaction when a creature within range damages you, this spell wreathes your attacker in flame. It makes a Dexterity saving throw, taking 2d10 Fire damage on a failure or half as much on a success.",
    "higherLevels": "The damage increases by 1d10 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Heroism",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Paladin"
    ],
    "description": "A willing creature you touch is filled with bravery. Until the spell ends it is immune to the Frightened condition, and at the start of each of its turns it gains Temporary Hit Points equal to your spellcasting ability modifier.",
    "higherLevels": "You can target one additional creature for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Hex",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Bonus Action",
    "range": "90 feet",
    "components": "V, S, M (the petrified eye of a newt)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock"
    ],
    "description": "You curse a creature you can see. Until the spell ends, each time you hit it with an attack you deal an extra 1d6 Necrotic damage, and you choose one ability so the target has Disadvantage on checks made with it. If the target drops to 0 Hit Points, you can move the curse to a new creature as a Bonus Action.",
    "higherLevels": "With a level 3 or 4 slot the duration can last up to 8 hours; with a level 5+ slot it can last up to 24 hours.",
    "source": "srd"
  },
  {
    "name": "Hunter's Mark",
    "level": 1,
    "school": "Divination",
    "castingTime": "Bonus Action",
    "range": "90 feet",
    "components": "V",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "You mark a creature you can see as your quarry. Until the spell ends, each time you hit it with a weapon you deal an extra 1d6 Force damage, and you have Advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the target drops to 0 Hit Points, you can move the mark to a new creature as a Bonus Action.",
    "higherLevels": "With a level 3 or 4 slot the duration can last up to 8 hours; with a level 5+ slot it can last up to 24 hours.",
    "source": "srd"
  },
  {
    "name": "Ice Knife",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "S, M (a drop of water or a piece of ice)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You throw a shard of ice and make a ranged spell attack, dealing 1d10 Piercing damage on a hit. Hit or miss, the shard then bursts: each creature within 5 feet of the target makes a Dexterity saving throw, taking 2d6 Cold damage on a failure.",
    "higherLevels": "The Cold damage increases by 1d6 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Identify",
    "level": 1,
    "school": "Divination",
    "castingTime": "1 Minute",
    "range": "Touch",
    "components": "V, S, M (a pearl worth 100+ GP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You touch an object and learn whether it is magical, along with its properties, how to use them, whether it requires attunement, and how many charges it has. You also learn any spells currently affecting the item. Alternatively, touching a creature reveals what spells, if any, are currently affecting it.",
    "source": "srd"
  },
  {
    "name": "Illusory Script",
    "level": 1,
    "school": "Illusion",
    "castingTime": "1 Minute",
    "range": "Touch",
    "components": "S, M (ink worth 10+ GP, which the spell consumes)",
    "duration": "10 Days",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "You write on a surface so that the true message is hidden from all but the readers you designate, who perceive it plainly. Anyone else sees either meaningless marks or an innocuous alternate message you set. A creature with Truesight can read the hidden text.",
    "source": "srd"
  },
  {
    "name": "Inflict Wounds",
    "level": 1,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Necrotic energy floods a creature you touch. It makes a Constitution saving throw, taking 2d10 Necrotic damage on a failure or half as much on a success.",
    "higherLevels": "The damage increases by 1d10 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Jump",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a grasshopper's hind leg)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You touch a willing creature, and until the spell ends its jump distance is tripled.",
    "higherLevels": "You can target one additional creature for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Longstrider",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a pinch of dirt)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Ranger",
      "Wizard"
    ],
    "description": "You touch a creature, increasing its Speed by 10 feet until the spell ends.",
    "higherLevels": "You can target one additional creature for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Mage Armor",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a piece of cured leather)",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You touch a willing creature that isn't wearing armor, surrounding it with protective magical force. Its base Armor Class becomes 13 plus its Dexterity modifier until the spell ends or the creature dons armor.",
    "source": "srd"
  },
  {
    "name": "Magic Missile",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You create three glowing darts of force. Each dart automatically hits a creature of your choice that you can see within range, dealing 1d4 + 1 Force damage. You can direct all the darts at one target or split them among several.",
    "higherLevels": "You create one additional dart for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Protection from Evil and Good",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (Holy Water or powdered silver and iron, which the spell consumes)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin",
      "Warlock",
      "Wizard"
    ],
    "description": "Until the spell ends, a willing creature you touch is warded against Aberrations, Celestials, Elementals, Fey, Fiends, and Undead. Such creatures have Disadvantage on attack rolls against the target, and the target can't be Charmed, Frightened, or possessed by them; existing such conditions are suspended while the spell lasts.",
    "source": "srd"
  },
  {
    "name": "Purify Food and Drink",
    "level": 1,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "10 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin"
    ],
    "description": "All nonmagical food and drink within a 5-foot-radius sphere centered on a point in range is purified and rendered free of poison and disease.",
    "source": "srd"
  },
  {
    "name": "Ray of Sickness",
    "level": 1,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A ray of sickly green light streaks toward a target as a ranged spell attack. On a hit the target takes 2d8 Poison damage and must succeed on a Constitution saving throw or gain the Poisoned condition until the end of your next turn.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Sanctuary",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Bonus Action",
    "range": "30 feet",
    "components": "V, S, M (a small silver mirror)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You ward a creature you can see. Until the spell ends, any creature that tries to attack the target or affect it with a harmful spell must first make a Wisdom saving throw; on a failure it must choose a new target or lose the attack or spell. The protection ends if the warded creature makes an attack, casts a spell affecting an enemy, or deals damage.",
    "source": "srd"
  },
  {
    "name": "Searing Smite",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin",
      "Ranger"
    ],
    "description": "The next time you hit a creature with a weapon before the spell ends, your strike flares with fire for an extra 1d6 Fire damage and sets the target ablaze. At the start of each of its turns the burning creature takes 1d6 Fire damage until it or another creature uses an action to douse the flames, or it makes a successful Constitution saving throw to end the effect.",
    "higherLevels": "The initial extra Fire damage increases by 1d6 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Shield",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Reaction",
    "range": "Self",
    "components": "V, S",
    "duration": "1 Round",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Cast as a Reaction when you are hit by an attack or targeted by the Magic Missile spell, this invisible barrier grants you a +5 bonus to Armor Class until the start of your next turn, including against the triggering attack, and you take no damage from Magic Missile.",
    "source": "srd"
  },
  {
    "name": "Shield of Faith",
    "level": 1,
    "school": "Abjuration",
    "castingTime": "Bonus Action",
    "range": "60 feet",
    "components": "V, S, M (a Holy Symbol)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "A shimmering field surrounds a creature of your choice within range, granting it a +2 bonus to Armor Class for the duration.",
    "source": "srd"
  },
  {
    "name": "Silent Image",
    "level": 1,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a bit of fleece)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You create the image of an object, a creature, or another visible phenomenon no larger than a 15-foot cube. The illusion is purely visual, producing no sound, smell, or other sensory effect, and you can use your action to move it. A creature that studies it can make an Intelligence (Investigation) check against your spell save DC to discern it's an illusion.",
    "source": "srd"
  },
  {
    "name": "Sleep",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a pinch of sand or rose petals)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Magical drowsiness rolls across a 5-foot-radius sphere centered on a point you choose. Each creature there makes a Wisdom saving throw, and on a failure gains the Incapacitated condition until the spell ends. An affected creature repeats the save at the end of each of its turns, ending the effect on itself on a success, and the effect also ends if the creature takes damage.",
    "source": "srd"
  },
  {
    "name": "Speak with Animals",
    "level": 1,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "10 Minutes",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "description": "For the duration you can comprehend and verbally communicate with Beasts. You can question them and act on their answers, though their intelligence limits what they know and can convey, and at the GM's discretion you may be able to persuade one to perform a small favor.",
    "source": "srd"
  },
  {
    "name": "Tasha's Hideous Laughter",
    "level": 1,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a tart and a feather)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "A creature you choose perceives everything as hilarious. It makes a Wisdom saving throw or falls Prone, becoming Incapacitated and unable to stand for the duration. At the end of each of its turns, and each time it takes damage, it repeats the save, with Advantage if the save comes from taking damage, ending the effect on a success.",
    "source": "srd"
  },
  {
    "name": "Tenser's Floating Disk",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a drop of mercury)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Wizard"
    ],
    "description": "You create a floating, disk-shaped platform of force, about 3 feet across, that hovers at waist height and can hold up to 500 pounds. It stays within 20 feet of you and follows as you move over level ground; if you move too far away or it drops more than 20 feet in height, the spell ends.",
    "source": "srd"
  },
  {
    "name": "Thunderous Smite",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "The next time you hit a creature with a weapon before the spell ends, your strike booms with thunder for an extra 2d6 Thunder damage. The target must also succeed on a Strength saving throw or be pushed 10 feet away and knocked Prone.",
    "higherLevels": "The extra Thunder damage increases by 1d6 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Thunderwave",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (15-foot Cube)",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A wave of thunderous force sweeps out from you in a 15-foot cube. Each creature there makes a Constitution saving throw, taking 2d8 Thunder damage and being pushed 10 feet away on a failure, or half as much damage and no push on a success. Unsecured objects in the area are also pushed, and the spell emits a thunderous boom audible out to 300 feet.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Unseen Servant",
    "level": 1,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a piece of string and a bit of wood)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "You conjure an invisible, mindless force that performs simple tasks at your command. It has an Armor Class of 10, 1 Hit Point, and a Strength of 2, and it can do things a human servant could, like fetching, cleaning, or carrying. As a Bonus Action you can direct it to move up to 15 feet and act; the spell ends if the servant moves more than 60 feet from you or takes any damage.",
    "source": "srd"
  },
  {
    "name": "Witch Bolt",
    "level": 1,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a twig struck by lightning)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A beam of crackling energy leaps toward a target as a ranged spell attack, dealing 2d12 Lightning damage on a hit and forming an arcing tether. On each later turn you can use your Bonus Action to deal 1d12 Lightning damage to the target automatically. The link breaks if the target ever leaves the spell's range or moves out of your line of sight.",
    "higherLevels": "The initial damage increases by 1d12 for each spell slot level above 1.",
    "source": "srd"
  },
  {
    "name": "Wrathful Smite",
    "level": 1,
    "school": "Necromancy",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "The next time you hit a creature with a weapon before the spell ends, your strike carries dark energy for an extra 1d6 Psychic damage. The target must also succeed on a Wisdom saving throw or gain the Frightened condition, tied to you, until the spell ends; on its turn a frightened target can repeat the save to end the effect.",
    "higherLevels": "The extra Psychic damage increases by 1d6 for each spell slot level above 1.",
    "source": "phb"
  },
  {
    "name": "Acid Arrow",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (powdered rhubarb leaf and an adder's stomach)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Hurl a streaking arrow of acid at a target and make a ranged spell attack. A hit deals 4d4 acid damage immediately and another 2d4 acid at the end of the target's next turn. Even on a miss, the acid splashes for half the initial damage with no delayed effect.",
    "higherLevels": "Each slot level above 2nd increases both the initial and the delayed damage by 1d4.",
    "source": "srd"
  },
  {
    "name": "Aid",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a strip of white cloth)",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "description": "Bolster up to three creatures you can see for the duration. Each target's Hit Point maximum and current Hit Points both rise by 5 while the spell lasts.",
    "higherLevels": "Each slot level above 2nd increases the bonus Hit Points by 5.",
    "source": "srd"
  },
  {
    "name": "Alter Self",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Reshape your own body in one of three ways for the duration. You can gain gills and a swim speed, alter your appearance and voice at will, or grow natural weapons that count as magical and deal 1d6 of the chosen type. You may switch between the three options as an action while the spell holds.",
    "source": "srd"
  },
  {
    "name": "Animal Messenger",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a morsel of food)",
    "duration": "24 Hours",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "description": "Direct a Tiny beast you can see to carry a short spoken message to a location you describe. The animal travels toward a recipient you name, delivering up to 25 words when it arrives.",
    "higherLevels": "Each slot level above 2nd adds 48 hours to the delivery time.",
    "source": "srd"
  },
  {
    "name": "Arcane Lock",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (gold dust worth 25+ GP, which the spell consumes)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "Magically seal a door, chest, or other closure so it counts as locked. You and creatures you designate can open it normally, and you may set a password that bypasses the seal. Breaking it open or picking the lock is much harder, raising the relevant DC by 10.",
    "source": "srd"
  },
  {
    "name": "Arcane Vigor",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Draw on your own vitality to heal yourself. Spend and roll one or two of your unspent Hit Point Dice, regaining Hit Points equal to the total plus your spellcasting ability modifier.",
    "higherLevels": "Each slot level above 2nd lets you roll one additional Hit Point Die.",
    "source": "phb"
  },
  {
    "name": "Augury",
    "level": 2,
    "school": "Divination",
    "castingTime": "1 Minute",
    "range": "Self",
    "components": "V, S, M (specially marked sticks, bones, or cards worth 25+ GP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "description": "Consult an otherworldly force about a specific course of action you plan to take within the next 30 minutes. You receive one of four omens: weal for good, woe for bad, weal and woe for a mix, or nothing for an outcome that is neutral or beyond the spell's reach. Casting it repeatedly on the same question risks a random, misleading result.",
    "source": "srd"
  },
  {
    "name": "Barkskin",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Touch",
    "components": "V, S, M (a handful of oak bark)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "Toughen a willing creature's skin to a bark-like hide. For the duration the target's Armor Class cannot drop below 17, regardless of any armor it wears.",
    "source": "srd"
  },
  {
    "name": "Blindness/Deafness",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Strike a creature with sudden loss of a sense. It must succeed on a Constitution save or become Blinded or Deafened (your choice) for the duration. The target repeats the save at the end of each of its turns, ending the effect on a success.",
    "higherLevels": "Each slot level above 2nd lets you target one additional creature.",
    "source": "srd"
  },
  {
    "name": "Blur",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Your outline becomes shifting and indistinct. Attack rolls against you have Disadvantage unless the attacker can perceive you without relying on sight or ignores the effect through some other sense.",
    "source": "srd"
  },
  {
    "name": "Branding Smite",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "Cast this after hitting a target with a weapon attack to sear it with radiant light. The strike deals an extra 2d6 radiant damage, and the target sheds dim light in a 5-foot radius and can't turn Invisible until the spell ends.",
    "higherLevels": "Each slot level above 2nd increases the extra radiant damage by 1d6.",
    "source": "srd"
  },
  {
    "name": "Calm Emotions",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "description": "Soothe the feelings of humanoids in a 20-foot-radius sphere. Each affected creature must make a Charisma save; on a failure you may either suppress any Charmed or Frightened condition on it, or make it indifferent toward creatures of your choice that it is hostile to, until the spell ends or it is harmed.",
    "source": "srd"
  },
  {
    "name": "Cloud of Daggers",
    "level": 2,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a sliver of glass)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Fill a 5-foot cube with whirling spectral blades. A creature takes 4d4 slashing damage when it enters the cube for the first time on a turn or starts its turn there.",
    "higherLevels": "Each slot level above 2nd increases the damage by 2d4.",
    "source": "srd"
  },
  {
    "name": "Continual Flame",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (ruby dust worth 50+ GP, which the spell consumes)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Wizard"
    ],
    "description": "Create a heatless, flickering flame on an object you touch that looks like fire but consumes no fuel and can't be extinguished by wind or water. It sheds bright light in a 20-foot radius and dim light for another 20 feet until dispelled.",
    "source": "srd"
  },
  {
    "name": "Crown of Madness",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Force a humanoid to make a Wisdom save or fall under a maddening compulsion, a twisted crown of spikes appearing on its head. On each of its turns it must use its action to make a melee attack against a creature you mentally choose, or else waste the action if none is reachable. The target can repeat the save at the end of each of its turns to break free.",
    "source": "srd"
  },
  {
    "name": "Darkness",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, M (bat fur and a drop of pitch or a lump of coal)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Flood a 15-foot-radius sphere with magical darkness that ordinary light cannot pierce and that even Darkvision cannot see through. You may anchor it to a point in space or to an object you can hold or wear. If it overlaps light from a spell of 2nd level or lower, that light is snuffed out.",
    "source": "srd"
  },
  {
    "name": "Darkvision",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (dried carrot or an agate)",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Grant a willing creature you touch the ability to see in the dark. For the duration it gains Darkvision out to a range of 150 feet.",
    "source": "srd"
  },
  {
    "name": "Detect Thoughts",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a copper coin)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Sense the surface thoughts of a creature within 30 feet. Each turn you can focus on one target to read what's on its mind, and by pressing deeper you can probe further, forcing a Wisdom save; on a failure you learn its reasoning and emotional state, while a success ends the reading and alerts the creature. You can also sweep the area to detect thinking minds you can't see.",
    "source": "srd"
  },
  {
    "name": "Enhance Ability",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Ranger",
      "Sorcerer"
    ],
    "description": "Bless a creature you touch with magical enhancement tied to one ability score. For the duration it gains Advantage on ability checks using that score; some choices add a further benefit, such as temporary Hit Points or negating fall damage.",
    "higherLevels": "Each slot level above 2nd lets you target one additional creature.",
    "source": "srd"
  },
  {
    "name": "Enlarge/Reduce",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a pinch of powdered iron)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Grow or shrink a creature or object by one size category. Enlarging grants Advantage on Strength checks and saves and adds 1d4 to the target's weapon damage; reducing imposes Disadvantage on those checks and saves and subtracts 1d4 from its weapon damage. An unwilling creature can resist with a Constitution save.",
    "source": "srd"
  },
  {
    "name": "Enthrall",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock"
    ],
    "description": "Weave a distracting stream of words that grips the creatures you choose within range. Each must make a Wisdom save or have Disadvantage on Wisdom (Perception) checks made to perceive any creature other than you for the duration.",
    "source": "srd"
  },
  {
    "name": "Find Steed",
    "level": 2,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "Summon a loyal spirit that takes the form of a mount, appearing in an unoccupied space nearby. The steed is a Celestial, Fey, or Fiend and shares a telepathic bond with you, acting as your ally and following your commands. If it drops to 0 Hit Points it vanishes, and you can dismiss and later resummon it.",
    "source": "srd"
  },
  {
    "name": "Find Traps",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Ranger"
    ],
    "description": "Sense whether any trap lies within range and line of sight. You learn that a trap is present and its general nature, but not its exact location or how to disarm it.",
    "source": "srd"
  },
  {
    "name": "Flame Blade",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S, M (a sumac leaf)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer"
    ],
    "description": "Conjure a blazing scimitar of fire in your hand. You can make melee spell attacks with it for 3d6 fire damage, and it sheds bright light in a 10-foot radius. You may drop and re-form the blade with a Bonus Action on later turns.",
    "higherLevels": "The damage increases by 1d6 for every two slot levels above 2nd.",
    "source": "srd"
  },
  {
    "name": "Flaming Sphere",
    "level": 2,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a bit of tallow, a pinch of brimstone, and a dusting of powdered iron)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Create a 5-foot-diameter ball of fire that you can roll up to 30 feet with a Bonus Action each turn. A creature that ends up in the sphere's space or within 5 feet of it must make a Dexterity save, taking 2d6 fire damage on a failure or half as much on a success.",
    "higherLevels": "Each slot level above 2nd increases the damage by 1d6.",
    "source": "srd"
  },
  {
    "name": "Gentle Repose",
    "level": 2,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a pinch of salt and a copper coin placed on each of the corpse's eyes)",
    "duration": "10 Days",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric",
      "Wizard"
    ],
    "description": "Protect a corpse you touch from decay and from becoming Undead. For the duration the body doesn't rot, and the time it spends under the spell doesn't count against the window in which spells like Raise Dead can restore it to life.",
    "source": "srd"
  },
  {
    "name": "Gust of Wind",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (60-foot Line)",
    "components": "V, S, M (a legume seed)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A blast of wind roars out in a 60-foot line 10 feet wide. Each creature in the line must make a Strength save or be pushed 15 feet away from you. The gust disperses gas and vapor, snuffs unprotected flames, and you can redirect it each turn with a Bonus Action.",
    "source": "srd"
  },
  {
    "name": "Heat Metal",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a piece of iron and a flame)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer"
    ],
    "description": "Make a manufactured metal object, such as a weapon or a suit of armor, glow red hot. A creature touching or wearing it takes 2d8 fire damage and, if it's holding the object, must succeed on a Constitution save or drop it. On later turns you can use a Bonus Action to deal the damage again.",
    "higherLevels": "Each slot level above 2nd increases the damage by 1d8.",
    "source": "srd"
  },
  {
    "name": "Hold Person",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a straight piece of iron)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Attempt to freeze a humanoid in place. The target must succeed on a Wisdom save or be Paralyzed for the duration, repeating the save at the end of each of its turns to end the effect.",
    "higherLevels": "Each slot level above 2nd lets you target one additional humanoid.",
    "source": "srd"
  },
  {
    "name": "Invisibility",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (an eyelash in gum arabic)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Turn a creature you touch, along with whatever it's wearing and carrying, Invisible for the duration. The effect ends early if the target makes an attack or casts a spell.",
    "higherLevels": "Each slot level above 2nd lets you target one additional creature.",
    "source": "srd"
  },
  {
    "name": "Knock",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Target an object that is locked, stuck, or barred and magically open it with a loud knock audible for 300 feet. A mundane lock unlocks, a stuck door or lid comes free, and an Arcane Lock is suppressed for 10 minutes. Only one bolt or bar is undone per casting.",
    "source": "srd"
  },
  {
    "name": "Lesser Restoration",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "description": "Cleanse a creature you touch of one affliction. You end either the Blinded, Deafened, Paralyzed, or Poisoned condition, or one disease affecting it.",
    "source": "srd"
  },
  {
    "name": "Levitate",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a small leather loop or a golden wire bent into a cup)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Lift a creature or loose object weighing up to 500 pounds straight into the air. An unwilling target can resist with a Constitution save. You can move a levitating target up or down as much as 20 feet on your turn, and it hangs there until the spell ends, drifting gently to the ground when it does.",
    "source": "srd"
  },
  {
    "name": "Locate Animals or Plants",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (fur from a bloodhound)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "description": "Name a specific kind of beast or plant and instantly learn the location of the nearest one of that type within 5 miles, if any exists that close. You sense its direction and distance from you.",
    "source": "srd"
  },
  {
    "name": "Locate Object",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a forked twig)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger",
      "Wizard"
    ],
    "description": "Sense the direction to a specific object you're familiar with, or the nearest object of a general kind, as long as it lies within 1,000 feet. The sense is blocked if at least a thin sheet of lead lies between you and the item.",
    "source": "srd"
  },
  {
    "name": "Magic Mouth",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (jade dust worth 10+ GP, which the spell consumes)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "Implant a spoken message of up to 25 words into an object, set to play when a trigger you specify occurs within 30 feet. When triggered, a magical mouth forms on the object and recites the message, mimicking your voice.",
    "source": "srd"
  },
  {
    "name": "Magic Weapon",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Imbue a nonmagical weapon you touch with magic. For the duration it becomes a magic weapon with a +1 bonus to attack and damage rolls.",
    "higherLevels": "The bonus rises to +2 when cast with a 4th- or 5th-level slot, and to +3 with a 6th-level slot or higher.",
    "source": "srd"
  },
  {
    "name": "Mind Spike",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Drive a spike of psychic force into a target's mind. It must make a Wisdom save, taking 3d8 psychic damage on a failure or half as much on a success. On a failed save you also know the creature's location for the duration as long as you both stay on the same plane, and you have Advantage on attack rolls against it.",
    "higherLevels": "Each slot level above 2nd increases the damage by 1d8.",
    "source": "phb"
  },
  {
    "name": "Mirror Image",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Three illusory duplicates of yourself appear and shift around you. Whenever a creature that can see targets you with an attack, roll to see whether it strikes a duplicate instead, which is then destroyed. Each image has an AC of 10 plus your Dexterity modifier, and any hit that would land on one pops it harmlessly.",
    "source": "srd"
  },
  {
    "name": "Misty Step",
    "level": 2,
    "school": "Conjuration",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Wrapped briefly in silvery mist, you teleport up to 30 feet to an unoccupied space you can see.",
    "source": "srd"
  },
  {
    "name": "Moonbeam",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a moonseed leaf and a moonstone)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "A shaft of pale light shines down in a 5-foot-radius, 40-foot-high cylinder. A creature that enters the beam or starts its turn there makes a Constitution save, taking 2d10 radiant damage on a failure or half on a success, and shapechangers have Disadvantage on the save. On each of your turns you can shift the beam up to 60 feet with an action.",
    "higherLevels": "Each slot level above 2nd increases the damage by 1d10.",
    "source": "srd"
  },
  {
    "name": "Nystul's Magic Aura",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a small square of silk)",
    "duration": "24 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "Mask the magical nature of a creature or object you touch. You can make it register falsely to divination, hiding or faking its aura and magical properties, or make a creature appear to be a different creature type to spells and effects that detect type. The disguise lasts for the duration.",
    "source": "srd"
  },
  {
    "name": "Pass without Trace",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (ashes from a burned leaf of mistletoe and a sprig of spruce)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "A veil of shadow and silence settles over you and your companions. Each creature you choose within 30 feet gains a +10 bonus to Dexterity (Stealth) checks and leaves no tracks or scent that can be followed by nonmagical means, for as long as it remains within 30 feet of you.",
    "source": "srd"
  },
  {
    "name": "Phantasmal Force",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a bit of fleece)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Craft an illusion in the mind of a creature that fails an Intelligence save. The target perceives the phantom as real and rationalizes away any evidence against it. If the illusion is something dangerous, it deals 1d6 psychic damage to the target on each of its turns while the creature believes it can be harmed by it.",
    "source": "srd"
  },
  {
    "name": "Prayer of Healing",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "10 Minutes",
    "range": "30 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "Utter a prolonged healing prayer over as many as five willing creatures within range. Each target regains Hit Points equal to 2d8 plus your spellcasting ability modifier.",
    "higherLevels": "Each slot level above 2nd increases the healing by 1d8.",
    "source": "srd"
  },
  {
    "name": "Protection from Poison",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "description": "Purge and ward a creature you touch. You neutralize one poison affecting it (your choice if there are several), and for the duration the target has Advantage on saves against being Poisoned and Resistance to poison damage.",
    "source": "srd"
  },
  {
    "name": "Rope Trick",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (powdered corn and a twisted loop of parchment)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "Touch a length of rope up to 60 feet long and make one end rise into the air, opening an invisible extradimensional space at its top. Up to eight Medium or smaller creatures can climb up and hide inside, pulling the rope after them, and the entrance is invisible from outside. When the spell ends, everything inside spills out.",
    "source": "srd"
  },
  {
    "name": "Scorching Ray",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Fling three fiery rays at targets within range, dividing them among one or more creatures. Make a separate ranged spell attack for each ray; each hit deals 2d6 fire damage.",
    "higherLevels": "Each slot level above 2nd creates one additional ray.",
    "source": "srd"
  },
  {
    "name": "See Invisibility",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (talc and a small amount of silver powder)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "For the duration you can see creatures and objects that are Invisible, and you can perceive into the Ethereal Plane. Such things appear to you as translucent, shimmering shapes.",
    "source": "srd"
  },
  {
    "name": "Shatter",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a chip of mica)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A sudden ringing burst of sound erupts at a point you choose. Each creature in a 10-foot-radius sphere makes a Constitution save, taking 3d8 thunder damage on a failure or half on a success. Creatures made of inorganic material like stone, crystal, or metal have Disadvantage on the save, and nonmagical objects that aren't worn or carried also take damage.",
    "higherLevels": "Each slot level above 2nd increases the damage by 1d8.",
    "source": "srd"
  },
  {
    "name": "Silence",
    "level": 2,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": true,
    "classes": [
      "Bard",
      "Cleric",
      "Ranger"
    ],
    "description": "Create a 20-foot-radius sphere of magical silence centered on a point you choose. No sound arises within it or crosses its boundary, so creatures inside are Deafened and can't cast spells with verbal components, and thunder damage is prevented in the area.",
    "source": "srd"
  },
  {
    "name": "Spider Climb",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a drop of bitumen and a spider)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Give a willing creature you touch the power to walk on walls and ceilings with its hands free. For the duration the target can climb difficult vertical and inverted surfaces and gains a Climb Speed equal to its Speed.",
    "source": "srd"
  },
  {
    "name": "Spike Growth",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (seven sharp thorns or seven twigs sharpened to points)",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "Twist the ground in a 20-foot radius into a mass of hard spikes and thorns. The area becomes Difficult Terrain, and any creature takes 2d4 piercing damage for every 5 feet it travels through it. The spikes are camouflaged, so a creature that hasn't perceived them needs a Wisdom (Perception) or Survival check to recognize the hazard.",
    "source": "srd"
  },
  {
    "name": "Spiritual Weapon",
    "level": 2,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Conjure a floating spectral weapon that you can direct against foes. When you cast the spell, and again as a Bonus Action on later turns, you can move it up to 20 feet and make a melee spell attack with it, dealing 1d8 plus your spellcasting ability modifier in force damage on a hit.",
    "higherLevels": "The damage increases by 1d8 for every two slot levels above 2nd.",
    "source": "srd"
  },
  {
    "name": "Suggestion",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, M (a drop of honey)",
    "duration": "Concentration, up to 8 Hours",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Suggest a reasonable course of action, no more than a sentence or two, to a creature that can hear and understand you. It must succeed on a Wisdom save or pursue the suggested activity as best it can. The effect ends when the task is finished, and an obviously harmful or self-destructive suggestion automatically fails.",
    "source": "srd"
  },
  {
    "name": "Warding Bond",
    "level": 2,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a pair of platinum rings worth 50+ GP each, which you and the target must wear)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "Forge a protective link with a willing creature you touch. For the duration it gains a +1 bonus to AC and saving throws and Resistance to all damage, but whenever it takes damage you take the same amount of force damage. The bond breaks if either of you drops to 0 Hit Points or you move more than 60 feet apart.",
    "source": "srd"
  },
  {
    "name": "Web",
    "level": 2,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a bit of spiderweb)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Fill a 20-foot cube with thick, sticky webbing that turns the area into Difficult Terrain and lightly obscures it. A creature that enters the webs or starts its turn there must make a Dexterity save or be Restrained; a Restrained creature can repeat the save as an action to break free. The webs are flammable and burst into flame if exposed to fire.",
    "source": "srd"
  },
  {
    "name": "Zone of Truth",
    "level": 2,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "10 Minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Paladin"
    ],
    "description": "Create a 15-foot-radius sphere in which lying is impossible. A creature entering or starting its turn in the area must make a Charisma save; on a failure it can't speak a deliberate falsehood while inside, though it can still evade and choose its words. You know which creatures succeed on their saves.",
    "source": "srd"
  },
  {
    "name": "Shining Smite",
    "level": 2,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "You cast this the instant after hitting a creature with a weapon or Unarmed Strike. The target takes an extra 2d6 Radiant damage and, for the duration, sheds Bright Light in a 5-foot radius, can't benefit from becoming Invisible, and attack rolls against it have Advantage.",
    "higherLevels": "The extra Radiant damage increases by 1d6 for each spell slot level above 2nd.",
    "source": "phb"
  },
  {
    "name": "Beast Sense",
    "level": 2,
    "school": "Divination",
    "castingTime": "Action or Ritual",
    "range": "Touch",
    "components": "S",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": true,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You touch a willing Beast and, for the duration, you can perceive through its senses as well as your own, gaining the benefit of any special senses it has. While using the creature's senses, you are Blinded and Deafened to your own surroundings.",
    "source": "srd"
  },
  {
    "name": "Animate Dead",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "1 Minute",
    "range": "10 feet",
    "components": "V, S, M (a drop of blood, a piece of flesh, and a pinch of bone dust)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Wizard"
    ],
    "description": "Target a pile of bones or a corpse within range to raise an undead servant, either a Skeleton or a Zombie. The creature obeys spoken commands and acts on your initiative, though you must issue orders mentally. Your control lasts 24 hours, after which the undead stops following you unless you recast this spell on it before that window closes; recasting reasserts control over up to four such undead.",
    "higherLevels": "Casting with a slot of 4th level or higher animates or reasserts control over two additional undead for each level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Aura of Vitality",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (30-foot Emanation)",
    "components": "V",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin"
    ],
    "description": "A healing aura surrounds you out to 30 feet. When you cast the spell and again at the start of each of your turns while it lasts, you can restore 2d6 Hit Points to one creature within the aura.",
    "source": "srd"
  },
  {
    "name": "Beacon of Hope",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Any number of creatures you choose within range gain a surge of resilience. For the duration each has advantage on Wisdom saving throws and death saving throws, and whenever any of them regains Hit Points, they recover the maximum possible amount.",
    "source": "srd"
  },
  {
    "name": "Bestow Curse",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "description": "Touch a creature, which must succeed on a Wisdom saving throw or be cursed. Choose one effect: it has Disadvantage on ability checks and attacks using one ability of your choice; it has Disadvantage on saves against your spells; you deal an extra 1d8 Necrotic damage to it with your attacks and spells; or it must succeed on a Wisdom save each turn or waste its action.",
    "higherLevels": "With a 4th-level slot the duration becomes Concentration, up to 10 minutes; at 5th or 6th level it lasts 8 hours with no concentration; at 7th or higher it lasts 24 hours; and a 9th-level casting lasts until dispelled.",
    "source": "srd"
  },
  {
    "name": "Blinding Smite",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "1 minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "Cast this as a Bonus Action right after you hit a target with a melee weapon or an Unarmed Strike. The blow deals an extra 3d8 Radiant damage and blinds the target. The blinded creature repeats a Constitution saving throw at the end of each of its turns, ending the effect on a success.",
    "higherLevels": "The extra Radiant damage increases by 1d8 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Blink",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "1 minute",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You flicker between planes for the duration. At the end of each of your turns, roll a d6; on a 4 or higher you vanish into the Ethereal Plane, unable to be affected by or perceive anything on the Material Plane. At the start of your next turn, or when the effect ends, you reappear in an unoccupied space of your choice within 10 feet of where you disappeared.",
    "source": "srd"
  },
  {
    "name": "Call Lightning",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "A storm cloud shaped as a 60-foot-radius, 10-foot-high cylinder forms at a point you can see overhead. When you cast the spell, and as an action on later turns, you call down a bolt at a point beneath the cloud; each creature within 5 feet of that point makes a Dexterity saving throw, taking 3d10 Lightning damage on a failure or half as much on a success. Casting it outdoors in a storm boosts the bolt's damage to 4d10.",
    "higherLevels": "The damage increases by 1d10 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Clairvoyance",
    "level": 3,
    "school": "Divination",
    "castingTime": "10 Minutes",
    "range": "1 mile",
    "components": "V, S, M (a focus worth 100+ GP, either a jeweled horn for hearing or a glass eye for seeing)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You create an invisible sensor at a location you are familiar with or an obvious spot you can describe. Choose sight or hearing when casting; the sensor lets you use that sense as though you were present, and you can switch which sense it uses as an action.",
    "source": "srd"
  },
  {
    "name": "Conjure Animals",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You summon a large pack of spectral beasts that fills an unoccupied space within range. While you stay within 5 feet of the pack you have Advantage on Strength saving throws and Strength checks, and you can move the pack up to 30 feet as part of your move. When the pack moves within 10 feet of a creature, or a creature starts or ends its turn there, that creature makes a Dexterity saving throw, taking 3d10 Slashing damage on a failure or half on a success (once per turn).",
    "higherLevels": "The damage increases by 1d10 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Conjure Barrage",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self (60-foot Cone)",
    "components": "V, S, M (a weapon worth 1+ CP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "Brandishing a weapon, you conjure a volley of spectral projectiles that sweeps out in a 60-foot cone. Each creature in the area makes a Dexterity saving throw, taking 5d8 Force damage on a failure or half as much on a success.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Counterspell",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Reaction",
    "range": "60 feet",
    "components": "S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Cast this as a Reaction when you see a creature within range casting a spell. That creature must succeed on a Constitution saving throw against your spell save DC or its spell fails and has no effect, wasting any resources it spent.",
    "source": "srd"
  },
  {
    "name": "Create Food and Water",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "You conjure 40 pounds of plain, nourishing food and 30 gallons of fresh water at a spot within range, enough to sustain fifteen people or five mounts for a day. The food spoils if not eaten within 24 hours.",
    "source": "srd"
  },
  {
    "name": "Crusader's Mantle",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (30-foot Emanation)",
    "components": "V",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "An inspiring aura radiates from you out to 30 feet. While within it, you and your allies each deal an extra 1d4 Radiant damage on a hit with a weapon or an Unarmed Strike.",
    "source": "srd"
  },
  {
    "name": "Daylight",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger",
      "Sorcerer"
    ],
    "description": "A 60-foot-radius sphere of bright light springs from a point you choose, with dim light extending another 60 feet beyond it. The light counts as sunlight. If cast on an object, the glow moves with it; targeting the effect of a spell of 3rd level or lower that produces darkness dispels that darkness.",
    "source": "srd"
  },
  {
    "name": "Dispel Magic",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Choose a creature, object, or magical effect within range. Any spell of level 3 or lower on the target ends automatically. For a spell of a higher level, make an ability check using your spellcasting ability against a DC of 10 plus that spell's level; on a success, the spell ends.",
    "higherLevels": "When cast with a slot of 4th level or higher, you automatically end spells whose level is at or below the slot used.",
    "source": "srd"
  },
  {
    "name": "Elemental Weapon",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Paladin",
      "Ranger"
    ],
    "description": "You touch a nonmagical weapon and imbue it with elemental power. Choose Acid, Cold, Fire, Lightning, or Thunder; for the duration the weapon is magical and grants a +1 bonus to attack rolls and deals an extra 1d4 damage of the chosen type on a hit.",
    "higherLevels": "With a 5th- or 6th-level slot the bonus becomes +2 and the extra damage 2d4; with a 7th-level or higher slot the bonus becomes +3 and the extra damage 3d4.",
    "source": "srd"
  },
  {
    "name": "Fear",
    "level": 3,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Self (30-foot Cone)",
    "components": "V, S, M (a white feather)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Each creature in a 30-foot cone must succeed on a Wisdom saving throw or drop whatever it is holding and become Frightened for the duration. A frightened creature must take the Dash action and move away from you by the safest route each turn unless there is nowhere to go. It repeats the save at the end of each of its turns, ending the effect on a success.",
    "source": "srd"
  },
  {
    "name": "Feign Death",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a pinch of graveyard dirt)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "description": "A willing creature you touch falls into a deathlike catatonic state that is indistinguishable from a corpse to inspection and magic. It is Blinded and Incapacitated with a speed of 0, has Resistance to all damage except Psychic, and has Immunity to disease and poison. Any disease or poison already affecting it is suspended, not cured, for the duration.",
    "source": "srd"
  },
  {
    "name": "Fireball",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a ball of bat guano and sulfur)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A bright streak flashes to a point you choose and erupts in flame. Each creature in a 20-foot-radius sphere centered there makes a Dexterity saving throw, taking 8d6 Fire damage on a failure or half as much on a success. The fire ignites flammable objects in the area that aren't being worn or carried.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Fly",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a feather)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A willing creature you touch gains a Fly Speed of 60 feet for the duration. If the spell ends while the target is aloft, it falls unless it can stop the descent by other means.",
    "higherLevels": "Each spell slot level above 3rd lets you target one additional creature.",
    "source": "srd"
  },
  {
    "name": "Gaseous Form",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a bit of gauze)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A willing creature you touch, along with its worn and carried gear, becomes a misty cloud for the duration. In this form it has Resistance to nonmagical damage, gains a Fly Speed of 10 feet, can hover, and can pass through narrow openings, though it can't attack, cast spells, speak, or manipulate objects.",
    "source": "srd"
  },
  {
    "name": "Glyph of Warding",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "1 Hour",
    "range": "Touch",
    "components": "V, S, M (incense and powdered diamond worth 200+ GP, which the spell consumes)",
    "duration": "Until dispelled or triggered",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "description": "You inscribe a hidden glyph on a surface or within an object and set the condition that triggers it. As an Explosive Runes glyph, it bursts in a 20-foot-radius sphere when triggered, forcing a Dexterity save for 5d8 damage of a type you chose (acid, cold, fire, lightning, or thunder), halved on a success. As a Spell Glyph, it stores a spell of 3rd level or lower that you cast when triggered.",
    "higherLevels": "An Explosive Runes glyph deals an extra 1d8 damage per slot level above 3rd; a Spell Glyph can store a spell up to a level equal to the slot used minus 2.",
    "source": "srd"
  },
  {
    "name": "Haste",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a shaving of licorice root)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A willing creature you can see gains a burst of speed for the duration: its Speed doubles, it gains a +2 bonus to AC, it has Advantage on Dexterity saving throws, and it gets one extra action each turn usable only to Attack (one attack), Dash, Disengage, Hide, or Utilize. When the spell ends, the target can't move or take actions until after its next turn as the momentum drains away.",
    "source": "srd"
  },
  {
    "name": "Hunger of Hadar",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a pickled octopus tentacle)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock"
    ],
    "description": "You open a rift to the void, filling a 20-foot-radius sphere with lightless cold. The area is Darkness that even Darkvision can't pierce, and it is Difficult Terrain. A creature that starts its turn in the sphere takes 2d6 Cold damage, and a creature that ends its turn there makes a Dexterity saving throw, taking 2d6 Acid damage on a failure.",
    "source": "srd"
  },
  {
    "name": "Hypnotic Pattern",
    "level": 3,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "S, M (a glowing stick of incense or a crystal vial of phosphorescent material)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A twisting pattern of colors appears in a 30-foot cube within range. Each creature in the area that can see it must succeed on a Wisdom saving throw or become Charmed for the duration, during which it is Incapacitated and has a Speed of 0. The effect ends for a creature if it takes damage or someone nearby uses an action to shake it out of the trance.",
    "source": "srd"
  },
  {
    "name": "Leomund's Tiny Hut",
    "level": 3,
    "school": "Evocation",
    "castingTime": "1 Minute",
    "range": "Self (10-foot Radius)",
    "components": "V, S, M (a crystal bead)",
    "duration": "8 hours",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "A dome of magical force springs up around you, a 10-foot-radius hemisphere that shelters up to ten creatures. Those inside can pass through it freely, but other creatures and objects can't enter or pass through, and spells can't be cast through it. The interior stays dry and comfortable regardless of the weather outside, and the dome is opaque or transparent as you choose when casting.",
    "source": "srd"
  },
  {
    "name": "Lightning Bolt",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (100-foot Line)",
    "components": "V, S, M (a bit of fur and a rod of amber, crystal, or glass)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A stroke of lightning blasts out in a line 100 feet long and 5 feet wide. Each creature in the line makes a Dexterity saving throw, taking 8d6 Lightning damage on a failure or half as much on a success. The bolt ignites flammable objects in its path that aren't being worn or carried.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Magic Circle",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "1 Minute",
    "range": "10 feet",
    "components": "V, S, M (salt and powdered silver worth 100+ GP, which the spell consumes)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin",
      "Warlock",
      "Wizard"
    ],
    "description": "You trace a 10-foot-radius, 20-foot-tall cylinder of protection at a point within range. Choose one or more of Celestials, Elementals, Fey, Fiends, or Undead; those creatures can't willingly enter the cylinder, can't charm, frighten, or possess anyone inside it, and have Disadvantage on attacks against creatures within. You may instead invert the circle to trap such a creature inside.",
    "higherLevels": "The duration increases by 1 hour for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Major Image",
    "level": 3,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a bit of fleece)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You craft an illusion of an object, creature, or other phenomenon no larger than a 20-foot cube, complete with sound, smell, and warmth. You can move the image within range and change its behavior as an action. Physical interaction reveals it as illusory, and a creature that studies it can use an action on an Intelligence (Investigation) check against your spell save DC to discern the fakery.",
    "higherLevels": "When cast with a 6th-level or higher slot, the illusion lasts until dispelled without requiring concentration.",
    "source": "srd"
  },
  {
    "name": "Mass Healing Word",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You call out words of restoration to up to six creatures you can see within range. Each regains Hit Points equal to 2d4 plus your spellcasting ability modifier. The spell has no effect on Undead or Constructs.",
    "higherLevels": "The healing increases by 1d4 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Meld into Stone",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "8 hours",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You step into a stone object or surface large enough to hold your body, merging with it along with your gear. While melded you can't see outside and have Disadvantage on Wisdom (Perception) checks to hear, and you are aware of the passage of time. You can step back out through the surface you entered; taking damage or being forced out ejects you and deals extra bludgeoning damage from the sudden exit.",
    "source": "srd"
  },
  {
    "name": "Nondetection",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a pinch of diamond dust worth 25+ GP, which the spell consumes)",
    "duration": "8 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Ranger",
      "Wizard"
    ],
    "description": "For the duration, you shield a willing creature, place, or object no larger than 10 feet in any dimension from divination magic. The target can't be targeted by any Divination spell or perceived through magical scrying sensors.",
    "source": "srd"
  },
  {
    "name": "Phantom Steed",
    "level": 3,
    "school": "Illusion",
    "castingTime": "1 Minute",
    "range": "30 feet",
    "components": "V, S",
    "duration": "1 hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Wizard"
    ],
    "description": "A Large, quasi-real horselike creature appears in an unoccupied space within range, complete with tack, and serves as a mount for you or one willing creature. It has a Speed of 100 feet and can cover 10 miles in an hour on the road. When the spell ends the steed fades over one minute, and if it takes any damage it vanishes at once.",
    "source": "srd"
  },
  {
    "name": "Plant Growth",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action or 8 Hours",
    "range": "150 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "description": "Cast as an action, plants in a 100-foot radius burst into thick overgrowth, turning the area into Difficult Terrain that costs four times the movement to cross. Cast over 8 hours instead, the spell enriches plant life in a half-mile radius so it becomes especially fertile and yields a doubled harvest for a year.",
    "source": "srd"
  },
  {
    "name": "Protection from Energy",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A willing creature you touch gains Resistance to one damage type of your choice from among Acid, Cold, Fire, Lightning, and Thunder for the duration.",
    "source": "srd"
  },
  {
    "name": "Remove Curse",
    "level": 3,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin",
      "Warlock",
      "Wizard"
    ],
    "description": "At your touch, all curses afflicting one creature end. If a cursed magic item is touched instead, you break the item's hold on its bearer, though the curse on the item itself remains.",
    "source": "srd"
  },
  {
    "name": "Revivify",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a diamond worth 300+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Paladin"
    ],
    "description": "You touch a creature that died within the last minute and return it to life with 1 Hit Point. The spell can't restore a creature that has died of old age, and it doesn't regrow missing body parts.",
    "source": "srd"
  },
  {
    "name": "Sending",
    "level": 3,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Unlimited",
    "components": "V, S, M (a copper wire)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "description": "You send a message of 25 words or fewer to a creature you are familiar with, anywhere on the same plane of existence. It hears the message in its mind and can reply in kind immediately. Sending across planar boundaries is possible but has a 5 percent chance the message never arrives.",
    "source": "srd"
  },
  {
    "name": "Sleet Storm",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a pinch of dust and a few drops of water)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Freezing rain and sleet fill a 40-foot-radius, 20-foot-tall cylinder centered on a point within range. The area is Difficult Terrain and heavily obscured, exposed flames are doused, and any creature that starts its turn there must succeed on a Constitution save to keep concentration on its own spells. A creature that enters the area or starts its turn there must succeed on a Dexterity save or fall Prone.",
    "source": "srd"
  },
  {
    "name": "Slow",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a drop of molasses)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Up to six creatures in a 40-foot cube within range must succeed on a Wisdom saving throw or be slowed. A slowed creature has its Speed halved, takes a -2 penalty to AC and Dexterity saves, can't take Reactions, and can use only one action or one Bonus Action on its turn, not both. It repeats the save at the end of each of its turns, ending the effect on a success.",
    "source": "srd"
  },
  {
    "name": "Speak with Dead",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "10 feet",
    "components": "V, S, M (burning incense)",
    "duration": "10 minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "description": "You briefly grant a semblance of life to a corpse that still has a mouth and hasn't been dead more than 10 days, allowing you to ask it up to five questions. The corpse answers within its former knowledge, though its replies are often brief and cryptic, and it isn't compelled to be truthful or friendly. You can't target the same corpse again with this spell until 10 days have passed.",
    "source": "srd"
  },
  {
    "name": "Speak with Plants",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Self (30-foot Radius)",
    "components": "V, S",
    "duration": "10 minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Ranger"
    ],
    "description": "For the duration, you can question and command plants within 30 feet as though they were awakened. They can describe what has passed nearby, and you can ask them to make an area Difficult Terrain by shifting, or to clear such terrain, and to unentangle creatures caught in plant-based restraints.",
    "source": "srd"
  },
  {
    "name": "Spirit Guardians",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self (15-foot Emanation)",
    "components": "V, S, M (a prayer scroll)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Protective spirits swirl around you out to 15 feet, and the area becomes Difficult Terrain for your enemies. When a creature you choose enters the aura for the first time on a turn or starts its turn there, it makes a Wisdom saving throw, taking 3d8 Radiant damage (or Necrotic if you prefer) on a failure or half as much on a success.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Stinking Cloud",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a rotten egg or several skunk cabbage leaves)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A 20-foot-radius sphere of nauseating yellow gas forms around a point within range, heavily obscuring the area. Each creature that starts its turn in the cloud must succeed on a Constitution saving throw or lose its action for that turn, retching and reeling. The cloud spreads around corners and lingers until dispersed by a strong wind.",
    "source": "srd"
  },
  {
    "name": "Summon Fey",
    "level": 3,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a gilded flower worth 300+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Warlock",
      "Wizard"
    ],
    "description": "You call a Fey spirit into an unoccupied space you can see, using the Fey Spirit stat block. Choose a Fuming, Mirthful, or Tricksy mood, which shapes some of its traits. The spirit is an ally, acts right after your turn on your Initiative, and obeys your verbal commands without costing you an action.",
    "higherLevels": "Use the level of the spell slot spent as the spell's level when reading the stat block's scaling values.",
    "source": "phb"
  },
  {
    "name": "Summon Undead",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a gilded skull worth 300+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You summon an Undead spirit to an unoccupied space you can see, using the Undead Spirit stat block. Choose a Ghostly, Putrid, or Skeletal form, which determines some of its abilities. The spirit is an ally, acts immediately after your turn on your Initiative, and follows your verbal commands without requiring an action from you.",
    "higherLevels": "Use the level of the spell slot spent as the spell's level when reading the stat block's scaling values.",
    "source": "phb"
  },
  {
    "name": "Tongues",
    "level": 3,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, M (a small clay model of a ziggurat)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A creature you touch gains the ability to understand any spoken language it hears for the duration. Anything it says in a language it knows is understood by any creature that knows at least one language and can hear it.",
    "source": "srd"
  },
  {
    "name": "Vampiric Touch",
    "level": 3,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Your hand is wreathed in shadow, and you make a melee spell attack against a creature within reach. On a hit it takes 3d6 Necrotic damage and you regain Hit Points equal to half that amount. Until the spell ends, you can make the attack again as an action on each of your turns.",
    "higherLevels": "The damage increases by 1d6 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Water Breathing",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a short reed or piece of straw)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Up to ten willing creatures within range gain the ability to breathe underwater until the spell ends. Affected creatures still retain their normal way of breathing air as well.",
    "source": "srd"
  },
  {
    "name": "Water Walk",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a piece of cork)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric",
      "Druid",
      "Ranger",
      "Sorcerer"
    ],
    "description": "Up to ten willing creatures within range gain the ability to move across any liquid surface as though it were solid ground for the duration. A target can also step down through the liquid up to its waist and stride along beneath the surface at a walking pace.",
    "source": "srd"
  },
  {
    "name": "Wind Wall",
    "level": 3,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a fan and a feather)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "A wall of strong wind up to 50 feet long, 15 feet high, and 1 foot thick rises from the ground within range. A creature in the wall's area when it appears, or that enters it, makes a Strength saving throw, taking 3d8 Bludgeoning damage on a failure or half as much on a success. The wall deflects loose debris, small flying creatures, and ordinary ranged weapon attacks made through it.",
    "source": "srd"
  },
  {
    "name": "Lightning Arrow",
    "level": 3,
    "school": "Transmutation",
    "castingTime": "Bonus Action, taken immediately after you hit or miss a target with a ranged weapon attack",
    "range": "Self",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "The attack's ammunition or thrown weapon becomes a bolt of lightning. The target takes 4d8 Lightning damage on a hit, or half as much on a miss. Each other creature within 10 feet of it makes a Dexterity saving throw, taking 2d8 Lightning damage on a failure or half as much on a success.",
    "higherLevels": "Both damage rolls increase by 1d8 for each spell slot level above 3rd.",
    "source": "srd"
  },
  {
    "name": "Arcane Eye",
    "level": 4,
    "school": "Divination",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a bit of bat fur)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You conjure an invisible, floating magical sensor that you can see through. As a Bonus Action you can fly it up to 30 feet in any direction, including through openings as small as 1 inch. The eye has darkvision out to 30 feet and lets you observe as if you were there, but it cannot pass through solid matter.",
    "source": "srd"
  },
  {
    "name": "Aura of Life",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (30-foot Emanation)",
    "components": "V",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "A protective aura radiates from you in a 30-foot Emanation for the duration. You and your allies inside it have Resistance to Necrotic damage, and their Hit Point maximums can't be reduced. A creature in the aura that has 0 Hit Points regains 1 Hit Point at the start of its turn.",
    "source": "phb"
  },
  {
    "name": "Aura of Purity",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (30-foot Emanation)",
    "components": "V",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "A cleansing aura extends from you in a 30-foot Emanation. You and your allies within it have Resistance to Poison damage, can't gain the Poisoned condition, and have Advantage on saving throws to avoid or end the Blinded, Charmed, Deafened, Frightened, Paralyzed, Poisoned, and Stunned conditions.",
    "source": "phb"
  },
  {
    "name": "Banishment",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (an item distasteful to the target)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Choose a creature you can see within range and force a Charisma saving throw. On a failure, it is banished to a harmless demiplane and gains the Incapacitated condition until the spell ends, at which point it returns to the space it left. If the target is native to a different plane of existence and the spell lasts the full minute, the banishment becomes permanent.",
    "higherLevels": "Target one additional creature for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Blight",
    "level": 4,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You draw the moisture from a creature you can see within range. It makes a Constitution saving throw, taking 8d8 Necrotic damage on a failed save or half as much on a success. A plant creature automatically fails and takes maximum damage, while Undead and Constructs are unaffected. If you instead target a nonmagical plant that isn't a creature, it withers with no save.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Charm Monster",
    "level": 4,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "One creature you can see within range must succeed on a Wisdom saving throw or be Charmed by you until the spell ends or until you or your allies harm it. The target has Advantage on the save if you or your companions are currently fighting it. While Charmed, it regards you as a friendly acquaintance, and it knows it was influenced once the effect ends.",
    "higherLevels": "Target one additional creature for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Compulsion",
    "level": 4,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard"
    ],
    "description": "Each creature of your choice that you can see within range must succeed on a Wisdom saving throw or be affected. On your turn, as a Bonus Action, you can designate a direction, and each affected creature must use its movement to travel that way on its turn, though it can first make saves to avoid obvious hazards. An affected creature that has no movement left is unaffected that turn.",
    "source": "srd"
  },
  {
    "name": "Confusion",
    "level": 4,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (three nut shells)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Each creature in a 10-foot-radius Sphere centered on a point within range must make a Wisdom saving throw or have its mind scrambled. On its turn, an affected creature can't take Reactions and rolls on a randomized table that may leave it unable to act, send it moving in a random direction, or make it attack the nearest creature. At the end of each of its turns, it repeats the save, ending the effect on itself with a success.",
    "higherLevels": "The Sphere's radius increases by 5 feet for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Conjure Minor Elementals",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self (15-foot Emanation)",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Wizard"
    ],
    "description": "Elemental spirits swirl in a 15-foot Emanation around you for the duration. The area is Difficult Terrain for your enemies. Whenever the Emanation enters a creature's space and whenever a creature enters it or ends its turn there, your attacks against creatures in the area deal an extra 2d8 damage of a type you chose when casting (Acid, Cold, Fire, or Lightning).",
    "higherLevels": "The extra damage increases by 1d8 for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Conjure Woodland Beings",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self (10-foot Emanation)",
    "components": "V, S, M (one holly berry)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "Fey spirits gather in a 10-foot Emanation around you for the duration, making the area Difficult Terrain for your enemies. Once on each of your turns when a creature you can see enters the Emanation or ends its turn there, you can force it to make a Wisdom saving throw, dealing 5d8 Force damage on a failure. As a Bonus Action you can teleport up to 30 feet to an unoccupied space you can see.",
    "higherLevels": "The Force damage increases by 1d8 for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Control Water",
    "level": 4,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "300 feet",
    "components": "V, S, M (a mix of water and dust)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "description": "You take control of a body of water within range that fits inside a 100-foot cube, choosing one of several effects when you cast and being able to change it on later turns. You can raise a flood, part the water to form a trench, redirect its flow, or churn it into a violent whirlpool that pulls creatures under and damages them.",
    "source": "srd"
  },
  {
    "name": "Death Ward",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "8 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "You touch a creature and ward it against death. The first time the target would drop to 0 Hit Points before the spell ends, it instead drops to 1 Hit Point and the spell ends. If an effect would instead kill the target outright without reducing it to 0, that effect is negated against it and the spell ends.",
    "source": "srd"
  },
  {
    "name": "Dimension Door",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "500 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You teleport yourself to any spot within range that you can see, visualize, or describe by direction and distance. You may bring one willing creature within 5 feet of you, which arrives in a space next to your destination. If either of you would materialize in an occupied space, you each take 4d6 Force damage and the teleport fails.",
    "source": "srd"
  },
  {
    "name": "Divination",
    "level": 4,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (incense worth 25+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric",
      "Wizard"
    ],
    "description": "Through a ritual contact with a divine or otherworldly power, you receive a truthful reply to one question about a specific goal, event, or activity to occur within the next 7 days. The answer is typically a short phrase, cryptic verse, or omen. If you cast this spell more than once before finishing a Long Rest, each casting past the first carries a growing chance of a random, meaningless reading.",
    "source": "srd"
  },
  {
    "name": "Dominate Beast",
    "level": 4,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer"
    ],
    "description": "You attempt to seize control of a Beast you can see within range, which must succeed on a Wisdom saving throw or be Charmed for the duration. While the target is Charmed, you have a telepathic link with it as long as you share a plane, and you can direct its movement and actions or take control of it entirely using your action. Each time the target takes damage, it repeats the save, ending the effect on a success.",
    "higherLevels": "The duration becomes Concentration, up to 10 minutes with a level 5 slot, up to 1 hour with a level 6 slot, and up to 8 hours with a level 7+ slot.",
    "source": "srd"
  },
  {
    "name": "Evard's Black Tentacles",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a tentacle from a giant octopus or a giant squid)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "Writhing black tentacles fill a 20-foot square on ground you can see within range, turning it into Difficult Terrain for the duration. Each creature that starts its turn there or enters the area must succeed on a Strength saving throw or take 3d6 Bludgeoning damage and be Restrained. A creature Restrained by the tentacles can use its action to attempt a Strength or Dexterity check to break free.",
    "source": "srd"
  },
  {
    "name": "Fabricate",
    "level": 4,
    "school": "Transmutation",
    "castingTime": "10 Minutes",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You convert raw materials within range into finished products of the same substance, transforming up to a 10-foot cube of material (or a 5-foot cube of metal, stone, or a similar mineral). The item's shape is determined by you, but crafting anything that requires a high degree of craftsmanship demands proficiency with the relevant tools. You can't create or transmute creatures or magic items with this spell.",
    "source": "srd"
  },
  {
    "name": "Fire Shield",
    "level": 4,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "10 minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Flames wreathe your body, shedding Bright Light in a 10-foot radius. Choose a warm shield, which gives you Resistance to Cold damage, or a chill shield, which gives you Resistance to Fire damage. Whenever a creature within 5 feet hits you with a melee attack, the shield erupts and deals 2d8 Fire (warm) or Cold (chill) damage to it.",
    "source": "srd"
  },
  {
    "name": "Freedom of Movement",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a leather strap)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Ranger"
    ],
    "description": "You touch a willing creature, freeing its movement for the duration. Difficult Terrain doesn't slow it, and magic can neither reduce its Speed nor cause it to be Paralyzed or Restrained. It can spend 5 feet of movement to escape nonmagical restraints or a grapple, and it isn't hindered by being underwater, though it still can't move faster than its Speed there.",
    "source": "srd"
  },
  {
    "name": "Giant Insect",
    "level": 4,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You summon a Large monstrous insect that appears in an unoccupied space you can see within range and uses the Giant Insect stat block. The creature is friendly to you and your allies, and it acts on your turn, obeying your verbal commands (no action required from you); absent commands it defends itself but takes no other action. It vanishes when it drops to 0 Hit Points or when the spell ends.",
    "source": "srd"
  },
  {
    "name": "Greater Invisibility",
    "level": 4,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You touch a creature, and it has the Invisible condition until the spell ends. Unlike ordinary invisibility, the effect persists even if the target attacks or casts spells, making it a reliable way to hide an ally in the thick of combat.",
    "source": "srd"
  },
  {
    "name": "Guardian of Faith",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V",
    "duration": "8 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "A Large spectral guardian appears and hovers in an unoccupied space you can see within range for the duration. It occupies its space and menaces your foes: any creature hostile to you that first enters a space within 10 feet of it or ends its turn there must make a Dexterity saving throw, taking 20 Radiant damage on a failure or half as much on a success. The guardian vanishes once it has dealt a total of 60 damage.",
    "source": "srd"
  },
  {
    "name": "Hallucinatory Terrain",
    "level": 4,
    "school": "Illusion",
    "castingTime": "10 Minutes",
    "range": "300 feet",
    "components": "V, S, M (a mushroom, a twig, and a bit of moss)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Warlock",
      "Wizard"
    ],
    "description": "You disguise the natural terrain within a 150-foot cube in range so that it looks, sounds, and smells like a different kind of natural terrain, such as making a swamp appear as grassland. Manufactured structures, equipment, and creatures are not concealed. A creature that uses an action to physically examine the area can attempt an Intelligence (Investigation) check to see through the illusion.",
    "source": "srd"
  },
  {
    "name": "Ice Storm",
    "level": 4,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "300 feet",
    "components": "V, S, M (a pinch of dust and a few drops of water)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Hail hammers down in a 20-foot-radius, 40-foot-high Cylinder centered on a point within range. Each creature in the area makes a Dexterity saving throw, taking 2d8 Bludgeoning damage plus 4d6 Cold damage on a failure, or half as much on a success. The pounding ice turns the ground in the Cylinder into Difficult Terrain until the end of your next turn.",
    "higherLevels": "The Bludgeoning damage increases by 1d8 for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Leomund's Secret Chest",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a chest worth 5,000+ GP and a Tiny replica of it)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You hide an ornate chest and its contents on the Ethereal Plane, leaving you holding a Tiny replica made of the same materials. While you have the replica in hand, you can use an action to recall the chest, which appears in an unoccupied space nearby. After 60 days there is a cumulative chance each day that the spell ends and the chest is lost, and if either the chest or its replica is destroyed, the other and its contents are gone for good.",
    "source": "srd"
  },
  {
    "name": "Locate Creature",
    "level": 4,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (fur from a bloodhound)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger",
      "Wizard"
    ],
    "description": "You sense the direction to a creature you name or describe, provided it is within 1,000 feet of you. You can seek a specific creature you know or the nearest creature of a particular kind, such as a bear. The spell fails if the target is behind at least 10 feet of running water, is buried under a foot of stone, or is hidden from Divination magic; it also loses the trail if the target changes into an unfamiliar form.",
    "source": "srd"
  },
  {
    "name": "Mordenkainen's Faithful Hound",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a silver whistle, a piece of bone, and a thread)",
    "duration": "8 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You conjure an invisible, phantom watchdog in an unoccupied space you can see, where it remains for the duration or until you move more than 30 feet away. It barks loudly if any Small or larger creature comes within 30 feet without a password you set, and it can see Invisible creatures and see into the Ethereal Plane. On your turn, once a hostile creature is within 5 feet of it, the hound bites: that creature makes a Dexterity saving throw, taking 4d8 Piercing damage on a failure.",
    "source": "srd"
  },
  {
    "name": "Mordenkainen's Private Sanctum",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "10 Minutes",
    "range": "120 feet",
    "components": "V, S, M (a thin sheet of lead, a piece of opaque glass, a wad of cotton, and powdered chrysolite)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You secure an area up to a 100-foot cube against intrusion and spying for the duration, choosing which protections apply when you cast. You can block sound from passing the barrier, prevent sight through it (including with Darkvision), foil divination and scrying sensors, stop teleportation and planar travel in or out, and darken the interior. If you cast the spell in the same place every day for a year, the effect becomes permanent.",
    "higherLevels": "The size of the cube increases by 100 feet for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Otiluke's Resilient Sphere",
    "level": 4,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a glasslike bead)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "A shimmering sphere of force encloses a creature or object of Large size or smaller within range. An unwilling creature must succeed on a Dexterity saving throw or be trapped inside. Nothing can pass through the barrier in either direction, and it can't be dispelled or targeted by attacks, though a creature inside can push it slowly along the ground using half its Speed.",
    "source": "srd"
  },
  {
    "name": "Phantasmal Killer",
    "level": 4,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You conjure an illusory manifestation of a creature's deepest fears, visible only to it. The target makes a Wisdom saving throw; on a failure it takes 4d10 Psychic damage and gains the Frightened condition for the duration. While Frightened this way, it repeats the save at the end of each of its turns, taking another 4d10 Psychic damage on a failure and ending the spell on a success.",
    "higherLevels": "The damage on each failed save increases by 1d10 for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Polymorph",
    "level": 4,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a caterpillar cocoon)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You transform a creature you can see within range into a Beast whose Challenge Rating is no higher than the target's CR or level. An unwilling target can resist with a Wisdom saving throw. The subject takes on the new form's statistics but keeps its alignment and personality, and it gains a separate pool of Hit Points; when those drop to 0 the form ends and any leftover damage carries over. The effect lasts until the spell ends or the creature is reduced to 0 Hit Points.",
    "source": "srd"
  },
  {
    "name": "Stone Shape",
    "level": 4,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (soft clay, which must be worked into the desired shape)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "description": "You touch a stone object or section of stone no larger than a 5-foot cube and reshape it into any form you like. You can craft it into a rough tool, a weapon, or a container, or form simple features such as a door, though intricate mechanical detail beyond a crude latch is beyond the spell's precision.",
    "source": "srd"
  },
  {
    "name": "Stoneskin",
    "level": 4,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (diamond dust worth 100+ GP, which the spell consumes)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You touch a willing creature, turning its flesh as hard as stone for the duration. Until the spell ends, the target has Resistance to Bludgeoning, Piercing, and Slashing damage from nonmagical attacks.",
    "source": "srd"
  },
  {
    "name": "Summon Aberration",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a pickled tentacle and an eyeball in a platinum-inlaid vial worth 400+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You call forth an aberrant spirit that appears in an unoccupied space you can see within range, using the Aberrant Spirit stat block and taking a Beholderkin, Slaad, or Star Spawn form of your choice. The creature is an ally to you and your companions, rolls its own Initiative, and acts on its turn. In combat it moves and takes its Reaction on its own, but it takes an action only if you use a Bonus Action to command it (it can always make one melee attack when within 5 feet of an enemy on its turn).",
    "higherLevels": "Cast with a level 5+ slot to use that level in place of 4 wherever the stat block references the spell's level, improving the spirit's Hit Points, attack bonus, and damage.",
    "source": "phb"
  },
  {
    "name": "Summon Construct",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a gilded gear worth 400+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You conjure a construct spirit in an unoccupied space you can see within range, using the Construct Spirit stat block and choosing a Clay, Metal, or Stone form. The construct is friendly to you and your allies, rolls its own Initiative, and acts on its turn. You must spend a Bonus Action to have it take an action other than its innate melee attack, and if you don't command it, it defends itself while otherwise remaining in place.",
    "higherLevels": "Cast with a level 5+ slot to use that level in place of 4 wherever the stat block references the spell's level, improving the spirit's Hit Points, attack bonus, and damage.",
    "source": "phb"
  },
  {
    "name": "Summon Elemental",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (air, a pebble, ash, and water inside a gold-inlaid vial worth 400+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger",
      "Wizard"
    ],
    "description": "You summon an elemental spirit into an unoccupied space you can see within range, using the Elemental Spirit stat block and choosing an Air, Earth, Fire, or Water form. The spirit is an ally, rolls its own Initiative, and acts on its turn. It attacks and moves on its own but takes other actions only when you spend a Bonus Action to direct it.",
    "higherLevels": "Cast with a level 5+ slot to use that level in place of 4 wherever the stat block references the spell's level, improving the spirit's Hit Points, attack bonus, and damage.",
    "source": "phb"
  },
  {
    "name": "Vitriolic Sphere",
    "level": 4,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a drop of giant slug bile)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You hurl a glob of acid that bursts in a 20-foot-radius Sphere at a point within range. Each creature in the area makes a Dexterity saving throw. On a failure, a creature takes 10d4 Acid damage and, unless it succeeds on a second Dexterity save at the end of your next turn, takes another 5d4 Acid damage then. On a successful initial save, a creature takes half the initial damage and suffers no lingering acid.",
    "higherLevels": "The initial damage increases by 2d4 for each spell slot level above 4.",
    "source": "phb"
  },
  {
    "name": "Wall of Fire",
    "level": 4,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a piece of charcoal)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You raise a wall of flame on a solid surface within range, either a straight wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ring up to 20 feet in diameter. You choose one side of the wall to radiate heat; a creature within 10 feet of that side, or one that enters the wall's space or ends its turn there, makes a Dexterity saving throw and takes 5d8 Fire damage on a failure or half as much on a success. The wall sheds Bright Light and blocks line of sight.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 4.",
    "source": "srd"
  },
  {
    "name": "Fount of Moonlight",
    "level": 4,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 10 Minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid"
    ],
    "description": "You wreathe yourself in moonlight, shedding Bright Light in a 20-foot radius and Dim Light for 20 feet beyond. For the duration you have Resistance to Radiant damage, and each time you hit a creature with a melee attack you add 2d6 Radiant damage to it. When a creature you can see within 50 feet damages you, you can use a Reaction to force it to make a Constitution save; on a failure it is Blinded until the end of your next turn.",
    "source": "phb"
  },
  {
    "name": "Grasping Vine",
    "level": 4,
    "school": "Conjuration",
    "castingTime": "Bonus Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You conjure a vine that sprouts from a surface. As a Bonus Action you can make a melee spell attack against a creature within 30 feet of the vine; on a hit the target takes 4d8 Bludgeoning damage, is pulled up to 30 feet toward the vine, and — if Huge or smaller — has the Grappled condition (escape DC equals your spell save DC). The vine can grapple only one creature at a time.",
    "higherLevels": "The number of creatures the vine can grapple at once increases by one for each spell slot level above 4th.",
    "source": "srd"
  },
  {
    "name": "Staggering Smite",
    "level": 4,
    "school": "Enchantment",
    "castingTime": "Bonus Action, taken immediately after hitting a creature with a melee weapon or Unarmed Strike",
    "range": "Self",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "The target takes an extra 4d6 Psychic damage and must succeed on a Wisdom saving throw or have the Stunned condition until the end of your next turn.",
    "higherLevels": "The extra Psychic damage increases by 1d6 for each spell slot level above 4th.",
    "source": "srd"
  },
  {
    "name": "Animate Objects",
    "level": 5,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You bring up to five nonmagical objects that aren't being worn or carried to life, and they act as creatures under your control using the Animated Object stat block. You can command them all with a single Bonus Action, directing where they move and whom they attack. Each animated object fights until it drops to 0 Hit Points or the spell ends.",
    "higherLevels": "You animate two additional objects for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Antilife Shell",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (10-foot Emanation)",
    "components": "V, S",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "A shimmering barrier radiates from you in a 10-foot Emanation and moves with you. Creatures other than Constructs and Undead can't pass through or reach across it, and it blocks their melee and unarmed attacks against anything inside. The barrier drops if you force it against such a creature, so it can't be used to shove them.",
    "source": "srd"
  },
  {
    "name": "Awaken",
    "level": 5,
    "school": "Transmutation",
    "castingTime": "8 Hours",
    "range": "Touch",
    "components": "V, S, M (an agate worth 1,000+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid"
    ],
    "description": "Over the long casting you touch a Beast or Plant that has an Intelligence of 3 or lower and grant it sapience. The creature gains an Intelligence of 10, the ability to move (if a plant) and to speak a language you know, and it has the Charmed condition toward you for 30 days. When that period ends, it decides on its own whether it remains friendly, based on how you treated it.",
    "source": "srd"
  },
  {
    "name": "Banishing Smite",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "You cast this in response to hitting a creature with a weapon or Unarmed Strike, and that strike deals an extra 5d10 Force damage. If the blow leaves the target with 50 Hit Points or fewer, it is banished: a native creature returns to its home plane, while others are sent to a harmless demiplane and gain the Incapacitated condition. The spell ends there for banished creatures; otherwise it lasts until your Concentration breaks.",
    "source": "srd"
  },
  {
    "name": "Bigby's Hand",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (an eggshell and a snakeskin glove)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A Large spectral hand appears in an unoccupied space you can see; it has AC 20, Hit Points equal to your Hit Point maximum, and your ability modifiers. As a Bonus Action you move it up to 60 feet and use one of its effects: Clenched Fist makes a melee attack dealing 5d8 Force damage, Grasping Hand grapples a creature and can crush a grappled target for 4d6 Bludgeoning plus your spellcasting modifier, Forceful Hand shoves a creature, and Interposing Hand grants half cover and makes the ground near it Difficult Terrain.",
    "higherLevels": "Clenched Fist damage increases by 2d8 and Grasping Hand crush damage by 2d6 for each spell slot level above 5.",
    "source": "phb"
  },
  {
    "name": "Circle of Power",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (30-foot Emanation)",
    "components": "V",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "Protective magic spreads from you in a 30-foot Emanation that moves with you. You and your allies inside it have Advantage on saving throws against spells and other magical effects. In addition, whenever such an effect would deal only half damage on a successful save, an affected creature that succeeds takes no damage instead.",
    "source": "phb"
  },
  {
    "name": "Cloudkill",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You conjure a 20-foot-radius Sphere of poisonous yellow fog centered on a point you choose; the area is Heavily Obscured. A creature that enters the fog or starts its turn there makes a Constitution saving throw, taking 5d8 Poison damage on a failure or half as much on a success. At the start of each of your turns, the cloud drifts 10 feet away from you along the ground.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Commune",
    "level": 5,
    "school": "Divination",
    "castingTime": "1 Minute",
    "range": "Self",
    "components": "V, S, M (incense)",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric"
    ],
    "description": "You contact your deity or a divine proxy and may pose up to three questions that can be answered yes or no before the spell ends. You receive a truthful one-word reply for each, though a being that doesn't know an answer may respond that it is unclear. Casting this spell more than once before finishing a Long Rest carries a growing chance of getting no answer at all.",
    "source": "srd"
  },
  {
    "name": "Commune with Nature",
    "level": 5,
    "school": "Divination",
    "castingTime": "1 Minute",
    "range": "Self",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You become briefly attuned to the natural world around you and gain knowledge of the surrounding territory. Outdoors this reaches out to 3 miles, while underground it covers 300 feet. You learn up to three facts of your choice about the area, such as the locations of settlements, prevalent creatures, bodies of water, or unusually strong local magic.",
    "source": "srd"
  },
  {
    "name": "Cone of Cold",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (60-foot Cone)",
    "components": "V, S, M (a small crystal or glass cone)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A blast of frigid air erupts from your hand in a 60-foot Cone. Each creature in the area makes a Constitution saving throw, taking 8d8 Cold damage on a failure or half as much on a success. A creature reduced to 0 Hit Points by this spell freezes into a solid icy statue until it thaws.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Conjure Elemental",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Wizard"
    ],
    "description": "You summon a Large elemental spirit of air, earth, fire, or water in an unoccupied space you can see. When it appears, and when a creature enters its space or starts its turn within 5 feet of it while no one is already caught, that creature makes a Dexterity saving throw. On a failure it takes 8d8 damage of the spirit's type and has the Restrained condition; on a success it takes half damage and isn't restrained. A restrained creature repeats the save at the end of its turns, taking 4d8 damage on a failure and ending the effect on a success.",
    "higherLevels": "The damage increases by 1d8 for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Conjure Volley",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a Melee or Ranged weapon worth 1+ CP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "You hurl a weapon or piece of ammunition skyward and a spectral volley rains down over a 40-foot-radius, 20-foot-high Cylinder centered on a point you can see. Each creature you choose in that area makes a Dexterity saving throw, taking 8d8 Force damage on a failure or half as much on a success. The conjured weapons vanish once the volley lands.",
    "source": "phb"
  },
  {
    "name": "Contact Other Plane",
    "level": 5,
    "school": "Divination",
    "castingTime": "1 Minute",
    "range": "Self",
    "components": "V",
    "duration": "1 Minute",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You reach out to an entity from another plane of existence to seek answers. Doing so is dangerous: you make a DC 15 Intelligence saving throw, and on a failure you take 6d6 Psychic damage and have the Incapacitated condition until you finish a Long Rest. On a success you may ask the being up to five questions, each answered before the spell ends with a brief, truthful reply of one or two words.",
    "source": "srd"
  },
  {
    "name": "Contagion",
    "level": 5,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "7 Days",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You unleash a virulent disease through your touch. The target makes a Constitution saving throw, and on a failure it takes 11d8 Necrotic damage and gains the Poisoned condition. While poisoned this way it has Disadvantage on saving throws made with an ability score you choose when you cast the spell. The target repeats the save at the end of each of its turns, ending the effect after three successes or locking in the poisoning for the full 7 days after three failures.",
    "source": "srd"
  },
  {
    "name": "Creation",
    "level": 5,
    "school": "Illusion",
    "castingTime": "1 Minute",
    "range": "30 feet",
    "components": "V, S, M (a tiny piece of matter of the same sort you intend to create)",
    "duration": "Special",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You pull wisps of shadowy material together into a nonliving object of vegetable or mineral matter no larger than a 5-foot Cube. The object's makeup determines how long it lasts, ranging from a few minutes for delicate matter like vegetation up to many hours for dense metals like adamantine. Creating anything made of a precious material takes more skill, requiring a successful ability check set by the GM.",
    "higherLevels": "The Cube's dimensions increase by 5 feet for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Destructive Wave",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (30-foot Emanation)",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Paladin"
    ],
    "description": "You slam the ground and send divine energy rippling outward in a 30-foot Emanation. Each creature you choose in the area makes a Constitution saving throw. On a failure a creature takes 5d6 Thunder damage plus 5d6 Radiant or Necrotic damage (your choice when you cast the spell) and gains the Prone condition; on a success it takes half the total damage and isn't knocked prone.",
    "source": "srd"
  },
  {
    "name": "Dispel Evil and Good",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (powdered silver and iron)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "Shimmering energy surrounds you and wards against Aberrations, Celestials, Elementals, Fey, Fiends, and Undead. Such creatures have Disadvantage on attack rolls against you, and you can use a Magic action to try to break a Charmed, Frightened, or possession effect from one, or to make a melee attack that attempts to force one you touch back to its home plane on a failed Charisma save.",
    "source": "srd"
  },
  {
    "name": "Dominate Person",
    "level": 5,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You attempt to seize control of a Humanoid, which makes a Wisdom saving throw or gains the Charmed condition for the duration; it saves with Advantage if you or your allies are fighting it. While charmed you share a telepathic link with the target as long as you're on the same plane, and you can direct its movement and actions or issue commands it tries to carry out on its turn. Each time the target takes damage it makes another Wisdom save, ending the spell on a success.",
    "higherLevels": "Your Concentration can last up to 10 minutes with a level 6 slot, up to 1 hour with a level 7 slot, and up to 8 hours with a level 8 or 9 slot.",
    "source": "srd"
  },
  {
    "name": "Dream",
    "level": 5,
    "school": "Illusion",
    "castingTime": "1 Minute",
    "range": "Special",
    "components": "V, S, M (a handful of sand, a dab of ink, and a quill plucked from a sleeping bird)",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "You shape the dreams of a creature you know that is on the same plane. You (or a willing messenger you touch) enter a trance and appear in the target's dreams as a figure of your choosing, able to converse with the sleeper while it rests. If you make the encounter a nightmare, the target gains no benefit from the rest and takes 3d6 Psychic damage on waking, though it can resist with a successful Wisdom saving throw.",
    "source": "srd"
  },
  {
    "name": "Flame Strike",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a pinch of sulfur)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "A column of divine fire roars down in a 10-foot-radius, 40-foot-high Cylinder centered on a point you can see. Each creature in the area makes a Dexterity saving throw, taking 5d8 Fire damage plus 5d8 Radiant damage on a failure or half as much on a success.",
    "higherLevels": "The Fire damage or the Radiant damage (your choice) increases by 1d8 for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Geas",
    "level": 5,
    "school": "Enchantment",
    "castingTime": "1 Minute",
    "range": "60 feet",
    "components": "V",
    "duration": "30 Days",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Wizard"
    ],
    "description": "You lay a magical command on a creature that can understand you; it makes a Wisdom saving throw or gains the Charmed condition and must follow your instruction for the duration. While charmed, whenever it acts in a way that directly violates your order, or once per day if it simply refuses, it takes 5d10 Psychic damage. The order can't be one that would obviously bring about the creature's death.",
    "higherLevels": "The duration is 1 year with a level 7 or 8 slot, and lasts until dispelled with a level 9 slot.",
    "source": "srd"
  },
  {
    "name": "Greater Restoration",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (diamond dust worth 100+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Ranger"
    ],
    "description": "Your touch mends a creature's body and mind, removing one debilitating effect of your choice. You can end the Charmed or Petrified condition, cancel one reduction to an ability score, remove one level of Exhaustion, or lift an effect reducing the target's Hit Point maximum.",
    "source": "srd"
  },
  {
    "name": "Hallow",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "24 Hours",
    "range": "Touch",
    "components": "V, S, M (incense worth 1,000+ GP, which the spell consumes)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You infuse an area up to a 60-foot radius with sacred power. Choose a creature type from Aberration, Celestial, Elemental, Fey, Fiend, or Undead; such creatures can't enter the area or gain the Charmed, Frightened, or possession conditions there. You also bind one additional effect to the area, such as protective darkness or daylight, resistance to a damage type, or magical silence, which applies to creatures of your choosing.",
    "source": "srd"
  },
  {
    "name": "Hold Monster",
    "level": 5,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a straight piece of iron)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You target a creature that isn't a Construct or Undead; it makes a Wisdom saving throw or gains the Paralyzed condition for the duration. The target repeats the save at the end of each of its turns, ending the effect on a success.",
    "higherLevels": "You can target one additional creature for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Insect Plague",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "300 feet",
    "components": "V, S, M (a locust)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer"
    ],
    "description": "A swarm of biting insects fills a 20-foot-radius Sphere centered on a point you can see; the area is Lightly Obscured and Difficult Terrain. When a creature enters the Sphere or starts its turn there, it makes a Constitution saving throw, taking 4d10 Piercing damage on a failure or half as much on a success. A creature makes this save only once per turn.",
    "higherLevels": "The damage increases by 1d10 for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Jallarzi's Storm of Radiance",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a pinch of phosphorus)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "A tempest of blinding light and roaring sound fills a 10-foot-radius, 40-foot-high Cylinder centered on a point you can see. When a creature enters the area or starts its turn there, it makes a Constitution saving throw, taking 2d10 Radiant plus 2d10 Thunder damage on a failure or half as much on a success. While inside, creatures also have the Blinded and Deafened conditions and can't cast spells with a Verbal component.",
    "higherLevels": "The Radiant damage and the Thunder damage each increase by 1d10 for each spell slot level above 5.",
    "source": "phb"
  },
  {
    "name": "Legend Lore",
    "level": 5,
    "school": "Divination",
    "castingTime": "10 Minutes",
    "range": "Self",
    "components": "V, S, M (incense worth 250+ GP, which the spell consumes, and four ivory strips worth 50+ GP each)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "description": "You call up legendary knowledge about a notable person, place, or object that you name or describe. The magic assembles whatever significant lore is available, which might be a clear account, a handful of cryptic verses, or brief instructions, depending on how famous the subject is. If the subject isn't of legendary importance, you gather no information.",
    "source": "srd"
  },
  {
    "name": "Mass Cure Wounds",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "description": "A wave of healing energy sweeps out to up to six creatures of your choice within a 30-foot-radius Sphere centered on a point you can see. Each of them regains Hit Points equal to 5d8 plus your spellcasting ability modifier. The spell has no effect on Constructs or Undead.",
    "higherLevels": "The healing increases by 1d8 for each spell slot level above 5.",
    "source": "srd"
  },
  {
    "name": "Mislead",
    "level": 5,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "Self",
    "components": "S",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "You gain the Invisible condition and at the same time an illusory duplicate of yourself appears where you're standing. As a Magic action you can move the double up to twice your Speed and make it gesture, speak, and behave as you wish, and you can see and hear through it while doing so. Your invisibility ends if you attack or cast a spell, but the illusory double persists until the spell ends.",
    "source": "srd"
  },
  {
    "name": "Modify Memory",
    "level": 5,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You reach into a creature's mind, and it makes a Wisdom saving throw or gains the Charmed condition for the duration. While charmed, the target is Incapacitated and unaware of its surroundings, and you can reshape its memory of an event it experienced within the last 24 hours, editing, erasing, or inventing details. When the spell ends, the target can't recall your tampering, and the altered memory takes hold if left undisturbed.",
    "higherLevels": "You can alter memories of an event that took place further back: up to 7 days ago with a level 6 slot, 30 days with a level 7 slot, 365 days with a level 8 slot, or any time in the past with a level 9 slot.",
    "source": "srd"
  },
  {
    "name": "Passwall",
    "level": 5,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a pinch of sesame seeds)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You open a passage through a wooden, plaster, or stone surface you can see within range. The opening can be up to 5 feet wide, 8 feet tall, and 20 feet deep, and it lasts for the duration. When the spell ends, anything still inside the passage is safely shifted to the nearest unoccupied space.",
    "source": "srd"
  },
  {
    "name": "Planar Binding",
    "level": 5,
    "school": "Abjuration",
    "castingTime": "1 Hour",
    "range": "60 feet",
    "components": "V, S, M (a jewel worth 1,000+ GP, which the spell consumes)",
    "duration": "24 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "description": "You attempt to bind a Celestial, Elemental, Fey, or Fiend that is within range and remains so for the full casting time. The target makes a Charisma saving throw, and on a failure it is compelled to serve you for the duration, following your instructions to the best of its ability. An unwilling servant will act as maliciously as it can within your orders and will seek to twist your commands.",
    "higherLevels": "The duration is 10 days with a level 6 slot, 30 days with a level 7 slot, 180 days with a level 8 slot, and 1 year and a day with a level 9 slot.",
    "source": "srd"
  },
  {
    "name": "Rary's Telepathic Bond",
    "level": 5,
    "school": "Divination",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (two eggs)",
    "duration": "1 Hour",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You forge a telepathic link among up to eight willing creatures of your choice within range, including yourself if you wish. For the duration, the linked creatures can communicate telepathically with one another as long as they remain on the same plane of existence, sharing messages regardless of the languages they speak.",
    "source": "srd"
  },
  {
    "name": "Raise Dead",
    "level": 5,
    "school": "Necromancy",
    "castingTime": "1 Hour",
    "range": "Touch",
    "components": "V, S, M (a diamond worth 500+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Paladin"
    ],
    "description": "You restore life to a creature that has been dead no longer than 10 days, provided its soul is free and willing. The creature returns with 1 Hit Point, and this spell can't revive Undead, Constructs, or a body missing vital organs. Returning from death is taxing, so the creature takes a cumulative penalty on attack rolls, saving throws, and ability checks that lessens each time it finishes a Long Rest until it fades away.",
    "source": "srd"
  },
  {
    "name": "Reincarnate",
    "level": 5,
    "school": "Necromancy",
    "castingTime": "1 Hour",
    "range": "Touch",
    "components": "V, S, M (rare oils and unguents worth 1,000+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You touch a dead creature that has been dead no more than 10 days and craft a new adult body for its willing soul, which returns to life with all its Hit Points. The species of the new body is determined randomly or by the GM, and this change may alter the creature's ability scores accordingly. The creature keeps its memories and capabilities but must adjust to its new form.",
    "source": "srd"
  },
  {
    "name": "Scrying",
    "level": 5,
    "school": "Divination",
    "castingTime": "10 Minutes",
    "range": "Self",
    "components": "V, S, M (a focus worth 1,000+ GP, such as a crystal ball, mirror, or water-filled font)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid",
      "Warlock",
      "Wizard"
    ],
    "description": "You attempt to spy on a specific creature, which makes a Wisdom saving throw modified by how well you know it and what connection to it you possess. On a failure, an invisible sensor appears near the target and you can see and hear it and its immediate surroundings for the duration, moving with it as it travels. On a success, the target is unaffected and you can't target it again with this spell for 24 hours.",
    "source": "srd"
  },
  {
    "name": "Seeming",
    "level": 5,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You change the appearance of any number of creatures you choose within range, cloaking each in an illusory disguise that alters looks, clothing, armor, and gear. An unwilling target can resist with a Charisma saving throw. The illusion adjusts as a creature moves, but physical inspection reveals it, since a costume that looks like armor offers no real protection.",
    "source": "srd"
  },
  {
    "name": "Steel Wind Strike",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "S, M (a Melee weapon worth 1+ SP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Ranger",
      "Wizard"
    ],
    "description": "You flourish the weapon used to cast the spell and strike like a gust of wind at up to five creatures you can see within range. Make one melee spell attack against each target, dealing 6d10 Force damage on a hit. After the attacks, you can teleport into an unoccupied space you can see within 5 feet of one of the targets.",
    "source": "phb"
  },
  {
    "name": "Summon Celestial",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a reliquary worth 500+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Paladin"
    ],
    "description": "You call a Celestial spirit into an unoccupied space you can see, choosing an Avenger or Defender form that shapes its stat block. The spirit is friendly to you and your allies, acts on its own turn each round, and obeys your verbal commands without costing you an action. If you issue no command, it takes the Dodge action and moves to avoid danger.",
    "higherLevels": "Use the higher slot level in place of 5 wherever the Celestial Spirit stat block references the spell's level.",
    "source": "phb"
  },
  {
    "name": "Summon Dragon",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (an object with a dragon engraving worth 500+ GP)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You conjure a Draconic Spirit into an unoccupied space you can see, and it uses the accompanying stat block. The spirit is an ally to you and your companions, rolls its own initiative, and acts on its turn, obeying any verbal commands you give it at no cost of an action to you. If you give it no orders, it defends itself but takes no other actions.",
    "higherLevels": "Use the higher slot level in place of 5 wherever the Draconic Spirit stat block references the spell's level.",
    "source": "phb"
  },
  {
    "name": "Swift Quiver",
    "level": 5,
    "school": "Transmutation",
    "castingTime": "Bonus Action",
    "range": "Self",
    "components": "V, S, M (a Quiver holding at least one piece of ammunition)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Ranger"
    ],
    "description": "You enchant a quiver so it magically produces ammunition without running dry for the duration. On each of your turns until the spell ends, you can take the Attack action to make two attacks with a weapon that draws ammunition from that quiver as a Bonus Action. Each of those attacks uses the conjured ammunition, which vanishes after it hits or misses.",
    "source": "srd"
  },
  {
    "name": "Synaptic Static",
    "level": 5,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You unleash a burst of psychic energy in a 20-foot-radius Sphere centered on a point you can see. Each creature in the area makes an Intelligence saving throw, taking 8d6 Psychic damage on a failure or half as much on a success. A creature that fails also has muddled thoughts for 1 minute, subtracting 1d6 from its attack rolls, ability checks, and Constitution saves to maintain Concentration, and it can reroll that die at the end of each of its turns to try to end the effect.",
    "source": "phb"
  },
  {
    "name": "Telekinesis",
    "level": 5,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You gain the ability to move objects and creatures with your mind. As a Magic action each turn you can try to move a creature by contesting your spellcasting ability against its Strength (Athletics), shifting it up to 30 feet and possibly restraining it on a success. You can instead manipulate a loose object weighing up to 1,000 pounds, moving it, hurling it, or performing fine tasks with it at a distance.",
    "source": "srd"
  },
  {
    "name": "Teleportation Circle",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "1 Minute",
    "range": "10 feet",
    "components": "V, M (rare inks worth 50+ GP, which the spell consumes)",
    "duration": "1 Round",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You inscribe a glowing 10-foot-diameter circle on the ground that links to a permanent teleportation sigil sequence you know elsewhere on the same plane. Until the end of your next turn, any creature that steps into the circle is instantly transported to the vacant space nearest the destination circle. Learning a destination's sigil sequence generally requires studying it in person.",
    "source": "srd"
  },
  {
    "name": "Tree Stride",
    "level": 5,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Ranger"
    ],
    "description": "You gain the power to step into living trees and travel between them. As a Move action you can enter a tree within 5 feet of you and instantly emerge from another tree of the same kind that is within 500 feet, seeing your destination before you move. You can make one such transit each turn for the duration, and the spell ends if you finish a turn without having entered a tree.",
    "source": "srd"
  },
  {
    "name": "Wall of Force",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a shard of glass)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You conjure an invisible barrier of pure force, shaped either as a flat vertical wall of up to ten 10-foot panels or as a Sphere or Hemisphere up to 10 feet in radius. Nothing can physically pass through it, and it blocks the Ethereal Plane; it is immune to damage and can't be dispelled by Dispel Magic, though a Disintegrate spell destroys it instantly.",
    "source": "srd"
  },
  {
    "name": "Wall of Stone",
    "level": 5,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a small block of granite)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You raise a wall of nonmagical stone from up to ten 10-foot-by-10-foot panels, each 6 inches thick, arranged as a solid barrier, a bridge, a ramp, or other shapes you choose. Each panel has AC 15 and 30 Hit Points, and a panel reduced to 0 crumbles. If you maintain Concentration for the full 10 minutes, the wall becomes permanent and can no longer be dismissed.",
    "source": "srd"
  },
  {
    "name": "Yolande's Regal Presence",
    "level": 5,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "Self (10-foot Emanation)",
    "components": "V, S, M (a miniature tiara)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You wrap yourself in a regal aura that fills a 10-foot Emanation. When you cast the spell, and when a creature enters the area or ends its turn there, that creature makes a Wisdom saving throw. On a failure it takes 4d6 Psychic damage, gains the Prone condition, and is pushed up to 10 feet away from you; on a success it takes half damage and isn't moved or knocked prone.",
    "source": "phb"
  },
  {
    "name": "Arcane Gate",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "500 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You open two linked circular portals, each 10 feet across, on solid surfaces you can see within range and at least 20 feet apart. Anything that enters one portal exits from the other as though the two spaces were adjacent. As a Bonus Action you can rotate which way one of the openings faces.",
    "source": "phb"
  },
  {
    "name": "Blade Barrier",
    "level": 6,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You conjure a vertical wall of whirling blades, shaped either as a straight barrier up to 100 feet long, 20 feet high, and 5 feet thick, or as a ring 60 feet in diameter. It grants three-quarters cover to creatures behind it and its space is Difficult Terrain. A creature that enters the wall's area for the first time on a turn or starts its turn there makes a Dexterity save, taking 6d10 Slashing damage on a failure or half as much on a success.",
    "source": "srd"
  },
  {
    "name": "Bones of the Earth",
    "level": 6,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You cause up to six stone pillars to burst from the ground in spaces you can see within range, each 5 feet in diameter and up to 30 feet tall. A creature in a pillar's space is lifted with it. If a rising pillar would push a creature against a ceiling, that creature makes a Dexterity save, taking 6d6 Bludgeoning damage and being pinned in place on a failure, or ending up beside the pillar on a success.",
    "higherLevels": "Casting with a level 7+ slot creates two extra pillars for each slot level above 6.",
    "source": "phb"
  },
  {
    "name": "Chain Lightning",
    "level": 6,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (three silver pins)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You loose a bolt of lightning at one creature you can see, and the energy then leaps to as many as three more creatures within 30 feet of the first target. Each target makes a Dexterity save, taking 10d8 Lightning damage on a failure or half as much on a success.",
    "higherLevels": "Each slot level above 6 lets the lightning arc to one additional creature.",
    "source": "srd"
  },
  {
    "name": "Circle of Death",
    "level": 6,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (the powder of a crushed black pearl worth 500+ GP)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A surge of negative energy bursts outward in a 60-foot-radius Sphere centered on a point you choose within range. Each creature caught in the area makes a Constitution save, taking 8d6 Necrotic damage on a failure or half as much on a success.",
    "higherLevels": "The damage increases by 2d6 for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Conjure Fey",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Warlock"
    ],
    "description": "A Large fey spirit appears in an unoccupied space you can see within range and remains for the duration, occupying its space like a creature. When it manifests and as a Bonus Action on your later turns, you can teleport to an unoccupied space within 30 feet of the spirit. Also when it appears and on each of your turns afterward, you can make a melee spell attack against a creature within 5 feet of the spirit, dealing 3d12 Psychic damage plus your spellcasting ability modifier on a hit.",
    "higherLevels": "The attack's damage increases by 2d12 for each slot level above 6.",
    "source": "phb"
  },
  {
    "name": "Contingency",
    "level": 6,
    "school": "Abjuration",
    "castingTime": "10 minutes",
    "range": "Self",
    "components": "V, S, M (a statuette of yourself carved from ivory and decorated with gems worth 1,500+ GP)",
    "duration": "10 days",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You prepare a second spell of level 5 or lower to trigger automatically under a condition you describe. That stored spell must have a casting time of an action and be one that targets only you. When the chosen circumstance occurs, the spell goes off with no action required; you can have only one Contingency active at a time, and if it isn't triggered within 10 days it fades.",
    "source": "srd"
  },
  {
    "name": "Create Undead",
    "level": 6,
    "school": "Necromancy",
    "castingTime": "1 minute",
    "range": "10 feet",
    "components": "V, S, M (one clay pot of grave dirt, one clay pot of brackish water, and one 150+ GP black onyx stone for each corpse)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard"
    ],
    "description": "Working in dim light or darkness, you animate up to three corpses within range as Ghouls that obey your spoken commands. You keep control of them for 24 hours, after which they stop following you unless you recast this spell on them before the time runs out; each casting can maintain your hold over as many as three of the undead you already control instead of creating new ones.",
    "higherLevels": "With a level 7 slot you raise or command four Ghouls; with a level 8 slot, five Ghouls or two Ghasts or Wights; with a level 9 slot, six Ghouls, three Ghasts or Wights, or two Mummies.",
    "source": "srd"
  },
  {
    "name": "Disintegrate",
    "level": 6,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a lodestone and dust)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A thin green ray strikes a target you can see, which can be a creature, an object, or a magical barrier such as a Wall of Force. A targeted creature makes a Dexterity save, taking 10d6 + 40 Force damage on a failure; a creature reduced to 0 Hit Points this way is disintegrated into fine gray dust along with everything it carries except magic items. A Large or smaller nonmagical object, or a section of one, is destroyed outright.",
    "higherLevels": "The damage increases by 3d6 for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Drawmij's Instant Summons",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "1 minute",
    "range": "Touch",
    "components": "V, S, M (a sapphire worth 1,000+ GP)",
    "duration": "Until dispelled",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Wizard"
    ],
    "description": "You inscribe the name of an item on a sapphire and magically bind that gem to a single object weighing 10 pounds or less. Afterward you can use an action to speak the gem's name and instantly call the linked object to your hand from anywhere on the same plane. If another creature is holding or carrying the item, it isn't summoned, but you learn who has it and roughly where they are.",
    "source": "srd"
  },
  {
    "name": "Eyebite",
    "level": 6,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Your eyes gain a menacing power for the duration. On each of your turns until the spell ends you can take a Magic action to target a creature you can see within 60 feet, forcing a Wisdom save. On a failure you inflict one chosen effect: the target falls Unconscious (Asleep), becomes Frightened of you and must move away on its turns (Panicked), or gains the Poisoned condition (Sickened). A creature can be affected by only one of these at a time.",
    "source": "srd"
  },
  {
    "name": "Find the Path",
    "level": 6,
    "school": "Divination",
    "castingTime": "1 minute",
    "range": "Self",
    "components": "V, S, M (a set of divinatory tools worth 100+ GP)",
    "duration": "Concentration, up to 1 day",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "description": "Naming a place on the same plane that you have visited before, you sense the most direct physical route to reach it. For the duration you always know which way to travel toward that destination, following the shortest practical path around barriers, and you can't become lost by nonmagical means. The spell fails if you describe only a general kind of location rather than a specific one you've been to.",
    "source": "srd"
  },
  {
    "name": "Flesh to Stone",
    "level": 6,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a pinch of lime, water, and earth)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You attempt to petrify a creature you can see, which must make a Constitution save. On a failure it becomes Restrained as its body starts to harden, and it repeats the save at the end of each of its turns; three failed saves turn it fully to stone with the Petrified condition for the duration, while three successes end the effect. If it is still Petrified when the spell ends and you maintained Concentration the whole time, the transformation lasts until it is freed.",
    "source": "srd"
  },
  {
    "name": "Forbiddance",
    "level": 6,
    "school": "Abjuration",
    "castingTime": "10 minutes",
    "range": "Touch",
    "components": "V, S, M (a sprinkling of holy water, rare incense, and powdered ruby worth 1,000+ GP)",
    "duration": "1 day",
    "concentration": false,
    "ritual": true,
    "classes": [
      "Cleric"
    ],
    "description": "You ward an area up to 40,000 square feet against magical entry, blocking teleportation, planar travel, and passage through portals into the space. When you cast it you choose one damage type from Radiant, Necrotic, Cold, Fire, Acid, Lightning, Poison, or Psychic, and you may designate creature types such as fiends or undead; a chosen or hostile creature that enters or begins its turn in the area takes 5d10 damage of that type. Casting this spell in the same place every day for 30 days makes the ward permanent.",
    "source": "srd"
  },
  {
    "name": "Globe of Invulnerability",
    "level": 6,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (10-foot Radius)",
    "components": "V, S, M (a glass or crystal bead that shatters when the spell ends)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "An immobile, shimmering barrier forms in a 10-foot-radius Sphere around you and moves with nothing inside it. Any spell of level 5 or lower cast from outside the barrier fails to affect anything within it, even if cast with a higher-level slot to reach that area. Spells cast from inside the globe still work normally.",
    "higherLevels": "The barrier blocks one additional spell level for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Guards and Wards",
    "level": 6,
    "school": "Abjuration",
    "castingTime": "1 hour",
    "range": "Touch",
    "components": "V, S, M (burning incense, a small measure of brimstone and oil, a knotted string, a small amount of umber hulk blood, and a silver rod worth 10+ GP)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You blanket a structure up to 2,500 square feet with layered defenses for the duration. Corridors fill with fog, doors lock and become arcane-locked, stairs can fill with webs, and creatures in the area may be confused about direction. You also add one active deterrent of your choice, such as dancing lights, magic mouth warnings, gusting wind, or a minor damaging effect. Recasting the spell in the same location every day for a year makes the wards permanent.",
    "source": "srd"
  },
  {
    "name": "Harm",
    "level": 6,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You inflict a debilitating disease on a creature you can see, which makes a Constitution save. On a failure it takes 14d6 Necrotic damage and its Hit Point maximum is reduced by an amount equal to that damage until it finishes a Long Rest; on a success it takes half damage with no reduction to its maximum. This damage can't drop the target below 1 Hit Point.",
    "source": "srd"
  },
  {
    "name": "Heal",
    "level": 6,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "Channeling positive energy into a creature you can see, you restore 70 Hit Points to it. The surge of vitality also ends the Blinded and Deafened conditions and cures any diseases afflicting the target. The spell has no effect on Constructs or Undead.",
    "higherLevels": "The healing increases by 10 Hit Points for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Heroes' Feast",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "10 minutes",
    "range": "Self",
    "components": "V, S, M (a gem-encrusted bowl worth 1,000+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "description": "You conjure a lavish feast that takes an hour to consume and can nourish up to 12 creatures. Eating the whole meal cures the diner of diseases and the Poisoned and Frightened conditions, and for the next 24 hours it grants immunity to Poison damage, the Poisoned condition, and being Frightened. Each participant also increases its Hit Point maximum by 2d10 and gains that many current Hit Points for the same 24 hours.",
    "source": "srd"
  },
  {
    "name": "Magic Jar",
    "level": 6,
    "school": "Necromancy",
    "castingTime": "1 minute",
    "range": "Self",
    "components": "V, S, M (a gem, crystal, reliquary, or ornamental container worth 500+ GP)",
    "duration": "Until dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You transfer your soul into a prepared container, leaving your body inert but alive nearby. While housed in the vessel you can attempt to seize the body of a Humanoid within 100 feet, forcing it to make a Charisma save; on a failure you take control of its body while its soul is trapped in the container. You can return to the container as an action, and if the host body dies you must save or the spell ends, potentially killing you if your original body is gone.",
    "source": "srd"
  },
  {
    "name": "Mass Suggestion",
    "level": 6,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, M (a snake's tongue and a bit of honeycomb or a drop of sweet oil)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You verbally plant a suggested course of action in the minds of up to 12 creatures you can see within range, each of which must make a Wisdom save. A creature that fails pursues the suggested activity as best it can, provided the request sounds reasonable and isn't obviously self-destructive. The effect ends for a creature if it completes the task or takes damage that the suggestion would have caused.",
    "higherLevels": "The duration becomes 10 days with a level 7 slot, 30 days with a level 8 slot, and a year and a day with a level 9 slot.",
    "source": "srd"
  },
  {
    "name": "Move Earth",
    "level": 6,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a miniature shovel)",
    "duration": "Concentration, up to 2 hours",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You reshape loose terrain such as dirt, sand, or clay across an area up to 40 feet on a side, raising or lowering the ground, digging trenches, building earthen walls, or forming pillars. As a Bonus Action on later turns you can redirect the reshaping to another spot within range. The change happens too gradually to bury or trap creatures, and it doesn't affect solid stone.",
    "source": "srd"
  },
  {
    "name": "Otiluke's Freezing Sphere",
    "level": 6,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "300 feet",
    "components": "V, S, M (a small crystal sphere)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You hurl a frigid globe of energy that detonates in a 60-foot-radius Sphere at a point you can see. Each creature in the area makes a Constitution save, taking 10d6 Cold damage on a failure or half as much on a success, and any body of water it strikes freezes solid to a depth of 6 inches for 1 minute. Alternatively you can hold the magic as a marble-sized bead for up to 1 minute and throw or launch it later to trigger the same burst.",
    "higherLevels": "The damage increases by 1d6 for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Otto's Irresistible Dance",
    "level": 6,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "A creature you can see is compelled into a comical, uncontrollable dance with no saving throw at first. While dancing it must use all its movement to caper in place, has Disadvantage on Dexterity saves and attack rolls, and other creatures have Advantage on attack rolls against it. On each of its turns the dancer can take an action to make a Wisdom save, ending the spell on a success.",
    "source": "srd"
  },
  {
    "name": "Planar Ally",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "10 minutes",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You call upon a servant of a deity or other planar power, and if one heeds you a specific otherworldly creature you name appears within range. You can ask it to perform a task, but it always demands payment or a favor in return, with the price scaling to how difficult or long the requested service is. The creature is not under your control and may bargain, refuse, or turn hostile depending on the negotiation.",
    "source": "srd"
  },
  {
    "name": "Programmed Illusion",
    "level": 6,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a bit of fleece and jade dust worth 25+ GP)",
    "duration": "Until dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You craft an illusion of an object, creature, or scene within a 30-foot cube that stays dormant until a trigger you specify occurs. When activated, the illusion runs its scripted performance—complete with sound, smell, and temperature if you wish—for up to 5 minutes before vanishing and resetting to await the next trigger. A creature that studies it can make an Intelligence (Investigation) check against your spell save DC to recognize it as false.",
    "source": "srd"
  },
  {
    "name": "Sunbeam",
    "level": 6,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (60-foot Line)",
    "components": "V, S, M (a magnifying glass)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "A beam of brilliant sunlight lances out in a 60-foot Line that is 5 feet wide. Each creature in the Line makes a Constitution save, taking 6d8 Radiant damage and becoming Blinded until your next turn on a failure, or half damage with no blindness on a success. On each of your turns until the spell ends you can take a Magic action to fire the beam again, and bright light fills the Line's area for the duration.",
    "source": "srd"
  },
  {
    "name": "Tasha's Bubbling Cauldron",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "Bonus Action",
    "range": "5 feet",
    "components": "V, S, M (a gem-encrusted cup worth 500+ GP)",
    "duration": "10 minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You summon a floating, claw-footed cauldron of bubbling brew in an unoccupied space within range, where it hovers for the duration. When you cast the spell and as a Bonus Action on later turns, you can have it produce a potion that appears within 5 feet of it, which a creature can take and drink using its own action. With a 6th-level slot the cauldron yields a Potion of Healing.",
    "higherLevels": "The cauldron instead produces a Potion of Greater Healing with a level 7 slot, a Potion of Superior Healing with a level 8 slot, and a Potion of Supreme Healing with a level 9 slot.",
    "source": "phb"
  },
  {
    "name": "True Seeing",
    "level": 6,
    "school": "Divination",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a mushroom powder, saffron, and fat ointment worth 25+ GP, which the spell consumes)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "A willing creature you touch gains Truesight out to 120 feet for the duration. It can see in normal and magical darkness, notice invisible creatures and objects, automatically see through illusions and detect transformations, and perceive into the Ethereal Plane. The recipient also sees the true appearance of anything altered or hidden by magic within that range.",
    "source": "srd"
  },
  {
    "name": "Wall of Ice",
    "level": 6,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a small piece of quartz)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You raise a wall of ice on a surface within range, forming either a dome or sphere up to 10 feet in radius or a flat barrier of up to ten 10-foot-square panels, each 1 foot thick. When the wall appears, each creature in its space makes a Dexterity save, taking 10d6 Cold damage on a failure or half as much on a success. Each panel has AC 12 and 30 Hit Points, is vulnerable to Fire, and when destroyed leaves a sheet of frigid air; a creature moving through that air makes a Constitution save, taking 5d6 Cold damage on a failure or half on a success.",
    "higherLevels": "Both the damage dealt when the wall appears and the damage from the frigid air increase by 2d6 for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Wall of Thorns",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S, M (a handful of thorns)",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You grow a dense barrier of tough, spiked vines, shaped as a straight wall up to 60 feet long, 10 feet high, and 5 feet thick, or as a ring 20 feet in diameter. When it appears, each creature in its area makes a Dexterity save, taking 7d8 Piercing damage on a failure or half on a success. The wall is Difficult Terrain, and a creature that moves into or through it makes a Dexterity save, taking 7d8 Slashing damage on a failure or half as much on a success.",
    "higherLevels": "Both the Piercing and Slashing damage increase by 1d8 for each slot level above 6.",
    "source": "srd"
  },
  {
    "name": "Wind Walk",
    "level": 6,
    "school": "Transmutation",
    "castingTime": "1 minute",
    "range": "30 feet",
    "components": "V, S, M (fire and holy water)",
    "duration": "8 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You and up to ten willing creatures of your choice take on a gaseous, cloudlike form for the duration, gaining a Fly Speed of 300 feet and a hover, along with Resistance to Bludgeoning, Piercing, and Slashing damage. In this state a creature can't attack, cast spells, or manipulate objects, and returning to normal form takes 1 minute during which it is Incapacitated and has a Speed of 0. If a transformed creature is knocked out or falls in mid-air, it descends slowly rather than plummeting.",
    "source": "srd"
  },
  {
    "name": "Word of Recall",
    "level": 6,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "5 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You and as many as five willing creatures standing within 5 feet of you are instantly teleported to a sanctuary you designated beforehand by casting this spell there. The destination must be on the same plane of existence, and if a creature would arrive in an occupied space it is shunted to the nearest open spot. This provides a swift escape back to a place of safety you have previously prepared.",
    "source": "srd"
  },
  {
    "name": "Conjure Celestial",
    "level": 7,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You summon a celestial spirit into an unoccupied space you can see, and it sheds Bright Light in a 30-foot radius plus Dim Light for another 30 feet. When you cast the spell and again as a Bonus Action on later turns, you pick a point within 60 feet of the spirit and choose one of two effects: restore 4d12 Hit Points split among creatures of your choice within 10 feet of that point, or force creatures of your choice within 10 feet to make a Dexterity saving throw, taking 6d12 Radiant damage on a failure and half as much on a success.",
    "higherLevels": "The healing increases by 2d12 and the Radiant damage increases by 3d12 for each spell slot level above 7.",
    "source": "srd"
  },
  {
    "name": "Crown of Stars",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "Seven star-like motes of light begin orbiting your head for the duration. When you cast the spell and again as a Bonus Action afterward, you can send one mote streaking toward a target within 120 feet, making a ranged spell attack that deals 4d12 Radiant damage on a hit. While four or more motes remain you shed Bright Light in a 30-foot radius and Dim Light for another 30 feet; while at least one remains the light dims accordingly, and the spell ends when the last mote is spent.",
    "higherLevels": "You create two additional motes for each spell slot level above 7.",
    "source": "phb"
  },
  {
    "name": "Delayed Blast Fireball",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a ball of bat guano and sulfur)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A glowing bead of energy flies to a point you choose and hovers there until the spell ends. When your concentration breaks, the bead detonates in a 20-foot-radius Sphere, forcing each creature in the area to make a Dexterity saving throw for 12d6 Fire damage, or half as much on a success. The potential damage grows by 1d6 at the end of each of your turns while the bead waits, and a creature that touches the bead can hurl it up to 40 feet, triggering an early explosion.",
    "higherLevels": "The base damage increases by 1d6 for each spell slot level above 7.",
    "source": "srd"
  },
  {
    "name": "Divine Word",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Bonus Action",
    "range": "30 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "You utter a word of primordial power, and each creature of your choice within range must succeed on a Charisma saving throw or suffer an effect based on its current Hit Points. Creatures with 50 or fewer are Deafened for 1 minute; 40 or fewer are Deafened and Blinded for 10 minutes; 30 or fewer are Blinded, Deafened, and Stunned for 1 hour; and a creature with 20 or fewer is killed instantly. In addition, any Celestial, Elemental, Fey, or Fiend that fails is forced back to its home plane and can't return for 24 hours by any means short of a Wish.",
    "source": "srd"
  },
  {
    "name": "Etherealness",
    "level": 7,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S",
    "duration": "Up to 8 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You step partway into the Ethereal Plane, entering the Border Ethereal, where you perceive the plane you left in shades of gray out to 60 feet. While there you can move in any direction and pass through solid objects native to the plane you came from, though you can't affect or be affected by creatures on that plane. The spell fails if you try to cast it on the Ethereal Plane or a plane that doesn't border it, and you return to physical existence in the space you occupy, or the nearest empty space, when it ends.",
    "higherLevels": "You can bring along one additional willing creature you touch for each spell slot level above 7.",
    "source": "srd"
  },
  {
    "name": "Finger of Death",
    "level": 7,
    "school": "Necromancy",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You unleash negative energy at a creature you can see within range, forcing a Constitution saving throw. The target takes 7d8 + 30 Necrotic damage on a failed save, or half as much on a success. A Humanoid slain by this spell rises at the start of your next turn as a Zombie under your permanent command, obeying your verbal orders.",
    "source": "srd"
  },
  {
    "name": "Fire Storm",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer"
    ],
    "description": "Roaring flames erupt in an area you shape from ten contiguous 10-foot Cubes within range, arranged however you like as long as at least one face of each cube touches another. Each creature in the area makes a Dexterity saving throw, taking 7d10 Fire damage on a failure and half as much on a success. The fire doesn't harm plant life in the area unless you choose otherwise, and you decide whether other flammable objects that aren't being worn or carried catch fire.",
    "source": "srd"
  },
  {
    "name": "Forcecage",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "100 feet",
    "components": "V, S, M (ruby dust worth 1,500+ GP, which the spell consumes)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "You conjure an immobile prison of invisible force in a shape of your choosing: either a 20-foot Cube made of bars (with 1/2-inch gaps) that traps creatures too large to slip through, or a solid 10-foot Cube that seals off everything inside. Nothing physical can pass the barrier, and a creature within it that tries to leave by teleportation or planar travel must first succeed on a Charisma saving throw or the attempt fails. The cage can't be dispelled by Dispel Magic.",
    "source": "srd"
  },
  {
    "name": "Mirage Arcane",
    "level": 7,
    "school": "Illusion",
    "castingTime": "10 Minutes",
    "range": "Sight",
    "components": "V, S",
    "duration": "10 days",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Wizard"
    ],
    "description": "You reshape how a stretch of terrain up to a 1-mile square appears, sounds, smells, and feels, turning open ground into a swamp, a road into a chasm, or the like. The illusion includes convincing physical texture, so ground made to look like difficult terrain hinders movement accordingly, and structures can seem to appear or vanish. Creatures with Truesight see through the disguise to the real terrain but must still contend with any physical elements the spell adds, such as the effort of crossing illusory rough ground.",
    "source": "srd"
  },
  {
    "name": "Mordenkainen's Magnificent Mansion",
    "level": 7,
    "school": "Conjuration",
    "castingTime": "1 Minute",
    "range": "300 feet",
    "components": "V, S, M (a miniature ivory door, a polished marble stone, and a silver spoon, each worth 5+ GP)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You conjure an extradimensional dwelling entered through a shimmering, invisible doorway that only you and creatures you designate can perceive and use. Inside lies a luxurious mansion with room and provisions for up to 100 people, staffed by translucent servants who tend to guests' needs. Creatures inside when the spell ends are gently expelled to the nearest unoccupied space by the entrance, and nothing created within can leave except through the door.",
    "source": "srd"
  },
  {
    "name": "Mordenkainen's Sword",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "90 feet",
    "components": "V, S, M (a miniature platinum sword worth 250+ GP)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You call a blade of shimmering force into being in an unoccupied space you can see within range. When you cast the spell and again as a Bonus Action on later turns, you can move the sword up to 30 feet to a spot within range and make a melee spell attack against a target within 5 feet of it, dealing 3d10 Force damage on a hit.",
    "source": "srd"
  },
  {
    "name": "Plane Shift",
    "level": 7,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (a forked metal rod worth 250+ GP and attuned to a plane of existence)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You and up to eight willing creatures who join hands in a circle are transported to a different plane of existence, arriving at or near a destination you describe, with the exact spot left to the DM. Alternatively, you can target one unwilling creature you touch, which must succeed on a Charisma saving throw or be banished to another plane, appearing near a randomly determined location there.",
    "source": "srd"
  },
  {
    "name": "Power Word Fortify",
    "level": 7,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "description": "You speak a word of warding and bolster the resilience of up to six creatures you can see within range. Distribute 120 Temporary Hit Points among them however you like, giving each chosen creature a share of the total.",
    "source": "phb"
  },
  {
    "name": "Prismatic Spray",
    "level": 7,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Self (60-foot Cone)",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Eight rays of shimmering, colored light flash from your hand in a Cone. For each creature in the area, roll 1d8 to determine which ray strikes it, then it makes a Dexterity saving throw. Rays 1 through 5 deal 12d6 damage of Fire, Acid, Lightning, Poison, or Cold respectively (half on a success); ray 6 leaves a failed target Restrained and then Petrified on its next turn; ray 7 leaves it Blinded and then, at the start of your next turn, banished to another plane; and an 8 means the target is struck by two rays, rolled again (rerolling any 8s).",
    "source": "srd"
  },
  {
    "name": "Project Image",
    "level": 7,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "500 miles",
    "components": "V, S, M (a small replica of you worth 5+ GP)",
    "duration": "Concentration, up to 1 day",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You create an illusory copy of yourself at a location within range that you have seen before. The image looks and sounds exactly like you, mimicking your movements, and as a Magic action you can move it up to twice your Speed and make it gesture, speak, and behave as you wish. You can perceive through its eyes and ears as if you were present, and a creature that studies it can discern the illusion with a successful Intelligence (Investigation) check against your spell save DC, after which it becomes translucent.",
    "source": "srd"
  },
  {
    "name": "Regenerate",
    "level": 7,
    "school": "Transmutation",
    "castingTime": "1 Minute",
    "range": "Touch",
    "components": "V, S, M (a prayer wheel and holy water)",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Druid"
    ],
    "description": "Your touch floods a creature with vitality, immediately restoring 4d8 + 15 Hit Points. For the duration the target regains 1 Hit Point at the start of each of its turns, or 15 at the start of each of your turns. Severed body parts such as limbs, digits, or organs reattach if held in place, and any that are missing regrow over the course of two minutes.",
    "source": "srd"
  },
  {
    "name": "Resurrection",
    "level": 7,
    "school": "Necromancy",
    "castingTime": "1 Hour",
    "range": "Touch",
    "components": "V, S, M (a diamond worth 1,000+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "description": "You touch a creature that has been dead for no more than a century and didn't die of old age, returning it to life with all of its Hit Points. The spell neutralizes poisons and cures ordinary diseases affecting the body at death, and it can restore an undead creature to its former living self. The returned creature takes a -4 penalty to all attack rolls, saving throws, and ability checks that lessens by 1 each time it finishes a Long Rest until it disappears, and reviving a creature dead for a year or longer taxes you so that you can't cast spells until you finish a Long Rest.",
    "source": "srd"
  },
  {
    "name": "Reverse Gravity",
    "level": 7,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "100 feet",
    "components": "V, S, M (iron filings and a lodestone)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Gravity reverses within a vertical Cylinder 50 feet in radius and 100 feet high centered on a point within range, so unanchored creatures and objects fall upward and strike the top of the area. A creature can attempt a Dexterity saving throw to grab hold of a fixed object within reach and avoid the fall. Anything that reaches the top of the Cylinder floats there until the spell ends, whereupon everything falls back down.",
    "source": "srd"
  },
  {
    "name": "Sequester",
    "level": 7,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S, M (powder of diamond and emerald worth 5,000+ GP, which the spell consumes)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You hide a willing creature or an object you touch from sight and detection, rendering it Invisible and shielded from all divination magic and magical scrying. If the target is a creature, it also enters a state of suspended animation, ceasing to age and needing neither food nor air. You can set a trigger condition, such as a length of time passing or a particular event, that ends the spell when met.",
    "source": "srd"
  },
  {
    "name": "Simulacrum",
    "level": 7,
    "school": "Illusion",
    "castingTime": "12 Hours",
    "range": "Touch",
    "components": "V, S, M (powdered ruby worth 1,500+ GP, which the spell consumes, plus ice or snow shaped like the target)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "Over the casting time you shape ice or snow into a duplicate of a Beast or Humanoid within reach, creating an obedient friendly copy with the target's game statistics except that it has half the original's Hit Point maximum and can't regain Hit Points normally or use spell slots. The simulacrum is a distinct creature that follows your spoken commands and acts on its own turn. If it loses Hit Points it can only be repaired with an arcane laboratory and time, and it crumbles to snow when it drops to 0 Hit Points.",
    "source": "srd"
  },
  {
    "name": "Symbol",
    "level": 7,
    "school": "Abjuration",
    "castingTime": "1 Minute",
    "range": "Touch",
    "components": "V, S, M (mercury, phosphorus, and powdered diamond and opal worth 1,000+ GP, which the spell consumes)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric",
      "Wizard"
    ],
    "description": "You inscribe a harmful glyph onto a surface or within a closed object such as a book or chest, and you set the condition that triggers it. When triggered, the glyph flares within a 60-foot-radius Sphere and affects creatures there according to the harmful effect you chose from options like Death, Discord, Fear, Hopelessness, Insanity, Pain, Sleep, or Stunning, each requiring the appropriate saving throw. The glyph is nearly invisible and can be found only with a successful Intelligence (Investigation) check against your spell save DC.",
    "source": "srd"
  },
  {
    "name": "Teleport",
    "level": 7,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "10 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You instantly transport yourself and up to eight willing creatures within range, or a single object, to a destination you designate. Accuracy depends on how well you know the destination: roll on a table where greater familiarity makes an on-target arrival more likely, while a poorly known place risks arriving off target, in a similar-looking area, or suffering a mishap that deals 3d10 Force damage and reshuffles the group for another roll.",
    "source": "srd"
  },
  {
    "name": "Animal Shapes",
    "level": 8,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S",
    "duration": "Concentration, up to 24 hours",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You transform any number of willing creatures you can see within range into a single Beast form of your choice that is Large or smaller and has a Challenge Rating of 4 or lower. Each affected creature adopts that Beast's statistics, but keeps its own Intelligence, Wisdom, Charisma, alignment, and personality, and gains temporary Hit Points equal to the Beast's Hit Points. A creature reverts when it drops to 0 temporary Hit Points or when you end the spell, and any leftover damage carries over to its true form. While transformed, a creature can't cast spells or speak, though it can still take other actions the form allows.",
    "source": "srd"
  },
  {
    "name": "Antimagic Field",
    "level": 8,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (10-foot Radius)",
    "components": "V, S, M (iron filings)",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Wizard"
    ],
    "description": "A 10-foot-radius sphere of magical nullification surrounds you and moves with you. Within it, spells can't be cast, magic items function as mundane objects, ongoing spell effects are suppressed, summoned or created magical creatures temporarily wink out of existence, and attempts to cast into or out of the area fail. A spell of higher level than this one is not automatically suppressed, but its area doesn't extend into the field. Areas of other magic that overlap the sphere are held in check while they intersect it.",
    "source": "srd"
  },
  {
    "name": "Antipathy/Sympathy",
    "level": 8,
    "school": "Enchantment",
    "castingTime": "1 Hour",
    "range": "60 feet",
    "components": "V, S, M (a lump of alum soaked in vinegar for the Antipathy effect or a drop of honey for the Sympathy effect)",
    "duration": "10 days",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Wizard"
    ],
    "description": "You enchant a creature or object no larger than a 200-foot cube to strongly repel or attract a specific kind of intelligent creature that you name. With Antipathy, an affected creature that comes within 60 feet or sees the target must succeed on a Wisdom saving throw or become Frightened until it moves beyond 60 feet, and it will try to flee. With Sympathy, such a creature is instead compelled to approach; on a failed save it moves toward the target and is reluctant to leave, repeating the save only after it takes damage, once every 24 hours, or if it moves more than 60 feet away. A creature that succeeds on its save is immune to this casting for 1 minute.",
    "source": "srd"
  },
  {
    "name": "Clone",
    "level": 8,
    "school": "Necromancy",
    "castingTime": "1 Hour",
    "range": "Touch",
    "components": "V, S, M (a diamond worth 1,000+ GP and at least a cubic inch of flesh from the creature being cloned, both of which the spell consumes, plus a sealable vessel worth 2,000+ GP large enough to hold a Medium creature)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You grow an inert duplicate of a living creature inside the vessel as a safeguard against death. The body matures over 120 days into a physical copy of the creature at the age it was when the spell was cast, or younger if you choose. When the original creature dies afterward, its soul transfers to the clone if that soul is free and willing, and the clone awakens with all of the original's memories, personality, and abilities. The original body, if it still exists, becomes lifeless and can't be restored to life while the clone lives.",
    "source": "srd"
  },
  {
    "name": "Control Weather",
    "level": 8,
    "school": "Transmutation",
    "castingTime": "10 Minutes",
    "range": "Self (5-mile Radius)",
    "components": "V, S, M (burning incense and bits of earth and wood mixed in water)",
    "duration": "Concentration, up to 8 hours",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Wizard"
    ],
    "description": "While outdoors, you seize control of the weather within 5 miles of you. You can shift the current conditions of precipitation, temperature, and wind up or down one stage on their respective scales, choosing the new condition from the range available for the season. Each change takes 1d4 by 10 minutes to take full effect, and the weather gradually returns to normal once the spell ends.",
    "source": "srd"
  },
  {
    "name": "Demiplane",
    "level": 8,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "S",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You conjure a shadowy doorway on a flat surface you can see within range. The door opens into an empty demiplane shaped like a 30-foot cube of wood or stone, and creatures can pass through the doorway in either direction. When the spell ends, the door vanishes, sealing anyone inside within the demiplane. Each time you cast this spell you can create a new demiplane or open a door to one you or another caster made before, letting you use these pocket spaces for storage or as a hidden refuge.",
    "source": "srd"
  },
  {
    "name": "Dominate Monster",
    "level": 8,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You attempt to seize control of one creature you can see within range, which must succeed on a Wisdom saving throw or become Charmed by you for the duration. While the target is Charmed this way, you share a telepathic link with it as long as you're on the same plane, and you can direct its movement and actions with a mental command; without a specific command it simply defends itself. Using your action, you can take full control until the end of your next turn, and each time the target takes damage it can repeat the saving throw to end the effect.",
    "higherLevels": "When cast using a level 9 spell slot, the duration becomes Concentration, up to 8 hours.",
    "source": "srd"
  },
  {
    "name": "Earthquake",
    "level": 8,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "500 feet",
    "components": "V, S, M (a fistful of dirt, a piece of rock, and a lump of clay)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid",
      "Sorcerer"
    ],
    "description": "You unleash a violent tremor across a 100-foot-radius circle of ground centered on a point within range. The shaking makes the area Difficult Terrain, and each creature on the ground when you cast the spell and at the start of each of your turns must succeed on a Dexterity saving throw or fall Prone. Structures in the area take 50 bludgeoning damage each round and collapse when reduced to 0 Hit Points, potentially burying those nearby. On your later turns you can open fissures in the ground: a creature standing over a new fissure must save or fall in, and the crevices can swallow creatures whole.",
    "source": "srd"
  },
  {
    "name": "Glibness",
    "level": 8,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "Self",
    "components": "V",
    "duration": "1 hour",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock"
    ],
    "description": "You imbue your words with supernatural persuasiveness for the duration. Whenever you make a Charisma check, you can replace the number you roll on the d20 with a 15, taking whichever result you prefer. In addition, no magic can determine whether you are telling the truth, so lie-detecting effects always register your statements as honest.",
    "source": "phb"
  },
  {
    "name": "Holy Aura",
    "level": 8,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Self (30-foot Radius)",
    "components": "V, S, M (a reliquary worth 1,000+ GP)",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Radiant light spreads out to a 30-foot radius from you, and you designate any number of creatures in that area to be protected. Each protected creature sheds dim light out to 5 feet, has Advantage on all saving throws, and imposes Disadvantage on attack rolls made against it. Furthermore, when a Fiend or an Undead hits a protected creature with a melee attack, that attacker must succeed on a Constitution saving throw or be Blinded until the spell ends.",
    "source": "srd"
  },
  {
    "name": "Incendiary Cloud",
    "level": 8,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "A swirling 20-foot-radius sphere of smoke shot through with burning embers appears at a point within range and Heavily Obscures the area. When the cloud appears and whenever a creature enters it or starts its turn there, that creature must make a Dexterity saving throw, taking 10d8 fire damage on a failure or half as much on a success. The cloud drifts 10 feet away from you at the start of each of your turns, and a strong wind can disperse it, ending the spell.",
    "source": "srd"
  },
  {
    "name": "Maze",
    "level": 8,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Concentration, up to 10 minutes",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You banish one creature you can see within range into a labyrinthine demiplane, where it vanishes from your plane for the duration. The trapped creature can use its action to try to escape by making a DC 20 Intelligence check; on a success it finds an exit and reappears in the nearest unoccupied space to where it left. When the spell ends, the target returns to the space it vanished from, or the nearest unoccupied one if that space is filled.",
    "source": "srd"
  },
  {
    "name": "Mind Blank",
    "level": 8,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Wizard"
    ],
    "description": "You touch a willing creature and shield its mind against intrusion for the duration. The target gains Immunity to Psychic damage and to any effect that would sense its emotions or read its thoughts, and it can't be Charmed or Frightened. Divination magic can't perceive or locate the creature, and even a Wish spell can't gather information about it or affect it against its will.",
    "source": "srd"
  },
  {
    "name": "Power Word Stun",
    "level": 8,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You speak a word of power at one creature you can see within range. If the target has 150 Hit Points or fewer, it is Stunned; a target with more than 150 Hit Points is instead unaffected. A Stunned creature repeats a Constitution saving throw at the end of each of its turns, ending the condition on a success.",
    "source": "srd"
  },
  {
    "name": "Sunburst",
    "level": 8,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (fire and a piece of sunstone)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Druid",
      "Sorcerer",
      "Wizard"
    ],
    "description": "Brilliant sunlight erupts in a 60-foot-radius sphere centered on a point you choose within range. Each creature in the area must make a Constitution saving throw, taking 12d6 radiant damage and being Blinded for 1 minute on a failure, or half as much damage and no blindness on a success. A Blinded creature can repeat the save at the end of each of its turns to end the effect. The burst also dispels any Darkness in its area that was created by a spell.",
    "source": "srd"
  },
  {
    "name": "Telepathy",
    "level": 8,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "Unlimited",
    "components": "V, S, M (a pair of linked silver rings)",
    "duration": "24 hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You forge a telepathic link with one willing creature you're familiar with, allowing the two of you to exchange words, images, sounds, and other sensory messages regardless of the distance between you, so long as you're both on the same plane of existence. The target doesn't need to share a language with you to understand your transmissions and to send its own. The connection lasts for the duration.",
    "source": "srd"
  },
  {
    "name": "Tsunami",
    "level": 8,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Sight",
    "components": "V, S",
    "duration": "Concentration, up to 6 rounds",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "You raise a towering wall of water up to 300 feet long, 300 feet high, and 50 feet thick at a point you can see. When the wall appears, each creature in its area must make a Strength saving throw, taking 6d10 bludgeoning damage on a failure or half as much on a success. At the start of each of your later turns, the wall's height drops by 50 feet and it surges 50 feet toward the far edge of its length, dealing 1d10 less damage to creatures caught in it each round. Swimming through the moving wall is difficult, requiring a creature to spend extra movement against the current.",
    "source": "srd"
  },
  {
    "name": "Befuddlement",
    "level": 8,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "150 feet",
    "components": "V, S, M (a key ring with no keys)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Warlock",
      "Wizard"
    ],
    "description": "You shatter one creature's mind. It makes an Intelligence saving throw, taking 10d12 Psychic damage on a failure or half as much on a success. On a failed save the target also can't cast spells, take the Magic action, or use spellcasting-related features for the next 30 days. The target repeats the save every 30 days, and Greater Restoration, Heal, or Wish can end the effect early.",
    "source": "phb"
  },
  {
    "name": "Astral Projection",
    "level": 9,
    "school": "Necromancy",
    "castingTime": "1 Hour",
    "range": "10 feet",
    "components": "V, S, M (for each creature, a jacinth worth 1,000+ GP and an ornately carved silver bar worth 100+ GP, all of which the spell consumes)",
    "duration": "Special",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Warlock",
      "Wizard"
    ],
    "description": "You and up to eight willing creatures within range project your astral bodies onto the Astral Plane, leaving your physical bodies behind in a state of suspended animation. Each traveler's astral form is linked to its body by a silvery cord; while the spell lasts you can explore the Astral Plane and step through to other planes. The effect continues until you choose to end it or until a traveler's astral form drops to 0 Hit Points, and a projected creature that is killed on another plane has its body and possessions left where they were. Severing a silver cord (which requires a special effect) or destroying the resting body ends the journey and traps that creature.",
    "source": "srd"
  },
  {
    "name": "Foresight",
    "level": 9,
    "school": "Divination",
    "castingTime": "1 Minute",
    "range": "Touch",
    "components": "V, S, M (a hummingbird feather)",
    "duration": "8 Hours",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Druid",
      "Warlock",
      "Wizard"
    ],
    "description": "You grant a willing creature glimpses of the immediate future for the duration. The target can't be surprised and has Advantage on D20 Tests (attack rolls, ability checks, and saving throws), while attack rolls made against it have Disadvantage. Casting this spell again on any target ends the effect on a creature already benefiting from it.",
    "source": "srd"
  },
  {
    "name": "Gate",
    "level": 9,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S, M (a diamond worth 5,000+ GP)",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Cleric",
      "Sorcerer",
      "Wizard"
    ],
    "description": "You conjure a circular portal, 5 to 20 feet in diameter, linking an unoccupied space you can see to a precise point on another plane of existence. Creatures can travel through the ring in either direction, but the direction of passage is fixed when the gate opens. If you speak the name of a specific creature while casting, the portal opens next to that being and pulls it through toward you, though a deity or planar ruler can prevent this. The gate stays open only while you concentrate.",
    "source": "srd"
  },
  {
    "name": "Imprisonment",
    "level": 9,
    "school": "Abjuration",
    "castingTime": "1 Minute",
    "range": "30 feet",
    "components": "V, S, M (a vellum depiction or carved statuette of the target, and a special component that varies by the chosen form of imprisonment, worth 500+ GP per Hit Point of the target)",
    "duration": "Until Dispelled",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You attempt to bind a creature you can see within range; it must succeed on a Wisdom saving throw or be imprisoned in one of several forms you choose, such as encased in a buried sphere, chained in a demiplane, shrunk into a tiny object, put into an endless sleep, or sealed in a minute prison. While bound, the target doesn't age, doesn't need food or air, and is held helpless until freed. Only Dispel Magic cast using a 9th-level slot, or a special condition you set when casting, can end the imprisonment, and casting the spell again on the same target fails while it remains bound.",
    "source": "srd"
  },
  {
    "name": "Mass Heal",
    "level": 9,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric"
    ],
    "description": "Healing energy pours out toward creatures of your choice within range, restoring up to 700 Hit Points total divided among them as you wish. Any creature you heal this way is also freed of the Blinded, Deafened, and any diseases affecting it. This spell has no effect on Undead or Constructs.",
    "source": "srd"
  },
  {
    "name": "Meteor Swarm",
    "level": 9,
    "school": "Evocation",
    "castingTime": "Action",
    "range": "1 mile",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "Blazing orbs of fire crash down at four points you can see within range, each creating a 40-foot-radius Sphere of destruction (overlapping areas aren't hit twice). Every creature in the areas makes a Dexterity saving throw, taking 20d6 Fire damage plus 20d6 Bludgeoning damage on a failure, or half as much on a success. The spell also ignites flammable objects that aren't being worn or carried.",
    "source": "srd"
  },
  {
    "name": "Power Word Heal",
    "level": 9,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "Touch",
    "components": "V, S",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Cleric"
    ],
    "description": "A surge of healing washes over a creature you touch, restoring all of its Hit Points. If the target is Charmed, Frightened, Paralyzed, Poisoned, or Stunned, those conditions end, and if it has the Prone condition it can use its Reaction to stand up. This spell has no effect on Undead or Constructs.",
    "source": "phb"
  },
  {
    "name": "Power Word Kill",
    "level": 9,
    "school": "Enchantment",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Bard",
      "Sorcerer",
      "Warlock",
      "Wizard"
    ],
    "description": "You speak a word of lethal power at one creature you can see within range. If that creature has 100 Hit Points or fewer, it dies instantly with no saving throw. Against a target with more than 100 Hit Points, the spell fails and is wasted.",
    "source": "srd"
  },
  {
    "name": "Prismatic Wall",
    "level": 9,
    "school": "Abjuration",
    "castingTime": "Action",
    "range": "60 feet",
    "components": "V, S",
    "duration": "10 Minutes",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Wizard"
    ],
    "description": "You conjure a shimmering barrier of seven colored layers, shaped either as a vertical wall up to 90 feet long, 30 feet high, and 1 inch thick, or as a Sphere with a 30-foot radius around a point. The wall sheds Bright Light, and a creature within 20 feet that can see it has Disadvantage on attack rolls against creatures behind it. Passing through means confronting each layer in turn, and a creature that tries makes a Dexterity saving throw against each one, suffering that layer's effect (Fire, Acid, Lightning, Poison, and Cold damage on the first five, plus Petrification and banishment to another plane on the last two). Antimagic Field doesn't disable the wall, but the layers can be destroyed in order by their matching damage types, and Cone of Cold, Daylight, Disintegrate, Gust of Wind, Magic Missile, and Passwall each counter specific layers.",
    "source": "srd"
  },
  {
    "name": "Shapechange",
    "level": 9,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V, S, M (a jade circlet worth 1,500+ GP, which you must place on your head before you cast the spell)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid",
      "Wizard"
    ],
    "description": "You transform into any Beast, Dragon, Elemental, Fey, Giant, Monstrosity, or similar creature whose Challenge Rating is no higher than your level, provided you have seen such a creature. You take on the new form's game statistics, gaining its size, senses, movement, and abilities while keeping your own alignment, personality, Intelligence, Wisdom, and Charisma; your Hit Points and Hit Point Dice remain yours as well. You can shift into a different eligible form as a Bonus Action, and the spell ends early if you drop to 0 Hit Points. You retain the ability to speak and cast your own spells if the new form's anatomy allows.",
    "source": "srd"
  },
  {
    "name": "Storm of Vengeance",
    "level": 9,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Sight",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Druid"
    ],
    "description": "A towering storm cloud with a 360-foot radius forms at a point you can see. When it appears, every creature beneath it makes a Constitution saving throw, taking 2d6 Thunder damage and gaining the Deafened condition for the duration on a failure. On each of your later turns the storm unleashes a new escalating effect: acid rain (1d6 Acid, no save) on the second round, six lightning bolts (Dexterity save or 10d6 Lightning each) on the third, hailstones (2d6 Bludgeoning, no save) on the fourth, and freezing rain that deals 1d6 Cold, turns the area to Difficult Terrain, and forces Dexterity saves against the Prone condition through the remaining rounds, with gusting wind halving ranged attacks and hampering movement throughout.",
    "source": "srd"
  },
  {
    "name": "Time Stop",
    "level": 9,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "Self",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "You briefly freeze the flow of time for everyone but yourself, gaining 1d4 + 1 turns in a row during which you can act while other creatures remain motionless. The effect ends immediately if any action you take, or any effect you create, affects a creature other than you or an object being worn or carried by someone else, and it also ends if you move more than 1,000 feet from where you cast it.",
    "source": "srd"
  },
  {
    "name": "True Polymorph",
    "level": 9,
    "school": "Transmutation",
    "castingTime": "Action",
    "range": "30 feet",
    "components": "V, S, M (a drop of mercury, a dollop of gum arabic, and a wisp of smoke)",
    "duration": "Concentration, up to 1 Hour",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Bard",
      "Warlock",
      "Wizard"
    ],
    "description": "You attempt to transform a creature or object you can see within range; an unwilling creature can resist with a Wisdom saving throw. You can turn a creature into a different creature, a creature into an object, or an object into a creature, with the new creature form having a Challenge Rating no greater than the target's CR or level. A transformed creature takes on the new form's statistics but keeps its own alignment and personality, and if reduced to 0 Hit Points it reverts to its true form. If you maintain Concentration for the full hour the change becomes permanent and no longer requires Concentration.",
    "source": "srd"
  },
  {
    "name": "True Resurrection",
    "level": 9,
    "school": "Necromancy",
    "castingTime": "1 Hour",
    "range": "Touch",
    "components": "V, S, M (a sprinkle of holy water and diamonds worth 25,000+ GP, which the spell consumes)",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Cleric",
      "Druid"
    ],
    "description": "You restore life to a creature that has been dead for up to 200 years, provided it didn't die of old age and isn't Undead. The creature returns with all its Hit Points restored, cured of every condition, disease, poison, and curse, with damaged organs and lost limbs regrown. This spell can even create a new body if the original is gone, so long as you speak the creature's name, and it can return a creature turned Undead or transformed into another form to its original living self.",
    "source": "srd"
  },
  {
    "name": "Weird",
    "level": 9,
    "school": "Illusion",
    "castingTime": "Action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Concentration, up to 1 Minute",
    "concentration": true,
    "ritual": false,
    "classes": [
      "Warlock",
      "Wizard"
    ],
    "description": "You draw on the deepest fears of creatures in a 30-foot-radius Sphere centered on a point within range, and each must succeed on a Wisdom saving throw or take 10d10 Psychic damage and gain the Frightened condition for the duration. At the end of each of its turns, a Frightened target repeats the save, taking 5d10 Psychic damage on a failure, until it succeeds or the spell ends. A creature that can't be Frightened is immune to the effect.",
    "source": "srd"
  },
  {
    "name": "Wish",
    "level": 9,
    "school": "Conjuration",
    "castingTime": "Action",
    "range": "Self",
    "components": "V",
    "duration": "Instantaneous",
    "concentration": false,
    "ritual": false,
    "classes": [
      "Sorcerer",
      "Wizard"
    ],
    "description": "The most potent spell known, Wish lets you alter reality by speaking your desire aloud. Its simplest use duplicates any spell of 8th level or lower without needing that spell's components, but you can also do things like restore up to 20 creatures to full Hit Points, grant resistances, or undo recent events. When you push beyond the basic uses, the strain risks harming you: you take 1d10 Necrotic damage per spell level of any effect you replicate beyond the standard use, your Strength drops to 3 for several days, and there's a chance you can never cast Wish again.",
    "source": "srd"
  }
];
if (typeof window !== "undefined") window.DND_SPELLS = DND_SPELLS;
