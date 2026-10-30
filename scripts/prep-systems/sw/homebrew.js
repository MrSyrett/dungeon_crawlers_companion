let _hbMobs = [];
async function loadHomebrewMobs() {
  let rows;
  try {
    const r = await fetch('/api/homebrew?type=sw-character', { credentials: 'same-origin' });
    if(!r.ok) return;
    const data = await r.json();
    rows = Array.isArray(data.items) ? data.items : [];
  } catch(e) { return; }
  const seen = new Set();
  const next = [];
  rows.forEach(row => {
    if(!row || row.type !== 'sw-character' || !row.data) return;
    const d = row.data;
    const nm = String(d.name || '').trim();
    if(!nm || seen.has(nm.toLowerCase())) return;
    seen.add(nm.toLowerCase());
    // The server composes the book SW_CHARACTERS shape from the builder (attributes
    // as pips, skills[] / equipment[] lines, group, move "Speed Code 2D") and adds
    // forcePoints / darkSidePoints.
    next.push(Object.assign({ homebrew: true }, d, { name: nm, group: d.group || 'Homebrew' }));
  });
  _hbMobs = next;
  try { const list = document.getElementById('mobpick-list'); if(list && list.classList.contains('show') && typeof mobSearch === 'function') mobSearch(); } catch(e) {}
}
loadHomebrewMobs();
