#!/usr/bin/env node
// Fails the build if the mobile zoom lock has been half-removed.
//
// WHY THIS EXISTS
// The site is meant to behave like an app on a phone, not a zoomable document: a
// fast second tap on a dice button or an HP stepper must not magnify the page, and
// a stray pinch must not leave the whole site scrolled sideways at 1.4x. That takes
// TWO unrelated mechanisms, in different languages, in files nobody edits together,
// and either one going missing leaves a half-lock that looks fine on a desktop:
//
//   1. `touch-action: manipulation` on <html>. This is what kills DOUBLE-TAP zoom,
//      and it is the half that works in every browser, in a tab or on the Home
//      Screen. It lives twice, once per world: app/globals.css for the Next routes,
//      public/tokens.css for the standalone tool surfaces.
//
//   2. `maximum-scale=1, user-scalable=no` in the viewport. This is what kills
//      PINCH zoom. For pages rendered through app/layout.tsx it is that file's
//      `viewport` export — but a route handler that writes its own `<!doctype html>`
//      is NOT wrapped by the layout and inherits nothing, so it needs its own <meta>,
//      and so does each of the thirty standalone templates.
//
//      THE FIRST VERSION OF THIS CHECK MISSED THAT and shipped a half-lock. It
//      asserted the templates and the Next root and declared victory, while
//      app/play/[campaignId]/route.ts — the VTT, the one surface a GM actually runs a
//      session on — kept pinch-zooming, along with four /obr popovers. All six write
//      their own documents. So this now scans EVERY viewport meta in the tree, not a
//      list of places someone remembered.
//
//      Note that iOS Safari honours (2) only in standalone (Home Screen) mode — it
//      ignores both attributes in a normal browser tab, by Apple's choice since iOS
//      10 — which is exactly why (1) is worth having on its own and why the two
//      cannot be collapsed into one.
//
// ZOOMING IS NOT GONE, IT MOVED. Where a surface genuinely needs magnification —
// the Map Maker's canvas, the GM Screen's map window, the Token Maker's token — the
// surface implements its own pinch on its own element, because page zoom takes the
// controls off-screen along with the thing you wanted to look at. Those handlers sit
// behind `touch-action: none`, which this checker also looks for: a canvas that
// loses it goes back to being panned by the browser and its pinch stops arriving.
//
// So if this fails, the fix is almost never to relax the lock.

import fs from "node:fs";
import path from "node:path";

const TEMPLATES = "tools/templates";
const LAYOUT = "app/layout.tsx";
const GLOBALS = "app/globals.css";
const TOKENS = "public/tokens.css";

// Surfaces that implement their own in-element zoom, and the element that must keep
// `touch-action: none` for the gestures to reach it.
const CANVASES = [
  [path.join(TEMPLATES, "dungeon_map_maker.html"), "#map"],
  [path.join(TEMPLATES, "gm_screen.html"), ".doc-frame-wrap.maps-mode"],
  ["components/TokenMaker.tsx", "touch-none"], // Tailwind's spelling of the same thing
  // The VTT board. Its CSS is injected from a JS string in session.js; the pinch
  // handler that depends on it lives in public/vtt/board.js (`pinch` / `updatePinch`).
  ["public/vtt/session.js", "#vtt-canvas"],
];

const problems = [];

