#!/usr/bin/env node
// Fails the build if a standalone surface fetches a font from the network, or if
// public/tokens.css stops covering a face one of them needs.
//
// WHY THIS EXISTS
// The standalone surfaces — the 14 character sheets, the 14 session prep builders,
// the GM Screen and the Map Maker — used to pull their type from
// fonts.googleapis.com, on top of the self-hosted copies in public/tokens.css that
// every one of them already loads. Two extra hosts to resolve, connect to and
// fetch a render-blocking stylesheet from, for faces already sitting in
// /fonts/google on the same origin. That was the "fonts take a second to load in"
// flash: 59 links, 505 (family, style, weight) asks, every single one of them a
// duplicate of something local.
//
// Removing the links is only safe while tokens.css really does cover every face,
// so this checks both halves:
//   1. nothing under tools/templates/ or lib/minibar.ts references a font host;
//   2. every family/weight/style named in lib/minibar.ts's THEME_FONTS table is
//      present in tokens.css's generated @font-face block.
//
// THEME_FONTS is kept as the record of which faces each skin needs, even though it
// no longer emits a link — it is what makes (2) checkable. If a skin gains a face,
// add it there and to scripts/font-manifest.json, then re-run the fetcher.

import fs from "node:fs";
import path from "node:path";

const FONT_HOSTS = /fonts\.(googleapis|gstatic)\.com/;
const FONT_HOSTS_G = /fonts\.(googleapis|gstatic)\.com/g;
const TOKENS = "public/tokens.css";
const MINIBAR = "lib/minibar.ts";
const TEMPLATES = "tools/templates";

const problems = [];

// ---- 1. no network font fetches on the standalone surfaces -------------------
const scan = [MINIBAR, ...(fs.existsSync(TEMPLATES)
  ? fs.readdirSync(TEMPLATES).filter((f) => f.endsWith(".html")).map((f) => path.join(TEMPLATES, f))
  : [])];
// A mention inside a comment is fine — the explanations of why these links were
// removed are worth keeping, and they are what stops someone adding them back. So
// each HIT is tested for being inside a comment, rather than the line being
// "stripped" first. Stripping was the first attempt and it was silently broken:
// `line.replace(/\/\/.*$/, "")` treats the // in https:// as a JavaScript line
// comment and deletes the rest of the line, which made every URL invisible to this
// check. Validated by putting a link back and watching it get caught.
function inComment(text, at, html) {
  if (html) {
    const open = text.lastIndexOf("<!--", at);
    if (open === -1) return false;
    const close = text.indexOf("-->", open);
    return close === -1 || close > at;
  }
  // block comment
  const bOpen = text.lastIndexOf("/*", at);
  if (bOpen !== -1) {
    const bClose = text.indexOf("*/", bOpen);
    if (bClose === -1 || bClose > at) return true;
  }
  // line comment: a // on this line, before the hit, that is not part of a scheme
  const lineStart = text.lastIndexOf("\n", at) + 1;
  const before = text.slice(lineStart, at);
  for (let i = 0; i + 1 < before.length; i++) {
    if (before[i] === "/" && before[i + 1] === "/" && before[i - 1] !== ":") return true;
  }
  return false;
}

for (const f of scan) {
  if (!fs.existsSync(f)) continue;
  const text = fs.readFileSync(f, "utf8");
  const html = f.endsWith(".html");
  for (const m of text.matchAll(FONT_HOSTS_G)) {
    if (inComment(text, m.index, html)) continue;
    const line = text.slice(0, m.index).split("\n").length;
    const src = text.split("\n")[line - 1].trim().slice(0, 110);
    problems.push(`${f}:${line} fetches fonts from the network: ${src}`);
  }
}

// ---- 2. tokens.css still covers every face a skin names ----------------------
const css = fs.readFileSync(TOKENS, "utf8");
const b0 = css.indexOf("BEGIN GENERATED GOOGLE FACES");
const b1 = css.indexOf("END GENERATED GOOGLE FACES");
if (b0 < 0 || b1 < 0) problems.push(`${TOKENS}: the generated @font-face block is missing`);
const block = b0 >= 0 ? css.slice(b0, b1) : "";

const have = new Map();
for (const m of block.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
  const body = m[1];
  const fam = /font-family:\s*"([^"]+)"/.exec(body)?.[1];
  if (!fam) continue;
  const style = /font-style:\s*([a-z]+)/.exec(body)?.[1] ?? "normal";
  const w = /font-weight:\s*([\d\s]+);/.exec(body)?.[1].trim().split(/\s+/).map(Number) ?? [400];
  if (!have.has(fam)) have.set(fam, []);
  // A weight RANGE is a variable font: one file covers the whole span.
  have.get(fam).push({ style, lo: w[0], hi: w[1] ?? w[0] });
}
const covered = (fam, style, weight) =>
  (have.get(fam) ?? []).some((f) => f.style === style && weight >= f.lo && weight <= f.hi);

// A Google css2 query -> the concrete faces it asks for.
function parseSpec(q) {
  const asks = [];
  for (const part of q.split("&").filter((p) => p.startsWith("family="))) {
    const v = decodeURIComponent(part.slice("family=".length)).replace(/\+/g, " ");
    const [fam, axisPart] = v.split(":");
    if (!axisPart) { asks.push([fam, "normal", 400]); continue; }
    const [axesRaw, tuplesRaw] = axisPart.split("@");
    const axes = axesRaw.split(",");
    for (const tuple of tuplesRaw.split(";")) {
      const vals = tuple.split(",");
      const get = (n) => { const i = axes.indexOf(n); return i < 0 ? null : vals[i]; };
      asks.push([fam, get("ital") === "1" ? "italic" : "normal", Number(get("wght") ?? 400)]);
    }
  }
  return asks;
}

const mb = fs.readFileSync(MINIBAR, "utf8");
const tfStart = mb.indexOf("const THEME_FONTS");
if (tfStart < 0) problems.push(`${MINIBAR}: THEME_FONTS table not found — it is what makes this check possible`);
const table = tfStart >= 0 ? mb.slice(tfStart, mb.indexOf("};", tfStart)) : "";
let asks = 0;
for (const m of table.matchAll(/(\w+):\s*"([^"]+)"/g)) {
  for (const [fam, style, weight] of parseSpec(m[2])) {
    asks++;
    if (!covered(fam, style, weight))
      problems.push(`${MINIBAR} THEME_FONTS.${m[1]} needs ${fam} ${style} ${weight}, which ${TOKENS} does not self-host`);
  }
}

if (problems.length) {
  console.error(`\ncheck-standalone-fonts: FAILED — ${problems.length} problem${problems.length === 1 ? "" : "s"}.\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(
    `\nThe standalone pages must get their type from public/tokens.css, which they all\n` +
      `already load. If a face is genuinely missing, add it to scripts/font-manifest.json\n` +
      `and re-run the fetcher (npm run fonts:fetch, or scripts/fetch-fonts.ps1) — do not\n` +
      `add a <link> back.\n`
  );
  process.exit(1);
}
console.log(
  `check-standalone-fonts: OK — ${scan.length} standalone surfaces fetch no fonts from the ` +
    `network, and ${TOKENS} covers all ${asks} faces the skins name ` +
    `(${have.size} families, ${[...have.values()].flat().length} self-hosted).`
);
