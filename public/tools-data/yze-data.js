// ─────────────────────────────────────────────────────────────────────────────
// Year Zero Engine (YZE) — SRD core data, browser runtime twin of
// lib/data/yze-data.ts. Every top-level assigns window.X = X so cross-script
// `typeof X` stays TDZ-safe. Keep this in sync with the TS module.
// ─────────────────────────────────────────────────────────────────────────────

var YZE_ATTRIBUTES = [
  { key: "STR", name: "Strength", desc: "Raw muscle power and brawn." },
  { key: "AGI", name: "Agility", desc: "Body control, speed, and motor skills." },
  { key: "WITS", name: "Wits", desc: "Sensory perception, intelligence, and sanity." },
  { key: "EMP", name: "Empathy", desc: "Personal charisma and ability to manipulate others." }
];

var YZE_SKILLS = [
  { name: "Force", attr: "STR", desc: "Lift, push, or break heavy or solid things — any feat of strength." },
  { name: "Melee", attr: "STR", desc: "Fight for your life hand-to-hand or with a melee weapon." },
  { name: "Stamina", attr: "STR", desc: "Physical endurance — survive underwater, resist poison, stay alive after a lethal injury." },
  { name: "Marksmanship", attr: "AGI", desc: "Fire all types of ranged weapons." },
  { name: "Mobility", attr: "AGI", desc: "Actions needing motor control — a risky climb, a dangerous jump, a foot chase." },
  { name: "Stealth", attr: "AGI", desc: "Sneak past someone, stay undetected, pick a pocket (opposed by Observation)." },
  { name: "Crafting", attr: "WITS", desc: "Repair broken gear, build new items, understand or operate mechanical constructions." },
  { name: "Observation", attr: "WITS", desc: "Examine an area or spot someone from a distance; passive roll to detect a threat in time." },
  { name: "Survival", attr: "WITS", desc: "Endure and navigate the wilderness; exact uses vary by setting." },
  { name: "Healing", attr: "EMP", desc: "Perform first aid and help a broken or dying victim recover." },
  { name: "Insight", attr: "EMP", desc: "Read people; roll to eliminate potential stress in a stressful situation." },
  { name: "Persuasion", attr: "EMP", desc: "Influence others through charm, reason, or intimidation." }
];

var YZE_WEAPONS = [
  { name: "Unarmed", grip: "—", bonus: "—", damage: 1, range: "Engaged", weight: "—", skill: "Melee" },
  { name: "Blunt instrument", grip: "1H", bonus: "+1", damage: 1, range: "Engaged", weight: "1", skill: "Melee" },
  { name: "Knife", grip: "1H", bonus: "+1", damage: 2, range: "Engaged", weight: "½", skill: "Melee" },
  { name: "Club", grip: "1H", bonus: "+2", damage: 1, range: "Engaged", weight: "1", skill: "Melee" },
  { name: "Sword", grip: "1H", bonus: "+2", damage: 2, range: "Engaged", weight: "1", skill: "Melee" },
  { name: "Battleaxe", grip: "2H", bonus: "+2", damage: 3, range: "Engaged", weight: "2", skill: "Melee" },
  { name: "Spear", grip: "1H", bonus: "+1", damage: 2, range: "Short", weight: "1", skill: "Melee" },
  { name: "Rock", grip: "1H", bonus: "—", damage: 1, range: "Medium", weight: "¼", skill: "Mobility" },
  { name: "Sling", grip: "1H", bonus: "+1", damage: 1, range: "Medium", weight: "½", skill: "Marksmanship" },
  { name: "Bow", grip: "2H", bonus: "+1", damage: 1, range: "Long", weight: "1", skill: "Marksmanship" },
  { name: "Pistol", grip: "1H", bonus: "+2", damage: 2, range: "Medium", weight: "½", skill: "Marksmanship" },
  { name: "Rifle", grip: "2H", bonus: "+2", damage: 2, range: "Long", weight: "1", skill: "Marksmanship" }
];

