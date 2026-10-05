// Guards the self-hosted font pipeline. Runs offline — no network, no build.
//
//     node scripts/check-fonts.mjs
//
// Three things it checks:
//
//   1. The css2 PARSER, against canned responses in both shapes Google actually
//      serves (a static file per weight, and one variable file covering a range),
//      plus the non-Latin subsets it must throw away. This is tested rather than
//      trusted because the live API is the one thing in this pipeline that can
//      change under us — vercel/next.js#99114 is precisely that happening to
//      next/font.
//
//   2. COVERAGE: every family named in a font-family declaration anywhere in
//      public/tokens.css or the tool templates resolves to a declared @font-face,
//      a self-hosted non-Google face, or a generic/system keyword. A face someone
//      adds later without adding it to the manifest fails here rather than
//      silently rendering in Times on a phone.
//
//   3. NO RUNTIME GOOGLE: nothing that a tool page loads still points at
//      fonts.googleapis.com. The one sanctioned exception is the standalone HTML a
//      prep builder exports — that file is opened outside the app, where a
//      /fonts/... path can't resolve, so it keeps its Google link.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FAMILIES, OUT_DIR, BEGIN_MARK, END_MARK, faceFile } from "./font-manifest.mjs";
import { parseFaces, fileFor, renderBlock, spliceBlock } from "./font-css.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

// ---------------------------------------------------------------------------
// 1. The parser
// ---------------------------------------------------------------------------
// Real response shape: a static instance per weight, several subsets per weight.
const STATIC = `
/* cyrillic */
@font-face {
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 500;
  src: url(https://fonts.gstatic.com/s/oswald/v53/cyr-500.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F;
}
/* latin */
@font-face {
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 500;
  src: url(https://fonts.gstatic.com/s/oswald/v53/lat-500.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131;
}
/* latin */
@font-face {
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/oswald/v53/lat-700.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131;
}
`;
const stat = parseFaces(STATIC);
ok(stat.length === 2, `parser: kept ${stat.length} faces from the static response, expected the 2 latin ones`);
ok(stat.every((f) => f.family === "Oswald"), "parser: family name not unquoted");
ok(stat.every((f) => !f.italic), "parser: marked a normal face italic");
ok(stat.map((f) => f.weight).join(",") === "500,700", `parser: weights ${stat.map((f) => f.weight)}`);
ok(stat[0].url.endsWith("lat-500.woff2"), `parser: wrong url ${stat[0].url}`);
ok(stat[0].range.startsWith("U+0000"), "parser: dropped the unicode-range");
ok(fileFor(stat[0]) === "oswald-500.woff2", `parser: filename ${fileFor(stat[0])}`);

// Variable shape: one file, a weight RANGE, and an italic whose style is a range too.
const VARIABLE = `
/* latin */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 300 900;
  src: url(https://fonts.gstatic.com/s/figtree/v6/var.woff2) format('woff2');
  unicode-range: U+0000-00FF;
}
/* latin */
@font-face {
  font-family: 'Figtree';
  font-style: italic;
  font-weight: 300 900;
  src: url(https://fonts.gstatic.com/s/figtree/v6/var-i.woff2) format('woff2');
  unicode-range: U+0000-00FF;
}
`;
const vari = parseFaces(VARIABLE);
ok(vari.length === 2, `parser: variable response gave ${vari.length} faces, expected 2`);
ok(vari[1].italic, "parser: missed the italic variable face");
ok(vari[0].weight === "300 900", `parser: lost the weight range (${vari[0].weight})`);
ok(fileFor(vari[0]) === "figtree-var.woff2", `parser: variable filename ${fileFor(vari[0])}`);
ok(fileFor(vari[1]) === "figtree-var-italic.woff2", `parser: variable italic filename ${fileFor(vari[1])}`);

// A response with no latin block must come back empty rather than half-right.
ok(parseFaces("/* greek */ @font-face { font-family: 'X'; src: url(x.woff2); }").length === 0,
  "parser: kept a non-latin subset");

