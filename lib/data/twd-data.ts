// ─────────────────────────────────────────────────────────────────────────────
// THE WALKING DEAD UNIVERSE RPG (Free League) — a Year Zero Engine game.
// Sourced from The Walking Dead Universe RPG Core Rules (© Free League / Skybound).
// Shares the YZE chassis with ALIEN (four attributes, D6 dice pools, stress dice,
// push-at-a-cost, D66 critical injuries) but differs in: a fixed 3-point Health
// track, Archetypes instead of Careers, Anchors/Drive/Issues instead of signature
// items, and the walker Threat Level / Swarm Size horror layer instead of Panic.
// Runtime twin: public/tools-data/twd-data.js — keep the two in sync.
// ─────────────────────────────────────────────────────────────────────────────

export type TwdAttribute = { key: string; name: string; desc: string };
export type TwdSkill = { name: string; attr: string; desc: string };
export type TwdArchetype = {
  name: string; key: string; keySkill: string; talents: string[];
  issues: string[]; drives: string[];
};
export type TwdTalent = { name: string; archetype: string; desc: string };
export type TwdCloseWeapon = { name: string; damage: number; bonus: string; slots: string };
export type TwdRangedWeapon = { name: string; damage: string; bonus: string; range: string; slots: string };
export type TwdArmor = { name: string; level: number; penalty: string };
export type TwdGear = { name: string; slots: string; bonus: string };
export type TwdHealthState = { value: number; name: string; desc: string };
export type TwdThreat = { level: number; situation: string };
export type TwdSwarm = { size: number; walkers: string };
export type TwdCrit = { roll: string; injury: string; lethal: string; timeLimit: string; penalty: string; recovery: string };

// ── Attributes (STR/AGI/WITS/EMP, rated 1–5; key attribute may reach 5) ──────────
export const TWD_ATTRIBUTES: TwdAttribute[] = [
  { key: "STR", name: "Strength", desc: "Raw muscle, brawn, and the ability to take a hit." },
  { key: "AGI", name: "Agility", desc: "Speed, body control, and coordination." },
  { key: "WITS", name: "Wits", desc: "Awareness, intelligence, and know-how." },
  { key: "EMP", name: "Empathy", desc: "Charisma, compassion, and the ability to read and sway people." },
];

// ── The twelve skills ─────────────────────────────────────────────────────────
export const TWD_SKILLS: TwdSkill[] = [
  { name: "Close Combat", attr: "STR", desc: "Fight unarmed or with a melee weapon against enemies at Short range." },
  { name: "Endure", attr: "STR", desc: "Withstand hunger, cold, poison, and disease, and march long without rest; share extra successes with others." },
  { name: "Force", attr: "STR", desc: "Lift heavy loads, smash open blocked doors, and bend the world with brute strength." },
  { name: "Mobility", attr: "AGI", desc: "Run, climb, leap, flee or chase, take cover, and drive in difficult situations." },
  { name: "Ranged Combat", attr: "AGI", desc: "Attack with guns, bows, and explosives at range (Close Combat if the enemy is on top of you)." },
  { name: "Stealth", attr: "AGI", desc: "Sneak, hide, pick locks, tail someone, and perform sleight of hand; failure gets you noticed." },
  { name: "Scout", attr: "WITS", desc: "Lead the party across the map and spot threats, snipers, hidden gear, and the best way in or out." },
  { name: "Survival", attr: "WITS", desc: "Camp, find water, set traps, hunt, scavenge for rations, track people or animals, and guess where things are." },
  { name: "Tech", attr: "WITS", desc: "Repair and build gear, weapons, and vehicles, run haven projects, and understand machines and electronics." },
  { name: "Leadership", attr: "EMP", desc: "Sway a crowd or inspire an ally (each success grants +1 on a later roll); only one leader at a time." },
  { name: "Manipulation", attr: "EMP", desc: "Make one person do or think something by lying, bribing, threatening, or coercing." },
  { name: "Medicine", attr: "EMP", desc: "Treat the hurt, stabilize critical injuries, and know anatomy, disease, and healing times." },
];

