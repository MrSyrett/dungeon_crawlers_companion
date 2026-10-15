/* Dungeon Crawler's Companion — VTT player-side audio sync.
 *
 * The GM Screen publishes a small snapshot of what it is playing (see
 * audioBroadcast in lib/gm-screen.ts): one entry per sounding <audio> element —
 * URL, position at a host timestamp, volume (the GM's track × master mix), loop,
 * rate. The tabletop host relays it over the data channel (net.js). This module
 * turns a snapshot into real playback on the player's machine: one <audio> per
 * layer streaming the SAME file from the same URL, at the GM's level, under a
 * local master volume + mute that never leaves this device. Full source quality,
 * no capture, no re-encode, no server bytes.
 *
 *   var audio = VTTAudio.create({ mount, hostNow, storageKey });
 *   audio.apply(snapshot)   // from net.guest's onAudio; null/empty = fade all out
 *
 * Sync model: expected position = pos + (hostNow - at) × rate (mod duration for a
 * loop). We seek only when the local element has drifted past DRIFT seconds, so a
 * steady stream is never interrupted by routine heartbeats. Nobody hears anyone
 * else's copy, so ±200 ms is invisible; the correction is there for the seek-on-
 * join and for long loops.
 *
 * Autoplay: browsers refuse play() until the page has had a user gesture. A play()
 * that is refused flips the control into "Tap to enable sound"; the first
 * pointerdown/keydown anywhere on the page retries every pending layer inside the
 * gesture (Safari needs the call to happen within it).
 *
 * iOS: HTMLMediaElement.volume is read-only there, so levels go through a Web
 * Audio GainNode — which can only read same-origin or CORS-clean media. We try the
 * direct URL with crossOrigin=anonymous, fall back to our same-origin
 * /api/audio-proxy (the player's session cookie authenticates it), and as a last
 * resort play plain at full volume (mute still works: it pauses). Same ladder as the
 * GM Screen's own iOS fix. Everywhere else the element's .volume is used directly.
 *
 * Exposes window.VTTAudio = { create }.
 */
