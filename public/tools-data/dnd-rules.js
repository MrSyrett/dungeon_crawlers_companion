// GENERATED FILE - do not edit by hand.
// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs
const DND_RULES = [
  {
    "name": "Attack",
    "category": "Actions",
    "text": "Make one melee or ranged attack with a weapon or an unarmed strike. Features such as the Fighter's Extra Attack let you make more than one attack with this single action."
  },
  {
    "name": "Dash",
    "category": "Actions",
    "text": "Gain extra movement for the turn equal to your Speed after any modifiers, effectively doubling how far you can move that turn."
  },
  {
    "name": "Disengage",
    "category": "Actions",
    "text": "Your movement for the rest of the turn no longer provokes Opportunity Attacks from creatures you move away from."
  },
  {
    "name": "Dodge",
    "category": "Actions",
    "text": "Until your next turn, attack rolls against you have Disadvantage (if you can see the attacker) and you make Dexterity saving throws with Advantage. The benefit ends if you are Incapacitated or your Speed drops to 0."
  },
  {
    "name": "Help",
    "category": "Actions",
    "text": "Aid another creature. You either give an ally Advantage on one ability check for a task you can assist with, or, if within 5 feet of an enemy, grant the next attack roll against that enemy (before your next turn) Advantage."
  },
  {
    "name": "Hide",
    "category": "Actions",
    "text": "Make a Dexterity (Stealth) check against DC 15 while heavily obscured, behind Three-Quarters or Total Cover, and out of enemies' sight. On a success you have the Invisible condition; it ends if you make noise, attack, cast a spell with a Verbal component, are found, or leave cover."
  },
  {
    "name": "Influence",
    "category": "Actions",
    "text": "Try to alter a creature's attitude or coax a monster to do something. Depending on the request, make a Charisma (Deception, Intimidation, Performance, or Persuasion) or Wisdom (Animal Handling) check against the target's DC; the GM may simply say no to impossible demands."
  },
  {
    "name": "Magic",
    "category": "Actions",
    "text": "Cast a spell with a casting time of one action, or use a magic item or feature that specifies the Magic action to activate it."
  },
  {
    "name": "Ready",
    "category": "Actions",
    "text": "Choose a trigger and a response now, so you can act when the trigger occurs before your next turn. Your response uses your Reaction; readying a spell requires you to cast it now (holding Concentration) and expends the slot even if the trigger never happens."
  },
  {
    "name": "Search",
    "category": "Actions",
    "text": "Look, listen, or otherwise examine your surroundings, making a Wisdom check using Perception, Insight, or Medicine as appropriate to detect something or assess a situation."
  },
  {
    "name": "Study",
    "category": "Actions",
    "text": "Recall or piece together information by making an Intelligence check using Arcana, History, Investigation, Nature, or Religion to learn lore, analyze clues, or understand how something works."
  },
  {
    "name": "Utilize",
    "category": "Actions",
    "text": "Use a nonmagical object that requires an action, such as pulling a lever, drinking a potion, or lighting a torch. This is separate from the one free object interaction you get on your turn."
  },
  {
    "name": "Grapple",
    "category": "Actions",
    "text": "As part of the Attack action, make an unarmed strike to seize a creature no more than one size larger. The target must succeed on a Strength or Dexterity save (its choice) against your unarmed strike DC or gain the Grappled condition; it can repeat the save to end it and you can release it for free."
  },
  {
    "name": "Shove",
    "category": "Actions",
    "text": "As part of the Attack action, make an unarmed strike to push or knock down a creature no more than one size larger. On a failed Strength or Dexterity save (its choice) against your unarmed strike DC, you either push it 5 feet away or give it the Prone condition."
  },
  {
    "name": "Opportunity Attack",
    "category": "Bonus Actions & Reactions",
    "text": "When a creature you can see leaves your reach using its movement, you can use your Reaction to make one melee attack against it. Moving carefully with the Disengage action, or being Teleported or moved without spending its own movement, avoids provoking it."
  },
  {
    "name": "Reaction",
    "category": "Bonus Actions & Reactions",
    "text": "An instant response triggered by a specific event, usable even on another creature's turn. You get one Reaction per round and regain it at the start of your turn; Opportunity Attacks and many spells like Shield use it."
  },
  {
    "name": "Bonus Action",
    "category": "Bonus Actions & Reactions",
    "text": "A quick extra action available only when a feature, spell, or item specifically grants one. You can take at most one Bonus Action on your turn, and you choose when during your turn to use it."
  },
  {
    "name": "Advantage & Disadvantage",
    "category": "Combat",
    "text": "When you have Advantage, roll two d20s and use the higher; with Disadvantage, use the lower. If you have both from any number of sources, they cancel and you roll a single d20 normally. They never stack for extra dice."
  },
  {
    "name": "Cover",
    "category": "Combat",
    "text": "Obstacles between attacker and target grant defense. Half Cover gives +2 to AC and Dexterity saves; Three-Quarters Cover gives +5. Total Cover blocks line of effect entirely, so the target can't be targeted directly. Only the most protective degree applies."
  },
  {
    "name": "Critical Hit",
    "category": "Combat",
    "text": "Rolling a natural 20 on an attack roll always hits and is a Critical Hit: roll the attack's damage dice twice and add them together, then add relevant modifiers once. In the 2024 rules, only weapon and unarmed attacks made by player characters and monsters can crit—not saving-throw effects."
  },
  {
    "name": "Initiative",
    "category": "Combat",
    "text": "At the start of combat each participant makes a Dexterity check (an Initiative roll) to set turn order from highest to lowest. Ties are broken by the involved creatures' choice or the GM's ruling."
  },
  {
    "name": "Surprise",
    "category": "Combat",
    "text": "A creature that didn't notice a threat before combat has Disadvantage on its Initiative roll. The 2024 rules replaced the old surprised condition with this Initiative penalty rather than a lost first turn."
  },
  {
    "name": "Attack Rolls",
    "category": "Combat",
    "text": "Roll a d20 and add the relevant ability modifier plus your Proficiency Bonus if proficient; equal or exceed the target's AC to hit. A natural 20 always hits (a Critical Hit) and a natural 1 always misses."
  },
  {
    "name": "Damage & Healing",
    "category": "Combat",
    "text": "Damage reduces current Hit Points; at 0 HP a monster typically dies and a character falls Unconscious and must make Death Saving Throws. Healing restores HP but never above your Hit Point maximum, and excess healing is lost."
  },
  {
    "name": "Death Saving Throws",
    "category": "Combat",
    "text": "While at 0 HP and not stabilized, roll a d20 at the start of each turn: 10 or higher is a success, lower is a failure. Three successes stabilizes you; three failures means death. A natural 20 restores 1 HP; a natural 1 counts as two failures, and taking damage while down also causes a failure (or instant death from a Critical Hit or massive damage)."
  },
  {
    "name": "Temporary Hit Points",
    "category": "Combat",
    "text": "A buffer that absorbs damage before your real Hit Points and can exceed your maximum. They don't stack—you keep the higher amount when you gain more—can't be healed, and are lost after a Long Rest."
  },
  {
    "name": "Unconscious at 0 HP",
    "category": "Combat",
    "text": "Dropping to 0 Hit Points knocks a character out: they fall Prone, gain the Unconscious condition, stop making decisions, and begin Death Saving Throws. A creature can instead choose to drop to 1 HP (or knock a target out) with a melee hit that reduces it to 0."
  },
  {
    "name": "Ability Checks",
    "category": "D20 Tests",
    "text": "Roll a d20 and add the relevant ability modifier (plus your Proficiency Bonus if proficient in an applicable skill or tool) against a Difficulty Class set by the GM. Used when the outcome of an uncertain task is in doubt."
  },
  {
    "name": "Saving Throws",
    "category": "D20 Tests",
    "text": "A d20 roll to resist a threat: add the relevant ability modifier plus your Proficiency Bonus if proficient in that save, compared against the effect's DC. Success usually avoids or reduces the effect."
  },
  {
    "name": "Proficiency Bonus",
    "category": "D20 Tests",
    "text": "A single bonus tied to character level (+2 at levels 1–4, rising to +6 at 17–20) that you add to attack rolls, ability checks, and saving throws you're proficient with. You add it only once to a given roll, never multiple times."
  },
  {
    "name": "Skills",
    "category": "D20 Tests",
    "text": "Areas of expertise tied to an ability: Strength (Athletics); Dexterity (Acrobatics, Sleight of Hand, Stealth); Intelligence (Arcana, History, Investigation, Nature, Religion); Wisdom (Animal Handling, Insight, Medicine, Perception, Survival); Charisma (Deception, Intimidation, Performance, Persuasion). Proficiency adds your bonus to checks using that skill."
  },
  {
    "name": "Passive Checks",
    "category": "D20 Tests",
    "text": "A check made without rolling, used for steady tasks or the GM's secret rolls. It equals 10 + all applicable modifiers (+5 with Advantage, −5 with Disadvantage). Passive Perception is the common example, setting the DC to notice a hidden creature."
  },
  {
    "name": "Heroic Inspiration",
    "category": "D20 Tests",
    "text": "A reward you can spend to reroll any one d20 immediately after rolling it; you must use the new roll. You can hold only one Heroic Inspiration at a time, and gaining another while you already have one is wasted."
  },
  {
    "name": "Concentration",
    "category": "Spellcasting",
    "text": "Some spells require ongoing focus and end early if you cast another Concentration spell, become Incapacitated, or die. Taking damage forces a Constitution save (DC 10 or half the damage, whichever is higher) to maintain it."
  },
  {
    "name": "Spell Slots",
    "category": "Spellcasting",
    "text": "The fuel for casting leveled spells: each casting expends a slot of the spell's level or higher, and casting at a higher level often strengthens the spell. Slots are regained on a Long Rest (some classes recover a few on a Short Rest)."
  },
  {
    "name": "Cantrips",
    "category": "Spellcasting",
    "text": "Level 0 spells you cast at will without expending a spell slot. They're always prepared, and their damage scales automatically at character levels 5, 11, and 17."
  },
  {
    "name": "Preparing Spells",
    "category": "Spellcasting",
    "text": "Most classes choose which spells they can cast each day from their available list, up to a number set by class level and spellcasting ability. Preparing spells generally happens during a Long Rest, and swapping the list takes time."
  },
  {
    "name": "Components",
    "category": "Spellcasting",
    "text": "A spell may need Verbal (spoken words), Somatic (a free-hand gesture), or Material (a specific item) components. Costed or consumed materials must be provided, while others can be supplied by a spellcasting focus or component pouch."
  },
  {
    "name": "Ritual",
    "category": "Spellcasting",
    "text": "A spell with the Ritual tag can be cast without expending a spell slot if you take an extra 10 minutes and your class allows ritual casting. The ritual version can't be cast at a higher level or upcast."
  },
  {
    "name": "Areas of Effect",
    "category": "Spellcasting",
    "text": "Spells that fill a region use a defined shape—Cone, Cube, Cylinder, Emanation, Line, or Sphere—measured from a point of origin. Every creature in the area is affected unless the spell states otherwise, and each generally makes its own saving throw."
  },
  {
    "name": "Attack Roll vs. Save Spells",
    "category": "Spellcasting",
    "text": "Offensive spells resolve one of two ways: a spell attack roll (d20 + spellcasting modifier + Proficiency Bonus) against the target's AC, or a saving throw the target makes against your spell save DC (8 + spellcasting modifier + Proficiency Bonus) to avoid or reduce the effect."
  },
  {
    "name": "Short Rest",
    "category": "Exploration & Rest",
    "text": "A break of at least one hour spent resting. You can spend Hit Dice to regain Hit Points and recover features that recharge on a Short Rest, such as some class resources."
  },
  {
    "name": "Long Rest",
    "category": "Exploration & Rest",
    "text": "At least 8 hours of downtime, mostly sleeping or light activity. You regain all lost Hit Points, recover up to half your total Hit Dice, and reset spell slots and daily features. You can benefit from only one Long Rest per 24 hours, and it's interrupted by an hour of strenuous activity."
  },
  {
    "name": "Exhaustion",
    "category": "Exploration & Rest",
    "text": "A stacking condition with six levels. Each level imposes a cumulative −2 penalty to all d20 tests (ability checks, attack rolls, and saving throws) and reduces your Speed by 5 feet. Reaching level 6 is fatal. A Long Rest removes one level, provided you also eat and drink."
  },
  {
    "name": "Travel Pace",
    "category": "Exploration & Rest",
    "text": "Overland travel uses a Slow, Normal, or Fast pace covering roughly 3, 4, or 5 miles per hour respectively. A Fast pace imposes a −5 penalty to passive Perception, while a Slow pace lets travelers move stealthily."
  },
  {
    "name": "Vision & Light",
    "category": "Exploration & Rest",
    "text": "In a Lightly Obscured area (dim light, patchy fog) you have Disadvantage on Perception checks relying on sight; a Heavily Obscured area (darkness, thick fog) blocks sight entirely, effectively giving the Blinded condition when trying to see into it. Darkvision lets you treat darkness within range as dim light."
  },
  {
    "name": "Difficult Terrain",
    "category": "Exploration & Rest",
    "text": "Rubble, thick brush, deep snow, and similar obstacles cost 1 extra foot of movement for every foot moved through them. Overlapping sources of Difficult Terrain don't compound—the cost is still just doubled."
  },
  {
    "name": "Jumping",
    "category": "Exploration & Rest",
    "text": "With a 10-foot running start, a long jump clears a number of feet equal to your Strength score; a high jump clears 3 + your Strength modifier feet. Without a running start, both distances are halved, and jumping counts against your movement."
  },
  {
    "name": "Falling",
    "category": "Exploration & Rest",
    "text": "A fall deals 1d6 bludgeoning damage per 10 feet fallen, up to a maximum of 20d6, and lands the creature Prone unless the fall was very short. Damage is reduced by effects that slow or negate the fall."
  },
  {
    "name": "Suffocating",
    "category": "Exploration & Rest",
    "text": "A creature can hold its breath for a number of minutes equal to 1 + its Constitution modifier (minimum 30 seconds). After that it survives a number of rounds equal to its Constitution modifier (minimum 1), then drops to 0 Hit Points and can't regain HP until it can breathe."
  },
  {
    "name": "Carrying Capacity",
    "category": "Exploration & Rest",
    "text": "You can carry weight in pounds up to 15 times your Strength score. Dragging, lifting, or pushing weight up to twice that is possible but reduces your Speed to 5 feet. Size larger or smaller than Medium adjusts these limits."
  },
  {
    "name": "Two-Weapon Fighting",
    "category": "Actions",
    "text": "When you attack with a Light melee weapon in one hand, you can use a Bonus Action to attack with a different Light weapon in the other hand. You don't add your ability modifier to the extra attack's damage unless a feature (like the Two-Weapon Fighting style) allows it."
  },
  {
    "name": "Unarmed Strike",
    "category": "Actions",
    "text": "Instead of a weapon attack you can strike with your body, choosing one of three effects: deal bludgeoning damage equal to 1 + your Strength modifier, attempt a Grapple, or attempt a Shove. Use your Strength modifier and Proficiency Bonus for the attack roll or DC."
  },
  {
    "name": "Weapon Mastery",
    "category": "Combat",
    "text": "In the 2024 rules each weapon has a mastery property (such as Cleave, Graze, Push, Sap, Slow, Topple, or Vex) granting a special effect when you hit. Characters from martial classes gain the ability to use a limited number of these masteries with weapons they've chosen."
  },
  {
    "name": "Improvised Weapons",
    "category": "Combat",
    "text": "An object used as a weapon deals 1d4 damage of an appropriate type. If it closely resembles a real weapon it uses that weapon's stats, and you're only proficient with it if a feature grants improvised-weapon proficiency."
  },
  {
    "name": "Flanking (Optional)",
    "category": "Combat",
    "text": "An optional rule some tables use: when two allies are on directly opposite sides of an enemy, each has Advantage on melee attacks against it. It's not part of the standard rules, so confirm whether your GM uses it."
  },
  {
    "name": "Object Interaction",
    "category": "Actions",
    "text": "Once on your turn you can freely interact with one object as part of your movement or action—drawing a weapon, opening an unlocked door, or picking up a dropped item. Additional interactions require the Utilize action."
  },
  {
    "name": "Conditions",
    "category": "Conditions",
    "text": "Status effects like Blinded, Charmed, Frightened, Grappled, Invisible, Paralyzed, Poisoned, Prone, Restrained, Stunned, and Unconscious are defined separately in the conditions reference. Consult that list for each condition's precise mechanical effects."
  }
];
if (typeof window !== "undefined") window.DND_RULES = DND_RULES;