// ── Archetypes (key attribute, key skill, three talents, sample Issues & Drives) ─
export const TWD_ARCHETYPES: TwdArchetype[] = [
  { name: "The Criminal", key: "STR", keySkill: "Close Combat", talents: ["Threatening Posture", "Fixer", "Fights Dirty"], issues: ["I never obey authority", "Drug addict", "Ashamed of my past"], drives: ["Nobody takes a swing at me and gets away with it", "Hate", "I will find my sisters"] },
  { name: "The Doctor", key: "EMP", keySkill: "Medicine", talents: ["Emergency Medicine", "Doctor/Patient Hierarchy", "Seen It All"], issues: ["I always put patients first, even enemies", "Haunted by those I couldn't save", "Addicted to the meds I ration"], drives: ["Do no harm", "Find a cure", "Keep my people alive"] },
  { name: "The Farmer", key: "STR", keySkill: "Force", talents: ["Tracker", "Tough as Nails", "Living off the Land"], issues: ["Stubborn to a fault", "Distrust of outsiders", "Grieving the land I lost"], drives: ["Build something that lasts", "Feed my family", "Work the land again"] },
  { name: "The Homemaker", key: "STR", keySkill: "Endure", talents: ["Innocent Face", "Back Against the Wall", "Rather Die Than Break"], issues: ["Underestimated by everyone", "Can't let go of the old world", "Fierce when cornered"], drives: ["Protect the home", "Keep the family together", "Never be weak again"] },
  { name: "The Kid", key: "AGI", keySkill: "Mobility", talents: ["Knife Fighter", "Stubborn", "A Child of this World"], issues: ["Reckless", "Hides real feelings", "Trusts the wrong people"], drives: ["Prove I'm not a kid", "Find a real family", "Survive, whatever it takes"] },
  { name: "The Law Enforcer", key: "WITS", keySkill: "Scout", talents: ["Steady Hands", "Watchful", "Moral Compass"], issues: ["Still believes in the rules", "Guilt over the badge", "Can't turn off the suspicion"], drives: ["Protect the innocent", "Keep order", "Atone for the past"] },
  { name: "The Nobody", key: "AGI", keySkill: "Stealth", talents: ["Speed Freak", "Wallflower", "Gatherer"], issues: ["Invisible to everyone", "Expects to be left behind", "Hoards in secret"], drives: ["Finally be seen", "Belong somewhere", "Stay alive by staying unnoticed"] },
  { name: "The Outcast", key: "WITS", keySkill: "Survival", talents: ["Knows All the Tricks", "Scavenger", "Lone Wolf"], issues: ["Betrayed before, trusts no one", "Survives on nothing", "Pushes people away"], drives: ["Owe nothing to anyone", "Prove I don't need them", "Find one person worth trusting"] },
  { name: "The Politician", key: "EMP", keySkill: "Manipulation", talents: ["Recruiter", "Mind Games", "Right Word at the Right Time"], issues: ["Ends justify the means", "Addicted to being in charge", "Hides what they really want"], drives: ["Rebuild society", "Win them over", "Never lose power again"] },
  { name: "The Preacher", key: "EMP", keySkill: "Leadership", talents: ["Shepherd", "Guarded by a Higher Power", "Preacher"], issues: ["Crisis of faith", "Carries everyone's burdens", "Judges too quickly"], drives: ["Tend to the flock", "Find meaning in the end of the world", "Save souls, not just lives"] },
  { name: "The Scientist", key: "WITS", keySkill: "Tech", talents: ["Intuition", "Techno Babbler", "Handy"], issues: ["Trusts data over people", "Obsessed with a problem", "Can't delegate"], drives: ["Understand the outbreak", "Build the thing that saves us", "Leave knowledge behind"] },
  { name: "The Soldier", key: "AGI", keySkill: "Ranged Combat", talents: ["Disillusioned", "Eye on the Ball", "Suppressive Fire"], issues: ["Follows orders, even bad ones", "Numb to violence", "Can't stand down"], drives: ["Complete the mission", "Protect the squad", "Make the violence mean something"] },
];

