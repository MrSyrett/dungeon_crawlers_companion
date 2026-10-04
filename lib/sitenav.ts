import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { TOOLS_NAV, compendiumFor, homebrewFor } from "@/components/navConfig";

// The site navbar, for the surfaces that are NOT Next pages.
//
// components/SiteNav.tsx is a React component in the Next layout, so the
// standalone documents — the fourteen character sheets, the fourteen adventure
// prep builders and the Map Maker — could never mount it. They wore the 36px
// mini-bar instead, which is why they always looked like a different product.
// This emits the same bar as plain markup with a little vanilla JS.
//
// WHAT IS SHARED AND WHAT IS NOT. The markup is a second implementation — two
// files draw this bar and both have to be edited when its shape changes. The
// CONFIGURATION is not duplicated: the system list, the per-system compendium
// links, the homebrew hubs and the tools row are all imported from the exact
// modules SiteNav imports. Add a compendium page and both navbars grow it.
// That is the whole reason this is maintainable; keep it that way.
//
// The GM Screen and the Tabletop deliberately keep the mini-bar: they are
// full-bleed working surfaces where 16px of height is worth more than matching
// chrome, and both already have their own dense toolbars.

export type SiteNavOpts = {
  /** The document's system, when it has one. Null (Map Maker) reads the
   *  stored choice client-side, the way the mini-bar already did. */
  system: SystemKey | null;
  email: string;
  isAdmin?: boolean;
  /** Keeps a character sheet's roll log and body sized to the room left. */
  sheetFit?: boolean;
  /** Lifts the bar out of the flow for the prep builders, whose layout is a
   *  100vh row-flex that would otherwise push the bar into a narrow column. */
  fixed?: boolean;
  /** Render the save-status chip that window.__ddStatus writes into. */
  status?: boolean;
};

/** The bar's height, and the single source of truth for it. Everything that
 *  needs to size around the bar reads var(--dd-bar-h) rather than a literal,
 *  so the mini-bar surfaces (36px) and these (52px) share one mechanism. */
export const SITE_NAV_H = 52;

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

/** navConfig's data, shaped for the browser. Emitted as JSON rather than baked
 *  into markup so the Map Maker — which has no system of its own — can render
 *  the chip, the compendium menu and the homebrew link for whichever system is
 *  stored, and re-render them when the user switches. */
function navData() {
  const systems = SYSTEMS.map((s) => ({ k: s.key, n: s.name, a: s.accent }));
  const comp: Record<string, { h: string; l: string }[]> = {};
  const brew: Record<string, string | null> = {};
  for (const s of SYSTEMS) {
    comp[s.key] = compendiumFor(s.key).map((l) => ({ h: l.href, l: l.label }));
    brew[s.key] = homebrewFor(s.key);
  }
  return { systems, comp, brew, tools: TOOLS_NAV.map((t) => ({ h: t.href, l: t.label })) };
}

