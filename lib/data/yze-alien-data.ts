// ─────────────────────────────────────────────────────────────────────────────
// ALIEN RPG (Free League) — a variant of the Year Zero Engine, for the "alien"
// mode of the YZE sheet and the /yze/alien reference page. Sourced from the
// ALIEN RPG Core Rulebook (© 2019 Twentieth Century Fox / Fria Ligan).
// Runtime twin: public/tools-data/yze-alien-data.js — keep the two in sync.
// ─────────────────────────────────────────────────────────────────────────────

export type AlienSkill = { name: string; attr: string; desc: string };
export type AlienCareer = {
  name: string; key: string; skills: string[]; talents: string[];
  signature: string[]; gear: string; agendas: string[]; names: string[];
};
export type AlienTalent = { name: string; career: string; desc: string };
export type AlienWeapon = {
  name: string; bonus: string; damage: number; range: string; weight: string;
  cost: string; special: string; skill: string; class: string;
};
export type AlienArmor = { name: string; rating: number; air: string; weight: string; cost: string; comment: string };

export const ALIEN_SKILLS: AlienSkill[] = [
  { name: "Heavy Machinery", attr: "STR", desc: "Operate and repair heavy machines, force open doors, use power loaders." },
  { name: "Close Combat", attr: "STR", desc: "Fight hand-to-hand or with a melee weapon at Engaged range." },
  { name: "Stamina", attr: "STR", desc: "Endure hardship — resist poison and disease, survive a lethal critical injury." },
  { name: "Mobility", attr: "AGI", desc: "Move under pressure — climb, jump, dodge, sneak, keep your footing." },
  { name: "Ranged Combat", attr: "AGI", desc: "Fire guns and throw weapons at range." },
  { name: "Piloting", attr: "AGI", desc: "Pilot spacecraft, vehicles, and aircraft." },
  { name: "Observation", attr: "WITS", desc: "Spot danger, notice details, read sensors and motion trackers." },
  { name: "Comtech", attr: "WITS", desc: "Operate computers, hack systems, repair electronics, use comms gear." },
  { name: "Survival", attr: "WITS", desc: "Endure hostile environments, find food and shelter, navigate." },
  { name: "Command", attr: "EMP", desc: "Lead and give orders under fire; keep a crew together." },
  { name: "Manipulation", attr: "EMP", desc: "Persuade, deceive, intimidate, and negotiate." },
  { name: "Medical Aid", attr: "EMP", desc: "Perform first aid and surgery, stop bleeding, stabilize the dying." },
];

