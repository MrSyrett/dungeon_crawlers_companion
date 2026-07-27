// Short, unambiguous campaign join code (no 0/O/1/I to avoid read-aloud mix-ups).
// Shared by the /api/campaigns POST route and the Campaigns-page create action
// so both mint codes the same way — one source of truth for the alphabet/length.
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeCode(len = 6): string {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return out;
}
