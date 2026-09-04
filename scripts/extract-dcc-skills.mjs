// Fill in DCC skills that the experience / background / deity tables reference but
// which are missing from data/dcc/skills.json — pulled from the rulebooks you own.
//
// The Core rulebook defines each Utility Skill as a block:
//   DODGE                      (ALL-CAPS name heading)
//   Intelligence               (governing stat, sometimes)
//   <description…>
//   Passive / Interrupt        (flags, when present)
//   Limitations: …
//   UPGRADES
//   Rank 5: …   Rank 10: …   Rank 15: …
// This reads your licensed PDFs (as pre-dumped text via --from-text, or via pdfjs),
// finds that block for each missing referenced skill, and writes a skills.json entry.
//
// It reads ONLY local files and writes ONLY your own data. Nothing is fetched or sent.
//
// Usage:
//   node scripts/extract-dcc-skills.mjs --from-text extracted            # dry run: triage report
//   node scripts/extract-dcc-skills.mjs --from-text extracted --write    # write + regenerate
//   node scripts/extract-dcc-skills.mjs --pdf-dir protected/rulebooks    # read PDFs directly
//
// Dry run reproduces NO prose beyond a short preview — it reports which referenced
// skills have a real definition block ("real skill") vs none ("flavor perk"). Review
// before --write.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "data", "dcc", "skills.json");
const TS_OUT = join(ROOT, "lib", "data", "dcc-skills.ts");
const JS_OUT = join(ROOT, "public", "tools-data", "dcc-skills.js");
const SPELLS = join(ROOT, "data", "dcc", "spells.json");
const EXPERIENCES = join(ROOT, "data", "dcc", "experiences.json");
const BACKGROUNDS = join(ROOT, "data", "dcc", "backgrounds.json");
const DEITIES = join(ROOT, "data", "dcc", "deities.json");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const WRITE = flag("--write");
const PDF_DIR = join(ROOT, opt("--pdf-dir", "protected/rulebooks"));
const FROM_TEXT = opt("--from-text", null);

async function loadPdfText(dir) {
  let pdfjs;
  try { pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs"); }
  catch { console.error("[!] pdfjs-dist not installed; use --from-text with pdftotext dumps."); process.exit(1); }
  if (!existsSync(dir)) { console.error(`[!] PDF dir not found: ${dir}`); process.exit(1); }
  let all = "";
  for (const f of readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf"))) {
    const data = new Uint8Array(readFileSync(join(dir, f)));
    const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      all += (await page.getTextContent()).items.map((it) => it.str || "").join(" ") + "\n";
    }
  }
  return all;
}
function loadTextDir(dir) {
  const d = join(ROOT, dir);
  if (!existsSync(d)) { console.error(`[!] --from-text dir not found: ${d}`); process.exit(1); }
  const files = readdirSync(d).filter((f) => f.toLowerCase().endsWith(".txt"));
  if (!files.length) { console.error(`[!] No .txt in ${d}`); process.exit(1); }
  return files.map((f) => readFileSync(join(d, f), "utf8")).join("\n");
}
function normalize(raw) {
  return raw.replace(/-\s*\n\s*/g, "").replace(/\s+/g, " ").trim();
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ── Which referenced skill names are missing from the data? ─────────────────
function refNorm(s) {
  return String(s).toLowerCase().replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+(skill|spell)s?$/i, "")
    .replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}
const skills = JSON.parse(readFileSync(SKILLS, "utf8"));
const spells = JSON.parse(readFileSync(SPELLS, "utf8"));
const known = new Set([...skills.map((s) => refNorm(s.name)), ...spells.map((s) => refNorm(s.name))]);

const referenced = new Map(); // refNorm -> display name (first seen)
function collect(rows, get) {
  for (const r of rows) for (const raw of (get(r) || [])) {
    const s = String(raw).trim();
    if (!s || /of choice|any |choose|weapon skill|spell of|skill of|your /i.test(s)) continue;
    const k = refNorm(s);
    if (k && !known.has(k) && !referenced.has(k)) referenced.set(k, s.replace(/\s+(skill|spell)s?$/i, "").replace(/\s*\(.*?\)\s*/g, "").trim());
  }
}
collect(JSON.parse(readFileSync(EXPERIENCES, "utf8")), (e) => e.skills);
collect(JSON.parse(readFileSync(BACKGROUNDS, "utf8")), (b) => b.skills);
collect(JSON.parse(readFileSync(DEITIES, "utf8")), (d) => d.signatureSkills);

