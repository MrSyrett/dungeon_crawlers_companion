// ══ Mutant: Year Zero plug-in ══════════════════════════════════════════════
// Zone legs (the Travel module): the Rot level of the sectors crossed, the sector's
// environment and a threat rolled from the GM tables (/tools-data/myz-gm-tables.js).
// Ark projects are a section (registry SECTIONS.MYZ).
const MT = k => (typeof MYZ_GM_TABLES !== 'undefined' && MYZ_GM_TABLES) ? MYZ_GM_TABLES[k] : null;
function myzRoll(key){
  const t = MT(key); if(!t) return null;
  const isD66 = t.some(r => /^\d\d/.test(String(r.roll)));
  const n = isD66 ? (1 + Math.floor(Math.random() * 6)) * 10 + 1 + Math.floor(Math.random() * 6) : 1 + Math.floor(Math.random() * 6);
  const row = t.find(r => { const p = String(r.roll).split('-').map(x => parseInt(x, 10)); return n >= p[0] && n <= (p[1] || p[0]); });
  return row ? { roll: n, text: row.result } : null;
}
PLUG.travel.fields = function(data){
  const R = (typeof MYZ_ROT !== 'undefined' && MYZ_ROT) ? MYZ_ROT : [];
  return '<div class="field-row2 field-group"><div><label class="field-label">Rot level</label><select class="ui-select tv-rot" onchange="autosave()"><option value="">—</option>' + R.map(r => '<option value="' + r.level + '"' + (String(data.rot) === String(r.level) ? ' selected' : '') + '>' + r.level + ' — ' + escH(r.name) + '</option>').join('') + '</select></div></div>'
    + '<div style="display:flex;gap:6px;"><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="myzRollRot(this)">🎲 Rot level</button><button class="btn-add btn-mini btn-roll" style="flex:1" onclick="myzRollEnv(this)">🎲 Environment</button></div>';
};
PLUG.travel.read = c => ({ rot: c.querySelector('.tv-rot')?.value || '' });
function myzRollRot(btn){ const x = myzRoll('rotLevel'); if(!x) return; const m = /\((\d)\)/.exec(x.text); const sel = btn.closest('.travel-card').querySelector('.tv-rot'); if(m && sel) sel.value = m[1]; autosave(); }
function myzRollEnv(btn){ const x = myzRoll('sectorEnvironment'); if(!x) return; const t = btn.closest('.travel-card').querySelector('.tv-terrain'); if(t) t.value = (t.value ? t.value.replace(/\s+$/, '') + '; ' : '') + x.text; autosave(); }
PLUG.travel.encounterLabel = 'Threat (humanoid / monster / phenomenon)';
PLUG.travel.encounter = function(card){
  const k = myzRoll('threatType'); if(!k) return;
  const sub = myzRoll({ Humanoid: 'humanoidThreat', Monster: 'monsterThreat', Phenomenon: 'phenomenonThreat' }[k.text] || 'monsterThreat');
  _appendLine(card.querySelector('.tv-encounters'), k.text + (sub ? ': ' + sub.text : ''));
};
