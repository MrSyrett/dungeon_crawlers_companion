// Homebrew monsters (type "monster") join the Shadowdark picker, and the creature
// types come from /api/monster-types (the GM Screen's map, one copy for the app).
let _hbMobs = [];
let _sdMonTypes = { types: [], byName: {} };
function _sdTypeOf(m) { if(m && m.ctype) return m.ctype; return _sdMonTypes.byName[m && m.name] || 'Monster'; }
async function loadHomebrewMobs() {
  let rows;
  try {
    const r = await fetch('/api/homebrew?type=monster', { credentials: 'same-origin' });
    if(!r.ok) return;
    const data = await r.json();
    rows = Array.isArray(data.items) ? data.items : [];
  } catch(e) { return; }
  const seen = new Set(), next = [];
  rows.forEach(row => {
    if(!row || row.type !== 'monster' || !row.data) return;
    const d = row.data, nm = String(d.name || '').trim();
    if(!nm || seen.has(nm.toLowerCase())) return;
    seen.add(nm.toLowerCase());
    next.push({ name: nm, ac: String(d.ac||''), hp: String(d.hp||''), atk: String(d.atk||''), mv: String(d.mv||''), lv: String(d.lv||''), al: String(d.al||''),
      s: String(d.s||''), d: String(d.d||''), c: String(d.c||''), i: String(d.i||''), w: String(d.w||''), ch: String(d.ch||''),
      notes: String(d.notes||''), ctype: String(d.ctype||'Monster'), homebrew: true });
  });
  _hbMobs = next;
  try { if(typeof mobTypesRefresh === 'function') mobTypesRefresh(); } catch(e) {}
}
async function loadMonsterTypes() {
  try {
    const r = await fetch('/api/monster-types', { credentials: 'same-origin' });
    if(!r.ok) return;
    const data = await r.json();
    if(Array.isArray(data.types)) _sdMonTypes = { types: data.types, byName: data.byName || {} };
    if(typeof mobTypesRefresh === 'function') mobTypesRefresh();
  } catch(e) {}
}
loadHomebrewMobs(); loadMonsterTypes();
