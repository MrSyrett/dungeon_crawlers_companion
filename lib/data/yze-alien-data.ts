// ─────────────────────────────────────────────────────────────────────────────
// ALIEN RPG (Free League) — a variant of the Year Zero Engine, for the "alien"
// mode of the YZE sheet and the /yze/alien reference page. Sourced from the
// ALIEN RPG Evolved Edition rulebook (Free League).
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
  { name: "Colonial Marine", key: "STR", skills: ["Close Combat", "Stamina", "Ranged Combat"], talents: ["Banter", "Overkill", "Precise Shooter"], signature: ["Bullet that you survived", "Lost friend's dog tags", "Trophy from a defeated enemy"], gear: "M41A Pulse Rifle or M56A2 Smart Gun; M314 Motion Tracker or 2 G2 Electroshock Grenades; IRC MK.35 Pressure Suit or M3 Personnel Armor; Signal Flare or Deck of cards.", agendas: ["You are a decorated hero and need to defend your reputation, at all costs.", "You once helped cover up a war crime — no-one must ever know.", "Your buddy's death has spooked you; you secretly fear combat now and must overcome it."], names: ["Marcus Mullaney", "Nik Elson", "Vic Pasengrau", "Kimi Diem", "Tara Zanelli", "Chrissy Lopez"] },
  { name: "Colonial Marshal", key: "WITS", skills: ["Observation", "Ranged Combat", "Command"], talents: ["Authority", "Investigator", "Subdue"], signature: ["Photo of a loved one", "Dented flask with an inscription", "News clipping of an unsolved case"], gear: ".357 Magnum Revolver or Armat Model 37A2 pump-action; Binoculars or Hi-beam flashlight; Personal medkit or Stun baton; D6 doses Neversleep or Hand radio.", agendas: ["Your longtime partner betrayed you and defected to a crime syndicate. Get even.", "You dream of turning in the badge and settling down in peace.", "You did a bad thing in the past and it has come back to haunt you."], names: ["Jack Kitani", "Barrell Klein", "Ivan Mankov", "Akira Kano", "Angela Harris", "Lee-Ann Jenkins"] },
  { name: "Company Agent", key: "WITS", skills: ["Comtech", "Observation", "Manipulation"], talents: ["Company Resources", "Cunning", "Personal Safety"], signature: ["Letter of corporate authorization", "Divorce papers", "Employee of the Year award"], gear: "Leather or Chrome briefcase; Gold-plated pen or Rolex watch; Data transmitter card or M4A3 Service Pistol; D6 doses Neversleep or Naproleve.", agendas: ["You are greedy for power and never miss an opportunity to get ahead.", "The Company is holding back information from you. What? And why?", "You are a nice guy, but the Company is blackmailing you into its dirty work."], names: ["Conrad Schmidt", "Alexander Balconi", "Ryan Middlebrook", "Michiko Nogumi", "Sheridan Lamara", "Mercedes Prince"] },
  { name: "Kid", key: "AGI", skills: ["Mobility", "Survival", "Observation"], talents: ["Hard to Catch", "Lucky", "Nimble"], signature: ["Lunchbox covered in stickers", "Favorite doll or action figure", "Bracelet made by an older sibling"], gear: "Fishing line or Laser pointer; Magnet or Radio-controlled car; Yo-yo or Electronic handheld game; Personal locator beacon or Coloring pens.", agendas: ["You want to find an adult you can trust — really trust.", "You have no family left. Make sure you never end up alone again.", "No one gives you anything to do, so you explore and make your own fun."], names: ["Chip Harrington", "Hugo Turner", "Jakey Myers", "Meggie Wu", "Maisie Kelly", "Becca David"] },
  { name: "Medic", key: "EMP", skills: ["Mobility", "Observation", "Medical Aid"], talents: ["Field Medic", "Nurse", "Surgeon"], signature: ["Framed medical certificate", "Letter from son or daughter", "Last psych evaluation: “All clear at last.”"], gear: "Surgical kit or IRC MK.50 compression suit; D6 doses Naproleve or Neversleep; Personal medkit or D6 doses experimental X-Drugs; Samani E-Series watch or Hand radio.", agendas: ["You are addicted to a strong painkiller. Protect your stash — and your secret.", "You have some unusual (classified) medical reports the Company wants. Find out why.", "You've sworn an oath never to take a life, and you mean it."], names: ["Cho Hadfield", "Ken Ibana", "Sullivan Ward", "Ana Kasnavik", "Juno Blanchard", "Katie Aberly"] },
  { name: "Officer", key: "EMP", skills: ["Ranged Combat", "Command", "Manipulation"], talents: ["Field Commander", "Frontline Leader", "Pull Rank"], signature: ["Ship's cat", "Letter of recommendation", "ICC Commercial Flight Officer license"], gear: "M4A3 Service Pistol or Rexim RXF-M5 EVA Pistol; Samani E-Series watch or Binoculars; M314 motion tracker or IRC MK.50 compression suit; Seegson P-DAT or IFF transponder.", agendas: ["You come from an officer family. You need promotion or an award — soon.", "You messed up in the past. Avoid taking the blame for more screw-ups.", "Mistakes are deadly; don't let anyone under your watch screw up."], names: ["Eugene Proctor", "Oliver Bryant", "Lloyd T. Darrington", "Wendy Stern", "Julia Kwang", "Camille Kirschner"] },
  { name: "Pilot", key: "AGI", skills: ["Piloting", "Ranged Combat", "Comtech"], talents: ["Full Throttle", "Like the Back of Your Hand", "Reckless"], signature: ["Dashboard dancer", "Pilot's logbook", "Pilot shades"], gear: "M4A3 service pistol or PR-PUT uplink terminal; Hand radio or D6 flares; Maintenance jack or Seegson P-DAT; Seegson diagnostic device or IRC MK.50 compression suit.", agendas: ["It's about pushing the limit. Taking a chance. So take a risk.", "You're stubborn and don't like to back down, even if friends might get hurt.", "You're a loner, happier doing a task without relying on others."], names: ["Casper Edmonton", "Sven Stackman", "Kiel Avari", "Fiona O'Neill", "Constance Navona", "Igraine Turner"] },
  { name: "Roughneck", key: "STR", skills: ["Heavy Machinery", "Stamina", "Close Combat"], talents: ["Resilient", "Steady Hands", "True Grit"], signature: ["Tool belt", "Photo of partner", "Crucifix or other religious symbol"], gear: "Cutting torch or Watsumi DV-303 bolt gun; D6 doses Hydr8tion or Maintenance jack; Stash of hard liquor or IRC MK.50 compression suit; Hi-beam flashlight or Seegson C-Series recorder.", agendas: ["You are a compulsive thrill-seeker. If there's a risk, you'll try it.", "You once sacrificed your family for the job. Now you won't let friends down — ever.", "Downtime matters. A beer and some time alone and you're happy."], names: ["Mac Masterton", "Kip Tranter", "Charlie Stead", "Sassy Diaz", "Kat Longridge", "Jayden Pace"] },
  { name: "Scientist", key: "WITS", skills: ["Observation", "Survival", "Comtech"], talents: ["Analysis", "Inquisitive", "Xenomorphology"], signature: ["Albert Einstein Award", "Unfinished scientific paper", "Blackmail letters"], gear: "Digital video camera or Hand radio; Seegson P-DAT or Neuro visor; Seegson diagnostic device or Personal Data Transmitter; M314 motion tracker or Personal medkit.", agendas: ["Your last project was stolen. Now you keep your findings secret.", "You hate authority and go out of your way to be uncooperative.", "You find it hard to delegate, even if it means extra work."], names: ["Viggo Kowalski", "Drew Lancaster", "Travis Torrence", "Elena Sanchez", "Louise Mallory", "Karima Yusef"] },
];

