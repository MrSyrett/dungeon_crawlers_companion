// ══ Dungeon Crawler Carl plug-in ═════════════════════════════════════════════
// Loot boxes by tier (/tools-data/dcc-loot.js: gold, gear rolls, a sample of the box's
// contents) → Treasure. The floor block (registry SECTIONS.DCC) sets the Difficulties
// and the floor timer.
function xRoll(expr){ const m=/(\d*)d(\d+)\s*(?:[×x*]\s*([\d,]+))?/i.exec(String(expr||'')); if(!m) return null; const n=parseInt(m[1]||'1',10), d=parseInt(m[2],10), mul=m[3]?parseInt(m[3].replace(/,/g,''),10):1; const r=[]; for(let i=0;i<n;i++) r.push(1+Math.floor(Math.random()*d)); return { total: r.reduce((a,b)=>a+b,0)*mul, dice:r, mul }; }
function xPick(a){ return a && a.length ? a[Math.floor(Math.random()*a.length)] : null; }
function dccLootBox(){
  const T = (typeof DCC_LOOT !== 'undefined' && DCC_LOOT) ? DCC_LOOT.tiers : []; const t = T.find(x => x.tier === v('dcc-box-tier')) || T[0]; if(!t) return;
  const g = t.gold && t.gold !== 'none' ? xRoll(t.gold) : null, item = xPick(t.contents || []);
  addReward({ name: t.tier + ' Loot Box', flavor: item ? 'Inside: ' + item : '',
    stats: [g ? 'Gold ' + t.gold + ' → ' + g.total.toLocaleString() : '', t.gearRolls ? t.gearRolls + ' gear roll' + (t.gearRolls === 1 ? '' : 's') : '', t.xValue ? 'X-value: ' + t.xValue : '', t.page ? (t.source || 'Core') + ' p. ' + t.page : ''].filter(Boolean).join(' · '), cat: 'loot' });
  autosave();
}
(function(){ const sel = document.getElementById('dcc-box-tier'); const T = (typeof DCC_LOOT !== 'undefined' && DCC_LOOT) ? DCC_LOOT.tiers : []; if(sel) sel.innerHTML = T.map(t => '<option>' + escH(t.tier) + '</option>').join(''); })();
