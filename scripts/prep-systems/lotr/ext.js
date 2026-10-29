// ══ The Lord of the Rings 5e plug-in ════════════════════════════════════════
// What the Loremaster chapter builds an Adventuring Phase from, on the shared
// template: the five questions, Schemes, the Fellowship Phase and the optional Eye
// Awareness (Phase tab); Rumours (Clues tab); Councils (Encounters tab); Hoards and
// the Treasure Index (Treasure tab); journey legs with hexes by terrain, Perilous
// Areas and rolled events (the Travel module, called Journeys) and Landmarks
// (Journeys tab). Numbers come from /tools-data/lotr-data.js (window.LOTR_*); all
// text here is our own. The leg calculator itself lives in prep-registry.js
// (TRAVEL.LOTR) so the GM Screen shows the same days, XP and fatigue.
const LJ = () => (typeof LOTR_JOURNEY !== 'undefined' ? LOTR_JOURNEY : null);
const LC = () => (typeof LOTR_COUNCIL !== 'undefined' ? LOTR_COUNCIL : null);
const LT = () => (typeof LOTR_TREASURE !== 'undefined' ? LOTR_TREASURE : null);
const LE = () => (typeof LOTR_EYE !== 'undefined' ? LOTR_EYE : null);
const LF = () => (typeof LOTR_FELLOWSHIP_PHASE !== 'undefined' ? LOTR_FELLOWSHIP_PHASE : null);
const LOTR_REGIONS = ['Border Land','Wild Land','Dark Land'];
const LOTR_SEASONS = ['Spring','Summer','Autumn','Winter'];
const LOTR_TERRAINS = [{v:'road',l:'Road'},{v:'open',l:'Open'},{v:'hard',l:'Hard'}];
const LOTR_ROLES = ['Scouts','Look-outs','Hunters','Guide','Whole Company'];
const LOTR_HOARD_RATINGS = ['Lesser','Greater','Marvellous'];
const LOTR_TI_KINDS = ['Marvellous Artefact','Wondrous Item','Famous Weapon','Famous Armour'];
function lrnd(n){ return 1 + Math.floor(Math.random() * n); }
function lpick(a){ return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ''; }
function lnum(x){ const n = parseInt(String(x||'').replace(/[^\d-]/g,''), 10); return isNaN(n) ? 0 : n; }
// "2d8", "1d6−3 (min 0)" → { total, dice:[…] }
function lrollExpr(expr){
  const m = /(\d+)d(\d+)\s*([+\-−]\s*\d+)?/.exec(String(expr || ''));
  if(!m) return { total: 0, dice: [] };
  const dice = []; for(let i = 0; i < +m[1]; i++) dice.push(lrnd(+m[2]));
  let t = dice.reduce((a, b) => a + b, 0) + (m[3] ? parseInt(m[3].replace('−','-').replace(/\s+/g,''), 10) : 0);
  if(/min 0/.test(String(expr))) t = Math.max(0, t);
  return { total: t, dice };
}
function lregionKey(r){ return /border/i.test(r||'') ? 'border' : /dark/i.test(r||'') ? 'dark' : 'wild'; }
function lcv(card, cls){ const el = card.querySelector('.' + cls); if(!el) return ''; return el.type === 'checkbox' ? !!el.checked : String(el.value || '').trim(); }
function lopts(list, cur){ return list.map(o => { const v = typeof o === 'string' ? o : o.v, l = typeof o === 'string' ? o : o.l; return `<option value="${escA(v)}"${String(v) === String(cur||'') ? ' selected' : ''}>${escH(l)}</option>`; }).join(''); }
function lin(cls, val, ph, extra){ return `<input type="text" class="${cls}" value="${escA(val||'')}" placeholder="${escA(ph||'')}" oninput="autosave()"${extra||''}>`; }
function lta(cls, val, ph){ return `<textarea class="${cls} short" placeholder="${escA(ph||'')}" oninput="autosave()">${escH(val||'')}</textarea>`; }
function lsel(cls, list, cur, blank){ return `<select class="${cls}" onchange="autosave()">${blank ? '<option value="">' + escH(blank) + '</option>' : ''}${lopts(list, cur)}</select>`; }
function lfg(label, html, lcls){ return `<div class="field-group"><label class="field-label${lcls ? ' ' + lcls : ''}">${escH(label)}</label>${html}</div>`; }
function lrow(cells){ return '<div class="lotr-row field-group">' + cells.map(c => `<div style="flex:${c[2]||1};min-width:0"><label class="field-label">${escH(c[0])}</label>${c[1]}</div>`).join('') + '</div>'; }
function lcard(listId, cls, header, inner){
  const list = document.getElementById(listId); if(!list) return null;
  const div = document.createElement('div'); div.className = 'entity-card ' + cls;
  div.innerHTML = `<div class="entity-card-header">${header}<button class="btn-remove" onclick="this.closest('.entity-card').remove();autosave()">✕</button></div>` + inner;
  list.appendChild(div); return div;
}
function ltitle(cls, val, ph){ return `<input class="entity-name-input ${cls}" type="text" placeholder="${escA(ph)}" value="${escA(val||'')}" oninput="autosave()">`; }

