// Pirate Borg — classes (Player's Guidebook pg. 34-49; summary sheet PDF p3).
// Names and numbers exact; descriptions paraphrased.
//
// Feature rows may carry `effects`: machine-readable hints the sheet can automate.
//   { type: "dr", value, applies, when? }        DR modifier (negative = easier). applies: "melee-attack" |
//                                                 "ranged-attack" | "attack" | "defense" | "throw-bomb" | "sword-attack" | "test"
//   { type: "damage", value, applies?, when? }    flat damage bonus (value may be a die, e.g. "d2")
//   { type: "ability", ability, value }           permanent ability change
//   { type: "hpMax", dice }                       raise max HP by a roll
//   { type: "armor", tier, die }                  counts as wearing armor of this tier
//   { type: "extraArmor", die }                   extra damage reduction on top of armor
//   { type: "crit", range }                       critical on natural `range`-20
//   { type: "reload", rounds, applies }           reload time for black powder weapons
//   { type: "item", item, qty?, damage? }         starting/extra item
//   { type: "weapon", name, damage, ... }         a natural or class weapon
//   { type: "immune", conditions }                can't suffer these conditions
//   { type: "attacks", count, applies }           attacks per turn
//   { type: "ritual", random: n } / { type: "relic", random: n }
// `again` holds the "if taken again" upgrade (text + effects). `maxPicks` = how many times a row may be taken.

const ABIL = (o) => ({ STRENGTH: 0, AGILITY: 0, PRESENCE: 0, TOUGHNESS: 0, SPIRIT: 0, ...o });

// ---- Brute -------------------------------------------------------------------------------
const BRUTE_TRUSTED = [
  { roll: 1, id: "brass-anchor", name: "Brass Anchor", damage: "d8", hands: 2,
    text: "Two-handed. d8 damage, and the target's armor is reduced by one tier (−d2) for the attack.",
    effects: [{ type: "weapon", name: "Brass Anchor", damage: "d8", hands: 2, special: "target armor −1 tier during the attack" }] },
  { roll: 2, id: "whaling-harpoon", name: "Whaling Harpoon", damage: "d8", thrown: { ability: "AGILITY", dr: 10 },
    text: "d8 damage; can be thrown by testing AGILITY DR10.",
    effects: [{ type: "weapon", name: "Whaling Harpoon", damage: "d8", thrown: { ability: "AGILITY", dr: 10 } }] },
  { roll: 3, id: "meat-cleaver", name: "Meat Cleaver", damage: "d4",
    text: "Caked in old blood. d4 damage; on a damage roll of 1 it passes on a disease from a prior victim — the target loses d6 HP at the start of each of its next two turns.",
    effects: [{ type: "weapon", name: "Meat Cleaver", damage: "d4", special: "damage roll of 1: target loses d6 HP at the start of its next two turns" }] },
  { roll: 4, id: "broken-mast", name: "Part of a Broken Mast", damage: "d8", critExtra: "d6",
    text: "A rusty nail juts from one end. d8 damage, plus an extra d6 on a critical hit.",
    effects: [{ type: "weapon", name: "Part of a Broken Mast", damage: "d8", critExtra: "d6" }] },
  { roll: 5, id: "runic-machete", name: "Runic Machete", damage: "d6",
    text: "d6 damage. Great for chopping vines and fopdoodles; glows in the dark when undead are near.",
    effects: [{ type: "weapon", name: "Runic Machete", damage: "d6", special: "glows in the dark when undead are nearby" }] },
  { roll: 6, id: "rotten-cargo-net", name: "Rotten Cargo Net", damage: null, thrown: { ability: "AGILITY", dr: 12 },
    text: "Test AGILITY DR12 to throw it at something and stop it moving for d2 rounds. Trapped targets take d2 damage per round.",
    effects: [{ type: "weapon", name: "Rotten Cargo Net", damage: null, thrown: { ability: "AGILITY", dr: 12 }, special: "target can't move for d2 rounds; trapped targets take d2/round" }] },
];
const BRUTE_BETTER = [
  { roll: 1, id: "liars-dice", name: "Liar's Dice",
    text: "A small bag of 5d6. Roll them at the start of combat: if the total is even, your melee attacks are −2 DR but you defend at +2 DR.",
    effects: [{ type: "dr", value: -2, applies: "melee-attack", when: "combat-start 5d6 total is even" }, { type: "dr", value: 2, applies: "defense", when: "combat-start 5d6 total is even" }], roll5d6: true },
  { roll: 2, id: "boomstick", name: "Boomstick",
    text: "You find a top-of-the-line blunderbuss, \"Boomstick\": DR8 to hit and d10 damage in melee range, otherwise DR12 and d4 damage.",
    effects: [{ type: "item", item: "\"Boomstick\" Blunderbuss", damage: "d10 (melee range, DR8) / d4 (DR12)", blackPowder: true }] },
  { roll: 3, id: "blood-frenzy", name: "Blood Frenzy",
    text: "+2 to damage rolls for each enemy you've killed so far this battle. Resets after 10 rounds (1 minute) without a death.",
    effects: [{ type: "damage", value: 2, applies: "all", per: "enemy killed this battle" }] },
  { roll: 4, id: "tavern-boxer", name: "Tavern Boxer",
    text: "Your fists deal 2d4 and ignore Fumbles.",
    effects: [{ type: "weapon", name: "Fists", damage: "2d4", special: "ignores Fumbles" }] },
  { roll: 5, id: "thick-skinned", name: "Thick Skinned",
    text: "You count as wearing light armor (tier 1, −d2) even when you aren't.",
    effects: [{ type: "armor", tier: 1, die: "d2" }] },
  { roll: 6, id: "grog-breath", name: "Grog Breath",
    text: "In melee range, belch to stun an opponent for 1 round. Once an hour, unless you drink more grog.",
    effects: [{ type: "action", name: "Grog Breath", text: "stun 1 opponent in melee range for 1 round", per: "hour" }] },
];

