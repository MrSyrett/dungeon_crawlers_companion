/* DarkSpace — Starship panel. A ship is built like a Spacer: six Stats, HP =
   10 + CON mod, AC = 10 + DEX mod (or from ship armor), a Classification, System
   and Feature slots, ship weapons/armor/components, and it levels with the crew.
   State lives in window._dsShipState and round-trips inside the character save
   (_sheet.ship, wired in the sheet's collectSheet/_applySDData). Requires
   window.DARKSPACE (sd-darkspace.js) and the sheet globals statToMod / fmtMod. */
(function(){
'use strict';

function ds(){ return window.DARKSPACE || {}; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function mod(v){ var m=statToMod(v); return (m===null?0:m); }
function rollN(n){ return 1+Math.floor(Math.random()*n); }

function defaultShip(){
  return {
    name:'', classification:'Explorer', level:1,
    stats:{ STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10 },
    hpCur:'', ac:'', budget:'',
    systems:['Sublight Drive','Communications Array','Memory Bank'],
    features:[],
    weapons:[], armor:[], components:[],
    notes:''
  };
}
function S(){ if(!window._dsShipState) window._dsShipState = defaultShip(); return window._dsShipState; }

// Exposed for collectSheet (authoritative snapshot) and load hook.
window.dsShipState = function(){ return window._dsShipState || null; };
window.dsShipLoaded = function(){
  var btn = document.getElementById('hdr-ship-btn');
  if(btn && typeof darkSpaceOn==='function') btn.style.display = darkSpaceOn() ? '' : 'none';
};

function shipHPMax(sh){ return 10 + mod(sh.stats.CON); }
function shipACAuto(sh){
  // Best ship armor AC, else 10 + DEX mod.
  var dexMod = mod(sh.stats.DEX);
  var best = null;
  (sh.armor||[]).forEach(function(a){
    var row = (ds().ship&&ds().ship.armor||[]).find(function(x){return x.name===a.name;});
    if(!row) return;
    var m = String(row.ac).match(/(\d+)/); if(!m) return;
    var n = parseInt(m[1],10); if(/DEX mod/i.test(row.ac)) n += dexMod;
    if(best===null || n>best) best = n;
  });
  return best===null ? (10 + dexMod) : best;
}

function openDarkSpaceShip(){ S(); document.getElementById('dsship-overlay').style.display='flex'; renderShip(); }
window.openDarkSpaceShip = openDarkSpaceShip;
function closeDarkSpaceShip(){ document.getElementById('dsship-overlay').style.display='none'; save(); }
window.closeDarkSpaceShip = closeDarkSpaceShip;
function save(){ try{ if(typeof _saveSheetNow==='function') _saveSheetNow(); }catch(e){} }

// ── Field setters (inline handlers run in global scope) ──
function shipSet(k,v){ S()[k]=v; }                 window.dsShipSet = shipSet;
function shipSetStat(k,v){ var n=parseInt(v,10); if(!isNaN(n)) S().stats[k]=n; renderShip(); } window.dsShipSetStat = shipSetStat;
function shipSetClass(v){ S().classification=v; } window.dsShipSetClass = shipSetClass;
function shipRollStats(){ var s=S().stats; ['STR','DEX','CON','INT','WIS','CHA'].forEach(function(k){ s[k]=rollN(6)+rollN(6)+rollN(6); }); renderShip(); } window.dsShipRollStats = shipRollStats;
function shipRollBudget(){ S().budget = String((rollN(10)+5)*1000); renderShip(); } window.dsShipRollBudget = shipRollBudget;
function shipRecomputeAC(){ S().ac = String(shipACAuto(S())); renderShip(); } window.dsShipRecomputeAC = shipRecomputeAC;

// ── List helpers (systems / features / components are freeform strings) ──
function shipAddList(which){ S()[which].push(''); renderShip(); } window.dsShipAddList = shipAddList;
function shipSetList(which,i,v){ S()[which][i]=v; }                 window.dsShipSetList = shipSetList;
function shipDelList(which,i){ S()[which].splice(i,1); renderShip(); } window.dsShipDelList = shipDelList;

// ── Weapons / armor picked from the DarkSpace ship catalog ──
function shipAddWeapon(name){ if(name) S().weapons.push({name:name}); renderShip(); } window.dsShipAddWeapon = shipAddWeapon;
function shipDelWeapon(i){ S().weapons.splice(i,1); renderShip(); }   window.dsShipDelWeapon = shipDelWeapon;
function shipAddArmor(name){ if(name) S().armor.push({name:name}); renderShip(); } window.dsShipAddArmor = shipAddArmor;
function shipDelArmor(i){ S().armor.splice(i,1); renderShip(); }      window.dsShipDelArmor = shipDelArmor;

function renderShip(){
  var sh = S();
  var body = document.getElementById('dsship-body'); if(!body) return;
  var DSs = ds().ship || {};
  var fld = 'background:#0f0f0f;border:1px solid #16323d;color:#eee;font-family:Montserrat,sans-serif;font-size:12px;padding:6px 8px;border-radius:4px;box-sizing:border-box;';
  var lbl = 'font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;';
  var sect = 'font-family:Montserrat,sans-serif;font-size:11px;font-weight:900;letter-spacing:.08em;color:#8fd6ea;text-transform:uppercase;margin:16px 0 6px;border-bottom:1px solid #16323d;padding-bottom:3px;';
  var cyanBtn = 'background:#0d1a20;color:#6ac8df;border:1px solid #1a5a7a;border-radius:5px;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;padding:5px 10px;';
  var h = '';

  // Name / Classification / Level
  h += '<div style="display:grid;grid-template-columns:2fr 1.3fr .7fr;gap:8px;">';
  h += '<div><div style="'+lbl+'">Ship Name</div><input value="'+esc(sh.name)+'" oninput="dsShipSet(\'name\',this.value)" placeholder="Ship name" style="'+fld+'width:100%;margin-top:3px;"></div>';
  h += '<div><div style="'+lbl+'">Classification</div><select onchange="dsShipSetClass(this.value)" style="'+fld+'width:100%;margin-top:3px;">'+
       (DSs.classes||[]).map(function(c){ return '<option'+(sh.classification===c?' selected':'')+'>'+esc(c)+'</option>'; }).join('')+'</select></div>';
  h += '<div><div style="'+lbl+'">Level</div><input type="number" min="1" value="'+esc(sh.level)+'" oninput="dsShipSet(\'level\',parseInt(this.value)||1)" style="'+fld+'width:100%;margin-top:3px;"></div>';
  h += '</div>';

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

  // Systems + Features (freeform lists)
  [['systems','System Slots','Base: Sublight Drive, Communications Array, Memory Bank'],
   ['features','Feature Slots','']].forEach(function(pair){
    var which=pair[0], title=pair[1], hint=pair[2];
    h += '<div style="'+sect+'">'+title+' <button style="'+cyanBtn+'float:right;margin-top:-3px;" onclick="dsShipAddList(\''+which+'\')">+ Add</button></div>';
    if(hint) h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#5a8595;margin-bottom:4px;">'+esc(hint)+'</div>';
    (sh[which]||[]).forEach(function(v,i){
      h += '<div style="display:flex;gap:6px;margin-bottom:4px;"><input value="'+esc(v)+'" oninput="dsShipSetList(\''+which+'\','+i+',this.value)" style="'+fld+'flex:1;"><button style="'+cyanBtn+'" onclick="dsShipDelList(\''+which+'\','+i+')">✕</button></div>';
    });
    if(!(sh[which]||[]).length) h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#3a5560;font-style:italic;">None yet.</div>';
  });

  // Weapons
  h += '<div style="'+sect+'">Weapons</div>';
  h += '<div style="display:flex;gap:6px;margin-bottom:6px;"><select id="dsship-wpick" style="'+fld+'flex:1;"><option value="">— add a ship weapon —</option>'+
       (DSs.weapons||[]).map(function(w){ return '<option value="'+esc(w.name)+'">'+esc(w.name)+' ('+esc(w.range)+', '+esc(w.dmg)+', '+esc(w.props)+') — '+w.cost+'cr</option>'; }).join('')+
       '</select><button style="'+cyanBtn+'" onclick="dsShipAddWeapon(document.getElementById(\'dsship-wpick\').value)">+ Add</button></div>';
  (sh.weapons||[]).forEach(function(w,i){
    var row=(DSs.weapons||[]).find(function(x){return x.name===w.name;})||{};
    h += '<div style="display:flex;gap:8px;align-items:center;background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:5px 8px;margin-bottom:4px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">'+
      '<b style="flex:1;">'+esc(w.name)+'</b><span style="color:#5a8595;">'+esc(row.range||'')+' · '+esc(row.dmg||'')+' · '+esc(row.props||'')+'</span>'+
      '<button style="'+cyanBtn+'" onclick="dsShipDelWeapon('+i+')">✕</button></div>';
  });

  // Armor
  h += '<div style="'+sect+'">Armor &amp; Shields</div>';
  h += '<div style="display:flex;gap:6px;margin-bottom:6px;"><select id="dsship-apick" style="'+fld+'flex:1;"><option value="">— add ship armor —</option>'+
       (DSs.armor||[]).map(function(a){ return '<option value="'+esc(a.name)+'">'+esc(a.name)+' (AC '+esc(a.ac)+', '+esc(a.props)+') — '+a.cost+'cr</option>'; }).join('')+
       '</select><button style="'+cyanBtn+'" onclick="dsShipAddArmor(document.getElementById(\'dsship-apick\').value)">+ Add</button></div>';
  (sh.armor||[]).forEach(function(a,i){
    var row=(DSs.armor||[]).find(function(x){return x.name===a.name;})||{};
    h += '<div style="display:flex;gap:8px;align-items:center;background:#0a1216;border:1px solid #16323d;border-radius:4px;padding:5px 8px;margin-bottom:4px;font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;">'+
      '<b style="flex:1;">'+esc(a.name)+'</b><span style="color:#5a8595;">AC '+esc(row.ac||'')+' · '+esc(row.props||'')+'</span>'+
      '<button style="'+cyanBtn+'" onclick="dsShipDelArmor('+i+')">✕</button></div>';
  });

  // Components (freeform)
  h += '<div style="'+sect+'">Components / Upgrades <button style="'+cyanBtn+'float:right;margin-top:-3px;" onclick="dsShipAddList(\'components\')">+ Add</button></div>';
  (sh.components||[]).forEach(function(v,i){
    h += '<div style="display:flex;gap:6px;margin-bottom:4px;"><input value="'+esc(v)+'" oninput="dsShipSetList(\'components\','+i+',this.value)" placeholder="e.g. Blink Drive, Encrypted Datastream" style="'+fld+'flex:1;"><button style="'+cyanBtn+'" onclick="dsShipDelList(\'components\','+i+')">✕</button></div>';
  });
  if(!(sh.components||[]).length) h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;color:#3a5560;font-style:italic;">None yet.</div>';

  // Notes
  h += '<div style="'+sect+'">Notes</div>';
  h += '<textarea oninput="dsShipSet(\'notes\',this.value)" rows="3" placeholder="Crew, cargo, history…" style="'+fld+'width:100%;resize:vertical;">'+esc(sh.notes)+'</textarea>';

  body.innerHTML = h;
}
window.renderShip = renderShip;

})();