// ── Rumours ──
function addRumour(data={}) {
  lcard('rumours-list', 'lotr-rumour', '<span class="field-label gold" style="margin:0">Rumour</span>',
    lfg('Rumour', lta('ru-text', data.text, 'What folk are saying...'))
    + lrow([['Truth', lsel('ru-truth', ['Unknown','True','Partly true','False'], data.truth || 'Unknown')], ['Heard from', lin('ru-source', data.source, 'e.g. a pedlar at the Pony'), 1.4]]));
}
// ── Schemes ──
function addScheme(data={}) {
  lcard('schemes-list', 'lotr-scheme', ltitle('sc-name', data.name, 'Scheme name'),
    lrow([['Schemer', lin('sc-villain', data.villain, 'Who is behind it'), 1], ['Aim', lin('sc-aim', data.aim, 'What they want'), 1.3]])
    + lfg('Moves (one per line, in order)', lta('sc-steps', data.steps, 'What they do next if left alone...'))
    + lfg('If unchecked', lta('sc-unchecked', data.unchecked, 'How the world is worse at the end of the Phase...')));
}

// ── Journey legs (the Travel module): hexes by terrain, Perilous Areas, events ──
function jPerilRow(p={}) {
  const d = document.createElement('div'); d.className = 'lotr-subrow jr-peril';
  d.innerHTML = lin('jp-name', p.name, 'Perilous Area', ' style="flex:1;min-width:0"')
    + lin('jp-rating', p.rating, 'Peril', ' style="width:46px;flex:0 0 auto;text-align:center" title="Peril rating"')
    + `<select class="jp-terrain" onchange="autosave()" style="width:64px;flex:0 0 auto">${lopts(LOTR_TERRAINS, p.terrain || 'hard')}</select>`
    + `<button class="btn-remove" onclick="this.closest('.lotr-subrow').remove();autosave()">✕</button>`;
  return d;
}
function jEventRow(e={}) {
  const J = LJ(); const names = J ? J.events.map(x => x.name) : [];
  const d = document.createElement('div'); d.className = 'lotr-subrow jr-event';
  d.innerHTML = lin('je-roll', e.roll, 'd20', ' style="width:38px;flex:0 0 auto;text-align:center" title="The d20 result"')
    + `<select class="je-name" onchange="autosave()" style="flex:1;min-width:0">${lopts(['', ...names], e.name)}</select>`
    + `<select class="je-target" onchange="autosave()" style="width:78px;flex:0 0 auto">${lopts(['', ...LOTR_ROLES], e.target)}</select>`
    + `<button class="btn-remove" onclick="this.closest('.lotr-ev-wrap').remove();autosave()">✕</button>`;
  const wrap = document.createElement('div'); wrap.className = 'lotr-ev-wrap';
  wrap.appendChild(d);
  const idea = document.createElement('div'); idea.innerHTML = lin('je-idea', e.idea, 'What happens — an idea for the scene', ' style="margin:2px 0 6px"');
  wrap.appendChild(idea.firstChild);
  return wrap;
}
// Roll one journey event for a leg: d20 (advantage in a Border Land,
// disadvantage in a Dark Land), d3 for the target role, an idea to seed the scene.
function lotrRollJourneyEvent(region) {
  const J = LJ(); if(!J) return null;
  const k = lregionKey(region);
  const a = lrnd(20), b = lrnd(20);
  const d20 = k === 'border' ? Math.max(a, b) : k === 'dark' ? Math.min(a, b) : a;
  const ev = J.events.find(e => d20 >= e.min && d20 <= e.max) || J.events[0];
  const t = J.eventTarget[lrnd(3) - 1];
  const ideas = (J.eventIdeas || {})[ev.name] || [];
  return { roll: String(d20), rolls: k === 'wild' ? [a] : [a, b], name: ev.name, target: t ? t.role : '', check: t ? t.check : '', idea: lpick(ideas), fatigue: ev.fatigue, effect: ev.effect };
}
function jRollEvent(btn) {
  const card = btn.closest('.travel-card');
  const r = lotrRollJourneyEvent(lcv(card, 'jr-region'));
  if(!r) return;
  card.querySelector('.jr-events').appendChild(jEventRow(r));
  autosave();
}
PLUG.travel.fields = function(data){
  return lrow([['Region', lsel('jr-region', LOTR_REGIONS, data.region || 'Wild Land')], ['Season', lsel('jr-season', LOTR_SEASONS, data.season, '(Phase)')]])
    + `<label class="field-label">Hexes by terrain</label>`
    + lrow([['Road', lin('jr-road', data.road, '0')], ['Open', lin('jr-open', data.open, '0')], ['Hard', lin('jr-hard', data.hard, '0')]])
    + `<label class="field-label">Perilous Areas</label><div class="jr-perils"></div>`
    + `<button class="btn-add btn-mini" onclick="this.previousElementSibling.appendChild(jPerilRow());autosave()">+ Perilous Area</button>`
    + `<label class="field-label" style="margin-top:8px">Journey events (planned or rolled)</label><div class="jr-events"></div>`
    + `<div style="display:flex;gap:6px;"><button class="btn-add btn-mini" style="flex:1" onclick="this.closest('.travel-card').querySelector('.jr-events').appendChild(jEventRow());autosave()">+ Event</button>`
    + `<button class="btn-add btn-mini btn-roll" style="flex:1" onclick="jRollEvent(this)">🎲 Roll event</button></div>`;
};
PLUG.travel.after = function(card, data){
  (data.perils || []).forEach(p => card.querySelector('.jr-perils').appendChild(jPerilRow(p)));
  (data.events || []).forEach(e => card.querySelector('.jr-events').appendChild(jEventRow(e)));
};
PLUG.travel.read = function(c){
  return { region: lcv(c,'jr-region'), season: lcv(c,'jr-season'), road: lcv(c,'jr-road'), open: lcv(c,'jr-open'), hard: lcv(c,'jr-hard'),
    perils: [...c.querySelectorAll('.jr-peril')].map(r => ({ name: lcv(r,'jp-name'), rating: lcv(r,'jp-rating'), terrain: lcv(r,'jp-terrain') })).filter(p => p.name || p.rating),
    events: [...c.querySelectorAll('.lotr-ev-wrap')].map(r => ({ roll: lcv(r,'je-roll'), name: lcv(r,'je-name'), target: lcv(r,'je-target'), idea: lcv(r,'je-idea') })).filter(e => e.name || e.idea),
    // A leg left on "(Phase)" takes the Adventuring Phase's season for the cold-season warning.
    _phaseSeason: v('f-ph-season') };
};
PLUG.travel.preview = function(j){
  const J = LJ(); let h = '';
  if((j.perils || []).length) h += '<div class="lotr-perils">' + j.perils.map(p => '<span class="lotr-peril">⚠ ' + escH(p.name || 'Perilous Area') + ' · Peril ' + escH(p.rating || '?') + '</span>').join('') + '</div>';
  if((j.events || []).length) {
    h += '<table class="rt-table lotr-tbl"><tbody>' + j.events.map(e => {
      const ev = J && J.events.find(x => x.name === e.name);
      return '<tr><td class="rt-roll">' + escH(e.roll || '—') + '</td><td><b>' + escH(e.name || 'Event') + '</b>' + (e.target ? ' <span class="lotr-src">· ' + escH(e.target) + '</span>' : '')
        + (ev ? ' <span class="lotr-fat">+' + ev.fatigue + '</span>' : '') + (e.idea ? '<br>' + escH(e.idea) : '') + '</td></tr>';
    }).join('') + '</tbody></table>';
  }
  return h;
};