// ---- Rapscallion -------------------------------------------------------------------------
const RAPSCALLION_SPECIALTIES = [
  { roll: 1, id: "back-stabber", name: "Back Stabber",
    text: "Attacking by surprise (from hiding, a distracted enemy, etc.) lowers the attack DR by 2 and deals an extra d2 damage.",
    effects: [{ type: "dr", value: -2, applies: "attack", when: "attacking by surprise" }, { type: "damage", value: "d2", applies: "attack", when: "attacking by surprise" }],
    again: { text: "Draw a card. Black: lower the DR by 1 more. Red: increase the damage die (d2 > d4 > d6 > d8). Joker: both.", card: { black: { dr: -1 }, red: { dieChain: ["d2", "d4", "d6", "d8"] }, joker: "both" } } },
  { roll: 2, id: "burglar", name: "Burglar",
    text: "You begin with lock picks. Pickpocketing, disarming an enemy or disabling a trap is −4 DR.",
    effects: [{ type: "item", item: "lock picks" }, { type: "dr", value: -4, applies: "test", when: "pickpocket, disarm an enemy, disable a trap" }],
    again: { text: "An additional −2 DR.", effects: [{ type: "dr", value: -2, applies: "test", when: "pickpocket, disarm an enemy, disable a trap" }] } },
  { roll: 3, id: "skylarker", name: "Skylarker",
    text: "As nimble in the rigging as on deck: if you attack after swinging, jumping or an acrobatic maneuver, test AGILITY DR10 to hit automatically and deal +2 damage.",
    effects: [{ type: "test", ability: "AGILITY", dr: 10, when: "attacking after swinging, jumping or an acrobatic maneuver", success: "automatic hit, +2 damage" }],
    again: { text: "Increase the extra damage by +1.", effects: [{ type: "damage", value: 1, when: "Skylarker attack" }] } },
  { roll: 4, id: "sneaky-bastard", name: "Sneaky Bastard",
    text: "When striking from the shadows or while sneaking, test AGILITY DR12: on a success you automatically deal a critical hit.",
    effects: [{ type: "test", ability: "AGILITY", dr: 12, when: "striking from the shadows or while sneaking", success: "automatic critical hit" }],
    again: { text: "−2 to the DR.", effects: [{ type: "dr", value: -2, applies: "test", when: "Sneaky Bastard test" }] } },
  { roll: 5, id: "lucky-devil", name: "Lucky Devil",
    text: "Whenever you use Devil's Luck, draw a card. 9+: regain 1 Luck. Joker: roll on the Joker table.",
    card: { regainOn: 9, regain: 1, joker: "joker" },
    again: { text: "Lower the card number needed to regain Luck by 1.", card: { regainOn: -1 } } },
  { roll: 6, id: "grog-brewer", name: "Grog Brewer",
    text: "Each day brew d4 servings of potent grog. Soak melee weapons in it to use as a poison: grog in a wound means a TOUGHNESS DR14 test or −d6 HP.",
    brewPerDay: "d4", poison: { ability: "TOUGHNESS", dr: 14, damage: "d6" },
    again: { text: "Draw a card. Black: +2 to the DR. Red: increase the damage die (d6 > d8 > d10 > d12). Joker: both.", card: { black: { dr: 2 }, red: { dieChain: ["d6", "d8", "d10", "d12"] }, joker: "both" } } },
];
export const PB_JOKER_TABLE = {
  id: "joker", name: "Joker Table", die: "d20", page: 37, source: "Player's Guidebook",
  note: "Rapscallion Lucky Devil: drawing a Joker after using Devil's Luck.",
  rows: [
    { roll: 1, name: "The Devil", text: "The Devil comes for your soul. You are sucked into a fiery portal — this is the end of your story.", dead: true },
    { roll: [2, 9], text: "Lose all of your remaining Luck points.", luck: "zero" },
    { roll: [10, 19], text: "Regain 2 Luck points.", luck: 2 },
    { roll: 20, text: "Gain 4 Luck points (to a max of 4).", luck: 4, luckMax: 4 },
  ],
};
// Card convention for the app: a 54-card deck (26 black, 26 red, 2 jokers); ace = 1, J/Q/K = 11/12/13;
// "9+" means rank ≥ 9.
export const PB_CARD_DECK = { cards: 54, black: 26, red: 26, jokers: 2, ranks: { A: 1, J: 11, Q: 12, K: 13 }, note: "Ace counts 1 and J/Q/K count 11/12/13; \"9+\" means a rank of 9 or higher." };

