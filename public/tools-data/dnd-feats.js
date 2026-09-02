// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
const DND_FEATS = [
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
  }
];
if (typeof window !== "undefined") window.DND_FEATS = DND_FEATS;
