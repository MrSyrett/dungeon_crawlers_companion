/* SHEET SETTINGS — the ⚙ button in every character sheet's roll-log header.
   Opens a pop-up (styled like the 🎲 dice-animation pop-up) with the sheet's
   switches: the sheet lock, the automations a player may want off (turn-based
   actions, auto-use of consumables, encumbrance penalties, auto-calculated stats,
   light & timers, automatic prompts, auto-spent resources) and the compact
   roll log.

   A sheet lists its own switches; this file only draws them. Before or after
   this script loads, the sheet sets:

     window.SHEET_SETTINGS = function(){ return [
       { key:'lock', group:'sheet', label:'Lock the sheet', hint:'Fields read-only; rolling still works',
         get:function(){ return locked; }, set:function(on){ ... } },
       { key:'turn', group:'auto', label:'Turn-based actions', hint:'…', get:…, set:… },
       …
     ]; };

   group: 'sheet' (top) · 'auto' (Automation) · 'log' (Roll log). 'auto' items are greyed out
   in Manual mode (the lock off), when nothing is automated anyway. An item may
   have show() → false to hide it (e.g. a rule that doesn't apply right now).
   get/set belong to the sheet, which saves the value with the character.

   The "Compact roll log" switch is built in: it toggles body.log-compact and is
   remembered on this device (localStorage dd_log_compact). Each sheet's CSS says
   what it hides, e.g. body.log-compact .log-entry .log-detail{display:none}.

   The lock switch is built in too: every sheet shares the same lock script
   (window.toggleSheetLock / window._sheetLocked), so it is added automatically
   unless the sheet lists its own item with key 'lock'.

   Call SheetSettings.refresh() after the sheet changes a value itself (e.g. on
   load) so an open pop-up shows it.

   sheetToast(text) shows a short note at the bottom of the sheet — for messages
   that don't belong in the roll log ("Not enough WP", "Unlock the sheet first"). */
