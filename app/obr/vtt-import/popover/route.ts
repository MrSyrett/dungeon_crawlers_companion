import { embedHeaders } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /obr/vtt-import/popover — the Universal VTT Importer UI inside Owlbear
// Rodeo. Served as a plain framable page (its own CSP, no session cookie),
// exactly like the Companion popover. All logic lives in the prebuilt bundle at
// /obr/vtt-import/app.js (parse + geometry + scene upload); this page is just
// the themed shell it wires into. See public/obr/vtt-import/app.js for how to
// rebuild that bundle.
const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Universal VTT Importer</title>
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
  .sub { font-size: 11px; color: var(--muted); line-height: 1.5; }
  #drop {
    border: 1.5px dashed var(--border); border-radius: 6px; padding: 22px 14px; text-align: center;
    color: var(--muted); cursor: pointer; background: var(--panel); transition: border-color .15s, color .15s, background .15s;
  }
  #drop:hover, #drop.drag { border-color: var(--gold); color: var(--text); background: var(--panel-2); }
  #drop strong { color: var(--gold); }
  input[type=file] { display: none; }
  .summary { background: var(--panel); border: 1px solid var(--border); border-radius: 6px; padding: 11px 13px; display: none; }
  .summary.show { display: block; }
  .fname { font-weight: 600; margin-bottom: 8px; word-break: break-all; }
  .row { display: flex; justify-content: space-between; padding: 3px 0; font-size: 13px; }
  .row span:first-child { color: var(--muted); }
  .btn {
    width: 100%; background: var(--panel); border: 1px solid var(--gold); border-radius: 4px; color: var(--gold);
    font: 700 11px/1 "Montserrat", system-ui, sans-serif; letter-spacing: .1em; text-transform: uppercase;
    padding: 11px; cursor: pointer;
  }
  .btn:hover:not(:disabled) { background: var(--panel-2); }
  .btn:disabled { opacity: .4; cursor: default; border-color: var(--border); color: var(--muted); }
  #status { font-size: 12px; line-height: 1.5; min-height: 16px; }
  #status.err { color: var(--red); }
  #status.ok { color: var(--green); }
  .note { font-size: 11px; color: var(--muted); line-height: 1.6; border-top: 1px solid var(--border); padding-top: 10px; }
  .note a { color: var(--gold); }
  label.drop-label { display: block; }
</style>
</head>
<body>

<div>
  <h1>Universal VTT Importer</h1>
  <p class="sub" style="margin-top:4px">
    Drop a <strong>.dd2vtt / .uvtt / .df2vtt</strong> file to create a new scene with the map,
    walls, openable doors and lights.
  </p>
</div>

<label id="drop" class="drop-label" for="file">
  <div>Drag a Universal VTT file here<br>or <strong>click to browse</strong></div>
</label>
<input type="file" id="file" accept=".dd2vtt,.uvtt,.df2vtt,application/json">

<div class="summary" id="summary">
  <div class="fname" id="fname"></div>
  <div class="row"><span>Map size</span><span id="s-size"></span></div>
  <div class="row"><span>Walls</span><span id="s-walls"></span></div>
  <div class="row"><span>Doors (portals)</span><span id="s-doors"></span></div>
  <div class="row"><span>Lights</span><span id="s-lights"></span></div>
</div>

<button class="btn" id="import" disabled>Import as new scene</button>
<div id="status"></div>

<p class="note">
  Requires the free official <a href="https://extensions.owlbear.rodeo/dynamic-fog" target="_blank"
  rel="noopener">Dynamic Fog</a> extension in your room for walls, doors and lights to work.
  After importing, open the new scene from your scene list.
</p>

<script src="/obr/vtt-import/app.js"></script>
</body>
</html>`;

export async function GET() {
  return new Response(PAGE, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
