// ─────────────────────────────────────────────────────────────────────────────
// ALIEN RPG (Free League) — a variant of the Year Zero Engine. Data for the
// "alien" mode of the YZE character sheet: its own 12 skills, nine careers,
// career + general talents, and the Alien weapon/armor set. Sourced from the
// ALIEN RPG Evolved Edition rulebook (Free League).
//
// Alien differs from generic YZE core: Stress counts UP (stress dice add to your
// pool; a 1 on a Stress Die triggers a Stress Response), Health = ⌈(Str+Agi)/2⌉,
// Resolve = ⌈(Wits+Emp)/2⌉ (subtracted on Stress & Panic rolls), and characters
// take a career + talents + a signature item.
//
// Browser runtime globals — every top-level assigns window.X = X. Keep in sync
// with lib/data/yze-alien-data.ts.
// ─────────────────────────────────────────────────────────────────────────────

var ALIEN_SKILLS = [
  { name: "Heavy Machinery", attr: "STR", desc: "Operate and repair heavy machines, force open doors, use industrial equipment and power loaders." },
  { name: "Close Combat", attr: "STR", desc: "Fight hand-to-hand or with a melee weapon at Adjacent range." },
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
    talents: ["Banter", "Overkill", "Precise Shooter"],
    signature: ["Bullet that you survived", "Lost friend's dog tags", "Trophy from a defeated enemy"],
    gear: "M41A Pulse Rifle or M56A2 Smart Gun; M314 Motion Tracker or 2 G2 Electroshock Grenades; IRC MK.35 Pressure Suit or M3 Personnel Armor; Signal Flare or Deck of cards. $D6×100 cash.",
    agendas: ["You are a decorated hero and need to defend your reputation, at all costs.", "You once helped cover up a war crime — no-one must ever know.", "The death of your buddy has spooked you; you secretly fear combat now and must overcome it."],
    names: ["Marcus Mullaney", "Nik Elson", "Vic Pasengrau", "Kimi Diem", "Tara Zanelli", "Chrissy Lopez"] },
  { name: "Colonial Marshal", key: "WITS", skills: ["Observation", "Ranged Combat", "Command"],
    talents: ["Authority", "Investigator", "Subdue"],
    signature: ["Photo of a loved one", "Dented flask with an inscription", "News clipping of an unsolved case"],
    gear: ".357 Magnum Revolver or Armat Model 37A2 pump-action; Binoculars or Hi-beam flashlight; Personal medkit or Stun baton; D6 doses Neversleep or Hand radio. $D6×100 cash.",
    agendas: ["Your longtime partner betrayed you and defected to a crime syndicate. Get even.", "You dream of turning in the badge and settling down in peace. Work towards it.", "You did a bad thing in the past and it has come back to haunt you."],
    names: ["Jack Kitani", "Barrell Klein", "Ivan Mankov", "Akira Kano", "Angela Harris", "Lee-Ann Jenkins"] },
  { name: "Company Agent", key: "WITS", skills: ["Comtech", "Observation", "Manipulation"],
    talents: ["Company Resources", "Cunning", "Personal Safety"],
    signature: ["Letter of corporate authorization", "Divorce papers", "Employee of the Year award"],
    gear: "Leather or Chrome briefcase; Gold-plated pen or Rolex watch; Data transmitter card or M4A3 Service Pistol; D6 doses Neversleep or Naproleve. $2D6×100 cash.",
    agendas: ["You are greedy for power and never miss an opportunity to get ahead.", "The Company is holding back information from you. What? And why?", "You are a nice guy, but the Company is blackmailing you into its dirty work."],
    names: ["Conrad Schmidt", "Alexander Balconi", "Ryan Middlebrook", "Michiko Nogumi", "Sheridan Lamara", "Mercedes Prince"] },
  { name: "Kid", key: "AGI", skills: ["Mobility", "Survival", "Observation"],
    talents: ["Hard to Catch", "Lucky", "Nimble"],
    signature: ["Lunchbox covered in stickers", "Favorite doll or action figure", "Bracelet made by an older sibling"],
    gear: "Fishing line or Laser pointer; Magnet or Radio-controlled car; Yo-yo or Electronic handheld game; Personal locator beacon or Coloring pens. $D6 cash.",
    agendas: ["You want to find an adult you can trust — really trust.", "You have no family left. Make sure you never end up alone again.", "No one gives you anything to do, so you explore, try things out, make your own entertainment."],
    names: ["Chip Harrington", "Hugo Turner", "Jakey Myers", "Meggie Wu", "Maisie Kelly", "Becca David"] },
  { name: "Medic", key: "EMP", skills: ["Mobility", "Observation", "Medical Aid"],
    talents: ["Field Medic", "Nurse", "Surgeon"],
    signature: ["Framed medical certificate", "Letter from son or daughter", "Last psych evaluation: “All clear at last.”"],
    gear: "Surgical kit or IRC MK.50 compression suit; D6 doses Naproleve or Neversleep; Personal medkit or D6 doses experimental X-Drugs; Samani E-Series watch or Hand radio. $D6×100 cash.",
    agendas: ["You are addicted to a strong painkiller. Protect your stash — and your secret.", "You have some unusual (classified) medical reports the Company wants. Find out why.", "You've sworn an oath never to take a life, and you mean it."],
    names: ["Cho Hadfield", "Ken Ibana", "Sullivan Ward", "Ana Kasnavik", "Juno Blanchard", "Katie Aberly"] },
  { name: "Officer", key: "EMP", skills: ["Ranged Combat", "Command", "Manipulation"],
    talents: ["Field Commander", "Frontline Leader", "Pull Rank"],
    signature: ["Ship's cat", "Letter of recommendation", "ICC Commercial Flight Officer license"],
    gear: "M4A3 Service Pistol or Rexim RXF-M5 EVA Pistol; Samani E-Series watch or Binoculars; M314 motion tracker or IRC MK.50 compression suit; Seegson P-DAT or IFF transponder. $2D6×100 cash.",
    agendas: ["You come from an officer family. You need to gain promotion or an award — soon.", "You messed up in the past. Avoid taking the blame for any more mission screw-ups.", "Mistakes are deadly; don't let anyone under your watch screw up. Make sure they understand why."],
    names: ["Eugene Proctor", "Oliver Bryant", "Lloyd T. Darrington", "Wendy Stern", "Julia Kwang", "Camille Kirschner"] },
  { name: "Pilot", key: "AGI", skills: ["Piloting", "Ranged Combat", "Comtech"],
    talents: ["Full Throttle", "Like the Back of Your Hand", "Reckless"],
    signature: ["Dashboard dancer", "Pilot's logbook", "Pilot shades"],
    gear: "M4A3 service pistol or PR-PUT uplink terminal; Hand radio or D6 flares; Maintenance jack or Seegson P-DAT; Seegson system diagnostic device or IRC MK.50 compression suit. $D6×100 cash.",
    agendas: ["It's about pushing the limit. Taking a chance. Taking risks — so take a risk.", "You're stubborn and don't like to back down, even if your friends might get hurt.", "You're a loner, always happier when you can do a task without relying on others."],
    names: ["Casper Edmonton", "Sven Stackman", "Kiel Avari", "Fiona O'Neill", "Constance Navona", "Igraine Turner"] },
  { name: "Roughneck", key: "STR", skills: ["Heavy Machinery", "Stamina", "Close Combat"],
    talents: ["Resilient", "Steady Hands", "True Grit"],
    signature: ["Tool belt", "Photo of partner", "Crucifix or other religious symbol"],
    gear: "Cutting torch or Watatsumi DV-303 bolt gun; D6 doses Hydr8tion or Maintenance jack; Stash of hard liquor or IRC MK.50 compression suit; Hi-beam flashlight or Seegson C-Series magnetic tape recorder. $D6×100 cash.",
    agendas: ["You are a compulsive thrill-seeker. If there is a risk to take, you'll step up and try it.", "You once sacrificed your family for the job. Now you won't let your friends down — ever.", "Downtime matters. If you can grab a beer and some time alone, you're happy."],
    names: ["Mac Masterton", "Kip Tranter", "Charlie Stead", "Sassy Diaz", "Kat Longridge", "Jayden Pace"] },
  { name: "Scientist", key: "WITS", skills: ["Observation", "Survival", "Comtech"],
    talents: ["Analysis", "Inquisitive", "Xenomorphology"],
    signature: ["Albert Einstein Award", "Unfinished scientific paper", "Blackmail letters"],
    gear: "Digital video camera or Hand radio; Seegson P-DAT or Neuro visor; Seegson System Diagnostic Device or Personal Data Transmitter; M314 motion tracker or Personal medkit. $D6×100 cash.",
    agendas: ["Your last project was stolen from you. Now you keep many of your findings secret.", "You hate authority and go out of your way to be uncooperative if possible.", "You find it hard to delegate to others, even if it means taking on extra work."],
    names: ["Viggo Kowalski", "Drew Lancaster", "Travis Torrence", "Elena Sanchez", "Louise Mallory", "Karima Yusef"] }
];

