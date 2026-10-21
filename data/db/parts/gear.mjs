// Dragonbane — gear (Core Rules ch.6, p.73–81). All values exact; notes paraphrased.
// cost: { amount, unit: "gold"|"silver"|"copper", per?, note? } or null when unpriced.
// supply: "Common" | "Uncommon" | "Rare" | "Unique". weight: number (1 default; 0 = tiny; 0.25 = a quarter item).

const c = (amount, unit, extra) => ({ amount, unit, ...(extra || {}) });

export const DB_SUPPLY = {
  Common: "Available in any village or marketplace.",
  Uncommon: "Usually only from the artisan who makes it — not in every village.",
  Rare: "Generally has to be ordered specially from an artisan.",
  Unique: "Only from treasure troves or whoever found it.",
};

export const DB_ARMOR = [
  { name: "Leather", rating: 1, cost: c(2, "gold"), supply: "Common", banes: [], metal: false, bonusVs: { bludgeoning: 2 }, page: 73 },
  { name: "Studded Leather", rating: 2, cost: c(10, "gold"), supply: "Uncommon", banes: ["Sneaking"], metal: true, bonusVs: { bludgeoning: 2 }, page: 73 },
  { name: "Chainmail", rating: 4, cost: c(50, "gold"), supply: "Uncommon", banes: ["Evade", "Sneaking"], metal: true, bonusVs: { slashing: 2 }, swimBane: true, page: 73 },
  { name: "Plate Armor", rating: 6, cost: c(500, "gold"), supply: "Rare", banes: ["Acrobatics", "Evade", "Sneaking"], metal: true, swimBane: true, page: 73 },
];
// bonusVs applies only with the optional damage-type rule (p.50).

export const DB_HELMETS = [
  { name: "Open Helmet", rating: 1, cost: c(12, "gold"), supply: "Uncommon", banes: ["Awareness"], metal: true, page: 73 },
  { name: "Great Helm", rating: 2, cost: c(100, "gold"), supply: "Rare", banes: ["Awareness", "Ranged attacks"], metal: true, page: 73 },
];

// Weapons. range: metres, or "STR" (thrown, your STR in metres) / "STR×2". str: STR requirement (null = none).
// durability null = can't parry / no value. skill = the weapon skill used.
const W = (name, grip, str, range, damage, durability, cost, supply, features, skill, extra) =>
  ({ name, grip, str, range, damage, durability, cost, supply, features, skill, ...(extra || {}) });

