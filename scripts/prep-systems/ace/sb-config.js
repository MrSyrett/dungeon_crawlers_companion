const SB_CONFIG = {
  typePlaceholder: 'MOOK // CORE',
  hp: null,
  rows: [
    [{ key:'smarts', label:'SMARTS' }, { key:'moves', label:'MOVES' }, { key:'style', label:'STYLE' }, { key:'brawn', label:'BRAWN' }, { key:'power', label:'POWER' }],
    [{ key:'health', label:'HEALTH' }, { key:'defence', label:'DEFENCE' }, { key:'focuses', label:'FOCUSES' }],
  ],
  abilitiesLabel: 'Attacks & Notes', abilitiesPlaceholder: 'One per line — Attack: dice, damage',
  mobs: { placeholder: 'Search the ACE! Bestiary…', pool: () => ((typeof ACE_EXTRAS !== 'undefined' && Array.isArray(ACE_EXTRAS)) ? ACE_EXTRAS : []).concat(_hbMobs), toCard: m => ({
    sbtype: /boss|villain|monster/i.test(m.type||'') ? 'boss' : /npc|ally|civilian/i.test(m.type||'') ? 'npc' : 'mob',
    name: m.name || '', type: [String(m.type||'Extra').toUpperCase(), m.setting && m.setting !== 'core' ? String(m.setting).toUpperCase() : ''].filter(Boolean).join(' // '), flavor: m.description || '',
    smarts: String(m.smarts ?? ''), moves: String(m.moves ?? ''), style: String(m.style ?? ''), brawn: String(m.brawn ?? ''), power: m.power != null ? String(m.power) : '',
    health: String(m.health ?? ''), defence: String(m.defence ?? ''), focuses: (m.focuses||[]).map(f => typeof f === 'string' ? f : [f && f.name, (f && f.stat) ? '(' + f.stat + ')' : ''].filter(Boolean).join(' ')).filter(Boolean).join(', '),
    abilities: [...(m.attacks||[]).map(a => a.name + ': ' + [a.dice != null ? a.dice + ' dice' : '', a.damage != null ? a.damage + ' damage' : '', a.note || ''].filter(Boolean).join(', ')), ...(m.notes||[])].join('\n'),
  }), sub: m => String(m.type||'') + (m.setting && m.setting !== 'core' ? ' · ' + m.setting : '') },
};
