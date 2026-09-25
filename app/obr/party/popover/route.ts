import { embedHeaders } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /obr/party/popover — the Table Tools UI inside Owlbear Rodeo (Party,
// Vision and Stage tabs for the GM; players only see their own token). A plain
// framable page like the other extension popovers; all logic lives in
// /obr/party/app.js, which drives window.OBR from the vendored /obr/sdk.js.
// The vision preview and curtain themselves are drawn by the background page.
const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Table Tools</title>
<script src="/obr/sdk.js"></script>
<script src="/obr/party/polygon-clipping.min.js"></script>
<script src="/obr/party/vision.js"></script>
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
  .tabs { display: flex; gap: 2px; border-bottom: 1px solid var(--border); }
  .tabs button {
    flex: 1; background: none; border: 0; border-bottom: 2px solid transparent; color: var(--muted);
    font: 700 11px/1 "Montserrat", system-ui, sans-serif; letter-spacing: .12em; text-transform: uppercase;
    padding: 10px 4px 9px; cursor: pointer;
  }
  .tabs button[aria-selected="true"] { color: var(--gold); border-bottom-color: var(--gold); }
  .tabs .pill { display: inline-block; margin-left: 5px; padding: 1px 5px; border-radius: 3px; background: var(--red); color: #fff; font-size: 9px; letter-spacing: .06em; vertical-align: 1px; }
  .panel { display: flex; flex-direction: column; gap: 12px; }
  .seg { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
  .seg .btn[aria-pressed="true"] { background: var(--gold); color: var(--bg); }
  .big { font-size: 15px; font-weight: 700; }
  .big.live { color: var(--green); }
  .big.hid { color: var(--red); }
  .check { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; cursor: pointer; }
  .check input { margin-top: 3px; accent-color: var(--gold); }
  .field { width: 100%; background: var(--panel-2); color: var(--text); border: 1px solid var(--border); border-radius: 4px; padding: 8px; font: 13px "Montserrat", system-ui, sans-serif; resize: vertical; }
  input[type=range] { width: 100%; accent-color: var(--gold); }
  .stats { font-size: 11px; color: var(--muted); }
</style>
</head>
<body>

<div>
  <h1>Table Tools</h1>
</div>

<nav class="tabs" id="tabs" role="tablist" hidden>
  <button role="tab" data-tab="party" aria-selected="true">Party</button>
  <button role="tab" data-tab="vision" aria-selected="false">Vision</button>
  <button role="tab" data-tab="stage" aria-selected="false">Stage<span class="pill" id="stage-pill" hidden>Hidden</span></button>
</nav>

<div class="panel" id="tab-party">
<p class="sub" id="intro">Assign each player a token once. Drop the whole party into any scene, already owned by the right players.</p>

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

<p class="note" id="note">
  Tokens land around your selection, or the middle of your view if nothing is selected.
  Tokens already in the scene are skipped. Assignments are saved to this room, so they follow you into every scene.
</p>
</div>

<div class="panel" id="tab-vision" hidden>
  <p class="sub">See the map the way a player does: everything outside their light and line of sight is blacked out, on your screen only.</p>
  <div class="card">
    <h2>Show what&hellip;</h2>
    <div class="seg">
      <button class="btn" id="v-token" aria-pressed="false">This token</button>
      <button class="btn" id="v-party" aria-pressed="false">The party</button>
      <button class="btn" id="v-off" aria-pressed="true">Off</button>
    </div>
    <p class="sub" id="v-state" style="margin-top:10px">Select a token, then choose This token. Or right-click a token → See what they see.</p>
  </div>
  <div class="card">
    <h2>Darkness</h2>
    <input type="range" id="v-opacity" min="50" max="100" step="5" value="90" aria-label="Darkness">
    <p class="sub">Turn it down to keep a faint view of what's hidden while you work.</p>
  </div>
  <p class="stats" id="v-stats"></p>
  <p class="note">Uses the walls, doors and lights from the Dynamic Fog extension. A token with no light sees nothing on its own. Secondary lights only show where a primary light can see them.</p>
</div>

<div class="panel" id="tab-stage" hidden>
  <div class="card">
    <h2>This scene</h2>
    <div class="big" id="s-state">&hellip;</div>
    <p class="sub" id="s-sub" style="margin-top:4px"></p>
    <div style="margin-top:10px"><button class="btn wide" id="s-toggle" disabled>&hellip;</button></div>
  </div>
  <div class="card">
    <label class="check"><input type="checkbox" id="s-auto"><span>Hide new scenes until I make them live<br><span class="sub">Any scene you haven't made live yet opens behind the curtain.</span></span></label>
  </div>
  <div class="card">
    <h2>Curtain message</h2>
    <textarea class="field" id="s-msg" rows="2" maxlength="200" placeholder="Hang tight. The map will appear when it's ready."></textarea>
  </div>
  <p class="note">While a scene is hidden, players see a full-screen curtain instead of the map. You can open it, move things, drop the party and set up fog, then make it live.</p>
</div>

<div id="status" role="status"></div>

<script src="/obr/party/app.js"></script>
</body>
</html>`;

export async function GET() {
  return new Response(PAGE, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
