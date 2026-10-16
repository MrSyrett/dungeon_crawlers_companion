#!/usr/bin/env node
// One-time (and safe-to-rerun) sort of the Library.
//
// Moves PDFs that sit loose in protected/rulebooks/ into
//     protected/rulebooks/<System>/<Core Rules | Expansions | Adventures>/
// so lib/rulebooks.ts can read their system and section straight from the
// folder. After this, new books need no script and no admin step — just drop
// them into the right folder.
//
//   npm run library:organize            dry run: shows what would move
//   npm run library:organize -- --apply actually move (uses `git mv` inside a
//                                       git checkout so history follows the file)
//
// Only books it KNOWS are moved (the table below). Anything else loose at the
// root is listed so you can file it by hand. Files already inside a folder are
// never touched. Book IDs are bare filenames, so moving a file keeps its admin
// access settings (Rulebook / RulebookAccess rows) and chapter outline.

import { existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "protected", "rulebooks");
const APPLY = process.argv.includes("--apply");

// Folder names: each system's display name (without characters Windows forbids,
// e.g. "Mutant: Year Zero" → "Mutant Year Zero"). Any spelling that
// lib/rulebooks.ts systemFromFolder() recognises works for books added later.
const F = {
  SD: "Shadowdark", DCC: "Dungeon Crawler Carl", ICRPG: "Index Card RPG", NIM: "Nimble",
  DND: "Dungeons & Dragons", LOTR: "The Lord of the Rings", KOB: "Kids on Bikes", CO: "Candela Obscura",
  MMRPG: "Marvel Multiverse RPG", JLU: "Justice League Unlimited", GB: "Ghostbusters", SW: "Star Wars",
  ACE: "ACE", D62E: "D6 System 2e", YZE: "Alien RPG", TWD: "The Walking Dead", MYZ: "Mutant Year Zero",
  VAE: "Vaesen",
};
const CORE = "Core Rules", EXP = "Expansions", ADV = "Adventures";

// Every book in the library as of 2026-10-16 → [system, section].
const KNOWN = {
  "shadowdark-core-rules.pdf": ["SD", CORE],
  "Shadowdark Player Quickstart.pdf": ["SD", CORE],
  "Shadowdark Game Master Quickstart.pdf": ["SD", CORE],
  "Cursed Scroll Compilation.pdf": ["SD", EXP],
  "DarkSpace Rulebook.pdf": ["SD", EXP],
  "DarkSpace Quickstart Rules.pdf": ["SD", EXP],

  "Carl RPG Core Rulebook.pdf": ["DCC", CORE],
  "Crawlers.pdf": ["DCC", EXP],
  "Gamemasters Toolkit.pdf": ["DCC", EXP],
  "Par for the Course.pdf": ["DCC", EXP],
  "Rules for Survival.pdf": ["DCC", EXP],
  "Atlas Tutorial Floors.pdf": ["DCC", ADV],

  "ICRPG Master Edition.pdf": ["ICRPG", CORE],
  "ICRPG Adventures.pdf": ["ICRPG", ADV],

  "Nimble CoreRules.pdf": ["NIM", CORE],
  "Nimble Heroes.pdf": ["NIM", EXP],
  "Nimble GMG.pdf": ["NIM", EXP],
  "Nimble 5e.pdf": ["NIM", EXP],

  "Lord of the Rings Rules.pdf": ["LOTR", CORE],

  "Kids on Bikes Second Edition Core Rulebook.pdf": ["KOB", CORE],
  "Kids on Brooms.pdf": ["KOB", EXP],
  "Kids in Capes.pdf": ["KOB", EXP],
  "Never Stop Blowing Up.pdf": ["KOB", EXP],

  "Candela Obscura Core Rulebook.pdf": ["CO", CORE],

  "Marvel Multiverse RPG Core Rule Book.pdf": ["MMRPG", CORE],
  "Marvel Multiverse RPG Quickstart with Thunderbolts Adventure.pdf": ["MMRPG", CORE],
  "Marvel Multiverse RPG Avengers Expansion.pdf": ["MMRPG", EXP],
  "Marvel Multiverse RPG Spider verse Expansion.pdf": ["MMRPG", EXP],
  "Marvel Multiverse RPG X Men Expansion.pdf": ["MMRPG", EXP],
  "Marvel Multiverse RPG Secret Wars.pdf": ["MMRPG", EXP],

  "JLURPG Quickstart.pdf": ["JLU", CORE],

  "GB Training Manual.pdf": ["GB", CORE],
  "GB Operations Manual.pdf": ["GB", CORE],
  "Ghostbusters International.pdf": ["GB", CORE],

  "STAR WARS The Roleplaying Game.pdf": ["SW", CORE],
  "STAR WARS Sourcebook.pdf": ["SW", EXP],
  "STARWARS Rules Companion.pdf": ["SW", EXP],

  "ACE Omnibus.pdf": ["ACE", CORE],
  "D62e Core Rulebook.pdf": ["D62E", CORE],
  "ALIEN RPG Core Rulebook.pdf": ["YZE", CORE],
  "The Walking Dead RPG Core Rules.pdf": ["TWD", CORE],
  "Mutant Year Zero Core Rulebook.pdf": ["MYZ", CORE],
  "Vaesen Core Rulebook.pdf": ["VAE", CORE],
};

function inGit() {
  try { execFileSync("git", ["rev-parse", "--is-inside-work-tree"], { cwd: ROOT, stdio: "ignore" }); return true; }
  catch { return false; }
}
function tracked(rel) {
  try { execFileSync("git", ["ls-files", "--error-unmatch", rel], { cwd: ROOT, stdio: "ignore" }); return true; }
  catch { return false; }
}

if (!existsSync(LIB)) { console.log("No protected/rulebooks/ folder — nothing to do."); process.exit(0); }

const loose = readdirSync(LIB, { withFileTypes: true }).filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf")).map((e) => e.name);
const git = APPLY && inGit();
const moves = [], unknown = [];
for (const name of loose) {
  const hit = KNOWN[name];
  if (!hit) { unknown.push(name); continue; }
  moves.push({ name, dir: path.join(F[hit[0]], hit[1]) });
}

console.log(`${APPLY ? "Moving" : "Would move"} ${moves.length} book(s):`);
for (const m of moves) {
  const fromRel = path.join("protected", "rulebooks", m.name);
  const toDirAbs = path.join(LIB, m.dir);
  const toRel = path.join("protected", "rulebooks", m.dir, m.name);
  console.log(`  ${m.name}  →  ${path.join(m.dir, m.name)}`);
  if (!APPLY) continue;
  mkdirSync(toDirAbs, { recursive: true });
  if (existsSync(path.join(toDirAbs, m.name))) { console.log("    (already there — skipped)"); continue; }
  if (git && tracked(fromRel)) execFileSync("git", ["mv", fromRel, toRel], { cwd: ROOT });
  else renameSync(path.join(LIB, m.name), path.join(toDirAbs, m.name));
}
if (unknown.length) {
  console.log(`\nNot in the known list — file these by hand into <System>/<Core Rules|Expansions|Adventures>/:`);
  for (const u of unknown) console.log(`  ${u}`);
}
if (!APPLY && moves.length) console.log("\nDry run only. Re-run with --apply to move them:  npm run library:organize -- --apply");
if (APPLY) console.log(git ? "\nDone. The moves are staged as git renames — commit them." : "\nDone.");
