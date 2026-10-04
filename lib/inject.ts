import type { ToolDef } from "@/lib/tools";
import { miniBar, miniBarHead } from "@/lib/minibar";

function inlineJson(value: unknown): string {
  return JSON.stringify(value ?? {}).replace(/</g, "\\u003c");
}

// Shim strategy: instead of patching localStorage (unreliable on iOS WebKit),
// we expose server state directly as window.__ddState and let the tool read it.
// The tool's autoLoad() checks window.__ddState first, falls back to localStorage.
// Saves go directly to the server API — no localStorage dependency.
const SHIM = `
(function () {
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) { window.location.reload(); }
  });

  var cfg = window.__DD__ || { keys: [], state: {}, docId: null };
  // Framed by a VTT, the session cookie (SameSite=Lax) is never sent, so saves
  // go to the token-authenticated endpoint instead.
  var vttToken = cfg.vttToken || null;

  // Framed by a VTT, the session cookie isn't sent, so every call the sheet
  // makes to our own API would come back 401 — that's what left campaign rolls
  // and shared homebrew empty. Rather than thread the token through each call
  // site in the sheet, attach it here to same-origin /api/ requests.
  if (vttToken && typeof window.fetch === "function") {
    var nativeFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var ours = url.indexOf("/api/") === 0;
      if (!ours) return nativeFetch(input, init);
      var opts = init ? Object.assign({}, init) : {};
      var h = new Headers(opts.headers || (typeof input !== "string" && input.headers) || {});
      h.set("x-vtt-token", vttToken);
      opts.headers = h;
      return nativeFetch(typeof input === "string" ? input : input.url, opts);
    };
  }
  var url = vttToken
    ? "/api/vtt/documents/" + cfg.docId
    : "/api/documents/" + cfg.docId;

  // Expose server state directly — tools read this instead of localStorage
  window.__ddState = cfg.state || {};
  window.__ddDocId = cfg.docId;

  var saving = false, queued = false;
  var lastTitle = null;
  // Optimistic concurrency. curRev is the version this tab is based on (the
  // sheet's updatedAt at load, then whatever the server reports after each of
  // OUR saves). We send it with every data save; the server refuses the write if
  // the stored version moved on (another tab or device saved in the meantime),
  // so a stale tab closing can never clobber newer progress. lastSavedJson lets
  // us skip a save that wouldn't change anything — so an untouched tab, which is
  // exactly how sheets used to get wiped, never even sends a write.
  var curRev = (typeof cfg.rev === "number") ? cfg.rev : null;
  var lastSavedJson = null;
  try { lastSavedJson = JSON.stringify(cfg.state || {}); } catch (e) {}
  var conflicted = false;

  // NOTE: fetch keepalive caps the request body at 64KB. Anything bigger (a
  // sheet with a portrait, a prep doc with map images) is rejected outright, so
  // keepalive is only used when the payload is comfortably under that limit.
  var KEEPALIVE_MAX = 60000;

  function patch(body, keepalive) {
    var payload = JSON.stringify(body);
    var headers = { "content-type": "application/json" };
    if (vttToken) headers["x-vtt-token"] = vttToken;
    return fetch(url, {
      method: "PATCH",
      credentials: "same-origin",
      keepalive: !!keepalive && payload.length < KEEPALIVE_MAX,
      headers: headers,
      body: payload
    });
  }

  // A fixed warning bar shown once this tab's saves start being refused because
  // the sheet changed somewhere else. It offers a reload (which pulls the current
  // version) and, from here on, this tab stops trying to save so it can't fight
  // the other copy.
  function showConflict() {
    if (document.getElementById("dd-conflict")) return;
    var bar = document.createElement("div");
    bar.id = "dd-conflict";
    bar.setAttribute("role", "alert");
    bar.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:2147483647;background:#7a1f1a;color:#fff;font:600 13px/1.4 system-ui,sans-serif;padding:10px 14px;display:flex;gap:12px;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,.4)";
    var msg = document.createElement("span");
    msg.textContent = "This sheet was changed in another tab or on another device. To avoid overwriting that, changes here are no longer being saved.";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Reload latest";
    btn.style.cssText = "flex:0 0 auto;background:#fff;color:#7a1f1a;border:0;border-radius:5px;padding:6px 12px;font:600 12px system-ui,sans-serif;cursor:pointer";
    btn.onclick = function () { try { window.location.reload(); } catch (e) {} };
    bar.appendChild(msg); bar.appendChild(btn);
    (document.body || document.documentElement).appendChild(bar);
  }

  // Apply the version the server reports after a successful write, so this tab
  // stays current and its next save isn't flagged as stale against its own work.
  function applyRev(r) {
    try {
      return r.json().then(function (j) { if (j && typeof j.rev === "number") curRev = j.rev; }, function () {});
    } catch (e) { return; }
  }

  // Save status → the mini-bar's chip (window.__ddStatus, provided by the bar).
  // Before this the sheet was completely silent: a 401 (session expired) and
  // every network error were swallowed, so edits were dropped with no sign.
  function status(kind, text) {
    try { if (typeof window.__ddStatus === "function") window.__ddStatus(kind, text); } catch (e) {}
  }
  var signedOut = false;
  var lastData = null;   // the newest data handed to save(), for retries

  function save(data) {
    if (conflicted || signedOut) return;     // refused once — don't keep fighting
    lastData = data;
    var json;
    try { json = JSON.stringify(data); } catch (e) { json = null; }
    // Nothing actually changed since our last save/load → don't write at all.
    if (json !== null && json === lastSavedJson) return;
    if (saving) { queued = data; return; }
    saving = true;
    status("saving", "Saving…");
    var body = { data: data };
    if (curRev !== null) body.baseRev = curRev;
    // keepalive lets the request survive navigation back to the dashboard
    patch(body, true)
      .then(function(r) {
        if (r.status === 401) {
          // Session expired: say so, and stop pretending to save.
          signedOut = true;
          status("error", "Signed out — changes not saved");
          return;
        }
        if (r.status === 409) { conflicted = true; status("error", "Changed elsewhere — not saved"); showConflict(); return; }
        if (!r.ok) throw new Error(r.status);
        if (json !== null) lastSavedJson = json;
        status("saved", "Saved");
        return applyRev(r);
      })
      .catch(function(e) {
        // Network/server failure: keep lastSavedJson as it was so this data is
        // still "unsaved", and try again shortly (every 5s while it keeps failing).
        status("error", "Save failed — retrying");
        // Retry the NEWEST data (never this call's possibly-stale snapshot).
        setTimeout(function () { if (!saving && !conflicted && !signedOut && lastData) save(lastData); }, 5000);
      })
      .finally(function() {
        saving = false;
        if (queued && !conflicted && !signedOut) { var d = queued; queued = null; save(d); }
        else { queued = null; }
      });
  }

  // __ddSaveTitle(title) — push the document title (e.g. the character's name)
  // straight to the server so the dashboard card renames itself. Skipped when
  // the title hasn't changed, and sent with keepalive so it survives unload.
  function saveTitle(title) {
    title = (title || "").trim().slice(0, 120);
    if (!title || title === lastTitle || conflicted) return;
    lastTitle = title;
    patch({ title: title }, true).then(function (r) { if (r && r.ok) return applyRev(r); }, function () {}).catch(function(e) {});
    var label = document.querySelector("#dd-bar .dd-title");
    if (label) label.textContent = title;
    try { document.title = title; } catch (e) {}
  }

  // __ddSave(data) — call with the data object to save directly to server
  window.__ddSave = save;
  window.__ddSaveTitle = saveTitle;
})();
`;

