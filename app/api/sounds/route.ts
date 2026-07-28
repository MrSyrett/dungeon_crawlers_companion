import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

// GET /api/sounds — the Sound Library, for the GM Screen Music tool's "Library"
// picker. Admin-only: the library is admin-managed and only the GM uses it, so
// non-admins get a flat empty list rather than the shelf. Sorted by category
// then label so the picker can group without extra work.
export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    // 200 with an empty shelf keeps the picker's fetch simple (no error branch)
    // while still revealing nothing to non-admins.
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
