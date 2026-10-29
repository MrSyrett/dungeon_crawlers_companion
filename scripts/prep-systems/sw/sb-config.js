const _swCode = p => { p = Math.round(Number(p)||0); const d = Math.floor(p/3), r = p%3; return d ? d + 'D' + (r ? '+' + r : '') : (r ? '+' + r : ''); };
const SB_CONFIG = {
  typePlaceholder: 'IMPERIAL // STORMTROOPER',
  hp: null,
  rows: [
    [{ key:'dex', label:'DEX', th:'DEX', ph:'2D' }, { key:'kno', label:'KNOW', th:'KNO', ph:'2D' }, { key:'mec', label:'MECH', th:'MEC', ph:'2D' }, { key:'per', label:'PERC', th:'PER', ph:'2D' }, { key:'str', label:'STR', th:'STR', ph:'2D' }, { key:'tec', label:'TECH', th:'TEC', ph:'2D' }],
    // 1st edition prints no Move stat; Sourcebook creatures carry a Speed Code (key stays 'move' for saved prep).
    [{ key:'move', label:'SPEED', th:'Speed Code (creatures)' }, { key:'force', label:'FORCE PTS', th:'Force Points' }, { key:'armor', label:'ARMOR' }],
  ],
  abilitiesLabel: 'Skills, Equipment & Notes', abilitiesPlaceholder: 'One per line — blaster 4D · Stormtrooper armor (+1D)',
  mobs: { placeholder: 'Search the Star Wars Bestiary…', pool: () => (typeof SW_CHARACTERS !== 'undefined' && Array.isArray(SW_CHARACTERS)) ? SW_CHARACTERS : [], toCard: m => { const A = m.attributes || {}; const c = k => A[k] == null ? '' : _swCode(A[k]); return {
    sbtype: /villain/i.test(m.group||'') ? 'boss' : /hero|rebel|civilian|alien/i.test(m.group||'') ? 'npc' : 'mob', name: m.name || '',
    type: [String(m.group||'').toUpperCase(), m.book === 'sourcebook' ? 'SOURCEBOOK' : m.book === 'companion' ? 'RULES COMPANION' : ''].filter(Boolean).join(' // '), flavor: m.description || '',
    dex: c('Dexterity'), kno: c('Knowledge'), mec: c('Mechanical'), per: c('Perception'), str: c('Strength'), tec: c('Technical'),
    move: String(m.move || '').replace(/^Speed Code\s*/i, ''), force: '', armor: ((m.equipment||[]).find(e => /armor/i.test(e)) || '').split(/[:(]/)[0].trim(),
    abilities: [...(m.skills||[]).map(x => 'Skill: ' + x), ...(m.equipment||[]).map(x => 'Gear: ' + x), m.notes ? 'Notes: ' + m.notes : ''].filter(Boolean).join('\n'),
  }; }, sub: m => String(m.group||'') + (m.book !== 'core' ? ' · ' + m.book : '') },
};