// ---- Buccaneer ---------------------------------------------------------------------------
const BUCCANEER_FEATURES = [
  { roll: 1, id: "treasure-hunter", name: "Treasure Hunter", maxPicks: 2,
    text: "Tests for mapping, navigating, treasure hunting, finding and disarming traps, and tracking prey are −3 DR.",
    effects: [{ type: "dr", value: -3, applies: "test", when: "mapping, navigating, treasure hunting, finding & disarming traps, tracking prey" }],
    again: { text: "−6 DR instead.", effects: [{ type: "dr", value: -3, applies: "test", when: "mapping, navigating, treasure hunting, finding & disarming traps, tracking prey" }] } },
  { roll: 2, id: "crack-shot", name: "Crack Shot", maxPicks: 2,
    text: "All ranged attacks are −2 DR.",
    effects: [{ type: "dr", value: -2, applies: "ranged-attack" }],
    again: { text: "−4 DR instead.", effects: [{ type: "dr", value: -2, applies: "ranged-attack" }] } },
  { roll: 3, id: "fix-bayonets", name: "Fix Bayonets!", maxPicks: 2,
    text: "You gain a bayonet (d4) and can attack with it on the same turn you reload.",
    effects: [{ type: "item", item: "bayonet", damage: "d4" }, { type: "note", text: "May attack with the bayonet on a turn spent reloading." }],
    again: { text: "The bayonet deals d6 instead.", effects: [{ type: "weaponDamage", item: "bayonet", damage: "d6" }] } },
  { roll: 4, id: "focused-aim", name: "Focused Aim", maxPicks: 2,
    text: "Attacks against enemies you've already shot at this combat are −4 DR to hit.",
    effects: [{ type: "dr", value: -4, applies: "attack", when: "target already shot at this combat" }],
    again: { text: "Those attacks also deal an extra d4 damage.", effects: [{ type: "damage", value: "d4", applies: "attack", when: "target already shot at this combat" }] } },
  { roll: 5, id: "buccan-cook", name: "Buccan Cook", maxPicks: 2,
    text: "Island life taught you buccan-fire cooking. Start with d8 rations of smoked meat; eating one immediately heals d4 HP. Make d4 more rations from any edible animal you kill.",
    effects: [{ type: "item", item: "smoked meat ration", qty: "d8", heal: "d4" }],
    again: { text: "Rations heal d6 instead.", effects: [{ type: "consumableHeal", item: "smoked meat ration", heal: "d6" }] } },
  { roll: 6, id: "survivalist", name: "Survivalist", maxPicks: 2,
    text: "Your body is tuned for the wild: +1 TOUGHNESS, you can't become infected, sick or poisoned, and your max HP rises by d4.",
    effects: [{ type: "ability", ability: "TOUGHNESS", value: 1 }, { type: "immune", conditions: ["infected", "sick", "poisoned"] }, { type: "hpMax", dice: "d4" }],
    again: { text: "+1 TOUGHNESS and another d4 max HP.", effects: [{ type: "ability", ability: "TOUGHNESS", value: 1 }, { type: "hpMax", dice: "d4" }] } },
];

// ---- Swashbuckler ------------------------------------------------------------------------
const SWASH_STYLES = [
  { roll: 1, id: "ostentatious-fencer", name: "Ostentatious Fencer",
    text: "Melee attack and defense are DR −2 while wielding a rapier or cutlass. When dueling one-on-one you deal +1 damage.",
    effects: [{ type: "dr", value: -2, applies: "melee-attack", when: "wielding a rapier or cutlass" }, { type: "dr", value: -2, applies: "defense", when: "wielding a rapier or cutlass" }, { type: "damage", value: 1, when: "dueling one-on-one" }] },
  { roll: 2, id: "flintlock-fanatic", name: "Flintlock Fanatic",
    text: "Attack with up to three pistols on your turn (if you have them). Reloading one pistol takes you only one round.",
    effects: [{ type: "attacks", count: 3, applies: "pistols" }, { type: "reload", rounds: 1, applies: "pistol" }] },
  { roll: 3, id: "scurvy-scallywag", name: "Scurvy Scallywag",
    text: "You don't fight fair: −2 DR when attacking an enemy that has already been attacked this turn.",
    effects: [{ type: "dr", value: -2, applies: "attack", when: "target already attacked this turn" }] },
  { roll: 4, id: "inspiring-leader", name: "Inspiring Leader",
    text: "Once each combat, roll a d4. Each of your allies may add or subtract that value from any one roll during this combat.",
    effects: [{ type: "action", name: "Inspiring Leader", roll: "d4", per: "combat" }] },
  { roll: 5, id: "knife-knave", name: "Knife Knave",
    text: "Start with 2 knives. Attacking with them you make two attacks a turn at DR −2 to hit, and if the first hits the second hits automatically.",
    effects: [{ type: "item", item: "knife/dagger", qty: 2 }, { type: "attacks", count: 2, applies: "knives" }, { type: "dr", value: -2, applies: "attack", when: "attacking with knives" }] },
  { roll: 6, id: "black-powder-poet", name: "Black Powder Poet",
    text: "Start with explosives: roll d4 times on the Bombs table (pg. 53). Your DR is −2 when throwing bombs.",
    effects: [{ type: "item", item: "bombs", table: "bombs", rolls: "d4" }, { type: "dr", value: -2, applies: "throw-bomb" }] },
];
const SWASH_BETTER = [
  { roll: 1, id: "shakespeare-of-insults", name: "Shakespeare of Insults",
    text: "Your tongue is as quick as your blade: +1 to all your damage rolls.",
    effects: [{ type: "damage", value: 1, applies: "all" }] },
  { roll: 2, id: "military-mastermind", name: "Military Mastermind",
    text: "When combat starts, test PRESENCE DR10 to take a surprise round against the enemy or prevent them surprising you.",
    effects: [{ type: "test", ability: "PRESENCE", dr: 10, when: "combat starts", success: "surprise round, or prevent being surprised" }] },
  { roll: 3, id: "sword-master", name: "Sword Master",
    text: "−2 to DR when attacking with a sword.",
    effects: [{ type: "dr", value: -2, applies: "sword-attack" }] },
  { roll: 4, id: "intimidating-presence", name: "Intimidating Presence",
    text: "Enemies close to you suffer −2 Morale.",
    effects: [{ type: "enemyMorale", value: -2 }] },
  { roll: 5, id: "dazzling-acrobatics", name: "Dazzling Acrobatics",
    text: "Your AGILITY is +2 when defending.",
    effects: [{ type: "dr", value: -2, applies: "defense", note: "AGILITY +2 when defending" }] },
  { roll: 6, id: "calculating-cutthroat", name: "Calculating Cutthroat",
    text: "You crit on natural 19 and 20 when attacking and defending.",
    effects: [{ type: "crit", range: 19, applies: ["attack", "defense"] }] },
];

