import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { TOOLS_NAV, compendiumFor } from "@/components/navConfig";

// The shared "mini-bar": the site's navigation chrome for every surface that
// is NOT rendered by the Next.js layout — the standalone character sheets, the
// GM Screen, the Map Maker and the Tabletop (VTT). Before this each of those
// had only a lone "Home" control, in a different spot on each page, and the
// user lost the system picker, Compendium and Tools the moment a tool opened.
//
// It is a static HTML/CSS/JS snippet (no React) inserted as the FIRST child of
// <body>. Every one of those surfaces lays its body out as a flex column, so a
// sticky first child simply takes its own 36px and pushes content down — no
// padding hacks, nothing overlapped. Hidden in embed / preview modes by the
// callers (the framing page provides chrome there).
//
//   [logo] [SYSTEM] Characters › Kira                      [Saved] [☰]
//
// The ☰ menu: Dashboard · Characters · Adventures · Campaigns, any context
// links the caller passes (Campaign · Tabletop · OBR), the Tools group,
// that system's Compendium (+ Rulebooks), and — on sheets — the Light/Dark
// theme toggle. Colors come from /tokens.css; the system chip (and anything
// using var(--sys)) wears the current system's accent.

export type MiniBarLink = { label: string; href: string; external?: boolean };

export type MiniBarOpts = {
  /** Tints the chip and sets --sys for the page. */
  system: SystemKey | null;
  /** What this page is: "Characters", "Adventures", "GM Screen", "Map Maker", "Tabletop". */
  crumb: string;
  /** The document's name (a character, an adventure). Live-updated via .dd-title. */
  title?: string;
  /** Page-specific places to go next (Campaign · Tabletop · OBR …). */
  context?: MiniBarLink[];
  /** Show the save-status chip (#dd-status) — sheets and the GM Screen. */
  status?: boolean;
  /** The sheet's own dark-mode localStorage key (e.g. "sd_dark"): shows the
   *  Light/Dark toggle and binds it to the ONE global dd_theme preference. */
  themeKey?: string;
};

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function sysEntry(key: SystemKey | null) {
  return key ? SYSTEMS.find((s) => s.key === key) ?? null : null;
}

// What goes in <head>: the shared tokens (BEFORE the tool's own CSS so the tool
// can still override) and the page's --sys accent. Also seeds the global theme
// into the sheet's own dark-mode key before the sheet reads it, so sheets open
// in the app's dark theme by default (one preference, not fourteen).
export function miniBarHead(system: SystemKey | null, themeKey?: string): string {
  const s = sysEntry(system);
  const accent = s ? `<style id="dd-sys">:root{--sys:${s.accent}}</style>` : "";
  const seed = themeKey
    ? `<script>(function(){try{var t=localStorage.getItem("dd_theme")||"dark";localStorage.setItem(${JSON.stringify(themeKey)},t==="dark"?"1":"0");}catch(e){}})();</script>`
    : "";
  return `<link rel="stylesheet" href="/tokens.css">\n${accent}\n${seed}`;
}

