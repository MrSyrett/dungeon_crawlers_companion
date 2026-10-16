// The Lord of the Rings Roleplaying (5E) — core character data.
// Mechanics are game facts; all descriptive text is original paraphrase written
// for this app (not rulebook text). Source: The Lord of the Rings Roleplaying
// core rules (Free League Publishing), chapters 2–4.

export const LOTR_ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

// No Arcana / Religion / Survival. History → Old Lore. Medicine moves to INT.
// New: Riddle (INT), Explore / Hunting / Travel (WIS).
export const LOTR_SKILLS = [
  { name: "Acrobatics", ability: "DEX", description: "Keep your footing, tumble, balance on narrow ledges or slippery ground." },
  { name: "Animal Handling", ability: "WIS", description: "Calm, ride, or read the mood of beasts — ponies, horses, hounds." },
  { name: "Athletics", ability: "STR", description: "Climb, jump, swim, and other feats of raw physical effort." },
  { name: "Deception", ability: "CHA", description: "Mislead others with half-truths, disguises, or outright lies." },
  { name: "Explore", ability: "WIS", description: "Find your way through unfamiliar wild country, cope with weather and natural hazards, blaze trails, and pick good campsites.", lotr: true },
  { name: "Hunting", ability: "WIS", description: "Track and take game (or fish, or set snares); read spoor and identify a quarry — even Orcs, Spiders, or Wargs.", lotr: true },
  { name: "Insight", ability: "WIS", description: "Read a person's true intentions, mood, or honesty." },
  { name: "Intimidation", ability: "CHA", description: "Sway others by threats, presence, or sheer force of personality." },
  { name: "Investigation", ability: "INT", description: "Search for clues, deduce how something happened, find what is hidden." },
  { name: "Medicine", ability: "INT", description: "Tend wounds and sickness. In Middle-earth this is an Intelligence skill.", lotr: true },
  { name: "Nature", ability: "INT", description: "Know plants, beasts, weather, and the ways of the natural world." },
  { name: "Old Lore", ability: "INT", description: "Recall the history of bygone days — tales of the Elder Days, lines of kings, lost places and deeds. (Replaces History.)", lotr: true },
  { name: "Perception", ability: "WIS", description: "Notice danger, spot hidden things, hear what others miss." },
  { name: "Performance", ability: "CHA", description: "Sing, recite, play, or tell a tale to move an audience." },
  { name: "Persuasion", ability: "CHA", description: "Win others over with tact, courtesy, and good argument." },
  { name: "Riddle", ability: "INT", description: "Pose or solve riddles, and piece together conclusions from scattered scraps of information by deduction and intuition.", lotr: true },
  { name: "Sleight of Hand", ability: "DEX", description: "Pick pockets, palm objects, perform deft manual tricks." },
  { name: "Stealth", ability: "DEX", description: "Move unseen and unheard; hide from watchful eyes." },
  { name: "Travel", ability: "WIS", description: "Judge the length of a journey, read a map, and size up strangers met on the road. Used by the Guide for pathfinding checks.", lotr: true },
];

// Proficiency bonus by level (levels 1–10; the game is capped at 10th level).
export const LOTR_TABLES = {
  maxLevel: 10,
  standardArray: [15, 14, 13, 12, 10, 8],
  pointBuyCosts: { "8": 0, "9": 1, "10": 2, "11": 3, "12": 4, "13": 5, "14": 7, "15": 9 },
  pointBuyBudget: 27,
  proficiencyByLevel: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4],
  xpByLevel: [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000],
  beyondTenth: "Past 10th level a hero keeps earning XP: for every 10,000 XP beyond 64,000, choose one of — a Craft (slot + craft), a Fighting Style, a Hit Die (d6, +1d6 or 4 + CON max HP; repeatable), a Reward (repeatable), Sneak Attack (1d6), or a Virtue.",
  coinage: "1 gold piece (g) = 10 silver pennies (s); 1 silver penny = 10 copper coins (c). Silver and copper circulate; gold is rare and hoarded.",
  encumbrance: [
    "Carrying more than 5 × STR (lb): encumbered — speed −10 ft., disadvantage on Strength (Athletics), Dexterity (Acrobatics) checks and fatigue saving throws.",
    "Carrying more than 10 × STR (lb), up to maximum capacity: heavily encumbered — speed −20 ft., disadvantage on ability checks, attack rolls and saving throws using STR, DEX or CON.",
    "Maximum carrying capacity and push/drag/lift are figured as usual (15 × STR).",
  ],
  resting: [
    "Long rests can only be taken in a sheltered, safe refuge — a safe haven, a friendly town, or (Loremaster's call) a well-hidden spot in the wild. Not on the road.",
    "During a journey a short rest takes at least 8 hours of sleep or light activity. After the Company stops travelling for 24 hours, short rests return to 1 hour.",
  ],
  magicalSuccess: [
    "Some talents, virtues and artefacts let a hero obtain a magical success on an ability check: an automatic success regardless of the DC, ignoring conditions.",
    "In a contest, a magical success wins unless the other side also scores one.",
    "If an exact roll is needed, a magical success counts as a natural 20.",
    "It lets a hero attempt deeds nearly impossible without supernatural aid — the result should read as plainly uncanny.",
  ],
  inspiration: "Loremasters grant inspiration as usual — especially when a hero is played true to the distinctive features of their background.",
  exhaustion: [
    { level: 1, effect: "Disadvantage on ability checks" },
    { level: 2, effect: "Speed halved" },
    { level: 3, effect: "Disadvantage on attack rolls and saving throws" },
    { level: 4, effect: "Hit point maximum halved" },
    { level: 5, effect: "Speed reduced to 0" },
    { level: 6, effect: "Death" },
  ],
};

