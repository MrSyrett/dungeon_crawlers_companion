// ─────────────────────────────────────────────────────────────────────────────
// ALIEN RPG (Free League) — a variant of the Year Zero Engine. Data for the
// "alien" mode of the YZE character sheet: its own 12 skills, nine careers,
// career + general talents, and the Alien weapon/armor set. Sourced from the
// ALIEN RPG Core Rulebook (© 2019 Twentieth Century Fox / Fria Ligan).
//
// Alien differs from generic YZE core: Stress replaces Resolve (it counts UP;
// stress dice add to your pool and a 1 triggers a Panic Roll), Health = your
// Strength score, and characters take a career + talents + a signature item.
//
// Browser runtime globals — every top-level assigns window.X = X. Keep in sync
// with lib/data/yze-alien-data.ts.
// ─────────────────────────────────────────────────────────────────────────────

var ALIEN_SKILLS = [
  { name: "Heavy Machinery", attr: "STR", desc: "Operate and repair heavy machines, force open doors, use industrial equipment and power loaders." },
  { name: "Close Combat", attr: "STR", desc: "Fight hand-to-hand or with a melee weapon at Engaged range." },
  { name: "Stamina", attr: "STR", desc: "Endure hardship — resist poison and disease, hold your breath, survive a lethal critical injury." },
  { name: "Mobility", attr: "AGI", desc: "Move under pressure — climb, jump, dodge, sneak, and keep your footing." },
  { name: "Ranged Combat", attr: "AGI", desc: "Fire guns and throw weapons at range." },
  { name: "Piloting", attr: "AGI", desc: "Pilot spacecraft, vehicles, and aircraft." },
  { name: "Observation", attr: "WITS", desc: "Spot danger, notice details, and read sensors and motion trackers." },
  { name: "Comtech", attr: "WITS", desc: "Operate computers, hack systems, repair electronics, and use communications gear." },
  { name: "Survival", attr: "WITS", desc: "Endure hostile environments, find food and shelter, and navigate the wilderness." },
  { name: "Command", attr: "EMP", desc: "Lead and give orders under fire; keep a crew together." },
  { name: "Manipulation", attr: "EMP", desc: "Persuade, deceive, intimidate, and negotiate." },
  { name: "Medical Aid", attr: "EMP", desc: "Perform first aid and surgery, stop bleeding, and stabilize the dying." }
];

