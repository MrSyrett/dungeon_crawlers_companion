// Pirate Borg — Core Rules GM generators & setting tables (endpapers pg. 2-3, ASH pg. 10, history pg. 25,
// alchemy pg. 70-71, maritime travel events pg. 79, generators pg. 114-127, back reference pg. 166-167).
// Page = printed page = PDF page. Transcribed from the rasterised page images; table entries exact, rules prose
// paraphrased. Each export is also registered as a PB_GM_TABLES entry in tables.mjs.

const CR = "Core Rules";
const list = (arr, start = 1) => arr.map((t, i) => (typeof t === "string" ? { roll: i + start, text: t } : { roll: i + start, ...t }));

// ---- Endpapers (pg. 2-3) -------------------------------------------------------------------------
export const PB_CAROUSING = {
  id: "carousing", name: "Carousing", die: "d20", dice: "4d20", page: 2, source: CR,
  note: "Roll 4d20 (or 1d20 and read across). You are hungover for the lowest die in hours. Add the dice together: 4-49 is how much silver you spent or lost; 50+ is how much you won or stole. Read each die on its own column: Last night you… [who?] — You wake up… — and now you are…",
  hangover: "lowest die in hours", silver: { spentBelow: 50, text: "4-49 spent/lost in silver, 50+ won/stole in silver" },
  columns: [
    { die: "d20", name: "Last night you…", values: ["??? (you don't remember)", "got lucky with", "went swimming with", "made enemies with", "did some ASH with", "got in a fight with", "started a riot with", "stole from", "had a debate with", "became friends with", "played cards with", "spent the night with", "gambled with", "got drunk with", "fell in love with", "had a run-in with", "killed", "married", "saw the sunrise with", "had dinner with"] },
    { die: "d20", name: "[who?]", values: ["??? (you don't know).", "an enemy.", "a pig.", "a stranger.", "a crewmate.", "a monkey.", "a priest.", "your crew.", "a ghost.", "a skeleton.", "a barmaid/barkeep.", "some wenches.", "some soldiers.", "yourself.", "a beautiful person.", "the Devil.", "the captain.", "a VIP.", "a parrot.", "a VIP's adult progeny."] },
    { die: "d20", name: "You wake up…", values: ["??? (you're blind/it's dark)", "tied to a spit over a fire", "in your bunk or cabin", "in a gibbet cage", "in the hold of a ship", "deep in the jungle", "tied to a stake", "swinging from a mast", "in a dark cave", "in a coffin", "with a noose around your neck", "in a brothel or tavern", "locked in a cell", "on a tavern floor", "on the beach", "naked in the street", "in a captain's cabin", "in a church", "floating in water", "in a mansion"] },
    { die: "d20", name: "and now you are…", values: ["??? (confused).", "dead or dying.", "missing a limb.", "terrible (-1 to all stats).", "haggard (only d4 HP left).", "missing a digit or eye.", "on a wanted poster.", "in debt (3d10 x10 silver).", "haunted.", "really sad.", "ravenously hungry.", "soon to be a parent.", "in pain from a new tattoo.", "a year older.", "in love.", "rich (3d10 x 10 silver).", "the Captain now.", "the owner of a ship.", "amazing (gain experience).", "filthy rich (+1k silver)."] },
  ],
};
PB_CAROUSING.rows = PB_CAROUSING.columns[0].values.map((v, i) => ({ roll: i + 1, text: PB_CAROUSING.columns.map((c) => c.values[i]).join(" · ") }));

export const PB_NAMES_D12 = {
  id: "namesD12", name: "What's in a Name?", die: "d12", page: 2, source: CR, note: "Quick names: roll d12 on any column.",
  columns: [
    { die: "d12", name: "Name", values: ["Ed(mund)", "Roger(s)", "Jack", "David", "Pete(r)", "Angelica", "Sam(uel)", "Morgan", "Diego", "Ed(ward)", "Isabel(la)", "Charles"] },
    { die: "d12", name: "Name", values: ["James", "Chris(topher)", "Robert(s)", "Francois", "Juan", "John(athan)", "Butch(er)", "(Old) Ben", "Will(iam)", "Louis", "Jean", "Stede"] },
    { die: "d12", name: "Name", values: ["Meathook", "Jose", "Fernando", "Henry", "Mary", "Anne", "Philip", "Scraggs", "Eliza(beth)", "Hector", "Genny", "Thom(as)"] },
  ],
};
PB_NAMES_D12.rows = PB_NAMES_D12.columns[0].values.map((v, i) => ({ roll: i + 1, text: PB_NAMES_D12.columns.map((c) => c.values[i]).join(" / ") }));

export const PB_NPC_MOTIVATION = {
  id: "npcMotivation", name: "NPC Motivation", die: "d20", page: 3, source: CR,
  rows: list(["escape", "happiness", "recovery", "pleasure", "exploration", "love or sex", "revenge", "fear", "wealth", "hunger", "reputation", "aggression", "adventure", "guilt", "leisure", "protection", "intoxication", "family", "religion", "occult"]),
};

// d100: roll 00 = "roll again twice". `hidden` = the italic part (not immediately obvious). Add the roll in silver for extra loot.
export const PB_LOOT_THE_BODY = {
  id: "lootTheBody", name: "Loot the Body", die: "d100", page: 3, source: CR,
  note: "Text in the `hidden` part is not immediately obvious. Add the number rolled in silver for extra loot. 00 (100) = roll again twice.",
  addRollAsSilver: true,
  rows: [
    { roll: [1, 20], text: "The result on the Ancient Relics table (pg. 62).", table: "relics" },
    { roll: 21, text: "Skull with glowing green sockets." },
    { roll: 22, text: "A nasty-looking knife (d6).", damage: "d6" },
    { roll: 23, text: "Wanted poster with a picture of one of the PCs on it." },
    { roll: 24, text: "Black candle.", hidden: "When lit its purple flame forms a skull." },
    { roll: 25, text: "Single golden manacle with 5 links." },
    { roll: 26, text: "A leather journal.", hidden: "Contains 1 sea shanty (pg. 68).", table: "shanties" },
    { roll: 27, text: "Oil lantern filled with dark green liquid.", hidden: "It burns a pale green light for 5', but never runs out." },
    { roll: 28, text: "Fine metal flask." },
    { roll: 29, text: "Bag of white powder." },
    { roll: 30, text: "Small box with d12 black pearls", hidden: "worth a fortune." },
    { roll: 31, text: "Sea shell lined with mother of pearl." },
    { roll: 32, text: "Pipe carved out of whale bone.", hidden: "A mysterious map is carved in the bowl." },
    { roll: 33, text: "Dead rat." },
    { roll: 34, text: "Jewel encrusted egg.", hidden: "AGILITY DR18 to open or it breaks. Clockwork inside, worth 500s." },
    { roll: 35, text: "d8 crab claws.", hidden: "Throwing them before casting a ritual lowers the DR by 1." },
    { roll: 36, text: "Stone ring with an engraved rune." },
    { roll: 37, text: "Deep blue gemstone.", hidden: "It sparkles in the moonlight." },
    { roll: 38, text: "Obsidian figurine of a kraken.", hidden: "The Kraken won't attack you." },
    { roll: 39, text: "Parrot feather.", hidden: "+1 Devil's Luck each dawn." },
    { roll: 40, text: "Some rotten dried fruit." },
    { roll: 41, text: "Recipe for turtle stew.", hidden: "If made, everyone who can smell it passes out. At sea, the crew awakes with their ship drifting near a mysterious island." },
    { roll: 42, text: "Small book on tying sailor knots." },
    { roll: 43, text: "Deck of playing cards.", hidden: "The queens are mermaids." },
    { roll: 44, text: "Random bomb (pg. 53).", table: "bombs" },
    { roll: 45, text: "Jar of d10 eyeballs preserved in white rum. They still see." },
    { roll: 46, text: "Set of lock picks." },
    { roll: 47, text: "Paper doll painted with blood." },
    { roll: 48, text: "Deep green gemstone", hidden: "worth 100s." },
    { roll: 49, text: "Small wood flute." },
    { roll: [50, 59], text: "The result in silver.", silver: "roll" },
    { roll: 60, text: "Leather eye patch.", hidden: "That eye can see in the dark." },
    { roll: 61, text: "Flintlock pistol with tally marks." },
    { roll: 62, text: "d4 gold teeth." },
    { roll: 63, text: "Letter from a bonnie lass." },
    { roll: 64, text: "A ship's schedule", hidden: "with details of a treasure ship." },
    { roll: 65, text: "Jar of black sand." },
    { roll: 66, text: "Book of dark rituals.", hidden: "Test SPIRIT DR14 to learn one random ritual (pg. 64) or else permanently lose 1 SPIRIT." },
    { roll: 67, text: "Handwritten collection of ghost stories." },
    { roll: 68, text: "Book: A Guide to Sailor Tattoos." },
    { roll: 69, text: "A live rat." },
    { roll: 70, text: "d4 dead fish." },
    { roll: 71, text: "Vial of blowfish poison.", hidden: "Test TOUGHNESS DR12 or take d10 damage." },
    { roll: 72, text: "Treasure map (pg. 119).", table: "treasureMaps" },
    { roll: 73, text: "A glass eye", hidden: "that always looks West." },
    { roll: 74, text: "Broken cutlass hilt (d4)." },
    { roll: 75, text: "Glass dagger.", hidden: "(3d4), breaks after 1 use." },
    { roll: 76, text: "Book: The Secret Art of Fencing in the Age of Gunpowder.", hidden: "Test PRESENCE DR12 to permanently gain +1 STRENGTH. It only works once." },
    { roll: 77, text: "Bottle filled with iridescent dust." },
    { roll: 78, text: "Lint.", hidden: "Flammable." },
    { roll: 79, text: "Golden idol.", hidden: "Priceless, belongs in a museum." },
    { roll: [80, 89], text: "d8 gold doubloons", hidden: "worth the result in silver." },
    { roll: [90, 99], text: "Random Thing of Importance (pg. 60).", table: "things" },
    { roll: 100, text: "Roll again twice (00).", rollAgain: 2 },
  ],
};

