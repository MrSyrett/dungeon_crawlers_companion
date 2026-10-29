let _hbMobs = [];
async function loadHomebrewMobs() {
  // Dragonbane homebrew comes in two types: db-monster (a D6 attack table) and
  // db-npc (skills + weapons). Both use the book field names.
  const next = [], seen = new Set();
  for (const [type, kind] of [['db-monster', 'monster'], ['db-npc', 'npc']]) {
    let rows;
    try {
      const r = await fetch('/api/homebrew?type=' + type, { credentials: 'same-origin' });
      if(!r.ok) continue;
      const data = await r.json();
      rows = Array.isArray(data.items) ? data.items : [];
    } catch(e) { continue; }
    rows.forEach(row => {
      if(!row || row.type !== type || !row.data) return;
      const d = row.data;
      const nm = String(d.name || '').trim();
      if(!nm || seen.has(nm.toLowerCase())) return;
      seen.add(nm.toLowerCase());
      next.push(Object.assign({ homebrew: true }, d, { name: nm, _dbkind: kind, group: kind === 'monster' ? 'Monster' : (d.boss ? 'Boss' : 'NPC') }));
    });
  }
  _hbMobs = next;
  try { mobTypesRefresh(); } catch(e) {}
  try { const list = document.getElementById('mobpick-list'); if(list && list.classList.contains('show') && typeof mobSearch === 'function') mobSearch(); } catch(e) {}
}
loadHomebrewMobs();
