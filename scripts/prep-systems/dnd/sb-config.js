const SB_CONFIG = {
  typePlaceholder: 'HUMANOID // CR 1/4',
  hp: null,
  // CR rides in the type line (e.g. "HUMANOID // CR 1/4"), so it gets no duplicate stat box.
  rows: [
    [{ key:'ac', label:'AC' }, { key:'hp', label:'HP' }, { key:'speed', label:'SPEED' }],
    [{ key:'str', label:'STR', ph:'10' }, { key:'dex', label:'DEX', ph:'10' }, { key:'con', label:'CON', ph:'10' }, { key:'int', label:'INT', ph:'10' }, { key:'wis', label:'WIS', ph:'10' }, { key:'cha', label:'CHA', ph:'10' }],
  ],
  abilitiesLabel: 'Traits, Actions & Legendary', abilitiesPlaceholder: 'One per line — Name: effect',
  mobs: { placeholder: 'Search the D&D Bestiary…', pool: () => ((typeof DND_MONSTERS !== 'undefined' && Array.isArray(DND_MONSTERS)) ? DND_MONSTERS : []).concat(_hbMobs), toCard: m => { const A = m.abilities || {}; return {
    sbtype: (m.legendaryActions && m.legendaryActions.length) ? 'boss' : /commoner|noble|guard|priest|acolyte|mage|knight|scout|spy|bandit|cultist|tribal|veteran|gladiator|druid|archmage|assassin/i.test(m.name||'') ? 'npc' : 'mob',
    name: m.name || '',
    type: [String(m.type||'').toUpperCase(), 'CR ' + m.cr].filter(Boolean).join(' // '), flavor: m.alignment && m.alignment !== 'Unaligned' ? String(m.size) + ' · ' + m.alignment : String(m.size||''),
    ac: String(m.ac ?? ''), hp: m.hp != null ? String(m.hp) : '', speed: (m.speed||'').replace(/ ?ft\./g, ''), cr: String(m.cr ?? ''),
    str: String(A.STR ?? ''), dex: String(A.DEX ?? ''), con: String(A.CON ?? ''), int: String(A.INT ?? ''), wis: String(A.WIS ?? ''), cha: String(A.CHA ?? ''),
    abilities: [...(m.traits||[]).map(t => t.name + ': ' + t.description), ...(m.actions||[]).map(a => a.name + ': ' + a.description), ...(m.bonusActions||[]).map(a => 'Bonus — ' + a.name + ': ' + a.description), ...(m.reactions||[]).map(a => 'Reaction — ' + a.name + ': ' + a.description), ...(m.legendaryActions||[]).map(a => 'Legendary — ' + a.name + ': ' + a.description)].join('\n'),
  }; }, sub: m => String(m.type||'') + ' · CR ' + m.cr + (m.legendaryActions && m.legendaryActions.length ? ' · legendary' : '') },
};