var YZE_COVER = [
  { barrier: "Furniture", rating: 3, die: "D" },
  { barrier: "Wooden door", rating: 4, die: "C" },
  { barrier: "Tree trunk", rating: 5, die: "C" },
  { barrier: "Wooden wall", rating: 6, die: "B" },
  { barrier: "Stone wall", rating: 8, die: "A" }
];

var YZE_CONDITIONS = [
  { name: "Exhausted", type: "Physical", desc: "−1 to all Strength- and Agility-based skill rolls." },
  { name: "Battered", type: "Physical", desc: "−1 to all Strength- and Agility-based skill rolls." },
  { name: "Wounded", type: "Physical", desc: "−1 to all Strength- and Agility-based skill rolls." },
  { name: "Angry", type: "Mental", desc: "−1 to all Wits- and Empathy-based skill rolls." },
  { name: "Scared", type: "Mental", desc: "−1 to all Wits- and Empathy-based skill rolls." },
  { name: "Disheartened", type: "Mental", desc: "−1 to all Wits- and Empathy-based skill rolls." }
];

var YZE_CRITS_PHYSICAL = [
  { roll: "11", injury: "Winded", lethal: "No", timeLimit: "—", effect: "None.", healing: "—" },
  { roll: "12", injury: "Stunned", lethal: "No", timeLimit: "—", effect: "None.", healing: "—" },
  { roll: "13", injury: "Crippling pain", lethal: "No", timeLimit: "—", effect: "None.", healing: "—" },
  { roll: "14", injury: "Sprained ankle", lethal: "No", timeLimit: "—", effect: "Mobility −2 and movement is a slow action until a Healing roll is made.", healing: "—" },
  { roll: "15", injury: "Blood in eyes", lethal: "No", timeLimit: "—", effect: "Observation and Marksmanship −2 until a Healing roll is made.", healing: "—" },
  { roll: "16", injury: "Concussion", lethal: "No", timeLimit: "—", effect: "Mobility −2.", healing: "D6" },
  { roll: "21", injury: "Severed ear", lethal: "No", timeLimit: "—", effect: "Observation −2.", healing: "D6" },
  { roll: "22", injury: "Broken toes", lethal: "No", timeLimit: "—", effect: "Movement becomes a slow action.", healing: "D6" },
  { roll: "23", injury: "Broken hand", lethal: "No", timeLimit: "—", effect: "Hand cannot be used.", healing: "D6" },
  { roll: "24", injury: "Knocked out teeth", lethal: "No", timeLimit: "—", effect: "Persuasion −2.", healing: "D6" },
  { roll: "25", injury: "Impaled thigh", lethal: "No", timeLimit: "—", effect: "Movement becomes a slow action.", healing: "2D6" },
  { roll: "26", injury: "Slashed shoulder", lethal: "No", timeLimit: "—", effect: "Arm cannot be used.", healing: "D6" },
  { roll: "31", injury: "Broken nose", lethal: "No", timeLimit: "—", effect: "Persuasion and Observation −1.", healing: "D6" },
  { roll: "32", injury: "Crotch hit", lethal: "No", timeLimit: "—", effect: "One point of damage for every Mobility or Melee roll made.", healing: "D6" },
  { roll: "33", injury: "Broken ribs", lethal: "No", timeLimit: "—", effect: "Mobility and Observation −2.", healing: "2D6" },
  { roll: "34", injury: "Gouged eye", lethal: "No", timeLimit: "—", effect: "Marksmanship and Observation −2.", healing: "2D6" },
  { roll: "35", injury: "Busted kneecap", lethal: "No", timeLimit: "—", effect: "Movement becomes a slow action.", healing: "2D6" },
  { roll: "36", injury: "Broken arm", lethal: "No", timeLimit: "—", effect: "Arm cannot be used.", healing: "2D6" },
  { roll: "41", injury: "Broken leg", lethal: "No", timeLimit: "—", effect: "Movement becomes a slow action.", healing: "2D6" },
  { roll: "42", injury: "Crushed foot", lethal: "No", timeLimit: "—", effect: "Movement becomes a slow action.", healing: "3D6" },
  { roll: "43", injury: "Crushed elbow", lethal: "No", timeLimit: "—", effect: "Arm cannot be used.", healing: "3D6" },
  { roll: "44", injury: "Punctured lung", lethal: "Yes", timeLimit: "Shift", effect: "Stamina and Mobility −2.", healing: "D6" },
  { roll: "45", injury: "Bleeding gut", lethal: "Yes", timeLimit: "Shift", effect: "One point of damage for every Mobility or Melee roll made.", healing: "D6" },
  { roll: "46", injury: "Ruptured intestines", lethal: "Yes", timeLimit: "Shift", effect: "Disease with virulence 6.", healing: "2D6" },
  { roll: "51", injury: "Busted kidney", lethal: "Yes", timeLimit: "Day", effect: "Mobility −2 and movement is a slow action.", healing: "2D6" },
  { roll: "52", injury: "Severed arm artery", lethal: "Yes −1", timeLimit: "Stretch", effect: "Arm cannot be used.", healing: "D6" },
  { roll: "53", injury: "Severed leg artery", lethal: "Yes −1", timeLimit: "Stretch", effect: "Movement becomes a slow action.", healing: "D6" },
  { roll: "54", injury: "Severed arm", lethal: "Yes −1", timeLimit: "Shift", effect: "Arm cannot be used.", healing: "Permanent" },
  { roll: "55", injury: "Severed leg", lethal: "Yes −1", timeLimit: "Shift", effect: "Movement becomes a slow action.", healing: "Permanent" },
  { roll: "56", injury: "Cracked spine", lethal: "No", timeLimit: "—", effect: "Paralyzed from the neck down. If no Healing roll is made in time, the effect is permanent.", healing: "3D6" },
  { roll: "61", injury: "Ruptured jugular", lethal: "Yes −1", timeLimit: "Round", effect: "Stamina −1.", healing: "2D6" },
  { roll: "62", injury: "Ruptured aorta", lethal: "Yes −2", timeLimit: "Round", effect: "Stamina −2.", healing: "3D6" },
  { roll: "63", injury: "Disemboweled", lethal: "Yes", timeLimit: "—", effect: "Instant death.", healing: "—" },
  { roll: "64", injury: "Crushed skull", lethal: "Yes", timeLimit: "—", effect: "Your story ends here.", healing: "—" },
  { roll: "65", injury: "Pierced head", lethal: "Yes", timeLimit: "—", effect: "You die immediately.", healing: "—" },
  { roll: "66", injury: "Impaled heart", lethal: "Yes", timeLimit: "—", effect: "Your heart beats for the last time.", healing: "—" }
];

