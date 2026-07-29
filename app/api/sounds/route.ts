import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/sounds — the Sound Library, for the GM Screen Music tool's "Library"
// picker. Readable by any signed-in user so the whole table can pull from the
// shelf; managing it (add / edit / remove) stays admin-only, enforced separately
// in app/actions/sounds.ts and the /admin/sounds page. Sorted by category then
// label so the picker can group without extra work.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    // 200 with an empty shelf keeps the picker's fetch simple (no error branch);
    // a signed-out caller simply sees nothing.
    return Response.json({ sounds: [] });
  }

  const sounds = await prisma.sound.findMany({
    orderBy: [{ category: "asc" }, { subcategory: "asc" }, { label: "asc" }],
    select: { id: true, label: true, url: true, category: true, subcategory: true },
  });

  return Response.json(
    { sounds },
    { headers: { "cache-control": "no-store" } },
  );
}
