import { readdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import { SYSTEMS, isSystemKey, type SystemKey } from "@/components/systemStore";

// ─────────────────────────────────────────────────────────────────────────────
// THE LIBRARY (formerly "Rulebooks")
//
// Every PDF lives OUTSIDE public/ so Next never serves it statically, under
//
//     protected/rulebooks/<System>/<Category>/<Book>.pdf
//
// and its FOLDERS say what it is — drop a PDF in the right place and it shows
// up on the right system's Library shelf, in the right section, with no admin
// step:
//
//   <System>    a folder named for the game system. Matched loosely against
//               each system's key, name and short label (case, spaces and
//               punctuation ignored), plus a few aliases — so "Shadowdark",
//               "SD", "The Lord of the Rings", "LotR", "Alien", "Dungeons &
//               Dragons" and "dnd" all work. A folder named "All Systems"
//               (or "Shared"/"General") shows on every shelf.
//   <Category>  "Core Rules", "Expansions" or "Adventures" (also accepted:
//               core, rules, quickstart(s), expansion, supplements, sourcebooks,
//               adventure, modules, scenarios, campaigns).
//
// Either folder may be missing: a PDF straight in the system folder has its
// category guessed from its filename, and a PDF loose in protected/rulebooks/
// falls back to the system an admin picked for it (the Rulebook DB row) — the
// pre-Library behaviour, so nothing breaks before the files are sorted
// (scripts/organize-library.mjs does the one-time sort).
//
// A book's ID is still its bare FILENAME — the Rulebook / RulebookAccess rows,
// the reader's per-book page memory and public/vendor/rulebook-outlines.json are
// all keyed by it — so moving a file between folders never loses its access
// settings. Filenames must therefore be unique across the whole library; a
// duplicate is skipped (first one wins) and flagged on the admin page.
// ─────────────────────────────────────────────────────────────────────────────

export const RULEBOOK_DIR = path.join(process.cwd(), "protected", "rulebooks");

export type RbUser = { id: string; email: string } | null;

// Which game system's Library shelf shows a file. Display-only — it hides books
// behind the system toggle, it never gates access. "BOTH" is the historical name
// for "every system" and is kept for stored rows.
export type RulebookSystem = SystemKey | "BOTH";

// The three Library sections, in display order. The FIRST Core-Rules book in a
// system is its default ("core rule book").
export type RulebookCategory = "Core Rules" | "Expansions" | "Adventures";
export const LIBRARY_CATEGORIES: RulebookCategory[] = ["Core Rules", "Expansions", "Adventures"];

export type RulebookInfo = {
  file: string; // bare filename — the book's ID
  system: RulebookSystem;
  category: RulebookCategory;
};

// One PDF found on disk.
export type LibraryEntry = {
  file: string; // bare filename (ID)
  rel: string; // path relative to RULEBOOK_DIR, "/"-separated
  folderSystem: RulebookSystem | null; // from its system folder, if any
  folderCategory: RulebookCategory | null; // from its category folder, if any
  category: RulebookCategory; // folder category, else guessed from the filename
};

// Anything unexpected in the DB column degrades to BOTH (never hides a book).
export function normalizeSystem(value: string | undefined | null): RulebookSystem {
  return isSystemKey(value) ? value : "BOTH";
}

// "shadowdark-core-rules.pdf" -> "Shadowdark Core Rules"
export function prettyName(file: string): string {
  return file
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Folder → system ──────────────────────────────────────────────────────────
const squash = (s: string) => s.toLowerCase().replace(/^the\s+/, "").replace(/[^a-z0-9]/g, "");

// Extra names people naturally give a system's folder, beyond key/name/short.
const SYSTEM_ALIASES: Partial<Record<SystemKey, string[]>> = {
  SD: ["shadowdarkrpg"],
  DCC: ["carl", "carlrpg", "dungeoncrawlercarlrpg"],
  DND: ["dd", "dnd", "dnd5e", "dnd2024", "5e", "dungeonsanddragons"],
  NIM: ["nimble5e", "nimblerpg"],
  KOB: ["kidsonbrooms", "kidsincapes"],
  CO: ["candela", "candelaobscura"],
  MMRPG: ["marvelmultiverse", "marvelmultiverserpg", "marvelrpg"],
  JLU: ["justiceleague", "jlurpg", "justiceleagueunlimitedrpg"],
  GB: ["ghostbustersrpg", "ghostbustersinternational"],
  SW: ["starwarsrpg", "starwarsd6", "weg"],
  D62E: ["d6", "d6system", "d6system2e", "d62e"],
  YZE: ["alien", "alienrpg", "yearzero", "yearzeroengine"],
  TWD: ["walkingdead", "twdrpg", "walkingdeaduniverse"],
  MYZ: ["mutant", "mutantyearzero"],
  VAE: ["vaesen", "vaesennordichorror"],
  LOTR: ["lotr", "lordoftherings", "lordoftheringsroleplaying", "lordoftheringsrpg", "theonering", "tor", "lotr5e"],
};
const ALL_SYSTEMS_NAMES = new Set(["all", "allsystems", "both", "shared", "general", "any", "everysystem"]);

const SYSTEM_BY_NAME: Map<string, SystemKey> = (() => {
  const m = new Map<string, SystemKey>();
  for (const s of SYSTEMS) {
    for (const n of [s.key, s.name, s.short, ...(SYSTEM_ALIASES[s.key] ?? [])]) m.set(squash(n), s.key);
  }
  return m;
})();

export function systemFromFolder(name: string): RulebookSystem | null {
  const k = squash(name);
  if (!k) return null;
  if (ALL_SYSTEMS_NAMES.has(k)) return "BOTH";
  return SYSTEM_BY_NAME.get(k) ?? null;
}

// ── Folder / filename → category ─────────────────────────────────────────────
export function categoryFromFolder(name: string): RulebookCategory | null {
  const k = squash(name);
  if (/^(core|corerules?|corebooks?|rules|rulebooks?|basics?|quickstarts?|starters?)$/.test(k)) return "Core Rules";
  if (/^(expansions?|supplements?|sourcebooks?|extras?|addons?|options)$/.test(k)) return "Expansions";
  if (/^(adventures?|modules?|scenarios?|campaigns?|oneshots?|missions?)$/.test(k)) return "Adventures";
  return null;
}

// Books loose in a system folder (or the root) whose filename doesn't carry its
// category. Keyed by exact filename.
const CATEGORY_OVERRIDES: Record<string, RulebookCategory> = {
  "STAR WARS The Roleplaying Game.pdf": "Core Rules",
  "ICRPG Master Edition.pdf": "Core Rules",
  "ACE Omnibus.pdf": "Core Rules",
};

// Filename guess, used only when the book isn't in a category folder:
//   • contains "core", or is a quickstart/starter/intro/primer → Core Rules
//   • "adventure / module / scenario / one-shot / dungeon / quest" → Adventures
//   • everything else (companion, sourcebook, supplement, toolkit …) → Expansions
export function rulebookCategory(file: string): RulebookCategory {
  if (CATEGORY_OVERRIDES[file]) return CATEGORY_OVERRIDES[file];
  const n = file.toLowerCase();
  if (/core|quick[\s_-]?start|starter|\bintro\b|primer|beginner/.test(n)) return "Core Rules";
  if (/adventure|module|scenario|one[\s_-]?shot|dungeon|\bquest\b/.test(n)) return "Adventures";
  return "Expansions";
}

// ── Scanning ─────────────────────────────────────────────────────────────────
const MAX_DEPTH = 3; // root / system / category / (one spare level for sub-sorting)

async function walk(dir: string, relParts: string[], out: string[][]): Promise<void> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // missing directory — treated the same as empty
  }
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    if (e.isDirectory()) {
      if (relParts.length < MAX_DEPTH) await walk(path.join(dir, e.name), [...relParts, e.name], out);
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".pdf")) {
      out.push([...relParts, e.name]);
    }
  }
}