// ── Talents: one per archetype at creation, plus general talents earned with XP ──
export const TWD_TALENTS: TwdTalent[] = [
  { name: "Threatening Posture", archetype: "The Criminal", desc: "Use Force instead of Manipulation when you threaten someone." },
  { name: "Fixer", archetype: "The Criminal", desc: "+2 to Manipulation when you haggle for a deal." },
  { name: "Fights Dirty", archetype: "The Criminal", desc: "+1 damage when you fight unarmed." },
  { name: "Emergency Medicine", archetype: "The Doctor", desc: "+2 to Medicine when you stabilize a critical injury that needs basic medical gear." },
  { name: "Doctor/Patient Hierarchy", archetype: "The Doctor", desc: "When you use Manipulation on someone injured, add a bonus equal to the Health they've lost." },
  { name: "Seen It All", archetype: "The Doctor", desc: "You take no stress from seeing someone wounded, tormented, or Broken." },
  { name: "Tracker", archetype: "The Farmer", desc: "+2 to Survival when you track someone or hide your own tracks." },
  { name: "Tough as Nails", archetype: "The Farmer", desc: "+2 to Endure when you starve or work hard." },
  { name: "Living off the Land", archetype: "The Farmer", desc: "+2 to Tech on projects that increase your haven's Capacity." },
  { name: "Innocent Face", archetype: "The Homemaker", desc: "+2 to Manipulation when you act innocent in front of a stranger." },
  { name: "Back Against the Wall", archetype: "The Homemaker", desc: "When you fight against the odds and the enemy is winning, +1 damage on all attacks." },
  { name: "Rather Die Than Break", archetype: "The Homemaker", desc: "Once per session, lose one Health to gain an extra success on a skill roll (explain how you're hurt)." },
  { name: "Knife Fighter", archetype: "The Kid", desc: "+1 damage when you fight with a knife." },
  { name: "Stubborn", archetype: "The Kid", desc: "Your Drive gives +3 instead of +2." },
  { name: "A Child of this World", archetype: "The Kid", desc: "You take no Stress when you see someone get bitten." },
  { name: "Steady Hands", archetype: "The Law Enforcer", desc: "Once per session, choose to roll no stress dice on one skill roll." },
  { name: "Watchful", archetype: "The Law Enforcer", desc: "Spend time with a group and use Scout to learn their Issues, even secret ones." },
  { name: "Moral Compass", archetype: "The Law Enforcer", desc: "Relieve one stress when you put yourself in danger to stand up for what's right." },
  { name: "Speed Freak", archetype: "The Nobody", desc: "+2 when you use Mobility to drive a vehicle." },
  { name: "Wallflower", archetype: "The Nobody", desc: "The whole group is your NPC Anchor; you don't handle fear while one of them still stands." },
  { name: "Gatherer", archetype: "The Nobody", desc: "+2 to Stealth when you are on your own." },
  { name: "Knows All the Tricks", archetype: "The Outcast", desc: "Use Stealth instead of Manipulation when you lie." },
  { name: "Scavenger", archetype: "The Outcast", desc: "When you scavenge with Survival, gain +2 rations per extra success instead of +1." },
  { name: "Lone Wolf", archetype: "The Outcast", desc: "You can have yourself as one of your two Anchors." },
  { name: "Recruiter", archetype: "The Politician", desc: "Use Leadership instead of Manipulation when you speak for your cause." },
  { name: "Mind Games", archetype: "The Politician", desc: "Relieve one stress when you successfully Manipulate someone." },
  { name: "Right Word at the Right Time", archetype: "The Politician", desc: "When you succeed with Leadership, gain an automatic extra success." },
  { name: "Shepherd", archetype: "The Preacher", desc: "Anyone can use you as an Anchor to relieve stress, even if you're not their Anchor." },
  { name: "Guarded by a Higher Power", archetype: "The Preacher", desc: "When you roll a random die to see if you're hit or bitten, reroll once." },
  { name: "Preacher", archetype: "The Preacher", desc: "+2 to Leadership when swaying a group of people." },
  { name: "Intuition", archetype: "The Scientist", desc: "Once per session, ask the GM how things in the world relate for a useful hint." },
  { name: "Techno Babbler", archetype: "The Scientist", desc: "Use Tech instead of Manipulation when you discuss complex matters." },
  { name: "Handy", archetype: "The Scientist", desc: "Repair most things with time and tools even without the right parts; +2 to Tech on repair projects." },
  { name: "Disillusioned", archetype: "The Soldier", desc: "You take no stress from seeing or committing brutal violence." },
  { name: "Eye on the Ball", archetype: "The Soldier", desc: "Relieve one stress each time a threat or enemy is defeated." },
  { name: "Suppressive Fire", archetype: "The Soldier", desc: "Attack up to three enemies with one Ranged Combat attack, each at −1 damage and no extra-success damage." },
  // General talents (earned with XP)
  { name: "Animal Companion", archetype: "General", desc: "A pet grants +1 on a roll once per session where it is clearly useful." },
  { name: "Center of the Storm", archetype: "General", desc: "You take no stress when walkers spot you (the Threat Level reaches 3)." },
  { name: "Eagle Eyes", archetype: "General", desc: "+2 to Scout when spotting danger in a new sector." },
  { name: "Health Nut", archetype: "General", desc: "You heal critical injuries in half the normal time." },
  { name: "Herb Collector", archetype: "General", desc: "Collect herbs and use them as basic medical gear." },
  { name: "Ice in the Veins", archetype: "General", desc: "You take no stress when attacked by one or a few walkers (a single attack)." },
  { name: "Intense Eyes", archetype: "General", desc: "+2 to Manipulation in a flirty situation." },
  { name: "Marksman", archetype: "General", desc: "+2 to Ranged Combat on the first shot in a fight." },
  { name: "Martial Arts Expert", archetype: "General", desc: "+2 to Close Combat when you fight unarmed." },
  { name: "Nine Lives", archetype: "General", desc: "When rolling a critical injury, choose which die is tens and which is ones." },
  { name: "Obsessive", archetype: "General", desc: "Relieve one stress when roleplaying an Issue that creates a problem for you or the group." },
  { name: "On Easy Street", archetype: "General", desc: "Once per session, relieve one point of stress at any time." },
  { name: "Packmule", archetype: "General", desc: "Carry one extra slot of items." },
  { name: "Pet Keeper", archetype: "General", desc: "Walk with chained living walkers; +2 to Stealth to get past walkers this way." },
  { name: "Psychopath", archetype: "General", desc: "Never roll to handle fear. You carry the shattered Issue: Psychopath." },
  { name: "Sensitive", archetype: "General", desc: "Use Scout to read what people feel, intend, and their Issues." },
  { name: "Skull Cracker", archetype: "General", desc: "+2 to Close Combat when you fight walkers." },
  { name: "Specialist", archetype: "General", desc: "+2 to a chosen skill when you use a chosen signature item." },
  { name: "Sprinter", archetype: "General", desc: "+2 when you use Mobility to outrun or chase someone." },
  { name: "Surgeon", archetype: "General", desc: "+2 to Medicine when you stabilize a critical injury that needs advanced medical gear." },
  { name: "Unbiteable", archetype: "General", desc: "On the Walker Attack table, choose which die is tens and which is ones." },
  { name: "Unbreakable", archetype: "General", desc: "Once per session, when you become Broken, immediately stop being Broken and regain one Health (you still take the critical injury)." },
  { name: "Whisperer", archetype: "General", desc: "Handle a walker swarm by disguising as one of them with no skill roll." },
];

