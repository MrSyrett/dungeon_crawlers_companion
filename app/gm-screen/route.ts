import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loadToolTemplate } from "@/lib/tools";

const GM_TOOL = "gm-screen";

// The chrome bar injected at top of <body> — matches the style from lib/inject.ts
const CHROME = `<div id="dd-chrome" style="position:fixed;top:8px;left:8px;z-index:2147483647;display:flex;gap:10px;align-items:center;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="/dashboard" style="color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none">&larr; Home</a>
<span id="dd-status" style="color:#6f6f78"></span>
<a href="/gm-screen/clear" style="color:#6f6f78;font-size:9px;opacity:.5;text-decoration:none" title="Clear saved GM Screen state (use if page fails to load)">reset</a>
</div>`;

// Shim: loads the last-used board on startup, auto-saves on changes, and drives
// the save-then-reload dance when the GM switches campaigns.
const SHIM = `
<script>
(function () {
  var API = "/api/gm-screen";
  var timer = null, saving = false, dirty = false;
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
    fetch(API, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(r) { if (!r.ok) throw new Error(r.status); status("Saved"); })
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

    // Poll for state changes every 30s as a fallback
    setInterval(schedule, 30000);
  });

  // ── Campaign-switch hooks (called by the GM screen's campaign picker) ──

  // Save the current board right now, keyed by whatever campaign it currently
  // reflects. Returns a promise so the switch can wait for it before reloading.
  window.__ddFlushNow = function() {
    var data = getState();
    if (!data) return Promise.resolve();
    dirty = false;
    return fetch(API, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }).then(function() { status("Saved"); }).catch(function() {});
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

// Sound Library picker. The Music tool (init_music in the template) exposes
// `root._addLibraryTrack(label, url)`; this injects a "📚 Library" button into
// each Music section header and a modal that lists the admin Sound Library
// (/api/sounds, admin-only) with category filters + search. Picking a track
// drops it straight into that pane's Music list — no more re-pasting URLs.
// Non-admins get an empty list from the API, so the button simply shows an
// "empty library" state for them.
const LIBRARY_UI = `
<style>
#dd-lib-overlay{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:rgba(4,4,6,.66);backdrop-filter:blur(2px);font:400 14px/1.4 system-ui,sans-serif}
#dd-lib-overlay.open{display:flex}
#dd-lib-panel{width:min(560px,92vw);max-height:80vh;display:flex;flex-direction:column;background:#141419;border:1px solid #3a3a40;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.5);color:#e7e3d8;overflow:hidden}
.dd-lib-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid #2a2a30}
.dd-lib-title{font-weight:700;letter-spacing:.02em;white-space:nowrap}
.dd-lib-search{flex:1;min-width:0;background:#0e0e12;border:1px solid #3a3a40;border-radius:6px;color:#e7e3d8;padding:7px 10px;font:inherit}
.dd-lib-search:focus{outline:none;border-color:#c9a24b}
.dd-lib-iconbtn{background:transparent;border:1px solid #3a3a40;border-radius:6px;color:#b7b3a8;padding:6px 9px;cursor:pointer;line-height:1}
.dd-lib-iconbtn:hover{color:#e7e3d8;border-color:#6f6f78}
.dd-lib-cats{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px;border-bottom:1px solid #2a2a30}
.dd-lib-chip{background:#0e0e12;border:1px solid #3a3a40;border-radius:999px;color:#b7b3a8;padding:4px 11px;font-size:12px;cursor:pointer;white-space:nowrap}
.dd-lib-chip:hover{color:#e7e3d8}
.dd-lib-chip.active{background:rgba(201,162,75,.15);border-color:#c9a24b;color:#c9a24b}
.dd-lib-list{overflow:auto;padding:8px}
.dd-lib-row{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:7px;cursor:pointer}
.dd-lib-row:hover{background:#1e1e25}
.dd-lib-row .dd-lib-plus{font-size:16px;color:#c9a24b;width:18px;text-align:center}
.dd-lib-row .dd-lib-meta{min-width:0;flex:1}
.dd-lib-row .dd-lib-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dd-lib-row .dd-lib-cat{font-size:11px;color:#8a8a93;text-transform:uppercase;letter-spacing:.08em}
.dd-lib-row.added{background:rgba(201,162,75,.12)}
.dd-lib-row.added .dd-lib-plus{color:#6fbf73}
.dd-lib-empty{padding:26px 16px;text-align:center;color:#8a8a93;font-size:13px}
.dd-lib-empty a{color:#c9a24b}
</style>
<script>
(function(){
  var overlay=null, listEl=null, catsEl=null, searchEl=null, emptyEl=null;
  var currentRoot=null, cache=null, activeCat='__all__', query='';

  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function build(){
    overlay=document.createElement('div');
    overlay.id='dd-lib-overlay';
    overlay.innerHTML='<div id="dd-lib-panel">'
      +'<div class="dd-lib-head"><span class="dd-lib-title">📚 Sound Library</span>'
      +'<input class="dd-lib-search" type="text" placeholder="Search tracks…">'
      +'<button class="dd-lib-iconbtn dd-lib-refresh" title="Reload library">⟳</button>'
      +'<button class="dd-lib-iconbtn dd-lib-close" title="Close">✕</button></div>'
      +'<div class="dd-lib-cats"></div>'
      +'<div class="dd-lib-list"></div>'
      +'<div class="dd-lib-empty" style="display:none"></div></div>';
    document.body.appendChild(overlay);
    listEl=overlay.querySelector('.dd-lib-list');
    catsEl=overlay.querySelector('.dd-lib-cats');
    searchEl=overlay.querySelector('.dd-lib-search');
    emptyEl=overlay.querySelector('.dd-lib-empty');
    overlay.addEventListener('click',function(e){ if(e.target===overlay) close(); });
    overlay.querySelector('.dd-lib-close').addEventListener('click',close);
    overlay.querySelector('.dd-lib-refresh').addEventListener('click',function(){ cache=null; load(); });
    searchEl.addEventListener('input',function(){ query=searchEl.value.trim().toLowerCase(); render(); });
  }

  function open(root){
    currentRoot=root;
    if(!overlay) build();
    overlay.classList.add('open');
    searchEl.value=''; query='';
    setTimeout(function(){ try{ searchEl.focus(); }catch(e){} },30);
    if(cache) render(); else load();
  }
  function close(){ if(overlay) overlay.classList.remove('open'); }

  function load(){
    listEl.innerHTML=''; catsEl.innerHTML='';
    emptyEl.style.display='block'; emptyEl.textContent='Loading…';
    fetch('/api/sounds',{headers:{'accept':'application/json'}})
      .then(function(r){ return r.json(); })
      .then(function(d){ cache=(d&&d.sounds)||[]; render(); })
      .catch(function(){ emptyEl.style.display='block'; emptyEl.textContent='Could not load the library.'; });
  }

  function categories(){
    var set={}; (cache||[]).forEach(function(s){ set[s.category||'Uncategorized']=1; });
    return Object.keys(set).sort(function(a,b){ if(a==='Uncategorized')return 1; if(b==='Uncategorized')return -1; return a.localeCompare(b); });
  }

  function renderCats(){
    var cats=categories();
    var html='<button class="dd-lib-chip'+(activeCat==='__all__'?' active':'')+'" data-cat="__all__">All</button>';
    cats.forEach(function(c){ html+='<button class="dd-lib-chip'+(activeCat===c?' active':'')+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>'; });
    catsEl.innerHTML=html;
    Array.prototype.forEach.call(catsEl.querySelectorAll('.dd-lib-chip'),function(chip){
      chip.addEventListener('click',function(){ activeCat=chip.getAttribute('data-cat'); render(); });
    });
  }

  function render(){
    if(!cache) return;
    renderCats();
    if(!cache.length){
      listEl.innerHTML=''; emptyEl.style.display='block';
      emptyEl.innerHTML='Your Sound Library is empty. <a href="/admin/sounds" target="_blank" rel="noreferrer">Add tracks →</a>';
      return;
    }
    var items=cache.filter(function(s){
      if(activeCat!=='__all__' && (s.category||'Uncategorized')!==activeCat) return false;
      if(query && (s.label||'').toLowerCase().indexOf(query)<0 && (s.category||'').toLowerCase().indexOf(query)<0) return false;
      return true;
    });
    if(!items.length){ listEl.innerHTML=''; emptyEl.style.display='block'; emptyEl.textContent='No tracks match.'; return; }
    emptyEl.style.display='none';
    listEl.innerHTML='';
    items.forEach(function(s){
      var row=document.createElement('div');
      row.className='dd-lib-row';
      row.innerHTML='<span class="dd-lib-plus">＋</span><span class="dd-lib-meta"><div class="dd-lib-name">'+esc(s.label)+'</div><div class="dd-lib-cat">'+esc(s.category||'Uncategorized')+'</div></span>';
      row.addEventListener('click',function(){
        if(!currentRoot || typeof currentRoot._addLibraryTrack!=='function') return;
        if(currentRoot._addLibraryTrack(s.label, s.url)){
          row.classList.add('added');
          var plus=row.querySelector('.dd-lib-plus'); plus.textContent='✓';
          if(window.__ddScheduleSave) try{ window.__ddScheduleSave(); }catch(e){}
          setTimeout(function(){ row.classList.remove('added'); plus.textContent='＋'; },900);
        }
      });
      listEl.appendChild(row);
    });
  }

  // Add a "Library" button into every Music section header (existing + future).
  function injectButtons(scope){
    if(!scope || !scope.querySelectorAll) return;
    Array.prototype.forEach.call(scope.querySelectorAll('.mus-music-section .mus-sec-actions'),function(a){
      if(a.querySelector('.dd-lib-btn')) return;
      var b=document.createElement('button');
      b.type='button';
      b.className='btn small ghost dd-lib-btn';
      b.title='Add a track from your Sound Library';
      b.innerHTML='📚 Library';
      a.insertBefore(b,a.firstChild);
    });
  }

  function init(){
    injectButtons(document);
    var obs=new MutationObserver(function(muts){
      for(var i=0;i<muts.length;i++){
        var added=muts[i].addedNodes;
        for(var j=0;j<added.length;j++){ if(added[j].nodeType===1) injectButtons(added[j]); }
      }
    });
    obs.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',function(e){
      var btn=e.target && e.target.closest ? e.target.closest('.dd-lib-btn') : null;
      if(!btn) return;
      e.preventDefault();
      open(btn.closest('.mus-tool'));
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  }

  if(document.readyState==='loading') window.addEventListener('DOMContentLoaded',init); else init();
})();
</script>`;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Load the last-used board for this user (most recently updated), so opening
  // the GM Screen reopens the campaign you were last working in.
  const doc = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL },
    orderBy: { updatedAt: "desc" },
    select: { data: true },
  });

  const savedState = doc?.data ?? null;

  let html = await loadToolTemplate("gm_screen.html");

  // Inject saved state so the shim can restore it immediately on load
  const stateScript = savedState
    ? `<script>window.__gmInitialState__ = ${JSON.stringify(savedState).replace(/</g, "\\u003c")};</script>\n`
    : "";

  // Inject shim + state + Sound Library picker before </head>
  html = html.replace(/<\/head>/i, `${stateScript}${SHIM}\n${LIBRARY_UI}\n</head>`);

  // Inject chrome (← Home button) after <body>
  html = html.replace(/<body([^>]*)>/i, (m) => `${m}\n${CHROME}`);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache",
      "expires": "0",
    },
  });
}