var YZE_CRITS_MENTAL = [
  { roll: "11–16", trauma: "Trembling", effect: "Modifier −1 on all Agility-based rolls.", healing: "D6" },
  { roll: "21", trauma: "White hair", effect: "None.", healing: "Permanent" },
  { roll: "22–24", trauma: "Anxious", effect: "Modifier −1 on all Wits-based rolls.", healing: "D6" },
  { roll: "25–31", trauma: "Sullen", effect: "Modifier −1 on all Empathy-based rolls.", healing: "D6" },
  { roll: "32–35", trauma: "Nightmares", effect: "Make an Insight roll every shift spent sleeping. Failure means that the sleep doesn't count.", healing: "D6" },
  { roll: "36–41", trauma: "Nocturnal", effect: "You can only sleep during the light part of the day.", healing: "2D6" },
  { roll: "42–43", trauma: "Phobic", effect: "Terrified of something related to what broke you; suffer one stress/damage to Wits each round within Short range of it.", healing: "2D6" },
  { roll: "44–45", trauma: "Alcoholic", effect: "You must drink alcohol every day, or suffer one point of stress/damage to Agility.", healing: "3D6" },
  { roll: "46–51", trauma: "Claustrophobic", effect: "Every stretch in a confined environment, suffer one point of stress/damage to Wits.", healing: "2D6" },
  { roll: "52", trauma: "Mythomaniac", effect: "You cannot stop yourself from lying about everything. Roleplay it.", healing: "2D6" },
  { roll: "53–54", trauma: "Paranoia", effect: "You are certain that someone is out to get you. Roleplay it.", healing: "2D6" },
  { roll: "55", trauma: "Delusion", effect: "You are totally convinced of something untrue — e.g. that a color or item doesn't exist.", healing: "3D6" },
  { roll: "56", trauma: "Hallucinations", effect: "Make an Insight roll every shift; on a failure, suffer a powerful hallucination.", healing: "3D6" },
  { roll: "61–62", trauma: "Altered personality", effect: "Your personality is altered in a fundamental way. Roleplay it.", healing: "Permanent" },
  { roll: "63", trauma: "Amnesia", effect: "You lose all memory and cannot recollect who you or the other PCs are.", healing: "D6" },
  { roll: "64–65", trauma: "Catatonic", effect: "You stare blankly into oblivion and do not respond to any stimuli.", healing: "D6" },
  { roll: "66", trauma: "Heart attack", effect: "Your heart stops, and you die of pure fright.", healing: "—" }
];

