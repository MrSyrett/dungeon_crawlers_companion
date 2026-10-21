// Pirate Borg — equipment (Player's Guidebook pg. 27, 50-53; costs cross-checked with the Rules Reference).
// cost = silver (s) as a number; costText keeps ranges/"+" exactly; null = no listed price ("–").

const W = (name, type, damage, cost, o = {}) => ({
  name, type, damage, cost, hands: 1, reach: null, range: null, reload: null, blackPowder: false, ammo: null, special: null, ...o,
});

export const PB_WEAPONS = [
  // melee
  W("Unarmed/Insults", "melee", "d2", null, { aliases: ["unarmed", "insults", "fists"] }),
  W("Broken Bottle", "melee", "d2", null),
  W("Knife/Dagger", "melee", "d4", 10, { aliases: ["knife", "dagger"] }),
  W("Hook", "melee", "d4", 8),
  W("Bayonet", "melee", "d4", 15),
  W("Belaying Pin", "melee", "d4", 10),
  W("Marlinspike", "melee", "d4", 10),
  W("Wood Plank", "melee", "d4", null),
  W("Whale Bone", "melee", "d4", null),
  W("Smallsword", "melee", "d4", 20, { sword: true }),
  W("Cudgel", "melee", "d4", 10),
  W("Cat O' Nine Tails", "melee", "d4", 15, { reach: 10 }),
  W("Machete", "melee", "d4", 25),
  W("Heavy Club", "melee", "d6", 20),
  W("Chain", "melee", "d6", 25),
  W("Grappling Hook", "melee", "d6", 35),
  W("Boarding Axe", "melee", "d6", 20),
  W("Hatchet", "melee", "d6", 20),
  W("Tomahawk", "melee", "d6", 20),
  W("Cutlass", "melee", "d6", 25, { sword: true }),
  W("Scimitar", "melee", "d6", 25, { sword: true }),
  W("Rapier", "melee", "d6", 30, { sword: true }),
  W("Broadsword", "melee", "d8", 35, { sword: true }),
  W("Officer's Cutlass", "melee", "d8", 50, { sword: true }),
  W("Harpoon", "melee", "d8", 35),
  W("Finely Crafted Rapier", "melee", "d8", 50, { sword: true, aliases: ["fine rapier"] }),
  W("Anchor", "melee", "d10", 60, { hands: 2 }),
  W("Boarding Pike", "melee", "d10", 60, { hands: 2, reach: 10 }),
  // ranged
  W("Throwing Knives", "ranged", "d4", 8, { thrown: true }),
  W("Blowpipe", "ranged", null, 30, { ammo: "darts", special: "Uses darts (see Ammo). Fumble: hit yourself or an ally.", damageFromAmmo: true }),
  W("Throwing Axes", "ranged", "d6", 20, { thrown: true }),
  W("Harpoon Gun", "ranged", "d8", 60, { special: "Target tests STRENGTH DR12 or is pulled to the shooter.", targetTest: { ability: "STRENGTH", dr: 12 } }),
  W("Flintlock Pistol", "ranged", "2d4", 50, { reload: 2, range: 30, blackPowder: true, ammo: "shot", pistol: true }),
  W("Blunderbuss", "ranged", "d4", 65, { reload: 2, range: 30, blackPowder: true, ammo: "shot", closeDamage: "d10", closeRange: 10, special: "Deals d10 within 10'." }),
  W("Musket", "ranged", "2d6", 80, { hands: 2, reload: 2, range: 150, blackPowder: true, ammo: "shot" }),
  W("Buccaneer Musket", "ranged", "2d8", 100, { hands: 2, reload: 2, range: 150, blackPowder: true, ammo: "shot" }),
];

export const PB_STARTING_WEAPONS = {
  id: "startingWeapons", name: "Starting Weapon", die: "d10", page: 50,
  note: "Roll your class's weapon die on this table (d6 → entries 1-6, d8 → 1-8, d10 → all). Guns start with 10 + PRESENCE rounds of shot.",
  rows: [
    { roll: 1, text: "Marlinspike or Belaying Pin (d4)", choice: ["marlinspike", "belaying-pin"], damage: "d4" },
    { roll: 2, text: "Knife or Bayonet (d4)", choice: ["knife-dagger", "bayonet"], damage: "d4" },
    { roll: 3, text: "Smallsword or Machete (d4)", choice: ["smallsword", "machete"], damage: "d4" },
    { roll: 4, text: "Cat O' Nine Tails (d4, 10' reach)", weapon: "cat-o-nine-tails", damage: "d4" },
    { roll: 5, text: "Boarding Axe (d6)", weapon: "boarding-axe", damage: "d6" },
    { roll: 6, text: "Cutlass (d6)", weapon: "cutlass", damage: "d6" },
    { roll: 7, text: "Flintlock Pistol (2d4, Reload 2 actions, range 30', ammo: 10 + PRESENCE rounds of shot)", weapon: "flintlock-pistol", damage: "2d4", ammo: { item: "rounds of shot", qty: "10 + PRESENCE" } },
    { roll: 8, text: "Finely Crafted Rapier (d8)", weapon: "finely-crafted-rapier", damage: "d8" },
    { roll: 9, text: "Boarding Pike (d10, 10' reach)", weapon: "boarding-pike", damage: "d10" },
    { roll: 10, text: "Musket (2d6, Reload 2 actions, range 150', ammo: 10 + PRESENCE rounds of shot)", weapon: "musket", damage: "2d6", ammo: { item: "rounds of shot", qty: "10 + PRESENCE" } },
  ],
};