const CSS = `
:root{--dd-bar-h:0px}
body:has(#dd-nav){--dd-bar-h:${SITE_NAV_H}px}
#dd-nav{position:sticky;top:0;z-index:2147483000;flex:0 0 auto;box-sizing:border-box;background:var(--panel,#14161a);border-bottom:1px solid var(--border,#2b3038);color:var(--text,#e9edf2);font-family:"Geist",system-ui,-apple-system,sans-serif;-webkit-user-select:none;user-select:none}
#dd-nav *{box-sizing:border-box}
#dd-nav a{text-decoration:none;color:inherit}
#dd-nav .nav-row{position:relative;z-index:10;display:flex;align-items:center;gap:6px;width:100%;max-width:80rem;margin:0 auto;padding:0 12px;height:${SITE_NAV_H}px}
#dd-nav .nav-logo{display:flex;align-items:center;flex:0 0 auto}
#dd-nav .nav-logo img{width:32px;height:32px;display:block}
#dd-nav .nav-burger{display:flex;flex:0 0 auto;align-items:center;padding:7px;border:1px solid var(--border,#2b3038);border-radius:4px;background:var(--panel-2,#1c1f24);color:inherit;cursor:pointer}
#dd-nav .nav-sysbtn{display:flex;align-items:center;gap:4px;flex:0 0 auto;border:1px solid var(--border,#2b3038);border-radius:4px;background:var(--panel-2,#1c1f24);padding:6px 8px;font:700 11px/1 inherit;letter-spacing:.03em;text-transform:uppercase;cursor:pointer}
#dd-nav .nav-links{display:none;flex:0 0 auto;flex-wrap:nowrap;align-items:center;gap:1px}
#dd-nav .nav-item{border-radius:4px;padding:7px 6px;font:600 11px/1 inherit;text-transform:uppercase;color:var(--muted,#8d96a3);background:transparent;border:0;cursor:pointer;white-space:nowrap;transition:color .12s,background .12s}
#dd-nav .nav-item:hover{color:var(--text,#e9edf2)}
#dd-nav .nav-item.on{background:var(--panel-2,#1c1f24);color:var(--text,#e9edf2)}
#dd-nav .nav-item.has-caret{display:flex;align-items:center;gap:4px}
#dd-nav .nav-right{margin-left:auto;display:flex;flex:0 0 auto;align-items:center;gap:8px}
#dd-nav #dd-status{flex:0 0 auto;font:500 10px/1 inherit;color:var(--muted,#8d96a3);padding:4px 8px;border:1px solid transparent;border-radius:4px;white-space:nowrap;text-transform:uppercase;letter-spacing:.08em}
#dd-nav #dd-status:empty{display:none}
#dd-nav #dd-status.is-saving{color:var(--muted,#8d96a3)}
#dd-nav #dd-status.is-saved{color:var(--signal,#ff8419)}
#dd-nav #dd-status.is-error{color:#fff;background:var(--red,#b82018);border-color:var(--red,#b82018)}

#dd-nav .nav-admin{border:1px solid var(--accent,#5490c4);border-radius:4px;padding:4px 9px;font:600 10px/1 inherit;letter-spacing:.06em;text-transform:uppercase;color:var(--accent,#5490c4)}
#dd-nav .nav-acct{display:flex;flex:0 0 auto;align-items:center;padding:7px;border:1px solid var(--border,#2b3038);border-radius:4px;color:var(--muted,#8d96a3);transition:color .12s,border-color .12s}
#dd-nav .nav-acct:hover{color:var(--text,#e9edf2);border-color:var(--muted,#8d96a3)}
#dd-nav .nav-pop{position:absolute;top:100%;margin-top:4px;min-width:224px;max-height:70vh;overflow:auto;background:var(--panel,#14161a);border:1px solid var(--border,#2b3038);border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.55);padding:4px;z-index:2147483001}
#dd-nav .nav-pop[hidden]{display:none}
#dd-nav .nav-pop a,#dd-nav .nav-pop button{display:block;width:100%;text-align:left;border:0;background:transparent;border-radius:4px;padding:8px 12px;font:600 13px/1.2 inherit;color:var(--muted,#8d96a3);cursor:pointer}
#dd-nav .nav-pop a:hover,#dd-nav .nav-pop button:hover{background:var(--panel-2,#1c1f24);color:var(--text,#e9edf2)}
#dd-nav .nav-pop button.on{background:var(--panel-2,#1c1f24)}
#dd-nav .nav-wrap{position:relative;flex:0 0 auto}
#dd-nav .nav-backdrop{position:fixed;inset:0;z-index:0;background:transparent;border:0;cursor:default}
#dd-nav .nav-panel{position:relative;z-index:10;border-top:1px solid var(--border,#2b3038);background:var(--panel,#14161a);padding:12px}
#dd-nav .nav-panel[hidden]{display:none}
#dd-nav .nav-panel h4{margin:12px 2px 4px;font:700 11px/1 inherit;letter-spacing:.15em;text-transform:uppercase;color:var(--muted,#8d96a3)}
#dd-nav .nav-panel h4:first-child{margin-top:0}
#dd-nav .nav-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px}
#dd-nav .nav-grid a,#dd-nav .nav-grid button{border:1px solid var(--border,#2b3038);border-radius:4px;padding:8px 12px;font:600 12px/1.2 inherit;color:var(--muted,#8d96a3);background:transparent;text-align:left;cursor:pointer}
#dd-nav .nav-grid a:hover,#dd-nav .nav-grid button:hover{color:var(--text,#e9edf2)}
/* Measured, not guessed, the same way the Next navbar's 1152 was: nine
   uppercase links plus the logo, the full-name system chip, the save-status
   chip, the Admin chip and the account icon come to 1227px, so this row is
   gated at 1280. It is wider than SiteNav's gate because SiteNav carries
   neither a status chip nor, on most pages, an Admin chip. */
@media (min-width:1280px){
  #dd-nav .nav-links{display:flex}
  #dd-nav .nav-burger{display:none}
  #dd-nav .nav-panel{display:none!important}
}
`;