// ── Capture a skill's definition block from the book text ───────────────────
const STAT_WORDS = { Strength: "STR", Intelligence: "INT", Constitution: "CON", Dexterity: "DEX", Charisma: "CHA" };
function captureSkill(text, name) {
  // ALL-CAPS heading as a standalone run (the book prints skill names in caps).
  const head = new RegExp("\\b" + esc(name.toUpperCase()) + "\\b", "g");
  let m, best = null;
  while ((m = head.exec(text)) !== null) {
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 1400);
    // A real skill block has an UPGRADES / Rank 5 ladder within reach.
    if (/\bUPGRADES\b|\bRank\s*5:/i.test(after)) { best = { index: m.index + m[0].length, after }; break; }
  }
  if (!best) return null;
  const seg = best.after;
  // Governing stat if the next token is a stat word.
  let stat = null;
  const sm = seg.match(/^\s*(Strength|Intelligence|Constitution|Dexterity|Charisma)\b/);
  if (sm) stat = STAT_WORDS[sm[1]];
  const passive = /\bPassive\b/.test(seg.slice(0, 400));
  const interrupt = /\bInterrupt\b/.test(seg.slice(0, 400));
  // Description = up to UPGRADES / the flags, cleaned of the flag words.
  const upIdx = seg.search(/\bUPGRADES\b|\bRank\s*5:/i);
  let desc = seg.slice(0, upIdx < 0 ? 300 : upIdx);
  if (sm) desc = desc.slice(sm[0].length);
  desc = desc.replace(/\b(Passive|Interrupt)\b/g, " ").replace(/\bLimitations:.*$/i, " ").replace(/\s+/g, " ").trim();
  // Upgrades: Rank 5/10/15 clauses.
  const upgrades = [];
  for (const rk of [5, 10, 15]) {
    const re = new RegExp("Rank\\s*" + rk + ":\\s*([\\s\\S]*?)(?=Rank\\s*(?:5|10|15):|\\bUPGRADES\\b|\\b[A-Z]{3,}\\b\\s[A-Z]|Copyright|$)", "i");
    const um = seg.match(re);
    if (um && um[1]) {
      const txt = um[1].replace(/\s+/g, " ").trim().replace(/[.;]\s*[A-Z][a-z].*$/, (s) => s); // keep as-is
      if (txt && txt.length > 3 && txt.length < 400) upgrades.push({ rank: rk, text: txt });
    }
  }
  // Trim desc to the last complete sentence and sanity-check.
  const stop = Math.max(desc.lastIndexOf(". "), desc.lastIndexOf(".”"));
  if (stop > 40) desc = desc.slice(0, stop + 1);
  if (!/^[A-Z"“]/.test(desc) || desc.length < 25 || desc.length > 1000) return null;
  return { stat, passive, interrupt, desc, upgrades };
}

// ── Run ─────────────────────────────────────────────────────────────────────
console.log(FROM_TEXT ? `Reading text from ${FROM_TEXT}/` : `Reading PDFs from ${PDF_DIR}/`);
const text = normalize(FROM_TEXT ? loadTextDir(FROM_TEXT) : await loadPdfText(PDF_DIR));

const real = [], flavor = [];
for (const [, name] of referenced) {
  const cap = captureSkill(text, name);
  if (cap) real.push({ name, ...cap }); else flavor.push(name);
}

console.log(`\nReferenced skills missing from skills.json: ${referenced.size}`);
console.log(`  • Real (definition block found): ${real.length}`);
console.log(`  • Flavor / no book definition:   ${flavor.length}`);
console.log(`\n── REAL skills (extractable) ──`);
for (const r of real) console.log(`  ✓ ${r.name}${r.stat ? " [" + r.stat + "]" : ""} — ${r.desc.slice(0, 70)}…`);
console.log(`\n── FLAVOR perks (leave as unofficial) ──`);
console.log("  " + flavor.slice(0, 80).join(", ") + (flavor.length > 80 ? ` … +${flavor.length - 80}` : ""));

if (WRITE) {
  const BANNER = "// GENERATED FILE - do not edit by hand.\n// Source: data/dcc/skills.json - regenerate with: node scripts/build-dcc-data.mjs";
  for (const r of real) {
    skills.push({
      name: r.name, category: "utility", stat: r.stat, passive: r.passive, interrupt: r.interrupt,
      desc: r.desc, upgrades: r.upgrades, page: 0, source: "Core",
    });
  }
  const body = JSON.stringify(skills, null, 2);
  writeFileSync(SKILLS, body + "\n");
  writeFileSync(TS_OUT, BANNER + '\n\nimport type { DccSkill } from "./dcc-types";\n\nexport const DCC_SKILLS: DccSkill[] = ' + body + ";\n");
  writeFileSync(JS_OUT, BANNER + "\n\nconst DCC_SKILLS = " + body + ";\n");
  console.log(`\nWrote ${real.length} skills into ${basename(SKILLS)} and regenerated dcc-skills.ts / .js.`);
} else {
  console.log("\nDry run — nothing written. Review, then re-run with --write.");
}
