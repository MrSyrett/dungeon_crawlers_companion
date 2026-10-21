// Pirate Borg — naval combat, maritime travel, shanties, wind & weather, shipwright (pg. 68-78).
// Numbers exact; prose paraphrased.

export const PB_SHIP_STATS = [
  { id: "hp", name: "HP", text: "The vessel's condition plus the crew's health and morale." },
  { id: "hull", name: "Hull", text: "Armor for vessels (an armor tier and die, e.g. −d6), as for characters (pg. 30)." },
  { id: "agility", name: "Agility", text: "How nimble and maneuverable the vessel is (a modifier)." },
  { id: "speed", name: "Speed", text: "How many hexes the vessel can move each turn." },
  { id: "skill", name: "Skill", text: "The crew's skill and training (a modifier for crew-action tests)." },
  { id: "broadsides", name: "Broadsides", text: "Damage the main cannons deal." },
  { id: "smallArms", name: "Small Arms", text: "Damage the swivel guns and muskets deal." },
  { id: "ram", name: "Ram", text: "Damage dealt when involved in a Ram action." },
  { id: "crew", name: "Crew", text: "The minimum/maximum crew the ship can carry without penalty." },
  { id: "cargo", name: "Cargo", text: "Number of cargo slots the vessel can carry." },
];

export const PB_CREW_ACTIONS = [
  { id: "fire-broadsides", name: "Fire Broadsides", test: { ship: "skill", pc: "PRESENCE", dr: 12 }, multi: true, arc: true,
    text: "Test the ship's CREW SKILL (+PC PRESENCE) DR12: attack with each of the ship's broadside attacks. The target must be in the ship's arc of fire." },
  { id: "fire-small-arms", name: "Fire Small Arms", test: { ship: "skill", pc: "PRESENCE", dr: 12 }, multi: true,
    text: "Test the ship's CREW SKILL (+PC PRESENCE) DR12: attack with each of the ship's small arms attacks." },
  { id: "full-sail", name: "Full Sail", test: { ship: "agility", pc: "AGILITY", dr: 12 }, text: "Test ship AGILITY (+PC AGILITY) DR12: move one extra hex." },
  { id: "come-about", name: "Come About", test: { ship: "agility", pc: "STRENGTH", dr: 12 }, text: "Test ship AGILITY (+PC STRENGTH) DR12: rotate one extra hex face." },
  { id: "drop-anchor", name: "Drop Anchor", test: null, text: "Reduce the ship's speed to zero." },
  { id: "weigh-anchor", name: "Weigh Anchor", test: null, text: "The ship is no longer anchored." },
  { id: "repair", name: "Repair", test: { ship: "skill", pc: "PRESENCE", dr: 12 }, heal: "d6", maxPercent: 50,
    text: "Test the ship's CREW SKILL (+PC PRESENCE) DR12: the ship recovers d6 HP or repairs misfired cannons and small arms. This action can only restore a ship to 50% of its maximum HP." },
  { id: "boarding-party", name: "Boarding Party", test: null, text: "If touching another ship, the crew may board and attack. Switch to melee combat." },
  { id: "ram", name: "Ram", test: null, exclusive: true,
    text: "A ship that ends its movement touching another ship can ram. All ships involved roll ram damage, adding +1 for each hex that ship traveled on its last move. A ramming ship can't take any other crew actions that turn." },
  { id: "something-else", name: "Something Else", test: null, text: "Use a relic or ritual, inspire the crew, hide, abandon ship, etc." },
];

