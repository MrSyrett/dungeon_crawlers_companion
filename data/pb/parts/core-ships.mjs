// Pirate Borg — Core Rules ships, forts and undead vessels (pg. 80-85) + archetype captain fleets (pg. 110-113).
// Same shape as PB_SHIPS in bestiary.mjs. Dinghy, Longboat, Sloop and Fluyt are identical in Trapped in the
// Tropics and the Core Rules: they stay in bestiary.mjs with `sources` listing both.
// crew {min,max} from "min/max"; hull null for "–"; skill null + skillNote for "*" (use passengers' stats).

const CR = "Core Rules";
const H = (die) => ({ tier: { d2: 1, d4: 2, d6: 3 }[die], die });
const PASSENGERS = "Use passengers' stats.";

export const PB_CORE_SHIPS = [
  { name: "Raft", type: "boat", hp: 2, hull: null, agility: -1, speed: 1, skill: null, skillNote: PASSENGERS,
    broadsides: null, smallArms: null, ram: null, crew: { min: 1, max: 3 }, cargo: 0, special: PASSENGERS,
    text: "A makeshift raft, often jury-rigged by those marooned on desert islands.", source: CR, page: 80 },
  { name: "Canoe", type: "boat", hp: 3, hull: null, agility: 3, speed: 3, skill: null, skillNote: PASSENGERS,
    broadsides: null, smallArms: "d2", ram: null, crew: { min: 1, max: 3 }, cargo: 0, special: "Use passengers' stats. Not affected by wind.", windImmune: true,
    text: "Carved from a single log: fast, maneuverable boats perfect for swamps and streams.", source: CR, page: 80 },
  { name: "Piragua", type: "boat", hp: 10, hull: null, agility: 3, speed: 3, skill: null, skillNote: PASSENGERS,
    broadsides: null, smallArms: "d6", ram: null, crew: { min: 2, max: 20 }, cargo: 0, special: PASSENGERS,
    text: "Dugout boats made from tree trunks; simple construction and a big crew capacity make them a swashbuckler favorite.", source: CR, page: 81 },
  { name: "Tartane", type: "ship", hp: 20, hull: H("d2"), agility: 2, speed: 5, skill: -1,
    broadsides: "d4", smallArms: "d4", ram: "d4", crew: { min: 3, max: 9 }, cargo: 1,
    special: "Can travel at full speed when Close to the Wind.", closeToWindFullSpeed: true,
    text: "A small ship used for fishing, trading and rum running; triangular sails and rigging make it very nimble.", source: CR, page: 81 },
  { name: "Brigantine", type: "ship", hp: 40, hull: H("d4"), agility: 1, speed: 4, skill: 0,
    broadsides: "d8", smallArms: "d4", ram: "d6", crew: { min: 15, max: 30 }, cargo: 3, special: null,
    text: "A nimble, square-rigged two-masted vessel suited to medium crews; common as a merchant ship.", source: CR, page: 82 },
  { name: "Galley", type: "ship", hp: 60, hull: H("d4"), agility: 1, speed: 5, skill: 2,
    broadsides: null, smallArms: "d10", ram: "d10", crew: { min: 80, max: 120 }, cargo: 3,
    special: "May always move 3\" regardless of wind.", windMinMove: 3,
    text: "A relic of a bygone era propelled by sails or oars, often crewed by undead from distant lands.", source: CR, page: 83 },
  { name: "Frigate", type: "ship", hp: 60, hull: H("d4"), agility: 0, speed: 4, skill: 1,
    broadsides: "d8", broadsidesAttacks: 2, statText: { broadsides: "2 @ d8" }, smallArms: "d6", ram: "d6", crew: { min: 24, max: 48 }, cargo: 4,
    special: "Makes 2 broadsides when over half HP.", multiAttackAboveHalfHp: true,
    text: "Not as nimble as a sloop, but fast; their size and armament make decent pirate flagships.", source: CR, page: 83 },
  { name: "Galleon", type: "ship", hp: 65, hull: H("d6"), agility: -3, speed: 2, skill: 1,
    broadsides: "d10", broadsidesAttacks: 2, statText: { broadsides: "2 @ d10" }, smallArms: "d6", ram: "d8", crew: { min: 30, max: 60 }, cargo: 6,
    special: "Makes 2 broadsides when over half HP.", multiAttackAboveHalfHp: true,
    text: "Heavily armed, slow vessels of a previous age, often used to carry cargo… and treasure hoards.", source: CR, page: 83 },
  { name: "Man-of-War", type: "ship", hp: 75, hull: H("d6"), agility: -2, speed: 3, skill: 2,
    broadsides: "d8", broadsidesAttacks: 3, statText: { broadsides: "3 @ d8" }, smallArms: "d8", ram: "d8", crew: { min: 50, max: 150 }, cargo: 4,
    special: "Makes 3 broadsides when > 2/3 HP; 2 > 1/3 HP.",
    attackScaling: { broadsides: [{ above: 2 / 3, attacks: 3 }, { above: 1 / 3, attacks: 2 }, { above: 0, attacks: 1 }] },
    text: "Built for naval combat but needing a large, trained crew; used almost exclusively by navies.", source: CR, page: 84 },
  { name: "Ship of the Line", type: "ship", hp: 95, hull: H("d6"), agility: -3, speed: 3, skill: 3,
    broadsides: "d10", broadsidesAttacks: 3, smallArms: "d8", smallArmsAttacks: 2, statText: { broadsides: "3 @ d10", smallArms: "2 @ d8" }, ram: "d8",
    crew: { min: 150, max: 350 }, cargo: 4,
    special: "Makes 3 broadsides when > 2/3 HP; 2 > 1/3 HP. Makes 2 small arms attacks when > 1/2 HP.",
    attackScaling: { broadsides: [{ above: 2 / 3, attacks: 3 }, { above: 1 / 3, attacks: 2 }, { above: 0, attacks: 1 }], smallArms: [{ above: 1 / 2, attacks: 2 }, { above: 0, attacks: 1 }] },
    text: "A floating fortress and the flagship of any navy; in wartime several line up to make a wall of black powder death.", source: CR, page: 84 },
  { name: "Fort", type: "fortification", hp: 200, hull: null, agility: null, speed: 0, skill: 3,
    broadsides: "d12", broadsidesAttacks: 4, smallArms: null, ram: null, crew: null, cargo: null,
    special: "Stationary (DR8 to hit). Makes 1 attack for each block of 50 HP it has remaining. Customize: add one d12 attack per 50 HP; add armor for an extra challenge.",
    stationary: true, dr: { attack: 8 }, attackPerHp: 50,
    statLabels: { hull: "Armor", broadsides: "Cannons" }, statText: { broadsides: "4 @ d12" },
    text: "Seaside fortifications built to protect ports and towns.", source: CR, page: 84 },
];

