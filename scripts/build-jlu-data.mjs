// Builds the Justice League Unlimited RPG (JLU, Quickstart) data layer from
// curated parts:
//   data/jlu/parts/<entity>.json
//        ├─▶ lib/data/jlu-<entity>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/jlu-<entity>.js  `const` global for the HTML sheet
// After editing anything under data/jlu/parts:  node scripts/build-jlu-data.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS = join(ROOT, "data", "jlu", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");
const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs";

// keepOrder: entities with an inherent order (tiers, condition track, crisis
// table, rules) stay in file order; the rest sort by name for stable output.
const ENTITIES = [
  { key: "tiers",       constName: "JLU_TIERS",       type: "JluTier",       base: "jlu-tiers",       keepOrder: true },
  { key: "attributes",  constName: "JLU_ATTRIBUTES",  type: "JluAttribute",  base: "jlu-attributes",  keepOrder: true },
  { key: "origins",     constName: "JLU_ORIGINS",     type: "JluOrigin",     base: "jlu-origins" },
  { key: "archetypes",  constName: "JLU_ARCHETYPES",  type: "JluArchetype",  base: "jlu-archetypes" },
  { key: "powers",      constName: "JLU_POWERS",      type: "JluPower",      base: "jlu-powers" },
  { key: "knowledge",   constName: "JLU_KNOWLEDGE",   type: "JluKnowledge",  base: "jlu-knowledge" },
  { key: "traits",      constName: "JLU_TRAITS",      type: "JluTrait",      base: "jlu-traits" },
  { key: "equipment",   constName: "JLU_EQUIPMENT",   type: "JluEquipment",  base: "jlu-equipment" },
  { key: "limitations", constName: "JLU_LIMITATIONS", type: "JluLimitation", base: "jlu-limitations" },
  { key: "conditions",  constName: "JLU_CONDITIONS",  type: "JluCondition",  base: "jlu-conditions",  keepOrder: true },
  { key: "statuses",    constName: "JLU_STATUSES",    type: "JluStatus",     base: "jlu-statuses" },
  { key: "crisis-die",  constName: "JLU_CRISIS",      type: "JluCrisis",     base: "jlu-crisis",      keepOrder: true },
  { key: "bestiary",    constName: "JLU_BESTIARY",    type: "JluBestiary",   base: "jlu-bestiary" },
  { key: "rules",       constName: "JLU_RULES",       type: "JluRule",       base: "jlu-rules",       keepOrder: true },
];

const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { throw new Error(`${p}: ${e.message}`); } };
const emitTs = (base, type, constName, value) =>
  writeFileSync(join(TS_DIR, base + ".ts"), `${BANNER}\n\nimport type { ${type} } from "./jlu-types";\n\nexport const ${constName} = ${JSON.stringify(value, null, 2)} as unknown as ${type}[];\n`, "utf8");
const emitJs = (base, constName, value) =>
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\nif (typeof window !== 'undefined') { window.${constName} = ${constName}; }\n`, "utf8");

mkdirSync(TS_DIR, { recursive: true }); mkdirSync(JS_DIR, { recursive: true });
const summary = [];
for (const e of ENTITIES) {
  const p = join(PARTS, e.key + ".json");
  if (!existsSync(p)) { console.warn(`build-jlu-data: missing ${e.key}.json — skipping`); continue; }
  const rows = readJson(p);
  if (!Array.isArray(rows)) throw new Error(`${e.key}.json must be an array`);
  if (!e.keepOrder) rows.sort((a, b) => String(a.name).localeCompare(String(b.name), "en"));
  emitTs(e.base, e.type, e.constName, rows);
  emitJs(e.base, e.constName, rows);
  summary.push(`${e.constName}=${rows.length}`);
}
console.log("build-jlu-data: " + summary.join(", "));
