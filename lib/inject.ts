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

  function save(data) {
    if (saving) { queued = data; return; }
    saving = true;
    // keepalive lets the request survive navigation back to the dashboard
    patch({ data: data }, true)
      .then(function(r) {
        if (r.status === 401) { return; }
        if (!r.ok) throw new Error(r.status);
      })
      .catch(function(e) {})
      .finally(function() {
        saving = false;
        if (queued) { var d = queued; queued = null; save(d); }
      });
  }

  // __ddSaveTitle(title) — push the document title (e.g. the character's name)
  // straight to the server so the dashboard card renames itself. Skipped when
  // the title hasn't changed, and sent with keepalive so it survives unload.
  function saveTitle(title) {
    title = (title || "").trim().slice(0, 120);
    if (!title || title === lastTitle) return;
    lastTitle = title;
    patch({ title: title }, true).catch(function(e) {});
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

function chrome(title: string, opts: { backHref: string; backLabel: string }): string {
  const safeTitle = title.replace(/</g, "\\u003c");
  const btn = "color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none";
  // Inside a VTT the sheet is stuck in whatever size the popover is, so it gets
  // a control to widen it — the sheets are responsive, so a wider popover is
  // what turns the phone layout into the desktop one. Hidden until the SDK
  // confirms we're actually inside Owlbear Rodeo.
  return `<div id="dd-chrome" style="position:fixed;top:8px;left:8px;z-index:2147483647;display:flex;gap:10px;align-items:center;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="${opts.backHref}" style="${btn}">&larr; ${opts.backLabel}</a>
<span class="dd-title" style="color:#8a8a93;max-width:30vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${safeTitle}</span>
</div>`;
}

export function renderToolPage(
  html: string,
  opts: {
    docId: string;
    def: ToolDef;
    data: unknown;
    title: string;
    /** Set when the page is framed by a VTT: saves authenticate with this. */
    vttToken?: string;
    /** Hide the editing sidebar/chrome and serve a read-only preview. */
    previewOnly?: boolean;
  },
): string {
  const cfg = {
    docId: opts.docId,
    keys: opts.def.keys,
    state: opts.data ?? {},
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
  if (!opts.vttToken && !opts.previewOnly) {
    out = out.replace(/<body[^>]*>/i, (m) =>
      `${m}\n${chrome(opts.title, { backHref: "/dashboard", backLabel: "Home" })}`);
  }
  return out;
}
