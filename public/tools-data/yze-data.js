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
  { roll: "11", injury: "Focused", lethal: "No", timeLimit: "—", effect: "Relieve all stress.", healing: "—" },
  { roll: "12", injury: "Winded", lethal: "No", timeLimit: "—", effect: "None.", healing: "—" },
  { roll: "13", injury: "Intense Pain", lethal: "No", timeLimit: "—", effect: "Stress Level +1.", healing: "—" },
  { roll: "14", injury: "Sprained Ankle", lethal: "No", timeLimit: "—", effect: "Movement in combat becomes a full action.", healing: "Shift" },
  { roll: "15", injury: "Blood in Eyes", lethal: "No", timeLimit: "—", effect: "−1 die on Ranged Combat and Observation rolls.", healing: "Shift" },
  { roll: "16", injury: "Concussion", lethal: "No", timeLimit: "—", effect: "−1 die on Observation and Comtech rolls.", healing: "D6" },
  { roll: "21", injury: "Ear Torn Off", lethal: "No", timeLimit: "—", effect: "−2 dice on Observation rolls.", healing: "D6" },
  { roll: "22", injury: "Broken Toes", lethal: "No", timeLimit: "—", effect: "Movement in combat becomes a full action.", healing: "D6" },
  { roll: "23", injury: "Broken Fingers", lethal: "No", timeLimit: "—", effect: "−1 die on all rolls that normally require two hands.", healing: "D6" },
  { roll: "24", injury: "Broken Teeth", lethal: "No", timeLimit: "—", effect: "−2 dice on Manipulation rolls.", healing: "D6" },
  { roll: "25", injury: "Impaled Thigh", lethal: "No", timeLimit: "—", effect: "Movement in combat becomes a full action.", healing: "2D6" },
  { roll: "26", injury: "Slashed Shoulder", lethal: "No", timeLimit: "—", effect: "−2 dice on all rolls that normally require two arms.", healing: "D6" },
  { roll: "31", injury: "Broken Nose", lethal: "No", timeLimit: "—", effect: "−1 die on Manipulation and Observation rolls.", healing: "D6" },
  { roll: "32", injury: "Broken Ribs", lethal: "No", timeLimit: "—", effect: "−2 dice on Mobility and Close Combat rolls.", healing: "2D6" },
  { roll: "33", injury: "Gouged Eye", lethal: "No", timeLimit: "—", effect: "−2 dice on Ranged Combat and Observation rolls. Requires surgery.", healing: "2D6" },
  { roll: "34", injury: "Injured Throat", lethal: "No", timeLimit: "—", effect: "−2 dice on Manipulation and Command rolls.", healing: "2D6" },
  { roll: "35", injury: "Broken Arm", lethal: "No", timeLimit: "—", effect: "−3 dice on all rolls that normally require two arms.", healing: "3D6" },
  { roll: "36", injury: "Broken Leg", lethal: "No", timeLimit: "—", effect: "Movement in combat becomes a full action.", healing: "3D6" },
  { roll: "41", injury: "Crushed Foot", lethal: "No", timeLimit: "—", effect: "Movement becomes a full action. Requires surgery.", healing: "3D6" },
  { roll: "42", injury: "Disfigured Face", lethal: "No", timeLimit: "—", effect: "−2 dice on Manipulation rolls. Requires surgery.", healing: "2D6" },
  { roll: "43", injury: "Traumatized", lethal: "No", timeLimit: "—", effect: "Roll once on the table for mental trauma.", healing: "Varies" },
  { roll: "44", injury: "Punctured Lung", lethal: "Yes", timeLimit: "Shift", effect: "−2 dice on Mobility and Close Combat rolls. Needs surgery.", healing: "D6" },
  { roll: "45", injury: "Bleeding Gut", lethal: "Yes", timeLimit: "Shift", effect: "1 damage at every roll for Mobility or Close Combat.", healing: "D6" },
  { roll: "46", injury: "Infected Wound", lethal: "Yes", timeLimit: "Shift", effect: "Roll for Stamina to avoid falling sick.", healing: "—" },
  { roll: "51", injury: "Cracked Skull", lethal: "Yes", timeLimit: "Shift", effect: "−2 dice on Observation and Comtech rolls. Requires surgery.", healing: "3D6" },
  { roll: "52", injury: "Cracked Spine", lethal: "Yes", timeLimit: "Shift", effect: "Paralyzed from the waist down, unable to move. Requires surgery.", healing: "4D6" },
  { roll: "53", injury: "Arm Arterial Bleeding", lethal: "Yes", timeLimit: "Stretch", effect: "−1 die on all rolls that normally require two arms.", healing: "D6" },
  { roll: "54", injury: "Leg Arterial Bleeding", lethal: "Yes", timeLimit: "Stretch", effect: "Movement in combat becomes a full action.", healing: "D6" },
  { roll: "55", injury: "Severed Arm", lethal: "Yes", timeLimit: "Stretch", effect: "−3 dice on all rolls that require two arms. Requires surgery and prosthesis.", healing: "4D6" },
  { roll: "56", injury: "Severed Leg", lethal: "Yes", timeLimit: "Stretch", effect: "Movement in combat becomes a full action. Requires surgery and prosthesis.", healing: "4D6" },
  { roll: "61", injury: "Ruptured Jugular", lethal: "Yes", timeLimit: "Round", effect: "Stamina −1.", healing: "2D6" },
  { roll: "62", injury: "Internal Bleeding", lethal: "Yes", timeLimit: "Round", effect: "Stamina −2.", healing: "3D6" },
  { roll: "63", injury: "Massive Hemorrhage", lethal: "Yes", timeLimit: "Round", effect: "Stamina −3. Requires surgery.", healing: "4D6" },
  { roll: "64", injury: "Disemboweled", lethal: "Yes", timeLimit: "—", effect: "Instant death.", healing: "—" },
  { roll: "65", injury: "Crushed Head", lethal: "Yes", timeLimit: "—", effect: "Your story ends here.", healing: "—" },
  { roll: "66", injury: "Impaled Heart", lethal: "Yes", timeLimit: "—", effect: "Your heart beats for the last time.", healing: "—" },
];

