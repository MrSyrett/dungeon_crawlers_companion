// Builds the ACE! (Awfully Cheerful Engine!) data layer from one canonical source.
//
// Same shape as scripts/build-dcc-data.mjs, with one twist: ACE content was
// curated per book (the core rules plus the eight omnibus settings), so the
// canonical source is one JSON file per book under data/ace/parts/. Each part
// carries the same six arrays (roles, focuses, traits, gear, extras, pregens)
// plus its setting descriptor. This script merges the parts by entity and
// fans each merged dataset out to the two consumers:
//
//   data/ace/parts/<book>.json  +  data/ace/tables.json
//        │
//        ├─▶ lib/data/ace-<name>.ts          typed `export const` for Next pages
//        └─▶ public/tools-data/ace-<name>.js  `const` global for the HTML sheet
//
// The generated files are committed so `next dev` needs no build step. After
// editing anything under data/ace/, re-run:
//   node scripts/build-ace-data.mjs
//
// Types live in lib/data/ace-types.ts (hand-authored).

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "data", "ace");
const PARTS_DIR = join(SRC_DIR, "parts");
const TS_DIR = join(ROOT, "lib", "data");
const JS_DIR = join(ROOT, "public", "tools-data");

// Book order — core first, then the omnibus settings in print order. This is
// the order rows keep after the merge, so pages list core content first.
const BOOK_ORDER = ["core", "spirits", "montana", "strange", "beam", "orcs", "domes", "bite", "aaah"];

const ENTITIES = [
  { key: "roles",   constName: "ACE_ROLES",   type: "AceRole",   base: "ace-roles" },
  { key: "focuses", constName: "ACE_FOCUSES", type: "AceFocus",  base: "ace-focuses" },
  { key: "traits",  constName: "ACE_TRAITS",  type: "AceTrait",  base: "ace-traits" },
  { key: "gear",    constName: "ACE_GEAR",    type: "AceGear",   base: "ace-gear" },
  { key: "extras",  constName: "ACE_EXTRAS",  type: "AceExtra",  base: "ace-extras" },
  { key: "pregens", constName: "ACE_PREGENS", type: "AcePregen", base: "ace-pregens" },
];

const BANNER =
  "// GENERATED FILE - do not edit by hand.\n" +
  "// Source: data/ace/{src} - regenerate with: node scripts/build-ace-data.mjs";

function readJson(path) {
  const raw = readFileSync(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`${path}: invalid JSON - ${e.message}`);
  }
}

function emitTs(base, src, type, constName, kind, value) {
  const decl = kind === "array" ? `${type}[]` : type;
  const body =
    `${BANNER.replace("{src}", src)}\n\n` +
    `import type { ${type} } from "./ace-types";\n\n` +
    `export const ${constName}: ${decl} = ${JSON.stringify(value, null, 2)};\n`;
  writeFileSync(join(TS_DIR, base + ".ts"), body, "utf8");
}

function emitJs(base, src, constName, value) {
  // Classic <script src> file: a top-level `const` is visible to the sheet's
  // other inline scripts (global lexical binding), matching the DCC/SD tools.
  const body =
    `${BANNER.replace("{src}", src)}\n\n` +
    `const ${constName} = ${JSON.stringify(value, null, 2)};\n`;
  writeFileSync(join(JS_DIR, base + ".js"), body, "utf8");
}

// ── Merge the per-book parts ────────────────────────────────────────────────
const partFiles = readdirSync(PARTS_DIR).filter((f) => f.endsWith(".json"));
const parts = new Map(partFiles.map((f) => [f.replace(/\.json$/, ""), readJson(join(PARTS_DIR, f))]));

const orderOf = (key) => {
  const i = BOOK_ORDER.indexOf(key);
  return i === -1 ? BOOK_ORDER.length : i;
};
const partKeys = [...parts.keys()].sort((a, b) => orderOf(a) - orderOf(b) || a.localeCompare(b));

const merged = Object.fromEntries(ENTITIES.map((e) => [e.key, []]));
const settings = [];
const problems = [];

for (const key of partKeys) {
  const part = parts.get(key);
  if (part.setting) settings.push(part.setting);
  for (const e of ENTITIES) {
    const rows = part[e.key];
    if (rows === undefined) continue;
    if (!Array.isArray(rows)) throw new Error(`parts/${key}.json: "${e.key}" must be an array`);
    merged[e.key].push(...rows);
  }
}

// Sanity checks — the same row twice in one book is a curation slip; the same
// name in two books is fine (AAAH! restates the core animals with new abilities).
for (const e of ENTITIES) {
  const seen = new Set();
  for (const row of merged[e.key]) {
    if (!row || typeof row.name !== "string" || !row.name.trim()) {
      problems.push(`${e.key}: a row has no name`);
      continue;
    }
    const setting = row.setting ?? "core";
    if (!BOOK_ORDER.includes(setting)) problems.push(`${e.key}: "${row.name}" has unknown setting "${setting}"`);
    const id = `${setting}/${row.name.toLowerCase()}${e.key === "focuses" ? "/" + row.stat : ""}`;
    if (seen.has(id)) problems.push(`${e.key}: duplicate "${row.name}" in ${setting}`);
    seen.add(id);
  }
}
if (problems.length) {
  console.error("build-ace-data: problems found\n  " + problems.join("\n  "));
  process.exit(1);
}

// ── Emit ────────────────────────────────────────────────────────────────────
mkdirSync(TS_DIR, { recursive: true });
mkdirSync(JS_DIR, { recursive: true });

const summary = [];

emitTs("ace-settings", "parts/*.json", "AceSetting", "ACE_SETTINGS", "array", settings);
emitJs("ace-settings", "parts/*.json", "ACE_SETTINGS", settings);
summary.push(`ACE_SETTINGS=${settings.length}`);

for (const e of ENTITIES) {
  emitTs(e.base, "parts/*.json", e.type, e.constName, "array", merged[e.key]);
  emitJs(e.base, "parts/*.json", e.constName, merged[e.key]);
  summary.push(`${e.constName}=${merged[e.key].length}`);
}

const tables = readJson(join(SRC_DIR, "tables.json"));
emitTs("ace-tables", "tables.json", "AceTables", "ACE_TABLES", "object", tables);
emitJs("ace-tables", "tables.json", "ACE_TABLES", tables);
summary.push("ACE_TABLES=obj");

console.log(`build-ace-data: merged ${partKeys.length} book(s) -> lib/data/ + public/tools-data/`);
console.log("  " + summary.join(", "));