export const ALIEN_CAREERS: AlienCareer[] = [
  { name: "Colonial Marine", key: "STR", skills: ["Close Combat", "Stamina", "Ranged Combat"], talents: ["Banter", "Overkill", "Past the Limit"], signature: ["Bullet that you survived", "Lost friend's dog tags", "Trophy from a defeated enemy"], gear: "M41A Pulse Rifle or M56A2 Smart Gun; M314 Motion Tracker or 2 G2 Electroshock Grenades; IRC MK.35 Pressure Suit or M3 Personnel Armor; Signal Flare or Deck of cards.", agendas: ["You are a decorated hero and need to defend your reputation, at all costs.", "You once helped cover up a war crime — no-one must ever know.", "Your buddy's death has spooked you; you secretly fear combat now and must overcome it."], names: ["Marcus Mullaney", "Nik Elson", "Vic Pasengrau", "Kimi Diem", "Tara Zanelli", "Chrissy Lopez"] },
  { name: "Colonial Marshal", key: "WITS", skills: ["Observation", "Ranged Combat", "Manipulation"], talents: ["Authority", "Investigator", "Subdue"], signature: ["Photo of a loved one", "Dented flask with an inscription", "News clipping of an unsolved case"], gear: ".357 Magnum Revolver or Armat Model 37A2 pump-action; Binoculars or Hi-beam flashlight; Personal medkit or Stun baton; D6 doses Neversleep or Hand radio.", agendas: ["Your longtime partner betrayed you and defected to a crime syndicate. Get even.", "You dream of turning in the badge and settling down in peace.", "You did a bad thing in the past and it has come back to haunt you."], names: ["Jack Kitani", "Barrell Klein", "Ivan Mankov", "Akira Kano", "Angela Harris", "Lee-Ann Jenkins"] },
  { name: "Company Agent", key: "WITS", skills: ["Comtech", "Observation", "Manipulation"], talents: ["Cunning", "Personal Safety", "Take Control"], signature: ["Letter of corporate authorization", "Divorce papers", "Employee of the Year award"], gear: "Leather or Chrome briefcase; Gold-plated pen or Rolex watch; Data transmitter card or M4A3 Service Pistol; D6 doses Neversleep or Naproleve.", agendas: ["You are greedy for power and never miss an opportunity to get ahead.", "The Company is holding back information from you. What? And why?", "You are a nice guy, but the Company is blackmailing you into its dirty work."], names: ["Conrad Schmidt", "Alexander Balconi", "Ryan Middlebrook", "Michiko Nogumi", "Sheridan Lamara", "Mercedes Prince"] },
  { name: "Kid", key: "AGI", skills: ["Mobility", "Survival", "Observation"], talents: ["Beneath Notice", "Dodge", "Nimble"], signature: ["Lunchbox covered in stickers", "Favorite doll or action figure", "Bracelet made by an older sibling"], gear: "Fishing line or Laser pointer; Magnet or Radio-controlled car; Yo-yo or Electronic handheld game; Personal locator beacon or Coloring pens.", agendas: ["You want to find an adult you can trust — really trust.", "You have no family left. Make sure you never end up alone again.", "No one gives you anything to do, so you explore and make your own fun."], names: ["Chip Harrington", "Hugo Turner", "Jakey Myers", "Meggie Wu", "Maisie Kelly", "Becca David"] },
  { name: "Medic", key: "EMP", skills: ["Mobility", "Observation", "Medical Aid"], talents: ["Calming Presence", "Compassion", "Field Surgeon"], signature: ["Framed medical certificate", "Letter from son or daughter", "Last psych evaluation: “All clear at last.”"], gear: "Surgical kit or IRC MK.50 compression suit; D6 doses Naproleve or Neversleep; Personal medkit or D6 doses experimental X-Drugs; Samani E-Series watch or Hand radio.", agendas: ["You are addicted to a strong painkiller. Protect your stash — and your secret.", "You have some unusual (classified) medical reports the Company wants. Find out why.", "You've sworn an oath never to take a life, and you mean it."], names: ["Cho Hadfield", "Ken Ibana", "Sullivan Ward", "Ana Kasnavik", "Juno Blanchard", "Katie Aberly"] },
  { name: "Officer", key: "EMP", skills: ["Ranged Combat", "Command", "Manipulation"], talents: ["Field Commander", "Influence", "Pull Rank"], signature: ["Ship's cat", "Letter of recommendation", "ICC Commercial Flight Officer license"], gear: "M4A3 Service Pistol or Rexim RXF-M5 EVA Pistol; Samani E-Series watch or Binoculars; M314 motion tracker or IRC MK.50 compression suit; Seegson P-DAT or IFF transponder.", agendas: ["You come from an officer family. You need promotion or an award — soon.", "You messed up in the past. Avoid taking the blame for more screw-ups.", "Mistakes are deadly; don't let anyone under your watch screw up."], names: ["Eugene Proctor", "Oliver Bryant", "Lloyd T. Darrington", "Wendy Stern", "Julia Kwang", "Camille Kirschner"] },
  { name: "Pilot", key: "AGI", skills: ["Mobility", "Ranged Combat", "Comtech"], talents: ["Full Throttle", "Like the Back of Your Hand", "Reckless"], signature: ["Dashboard dancer", "Pilot's logbook", "Pilot shades"], gear: "M4A3 service pistol or PR-PUT uplink terminal; Hand radio or D6 flares; Maintenance jack or Seegson P-DAT; Seegson diagnostic device or IRC MK.50 compression suit.", agendas: ["It's about pushing the limit. Taking a chance. So take a risk.", "You're stubborn and don't like to back down, even if friends might get hurt.", "You're a loner, happier doing a task without relying on others."], names: ["Casper Edmonton", "Sven Stackman", "Kiel Avari", "Fiona O'Neill", "Constance Navona", "Igraine Turner"] },
  { name: "Roughneck", key: "STR", skills: ["Heavy Machinery", "Stamina", "Close Combat"], talents: ["Resilient", "The Long Haul", "True Grit"], signature: ["Tool belt", "Photo of partner", "Crucifix or other religious symbol"], gear: "Cutting torch or Watsumi DV-303 bolt gun; D6 doses Hydr8tion or Maintenance jack; Stash of hard liquor or IRC MK.50 compression suit; Hi-beam flashlight or Seegson C-Series recorder.", agendas: ["You are a compulsive thrill-seeker. If there's a risk, you'll try it.", "You once sacrificed your family for the job. Now you won't let friends down — ever.", "Downtime matters. A beer and some time alone and you're happy."], names: ["Mac Masterton", "Kip Tranter", "Charlie Stead", "Sassy Diaz", "Kat Longridge", "Jayden Pace"] },
  { name: "Scientist", key: "WITS", skills: ["Observation", "Survival", "Comtech"], talents: ["Analysis", "Breakthrough", "Inquisitive"], signature: ["Albert Einstein Award", "Unfinished scientific paper", "Blackmail letters"], gear: "Digital video camera or Hand radio; Seegson P-DAT or Neuro visor; Seegson diagnostic device or Personal Data Transmitter; M314 motion tracker or Personal medkit.", agendas: ["Your last project was stolen. Now you keep your findings secret.", "You hate authority and go out of your way to be uncooperative.", "You find it hard to delegate, even if it means extra work."], names: ["Viggo Kowalski", "Drew Lancaster", "Travis Torrence", "Elena Sanchez", "Louise Mallory", "Karima Yusef"] },
];