(function (root) {
  "use strict";

  var DRIFT = 0.45;        // seconds of drift before we seek
  var FIRST_DRIFT = 0.25;  // tighter on the first placement of a layer
  var RAMP_MS = 140;       // local smoothing toward the GM's level (their fades arrive ~8/s)
  var FADE_OUT_MS = 260;   // a layer that vanished from the snapshot fades out, then stops
  var PROXY = "/api/audio-proxy";

  function clamp01(v) { v = +v; if (v !== v) return 0; return v < 0 ? 0 : v > 1 ? 1 : v; }

  // Does .volume actually work here? (iOS/WebKit ignores it — the OS owns volume.)
  function volumeWorks() {
    try {
      var ua = navigator.userAgent || "";
      var iOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1);
      if (iOS) return false;
      var a = new Audio(); a.volume = 0.375;
      return Math.abs(a.volume - 0.375) < 0.02;
    } catch (e) { return true; }
  }

  function ico(n, s) {
    var P = {
      speaker: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
      muted: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
      quiet: '<path d="M11 5 6 9H3v6h3l5 4z"/>',
    };
    return '<svg viewBox="0 0 24 24" width="' + (s || 20) + '" height="' + (s || 20) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || "") + "</svg>";
  }

  var styled = false;
  function injectStyles() {
    if (styled) return; styled = true;
    var css = [
      ".vtt-aud{position:relative;display:flex;align-items:center;justify-content:flex-end}",
      ".vtt-aud-btn{position:relative}",
      ".vtt-aud-btn.live{color:#c8a24a;border-color:#c8a24a}",
      ".vtt-aud-btn.locked{color:#14181e;background:#c8a24a;border-color:#c8a24a;animation:vttAudPulse 1.4s ease-in-out infinite}",
      ".vtt-aud-btn.muted{color:#c8503a}",
      "@keyframes vttAudPulse{0%,100%{box-shadow:0 0 0 0 rgba(200,162,74,.55)}50%{box-shadow:0 0 0 7px rgba(200,162,74,0)}}",
      ".vtt-aud-badge{position:absolute;top:-5px;right:-5px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#5ac26a;color:#0b0d10;font:800 10px/16px system-ui;text-align:center}",
      ".vtt-aud-pop{position:absolute;bottom:0;right:48px;width:232px;background:rgba(15,18,23,.97);border:1px solid #2a323d;border-radius:10px;padding:12px;z-index:40;box-shadow:0 10px 30px rgba(0,0,0,.45);backdrop-filter:blur(6px)}",
      ".vtt-aud-pop[hidden]{display:none}",
      ".vtt-aud-h{font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#c8a24a;font-size:13px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}",
      ".vtt-aud-row{display:flex;align-items:center;gap:8px}",
      ".vtt-aud-row input[type=range]{flex:1;accent-color:#c8a24a;min-width:0}",
      ".vtt-aud-pct{width:36px;text-align:right;font:700 12px/1 system-ui;color:#e6ebf2}",
      ".vtt-aud-mute{width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:rgba(20,24,30,.92);color:#c3ccd8;border:1px solid #2a323d;border-radius:7px;cursor:pointer}",
      ".vtt-aud-mute.on{color:#c8503a;border-color:#c8503a}",
      ".vtt-aud-status{margin-top:9px;font-size:11.5px;color:#8b97a7;line-height:1.4}",
      ".vtt-aud-status b{color:#e6ebf2}",
      ".vtt-aud-cta{margin-top:9px;width:100%;padding:8px;border-radius:7px;border:0;background:#c8a24a;color:#14181e;font:800 12px/1 system-ui;letter-spacing:.04em;text-transform:uppercase;cursor:pointer}",
      ".vtt-aud-cta[hidden]{display:none}",
    ].join("");
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }

  function create(opts) {
    opts = opts || {};
    var hostNow = opts.hostNow || function () { return Date.now(); };
    var KEY = opts.storageKey || "vtt-audio-master";
    var useGain = !volumeWorks();
    var AC = root.AudioContext || root.webkitAudioContext;
    var ctx = null;

    // ---- player-local master (never sent anywhere) ----------------------------
    var master = 0.8, muted = false;
    try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved && typeof saved === "object") { if (typeof saved.v === "number") master = clamp01(saved.v); muted = !!saved.m; } } catch (e) {}
    function remember() { try { localStorage.setItem(KEY, JSON.stringify({ v: master, m: muted })); } catch (e) {} }

    // ---- layers ---------------------------------------------------------------
    // id -> { a, url, target, cur, loop, rate, gain, stage, dying, pending }
    var layers = {};
    var unlocked = false;   // a play() has succeeded (or a gesture happened)
    var blocked = false;    // a play() was refused: show the "tap to enable" state
    var lastSnap = null;
    var localCount = 0;

    function context() { if (!ctx && AC) { try { ctx = new AC(); } catch (e) { ctx = null; } } return ctx; }
    function resumeCtx() { if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} } }

    function effective(l) { return muted ? 0 : clamp01(l.cur * master); }
    function applyLevel(l) {
      var v = effective(l);
      if (useGain) {
        if (l.gain) { try { l.gain.gain.value = v; } catch (e) {} }
        // Plain fallback on iOS can't set volume; honour mute by pausing.
        else if (l.stage === "plain") { if (muted || v === 0) { try { l.a.pause(); } catch (e) {} } else if (l.wanted) { tryPlay(l); } }
      } else {
        try { l.a.volume = v; } catch (e) {}
      }
    }

    // One ticker eases every layer's level toward its target (and runs fade-outs).
    var tick = null, tickAt = 0;
    function startTick() { if (tick) return; tickAt = Date.now(); tick = setInterval(step, 30); }
    function step() {
      var now = Date.now(), dt = now - tickAt; tickAt = now;
      var busy = false;
      Object.keys(layers).forEach(function (id) {
        var l = layers[id];
        if (l.cur !== l.target) {
          var ms = l.dying ? FADE_OUT_MS : RAMP_MS;
          var rate = dt / ms; // fraction of the full range per tick
          if (l.cur < l.target) l.cur = Math.min(l.target, l.cur + rate); else l.cur = Math.max(l.target, l.cur - rate);
          applyLevel(l);
          if (l.cur !== l.target) busy = true;
        }
        if (l.dying && l.cur <= 0.0005) { teardown(l); delete layers[id]; }
      });
      if (!busy) { clearInterval(tick); tick = null; }
    }

    function teardown(l) {
      try { l.a.pause(); } catch (e) {}
      try { l.a.removeAttribute("src"); l.a.load(); } catch (e) {}
      if (l.node) { try { l.node.disconnect(); } catch (e) {} }
      if (l.gain) { try { l.gain.disconnect(); } catch (e) {} }
    }

    // iOS ladder: direct (CORS) -> same-origin proxy -> plain.
    function proxied(u) { return PROXY + "?u=" + encodeURIComponent(u); }
    function setSrc(l, url) {
      l.url = url; l.stage = useGain ? "direct" : "plain";
      if (useGain) { try { l.a.crossOrigin = "anonymous"; } catch (e) {} }
      l.a.src = url;
    }
    function buildGraph(l) {
      if (!useGain || l.gain || l.stage === "plain") return;
      var c = context(); if (!c) { l.stage = "plain"; return; }
      try {
        l.node = c.createMediaElementSource(l.a);
        l.gain = c.createGain();
        l.gain.gain.value = effective(l);
        l.node.connect(l.gain); l.gain.connect(c.destination);
        resumeCtx();
      } catch (e) { l.gain = null; l.node = null; l.stage = "plain"; }
    }
    function onError(l) {
      if (!useGain) return;
      if (l.stage === "direct") { l.stage = "proxied"; try { l.a.crossOrigin = "anonymous"; l.a.src = proxied(l.url); l.a.load(); } catch (e) {} if (l.wanted) tryPlay(l); }
      else if (l.stage === "proxied") { l.stage = "plain"; try { l.a.crossOrigin = null; l.a.src = l.url; l.a.load(); } catch (e) {} if (l.wanted) tryPlay(l); }
    }

    function tryPlay(l) {
      if (!l.wanted) return;
      if (useGain && l.stage !== "plain" && l.a.readyState >= 2) buildGraph(l);
      resumeCtx();
      var p; try { p = l.a.play(); } catch (e) { p = null; }
      if (p && p.then) {
        p.then(function () { unlocked = true; if (blocked) { blocked = false; render(); } })
         .catch(function (err) { if (err && err.name === "NotAllowedError") { blocked = true; render(); } });
      }
    }

    // Where should this layer be right now, on the host's timeline?
    function expected(l, snap) {
      var elapsed = Math.max(0, (hostNow() - (snap.at || hostNow())) / 1000);
      var p = (l.pos || 0) + elapsed * (l.rate || 1);
      var dur = (isFinite(l.a.duration) && l.a.duration > 0) ? l.a.duration : (l.dur || 0);
      if (l.loop && dur > 0) p = p % dur;
      else if (dur > 0 && p > dur) p = dur;
      return p;
    }
    function place(l, snap, first) {
      var want = expected(l, snap);
      var a = l.a;
      var seekNow = function () {
        var have = a.currentTime || 0;
        var dur = (isFinite(a.duration) && a.duration > 0) ? a.duration : 0;
        var diff = Math.abs(have - want);
        // For a loop the shortest distance wraps around the end.
        if (l.loop && dur > 0) diff = Math.min(diff, dur - diff);
        if (diff > (first ? FIRST_DRIFT : DRIFT)) { try { a.currentTime = want; } catch (e) {} }
      };
      if (a.readyState >= 1) seekNow();
      else {
        // Can't seek before metadata; recompute THEN (time has passed) and seek once.
        var once = function () { a.removeEventListener("loadedmetadata", once); want = expected(l, snap); seekNow(); };
        a.addEventListener("loadedmetadata", once);
      }
    }

    function apply(snap) {
      if (!snap || snap.t !== "audio") snap = { t: "audio", layers: [], at: hostNow() };
      lastSnap = snap;
      var seen = {};
      localCount = 0;
      (snap.layers || []).forEach(function (s) {
        if (!s || s.id == null) return;
        if (s.local || !s.url) { localCount++; return; }   // GM-only (local file) — can't mirror
        var id = String(s.id);
        seen[id] = true;
        var l = layers[id], first = false;
        if (!l) {
          first = true;
          var a = new Audio();
          a.preload = "auto";
          l = layers[id] = { a: a, url: null, target: 0, cur: 0, loop: !!s.loop, rate: s.rate || 1, gain: null, node: null, stage: "plain", dying: false, wanted: true, pos: s.pos || 0, dur: s.dur || null };
          a.addEventListener("error", function () { onError(l); });
          a.addEventListener("canplay", function () { buildGraph(l); applyLevel(l); });
          a.addEventListener("loadeddata", function () { buildGraph(l); applyLevel(l); });
          setSrc(l, s.url);
          if (!useGain) { try { a.volume = 0; } catch (e) {} }
        } else if (l.url !== s.url) {
          // Same element on the GM side, new track (the Music tool reuses two
          // elements): swap the source and start the level from where we are.
          first = true;
          setSrc(l, s.url);
        }
        l.dying = false; l.wanted = true;
        l.pos = s.pos || 0; l.dur = s.dur || l.dur; l.loop = !!s.loop; l.rate = s.rate || 1;
        try { l.a.loop = l.loop; } catch (e) {}
        try { if (Math.abs((l.a.playbackRate || 1) - l.rate) > 0.01) l.a.playbackRate = l.rate; } catch (e) {}
        l.target = clamp01(s.vol);
        if (first) { l.cur = l.target; applyLevel(l); }   // a NEW layer starts at the GM's level, no fade-in
        place(l, snap, first);
        if (l.a.paused) tryPlay(l);
      });
      // Anything no longer playing on the GM's side fades out and goes away.
      Object.keys(layers).forEach(function (id) {
        if (seen[id]) return;
        var l = layers[id];
        if (!l.dying) { l.dying = true; l.wanted = false; l.target = 0; }
      });
      startTick();
      render();
    }

    // The first gesture anywhere on the page unlocks autoplay; retry every
    // layer INSIDE the gesture (Safari requires it).
    function unlock() {
      unlocked = true; blocked = false;
      context(); resumeCtx();
      Object.keys(layers).forEach(function (id) { var l = layers[id]; if (l.wanted && l.a.paused) tryPlay(l); });
      render();
    }
    ["pointerdown", "keydown", "touchend"].forEach(function (ev) {
      document.addEventListener(ev, function () { if (blocked || !unlocked) unlock(); }, true);
    });

    function setMaster(v) { master = clamp01(v); remember(); Object.keys(layers).forEach(function (id) { applyLevel(layers[id]); }); render(); }
    function setMuted(m) {
      muted = !!m; remember();
      Object.keys(layers).forEach(function (id) { var l = layers[id]; applyLevel(l); if (!muted && l.wanted && l.a.paused) tryPlay(l); });
      render();
    }

    // ---- control (speaker button + popover) ------------------------------------
    var ui = null;
    function mountUi(parent) {
      if (!parent || ui) return;
      injectStyles();
      var wrap = document.createElement("div"); wrap.className = "vtt-aud";
      wrap.innerHTML =
        '<button class="vtt-tbtn vtt-aud-btn" type="button" title="Table sound"><span class="vtt-aud-i"></span><span class="vtt-aud-badge" hidden></span></button>' +
        '<div class="vtt-aud-pop" hidden>' +
          '<div class="vtt-aud-h"><span>Table sound</span><span class="vtt-aud-n" style="color:#8b97a7;font:600 11px/1 system-ui;letter-spacing:0;text-transform:none"></span></div>' +
          '<div class="vtt-aud-row"><button class="vtt-aud-mute" type="button" title="Mute"></button><input type="range" min="0" max="100" step="1"><span class="vtt-aud-pct"></span></div>' +
          '<button class="vtt-aud-cta" type="button" hidden>Tap to enable sound</button>' +
          '<div class="vtt-aud-status"></div>' +
        "</div>";
      parent.insertBefore(wrap, parent.firstChild);
      ui = {
        wrap: wrap,
        btn: wrap.querySelector(".vtt-aud-btn"), icon: wrap.querySelector(".vtt-aud-i"), badge: wrap.querySelector(".vtt-aud-badge"),
        pop: wrap.querySelector(".vtt-aud-pop"), n: wrap.querySelector(".vtt-aud-n"),
        mute: wrap.querySelector(".vtt-aud-mute"), range: wrap.querySelector("input"), pct: wrap.querySelector(".vtt-aud-pct"),
        cta: wrap.querySelector(".vtt-aud-cta"), status: wrap.querySelector(".vtt-aud-status"),
      };
      ui.btn.onclick = function () { if (blocked) { unlock(); return; } ui.pop.hidden = !ui.pop.hidden; };
      ui.mute.onclick = function () { setMuted(!muted); };
      ui.cta.onclick = unlock;
      ui.range.oninput = function () { setMaster(this.value / 100); };
      document.addEventListener("pointerdown", function (e) { if (ui && !ui.pop.hidden && !wrap.contains(e.target)) ui.pop.hidden = true; }, true);
      render();
    }

    function liveCount() { var n = 0; Object.keys(layers).forEach(function (id) { if (!layers[id].dying) n++; }); return n; }
    function render() {
      if (!ui) return;
      var n = liveCount();
      ui.btn.className = "vtt-tbtn vtt-aud-btn" + (blocked ? " locked" : muted ? " muted" : n ? " live" : "");
      ui.icon.innerHTML = ico(muted ? "muted" : master === 0 ? "quiet" : "speaker", 18);
      ui.badge.hidden = !(n && !blocked && !muted); ui.badge.textContent = String(n);
      ui.btn.title = blocked ? "Tap to enable the table's sound" : muted ? "Table sound (muted)" : n ? "Table sound — " + n + " track" + (n === 1 ? "" : "s") + " playing" : "Table sound";
      ui.mute.className = "vtt-aud-mute" + (muted ? " on" : ""); ui.mute.innerHTML = ico(muted ? "muted" : "speaker", 16); ui.mute.title = muted ? "Unmute" : "Mute";
      ui.range.value = String(Math.round(master * 100)); ui.pct.textContent = Math.round(master * 100) + "%";
      ui.n.textContent = n ? n + " playing" : "";
      ui.cta.hidden = !blocked;
      var st;
      if (blocked) st = "Your browser needs one tap before it will play sound.";
      else if (muted) st = "Muted on this device only — the rest of the table still hears the GM's mix.";
      else if (n) st = "You're hearing the GM's mix at <b>" + Math.round(master * 100) + "%</b>. This volume is yours alone." + (localCount ? "<br>" + localCount + " track" + (localCount === 1 ? " is" : "s are") + " a local file on the GM's computer and can't be shared." : "");
      else st = "Nothing playing. When your GM starts music or a scene, it plays here too.";
      ui.status.innerHTML = st;
    }

    if (opts.mount) mountUi(opts.mount);

    return {
      apply: apply,
      unlock: unlock,
      mount: mountUi,
      master: function () { return master; },
      setMaster: setMaster,
      muted: function () { return muted; },
      setMuted: setMuted,
      layers: function () { return Object.keys(layers).map(function (id) { var l = layers[id]; return { id: id, url: l.url, level: l.cur, target: l.target, loop: l.loop, dying: l.dying, paused: l.a.paused }; }); },
      last: function () { return lastSnap; },
      stop: function () { Object.keys(layers).forEach(function (id) { teardown(layers[id]); }); layers = {}; if (tick) { clearInterval(tick); tick = null; } render(); },
    };
  }

  root.VTTAudio = { create: create };
})(typeof window !== "undefined" ? window : this);