// ---- 1. touch-action: manipulation on <html>, in both stylesheets -------------
// Matched as "an html rule containing the declaration" rather than a bare substring
// search, so a mention of the property inside one of the long explanatory comments
// cannot pass for the rule itself.
const htmlRule = /(^|\})\s*(?:[^{}]*(?:^|,)\s*)?html\b[^{}]*\{[^{}]*touch-action\s*:\s*manipulation/m;
for (const f of [GLOBALS, TOKENS]) {
  if (!fs.existsSync(f)) { problems.push(`${f} is missing`); continue; }
  if (!htmlRule.test(fs.readFileSync(f, "utf8")))
    problems.push(`${f} has no \`html { touch-action: manipulation }\` — double-tap zoom is back on`);
}

// ---- 2a. the Next routes' viewport export ------------------------------------
if (!fs.existsSync(LAYOUT)) {
  problems.push(`${LAYOUT} is missing`);
} else {
  const src = fs.readFileSync(LAYOUT, "utf8");
  // Only the `viewport` export's own object, so a `userScalable` mentioned anywhere
  // else in the file cannot stand in for it.
  const m = /export\s+const\s+viewport\s*:\s*Viewport\s*=\s*\{([\s\S]*?)\n\};/.exec(src);
  if (!m) problems.push(`${LAYOUT} has no \`export const viewport: Viewport\` — the Next routes are unlocked`);
  else {
    if (!/\buserScalable\s*:\s*false\b/.test(m[1]))
      problems.push(`${LAYOUT} viewport is missing \`userScalable: false\``);
    if (!/\bmaximumScale\s*:\s*1\b/.test(m[1]))
      problems.push(`${LAYOUT} viewport is missing \`maximumScale: 1\``);
  }
}

// ---- 2b. every viewport meta anywhere in the tree -----------------------------
// Scanned by walking the source, not by consulting a list — a list is what let the
// VTT through. Any file that declares a viewport is declaring it for a document a
// phone can open, so it has to lock zoom.
const metaRe = /<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']\s*\/?>/i;
const metaReG = /<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']\s*\/?>/gi;
const locks = (c) => /\bmaximum-scale\s*=\s*1\b/.test(c) && /\buser-scalable\s*=\s*no\b/.test(c);

// The one deliberate exception: a diagnostic page whose entire job is to report what
// the viewport does, and which needs viewport-fit=cover to do it.
const EXEMPT = new Set(["public/viewport-probe.html"]);

const ROOTS = ["app", "lib", "components", "public", TEMPLATES];
const EXTS = new Set([".html", ".ts", ".tsx", ".js", ".mjs"]);
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".next") walk(p, out); }
    else if (EXTS.has(path.extname(e.name))) out.push(p);
  }
  return out;
}
const all = [...new Set(ROOTS.flatMap((r) => walk(r)))].sort();
let metas = 0;
for (const f of all) {
  const rel = f.split(path.sep).join("/");
  if (EXEMPT.has(rel)) continue;
  const src = fs.readFileSync(f, "utf8");
  // A template's own <head> is its FIRST meta. gm_screen.html carries two more further
  // down, inside the HTML it writes for a PDF/HTML export — a different document's
  // head, printed on paper, and none of this check's business. Everywhere else, every
  // occurrence counts: app/play/[campaignId]/route.ts writes two real documents (the
  // tabletop and the no-access page) from one file.
  const inTemplates = rel.startsWith(`${TEMPLATES}/`);
  const found = inTemplates
    ? [metaRe.exec(src)].filter(Boolean).map((m) => m[1])
    : [...src.matchAll(metaReG)].map((m) => m[1]);
  for (const c of found) {
    metas++;
    if (!locks(c)) problems.push(`${rel} viewport does not lock zoom: "${c}"`);
  }
}

// And every template must HAVE one — a new template copied from an old one is the
// likeliest way for this to regress.
const templates = fs.existsSync(TEMPLATES)
  ? fs.readdirSync(TEMPLATES).filter((f) => f.endsWith(".html")).sort()
  : [];
if (!templates.length) problems.push(`${TEMPLATES} has no templates to check`);
for (const f of templates) {
  const rel = `${TEMPLATES}/${f}`;
  if (!metaRe.test(fs.readFileSync(path.join(TEMPLATES, f), "utf8")))
    problems.push(`${rel} has no viewport meta at all`);
}

// ---- 3. the in-element zoom surfaces keep touch-action: none ------------------
for (const [f, needle] of CANVASES) {
  if (!fs.existsSync(f)) { problems.push(`${f} is missing (expected an own-zoom surface)`); continue; }
  const src = fs.readFileSync(f, "utf8");
  const ok = needle === "touch-none"
    ? /\btouch-none\b/.test(src)
    : new RegExp(`${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^{}]*\\{[^{}]*touch-action\\s*:\\s*none`, "m").test(src);
  if (!ok)
    problems.push(`${f}: ${needle} lost \`touch-action: none\` — its own pinch-zoom will stop receiving gestures`);
}

if (problems.length) {
  console.error(`\ncheck-mobile-zoom: FAILED — ${problems.length} problem${problems.length === 1 ? "" : "s"}.\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(
    `\nThe site is deliberately a fixed size on mobile. Double-tap zoom is off via\n` +
      `\`touch-action: manipulation\` on <html> (app/globals.css + public/tokens.css) and\n` +
      `pinch zoom via the viewport: the \`viewport\` export in app/layout.tsx for pages the\n` +
      `layout wraps, and a <meta> in every file that writes its OWN document — the thirty\n` +
      `templates, app/play/[campaignId]/route.ts, the /obr popovers.\n` +
      `A surface that needs magnification implements pinch on its OWN element behind\n` +
      `\`touch-action: none\` — see the Map Maker's #map, the GM Screen's maps-mode pane,\n` +
      `components/TokenMaker.tsx and public/vtt/board.js. Two usual causes of a failure\n` +
      `here: a new template copied from an old one, and a new route handler that writes\n` +
      `its own <!doctype html>. Add the meta rather than relaxing this check.\n`
  );
  process.exit(1);
}
console.log(
  `check-mobile-zoom: OK — ${metas} viewport metas across ${all.length} scanned files all ` +
    `lock pinch zoom (+ the Next root export), both stylesheets kill double-tap zoom, and ` +
    `${CANVASES.length} own-zoom surfaces keep touch-action: none.`
);