var YZE_CRITS_MENTAL = [
  { roll: "11-13", trauma: "Confused", effect: "−1 die on all skill rolls based on Wits.", healing: "Shore leave" },
  { roll: "14-16", trauma: "Apathetic", effect: "You cannot push any dice rolls.", healing: "Shore leave" },
  { roll: "21-23", trauma: "Reclusive", effect: "You cannot relieve stress in the presence of others.", healing: "Shore leave" },
  { roll: "24-26", trauma: "Obsessive", effect: "You must push every skill roll — even if it was successful.", healing: "Shore leave" },
  { roll: "31-32", trauma: "Overwhelmed", effect: "Your Resolve is reduced by 2 points.", healing: "Shore leave" },
  { roll: "33-34", trauma: "Alcoholic", effect: "You can only relieve stress by drinking alcohol.", healing: "Shore leave" },
  { roll: "35-36", trauma: "Depressed", effect: "You cannot be rallied in combat.", healing: "Shore leave" },
  { roll: "41-43", trauma: "Worrisome", effect: "Even minor concerns (GM's choice) count as traumatic events, giving you +1 stress level.", healing: "Shore leave" },
  { roll: "44", trauma: "Changed Personality", effect: "You get a new personal agenda, determined by the GM or randomly generated.", healing: "Shore leave" },
  { roll: "45-46", trauma: "Phobic", effect: "You become phobic of something connected to your trauma. Every contact with it counts as a traumatic event, triggering a panic roll.", healing: "Shore leave" },
  { roll: "51-52", trauma: "Speech Loss", effect: "You cannot speak and must communicate with written notes or hand signs.", healing: "Shore leave" },
  { roll: "53-54", trauma: "Nightmares", effect: "Every shift you sleep, you gain +1 stress level.", healing: "Shore leave" },
  { roll: "55-56", trauma: "Flashbacks", effect: "Each time you gain stress, you increase the amount by +1.", healing: "Shore leave" },
  { roll: "61-62", trauma: "Panic Attacks", effect: "If you roll 1 or higher (instead of 9+) on a panic roll during a session, you must make an Empathy roll afterwards to avoid mental trauma.", healing: "Shore leave" },
  { roll: "63", trauma: "Violent", effect: "All rolls of 8 or higher on the panic table trigger the Frenzy response.", healing: "Shore leave" },
  { roll: "64", trauma: "Psychotic", effect: "At some point every Shift (GM's choice), hallucinations give you +1 stress level.", healing: "Shore leave" },
  { roll: "65", trauma: "Amnesiac", effect: "You cannot remember who you or the other characters are. Roleplay the effect.", healing: "Shore leave" },
  { roll: "66", trauma: "Personality Split", effect: "Create a new character with a different name, Wits and Empathy, a personal agenda, and a random talent. You switch every time you gain stress.", healing: "Shore leave" },
];