// ── Councils ──
function lotrCouncilCalc(c) {
  const C = LC(); if(!C) return { dc: '', succ: '', xp: '', woe: '' };
  const at = C.attitudes.find(a => a.name === c.attitude) || C.attitudes[1];
  const rq = C.requests.find(r => r.name === c.request) || C.requests[0];
  const row = C.xp.find(x => x.audience === at.name) || {};
  const cell = String(row[rq.name.toLowerCase()] || '');
  const m = /([\d,]+)\s*\(([\d,]+)\)/.exec(cell);
  return { dc: at.dc, succ: rq.successes, xp: m ? m[1] : cell, woe: m ? m[2] : '', attitude: at.name, request: rq.name };
}
function addCouncil(data={}) {
  const C = LC();
  lcard('councils-list', 'lotr-council', ltitle('co-name', data.name, 'Council (e.g. Audience with the Master of Bree)'),
    lfg('Audience — who they face', lin('co-audience', data.audience, 'Who listens, and what matters to them'))
    + lrow([['Attitude', lsel('co-attitude', C ? C.attitudes.map(a => ({ v: a.name, l: a.name + ' (DC ' + a.dc + ')' })) : ['Friendly','Open','Reluctant'], data.attitude || 'Open')],
            ['Request', lsel('co-request', C ? C.requests.map(r => ({ v: r.name, l: r.name + ' (' + r.successes + ')' })) : ['Reasonable','Bold','Outrageous'], data.request || 'Reasonable')]])
    + lfg('The request', lin('co-ask', data.ask, 'What the Company asks for'), 'accent')
    + lfg('Introduction (DC 15 CHA)', lta('co-intro', data.intro, 'Who speaks first, and how — Intimidation, Persuasion or Deception? What it reveals...'))
    + lfg('What sways them', lta('co-sway', data.sway, 'Topics that earn advantage; skills that help (Insight, Riddle, Performance)...'))
    + lfg('Success', lta('co-success', data.success, 'What the Company gets...'), 'green')
    + lfg('Success with woe', lta('co-woe', data.woe, 'Less than hoped, or a new enemy...'))
    + lfg('Disaster', lta('co-disaster', data.disaster, 'Seen as a threat — what follows?'))
    + `<div class="lotr-calc co-calc"></div>`);
}
// ── Landmarks ──
function addLandmark(data={}) {
  lcard('landmarks-list', 'lotr-landmark', ltitle('lm-name', data.name, 'Landmark name (e.g. the old name locals use)'),
    lfg('Rumour', lta('lm-rumour', data.rumour, 'What the heroes hear — truth mixed with hearsay'), 'accent')
    + lfg('Old Lore (DC 15 INT)', lta('lm-oldlore', data.oldlore, 'What research turns up...'))
    + lfg('Background', lta('lm-background', data.background, 'For the Loremaster: what it is, why it matters, how far from a known place'))
    + lfg('Journey events nearby', lta('lm-events', data.events, 'Accidents and encounters on the approach'))
    + lfg('Locations', lta('lm-locations', data.locations, 'One per line — Name: what is there (treasure, denizens)'))
    + lfg('Schemes & trouble', lta('lm-trouble', data.trouble, 'Outside forces that interfere; self-contained events')));
}
// ── Hoards ──
function addHoard(data={}) {
  lcard('hoards-list', 'lotr-hoard', ltitle('ho-name', data.name, 'Hoard (e.g. the Troll-hole under the hill)'),
    lrow([['Rating', lsel('ho-rating', LOTR_HOARD_RATINGS, data.rating || 'Lesser')], ['Value (gold)', lin('ho-value', data.value, 'e.g. 11 g')], ['Greed DC', lin('ho-greed', data.greed, 'auto')]])
    + `<div style="display:flex;gap:6px;margin-bottom:8px;"><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="hoardRoll(this)">🎲 Roll hoard</button>`
    + `<button class="btn-add btn-mini" style="flex:1" onclick="hoardPrecious(this)">+ Precious object</button>`
    + `<button class="btn-add btn-mini" style="flex:1" onclick="hoardCurse(this)">🎲 Curse</button></div>`
    + lfg('Magical treasure (one result per line)', lta('ho-magic', data.magic, 'e.g. d20 17 — Marvellous Artefact: boots blessed with Stealth'), 'accent')
    + lfg('Precious objects & other contents', lta('ho-notes', data.notes, 'Jewels, coin, trade goods...'))
    + lfg('Curse', lin('ho-curse', data.curse, 'None — or what lies dormant on it')));
}
function lotrRollHoard(rating) {
  const T = LT(); if(!T) return null;
  const h = T.hoards.find(x => x.rating === rating) || T.hoards[0];
  const val = lrollExpr(h.value);
  const finds = [];
  let greed = 0;
  for(let i = 0; i < h.magicRolls; i++) {
    const d = lrnd(20);
    const row = T.magical.find(r => d >= r.min && d <= r.max) || T.magical[0];
    const sh = lrollExpr(row.shadow); greed += sh.total;
    let detail = '';
    if(/Artefact/.test(row.result)) detail = lotrBlessingText(1);
    else if(/Wondrous/.test(row.result)) detail = lotrBlessingText(2);
    else if(/Famous/.test(row.result)) detail = 'pick from the Treasure Index (or design: craftsmanship, banes, qualities)';
    finds.push({ d, result: row.result, detail, shadow: sh.total });
  }
  return { rating: h.rating, value: val.total, valueDice: h.value, dice: val.dice, finds, greed, greedDC: h.greedDC };
}
function lotrBlessingText(n) {
  const T = LT(); if(!T) return '';
  const skills = [];
  let obj = '';
  let guard = 0;
  while(skills.length < n && guard++ < 20) {
    const b = T.blessings[lrnd(20) - 1];
    if(!b || /twice/i.test(b.skill)) continue;
    if(skills.indexOf(b.skill) >= 0) continue;
    skills.push(b.skill);
    if(!obj) obj = lpick(String(b.objects || '').split(',').map(x => x.trim()).filter(Boolean));
  }
  return (obj ? obj + ' — ' : '') + 'blessed with ' + skills.join(' & ');
}
function hoardRoll(btn) {
  const card = btn.closest('.entity-card');
  const r = lotrRollHoard(lcv(card, 'ho-rating')); if(!r) return;
  card.querySelector('.ho-value').value = r.value + ' g (' + r.valueDice + ')';
  card.querySelector('.ho-greed').value = String(r.greedDC);
  card.querySelector('.ho-magic').value = r.finds.map(f => 'd20 ' + f.d + ' — ' + f.result + (f.detail ? ': ' + f.detail : '') + ' · Greed Shadow ' + f.shadow).join('\n');
  autosave();
}
function lotrPrecious() {
  const T = LT(); if(!T || !T.precious) return '';
  const P = T.precious;
  return lpick(P.form) + ' of ' + String(lpick(P.material)).toLowerCase() + ' — ' + lpick(P.craft) + ' work';
}
function hoardPrecious(btn) {
  const ta = btn.closest('.entity-card').querySelector('.ho-notes');
  ta.value = (ta.value ? ta.value.replace(/\s+$/,'') + '\n' : '') + 'Precious object: ' + lotrPrecious();
  autosave();
}
function lotrCurse() { const T = LT(); const c = T && lpick(T.curses || []); return c ? c.name + ' — ' + c.text : ''; }
function hoardCurse(btn) { const el = btn.closest('.entity-card').querySelector('.ho-curse'); el.value = lotrCurse(); autosave(); }
// ── Treasure Index ──
function addTIndex(data={}) {
  lcard('tindex-list', 'lotr-tindex', ltitle('ti-item', data.item, 'Item name (e.g. the Silver Harp of Lindon)'),
    lrow([['For (hero)', lin('ti-hero', data.hero, 'Player-hero')], ['Kind', lsel('ti-kind', LOTR_TI_KINDS, data.kind || 'Marvellous Artefact'), 1.4]])
    + lrow([['Object', lin('ti-object', data.object, 'ring, cloak, sword...')], ['Curse', lin('ti-curse', data.curse, 'none')]])
    + lfg('Blessings / qualities', lta('ti-blessings', data.blessings, 'Blessed skills (Artefact 1, Wondrous Item 2) — or craftsmanship, banes and qualities for war gear'), 'accent')
    + `<div style="display:flex;gap:6px;margin-bottom:6px;"><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="tiRollBlessings(this)">🎲 Blessings</button><button class="btn-add btn-mini" style="flex:1" onclick="tiRollCurse(this)">🎲 Curse</button></div>`
    + lfg('Notes', lta('ti-notes', data.notes, 'Where it lies, its history, its name...')));
}
function tiRollBlessings(btn) {
  const card = btn.closest('.entity-card'); const kind = lcv(card, 'ti-kind');
  if(/Famous/.test(kind)) {
    const craft = lpick(['Elven','Dwarven','Númenórean']);
    const banes = craft === 'Elven' ? [lpick(['Orcs','Wolves','Spiders'])] : craft === 'Númenórean' ? (() => { const a = ['Orcs','Trolls','Wolves','Evil Men','Undead']; const x = lpick(a); const y = lpick(a.filter(z => z !== x)); return [x, y]; })() : [];
    const ench = (typeof LOTR_ENCHANTED_REWARDS !== 'undefined' && LOTR_ENCHANTED_REWARDS.length) ? lpick(LOTR_ENCHANTED_REWARDS) : null;
    card.querySelector('.ti-blessings').value = craft + ' craftsmanship' + (banes.length ? ' · Bane of ' + banes.join(' & ') : '') + (ench ? ' · Quality: ' + (ench.name || ench) : '');
  } else {
    const txt = lotrBlessingText(/Wondrous/.test(kind) ? 2 : 1);
    const parts = txt.split(' — ');
    if(parts.length > 1 && !lcv(card, 'ti-object')) card.querySelector('.ti-object').value = parts[0];
    card.querySelector('.ti-blessings').value = parts[parts.length - 1].replace(/^blessed with /, '');
  }
  autosave();
}
function tiRollCurse(btn) { btn.closest('.entity-card').querySelector('.ti-curse').value = lotrCurse(); autosave(); }