// Rendering and splicing round-trip.
const block = renderBlock([...stat, ...vari].map((f) => ({ ...f, file: fileFor(f) })));
ok(block.startsWith(BEGIN_MARK) && block.trimEnd().endsWith(END_MARK), "render: markers missing");
ok(block.includes('src: url("/fonts/google/oswald-500.woff2") format("woff2")'), "render: bad src");
ok(block.includes("font-weight: 300 900;"), "render: dropped a variable weight range");
ok((block.match(/@font-face/g) || []).length === 4, "render: wrong face count");
const seeded = spliceBlock("a{}\n@font-face{font-family:\"JSL Blackletter\"}\nb{}", block);
ok(seeded.indexOf(BEGIN_MARK) < seeded.indexOf('font-family:"JSL Blackletter"'),
  "splice: generated block must come before the hand-written faces");
const respliced = spliceBlock(seeded, renderBlock([{ ...stat[0], file: fileFor(stat[0]) }]));
ok((respliced.match(/@font-face/g) || []).length === 2,
  "splice: re-running must replace the old block, not add another");
ok(respliced.includes('font-family:"JSL Blackletter"'), "splice: ate a hand-written face");
let threw = false;
try { spliceBlock("x" + BEGIN_MARK + "y", "z"); } catch { threw = true; }
ok(threw, "splice: a lone marker must throw rather than guess the boundaries");

// ---------------------------------------------------------------------------
// 2. Coverage
// ---------------------------------------------------------------------------
const tokensPath = path.join(ROOT, "public/tokens.css");
const tokens = fs.existsSync(tokensPath) ? fs.readFileSync(tokensPath, "utf8") : "";
const declaredFaces = new Set();
for (const m of tokens.matchAll(/@font-face\s*\{[^}]*?font-family:\s*["']?([^;"']+)["']?\s*;/gi)) {
  declaredFaces.add(m[1].trim().toLowerCase());
}
// Generic families and system stacks are nobody's to declare.
const GENERIC = new Set([
  "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif",
  "ui-sans-serif", "ui-monospace", "ui-rounded", "inherit", "initial", "unset", "revert",
  "-apple-system", "blinkmacsystemfont", "segoe ui", "roboto", "helvetica neue", "helvetica",
  "arial", "times new roman", "times", "georgia", "courier new", "courier", "menlo", "monaco",
  "consolas", "liberation mono", "apple color emoji", "segoe ui emoji", "segoe ui symbol",
  "noto color emoji", "emoji", "math", "fangsong", "sans", "mono",
  "sfmono-regular", "sf mono", "ui-serif", "cambria", "verdana", "tahoma", "trebuchet ms",
]);
const manifestFamilies = new Set(Object.keys(FAMILIES).map((f) => f.toLowerCase()));
const known = (name) =>
  GENERIC.has(name) || declaredFaces.has(name) || manifestFamilies.has(name) ||
  name.startsWith("var(") || name.startsWith("--");

