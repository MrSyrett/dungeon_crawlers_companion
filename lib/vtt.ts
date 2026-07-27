import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { TOOLS, TOOL_ORDER, type ToolId } from "@/lib/tools";

// A VTT token may only ever reach character sheets — never session prep,
// campaigns or homebrew. Derived from the registry so a new sheet tool is
// covered automatically.
export const CHARACTER_TOOLS: ToolId[] = TOOL_ORDER.filter((id) => TOOLS[id].kind === "character");

export function generateToken(): string {
  // 32 bytes → 43 url-safe characters. Long enough that guessing is hopeless
  // and short enough to paste into a VTT field by hand.
  return randomBytes(32).toString("base64url");
}

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

// Tokens arrive either as a header (saves, API calls) or a query parameter
// (the sheet iframe's src, where a header isn't possible).
export function tokenFromRequest(req: Request): string | null {
  const header = req.headers.get("x-vtt-token");
  if (header && header.trim()) return header.trim();
  const q = new URL(req.url).searchParams.get("t");
  return q && q.trim() ? q.trim() : null;
}

export type VttOwner = { id: string; email: string; tokenId: string };

/**
 * Resolve a raw token to its owner, or null if it's unknown or revoked.
 *
 * The lookup is by hash, so a leaked database gives away nothing usable. The
 * final comparison is constant-time; the indexed lookup already narrows to one
 * row, but a timing-safe check costs nothing and keeps the habit.
 */
export async function ownerForToken(raw: string | null): Promise<VttOwner | null> {
  if (!raw) return null;
  const hash = hashToken(raw);

  const row = await prisma.vttToken.findUnique({
    where: { tokenHash: hash },
    select: {
      id: true,
      tokenHash: true,
      revokedAt: true,
      lastUsedAt: true,
      user: { select: { id: true, email: true } },
    },
  });
  if (!row || row.revokedAt) return null;

  const a = Buffer.from(row.tokenHash);
  const b = Buffer.from(hash);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  // "Last used" is for the owner's benefit, so once every few minutes is plenty
  // — a write on every sheet autosave would be noise.
  const stale = !row.lastUsedAt || Date.now() - row.lastUsedAt.getTime() > 5 * 60 * 1000;
  if (stale) {
    await prisma.vttToken
      .update({ where: { id: row.id }, data: { lastUsedAt: new Date() } })
      .catch(() => {});
  }

  return { id: row.user.id, email: row.user.email, tokenId: row.id };
}

// Owlbear Rodeo serves rooms from both apex and www. Anything we expect to be
// framed has to name them; every other page keeps the browser default of
// refusing to be framed at all.
//
// Overridable so a changed origin (or a self-hosted instance) is a config
// change rather than a redeploy of this file — get it wrong and the popover
// just renders blank, which is a miserable thing to debug.
const DEFAULT_FRAME_ANCESTORS = "https://www.owlbear.rodeo https://owlbear.rodeo";

/**
 * Resolve the caller from either credential: the session cookie normally, or a
 * VTT token when the page is framed by a tabletop (where the cookie is never
 * sent).
 *
 * Use this only on the endpoints a player needs *while playing* — reading their
 * campaigns, exchanging rolls, reading shared homebrew. Anything that creates or
 * destroys stays cookie-only, so a token pasted into a VTT still can't do more
 * than run the character it was made for.
 */
export async function getPlayUser(req: Request): Promise<{ id: string; email: string } | null> {
  const user = await getCurrentUser();
  if (user) return { id: user.id, email: user.email };
  const owner = await ownerForToken(tokenFromRequest(req));
  return owner ? { id: owner.id, email: owner.email } : null;
}

export const OBR_FRAME_ANCESTORS =
  process.env.VTT_FRAME_ANCESTORS?.trim() || DEFAULT_FRAME_ANCESTORS;

export function embedHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    // 'self' belongs here alongside the Owlbear origins: the character sheet is
    // framed by our own /obr/popover (same origin), not by Owlbear directly. The
    // popover is a direct child of Owlbear so it loads and the character picker
    // works — but selecting a sheet nests a *second* frame whose parent is us,
    // and without 'self' that inner frame is refused. Stricter engines (notably
    // mobile Safari/WebKit) enforce this, which is why the sheet came up blank on
    // phones while desktop let it through. Listing more ancestors only widens
    // what may frame these pages, so it can't break the case that already works.
    "content-security-policy": `frame-ancestors 'self' ${OBR_FRAME_ANCESTORS}`,
    // The token rides in the iframe URL, so don't hand it to anything the page
    // links out to.
    "referrer-policy": "no-referrer",
    "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    ...extra,
  };
}