export const PB_AMMO = [
  { id: "shot", name: "20 rounds of shot", qty: 20, cost: 10, damage: null, for: ["flintlock-pistol", "blunderbuss", "musket", "buccaneer-musket"] },
  { id: "berserk-darts", name: "10 berserk darts", qty: 10, cost: 20, damage: "d4", dart: true,
    effect: "Target tests TOUGHNESS DR12 or must attack the closest creature for d4 rounds.", targetTest: { ability: "TOUGHNESS", dr: 12 } },
  { id: "poison-darts", name: "10 poison darts", qty: 10, cost: 20, damage: "d4", dart: true,
    effect: "Target tests TOUGHNESS DR12 or takes d6 damage.", targetTest: { ability: "TOUGHNESS", dr: 12 }, failDamage: "d6" },
  { id: "sleep-darts", name: "10 sleep darts", qty: 10, cost: 20, damage: "d4", dart: true,
    effect: "Target tests TOUGHNESS DR12 or falls asleep for d6 rounds.", targetTest: { ability: "TOUGHNESS", dr: 12 } },
];

export const PB_BOMB_RULES = {
  page: 53, throw: { ability: "AGILITY", dr: 12 }, blast: { feet: 5, test: { ability: "AGILITY", dr: 12 } },
  text: "Light the fuse and throw: test AGILITY DR12 to hit an area. Creatures within 5' of it test AGILITY DR12 or take the damage. Crit: double damage. Fumble: it hits you and/or d4 allies instead.",
};
export const PB_BOMBS = [
  { roll: 1, id: "smoke-bomb", name: "Smoke Bomb", damage: null, cost: 10, effect: "Smoke cloud: blind for d4 rounds." },
  { roll: 2, id: "improvised-grenade", name: "Improvised Grenade", damage: "d10", cost: 20 },
  { roll: 3, id: "clay-grenade", name: "Clay Grenade", damage: "2d8", cost: 30 },
  { roll: 4, id: "iron-grenade", name: "Iron Grenade", damage: "3d6", cost: 40 },
  { roll: 5, id: "fire-pot", name: "Fire Pot", damage: "d6", cost: 15, effect: "Roll d6 each turn: 1-2 it spreads, 6 the fire goes out; otherwise take d6 damage.", burning: { die: "d6", spreads: [1, 2], out: 6, damage: "d6" } },
  { roll: 6, id: "stink-ball", name: "Stink Ball", damage: "2d4", cost: 20, effect: "TOUGHNESS DR12 or poisoned.", targetTest: { ability: "TOUGHNESS", dr: 12 } },
];

// Clothing & armor d10 (pg. 52). agilityDR = penalty on AGILITY tests; defenseDR = penalty on defense.
export const PB_CLOTHING = [
  { roll: [1, 2], id: "rags", name: "Rags", tier: 0, armorDie: null, cost: null, agilityDR: 0, defenseDR: 0 },
  { roll: [3, 4], id: "common-clothes", name: "Common Clothes", tier: 0, armorDie: null, cost: 2, agilityDR: 0, defenseDR: 0 },
  { roll: 5, id: "old-uniform", name: "Old Uniform", tier: 0, armorDie: null, cost: 8, agilityDR: 0, defenseDR: 0 },
  { roll: 6, id: "fancy-clothes", name: "Fancy Clothes", tier: 0, armorDie: null, cost: 250, agilityDR: 0, defenseDR: 0, special: "You look amazing." },
  { roll: 7, id: "leather-armor", name: "Leather Armor", tier: 1, armorDie: "d2", cost: 20, agilityDR: 0, defenseDR: 0 },
  { roll: 8, id: "hide-armor", name: "Hide Armor", tier: 1, armorDie: "d2", cost: 25, agilityDR: 0, defenseDR: 0 },
  { roll: 9, id: "chain-shirt", name: "Chain Shirt", tier: 2, armorDie: "d4", cost: 100, agilityDR: 2, defenseDR: 2, metal: true, special: "DR +2 on AGILITY tests, including defense." },
  { roll: 10, id: "conquistador-plate", name: "Conquistador Plate", tier: 3, armorDie: "d6", cost: 200, agilityDR: 4, defenseDR: 2, metal: true, sinks: true, special: "DR +4 on AGILITY tests; defense is DR +2. You'll most likely sink and drown in water." },
];
export const PB_CLOTHING_RULES = {
  page: 52, notCarried: true,
  text: "Pirates and sailors almost never wear armor or carry shields: black powder ignores armor, and armor gets you snagged, thrown overboard and drowned. Hats and clothing don't count toward carrying capacity. Check your class for your clothing die; landlubbers roll d10. Relics and arcane rituals almost never work in tier 2 or 3 armor or while wielding cold iron.",
};