export const ALIEN_TALENTS: AlienTalent[] = [
  { name: "Banter", career: "Colonial Marine", desc: "Resting in a safe place drops your Stress Level and that of crew in Short range two steps per Turn (not one)." },
  { name: "Overkill", career: "Colonial Marine", desc: "On a Panic Roll with enemies in sight you may attack instead of the rolled effect until you or all enemies are Broken; nearby PCs must panic." },
  { name: "Past the Limit", career: "Colonial Marine", desc: "Push any Strength-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Authority", career: "Colonial Marshal", desc: "Use Command instead of Manipulation to bend someone to your will." },
  { name: "Investigator", career: "Colonial Marshal", desc: "Spend a Turn in a location and roll Observation; ask the GM one question per success." },
  { name: "Subdue", career: "Colonial Marshal", desc: "+2 to a close-combat attack that grapples instead of dealing damage." },
  { name: "Cunning", career: "Company Agent", desc: "Push any Wits-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Personal Safety", career: "Company Agent", desc: "Roll Manipulation to make a nearby character suffer an attack or hazard instead of you; raises your Stress by one." },
  { name: "Take Control", career: "Company Agent", desc: "Roll Manipulation using Wits instead of Empathy." },
  { name: "Beneath Notice", career: "Kid", desc: "Re-roll a critical injury on yourself and choose the result you prefer." },
  { name: "Dodge", career: "Kid", desc: "Dodge a close-combat attack (or a creature's signature attack) using Mobility to reduce damage." },
  { name: "Nimble", career: "Kid", desc: "Push any Agility-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Calming Presence", career: "Medic", desc: "Once per Turn reduce another character's Stress by one in a safe place; not on yourself." },
  { name: "Compassion", career: "Medic", desc: "Push any Empathy-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Field Surgeon", career: "Medic", desc: "+2 to Medical Aid when treating someone about to die from a critical injury." },
  { name: "Field Commander", career: "Officer", desc: "Give orders with Command as a fast action instead of a slow action." },
  { name: "Influence", career: "Officer", desc: "Push any Empathy-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Pull Rank", career: "Officer", desc: "Command vs. Manipulation to order non-officers to act; raises your Stress by one each time." },
  { name: "Full Throttle", career: "Pilot", desc: "+2 to Piloting for Accelerate or Decelerate actions." },
  { name: "Like the Back of Your Hand", career: "Pilot", desc: "+2 to Piloting with one chosen vehicle; take several times, once per vehicle." },
  { name: "Reckless", career: "Pilot", desc: "Push any Agility-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Resilient", career: "Roughneck", desc: "Roll Strength when you take damage; each success eliminates one point of damage." },
  { name: "The Long Haul", career: "Roughneck", desc: "Once per Act/session, ignore all panic-triggering symbols from a single stress roll." },
  { name: "True Grit", career: "Roughneck", desc: "Push any Strength-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Analysis", career: "Scientist", desc: "Roll Observation to study an artifact/creature; ask a question per success and reduce nearby PCs' Stress." },
  { name: "Breakthrough", career: "Scientist", desc: "Once per session, auto-pass an Observation roll of your choice." },
  { name: "Inquisitive", career: "Scientist", desc: "Push any Wits-based roll twice, not just once. Each push raises Stress by one." },
  { name: "Bodyguard", career: "General", desc: "Roll Mobility to take a hit meant for someone in Short range." },
  { name: "Calm Breather", career: "General", desc: "Roll two dice fewer than your Supply Level on air supply rolls (min one die)." },
  { name: "Counselor", career: "General", desc: "Once per Turn, use Command to reduce another character's Stress within Short range." },
  { name: "EVA Specialist", career: "General", desc: "+2 to Heavy Machinery and Comtech rolls when spacewalking." },
  { name: "Fast Reflexes", career: "General", desc: "Draw two initiative cards and choose which to use." },
  { name: "Flyweight", career: "General", desc: "Block in close combat using Agility instead of Strength." },
  { name: "Hard Hitter", career: "General", desc: "+2 to Close Combat if you sacrifice your fast action." },
  { name: "Healer", career: "General", desc: "The healing time of critical injuries is halved for you." },
  { name: "Hidden Stash", career: "General", desc: "Begin each session with an extra hidden item of your choice." },
  { name: "Hothead", career: "General", desc: "+2 to opposed Manipulation whenever someone tries to give you orders." },
  { name: "Light Eater", career: "General", desc: "Roll two dice fewer than your Supply Level on food supply rolls (min one die)." },
  { name: "Light Sleeper", career: "General", desc: "You only need to sleep one Shift every two days." },
  { name: "Killer", career: "General", desc: "Swap the ones and tens dice on a human enemy's critical injury roll." },
  { name: "Machinegunner", career: "General", desc: "Firing on fully automatic does not increase your Stress Level." },
  { name: "Menacing", career: "General", desc: "Roll Manipulation using Strength when threatening; on a success they can't demand anything back." },
  { name: "Merciless", career: "General", desc: "Coup de grâce without rolling Empathy; Stress drops one step each time you Break an enemy." },
  { name: "Nerves of Steel", career: "General", desc: "−2 to all Panic Rolls." },
  { name: "Pack Mule", career: "General", desc: "Carry twice as many items as normal without being encumbered." },
  { name: "Quick Draw", career: "General", desc: "Draw your weapon without spending an action." },
  { name: "Rapid Fire", career: "General", desc: "Fire a pistol or rifle as a fast action instead of a slow action, at −2." },
  { name: "Rapid Reload", career: "General", desc: "Reload a weapon as a fast action instead of a slow action." },
  { name: "Second Wind", career: "General", desc: "When Broken, roll Stamina to get one Health back and keep fighting; once per Turn." },
  { name: "Spaceship Commander", career: "General", desc: "As a spaceship captain, draw two initiative cards and choose one." },
  { name: "Spaceship Gunner", career: "General", desc: "+2 to Ranged Combat as a gunner in space combat." },
  { name: "Spaceship Mechanic", career: "General", desc: "+2 to Heavy Machinery or Comtech to repair a spacecraft in space combat." },
  { name: "Stealthy", career: "General", desc: "+2 to Mobility when moving undetected." },
  { name: "Stoic", career: "General", desc: "Roll Stamina using Wits instead of Strength." },
  { name: "Tough", career: "General", desc: "Increase your Health by +2 (max = Strength + 2)." },
  { name: "Watchful", career: "General", desc: "+2 to Observation to spot a sneak attack." },
  { name: "Weapon Specialist", career: "General", desc: "Choose one weapon model; +2 when you use it." },
  { name: "Zero-G Training", career: "General", desc: "+2 to Mobility rolls in zero-G." },
];

