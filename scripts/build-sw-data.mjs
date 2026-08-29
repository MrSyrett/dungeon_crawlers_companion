// Builds the Star Wars (WEG 1e + Rules Companion) data layer from one
// canonical source, like the ACE / KoB / Nimble builders:
//
//   data/sw/parts/{core,core-content,companion}.json
//        │
//        ├─▶ lib/data/sw-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/sw-<name>.js  `const` global for the HTML sheet
//
// The Companion is applied as a revision layer: a skill, Force power, item,
// vehicle or character with the same name as a core entry REPLACES it (the
// core version is kept under `superseded` so the reference pages can show
// what changed); table keys the Companion defines replace the core table, and
// the core table moves to tables.superseded. quickRules are concatenated.
// After editing anything under data/sw/:  node scripts/build-sw-data.mjs

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS_DIR = join(ROOT, "data", "sw", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
const BOOK_ORDER = ["core", "core-content", "companion"];
const ATTRS = ["Dexterity", "Knowledge", "Mechanical", "Perception", "Strength", "Technical"];

const ENTITIES = [
  { key: "skills",     constName: "SW_SKILLS",     type: "SwSkill",      base: "sw-skills" },
  { key: "templates",  constName: "SW_TEMPLATES",  type: "SwTemplate",   base: "sw-templates" },
  { key: "weapons",    constName: "SW_WEAPONS",    type: "SwWeapon",     base: "sw-weapons" },
  { key: "gear",       constName: "SW_GEAR",       type: "SwGear",       base: "sw-gear" },
  { key: "vehicles",   constName: "SW_VEHICLES",   type: "SwVehicle",    base: "sw-vehicles" },
  { key: "characters", constName: "SW_CHARACTERS", type: "SwCharacter",  base: "sw-characters" },
  { key: "force",      constName: "SW_FORCE",      type: "SwForcePower", base: "sw-force" },
];
const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/sw/parts/*.json - regenerate with: node scripts/build-sw-data.mjs";

const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { throw new Error(`${p}: invalid JSON - ${e.message}`); } };
const emitTs = (base, type, constName, kind, value) =>
  writeFileSync(join(TS_DIR, base + ".ts"), `${BANNER}\n\nimport type { ${type} } from "./sw-types";\n\nexport const ${constName}: ${kind === "array" ? type + "[]" : type} = ${JSON.stringify(value, null, 2)};\n`, "utf8");
const emitJs = (base, constName, value) =>
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\n`, "utf8");
const norm = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();

const parts = new Map(readdirSync(PARTS_DIR).filter((f) => f.endsWith(".json")).map((f) => [f.replace(/\.json$/, ""), readJson(join(PARTS_DIR, f))]));
const keys = [...parts.keys()].sort((a, b) => BOOK_ORDER.indexOf(a) - BOOK_ORDER.indexOf(b));
const merged = Object.fromEntries(ENTITIES.map((e) => [e.key, []]));
const tables = { quickRules: [], superseded: {} };
const problems = [];
let replaced = 0;

for (const key of keys) {
  if (!BOOK_ORDER.includes(key)) problems.push(`unknown part "${key}"`);
  const part = parts.get(key);
  for (const e of ENTITIES) {
    const rows = part[e.key] ?? [];
    if (!Array.isArray(rows)) throw new Error(`parts/${key}.json: "${e.key}" must be an array`);
    for (const row of rows) {
      const i = merged[e.key].findIndex((r) => norm(r.name) === norm(row.name));
      if (i >= 0 && row.book === "companion" && merged[e.key][i].book === "core") {
        // Companion revision replaces the core entry in place (keeps order).
        merged[e.key][i] = { ...row, superseded: merged[e.key][i] };
        replaced++;
      } else if (i >= 0) {
        problems.push(`${e.key}: duplicate "${row.name}" in ${key}`);
      } else {
        merged[e.key].push(row);
      }
    }
  }
  for (const [k, v] of Object.entries(part.tables ?? {})) {
    if (k === "quickRules") tables.quickRules.push(...v);
    else if (tables[k] !== undefined && key === "companion") { tables.superseded[k] = tables[k]; tables[k] = v; replaced++; }
    else if (tables[k] !== undefined) problems.push(`tables.${k} defined by more than one core part`);
    else tables[k] = v;
  }
}

// Sanity checks.
for (const t of merged.templates) {
  for (const a of ATTRS) if (!Number.isInteger(t.attributes?.[a])) problems.push(`templates: ${t.name} missing ${a}`);
}
for (const s of merged.skills) if (!ATTRS.includes(s.attribute)) problems.push(`skills: ${s.name} has attribute "${s.attribute}"`);
for (const w of merged.weapons) if (w.damage !== null && !Number.isInteger(w.damage)) problems.push(`weapons: ${w.name} damage must be pips or null`);
for (const k of ["attributes", "difficulties", "woundLevels", "damageResults", "ranges", "combatModifiers", "creation", "advancement", "force", "starship"]) {
  if (tables[k] === undefined) problems.push(`tables.${k} missing`);
}
if (problems.length) { console.error("build-sw-data: problems found\n  " + problems.join("\n  ")); process.exit(1); }

mkdirSync(TS_DIR, { recursive: true }); mkdirSync(JS_DIR, { recursive: true });
const summary = [];
for (const e of ENTITIES) { emitTs(e.base, e.type, e.constName, "array", merged[e.key]); emitJs(e.base, e.constName, merged[e.key]); summary.push(`${e.constName}=${merged[e.key].length}`); }
emitTs("sw-tables", "SwTables", "SW_TABLES", "object", tables); emitJs("sw-tables", "SW_TABLES", tables);
summary.push(`SW_TABLES=obj(quickRules=${tables.quickRules.length}, superseded=${Object.keys(tables.superseded).join("/") || "none"})`);
console.log(`build-sw-data: merged ${keys.length} part(s), ${replaced} companion revision(s) -> lib/data/ + public/tools-data/\n  ${summary.join(", ")}`);