// ---- Zealot ------------------------------------------------------------------------------
export const PB_PRAYERS = [
  { roll: 1, numeral: "I", id: "heal", name: "Heal", text: "Heal yourself or another for d8 HP.", heal: "d8" },
  { roll: 2, numeral: "II", id: "curse", name: "Curse", test: { ability: "SPIRIT", dr: 10 }, damage: "d8 + SPIRIT",
    text: "Test SPIRIT DR10 to deal d8 + SPIRIT damage to an enemy you cannot see; DR8 if it's already been hurt this fight." },
  { roll: 3, numeral: "III", id: "death-ward", name: "Death Ward", test: { ability: "SPIRIT", dr: 10 },
    text: "Touch the corpse of someone who just died and test SPIRIT DR10: they return to life with 1 HP. Crit: full HP. Fumble: they come back as a zombie and attack you." },
  { roll: 4, numeral: "IV", id: "control-weather", name: "Control Weather", test: { ability: "SPIRIT", dr: 10 },
    text: "Test SPIRIT DR10 to change the wind's direction; succeed by 5 or more and you can also conjure or repel precipitation. Crit: lightning strikes your enemy for d12. Fumble: lightning strikes you for d6." },
  { roll: 5, numeral: "V", id: "blessed-guidance", name: "Blessed Guidance", noAction: true, bonus: "d4",
    text: "Add d4 to any roll you or another player makes. Usable any time, even after the roll, and doesn't take your action." },
  { roll: 6, numeral: "VI", id: "holy-protection", name: "Holy Protection", noAction: true, dr: -4,
    text: "You or an ally gets −4 DR to defend against one attack. Usable any time, even after the roll, and doesn't take your action." },
  { roll: 7, numeral: "VII", id: "divine-light", name: "Divine Light", duration: "d6 × 10 minutes",
    text: "Bright light radiates from you for up to d6 × 10 minutes. Enemies that see it are −2 DR to defend against." },
  { roll: 8, numeral: "VIII", id: "silence", name: "Silence", duration: "2d6 × 10 minutes",
    text: "For 2d6 × 10 minutes everything within 25' of you makes no sound. It ends only when the time expires." },
  { roll: 9, numeral: "IX", id: "sanctuary", name: "Sanctuary", heal: "d4", text: "All your brethren in sight heal d4 HP." },
  { roll: 10, numeral: "X", id: "commune", name: "Commune", test: { ability: "SPIRIT", dr: 8 },
    text: "Test SPIRIT DR8 to ask your deity a single yes-or-no question. The answer may be \"unclear\", or there may be none." },
];
export const PB_DEITIES = [
  { roll: 1, numeral: "I", name: "The One True God" },
  { roll: 2, numeral: "II", name: "Mother Nature" },
  { roll: 3, numeral: "III", name: "The Ancient Gods" },
  { roll: 4, numeral: "IV", name: "Chaos" },
  { roll: 5, numeral: "V", name: "The Deep" },
  { roll: 6, numeral: "666", name: "The Dark One" },
  { roll: 7, numeral: "VII", name: "The Church" },
  { roll: 8, numeral: "VIII", name: "The Great Old One" },
];