export const ALIEN_WEAPONS: AlienWeapon[] = [
  { name: "M4A3 Service Pistol", bonus: "+2", damage: 1, range: "Medium", weight: "½", cost: "$200", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: ".357 Magnum Revolver", bonus: "+1", damage: 2, range: "Medium", weight: "1", cost: "$300", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: "Rexim RXF-M5 EVA Pistol", bonus: "+1", damage: 1, range: "Medium", weight: "½", cost: "$400", special: "Armor piercing", skill: "Ranged Combat", class: "Pistol" },
  { name: "Watatsumi DV-303 Bolt Gun", bonus: "—", damage: 3, range: "Short", weight: "1", cost: "$400", special: "Armor piercing, single-shot", skill: "Ranged Combat", class: "Pistol" },
  { name: "Armat M41A Pulse Rifle", bonus: "+1", damage: 2, range: "Long", weight: "1", cost: "$1,200", special: "Armor piercing, full auto, grenade launcher", skill: "Ranged Combat", class: "Rifle" },
  { name: "AK-4047 Pulse Assault Rifle", bonus: "—", damage: 2, range: "Long", weight: "1", cost: "$500", special: "Full auto", skill: "Ranged Combat", class: "Rifle" },
  { name: "M42A Scope Rifle", bonus: "+2", damage: 2, range: "Extreme", weight: "1", cost: "$1,000", special: "Armor piercing", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat Model 37A2 12 Gauge Pump Action", bonus: "+2", damage: 3, range: "Short", weight: "1", cost: "$500", special: "Armor doubled", skill: "Ranged Combat", class: "Rifle" },
  { name: "SpaceSub ASSO-400 Harpoon Grappling Gun", bonus: "—", damage: 1, range: "Medium", weight: "1", cost: "$300", special: "Armor doubled, single-shot", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat XM99A Phased Plasma Pulse Rifle", bonus: "—", damage: 4, range: "Extreme", weight: "2", cost: "$20,000", special: "Armor piercing, Power Supply 5", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat U1 Grenade Launcher", bonus: "+1", damage: 0, range: "Long", weight: "½", cost: "$600", special: "Blast Power 9; other grenade types", skill: "Ranged Combat", class: "Heavy" },
  { name: "Armat M41AE2 Heavy Pulse Rifle", bonus: "+1", damage: 3, range: "Extreme", weight: "2", cost: "$1,500", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Heavy" },
  { name: "M56A2 Smart Gun", bonus: "+3", damage: 3, range: "Long", weight: "3", cost: "$6,000", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Heavy" },
  { name: "M240 Incinerator Unit", bonus: "—", damage: 2, range: "Medium", weight: "1", cost: "$500", special: "Fire Intensity 9", skill: "Ranged Combat", class: "Heavy" },
  { name: "UA 571-C Sentry Gun", bonus: "+2", damage: 4, range: "Extreme", weight: "—", cost: "$12,000", special: "Armor piercing, full auto, Ranged Combat 8", skill: "Ranged Combat", class: "Heavy" },
  { name: "G2 Electroshock Grenade", bonus: "—", damage: 0, range: "Medium", weight: "½", cost: "$400", special: "Stun effect (−2)", skill: "Ranged Combat", class: "Heavy" },
  { name: "Unarmed Attack", bonus: "—", damage: 1, range: "Engaged", weight: "—", cost: "—", special: "Armor doubled", skill: "Close Combat", class: "Close Combat" },
  { name: "Blunt Instrument", bonus: "+1", damage: 1, range: "Engaged", weight: "1", cost: "—", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Knife", bonus: "—", damage: 2, range: "Engaged", weight: "½", cost: "$50", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Stun Baton", bonus: "+1", damage: 1, range: "Engaged", weight: "½", cost: "$80", special: "Stun effect, Power Supply 5", skill: "Close Combat", class: "Close Combat" },
  { name: "Cutting Torch", bonus: "—", damage: 3, range: "Engaged", weight: "1", cost: "$300", special: "Armor piercing, Power Supply 5", skill: "Close Combat", class: "Close Combat" },
];

export const ALIEN_ARMOR: AlienArmor[] = [
  { name: "M3 Personnel Armor", rating: 6, air: "—", weight: "1", cost: "$1,200", comment: "Built-in comm unit" },
  { name: "IRC Mk.50 Compression Suit", rating: 2, air: "5", weight: "1", cost: "$15,000", comment: "Agility −1, Air Supply 5" },
  { name: "IRC Mk.35 Pressure Suit", rating: 5, air: "4", weight: "2", cost: "$2,000", comment: "Air Supply 4, heavy" },
  { name: "Eco All-World Survival Suit", rating: 4, air: "6", weight: "2", cost: "$30,000", comment: "Air Supply 6, heavy" },
  { name: "Weyland-Yutani APEsuit", rating: 3, air: "4", weight: "1", cost: "$5,000", comment: "Survival +3, Air Supply 4" },
  { name: "P-5000 Power Loader", rating: 3, air: "—", weight: "—", cost: "$50,000", comment: "Heavy Machinery & Close Combat +3" },
];
