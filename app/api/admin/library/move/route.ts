import path from "node:path";
import { mkdir, rename } from "node:fs/promises";
import { VOLUME_DIR } from "@/lib/rulebooks";
import { changed, destDir, entryPath, findEntry, isWritable, parseCategory, parseSystem, requireAdmin, safePdfName } from "@/lib/library-admin";

export const dynamic = "force-dynamic";

// POST /api/admin/library/move  { file, system, category }
// Re-shelves a book: moves its PDF (and a cover kept beside it) to the
// <System>/<Section> folder. The book ID — its file name — is unchanged, so its
// access settings, chapter outline and readers' page memory all carry over.
export async function POST(req: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Admins only." }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const file = safePdfName(body.file);
  const system = parseSystem(body.system);
  const category = parseCategory(body.category);
  if (!file || !system || !category) return Response.json({ error: "Missing book, game or section." }, { status: 400 });
  const e = await findEntry(file);
  if (!e) return Response.json({ error: "No such book." }, { status: 404 });
  if (!isWritable(e)) {
    return Response.json({ error: VOLUME_DIR ? "This book is still only in the repo. Copy the bundled books to the volume first." : "This book can't be moved from here." }, { status: 400 });
  }
  const from = entryPath(e);
  const dir = destDir(system, category);
  const to = path.join(dir, file);
  if (from === to) return Response.json({ ok: true, unchanged: true });
  await mkdir(dir, { recursive: true });
  await rename(from, to);
  // A cover image kept beside the PDF travels with it.
  const base = file.replace(/\.pdf$/i, "");
  for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
    await rename(path.join(path.dirname(from), base + ext), path.join(dir, base + ext)).catch(() => {});
  }
  changed();
  return Response.json({ ok: true });
}