export const LOTR_LANGUAGES = ["Westron", "Dalish", "Khuzdul", "Sindarin", "Quenya", "Dunlendish", "Orkish", "Black Speech", "Warg-speech"];

// Standards of living → starting gear (in addition to calling + background kit).
export const LOTR_STANDARDS = [
  { name: "Frugal", cultures: ["Elves of Lindon", "Rangers of the North"], gear: ["Backpack", "Bedroll", "Mess kit", "Tinderbox", "Rations (1 day) ×10", "Waterskin"], coin: "10 s", weight: "40 lb" },
  { name: "Common", cultures: ["Hobbits of the Shire", "Men of Bree"], gear: ["Backpack", "Bedroll", "Mess kit", "Tinderbox", "Torches (bundle of 10)", "Rations (1 day) ×10", "Waterskin", "Rope, hempen (50 feet)"], coin: "15 s", weight: "60 lb" },
  { name: "Prosperous", cultures: ["Bardings", "Dwarves of Durin's Folk"], gear: ["Backpack", "Bedroll", "Mess kit", "Tinderbox", "Lantern, hooded", "Oil (flask) ×3", "Rations, cram (1 day) ×10", "Waterskin", "Rope, silk (50 feet)", "Tent, two-person"], coin: "20 s", weight: "60 lb" },
  { name: "Rich", cultures: [], gear: [], coin: "", weight: "" },
  { name: "Very Rich", cultures: [], gear: [], coin: "", weight: "" },
];

export const LOTR_CONDITIONS = [
  { name: "Blinded", description: "You can't see; checks needing sight fail. Attacks against you have advantage; your attacks have disadvantage." },
  { name: "Charmed", description: "You can't attack the charmer or target it with harmful effects; it has advantage on social checks with you." },
  { name: "Deafened", description: "You can't hear; checks needing hearing fail." },
  { name: "Frightened", description: "Disadvantage on ability checks and attacks while the source of fear is in sight; you can't willingly move closer to it." },
  { name: "Grappled", description: "Speed 0. Ends if the grappler is incapacitated or you are moved out of its reach." },
  { name: "Incapacitated", description: "You can't take actions or reactions." },
  { name: "Invisible", description: "You can't be seen without special senses; attacks against you have disadvantage and yours have advantage." },
  { name: "Paralyzed", description: "Incapacitated; can't move or speak. Fail STR and DEX saves. Attacks against you have advantage; hits within 5 ft. are critical." },
  { name: "Petrified", description: "Turned to stone: incapacitated, unaware, resistant to all damage, immune to poison and disease." },
  { name: "Poisoned", description: "Disadvantage on attack rolls and ability checks." },
  { name: "Prone", description: "Crawl only; disadvantage on attacks. Melee attacks within 5 ft. have advantage against you, ranged attacks disadvantage." },
  { name: "Restrained", description: "Speed 0; attacks against you have advantage, yours have disadvantage; disadvantage on DEX saves." },
  { name: "Stunned", description: "Incapacitated, can't move, speak only falteringly. Fail STR and DEX saves; attacks against you have advantage." },
  { name: "Unconscious", description: "Incapacitated, prone, unaware; drop what you hold. Fail STR and DEX saves; attacks have advantage and hits within 5 ft. are critical." },
  { name: "Exhaustion", description: "Six cumulative levels: 1 disadvantage on checks · 2 speed halved · 3 disadvantage on attacks and saves · 4 HP max halved · 5 speed 0 · 6 death. A long rest removes one level." },
  { name: "Miserable", lotr: true, description: "Shadow points ≥ half your Wisdom score (rounded up). The Company's Fellowship rating drops by 1 while you are miserable, and any d20 roll of 1 or 2 on an ability check, attack roll or saving throw is an automatic failure." },
  { name: "Anguished", lotr: true, description: "Shadow points ≥ your full Wisdom score. Disadvantage on all ability checks, attack rolls and saving throws. Only a bout of madness (during the current Adventuring Phase) clears it." },
];

