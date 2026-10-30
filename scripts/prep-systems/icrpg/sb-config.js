const SB_CONFIG = {
  typePlaceholder: 'GRUNT // ALFHEIM',
  hp: null,
  // Tier rides in the type line ("MONSTER // <tier> // <world>"), so no duplicate stat box.
  rows: [
    [{ key:'hearts', label:'HEARTS' }, { key:'hp', label:'HP' }, { key:'def', label:'DEF', th:'Defense' }],
    [{ key:'str', label:'STR', ph:'+0' }, { key:'dex', label:'DEX', ph:'+0' }, { key:'con', label:'CON', ph:'+0' }, { key:'int', label:'INT', ph:'+0' }, { key:'wis', label:'WIS', ph:'+0' }, { key:'cha', label:'CHA', ph:'+0' }],
  ],
  abilitiesLabel: 'Attacks & Abilities', abilitiesPlaceholder: 'One per line — ATK: Claw d6 · Ability: effect',
  mobs: { placeholder: 'Search the ICRPG Bestiary…', pool: () => ((typeof ICRPG_MONSTERS !== 'undefined' && Array.isArray(ICRPG_MONSTERS)) ? ICRPG_MONSTERS : []).concat(_hbMobs), toCard: m => { const s = m.stats || {}; const st = k => s[k] == null ? '' : ((s[k] >= 0 ? '+' : '') + s[k]); return {
    sbtype: /boss|big five|villain/i.test(m.tier||'') ? 'boss' : 'mob', name: m.name || '',
    type: ['MONSTER', (m.tier||'').toUpperCase(), String(m.world||'').toUpperCase()].filter(Boolean).join(' // '), flavor: m.desc || '',
    tier: m.tier || '', hearts: m.hearts != null ? String(m.hearts) : '', hp: m.hp != null ? String(m.hp) : (m.hearts != null ? String(m.hearts * 10) : ''), def: m.defense != null ? String(m.defense) : '',
    str: st('STR'), dex: st('DEX'), con: st('CON'), int: st('INT'), wis: st('WIS'), cha: st('CHA'),
    abilities: [...(m.attacks||[]).map(a => 'ATK: ' + a), ...(m.abilities||[])].join('\n'),
  }; }, sub: m => [m.tier, m.hearts != null ? m.hearts + '♥' : '', m.world].filter(Boolean).join(' · ') },
};
