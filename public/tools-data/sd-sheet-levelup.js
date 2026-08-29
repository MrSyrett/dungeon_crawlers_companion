// SD character sheet — Level Up wizard. Split out of sd_character_sheet.html
// (~40KB only used when the level-up modal opens) so the browser caches it.
// Loaded at the same point in the page; declaration order unchanged.
// ═══ LEVEL UP WIZARD ═══════════════════════════════════════════════════════


const CCW_PRIEST_SPELLS_KNOWN = {1:[2,0,0,0,0],2:[3,0,0,0,0],3:[3,1,0,0,0],4:[3,2,0,0,0],5:[3,2,1,0,0],6:[3,2,2,0,0],7:[3,3,2,1,0],8:[3,3,2,2,0],9:[3,3,2,2,1],10:[3,3,3,2,2]};
const CCW_WIZARD_SPELLS_KNOWN = {1:[3,0,0,0,0],2:[4,0,0,0,0],3:[4,1,0,0,0],4:[4,2,0,0,0],5:[4,2,1,0,0],6:[4,3,2,0,0],7:[4,3,2,1,0],8:[4,4,2,2,0],9:[4,4,3,2,1],10:[4,4,4,2,2]};
const CCW_WITCH_SPELLS_KNOWN  = {1:[3,0,0,0,0],2:[4,0,0,0,0],3:[4,1,0,0,0],4:[4,2,0,0,0],5:[4,2,1,0,0],6:[4,3,2,0,0],7:[4,3,2,1,0],8:[4,4,2,2,0],9:[4,4,3,2,1],10:[4,4,4,2,2]};

let _lvl = null;

// Level-up spell lists start from the class default, then re-tick anything the
// character opted into during creation (saved as _charSpellSources).
function lvlDefaultSpellSources(cls) {
  const src = defaultSpellSources(cls);
  (Array.isArray(_charSpellSources) ? _charSpellSources : []).forEach(name => {
    if(name in src) src[name] = true;
  });
  return src;
}

function startLevelUp() {
  const curLevel = parseInt(document.getElementById('f-level')?.value) || 1;
  if(curLevel >= 10) { alert('Already at maximum level (10).'); return; }
  const cls = document.getElementById('f-class')?.value.trim() || '';
  const clsKey = Object.keys(RC_CLASS_INFO).find(k=>k.toLowerCase()===cls.toLowerCase());
  if(!clsKey) { alert('Set a valid class on the sheet first (Fighter, Priest, Thief, Wizard, Bard, Ranger, Witch, or Pit Fighter).'); return; }
  const newLevel = curLevel + 1;
  _lvl = {
    step: 0,
    cls: clsKey,
    oldLevel: curLevel,
    newLevel: newLevel,
    hpRoll: null,
    gainsTalent: newLevel % 2 === 1, // talents at odd levels (3,5,7,9)
    talent: null, talentRoll: null, talentPick: null, hbTalentChoice: null, hbTalentSpells: [], hbChoices: {}, tres: null,
    newSpells: [], spellSrc: null, spellSrcOf: {}, spellsNeeded: 0, spellTiers: [], spellTierCap: 0, extraHd: null,
  };
  // Spell gains for casters
  const table = clsKey==='Priest' ? CCW_PRIEST_SPELLS_KNOWN : clsKey==='Wizard' ? CCW_WIZARD_SPELLS_KNOWN : clsKey==='Witch' ? CCW_WITCH_SPELLS_KNOWN : null;
  if(table) {
    const oldRow = table[_lvl.oldLevel] || [0,0,0,0,0];
    const newRow = table[_lvl.newLevel] || oldRow;
    for(let t=0;t<5;t++){
      const gain = (newRow[t]||0)-(oldRow[t]||0);
      for(let g=0;g<gain;g++) _lvl.spellTiers.push(t+1);
    }
    _lvl.spellsNeeded = _lvl.spellTiers.length;
  } else if(clsKey === 'Knight of St. Ydris') {
    // Knight of St. Ydris: no spell until level 3, then one new spell each level.
    // The player picks any tier up to the level cap — tier 1 (L3–5), 2 (L6–8),
    // 3 (L9+) — rather than a forced tier (see cap mode in the New Spells step).
    if(newLevel >= 3) {
      _lvl.spellsNeeded = 1;
      _lvl.spellTierCap = Math.min(3, Math.floor(newLevel/3));
    }
  } else if(RC_CLASS_INFO[clsKey] && RC_CLASS_INFO[clsKey]._caster) {
    // Homebrew casters learn one new spell per level, at the highest tier their
    // level unlocks (tier = ceil(level/2), capped at 5).
    _lvl.spellTiers = [Math.min(5, Math.ceil(newLevel/2))];
    _lvl.spellsNeeded = 1;
  }
  document.getElementById('lvl-overlay').style.display = 'flex';
  lvlRender();
}

function lvlClose() { document.getElementById('lvl-overlay').style.display = 'none'; _lvl = null; }

function lvlSteps() {
  const steps = ['Hit Points'];
  if(_lvl.spellsNeeded > 0) steps.push('New Spells');
  if(_lvl.gainsTalent) steps.push('Talent');
  if(_hbLvlLearnCount() > 0) steps.push('Learn Spells');
  steps.push('Finish');
  return steps;
}

function lvlRender() {
  const steps = lvlSteps();
  document.getElementById('lvl-step').textContent = 'Level ' + _lvl.oldLevel + ' → ' + _lvl.newLevel + ' · Step ' + (_lvl.step+1) + ' of ' + steps.length + ' — ' + steps[_lvl.step];
  const body = document.getElementById('lvl-body');
  const name = steps[_lvl.step];
  if(name==='Hit Points') body.innerHTML = lvlHP();
  else if(name==='Talent') body.innerHTML = lvlTalent();
  else if(name==='New Spells') body.innerHTML = lvlSpells();
  else if(name==='Learn Spells') body.innerHTML = lvlLearnSpells();
  else body.innerHTML = lvlFinish();
  document.getElementById('lvl-back').style.visibility = _lvl.step > 0 ? 'visible' : 'hidden';
  document.getElementById('lvl-next').textContent = name==='Finish' ? '⬆ Apply Level Up' : 'Next →';
}

function lvlBack() { if(_lvl.step > 0) { _lvl.step--; lvlRender(); } }

