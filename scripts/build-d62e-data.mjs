// Builds the D6 System: Second Edition (D62e) data layer from one canonical
// source, like the SW / ACE / Nimble builders:
//
//   data/d62e/parts/*.json
//        │
//        ├─▶ lib/data/d62e-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/d62e-<name>.js  `const` global for the HTML sheet
//
// D62e is ONE book with a genre-agnostic core plus genre modules (Fantasy,
// Sci-Fi, Superheroes). There is no book layering: every part contributes rows
// to the shared entity arrays, each row already tagged with a `genre`. Rows are
// concatenated (core first, then fantasy/scifi/superhero); a duplicate name
// WITHIN the same genre is flagged. The `tables` object comes from one part.
// After editing anything under data/d62e/:  node scripts/build-d62e-data.mjs

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS_DIR = join(ROOT, "data", "d62e", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
const GENRE_RANK = { core: 0, fantasy: 1, scifi: 2, superhero: 3 };

const ENTITIES = [
  { key: "attributes", constName: "D62E_ATTRIBUTE_INFO", type: "D62eAttributeInfo", base: "d62e-attributes" },
  { key: "skills",     constName: "D62E_SKILLS",         type: "D62eSkill",         base: "d62e-skills" },
  { key: "templates",  constName: "D62E_TEMPLATES",      type: "D62eTemplate",      base: "d62e-templates" },
  { key: "equipment",  constName: "D62E_EQUIPMENT",      type: "D62eEquipment",     base: "d62e-equipment" },
  { key: "creatures",  constName: "D62E_CREATURES",      type: "D62eCreature",      base: "d62e-creatures" },
  { key: "perks",      constName: "D62E_PERKS",          type: "D62ePerk",          base: "d62e-perks" },
  { key: "powers",     constName: "D62E_POWERS",         type: "D62ePower",         base: "d62e-powers" },
  { key: "vehicles",   constName: "D62E_VEHICLES",       type: "D62eVehicle",       base: "d62e-vehicles" },
  { key: "modules",    constName: "D62E_MODULES",        type: "D62eModule",        base: "d62e-modules" },
];
const GENRES = ["core", "fantasy", "scifi", "superhero"];
const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/d62e/parts/*.json - regenerate with: node scripts/build-d62e-data.mjs";

const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { throw new Error(`${p}: invalid JSON - ${e.message}`); } };
// Generated data is the source of truth for its own shape; we assert the type
// rather than assign it so faithful extra fields from curation don't trip the
// compiler's excess-property check. Consumers still see the typed interface.
const emitTs = (base, type, constName, kind, value) =>
  writeFileSync(join(TS_DIR, base + ".ts"), `${BANNER}\n\nimport type { ${type} } from "./d62e-types";\n\nexport const ${constName} = ${JSON.stringify(value, null, 2)} as unknown as ${kind === "array" ? type + "[]" : type};\n`, "utf8");
const emitJs = (base, constName, value) =>
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\n`, "utf8");
const norm = (s) => String(s ?? "").toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();

const files = readdirSync(PARTS_DIR).filter((f) => f.endsWith(".json"));
if (!files.length) { console.error("build-d62e-data: no part files in data/d62e/parts/"); process.exit(1); }
const parts = files.map((f) => ({ name: f.replace(/\.json$/, ""), data: readJson(join(PARTS_DIR, f)) }));

const merged = Object.fromEntries(ENTITIES.map((e) => [e.key, []]));
let tables = null;
let tablesFrom = null;
const problems = [];

for (const { name, data } of parts) {
  for (const e of ENTITIES) {
    const rows = data[e.key] ?? [];
    if (!Array.isArray(rows)) { problems.push(`parts/${name}.json: "${e.key}" must be an array`); continue; }
    for (const row of rows) {
      if (row.genre && !GENRES.includes(row.genre)) problems.push(`${e.key}: "${row.name}" has unknown genre "${row.genre}" (${name})`);
      merged[e.key].push(row);
    }
  }
  if (data.tables) {
    if (tables) problems.push(`tables defined by more than one part (${tablesFrom} and ${name})`);
    else { tables = data.tables; tablesFrom = name; }
  }
}

// Sort each entity core → fantasy → scifi → superhero, then by name (stable, keeps genre grouping).
for (const e of ENTITIES) {
  merged[e.key].sort((a, b) => (GENRE_RANK[a.genre] ?? 9) - (GENRE_RANK[b.genre] ?? 9) || String(a.name).localeCompare(String(b.name), "en"));
  // Flag same-genre duplicate names.
  const seen = new Set();
  for (const r of merged[e.key]) {
    const k = `${r.genre}|${norm(r.name)}`;
    if (seen.has(k)) problems.push(`${e.key}: duplicate "${r.name}" in genre ${r.genre}`);
    seen.add(k);
  }
}

if (!tables) problems.push("no part provided a `tables` object");
else for (const k of ["difficulties", "woundLevels", "damageResults", "combatModifiers", "creation", "heroPoints", "quickRules"]) {
  if (tables[k] === undefined) problems.push(`tables.${k} missing`);
}

if (problems.length) { console.error("build-d62e-data: problems found\n  " + problems.join("\n  ")); process.exit(1); }

mkdirSync(TS_DIR, { recursive: true }); mkdirSync(JS_DIR, { recursive: true });
const summary = [];
for (const e of ENTITIES) { emitTs(e.base, e.type, e.constName, "array", merged[e.key]); emitJs(e.base, e.constName, merged[e.key]); summary.push(`${e.constName}=${merged[e.key].length}`); }
emitTs("d62e-tables", "D62eTables", "D62E_TABLES", "object", tables); emitJs("d62e-tables", "D62E_TABLES", tables);
summary.push(`D62E_TABLES=obj(quickRules=${tables.quickRules.length})`);
console.log(`build-d62e-data: merged ${parts.length} part(s) -> lib/data/ + public/tools-data/\n  ${summary.join(", ")}`);
