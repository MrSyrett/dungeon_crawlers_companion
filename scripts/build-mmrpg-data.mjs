// Builds the Marvel Multiverse RPG (MMRPG, d616) data layer from curated parts:
//   data/mmrpg/parts/<entity>.json
//        ├─▶ lib/data/mmrpg-<entity>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/mmrpg-<entity>.js  `const` global for the HTML sheet
// After editing anything under data/mmrpg/parts:  node scripts/build-mmrpg-data.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS = join(ROOT, "data", "mmrpg", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/mmrpg/parts/*.json - regenerate with: node scripts/build-mmrpg-data.mjs";

const ENTITIES = [
  { key: "origins",     constName: "MMRPG_ORIGINS",     type: "MmrpgOrigin",     base: "mmrpg-origins" },
  { key: "occupations", constName: "MMRPG_OCCUPATIONS", type: "MmrpgOccupation", base: "mmrpg-occupations" },
  { key: "traits",      constName: "MMRPG_TRAITS",      type: "MmrpgTrait",      base: "mmrpg-traits" },
  { key: "tags",        constName: "MMRPG_TAGS",        type: "MmrpgTag",        base: "mmrpg-tags" },
  { key: "powers",      constName: "MMRPG_POWERS",      type: "MmrpgPower",      base: "mmrpg-powers" },
  { key: "characters",  constName: "MMRPG_CHARACTERS",  type: "MmrpgCharacter",  base: "mmrpg-characters" },
  { key: "equipment",   constName: "MMRPG_EQUIPMENT",   type: "MmrpgEquipment",  base: "mmrpg-equipment" },
];

const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { throw new Error(`${p}: ${e.message}`); } };
const emitTs = (base, type, constName, value) =>
  writeFileSync(join(TS_DIR, base + ".ts"), `${BANNER}\n\nimport type { ${type} } from "./mmrpg-types";\n\nexport const ${constName} = ${JSON.stringify(value, null, 2)} as unknown as ${type}[];\n`, "utf8");
const emitJs = (base, constName, value) =>
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\nif (typeof window !== 'undefined') { window.${constName} = ${constName}; }\n`, "utf8");

mkdirSync(TS_DIR, { recursive: true }); mkdirSync(JS_DIR, { recursive: true });
const summary = [];
for (const e of ENTITIES) {
  const p = join(PARTS, e.key + ".json");
  if (!existsSync(p)) { console.warn(`build-mmrpg-data: missing ${e.key}.json — skipping`); continue; }
  const rows = readJson(p);
  if (!Array.isArray(rows)) throw new Error(`${e.key}.json must be an array`);
  rows.sort((a, b) => String(a.name).localeCompare(String(b.name), "en"));
  emitTs(e.base, e.type, e.constName, rows);
  emitJs(e.base, e.constName, rows);
  summary.push(`${e.constName}=${rows.length}`);
}
console.log(`build-mmrpg-data: -> lib/data/ + public/tools-data/\n  ${summary.join(", ")}`);