// ---- ASH (pg. 10) ----------------------------------------------------------------------------------
export const PB_ASH = {
  page: 10, source: CR,
  text: "ASH is the dust left by destroyed undead, first found in the Dark Caribbean. Eaten, snorted or smoked it has physiological and psychedelic effects; it is extremely valuable and drives conflicts, trade disputes and black markets. Addicts show sunken eye sockets, darkened lips and faintly glowing bones.",
  dose: { text: "~5 lbs., or one per skeleton", standardRate: 50 },
  marketNote: "The standard rate per dose is 50s. Roll in each new port or each day.",
  market: {
    id: "ashMarket", name: "Current ASH Market", die: "2d6", page: 10, source: CR,
    note: "Standard rate 50s per dose (~5 lbs., or one per skeleton). Roll in each new port or each day; changes apply to the last rate.",
    rows: [
      { roll: 2, name: "Buyer's market", text: "Buyer's market (can't give it away).", multiplier: 0 },
      { roll: 3, name: "Flooded", text: "Flooded: half the rate.", multiplier: 0.5 },
      { roll: [4, 5], name: "Surplus", text: "Surplus: lower last rate by 20%.", multiplier: 0.8 },
      { roll: [6, 8], name: "Holding steady", text: "Holding steady.", multiplier: 1 },
      { roll: [9, 10], name: "In demand", text: "In demand: raise rate by 20%.", multiplier: 1.2 },
      { roll: 11, name: "Rare", text: "Rare: double the last rate.", multiplier: 2 },
      { roll: 12, name: "Seller's market", text: "Seller's market (name your price).", multiplier: null },
    ],
  },
  effects: {
    id: "ashEffects", name: "Effects of Consuming ASH", die: "d20", page: 10, source: CR, duration: "2d6 minutes",
    note: "Most effects last for 2d6 minutes.",
    rows: [
      { roll: 1, name: "Overdose", text: "Overdose. Pass out for d4 rounds. Test TOUGHNESS DR12 or instant death.", test: { ability: "TOUGHNESS", dr: 12 }, death: true },
      { roll: 2, text: "Roll a Mystical Mishap (pg. 66).", table: "mishaps" },
      { roll: 3, text: "Lose d4 HP and become infected.", damage: "d4", condition: "infected" },
      { roll: 4, text: "Permanent -1 to all abilities.", permanent: true, abilities: { all: -1 } },
      { roll: 5, text: "The world turns gray and lifeless. You no longer see the joy in living. All seems dead." },
      { roll: 6, text: "Everyone around you appears to be (d4): 1. undead 2. soldiers 3. sea creatures. 4. all 3.",
        sub: { die: "d4", rows: [{ roll: 1, text: "undead" }, { roll: 2, text: "soldiers" }, { roll: 3, text: "sea creatures" }, { roll: 4, text: "all 3" }] } },
      { roll: 7, text: "You think you're an animal (d6, pg. 86).", table: "darkFaunaTerrestrial" },
      { roll: 8, text: "One of your limbs (d4) rots away permanently. It is replaced by a ghost limb at sunset.", permanent: true },
      { roll: 9, text: "You fear the sun and thirst for blood, brains, or both." },
      { roll: 10, text: "You hear color, see sound, and feel taste." },
      { roll: 11, text: "Gain the effects of tier 3 armor.", effects: [{ type: "armor", value: 3 }] },
      { roll: 12, text: "Time slows down. Take 2 actions or attacks each round.", effects: [{ type: "attacks", value: 2 }] },
      { roll: 13, text: "Attack and defend at -4 DR.", effects: [{ type: "dr", value: -4, applies: ["attack", "defense"] }] },
      { roll: 14, text: "Gain d12 temporary hit points.", tempHp: "d12" },
      { roll: 15, text: "You can see in the dark. Everything that has ever lived glows neon colors.", effects: [{ type: "sense", value: "darkvision" }] },
      { roll: 16, text: "Move double your speed (up to 60'/turn).", effects: [{ type: "movement", value: 60 }] },
      { roll: 17, text: "+2 to STRENGTH and AGILITY for 24 hours.", duration: "24 hours", effects: [{ type: "ability", applies: ["STRENGTH", "AGILITY"], value: 2 }] },
      { roll: 18, name: "Mental transcendence", text: "Mental transcendence. Permanent +1 to PRESENCE.", permanent: true, abilities: { PRESENCE: 1 } },
      { roll: 19, name: "One with the universe", text: "You are one with the universe. Permanent +1 to SPIRIT.", permanent: true, abilities: { SPIRIT: 1 } },
      { roll: 20, text: "Roll d10+10 three times on this table (duplicate results have no effect).", reroll: { die: "d10+10", times: 3 } },
    ],
  },
  notes: [
    "Cargo: d20 crates of ASH is a Special Cargo result (pg. 115).",
    "Skeletons that fail a morale test without a Cap'n or Warlock crumble into ASH (pg. 93).",
    "Jars of cremated sacrifices in the Sanctum count as ASH (pg. 151).",
  ],
};

