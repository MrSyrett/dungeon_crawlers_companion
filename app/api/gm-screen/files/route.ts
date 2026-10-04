import { NextRequest } from "next/server";
import { getPlayUser } from "@/lib/vtt";
import { prisma } from "@/lib/prisma";

// Attachments for the GM Screen — the map images, PDFs and HTML docs a GM drops
// into the Maps / Adventure panes.
//
// They used to live INSIDE the board blob as base64 data URLs, which meant every
// autosave (and every keystroke that triggered one) re-serialized and re-sent
// every attachment: a board with a few maps and a PDF stringified megabytes on
// each save, and anything over 5 MB was dropped outright by the save route's
// safety net, so it silently failed to come back.
//
// Each attachment is now its own row, written once when the file is dropped in,
// and the board blob keeps only its id. The board save goes back to being small
// and constant-sized no matter how much is attached.
//
// Stored as a Document (tool "gm-file") rather than a new table so this needs no
// schema migration; it inherits Document's per-user ownership and cascade delete.
const FILE_TOOL = "gm-file";

// Generous per-file ceiling: these no longer ride along on every save, so the
// old 5 MB board-blob budget doesn't apply. Base64 inflates by ~4/3, so this is
// roughly a 24 MB file.
const MAX_LEN = 32 * 1024 * 1024;

type Body = { name?: unknown; data?: unknown };

// POST — store one attachment. Body: { name, data } where `data` is a data: URL.
// Returns { id }. The GM Screen calls this once, when the file is loaded into a
// pane, and thereafter saves only the id.
export async function POST(req: NextRequest) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as Body | null;
  const name = typeof body?.name === "string" ? body.name.slice(0, 300) : "";
  const data = typeof body?.data === "string" ? body.data : "";
  if (!data || !data.startsWith("data:")) return new Response("Bad request", { status: 400 });
  if (data.length > MAX_LEN) return new Response("Too large", { status: 413 });

  const doc = await prisma.document.create({
    data: { userId: user.id, tool: FILE_TOOL, title: name || "Attachment", data: { name, data } },
    select: { id: true },
  });
  return Response.json({ id: doc.id });
}

// GET ?id=<cuid> — read one attachment back (owner only). Returns { id, name, data }.
export async function GET(req: NextRequest) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const id = (req.nextUrl.searchParams.get("id") || "").trim();
  if (!id) return new Response("Bad request", { status: 400 });

  const doc = await prisma.document.findFirst({
    where: { id, userId: user.id, tool: FILE_TOOL },
    select: { id: true, data: true },
  });
  if (!doc) return new Response("Not found", { status: 404 });

  const d = (doc.data ?? {}) as { name?: unknown; data?: unknown };
  return Response.json({
    id: doc.id,
    name: typeof d.name === "string" ? d.name : "",
    data: typeof d.data === "string" ? d.data : "",
  });
}

// DELETE ?id=<cuid> — drop an attachment the board no longer references (the GM
// Screen calls this best-effort when a pane's file is replaced or a map tab is
// closed). Deleting one that's already gone is not an error.
export async function DELETE(req: NextRequest) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const id = (req.nextUrl.searchParams.get("id") || "").trim();
  if (!id) return new Response("Bad request", { status: 400 });

  await prisma.document.deleteMany({ where: { id, userId: user.id, tool: FILE_TOOL } });
  return Response.json({ ok: true });
}