// Undead vessels and captain fleets: "use the base stats of another vessel" — modifiers, not full ships.
// `applies` = rules the naval panel can apply on top of a PB_SHIPS base; `baseShips` = the vessels the book suggests.
export const PB_SHIP_TEMPLATES = [
  { id: "ghost-ship", name: "Ghost Ship", page: 85, source: CR, undead: true,
    text: "Reanimated shipwrecks piloted by ghosts and skeletons, typically seen only at night. Use the base stats of another vessel.",
    traits: [
      { name: "Undead", text: "Can only be crewed by the dead, and sinks when the captain is destroyed." },
      { name: "Winds of Hell", text: "Not affected by wind conditions (can always move its full speed).", windImmune: true },
      { name: "Terrifying", text: "At the start of combat, ships and PCs can't take crew actions until they pass a Morale test.", terrifying: true },
    ] },
  { id: "ship-of-bone", name: "Ship of Bone", page: 85, source: CR, undead: true,
    text: "Skeletal constructs held together with flesh, leaving a sea of blood in their wake. Use the base stats of another vessel.",
    traits: [
      { name: "Undead Fortitude", text: "If reduced to 0 HP or less, test DR12 to drop to 1 HP instead.", cheatDeath: { dr: 12, hp: 1 } },
      { name: "Marrow Cannons", text: "Armed with Marrow Cannons (pg. 108).", monsters: ["marrow-carronade", "marrow-mortar", "bane-of-barbados"] },
      { name: "Terrifying", text: "At the start of combat, ships and PCs can't take crew actions until they pass a Morale test.", terrifying: true },
    ] },
  { id: "vessel-from-the-deep", name: "Vessel from the Deep", page: 85, source: CR, undead: true,
    text: "More monster than ship: recompiled shipwrecks, coral constructs and possessed vessels lost at sea. Use the base stats of another vessel.",
    traits: [
      { name: "Down to the Locker!", text: "Can submerge or surface instead of attacking. Speed 3\" when underwater.", underwaterSpeed: 3 },
      { name: "Melee Attacks", text: "Claws ×2 (HP 10, Shell −d6, Pinch d12). Tentacles ×8 (HP 2, no armor, Slam d4 + AGILITY DR12 or entangled; STRENGTH DR12 to escape each round).",
        monsters: [{ id: "vessel-from-the-deep-claw", count: 2 }, { id: "vessel-from-the-deep-tentacle", count: 8 }] },
    ] },
  // Archetype captains' fleets (pg. 110-113)
  { id: "navy-ships", name: "Navy Ships", page: 110, source: CR, captain: "naval-mastermind", baseShips: ["frigate", "man-of-war", "ship-of-the-line"],
    text: "Navy fleets are sparse in the Dark Caribbean, but the ships that patrol these waters are well armed.",
    traits: [{ name: "Superior Firepower", text: "Increase attack dice by one size (e.g. d6 → d8).", attackDieStep: 1 }] },
  { id: "inquisitor-ships", name: "Inquisitor Ships", page: 111, source: CR, captain: "inquisitor", baseShips: ["galleon", "fluyt"],
    text: "Large, slow ships of out-of-date construction with thick hulls of old-world timber.",
    traits: [{ name: "Old World Hull", text: "Increase Hull by one tier (e.g. −d4 → −d6).", hullTier: 1 }] },
  { id: "ship-of-bone-fleet", name: "Ship of Bone (Necromancer)", page: 112, source: CR, captain: "necromancer", baseShips: ["brigantine", "fluyt", "frigate", "galleon", "galley"], template: "ship-of-bone",
    text: "Some sail wooden ships decorated with bones; others have vessels built entirely from the dead.",
    traits: [{ name: "Special", text: "The Necromancer can spend a crew action to recover d8 of the ship's HP.", heal: "d8" }] },
  { id: "vessel-from-the-deep-fleet", name: "Vessel from the Deep (Sunken One)", page: 113, source: CR, captain: "sunken-one", baseShips: ["galleon", "fluyt", "man-of-war", "ship-of-the-line"], template: "vessel-from-the-deep",
    text: "Living ships infested with coral and deep-sea parasites.",
    traits: [{ name: "Special", text: "The Sunken One can spend 2d4 consecutive crew actions to summon (d6): 1 d100 sharks (pg. 89), 2 a whale (pg. 89), 3 The Kraken (pg. 105), 4 Davy Jones (pg. 106), 5 The Leviathan (pg. 107), 6 a maelstrom.",
      summon: { actions: "2d4", die: "d6", rows: [
        { roll: 1, text: "d100 sharks (pg. 89)", monster: "hammer-drones" }, { roll: 2, text: "a whale (pg. 89)", monster: "barnacled-humpback" },
        { roll: 3, text: "The Kraken (pg. 105)", monster: "the-kraken" }, { roll: 4, text: "Davy Jones (pg. 106)", monster: "davy-jones" },
        { roll: 5, text: "The Leviathan (pg. 107)", monster: "the-leviathan" }, { roll: 6, text: "a maelstrom" },
      ] } }] },
];
