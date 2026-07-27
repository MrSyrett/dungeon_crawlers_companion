import { readdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

// Rulebooks live OUTSIDE public/ so Next never serves them statically.
export const RULEBOOK_DIR = path.join(process.cwd(), "protected", "rulebooks");

export type RbUser = { id: string; email: string } | null;

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

// The files a given user is allowed to see. Admins see all; everyone else sees
// only files opened to all (everyone=true) or granted to them explicitly.
export async function visibleRulebookFiles(user: RbUser): Promise<string[]> {
  const files = await listRulebookFiles();
  if (!user || files.length === 0) return user && isAdminEmail(user.email) ? files : [];
  if (isAdminEmail(user.email)) return files;

  const [openRows, grantRows] = await Promise.all([
    prisma.rulebook.findMany({ where: { everyone: true, file: { in: files } }, select: { file: true } }),
    prisma.rulebookAccess.findMany({ where: { userId: user.id, file: { in: files } }, select: { file: true } }),
  ]);

  const allowed = new Set<string>();
  for (const r of openRows) allowed.add(r.file);
  for (const r of grantRows) allowed.add(r.file);
  return files.filter((f) => allowed.has(f));
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