var ALIEN_CAREERS = [
  { name: "Colonial Marine", key: "STR", skills: ["Close Combat", "Stamina", "Ranged Combat"],
    talents: ["Banter", "Overkill", "Past the Limit"],
    signature: ["Bullet that you survived", "Lost friend's dog tags", "Trophy from a defeated enemy"],
    gear: "M41A Pulse Rifle or M56A2 Smart Gun; M314 Motion Tracker or 2 G2 Electroshock Grenades; IRC MK.35 Pressure Suit or M3 Personnel Armor; Signal Flare or Deck of cards. $D6×100 cash.",
    agendas: ["You are a decorated hero and need to defend your reputation, at all costs.", "You once helped cover up a war crime — no-one must ever know.", "The death of your buddy has spooked you; you secretly fear combat now and must overcome it."],
    names: ["Marcus Mullaney", "Nik Elson", "Vic Pasengrau", "Kimi Diem", "Tara Zanelli", "Chrissy Lopez"] },
  { name: "Colonial Marshal", key: "WITS", skills: ["Observation", "Ranged Combat", "Manipulation"],
    talents: ["Authority", "Investigator", "Subdue"],
    signature: ["Photo of a loved one", "Dented flask with an inscription", "News clipping of an unsolved case"],
    gear: ".357 Magnum Revolver or Armat Model 37A2 pump-action; Binoculars or Hi-beam flashlight; Personal medkit or Stun baton; D6 doses Neversleep or Hand radio. $D6×100 cash.",
    agendas: ["Your longtime partner betrayed you and defected to a crime syndicate. Get even.", "You dream of turning in the badge and settling down in peace. Work towards it.", "You did a bad thing in the past and it has come back to haunt you."],
    names: ["Jack Kitani", "Barrell Klein", "Ivan Mankov", "Akira Kano", "Angela Harris", "Lee-Ann Jenkins"] },
  { name: "Company Agent", key: "WITS", skills: ["Comtech", "Observation", "Manipulation"],
    talents: ["Cunning", "Personal Safety", "Take Control"],
    signature: ["Letter of corporate authorization", "Divorce papers", "Employee of the Year award"],
    gear: "Leather or Chrome briefcase; Gold-plated pen or Rolex watch; Data transmitter card or M4A3 Service Pistol; D6 doses Neversleep or Naproleve. $2D6×100 cash.",
    agendas: ["You are greedy for power and never miss an opportunity to get ahead.", "The Company is holding back information from you. What? And why?", "You are a nice guy, but the Company is blackmailing you into its dirty work."],
    names: ["Conrad Schmidt", "Alexander Balconi", "Ryan Middlebrook", "Michiko Nogumi", "Sheridan Lamara", "Mercedes Prince"] },
  { name: "Kid", key: "AGI", skills: ["Mobility", "Survival", "Observation"],
    talents: ["Beneath Notice", "Dodge", "Nimble"],
    signature: ["Lunchbox covered in stickers", "Favorite doll or action figure", "Bracelet made by an older sibling"],
    gear: "Fishing line or Laser pointer; Magnet or Radio-controlled car; Yo-yo or Electronic handheld game; Personal locator beacon or Coloring pens. $D6 cash.",
    agendas: ["You want to find an adult you can trust — really trust.", "You have no family left. Make sure you never end up alone again.", "No one gives you anything to do, so you explore, try things out, make your own entertainment."],
    names: ["Chip Harrington", "Hugo Turner", "Jakey Myers", "Meggie Wu", "Maisie Kelly", "Becca David"] },
  { name: "Medic", key: "EMP", skills: ["Mobility", "Observation", "Medical Aid"],
    talents: ["Calming Presence", "Compassion", "Field Surgeon"],
    signature: ["Framed medical certificate", "Letter from son or daughter", "Last psych evaluation: “All clear at last.”"],
    gear: "Surgical kit or IRC MK.50 compression suit; D6 doses Naproleve or Neversleep; Personal medkit or D6 doses experimental X-Drugs; Samani E-Series watch or Hand radio. $D6×100 cash.",
    agendas: ["You are addicted to a strong painkiller. Protect your stash — and your secret.", "You have some unusual (classified) medical reports the Company wants. Find out why.", "You've sworn an oath never to take a life, and you mean it."],
    names: ["Cho Hadfield", "Ken Ibana", "Sullivan Ward", "Ana Kasnavik", "Juno Blanchard", "Katie Aberly"] },
  { name: "Officer", key: "EMP", skills: ["Ranged Combat", "Command", "Manipulation"],
    talents: ["Field Commander", "Influence", "Pull Rank"],
    signature: ["Ship's cat", "Letter of recommendation", "ICC Commercial Flight Officer license"],
    gear: "M4A3 Service Pistol or Rexim RXF-M5 EVA Pistol; Samani E-Series watch or Binoculars; M314 motion tracker or IRC MK.50 compression suit; Seegson P-DAT or IFF transponder. $2D6×100 cash.",
    agendas: ["You come from an officer family. You need to gain promotion or an award — soon.", "You messed up in the past. Avoid taking the blame for any more mission screw-ups.", "Mistakes are deadly; don't let anyone under your watch screw up. Make sure they understand why."],
    names: ["Eugene Proctor", "Oliver Bryant", "Lloyd T. Darrington", "Wendy Stern", "Julia Kwang", "Camille Kirschner"] },
  { name: "Pilot", key: "AGI", skills: ["Mobility", "Ranged Combat", "Comtech"],
    talents: ["Full Throttle", "Like the Back of Your Hand", "Reckless"],
    signature: ["Dashboard dancer", "Pilot's logbook", "Pilot shades"],
    gear: "M4A3 service pistol or PR-PUT uplink terminal; Hand radio or D6 flares; Maintenance jack or Seegson P-DAT; Seegson system diagnostic device or IRC MK.50 compression suit. $D6×100 cash.",
    agendas: ["It's about pushing the limit. Taking a chance. Taking risks — so take a risk.", "You're stubborn and don't like to back down, even if your friends might get hurt.", "You're a loner, always happier when you can do a task without relying on others."],
    names: ["Casper Edmonton", "Sven Stackman", "Kiel Avari", "Fiona O'Neill", "Constance Navona", "Igraine Turner"] },
  { name: "Roughneck", key: "STR", skills: ["Heavy Machinery", "Stamina", "Close Combat"],
    talents: ["Resilient", "The Long Haul", "True Grit"],
    signature: ["Tool belt", "Photo of partner", "Crucifix or other religious symbol"],
    gear: "Cutting torch or Watsumi DV-303 bolt gun; D6 doses Hydr8tion or Maintenance jack; Stash of hard liquor or IRC MK.50 compression suit; Hi-beam flashlight or Seegson C-Series magnetic tape recorder. $D6×100 cash.",
    agendas: ["You are a compulsive thrill-seeker. If there is a risk to take, you'll step up and try it.", "You once sacrificed your family for the job. Now you won't let your friends down — ever.", "Downtime matters. If you can grab a beer and some time alone, you're happy."],
    names: ["Mac Masterton", "Kip Tranter", "Charlie Stead", "Sassy Diaz", "Kat Longridge", "Jayden Pace"] },
  { name: "Scientist", key: "WITS", skills: ["Observation", "Survival", "Comtech"],
    talents: ["Analysis", "Breakthrough", "Inquisitive"],
    signature: ["Albert Einstein Award", "Unfinished scientific paper", "Blackmail letters"],
    gear: "Digital video camera or Hand radio; Seegson P-DAT or Neuro visor; Seegson System Diagnostic Device or Personal Data Transmitter; M314 motion tracker or Personal medkit. $D6×100 cash.",
    agendas: ["Your last project was stolen from you. Now you keep many of your findings secret.", "You hate authority and go out of your way to be uncooperative if possible.", "You find it hard to delegate to others, even if it means taking on extra work."],
    names: ["Viggo Kowalski", "Drew Lancaster", "Travis Torrence", "Elena Sanchez", "Louise Mallory", "Karima Yusef"] }
];

