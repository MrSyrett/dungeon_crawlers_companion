// Pirate Borg — creatures, NPCs and ships with published stat blocks.
// Sources: "Trapped in the Tropics", the Core Rules (blocks that appear in both carry `sources` with both pages and
// the Core Rules as primary `source`) (Limithron starter adventure; page = printed page, which equals the PDF page)
// and the Player's Guidebook (the only creature stats it prints: Skeletal Thrall, Phantasmal Fauna, mishap birds).
// Every block transcribed from the rasterised page images. No invented monsters.
//
// Stat-block convention (MÖRK BORG family): enemies never roll in combat. PCs attack at DR12 and defend at DR12
// unless the block says otherwise; `dr` records those PC-side DRs when a block changes them
// (e.g. Quick "DR14 to attack and defend" → dr: { attack: 14, defend: 14 }).
// morale: 2-12, or null for "–" (never checks morale). armor: { name, die } or null for "No Armor".

const TT = "Trapped in the Tropics";
const PG = "Player's Guidebook";
const CR = "Core Rules";
const A = (name, damage, notes) => ({ name, damage, ...(notes ? { notes } : {}) });
const S = (name, text) => ({ name, text });

const ZOMBIE_INFECTION = S("Zombie Infection", "Anyone bitten by a zombie tests TOUGHNESS DR8 or dies within two days, then rises as a zombie. A zombie that eats flesh recovers d4 HP (d8 if it's a brain).");