// Preview-only mode: hide the editing sidebar (and its pull-tab) so only the
// rendered pages show, and neutralise server writes so an embedded, read-only
// view can never clobber the saved document. The session-prep builders share
// the same `.sidebar` / `.preview-area` markup, so one block covers both.
const PREVIEW = `
<style id="dd-preview-style">
  /* Editing controls of both builders: SD uses .sidebar-pull-tab, DCC uses
     .sidebar-tab (and moves it onto <body> on narrow widths) + #collapse-btn. */
  .sidebar, .sidebar-pull-tab, .sidebar-tab, #collapse-btn { display: none !important; }
  body.sidebar-collapsed .sidebar-tab { display: none !important; }
  .preview-area { flex: 1 1 auto !important; width: 100% !important; }
  /* The DCC builder's mobile layout reserves margin-top (82px !important) for
     its fixed sidebar header — hidden above, so drop the reservation or the
     GM Screen's Adventure pane shows a blank band at the top. body-qualified
     to out-specify the builder's own !important rule. */
  body .preview-area { margin-top: 0 !important; }
  #dd-bar { display: none !important; }
</style>
<script>
(function () {
  // Read-only: keep the tool's own state in memory but block any save to the
  // server. Set synchronously so the no-op wins over the shim's real save.
  window.__ddSave = function () {};
  window.__ddSaveTitle = function () {};
})();
</script>`;

