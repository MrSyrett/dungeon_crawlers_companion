/* DarkSpace — Starship panel. A ship is built like a Spacer: six Stats, HP =
   10 + CON mod, AC = 10 + DEX mod (or from ship armor), a Classification that
   grants System/Feature slots + a free component + an HP die + always-on
   Features + a level Talent table, plus installed components, weapons, armor
   and freeform upgrades. It levels with the crew.
   State lives in window._dsShipState and round-trips inside the character save
   (_sheet.ship, wired in the sheet's collectSheet/_applySDData). Requires
   window.DARKSPACE (sd-darkspace.js) and the sheet globals statToMod / fmtMod. */
(function(){
'use strict';

function ds(){ return window.DARKSPACE || {}; }
function shipData(){ return ds().ship || {}; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function mod(v){ var m=statToMod(v); return (m===null?0:m); }
function rollN(n){ return 1+Math.floor(Math.random()*n); }
function num(v){ var n=parseInt(v,10); return isNaN(n)?0:n; }

var BASE_SYSTEMS = ['Sublight Drive','Communications Array','Memory Bank'];

// ── Catalog lookups ──────────────────────────────────────────────────────
function compDef(name){ return (shipData().components||[]).find(function(c){return c.name===name;}) || null; }
function weaponDef(name){ return (shipData().weapons||[]).find(function(w){return w.name===name;}) || null; }
function armorDef(name){ return (shipData().armor||[]).find(function(a){return a.name===name;}) || null; }
function classDef(name){ return (shipData().classifications||[]).find(function(c){return c.name===name;}) || null; }
function curClass(){ return classDef(S().classification) || (shipData().classifications||[])[0] || null; }

// ── State ────────────────────────────────────────────────────────────────
function defaultShip(){
  var sh = {
    name:'', classification:'Explorer', level:1,
    stats:{ STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10 },
    hpCur:'', ac:'', budget:'',
    installed:[],           // { name, advanced:false, free:false, base:false }
    weapons:[],             // { name, free:false }
    armor:[],               // { name, free:false }
    extras:[],              // freeform advanced-tech / custom strings
    talentLog:[],           // rolled/chosen talent strings
    notes:''
  };
  BASE_SYSTEMS.forEach(function(n){ sh.installed.push({ name:n, advanced:false, free:false, base:true }); });
  return sh;
}

// Migrate an older-shape saved ship (freeform systems/features/components lists)
// into the current shape so old characters keep working.
function migrate(sh){
  if(!sh || typeof sh!=='object') return defaultShip();
  if(!Array.isArray(sh.installed)){
    var installed = [];
    var extras = [];
    function absorb(list){
      (list||[]).forEach(function(v){
        var name = String(v==null?'':v).trim();
        if(!name) return;
        if(compDef(name)) installed.push({ name:name, advanced:false, free:false, base:BASE_SYSTEMS.indexOf(name)>=0 });
        else extras.push(name);
      });
    }
    absorb(sh.systems); absorb(sh.features); absorb(sh.components);
    // Ensure the three base systems are present.
    BASE_SYSTEMS.forEach(function(n){ if(!installed.some(function(c){return c.name===n;})) installed.unshift({ name:n, advanced:false, free:false, base:true }); });
    sh.installed = installed;
    sh.extras = Array.isArray(sh.extras) ? sh.extras : extras;
    delete sh.systems; delete sh.features;
  }
  // Normalise entry shapes.
  sh.installed = (sh.installed||[]).map(function(c){ return typeof c==='string' ? {name:c,advanced:false,free:false,base:BASE_SYSTEMS.indexOf(c)>=0} : { name:c.name, advanced:!!c.advanced, free:!!c.free, base:!!c.base||BASE_SYSTEMS.indexOf(c.name)>=0 }; });
  sh.weapons = (sh.weapons||[]).map(function(w){ return typeof w==='string' ? {name:w,free:false} : {name:w.name,free:!!w.free}; });
  sh.armor   = (sh.armor||[]).map(function(a){ return typeof a==='string' ? {name:a,free:false} : {name:a.name,free:!!a.free}; });
  if(!Array.isArray(sh.extras)) sh.extras = [];
  if(!Array.isArray(sh.talentLog)) sh.talentLog = [];
  if(!sh.stats) sh.stats = { STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10 };
  if(sh.name==null) sh.name='';
  if(sh.notes==null) sh.notes='';
  if(!sh.classification) sh.classification='Explorer';
  if(!sh.level) sh.level=1;
  return sh;
}

function S(){
  if(!window._dsShipState) window._dsShipState = defaultShip();
  else window._dsShipState = migrate(window._dsShipState);
  return window._dsShipState;
}

// Exposed for collectSheet (authoritative snapshot) and load hook.
window.dsShipState = function(){ return window._dsShipState || null; };
window.dsShipLoaded = function(){
  var btn = document.getElementById('hdr-ship-btn');
  if(btn && typeof darkSpaceOn==='function') btn.style.display = darkSpaceOn() ? '' : 'none';
};

// ── Derived values ─────────────────────────────────────────────────────────
function shipHPMax(sh){ return 10 + mod(sh.stats.CON); }
function shipACAuto(sh){
  var dexMod = mod(sh.stats.DEX);
  var best = null;
  (sh.armor||[]).forEach(function(a){
    var row = armorDef(a.name); if(!row) return;
    var m = String(row.ac).match(/(\d+)/); if(!m) return;
    var n = parseInt(m[1],10); if(/DEX mod/i.test(row.ac)) n += dexMod;
    if(best===null || n>best) best = n;
  });
  return best===null ? (10 + dexMod) : best;
}
function slotCost(c){ return 1 + (c.advanced?1:0); }
function armorSystemSlots(sh){
  // Armor with the "System (S)" property counts as ship systems (e.g. Energy Shields S(1)).
  var n = 0;
  (sh.armor||[]).forEach(function(a){
    var row = armorDef(a.name); if(!row) return;
    var m = String(row.props).match(/S\((\d+)\)/); if(m) n += parseInt(m[1],10);
  });
  return n;
}
function slotUsage(sh){
  var sys=0, feat=0;
  (sh.installed||[]).forEach(function(c){
    var d = compDef(c.name); var t = d ? d.type : 'System';
    if(t==='Feature') feat += slotCost(c); else sys += slotCost(c);
  });
  sys += armorSystemSlots(sh);
  return { sys:sys, feat:feat };
}
function costTotals(sh){
  var build=0, maint=0;
  (sh.installed||[]).forEach(function(c){ var d=compDef(c.name); if(!d) return; if(!c.free) build += num(d.cost); maint += num(d.maint); });
  (sh.weapons||[]).forEach(function(w){ if(w.free) return; var d=weaponDef(w.name); if(d) build += num(d.cost); });
  (sh.armor||[]).forEach(function(a){ if(a.free) return; var d=armorDef(a.name); if(d) build += num(d.cost); });
  return { build:build, maint:maint };
}

// ── Routing (the Starship lives in the sheet's Ship tab) ──
function openDarkSpaceShip(){ S(); if(typeof setTab==='function'){ setTab('ship'); } else { renderShip(); } }
window.openDarkSpaceShip = openDarkSpaceShip;
function closeDarkSpaceShip(){ save(); }
window.closeDarkSpaceShip = closeDarkSpaceShip;
function save(){ try{ if(typeof _saveSheetNow==='function') _saveSheetNow(); }catch(e){} }

// ── Field setters (inline handlers run in global scope) ──
function shipSet(k,v){ S()[k]=v; save(); }                 window.dsShipSet = shipSet;
function shipSetStat(k,v){ var n=parseInt(v,10); if(!isNaN(n)) S().stats[k]=n; renderShip(); save(); } window.dsShipSetStat = shipSetStat;
function shipSetClass(v){ S().classification=v; renderShip(); save(); } window.dsShipSetClass = shipSetClass;
function shipRollStats(){ var s=S().stats; ['STR','DEX','CON','INT','WIS','CHA'].forEach(function(k){ s[k]=rollN(6)+rollN(6)+rollN(6); }); renderShip(); save(); } window.dsShipRollStats = shipRollStats;
function shipRollBudget(){ S().budget = String((rollN(10)+5)*1000); renderShip(); save(); } window.dsShipRollBudget = shipRollBudget;
function shipRecomputeAC(){ S().ac = String(shipACAuto(S())); renderShip(); save(); } window.dsShipRecomputeAC = shipRecomputeAC;

// ── Components ──
function shipAddComp(name){ if(!name) return; var d=compDef(name); if(!d) return; S().installed.push({ name:name, advanced:false, free:false, base:BASE_SYSTEMS.indexOf(name)>=0 }); renderShip(); save(); } window.dsShipAddComp = shipAddComp;
function shipDelComp(i){ var c=S().installed[i]; if(c&&c.base) return; S().installed.splice(i,1); renderShip(); save(); } window.dsShipDelComp = shipDelComp;
function shipToggleAdv(i){ var c=S().installed[i]; if(!c) return; var d=compDef(c.name); if(!d||!d.advanced) return; c.advanced=!c.advanced; renderShip(); save(); } window.dsShipToggleAdv = shipToggleAdv;
function shipToggleFree(i){ var c=S().installed[i]; if(!c) return; c.free=!c.free; renderShip(); save(); } window.dsShipToggleFree = shipToggleFree;

// Add the classification's free starting component to the correct list at no cost.
function shipAddFree(){
  var cls=curClass(); if(!cls) return;
  var raw=cls.freeComponent||'';
  // Handle "Weapons Array + 1 Light Weapon" style entries.
  var main=raw.split('+')[0].trim();
  var extraWeapon = /light weapon/i.test(raw) ? 'Projectile Cannon, Light' : null;
  if(compDef(main)){ S().installed.push({ name:main, advanced:false, free:true, base:false }); }
  else {
    // Free component names an armor plate (e.g. "Light Armor Plating").
    var am = (shipData().armor||[]).find(function(a){ return a.name.toLowerCase().indexOf('light')>=0 && /armor plating/i.test(raw); });
    if(am) S().armor.push({ name:am.name, free:true });
    else S().extras.push(raw);
  }
  if(extraWeapon && weaponDef(extraWeapon)) S().weapons.push({ name:extraWeapon, free:true });
  renderShip(); save();
} window.dsShipAddFree = shipAddFree;

// ── Weapons / armor ──
function shipAddWeapon(name){ if(name) S().weapons.push({name:name,free:false}); renderShip(); save(); } window.dsShipAddWeapon = shipAddWeapon;
function shipDelWeapon(i){ S().weapons.splice(i,1); renderShip(); save(); }   window.dsShipDelWeapon = shipDelWeapon;
function shipAddArmor(name){ if(name) S().armor.push({name:name,free:false}); renderShip(); save(); } window.dsShipAddArmor = shipAddArmor;
function shipDelArmor(i){ S().armor.splice(i,1); renderShip(); save(); }      window.dsShipDelArmor = shipDelArmor;

// ── Extras (freeform) / Talent log ──
function shipAddExtra(){ S().extras.push(''); renderShip(); save(); } window.dsShipAddExtra = shipAddExtra;
function shipSetExtra(i,v){ S().extras[i]=v; save(); }               window.dsShipSetExtra = shipSetExtra;
function shipDelExtra(i){ S().extras.splice(i,1); renderShip(); save(); } window.dsShipDelExtra = shipDelExtra;

function talentRowFor(cls,roll){
  var rows = cls.talents||[];
  for(var i=0;i<rows.length;i++){
    var r=String(rows[i].r);
    if(r.indexOf('-')>=0){ var p=r.split('-'); if(roll>=num(p[0]) && roll<=num(p[1])) return rows[i]; }
    else if(num(r)===roll) return rows[i];
  }
  return null;
}
function shipRollTalent(){
  var cls=curClass(); if(!cls) return;
  var roll=rollN(6)+rollN(6);
  var row=talentRowFor(cls,roll);
  S().talentLog.push('2d6='+roll+' → '+(row?row.text:'(no result)'));
  renderShip(); save();
} window.dsShipRollTalent = shipRollTalent;
function shipDelTalent(i){ S().talentLog.splice(i,1); renderShip(); save(); } window.dsShipDelTalent = shipDelTalent;

// Roll a ship weapon into the sheet's shared roll log (attack d20 + damage dice).
// The gunner adds their own attack bonus; the log shows the raw d20 and the
// weapon's damage. Uses the sheet globals (rollWithAdv / addLog) when present.
function shipRollWeapon(i){
  var w = S().weapons[i]; if(!w) return;
  var row = weaponDef(w.name) || {};
  var atk = (typeof window.rollWithAdv==='function') ? window.rollWithAdv(20) : { result: rollN(20) };
  var atkRoll = (atk && atk.result!=null) ? atk.result : rollN(20);
  var type = atkRoll===20 ? 'crit' : atkRoll===1 ? 'fumble' : 'normal';
  var atkBase = (atk && atk.detail) ? atk.detail : ('d20('+atkRoll+')');
  var resultStr, detailStr;
  var dm = String(row.dmg||'').match(/^(\d*)d(\d+)$/i);
  if(dm){
    var num = (parseInt(dm[1]||'1',10)) * (type==='crit'?2:1), sides=parseInt(dm[2],10);
    var rolls=[]; for(var k=0;k<num;k++) rolls.push(rollN(sides));
    var dtot=rolls.reduce(function(a,b){return a+b;},0);
    resultStr = 'Atk d20: '+atkRoll+'  |  Dmg: '+dtot;
    detailStr = atkBase+'  |  '+num+'d'+sides+'('+rolls.join('+')+')='+dtot+(type==='crit'?' ✷ crit — double dice':'');
  } else {
    resultStr = 'Atk d20: '+atkRoll+(row.dmg?'  |  '+row.dmg:'');
    detailStr = atkBase;
  }
  if(typeof window.addLog==='function'){
    window.addLog(w.name+' (ship)'+(atkRoll===20?' ★ NAT 20':atkRoll===1?' ✗ NAT 1':''), resultStr, detailStr, type);
  }
} window.dsShipRollWeapon = shipRollWeapon;

// ── Render ─────────────────────────────────────────────────────────────────
function renderShip(){
  var sh = S();
  var body = document.getElementById('dsship-body'); if(!body) return;
  var DSs = shipData();
  var cls = curClass();
  var fld = 'background:#0f0f0f;border:1px solid #16323d;color:#eee;font-family:Montserrat,sans-serif;font-size:12px;padding:6px 8px;border-radius:4px;box-sizing:border-box;';
  var lbl = 'font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;';
  var sect = 'font-family:Montserrat,sans-serif;font-size:11px;font-weight:900;letter-spacing:.08em;color:#8fd6ea;text-transform:uppercase;margin:16px 0 6px;border-bottom:1px solid #16323d;padding-bottom:3px;';
  var cyanBtn = 'background:#0d1a20;color:#6ac8df;border:1px solid #1a5a7a;border-radius:5px;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;padding:5px 10px;';
  var chip = 'display:inline-block;font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;letter-spacing:.05em;padding:1px 6px;border-radius:8px;text-transform:uppercase;';
  var h = '';

  // Name / Classification / Level
  h += '<div style="display:grid;grid-template-columns:2fr 1.3fr .7fr;gap:8px;">';
  h += '<div><div style="'+lbl+'">Ship Name</div><input value="'+esc(sh.name)+'" oninput="dsShipSet(\'name\',this.value)" placeholder="Ship name" style="'+fld+'width:100%;margin-top:3px;"></div>';
  h += '<div><div style="'+lbl+'">Classification</div><select onchange="dsShipSetClass(this.value)" style="'+fld+'width:100%;margin-top:3px;">'+
       (DSs.classifications||[]).map(function(c){ return '<option'+(sh.classification===c.name?' selected':'')+'>'+esc(c.name)+'</option>'; }).join('')+'</select></div>';
  h += '<div><div style="'+lbl+'">Level</div><input type="number" min="1" value="'+esc(sh.level)+'" oninput="dsShipSet(\'level\',parseInt(this.value)||1)" style="'+fld+'width:100%;margin-top:3px;"></div>';
  h += '</div>';

  // Classification card
  if(cls){
    h += '<div style="background:#0a1216;border:1px solid #16323d;border-radius:6px;padding:10px 12px;margin-top:10px;">';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-style:italic;color:#8fb6c4;margin-bottom:8px;">'+esc(cls.blurb)+'</div>';
    h += '<div style="display:flex;gap:14px;flex-wrap:wrap;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">'+
         '<span><b style="color:#6ac8df;">System slots:</b> '+cls.sysSlots+'</span>'+
         '<span><b style="color:#6ac8df;">Feature slots:</b> '+cls.featSlots+'</span>'+
         '<span><b style="color:#6ac8df;">HP die:</b> '+esc(cls.hpDie)+'</span>'+
         '<span><b style="color:#6ac8df;">Free component:</b> '+esc(cls.freeComponent)+' <button style="'+cyanBtn+'padding:2px 7px;margin-left:4px;" onclick="dsShipAddFree()">+ Add free</button></span>'+
         '</div>';
    // Always-on class features
    h += '<div style="margin-top:8px;">';
    (cls.features||[]).forEach(function(f){
      h += '<div style="margin-bottom:4px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;"><b style="color:#8fd6ea;">'+esc(f.name)+'.</b> <span style="color:#9fbecb;">'+esc(f.text)+'</span></div>';
    });
    h += '</div></div>';
  }

  // Stats
  h += '<div style="'+sect+'">Ship Stats <button style="'+cyanBtn+'float:right;margin-top:-3px;" onclick="dsShipRollStats()">🎲 Roll 3d6 ×6</button></div>';
  h += '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;">';
  ['STR','DEX','CON','INT','WIS','CHA'].forEach(function(k){
    h += '<div style="background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:6px 2px;text-align:center;">'+
      '<div style="'+lbl+'">'+k+'</div>'+
      '<input value="'+esc(sh.stats[k])+'" oninput="dsShipSetStat(\''+k+'\',this.value)" style="width:100%;background:transparent;border:none;color:#eee;text-align:center;font-family:Montserrat,sans-serif;font-size:18px;font-weight:900;outline:none;">'+
      '<div style="font-family:Montserrat,sans-serif;font-size:11px;color:#5a8595;">'+fmtMod(mod(sh.stats[k]))+'</div></div>';
  });
  h += '</div>';

  // HP / AC / Budget
  var hpMax = shipHPMax(sh);
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:8px;margin-top:10px;">';
  h += '<div><div style="'+lbl+'">HP (10 + CON)</div><div style="display:flex;gap:4px;align-items:center;margin-top:3px;">'+
       '<input value="'+esc(sh.hpCur!==''?sh.hpCur:hpMax)+'" oninput="dsShipSet(\'hpCur\',this.value)" style="'+fld+'width:50px;text-align:center;"> <span style="color:#5a8595;font-family:Montserrat,sans-serif;font-size:13px;">/ '+hpMax+'</span></div></div>';
  h += '<div><div style="'+lbl+'">AC</div><div style="display:flex;gap:4px;align-items:center;margin-top:3px;">'+
       '<input value="'+esc(sh.ac!==''?sh.ac:shipACAuto(sh))+'" oninput="dsShipSet(\'ac\',this.value)" style="'+fld+'width:50px;text-align:center;"> <button style="'+cyanBtn+'" onclick="dsShipRecomputeAC()" title="Recompute from DEX / armor">↻</button></div></div>';
  h += '<div><div style="'+lbl+'">Design Budget</div><div style="display:flex;gap:4px;align-items:center;margin-top:3px;">'+
       '<input value="'+esc(sh.budget)+'" oninput="dsShipSet(\'budget\',this.value)" placeholder="cr" style="'+fld+'width:90px;"> <button style="'+cyanBtn+'" onclick="dsShipRollBudget()">🎲 (1d10+5)×1000</button></div></div>';
  h += '</div>';

  // Slot + budget tracker
  var use = slotUsage(sh);
  var ct = costTotals(sh);
  var budget = num(sh.budget);
  var remain = budget - ct.build;
  function meterChip(label,used,max){
    var over = used>max;
    var bg = over ? '#3a1414' : '#0a1a12';
    var bd = over ? '#7a2a2a' : '#1a5a3a';
    var col = over ? '#ff9a9a' : '#7ae0b0';
    return '<span style="'+chip+'background:'+bg+';border:1px solid '+bd+';color:'+col+';">'+label+': '+used+' / '+max+'</span>';
  }
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px;">';
  h += meterChip('System slots', use.sys, cls?cls.sysSlots:0);
  h += meterChip('Feature slots', use.feat, cls?cls.featSlots:0);
  h += '<span style="'+chip+'background:#0d1a20;border:1px solid #1a5a7a;color:#6ac8df;">Build: '+ct.build.toLocaleString()+' cr</span>';
  h += '<span style="'+chip+'background:'+(remain<0?'#3a1414':'#0d1a20')+';border:1px solid '+(remain<0?'#7a2a2a':'#1a5a7a')+';color:'+(remain<0?'#ff9a9a':'#6ac8df')+';">Remaining: '+remain.toLocaleString()+' cr</span>';
  h += '<span style="'+chip+'background:#141a20;border:1px solid #2a3a4a;color:#9fbecb;">Upkeep: '+ct.maint.toLocaleString()+' cr/episode</span>';
  h += '</div>';

  // Installed components
  h += '<div style="'+sect+'">Systems &amp; Features (Components)</div>';
  h += '<div style="display:flex;gap:6px;margin-bottom:6px;"><select id="dsship-cpick" style="'+fld+'flex:1;"><option value="">— install a component —</option>'+
       (DSs.components||[]).map(function(c){ return '<option value="'+esc(c.name)+'">'+esc(c.name)+' ['+esc(c.type)+'] — '+num(c.cost).toLocaleString()+'cr'+(c.advanced?' · adv':'')+'</option>'; }).join('')+
       '</select><button style="'+cyanBtn+'" onclick="dsShipAddComp(document.getElementById(\'dsship-cpick\').value)">+ Install</button></div>';
  (sh.installed||[]).forEach(function(c,i){
    var d = compDef(c.name) || { type:'System', cost:0, maint:0, advanced:false, desc:'' };
    var typeCol = d.type==='Feature' ? '#c9a0ff' : '#6ac8df';
    h += '<div style="background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:6px 8px;margin-bottom:4px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">'+
      '<div style="display:flex;gap:8px;align-items:center;">'+
      '<span style="'+chip+'background:#12222a;border:1px solid #1a4a5a;color:'+typeCol+';">'+esc(d.type)+'</span>'+
      '<b style="flex:1;">'+esc(c.name)+(c.base?' <span style="color:#5a8595;font-weight:400;">(base)</span>':'')+'</b>'+
      '<span style="color:#5a8595;">'+(c.free?'free':num(d.cost).toLocaleString()+'cr')+' · '+slotCost(c)+' slot'+(slotCost(c)>1?'s':'')+'</span>'+
      (d.advanced?'<button style="'+cyanBtn+(c.advanced?'background:#12303a;color:#8fe0ff;':'')+'padding:3px 7px;" onclick="dsShipToggleAdv('+i+')" title="Advanced: +1 slot, grants advantage on this system">Adv</button>':'')+
      '<button style="'+cyanBtn+(c.free?'background:#0a1a12;color:#7ae0b0;':'')+'padding:3px 7px;" onclick="dsShipToggleFree('+i+')" title="Toggle free (does not count against budget)">Free</button>'+
      (c.base?'':'<button style="'+cyanBtn+'" onclick="dsShipDelComp('+i+')">✕</button>')+
      '</div>'+
      (d.desc?'<div style="color:#7f9eab;margin-top:3px;font-size:10px;">'+esc(d.desc)+(d.costNote?' <i style="color:#5a8595;">('+esc(d.costNote)+')</i>':'')+'</div>':'')+
      '</div>';
  });

  // Weapons
  h += '<div style="'+sect+'">Weapons</div>';
  h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#5a8595;margin-bottom:4px;">Weapons live in a Weapons Array (up to 4). Property key: '+
       Object.keys(DSs.weaponProps||{}).map(function(k){return '<b style="color:#8fd6ea;">'+esc(k)+'</b>';}).join(', ')+'.</div>';
  h += '<div style="display:flex;gap:6px;margin-bottom:6px;"><select id="dsship-wpick" style="'+fld+'flex:1;"><option value="">— add a ship weapon —</option>'+
       (DSs.weapons||[]).map(function(w){ return '<option value="'+esc(w.name)+'">'+esc(w.name)+' ('+esc(w.range)+', '+esc(w.dmg)+', '+esc(w.props)+') — '+w.cost+'cr</option>'; }).join('')+
       '</select><button style="'+cyanBtn+'" onclick="dsShipAddWeapon(document.getElementById(\'dsship-wpick\').value)">+ Add</button></div>';
  (sh.weapons||[]).forEach(function(w,i){
    var row=weaponDef(w.name)||{};
    h += '<div style="display:flex;gap:8px;align-items:center;background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:5px 8px;margin-bottom:4px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">'+
      '<b style="flex:1;">'+esc(w.name)+(w.free?' <span style="color:#7ae0b0;font-weight:400;">(free)</span>':'')+'</b><span style="color:#5a8595;">'+esc(row.range||'')+' · '+esc(row.dmg||'')+' · '+esc(row.props||'')+'</span>'+
      '<button style="'+cyanBtn+'" onclick="dsShipRollWeapon('+i+')" title="Roll attack + damage into the log">🎲</button>'+
      '<button style="'+cyanBtn+'" onclick="dsShipDelWeapon('+i+')">✕</button></div>';
  });

  // Armor
  h += '<div style="'+sect+'">Armor &amp; Shields</div>';
  h += '<div style="display:flex;gap:6px;margin-bottom:6px;"><select id="dsship-apick" style="'+fld+'flex:1;"><option value="">— add ship armor —</option>'+
       (DSs.armor||[]).map(function(a){ return '<option value="'+esc(a.name)+'">'+esc(a.name)+' (AC '+esc(a.ac)+', '+esc(a.props)+') — '+a.cost+'cr</option>'; }).join('')+
       '</select><button style="'+cyanBtn+'" onclick="dsShipAddArmor(document.getElementById(\'dsship-apick\').value)">+ Add</button></div>';
  (sh.armor||[]).forEach(function(a,i){
    var row=armorDef(a.name)||{};
    h += '<div style="display:flex;gap:8px;align-items:center;background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:5px 8px;margin-bottom:4px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">'+
      '<b style="flex:1;">'+esc(a.name)+(a.free?' <span style="color:#7ae0b0;font-weight:400;">(free)</span>':'')+'</b><span style="color:#5a8595;">AC '+esc(row.ac||'')+' · '+esc(row.props||'')+'</span>'+
      '<button style="'+cyanBtn+'" onclick="dsShipDelArmor('+i+')">✕</button></div>';
  });

  // Class talents (level table) + log
  if(cls){
    h += '<div style="'+sect+'">'+esc(cls.name)+' Talents (2d6) <button style="'+cyanBtn+'float:right;margin-top:-3px;" onclick="dsShipRollTalent()">🎲 Roll Talent</button></div>';
    h += '<table style="width:100%;border-collapse:collapse;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">';
    (cls.talents||[]).forEach(function(t){
      h += '<tr><td style="width:52px;padding:3px 6px;color:#6ac8df;font-weight:800;border-bottom:1px solid #12222a;vertical-align:top;">'+esc(t.r)+'</td><td style="padding:3px 6px;border-bottom:1px solid #12222a;color:#9fbecb;">'+esc(t.text)+'</td></tr>';
    });
    h += '</table>';
    if((sh.talentLog||[]).length){
      h += '<div style="margin-top:6px;">';
      (sh.talentLog||[]).forEach(function(v,i){
        h += '<div style="display:flex;gap:6px;align-items:center;margin-bottom:3px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:4px 8px;"><span style="flex:1;">'+esc(v)+'</span><button style="'+cyanBtn+'" onclick="dsShipDelTalent('+i+')">✕</button></div>';
      });
      h += '</div>';
    }
  }

  // Extras (freeform advanced tech / custom)
  h += '<div style="'+sect+'">Advanced Tech / Custom <button style="'+cyanBtn+'float:right;margin-top:-3px;" onclick="dsShipAddExtra()">+ Add</button></div>';
  (sh.extras||[]).forEach(function(v,i){
    h += '<div style="display:flex;gap:6px;margin-bottom:4px;"><input value="'+esc(v)+'" oninput="dsShipSetExtra('+i+',this.value)" placeholder="e.g. Blink Drive, Encrypted Datastream" style="'+fld+'flex:1;"><button style="'+cyanBtn+'" onclick="dsShipDelExtra('+i+')">✕</button></div>';
  });
  if(!(sh.extras||[]).length) h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#3a5560;font-style:italic;">None yet.</div>';

  // Notes
  h += '<div style="'+sect+'">Notes</div>';
  h += '<textarea oninput="dsShipSet(\'notes\',this.value)" rows="3" placeholder="Crew, cargo, history…" style="'+fld+'width:100%;resize:vertical;">'+esc(sh.notes)+'</textarea>';

  body.innerHTML = h;
}
window.renderShip = renderShip;

})();