export const DB_WEAPONS = [
  W("Unarmed", null, null, 2, "D6", null, null, null, ["Bludgeoning"], "Brawling", { melee: true, natural: true }),
  W("Blunt Object, Light", "1H", null, "STR", "D8", 3, null, null, ["Bludgeoning", "Can be thrown"], "Hammers", { melee: true, improvised: true }),
  W("Blunt Object, Heavy", "2H", 16, 2, "2D8", 3, null, null, ["Bludgeoning"], "Hammers", { melee: true, improvised: true }),
  W("Knife", "1H", null, "STR", "D8", 6, c(5, "silver"), "Common", ["Subtle", "Piercing", "Can be thrown"], "Knives", { melee: true, metal: true }),
  W("Dagger", "1H", null, "STR", "D8", 9, c(1, "gold"), "Common", ["Subtle", "Piercing", "Slashing", "Can be thrown"], "Knives", { melee: true, metal: true }),
  W("Parrying Dagger", "1H", null, 2, "D6", 15, c(2, "gold"), "Uncommon", ["Subtle", "Piercing", "Slashing"], "Knives", { melee: true, metal: true }),
  W("Short Sword", "1H", 7, 2, "D10", 12, c(8, "gold"), "Common", ["Piercing", "Slashing"], "Swords", { melee: true, metal: true }),
  W("Broadsword", "1H", 10, 2, "2D6", 15, c(12, "gold"), "Common", ["Piercing", "Slashing"], "Swords", { melee: true, metal: true }),
  W("Longsword", "1H", 13, 2, "2D8", 15, c(25, "gold"), "Uncommon", ["Piercing", "Slashing"], "Swords", { melee: true, metal: true }),
  W("Greatsword", "2H", 16, 2, "2D10", 15, c(50, "gold"), "Rare", ["Piercing", "Slashing"], "Swords", { melee: true, metal: true }),
  W("Scimitar", "1H", 10, 2, "2D6", 12, c(10, "gold"), "Uncommon", ["Toppling", "Slashing"], "Swords", { melee: true, metal: true }),
  W("Handaxe", "1H", 7, "STR", "2D6", 9, c(2, "gold"), "Common", ["Toppling", "Slashing", "Can be thrown"], "Axes", { melee: true, metal: true }),
  W("Battleaxe", "1H", 13, 2, "2D8", 9, c(10, "gold"), "Uncommon", ["Toppling", "Slashing"], "Axes", { melee: true, metal: true }),
  W("Two-Handed Axe", "2H", 16, 2, "2D10", 9, c(25, "gold"), "Uncommon", ["Toppling", "Slashing"], "Axes", { melee: true, metal: true }),
  W("Mace", "1H", 7, 2, "2D4", 12, c(8, "gold"), "Common", ["Bludgeoning"], "Hammers", { melee: true, metal: true }),
  W("Morningstar", "1H", 13, 2, "2D8", 12, c(14, "gold"), "Uncommon", ["Bludgeoning"], "Hammers", { melee: true, metal: true }),
  W("Flail", "1H", 13, 2, "2D8", null, c(16, "gold"), "Uncommon", ["Bludgeoning", "Toppling", "Cannot be used for parrying"], "Hammers", { melee: true, metal: true, noParry: true }),
  W("Warhammer, Light", "1H", 10, 2, "2D6", 12, c(10, "gold"), "Uncommon", ["Bludgeoning", "Toppling"], "Hammers", { melee: true, metal: true }),
  W("Warhammer, Heavy", "2H", 16, 2, "2D10", 12, c(20, "gold"), "Uncommon", ["Bludgeoning", "Toppling"], "Hammers", { melee: true, metal: true }),
  W("Wooden Club, Small", "1H", 7, 2, "D8", 9, c(1, "silver"), "Common", ["Bludgeoning"], "Hammers", { melee: true }),
  W("Wooden Club, Large", "2H", 16, 2, "2D8", 12, c(2, "silver"), "Common", ["Bludgeoning"], "Hammers", { melee: true }),
  W("Staff", "2H", 7, 2, "D8", 9, c(2, "silver"), "Common", ["Bludgeoning", "Toppling"], "Staves", { melee: true }),
  W("Short Spear", "1H", 7, "STR×2", "D10", 9, c(5, "silver"), "Common", ["Piercing", "Can be thrown"], "Spears", { melee: true, metal: true }),
  W("Long Spear", "2H", 10, 4, "2D8", 9, c(1, "gold"), "Common", ["Long", "Piercing"], "Spears", { melee: true, metal: true }),
  W("Lance", "1H", 13, 4, "2D10", 12, c(12, "gold"), "Rare", ["Long", "Piercing", "Requires combat trained mount"], "Spears", { melee: true, metal: true }),
  W("Halberd", "2H", 13, 4, "2D8", 12, c(20, "gold"), "Rare", ["Long", "Toppling", "Piercing", "Slashing"], "Spears", { melee: true, metal: true, skillNote: "The book doesn't name the skill; Spears is assumed (long, piercing pole-arm)." }),
  W("Trident", "1H", 10, "STR", "2D6", 9, c(5, "gold"), "Uncommon", ["Toppling", "Piercing", "Can be thrown"], "Spears", { melee: true, metal: true }),
  W("Shield, Small", "1H", 7, 2, "D8", 15, c(4, "gold"), "Common", ["Bludgeoning"], null, { melee: true, shield: true, skillAny: "strMelee", skillNote: "No shield skill: parry (and strike) with any STR-based melee skill." }),
  W("Shield, Large", "1H", 13, 2, "D8", 18, c(12, "gold"), "Common", ["Bludgeoning"], null, { melee: true, shield: true, skillAny: "strMelee", skillNote: "No shield skill: parry (and strike) with any STR-based melee skill." }),
  W("Sling", "1H", null, 20, "D8", null, c(1, "silver"), "Common", ["Bludgeoning", "Tiny item"], "Slings", { ranged: true }),
  W("Short Bow", "2H", 7, 30, "D10", 3, c(25, "gold"), "Common", ["Piercing", "Requires quiver"], "Bows", { ranged: true }),
  W("Longbow", "2H", 13, 100, "D12", 6, c(50, "gold"), "Uncommon", ["Piercing", "Requires quiver"], "Bows", { ranged: true }),
  W("Crossbow, Light", "2H", 7, 40, "2D6", 6, c(75, "gold"), "Uncommon", ["Piercing", "Requires quiver", "No damage bonus"], "Crossbows", { ranged: true, noDamageBonus: true }),
  W("Crossbow, Heavy", "2H", 13, 60, "2D8", 9, c(200, "gold"), "Rare", ["Piercing", "Requires quiver", "No damage bonus"], "Crossbows", { ranged: true, noDamageBonus: true }),
  W("Crossbow, Hand", "1H", 7, 30, "2D6", 6, c(90, "gold"), "Rare", ["Piercing", "Requires quiver", "No damage bonus"], "Crossbows", { ranged: true, noDamageBonus: true }),
];

