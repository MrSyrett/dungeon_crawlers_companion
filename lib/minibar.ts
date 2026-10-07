import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { TOOLS_NAV, compendiumFor } from "@/components/navConfig";

// The shared "mini-bar": the site's navigation chrome for every surface that
// is NOT rendered by the Next.js layout — the standalone character sheets, the
// GM Screen, the Map Maker and the VTT. Before this each of those
// had only a lone "Home" control, in a different spot on each page, and the
// user lost the system picker, Compendium and Tools the moment a tool opened.
//
// It is a static HTML/CSS/JS snippet (no React) inserted as the FIRST child of
// <body>. Most of those surfaces lay their body out as a flex COLUMN, so a
// sticky first child simply takes its own 36px and pushes content down — no
// padding hacks, nothing overlapped. The adventure-prep builders are the
// exception: their body is a flex ROW (sidebar | preview), which turned the bar
// into a 36px-wide column down the left edge. `fixed: true` lifts the bar out
// of the flow for those — see FIXED_STYLE below. Hidden in embed / preview
// modes by the callers (the framing page provides chrome there).
//
//   [logo] [SYSTEM] Characters › Kira                      [Saved] [☰]
//
// The ☰ menu: Characters · Adventures, the Tools group,
// that system's Compendium (+ Rulebooks), and the Settings link to /account. Colors come from /tokens.css; the system chip (and anything
// using var(--sys)) wears the current system's accent.

export type MiniBarLink = { label: string; href: string; external?: boolean };

export type MiniBarOpts = {
  /** Tints the chip and sets --sys for the page. */
  system: SystemKey | null;
  /** What this page is: "Characters", "Adventures", "GM Screen", "Map Maker", "VTT".
   *  Optional, and the GM Screen and the VTT deliberately omit it: the bar already
   *  carries the logo and the system chip, and on those two the crumb only restated
   *  the page you were obviously looking at plus the campaign name. */
  crumb?: string;
  /** The document's name (a character, an adventure). Live-updated via .dd-title. */
  title?: string;
  /** Show the save-status chip (#dd-status) — sheets and the GM Screen. */
  status?: boolean;
  /** The sheet's own dark-mode localStorage key (e.g. "sd_dark"). Used only to
   *  SEED the sheet from the global dd_theme preference before its script runs;
   *  the control itself lives on /account. */
  themeKey?: string;
  /** For a page whose <body> is a flex ROW (the adventure-prep builders): take
   *  the bar out of the flow and reserve its height with padding instead, so it
   *  spans the top rather than becoming a column beside the sidebar. */
  fixed?: boolean;
  /** For a character sheet: take the bar's own height off the roll log, which
   *  is pinned to a hard 100vh. */
  sheetFit?: boolean;
};

// For a <body> that is a flex ROW. A sticky first child there becomes a narrow
// column down the left edge — which is exactly what the adventure-prep builders
// were showing. Taking the bar out of the flow and reserving its 36px with
// padding instead puts it back across the top without touching the builder's
// own two-pane layout. border-box keeps the reserved strip inside the body's
// own height:100vh, so nothing is pushed off the bottom.
//
// This <style> is the last one in the document, and `body` here out-ranks
// nothing it shouldn't: both rules are a bare element selector, so the one that
// comes last — this one — wins over the template's.
// For a character sheet. Its <body> is a flex column, so the bar sits above the
// sheet correctly — but the roll log inside is `position:sticky; top:0` with a
// hard `height:100vh`, written when nothing was above it. With the bar there,
// that is 36px taller than the room it has: the page grows a scrollbar it
// should not have and the bottom of the log falls off the screen. All fourteen
// sheets share the rule, so one correction here covers them.
const SHEET_FIT = `
#dd-bar{--dd-h:36px}
body{min-height:calc(100vh - 36px)}
.roll-log{top:36px;height:calc(100vh - 36px)}
`;

const FIXED_STYLE = `
#dd-bar{position:fixed;left:0;right:0;top:0}
body{padding-top:36px;box-sizing:border-box}
`;

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function sysEntry(key: SystemKey | null) {
  return key ? SYSTEMS.find((s) => s.key === key) ?? null : null;
}

