import { readdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import { isSystemKey, type SystemKey } from "@/components/systemStore";

// Rulebooks live OUTSIDE public/ so Next never serves them statically.
export const RULEBOOK_DIR = path.join(process.cwd(), "protected", "rulebooks");

export type RbUser = { id: string; email: string } | null;

// Which game system's Rulebooks list shows a file. Display-only — it hides
// books behind the dashboard's system toggle, it never gates access. "BOTH"
// is the historical name for "every system" and is kept for stored rows.
export type RulebookSystem = SystemKey | "BOTH";

export type RulebookInfo = { file: string; system: RulebookSystem };

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

// Rulebooks sort into these buckets, shown in this order within each system:
// Core Rules → Quickstarts → Expansions → Adventures. Classification is by
// filename keyword (these are the GM's own files, so the name is the lever):
//   • "quickstart / starter / intro / basic / primer / beginner / free rules" → Quickstarts
//   • "core / rulebook / rules / player(s) / handbook / corebook"             → Core Rules
//   • "adventure / module / scenario / one-shot / dungeon / campaign / quest" → Adventures
//   • anything else (supplement, bestiary, gear, setting, companion, …)       → Expansions
// The FIRST Core-Rules book in a system is therefore its default ("core rule book").
export type RulebookCategory = "Core Rules" | "Quickstarts" | "Expansions" | "Adventures";
const CATEGORY_ORDER: RulebookCategory[] = ["Core Rules", "Quickstarts", "Expansions", "Adventures"];

export function rulebookCategory(file: string): RulebookCategory {
  const n = file.toLowerCase();
  if (/quick[\s_-]?start|starter|intro|basic|primer|beginner|free[\s_-]?rules/.test(n)) return "Quickstarts";
  if (/\bcore\b|rulebook|corebook|core[\s_-]?rules|player'?s?|handbook|\brules\b/.test(n)) return "Core Rules";
  if (/adventure|module|scenario|one[\s_-]?shot|dungeon|campaign|quest/.test(n)) return "Adventures";
  return "Expansions";
}

// Order by category (the four buckets above), then alphabetically within a bucket.
function compareRulebooks(a: string, b: string): number {
  const ca = CATEGORY_ORDER.indexOf(rulebookCategory(a));
  const cb = CATEGORY_ORDER.indexOf(rulebookCategory(b));
  if (ca !== cb) return ca - cb;
  return a.localeCompare(b);
}

// Every PDF sitting in the private directory (.pdf only), ordered by category.
export async function listRulebookFiles(): Promise<string[]> {
  try {
    return (await readdir(RULEBOOK_DIR))
      .filter((f) => f.toLowerCase().endsWith(".pdf"))
      .sort(compareRulebooks);
  } catch {
    return []; // directory missing — treated the same as empty
  }
}

// The books a given user is allowed to see, each with its system tag. Admins
// see all; everyone else sees only files opened to all (everyone=true) or
// granted to them explicitly. Files with no Rulebook row are tagged BOTH.
export async function visibleRulebooks(user: RbUser): Promise<RulebookInfo[]> {
  const files = await listRulebookFiles();
  if (!user || files.length === 0) return [];

  const rows = await prisma.rulebook.findMany({
    where: { file: { in: files } },
    select: { file: true, everyone: true, system: true },
  });
  const systemFor = new Map(rows.map((r) => [r.file, normalizeSystem(r.system)]));
  const withSystem = (file: string): RulebookInfo => ({
    file,
    system: systemFor.get(file) ?? "BOTH",
  });

  if (isAdminEmail(user.email)) return files.map(withSystem);

  const grantRows = await prisma.rulebookAccess.findMany({
    where: { userId: user.id, file: { in: files } },
    select: { file: true },
  });

  const allowed = new Set<string>();
  for (const r of rows) if (r.everyone) allowed.add(r.file);
  for (const r of grantRows) allowed.add(r.file);
  return files.filter((f) => allowed.has(f)).map(withSystem);
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