// Career talents (each career offers three; a new PC chooses one) + general talents.
var ALIEN_TALENTS = [
  // Colonial Marine
  { name: "Banter", career: "Colonial Marine", desc: "Between fights you ease the tension: your Stress Level, and that of crew in Short range, drops two steps (not one) per Turn resting in a safe place. Several Marines with this talent don't stack." },
  { name: "Overkill", career: "Colonial Marine", desc: "When you make a Panic Roll with enemies in sight, you may attack instead of the rolled effect — you won't stop until you or all enemies are Broken. All PCs in Short range must make an immediate Panic Roll." },
  { name: "Past the Limit", career: "Colonial Marine", desc: "You can push any Strength-based roll twice, not just once. Each push increases your Stress Level by one." },
  // Colonial Marshal
  { name: "Authority", career: "Colonial Marshal", desc: "You can use Command instead of Manipulation to get someone to bend to your will." },
  { name: "Investigator", career: "Colonial Marshal", desc: "When you spend a Turn in a location, roll Observation; for each success ask the GM one question (what happened here? is anything hidden? anything out of place?). One attempt only." },
  { name: "Subdue", career: "Colonial Marshal", desc: "When you attack a humanoid in close combat you can try to subdue: +2 to the attack, and on a hit you grapple instead of dealing damage. Extra successes have no effect." },
  // Company Agent
  { name: "Cunning", career: "Company Agent", desc: "You can push any Wits-based roll twice, not just once. Each push increases your Stress Level by one." },
  { name: "Personal Safety", career: "Company Agent", desc: "If you're attacked or in fatal danger and another PC/NPC is within Short range, roll Manipulation (not an action); on a success they suffer the attack or hazard instead of you. Increases your Stress Level by one." },
  { name: "Take Control", career: "Company Agent", desc: "You can roll for Manipulation using Wits instead of Empathy." },
  // Kid
  { name: "Beneath Notice", career: "Kid", desc: "When you roll for a critical injury on yourself, re-roll the dice and choose the result you prefer." },
  { name: "Dodge", career: "Kid", desc: "When attacked in close combat you can dodge (like blocking) but roll using Mobility instead of Close Combat, to reduce damage only. You can even dodge a creature's signature attack." },
  { name: "Nimble", career: "Kid", desc: "You can push any Agility-based roll twice, not just once. Each push increases your Stress Level by one." },
  // Medic
  { name: "Calming Presence", career: "Medic", desc: "Once per Turn, reduce the Stress Level of another character within Short range by one, in addition to normal recovery. You can't use it on yourself, and everyone must be relatively safe." },
  { name: "Compassion", career: "Medic", desc: "You can push any Empathy-based roll twice, not just once. Each push increases your Stress Level by one." },
  { name: "Field Surgeon", career: "Medic", desc: "You get a +2 modification to Medical Aid when treating someone about to die from a critical injury." },
  // Officer
  { name: "Field Commander", career: "Officer", desc: "You can use Command to give orders in combat as a fast action instead of a slow action — orders twice in one Round." },
  { name: "Influence", career: "Officer", desc: "You can push any Empathy-based roll twice, not just once. Each push increases your Stress Level by one." },
  { name: "Pull Rank", career: "Officer", desc: "Use Command to order non-officer PCs/NPCs in your organization; roll Command vs. the target's Manipulation. On a success they must follow your order. Your Stress Level increases by one each time." },
  // Pilot
  { name: "Full Throttle", career: "Pilot", desc: "When piloting a spacecraft you get +2 to Piloting for Accelerate or Decelerate actions." },
  { name: "Like the Back of Your Hand", career: "Pilot", desc: "Choose one specific vehicle or spacecraft; you get +2 to Piloting with it. You can take this talent several times, once per vehicle." },
  { name: "Reckless", career: "Pilot", desc: "You can push any Agility-based roll twice, not just once. Each push increases your Stress Level by one." },
  // Roughneck
  { name: "Resilient", career: "Roughneck", desc: "Roll Strength (attribute only) any time you suffer damage; you can't push it and it isn't an action. For each success one point of damage is eliminated." },
  { name: "The Long Haul", career: "Roughneck", desc: "Once per Act (Cinematic) / session (Campaign), you may ignore all panic-triggering symbols from a single stress roll." },
  { name: "True Grit", career: "Roughneck", desc: "You can push any Strength-based roll twice, not just once. Each push increases your Stress Level by one." },
  // Scientist
  { name: "Analysis", career: "Scientist", desc: "Roll Observation to study a strange artifact or creature for a Turn; for each success ask the GM a question about it. A success also reduces the Stress Level of PCs in Short range by one." },
  { name: "Breakthrough", career: "Scientist", desc: "Once per session, automatically pass an Observation roll of your choice without rolling (GM has final say)." },
  { name: "Inquisitive", career: "Scientist", desc: "You can push any Wits-based roll twice, not just once. Each push increases your Stress Level by one." },
  // General talents
  { name: "Bodyguard", career: "General", desc: "If someone in Short range is hit, roll Mobility (not an action) to dive in and take the hit instead. Pushable." },
  { name: "Calm Breather", career: "General", desc: "On a supply roll for air you roll two dice fewer than your Supply Level (minimum one die)." },
  { name: "Counselor", career: "General", desc: "Once per Turn, use Command to reduce another character's Stress Level within Short range; each success reduces it by one extra step. Not on yourself." },
  { name: "EVA Specialist", career: "General", desc: "+2 to Heavy Machinery and Comtech rolls when spacewalking." },
  { name: "Fast Reflexes", career: "General", desc: "Draw two initiative cards and choose which to use; shuffle the other back before others draw." },
  { name: "Flyweight", career: "General", desc: "When you block in close combat you can use Agility instead of Strength." },
  { name: "Hard Hitter", career: "General", desc: "+2 to Close Combat if you sacrifice your fast action." },
  { name: "Healer", career: "General", desc: "You recover quickly: the healing time of critical injuries is halved for you." },
  { name: "Hidden Stash", career: "General", desc: "Begin each session with an extra item of your choice hidden on you or stowed safely (GM approves)." },
  { name: "Hothead", career: "General", desc: "+2 to opposed rolls for Manipulation whenever someone tries to give you orders; can resist the Officer's Pull Rank." },
  { name: "Light Eater", career: "General", desc: "On a supply roll for food you roll two dice fewer than your Supply Level (minimum one die)." },
  { name: "Light Sleeper", career: "General", desc: "You only need to sleep one Shift every two days instead of one Shift every day." },
  { name: "Killer", career: "General", desc: "When your (human) enemy suffers a critical injury you may switch the D66 roll so the ones die becomes the tens and vice versa." },
  { name: "Machinegunner", career: "General", desc: "When firing on fully automatic your Stress Level does not increase." },
  { name: "Menacing", career: "General", desc: "Roll Manipulation using Strength instead of Empathy when threatening someone; on a success they can't demand anything in return." },
  { name: "Merciless", career: "General", desc: "You can perform a coup de grâce without rolling Empathy; your Stress Level decreases one step each time you Break an enemy." },
  { name: "Nerves of Steel", career: "General", desc: "−2 modification to all Panic Rolls." },
  { name: "Pack Mule", career: "General", desc: "You can carry twice as many items as normal without being encumbered." },
  { name: "Quick Draw", career: "General", desc: "You can draw your weapon so quickly it doesn't cost you an action." },
  { name: "Rapid Fire", career: "General", desc: "Fire a pistol or rifle as a fast action instead of a slow action, at −2." },
  { name: "Rapid Reload", career: "General", desc: "Reload a weapon as a fast action instead of a slow action." },
  { name: "Second Wind", career: "General", desc: "When Broken, roll Stamina to get one Health point back and keep fighting — no first aid needed. Once per Turn; no effect vs. critical injuries." },
  { name: "Spaceship Commander", career: "General", desc: "As a spaceship captain in space combat, draw two initiative cards and choose one." },
  { name: "Spaceship Gunner", career: "General", desc: "As a gunner in space combat, +2 to Ranged Combat." },
  { name: "Spaceship Mechanic", career: "General", desc: "+2 to Heavy Machinery or Comtech to repair a spacecraft in space combat." },
  { name: "Stealthy", career: "General", desc: "+2 to Mobility when moving undetected." },
  { name: "Stoic", career: "General", desc: "You can roll Stamina using Wits instead of Strength." },
  { name: "Tough", career: "General", desc: "You increase your Health by +2 (max = Strength + 2)." },
  { name: "Watchful", career: "General", desc: "+2 to Observation when trying to spot a sneak attack." },
  { name: "Weapon Specialist", career: "General", desc: "Choose one weapon model; +2 when you use it. Take several times, once per weapon type." },
  { name: "Zero-G Training", career: "General", desc: "+2 to Mobility rolls in zero-G." }
];

