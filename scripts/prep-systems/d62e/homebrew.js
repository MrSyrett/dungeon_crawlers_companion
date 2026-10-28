let _hbMobs = [];
// "3D+2" → pips (3×3+2). The card's toCard runs _d6Code() on pips, so we store
// attributes as pip numbers to match the book creature shape.
function _d6Pips(code) {
  if(typeof code === 'number') return code;
  const m = String(code||'').match(/(\d+)\s*D?(?:\s*\+\s*(\d+))?/i);
  if(!m) return 0;
  return (parseInt(m[1],10)||0) * 3 + (parseInt(m[2],10)||0);
}
async function loadHomebrewMobs() {
  let rows;
  try {
    const r = await fetch('/api/homebrew?type=d62e-creature', { credentials: 'same-origin' });
    if(!r.ok) return;
    const data = await r.json();
    rows = Array.isArray(data.items) ? data.items : [];
  } catch(e) { return; }
  const seen = new Set();
  const next = [];
  const ATTRS = ['Agility','Brawn','Knowledge','Perception'];
  rows.forEach(row => {
    if(!row || row.type !== 'd62e-creature' || !row.data) return;
    const d = row.data;
    const nm = String(d.name || '').trim();
    if(!nm || seen.has(nm.toLowerCase())) return;
    seen.add(nm.toLowerCase());
    // Canonical stored shape carries attributes{Agility…} as pip numbers; if an
    // item only has the editor's top-level code strings, convert those to pips.
    let attributes = d.attributes;
    if(!attributes || typeof attributes !== 'object' || !Object.keys(attributes).length) {
      attributes = {};
      ATTRS.forEach(k => { if(d[k] != null && d[k] !== '') attributes[k] = _d6Pips(d[k]); });
    }
    next.push(Object.assign({ homebrew: true }, d, { name: nm, attributes }));
  });
  _hbMobs = next;
  try { const list = document.getElementById('mobpick-list'); if(list && list.classList.contains('show') && typeof mobSearch === 'function') mobSearch(); } catch(e) {}
}
loadHomebrewMobs();
