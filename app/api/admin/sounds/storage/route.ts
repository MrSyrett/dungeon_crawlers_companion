import { bucketStatus, requireAdmin } from "@/lib/sound-library-sync";
import { placeFile } from "@/lib/sound-files";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET — what the Sound Library's bucket holds (admin page status + the upload's
// "already there" check). See lib/sound-library-sync.ts.
export async function GET() {
  if (!(await requireAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json(await bucketStatus(), { headers: { "cache-control": "no-store" } });
}

// POST { files: [{ path, size }] } — where each file of a chosen folder will go
// and whether the bucket already has it (same place, same size), so an upload
// can be resumed by simply choosing the folder again.
export async function POST(req: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = (await req.json().catch(() => null)) as { files?: { path?: string; size?: number }[] } | null;
  const files = Array.isArray(body?.files) ? body!.files.slice(0, 5000) : [];
  const status = await bucketStatus();
  const plan = files.map((f) => {
    const place = placeFile(String(f.path || ""));
    if (!place) return { path: f.path, skip: "not audio" as const };
    const have = status.rels[place.rel];
    return { path: f.path, rel: place.rel, category: place.category, subcategory: place.subcategory, skip: have != null && have === f.size ? ("already uploaded" as const) : null };
  });
  return Response.json({ configured: status.configured, error: status.error, plan });
}