(function(){
  'use strict';
  if (window.SheetSettings && window.SheetSettings._v) return;
  var LS_COMPACT = 'dd_log_compact';
  function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }

  // compact roll log: applied as soon as the body exists
  function applyCompact(){ if(document.body) document.body.classList.toggle('log-compact', lsGet(LS_COMPACT)==='1'); }

  var css = ''
    + '.ss-gear{width:26px;height:22px;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid #3a3a3a;border-radius:5px;color:#aaa;cursor:pointer;font-size:14px;line-height:1;padding:0;flex:none;}'
    + '.ss-gear:hover,.ss-gear[aria-expanded="true"]{color:#e8c84a;border-color:#e8c84a;}'
    + '.ss-gear.ss-locked::after{content:"";width:7px;height:7px;border-radius:50%;background:#e0614f;box-shadow:0 0 0 1.5px #111;margin-left:-4px;margin-top:-12px;}'
    + '.ss-pop{position:fixed;z-index:2147483100;background:#17181d;border:1px solid #3a3d47;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.6);padding:14px;width:290px;max-width:calc(100vw - 16px);max-height:calc(100vh - 16px);overflow-y:auto;font-family:system-ui,sans-serif;color:#e8e6df;}'
    + '.ss-pop h4{margin:0 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a8f98;font-weight:700;}'
    + '.ss-pop h5{margin:12px 0 2px;padding-top:10px;border-top:1px solid #2a2d35;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#6f7580;font-weight:700;}'
    + '.ss-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 0;cursor:pointer;}'
    + '.ss-row .ss-t{display:flex;flex-direction:column;gap:2px;min-width:0;}'
    + '.ss-row .k{font-size:12.5px;color:#e2dfd7;}'
    + '.ss-row .h{font-size:10.5px;color:#7d828c;line-height:1.35;}'
    + '.ss-sw{position:relative;width:42px;height:23px;flex:none;cursor:pointer;background:#2a2f3a;border:1px solid #444;border-radius:999px;transition:.18s;padding:0;}'
    + '.ss-sw[aria-checked="true"]{background:rgba(232,200,74,.28);border-color:#e8c84a;}'
    + '.ss-sw::after{content:"";position:absolute;top:2px;left:2px;width:17px;height:17px;border-radius:50%;background:#7c8494;transition:.18s;}'
    + '.ss-sw[aria-checked="true"]::after{left:22px;background:#e8c84a;}'
    + '.ss-sw:focus-visible{outline:2px solid #e8c84a;outline-offset:2px;}'
    + '.ss-row.ss-off{opacity:.42;cursor:default;} .ss-row.ss-off .ss-sw{cursor:default;}'
    + '.ss-note{font-size:10.5px;line-height:1.35;color:#c9a14a;margin:2px 0 4px;}'
    + '.ss-light .ss-note{color:#8a6a1f;}'
    + '.ss-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(8px);z-index:2147483101;background:#17181d;color:#e8e6df;border:1px solid #3a3d47;border-radius:9px;padding:8px 14px;font:13px/1.35 system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.5);opacity:0;transition:opacity .18s,transform .18s;pointer-events:none;max-width:min(92vw,420px);text-align:center;}'
    + '.ss-toast.ss-light{background:#fbfaf7;color:#2a2722;border-color:#d6d2c8;box-shadow:0 8px 28px rgba(0,0,0,.18);}'
    + '.ss-toast.on{opacity:1;transform:translateX(-50%) translateY(0);}'
    // light mode: the site preference (dd_theme / <html data-mode>) — sheets differ in how they mark it, so the script sets .ss-light
    + '.ss-pop.ss-light{background:#fbfaf7;border-color:#d6d2c8;color:#2a2722;box-shadow:0 12px 40px rgba(0,0,0,.18);}'
    + '.ss-pop.ss-light .k{color:#2a2722;}'
    + '.ss-pop.ss-light .h{color:#6f6a60;}'
    + '.ss-pop.ss-light h5{border-color:#e4e0d6;}'
    + '.ss-light .ss-sw{background:#e4e0d6;border-color:#c8c3b8;}'
    + '.ss-light .ss-sw[aria-checked="true"]{background:rgba(176,138,26,.25);border-color:#b08a1a;}'
    + '.ss-light .ss-sw[aria-checked="true"]::after{background:#b08a1a;}';
  function addCss(){ if(document.getElementById('ss-css')) return; var st=document.createElement('style'); st.id='ss-css'; st.textContent=css; (document.head||document.documentElement).appendChild(st); }

  function items(){
    var src = window.SHEET_SETTINGS; var list = [];
    try { list = typeof src === 'function' ? (src() || []) : (Array.isArray(src) ? src : []); } catch(e){ list = []; }
    if (typeof window.toggleSheetLock === 'function' && !list.some(function(it){ return it && it.key==='lock'; }))
      list.unshift({ key:'lock', group:'sheet', label:'Auto mode', hint:'On: fields locked, the sheet runs the rules. Off (Manual): everything editable, nothing automated',
        get:function(){ return !!window._sheetLocked; },
        set:function(on){ if(!!window._sheetLocked !== !!on) window.toggleSheetLock(); } });
    list = list.filter(function(it){ try { return it && it.key && (!it.show || it.show()); } catch(e){ return false; } });
    list.push({ key:'compact', group:'log', label:'Compact roll log', hint:'Hide the dice math under each result',
      get:function(){ return lsGet(LS_COMPACT)==='1'; },
      set:function(on){ lsSet(LS_COMPACT, on?'1':'0'); applyCompact(); } });
    return list;
  }
  var GROUPS = [['sheet',''],['auto','Automation'],['log','Roll log']];
  var pop=null, gear=null, cur=[];
  function isLight(){ try{ var m=document.documentElement.getAttribute('data-mode'); if(m) return m==='light'; return localStorage.getItem('dd_theme')==='light'; }catch(e){ return false; } }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function draw(){
    cur = items(); var h='<h4>Sheet Settings</h4>';
    GROUPS.forEach(function(g){ var rows=cur.filter(function(it){ return (it.group||'auto')===g[0]; }); if(!rows.length) return;
      if(g[1]) h+='<h5>'+g[1]+'</h5>';
      var manual=g[0]==='auto'&&!sheetAuto();
      if(manual) h+='<div class="ss-note">Manual mode: nothing is automated. Turn Auto mode on to use these.</div>';
      rows.forEach(function(it){ var i=cur.indexOf(it), on=false; try{ on=!!it.get(); }catch(e){}
        h+='<div class="ss-row'+(manual?' ss-off':'')+'" data-i="'+i+'"'+(manual?' aria-disabled="true"':'')+'><span class="ss-t"><span class="k" id="ss-k-'+i+'">'+esc(it.label)+'</span>'+(it.hint?'<span class="h">'+esc(it.hint)+'</span>':'')+'</span>'
          +'<button type="button" class="ss-sw" role="switch" aria-checked="'+(on&&!manual)+'" aria-labelledby="ss-k-'+i+'" data-i="'+i+'"'+(manual?' disabled':'')+'></button></div>'; }); });
    pop.innerHTML=h; }
  function flip(i){ var it=cur[i]; if(!it) return; if((it.group||'auto')==='auto'&&!sheetAuto()) return; var on=false; try{ on=!!it.get(); }catch(e){}
    try{ it.set(!on); }catch(e){ if(window.console) console.error('[sheet-settings] '+it.key, e); }
    refresh(); }
  function build(){ addCss(); pop=document.createElement('div'); pop.className='ss-pop'; pop.style.display='none'; pop.setAttribute('role','dialog'); pop.setAttribute('aria-label','Sheet settings');
    pop.addEventListener('click',function(e){ var r=e.target.closest('.ss-row'); if(r) flip(+r.dataset.i); });
    document.body.appendChild(pop); }
  function place(){ var r=gear.getBoundingClientRect(); var top=r.bottom+6, left=Math.min(r.right-pop.offsetWidth, window.innerWidth-pop.offsetWidth-8);
    if(top+pop.offsetHeight>window.innerHeight-8) top=Math.max(8, r.top-pop.offsetHeight-6);
    pop.style.top=top+'px'; pop.style.left=Math.max(8,left)+'px'; }
  function open(){ if(!pop) build(); pop.classList.toggle('ss-light', isLight()); draw(); pop.style.display='block'; place(); gear.setAttribute('aria-expanded','true');
    document.addEventListener('keydown', onKey);   // Escape works straight away
    setTimeout(function(){ document.addEventListener('mousedown', outside); },0);
    var f=pop.querySelector('.ss-sw'); if(f) f.focus({preventScroll:true}); }
  function close(){ if(pop) pop.style.display='none'; if(gear) gear.setAttribute('aria-expanded','false'); document.removeEventListener('mousedown', outside); document.removeEventListener('keydown', onKey); }
  function outside(e){ if(pop && !pop.contains(e.target) && !(gear && gear.contains(e.target))) close(); }
  function onKey(e){ if(e.key==='Escape'){ close(); if(gear) gear.focus(); } }
  function refresh(){ if(pop && pop.style.display!=='none'){ draw(); place(); } markLock(); }
  // AUTO / MANUAL: the lock is the sheet's mode. Locked = Auto (the sheet runs the rules);
  // unlocked = Manual (everything editable, nothing automated). A sheet with its own lock
  // can define window.sheetAuto() itself; otherwise it follows window._sheetLocked.
  function sheetAuto(){ try{ if(typeof window.sheetAuto==='function'&&window.sheetAuto!==defAuto) return !!window.sheetAuto(); }catch(e){} return !!window._sheetLocked; }
  function defAuto(){ return !!window._sheetLocked; }
  if(typeof window.sheetAuto!=='function') window.sheetAuto=defAuto;
  // a small dot on the ⚙ in Manual mode, so the unusual state stays visible
  function markLock(){ if(!gear) return; var manual=!sheetAuto();
    gear.classList.toggle('ss-locked', manual); gear.title = 'Sheet settings — ' + (manual ? 'Manual mode' : 'Auto mode'); }
  // tell the sheet when the mode changes ('sheetmode' event, detail.auto) so it can drop or seed hand-typed numbers
  var lastMode=null;
  function modeChanged(){ var a=sheetAuto(); if(lastMode===null){ lastMode=a; return; } if(a!==lastMode){ lastMode=a; try{ document.dispatchEvent(new CustomEvent('sheetmode',{detail:{auto:a}})); }catch(e){} } }
  function mount(){ applyCompact(); hookLock(); var host=document.querySelector('.log-header'); if(!host || host.querySelector('.ss-gear')) return;
    addCss(); gear=document.createElement('button'); gear.type='button'; gear.className='ss-gear'; gear.textContent='⚙'; gear.setAttribute('aria-label','Sheet settings'); gear.setAttribute('aria-haspopup','dialog'); gear.setAttribute('aria-expanded','false'); gear.title='Sheet settings';
    gear.addEventListener('click',function(e){ e.preventDefault(); if(pop&&pop.style.display!=='none') close(); else open(); });
    // order: Roll Log · VTT · ⚙ · 🎲 · ✕ — before the dice button if it's there, else before the ✕
    var anchor=host.querySelector('.da-gear'); if(!anchor){ var cl=host.querySelectorAll('.log-clear'); anchor=cl.length?cl[cl.length-1]:null; }
    if(anchor && anchor.parentNode) anchor.parentNode.insertBefore(gear, anchor); else host.appendChild(gear);
    markLock(); }
  var toastEl=null, toastT=null;
  function toast(t){ if(!document.body) return; addCss(); if(!toastEl){ toastEl=document.createElement('div'); toastEl.className='ss-toast'; toastEl.setAttribute('role','status'); toastEl.setAttribute('aria-live','polite'); document.body.appendChild(toastEl); }
    toastEl.classList.toggle('ss-light', isLight()); toastEl.textContent=String(t||''); toastEl.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(function(){ toastEl.classList.remove('on'); },2800); }
  window.sheetToast = toast;
  // the lock can change from elsewhere (the GM, a sheet shortcut): keep the ⚙ dot in step
  function hookLock(){ var f=window.applySheetLock; if(typeof f!=='function'||f._ss) return; var w=function(){ var r=f.apply(this,arguments); try{ modeChanged(); refresh(); }catch(e){} return r; }; w._ss=true; window.applySheetLock=w; }
  window.SheetSettings = { _v:1, toast:toast, modeChanged:function(){ modeChanged(); refresh(); }, refresh:refresh, open:function(){ if(gear) open(); }, close:close, mount:mount };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ mount(); setTimeout(markLock,0); });
  else { mount(); setTimeout(markLock,0); }
  window.addEventListener('load', function(){ hookLock(); setTimeout(markLock,400); });
})();
