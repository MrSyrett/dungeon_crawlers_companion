const _d6Def = (m, k) => { const r = (m.special||[]).map(x => new RegExp('^\\s*' + k + '\\s+(\\d+)', 'i').exec(String(x))).find(Boolean); return r ? r[1] : ''; };
const _d6Code = p => { p = Math.round(Number(p)||0); const d = Math.floor(p/3), r = p%3; return d ? d + 'D' + (r ? '+' + r : '') : (r ? '+' + r : ''); };
const SB_CONFIG = {
  typePlaceholder: 'FOE // HUMANOID',
  hp: null,
  rows: [
    [{ key:'agi', label:'AGI', th:'Agility', ph:'2D' }, { key:'bra', label:'BRAWN', th:'Brawn', ph:'2D' }, { key:'kno', label:'KNOW', th:'Knowledge', ph:'2D' }, { key:'per', label:'PERC', th:'Perception', ph:'2D' }],
    [{ key:'dodge', label:'DODGE' }, { key:'parry', label:'PARRY' }, { key:'move', label:'MOVE' }],
  ],
  abilitiesLabel: 'Skills, Powers & Notes', abilitiesPlaceholder: 'One per line — brawling 4D · Special: night vision',
  mobs: { placeholder: 'Search the D62e Bestiary…', pool: () => ((typeof D62E_CREATURES !== 'undefined' && Array.isArray(D62E_CREATURES)) ? D62E_CREATURES : []).concat(_hbMobs), toCard: m => { const A = m.attributes || {}; const c = k => A[k] == null ? '' : _d6Code(A[k]); return {
    sbtype: /villain|boss|dragon|giant|robot/i.test(String(m.kind||'') + ' ' + String(m.name||'')) ? 'boss' : /npc|ally|civilian|detective|medic/i.test(String(m.kind||'') + ' ' + String(m.name||'')) ? 'npc' : 'mob', name: m.name || '',
    type: [String(m.kind||'Foe').toUpperCase(), m.genre && m.genre !== 'core' ? String(m.genre).toUpperCase() : ''].filter(Boolean).join(' // '), flavor: m.description || '',
    agi: c('Agility'), bra: c('Brawn'), kno: c('Knowledge'), per: c('Perception'),
    dodge: _d6Def(m, 'Dodge'), parry: _d6Def(m, 'Parry'), move: m.move || '',
    abilities: [...(m.skills||[]).map(x => 'Skill: ' + x), ...(m.special||[]).filter(x => !/^\s*(Dodge|Parry)\s+\d/i.test(x)).map(x => 'Special: ' + x), ...(m.talents||[]).map(x => 'Talent: ' + x), ...(m.powers||[]).map(x => 'Power: ' + x)].filter(Boolean).join('\n'),
  }; }, sub: m => String(m.kind||'') + (m.genre && m.genre !== 'core' ? ' · ' + m.genre : '') },
};