// ---- Alchemy Potion Generator (pg. 70-71) ----------------------------------------------------------
const ALC = {
  ingredientA: ["Rum", "Sugar", "Tobacco", "Chicken Flesh", "Oxtail", "Candy", "Flour", "Sassafras Root", "Hyla Tree Frog", "Polychaete Worm", "Large Toad", "Pufferfish", "Psilocybin Mushroom", "Pig Blood", "Human Blood", "Whale Blubber", "Monkey Paw", "Chicken Head", "Crocodile Tooth", "Human Remains"],
  ingredientB: ["Wild Flowers", "Ashes", "Black Powder", "Raisins", "Tree Bark", "Bone Powder", "Graveyard Dirt", "Jaguar Claw", "Bat Wing", "Cow's Tongue", "Crow's Foot", "Cacao Seeds", "Tamarind Leaves", "Castor Oil", "Maggots", "Bush Rat", "Kola Nut", "Coconut", "Sage", "Banana Peel"],
  color: ["Black", "Blue", "Green", "Red", "Purple", "Yellow", "Orange", "White", "Metallic", "Clear", "Glows in the Dark", "Pearlescent", "Iridescent", "Brown", "Gray", "Space-Like", "Pink", "Turquoise", "Opalescent", "Sanguine"],
  delivery: (r) => (r <= 5 ? "Inhalation" : r <= 10 ? "Touch Skin" : r <= 15 ? "Enter Bloodstream" : "Ingestion"),
  dr: (r) => (r <= 3 ? 8 : r <= 6 ? 10 : r <= 9 ? 12 : r <= 12 ? 14 : r <= 15 ? 16 : r <= 18 ? 18 : 20),
  effect: [
    "Instant, horrific death or after subject is killed, resurrect with 1 HP.", "Death in d6 hours.", "Paralysis (d8 hours).",
    "Subject becomes a ghost.", "d6 damage and blind for 1 hour.", "Berserk: Deal x2 melee damage, must attack closest creature. d6 rounds.",
    "Polymorph into a random beast (d12 hour).", "Polymorph into a random beast (permanent).", "Polymorph into a horrific monster (permanent).",
    "d8 acidic damage.", "Shrink to 1 foot tall (d8 rounds), AGILITY -4 DR.", "Grow to huge size (d8 rounds). x2 melee damage, AGILITY +2 DR.",
    "Heal d6.", "Heal d8.", "Heal to max HP.",
    "Strange hallucinations (d4 hours).", "Run away in terror (lasts d6 rounds).", "All tests are DR -4 for d8 hours.",
    "A random result from the Mystical Mishaps table (pg. 66).", "Roll again twice.",
  ],
};
const ALC_HINTS = { 2: { duration: "d6 hours" }, 3: { duration: "d8 hours" }, 5: { damage: "d6" }, 6: { duration: "d6 rounds" }, 10: { damage: "d8" },
  13: { heal: "d6" }, 14: { heal: "d8" }, 15: { heal: "max" }, 19: { table: "mishaps" }, 20: { rollAgain: 2 } };
export const PB_ALCHEMY = {
  page: 70, source: CR,
  methods: [
    { id: "fast", name: "Fast", text: "Roll 1d20 and read straight across." },
    { id: "random", name: "Random", text: "Roll 6d20 (one per column) and let fate decide. Add extra ingredients to taste." },
    { id: "precise", name: "Precise", text: "Pick and choose like the true alchemist you are." },
  ],
  notes: [
    "Results are never guaranteed.",
    "Most potions cost d100 silver pieces of eight from a reliable source — good luck finding one.",
    "Side quest hook: finding potion ingredients.",
    "The DR can be used as the TOUGHNESS DR to resist the potion, or the PRESENCE DR to craft it.",
  ],
  cost: "d100", resistAbility: "TOUGHNESS", craftAbility: "PRESENCE",
  deliveryBands: [{ roll: [1, 5], name: "Inhalation" }, { roll: [6, 10], name: "Touch Skin" }, { roll: [11, 15], name: "Enter Bloodstream" }, { roll: [16, 20], name: "Ingestion" }],
  drBands: [{ roll: [1, 3], dr: 8 }, { roll: [4, 6], dr: 10 }, { roll: [7, 9], dr: 12 }, { roll: [10, 12], dr: 14 }, { roll: [13, 15], dr: 16 }, { roll: [16, 18], dr: 18 }, { roll: [19, 20], dr: 20 }],
  rows: ALC.effect.map((e, i) => {
    const r = i + 1;
    return { roll: r, ingredientA: ALC.ingredientA[i], ingredientB: ALC.ingredientB[i], color: ALC.color[i], delivery: ALC.delivery(r), dr: ALC.dr(r), effect: e, ...(ALC_HINTS[r] || {}) };
  }),
};
export const PB_ALCHEMY_TABLE = {
  id: "alchemy", name: "Alchemy Potion Generator", die: "d20", page: 70, source: CR,
  note: "Fast: roll 1d20 and read across. Random: roll 6d20, one per column. Precise: pick. The DR is the TOUGHNESS DR to resist or the PRESENCE DR to craft. Most potions cost d100s. Results are never guaranteed.",
  columns: [
    { die: "d20", name: "Ingredient", values: ALC.ingredientA },
    { die: "d20", name: "Ingredient", values: ALC.ingredientB },
    { die: "d20", name: "Resulting Color", values: ALC.color },
    { die: "d20", name: "Delivery Method", values: ALC.effect.map((_, i) => ALC.delivery(i + 1)) },
    { die: "d20", name: "DR", values: ALC.effect.map((_, i) => "DR" + ALC.dr(i + 1)) },
    { die: "d20", name: "Effect", values: ALC.effect },
  ],
  rows: PB_ALCHEMY.rows.map((r) => ({ ...r, text: `${r.color} potion of ${r.ingredientA} & ${r.ingredientB} (${r.delivery}, DR${r.dr}): ${r.effect}` })),
};

// ---- Maritime Travel Events (pg. 79) ---------------------------------------------------------------
export const PB_TRAVEL_EVENTS = {
  page: 79, source: CR,
  note: "Roll while traveling at sea (see Maritime Travel, pg. 76). Highlighted words are prompts; the GM decides details.",
  flotsam: {
    id: "flotsam", name: "Flotsam & Jetsam", die: "d12", page: 79, source: CR,
    rows: list([
      "Message in a bottle.", { text: "2d10 crates (pg. 115).", table: "cargo" }, "d4 adrift sailors.", "Large, locked sea chest.",
      "Green sea turtle, a map carved in its shell.", "A coffin, nailed shut.", "Sentient ship's figurehead.", "Massive dead blue whale, something living inside.",
      "A tentacle, d100 feet long.", "d8 x 100 glowing jellyfish.", "Dinghy filled with treasure.", { text: "Derelict ship (pg. 116).", table: "derelictShip" },
    ]),
  },
  encounters: {
    id: "seaEncounters", name: "Encounters at Sea", die: "d20", page: 79, source: CR,
    rows: list([
      { text: "The Kraken.", monster: "the-kraken" }, { text: "Navy Ship of the Line.", ship: "ship-of-the-line", captain: "naval-mastermind" },
      { text: "Privateers: d2 sloops & 1 frigate.", ships: ["sloop", "frigate"] }, { text: "2d4 canoes.", ship: "canoe" },
      { text: "No-talent pirates in a tartane.", ship: "tartane" }, { text: "Sloop of rookie pirates.", ship: "sloop" },
      { text: "Fugitives in a ship's boat.", ship: "longboat" }, { text: "Raft with d6 dying passengers.", ship: "raft" },
      { text: "d2 people in a dinghy.", ship: "dinghy" }, { text: "Old galleon crewed by monkeys.", ship: "galleon" },
      { text: "Merchantman with lots of goods.", ship: "fluyt" }, { text: "2d20 zombies on floating debris." },
      { text: "Man-of-War, famous pirate.", ship: "man-of-war" }, { text: "3d6 war canoes, en route to raid.", ship: "canoe" },
      { text: "Blood drenched Ship of the Dead.", ship: "ghost-ship" }, { text: "Treasure galleon & d4 sloops.", ships: ["galleon", "sloop"] },
      { text: "d2 undead megalodons.", monster: "undead-megalodon" }, { text: "d6 fluyts preparing for battle.", ship: "fluyt" },
      "A flotilla: pirate lords are meeting.", { text: "Ornate galleon: a floating brothel.", ship: "galleon" },
    ]),
  },
  events: {
    id: "seaEvents", name: "Events at Sea", die: "d20", page: 79, source: CR,
    rows: list([
      { text: "A huge shark or sea monster harasses the hull. DR12 AGILITY tests or overboard!", test: { ability: "AGILITY", dr: 12 } },
      "A corpse floats by the ship. If rescued, it comes to life after d10 minutes.",
      { text: "Shipworms or barnacles infect the hull. Ship: -1 speed each week until careened.", shipSpeed: -1 },
      { text: "d4 sirens on rocks or a desert island beckon the crew with serene melodies.", monster: "siren" },
      "The rum is gone! The culprit is at large.",
      "Man overboard! d6 rounds to solve.",
      { text: "Mutiny! Roll reactions for all of the crew (pg. 31).", table: "reaction" },
      { text: "Maggots have infested the bread. Resting at sea requires a DR10 TOUGHNESS test.", test: { ability: "TOUGHNESS", dr: 10 } },
      "A crew member is gravely wounded while performing their duties around the ship.",
      "An NPC knows something troubling related to a PC's background or unfortunate incident.",
      "A slimy ghost is spotted eating the food in the galley.",
      "A maelstrom (whirlpool) opens nearby. Eminent danger.",
      "Everyone is haunted by eldritch or stygian dreams. The Great Old One calls...",
      "d4 of the crew are quarreling. Fisticuffs?",
      "Things are missing: there is a stowaway.",
      "Unexpected shoals and coral require precision navigation and piloting.",
      "Something gruesome and terrible is found in the cargo hold.",
      { text: "d2 mermaids visit the ship. Secretly roll reaction (pg. 31) to know their intent.", table: "reaction" },
      { text: "A mysterious, uncharted island is spotted. See pg. 122.", table: "islands" },
      { text: "An albatross is spotted flying with the sails. Everyone gains 1 Devil's Luck point.", luck: 1 },
    ]),
  },
};

