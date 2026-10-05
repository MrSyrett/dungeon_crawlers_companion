#!/usr/bin/env node
// Fails the build when app/globals.css and public/tokens.css disagree about the
// value of a colour they BOTH define.
//
// WHY THIS EXISTS
// There are two palettes, on purpose. Tailwind needs the tokens in
// app/globals.css; the surfaces Next does not render — the standalone character
// sheets, the session prep builders, the GM Screen, the Map Maker, the VTT —
// load public/tokens.css instead, because a route handler serving a raw document
// never loads the app's stylesheet. tokens.css says so in its own header and asks
// to be kept in sync by hand.
//
// Hand-sync had already failed twice when this check was written:
//   --nimble  globals #2f9b63   tokens.css #3fb97a   (app corrected, copy wasn't)
//   --mmrpg   globals #c8102e   tokens.css #EC1D24   (brand red darkened)
// Nobody notices, because nothing breaks: a sheet just quietly wears a different
// red from the page that links to it.
//
// WHAT THIS DOES AND DOESN'T CHECK
// It compares only tokens defined in BOTH files' :root blocks, and only colours.
// tokens.css carrying FEWER tokens is fine and expected — it is a subset for the
// tool surfaces, and the four role tokens (--sys-head/--sys-sub/--sys-link) plus
// the semantic scale are deliberately not mirrored there, because those surfaces
// have their own --ui-* language. A missing token is reported as a count, never
// as a failure. Per-system blocks are out of scope: the two files legitimately
// structure those differently (:root[data-system] vs :root[data-themed][data-system]).

import fs from "node:fs";

const GLOBALS = "app/globals.css";
const TOKENS = "public/tokens.css";

// Values that MUST differ, each with the reason. These are the whole point of
// having two files, so they are checked in reverse: if one of these ever matches,
// something has been flattened that should not have been.
const INTENTIONAL = {
  gold:
    "on the tool surfaces --gold points at --accent, because there --gold means " +
    "'the old accent token' rather than Shadowdark's gold (tokens.css header)",
};

function rootTokens(path) {
  let s = fs.readFileSync(path, "utf8");
  s = s.replace(/\/\*[\s\S]*?\*\//g, ""); // comments first, so commented-out tokens don't count
  const i = s.indexOf(":root");
  if (i < 0) throw new Error(`${path}: no :root block`);
  const j = s.indexOf("}", i);
  const block = s.slice(i, j);
  const out = new Map();
  for (const m of block.matchAll(/--([A-Za-z0-9-]+)\s*:\s*([^;}]+)[;}]/g)) {
    if (!out.has(m[1])) out.set(m[1], m[2].trim());
  }
  return out;
}

// Follow var(--x) chains within the same file, so `--mmrpg: var(--crimson)`
// compares as the colour it actually resolves to.
function resolve(name, map, seen = new Set()) {
  const v = map.get(name);
  if (v === undefined) return null;
  const m = /^var\(\s*--([A-Za-z0-9-]+)\s*\)$/.exec(v);
  if (m && !seen.has(m[1])) return resolve(m[1], map, new Set([...seen, name]));
  return v;
}
const isColour = (v) => typeof v === "string" && /^#[0-9a-fA-F]{3,8}$/.test(v);

const G = rootTokens(GLOBALS);
const T = rootTokens(TOKENS);

const drift = [];
const flattened = [];
let compared = 0;
let onlyInApp = 0;

for (const name of G.keys()) {
  if (name.startsWith("font-")) continue;
  const a = resolve(name, G);
  if (!T.has(name)) {
    if (isColour(a)) onlyInApp++;
    continue;
  }
  const b = resolve(name, T);
  if (!isColour(a) || !isColour(b)) continue;
  compared++;
  const same = a.toLowerCase() === b.toLowerCase();
  if (INTENTIONAL[name]) {
    if (same) flattened.push({ name, value: a, why: INTENTIONAL[name] });
  } else if (!same) {
    drift.push({ name, app: a, tools: b });
  }
}

if (!drift.length && !flattened.length) {
  console.log(
    `check-token-parity: OK — ${compared} shared colours agree between ` +
      `${GLOBALS} and ${TOKENS} (${onlyInApp} app-only tokens not mirrored, by design; ` +
      `${Object.keys(INTENTIONAL).length} deliberately different).`
  );
  process.exit(0);
}

if (drift.length) {
  console.error(
    `\ncheck-token-parity: FAILED — ${drift.length} colour${drift.length === 1 ? "" : "s"} ` +
      `${drift.length === 1 ? "disagrees" : "disagree"} between the two palettes.\n` +
      `A sheet or prep builder will wear a different colour from the page that links\n` +
      `to it, and nothing will look broken enough to notice.\n`
  );
  for (const d of drift) {
    console.error(`  --${d.name}`);
    console.error(`      ${GLOBALS}: ${d.app}`);
    console.error(`      ${TOKENS}: ${d.tools}`);
  }
  console.error(
    `\nPick the value you want and set it in BOTH files. If the two must differ,\n` +
      `add the token to INTENTIONAL in this script with the reason.\n`
  );
}

if (flattened.length) {
  console.error(
    `\ncheck-token-parity: FAILED — ${flattened.length} token${flattened.length === 1 ? "" : "s"} ` +
      `that should DIFFER now match.\n`
  );
  for (const f of flattened) {
    console.error(`  --${f.name} is ${f.value} in both files, but: ${f.why}`);
  }
}

process.exit(1);
