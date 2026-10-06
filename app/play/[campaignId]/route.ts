import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import nodePath from "node:path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { boardRole } from "@/lib/vtt-scenes";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";
import { miniBar, miniBarHead } from "@/lib/minibar";
import { isSystemKey } from "@/components/systemStore";

export const dynamic = "force-dynamic";

// A content stamp appended to the static board assets (?v=…). It is a hash of the
// board files' bytes, computed once when the server process starts, so it changes
// ONLY when the board code itself changes — not on every unrelated restart/redeploy.
// Browsers then cache /vtt/*.js and board.css across restarts (a cheap 304) and
// still pick up a genuinely new session.js the moment it's deployed. (The old
// stamp was Date.now(), which changed every boot and forced a full re-download of
// ~190 KB of board code after any restart — wasted egress with no benefit.)
const ASSET_FILES = ["board.css", "uvtt.js", "visibility.js", "board.js", "net.js", "session.js"];
const ASSET_VER = (() => {
  try {
    const h = createHash("sha1");
    for (const f of ASSET_FILES) {
      h.update(readFileSync(nodePath.join(process.cwd(), "public", "vtt", f)));
    }
    return h.digest("hex").slice(0, 12);
  } catch {
    // Never worse than before: fall back to a per-boot stamp if a file can't be read.
    return Date.now().toString(36);
  }
})();
function asset(path: string): string {
  return `${path}${path.includes("?") ? "&" : "?"}v=${ASSET_VER}`;
}

// GET /play/:campaignId — the first-party virtual tabletop.
//
// Served as a self-contained HTML shell (like the GM Screen at /vtt/gm-screen):
// it loads the static board assets from /vtt/* and a small injected config, then
// public/vtt/session.js builds the UI and wires persistence + live sync. The GM
// (campaign owner) authors and drives; players mirror the board and move their
// own tokens. Auth is the normal session cookie (same-origin — no VTT token
// needed, unlike the Owlbear embed).
export async function GET(req: Request, ctx: { params: Promise<{ campaignId: string }> }) {
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

  // The campaign's player roster (users other than the GM who own a linked
  // character sheet) — so the GM can assign library tokens to specific players
  // even when they're offline. Only exposed to the GM.
  const players: Array<{ id: string; name: string }> = [];
  if (role === "gm") {
    // One display name per player: their linked character sheet's title (the
    // character's name), most-recently-updated sheet winning. We deliberately
    // surface the character name rather than the player's email.
    const memberRows = await prisma.document.findMany({
      where: { linkedCampaignId: campaign.id, tool: { in: CHARACTER_TOOL_IDS }, userId: { not: user.id } },
      select: { userId: true, title: true },
      orderBy: { updatedAt: "desc" },
    });
    const seen = new Set<string>();
    for (const r of memberRows) {
      if (seen.has(r.userId)) continue;
      seen.add(r.userId);
      players.push({ id: r.userId, name: (r.title || "").trim() || "Player" });
    }
  }

  const cfg = {
    campaignId: campaign.id,
    campaignName: campaign.name,
    system: campaign.system ?? null,
    role, // "gm" | "player"
    userId: user.id,
    // A player is shown to the table by their character's name; the GM keeps
    // their account identity. (The guest join also prefers the character title.)
    userName: role === "player" && myCharacters[0] && myCharacters[0].title ? myCharacters[0].title : user.email,
    myCharacters,
    players,
    sceneBase: "/api/vtt/scenes",
    tokenBase: "/api/vtt/tokens",
    signalBase: "/api/vtt/signal",
    toolBase: "/tools",
    // Free public STUN for connection setup, plus an OPTIONAL TURN relay if the
    // env is configured (helps the ~10-15% of players behind symmetric NAT /
    // strict firewalls who can't hole-punch a direct connection). Unset = STUN
    // only, unchanged behaviour.
    iceServers: iceServers(),
  };

  // Framed inside the GM Screen's Maps pane (?embed=1) the host provides the
  // chrome; otherwise the page gets the shared mini-bar like every other surface.
  const embed = new URL(req.url).searchParams.get("embed") === "1";
  const bar = embed
    ? ""
    : miniBar({
        system: isSystemKey(campaign.system) ? campaign.system : null,
        crumb: "VTT",
        title: campaign.name,
        status: false,
      });

  return new Response(pageHtml(cfg, bar), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

function inlineJson(v: unknown): string {
  return JSON.stringify(v).replace(/</g, "\\u003c");
}

// Build the ICE server list. Always includes free public STUN. If TURN is
// configured via env, appends it so strict-NAT players can still connect:
//   VTT_TURN_URLS       comma-separated, e.g. "turn:turn.example.com:3478,turns:turn.example.com:5349"
//   VTT_TURN_USERNAME   TURN username (or a time-limited credential username)
//   VTT_TURN_CREDENTIAL TURN credential/password
// All three must be set for TURN to be added; otherwise it's STUN-only.
function iceServers(): Array<{ urls: string | string[]; username?: string; credential?: string }> {
  const servers: Array<{ urls: string | string[]; username?: string; credential?: string }> = [
    { urls: "stun:stun.l.google.com:19302" },
  ];
  const urls = (process.env.VTT_TURN_URLS || "").split(",").map((u) => u.trim()).filter(Boolean);
  const username = process.env.VTT_TURN_USERNAME;
  const credential = process.env.VTT_TURN_CREDENTIAL;
  if (urls.length && username && credential) {
    servers.push({ urls, username, credential });
  }
  return servers;
}

function pageHtml(cfg: Record<string, unknown>, bar: string): string {
  const title = `${String(cfg.campaignName)} — VTT`;
  const system = isSystemKey(cfg.system) ? cfg.system : null;
  // Shared tokens AFTER board.css so the site palette (panel, border, muted,
  // gold) wins over the board's own fallbacks — one palette on every surface.
  // THE VIEWPORT META HAS TO BE HERE. This is a route handler that writes its own
  // document, so it is NOT wrapped by app/layout.tsx and the `viewport` export there —
  // which locks the rest of the site to a fixed size on mobile — never reaches the
  // tabletop. That is precisely how the VTT ended up as the one surface still
  // pinch-zooming after everything else was locked: the lock was added to the Next
  // root and to tools/templates/*.html, and this file is neither.
  //
  // Locking the PAGE is right here, because the BOARD does its own: #vtt-canvas carries
  // `touch-action: none` and public/vtt/board.js implements two-finger pinch-zoom and
  // two-finger pan against the camera (see `pinch` / `updatePinch` there). Browser page
  // zoom was competing with that, and it takes the tool rail and the Table panel
  // off-screen along with the map. scripts/check-mobile-zoom.mjs keeps this honest.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>${escapeHtml(title)}</title>
<link rel="icon" type="image/png" href="/icon-64.png">
<link rel="stylesheet" href="${asset("/vtt/board.css")}">
${miniBarHead(system)}
</head>
<body>
${bar}
<div id="vtt-root"></div>
<script>window.__VTT__=${inlineJson(cfg)};</script>
<script src="${asset("/vtt/uvtt.js")}"></script>
<script src="${asset("/vtt/visibility.js")}"></script>
<script src="${asset("/vtt/board.js")}"></script>
<script src="${asset("/vtt/net.js")}"></script>
<script src="${asset("/vtt/session.js")}"></script>
</body>
</html>`;
}

function deniedHtml(): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
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
