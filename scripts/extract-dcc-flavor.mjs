// Populate each DCC monster's `flavor` field from the rulebook PDFs you own.
//
// The bestiary write-ups head each creature's flavor paragraph with a line like
//   "Rayzer, Level 3"
// followed by prose, then the stat block. This script reads your licensed PDFs,
// finds that "<Name>, Level <N>" heading for every monster in data/dcc/monsters.json,
// captures the prose paragraph that follows, and writes it into `flavor`.
//
// It reads ONLY from local files you provide and writes ONLY into your own data.
// Nothing is fetched or sent anywhere.
//
// Usage:
//   node scripts/extract-dcc-flavor.mjs                 # dry run — report matches, write nothing
//   node scripts/extract-dcc-flavor.mjs --write         # write flavor into monsters.json + regenerate
//   node scripts/extract-dcc-flavor.mjs --pdf-dir protected/rulebooks
//   node scripts/extract-dcc-flavor.mjs --from-text extracted/   # use pre-dumped .txt instead of PDFs
//   node scripts/extract-dcc-flavor.mjs --overwrite     # replace flavor that's already set
//
// Getting text out of the PDFs: this uses `pdfjs-dist` if it's installed
//   (npm i -D pdfjs-dist). If it isn't, dump the PDFs to text yourself with
//   poppler's pdftotext (`pdftotext -layout book.pdf book.txt`) into a folder
//   and pass it with --from-text.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MONSTERS = join(ROOT, "data", "dcc", "monsters.json");
const TS_OUT = join(ROOT, "lib", "data", "dcc-monsters.ts");
const JS_OUT = join(ROOT, "public", "tools-data", "dcc-monsters.js");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const WRITE = flag("--write");
const OVERWRITE = flag("--overwrite");
const PDF_DIR = join(ROOT, opt("--pdf-dir", "protected/rulebooks"));
const FROM_TEXT = opt("--from-text", null);

// ── Get the raw text of every source book ────────────────────────────────────
async function loadPdfText(dir) {
  let pdfjs;
  try {
    pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  } catch {
    console.error(
      "\n[!] pdfjs-dist is not installed. Either:\n" +
        "    • npm i -D pdfjs-dist   (then re-run), or\n" +
        "    • dump the PDFs to text with `pdftotext -layout` and pass --from-text <dir>.\n",
    );
    process.exit(1);
  }
  if (!existsSync(dir)) { console.error(`[!] PDF dir not found: ${dir}`); process.exit(1); }
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (!files.length) { console.error(`[!] No PDFs in ${dir}`); process.exit(1); }
  let all = "";
  for (const f of files) {
    const data = new Uint8Array(readFileSync(join(dir, f)));
    const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const content = await page.getTextContent();
      all += content.items.map((it) => (it.str || "")).join(" ") + "\n";
    }
    console.log(`    read ${f} (${doc.numPages} pp)`);
  }
  return all;
}

function loadTextDir(dir) {
  const d = join(ROOT, dir);
  if (!existsSync(d)) { console.error(`[!] --from-text dir not found: ${d}`); process.exit(1); }
  const files = readdirSync(d).filter((f) => f.toLowerCase().endsWith(".txt"));
  if (!files.length) { console.error(`[!] No .txt files in ${d}`); process.exit(1); }
  return files.map((f) => readFileSync(join(d, f), "utf8")).join("\n");
}

// Normalize: fix hyphenation across line breaks, collapse whitespace, keep it one
// long searchable string (the headings and prose survive; layout does not matter).
function normalize(raw) {
  return raw
    .replace(/-\s*\n\s*/g, "")   // de-hyphenate line-wrapped words
    .replace(/\s+/g, " ")
    .trim();
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Capture the flavor paragraph after a "<Name>, Level <N>" heading. It ends where
// the stat block begins — the write-ups follow the prose with the creature's name
// again and/or the "Level N" stat line and type keywords.
function captureFlavor(text, name, level) {
  const head = new RegExp(esc(name) + "\\s*,?\\s*Level\\s*" + level + "\\b", "i");
  const m = head.exec(text);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = text.slice(start, start + 2000);
  // Boundary = where the stat block starts. Keyed off stat-block LABELS, never the
  // creature's name (the flavor prose itself repeats the name, e.g. "The Rayzer is…").
  // The block opens with the "Surprise … Evade" stat line (or a Health Bar / a
  // "Level N … Surprise" header), none of which occur together in flavor prose.
  const boundary =
    /\bSurprise\b[\s\S]{0,40}\bEvade\b|\bHealth\s*Bar\b|\bLevel\s+\d+\b[\s\S]{0,24}\bSurprise\b/i;
  const b = boundary.exec(rest);
  let flavor = (b ? rest.slice(0, b.index) : rest).trim();
  // Trim to the last complete sentence.
  const lastStop = Math.max(flavor.lastIndexOf(". "), flavor.lastIndexOf(".”"), flavor.lastIndexOf(".\""));
  if (lastStop > 40) flavor = flavor.slice(0, lastStop + 1);
  flavor = flavor.replace(/\s+/g, " ").trim();
  // Sanity: prose-shaped, reasonable length.
  if (flavor.length < 40 || flavor.length > 1400) return null;
  if (!/[a-z]/.test(flavor) || !/\s/.test(flavor)) return null;
  return flavor;
}

// ── Targeted regen (monsters only — does NOT touch the other datasets) ───────
const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: data/dcc/monsters.json - regenerate with: node scripts/build-dcc-data.mjs";
function regenerate(arr) {
  const body = JSON.stringify(arr, null, 2);
  writeFileSync(TS_OUT, BANNER + '\n\nimport type { DccMonster } from "./dcc-types";\n\nexport const DCC_MONSTERS: DccMonster[] = ' + body + ";\n", "utf8");
  writeFileSync(JS_OUT, BANNER + "\n\nconst DCC_MONSTERS = " + body + ";\n", "utf8");
}

// ── Run ──────────────────────────────────────────────────────────────────────
console.log(FROM_TEXT ? `Reading text from ${FROM_TEXT}/` : `Reading PDFs from ${PDF_DIR}/`);
const raw = FROM_TEXT ? loadTextDir(FROM_TEXT) : await loadPdfText(PDF_DIR);
const text = normalize(raw);

const monsters = JSON.parse(readFileSync(MONSTERS, "utf8"));
let matched = 0, skipped = 0;
const unmatched = [];
for (const m of monsters) {
  if (m.flavor && !OVERWRITE) { skipped++; continue; }
  const flavor = captureFlavor(text, m.name, m.level);
  if (flavor) { if (WRITE) m.flavor = flavor; matched++; }
  else unmatched.push(`${m.name} (L${m.level}, ${m.source} p.${m.page})`);
}

console.log(`\nMatched flavor for ${matched} / ${monsters.length} monsters` + (skipped ? ` (${skipped} already had flavor, kept)` : "") + ".");
if (unmatched.length) {
  console.log(`\nNo confident match for ${unmatched.length} — fill these by hand if needed:`);
  unmatched.slice(0, 60).forEach((n) => console.log("  · " + n));
  if (unmatched.length > 60) console.log(`  … and ${unmatched.length - 60} more`);
}
if (WRITE) {
  writeFileSync(MONSTERS, JSON.stringify(monsters, null, 2) + "\n", "utf8");
  regenerate(monsters);
  console.log(`\nWrote flavor into ${basename(MONSTERS)} and regenerated dcc-monsters.ts / dcc-monsters.js.`);
} else {
  console.log("\nDry run — nothing written. Re-run with --write to save (review the matches first).");
}
