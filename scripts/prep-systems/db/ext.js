// ══ Dragonbane plug-in ══════════════════════════════════════════════════════
// The book's six-die generators (Quest, Journey, Adventure Site, NPC) wired to the
// shared template: the Quest fills Adventure Details, a Journey adds a Travel leg,
// an Adventure Site is written into the Overview (its boss as the Opposition), an
// NPC adds a stat block. Plus typical traps (→ Hazards), Leaving the Site (→ GM
// Notes; a chapter is one site), the journey leg's mishap and
// encounter rolls, and random finds / coins for Treasure. Tables and numbers come
// from /tools-data/db-data.js (window.DB_*) and its GM suite /tools-data/db-gm-tables.js
// (window.DB_GM); all text here is our own.
const DG = () => (typeof window.DB_GM !== 'undefined' ? window.DB_GM : null);
const DT = k => (typeof DB_GM_TABLES !== 'undefined' && DB_GM_TABLES) ? DB_GM_TABLES[k] : null;
function drnd(n){ return 1 + Math.floor(Math.random() * n); }
function dpick(a){ return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ''; }
function dcap(s){ s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

// ── The Quest → Adventure Details ──
function dbRollQuest(silent){
  const G = DG(); const a = G && G.adventure('quest'); if(!a) return;
  const v = a.cols.map(c => c.value);
  setVal('f-d-name', dcap(v[5]));
  setVal('f-d-hooks', a.text);
  setVal('f-d-questgiver', dcap(v[2]));
  setVal('f-d-goal', dcap(v[3]) + ' the ' + v[4] + ' called ' + v[5] + '.');
  if(!silent) { autosave(); switchTab('adventure'); }
}
// ── A Journey → a Travel leg ──
function dbRollJourney(silent){
  const G = DG(); const a = G && G.adventure('journey'); if(!a) return null;
  const v = a.cols.map(c => c.value);
  const hard = /arduous|hard|miserable|dangerous/i.test(v[0]);
  const card = addTravelLeg({ name: 'To ' + dcap(v[5]), to: dcap(v[5]), distance: String(15 * (2 + drnd(4))), opts: { offroad: true },
    notes: a.text + (hard ? ' Plan a mishap or two.' : '') });
  if(!silent) { autosave(); switchTab('travel'); }
  return card;
}
// ── An Adventure Site → the Overview (one chapter is one site), boss → Opposition ──
function dbRollSite(silent, name){
  const G = DG(); const a = G && G.adventure('site'); if(!a) return;
  const v = a.cols.map(c => c.value);
  if(!name) { const J = G.rollCols('journey'); name = J ? dcap(J[5].value) : 'The Adventure Site'; }
  const block = PREG.siteText({ name: name, wayin: v[0], inside: v[1], guests: G.rollInline(v[2] + ' ' + v[3]), challenge: v[4], boss: v[5] });
  const ov = document.getElementById('f-overview');
  if(ov) ov.value = (ov.value.trim() ? ov.value.replace(/\s+$/, '') + '\n\n' : '') + block;
  const op = document.getElementById('f-d-opposition'); if(op && !op.value.trim()) op.value = dcap(v[5]);
  if(!silent) { autosave(); switchTab('adventure'); }
}
function dbRollWholeAdventure(){
  dbRollQuest(true);
  const leg = dbRollJourney(true);
  if(!v('f-overview')) setVal('f-overview', [v('f-d-hooks'), leg ? (leg.querySelector('.tv-notes')?.value || '').replace(/ Plan a mishap or two\.$/, '') : ''].filter(Boolean).join(' '));
  // The journey's destination names the site.
  dbRollSite(true, leg && leg.querySelector('.tv-to') ? leg.querySelector('.tv-to').value : '');
  autosave(); switchTab('adventure');
}
// ── NPC table → a stat block (closest typical NPC's numbers) + social notes ──
function dbRollNpc(){
  const G = DG(); const n = G && G.npc(); if(!n) return;
  const base = n.stats ? dbMobToCard(Object.assign({ _dbkind: 'npc' }, n.stats)) : { sbtype: 'npc', hp: '', abilities: '' };
  addStatBlock(Object.assign({}, base, {
    sbtype: 'npc', name: n.name, type: [n.kin, n.profession].filter(Boolean).join(' ').toUpperCase() + ' // ' + String(n.attitude || '').toUpperCase(),
    flavor: '', wants: n.motivation, quirks: n.trait,
    info: 'Attitude: ' + n.attitude + (n.stats ? ' · Stats as ' + n.stats.name : '') + ' · Other names: ' + n.names.filter(x => x !== n.name).join(', ')
  }));
  const note = document.getElementById('q-npc-note');
  if(note) note.innerHTML = 'Added <b>' + escH(n.name) + '</b> — ' + escH(n.attitude) + ' ' + escH(n.kin) + ' ' + escH(String(n.profession).toLowerCase()) + '.';
  autosave();
}

// ── Travel legs: the book's journey mishap (D12) and a random encounter ──
PLUG.travel.mishapLabel = 'Roll a mishap (D12)';
PLUG.travel.mishap = function(card){
  const G = DG(); const m = G && G.mishap(); if(!m || !card) return;
  _appendLine(card.querySelector('.tv-mishaps'), 'D12 ' + m.roll + ' ' + m.name + ': ' + m.text);
};
PLUG.travel.encounterLabel = 'Random encounter (monster / NPC / animal)';
PLUG.travel.encounter = function(card){
  const m = dpick(dbMobPool().filter(x => !x.boss)); if(!m || !card) return;
  const n = m._dbkind === 'npc' && /Goblin|Orc|Skeleton|Bandit|Cultist|Guard/.test(m.name) ? ' ×' + drnd(6) : m._dbkind === 'animal' && /Wolf/.test(m.name) ? ' ×' + drnd(4) : '';
  _appendLine(card.querySelector('.tv-encounters'), m.name + n + ' (' + (m.group || '') + ')');
};

// ── Leaving the Site: what happens if they leave for a shift and come back (→ GM Notes) ──
function dbLeavingTable() {
  const t = DT('leavingSite'); if(!t) return;
  _appendLine(document.getElementById('f-notes'), 'If they leave the site and come back:\n' + t.rows.map(r => 'D6 ' + (Array.isArray(r.roll) ? r.roll[0] + '–' + r.roll[1] : r.roll) + ': ' + r.text).join('\n'));
}
function dbLeavingRoll() {
  const G = DG(); const x = G && G.rollRows('leavingSite'); if(!x) return;
  _appendLine(document.getElementById('f-notes'), 'Leaving the site — rolled D6 ' + x.roll + ': ' + x.row.text);
}

// ── Traps → Hazards ──
function dbRandomTrap(){
  const t = DT('traps'); const r = t && dpick(t.rows); if(!r) return {};
  return { name: r.name, effect: [r.text, r.damage ? 'Damage: ' + r.damage : ''].filter(Boolean).join('\n'), spot: 'SPOT HIDDEN to notice; SLEIGHT OF HAND to disarm' };
}

// ── Treasure: a random find from the gear lists, or a purse of coins ──
function dbTreasureRandom() {
  // The gear lists (+ the viewer's homebrew) load on first use.
  if(PREG && !dbTreasureRandom._ready) { PREG.loadItems('DB', () => { dbTreasureRandom._ready = true; dbTreasureRandom(); }); return; }
  const c = v('tr-cat'); const pool = (PREG ? PREG.itemList('DB') : []).filter(x => !c || x.category === c);
  const x = dpick(pool); if(!x) return;
  addReward({ name: x.name, stats: x.desc || '', cat: x.category || '' }); autosave();
}
function dbTreasureCoins() {
  const G = DG(); if(!G) return;
  const c = G.coins(v('tr-purse'));
  addReward({ name: c.name + ' — ' + c.amount + ' ' + c.unit, stats: 'Coins: ' + c.text });
  autosave();
}

// The book's own hint replaces the generic one on the Journey tab.
['travel-hint'].forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