const TPL = path.join(ROOT, "tools/templates");
const used = new Map();   // family -> first file that asked for it
for (const f of fs.existsSync(TPL) ? fs.readdirSync(TPL).filter((x) => x.endsWith(".html")) : []) {
  const s = fs.readFileSync(path.join(TPL, f), "utf8");
  // A template also declares faces of its own — Shadowdark's prep builder brings
  // its own Old Newspaper. Those count as declared for this file.
  const local = new Set();
  for (const m of s.matchAll(/@font-face\s*\{[^}]*?font-family:\s*\\?["']?([^;"'\\]+)/gi)) {
    local.add(m[1].trim().toLowerCase());
  }
  // Terminate on " < and a newline as well as ; } ` — plenty of these declarations
  // sit in an inline style="…" attribute or inside a JS template string next to
  // markup, and a looser class ran off the end and swallowed whole blocks of HTML
  // as a "family". No template writes font-family:\" (escaped double quotes), so
  // treating " as a boundary costs nothing; the \'…\' shape still parses, because
  // backslashes are stripped below.
  for (const m of s.matchAll(/font-family:\s*([^;}<\n"`]{1,200})/gi)) {
    for (const part of m[1].split(",")) {
      // Several of these declarations sit inside JS template strings, where the
      // quotes arrive backslash-escaped (\'Barlow\'), so strip backslashes too or
      // every one of them reads as its own unknown family.
      const name = part.replace(/\\/g, "").trim().replace(/^["']|["']$/g, "").trim().toLowerCase();
      if (name && !name.includes("{") && !used.has(name)) used.set(name, { file: f, local });
    }
  }
}
for (const [name, where] of used) {
  if (!known(name) && !where.local.has(name)) {
    fails.push(`coverage: "${name}" (${where.file}) has no @font-face and is not in the manifest`);
  }
}

// A face served from an absolute URL is worth seeing but isn't a failure: the
// standalone HTML a prep builder exports is opened outside the app, so the one
// face it declares for itself has to name a reachable host rather than a path.
const absolute = [];
for (const f of fs.existsSync(TPL) ? fs.readdirSync(TPL).filter((x) => x.endsWith(".html")) : []) {
  const s = fs.readFileSync(path.join(TPL, f), "utf8");
  for (const m of s.matchAll(/@font-face[^}]*?url\((https?:[^)]+)\)/gi)) absolute.push(`${f}: ${m[1]}`);
}

// Every manifest face should have a file on disk — unless nothing has been fetched
// yet, in which case say so once instead of listing 130 missing files.
const outAbs = path.join(ROOT, OUT_DIR);
const onDisk = fs.existsSync(outAbs) ? new Set(fs.readdirSync(outAbs)) : new Set();
if (!onDisk.size) {
  console.log(`note: ${OUT_DIR} is empty — run a fetcher on a machine with ordinary internet:`);
  console.log("        powershell -ExecutionPolicy Bypass -File scripts\\fetch-fonts.ps1   (no Node needed)");
  console.log("        npm run fonts:fetch                                                (needs Node)");
  console.log("      then commit what lands there together with public/tokens.css.");
} else {
  const missing = [];
  for (const [family, spec] of Object.entries(FAMILIES)) {
    for (const [italic, weights] of [[false, spec.normal ?? []], [true, spec.italic ?? []]]) {
      for (const w of weights) {
        const f = faceFile(family, w, italic);
        // A variable family collapses several weights into one -var file, so a
        // missing static is fine when the variable file is there.
        if (!onDisk.has(f) && !onDisk.has(faceFile(family, "0 0", italic))) missing.push(f);
      }
    }
  }
  if (missing.length) fails.push(`coverage: ${missing.length} manifest face(s) not in ${OUT_DIR}: ${missing.slice(0, 6).join(", ")}${missing.length > 6 ? " …" : ""}`);
  ok(tokens.includes(BEGIN_MARK), "coverage: tokens.css has no generated block but the files are fetched — re-run fonts:fetch");
}

// ---------------------------------------------------------------------------
// 3. No runtime Google on anything a tool page loads
// ---------------------------------------------------------------------------
const minibar = path.join(ROOT, "lib/minibar.ts");
if (fs.existsSync(minibar) && fs.readFileSync(minibar, "utf8").includes("fonts.googleapis.com")) {
  fails.push("runtime: lib/minibar.ts still links fonts.googleapis.com — the injected head should rely on tokens.css");
}
for (const f of fs.existsSync(TPL) ? fs.readdirSync(TPL).filter((x) => x.endsWith(".html")) : []) {
  const s = fs.readFileSync(path.join(TPL, f), "utf8");
  const headEnd = s.search(/<\/head>/i);
  const head = headEnd > 0 ? s.slice(0, headEnd) : s;
  if (head.includes("fonts.googleapis.com")) {
    fails.push(`runtime: ${f} still links fonts.googleapis.com in <head>`);
  }
  // Below </head> only the export path may mention Google, and only in a prep builder.
  const rest = headEnd > 0 ? s.slice(headEnd) : "";
  if (rest.includes("fonts.googleapis.com") && !/_session_prep_builder\.html$/.test(f) && f !== "dungeon_map_maker.html") {
    fails.push(`runtime: ${f} mentions fonts.googleapis.com outside <head> and is not an export path`);
  }
}

// ---------------------------------------------------------------------------
// 4. The two fetchers agree
// ---------------------------------------------------------------------------
// There are two fetchers — Node and PowerShell — because this repo's machine has no
// Node. They read the same scripts/font-manifest.json, so the family list can't
// drift, but the PARSING is written twice and PowerShell can't be run here to test
// it. So: lift the block regex straight out of the .ps1 and run it, in Node, against
// the same canned responses section 1 uses. A bad edit to the PowerShell pattern
// fails here rather than silently producing a tokens.css with faces missing.
const psPath = path.join(ROOT, "scripts/fetch-fonts.ps1");
if (!fs.existsSync(psPath)) {
  fails.push("fetchers: scripts/fetch-fonts.ps1 is missing — it is the only fetcher that can run on this repo's machine");
} else {
  const ps = fs.readFileSync(psPath, "utf8");
  const psPattern = ps.match(/\$blockRe\s*=\s*'([^']+)'/)?.[1];
  if (!psPattern) {
    fails.push("fetchers: can't find $blockRe in fetch-fonts.ps1");
  } else {
    // The JS literal escapes the forward slashes it must; the PowerShell string
    // doesn't. Normalise that one difference and the patterns should be identical.
    const jsPattern = fs.readFileSync(path.join(ROOT, "scripts/font-css.mjs"), "utf8")
      .match(/const re = \/(.+)\/gi;/)?.[1]?.replace(/\\\//g, "/");
    ok(psPattern === jsPattern,
      `fetchers: the two block patterns differ\n    ps: ${psPattern}\n    js: ${jsPattern}`);
    // And it has to actually work, not just match the other one.
    let psRe;
    try { psRe = new RegExp(psPattern, "gi"); } catch (e) { fails.push(`fetchers: ps pattern is not a valid regex: ${e.message}`); }
    if (psRe) {
      const hits = [...STATIC.matchAll(psRe)];
      ok(hits.length === 3, `fetchers: ps pattern found ${hits.length} blocks in the static response, expected 3`);
      ok(hits.filter((h) => h[1] === "latin").length === 2, "fetchers: ps pattern can't tell the subsets apart");
      ok([...VARIABLE.matchAll(new RegExp(psPattern, "gi"))].length === 2,
        "fetchers: ps pattern misses the variable-font shape");
      ok(/font-weight:\s*300 900/.test(hits.length ? [...VARIABLE.matchAll(new RegExp(psPattern, "gi"))][0][2] : ""),
        "fetchers: ps pattern's body group drops the weight range");
    }
  }
  // Three things in that script would corrupt the output silently if dropped, and
  // all three look like noise to anyone tidying it up. Nail them down.
  ok(/SecurityProtocolType\]::Tls12/.test(ps),
    "fetchers: fetch-fonts.ps1 must force TLS 1.2 — PowerShell 5.1 defaults to 1.0 and Google refuses it");
  ok(/UTF8Encoding\(\$false\)/.test(ps),
    "fetchers: fetch-fonts.ps1 must write UTF-8 WITHOUT a BOM, or tokens.css gains a byte-order mark");
  ok(/\[string\]::Join\("`n"/.test(ps),
    "fetchers: fetch-fonts.ps1 must join the generated block with LF — tokens.css is LF throughout");
  ok(/font-manifest\.json/.test(ps),
    "fetchers: fetch-fonts.ps1 must read font-manifest.json rather than carry its own family list");
  for (const family of Object.keys(FAMILIES)) {
    if (ps.includes(`'${family}'`) || ps.includes(`"${family}"`)) {
      fails.push(`fetchers: fetch-fonts.ps1 hardcodes the family "${family}" — it should come from the manifest`);
    }
  }
}

if (fails.length) {
  console.error(`\n${fails.length} FAILED:`);
  for (const f of fails) console.error("  " + f);
  process.exit(1);
}
if (absolute.length) {
  console.log("\nnote: @font-face served from an absolute URL (fine for an export path, not for a page):");
  for (const a of absolute) console.log("  " + a);
}
console.log(`\nALL OK — parser, coverage (${used.size} families referenced), no runtime Google.`);