export const PB_HATS = [
  { roll: [1, 4], id: "no-hat", name: "None", cost: null, none: true },
  { roll: 5, id: "wig", name: "Wig", cost: 8 },
  { roll: 6, id: "bandanna", name: "Bandanna", cost: 2 },
  { roll: 7, id: "cavalier", name: "Cavalier", cost: 15 },
  { roll: 8, id: "bicorne", name: "Bicorne", cost: 15 },
  { roll: 9, id: "plain-tricorne", name: "Plain Tricorne", cost: 10 },
  { roll: 10, id: "fancy-tricorne", name: "Fancy Tricorne", cost: 90 },
  { roll: 11, id: "metal-lined-hat", name: "Metal Lined Hat", cost: 20, damageReduction: 1, metal: true, special: "−1 damage." },
  { roll: 12, id: "morion", name: "Morion (conquistador helmet)", cost: 90, damageReduction: 1, metal: true, sacrifice: true,
    special: "−1 damage. Or choose to ignore all damage from one attack, but the helmet breaks." },
];

const G = (name, cost, o = {}) => ({ name, cost, costText: cost == null ? "–" : `${cost}s`, category: "gear", ...o });
export const PB_GEAR = [
  G("Backpack", 6, { category: "container", capacity: 10 }),
  G("Bandolier", 4, { category: "container", capacity: 6, small: true }),
  G("Blanket & Pillow", 5),
  G("Bucket", 3, { category: "container", capacity: 4 }),
  G("Candle", 1, { light: true, duration: "1 hour", consumable: true }),
  G("Cannon Ball", 3),
  G("Compass", 75),
  G("Dinghy", 250, { category: "vessel", note: "core book, pg. 80", ship: "dinghy" }),
  G("Dried Food", 1, { duration: "1 day", consumable: true, ration: true, aliases: ["ration", "rations"] }),
  G("Fishing Rod", 25),
  G("Flask", 2),
  G("Flint and Steel", 3, { aliases: ["flint & steel"] }),
  G("Hammer", 8),
  G("Ink, Quill, Parchment", 20),
  G("Lantern", 10, { light: true, fuel: "lantern-oil" }),
  G("Lantern Oil", 5, { duration: "d6 hours", consumable: true, fuelFor: "lantern" }),
  G("Livestock", null, { costText: "20-200s", costMin: 20, costMax: 200 }),
  G("Lock Picks", 5),
  G("Longboat", 500, { category: "vessel", note: "core book, pg. 81", ship: "longboat" }),
  G("Manacles", 10),
  G("Medical Kit", 15, { uses: "PRESENCE + 4", consumable: true, heal: "d6", cures: ["bleeding", "poison", "infection"],
    effect: "Stops bleeding, poison or infection and heals d6 HP." }),
  G("Mess Kit", 8),
  G("Metal File", 10),
  G("Mirror", 15),
  G("Musical Instrument", 250, { costText: "250s+", costMin: 250, table: "instruments" }),
  G("Peg Leg", 15),
  G("Pocket Watch", 45),
  G("Rope (30')", 4, { aliases: ["rope", "30' of rope"] }),
  G("Satchel", 5, { category: "container", capacity: 8 }),
  G("Sea Chest, Large", 50, { category: "container", capacity: 20 }),
  G("Sea Chest, Small", 20, { category: "container", capacity: null }),
  G("Shovel", 5),
  G("Smoking Pipe", 10),
  G("Speaking Trumpet", 30),
  G("Spyglass", 150),
  G("Tankard", 2),
  G("Tattoo", null, { costText: "10-150s", costMin: 10, costMax: 150 }),
  G("Tent", 25),
  G("Tobacco", 10, { uses: "d6", consumable: true }),
  G("Torch", 2, { light: true, duration: "1 hour", consumable: true }),
  G("Water Skin", 2),
  G("Whetstone", 5),
];