// ---- Sails! Ships at Sea (pg. 114) ---------------------------------------------------------------
const SHIP_NAMES = [
  "Banshee's Wail", "Revenant", "Void Ripper", "Mermaid's Tear", "Carrion Crow", "Executioner's Hand",
  "Poseidon's Rage", "Adventure's Ghost", "Widow's Revenge", "Blood Moon", "Devil's Scorn", "Gilded Parrot",
  "Monolith", "Black Tide", "Raven's Wrath", "Coral Corsair", "Hellspire", "Vendetta",
  "Crimson Tempest", "Royal Tomb", "Guillotine", "Neptune's Maiden", "Cadaver's Call", "Heart of the Sea",
  "Demonwake", "Bride of the Abyss", "Annihilation", "Golden Glaive", "Necrobile", "Grave Witch",
  "Loa's Lament", "Hunsi Kanzo", "Dragon from the Deep", "Leviathan's Flood", "Kraken's Maw", "Harlequin's Curse",
];
const d66 = (i) => (Math.floor(i / 6) + 1) * 10 + (i % 6) + 1;
export const PB_SHIPS_AT_SEA = {
  page: 114, source: CR, note: "Sails! Roll for a vessel spotted at sea. *Modify DRs where appropriate (crew quantity and quality).",
  vesselClass: { id: "vesselClass", name: "Vessel Class", die: "d10", page: 114, source: CR,
    rows: list(["raft", "longboat", "tartane", "sloop", "brigantine", "fluyt", "frigate", "galleon", "man-of-war", "ship of the line"].map((t) => ({ text: t, ship: t.replace(/ /g, "-") }))) },
  armament: { id: "armament", name: "Armament", die: "d6", page: 114, source: CR, rows: [
    { roll: 1, text: "Merchant: No weapons.", weapons: "none" },
    { roll: 2, text: "Lightly armed: reduce damage die size by one.", attackDieStep: -1 },
    { roll: [3, 5], text: "Normal armament." },
    { roll: 6, text: "Warship: Double broadsides.", broadsidesMultiplier: 2 },
  ] },
  crewQuantity: { id: "crewQuantity", name: "Crew Quantity", die: "d6", page: 114, source: CR, note: "Modify DRs where appropriate.", rows: [
    { roll: 1, text: "Short-handed: half as many.", crewMultiplier: 0.5 },
    { roll: [2, 3], text: "Standard crew.", crewMultiplier: 1 },
    { roll: [4, 5], text: "Ready for war: twice as many.", crewMultiplier: 2 },
    { roll: 6, text: "Ready to raid: as many as possible.", crewMultiplier: "max" },
  ] },
  crewQuality: { id: "crewQuality", name: "Crew Quality", die: "2d6", page: 114, source: CR, note: "Modify DRs where appropriate.", rows: [
    { roll: [2, 3], text: "Near mutiny and/or untrained." },
    { roll: [4, 6], text: "Miserable and/or novice." },
    { roll: [7, 8], text: "Average." },
    { roll: [9, 10], text: "Fresh from shore leave and/or experienced." },
    { roll: [11, 12], text: "Prosperous/loyal and/or military training." },
  ] },
  name: { id: "shipName", name: "Ship Name", die: "d66", page: 114, source: CR,
    columns: [{ die: "d66", name: "Name", values: SHIP_NAMES }],
    rows: SHIP_NAMES.map((n, i) => ({ roll: d66(i), text: n })) },
};

// ---- …and Their Cargo (pg. 115) ------------------------------------------------------------------
export const PB_CARGO = {
  page: 115, source: CR,
  note: "Roll once for each cargo slot, or pick what is appropriate. Values are only suggestions and can fluctuate ±50% from port to port.",
  marketSwing: 0.5,
  mundane: { id: "cargoMundane", name: "Mundane Cargo", die: "d12", page: 115, source: CR, note: "Values in silver; ±50% from port to port. 12 = roll Special Cargo.", rows: [
    { roll: 1, text: "food or crops, 250s", value: 250 }, { roll: 2, text: "spices or oils, 350s", value: 350 },
    { roll: 3, text: "trade goods, 400s", value: 400 }, { roll: 4, text: "livestock, 400s", value: 400 },
    { roll: 5, text: "sugar, 500s", value: 500 }, { roll: 6, text: "rum, 1000s", value: 1000 },
    { roll: 7, text: "munitions, 2000s", value: 2000 }, { roll: 8, text: "tobacco, 1000s", value: 1000 },
    { roll: 9, text: "wine, 2000s", value: 2000 }, { roll: 10, text: "antiques, 2000s", value: 2000 },
    { roll: 11, text: "lumber, 1000s", value: 1000 }, { roll: 12, text: "special cargo", table: "cargoSpecial" },
  ] },
  special: { id: "cargoSpecial", name: "Special Cargo", die: "d12", page: 115, source: CR, rows: [
    { roll: 1, text: "raw silver ore, 5000s", value: 5000 }, { roll: 2, text: "golden coins and treasures, 10000s", value: 10000 },
    { roll: 3, text: "religious leader(s)" }, { roll: 4, text: "important prisoner(s)" },
    { roll: 5, text: "political or military figure(s)" }, { roll: 6, text: "relics or a rare artifact, 4000s", value: 4000 },
    { roll: 7, text: "sea monster bones, 2500s", value: 2500 }, { roll: 8, text: "exotic animals, 2000s", value: 2000 },
    { roll: 9, text: "d10 locked chests, 2d8 x 100s each", value: "2d8 × 100s each", count: "d10" },
    { roll: 10, text: "d20 crates of ASH, see pg. 10", count: "d20", ash: true },
    { roll: 11, text: "imprisoned undead" }, { roll: 12, text: "a sorcerer with a tome of d4 Arcane Rituals (pg. 64)", table: "rituals" },
  ] },
  plotTwist: { id: "cargoPlotTwist", name: "Optional Plot Twist", die: "d8", page: 115, source: CR, rows: list([
    "Deadly disease on board.", "Crew are impostors.", "Crew is mute.", "The PCs know this crew.",
    "Everyone on board was thought to be dead.", "Ghost ship.", "They're all zombies.", "Someone on board is related to a PC's backstory.",
  ]) },
  marketRates: {
    ashStandardRate: 50,
    text: "Cargo values are suggestions that swing ±50% between ports. ASH sells at a standard 50s per dose, adjusted by the Current ASH Market roll (pg. 10). A Veteran Quartermaster sells cargo for 50% more (pg. 76).",
  },
};

