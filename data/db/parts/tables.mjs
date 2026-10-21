// Dragonbane — random tables for the sheet and the GM tools. Results paraphrased
// where they are rules text; names, numbers and short list entries exact.
// Each table: { id, name, die, page, rows: [{ roll: n | [from, to], text, ...structured }] }

const rows = (list, start = 1) => list.map((r, i) => (typeof r === "string" ? { roll: start + i, text: r } : { roll: start + i, ...r }));

export const DB_GM_TABLES = {
  severeInjuries: {
    id: "severeInjuries", name: "Severe Injuries", die: "D20", page: 51,
    note: "After surviving zero HP, roll CON; on a failure roll here. Healing time halves with a shift of daily medical care from someone who passes a Healing roll. Permanently lost skill levels can be re-learned.",
    rows: [
      { roll: [1, 2], name: "Broken nose", text: "Bane on all Awareness rolls.", heal: "D6 days", banes: ["Awareness"] },
      { roll: [3, 4], name: "Scarred face", text: "Bane on all Performance and Persuasion rolls.", heal: "2D6 days", banes: ["Performance", "Persuasion"] },
      { roll: [5, 6], name: "Teeth knocked out", text: "Performance and Persuasion permanently −2 (to a minimum of 3).", permanent: { Performance: -2, Persuasion: -2 } },
      { roll: [7, 8], name: "Broken ribs", text: "Bane on all skills based on STR or AGL.", heal: "D6 days", banesAttr: ["STR", "AGL"] },
      { roll: [9, 10], name: "Concussion", text: "Bane on all skills based on INT.", heal: "D6 days", banesAttr: ["INT"] },
      { roll: [11, 12], name: "Deep wounds", text: "Bane on all STR- and AGL-based skills, and every such roll deals you D6 damage.", heal: "2D6 days", banesAttr: ["STR", "AGL"] },
      { roll: 13, name: "Broken leg", text: "Movement halved.", heal: "3D6 days" },
      { roll: 14, name: "Broken arm", text: "No two-handed weapons or dual wielding, and a bane on other actions that need both arms, like climbing.", heal: "3D6 days" },
      { roll: 15, name: "Severed toe", text: "Movement permanently −2 (to a minimum of 4).", permanent: { movement: -2 } },
      { roll: 16, name: "Severed finger", text: "All weapon skills permanently −1 (to a minimum of 3).", permanent: { weaponSkills: -1 } },
      { roll: 17, name: "Gouged eye", text: "Spot Hidden permanently −2 (to a minimum of 3).", permanent: { "Spot Hidden": -2 } },
      { roll: 18, name: "Nightmares", text: "Roll to resist fear each shift you sleep; on a failure the shift doesn't count as sleep.", heal: "2D6 days" },
      { roll: 19, name: "Changed personality", text: "Randomly generate a new weakness." },
      { roll: 20, name: "Amnesia", text: "You can't remember who you or the other player characters are — roleplay it.", heal: "D6 days" },
    ],
  },
  fear: {
    id: "fear", name: "Fear", die: "D8", page: 53, note: "A failed WIL roll against a fear attack (pushable, not an action).",
    rows: rows([
      { name: "Enfeebled", text: "Lose 2D6 WP (to zero at least) and become Disheartened.", conditions: ["Disheartened"], wpLoss: "2D6" },
      { name: "Shaken", text: "You become Scared.", conditions: ["Scared"] },
      { name: "Panting", text: "Out of breath with terror: you become Exhausted.", conditions: ["Exhausted"] },
      { name: "Pale", text: "You turn white as a sheet — you and every player character within 10 m who can see you become Scared.", conditions: ["Scared"] },
      { name: "Scream", text: "Your scream gives every player character who hears it a fear attack too (each rolls only once per fear attack)." },
      { name: "Rage", text: "Fear turns to fury: become Angry and attack the source on your next turn, in melee if you can.", conditions: ["Angry"] },
      { name: "Paralyzed", text: "Frozen with terror: no action or movement next turn; roll WIL each following turn (not an action) to break free." },
      { name: "Wild Panic", text: "You flee: dash away from the source on your next turn, and roll WIL each following turn (not an action) to stop." },
    ]),
  },
  magicalMishaps: {
    id: "magicalMishaps", name: "Magical Mishaps", die: "D20", page: 60, note: "Optional rule: rolled when you roll a Demon casting a spell.",
    rows: rows([
      { text: "The magic leaves you Dazed.", conditions: ["Dazed"] },
      { text: "The casting leaves you Exhausted.", conditions: ["Exhausted"] },
      { text: "The energies make you Sickly.", conditions: ["Sickly"] },
      { text: "You lose control and become very Angry.", conditions: ["Angry"] },
      { text: "Demonic visions leave you Scared.", conditions: ["Scared"] },
      { text: "A glimpse beyond the veil leaves you Disheartened.", conditions: ["Disheartened"] },
      { text: "The magic tears at your body: D6 damage per power level." },
      { text: "Your willpower drains away: lose D6 WP per power level." },
      { text: "A magical disease (virulence 3D6) — you and everyone you touch in the next shift are exposed." },
      { text: "A different random spell of yours fires instead, at the same target and power level." },
      { text: "You vomit a frog whenever you lie. Roll D4 each morning; a 1 ends it. Dispel lifts it." },
      { text: "Gold or silver you touch crumbles to dust. Roll D4 each morning; a 1 ends it. Dispel lifts it." },
      { text: "You are blinded, as in total darkness. Roll D4 each morning; a 1 ends it. Dispel lifts it." },
      { text: "Amnesia — you forget who you and your companions are (roleplay it). Roll D4 each morning; a 1 ends it." },
      { text: "The spell also hits a friend or another unintended target; a healing or helping spell affects an enemy." },
      { text: "Backfire: an offensive spell hits you instead; a protective or healing spell deals damage instead." },
      { text: "You turn into an animal (D6: cat, fox, goat, wolf, deer, bear) — animal stats, no speech, your mind intact. Roll D4 each morning; a 1 changes you back." },
      { text: "You become one age category younger (attributes change, skills don't); a young mage becomes a child (−2 STR and CON, minimum 3). Permanent." },
      { text: "You become one age category older (attributes change, skills don't); an old mage becomes frail (−2 STR and CON). Permanent." },
      { text: "Your magic draws a demon from another dimension; it turns up within the shift to attack or cause trouble." },
    ]),
  },
  demonMelee: {
    id: "demonMelee", name: "Demon Roll in Melee", die: "D6", page: 46, note: "Rolling a Demon on a melee attack: you miss, can't push, and may suffer a mishap.",
    rows: rows([
      "You drop your weapon at your feet; picking it up is an action.",
      "You leave yourself open: the enemy gets a free attack that can't be dodged or parried.",
      "Your weapon sticks fast in something; pulling it free takes a STR roll (an action).",
      "Your weapon flies D3+3 m away; you must move and then use an action to pick it up.",
      "You slam your weapon into something hard and damage it — bane on every use until an artisan repairs it.",
      "You hit yourself — roll damage normally, without your damage bonus.",
    ]),
  },
  demonRanged: {
    id: "demonRanged", name: "Demon Roll in Ranged Combat", die: "D6", page: 49, note: "Rolling a Demon on a ranged attack: you miss, can't push, and may suffer a mishap.",
    rows: rows([
      "You drop your weapon at your feet; picking it up is an action.",
      "You're out of arrows and must restock before shooting again (re-roll for slings and thrown weapons).",
      "You hit something valuable or important nearby — the GM decides what.",
      "Your weapon breaks — bane on every use until an artisan repairs it.",
      "You hit a random player character or friendly NPC — roll damage normally, with your damage bonus.",
      "You hit yourself — roll damage normally, without your damage bonus.",
    ]),
  },
  journeyMishaps: {
    id: "journeyMishaps", name: "Journey Mishaps", die: "D12", page: 102, note: "When the pathfinder fails the Bushcraft roll for the shift.",
    rows: rows([
      { name: "Fog", text: "Thick fog halves the distance covered this shift." },
      { name: "Blocking Terrain", text: "Rocks, fallen trees, thickets or floods block the way: everyone rolls Acrobatics to keep going (those who succeed can help); failures make no progress this shift." },
      { name: "Torn Clothes", text: "Thorns, rocks or bog wreck a random character's clothes — they now count as rags." },
      { name: "Lost", text: "Walking in circles: no progress this shift, and the pathfinder must roll Bushcraft (no help) to find the way again." },
      { name: "Dropped Item", text: "A random character drops or breaks an item of the GM's choice." },
      { name: "Mosquito Swarm", text: "Biting insects drive everyone mad: everyone without a cloak becomes Angry." },
      { name: "Sprained Ankle", text: "A random character missteps and takes D6 damage; armor doesn't help, boots reduce it by 2." },
      { name: "Downpour", text: "Rain or a blizzard: everyone without a cloak rolls to withstand cold, and the group must shelter — no progress this shift." },
      { name: "Wasps", text: "The pathfinder treads on a nest: everyone rolls Evade; failures take D6 damage and a condition of their choice." },
      { name: "Landslide", text: "The ground gives way: everyone rolls Evade or takes D10 damage." },
      { name: "Savage Animal", text: "A frightened wolf, bear or other wild animal attacks (see common animals)." },
      { name: "Quicksand", text: "Each character rolls Bushcraft; failures take a condition and must roll again. Someone who already has every condition and fails is lost for good. Those who are free can help." },
    ]),
  },
  hunting: {
    id: "hunting", name: "Hunting", die: "D6", page: 103, note: "After a successful Hunting & Fishing roll to track game; killing it needs a second roll (weapon, or Hunting & Fishing with a trap).",
    rows: rows([
      { name: "Squirrel", text: "Weapon or trap", rations: "1" },
      { name: "Crow", text: "Weapon", rations: "1" },
      { name: "Rabbit", text: "Weapon or trap", rations: "D3" },
      { name: "Fox", text: "Weapon or trap", rations: "D4" },
      { name: "Boar", text: "Weapon — attacks if the hunting roll fails", rations: "2D6" },
      { name: "Deer", text: "Weapon", rations: "2D8" },
    ]),
  },
  leavingSite: {
    id: "leavingSite", name: "Leaving the Adventure Site", die: "D6", page: 107, note: "If the player characters leave an adventure site for at least a shift.",
    rows: [
      { roll: 1, text: "Enemies at the site follow and attack at a good moment." },
      { roll: 2, text: "Enemies get reinforcements — fallen enemies are replaced twice over." },
      { roll: 3, text: "Someone else arrives and clears out the treasure before the player characters return." },
      { roll: [4, 6], text: "Nothing happens." },
    ],
  },
  traps: {
    id: "traps", name: "Typical Traps", die: null, page: 108,
    rows: [
      { name: "Spike Trap", text: "Snaps shut on whoever opens the chest or door: 2D6 piercing damage.", damage: "2D6" },
      { name: "Trapdoor", text: "A hatch drops open under a character: Evade with a bane or take 3D6 falling damage.", damage: "3D6" },
      { name: "Poison Dart Trap", text: "Poisoned darts hit everyone nearby who fails an Awareness roll; the GM sets the poison type and potency." },
    ],
  },
  npc: {
    id: "npc", name: "Creating NPCs", page: 106, note: "Roll one die of each type.",
    columns: [
      { die: "D4", name: "Attitude", values: ["Hostile", "Evasive", "Indifferent", "Friendly"] },
      { die: "D6", name: "Kin", values: ["Human", "Dwarf", "Elf", "Halfling", "Wolfkin", "Mallard"] },
      { die: "D8", name: "Motivation", values: ["Sweet, glittering gold", "Knowledge of the world", "Deep and eternal love", "A lifelong oath", "An injustice that demands retribution", "A life of joy and song", "Blood ties that can never be severed", "Escaping a dark past"] },
      { die: "D10", name: "Profession", values: ["Bard", "Artisan", "Hunter", "Fighter", "Scholar", "Mage", "Merchant", "Knight", "Mariner", "Thief"] },
      { die: "D12", name: "Trait", values: ["Talks too much", "Strange clothes", "Wild-eyed", "Smells bad", "Joker", "Cultist", "A bit childish", "Quiet and difficult", "Demon worshiper", "Obstinate", "Very touchy", "Highly romantic"] },
      { die: "D20", name: "Name (choose one)", values: [
        "Agnar, Jorid, Dareios", "Ragnfast, Ask, Euanthe", "Arnulf, Tyra, Xanthos", "Atle, Liv, Athalia", "Guthorm, Embla, Kleitos",
        "Botvid, Ragna, Astara", "Kale, Turid, Priamus", "Egil, Jorunn, Galyna", "Ingemund, Borghild, Taras", "Gudmund, Gylla, Zenais",
        "Grim, Tora, Hesiod", "Brand, Edda, Liene", "Folkvid, Sigrun, Eupraxia", "Germund, Dagrun, Taras", "Algot, Bolla, Lysandra",
        "Tolir, Yrsa, Kallias", "Hjorvald, Estrid, Isidora", "Ambjorn, Signe, Athos", "Grunn, Tilde, Larysa", "Olgrid, Idun, Nikias",
      ] },
    ],
  },
  // Adventure generator (p.109–111): roll a die of each type for each of the three parts.
  quest: {
    id: "quest", name: "The Quest", page: 109,
    columns: [
      { die: "D4", name: "One day,", values: ["in the gloom of a tavern", "at the first light of dawn", "around the warmth of the campfire", "in the bustle of the marketplace"] },
      { die: "D6", name: "the characters come across", values: ["a messenger", "a letter", "a rumor", "gossip", "an encounter", "an omen"] },
      { die: "D8", name: "from/about/with", values: ["Karvago, a mysterious mage", "Bode, a one-eyed fighter", "Smolla, a sad halfling bard", "Malkar, a curious wolfkin mariner", "Rudbul, a greedy but humorous mallard merchant", "Davanor, a secretive elven hunter", "Veruna, an obsessive female dwarf scholar", "Roena of the Vale, a haughty knight"] },
      { die: "D10", name: "who wants to", values: ["examine", "seek revenge for", "hide", "destroy", "return", "claim", "replace", "protect", "steal", "find"] },
      { die: "D12", name: "a", values: ["magical artifact", "family heirloom", "sword", "treasure", "piece of jewelry", "ring", "stone", "case", "helmet", "book", "grimoire", "pet"] },
      { die: "D20", name: "called", values: ["the Blue Zurak", "the Eye of Kalmander", "Sylrod's Treachery", "the Heart of Ardana", "Gildengrip", "Nighteye", "Brother Gray", "Sira's Enigma", "The Crown of Hjalti", "The Deceiver", "Gringul's Secret", "Windtamer", "The Whetstone of Helox", "Stoltzenkranz", "Wintermoon", "Hallowbane", "Jommelkud", "The Silver Star", "Malkor's Wrath", "Ironside"] },
    ],
  },
  journey: {
    id: "journey", name: "The Journey", page: 110,
    columns: [
      { die: "D4", name: "The journey is", values: ["easy with plenty of time for song and camaraderie", "eventful with unexpected encounters and challenges", "arduous with unpredictable weather and inaccessible roads", "hard and miserable"] },
      { die: "D6", name: "and ends", values: ["in the shadow of a mountain", "in the darkness of the forest", "in a soggy bog", "at a black lake", "at the foot of a hill", "on the bank of a river"] },
      { die: "D8", name: "There is a/an", values: ["ancient", "abandoned", "forgotten", "overgrown", "dilapidated", "hidden", "strangely shaped", "destroyed"] },
      { die: "D10", name: "", values: ["tower ruin", "catacomb", "tomb", "village", "cave", "castle ruin", "farm", "hill", "pond", "chasm"] },
      { die: "D12", name: "surrounded by", values: ["a swamp", "thick fog", "dark gnarled trees", "heavy rain clouds", "icy gales", "a lingering stench", "the remains of dead animals", "a scorched wasteland", "standing stones", "strange symbols", "a field of ruins", "swaying reeds"] },
      { die: "D20", name: "The place is called", values: ["Bark's Blood", "Barrenstone", "Nightpit", "Melka's Gift", "Gurge's Den", "Stonehand's Watch", "Vidergard", "Frost's Sphere", "Oakenhand", "Herod's Water", "Kil's Shore", "Feris' Demise", "the Bridge of Saar", "Birchholm", "Witherland", "Beaver's Howl", "Coppergate", "Barra's Grove", "Ashencleft", "Stormhaven"] },
    ],
  },
  site: {
    id: "site", name: "The Adventure Site", page: 111,
    columns: [
      { die: "D4", name: "The way in is", values: ["easy – no one locked the door", "hidden and hard to find", "challenging – something is lurking here", "dangerous – a trap has been set"] },
      { die: "D6", name: "There is", values: ["a flooded chamber", "a blockage of rubble", "a winding stairway leading down into the darkness", "a somber tomb", "a remarkable statue", "a strange mural"] },
      { die: "D8", name: "but also unexpected guests in the form of", values: ["2D8 goblins and", "D6 adventurers and", "D6 wolfkin and", "D8 bandits and", "2D6 orcs and", "D8 cultists and", "D6 dwarves and", "D4 elves and"] },
      { die: "D10", name: "", values: ["a ravenous giant spider", "a curious manticore", "an ill-tempered giant", "D6 jeering harpies", "2D6 patrolling skeletons", "an enigmatic demon", "a flock of vampire bats", "a restless ghost", "an angry troll", "a large minotaur"] },
      { die: "D12", name: "There is a deadly challenge in the form of", values: ["a trapdoor", "a strong poison", "a cave-in", "a dart trap", "a tricky riddle", "a curse that must be lifted", "a jar of toxic gas", "rising water", "a giant boulder", "crushing walls", "a raging fire", "a magic mirror"] },
      { die: "D20", name: "Finally, the player characters must defeat", values: ["Kazan Murg – a mad wizard", "The Devastator – a powerful minotaur", "Princess Nadilara – a terrible wraith", "Zurgush the Red – a tall orc chieftain", "Nightclaw – an evil elf warrior", "Frosch – an undead mallard knight", "Vinjia – an ancient ghost", "Burgos Bloodtooth – a deranged thief king", "Lanja Blackgrip – a cunning goblin chief", "Greenleg – a foul-smelling troll", "Laval Bluestaff – a mysterious sorcerer", "Crag Broadbeard – an aggressive dwarf warrior", "Belsor Bonebreaker – a wicked knight", "Orgog the Defiler – a touchy giant", "Lord Aleyn – a brutal noble", "Hugo of the Vale – a renegade knight", "Bloodwing – a murderous griffin", "The Spike Beast – a bloodthirsty manticore", "Haxenflaugrsten – a corrupting demon", "Orlaugr the Red – a greedy dragon"] },
    ],
  },
};