// The faces each themed skin in public/tokens.css names. A standalone document
// can't use next/font, so the ones its own template doesn't already load have
// to be fetched here. Only the themed tools (character sheets, adventure preps)
// ask for this — the GM Screen, the Map Maker and the VTT never do.
// A system with no entry has no skin yet and keeps the template's own type.
const THEME_FONTS: Partial<Record<SystemKey, string>> = {
  SD: "family=Montserrat:wght@400;600;800",
  DND: "family=Cinzel:wght@700;900&family=EB+Garamond:ital,wght@0,400;0,600;1,400",
  DCC: "family=Anton&family=Barlow:wght@400;500;600&family=Share+Tech+Mono",
  SW: "family=Archivo+Black&family=Libre+Franklin:ital,wght@0,400;0,600;0,700;1,400",
  MMRPG: "family=Oswald:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400",
  ACE: "family=Lilita+One&family=Nunito:ital,wght@0,400;0,600;0,700;1,400",
  // Kids on Bikes' display face (Dreadful) and Ghostbusters' logo face are
  // self-hosted — public/tokens.css declares them with @font-face from
  // /fonts, so only the body faces are fetched from Google here.
  KOB: "family=Mulish:ital,wght@0,400;0,600;0,700;1,400",
  D62E: "family=Saira+Condensed:wght@500;600;700&family=Saira:ital,wght@0,400;0,600;0,700;1,400",
  GB: "family=Anton&family=Asap:ital,wght@0,400;0,600;0,700;1,400",
  CO: "family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,600;0,700;1,400",
  NIM: "family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,400&family=Figtree:ital,wght@0,400;0,600;0,700;1,400",
  ICRPG: "family=Permanent+Marker&family=Archivo:ital,wght@0,400;0,600;0,700;1,400",
  YZE: "family=Archivo+Narrow:ital,wght@0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400",
  JLU: "family=Russo+One&family=Rubik:ital,wght@0,400;0,600;0,700;1,400",
};

// What goes in <head>: the shared tokens (BEFORE the tool's own CSS so the tool
// can still override) and the page's --sys accent. Also seeds the global theme
// into the sheet's own dark-mode key before the sheet reads it, so sheets open
// in the app's dark theme by default (one preference, not fourteen).
//
// `themed` adds the skin's faces. The <html> attributes that switch the skin on
// (data-system + data-themed) are written by the caller onto the tag itself —
// no script, so there's no flash of the unthemed ground on load.
export function miniBarHead(system: SystemKey | null, themeKey?: string, themed?: boolean): string {
  const s = sysEntry(system);
  const accent = s ? `<style id="dd-sys">:root{--sys:${s.accent}}</style>` : "";
  // Nothing to fetch: every family THEME_FONTS names is self-hosted in
  // public/tokens.css, which the return below links on the same line. The remote
  // stylesheet this used to emit was the font flash — two extra hosts to resolve
  // and connect to before a single glyph could be drawn, for faces already
  // sitting in /fonts/google. THEME_FONTS stays as the record of which families
  // each skin needs; scripts/check-standalone-fonts.mjs asserts tokens.css still
  // covers every one of them, so this can never quietly lose a face.
  const faces = "";
  const seed = themeKey
    ? `<script>(function(){try{var t=localStorage.getItem("dd_theme")||"dark";localStorage.setItem(${JSON.stringify(themeKey)},t==="dark"?"1":"0");}catch(e){}})();</script>`
    : "";
  // The app's own pair used to be fetched here too; it is self-hosted now, and
  // Geist is a VARIABLE face in tokens.css (font-weight: 400 900), so every weight
  // resolves from one file.
  //
  // The warning this comment used to carry still matters, it just moved: Geist's
  // weights must stay in step with app/layout.tsx's next/font call. SiteNav styles
  // its links font-semibold, and with no 600 loaded the font-matching algorithm
  // resolves 600 upward to 700 — so the Next navbar has always rendered them Bold.
  // Giving the standalone bar a real 600 alone made it read lighter than every
  // other page. Variable Geist now covers 600 on the standalone side, so if the
  // Next side ever gains a true 600 the two will finally agree; until then this is
  // the one place they can drift, and it is deliberate.
  const base = "";
  return `<link rel="stylesheet" href="/tokens.css">\n${base}\n${faces}\n${accent}\n${seed}`;
}