// ---- Derelict Ship Generator (pg. 116-117) -------------------------------------------------------
export const PB_DERELICT_GEN = {
  page: 116, source: CR, note: "Roll on each table to build a derelict ship to explore.",
  tables: {
    whereIsIt: { id: "derelictWhere", name: "Where Is It?", die: "d12", page: 116, source: CR, rows: list([
      "shallow waters (submerged at high tide)", "suspended on shoals (half underwater)", "beach wrecked", "adrift at sea",
      "anchored off the coast", "suspended on rocks or a coastal cliff", "up a dried-up riverbed", "in the middle of the jungle, forest, or desert",
      "drifting into port", "orbiting a maelstrom", "floating the waters that lead to the underworld", "in the nightmares of cursed sailors",
    ]) },
    typeOfShip: { id: "derelictType", name: "Type of Ship", die: "d12", page: 116, source: CR, rows: list([
      { text: "several ships fastened together (roll d2 more times)", rollAgain: "d2" }, { text: "sloop", ship: "sloop" }, { text: "tartane", ship: "tartane" },
      { text: "giant jury-rigged raft", ship: "raft" }, { text: "brigantine", ship: "brigantine" }, { text: "frigate", ship: "frigate" },
      { text: "ancient vessel", ship: "galley" }, { text: "galleon", ship: "galleon" }, { text: "fluyt", ship: "fluyt" },
      { text: "man-of-war", ship: "man-of-war" }, { text: "ship of the line", ship: "ship-of-the-line" }, "otherworldly",
    ]) },
    whatHappened: { id: "derelictWhatHappened", name: "What Happened Here?", die: "d8", page: 116, source: CR, rows: list([
      "demolished during a storm or hurricane", "abandoned for an unknown reason, mostly intact", "ripped in two by a monster from the deep",
      "run aground or scrapped some shoals", "raided by blood-thirsty undead", "destroyed in naval combat", "wrecked in foggy conditions", "mutiny fueled blood bath",
    ]) },
    inOneOfTheRooms: { id: "derelictRoom", name: "In One of the Rooms", die: "d8", page: 116, source: CR, rows: list([
      "filled with large eggs", "bodies of former crew, freshly dead, terror on their faces", "indecipherable glyphs carved into the wood beams",
      "water damaged books and letters", "hundreds of eyeballs hanging from strings", "a gaping hole in the hull", "rotting food and animal corpses",
      { text: "glass bottles filled with [d6]: 1 rum, 2 potions (pg. 70), 3 fortified wine, 4 blood, 5 holy water, 6 excrement (human?)",
        sub: { die: "d6", rows: list(["rum", { text: "potions (pg. 70)", table: "alchemy" }, "fortified wine", "blood", "holy water", "excrement (human?)"]) } },
    ]) },
    oddFeature: { id: "derelictOddFeature", name: "Odd Feature", die: "d12", page: 117, source: CR, rows: list([
      "walls and floor covered in coral and barnacles", "piles of bleached white bones throughout", "hundreds of small crab's nests",
      "cargo hold is filled with 6\" of blood", "charred wood and fire damage", "faintly glows in the dark", "mysterious slime covers most surfaces",
      "ornately decorated in gold leaf and velvet", "a thick layer of ash coats everything", "gravity behaves as if underwater",
      "signs of torture, sacrifice, and blood-letting", "bioluminescent plants bloom from hull at night",
    ]) },
    development: { id: "derelictDevelopment", name: "Development", die: "d8", page: 117, source: CR, rows: list([
      "Sails! Ship spotted.", "Derelict starts to sink or collapse.", "Adversaries arrive: other pirates, monsters, the military.", "Explosion or fire.",
      "Extreme weather.", "Thing from the deep complicates things.", "Undead floating nearby.", "A stowaway emerges.",
    ]) },
    currentOccupant: { id: "derelictOccupant", name: "Current Occupant", die: "d12", page: 117, source: CR, rows: list([
      { text: "Ghosts of dead sailors. Their speech sounds like whale song.", monster: "ghost-crew" },
      { text: "Poisonous necro-plague rats, their mother the size of a wolf.", monster: "bilge-rat" },
      { text: "Dormant zombies waiting for fresh brains, their smell detectable for miles.", monster: "bilge-rat-zombie" },
      "A starving crew of pirate-turned-cannibals, some with freshly missing limbs.",
      { text: "Skeleton marauders celebrating a recent raid. The captain is an asshole.", monster: "skeleton-capn" },
      { text: "Cultists, chanting, summoning Great Old Ones via human sacrifice.", monster: "cultists" },
      { text: "3 beautiful sirens. They lust for pearls and have a hoard hidden nearby.", monster: "siren" },
      "A tribe of intelligent goblin-like monkeys. They love shiny things and rum.",
      { text: "A necromancer living in exile with a pet undead jaguar or shark.", monster: "the-necromancer" },
      { text: "Deep Ones, lead by a shaman, scouting for valuables. Her magic requires water.", monster: "deep-ones" },
      { text: "Hundreds of carrion gulls, feasting on a corpse hanging from a mast.", monster: "carrion-gull" },
      "Dozens of blood drained corpses. A weakened vampire hides below deck.",
    ]) },
    originalCargo: { id: "derelictCargo", name: "Original Cargo", die: "d20", page: 117, source: CR, rows: list([
      "tea leaves or spices", "art or antiques", "coffee beans", "sugar or sugar cane", "rum or wine", "weapons and ammo", "tobacco or cocoa",
      "exotic creatures", "rice or crops", "black powder [d100 barrels]", "contraband", "textiles", "sacrificial victims", "prisoners", "lumber",
      "livestock", "a large statue", "hoards of treasure", "native medicine", "a cursed relic",
    ]) },
    condition: { id: "derelictCondition", name: "Cargo Condition", die: "d6", page: 117, source: CR, rows: [
      { roll: 1, text: "missing or ruined", valueMultiplier: 0 }, { roll: [2, 3], text: "salvageable (x1/2)", valueMultiplier: 0.5 },
      { roll: [4, 5], text: "good (x1)", valueMultiplier: 1 }, { roll: 6, text: "rare and valuable (x2)", valueMultiplier: 2 },
    ] },
  },
};

