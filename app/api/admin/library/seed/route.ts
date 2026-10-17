import { requireAdmin, seedStatus, startSeed } from "@/lib/library-admin";

export const dynamic = "force-dynamic";

// GET  → progress of the copy.   POST → start it (no-op if already running).
// Copies every book bundled in the repo (protected/rulebooks) onto the volume,
// with its cover, skipping any the volume already has. Runs in the background.
export async function GET() {
  if (!(await requireAdmin())) return Response.json({ error: "Admins only." }, { status: 403 });
  return Response.json(seedStatus());
}

export async function POST() {
  if (!(await requireAdmin())) return Response.json({ error: "Admins only." }, { status: 403 });
  try {
    return Response.json(startSeed());
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Could not start the copy." }, { status: 400 });
  }
}
