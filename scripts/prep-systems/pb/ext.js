// ══ Pirate Borg plug-in ═════════════════════════════════════════════════════
// The Job fills Adventure Details (+ faction and port); voyage legs are the Travel
// module (called Voyage: 50-mile hexes a day, the trade winds, foul weather,
// changing winds and maritime events); ships are this plug-in's own tab (hull, crew
// skill and its modifiers, specialty crew, cargo, known shanties); places are the
// Encounters (called Places) with the island / derelict generators; It's a Trap!
// rolls go to Hazards; plunder & treasure (cargo, silver, relics, rituals, the dead,
// the gear lists and homebrew) to Treasure; MÖRK BORG-style foes to Foes.
// Tables and numbers come from /tools-data/pb-data.js (window.PB_*) and its GM
// suite /tools-data/pb-gm-tables.js (window.PB_GM); all text here is our own. The
// leg calculator lives in prep-registry.js (TRAVEL.PB) so the GM Screen agrees.
const PG = () => (typeof window.PB_GM !== 'undefined' ? window.PB_GM : null);
const PT = k => (typeof PB_GM_TABLES !== 'undefined' && PB_GM_TABLES) ? PB_GM_TABLES[k] : null;
const parr = v => Array.isArray(v) ? v : [];
function drnd(n){ return 1 + Math.floor(Math.random() * n); }
function dpick(a){ return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ''; }
function dnum(x){ const n = parseInt(String(x||'').replace(/[−–]/g,'-').replace(/[^\d-]/g,''), 10); return isNaN(n) ? 0 : n; }
function dcv(card, cls){ const el = card.querySelector('.' + cls); if(!el) return ''; return el.type === 'checkbox' ? !!el.checked : String(el.value || '').trim(); }
function din(cls, val, ph, extra){ return `<input type="text" class="${cls}" value="${escA(val||'')}" placeholder="${escA(ph||'')}" oninput="autosave()"${extra||''}>`; }
function dta(cls, val, ph){ return `<textarea class="${cls} short" placeholder="${escA(ph||'')}" oninput="autosave()">${escH(val||'')}</textarea>`; }
function dfg(label, html, lcls){ return `<div class="field-group"><label class="field-label${lcls ? ' ' + lcls : ''}">${escH(label)}</label>${html}</div>`; }
function drow(cells){ return '<div class="pb-row field-group">' + cells.map(c => `<div style="flex:${c[2]||1};min-width:0"><label class="field-label">${escH(c[0])}</label>${c[1]}</div>`).join('') + '</div>'; }
function dgrid(cells){ return '<div class="pb-grid field-group">' + cells.map(c => `<div style="min-width:0"><label class="field-label">${escH(c[0])}</label>${c[1]}</div>`).join('') + '</div>'; }
function dck(cls, on, label, title, extraAttr){ return `<label${title ? ' title="' + escA(title) + '"' : ''}><input type="checkbox" class="${cls}" ${on ? 'checked' : ''}${extraAttr||''} onchange="autosave()"> ${label}</label>`; }
function dsel(cls, opts, cur, extra){ return `<select class="${cls}" onchange="autosave()"${extra||''}>` + opts.map(o => { const v = Array.isArray(o) ? o[0] : o, l = Array.isArray(o) ? o[1] : o; return `<option value="${escA(v)}"${String(v) === String(cur == null ? '' : cur) ? ' selected' : ''}>${escH(l)}</option>`; }).join('') + '</select>'; }
function dcard(listId, cls, header, inner){
  const list = document.getElementById(listId); if(!list) return null;
  const div = document.createElement('div'); div.className = 'entity-card ' + cls;
  div.innerHTML = `<div class="entity-card-header">${header}<button class="btn-remove" onclick="this.closest('.entity-card').remove();autosave()">✕</button></div>` + inner;
  list.appendChild(div); return div;
}
function dtitle(cls, val, ph){ return `<input class="entity-name-input ${cls}" type="text" placeholder="${escA(ph)}" value="${escA(val||'')}" oninput="autosave()">`; }
function dcap(s){ s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function psgn(n){ n = +n || 0; return (n >= 0 ? '+' : '−') + Math.abs(n); }
function appendLine(ta, line){ _appendLine(ta, line); }
function pbNote(id, html){ const el = document.getElementById(id); if(el) el.innerHTML = html; }
function pbBody(row){ const G = PG(); return G ? G.body(row) : String((row && row.text) || ''); }

// ── Pickers (ships, NPC stat templates) ──
function pbShipPool() { return parr(typeof PB_SHIPS !== 'undefined' ? PB_SHIPS : null).concat(_hbShips); }
function pbTemplates() { return parr(typeof PB_SHIP_TEMPLATES !== 'undefined' ? PB_SHIP_TEMPLATES : null); }
function pbFactions() { return parr(typeof PB_FACTIONS !== 'undefined' ? PB_FACTIONS : null); }
function pbPorts() { const S = (typeof PB_SETTING !== 'undefined' && PB_SETTING) ? PB_SETTING : null; if(!S) return []; const names = parr(S.places).map(p => p.name); parr(S.map && S.map.places).forEach(n => { if(!names.some(x => x.indexOf(n) === 0)) names.push(n); }); return names; }
function pbFillPickers() {
  const sp = document.getElementById('ship-pick');
  if(sp) { const cur = sp.value; sp.innerHTML = pbShipPool().map(s => '<option' + (s.name === cur ? ' selected' : '') + '>' + escH(s.name) + '</option>').join('') || '<option value="">No ships loaded</option>'; if(!cur) { const sl = pbShipPool().find(s => s.id === 'sloop'); if(sl) sp.value = sl.name; } }
  const st = document.getElementById('ship-tpl');
  if(st && st.options.length <= 1) st.insertAdjacentHTML('beforeend', pbTemplates().map(t => '<option value="' + escA(t.id) + '">' + escH(t.name) + (t.baseShips ? ' — ' + t.baseShips.length + ' base ships' : '') + '</option>').join(''));
  const cp = document.getElementById('cap-pick');
  if(cp && cp.options.length <= 1) cp.insertAdjacentHTML('beforeend', parr(typeof PB_CAPTAINS !== 'undefined' ? PB_CAPTAINS : null).map(c => '<option value="' + escA(c.id) + '">' + escH(c.name) + '</option>').join(''));
  const jf = document.getElementById('f-d-faction');
  if(jf && jf.options.length <= 1) { const cur = (state.details || {}).faction || ''; jf.insertAdjacentHTML('beforeend', pbFactions().map(f => '<option value="' + escA(f.name) + '">' + escH(f.name) + '</option>').join('')); jf.value = cur; }
  const jp = document.getElementById('f-d-port');
  if(jp && jp.options.length <= 1) { const cur = (state.details || {}).port || ''; jp.insertAdjacentHTML('beforeend', pbPorts().map(n => '<option>' + escH(n) + '</option>').join('')); jp.value = cur; }
  const sa = document.getElementById('npc-statsas');
  if(sa) { const cur = sa.value; sa.innerHTML = '<option value="">No stats (social)</option>' + pbMobPool().filter(m => m.category === 'npc').map(m => '<option' + (m.name === cur ? ' selected' : '') + '>' + escH(m.name) + '</option>').join(''); }
}

// ── NPCs, reaction, zombies ──
function pbRollNpc(){
  const G = PG(); if(!G) return;
  const statsAs = v('npc-statsas');
  const n = G.npc({ gender: v('npc-gender'), statsAs: statsAs }); if(!n) return;
  const base = n.stats ? pbMobToCard(n.stats) : { hp: '', morale: '', armor: '', atkdr: 'DR12', defdr: 'DR12', abilities: '' };
  addStatBlock(Object.assign({}, base, {
    sbtype: 'npc', name: n.name.full,
    type: 'NPC // PIRATE' + (n.reaction ? ' // ' + String(n.reaction.text).toUpperCase() : ''),
    flavor: '', wants: '', quirks: 'Answers to ' + n.name.nicknames.map(x => '"' + x + '"').join(' or '),
    info: (n.reaction ? 'Reaction 2d6 ' + n.reaction.roll + ': ' + n.reaction.text : '') + (n.stats ? ' · Stats as ' + n.stats.name : '')
  }));
  const msg = 'Added <b>' + escH(n.name.full) + '</b>' + (n.reaction ? ' — ' + escH(String(n.reaction.text).toLowerCase()) + ' (2d6 ' + n.reaction.roll + ')' : '') + (n.stats ? ', stats as ' + escH(n.stats.name) : '') + ' below.';
  pbNote('j-npc-note', msg); pbNote('m-note', msg);
  autosave();
}
function pbRollReaction(){ const G = PG(); const re = G && G.reaction(); if(re) pbNote('j-npc-note', 'Reaction 2d6 <b>' + re.roll + '</b> (' + re.dice.join('+') + '): <b>' + escH(re.text) + '</b>'); }
function pbRollZombie(){
  const t = PT('zombieAppearance'); const G = PG(); if(!t || !G) return;
  const x = G.rollTable(t); if(!x) return;
  const txt = G.rollInline(x.row.text);
  // Dress the newest undead block, or say so if there is none.
  const cards = [...document.querySelectorAll('#statblocks-list > .entity-card')].filter(c => /UNDEAD|ZOMBIE/i.test(dcv(c, 'sb-type-input') + ' ' + dcv(c, 'sb-name-input')));
  const c = cards.pop();
  if(c) { const ta = c.querySelector('.sb-flavor-input'); appendLine(ta, 'Looks like: ' + txt); pbNote('m-note', 'Zombie d6 ' + x.roll + ' added to <b>' + escH(dcv(c, 'sb-name-input')) + '</b>: ' + escH(txt)); }
  else pbNote('m-note', 'Zombie d6 ' + x.roll + ': ' + escH(txt) + ' <span style="opacity:.7">(add a zombie block to attach it)</span>');
}

// ── Voyage legs ──
const PB_HEADINGS = [['', '—'], 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
// The prep's ships are the Vehicles module's list (state.vehicles), in the ship shape.
function pbShipsState() { return (state.vehicles || []).map(x => PREG.pbVehicleToShip(x)); }
function pbShipNames() { return pbShipsState().map(s => s.name).filter(Boolean); }
// A leg's own fields on the Travel card: heading, ship and speed, weather, winds, events.
PLUG.travel.fields = function(data){
  const ships = pbShipNames(); const cur = data.ship || pbShipsState().filter(s => s.role === 'party').map(s => s.name)[0] || '';
  return dgrid([['Heading', dsel('vy-heading', PB_HEADINGS, data.heading)], ['Ship', dsel('vy-ship', [['', '—']].concat(ships.map(s => [s, s])).concat(cur && ships.indexOf(cur) < 0 ? [[cur, cur]] : []), cur)], ['Speed', din('vy-speed', data.speed, 'ship')]])
    + dfg('Weather', din('vy-weather', data.weather, 'Foul Weather 2d6, or your own'))
    + `<div style="display:flex;gap:6px;"><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="pbVoyRoll(this,'weather')">🎲 Foul weather 2d6</button><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="pbVoyRoll(this,'winds')">🎲 Winds 2d6 + d6</button></div>`
    + dfg('Winds', din('vy-winds', data.winds, 'e.g. Fair — wind from the SE'))
    + dfg('Events & encounters', dta('vy-events', data.events, 'One per line...'))
    + `<div style="display:flex;gap:6px;flex-wrap:wrap;"><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="pbVoyRoll(this,'seaEvents')" title="Events at Sea d20 (Core Rules pg. 79)">🎲 Event d20</button><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="pbVoyRoll(this,'seaEncounters')" title="Encounters at Sea d20 (pg. 79)">🎲 Encounter d20</button><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="pbVoyRoll(this,'flotsam')" title="Flotsam &amp; Jetsam d12 (pg. 79)">🎲 Flotsam d12</button><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="pbVoyRoll(this,'event')" title="Maritime Events &amp; Encounters d12 (Trapped in the Tropics)">🎲 Tropics d12</button></div>`;
};
PLUG.travel.read = function(c){ return { heading: dcv(c,'vy-heading'), ship: dcv(c,'vy-ship'), speed: dcv(c,'vy-speed'), weather: dcv(c,'vy-weather'), winds: dcv(c,'vy-winds'), events: dcv(c,'vy-events') }; };
PLUG.travel.badges = function(j){ return _mbadge('Heading', j.heading) + _mbadge('Ship', j.ship) + _mbadge('Speed', j.speed); };
PLUG.travel.preview = function(j){
  return _mline('Weather', j.weather) + _mline('Winds', j.winds)
    + (j.events ? '<p class="loc-desc"><strong class="loc-lbl">Events:</strong></p><div class="pb-list pb-events">' + String(j.events).split('\n').filter(Boolean).map(x => '<div class="sb-ability">☠ ' + fmtText(x) + '</div>').join('') + '</div>' : '');
};
function pbShipByName(n) { return pbShipsState().find(s => s.name === n) || pbShipPool().find(s => s.name === n) || null; }
function pbVoyRoll(btn, kind) {
  const G = PG(); const c = btn.closest('.entity-card'); if(!G || !c) return;
  if(kind === 'weather') { const x = G.rollTable(PT('foulWeather')); if(x) { c.querySelector('.vy-weather').value = x.row.text.replace(/\.$/, '') + ' (2d6 ' + x.roll + ')'; autosave(); } }
  else if(kind === 'winds') { const x = G.rollTable(PT('changingWinds')), d = G.windDir(); if(x) { c.querySelector('.vy-winds').value = x.row.name + ' — ' + pbBody(x.row).replace(/\.$/, '') + '; wind from the ' + d.dir + ' (2d6 ' + x.roll + ', d6 ' + d.roll + ')'; autosave(); } }
  else if(kind === 'seaEvents' || kind === 'seaEncounters' || kind === 'flotsam') {
    const t = PT(kind); const x = t && G.rollTable(t); if(!x) return;
    let line = t.name + ' ' + x.die + ' ' + x.roll + ': ' + G.rollInline(G.rollBrackets(x.row.text));
    const hints = [];
    if(x.row.monster) { const m = pbMobPool().find(z => z.id === x.row.monster); if(m) hints.push('creature: ' + m.name + ' — add it on the Foes tab'); }
    (x.row.ships || (x.row.ship ? [x.row.ship] : [])).forEach(id => { const s = pbShipPool().find(z => z.id === id) || pbTemplates().find(z => z.id === id); if(s) hints.push('ship: ' + s.name + ' — add it on the Ships tab'); });
    if(x.row.test && x.row.test.ability) hints.push(x.row.test.ability + ' DR' + x.row.test.dr);
    if(x.row.table === 'cargo') hints.push('cargo: roll Core cargo on the Plunder tab');
    if(x.row.table === 'derelictShip') hints.push('derelict: roll one on the Places tab');
    if(hints.length) line += ' [' + hints.join('; ') + ']';
    appendLine(c.querySelector('.vy-events'), line);
  }
  else if(kind === 'event') {
    const x = G.rollTable(PT('maritimeEvents')); if(!x) return;
    let line = 'd12 ' + x.roll + ' ' + x.row.name + ': ' + pbBody(x.row);
    if(x.row.ship) { const s = pbShipPool().find(z => z.id === x.row.ship); if(s) line += ' [ship: ' + s.name + ' — add it on the Ships tab]'; }
    appendLine(c.querySelector('.vy-events'), line);
  }
}
function pbRollVoyage() {
  const card = addTravelLeg({ name: 'Leg ' + (document.querySelectorAll('#travel-list > .travel-card').length + 1) });
  if(!card) return;
  ['weather', 'winds', 'seaEvents'].forEach(k => pbVoyRoll(card.querySelector('[onclick*="\'' + k + '\'"]'), k));
  autosave(); switchTab('travel');
}

// ── Ships ──
function pbShipToCard(s, role) {
  return { role: role || 'foe', name: s.name, base: s.name, type: s.type || 'ship', hp: String(s.hp ?? ''), hpMax: String(s.hp ?? ''),
    hull: s.hull ? s.hull.die : '', agility: s.agility == null ? '' : String(s.agility), speed: String(s.speed ?? ''), skill: s.skill == null ? '' : String(s.skill),
    broadsides: s.broadsides ? ((s.broadsidesAttacks > 1 ? s.broadsidesAttacks + ' × ' : '') + s.broadsides) : '', smallArms: s.smallArms ? ((s.smallArmsAttacks > 1 ? s.smallArmsAttacks + ' × ' : '') + s.smallArms) : '', ram: s.ram || '',
    crewMin: s.crew ? String(s.crew.min) : '', crewMax: s.crew ? String(s.crew.max) : '', crew: '', cargoSlots: s.cargo == null ? '' : String(s.cargo), cargo: '',
    special: [s.special, s.skillNote && s.skill == null ? '' : ''].filter(Boolean).join(' '), notes: s.text && s.template ? s.text : '', specialty: [], mods: {}, shanties: [] };
}
function pbShipAdd() {
  let s = pbShipPool().find(x => x.name === v('ship-pick')); if(!s) return;
  const G = PG(), tpl = pbTemplates().find(t => t.id === v('ship-tpl'));
  if(tpl && G && G.applyTemplate) s = G.applyTemplate(s, tpl);
  addPbShip(pbShipToCard(s, v('ship-role') || 'foe')); autosave();
}
// Ships at Sea (Core Rules pg. 114): vessel class d10, armament d6, crew d6 / 2d6, d66 name.
function pbShipAtSea() {
  const G = PG(); if(!G || !G.shipAtSea) return;
  const x = G.shipAtSea({ template: v('ship-tpl') }); if(!x) return;
  const s = x.ship, R = x.rolls;
  const card = pbShipToCard(s, v('ship-role') || 'foe');
  card.name = s.shipName; card.base = x.base.name + (x.tpl ? ' (' + x.tpl.name + ')' : '');
  if(s.aboard != null) card.crew = String(s.aboard);
  card.notes = ['Ships at sea: d10 ' + R.vc.roll + ' ' + x.base.name, 'armament d6 ' + R.arm.roll + ' — ' + R.arm.row.text, 'crew d6 ' + R.cq.roll + ' — ' + R.cq.row.text, 'quality 2d6 ' + R.ql.roll + ' — ' + R.ql.row.text, 'name d66 ' + R.nm.code].join('; ');
  addPbShip(card); autosave();
  pbNote('m-note', '');
}
const PB_HULLS = [['', 'none'], ['d2', '−d2'], ['d4', '−d4'], ['d6', '−d6']];
function addPbShip(data={}) {
  const SP = parr(typeof PB_SPECIALTY_CREW !== 'undefined' ? PB_SPECIALTY_CREW : null);
  const CM = parr(typeof PB_CREW_MODS !== 'undefined' ? PB_CREW_MODS : null);
  const SH = parr(typeof PB_SHANTIES !== 'undefined' ? PB_SHANTIES : null);
  const mods = data.mods || {}, spec = data.specialty || [], known = data.shanties || [];
  const uid = 'sh' + Date.now() + Math.random().toString(36).slice(2);
  const role = data.role || 'party';
  const card = dcard('vehicles-list', 'pb-ship vehicle-card', dtitle('sh-name', data.name, 'Ship name (e.g. The Salted Widow)'),
    `<div class="field-group pb-checks pb-checks-row">${[['party', 'Party ship'], ['foe', 'Encountered'], ['other', 'Other']].map(([k, l]) => `<label><input type="radio" class="sh-role" name="shrole-${uid}" value="${k}" ${role === k ? 'checked' : ''} onchange="autosave()"> ${l}</label>`).join('')}</div>`
    + drow([['Type', din('sh-base', data.base || data.type, 'e.g. Sloop')], ['HP now', din('sh-hp', data.hp, 'HP'), 0.6], ['Max HP', din('sh-hpmax', data.hpMax, 'max'), 0.6]])
    + dgrid([['Hull', dsel('sh-hull', PB_HULLS, data.hull)], ['Agility', din('sh-agility', data.agility, '+0')], ['Speed', din('sh-speed', data.speed, 'hexes')], ['Crew skill', din('sh-skill', data.skill, '+0')]])
    + dgrid([['Broadsides', din('sh-broadsides', data.broadsides, 'd6')], ['Small arms', din('sh-smallarms', data.smallArms, 'd4')], ['Ram', din('sh-ram', data.ram, 'd4')], ['Cargo slots', din('sh-cargoslots', data.cargoSlots, '2')]])
    + dgrid([['Crew min', din('sh-crewmin', data.crewMin, '3')], ['Crew max', din('sh-crewmax', data.crewMax, '10')], ['Aboard', din('sh-crew', data.crew, 'now')], ['Captain SPI', din('sh-capspi', data.capSpirit, '+0')]])
    + dfg('Cargo (one slot per line)', dta('sh-cargo', data.cargo, 'e.g. Rum, grog, or wine — 2,000s'))
    + `<button class="btn-add btn-mini btn-roll" onclick="pbShipPlunder(this)">🎲 Plunder the hold (d12 per slot)</button>`
    + `<details class="pb-fold"${spec.length ? ' open' : ''}><summary>Specialty crew</summary><div class="pb-checks">${SP.map(s => dck('sh-sp', spec.indexOf(s.id) >= 0, '<b>' + escH(s.name) + '</b> <span class="pb-mod">' + escH(s.text) + '</span>', '', ' data-id="' + escA(s.id) + '"')).join('')}</div></details>`
    + `<details class="pb-fold"${Object.keys(mods).some(k => mods[k]) ? ' open' : ''}><summary>Crew skill modifiers</summary><div class="pb-checks">${CM.filter(m => typeof m.mod === 'number').map((m, i) => m.per
        ? `<label><input type="text" class="sh-mod sh-mod-n" data-k="${escA(m.condition)}" data-mod="${m.mod}" value="${escA(mods[m.condition] ? String(mods[m.condition]) : '')}" placeholder="0" style="width:38px;flex:0 0 auto;text-align:center" oninput="autosave()"> ${escH(m.condition)} <span class="pb-mod">${psgn(m.mod)} per ${escH(m.per)}</span></label>`
        : dck('sh-mod', !!mods[m.condition], escH(m.condition) + ' <span class="pb-mod">' + psgn(m.mod) + (m.permanent ? ', permanent' : '') + '</span>', '', ' data-k="' + escA(m.condition) + '" data-mod="' + m.mod + '"')).join('')}
      <div class="pb-hint" style="margin:4px 0 0">Recovery: shore leave +2, taking a prize +4, dividing the plunder resets the losses.</div></div></details>`
    + `<details class="pb-fold"${known.length ? ' open' : ''}><summary>Known shanties</summary><div class="pb-checks">${SH.map(s => dck('sh-shanty', known.indexOf(s.id) >= 0, escH(s.roll + '. ' + s.name), s.text, ' data-id="' + escA(s.id) + '"')).join('')}</div></details>`
    + dfg('Special', dta('sh-special', data.special, 'e.g. Full speed when Close to the Wind'))
    + dfg('Notes', dta('sh-notes', data.notes, 'Flag, captain, reputation...'))
    + `<div class="pb-calc sh-calc"></div>`);
  return card;
}
function pbShipRead(c) {
  const mods = {};
  c.querySelectorAll('.sh-mod').forEach(el => { const k = el.dataset.k; if(el.type === 'checkbox') { if(el.checked) mods[k] = 1; } else { const n = dnum(el.value); if(n) mods[k] = n; } });
  return { role: (c.querySelector('.sh-role:checked') || {}).value || 'party', name: dcv(c,'sh-name'), base: dcv(c,'sh-base'), hp: dcv(c,'sh-hp'), hpMax: dcv(c,'sh-hpmax'), hull: dcv(c,'sh-hull'),
    agility: dcv(c,'sh-agility'), speed: dcv(c,'sh-speed'), skill: dcv(c,'sh-skill'), broadsides: dcv(c,'sh-broadsides'), smallArms: dcv(c,'sh-smallarms'), ram: dcv(c,'sh-ram'),
    cargoSlots: dcv(c,'sh-cargoslots'), crewMin: dcv(c,'sh-crewmin'), crewMax: dcv(c,'sh-crewmax'), crew: dcv(c,'sh-crew'), capSpirit: dcv(c,'sh-capspi'),
    cargo: dcv(c,'sh-cargo'), special: dcv(c,'sh-special'), notes: dcv(c,'sh-notes'),
    specialty: [...c.querySelectorAll('.sh-sp:checked')].map(x => x.dataset.id), mods: mods, shanties: [...c.querySelectorAll('.sh-shanty:checked')].map(x => x.dataset.id) };
}
function pbShipCalc(s) {
  const CM = parr(typeof PB_CREW_MODS !== 'undefined' ? PB_CREW_MODS : null);
  let modSum = 0; const lines = [];
  Object.keys(s.mods || {}).forEach(k => { const m = CM.find(x => x.condition === k); if(!m || typeof m.mod !== 'number') return; const t = m.per ? m.mod * dnum(s.mods[k]) : m.mod; modSum += t; lines.push(k + (m.per ? ' ×' + dnum(s.mods[k]) : '') + ' ' + psgn(t)); });
  const base = dnum(s.skill), now = base + modSum;
  const qm = (s.specialty || []).indexOf('veteran-quartermaster') >= 0;
  const under = s.crewMin !== '' && s.crew !== '' && dnum(s.crew) < dnum(s.crewMin);
  const perDay = 1 + dnum(s.capSpirit);
  return { base, modSum, now, lines, qm, under, perDay: Math.max(0, perDay), hasSkill: String(s.skill).trim() !== '' };
}
function pbShipPlunder(btn) {
  const G = PG(); const c = btn.closest('.entity-card'); if(!G || !c) return;
  const n = Math.max(1, Math.min(20, dnum(dcv(c, 'sh-cargoslots')) || 1));
  const ta = c.querySelector('.sh-cargo'); ta.value = '';
  for(let i = 0; i < n; i++) { const p = G.plunder(); if(!p) continue; appendLine(ta, p.empty ? 'Empty' : p.text.replace(/\s*\(.*\)$/, '') + (p.silver != null ? ' — ' + p.silver.toLocaleString() + 's' : '')); }
}

// ── Traps ──
function pbRandomTrap(full){
  const G = PG(); const t = G && G.trap(full); if(!t) return {};
  const d = {}; (t.details || []).forEach(c => { d[c.name.toLowerCase()] = c.value; });
  return { name: t.name, text: t.text, damage: t.damage || '', test: t.test ? t.test.ability + ' DR' + t.test.dr : '', bait: d.bait || '', trigger: d.trigger || '', state: d.state || '', complication: d.complication || '' };
}
// A trap as a Hazard: the test to avoid it is how it is spotted; damage, bait,
// state and complication ride in the effect.
function pbTrapHazard(full){
  const t = pbRandomTrap(full); if(!t.name) return {};
  return { name: t.name, trigger: t.trigger || '', spot: t.test || '',
    effect: [t.text, t.damage ? 'Damage: ' + t.damage : '', t.bait ? 'Bait: ' + t.bait : '', t.state ? 'State: ' + t.state : '', t.complication ? 'Complication: ' + t.complication : ''].filter(Boolean).join('\n') };
}

// ── Plunder & treasure (gear lists + relics + rituals + homebrew → the rewards list) ──
function pbCost(c){ return c == null || c === '' ? '' : (typeof c === 'number' ? c + 's' : String(c)); }
function pbTreasurePool() {
  const A = v => parr(typeof window[v] !== 'undefined' ? window[v] : null);
  const wep = w => [w.damage ? 'Damage ' + w.damage : '', w.hands === 2 ? 'two-handed' : '', w.reach ? w.reach + "' reach" : '', w.range ? "range " + w.range + "'" : '', w.reload ? 'Reload ' + w.reload : '', w.blackPowder ? 'black powder (ignores armor)' : '', pbCost(w.cost)].filter(Boolean).join(' · ');
  const clo = a => ['Tier ' + (a.tier || 0) + (a.armorDie ? ' −' + a.armorDie : ''), a.agilityDR ? 'AGILITY tests DR +' + a.agilityDR : '', a.defenseDR ? 'defense DR +' + a.defenseDR : '', pbCost(a.cost)].filter(Boolean).join(' · ');
  const book = []
    .concat(A('PB_WEAPONS').filter(w => w.cost != null).map(w => ({ name: w.name, cat: 'weapon', flavor: w.special || '', stats: wep(w) })))
    .concat(A('PB_CLOTHING').filter(a => a.cost != null).map(a => ({ name: a.name, cat: 'armor', flavor: a.special || '', stats: clo(a) })))
    .concat(A('PB_HATS').filter(h => !h.none && h.cost != null).map(h => ({ name: h.name, cat: 'hat', flavor: h.special || '', stats: ['Hat', h.damageReduction ? '−' + h.damageReduction + ' damage' : '', pbCost(h.cost)].filter(Boolean).join(' · ') })))
    .concat(A('PB_BOMBS').map(b => ({ name: b.name, cat: 'bomb', flavor: b.effect || '', stats: ['Bomb', b.damage ? 'Damage ' + b.damage : '', pbCost(b.cost)].filter(Boolean).join(' · ') })))
    .concat(A('PB_AMMO').map(b => ({ name: b.name, cat: 'bomb', flavor: b.effect || '', stats: ['Ammo ×' + b.qty, b.damage ? 'Damage ' + b.damage : '', pbCost(b.cost)].filter(Boolean).join(' · ') })))
    .concat(A('PB_GEAR').map(g => ({ name: g.name, cat: 'gear', flavor: g.effect || '', stats: [g.category && g.category !== 'gear' ? dcap(g.category) : '', g.uses ? 'uses: ' + g.uses : '', g.heal ? 'heals ' + g.heal : '', g.costText || pbCost(g.cost)].filter(Boolean).join(' · ') })))
    .concat(A('PB_RELICS').map(r => ({ name: r.name, cat: 'relic', flavor: r.text || '', stats: 'Ancient relic d20 ' + r.roll + (r.duration ? ' · ' + r.duration : '') + ' · SPIRIT DR12 after use' })))
    .concat(A('PB_RITUALS').map(r => ({ name: r.name, cat: 'ritual', flavor: r.text || '', stats: 'Arcane ritual ' + (r.numeral || r.roll) + ' (a scroll or tome) · SPIRIT DR12 to cast' })));
  const hb = _hbGear.map(x => ({ name: x.name, cat: x._hb, homebrew: true, flavor: x.special || x.effect || x.text || '',
    stats: x._hb === 'weapon' ? wep(x) : x._hb === 'armor' ? clo(x) : x._hb === 'hat' ? ['Hat', x.damageReduction ? '−' + x.damageReduction + ' damage' : '', pbCost(x.cost)].filter(Boolean).join(' · ') : x._hb === 'relic' ? 'Homebrew relic' : x._hb === 'ritual' ? 'Homebrew ritual' : [x.costText || pbCost(x.cost)].filter(Boolean).join(' · ') }));
  return book.concat(hb);
}
function pbTreasureFiltered() { const c = v('tr-cat'); const p = pbTreasurePool(); return c ? p.filter(x => x.cat === c) : p; }
function pbTreasureSearch() {
  const box = document.getElementById('tr-search'), list = document.getElementById('tr-list'); if(!box || !list) return;
  const q = box.value.trim().toLowerCase();
  const hits = pbTreasureFiltered().filter(x => !q || x.name.toLowerCase().includes(q)).slice(0, 80);
  if(!hits.length) { list.innerHTML = '<div class="mob-pick-empty">No match.</div>'; list.classList.add('show'); return; }
  list.innerHTML = hits.map(x => '<button type="button" class="mob-pick-item" data-tr="' + escA(x.name) + '" onclick="pbTreasureAdd(this.dataset.tr)">' + escH(x.name) + ' <span style="opacity:.55">— ' + escH(x.stats) + '</span>' + (x.homebrew ? ' <span style="opacity:.5;font-style:italic">· homebrew</span>' : '') + '</button>').join('');
  list.classList.add('show');
}
function pbTreasureAdd(name) {
  const x = pbTreasurePool().find(t => t.name === name); if(!x) return;
  addReward({ name: x.name, flavor: x.flavor, stats: x.stats }); autosave();
  const box = document.getElementById('tr-search'); if(box) box.value = '';
  const list = document.getElementById('tr-list'); if(list) { list.classList.remove('show'); list.innerHTML = ''; }
}
function pbTreasureRandom() { const x = dpick(pbTreasureFiltered()); if(!x) return; addReward({ name: x.name, flavor: x.flavor, stats: x.stats }); autosave(); }
function pbTreasureSilver() {
  const G = PG(); if(!G) return;
  const raw = (v('tr-silver') || '3d10').replace(/\s+/g, '');
  const m = /^(.*?)(?:[×x*](\d+))?$/i.exec(raw) || [raw, raw, ''];
  const d = G.dice(m[1] || '3d10'), mult = dnum(m[2]) || 1, tot = d.total * mult;
  addReward({ name: tot.toLocaleString() + ' silver', flavor: '', stats: 'Silver: ' + raw + ' → ' + tot.toLocaleString() + 's' + (d.dice.length > 1 ? ' (' + d.dice.join('+') + (mult > 1 ? ' ×' + mult : '') + ')' : '') });
  autosave();
}
function pbTreasurePlunder() { const G = PG(); const p = G && G.plunder(); if(!p) return; addReward({ name: p.empty ? 'An empty hold' : p.text.replace(/\s*\(.*\)$/, ''), flavor: '', stats: 'Cargo d12 ' + p.roll + (p.value ? ' · ' + p.value + (p.silver != null ? ' → ' + p.silver.toLocaleString() + 's' : '') : '') }); autosave(); }
function pbTreasureRelic() { const G = PG(); const r = G && G.relic(); if(!r) return; addReward({ name: r.name, flavor: r.text, stats: 'Ancient relic d20 ' + r.roll + ' · SPIRIT DR12 after use' }); autosave(); }
function pbTreasureRitual() { const G = PG(); const r = G && G.ritual(); if(!r) return; addReward({ name: 'Scroll: ' + r.name, flavor: r.text, stats: 'Arcane ritual ' + (r.numeral || '') + ' (d20 ' + r.roll + ') · SPIRIT DR12 to cast' }); autosave(); }
function pbTreasureDead() {
  const G = PG(); const t = PT('amongTheDead'); if(!G || !t) return;
  const x = G.rollTable(t); if(!x) return; const rw = x.row;
  if(rw.table === 'startingWeapons') { const w = G.startingWeapon(); addReward({ name: w && w.row ? w.row.text : 'A weapon', flavor: 'Found among the dead.', stats: 'Among the dead d6 ' + x.roll + ' · starting weapon d10 ' + (w ? w.roll : '') }); }
  else if(rw.silver) { const s = G.dice(rw.silver); addReward({ name: s.total + ' silver', flavor: 'Found among the dead.', stats: 'Among the dead d6 ' + x.roll + ' · ' + rw.silver + ' → ' + s.total + 's' }); }
  else if(rw.table === 'relics') { const r = G.relic(); addReward({ name: r.name, flavor: r.text, stats: 'Among the dead d6 ' + x.roll + ' · ancient relic d20 ' + r.roll }); }
  else if(rw.table === 'rituals') { const r = G.ritual(); addReward({ name: 'Scroll: ' + r.name, flavor: r.text, stats: 'Among the dead d6 ' + x.roll + ' · arcane ritual d20 ' + r.roll }); }
  else addReward({ name: 'Nothing among the dead', flavor: '', stats: 'Among the dead d6 ' + x.roll });
  autosave();
}
document.addEventListener('click', e => {
  const list = document.getElementById('tr-list');
  if(!list || !list.classList.contains('show')) return;
  if(e.target.closest && (e.target.closest('#tr-list') || e.target.closest('#tr-search'))) return;
  list.classList.remove('show');
});

// ── Core Rules generators → prep cards ──
function pbRT(t){ const G = PG(); return G && t ? G.rollTable(t) : null; }
function pbTxt(x){ const G = PG(); return G ? G.rollInline(G.rollBrackets(x)) : String(x || ''); }
// Rumors d20 / History d66 → a clue on the Basics tab.
function pbAddRumor(kind){
  const t = kind === 'history' ? (typeof PB_HISTORY !== 'undefined' ? PB_HISTORY : null) : (typeof PB_RUMORS !== 'undefined' ? PB_RUMORS : null);
  const x = pbRT(t); if(!x) return;
  addClue(kind === 'history' ? { header: 'History (d66 ' + x.code + '): ' + x.row.storyline + ', ch. ' + x.row.chapter, text: pbTxt(x.row.text) } : { header: 'Rumor (d20 ' + x.roll + ')', text: pbTxt(x.row.text) });
  autosave(); switchTab('clues');
}
// Jobs & Quests (pg. 126) → the Job tab's fields (a re-roll replaces name, goal, patron and rivals; the rolls are appended to the notes).
function pbRollJob(){
  const G = PG(); const j = G && G.job && G.job(''); if(!j) return;
  const R = j.rolls, put = (id, val, force) => { const el = document.getElementById(id); if(el && (force || !el.value.trim())) el.value = val; };
  const tx = k => pbTxt(R[k].row.text);
  put('f-d-name', tx('hook').replace(/\.$/, ''), true);
  put('f-d-hooks', tx('hook'), true);
  put('f-d-goal', tx('requirement') + ' Deadline: ' + tx('timeRestraint'), true);
  put('f-d-questgiver', tx('patron').replace(/\.$/, ''), true);
  put('f-d-opposition', tx('complication'), true);
  const nt = document.getElementById('f-notes');
  if(nt) appendLine(nt, 'Jobs & Quests: hook d20 ' + R.hook.roll + ' · patron d10 ' + R.patron.roll + ' · requirement d6 ' + R.requirement.roll + ' · time d6 ' + R.timeRestraint.roll + ' · complication d6 ' + R.complication.roll);
  const jf = document.getElementById('f-d-faction'); if(jf && !jf.value) { const f = dpick(pbFactions()); if(f) jf.value = f.name; }
  autosave();
}
// Uncharted Islands (pg. 122) / Derelict Ship (pg. 116) → a place card.
function pbGenTables(obj){ return Object.keys((obj && obj.tables) || {}).map(k => { const t = obj.tables[k], x = pbRT(t); return x ? { key: k, name: t.name, die: x.die, roll: x.roll, row: x.row, text: pbTxt(x.row.text) } : null; }).filter(Boolean); }
function pbAddIsland(){
  const I = typeof PB_ISLANDS !== 'undefined' ? PB_ISLANDS : null; const L = pbGenTables(I); if(!L.length) return;
  const by = k => (L.find(x => x.key === k) || {}).text || '';
  const nm = pbRT(PT('shipName'));
  addLocation({ name: 'Uncharted island' + (nm ? ' — ' + nm.row.text + ' Isle' : ''), type: 'exploration',
    tag: by('size').replace(/\.$/, '') + ' island: ' + by('terrain').replace(/\.$/, '').toLowerCase() + ', ' + by('vegetation').replace(/\.$/, '').toLowerCase(),
    readaloud: '',
    desc: ['naturalFeature', 'animals', 'inhabitants', 'hideTreasure', 'fortune'].map(k => { const x = L.find(y => y.key === k); return x ? x.name + ': ' + x.text : ''; }).filter(Boolean).join('\n'),
    consequences: ['hazards', 'conflicts', 'darkness'].map(k => { const x = L.find(y => y.key === k); return x ? x.name + ': ' + x.text : ''; }).filter(Boolean).join('\n'),
    notes: 'Uncharted Islands: ' + L.map(x => x.name + ' ' + x.die + ' ' + x.roll).join(' · ') });
  autosave(); switchTab('scenes');
}
function pbAddWreck(){
  const D = typeof PB_DERELICT_GEN !== 'undefined' ? PB_DERELICT_GEN : null; const L = pbGenTables(D); if(!L.length) return;
  const by = k => L.find(x => x.key === k) || { text: '', row: {} };
  const sub = r => (r.sub && r.sub.rows) ? (() => { const s = pbRT(r.sub); return s ? ' (' + r.sub.die + ' ' + s.roll + ': ' + s.row.text + ')' : ''; })() : '';
  const occ = by('currentOccupant'), m = occ.row.monster ? pbMobPool().find(z => z.id === occ.row.monster) : null;
  const cond = by('condition');
  addLocation({ name: 'Derelict ' + by('typeOfShip').text.replace(/\.$/, ''), type: m ? 'combat' : 'exploration',
    tag: 'Found ' + by('whereIsIt').text.replace(/\.$/, '') + ' — ' + by('whatHappened').text.replace(/\.$/, ''),
    desc: ['In one of the rooms: ' + by('inOneOfTheRooms').text + sub(by('inOneOfTheRooms').row), 'Odd feature: ' + by('oddFeature').text, 'Current occupant: ' + occ.text + (m ? ' [' + m.name + ' — on the Foes tab]' : ''),
      'Original cargo: ' + by('originalCargo').text + ' — ' + cond.text + (cond.row.valueMultiplier != null ? ' (×' + cond.row.valueMultiplier + ' value)' : '')].join('\n'),
    consequences: 'Development: ' + by('development').text,
    notes: 'Derelict Ship: ' + L.map(x => x.name + ' ' + x.die + ' ' + x.roll).join(' · ') });
  if(m) addStatBlock(SB_CONFIG.mobs.toCard(m));
  autosave(); switchTab('scenes');
}
// Treasure map + riddle / buried treasure / core cargo / loot the body → the rewards list.
function pbTreasureMap(){
  const G = PG(); const m = G && G.treasureMap && G.treasureMap(); if(!m) return;
  const X = m.x;
  addReward({ name: 'Treasure map (' + X.type.row.name + ') — ' + X.material.row.text.replace(/\.$/, ''),
    flavor: m.text,
    stats: [X.geography.row.text.replace(/\.$/, ''), 'starts ' + X.itStarts.row.text.replace(/\.$/, ''), 'ink revealed ' + X.invisibleInk.row.text.replace(/\.$/, ''), 'icons: ' + m.icons.map(i => i.row.text).join(' → '), 'marker: ' + m.markers[0].row.text, 'heading ' + X.direction.row.text, 'clue: ' + X.clueContainer.row.text.replace(/\.$/, ''), 'complication: ' + X.complication.row.text.replace(/\.$/, ''), 'GM: ' + m.answer].join(' · ') });
  autosave();
}
function pbTreasureBuried(){ const G = PG(); const b = G && G.buried && G.buried(); if(!b) return; addReward({ name: 'Buried treasure', flavor: b.text, stats: 'Buried Treasure d100 ' + b.roll }); autosave(); }
function pbTreasureCargo(){
  const G = PG(); const c = G && G.cargoSlot && G.cargoSlot(); if(!c) return;
  const sw = G.marketSwing(), v = c.value != null ? Math.round(c.value * sw) : null;
  let what = String(c.row.text).replace(/,\s*\d[\d,]*s$/, '').replace(/,\s*\d+d\d+.*$/, ''); if(c.count != null) what = what.replace(/\bd\d+\b/, c.count);
  addReward({ name: dcap(what), flavor: c.extra || (c.ash ? 'ASH sells by the dose (50s standard), times the Current ASH Market.' : ''),
    stats: 'Cargo d12 ' + c.mundane.roll + (c.special ? ' → special d12 ' + c.special.roll : '') + (c.value != null ? ' · ' + c.value.toLocaleString() + 's suggested (±50% by port) → here ' + v.toLocaleString() + 's' : '') });
  autosave();
}
function pbTreasureLoot(){
  const G = PG(); const L = G && G.lootRoll && G.lootRoll(0); if(!L || !L.length) return;
  L.filter(e => !e.again).forEach(e => addReward({ name: /result in silver/i.test(e.text) && e.extra ? e.extra : e.text.replace(/\.$/, ''), flavor: [e.hidden, e.sub ? e.sub.html.replace(/<[^>]+>/g, '') : ''].filter(Boolean).join(' — '), stats: 'Loot the Body d100 ' + e.roll + (e.extra ? ' · ' + e.extra : '') + ' · +' + e.roll + 's' }));
  autosave();
}
// Pirate Generator / Make Your Own Enemies / Archetype Captains → stat blocks.
function pbRollPirate(){
  const G = PG(); const p = G && G.pirate && G.pirate({ gender: v('npc-gender') }); if(!p) return;
  const c = pbMobToCard(p.mon);
  addStatBlock(Object.assign(c, { sbtype: 'mob', type: 'NPC // PIRATE // PIRATE GENERATOR', flavor: p.desc, inventory: p.silver + 's', isnpc: false,
    abilities: c.abilities + '\nRolled: 3d12 ' + p.dice.join(', ') + ' — Morale = highest, HP = lowest + 2, armor from Table ' + p.hiT }));
  pbNote('m-note', 'Added <b>' + escH(p.mon.name) + '</b>: ' + escH(p.desc)); autosave();
}
function pbRollEnemy(){
  const G = PG(); const e = G && G.enemy && G.enemy({ specials: 1 }); if(!e) return;
  const R = e.rolls, c = pbMobToCard(e.mon);
  addStatBlock(Object.assign(c, { name: 'New enemy', type: 'ENEMY // MAKE YOUR OWN', flavor: e.mon.text,
    abilities: c.abilities + '\nRolled: HP d10 ' + R.hp.roll + ' · Morale 2d6 ' + R.morale.roll + ' · Armor d4 ' + R.armor.roll + ' · Damage d12 ' + R.damage.roll + ' · Special d10 ' + e.sp.map(x => x.roll).join('/') }));
  pbNote('m-note', 'Added a built enemy — rename it and describe it.'); autosave();
}
function pbAddCaptain(){
  const G = PG(); const C = parr(typeof PB_CAPTAINS !== 'undefined' ? PB_CAPTAINS : null); const c = C.find(x => x.id === v('cap-pick')) || dpick(C); if(!c || !G) return;
  const ids = [c.captain].concat(c.officers.slice(0, 1), c.crew.slice(0, 1));
  ids.forEach(id => { const m = pbMobPool().find(z => z.id === id); if(m) addStatBlock(Object.assign(pbMobToCard(m), id === c.captain ? { notes: c.aboard, isnpc: true } : {})); });
  const vid = dpick(c.vessels), tpl = pbTemplates().find(t => t.id === c.ships), base = pbShipPool().find(s => s.id === vid);
  if(tpl && base) { const s = G.applyTemplate(base, tpl), card = pbShipToCard(s, 'foe'); card.name = c.name.replace(/^The /, '') + "'s " + base.name; card.notes = c.aboard; addPbShip(card); }
  pbNote('m-note', 'Added <b>' + escH(c.name) + '</b>, an officer and a crew block' + (base ? ', and a ' + escH(base.name) + ' on the Ships tab' : '') + '.'); autosave();
}

// ── DOM → state / state → DOM ──
PLUG.init = function(){ pbFillPickers(); };
PLUG.read = function(){
  state.details.faction = v('f-d-faction'); state.details.port = v('f-d-port');
};
PLUG.build = function(){
  const D = state.details || {};
  ['faction','port'].forEach(k => { const el = document.getElementById('f-d-' + k); if(!el) return; if(D[k] && ![...el.options].some(o => o.value === D[k])) el.insertAdjacentHTML('beforeend', '<option>' + escH(D[k]) + '</option>'); el.value = D[k] || ''; });
  try { readVehicles(); } catch(e) {}   // fill the ships' crew-skill boxes
};
PLUG.detailRows = D => [['Faction', D.faction], ['Port', D.port]];

// ── Print: the ships after the voyage legs ──
function dsec(title, inner, cls) { return '<div class="p-section pb-sec' + (cls ? ' ' + cls : '') + '"><div class="sl">' + title + '</div>' + inner + '</div>'; }
function dbadge(l, v, cls) { return (v === '' || v == null) ? '' : '<span class="pb-badge' + (cls ? ' ' + cls : '') + '"><span>' + escH(l) + '</span>' + escH(String(v)) + '</span>'; }
function dline(l, v) { return (v && String(v).trim()) ? '<p class="loc-desc"><strong class="loc-lbl">' + escH(l) + ':</strong> ' + fmtText(v) + '</p>' : ''; }
function pbShipBlock(s) {
  const k = pbShipCalc(s);
  const role = s.role === 'party' ? 'Party ship' : s.role === 'foe' ? 'Encountered' : '';
  const SP = parr(typeof PB_SPECIALTY_CREW !== 'undefined' ? PB_SPECIALTY_CREW : null), SH = parr(typeof PB_SHANTIES !== 'undefined' ? PB_SHANTIES : null);
  const cells = [['HP', (s.hp !== '' ? s.hp : '—') + (s.hpMax !== '' && s.hpMax !== s.hp ? '/' + s.hpMax : '')], ['Hull', s.hull ? '−' + s.hull : '—'], ['AGL', s.agility !== '' ? psgn(dnum(s.agility)) : '—'], ['Speed', s.speed || '—'],
    ['Skill', k.hasSkill ? psgn(k.now) : '—'], ['Broadsides', s.broadsides || '—'], ['Small arms', s.smallArms || '—'], ['Ram', s.ram || '—'], ['Crew', s.crewMin || s.crewMax ? s.crewMin + '–' + s.crewMax + (s.crew ? ' (' + s.crew + ')' : '') : (s.crew || '—')], ['Cargo', s.cargoSlots || '—']];
  let h = '<div class="pb-box pb-ship-box' + (s.role === 'foe' ? ' foe' : '') + '">'
    + '<div class="pb-badges">' + dbadge('', role, s.role === 'foe' ? 'red' : '') + dbadge('Type', s.base) + (k.modSum ? dbadge('Skill mods', psgn(k.modSum) + ' (' + k.lines.join(', ') + ')', 'warn') : '') + '</div>'
    + '<table class="pb-shipstats"><tr>' + cells.map(c => '<th>' + escH(c[0]) + '</th>').join('') + '</tr><tr>' + cells.map(c => '<td>' + escH(String(c[1])) + '</td>').join('') + '</tr></table>';
  if((s.specialty || []).length) h += dline('Specialty crew', s.specialty.map(id => { const x = SP.find(z => z.id === id); return x ? x.name + ' (' + x.text.replace(/\.$/, '') + ')' : id; }).join('; '));
  if((s.shanties || []).length) h += dline('Known shanties', s.shanties.map(id => { const x = SH.find(z => z.id === id); return x ? x.name : id; }).join(', ') + ' — ' + k.perDay + ' a day');
  if(s.cargo) h += '<p class="loc-desc"><strong class="loc-lbl">Cargo:</strong></p><div class="pb-list">' + s.cargo.split('\n').filter(Boolean).map(x => '<div class="sb-ability">⚓ ' + fmtText(x) + '</div>').join('') + '</div>';
  h += dline('Special', s.special) + dline('Notes', s.notes);
  if(k.hasSkill) h += '<div class="pb-note dim">Morale 2d6 ' + psgn(k.now) + (k.qm ? ' +3' : '') + ', under 4 surrenders or mutinies. Crew actions DR12' + ((s.specialty || []).indexOf('drunk-crew') >= 0 ? ' (+2 drunk)' : '') + '.</div>';
  return h + '</div>';
}
// ── Ships are the Vehicles module (labelled Ships): the PB plug-in draws the full ship card ──
function pbShipCalcBox(c, s) {
  const k = pbShipCalc(s), el = c.querySelector('.sh-calc');
  if(el) el.innerHTML = (k.hasSkill ? 'Crew skill <b>' + psgn(k.now) + '</b>' + (k.modSum ? ' <span style="opacity:.75">(' + psgn(k.base) + ' base, ' + escH(k.lines.join(', ')) + ')</span>' : '') : 'No crew skill — use the passengers\' stats.')
    + (k.hasSkill ? '<br>Morale: 2d6 ' + psgn(k.now) + (k.qm ? ' +3' : '') + ' — under 4, surrender or mutiny.' : '')
    + '<br>Shanties a day: <b>' + k.perDay + '</b> (1 ± the Captain\'s SPIRIT)' + (s.shanties.length ? ' · ' + s.shanties.length + ' known' : '')
    + (k.under ? '<br><b>Under-crewed</b>: one crew action a turn, and tick "Under manned".' : '');
}
PLUG.vehicles = {
  add: data => addPbShip(data && data.stats ? PREG.pbVehicleToShip(data) : (data || {})),
  read: c => { const s = pbShipRead(c); pbShipCalcBox(c, s); return PREG.pbShipToVehicle(s); },
  preview: x => { const s = PREG.pbVehicleToShip(x); return dsec((s.role === 'party' ? 'Our Ship' : 'Ship') + (s.name ? ' — ' + escH(s.name) : ''), pbShipBlock(s)); }
};
// The book's own hints replace the generic ones on the Voyage and Ships tabs.
['travel-hint', 'vehicles-hint'].forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