function toEntry(parts: string[]): LibraryEntry {
  const file = parts[parts.length - 1];
  const folders = parts.slice(0, -1);
  let folderSystem: RulebookSystem | null = null;
  let folderCategory: RulebookCategory | null = null;
  // A system folder is matched anywhere in the path (normally first); a category
  // folder likewise (normally second). First match of each wins.
  for (const f of folders) {
    if (!folderSystem) {
      const s = systemFromFolder(f);
      if (s) { folderSystem = s; continue; }
    }
    if (!folderCategory) folderCategory = categoryFromFolder(f);
  }
  return {
    file,
    rel: parts.join("/"),
    folderSystem,
    folderCategory,
    category: folderCategory ?? rulebookCategory(file),
  };
}

// The whole library as found on disk, plus any filenames that appear twice
// (only the first copy is used — IDs are filenames).
export async function scanLibrary(): Promise<{ entries: LibraryEntry[]; duplicates: string[] }> {
  const found: string[][] = [];
  await walk(RULEBOOK_DIR, [], found);
  found.sort((a, b) => a.join("/").localeCompare(b.join("/")));
  const seen = new Set<string>();
  const duplicates: string[] = [];
  const entries: LibraryEntry[] = [];
  for (const parts of found) {
    const e = toEntry(parts);
    if (seen.has(e.file)) { duplicates.push(e.rel); continue; }
    seen.add(e.file);
    entries.push(e);
  }
  entries.sort(compareEntries);
  return { entries, duplicates };
}