export const PB_MONSTERS = [
  // ---- Trapped in the Tropics: Redcoats (pg. 15, 21) -----------------------------------------
  { name: "Redcoat Soldier", category: "npc", group: "Redcoats", hp: 5, morale: 5, armor: null,
    attacks: [A("Cutlass", "d6")], specials: [], text: "British soldier patrolling the islands.", source: TT, page: 15 },
  { name: "Redcoat Gunner", category: "npc", group: "Redcoats", hp: 3, morale: 5, armor: null,
    attacks: [A("Musket", "2d6", "Reload: 2 actions"), A("Bayonet", "d4")], specials: [], blackPowder: true,
    text: "Redcoat musketeer.", source: TT, page: 15 },
  { name: "Redcoat Officer", category: "npc", group: "Redcoats", hp: 10, morale: 9, armor: { name: "Doublet", die: "d2", tier: 1 },
    attacks: [A("Officer's Cutlass", "d8"), A("Flintlock", "2d4", "Reload: 2 actions")],
    specials: [S("Leader", "Nearby crew are +3 Morale and DR +2 to defend against.")], blackPowder: true,
    text: "Commands a Redcoat detachment.", source: TT, page: 15 },

  // ---- Zombies (pg. 15, 27) ------------------------------------------------------------------
  { name: "\"Bilge Rat\" Zombie", category: "undead", group: "Zombies", hp: 5, morale: null, armor: null,
    attacks: [A("Claw", "d4+1"), A("Bite", "d4", "+ Zombie Infection")], specials: [ZOMBIE_INFECTION],
    text: "A shambling, brain-hungry zombie.", source: CR, page: 94, sources: [{ source: CR, page: 94 }, { source: TT, page: 27 }] },
  { name: "\"Deck Ghoul\" Zombie", category: "undead", group: "Zombies", hp: 7, morale: null, armor: null,
    attacks: [A("Claw", "d6"), A("Bite", "d4", "+ Zombie Infection")],
    specials: [S("Quick", "DR14 to attack and defend against."), ZOMBIE_INFECTION], dr: { attack: 14, defend: 14 },
    text: "Fast sprinters. Great climbers.", source: CR, page: 94, sources: [{ source: CR, page: 94 }, { source: TT, page: 15 }] },
  { name: "\"Grog Barrel\" Zombie", category: "undead", group: "Zombies", hp: 20, morale: null, armor: null,
    attacks: [A("Bilge-Vomit", "d6", "+ TOUGHNESS DR12 or become poisoned"), A("Slam", "d10"), A("Bite", "d8", "+ Zombie Infection")],
    specials: [S("Fat and Slow", "DR10 to hit."), ZOMBIE_INFECTION], dr: { attack: 10 },
    text: "A bloated, barrel-bellied zombie.", source: CR, page: 95, sources: [{ source: CR, page: 95 }, { source: TT, page: 15 }] },

  // ---- Named NPCs (pg. 11, 29) and others ----------------------------------------------------
  { name: "Beltran de Ordaz", category: "npc", named: true, hp: 20, morale: 9, armor: { name: "Conquistador Plate", die: "d6", tier: 3 },
    attacks: [A("Flintlock", "3d4", "2d4 for anyone else who wields it"), A("Finely Crafted Rapier", "d8")],
    specials: [S("Superior Tactician", "Once per combat he can let one ally reroll an attack, defense or damage roll.")], blackPowder: true,
    text: "A brash, cocky conquistador in his late 50s, set on finding the lost Silent Angel — even if it means hiring pirates.", source: TT, page: 11 },
  { name: "Mother Iris", category: "npc", named: true, hp: 30, morale: 11, armor: null,
    attacks: [A("Cross and Rosary", "d2", "melee; or d12 against undead (ranged, only works in her hands)"), A("Divine Wrath", "d8", "one target loses d8 HP, ignores armor"), A("Angelic Heal", null, "everyone within 10' heals d6 HP")],
    specials: [],
    text: "A stern Inquisition nun with mystical powers who has long studied the arcane — and secretly works with The Wretched.", source: TT, page: 11 },
  { name: "Marooned Pirate", category: "npc", hp: 4, morale: 7, armor: null,
    attacks: [A("Bamboo Spear", "d4")], specials: [], text: "Castaway pirates; can serve as replacement PCs.", source: TT, page: 18 },
  { name: "Pire", category: "npc", named: true, hp: 12, morale: 8, armor: { name: "Leather Vest", die: "d2", tier: 1 },
    attacks: [A("\"Marla\" (his blunderbuss)", "d4", "d10 within 10'; Reload: 2 actions"), A("\"Baybuh\" (his scimitar)", "d8")],
    specials: [S("Glowing Bones", "His skeleton can be seen glowing faintly through his skin at night.")], blackPowder: true,
    text: "The witty, sarcastic pirate \"in charge\" of the Scrub Island outpost while the captain is away.", source: TT, page: 29 },
  { name: "Dodson", category: "npc", named: true, hp: 9, morale: 10, armor: null,
    attacks: [A("Hand-crafted Viking Hatchet", "d8"), A("Jury-rigged Nail Grenade", "d6", "up to 3 targets")],
    specials: [S("Fast", "DR16 to attack and defend against."), S("Glowing Bones", "His skeleton can be seen glowing faintly through his skin at night.")],
    dr: { attack: 16, defend: 16 },
    text: "A frenetic, obsessive trap-builder who hauls zombie parts from Eel Island.", source: TT, page: 29 },

  // ---- Sea & island creatures (pg. 36, 48, 54, 55) ------------------------------------------
  { name: "Antediluvian Crustacean", category: "beast", hp: 50, morale: 6, armor: { name: "Thick Shell", die: "d4", tier: 2 },
    attacks: [A("Claws", "d10 & d6", "2 attacks")], attacksPerRound: 2, specials: [],
    text: "A colossal crustacean that climbs aboard ships; gemstones are embedded in its shell.", source: TT, page: 36 },
  { name: "Infernal Pelican", category: "beast", group: "Dark Fauna: Avian", roll: 4, hp: 4, morale: 6, armor: null,
    attacks: [A("Hell Lava Spray", "d6", "defend with TOUGHNESS instead of AGILITY; armor is reduced one tier and the target loses d4 HP for the next 2 rounds as it burns through flesh (armor doesn't reduce this). Removing the armor stops it.")],
    specials: [], defendWith: "TOUGHNESS", loot: [{ name: "Beak", value: "10s" }, { name: "Lava", value: "60s/jar", note: "melts most materials" }],
    text: "Fishing birds that flew too far and visited the shores of the Netherworld; soot-singed feathers glowing molten orange from within. Often seen in flocks (d6 × 10).", source: CR, page: 87, sources: [{ source: CR, page: 87 }, { source: TT, page: 48 }] },
  { name: "Merfolk Ghost", category: "undead", hp: 2, morale: 8, armor: { name: "Spectral", die: "d4", tier: 2 },
    attacks: [A("Claws", "d2"), A("Coral Hammer", "d4"), A("Spear", "d6")], attackChoice: "one of",
    specials: [S("Preoccupied", "Always roll for a reaction (unless Ephyra summons them for defense).")],
    text: "Ghostly servants of Ephyra, usually too busy gathering sand or chanting laments to bother intruders.", source: TT, page: 54 },
  { name: "Tube Worm", category: "beast", hp: 5, morale: 5, armor: { name: "Rock Skin", die: "d2", tier: 1 },
    attacks: [A("Pinchers", "d6")],
    specials: [S("Camouflage", "+4 DR to defend against in the first round of combat. PRESENCE DR14 to spot (if looking).")],
    text: "Arm-sized lava-tube worms with hundreds of tiny legs and six arms near the head; they look like volcanic rock until they strike.", source: TT, page: 54 },
  { name: "Volcanic Lizard", category: "beast", hp: 3, morale: 3, armor: null,
    attacks: [A("Tongue Whip", "d6", "10' range"), A("Claw", "d4")], attackChoice: "one of",
    specials: [S("Fast", "+2 DR to attack and defend against."), S("Heat-resistant", "Immune to fire and heat.")], dr: { attack: 14, defend: 14 },
    text: "Horned lizards basking in lava tubes, glowing faintly from a diet of glow worms. Territorial; found in large numbers (d6 × 10).", source: TT, page: 54 },
  { name: "Necro Jelly", category: "beast", hp: 1, morale: 6, armor: null,
    attacks: [A("Skull Sting", "d2", "ignores armor; instead of lowering HP the damage depletes Devil's Luck. A PC with no Devil's Luck left permanently lowers their highest ability by 1 (min −3).")],
    specials: [], ignoresArmor: true,
    text: "Jellyfish of volcanically heated pools that feed on the energy of the living; the older they are, the more their hoods resemble human skulls.", source: TT, page: 54 },
  { name: "Ephyra, Deceiver of Thoth", category: "monster", boss: true, hp: 40, morale: 10, armor: { name: "Spectral", die: "d4", tier: 2 },
    attacks: [], attacksPerRound: "1 per 2 PCs",
    attackTable: { die: "d6", note: "Ephyra attacks once for every two PCs in the party; roll d6 for each attack.", rows: [
      { roll: [1, 2], name: "Sandblast", text: "Everyone tests TOUGHNESS DR10 or takes d4 damage.", damage: "d4", test: { ability: "TOUGHNESS", dr: 10 } },
      { roll: [3, 4], name: "Feed", text: "Ephyra eats red sand and regains d8 HP.", heal: "d8" },
      { roll: [5, 6], name: "Vampiric Orb", text: "Ephyra becomes a flaming skull and blasts toward a random PC: AGILITY DR14 or part of their body turns to red sand (d4: 1 a hand or foot, 2 a finger, toe, ear or nose, 3 an arm or leg, 4 torso, head or entire body).", test: { ability: "AGILITY", dr: 14 },
        sub: { die: "d4", rows: [{ roll: 1, text: "A hand or foot" }, { roll: 2, text: "A finger, toe, ear, or nose" }, { roll: 3, text: "An arm or leg" }, { roll: 4, text: "Torso, head, or entire body" }] } },
    ] },
    specials: [S("Volcanic Link", "When Ephyra takes damage, the attacking player rolls the volcano die. She can't be destroyed unless the volcano die is a d2 or the volcano is erupting.")],
    text: "A monstrosity of myth — soucouyant, nereid, Scylla, sea hag — that turns mortals into blood-soaked sand and feasts on it like a ravenous ghoul.", source: TT, page: 55 },

  // ---- Player's Guidebook --------------------------------------------------------------------
  { name: "Skeletal Thrall", category: "undead", summoned: true, hp: 4, morale: null, armor: null,
    attacks: [A("Claw/Bite", "d4")], specials: [S("Thrall", "Stupid, but obeys its creator's verbal commands. Tumbles into bones at sunrise.")],
    text: "Raised from nearby corpses by the Sorcerer's Raise the Dead spell.", source: CR, page: 45, sources: [{ source: CR, page: 45 }, { source: PG, page: 45 }] },
  { name: "Phantasmal Fauna", category: "spirit", summoned: true, hp: 5, morale: null, armor: { name: "Ghostly Form", die: "d2", tier: 1 },
    attacks: [A("Bite", "d6")], specials: [S("Summoned", "A ghostly hound or shark that obeys its summoner and dissipates at sunset.")],
    text: "Summoned by the arcane ritual Phantasmal Fauna.", source: CR, page: 65, sources: [{ source: CR, page: 65 }, { source: PG, page: 65 }] },
  { name: "Mishap Birds", category: "beast", summoned: true, hp: 2, morale: null, armor: null, count: "d12",
    attacks: [A("Bite", "d2")], specials: [S("Swarm", "They flee when half are defeated.")],
    text: "A swarm of d12 birds called up by Mystical Mishap 8.", source: CR, page: 67, sources: [{ source: CR, page: 67 }, { source: PG, page: 67 }] },
];

