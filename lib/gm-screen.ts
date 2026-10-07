import { loadToolTemplate } from "@/lib/tools";
import { prisma } from "@/lib/prisma";
import { getHiddenSystemKeys } from "@/lib/systems";
import { miniBar, miniBarHead } from "@/lib/minibar";
import { isSystemKey, type SystemKey } from "@/components/systemStore";

// Shared builder for the GM Screen HTML page. Two routes render it:
//   • app/gm-screen (cookie auth, full page) — no token, the shared mini-bar
//     (site navigation, system chip, save status) at the top.
//   • app/vtt/gm-screen (VTT token auth, framed inside the Owlbear popover) —
//     token fetch-patch so /api/ calls carry x-vtt-token, status-only chrome.
// Extracted verbatim from the original app/gm-screen route so behaviour is
// identical for the cookie path.

// What the saved board tells us about its campaign. The GM Screen serializes
// its link as { campaign: { campaign: {id,name,code,system,vttUrl?}, hideRolls } }
// (older boards: { campaign: {id,...} }). Fail soft: nothing → unlinked board.
function campaignOf(state: unknown): { id: string; name: string; system: SystemKey | null; vttUrl: string | null } | null {
  try {
    const top = (state as { campaign?: unknown } | null)?.campaign as
      | { id?: unknown; name?: unknown; system?: unknown; vttUrl?: unknown; campaign?: { id?: unknown; name?: unknown; system?: unknown; vttUrl?: unknown } }
      | null
      | undefined;
    const c = top?.campaign && typeof top.campaign === "object" ? top.campaign : top;
    if (!c || !c.id) return null;
    return {
      id: String(c.id),
      name: typeof c.name === "string" ? c.name : "Campaign",
      system: isSystemKey(c.system) ? c.system : null,
      vttUrl: typeof c.vttUrl === "string" && c.vttUrl ? c.vttUrl : null,
    };
  } catch {
    return null;
  }
}

// Shim: loads the last-used board on startup, auto-saves on changes, and drives
// the save-then-reload dance when the GM switches campaigns.
const SHIM = `
<script>
(function () {
  var API = "/api/gm-screen";
  var timer = null, saving = false, dirty = false;
  // Serialized form of the last state we successfully sent. Lets the periodic
  // fallback save (and any other flush) skip the network + DB write entirely
  // when nothing actually changed since the last save.
  var lastSent = null;
  // Save status → the mini-bar chip when present (kinds: saving/saved/error),
  // else the plain #dd-status text (the embedded status-only chrome).
  function status(s, kind) {
    if (typeof window.__ddStatus === "function") {
      try { window.__ddStatus(kind || (s === "Saved" ? "saved" : s ? "saving" : ""), s); return; } catch (e) {}
    }
    var el = document.getElementById("dd-status"); if (el) el.textContent = s;
  }

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
    var payload = JSON.stringify(data);
    // Nothing changed since the last successful save — skip the request. This
    // is what keeps the 30s fallback save from re-uploading a multi-MB board
    // (attached maps/PDFs ride inside the state) when the GM is just idle.
    if (payload === lastSent) { saving = false; status(""); return; }
    fetch(API, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: payload
    })
      .then(function(r) {
        if (r.status === 401) { status("Signed out — changes not saved", "error"); dirty = false; return; }
        if (!r.ok) throw new Error(r.status);
        lastSent = payload; status("Saved", "saved");
      })
      .catch(function() { dirty = true; status("Save failed — retrying", "error"); })
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

    // Fallback save every 30s, for any change path that misses the explicit
    // hooks. Skipped while the tab is hidden (nothing can have changed and the
    // GM isn't looking), and flush() itself skips the upload when the
    // serialized state is identical to what was last sent.
    setInterval(function() {
      if (document.hidden || window.__ddCampaignSwitching) return;
      dirty = true;
      flush();
    }, 30000);
  });

  // ── Campaign-switch hooks (called by the GM screen's campaign picker) ──

  // Save the current board right now, keyed by whatever campaign it currently
  // reflects. Returns a promise so the switch can wait for it before reloading.
  window.__ddFlushNow = function() {
    var data = getState();
    if (!data) return Promise.resolve();
    dirty = false;
    var payload = JSON.stringify(data);
    return fetch(API, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: payload
    }).then(function() { lastSent = payload; status("Saved"); }).catch(function() {});
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
// Embedded (token) mode: no Home link — navigating the framed iframe away would
// break it and the popover owns the Owlbear connection. Just a small, subtle
// save-status pill in the corner; hidden entirely while it has no text.
const CHROME_EMBED = `<style>#dd-status:empty{display:none}</style>
<div id="dd-chrome" style="position:fixed;bottom:8px;right:8px;z-index:2147483647;font:600 10px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;pointer-events:none">
<span id="dd-status" style="display:inline-block;color:#8a8a93;background:rgba(8,8,9,.78);border:1px solid #3a3a40;border-radius:5px;padding:4px 8px"></span>
</div>`;

// A board with attached maps/PDFs carries them as base64 inside the state;
// inlining megabytes of JSON into the HTML makes every load download AND
// synchronously parse all of it before first paint. Past the cap we skip the
// inline copy and the shim falls back to fetching /api/gm-screen after load.
const MAX_INLINE_STATE = 512 * 1024;

// Framed by a VTT the session cookie (SameSite=Lax) is never sent, so every
// call the GM Screen makes to our own API would come back 401. Rather than
// thread the token through each of the template's fetch sites, patch fetch here
// to attach it to same-origin /api/ requests — the exact approach the character
// sheet shim uses (lib/inject.ts). Injected before the shim so window.fetch is
// wrapped before anything (shim boot, template init) calls it.
function tokenFetchPatch(vttToken: string): string {
  return `<script>
