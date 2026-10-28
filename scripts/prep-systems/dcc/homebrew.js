let _hbMobs = [];
async function loadHomebrewMobs() {
  let rows;
  try {
    const r = await fetch('/api/homebrew?type=dcc-monster', { credentials: 'same-origin' });
    if(!r.ok) return;
    const data = await r.json();
    rows = Array.isArray(data.items) ? data.items : [];
  } catch(e) { return; }
  const seen = new Set();
  const next = [];
  rows.forEach(row => {
    if(!row || row.type !== 'dcc-monster' || !row.data) return;
    const d = row.data;
    const nm = String(d.name || '').trim();
    if(!nm || seen.has(nm.toLowerCase())) return;
    seen.add(nm.toLowerCase());
    // The editor stores HB health as slotCount × hpPerSlot; the card wants an
    // hbSlots[] array. stats come as {STR:{score,mod}} (post Apply-derived); if a
    // creature was saved before that, fall back to the raw point-buy scores.
    const slotN = parseInt(d.slotCount, 10) || 0;
    const hbSlots = Array.isArray(d.hbSlots) ? d.hbSlots
      : (slotN > 0 ? Array.from({ length: slotN }, () => d.hpPerSlot) : []);
    let stats = d.stats;
    if(!stats || typeof stats !== 'object' || !Object.keys(stats).length) {
      const sc = d.scores || {};
      stats = {};
      Object.keys(sc).forEach(k => { stats[k.toUpperCase()] = sc[k]; });
    }
    next.push(Object.assign({ homebrew: true }, d, { name: nm, hbSlots, stats }));
  });
  _hbMobs = next;
  try { const list = document.getElementById('mobpick-list'); if(list && list.classList.contains('show') && typeof mobSearch === 'function') mobSearch(); } catch(e) {}
}
loadHomebrewMobs();