// ── One-time sidebar furniture (datalists, checkbox lists) ──
function lotrInitStatic() {
  const dl = (id, arr) => { const el = document.getElementById(id); if(el) el.innerHTML = arr.map(x => '<option value="' + escA(x) + '">').join(''); };
  dl('lotr-havens', (typeof LOTR_SAFE_HAVENS !== 'undefined') ? LOTR_SAFE_HAVENS : []);
  dl('lotr-patrons', (typeof LOTR_PATRONS !== 'undefined') ? LOTR_PATRONS.map(p => p.name) : []);
  const F = LF(), E = LE();
  const und = document.getElementById('fp-undertakings');
  if(und && F) und.innerHTML = F.undertakings.map(u => '<label title="' + escA(u.effect || '') + '"><input type="checkbox" class="fp-und" value="' + escA(u.name) + '" onchange="autosave()"> ' + escH(u.name) + (u.yule ? ' <span class="lotr-tag">Yule</span>' : '') + '</label>').join('');
  const mods = document.getElementById('eye-mods');
  if(mods && E) mods.innerHTML = E.modifiers.map((m, i) => '<label><input type="checkbox" class="eye-mod" value="' + i + '" onchange="autosave()"> <b>' + escH(m.mod) + '</b> ' + escH(m.text) + '</label>').join('');
  const revs = document.getElementById('eye-revs');
  if(revs && E) revs.innerHTML = E.revelations.map(r => '<label title="' + escA(r.text) + '"><input type="checkbox" class="eye-rev" value="' + escA(r.name) + '" onchange="autosave()"> ' + escH(r.name) + '</label>').join('');
}
function lotrEyeCalc(e) {
  const E = LE(); if(!E) return null;
  const base = e.highelf ? 3 : e.elf ? 2 : e.dwarf ? 1 : 0;
  const start = base + lnum(e.pb4) + lnum(e.famous);
  const th = E.thresholds.find(t => t.region === e.region) || E.thresholds[1];
  const mod = (e.mods || []).reduce((s, i) => s + lnum(String((E.modifiers[i] || {}).mod || '0').replace('−','-')), 0);
  return { start, base, hunt: th.hunt + mod, huntBase: th.hunt, mod, region: th.region };
}
// The Eye as a Ticks tracker on the Adventure tab: one box per point of Awareness
// left before the Hunt threshold; when the last fills, the Company is revealed.
function lotrEyeTracker(){
  readFields();
  const k = lotrEyeCalc(state.eye || {}); if(!k) return;
  const left = Math.max(1, k.hunt - k.start);
  const list = document.getElementById('trackers-list');
  const old = [...list.querySelectorAll('.tracker-card')].find(c => /^eye awareness/i.test(c.querySelector('.tr-name')?.value || ''));
  if(old) old.remove();
  addTracker({ name: 'Eye Awareness', kind: 'ticks', size: left,
    finish: 'Hunt threshold ' + k.hunt + ' reached (from ' + k.start + '): the Company is revealed — a Revelation episode' }, list);
  autosave(); switchTab('adventure');
}

