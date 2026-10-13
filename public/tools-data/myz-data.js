// AUTO-GENERATED twin of lib/data/myz-data.ts — keep the two in sync.
// MUTANT: YEAR ZERO (Free League / Modiphius) — the original Year Zero Engine game.
// Sourced from the Mutant: Year Zero Core Rulebook. Shares the YZE chassis with
// ALIEN/TWD (four attributes, D6 dice pools, push-at-a-cost, D66 critical injuries)
// but differs sharply: the FOUR ATTRIBUTES ARE the health pool (Damage→Strength,
// Fatigue→Agility, Confusion→Wits, Doubt→Empathy; Broken at 0), there is NO
// stress/panic — pushing deals attribute trauma and earns Mutation Points (MP) —
// and the signature layers are Mutations (fuelled by MP, with a misfire table),
// the Rot (radiation) track, and the Ark's four Development Levels.

var MYZ_ATTRIBUTES = [
  { key: "STR", name: "Strength",  desc: "Raw physical power and endurance. Decreased by Damage (trauma), recovered by grub." },
  { key: "AGI", name: "Agility",   desc: "Overall body control and motor skills. Decreased by Fatigue, recovered by water." },
  { key: "WIT", name: "Wits",      desc: "Intelligence, alertness and sharpness of mind. Decreased by Confusion, recovered by sleep." },
  { key: "EMP", name: "Empathy",   desc: "Charisma and the ability to read and affect others. Decreased by Doubt, recovered by sympathy." },
];

var MYZ_SKILLS = [
  { name: "Endure",        attr: "STR", desc: "Withstand physical hardship, pain, exhaustion and encumbrance." },
  { name: "Force",         attr: "STR", desc: "Apply brute strength to break, lift, bend or push things." },
  { name: "Fight",         attr: "STR", desc: "Attack and defend in close (hand-to-hand) combat." },
  { name: "Sneak",         attr: "AGI", desc: "Move silently and stay hidden from enemies." },
  { name: "Move",          attr: "AGI", desc: "Run, climb, jump and dodge your way out of danger." },
  { name: "Shoot",         attr: "AGI", desc: "Attack with ranged weapons (bows, firearms, thrown)." },
  { name: "Scout",         attr: "WIT", desc: "Observe and spot danger, people and things at a distance." },
  { name: "Comprehend",    attr: "WIT", desc: "Understand the artifacts and lore of the Old Age." },
  { name: "Know the Zone", attr: "WIT", desc: "Survive in the Zone: find safe paths, food, water, shelter." },
  { name: "Sense Emotion", attr: "EMP", desc: "Read another person's feelings and true intentions." },
  { name: "Manipulate",    attr: "EMP", desc: "Persuade, trick or threaten others into doing what you want." },
  { name: "Heal",          attr: "EMP", desc: "Save a Broken comrade from death and tend wounds." },
];

var MYZ_ROLES = [
  { name: "Enforcer",    key: "STR", specialist: "Intimidate",   talents: ["Barge Through","Mean Streak","Sucker Punch"] },
  { name: "Gearhead",    key: "WIT", specialist: "Jury-Rig",     talents: ["Inventor","Motorhead","Tinkerer"] },
  { name: "Stalker",     key: "AGI", specialist: "Find the Path",talents: ["Scavenger","Monster Hunter","Rot Finder"] },
  { name: "Fixer",       key: "EMP", specialist: "Make a Deal",  talents: ["Wheeler Dealer","Vicious Creep","Juicy Info"] },
  { name: "Dog Handler", key: "AGI", specialist: "Sic a Dog",    talents: ["Bloodhound","Fight Dog","Mutant's Best Friend"] },
  { name: "Chronicler",  key: "EMP", specialist: "Inspire",      talents: ["Bonesaw","Agitator","Performer"] },
  { name: "Boss",        key: "WIT", specialist: "Command",      talents: ["Commander","Gunslingers","Racketeer"] },
  { name: "Grunt",       key: "STR", specialist: "Shake it Off", talents: ["Cynic","Rebel","Resilient"] },
];