function lvlNext() {
  const steps = lvlSteps();
  const name = steps[_lvl.step];
  if(name==='Hit Points' && _lvl.hpRoll===null) { alert('Roll, max, or enter your hit points first.'); return; }
  if(name==='Talent') {
    if(!_lvl.talent) { alert('Roll or choose your talent first.'); return; }
    if(_lvl.tres) ccwResolve(_lvl.tres);
    if(_lvl.tres && _lvl.tres.kind!=='none' && !_lvl.tres.final) { alert('Resolve your talent choice first.'); return; }
    if(_hbTalentChooseInfo(_lvl.cls, _lvl.talentRoll, _lvl.talentPick) && _lvl.hbTalentChoice==null) { alert('Choose one effect for your talent.'); return; }
    {
      const spellsKnown = [...document.querySelectorAll('#spells-list .spell-input')].some(el=>(el.value||'').trim());
      for(const ch of _hbExpandChoices(_lvl, _hbGatherTalentChoices(_lvl.cls,_lvl.talentRoll,_lvl.talentPick,_lvl.hbTalentChoice,'tm'))){
        if(ch.kind==='advSpell' && !spellsKnown) continue;
        if(!(_lvl.hbChoices && _lvl.hbChoices[ch.key])) { alert('Make a choice: ' + _hbChoiceLabel(ch)); return; }
      }
    }
  }
  if(name==='Learn Spells') {
    const n=_hbLvlLearnCount();
    if((_lvl.hbTalentSpells||[]).length < n) { alert('Choose '+n+' spell'+(n>1?'s':'')+' to learn.'); return; }
  }
  if(name==='New Spells' && _lvl.newSpells.length < _lvl.spellsNeeded) { alert('Choose '+_lvl.spellsNeeded+' new spell'+(_lvl.spellsNeeded>1?'s':'')+'.'); return; }
  if(name==='Finish') { lvlApply(); return; }
  _lvl.step++;
  lvlRender();
}

function lvlHP() {
  const hd = RC_CLASS_INFO[_lvl.cls].hd;
  const conMod = _rc_mod(parseInt(document.getElementById('con-val')?.value)||10);
  let h = '<p class="ccw-hint">Roll your class hit die (1'+hd.slice(1)+') '+(conMod!==0?((conMod>0?'+':'')+conMod+' CON '):'')+'and add the result to your maximum HP (minimum 1).</p>';
  h += '<div style="display:flex;gap:6px;align-items:stretch;margin-bottom:10px;">';
  h += '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="lvlRollHP()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll 1'+hd.slice(1)+'</button>';
  h += '<button style="flex:0 0 auto;margin:0;padding:0 12px;background:#1a3a4a;border:1px solid #2d6a7a;color:#8ad4e0;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;" onclick="lvlMaxHP()" title="Take the maximum die result">⬆ Max</button>';
  h += '<div style="display:flex;align-items:center;gap:5px;background:#141414;border:1px solid #2a2a2a;padding:0 8px;">';
  h += '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#888;">+HP</span>';
  h += '<input type="number" id="lvl-hp-input" min="1" value="'+(_lvl.hpRoll!==null?_lvl.hpRoll:'')+'" placeholder="—" oninput="_lvl.hpRoll=Math.max(1,parseInt(this.value)||0)" style="width:46px;background:transparent;border:none;color:#eee;font-family:Montserrat,sans-serif;font-size:16px;font-weight:900;text-align:center;outline:none;">';
  h += '</div></div>';
  if(_lvl.hpRoll!==null) h += '<div class="ccw-result">+'+_lvl.hpRoll+' max HP</div>';
  return h;
}
// Take the maximum hit die result instead of rolling
function lvlMaxHP() {
  const hdNum = parseInt(RC_CLASS_INFO[_lvl.cls].hd.split('d')[1]);
  const conMod = _rc_mod(parseInt(document.getElementById('con-val')?.value)||10);
  _lvl.hpRoll = Math.max(1, hdNum + conMod);
  lvlRender();
}
function lvlRollHP() {
  const hdNum = parseInt(RC_CLASS_INFO[_lvl.cls].hd.split('d')[1]);
  const conMod = _rc_mod(parseInt(document.getElementById('con-val')?.value)||10);
  _lvl.hpRoll = Math.max(1, Math.ceil(Math.random()*hdNum) + conMod);
  lvlRender();
}


