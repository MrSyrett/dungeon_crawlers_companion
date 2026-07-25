import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GM_TOOL = "gm-screen";

// GET — return saved GM Screen state
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const doc = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL },
    select: { data: true },
  });

  return Response.json(doc?.data ?? {});
}

// PATCH — save GM Screen state
// File data (base64) is intentionally stripped before saving — PDFs and images
// can be very large (tens of MB) and would break the DB. Files must be
// reloaded manually each session; all other state (trackers, NPCs, notes) persists.
export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  // Strip oversized fileData blobs (> 5MB encoded) as a server-side safety net.
  // Small files (maps, images, short PDFs) are allowed through and saved normally.
  const MAX_FILE_LEN = 5 * 1024 * 1024;
  if (body.tools) {
    for (const key of Object.keys(body.tools)) {
      const fd = body.tools[key]?.fileData;
      if (fd && typeof fd === "string" && fd.length > MAX_FILE_LEN) {
        body.tools[key] = { ...body.tools[key], fileData: null, fileTooLarge: body.tools[key].fileName };
      }
    }
  }

  const existingDoc = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL },
    select: { id: true },
  });

  if (existingDoc) {
    await prisma.document.update({
      where: { id: existingDoc.id },
      data: { data: body },
    });
  } else {
    await prisma.document.create({
      data: { userId: user.id, tool: GM_TOOL, title: "GM Screen", data: body },
    });
  }

  return Response.json({ ok: true });
}

// DELETE — clear saved GM Screen state (emergency recovery)
export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  await prisma.document.deleteMany({
    where: { userId: user.id, tool: GM_TOOL },
  });

  return Response.json({ ok: true });
}