export const PB_CONTAINERS = [
  { roll: 1, id: "bucket", name: "Bucket", capacity: 4, size: "normal", text: "A bucket for 4 normal-sized items." },
  { roll: 2, id: "bandolier", name: "Bandolier", capacity: 6, size: "small", text: "A bandolier for 6 small-sized items." },
  { roll: 3, id: "satchel", name: "Satchel", capacity: 8, size: "normal", text: "A satchel for 8 normal-sized items." },
  { roll: 4, id: "backpack", name: "Backpack", capacity: 10, size: "normal", text: "A backpack for 10 normal-sized items." },
  { roll: 5, id: "sea-chest-large", name: "Large Sea Chest", capacity: 20, size: "normal", orChoice: true, text: "A large sea chest for 20 normal-sized items, or one of the above of your choice." },
  { roll: 6, id: "dinghy", name: "Dinghy", capacity: null, orChoice: true, ship: "dinghy", text: "A dinghy, or one of the above of your choice." },
];

export const PB_PETS = [
  { roll: 1, name: "Snake" }, { roll: 2, name: "Rat" }, { roll: 3, name: "Lizard" }, { roll: 4, name: "Monkey" }, { roll: 5, name: "Parrot" },
  { roll: 6, name: "Cat" }, { roll: 7, name: "Dog" }, { roll: 8, name: "Hawk" }, { roll: 9, name: "Hermit Crab" }, { roll: 10, name: "Fish in a Jar" },
];
export const PB_INSTRUMENTS = [
  { roll: 1, name: "Concertina" }, { roll: 2, name: "Drum" }, { roll: 3, name: "Flute" }, { roll: 4, name: "Fiddle" }, { roll: 5, name: "Banjo" },
  { roll: 6, name: "Horn" }, { roll: 7, name: "Hurdy-Gurdy" }, { roll: 8, name: "Guitar" }, { roll: 9, name: "Mandolin" }, { roll: 10, name: "Voice of an Angel", notAnItem: true },
];

export const PB_CHEAP_GEAR = [
  { roll: 1, text: "Lantern (d6 hours of oil)", item: "lantern", extra: { item: "lantern-oil", note: "d6 hours of oil" } },
  { roll: 2, text: "d4 candles (1 hour each)", item: "candle", qty: "d4" },
  { roll: 3, text: "30' of rope", item: "rope-30" },
  { roll: 4, text: "Shovel", item: "shovel" },
  { roll: 5, text: "Medical kit (stops bleeding/poison/infection and heals d6 HP, PRESENCE + 4 uses)", item: "medical-kit" },
  { roll: 6, text: "Weighted dice", item: null },
  { roll: 7, text: "Flint & steel", item: "flint-and-steel" },
  { roll: 8, text: "Hammer & nails", item: "hammer" },
  { roll: 9, text: "Mess kit", item: "mess-kit" },
  { roll: 10, text: "Pipe & tobacco pouch", item: "smoking-pipe", extra: { item: "tobacco" } },
  { roll: 11, text: "d6 torches (1 hour each)", item: "torch", qty: "d6" },
  { roll: 12, text: "A pet (d10)", table: "pets" },
];
export const PB_FANCY_GEAR = [
  { roll: 1, text: "Compass", item: "compass" },
  { roll: 2, text: "Spyglass", item: "spyglass" },
  { roll: 3, text: "Fishing rod", item: "fishing-rod" },
  { roll: 4, text: "1 random Ancient Relic (pg. 62)", table: "relics" },
  { roll: 5, text: "Bottle of fine rum", item: null },
  { roll: 6, text: "Old pocket watch", item: "pocket-watch" },
  { roll: 7, text: "Blanket & pillow", item: "blanket-and-pillow" },
  { roll: 8, text: "Ink, quill, parchment", item: "ink-quill-parchment" },
  { roll: 9, text: "Worn out book", item: null },
  { roll: 10, text: "Tent", item: "tent" },
  { roll: 11, text: "Whetstone", item: "whetstone" },
  { roll: 12, text: "Instrument (d10)", table: "instruments" },
];

export const PB_HOSPITALITY = [
  { name: "Night at an inn", cost: 4, costText: "4s" },
  { name: "Night at a brothel", cost: null, costText: "15-250s", costMin: 15, costMax: 250 },
  { name: "Grog", cost: 1, costText: "1s", drink: true },
  { name: "Good rum", cost: 3, costText: "3s", drink: true },
  { name: "Fine wine", cost: 10, costText: "10s", drink: true },
  { name: "A day's rations", cost: 1, costText: "1s", ration: true },
  { name: "Decent meal", cost: 2, costText: "2s" },
  { name: "Admiral's feast", cost: 25, costText: "25s" },
];

export const PB_ARMOR_REPAIR = {
  page: 53,
  rows: [{ from: 1, to: 2, cost: 25, text: "Tier 1 to tier 2" }, { from: 2, to: 3, cost: 40, text: "Tier 2 to tier 3" }],
  note: "Armor can't be repaired to a tier higher than its original. Armor reduced below tier 1 is ruined and can't be repaired.",
};
