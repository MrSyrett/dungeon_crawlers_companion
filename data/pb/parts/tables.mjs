// Pirate Borg — random tables for the GM Screen, Session Prep and sheet roll buttons.
// Each table: { id, name, die, page, source, note?, rows: [{ roll: n | [from, to], text, name?, ...hints }] }
// or, for multi-column tables, `columns`. Guidebook tables reuse the canonical data from the other parts;
// "Trapped in the Tropics" tables are the adventure's generic, reusable generators (keyed locations skipped).

import { PB_RULES } from "./core.mjs";
import { PB_JOKER_TABLE } from "./classes.mjs";
import { PB_RELICS, PB_RITUALS, PB_MISHAPS } from "./magic.mjs";
import { PB_DERELICT, PB_CHANGING_WINDS, PB_FOUL_WEATHER, PB_SHANTIES, PB_WIND } from "./naval.mjs";
import { PB_NAMES } from "./backgrounds.mjs";
import {
  PB_CAROUSING, PB_NAMES_D12, PB_NPC_MOTIVATION, PB_LOOT_THE_BODY, PB_ASH, PB_ALCHEMY_TABLE, PB_TRAVEL_EVENTS, PB_SHIPS_AT_SEA,
  PB_CARGO, PB_DERELICT_GEN, PB_BURIED_TREASURE, PB_TREASURE_MAPS, PB_ISLANDS, PB_PIRATE_GEN, PB_JOBS, PB_RUMORS,
} from "./core-tables.mjs";
import { PB_HISTORY, PB_ENEMY_BUILDER, PB_MODULE_SKELETON_POINT } from "./core-setting.mjs";

const PG = "Player's Guidebook";
const TT = "Trapped in the Tropics";
const CR = "Core Rules";
// Flatten a generator's sub-tables into PB_GM_TABLES entries, tagging each with its generator group.
const group = (g, tables) => Object.fromEntries(Object.values(tables).map((t) => [t.id, { ...t, group: g }]));
const named = (rows) => rows.map((r) => ({ ...r, text: r.name && r.text ? `${r.name}: ${r.text}` : r.text || r.name }));
const list = (arr) => arr.map((t, i) => (typeof t === "string" ? { roll: i + 1, text: t } : { roll: i + 1, ...t }));