function lvlTalentRows() {
  return ccwBuildTalentRows(_lvl.cls);
}
function lvlTalent() {
  if(_lvl.tres) ccwResolve(_lvl.tres);
  let h = '<p class="ccw-hint">Level '+_lvl.newLevel+' grants a talent. Roll 2d6 on the <b>'+_lvl.cls+'</b> talent table.</p>';
  h += '<table style="width:100%;border-collapse:collapse;margin-bottom:10px;">';
  h += '<tr><th style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;text-align:left;padding:4px 8px;border-bottom:1px solid #2a2a2a;width:50px;">2d6</th><th style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:#c8a020;text-align:left;padding:4px 8px;border-bottom:1px solid #2a2a2a;">Effect</th></tr>';
  lvlTalentRows().forEach(r=>{
    const hit = _lvl.talentRoll && _lvl.talentRoll >= r.lo && _lvl.talentRoll <= r.hi;
    const bg = hit ? 'background:#241f10;border-left:3px solid #c8a020;' : '';
    h += '<tr style="'+bg+'"><td style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:900;color:#eee;padding:5px 8px;border-bottom:1px solid #1e1e1e;vertical-align:top;">'+r.range+(hit?' <svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>':'')+'</td><td style="font-family:Montserrat,sans-serif;font-size:10px;color:#ccc;padding:5px 8px;border-bottom:1px solid #1e1e1e;line-height:1.4;">'+r.text+'</td></tr>';
  });
  h += '</table>';
  h += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
  h += '<button class="ccw-roll-btn" style="flex:1;margin:0;" onclick="lvlRollTalent()"><svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Roll Talent</button>';
  h += '<select onchange="lvlPickTalent(this.value)" style="flex:1;padding:8px 10px;background:#141414;border:1px solid #2a2a2a;color:#eee;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;outline:none;cursor:pointer;">';
  h += '<option value="">— Choose a Talent —</option>';
  lvlTalentRows().forEach((r,i)=>{
    const sel = (_lvl.talentPick === String(i)) ? ' selected' : '';
    h += '<option value="'+i+'"'+sel+'>'+r.range+': '+r.text.slice(0,60)+(r.text.length>60?'…':'')+'</option>';
  });
  h += '</select></div>';
  if(_lvl.talent) {
    h += '<div class="ccw-result">'+(_lvl.talentRoll ? '<svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.2h14a1.8 1.8 0 0 1 1.8 1.8v14a1.8 1.8 0 0 1-1.8 1.8H5A1.8 1.8 0 0 1 3.2 19V5A1.8 1.8 0 0 1 5 3.2Zm3 3.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4 4.1a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg> Rolled '+_lvl.talentRoll : '✔ Chosen')+': '+_lvl.talent+'</div>';
    const known = [...document.querySelectorAll('#spells-list .spell-row .spell-input')].map(el=>el.value.trim()).filter(Boolean);
    const allKnown = [...new Set([...known, ..._lvl.newSpells])].filter(sp=>sp!=='Magic Missile');
    h += ccwTalentChoiceUI(_lvl.tres, '_lvl.tres', allKnown, _lvl.cls);
    h += _hbLvlTalentPickerHtml();
    h += _hbLvlChoicesHtml();
  }
  return h;
}
// Stat / advantage / weapon-die pickers for the level-up talent's player choices.
function _hbLvlChoicesHtml(){
  const list=_hbExpandChoices(_lvl, _hbGatherTalentChoices(_lvl.cls,_lvl.talentRoll,_lvl.talentPick,_lvl.hbTalentChoice,'tm'));
  if(!list.length)return '';
  if(!_lvl.hbChoices)_lvl.hbChoices={};
  const weapons=[['Strikes','Strikes (unarmed)']].concat(
    [...document.querySelectorAll('#attacks-body .atk-name')].map(el=>(el.value||'').trim())
      .map(n=>{const m=n.match(/^Backstab \((.+)\)$/i);return m?m[1]:n;})
      .filter((v,i,a)=>v && !/^strikes$/i.test(v) && a.indexOf(v)===i).map(w=>[w,w]));
  const spells=[...document.querySelectorAll('#spells-list .spell-input')].map(el=>(el.value||'').trim())
    .filter((v,i,a)=>v && v!=='Magic Missile' && a.indexOf(v)===i).map(s=>[s,s]);
  const talents=_hbTalentRowOptions(_lvl.cls);
  let x='<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;">';
  list.forEach(ch=>{
    x+='<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin:2px 0 6px;">'+_hbChoiceLabel(ch)+'</div>';
    const cur=_lvl.hbChoices[ch.key]||'';
    if(ch.kind==='stat') x+=_hbChoiceSelect(ch.key,cur,_HB_STAT_OPTS,'lvlSetChoice');
    else if(ch.kind==='advSpell') x+= spells.length?_hbChoiceSelect(ch.key,cur,spells,'lvlSetChoice'):'<p style="color:#df6a6a;font-size:11px;margin:0;">No spells known.</p>';
    else if(ch.kind==='weaponDie') x+=_hbChoiceSelect(ch.key,cur,weapons,'lvlSetChoice');
    else if(ch.kind==='talent') x+=_hbChoiceControl('talent',ch.key,cur,talents,'lvlSetChoice');
    else if(ch.kind==='oneOf') x+=_hbChoiceControl('oneOf',ch.key,cur,_hbTraitDistinctOpts(ch.effects).map(o=>[String(o.oi),_hbEffOne(o.eff)]),'lvlSetChoice');
  });
  return x+'</div>';
}
function lvlSetChoice(key,val){ if(!_lvl.hbChoices)_lvl.hbChoices={}; _lvl.hbChoices[key]=val; Object.keys(_lvl.hbChoices).forEach(k=>{ if(k.indexOf(key+'>')===0) delete _lvl.hbChoices[k]; }); lvlRender(); }
function _hbLvlTalentPickerHtml(){
  const info = _hbTalentChooseInfo(_lvl.cls, _lvl.talentRoll, _lvl.talentPick);
  if(!info) return '';
  let x = '<div style="background:#0f0f0f;border:1px solid #7a5a00;padding:10px 12px;margin-top:10px;">';
  x += '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#c8a020;margin-bottom:6px;">\u2691 Choose one effect</div>';
  x += _hbChoiceSelect('_ltp', _lvl.hbTalentChoice==null?'':String(_lvl.hbTalentChoice), info.effs.map((e,oi)=>[String(oi), _hbEffOne(e)||'Effect']), '_lvlPickTalentEffectSel');
  return x+'</div>';
}
function _lvlPickTalentEffectSel(key, val){ lvlPickTalentEffect(val===''?null:parseInt(val)); }
function lvlPickTalentEffect(oi){ _lvl.hbTalentChoice = oi; _lvl.hbTalentSpells = []; _lvl.hbChoices = {}; lvlRender(); }
// Pick a level-up talent directly instead of rolling
function lvlPickTalent(idx) {
  if(idx === '') return;
  const r = lvlTalentRows()[parseInt(idx)];
  if(!r) return;
  _lvl.talentPick = String(idx);
  _lvl.talentRoll = null;
  _lvl.hbTalentChoice = null;
  _lvl.hbTalentSpells = [];
  _lvl.hbChoices = {};
  _lvl.talent = r.text;
  _lvl.tres = ccwAnalyzeTalent(_lvl.talent, _lvl.cls);
  ccwResolve(_lvl.tres);
  lvlRender();
}

function lvlRollTalent() {
  const roll = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
  const r = lvlTalentRows().find(x=>roll>=x.lo && roll<=x.hi);
  _lvl.talentRoll = roll;
  _lvl.talentPick = null;
  _lvl.hbTalentChoice = null;
  _lvl.talent = r ? r.text : '';
  _lvl.hbTalentSpells = [];
  _lvl.hbChoices = {};
  _lvl.extraHd = null;   // re-rolled talent → re-roll any extra Hit Die
  _lvl.tres = ccwAnalyzeTalent(_lvl.talent, _lvl.cls);
  ccwResolve(_lvl.tres);
  lvlRender();
}

