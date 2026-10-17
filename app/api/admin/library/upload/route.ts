import path from "node:path";
import { rm } from "node:fs/promises";
import type { NextRequest } from "next/server";
import {
  MAX_PDF_BYTES, changed, destDir, folderNameFor, entryPath, findEntry, isWritable,
  parseCategory, parseSystem, requireAdmin, safePdfName, streamToFile,
} from "@/lib/library-admin";

export const dynamic = "force-dynamic";

// POST /api/admin/library/upload?system=SD&category=Core%20Rules&name=Book.pdf[&replace=1]
// Body: the raw PDF bytes (Content-Type: application/pdf), streamed straight to
// disk — no multipart parsing, no size limit beyond MAX_PDF_BYTES. Admin only.
// Lands at <WRITE_ROOT>/<System>/<Section>/<name>. A name already in the library
// is refused unless replace=1 (book IDs are file names — a second copy would be
// ignored by the scan).
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return Response.json({ error: "Admins only." }, { status: 403 });
  const q = req.nextUrl.searchParams;
  const system = parseSystem(q.get("system"));
  const category = parseCategory(q.get("category"));
  const name = safePdfName(q.get("name"));
  if (!system) return Response.json({ error: "Pick a game." }, { status: 400 });
  if (!category) return Response.json({ error: "Pick a section." }, { status: 400 });
  if (!name) return Response.json({ error: "The file must be a .pdf with an ordinary name." }, { status: 400 });
  if (!req.body) return Response.json({ error: "No file was sent." }, { status: 400 });

  const existing = await findEntry(name);
  const replace = q.get("replace") === "1";
  if (existing && !replace) {
    return Response.json({ error: `"${name}" is already in the Library (${existing.rel}).`, exists: true }, { status: 409 });
  }

  const dest = path.join(destDir(system, category), name);
  try {
    const bytes = await streamToFile(req.body, dest, MAX_PDF_BYTES, (h) => h.subarray(0, 5).toString("latin1") === "%PDF-");
    // Replacing a book that sat in a different folder of the same root: drop the old copy.
    if (existing && isWritable(existing) && entryPath(existing) !== dest) await rm(entryPath(existing), { force: true });
    changed();
    return Response.json({ ok: true, file: name, bytes, rel: `${folderNameFor(system)}/${category}/${name}` });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Upload failed." }, { status: 400 });
  }
}
