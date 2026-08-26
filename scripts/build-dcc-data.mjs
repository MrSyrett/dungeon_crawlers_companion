// Builds the Dungeon Crawler Carl data layer from one canonical source.
//
// Unlike scripts/extract-game-data.mjs (which reverse-extracts Shadowdark data
// OUT of the HTML tools), DCC's source of truth is hand-curated JSON under
// data/dcc/ — because the content comes from the rulebooks, not an existing
// tool. This script fans that one source out to the two consumers:
//
//   data/dcc/<name>.json
//        │
//        ├─▶ lib/data/dcc-<name>.ts        typed `export const` for Next pages
//        └─▶ public/tools-data/dcc-<name>.js   `const` global for the HTML tools
//
// The generated files are committed so `next dev` needs no build step. After
// editing any data/dcc/*.json (or the DATASETS manifest), re-run:
//   node scripts/build-dcc-data.mjs
//
// Types live in lib/data/dcc-types.ts (hand-authored). The generated .ts
// modules import their type from there; the .js globals carry no types.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "data", "dcc");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");

// One row per dataset. `kind: "array"` emits `const NAME: Type[] = [...]`;
// `kind: "object"` emits `const NAME: Type = {...}` (used for the ladder tables).
const DATASETS = [
  { json: "tables.json",      kind: "object", constName: "DCC_TABLES",      type: "DccTables",     base: "dcc-tables" },
  { json: "debuffs.json",     kind: "array",  constName: "DCC_DEBUFFS",     type: "DccDebuff",     base: "dcc-debuffs" },
  { json: "spells.json",      kind: "array",  constName: "DCC_SPELLS",      type: "DccSpell",      base: "dcc-spells" },
  { json: "skills.json",      kind: "array",  constName: "DCC_SKILLS",      type: "DccSkill",      base: "dcc-skills" },
  { json: "races.json",       kind: "array",  constName: "DCC_RACES",       type: "DccRace",       base: "dcc-races" },
  { json: "classes.json",     kind: "array",  constName: "DCC_CLASSES",     type: "DccClass",      base: "dcc-classes" },
  { json: "deities.json",     kind: "array",  constName: "DCC_DEITIES",     type: "DccDeity",      base: "dcc-deities" },
  { json: "backgrounds.json", kind: "array",  constName: "DCC_BACKGROUNDS", type: "DccBackground", base: "dcc-backgrounds" },
  { json: "experiences.json", kind: "array",  constName: "DCC_EXPERIENCES", type: "DccExperience", base: "dcc-experiences" },
  { json: "monsters.json",    kind: "array",  constName: "DCC_MONSTERS",    type: "DccMonster",    base: "dcc-monsters" },
];

const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: data/dcc/{json} - regenerate with: node scripts/build-dcc-data.mjs";

function readJson(path) {
  const raw = readFileSync(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`${path}: invalid JSON - ${e.message}`);
  }
}

function emitTs(base, json, type, constName, kind, value) {
  const decl = kind === "array" ? `${type}[]` : type;
  const body =
    `${BANNER.replace("{json}", json)}\n\n` +
    `import type { ${type} } from "./dcc-types";\n\n` +
    `export const ${constName}: ${decl} = ${JSON.stringify(value, null, 2)};\n`;
  writeFileSync(join(TS_DIR, base + ".ts"), body, "utf8");
}

function emitJs(base, json, constName, value) {
  // Classic <script src> file: a top-level `const` is visible to the tool's
  // other inline scripts on the page (global lexical binding), matching how the
  // SD tools consume public/tools-data/sd-*.js.
  const body =
    `${BANNER.replace("{json}", json)}\n\n` +
    `const ${constName} = ${JSON.stringify(value, null, 2)};\n`;
  writeFileSync(join(JS_DIR, base + ".js"), body, "utf8");
}

mkdirSync(TS_DIR, { recursive: true });
mkdirSync(JS_DIR, { recursive: true });

const summary = [];
const missing = [];

for (const d of DATASETS) {
  const path = join(SRC_DIR, d.json);
  if (!existsSync(path)) {
    missing.push(d.json);
    continue;
  }
  const value = readJson(path);
  if (d.kind === "array" && !Array.isArray(value)) {
    throw new Error(`${d.json}: expected a JSON array for ${d.constName}`);
  }
  if (d.kind === "object" && (Array.isArray(value) || typeof value !== "object" || value === null)) {
    throw new Error(`${d.json}: expected a JSON object for ${d.constName}`);
  }
  emitTs(d.base, d.json, d.type, d.constName, d.kind, value);
  emitJs(d.base, d.json, d.constName, value);
  const count = Array.isArray(value) ? `${value.length}` : "obj";
  summary.push(`${d.constName}=${count}`);
}

console.log(`build-dcc-data: wrote ${summary.length} dataset(s) -> lib/data/ + public/tools-data/`);
console.log("  " + summary.join(", "));
if (missing.length) {
  console.log(`  (not yet authored, skipped: ${missing.join(", ")})`);
}
