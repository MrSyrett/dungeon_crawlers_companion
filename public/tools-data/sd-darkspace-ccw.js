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

// ══ Wizard control ══════════════════════════════════════════════════════════
function startDarkSpaceWizard(){
  _dsw = {
    step: 0, method: null,
    stats: null,                       // {STR,DEX,CON,INT,WIS,CHA}
    species: null,                     // {kind, name, text}
    archetype: null,                   // archetype name
    background: null,                  // {name,text}
    motivation: null,                  // motivation obj
    talentRolls: null,                 // [{roll,row}]
    credits: null, buyKit: true,
    weapon: null, armor: null,         // names
    survivorGear: null,                // extra citizen gear (string) for The Survivor
    contacts: null,                    // for The Virtuous
    triadOptIn: false, triadPower: null,   // The Triad (metaphysical) discipline
    shipName: '', shipRole: '',            // crew identity (shown by Background)
    hp: null, name: ''
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
  h += '<button class="ccw-choice" style="width:100%;margin-bottom:8px;padding:14px;" onclick="dswGoRandom()"><div class="ccw-choice-name">🎲 Random Spacer</div><div class="ccw-choice-desc">Roll everything at once — stats, species, archetype, gear.</div></button>';
  h += '<button class="ccw-choice" style="width:100%;padding:14px;" onclick="dswGoDesign()"><div class="ccw-choice-name">✎ Design Your Own</div><div class="ccw-choice-desc">Walk through each step and make every choice yourself.</div></button>';
  return h;
}

function dswGoRandom(){
  // Stats
  _dsw.stats = { STR:roll3d6(),DEX:roll3d6(),CON:roll3d6(),INT:roll3d6(),WIS:roll3d6(),CHA:roll3d6() };
  // Species: 70% roll a trait, 20% human, 10% tech
  var r = Math.random();
  if(r < 0.2){ _dsw.species = { kind:'human', name:'Human', text:ds().humanNote }; }
  else if(r < 0.3){ var t = rand(ds().techSpecies||[]); _dsw.species = { kind:'tech', name:t.name, text:t.text }; }
  else { var sp = rand(ds().species||[]); _dsw.species = { kind:'trait', name:sp.name, text:sp.text }; }
  // Archetype (avoid Machine-Based unless tech species)
  var pool = (ds().archetypes||[]).filter(function(a){ return a.name!=='Machine-Based'; });
  if(_dsw.species.kind==='tech') pool = ds().archetypes||[];
  _dsw.archetype = rand(pool).name;
  _dsw.background = rand(ds().backgrounds||[]);
  _dsw.motivation = rand(ds().motivations||[]);
  _dsw.talentRolls = null; dswRollTalent();
  // Gear
  var kit = START_KIT[_dsw.archetype] || {};
  _dsw.buyKit = true; _dsw.weapon = kit.weapon; _dsw.armor = kit.armor;
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
function dswStats(){
  if(!_dsw.stats) _dsw.stats = rollStatSet();
  var s = _dsw.stats;
  var h = '<p class="ccw-hint">Roll 3d6 per ability (rerolled until one score is 14+, per Shadowdark), or take the <b>Standard Array</b> [15,14,13,12,10,8]. Edit any value by hand to assign or swap.</p>';
  h += '<div style="display:flex;gap:6px;flex-wrap:wrap;">'+
       '<button class="ccw-roll-btn" onclick="dswRerollStats()">🎲 Roll 3d6 ×6</button>'+
       '<button class="ccw-roll-btn" onclick="dswStandardArray()">📊 Standard Array</button>'+
       '</div>';
  h += '<div class="ccw-stat-grid">';
  ['STR','DEX','CON','INT','WIS','CHA'].forEach(function(k){
    h += '<div class="ccw-stat"><div class="ccw-stat-name">'+k+'</div>'+
         '<input class="dsw-stat-in" data-k="'+k+'" value="'+esc(s[k])+'" '+
         'style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;text-align:center;font-family:Montserrat,sans-serif;font-size:20px;font-weight:900;padding:2px 0;" '+
         'oninput="dswStatMod(this)">'+
         '<div class="ccw-stat-mod" id="dsw-mod-'+k+'">'+fmtMod(mod(s[k]))+'</div></div>';
  });
  h += '</div>';
  return h;
}
function dswStatMod(inp){
  var k = inp.dataset.k; var el = document.getElementById('dsw-mod-'+k);
  if(el) el.textContent = fmtMod(mod(inp.value));
}
window.dswStatMod = dswStatMod;
function dswRerollStats(){
  _dsw.stats = rollStatSet();
  dswRender();
}
window.dswRerollStats = dswRerollStats;
function dswStandardArray(){
  var keys = ['STR','DEX','CON','INT','WIS','CHA'];
  _dsw.stats = {}; keys.forEach(function(k,i){ _dsw.stats[k] = DSW_STD_ARRAY[i]; });
  dswRender();
}
window.dswStandardArray = dswStandardArray;
function dswCommitStats(){
  document.querySelectorAll('#dsw-body .dsw-stat-in').forEach(function(inp){
    var v = parseInt(inp.value,10); if(!isNaN(v)) _dsw.stats[inp.dataset.k] = v;
  });
}

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
  (ds().species||[]).forEach(function(sp){
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
function dswRollSpecies(){ var sp=rand(ds().species||[]); _dsw.species={kind:'trait',name:sp.name,text:sp.text}; dswRender(); }
window.dswRollSpecies = dswRollSpecies;

// ── Archetype ──
function dswArchetype(){
  var h = '<p class="ccw-hint">Choose an Archetype — your Spacer\'s calling. It sets your prime stat, hit die, and weapon/armor training.</p>';
  h += '<div style="display:grid;grid-template-columns:1fr;gap:6px;">';
  (ds().archetypes||[]).forEach(function(a){
    var sel = (_dsw.archetype===a.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickArch('+JSON.stringify(a.name).replace(/"/g,'&quot;')+')">'+
      '<div class="ccw-choice-name">'+esc(a.name)+'  <span style="color:#6ac8df;font-weight:700;">'+esc(a.stat)+' · d'+a.hitDie+'</span></div>'+
      '<div class="ccw-choice-desc">'+esc(a.blurb)+'<br><i>Weapons:</i> '+esc(a.weapons)+' · <i>Armor:</i> '+esc(a.armor)+'</div></button>';
  });
  h += '</div>';
  return h;
}
function dswPickArch(nm){ _dsw.archetype=nm; _dsw.talentRolls=null;
  var kit=START_KIT[nm]||{}; _dsw.weapon=kit.weapon; _dsw.armor=kit.armor; dswRender(); }
window.dswPickArch = dswPickArch;

// ── Background ──
function dswBackground(){
  var h = '<p class="ccw-hint">Choose a Background (roll d20). You have advantage on checks where it plausibly applies.</p>';
  h += '<button class="ccw-roll-btn" onclick="dswRollBg()">🎲 Roll d20 Background</button>';
  h += '<div class="ccw-choice-grid">';
  (ds().backgrounds||[]).forEach(function(b){
    var sel = (_dsw.background && _dsw.background.name===b.name) ? ' selected' : '';
    h += '<button class="ccw-choice'+sel+'" onclick="dswPickBg('+b.n+')"><div class="ccw-choice-name">'+esc(b.name)+'</div><div class="ccw-choice-desc">'+esc(b.text)+'</div></button>';
  });
  h += '</div>';
  return h;
}
function dswPickBg(n){ var b=(ds().backgrounds||[]).find(function(x){return x.n===n;}); if(b){ _dsw.background=b; dswRender(); } }
window.dswPickBg = dswPickBg;
function dswRollBg(){ _dsw.background=rand(ds().backgrounds||[]); dswRender(); }
window.dswRollBg = dswRollBg;

// ── Motivation ──
function dswMotivation(){
  var h = '<p class="ccw-hint">Choose a Motivation (this replaces Alignment). Each grants a one-time starting bonus and a recurring way to earn Luck Tokens.</p>';
  h += '<div style="display:grid;grid-template-columns:1fr;gap:6px;">';
  (ds().motivations||[]).forEach(function(m){
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
function dswRollTalent(){
  var arche = archetype(_dsw.archetype);
  var n = dswTalentRolls();
  var out = [];
  for(var i=0;i<n;i++){ var total=rollN(6)+rollN(6); out.push({ roll:total, row:talentForRoll(arche, total) }); }
  _dsw.talentRolls = out;
}
window.dswRollTalent = dswRollTalent;
function dswTalent(){
  if(!_dsw.talentRolls) dswRollTalent();
  var arche = archetype(_dsw.archetype);
  var h = '<p class="ccw-hint">Your 1st-level Archetype talent — roll 2d6 on the <b>'+esc(_dsw.archetype)+'</b> talent table.'+
    (dswTalentRolls()>1 ? ' Your Human/analogue Ambitious trait rolls <b>twice</b>.' : '')+'</p>';
  h += '<button class="ccw-roll-btn" onclick="dswRerollTalent()">🎲 Roll '+(dswTalentRolls()>1?'2×':'')+'2d6 Talent</button>';
  _dsw.talentRolls.forEach(function(t){
    h += '<div class="ccw-result"><b>2d6 = '+t.roll+'</b> → '+(t.row?esc(t.row.text):'—')+'</div>';
  });
  // Show the full table for reference
  h += '<div class="ccw-summary"><div class="ccw-summary-title">'+esc(_dsw.archetype)+' Talent Table</div>';
  (arche&&arche.talents||[]).forEach(function(r){ h += '<div><b>'+esc(r.r)+':</b> '+esc(r.text)+'</div>'; });
  h += '</div>';
  // The Triad opt-in — a Wise talent, the Power Armor Spacer species, or a GM
  // ruling can grant it. Ticking this inserts a discipline-choice step next.
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
function dswRollCredits(){
  var c = (rollN(6)+rollN(6))*10;                 // Rookie: 2d6 × 10 cr
  if(_dsw.motivation && _dsw.motivation.code==='VL') c += rollN(10)+rollN(10);  // The Vile: +2d10
  if(_dsw.motivation && _dsw.motivation.code==='S' && !_dsw.survivorGear) _dsw.survivorGear = rand(ds().citizenGear||[]);
  if(_dsw.motivation && _dsw.motivation.code==='VR' && _dsw.contacts==null) _dsw.contacts = rollN(3);
  _dsw.credits = c;
}
function dswGear(){
  if(_dsw.credits==null) dswRollCredits();
  var wl = allWeapons(), al = ds().armor||[];
  var h = '<p class="ccw-hint">Rookies start with <b>2d6 × 10 credits</b>. Buy a Spacer\'s Kit and pick a starting weapon and armor (suggested for your archetype). Anything else you can shop for later.</p>';
  h += '<button class="ccw-roll-btn" onclick="dswRerollCredits()">🎲 Roll Starting Credits</button>';
  h += '<div class="ccw-result"><b>Credits:</b> '+_dsw.credits+' cr'+
       (_dsw.motivation&&_dsw.motivation.code==='VL'?' <span style="color:#6ac8df;">(incl. The Vile +2d10)</span>':'')+'</div>';
  // Spacer's Kit
  var kit = ds().spacersKit||{};
  h += '<label style="display:flex;align-items:center;gap:8px;margin:10px 0;font-family:Montserrat,sans-serif;font-size:12px;color:#ddd;cursor:pointer;">'+
    '<input type="checkbox" '+(_dsw.buyKit?'checked':'')+' onchange="dswSetKit(this.checked)">'+
    '<span>Buy a <b>Spacer\'s Kit</b> ('+(kit.cost||40)+' cr, '+(kit.slots||5)+' slots): '+esc((kit.items||[]).join(', '))+'</span></label>';
  // Weapon
  h += '<div style="margin:8px 0;"><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Starting Weapon</label><br>';
  h += '<select onchange="dswSetWeapon(this.value)" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:6px;font-family:Montserrat,sans-serif;font-size:12px;margin-top:3px;">';
  h += '<option value="">— none —</option>';
  wl.forEach(function(w){
    var g = w.group || w.kind;
    h += '<option value="'+esc(w.name)+'"'+(_dsw.weapon===w.name?' selected':'')+'>'+esc(w.name)+' ('+esc(g)+', '+esc(w.dmg)+', '+w.cost+'cr)</option>';
  });
  h += '</select></div>';
  // Armor
  h += '<div style="margin:8px 0;"><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Starting Armor</label><br>';
  h += '<select onchange="dswSetArmor(this.value)" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:6px;font-family:Montserrat,sans-serif;font-size:12px;margin-top:3px;">';
  h += '<option value="">— none (AC 10 + DEX) —</option>';
  al.forEach(function(a){
    h += '<option value="'+esc(a.name)+'"'+(_dsw.armor===a.name?' selected':'')+'>'+esc(a.name)+' (AC '+esc(a.ac)+', '+a.cost+'cr)</option>';
  });
  h += '</select></div>';
  if(_dsw.survivorGear) h += '<div class="ccw-result">The Survivor start: extra gear — <b>'+esc(_dsw.survivorGear)+'</b></div>';
  if(_dsw.contacts) h += '<div class="ccw-result">The Virtuous start: <b>'+_dsw.contacts+'</b> trusted contact(s) — define before or during play.</div>';
  return h;
}
function dswCommitGear(){ /* selections already stored live via onchange */ }

// ── Finish / build the character object ──
function dswComputeHP(){
  var arche = archetype(_dsw.archetype) || {hitDie:6};
  var conMod = mod(_dsw.stats.CON);
  var roll;
  if(_dsw.archetype==='Tough'){ roll = Math.max(rollN(arche.hitDie), rollN(arche.hitDie)) + 2; } // Sturdy: +2, advantage
  else { roll = rollN(arche.hitDie); }
  return Math.max(1, roll + conMod);
}

function dswFinish(){
  if(_dsw.hp==null) _dsw.hp = dswComputeHP();
  var arche = archetype(_dsw.archetype) || {};
  var s = _dsw.stats;
  var dexMod = mod(s.DEX);
  var armorRow = armorByName(_dsw.armor);
  var ac = armorAC(armorRow, dexMod); if(ac==null) ac = 10 + dexMod;
  var h = '<p class="ccw-hint">Review your Spacer, name them, and create. You can edit anything on the sheet afterward.</p>';
  h += '<div style="margin-bottom:8px;"><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Name</label><br>'+
    '<input value="'+esc(_dsw.name)+'" oninput="dswSetName(this.value)" placeholder="Spacer name" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:8px;font-family:Montserrat,sans-serif;font-size:14px;margin-top:3px;"></div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">'+
    '<div><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Ship Name</label><br>'+
    '<input value="'+esc(_dsw.shipName)+'" oninput="dswSetShipName(this.value)" placeholder="The Wandering Star" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:8px;font-family:Montserrat,sans-serif;font-size:13px;margin-top:3px;"></div>'+
    '<div><label style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;color:#6ac8df;text-transform:uppercase;">Ship Role</label><br>'+
    '<input value="'+esc(_dsw.shipRole)+'" oninput="dswSetShipRole(this.value)" placeholder="Pilot, Gunner, Engineer, Medic..." style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#eee;padding:8px;font-family:Montserrat,sans-serif;font-size:13px;margin-top:3px;"></div>'+
    '</div>';
  h += '<div class="ccw-summary">';
  h += '<div class="ccw-summary-title">Spacer Summary</div>';
  h += '<div><b>Species:</b> '+esc(_dsw.species.name)+'</div>';
  h += '<div><b>Archetype:</b> '+esc(_dsw.archetype)+' ('+esc(arche.stat)+', d'+arche.hitDie+')</div>';
  h += '<div><b>Background:</b> '+esc(_dsw.background.name)+'</div>';
  h += '<div><b>Motivation:</b> '+esc(_dsw.motivation.name)+'</div>';
  h += '<div><b>Stats:</b> STR '+s.STR+' · DEX '+s.DEX+' · CON '+s.CON+' · INT '+s.INT+' · WIS '+s.WIS+' · CHA '+s.CHA+'</div>';
  h += '<div><b>HP:</b> '+_dsw.hp+'  ·  <b>AC:</b> '+ac+'  ·  <b>Credits:</b> '+_dsw.credits+' cr</div>';
  if(_dsw.weapon) h += '<div><b>Weapon:</b> '+esc(_dsw.weapon)+'</div>';
  if(_dsw.armor)  h += '<div><b>Armor:</b> '+esc(_dsw.armor)+'</div>';
  h += '<div><b>Talent:</b> '+ (_dsw.talentRolls||[]).map(function(t){return t.row?esc(t.row.text):'';}).join(' | ') +'</div>';
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
  if(_dsw.weapon) rows.push({ name:_dsw.weapon, qty:'', equipped:true, disabled:false });
  if(_dsw.armor)  rows.push({ name:_dsw.armor, qty:'', equipped:true, disabled:false });
  if(_dsw.survivorGear) rows.push({ name:_dsw.survivorGear, qty:'', equipped:false, disabled:false });
  return { rows:rows, free:'Backpack' };
}

function dswBuildAttacks(){
  var atks = [];
  var s = _dsw.stats;
  if(_dsw.weapon){
    var w = weaponByName(_dsw.weapon);
    if(w){
      var isRanged = (w.kind==='ranged');
      var st = isRanged ? 'DEX' : 'STR';
      var b = mod(isRanged ? s.DEX : s.STR);
      atks.push({ name:w.name, stat:st, bonus:(b>=0?'+':'')+b, range:(w.range||''), damage:(w.dmg||''), dmgPick:0, adv:false });
    }
  }
  // Natural Weapon species trait → 1d6 melee attack
  if(_dsw.species && /Natural Weapon/i.test(_dsw.species.name)){
    var bn = mod(s.STR);
    atks.push({ name:'Natural Weapon', stat:'STR', bonus:(bn>=0?'+':'')+bn, range:'C', damage:'1d6', dmgPick:0, adv:false });
  }
  return atks;
}

function dswApply(){
  var arche = archetype(_dsw.archetype) || {};
  var s = _dsw.stats;
  if(_dsw.hp==null) _dsw.hp = dswComputeHP();
  var dexMod = mod(s.DEX);
  var armorRow = armorByName(_dsw.armor);
  var ac = armorAC(armorRow, dexMod); if(ac==null) ac = 10 + dexMod;
  var g = dswBuildGear();

  var data = {
    name: _dsw.name || '',
    ancestry: _dsw.species.name,      // Species (relabeled on sheet)
    class: _dsw.archetype,            // Archetype
    title: 'Rookie',                  // Rank
    alignment: _dsw.motivation.name,  // Motivation
    background: _dsw.background.name,
    deity: '',
    shipName: _dsw.shipName || '',
    shipRole: _dsw.shipRole || '',
    level: 1,
    stats: { STR:s.STR, DEX:s.DEX, CON:s.CON, INT:s.INT, WIS:s.WIS, CHA:s.CHA },
    maxHitPoints: _dsw.hp,
    armorClass: ac,
    gold: _dsw.credits,               // credits stored in the gold field
    silver: 0, copper: 0,
    freeCary: g.free,
    _sheet: {
      options: { heroDark:false, darkSpace:true },
      talents: dswBuildTalentsText(),
      attacks: dswBuildAttacks(),
      gearRows: g.rows,               // verbatim slotted rows (with equip flags)
      hpCurrent: _dsw.hp,
      luckPts: ''
    }
  };
  try { applySheet(data); } catch(e){ console.error('DarkSpace apply failed', e); }
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
  if(_dslu.gainsTalent && _dslu.talent){
    var ta = document.getElementById('talents-text');
    if(ta){
      var line = 'Lvl '+_dslu.next+' talent: '+(_dslu.talent.row?_dslu.talent.row.text:'')+' (2d6='+_dslu.talent.roll+')';
      ta.value = (ta.value ? ta.value + '\n' : '') + line;
      if(typeof renderTalentsView==='function') try{ renderTalentsView(); }catch(e){}
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
  try { if(typeof addLog==='function') addLog('Level Up','⬆','Now level '+_dslu.next+' (+'+_dslu.hp+' HP'+(_dslu.gainsTalent?', new talent':'')+shipNote+ifaceNote+')','normal'); } catch(e){}
  try { if(typeof _saveSheetNow==='function') _saveSheetNow(); } catch(e){}
  dsluClose();
}
window.dsluApply = dsluApply;

})();