export const PB_NAVAL_RULES = {
  page: 73,
  crew: "Ships without enough crew can take only one crew action, however many PCs are aboard. Ships can carry double their max crew for short trips (less than a day).",
  range: { hexes: 12, text: "Standard range of fire is 12 hexes. Broadside cannons fire only at a 45° angle from the ship's side; small arms (muskets, swivel guns) can always fire." },
  scaling: { ratio: 5, text: "Ship HP and damage aren't the same as PC HP and damage: convert at 1:5. A 20 HP ship has 100 HP against a PC's musket; a d8 cannon deals d8 × 5 to a skeleton." },
  round: { seconds: 30, text: "Ship combat rounds are flexible but typically about 30 seconds. PCs still take only 1 action each round." },
  movement: {
    hexInches: 1, hexFeet: 50,
    text: "Play on a hex grid (1\" ≈ 50 feet). A ship can rotate twice during each move (60°, one hex face), only once per hex, at any point along its path. Ships must move at least 1 hex each turn unless in close combat, ramming, anchored or In Irons.",
    rotationsPerMove: 2, minMove: 1,
  },
  initiative: { roll: "d6 + ship AGILITY", rerollEachRound: true, tiesTo: "PC ships", text: "Every round each ship rolls d6 + ship AGILITY; highest goes first and PC ships win ties." },
  turnOrder: [
    { step: 0, text: "Check point of sail (if using the wind rules)." },
    { step: 1, text: "The Captain uses their action to move the ship up to its speed in hexes." },
    { step: 2, text: "Non-captain PCs take 1 crew action each." },
    { step: 3, text: "A ship that hasn't taken at least 2 crew actions can take up to 2 crew actions total." },
    { step: 4, text: "Switch to close combat when appropriate. Ships in close combat count as anchored and can't take crew actions." },
  ],
  crewActionRules: "Each crew action can be chosen only once per ship's turn. Every ship gets at least 2 actions (more with PCs aboard). PCs taking crew actions add the ability in parentheses. Larger ships may make some attack actions several times: if one PC takes the action they roll all of the ship's attacks but add their PRESENCE only to the first; if several PCs take it, each adds PRESENCE to one roll (one PC per attack roll).",
  critical: { natural: 20, text: "Double damage, then the target's hull is reduced one tier (e.g. −d6 > −d4). Hulls can't be repaired at sea — see Shipwright.", damageMultiplier: 2, hullTier: -1 },
  fumble: { natural: 1, text: "Cannons or small arms misfire: weapons that have misfired must be repaired before they can fire again. The GM decides the outcome for other crew actions.", misfire: true },
  sinking: { text: "At zero HP or less a ship is derelict: speed drops to zero and it can't take crew actions in combat. When a derelict takes more damage, roll on the Derelict table (d8)." },
  morale: {
    roll: "2d6 + current crew skill", threshold: 4, failure: "surrender or mutiny",
    text: "At the GM's discretion, ships under attack or in low spirits test morale: roll 2d6 + current CREW SKILL; under 4 means surrender or mutiny.",
    triggers: ["another ship raises the black", "shots are fired", "taking a crit", "falling below 1/3 HP", "being boarded", "the rum runs out"],
  },
  cargo: "Ships have abstract cargo slots; the value of cargo is up to the GM.",
  repairing: "At sea a ship can only be repaired to 50% HP (using the Repair crew action). The rest must be repaired while moored or by a shipwright.",
  careening: { everyMonths: 3, speedPenaltyPerMonth: -1, text: "Ships need careening every 3 months to remove barnacles and shipworm and repair leaks; they are −1 speed for each month over 3 without it." },
  payingCrew: "Pirates don't pay wages: they divide the plunder equally, though the captain and officers often take larger shares.",
};

export const PB_DERELICT = [
  { roll: [1, 2], text: "No effect." },
  { roll: 3, text: "Sinks in d2 rounds.", sinks: "d2 rounds" },
  { roll: 4, text: "Sinks next round.", sinks: "next round" },
  { roll: 5, text: "Sinks now.", sinks: "now" },
  { roll: 6, text: "Minor explosion: all aboard test AGILITY DR12 or take d6 damage.", test: { ability: "AGILITY", dr: 12 }, damage: "d6" },
  { roll: 7, text: "Major explosion: the ship sinks and all aboard take d8 damage.", sinks: "now", damage: "d8" },
  { roll: 8, text: "Magazine explosion: instant death to all aboard.", sinks: "now", death: true },
];

export const PB_SPECIALTY_CREW = [
  { id: "legendary-captain", name: "Legendary Captain", text: "Take an extra crew action each round, even one that has already been taken.", extraCrewAction: 1 },
  { id: "veteran-quartermaster", name: "Veteran Quartermaster", text: "Crew morale tests are +3. Cargo sells for 50% more in port.", morale: 3, cargoValue: 1.5 },
  { id: "strict-bosun", name: "Strict Bosun", text: "Once per combat, reroll one crew action test.", rerollPerCombat: 1 },
  { id: "master-gunner", name: "Master Gunner", text: "Ship attacks are −2 DR.", dr: -2, applies: "ship-attack" },
  { id: "master-of-sails", name: "Master of Sails", text: "Ship AGILITY tests are −2 DR.", dr: -2, applies: "ship-agility" },
  { id: "deck-sorcerer-or-priest", name: "Deck Sorcerer or Priest", text: "Once per combat, change the speed and direction of the wind." },
  { id: "master-carpenter", name: "Master Carpenter", text: "Repair actions are −5 DR.", dr: -5, applies: "repair" },
  { id: "drunk-crew", name: "Drunk Crew", text: "+2 DR for all the ship's rolls.", dr: 2, applies: "all" },
];

