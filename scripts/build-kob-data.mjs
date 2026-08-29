// Builds the Kids on Bikes family data layer (Bikes / Brooms / Capes) from one
// canonical source, the same way scripts/build-ace-data.mjs does for ACE!:
//
//   data/kob/parts/<book>.json     (bikes, brooms, capes)
//        │
//        ├─▶ lib/data/kob-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/kob-<name>.js  `const` global for the HTML sheet
//
// Each part carries the same arrays (tropes, strengths, flaws, questions,
// items, capes) plus its book descriptor and the slice of KobTables that book
// defines. The arrays are concatenated in book order; the table slices are
// merged into one KOB_TABLES object (quickRules concatenated).
//
// The generated files are committed. After editing anything under data/kob/:
//   node scripts/build-kob-data.mjs

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PARTS_DIR = join(ROOT, "data", "kob", "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");

const BOOK_ORDER = ["bikes", "brooms", "capes"];

const ENTITIES = [
  { key: "tropes",    constName: "KOB_TROPES",    type: "KobTrope",    base: "kob-tropes" },
  { key: "strengths", constName: "KOB_STRENGTHS", type: "KobStrength", base: "kob-strengths" },
  { key: "flaws",     constName: "KOB_FLAWS",     type: "KobFlaw",     base: "kob-flaws" },
  { key: "questions", constName: "KOB_QUESTIONS", type: "KobQuestion", base: "kob-questions" },
  { key: "items",     constName: "KOB_ITEMS",     type: "KobListItem", base: "kob-items" },
  { key: "capes",     constName: "KOB_CAPES",     type: "KobCape",     base: "kob-capes" },
];

const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: data/kob/parts/*.json - regenerate with: node scripts/build-kob-data.mjs";

function readJson(path) {
  const raw = readFileSync(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`${path}: invalid JSON - ${e.message}`);
  }
}
function emitTs(base, type, constName, kind, value) {
  const decl = kind === "array" ? `${type}[]` : type;
  writeFileSync(
    join(TS_DIR, base + ".ts"),
    `${BANNER}\n\nimport type { ${type} } from "./kob-types";\n\nexport const ${constName}: ${decl} = ${JSON.stringify(value, null, 2)};\n`,
    "utf8",
  );
}
function emitJs(base, constName, value) {
  writeFileSync(join(JS_DIR, base + ".js"), `${BANNER}\n\nconst ${constName} = ${JSON.stringify(value, null, 2)};\n`, "utf8");
}

const parts = new Map(
  readdirSync(PARTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => [f.replace(/\.json$/, ""), readJson(join(PARTS_DIR, f))]),
);
const keys = [...parts.keys()].sort((a, b) => BOOK_ORDER.indexOf(a) - BOOK_ORDER.indexOf(b));

const merged = Object.fromEntries(ENTITIES.map((e) => [e.key, []]));
const books = [];
const tables = { quickRules: [] };
const problems = [];

for (const key of keys) {
  if (!BOOK_ORDER.includes(key)) problems.push(`unknown book part "${key}"`);
  const part = parts.get(key);
  if (part.book) books.push(part.book);
  for (const e of ENTITIES) {
    const rows = part[e.key] ?? [];
    if (!Array.isArray(rows)) throw new Error(`parts/${key}.json: "${e.key}" must be an array`);
    for (const row of rows) {
      if (e.key !== "capes" && row.book !== key) problems.push(`${e.key}: "${row.name ?? row.text}" in parts/${key}.json has book "${row.book}"`);
    }
    merged[e.key].push(...rows);
  }
  for (const [k, v] of Object.entries(part.tables ?? {})) {
    if (k === "quickRules") tables.quickRules.push(...v);
    else if (tables[k] !== undefined) problems.push(`tables.${k} defined by more than one book`);
    else tables[k] = v;
  }
}

// Duplicate names within a book are curation slips (same name across books is
// expected — every book has Rebellious, Lucky, etc.).
for (const e of ENTITIES) {
  if (e.key === "questions") continue;
  const seen = new Set();
  for (const row of merged[e.key]) {
    // Pick-list items repeat a name under different prompts (Aspects: "Animals"
    // under both "good with…" and "fears…"), so the tag is part of the identity.
    const id = `${row.book ?? "capes"}/${row.kind ?? ""}/${row.tag ?? ""}/${String(row.name).toLowerCase()}`;
    if (seen.has(id)) problems.push(`${e.key}: duplicate "${row.name}" in ${row.book ?? "capes"}`);
    seen.add(id);
  }
}
for (const t of merged.tropes) {
  const dice = Object.values(t.dice).sort((a, b) => a - b).join(",");
  if (dice !== "4,6,8,10,12,20") problems.push(`tropes: "${t.name}" (${t.book}) dice are ${dice}`);
}
for (const k of ["statDescriptions", "dice", "difficulties", "adversity", "creation", "spell", "capes"]) {
  if (tables[k] === undefined) problems.push(`tables.${k} missing`);
}
if (problems.length) {
  console.error("build-kob-data: problems found\n  " + problems.join("\n  "));
  process.exit(1);
}

mkdirSync(TS_DIR, { recursive: true });
mkdirSync(JS_DIR, { recursive: true });
const summary = [];
emitTs("kob-books", "KobBookInfo", "KOB_BOOKS", "array", books);
emitJs("kob-books", "KOB_BOOKS", books);
summary.push(`KOB_BOOKS=${books.length}`);
for (const e of ENTITIES) {
  emitTs(e.base, e.type, e.constName, "array", merged[e.key]);
  emitJs(e.base, e.constName, merged[e.key]);
  summary.push(`${e.constName}=${merged[e.key].length}`);
}
emitTs("kob-tables", "KobTables", "KOB_TABLES", "object", tables);
emitJs("kob-tables", "KOB_TABLES", tables);
summary.push(`KOB_TABLES=obj(quickRules=${tables.quickRules.length})`);

console.log(`build-kob-data: merged ${keys.length} book(s) -> lib/data/ + public/tools-data/`);
console.log("  " + summary.join(", "));