// Ships & fortifications. hull: { tier, die } or null for "–". skill: number, or null with skillNote for "*".
export const PB_SHIPS = [
  { name: "Dinghy", type: "boat", hp: 4, hull: null, agility: 3, speed: 2, skill: null, skillNote: "Use passengers' stats.",
    broadsides: null, smallArms: "d2", ram: null, crew: { min: 1, max: 4 }, cargo: 0,
    special: "Use passengers' stats. Not affected by wind.", windImmune: true,
    text: "A utility rowboat towed behind medium ships or stored on the deck of larger ones. The perfect espionage vessel.", source: CR, page: 80, sources: [{ source: CR, page: 80 }, { source: TT, page: 34 }], cost: 250 },
  { name: "Longboat", type: "boat", hp: 5, hull: null, agility: 3, speed: 3, skill: null, skillNote: "Use passengers' stats.",
    broadsides: null, smallArms: "d4", ram: null, crew: { min: 2, max: 10 }, cargo: 0,
    special: "Use passengers' stats. Not affected by wind.", windImmune: true,
    text: "Watercraft often used to ferry crew from larger ships to land; some have small collapsible sails. Often used for fishing.", source: CR, page: 81, sources: [{ source: CR, page: 81 }, { source: TT, page: 34 }], cost: 500 },
  { name: "Sloop", type: "ship", hp: 30, hull: { tier: 1, die: "d2" }, agility: 2, speed: 5, skill: -1,
    broadsides: "d6", smallArms: "d4", ram: "d4", crew: { min: 3, max: 10 }, cargo: 2,
    special: "Can travel at full speed when Close to the Wind.", closeToWindFullSpeed: true,
    text: "A small, single-masted vessel — the \"perfect\" pirate ship thanks to its speed, shallow draft and maneuverability.", source: CR, page: 82, sources: [{ source: CR, page: 82 }, { source: TT, page: 35 }] },
  { name: "Fluyt", type: "ship", hp: 50, hull: { tier: 2, die: "d4" }, agility: -1, speed: 3, skill: 0,
    broadsides: "d10", smallArms: "d6", ram: "d6", crew: { min: 10, max: 40 }, cargo: 5,
    special: null,
    text: "A slow, high-sided merchant vessel. Not ideal for piracy, but good for carrying cargo, troops and treasure.", source: CR, page: 82, sources: [{ source: CR, page: 82 }, { source: TT, page: 35 }] },
  { name: "Fort Amsterdam", type: "fortification", hp: 60, hull: null, agility: null, speed: 0, skill: 3,
    broadsides: "d12", broadsidesAttacks: 2, smallArms: null, ram: null, crew: null, cargo: null,
    special: "Stationary (DR8 to hit). Makes 1 attack for each block of 50 HP it has remaining, rounded up.", stationary: true, dr: { attack: 8 },
    statLabels: { hull: "Armor", broadsides: "Cannons" }, statText: { broadsides: "2 @ d12" },
    text: "Hilltop fort guarding Gibbet Town on St. Martin: three cannon-lined bastions and ~75 Redcoat soldiers.", source: TT, page: 42 },
];
