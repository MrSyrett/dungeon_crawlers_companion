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

const mods = await Promise.all(["core", "classes", "gear", "backgrounds", "magic", "naval", "bestiary", "tables"].map(part));
const all = Object.assign({}, ...mods);

const slug = (s) => String(s).toLowerCase().replace(/&/g, "and").replace(/['’"()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ID_LISTS = ["PB_CLASSES", "PB_WEAPONS", "PB_AMMO", "PB_BOMBS", "PB_CLOTHING", "PB_HATS", "PB_GEAR", "PB_CONTAINERS",
  "PB_BACKGROUNDS", "PB_RELICS", "PB_RITUALS", "PB_PRAYERS", "PB_DEITIES", "PB_SPELLS", "PB_SHANTIES", "PB_SPECIALTY_CREW",
  "PB_CREW_ACTIONS", "PB_MONSTERS", "PB_SHIPS"];
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