// The sheet's dark-mode localStorage key, derived from its template filename
// ("sd_character_sheet.html" → "sd_dark"). Every sheet follows this convention
// (body.dark toggled, "<prefix>_dark" = "1"/"0"), which is what lets ONE global
// theme preference drive all fourteen.
function themeKeyFor(def: ToolDef): string | undefined {
  if (def.kind !== "character") return undefined;
  const m = /^([a-z0-9]+)_/.exec(def.file);
  return m ? `${m[1]}_dark` : undefined;
}

export function renderToolPage(
  html: string,
  opts: {
    docId: string;
    def: ToolDef;
    data: unknown;
    title: string;
    /** Optimistic-concurrency stamp (document updatedAt in ms) sent back with
     *  each save so the server can refuse a stale overwrite. */
    rev?: number;
    /** Set when the page is framed by a VTT: saves authenticate with this. */
    vttToken?: string;
    /** Hide the editing sidebar/chrome and serve a read-only preview. */
    previewOnly?: boolean;
    /** Framed by our first-party VTT popup (same-origin): hide the Home chrome
     *  but keep the sheet fully editable. */
    embed?: boolean;
    /** Page-specific places to go next, shown in the mini-bar menu (e.g. the
     *  sheet's campaign, its Tabletop / Owlbear room). */
  },
): string {
  const cfg = {
    docId: opts.docId,
    keys: opts.def.keys,
    state: opts.data ?? {},
    ...(typeof opts.rev === "number" ? { rev: opts.rev } : {}),
    ...(opts.vttToken ? { vttToken: opts.vttToken } : {}),
  };
  const framed = !!opts.vttToken || !!opts.previewOnly || !!opts.embed;
  const themeKey = themeKeyFor(opts.def);
  // The tool templates are standalone HTML, not rendered by the app's layout,
  // so they never pick up its favicon. Without this the browser falls back to
  // whatever /favicon.ico serves — the tab for a character sheet shouldn't be
  // the odd one out.
  const favicon = `<link rel="icon" type="image/png" href="/icon-64.png">`;
  // Shared tokens + this system's accent + the global theme seed go in FIRST
  // (before the template's own <style>s) so the sheet can still override.
  // In framed/preview modes the theme seed is skipped: the framing page owns
  // appearance there.
  const head = miniBarHead(opts.def.system, framed ? undefined : themeKey);
  const bootstrap = `${favicon}\n${head}\n<script>window.__DD__=${inlineJson(cfg)};</script>\n<script>${SHIM}</script>${opts.previewOnly ? PREVIEW : ""}`;

  let out = html.replace(/<head[^>]*>/i, (m) => `${m}\n${bootstrap}`);

  // Framed by a VTT the sheet is the *contents* of a panel: the popover around
  // it provides the back button, the title and the size switch, and the panel
  // is small enough that a bar would just cover the sheet. It also must not
  // navigate itself anywhere, since the popover owns the Owlbear connection.
  // Otherwise: the shared mini-bar (site navigation, system, save status).
  if (!framed) {
    const bar = miniBar({
      system: opts.def.system,
      crumb: opts.def.kind === "character" ? "Characters" : "Adventures",
      title: opts.title,
      status: true,
      themeKey,
    });
    out = out.replace(/<body[^>]*>/i, (m) => `${m}\n${bar}`);
  }
  return out;
}