// ── Heroic cultures ─────────────────────────────────────────────────────────
// Shaped like the D&D species records (lineages = subcultures) so the cloned
// sheet logic reads them, plus LotR fields: asi, standardOfLiving, startingVirtue.
const t = (name, description) => ({ name, description });

export const LOTR_CULTURES = [
  {
    name: "Bardings",
    flavor: "Northmen of noble blood from Dale in Wilderland, who rebuilt their city after Bard slew the Dragon and now trade far and wide. Adventurers often carry gear of superior make; they favour the sword and, after their King, the bow.",
    size: "Medium", speed: 30, darkvision: 0, creatureType: "Humanoid",
    asi: { STR: 1, CHA: 1 },
    age: "18–40", standardOfLiving: "Prosperous", languages: ["Westron", "Dalish"],
    startingVirtue: true,
    traits: [
      t("Ability Score Increase", "Strength +1 and Charisma +1."),
      t("Adventuring Age", "18–40. Bardings seldom set out before 18 and usually go home to their families in their forties."),
      t("Size & Speed", "Medium, 5–6 ft. tall. Walking speed 30 ft."),
      t("Archers of Dale", "You are proficient with the great bow."),
      t("Starting Virtue", "You gain one cultural virtue of your choice (Virtues of the Bardings)."),
      t("Trading People", "You are proficient in Persuasion."),
      t("Languages", "Westron and Dalish (an archaic form of the Common Speech)."),
      t("Standard of Living", "Prosperous."),
    ],
    grants: { skills: ["Persuasion"], weapons: ["Great Bow"] },
    names: {
      female: "Aldrif, Asfrid, Bera, Dagny, Eydis, Frida, Gerda, Gunnhild, Halla, Hild, Ingrith, Kelda, Ragna, Runa, Signy, Solveig, Thora, Una, Vigdis, Walda",
      male: "Aegir, Arn, Brandulf, Erland, Gautarr, Hjalmar, Ingolf, Kol, Leiknir, Lodin, Magni, Munan, Oddmarr, Ottarr, Runolf, Sigmund, Skefill, Steinarr, Ulfarr, Valbrand",
      family: "Patronymic — e.g. Lifstan, son of Leiknir.",
    },
    lineages: [],
    source: "core",
  },
  {
    name: "Dwarves of Durin's Folk",
    flavor: "An ancient, proud and dwindling people who have lately regained some of their greatness, with a King once more under the Lonely Mountain. Many tramp the East-West Road between Erebor and the Blue Mountains. They favour axes and swords; their eastern kin swing great mattocks.",
    size: "Medium", speed: 25, darkvision: 0, creatureType: "Humanoid",
    asi: { CON: 2 },
    age: "50–100", standardOfLiving: "Prosperous", languages: ["Westron", "Khuzdul"],
    startingVirtue: false,
    traits: [
      t("Ability Score Increase", "Constitution +2."),
      t("Adventuring Age", "50–100."),
      t("Size & Speed", "Medium, 4–5 ft. tall. Walking speed 25 ft."),
      t("Axes of the Dwarves", "You are proficient with the battle axe, great axe and mattock."),
      t("Endurance of the Dwarves", "Your hit point maximum increases by 1, and by 1 more each time you gain a level."),
      t("Make Light of Burdens", "Armour never gives you disadvantage on fatigue saving throws, and your carrying capacity (including encumbrance thresholds and push/drag/lift) is doubled."),
      t("Tool Proficiency", "Choose one: jeweller's tools, mason's tools, or smith's tools."),
      t("Languages", "Westron and Khuzdul, the secret tongue of the Dwarves."),
      t("Standard of Living", "Prosperous."),
    ],
    grants: { weapons: ["Axe, Battle", "Axe, Great", "Mattock"], hpPerLevel: 1, toolChoice: ["Jeweller's tools", "Mason's tools", "Smith's tools"] },
    names: {
      female: "Adís, Agda, Bersa, Birna, Dagrún, Dís, Edda, Fenja, Hadda, Ida, Jóra, Kára, Mist, Oda, Ósk, Rán, Tóra, Yrr",
      male: "Anar, Beli, Bláin, Borin, Burin, Farin, Flói, Frár, Frerin, Gróin, Hanar, Lóni, Náli, Nár, Nói, Núr, Póri, Regin, Vidar",
      family: "Dwarves keep a secret true name and take an outer name; great deeds may earn a title (Oakenshield, Ironfoot).",
    },
    lineages: [
      { name: "Dwarf of Erebor", asi: { CHA: 1 }, traits: [
        t("Ability Score Increase", "Charisma +1."),
        t("Wrights of the Mountain", "Gain proficiency with jeweller's, mason's or smith's tools (if already proficient, double your proficiency bonus with them). On INT checks about the origin of jewellery, metal-work or stone-work you count as proficient in Old Lore with double proficiency."),
        t("Extra Language", "Dalish."),
      ] },
      { name: "Dwarf of the Blue Mountains", asi: { INT: 1 }, traits: [
        t("Ability Score Increase", "Intelligence +1."),
        t("Songs of the Halls", "Proficiency in Old Lore and with one musical instrument."),
      ], grants: { skills: ["Old Lore"] } },
      { name: "Dwarf of the Iron Hills", asi: { STR: 1 }, traits: [
        t("Ability Score Increase", "Strength +1."),
        t("Shod with Iron", "Proficiency with all armour and shields."),
      ], grants: { armor: ["Light", "Medium", "Heavy", "Shield"] } },
      { name: "Wandering Dwarf", asi: { WIS: 1 }, traits: [
        t("Ability Score Increase", "Wisdom +1."),
        t("Wandering People", "Proficiency in Travel."),
      ], grants: { skills: ["Travel"] } },
    ],
    source: "core",
  },
  {
    name: "Elves of Lindon",
    flavor: "The Firstborn of the Grey Havens under Círdan the Shipwright, dwelling by the western coasts in the fading years of their kind. Wandering companies are sometimes seen on the roads beyond the Tower Hills. They favour bows and spears, many carry swords, and some keep to the old tradition of the axe.",
    size: "Medium", speed: 30, darkvision: 0, creatureType: "Humanoid",
    asi: { WIS: 2 },
    age: "100–500", standardOfLiving: "Frugal", languages: ["Westron", "Sindarin"],
    startingVirtue: false,
    traits: [
      t("Ability Score Increase", "Wisdom +2."),
      t("Adventuring Age", "100–500. Elves older than 300 are rare on the road — the sea-longing takes them."),
      t("Size & Speed", "Medium, over 6 ft. tall and slender. Walking speed 30 ft."),
      t("Elvish Dreams", "You don't sleep; 4 hours of semiconscious meditation gives the benefit of 8 hours' sleep."),
      t("Elven-skill", "When you are not miserable and make an ability check that adds your proficiency bonus, you can obtain a magical success. Uses = proficiency bonus; regain on a long rest."),
      t("Immortal Folk", "Immune to ageing and disease."),
      t("Keen Eyes of the Elves", "Proficiency in Perception; dim light doesn't impose disadvantage on your sight-based Wisdom (Perception) checks."),
      t("Languages", "Westron and Sindarin."),
      t("Standard of Living", "Frugal."),
    ],
    grants: { skills: ["Perception"] },
    names: {
      female: "Aranel, Arbereth, Calanril, Celenneth, Elnîth, Eraniel, Finduilas, Gilraeth, Idril, Ioreth, Lothíriel, Luindîs, Meneloth, Moriel, Narieth, Tarandîs",
      male: "Amras, Beleganor, Belegon, Calanhir, Carmagor, Dagorhir, Durandir, Edrahil, Fincalan, Fuindor, Galdor, Hallas, Ithildir, Linaith, Mablin, Malanor, Nauros, Orgalad, Pelegorn",
      family: "Elves bear Sindarin names.",
    },
    lineages: [
      { name: "Elves of Lindon", asi: { DEX: 1, INT: 1 }, traits: [
        t("Ability Score Increase", "Dexterity +1 and Intelligence +1."),
        t("Elven-lore", "Proficiency in one of Nature, Old Lore or Performance."),
        t("Shipwrights and Singers", "Proficiency with carpenter's tools, water vehicles, or one musical instrument (your choice)."),
      ] },
    ],
    source: "core",
  },
  {
    name: "Hobbits of the Shire",
    flavor: "A small, merry folk who love tradition and respectability — though since Mr Bilbo Baggins came home, a bolder sort slip away each year to see Elves and mountains. Gentle-seeming but surprisingly tough; when they must fight they choose short swords and hunting bows.",
    size: "Small", speed: 25, darkvision: 0, creatureType: "Humanoid",
    asi: { DEX: 2 },
    age: "25–60", standardOfLiving: "Common", languages: ["Westron"],
    startingVirtue: false,
    traits: [
      t("Ability Score Increase", "Dexterity +2."),
      t("Adventuring Age", "25–60 (coming of age is 33; a reckless tween may go sooner)."),
      t("Size & Speed", "Small, about 3 ft. tall. Walking speed 25 ft."),
      t("Hobbit Elusiveness", "Proficiency in Stealth."),
      t("Hobbit-sense", "Advantage on Intelligence, Wisdom and Charisma saving throws against Shadow."),
      t("Pipe-weed Lore", "Proficiency with pipes."),
      t("Unobtrusive", "You can move through the space of any creature larger than you."),
      t("Languages", "Westron, with a few words of a forgotten older tongue."),
      t("Standard of Living", "Common."),
    ],
    grants: { skills: ["Stealth"], tools: ["Pipe"] },
    names: {
      female: "Adaldrida, Amaranth, Asphodel, Belba, Bell, Camellia, Daisy, Eglantine, Estella, Lily, Marigold, May, Melilot, Myrtle, Pearl, Peony, Primula, Rosamunda, Ruby",
      male: "Andwise, Berilac, Bungo, Doderic, Dudo, Fastred, Ferumbras, Folco, Griffo, Halfred, Isembold, Longo, Marmadas, Mungo, Odo, Otho, Posco, Robin, Sadoc, Tobold, Tolman",
      family: "Baggins, Boffin, Bolger, Bracegirdle, Brandybuck, Brownlock, Burrows, Cotton, Gamgee, Goodbody, Grubb, Hornblower, Maggot, Proudfoot, Sackville, Smallburrow, Took",
    },
    lineages: [
      { name: "Fallohide", asi: { CHA: 1 }, traits: [
        t("Ability Score Increase", "Charisma +1."),
        t("Skill in Language and Song", "Proficiency with calligrapher's supplies, cartographer's tools, or a musical instrument (your choice)."),
      ] },
      { name: "Harfoot", asi: { WIS: 1 }, traits: [
        t("Ability Score Increase", "Wisdom +1."),
        t("Skilful with Tools", "Proficiency with a herbalism kit, mason's tools, or weaver's tools (your choice)."),
      ] },
      { name: "Stoor", asi: { CON: 1 }, traits: [
        t("Ability Score Increase", "Constitution +1."),
        t("Riverside Dweller", "Proficiency with carpenter's tools, water vehicles, or woodcarver's tools (your choice)."),
      ] },
    ],
    source: "core",
  },
  {
    name: "Men of Bree",
    flavor: "Descendants of the oldest Men of Eriador, living in the four villages around Bree-hill where the Great Road meets the Greenway. Short, stocky, cheerful and shrewd; not warlike, they favour simple weapons that began life as tools and hunting gear.",
    size: "Medium", speed: 30, darkvision: 0, creatureType: "Humanoid",
    asi: { WIS: 1, CHA: 1 },
    age: "18–40", standardOfLiving: "Common", languages: ["Westron"],
    startingVirtue: true,
    traits: [
      t("Ability Score Increase", "Wisdom +1 and Charisma +1."),
      t("Adventuring Age", "18–40."),
      t("Size & Speed", "Medium, rarely much over 5 ft. and broad. Walking speed 30 ft."),
      t("Pipe-weed Lore", "Proficiency with pipes."),
      t("See Through a Brick Wall in Time", "Proficiency in Insight."),
      t("Starting Virtue", "You gain one cultural virtue of your choice (Virtues of the Men of Bree)."),
      t("Languages", "Westron (in the local dialect)."),
      t("Standard of Living", "Common."),
    ],
    grants: { skills: ["Insight"], tools: ["Pipe"] },
    names: {
      female: "Daisy, Emma, Etta, Fay, Fern, Flora, Gert, Holly, Lily, Myrtle, Poppy, Rose, Sage, Tilly, Violet",
      male: "Alfred, Artie, Bill, Bob, Carl, Ed, Fred, Giles, Harry, Herb, Larry, Nob, Oswald, Percy, Perry, Sid, Tom",
      family: "Appledore, Asterfire, Bellsap, Butterbur, Cherryborn, Ferny, Foxglow, Goatleaf, Heathertoes, Mugworts, Oakstout, Pickthorn, Rushlight, Sweetroot, Thistlewool, Wayward",
    },
    lineages: [],
    source: "core",
  },
  {
    name: "Rangers of the North",
    flavor: "The last Dúnedain of the North, heirs of Arnor, who walk in disguise among the ruins of their lost kingdom guarding the folk of Eriador from things that come out of the dark. Tall, grim, weather-worn, wise beyond their years; grey or green cloaks over worn helms.",
    size: "Medium", speed: 35, darkvision: 0, creatureType: "Humanoid",
    asi: { STR: 1, CON: 1, WIS: 1 }, asiChoice: { count: 1, amount: 1 },
    age: "20–50", standardOfLiving: "Frugal", languages: ["Westron", "Sindarin"],
    startingVirtue: false,
    traits: [
      t("Ability Score Increase", "Strength, Constitution and Wisdom +1 each, then +1 to one ability of your choice."),
      t("Adventuring Age", "20–50."),
      t("Size & Speed", "Medium, well over 6 ft. Walking speed 35 ft. (long-shanked Dúnedain)."),
      t("Wandering Folk", "Proficiency in two of: Explore, Hunting, Old Lore, Perception, Stealth, Travel."),
      t("Languages", "Westron and Sindarin."),
      t("Standard of Living", "Frugal."),
    ],
    grants: { skillChoice: { count: 2, from: ["Explore", "Hunting", "Old Lore", "Perception", "Stealth", "Travel"] } },
    names: {
      female: "Anwen, Arbereth, Baraniel, Calanril, Elnîth, Finduilas, Gilraen, Idril, Ioreth, Ivorwen, Lothíriel, Meneloth, Morwen, Narniel, Tarandîs",
      male: "Adrahil, Amlaith, Arvegil, Baranor, Belecthor, Bergil, Celepharn, Cirion, Damrod, Dírhael, Eradan, Forlong, Hallas, Hirluin, Ingold, Malvegil, Ohtar, Orodreth, Tarannon, Targon",
      family: "Rangers give their children Sindarin names.",
    },
    lineages: [],
    source: "core",
  },
];