var MYZ_TALENTS = [
  // --- ENFORCER ---
  { name: "Barge Through",  role: "Enforcer", desc: "You can Move using Strength instead of Agility." },
  { name: "Mean Streak",    role: "Enforcer", desc: "When you Intimidate someone and give your victim doubt, he suffers one extra point of it." },
  { name: "Sucker Punch",   role: "Enforcer", desc: "The weapon damage of your unarmed attacks is 2 instead of 1." },
  // --- GEARHEAD ---
  { name: "Inventor",   role: "Gearhead", desc: "+2 modification when you use Jury-Rig to create a new device (but not to repair something)." },
  { name: "Motorhead",  role: "Gearhead", desc: "+1 modification when you use a vehicle to ram (Fight) or escape a conflict (Move); +1 when you Jury-Rig to repair or modify a vehicle." },
  { name: "Tinkerer",   role: "Gearhead", desc: "+2 modification when you Jury-Rig to repair a piece of gear (but not to build something new)." },
  // --- STALKER ---
  { name: "Monster Hunter", role: "Stalker", desc: "+2 modification when you Scout a beast of any kind." },
  { name: "Rot Finder",     role: "Stalker", desc: "On Find a Path, a new stunt lets you find the most Rot-free route; the Rot level counts as one step lower during this visit to the sector." },
  { name: "Scavenger",      role: "Stalker", desc: "+2 modification to Find a Path; on success you find any artifacts that exist in a sector (to identify threats you must instead take stunts)." },
  // --- FIXER ---
  { name: "Juicy Info",     role: "Fixer", desc: "Choose one important NPC on whom you hold incriminating information (nature decided with the GM)." },
  { name: "Vicious Creep",  role: "Fixer", desc: "When you Manipulate someone and give him doubt, he suffers one extra point of it." },
  { name: "Wheeler Dealer", role: "Fixer", desc: "When you use Make a Deal for side business (Deals on the Side), you earn twice as much of the commodity you choose." },
  // --- DOG HANDLER ---
  { name: "Bloodhound",         role: "Dog Handler", desc: "+2 modification when you use your dog to follow a track (if the dog dies you keep the talent for your next hound)." },
  { name: "Fight Dog",          role: "Dog Handler", desc: "+2 modification when you use the dog to Fight." },
  { name: "Mutant's Best Friend", role: "Dog Handler", desc: "Your dog can Endure and Move for you (using Sic a Dog skill level and the dog's Strength/Agility); you can push these rolls but gain no Mutation Points." },
  // --- CHRONICLER ---
  { name: "Agitator",  role: "Chronicler", desc: "+2 modification when you Inspire someone to Fight or Shoot." },
  { name: "Bonesaw",   role: "Chronicler", desc: "+2 modification when you roll to Heal a critical injury (but not when tending someone broken by trauma)." },
  { name: "Performer", role: "Chronicler", desc: "Once per session in the Ark you can perform for the People; every success gives D6 bullets or rations of grub. A failed roll means someone doesn't appreciate your art." },
  // --- BOSS ---
  { name: "Commander",   role: "Boss", desc: "+2 modification when you order your gang to fight for you (not for other situations or racketeering)." },
  { name: "Gunslingers", role: "Boss", desc: "The members of your gang all have scrap guns (pistols or rifles); in the Ark they have enough bullets, in the Zone you must supply them." },
  { name: "Racketeer",   role: "Boss", desc: "+2 modification when you use the Command skill for racketeering in the Ark (not other uses)." },
  // --- GRUNT ---
  { name: "Cynic",     role: "Grunt", desc: "+2 modification to Shake it Off, but only when suffering doubt." },
  { name: "Rebel",     role: "Grunt", desc: "When rolling Shake it Off, every success gives +1 modification to your next action (used at the earliest opportunity)." },
  { name: "Resilient", role: "Grunt", desc: "+2 modification to Shake it Off, but only when suffering damage." },
  // --- GENERAL TALENTS ---
  { name: "Admirer",          role: "General", desc: "One NPC is very impressed by you and will do anything to help or be near you (created with the GM)." },
  { name: "Archeologist",     role: "General", desc: "+2 modification when trying to Comprehend a ruined building or installation from the Old Age." },
  { name: "Assassin",         role: "General", desc: "When you Shoot and hit, the target suffers one extra point of damage — but only at Near range or Arm's Length." },
  { name: "Bad Omens",        role: "General", desc: "You can Scout using Empathy instead of Wits." },
  { name: "Bodyguard",        role: "General", desc: "If someone Shoots and hits a person at Arm's Length or Near you, you can dive in to take the bullet (roll Move; doesn't cost an action; you can push the roll)." },
  { name: "Butcher",          role: "General", desc: "When you kill a monster in the Zone you extract rations of grub equal to the creature's original Strength (doesn't work on swarms; meat is usually Rot-contaminated)." },
  { name: "Combat Veteran",   role: "General", desc: "Roll two dice for initiative and choose the highest; can also spend a maneuver to raise initiative by +2 during combat (repeatable)." },
  { name: "Cool Head",        role: "General", desc: "You can Move with Wits instead of Agility." },
  { name: "Counselor",        role: "General", desc: "When you help someone he gets an extra +1 modification — but only if doing something you told him to do." },
  { name: "Coward",           role: "General", desc: "If someone Shoots at you and hits, you can take cover behind a friend at Arm's Length or Near (roll Move; doesn't cost an action; on success the shot hits your friend instead)." },
  { name: "Fast Draw",        role: "General", desc: "You can draw your weapon so fast it doesn't cost you a maneuver." },
  { name: "Flyweight",        role: "General", desc: "When you defend yourself in close combat you can use Agility instead of Strength." },
  { name: "Gadgeteer",        role: "General", desc: "+2 modification when you try to Comprehend an artifact from the Old Age." },
  { name: "Good Footwork",    role: "General", desc: "+2 modification when you defend in close combat." },
  { name: "Hard Hitter",      role: "General", desc: "+2 modification to Fight if you sacrifice your maneuver in the turn (can't be used for parrying)." },
  { name: "Workhorse",        role: "General", desc: "+2 modification when you work on a project in the Ark." },
  { name: "Jack of All Trades", role: "General", desc: "Adopt a new role and immediately gain skill level 1 in that role's specialist skill (keep old specialist level but can't improve it). Requires having learned at least three other talents first." },
  { name: "Light Eater",      role: "General", desc: "You need only eat one ration of grub every other day to avoid losing Strength." },
  { name: "Loner",            role: "General", desc: "You can recover lost Empathy without the company of others — all you need is to be by yourself for a few hours." },
  { name: "Never Surrender",  role: "General", desc: "When broken by damage (Strength 0) you can get back up immediately without Healing; roll Endure (no Base Dice), every success keeps one point of Strength; can't push. No effect against critical injuries." },
  { name: "Pack Mule",        role: "General", desc: "You can carry twice as many objects as normal without being encumbered." },
  { name: "Personal Arithmetic", role: "General", desc: "You can Sense Emotion with Wits instead of Empathy." },
  { name: "Sharpshooter",     role: "General", desc: "When you Shoot and hit, target suffers one extra point of damage — but only at Long or Distant range." },
  { name: "Sleepless",        role: "General", desc: "You can recover lost Wits by means other than sleeping: Jury-Rig a device, enter an unexplored sector, or Comprehend an artifact." },
  { name: "Stoic",            role: "General", desc: "You can Endure using Wits instead of Strength." },
  { name: "Therapist",        role: "General", desc: "+2 modification when you Heal someone who is broken by doubt." },
  { name: "Weapon Specialist",role: "General", desc: "Expert with one chosen weapon type (from weapon lists or an artifact): +1 modification when you use it; can be taken multiple times, once per weapon type." },
  { name: "Zone Cook",        role: "General", desc: "Roll Know the Zone to purge Rot from contaminated food/water; every success purifies D6 rations of grub or water." },
];

