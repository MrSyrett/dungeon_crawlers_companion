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
// Getting text out of the PDFs (recommended: --from-text). The rulebooks are
// laid out in TWO COLUMNS. Dump them in READING ORDER — poppler's pdftotext with
// NO -layout flag keeps each column intact:
//   mkdir extracted
//   for f in protected/rulebooks/*.pdf; do pdftotext "$f" "extracted/$(basename "$f" .pdf).txt"; done
//   node scripts/extract-dcc-flavor.mjs --from-text extracted
// Do NOT use `pdftotext -layout` here: it glues the left and right columns onto
// the same line, so each creature's flavor gets spliced with its neighbour's.
// (The built-in pdfjs path below is a fallback and may interleave columns the
// same way; prefer the pdftotext --from-text route for clean prose.)

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

// Roles used on the stat-block "type line" (e.g. "Mob; Medium (4), Beastly" or
// "Neighborhood Boss; Large (5), Humanoid"). This line opens every stat block and
// never occurs in flavor prose, so it is the reliable end-of-flavor boundary.
const ROLE =
  "(?:Mob|Elite|Rival(?:\\s+Crawler)?|NPC|(?:Neighborhood|Borough|City|Province|Country|Floor|Quest)\\s+Boss|Boss)";
const SIZE = "(?:Tiny|Petite|Small|Medium|Large|Huge|Gargantuan|Colossal|Titanic)";
const ROLE_LINE = new RegExp(`\\b${ROLE}\\s*;\\s*${SIZE}\\b`, "i");

