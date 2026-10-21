// Dragonbane — professions and character-creation tables (Core Rules p.13–29).
// Gear kit items use the exact names of the gear tables (data/db/parts/gear.mjs);
// `choice` lists alternatives the player picks one of. Food rations and silver
// are dice rolled at creation. Descriptive text is original paraphrase.

const kit = (items, food, silver) => ({ items, food, silver });

export const DB_PROFESSIONS = [
  {
    id: "artisan", name: "Artisan", page: 14, roll: 1, keyAttribute: "STR",
    text: "Builders, smiths, wainwrights, tanners and coopers who bring order out of chaos — bridges and houses, weapons and tools, pots and barrels, armor from tanned hides. Every village needs them.",
    skills: ["Axes", "Brawling", "Crafting", "Hammers", "Knives", "Sleight of Hand", "Spot Hidden", "Swords"],
    heroicAbilities: ["Master Blacksmith", "Master Carpenter", "Master Tanner"], heroicChoice: true,
    kits: [
      kit([{ name: "Warhammer, Light" }, { name: "Leather" }, { name: "Blacksmithing Tools" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D8", "D8"),
      kit([{ name: "Handaxe" }, { name: "Leather" }, { name: "Carpentry Tools" }, { name: "Torch" }, { name: "Rope, Hemp" }, { name: "Flint & Tinder" }], "D8", "D8"),
      kit([{ name: "Knife" }, { name: "Leather" }, { name: "Tanning Tools" }, { name: "Lantern" }, { name: "Lamp Oil" }, { name: "Flint & Tinder" }], "D8", "D8"),
    ],
    nicknames: ["Stonehammer", "Woodcleaver", "Strongfist", "Barrelmaker", "Bridgebuilder", "Ironmaster"],
  },
  {
    id: "bard", name: "Bard", page: 15, roll: 2, keyAttribute: "CHA",
    text: "Singers, musicians and storytellers who keep the memory of old deeds alive — in taverns and markets for their supper, or at noble courts. Always hunting for deeds worthy of an epic.",
    skills: ["Acrobatics", "Bluffing", "Evade", "Knives", "Languages", "Myths & Legends", "Performance", "Persuasion"],
    heroicAbilities: ["Musician"],
    kits: [
      kit([{ name: "Lyre" }, { name: "Knife" }, { name: "Oil Lamp" }, { name: "Lamp Oil" }, { name: "Flint & Tinder" }], "D6", "D8"),
      kit([{ name: "Flute" }, { name: "Dagger" }, { name: "Rope, Hemp" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D8"),
      kit([{ name: "Horn" }, { name: "Knife" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D8"),
    ],
    nicknames: ["Odemaker", "Talespinner", "Silvervoice", "Gildenclef", "Honeytongue", "Rhymesmith"],
  },
  {
    id: "fighter", name: "Fighter", page: 16, roll: 3, keyAttribute: "STR",
    text: "Professionals of violence who follow the way of the sword, spear or crossbow. Some take pride in winning with little bloodshed; many are haunted by what they've seen and surprisingly soft-hearted.",
    skills: ["Axes", "Bows", "Brawling", "Crossbows", "Evade", "Hammers", "Spears", "Swords"],
    heroicAbilities: ["Veteran"],
    kits: [
      kit([{ choice: ["Broadsword", "Battleaxe", "Morningstar"] }, { name: "Shield, Small" }, { name: "Chainmail" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D6"),
      kit([{ choice: ["Short Sword", "Handaxe", "Short Spear"] }, { name: "Crossbow, Light" }, { name: "Quiver of Arrows, Iron Head" }, { name: "Leather" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D6"),
      kit([{ name: "Long Spear" }, { name: "Studded Leather" }, { name: "Open Helmet" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D6"),
    ],
    nicknames: ["Gravemaker", "Grimjaw", "Windthaw", "Coldsteel", "The Fearless", "The Butcher"],
  },
  {
    id: "hunter", name: "Hunter", page: 17, roll: 4, keyAttribute: "AGL",
    text: "Stalkers of the deep forest who live for the hunt and honour their prey by using every part of it. At home in the cruel, beautiful wild — and often awkward among people.",
    skills: ["Acrobatics", "Awareness", "Bows", "Bushcraft", "Hunting & Fishing", "Knives", "Slings", "Sneaking"],
    heroicAbilities: ["Companion"],
    kits: [
      kit([{ name: "Dagger" }, { name: "Short Bow" }, { name: "Quiver of Arrows, Iron Head" }, { name: "Leather" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }, { name: "Rope, Hemp" }, { name: "Snare" }], "D8", "D6"),
      kit([{ name: "Knife" }, { name: "Longbow" }, { name: "Quiver of Arrows, Iron Head" }, { name: "Leather" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }, { name: "Rope, Hemp" }, { name: "Fishing Rod" }], "D8", "D6"),
      kit([{ name: "Dagger" }, { name: "Sling" }, { name: "Leather" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }, { name: "Rope, Hemp" }, { name: "Snare" }], "D8", "D6"),
    ],
    nicknames: ["Forest Fox", "Wolfbane", "Pathfinder", "The Weathered", "Bloodhunger", "Shadowbolt"],
  },
  {
    id: "knight", name: "Knight", page: 18, roll: 5, keyAttribute: "STR",
    text: "Warriors sworn to a higher power — an order, a liege or a god — whose oath shapes every thought and deed. Some ride with an order; others guard a single person or place alone.",
    skills: ["Beast Lore", "Hammers", "Myths & Legends", "Performance", "Persuasion", "Riding", "Spears", "Swords"],
    heroicAbilities: ["Guardian"],
    kits: [
      kit([{ choice: ["Broadsword", "Morningstar"] }, { name: "Shield, Small" }, { name: "Plate Armor" }, { name: "Great Helm" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D12"),
      kit([{ choice: ["Flail", "Warhammer, Light"] }, { name: "Shield, Small" }, { name: "Chainmail" }, { name: "Open Helmet" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D12"),
      kit([{ name: "Short Sword" }, { name: "Lance" }, { name: "Shield, Small" }, { name: "Chainmail" }, { name: "Open Helmet" }, { name: "Combat Trained Horse" }], "D6", "D12"),
    ],
    nicknames: ["Dragonheart", "Goldlance", "Griffinclaw", "The Noble", "Gleamhelm", "Mourningcloak"],
  },
  {
    id: "mage", name: "Mage", page: 19, roll: 6, keyAttribute: "WIL",
    text: "Headstrong individualists who command the old forces woven through the world. Animists borrow power from nature's spirits, elementalists work the four elements, and mentalists draw magic from a disciplined mind.",
    // A mage picks a school; that school's list replaces the generic skill list.
    skills: [],
    schoolSkills: {
      Animism: ["Animism", "Beast Lore", "Bushcraft", "Evade", "Healing", "Hunting & Fishing", "Sneaking", "Staves"],
      Elementalism: ["Elementalism", "Awareness", "Evade", "Healing", "Languages", "Myths & Legends", "Spot Hidden", "Staves"],
      Mentalism: ["Mentalism", "Acrobatics", "Awareness", "Brawling", "Evade", "Healing", "Languages", "Myths & Legends"],
    },
    heroicAbilities: [], mage: true,
    magic: { startingSpells: 3, startingRank: 1, startingTricks: 3, from: "your school or General Magic", grimoire: true },
    kits: [
      kit([{ name: "Staff" }, { name: "Orbuculum" }, { name: "Grimoire" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D8"),
      kit([{ name: "Knife" }, { name: "Wand" }, { name: "Grimoire" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D8"),
      kit([{ name: "Amulet" }, { name: "Grimoire" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D8"),
    ],
    nicknames: ["Rootheart", "Crookback", "Graycape", "Stormhand", "Stafflimper", "Shadowbringer"],
  },
  {
    id: "mariner", name: "Mariner", page: 20, roll: 7, keyAttribute: "AGL",
    text: "Sailors of seas, lakes and rivers bound to a particular stretch of water by love, respect and dread — pirates, ferrymen, whalers, explorers and trading captains alike.",
    skills: ["Acrobatics", "Awareness", "Hunting & Fishing", "Knives", "Languages", "Seamanship", "Swimming", "Swords"],
    heroicAbilities: ["Sea Legs"],
    kits: [
      kit([{ name: "Dagger" }, { name: "Short Bow" }, { name: "Quiver of Arrows, Iron Head" }, { name: "Rope, Hemp" }, { name: "Grappling Hook" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D8", "D10"),
      kit([{ name: "Scimitar" }, { name: "Leather" }, { name: "Rope, Hemp" }, { name: "Grappling Hook" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D8", "D10"),
      kit([{ name: "Trident" }, { name: "Spyglass" }, { name: "Rope, Hemp" }, { name: "Grappling Hook" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D8", "D10"),
    ],
    nicknames: ["Whitewater", "Waverider", "Foamborn", "Saltsplash", "Seadog", "Stormfarer"],
  },
  {
    id: "merchant", name: "Merchant", page: 21, roll: 8, keyAttribute: "CHA",
    text: "Buy cheap, sell dear. Shopkeepers in town or traders travelling with caravans and adventuring companies, always after exotic goods, new customers and saleable relics.",
    skills: ["Awareness", "Bartering", "Bluffing", "Evade", "Knives", "Persuasion", "Sleight of Hand", "Spot Hidden"],
    heroicAbilities: ["Treasure Hunter"],
    kits: [
      kit([{ name: "Dagger" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }, { name: "Rope, Hemp" }, { name: "Donkey" }], "D6", "D12"),
      kit([{ name: "Knife" }, { name: "Sleeping Fur" }, { name: "Lantern" }, { name: "Lamp Oil" }, { name: "Flint & Tinder" }, { name: "Field Kitchen" }, { name: "Donkey" }, { name: "Cart" }], "D6", "D12"),
      kit([{ name: "Dagger" }, { name: "Sleeping Fur" }, { name: "Tent, Large" }, { name: "Oil Lamp" }, { name: "Lamp Oil" }, { name: "Flint & Tinder" }, { name: "Backpack" }], "D6", "D12"),
    ],
    nicknames: ["Silvergrin", "Goldtooth", "Silktongue", "The Lisping and Truthful", "Lardbelly", "Skinflint"],
  },
  {
    id: "scholar", name: "Scholar", page: 22, roll: 9, keyAttribute: "INT",
    text: "Seekers of truth about nature and the hidden history of the world — specialists in monsters, herbs or dead tongues, or generalists who study everything. Often well-versed in old lore and lost scripts.",
    skills: ["Awareness", "Beast Lore", "Bushcraft", "Evade", "Healing", "Languages", "Myths & Legends", "Spot Hidden"],
    heroicAbilities: ["Intuition"],
    kits: [
      kit([{ name: "Staff" }, { name: "Notebook" }, { name: "Quill & Ink" }, { name: "Sleeping Fur" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D10"),
      kit([{ name: "Knife" }, { name: "Book", note: "any subject" }, { name: "Sleeping Fur" }, { name: "Oil Lamp" }, { name: "Lamp Oil" }, { name: "Flint & Tinder" }], "D6", "D10"),
      kit([{ name: "Short Sword" }, { name: "Bandages (10)" }, { name: "Poison, Sleeping", note: "one dose" }, { name: "Sleeping Fur" }, { name: "Lantern" }, { name: "Lamp Oil" }, { name: "Flint & Tinder" }], "D6", "D10"),
    ],
    nicknames: ["Clearmind", "Dustlung", "Farsight", "The Lettered", "The All-Knowing", "The Plump and Learned"],
  },
  {
    id: "thief", name: "Thief", page: 23, roll: 10, keyAttribute: "AGL",
    text: "Professional acquirers of other people's property — burglars, pickpockets, con artists, highwaymen. Some swear by honour among thieves and their guilds; others work alone or rely on blades.",
    skills: ["Acrobatics", "Awareness", "Bluffing", "Evade", "Knives", "Sleight of Hand", "Sneaking", "Spot Hidden"],
    heroicAbilities: ["Backstabbing"],
    kits: [
      kit([{ name: "Dagger" }, { name: "Sling" }, { name: "Rope, Hemp" }, { name: "Grappling Hook" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D10"),
      kit([{ name: "Knife" }, { name: "Lockpicks, Simple" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D10"),
      kit([{ name: "Dagger", qty: 2 }, { name: "Marbles" }, { name: "Rope, Hemp" }, { name: "Torch" }, { name: "Flint & Tinder" }], "D6", "D10"),
    ],
    nicknames: ["Halffinger", "Blackrat", "Redeye", "Quickfoot", "Doubletongue", "Nightstabber"],
  },
];

// Optional weakness (p.26). Roleplaying it earns an extra advancement mark;
// clearly acting against it earns two marks and removes it.
export const DB_WEAKNESSES = [
  { roll: 1, name: "Gullible", text: "I believe whatever people tell me." },
  { roll: 2, name: "Greedy", text: "I want more than my share of every treasure." },
  { roll: 3, name: "Thin-skinned", text: "I never let a provocation slide." },
  { roll: 4, name: "Foolhardy", text: "I'm always first into danger." },
  { roll: 5, name: "Fainthearted", text: "I always hang back at the rear of the group." },
  { roll: 6, name: "Monster Slayer", text: "Every monster is evil and must die." },
  { roll: 7, name: "Intolerant", text: "Nightkin like orcs and goblins are evil and must be fought." },
  { roll: 8, name: "Slothful", text: "I rest whenever I get the chance." },
  { roll: 9, name: "Gluttonous", text: "I never pass up something tasty to eat." },
  { roll: 10, name: "Kleptomaniac", text: "I can't help stealing valuables." },
  { roll: 11, name: "Vain", text: "Flatter me and I'll help you with anything." },
  { roll: 12, name: "Reckless", text: "I take big risks without thinking of the consequences." },
  { roll: 13, name: "Fearful of Magic", text: "Magic is evil and mages can't be trusted." },
  { roll: 14, name: "Craving Knowledge", text: "Knowledge matters more to me than my friends." },
  { roll: 15, name: "Child of the Wild", text: "I never sleep under a roof." },
  { roll: 16, name: "Boastful", text: "I always exaggerate what I've done." },
  { roll: 17, name: "Violent", text: "Violence is my answer to every obstacle." },
  { roll: 18, name: "Overbearing", text: "I'm always telling others what to do." },
  { roll: 19, name: "Pessimist", text: "I always expect the worst." },
  { roll: 20, name: "Haughty", text: "I look down on everyone I meet." },
];

// Optional memento (p.27): a tiny keepsake. Once per session it lets you recover
// an extra condition during a stretch rest.
export const DB_MEMENTOS = [
  "Your trusty old shoes", "A simple silver medallion", "A letter from an old friend or relative", "A ragged old journal",
  "A bracelet passed down in your family", "A wooden figurine you got as a child", "A strangely shaped stone",
  "A copper coin from a treasure sought by your mother or father", "An old pewter tankard", "A horn taken as a trophy from a monster",
  "A fang taken as a trophy from a beast", "A couple of simple dice made of bone", "A locket containing a lock of hair", "An ornate key",
  "A hand-drawn map you inherited", "A ring with an inscription", "A bone whistle", "Your mother's or father's ragged old hat",
  "A griffin feather", "A beautifully carved pipe",
].map((text, i) => ({ roll: i + 1, text }));

// Appearance (p.29).
export const DB_APPEARANCES = [
  "Ugly scar across your cheek", "Strange headgear", "Abnormally pale and pasty", "A constant smile on your lips", "Icy, penetrating gaze",
  "A bit of extra weight around the middle", "Thin and wiry", "Abnormal amounts of body hair (depending on kin)", "Balding (depending on kin)",
  "Prominent tattoo", "Foul body odor", "Glorious hairstyle", "Limp", "Filthy", "Honest blue eyes", "Silver tooth", "Heavily perfumed",
  "Different-colored eyes", "Hissing voice", "Weathered face",
].map((text, i) => ({ roll: i + 1, text }));

// Advancement (p.29): no levels — skills improve through marks and rolls.
export const DB_ADVANCEMENT = {
  markOn: "Roll a Dragon or a Demon with a skill and tick its advancement box.",
  sessionQuestions: [
    "Did you take part in the game session?",
    "Did you explore a new location?",
    "Did you defeat one or more dangerous adversaries?",
    "Did you overcome an obstacle without using force?",
    "Did you give in to your weakness? (optional rule)",
  ],
  overcomeWeakness: "Clearly acting against your weakness gives two marks instead, and the weakness is overcome — remove it, play a full session without one, then you may pick a new one.",
  roll: "Roll a D20 for each marked skill; if the result is higher than the current level, the skill rises by 1 (max 18). Then erase all marks.",
  teacher: "A shift of training with a teacher whose level is 15+ and above yours gives an immediate extra advancement roll; a teacher can raise a skill only one step before you must improve it yourself again.",
  heroicAbility: "Gain a heroic ability of your choice whenever a skill reaches 18 (again each time it climbs back to 18), or as a rare GM reward for a grand deed (at most once per standard adventure). You must meet its requirement.",
  newCharacter: "A replacement character gets an extra advancement roll per session played so far and as many heroic abilities as the other player characters.",
  magic: {
    spellFromTeacher: "A shift with a teacher; at the end of the session spend the school's advancement mark instead of an advancement roll, then roll INT with a boon — success learns the spell.",
    spellFromGrimoire: "As with a teacher, but roll Languages instead of INT and without the boon.",
    trick: "A stretch with a teacher or grimoire; no mark or roll needed.",
    school: "Take the Magic Talent heroic ability, study a week with a teacher of the school, then roll INT — success gives your INT base chance as the school's level (retry after another week).",
  },
};
