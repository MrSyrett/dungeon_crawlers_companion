import { rm } from "node:fs/promises";
import { VOLUME_DIR } from "@/lib/rulebooks";
import { changed, coverFilesFor, entryPath, findEntry, isWritable, requireAdmin, safePdfName } from "@/lib/library-admin";

export const dynamic = "force-dynamic";

// POST /api/admin/library/delete  { file }
// Removes a book's PDF and its cover image(s) from the volume. Its access
// settings (Rulebook / RulebookAccess rows) are kept, so re-uploading a book
// under the same file name restores who could read it. Books that only exist in
// the repo can't be deleted from here — they are removed from git.
export async function POST(req: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Admins only." }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const file = safePdfName(body.file);
  if (!file) return Response.json({ error: "Missing book." }, { status: 400 });
  const e = await findEntry(file);
  if (!e) return Response.json({ error: "No such book." }, { status: 404 });
  if (!isWritable(e)) {
    return Response.json({ error: VOLUME_DIR ? "This book is in the repo, not on the volume — remove it from git instead." : "This book can't be deleted from here." }, { status: 400 });
  }
  for (const c of await coverFilesFor(e)) await rm(c, { force: true });
  await rm(entryPath(e), { force: true });
  changed();
  return Response.json({ ok: true });
}
