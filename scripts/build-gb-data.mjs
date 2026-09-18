// Builds the Ghostbusters International (GB, proto-D6) data layer from curated
// parts:
//   data/gb/parts/<entity>.json
//        ├─▶ lib/data/gb-<entity>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/gb-<entity>.js  `const` global for the HTML sheet
// After editing anything under data/gb/parts:  node scripts/build-gb-data.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS = join(ROOT, "data", "gb", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/gb/parts/*.json - regenerate with: node scripts/build-gb-data.mjs";

// keepOrder: entities with an inherent order (difficulty ladder, rules) keep
// file order; the rest sort by name for stable output.
const ENTITIES = [
  { key: "traits",       constName: "GB_TRAITS",       type: "GbTrait",      base: "gb-traits",       keepOrder: true },
  { key: "talents",      constName: "GB_TALENTS",      type: "GbTalent",     base: "gb-talents" },
  { key: "goals",        constName: "GB_GOALS",        type: "GbGoal",       base: "gb-goals" },
  { key: "difficulties", constName: "GB_DIFFICULTIES", type: "GbDifficulty", base: "gb-difficulties", keepOrder: true },
  { key: "equipment",    constName: "GB_EQUIPMENT",    type: "GbEquipment",  base: "gb-equipment" },
  { key: "powers",       constName: "GB_POWERS",       type: "GbPower",      base: "gb-powers",       keepOrder: true },
  { key: "bestiary",     constName: "GB_BESTIARY",     type: "GbBestiary",   base: "gb-bestiary" },
  { key: "ghost-abilities",  constName: "GB_GHOST_ABILITIES",  type: "GbGhostAbility",  base: "gb-ghost-abilities" },
  { key: "ghost-weaknesses", constName: "GB_GHOST_WEAKNESSES", type: "GbGhostWeakness", base: "gb-ghost-weaknesses" },
  { key: "ghost-toughness",  constName: "GB_GHOST_TOUGHNESS",  type: "GbToughness",     base: "gb-ghost-toughness", keepOrder: true },
  { key: "rules",        constName: "GB_RULES",        type: "GbRule",       base: "gb-rules",        keepOrder: true },
];

const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { throw new Error(`${p}: ${e.message}`); } };
const emitTs = (base, type, constName, value) =>
  writeFileSync(join(TS_DIR, base + ".ts"), `${BANNER}\n\nimport type { ${type} } from "./gb-types";\n\nexport const ${constName} = ${JSON.stringify(value, null, 2)} as unknown as ${type}[];\n`, "utf8");
const emitJs = (base, constName, value) =>
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\nif (typeof window !== 'undefined') { window.${constName} = ${constName}; }\n`, "utf8");

mkdirSync(TS_DIR, { recursive: true }); mkdirSync(JS_DIR, { recursive: true });
const summary = [];
for (const e of ENTITIES) {
  const p = join(PARTS, e.key + ".json");
  if (!existsSync(p)) { console.warn(`build-gb-data: missing ${e.key}.json — skipping`); continue; }
  const rows = readJson(p);
  if (!Array.isArray(rows)) throw new Error(`${e.key}.json must be an array`);
  if (!e.keepOrder) rows.sort((a, b) => String(a.name).localeCompare(String(b.name), "en"));
  emitTs(e.base, e.type, e.constName, rows);
  emitJs(e.base, e.constName, rows);
  summary.push(`${e.constName}=${rows.length}`);
}
console.log("build-gb-data: " + summary.join(", "));