// Journey, camp and survival rules for the GM tools (p.101–103, p.54).
export const DB_JOURNEY = {
  pace: { foot: 15, mounted: 30, unit: "km per shift", maxShifts: 2, forcedMarch: "A third shift in a day makes you Exhausted; an Exhausted character can't, and nobody travels more than three shifts a day." },
  pathfinder: "Off the road, a pathfinder rolls Bushcraft each shift — bane without a map, boon with a spyglass, an extra bane in very difficult terrain. Failure: a mishap. A Dragon finds a shortcut and doubles the distance.",
  randomEncounter: "Roll once per shift, or whenever it suits the GM.",
  camp: "Everyone rolls Bushcraft to find a resting place (bane without a sleeping fur). A tent gives a boon, and a success lets its occupants sleep without their own rolls. A failed roll means the shift neither counts as sleep nor as a shift rest. No camping in dangerous places.",
  food: {
    hunting: "Needs a ranged weapon or trap. Hunting & Fishing to track, then the hunting table and a second roll to kill.",
    fishing: "Needs fishing gear: Hunting & Fishing gives D4 rations with a rod or D6 with a net.",
    foraging: "Bushcraft (bane in winter, boon in autumn) finds D3 rations of plants.",
    cooking: "Up to ten rations takes a shift and a Bushcraft roll (boon with a field kitchen or real kitchen). Raw meat or fish risks illness (virulence 10); raw plants are safe but take two rations to cover a day.",
  },
  hunger: "Eat a ration a day. A day without food: famished — no healing except by magic and 1 damage per day; at zero HP you starve a day later.",
  cold: "Without enough shelter, roll Bushcraft (usually each shift; each stretch or round in extreme cold): bane without a blanket, boon with a fur. Failure: lose D6 HP and D6 WP and no healing until warm; at zero HP you die at the next roll.",
  sleep: "Sleep a shift each day (not in armor). After three shifts awake, no WP or condition healing and lose D6 WP per further shift; at zero WP you collapse for at least a shift.",
};