(function () {
  var vttToken = ${JSON.stringify(vttToken)};
  if (!vttToken || typeof window.fetch !== "function") return;
  var nativeFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    if (url.indexOf("/api/") !== 0) return nativeFetch(input, init);
    var opts = init ? Object.assign({}, init) : {};
    var h = new Headers(opts.headers || (typeof input !== "string" && input.headers) || {});
    h.set("x-vtt-token", vttToken);
    opts.headers = h;
    return nativeFetch(typeof input === "string" ? input : input.url, opts);
  };
})();
</script>`;
}

// iOS volume fix for the Music + Scenes tools.
//
// The tools set `HTMLAudioElement.volume` to mix tracks and drive the master
// sliders. On iOS/WebKit that property is read-only (the OS owns volume), so
// every write is ignored — tracks play at full and the sliders do nothing. The
// only way to control volume on iOS is the Web Audio API, so this wraps
// `window.Audio` to route each sound through a GainNode and redirect the tools'
// existing `.volume` writes to it.
//
// It is a NO-OP wherever `.volume` already works (desktop, Android): the feature
// probe returns early and `window.Audio` is left untouched, so those platforms
// keep their exact current behaviour and never touch the proxy.
//
// Web Audio can only read same-origin or CORS-clean media. A cross-origin http(s)
// track is tried DIRECT first with crossOrigin=anonymous: a host that sends CORS
// headers streams straight to the browser and never touches our server (no egress).
// Only if that read fails (no CORS headers — Dropbox etc.) do we retry through our
// same-origin proxy (/api/audio-proxy), which makes it readable without CORS; if the
// proxy fails too we fall back to the original URL played plain so the track still
// sounds (uncontrolled volume, as before) rather than dropping. blob:/data:/
// same-origin URLs are already readable and pass through untouched, never proxied.
// The GainNode graph is built on 'canplay' (the media loaded fine).
//
// Injected in <head> so the wrapper is installed before the template's audio code
// ever calls `new Audio`. Parameterised by the VTT token: framed in the Owlbear
// popover there's no cookie, so the proxy URL has to carry ?t=<token> (audio
// loads as element src, which the fetch-patch can't reach). Empty in cookie mode.
function audioVolumeFix(vttToken: string): string {
  return `<script>