/** Sized so a sheet's own full-height furniture leaves room for the bar. */
const SHEET_FIT = `
body{min-height:calc(100vh - var(--dd-bar-h))}
.roll-log{top:var(--dd-bar-h);height:calc(100vh - var(--dd-bar-h))}
`;

/** The prep builders lay out as a 100vh row-flex; a sticky first child would be
 *  squeezed into a narrow column down the left edge, so the bar comes out of
 *  the flow and the body reserves its height instead. */
const FIXED_STYLE = `
#dd-nav{position:fixed;left:0;right:0;top:0}
body{padding-top:var(--dd-bar-h)}
`;

const CARET = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

export function siteNav(opts: SiteNavOpts): string {
  const data = navData();
  const style = `<style id="dd-nav-style">${CSS}${opts.fixed ? FIXED_STYLE : ""}${opts.sheetFit ? SHEET_FIT : ""}</style>`;

  const tools = data.tools
    .map((t) => `<a class="nav-item" href="${esc(t.h)}">${esc(t.l)}</a>`)
    .join("");
  const toolsPanel = data.tools
    .map((t) => `<a href="${esc(t.h)}">${esc(t.l)}</a>`)
    .join("");

  const markup = `<nav id="dd-nav" class="dcc-chrome" data-sys="${esc(opts.system ?? "")}">
<div class="nav-row">
  <button class="nav-burger" type="button" id="dd-nav-burger" aria-label="Menu" aria-expanded="false"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"></path></svg></button>
  <a class="nav-logo" href="/dashboard" title="Dungeon Crawler's Companion"><img src="/logo-white.png" alt="Dungeon Crawler's Companion — home" width="32" height="32"></a>
  <div class="nav-wrap">
    <button class="nav-sysbtn" type="button" id="dd-nav-sysbtn" aria-haspopup="true" aria-expanded="false"><span id="dd-nav-sysname">&nbsp;</span>${CARET}</button>
    <div class="nav-pop" id="dd-nav-syspop" hidden></div>
  </div>
  <div class="nav-links">
    <button class="nav-item" type="button" data-view="characters">Characters</button>
    <button class="nav-item" type="button" data-view="adventures">Adventures</button>
    <div class="nav-wrap">
      <button class="nav-item has-caret" type="button" id="dd-nav-compbtn" aria-haspopup="true" aria-expanded="false">Compendium ${CARET}</button>
      <div class="nav-pop" id="dd-nav-comppop" hidden></div>
    </div>
    <a class="nav-item" id="dd-nav-brew" href="/homebrew" hidden>Homebrew</a>
    ${tools}
  </div>
  <div class="nav-right">
    ${opts.status ? `<span id="dd-status" role="status" aria-live="polite"></span>` : ""}
    ${opts.isAdmin ? `<a class="nav-admin" href="/admin/users">Admin</a>` : ""}
    <a class="nav-acct" href="/account" title="${esc(opts.email)} — account settings" aria-label="Account settings for ${esc(opts.email)}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke-linecap="round"></path></svg></a>
  </div>
</div>
<div class="nav-panel" id="dd-nav-panel" hidden>
  <div class="nav-grid"><button type="button" data-view="characters">Characters</button><button type="button" data-view="adventures">Adventures</button></div>
  <h4>Compendium</h4>
  <div class="nav-grid" id="dd-nav-panelcomp"></div>
  <h4>Tools</h4>
  <div class="nav-grid">${toolsPanel}</div>
</div>
</nav>`;

  // Vanilla port of SiteNav's behaviour. Switching system from one of these
  // surfaces always lands on the dashboard: SiteNav keeps you in place only on
  // the Rulebooks shelf, a homebrew hub or a compendium page, and a sheet, a
  // prep builder and the Map Maker are none of those — so this is its ordinary
  // fallback branch, not a simplification of it.
  const js = `<script id="dd-nav-js">(function(){
var D=${JSON.stringify(data)};
var nav=document.getElementById("dd-nav");if(!nav)return;
var docSys=nav.getAttribute("data-sys")||null;
function stored(){try{var v=localStorage.getItem("dcw_system");return D.systems.some(function(s){return s.k===v;})?v:null;}catch(e){return null;}}
var cur=docSys||stored()||D.systems[0].k;
function entry(k){for(var i=0;i<D.systems.length;i++)if(D.systems[i].k===k)return D.systems[i];return D.systems[0];}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

var sysName=document.getElementById("dd-nav-sysname");
var sysBtn=document.getElementById("dd-nav-sysbtn");
var sysPop=document.getElementById("dd-nav-syspop");
var compBtn=document.getElementById("dd-nav-compbtn");
var compPop=document.getElementById("dd-nav-comppop");
var panelComp=document.getElementById("dd-nav-panelcomp");
var brew=document.getElementById("dd-nav-brew");

function paint(){
  var e=entry(cur);
  sysName.textContent=e.n; sysBtn.style.color=e.a;
  sysPop.innerHTML=D.systems.map(function(s){
    return '<button type="button" data-k="'+s.k+'" class="'+(s.k===cur?"on":"")+'"'+(s.k===cur?' style="color:'+s.a+'"':'')+'>'+esc(s.n)+'</button>';
  }).join("");
  var links=D.comp[cur]||[];
  compPop.innerHTML=links.map(function(l){return '<a href="'+esc(l.h)+'">'+esc(l.l)+'</a>';}).join("");
  panelComp.innerHTML=links.map(function(l){return '<a href="'+esc(l.h)+'">'+esc(l.l)+'</a>';}).join("");
  var hb=D.brew[cur];
  if(hb){brew.href=hb;brew.hidden=false;panelComp.insertAdjacentHTML("beforeend",'<a href="'+esc(hb)+'">Homebrew</a>');}
  else {brew.hidden=true;}
  // The selected system dresses the page, exactly as SiteNav publishes it.
  try{var r=document.documentElement;r.style.setProperty("--sys",e.a);if(!docSys)r.dataset.system=e.k;}catch(e2){}
}
paint();

var open=null,backdrop=null;
function shut(){
  if(backdrop){backdrop.remove();backdrop=null;}
  [[sysPop,sysBtn],[compPop,compBtn]].forEach(function(p){p[0].hidden=true;p[1].setAttribute("aria-expanded","false");});
  var pn=document.getElementById("dd-nav-panel");pn.hidden=true;
  document.getElementById("dd-nav-burger").setAttribute("aria-expanded","false");
  open=null;document.removeEventListener("keydown",onKey,true);
}
function show(which,pop,btn){
  if(open===which){shut();return;}
  shut();open=which;
  if(pop){pop.hidden=false;}
  if(btn){btn.setAttribute("aria-expanded","true");}
  backdrop=document.createElement("button");backdrop.className="nav-backdrop";backdrop.setAttribute("aria-hidden","true");backdrop.tabIndex=-1;
  backdrop.addEventListener("pointerdown",shut);nav.appendChild(backdrop);
  document.addEventListener("keydown",onKey,true);
}
function onKey(e){if(e.key==="Escape"){e.preventDefault();shut();}}

sysBtn.addEventListener("click",function(){show("system",sysPop,sysBtn);});
compBtn.addEventListener("click",function(){show("compendium",compPop,compBtn);});
document.getElementById("dd-nav-burger").addEventListener("click",function(){
  var pn=document.getElementById("dd-nav-panel");
  if(open==="mobile"){shut();return;}
  shut();open="mobile";pn.hidden=false;
  document.getElementById("dd-nav-burger").setAttribute("aria-expanded","true");
  document.addEventListener("keydown",onKey,true);
});

sysPop.addEventListener("click",function(e){
  var b=e.target.closest("button[data-k]");if(!b)return;
  var k=b.getAttribute("data-k");
  try{localStorage.setItem("dcw_system",k);localStorage.setItem("dcw_dash_view","characters");}catch(e2){}
  location.href="/dashboard";
});
nav.addEventListener("click",function(e){
  var b=e.target.closest("[data-view]");if(!b)return;
  try{localStorage.setItem("dcw_dash_view",b.getAttribute("data-view"));}catch(e2){}
  location.href="/dashboard";
});

// ONE notion of "current system", same as the mini-bar: opening a document for
// system X means you are in X, so the dashboard and the Next navbar follow when
// you go back.
if(docSys){try{localStorage.setItem("dcw_system",docSys);}catch(e2){}}

// The save-status contract. The sheets and the GM Screen both call
// window.__ddStatus(kind, text); it has to behave identically here or saving
// silently loses its indicator.
window.__ddStatus=function(kind,text){var el=document.getElementById("dd-status");if(!el)return;el.className=kind?("is-"+kind):"";el.textContent=text||"";if(kind==="saved"){clearTimeout(el._t);el._t=setTimeout(function(){if(el.className==="is-saved"){el.textContent="";el.className="";}},2500);}};
})();</script>`;

  return `${style}\n${markup}\n${js}`;
}
