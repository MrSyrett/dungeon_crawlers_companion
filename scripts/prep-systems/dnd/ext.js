// ══ D&D 2024 plug-in ════════════════════════════════════════════════════════
// Encounter difficulty (registry encounterInfo: the linked cast's XP vs the party's XP
// budget) shows on each encounter. Treasure: magic items for a hoard, picked at random
// from the app's magic item list by the rarities that suit the hoard's CR band.
function xRoll(expr){ const m=/(\d*)d(\d+)\s*(?:[×x*]\s*([\d,]+))?/i.exec(String(expr||'')); if(!m) return null; const n=parseInt(m[1]||'1',10), d=parseInt(m[2],10), mul=m[3]?parseInt(m[3].replace(/,/g,''),10):1; const r=[]; for(let i=0;i<n;i++) r.push(1+Math.floor(Math.random()*d)); return { total: r.reduce((a,b)=>a+b,0)*mul, dice:r, mul }; }
function xPick(a){ return a && a.length ? a[Math.floor(Math.random()*a.length)] : null; }
const DND_BANDS = { '0-4': ['Common', 'Uncommon'], '5-10': ['Uncommon', 'Rare'], '11-16': ['Rare', 'Very Rare'], '17+': ['Very Rare', 'Legendary'] };
function dndHoardItems(){
  const band = v('dnd-hoard-band') || '0-4', n = parseInt(v('dnd-hoard-n'), 10) || 1;
  PREG.loadScripts(['/tools-data/dnd-magic-items.js'], () => {
    const L = (typeof DND_MAGIC_ITEMS !== 'undefined' ? DND_MAGIC_ITEMS : []).filter(m => (DND_BANDS[band] || []).indexOf(m.rarity) >= 0);
    for(let i = 0; i < n; i++){ const m = xPick(L); if(!m) break;
      addReward({ name: m.name, flavor: m.description || '', stats: [m.rarity, m.type, m.attunement ? 'requires attunement' : ''].filter(Boolean).join(' · '), cat: 'magic' }); }
    autosave();
  });
}