// ── Weapons (DAMAGE = base damage; BONUS = gear dice; extra successes add damage) ─
export const TWD_CLOSE_WEAPONS: TwdCloseWeapon[] = [
  { name: "Foot or fist", damage: 1, bonus: "0", slots: "—" },
  { name: "Improvised weapon", damage: 1, bonus: "+1", slots: "½" },
  { name: "Knuckle duster", damage: 1, bonus: "+1", slots: "½" },
  { name: "Rifle butt", damage: 1, bonus: "+1", slots: "1" },
  { name: "Knife", damage: 1, bonus: "+2", slots: "½" },
  { name: "Small axe", damage: 1, bonus: "+2", slots: "½" },
  { name: "Quarterstaff", damage: 1, bonus: "+3", slots: "1" },
  { name: "Crowbar", damage: 2, bonus: "+1", slots: "1" },
  { name: "Baseball bat", damage: 2, bonus: "+1", slots: "1" },
  { name: "Spear", damage: 2, bonus: "+2", slots: "1" },
  { name: "Sword", damage: 2, bonus: "+2", slots: "1" },
  { name: "Big axe", damage: 2, bonus: "+2", slots: "1" },
  { name: "Sledgehammer", damage: 3, bonus: "0", slots: "2" },
];

export const TWD_RANGED_WEAPONS: TwdRangedWeapon[] = [
  { name: "Throwing knife", damage: "1", bonus: "+1", range: "Short", slots: "½" },
  { name: "Bow", damage: "1", bonus: "+2", range: "Long", slots: "1" },
  { name: "Crossbow", damage: "2", bonus: "+2", range: "Short", slots: "1" },
  { name: "Pistol or revolver", damage: "2", bonus: "+2", range: "Short", slots: "1" },
  { name: "Pipe gun", damage: "2", bonus: "+1", range: "Short", slots: "1" },
  { name: "Shotgun", damage: "2", bonus: "+3", range: "Short", slots: "1" },
  { name: "Rifle", damage: "2", bonus: "+2", range: "Long", slots: "1" },
  { name: "Sniper rifle", damage: "2", bonus: "+2", range: "Extreme", slots: "2" },
  { name: "Sub machine gun", damage: "2", bonus: "+3", range: "Short", slots: "1" },
  { name: "Assault rifle", damage: "2", bonus: "+3", range: "Long", slots: "1" },
  { name: "Heavy machine gun", damage: "3", bonus: "+3", range: "Extreme", slots: "3" },
  { name: "Molotov cocktail", damage: "BP 6", bonus: "0", range: "Short", slots: "½" },
  { name: "Hand grenade", damage: "BP 8", bonus: "+1", range: "Short", slots: "½" },
  { name: "Rocket launcher", damage: "BP 10", bonus: "+2", range: "Long", slots: "2" },
];

