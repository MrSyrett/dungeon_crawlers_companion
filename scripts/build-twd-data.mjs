// Build the TWD runtime data twin from the typed source.
// Reads lib/data/twd-data.ts and emits public/tools-data/twd-data.js with the
// same arrays as window globals (so the sheet / session builder / GM screen can
// read them via `typeof X`-safe `window.X`). Run: node scripts/build-twd-data.mjs
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "lib/data/twd-data.ts"), "utf8");

const lines = src.split("\n");
const out = [];
const names = [];
let inType = false;
for (const line of lines) {
  if (inType) { if (/^\s*};?\s*$/.test(line)) inType = false; continue; }
  if (/^export type\s/.test(line)) { if (line.includes("{") && !line.includes("}")) inType = true; continue; }
  const m = line.match(/^export const (\w+)\s*:[^=]*=\s*(.*)$/);
  if (m) { names.push(m[1]); out.push(`const ${m[1]} = ${m[2]}`); continue; }
  out.push(line);
}

const header = `// AUTO-GENERATED from lib/data/twd-data.ts by scripts/build-twd-data.mjs — do not edit by hand.\n`;
const footer = `\n;(function(){try{Object.assign(window, { ${names.join(", ")} });}catch(e){}})();\n`;
writeFileSync(join(root, "public/tools-data/twd-data.js"), header + out.join("\n") + footer);
console.log(`twd-data.js written (${names.length} globals: ${names.join(", ")})`);