// Career talents (each career offers three; a new PC chooses one) + general talents.
var ALIEN_TALENTS = [
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

// Alien weapons (Evolved Edition appendix) — bonus = gear dice; damage = base
// rating; range = max band; class groups the picker. Explosive/stun noted in special.
// bonus = Modifier (gear dice). range = Evolved min/max band. ammo = Ammo/Power supply rating.
var ALIEN_WEAPONS = [
  // Pistols
  { name: "M4A3 Service Pistol", bonus: "+2", damage: 2, range: "Adjacent–Medium", ammo: "2", weight: "½", cost: "$200", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: "VP-70MA6 Service Pistol", bonus: "+2", damage: 2, range: "Adjacent–Medium", ammo: "2", weight: "¼", cost: "$250", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: ".357 Magnum Revolver", bonus: "+1", damage: 3, range: "Short–Medium", ammo: "1", weight: "1", cost: "$300", special: "", skill: "Ranged Combat", class: "Pistol" },
  { name: "Rexim RXF-M5 EVA Pistol", bonus: "+1", damage: 1, range: "Short–Medium", ammo: "4", weight: "½", cost: "$400", special: "Armor piercing", skill: "Ranged Combat", class: "Pistol" },
  { name: "Weyland ES-4 Electrostatic Pistol", bonus: "+1", damage: 1, range: "Short–Medium", ammo: "1", weight: "½", cost: "$1,000", special: "Stun, armor piercing", skill: "Ranged Combat", class: "Pistol" },
  { name: "Watatsumi DV-303 Bolt Gun", bonus: "−1", damage: 3, range: "Adjacent–Short", ammo: "Single-shot", weight: "1", cost: "$400", special: "Armor piercing", skill: "Ranged Combat", class: "Pistol" },
  // Rifles
  { name: "Armat M41A Pulse Rifle", bonus: "+2", damage: 2, range: "Short–Long", ammo: "3", weight: "1", cost: "$1,200", special: "Armor piercing, full auto, grenade launcher", skill: "Ranged Combat", class: "Rifle" },
  { name: "F44AA Pulse Rifle", bonus: "+3", damage: 2, range: "Short–Long", ammo: "3", weight: "1", cost: "$1,500", special: "Armor piercing, full auto, unreliable", skill: "Ranged Combat", class: "Rifle" },
  { name: "AK-4047 Pulse Assault Rifle", bonus: "+1", damage: 2, range: "Short–Long", ammo: "2", weight: "1", cost: "$600", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Rifle" },
  { name: "M42A Scope Rifle", bonus: "+3", damage: 2, range: "Medium–Extreme", ammo: "2", weight: "1", cost: "$1,000", special: "Armor piercing", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat M41AE2 Heavy Pulse Rifle", bonus: "+2", damage: 2, range: "Medium–Extreme", ammo: "4", weight: "2", cost: "$1,500", special: "Armor piercing, full auto", skill: "Ranged Combat", class: "Rifle" },
  { name: "M56A2 Smartgun", bonus: "+3", damage: 3, range: "Short–Long", ammo: "3", weight: "3", cost: "$6,000", special: "Armor piercing, full auto, smart sight", skill: "Ranged Combat", class: "Rifle" },
  { name: "Armat Model 37A2 12 Gauge Pump Action Shotgun", bonus: "+2", damage: 3, range: "Adjacent–Short", ammo: "1", weight: "1", cost: "$500", special: "", skill: "Ranged Combat", class: "Rifle" },
  { name: "SpaceSub ASSO-400 Harpoon Gun", bonus: "—", damage: 1, range: "Short–Medium", ammo: "Single-shot", weight: "1", cost: "$300", special: "Harpoon effect", skill: "Ranged Combat", class: "Rifle" },
  // Heavy weapons
  { name: "M240 Incinerator Unit", bonus: "+1", damage: 2, range: "Short", ammo: "2", weight: "1", cost: "$500", special: "Fire effect", skill: "Ranged Combat", class: "Heavy" },
  { name: "Armat XM99A Phased Plasma Pulse Rifle", bonus: "—", damage: 4, range: "Medium–Extreme", ammo: "1", weight: "2", cost: "$20,000", special: "Armor piercing, aim needed", skill: "Ranged Combat", class: "Heavy" },
  { name: "M5A3 RPG Launcher", bonus: "−1", damage: 7, range: "Medium–Extreme", ammo: "Single-shot", weight: "2", cost: "$1,800", special: "Armor piercing, aim needed", skill: "Ranged Combat", class: "Heavy" },
  { name: "Armat U1 Grenade Launcher", bonus: "+1", damage: 2, range: "Medium–Long", ammo: "1", weight: "½", cost: "$600", special: "Explosive; can fire smoke and Electroshock grenades", skill: "Ranged Combat", class: "Heavy" },
  { name: "M40 HEDP Hand Grenade", bonus: "—", damage: 2, range: "Short–Medium", ammo: "Single use", weight: "¼", cost: "$60", special: "Explosive", skill: "Ranged Combat", class: "Heavy" },
  { name: "G2 Electroshock Grenade", bonus: "—", damage: 2, range: "Short–Medium", ammo: "Single use", weight: "¼", cost: "$400", special: "Explosive, stun", skill: "Ranged Combat", class: "Heavy" },
  { name: "Seismic Survey Charge", bonus: "—", damage: 3, range: "Short–Medium", ammo: "Single use", weight: "1", cost: "$200", special: "Explosive", skill: "Ranged Combat", class: "Heavy" },
  { name: "UA 571-C Sentry Gun", bonus: "—", damage: 4, range: "Short–Long", ammo: "5", weight: "—", cost: "$12,000", special: "Armor piercing, full auto, automation", skill: "Ranged Combat", class: "Heavy" },
  // Close combat
  { name: "Unarmed Attack", bonus: "—", damage: 1, range: "Adjacent", ammo: "—", weight: "—", cost: "—", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Blunt Instrument", bonus: "+1", damage: 1, range: "Adjacent", ammo: "—", weight: "1", cost: "—", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Combat Knife", bonus: "+1", damage: 2, range: "Adjacent", ammo: "—", weight: "½", cost: "$50", special: "", skill: "Close Combat", class: "Close Combat" },
  { name: "Fire Axe", bonus: "—", damage: 2, range: "Adjacent", ammo: "—", weight: "1", cost: "$60", special: "Armor piercing", skill: "Close Combat", class: "Close Combat" },
  { name: "Stun Baton", bonus: "+1", damage: 1, range: "Adjacent", ammo: "Power 2", weight: "1", cost: "$80", special: "Stun effect", skill: "Close Combat", class: "Close Combat" },
  { name: "Cutting Torch", bonus: "−1", damage: 3, range: "Adjacent", ammo: "Power 3", weight: "1", cost: "$300", special: "Armor piercing", skill: "Close Combat", class: "Close Combat" }
];

// Suits & armor (Evolved Edition). rating = Armor Rating; air = Air Supply.
var ALIEN_ARMOR = [
  { name: "M3 Personnel Armor", rating: 2, air: "—", weight: "1", cost: "$1,200", comment: "Comm unit, PDT" },
  { name: "Kevlar Riot Vest", rating: 1, air: "—", weight: "½", cost: "$600", comment: "" },
  { name: "IRC Mk.50 Compression Suit", rating: 0, air: "5", weight: "1", cost: "$4,000", comment: "Vacuum protection, comm unit, head light, −1 to Mobility" },
  { name: "IRC Mk.35 Pressure Suit", rating: 1, air: "4", weight: "2", cost: "$2,000", comment: "Vacuum protection, −2 to Mobility" },
  { name: "Eco All-World Survival Suit", rating: 2, air: "6", weight: "2", cost: "$30,000", comment: "Vacuum protection, comm unit, head light, +2 to Mobility in zero-G" },
  { name: "Weyland-Yutani APEsuit", rating: 1, air: "4", weight: "1", cost: "$5,000", comment: "Armor 3 vs. acid, facehug protection, Survival +2" },
  { name: "P-5000 Power Loader", rating: 1, air: "—", weight: "—", cost: "$50,000", comment: "+3 dice to Heavy Machinery & Close Combat; close combat base damage 3" }
];

// Signature-item, agenda, buddy and rival prompts used by the Alien story tab.
var ALIEN_TRAITS = [
  { key: "agenda", label: "Personal Agenda", prompt: "Your private angle — pick one from your career or invent your own. Advancing it earns a Story Point in cinematic play (spend one for an automatic success; you can hold at most 3), or a bonus XP in campaign play." },
  { key: "signature", label: "Signature Item", prompt: "A personal object that grounds you. Once per session you can interact with it to reduce your Stress Level by one (slow action). Androids don't have one." },
  { key: "buddy", label: "Buddy", prompt: "The one crew member you trust. Making a sacrifice or taking a big risk for your Buddy is its own reward." },
  { key: "rival", label: "Rival", prompt: "The crew member you don't get along with. Your Rival is a source of drama the GM can lean on." }
];

// General gear (Evolved Edition equipment appendix). supply = Power rating where present.
var ALIEN_GEAR = [
  // Computer Mainframes
  { name: "MU/TH/UR 6000", category: "Computer Mainframes", weight: "—", cost: "$2,500,000", effect: "Ship mainframe. Comtech 5, Piloting 5, Observation 5." },
  { name: "MU/TH/UR 6500", category: "Computer Mainframes", weight: "—", cost: "$3,500,000", effect: "Ship mainframe. Comtech 6, Piloting 5, Observation 6." },
  { name: "MU/TH/UR 7000", category: "Computer Mainframes", weight: "—", cost: "$5,000,000", effect: "Ship mainframe. Comtech 7, Piloting 6, Observation 7." },
  { name: "MU/TH/UR 9000", category: "Computer Mainframes", weight: "—", cost: "$50,000,000", effect: "Ship mainframe. Comtech 10, Piloting 8, Observation 10, Ranged Combat 9." },
  { name: "A.P.O.L.L.O.", category: "Computer Mainframes", weight: "—", cost: "$2,000,000", effect: "Ship mainframe. Comtech 5, Piloting 4, Observation 5." },
  // Data Storage
  { name: "Long-Data Discs", category: "Data Storage", weight: "—", cost: "$30", effect: "Stores up to 10 zettabytes." },
  { name: "Magnetic Tape", category: "Data Storage", weight: "—", cost: "$5", effect: "Stores up to 120 terabytes." },
  // Comms & Diagnostics
  { name: "Computer Terminal", category: "Comms & Diagnostics", weight: "—", cost: "Varies", effect: "Access and process data (Comtech roll)." },
  { name: "PR-PUT Uplink Terminal", category: "Comms & Diagnostics", weight: "1", cost: "$9,000", effect: "Remotely control a spacecraft (Comtech roll)." },
  { name: "Seegson C-Series Recorder", category: "Comms & Diagnostics", weight: "1", cost: "$80", effect: "Record and play music (Manipulation +1)." },
  { name: "Samani E-Series Watch", category: "Comms & Diagnostics", weight: "—", cost: "$50", effect: "Tracks time, oxygen and pressure (Survival +1)." },
  { name: "Comm Unit", category: "Comms & Diagnostics", weight: "—", cost: "$50", effect: "Enables remote team communication." },
  { name: "Personal Data Transmitter (PDT)", category: "Comms & Diagnostics", weight: "—", cost: "$100", effect: "Monitors location and vitals (Medical Aid +1)." },
  { name: "IFF Transponder", category: "Comms & Diagnostics", weight: "—", cost: "$250", effect: "Prevents Sentry Gun friendly fire." },
  { name: "Data Transmitter Cards", category: "Comms & Diagnostics", weight: "—", cost: "$50", effect: "Transfer audiovisual data (Comtech +1)." },
  { name: "Seegson P-DAT", category: "Comms & Diagnostics", weight: "½", cost: "$500", effect: "Coordinate info for field teams (Command +1)." },
  { name: "Seegson System Diagnostic Device", category: "Comms & Diagnostics", weight: "1", cost: "$300", effect: "Troubleshoot computer systems (Comtech +2)." },
  { name: "HoloTab", category: "Comms & Diagnostics", weight: "—", cost: "$100,000", effect: "Strategic analysis platform (Observation and Command +2)." },
  { name: "Modular Computing Device", category: "Comms & Diagnostics", weight: "—", cost: "$8,000", effect: "Full audiovisual holographic projector (Manipulation +2)." },
  // Vision Devices
  { name: "Flashlight", category: "Vision Devices", weight: "½", cost: "$40", effect: "Removes the effects of darkness in a zone. Short range." },
  { name: "Optical Scope", category: "Vision Devices", weight: "—", cost: "$60", effect: "+1 range category for aimed shots with a pistol or rifle." },
  { name: "Binoculars", category: "Vision Devices", weight: "½", cost: "$100", effect: "+2 dice to Observation at Long range or more. Extreme range." },
  { name: "M314 Motion Tracker", category: "Vision Devices", weight: "1", cost: "$1,200", supply: "Power 5", effect: "Detects motion in stealth mode. Long range." },
  { name: "M316 Motion Tracker", category: "Vision Devices", weight: "—", cost: "$3,000", supply: "Power 3", effect: "Detects motion in stealth mode. Medium range." },
  { name: "Neuro Visor", category: "Vision Devices", weight: "1", cost: "$10,000", supply: "Power 5", effect: "Monitor or interact with a hypersleep patient (Comtech roll). Long range." },
  { name: "\"Pups\" Parameter Uplink Spectrograph Mapping Device", category: "Vision Devices", weight: "1", cost: "$50,000", supply: "Power 5", effect: "Scans one zone per stretch in stealth mode, auto-detecting enemies unless hidden. Extreme range." },
  { name: "Seegson Microview-2000SE", category: "Vision Devices", weight: "½", cost: "$250", effect: "Tracks current location. Extreme range." },
  // Tools
  { name: "Mechanical Cutting Torch", category: "Tools", weight: "1", cost: "$300", supply: "Power 3", effect: "Construction and repairs (Heavy Machinery +2)." },
  { name: "Maintenance Jack", category: "Tools", weight: "1", cost: "$150", effect: "Heavy Machinery +1 die in relevant situations." },
  { name: "Electronic Tools", category: "Tools", weight: "½", cost: "$250", effect: "Comtech +1." },
  { name: "Power Cell", category: "Tools", weight: "¼", cost: "$30", effect: "Restores full power supply to one item." },
  // Medical Supplies
  { name: "Personal Medkit", category: "Medical Supplies", weight: "¼", cost: "$50", effect: "Medical Aid +2 for giving first aid (single use)." },
  { name: "Surgical Kit", category: "Medical Supplies", weight: "1", cost: "$200", effect: "Medical Aid +2 for first aid and surgery on critical injuries. Base damage 2 if used as a weapon." },
  { name: "Pauling MedPod", category: "Medical Supplies", weight: "—", cost: "$2,000,000", effect: "First aid and surgery with Medical Aid skill level 12." },
  { name: "AutoDoc", category: "Medical Supplies", weight: "—", cost: "$500,000", effect: "First aid with Medical Aid skill level 8." },
  // Pharmaceuticals
  { name: "Neversleep Pills", category: "Pharmaceuticals", weight: "—", cost: "$2", effect: "Stress Level +1 but removes the need for sleep for a day; stress can't be relieved during that time." },
  { name: "Hydr8tion", category: "Pharmaceuticals", weight: "—", cost: "$5", effect: "Eliminates fatigue from hypersleep." },
  { name: "Naproleve", category: "Pharmaceuticals", weight: "—", cost: "$20", effect: "Reduces Stress Level to zero. Each dose beyond the first in the same shift gives −1 die to all skill rolls until the end of the shift." },
  { name: "Recreational Drugs", category: "Pharmaceuticals", weight: "—", cost: "Varies", effect: "Stress Level +1 or −1. Each dose beyond the first in the same shift gives −1 die to all skill rolls until the end of the shift." },
  // Food & Drink
  { name: "Prefab Meal", category: "Food & Drink", weight: "¼", cost: "$10", effect: "Satisfies food needs for one day." },
  { name: "Water Bottle", category: "Food & Drink", weight: "¼", cost: "$2–$100", effect: "Satisfies water needs for one day." },
  { name: "\"Bug Juice\" Protein Drink", category: "Food & Drink", weight: "¼", cost: "$5", effect: "Satisfies food and water needs for one day." },
  { name: "Candy Bar", category: "Food & Drink", weight: "¼", cost: "$15", effect: "Satisfies food needs for one day." },
  { name: "Coffee", category: "Food & Drink", weight: "—", cost: "$0–$1.50", effect: "Stress Level +1 and postpones fatigue from lack of sleep for one shift." },
  { name: "Colony Specialty Meals", category: "Food & Drink", weight: "¼", cost: "$20–$300", effect: "Satisfies food needs for one day; Stress Level −1." },
  { name: "Beer and Booze", category: "Food & Drink", weight: "¼", cost: "$5–$500", effect: "Stress Level −1. Each dose beyond the first in the same shift gives −1 die to all skill rolls until the end of the shift." }
];

// Bestiary (Evolved Edition ch.10). acid = Acid Splash rating (Xenomorph XX121 only).
var ALIEN_BESTIARY = [
  // Xenomorph XX121
  { name: "Ovomorph (Egg)", group: "Xenomorph XX121", stage: "Stage I", speed: "0", health: "2", skills: "—", armor: "0", acid: "4", notes: "Releases its Facehugger when a non-android host comes within Short range (roll a stress die each round) or disturbs it at Adjacent (Mobility to avoid). Essentially a vat of acid; fire sterilizes it, extreme cold makes it dormant." },
  { name: "The Queen's Egg", group: "Xenomorph XX121", stage: "Stage I", speed: "0", health: "3", skills: "—", armor: "1 (0 vs fire)", acid: "5", notes: "A hardier egg laid directly by a Queen; carries a Royal Facehugger." },
  { name: "Facehugger", group: "Xenomorph XX121", stage: "Stage II", speed: "2", health: "2", skills: "Mobility 8 · Observation 7", armor: "1 (0 vs fire)", acid: "4", notes: "Leaps for the face to implant an embryo. D6 attacks: Skittering Menace, Tail Grapple, Face Grapple, then The Final Embrace (implants; armor/helmet no help except the APEsuit). Destroyed at 0 Health (no crit)." },
  { name: "Praeto-Facehugger", group: "Xenomorph XX121", stage: "Stage II", speed: "2", health: "2", skills: "Mobility 6 · Observation 7", armor: "1 (0 vs fire)", acid: "4", notes: "A slightly larger, less dexterous Facehugger; otherwise identical. Produces a P. praepotens." },
  { name: "Royal Facehugger", group: "Xenomorph XX121", stage: "Stage II", speed: "2", health: "3", skills: "Mobility 8 · Observation 8", armor: "2 (1 vs fire)", acid: "5", notes: "Armored royal variety with serrated fingertips and a bladed tail; produces Queens." },
  { name: "Chestburster", group: "Xenomorph XX121", stage: "Stage III", speed: "2", health: "2", skills: "Mobility 8 · Observation 4", armor: "0", acid: "4", notes: "Bursts from (and kills) the host, then flees to hide and feed on metals before molting to Stage IV within a shift. D6 attacks: Escape, Terrorizing Hiss, Leg Slash, Throat Bite. Destroyed at 0 Health." },
  { name: "Bambi Burster", group: "Xenomorph XX121", stage: "Stage III", speed: "2", health: "2", skills: "Mobility 10 · Observation 4", armor: "0", acid: "4", notes: "A faster Chestburster variant." },
  { name: "Imp", group: "Xenomorph XX121", stage: "Stage III", speed: "2", health: "2", skills: "Mobility 8 · Observation 6", armor: "0", acid: "4", notes: "Immature Praetomorph; on emergence it may mimic the actions of a nearby creature. Matures much faster than a normal Chestburster." },
  { name: "Queenburster", group: "Xenomorph XX121", stage: "Stage III", speed: "2", health: "3", skills: "Mobility 8 · Observation 8", armor: "1 (0 vs fire)", acid: "5", notes: "An embryonic Queen; gestates over days and is born with a partial crest, both sets of arms and legs." },
  { name: "Drone", group: "Xenomorph XX121", stage: "Stage IV", speed: "2", health: "7", skills: "Mobility 8 · Observation 8", armor: "2 (1 vs fire)", acid: "8", notes: "Stealthy ambush hunter (\"Lurker\"). Silent Assassin: −2 dice to Observation rolls to spot it in stealth mode. Shared Stage IV D6 attacks include Hypnotizing Gaze and Headbite (kills on a hit)." },
  { name: "Scout", group: "Xenomorph XX121", stage: "Stage IV", speed: "2", health: "5", skills: "Mobility 10 · Observation 10", armor: "2 (1 vs fire)", acid: "8", notes: "Fast \"Runner\" that seeks hosts and secures a hive; has no dorsal tubes. Can be tricked into running into hazards." },
  { name: "Stalker", group: "Xenomorph XX121", stage: "Stage IV", speed: "2", health: "9", skills: "Mobility 9 · Observation 6", armor: "2", acid: "8", notes: "Praetomorph (P. linesteres); no Queen stage. Feral Hunger: on a damaging attack it immediately makes a second (free) attack on the same target." },
  { name: "Soldier (Warrior)", group: "Xenomorph XX121", stage: "Stage V", speed: "2", health: "8", skills: "Mobility 8 · Observation 8", armor: "2 (1 vs fire)", acid: "10", notes: "Adult form of the Drone; works in groups and carries prey back to the hive. Its tail barb can inject a toxin." },
  { name: "Worker (Weaver)", group: "Xenomorph XX121", stage: "Stage V", speed: "1", health: "4", skills: "Mobility 4 · Observation 4", armor: "1 (0 vs fire)", acid: "6", notes: "Builds and maintains the hive; non-aggressive and easy to take down, offering little resistance." },
  { name: "Sentry", group: "Xenomorph XX121", stage: "Stage V", speed: "2", health: "8", skills: "Mobility 12 · Observation 10", armor: "2 (1 vs fire)", acid: "10", notes: "Adult form of the Scout; a fast wall-and-ceiling climber that will sacrifice itself to protect the Queen." },
  { name: "Praetorian", group: "Xenomorph XX121", stage: "Stage VI", speed: "2", health: "12", skills: "Mobility 5 · Observation 8", armor: "3 (1 vs fire)", acid: "10", notes: "Royal Guard and army commander that coordinates Soldiers; can molt into a new Queen if the hive loses one. Killing it briefly disorients the Soldiers it leads." },
  { name: "Crusher (Charger)", group: "Xenomorph XX121", stage: "Stage VI", speed: "1", health: "20", skills: "Mobility 4 · Observation 5", armor: "5 (3 vs fire) front · 3 (1 vs fire) elsewhere", acid: "10", notes: "Bloated quadrupedal battering ram that plows through light vehicles; poor at climbing or jumping. Charge: 8 base dice, damage 4, armor piercing — can be dodged but not defended against." },
  { name: "Queen", group: "Xenomorph XX121", stage: "Stage VI", speed: "2", health: "18", skills: "Mobility 6* · Observation 12", armor: "4 (2 vs fire)", acid: "10", notes: "Mother of the hive (6 m or more). Lays eggs via ovipositor and commands the hive through pheromones and subsonics. *Mobility 0 while attached to the egg cocoon. Charge: 8 base dice, damage 2, armor piercing." },
  // Neomorph
  { name: "Neomorphic Egg Sac", group: "Neomorph", stage: "Stage I", speed: "0", health: "—", skills: "—", armor: "—", acid: "—", notes: "A bulbous fungal pod; when disturbed it releases a cloud of Neomorphic Motes. Destroyed by severe cold." },
  { name: "Neomorphic Motes", group: "Neomorph", stage: "Stage II", speed: "—", health: "—", skills: "—", armor: "—", acid: "—", notes: "A synchronized swarm of microscopic parasites that enter a host through an orifice or wound. Infection is a disease (virulence −2); on a failed Stamina roll the host reaches Stage III within one shift. Avoid smoke; killed by fire." },
  { name: "Neomorphic Bloodburster", group: "Neomorph", stage: "Stage III", speed: "3", health: "2", skills: "Mobility 9 · Observation 5", armor: "0", acid: "—", notes: "Bursts from (and kills) the host, then flies into a rage. D6 attacks: Escape, Terrifying Hiss, Leg Bite, Throat Bite. Grows into a Juvenile within a few stretches." },
  { name: "Neophyte (Juvenile Neomorph)", group: "Neomorph", stage: "Stage IV", speed: "3", health: "4", skills: "Mobility 10 · Observation 6", armor: "1 (0 vs fire)", acid: "—", notes: "An aggressive pack hunter on all fours. So focused when attacking that it ignores damage to itself until critical; becomes an Adult after one shift." },
  { name: "Adult Neomorph", group: "Neomorph", stage: "Stage V", speed: "2", health: "6", skills: "Mobility 9 · Observation 8", armor: "1 (0 vs fire)", acid: "—", notes: "A gaunt, eyeless stealth hunter with a protruding inner jaw. D6 attacks: Terrifying Hiss, Tail Slash, Deadly Grab, Leaping Attack, Tail Spike, Throat Bite. Short-lived — burns out within about 24 hours." },
  // Other extra-solar species
  { name: "Harvester", group: "Other Species", stage: "", speed: "1", health: "15", skills: "Mobility 4", armor: "5 (2 on the underbelly)", acid: "—", notes: "A behemoth subterranean omnivore (6 m or more). Hidden Behemoth: rests just under the surface and ambushes anyone who walks over it. D6 attacks include Sonar Pulse (stun), Charge, Stampede and Pulverize (instant death). Hit the soft underbelly." },
  { name: "Harvester Juvenile", group: "Other Species", stage: "", speed: "1", health: "4", skills: "Mobility 8", armor: "1", acid: "—", notes: "A mother carries up to 2D6 young under her armor; they leap to her defense, rolling four base dice, base damage 1." },
  { name: "Lion Worm", group: "Other Species", stage: "", speed: "2", health: "8", skills: "Mobility 10 · Observation 8", armor: "1", acid: "—", notes: "Golden-cilia apex ambush predator of Zagreus that burrows through soft earth. Ambush Predator: prey gets −2 dice to Observation to spot it in stealth. D6 attacks include Acrid Pheromones (stun) and Death Roll." },
  { name: "Scorpionid", group: "Other Species", stage: "", speed: "1 land · 3 water", health: "5", skills: "land: Mobility 6 · Observation 6 — water: Mobility 10 · Observation 10", armor: "1 (0 vs firearms)", acid: "—", notes: "A desert/cavern arthropod carnivore of Tanaka 5 and an adept swimmer. Tail Strike poisons (disease, virulence −2); Immobilize inflicts an Impaled Thigh crit. Shells stop melee but not bullets." },
  { name: "The Swarm", group: "Other Species", stage: "", speed: "1 per zone", health: "5 per zone", skills: "—", armor: "Impervious except fire, explosions and electricity", acid: "—", notes: "\"Space locusts\" — a Swarm's Speed equals the number of zones it covers and its Health is 5× that; it cannot be killed, only driven off. D6 attacks include Suffocating Swarm (stun), Feeding Frenzy and Stripped To The Bone (12 base dice, armor piercing)." }
];

// Vehicles (Evolved Edition, Gear & Tech)
var ALIEN_VEHICLES = [
  { name: "Daihotai Series 8×8 Tractor", passengers: "4", maneuver: "—", speed: "2", hull: "6", armor: "3", cost: "$17,000", weapons: "" },
  { name: "Weyland NR-9 Series ATV", passengers: "1", maneuver: "+2", speed: "2", hull: "2", armor: "1", cost: "$3,000", weapons: "" },
  { name: "M577 Armored Personnel Carrier", passengers: "13", maneuver: "+1", speed: "3", hull: "8", armor: "5", cost: "$500,000", weapons: "Phased Plasma Pulse Cannon Turret; 20 mm Gatling Gun Turret" },
  { name: "Aerodyne Automotive Gyrocar", passengers: "5", maneuver: "+3", speed: "3", hull: "4", armor: "1", cost: "$40,000", weapons: "" },
  { name: "UD-4L Cheyenne VTOL Dropship", passengers: "15", maneuver: "+2", speed: "4", hull: "10", armor: "4", cost: "$3,100,000", weapons: "25 mm Gatling Gun; Mk.16 Banshee 70 Rocket Launcher; 7× Hellhound II Missiles; 3× Headlock Air-to-Air Missiles" },
  { name: "WY-37B Cargo Lifter Transport Sled", passengers: "3", maneuver: "−1", speed: "3", hull: "12", armor: "2", cost: "$800,000", weapons: "" }
];

var ALIEN_VEHICLE_WEAPONS = [
  { name: "20 mm Gatling Gun", bonus: "+1", damage: "4", range: "Medium–Long", ammo: "6", cost: "$7,500", special: "Armor piercing, full auto" },
  { name: "25 mm Gatling Gun", bonus: "+1", damage: "4", range: "Medium–Extreme", ammo: "6", cost: "$9,000", special: "Armor piercing, full auto" },
  { name: "Phased Plasma Pulse Cannon Turret", bonus: "−1", damage: "6", range: "Medium–Extreme", ammo: "5", cost: "$54,000", special: "Armor piercing" },
  { name: "Multi-Directional Flame Unit", bonus: "—", damage: "3", range: "Short–Medium", ammo: "4", cost: "$4,200", special: "Fire effect" },
  { name: "Mk.16 Banshee 70 Rocket Launcher", bonus: "—", damage: "3", range: "Medium–Long", ammo: "3", cost: "$48,000", special: "Explosive, full auto" },
  { name: "AGM-220C Hellhound II Tactical Missile", bonus: "+1", damage: "8", range: "Long–Extreme", ammo: "Single-shot", cost: "$76,000", special: "Armor piercing; missile $12,000 each" },
  { name: "AIM-90E Headlock Air-to-Air Missile", bonus: "+2", damage: "6", range: "Long–Extreme", ammo: "Single-shot", cost: "$64,000", special: "Armor piercing; missile $9,000 each" }
];

if (typeof window !== "undefined") {
  window.ALIEN_SKILLS = ALIEN_SKILLS;
  window.ALIEN_CAREERS = ALIEN_CAREERS;
  window.ALIEN_TALENTS = ALIEN_TALENTS;
  window.ALIEN_WEAPONS = ALIEN_WEAPONS;
  window.ALIEN_ARMOR = ALIEN_ARMOR;
  window.ALIEN_TRAITS = ALIEN_TRAITS;
  window.ALIEN_GEAR = ALIEN_GEAR;
  window.ALIEN_BESTIARY = ALIEN_BESTIARY;
  window.ALIEN_VEHICLES = ALIEN_VEHICLES;
  window.ALIEN_VEHICLE_WEAPONS = ALIEN_VEHICLE_WEAPONS;
}
