// Builds the D&D 2024 data layer from canonical JSON, like the other systems:
//
//   data/dnd/parts/*.json
//        │
//        ├─▶ lib/data/dnd-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/dnd-<name>.js  `const` global for the HTML sheet
//
// Each part file is an object whose keys are entity names; arrays are
// concatenated across parts (so classes can live in one file, spells split
// across several). `tables` is a single merged object. After editing anything
// under data/dnd/:  node scripts/build-dnd-data.mjs
//
// Mechanics are game facts; descriptive text is original wording or SRD 5.2
// (CC-BY-4.0) — see data/dnd/LICENSE.md.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS_DIR = join(ROOT, "data", "dnd", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");

// entity key → generated const name, TS element type, output basename.
const ENTITIES = [
  { key: "skills",     constName: "DND_SKILLS",      type: "DndSkillInfo",  base: "dnd-skills" },
  { key: "classes",    constName: "DND_CLASSES",     type: "DndClass",      base: "dnd-classes" },
  { key: "species",    constName: "DND_SPECIES",     type: "DndSpecies",    base: "dnd-species" },
  { key: "backgrounds",constName: "DND_BACKGROUNDS", type: "DndBackground", base: "dnd-backgrounds" },
  { key: "feats",      constName: "DND_FEATS",       type: "DndFeat",       base: "dnd-feats" },
  { key: "spells",     constName: "DND_SPELLS",      type: "DndSpell",      base: "dnd-spells" },
  { key: "weapons",    constName: "DND_WEAPONS",     type: "DndWeapon",     base: "dnd-weapons" },
  { key: "armor",      constName: "DND_ARMOR",       type: "DndArmor",      base: "dnd-armor" },
  { key: "gear",       constName: "DND_GEAR",        type: "DndGear",       base: "dnd-gear" },
  { key: "magicItems", constName: "DND_MAGIC_ITEMS", type: "DndMagicItem",  base: "dnd-magic-items" },
  { key: "monsters",   constName: "DND_MONSTERS",    type: "DndMonster",    base: "dnd-monsters" },
  { key: "conditions", constName: "DND_CONDITIONS",  type: "DndCondition",  base: "dnd-conditions" },
  { key: "rules",      constName: "DND_RULES",       type: "DndRule",       base: "dnd-rules" },
];
const TABLES = { constName: "DND_TABLES", type: "DndTables", base: "dnd-tables" };

const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: data/dnd/parts/*.json - regenerate with: node scripts/build-dnd-data.mjs";

const readJson = (p) => {
  try { return JSON.parse(readFileSync(p, "utf8")); }
  catch (e) { throw new Error(`${p}: invalid JSON - ${e.message}`); }
};

function loadParts() {
  if (!existsSync(PARTS_DIR)) return [];
  return readdirSync(PARTS_DIR).filter((f) => f.endsWith(".json")).sort().map((f) => readJson(join(PARTS_DIR, f)));
}

function main() {
  mkdirSync(TS_DIR, { recursive: true });
  mkdirSync(JS_DIR, { recursive: true });
  const parts = loadParts();

  // Concatenate each array entity across every part file.
  const collected = {};
  for (const { key } of ENTITIES) collected[key] = [];
  let tables = null;
  for (const part of parts) {
    for (const { key } of ENTITIES) {
      if (Array.isArray(part[key])) collected[key].push(...part[key]);
    }
    if (part.tables) tables = { ...(tables || {}), ...part.tables };
  }

  const written = [];
  for (const { key, constName, type, base } of ENTITIES) {
    const rows = collected[key];
    const json = JSON.stringify(rows, null, 2);
    writeFileSync(join(TS_DIR, `${base}.ts`),
      `${BANNER}\nimport type { ${type} } from "./dnd-types";\n\nexport const ${constName}: ${type}[] = ${json};\n`);
    writeFileSync(join(JS_DIR, `${base}.js`),
      `${BANNER}\nconst ${constName} = ${json};\nif (typeof window !== "undefined") window.${constName} = ${constName};\n`);
    written.push(`${base} (${rows.length})`);
  }

  // The tables object (standard array, point-buy, XP thresholds, …).
  const tjson = JSON.stringify(tables || {}, null, 2);
  writeFileSync(join(TS_DIR, `${TABLES.base}.ts`),
    `${BANNER}\nimport type { ${TABLES.type} } from "./dnd-types";\n\nexport const ${TABLES.constName} = ${tjson} as unknown as ${TABLES.type};\n`);
  writeFileSync(join(JS_DIR, `${TABLES.base}.js`),
    `${BANNER}\nconst ${TABLES.constName} = ${tjson};\nif (typeof window !== "undefined") window.${TABLES.constName} = ${TABLES.constName};\n`);
  written.push(`${TABLES.base}`);

  console.log("D&D data built:\n  " + written.join("\n  "));
}

main();
