// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
import type { DndFeat } from "./dnd-types";

export const DND_FEATS: DndFeat[] = [
  {
    "name": "Alert",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Initiative Proficiency: You add your Proficiency Bonus to Initiative rolls.",
      "Initiative Swap: Immediately after rolling Initiative you can swap your Initiative with a willing ally in the same combat (you can't do this if either of you is Incapacitated)."
    ],
    "source": "phb"
  },
  {
    "name": "Crafter",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Tool Proficiency: You gain proficiency with three types of Artisan's Tools of your choice.",
      "Discount: Whenever you buy a nonmagical item you get a 20% discount.",
      "Fast Crafting: When you finish a Long Rest you can craft one piece of gear from a set list (using tools you're proficient with) faster than normal."
    ],
    "source": "phb"
  },
  {
    "name": "Healer",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Battle Medic: As a Utilize action you can expend one use of a Healer's Kit to let a creature within 5 feet regain Hit Points equal to 1d6 + your Proficiency Bonus, plus their number of Hit Dice; a creature can't benefit again until it finishes a Short or Long Rest.",
      "Healing Reroll: Whenever you roll a die to restore Hit Points with a spell or feature, you can reroll a 1 and must use the new roll."
    ],
    "source": "phb"
  },
  {
    "name": "Lucky",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Luck Points: You have a number of Luck Points equal to your Proficiency Bonus, regained on a Long Rest.",
      "Advantage: When you roll a d20 for a D20 Test you can spend 1 Luck Point to give yourself Advantage on the roll.",
      "Disadvantage: When a creature rolls a d20 to attack you, you can spend 1 Luck Point to give that roll Disadvantage."
    ],
    "source": "phb"
  },
  {
    "name": "Magic Initiate",
    "category": "Origin",
    "prerequisite": "",
    "abilityScores": [],
    "benefits": [
      "Two Cantrips: You learn two cantrips of your choice from the Cleric, Druid, or Wizard spell list (choose one list; that list's ability is your spellcasting ability for these spells).",
      "Level 1 Spell: Choose one level 1 spell from that same list; you always have it prepared and can cast it once without a spell slot per Long Rest (or using slots you have).",
      "Swap: Whenever you gain a level you can replace one of these spells with another from the same list."
    ],
    "repeatable": true,
    "source": "phb"
  },
  {
    "name": "Musician",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Instrument Proficiency: You gain proficiency with three Musical Instruments of your choice.",
      "Encouraging Song: When you finish a Short or Long Rest you can play a tune and give Heroic Inspiration to allies who hear it, up to a number equal to your Proficiency Bonus."
    ],
    "source": "phb"
  },
  {
    "name": "Savage Attacker",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Once per turn when you hit a target with a weapon, you can roll the weapon's damage dice twice and use either roll against the target."
    ],
    "source": "phb"
  },
  {
    "name": "Skilled",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "You gain proficiency in any combination of three skills or tools of your choice."
    ],
    "repeatable": true,
    "source": "phb"
  },
  {
    "name": "Tavern Brawler",
    "category": "Origin",
    "prerequisite": "",
    "abilityScores": [
      "STR",
      "CON"
    ],
    "benefits": [
      "Ability Score: Increase your Strength or Constitution by 1 (max 20).",
      "Enhanced Unarmed Strike: Your Unarmed Strike deals 1d4 damage instead of 1.",
      "Damage Rerolls: Whenever you roll damage for your Unarmed Strike, you can reroll a 1 and must use the new roll.",
      "Improvised Proficiency & Push: You're proficient with improvised weapons, and once per turn when you hit with an Unarmed Strike you can deal extra damage or push the target 5 feet as part of the hit (a Bonus Action grapple/shove option)."
    ],
    "source": "phb"
  },
  {
    "name": "Tough",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Your Hit Point maximum increases by an amount equal to twice your character level when you take this feat, and by 2 each time you gain a level thereafter."
    ],
    "source": "phb"
  },
  {
    "name": "Archery",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "You gain a +2 bonus to attack rolls you make with Ranged weapons."
    ],
    "source": "phb"
  },
  {
    "name": "Blind Fighting",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "You have Blindsight with a range of 10 feet, letting you see anything within that range that isn't behind Total Cover, even if you're Blinded or in Darkness."
    ],
    "source": "phb"
  },
  {
    "name": "Defense",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "While you're wearing Light, Medium, or Heavy armor, you gain a +1 bonus to Armor Class."
    ],
    "source": "phb"
  },
  {
    "name": "Dueling",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "When you're wielding a Melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."
    ],
    "source": "phb"
  },
  {
    "name": "Great Weapon Fighting",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "When you roll damage for a Melee weapon you're wielding with two hands, you can treat any 1 or 2 on a damage die as a 3. The weapon must have the Two-Handed or Versatile property."
    ],
    "source": "phb"
  },
  {
    "name": "Interception",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "When a creature you can see hits another creature within 5 feet of you with an attack, you can use a Reaction to reduce that damage by 1d10 + your Proficiency Bonus (minimum 0). You must be wielding a weapon or Shield."
    ],
    "source": "phb"
  },
  {
    "name": "Protection",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "When a creature you can see attacks a target other than you within 5 feet of you, you can use a Reaction to impose Disadvantage on the attack roll. You must be wielding a Shield."
    ],
    "source": "phb"
  },
  {
    "name": "Thrown Weapon Fighting",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "You can draw a weapon that has the Thrown property as part of the attack you make with it, and you gain a +2 bonus to damage rolls with such thrown weapon attacks."
    ],
    "source": "phb"
  },
  {
    "name": "Two-Weapon Fighting",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "When you make an extra attack with a different Light weapon as a Bonus Action, you can add your ability modifier to that attack's damage."
    ],
    "source": "phb"
  },
  {
    "name": "Unarmed Fighting",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "Your Unarmed Strikes deal 1d6 bludgeoning on a hit (1d8 if you have no weapon or Shield in either hand). If you have a creature Grappled, at the start of each of your turns you can deal 1d4 bludgeoning damage to it."
    ],
    "source": "phb"
  },
  {
    "name": "Druidic Warrior",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "You learn two Druid cantrips of your choice, cast using Wisdom. Whenever you gain a level you can swap one of them for another Druid cantrip."
    ],
    "source": "phb"
  },
  {
    "name": "Ability Score Improvement",
    "category": "General",
    "prerequisite": "Level 4+",
    "benefits": [
      "Increase one ability score by 2, or two ability scores by 1 each (maximum 20). You can take this feat more than once."
    ],
    "repeatable": true,
    "source": "phb"
  },
  {
    "name": "Actor",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "CHA"
    ],
    "benefits": [
      "Increase Charisma by 1 (max 20).",
      "You have Advantage on Deception and Performance checks made to pass yourself off as a different person.",
      "You can mimic the speech of another person or the sounds of a creature you've heard; a listener notices the fake only on a successful Insight check contested by your Deception."
    ],
    "source": "phb"
  },
  {
    "name": "Athlete",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You have a Climb Speed equal to your Speed, standing up from Prone costs only 5 feet of movement, and you can make a running Long or High Jump after moving only 5 feet on foot."
    ],
    "source": "phb"
  },
  {
    "name": "Charger",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "When you take the Dash action, you can make one melee attack or shove as a Bonus Action if you moved at least 10 feet in a straight line; the attack deals extra damage, or the shove pushes an extra 10 feet."
    ],
    "source": "phb"
  },
  {
    "name": "Chef",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "CON",
      "WIS"
    ],
    "benefits": [
      "Increase Constitution or Wisdom by 1 (max 20).",
      "You gain proficiency with Cook's Utensils.",
      "During a Short Rest you can cook food that lets creatures who eat it regain extra Hit Points; you can also bake treats (equal to your Proficiency Bonus) that grant Temporary Hit Points."
    ],
    "source": "phb"
  },
  {
    "name": "Crossbow Expert",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with a Martial weapon that has the Ammunition property",
    "abilityScores": [
      "DEX"
    ],
    "benefits": [
      "Increase Dexterity by 1 (max 20).",
      "Being within 5 feet of an enemy doesn't impose Disadvantage on your ranged attack rolls.",
      "You ignore the Loading property of Crossbows you're proficient with, and you can make an attack with a Hand Crossbow as a Bonus Action after attacking with a one-handed weapon."
    ],
    "source": "phb"
  },
  {
    "name": "Crusher",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "CON"
    ],
    "benefits": [
      "Increase Strength or Constitution by 1 (max 20).",
      "Once per turn when you hit with Bludgeoning damage you can move the target 5 feet.",
      "On a Critical Hit with Bludgeoning damage, attack rolls against the target have Advantage until the start of your next turn."
    ],
    "source": "phb"
  },
  {
    "name": "Defensive Duelist",
    "category": "General",
    "prerequisite": "Level 4+ and Dexterity 13+",
    "abilityScores": [
      "DEX"
    ],
    "benefits": [
      "Increase Dexterity by 1 (max 20).",
      "When you're holding a Finesse weapon you're proficient with and another creature hits you with a melee attack, you can use a Reaction to add your Proficiency Bonus to your AC against that attack, possibly causing it to miss."
    ],
    "source": "phb"
  },
  {
    "name": "Dual Wielder",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You can use two-weapon fighting even when the weapons aren't Light (if they lack Two-Handed), you gain +1 AC while wielding a separate Melee weapon in each hand, and you can draw or stow two weapons when you'd normally do one."
    ],
    "source": "phb"
  },
  {
    "name": "Durable",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "CON"
    ],
    "benefits": [
      "Increase Constitution by 1 (max 20).",
      "When you roll a Hit Die to regain Hit Points, the minimum you can regain equals twice your Constitution modifier (minimum 2).",
      "During a Short Rest you can spend Hit Dice to regain HP once during the rest without using an action."
    ],
    "source": "phb"
  },
  {
    "name": "Elemental Adept",
    "category": "General",
    "prerequisite": "Level 4+ and spellcasting or pact magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "Choose a damage type: Acid, Cold, Fire, Lightning, or Thunder. Your spells ignore Resistance to that type, and when you roll damage of that type you can treat any 1 on a die as a 2. Repeatable for different types."
    ],
    "repeatable": true,
    "source": "phb"
  },
  {
    "name": "Fey Touched",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "You learn Misty Step and one level 1 Divination or Enchantment spell (chosen ability = the one you increased). You can cast each once per Long Rest without a slot, or with slots."
    ],
    "source": "phb"
  },
  {
    "name": "Grappler",
    "category": "General",
    "prerequisite": "Level 4+ and Strength or Dexterity 13+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You have Advantage on attack rolls against a creature you're Grappling, and you can move it more easily. Once per turn you can deal extra damage to a creature you're Grappling."
    ],
    "source": "phb"
  },
  {
    "name": "Great Weapon Master",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with a Martial Melee weapon",
    "abilityScores": [
      "STR"
    ],
    "benefits": [
      "Increase Strength by 1 (max 20).",
      "When you score a Critical Hit or reduce a creature to 0 HP with a Melee weapon, you can make one melee attack as a Bonus Action.",
      "Heavy Toll: When you hit with a Heavy weapon you're proficient with, you can add your Proficiency Bonus to the damage (once per turn)."
    ],
    "source": "phb"
  },
  {
    "name": "Heavily Armored",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with Medium armor",
    "abilityScores": [
      "STR",
      "CON"
    ],
    "benefits": [
      "Increase Strength or Constitution by 1 (max 20).",
      "You gain proficiency with Heavy armor."
    ],
    "source": "phb"
  },
  {
    "name": "Heavy Armor Master",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with Heavy armor",
    "abilityScores": [
      "STR",
      "CON"
    ],
    "benefits": [
      "Increase Strength or Constitution by 1 (max 20).",
      "While wearing Heavy armor, you reduce Bludgeoning, Piercing, and Slashing damage you take from nonmagical weapons by an amount equal to your Proficiency Bonus."
    ],
    "source": "phb"
  },
  {
    "name": "Inspiring Leader",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Wisdom or Charisma by 1 (max 20).",
      "After a Short or Long Rest you can inspire allies (up to six, including yourself) who can see or hear you, granting each Temporary Hit Points equal to your character level + the ability modifier you increased."
    ],
    "source": "phb"
  },
  {
    "name": "Keen Mind",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "INT"
    ],
    "benefits": [
      "Increase Intelligence by 1 (max 20).",
      "You always know which way is north and how long until the next sunrise or sunset, and after a Short Rest you can give yourself Advantage on an Intelligence check (a limited number of times per Long Rest)."
    ],
    "source": "phb"
  },
  {
    "name": "Lightly Armored",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You gain proficiency with Light armor."
    ],
    "source": "phb"
  },
  {
    "name": "Mage Slayer",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "When a creature within 5 feet casts a spell you can use a Reaction to attack it. You have Advantage on saves against spells cast by creatures within 5 feet, and taking your damage can spoil their Concentration more easily."
    ],
    "source": "phb"
  },
  {
    "name": "Martial Weapon Training",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You gain proficiency with Martial weapons."
    ],
    "source": "phb"
  },
  {
    "name": "Medium Armor Master",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with Medium armor",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "Wearing Medium armor doesn't give you Disadvantage on Stealth checks, and you can add up to 3 (instead of 2) from Dexterity to your AC in Medium armor."
    ],
    "source": "phb"
  },
  {
    "name": "Moderately Armored",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with Light armor",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You gain proficiency with Medium armor and Shields."
    ],
    "source": "phb"
  },
  {
    "name": "Mounted Combatant",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX",
      "WIS"
    ],
    "benefits": [
      "Increase Strength, Dexterity, or Wisdom by 1 (max 20).",
      "While mounted you have Advantage on attacks against unmounted creatures smaller than your mount, you can force an attack aimed at your mount to target you instead, and your mount takes no damage on successful Dexterity saves (half on failure)."
    ],
    "source": "phb"
  },
  {
    "name": "Observant",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "INT",
      "WIS"
    ],
    "benefits": [
      "Increase Intelligence or Wisdom by 1 (max 20).",
      "You can read lips, and you gain proficiency in Insight, Investigation, or Perception (one of your choice), plus a Search action bonus."
    ],
    "source": "phb"
  },
  {
    "name": "Piercer",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "Once per turn when you hit with Piercing damage you can reroll one damage die. On a Critical Hit with Piercing, you roll one additional damage die."
    ],
    "source": "phb"
  },
  {
    "name": "Poisoner",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "DEX",
      "INT"
    ],
    "benefits": [
      "Increase Dexterity or Intelligence by 1 (max 20).",
      "Your poison damage ignores Resistance, you gain proficiency with the Poisoner's Kit, and as a Bonus Action you can apply a potent poison to a weapon or piece of ammunition that forces a Constitution save or deals Poison damage and Poisons the target."
    ],
    "source": "phb"
  },
  {
    "name": "Polearm Master",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "When you attack with a Glaive, Halberd, Quarterstaff, or Spear you can make a Bonus Action attack with the weapon's butt end (1d4). Creatures entering your reach provoke an Opportunity Attack from you."
    ],
    "source": "phb"
  },
  {
    "name": "Resilient",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score of your choice by 1 (max 20), and gain proficiency in saving throws using that ability."
    ],
    "source": "phb"
  },
  {
    "name": "Ritual Caster",
    "category": "General",
    "prerequisite": "Level 4+ and Intelligence, Wisdom, or Charisma 13+",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "You gain a ritual book with two level 1 spells that have the Ritual tag (from Cleric, Druid, or Wizard); you can cast them and any others you add to the book as Rituals, using the chosen ability."
    ],
    "source": "phb"
  },
  {
    "name": "Sentinel",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "When you hit a creature with an Opportunity Attack, its Speed becomes 0 for the rest of the turn. Creatures provoke Opportunity Attacks from you even if they Disengage, and you can use a Reaction to attack a creature within 5 feet that attacks a target other than you."
    ],
    "source": "phb"
  },
  {
    "name": "Shadow-Touched",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "You learn Invisibility and one level 1 Illusion or Necromancy spell (chosen ability = the one you increased). You can cast each once per Long Rest without a slot, or with slots."
    ],
    "source": "phb"
  },
  {
    "name": "Sharpshooter",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with a Martial Ranged weapon",
    "abilityScores": [
      "DEX"
    ],
    "benefits": [
      "Increase Dexterity by 1 (max 20).",
      "Attacking at long range doesn't impose Disadvantage, your ranged attacks ignore Half and Three-Quarters Cover, and when you hit with a Ranged weapon you're proficient with you can add your Proficiency Bonus to the damage (once per turn)."
    ],
    "source": "phb"
  },
  {
    "name": "Shield Master",
    "category": "General",
    "prerequisite": "Level 4+ and proficiency with Shields",
    "abilityScores": [
      "STR"
    ],
    "benefits": [
      "Increase Strength by 1 (max 20).",
      "When you take the Attack action you can shove a creature within 5 feet with your Shield as a Bonus Action. You can add your Shield's AC bonus to Dexterity saves against effects targeting only you, and can drop Prone to avoid some effects entirely."
    ],
    "source": "phb"
  },
  {
    "name": "Skill Expert",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score of your choice by 1 (max 20).",
      "You gain proficiency in one skill of your choice, and you gain Expertise (double proficiency) in one skill you're proficient with."
    ],
    "source": "phb"
  },
  {
    "name": "Slasher",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "Once per turn when you deal Slashing damage you can reduce the target's Speed by 10 feet. On a Critical Hit with Slashing, the target has Disadvantage on attack rolls until the start of your next turn."
    ],
    "source": "phb"
  },
  {
    "name": "Speedy",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "Your Speed increases by 10 feet, Difficult Terrain doesn't slow you when you Dash, and Opportunity Attacks have Disadvantage against you."
    ],
    "source": "phb"
  },
  {
    "name": "Spell Sniper",
    "category": "General",
    "prerequisite": "Level 4+ and spellcasting or pact magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "Your attack-roll spells have doubled range, ignore Half and Three-Quarters Cover, and you learn one attack-roll cantrip from the Cleric, Druid, Sorcerer, Warlock, or Wizard list."
    ],
    "source": "phb"
  },
  {
    "name": "Telekinetic",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "You learn the Mage Hand cantrip (cast without components, invisible hand), and as a Bonus Action you can telekinetically shove a creature 5 feet (Strength save to resist)."
    ],
    "source": "phb"
  },
  {
    "name": "Telepathic",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "You can speak telepathically to any creature you can see within 60 feet, and you always have the Detect Thoughts spell prepared, castable once per Long Rest without a slot (or with slots)."
    ],
    "source": "phb"
  },
  {
    "name": "War Caster",
    "category": "General",
    "prerequisite": "Level 4+ and spellcasting or pact magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 20).",
      "You have Advantage on Constitution saves to maintain Concentration, you can perform Somatic components with weapons or a Shield in hand, and you can cast a spell (targeting one creature, casting time of an action) in place of an Opportunity Attack."
    ],
    "source": "phb"
  },
  {
    "name": "Weapon Master",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 20).",
      "You gain proficiency with two Martial weapons of your choice, and you can use the Mastery property of one weapon you're proficient with (changeable after a Long Rest)."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Combat Prowess",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "When you miss with an attack roll on your turn, you can choose to hit instead. Once per turn."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Dimensional Travel",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "Immediately after you take the Attack, Magic, or Dash action you can teleport up to 30 feet to a space you can see."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Energy Resistance",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "You gain Resistance to two damage types of your choice (Acid, Cold, Fire, Lightning, Necrotic, Poison, Psychic, Radiant, or Thunder), and once per turn you can ignore that resistance protection to add extra damage of one such type."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Fate",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "When a creature you can see within 60 feet makes a D20 Test, you can roll a d10 and add or subtract it from the roll. Usable a number of times equal to your Proficiency Bonus per Long Rest."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Fortitude",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "Your Hit Point maximum increases by 40, and when you spend a Hit Die to regain Hit Points you regain the maximum, a number of times per Long Rest equal to your Proficiency Bonus."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Irresistible Offense",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX"
    ],
    "benefits": [
      "Increase Strength or Dexterity by 1 (max 30).",
      "Your Bludgeoning, Piercing, and Slashing damage ignores Resistance, and when you roll a 20 on an attack you deal extra damage equal to the increased ability score."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Recovery",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "When you're reduced to 0 Hit Points you can drop to half your Hit Point maximum instead (once per Long Rest), and you gain extra Hit Dice equal to half your level."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Skill",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "You gain proficiency in all skills, and you gain Expertise in two skills of your choice."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Speed",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "Your Speed increases by 30 feet, you ignore Difficult Terrain, and you can take the Disengage action as a Bonus Action."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Spell Recall",
    "category": "Epic Boon",
    "prerequisite": "Level 19+ and spellcasting feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase Intelligence, Wisdom, or Charisma by 1 (max 30).",
      "You can cast any spell you have prepared without expending a spell slot, so long as it's level 4 or lower. Once per turn (you can do this a number of times per Long Rest equal to your Proficiency Bonus)."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of the Night Spirit",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "While in Dim Light or Darkness you can become Invisible as a Bonus Action, you have Resistance to all damage except Radiant and Force, and you can meld into shadows."
    ],
    "source": "phb"
  },
  {
    "name": "Boon of Truesight",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Increase one ability score by 1 (max 30).",
      "You have Truesight with a range of 60 feet, letting you see in normal and magical Darkness, see Invisible creatures and objects, automatically detect visual illusions, and perceive the true form of shapechangers and things veiled by magic."
    ],
    "source": "phb"
  },
  {
    "name": "Arcane Artist",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn the Minor Illusion cantrip, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat).",
      "Inspiring Magic: When you cast an Illusion spell, one ally within 30 feet who can see you gains Heroic Inspiration. Once per Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Eloquence",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn the Vicious Mockery cantrip, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat).",
      "Smooth Talker: When you make a Charisma (Deception, Intimidation, or Persuasion) check, you can roll 1d4 and add it to the check."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Infiltrator",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn the Friends cantrip, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat).",
      "Cunning Diversion: You can take the Dodge action as a Bonus Action a number of times equal to your Proficiency Bonus, regaining all uses when you finish a Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Omens",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn the Guidance cantrip, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat).",
      "Helpful Premonition: When you or a creature you can see within 30 feet fails a saving throw, you can take a Reaction to roll 1d4 and add it to the save, potentially turning the failure into a success. Uses equal to your Proficiency Bonus, regained on a Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Overload",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn the Fire Bolt cantrip, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat).",
      "Power Surge: When you cast an Evocation spell and deal damage with it, you can add your Proficiency Bonus to one of its damage rolls. Once per Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Safeguard",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn the Resistance cantrip (Intelligence, Wisdom, or Charisma as its spellcasting ability, chosen when you take this feat), and you can cast it as a Bonus Action a number of times equal to your Proficiency Bonus, regaining all uses on a Long Rest.",
      "Sheltering Aid: When you take the Help action to aid an ally's ability check, that ally gains Temporary Hit Points equal to your Proficiency Bonus."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Undertaker",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Cantrip: You learn one Cleric or Wizard cantrip of your choice from the Necromancy school, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat).",
      "Knowledge from the Dead: When you make an Intelligence (History) or Wisdom (Medicine) check, you can roll 1d4 and add it to the check.",
      "Understanding of Death: When you take the Help action to stabilize a creature with 0 Hit Points, you gain Heroic Inspiration. Once per Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Familiar Friend",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Faithful Companion: You always have the Find Familiar spell prepared, using Intelligence, Wisdom, or Charisma as its spellcasting ability (chosen when you take this feat). You can cast it once without a spell slot or Material components per Long Rest, and can also cast it using spell slots.",
      "Fortified Familiar: When you cast Find Familiar, your familiar's Hit Point maximum and current Hit Points increase by twice your character level.",
      "Helpful Friend: When you make an ability check with a skill you're proficient in while your familiar is within 5 feet, you have Advantage. Uses equal to your Proficiency Bonus, regained on a Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Portal Jumper",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Otherworldly Resilience: You have Resistance to Necrotic, Psychic, or Radiant damage (chosen when you take this feat).",
      "Portal Step: You can spend 15 feet of movement to teleport to an unoccupied space you can see within 15 feet of yourself. Uses equal to your Proficiency Bonus (once per turn), regained on a Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Transmuted Anatomy",
    "category": "Origin",
    "prerequisite": "",
    "benefits": [
      "Lengthened Stride: Your Speed increases by 5 feet.",
      "Resilient Anatomy: You have Advantage on saving throws against effects that would compel you to shape-shift against your will. Also, when you fail a Constitution saving throw, you can take a Reaction to roll 1d4 and add it to the save, potentially turning the failure into a success. Uses equal to your Proficiency Bonus, regained on a Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Abjuration Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: Once you have spell slots of the listed level, you always have these prepared — 1st: Shield; 2nd: Lesser Restoration; 3rd: Protection from Energy; 4th: Banishment; 5th: Mass Cure Wounds.",
      "Protective Ward: When you cast an Abjuration spell using a spell slot, you or one creature you can see within 30 feet gains Temporary Hit Points equal to twice the slot's level."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Conjuration Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Entangle; 2nd: Misty Step; 3rd: Conjure Animals; 4th: Dimension Door; 5th: Conjure Elemental.",
      "Persistent Conjuration: While maintaining Concentration on a Conjuration spell, you gain a bonus to Constitution saving throws to maintain that Concentration equal to the modifier of the ability increased by this feat."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Divination Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Detect Evil and Good; 2nd: Mind Spike; 3rd: Clairvoyance; 4th: Divination; 5th: Scrying.",
      "Prescient Intervention: When a creature you can see within 60 feet makes a D20 Test, you can take a Reaction to give it Advantage or Disadvantage. Once per Long Rest; you also regain this use when you cast a Divination spell using a spell slot."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Elemental Familiar",
    "category": "General",
    "prerequisite": "Level 4+, Familiar Friend feat",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase one ability score of your choice by 1, to a maximum of 20.",
      "Elemental Energy: When you cast Find Familiar, choose Acid, Cold, Fire, Lightning, or Thunder damage; your familiar keeps this energy until you cast the spell again. Elemental Resistance — your familiar has Resistance to that damage type. Energy Pulse — as a Bonus Action (familiar within 120 feet), each creature in a 5-foot Emanation from your familiar makes a Dexterity save (DC 8 + your Find Familiar spellcasting modifier + Proficiency Bonus), taking 2d4 of the chosen damage on a failure and falling Prone if Medium or smaller."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Enchantment Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Dissonant Whispers; 2nd: Enthrall; 3rd: Hold Person; 4th: Dominate Beast; 5th: Modify Memory.",
      "Subtle Enchantments: When you cast an Enchantment spell using a spell slot, you can cast it without Verbal, Somatic, or Material components, except Materials that are consumed or that have a listed cost."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Evocation Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Chromatic Orb; 2nd: Shatter; 3rd: Fireball; 4th: Vitriolic Sphere; 5th: Wall of Force.",
      "Fueled Evocation: Once per turn when you cast an Evocation spell and deal damage, you can roll up to two of your unexpended Hit Point Dice and add the total to one of the spell's damage rolls; those Hit Point Dice are then expended."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Illusion Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Silent Image; 2nd: Phantasmal Force; 3rd: Major Image; 4th: Hallucinatory Terrain; 5th: Seeming.",
      "Masterful Illusions: When you cast an Illusion spell using a spell slot, you can cast it without Verbal, Somatic, or Material components (except consumed or costly Materials), and creatures have Disadvantage on Intelligence (Investigation) checks to discern the true nature of your illusions."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Magic Connoisseur",
    "category": "General",
    "prerequisite": "Level 4+, Magic Initiate feat",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: Choose a level 1 and a level 2 spell from the same list you chose for your Magic Initiate feat's cantrips. You always have them prepared, can cast each once per Long Rest without a spell slot, and can also cast them using spell slots. Their spellcasting ability matches your Magic Initiate feat.",
      "Spell Change: Whenever you gain a level, you can replace one of these spells with another of the same level from that list."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Necromancy Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Inflict Wounds; 2nd: Ray of Enfeeblement; 3rd: Vampiric Touch; 4th: Blight; 5th: Raise Dead.",
      "Life Manipulation: When you cast a Necromancy spell using a spell slot, you can roll up to two of your unexpended Hit Point Dice and regain Hit Points equal to the total rolled plus the slot's level; those Hit Point Dice are then expended."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Otherworldly Familiar",
    "category": "General",
    "prerequisite": "Level 4+, Familiar Friend feat",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase one ability score of your choice by 1, to a maximum of 20.",
      "Otherworldly Power: When you cast Find Familiar, your familiar is imbued until you cast the spell again. Energy Resistance — choose Necrotic, Poison, Psychic, Radiant, or Thunder; your familiar has Resistance to it. Phase Walk — your familiar can move through creatures and objects as Difficult Terrain (if it ends its turn inside an object, it is shunted to the last unoccupied space)."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Soothing Familiar",
    "category": "General",
    "prerequisite": "Level 4+, Familiar Friend feat",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase one ability score of your choice by 1, to a maximum of 20.",
      "Healing Beacon: While your familiar is within 120 feet, a 5-foot Emanation around it lets any ally within it treat a roll of 1 or 2 as a 3 on any die rolled to restore Hit Points."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Spell Resistant",
    "category": "General",
    "prerequisite": "Level 4+",
    "abilityScores": [
      "DEX",
      "CON"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Dexterity or Constitution score by 1, to a maximum of 20.",
      "Magical Resilience: You have Resistance to Necrotic, Psychic, Radiant, or Thunder damage (chosen when you take this feat).",
      "Magic Resistant: When you would fail a saving throw against a spell or magical effect, you can roll 1d6 and add it to the save, potentially turning the failure into a success. Uses equal to your Proficiency Bonus, regained on a Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Spell Subterfuge",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Shrouding Spells: After you cast a spell with a casting time of an action using a spell slot, you can take both the Dash and Hide actions as a Bonus Action. Uses equal to the modifier of the ability increased by this feat, regained on a Long Rest.",
      "Sneaky Casting: While you have the Invisible condition from the Hide action, casting a spell with a Verbal component or making a spell attack doesn't end that condition if you end the turn behind Three-Quarters or Total Cover."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Transmutation Adept",
    "category": "General",
    "prerequisite": "Level 4+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Additional Spells: 1st: Jump; 2nd: Spider Climb; 3rd: Slow; 4th: Polymorph; 5th: Animate Objects.",
      "Magical Augmentation: On your turn when you cast a Transmutation spell using a spell slot, your Speed increases by 5 feet per slot level until the end of the turn."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Warlike Familiar",
    "category": "General",
    "prerequisite": "Level 4+, Familiar Friend feat",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase one ability score of your choice by 1, to a maximum of 20.",
      "Battle Familiar: You always have the Battle Familiar spell prepared and can cast it once per Long Rest without a spell slot (or with spell slots). Its spellcasting ability is the one chosen for your Familiar Friend feat.",
      "Intercept Attack: When a creature within 5 feet of your familiar is hit by an attack roll, your familiar can take a Reaction to add your Proficiency Bonus to that creature's Armor Class against the attack, potentially causing it to miss."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Arcane Warrior",
    "category": "Fighting Style",
    "prerequisite": "Fighting Style feature",
    "benefits": [
      "You learn two Wizard cantrips of your choice (Mage Hand and Ray of Frost are recommended), using Intelligence, Wisdom, or Charisma as your spellcasting ability (chosen when you take this feat).",
      "Whenever you gain a level, you can replace one of these cantrips with another Wizard cantrip."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Boon of Erupting Spellpower",
    "category": "Epic Boon",
    "prerequisite": "Level 19+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 30.",
      "Spell Overload: When you cast a damaging spell using a spell slot, you can surge it — treat any 1 or 2 rolled on its damage dice as a 3, and creatures that take the damage also have the Prone condition. Once per use; you regain it when you roll Initiative or finish a Short or Long Rest."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Boon of Magic School Mastery",
    "category": "Epic Boon",
    "prerequisite": "Level 19+, Spellcasting or Pact Magic feature",
    "abilityScores": [
      "INT",
      "WIS",
      "CHA"
    ],
    "repeatable": true,
    "benefits": [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 30.",
      "Mastered School: Choose one school of magic. Rote Casting — choose a level 1 spell of that school on your class's spell list; you always have it prepared and can cast it without a spell slot or components. Signature Arcanum — choose a level 7 or lower spell of that school; you always have it prepared and can cast it once per Long Rest without a spell slot. You can also cast both using spell slots.",
      "Repeatable: You can take this feat more than once, choosing a different school of magic each time."
    ],
    "source": "arcana-unleashed"
  },
  {
    "name": "Boon of the Iron Mind",
    "category": "Epic Boon",
    "prerequisite": "Level 19+",
    "abilityScores": [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ],
    "benefits": [
      "Ability Score Increase: Increase one ability score of your choice by 1, to a maximum of 30.",
      "Unshakable Focus: While you are maintaining Concentration, you lose Concentration only if you cast another spell or activate another effect that requires Concentration, if you have the Petrified or Unconscious condition, or if you die — not from taking damage."
    ],
    "source": "arcana-unleashed"
  }
];