// ---- Buried Treasure (pg. 118) ----
export const PB_BURIED_TREASURE = {
  id: "buriedTreasure", name: "Buried Treasure", die: "d100", page: 118, source: CR,
  note: "Roll d100 for what lies in the chest.",
  rows: [
    { roll: 1, text: "The Black Spot on a folded piece of paper. Whoever unfolds it dies in d8 days (unless they find a way to lift the curse)." },
    { roll: 2, text: "A Spanish gold treasure hoard worth 50,000s. They want it back NOW." },
    { roll: 3, text: "3 flags: British, Spanish, French. One torn, one blood spattered, one outdated." },
    { roll: 4, text: "Freshly decapitated head. It looks exactly like one of the PCs. In its mouth is a pearl the size of a plum." },
    { roll: 5, text: "Emerald the size of a coconut." },
    { roll: 6, text: "6 stylized animal heads carved from wood, one on top of the next." },
    { roll: 7, text: "7 rare gold coins worth d100 silver each." },
    { roll: 8, text: "Each player rolls all of the dice they have with them: the total in silver.", silver: "all dice" },
    { roll: 9, text: "An enormous dinosaur bone." },
    { roll: 10, text: "2 black flintlocks, the name \"Blackwood\" engraved on both. DR -1 to hit." },
    { roll: 11, text: "A bag of marbles." },
    { roll: 12, text: "Thick leather belt, an iron kraken buckle. Wearer gets +1 STRENGTH." },
    { roll: 13, text: "A pure white flintlock pistol. It crits on 18+ but shatters on a fumble." },
    { roll: 14, text: "Half of a metal medallion." },
    { roll: 15, text: "15 dead men on a dead man's chest. The crew learns 1 random Shanty (pg. 68).", table: "shanties" },
    { roll: 16, text: "An elaborate brass anchor." },
    { roll: 17, text: "An ancient circular stone calendar. Its last entry is the day after tomorrow..." },
    { roll: 18, text: "5,000 gold coins (they are painted wood)." },
    { roll: 19, text: "D6 black candles. Burning them makes all other light sources dim by half." },
    { roll: 20, text: "D20 silver bars (50s each)." },
    { roll: 21, text: "8' marble statue of a sea monster with rubies for eyes." },
    { roll: 22, text: "Detailed journal with drawings and descriptions of the local flora and fauna." },
    { roll: 23, text: "Golden crown and scepter." },
    { roll: 24, text: "A flute carved from a femur." },
    { roll: 25, text: "D6 bladders from some sea creature. Each contains a potion (pg. 70).", table: "alchemy", count: "d6" },
    { roll: 26, text: "Jet black sphere." },
    { roll: 27, text: "Mother of pearl-encrusted lobster shell." },
    { roll: 28, text: "Black cannon in the shape of a dragon. A ship with it always deals +1 damage." },
    { roll: 29, text: "Book written in an ancient script. It contains the best recipes known to man." },
    { roll: 30, text: "300 dead monkeys." },
    { roll: 31, text: "Dead pirate captain. There is a 2,000s reward for his head." },
    { roll: 32, text: "32 golden teeth and a set of silver pliers." },
    { roll: 33, text: "Skeleton of a small animal." },
    { roll: 34, text: "Single golden arrow." },
    { roll: 35, text: "35' of hempen rope that will (almost) never break." },
    { roll: 36, text: "Small sandstone pyramid. Smashing it reveals a black diamond worth 2,000s." },
    { roll: 37, text: "Mesoan coin on a necklace." },
    { roll: 38, text: "703 pieces of eight in a wooden crate." },
    { roll: 39, text: "Dark gemstones. Looking into them reveals an underwater location." },
    { roll: 40, text: "Ornate model frigate inside a bottle." },
    { roll: 41, text: "Large fang the size of a femur." },
    { roll: 42, text: "A fine wooden armoire. Inside are d12 outfits fit for royalty." },
    { roll: 43, text: "Iron scarab. On sand it explodes for d6 damage, underwater it swims to treasure." },
    { roll: 44, text: "Large jar filled with 2d20 dried seahorses. Eating one recovers 1 HP. Don't eat too many..." },
    { roll: 45, text: "Pair of finely crafted boots. +1 AGILITY." },
    { roll: 46, text: "Bloody leather bag with 3 silver rings, 7 stone rings, and 9 iron rings." },
    { roll: 47, text: "Polished obsidian disc. If you look at the sun through it you immediately gain experience, then it shatters.", experience: true },
    { roll: 48, text: "4' x 8' stone slab covered in glyphs. It depicts a woman entering a portal." },
    { roll: 49, text: "Carved ivory sailing ship." },
    { roll: 50, text: "Sarcophagus (5,000s). Inside is a scepter that turns human ashes into silver dust." },
    { roll: 51, text: "Dark green cloak. +1 PRESENCE." },
    { roll: 52, text: "D20 bottles of the finest rum ever made." },
    { roll: 53, text: "Barrel-sized egg. The inside stirs..." },
    { roll: 54, text: "Taxidermy dog. In its belly is a severed hand holding a set of keys." },
    { roll: 55, text: "Severed finger. If rested on a map it will point to a lost city of gold." },
    { roll: 56, text: "D4 barrels filled with blood." },
    { roll: 57, text: "Smoking pipe shaped like a galleon." },
    { roll: 58, text: "Hollow cannonball. Inside: a map." },
    { roll: 59, text: "Clay dagger with glyphs carved in the blade. Read them: learn one random ritual (pg. 64) then it crumbles.", table: "rituals" },
    { roll: 60, text: "Chest with 4 different colored vials." },
    { roll: 61, text: "A figurehead of a gorgeous woman. If attached to a ship, it comes alive and screams in terror." },
    { roll: 62, text: "Clay jar filled with 13 snakes." },
    { roll: 63, text: "A skeleton key, pg. 63.", relic: "skeleton-key" },
    { roll: 64, text: "Locked iron box. Inside is a rotten head that can speak. It knows the way to Hell." },
    { roll: 65, text: "Set of 6 jade goblets." },
    { roll: 66, text: "Everything within 66' dies immediately. (Optional: all PCs gain the Haunted Soul: Skeleton class until the treasure is reburied.)" },
    { roll: 67, text: "Silver bracelet of a snake eating its tail." },
    { roll: 68, text: "Handheld crystal mirror." },
    { roll: 69, text: "3d20 large pearls." },
    { roll: 70, text: "Collection of exotic bird feathers (300s)." },
    { roll: 71, text: "Shriveled heart. It starts beating if submerged in sea water." },
    { roll: 72, text: "Wood coffin. Inside is (d4): 1 a skeleton 2 a mummy 3 a vampire 4 1,000s." },
    { roll: 73, text: "Map of the Dark Caribbean. A trail of blood appears along your path." },
    { roll: 74, text: "Jaguar skull made of diamond." },
    { roll: 75, text: "Key made of water. Glows if submerged." },
    { roll: 76, text: "Jade gecko wrapped around a coconut sized granite globe." },
    { roll: 77, text: "Vial of water. Drinking it secretly gives d100 HP." },
    { roll: 78, text: "Satchel of hauntingly poetic love letters." },
    { roll: 79, text: "Chess set carved from onyx and jade." },
    { roll: 80, text: "Wood tube with d6 scrolls, each with a different Ritual (pg. 64). They always succeed but burn up once used.", table: "rituals", count: "d6" },
    { roll: 81, text: "Stone tankard, covered with Mesoan glyphs. It never runs out of ale." },
    { roll: 82, text: "Golden peg leg." },
    { roll: 83, text: "Gold ship's bell. Ringing it changes the winds direction." },
    { roll: 84, text: "Plain gold ring with no signs of wear (in fire it projects a clue, pg. 121).", table: "riddles" },
    { roll: 85, text: "A chest inside a chest. Roll again.", rollAgain: 1 },
    { roll: 86, text: "Necklace of bones, each with a different engraved rune. +1 TOUGHNESS." },
    { roll: 87, text: "Gray, pointy hat. Wearer gets +1 SPIRIT." },
    { roll: 88, text: "Trident etched with antediluvian runes." },
    { roll: 89, text: "Bronze skull with d2 gems for eyes." },
    { roll: 90, text: "Bullwhip. Hits on DR8, d6 dmg, 10' range." },
    { roll: 91, text: "Amulet of the Sun. Elaborately carved, Ancient, and extremely valuable." },
    { roll: 92, text: "A large crate. d100 skulls are inside." },
    { roll: 93, text: "Volcanic glass sculpture of an island. Holding it to the sun reveals a small ruby inside. It's a map." },
    { roll: 94, text: "Spyglass. It seems broken, but actually peers 24 hours into the past." },
    { roll: 95, text: "Book of 7 maps in 7 different languages. Each is of a different small island." },
    { roll: 96, text: "3 turtles shells of different colors. Each is filled with gems worth d100 silver." },
    { roll: 97, text: "Go. A bag of black stones, a bag of white stones, and a bamboo game board." },
    { roll: 98, text: "Oil lamp. (The genie inside will grant one wish, but in the worst way possible)." },
    { roll: 99, text: "A wooden box with 24 stacks of 20 gold coins (500s each) and 6 loaded flintlocks." },
    { roll: 100, text: "1 million pieces of eight. Good luck." },
  ],
};