// Strip pdftotext artifacts from a captured paragraph: the rotated "F L O O R n"
// floor-tab, lone "AI" markers, page numbers on their own, and collapse whitespace.
function scrub(s) {
  return s
    .replace(/\bF\s+L\s+O\s+O\s+R\s+\d+/gi, " ")
    .replace(/\bHealth\s*Bar\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Capture the flavor paragraph that sits just before a creature's stat block.
// The write-ups head this paragraph with the creature's name + level, in one of
// two book styles: "Rayzer, Level 3" (GM Toolkit) or "Babababoon. Level 17."
// (Core Rulebook). The paragraph ends where the stat block's type line begins.
// Return the LAST match of a global regex in text, or null.
function lastMatch(re, text) {
  let m, last = null;
  while ((m = re.exec(text)) !== null) { last = m; if (m.index === re.lastIndex) re.lastIndex++; }
  return last;
}

function captureFlavor(text, name, level) {
  // Mob style: "Rayzer, Level 3" / "Babababoon. Level 17." — name, optional comma or
  // period, then "Level N". Boss style: a "<Name>, <epithet>" title line immediately
  // above a "Level N <Role>!" header (e.g. "Level 7 Neighborhood Boss!"), with the
  // flavor beneath. Try the mob heading first, then the boss heading.
  //
  // Some creatures are written up TWICE — once in a neighborhood/adventure section and
  // again in the bestiary appendix, each with its own "Name, Level N" flavor box. The
  // appendix box (the canonical green box) is the LATER one, so take the last match.
  const mobHead = new RegExp(esc(name) + "\\s*[.,]?\\s*Level\\s*\\.?\\s*" + level + "\\b", "ig");
  const bossHead = new RegExp(
    esc(name) + "[\\s\\S]{0,80}?Level\\s*\\.?\\s*" + level + "\\s+" + ROLE + "\\b!?",
    "ig",
  );
  const m = lastMatch(mobHead, text) || lastMatch(bossHead, text);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = text.slice(start, start + 2500);
  // Boundary = start of the stat block or end of the flavor box. Reliable openers: the
  // type line ("Role; Size"), a monster attack line ("14+F to hit"), the per-page
  // "Copyright Renegade Game Studios" footer, or the older Surprise/Evade headers.
  const boundary = new RegExp(
    ROLE_LINE.source +
      "|\\d+\\s*\\+\\s*F\\s+to\\s+hit\\b" +
      "|Copyright\\s+Renegade\\s+Game\\s+Studios" +
      "|\\bSurprise\\b[\\s\\S]{0,40}\\bEvade\\b|\\bLevel\\s+\\d+\\b[\\s\\S]{0,24}\\bSurprise\\b",
    "i",
  );
  const b = boundary.exec(rest);
  let flavor = scrub(b ? rest.slice(0, b.index) : rest);
  // Drop leading punctuation (a stray "." left from the heading's own period),
  // then a stray leading stat-header fragment that bled in from an adjacent block
  // (e.g. "Flesher. Level 10." ahead of the real prose), then any punctuation again.
  flavor = flavor.replace(/^[^A-Za-z"“'‘]+/, "");
  flavor = flavor.replace(/^[A-Za-z'’ ]{0,30}\.\s*Level\s*\.?\s*\d+\.?\s*/i, "");
  // A boss heading "…Level N <Role>!" can leave its trailing "<Role>" in front of the
  // prose (e.g. "Neighborhood Boss! Do you feel…" or "Neighborhood Boss Audiences…").
  // Drop a leading "<Role>!" for any role, or a bare multi-word boss role (which never
  // opens real prose).
  flavor = flavor.replace(new RegExp("^(?:" + ROLE + ")\\s*!\\s*", "i"), "");
  flavor = flavor.replace(
    /^(?:Neighborhood|Borough|City|Province|Country|Floor|Quest)\s+Boss\s+/i,
    "",
  );
  flavor = flavor.replace(/^[^A-Za-z"“'‘]+/, "");
  // Trim to the last complete sentence.
  const lastStop = Math.max(flavor.lastIndexOf(". "), flavor.lastIndexOf(".”"), flavor.lastIndexOf(".\""));
  if (lastStop > 40) flavor = flavor.slice(0, lastStop + 1);
  flavor = flavor.replace(/\s+/g, " ").trim();
  // Sanity: prose-shaped, reasonable length.
  if (flavor.length < 40 || flavor.length > 1600) return null;
  if (!/[a-z]/.test(flavor) || !/\s/.test(flavor)) return null;
  // A real flavor box opens a sentence — a capital letter or an opening quote. A
  // lowercase (or mid-word) start means the capture began inside another block; drop it.
  if (!/^["“'‘A-Z0-9]/.test(flavor)) return null;
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
let skipped = 0;
const unmatched = [];

// First pass: capture a candidate flavor for every monster that needs one.
const candidates = new Map(); // monster -> flavor
for (const m of monsters) {
  if (m.flavor && !OVERWRITE) { skipped++; continue; }
  const flavor = captureFlavor(text, m.name, m.level);
  if (flavor) candidates.set(m, flavor);
}

// Two-column pages sometimes splice two neighbouring creatures' write-ups into one
// blob that both of them then match identically. A flavor claimed by more than one
// creature can't be trusted for either, so drop every copy of a duplicated capture.
const freq = new Map();
for (const f of candidates.values()) freq.set(f, (freq.get(f) || 0) + 1);
const dropped = [];
for (const [m, f] of candidates) {
  if (freq.get(f) > 1) { candidates.delete(m); dropped.push(m.name); }
}

let matched = 0;
for (const m of monsters) {
  if (candidates.has(m)) { if (WRITE) m.flavor = candidates.get(m); matched++; }
  else if (!(m.flavor && !OVERWRITE)) unmatched.push(`${m.name} (L${m.level}, ${m.source} p.${m.page})`);
}

console.log(`\nMatched flavor for ${matched} / ${monsters.length} monsters` + (skipped ? ` (${skipped} already had flavor, kept)` : "") + ".");
if (dropped.length) console.log(`Dropped ${dropped.length} ambiguous (two-column) captures shared by neighbours: ${dropped.join(", ")}.`);
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
