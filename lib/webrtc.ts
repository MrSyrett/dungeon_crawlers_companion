// ICE server configuration for the audio broadcast's WebRTC peers.
//
// STUN is always present (free, Google's public servers) and gets most home
// networks connected directly. TURN — a relay for the ~10-15% of players behind
// symmetric / mobile NATs that can't connect peer-to-peer — is added only when
// it's configured in the environment, so you can drop it in later WITHOUT a code
// change: set the env vars, redeploy, done.
//
// Configure TURN with either:
//   TURN_URLS       comma-separated (e.g. "turn:turn.example.com:3478,turns:turn.example.com:5349")
//   TURN_USERNAME
//   TURN_CREDENTIAL
// or a single TURN_URL. If username/credential are absent the TURN entry is
// skipped (an unauthenticated TURN entry is useless and just slows ICE).

// How recently the GM's heartbeat must have fired for a campaign to count as
// "live" to players. The GM bumps roughly every 8s; 20s tolerates a missed beat
// or two (a backgrounded tab, a slow request) before players see it drop.
export const LIVE_WINDOW_MS = 20_000;

export type IceServer = { urls: string | string[]; username?: string; credential?: string };

const STUN: IceServer[] = [
  { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
];

export function iceServers(): IceServer[] {
  const servers: IceServer[] = [...STUN];

  const raw = (process.env.TURN_URLS || process.env.TURN_URL || "").trim();
  const username = (process.env.TURN_USERNAME || "").trim();
  const credential = (process.env.TURN_CREDENTIAL || "").trim();

  if (raw && username && credential) {
    const urls = raw
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
    if (urls.length) servers.push({ urls, username, credential });
  }

  return servers;
}
