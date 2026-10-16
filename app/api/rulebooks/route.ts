import { getPlayUser, tokenFromRequest } from "@/lib/vtt";
import { visibleRulebooks, prettyName } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

// GET — the Library PDFs this user is allowed to see.
// Returns { books: [{ file, title, system, category, url, cover }] }, used by the GM
// Screen's Library tool and the /library page. `system` (a SystemKey or "BOTH")
// says which game system's shelf shows the book and `category` ("Core Rules" |
// "Expansions" | "Adventures") which section — both come from the folder the
// PDF sits in (see lib/rulebooks.ts); informational here, callers may filter.
// Files are streamed (auth-checked) via /api/rulebooks/<file>; they never live
// under public/, so copyrighted PDFs are never on the open web.
export async function GET(req: Request) {
  // Cookie session, or the VTT token when the Rulebooks tool runs framed in the
  // Owlbear popover. Visibility is still filtered per user by visibleRulebooks.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const visible = await visibleRulebooks({ id: user.id, email: user.email });

  // Framed in the popover the PDFs load as <object data>/<iframe src>, which the
  // fetch-patch can't reach — so the token has to ride in the URL itself. Only
  // appended when this request was token-authed; the cookie path stays clean.
  const token = tokenFromRequest(req);
  const suffix = token ? `?t=${encodeURIComponent(token)}` : "";

  const books = visible.map(({ file, system, category }) => ({
    file,
    title: prettyName(file),
    system,
    category,
    url: `/api/rulebooks/${encodeURIComponent(file)}${suffix}`,
    cover: `/api/rulebooks/${encodeURIComponent(file)}/cover${suffix}`,
  }));

  return Response.json({ books });
}
