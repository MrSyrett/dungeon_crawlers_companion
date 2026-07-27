import { getCurrentUser } from "@/lib/auth";
import { MONSTER_TYPES, MONSTER_TYPE_BY_NAME } from "@/lib/data/monster-types";

// GET /api/monster-types
// The creature-type classification, so standalone tools can offer a Type filter
// without carrying their own copy of the 300-entry map. It's generated from the
// GM screen (see scripts/extract-game-data.mjs), which stays the single source.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  return Response.json(
    { types: MONSTER_TYPES, byName: MONSTER_TYPE_BY_NAME },
    // Static per deploy — safe for the browser to hold on to.
    { headers: { "cache-control": "private, max-age=3600" } },
  );
}
