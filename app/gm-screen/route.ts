import { readFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GM_TOOL = "gm-screen";

// The chrome bar injected at top of <body> — matches the style from lib/inject.ts
const CHROME = `<div id="dd-chrome" style="position:fixed;top:8px;left:8px;z-index:2147483647;display:flex;gap:10px;align-items:center;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="/dashboard" style="color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none">&larr; Home</a>
<span id="dd-status" style="color:#6f6f78"></span>
<a href="/gm-screen/clear" style="color:#6f6f78;font-size:9px;opacity:.5;text-decoration:none" title="Clear saved GM Screen state (use if page fails to load)">reset</a>
</div>`;

// Shim: loads saved state on startup, auto-saves on changes
const SHIM = `
<script>
(function () {
  var API = "/api/gm-screen";
  var timer = null, saving = false, dirty = false;
  function status(s) { var el = document.getElementById("dd-status"); if (el) el.textContent = s; }

  function schedule() {
    dirty = true;
    status("Saving\\u2026");
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, 800);
  }

  function flush() {
    if (saving || !dirty) return;
    dirty = false; saving = true;
    var data = null;
    try { data = window.__gmScreenGetState ? window.__gmScreenGetState() : null; } catch(e) {}
    if (!data) { saving = false; return; }
    fetch(API, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(r) { if (!r.ok) throw new Error(r.status); status("Saved"); })
      .catch(function() { dirty = true; status("Save failed — retrying"); })
      .finally(function() { saving = false; if (dirty) setTimeout(schedule, 2000); });
  }

  // Save on beforeunload
  window.addEventListener("beforeunload", function() {
    if (dirty) {
      var data = null;
      try { data = window.__gmScreenGetState ? window.__gmScreenGetState() : null; } catch(e) {}
      if (data) try {
        fetch(API, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(data), keepalive: true });
      } catch(e) {}
    }
  });

  // Load saved state once the page is ready, then hook into save events
  window.addEventListener("DOMContentLoaded", function() {
    fetch(API)
      .then(function(r) { return r.json(); })
      .then(function(saved) {
        if (saved && Object.keys(saved).length > 0 && window.__gmScreenSetState) {
          window.__gmScreenSetState(saved);
          status("Loaded");
          setTimeout(function() { status(""); }, 2000);
        }
        // Hook the manual saveSession / loadSession buttons so they also trigger auto-save
        var origSave = window.saveSession;
        if (origSave) window.saveSession = function() { origSave(); schedule(); };
      })
      .catch(function() {});

    // Poll for state changes every 30s as a fallback
    setInterval(schedule, 30000);
  });

  // Expose the schedule function globally so combat/notes changes can trigger it
  window.__ddScheduleSave = schedule;
})();
</script>`;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Load any saved state for this user
  const doc = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL },
    select: { data: true },
  });

  const savedState = doc?.data ?? null;

  const filePath = path.join(process.cwd(), "tools", "templates", "gm_screen.html");
  let html = await readFile(filePath, "utf8");

  // Inject saved state so the shim can restore it immediately on load
  const stateScript = savedState
    ? `<script>window.__gmInitialState__ = ${JSON.stringify(savedState).replace(/</g, "\\u003c")};</script>\n`
    : "";

  // Inject shim + state before </head>
  html = html.replace(/<\/head>/i, `${stateScript}${SHIM}\n</head>`);

  // Inject chrome (← Home button) after <body>
  html = html.replace(/<body([^>]*)>/i, (m) => `${m}\n${CHROME}`);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache",
      "expires": "0",
    },
  });
}
