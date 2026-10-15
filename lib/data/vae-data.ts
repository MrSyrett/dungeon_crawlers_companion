// VAESEN — Nordic Horror Roleplaying (Free League / Fria Ligan). Year Zero Engine,
// stripped to its gentlest investigative form: four attributes, D6 dice pools,
// push-at-a-cost. UNLIKE Alien/TWD it has NO stress dice and no panic — health is
// modeled purely by CONDITIONS (three physical + three mental, each -1 die; a
// fourth of a type = Broken + a D66 critical injury). Its horror lever is the FEAR
// test (Logic/Empathy vs a vaesen's Fear value). Sourced from the Vaesen Core
// Rulebook (Revised Edition).


export type VaeAttribute = { key: string; name: string; desc: string };
export type VaeSkill = { name: string; attr: string; desc: string };
export type VaeArchetype = { name: string; key: string; keySkill: string; talents: string[]; resources: string; trauma: string[]; darkSecret: string[]; equipment: string };
export type VaeTalent = { name: string; archetype: string; desc: string };
export type VaeCondition = { name: string; type: string; desc: string };
export type VaePhysCrit = { roll: number; injury: string; fatal: string; timeLimit: string; effect: string };
export type VaeMentalCrit = { roll: number; injury: string; chronic: string; timeLimit: string; effect: string };
export type VaeMelee = { name: string; damage: number; range: number; bonus: string; cost: number | string; skill: string };
export type VaeRanged = { name: string; damage: number; range: string; bonus: string; cost: number | string; skill: string };
export type VaeArmor = { name: string; protection: number; comment: string };
export type VaeGear = { name: string; bonus: string; cost: number | string; comment: string };
export type VaeUpgrade = { name: string; type: string; prereq: string; dp: number | string; desc: string };
export type VaeMonster = { name: string; stats: { might: number | string; bodyControl: number | string; magic: number | string; manipulation: number | string; fear: number | string }; desc: string; powers: string[]; combat: string; conditions: string; weakness: string };

export const VAE_ATTRIBUTES: VaeAttribute[] = [
  { key: "PHY", name: "Physique",  desc: "A measure of how big and strong you are — the ability to take and deliver a beating, go without food or rest, and lift heavy loads." },
  { key: "PRE", name: "Precision", desc: "A measure of your coordination and motor skills." },
  { key: "LOG", name: "Logic",     desc: "Your intellectual capacity and education, used to solve problems and to tackle certain scary situations." },
  { key: "EMP", name: "Empathy",   desc: "Your ability to understand other people and to persuade, charm, or trick them; also helps with certain scary situations." },];

export const VAE_SKILLS: VaeSkill[] = [
  { name: "Agility",       attr: "PHY", desc: "Run fast, be flexible, flee, chase, jump, or climb; used in combat to evade attacks (dodge) or escape." },
  { name: "Close Combat",  attr: "PHY", desc: "Fight with melee weapons; extra successes raise damage, outmaneuver, stress, push, disarm, or grapple." },
  { name: "Force",         attr: "PHY", desc: "Use brute strength to lift heavy things, endure pain/hunger/fatigue, repair, wrestle, grapple, and make unarmed attacks." },
  { name: "Medicine",      attr: "PRE", desc: "Use medical expertise to treat the hurt, know anatomy/diseases/injuries, and heal physical Conditions and critical injuries." },
  { name: "Ranged Combat", attr: "PRE", desc: "Attack with ranged weapons or explosives; extra successes raise damage or manipulate the enemy's position." },
  { name: "Stealth",       attr: "PRE", desc: "Sneak, hide, pick locks, or perform card tricks; extra successes make you succeed even better." },
  { name: "Investigation", attr: "LOG", desc: "Search a room, understand a crime scene, examine a body, or find what is obscured; the GM then provides clues." },
  { name: "Learning",      attr: "LOG", desc: "Your education and ability to reason; gain clues, translate languages, understand devices/rituals/magic items and vaesen lore." },
  { name: "Vigilance",     attr: "LOG", desc: "Notice someone sneaking up on you (opposed Stealth), follow tracks, and interpret situations you are watching." },
  { name: "Inspiration",   attr: "EMP", desc: "Address a crowd, encourage and guide friends, create art; heal mental Conditions and mental critical injuries." },
  { name: "Manipulation",  attr: "EMP", desc: "Influence how others think/act by lying, flirting, bribing, haggling; trade and purchase items and services." },
  { name: "Observation",   attr: "EMP", desc: "Read another person's thoughts, feelings, or intentions when talking to or spending time with them; also used to resist persuasion (passive)." },];

export const VAE_ARCHETYPES: VaeArchetype[] = [
  {
    name: "Academic", key: "Logic", keySkill: "Learning",
    talents: ["Bookworm", "Erudite", "Knowledge is Reassuring"],
    resources: "4–6",
    trauma: ["Vaettir turned you into a rat", "Aged by the magic of a mermaid", "Watched your partner being torn apart by a giant"],
    darkSecret: ["Addicted to drugs", "Stole or falsified documents to get research results", "Hunted by a vaesen"],
    equipment: "Book collection or map book, writing utensils, liquor or slide rule."
  },
  {
    name: "Doctor", key: "Logic", keySkill: "Medicine",
    talents: ["Army Medic", "Chief Physician", "Emergency Medicine"],
    resources: "4–6",
    trauma: ["A corpse came back to life during an autopsy", "Operated on a person with donkey's ears and hooves", "Saw your destiny in the eyes of a dying mermaid"],
    darkSecret: ["Has two separate personalities", "Involved in illicit affairs", "Unnatural lust"],
    equipment: "Doctor's bag with medical equipment, liquor or fine wine, weak horse or strong poison."
  },
  {
    name: "Hunter", key: "Precision", keySkill: "Ranged Combat",
    talents: ["Bloodhound", "Herbalist", "Marksman"],
    resources: "2–4",
    trauma: ["Attacked by the branches of an ash tree wife", "Broke your leg in the forest, but was guided home by a will o' the wisp", "Captured at dawn by a mountain troll and was stuck in its petrified arms"],
    darkSecret: ["I sold my soul", "I cannot control my fits of rage", "Has children with a vaesen"],
    equipment: "Rifle, hunting knife or hunting dog, hunting trap or hunting equipment."
  },
  {
    name: "Occultist", key: "Precision", keySkill: "Stealth",
    talents: ["Conjuring Tricks", "Medium", "Strike Fear"],  // archetype box lists as "Magic tricks, Medium, Striking Fear"
    resources: "1–4",
    trauma: ["Was hit by corrosive venom while trying to steal a lindworm egg", "The family farm is being run by a grumpy house nisse", "Was attacked by a night raven who infected you with a febrile disease"],
    darkSecret: ["Guilty of a heinous crime", "My powers control me", "Changeling"],
    equipment: "Crystal ball, powdered stag's horn or tinder box, dagger or cooking pot."
  },
  {
    name: "Officer", key: "Precision", keySkill: "Ranged Combat",
    talents: ["Battle-hardened", "Gentleman", "Tactician"],
    resources: "3–7",
    trauma: ["Almost drowned when your ship was dragged down by a sea monster", "Lost all your men to an angry giant", "Saw dead warriors rise again on the battlefield"],
    darkSecret: ["Deserter", "Cannot cope with filth and disorder", "Killed a defenseless enemy"],
    equipment: "Rifle or pistol, compass or bayonet, map book or saber."
  },
  {
    name: "Priest", key: "Empathy", keySkill: "Observation",
    talents: ["Absolution", "Blessing", "Confessor"],
    resources: "4–6",
    trauma: ["Hurt someone after being enthralled by a witch", "Watched a church grim tear apart some thieves trying to steal the church silver", "The third owner of a spertus, serving the church to avoid being twisted"],
    darkSecret: ["The Devil speaks to me", "I have stolen my identity", "Ensnared by a vaesen"],
    equipment: "Musical instrument or fine wines, writing utensils, holy water or old bible."
  },
  {
    name: "Private Detective", key: "Logic", keySkill: "Investigation",
    talents: ["Eagle Eye", "Elementary", "Focused"],
    resources: "2–5",
    trauma: ["Heard the cry of a myling during your search for a missing child", "Had nightmares and woke up breathless and mare-ridden", "Came face-to-face with a werewolf"],
    darkSecret: ["There is a price on my head", "Constant adulterer", "Drug addict"],
    equipment: "Magnifying glass or lockpicks, revolver, knuckle duster or binoculars."
  },
  {
    name: "Servant", key: "Physique", keySkill: "Force",
    talents: ["Loyal", "Robust", "Tough as Nails"],
    resources: "2–4",
    trauma: ["Bitten by a brook horse", "Lost a master to the alluring song of the Neck", "Served a household plagued by a changeling"],
    darkSecret: ["I murdered someone", "Persecuted for my religion", "Spying for a foreign power"],
    equipment: "Revolver, hurricane lamp or make-up, field kitchen or simple bandages."
  },
  {
    name: "Vagabond", key: "Physique", keySkill: "Manipulation",
    talents: ["Hobo Tricks", "Suspicious", "Well-traveled"],
    resources: "1–3",
    trauma: ["Saw a revenant rise from its grave", "Forever in love with a wood wife", "Survived a week inside a troll bag"],
    darkSecret: ["Stolen identity", "Terminal illness", "A vaesen kills anyone I love"],
    equipment: "Walking stick, knife or crowbar, liquor or pet dog."
  },
  {
    name: "Writer", key: "Empathy", keySkill: "Inspiration",
    talents: ["Automatic Writing", "Journalist", "Wordsmith"],
    resources: "2–5",
    trauma: ["Angered fairies who put you to sleep and sucked your blood", "Cursed by a homeless vaettir to write a book in your own blood", "Heard the song of the Neck, but failed to write down the lyrics"],
    darkSecret: ["I record and use the secrets and weaknesses of my friends", "Wanted for revolutionary ideas", "My life's work is a lie"],
    equipment: "Writing utensils and paper, camera or opera glasses, pet dog or book collection."
  },];