// ---- Treasure Maps & Riddles (pg. 119-121) -------------------------------------------------------
export const PB_TREASURE_MAPS = {
  page: 119, source: CR, note: "Pick and choose from these tables as needed, then grab parchment and a quill and get to work.",
  tables: {
    type: { id: "mapType", name: "Type of Map", die: "d4", page: 119, source: CR, rows: list([
      { name: "Simple", text: "Simple. A geographic area, X marks the spot." },
      { name: "Point Crawl", text: "Point Crawl. The map shows several icons (pg. 120), but they must be traveled to sequentially to find the next one." },
      { name: "Scavenger Hunt", text: "Scavenger Hunt. The map has only one point of interest or one clue, but finding it reveals more maps or clues." },
      { name: "Arcane", text: "Arcane. The map only reveals the next step when the previous one is completed." },
    ]) },
    material: { id: "mapMaterial", name: "Material", die: "d12", page: 119, source: CR, rows: [
      { roll: [1, 4], text: "Parchment paper." }, { roll: 5, text: "In an old book." }, { roll: 6, text: "Only in someone's mind or memories." },
      { roll: 7, text: "Burnt into leather." }, { roll: 8, text: "Whittled into a bone or skull." }, { roll: 9, text: "Minted on a unique coin." },
      { roll: 10, text: "Embossed into a sea turtle shell." }, { roll: 11, text: "Scratched into driftwood." }, { roll: 12, text: "Etched into a glass bottle." },
    ] },
    geography: { id: "mapGeography", name: "Geography", die: "d8", page: 119, source: CR, rows: list(["Island", "Coast", "Peninsula", "Cove", "Archipelago", "River", "Lake", "Inland"]) },
    itStarts: { id: "mapStarts", name: "It Starts…", die: "d6", page: 119, source: CR, rows: list(["at a totally unknown location.", "nearby.", "within a mile.", "a day's walk away.", "a day's sail away.", "near a well known place."]) },
    invisibleInk: { id: "mapInvisibleInk", name: "The Invisible Ink Is Revealed…", die: "d10", page: 119, source: CR, rows: list([
      "with heat or fire.", "under star or moon light.", "during an eclipse.", "when underwater.", "if soaked in alcohol.", "with magic or a ritual.",
      "when you speak the password.", "when near a key location or object.", "during the solstice or equinox.", "at a certain time of day.",
    ]) },
    complication: { id: "mapComplication", name: "Complication", die: "d8", page: 119, source: CR, rows: list([
      "Another crew is there when the PCs arrive.", "Monsters guard it.", "It has already been found or is missing.", "It's cursed.",
      "There are hundreds of corpses.", "The PCs become incredibly lost on the way.", "The whole thing is a setup.", "There is so much treasure everyone becomes murderously paranoid.",
    ]) },
    icons: { id: "mapIcons", name: "Icons", die: "d20", page: 120, source: CR, rows: list([
      "rope bridge", "waterfall", "volcano caldera", "skull rock", "wicked tree", "jungle", "beach caves", "whale graveyard", "white sand beach", "lagoon",
      "ancient ruins", "burnt down cabin", "swamp", "shipwreck", "cliff side", "large hill", "quicksand", "mountain's peak", "highest point", "lowest point",
    ]) },
    clueContainer: { id: "mapClueContainer", name: "Clue Container", die: "d10", page: 120, source: CR, rows: list([
      "Note in a scroll case.", "Small stone, instructions carved underneath.", "Coconut shell.", "Message in a bottle.", "Metal plaque.", "Letter in a small box.",
      "Etched cannon ball.", "Burnt or carved into wood.", "Dried blood on a skull.",
      { text: "A potion. The drinker \"knows\" the next clue, but TOUGHNESS DR12 or becomes poisoned.", test: { ability: "TOUGHNESS", dr: 12 } },
    ]) },
    direction: { id: "mapDirection", name: "Direction", die: "d8", page: 120, source: CR, rows: list(["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"]) },
    markers: { id: "mapMarkers", name: "Markers", die: "d20", page: 120, source: CR, rows: list([
      "large boulder", "dead man's bones", "makeshift grave", "old anchor", "ruined rowboat", "lone palm tree", "ship's wheel", "painted rock", "cannonball", "pile of skulls",
      "volcanic glass", "rusty cutlass", "broken oar", "broken barrel", "ruined cannon", "tallest tree", "strange sea shell", "rotting crate", "stone statue", "tombstone",
    ]) },
  },
  riddles: {
    id: "riddles", name: "Riddles", die: "d12", page: 121, source: CR,
    note: "Fill [icon], [marker] and [direction] from the tables on pg. 120. The `answer` is the GM's explanation.",
    rows: [
      { roll: 1, text: "Arrive at the [icon] but you won't see the [marker] in the light, travel [2d6] paces to the [direction] and wait until day turns to night.", answer: "The marker only appears in the dark." },
      { roll: 2, text: "Set your course for the [icon] and ready a shanty, for singing near the [marker] will turn \"none\" into \"plenty\".", answer: "The treasure or clue appears once music is played." },
      { roll: 3, text: "Find the [marker] by the [icon], ye soothsayers and witches, for only magic or prayers can lead to these riches.", answer: "Using a Relic, Ritual, Spell, or Prayer magically reveals the clue or treasure." },
      { roll: 4, text: "Look not high for salvation, but low for an X, crossed trees you will find, but beware of the hex.", answer: "Two fallen trees cover the clue or treasure; it's booby trapped." },
      { roll: 5, text: "In shallow waters near [icon] the [marker] rests under waves, it points in the direction of nearby caves.", answer: "The marker has a carved or painted arrow that points to a nearby cave with the clue/treasure." },
      { roll: 6, text: "Head [d8 x 10] paces [direction] of the [icon] then dig a hole, under the [marker] lies the key to your goal.", answer: "Dig for the clue/treasure." },
      { roll: 7, text: "Make for the [icon] before the sun hits the sea, the secret lies between the [marker] and a tree.", answer: "Can't be found during the night." },
      { roll: 8, text: "Only dead men know this hidden locale, for of all who've seen the [marker] by the [icon] none have lived to tell.", answer: "Tragedy, a trap, or both haunt this location." },
      { roll: 9, text: "Near [icon] at midnight the dead rise from their graves, but the one near the [marker] is a crooked-nosed knave.", answer: "Harmless ghosts rise here at midnight, but one near the marker knows the location of the clue/treasure. He will only reveal it if his body, hanging from a nearby noose, is laid to rest." },
      { roll: 10, text: "Travel [direction] for 2d2 miles, find the [icon] then rest, only candlelight will reveal the [marker] over the chest.", answer: "The marker only appears in candle light. The clue/treasure is under it." },
      { roll: 11, text: "From the [icon] at low tide you will be able to see, the [marker] just [direction] of a large fruit tree.", answer: "The clue/treasure is buried in the shadow of the tree." },
      { roll: 12, text: "[Direction] of the [icon] you will find a sight rarely seen, find the [marker] that's hidden under a blanket of green.", answer: "The marker is hidden under foliage, moss, or grass growing in an odd place." },
    ],
  },
};

// ---- Uncharted Islands (pg. 122-123, by Jacob Hurst of Swordfish Islands) -------------------------
const two = (arr) => list(arr, 2);
export const PB_ISLANDS = {
  page: 122, source: CR, note: "Roll on each table to build an uncharted island. Written by Jacob Hurst of Swordfish Islands.",
  tables: {
    size: { id: "islandSize", name: "Size", die: "d6", page: 122, source: CR, rows: list(["Tiny.", "Small.", "Medium.", "Large.", "Large.", "Huge."]) },
    terrain: { id: "islandTerrain", name: "Terrain", die: "2d6", page: 122, source: CR, rows: two(["An atoll.", "It's two islands.", "Gentle hills.", "Flat with a mountainous ridge.", "Mostly flat.", "Mostly flat.", "Mostly flat.", "Flat with one prominent hill.", "Gentle hills.", "A single mountain.", "Mountainous and rugged."]) },
    vegetation: { id: "islandVegetation", name: "Vegetation", die: "2d6", page: 122, source: CR, rows: two(["One single palm tree.", "Barren: rocks.", "Swampy grasslands.", "Thorny scrub.", "Sand and meadows.", "Fertile grasslands.", "Fertile grasslands.", "Fields and woods.", "Small pine forests.", "Forests and meadows.", "Rainforest."]) },
    naturalFeature: { id: "islandFeature", name: "Prominent Natural Feature", die: "2d6", page: 122, source: CR, rows: two(["Volcanic.", "Huge sand dunes.", "Numerous sea stacks.", "Black sand beaches.", "Lagoon.", "Azure water, white sand.", "Waterfall(s).", "Fruit trees.", "Mangrove forest.", "Sea cliffs.", "A huge skull-shaped rock."]) },
    animals: { id: "islandAnimals", name: "Notable Animal Inhabitants", die: "2d6", page: 122, source: CR, rows: two(["Sharks. So many sharks.", "Glowing jellyfish swarms.", "Monkeys.", "Fist sized orange beetles.", "Sleek black seals.", "Nothing to write home about.", "Pigs and boars (large).", "Dog-sized lizards.", "Large seabird colony.", "Large flightless birds.", "Dancing jewel-colored birds."]) },
    inhabitants: { id: "islandInhabitants", name: "Inhabitants", die: "2d6", page: 122, source: CR, rows: two(["A witch.", "Pearl divers.", "A robust but primitive city.", "Small primitive village.", "Recently struck camps.", "Uninhabited.", "Don't know, but they're all dead.", "Religious adherents.", "Farming settlers.", "Military.", "A hidden pirate town."]) },
    hideTreasure: { id: "islandHideTreasure", name: "Best Place on the Island to Hide Treasure?", die: "2d6", page: 123, source: CR, rows: two(["Old ruins.", "A large rock shaped like a ship.", "Under a huge lightning scarred oak.", "A large natural rock arch.", "An old lava tunnel.", "Somewhere else.", "Two palm trees cross in an X.", "A large rock resembling a monkey.", "A sink hole.", "Near the strange ancient statues.", "In the sea caves."]) },
    fortune: { id: "islandFortune", name: "Anything Here Worth a Fortune?", die: "2d6", page: 123, source: CR, rows: two(["Wealthy shipwreck survivors.", "Rare poisons.", "Oysters here make red pearls.", "Buried treasure... somewhere.", "An excellent natural harbor. Build a town!", "Not really. Good fishing though.", "Not exactly, but there's a rich trade route nearby.", "Caves of bat guano.", "Wild horses.", "Whale spawning grounds.", "A naturally hidden, excellent harbor."]) },
    hazards: { id: "islandHazards", name: "Natural Hazards", die: "2d6", page: 123, source: CR, rows: two(["Manchineel trees. Everywhere.", "Large whirlpools frequently form.", "Quicksand.", "Low lying areas flood. Frequently.", "Coral reefs.", "None.", "Dangerous rocky shallows.", "Dangerous currents.", "Frequent earthquakes.", "Animals infect humans with hemorrhagic fever.", "A new volcano is about to erupt."]) },
    conflicts: { id: "islandConflicts", name: "Current Conflicts", die: "2d6", page: 123, source: CR, rows: two(["10 pirate ships here for a secret meeting.", "Imperial fleet firing upon inhabitants.", "Imperial military building an outpost.", "Pirates just raided, or are about to.", "Explorers hunting animals to extinction.", "None.", "Recent shipwreck. Survivors stranded.", "Current inhabitants diseased.", "Religious order building a mission.", "A party of 6 ruthless treasure hunters is here (not including you...).", "Rebels."]) },
    darkness: { id: "islandDarkness", name: "Darkness", die: "2d6", page: 123, source: CR, rows: two(["A kraken dwells here.", "Cultists.", "An ancient graveyard full of ghosts.", "A ghost ship haunts its waters.", "Ancient rock altar of sacrifice. Well used.", "Nothing to speak of.", "Unspeakable monstrosities wash up on shore often.", "Animals that die here don't stay dead.", "Zombies walk at night.", "Blood spilled here animates.", "If you eat the food or drink the water here you can never leave."]) },
  },
};