export const DB_WEAPON_FEATURES = {
  Subtle: "Boon and one extra damage die on sneak attacks.",
  Long: "Reaches enemies up to 4 m away, and past a friendly combatant.",
  Toppling: "Boon when trying to topple an opponent.",
  Piercing: "Piercing damage (matters for armor and Find Weak Spot; never damages a parrying weapon).",
  Slashing: "Slashing damage. A weapon that is both slashing and piercing: choose before rolling.",
  Bludgeoning: "Bludgeoning damage (matters for armor).",
};
export const DB_MASTERCRAFTED = { costMultiplier: 10, strReduction: 3, durabilityBonus: 3, text: "Costs ×10; STR requirement −3 and durability +3." };

// Everything else. category groups the book's tables. effect paraphrased.
const G = (category, name, cost, supply, weight, effect, extra) => ({ category, name, cost, supply, weight, effect, ...(extra || {}) });

export const DB_GEAR = [
  // Clothes (p.75)
  G("Clothes", "Boots", c(2, "gold"), "Uncommon", 1, "Protects against some journey mishaps."),
  G("Clothes", "Cloak", c(8, "silver"), "Uncommon", 1, "Protects against some journey mishaps."),
  G("Clothes", "Fine Garments", c(10, "gold"), "Uncommon", 1, "Boon on CHA-based skills when the GM finds it fitting."),
  G("Clothes", "Fur", c(1, "gold"), "Uncommon", 1, "Boon on Bushcraft rolls to resist cold."),
  G("Clothes", "Rags", c(5, "copper"), "Common", 1, "Bane on CHA-based skills when the GM finds it fitting."),
  G("Clothes", "Simple Clothes", c(5, "silver"), "Common", 1, "Needed to avoid a bane on CHA-based skills. Every character starts with a set (not recorded)."),
  // Musical instruments (p.75)
  G("Musical Instruments", "Bagpipe", c(30, "gold"), "Uncommon", 1, "Musician costs 1 WP and reaches 50 m.", { musician: { wp: 1, range: 50 } }),
  G("Musical Instruments", "Drum", c(4, "gold"), "Common", 1, "Musician reaches 20 m.", { musician: { range: 20 } }),
  G("Musical Instruments", "Flute", c(2, "gold"), "Common", 1, "Musician costs 2 WP.", { musician: { wp: 2 } }),
  G("Musical Instruments", "Harp", c(8, "gold"), "Uncommon", 2, "Musician costs 1 WP.", { musician: { wp: 1 } }),
  G("Musical Instruments", "Horn", c(6, "gold"), "Common", 1, "Musician reaches 100 m.", { musician: { range: 100 } }),
  G("Musical Instruments", "Lyre", c(20, "gold"), "Uncommon", 1, "Musician costs 1 WP.", { musician: { wp: 1 } }),
  // Trade goods (p.76–77)
  G("Trade Goods", "Abacus", c(2, "gold"), "Common", 1, "Boon on INT rolls for maths problems."),
  G("Trade Goods", "Blanket", c(5, "silver"), "Common", 1, "Needed to avoid a bane on rolls against cold."),
  G("Trade Goods", "Chess Set", c(1, "gold"), "Common", 1, "Opposed INT roll decides the winner."),
  G("Trade Goods", "Dice", c(1, "silver"), "Common", 0, "Chance decides the winner."),
  G("Trade Goods", "Field Kitchen", c(4, "gold"), "Common", 2, "Boon on Bushcraft rolls for cooking."),
  G("Trade Goods", "Field Ration", c(1, "silver"), "Common", 0.25, "Eat one a day or go hungry. Four rations count as one item.", { food: true }),
  G("Trade Goods", "Grappling Hook", c(3, "gold"), "Common", 1, "Secures a rope; thrown and caught with an Acrobatics roll up to STR metres (STR×2 with a bane)."),
  G("Trade Goods", "Lockpicks, Advanced", c(20, "gold"), "Rare", 1, "Boon on Sleight of Hand to pick locks."),
  G("Trade Goods", "Lockpicks, Simple", c(1, "gold"), "Uncommon", 1, "Needed to avoid a bane on Sleight of Hand to pick locks."),
  G("Trade Goods", "Magnifying Glass", c(30, "gold"), "Uncommon", 1, "Boon on Spot Hidden."),
  G("Trade Goods", "Map", c(5, "gold"), "Uncommon", 0, "Needed to avoid a bane on Bushcraft when leading the way on a journey."),
  G("Trade Goods", "Marbles", c(1, "gold"), "Common", 1, "Thrown at a humanoid within 10 m as an action; next turn it must pass Evade (not an action) to move.", { usable: "action" }),
  G("Trade Goods", "Padlock", c(10, "gold"), "Common", 0, "Locks a door or chest; 20 HP, armor 5."),
  G("Trade Goods", "Perfume (10 doses)", c(5, "gold"), "Common", 1, "Boon on CHA-based rolls when the GM finds it fitting.", { doses: 10 }),
  G("Trade Goods", "Playing Cards", c(5, "silver"), "Uncommon", 0, "Opposed Bluffing roll decides the winner."),
  G("Trade Goods", "Quiver of Arrows, Iron Head", c(2, "gold"), "Common", 1, "Needed to shoot bows or crossbows.", { quiver: true, metal: true }),
  G("Trade Goods", "Quiver of Arrows, Wooden Head", c(5, "silver"), "Common", 1, "Needed to shoot bows or crossbows; armor counts double against these arrows.", { quiver: true }),
  G("Trade Goods", "Rope, Hemp", c(1, "gold"), "Common", 1, "10 metres. Boon on Acrobatics for climbing when secured."),
  G("Trade Goods", "Rope, Silk", c(10, "gold"), "Uncommon", 0, "10 metres. Boon on Acrobatics for climbing when secured."),
  G("Trade Goods", "Saddle", c(10, "gold"), "Common", 1, "Needed to avoid a bane when fighting on horseback."),
  G("Trade Goods", "Sleeping Fur", c(1, "gold"), "Common", 1, "Needed to avoid a bane on Bushcraft when making camp. (Kits call it a sleeping pelt.)"),
  G("Trade Goods", "Spyglass", c(50, "gold"), "Rare", 1, "Boon on Bushcraft when leading the way on a journey."),
  G("Trade Goods", "Tent, Small", c(2, "gold"), "Common", 2, "Sleeps two; boon on Bushcraft to make camp (one rolls, others may help)."),
  G("Trade Goods", "Tent, Large", c(4, "gold"), "Common", 4, "Sleeps six; boon on Bushcraft to make camp (one rolls, others may help)."),
  G("Trade Goods", "Whistle", c(5, "silver"), "Common", 0, "Heard up to 100 m away."),
  // Studies & magic (p.77)
  G("Studies & Magic", "Amulet", c(3, "gold"), "Uncommon", 0, "A focus for spells.", { focus: true }),
  G("Studies & Magic", "Book", c(25, "gold"), "Uncommon", 1, "Boon on skill rolls in its subject; price varies by subject."),
  G("Studies & Magic", "Brooch", c(5, "gold"), "Uncommon", 0, "A focus for spells.", { focus: true }),
  G("Studies & Magic", "Chalk", c(1, "copper"), "Common", 0, "A focus for spells.", { focus: true }),
  G("Studies & Magic", "Grimoire", c(50, "gold"), "Unique", 1, "Holds a mage's spells; price varies with its contents and may be far higher.", { grimoire: true }),
  G("Studies & Magic", "Hourglass", c(25, "gold"), "Rare", 1, "A focus for spells.", { focus: true }),
  G("Studies & Magic", "Notebook", c(5, "gold"), "Common", 1, "Blank; can serve as a grimoire."),
  G("Studies & Magic", "Orbuculum", c(18, "gold"), "Uncommon", 1, "A focus for spells.", { focus: true }),
  G("Studies & Magic", "Paper (sheet)", c(2, "silver"), "Uncommon", 0, "Spells can be written on it."),
  G("Studies & Magic", "Parchment (sheet)", c(1, "silver"), "Common", 0, "Spells can be written on it."),
  G("Studies & Magic", "Quill & Ink", c(10, "gold"), "Uncommon", 1, "For writing down spells."),
  G("Studies & Magic", "Reliquary", c(5, "gold"), "Uncommon", 1, "A focus for spells.", { focus: true }),
  G("Studies & Magic", "Wand", c(10, "gold"), "Uncommon", 1, "A focus for spells.", { focus: true }),
  // Light sources (p.78)
  G("Light Sources", "Flint & Tinder", c(5, "silver"), "Common", 0, "Needed to light torches, candles and lanterns and to make fire."),
  G("Light Sources", "Lamp Oil", c(3, "silver"), "Common", 1, "Ten doses; each keeps a lamp or lantern burning for up to a shift.", { doses: 10 }),
  G("Light Sources", "Lantern", c(10, "gold"), "Common", 1, "Lights a 10 m radius for up to a shift; roll D8 after each stretch — on a 1 it goes out and must be refilled and relit (an action).", { light: { radius: 10, die: "D8" } }),
  G("Light Sources", "Oil Lamp", c(1, "gold"), "Common", 1, "Lights a 10 m radius for up to a shift; roll D6 after each stretch — on a 1 it goes out and must be refilled and relit (an action).", { light: { radius: 10, die: "D6" } }),
  G("Light Sources", "Tallow Candle", c(1, "copper"), "Common", 0, "Lights a 4 m radius for up to a shift; roll D4 after each stretch or when its bearer attacks or is attacked — a 1 puts it out.", { light: { radius: 4, die: "D4" } }),
  G("Light Sources", "Torch", c(5, "copper"), "Common", 1, "Lights a 10 m radius for up to a shift; roll D6 after each stretch or when used as a weapon — a 1 puts it out. Can be swung as a small wooden club dealing fire damage.", { light: { radius: 10, die: "D6" } }),
  // Tools (p.78)
  G("Tools", "Crowbar", c(2, "gold"), "Common", 1, "2D6 damage to a door or wall, hitting automatically without risk to itself."),
  G("Tools", "Hammer", c(1, "gold"), "Common", 1, "2D4 damage to a door or wall, hitting automatically without risk to itself."),
  G("Tools", "Needle & Thread", c(3, "silver"), "Common", 0, "Mends clothes with a Crafting roll."),
  G("Tools", "Pickaxe", c(3, "gold"), "Common", 1, "2D8 damage to a door or wall, hitting automatically without risk to itself."),
  G("Tools", "Saw", c(5, "gold"), "Uncommon", 1, "Cuts metal or wood in a stretch."),
  G("Tools", "Shovel", c(2, "gold"), "Common", 1, "Halves digging time."),
  G("Tools", "Sledgehammer", c(3, "gold"), "Common", 2, "2D10 damage to a door or wall, hitting automatically without risk to itself."),
  G("Tools", "Blacksmithing Tools", c(20, "gold"), "Uncommon", 1, "Used for Crafting (needed for Master Blacksmith)."),
  G("Tools", "Carpentry Tools", c(8, "gold"), "Uncommon", 1, "Used for Crafting (needed for Master Carpenter)."),
  G("Tools", "Tanning Tools", c(5, "gold"), "Uncommon", 1, "Used for Crafting (needed for Master Tanner)."),
  // Containers (p.79)
  G("Containers", "Backpack", c(3, "gold"), "Common", 0, "Carrying capacity +2; one per person.", { capacity: 2 }),
  G("Containers", "Barrel", c(2, "gold"), "Common", 2, "Holds 15 weight units; 10 HP, armor 3."),
  G("Containers", "Basket", c(4, "silver"), "Common", 1, "Holds 10 weight units."),
  G("Containers", "Bottle", c(1, "gold"), "Common", 1, "Holds 1 unit of liquid."),
  G("Containers", "Bucket", c(5, "copper"), "Common", 1, "Holds up to 5 units of liquid."),
  G("Containers", "Chest", c(5, "gold"), "Common", 3, "Holds 20 weight units; 25 HP, armor 5."),
  G("Containers", "Clay Jug", c(5, "silver"), "Common", 1, "Holds 1 unit of liquid."),
  G("Containers", "Saddle Bag", c(6, "gold"), "Common", 0, "An animal's carrying capacity +2; at most two per animal."),
  // Medicine (p.79)
  G("Medicine", "Poison, Lethal", c(2, "gold", { note: "× potency, per dose" }), "Uncommon", 1, "Lethal poison (see Poison).", { poison: "lethal" }),
  G("Medicine", "Poison, Paralyzing", c(12, "silver", { note: "× potency, per dose" }), "Uncommon", 1, "Paralyzing poison (see Poison).", { poison: "paralyzing" }),
  G("Medicine", "Poison, Sleeping", c(6, "silver", { note: "× potency, per dose" }), "Uncommon", 1, "Sleeping poison (see Poison).", { poison: "sleeping" }),
  G("Medicine", "Herbal Concoction", c(1, "gold", { note: "per dose" }), "Uncommon", 1, "Boon on Healing rolls to fight disease.", { consumable: true }),
  G("Medicine", "Healing Potion", c(50, "gold", { note: "per dose" }), "Rare", 1, "Instantly heals 2D6 HP. Stronger potions heal more and cost more.", { consumable: true, heal: "2D6", usable: "action" }),
  G("Medicine", "Bandages (10)", c(5, "silver"), "Common", 1, "Needed to avoid a bane on Healing rolls to save a life; each attempt uses one.", { doses: 10 }),
  G("Medicine", "Surgical Instruments", c(15, "gold"), "Uncommon", 1, "Boon on Healing rolls to save a life."),
  // Services (p.80)
  G("Services", "Bath at an Inn", c(6, "copper"), "Common", null, "Heals a condition of your choice in a stretch; once per day."),
  G("Services", "Bodyguard", c(2, "gold", { per: "day" }), "Uncommon", null, "Stats as a typical guard."),
  G("Services", "Bowl of Stew", c(5, "copper"), "Common", null, "Covers a day's food."),
  G("Services", "Clothes Repair", c(5, "silver"), "Common", null, "Undoes the effect of torn clothes."),
  G("Services", "Courier", c(1, "silver", { per: "kilometer" }), "Common", null, "Delivers a message."),
  G("Services", "Feast", c(2, "gold"), "Uncommon", null, "Covers a day's food."),
  G("Services", "Goblet of Wine", c(2, "silver"), "Uncommon", null, "After two goblets in a shift, each further goblet gives a condition of your choice."),
  G("Services", "Haircut", c(2, "silver"), "Common", null, "Heals a chosen condition in a stretch; once per week."),
  G("Services", "Healing", c(5, "gold"), "Uncommon", null, "Healing rolls succeed automatically."),
  G("Services", "Lodging at Inn, Separate Room", c(5, "silver"), "Common", null, "A shift rest without a Bushcraft roll."),
  G("Services", "Lodging at Inn, Dormitory", c(1, "silver"), "Common", null, "A shift rest without a Bushcraft roll, but roll D4 each shift — on a 1 someone's snoring keeps the room awake."),
  G("Services", "Lodging at Inn, Luxury Suite", c(2, "gold"), "Uncommon", null, "A shift rest without a Bushcraft roll."),
  G("Services", "Meal at an Inn", c(3, "silver"), "Common", null, "Covers a day's food."),
  G("Services", "Road Toll", c(2, "copper"), "Common", null, "Lets you pass."),
  G("Services", "Stagecoach", c(3, "copper", { per: "kilometer" }), "Common", null, "Travel to a set destination."),
  G("Services", "Tankard of Mead", c(4, "copper"), "Common", null, "After three tankards in a shift, each further tankard gives a condition of your choice."),
  G("Services", "Teacher", c(5, "gold", { per: "shift or more" }), "Uncommon", null, "A shift of teaching grants an extra advancement roll."),
  // Hunting & fishing (p.81)
  G("Hunting & Fishing", "Bear Trap", c(3, "gold"), "Uncommon", 1, "Used for hunting."),
  G("Hunting & Fishing", "Fishing Rod", c(8, "silver"), "Common", 1, "D4 food rations when fishing."),
  G("Hunting & Fishing", "Fishing Net", c(2, "gold"), "Common", 2, "D6 food rations when fishing."),
  G("Hunting & Fishing", "Snare", c(5, "copper"), "Common", 1, "Used for hunting; one use only."),
  // Means of travel (p.81)
  G("Means of Travel", "Canoe", c(6, "gold"), "Common", null, "Carries two people and 10 weight units.", { carries: { people: 2, weight: 10 } }),
  G("Means of Travel", "Cart", c(15, "gold"), "Common", null, "Pulled by one horse or donkey; carries two people and 50 weight units.", { carries: { people: 2, weight: 50 } }),
  G("Means of Travel", "Rowing Boat", c(15, "gold"), "Common", null, "Carries four people and 50 weight units.", { carries: { people: 4, weight: 50 } }),
  G("Means of Travel", "Sailing Boat", c(40, "gold"), "Uncommon", null, "Carries six people and 100 weight units.", { carries: { people: 6, weight: 100 } }),
  G("Means of Travel", "Wagon", c(30, "gold"), "Common", null, "Pulled by two horses or donkeys; carries four people and 100 weight units.", { carries: { people: 4, weight: 100 } }),
  // Animals (p.81)
  G("Animals", "Chicken", c(4, "silver"), "Common", null, "One ration of food when slaughtered (cook the meat)."),
  G("Animals", "Combat Trained Horse", c(400, "gold"), "Rare", null, "Carries one rider and 10 weight units, or two riders. Needed to fight mounted.", { carries: { riders: 1, weight: 10 }, mount: true, combatTrained: true }),
  G("Animals", "Cow", c(10, "gold"), "Uncommon", null, "D4 rations of milk a day, 2D10 rations when slaughtered (cook the meat)."),
  G("Animals", "Donkey", c(12, "gold"), "Common", null, "Carries 10 weight units; can't be ridden.", { carries: { weight: 10 } }),
  G("Animals", "Guard Dog", c(15, "gold"), "Common", null, "Protects its owner (dog stats)."),
  G("Animals", "Homing Pigeon in Cage", c(2, "gold"), "Uncommon", null, "Flies home to its dovecote when released."),
  G("Animals", "Pig", c(2, "gold"), "Common", null, "2D6 rations when slaughtered (cook the meat)."),
  G("Animals", "Riding Horse", c(60, "gold"), "Uncommon", null, "Carries one rider and 10 weight units, or two riders.", { carries: { riders: 1, weight: 10 }, mount: true }),
  G("Animals", "Sheep", c(3, "gold"), "Common", null, "2D4 rations when slaughtered (cook the meat)."),
];