var MYZ_MUTATIONS = [
  { roll: 11, name: "Acid Spit",       desc: "Spit acid at a target up to Near range (1 MP: 1 damage immediately +1 each turn until victim rolls Move; armor works against it); melt a rope/bar/small object (1 MP); open a simple lock (1 MP)." },
  { roll: 12, name: "Amphibian",       desc: "Breathe underwater a few minutes and swim like a fish (1 MP); absorb damage with slippery scales (R, every MP eliminates 1 damage); bite with sharp teeth at Arm's Length for damage equal to MP spent." },
  { roll: 13, name: "Corpse-Eater",    desc: "Eat raw/rotting meat with no Rot Points (small game = 1 grub ration, bigger creatures/humanoids = 2); bite a victim at Arm's Length for damage equal to MP spent." },
  { roll: 14, name: "Extreme Reflexes",desc: "+2 initiative per MP (before rolling initiative; can raise mid-combat for a maneuver); Fight or Shoot a second time in the same turn, 1 MP, no extra maneuver (E); dodge a Fight/Shoot attack, every MP reduces damage by 1 (R)." },
  { roll: 15, name: "Flame Breather",  desc: "Spew flammable gas and ignite it: set fire to a flammable object (1 MP); spew fire at an enemy up to Near for damage equal to MP spent; breathe fire at a number of enemies equal to MP spent (each takes 1 damage)." },
  { roll: 16, name: "Four-Armed",      desc: "Fight twice in a row same turn (1 MP + your maneuver, E); defend vs several close-combat attacks same turn (each defense after the first costs 1 MP, E); climb with ease (1 MP instead of a Move roll)." },
  { roll: 21, name: "Frog Legs",       desc: "Jump ~30' horizontally / 15' vertically (1 MP); leap on an enemy up to Short range and immediately Fight same turn (1 MP + maneuver, E); jump to safety to escape a conflict (1 MP instead of Move)." },
  { roll: 22, name: "Human Magnet",    desc: "Push/attract metal objects (up to your weight) within Short range (1 MP); throw metal objects up to Short for damage equal to MP spent; shield vs bullets/metal weapons, every MP reduces damage by 1 (R)." },
  { roll: 23, name: "Human Plant",     desc: "Get nourishment from sunlight (1 MP instead of a grub ration, outdoors only); bark thorns in close combat for 1 damage per MP spent; bark-like skin absorbs external damage, every MP reduces by 1 (R)." },
  { roll: 24, name: "Insectoid",       desc: "Hardened skin reduces external damage, every MP reduces by 1 (R); climb a completely vertical surface for a few minutes (1 MP); quickly heal light wounds — every MP heals 1 damage, even if broken, but cannot heal critical injuries." },
  { roll: 25, name: "Insect Wings",    desc: "Fly up to 100' then must land (1 MP); fly to an enemy up to Short and immediately Fight same turn (1 MP + maneuver, E); buzzing noise inflicts 1 doubt each on persons equal to MP spent." },
  { roll: 26, name: "Luminescence",    desc: "Burst of light at target up to Near (every MP blinds victim 1 turn, total-darkness penalties); light an area up to Short for a few minutes (1 MP); bend light to obscure yourself and escape a conflict without a Move roll." },
  { roll: 31, name: "Manbeast",        desc: "Attack enemies at Arm's Length with fangs/claws for total damage equal to MP spent; bestial roar, 1 enemy per MP up to Near suffers 1 doubt; never give up — when broken by damage/fatigue, get up and recover trauma equal to MP spent (critical injuries remain)." },
  { roll: 32, name: "Mind Terror",     desc: "Torment a victim up to Near range with hallucinations inflicting confusion or doubt (your choice) equal to MP spent; confuse others to miss their next action (1 MP per victim, humanoids only); create a grand illusion (2 MP)." },
  { roll: 33, name: "Puppeteer",       desc: "Take control of a humanoid up to Near and decide its next action (1 MP, must look it in the eyes; victim rolls normally, forcing a mutation costs extra MP; forcing self-harm = weapon damage +1 per MP)." },
  { roll: 34, name: "Parasite",        desc: "Steal 1 point of any attribute per MP from a victim at Arm's Length (can't exceed your max; no effect on permanent trauma); steal a mutation (1 MP, one turn); heal another's trauma (1 MP/point, inflicting same on yourself; non-lethal crit 2 MP, lethal 4 MP, no self-damage)." },
  { roll: 35, name: "Pathokinesis",    desc: "Affect others' emotions up to Near: instill fear/anxiety (1 doubt per MP); heal 1 doubt per MP (touch; can heal own doubt); affect a group's general mood (1 MP, roleplayed, lasts minutes)." },
  { roll: 36, name: "Pyrokinesis",     desc: "Set a flammable inanimate object on fire (1 MP); make a living being burst into flame up to Near, 1 damage per MP (armor has no effect); melt ice / negate severe cold for one hour (1 MP)." },
  { roll: 41, name: "Reptilian",       desc: "Chameleon skin: auto-succeed a Sneak roll and attacks against you performed as total darkness (mostly naked, 1 MP, lasts minutes); squeeze through a narrow hole (1 MP); entrance a humanoid up to Near, 1 confusion per MP." },
  { roll: 42, name: "Rot-Eater",       desc: "Totally insensitive to the effects of the Rot — you still take Rot Points normally, but you can spend 1 MP to eliminate 1 trauma from the Rot (R); spend 1 MP to use one Rot Point to recover 1 attribute point (not permanent Rot); emit concentrated Rot at Arm's Length, 1 damage per MP (each also consumes 1 Rot Point)." },
  { roll: 43, name: "Sonar",           desc: "Sense surroundings / see in total darkness for a few minutes (1 MP); stun enemies up to Short, 1 fatigue each per MP; disrupt a Shooting enemy up to Short, every MP eliminates one success he rolled (R)." },
  { roll: 44, name: "Spores",          desc: "Spray spore clouds up to Near: sting eyes (1 fatigue per MP); horrible stink causing nausea (1 damage per MP, armor has no effect); obscure you to escape a conflict without a Move roll (1 MP)." },
  { roll: 45, name: "Sprinter",        desc: "Double your movement speed for one turn (every movement maneuver counts as two, 1 MP, E); escape a conflict without a Move roll (1 MP)." },
  { roll: 46, name: "Telepathy",       desc: "Read a humanoid mind up to Near (1 MP per question: lying? hiding something? thinking now?); plant a simple thought he believes true (1 MP); mental short-circuit inflicting 1 confusion per MP." },
  { roll: 51, name: "Tracker",         desc: "Follow a person/monster trail like a bloodhound (1 MP/day); sense an enemy Sneaking on you, every MP knocks out one of his successes (1 MP); smell out grub in the Zone (1 MP for D6 rations of Rot-contaminated grub)." },
  // 52-66 = Re-roll
];

var MYZ_MELEE_WEAPONS = [
  { name: "Unarmed",         bonus: 0,  damage: 1, range: "Arm's Length", slots: 0, comment: "Bare hands." },
  { name: "Blunt Instrument",bonus: 1,  damage: 1, range: "Arm's Length", slots: 1, comment: "" },
  { name: "Bicycle Chain",   bonus: 1,  damage: 1, range: "Near",         slots: 1, comment: "" },
  { name: "Brass Knuckles",  bonus: 1,  damage: 1, range: "Arm's Length", slots: 0.5, comment: "Jury-Rigged. Light weapon." },
  { name: "Scrap Knife",     bonus: 1,  damage: 2, range: "Arm's Length", slots: 0.5, comment: "Jury-Rigged. Light weapon." },
  { name: "Baseball Bat",    bonus: 2,  damage: 1, range: "Arm's Length", slots: 1, comment: "Can be found in the Zone." },
  { name: "Bat with Spikes", bonus: 2,  damage: 2, range: "Arm's Length", slots: 1, comment: "Jury-Rigged." },
  { name: "Machete",         bonus: 2,  damage: 2, range: "Arm's Length", slots: 1, comment: "Jury-Rigged." },
  { name: "Scrap Spear",     bonus: 1,  damage: 2, range: "Near",         slots: 1, comment: "Jury-Rigged." },
  { name: "Scrap Axe",       bonus: 1,  damage: 3, range: "Arm's Length", slots: 2, comment: "Jury-Rigged. Heavy weapon." },
];