// ── Armor (roll ARMOR LEVEL dice; each success stops one damage; PENALTY to Mobility) ─
export const TWD_ARMOR: TwdArmor[] = [
  { name: "Soft vest", level: 4, penalty: "−1" },
  { name: "Body armor", level: 6, penalty: "−2" },
  { name: "Metal-plated armor", level: 8, penalty: "−3" },
];

// ── General gear (SLOTS carried; BONUS to the listed skill when relevant) ────────
export const TWD_GEAR: TwdGear[] = [
  { name: "Advanced medical gear", slots: "Varies", bonus: "Medicine +2" },
  { name: "Basic medical gear", slots: "1", bonus: "Medicine +1" },
  { name: "Binoculars", slots: "½", bonus: "Scout +2" },
  { name: "Book of maps", slots: "½", bonus: "Scout +1" },
  { name: "Bottle of liquor", slots: "½", bonus: "Manipulation +2" },
  { name: "Camera", slots: "½", bonus: "—" },
  { name: "Compass", slots: "—", bonus: "Survival +2" },
  { name: "Crowbar", slots: "1", bonus: "Force +2" },
  { name: "Dog", slots: "—", bonus: "Close Combat +2" },
  { name: "Field kitchen", slots: "1", bonus: "—" },
  { name: "Guitar", slots: "1", bonus: "Leadership +1" },
  { name: "Lockpicks", slots: "—", bonus: "Stealth +2" },
  { name: "Pack of gum/cigarettes", slots: "—", bonus: "Manipulation +1" },
  { name: "Ration of food", slots: "½", bonus: "—" },
  { name: "Rope (10 meters)", slots: "1", bonus: "Mobility +2" },
  { name: "Sleeping bag", slots: "1", bonus: "Survival +1" },
  { name: "Tent", slots: "2", bonus: "Survival +2" },
  { name: "Toolbox", slots: "1", bonus: "Tech +2" },
  { name: "Walkie-talkies", slots: "½", bonus: "Leadership +1" },
];