export const PB_CREW_MODS = [
  { condition: "Shortage of food", mod: -1 },
  { condition: "Shortage of water", mod: -3 },
  { condition: "Rum is gone", mod: -5 },
  { condition: "Ship HP ≤ 50%", mod: -2 },
  { condition: "Ship HP ≤ 25%", mod: -5 },
  { condition: "Haven't taken a prize", mod: -1, per: "week" },
  { condition: "Haven't divided the plunder", mod: -3, per: "month" },
  { condition: "Shore leave", recover: 2, text: "recover 2" },
  { condition: "Take a prize", recover: 4, text: "recover 4" },
  { condition: "Divide the plunder", reset: true, text: "reset" },
  { condition: "Under manned", mod: -2 },
  { condition: "Inexperienced crew", mod: -1, permanent: true },
  { condition: "Crew \"gains experience\"", mod: 1, permanent: true },
  { condition: "Military discipline", mod: 2, permanent: true },
];

export const PB_SHANTY_RULES = {
  page: 68, perDay: "1 ± the Captain's SPIRIT", test: { ship: "skill", dr: 12 },
  text: "Each day the crew can sing a number of sea shanties equal to 1 ± the Captain's SPIRIT. Choose from the crew's known shanties and test CREW SKILL DR12. Success activates the effect and uses one of the day's shanties. Failure sounds horrible and does nothing, and shanties can't be used for the next hour. The GM decides the effect of a Crit or Fumble.",
};
export const PB_SHANTIES = [
  { roll: 1, name: "Fifteen Men on a Dead Man's Chest", text: "The ship gains d2 Devil's Luck that it can use like a PC.", shipLuck: "d2" },
  { roll: 2, name: "Dead Horse", text: "The ship recovers d10 HP and any misfired cannons are repaired.", heal: "d10" },
  { roll: 3, name: "Spanish Ladies", text: "The ship can't get lost today." },
  { roll: 4, name: "Leave Her Johnny", text: "Reroll Changing Winds (pg. 78)." },
  { roll: 5, name: "Blow the Man Down", text: "The ship is +2 DR to hit until the end of combat." },
  { roll: 6, name: "Drunken Sailor", text: "One ship's crew skill is −4 for d6 rounds.", duration: "d6 rounds" },
  { roll: 7, name: "Fish in the Sea", text: "Choose a direction: the wind blows that way for d4 hours.", duration: "d4 hours" },
  { roll: 8, name: "Captain Kidd", text: "Attacks from this ship are DR −2 for d6 rounds.", duration: "d6 rounds" },
  { roll: 9, name: "A Drop of Nelson's Blood", text: "Increase the ship's speed by 1 for d8 hours.", duration: "d8 hours" },
  { roll: 10, name: "All For Me Grog", text: "Raise the ship's morale by 2. The crew can't mutiny today." },
  { roll: 11, name: "Fire Down Below", text: "Extinguish all fires on the ship and repair d6 HP.", heal: "d6" },
  { roll: 12, name: "Down Among the Dead Men", text: "Dark waves crash against another ship: move it 1 hex (1\") in any direction and it loses d8 HP.", damage: "d8" },
];

export const PB_WIND = {
  page: 78, optional: true,
  text: "At the start of naval combat roll d6 for the hex edge the wind is coming from. A ship's point of sail is set at the start of its turn and doesn't change during its movement.",
  flat: [{ roll: 1, dir: "N" }, { roll: 2, dir: "NE" }, { roll: 3, dir: "SE" }, { roll: 4, dir: "S" }, { roll: 5, dir: "SW" }, { roll: 6, dir: "NW" }],
  pointed: [{ roll: 1, dir: "NE" }, { roll: 2, dir: "E" }, { roll: 3, dir: "SE" }, { roll: 4, dir: "SW" }, { roll: 5, dir: "W" }, { roll: 6, dir: "NW" }],
};
// Relative to the ship's heading (the hex edge the bow faces = 1): wind from 3, 4 or 5 → With the Wind,
// from 2 or 6 → Close to the Wind, from 1 → In Irons.
export const PB_POINT_OF_SAIL = [
  { id: "with", name: "With the Wind", relativeEdges: [3, 4, 5], speed: "full", text: "Full speed." },
  { id: "close", name: "Close to the Wind", relativeEdges: [2, 6], speed: "half", min: 1, text: "½ speed (round down, minimum 1)." },
  { id: "irons", name: "In Irons", relativeEdges: [1], speed: 0, rotations: 1, text: "Speed 0; can only rotate once (60°)." },
];

