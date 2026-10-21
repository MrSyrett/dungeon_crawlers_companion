#!/usr/bin/env node
// Build the Pirate Borg data.
//   data/pb/parts/*.mjs  →  lib/data/pb-data.ts          (typed, for Next pages)
//                        →  public/tools-data/pb-data.js (window.PB_* globals, for
//                           the character sheet, session builder and GM Screen)
// Run: node scripts/build-pb-data.mjs   (npm run data:pb)
//
// Adds a stable `id` (slug of the name) to every record that lacks one, and checks that every
// cross-reference (starting weapons, gear rolls, background items, class weapons, summons) resolves.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const part = (n) => import(pathToFileURL(join(ROOT, "data", "pb", "parts", n + ".mjs")).href);

const mods = await Promise.all(["core", "classes", "gear", "backgrounds", "magic", "naval", "bestiary", "tables",
  "core-bestiary", "core-ships", "core-tables", "core-setting"].map(part));
const all = Object.assign({}, ...mods);

// Core Rules creatures and vessels join the existing lists (Trapped in the Tropics / Guidebook entries first).
all.PB_MONSTERS = [...all.PB_MONSTERS, ...all.PB_CORE_MONSTERS];
all.PB_SHIPS = [...all.PB_SHIPS, ...all.PB_CORE_SHIPS];
delete all.PB_CORE_MONSTERS;
delete all.PB_CORE_SHIPS;

