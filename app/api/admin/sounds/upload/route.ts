import { revalidatePath } from "next/cache";
import { putObject } from "@/lib/s3";
import { MAX_SOUND_BYTES, SOUND_PREFIX, audioMime, placeFile, soundBucket } from "@/lib/sound-files";
import { requireAdmin, syncFiles } from "@/lib/sound-library-sync";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST /api/admin/sounds/upload?path=<path inside the chosen folder>
// Body: the audio file. Stores it in the bucket under
// sounds/<Category>/<Subcategory>/<file> (placed from the folders in `path` —
// see placeFile) and adds it to the Sound Library straight away.
export async function POST(req: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  const cfg = soundBucket();
  if (!cfg) return Response.json({ error: "Sound storage isn't set up yet (no bucket variables)." }, { status: 503 });

  const place = placeFile(new URL(req.url).searchParams.get("path") || "");
  if (!place) return Response.json({ error: "Not an audio file." }, { status: 400 });
  const declared = +(req.headers.get("content-length") || 0);
  if (declared > MAX_SOUND_BYTES) return Response.json({ error: "File is larger than 200 MB." }, { status: 413 });

  const body = Buffer.from(await req.arrayBuffer());
  if (!body.length) return Response.json({ error: "The upload was empty." }, { status: 400 });
  if (body.length > MAX_SOUND_BYTES) return Response.json({ error: "File is larger than 200 MB." }, { status: 413 });

  try {
    await putObject(cfg, SOUND_PREFIX + place.rel, body, audioMime(place.rel));
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Upload to the bucket failed." }, { status: 502 });
  }
  const sync = await syncFiles([place.rel]);
  revalidatePath("/admin/sounds");
  return Response.json({ ok: true, rel: place.rel, category: place.category, subcategory: place.subcategory, bytes: body.length, sync });
}
