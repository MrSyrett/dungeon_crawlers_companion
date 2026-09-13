// Builds the DarkSpace reference-page data layer from one canonical source:
//
//   public/tools-data/sd-darkspace.js   (window.DARKSPACE — used by the sheet)
//        │
//        └─▶ lib/data/darkspace.ts       typed `export const`s for the Next pages
//
// The sheet module is the single source of truth (the character sheet loads it
// directly as a browser global). Rather than hand-maintain a second copy for the
// reference pages — which would drift — this evaluates just the window.DARKSPACE
// assignment in a sandbox and emits a typed TS module the app imports.
//
// Runs on prebuild (see package.json). Re-run by hand after editing the source:
//   node scripts/build-darkspace-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public", "tools-data", "sd-darkspace.js");
const OUT_DIR = join(ROOT, "lib", "data");
const OUT = join(OUT_DIR, "darkspace.ts");

const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: public/tools-data/sd-darkspace.js - regenerate with: node scripts/build-darkspace-data.mjs";

// Evaluate the sheet module against a stub `window`, capturing window.DARKSPACE.
// The file is our own source and only assigns window.DARKSPACE = { ... }; we run
// it in a fresh context with no Node globals.
function loadDarkSpace() {
  const src = readFileSync(SRC, "utf8");
  const sandbox = { window: {} };
  runInNewContext(src, sandbox, { timeout: 5000 });
  const data = sandbox.window.DARKSPACE;
  if (!data || typeof data !== "object") {
    throw new Error("window.DARKSPACE did not evaluate to an object in " + SRC);
  }
  return data;
}

function sanityCheck(d) {
  const problems = [];
  const need = [
    "terms", "species", "humanNote", "techSpecies", "archetypes", "backgrounds",
    "motivations", "triad", "credits", "citizenGear", "spacersKit", "gear",
    "armor", "meleeWeapons", "rangedWeapons", "explosives", "weaponProps",
    "ship", "advancedTech", "advancedTechNote", "quickRules",
  ];
  for (const k of need) if (!(k in d)) problems.push(`missing key: ${k}`);
  if (Array.isArray(d.archetypes) && d.archetypes.length !== 7) problems.push(`expected 7 archetypes, got ${d.archetypes.length}`);
  if (Array.isArray(d.species) && d.species.length !== 20) problems.push(`expected 20 species, got ${d.species.length}`);
  if (Array.isArray(d.backgrounds) && d.backgrounds.length !== 20) problems.push(`expected 20 backgrounds, got ${d.backgrounds.length}`);
  for (const a of d.archetypes || []) {
    if (!Array.isArray(a.talents) || !a.talents.length) problems.push(`archetype ${a.name}: no talent rows`);
    if (!Array.isArray(a.features)) problems.push(`archetype ${a.name}: no features`);
  }
  if (problems.length) throw new Error("DarkSpace data sanity check failed:\n  - " + problems.join("\n  - "));
}

const CONSTS = [
  ["terms", "DS_TERMS", "Record<string, string>"],
  ["species", "DS_SPECIES", "DsSpecies[]"],
  ["humanNote", "DS_HUMAN_NOTE", "string"],
  ["techSpecies", "DS_TECH_SPECIES", "DsTechSpecies[]"],
  ["archetypes", "DS_ARCHETYPES", "DsArchetype[]"],
  ["backgrounds", "DS_BACKGROUNDS", "DsBackground[]"],
  ["motivations", "DS_MOTIVATIONS", "DsMotivation[]"],
  ["triad", "DS_TRIAD", "DsTriad"],
  ["credits", "DS_CREDITS", "{ note: string }"],
  ["citizenGear", "DS_CITIZEN_GEAR", "string[]"],
  ["spacersKit", "DS_SPACERS_KIT", "DsSpacersKit"],
  ["gear", "DS_GEAR", "DsGearItem[]"],
  ["armor", "DS_ARMOR", "DsArmor[]"],
  ["meleeWeapons", "DS_MELEE_WEAPONS", "DsWeapon[]"],
  ["rangedWeapons", "DS_RANGED_WEAPONS", "DsWeapon[]"],
  ["explosives", "DS_EXPLOSIVES", "DsWeapon[]"],
  ["weaponProps", "DS_WEAPON_PROPS", "Record<string, string>"],
  ["ship", "DS_SHIP", "DsShip"],
  ["advancedTech", "DS_ADVANCED_TECH", "DsAdvancedTech[]"],
  ["advancedTechNote", "DS_ADVANCED_TECH_NOTE", "string"],
  ["quickRules", "DS_QUICK_RULES", "DsQuickRule[]"],
];

const IMPORTS = [
  "DarkSpaceData", "DsSpecies", "DsTechSpecies", "DsArchetype", "DsBackground",
  "DsMotivation", "DsTriad", "DsSpacersKit", "DsGearItem", "DsArmor", "DsWeapon",
  "DsShip", "DsAdvancedTech", "DsQuickRule",
];

function build() {
  const d = loadDarkSpace();
  sanityCheck(d);
  mkdirSync(OUT_DIR, { recursive: true });
  let out = BANNER + "\n\n";
  out += `import type {\n  ${IMPORTS.join(", ")},\n} from "./darkspace-types";\n\n`;
  for (const [key, name, type] of CONSTS) {
    out += `export const ${name}: ${type} = ${JSON.stringify(d[key], null, 2)};\n\n`;
  }
  // One bundled object mirroring window.DARKSPACE, for callers that want it whole.
  out += `export const DARKSPACE: DarkSpaceData = {\n`;
  out += CONSTS.map(([key, name]) => `  ${key}: ${name},`).join("\n");
  out += `\n};\n`;
  writeFileSync(OUT, out, "utf8");
  console.log(`Wrote ${OUT} (${d.archetypes.length} archetypes, ${d.species.length} species, ${d.gear.length} gear, ${d.meleeWeapons.length + d.rangedWeapons.length} weapons).`);
}

build();