const slug = (s) => String(s).toLowerCase().replace(/&/g, "and").replace(/['’"()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ID_LISTS = ["PB_CLASSES", "PB_WEAPONS", "PB_AMMO", "PB_BOMBS", "PB_CLOTHING", "PB_HATS", "PB_GEAR", "PB_CONTAINERS",
  "PB_BACKGROUNDS", "PB_RELICS", "PB_RITUALS", "PB_PRAYERS", "PB_DEITIES", "PB_SPELLS", "PB_SHANTIES", "PB_SPECIALTY_CREW",
  "PB_CREW_ACTIONS", "PB_MONSTERS", "PB_SHIPS", "PB_SHIP_TEMPLATES", "PB_CAPTAINS", "PB_FACTIONS"];
const withIds = (k, list) => {
  const seen = new Set();
  return list.map((r) => {
    const id = r.id || slug(r.name);
    if (seen.has(id)) throw new Error(`${k}: duplicate id ${id}`);
    seen.add(id);
    return { id, ...r };
  });
};
for (const k of ID_LISTS) all[k] = withIds(k, all[k]);
for (const k of ["PB_MONSTERS", "PB_SHIPS"]) all[k] = all[k].map((r) => ({ homebrew: false, ...r }));

// ---- cross-reference checks --------------------------------------------------------------
const ids = (k) => new Set(all[k].map((r) => r.id));
const weaponIds = ids("PB_WEAPONS"), gearIds = ids("PB_GEAR"), monsterIds = ids("PB_MONSTERS"), shipIds = ids("PB_SHIPS");
const TABLE_REFS = new Set(["pets", "instruments", "relics", "rituals", "startingWeapons", "bombs"]);
const missing = [];
const need = (set, id, where) => { if (!set.has(id)) missing.push(`${where}: ${id}`); };

for (const r of all.PB_STARTING_WEAPONS.rows) for (const id of r.choice || [r.weapon]) need(weaponIds, id, `starting weapon ${r.roll}`);
for (const [k, list] of [["cheap", all.PB_CHEAP_GEAR], ["fancy", all.PB_FANCY_GEAR]]) for (const r of list) {
  if (r.item) need(gearIds, r.item, `${k} gear ${r.roll}`);
  if (r.extra?.item) need(gearIds, r.extra.item, `${k} gear ${r.roll} extra`);
  if (r.table && !TABLE_REFS.has(r.table)) missing.push(`${k} gear ${r.roll}: table ${r.table}`);
}
for (const b of all.PB_BACKGROUNDS) for (const id of [...(b.gear || []), ...(b.gearChoice || [])]) need(new Set([...gearIds, ...weaponIds]), id, `background ${b.name}`);
for (const c of all.PB_CONTAINERS) if (c.id !== "dinghy") need(gearIds, c.id, `container ${c.name}`);
for (const c of [...all.PB_CLASSES, all.PB_LANDLUBBER]) {
  const w = c.weapon;
  if (w?.fixed) for (const id of w.fixed) need(weaponIds, id, `class ${c.id} weapon`);
  if (w?.choice) for (const o of w.choice) if (o.weapon) need(weaponIds, o.weapon, `class ${c.id} weapon`);
}
for (const s of all.PB_SPELLS) if (s.summon) need(monsterIds, s.summon, `spell ${s.name}`);
for (const r of all.PB_RITUALS) if (r.summon) need(monsterIds, r.summon, `ritual ${r.name}`);
for (const m of all.PB_MISHAPS) if (m.summon) need(monsterIds, m.summon, `mishap ${m.roll}`);
for (const r of all.PB_GM_TABLES.maritimeEvents.rows) {
  if (r.monster) need(monsterIds, r.monster, `maritime event ${r.roll}`);
  if (r.ship) need(shipIds, r.ship, `maritime event ${r.roll}`);
}
for (const g of all.PB_GEAR) if (g.ship) need(shipIds, g.ship, `gear ${g.name}`);

// Core Rules cross-references: every monster / ship / table hint in every GM table, the module, captains,
// ship templates, marrow cannons and the enemy builder must resolve.
const tableIds = new Set([...Object.keys(all.PB_GM_TABLES), ...TABLE_REFS,
  // generator aliases (whole generators rather than a single table)
  "things", "treasureMaps", "darkFaunaTerrestrial", "cargo", "derelictShip", "islands", "pirateGenerator"]);
const templateIds = ids("PB_SHIP_TEMPLATES");
const shipOrTemplate = new Set([...shipIds, ...templateIds]);
const walkRows = (rows, where) => {
  for (const r of rows || []) {
    if (r.monster) need(monsterIds, r.monster, `${where} ${r.roll}`);
    if (r.ship) need(shipOrTemplate, r.ship, `${where} ${r.roll}`);
    for (const sh of r.ships || []) need(shipOrTemplate, sh, `${where} ${r.roll}`);
    if (r.table) need(tableIds, r.table, `${where} ${r.roll} table`);
    if (r.sub) walkRows(r.sub.rows, `${where} ${r.roll} sub`);
  }
};
for (const [k, t] of Object.entries(all.PB_GM_TABLES)) walkRows(t.rows, `PB_GM_TABLES.${k}`);
for (const m of all.PB_MONSTERS) for (const tk of ["attackTable", "lootTable", "omenTable", "effectTable"]) if (m[tk]) walkRows(m[tk].rows, `${m.id}.${tk}`);
const SP = all.PB_MODULE_SKELETON_POINT;
for (const n of SP.npcs) if (n.monster) need(monsterIds, n.monster, `module npc ${n.id}`);
for (const t of Object.values(SP.tables)) walkRows(t.rows, `module ${t.id}`);
const relicIds = ids("PB_RELICS"), ritualIds = ids("PB_RITUALS");
for (const r of SP.shop.relics) need(relicIds, r.relic, "Tela's relics");
for (const r of SP.shop.rituals) if (r.ritual) need(ritualIds, r.ritual, "Tela's rituals");
for (const c of all.PB_CAPTAINS) {
  for (const id of [c.captain, ...c.officers, ...c.crew]) need(monsterIds, id, `captain ${c.id}`);
  need(templateIds, c.ships, `captain ${c.id} ships`);
  for (const v of c.vessels) need(shipIds, v, `captain ${c.id} vessels`);
}
for (const t of all.PB_SHIP_TEMPLATES) {
  for (const v of t.baseShips || []) need(shipIds, v, `template ${t.id}`);
  if (t.template) need(templateIds, t.template, `template ${t.id}`);
  for (const tr of t.traits) {
    for (const m of tr.monsters || []) need(monsterIds, typeof m === "string" ? m : m.id, `template ${t.id}`);
    if (tr.summon) walkRows(tr.summon.rows, `template ${t.id} summon`);
  }
}
for (const id of all.PB_MARROW_CANNONS.monsters) need(monsterIds, id, "marrow cannons");
for (const v of Object.values(all.PB_ENEMY_BUILDER.variants)) for (const id of v.ids || []) need(monsterIds, id, "enemy builder variant");
if (missing.length) throw new Error("Unresolved references: " + missing.join("; "));

// ---- table completeness ------------------------------------------------------------------
const span = (rows) => rows.reduce((n, r) => n + (Array.isArray(r.roll) ? r.roll[1] - r.roll[0] + 1 : 1), 0);
const expect = { PB_BACKGROUNDS: 100, PB_THINGS: 100, PB_FLAWS: 20, PB_TRADEMARKS: 20, PB_IDIOSYNCRASIES: 20, PB_INCIDENTS: 20,
  PB_RELICS: 20, PB_RITUALS: 20, PB_MISHAPS: 20, PB_CLOTHING: 10, PB_HATS: 12, PB_CHEAP_GEAR: 12, PB_FANCY_GEAR: 12,
  PB_PETS: 10, PB_INSTRUMENTS: 10, PB_CONTAINERS: 6, PB_BOMBS: 6, PB_PRAYERS: 10, PB_DEITIES: 8, PB_SPELLS: 6, PB_SHANTIES: 12,
  PB_DERELICT: 8, PB_CHANGING_WINDS: 11, PB_FOUL_WEATHER: 11, PB_NAMES: 36 };
for (const [k, n] of Object.entries(expect)) if (span(all[k]) !== n) throw new Error(`${k}: covers ${span(all[k])} results, expected ${n}`);
if (span(all.PB_STARTING_WEAPONS.rows) !== 10) throw new Error("PB_STARTING_WEAPONS: expected d10");
for (const t of Object.values(all.PB_GM_TABLES)) if (!t.rows && !t.columns) throw new Error(`PB_GM_TABLES.${t.id}: no rows/columns`);
// Core Rules generator tables: rows must cover the die exactly (dN → 1..N, 2d6 → 2..12, 3d6 → 3..18, d100 → 1..100, d66 → 36).
const dieSpan = (die) => {
  if (die === "d66") return 36;
  const m = /^(\d*)d(\d+)$/.exec(die); if (!m) return null;
  const n = +(m[1] || 1), f = +m[2]; return n * f - n + 1;
};
for (const t of Object.values(all.PB_GM_TABLES)) {
  if (t.source !== "Core Rules" && t.source !== "The Curse of Skeleton Point") continue;
  const want = dieSpan(t.die);
  if (t.rows && want != null && span(t.rows) !== want) throw new Error(`PB_GM_TABLES.${t.id}: covers ${span(t.rows)} results, expected ${want} (${t.die})`);
  for (const c of t.columns || []) if (dieSpan(c.die) != null && c.values.length !== dieSpan(c.die)) throw new Error(`PB_GM_TABLES.${t.id}.${c.name}: ${c.values.length} values`);
}
for (const c of all.PB_GM_TABLES.carousing.columns) if (c.values.length !== 20) throw new Error("carousing column " + c.name);

// Expose spells/prayers/deities ids back into the class tables so class rows and the flat lists share ids.
const byName = (k) => new Map(all[k].map((r) => [r.name, r]));
for (const c of all.PB_CLASSES) for (const t of c.tables) {
  const src = t.id === "spells" ? byName("PB_SPELLS") : t.id === "prayers" ? byName("PB_PRAYERS") : t.id === "deity" ? byName("PB_DEITIES") : null;
  t.rows = t.rows.map((r) => ({ id: r.id || (src && src.get(r.name)?.id) || slug(r.name), ...r }));
}

const TYPES = {
  PB_ABILITIES: "PbAbility[]", PB_ABILITY_TABLE: "PbAbilityRow[]", PB_DR: "PbDrLabel[]", PB_RULES: "PbRules",
  PB_CLASSES: "PbClass[]", PB_LANDLUBBER: "PbClass", PB_JOKER_TABLE: "PbTable", PB_CARD_DECK: "PbCardDeck",
  PB_PRAYERS: "PbPrayer[]", PB_DEITIES: "PbDeity[]", PB_SPELLS: "PbSpell[]",
  PB_WEAPONS: "PbWeapon[]", PB_STARTING_WEAPONS: "PbTable", PB_AMMO: "PbAmmo[]", PB_BOMBS: "PbBomb[]", PB_BOMB_RULES: "PbBombRules",
  PB_CLOTHING: "PbClothing[]", PB_CLOTHING_RULES: "PbRuleNote", PB_HATS: "PbHat[]", PB_GEAR: "PbGear[]", PB_CONTAINERS: "PbContainer[]",
  PB_CHEAP_GEAR: "PbGearRoll[]", PB_FANCY_GEAR: "PbGearRoll[]", PB_PETS: "PbNamedRoll[]", PB_INSTRUMENTS: "PbNamedRoll[]",
  PB_HOSPITALITY: "PbPrice[]", PB_ARMOR_REPAIR: "PbArmorRepair",
  PB_BACKGROUNDS: "PbBackground[]", PB_FLAWS: "PbRollEntry[]", PB_TRADEMARKS: "PbRollEntry[]", PB_IDIOSYNCRASIES: "PbRollEntry[]",
  PB_INCIDENTS: "PbRollEntry[]", PB_THINGS: "PbRollEntry[]", PB_NAMES: "PbNameRow[]",
  PB_RELICS: "PbRelic[]", PB_RITUALS: "PbRitual[]", PB_MISHAPS: "PbMishap[]",
  PB_SHIP_STATS: "PbShipStat[]", PB_CREW_ACTIONS: "PbCrewAction[]", PB_NAVAL_RULES: "PbNavalRules", PB_DERELICT: "PbRollEntry[]",
  PB_SPECIALTY_CREW: "PbSpecialtyCrew[]", PB_CREW_MODS: "PbCrewMod[]", PB_SHANTY_RULES: "PbShantyRules", PB_SHANTIES: "PbShanty[]",
  PB_WIND: "PbWind", PB_POINT_OF_SAIL: "PbPointOfSail[]", PB_CHANGING_WINDS: "PbRollEntry[]", PB_FOUL_WEATHER: "PbRollEntry[]",
  PB_SHIPWRIGHT: "PbShipwright", PB_TRAVEL: "PbTravel",
  PB_MONSTERS: "PbMonster[]", PB_SHIPS: "PbShip[]", PB_GM_TABLES: "Record<string, PbTable>",
  // Core Rules
  PB_ASH: "PbAsh", PB_ALCHEMY: "PbAlchemy", PB_ALCHEMY_TABLE: "PbTable", PB_TRAVEL_EVENTS: "PbTravelEvents", PB_SHIPS_AT_SEA: "PbShipsAtSea",
  PB_CARGO: "PbCargo", PB_DERELICT_GEN: "PbGenerator", PB_BURIED_TREASURE: "PbTable", PB_TREASURE_MAPS: "PbTreasureMaps",
  PB_ISLANDS: "PbGenerator", PB_PIRATE_GEN: "PbPirateGen", PB_JOBS: "PbGenerator", PB_RUMORS: "PbTable",
  PB_CAROUSING: "PbTable", PB_NAMES_D12: "PbTable", PB_NPC_MOTIVATION: "PbTable", PB_LOOT_THE_BODY: "PbTable",
  PB_SETTING: "PbSetting", PB_FACTIONS: "PbFaction[]", PB_HISTORY: "PbTable", PB_CAPTAINS: "PbCaptain[]",
  PB_SHIP_TEMPLATES: "PbShipTemplate[]", PB_MARROW_CANNONS: "PbMarrowCannons", PB_ENEMY_BUILDER: "PbEnemyBuilder",
  PB_MODULE_SKELETON_POINT: "PbModule",
};

const names = Object.keys(all).filter((k) => k.startsWith("PB_")).sort();
const untyped = names.filter((k) => !TYPES[k]);
if (untyped.length) throw new Error("No type declared for: " + untyped.join(", "));

const header = "// GENERATED FILE - do not edit by hand.\n// Source: data/pb/parts/*.mjs - regenerate with: node scripts/build-pb-data.mjs\n// Pirate Borg (Limithron). Mechanics and table values are game facts;\n// descriptive text is original paraphrase written for this app.\n";
const typeNames = [...new Set(Object.values(TYPES).map((t) => t.replace("[]", "").replace(/^Record<string, (\w+)>$/, "$1")))].sort();

let ts = header + `import type { ${typeNames.join(", ")} } from "./pb-types";\n\n`;
let js = header + "(function(){\n";
for (const k of names) {
  const json = JSON.stringify(all[k], null, 1);
  ts += `export const ${k}: ${TYPES[k]} = ${json};\n\n`;
  js += `var ${k} = ${json};\nwindow.${k} = ${k};\n`;
}
js += "})();\n";

writeFileSync(join(ROOT, "lib", "data", "pb-data.ts"), ts);
writeFileSync(join(ROOT, "public", "tools-data", "pb-data.js"), js);
console.log(`pb: ${names.length} exports → lib/data/pb-data.ts, public/tools-data/pb-data.js`);
for (const k of names) {
  const v = all[k];
  const n = Array.isArray(v) ? v.length : v && typeof v === "object" ? (v.rows ? `${v.rows.length} rows` : `${Object.keys(v).length} keys`) : "";
  console.log(`  ${k}: ${n}`);
}