// ---- Pirate Generator (pg. 124-125) ---------------------------------------------------------------
export const PB_PIRATE_GEN = {
  page: 124, source: CR,
  note: "Roll 3d12 and read Tables A to C (save the dice): \"A [A] with [B] wielding a [C]\". The greatest die is its Morale; the lowest die +2 is its HP (double it for a mighty pirate). Whichever table rolled highest sets its armor: A no armor, B −d2, C −d4. Then roll d66 ×4 on the name table; they carry the highest result in silver.",
  procedure: { dice: "3d12", morale: "highest die", hp: "lowest die + 2", mightyHp: "× 2", armorByHighestTable: { A: null, B: { name: "Armor", die: "d2", tier: 1 }, C: { name: "Armor", die: "d4", tier: 2 } }, silver: "highest name d66 result" },
  tableA: { id: "pirateA", name: "Table A — A…", die: "d12", page: 124, source: CR, rows: list(["rugged individual", "shady vagabond", "scurvy gutter worm", "famous captain", "escaped prisoner", "wanted cutthroat", "notorious privateer", "cloaked figure", "rum-drunk goon", "horrific wretch", "cocky explorer", "dread pirate lord"]) },
  tableB: { id: "pirateB", name: "Table B — with…", die: "d12", page: 124, source: CR, rows: list(["horrible breath", "unmatched beauty", "a hook for a hand", "a fancy hat", "a makeshift peg leg", "barnacle covered skin", "calico clothing", "filthy rags", "weather-worn doublet", "natty hair", "a pet bird", "bloody bandages"]) },
  tableC: { id: "pirateC", name: "Table C — wielding a…", die: "d12", page: 124, source: CR, rows: [
    { roll: 1, text: "pair of fists [d2]", damage: "d2" }, { roll: 2, text: "broken bottle [d2]", damage: "d2" }, { roll: 3, text: "bullwhip [d4]", damage: "d4" },
    { roll: 4, text: "hook [d4]", damage: "d4" }, { roll: 5, text: "rusty knife [d4]", damage: "d4" }, { roll: 6, text: "evil cutlass [d6]", damage: "d6" },
    { roll: 7, text: "ornate scimitar [d6]", damage: "d6" }, { roll: 8, text: "officer's rapier [d8]", damage: "d8" }, { roll: 9, text: "ancient crossbow [d8]", damage: "d8" },
    { roll: 10, text: "flintlock pistol [2d4]", damage: "2d4", blackPowder: true }, { roll: 11, text: "musket [2d6]", damage: "2d6", blackPowder: true },
    { roll: 12, text: "blunderbuss [d4/d10]", damage: "d4", closeDamage: "d10", blackPowder: true },
  ] },
  names: "names", // the d66 name table on pg. 125 is identical to the Guidebook's (PB_NAMES / PB_GM_TABLES.names)
};

// ---- Jobs & Quests (pg. 126) ----------------------------------------------------------------------
export const PB_JOBS = {
  page: 126, source: CR, note: "Roll on each table to build a job: Hook, Patron or Key NPC, Requirement, Time Restraint and Complication.",
  tables: {
    hook: { id: "jobHook", name: "Hook", die: "d20", page: 126, source: CR, rows: list([
      "Capture a prize.", "Raid a port.", "Treasure hunt.", "Find someone/something.", "Capture, interrogate, or kill someone.",
      "Establish a new safe house, base, or hideout.", "Sink a ship.", "Steal an item.", "Spy on someone.", "Scavenge a wreck.",
      "Explore or defend a location.", "Sneak into somewhere.", "Steal something.", "Meet someone.", "Establish trading or fencing relations with someone.",
      "Free or rescue a person or group from a location.", "Sabotage something.", "Defend a location.", "Free captives or prisoners.", "Escape.",
    ]) },
    patron: { id: "jobPatron", name: "Patron or Key NPC", die: "d10", page: 126, source: CR, rows: list([
      "A government leader.", "A famous pirate captain.", "The governor's daughter or son.", "The local drunk.", "A shady figure.",
      "Some cultists.", "An old friend.", "Important looking pirates.", "A love interest.", "A mermaid.",
    ]) },
    requirement: { id: "jobRequirement", name: "Requirement", die: "d6", page: 126, source: CR, rows: list([
      "Stay out of combat.", "Kill only one person.", "Kill everyone.", "Make it look like someone else did it.", "Bring a hostage back alive.", "Vital information must be obtained.",
    ]) },
    timeRestraint: { id: "jobTime", name: "Time Restraint", die: "d6", page: 126, source: CR, rows: list(["Immediately!", "Within the hour.", "By tonight.", "By tomorrow.", "Next week.", "This month."]) },
    complication: { id: "jobComplication", name: "Complication", die: "d6", page: 126, source: CR, rows: list([
      "It's a setup.", "The intel is wrong.", "Another crew is already on the job.", "Some who's not supposed to be there is.", "The reward is suspiciously big.", "Everything is proceeding as planned.",
    ]) },
  },
};

// ---- Rumors (pg. 127) -----------------------------------------------------------------------------
export const PB_RUMORS = {
  id: "rumors", name: "Rumors", die: "d20", page: 127, source: CR,
  rows: list([
    "A nation's navy is coming in 3d6 days. Everyone is on edge.", "A rich group of merchants are hiring mercenaries to escort them.",
    "A treasure fleet is rumored to be departing soon.", "An important NPC is recruiting people to explore or scout an area.",
    "A group of leaders is meeting soon. The PCs have been summoned.", "Someone the PCs know has been killed or captured.",
    "2d12 pirates are in town spending the earnings from their latest prize.", "Pirates, marines, or revolutionaries are planning to raid a port.",
    "There are rumors of a rich prize nearby. Crews are recruiting.", "Someone uncovered a clue or map to a fabled treasure and need brains, muscle, or both.",
    "A corpse has been found in an alley or on the beach. Everyone is suspicious.", "A ship with valuable cargo wrecked nearby.",
    "A lonely widow (20+d50 years old) is looking for a date to the Governor's Ball.", "It is not safe here at night. The reasons given sound like tall tales or ghost stories.",
    "A recent fire destroyed a ship, a port, or a farmstead.", "Two allied factions are now at war.", "There is a party tonight to honor a deceased NPC.",
    "The governor's adult daughter/son is the most beautiful person ever seen.", "A group of cultists have been up to some unusual activity recently.",
    "Undead have destroyed yet another settlement.",
  ]),
};
