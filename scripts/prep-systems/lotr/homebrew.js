let _hbMobs = [];
async function loadHomebrewMobs() {
  let rows;
  try {
    const r = await fetch('/api/homebrew?type=lotr-monster', { credentials: 'same-origin' });
    if(!r.ok) return;
    const data = await r.json();
    rows = Array.isArray(data.items) ? data.items : [];
  } catch(e) { return; }
  const seen = new Set();
  const next = [];
  rows.forEach(row => {
    if(!row || row.type !== 'lotr-monster' || !row.data) return;
    const d = row.data;
    const nm = String(d.name || '').trim();
    if(!nm || seen.has(nm.toLowerCase())) return;
    seen.add(nm.toLowerCase());
    // Homebrew data already uses the book monster field names (name, size, type,
    // alignment, ac, hp, speed, cr, abilities{STR…}, traits[], actions[], …).
    next.push(Object.assign({ homebrew: true }, d, { name: nm }));
  });
  _hbMobs = next;
  try { mobTypesRefresh(); } catch(e) {}
  try { const list = document.getElementById('mobpick-list'); if(list && list.classList.contains('show') && typeof mobSearch === 'function') mobSearch(); } catch(e) {}
}
loadHomebrewMobs();
