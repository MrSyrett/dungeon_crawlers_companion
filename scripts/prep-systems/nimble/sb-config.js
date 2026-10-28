const SB_CONFIG = {
  typePlaceholder: 'MINION // KOBOLDS // SMALL',
  hp: null,
  // Size rides in the type line ("… // <SIZE>"), so no duplicate stat box.
  rows: [
    [{ key:'level', label:'LVL', th:'Level' }, { key:'hp', label:'HP' }, { key:'armor', label:'ARMOR' }, { key:'saves', label:'SAVES' }],
  ],
  abilitiesLabel: 'Abilities', abilitiesPlaceholder: 'One per line — Name: effect',
  mobs: { placeholder: 'Search the Nimble Bestiary…', pool: () => ((typeof NIMBLE_MONSTERS !== 'undefined' && Array.isArray(NIMBLE_MONSTERS)) ? NIMBLE_MONSTERS : []).concat(_hbMobs), toCard: m => ({
    sbtype: m.legendary ? 'boss' : 'mob', name: m.name || '',
    type: [...new Set([m.legendary ? 'LEGENDARY' : m.minion ? 'MINION' : 'MONSTER', String(m.family||'').toUpperCase(), String(m.size||'').toUpperCase()].filter(Boolean))].join(' // '), flavor: '',
    level: String(m.level ?? ''), size: m.size || '', hp: m.hp != null ? String(m.hp) : (m.minion ? '1' : ''), armor: m.armor || '', saves: m.saves || '',
    abilities: [...(m.abilities||[]).map(a => a.name + ': ' + a.text), m.familyTrait ? 'Family trait: ' + m.familyTrait : ''].filter(Boolean).join('\n'),
  }), sub: m => (m.family || '') + ' · L' + m.level + (m.legendary ? ' · legendary' : m.minion ? ' · minion' : '') },
};
