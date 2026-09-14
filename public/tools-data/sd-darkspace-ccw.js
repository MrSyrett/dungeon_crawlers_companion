/* DarkSpace — guided character builder (Science Fiction for Shadowdark).
   A dedicated creation wizard for the DarkSpace variant of the Shadowdark
   character sheet. Rather than fork the tightly class/spell-coupled Shadowdark
   builder (sd-sheet-ccw.js), this walks its own steps — Species, Archetype,
   Background, Motivation, Talent, Gear — and produces a Shadowdarklings-shaped
   character object with _sheet.options.darkSpace = true, then hands it to the
   sheet's applySheet(). Reuses the .ccw-* CSS classes for styling.
   Requires window.DARKSPACE (sd-darkspace.js) and the sheet globals
   statToMod / fmtMod / applySheet. */
(function(){
'use strict';

var DS = null;               // window.DARKSPACE, resolved lazily
var _dsw = null;             // wizard state

function ds(){ return DS || (DS = window.DARKSPACE) || {}; }
function rollN(sides){ return 1 + Math.floor(Math.random()*sides); }
function roll3d6(){ return rollN(6)+rollN(6)+rollN(6); }
function mod(v){ var m = statToMod(v); return (m===null?0:m); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ── Suggested starting kit per archetype (weapon + armor by name). ──
var START_KIT = {
  'Strong':       { weapon:'Blunt, Medium',        armor:'Medium Armor' },
  'Quick':        { weapon:'Pistol, Light',        armor:'Light Armor' },
  'Tough':        { weapon:'Rifle, Medium',        armor:'Medium Armor' },
  'Clever':       { weapon:'Pistol, Light',        armor:null },
  'Wise':         { weapon:'Edged, Light',         armor:null },
  'Charming':     { weapon:'Energy Pistol, Light', armor:'Light Armor' },
  'Machine-Based':{ weapon:null,                   armor:null },
};

// ── Step-1 toggles: include homebrew content, HeroDark mode ──
function dswInclHb(){ return !_dsw || _dsw.inclHomebrew !== false; }
// A book+homebrew pool with homebrew entries (_hb:true) filtered out when the
// Homebrew toggle is off.
function dswPool(kind){
  var arr = ds()[kind] || [];
  return dswInclHb() ? arr : arr.filter(function(x){ return !(x && x._hb); });
}
function dswSetInclHb(v){ if(!_dsw) return; _dsw.inclHomebrew = !!v;
  // Drop any now-hidden homebrew selection.
  var hidden = function(o){ return o && o._hb && !dswInclHb(); };
  if(_dsw.species){ var sp=(ds().species||[]).find(function(x){return x.name===_dsw.species.name;}); if(hidden(sp)) _dsw.species=null; }
  if(_dsw.archetype){ if(hidden(archetype(_dsw.archetype))){ _dsw.archetype=null; _dsw.talentRolls=null; } }
  if(_dsw.background && _dsw.background._hb && !dswInclHb()) _dsw.background=null;
  if(_dsw.motivation && _dsw.motivation._hb && !dswInclHb()) _dsw.motivation=null;
  dswRender();
}
window.dswSetInclHb = dswSetInclHb;
function dswSetHeroDark(v){ if(_dsw){ _dsw.heroDark = !!v; if(_dsw.heroDark) _dsw.hpMode='max'; } dswRender(); }
window.dswSetHeroDark = dswSetHeroDark;

// ── Data lookups ──
function archetype(name){ return (ds().archetypes||[]).find(function(a){ return a.name===name; }) || null; }
function allWeapons(){
  var m = (ds().meleeWeapons||[]).map(function(w){ return Object.assign({group:'Melee', kind:'melee'}, w); });
  var r = (ds().rangedWeapons||[]).map(function(w){ return Object.assign({kind:'ranged'}, w); });
  return m.concat(r);
}
function weaponByName(n){ return allWeapons().find(function(w){ return w.name===n; }) || null; }
function armorByName(n){ return (ds().armor||[]).find(function(a){ return a.name===n; }) || null; }

// Numeric AC from a DarkSpace armor row (patterns: "11 + DEX mod", "15", "+1").
function armorAC(armorRow, dexMod){
  if(!armorRow) return null;
  var s = String(armorRow.ac||'');
  var base = s.match(/(\d+)/);
  if(!base) return null;
  var n = parseInt(base[1],10);
  if(/DEX mod/i.test(s)) n += dexMod;
  return n;
}

// Match a 2d6 result to a talent row keyed like '2','3-6','10-11','12'.
function talentForRoll(arche, total){
  var rows = (arche && arche.talents) || [];
  for(var i=0;i<rows.length;i++){
    var r = String(rows[i].r);
    if(r.indexOf('-')>=0){ var p=r.split('-'); if(total>=+p[0] && total<=+p[1]) return rows[i]; }
    else if(+r===total) return rows[i];
  }
  // Clamp out-of-range to nearest end.
  if(rows.length){ if(total<=2) return rows[0]; return rows[rows.length-1]; }
  return null;
}

// ══ Homebrew mechanical effects (species traits + archetype features/talents) ══
// DarkSpace homebrew mirrors Shadowdark's effect model. The sheet already owns
// the effect engine (window._hbEmptyEff / window._hbAccumEffect / window._hbEffOne);
// this wizard gathers the applicable effects, resolves player choices, and folds
// the accumulated bonuses into the character it builds.

// The full species pool entry for the chosen species (carries _bonuses/_traits
// for homebrew species; book species have none).
function speciesEntry(){
  if(!_dsw || !_dsw.species) return null;
  return (ds().species||[]).find(function(x){ return x.name===_dsw.species.name; }) || null;
}
function _effLabel(e){ return (typeof window._hbEffOne==='function') ? window._hbEffOne(e) : (String(e&&e.target||'')+' '+(e&&e.amount||0)); }

// Proficiency (homebrew archetypes only — book archetypes keep free-text training).
function archProfText(a, key){
  if(!a) return '—';
  var all = key==='weapons' ? a.weaponsAll : a.armorAll;
  if(all) return key==='weapons' ? 'All weapons' : 'All armor & shields';
  var list = a[key];
  if(Array.isArray(list)) return list.join(', ') || '—';
  return String(list||'—');
}
function archAllowed(a, key, name){
  if(!a || !a._hb) return true;                 // book archetype: no restriction
  var all = key==='weapons' ? a.weaponsAll : a.armorAll;
  if(all) return true;
  var list = a[key];
  if(typeof list==='string') list = list ? list.split(/[,;]/).map(function(s){return s.trim();}) : [];
  if(!Array.isArray(list) || !list.length) return true;   // none defined = no restriction
  var n = String(name||'').toLowerCase();
  return list.some(function(w){ var lw=String(w||'').toLowerCase(); return lw && (n.indexOf(lw)>=0 || lw.indexOf(n)>=0); });
}
function dswFirstProfWeapon(a){ var w=allWeapons().find(function(x){return archAllowed(a,'weapons',x.name);}); return w?w.name:null; }
function dswFirstProfArmor(a){ var m=(ds().armor||[]).find(function(x){return archAllowed(a,'armor',x.name);}); return m?m.name:null; }

// Flat list of effects that apply to the Spacer, choose-one rows resolved via
// _dsw.hbChoices. Order is stable so statChoice effects can be keyed by index.
function dswApplicableEffects(){
  var list = [];
  var sp = speciesEntry();
  if(sp){
    (sp._bonuses||[]).forEach(function(e){ list.push(e); });
    (sp._traits||[]).forEach(function(t, ti){
      var effs = (t && t.effects) || [];
      if(t && t.choose){ var pick=_dsw.hbChoices['sp:'+ti]; if(pick!=null && effs[pick]) list.push(effs[pick]); }
      else effs.forEach(function(e){ list.push(e); });
    });
  }
  var a = archetype(_dsw.archetype);
  if(a){
    (a.bonuses||[]).forEach(function(e){ list.push(e); });
    (a.features||[]).forEach(function(f){ if(f && f.choose) return; ((f&&f.effects)||[]).forEach(function(e){ list.push(e); }); });
    (_dsw.talentRolls||[]).forEach(function(tr, ri){
      var row = tr && tr.row; if(!row) return;
      var effs = row.effects || [];
      if(row.choose){ var pick=_dsw.hbChoices['tal:'+ri]; if(pick!=null && effs[pick]) list.push(effs[pick]); }
      else effs.forEach(function(e){ list.push(e); });
    });
  }
  return list;
}
// Accumulate applicable effects into the sheet's effect object.
function dswComputeEff(){
  if(typeof window._hbEmptyEff!=='function' || typeof window._hbAccumEffect!=='function') return null;
  var out = window._hbEmptyEff();
  dswApplicableEffects().forEach(function(e, idx){
    if(!e || !e.target) return;
    if(e.target==='statChoice'){
      var st = _dsw.hbChoices['stat:'+idx];
      if(st) window._hbAccumEffect(out, { target:st, amount:e.amount });
      return;
    }
    window._hbAccumEffect(out, e);
  });
  return out;
}
// Choices the player must resolve before creation (choose-one rows + statChoice).
// Single-option "choose" rows are auto-resolved.
var _DS_STAT_OPTS = [['str','STR'],['dex','DEX'],['con','CON'],['int','INT'],['wis','WIS'],['cha','CHA']];
function dswPendingChoices(){
  var ch = [];
  var sp = speciesEntry();
  if(sp) (sp._traits||[]).forEach(function(t, ti){
    if(!(t && t.choose)) return;
    var opts = ((t.effects)||[]).map(function(e,i){ return { v:String(i), label:_effLabel(e) }; });
    if(opts.length>1) ch.push({ key:'sp:'+ti, label:'Species: '+esc(t.name||t.text||'trait'), opts:opts });
    else if(opts.length===1) _dsw.hbChoices['sp:'+ti]=0;
  });
  var a = archetype(_dsw.archetype);
  if(a) (_dsw.talentRolls||[]).forEach(function(tr, ri){
    var row = tr && tr.row; if(!(row && row.choose)) return;
    var opts = ((row.effects)||[]).map(function(e,i){ return { v:String(i), label:_effLabel(e) }; });
    if(opts.length>1) ch.push({ key:'tal:'+ri, label:'Talent (2d6='+tr.roll+')', opts:opts });
    else if(opts.length===1) _dsw.hbChoices['tal:'+ri]=0;
  });
  dswApplicableEffects().forEach(function(e, idx){
    if(e && e.target==='statChoice')
      ch.push({ key:'stat:'+idx, label:'Stat choice ('+((Number(e.amount)>=0?'+':'')+(Number(e.amount)||0))+')',
                opts:_DS_STAT_OPTS.map(function(o){ return { v:o[0], label:o[1] }; }) });
  });
  return ch;
}
function dswSetChoice(key, val){
  if(!_dsw.hbChoices) _dsw.hbChoices={};
  if(/^(sp|tal):/.test(key)){ var n=parseInt(val,10); _dsw.hbChoices[key]=isNaN(n)?null:n; }
  else _dsw.hbChoices[key]=val || null;
  dswRender();
}
window.dswSetChoice = dswSetChoice;

// ══ Wizard control ══════════════════════════════════════════════════════════
function startDarkSpaceWizard(){
  _dsw = {
    step: 0, method: null,
    inclHomebrew: true, heroDark: false,   // Step-1 toggles
    stats: null,                       // {STR,DEX,CON,INT,WIS,CHA} (derived from rolled/assign)
    rolled: null, isArray: false, statMode: 'order', assign: [0,1,2,3,4,5],
    species: null,                     // {kind, name, text}
    archetype: null,                   // archetype name
    background: null,                  // {name,text}
    motivation: null,                  // motivation obj
    talentRolls: null,                 // [{roll,row}]  (rolled) — talentPicks holds manual picks
    talentPicks: null,                 // [rowIndex|null] parallel to talentRolls when a row is chosen
    credits: null, buyKit: true,
    buyWeapons: [], buyArmor: [],      // names bought (multi-buy, filtered to the archetype)
    survivorGear: null,                // extra citizen gear (string) for The Survivor
    contacts: null,                    // for The Virtuous
    triadOptIn: false, triadPower: null,   // The Triad (metaphysical) discipline
    shipName: '', shipRole: '',            // crew identity (shown by Background)
    hbChoices: {},                         // resolved homebrew choose-one / statChoice picks
    hp: null, hpMode: 'roll', name: ''
  };
  document.getElementById('dsw-overlay').style.display = 'flex';
  dswRender();
}
window.startDarkSpaceWizard = startDarkSpaceWizard;

function dswClose(){ document.getElementById('dsw-overlay').style.display='none'; _dsw=null; }
window.dswClose = dswClose;

// ── Window-exposed setters for inline on* handlers (which run in global scope
//    and cannot see the closure-private _dsw). ──
function dswGoDesign(){ _dsw.step++; dswRender(); }              window.dswGoDesign = dswGoDesign;
function dswSetName(v){ if(_dsw) _dsw.name = v; }               window.dswSetName = dswSetName;
function dswSetShipName(v){ if(_dsw) _dsw.shipName = v; }        window.dswSetShipName = dswSetShipName;
function dswSetShipRole(v){ if(_dsw) _dsw.shipRole = v; }        window.dswSetShipRole = dswSetShipRole;
function dswSetKit(v){ if(_dsw) _dsw.buyKit = !!v; }            window.dswSetKit = dswSetKit;
function dswSetWeapon(v){ if(_dsw) _dsw.weapon = v || null; }   window.dswSetWeapon = dswSetWeapon;
function dswSetArmor(v){ if(_dsw) _dsw.armor = v || null; }     window.dswSetArmor = dswSetArmor;
function dswRerollTalent(){ _dsw.talentRolls = null; dswRollTalent(); dswRender(); } window.dswRerollTalent = dswRerollTalent;
function dswRerollCredits(){ _dsw.credits = null; _dsw.survivorGear = null; _dsw.contacts = null; dswRollCredits(); dswRender(); } window.dswRerollCredits = dswRerollCredits;

// A character gains The Triad from the Power Armor Spacer species, a Wise
// archetype talent, a talent roll that grants it, or a GM ruling (opt-in).
function dswHasTriad(){
  if(_dsw.triadOptIn) return true;
  if(_dsw.species && /Power Armor|Triad/i.test(_dsw.species.name||'')) return true;
  if((_dsw.talentRolls||[]).some(function(t){ return t.row && /triad/i.test(t.row.text||''); })) return true;
  return false;
}
function dswSteps(){
  var steps = ['Method','Ability Scores','Species','Archetype','Background','Motivation','Talent'];
  if(dswHasTriad()) steps.push('The Triad');
  steps.push('Gear & Credits','Name & Finish');
  return steps;
}

function dswRender(){
  var steps = dswSteps();
  if(_dsw.step >= steps.length) _dsw.step = steps.length-1;
  var name = steps[_dsw.step];
  document.getElementById('dsw-step').textContent = 'Step '+(_dsw.step+1)+' of '+steps.length+' — '+name;
  var body = document.getElementById('dsw-body');
  var h = '';
  switch(name){
    case 'Method':         h = dswMethod(); break;
    case 'Ability Scores': h = dswStats(); break;
    case 'Species':        h = dswSpecies(); break;
    case 'Archetype':      h = dswArchetype(); break;
    case 'Background':      h = dswBackground(); break;
    case 'Motivation':     h = dswMotivation(); break;
    case 'Talent':         h = dswTalent(); break;
    case 'The Triad':      h = dswTriad(); break;
    case 'Gear & Credits': h = dswGear(); break;
    default:               h = dswFinish(); break;
  }
  body.innerHTML = h;
  document.getElementById('dsw-back').style.visibility = _dsw.step>0 ? 'visible' : 'hidden';
  var nb = document.getElementById('dsw-next');
  nb.textContent = (name==='Name & Finish') ? '✦ Create Spacer' : 'Next →';
  nb.style.visibility = (name==='Method') ? 'hidden' : 'visible';
}
window.dswRender = dswRender;

function dswBack(){ if(_dsw.step>0){ _dsw.step--; dswRender(); } }
window.dswBack = dswBack;

function dswNext(){
  var name = dswSteps()[_dsw.step];
  // Validate / commit per-step.
  if(name==='Ability Scores'){ dswCommitStats(); }
  if(name==='Species' && !_dsw.species){ alert('Choose a species.'); return; }
  if(name==='Archetype' && !_dsw.archetype){ alert('Choose an archetype.'); return; }
  if(name==='Background' && !_dsw.background){ alert('Choose a background.'); return; }
  if(name==='Motivation' && !_dsw.motivation){ alert('Choose a motivation.'); return; }
  if(name==='Talent'){ if(!_dsw.talentRolls) dswRollTalent(); }
  if(name==='The Triad' && !_dsw.triadPower){ alert('Choose a Triad discipline (Body, Mind, or Soul).'); return; }
  if(name==='Gear & Credits'){ dswCommitGear(); }
  if(name==='Name & Finish'){ dswApply(); return; }
  _dsw.step++;
  dswRender();
}
window.dswNext = dswNext;

// ── Method ──
function dswMethod(){
  var h = '<p class="ccw-hint">DarkSpace — science fiction for Shadowdark. Build a <b>Spacer</b>: Species, Archetype, Background, and Motivation replace the usual Ancestry, Class, and Alignment.</p>';
  h += '<div style="display:flex;gap:16px;justify-content:center;margin:0 0 12px;padding:8px 10px;background:#0f0f0f;border:1px solid #16323d;">';
  h += '<label style="display:flex;align-items:center;gap:6px;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:#ccc;cursor:pointer;"><input type="checkbox" '+(dswInclHb()?'checked':'')+' onchange="dswSetInclHb(this.checked)"> Homebrew</label>';
  h += '<label style="display:flex;align-items:center;gap:6px;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;color:'+(_dsw.heroDark?'#e0b83a':'#ccc')+';cursor:pointer;" title="HeroDark: maximum HP at level 1, a Luck point on any natural 1 or 20, and Dying (not unconscious) at 0 HP. Toggle it later on the sheet."><input type="checkbox" '+(_dsw.heroDark?'checked':'')+' onchange="dswSetHeroDark(this.checked)"> ⚔ HeroDark</label>';
  h += '</div>';
  h += '<button class="ccw-choice" style="width:100%;margin-bottom:8px;padding:14px;" onclick="dswGoRandom()"><div class="ccw-choice-name">🎲 Random Spacer</div><div class="ccw-choice-desc">Roll everything at once — stats, species, archetype, gear.</div></button>';
  h += '<button class="ccw-choice" style="width:100%;padding:14px;" onclick="dswGoDesign()"><div class="ccw-choice-name">✎ Design Your Own</div><div class="ccw-choice-desc">Walk through each step and make every choice yourself.</div></button>';
  return h;
}

function dswGoRandom(){
  // Stats (respect the assign flow so the review shows a clean rolled pool)
  dswRollStats();
  // Species: 70% roll a trait, 20% human, 10% tech
  var r = Math.random();
  if(r < 0.2){ _dsw.species = { kind:'human', name:'Human', text:ds().humanNote }; }
  else if(r < 0.3){ var t = rand(ds().techSpecies||[]); _dsw.species = { kind:'tech', name:t.name, text:t.text }; }
  else { var sp = rand(dswPool('species')); if(sp) _dsw.species = { kind:'trait', name:sp.name, text:sp.text }; }
  // Archetype (avoid Machine-Based unless tech species)
  var pool = dswPool('archetypes').filter(function(a){ return a.name!=='Machine-Based'; });
  if(_dsw.species && _dsw.species.kind==='tech') pool = dswPool('archetypes');
  _dsw.archetype = rand(pool).name;
  _dsw.background = rand(dswPool('backgrounds'));
  _dsw.motivation = rand(dswPool('motivations'));
  _dsw.talentRolls = null; dswRollTalent();
  // Gear — suggest the archetype's starter kit weapon/armor.
  var kit = START_KIT[_dsw.archetype] || {};
  _dsw.buyKit = true;
  _dsw.buyWeapons = kit.weapon ? [kit.weapon] : [];
  _dsw.buyArmor   = kit.armor  ? [kit.armor]  : [];
  dswRollCredits();
  _dsw.name = '';
  _dsw.step = dswSteps().length - 1;    // jump to Finish for review
  dswRender();
}
window.dswGoRandom = dswGoRandom;

// ── Ability Scores ──
// Shadowdark rolls 3d6 per ability but rerolls the whole set unless at least
// one score is 14+ — DarkSpace is 100% compatible, so honour that here.
function rollStatSet(){
  var s;
  do { s = { STR:roll3d6(),DEX:roll3d6(),CON:roll3d6(),INT:roll3d6(),WIS:roll3d6(),CHA:roll3d6() }; }
  while(Math.max(s.STR,s.DEX,s.CON,s.INT,s.WIS,s.CHA) < 14);
  return s;
}
var DSW_STD_ARRAY = [15,14,13,12,10,8];
var DSW_STATS = ['STR','DEX','CON','INT','WIS','CHA'];
// Rolled/array values live in _dsw.rolled (6 values); _dsw.assign maps each stat
// to a pool index; _dsw.stats is the resolved {STR:..} object. Mirrors the SD
// builder's Roll / Standard Array + assign-dropdown flow.
function dswSyncStats(){
  if(!_dsw.rolled){ return; }
  var order = _dsw.statMode==='assign' ? _dsw.assign : [0,1,2,3,4,5];
  _dsw.stats = {}; DSW_STATS.forEach(function(k,i){ _dsw.stats[k] = _dsw.rolled[order[i]]; });
}
function dswRollStats(){
  var r; do { r = [0,0,0,0,0,0].map(function(){ return roll3d6(); }); } while(Math.max.apply(null,r) < 14);
  _dsw.rolled = r; _dsw.isArray = false;
  _dsw.statMode = _dsw.statMode==='assign' ? 'assign' : 'order';
  _dsw.assign = [0,1,2,3,4,5];
  dswSyncStats(); dswRender();
}
window.dswRollStats = dswRollStats;
window.dswRerollStats = dswRollStats;   // legacy alias
function dswStandardArray(){
  _dsw.rolled = DSW_STD_ARRAY.slice(); _dsw.isArray = true;
  _dsw.statMode = 'assign'; _dsw.assign = [0,1,2,3,4,5];
  dswSyncStats(); dswRender();
}
window.dswStandardArray = dswStandardArray;
function dswSetStatMode(m){ _dsw.statMode = m; dswSyncStats(); dswRender(); }
window.dswSetStatMode = dswSetStatMode;
function dswAssignStat(statIdx, poolIdxStr){
  var poolIdx = parseInt(poolIdxStr,10);
  var other = _dsw.assign.indexOf(poolIdx);
  var cur = _dsw.assign[statIdx];
  if(other >= 0 && other !== statIdx) _dsw.assign[other] = cur;
  _dsw.assign[statIdx] = poolIdx;
  dswSyncStats(); dswRender();
}
window.dswAssignStat = dswAssignStat;
function dswStats(){
  // Seed from an initial roll (keeps the reroll-until-14+ rule) if nothing yet.
  if(!_dsw.rolled){
    if(_dsw.stats){ _dsw.rolled = DSW_STATS.map(function(k){ return _dsw.stats[k]; }); }
    else dswRollStats();
  }
  var h = '<p class="ccw-hint">Roll 3d6 six times (rerolled until one score is 14+, per Shadowdark), or take the <b>Standard Array</b> [15, 14, 13, 12, 10, 8]. Assign in order, or place each value where you want.</p>';
  h += '<div style="display:flex;gap:6px;margin-bottom:10px;">'+
       '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="dswRollStats()">🎲 Roll 3d6 × 6</button>'+
       '<button class="ccw-roll-btn" style="flex:1;margin:0;background:#12303a;border-color:#2a6a8a;color:#8ad4e0;" onclick="dswStandardArray()">📊 Standard Array</button>'+
       '</div>';
  if(_dsw.rolled){
    if(!_dsw.isArray){
      h += '<div style="display:flex;gap:6px;margin-bottom:10px;">'+
           '<button class="ccw-choice'+(_dsw.statMode==='order'?' selected':'')+'" style="flex:1;text-align:center;" onclick="dswSetStatMode(\'order\')"><div class="ccw-choice-name" style="font-size:10px;">In Order (as rolled)</div></button>'+
           '<button class="ccw-choice'+(_dsw.statMode==='assign'?' selected':'')+'" style="flex:1;text-align:center;" onclick="dswSetStatMode(\'assign\')"><div class="ccw-choice-name" style="font-size:10px;">Assign Manually</div></button>'+
           '</div>';
    }
    if(_dsw.statMode==='assign'){
      h += '<p class="ccw-hint" style="font-size:10px;">'+(_dsw.isArray?'Standard array':'Rolled pool')+': <b style="color:#6ac8df;">'+_dsw.rolled.join(' · ')+'</b>. Pick a value for each ability (choosing a used value swaps them).</p>';
      h += '<div class="ccw-stat-grid">';
      DSW_STATS.forEach(function(k,si){
        var idx = _dsw.assign[si]; var v = _dsw.rolled[idx];
        h += '<div class="ccw-stat"><div class="ccw-stat-name">'+k+'</div>'+
             '<select onchange="dswAssignStat('+si+',this.value)" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:15px;font-weight:900;text-align:center;padding:3px 0;outline:none;">'+
             _dsw.rolled.map(function(rv,ri){ return '<option value="'+ri+'"'+(ri===idx?' selected':'')+'>'+rv+'</option>'; }).join('')+
             '</select><div class="ccw-stat-mod">'+fmtMod(mod(v))+'</div></div>';
      });
      h += '</div>';
    } else {
      h += '<div class="ccw-stat-grid">';
      DSW_STATS.forEach(function(k,si){
        var v = _dsw.rolled[si];
        h += '<div class="ccw-stat"><div class="ccw-stat-name">'+k+'</div><div class="ccw-stat-val" style="font-family:Montserrat,sans-serif;font-size:20px;font-weight:900;color:#eee;">'+v+'</div><div class="ccw-stat-mod">'+fmtMod(mod(v))+'</div></div>';
      });
      h += '</div>';
    }
    if(!_dsw.isArray && !_dsw.rolled.some(function(v){ return v>=14; }))
      h += '<p class="ccw-hint" style="color:#df6a6a;margin-top:8px;">No score is 14+ — roll again!</p>';
  }
  return h;
}
function dswCommitStats(){ dswSyncStats(); if(!_dsw.stats && _dsw.rolled){ _dsw.stats={}; DSW_STATS.forEach(function(k,i){_dsw.stats[k]=_dsw.rolled[i];}); } }

// ── Species ──
function dswSpecies(){
  var h = '<p class="ccw-hint">Choose a Species Trait (roll d20), play a Human/analogue (the Ambitious trait — roll twice on your Archetype talent table at 1st level), or a Tech species. You can also use any Shadowdark ancestry.</p>';
  h += '<button class="ccw-roll-btn" onclick="dswRollSpecies()">🎲 Roll d20 Species Trait</button>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">';
  // Human + tech, highlighted
  var hum = (_dsw.species && _dsw.species.kind==='human') ? ' selected' : '';
  h += '<button class="ccw-choice'+hum+'" onclick="dswPickHuman()"><div class="ccw-choice-name">Human / Analogue</div><div class="ccw-choice-desc">Ambitious: roll twice on your Archetype talent table at 1st level.</div></button>';
  (ds().techSpecies||[]).forEach(function(t){
    var sel = (_dsw.species && _dsw.species.kind==='tech' && _dsw.species.name===t.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickTech('+JSON.stringify(t.name).replace(/"/g,'&quot;')+')"><div class="ccw-choice-name">'+esc(t.name)+'</div><div class="ccw-choice-desc">'+esc(t.text.slice(0,90))+'…</div></button>';
  });
  h += '</div>';
  h += '<div class="ccw-choice-grid">';
  dswPool("species").forEach(function(sp){
    var sel = (_dsw.species && _dsw.species.kind==='trait' && _dsw.species.name===sp.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickTrait('+sp.n+')"><div class="ccw-choice-name">'+esc(sp.name)+'</div><div class="ccw-choice-desc">'+esc(sp.text)+'</div></button>';
  });
  h += '</div>';
  if(_dsw.species) h += '<div class="ccw-result"><b>'+esc(_dsw.species.name)+'</b> — '+esc(_dsw.species.text)+'</div>';
  return h;
}
function dswPickTrait(n){ var sp=(ds().species||[]).find(function(x){return x.n===n;}); if(sp){ _dsw.species={kind:'trait',name:sp.name,text:sp.text}; dswRender(); } }
window.dswPickTrait = dswPickTrait;
function dswPickHuman(){ _dsw.species={kind:'human',name:'Human',text:ds().humanNote}; dswRender(); }
window.dswPickHuman = dswPickHuman;
function dswPickTech(nm){ var t=(ds().techSpecies||[]).find(function(x){return x.name===nm;}); if(t){ _dsw.species={kind:'tech',name:t.name,text:t.text}; if(nm==='Power Armor Spacer'||nm==='Android') _dsw.archetype='Machine-Based'; dswRender(); } }
window.dswPickTech = dswPickTech;
function dswRollSpecies(){ var sp=rand(dswPool("species")); _dsw.species={kind:'trait',name:sp.name,text:sp.text}; dswRender(); }
window.dswRollSpecies = dswRollSpecies;

// ── Archetype ──
function dswArchetype(){
  var h = '<p class="ccw-hint">Choose an Archetype — your Spacer\'s calling. It sets your prime stat, hit die, weapon/armor training, and features. Select one to see its full details.</p>';
  h += '<div class="ccw-choice-grid">';
  dswPool('archetypes').forEach(function(a){
    var sel = (_dsw.archetype===a.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickArch('+JSON.stringify(a.name).replace(/"/g,'&quot;')+')">'+
      '<div class="ccw-choice-name">'+esc(a.name)+(a._hb?' <span style="color:#8fd6ea;font-size:8px;">HB</span>':'')+'  <span style="color:#6ac8df;font-weight:700;">'+esc(a.stat)+' · d'+a.hitDie+'</span></div></button>';
  });
  h += '</div>';
  // Details panel — full features of the selected archetype (like the SD class step).
  h += '<div style="background:#0a1216;border:1px solid #1a5a7a;padding:10px 12px;margin-top:10px;min-height:110px;">';
  var a = archetype(_dsw.archetype);
  if(a){
    h += '<div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#8fd6ea;margin-bottom:6px;">'+esc(a.name)+'</div>';
    h += '<div style="font-family:Montserrat,sans-serif;font-size:11px;color:#cfe6ee;line-height:1.5;">';
    if(a.blurb) h += '<div style="font-style:italic;color:#9fbecb;margin-bottom:5px;">'+esc(a.blurb)+'</div>';
    h += '<div><b style="color:#eee;">Prime Stat:</b> '+esc(a.stat)+' &nbsp;·&nbsp; <b style="color:#eee;">Hit Die:</b> d'+a.hitDie+'</div>';
    h += '<div><b style="color:#eee;">Weapons:</b> '+esc(archProfText(a,'weapons'))+'</div>';
    h += '<div><b style="color:#eee;">Armor:</b> '+esc(archProfText(a,'armor'))+'</div>';
    if(a.triad && (a.triad.Body||a.triad.Mind||a.triad.Soul)) h += '<div><b style="color:#eee;">Grants Triad:</b> '+['Body','Mind','Soul'].filter(function(p){return a.triad[p];}).join(', ')+'</div>';
    if((a.features||[]).length){
      h += '<div style="margin-top:5px;"><b style="color:#eee;">Features:</b></div>';
      (a.features||[]).forEach(function(f){ h += '<div style="padding-left:8px;">• <b style="color:#8fd6ea;">'+esc(f.name)+'.</b> '+esc(f.text)+'</div>'; });
    }
    if((a.talents||[]).length){
      h += '<div style="margin-top:6px;"><b style="color:#eee;">Talent Table (2d6):</b></div>';
      (a.talents||[]).forEach(function(t){ h += '<div style="padding-left:8px;font-size:10px;color:#9fbecb;"><b style="color:#cfe6ee;">'+esc(t.r)+':</b> '+esc(t.text)+'</div>'; });
    }
    h += '</div>';
  } else {
    h += '<div style="font-family:Montserrat,sans-serif;font-size:11px;color:#5a8595;font-style:italic;">Select an archetype to see its full details.</div>';
  }
  h += '</div>';
  return h;
}
function dswPickArch(nm){ _dsw.archetype=nm; _dsw.talentRolls=null;
  // Reset gear to this archetype's suggested starter kit (player edits in the gear step).
  var kit=START_KIT[nm]||{};
  _dsw.buyWeapons = kit.weapon ? [kit.weapon] : [];
  _dsw.buyArmor   = kit.armor  ? [kit.armor]  : [];
  dswRender(); }
window.dswPickArch = dswPickArch;

// ── Background ──
function dswBackground(){
  var h = '<p class="ccw-hint">Choose a Background (roll d20). You have advantage on checks where it plausibly applies.</p>';
  h += '<button class="ccw-roll-btn" onclick="dswRollBg()">🎲 Roll d20 Background</button>';
  h += '<div class="ccw-choice-grid">';
  dswPool("backgrounds").forEach(function(b){
    var sel = (_dsw.background && _dsw.background.name===b.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickBg('+b.n+')"><div class="ccw-choice-name">'+esc(b.name)+'</div><div class="ccw-choice-desc">'+esc(b.text)+'</div></button>';
  });
  h += '</div>';
  return h;
}
function dswPickBg(n){ var b=(ds().backgrounds||[]).find(function(x){return x.n===n;}); if(b){ _dsw.background=b; dswRender(); } }
window.dswPickBg = dswPickBg;
function dswRollBg(){ _dsw.background=rand(dswPool("backgrounds")); dswRender(); }
window.dswRollBg = dswRollBg;

// ── Motivation ──
function dswMotivation(){
  var h = '<p class="ccw-hint">Choose a Motivation (this replaces Alignment). Each grants a one-time starting bonus and a recurring way to earn Luck Tokens.</p>';
  h += '<div style="display:grid;grid-template-columns:1fr;gap:6px;">';
  dswPool("motivations").forEach(function(m){
    var sel = (_dsw.motivation && _dsw.motivation.name===m.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickMot('+JSON.stringify(m.name).replace(/"/g,'&quot;')+')">'+
      '<div class="ccw-choice-name">'+esc(m.name)+'</div>'+
      '<div class="ccw-choice-desc">'+esc(m.text)+'<br><b style="color:#6ac8df;">Start:</b> '+esc(m.startBonus)+'<br><b style="color:#6ac8df;">Luck:</b> '+esc(m.effect)+'</div></button>';
  });
  h += '</div>';
  return h;
}
function dswPickMot(nm){ _dsw.motivation=(ds().motivations||[]).find(function(x){return x.name===nm;}); dswRender(); }
window.dswPickMot = dswPickMot;

// ── Talent ──
function dswTalentRolls(){ return (_dsw.species && _dsw.species.kind==='human') ? 2 : 1; }
// Roll or pick a talent for a slot (0 = main, 1 = Human/Ambitious bonus).
function dswRollTalentSlot(i){
  var arche = archetype(_dsw.archetype);
  var total = rollN(6)+rollN(6);
  if(!Array.isArray(_dsw.talentRolls)) _dsw.talentRolls = [];
  _dsw.talentRolls[i] = { roll:total, row:talentForRoll(arche, total) };
}
function dswRollTalent(){ var n=dswTalentRolls(); _dsw.talentRolls=[]; for(var i=0;i<n;i++) dswRollTalentSlot(i); }
window.dswRollTalent = dswRollTalent;
function dswRollTalentSlotUI(i){ dswRollTalentSlot(i); dswRender(); }
window.dswRollTalentSlotUI = dswRollTalentSlotUI;
function dswPickTalent(i, idxStr){
  if(idxStr==='') return;
  var arche = archetype(_dsw.archetype);
  var rows = (arche && arche.talents) || [];
  var row = rows[parseInt(idxStr,10)];
  if(!row) return;
  if(!Array.isArray(_dsw.talentRolls)) _dsw.talentRolls = [];
  _dsw.talentRolls[i] = { roll:null, pick:parseInt(idxStr,10), row:row };
  dswRender();
}
window.dswPickTalent = dswPickTalent;
function dswTalent(){
  var arche = archetype(_dsw.archetype);
  var rows = (arche && arche.talents) || [];
  var n = dswTalentRolls();
  if(!Array.isArray(_dsw.talentRolls) || _dsw.talentRolls.length < n){ dswRollTalent(); }
  // Which table row a slot landed on (for highlighting) — match by identity.
  var rowIndexOf = function(slot){ var t=_dsw.talentRolls[slot]; if(!t||!t.row) return -1; return rows.indexOf(t.row); };
  var h = '<p class="ccw-hint">Your 1st-level Archetype talent — roll 2d6 on the <b>'+esc(_dsw.archetype)+'</b> talent table, or choose one.'+
    (n>1 ? ' Your Human/analogue Ambitious trait grants <b>two</b> talents.' : '')+'</p>';
  // Talent table (highlight the chosen/rolled rows).
  h += '<table style="width:100%;border-collapse:collapse;margin-bottom:10px;">';
  h += '<tr><th style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#6ac8df;text-align:left;padding:4px 8px;border-bottom:1px solid #16323d;width:52px;">2d6</th><th style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#6ac8df;text-align:left;padding:4px 8px;border-bottom:1px solid #16323d;">Talent</th></tr>';
  rows.forEach(function(r, ri){
    var hit = _dsw.talentRolls.some(function(t){ return t && t.row===r; });
    var bg = hit ? 'background:#0f2630;border-left:3px solid #3fb6d8;' : '';
    h += '<tr style="'+bg+'"><td style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:900;color:#eee;padding:5px 8px;border-bottom:1px solid #12222a;vertical-align:top;">'+esc(r.r)+(hit?' ✦':'')+'</td><td style="font-family:Montserrat,sans-serif;font-size:10px;color:#cfe6ee;padding:5px 8px;border-bottom:1px solid #12222a;line-height:1.4;">'+esc(r.text)+'</td></tr>';
  });
  h += '</table>';
  // Per-slot Roll + Pick controls.
  for(var i=0;i<n;i++){
    var slotLbl = (n>1) ? (i===0 ? 'Talent 1' : 'Talent 2 (Ambitious)') : 'Talent';
    var t = _dsw.talentRolls[i];
    h += '<div style="margin-bottom:6px;">';
    if(n>1) h += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#6ac8df;margin-bottom:3px;">'+slotLbl+'</div>';
    h += '<div style="display:flex;gap:6px;">';
    h += '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="dswRollTalentSlotUI('+i+')">🎲 Roll Talent</button>';
    h += '<select onchange="dswPickTalent('+i+',this.value)" style="flex:1;padding:8px 10px;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;">';
    h += '<option value="">— Choose a Talent —</option>';
    rows.forEach(function(r, ri){ var sel=(t && t.pick===ri)?' selected':''; h += '<option value="'+ri+'"'+sel+'>'+esc(r.r)+': '+esc(r.text.slice(0,52))+(r.text.length>52?'…':'')+'</option>'; });
    h += '</select></div>';
    if(t) h += '<div class="ccw-result">'+(t.roll?('<b>2d6 = '+t.roll+'</b> → '):'✔ Chosen: ')+(t.row?esc(t.row.text):'—')+'</div>';
    h += '</div>';
  }
  // The Triad opt-in.
  h += '<label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-family:Montserrat,sans-serif;font-size:12px;color:#ddd;cursor:pointer;">'+
    '<input type="checkbox" '+(dswHasTriad()?'checked':'')+' onchange="dswSetTriadOptIn(this.checked)">'+
    '<span>I gained <b>The Triad</b> (Wise talent, Power Armor Spacer, or GM ruling) — choose a discipline next.</span></label>';
  return h;
}
function dswSetTriadOptIn(v){ _dsw.triadOptIn = !!v; if(!dswHasTriad()) _dsw.triadPower = null; dswRender(); }
window.dswSetTriadOptIn = dswSetTriadOptIn;

// ── The Triad ──
function dswTriad(){
  var tr = ds().triad || {};
  var h = '<p class="ccw-hint">'+esc(tr.intro||'The Triad — metaphysical disciplines that replace spells.')+'</p>';
  h += '<p class="ccw-hint">Choose one discipline you don\'t already know. A Feat is any check to accomplish a metaphysical effect within that power, at the GM\'s discretion.</p>';
  h += '<div style="display:grid;grid-template-columns:1fr;gap:6px;">';
  (tr.powers||[]).forEach(function(pw){
    var sel = (_dsw.triadPower===pw.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickTriad('+JSON.stringify(pw.name).replace(/"/g,'&quot;')+')">'+
      '<div class="ccw-choice-name">'+esc(pw.name)+'  <span style="color:#6ac8df;font-weight:700;">'+esc(pw.stat)+'</span></div>'+
      '<div class="ccw-choice-desc">'+esc(pw.text)+'</div></button>';
  });
  h += '</div>';
  return h;
}
function dswPickTriad(nm){ _dsw.triadPower = nm; dswRender(); }
window.dswPickTriad = dswPickTriad;

// ── Gear & Credits ──
// Starting credits: 2d6 × 10 (roll) or 70 (average), plus Motivation extras.
function dswSetCredits(doRoll){
  var c = doRoll ? (rollN(6)+rollN(6))*10 : 70;
  if(_dsw.motivation && _dsw.motivation.code==='VL') c += rollN(10)+rollN(10);  // The Vile: +2d10
  if(_dsw.motivation && _dsw.motivation.code==='S' && !_dsw.survivorGear) _dsw.survivorGear = rand(ds().citizenGear||[]);
  if(_dsw.motivation && _dsw.motivation.code==='VR' && _dsw.contacts==null) _dsw.contacts = rollN(3);
  _dsw.credits = c; _dsw.creditsAvg = !doRoll;
}
function dswRollCredits(){ dswSetCredits(true); }
function dswTakeCredits(){ dswSetCredits(false); dswRender(); }
window.dswTakeCredits = dswTakeCredits;
function dswToggleKit(){ _dsw.buyKit = !_dsw.buyKit; dswRender(); }
window.dswToggleKit = dswToggleKit;
function dswToggleBuyWeapon(n){ var i=_dsw.buyWeapons.indexOf(n); if(i>=0) _dsw.buyWeapons.splice(i,1); else _dsw.buyWeapons.push(n); dswRender(); }
window.dswToggleBuyWeapon = dswToggleBuyWeapon;
function dswToggleBuyArmor(n){
  var i=_dsw.buyArmor.indexOf(n);
  if(i>=0){ _dsw.buyArmor.splice(i,1); }
  else { if(!/shield/i.test(n)) _dsw.buyArmor = _dsw.buyArmor.filter(function(x){ return /shield/i.test(x); }); _dsw.buyArmor.push(n); }
  dswRender();
}
window.dswToggleBuyArmor = dswToggleBuyArmor;

// Which weapons/armor an archetype may buy (interprets the book training strings;
// homebrew archetypes use their proficiency lists via archAllowed).
function dswArchWeaponList(arche){
  var melee  = (ds().meleeWeapons||[]).map(function(x){ return Object.assign({kind:'melee', group:'Melee'}, x); });
  var ranged = (ds().rangedWeapons||[]).map(function(x){ return Object.assign({kind:'ranged'}, x); });
  if(!arche) return melee.concat(ranged);
  if(arche._hb) return melee.concat(ranged).filter(function(x){ return archAllowed(arche,'weapons',x.name); });
  var w = String(arche.weapons||'').toLowerCase();
  if(/built-in/.test(w)) return [];                       // Machine-Based: built-in
  var cls = function(n){ n=String(n); return /heavy/i.test(n)?'heavy':/medium/i.test(n)?'medium':/light/i.test(n)?'light':''; };
  var out;
  if(/light melee/.test(w))       out = melee.filter(function(x){ return cls(x.name)==='light'; });
  else if(/light ranged/.test(w)) out = ranged.filter(function(x){ return cls(x.name)==='light'; });
  else if(/pistols/.test(w))      out = ranged.filter(function(x){ return /pistol/i.test(x.name); });
  else {
    out = [];
    if(/all melee|melee and ranged|all weapons/.test(w)) out = out.concat(melee);
    if(/all ranged|melee and ranged|all weapons|rifle/.test(w)) out = out.concat(ranged);
    if(/excluding all heavy|excluding heavy/.test(w)) out = out.filter(function(x){ return cls(x.name)!=='heavy'; });
    if(/excluding light/.test(w)) out = out.filter(function(x){ return cls(x.name)!=='light'; });
  }
  if(!out || !out.length) out = melee.concat(ranged);     // unparsed → show all rather than hide
  return out;
}
function dswArchArmorList(arche){
  var all = ds().armor||[];
  if(!arche) return all;
  if(arche._hb) return all.filter(function(x){ return archAllowed(arche,'armor',x.name); });
  var s = String(arche.armor||'').toLowerCase();
  if(/none|built-in/.test(s)) return [];
  if(/all armor/.test(s)) return all;
  var want = [];
  if(/light/.test(s))  want.push('Light Armor');
  if(/medium/.test(s)) want.push('Medium Armor');
  if(/heavy/.test(s))  want.push('Heavy Armor');
  return all.filter(function(x){ return want.indexOf(x.name)>=0; });
}
function dswGearSpent(){
  var spent = 0;
  if(_dsw.buyKit) spent += ((ds().spacersKit && ds().spacersKit.cost) || 40);
  (_dsw.buyWeapons||[]).forEach(function(n){ var w=weaponByName(n); if(w) spent += (parseInt(w.cost,10)||0); });
  (_dsw.buyArmor||[]).forEach(function(n){ var a=armorByName(n); if(a) spent += (parseInt(a.cost,10)||0); });
  return spent;
}
function dswGear(){
  var arche = archetype(_dsw.archetype);
  if(_dsw.credits==null){
    return '<p class="ccw-hint">Roll 2d6 × 10 for your starting credits, or take the average (70 cr), then buy your gear.</p>'
      + '<div style="display:flex;gap:6px;">'
      + '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="dswRerollCredits()">🎲 Roll 2d6 × 10 cr</button>'
      + '<button style="flex:0 0 auto;margin:0;padding:0 14px;background:#12303a;border:1px solid #2a6a8a;color:#8ad4e0;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;" onclick="dswTakeCredits()" title="Take the average instead of rolling">Take 70 cr</button>'
      + '</div>';
  }
  var spent = dswGearSpent();
  var left = _dsw.credits - spent;
  var h = '<p class="ccw-hint">Credits: <b style="color:#6ac8df;">'+_dsw.credits+' cr</b>'+
          (_dsw.motivation&&_dsw.motivation.code==='VL'?' <span style="color:#6ac8df;">(incl. The Vile +2d10)</span>':'')+
          ' · Spent: '+spent+' cr · <b style="color:'+(left<0?'#df6a6a':'#7ae0b0')+';">Remaining: '+left+' cr</b></p>';
  if(left<0) h += '<p class="ccw-hint" style="color:#df6a6a;">You\'ve overspent — remove something.</p>';
  h += '<div style="display:flex;gap:6px;margin:-4px 0 10px;">'
    + '<button class="ccw-roll-btn" style="flex:1;margin:0;padding:5px;font-size:10px;" onclick="dswRerollCredits()">🎲 Reroll 2d6 × 10</button>'
    + '<button style="flex:0 0 auto;margin:0;padding:0 14px;background:'+(_dsw.creditsAvg?'#241f10':'#12303a')+';border:1px solid '+(_dsw.creditsAvg?'#7a5a00':'#2a6a8a')+';color:'+(_dsw.creditsAvg?'#c8a020':'#8ad4e0')+';cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;" onclick="dswTakeCredits()" title="Take the average (70) instead of rolling">Take 70 cr</button>'
    + '</div>';
  // Spacer's Kit
  var kit = ds().spacersKit||{};
  h += '<button class="ccw-choice'+(_dsw.buyKit?' selected':'')+'" style="width:100%;margin-bottom:8px;" onclick="dswToggleKit()"><div class="ccw-choice-name" style="font-size:11px;">Spacer\'s Kit — '+(kit.cost||40)+' cr '+(_dsw.buyKit?'✓':'')+'</div><div class="ccw-choice-desc">'+esc((kit.items||[]).join(', '))+'</div></button>';
  // Weapons (options available to this archetype)
  h += '<p class="ccw-hint" style="color:#6ac8df;font-weight:700;margin-top:6px;">Weapons</p>';
  var wl = dswArchWeaponList(arche);
  if(wl.length){
    h += '<div class="ccw-choice-grid">';
    wl.forEach(function(w){
      var sel = (_dsw.buyWeapons.indexOf(w.name)>=0)?' selected':'';
      h += '<button class="ccw-choice'+sel+'" onclick="dswToggleBuyWeapon('+JSON.stringify(w.name).replace(/"/g,'&quot;')+')"><div class="ccw-choice-name" style="font-size:10px;">'+esc(w.name)+' — '+(w.cost||0)+'cr</div><div class="ccw-choice-desc">'+esc(w.dmg||'')+' · '+esc(w.range||'')+(w.props?' · '+esc(w.props):'')+'</div></button>';
    });
    h += '</div>';
  } else {
    h += '<p class="ccw-hint">'+esc(_dsw.archetype)+' uses built-in weapons — nothing to buy.</p>';
  }
  // Armor
  var al = dswArchArmorList(arche);
  if(al.length){
    h += '<p class="ccw-hint" style="color:#6ac8df;font-weight:700;margin-top:10px;">Armor</p>';
    h += '<div class="ccw-choice-grid">';
    al.forEach(function(a2){
      var sel = (_dsw.buyArmor.indexOf(a2.name)>=0)?' selected':'';
      h += '<button class="ccw-choice'+sel+'" onclick="dswToggleBuyArmor('+JSON.stringify(a2.name).replace(/"/g,'&quot;')+')"><div class="ccw-choice-name" style="font-size:10px;">'+esc(a2.name)+' — '+(a2.cost||0)+'cr</div><div class="ccw-choice-desc">AC '+esc(a2.ac||'')+'</div></button>';
    });
    h += '</div>';
  } else {
    h += '<p class="ccw-hint" style="margin-top:8px;">'+esc(_dsw.archetype)+' wears no armor.</p>';
  }
  if(_dsw.survivorGear) h += '<div class="ccw-result">The Survivor start: extra gear — <b>'+esc(_dsw.survivorGear)+'</b></div>';
  if(_dsw.contacts) h += '<div class="ccw-result">The Virtuous start: <b>'+_dsw.contacts+'</b> trusted contact(s) — define before or during play.</div>';
  return h;
}
function dswCommitGear(){ /* selections already stored live via onchange */ }

// ── Finish / build the character object ──
// Maximum HP (HeroDark, or the player's choice): hit die + CON mod (+2 for Tough).
function dswMaxHP(){
  var arche = archetype(_dsw.archetype) || {hitDie:6};
  var conMod = mod(_dsw.stats.CON);
  return Math.max(1, (arche.hitDie||6) + (_dsw.archetype==='Tough'?2:0) + conMod);
}
function dswRolledHP(){
  var arche = archetype(_dsw.archetype) || {hitDie:6};
  var conMod = mod(_dsw.stats.CON);
  var roll = (_dsw.archetype==='Tough') ? (Math.max(rollN(arche.hitDie), rollN(arche.hitDie)) + 2) : rollN(arche.hitDie);
  return Math.max(1, roll + conMod);
}
// Resolve HP for the current hpMode (HeroDark forces max).
function dswComputeHP(){
  if(_dsw.heroDark || _dsw.hpMode==='max') return dswMaxHP();
  if(_dsw.hp==null) _dsw.hp = dswRolledHP();
  return _dsw.hp;
}
function dswSetHpMode(m){ _dsw.hpMode = m; if(m==='roll') _dsw.hp = dswRolledHP(); dswRender(); }
window.dswSetHpMode = dswSetHpMode;
function dswRerollHP(){ _dsw.hpMode='roll'; _dsw.hp = dswRolledHP(); dswRender(); }
window.dswRerollHP = dswRerollHP;

// Best AC from bought armor: highest body-armor value (+DEX where noted) plus any
// shield/helmet "+N" bonuses; falls back to 10 + DEX.
function dswComputeAC(eff){
  var s = _dsw.stats; var dexMod = mod((s.DEX||10) + ((eff&&eff.dex)||0));
  var body = null, bonus = 0;
  (_dsw.buyArmor||[]).forEach(function(n){
    var a = armorByName(n); if(!a) return;
    var acs = String(a.ac||'').trim();
    var plus = acs.match(/^\+(\d+)/);
    if(plus){ bonus += parseInt(plus[1],10); return; }
    var num = acs.match(/(\d+)/); if(!num) return;
    var val = parseInt(num[1],10); if(/DEX mod/i.test(acs)) val += dexMod;
    if(body===null || val>body) body = val;
  });
  return (body===null ? (10+dexMod) : body) + bonus + ((eff&&eff.ac)||0);
}
function dswFinish(){
  var arche = archetype(_dsw.archetype) || {};
  var s = _dsw.stats;
  var effAc = dswComputeEff() || {};
  var hp = dswComputeHP();
  var ac = dswComputeAC(effAc);
  var h = '<p class="ccw-hint">Review your Spacer, name them, and create. You can edit anything on the sheet afterward.</p>';
  // HP — roll or take max (HeroDark forces max).
  h += '<div style="margin-bottom:8px;"><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Hit Points</label>';
  if(_dsw.heroDark){
    h += '<div class="ccw-result" style="margin-top:3px;"><b>'+hp+' HP</b> — max (HeroDark)</div>';
  } else {
    h += '<div style="display:flex;gap:6px;align-items:center;margin-top:3px;">'+
      '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="dswRerollHP()">🎲 Roll d'+(arche.hitDie||6)+' + CON</button>'+
      '<button class="ccw-choice'+(_dsw.hpMode==='max'?' selected':'')+'" style="flex:1;text-align:center;" onclick="dswSetHpMode(\'max\')"><div class="ccw-choice-name" style="font-size:10px;">Take Max ('+dswMaxHP()+')</div></button>'+
      '<span style="font-family:Montserrat,sans-serif;font-size:18px;font-weight:900;color:#6ac8df;min-width:44px;text-align:center;">'+hp+'</span></div>';
  }
  h += '</div>';
  h += '<div style="margin-bottom:8px;"><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Name</label><br>'+
    '<input value="'+esc(_dsw.name)+'" oninput="dswSetName(this.value)" placeholder="Spacer name" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:8px;font-family:Montserrat,sans-serif;font-size:14px;margin-top:3px;"></div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'+
    '<div><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Ship Name</label><br>'+
    '<input value="'+esc(_dsw.shipName)+'" oninput="dswSetShipName(this.value)" placeholder="The Wandering Star" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:8px;font-family:Montserrat,sans-serif;font-size:13px;margin-top:3px;"></div>'+
    '<div><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Ship Role</label><br>'+
    '<input value="'+esc(_dsw.shipRole)+'" oninput="dswSetShipRole(this.value)" placeholder="Pilot, Gunner, Engineer, Medic..." style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:8px;font-family:Montserrat,sans-serif;font-size:13px;margin-top:3px;"></div>'+
    '</div>';
  // Homebrew choices to resolve (choose-one traits/talents, stat picks).
  var pending = dswPendingChoices();
  if(pending.length){
    h += '<div class="ccw-summary" style="border-color:#2a6a8a;">';
    h += '<div class="ccw-summary-title" style="color:#6ac8df;">Homebrew Choices</div>';
    pending.forEach(function(c){
      var cur = _dsw.hbChoices[c.key];
      h += '<div style="margin:5px 0;font-family:Montserrat,sans-serif;font-size:12px;color:#ddd;">'+c.label+'<br>'+
        '<select onchange="dswSetChoice('+JSON.stringify(c.key).replace(/"/g,'&quot;')+',this.value)" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:6px;font-family:Montserrat,sans-serif;font-size:12px;margin-top:3px;">'+
        '<option value="">— choose —</option>'+
        c.opts.map(function(o){ return '<option value="'+esc(o.v)+'"'+(String(cur)===String(o.v)?' selected':'')+'>'+esc(o.label)+'</option>'; }).join('')+
        '</select></div>';
    });
    h += '</div>';
  }
  // Effect summary (what the homebrew grants mechanically).
  var eff = dswComputeEff();
  if(eff){
    var bits = [];
    [['hp','HP'],['ac','AC'],['meleeAtk','Melee Atk'],['meleeDmg','Melee Dmg'],['rangedAtk','Ranged Atk'],['rangedDmg','Ranged Dmg'],['gearSlots','Gear Slots'],['str','STR'],['dex','DEX'],['con','CON'],['int','INT'],['wis','WIS'],['cha','CHA']].forEach(function(p){
      var v = eff[p[0]]||0; if(v) bits.push((v>=0?'+':'')+v+' '+p[1]);
    });
    if(bits.length) h += '<div class="ccw-result"><b>Homebrew effects:</b> '+esc(bits.join(' · '))+'</div>';
  }
  h += '<div class="ccw-summary">';
  h += '<div class="ccw-summary-title">Spacer Summary</div>';
  h += '<div><b>Species:</b> '+esc(_dsw.species.name)+'</div>';
  h += '<div><b>Archetype:</b> '+esc(_dsw.archetype)+' ('+esc(arche.stat)+', d'+arche.hitDie+')</div>';
  h += '<div><b>Background:</b> '+esc(_dsw.background.name)+'</div>';
  h += '<div><b>Motivation:</b> '+esc(_dsw.motivation.name)+'</div>';
  h += '<div><b>Stats:</b> STR '+s.STR+' · DEX '+s.DEX+' · CON '+s.CON+' · INT '+s.INT+' · WIS '+s.WIS+' · CHA '+s.CHA+'</div>';
  h += '<div><b>HP:</b> '+hp+(_dsw.heroDark?' (max)':'')+'  ·  <b>AC:</b> '+ac+'  ·  <b>Credits:</b> '+_dsw.credits+' cr</div>';
  if((_dsw.buyWeapons||[]).length) h += '<div><b>Weapons:</b> '+esc(_dsw.buyWeapons.join(', '))+'</div>';
  if((_dsw.buyArmor||[]).length)   h += '<div><b>Armor:</b> '+esc(_dsw.buyArmor.join(', '))+'</div>';
  h += '<div><b>Talent'+((_dsw.talentRolls||[]).length>1?'s':'')+':</b> '+ (_dsw.talentRolls||[]).map(function(t){return t.row?esc(t.row.text):'';}).filter(Boolean).join(' | ') +'</div>';
  if(_dsw.triadPower) h += '<div><b>The Triad:</b> '+esc(_dsw.triadPower)+'</div>';
  h += '</div>';
  return h;
}

function dswBuildTalentsText(){
  var arche = archetype(_dsw.archetype) || {};
  var L = [];
  L.push('SPECIES — '+_dsw.species.name+': '+_dsw.species.text);
  L.push('ARCHETYPE — '+_dsw.archetype+' ('+arche.stat+', d'+arche.hitDie+')');
  (arche.features||[]).forEach(function(f){ L.push('  • '+f.name+': '+f.text); });
  var tt = (_dsw.talentRolls||[]).map(function(t){ return (t.row?t.row.text:'')+' (2d6='+t.roll+')'; }).filter(Boolean);
  if(tt.length) L.push('1ST-LEVEL TALENT: '+tt.join('  ||  '));
  if(_dsw.triadPower){
    var tp = ((ds().triad||{}).powers||[]).filter(function(p){ return p.name===_dsw.triadPower; })[0] || {};
    L.push('THE TRIAD — '+_dsw.triadPower+(tp.stat?' ('+tp.stat+')':'')+': '+(tp.text||''));
  }
  L.push('BACKGROUND — '+_dsw.background.name+': '+_dsw.background.text);
  L.push('MOTIVATION — '+_dsw.motivation.name+': '+_dsw.motivation.effect);
  if(_dsw.survivorGear) L.push('  • The Survivor start: '+_dsw.survivorGear);
  if(_dsw.contacts) L.push('  • The Virtuous start: '+_dsw.contacts+' trusted contact(s)');
  return L.join('\n');
}

// Build the slotted gear rows (with equip flags) plus the free-carry text.
// Backpack is free to carry, so it goes in free-carry, not a slot. The weapon
// and armor are flagged equipped so the sheet links the attack row / derives AC.
function dswBuildGear(){
  var rows = [];
  if(_dsw.buyKit){
    (ds().spacersKit.items||[]).forEach(function(it){
      if(/^Backpack/i.test(it)) return;                  // free to carry
      rows.push({ name:it.replace(/\s*\(.*\)\s*$/,''), qty:'', equipped:false, disabled:false });
    });
  }
  (_dsw.buyWeapons||[]).forEach(function(n){ rows.push({ name:n, qty:'', equipped:true, disabled:false }); });
  (_dsw.buyArmor||[]).forEach(function(n){ rows.push({ name:n, qty:'', equipped:true, disabled:false }); });
  if(_dsw.survivorGear) rows.push({ name:_dsw.survivorGear, qty:'', equipped:false, disabled:false });
  return { rows:rows, free:'Backpack' };
}

// Append a flat +N to a dice/damage string ("1d6" → "1d6+2").
function _dmgPlus(dmg, n){
  n = parseInt(n,10)||0; var s=String(dmg||'');
  if(!n) return s;
  var m = s.match(/([+-]\d+)\s*$/);
  if(m){ var base=(parseInt(m[1],10)||0)+n; return s.slice(0,m.index).replace(/\s+$/,'') + (base?(base>0?'+':'')+base:''); }
  return s + (n>0?'+':'') + n;
}
function dswBuildAttacks(eff){
  eff = eff || {};
  var atks = [];
  var s = _dsw.stats;
  // One attack row per bought weapon.
  (_dsw.buyWeapons||[]).forEach(function(name){
    var w = weaponByName(name);
    if(!w) return;
    var isRanged = (w.kind==='ranged');
    var st = isRanged ? 'DEX' : 'STR';
    var b = mod(isRanged ? s.DEX : s.STR) + (isRanged ? (eff.rangedAtk||0) : (eff.meleeAtk||0));
    var dmg = _dmgPlus(w.dmg||'', isRanged ? (eff.rangedDmg||0) : (eff.meleeDmg||0));
    atks.push({ name:w.name, stat:st, bonus:(b>=0?'+':'')+b, range:(w.range||''), damage:dmg, dmgPick:0, adv:false });
  });
  // Natural Weapon species trait → 1d6 melee attack
  if(_dsw.species && /Natural Weapon/i.test(_dsw.species.name)){
    var bn = mod(s.STR) + (eff.meleeAtk||0);
    atks.push({ name:'Natural Weapon', stat:'STR', bonus:(bn>=0?'+':'')+bn, range:'C', damage:_dmgPlus('1d6', eff.meleeDmg||0), dmgPick:0, adv:false });
  }
  return atks;
}

function dswApply(){
  var arche = archetype(_dsw.archetype) || {};
  var s = _dsw.stats;

  // Homebrew mechanical effects (species traits + archetype features/talents).
  var eff = dswComputeEff() || {};
  var st2 = {
    STR: s.STR + (eff.str||0), DEX: s.DEX + (eff.dex||0), CON: s.CON + (eff.con||0),
    INT: s.INT + (eff.int||0), WIS: s.WIS + (eff.wis||0), CHA: s.CHA + (eff.cha||0)
  };
  var ac = dswComputeAC(eff);
  var hp = Math.max(1, dswComputeHP() + (eff.hp||0));
  var g = dswBuildGear();

  var data = {
    name: _dsw.name || '',
    ancestry: _dsw.species.name,      // Species (relabeled on sheet)
    class: _dsw.archetype,            // Archetype
    title: '',                        // (Rank field removed in DarkSpace)
    alignment: _dsw.motivation.name,  // Motivation
    background: _dsw.background.name,
    deity: '',
    shipName: _dsw.shipName || '',
    shipRole: _dsw.shipRole || '',
    level: 1,
    stats: st2,
    maxHitPoints: hp,
    armorClass: ac,
    gold: _dsw.credits,               // credits stored in the gold field
    silver: 0, copper: 0,
    freeCary: g.free,
    _sheet: {
      options: { heroDark: !!_dsw.heroDark, darkSpace:true },
      talents: dswBuildTalentsText(),
      attacks: dswBuildAttacks(eff),
      gearRows: g.rows,               // verbatim slotted rows (with equip flags)
      hpCurrent: hp,
      hbBonusSlots: (eff.gearSlots||0),   // homebrew gear-slot bonuses
      luckPts: ''
    }
  };
  try { applySheet(data); } catch(e){ console.error('DarkSpace apply failed', e); }
  // Archetype grants Triad access → mark those disciplines known on the sheet.
  try {
    if(arche.triad && window._triad && window._triad.known){
      ['Body','Mind','Soul'].forEach(function(p){ if(arche.triad[p]) window._triad.known[p]=true; });
      if(typeof renderTriad==='function') renderTriad();
    }
  } catch(e){}
  try { if(typeof syncModeChrome==='function') syncModeChrome(); } catch(e){}
  try { if(typeof updateHeaderButton==='function') updateHeaderButton(); } catch(e){}
  try { if(typeof _saveSheetNow==='function') _saveSheetNow(); } catch(e){}
  try { if(typeof addLog==='function') addLog('DarkSpace Spacer created', '🚀', esc(_dsw.name||'')+' — '+esc(_dsw.archetype), 'normal'); } catch(e){}
  dswClose();
}

// ══ DarkSpace Level Up ══════════════════════════════════════════════════════
// Spacers advance on their Archetype's 2d6 talent table. DarkSpace is 100%
// compatible with Shadowdark, so the cadence matches Shadowdark: every level
// rolls HP (archetype hit die + CON mod; Tough rolls with advantage and +2), and
// a talent is rolled at 1st level and at every ODD level (3, 5, 7, 9) — NOT at
// even levels. Kept separate from the Shadowdark class level-up wizard, which is
// coupled to SD classes/spells.
var _dslu = null;
function sheetStatVal(id){ var el=document.getElementById(id); return el?parseInt(el.value,10)||0:0; }

function startDarkSpaceLevelUp(){
  var cur = parseInt((document.getElementById('f-level')||{}).value,10) || 1;
  if(cur >= 10){ alert('Already at maximum level (10).'); return; }
  var archName = (document.getElementById('f-class')||{}).value || '';
  var arche = archetype(archName);
  if(!arche){ alert('Set a DarkSpace archetype on the sheet first (Strong, Quick, Tough, Clever, Wise, Charming, or Machine-Based).'); return; }
  var next = cur + 1;
  // Talents come at odd levels only (3, 5, 7, 9), like Shadowdark.
  _dslu = { old:cur, next:next, arche:arche, hp:null, talent:null, gainsTalent:(next % 2 === 1),
            hasShip:false, shipTalent:null, hasIface:false, ifaceBump:null };
  dsluRollHP();
  if(_dslu.gainsTalent) dsluRollTalent();
  // The ship levels with the crew — if the Spacer has one, roll its class Talent.
  var shipSt = window._dsShipState;
  _dslu.hasShip = !!(shipSt && shipSt.classification);
  if(_dslu.hasShip) dsluRollShipTalent();
  // Offer to grow the hacker's Interface (a Function bonus) at level up.
  var ifSt = window._iface;
  _dslu.hasIface = !!(ifSt && (ifSt.name || ifSt.ACC || ifSt.CTL || ifSt.NET || ifSt.crashed));
  document.getElementById('dslu-overlay').style.display = 'flex';
  dsluRender();
}
window.startDarkSpaceLevelUp = startDarkSpaceLevelUp;

// ── Ship / Interface level-up helpers ───────────────────────────────────────
function dsluShipClass(){
  var st = window._dsShipState; if(!st) return null;
  var DS = window.DARKSPACE && window.DARKSPACE.ship; if(!DS) return null;
  return (DS.classifications||[]).find(function(c){ return c.name===st.classification; }) || null;
}
function dsluShipTalentRow(cls, roll){
  var rows = (cls && cls.talents) || [];
  for(var i=0;i<rows.length;i++){
    var r = String(rows[i].r);
    if(r.indexOf('-')>=0){ var p=r.split('-'); if(roll>=(parseInt(p[0],10)||0) && roll<=(parseInt(p[1],10)||0)) return rows[i]; }
    else if((parseInt(r,10)||0)===roll) return rows[i];
  }
  return null;
}
function dsluRollShipTalent(){
  var cls = dsluShipClass(); if(!cls){ _dslu.shipTalent=null; return; }
  var t = rollN(6)+rollN(6);
  _dslu.shipTalent = { roll:t, row:dsluShipTalentRow(cls,t), cls:cls.name };
}
window.dsluRerollShipTalent = function(){ dsluRollShipTalent(); dsluRender(); };
function dsluSetIfaceBump(fn){ _dslu.ifaceBump = (_dslu.ifaceBump===fn ? null : fn); dsluRender(); }
window.dsluSetIfaceBump = dsluSetIfaceBump;

function dsluClose(){ document.getElementById('dslu-overlay').style.display='none'; _dslu=null; }
window.dsluClose = dsluClose;

function dsluConMod(){ return mod(sheetStatVal('con-val')); }
function dsluRollHP(){
  var hd = _dslu.arche.hitDie || 6;
  var conMod = dsluConMod();
  var roll = (_dslu.arche.name==='Tough') ? (Math.max(rollN(hd), rollN(hd)) + 2) : rollN(hd);
  _dslu.hp = Math.max(1, roll + conMod);
}
window.dsluRollHP2 = function(){ dsluRollHP(); dsluRender(); };
function dsluMaxHP(){ var hd=_dslu.arche.hitDie||6; _dslu.hp = Math.max(1, hd + dsluConMod() + (_dslu.arche.name==='Tough'?2:0)); dsluRender(); }
window.dsluMaxHP = dsluMaxHP;
function dsluSetHP(v){ var n=parseInt(v,10); if(!isNaN(n)) _dslu.hp = Math.max(1,n); }
window.dsluSetHP = dsluSetHP;
function dsluRollTalent(){ var t=rollN(6)+rollN(6); _dslu.talent = { roll:t, row:talentForRoll(_dslu.arche, t) }; }
window.dsluRerollTalent = function(){ dsluRollTalent(); dsluRender(); };

function dsluRender(){
  if(!_dslu) return;
  document.getElementById('dslu-sub').textContent = 'Level '+_dslu.old+' → '+_dslu.next+' · '+_dslu.arche.name;
  var conMod = dsluConMod();
  var hd = _dslu.arche.hitDie || 6;
  var h = '';
  h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;margin-bottom:4px;">Hit Points</div>';
  h += '<p class="ccw-hint" style="margin:0 0 8px;">Roll d'+hd+(_dslu.arche.name==='Tough'?' with advantage +2 (Sturdy)':'')+' + CON mod ('+(conMod>=0?'+':'')+conMod+').</p>';
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
  h += '<button class="ccw-roll-btn" style="margin:0;width:auto;padding:8px 14px;" onclick="dsluRollHP2()">🎲 Roll</button>';
  h += '<button class="ccw-roll-btn" style="margin:0;width:auto;padding:8px 14px;" onclick="dsluMaxHP()">Max</button>';
  h += '<input type="number" min="1" value="'+(_dslu.hp!=null?_dslu.hp:'')+'" oninput="dsluSetHP(this.value)" style="width:60px;background:#0f0f0f;border:1px solid #16323d;color:#eee;text-align:center;font-family:Montserrat,sans-serif;font-size:16px;font-weight:900;padding:6px 0;border-radius:5px;">';
  h += '<span style="color:#8fd6ea;font-family:Montserrat,sans-serif;font-size:12px;">+'+(_dslu.hp!=null?_dslu.hp:0)+' max HP</span>';
  h += '</div>';
  if(_dslu.gainsTalent){
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;margin:14px 0 4px;">Talent — '+esc(_dslu.arche.name)+' Table</div>';
    h += '<button class="ccw-roll-btn" onclick="dsluRerollTalent()">🎲 Roll 2d6 Talent</button>';
    if(_dslu.talent) h += '<div class="ccw-result"><b>2d6 = '+_dslu.talent.roll+'</b> → '+(_dslu.talent.row?esc(_dslu.talent.row.text):'—')+'</div>';
    h += '<div class="ccw-summary" style="border-color:#16323d;"><div class="ccw-summary-title" style="color:#6ac8df;">'+esc(_dslu.arche.name)+' Talents</div>';
    (_dslu.arche.talents||[]).forEach(function(r){ h += '<div><b>'+esc(r.r)+':</b> '+esc(r.text)+'</div>'; });
    h += '</div>';
  } else {
    h += '<div class="ccw-result" style="margin-top:14px;">No talent at level '+_dslu.next+'. Talents come at odd levels (3, 5, 7, 9), like Shadowdark — you gain HP this level.</div>';
  }
  // Ship levels with the crew — roll its class Talent (2d6).
  if(_dslu.hasShip){
    var st = window._dsShipState;
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;margin:16px 0 4px;">Starship — '+esc(st.classification)+' (levels with the crew)</div>';
    h += '<p class="ccw-hint" style="margin:0 0 6px;">The ship advances to level '+_dslu.next+' and rolls on its Classification Talent table.</p>';
    h += '<button class="ccw-roll-btn" onclick="dsluRerollShipTalent()">🎲 Roll 2d6 Ship Talent</button>';
    if(_dslu.shipTalent) h += '<div class="ccw-result"><b>2d6 = '+_dslu.shipTalent.roll+'</b> → '+(_dslu.shipTalent.row?esc(_dslu.shipTalent.row.text):'—')+'</div>';
  }
  // Interface (hacking) growth — optional +1 to a Function bonus.
  if(_dslu.hasIface){
    var ifSt = window._iface;
    h += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;margin:16px 0 4px;">Interface (optional)</div>';
    h += '<p class="ccw-hint" style="margin:0 0 6px;">Optionally raise one Function bonus by +1.</p>';
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
    [['ACC','Access'],['CTL','Control'],['NET','Net']].forEach(function(t){
      var cur = parseInt(ifSt[t[0]],10)||0;
      var on = _dslu.ifaceBump===t[0];
      h += '<button class="ccw-roll-btn" style="margin:0;width:auto;padding:8px 12px;'+(on?'background:#12303a;color:#8fe0ff;border-color:#2a6a8a;':'')+'" onclick="dsluSetIfaceBump(\''+t[0]+'\')">'+esc(t[1])+' '+(cur>=0?'+':'')+cur+(on?' → '+(cur+1>=0?'+':'')+(cur+1):'')+'</button>';
    });
    h += '</div>';
    if(_dslu.ifaceBump) h += '<div class="ccw-result" style="margin-top:6px;">Interface '+_dslu.ifaceBump+' will increase by +1.</div>';
  }
  document.getElementById('dslu-body').innerHTML = h;
}
window.dsluRender = dsluRender;

function dsluApply(){
  if(!_dslu) return;
  var set = function(id,v){ var el=document.getElementById(id); if(el){ el.value=String(v); } };
  set('f-level', _dslu.next);
  // HP: add to max and current.
  var hpMaxEl = document.getElementById('hp-max'), hpCurEl = document.getElementById('hp-current');
  var newMax = (parseInt(hpMaxEl&&hpMaxEl.value,10)||0) + (_dslu.hp||0);
  set('hp-max', newMax);
  set('hp-current', (parseInt(hpCurEl&&hpCurEl.value,10)||0) + (_dslu.hp||0));
  // Talent: append to the talents box (only on odd levels, when one is gained).
  var talNote = '';
  if(_dslu.gainsTalent && _dslu.talent){
    var ta = document.getElementById('talents-text');
    if(ta){
      var line = 'Lvl '+_dslu.next+' talent: '+(_dslu.talent.row?_dslu.talent.row.text:'')+' (2d6='+_dslu.talent.roll+')';
      ta.value = (ta.value ? ta.value + '\n' : '') + line;
      if(typeof renderTalentsView==='function') try{ renderTalentsView(); }catch(e){}
    }
    // Homebrew talent effects: apply stat / HP bonuses to the sheet (a choose-one
    // row is left for the player). AC/attack effects are noted in the talent text.
    var row = _dslu.talent.row;
    if(row && Array.isArray(row.effects) && row.effects.length && !row.choose &&
       typeof window._hbEmptyEff==='function' && typeof window._hbAccumEffect==='function'){
      var tout = window._hbEmptyEff();
      row.effects.forEach(function(e){ if(e && e.target && e.target!=='statChoice') window._hbAccumEffect(tout, e); });
      ['str','dex','con','int','wis','cha'].forEach(function(k){
        if(tout[k]){ var el=document.getElementById(k+'-val'); if(el){ el.value = String((parseInt(el.value,10)||0)+tout[k]); if(typeof onStatChange==='function') try{ onStatChange(k); }catch(e){} } }
      });
      if(tout.hp){ set('hp-max', (parseInt(document.getElementById('hp-max').value,10)||0)+tout.hp); set('hp-current', (parseInt(document.getElementById('hp-current').value,10)||0)+tout.hp); }
      if(tout.gearSlots && typeof window.dsAddBonusSlots==='function'){ try{ window.dsAddBonusSlots(tout.gearSlots); }catch(e){} }
      var eb=[]; if(tout.hp) eb.push('+'+tout.hp+' HP'); ['str','dex','con','int','wis','cha'].forEach(function(k){ if(tout[k]) eb.push('+'+tout[k]+' '+k.toUpperCase()); });
      if(eb.length) talNote = ', '+eb.join(' ');
    }
  }
  // Ship: it levels with the crew — bump its level and record the rolled Talent.
  var shipNote = '';
  if(_dslu.hasShip && window._dsShipState){
    var sh = window._dsShipState;
    sh.level = _dslu.next;
    if(_dslu.shipTalent){
      if(!Array.isArray(sh.talentLog)) sh.talentLog = [];
      sh.talentLog.push('Lvl '+_dslu.next+' (2d6='+_dslu.shipTalent.roll+') → '+(_dslu.shipTalent.row?_dslu.shipTalent.row.text:'(no result)'));
      shipNote = ', ship talent';
    }
    try { if(typeof window.renderShip==='function') window.renderShip(); } catch(e){}
  }
  // Interface: apply the optional +1 Function bump.
  var ifaceNote = '';
  if(_dslu.hasIface && _dslu.ifaceBump && window._iface){
    window._iface[_dslu.ifaceBump] = (parseInt(window._iface[_dslu.ifaceBump],10)||0) + 1;
    ifaceNote = ', Interface '+_dslu.ifaceBump+' +1';
    try { if(typeof window.renderInterface==='function') window.renderInterface(); } catch(e){}
  }
  try { if(typeof refreshXpNext==='function') refreshXpNext(); } catch(e){}
  try { if(typeof addLog==='function') addLog('Level Up','⬆','Now level '+_dslu.next+' (+'+_dslu.hp+' HP'+(_dslu.gainsTalent?', new talent':'')+talNote+shipNote+ifaceNote+')','normal'); } catch(e){}
  try { if(typeof _saveSheetNow==='function') _saveSheetNow(); } catch(e){}
  dsluClose();
}
window.dsluApply = dsluApply;

})();