function lvlSpells() {
  const cls = _lvl.cls;
  if(!_lvl.spellSrc) _lvl.spellSrc = lvlDefaultSpellSources(cls);
  return _lvlSpellsBody();
}
// How many spells the level-up talent lets you learn (direct + one nested level).
function _hbLvlLearnCount(){
  let n=0;
  for(let q=_lvl&&_lvl.tres; q; q=q.sub){ if(q.kind==='learnspell') n++; }
  _hbTalentEffective(_lvl.cls,_lvl.talentRoll,_lvl.talentPick,_lvl.hbTalentChoice).forEach(e=>{if(e&&e.target==='spellKnown'&&_hbIsPlayerChoice(e.spell))n++;});
  n += _hbNestedLearnCount({cls:_lvl.cls,hbChoices:_lvl.hbChoices||{}}, _lvl.talentRoll,_lvl.talentPick,_lvl.hbTalentChoice,'tm');
  return n;
}
// Rich picker for talent-granted spells at level-up (same grid as New Spells).
function lvlLearnSpells(){
  const cls=_lvl.cls;
  const needed=_hbLvlLearnCount();
  if(!_lvl.hbTalentSpells)_lvl.hbTalentSpells=[];
  if(!_lvl.spellSrc)_lvl.spellSrc=lvlDefaultSpellSources(cls);
  const _lc=RC_CLASS_INFO[cls]&&RC_CLASS_INFO[cls]._caster;
  const own=_lc?_lc.list:({Wizard:'Wizard',Priest:'Priest',Witch:'Witch'}[cls]||'');
  const known=[...document.querySelectorAll('#spells-list .spell-input')].map(el=>el.value.trim()).filter(Boolean);
  const maxTier=Math.min(5,Math.ceil(_lvl.newLevel/2));
  let h='<p class="ccw-hint">Your talent lets you learn '+needed+' spell'+(needed>1?'s':'')+'. ('+_lvl.hbTalentSpells.length+'/'+needed+' selected)</p>';
  h+=spellSourceBar(_lvl.spellSrc,cls,'lvlToggleSpellSrc');
  for(let tier=1;tier<=maxTier;tier++){
    const seen=new Set();
    const rows=allSpells().filter(s=>s.tier===String(tier)&&spellInSources(s,_lvl.spellSrc)&&!known.includes(s.name)).filter(s=>{if(seen.has(s.name))return false;seen.add(s.name);return true;});
    if(!rows.length)continue;
    h+='<p class="ccw-hint" style="margin-top:8px;color:#c8a020;font-weight:700;">Tier '+tier+'</p><div class="ccw-choice-grid">';
    rows.forEach(s=>{
      const sel=_lvl.hbTalentSpells.includes(s.name)?' selected':'';
      const meta=[s.range?'Range: '+s.range:'',s.duration?'Dur: '+s.duration:'',s.damage?'Dmg: '+s.damage:''].filter(Boolean).join(' · ');
      const foreign=(s.caster!==own&&s.caster!=='Both');
      const tag=foreign?'<span style="color:#8a7ac8;font-size:8px;font-weight:700;"> · '+s.caster+'</span>':'';
      h+='<button class="ccw-choice'+sel+'" onclick="lvlToggleTalentSpell(\''+s.name.replace(/'/g,"\\\\'")+'\')"><div class="ccw-choice-name" style="font-size:11px;">'+s.name+tag+'</div>'+(meta?'<div class="ccw-choice-desc" style="color:#6ac8df;font-size:8px;">'+meta+'</div>':'')+'<div class="ccw-choice-desc">'+(s.desc||'')+'</div></button>';
    });
    h+='</div>';
  }
  return h;
}
function lvlToggleTalentSpell(name){
  if(!_lvl.hbTalentSpells)_lvl.hbTalentSpells=[];
  const needed=_hbLvlLearnCount();
  const i=_lvl.hbTalentSpells.indexOf(name);
  if(i>=0)_lvl.hbTalentSpells.splice(i,1);
  else if(_lvl.hbTalentSpells.length<needed)_lvl.hbTalentSpells.push(name);
  lvlRender();
}
function _lvlSpellsBody() {
  const cls = _lvl.cls;
  if(!_lvl.spellSrc) _lvl.spellSrc = lvlDefaultSpellSources(cls);
  const _lc = RC_CLASS_INFO[cls] && RC_CLASS_INFO[cls]._caster;
  const own = _lc ? _lc.list : ({ Wizard:'Wizard', Priest:'Priest', Witch:'Witch' }[cls] || '');
  // Already-known spells (from the sheet)
  const known = [...document.querySelectorAll('#spells-list .spell-row .spell-input')].map(el=>el.value.trim()).filter(Boolean);
  // Cap mode (Knight of St. Ydris): pick any spellsNeeded spells of tier ≤ cap,
  // rather than a fixed per-tier composition.
  if(_lvl.spellTierCap) {
    const cap = _lvl.spellTierCap;
    let hc = '<p class="ccw-hint">You gain '+_lvl.spellsNeeded+' new spell'+(_lvl.spellsNeeded>1?'s':'')+' of tier '+(cap>1?('1–'+cap):'1')+'. ('+_lvl.newSpells.length+'/'+_lvl.spellsNeeded+' selected)</p>';
    hc += spellSourceBar(_lvl.spellSrc, cls, 'lvlToggleSpellSrc');
    for(let tier=1; tier<=cap; tier++){
      const seen=new Set();
      const rows=allSpells()
        .filter(s=>s.tier===String(tier) && spellInSources(s,_lvl.spellSrc) && !known.includes(s.name))
        .sort((a,b)=>{const ao=(a.caster===own||a.caster==='Both')?0:1;const bo=(b.caster===own||b.caster==='Both')?0:1;return ao-bo;})
        .filter(s=>{if(seen.has(s.name))return false;seen.add(s.name);return true;});
      if(!rows.length) continue;
      hc+='<p class="ccw-hint" style="margin-top:8px;color:#c8a020;font-weight:700;">Tier '+tier+'</p><div class="ccw-choice-grid">';
      rows.forEach(s=>{
        const sel=_lvl.newSpells.includes(s.name)?' selected':'';
        const meta=[s.range?'Range: '+s.range:'',s.duration?'Dur: '+s.duration:'',s.damage?'Dmg: '+s.damage:''].filter(Boolean).join(' · ');
        const foreign=(s.caster!==own&&s.caster!=='Both');
        const tag=foreign?'<span style="color:#8a7ac8;font-size:8px;font-weight:700;"> · '+s.caster+'</span>':'';
        hc+='<button class="ccw-choice'+sel+'" onclick="lvlToggleSpell(\''+s.name.replace(/'/g,"\\'")+'\',\''+tier+'\',\''+s.caster+'\')"><div class="ccw-choice-name" style="font-size:11px;">'+s.name+tag+'</div>'+(meta?'<div class="ccw-choice-desc" style="color:#6ac8df;font-size:8px;">'+meta+'</div>':'')+'<div class="ccw-choice-desc">'+(s.desc||'')+'</div></button>';
      });
      hc+='</div>';
    }
    return hc;
  }
  const tierCounts = {};
  _lvl.spellTiers.forEach(t=>{ tierCounts[t]=(tierCounts[t]||0)+1; });
  let h = '<p class="ccw-hint">You gain '+_lvl.spellsNeeded+' new spell'+(_lvl.spellsNeeded>1?'s':'')+': '+Object.entries(tierCounts).map(([t,c])=>c+' × Tier '+t).join(', ')+'. ('+_lvl.newSpells.length+'/'+_lvl.spellsNeeded+' selected)</p>';
  h += spellSourceBar(_lvl.spellSrc, cls, 'lvlToggleSpellSrc');
  Object.keys(tierCounts).forEach(tier=>{
    h += '<p class="ccw-hint" style="margin-top:8px;color:#c8a020;font-weight:700;">Tier '+tier+'</p>';
    h += '<div class="ccw-choice-grid">';
    // Own list first, so a duplicate name resolves to the character's own version
    const seen = new Set();
    const rows = allSpells()
      .filter(s=>s.tier===String(tier) && spellInSources(s, _lvl.spellSrc) && !known.includes(s.name))
      .sort((a,b)=>{
        const ao = (a.caster===own || a.caster==='Both') ? 0 : 1;
        const bo = (b.caster===own || b.caster==='Both') ? 0 : 1;
        return ao - bo;
      })
      .filter(s=>{ if(seen.has(s.name)) return false; seen.add(s.name); return true; });
    if(!rows.length) h += '<p class="ccw-hint" style="color:#666;">Nothing available at this tier from the selected lists.</p>';
    rows.forEach(s=>{
      const sel = _lvl.newSpells.includes(s.name) ? ' selected' : '';
      const meta = [s.range?'Range: '+s.range:'', s.duration?'Dur: '+s.duration:'', s.damage?'Dmg: '+s.damage:''].filter(Boolean).join(' · ');
      const foreign = (s.caster!==own && s.caster!=='Both');
      const tag = foreign ? '<span style="color:#8a7ac8;font-size:8px;font-weight:700;"> · '+s.caster+'</span>' : '';
      h += '<button class="ccw-choice'+sel+'" onclick="lvlToggleSpell(\''+s.name.replace(/'/g,"\\'")+'\',\''+tier+'\',\''+s.caster+'\')"><div class="ccw-choice-name" style="font-size:11px;">'+s.name+tag+'</div>'+(meta?'<div class="ccw-choice-desc" style="color:#6ac8df;font-size:8px;">'+meta+'</div>':'')+'<div class="ccw-choice-desc">'+(s.desc||'')+'</div></button>';
    });
    h += '</div>';
  });
  return h;
}
function lvlToggleSpellSrc(name, on) {
  if(!_lvl.spellSrc) _lvl.spellSrc = lvlDefaultSpellSources(_lvl.cls);
  _lvl.spellSrc[name] = !!on;
  _lvl.newSpells = _lvl.newSpells.filter(sp=>{
    const src = _lvl.spellSrcOf[sp];
    if(src && !spellInSources({caster:src}, _lvl.spellSrc)) { delete _lvl.spellSrcOf[sp]; return false; }
    return true;
  });
  lvlRender();
}
function lvlToggleSpell(name, tier, caster) {
  const i = _lvl.newSpells.indexOf(name);
  if(i >= 0) { _lvl.newSpells.splice(i,1); delete _lvl.spellSrcOf[name]; lvlRender(); return; }
  // Cap mode (Knight): any tier ≤ cap, limited only by the total spellsNeeded.
  if(_lvl.spellTierCap) {
    if((parseInt(tier)||1) > _lvl.spellTierCap) return;
    if(_lvl.newSpells.length >= _lvl.spellsNeeded) return;
    _lvl.newSpells.push(name);
    if(caster) _lvl.spellSrcOf[name] = caster;
    lvlRender();
    return;
  }
  // Count how many of this tier already selected (resolve each pick against
  // the list it actually came from — names can repeat across spell lists)
  const tierNeeded = _lvl.spellTiers.filter(t=>String(t)===String(tier)).length;
  const tierSelected = _lvl.newSpells.filter(n=>{
    const sp = findSpell(n, _lvl.spellSrcOf[n] || null);
    return sp && sp.tier===String(tier);
  }).length;
  if(tierSelected >= tierNeeded) return;
  if(_lvl.newSpells.length >= _lvl.spellsNeeded) return;
  _lvl.newSpells.push(name);
  if(caster) _lvl.spellSrcOf[name] = caster;
  lvlRender();
}

function lvlFinish() {
  const align = document.getElementById('f-alignment')?.value.trim() || 'Neutral';
  const alignKey = ['Lawful','Chaotic','Neutral'].find(a=>a.toLowerCase()===align.toLowerCase()) || 'Neutral';
  const titleIdx = Math.min(4, Math.floor((_lvl.newLevel-1)/2));
  const newTitle = (RC_TITLES[_lvl.cls]?.[alignKey]||[])[titleIdx] || '';
  const oldTitle = document.getElementById('f-title')?.value.trim() || '';
  _lvl.newTitle = newTitle;
  let h = '<div class="ccw-summary"><div class="ccw-summary-title">Level '+_lvl.newLevel+' Summary</div>';
  // Roustabout: roll the extra Hit Die once, so the summary and applied HP agree.
  if(_lvl.tres && _lvl.tres.kind==='extrahd' && _lvl.extraHd==null){
    const _hdN = parseInt(RC_CLASS_INFO[_lvl.cls].hd.split('d')[1]);
    _lvl.extraHd = Math.max(1, Math.ceil(Math.random()*_hdN));
  } else if(!(_lvl.tres && _lvl.tres.kind==='extrahd')) {
    _lvl.extraHd = null;
  }
  h += '<div>+'+(_lvl.hpRoll + (_lvl.extraHd||0))+' max HP'+(_lvl.extraHd?' (includes an extra Hit Die)':'')+'</div>';
  if(_lvl.talent) h += '<div>New Talent: '+((_lvl.tres&&_lvl.tres.final)||_lvl.talent)+'</div>';
  if(_lvl.newSpells.length) h += '<div>New Spells: '+_lvl.newSpells.join(', ')+'</div>';
  if(newTitle && newTitle!==oldTitle) h += '<div>New Title: '+newTitle+'</div>';
  h += '<div style="margin-top:6px;color:#888;font-size:10px;">XP resets to 0 on level up.</div>';
  h += '</div>';
  return h;
}

function lvlApply() {
  const set = (id,v) => { const el=document.getElementById(id); if(el) el.value=v; };
  // Level
  set('f-level', _lvl.newLevel);
  refreshScalingHeals();          // Cure Wounds scales with level
  refreshXpNext();                // XP-to-next = 10 × new level
  // XP reset
  set('xp-current', '0');
  // HP (Roustabout "roll an extra hit points die" adds a second die — see _lvl.extraHd)
  const hpMaxEl = document.getElementById('hp-max');
  const newMax = (parseInt(hpMaxEl?.value)||0) + _lvl.hpRoll + (_lvl.extraHd||0);
  set('hp-max', newMax);
  set('hp-current', newMax);
  // Title
  if(_lvl.newTitle) set('f-title', _lvl.newTitle);
  // Talent appended to talents text (resolved final if choices were made)
  const _lvlCi = RC_CLASS_INFO[_lvl.cls];
  const talentText = (_lvlCi && _lvlCi._hb)
    ? _hbTalentResolvedText(_lvl.cls, _lvl.talentRoll, _lvl.talentPick, _lvl.hbTalentChoice, _lvl.talent)
    : ((_lvl.tres && _lvl.tres.final) || _lvl.talent);
  if(talentText) {
    const ta = document.getElementById('talents-text');
    if(ta) ta.value = (ta.value ? ta.value + '\n' : '') + '— Level ' + _lvl.newLevel + ' Talent —\n' + talentText;
    renderTalentsView();
  }
  // Apply stat boosts from talent choices to the sheet
  if(_lvl.tres && _lvl.tres.statBoost) {
    const map = {STR:'str-val',DEX:'dex-val',CON:'con-val',INT:'int-val',WIS:'wis-val',CHA:'cha-val'};
    Object.entries(_lvl.tres.statBoost).forEach(([k,v])=>{
      const el = document.getElementById(map[k]);
      if(el) { el.value = String((parseInt(el.value)||10) + v); el.dispatchEvent(new Event('input')); }
    });
  }
  // Roustabout "wield a new weapon or armor" — persist the new proficiency.
  collectWieldNew([_lvl.tres]);
  // New spells added as rows
  _lvl.newSpells.forEach(name=>{
    const s = findSpell(name, _lvl.spellSrcOf[name] || _lvl.cls);
    _spellCount++;
    const row = addSpellRow(_spellCount);
    if(!row || !s) return;
    const q = (cl)=>row.querySelector(cl);
    const inp=q('.spell-input'); if(inp) inp.value=s.name;
    const lvl=q('.spell-level'); if(lvl) lvl.value=s.tier;
    const rng=q('.spell-range'); if(rng) rng.value=s.range;
    const dur=q('.spell-duration'); if(dur) dur.value=s.duration;
    const dmg=q('.spell-damage'); if(dmg) dmg.value=spellRollDice(s);
    const dsc=q('.spell-desc'); if(dsc){dsc.value=s.desc;autoResizeDesc(dsc);}
  });
  // Apply talent attack / spell / AC bonuses to the existing sheet
  (function(){
    const f = (_lvl.tres && _lvl.tres.final) || '';
    if(!f) return;
    const bumpVal = (el, n) => {
      if(!el) return;
      const cur = parseInt((el.value||'').replace(/^\+/,'')) || 0;
      const v = cur + n;
      el.value = v > 0 ? '+'+v : (v < 0 ? String(v) : '');
    };
    const bumpDmg = (d, n) => d.split('/').map(part=>{
      const m = part.match(/^(.*?)([+-]\d+)?$/);
      const mod = (parseInt(m[2]||'0')) + n;
      return m[1] + (mod > 0 ? '+'+mod : (mod < 0 ? String(mod) : ''));
    }).join('/');
    const rowWeaponType = (row) => {
      let nm = row.querySelector('.atk-name')?.value.trim() || '';
      const bs = nm.match(/^Backstab \((.+)\)$/i);
      if(bs) nm = bs[1];
      const w = (typeof SD_WEAPONS!=='undefined') ? allWeapons().find(x=>x.name.toLowerCase()===nm.toLowerCase()) : null;
      if(w) return w.type==='R' ? 'ranged' : 'melee';
      const rng = row.querySelector('.atk-range')?.value || '';
      return rng==='Close' ? 'melee' : (rng ? 'ranged' : 'melee');
    };
    const rows = [...document.querySelectorAll('#attacks-body tr')];

    // Melee / ranged attack bonuses
    const e = (typeof talentLineEffects==='function') ? talentLineEffects(f)
            : {melee:0,ranged:0,meleeDmg:0,rangedDmg:0,spellCheck:0};
    let mB=e.melee, rB=e.ranged, mD=e.meleeDmg, rD=e.rangedDmg;
    if(mB||rB) rows.forEach(row=>{
      const t = rowWeaponType(row);
      const bEl = row.querySelector('.atk-bonus'), dEl = row.querySelector('.atk-damage');
      const b = t==='melee' ? mB : rB;
      const d = t==='melee' ? mD : rD;
      if(b) bumpVal(bEl, b);
      if(d && dEl && dEl.value.trim()) dEl.value = bumpDmg(dEl.value.trim(), d);
    });

    // Spellcasting check bonus
    if(e.spellCheck) {
      bumpVal(document.getElementById('spell-gbonus'), e.spellCheck);
    }

    // Weapon Mastery (talent) — newly mastered weapon gains its full value now:
    // +1 atk/dmg plus half the character's level (round down).
    let m = f.match(/Weapon Mastery with one additional weapon type — (.+)$/i);
    if(m) {
      const wname = m[1].trim();
      const wn = wname.toLowerCase();
      const gain = masteryBonus(_lvl.newLevel);
      if(!_charMastery.some(x=>x.toLowerCase()===wn)) _charMastery.push(wname);
      rows.forEach(row=>{
        let nm = (row.querySelector('.atk-name')?.value||'').trim();
        const bs = nm.match(/^Backstab \((.+)\)$/i);
        if(bs) nm = bs[1];
        if(nm.toLowerCase()===wn) {
          const dEl = row.querySelector('.atk-damage');
          bumpVal(row.querySelector('.atk-bonus'), gain);
          if(dEl && dEl.value.trim()) dEl.value = bumpDmg(dEl.value.trim(), gain);
        }
      });
    }

    // Ranger d12 — chosen weapon: damage dice become d12
    m = f.match(/d12 damage with one weapon type you choose — (.+)$/i);
    if(m) {
      const wn = m[1].trim().toLowerCase();
      rows.forEach(row=>{
        let nm = (row.querySelector('.atk-name')?.value||'').trim();
        const bs = nm.match(/^Backstab \((.+)\)$/i);
        if(bs) nm = bs[1];
        const dEl = row.querySelector('.atk-damage');
        if(nm.toLowerCase()===wn && dEl && dEl.value.trim()) {
          dEl.value = dEl.value.replace(/d\d+/g, 'd12');
        }
      });
    }

    // Thief: Backstab +1 dice
    if(/Backstab deals \+1 dice/i.test(f)) {
      rows.forEach(row=>{
        const dEl = row.querySelector('.atk-damage');
        if(/^Backstab/i.test(row.querySelector('.atk-name')?.value||'') && dEl && dEl.value.trim()) {
          dEl.value = dEl.value.replace(/(\d+)d/g, (_,n)=>(parseInt(n)+1)+'d');
        }
      });
    }

    // Armor talent: +1 AC. Stored as innate AC so it persists and feeds the
    // derived AC directly (no need to rename gear).
    m = f.match(/Choose one armor type, get \+1 AC from it — (.+)$/i);
    if(m) {
      _innateAC = (parseInt(_innateAC)||0) + 1;
      if(typeof refreshAutoAC === 'function') refreshAutoAC();
      addLog('Armor Talent', '<svg class="dcc-ico" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:-0.14em"><path d="M12 2 4.5 5.2v6.4C4.5 16.9 8 20.6 12 22.3c4-1.7 7.5-5.4 7.5-10.7V5.2z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.1a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Z" opacity=".55"/></svg>', '+1 AC (' + m[1].trim() + ')', 'normal');
    }
  })();

  // ── Homebrew class talents: apply structured effects at level-up ──
  (function(){
    const ci = RC_CLASS_INFO[_lvl.cls];
    if(!ci || !ci._hb || !Array.isArray(ci._talentEff)) return;
    const idx = _hbTalentRowIndex(_lvl.cls, _lvl.talentRoll, _lvl.talentPick);
    if(idx < 0) return;
    const effs = ci._talentEff[idx];
    if(!Array.isArray(effs) || !effs.length) return;
    const agg = _hbEmptyEff();
    if(Array.isArray(ci._talentChoose) && ci._talentChoose[idx]){
      const e = (_lvl.hbTalentChoice != null) ? effs[_lvl.hbTalentChoice] : null;
      if(e) _hbAccumEffect(agg, e);
    } else {
      effs.forEach(e => _hbAccumEffect(agg, e));
    }
    // Resolve the talent's player-choice effects (stat / advantage / weapon die).
    _hbExpandChoices(_lvl, _hbGatherTalentChoices(_lvl.cls,_lvl.talentRoll,_lvl.talentPick,_lvl.hbTalentChoice,'tm')).forEach(ch => _hbApplyChoice(agg, ch, (_lvl.hbChoices||{})[ch.key]));

    // Stats
    const smap = {str:'str-val',dex:'dex-val',con:'con-val',int:'int-val',wis:'wis-val',cha:'cha-val'};
    Object.keys(smap).forEach(k=>{ if(agg[k]){ const el=document.getElementById(smap[k]); if(el){ el.value=String((parseInt(el.value)||10)+agg[k]); el.dispatchEvent(new Event('input')); } } });
    // HP
    if(agg.hp){ const hm=document.getElementById('hp-max'), hc=document.getElementById('hp-current'); if(hm) hm.value=String((parseInt(hm.value)||0)+agg.hp); if(hc) hc.value=String((parseInt(hc.value)||0)+agg.hp); }
    // AC (innate)
    if(agg.ac){ _innateAC=(parseInt(_innateAC)||0)+agg.ac; if(typeof refreshAutoAC==='function') refreshAutoAC(); }
    // Gear slots (homebrew)
    if(agg.gearSlots){ _hbBonusSlots=(parseInt(_hbBonusSlots)||0)+agg.gearSlots; if(typeof refreshGearSlots==='function') refreshGearSlots(); }
    // Feature charges (homebrew)
    if(agg.featureCharges && Object.keys(agg.featureCharges).length){ Object.keys(agg.featureCharges).forEach(fn=>{ _hbFeatureChargeBonus[fn]=(parseInt(_hbFeatureChargeBonus[fn])||0)+agg.featureCharges[fn]; }); if(typeof renderTalentsView==='function') renderTalentsView(); }
    // Spellcasting checks
    if(agg.spellCheck){ const el=document.getElementById('spell-gbonus'); if(el){ const cur=parseInt((el.value||'').replace(/^\+/,''))||0; const v=cur+agg.spellCheck; el.value=v>0?'+'+v:(v<0?String(v):''); } }

    const rows=[...document.querySelectorAll('#attacks-body tr')];
    const bumpVal=(el,n)=>{ if(!el||!n)return; const cur=parseInt((el.value||'').replace(/^\+/,''))||0; const v=cur+n; el.value=v>0?'+'+v:(v<0?String(v):''); };
    const bumpDmg=(d,n)=> d.split('/').map(part=>{ const mm=part.match(/^(.*?)([+-]\d+)?$/); const mod=(parseInt(mm[2]||'0'))+n; return mm[1]+(mod>0?'+'+mod:(mod<0?String(mod):'')); }).join('/');
    const nameOf=(row)=>{ let nm=(row.querySelector('.atk-name')?.value||'').trim(); const bs=nm.match(/^Backstab \((.+)\)$/i); return bs?bs[1]:nm; };
    const typeOf=(row)=>{ const nm=nameOf(row); const w=(typeof allWeapons==='function')?allWeapons().find(x=>x.name.toLowerCase()===nm.toLowerCase()):null; if(w) return w.type==='R'?'ranged':'melee'; const rng=row.querySelector('.atk-range')?.value||''; return rng==='Close'?'melee':(rng?'ranged':'melee'); };
    // Attack / damage bonuses
    if(agg.meleeAtk||agg.rangedAtk||agg.meleeDmg||agg.rangedDmg){
      rows.forEach(row=>{ const t=typeOf(row); const bEl=row.querySelector('.atk-bonus'), dEl=row.querySelector('.atk-damage'); const b=t==='melee'?agg.meleeAtk:agg.rangedAtk; const d=t==='melee'?agg.meleeDmg:agg.rangedDmg; if(b)bumpVal(bEl,b); if(d&&dEl&&dEl.value.trim())dEl.value=bumpDmg(dEl.value.trim(),d); });
    }
    // Weapon damage die (stacking): already-altered weapon adds a die, else upgrades
    const dieKeys=Object.keys(agg.weaponDice||{});
    if(dieKeys.length){
      rows.forEach(row=>{
        const nm=nameOf(row);
        const spec=agg.weaponDice[nm]; const all=agg.weaponDice['*'];
        if(!spec && !all) return;
        const size=Math.max(spec?spec.size:0, all?all.size:0);
        const dEl=row.querySelector('.atk-damage'); if(!dEl||!dEl.value.trim()) return;
        const base=(typeof allWeapons==='function')?allWeapons().find(x=>x.name.toLowerCase()===nm.toLowerCase()):null;
        const baseM=(base&&base.damage||'').match(/(\d*)d(\d+)/);
        const baseCount=baseM?parseInt(baseM[1]||'1'):1, baseSize=baseM?parseInt(baseM[2]):0;
        dEl.value=dEl.value.trim().replace(/(\d*)d(\d+)/, (m,c,s)=>{ const bc=parseInt(c||'1'), bsz=parseInt(s); const altered=(bc>baseCount)||(bsz>baseSize); return altered ? (bc+1)+'d'+bsz : bc+'d'+Math.max(bsz,size); });
      });
    }
    // Learn spells
    const lvlLearn = (agg.learnSpells||[]).slice();
    (_lvl.hbTalentSpells||[]).forEach(sp=>{sp=(sp||'').trim();if(sp)lvlLearn.push(sp);});   // "Learn Spell → Player Choice"
    lvlLearn.forEach(name=>{ if(!name) return; const s=findSpell(name,_lvl.cls)||{name:name}; _spellCount++; const row=addSpellRow(_spellCount); if(!row) return; const q=(cl)=>row.querySelector(cl); const inp=q('.spell-input'); if(inp)inp.value=name; const lvl=q('.spell-level'); if(lvl&&s.tier)lvl.value=s.tier; const rng=q('.spell-range'); if(rng&&s.range)rng.value=s.range; const dur=q('.spell-duration'); if(dur&&s.duration)dur.value=s.duration; const dmg=q('.spell-damage'); if(dmg){const _d=spellRollDice(s); if(_d)dmg.value=_d;} const dsc=q('.spell-desc'); if(dsc&&s.desc){dsc.value=s.desc;autoResizeDesc(dsc);} });
    // Advantage on spells
    (agg.advSpells||[]).forEach(name=>{ document.querySelectorAll('#spells-list .spell-row').forEach(row=>{ const nm=row.querySelector('.spell-input')?.value.trim(); if(nm&&nm.toLowerCase()===String(name).toLowerCase()){ const ab=row.querySelector('.spell-adv-btn'); if(ab)ab.classList.add('on'); } }); });
  })();

  // Auto-toggle advantage: talent-chosen spell + Magic Missile
  const lvlAdvSpells = new Set(['Magic Missile']);
  [(_lvl.tres), (_lvl.tres && _lvl.tres.sub)].forEach(p=>{
    if(p && p.kind==='spellknown' && p.picked) lvlAdvSpells.add(p.picked);
  });
  document.querySelectorAll('#spells-list .spell-row').forEach(row=>{
    const nm = row.querySelector('.spell-input')?.value.trim();
    if(nm && lvlAdvSpells.has(nm)) {
      const ab = row.querySelector('.spell-adv-btn');
      if(ab) ab.classList.add('on');
    }
  });


  // ── Half-level scaling (Shadowdark) ──
  // Weapon Mastery: "add half your level to these rolls (round down)".
  // Backstab: "add additional weapon dice equal to half your level (round down)".
  // floor(level/2) ticks up by 1 exactly on even levels, so scale then.
  if(_lvl.newLevel % 2 === 0) {
    const rows2 = [...document.querySelectorAll('#attacks-body tr')];
    const bump = (el, n) => {
      if(!el) return;
      const cur = parseInt(el.value) || 0;
      const v = cur + n;
      el.value = v > 0 ? '+'+v : (v < 0 ? String(v) : '');
    };
    const bumpDmg2 = (d, n) => d.split('/').map(part=>{
      const m = part.match(/^(.*?)([+-]\d+)?$/);
      const mod = (parseInt(m[2]||'0')) + n;
      return m[1] + (mod > 0 ? '+'+mod : (mod < 0 ? String(mod) : ''));
    }).join('/');
    // Add one damage die: "2d6+1" → "3d6+1"
    const addDie = (d) => d.split('/').map(part =>
      part.replace(/(\d*)d(\d+)/, (mm, n0, faces) => ((parseInt(n0)||1) + 1) + 'd' + faces)
    ).join('/');

    rows2.forEach(row=>{
      const bEl = row.querySelector('.atk-bonus'), dEl = row.querySelector('.atk-damage');
      let nm = (row.querySelector('.atk-name')?.value || '').trim();
      if(!nm) return;
      const bs = nm.match(/^Backstab \((.+)\)$/i);
      const weaponName = bs ? bs[1] : nm;

      // Weapon Mastery: +1 attack and +1 damage on mastered weapon types
      if(_charMastery.some(x => x.toLowerCase() === weaponName.toLowerCase())) {
        bump(bEl, 1);
        if(dEl && dEl.value.trim()) dEl.value = bumpDmg2(dEl.value.trim(), 1);
      }
      // Backstab: one more weapon die of damage
      if(bs && _lvl.cls === 'Thief' && dEl && dEl.value.trim()) {
        dEl.value = addDie(dEl.value.trim());
      }
    });
  }

  saveSheet(false);
  addLog('Level Up','⬆','Now level '+_lvl.newLevel+' (+'+_lvl.hpRoll+' HP'+(_lvl.talent?', new talent':'')+(_lvl.newSpells.length?', '+_lvl.newSpells.length+' new spell'+(_lvl.newSpells.length>1?'s':''):'')+')','normal');
  lvlClose();
  updateHeaderButton();
}

// ── Swap Create/Level Up button based on sheet state ──────────────────────
function updateHeaderButton() {
  const btn = document.getElementById('hdr-create-btn');
  if(!btn) return;
  const hasChar = (document.getElementById('f-name')?.value.trim()) && (document.getElementById('f-class')?.value.trim());
  if(hasChar) {
    btn.textContent = '⬆'; btn.title = 'Level up'; btn.setAttribute('aria-label', 'Level up');
    btn.onclick = startLevelUp;
  } else {
    btn.textContent = '✨'; btn.title = 'Create character'; btn.setAttribute('aria-label', 'Create character');
    btn.onclick = startCharWizard;
  }
}

// Init: swap button based on existing character + watch for changes
updateHeaderButton();
document.getElementById('f-name')?.addEventListener('input', updateHeaderButton);
document.getElementById('f-class')?.addEventListener('input', updateHeaderButton);
document.getElementById('f-level')?.addEventListener('input', refreshScalingHeals);
document.getElementById('f-level')?.addEventListener('input', refreshXpNext);
refreshXpNext();   // populate on first load