// ── Backgrounds (six per culture) ───────────────────────────────────────────
// Each grants two skills, one tool proficiency (and that tool as starting kit),
// and two Distinctive Features. Players may customise: swap features, any two
// skills + one tool.
const bg = (culture, name, skills, tool, features, description) => ({ culture, name, skillProficiencies: skills, toolProficiencies: [tool], distinctiveFeatures: features, description, source: "core" });

export const LOTR_BACKGROUNDS = [
  bg("Bardings", "Dragon Stories", ["Explore", "Old Lore"], "A musical instrument of your choice", ["Eager", "Proud"], "Raised on tales of Smaug and of the day your family reclaimed its home in Dale. Now the only dragons left are painted on inn-signs, so you went looking for adventure."),
  bg("Bardings", "By Hammer and Anvil", ["Insight", "Intimidation"], "Smith's tools", ["Proud", "Wilful"], "Apprenticed at great cost to a stern Dwarf-smith, you learned that a masterpiece needs your heart as well as your hammer."),
  bg("Bardings", "Healing Hands", ["Medicine", "Travel"], "Herbalism kit or water vehicles", ["Bold", "Generous"], "A boat-hand from Esgaroth who fell sick in far Dorwinion and was nursed back by a stranger — who taught you to save others in turn."),
  bg("Bardings", "Gifted Senses", ["Investigation", "Perception"], "Brewer's supplies or cook's utensils", ["Generous", "Wilful"], "You always notice when something is out of place, and folk began asking for your help — which carried you much farther from home than you expected."),
  bg("Bardings", "A Patient Hunter", ["Hunting", "Nature"], "Leatherworker's tools or woodcarver's tools", ["Bold", "Fierce"], "Your family kept the old ways of hunting rather than trading, and as the Desolation heals the game returns each spring."),
  bg("Bardings", "Wordweaver", ["Deception", "Riddle"], "A gaming set of your choice", ["Eager", "Fair-spoken"], "Not Bard's arrow but the halfling who matched wits with Smaug fired your imagination — you mean to win renown by cunning."),

  bg("Dwarves of Durin's Folk", "Bitter Exile", ["Explore", "Old Lore"], "A musical instrument of your choice", ["Fierce", "Proud"], "Raised on stories of halls lost to Orcs and Dragons in the far North, you mean to go back and set things right."),
  bg("Dwarves of Durin's Folk", "Eloquent Orator", ["Persuasion", "Riddle"], "Calligrapher's supplies", ["Cunning", "Lordly"], "You prefer the songs of cunning to the songs of valour, and seek to bring down your foes by wit."),
  bg("Dwarves of Durin's Folk", "Far Trader", ["Deception", "Travel"], "Land vehicles", ["Cunning", "Proud"], "A mere stripling by Dwarf-reckoning when you followed your kin along the trading roads, you long to see more of the world."),
  bg("Dwarves of Durin's Folk", "The Grief of Azanulbizar", ["Hunting", "Intimidation"], "Smith's tools", ["Fierce", "Stern"], "Your elders remember the horrors of the War of the Dwarves and Orcs; you have sworn justice on all Orc-kind."),
  bg("Dwarves of Durin's Folk", "A Life of Toil", ["Athletics", "Perception"], "Mason's tools", ["Secretive", "Wilful"], "You labour in the mines for base ore while the ancient holds lie in ruin — and watch the dark for any gleam of gold."),
  bg("Dwarves of Durin's Folk", "A Penetrating Gaze", ["Insight", "Investigation"], "Pipes", ["Wary", "Wilful"], "Taught to judge folk by deeds rather than fair words, you have learned to trust your own instincts; liars cannot meet your eye."),

  { ...bg("Elves of Lindon", "The Call of the Sea", [], "A musical instrument of your choice", ["Patient", "Subtle"], "The sea is your second heartbeat, yet you feel some purpose binds you to Middle-earth a while longer."), skillChoice: { count: 2, from: ["Nature", "Old Lore", "Performance"] } },
  bg("Elves of Lindon", "Maker of Ships", ["Acrobatics", "Athletics"], "Carpenter's tools", ["Eager", "Lordly"], "Trained among Círdan's shipwrights, you have lived at the world's edge and now want to go where no ship can take you."),
  bg("Elves of Lindon", "A Merchant Family", ["Persuasion", "Travel"], "Water vehicles", ["Fair-spoken", "Lordly"], "Your kin traded by ship with Gondor's ports; as the Corsairs grow bolder the ships sail south no more, and you turned your feet elsewhere."),
  bg("Elves of Lindon", "Sky-Watcher", ["Explore", "Nature"], "Navigator's tools", ["Patient", "Wary"], "You read the weather from shipboard, and lately sense ill movements in the air coming out of the south-east."),
  bg("Elves of Lindon", "Tower Guard", ["Investigation", "Stealth"], "Cartographer's tools", ["Subtle", "Wary"], "You guard the Tower Hills — and, at Mithrandir's word, keep a secret watch over the borders of the Shire."),
  bg("Elves of Lindon", "Visitor to the Mountains", ["Insight", "Old Lore"], "Jeweller's tools or smith's tools", ["Fair-spoken", "Inquisitive"], "Drawn to the Blue Mountains, you won the grudging trust of a few Dwarves and learned to love their craft."),

  bg("Hobbits of the Shire", "Bucklander", ["Hunting", "Perception"], "Carpenter's tools or water vehicles", ["Rustic", "Wary"], "Raised on the 'wrong side' of the Brandywine, you share your family's queerness and unusual fighting spirit."),
  bg("Hobbits of the Shire", "On Patrol", ["Investigation", "Travel"], "Brewer's supplies", ["Inquisitive", "Wary"], "You tagged along when your Shirriff aunt went beating the bounds — and heard the best stories at the Ivy Bush."),
  bg("Hobbits of the Shire", "Restless Farmer", ["Animal Handling", "Nature"], "Cook's utensils or herbalism kit", ["Faithful", "Rustic"], "A Southfarthing farmer's child who sometimes longs to sleep under the stars in the open fields."),
  bg("Hobbits of the Shire", "Too Many Paths to Tread", ["Athletics", "Explore"], "Mason's tools", ["Eager", "Merry"], "Meant to inherit your father's workshop at 33, you wandered off for months instead — and he secretly approves."),
  bg("Hobbits of the Shire", "Tookish Blood", ["Deception", "Riddle"], "Potter's tools", ["Eager", "Honourable"], "One night you saw Dwarves round a campfire, and something Tookish stirred; you have shunned well-trodden paths ever since."),
  bg("Hobbits of the Shire", "Witty Gentlehobbit", ["Insight", "Persuasion"], "A gaming set of your choice", ["Fair-spoken", "Merry"], "Westfarthing gentry with a family legend of a giant Tree-man — rumours you deflect with a quick joke."),

  bg("Men of Bree", "Crossroads of the North", ["Explore", "Persuasion"], "Cobbler's, leatherworker's, or weaver's tools", ["Faithful", "Generous"], "Your family's tailoring trade serves all who pass through Bree; you finally followed the Road to see where they come from."),
  bg("Men of Bree", "Forest-Dweller", ["Nature", "Stealth"], "Herbalism kit", ["Cunning", "Rustic"], "Raised among the Chetwood near Archet, where old trees whisper and, some nights, Elven voices sing on the wind."),
  bg("Men of Bree", "Gate-Warden", ["Intimidation", "Perception"], "Carpenter's tools or woodcarver's tools", ["Inquisitive", "Patient"], "A woodworker by day, you served long cold nights as one of Bree's gate-wardens."),
  bg("Men of Bree", "No Longer Free from Care and Fear", ["Deception", "Investigation"], "A gaming set or a musical instrument of your choice", ["Inquisitive", "Rustic"], "You have heard the Rangers' stories and know Bree is an island among unseen foes; soon you will go and seek them."),
  bg("Men of Bree", "Off with Dwarves", ["Animal Handling", "Travel"], "Land vehicles", ["Fair-spoken", "Faithful"], "You once minded ponies for Dwarves bound for the Blue Mountains, and came home with a wanderlust that won't let you rest."),
  bg("Men of Bree", "Up the Greenway", ["Old Lore", "Riddle"], "Mason's, potter's, or smith's tools", ["Fair-spoken", "True-hearted"], "Your grandfather came north from beyond the Isen, and his tales of fierce southern kings still stir you."),

  bg("Rangers of the North", "Counsellor", ["Insight", "Riddle"], "Pipes", ["Secretive", "Subtle"], "You were taught that the Enemy thrives on secrets and lies, and you have a knack for seeing through them."),
  bg("Rangers of the North", "Far-Reaching Herald", ["Athletics", "Travel"], "Land vehicles", ["Bold", "True-hearted"], "A tireless wanderer of the North from childhood, now a carrier of tidings among the scattered Rangers."),
  bg("Rangers of the North", "Hunter of Orcs", ["Hunting", "Stealth"], "Leatherworker's tools or woodcarver's tools", ["Bold", "Stern"], "You drive Orc raiders back to their holes — and fear there will never be an end to it."),
  bg("Rangers of the North", "Keeper of Lore", ["Investigation", "Old Lore"], "Calligrapher's supplies", ["Honourable", "True-hearted"], "You keep alive the tale of lost Arnor, and Elrond has let you study in the Last Homely House."),
  bg("Rangers of the North", "Protector of the Land", ["Nature", "Medicine"], "Herbalism kit", ["Honourable", "Subtle"], "Your people's realms are gone; only the land remains — keep it safe, and it keeps you."),
  bg("Rangers of the North", "Watcher on the Border", ["Explore", "Perception"], "Cartographer's tools", ["Secretive", "Stern"], "Sent to watch the edges of your folk's lands, you have seen the Shadow's reach grow — and simple folk stand firm."),
];

export const LOTR_DISTINCTIVE_FEATURES = [
  "Bold", "Cunning", "Eager", "Fair-spoken", "Faithful", "Fierce", "Generous", "Honourable", "Inquisitive", "Lordly",
  "Merry", "Patient", "Proud", "Rustic", "Secretive", "Stern", "Subtle", "True-hearted", "Wary", "Wilful",
];