export const PB_CHANGING_WINDS = [
  { roll: 2, name: "Becalmed", text: "All ships speed 0.", speed: "zero" },
  { roll: 3, name: "Fog", text: "All weapon ranges are reduced to 6 hexes.", range: 6 },
  { roll: [4, 5], name: "Calm", text: "Decrease all max speeds by 1.", speedMod: -1 },
  { roll: [6, 8], name: "Fair", text: "Normal wind speed." },
  { roll: [9, 10], name: "Heavy", text: "Increase all max speeds by 1.", speedMod: 1 },
  { roll: 11, name: "Changing Winds", text: "Reroll the wind direction.", rerollDirection: true },
  { roll: 12, name: "Storm", text: "Reroll the wind direction each round. On a repeated result, all ships lose d6 HP (no hull protection).", rerollDirection: "each round", damage: "d6" },
];
export const PB_FOUL_WEATHER = [
  { roll: 2, text: "Deep cold, well below the line." },
  { roll: 3, text: "Nauseating, green mist." },
  { roll: 4, text: "Thick, low-lying fog." },
  { roll: 5, text: "Oppressively overcast." },
  { roll: 6, text: "Hellfire, sweltering sunlight." },
  { roll: 7, text: "Gentle breeze, smell of decay." },
  { roll: 8, text: "Calm before the storm." },
  { roll: 9, text: "Soft, cold rain." },
  { roll: 10, text: "Frigid trade winds." },
  { roll: 11, text: "Torrential downpours." },
  { roll: 12, text: "Catastrophic tempest." },
];

export const PB_SHIPWRIGHT = {
  page: 77,
  crewRepairs: [
    { id: "crew-repairs", name: "Repairs", effect: "Recover 2 HP/day.", hpPerDay: 2, cost: "25s per HP", costPerHp: 25 },
    { id: "crew-careen", name: "Careen", effect: "Clean the hull: 1 day per 10 max HP.", daysPerMaxHp: 10, cost: "–" },
  ],
  shipwright: [
    { id: "repair-hp", name: "Repair HP", effect: "Recover 10 HP/day.", hpPerDay: 10, cost: "50s per HP", costPerHp: 50 },
    { id: "repair-armor", name: "Repair armor", effect: "Repair hull armor; takes 1 week.", cost: "ship's HP × 25s", hpMultiplier: 25 },
    { id: "careen", name: "Careen", effect: "Clean the hull: 1 day per 25 max HP.", daysPerMaxHp: 25, cost: "ship's HP × 10s", hpMultiplier: 10 },
  ],
  upgrades: [
    { id: "upgrade-swivels", name: "Upgrade swivels", effect: "Small arms deal +2 damage.", cost: "ship's HP × 25s", hpMultiplier: 25, onePerShip: true, mods: { smallArmsDamage: 2 } },
    { id: "extra-swivels", name: "Extra swivels", effect: "Add an extra small arms attack.", cost: "ship's HP × 50s", hpMultiplier: 50, onePerShip: true, mods: { smallArmsAttacks: 1 } },
    { id: "upgrade-cannons", name: "Upgrade cannons", effect: "Broadsides deal +2 damage.", cost: "ship's HP × 50s", hpMultiplier: 50, onePerShip: true, mods: { broadsidesDamage: 2 } },
    { id: "extra-cannons", name: "Extra cannons", effect: "Add an extra broadside attack.", cost: "ship's HP × 100s", hpMultiplier: 100, onePerShip: true, mods: { broadsidesAttacks: 1 } },
    { id: "armored-hull", name: "Armored hull", effect: "Raise armor one tier; Speed −1.", cost: "ship's HP × 200s", hpMultiplier: 200, onePerShip: true, mods: { hullTier: 1, speed: -1 } },
    { id: "ram-upgrade", name: "Ram upgrade", effect: "Double the ram die.", cost: "ship's HP × 25s", hpMultiplier: 25, onePerShip: true, mods: { ramDice: 2 } },
    { id: "improved-sails", name: "Improved sails", effect: "+1 Speed, +1 Agility.", cost: "ship's HP × 100s", hpMultiplier: 100, onePerShip: true, mods: { speed: 1, agility: 1 } },
  ],
  note: "Upgrades are limited to once per ship. Hulls can't be repaired at sea.",
};

export const PB_TRAVEL = {
  page: 76, hexMiles: 50,
  text: "Ships can move up to their speed in 50-mile hexes each day. In the Dark Caribbean, ships traveling northeast, east or southeast move −1 hex a day (minimum 1).",
  againstTrades: { directions: ["NE", "E", "SE"], hexesPerDay: -1, min: 1 },
};