// ---- Sorcerer ----------------------------------------------------------------------------
export const PB_SPELLS = [
  { roll: 1, id: "dead-head", name: "Dead Head", test: { ability: "SPIRIT", dr: 12 }, ignoresArmor: true,
    text: "Summon a flying ghostly skull. Spend your action and test SPIRIT DR12 to have it damage 1 target, ignoring armor. It dissipates after 1 minute or once it deals any damage. Fumble: it attacks you.",
    ranks: { I: { damage: "2d4" }, II: { damage: "2d6" }, III: { damage: "2d8" } } },
  { roll: 2, id: "spiritual-possession", name: "Spiritual Possession",
    text: "One random creature is possessed by a spirit or ghost. Ally: −2 DR to attack and defense. Enemy: −2 DR to attack or defend against it. Any fumble involving the creature makes the spirit leave, stunning the host for 1 round.",
    ranks: { I: { duration: "d2 rounds" }, II: { duration: "d4 rounds" }, III: { duration: "until combat ends" } } },
  { roll: 3, id: "protection", name: "Protection", duration: "1 hour", extraArmor: "d2",
    text: "Summon a ghost or spirit to watch over the souls of you and your allies: −d2 protection for an hour, in addition to armor.",
    ranks: { I: { targets: 1 }, II: { targets: 2 }, III: { targets: 3 } } },
  { roll: 4, id: "clairvoyance", name: "Clairvoyance",
    text: "Ask the spirits a question about an adjacent room or area — their answer may be a lie. Test SPIRIT to know if they are telling the truth.",
    ranks: { I: { dr: 12 }, II: { dr: 10 }, III: { dr: 8 } } },
  { roll: 5, id: "necro-sleep", name: "Necro-Sleep", test: { ability: "SPIRIT", dr: 12 },
    text: "A living creature appears to fall over dead, but remembers everything when it wakes. Test SPIRIT DR12 to see if it falls \"dead\" asleep.",
    ranks: { I: { duration: "d2 rounds" }, II: { duration: "d6 rounds" }, III: { duration: "d8 hours" } } },
  { roll: 6, id: "raise-the-dead", name: "Raise the Dead", summon: "skeletal-thrall",
    text: "Create skeletal thralls from nearby corpses. They are stupid but obey your verbal commands, and tumble into bones at sunrise. Skeletal Thrall: HP 4, Morale –, Claw/Bite d4.",
    ranks: { I: { count: "1" }, II: { count: "2" }, III: { count: "d2+2" } } },
];

// ---- Haunted Soul ------------------------------------------------------------------------
const HAUNTED_AILMENTS = [
  { roll: 1, id: "ghost", name: "Ghost", short: "Apparate: SPIRIT DR14, d12.",
    text: "A lost soul from beyond the grave inhabiting another's body. Once per night you can apparate and terrify a target with your ghostly visage: test SPIRIT DR14 to deal d12 damage. Reduced to 1 HP or exorcised, you become incorporeal and must find a new host within d12 hours or dissipate into the void. Possessing a new target: test SPIRIT DR16 (one attempt per target).",
    effects: [{ type: "action", name: "Apparate", test: { ability: "SPIRIT", dr: 14 }, damage: "d12", per: "night" }] },
  { roll: 2, id: "conduit", name: "Conduit", short: "Random ritual each dawn.",
    text: "Restless spirits speak through you. Every dawn roll a random arcane ritual (pg. 64): you can use it once without testing SPIRIT, then the spirits leave your body. If you don't cast it by dawn you lose d2 HP.",
    effects: [{ type: "ritual", random: 1, per: "dawn", noTest: true, uncastPenalty: "d2 HP" }] },
  { roll: 3, id: "eldritch-mind", name: "Eldritch Mind", short: "Might panic in combat.",
    text: "Something terrible wells beneath your thoughts; you are drawn to The Deep and its antediluvian horrors. Every time combat starts, test PRESENCE DR12. Fail: you panic — attacks are +4 DR to hit, but you may make 2 a turn. Pass: you harness the fear — attacks are −2 DR to hit this combat.",
    effects: [{ type: "test", ability: "PRESENCE", dr: 12, when: "combat starts", success: "attacks −2 DR this combat", failure: "attacks +4 DR but 2 attacks a turn" }] },
  { roll: 4, id: "zombie", name: "Zombie", short: "Must eat flesh daily. Brains = good.",
    text: "You are secretly a zombie and your flesh slowly rots away. You lose d2 HP every day you don't eat human flesh. Eating a human brain restores 2d6 HP. As long as your brain is intact you control all your body parts, attached or not.",
    effects: [{ type: "upkeep", text: "lose d2 HP each day without human flesh" }, { type: "heal", source: "human brain", heal: "2d6" }] },
  { roll: 5, id: "vampirism", name: "Vampirism", short: "Must drink blood to heal.",
    text: "Infected by a fiendish creature. Resting and normal means can't heal you, but fresh animal blood restores d2 HP and fresh human blood d6 HP, at most once an hour. You are faster at night (move 40' a turn) but hungover in sunlight (−2 TOUGHNESS).",
    effects: [{ type: "noRestHealing" }, { type: "heal", source: "fresh animal blood", heal: "d2", per: "hour" }, { type: "heal", source: "fresh human blood", heal: "d6", per: "hour" }, { type: "movement", feet: 40, when: "night" }, { type: "ability", ability: "TOUGHNESS", value: -2, when: "in sunlight" }] },
  { roll: 6, id: "skeleton", name: "Skeleton", short: "Might reform if killed.",
    text: "An undead skeleton reanimated by unknowable dark magic, yet with free will. If you are killed, reroll the damage dice that killed you: on 3 or less your bones reform and you return to life with 1 HP.",
    effects: [{ type: "cheatDeath", reroll: "killing damage dice", successAtOrBelow: 3, hp: 1 }] },
];