export function miniBar(opts: MiniBarOpts): string {
  const s = sysEntry(opts.system);
  const compendium = opts.system ? compendiumFor(opts.system) : [];
  const link = (l: MiniBarLink) =>
    `<a href="${esc(l.href)}"${l.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(l.label)}${l.external ? " ↗" : ""}</a>`;

  const style = `<style id="dd-bar-style">
#dd-bar{position:sticky;top:0;z-index:2147483000;flex:0 0 auto;display:flex;align-items:center;gap:10px;height:36px;padding:0 10px;box-sizing:border-box;background:var(--panel,#111113);border-bottom:1px solid var(--border,#26262a);color:var(--text,#ece9e1);font:600 11px/1 "Barlow Condensed",Barlow,system-ui,-apple-system,sans-serif;letter-spacing:.08em;text-transform:uppercase;-webkit-user-select:none;user-select:none}
#dd-bar a{color:inherit;text-decoration:none}
#dd-bar .dd-logo{display:flex;align-items:center;flex:0 0 auto}
#dd-bar .dd-logo img{width:22px;height:22px;display:block}
#dd-bar .dd-sys{flex:0 0 auto;padding:4px 8px;border:1px solid var(--border,#26262a);border-radius:4px;background:var(--panel-2,#161618);color:var(--sys,var(--gold,#c8a020));white-space:nowrap}
#dd-bar .dd-crumb{display:flex;align-items:center;gap:6px;min-width:0;color:var(--muted,#8a8a93)}
#dd-bar .dd-crumb .dd-title{color:var(--text,#ece9e1);text-transform:none;letter-spacing:.02em;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:40vw}
#dd-bar .dd-spacer{flex:1 1 auto}
#dd-bar #dd-status{flex:0 0 auto;font-size:10px;color:var(--muted,#8a8a93);padding:4px 8px;border:1px solid transparent;border-radius:4px;white-space:nowrap}
#dd-bar #dd-status:empty{display:none}
#dd-bar #dd-status.is-saving{color:var(--muted,#8a8a93)}
#dd-bar #dd-status.is-saved{color:var(--sys,var(--gold,#c8a020))}
#dd-bar #dd-status.is-error{color:#fff;background:var(--red,#b82018);border-color:var(--red,#b82018)}
#dd-bar .dd-menu-btn{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:30px;height:28px;border:1px solid var(--border,#26262a);border-radius:4px;background:var(--panel-2,#161618);color:var(--text,#ece9e1);cursor:pointer;font:inherit}
#dd-bar .dd-menu-btn:hover,#dd-bar .dd-menu-btn[aria-expanded="true"]{border-color:var(--sys,var(--gold,#c8a020))}
#dd-menu{position:absolute;right:8px;top:40px;width:min(92vw,330px);max-height:calc(100vh - 56px);overflow:auto;background:var(--panel,#111113);border:1px solid var(--border,#26262a);border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.6);padding:6px;z-index:2147483001;text-transform:none;letter-spacing:.02em;font-weight:600;font-size:13px}
#dd-menu[hidden]{display:none}
#dd-menu .dd-menu-h{padding:8px 10px 4px;font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--muted,#8a8a93)}
#dd-menu .dd-menu-sec{display:grid;grid-template-columns:1fr 1fr;gap:3px;padding:2px}
#dd-menu .dd-menu-sec.one{grid-template-columns:1fr}
#dd-menu a,#dd-menu button{display:block;width:100%;box-sizing:border-box;text-align:left;padding:8px 10px;border:1px solid var(--border,#26262a);border-radius:5px;background:transparent;color:var(--muted,#8a8a93);font:inherit;cursor:pointer}
#dd-menu a:hover,#dd-menu button:hover{color:var(--text,#ece9e1);border-color:var(--sys,var(--gold,#c8a020));background:var(--panel-2,#161618)}
#dd-menu .dd-menu-ctx a{color:var(--sys,var(--gold,#c8a020));border-color:var(--sys,var(--gold,#c8a020))}
#dd-bar .dd-backdrop{position:fixed;inset:0;z-index:2147482999;background:transparent}
@media (max-width:640px){#dd-bar{gap:7px;padding:0 8px}#dd-bar .dd-crumb .dd-crumb-k{display:none}#dd-bar .dd-crumb .dd-sep{display:none}}
@media (prefers-reduced-motion:no-preference){#dd-menu{animation:dd-menu-in .12s ease-out}}
@keyframes dd-menu-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
</style>`;

  const crumb = `<span class="dd-crumb"><span class="dd-crumb-k">${esc(opts.crumb)}</span>${
    opts.title ? `<span class="dd-sep">›</span><span class="dd-title">${esc(opts.title)}</span>` : ""
  }</span>`;

  const ctx = opts.context && opts.context.length
    ? `<div class="dd-menu-h">This ${esc(opts.crumb.replace(/s$/, "").toLowerCase())}</div><div class="dd-menu-sec dd-menu-ctx">${opts.context.map(link).join("")}</div>`
    : "";

  const tools = `<div class="dd-menu-h">Tools</div><div class="dd-menu-sec">${TOOLS_NAV.map(link).join("")}</div>`;
  const comp = compendium.length
    ? `<div class="dd-menu-h">${s ? esc(s.name) + " " : ""}Compendium</div><div class="dd-menu-sec">${compendium.map(link).join("")}</div>`
    : "";
  const theme = opts.themeKey
    ? `<div class="dd-menu-h">Appearance</div><div class="dd-menu-sec one"><button type="button" class="dd-theme" data-key="${esc(opts.themeKey)}">Theme: <span class="dd-theme-v">Dark</span> — switch</button></div>`
    : "";

  const menu = `<div id="dd-menu" hidden>
<div class="dd-menu-sec"><a href="/dashboard">Dashboard</a><a href="/dashboard" data-view="characters">Characters</a><a href="/dashboard" data-view="adventures">Adventures</a><a href="/campaigns">Campaigns</a></div>
${ctx}${tools}${comp}${theme}</div>`;

  const bar = `<div id="dd-bar" role="navigation" aria-label="Site">
<a class="dd-logo" href="/dashboard" title="Dashboard"><img src="/logo-white.png" alt="Dashboard" width="22" height="22"></a>
${s ? `<span class="dd-sys" title="Current system">${esc(s.name)}</span>` : ""}
${crumb}
<span class="dd-spacer"></span>
${opts.status ? `<span id="dd-status" role="status" aria-live="polite"></span>` : ""}
<button type="button" class="dd-menu-btn" aria-label="Menu" aria-haspopup="true" aria-expanded="false" aria-controls="dd-menu"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg></button>
${menu}
</div>`;

  // key → {name, accent} for the client-side system hook below.
  const sysMap: Record<string, { name: string; accent: string }> = {};
  for (const e of SYSTEMS) sysMap[e.key] = { name: e.name, accent: e.accent };

  const script = `<script>(function(){
var bar=document.getElementById("dd-bar");if(!bar)return;
var SYS=${JSON.stringify(sysMap)};
// window.__ddSetSystem(key): the page tells the bar which system it's in (the
// GM Screen's own picker calls this), or the bar reads the site-wide choice when
// the server didn't know (an unlinked GM board). Updates the chip, --sys and —
// so the dashboard follows — localStorage dcw_system.
window.__ddSetSystem=function(key,opts){opts=opts||{};var s=SYS[key];if(!s)return;
  var chip=bar.querySelector(".dd-sys");if(chip){chip.textContent=s.name;}else{chip=document.createElement("span");chip.className="dd-sys";chip.title="Current system";chip.textContent=s.name;var lg=bar.querySelector(".dd-logo");lg&&lg.insertAdjacentElement("afterend",chip);}
  try{document.documentElement.style.setProperty("--sys",s.accent);document.documentElement.dataset.system=key;}catch(x){}
  if(!opts.silent){try{localStorage.setItem("dcw_system",key);}catch(x){}}};
var btn=bar.querySelector(".dd-menu-btn"),menu=document.getElementById("dd-menu"),bd=null;
function close(){menu.hidden=true;btn.setAttribute("aria-expanded","false");if(bd){bd.remove();bd=null;}document.removeEventListener("keydown",onKey,true);}
function open(){menu.hidden=false;btn.setAttribute("aria-expanded","true");bd=document.createElement("div");bd.className="dd-backdrop";bd.addEventListener("pointerdown",close);bar.appendChild(bd);document.addEventListener("keydown",onKey,true);}
function onKey(e){if(e.key==="Escape"){e.preventDefault();close();}}
btn.addEventListener("click",function(){menu.hidden?open():close();});
// Characters / Adventures: pick the dashboard tab before going there.
menu.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[data-view]");if(a){try{localStorage.setItem("dcw_dash_view",a.getAttribute("data-view"));}catch(x){}}});
// ONE notion of "current system": opening a tool for system X means you're in
// X, so the dashboard and navbar follow when you go back. When the server
// didn't know the system (an unlinked GM board), adopt the site-wide choice.
var sysKey=${JSON.stringify(opts.system || "")};
if(sysKey){try{localStorage.setItem("dcw_system",sysKey);}catch(x){}}
else{var stored=null;try{stored=localStorage.getItem("dcw_system");}catch(x){}if(stored&&SYS[stored])window.__ddSetSystem(stored,{silent:true});}
// Save status (sheets + GM Screen call this): kind = saving | saved | error.
window.__ddStatus=function(kind,text){var el=document.getElementById("dd-status");if(!el)return;el.className=kind?("is-"+kind):"";el.textContent=text||"";if(kind==="saved"){clearTimeout(el._t);el._t=setTimeout(function(){if(el.className==="is-saved"){el.textContent="";el.className="";}},2500);}};
// Theme toggle: one global preference (dd_theme) mirrored into this sheet's key.
var tb=menu.querySelector(".dd-theme");
if(tb){var key=tb.getAttribute("data-key"),v=tb.querySelector(".dd-theme-v");
  function cur(){try{return localStorage.getItem("dd_theme")||"dark";}catch(x){return "dark";}}
  function paint(){var t=cur();if(v)v.textContent=t==="dark"?"Dark":"Light";}
  tb.addEventListener("click",function(){var t=cur()==="dark"?"light":"dark";try{localStorage.setItem("dd_theme",t);localStorage.setItem(key,t==="dark"?"1":"0");}catch(x){}
    try{document.body.classList.toggle("dark",t==="dark");}catch(x){}paint();close();});
  paint();}
})();</script>`;

  return style + "\n" + bar + "\n" + script;
}
