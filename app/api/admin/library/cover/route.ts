import path from "node:path";
import { rm } from "node:fs/promises";
import type { NextRequest } from "next/server";
import { WRITE_ROOT, coverDirFor } from "@/lib/rulebooks";
import { MAX_COVER_BYTES, changed, findEntry, requireAdmin, safePdfName, streamToFile } from "@/lib/library-admin";

export const dynamic = "force-dynamic";

const EXT: Record<string, string> = { "image/webp": ".webp", "image/jpeg": ".jpg", "image/png": ".png" };

// POST /api/admin/library/cover?file=Book.pdf — body: the cover image (webp /
// jpeg / png). Saved as <WRITE_ROOT>/.covers/<Book>.<ext>, the shelf's cover for
// that book. The admin page sends page 1 rendered in the browser right after an
// upload, so the server never has to render a PDF itself.
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return Response.json({ error: "Admins only." }, { status: 403 });
  const file = safePdfName(req.nextUrl.searchParams.get("file"));
  const ext = EXT[(req.headers.get("content-type") || "").split(";")[0].trim()];
  if (!file || !(await findEntry(file))) return Response.json({ error: "No such book." }, { status: 404 });
  if (!ext) return Response.json({ error: "Covers must be WebP, JPEG or PNG." }, { status: 400 });
  if (!req.body) return Response.json({ error: "No image was sent." }, { status: 400 });
  const base = file.replace(/\.pdf$/i, "");
  const dir = coverDirFor(WRITE_ROOT);
  try {
    // One cover per book: clear any other format first.
    for (const other of Object.values(EXT)) if (other !== ext) await rm(path.join(dir, base + other), { force: true });
    await streamToFile(req.body, path.join(dir, base + ext), MAX_COVER_BYTES);
    changed();
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Cover upload failed." }, { status: 400 });
  }
}
