import { embedHeaders } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /obr/party/popover — the Party Tokens UI inside Owlbear Rodeo. A plain
// framable page like the other two extension popovers; all logic lives in
// /obr/party/app.js, which drives window.OBR from the vendored /obr/sdk.js.
const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Party Tokens</title>
<script src="/obr/sdk.js"></script>
<style>
  :root {
    --bg: #0d0d0f; --panel: #141416; --panel-2: #1b1b1f; --border: #2e2e34;
    --text: #e8e8e4; --muted: #8a8a93; --gold: #c8a020; --red: #b03030; --green: #4f9d5a;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: var(--bg); color: var(--text);
    font: 14px/1.5 "Montserrat", system-ui, -apple-system, sans-serif;
    padding: 14px; display: flex; flex-direction: column; gap: 12px;
  }
  h1 { font-size: 13px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); }
  h2 { font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .sub { font-size: 11px; color: var(--muted); line-height: 1.5; }
  .card { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; padding: 11px 12px; }
  .btn {
    background: var(--panel); border: 1px solid var(--gold); border-radius: 4px; color: var(--gold);
    font: 700 11px/1 "Montserrat", system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase;
    padding: 9px 10px; cursor: pointer; white-space: nowrap;
  }
  .btn:hover:not(:disabled) { background: var(--panel-2); }
  .btn:disabled { opacity: .4; cursor: default; border-color: var(--border); color: var(--muted); }
  .btn.wide { width: 100%; padding: 11px; }
  .btn.ghost { border-color: var(--border); color: var(--muted); }
  .btn.ghost:hover:not(:disabled) { color: var(--text); border-color: var(--muted); }
  .btn.sm { padding: 6px 8px; font-size: 10px; }
  select {
    flex: 1; min-width: 0; background: var(--panel-2); color: var(--text); border: 1px solid var(--border);
    border-radius: 4px; padding: 8px; font: 13px "Montserrat", system-ui, sans-serif;
  }
  .row { display: flex; gap: 8px; align-items: center; }
  .sel-line { font-size: 12px; color: var(--muted); margin-bottom: 8px; }
  .sel-line strong { color: var(--text); font-weight: 600; }
  #roster { display: flex; flex-direction: column; gap: 6px; }
  .pc { display: flex; gap: 10px; align-items: center; background: var(--panel); border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; }
  .pc img { width: 38px; height: 38px; object-fit: contain; flex: none; }
  .pc .who { flex: 1; min-width: 0; }
  .pc .tok { font-weight: 600; font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pc .ply { font-size: 11px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--border); margin-right: 5px; vertical-align: 1px; }
  .dot.on { background: var(--green); }
  .tag { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--green); }
  .tag.warn { color: var(--gold); }
  .acts { display: flex; gap: 4px; flex: none; }
  .empty { font-size: 12px; color: var(--muted); padding: 10px 0; }
  #status { font-size: 12px; line-height: 1.5; min-height: 16px; }
  #status.err { color: var(--red); }
  #status.ok { color: var(--green); }
  .note { font-size: 11px; color: var(--muted); line-height: 1.6; border-top: 1px solid var(--border); padding-top: 10px; }
  [hidden] { display: none !important; }
</style>
</head>
<body>

<div>
  <h1>Party Tokens</h1>
  <p class="sub" id="intro" style="margin-top:4px">Assign each player a token once. Drop the whole party into any scene, already owned by the right players.</p>
</div>

<div id="not-ready" class="card sub" hidden>Open a scene to assign or drop tokens.</div>

<section id="gm-assign" class="card" hidden>
  <h2>Assign a token</h2>
  <div class="sel-line" id="sel-line">Select a character token on the map.</div>
  <div class="row">
    <select id="player-pick" aria-label="Player"></select>
    <button class="btn" id="assign" disabled>Assign</button>
  </div>
</section>

<section>
  <h2 id="roster-title">Party</h2>
  <div id="roster"></div>
</section>

<section id="gm-drop" class="row" hidden>
  <button class="btn wide" id="drop-all" disabled>Drop party</button>
  <button class="btn ghost" id="fix" title="Give every party token in this scene back to its player">Fix owners</button>
</section>

<div id="status" role="status"></div>

<p class="note" id="note">
  Tokens land around your selection, or the middle of your view if nothing is selected.
  Tokens already in the scene are skipped. Assignments are saved to this room, so they follow you into every scene.
</p>

<script src="/obr/party/app.js"></script>
</body>
</html>`;

export async function GET() {
  return new Response(PAGE, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