export const ALIEN_TALENTS: AlienTalent[] = [
  { name: "Banter", career: "Colonial Marine", desc: "The Stress Level of you and everyone in Short range drops two steps (instead of one) for every stretch spent in a safe place." },
  { name: "Overkill", career: "Colonial Marine", desc: "When you roll 9+ on a panic roll you can ignore the result and go into overkill — every other PC in the zone must make an immediate panic roll. While in overkill you must attack every turn and can't take cover, dodge, or defend; it ends when you or all enemies in sight are broken." },
  { name: "Precise Shooter", career: "Colonial Marine", desc: "When making a supply roll for ammo, roll two dice fewer than your ammo supply rating, to a minimum of one die." },
  { name: "Authority", career: "Colonial Marshal", desc: "Use Command instead of Manipulation to get someone to bend to your will, and get +2 dice to the roll." },
  { name: "Investigator", career: "Colonial Marshal", desc: "+2 dice to Observation rolls when actively searching for something hidden in a zone (not passive Observation rolls)." },
  { name: "Subdue", career: "Colonial Marshal", desc: "+2 dice when attempting to grapple an opponent in close combat." },
  { name: "Company Resources", career: "Company Agent", desc: "Once per act (cinematic) or session (campaign), gain +1 stress level to produce an item of your choice (weight 1 or less) — you had it all along. The item is not yours; the Company will want it back." },
  { name: "Cunning", career: "Company Agent", desc: "You can roll for Manipulation using Wits instead of Empathy." },
  { name: "Personal Safety", career: "Company Agent", desc: "If you're attacked and another PC or friendly NPC is within Short range, make a Manipulation roll (no action) to make them the target instead of you. Stress level +1 for each use." },
  { name: "Hard to Catch", career: "Kid", desc: "+2 dice to Mobility when dodging an attack." },
  { name: "Lucky", career: "Kid", desc: "Re-roll any death roll or roll for a critical injury once, and choose the result you prefer." },
  { name: "Nimble", career: "Kid", desc: "You can push a skill roll based on Agility twice. Stress level +1 for each push." },
  { name: "Field Medic", career: "Medic", desc: "+2 dice when rolling for Medical Aid to give first aid." },
  { name: "Nurse", career: "Medic", desc: "When you tend to a character recovering from a critical injury, each day counts double. For each shift spent per day you can tend to a number of patients equal to your Medical Aid level." },
  { name: "Surgeon", career: "Medic", desc: "+2 dice when rolling for Medical Aid to treat a critical injury that requires surgery." },
  { name: "Field Commander", career: "Officer", desc: "Use Command to give orders in combat as a quick action instead of a full action." },
  { name: "Frontline Leader", career: "Officer", desc: "+2 dice to Command rolls to rally a broken character." },
  { name: "Pull Rank", career: "Officer", desc: "Use Command to order non-officer NPCs who belong to your organization; on a success they must follow your order, even into harm. Stress level +1 for each use." },
  { name: "Full Throttle", career: "Pilot", desc: "+2 dice to Piloting rolls for accelerating or decelerating a spacecraft." },
  { name: "Like the Back of Your Hand", career: "Pilot", desc: "+2 dice to all Piloting rolls for one specific ship or vehicle model. You can take this talent several times, once per model." },
  { name: "Reckless", career: "Pilot", desc: "You may take +1 stress level before making a skill roll (before pushing). You can still push the roll normally for another +1 stress level." },
  { name: "Resilient", career: "Roughneck", desc: "Roll Strength (attribute only) any time you suffer damage; you can't push it and it doesn't count as an action. Each success eliminates one point of damage." },
  { name: "Steady Hands", career: "Roughneck", desc: "You may choose to skip rolling one or two stress dice in any skill roll. When rolling for stress or panic effects, use your full stress level." },
  { name: "True Grit", career: "Roughneck", desc: "You can push a skill roll based on Strength twice. Stress level +1 for each push." },
  { name: "Analysis", career: "Scientist", desc: "Roll Observation to study an alien artifact or creature examined for at least one stretch; for each success ask the GM one question (answered truthfully, if vaguely). A success reduces nearby PCs' stress one step, a failure raises it by one. One attempt per object." },
  { name: "Inquisitive", career: "Scientist", desc: "You can push a skill roll based on Wits twice. Stress level +1 for each push." },
  { name: "Xenomorphology", career: "Scientist", desc: "When facing an extraterrestrial creature, make an Observation roll (quick action); on a success you realize a potential weakness, if it has any. On a failure, +1 stress level. One attempt per Xenomorph." },
  { name: "Bodyguard", career: "General", desc: "If someone in your zone is hit by an attack, you can spend a quick action to dive in and take the hit instead." },
  { name: "Bonus Shares", career: "General", desc: "+2 dice to Manipulation rolls when negotiating the payment for a job in campaign play." },
  { name: "Calm Breather", career: "General", desc: "When making a supply roll for air, roll two dice fewer than your air supply rating, to a minimum of one die." },
  { name: "Combat Veteran", career: "General", desc: "In combat, you may keep your initiative card from the previous round instead of drawing a new one." },
  { name: "Counselor", career: "General", desc: "Once per stretch, use Manipulation to reduce another PC's stress level in your zone; each success reduces it one extra step. Not on yourself, and not in the same stretch you recover stress." },
  { name: "EVA Specialist", career: "General", desc: "+2 dice to Heavy Machinery and Mobility rolls when spacewalking." },
  { name: "Fast Reflexes", career: "General", desc: "When drawing initiative, draw two cards instead of one and choose which to use; shuffle the other back into the deck." },
  { name: "Gunner", career: "General", desc: "+2 dice to Ranged Combat rolls when firing vehicle-mounted weapons or spaceship armaments." },
  { name: "Hardened", career: "General", desc: "Your maximum Health score is increased by 1. You can choose this talent up to three times." },
  { name: "Haymaker", career: "General", desc: "+2 dice to a Close Combat attack if you sacrifice your quick action for the round." },
  { name: "Martial Arts", career: "General", desc: "When you attack or defend unarmed in Close Combat you can use Agility instead of Strength. You can also make an unarmed attack as a quick action instead of a full action, but at −2 dice." },
  { name: "Last One Standing", career: "General", desc: "You can rally yourself when broken by rolling for Stamina yourself. Only one attempt can be made." },
  { name: "Machinegunner", career: "General", desc: "When firing a burst of fully automatic fire, your stress level does not increase." },
  { name: "Menacing", career: "General", desc: "When threatening someone to do what you want, roll Strength + Manipulation (instead of Empathy) and gain +2 dice." },
  { name: "Navigator", career: "General", desc: "Roll Comtech when plotting a new course for space travel; for each success the trip duration is reduced by 10% (rounded to the nearest whole day)." },
  { name: "Pack Mule", career: "General", desc: "You can carry twice as many items as normal without being encumbered." },
  { name: "Quick Shot", career: "General", desc: "If an enemy makes a ranged attack against you, as a quick action (reaction) take +1 stress level and roll both attacks simultaneously; the shot with the most successes goes off first." },
  { name: "Rapid Fire", career: "General", desc: "You can fire a pistol as a quick action instead of a full action, but at −2 dice." },
  { name: "Second Wind", career: "General", desc: "Anyone who tries to rally you when broken gets +2 dice to their Command roll." },
  { name: "Seen It All", career: "General", desc: "Your Resolve score is increased by 1. You can choose this talent up to three times." },
  { name: "Sensor Operator", career: "General", desc: "+2 dice when rolling for Comtech to operate ship sensors." },
  { name: "Spaceship Commander", career: "General", desc: "As a captain of a spaceship during space combat, +2 dice to Command rolls for initiative and giving orders." },
  { name: "Spaceship Mechanic", career: "General", desc: "+2 dice when you use Heavy Machinery or Comtech to maintain or repair damage to a spacecraft." },
  { name: "Stealthy", career: "General", desc: "Others get −2 dice to Observation rolls when trying to spot you in stealth mode. In groups it has no effect unless everyone has the talent." },
  { name: "Stoic", career: "General", desc: "You can roll for Stamina using Wits instead of Strength." },
  { name: "Survivor", career: "General", desc: "+2 dice to all death rolls." },
  { name: "Tech Savvy", career: "General", desc: "When making a supply roll for electric power, roll two dice fewer than your power supply rating, to a minimum of one die." },
  { name: "Weapon Specialist", career: "General", desc: "Choose one weapon model from the weapon lists; +2 dice when you use it. You can choose this talent several times, once per model (including unarmed)." },
  { name: "Zero-G Training", career: "General", desc: "You don't suffer any of the penalties to skill rolls in zero-G." },
];

