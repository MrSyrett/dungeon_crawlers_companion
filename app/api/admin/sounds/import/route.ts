import { revalidatePath } from "next/cache";
import { bucketStatus, requireAdmin, syncFiles } from "@/lib/sound-library-sync";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST — add every audio file in the bucket to the Sound Library (for files put
// there some other way, e.g. a desktop S3 app). Re-running it is harmless: files
// already in the library are skipped.
export async function POST() {
  if (!(await requireAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  const status = await bucketStatus();
  if (!status.configured) return Response.json({ error: "Sound storage isn't set up yet (no bucket variables)." }, { status: 503 });
  if (status.error) return Response.json({ error: status.error }, { status: 502 });
  const sync = await syncFiles(Object.keys(status.rels));
  revalidatePath("/admin/sounds");
  return Response.json({ ok: true, files: status.files, ...sync });
}
