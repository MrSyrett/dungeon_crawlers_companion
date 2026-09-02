import { embedHeaders } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /obr/popover — the extension's UI inside Owlbear Rodeo.
//
// Served as a plain page rather than a React route for two reasons: it has to
// be framable by another origin (so it needs its own CSP header), and it must
// work with no session cookie, which every app page assumes it has.
//
// The token is kept in localStorage. Inside a VTT that is *partitioned* third
// party storage — it persists per browser, but some browsers (Safari in
// particular) may evict it, hence the "paste it again" wording.
const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dungeon Crawler's Companion</title>
<script src="/obr/sdk.js"></script>
<script src="/obr/size.js" defer></script>
<style>
  :root {
    --bg: #0d0d0f; --panel: #141416; --panel-2: #1b1b1f; --border: #2e2e34;
    --text: #e8e8e4; --muted: #8a8a93; --gold: #c8a020; --red: #b03030;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: var(--bg); color: var(--text);
    font: 14px/1.5 "Montserrat", system-ui, -apple-system, sans-serif;
    padding: 14px; display: flex; flex-direction: column; gap: 12px;
  }
  h1 { font-size: 13px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); }
  .sub { font-size: 11px; color: var(--muted); }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .btn {
    background: var(--panel); border: 1px solid var(--border); border-radius: 4px; color: var(--text);
    font: 600 11px/1 "Montserrat", system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase;
    padding: 8px 10px; cursor: pointer;
  }
  .btn:hover { border-color: var(--gold); color: var(--gold); }
  .btn.primary { border-color: var(--gold); color: var(--gold); }
  input {
    width: 100%; background: var(--panel); border: 1px solid var(--border); border-radius: 4px;
    color: var(--text); font: 13px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; padding: 9px 10px; outline: none;
  }
  input:focus { border-color: var(--gold); }
  label { display: block; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
  ol { list-style: none; display: flex; flex-direction: column; gap: 7px; overflow-y: auto; }
  .sheet {
    display: block; width: 100%; text-align: left; background: var(--panel);
    border: 1px solid var(--border); border-radius: 5px; padding: 11px 12px; cursor: pointer; color: inherit;
  }
  .sheet:hover { border-color: var(--gold); background: var(--panel-2); }
  .sheet-name { display: block; font-size: 14px; font-weight: 600; }
  .sheet-meta { display: block; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
  .sd { color: var(--gold); }
  .dcc { color: var(--red); }
  .ace { color: #3aa8e0; }
  .kob { color: #a56ee8; }
  .nim { color: #3fb97a; }
  .sw { color: #f0c020; }
  .group { display: flex; flex-direction: column; gap: 7px; }
  .group + .group { margin-top: 14px; }
  .group-head {
    font-size: 10px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
    color: var(--muted); padding-bottom: 4px; border-bottom: 1px solid var(--border);
  }
  .group-head.sd { color: var(--gold); }
  .group-head.dcc { color: var(--red); }
  .group-head.ace { color: #3aa8e0; }
  .group-head.kob { color: #a56ee8; }
  .group-head.nim { color: #3fb97a; }
  .group-head.sw { color: #f0c020; }
  .group-head.dnd { color: #e0554e; }
  .note { font-size: 11px; color: var(--muted); line-height: 1.6; }
  .note a { color: var(--gold); }
  .err { font-size: 12px; color: var(--red); }
  .hide { display: none !important; }
  /* Sheet view: a slim bar that never reloads, with the sheet framed below it. */
  #sheet-view { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
  .sheet-bar { display: flex; align-items: center; gap: 8px; }
  .sheet-bar .name { flex: 1; min-width: 0; font-size: 12px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  #sheet-frame { flex: 1; min-height: 0; width: 100%; border: 1px solid var(--border); border-radius: 5px; background: var(--bg); }
  /* Icon-only switch: phone on the left, monitor on the right. Shared (class,
     not id) by the sheet bar and the tab bar so both stay in sync via size.js. */
  .size-sw {
    display: flex; align-items: center; gap: 6px; flex-shrink: 0; cursor: pointer;
    background: var(--panel); border: 1px solid var(--border); border-radius: 5px; padding: 5px 8px; color: var(--muted);
  }
  .size-sw svg { display: block; width: 13px; height: 13px; fill: currentColor; transition: color .15s ease; }
  .size-sw[aria-checked="false"] .i-m, .size-sw[aria-checked="true"] .i-d { color: var(--text); }
  .size-sw .track { position: relative; width: 28px; height: 15px; border-radius: 8px; background: var(--border); flex-shrink: 0; transition: background .15s ease; }
  .size-sw[aria-checked="true"] .track { background: var(--gold); }
  .size-sw .knob { position: absolute; top: 2px; left: 2px; width: 11px; height: 11px; border-radius: 50%; background: var(--text); transition: transform .15s ease; }
  .size-sw[aria-checked="true"] .knob { transform: translateX(13px); background: var(--bg); }
  .grow { flex: 1; min-height: 0; }
  /* Top-level switch between Characters and the GM Screen. */
  #tabs { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .tab[aria-selected="true"] { border-color: var(--gold); color: var(--gold); background: var(--panel-2); }
  #tabs .spacer { flex: 1; }
  /* GM Screen embedded in the panel — the whole workspace, framed and token-authed. */
  #gm-view { display: flex; flex-direction: column; }
  #gm-frame { flex: 1; min-height: 0; width: 100%; border: 1px solid var(--border); border-radius: 5px; background: var(--bg); }
</style>
</head>
<body>

<!-- Top-level switch, shown once connected. Sign-out lives here so it's reachable
     from both Characters and the GM Screen. -->
<nav id="tabs" class="hide">
  <button class="btn tab" id="tab-chars" type="button" aria-selected="true">Characters</button>
  <button class="btn tab" id="tab-gm" type="button" aria-selected="false">GM Screen</button>
  <span class="spacer"></span>
  <!-- Same phone/desktop switch as the character sheet. size.js wires every
       [data-vtt-size] and resizes the whole popover, so the GM Screen (responsive
       at 760px) reflows to its desktop layout just like the sheets do. Kept in
       sync with the sheet's switch automatically. -->
  <button id="size-sw-tabs" class="size-sw" data-vtt-size hidden role="switch" aria-checked="false" title="Phone or desktop layout">
    <svg class="i-m" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 1h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 4v14h10V5H7z"/></svg>
    <span class="track"><span class="knob"></span></span>
    <svg class="i-d" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v10h16V5H4z"/></svg>
  </button>
  <button class="btn" id="forget" title="Remove this code from this browser">Sign out</button>
</nav>

<!-- Token entry -->
<section id="setup" class="hide grow" style="flex-direction:column;gap:12px;display:flex">
  <div>
    <h1>Connect your account</h1>
    <p class="sub" style="margin-top:4px">One-time setup for this browser.</p>
  </div>
  <div>
    <label for="tok">Access code</label>
    <input id="tok" type="text" placeholder="Paste your code" autocomplete="off" spellcheck="false">
  </div>
  <div class="row">
    <button class="btn primary" id="connect">Connect</button>
    <span id="setup-err" class="err"></span>
  </div>
  <p class="note">
    Create a code in Dungeon Crawler&rsquo;s Companion under <strong>Virtual Tabletop</strong>,
    then paste it here. It opens your character sheets and GM&nbsp;Screen at the table &mdash; it
    can&rsquo;t change your account or delete anything.
  </p>
</section>

<!-- Character list -->
<section id="list" class="hide grow" style="flex-direction:column;gap:10px;display:flex">
  <p class="sub" id="account"></p>
  <ol id="sheets" class="grow"></ol>
  <p class="note" id="empty" class="hide"></p>
</section>

<!-- GM Screen: the full workspace, framed and authenticated by the same access
     code. It never navigates the top window, so the Owlbear connection (owned by
     this popover) stays alive; its own campaign switches just reload this frame. -->
<section id="gm-view" class="hide grow">
  <iframe id="gm-frame" title="GM Screen"></iframe>
</section>

<!-- Sheet view: this page never navigates, so the Owlbear connection (which
     depends on the ?obrref= parameter it was opened with) stays alive. -->
<section id="sheet-view" class="hide">
  <div class="sheet-bar">
    <button class="btn" id="back">&larr; Characters</button>
    <span class="name" id="sheet-name"></span>
    <button id="size-sw" class="size-sw" data-vtt-size hidden role="switch" aria-checked="false" title="Phone or desktop layout">
      <svg class="i-m" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 1h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 4v14h10V5H7z"/></svg>
      <span class="track"><span class="knob"></span></span>
      <svg class="i-d" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v10h16V5H4z"/></svg>
    </button>
  </div>
  <iframe id="sheet-frame" title="Character sheet"></iframe>
</section>

<p id="loading" class="note">Loading&hellip;</p>

<script>
(function () {
  var KEY = "dcw_vtt_token";
  var $ = function (id) { return document.getElementById(id); };
  // The connected code, kept so the GM Screen tab can build its src on demand.
  var activeToken = null;

  function show(which) {
    $("loading").classList.add("hide");
    $("setup").classList.toggle("hide", which !== "setup");
    $("list").classList.toggle("hide", which !== "list");
    $("gm-view").classList.toggle("hide", which !== "gm");
    $("sheet-view").classList.toggle("hide", which !== "sheet");
    // Tabs belong to the two top-level connected views, not setup or a drilled-in sheet.
    var withTabs = which === "list" || which === "gm";
    $("tabs").classList.toggle("hide", !withTabs);
    if (withTabs) {
      $("tab-chars").setAttribute("aria-selected", which === "list" ? "true" : "false");
      $("tab-gm").setAttribute("aria-selected", which === "gm" ? "true" : "false");
    }
  }

  function readToken() {
    // A code in the URL wins (it's how the sheet's back link returns here) and
    // is remembered for next time.
    try {
      var u = new URL(window.location.href);
      var q = u.searchParams.get("t");
      if (q) { save(q); return q; }
    } catch (e) {}
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function save(t) { try { window.localStorage.setItem(KEY, t); } catch (e) {} }
  function forget() { try { window.localStorage.removeItem(KEY); } catch (e) {} }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function when(iso) {
    try {
      var d = new Date(iso), now = Date.now(), mins = Math.round((now - d.getTime()) / 60000);
      if (mins < 1) return "just now";
      if (mins < 60) return mins + "m ago";
      if (mins < 60 * 24) return Math.round(mins / 60) + "h ago";
      return d.toLocaleDateString();
    } catch (e) { return ""; }
  }

  function sheetBtn(s) {
    return '<button class="sheet" data-id="' + esc(s.id) + '">'
      + '<span class="sheet-name">' + esc(s.title || "Untitled") + '</span>'
      + '<span class="sheet-meta">' + esc(when(s.updatedAt)) + '</span></button>';
  }

  function load(token) {
    activeToken = token;
    fetch("/api/vtt/sheets", { headers: { "x-vtt-token": token } })
      .then(function (r) {
        if (r.status === 401) { forget(); show("setup"); $("setup-err").textContent = "That code was revoked."; return null; }
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data) return;
        $("account").textContent = data.account || "";
        var ol = $("sheets");
        if (!data.sheets.length) {
          ol.innerHTML = '<li class="note">No character sheets yet. Create one in the app and it will show up here.</li>';
        } else {
          // Grouped by system, Shadowdark first, so a table with both doesn't
          // read as one undifferentiated list.
          var GROUPS = [
            { key: "SD", name: "Shadowdark", cls: "sd" },
            { key: "DCC", name: "Dungeon Crawler Carl", cls: "dcc" },
            { key: "ACE", name: "ACE!", cls: "ace" },
            { key: "KOB", name: "Kids on Bikes", cls: "kob" },
            { key: "NIM", name: "Nimble", cls: "nim" },
            { key: "SW", name: "Star Wars", cls: "sw" },
            { key: "DND", name: "D&D", cls: "dnd" }
          ];
          var seen = {};
          var html = "";
          GROUPS.forEach(function (g) {
            var rows = data.sheets.filter(function (s) { return s.system === g.key; });
            rows.forEach(function (s) { seen[s.id] = true; });
            if (!rows.length) return;
            html += '<li class="group"><span class="group-head ' + g.cls + '">' + esc(g.name)
                 + " &middot; " + rows.length + "</span>"
                 + rows.map(sheetBtn).join("") + "</li>";
          });
          // Anything with an unrecognised system still gets listed rather than
          // silently disappearing.
          var rest = data.sheets.filter(function (s) { return !seen[s.id]; });
          if (rest.length) {
            html += '<li class="group"><span class="group-head">Other</span>'
                 + rest.map(sheetBtn).join("") + "</li>";
          }
          ol.innerHTML = html;
          Array.prototype.forEach.call(ol.querySelectorAll(".sheet"), function (b) {
            b.addEventListener("click", function () {
              // Load into the frame instead of navigating: leaving this page
              // would drop the ?obrref= parameter the Owlbear SDK needs, and
              // the connection can't be re-established.
              $("sheet-name").textContent = b.querySelector(".sheet-name").textContent;
              $("sheet-frame").src = "/vtt/sheet/" + encodeURIComponent(b.getAttribute("data-id"))
                + "?t=" + encodeURIComponent(token);
              show("sheet");
            });
          });
        }
        show("list");
      })
      .catch(function () {
        show("setup");
        $("setup-err").textContent = "Couldn't reach the app. Try again.";
      });
  }

  $("connect").addEventListener("click", function () {
    var t = $("tok").value.trim();
    if (!t) { $("setup-err").textContent = "Paste your code first."; return; }
    $("setup-err").textContent = "";
    save(t);
    $("loading").classList.remove("hide");
    $("setup").classList.add("hide");
    load(t);
  });
  $("tok").addEventListener("keydown", function (e) { if (e.key === "Enter") $("connect").click(); });
  $("forget").addEventListener("click", function () {
    forget();
    activeToken = null;
    $("gm-frame").removeAttribute("src");       // drop the GM Screen so a new code loads fresh
    show("setup");
  });
  $("back").addEventListener("click", function () {
    $("sheet-frame").removeAttribute("src");   // stop the sheet polling in the background
    show("list");
  });

  // Top-level tabs. The GM Screen frame is built lazily the first time it's
  // opened and then kept, so switching back and forth doesn't reload the whole
  // workspace (or re-download a large board).
  $("tab-chars").addEventListener("click", function () { show("list"); });
  $("tab-gm").addEventListener("click", function () {
    var f = $("gm-frame");
    if (activeToken && !f.getAttribute("src")) {
      f.setAttribute("src", "/vtt/gm-screen?t=" + encodeURIComponent(activeToken));
    }
    show("gm");
  });

  var token = readToken();
  if (token) load(token); else show("setup");
})();
</script>
</body>
</html>`;

export async function GET() {
  return new Response(PAGE, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