// Alien weapons — bonus = gear dice; damage = base rating; class groups the picker.
var ALIEN_WEAPONS = [
  // Pistols
  { name: "M4A3 Service Pistol", bonus: "+2", damage: 1, range: "Medium", weight: "½", cost: "$200", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: ".357 Magnum Revolver", bonus: "+1", damage: 2, range: "Medium", weight: "1", cost: "$300", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: "Rexim RXF-M5 EVA Pistol", bonus: "+1", damage: 1, range: "Medium", weight: "½", cost: "$400", special: "Armor piercing", skill: "Ranged Combat", class: "Pistol" },
  { name: "Watatsumi DV-303 Bolt Gun", bonus: "—", damage: 3, range: "Short", weight: "1", cost: "$400", special: "Armor piercing, single-shot", skill: "Ranged Combat", class: "Pistol" },
  // Rifles
  { name: "Armat M41A Pulse Rifle", bonus: "+1", damage: 2, range: "Long", weight: "1", cost: "$1,200", special: "Armor piercing, full auto, grenade launcher", skill: "Ranged Combat", class: "Rifle" },
  { name: "AK-4047 Pulse Assault Rifle", bonus: "—", damage: 2, range: "Long", weight: "1", cost: "$500", special: "Full auto", skill: "Ranged Combat", class: "Rifle" },
  { name: "M42A Scope Rifle", bonus: "+2", damage: 2, range: "Extreme", weight: "1", cost: "$1,000", special: "Armor piercing", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat Model 37A2 12 Gauge Pump Action", bonus: "+2", damage: 3, range: "Short", weight: "1", cost: "$500", special: "Armor doubled", skill: "Ranged Combat", class: "Rifle" },
  { name: "SpaceSub ASSO-400 Harpoon Grappling Gun", bonus: "—", damage: 1, range: "Medium", weight: "1", cost: "$300", special: "Armor doubled, single-shot", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat XM99A Phased Plasma Pulse Rifle", bonus: "—", damage: 4, range: "Extreme", weight: "2", cost: "$20,000", special: "Armor piercing, Power Supply 5", skill: "Ranged Combat", class: "Rifle" },
  // Heavy weapons
  { name: "Armat U1 Grenade Launcher", bonus: "+1", damage: 0, range: "Long", weight: "½", cost: "$600", special: "Blast Power 9; can fire other grenade types", skill: "Ranged Combat", class: "Heavy" },
  { name: "Armat M41AE2 Heavy Pulse Rifle", bonus: "+1", damage: 3, range: "Extreme", weight: "2", cost: "$1,500", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Heavy" },
  { name: "M56A2 Smart Gun", bonus: "+3", damage: 3, range: "Long", weight: "3", cost: "$6,000", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Heavy" },
  { name: "M240 Incinerator Unit", bonus: "—", damage: 2, range: "Medium", weight: "1", cost: "$500", special: "Fire Intensity 9", skill: "Ranged Combat", class: "Heavy" },
  { name: "UA 571-C Sentry Gun", bonus: "+2", damage: 4, range: "Extreme", weight: "—", cost: "$12,000", special: "Armor piercing, full auto, Ranged Combat 8", skill: "Ranged Combat", class: "Heavy" },
  { name: "G2 Electroshock Grenade", bonus: "—", damage: 0, range: "Medium", weight: "½", cost: "$400", special: "Stun effect (−2)", skill: "Ranged Combat", class: "Heavy" },
  // Close combat
  { name: "Unarmed Attack", bonus: "—", damage: 1, range: "Engaged", weight: "—", cost: "—", special: "Armor doubled", skill: "Close Combat", class: "Close Combat" },
  { name: "Blunt Instrument", bonus: "+1", damage: 1, range: "Engaged", weight: "1", cost: "—", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Knife", bonus: "—", damage: 2, range: "Engaged", weight: "½", cost: "$50", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Stun Baton", bonus: "+1", damage: 1, range: "Engaged", weight: "½", cost: "$80", special: "Stun effect, Power Supply 5", skill: "Close Combat", class: "Close Combat" },
  { name: "Cutting Torch", bonus: "—", damage: 3, range: "Engaged", weight: "1", cost: "$300", special: "Armor piercing, Power Supply 5", skill: "Close Combat", class: "Close Combat" }
];

var ALIEN_ARMOR = [
  { name: "M3 Personnel Armor", rating: 6, air: "—", weight: "1", cost: "$1,200", comment: "Built-in comm unit" },
  { name: "IRC Mk.50 Compression Suit", rating: 2, air: "5", weight: "1", cost: "$15,000", comment: "Agility −1, Air Supply 5" },
  { name: "IRC Mk.35 Pressure Suit", rating: 5, air: "4", weight: "2", cost: "$2,000", comment: "Air Supply 4, heavy" },
  { name: "Eco All-World Survival Suit", rating: 4, air: "6", weight: "2", cost: "$30,000", comment: "Air Supply 6, heavy" },
  { name: "Weyland-Yutani APEsuit", rating: 3, air: "4", weight: "1", cost: "$5,000", comment: "Survival +3, Air Supply 4" },
  { name: "P-5000 Power Loader", rating: 3, air: "—", weight: "—", cost: "$50,000", comment: "Heavy Machinery & Close Combat +3 (Heavy Machinery 2+ to use)" }
];

// Signature-item, agenda, buddy and rival prompts used by the Alien story tab.
var ALIEN_TRAITS = [
  { key: "agenda", label: "Personal Agenda", prompt: "Your private angle — pick one from your career or invent your own. Advance it despite risk or cost to earn a bonus XP." },
  { key: "signature", label: "Signature Item", prompt: "A personal object that grounds you. Once per session you can interact with it to reduce your Stress Level by one (slow action). Androids don't have one." },
  { key: "buddy", label: "Buddy", prompt: "The one crew member you trust. Making a sacrifice or taking a big risk for your Buddy is its own reward." },
  { key: "rival", label: "Rival", prompt: "The crew member you don't get along with. Your Rival is a source of drama the GM can lean on." }
];

if (typeof window !== "undefined") {
  window.ALIEN_SKILLS = ALIEN_SKILLS;
  window.ALIEN_CAREERS = ALIEN_CAREERS;
  window.ALIEN_TALENTS = ALIEN_TALENTS;
  window.ALIEN_WEAPONS = ALIEN_WEAPONS;
  window.ALIEN_ARMOR = ALIEN_ARMOR;
  window.ALIEN_TRAITS = ALIEN_TRAITS;
}