export const PB_GM_TABLES = {
  reaction: { id: "reaction", name: "Reaction", die: "2d6", page: 31, source: PG, note: PB_RULES.reaction.text, rows: PB_RULES.reaction.rows },
  morale: {
    id: "morale", name: "Morale", die: "2d6", page: 31, source: PG, note: PB_RULES.morale.text, triggers: PB_RULES.morale.triggers,
    check: { die: "2d6", breaksIf: "greater than Morale" }, rows: PB_RULES.morale.result.rows, rowsDie: "d6",
  },
  broken: { id: "broken", name: "Broken (0 HP)", die: "d6", page: 32, source: PG, note: PB_RULES.broken.text, rows: named(PB_RULES.broken.rows) },
  misfire: { id: "misfire", name: "Misfire (black powder fumble)", die: "d6", page: 30, source: PG, rows: named(PB_RULES.violence.misfire.rows) },
  amongTheDead: { id: "amongTheDead", name: "Among the Dead You Find", die: "d6", page: 33, source: PG, note: "Rolled as part of gaining experience.", rows: PB_RULES.experience.amongTheDead.rows },
  joker: { ...PB_JOKER_TABLE },
  relics: { id: "relics", name: "Ancient Relics", die: "d20", page: 62, source: PG, note: PB_RULES.relics.text, rows: named(PB_RELICS) },
  rituals: { id: "rituals", name: "Arcane Rituals", die: "d20", page: 64, source: PG, note: PB_RULES.rituals.text, modifiers: PB_RULES.rituals.modifiers, rows: named(PB_RITUALS) },
  mishaps: {
    id: "mishaps", name: "Mystical Mishaps", die: "d20", page: 66, source: PG,
    note: "Rolled on a failed ritual. Text in the `hidden` field is something the caster might not immediately realize. " + PB_RULES.rituals.repeatedMishap,
    rows: PB_MISHAPS.map((r) => ({ ...r, text: r.hidden ? `${r.text} ${r.hidden}` : r.text })),
  },
  names: {
    id: "names", name: "Pirate Name Generator", die: "d66", page: 79, corePage: 125, source: PG, note: "Roll d66 × 4: a first name (either column), a surname and two nicknames. Mix and match to taste.",
    columns: [
      { die: "d66", name: "Name (male)", values: PB_NAMES.map((n) => n.male) },
      { die: "d66", name: "Name (female)", values: PB_NAMES.map((n) => n.female) },
      { die: "d66", name: "Surname", values: PB_NAMES.map((n) => n.surname) },
      { die: "d66", name: "Nickname (roll ×2)", values: PB_NAMES.map((n) => n.nickname) },
    ],
    rows: PB_NAMES.map((n) => ({ roll: n.roll, text: `${n.male} / ${n.female} · ${n.surname} · "${n.nickname}"`, ...n })),
  },
  derelict: { id: "derelict", name: "Derelict Takes More Damage", die: "d8", page: 74, source: PG, note: "A ship at zero HP or less is derelict: speed 0, no crew actions in combat. Roll whenever it takes more damage.", rows: PB_DERELICT },
  windDirection: {
    id: "windDirection", name: "Wind Direction", die: "d6", page: 78, source: PG, note: PB_WIND.text,
    columns: [{ die: "d6", name: "Flat-top hexes", values: PB_WIND.flat.map((r) => r.dir) }, { die: "d6", name: "Pointed-top hexes", values: PB_WIND.pointed.map((r) => r.dir) }],
    rows: PB_WIND.flat.map((r, i) => ({ roll: r.roll, text: `${r.dir} (flat) / ${PB_WIND.pointed[i].dir} (pointed)` })),
  },
  changingWinds: { id: "changingWinds", name: "Changing Winds", die: "2d6", page: 78, source: PG, note: "Roll when thematic, when Weathercraft is in use, or randomly.", rows: named(PB_CHANGING_WINDS) },
  foulWeather: { id: "foulWeather", name: "Foul Weather", die: "2d6", page: 78, source: PG, rows: PB_FOUL_WEATHER },
  shanties: { id: "shanties", name: "Sea Shanties", die: "d12", page: 68, source: PG, note: "Each day the crew can sing 1 ± the Captain's SPIRIT shanties; test CREW SKILL DR12.", rows: named(PB_SHANTIES) },

  // ---- Trapped in the Tropics: reusable generators -----------------------------------------
  maritimeEvents: {
    id: "maritimeEvents", name: "Maritime Events & Encounters", die: "d12", page: 36, source: TT,
    note: "When to roll (pick one): one event per leg of the journey; 2-in-6 per 50-mile hex traveled; 2-in-6 per 4-hour watch; or just when something should happen. The GM decides details and outcomes.",
    rows: list([
      { name: "Massive storm", text: "Massive storm: man overboard, hull or sails damaged, shipwreck, or thrown off course." },
      { name: "Fog or becalmed", text: "Fog or becalmed: a day of travel is lost at sea. Run aground. Uneasy crew." },
      { name: "Short on supplies", text: "Short on supplies: food, water or rum stores are spent or sabotaged. Lower morale, hunger, starvation, a risky stop to resupply." },
      { name: "Rocks/shoals/reef", text: "Rocks, shoals or reef: emergency repairs required. Ship HP loss. Time wasted." },
      { name: "Crew infighting", text: "Crew infighting: a gambling dispute, love triangle, or rum/grog/ASH leads to an argument, violence and/or lower morale." },
      { name: "Merchant ship", text: "Merchant ship: a fluyt bound for port.", ship: "fluyt" },
      { name: "Backstory event", text: "Backstory event: something tied to one PC's backstory — a complication needing their Background, an NPC with news of their Unfortunate Incident, their Thing of Importance becoming relevant, or a dream or premonition." },
      { name: "Antediluvian crustacean", text: "Antediluvian crustacean: it climbs aboard; gemstones are embedded in its shell (HP 50, Morale 6, Thick Shell −d4, Claws d10 & d6).", monster: "antediluvian-crustacean" },
      { name: "French aristocrats", text: "French aristocrats in a fancy fluyt: well armed, but flying a blue and yellow signal flag to show they want to communicate (in the adventure, to buy ASH).", ship: "fluyt" },
      { name: "Flotilla of zombies", text: "Flotilla of zombies: some are recognizable as recently deceased PCs or NPCs." },
      { name: "Privateers", text: "West India Co. privateers in a sloop, looking to plunder Spanish or French ships — but they'll settle for pirate bounty hunting.", ship: "sloop" },
      { name: "Another pirate crew", text: "Another pirate crew in an old sloop. Who are they? What do they want? Roll reaction if needed.", ship: "sloop" },
    ]),
  },
  plunder: {
    id: "plunder", name: "Plunder (cargo)", die: "d12", page: 36, source: TT, note: "Roll (or pick) for each cargo slot. Values are only suggestions.",
    rows: list([
      { text: "Empty" }, { text: "Empty" }, { text: "Empty" },
      { text: "Crops, food, or spices (d4 × 100s)", value: "d4 × 100s" },
      { text: "Livestock (d4 × 100s)", value: "d4 × 100s" },
      { text: "Rum, grog, or wine (d2 × 1,000s)", value: "d2 × 1,000s" },
      { text: "Lumber (d4 × 1,000s)", value: "d4 × 1,000s" },
      { text: "Sugar or tobacco (d4 × 1,000s)", value: "d4 × 1,000s" },
      { text: "Munitions (d4 × 1,000s)", value: "d4 × 1,000s" },
      { text: "Treasure (d6 × 1,000s)", value: "d6 × 1,000s" },
      { text: "Treasure (d8 × 1,000s)", value: "d8 × 1,000s" },
      { text: "Artifacts or VIPs (d10 × 1,000s)", value: "d10 × 1,000s" },
    ]),
  },
  zombieAppearance: {
    id: "zombieAppearance", name: "Zombie Appearance", die: "d6", page: 26, source: TT, note: "See pg. 52 of the Guidebook for clothing and armor details.",
    rows: list([
      "Pirate or sailor (or a recently deceased PC), dead for d6 days, in rags.",
      "Monk or nun, dead for d6 years.",
      "Conquistador, dead for d6 years, wearing a morion or conquistador plate.",
      "Redcoat soldier, dead for d6 months, in an old uniform.",
      "European merchant, dead for d6 months, wearing fancy clothes or a hat.",
      "Mesoan warrior or North American indigenous explorer, mummified skin.",
    ]),
  },
  traps: {
    id: "traps", name: "It's a Trap!", die: "d12", page: 58, source: TT,
    note: "Roll 1d12 (fast), 5d12 across the trap, bait, trigger, state and complication tables (random), or pick. Adapt results so they make sense; some traps have their trigger built in.",
    rows: list([
      { name: "Bear trap", text: "Spring-loaded metal bear trap, chained to a tree or staked down. AGILITY DR12 or d6 damage and the foot is trapped (likely permanently gnarled); 1-in-6 chance the main weapon is destroyed.", test: { ability: "AGILITY", dr: 12 }, damage: "d6" },
      { name: "Cargo net", text: "Cargo net camouflaged on the ground, rigged to a pulley and a spring-pole tree. No damage, but can trap up to 8 targets in the air." },
      { name: "Sailcloth & rocks", text: "Sailcloth weighted with 8 sandbags drops from the canopy when triggered, covering up to 6 targets; then d6 rocks fall from higher up, d4 damage each (TOUGHNESS DR12 to avoid each rock).", test: { ability: "TOUGHNESS", dr: 12 }, damage: "d4 per rock" },
      { name: "Swinging mass", text: "An old anchor (1 target, d10), a large cannon (2 targets, d6 each) or a ship's mast (4 targets, d4 each) smashes into the triggered area. AGILITY DR10 to avoid.", test: { ability: "AGILITY", dr: 10 } },
      { name: "Pit trap", text: "Pit covered with twigs, leaves, mud, fronds or grass. Deep (TOUGHNESS DR12 or d8 damage) or lined with wooden spikes (AGILITY DR10 or 3d4 damage)." },
      { name: "Falling cage", text: "A heavy cage of bamboo, vines and stones, big enough for 4 people, drops from above when triggered." },
      { name: "Buried brig cell", text: "A ship's brig cell buried in the dirt with a spring-loaded door that slams shut when triggered; the target may fall in or be shoved in by the door." },
      { name: "Guillotine", text: "A guillotine blade on old vines swings at neck height when triggered. AGILITY DR12 or d6 damage and a nasty facial scar; fail by more than 4 and the target is decapitated.", test: { ability: "AGILITY", dr: 12 }, damage: "d6" },
      { name: "Collapsing walkway", text: "A gangplank or rope bridge leads to the bait; the last section gives way and dumps the target into a deep pit, large barrel, or a cage that springs shut and locks." },
      { name: "Blunderbuss", text: "A blunderbuss aimed at the trigger area fires via a pull string: d10 damage within 5', d4 within 10'; 2-in-6 a random inventory item is damaged." },
      { name: "Nail mine", text: "An old pistol's flintlock ignites a gunpowder mine of nails, forks and glass: d4 damage to all within 20', 1-in-6 chance of losing an eye.", damage: "d4" },
      { name: "Snare", text: "A noose or foot snare lifts the target 20' up. Neck: TOUGHNESS DR8 or die of a broken neck, then use the holding-breath rules. Foot: TOUGHNESS DR8 or the ankle breaks. Either way they're stuck in the air.", test: { ability: "TOUGHNESS", dr: 8 } },
    ]),
  },
  trapDetails: {
    id: "trapDetails", name: "Trap Bait, Trigger, State & Complication", die: "d12", page: 59, source: TT,
    note: "Roll d12 on each column (or pick) to dress a trap.",
    columns: [
      { die: "d12", name: "Bait", values: [
        "A human head on a spike.", "A wood plank covered in pig brains.", "A human silhouette painted on an old door.",
        "A cowbell rigged to a sail; it rings with the wind.", "A small, fancy chest atop a pile of rocks.", "A scarecrow dressed like a pirate.",
        "None — trap hidden under leaves and brush.", "None — trap hidden among rocks.", "None, but the trap is hard to see.",
        "None, and the trap is easy to see in daylight.", "A live human captive in a locked gibbet cage.", "A pirate (alive), acting like a captive, in an unlocked gibbet cage.",
      ] },
      { die: "d12", name: "Trigger", values: [
        "Tied directly to the bait; triggers when taken.", "Thread tripwire; triggers by breaking.", "Counterweight held by stones; triggers when displaced.",
        "Taut rope tripwire that blends in with the ground.", "Loose vine tripwire; triggers if pulled too far.", "Metal tripwire, hard to see.",
        "Large, flat stone pressure plate.", "Stepping-stone-sized pressure plate.", "Barrel-lid pressure plate.",
        "Wood plank seesaw, end tied to the trap.", "Fallen-tree seesaw, end tied to a counterweight.", "Spring-loaded metal mechanism.",
      ] },
      { die: "d12", name: "State", values: [
        "Sprung, zombie inside/nearby.", "Sprung, lots of (zombie) body parts.", "Sprung, human inside or nearby (alive but wounded).",
        "Sprung, goat or boar screaming.", "Broken.", "Set but appears sprung; skeleton inside/nearby.",
        "Set, terribly: 5-in-6 chance it won't fire.", "Set, poorly: 3-in-6 chance it won't fire.", "Set, ready to fire.",
        "Set, ready to fire.", "Set, ready to fire.", "Set, expertly rigged: deals double damage.",
      ] },
      { die: "d12", name: "Complication", values: [
        "Rigged alarm: a loud ship's bell.", "Rigged alarm: pots and pans clang.", "Rigged alarm: pokes a loud rooster.",
        "Rigged alarm: fires a firework out of a musket.", "Also dumps a barrel of tar on the target.", "Watched by a conniving parrot sentry.",
        "Triggered by an elaborate chain reaction.", "It's a decoy for the real trap just ahead.", "The trap maker's corpse is here.",
        "The trap fires 10' behind the trigger.", "So obvious no one living could fall for it.", "Bright paint explodes onto the target, making them easy to track.",
      ] },
    ],
  },

  // ---- Core Rules generators (pg. 2-3, 10, 25, 70, 79, 91, 114-127) ------------------------------
  carousing: { ...PB_CAROUSING, group: "Carousing & Taverns" },
  namesD12: { ...PB_NAMES_D12, group: "Names" },
  npcMotivation: { ...PB_NPC_MOTIVATION, group: "NPCs" },
  lootTheBody: { ...PB_LOOT_THE_BODY, group: "Loot & Treasure" },
  ashMarket: { ...PB_ASH.market, group: "ASH" },
  ashEffects: { ...PB_ASH.effects, group: "ASH" },
  history: { ...PB_HISTORY, group: "Setting" },
  alchemy: { ...PB_ALCHEMY_TABLE, group: "Alchemy" },
  flotsam: { ...PB_TRAVEL_EVENTS.flotsam, group: "Maritime Travel Events" },
  seaEncounters: { ...PB_TRAVEL_EVENTS.encounters, group: "Maritime Travel Events" },
  seaEvents: { ...PB_TRAVEL_EVENTS.events, group: "Maritime Travel Events" },
  ...group("Enemy Builder", PB_ENEMY_BUILDER.tables),
  vesselClass: { ...PB_SHIPS_AT_SEA.vesselClass, group: "Ships at Sea" },
  armament: { ...PB_SHIPS_AT_SEA.armament, group: "Ships at Sea" },
  crewQuantity: { ...PB_SHIPS_AT_SEA.crewQuantity, group: "Ships at Sea" },
  crewQuality: { ...PB_SHIPS_AT_SEA.crewQuality, group: "Ships at Sea" },
  shipName: { ...PB_SHIPS_AT_SEA.name, group: "Ships at Sea" },
  cargoMundane: { ...PB_CARGO.mundane, group: "Cargo" },
  cargoSpecial: { ...PB_CARGO.special, group: "Cargo" },
  cargoPlotTwist: { ...PB_CARGO.plotTwist, group: "Cargo" },
  ...group("Derelict Ship", PB_DERELICT_GEN.tables),
  buriedTreasure: { ...PB_BURIED_TREASURE, group: "Loot & Treasure" },
  ...group("Treasure Maps", PB_TREASURE_MAPS.tables),
  riddles: { ...PB_TREASURE_MAPS.riddles, group: "Treasure Maps" },
  ...group("Uncharted Islands", PB_ISLANDS.tables),
  pirateA: { ...PB_PIRATE_GEN.tableA, group: "Pirate Generator", note: PB_PIRATE_GEN.note },
  pirateB: { ...PB_PIRATE_GEN.tableB, group: "Pirate Generator", note: PB_PIRATE_GEN.note },
  pirateC: { ...PB_PIRATE_GEN.tableC, group: "Pirate Generator", note: PB_PIRATE_GEN.note },
  ...group("Jobs & Quests", PB_JOBS.tables),
  rumors: { ...PB_RUMORS, group: "Rumors" },
  ...group("The Curse of Skeleton Point", { ...PB_MODULE_SKELETON_POINT.tables, plotHooks: PB_MODULE_SKELETON_POINT.plotHooks, development: PB_MODULE_SKELETON_POINT.development }),
};
