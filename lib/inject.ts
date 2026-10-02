import type { ToolDef } from "@/lib/tools";

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

  function save(data) {
    if (conflicted) return;                 // refused once — don't keep fighting
    var json;
    try { json = JSON.stringify(data); } catch (e) { json = null; }
    // Nothing actually changed since our last save/load → don't write at all.
    if (json !== null && json === lastSavedJson) return;
    if (saving) { queued = data; return; }
    saving = true;
    var body = { data: data };
    if (curRev !== null) body.baseRev = curRev;
    // keepalive lets the request survive navigation back to the dashboard
    patch(body, true)
      .then(function(r) {
        if (r.status === 401) { return; }
        if (r.status === 409) { conflicted = true; showConflict(); return; }
        if (!r.ok) throw new Error(r.status);
        if (json !== null) lastSavedJson = json;
        return applyRev(r);
      })
      .catch(function(e) {})
      .finally(function() {
        saving = false;
        if (queued && !conflicted) { var d = queued; queued = null; save(d); }
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
    var label = document.querySelector("#dd-chrome .dd-title");
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
  #dd-chrome { display: none !important; }
</style>
<script>
(function () {
  // Read-only: keep the tool's own state in memory but block any save to the
  // server. Set synchronously so the no-op wins over the shim's real save.
  window.__ddSave = function () {};
  window.__ddSaveTitle = function () {};
})();
</script>`;

function chrome(opts: { backHref: string; backLabel: string }): string {
  const btn = "color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none";
  // Just the Home button. The character/session name used to sit here too, but
  // it's already shown inside the sheet, so the tag was redundant and in the way.
  // (saveTitle() still pushes the name to the server for the dashboard card; it
  // no longer has an on-page label to update, which its `if (label)` guard allows.)
  return `<div id="dd-chrome" style="position:fixed;top:8px;left:8px;z-index:2147483647;display:flex;gap:10px;align-items:center;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="${opts.backHref}" style="${btn}">&larr; ${opts.backLabel}</a>
</div>`;
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
  },
): string {
  const cfg = {
    docId: opts.docId,
    keys: opts.def.keys,
    state: opts.data ?? {},
    ...(typeof opts.rev === "number" ? { rev: opts.rev } : {}),
    ...(opts.vttToken ? { vttToken: opts.vttToken } : {}),
  };
  // The tool templates are standalone HTML, not rendered by the app's layout,
  // so they never pick up its favicon. Without this the browser falls back to
  // whatever /favicon.ico serves — the tab for a character sheet shouldn't be
  // the odd one out.
  const favicon = `<link rel="icon" type="image/png" href="/icon-64.png">`;
  const bootstrap = `${favicon}\n<script>window.__DD__=${inlineJson(cfg)};</script>\n<script>${SHIM}</script>${opts.previewOnly ? PREVIEW : ""}`;

  let out = html.replace(/<head[^>]*>/i, (m) => `${m}\n${bootstrap}`);

  // Framed by a VTT the sheet is the *contents* of a panel: the popover around
  // it provides the back button, the title and the size switch, and the panel
  // is small enough that a floating bar would just cover the sheet. It also
  // must not navigate itself anywhere, since the popover owns the Owlbear
  // connection.
  if (!opts.vttToken && !opts.previewOnly && !opts.embed) {
    out = out.replace(/<body[^>]*>/i, (m) =>
      `${m}\n${chrome({ backHref: "/dashboard", backLabel: "Home" })}`);
  }
  return out;
}
