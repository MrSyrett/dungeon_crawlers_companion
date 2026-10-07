import type { ToolDef } from "@/lib/tools";
import { miniBarHead, hasThemeFor } from "@/lib/minibar";
import { siteNav } from "@/lib/sitenav";
import type { SystemKey } from "@/components/systemStore";

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

  // ONE PATCH AT A TIME, DATA AND TITLE ALIKE.
  // saving covers any write in flight; queued holds data waiting to go next and
  // pendingTitle a title waiting behind it. Title writes used to run loose,
  // concurrently with data saves, and that was a live bug: saveState() in every
  // session prep builder calls __ddSave() and then syncDocTitle() back to back,
  // so on a new or imported adventure both went out together. The title body is
  // a few dozen bytes and the prep payload is often megabytes of maps, so the
  // title landed first and bumped updatedAt — and the data write that was
  // already in flight arrived carrying a baseRev the server had just moved past.
  // It was refused, the "changed in another tab" bar came up, saving went dead
  // for the session, and the adventure's first write was lost. Serialising the
  // two means each one adopts the rev the other produced.
  var saving = false, queued = false, pendingTitle = null;
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
  var recoveries = 0;      // benign rev skews we have re-synced past
  var RECOVERY_MAX = 3;

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

  // A 409 means the stored VERSION moved on. It does not necessarily mean the
  // stored CONTENT did, and only the content is worth warning about: the bar
  // exists to stop this tab overwriting someone else's work, not to punish a
  // version stamp that drifted for a reason of our own making.
  //
  // So before accusing another tab, read the document back and compare what is
  // stored against what this tab last successfully wrote. If they are the same
  // bytes, nothing of ours is at risk — adopt the current version and retry.
  // If they differ, something really did change elsewhere: show the bar and
  // stop, exactly as before. Bounded, so a server that keeps refusing can't put
  // us in a loop.
  function refused(res) {
    if (recoveries >= RECOVERY_MAX) return giveUp();
    recoveries++;
    var headers = {};
    if (vttToken) headers["x-vtt-token"] = vttToken;
    // The VTT endpoint is PATCH-only, so this probe 404s there and we fall
    // through to giveUp() — the conservative answer, and what used to happen.
    fetch(url, { credentials: "same-origin", headers: headers })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (doc) {
        if (!doc) return giveUp();
        var storedJson;
        try { storedJson = JSON.stringify(doc.data); } catch (e) { return giveUp(); }
        if (lastSavedJson === null || storedJson !== lastSavedJson) return giveUp();
        var t = doc.updatedAt ? new Date(doc.updatedAt).getTime() : NaN;
        if (!isFinite(t)) return giveUp();
        curRev = t;
        status("saving", "Saving…");
        if (lastData) save(lastData);
      }, giveUp)
      .catch(giveUp);
    function giveUp() {
      conflicted = true;
      status("error", "Changed elsewhere — not saved");
      showConflict();
    }
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
        if (r.status === 409) { refused(r); return; }
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
        flushTitle();
      });
  }

  // __ddSaveTitle(title) — push the document title (e.g. the character's name)
  // straight to the server so the dashboard card renames itself. Skipped when
  // the title hasn't changed, and sent with keepalive so it survives unload.
  //
  // The on-screen label is updated immediately either way; only the WRITE waits
  // its turn behind a data save, because a title write bumps the same updatedAt
  // the data save is holding as its baseRev.
  function saveTitle(title) {
    title = (title || "").trim().slice(0, 120);
    if (!title || title === lastTitle || conflicted) return;
    lastTitle = title;
    var label = document.querySelector("#dd-bar .dd-title, #dd-nav .dd-title");
    if (label) label.textContent = title;
    try { document.title = title; } catch (e) {}
    if (saving) { pendingTitle = title; return; }
    sendTitle(title);
  }

  // A title write moves the same updatedAt the data writes are versioned on, so
  // it carries baseRev and is checked like any other write. Two reasons, and the
  // second is the important one:
  //   - if it is accepted, this tab really was current, so adopting the rev it
  //     returns is sound;
  //   - if it is NOT checked, it launders a stale tab into a current one. The
  //     response's rev would be adopted, and the next data write would sail past
  //     the guard and overwrite whatever the other device had saved. The bar
  //     would never appear, which is worse than it appearing wrongly.
  function sendTitle(title) {
    saving = true;
    var body = { title: title };
    if (curRev !== null) body.baseRev = curRev;
    patch(body, true)
      .then(function (r) {
        if (!r) return;
        if (r.status === 409) { refused(r); return; }
        if (r.ok) return applyRev(r);
      }, function () {})
      .catch(function (e) {})
      .finally(function () {
        saving = false;
        if (queued && !conflicted && !signedOut) { var d = queued; queued = null; save(d); }
        else { flushTitle(); }
      });
  }

  function flushTitle() {
    if (pendingTitle === null || saving || conflicted || signedOut) return;
    var t = pendingTitle; pendingTitle = null;
    sendTitle(t);
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
  #dd-bar, #dd-nav { display: none !important; }
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
    /** For the navbar's account control — its tooltip and the Admin chip. */
    email?: string;
    isAdmin?: boolean;
    /** Systems an admin has hidden, so the bar's system dropdown matches the
     *  one the Next pages show. */
    hiddenKeys?: SystemKey[];
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
  //
  // The system's skin (public/tokens.css) is NOT tied to being framed. It used to
  // be — `!framed && hasThemeFor(...)` — on the reasoning that "the page around us
  // owns appearance", which conflated two different things. The host page owns the
  // CHROME, and `framed` still suppresses that (no navbar). But a character sheet's
  // own paper, palette and faces belong to the sheet, so the same Shadowdark sheet
  // looked skinned on its own page and unskinned inside the VTT or the Owlbear
  // popover — one template, two different appearances, for no reason the reader
  // benefits from.
  //
  // The dark-mode seed rides along for the same reason: without it a framed sheet
  // painted light and then flipped once the sheet's own init read the preference.
  //
  // previewOnly stays unskinned: that is a prep document embedded read-only in the
  // GM Screen's Adventure pane, not a sheet someone is playing from, and restyling
  // the inside of the console is a separate decision from this one.
  const themed = !opts.previewOnly && hasThemeFor(opts.def.system);
  const head = miniBarHead(opts.def.system, opts.previewOnly ? undefined : themeKey, themed);
  const bootstrap = `${favicon}\n${head}\n<script>window.__DD__=${inlineJson(cfg)};</script>\n<script>${SHIM}</script>${opts.previewOnly ? PREVIEW : ""}`;

  let out = html.replace(/<head[^>]*>/i, (m) => `${m}\n${bootstrap}`);

  // Switch the skin on at the <html> tag rather than from a script, so the page
  // is never painted once unthemed and then again themed.
  // data-tool tells the skin which of the two documents it is in. The sheets
  // and the prep builders share several variable names for different jobs
  // (--green is a heal button on a sheet and a section label in a prep), so a
  // skin that re-points one must not reach the other.
  if (themed) {
    out = out.replace(
      /<html\b([^>]*)>/i,
      (m, attrs: string) =>
        /\bdata-system=/i.test(attrs)
          ? m
          : `<html${attrs} data-system="${opts.def.system}" data-tool="${opts.def.kind}" data-themed="1">`,
    );
  }

  // Framed by a VTT the sheet is the *contents* of a panel: the popover around
  // it provides the back button, the title and the size switch, and the panel
  // is small enough that a bar would just cover the sheet. It also must not
  // navigate itself anywhere, since the popover owns the Owlbear connection.
  //
  // Otherwise: the SITE NAVBAR, the same one the Next pages wear. These used to
  // get the 36px mini-bar, which is the main reason they read as a different
  // product from the rest of the site. The GM Screen and the VTT keep the
  // mini-bar — they are full-bleed working surfaces with their own dense
  // toolbars, where the 16px is worth more than matching chrome.
  if (!framed) {
    const bar = siteNav({
      system: opts.def.system,
      email: opts.email ?? "",
      isAdmin: opts.isAdmin,
      hiddenKeys: opts.hiddenKeys,
      status: true,
      // The adventure-prep builders lay their body out as a flex row
      // (sidebar | preview), which would turn a sticky bar into a column down
      // the left edge. The sheets are flex columns and want the sticky bar.
      fixed: opts.def.kind === "session",
      sheetFit: opts.def.kind === "character",
      // Switching system from a document has no counterpart to go to, so it goes
      // to the dashboard list of the same KIND — a sheet lands on Characters, an
      // Adventure Prep doc on Adventures. It used to always say Characters.
      onSystemSwitch: opts.def.kind === "session" ? "adventures" : "characters",
    });
    out = out.replace(/<body[^>]*>/i, (m) => `${m}\n${bar}`);
  }
  return out;
}