// ALIEN Evolved Edition — Panic Roll: D6 + Stress Level − Resolve. Made when you
// face something horrifying (not when a Stress Die shows a 1 — that's a Stress Response).
var YZE_PANIC = [
  { roll: "≤0", effect: "Keeping Cool", detail: "No effect." },
  { roll: "1", effect: "Spooked", detail: "Stress level +1 for you." },
  { roll: "2", effect: "Noisy", detail: "Any enemies nearby (GM's discretion) are automatically alerted to your presence." },
  { roll: "3", effect: "Twitchy", detail: "Make an immediate supply roll for air, ammo, or power (GM's discretion)." },
  { roll: "4", effect: "Lose Item", detail: "You lose a weapon or other important item — the GM decides which one." },
  { roll: "5", effect: "Paranoid", detail: "You cannot give or receive help on skill rolls until your panic ends." },
  { roll: "6", effect: "Hesitant", detail: "You automatically get the #10 initiative card in combat until your panic stops." },
  { roll: "7", effect: "Freeze", detail: "You're frozen by fear, losing your next turn and unable to perform interrupt actions before then." },
  { roll: "8", effect: "Seek Cover", detail: "You immediately seek full cover in the zone if it is cluttered (an interrupt action). Once in cover your stress level drops one step, but you lose your next turn. In an open zone you Scream instead." },
  { roll: "9", effect: "Scream", detail: "You scream, losing your next turn. Your stress level drops one step, but every friendly PC in the zone must make an immediate panic roll." },
  { roll: "10", effect: "Flee", detail: "You immediately move away into an adjacent zone (an interrupt action). Your stress level drops one step, but all friendly PCs in the starting zone gain stress +1. You must keep moving until safe. If you cannot move out, you become Catatonic instead." },
  { roll: "11", effect: "Frenzy", detail: "You immediately attack the nearest person or creature, friendly or not. Every friendly PC in the zone must make an immediate panic roll. You won't stop until you or the target is broken." },
  { roll: "12+", effect: "Catatonic", detail: "You're doomed — you collapse to the floor and can't move, rambling or staring blankly into oblivion, until your panic stops." }
];

// ALIEN Evolved Edition — Stress Response: D6 + Stress Level − Resolve. Triggered
// when one or more Stress Dice show a 1 on a skill roll (you also can't push that roll).
var YZE_STRESS_RESPONSE = [
  { roll: "≤0", effect: "Keeping Cool", detail: "No effect." },
  { roll: "1", effect: "Jumpy", detail: "When you push a skill roll you gain +2 stress level instead of +1." },
  { roll: "2", effect: "Tunnel Vision", detail: "All skill rolls based on Wits get −2 dice." },
  { roll: "3", effect: "Aggravated", detail: "All skill rolls based on Empathy get −2 dice." },
  { roll: "4", effect: "Shakes", detail: "All skill rolls based on Agility get −2 dice." },
  { roll: "5", effect: "Frantic", detail: "All skill rolls based on Strength get −2 dice." },
  { roll: "6", effect: "Deflated", detail: "You cannot push any skill rolls. If you are Jumpy, remove that response and ignore further Jumpy results while Deflated." },
  { roll: "7+", effect: "Mess Up", detail: "Your action fails regardless of successes rolled, and you gain +1 stress level." }
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
  window.YZE_STRESS_RESPONSE = YZE_STRESS_RESPONSE;
  window.YZE_RANGES = YZE_RANGES;
  window.YZE_DIFFICULTY = YZE_DIFFICULTY;
  window.YZE_TRAITS = YZE_TRAITS;
  window.YZE_RULES = YZE_RULES;
  window.YZE_HB_WEAPONS = YZE_HB_WEAPONS;
  window.YZE_HB_GEAR = YZE_HB_GEAR;
}
