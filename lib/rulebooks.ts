import { readdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

// Rulebooks live OUTSIDE public/ so Next never serves them statically.
export const RULEBOOK_DIR = path.join(process.cwd(), "protected", "rulebooks");

export type RbUser = { id: string; email: string } | null;

// Which game system's Rulebooks list shows a file. Display-only — it hides
// books behind the dashboard's Shadowdark/DCC toggle, it never gates access.
export type RulebookSystem = "SD" | "DCC" | "BOTH";

export type RulebookInfo = { file: string; system: RulebookSystem };

// Anything unexpected in the DB column degrades to BOTH (never hides a book).
export function normalizeSystem(value: string | undefined | null): RulebookSystem {
  return value === "SD" || value === "DCC" ? value : "BOTH";
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

// Every PDF sitting in the private directory (sorted, .pdf only).
export async function listRulebookFiles(): Promise<string[]> {
  try {
    return (await readdir(RULEBOOK_DIR)).filter((f) => f.toLowerCase().endsWith(".pdf")).sort();
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