var YZE_PANIC = [
  { roll: "1–6", effect: "Keeping it Together", detail: "You manage to keep your nerves in check. Barely." },
  { roll: "7", effect: "Nervous Twitch", detail: "You and all PCs in Short range gain a stress point." },
  { roll: "8", effect: "Tremble", detail: "You tremble uncontrollably. All skill rolls using Agility suffer a −2 modifier." },
  { roll: "9", effect: "Drop Item", detail: "You drop a weapon or other important item — the GM decides which one." },
  { roll: "10", effect: "Freeze", detail: "You're frozen by fear or stress for one round, losing your next turn." },
  { roll: "11", effect: "Seek Cover", detail: "Move away and find a safe spot. You lose one stress point, but all other PCs in Short range gain one. After one round, act normally." },
  { roll: "12", effect: "Scream", detail: "You scream for one round, losing your next turn. You lose one stress point, but every PC who hears you must make an immediate panic roll." },
  { roll: "13", effect: "Flee", detail: "You must flee to a safe place and refuse to leave it. Every PC who hears you must make an immediate panic roll." },
  { roll: "14", effect: "Berserk", detail: "You must immediately attack the nearest person or creature, friendly or not. Every witness must make an immediate panic roll." },
  { roll: "15+", effect: "Catatonic", detail: "You collapse to the floor and can't talk or move, staring blankly into oblivion." }
];

var YZE_RANGES = [
  { range: "Engaged", desc: "Right next to you." },
  { range: "Short", desc: "A few meters away, in the same zone as you." },
  { range: "Medium", desc: "Up to 25 meters away, in an adjacent zone." },
  { range: "Long", desc: "Up to about one hundred meters (four zones) away." },
  { range: "Extreme", desc: "Up to about one kilometer." }
];

var YZE_DIFFICULTY = [
  { factor: "Trivial", mod: "+3" }, { factor: "Simple", mod: "+2" }, { factor: "Easy", mod: "+1" },
  { factor: "Average", mod: "0" }, { factor: "Demanding", mod: "−1" }, { factor: "Hard", mod: "−2" }, { factor: "Formidable", mod: "−3" }
];