// ── DOM → state / state → DOM ──
PLUG.init = function(){ lotrInitStatic(); };
PLUG.read = function(){
  const chk = id => !!(document.getElementById(id) && document.getElementById(id).checked);
  state.phase = { year: v('f-ph-year'), season: v('f-ph-season'), region: v('f-ph-region'), place: v('f-ph-place'), where: v('f-ph-where'), what: v('f-ph-what'), why: v('f-ph-why'), who: v('f-ph-who') };
  const cards = id => [...document.querySelectorAll('#' + id + ' > .entity-card')];
  state.rumours = cards('rumours-list').map(c => ({ text: lcv(c,'ru-text'), truth: lcv(c,'ru-truth'), source: lcv(c,'ru-source') })).filter(r => r.text);
  state.schemes = cards('schemes-list').map(c => ({ name: lcv(c,'sc-name'), villain: lcv(c,'sc-villain'), aim: lcv(c,'sc-aim'), steps: lcv(c,'sc-steps'), unchecked: lcv(c,'sc-unchecked') })).filter(x => x.name || x.aim || x.steps);
  state.councils = cards('councils-list').map(c => {
    const o = { name: lcv(c,'co-name'), audience: lcv(c,'co-audience'), attitude: lcv(c,'co-attitude'), request: lcv(c,'co-request'), ask: lcv(c,'co-ask'),
      intro: lcv(c,'co-intro'), sway: lcv(c,'co-sway'), success: lcv(c,'co-success'), woe: lcv(c,'co-woe'), disaster: lcv(c,'co-disaster') };
    const k = lotrCouncilCalc(o), el = c.querySelector('.co-calc');
    if(el) el.innerHTML = 'Interaction <b>DC ' + k.dc + '</b> · <b>' + k.succ + '</b> success' + (k.succ === 1 ? '' : 'es') + ' needed<br>XP <b>' + k.xp + '</b> on success · ' + (k.woe || '0') + ' with woe';
    return o;
  }).filter(x => x.name || x.audience || x.ask);
  state.landmarks = cards('landmarks-list').map(c => ({ name: lcv(c,'lm-name'), rumour: lcv(c,'lm-rumour'), oldlore: lcv(c,'lm-oldlore'), background: lcv(c,'lm-background'), events: lcv(c,'lm-events'), locations: lcv(c,'lm-locations'), trouble: lcv(c,'lm-trouble') })).filter(x => x.name || x.background);
  state.hoards = cards('hoards-list').map(c => ({ name: lcv(c,'ho-name'), rating: lcv(c,'ho-rating'), value: lcv(c,'ho-value'), greed: lcv(c,'ho-greed'), magic: lcv(c,'ho-magic'), notes: lcv(c,'ho-notes'), curse: lcv(c,'ho-curse') })).filter(x => x.name || x.value || x.magic || x.notes);
  state.tindex = cards('tindex-list').map(c => ({ item: lcv(c,'ti-item'), hero: lcv(c,'ti-hero'), kind: lcv(c,'ti-kind'), object: lcv(c,'ti-object'), curse: lcv(c,'ti-curse'), blessings: lcv(c,'ti-blessings'), notes: lcv(c,'ti-notes') })).filter(x => x.item || x.blessings || x.hero);
  state.fellowship = { recovery: v('f-fp-recovery'), haven: v('f-fp-haven'), yule: chk('f-fp-yule'), patron: v('f-fp-patron'),
    undertakings: [...document.querySelectorAll('.fp-und:checked')].map(x => x.value), notes: v('f-fp-notes') };
  state.eye = { dwarf: chk('f-eye-dwarf'), elf: chk('f-eye-elf'), highelf: chk('f-eye-highelf'), pb4: v('f-eye-pb4'), famous: v('f-eye-famous'),
    region: v('f-eye-region') || 'Wild Land', mods: [...document.querySelectorAll('.eye-mod:checked')].map(x => +x.value), revelations: [...document.querySelectorAll('.eye-rev:checked')].map(x => x.value) };
  const ek = lotrEyeCalc(state.eye), eel = document.getElementById('eye-calc');
  if(eel && ek) eel.innerHTML = 'Starting Awareness <b>' + ek.start + '</b> · Hunt threshold <b>' + ek.hunt + '</b> (' + escH(ek.region) + ' ' + ek.huntBase + (ek.mod ? (ek.mod > 0 ? ' +' : ' ') + ek.mod : '') + ')<br>' + Math.max(0, ek.hunt - ek.start) + ' more points before the Company is revealed.';
  const sn = document.getElementById('ph-season-note');
  if(sn) sn.innerHTML = /autumn|winter/i.test(state.phase.season) ? '<span class="lotr-warn">' + escH(state.phase.season) + ': journey event checks (and their saves) are made at disadvantage.</span>' : (state.phase.region ? escH(state.phase.region) + ': ' + escH((LJ() && LJ().regionMod) || '') : '');
};
PLUG.build = function(){
  const P = state.phase || {};
  ['year','season','region','place','where','what','why','who'].forEach(k => setVal('f-ph-' + k, P[k]));
  const clear = id => { const el = document.getElementById(id); if(el) el.innerHTML = ''; };
  clear('rumours-list'); (state.rumours || []).forEach(r => addRumour(r));
  clear('schemes-list'); (state.schemes || []).forEach(r => addScheme(r));
  clear('councils-list'); (state.councils || []).forEach(r => addCouncil(r));
  clear('landmarks-list'); (state.landmarks || []).forEach(r => addLandmark(r));
  clear('hoards-list'); (state.hoards || []).forEach(r => addHoard(r));
  clear('tindex-list'); (state.tindex || []).forEach(r => addTIndex(r));
  const F = state.fellowship || {};
  setVal('f-fp-recovery', F.recovery); setVal('f-fp-haven', F.haven); setVal('f-fp-patron', F.patron); setVal('f-fp-notes', F.notes);
  const cb = (id, on) => { const el = document.getElementById(id); if(el) el.checked = !!on; };
  cb('f-fp-yule', F.yule);
  document.querySelectorAll('.fp-und').forEach(x => { x.checked = (F.undertakings || []).indexOf(x.value) >= 0; });
  const E = state.eye || {};
  cb('f-eye-dwarf', E.dwarf); cb('f-eye-elf', E.elf); cb('f-eye-highelf', E.highelf);
  setVal('f-eye-pb4', E.pb4); setVal('f-eye-famous', E.famous); setVal('f-eye-region', E.region || 'Wild Land');
  document.querySelectorAll('.eye-mod').forEach(x => { x.checked = (E.mods || []).indexOf(+x.value) >= 0; });
  document.querySelectorAll('.eye-rev').forEach(x => { x.checked = (E.revelations || []).indexOf(x.value) >= 0; });
};

