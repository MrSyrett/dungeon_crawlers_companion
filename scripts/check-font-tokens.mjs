#!/usr/bin/env node
// Guards the next/font custom properties: app/layout.tsx produces them, app/globals.css
// spends them, and nothing else in the toolchain checks that the two agree.
//
//     node scripts/check-font-tokens.mjs        (also: npm run fonts:tokens)
//
// WHY THIS EXISTS
// `Archivo_Black` and `Archivo` both carried `variable: "--font-archivo"` for weeks.
// next/font turns each call into a class that sets that property, and app/layout.tsx
// puts EVERY one of those classes on the same <html> element — so two rules, same
// specificity, same element, and whichever CSS Next emitted later simply won. Archivo
// is declared second, so Star Wars' headings rendered in regular Archivo at 400 instead
// of the one-weight Black the design is built on. The `"Archivo Black"` fallback in the
// globals.css stack never rescued it either, because a fallback is only reached when the
// var resolves to NOTHING, and this one resolved to a real family.
//
// Nothing warned. It is valid TypeScript, valid CSS, and a clean build. The only symptom
// was a system looking slightly wrong, which is indistinguishable from a design choice.
//
// Two checks, and the second is the one that catches typos:
//
//   1. No CSS custom property is bound by more than one font call. A duplicate
//      `variable:` is always a bug — the whole point of the property is to name one face.
//
//   2. Every `--font-*` token globals.css spends is produced by some font call. A token
//      that nothing produces resolves to nothing and the element silently falls through
//      to the next entry in its font stack.
//
// Deliberately NOT part of scripts/check-fonts.mjs, which guards the self-hosted
// @font-face pipeline: that script currently fails on a real coverage gap (font
// self-hosting batches 3-4 are unfinished, ~75 manifest faces are not in
// public/fonts/google yet), so it cannot go in `prebuild` without breaking the build.
// This one is cheap, orthogonal and green, so it can.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LAYOUT = "app/layout.tsx";
const CSS = "app/globals.css";

const fails = [];

const layoutPath = path.join(ROOT, LAYOUT);
const cssPath = path.join(ROOT, CSS);

let produced = new Map(); // token -> how many font calls bind it
let spent = new Set();

if (!fs.existsSync(layoutPath)) {
  fails.push(`${LAYOUT} not found`);
} else {
  const layout = fs.readFileSync(layoutPath, "utf8");

  // Matched on the `variable:` property rather than on a list of font function names,
  // so a family imported from a different next/font entry point is still covered.
  for (const m of layout.matchAll(/\bvariable:\s*["'](--font-[a-z0-9-]+)["']/gi)) {
    produced.set(m[1], (produced.get(m[1]) ?? 0) + 1);
  }
  if (!produced.size) {
    fails.push(`${LAYOUT} declares no \`variable: "--font-…"\` at all — has the font setup moved?`);
  }

  for (const [tok, n] of produced) {
    if (n > 1) {
      fails.push(
        `${LAYOUT}: ${n} font calls both bind ${tok}. Their classes land on the same ` +
          `element, so one face silently wins — give each its own token.`,
      );
    }
  }
}

if (!fs.existsSync(cssPath)) {
  fails.push(`${CSS} not found`);
} else {
  // Comments are stripped FIRST. The notes in layout.tsx and globals.css explaining this
  // very bug name the old token, and a checker that reads its own documentation as code
  // invents findings — the mistake check-standalone-fonts.mjs already made once.
  const code = fs.readFileSync(cssPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  spent = new Set([...code.matchAll(/var\(\s*(--font-[a-z0-9-]+)/gi)].map((m) => m[1]));
  for (const tok of [...spent].sort()) {
    if (produced.size && !produced.has(tok)) {
      fails.push(
        `${CSS} spends ${tok}, which no font call in ${LAYOUT} produces — it resolves to ` +
          `nothing, so the page falls back to whatever is next in that font stack.`,
      );
    }
  }
}

if (fails.length) {
  console.error(`\ncheck-font-tokens: FAILED — ${fails.length} problem${fails.length === 1 ? "" : "s"}.\n`);
  for (const f of fails) console.error(`  ${f}`);
  console.error(
    `\nEvery next/font call needs its own custom property, and every --font-* token\n` +
      `${CSS} spends needs a call that produces it. Both failures are silent at runtime:\n` +
      `a duplicate means one face quietly loses, a missing one means an unchosen fallback.\n`,
  );
  process.exit(1);
}

console.log(
  `check-font-tokens: OK — ${produced.size} next/font variables in ${LAYOUT}, each bound ` +
    `exactly once; ${spent.size} spent in ${CSS}, all produced.`,
);
