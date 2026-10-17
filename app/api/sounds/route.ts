import { getPlayUser } from "@/lib/vtt";
import { prisma } from "@/lib/prisma";
import { publicSoundUrl } from "@/lib/sound-files";

// GET /api/sounds — the Sound Library, for the GM Screen Music tool's "Library"
// picker. Readable by any signed-in user so the whole table can pull from the
// shelf; managing it (add / edit / remove) stays admin-only, enforced separately
// in app/actions/sounds.ts and the /admin/sounds page. Sorted by category then
// label so the picker can group without extra work. Accepts the VTT token too so
// the picker works when the GM Screen runs framed inside the Owlbear popover.
export async function GET(req: Request) {
  const user = await getPlayUser(req);
  if (!user) {
    // 200 with an empty shelf keeps the picker's fetch simple (no error branch);
    // a signed-out caller simply sees nothing.
    return Response.json({ sounds: [] });
  }

  const sounds = await prisma.sound.findMany({
    orderBy: [{ category: "asc" }, { subcategory: "asc" }, { label: "asc" }],
    select: { id: true, label: true, url: true, category: true, subcategory: true },
  });

  // Bucket tracks go out as signed links (see lib/sound-files.ts); Dropbox and
  // other URLs pass through untouched.
  return Response.json(
    { sounds: sounds.map((s) => ({ ...s, url: publicSoundUrl(s.url) })) },
    { headers: { "cache-control": "no-store" } },
  );
}