var YZE_TRAITS = [
  { key: "pride", label: "Pride", prompt: "Something that makes you stand out. Once per session, check your Pride for one automatic success — if you can justify how it helps." },
  { key: "weakness", label: "Weakness", prompt: "An Achilles heel that can get you into trouble. Roleplaying it earns you extra XP at the end of the session." },
  { key: "darkSecret", label: "Dark Secret", prompt: "Something from before the game that still threatens you. A tool for the GM — and a source of extra XP." },
  { key: "bigDream", label: "Big Dream", prompt: "Your main long-term goal. Risk or sacrifice something significant to move toward it and gain extra XP." },
  { key: "buddy", label: "Buddy", prompt: "The PC you feel closest to. Making a sacrifice or taking a big risk for your Buddy earns extra XP." },
  { key: "relationships", label: "Relationships", prompt: "A short sentence on how you relate to each of the other PCs." }
];

var YZE_RULES = [
  { title: "Dice pool", text: "Grab a number of D6 equal to your skill level plus the attribute connected to that skill (plus any gear dice). Roll them all together." },
  { title: "Success", text: "Every 6 you roll is one success. One success means you reach your goal; each extra success adds a bonus effect — in combat, +1 damage." },
  { title: "Attributes", text: "Strength, Agility, Wits, Empathy, scored 1–5. Your key attribute may reach 5; the others cap at 4." },
  { title: "Skills", text: "Twelve core skills, each tied to an attribute and rated 0–5. With no skill, roll the attribute alone." },
  { title: "Pushing", text: "Failed? Push the roll: re-roll every die that isn't a 6 or a 1. A die showing 1 is a bane and can't be re-rolled. You can only push once, and only on an active roll." },
  { title: "Cost of pushing", text: "A push has a price — typically damage/stress for each bane rolled, a condition, or Doom Points for the GM. It's the harsh core of a YZE game." },
  { title: "Conditions", text: "Pushing a Str/Agi roll gives a physical condition; a Wits/Emp roll gives a mental one. Each physical condition is −1 to Str/Agi rolls, each mental one −1 to Wits/Emp. A fourth of a type breaks you." },
  { title: "Health & Resolve", text: "Health = average of Strength & Agility, rounded up, +1. Resolve = average of Wits & Empathy, rounded up, +1. You're broken if either reaches zero." },
  { title: "Damage & armor", text: "A hit deals the weapon's damage rating +1 per extra success. Roll base dice equal to your armor rating; each 6 stops one point. Armor does nothing against damage from pushing." },
  { title: "Critical injuries", text: "When broken by damage, roll D66 on the physical crit table (mental when broken by stress). A lethal crit forces a Stamina death save each time its time limit passes." },
  { title: "Ranges", text: "Engaged · Short · Medium · Long · Extreme. Ranged attacks take penalties at range; melee happens at Engaged." },
  { title: "Time", text: "Round (5–10 s, combat) · Stretch (5–10 min, exploration) · Shift (5–10 h, travel)." },
  { title: "Experience", text: "At session's end, gain 1 XP for each 'yes': you took part, explored somewhere new, beat a dangerous foe, overcame an obstacle without force, or roleplayed your weakness / dark secret / big dream." }
];

// Mutable homebrew pools — filled by yze-homebrew.js from /api/homebrew.
var YZE_HB_WEAPONS = [];
var YZE_HB_GEAR = [];

if (typeof window !== "undefined") {
  window.YZE_ATTRIBUTES = YZE_ATTRIBUTES;
  window.YZE_SKILLS = YZE_SKILLS;
  window.YZE_WEAPONS = YZE_WEAPONS;
  window.YZE_COVER = YZE_COVER;
  window.YZE_CONDITIONS = YZE_CONDITIONS;
  window.YZE_CRITS_PHYSICAL = YZE_CRITS_PHYSICAL;
  window.YZE_CRITS_MENTAL = YZE_CRITS_MENTAL;
  window.YZE_PANIC = YZE_PANIC;
  window.YZE_RANGES = YZE_RANGES;
  window.YZE_DIFFICULTY = YZE_DIFFICULTY;
  window.YZE_TRAITS = YZE_TRAITS;
  window.YZE_RULES = YZE_RULES;
  window.YZE_HB_WEAPONS = YZE_HB_WEAPONS;
  window.YZE_HB_GEAR = YZE_HB_GEAR;
}
