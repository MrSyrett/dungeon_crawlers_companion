#!/usr/bin/env node
// Build The Lord of the Rings Roleplaying data.
//   data/lotr/parts/*.mjs  →  lib/data/lotr-data.ts        (typed, for Next pages)
//                          →  public/tools-data/lotr-data.js (window globals, for
//                             the character sheet, session builder and GM Screen)
// Run: node scripts/build-lotr-data.mjs   (npm run data:lotr)

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const part = (n) => import(pathToFileURL(join(ROOT, "data", "lotr", "parts", n + ".mjs")).href);

const mods = await Promise.all(["core", "callings", "virtues", "equipment", "rules", "bestiary"].map(part));
const all = Object.assign({}, ...mods);

// Type annotation per export (anything not listed is exported as `unknown`-free inferred JSON).
const TYPES = {
  LOTR_SKILLS: "LotrSkill[]", LOTR_CULTURES: "LotrCulture[]", LOTR_BACKGROUNDS: "LotrBackground[]",
  LOTR_CALLINGS: "LotrCalling[]", LOTR_VIRTUES: "LotrVirtue[]", LOTR_REWARDS: "LotrReward[]",
  LOTR_ENCHANTED_REWARDS: "LotrEnchantedReward[]", LOTR_CRAFTS: "LotrCraft[]", LOTR_FIGHTING_STYLES: "LotrStyle[]",
  LOTR_CONDITIONS: "LotrCondition[]", LOTR_MONSTERS: "LotrMonster[]", LOTR_WEAPONS: "LotrWeapon[]",
  LOTR_ARMOR: "LotrArmor[]", LOTR_GEAR: "LotrGear[]", LOTR_PATRONS: "LotrPatron[]",
};

const header = "// GENERATED FILE - do not edit by hand.\n// Source: data/lotr/parts/*.mjs - regenerate with: node scripts/build-lotr-data.mjs\n// The Lord of the Rings Roleplaying (5E). Mechanics are game facts; descriptive\n// text is original paraphrase written for this app.\n";
const names = Object.keys(all).filter((k) => k.startsWith("LOTR_")).sort();

let ts = header + `import type { ${[...new Set(Object.values(TYPES).map((t) => t.replace("[]", "")))].join(", ")} } from "./lotr-types";\n\n`;
let js = header + "(function(){\n";
for (const k of names) {
  const json = JSON.stringify(all[k], null, 1);
  ts += `export const ${k}${TYPES[k] ? ": " + TYPES[k] : ""} = ${json};\n\n`;
  js += `var ${k} = ${json};\nwindow.${k} = ${k};\n`;
}
js += "})();\n";

writeFileSync(join(ROOT, "lib", "data", "lotr-data.ts"), ts);
writeFileSync(join(ROOT, "public", "tools-data", "lotr-data.js"), js);
console.log(`lotr: ${names.length} exports → lib/data/lotr-data.ts, public/tools-data/lotr-data.js`);
for (const k of names) if (Array.isArray(all[k])) console.log(`  ${k}: ${all[k].length}`);