(function () {
  var Native = window.Audio;
  if (!Native) return;

  var ua = navigator.userAgent || "";
  var iOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1);

  // Engage only where .volume is actually ignored. The probe catches iOS
  // (its getter returns 1.0, not the value we set); the explicit iOS check is a
  // belt-and-suspenders in case a future WebKit reflects the value. Anywhere
  // .volume works and it isn't iOS (desktop, Android) we bail — window.Audio is
  // left untouched and nothing is ever proxied.
  var probeWorks = true;
  try { var pr = new Native(); pr.volume = 0.375; probeWorks = Math.abs(pr.volume - 0.375) < 0.02; }
  catch (e) { probeWorks = false; }
  if (probeWorks && !iOS) return;

  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  var mediaProto = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
  var srcDesc = mediaProto && Object.getOwnPropertyDescriptor(mediaProto, "src");
  if (!srcDesc || !srcDesc.get || !srcDesc.set) return;

  var PROXY = "/api/audio-proxy";
  var TOKEN = ${JSON.stringify(vttToken || "")};

  // Classify a URL. A cross-origin http(s) track needs CORS for Web Audio to
  // read it; we try it DIRECT first (crossOrigin=anonymous) so a CORS-clean host
  // streams straight to the browser and never touches our server, and keep the
  // same-origin proxy URL as the fallback for hosts that send no CORS headers.
  // Anything already readable (blob:, data:, same-origin, relative) is used as-is
  // and never proxied.
  function classify(url) {
    if (typeof url !== "string" || !url) return { kind: "local", direct: url };
    if (/^(blob:|data:)/i.test(url)) return { kind: "local", direct: url };
    var abs;
    try { abs = new URL(url, location.href); } catch (e) { return { kind: "local", direct: url }; }
    if (abs.protocol !== "http:" && abs.protocol !== "https:") return { kind: "local", direct: url };
    if (abs.origin === location.origin) return { kind: "local", direct: url };
    return {
      kind: "xorigin",
      direct: abs.href,
      proxy: PROXY + "?u=" + encodeURIComponent(abs.href) + (TOKEN ? "&t=" + encodeURIComponent(TOKEN) : ""),
    };
  }

  var ctx = null;
  function context() {
    if (!ctx) { try { ctx = new AC(); } catch (e) { ctx = null; } }
    return ctx;
  }
  function resume() {
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
  }
  // iOS starts the context suspended; resume on the first user gestures.
  ["touchend", "mousedown", "keydown", "click"].forEach(function (ev) {
    window.addEventListener(ev, function () { context(); resume(); }, true);
  });

  function wire(a) {
    var v = 1;        // logical volume the tools read/write
    var gain = null;  // GainNode once the graph is built
    var state = 0;    // 0 = not built, 1 = graphed, 2 = plain fallback

    function apply() { if (gain) { try { gain.gain.value = v; } catch (e) {} } }

    // MediaElementSource -> Gain -> destination. Only called from a canplay/
    // loadeddata handler (the media loaded); the source is same-origin (direct
    // or proxied), so it can't be a tainted/silent node.
    function build() {
      if (state) return;
      var c = context(); if (!c) return;
      try {
        var node = c.createMediaElementSource(a);
        gain = c.createGain();
        gain.gain.value = v;
        node.connect(gain);
        gain.connect(c.destination);
        state = 1;
        resume();
      } catch (e) { state = 2; }
    }

    try {
      Object.defineProperty(a, "volume", {
        configurable: true,
        get: function () { return v; },
        set: function (val) {
          val = +val;
          if (val !== val) return;                 // NaN guard
          v = val < 0 ? 0 : (val > 1 ? 1 : val);
          apply();
        }
      });
    } catch (e) { return a; }   // couldn't shadow the native accessor; leave native

    // Point each src at the DIRECT url first (cross-origin tracks get
    // crossOrigin=anonymous so a CORS-clean host streams straight to the browser,
    // off our server). The getter returns the ORIGINAL url the tools set, so
    // nothing in the template ever sees the direct/proxy swap.
    try {
      Object.defineProperty(a, "src", {
        configurable: true,
        get: function () { return a._origSrc != null ? a._origSrc : srcDesc.get.call(a); },
        set: function (u) {
          a._origSrc = u;
          var info = classify(u);
          a._info = info;
          a._stage = info.kind === "xorigin" ? "direct" : "local";
          if (state !== 1) state = 0;   // a fresh readable src can graph on canplay
          try { a.crossOrigin = info.kind === "xorigin" ? "anonymous" : null; } catch (e) {}
          srcDesc.set.call(a, info.direct);
        }
      });
    } catch (e) {}

    a.addEventListener("canplay", build);
    a.addEventListener("loadeddata", build);
    a.addEventListener("error", function () {
      // Walk the fallback ladder: direct (CORS) -> same-origin proxy -> plain.
      var info = a._info;
      if (!info || info.kind !== "xorigin") return;   // local src, nothing to retry
      if (a._stage === "direct") {
        // Host sent no CORS headers, so the direct read failed. Route through the
        // same-origin proxy, which Web Audio can read (volume control preserved).
        // Any graph already built keeps feeding off the same element unchanged.
        a._stage = "proxied";
        if (state !== 1) state = 0;
        try { a.crossOrigin = "anonymous"; } catch (e) {}   // proxy is same-origin -> fine
        try { srcDesc.set.call(a, info.proxy); a.load(); } catch (e) {}
      } else if (a._stage === "proxied") {
        // Proxy failed too (network/auth). Last resort: original url played plain
        // so the track still sounds — uncontrolled volume, i.e. the pre-fix
        // behaviour — instead of dropping out.
        a._stage = "plain";
        if (state !== 1) state = 2;
        try { a.crossOrigin = null; } catch (e) {}
        try { srcDesc.set.call(a, info.direct); a.load(); } catch (e) {}
      }
      // _stage === "plain" -> already at the last resort; nothing more to try.
    });

    // Keep the context running whenever the tools start playback.
    var nativePlay = a.play;
    a.play = function () { context(); resume(); return nativePlay.apply(a, arguments); };

    return a;
  }

  function Wrapped(src) {
    var a = new Native();
    wire(a);
    if (src != null) { try { a.src = src; } catch (e) {} }   // src setter routes direct-first
    return a;
  }
  Wrapped.prototype = Native.prototype;
  window.Audio = Wrapped;
})();
</script>`;
}

/**
 * Build the GM Screen page. Pass `vttToken` to render the framed, token-auth
 * variant (fetch-patch + embed chrome); omit it for the cookie full-page variant.
 */
// ── Per-system data files ────────────────────────────────────────────────────
// The template hard-codes a <script src="/tools-data/…"> tag for EVERY system's
// game data: 4.8 MB raw / 1.1 MB gzipped across 43 files, of which ~977 KB
// gzipped is per-system data. A GM Screen is linked to one campaign running one
// system, so on a DCC session roughly 85% of that is Marvel, D&D, Star Wars and
// the rest — downloaded, parsed and executed for nothing. Measured baseline:
// 5,570 KB of JS, 63 script requests, 459 ms to DOMContentLoaded on a fast
// desktop with no network latency.
//
// Dropping the other systems' tags is safe because every one of the 35 per-system
// data globals the template reads is behind a `typeof` guard that falls back to an
// empty list. That was verified file by file, and the one global that was NOT
// guarded (SD_MONSTERS) was fixed first. A harness then booted the screen with
// 32–39 files withheld across five systems and built all twelve stations with no
// errors. If a new station ever reads one of these globals unguarded, it will show
// empty rather than throw — so guard new reads the same way.
//
// Files every system needs, whatever is linked.
const SHARED_DATA = new Set(["dice-anim.js", "gm-npc-tables.js"]);

/** Drop the /tools-data/ script tags that belong to other systems. With no
 *  campaign linked the served system is unknown (the template picks it up
 *  client-side from the stored choice), so nothing is dropped — status quo. */
export function keepOnlySystemData(html: string, system: SystemKey | null): string {
  if (!system) return html;
  const mine = system.toLowerCase() + "-";

  // Fail open. A system whose data files don't follow the "<key>-*.js" naming —
  // a newly added system, or a key that stops matching its prefix — would
  // otherwise be served a GM Screen with no game data at all, silently. If
  // nothing matches, keep every tag: slow is recoverable, empty is not.
  if (!new RegExp('src="/tools-data/' + mine).test(html)) return html;

  return html.replace(
    /[ \t]*<script\b[^>]*\bsrc="\/tools-data\/([^"?]+)(?:\?[^"]*)?"[^>]*><\/script>\n?/gi,
    (tag, file: string) => {
      if (SHARED_DATA.has(file)) return tag;
      // Only a <system>-prefixed data file is system-specific; anything else
      // (a shared helper added later) is kept rather than guessed about.
      const dash = file.indexOf("-");
      if (dash < 0) return tag;
      return file.startsWith(mine) ? tag : "";
    },
  );
}

export async function buildGmScreenHtml(opts: {
  savedState: unknown;
  vttToken?: string;
}): Promise<string> {
  let html = await loadToolTemplate("gm_screen.html");

  const stateJson = opts.savedState
    ? JSON.stringify(opts.savedState).replace(/</g, "\\u003c")
    : null;
  const stateScript =
    stateJson && stateJson.length <= MAX_INLINE_STATE
      ? `<script>window.__gmInitialState__ = ${stateJson};</script>\n`
      : "";

  const tokenScript = opts.vttToken ? `${tokenFetchPatch(opts.vttToken)}\n` : "";
  const audioScript = audioVolumeFix(opts.vttToken || "");

  // Systems an admin has hidden (Admin → Systems) are also dropped from the GM
  // Screen's game-system dropdown. Fail-open: on error the list is empty (all
  // systems visible). The template's system IIFE reads this global.
  let hiddenSystems: string[] = [];
  try { hiddenSystems = await getHiddenSystemKeys(); } catch { hiddenSystems = []; }
  const hiddenScript = `<script>window.__gmHiddenSystems__ = ${JSON.stringify(hiddenSystems)};</script>\n`;

  // The linked campaign (if any) gives the mini-bar its system and its title.
  const camp = campaignOf(opts.savedState);

  // The SAVED BOARD's snapshot of the campaign can be stale: the GM may have
  // changed that campaign's system on the Campaigns page since, or the board may
  // predate systems entirely. The client already reconciles this at runtime
  // (loadList → setGmSystem), but which data files we serve is decided HERE and
  // cannot be reconciled after the fact — serve the wrong system's data and every
  // station reads a guarded global that isn't loaded and shows nothing.
  //
  // So the live campaign row wins. One indexed lookup by id; on any error we keep
  // the snapshot's value, which is what the page used before this existed.
  let liveSystem: SystemKey | null = camp?.system ?? null;
  if (camp?.id) {
    try {
      const row = await prisma.campaign.findUnique({
        where: { id: camp.id },
        select: { system: true },
      });
      if (row?.system && isSystemKey(row.system)) liveSystem = row.system;
    } catch {
      /* keep the snapshot's system */
    }
  }

  // Shared tokens + this system's accent go right after <head> (BEFORE the
  // template's own <style>, whose :root now derives --accent from --sys).
  // (Also the favicon: the GM Screen was the one standalone page without one.)
  html = html.replace(
    /<head[^>]*>/i,
    (m) => `${m}\n<link rel="icon" type="image/png" href="/icon-64.png">\n${miniBarHead(liveSystem)}`,
  );

  // Inject (audio fix → token patch →) hidden-systems → state → shim before
  // </head>. The audio fix goes first so window.Audio is wrapped before any of
  // the template's music code runs. (The Sound Library is now a docked column
  // inside the Music tool itself — see init_music in the template — so there is
  // no separate injected picker overlay any more.)
  html = html.replace(
    /<\/head>/i,
    `${audioScript}\n${tokenScript}${hiddenScript}${stateScript}${SHIM}\n</head>`,
  );

  // Chrome after <body>: the shared mini-bar (cookie mode) or the status-only
  // pill (framed by the Owlbear popover, which owns navigation there).
  let chrome: string;
  if (opts.vttToken) {
    chrome = CHROME_EMBED;
  } else {
    // No crumb and no title: the bar's logo and system chip already say where you
    // are, and "GM Screen > <campaign>" only restated the page you were looking at.
    //
    // The campaign is a PIN, not a crumb, and it is here because the screen is
    // now locked to it — there is no campaign picker inside any more, so the bar
    // is the only thing that says which table you are running. It links back to
    // /campaigns, which is where a campaign is now changed.
    //
    // `camp` is this board's own snapshot and may be a stale NAME (liveSystem
    // above re-reads the system, not the name). That is fine: the template calls
    // window.__ddSetPin once GMCamp has restored, which overwrites it with the
    // board's actual link. This value only has to be right for the first paint.
    chrome = miniBar({
      system: liveSystem,   // unlinked board → null, and the bar adopts the site-wide choice
      status: true,
      slot: true,           // Export + Import move in here on DOMContentLoaded
      pin: camp?.name
        ? { label: camp.name, href: "/campaigns", title: `Running ${camp.name} — manage campaigns` }
        : { label: "No campaign", href: "/campaigns", title: "Open a campaign to link this screen" },
    });
  }
  html = html.replace(/<body([^>]*)>/i, (m) => `${m}\n${chrome}`);

  // Last, so the tag set this prunes is the final one.
  html = keepOnlySystemData(html, liveSystem);

  return html;
}
