import { loadToolTemplate } from "@/lib/tools";
import { getHiddenSystemKeys } from "@/lib/systems";

// Shared builder for the GM Screen HTML page. Two routes render it:
//   • app/gm-screen (cookie auth, full page) — no token, floating "Home" chrome.
//   • app/vtt/gm-screen (VTT token auth, framed inside the Owlbear popover) —
//     token fetch-patch so /api/ calls carry x-vtt-token, status-only chrome.
// Extracted verbatim from the original app/gm-screen route so behaviour is
// identical for the cookie path.

const CHROME = `<div id="dd-chrome" style="position:fixed;top:8px;left:8px;z-index:2147483647;display:flex;flex-direction:column;gap:5px;align-items:flex-start;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="/dashboard" style="color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none">&larr; Home</a>
<span id="dd-status" style="color:#6f6f78;padding-left:2px"></span>
</div>`;

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
      .then(function(r) { if (!r.ok) throw new Error(r.status); lastSent = payload; status("Saved"); })
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
// Web Audio can only read same-origin (or CORS-clean) media, and the tools' hosts
// (Dropbox etc.) send no CORS headers — so cross-origin http(s) tracks are routed
// through our same-origin proxy (/api/audio-proxy), which makes them readable
// without CORS. blob:/data:/same-origin URLs are already readable and pass
// through untouched. The GainNode graph is built on 'canplay' (the media loaded
// fine); if the proxy itself fails, we fall back to the original URL played plain
// so the track still sounds (uncontrolled volume, as before) rather than dropping.
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

  // Cross-origin http(s) -> same-origin proxy so Web Audio can read it. Anything
  // already readable (blob:, data:, same-origin, relative) is left as-is.
  function playable(url) {
    if (typeof url !== "string" || !url) return { src: url, proxied: false };
    if (/^(blob:|data:)/i.test(url)) return { src: url, proxied: false };
    var abs;
    try { abs = new URL(url, location.href); } catch (e) { return { src: url, proxied: false }; }
    if (abs.protocol !== "http:" && abs.protocol !== "https:") return { src: url, proxied: false };
    if (abs.origin === location.origin) return { src: url, proxied: false };
    var p = PROXY + "?u=" + encodeURIComponent(abs.href) + (TOKEN ? "&t=" + encodeURIComponent(TOKEN) : "");
    return { src: p, proxied: true };
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

    // Rewrite each src to the proxy (for cross-origin hosts). The getter returns
    // the ORIGINAL url the tools set, so nothing in the template sees the proxy.
    try {
      Object.defineProperty(a, "src", {
        configurable: true,
        get: function () { return a._origSrc != null ? a._origSrc : srcDesc.get.call(a); },
        set: function (u) {
          a._origSrc = u;
          var pl = playable(u);
          a._proxied = pl.proxied;
          a._reverted = false;
          if (state !== 1) state = 0;   // a fresh same-origin src can graph on canplay
          srcDesc.set.call(a, pl.src);
        }
      });
    } catch (e) {}

    a.addEventListener("canplay", build);
    a.addEventListener("loadeddata", build);
    a.addEventListener("error", function () {
      // The proxy failed (network/auth). Fall back to the original URL played
      // plain so the track still sounds — uncontrolled volume on iOS, i.e. the
      // pre-fix behaviour — instead of dropping out. Not proxied → nothing to do.
      if (!a._proxied || a._reverted) return;
      a._reverted = true;
      if (state !== 1) state = 2;
      try { srcDesc.set.call(a, a._origSrc); a.load(); } catch (e) {}
    });

    // Keep the context running whenever the tools start playback.
    var nativePlay = a.play;
    a.play = function () { context(); resume(); return nativePlay.apply(a, arguments); };

    return a;
  }

  function Wrapped(src) {
    var a = new Native();
    wire(a);
    if (src != null) { try { a.src = src; } catch (e) {} }   // src setter routes to the proxy
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

  // Inject (audio fix → token patch →) hidden-systems → state → shim before
  // </head>. The audio fix goes first so window.Audio is wrapped before any of
  // the template's music code runs. (The Sound Library is now a docked column
  // inside the Music tool itself — see init_music in the template — so there is
  // no separate injected picker overlay any more.)
  html = html.replace(
    /<\/head>/i,
    `${audioScript}\n${tokenScript}${hiddenScript}${stateScript}${SHIM}\n</head>`,
  );

  // Inject chrome after <body>: Home + status (cookie) or status-only (embed).
  const chrome = opts.vttToken ? CHROME_EMBED : CHROME;
  html = html.replace(/<body([^>]*)>/i, (m) => `${m}\n${chrome}`);

  return html;
}