export const VAE_TALENTS: VaeTalent[] = [
  // ACADEMIC
  { name: "Bookworm", archetype: "Academic", desc: "Gain +2 to Learning when looking for clues in books or libraries." },
  { name: "Erudite", archetype: "Academic", desc: "Pass a Learning test to establish truths about places/phenomena in the game (GM judges what's reasonable; no inventing vaesen facts)." },
  { name: "Knowledge is Reassuring", archetype: "Academic", desc: "Ignore Conditions when making Learning tests." },
  // DOCTOR
  { name: "Army Medic", archetype: "Doctor", desc: "Gain +2 to Fear tests when frightened by dead or damaged human bodies." },
  { name: "Chief Physician", archetype: "Doctor", desc: "When you use Medicine to treat other PCs they can heal four Conditions instead of three (also per extra success)." },
  { name: "Emergency Medicine", archetype: "Doctor", desc: "Ignore physical Conditions when using Medicine." },
  // HUNTER
  { name: "Bloodhound", archetype: "Hunter", desc: "Gain +2 to Vigilance when tracking your prey." },
  { name: "Herbalist", archetype: "Hunter", desc: "Using wild herbs, you can use Medicine without access to medical supplies." },
  { name: "Marksman", archetype: "Hunter", desc: "Gain +2 to Ranged Combat on your first round when successfully ambushing or attacking your enemy." },
  // OCCULTIST
  { name: "Conjuring Tricks", archetype: "Occultist", desc: "Use Stealth instead of Manipulation when performing conjuring tricks to influence people." },
  { name: "Medium", archetype: "Occultist", desc: "Use Observation to perform seances: predict futures and contact the dead; extra successes give more info/prolong/materialize spirits; on failure, bad info, attack, or a Condition." },
  { name: "Strike Fear", archetype: "Occultist", desc: "Strike fear with Fear 1 (slow action; not vs vaesen). Targeted NPC makes a Logic/Empathy test with bonus dice equal to friendly individuals in the zone." },
  // OFFICER
  { name: "Battle-hardened", archetype: "Officer", desc: "When drawing for initiative, draw two cards and pick one." },
  { name: "Gentleman", archetype: "Officer", desc: "Ignore penalties from mental Conditions when making Manipulation tests." },
  { name: "Tactician", archetype: "Officer", desc: "On a successful Ranged Combat test with extra successes in combat, spend one success to issue an order to a friend: if followed, they gain +2 to their next test (repeatable to order different people)." },
  // PRIEST
  { name: "Absolution", archetype: "Priest", desc: "A PC who confesses to you during resting heals three Conditions instead of two." },
  { name: "Blessing", archetype: "Priest", desc: "Once per session bless an object or PC; whoever uses it gains the Blessed Advantage (+2 to a test of choice). Expires on use or end of mystery; one blessing per character/object per mystery." },
  { name: "Confessor", archetype: "Priest", desc: "Use Observation instead of Manipulation when having a confidential conversation." },
  // PRIVATE DETECTIVE
  { name: "Eagle Eye", archetype: "Private Detective", desc: "Gain +2 to Vigilance when trying to interpret a situation you are not involved in." },
  { name: "Elementary", archetype: "Private Detective", desc: "Once per session ask the GM to explain how clues are connected." },
  { name: "Focused", archetype: "Private Detective", desc: "Ignore penalties from Conditions when making Investigation tests." },
  // SERVANT
  { name: "Loyal", archetype: "Servant", desc: "Gain +2 to Fear tests in the presence of someone you have sworn to protect." },
  { name: "Tough as Nails", archetype: "Servant", desc: "Gain +2 to Force when fighting unarmed." },
  { name: "Robust", archetype: "Servant", desc: "Ignore penalties for physical Conditions on one roll per gaming session." },
  // VAGABOND
  { name: "Hobo Tricks", archetype: "Vagabond", desc: "Gain +2 to Stealth when trying to hide yourself or an object from a wealthy human." },
  { name: "Suspicious", archetype: "Vagabond", desc: "Ignore mental Conditions when making Vigilance tests." },
  { name: "Well-traveled", archetype: "Vagabond", desc: "Once per mystery make a Manipulation test to create an NPC situated in the area whom you have met before; on failure they are hostile or in great need of your help." },
  // WRITER
  { name: "Automatic Writing", archetype: "Writer", desc: "Channel spirits via automatic writing: use Inspiration to gain clues; extra successes reveal more; on failure the GM may give a Condition, possession, or a personality change for a few hours. Once per gaming session." },
  { name: "Journalist", archetype: "Writer", desc: "Use Inspiration instead of Manipulation when charming or deceiving someone to gain information." },
  { name: "Wordsmith", archetype: "Writer", desc: "Ignore penalties from Conditions when making Inspiration tests." },
  // GENERAL
  { name: "Battle Experience", archetype: "General", desc: "Gain +2 to Medicine when treating a physical critical injury." },
  { name: "Brave", archetype: "General", desc: "Gain +1 to all Fear tests." },
  { name: "Combat-Trained", archetype: "General", desc: "Gain +2 to Close Combat and Force when parrying." },
  { name: "Contacts", archetype: "General", desc: "Once per session decide you already know a certain NPC and that your relationship is positive (GM may disallow if it would spoil the mystery)." },
  { name: "Coward", archetype: "General", desc: "When wounded in combat, pass a Stealth test (not an action) to make another PC take damage in your stead; on failure you take 1 extra damage. Once per combat encounter." },
  { name: "Deceptive", archetype: "General", desc: "Gain +2 to Manipulation when cheating and deceiving." },
  { name: "Dedicated", archetype: "General", desc: "Once per session ignore a mental Condition from pushing a skill test." },
  { name: "Defensive", archetype: "General", desc: "Each round get one extra fast action usable only to dodge or parry." },
  { name: "Dual Weapons", archetype: "General", desc: "Using dual weapons in close combat, use extra successes to hit an additional enemy in the same zone; if you instead raise damage, choose which attack deals more." },
  { name: "Dynamiter", archetype: "General", desc: "Gain +2 to Ranged Combat when using explosives." },
  { name: "Empathetic", archetype: "General", desc: "Ignore penalties from Conditions when making Observation tests." },
  { name: "Escape Artist", archetype: "General", desc: "Ignore penalties from Conditions when using Agility to flee." },
  { name: "Famous", archetype: "General", desc: "Gain +2 to Manipulation when trying to influence someone who has heard of you." },
  { name: "Fleet-Footed", archetype: "General", desc: "During combat you may move within your own zone without using actions." },
  { name: "Holy Symbol", archetype: "General", desc: "You have a religious item that lets you use Inspiration to attack vaesen in close combat, dealing 1 damage." },
  { name: "Lightning Reflexes", archetype: "General", desc: "You can draw weapons without using an action." },
  { name: "Nine Lives", archetype: "General", desc: "When rolling for a critical injury, decide which die is tens and which is ones." },
  { name: "Pet", archetype: "General", desc: "You have a pet; once per session gain +1 to a test where your pet is clearly of use." },
  { name: "Pugilist", archetype: "General", desc: "Deal 1 extra damage when fighting unarmed." },
  { name: "Safety in Numbers", archetype: "General", desc: "Gain +2 to Fear tests when accompanied by at least two other PCs (in combat, only if in the same zone)." },
  { name: "Sixth Sense", archetype: "General", desc: "On Investigation tests, spend extra successes to learn if a vaesen has been in the area, roughly what kind, and whether magic was used." },
  { name: "Sprinter", archetype: "General", desc: "Gain +2 to Agility when trying to outrun or chase down someone." },
  { name: "The Lord's Shepherd", archetype: "General", desc: "Gain +2 when using Inspiration to treat a mental critical injury." },
  { name: "Wealthy", archetype: "General", desc: "Increase Resources by 1 (can be purchased multiple times)." },];

export const VAE_CONDITIONS: VaeCondition[] = [
  { name: "Exhausted",  type: "Physical", desc: "A physical Condition (linked to Physique & Precision); each marked Condition gives -1 die to physical rolls." },
  { name: "Battered",   type: "Physical", desc: "A physical Condition; -1 die to all Physique/Precision-based rolls." },
  { name: "Wounded",    type: "Physical", desc: "A physical Condition; -1 die to all Physique/Precision-based rolls." },
  { name: "Angry",      type: "Mental",   desc: "A mental Condition (linked to Logic & Empathy); -1 die to all Logic/Empathy-based rolls." },
  { name: "Frightened", type: "Mental",   desc: "A mental Condition; -1 die to all Logic/Empathy-based rolls." },
  { name: "Hopeless",   type: "Mental",   desc: "A mental Condition; -1 die to all Logic/Empathy-based rolls." },];