// ── Health: a fixed three-point track. You're Broken at 0 and take a critical injury.
export const TWD_HEALTH_STATES: TwdHealthState[] = [
  { value: 3, name: "Unharmed", desc: "Full Health. No penalties." },
  { value: 2, name: "Bruised", desc: "One point of damage taken." },
  { value: 1, name: "Battered", desc: "Two points of damage taken." },
  { value: 0, name: "Broken", desc: "Down — all skill rolls fail, take a critical injury and one stress. Injured again while Broken, you die." },
];

// ── The walker Threat Level (0–6) — the game's horror pressure, set per scene ────
export const TWD_THREAT: TwdThreat[] = [
  { level: 0, situation: "You are in a cleared area and safe. For now." },
  { level: 1, situation: "Walkers are around but haven't noticed you. You might suffer a single walker attack if you mess up a skill test." },
  { level: 2, situation: "Walkers are close by, not aware of you yet. The GM maps where they are." },
  { level: 3, situation: "The walkers are aware of you. All nearby walkers shamble toward you and you must fight to get out. All PCs take one point of stress." },
  { level: 4, situation: "The walkers are closing in on you." },
  { level: 5, situation: "The walkers are upon you — a desperate fight or flight." },
  { level: 6, situation: "You are overwhelmed by the dead." },
];

// ── Swarm Size (how big a group of walkers is) ───────────────────────────────────
export const TWD_SWARM: TwdSwarm[] = [
  { size: 1, walkers: "5–10" },
  { size: 2, walkers: "11–20" },
  { size: 3, walkers: "21–50" },
  { size: 4, walkers: "51–100" },
  { size: 5, walkers: "100+" },
  { size: 6, walkers: "1000+" },
];

