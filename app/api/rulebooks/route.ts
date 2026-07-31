import { getPlayUser, tokenFromRequest } from "@/lib/vtt";
import { visibleRulebookFiles, prettyName } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

// GET — the rulebook PDFs this user is allowed to see.
// Returns { books: [{ file, title, url }] }, used by the GM Screen Rulebooks tool
// and the /rules page. Files are streamed (auth-checked) via /api/rulebooks/<file>;
// they never live under public/, so copyrighted PDFs are never on the open web.
export async function GET(req: Request) {
  // Cookie session, or the VTT token when the Rulebooks tool runs framed in the
  // Owlbear popover. Visibility is still filtered per user by visibleRulebookFiles.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const files = await visibleRulebookFiles({ id: user.id, email: user.email });

  // Framed in the popover the PDFs load as <object data>/<iframe src>, which the
  // fetch-patch can't reach — so the token has to ride in the URL itself. Only
  // appended when this request was token-authed; the cookie path stays clean.
  const token = tokenFromRequest(req);
  const suffix = token ? `?t=${encodeURIComponent(token)}` : "";

  const books = files.map((file) => ({
    file,
    title: prettyName(file),
    url: `/api/rulebooks/${encodeURIComponent(file)}${suffix}`,
  }));

  return Response.json({ books });
}
