// Downloads every Google face in scripts/font-manifest.mjs into
// public/fonts/google/, then rewrites the generated @font-face block inside
// public/tokens.css to point at those files.
//
// RUN IT ON A MACHINE WITH ORDINARY INTERNET:
//     npm run fonts:fetch               # skips files already on disk
//     npm run fonts:fetch -- --force    # re-download everything
//     npm run fonts:fetch -- --plan     # print what it would ask for, no network
//
// Then commit public/fonts/google/ and public/tokens.css together. The files never
// change on their own, so this is a one-off per face.
//
// Why a script rather than a dependency: the woff2 URLs Google serves are not
// stable and aren't published anywhere we could pin, so the only honest way to get
// them is to ask the css2 API the same question the browser used to ask on every
// page load — once — and keep the answer. The request sends a modern browser
// User-Agent on purpose: the API serves ttf to anything it doesn't recognise, and
// woff2 is a third of the bytes.
//
// All the parsing and CSS generation lives in scripts/font-css.mjs so that
// scripts/check-fonts.mjs can test it without the network.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FAMILIES, SUBSET, OUT_DIR, CSS_FILE, css2Url } from "./font-manifest.mjs";
import { parseFaces, fileFor, renderBlock, spliceBlock } from "./font-css.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const FORCE = argv.includes("--force");
const PLAN = argv.includes("--plan");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

async function get(url, as) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return as === "buffer" ? Buffer.from(await r.arrayBuffer()) : r.text();
}

const plan = Object.entries(FAMILIES).map(([family, spec]) => ({ family, url: css2Url(family, spec) }));

if (PLAN) {
  for (const p of plan) console.log(p.family.padEnd(22), p.url);
  console.log(`\n${plan.length} families. Run without --plan to download.`);
  process.exit(0);
}

const outAbs = path.join(ROOT, OUT_DIR);
fs.mkdirSync(outAbs, { recursive: true });

const declared = [];
const failed = [];
let fetched = 0, skipped = 0, bytes = 0;

for (const { family, url } of plan) {
  let faces;
  try {
    faces = parseFaces(await get(url));
  } catch (err) {
    failed.push(`${family}: ${err.message}`);
    continue;
  }
  if (!faces.length) {
    failed.push(`${family}: no "${SUBSET}" @font-face block in the response`);
    continue;
  }
  for (const face of faces) {
    const file = fileFor(face);
    const abs = path.join(outAbs, file);
    if (fs.existsSync(abs) && !FORCE) {
      skipped++;
    } else {
      try {
        const buf = await get(face.url, "buffer");
        fs.writeFileSync(abs, buf);
        fetched++; bytes += buf.length;
      } catch (err) {
        failed.push(`${family} ${face.italic ? "italic " : ""}${face.weight}: ${err.message}`);
        continue;
      }
    }
    declared.push({ family, italic: face.italic, weight: face.weight, range: face.range, file });
  }
  console.log(`${family.padEnd(22)} ${faces.length} face(s)`);
}

const cssAbs = path.join(ROOT, CSS_FILE);
try {
  fs.writeFileSync(cssAbs, spliceBlock(fs.readFileSync(cssAbs, "utf8"), renderBlock(declared)));
} catch (err) {
  console.error(`\n${CSS_FILE}: ${err.message} — fix it by hand; the woff2 files are already in place.`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(outAbs, "manifest.json"),
  JSON.stringify({ generated: new Date().toISOString(), subset: SUBSET, faces: declared }, null, 2) + "\n",
);

console.log(
  `\n${declared.length} faces declared — ${fetched} downloaded` +
  `${bytes ? ` (${(bytes / 1048576).toFixed(2)} MB)` : ""}, ${skipped} already present.` +
  `\nWrote the @font-face block into ${CSS_FILE} and ${OUT_DIR}/manifest.json.`,
);
if (failed.length) {
  console.error(`\n${failed.length} FAILED:`);
  for (const f of failed) console.error("  " + f);
  console.error("\nRe-run to retry just these — files already on disk are skipped.");
  process.exit(1);
}
console.log("\nNow commit public/fonts/google/ and public/tokens.css together.");
