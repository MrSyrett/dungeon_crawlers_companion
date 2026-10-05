#!/usr/bin/env node
// Fails the build when a hex colour literal appears in app/ or components/ markup.
//
// WHY THIS EXISTS
// The site had 348 hand-written hex literals across 88 files. Most were a system's
// accent spelled out by hand, which meant: a system's palette lived in 80 places
// instead of one, the same pink did three unrelated jobs (DCC's accent, an error
// message, and DCC's Celestial loot tier), and "tighten this system's colours" was
// an 80-file edit. They now point at role tokens — see THE VISUAL LANGUAGE in
// app/globals.css. This check is what stops the sprawl coming back: a literal in a
// className or an inline style fails the build, and the only ways past it are the
// allowlist below (with a reason, in this file, reviewable) or a per-line marker.
//
// WHAT TO USE INSTEAD, when this check fires:
//   a system's accent, a link, an entry name ... var(--sys-link)
//   a page title or section heading .......... nothing — the h1/h2 contract does it
//   an eyebrow line or subheader ............. var(--sys-sub)
//   body copy / small print .................. var(--text) / var(--muted)
//   a surface ................................ var(--panel) / var(--panel-2) / var(--border)
//   an error, a penalty, a flaw .............. var(--bad)
//   a benefit, a save, "visible" ............. var(--good)
//   item rarity / loot tier (DATA) ........... var(--grade-1..6), var(--bronze), var(--silver)
//   text sitting on an accent fill ........... var(--on-accent)
//
// Wired into `prebuild`, so it runs on deploy. Node only — it is never run by hand
// on a machine without node.

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components"];
const EXTS = new Set([".tsx", ".ts", ".css", ".jsx", ".js"]);

// Whole files whose colours are NOT theme. Each needs a reason, and the reason is
// the review: if you cannot write one, the file does not belong here.
const ALLOW_FILES = {
  "app/globals.css":
    "the palette itself — this is the one file that is allowed to name colours",
  "app/actions/password-reset.ts":
    "an HTML email body. Mail clients do not support CSS custom properties, so a " +
    "token here would render as no colour at all",
  "components/TokenMaker.tsx":
    "ring and metal paint swatches, canvas gradients and a transparency " +
    "checkerboard — paint the user picks for a token they are drawing, not theme",
};

// Whole subtrees, same rule.
const ALLOW_PREFIXES = {
  "app/obr/":
    "standalone <!doctype html> documents served into the Owlbear Rodeo iframe. " +
    "They are not app pages and never load globals.css, so a var() would resolve " +
    "to nothing inside the VTT",
};

// Escape hatch for a single line, written at the usage site so the reason travels
// with the code: put `theme-literal-ok: <why>` on the line itself, or anywhere in
// the comment block directly above it. The whole block counts, because a reason
// worth giving usually takes more than one line — and a marker that only worked on
// the line immediately above would quietly stop applying the moment someone
// expanded the comment.
const MARKER = "theme-literal-ok:";
const COMMENT = /^\s*(\/\/|\/\*|\*)/;
const MAX_LOOKBACK = 12;

function exempted(lines, i) {
  if (lines[i].includes(MARKER)) return true;
  for (let j = i - 1; j >= 0 && i - j <= MAX_LOOKBACK; j--) {
    if (!COMMENT.test(lines[j])) return false; // the block ended; stop looking
    if (lines[j].includes(MARKER)) return true;
  }
  return false;
}

// A var() with a hex fallback is correct and common: var(--panel-2, #161618) keeps
// a component working if it is ever rendered outside the themed body. The token is
// doing the work; the hex is the parachute.
const VAR_FALLBACK = /var\(\s*--[A-Za-z0-9-]+\s*,\s*#[0-9a-fA-F]{3,8}\s*\)/g;

const HEX = /#[0-9a-fA-F]{6}\b/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name.startsWith(".")) continue;
      walk(p, out);
    } else if (EXTS.has(path.extname(e.name))) {
      out.push(p.split(path.sep).join("/"));
    }
  }
  return out;
}

const files = ROOTS.filter((r) => fs.existsSync(r)).flatMap((r) => walk(r));
const violations = [];
let scanned = 0;
let skipped = 0;

for (const f of files) {
  if (ALLOW_FILES[f] || Object.keys(ALLOW_PREFIXES).some((p) => f.startsWith(p))) {
    skipped++;
    continue;
  }
  scanned++;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (exempted(lines, i)) continue;
    // Strip the legitimate idioms before looking for what is left.
    const stripped = line.replace(VAR_FALLBACK, "");
    const hits = stripped.match(HEX);
    if (hits) violations.push({ file: f, line: i + 1, hits, text: line.trim() });
  }
}

if (violations.length === 0) {
  console.log(
    `check-theme-tokens: OK — no hex literals in ${scanned} files ` +
      `(${skipped} allowlisted, see scripts/check-theme-tokens.mjs).`
  );
  process.exit(0);
}

const count = violations.reduce((n, v) => n + v.hits.length, 0);
console.error(
  `\ncheck-theme-tokens: FAILED — ${count} hex colour literal` +
    `${count === 1 ? "" : "s"} in ${violations.length} place` +
    `${violations.length === 1 ? "" : "s"}.\n` +
    `A colour spelled out in markup is a colour that cannot be changed from the\n` +
    `palette. Point it at a role token instead — the header of\n` +
    `scripts/check-theme-tokens.mjs lists which token fits which job.\n`
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.hits.join(" ")}`);
  console.error(`      ${v.text.length > 120 ? v.text.slice(0, 117) + "..." : v.text}`);
}
console.error(
  `\nIf one of these genuinely is not theme — an email body, a document served\n` +
    `outside the app, paint the user chooses — add \`${MARKER} <why>\` on that line,\n` +
    `or the whole file to ALLOW_FILES with a reason.\n`
);
process.exit(1);