/** True when public/tokens.css actually has a skin for this system — i.e. when
 *  stamping data-themed on a document would change anything. */
export function hasThemeFor(system: SystemKey | null): boolean {
  return !!system && !!THEME_FONTS[system];
}

export function miniBar(opts: MiniBarOpts): string {
  const s = sysEntry(opts.system);
  const compendium = opts.system ? compendiumFor(opts.system) : [];
  const link = (l: MiniBarLink) =>
    `<a href="${esc(l.href)}"${l.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(l.label)}${l.external ? " ↗" : ""}</a>`;

  const style = `<style id="dd-bar-style">
#dd-bar{position:sticky;top:0;z-index:2147483000;flex:0 0 auto;display:flex;align-items:center;gap:10px;height:36px;padding:0 10px;box-sizing:border-box;background:var(--panel,#14161a);border-bottom:1px solid var(--border,#2b3038);color:var(--text,#e9edf2);font:500 11px/1 "Geist",system-ui,-apple-system,sans-serif;letter-spacing:.08em;text-transform:uppercase;-webkit-user-select:none;user-select:none}
#dd-bar a{color:inherit;text-decoration:none}
#dd-bar .dd-logo{display:flex;align-items:center;flex:0 0 auto}
#dd-bar .dd-logo img{width:22px;height:22px;display:block}
#dd-bar .dd-sys{flex:0 0 auto;padding:4px 8px;border:1px solid var(--border,#2b3038);border-radius:4px;background:var(--panel-2,#1c1f24);color:var(--sys,var(--accent,#5490c4));white-space:nowrap}
#dd-bar .dd-crumb{display:flex;align-items:center;gap:6px;min-width:0;color:var(--muted,#8d96a3)}
#dd-bar .dd-crumb .dd-title{color:var(--text,#e9edf2);text-transform:none;letter-spacing:.02em;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:40vw}
#dd-bar .dd-spacer{flex:1 1 auto}
#dd-bar #dd-status{flex:0 0 auto;font-size:10px;color:var(--muted,#8d96a3);padding:4px 8px;border:1px solid transparent;border-radius:4px;white-space:nowrap}
#dd-bar #dd-status:empty{display:none}
#dd-bar #dd-status.is-saving{color:var(--muted,#8d96a3)}
#dd-bar #dd-status.is-saved{color:var(--signal,#ff8419)}
#dd-bar #dd-status.is-error{color:#fff;background:var(--red,#b82018);border-color:var(--red,#b82018)}
#dd-bar .dd-menu-btn{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:30px;height:28px;border:1px solid var(--border,#2b3038);border-radius:4px;background:var(--panel-2,#1c1f24);color:var(--text,#e9edf2);cursor:pointer;font:inherit}
#dd-bar .dd-menu-btn:hover,#dd-bar .dd-menu-btn[aria-expanded="true"]{border-color:var(--accent,#5490c4)}
/* The account icon, mirroring SiteNav's .nav-acct (same 1px box, same muted
   colour, same hover) so these surfaces read like the rest of the site: menu at
   the left end, account at the right. */
#dd-bar .dd-acct{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:30px;height:28px;border:1px solid var(--border,#2b3038);border-radius:4px;color:var(--muted,#8d96a3);transition:color .15s,border-color .15s}
#dd-bar .dd-acct:hover{color:var(--text,#e9edf2);border-color:var(--muted,#8d96a3)}
/* Opens under the menu button, which now sits at the LEFT end of the bar. */
#dd-menu{position:absolute;left:8px;top:40px;width:min(92vw,330px);max-height:calc(100vh - 56px);overflow:auto;background:var(--panel,#14161a);border:1px solid var(--border,#2b3038);border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.6);padding:6px;z-index:2147483001;text-transform:none;letter-spacing:.02em;font-weight:600;font-size:13px}
#dd-menu[hidden]{display:none}
#dd-menu .dd-menu-h{padding:8px 10px 4px;font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--muted,#8d96a3)}
#dd-menu .dd-menu-sec{display:grid;grid-template-columns:1fr 1fr;gap:3px;padding:2px}
#dd-menu .dd-menu-sec.one{grid-template-columns:1fr}
#dd-menu a,#dd-menu button{display:block;width:100%;box-sizing:border-box;text-align:left;padding:8px 10px;border:1px solid var(--border,#2b3038);border-radius:5px;background:transparent;color:var(--muted,#8d96a3);font:inherit;cursor:pointer}
#dd-menu a:hover,#dd-menu button:hover{color:var(--text,#e9edf2);border-color:var(--accent,#5490c4);background:var(--panel-2,#1c1f24)}
#dd-bar .dd-backdrop{position:fixed;inset:0;z-index:2147482999;background:transparent}
@media (max-width:640px){#dd-bar{gap:7px;padding:0 8px}#dd-bar .dd-crumb .dd-crumb-k{display:none}#dd-bar .dd-crumb .dd-sep{display:none}}
@media (prefers-reduced-motion:no-preference){#dd-menu{animation:dd-menu-in .12s ease-out}}
@keyframes dd-menu-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
${opts.fixed ? FIXED_STYLE : ""}${opts.sheetFit ? SHEET_FIT : ""}</style>`;

  // Nothing at all when there is no crumb, rather than an empty span that still
  // takes its gap in the flex row.
  const crumb = opts.crumb
    ? `<span class="dd-crumb"><span class="dd-crumb-k">${esc(opts.crumb)}</span>${
        opts.title ? `<span class="dd-sep">›</span><span class="dd-title">${esc(opts.title)}</span>` : ""
      }</span>`
    : "";

  const tools = `<div class="dd-menu-h">Tools</div><div class="dd-menu-sec">${TOOLS_NAV.map(link).join("")}</div>`;
  const comp = compendium.length
    ? `<div class="dd-menu-h">${s ? esc(s.name) + " " : ""}Compendium</div><div class="dd-menu-sec">${compendium.map(link).join("")}</div>`
    : "";
  // Account is the icon at the right end of the bar now, not a row in this menu —
  // the same arrangement SiteNav uses, whose mobile panel likewise has no Account
  // entry. /account still owns the light/dark preference; this page SEEDS itself
  // from it in miniBarHead, so the sheet opens in the right mode without the
  // control being duplicated here.
  const menu = `<div id="dd-menu" hidden>
<div class="dd-menu-sec"><a href="/dashboard" data-view="characters">Characters</a><a href="/dashboard" data-view="adventures">Adventures</a></div>
${comp}${tools}</div>`;

  // ORDER MIRRORS SiteNav: menu button, logo, system, crumb — then the account
  // icon at the far right. The menu button used to sit at the right end with no
  // account icon at all, which made these two surfaces the odd ones out against
  // every other page and against the phone layout.
  const bar = `<div id="dd-bar" role="navigation" aria-label="Site">
<button type="button" class="dd-menu-btn" aria-label="Menu" aria-haspopup="true" aria-expanded="false" aria-controls="dd-menu"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg></button>
<a class="dd-logo" href="/" title="Home"><img src="/logo-white.png" alt="Home" width="22" height="22"></a>
${s ? `<span class="dd-sys" title="Current system">${esc(s.name)}</span>` : ""}
${crumb}
<span class="dd-spacer"></span>
${opts.status ? `<span id="dd-status" role="status" aria-live="polite"></span>` : ""}
<a class="dd-acct" href="/account" title="Account settings" aria-label="Account settings"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke-linecap="round"></path></svg></a>
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
})();</script>`;

  return style + "\n" + bar + "\n" + script;
}
