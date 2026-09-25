import { embedHeaders } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /obr/party/curtain — the full-screen modal players see while the GM
// prepares a hidden scene. Opened and closed by /obr/party/background.js; this
// page only shows the GM's message (room metadata) and never closes itself.
const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The GM is setting the scene</title>
<script src="/obr/sdk.js"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: radial-gradient(ellipse at center, #1b1b1f 0%, #0d0d0f 70%);
    color: #e8e8e4; font: 15px/1.6 "Montserrat", system-ui, -apple-system, sans-serif;
    display: flex; align-items: center; justify-content: center; text-align: center; padding: 24px;
  }
  .box { max-width: 460px; }
  .mark { width: 44px; height: 44px; margin: 0 auto 18px; border: 2px solid #c8a020; border-radius: 50%;
    animation: pulse 2.4s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity: .35; transform: scale(.92); } 50% { opacity: 1; transform: scale(1); } }
  @media (prefers-reduced-motion: reduce) { .mark { animation: none; opacity: .8; } }
  h1 { font-size: 13px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; color: #c8a020; }
  p { margin-top: 10px; color: #8a8a93; white-space: pre-line; }
</style>
</head>
<body>
<div class="box">
  <div class="mark" aria-hidden="true"></div>
  <h1>The GM is setting the scene</h1>
  <p id="msg">Hang tight. The map will appear when it's ready.</p>
</div>
<script>
(function () {
  var KEY = "com.dungeoncrawlerscompanion.party/stage";
  var OBR = window.OBR;
  if (!OBR || !OBR.isAvailable) return;
  function show(meta) {
    var s = meta && meta[KEY];
    var m = s && typeof s.message === "string" ? s.message.trim() : "";
    document.getElementById("msg").textContent = m || "Hang tight. The map will appear when it's ready.";
  }
  OBR.onReady(function () {
    OBR.room.getMetadata().then(show);
    OBR.room.onMetadataChange(show);
  });
})();
</script>
</body>
</html>`;

export async function GET() {
  return new Response(PAGE, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
