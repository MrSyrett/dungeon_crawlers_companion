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
  { key: "conditions",  constName: "MMRPG_CONDITIONS",  type: "MmrpgCondition",  base: "mmrpg-conditions" },
  { key: "powers",      constName: "MMRPG_POWERS",      type: "MmrpgPower",      base: "mmrpg-powers" },
  { key: "characters",  constName: "MMRPG_CHARACTERS",  type: "MmrpgCharacter",  base: "mmrpg-characters" },
  { key: "equipment",   constName: "MMRPG_EQUIPMENT",   type: "MmrpgEquipment",  base: "mmrpg-equipment" },
  { key: "hq-traits",   constName: "MMRPG_HQ_TRAITS",   type: "MmrpgHqTrait",    base: "mmrpg-hq-traits" },
  { key: "hq-tags",     constName: "MMRPG_HQ_TAGS",     type: "MmrpgHqTag",      base: "mmrpg-hq-tags" },
  { key: "hq-profiles", constName: "MMRPG_HQ_PROFILES", type: "MmrpgHqProfile",  base: "mmrpg-hq-profiles" },
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
// Lightweight names-only list of powers, for picker/datalist UIs (e.g. the iconic
// homebrew builder) that must not bundle the full powers module client-side.
{
  const names = readJson(join(PARTS, "powers.json")).map((p) => String(p.name)).sort((a, b) => a.localeCompare(b, "en"));
  writeFileSync(join(TS_DIR, "mmrpg-power-names.ts"), `${BANNER}\n\nexport const MMRPG_POWER_NAMES: readonly string[] = ${JSON.stringify(names, null, 2)};\n`, "utf8");
  summary.push(`MMRPG_POWER_NAMES=${names.length}`);
}
// Trimmed power details (name/set/effect + a few stat fields) for the iconic-item
// homebrew *picker popup*, which shows what each power does. Kept in its own module
// so it can be dynamic-imported only when the picker opens (never in the main bundle).
{
  const rows = readJson(join(PARTS, "powers.json"))
    .map((p) => ({
      name: String(p.name),
      set: p.powerSet && p.powerSet !== "None" ? String(p.powerSet) : "Basic",
      effect: String(p.effect || p.description || "").trim(),
      prereq: p.prerequisites && p.prerequisites !== "None" ? String(p.prerequisites) : "",
      action: p.action ? String(p.action) : "",
      duration: p.duration ? String(p.duration) : "",
      range: p.range ? String(p.range) : "",
      cost: p.cost ? String(p.cost) : "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  writeFileSync(
    join(TS_DIR, "mmrpg-power-details.ts"),
    `${BANNER}\n\nexport type MmrpgPowerDetail = { name: string; set: string; effect: string; prereq: string; action: string; duration: string; range: string; cost: string };\n\nexport const MMRPG_POWER_DETAILS: readonly MmrpgPowerDetail[] = ${JSON.stringify(rows, null, 2)};\n`,
    "utf8",
  );
  summary.push(`MMRPG_POWER_DETAILS=${rows.length}`);
}
console.log(`build-mmrpg-data: -> lib/data/ + public/tools-data/\n  ${summary.join(", ")}`);