// ── Critical injuries (D66) — rolled when Broken. Lethal injuries kill after the
// time limit unless stabilized with basic (B) or advanced (A) medical gear. ───────
export const TWD_CRITS: TwdCrit[] = [
  { roll: "11", injury: "Winded", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Hours" },
  { roll: "12", injury: "Broken fingers", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Hours" },
  { roll: "13", injury: "Ruptured tendons", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Hours" },
  { roll: "14", injury: "Skin lesion", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Hours" },
  { roll: "15", injury: "Fracture", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Hours" },
  { roll: "16", injury: "Slashed shoulder", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Hours" },
  { roll: "21", injury: "Knee injury", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Days" },
  { roll: "22", injury: "Knocked out teeth", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Days" },
  { roll: "23", injury: "Ripped off ear", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Days" },
  { roll: "24", injury: "Broken nose", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Days" },
  { roll: "25", injury: "Broken ribs", lethal: "No", timeLimit: "—", penalty: "−1", recovery: "Days" },
  { roll: "26", injury: "Crushed foot", lethal: "No", timeLimit: "—", penalty: "−2", recovery: "Days" },
  { roll: "31", injury: "Damaged throat", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Days" },
  { roll: "32", injury: "Cut open leg", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Days" },
  { roll: "33", injury: "Deep flesh wound", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Days" },
  { roll: "34", injury: "Loose bone splinters", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Days" },
  { roll: "35", injury: "Cracked head", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Weeks" },
  { roll: "36", injury: "Punctured lung", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Weeks" },
  { roll: "41", injury: "Internal bleeding", lethal: "Yes", timeLimit: "B Hours", penalty: "−2", recovery: "Days" },
  { roll: "42", injury: "Severe internal bleeding", lethal: "Yes", timeLimit: "B Hours", penalty: "−2", recovery: "Weeks" },
  { roll: "43", injury: "Dirty wound", lethal: "Yes", timeLimit: "B Days", penalty: "−2", recovery: "Days" },
  { roll: "44", injury: "Crushed leg", lethal: "Yes", timeLimit: "B Hours", penalty: "−3", recovery: "Weeks" },
  { roll: "45", injury: "Crushed intestines", lethal: "Yes", timeLimit: "B Hours", penalty: "−3", recovery: "Weeks" },
  { roll: "46", injury: "Severe bleeding", lethal: "Yes", timeLimit: "A Hours", penalty: "−3", recovery: "Weeks" },
  { roll: "51", injury: "Destroyed eye", lethal: "Yes", timeLimit: "A Days", penalty: "−3", recovery: "Weeks" },
  { roll: "52", injury: "Ruptured bowel", lethal: "Yes", timeLimit: "A Hours", penalty: "−3", recovery: "Weeks" },
  { roll: "53", injury: "Shattered kidney", lethal: "Yes", timeLimit: "A Days", penalty: "−3", recovery: "Weeks" },
  { roll: "54", injury: "Caved-in forehead", lethal: "Yes", timeLimit: "A Days", penalty: "−4", recovery: "Weeks" },
  { roll: "55", injury: "Spinal injury", lethal: "Yes", timeLimit: "A Hours", penalty: "−4", recovery: "Months" },
  { roll: "56", injury: "Coma", lethal: "Yes", timeLimit: "A Days", penalty: "Cannot act", recovery: "Months" },
  { roll: "61", injury: "Severed limb", lethal: "Yes", timeLimit: "A Hours", penalty: "−4", recovery: "Weeks" },
  { roll: "62", injury: "Ruptured aorta", lethal: "Yes", timeLimit: "A Minutes", penalty: "−5", recovery: "Weeks" },
  { roll: "63", injury: "Crushed body", lethal: "Yes", timeLimit: "—", penalty: "You die", recovery: "—" },
  { roll: "64", injury: "Disemboweled", lethal: "Yes", timeLimit: "—", penalty: "You die", recovery: "—" },
  { roll: "65", injury: "Pierced head", lethal: "Yes", timeLimit: "—", penalty: "You die", recovery: "—" },
  { roll: "66", injury: "Impaled heart", lethal: "Yes", timeLimit: "—", penalty: "You die", recovery: "—" },
];

export const TWD_ARCHETYPE_GEAR: Record<string, string[]> = {
  "The Criminal": ["Big revolver","Axe","Lockpick","Motorbike","Shotgun","Stash of drugs and medicine"],
  "The Doctor": ["Basic medical gear","Medications and drugs","Spear (Scalpel taped to a stick)","Car","Diary","Pistol"],
  "The Farmer": ["Shotgun","Axe","Jeep","Toolbox","Tent","Survival equipment"],
  "The Homemaker": ["Shovel","Bow and arrows","Bag with medical herbs","Painkillers","Tent","Car"],
  "The Kid": ["Pistol with homemade silencer","Spear","American football gear (Armor Value 4)","Scooter","D6 Molotov cocktails","Dog"],
  "The Law Enforcer": ["Riot gear (Armor Level 6)","Revolver","Shotgun","Axe","Assault rifle","Badge of office"],
  "The Nobody": ["Pizza delivery car","Machete","Frying pan","Binoculars","Sleeping bag","Fishing rod"],
  "The Outcast": ["D6 Molotov cocktails","Pistol","Spear","Handcuffs","Armor of cloth and old newspapers (level 4)","D6 bottles of moonshine"],
  "The Politician": ["Assault rifle","Bottle of champagne","Bulletproof limousine (+2 Armor)","Hand crank radio","Notes for a book about this new era","Two knives"],
  "The Preacher": ["Bible","Homemade spear","Guitar","Scooter","Iron cross","Wine and altar bread"],
  "The Scientist": ["Sledgehammer","Pistol","Flashlight","Tent","Portable stove with gas and lighter","Basic medical gear"],
  "The Soldier": ["Assault rifle","Bayonet","D6 hand grenades","Binoculars","Basic medical gear","Pistol"]
};
