import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { boardRole } from "@/lib/vtt-scenes";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";

export const dynamic = "force-dynamic";

// GET /play/:campaignId — the first-party virtual tabletop.
//
// Served as a self-contained HTML shell (like the GM Screen at /vtt/gm-screen):
// it loads the static board assets from /vtt/* and a small injected config, then
// public/vtt/session.js builds the UI and wires persistence + live sync. The GM
// (campaign owner) authors and drives; players mirror the board and move their
// own tokens. Auth is the normal session cookie (same-origin — no VTT token
// needed, unlike the Owlbear embed).
export async function GET(_req: Request, ctx: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await ctx.params;

  const user = await getCurrentUser();
  if (!user) {
    return new Response(null, { status: 302, headers: { location: "/login" } });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    select: { id: true, name: true, system: true },
  });
  const role = campaign ? await boardRole(user.id, campaignId) : null;
  if (!campaign || !role) {
    return new Response(deniedHtml(), {
      status: 403,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
    });
  }

  // The caller's own character sheets linked to this campaign — for the "my
  // sheet" popup. Own docs only, so opening them via /tools/<tool>/<id> (which is
  // userId-scoped) works with the session cookie.
  const myCharacters = await prisma.document.findMany({
    where: { userId: user.id, linkedCampaignId: campaign.id, tool: { in: CHARACTER_TOOL_IDS } },
    select: { id: true, title: true, tool: true },
    orderBy: { updatedAt: "desc" },
  });

  const cfg = {
    campaignId: campaign.id,
    campaignName: campaign.name,
    system: campaign.system ?? null,
    role, // "gm" | "player"
    userId: user.id,
    userName: user.email,
    myCharacters,
    sceneBase: "/api/vtt/scenes",
    signalBase: "/api/vtt/signal",
    toolBase: "/tools",
    // Free public STUN for connection setup; no TURN (peer-to-peer, no relay).
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  return new Response(pageHtml(cfg), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

function inlineJson(v: unknown): string {
  return JSON.stringify(v).replace(/</g, "\\u003c");
}

function pageHtml(cfg: Record<string, unknown>): string {
  const title = `${String(cfg.campaignName)} — Virtual Tabletop`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="icon" type="image/png" href="/icon-64.png">
<link rel="stylesheet" href="/vtt/board.css">
</head>
<body>
<div id="vtt-root"></div>
<script>window.__VTT__=${inlineJson(cfg)};</script>
<script src="/vtt/uvtt.js"></script>
<script src="/vtt/visibility.js"></script>
<script src="/vtt/board.js"></script>
<script src="/vtt/net.js"></script>
<script src="/vtt/session.js"></script>
</body>
</html>`;
}

function deniedHtml(): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<title>No access</title><link rel="stylesheet" href="/vtt/board.css"></head>
<body style="display:grid;place-items:center;height:100vh;text-align:center">
<div><h1 style="color:var(--gold)">Not your table</h1>
<p style="color:var(--muted)">You need to be this campaign's GM, or have a character sheet linked to it, to open its tabletop.</p>
<p><a href="/dashboard" style="color:var(--gold)">&larr; Back to dashboard</a></p></div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
