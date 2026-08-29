// Builds the Nimble 2e data layer from one canonical source, like the ACE and
// KoB builders:
//
//   data/nimble/parts/{core,heroes,gmg}.json
//        │
//        ├─▶ lib/data/nimble-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/nimble-<name>.js  `const` global for the HTML sheet
//
// Arrays are concatenated in book order; the table slices are merged into one
// NIMBLE_TABLES object (quickRules concatenated). After editing anything under
// data/nimble/:  node scripts/build-nimble-data.mjs

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS_DIR = join(ROOT, "data", "nimble", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
const BOOK_ORDER = ["core", "heroes", "gmg"];

const ENTITIES = [
  { key: "skills",      constName: "NIMBLE_SKILLS",      type: "NimbleSkill",         base: "nimble-skills" },
  { key: "ancestries",  constName: "NIMBLE_ANCESTRIES",  type: "NimbleAncestry",      base: "nimble-ancestries" },
  { key: "backgrounds", constName: "NIMBLE_BACKGROUNDS", type: "NimbleBackground",    base: "nimble-backgrounds" },
  { key: "motivations", constName: "NIMBLE_MOTIVATIONS", type: "NimbleMotivation",    base: "nimble-motivations" },
  { key: "items",       constName: "NIMBLE_ITEMS",       type: "NimbleItem",          base: "nimble-items" },
  { key: "spells",      constName: "NIMBLE_SPELLS",      type: "NimbleSpell",         base: "nimble-spells" },
  { key: "conditions",  constName: "NIMBLE_CONDITIONS",  type: "NimbleCondition",     base: "nimble-conditions" },
  { key: "classes",     constName: "NIMBLE_CLASSES",     type: "NimbleClass",         base: "nimble-classes" },
  { key: "monsters",    constName: "NIMBLE_MONSTERS",    type: "NimbleMonster",       base: "nimble-monsters" },
  { key: "families",    constName: "NIMBLE_FAMILIES",    type: "NimbleMonsterFamily", base: "nimble-families" },
];
const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/nimble/parts/*.json - regenerate with: node scripts/build-nimble-data.mjs";

const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { throw new Error(`${p}: invalid JSON - ${e.message}`); } };
const emitTs = (base, type, constName, kind, value) =>
  writeFileSync(join(TS_DIR, base + ".ts"), `${BANNER}\n\nimport type { ${type} } from "./nimble-types";\n\nexport const ${constName}: ${kind === "array" ? type + "[]" : type} = ${JSON.stringify(value, null, 2)};\n`, "utf8");
const emitJs = (base, constName, value) =>
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\n`, "utf8");

const parts = new Map(readdirSync(PARTS_DIR).filter((f) => f.endsWith(".json")).map((f) => [f.replace(/\.json$/, ""), readJson(join(PARTS_DIR, f))]));
const keys = [...parts.keys()].sort((a, b) => BOOK_ORDER.indexOf(a) - BOOK_ORDER.indexOf(b));
const merged = Object.fromEntries(ENTITIES.map((e) => [e.key, []]));
const tables = { quickRules: [] };
const problems = [];

for (const key of keys) {
  if (!BOOK_ORDER.includes(key)) problems.push(`unknown part "${key}"`);
  const part = parts.get(key);
  for (const e of ENTITIES) {
    const rows = part[e.key] ?? [];
    if (!Array.isArray(rows)) throw new Error(`parts/${key}.json: "${e.key}" must be an array`);
    merged[e.key].push(...rows);
  }
  for (const [k, v] of Object.entries(part.tables ?? {})) {
    if (k === "quickRules") tables.quickRules.push(...v);
    else if (tables[k] !== undefined) problems.push(`tables.${k} defined by more than one book`);
    else tables[k] = v;
  }
}

// Sanity: unique names within an entity (spells may repeat a name across schools? no — keep strict), class tables complete.
for (const e of ENTITIES) {
  const seen = new Set();
  for (const row of merged[e.key]) {
    const id = `${row.family ?? row.category ?? row.school ?? ""}/${String(row.name).toLowerCase()}`;
    if (seen.has(id)) problems.push(`${e.key}: duplicate "${row.name}"`);
    seen.add(id);
  }
}
for (const c of merged.classes) {
  const levels = new Set(c.features.map((f) => f.level));
  for (let l = 1; l <= 20; l++) if (!levels.has(l)) problems.push(`classes: ${c.name} has no level ${l} feature`);
  if (!c.subclasses?.length) problems.push(`classes: ${c.name} has no subclasses`);
}
for (const k of ["statDescriptions", "difficulties", "statArrays", "languages", "creation", "sizes", "weaponProperties", "rests", "downtime", "lodging", "boons", "encounters"]) {
  if (tables[k] === undefined) problems.push(`tables.${k} missing`);
}
if (problems.length) { console.error("build-nimble-data: problems found\n  " + problems.join("\n  ")); process.exit(1); }

mkdirSync(TS_DIR, { recursive: true }); mkdirSync(JS_DIR, { recursive: true });
const summary = [];
for (const e of ENTITIES) { emitTs(e.base, e.type, e.constName, "array", merged[e.key]); emitJs(e.base, e.constName, merged[e.key]); summary.push(`${e.constName}=${merged[e.key].length}`); }
emitTs("nimble-tables", "NimbleTables", "NIMBLE_TABLES", "object", tables); emitJs("nimble-tables", "NIMBLE_TABLES", tables);
summary.push(`NIMBLE_TABLES=obj(quickRules=${tables.quickRules.length})`);
console.log(`build-nimble-data: merged ${keys.length} book(s) -> lib/data/ + public/tools-data/\n  ${summary.join(", ")}`);