var MYZ_RANGED_WEAPONS = [
  { name: "Thrown Rock",    bonus: 0, damage: 1, range: "Short", slots: 1, comment: "" },
  { name: "Slingshot",      bonus: 1, damage: 1, range: "Short", slots: 1, comment: "Jury-Rigged." },
  { name: "Bow",            bonus: 1, damage: 1, range: "Long",  slots: 1, comment: "Jury-Rigged." },
  { name: "Scrap Pistol",   bonus: 1, damage: 2, range: "Short", slots: 1, comment: "Jury-Rigged." },
  { name: "Scrap Derringer",bonus: 1, damage: 1, range: "Near",  slots: 0.5, comment: "Jury-Rigged. Light weapon." },
  { name: "Scrap Rifle",    bonus: 1, damage: 2, range: "Long",  slots: 1, comment: "Jury-Rigged." },
  { name: "Flamethrower",   bonus: 1, damage: 2, range: "Near",  slots: 2, comment: "Jury-Rigged. Heavy weapon. Uses 1 dose of booze/attack; target burns +1 damage/turn until a Move roll." },
  { name: "Scrap Cannon",   bonus: 1, damage: 4, range: "Long",  slots: 99, comment: "Jury-Rigged. Heavy weapon, can't be carried. Each shot needs an explosive charge (Blast Power 6+)." },
];

var MYZ_ARMOR = [
  { name: "Scrap Armor",            rating: 3, comment: "Jury-Rigged by a Gearhead. Only protects vs Damage, not other trauma/dehydration/hypothermia/pushing. Can be repaired." },
  { name: "Old-Age Body Armor",     rating: "varies", comment: "Functional armor found in the Zone (artifact); rating per item." },
  { name: "Shield (road sign etc.)",rating: 3, comment: "Made from scrap; works like armor. Can be worn together WITH armor — roll shield first, then armor." },
  { name: "Rot Suit",               rating: 3, comment: "Protection Rating 3 against the Rot (p126)." },
];

var MYZ_COVER = [
  { name: "Shrubbery",   rating: 2 }, { name: "Furniture", rating: 3 },
  { name: "Wooden Door", rating: 4 }, { name: "Car Door",  rating: 5 },
  { name: "Brick Wall",  rating: 6 }, { name: "Sand Bag",  rating: 7 },
];

var MYZ_GEAR = [
  { name: "Grub (food ration)",  slots: "4 rations = 1 regular item", comment: "You must eat 1 ration/day or become Starving. Recovers Strength. Often Rot-contaminated." },
  { name: "Water (ration)",      slots: "4 rations = 1 regular item", comment: "You must drink 1 ration/day or become Dehydrated. Recovers Agility (and is the recovery resource for fatigue)." },
  { name: "Bullets",             slots: "tiny; >10 = light, >20 = regular, >40 = heavy", comment: "The de facto currency of the Ark (there is no money). Also used as ammunition. Individual bullets are tiny items." },
  { name: "Booze",               slots: "1 bottle (10 doses) = 1 regular item", comment: "1 dose recovers 1 damage + 1 doubt but causes 1 confusion; recovery is temporary (trauma returns after D6 hours). Also fuels vehicles/flamethrower/generator." },
  { name: "Scrap Armor",         slots: "1 regular item", comment: "Armor Rating 3 (see Armor). Jury-Rigged." },
  { name: "Rot Suit / Gas Mask / Protective Suit / Umbrella", slots: "varies", comment: "Protection Rating vs the Rot (3, or 6 for Protective Suit). Gas Mask is a light item." },
  { name: "Grub/Water from the Zone", slots: "—", comment: "Found or hunted; often carries Rot. Purify with the Zone Cook talent (Know the Zone)." },
];