// ---- Tall Tale ---------------------------------------------------------------------------
const AQUATIC_MUTANTS = [
  { roll: 1, id: "anglerfish", name: "Anglerfish", text: "See in the dark. Bite: d4.", effects: [{ type: "sense", name: "darkvision" }, { type: "weapon", name: "Bite", damage: "d4" }] },
  { roll: 2, id: "crab", name: "Crab", text: "Pincher: d6.", effects: [{ type: "weapon", name: "Pincher", damage: "d6" }] },
  { roll: 3, id: "jellyfish", name: "Jellyfish", text: "Tendril: d2 & stun 1 round, 10' reach.", effects: [{ type: "weapon", name: "Tendril", damage: "d2", reach: 10, special: "stun 1 round" }] },
  { roll: 4, id: "octopus", name: "Octopus", text: "Tentacles: 2d4.", effects: [{ type: "weapon", name: "Tentacles", damage: "2d4" }] },
  { roll: 5, id: "sea-turtle", name: "Sea Turtle", text: "Extra −d2 to armor.", effects: [{ type: "extraArmor", die: "d2" }] },
  { roll: 6, id: "electric-eel", name: "Electric Eel", text: "+1 to AGILITY. Electric skin: d6.", effects: [{ type: "ability", ability: "AGILITY", value: 1 }, { type: "weapon", name: "Electric skin", damage: "d6" }] },
  { roll: 7, id: "shark", name: "Shark", text: "Bite: d8.", effects: [{ type: "weapon", name: "Bite", damage: "d8" }] },
  { roll: 8, id: "great-old-one", name: "The Great Old One", text: "Learn one random ritual (pg. 64).", effects: [{ type: "ritual", random: 1 }] },
];
// Full ability grids from the class summary sheet (PDF p3): "−2 to all modifiers except as listed".
const SENTIENT_ANIMALS = [
  { roll: 1, id: "foul-fowl", name: "Foul Fowl", abilities: ABIL({ STRENGTH: -2, AGILITY: -2, PRESENCE: -2, TOUGHNESS: -2, SPIRIT: 3 }),
    hpDie: "d4", luckDie: "d4", weapon: { name: "Beak Peck", damage: "d2" },
    text: "Gain the ability from one random relic and one random ritual. When you are killed, the ghosts of a hundred chickens swarm your assailant, ripping its spiritual soul from its flesh.",
    effects: [{ type: "relic", random: 1 }, { type: "ritual", random: 1 }] },
  { roll: 2, id: "jaguar", name: "Jaguar", abilities: ABIL({ STRENGTH: 2, AGILITY: 2, PRESENCE: -2, TOUGHNESS: -2, SPIRIT: -2 }),
    hpDie: "d8", luckDie: "d4", weapon: { name: "Bite/Claws", damage: "d8" }, text: "A deadly jungle cat." },
  { roll: 3, id: "crocodile", name: "Crocodile", abilities: ABIL({ STRENGTH: 3, AGILITY: -2, PRESENCE: -2, TOUGHNESS: 1, SPIRIT: -2 }),
    hpDie: "d10", luckDie: "d4", weapon: { name: "Bite", damage: "d10" }, text: "You swim and hide well in water." },
  { roll: 4, id: "bilge-rat", name: "Bilge Rat", abilities: ABIL({ STRENGTH: -2, AGILITY: 3, PRESENCE: -2, TOUGHNESS: 2, SPIRIT: -2 }),
    hpDie: "d2", luckDie: "d4", weapon: { name: "Diseased Bite", damage: "d2", special: "1-in-6 chance the target dies in d4 rounds from whatever disease you carry" },
    text: "A filthy rodent. Your diseased bite has a 1-in-6 chance of killing the target in d4 rounds." },
  { roll: 5, id: "lucky-parrot", name: "Lucky Parrot", abilities: ABIL({ STRENGTH: -2, AGILITY: 1, PRESENCE: 2, TOUGHNESS: -2, SPIRIT: -2 }),
    hpDie: "d2", luckDie: "d6", luckDaily: true, weapon: { name: "Beak Peck", damage: "d4" },
    text: "A colorful, talking, flying bird. Roll d6 for Devil's Luck points each day." },
  { roll: 6, id: "clever-monkey", name: "Clever Monkey", abilities: ABIL({ STRENGTH: -1, AGILITY: 2, PRESENCE: 0, TOUGHNESS: -2, SPIRIT: -2 }),
    hpDie: "d6", luckDie: "d4", weapon: { name: "Bite", damage: "d4" }, startingWeaponDie: "d10",
    text: "An excellent climber. Roll d10 for a starting weapon (pg. 50) as well as your bite." },
];