export const ALIEN_WEAPONS: AlienWeapon[] = [
  { name: "M4A3 Service Pistol", bonus: "+2", damage: 2, range: "Medium", weight: "½", cost: "$200", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: "VP-70MA6 Service Pistol", bonus: "+2", damage: 2, range: "Medium", weight: "¼", cost: "$250", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: ".357 Magnum Revolver", bonus: "+1", damage: 3, range: "Medium", weight: "1", cost: "$300", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: "Rexim RXF-M5 EVA Pistol", bonus: "+1", damage: 1, range: "Medium", weight: "½", cost: "$400", special: "Armor piercing", skill: "Ranged Combat", class: "Pistol" },
  { name: "Weyland ES-4 Electrostatic Pistol", bonus: "+1", damage: 1, range: "Medium", weight: "½", cost: "$1,000", special: "Stun, armor piercing", skill: "Ranged Combat", class: "Pistol" },
  { name: "Watatsumi DV-303 Bolt Gun", bonus: "−1", damage: 3, range: "Short", weight: "1", cost: "$400", special: "Armor piercing, single-shot", skill: "Ranged Combat", class: "Pistol" },
  { name: "Armat M41A Pulse Rifle", bonus: "+2", damage: 2, range: "Long", weight: "1", cost: "$1,200", special: "Armor piercing, full auto, grenade launcher", skill: "Ranged Combat", class: "Rifle" },
  { name: "F44AA Pulse Rifle", bonus: "+3", damage: 2, range: "Long", weight: "1", cost: "$1,500", special: "Armor piercing, full auto, unreliable", skill: "Ranged Combat", class: "Rifle" },
  { name: "AK-4047 Pulse Assault Rifle", bonus: "+1", damage: 2, range: "Long", weight: "1", cost: "$600", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Rifle" },
  { name: "M42A Scope Rifle", bonus: "+3", damage: 2, range: "Extreme", weight: "1", cost: "$1,000", special: "Armor piercing", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat M41AE2 Heavy Pulse Rifle", bonus: "+2", damage: 2, range: "Extreme", weight: "2", cost: "$1,500", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Rifle" },
  { name: "M56A2 Smartgun", bonus: "+3", damage: 3, range: "Long", weight: "3", cost: "$6,000", special: "Armor piercing, full auto, smart sight", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat Model 37A2 12 Gauge Pump Action Shotgun", bonus: "+2", damage: 3, range: "Short", weight: "1", cost: "$500", special: "", skill: "Ranged Combat", class: "Rifle" },
  { name: "SpaceSub ASSO-400 Harpoon Gun", bonus: "—", damage: 1, range: "Medium", weight: "1", cost: "$300", special: "Harpoon effect, single-shot", skill: "Ranged Combat", class: "Rifle" },
  { name: "M240 Incinerator Unit", bonus: "+1", damage: 2, range: "Short", weight: "1", cost: "$500", special: "Fire effect", skill: "Ranged Combat", class: "Heavy" },
  { name: "Armat XM99A Phased Plasma Pulse Rifle", bonus: "—", damage: 4, range: "Extreme", weight: "2", cost: "$20,000", special: "Armor piercing, aim needed", skill: "Ranged Combat", class: "Heavy" },
  { name: "M5A3 RPG Launcher", bonus: "−1", damage: 7, range: "Extreme", weight: "2", cost: "$1,800", special: "Armor piercing, aim needed, single-shot", skill: "Ranged Combat", class: "Heavy" },
  { name: "Armat U1 Grenade Launcher", bonus: "+1", damage: 2, range: "Long", weight: "½", cost: "$600", special: "Explosive; can fire smoke and Electroshock grenades", skill: "Ranged Combat", class: "Heavy" },
  { name: "M40 HEDP Hand Grenade", bonus: "—", damage: 2, range: "Medium", weight: "¼", cost: "$60", special: "Explosive, single-use", skill: "Ranged Combat", class: "Heavy" },
  { name: "G2 Electroshock Grenade", bonus: "—", damage: 2, range: "Medium", weight: "¼", cost: "$400", special: "Explosive, stun, single-use", skill: "Ranged Combat", class: "Heavy" },
  { name: "Seismic Survey Charge", bonus: "—", damage: 3, range: "Medium", weight: "1", cost: "$200", special: "Explosive, single-use", skill: "Ranged Combat", class: "Heavy" },
  { name: "UA 571-C Sentry Gun", bonus: "—", damage: 4, range: "Long", weight: "—", cost: "$12,000", special: "Armor piercing, full auto, automation", skill: "Ranged Combat", class: "Heavy" },
  { name: "Unarmed Attack", bonus: "—", damage: 1, range: "Engaged", weight: "—", cost: "—", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Blunt Instrument", bonus: "+1", damage: 1, range: "Engaged", weight: "1", cost: "—", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Combat Knife", bonus: "+1", damage: 2, range: "Engaged", weight: "½", cost: "$50", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Fire Axe", bonus: "—", damage: 2, range: "Engaged", weight: "1", cost: "$60", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Stun Baton", bonus: "+1", damage: 1, range: "Engaged", weight: "1", cost: "$80", special: "Stun effect", skill: "Close Combat", class: "Close Combat" },
  { name: "Cutting Torch", bonus: "−1", damage: 3, range: "Engaged", weight: "1", cost: "$300", special: "Armor piercing", skill: "Close Combat", class: "Close Combat" },
];

export const ALIEN_ARMOR: AlienArmor[] = [
  { name: "M3 Personnel Armor", rating: 2, air: "—", weight: "1", cost: "$1,200", comment: "Comm unit, PDT" },
  { name: "Kevlar Riot Vest", rating: 1, air: "—", weight: "½", cost: "$600", comment: "" },
  { name: "IRC Mk.50 Compression Suit", rating: 0, air: "5", weight: "1", cost: "$4,000", comment: "Vacuum protection, comm unit, head light, −1 to Mobility" },
  { name: "IRC Mk.35 Pressure Suit", rating: 1, air: "4", weight: "2", cost: "$2,000", comment: "−2 to Mobility" },
  { name: "Eco All-World Survival Suit", rating: 2, air: "6", weight: "2", cost: "$30,000", comment: "Vacuum protection, comm unit, head light, +2 to Mobility in zero-G" },
  { name: "Weyland-Yutani APEsuit", rating: 1, air: "4", weight: "1", cost: "$5,000", comment: "Armor 3 vs. acid, facehug protection, Survival +2" },
  { name: "P-5000 Power Loader", rating: 1, air: "—", weight: "—", cost: "$50,000", comment: "+3 dice to Heavy Machinery & Close Combat; close combat base damage 3" },
];

// Signature-item, agenda, buddy and rival prompts used by the Alien story tab
// (runtime twin: ALIEN_TRAITS in the .js). Mirrors YzeTrait in yze-data.
export type AlienTrait = { key: string; label: string; prompt: string };
export const ALIEN_TRAITS: AlienTrait[] = [
  { key: "agenda", label: "Personal Agenda", prompt: "Your private angle — pick one from your career or invent your own. Advance it despite risk or cost to earn a bonus XP." },
  { key: "signature", label: "Signature Item", prompt: "A personal object that grounds you. Once per session you can interact with it to reduce your Stress Level by one (slow action). Androids don't have one." },
  { key: "buddy", label: "Buddy", prompt: "The one crew member you trust. Making a sacrifice or taking a big risk for your Buddy is its own reward." },
  { key: "rival", label: "Rival", prompt: "The crew member you don't get along with. Your Rival is a source of drama the GM can lean on." },
];