var MYZ_ARTIFACTS = [
  { roll: "111-114", name: "Air Mattress",      desc: "Sleeping on it for 1 hour recovers ALL lost Wits. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "115-122", name: "Antidepressants",   desc: "Eating these heals all doubt; only D6 doses, then discard. Tiny item. DEV Req: Technology 20." },
  { roll: "123-126", name: "Assault Rifle",     desc: "Gear Bonus +3 Shoot, weapon damage 2, Long range, clip (no reload each shot), full automatic fire. DEV Req: Technology 20. DEV Bonus: Technology +D6, Warfare +D6." },
  { roll: "131-134", name: "Automobile",        desc: "Rust-ridden car; Jury-Rig to run (gasoline or booze, 1 dose/sector). Carries 5, cuts sector-exploration time in half, can ram/escape. Gear Bonus +3, Armor 3, Resilience 1. DEV Req: Technology 20. DEV Bonus: Technology +D6." },
  { roll: "135-142", name: "Battery",           desc: "Powers other artifacts/Generator needing electricity; rechargeable. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "143-146", name: "Bicycle",           desc: "Carries 1 mutant, increases combat move, halves sector-exploration time, can escape threats. Gear Bonus +2, Resilience 1. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "151-154", name: "Binoculars",        desc: "Gear Bonus +3 to Scout and Find the Path. Light item. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "155-162", name: "Bow & Arrow",       desc: "Gear Bonus +2 Shoot, weapon damage 1, Long range, needs arrows. DEV Bonus: Technology +1, Warfare +1." },
  { roll: "163-166", name: "Canoe",             desc: "Carries 4 over water, explores coastal sectors, escapes on water; +2 Gear Bonus to Move in such situations. Resilience 1. DEV Bonus: Technology +1." },
  { roll: "211-214", name: "Cassette Player (Metaplot)", desc: "Needs a Battery/Generator; plays music from the Old Age and receives radio signals. DEV Req: Technology 20. DEV Bonus: Technology +D6, Culture +D6. Helps find Eden (Ch 16)." },
  { roll: "215-222", name: "Chainsaw",          desc: "Melee weapon: Gear Bonus +2, weapon damage 3; starting the engine takes a full turn + a dose of gasoline/booze. Heavy item. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "223-226", name: "Comic Book",        desc: "No effect. Tiny item. DEV Bonus: Culture +D6." },
  { roll: "231-234", name: "Compass",           desc: "Gear Bonus +2 to Find the Path. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "235-242", name: "Crossbow",          desc: "Gear Bonus +3 Shoot, weapon damage 1, Long range, uses arrows not bullets (silent). DEV Req: Technology 5. DEV Bonus: Technology +1, Warfare +1." },
  { roll: "243-246", name: "Diary",             desc: "Connects to the metaplot (Ch 16). DEV Req: Culture 20. DEV Bonus: Culture +D6." },
  { roll: "251-254", name: "Diving Gear",       desc: "Heavy item. Gear Bonus +3 to Move underwater; protects vs gases, Protection Rating 3 vs the Rot. DEV Req: Technology 20. DEV Bonus: Technology +D6." },
  { roll: "255-262", name: "Dress",             desc: "Gear Bonus +2 Manipulate; doesn't count as an item when worn. DEV Req: Culture 10. DEV Bonus: Culture +D6." },
  { roll: "263-266", name: "Energy Pills",      desc: "Eating heals all fatigue; only D6 doses, then discard. Tiny item. DEV Req: Technology 20." },
  { roll: "311-314", name: "Flashlight",        desc: "Needs a Battery; disperses darkness up to Short range, allowing Shoot and Scout. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "315-322", name: "Flare Gun",         desc: "Fires a signal flare; also a weapon — Gear Bonus +2, weapon damage 2, Short range. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "323-326", name: "Gas Mask",          desc: "Light item. Protects vs gases; Protection Rating 3 vs the Rot. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "331-334", name: "Generator",         desc: "Heavy item. Needs 1 dose of booze/day; powers other artifacts or projects. DEV Req: Technology 20. DEV Bonus: Technology +D6." },
  { roll: "335-342", name: "Guitar",            desc: "If you learn to play: Gear Bonus +3 Manipulate, but only when there's a chance to play. DEV Req: Culture 20. DEV Bonus: Culture +D6." },
  { roll: "343-346", name: "Hand Grenade",      desc: "Thrown via Shoot (no Gear Bonus), Short range; explosion Blast Power 9, weapon damage 2. DEV Req: Technology 20. DEV Bonus: Technology +D6, Warfare +D6." },
  { roll: "351-354", name: "Hockey Helmet",     desc: "Protection Rating 3 against damage. DEV Bonus: Technology +1." },
  { roll: "355-362", name: "Hunting Rifle",     desc: "Gear Bonus +2 Shoot, weapon damage 2, Long range, clip (no reload each shot). DEV Req: Technology 10. DEV Bonus: Technology +D6, Warfare +1." },
  { roll: "363-366", name: "ID Card (Metaplot)",desc: "Tiny item. Opens a specific locked door from the Old Age (metaplot). DEV Req: Technology 20. DEV Bonus: Technology +D6. Helps find Eden (Ch 16)." },
  { roll: "411-414", name: "Jerrycan",          desc: "Fuel for old vehicles; or a firebomb — thrown via Force (no Gear Bonus), Short range, explosion Blast Power 6. DEV Req: Technology 10. DEV Bonus: Technology +1." },
  { roll: "415-422", name: "Katana",            desc: "Gear Bonus +3 Fight, weapon damage 2. DEV Bonus: Culture +D6." },
  { roll: "423-426", name: "Kevlar Vest",       desc: "Armor Rating 6 against damage from external attacks. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "431-434", name: "Lifestyle Magazine",desc: "No effect. Tiny item. DEV Bonus: Culture +D6." },
  { roll: "435-442", name: "Map of the Zone",   desc: "Gear Bonus +3 to Find the Path. Tiny item. DEV Req: Culture 10. DEV Bonus: Culture +D6." },
  { roll: "443-446", name: "Motor Boat",        desc: "Carries 7, increases combat move, halves coastal-sector time, escapes/rams at sea (gasoline or booze, 1 dose/sector). Gear Bonus +3, Resilience ... DEV Req: Technology 20. DEV Bonus: Technology +D6." },
  { roll: "451-454", name: "Painkillers",       desc: "Eating heals all damage (no effect vs critical injuries); only D6 doses, then discard. Tiny item." },
  { roll: "455-462", name: "Painting",          desc: "No effect. DEV Bonus: Culture +D6." },
  { roll: "463-466", name: "Perfume Bottle",    desc: "Gear Bonus +2 Manipulate. Tiny item. DEV Req: Culture 10. DEV Bonus: Culture +D6." },
  { roll: "511-514", name: "Protective Suit",   desc: "Protection Rating 6 against the Rot. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "515-522", name: "REGEN",             desc: "Legendary autoinjector drug: heals ALL permanent trauma and you keep all your mutations; one dose only. Tiny item. DEV Req: Technology 30." },
  { roll: "523-526", name: "Revolver",          desc: "Gear Bonus +3 Shoot, weapon damage 2, Short range, drum holds several bullets (no reload each shot). DEV Req: Technology 10. DEV Bonus: Technology +D6, Warfare +1." },
  { roll: "531-534", name: "Scooter",           desc: "Carries 2, increases combat move, halves sector-exploration time, escapes/rams (gasoline or booze, 1 dose/2 sectors); Jury-Rig to run. Gear Bonus +2, Resilience 1. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "535-542", name: "Semi-Automatic Pistol", desc: "Light item. Gear Bonus +2 Shoot, weapon damage 2, Short range, clip (no reload each shot). DEV Req: Technology 10. DEV Bonus: Technology +D6, Warfare +1." },
  { roll: "543-546", name: "Shotgun",           desc: "Light item. Gear Bonus +3 Shoot, weapon damage 3, Short range, two barrels (fire twice before reload). DEV Req: Technology 10. DEV Bonus: Technology +D6, Warfare +1." },
  { roll: "551-554", name: "Smoke Grenade",     desc: "Spews black smoke to escape a conflict (instead of Move); can roll first and still use it if the roll fails. DEV Req: Technology 10. DEV Bonus: Technology +1, Warfare +1." },
  { roll: "555-562", name: "Soda Can",          desc: "Drinking heals 3 points of damage; discard after opening. Light item. DEV Req: Technology 10." },
  { roll: "563-566", name: "Stimulants",        desc: "Eating heals all confusion (may stay awake days); only D6 doses, then discard. Tiny item. DEV Req: Technology 20." },
  { roll: "611-614", name: "Sunglasses",        desc: "Gear Bonus +2 to Manipulate and Intimidate. Tiny item. DEV Bonus: Culture +1." },
  { roll: "615-622", name: "Tuxedo",            desc: "Gear Bonus +2 Manipulate; doesn't count as an item when worn. DEV Req: Culture 10. DEV Bonus: Culture +D6." },
  { roll: "623-626", name: "Umbrella",          desc: "Protection Rating 3 vs the Rot and acid rain. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  { roll: "631-634", name: "Video Camera (Metaplot)", desc: "Needs a Generator/Battery; records moving images and sound (something may already be recorded). DEV Req: Technology 30. DEV Bonus: Technology +D6. Helps find Eden (Ch 16)." },
  { roll: "635-642", name: "Wrench",            desc: "Gear Bonus +3 Jury-Rig and +2 Fight, weapon damage 1. DEV Req: Technology 10. DEV Bonus: Technology +D6." },
  // 643-666 = Re-Roll
];

var MYZ_CRITS = [
  { roll: 11, injury: "Lost Breath",        lethal: "No",     timeLimit: "—",        effect: "None.", recovery: "—" },
  { roll: 12, injury: "Stunned",            lethal: "No",     timeLimit: "—",        effect: "None.", recovery: "—" },
  { roll: 13, injury: "Sprained Wrist",     lethal: "No",     timeLimit: "—",        effect: "-1 to Shoot and Fight.", recovery: "D6" },
  { roll: 14, injury: "Sprained Ankle",     lethal: "No",     timeLimit: "—",        effect: "-1 to Move and Sneak.", recovery: "D6" },
  { roll: 15, injury: "Concussion",         lethal: "No",     timeLimit: "—",        effect: "-1 to Scout and Comprehend.", recovery: "D6" },
  { roll: 16, injury: "Damaged Shin",       lethal: "No",     timeLimit: "—",        effect: "-1 to Move and Sneak.", recovery: "2D6" },
  { roll: 21, injury: "Broken Nose",        lethal: "No",     timeLimit: "—",        effect: "-1 to Manipulate, +1 Intimidate, Tracker mutation disabled.", recovery: "2D6" },
  { roll: 22, injury: "Broken Fingers",     lethal: "No",     timeLimit: "—",        effect: "-1 to Shoot and Fight.", recovery: "2D6" },
  { roll: 23, injury: "Broken Toes",        lethal: "No",     timeLimit: "—",        effect: "-1 to Move and Sneak.", recovery: "2D6" },
  { roll: 24, injury: "Teeth Knocked Out",  lethal: "No",     timeLimit: "—",        effect: "-1 to Manipulate, +1 Intimidate.", recovery: "2D6" },
  { roll: 25, injury: "Groin Hit",          lethal: "No",     timeLimit: "—",        effect: "Suffer 1 damage for every roll you make to Force, Move or Fight.", recovery: "2D6" },
  { roll: 26, injury: "Thigh Wound",        lethal: "No",     timeLimit: "—",        effect: "-2 to Move and Sneak.", recovery: "2D6" },
  { roll: 31, injury: "Biceps Wound",       lethal: "No",     timeLimit: "—",        effect: "-2 to Shoot and Fight.", recovery: "2D6" },
  { roll: 32, injury: "Severed Achilles Tendon", lethal: "No", timeLimit: "—",       effect: "-2 to Move and Sneak.", recovery: "2D6" },
  { roll: 33, injury: "Dislocated Shoulder",lethal: "No",     timeLimit: "—",        effect: "-3 to Force and Fight, can not use two-handed weapons.", recovery: "D6" },
  { roll: 34, injury: "Broken Ribs",        lethal: "No",     timeLimit: "—",        effect: "-2 to Move and Fight.", recovery: "2D6" },
  { roll: 35, injury: "Broken Forearm",     lethal: "No",     timeLimit: "—",        effect: "Can not use two-handed weapons.", recovery: "3D6" },
  { roll: 36, injury: "Broken Leg",         lethal: "No",     timeLimit: "—",        effect: "-2 to Move and Sneak.", recovery: "3D6" },
  { roll: 41, injury: "Ear Torn Off",       lethal: "No",     timeLimit: "—",        effect: "-1 to Scout, Sonar mutation disabled.", recovery: "3D6" },
  { roll: 42, injury: "Gouged Eye",         lethal: "No",     timeLimit: "—",        effect: "-2 to Shoot and Scout.", recovery: "3D6" },
  { roll: 43, injury: "Punctured Lung",     lethal: "Yes",    timeLimit: "D6 days",  effect: "-2 to Endure and Move.", recovery: "2D6" },
  { roll: 44, injury: "Damaged Kidney",     lethal: "Yes",    timeLimit: "D6 days",  effect: "Suffer 1 damage for every roll you make to Force, Move or Fight.", recovery: "3D6" },
  { roll: 45, injury: "Crushed Knee",       lethal: "Yes",    timeLimit: "D6 days",  effect: "-2 to Move and Sneak.", recovery: "4D6" },
  { roll: 46, injury: "Crushed Elbow",      lethal: "Yes",    timeLimit: "D6 days",  effect: "-2 to Force and Fight, can not use two-handed weapons.", recovery: "4D6" },
  { roll: 51, injury: "Crushed Foot",       lethal: "Yes",    timeLimit: "D6 days",  effect: "-3 to Move and Sneak.", recovery: "4D6" },
  { roll: 52, injury: "Bleeding Gut",       lethal: "Yes",    timeLimit: "D6 hours", effect: "Suffer 1 damage for every roll you make to Force, Move or Fight.", recovery: "D6" },
  { roll: 53, injury: "Crushed Face",       lethal: "Yes",    timeLimit: "D6 hours", effect: "-2 to Manipulate.", recovery: "4D6" },
  { roll: 54, injury: "Busted Intestine",   lethal: "Yes",    timeLimit: "D6 hours", effect: "Suffer 1 Rot Point per hour until Healed.", recovery: "2D6" },
  { roll: 55, injury: "Damaged Spine",      lethal: "No",     timeLimit: "—",        effect: "Paralyzed from the waist down. Effect is permanent unless Healed during healing time.", recovery: "4D6" },
  { roll: 56, injury: "Neck Injury",        lethal: "No",     timeLimit: "—",        effect: "Paralyzed from the neck down. Effect is permanent unless Healed during healing time.", recovery: "4D6" },
  { roll: 61, injury: "Internal Bleeding",  lethal: "Yes, -1",timeLimit: "D6 minutes",effect: "Suffer 1 damage for every roll you make to Force, Move or Fight.", recovery: "2D6" },
  { roll: 62, injury: "Severed Arm Artery", lethal: "Yes, -1",timeLimit: "D6 minutes",effect: "-1 to Endure and Move.", recovery: "D6" },
  { roll: 63, injury: "Severed Leg Artery", lethal: "Yes, -1",timeLimit: "D6 minutes",effect: "-1 to Endure and Move.", recovery: "D6" },
  { roll: 64, injury: "Severed Jugular",    lethal: "Yes, -1",timeLimit: "D6 turns", effect: "-1 to Endure and Move.", recovery: "D6" },
  { roll: 65, injury: "Pierced Heart",      lethal: "Yes",    timeLimit: "—",        effect: "Your heart beats one last time, then you die. Time to make a new PC.", recovery: "—" },
  { roll: 66, injury: "Crushed Skull",      lethal: "Yes",    timeLimit: "—",        effect: "You die instantly, and will never see Eden.", recovery: "—" },
  { roll: "—",injury: "Non-Typical Damage", lethal: "Yes",    timeLimit: "D6 days",  effect: "You are incapacitated until you die or you are Healed. (Used for acid, gas, fire, etc.)", recovery: "—" },
  { roll: "—",injury: "Pushed Roll Damage", lethal: "No",     timeLimit: "—",        effect: "None. (You never suffer a critical injury from breaking yourself by pushing a Strength roll.)", recovery: "—" },
];

var MYZ_CONDITIONS = [
  { name: "Starving",    desc: "After 1 day with no grub. Can't recover Damage (Strength) at all; suffer +1 damage/day without grub; if broken by damage while starving you die after another day. Cured by eating 1 ration of grub." },
  { name: "Dehydrated",  desc: "After 1 day with no water. Can't recover ANY trauma; suffer +1 fatigue/day; if broken by any trauma while dehydrated you die after a day. Cured by drinking 1 ration of water." },
  { name: "Sleepless",   desc: "After a day without 4+ hours sleep. Can't recover Confusion (Wits) at all; suffer +1 confusion/day; if broken by confusion while sleepless you collapse unconscious. Cured by 4 hours of sleep." },
  { name: "Hypothermic", desc: "From exposure to severe cold (roll Endure vs cold; on failure become hypothermic). Immediately suffer 1 damage + 1 confusion; possible hallucinations; keep rolling Endure at intervals; if broken by damage while hypothermic you die next time called on to roll. Can't restore Strength or Wits until warm again." },
];

var MYZ_ROT = [
  { level: 0, name: "Zone Oasis",  effect: "As good as free from Rot. You suffer no Rot Points here. The Ark is located in such a sector." },
  { level: 1, name: "Weak Rot",    effect: "You get one Rot Point every day." },
  { level: 2, name: "Strong Rot",  effect: "You suffer one Rot Point every hour." },
  { level: 3, name: "Hotspot",     effect: "You die quickly — one Rot Point every minute." },
];

var MYZ_DEVELOPMENT = [
  { name: "Food Supply", desc: "The Ark's ability to feed the hungry. 0-9 desperate (1 grub per bullet); 10-19 day-to-day needs met; 20-29 surplus; 30+ abundance (4 grub per bullet). Higher levels lower the Session Body Count." },
  { name: "Culture",     desc: "Reading/writing, art, worship, governance. 0-9 only Chroniclers literate; 10-19 basic literacy, places of worship; 20-29 schools; 30-39 ideals of the Ancients, suffrage." },
  { name: "Technology",  desc: "Ability to understand artifacts and build. 0-9 only Gearheads grasp tech; 10-19 mills/distillery; 20-29 workshop, printing press; 30-39 steam engine, electric lights, breech-loaded guns." },
  { name: "Warfare",     desc: "Defense vs large-scale attack; sets the Ark's Battle Level 1-4. 0-9 defenseless (BL1); 10-19 fortifications/patrols (BL2); 20-29 organized militia (BL3); 30-39 standing army, scrap cannons, flamethrowers (BL4)." },
];

var MYZ_BESTIARY = [
  { name: "Zone-Ghouls",   mod: "±0", stats: "STR 3, AGI 4, WIT 3, EMP 2; Move 3, Shoot 2, Fight 1; Armor —", attack: "Bicycle chain, slingshot", desc: "Nomadic Rot-spawned humanoids (actually deformed teen survivors); hunt at night. In direct sunlight take 1 damage/hour despite clothing." },
  { name: "Acid Grass",    mod: "-1", stats: "Strength 10 (field); only damaged by fire", attack: "Entangles; 1 damage/turn from acid once snared", desc: "Predatory field of tall grass; snares anything that enters (6 Base Dice attack) and excretes acid. Break free with a Force roll." },
  { name: "Air Jellies",   mod: "±0", stats: "Swarm; only hurt by fire/explosions", attack: "6 Base Dice; corrodes metal gear (every success drops gear's Gear Bonus by one)", desc: "Hovering translucent bubbles with acidic feelers; attack gear, not flesh." },
  { name: "Automaton",     mod: "-2", stats: "STR 8, AGI 6; Fight 4, Shoot 4; Armor 10", attack: "Chainsaw (dmg 2), built-in laser (dmg 2, Long range) — no Gear Bonus", desc: "Old-Age war robot / biomechatronic being. Never suffers fatigue; Agility never decreases." },
  { name: "Bitterbeast",   mod: "+1", stats: "STR 5, AGI 4 (lower in cold); Endure 3, Fight 2, Shoot 3; Armor 2", attack: "Bite (dmg 2), acid spit (Short, dmg 1)", desc: "Giant acid-spitting lizard twice a mutant's size; can be tamed and ridden (with risk)." },
  { name: "Deathworm",     mod: "±0", stats: "STR 8, AGI 3; Fight 3, Sneak 5 (underground), Move 5 (underground); Armor —", attack: "Maw (dmg 2); on hit attaches and drags victim underground (inner teeth +3 mod)", desc: "Burrowing scaled abomination twice a mutant's length; attacks until it or its prey is dead." },
  { name: "Devourer",      mod: "±0", stats: "STR 6, AGI 4; Fight 3, Sneak 4; Armor 2", attack: "Claws (dmg 1); jaws (dmg 3, sneak attack only) — on hit swallows victim, 1 dmg/turn", desc: "Bear-like predator with dislocating jaws and corrosive saliva; sneaks up on prey." },
  { name: "Grazers",       mod: "+1", stats: "STR 2-5, AGI 2-4; Armor —", attack: "Horns/teeth/tusks (dmg 1)", desc: "Mutated feral sheep, goats, pigs and cows roaming in herds; prime hunting targets." },
  { name: "Gutfish",       mod: "±0", stats: "Parasite (waterborne)", attack: "Infects via drinking water; host must eat 2 extra grub/day or starve", desc: "Eel-like parasite; after 2D6 days bites its way out, breaking the host (Bleeding Gut critical injury #52)." },
  { name: "Killer Tree",   mod: "-1", stats: "STR 10, AGI 6; Fight 3; Armor 6", attack: "Tentacles (Near, dmg 1, snare), maw (dmg 3, on snared victim)", desc: "Semi-sentient carnivorous tree; telepathic lure (Move roll or drawn in) and humanoid Seed Pods (STR 3, AGI 5, Fight 2) that mimic victims." },
  { name: "Mind Mosquitoes", mod: "-1", stats: "Swarm, Strength 8; only hurt by fire/explosions", attack: "Each turn: Base Dice = swarm Strength; each success = 1 doubt", desc: "Clouds of mosquitoes that attack the mind; victims grow despondent and sit still to be drained." },
  { name: "Nightmare Flowers", mod: "-1", stats: "Strength 10; only destroyed by fire", attack: "Sedative spore cloud; snared victims take 1 damage/turn", desc: "Field of large flowers; sedates with spores then thorny vines drain blood. Break free with a Force roll." },
  { name: "Parasite Fungus", mod: "±0", stats: "Fungal infection", attack: "1 damage/day; if broken, suffer a critical injury from non-typical damage", desc: "Mycelial life form; infects at close contact, drives host to spread it; cured only by being broken by damage then Healed." },
  { name: "Razorback",     mod: "±0", stats: "STR 10, AGI 6; Fight 4; Armor 8", attack: "Charge (dmg 2, Short->Arm's Length combined move/attack), tusks (dmg 3)", desc: "Enormous enraged boar, taller than a mutant; near-unstoppable killing frenzy." },
  { name: "Rot Ants",      mod: "±0", stats: "Swarm, Strength 6; Armor —", attack: "Bite (dmg 1); every attack inflicts 1 Rot Point", desc: "Fist-sized blind ants in uncountable millions; devour everything and spread the Rot. Cannot be decimated — run." },
  { name: "Rotfish",       mod: "±0", stats: "STR 7, AGI 5; Fight 3, Move 4 (underwater); Armor 5", attack: "Bite (dmg 2); after a hit drags prey underwater (1 dmg/turn, Force to break free)", desc: "Predatory Zone-lake fish that drowns prey near the waterline." },
  { name: "Scrap Crows",   mod: "+1", stats: "Swarm; STR 7, AGI 6; Armor —; only fire/explosions", attack: "Beak and claws (dmg 1)", desc: "Flocks of ash-feathered Rot-ridden birds drawn to shiny scrap; peck at the eyes." },
  { name: "Trash Hawk",    mod: "±0", stats: "STR 6, AGI 8; Fight 3, Sneak 4, Move 4, Force 2; Armor 1", attack: "Claws (dmg 2); swooping attack from Long range (takes 1 dmg itself); can lift off with prey (Force roll)", desc: "Predatory bird of prey with a wingspan up to 25 ft; swoops and rips off flesh." },
  { name: "Worm Swarm",    mod: "-1", stats: "Swarm, Strength 8 (grows); Armor —; only fire/explosions", attack: "Engulfing (dmg 1; doubt instead of damage first turn); each damage dealt raises its Strength by 1", desc: "Collective-minded cluster of millions of black worms that engulfs and eats prey alive." },
  { name: "Zone Dogs",     mod: "+1", stats: "STR 4, AGI 6; Fight 2, Move 3; Armor —", attack: "Bite (dmg 2)", desc: "Packs of scrawny, often furless mutated mutts." },
  { name: "Zone Rats",     mod: "+1", stats: "Swarm, STR 8, AGI 5; Armor —; only fire/explosions", attack: "Teeth (dmg 1); every attack inflicts 1 Rot Point", desc: "Hordes of arm-long rats made bigger and meaner by the Rot." },
  { name: "Zone Spider",   mod: "±0", stats: "STR 5; Fight 2, Move 2; Armor 3", attack: "Bite (dmg 1 + poison: 1 fatigue/turn until Healed)", desc: "Mutated spiders of absurd size in tunnels/ruins; paralyze prey with venom." },
  { name: "Zone Wasps",    mod: "±0", stats: "Swarm, STR 5; Armor 2; only fire/explosions", attack: "Bite (dmg 1); any damage also inflicts 1 confusion; pheromones raise swarm Strength 1/turn", desc: "Fist-sized black-and-yellow wasps with hallucinogenic venom." },
  { name: "Zone Leeches",  mod: "±0", stats: "Swarm, STR 6; Armor —; only fire/explosions", attack: "Bite (dmg 1); once attached, +1 damage/turn until removed (Fight roll to pull off, -2 on yourself)", desc: "Fist-sized eyeless blood-suckers that sense heat and latch on." },
];

var MYZ_HB_WEAPONS = [];
var MYZ_HB_GEAR = [];

if (typeof window !== 'undefined') {
  window.MYZ_ATTRIBUTES = MYZ_ATTRIBUTES;
  window.MYZ_SKILLS = MYZ_SKILLS;
  window.MYZ_ROLES = MYZ_ROLES;
  window.MYZ_TALENTS = MYZ_TALENTS;
  window.MYZ_MUTATIONS = MYZ_MUTATIONS;
  window.MYZ_MELEE_WEAPONS = MYZ_MELEE_WEAPONS;
  window.MYZ_RANGED_WEAPONS = MYZ_RANGED_WEAPONS;
  window.MYZ_ARMOR = MYZ_ARMOR;
  window.MYZ_COVER = MYZ_COVER;
  window.MYZ_GEAR = MYZ_GEAR;
  window.MYZ_ARTIFACTS = MYZ_ARTIFACTS;
  window.MYZ_CRITS = MYZ_CRITS;
  window.MYZ_CONDITIONS = MYZ_CONDITIONS;
  window.MYZ_ROT = MYZ_ROT;
  window.MYZ_DEVELOPMENT = MYZ_DEVELOPMENT;
  window.MYZ_BESTIARY = MYZ_BESTIARY;
  window.MYZ_HB_WEAPONS = MYZ_HB_WEAPONS;
  window.MYZ_HB_GEAR = MYZ_HB_GEAR;
}