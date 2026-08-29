// GENERATED FILE - do not edit by hand.
// Source: data/nimble/parts/*.json - regenerate with: node scripts/build-nimble-data.mjs

const NIMBLE_SPELLS = [
  {
    "name": "Flame Dart",
    "school": "Fire",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 8. Damage: 1d10. On crit: Smoldering. High Levels: +5 damage every 5 levels.",
    "page": 46,
    "targeting": "Single Target"
  },
  {
    "name": "Heart’s Fire",
    "school": "Fire",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 4. Give an ally within Range an extra action. Spend 1 mana to cast this when it is not your turn. High Levels: +1 Range every 5 levels.",
    "page": 46,
    "targeting": "Single Target"
  },
  {
    "name": "Ignite",
    "school": "Fire",
    "tier": 1,
    "actions": "2 Actions",
    "text": "Range: 8. Damage: 4d10 to a Smoldering target, ending the condition on hit. Upcast: +10 damage.",
    "page": 46,
    "targeting": "Single Target"
  },
  {
    "name": "Enchant Weapon",
    "school": "Fire",
    "tier": 2,
    "actions": "1 Action",
    "text": "Concentration: Up to 1 minute. A weapon you touch is enchanted with magical flame. It deals +KEY damage and inflicts Smoldering on crit. Upcast: +KEY damage.",
    "page": 46,
    "targeting": "Single Target"
  },
  {
    "name": "Flame Barrier",
    "school": "Fire",
    "tier": 3,
    "actions": "1 Action",
    "text": "Reaction: When attacked, Defend for free. Until the start of your next turn, melee attackers against you take KEY damage (ignoring armor) and gain Smoldering. Upcast: +KEY damage. (If you’ve already Defended this round, you can’t use abilities requiring it again, even for free.)",
    "page": 46,
    "targeting": "Self"
  },
  {
    "name": "Pyroclasm",
    "school": "Fire",
    "tier": 4,
    "actions": "2 Actions",
    "text": "Reach: 3. Others within Reach take 2d20+10 damage (ignoring armor) on a failed DEX save. Half damage on save. Smoldering creatures fail. Upcast: +1 Reach, +2 damage.",
    "page": 46,
    "targeting": "AoE"
  },
  {
    "name": "Fiery Embrace",
    "school": "Fire",
    "tier": 5,
    "actions": "2 Actions",
    "text": "Concentration: Up to 1 minute. Reach: 8. While within Reach: 1 ally gains the effects of Enchant Weapon. Enemies gain Smoldering, lose damage resistance, and their damage immunity is reduced to resistance. Upcast: +1 ally.",
    "page": 46,
    "targeting": "AoE"
  },
  {
    "name": "Living Inferno",
    "school": "Fire",
    "tier": 7,
    "actions": "3 Actions",
    "text": "Gain the effects of Flame Barrier until your next turn. At the end of this turn and your next turn, cast Pyroclasm for free. Upcast: Upcast Flame Barrier and Pyroclasm.",
    "page": 46,
    "targeting": "Self"
  },
  {
    "name": "Dragonform",
    "school": "Fire",
    "tier": 9,
    "actions": "5 Actions",
    "text": "Transform into a Huge dragon. Gain 3 actions, a fly speed of 12, LVL Armor, 10×LVL temp HP, and: • Tooth & Claw. Action: (Reach 2) 1d20+LVL damage (ignoring armor). Inflicts Smoldering. • Immolating Breath. 2 Actions: (Reach: Cone 8). DC 20 DEX save, KEY d20 damage, half on save. Smoldering targets fail. You can maintain this form for as long as the temp HP granted by this spell remain (max. 10 minutes). When it ends, you drop to 0 HP.",
    "page": 46,
    "targeting": "Self"
  },
  {
    "name": "Ice Lance",
    "school": "Ice",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 12. Damage: 1d6 cold or piercing damage. On hit: Slowed. High Levels: +3 damage every 5 levels.",
    "page": 47,
    "targeting": "Single Target"
  },
  {
    "name": "Snowblind",
    "school": "Ice",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 1. Damage: 1d6. On hit: Blinded until the end of their next turn. High Levels: +3 damage every 5 levels.",
    "page": 47,
    "targeting": "Single Target"
  },
  {
    "name": "Frost Shield",
    "school": "Ice",
    "tier": 1,
    "actions": "1 Action",
    "text": "Reaction: When attacked, Gain 2×KEY temp HP and Defend for free. The ice melts and these temp HP are lost at the start of your next turn. Upcast: +2×KEY temp HP.",
    "page": 47,
    "targeting": "Self"
  },
  {
    "name": "Shatter",
    "school": "Ice",
    "tier": 2,
    "actions": "2 Actions",
    "text": "Range: 12. Damage: 3d6. If any die rolls the max against a Hampered target, this counts as a crit. On crit: +20 damage. Upcast: Increase the result of ANY die by 1. +5 damage on crit.",
    "page": 47,
    "targeting": "Single Target"
  },
  {
    "name": "Cryosleep",
    "school": "Ice",
    "tier": 3,
    "actions": "2 Actions",
    "text": "Reach: 12. Creatures in a 2×2 area within Reach are Dazed. On a failed STR save, they fall asleep instead, becoming Incapacitated until their next two turns have passed, until damaged, or until an ally uses an action to wake them. Upcast: +1 area, +1 turn asleep.",
    "page": 47,
    "targeting": "AoE"
  },
  {
    "name": "Rimeblades",
    "school": "Ice",
    "tier": 4,
    "actions": "3 Actions",
    "text": "Concentration: Up to 1 minute. Reach: 12. Conjure razor-sharp icy spikes in 5 contiguous spaces within Reach; this area is difficult terrain. Creatures that enter these spaces (or who are in the area when you conjure them) suffer 2d6 damage for each space they touch. Upcast: +1 space, +1 damage.",
    "page": 47,
    "targeting": "AoE"
  },
  {
    "name": "Arctic Blast",
    "school": "Ice",
    "tier": 5,
    "actions": "2 Actions",
    "text": "Reach: Cone 4. Damage: 4d6+10 damage. This area is difficult terrain until the end of your next turn. Surviving creatures must make a STR save or be frozen in place (Restrained) until the end of their next turn; creatures already Hampered are Incapacitated for 1 turn instead. Upcast: +1 Reach.",
    "page": 47,
    "targeting": "AoE"
  },
  {
    "name": "Glacier Strike",
    "school": "Ice",
    "tier": 8,
    "actions": "3 Actions",
    "text": "Range: 12. Damage: d66 bludgeoning to creatures in a 3×3 area. Creatures adjacent to that area take half as much. The entire area permanently becomes difficult terrain. Upcast: +1 initial area. (D66: Roll 2d6. The leftmost die is the tens place, and the second is the ones, e.g., 4 and 5 deal 45 damage.)",
    "page": 47,
    "targeting": "AoE"
  },
  {
    "name": "Arctic Annihilation",
    "school": "Ice",
    "tier": 9,
    "actions": "3 Actions",
    "text": "Reach: 12. Choose any number of objects or willing creatures within Reach to encase in ice. They are Incapacitated and immune to damage and negative effects until the start of their next turn. All other creatures and objects within Reach take d66 damage. Any surviving creature who took this damage must make a STR save or be Incapacitated for 1 round. Once you cast this spell, you must Safe Rest for 1 week before using it again.",
    "page": 47,
    "targeting": "AoE"
  },
  {
    "name": "Zap",
    "school": "Lightning",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 12. Damage: 2d8. On miss: the lightning fails to find ground, and strikes you instead. High Levels: +6 damage every 5 levels.",
    "page": 48,
    "targeting": "Single Target"
  },
  {
    "name": "Overload",
    "school": "Lightning",
    "tier": 0,
    "actions": "1 Action",
    "text": "Castable only if you are Charged, ending the condition. Reach: 2. Damage: 2d8 to others within Reach. High Levels: +4 damage every 5 levels. (Charged: Whenever you take lightning damage, you are Charged for 1 minute.)",
    "page": 48,
    "targeting": "AoE"
  },
  {
    "name": "Arc Lightning",
    "school": "Lightning",
    "tier": 1,
    "actions": "2 Actions",
    "text": "Range: 12. Damage: 3d8. The bolt also damages the next closest creature to your target. On miss: the lightning fails to find ground and strikes you instead. Upcast: +4 damage. (Next Closest: If you or an ally is the next closest, they are hit! If 2 creatures are equally close, the GM can roll for it or select the one wearing the most metal.)",
    "page": 48,
    "targeting": "Single Target"
  },
  {
    "name": "Alacrity",
    "school": "Lightning",
    "tier": 2,
    "actions": "1 Action",
    "text": "Range: 4. Reaction: When attacked. Defend for free. After damage is dealt, you gain the Charged condition then teleport anywhere within Range. Upcast: +4 Range.",
    "page": 48,
    "targeting": "Self"
  },
  {
    "name": "Stormlash",
    "school": "Lightning",
    "tier": 3,
    "actions": "2 Actions",
    "text": "Line: 12. Damage: 3d8+4 (ignoring metal armor). Surviving creatures are Dazed on a failed STR save, or Incapacitated instead for 1 of their turns if they fail by 5 or more. Creatures with a large amount of metal (e.g., armor or a longsword) roll with disadvantage. Upcast: +4 damage.",
    "page": 48,
    "targeting": "AoE"
  },
  {
    "name": "Electrickery",
    "school": "Lightning",
    "tier": 4,
    "actions": "3 Actions",
    "text": "Range: 8. Reaction: When an ally is attacked. Choose another creature within Range to swap places with your ally on a failed WIL save (they become the new target). Costs 1 Action while Charged, ending the condition. Upcast: +2 Range.",
    "page": 48,
    "targeting": "2 Targets"
  },
  {
    "name": "Electrocharge",
    "school": "Lightning",
    "tier": 5,
    "actions": "2 Actions",
    "text": "Concentration: Up to 1 minute. A creature you touch gains the Charged condition, +1 max action, +5 armor, 2x speed, and advantage on DEX saves. Upcast: +4 Range.",
    "page": 48,
    "targeting": "Single Target"
  },
  {
    "name": "Ride the Lightning",
    "school": "Lightning",
    "tier": 6,
    "actions": "3 Actions",
    "text": "Teleport up to 12 spaces away to a spot you can see (if a willing creature is there, swap places with them). Adjacent creatures take d88 damage. Surviving creatures must make a STR save or be hurled back 3 spaces, knocked Prone, and deafened for 1 day. Upcast: +1 DC. (D88: Roll 2d8. The leftmost die is the tens place, and the second is the ones, e.g., 4 and 5 deal 45 damage.)",
    "page": 48,
    "targeting": "AoE"
  },
  {
    "name": "Seething Storm",
    "school": "Lightning",
    "tier": 9,
    "actions": "3 Actions",
    "text": "Concentration: Up to 1 minute. Reach: 4. You become a cloud of tempestuous storm. You can fly, move for free 1/round, and attacks against you are made with disadvantage. • At the end of each of your turns, strike up to 4 creatures within Reach with a bolt of lightning for d88 damage (a creature can only be struck 1/round). • +2 Reach and number of bolts each round. Costs 3 actions each round to maintain. Once you cast this spell, you must Safe Rest for 1 week before you can use it again.",
    "page": 48,
    "targeting": "AoE"
  },
  {
    "name": "Razor Wind",
    "school": "Wind",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 12. Damage: 1d4 slashing (Vicious: roll 1 additional die whenever you roll crit damage). Also damages up to 1 adjacent target. High Levels: +2 damage every 5 levels.",
    "page": 49,
    "targeting": "Single Target"
  },
  {
    "name": "Breath of Life",
    "school": "Wind",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 6. Restore 1 HP to a Dying creature. High Levels: +2 Range every 5 levels.",
    "page": 49,
    "targeting": "Single Target"
  },
  {
    "name": "Blustery Gale",
    "school": "Wind",
    "tier": 1,
    "actions": "2 Actions",
    "text": "Range: 12. Damage: 3d4 bludgeoning, advantage against flying, Small, or Tiny targets. On hit: Move a Med target 2 spaces away; Small/Tiny twice as far; Large half as far (round down). For each die you would roll due to forced movement from this spell, deal +5 damage instead. Upcast: +1 movement.",
    "page": 49,
    "targeting": "Single Target"
  },
  {
    "name": "Barrier of Wind",
    "school": "Wind",
    "tier": 2,
    "actions": "1 Action",
    "text": "Reaction: When attacked at Range. Defend for free. Ranged attacks have disadvantage against you this round (including the triggering attack). Upcast: +3 Armor.",
    "page": 49,
    "targeting": "Self"
  },
  {
    "name": "Fly",
    "school": "Wind",
    "tier": 3,
    "actions": "1 Action",
    "text": "Concentration: Up to 10 minutes. Touch a creature, grant a flying speed of 12. Upcast: +1 target.",
    "page": 49,
    "targeting": "Single Target+"
  },
  {
    "name": "Eye of the Storm",
    "school": "Wind",
    "tier": 4,
    "actions": "2 Actions",
    "text": "Reach: 3. Damage: 4d4+10 bludgeoning to enemies within Reach. You may place surviving creatures anywhere within 1 space of the storm’s Reach on a failed STR save. Upcast: +1 Reach.",
    "page": 49,
    "targeting": "AoE"
  },
  {
    "name": "Updraft",
    "school": "Wind",
    "tier": 5,
    "actions": "3 Actions",
    "text": "Reach: 12. Enemies within a 5×5 area must repeat a DEX save until they succeed. For each time they failed they suffer 1d6 falling damage and land prone. Upcast: +2 Range, +1 area.",
    "page": 49,
    "targeting": "AoE"
  },
  {
    "name": "Thousand Cuts",
    "school": "Wind",
    "tier": 6,
    "actions": "3 Actions",
    "text": "Range: 12. Damage: d44 slashing damage (roll with advantage), also damages enemies within Reach 1 of your target. Upcast: +1 Reach. (D44 with advantage: Roll 3d4 and drop the lowest die. The leftmost die is the tens place, and the second is the ones, e.g., 2, 3, and 4 deals 34 damage.)",
    "page": 49,
    "targeting": "AoE"
  },
  {
    "name": "Boisterous Winds",
    "school": "Wind",
    "tier": 7,
    "actions": "2 Actions",
    "text": "Concentration: Up to 1 minute. You and up to 12 allies within Reach 12 gain: Ranged attacks have disadvantage against you, a flying speed of 12, and can move for free 1/round. Upcast: +1 minute or +2 targets.",
    "page": 49,
    "targeting": "Multi-target"
  },
  {
    "name": "Vicious Mockery",
    "school": "Wind",
    "tier": 0,
    "actions": "1 Action",
    "text": "Songweaver only. Range: 12. Damage: 1d4+INT psychic (ignoring armor). On hit: the target is Taunted during their next turn. High Levels: +2 damage every 5 levels.",
    "page": 49,
    "targeting": "Single Target"
  },
  {
    "name": "Rebuke",
    "school": "Radiant",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 4. Damage: 1d6 (ignoring armor), does not miss. 2× damage against undead or cowardly (those Frightened or behind cover). High Levels: +2 damage every 5 levels.",
    "page": 50,
    "targeting": "Single Target"
  },
  {
    "name": "True Strike",
    "school": "Radiant",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 2. Give a creature advantage on the next attack they make (until the end of their next turn). High Levels: +1 Reach every 5 levels.",
    "page": 50,
    "targeting": "Single Target"
  },
  {
    "name": "Heal",
    "school": "Radiant",
    "tier": 1,
    "actions": "1 Action",
    "text": "Reach: 1. Heal a creature 1d6+KEY HP. Upcast: Choose one: +1 target, +4 Reach, +1d6 healing. If 5+ mana is spent, you may also heal 1 negative condition (e.g., Blind, Poisoned, 1 Wound).",
    "page": 50,
    "targeting": "Single Target+"
  },
  {
    "name": "Warding Bond",
    "school": "Radiant",
    "tier": 2,
    "actions": "1 Action",
    "text": "Designate a willing creature as your ward for 1 minute. They take half damage from all attacks; you are attacked for the other half. Upcast: +1 creature.",
    "page": 50,
    "targeting": "Single Target"
  },
  {
    "name": "Shield of Justice",
    "school": "Radiant",
    "tier": 3,
    "actions": "1 Action",
    "text": "Reaction: When attacked, Defend for free and reflect Radiant damage back at the attacker equal to the amount blocked (ignoring armor). Upcast: +5 Armor.",
    "page": 50,
    "targeting": "Self"
  },
  {
    "name": "Condemn",
    "school": "Radiant",
    "tier": 4,
    "actions": "2 Actions",
    "text": "Reach: 4. Damage: 30. Can only target an enemy that crit you or an ally since your last turn. Cannot be reduced by any means. The next attack against that enemy is made with advantage. Upcast: +1 Reach, +1 advantage.",
    "page": 50,
    "targeting": "Single Target"
  },
  {
    "name": "Vengeance",
    "school": "Radiant",
    "tier": 5,
    "actions": "2 Actions",
    "text": "Reach: 1. Damage: 1d100, to a creature that attacked a Dying ally or reduced one to 0 HP since your last turn. Upcast: +1 Reach, roll w/ advantage.",
    "page": 50,
    "targeting": "Single Target"
  },
  {
    "name": "Sacrifice",
    "school": "Radiant",
    "tier": 6,
    "actions": "1 Action",
    "text": "Reach: 4. Reduce yourself to 0 HP. You cannot have more than 0 HP until you Safe Rest. Heal a number of HP equal to your maximum HP, divided as you choose to any other creatures within Reach. You may revive a creature that has died in the past minute if you give them at least 20 HP (also healing 2 Wounds from them), provided they have not been revived with this spell before. Upcast: +4 Reach.",
    "page": 50,
    "targeting": "Special"
  },
  {
    "name": "Redeem",
    "school": "Radiant",
    "tier": 9,
    "actions": "Casting Time: 24 hours",
    "text": "Casting Time: 24 hours. Requires: A diamond worth at least 10,000 gp, which this spell consumes. Revive any number of deceased creatures you choose—within 1 mile—that have died in the past year, provided they have not died of old age or been revived with this spell before.",
    "page": 50,
    "targeting": "AoE"
  },
  {
    "name": "Lifebinding Spirit",
    "school": "Radiant",
    "tier": 1,
    "actions": "1 Action",
    "text": "Shepherd only. Summon a spirit companion that follows you and is immune to harm. It lasts until you cast this spell again, take a Safe Rest, or it heals a number of times equal to the mana spent summoning it. Action: It attacks or heals a creature within Reach 4. It attacks for 1d6+WIL radiant damage (ignoring armor), or heals for the same amount. Upcast: Increment its die size by 1 (max d12), +1 healing use. Flavor is Free: Your Lifebinding Spirit can take the form of any small friendly animal or similar creature (dog, lamb, rabbit, sparrow, etc.). Outside of Combat: Your companion is a spirit, so it can pass through walls and dangers harmlessly. It can briefly move away from you (but always prefers to be faithfully at your side). It cannot speak.",
    "page": 50,
    "targeting": "Summon"
  },
  {
    "name": "Entice",
    "school": "Necrotic",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 8. Damage: 1d4 (ignoring armor). On hit: target moves 2 spaces closer to you. High Levels: Increment the die size 1 step every 5 levels (d6 » d8 » d10 » d12).",
    "page": 51,
    "targeting": "Single Target"
  },
  {
    "name": "Withering Touch",
    "school": "Necrotic",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 1. Damage: 1d12. On hit: Target is considered undead for 1 round. High Levels: +6 damage every 5 levels.",
    "page": 51,
    "targeting": "Single Target"
  },
  {
    "name": "Shadow Trap",
    "school": "Necrotic",
    "tier": 1,
    "actions": "2 Actions",
    "text": "Concentration: Up to 1 minute. The next creature to move adjacent to you suffers 3d12 damage; if Small or Tiny, it is also Restrained by shadowy tendrils for as long as you maintain concentration or until they escape. Upcast: +1 size category, +1d12 damage when they escape.",
    "page": 51,
    "targeting": "Single Target"
  },
  {
    "name": "Dread Visage",
    "school": "Necrotic",
    "tier": 2,
    "actions": "1 Action",
    "text": "Reaction: When attacked, Defend for free. Melee attackers are Frightened of you and suffer 1d12 damage if they attack you this round. Costs 2 mana less while dying. Upcast: +2 damage, +2 armor.",
    "page": 51,
    "targeting": "Self"
  },
  {
    "name": "Vampiric Greed",
    "school": "Necrotic",
    "tier": 3,
    "actions": "2 Actions",
    "text": "Gain 1 Wound. 4d12 to all adjacent creatures, and heal HP equal to the damage done. Any surviving creatures make a STR save. Gain 1 additional Wound for each creature that saves. Upcast: +1 DC.",
    "page": 51,
    "targeting": "AoE"
  },
  {
    "name": "Greater Shadow",
    "school": "Necrotic",
    "tier": 4,
    "actions": "2 Actions",
    "text": "Summon a 5d12 Greater Shadow minion (max 1) adjacent to you. When it dies, it explodes into 5 shadow minions (see Summon Shadow). Place them anywhere within 8 spaces. Upcast: +1d12 damage, +1 shadow minion on explosion.",
    "page": 51,
    "targeting": "Summon"
  },
  {
    "name": "Gangrenous Burst",
    "school": "Necrotic",
    "tier": 5,
    "actions": "2 Actions",
    "text": "Reach: Up to 8. Other damaged creatures must make a STR save or take 3d20 damage (ignoring armor), half on save. The save is rolled with disadvantage while Bloodied. Upcast: +10 damage.",
    "page": 51,
    "targeting": "AoE"
  },
  {
    "name": "Unspeakable Word",
    "school": "Necrotic",
    "tier": 6,
    "actions": "2 Actions",
    "text": "Reach: 8. Damage: d66 (with advantage, ignoring armor, does not miss or crit) on a failed INT save. Target rolls with disadvantage if Bloodied or Frightened. On a success, you both take half of this damage instead. Upcast: +1 DC, +10 damage. (D66 with advantage: Roll 3d6 and drop the lowest die. The leftmost die is the tens place, and the second is the ones, e.g., 2, 3, and 4 deals 34 damage.)",
    "page": 51,
    "targeting": "Special"
  },
  {
    "name": "Creeping Death",
    "school": "Necrotic",
    "tier": 7,
    "actions": "3 Actions",
    "text": "Reach: 8. Damage: 4d20. If this kills the creature, it violently erupts and you MUST deal the same amount of damage to another creature within 8 spaces of it that has not yet been damaged by this effect. Repeat until a creature survives this damage or no other creatures are within Reach. Upcast: +1d20 damage.",
    "page": 51,
    "targeting": "AoE"
  },
  {
    "name": "Shadow Blast",
    "school": "Necrotic",
    "tier": 0,
    "actions": "1 Action",
    "text": "Shadowmancer only. Range: 8. Damage: 1d12+KEY. 1/round. High Levels: +1d12 every 5 levels.",
    "page": 51,
    "targeting": "Single Target"
  },
  {
    "name": "Summon Shadow",
    "school": "Necrotic",
    "tier": 0,
    "actions": "1 Action",
    "text": "Shadowmancer only. Summon a shadow minion within Reach 1 (you can summon a max of INT or LVL minions this way, whichever is lower). Your shadow minions follow the normal minion rules: they have 1 HP, no damage bonus, and do not crit. They abandon you immediately outside of combat. Action: (1/turn) you may command ALL of your minions to move up to 6 then attack (Reach 1, d12 each). High Levels: +1 Reach every 5 levels.",
    "page": 51,
    "targeting": "Summon"
  },
  {
    "name": "Ice Disk",
    "school": "Ice",
    "tier": 0,
    "actions": "Casting Time: 1 min",
    "text": "Conjure a disk of ice that floats just above the ground and follows you. It can carry up to 250 lbs./115 kg of weight for 1 hour or until you cast this spell again.",
    "page": 52,
    "targeting": "Utility",
    "utility": true
  },
  {
    "name": "Chillcraft",
    "school": "Ice",
    "tier": 0,
    "actions": "1 Action",
    "text": "Chill. Harmlessly freeze, thaw, or move a bath-sized amount of water near you. OR: Craft. Conjure a sheet of opaque, mirror-like, or transparent ice the size of a window or small door.",
    "page": 52,
    "targeting": "Utility",
    "utility": true
  },
  {
    "name": "Wintry Scrying",
    "school": "Ice",
    "tier": 0,
    "actions": "Casting Time: 10 min",
    "text": "Turn a small patch of water into a reflective icy mirror. Looking though it grants you vision of any desired location near this same body of water for 10 minutes.",
    "page": 52,
    "targeting": "Utility",
    "utility": true
  },
  {
    "name": "Firebrand",
    "school": "Fire",
    "tier": 0,
    "actions": "1 Action",
    "text": "Touch a surface and secretly mark it with a symbol or brief message. Speaking a chosen command word while nearby reveals it.",
    "page": 52,
    "targeting": "Utility",
    "utility": true
  },
  {
    "name": "Fire Step",
    "school": "Fire",
    "tier": 0,
    "actions": "Casting Time: 1 min",
    "text": "Teleport to a fire source you can see.",
    "page": 52,
    "targeting": "Self",
    "utility": true
  },
  {
    "name": "Kindle",
    "school": "Fire",
    "tier": 0,
    "actions": "1 Action",
    "text": "Conjure a minor visual illusion. OR: Ignite a small, unheld item within Range 6.",
    "page": 52,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "Spark Buddy",
    "school": "Lightning",
    "tier": 0,
    "actions": "Casting Time: 1 min",
    "text": "Conjure a Tiny (squirrel-sized) electrical helper for up to 1 hour. It can fetch Tiny objects (~1 lb./500 g max), open unlocked doors, illuminate a small area, or deliver a harmless shock. If it takes damage or moves further than 6 spaces away from you, it dissipates into sparks.",
    "page": 53,
    "targeting": "Utility",
    "utility": true
  },
  {
    "name": "Spark Step",
    "school": "Lightning",
    "tier": 0,
    "actions": "1 Action",
    "text": "Range: 4. Teleport to a metal object.",
    "page": 53,
    "targeting": "Self",
    "utility": true
  },
  {
    "name": "Tempest’s Command",
    "school": "Lightning",
    "tier": 0,
    "actions": "1 Action",
    "text": "Dispel a minor magical effect, or temporarily suppress a stronger one (the more powerful an enchantment, the shorter the duration). OR: Voice of Thunder. Your eyes glow and your voice is amplified to a booming, thunder-like volume for 1 min.",
    "page": 53,
    "targeting": "Utility",
    "utility": true
  },
  {
    "name": "Light",
    "school": "Radiant",
    "tier": 0,
    "actions": "1 Action",
    "text": "Cause an item to brightly glow as a torch with radiant light for as long as you hold it.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "Beautify",
    "school": "Radiant",
    "tier": 0,
    "actions": "1 Action",
    "text": "Clean stains or repair a small tear/break in a non-magical item, or conjure tiny beautiful things: flowers, butterflies, etc.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "Bond of Peace",
    "school": "Radiant",
    "tier": 0,
    "actions": "1 Action",
    "text": "Bond. Telepathically communicate simple thoughts or feelings with a friendly creature you can see. OR: Peace. Imbue your spoken words with calming magic, granting advantage on any check made to soothe anger or fear in creatures who can hear you.",
    "page": 53,
    "targeting": "Single Target/Self",
    "utility": true
  },
  {
    "name": "Wind Whisper",
    "school": "Wind",
    "tier": 0,
    "actions": "1 Action",
    "text": "You whisper a message into the wind and it will be secretly carried to a specified target within 100 miles/160 km.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "Helpful Gust",
    "school": "Wind",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 6. Gently move a Tiny unheld item within Reach in any direction. OR: Generate an illusory scent.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "Feather Fall",
    "school": "Wind",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 6. Reaction: When a creature falls, cause them to gently float to the ground, unharmed.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "Gravecraft",
    "school": "Necrotic",
    "tier": 0,
    "actions": "1 Action or Casting Time: 1 min",
    "text": "Gravemark. Action: Soil a surface with blood, filth, or other disgusting things. OR: Gravework. Casting time 1 minute: Shape/move a body-sized plot of earth.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  },
  {
    "name": "False Face",
    "school": "Necrotic",
    "tier": 0,
    "actions": "Casting Time: 1 min",
    "text": "Change your appearance to look like someone else for 10 minutes. Requires a piece of them.",
    "page": 53,
    "targeting": "Self",
    "utility": true
  },
  {
    "name": "Thought Leech",
    "school": "Necrotic",
    "tier": 0,
    "actions": "1 Action",
    "text": "Reach: 6. Read the surface thoughts of a creature within Reach. Creatures can sense you doing this and may not like it.",
    "page": 53,
    "targeting": "Single Target",
    "utility": true
  }
];
