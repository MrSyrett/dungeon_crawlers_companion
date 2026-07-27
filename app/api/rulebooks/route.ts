import { getCurrentUser } from "@/lib/auth";
import { visibleRulebookFiles, prettyName } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

// GET — the rulebook PDFs this user is allowed to see.
// Returns { books: [{ file, title, url }] }, used by the GM Screen Rulebooks tool
// and the /rules page. Files are streamed (auth-checked) via /api/rulebooks/<file>;
// they never live under public/, so copyrighted PDFs are never on the open web.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const files = await visibleRulebookFiles({ id: user.id, email: user.email });

  const books = files.map((file) => ({
    file,
    title: prettyName(file),
    url: `/api/rulebooks/${encodeURIComponent(file)}`,
  }));

  return Response.json({ books });
}
