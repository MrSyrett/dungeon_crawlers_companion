// Builds the ICRPG (Index Card RPG, Master Edition) data layer from curated
// parts, like the SW / D62e builders:
//
//   data/icrpg/parts/*.json   (each a JSON object keyed by entity)
//        │
//        ├─▶ lib/data/icrpg-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/icrpg-<name>.js  `const` global (+ window) for the HTML tools
//
// Part files are concatenated by entity key; within an entity, duplicate rows
// (same identity) are dropped, first wins.
// After editing anything under data/icrpg/:  node scripts/build-icrpg-data.mjs

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS_DIR = join(ROOT, "data", "icrpg", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
mkdirSync(TS_DIR, { recursive: true });
mkdirSync(JS_DIR, { recursive: true });

const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: data/icrpg/parts/*.json - regenerate with: node scripts/build-icrpg-data.mjs";

// entity key → { const, base file name, TS type, identity fields for dedupe }
const ENTITIES = [
  { key: "worlds",      constName: "ICRPG_WORLDS",     base: "icrpg-worlds",     type: "IcrpgWorld",      id: ["key"] },
  { key: "coreStats",   constName: "ICRPG_STATS",      base: "icrpg-stats",      type: "IcrpgStat",       id: ["abbr"] },
  { key: "effortTypes", constName: "ICRPG_EFFORT",     base: "icrpg-effort",     type: "IcrpgEffortType", id: ["name"] },
  { key: "quickRules",  constName: "ICRPG_RULES",      base: "icrpg-rules",      type: "IcrpgRule",       id: ["title"] },
  { key: "lifeForms",   constName: "ICRPG_LIFEFORMS",  base: "icrpg-lifeforms",  type: "IcrpgLifeForm",   id: ["name", "world"] },
  { key: "types",       constName: "ICRPG_TYPES",      base: "icrpg-hero-types", type: "IcrpgType",       id: ["name", "world"] },
  { key: "abilities",   constName: "ICRPG_ABILITIES",  base: "icrpg-abilities",  type: "IcrpgAbility",     id: ["name", "world"] },
  { key: "loot",        constName: "ICRPG_LOOT",       base: "icrpg-loot",       type: "IcrpgLoot",       id: ["name", "table"] },
  { key: "gear",        constName: "ICRPG_GEAR",       base: "icrpg-gear",       type: "IcrpgGear",       id: ["name", "world"] },
  { key: "spells",      constName: "ICRPG_SPELLS",     base: "icrpg-spells",     type: "IcrpgSpell",      id: ["name", "school"] },
  { key: "monsters",    constName: "ICRPG_MONSTERS",   base: "icrpg-monsters",   type: "IcrpgMonster",    id: ["name", "world"] },
];

const readJson = (p) => {
  try { return JSON.parse(readFileSync(p, "utf8")); }
  catch (e) { throw new Error(`${p}: invalid JSON - ${e.message}`); }
};
const idOf = (row, fields) => fields.map((f) => String(row[f] ?? "").toLowerCase().trim()).join("|");

const parts = readdirSync(PARTS_DIR).filter((f) => f.endsWith(".json")).sort();
const merged = Object.fromEntries(ENTITIES.map((e) => [e.key, []]));
for (const f of parts) {
  const obj = readJson(join(PARTS_DIR, f));
  for (const e of ENTITIES) if (Array.isArray(obj[e.key])) merged[e.key].push(...obj[e.key]);
}

const emitTs = (base, type, constName, value) =>
  writeFileSync(
    join(TS_DIR, base + ".ts"),
    `${BANNER}\n\nimport type { ${type} } from "./icrpg-types";\n\nexport const ${constName}: ${type}[] = ${JSON.stringify(value, null, 2)};\n`,
    "utf8",
  );
const emitJs = (base, constName, value) =>
  writeFileSync(
    join(JS_DIR, base + ".js"),
    `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\nif (typeof window !== "undefined") window.${constName} = ${constName};\n`,
    "utf8",
  );

const summary = [];
for (const e of ENTITIES) {
  const seen = new Set();
  const rows = merged[e.key].filter((r) => { const k = idOf(r, e.id); if (seen.has(k)) return false; seen.add(k); return true; });
  emitTs(e.base, e.type, e.constName, rows);
  emitJs(e.base, e.constName, rows);
  summary.push(`${e.constName}: ${rows.length}${rows.length !== merged[e.key].length ? ` (−${merged[e.key].length - rows.length} dup)` : ""}`);
}
console.log("ICRPG data built:\n  " + summary.join("\n  "));