// Order by category (Core Rules → Expansions → Adventures), then title — except
// that within Core Rules the full rulebooks come before quickstarts/starters, so
// a system's first book (the one the reader opens by default) is its core book.
const isStarter = (file: string) => /quick[\s_-]?start|starter|\bintro\b|primer|beginner/i.test(file);
function compareEntries(a: LibraryEntry, b: LibraryEntry): number {
  const ca = LIBRARY_CATEGORIES.indexOf(a.category);
  const cb = LIBRARY_CATEGORIES.indexOf(b.category);
  if (ca !== cb) return ca - cb;
  if (a.category === "Core Rules") {
    const sa = isStarter(a.file) ? 1 : 0, sb = isStarter(b.file) ? 1 : 0;
    if (sa !== sb) return sa - sb;
  }
  return a.file.localeCompare(b.file);
}

// Every PDF in the library (bare filenames), ordered by category.
export async function listRulebookFiles(): Promise<string[]> {
  return (await scanLibrary()).entries.map((e) => e.file);
}

// Where a book (by its filename ID) actually sits on disk, or null.
export async function rulebookPath(file: string): Promise<string | null> {
  const hit = (await scanLibrary()).entries.find((e) => e.file === file);
  return hit ? path.join(RULEBOOK_DIR, ...hit.rel.split("/")) : null;
}

// The effective system: the folder decides; a loose file falls back to its
// admin-set DB tag; anything else shows everywhere.
function resolveSystem(e: LibraryEntry, dbSystem: RulebookSystem | undefined): RulebookSystem {
  return e.folderSystem ?? dbSystem ?? "BOTH";
}

// The books a given user is allowed to see, each with its system and category.
// Admins see all; everyone else sees only files opened to all (everyone=true)
// or granted to them explicitly.
export async function visibleRulebooks(user: RbUser): Promise<RulebookInfo[]> {
  const { entries } = await scanLibrary();
  if (!user || entries.length === 0) return [];
  const files = entries.map((e) => e.file);

  const rows = await prisma.rulebook.findMany({
    where: { file: { in: files } },
    select: { file: true, everyone: true, system: true },
  });
  const dbSystem = new Map<string, RulebookSystem>(rows.map((r: { file: string; system: string }) => [r.file, normalizeSystem(r.system)]));
  const info = (e: LibraryEntry): RulebookInfo => ({
    file: e.file,
    system: resolveSystem(e, dbSystem.get(e.file)),
    category: e.category,
  });

  if (isAdminEmail(user.email)) return entries.map(info);

  const grantRows = await prisma.rulebookAccess.findMany({
    where: { userId: user.id, file: { in: files } },
    select: { file: true },
  });

  const allowed = new Set<string>();
  for (const r of rows) if (r.everyone) allowed.add(r.file);
  for (const r of grantRows) allowed.add(r.file);
  return entries.filter((e) => allowed.has(e.file)).map(info);
}

// The filenames a given user is allowed to see (system-agnostic callers).
export async function visibleRulebookFiles(user: RbUser): Promise<string[]> {
  return (await visibleRulebooks(user)).map((b) => b.file);
}

// Whether a user may read one specific file. Used by the streaming route.
export async function canAccessRulebook(user: RbUser, file: string): Promise<boolean> {
  if (!user) return false;
  if (isAdminEmail(user.email)) return true;

  const open = await prisma.rulebook.findUnique({ where: { file }, select: { everyone: true } });
  if (open?.everyone) return true;

  const grant = await prisma.rulebookAccess.findUnique({
    where: { file_userId: { file, userId: user.id } },
    select: { file: true },
  });
  return !!grant;
}