export const PB_CLASSES = [
  {
    id: "brute", name: "Brute", roll: 1, optional: false, page: 34,
    tagline: "A tough melee combatant prone to fits of RAGE.",
    text: "When you aren't bashing, smashing, slashing or crashing you're… well, that's all you really know. Your muscles are basically magic — you can't use arcane rituals.",
    abilities: ABIL({ STRENGTH: 1, TOUGHNESS: 1, PRESENCE: -1, SPIRIT: -1 }),
    hpDie: "d12", luckDie: "d2",
    weapon: { trusted: true, table: "trustedWeapon" }, clothingDie: "d10", hatDie: "d12",
    restrictions: { rituals: false, relics: true, magicArmorTier: 1, metal: true },
    tables: [
      { id: "trustedWeapon", name: "Trusted Weapon", die: "d6", when: "start", picks: 1,
        note: "Your trusted weapon never breaks, but you drop it on a Fumble. It is DR −2 to attack with. Name it!",
        trustedRule: { neverBreaks: true, dropOnFumble: true, dr: -2 },
        rows: BRUTE_TRUSTED },
      { id: "gettingBetter", name: "Getting Better", die: "d6", when: "experience", rerollRepeats: true, maxPicksEach: 1,
        note: "Each time you gain experience gain one (reroll repeats).", rows: BRUTE_BETTER },
    ],
  },
  {
    id: "rapscallion", name: "Rapscallion", roll: 2, optional: false, page: 36,
    tagline: "A sneaky cutthroat scallywag. You will need a deck of playing cards…",
    text: "Good at backstabbing, breaking and entering, stealing, cheating and escaping. Found in taverns, shadows and shallow graves.",
    abilities: ABIL({ AGILITY: 2, STRENGTH: -1, TOUGHNESS: -1 }),
    hpDie: "d8", luckDie: "d2",
    weapon: { die: "d6" }, clothingDie: "d6", hatDie: "d10",
    restrictions: { rituals: true, relics: true, magicArmorTier: 1, metal: true },
    usesCards: true,
    tables: [
      { id: "specialty", name: "Specialty", die: "d6", when: "both", picks: 1, repeatUpgrades: true, maxPicksEach: 2,
        note: "Roll when you begin and whenever you gain experience. Rolling a specialty you have applies its \"if taken again\" upgrade.",
        rows: RAPSCALLION_SPECIALTIES },
    ],
    joker: "joker",
  },
  {
    id: "buccaneer", name: "Buccaneer", roll: 3, optional: false, page: 38,
    tagline: "Skilled trackers and survivalists; expert sharpshooters.",
    text: "Deadly with muskets and rifles: reloading black powder weapons takes you 1 round instead of 2.",
    abilities: ABIL({ PRESENCE: 2, AGILITY: -1, SPIRIT: -1 }),
    hpDie: "d8", luckDie: "d2",
    weapon: { fixed: ["musket"] }, startingAmmo: { item: "rounds of shot", qty: "10 + PRESENCE" },
    clothingDie: "d10", hatDie: "d12",
    restrictions: { rituals: true, relics: true, magicArmorTier: 1, metal: true },
    classEffects: [{ type: "reload", rounds: 1, applies: "black powder" }],
    tables: [
      { id: "feature", name: "Feature", die: "d6", when: "both", picks: 1, maxPicksEach: 2, rerollAfterMax: true,
        note: "Roll when you begin and whenever you gain experience. Each can be taken twice (reroll on a third).",
        rows: BUCCANEER_FEATURES },
    ],
  },
  {
    id: "swashbuckler", name: "Swashbuckler", roll: 4, optional: false, page: 40,
    tagline: "A brash fighter with bravado & swagger.",
    text: "A flashy duelist who lives for the fight.",
    abilities: ABIL({ STRENGTH: 1, AGILITY: 1, PRESENCE: -1, SPIRIT: -1 }),
    hpDie: "d10", luckDie: "d2",
    weapon: { die: "d10" }, clothingDie: "d10", hatDie: "d12",
    restrictions: { rituals: true, relics: true, magicArmorTier: 1, metal: true },
    tables: [
      { id: "fightingStyle", name: "Fighting Style", die: "d6", when: "start", picks: 1, rows: SWASH_STYLES },
      { id: "experience", name: "Experience", die: "d6", when: "experience", rerollRepeats: true, maxPicksEach: 1,
        note: "Each time you gain experience gain one (reroll if already taken).", rows: SWASH_BETTER },
    ],
  },
  {
    id: "zealot", name: "Zealot", roll: 5, optional: false, page: 42,
    tagline: "A clergy member, cultist, shaman or believer.",
    text: "Thou may use ancient relics and arcane rituals whilst wearing medium armor (tier 2 or lower).",
    abilities: ABIL({ SPIRIT: 2, AGILITY: -1, TOUGHNESS: -1 }),
    hpDie: "d8", luckDie: "d4",
    weapon: { die: "d8" }, clothingDie: "d8", hatDie: null,
    restrictions: { rituals: true, relics: true, magicArmorTier: 2, metal: true },
    prayers: { usesPerDay: "d2 + SPIRIT", reset: "dawn", action: true, noRollUnlessNoted: true },
    tables: [
      { id: "deity", name: "Whom Dost Thou Serve?", die: "d8", when: "start", picks: 1, rows: PB_DEITIES },
      { id: "prayers", name: "Prayers", die: "d10", when: "both", picks: 1, rerollRepeats: true, maxPicksEach: 1,
        note: "Learn one random prayer when you begin and every time you improve (reroll duplicates). Pray d2 + SPIRIT times a day (reroll at dawn); praying uses your action but needs no roll unless noted.",
        rows: PB_PRAYERS },
    ],
  },
  {
    id: "sorcerer", name: "Sorcerer", roll: 6, optional: false, page: 44,
    tagline: "An eldritch occultist; a conduit for spirits and devious necromantic entities.",
    text: "You draw power from supernatural spirits and ghosts: weak in body, strong in the old magic. You may use ancient relics and arcane rituals while wearing medium armor, but never near cold iron or while holding metal.",
    abilities: ABIL({ SPIRIT: 2, STRENGTH: -1, TOUGHNESS: -1 }),
    hpDie: "d8", luckDie: "d4",
    weapon: { choice: [{ name: "Wooden Knife", damage: "d4", wooden: true }, { weapon: "belaying-pin", damage: "d4" }], note: "wooden knife (d4) or belaying pin (d4)" },
    clothingDie: "d6", hatDie: null,
    restrictions: { rituals: true, relics: true, magicArmorTier: 2, metal: false, noColdIron: true },
    spells: { castsPerDay: "d2 + SPIRIT", reset: "sunset", action: true, noRollUnlessNoted: true, startRank: 1, maxRank: 3 },
    tables: [
      { id: "spells", name: "Spells", die: "d6", when: "both", picks: 1, repeatUpgrades: true, maxPicksEach: 3,
        note: "Begin with one rank I spell. On each experience roll again: a spell you already know rises a rank (max III). Cast d2 + SPIRIT spells a day, resetting at sunset.",
        rows: PB_SPELLS },
    ],
  },
  {
    id: "haunted-soul", name: "Haunted Soul", roll: 7, optional: true, page: 46,
    tagline: "A possessed, infected, cursed, troubled or undead individual.",
    text: "Roll a d6 for your ailment, then roll d6 for an additional (normal) class, which supplies your abilities, HP, weapon, clothing, hat, Devil's Luck and features.",
    secondaryClass: { die: "d6", required: true },
    abilities: null, hpDie: null, luckDie: null, weapon: null, clothingDie: null, hatDie: null,
    restrictions: null,
    tables: [{ id: "ailment", name: "Ailment", die: "d6", when: "start", picks: 1, rows: HAUNTED_AILMENTS }],
  },
  {
    id: "tall-tale", name: "Tall Tale", roll: 8, optional: true, page: 48,
    tagline: "Legends of the sea made flesh.",
    text: "Roll d6: 1-2 Merfolk, 3-4 Aquatic Mutant, 5-6 Sentient Animal.",
    abilities: null, hpDie: null, luckDie: null, weapon: null, clothingDie: null, hatDie: null, restrictions: null,
    variants: [
      { roll: [1, 2], id: "merfolk", name: "Merfolk", secondaryClass: { die: "d6", required: true },
        text: "A child of Poseidon: a fish-like lower half and gills, both of which can be magically hidden. All DRs are −4 underwater. You die if you go 1 ± TOUGHNESS days (minimum 1) without submerging in fresh seawater. Roll d6 for an additional class.",
        effects: [{ type: "dr", value: -4, applies: "all", when: "underwater" }, { type: "upkeep", text: "die after 1 ± TOUGHNESS days (min 1) without submerging in seawater" }] },
      { roll: [3, 4], id: "aquatic-mutant", name: "Aquatic Mutant", secondaryClass: { die: "d6", required: true },
        text: "Spawn of an abominable union between man and the sea. Roll d8 for the creature that makes up half your ancestry, then d6 for an additional class.",
        table: { id: "ancestry", name: "Aquatic Ancestry", die: "d8", rows: AQUATIC_MUTANTS } },
      { roll: [5, 6], id: "sentient-animal", name: "Sentient Animal", secondaryClass: null,
        text: "A mystically intelligent animal (no normal class) — maybe you were human once. Roll 3d6 for each ability, with −2 to every modifier except as listed. Reroll backstory details that make no sense; give away or leave behind equipment you can't carry. Devil's Luck d4 unless listed.",
        table: { id: "animal", name: "Sentient Animal", die: "d6", rows: SENTIENT_ANIMALS } },
    ],
    tables: [],
  },
];

export const PB_LANDLUBBER = {
  id: "landlubber", name: "Landlubber", page: 27,
  text: "A PC with no class. Landlubbers may roll 4d6 and drop the lowest die for each ability.",
  abilityRoll: "4d6 drop lowest", abilities: ABIL({}),
  hpDie: "d10", luckDie: "d2", weapon: { die: "d10" }, clothingDie: "d10", hatDie: "d12",
  restrictions: { rituals: true, relics: true, magicArmorTier: 1, metal: true }, tables: [],
};