export const VAE_PHYSICAL_CRITS: VaePhysCrit[] = [
  { roll: 11, injury: "Foot injury",         fatal: "No",  timeLimit: "—",         effect: "Affliction: Limp, Agility -1" },
  { roll: 12, injury: "Broken fingers",      fatal: "No",  timeLimit: "—",         effect: "Affliction: Crooked fingers, Close Combat -1" },
  { roll: 13, injury: "Ruptured tendon",     fatal: "No",  timeLimit: "—",         effect: "Affliction: Reduced mobility, Agility -1" },
  { roll: 14, injury: "Knee injury",         fatal: "No",  timeLimit: "—",         effect: "Affliction: Skewed walk, Agility -1" },
  { roll: 15, injury: "Fracture",            fatal: "No",  timeLimit: "—",         effect: "Affliction: False joint, Force -1" },
  { roll: 16, injury: "Splinters in the body",fatal:"No",  timeLimit: "—",         effect: "Affliction: Ulcer, Inspiration -1" },
  { roll: 21, injury: "Skin lesion",         fatal: "No",  timeLimit: "—",         effect: "Affliction: Disfigured, Manipulation -1" },
  { roll: 22, injury: "Damaged throat",      fatal: "No",  timeLimit: "—",         effect: "Affliction: Wheezing, Stealth -1" },
  { roll: 23, injury: "Eye injury",          fatal: "No",  timeLimit: "—",         effect: "Affliction: Impaired eyesight, Vigilance -1" },
  { roll: 24, injury: "Injured arm",         fatal: "No",  timeLimit: "—",         effect: "Affliction: Crooked arm, Ranged Combat -1" },
  { roll: 25, injury: "Facial injury",       fatal: "No",  timeLimit: "—",         effect: "Affliction: Deformed face, Manipulation -1" },
  { roll: 26, injury: "Crush injury",        fatal: "No",  timeLimit: "—",         effect: "Affliction: Tremor, Ranged Combat -1" },
  { roll: 31, injury: "Dislodged teeth",     fatal: "No",  timeLimit: "—",         effect: "Affliction: Toothless, Inspiration -1" },
  { roll: 32, injury: "Ear injury",          fatal: "No",  timeLimit: "—",         effect: "Affliction: Impaired balance, Close Combat -1" },
  { roll: 33, injury: "Jaw injury",          fatal: "No",  timeLimit: "—",         effect: "Affliction: Drooling, Inspiration -1" },
  { roll: 34, injury: "Back injury",         fatal: "No",  timeLimit: "—",         effect: "Affliction: Hunchback, Agility -1" },
  { roll: 35, injury: "Severed fingers",     fatal: "No",  timeLimit: "—",         effect: "Affliction: Finger stumps, Ranged Combat -1" },
  { roll: 36, injury: "Nerve damage",        fatal: "No",  timeLimit: "—",         effect: "Affliction: Pain, Force -1" },
  { roll: 41, injury: "Torn ear",            fatal: "No",  timeLimit: "—",         effect: "Affliction: Impaired hearing, Vigilance -1" },
  { roll: 42, injury: "Abdominal injury",    fatal: "Yes", timeLimit: "D6 days",   effect: "Affliction: Reduced mobility, Close Combat -1" },
  { roll: 43, injury: "Dirty wound",         fatal: "Yes", timeLimit: "D6 days",   effect: "Affliction: Sepsis, Force -1" },
  { roll: 44, injury: "Bleeding wound",      fatal: "Yes", timeLimit: "D6 days",   effect: "Affliction: Gangrene, Agility -1" },
  { roll: 45, injury: "Damaged kidney",      fatal: "Yes", timeLimit: "D6 days",   effect: "Affliction: Severe pain, Agility -1" },
  { roll: 46, injury: "Punctured eye",       fatal: "Yes", timeLimit: "D6 hours",  effect: "Affliction: One-eyed, Vigilance -1" },
  { roll: 51, injury: "Ruptured bowel",      fatal: "Yes", timeLimit: "D6 hours",  effect: "Affliction: Impaired mobility, Agility -1" },
  { roll: 52, injury: "Deep arm gash",       fatal: "Yes", timeLimit: "D6 hours",  effect: "Affliction: One-armed, Force -1 (cannot use two-handed weapons)" },
  { roll: 53, injury: "Burst artery",        fatal: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Phobia of blood, Fear -2" },
  { roll: 54, injury: "Internal bleeding",   fatal: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Anemia, Force -2" },
  { roll: 55, injury: "Caved-in forehead",   fatal: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Altered personality, Observation -2" },
  { roll: 56, injury: "Cracked skull",       fatal: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Brain damage, Learning -2" },
  { roll: 61, injury: "Coma",                fatal: "Yes", timeLimit: "D6 days",   effect: "Insight: Prophetic vision, Investigation +3" },
  { roll: 62, injury: "Spinal injury",       fatal: "Yes", timeLimit: "D6 hours",  effect: "Insight: Living dead, Stealth +3" },
  { roll: 63, injury: "Torn abdomen",        fatal: "Yes", timeLimit: "D6 hours",  effect: "Insight: Supernatural focus, Ranged Combat +3" },
  { roll: 64, injury: "Torn body",           fatal: "Yes", timeLimit: "D6 minutes",effect: "Insight: Champion, Close Combat +3" },
  { roll: 65, injury: "Punctured lungs",     fatal: "Yes", timeLimit: "D6 rounds", effect: "Insight: Guardian angel, Agility +4" },
  { roll: 66, injury: "Crushed chest",       fatal: "Yes", timeLimit: "D6 rounds", effect: "Insight: Supernatural strength, Force +4" },];

export const VAE_MENTAL_CRITS: VaeMentalCrit[] = [
  { roll: 11, injury: "Confused",                    chronic: "No",  timeLimit: "—",         effect: "Affliction: Dazed, Investigation -1" },
  { roll: 12, injury: "Overwhelmed",                 chronic: "No",  timeLimit: "—",         effect: "Affliction: Sensitive to stress, Stealth -1" },
  { roll: 13, injury: "Pushed too far",              chronic: "No",  timeLimit: "—",         effect: "Affliction: Fanatic, Manipulation -1" },
  { roll: 14, injury: "Incapacitated",               chronic: "No",  timeLimit: "—",         effect: "Affliction: Clumsy, Agility -1" },
  { roll: 15, injury: "Exhausted",                   chronic: "No",  timeLimit: "—",         effect: "Affliction: Claustrophobic, Stealth -1" },
  { roll: 16, injury: "Panic attack",                chronic: "No",  timeLimit: "—",         effect: "Affliction: Skittish, Fear -1" },
  { roll: 21, injury: "Sees her true self",          chronic: "No",  timeLimit: "—",         effect: "Affliction: Compulsive liar, Inspiration -1" },
  { roll: 22, injury: "Frozen facial muscles",       chronic: "No",  timeLimit: "—",         effect: "Affliction: Mask of terror, Manipulation -1" },
  { roll: 23, injury: "Whitened hair",               chronic: "No",  timeLimit: "—",         effect: "Affliction: Aged, Observation -1" },
  { roll: 24, injury: "Feelings of worthlessness",   chronic: "No",  timeLimit: "—",         effect: "Affliction: Shattered confidence, Inspiration -1" },
  { roll: 25, injury: "Paralyzed",                   chronic: "No",  timeLimit: "—",         effect: "Affliction: Lacks initiative, Investigation -1" },
  { roll: 26, injury: "Trembling",                   chronic: "No",  timeLimit: "—",         effect: "Affliction: Tremor, Ranged Combat -1" },
  { roll: 31, injury: "Confronted with mortality",   chronic: "No",  timeLimit: "—",         effect: "Affliction: Fear of death, Close Combat -1" },
  { roll: 32, injury: "Fighting and screaming",      chronic: "No",  timeLimit: "—",         effect: "Affliction: Impaired impulse control, Stealth -1" },
  { roll: 33, injury: "Divided attention",           chronic: "No",  timeLimit: "—",         effect: "Affliction: Hears voices, Learning -1" },
  { roll: 34, injury: "Disgusted",                   chronic: "No",  timeLimit: "—",         effect: "Affliction: Hates filth, Medicine -1" },
  { roll: 35, injury: "Shaken",                      chronic: "No",  timeLimit: "—",         effect: "Affliction: Sentimental, Manipulation -1" },
  { roll: 36, injury: "Stressed",                    chronic: "No",  timeLimit: "—",         effect: "Affliction: Weakened immune system, Force -1" },
  { roll: 41, injury: "Extreme muscle tension",      chronic: "No",  timeLimit: "—",         effect: "Affliction: High-strung, Agility -1" },
  { roll: 42, injury: "Traumatized",                 chronic: "Yes", timeLimit: "D6 days",   effect: "Affliction: PTSD, Fear -1" },
  { roll: 43, injury: "Furious",                     chronic: "Yes", timeLimit: "D6 days",   effect: "Affliction: Capricious, Manipulation -1" },
  { roll: 44, injury: "Abandoned",                   chronic: "Yes", timeLimit: "D6 days",   effect: "Affliction: Lack of trust, Manipulation -1" },
  { roll: 45, injury: "Overwhelmed by vulnerability",chronic: "Yes", timeLimit: "D6 days",   effect: "Affliction: Paranoid, Vigilance -1" },
  { roll: 46, injury: "Crushed",                     chronic: "Yes", timeLimit: "D6 hours",  effect: "Affliction: Impaired empathy, Inspiration -1" },
  { roll: 51, injury: "Ashamed",                     chronic: "Yes", timeLimit: "D6 hours",  effect: "Affliction: Self-loathing, Manipulation -1" },
  { roll: 52, injury: "Detached",                    chronic: "Yes", timeLimit: "D6 hours",  effect: "Affliction: Egocentric, Medicine -1" },
  { roll: 53, injury: "Out-of-body experience",      chronic: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Dissociating, Ranged Combat -2" },
  { roll: 54, injury: "Dream state",                 chronic: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Nightmares, Fear -2" },
  { roll: 55, injury: "Return to childhood",         chronic: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Regressing, Learning -2" },
  { roll: 56, injury: "Horrifying realization",      chronic: "Yes", timeLimit: "D6 rounds", effect: "Affliction: Mortified, Medicine -2" },
  { roll: 61, injury: "Hypersensitive",              chronic: "Yes", timeLimit: "D6 days",   effect: "Insight: Healer, Medicine +3" },
  { roll: 62, injury: "Possessed",                   chronic: "Yes", timeLimit: "D6 minutes",effect: "Insight: Haunted, Learning +3" },
  { roll: 63, injury: "Obsessed with detail",        chronic: "Yes", timeLimit: "D6 minutes",effect: "Insight: All-seeing, Investigation +3" },
  { roll: 64, injury: "Supernatural experience",     chronic: "Yes", timeLimit: "D6 minutes",effect: "Insight: Divine messenger, Inspiration +3" },
  { roll: 65, injury: "Invaded by other people's emotions", chronic: "Yes", timeLimit: "D6 rounds", effect: "Insight: Absolute empathy, Observation +4" },
  { roll: 66, injury: "Split consciousness",         chronic: "Yes", timeLimit: "D6 rounds", effect: "Insight: Enlightened, Learning +4" },];

export const VAE_MELEE_WEAPONS: VaeMelee[] = [
  { name: "Kick or punch",   damage: 1, range: 0, bonus: "—",  cost: "—", skill: "Force" },
  { name: "Knuckle duster",  damage: 1, range: 0, bonus: "+2", cost: 2,   skill: "Close Combat" },
  { name: "Chair",           damage: 1, range: 0, bonus: "+1", cost: 1,   skill: "Close Combat" },
  { name: "Sledgehammer",    damage: 2, range: 0, bonus: "-1", cost: 2,   skill: "Close Combat" },
  { name: "Flail",           damage: 2, range: 0, bonus: "+2", cost: 4,   skill: "Close Combat" },
  { name: "Club",            damage: 1, range: 0, bonus: "+1", cost: "—", skill: "Close Combat" },
  { name: "Knife or dagger", damage: 2, range: 0, bonus: "—",  cost: 2,   skill: "Close Combat" },
  { name: "Rapier",          damage: 2, range: 0, bonus: "+1", cost: 3,   skill: "Close Combat" },
  { name: "Sword or saber",  damage: 2, range: 0, bonus: "+2", cost: 4,   skill: "Close Combat" },
  { name: "Crowbar",         damage: 1, range: 0, bonus: "+2", cost: 2,   skill: "Close Combat" },
  { name: "Axe",             damage: 2, range: 0, bonus: "+1", cost: 2,   skill: "Close Combat" },
  { name: "Walking stick",   damage: 1, range: 0, bonus: "+1", cost: 1,   skill: "Close Combat" },
  { name: "Halberd",         damage: 3, range: 0, bonus: "—",  cost: 4,   skill: "Close Combat" },
  { name: "Bayonet",         damage: 2, range: 0, bonus: "+2", cost: 3,   skill: "Close Combat" },
  { name: "Whip",            damage: 1, range: 0, bonus: "+1", cost: 1,   skill: "Close Combat" },];

export const VAE_RANGED_WEAPONS: VaeRanged[] = [
  { name: "Spear",            damage: 2, range: "0-1", bonus: "+1", cost: 1, skill: "Close Combat / Ranged Combat" },
  { name: "Bow",              damage: 1, range: "0-2", bonus: "+1", cost: 1, skill: "Ranged Combat" },
  { name: "Longbow",          damage: 2, range: "1-3", bonus: "+1", cost: 2, skill: "Ranged Combat" },
  { name: "Crossbow",         damage: 2, range: "0-2", bonus: "+1", cost: 3, skill: "Ranged Combat" },
  { name: "Pistol or revolver",damage: 2,range: "0-1", bonus: "+2", cost: 4, skill: "Ranged Combat" },
  { name: "Musket",           damage: 2, range: "1-3", bonus: "+1", cost: 3, skill: "Ranged Combat" },
  { name: "Rifle",            damage: 2, range: "1-3", bonus: "+2", cost: 4, skill: "Ranged Combat" },
  { name: "Cannon",           damage: 5, range: "2-5", bonus: "+1", cost: 5, skill: "Ranged Combat" },];

export const VAE_ARMOR: VaeArmor[] = [
  { name: "Light armor",  protection: 2, comment: "Agility -1, Cost 2 (e.g. leather cuirass)." },
  { name: "Medium armor", protection: 4, comment: "Agility -2, Cost 3 (e.g. helmet + chain mail shirt)." },
  { name: "Heavy armor",  protection: 6, comment: "Agility -3, Cost 4 (e.g. plate mail armor)." },];

export const VAE_GEAR: VaeGear[] = [
  { name: "Crowbar",                 bonus: "+1", cost: 2, comment: "Break locks with Force." },
  { name: "Lockpicks",               bonus: "+1", cost: 2, comment: "Pick locks with Stealth." },
  { name: "Opera glasses",           bonus: "+1", cost: 1, comment: "Use Vigilance from a distance." },
  { name: "Binoculars",              bonus: "+2", cost: 2, comment: "Use Vigilance from a distance." },
  { name: "Hunting trap",            bonus: "+1", cost: 2, comment: "Detect sneaking people with Vigilance." },
  { name: "Hunting gear",            bonus: "+2", cost: 2, comment: "Use Investigation in the wilderness." },
  { name: "Tinderbox",               bonus: "+1", cost: 1, comment: "Use Investigation in dim places." },
  { name: "Hurricane lamp",          bonus: "+2", cost: 1, comment: "Use Investigation in darkness and detect sneakers with Vigilance." },
  { name: "Compass",                 bonus: "+1", cost: 2, comment: "Use Learning to find the way." },
  { name: "Magnifying glass",        bonus: "+1", cost: 2, comment: "Find clues during Investigation." },
  { name: "Camera",                  bonus: "+2", cost: 3, comment: "Gain knowledge about a place with Learning or Investigation." },
  { name: "Writing utensils and paper",bonus:"+1",cost: 1, comment: "Take notes during Investigation." },
  { name: "Slide rule",              bonus: "+1", cost: 2, comment: "Make calculations with Learning." },
  { name: "Simple bandages",         bonus: "+1", cost: 1, comment: "Required for Medicine." },
  { name: "Medical equipment",       bonus: "+2", cost: 2, comment: "Required for Medicine." },
  { name: "Musical instrument",      bonus: "+1", cost: 2, comment: "Influence listeners with Inspiration." },
  { name: "Mastercrafted musical instrument",bonus:"+2",cost:3,comment:"Influence listeners with Inspiration." },
  { name: "Cooking pot",             bonus: "+1", cost: 1, comment: "Cook with Inspiration." },
  { name: "Field kitchen",           bonus: "+2", cost: 2, comment: "Cook with Inspiration." },
  { name: "Simple provisions",       bonus: "—",  cost: 1, comment: "Last several days without Force tests." },
  { name: "Nutritious provisions",   bonus: "—",  cost: 2, comment: "Last many days without Force tests." },
  { name: "Liquor",                  bonus: "+1", cost: 1, comment: "Inspire with alcohol." },
  { name: "Fine wines",              bonus: "+1", cost: 2, comment: "Inspire and Manipulate with alcohol." },
  { name: "Chemical equipment",      bonus: "+1", cost: 2, comment: "Determine cause of death with Investigation." },
  { name: "Portable laboratory",     bonus: "+1", cost: 3, comment: "Produce poison with Learning." },
  { name: "Book collection",         bonus: "+1", cost: 2, comment: "Find information for Learning." },
  { name: "Old scrolls",             bonus: "+2", cost: 3, comment: "Find information for Learning." },
  { name: "Crystal ball",            bonus: "+1", cost: 3, comment: "Use Observation to search for clues." },
  { name: "Map book",                bonus: "+1", cost: 2, comment: "Use Investigation and Learning when navigating." },
  { name: "Weak horse",              bonus: "+1", cost: 2, comment: "Use for Force." },
  { name: "Strong horse",            bonus: "+2", cost: 3, comment: "Use in Close Combat and for Force." },
  { name: "Pet dog",                 bonus: "+1", cost: 1, comment: "Use for Close Combat." },
  { name: "Guard dog",               bonus: "+2", cost: 2, comment: "Use for Vigilance and Close Combat." },
  { name: "Hunting dog",             bonus: "+3", cost: 3, comment: "Use for Vigilance, Close Combat and Investigation." },
  { name: "Make-up",                 bonus: "+1", cost: 1, comment: "Sometimes required for Manipulation." },
  { name: "Disguise",                bonus: "+2", cost: 2, comment: "Sometimes required for Manipulation." },
  { name: "Elegant disguise",        bonus: "+2", cost: 3, comment: "Required for Manipulation; can be used to sneak with Manipulation." },
  { name: "Rope",                    bonus: "+1", cost: 1, comment: "Use Force to climb." },
  { name: "Rope ladder",             bonus: "+3", cost: 2, comment: "Use Force or Agility to climb." },
  { name: "Weak poison (3 doses)",   bonus: "—",  cost: 1, comment: "Poison someone (toxicity 3)." },
  { name: "Strong poison (2 doses)", bonus: "—",  cost: 2, comment: "Poison someone (toxicity 6)." },
  { name: "Extremely strong poison (1 dose)",bonus:"—",cost:3,comment:"Poison someone (toxicity 9)." },];

export const VAE_HQ_UPGRADES: VaeUpgrade[] = [
  // FACILITIES
  { name: "The Annals of the Society", type: "Facility", prereq: "—", dp: 4, desc: "At end of session a player records the party's experiences, granting each PC one extra Experience Point." },
  { name: "Armory", type: "Facility", prereq: "Resources 5 or Weapons Corridor", dp: "5 (up to 3 ranks)", desc: "Each rank lets PCs bring a melee weapon or piece of armor at cost 2 without using Resources (prep phase)." },
  { name: "Infirmary", type: "Facility", prereq: "Resources 5 or Doctor in group", dp: 6, desc: "Makes it possible to push physical recovery rolls." },
  { name: "Kennel", type: "Facility", prereq: "Gamekeeper or Hunter in group", dp: "4 (up to 3 ranks)", desc: "Each rank lets PCs bring a guard dog or hunting dog without using Resources (prep)." },
  { name: "Library", type: "Facility", prereq: "Available from start", dp: 0, desc: "Clues can be found here." },
  { name: "Local Tavern", type: "Facility", prereq: "—", dp: "4 (up to 3 ranks)", desc: "One PC per rank can gain +1 to their physical recovery roll." },
  { name: "Map Room", type: "Facility", prereq: "Library or Professor", dp: 4, desc: "Asset: one PC can gain an extra Advantage before a mystery: Old Map." },
  { name: "Observatory", type: "Facility", prereq: "Patron or Inventor", dp: 5, desc: "Seek info among the stars; one PC gains an extra Advantage (Divination or Weather Prophet). Asset: one PC can bring Binoculars without Resources." },
  { name: "Pigeon Loft", type: "Facility", prereq: "Caretaker", dp: 4, desc: "Asset: bring a homing pigeon to send for help during a subsequent scene." },
  { name: "Seance Parlor", type: "Facility", prereq: "Resources 4 or Occultist in group", dp: 5, desc: "Hold a séance before a mystery for additional clues (GM decides which)." },
  { name: "Shooting Range", type: "Facility", prereq: "Weapons Corridor", dp: "5 (up to 3 ranks)", desc: "All castle guards carry ranged weapons at cost 3; Asset: bring ranged weapons at total cost up to 3 per rank without Resources (prep)." },
  { name: "Stable", type: "Facility", prereq: "Resources 5 or Vagabond in group", dp: "4 (up to 3 ranks)", desc: "Asset: each rank lets PCs bring a scrawny horse without Resources (prep)." },
  { name: "Weapons Corridor", type: "Facility", prereq: "Resources 4", dp: "4 (up to 3 times)", desc: "Bring any melee weapons at total cost up to 2 per rank without Resources (prep)." },
  { name: "Workshop", type: "Facility", prereq: "Resources 4", dp: 4, desc: "One PC gains an extra Advantage: Well-Maintained Weapons or Well-Maintained Tools." },
  // DISCOVERED FACILITIES
  { name: "Botanical Garden", type: "Discovered Facility", prereq: "Gardener", dp: 4, desc: "A PC who spends a scene in the garden heals one mental Condition." },
  { name: "Butterfly House", type: "Discovered Facility", prereq: "Botanical Garden", dp: 2, desc: "A PC who spends a scene here heals two mental Conditions." },
  { name: "Carp Pond", type: "Discovered Facility", prereq: "Botanical Garden", dp: 2, desc: "One PC can gain an extra Advantage before a mystery: Unwavering Calm." },
  { name: "Cellar Vault", type: "Discovered Facility", prereq: "—", dp: "4 (up to 3 ranks)", desc: "Each rank can store one temporary item from previous mysteries." },
  { name: "Chapel", type: "Discovered Facility", prereq: "Resources 5 or Priest in group", dp: 6, desc: "Can push all mental recovery rolls; Asset: bring a vial of holy water on each mystery." },
  { name: "Difference Engine", type: "Discovered Facility", prereq: "Inventor", dp: 6, desc: "Facilities cost one less Development Point to construct." },
  { name: "Dungeon", type: "Discovered Facility", prereq: "Cellar Vault", dp: 3, desc: "NPCs imprisoned here cannot escape without help." },
  { name: "Forgotten Gallery", type: "Discovered Facility", prereq: "Guard or Occult Library", dp: 6, desc: "One PC gains +1 Resources until end of mystery; Asset: bring a clue (old journals) granting +1 Investigation or Observation." },
  { name: "Gymnasium", type: "Discovered Facility", prereq: "—", dp: 5, desc: "A PC who spends a scene in the gymnasium heals a physical Condition." },
  { name: "Occult Archive", type: "Discovered Facility", prereq: "Occult Temple or Mystic", dp: "6 (up to 3 ranks)", desc: "Each rank can store one power item or magic item from previous mysteries." },
  { name: "Occult Library", type: "Discovered Facility", prereq: "An occult book from a mystery", dp: 5, desc: "Once per mystery a PC gains a free success on a roll for locating/understanding occult knowledge." },
  { name: "Occult Temple", type: "Discovered Facility", prereq: "Occult Library", dp: 5, desc: "One PC gains an extra Advantage before a mystery: Occultist." },
  { name: "Occult Workshop", type: "Discovered Facility", prereq: "Occult Library", dp: 5, desc: "Craft one power item before a mystery (GM rolls/picks from the power-item list)." },
  { name: "Self-Flagellation Tools", type: "Discovered Facility", prereq: "Dungeon", dp: "4 (up to 3 ranks)", desc: "One PC per rank gains +1 to their mental recovery roll." },
  { name: "Treasure Chamber", type: "Discovered Facility", prereq: "Banker or Forgotten Gallery", dp: 6, desc: "All PCs gain +1 Resources for the duration of a mystery." },
  // CONTACTS
  { name: "Banker", type: "Contact", prereq: "Resources 5", dp: 5, desc: "Once per mystery a PC can raise Resources by 2 for one scene." },
  { name: "Fixer", type: "Contact", prereq: "Six or more Facilities at HQ", dp: 4, desc: "Restore/retrieve a lost memento at end of mystery without spending XP." },
  { name: "Journalist", type: "Contact", prereq: "Resources 4 or Writer in group", dp: 4, desc: "Provides additional clues and can come along on mysteries as a helping hand." },
  { name: "Patron", type: "Contact", prereq: "Inspiration 5 or Military Officer in group", dp: 4, desc: "Grants a free success on a Manipulation test when bartering/negotiating prices." },
  { name: "Police Constable", type: "Contact", prereq: "Resources 5 or Private Investigator in group", dp: 4, desc: "Provides clues, fabricates evidence, protects against criminals (GM decides)." },
  { name: "Professor", type: "Contact", prereq: "Resources 5 or Academic in group", dp: 4, desc: "Free success on a roll for finding/interpreting information in Upsala." },
  { name: "Psychiatrist", type: "Contact", prereq: "A PC mentally Broken during the mystery", dp: 4, desc: "Gives the PC +2 on their mental recovery roll." },
  // PERSONNEL
  { name: "Butler Algot Frisk", type: "Personnel", prereq: "Available from start", dp: 0, desc: "Manages the headquarters." },
  { name: "Caretaker", type: "Personnel", prereq: "Workshop", dp: 3, desc: "Repairs facilities in the castle if something is broken." },
  { name: "Chef", type: "Personnel", prereq: "—", dp: 4, desc: "Cooks fancy dinners and keeps everyone fed; Asset: provides each PC simple provisions in prep without rolling Resources." },
  { name: "Coachman", type: "Personnel", prereq: "Stable boy", dp: 4, desc: "An NPC (10 attr/8 skills, 2 Physique-based; Toughness 1/1); Asset: PCs get their own carriage with two strong horses to travel and heal a Condition." },
  { name: "Gamekeeper", type: "Personnel", prereq: "Shooting Range", dp: 5, desc: "Upgrades the shooting range weapons to max cost 4; Asset: bring hunting gear/trap without rolling Resources (prep)." },
  { name: "Gardener", type: "Personnel", prereq: "Resources 5", dp: 4, desc: "All HQ food counts as nutritious; Asset: provides three doses weak poison or one dose strong poison in prep without Resources." },
  { name: "Guard", type: "Personnel", prereq: "—", dp: "5 (multiple)", desc: "Castle guard NPC (12 attr/6 skills in Close Combat/Ranged Combat/Vigilance/Observation; Toughness 2/1; weapon cost 1-2); protects the castle." },
  { name: "House Physician", type: "Personnel", prereq: "Infirmary", dp: 6, desc: "Automatically treats Broken and two Conditions for all PCs during one scene per mystery; Asset: provides medical equipment in prep without Resources." },
  { name: "Inventor", type: "Personnel", prereq: "Professor", dp: 5, desc: "Build one mechanical item of choice before a mystery regardless of cost; Asset: provides chemical equipment without Resources." },
  { name: "Mystic", type: "Personnel", prereq: "Occult Library", dp: 5, desc: "Gain a clue about a power/magic item connected to a vaesen in the current mystery." },
  { name: "Quartermaster", type: "Personnel", prereq: "Banker or Patron", dp: 6, desc: "All PCs gain +2 Capital regardless of living standard (prep or during mystery)." },
  { name: "Recruit", type: "Personnel", prereq: "Inspiration 4", dp: "5 (multiple)", desc: "A new person with the Sight joins (12 attr max4 / 10 skills max2; Toughness 1/1); can come along as an NPC." },
  { name: "Stable Boy", type: "Personnel", prereq: "Stable", dp: 3, desc: "All horses taken from HQ count as strong." },];

export const VAE_BESTIARY: VaeMonster[] = [
  {
    name: "Ash Tree Wife",
    stats: { might: 8, bodyControl: 10, magic: 10, manipulation: 8, fear: "1/1" },
    desc: "A terrifying female vaesen bound to a large ash tree, demanding offerings at certain times of year. Looks like a human woman fused with the tree: long green hair, bark-like skin, branch horns. She controls the tree and all greenery around it; haunts those who damage the tree, spreads disease, twists minds.",
    powers: ["Enchant", "Curse", "Surrounding vegetation reflects her mood", "Control vegetation and use branches to attack or enclose people", "Fast action to move instantly between connected trees", "Extra action for attacking with branches", "Open underground passages in the root system to hide/trap people"],
    combat: "Claws 2 (range 0); Branches 2 (0–4, only near trees/bushes); Enclose 0 (0–4, ground opens and devours — fast action + Agility to get away; break out as slow action = Force with 2 successes).",
    conditions: "Vegetation shakes; Furious +1; Cautious (hides); Bleeding sap -1; Murderous +2; Desperate -2; Broken — turns to leaf litter, re-emerges in the ash after D6 hours.",
    weakness: "RITUAL: The only way to kill her is to cut down or burn the ash. SECRET: Before the ash is killed, seven iron nails must be hammered into its roots, or she may flee to another ash and seek revenge."
  },
  {
    name: "Brook Horse (Nix/Bäckahäst)",
    stats: { might: 9, bodyControl: 12, magic: 8, manipulation: 10, fear: 0 },
    desc: "A magnificent stallion (white, dapple-gray, black, or shimmering blue) with razor-sharp teeth that lurks in brooks and lakes. Lures children or careless farmers to drown in a swamp or take them on a mad ride far away. Its back can stretch to seat several riders.",
    powers: ["Enchant", "Curse", "Can breathe underwater", "Can extend its back for more riders", "Can travel at great speed on its mad ride (a parish away in a minute or two)", "Lure: uses innocent look/neighs to lure a person to ride it (Manipulation vs Observation)", "Brook Ride: the rider is taken to the nearest watercourse and must pass Force vs the horse's Body Control to jump off without taking physical Conditions"],
    combat: "Bite, hooves 2 (range 0); Drown 2 (range 0; a PC dragged into a watercourse takes 2 physical Conditions per round).",
    conditions: "Luring; Angry +1; Wild and reckless +2; Tired -1; Frightened -2; Broken — turns to slushy water, re-emerges in the nearest watercourse after D6 hours.",
    weakness: "RITUAL: Banish by riding it across plowed ground in a circular sun cross, or leading it into a stable with six carved Christian symbols (one on each wall, floor, ceiling). SECRET: Steel (a bridle) binds it to temporary obedience; exclaiming 'cross' or 'cross of Christ' makes it disappear with a chilling neigh."
  },
  {
    name: "Church Grim",
    stats: { might: 8, bodyControl: 8, magic: 8, manipulation: 4, fear: 1 },
    desc: "A guardian creature that watches over a church, created by killing an animal (dog, rooster, cat, or horse) and burying it in the church wall. Attacks anyone trying to harm the church/pastor, steal, or desecrate hallowed ground. Fierce and ruthless; can raise spirits from the graveyard as black birds; rings the bells at midnight before a villager's death.",
    powers: ["Enchant", "Curse", "Sees everything that happens in the church", "Moves with the speed of a galloping horse", "May act twice per round in combat (draws two initiative cards)"],
    combat: "Bite, claws 2 (range 0).",
    conditions: "Angered; Mad +1; Dazed -1; Wounded and cautious -2 (only acts on one initiative); Furious +2; Broken — dissolves into smoke, re-emerges in the church after D6 minutes.",
    weakness: "RITUAL: Find the wall where it is buried, break it down, and burn the carcass (often splits/razes the church). SECRET: It can be attracted by sinful deeds and blasphemy; provoked and drawn out, it can be fought or the sinner talked out of their ways while someone sneaks in to find the entombed carcass."
  },
  {
    name: "Fairy (and Elves)",
    stats: { might: 4, bodyControl: 8, magic: 9, manipulation: 7, fear: 0 },
    desc: "Luminous, palm-sized women (can take any form — wisps, insects, frogs); males are 'elves' resembling tiny old men. Elves play music while fairies lead the fairy dance that drives people to insanity and distorts their sense of time. Self-centered, easily offended, amoral; bite/infect those who anger them, feed on children's fingers. Live in mounds led by a fairy queen or elf king, moving in processions on magical paths.",
    powers: ["Enchant", "Curse", "Trollcraft", "+2 to Magic at dusk or dawn", "Can fly", "Draws two initiative cards and picks the best", "Fairy Dust: blown into faces to make people see visions (Manipulation vs Observation); visions last one scene, needing an extra success to pass any test; extra successes cause mental Conditions"],
    combat: "A handful of fairies count as one NPC. Bite, sword 1 (range 0). Some elves carry swords, wear armor, ride ferrets/crows.",
    conditions: "Playful -1; Feisty and aggravating +1 (blows fairy dust); Offended -1; Furious +1 (uses both initiative cards); Broken — turns to mist or escapes underground, returns to its dwelling after D6 minutes.",
    weakness: "RITUAL: Blow into their dwelling with a bellows; or find their magical paths and walk them ringing a church bell + sprinkling holy water; some leave if tricked/outsmarted or when spells are broken; can be killed with magic items or violence by other vaesen. SECRET: To use the bellows a priest/holy person must first have blown into it. Fairies detest factories, steam trains, and mechanical inventions."
  },
  {
    name: "Ghost",
    stats: { might: "—", bodyControl: "—", magic: 10, manipulation: 7, fear: "2/1" },
    desc: "The spirit of a dead person who has not found peace because of an unmet need or desire — vengeance, forgiveness, a warning, or tethered by loved ones' grief. Faintly transparent rotting-corpse body; manifests through temperature drops, strange noises, flames turning blue. Often bound to a place (death site, crime scene, old home). Contacted via seances or dreams.",
    powers: ["Enchant", "Curse", "Cannot be harmed in combat"],
    combat: "Cannot be harmed in combat (no physical stats).",
    conditions: "(No physical/body conditions — cannot be harmed in combat.)",
    weakness: "RITUAL: The only way to banish it is to find out what keeps it from passing on and help it resolve its unfinished business. SECRET: Some ghosts store their life force in a physical object or living host; destroy the object or kill the host to banish it. A possessed person can trick the ghost into revealing itself by looking in a mirror and repeating its name, then persuade/extort it to leave."
  },
  {
    name: "Giant",
    stats: { might: 15, bodyControl: 6, magic: 5, manipulation: 5, fear: 2 },
    desc: "Ancient, huge, vaguely human-like creatures predating humanity, often with horns, fangs, tusks, or strange growths. Live in separate communities; some favor humans, others feast on human flesh. Violent and impetuous; abhor Christianity; hurl boulders at churches.",
    powers: ["Enchant", "Giant Cauldron: can be used to cast curses, Magic +3", "Moves with the speed of a galloping horse", "Extra action in combat used only for movement or to grapple", "Thick Skin: Protection 6"],
    combat: "Fist, club 3 (0–1); Boulder 2 (1–3); Jump 2 (0, affects everyone in the zone); Bite 4 (0, must first hold the victim).",
    conditions: "Nonchalant -1; Scornful +1; Mad +1 (hurls boulders and grabs); Bloodthirsty +2 (crushes everything in its path); Cautious -1 (Enchants); Confused -3; Broken — flees and stays away for D6 days.",
    weakness: "RITUAL: Giants flee at the sound of church bells (may try to raze the church by hurling boulders); raising a cross or sprinkling holy water near its dwelling drives it into the wilderness; some turn to stone if a human calls them by their true name."
  },


  {
    name: "Lindworm",
    stats: { might: 12, bodyControl: 8, magic: 8, manipulation: 7, fear: 2 },
    desc: "An ancient reptilian monster with razor-sharp claws that spits caustic acid, with a white mane on its neck. Stays near old oak trees (keeping their leaves green year-round), beneath churches, or in ruins. Hoards treasure in its burrow; by biting its tail it can roll at high speed. Feeds on cattle, human flesh, and corpses; tricks and enchants people. Some are God-fearing and grant the gift of magic.",
    powers: ["Enchant", "Curse", "May act twice per round (two initiative cards)", "Armor: Protection 6", "Takes no damage from fire", "Can move at high speed by rolling", "Heals two Conditions if left alone for two rounds"],
    combat: "Bite, claws 3 (range 0); Caustic venom 2/1 (0–2; target takes two physical Conditions the first round, one the next; armor does not protect against venom).",
    conditions: "Alert +1; Spiteful; Mad +1; Dazed -2 (withdraws and heals); Panicking +1 (spits venom at everyone, slow action); Cautious -1; Wounded -2 (bargains for its life); Broken — hurls itself headlong at enemies and flees, returns after D6 hours.",
    weakness: "RITUAL: Not harmed by fire, but killed by tricking it into slithering through three different fires — the third turns it to ash. SECRET: Lindworms propagate by laying eggs only in magical/supernaturally charged places; they can be driven off and stopped from reproducing by pouring silver shavings or burying silver objects at the location. (Gift of the Lindworm: eating its flesh/wearing its skin/making a deal grants Magic 7 and a power; failure = a physical Condition and a lurking vaesen.)"
  },
  {
    name: "Mare (Nightmare)",
    stats: { might: 6, bodyControl: 9, magic: 8, manipulation: 10, fear: "2/1" },
    desc: "A woman who unknowingly shapeshifts into a nightmarish vaesen, possessed by a deceased unmarried woman seeking revenge or a lost beloved (or cursed via black childbirth magic). At night she turns into an oily mist that passes through the smallest knothole, crawls onto a sleeper's chest and squeezes the air and vitality out — causing terrible nightmares, sweating, breathlessness. Also rides horses (leaving them foaming with marelocks in their manes). Returns home and resumes human form by morning.",
    powers: ["Enchant", "Curse", "Fast action to switch between gaseous and solid form", "In gaseous form can fly and pass through tiny cracks but not attack", "No damage in gaseous form", "Mare's Kiss: enchants the victim like Trollcraft PASSION (lasts turns, not scenes)", "Shortness of Breath: target makes an Observation test; on failure, shortness of breath, a mental Condition, and loses next slow action"],
    combat: "Claws 2 (range 0); Mare's kiss 1 (0, enchants like Passion); Shortness of breath 2/1 (0–1, mental Conditions; single victim takes 2, or deal 1 to everyone in range).",
    conditions: "Cautious +1 (dissolves into oily smoke and hisses); Angry +1 (threatens and curses); Pleading -1; Fawning and seductive -1 (blows mare's kisses); Unyielding rage +2 (squeezes the air out of opponents); Panic and escape -2; Broken — dissolves into dark smoke, returns home and reverts to human at sunrise with no memory.",
    weakness: "RITUAL: Keep her away by placing hair in a bible, spreading flax seeds around the bed, or making her count something until daybreak. The curse is only broken by someone loudly declaring that she is a mare just as she is becoming human — the transformation aborts and she wakes with a lost finger or leg. SECRET: Bind her to the place by filling in the gap she passed through in gaseous form (she stays in mare form until she can return home). A mare-ridden person who kneels and promises marriage can ease her thirst for vengeance — but woe to the man who breaks his promise."
  },
  {
    name: "Mermaid",
    stats: { might: 7, bodyControl: 8, magic: 8, manipulation: 8, fear: 1 },
    desc: "Ruler of the sea and waves and all creatures of the deep, with a fish tail, a hollow fish-scaled back, and gills. Rewards offerings with favorable winds or a huge catch; punishes stinginess with storms or icebergs. Lives in a palace at the bottom of the sea with serving spirits (enthralled humans) and her sea children (human/vaesen hybrids).",
    powers: ["Enchant", "Curse", "Trollcraft", "Enchanted Song: Magic +2 while singing (not those who cover their ears)", "In water may act twice per round", "Fish Scales: Protection 4", "Monster: summons deep-sea monsters that sink ships and drag people underwater (Might 14, Body Control 10, own initiative/actions)", "Can transform into any marine creature"],
    combat: "Claws 1 (range 0).",
    conditions: "Vengeful +1; Cautious (Enchants through song); Bleeding -1; Wounded -2 (transforms to escape); Tactical +1; Panicking -2 (summons monster for protection); Broken — retreats to the bottom of the sea and stays away for D6 days.",
    weakness: "RITUAL: She dreads metal; those under her spell regain control if their bare skin touches steel. She leaves a vessel alone if offerings are thrown into the water; once enamored with a human she will not stop pursuing him unless he marries in a church and wears a ring. SECRET: The gifts thrown must be truly important to the giver (she senses a true sacrifice); some mermaids require human sacrifices, and throwing the wrong things may get a ship attacked by a summoned sea monster."
  },
  {
    name: "Myling",
    stats: { might: 9, bodyControl: 7, magic: 8, manipulation: 6, fear: "2/1" },
    desc: "The spirit of a child murdered by its mother (born out of wedlock, or from poverty). Haunts the place where the body was hidden — screaming, wailing, sobbing. Appears as a ghost the age the child was when it died; can take physical form as a giant black bird with a human head. Can be teasing and mischievous, and often wants its mother punished.",
    powers: ["Enchant", "Curse", "Fly", "One extra fast action usable for movement", "Feathers: Protection 4", "Whimper: attackers must pass an Observation test to attack and damage it"],
    combat: "Beak, talons 2 (range 0). Can only be harmed in its bird form.",
    conditions: "Spiteful; Aggressive +1; Hateful +2; Scruffy and dropping feathers -1; Shaken and pleading -2; Wounded -2 (bleeding black blood, whimpering with sadness); Broken — dissolves and leaves black feathers; becomes a ghost in the form of a child.",
    weakness: "RITUAL: Finds peace when its mother is sentenced to death or the crime is solved and justice served; or by finding its body, burying it on consecrated ground, and giving it someone else's name (the name-giver must then be renamed, or the myling haunts them). SECRET: When burying the remains, the body must be wrapped in pieces of cloth with drops of human breast milk."
  },
  {
    name: "The Neck (Näcken)",
    stats: { might: 5, bodyControl: 8, magic: 12, manipulation: 10, fear: 1 },
    desc: "A musician living in rivers, brooks, and lakes, in the shape of a young or old man with peculiar features (cloven hooves, a third eye, or frog's eyes). Plays fiddle, flute, and harp; his beautiful melancholic melodies force listeners to dance uncontrollably. Lures people into the water and drowns them, or draws them to his underwater realm. There is only one Neck, found all over Scandinavia, sometimes at once, yet still the same creature. Can teach magic melodies in return for a black cat.",
    powers: ["Enchant", "Curse", "Can breathe underwater", "Can transform into animals living in/around water", "Slow action to move between different waters", "Magic Instrument: works like the Trollcraft spell DANCE"],
    combat: "Claws 1 (range 0).",
    conditions: "Fawning +2 (plays and lures); Desperate; Wounded -2 (curses its attackers); Fleeing -1 (changes watercourse or transforms); Broken — turns into a fly or toad, re-emerges in a watercourse after D6 hours.",
    weakness: "RITUAL: Sensitive to Christian symbols and steel. Prevent his magic by sticking a knife in the ground while talking to him; he hates places where the cross is painted. Banish by luring him somewhere completely surrounded by Christian symbols and steel. SECRET: For the knife-in-ground to work, it must first have been used to cut the strings of a lute or fiddle. When blocked by Christian symbols/steel he may still gain enough power to pass if he hears people singing or playing music with gusto."
  },
  {
    name: "Night Raven",
    stats: { might: 8, bodyControl: 9, magic: 6, manipulation: 8, fear: "1/1" },
    desc: "The bitter, damned spirit of a suicide or criminal buried in unholy ground, sometimes created when a church grim purged the unhallowed dead from the graveyard. A raven-like creature of oily smoke and scruffy feathers with glowing eyes and razor-sharp teeth. Flies close to the ground at night, seeking the tomb of Christ; gathers in flocks on major holidays; shelters underground by day.",
    powers: ["Enchant", "Can fly, but only two meters above ground", "Draws two initiative cards and picks the best", "Gains an additional slow action when part of a flock", "Night Shriek: petrifies its victim with a shriek — Manipulation vs Observation for everyone in range 0–2; affected take a mental Condition if they try to run or flee", "Can only be harmed by holy weapons or church silver"],
    combat: "Talons, beak 1/2 (range 0; a single night raven deals 1, but part of a flock the bitter spirit frenzies and deals 2). A handful count as one NPC.",
    conditions: "Bitter; Angry +1; Hateful +1; Dazed -1 (drops feathers); Confused -2; Mad +2 (swaps initiative with a PC of its choice); Broken — disintegrates into oily smoke and broken feathers, re-emerges north of the nearest church after D6 minutes.",
    weakness: "RITUAL: Won't find peace until its original body is buried in holy ground. It can be forced back into the body if wrapped in the burial shroud of a saint or bishop at night, then exposed to the first rays of the morning sun. SECRET: The spirit can be bound and forced to obey a master as long as three of its feathers lie pressed in a bible with a dried passion flower; victims can avoid its attacks by flattening themselves against the ground until sunrise."
  },
  {
    name: "Nisse",
    stats: { might: 10, bodyControl: 8, magic: 5, manipulation: 7, fear: 0 },
    desc: "A farmstead guardian who wants what is best for the farm, helping with the work and favoring a particular horse (whose mane he braids). Appears as a little old man with a long beard, shabby gray clothes, and a red hat. Grumpy, vindictive, proud; smacks lazy servants; expects offerings of porridge. Can mistake kindness for love and try to take the farmer's place. Can turn into animals (toad/cat); extremely strong.",
    powers: ["Enchant", "Nisse's Porridge: eating his porridge gives Might +3 for one scene", "Can turn into animals", "Draws two initiative cards and picks the best", "Extra fast action usable for movement", "Can become invisible for a short period and cause trouble/mischief"],
    combat: "Fists 3 (range 0).",
    conditions: "Scornful; Irritated +1 (becomes invisible and causes mischief); Dazed -1; Hateful +2 (seeks to inflict damage on its surroundings); Bleeding -2; Panicked rage -2 (wounded, but always acts with the highest initiative); Broken — hides for D6 hours and plans a terrible revenge.",
    weakness: "RITUAL: Easiest way to get rid of him is to make him accept a new piece of clothing (he then departs to another farm); or stop giving him food/gifts or offend him by soiling his porridge (risky — he seeks revenge); sometimes made to leave by stealing his hat or threatening his favorite animal. SECRET: Nissar can be bound with spider silk (robbing their power so they can't break loose). A nisse can be killed with a nail from the wall of a dilapidated farmhouse driven through its heart."
  },
  {
    name: "Revenant",
    stats: { might: 9, bodyControl: 9, magic: 9, manipulation: 8, fear: "2/1" },
    desc: "The undead spirit of an evil human, full of hatred and an urge to frighten, harm, and kill — usually tormenting the family or people it loathed in life. Usually invisible but can appear as a monstrous figure with sharp teeth and claws, sometimes black as night and several meters tall. Sucks the life out of people by ghost-pressing, and also eats humans alive. Lairs in a tree, rock pile, or ruin near its death-place, where it must stay until nightfall.",
    powers: ["Enchant", "Curse", "Extra fast action usable only for movement", "Fast action to switch between physical and spectral form", "Can only deal/take damage in physical form", "Can fly and move at high speed", "Magically identifies people's weaknesses and shameful secrets", "Can pass through tiny spaces (door gaps, keyholes)"],
    combat: "(Combat stats continue p.151 — see next batch.)",
    conditions: "Devious +1 (seeks the victim's secrets); Hateful +2; Twisted -1 (curses); Cautious (shows up unexpectedly in spirit form); Broken — retreats to its dwelling and stays away for D6 days.",
    weakness: "RITUAL: (continues p.151). SECRET: A revenant can inhabit the body of a living human, living on even if its own remains are destroyed; banishing it from a living host requires some form of exorcism."
  },


  // Revenant combat/ritual completion (stats above):
  // Combat: Claws, bite 2 (range 0); Ghost press 2/round (0, must hold the victim — deals physical Conditions every round in its grip; armor does not protect).
  // RITUAL: Cannot pass a Christian symbol painted in tar or harm a person wearing a cross (but can use magic to make them remove it). Banish using the remains of its human corpse: if unburied, dig up the body, carry it ACROSS a graveyard wall (not the gate), bury in consecrated ground with a cross on the casket; if already buried in a graveyard, dig it up, carry across the wall three times, rebury with a cross and the digging shovels. Or burn the dead body.
  {
    name: "Sea Serpent",
    stats: { might: 15, bodyControl: 10, magic: 8, manipulation: 6, fear: "3/2" },
    desc: "A sea monster hiding in dark waters — caves/crevasses around coasts and fjords, beneath islands, or deep in mountain lakes (echoing Jörmungandr and the Great Lake monster). Intelligent, born of magic; can enthrall an entire crew with its hypnotic gaze, or break masts and sink ships with its size.",
    powers: ["Hypnotic Gaze (Observation) to control and lure victims", "May act twice per round (two initiative cards)", "Copper Scales: Protection 8", "Can move at high speed underwater", "Bite can release paralyzing venom with potency 4", "Can constrict a victim and still act against others (grapple with a free action each round)", "Drags humans/cattle/ships into the depths with an opposed Might test (resist with Agility or Force)"],
    combat: "Bite 3 (range 0); Constrict 2/1 (0, grabs the victim for 2 physical Conditions, then 1/round until Broken or free); Pound 2 (0, affects everyone in the zone); Ram 3 (1–2, damages ships and humans, requires momentum).",
    conditions: "Tactical; Angry +1; Cautious -2; Vengeful (drags someone into the deep if possible); Furious +2 (tries to destroy everything and everyone); Wounded and raging +1; Broken — takes the nearest victim in its maw and retreats into the deep, returns after D6 minutes.",
    weakness: "RITUAL: Shy, solitary; tricked into biting its own tail and paralyzing itself by leading it around tunnels/cavities so the tail is mistaken for an enemy; it then sinks and disintegrates. SECRET: Lured with tender meat of a piglet attached to an anchor or large hook; drawn to the smell of metal, it wraps around an iron anchor and sinks to the bottom."
  },
  {
    name: "Spertus",
    stats: { might: "—", bodyControl: "—", magic: "—", manipulation: "—", fear: "—" },
    desc: "A magical being appearing as a shiny black bug or small white snake/worm, said to be in league with the Devil. Humans use its powers for wealth, love, and success (obtained by fishing with a human leg as bait, or hatching a chicken egg in one's armpit). Must be fed human spit daily, or its vengeance is terrible. Eventually takes control of its owner unless sold/given away, but can only be passed twice — the third owner can never be rid of it and is controlled by it.",
    powers: ["Has no powers of its own but grants its owner Magic 8 plus one or more: Enchant (Enchantments), Curse (Curses), Trollcraft, Wealth (Resources +2), Luck (once/session a free success), Love (Manipulation +3 seducing), Strength (Force +2 and one extra physical Condition before Broken)"],
    combat: "The spertus cannot be destroyed by physical means. If thrown away, it returns to its owner within D6 hours.",
    conditions: "Cannot be destroyed by physical means; if thrown away returns within D6 hours. (When a PC uses its powers, GM rolls D6; a 1 = 'Leaking Magic' effect — Enchantment on surroundings / a Magic 10 Curse / body distorted / bleeding & strange changes / possessed D6 days / spertus takes control.)",
    weakness: "RITUAL: Once it controls a human, two ways to be rid of it: sacrifice a dozen people in a magical ritual, OR devote every action to the Church and live a virtuous life for many years — in both cases it eventually shrivels and dies. SECRET: The only way to get rid of it is to live a virtuous life; blood-sacrifice rituals only make it stronger, and it crawls into its owner's ear to control them from inside their head (the owner thinks they are free, but the spertus controls them)."
  },
  {
    name: "Troll",
    stats: { might: 9, bodyControl: 6, magic: 7, manipulation: 7, fear: 1 },
    desc: "Live in communities in mountains and hills — brew beer, keep livestock, marry, and keep traditions; hate Christianity but exchange favors/tools with humans. Forest trolls have long beards, tails, big noses, sometimes look beautiful but with a tell (skewed features, greenish skin, strange pupils). Mountain trolls are related to giants — huge, hideous, with tusks/big ears/warty skin/multiple limbs. Steal things and kidnap humans (offering enchanted food that looks delicious but is slugs/frogs); snatch babies and leave changelings.",
    powers: ["Enchant", "Curse", "Trollcraft", "Can have one or several magic items (Trolls' Items)", "Mountain Troll: turns to stone during the day; has Might 12, Manipulation 5, Fear 2 and deals 3 damage"],
    combat: "Club, knife, staff 2 (range 0).",
    conditions: "Irritated +1; Angry +2 (Enchants and scares); Afraid -1; Dazed -1; Bleeding but furious +1 (Curses its enemies); Badly injured -2; Broken — flees and stays away for D6 hours.",
    weakness: "RITUAL: Driven away by Christian rituals — placing a cross in their dwelling; uttering holy words makes their food rancid; baptizing toddlers protects them; some mountain trolls crack or turn to stone permanently in sunlight. SECRET: Christian symbols cannot be brought into a troll's dwelling unless the bearer first turns their clothes inside out and walks backwards through the entrance while speaking backwards (so the protective magic thinks the human and symbol are leaving). Trolls' Items: Spindle (reveals magical paths/gateways), Troll dust (adds Magic +2 to a test), Troll food (binds the will of those who eat it, Magic vs Observation), Wand (Magic +2), Troll sack (holds anything, including humans), Troll eye (sacrifice one of its eyes to enter people's dreams and influence them in sleep)."
  },
  {
    name: "Vaettir",
    stats: { might: 5, bodyControl: 7, magic: 8, manipulation: 7, fear: 0 },
    desc: "The vaesen living closest to humans and the easiest to get along with. Live in colonies under stables/fireplaces or in underground passages; the household should warn them before pouring hot water on the ground or moving buildings. As small as rats, dressed in black/gray, resembling toads, mice, or hedgehogs; short names like Toss, Poss, Knoss. Reward kind humans with gold leaves or magic items, but can be vengeful — spreading disease or burning down the farm.",
    powers: ["Enchant", "Curse"],
    combat: "A handful count as one NPC. Knife 2 (range 0); Small animals 1 (0–3, can attack up to four targets with one action, once per encounter); Fire bomb (1, hits everyone in the zone and sets a small part of the body on fire — extra successes raise intensity; dodge to dive out of the zone or into cover).",
    conditions: "Dazed -1; Sad and pleading -2; Wounded and scared -1; Broken — dies if the damage is physical; curses the place it lived or the person who dealt the most damage.",
    weakness: "RITUAL: Vaettir have all the same weaknesses as humans — killed or driven away by any method or weapon that would harm a human. SECRET: Some vaettir turn into small animals when thought to be killed, then seek revenge in animal form (humans have acquired pets that turned out to be vaettir, using the position to help others steal)."
  },
  {
    name: "Werewolf",
    stats: { might: 10, bodyControl: 9, magic: 3, manipulation: 6, fear: "2/1" },
    desc: "A shapeshifter — a human who can turn into a wolf or bear. Three origins: a vaesen/wizard's curse; a baby made a shapeshifter if the mother's childbirth pain was relieved through magic; or someone learned in magic willingly transforming. Strong and bloodthirsty; some transform only at full moon, some when emotional, a few at will, but most can't control their actions in animal form. Can choose to be invisible but many prefer to be seen during the hunt.",
    powers: ["Enchant", "May act twice per round (two initiative cards)", "Fur: Protection 4"],
    combat: "Bite, claws 2 (range 0).",
    conditions: "Bloodthirsty +1; Irritated; On guard +1; Dazed -2; Tactical and evasive +1; Furious but wounded +1; Blood frenzy +3 (if a person is Broken by the frenzy and the Werewolf dies, the Curse passes on and the victim becomes a new shapeshifter — preventable by swallowing silver before the first transformation); Broken — retreats for D6 minutes and heals; if damaged by silver the werewolf dies.",
    weakness: "RITUAL: Three ways — render it Broken with silver weapons (it dies); address it by its true name in the light of a full moon (released from the spell, becomes human); or it breaks its own curse by finding a pregnant woman, tearing out and eating her unborn child in solitude. SECRET: A werewolf can only be killed with silver if the finishing blow hits its neck or its heart."
  },
  {
    name: "Will-o'-the-Wisp",
    stats: { might: "—", bodyControl: "—", magic: 10, manipulation: 8, fear: "1/1" },
    desc: "The spirit of a person who cheated someone out of a piece of property, returned from the dead and doomed to walk the boundary of its stolen land, moving the boundary sticks. A small figure in green or gray carrying a lantern with a strange glow. Some use their light to lead people astray into marshes to drown; others are kind and help people find their way home.",
    powers: ["Enchant", "Magic Lantern: can use the LURE Curse — all who see the lantern's light are affected and, if they fail to resist, can do nothing except follow the lantern", "Drown: use Magic to make a victim of the magic lantern drown themselves"],
    combat: "No physical form; cannot be harmed in combat. Drown 2 (0–3; once affected by the lantern's glow, a PC may resist with Observation vs the vaesen's Magic; on a loss they take two physical Conditions, +1 per extra success).",
    conditions: "No physical form — cannot be harmed in combat.",
    weakness: "RITUAL: The only way to bring it peace is to return the land to its rightful owner. SECRET: Those drowned by the will-o'-the-wisp are reborn as its spectral servants (bright green light, luring people into the marsh, sometimes taking human form at night, spreading false rumors of hidden gold); they can be banished by splashing them with holy water or tricking them into eating/drinking (the food falls through their ghostly bodies and they realize they are dead and cease to exist)."
  },
  {
    name: "Wood Wife",
    stats: { might: 6, bodyControl: 8, magic: 9, manipulation: 9, fear: 1 },
    desc: "The guardian spirit of the forest. Appears as a human woman but can take the form of a tree, rock, or animal, always with something strange (cloven hooves, a tail, greenish glowing skin, a hollow bark-covered back). Often accompanied by animals (wolves, bears, dogs). Capricious: punishes those who harm the forest's animals (victims spellbound or led astray until they go mad, fall ill, or grow old), but can be kind — helping lost children, warning of fires. Seduces people (who then yearn only for the forest). Related guardians: mine guardians, spring nymphs, ship gnomes, lake wives.",
    powers: ["Enchant", "Curse", "Trollcraft", "Can turn into an animal, a plant, or a rock", "Can sense what is happening in the forest"],
    combat: "Claws, bite 2 (range 0, in animal form); Fists 1 (0).",
    conditions: "Angry +2; Afraid; Dazed; Bleeding -1 (transforms into a large animal); Seductive +1; Badly injured -2 (summons animals from the forest); Broken — turns into greenery, re-emerges in the heart of the forest after D6 rounds.",
    weakness: "RITUAL: Sometimes appeased with a gift (food or a valuable coin), then grants hunters permission to kill certain animals; those affected by her magic can break the spell by turning their coat inside out (+2 to resist her magic once); she can be lured with beautiful songs, artworks, or people; killed/banished by burning or cutting down the trees at the heart of the forest (in the correct order, center tree first). SECRET: Turning one's coat inside out only protects against her magic if there is a cross/crucifix in the pocket. The tree in the center must be destroyed first; if the wood wife is killed, the forest dies or turns into barren marshland."
  },];

// Starting equipment options per archetype (parsed from each archetype's
// equipment line; "or" groups split into individual choices).
export const VAE_ARCHETYPE_GEAR: Record<string, string[]> = {
  "Academic": ["Book collection", "Map book", "Writing utensils", "Liquor", "Slide rule"],
  "Doctor": ["Doctor's bag with medical equipment", "Liquor", "Fine wine", "Weak horse", "Strong poison"],
  "Hunter": ["Rifle", "Hunting knife", "Hunting dog", "Hunting trap", "Hunting equipment"],
  "Occultist": ["Crystal ball", "Powdered stag's horn", "Tinder box", "Dagger", "Cooking pot"],
  "Officer": ["Rifle", "Pistol", "Compass", "Bayonet", "Map book", "Saber"],
  "Priest": ["Musical instrument", "Fine wines", "Writing utensils", "Holy water", "Old bible"],
  "Private Detective": ["Magnifying glass", "Lockpicks", "Revolver", "Knuckle duster", "Binoculars"],
  "Servant": ["Revolver", "Hurricane lamp", "Make-up", "Field kitchen", "Simple bandages"],
  "Vagabond": ["Walking stick", "Knife", "Crowbar", "Liquor", "Pet dog"],
  "Writer": ["Writing utensils and paper", "Camera", "Opera glasses", "Pet dog", "Book collection"]
};


export type VaeNpc = { name: string; physique: number; precision: number; logic: number; empathy: number; toughPhys: number; toughMental: number; skills: string };
// Supporting cast (core rulebook pp.166-168). NPCs use Toughness (physical & mental),
// not Conditions: each point of damage is -1 to the matching skill; exceeding Toughness
// = Broken. Minor 1/1 / Named 2/2 / Unique 3/3. Any NPC can be a witch/wizard (give MAGIC + powers).
export const VAE_NPCS: VaeNpc[] = [
  { name: "Soldier", physique: 4, precision: 4, logic: 2, empathy: 2, toughPhys: 2, toughMental: 2, skills: "Ranged Combat 3, Agility 2, Close Combat 2, Vigilance 1" },
  { name: "Police Officer", physique: 3, precision: 3, logic: 3, empathy: 3, toughPhys: 1, toughMental: 2, skills: "Investigation 3, Close Combat 2, Observation 2, Ranged Combat 1" },
  { name: "Doctor", physique: 2, precision: 4, logic: 4, empathy: 2, toughPhys: 1, toughMental: 2, skills: "Medicine 3, Learning 3, Agility 2" },
  { name: "Professor", physique: 2, precision: 3, logic: 4, empathy: 2, toughPhys: 1, toughMental: 2, skills: "Learning 4, Investigation 3, Inspiration 3" },
  { name: "Student", physique: 2, precision: 3, logic: 3, empathy: 3, toughPhys: 1, toughMental: 2, skills: "Stealth 2, Learning 2, Manipulation 2" },
  { name: "Farmer", physique: 4, precision: 2, logic: 2, empathy: 2, toughPhys: 2, toughMental: 1, skills: "Force 3, Agility 2, Learning 1" },
  { name: "Blacksmith", physique: 4, precision: 2, logic: 3, empathy: 2, toughPhys: 2, toughMental: 1, skills: "Agility 2, Force 2, Manipulation 1" },
  { name: "Maid", physique: 2, precision: 2, logic: 3, empathy: 3, toughPhys: 1, toughMental: 1, skills: "Force 2, Stealth 2, Vigilance 1" },
  { name: "Priest", physique: 2, precision: 2, logic: 3, empathy: 4, toughPhys: 1, toughMental: 3, skills: "Inspiration 4, Observation 3, Manipulation 2, Medicine 1" },
  { name: "Coachman", physique: 3, precision: 2, logic: 2, empathy: 3, toughPhys: 2, toughMental: 1, skills: "Agility 3, Close Combat 2, Observation 2" },
  { name: "Valet", physique: 2, precision: 2, logic: 3, empathy: 3, toughPhys: 1, toughMental: 2, skills: "Stealth 2, Learning 2, Vigilance 2, Observation 1" },
  { name: "Hunter", physique: 2, precision: 4, logic: 3, empathy: 2, toughPhys: 2, toughMental: 2, skills: "Stealth 4, Ranged Combat 3, Investigation 2, Vigilance 1" },
  { name: "Urchin", physique: 3, precision: 2, logic: 2, empathy: 3, toughPhys: 1, toughMental: 1, skills: "Agility 3, Stealth 3, Close Combat 1, Manipulation 1" },
  { name: "Dockworker", physique: 4, precision: 2, logic: 2, empathy: 2, toughPhys: 3, toughMental: 1, skills: "Force 4, Close Combat 3" },
  { name: "Merchant", physique: 2, precision: 2, logic: 3, empathy: 3, toughPhys: 1, toughMental: 1, skills: "Manipulation 3, Learning 2, Observation 2" },
  { name: "Seer", physique: 2, precision: 2, logic: 4, empathy: 3, toughPhys: 1, toughMental: 2, skills: "Learning 3, Investigation 2" },
  { name: "Journalist", physique: 2, precision: 2, logic: 3, empathy: 4, toughPhys: 1, toughMental: 2, skills: "Learning 2, Observation 3, Manipulation 2" }
];

export type VaeAnimal = { name: string; might: number; bodyControl: number; toughness: number; damage: number };
// Animals (core rulebook p.168). Attack with MIGHT; use BODY CONTROL to sneak/evade.
export const VAE_ANIMALS: VaeAnimal[] = [
  { name: "Badger", might: 5, bodyControl: 4, toughness: 1, damage: 1 },
  { name: "Bear", might: 8, bodyControl: 6, toughness: 3, damage: 2 },
  { name: "Dog", might: 5, bodyControl: 6, toughness: 1, damage: 1 },
  { name: "Eagle", might: 5, bodyControl: 7, toughness: 1, damage: 1 },
  { name: "Fox", might: 4, bodyControl: 8, toughness: 1, damage: 1 },
  { name: "Moose", might: 7, bodyControl: 4, toughness: 3, damage: 2 },
  { name: "Reindeer", might: 4, bodyControl: 5, toughness: 1, damage: 1 },
  { name: "Wild Boar", might: 5, bodyControl: 6, toughness: 2, damage: 1 },
  { name: "Wolf", might: 6, bodyControl: 7, toughness: 2, damage: 1 },
  { name: "Wolverine", might: 5, bodyControl: 6, toughness: 1, damage: 1 }
];

export type VaeSpell = { name: string; resist?: string; effect: string };
export type VaeMagicItem = { name: string; effect: string; risk: string };
export const VAE_MAGIC = {
  theSight: "The Sight is the ability to see vaesen even when they try to remain invisible to the human eye. A character gains it through some physical or psychological trauma, usually a supernatural event. Player characters all have the Sight and are therefore known as Thursday's Children.",
  pcMagic: "In exceptional circumstances a PC can gain the MAGIC skill — from a spertus or a wand — granting a value plus one or more spells. MAGIC adds no attribute dice, cannot be raised with XP, is a slow action, can be pushed with mental Conditions, and usually needs a ritual or rhyme.",
  families: { enchantments: "Magic that affects a location and the people living there to create atmosphere — fog, rotting food, blood in the well. The creature succeeds automatically with no roll; any affected player character must pass a Fear test (usually Fear 1). Enchantments usually last one scene.", curses: "Magic vaesen use to attack player characters, at a distance or as a weapon in combat. Resolved as an opposed roll of the creature's MAGIC against the PC's listed skill (Observation, Vigilance, or Force); the creature must roll more successes, and extra successes usually inflict Conditions. A slow action; lasts one scene unless stated.", trollcraft: "Magic of trolls and fairies that bends time and space. Used for mood it works like an Enchantment (auto-success, PC makes a Fear test); used to attack a specific PC it works like a Curse (opposed MAGIC vs a resisting skill)." },
  enchantments: [
    { name: "Animal invasion", effect: "The location is overrun by animals." },
    { name: "Animals are born with defects", effect: "Newborn animals in the area are born deformed." },
    { name: "Animals bolt", effect: "Animals panic and flee." },
    { name: "Blindness", effect: "NPCs lose their eyesight." },
    { name: "Christian symbols shatter", effect: "Crosses and other Christian symbols break apart." },
    { name: "Command animal", effect: "The creature commands an animal." },
    { name: "Contact with the great beyond", effect: "Spirits and undead communicate through speech, screams, scents, writing or visions." },
    { name: "Darkness", effect: "Unnatural darkness falls over the location." },
    { name: "Distort vision", effect: "NPCs see something other than what is really there." },
    { name: "Disturbance", effect: "NPCs are haunted by horrifying visions." },
    { name: "Earthquake", effect: "The ground shakes." },
    { name: "Enchanted sleep", effect: "Afflicts NPCs in the location with magical sleep." },
    { name: "Enthrall", effect: "NPCs become mind-controlled and may attack the player characters." },
    { name: "Fog", effect: "Thick fog enshrouds the area." },
    { name: "Food or beverage is transformed or rots", effect: "Food and drink is transformed or spoils." },
    { name: "Mareel", effect: "Phosphorescence appears on water." },
    { name: "Muteness", effect: "NPCs lose their ability to speak." },
    { name: "Nightmares", effect: "One or several player characters are plagued by nightmares." },
    { name: "Plant invasion", effect: "The location is overrun by plants." },
    { name: "Plants die", effect: "Plant life withers and dies." },
    { name: "Raise the dead", effect: "The dead are brought back." },
    { name: "Shape stone or wood", effect: "Stone or wood is reshaped." },
    { name: "Spread disease", effect: "Disease spreads through the location." },
    { name: "Storm", effect: "A storm is conjured." },
    { name: "Terrible signs", effect: "Dreadful omens and portents appear." },
    { name: "The drinking water is filled with tadpoles", effect: "The water teems with tadpoles and NPCs belch up frogs." },
    { name: "The ground turns marshy", effect: "The ground becomes soft and boggy." }
  ] as VaeSpell[],
  curses: [
    { name: "Deadly Cold", resist: "Force", effect: "Struck by extreme cold, suffering one physical Condition. Extra successes deal more." },
    { name: "Enthrall", resist: "Observation", effect: "The creature controls the PC's actions (but can't make them hurt themself) for the scene. Extra successes cause mental Conditions." },
    { name: "Fear", resist: "Fear test", effect: "Tormented by dreadful visions; the creature's successes set the Fear value." },
    { name: "Feast", resist: "Vigilance", effect: "Seized by an urge to party and indulge. Affects all PCs; extra successes cause mental Conditions." },
    { name: "Fire", resist: "Force", effect: "The PC catches fire. Extra successes increase the fire's intensity by one step." },
    { name: "Infect", resist: "Force", effect: "Contracts a terrible disease (one physical Condition; more on extra successes). Cured with Medicine; may require hair/skin or banishing." },
    { name: "Lame", resist: "Force", effect: "Unable to walk. Extra successes cause physical Conditions." },
    { name: "Lure", resist: "Vigilance", effect: "Compelled to reach the creature, breaking through obstacles. Extra successes cause mental Conditions." },
    { name: "Mute", resist: "Force", effect: "Unable to speak. Extra successes cause physical Conditions." },
    { name: "Night Terror", resist: "Observation", effect: "Severe nightmares; can't be woken this scene; one mental Condition (more on extra successes). Sleeping PCs only." },
    { name: "Seduce", resist: "Observation", effect: "Attracted to the creature. Extra successes cause mental Conditions." },
    { name: "Self-Loathing", resist: "Observation", effect: "Hates or is disgusted by themself. Extra successes cause mental Conditions." },
    { name: "Sleep", resist: "Force", effect: "Falls asleep and can't be woken. Needs a planted item in the bedroom; removing it wakes the PC." },
    { name: "Stranger", resist: "Observation", effect: "Others dislike the PC and want to drive them away. Requires an item belonging to the PC; retrieving it lifts it." },
    { name: "Twist Vision", resist: "Vigilance", effect: "Reality warps — villagers seem monsters, friends seem replaced. Extra successes cause mental Conditions." },
    { name: "Wound", resist: "Force", effect: "A wound opens, causing a physical Condition. Extra successes cause more." }
  ] as VaeSpell[],
  trollcraft: [
    { name: "Alter Age", resist: "Force", effect: "People grow older or younger. Extra successes cause mental Conditions; may be permanent." },
    { name: "Animal Parts", resist: "Force", effect: "A body part becomes an animal's (donkey ears, pig tail). Extra successes escalate it." },
    { name: "Animate the Inanimate", resist: "Fear test", effect: "Something not alive comes to life and is controlled by the creature; fights using an animal's stats by shape/size." },
    { name: "Dance", resist: "Observation", effect: "Forced to dance until the music stops. Extra successes cause mental Conditions." },
    { name: "Enlarge", resist: "Force", effect: "The victim grows to the size of a cottage or giant. Each extra success adds a scene." },
    { name: "Mix Thoughts", resist: "Vigilance", effect: "Thoughts jumbled; each PC passes a Fear 1 test. Extra successes cause mental Conditions." },
    { name: "Obstruct", resist: "Force", effect: "Cannot pass a point or move a direction. Each extra success adds a scene." },
    { name: "Passion", resist: "Observation", effect: "Falls fiercely in love with another. Each extra success adds a scene." },
    { name: "Shrink", resist: "Force", effect: "Shrinks to insect size. Each extra success adds a scene." },
    { name: "Stop Time", resist: "Observation", effect: "Time stands still or loops; the creature must be killed/banished or made to undo it. Against a PC, frozen but immune to harm." },
    { name: "Teleport", resist: "Force", effect: "Someone is sent elsewhere. Extra successes cause mental Conditions." },
    { name: "Thought Virus", resist: "Observation", effect: "A false belief spreads as if true. Lasts the mystery or until the creature dies. Affects all PCs." },
    { name: "Transform Into Animals", resist: "Force", effect: "Victims turn into animals but keep their minds." }
  ] as VaeSpell[],
  itemsOfPower: [
    { name: "Fairy cross", effect: "+2 defense against Trollcraft. An amulet of nine kinds of silver, forged on three consecutive Thursday nights." },
    { name: "Silver bullets", effect: "Can kill certain vaesen. Ammunition made of silver." },
    { name: "Bible", effect: "Add Inspiration to your attribute when making a Fear test." },
    { name: "Holy water", effect: "Use Inspiration against MAGIC to temporarily drive off undead." },
    { name: "Troll cross", effect: "+2 to resist Curses from trolls. An arc-shaped pendant." },
    { name: "Scythe", effect: "+2 to resist Curses from mares. Hung above the bedroom door." },
    { name: "Elf mill", effect: "+2 to resist Trollcraft from fairies when near the elf mill (cup marks in rock, smeared with grease)." }
  ] as VaeSpell[],
  magicItems: [
    { name: "Seaweed bladder", effect: "Breathe underwater.", risk: "Water seeps in: one physical Condition per ten minutes underwater." },
    { name: "The fiddle of the Neck", effect: "Inspiration +5 when luring a crowd.", risk: "Cannot stop playing; one mental Condition per hour until Broken or disarmed." },
    { name: "Powdered stag's horn", effect: "Use Observation to resist the temptations of vaesen.", risk: "Feels unloved; one mental Condition per hour until someone succeeds with Inspiration." },
    { name: "Snake skin from a wood wife", effect: "Turn into a snake.", risk: "The transformation lasts one day." },
    { name: "Spindle", effect: "Discover magical gateways.", risk: "Transports the PC to a magical place." },
    { name: "Track sand", effect: "Vigilance +3 when tracking vaesen.", risk: "A strange vaesen notices and starts following the PC." },
    { name: "Nisse's porridge", effect: "Force +3 to a skill test.", risk: "The PC angers the nisse." },
    { name: "Troll's eye", effect: "Use Observation through dreams to get a clue.", risk: "A vaesen visits the PC's dreams." },
    { name: "Wand", effect: "Cast Enchantments, Curses or Trollcraft; grants MAGIC 8.", risk: "The wand breaks and the magic affects the PC." },
    { name: "Fairy square", effect: "Pass through locked doors.", risk: "The PC ends up somewhere else." }
  ] as VaeMagicItem[]
};

// Items of Power / Magic Items / Living Standards (exported for the Gear page).
export type VaeResourceTier = { level: number; name: string; bonus: number; capital: number };
export const VAE_RESOURCES: VaeResourceTier[] = [
  {"level":1,"name":"Destitute","bonus":-1,"capital":0},
  {"level":2,"name":"Poor","bonus":0,"capital":0},
  {"level":3,"name":"Struggling","bonus":0,"capital":1},
  {"level":4,"name":"Financially Stable","bonus":1,"capital":2},
  {"level":5,"name":"Middle-Class","bonus":1,"capital":3},
  {"level":6,"name":"Well-Off","bonus":2,"capital":5},
  {"level":7,"name":"Wealthy","bonus":3,"capital":8},
  {"level":8,"name":"Filthy Rich","bonus":5,"capital":12}
];

// Memento table (Core Rulebook p.23, D66).
export const VAE_MEMENTOS: string[] = [
  "Dried red rose","Photo of someone close to you","Seal ring with a secret chamber","Your father's cane","Hat with a secret compartment","Book in a foreign language",
  "Hip flask with inscription","Old love letter","A scruffy cat","A monkey's skull","Bloodstained promissory note","Gold jewelry worn by your mother",
  "Silver cross on a chain","Beautiful fiddle passed down in the family","Journal (yours or someone else's)","Newspaper from a date that means something to you","Ragged doll","Tame pigeon",
  "Well-thumbed novel with dedication","Plans for a family tomb","Map with notes in the margin","Strange animal preserved in a glass jar","Music box from your childhood","Sunstone (cut mineral)",
  "Small bottle of perfume that reminds you of someone","Hymnbook passed down in the family","Pocket watch with a photo inside","An unsigned will","Golden box from a foreign land","Sheet music from a forgotten master",
  "Powder compact with sleeping pills","Beautifully ornamented pipe","Rabbit's foot or some other lucky charm","Syringe with needle in a box","Worn dice made of bone","A manuscript passed down in the family"
];
