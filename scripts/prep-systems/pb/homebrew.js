let _hbMobs = [], _hbShips = [], _hbGear = [];
async function pbFetchHb(type) {
  try {
    const r = await fetch('/api/homebrew?type=' + type, { credentials: 'same-origin' });
    if(!r.ok) return [];
    const data = await r.json();
    return (Array.isArray(data.items) ? data.items : []).filter(row => row && row.type === type && row.data && String(row.data.name || '').trim()).map(row => Object.assign({ homebrew: true }, row.data, { name: String(row.data.name).trim() }));
  } catch(e) { return []; }
}
async function loadHomebrewMobs() {
  const uniq = list => { const seen = new Set(); return list.filter(x => { const k = x.name.toLowerCase(); if(seen.has(k)) return false; seen.add(k); return true; }); };
  const [mon, shp, wpn, arm, gear, rel, rit] = await Promise.all(['pb-monster', 'pb-ship', 'pb-weapon', 'pb-armor', 'pb-gear', 'pb-relic', 'pb-ritual'].map(pbFetchHb));
  _hbMobs = uniq(mon).map(m => Object.assign({}, m, { group: m.group || pbCat(m) }));
  _hbShips = uniq(shp);
  window.__PB_HB_MONSTERS = _hbMobs; window.__PB_HB_SHIPS = _hbShips;
  _hbGear = [].concat(wpn.map(x => Object.assign({ _hb: 'weapon' }, x)), arm.map(x => Object.assign({ _hb: x.slot === 'hat' ? 'hat' : 'armor' }, x)), gear.map(x => Object.assign({ _hb: 'gear' }, x)), rel.map(x => Object.assign({ _hb: 'relic' }, x)), rit.map(x => Object.assign({ _hb: 'ritual' }, x)));
  try { mobTypesRefresh(); pbFillPickers(); } catch(e) {}
  try { const list = document.getElementById('mobpick-list'); if(list && list.classList.contains('show') && typeof mobSearch === 'function') mobSearch(); } catch(e) {}
}
loadHomebrewMobs();
