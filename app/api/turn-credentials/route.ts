import type { NextRequest } from "next/server";
import { getPlayUser } from "@/lib/vtt";
import { iceServers } from "@/lib/webrtc";

// GET /api/turn-credentials — the ICE server list the WebRTC peers pass to
// RTCPeerConnection. Named for the interesting part (TURN); it always returns
// STUN and includes TURN only when the environment provides credentials.
//
// Authenticated (cookie or VTT token) so a configured TURN relay isn't handed to
// the open internet — TURN bandwidth is the thing you'd pay for. no-store because
// TURN credentials may become time-limited later (e.g. ephemeral HMAC creds).
export async function GET(req: NextRequest) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  return Response.json(
    { iceServers: iceServers() },
    { headers: { "cache-control": "no-store" } },
  );
}
