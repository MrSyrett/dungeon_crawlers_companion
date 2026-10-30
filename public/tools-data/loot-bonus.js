// Item bonuses ("benefits") for the d20-family systems — the same badge model the
// DCC loot rebuild uses (public/tools-data/dcc-bonus.js), generalised: each system
// registers its own bonus kinds, stats, name lists, a text parser and a magic-item
// roller, and the GM Screen loot builders + the character sheets share one badge
// strip / "+ Bonus" menu.
//
//   LootBonus.register("dnd", cfg)            (cfg: see public/tools-data/<sys>-loot-bonus.js)
//   LootBonus.has(sys)
//   LootBonus.normalize(sys, list)            → clean [{kind, target?, amount?}]
//   LootBonus.label(sys, b) / summary(sys, list)
//   LootBonus.fromText(sys, text)             → automatable benefits read from item text
//   LootBonus.roll(sys, tier, cat)            → { benefits, name? } or null
//   LootBonus.editor(el, { sys, benefits, readonly, onChange, empty, extra, kinds, addLabel })
//
// A benefit is { kind, target?, amount? }. A kind declares what it needs:
//   amount: true      → a signed whole number (+N)
//   target: "stat"    → one of the system's stats
//   target: "choice"  → one of kind.choices (e.g. damage types)
//   target: "list:X"  → a name from cfg.lists.X() (free text allowed)
//   target: "text"    → free text (notes)
// The badges ARE the item: what's on them is exactly what the sheet applies on equip.
(function () {
  "use strict";
  if (window.LootBonus) return;

  var SYS = {};
  function norm(s) { return String(s == null ? "" : s).trim(); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function int(v) { var n = parseInt(String(v == null ? "" : v).replace(/[^0-9-]/g, ""), 10); return isNaN(n) ? 0 : n; }
  function signed(n) { return (n >= 0 ? "+" : "") + n; }
  function cfgOf(sys) { return SYS[String(sys || "").toLowerCase()] || null; }
  function kindOf(cfg, k) { return cfg ? cfg.kinds.find(function (x) { return x.k === k; }) || null : null; }
  function list(cfg, name) { try { var f = cfg && cfg.lists && cfg.lists[name]; var v = f ? f() : []; return (Array.isArray(v) ? v : []).filter(function (x) { return x && x.name; }); } catch (e) { return []; } }
  function findIn(arr, name) {
    var t = norm(name).toLowerCase(); if (!t) return null;
    var strip = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ""); };
    return arr.find(function (x) { return x.name.toLowerCase() === t; }) || arr.find(function (x) { return strip(x.name) === strip(t); }) || null;
  }
  function statLabel(cfg, id) { var s = (cfg.stats || []).find(function (x) { return x[0] === id; }); return s ? s[1] : String(id || "").toUpperCase(); }

  function one(cfg, b) {
    if (!cfg || !b || typeof b !== "object") return null;
    var K = kindOf(cfg, norm(b.kind).toLowerCase()); if (!K) return null;
    var o = { kind: K.k };
    if (K.target === "stat") {
      var t = norm(b.target).toLowerCase(), hit = (cfg.stats || []).find(function (s) { return s[0] === t || s[1].toLowerCase() === t || (s[2] && s[2].toLowerCase() === t); });
      if (!hit) return null; o.target = hit[0];
    } else if (K.target === "choice") {
      var c = (K.choices || []).find(function (x) { return x.toLowerCase() === norm(b.target).toLowerCase(); });
      if (!c) return null; o.target = c;
    } else if (K.target) {
      o.target = norm(b.target).slice(0, K.target === "text" ? 160 : 60); if (!o.target) return null;
      if (/^list:/.test(K.target)) { var d = findIn(list(cfg, K.target.slice(5)), o.target); if (d) o.target = d.name; }
    }
    if (K.amount) { o.amount = int(b.amount); if (!o.amount && !K.optAmount) return null; if (!o.amount) delete o.amount; }
    return o;
  }
  function normalize(sys, v) {
    var cfg = cfgOf(sys); if (!cfg) return [];
    if (typeof v === "string") { try { v = JSON.parse(v); } catch (e) { v = []; } }
    return (Array.isArray(v) ? v : []).map(function (b) { return one(cfg, b); }).filter(Boolean).slice(0, 24);
  }
  function label(sys, b) {
    var cfg = cfgOf(sys), K = kindOf(cfg, b && b.kind); if (!K) return "";
    if (K.label_ && typeof K.label_ === "function") return K.label_(b, cfg);
    var t = K.target === "stat" ? statLabel(cfg, b.target) : (b.target || "");
    if (K.target === "text") return t;
    var n = b.amount != null ? signed(b.amount) : "";
    return (K.fmt || "{n} {label}").replace("{n}", n).replace("{t}", t).replace("{label}", K.label).replace(/\s+/g, " ").trim();
  }
  function summary(sys, l) { return normalize(sys, l).map(function (b) { return label(sys, b); }).join(", "); }
  function fromText(sys, text) {
    var cfg = cfgOf(sys); if (!cfg || typeof cfg.fromText !== "function") return [];
    var seen = {}, out = [];
    (cfg.fromText(String(text || "")) || []).forEach(function (b) { var o = one(cfg, b); if (!o) return; var k = label(sys, o); if (!seen[k]) { seen[k] = 1; out.push(o); } });
    return out;
  }
  function roll(sys, tier, cat) {
    var cfg = cfgOf(sys); if (!cfg || typeof cfg.roll !== "function") return null;
    var r = cfg.roll(tier, cat); if (!r) return null;
    return { benefits: normalize(sys, r.benefits || []), name: r.name || "", notes: r.notes || "" };
  }
  // Fresh bonuses for an item the GM already has on a card (keeps its name).
  function enchant(sys, tier, cat) {
    var cfg = cfgOf(sys); if (!cfg) return [];
    var f = typeof cfg.enchant === "function" ? cfg.enchant : function (t, c) { var r = cfg.roll && cfg.roll(t, c); return r ? r.benefits : []; };
    return normalize(sys, f(tier, cat) || []);
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("lbn-css")) return;
    var st = document.createElement("style"); st.id = "lbn-css";
    st.textContent =
      ".lbn{display:flex;flex-wrap:wrap;gap:4px;align-items:center;min-height:22px}" +
      ".lbn-b{--c:#7f8a99;display:inline-flex;align-items:center;gap:3px;max-width:100%;padding:1px 3px 1px 7px;border-radius:999px;font-weight:600;font-size:11px;line-height:18px;font-family:var(--lbn-font,inherit);letter-spacing:.01em;color:inherit;background:color-mix(in srgb,var(--c) 16%,transparent);border:1px solid color-mix(in srgb,var(--c) 55%,transparent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
      ".lbn-b.ro{padding-right:7px}.lbn-b>span{overflow:hidden;text-overflow:ellipsis}" +
      ".lbn-c-blue{--c:#4a8fd8}.lbn-c-green{--c:#3aa86b}.lbn-c-purple{--c:#9a62d8}.lbn-c-teal{--c:#22a6a6}.lbn-c-gold{--c:#c08a2a}.lbn-c-red{--c:#d0574b}.lbn-c-grey{--c:#8a8f98;font-weight:500}" +
      ".lbn-x{all:unset;cursor:pointer;width:16px;height:16px;border-radius:50%;text-align:center;font:700 12px/16px system-ui,sans-serif;opacity:.65}" +
      ".lbn-x:hover{opacity:1;background:color-mix(in srgb,#d33 30%,transparent)}" +
      ".lbn-add{all:unset;cursor:pointer;padding:1px 8px;border-radius:999px;font-weight:700;font-size:11px;line-height:18px;font-family:var(--lbn-font,inherit);border:1px dashed color-mix(in srgb,currentColor 45%,transparent);opacity:.8}" +
      ".lbn-add:hover{opacity:1;border-style:solid}" +
      ".lbn-empty{font-size:11px;opacity:.55;font-style:italic}" +
      ".lbn-pop{position:fixed;z-index:2147483600;width:300px;max-width:calc(100vw - 16px);box-sizing:border-box;padding:10px;border-radius:8px;" +
        "background:var(--lbn-pop-bg,var(--panel,var(--box,#1c1f24)));color:var(--lbn-pop-fg,var(--text,var(--ink,#e9edf2)));border:1px solid var(--lbn-pop-bd,var(--border,var(--rule,#3a3f47)));box-shadow:0 12px 36px rgba(0,0,0,.45);font-size:13px;line-height:1.35;font-family:var(--lbn-font,system-ui,sans-serif)}" +
      ".lbn-pop *{box-sizing:border-box}" +
      ".lbn-kinds{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}" +
      ".lbn-kind{all:unset;cursor:pointer;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;border:1px solid color-mix(in srgb,currentColor 25%,transparent)}" +
      ".lbn-kind.on{background:color-mix(in srgb,currentColor 18%,transparent);border-color:currentColor}" +
      ".lbn-tip{font-size:11px;opacity:.7;margin:0 0 8px}" +
      ".lbn-row{display:flex;gap:6px;align-items:center;margin-bottom:6px}" +
      ".lbn-pop input[type=text],.lbn-pop input[type=number],.lbn-pop select{flex:1;min-width:0;padding:5px 7px;border-radius:5px;border:1px solid color-mix(in srgb,currentColor 25%,transparent);background:color-mix(in srgb,currentColor 6%,transparent);color:inherit;font:inherit}" +
      ".lbn-pop select option{color:#111;background:#fff}" +
      ".lbn-pop .lbn-amt{flex:0 0 78px}" +
      ".lbn-sug{max-height:160px;overflow:auto;border:1px solid color-mix(in srgb,currentColor 18%,transparent);border-radius:5px;margin-bottom:6px}" +
      ".lbn-sug:empty{display:none}" +
      ".lbn-sug div{padding:4px 8px;cursor:pointer;font-size:12px;display:flex;justify-content:space-between;gap:8px}" +
      ".lbn-sug div:hover{background:color-mix(in srgb,currentColor 12%,transparent)}.lbn-sug small{opacity:.6}" +
      ".lbn-acts{display:flex;justify-content:flex-end;gap:6px;margin-top:4px}" +
      ".lbn-btn{all:unset;cursor:pointer;padding:4px 12px;border-radius:5px;font-weight:700;font-size:12px;border:1px solid color-mix(in srgb,currentColor 30%,transparent)}" +
      ".lbn-btn.go{background:var(--lbn-acc,var(--accent,var(--gold,#c8a020)));color:var(--lbn-on-acc,#111);border-color:transparent}" +
      ".lbn-err{color:#e0574b;font-size:11px;min-height:14px}";
    (document.head || document.documentElement).appendChild(st);
  }

  // ── the "+ Bonus" popover ────────────────────────────────────────────────────
  var pop = null, popClose = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } if (popClose) { document.removeEventListener("mousedown", popClose, true); document.removeEventListener("keydown", popClose, true); popClose = null; } }
  function openPop(sys, anchor, onAdd, only) {
    var cfg = cfgOf(sys); if (!cfg) return;
    closePop(); injectCss();
    var kinds = (only && only.length) ? cfg.kinds.filter(function (x) { return only.indexOf(x.k) >= 0; }) : cfg.kinds;
    var kind = kinds[0].k;
    pop = document.createElement("div"); pop.className = "lbn-pop";
    pop.innerHTML = '<div class="lbn-kinds"' + (kinds.length < 2 ? ' style="display:none"' : "") + ">" + kinds.map(function (x) { return '<button type="button" class="lbn-kind" data-k="' + x.k + '" title="' + esc(x.tip || "") + '">' + esc(x.label) + "</button>"; }).join("") + "</div>" +
      '<div class="lbn-tip"></div><div class="lbn-form"></div><div class="lbn-err"></div>' +
      '<div class="lbn-acts"><button type="button" class="lbn-btn lbn-cancel">Cancel</button><button type="button" class="lbn-btn go lbn-ok">Add</button></div>';
    document.body.appendChild(pop);
    try { var cs = getComputedStyle(anchor); ["--lbn-pop-bg", "--lbn-pop-fg", "--lbn-pop-bd", "--lbn-acc", "--lbn-on-acc", "--lbn-font"].forEach(function (v) { var x = cs.getPropertyValue(v); if (x && x.trim()) pop.style.setProperty(v, x.trim()); });
      // No theme vars on the anchor: take the text colour and the nearest solid
      // background from where the badges sit, so the menu matches light or dark.
      if (!cs.getPropertyValue("--lbn-pop-fg").trim()) pop.style.setProperty("--lbn-pop-fg", cs.color);
      if (!cs.getPropertyValue("--lbn-pop-bg").trim()) {
        for (var n = anchor; n && n.nodeType === 1; n = n.parentElement) {
          var bg = getComputedStyle(n).backgroundColor;
          if (bg && !/^rgba\(.*,\s*0\)$|transparent/.test(bg)) { var m = bg.match(/rgba?\(([^)]+)\)/); if (m) { var p = m[1].split(","); bg = "rgb(" + p.slice(0, 3).join(",") + ")"; } pop.style.setProperty("--lbn-pop-bg", bg); break; }
        }
      }
    } catch (e) {}
    var form = pop.querySelector(".lbn-form"), tip = pop.querySelector(".lbn-tip"), err = pop.querySelector(".lbn-err");
    function render() {
      var K = kindOf(cfg, kind);
      [].forEach.call(pop.querySelectorAll(".lbn-kind"), function (b) { b.classList.toggle("on", b.dataset.k === kind); });
      tip.textContent = K.tip || ""; err.textContent = "";
      var h = '<div class="lbn-row">';
      if (K.amount) h += '<input type="number" class="lbn-amt" step="1" placeholder="' + esc(K.amountPh || "+N") + '">';
      if (K.target === "stat") h += '<select class="lbn-t">' + cfg.stats.map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + "</option>"; }).join("") + "</select>";
      else if (K.target === "choice") h += '<select class="lbn-t">' + K.choices.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("") + "</select>";
      else if (K.target) h += '<input type="text" class="lbn-t" autocomplete="off" maxlength="' + (K.target === "text" ? 160 : 60) + '" placeholder="' + esc(K.targetPh || (K.target === "text" ? "Text" : "Search or type a name…")) + '">';
      h += "</div>";
      if (/^list:/.test(K.target || "")) h += '<div class="lbn-sug"></div>';
      form.innerHTML = h;
      var q = form.querySelector("input.lbn-t"), sug = form.querySelector(".lbn-sug");
      if (q && sug) {
        var L = list(cfg, K.target.slice(5));
        var paint = function () { var t = norm(q.value).toLowerCase(); sug.innerHTML = L.filter(function (x) { return !t || x.name.toLowerCase().indexOf(t) >= 0; }).slice(0, 40).map(function (x) { return '<div data-n="' + esc(x.name) + '"><span>' + esc(x.name) + "</span><small>" + esc(x.meta || "") + "</small></div>"; }).join(""); };
        q.addEventListener("input", paint); paint();
        sug.addEventListener("mousedown", function (e) { var d = e.target.closest("[data-n]"); if (!d) return; e.preventDefault(); q.value = d.getAttribute("data-n"); sug.innerHTML = ""; });
      }
      var first = form.querySelector(".lbn-amt,input.lbn-t"); if (first) setTimeout(function () { try { first.focus(); } catch (e) {} }, 0);
    }
    function collect() {
      var K = kindOf(cfg, kind), a = form.querySelector(".lbn-amt"), t = form.querySelector(".lbn-t");
      var o = one(cfg, { kind: kind, amount: a ? a.value : undefined, target: t ? t.value : undefined });
      if (!o) { err.textContent = K.amount && !(a && int(a.value)) && !K.optAmount ? "Enter an amount." : "Fill it in first."; return null; }
      return o;
    }
    pop.addEventListener("click", function (e) {
      var kb = e.target.closest(".lbn-kind"); if (kb) { kind = kb.dataset.k; render(); return; }
      if (e.target.closest(".lbn-cancel")) { closePop(); return; }
      if (e.target.closest(".lbn-ok")) { var o = collect(); if (o) { closePop(); onAdd(o); } }
    });
    pop.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); var o = collect(); if (o) { closePop(); onAdd(o); } } });
    render();
    var r = anchor.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8) + "px";
    var y = r.bottom + 6; if (y + h > window.innerHeight - 8) y = Math.max(8, r.top - h - 6);
    pop.style.top = y + "px";
    popClose = function (e) {
      if (e.type === "keydown") { if (e.key === "Escape") closePop(); return; }
      if (pop && !pop.contains(e.target) && e.target !== anchor) closePop();
    };
    document.addEventListener("mousedown", popClose, true);
    document.addEventListener("keydown", popClose, true);
  }

  // ── the badge strip ─────────────────────────────────────────────────────────
  function editor(el, opts) {
    injectCss(); opts = opts || {};
    var sys = opts.sys, cfg = cfgOf(sys), L = normalize(sys, opts.benefits);
    function paint() {
      var h = L.map(function (b, i) {
        var K = kindOf(cfg, b.kind) || {};
        return '<span class="lbn-b lbn-c-' + (K.color || "grey") + (opts.readonly ? " ro" : "") + '" title="' + esc(K.tip || "") + '"><span>' + esc(label(sys, b)) + "</span>" +
          (opts.readonly ? "" : '<button type="button" class="lbn-x" data-i="' + i + '" title="Remove this bonus" aria-label="Remove">×</button>') + "</span>";
      }).join("");
      if (!L.length && opts.empty) h += '<span class="lbn-empty">' + esc(opts.empty) + "</span>";
      if (!opts.readonly) h += '<button type="button" class="lbn-add" title="Add a bonus">' + esc(opts.addLabel || "+ Bonus") + "</button>";
      (opts.extra || []).forEach(function (x, i) { h += '<button type="button" class="lbn-add lbn-extra" data-x="' + i + '" title="' + esc(x.title || "") + '">' + esc(x.label) + "</button>"; });
      el.innerHTML = '<div class="lbn">' + h + "</div>";
    }
    function changed() { paint(); if (opts.onChange) opts.onChange(L.slice()); }
    el.addEventListener("click", function (e) {
      var x = e.target.closest(".lbn-x"); if (x) { L.splice(+x.dataset.i, 1); changed(); return; }
      var a = e.target.closest(".lbn-add:not(.lbn-extra)"); if (a) { openPop(sys, a, function (b) { L.push(b); changed(); }, opts.kinds); return; }
      var ex = e.target.closest(".lbn-extra"); if (ex) { var f = (opts.extra || [])[+ex.dataset.x]; if (f && f.onClick) f.onClick(); }
    });
    paint();
    return { get: function () { return L.slice(); }, set: function (v) { L = normalize(sys, v); paint(); } };
  }

  window.LootBonus = {
    register: function (sys, cfg) { SYS[String(sys).toLowerCase()] = cfg; },
    has: function (sys) { return !!cfgOf(sys); },
    cfg: cfgOf, normalize: normalize, label: label, summary: summary, fromText: fromText, roll: roll, enchant: enchant,
    editor: editor, openPicker: openPop, closePicker: closePop, injectCss: injectCss,
  };
})();