// ── Print sections ──
// ── Preview blocks ──
function lsec(title, inner, cls) { return '<div class="p-section lotr-sec' + (cls ? ' ' + cls : '') + '"><div class="sl">' + title + '</div>' + inner + '</div>'; }
function lbadge(l, v, cls) { return (v === '' || v == null) ? '' : '<span class="lotr-badge' + (cls ? ' ' + cls : '') + '"><span>' + escH(l) + '</span>' + escH(String(v)) + '</span>'; }
function lline(l, v) { return (v && String(v).trim()) ? '<p class="loc-desc"><strong class="loc-lbl">' + escH(l) + ':</strong> ' + fmtText(v) + '</p>' : ''; }
PLUG.preview = function(where){
  const out = [];
  if(where === 'adventure') {
  const P = state.phase || {};
  if(['year','season','region','place','where','what','why','who'].some(k => P[k])) {
    const when = [P.year ? 'Year ' + P.year : '', P.season].filter(Boolean).join(' · ');
    const where = [P.place, P.region].filter(Boolean).join(' · ');
    out.push(lsec('The Adventuring Phase', '<div class="lotr-box">'
      + '<div class="lotr-badges">' + lbadge('When', when) + lbadge('Where', where) + '</div>'
      + (/autumn|winter/i.test(P.season || '') ? '<div class="lotr-note">' + escH(P.season) + ' — journey event checks and their saves are made at disadvantage.</div>' : '')
      + lline('Where', P.where) + lline('What', P.what) + lline('Why', P.why) + lline('Who', P.who) + '</div>'));
  }
  if((state.schemes || []).length) {
    out.push(lsec('Schemes', state.schemes.map(sc => '<div class="lotr-box lotr-shadowbox"><div class="entry-name">' + escH(sc.name || 'Scheme') + '</div>'
      + '<div class="lotr-badges">' + lbadge('Schemer', sc.villain) + lbadge('Aim', sc.aim) + '</div>'
      + (sc.steps ? '<ol class="lotr-ol">' + sc.steps.split('\n').filter(Boolean).map(x => '<li>' + escH(x) + '</li>').join('') + '</ol>' : '')
      + lline('If unchecked', sc.unchecked) + '</div>').join('')));
  }
  }
  if(where === 'clues') {
  if((state.rumours || []).length) {
    out.push(lsec('Rumours', state.rumours.map(r => '<div class="clue-item lotr-rumour-item">' + fmtText(r.text)
      + ' <span class="lotr-truth t-' + escA(String(r.truth || 'Unknown').toLowerCase().replace(/\s+/g,'-')) + '">' + escH(r.truth || 'Unknown') + '</span>'
      + (r.source ? ' <span class="lotr-src">— ' + escH(r.source) + '</span>' : '') + '</div>').join('')));
  }
  }
  if(where === 'treasure') {
  if((state.hoards || []).length) {
    const T = LT();
    out.push(lsec('Hoards', state.hoards.map(hd => {
      const H = T && T.hoards.find(x => x.rating === hd.rating);
      const dc = hd.greed || (H ? H.greedDC : '');
      return '<div class="lotr-box lotr-hoard-box"><div class="entry-name">' + escH(hd.name || (hd.rating + ' hoard')) + '</div>'
        + '<div class="lotr-badges">' + lbadge('Hoard', hd.rating) + lbadge('Value', hd.value || (H ? H.value + ' g' : ''), 'gold') + lbadge('Greed', dc ? 'WIS DC ' + dc : '', 'warn') + '</div>'
        + (hd.magic ? '<div class="lotr-magic">' + hd.magic.split('\n').filter(Boolean).map(x => '<div class="sb-ability">✦ ' + escH(x) + '</div>').join('') + '</div>' : '')
        + lline('Contents', hd.notes) + (hd.curse ? '<p class="loc-desc lotr-curse"><strong class="loc-lbl">Curse:</strong> ' + escH(hd.curse) + '</p>' : '') + '</div>';
    }).join('')));
  }
  if((state.tindex || []).length) {
    out.push(lsec('Treasure Index', '<table class="rt-table lotr-tbl"><tbody>' + state.tindex.map(t =>
      '<tr><td style="width:24%"><b>' + escH(t.hero || '—') + '</b></td><td><b>' + escH(t.item || 'Unnamed') + '</b> <span class="lotr-src">' + escH([t.kind, t.object].filter(Boolean).join(' · ')) + '</span>'
      + (t.blessings ? '<br>' + escH(t.blessings) : '') + (t.curse && !/^none$/i.test(t.curse) ? '<br><span class="lotr-curse">Curse: ' + escH(t.curse) + '</span>' : '') + (t.notes ? '<br><i>' + escH(t.notes) + '</i>' : '') + '</td></tr>').join('') + '</tbody></table>'));
  }
  }
  if(where === 'travel') {
  (state.landmarks || []).forEach(l => {
    out.push(lsec('Landmark' + (l.name ? ' — ' + escH(l.name) : ''), '<div class="lotr-box">'
      + (l.rumour ? '<div class="read-aloud"><p>' + fmtText(l.rumour) + '</p></div>' : '')
      + lline('Old Lore (DC 15 INT)', l.oldlore) + lline('Background', l.background) + lline('Journey events', l.events)
      + (l.locations ? '<div class="lotr-locs">' + l.locations.split('\n').filter(Boolean).map(x => '<div class="sb-ability">' + fmtText(x) + '</div>').join('') + '</div>' : '')
      + lline('Schemes & trouble', l.trouble) + '</div>'));
  });
  }
  if(where === 'scenes') {
  (state.councils || []).forEach(c => {
    const k = lotrCouncilCalc(c);
    out.push(lsec('Council' + (c.name ? ' — ' + escH(c.name) : ''), '<div class="lotr-box lotr-council-box">'
      + '<div class="lotr-badges">' + lbadge('Audience', k.attitude) + lbadge('DC', k.dc) + lbadge('Request', k.request) + lbadge('Successes', k.succ) + lbadge('XP', k.xp + (k.woe ? ' (' + k.woe + ')' : ''), 'gold') + '</div>'
      + lline('Before', c.audience) + lline('The request', c.ask) + lline('Introduction', c.intro) + lline('What sways them', c.sway)
      + (c.success || c.woe || c.disaster ? '<div class="lotr-outcomes">'
        + (c.success ? '<div class="lotr-oc ok"><b>Success</b> ' + fmtText(c.success) + '</div>' : '')
        + (c.woe ? '<div class="lotr-oc woe"><b>With woe</b> ' + fmtText(c.woe) + '</div>' : '')
        + (c.disaster ? '<div class="lotr-oc bad"><b>Disaster</b> ' + fmtText(c.disaster) + '</div>' : '') + '</div>' : '')
      + '</div>'));
  });
  }
  if(where === 'end') {
  const F = state.fellowship || {}, FP = LF();
  if(F.recovery || F.haven || F.yule || F.patron || (F.undertakings || []).length || F.notes) {
    const pat = (typeof LOTR_PATRONS !== 'undefined') ? LOTR_PATRONS.find(p => p.name === F.patron) : null;
    const RECOVERY = { '1': 'hindered the Shadow', '2': 'damaged the Enemy', '3': 'drew the Eye' };
    let h = '<div class="lotr-box">' + '<div class="lotr-badges">' + lbadge('Recovery', F.recovery ? '−' + F.recovery + ' Shadow' : '') + lbadge('Haven', F.haven) + (F.yule ? lbadge('Yule', 'yes', 'gold') : '') + lbadge('Patron', F.patron) + '</div>';
    if(F.recovery) h += '<div class="lotr-note dim">Spiritual recovery: the Company ' + escH(RECOVERY[F.recovery] || '') + '.</div>';
    if(pat) h += lline(pat.advantage || 'Patron', pat.advantageText);
    if((F.undertakings || []).length) h += '<div class="lotr-und">' + F.undertakings.map(n => { const u = FP && FP.undertakings.find(x => x.name === n); return '<div class="sb-ability"><strong>' + escH(n) + ':</strong> ' + escH(u ? u.effect : '') + '</div>'; }).join('') + '</div>';
    if(F.yule && FP) h += '<div class="lotr-note">Yule: every hero ages a year; those who skip Heal Scars earn 10 × INT × level bonus XP.</div>';
    h += lline('Notes', F.notes) + '</div>';
    out.push(lsec('Fellowship Phase', h));
  }
  const E = state.eye || {};
  if(E.dwarf || E.elf || E.highelf || lnum(E.pb4) || lnum(E.famous) || (E.mods || []).length || (E.revelations || []).length) {
    const k = lotrEyeCalc(E), EY = LE();
    let h = '<div class="lotr-box lotr-eye-box"><div class="lotr-badges">' + lbadge('Start', k.start) + lbadge('Hunt', k.hunt, 'warn') + lbadge('Region', k.region) + '</div>';
    if(EY) h += '<div class="lotr-note dim">Rises: ' + EY.increases.map(escH).join(' · ') + '</div>';
    if((E.mods || []).length && EY) h += '<div class="lotr-note dim">' + E.mods.map(i => EY.modifiers[i] ? escH(EY.modifiers[i].mod + ' ' + EY.modifiers[i].text) : '').filter(Boolean).join(' · ') + '</div>';
    if((E.revelations || []).length && EY) h += E.revelations.map(n => { const r = EY.revelations.find(x => x.name === n); return '<div class="sb-ability sb-shadow"><strong>' + escH(n) + ':</strong> ' + escH(r ? r.text : '') + '</div>'; }).join('');
    out.push(lsec('Eye Awareness', h + '</div>'));
  }
  }
  return out;
};

// The book's own hint replaces the generic one on the Journeys tab.
(function(){ const el = document.getElementById('travel-hint'); if(el) el.style.display = 'none'; })();
