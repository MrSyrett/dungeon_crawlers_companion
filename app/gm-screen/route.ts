import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loadToolTemplate } from "@/lib/tools";

const GM_TOOL = "gm-screen";

// The chrome bar injected at top of <body> — matches the style from lib/inject.ts
const CHROME = `<div id="dd-chrome" style="position:fixed;top:8px;left:8px;z-index:2147483647;display:flex;gap:10px;align-items:center;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="/dashboard" style="color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none">&larr; Home</a>
<span id="dd-status" style="color:#6f6f78"></span>
<a href="/gm-screen/clear" style="color:#6f6f78;font-size:9px;opacity:.5;text-decoration:none" title="Clear saved GM Screen state (use if page fails to load)">reset</a>
</div>`;

// Shim: loads the last-used board on startup, auto-saves on changes, and drives
// the save-then-reload dance when the GM switches campaigns.
const SHIM = `
<script>
(function () {
  var API = "/api/gm-screen";
  var timer = null, saving = false, dirty = false;
  function status(s) { var el = document.getElementById("dd-status"); if (el) el.textContent = s; }

  function getState() {
    try { return window.__gmScreenGetState ? window.__gmScreenGetState() : null; } catch(e) { return null; }
  }

  function schedule() {
    // While a campaign switch is mid-flight, don't let an autosave write the
    // half-swapped board under the wrong campaign.
    if (window.__ddCampaignSwitching) return;
    dirty = true;
    status("Saving\\u2026");
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, 800);
  }

  function flush() {
    if (saving || !dirty || window.__ddCampaignSwitching) return;
    dirty = false; saving = true;
    var data = getState();
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

  // Save on beforeunload (skipped mid-switch: the switch already flushed).
  window.addEventListener("beforeunload", function() {
    if (dirty && !window.__ddCampaignSwitching) {
      var data = getState();
      if (data) try {
        fetch(API, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(data), keepalive: true });
      } catch(e) {}
    }
  });

  // Apply a saved board. The switching guard keeps the campaign-link restore
  // inside setState from tripping the switch machinery or an autosave.
  function applyInitial(saved) {
    if (saved && Object.keys(saved).length > 0 && window.__gmScreenSetState) {
      window.__ddCampaignSwitching = true;
      try { window.__gmScreenSetState(saved); } finally { window.__ddCampaignSwitching = false; }
      status("Loaded");
      setTimeout(function() { status(""); }, 2000);
    }
  }

  function hookManualSave() {
    var origSave = window.saveSession;
    if (origSave) window.saveSession = function() { origSave(); schedule(); };
  }

  // After the board is applied, force the campaign link from the object stashed
  // by the picker before reload. This makes the button/link update reliably even
  // if the loaded board saved its link in an older shape, and the follow-up
  // autosave then rewrites that board in the correct shape (self-healing).
  function activatePending() {
    try {
      var pend = sessionStorage.getItem("dd-activate-campaign");
      if (pend === null) return;
      sessionStorage.removeItem("dd-activate-campaign");
      var camp = JSON.parse(pend);
      if (!window.GMCamp || typeof window.GMCamp.set !== "function") return;
      // If the restored board already activated the intended campaign, don't
      // re-set it — that would kick off a second full roll-history poll.
      var cur = (typeof window.GMCamp.get === "function") ? window.GMCamp.get() : null;
      var curId = cur && cur.id ? String(cur.id) : null;
      var wantId = camp && camp.id ? String(camp.id) : null;
      if (curId === wantId) return;
      window.GMCamp.set(camp);
    } catch (e) {}
  }

  // Load the last-used board once the page is ready, then wire up auto-save.
  window.addEventListener("DOMContentLoaded", function() {
    // Prefer the state injected server-side (no round-trip / no flash); fall
    // back to fetching the last-used board.
    var boot = (window.__gmInitialState__ && Object.keys(window.__gmInitialState__).length)
      ? Promise.resolve(window.__gmInitialState__)
      : fetch(API).then(function(r) { return r.json(); });

    boot
      .then(function(saved) { applyInitial(saved); activatePending(); hookManualSave(); })
      .catch(function() { activatePending(); hookManualSave(); });

    // Poll for state changes every 30s as a fallback
    setInterval(schedule, 30000);
  });

  // ── Campaign-switch hooks (called by the GM screen's campaign picker) ──

  // Save the current board right now, keyed by whatever campaign it currently
  // reflects. Returns a promise so the switch can wait for it before reloading.
  window.__ddFlushNow = function() {
    var data = getState();
    if (!data) return Promise.resolve();
    dirty = false;
    return fetch(API, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }).then(function() { status("Saved"); }).catch(function() {});
  };

  // Mark a campaign as the one to open after the reload (bumps it to last-used,
  // creating an empty linked board if it has none yet). Pass null to open the
  // personal / unlinked board.
  window.__ddSelectCampaign = function(campaign) {
    return fetch(API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ campaign: campaign || null })
    }).then(function(r) { if (!r.ok) throw new Error(r.status); }).catch(function() {});
  };

  // Expose the schedule function globally so combat/notes changes can trigger it
  window.__ddScheduleSave = schedule;
})();
</script>`;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Load the last-used board for this user (most recently updated), so opening
  // the GM Screen reopens the campaign you were last working in.
  const doc = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL },
    orderBy: { updatedAt: "desc" },
    select: { data: true },
  });

  const savedState = doc?.data ?? null;

  let html = await loadToolTemplate("gm_screen.html");

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
