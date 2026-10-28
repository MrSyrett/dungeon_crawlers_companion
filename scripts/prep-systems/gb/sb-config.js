const SB_CONFIG = {
  typePlaceholder: 'SLIMER // Class 5 Free-Roaming Vapor',
  hp: null,
  // Power rides in the stat grid (it's a rollable die pool), so it's dropped from the type line;
  // Special Abilities are listed in the freeform section below, not a stat box.
  rows: [
    [{ key:'brains', label:'BRAINS' }, { key:'muscles', label:'MUSCLES' }, { key:'moves', label:'MOVES' }, { key:'cool', label:'COOL' }, { key:'power', label:'POWER' }, { key:'ectopresence', label:'ECTO' }],
  ],
  abilitiesLabel: 'Special Abilities, Talents & Tags', abilitiesPlaceholder: 'One per line — Special: name · Talent: name value · Goal: … · Tag: …',
  mobs: { placeholder: 'Search the Ghostbusters bestiary (ghosts, monsters & extras)…', pool: () => (typeof GB_BESTIARY !== 'undefined' && Array.isArray(GB_BESTIARY)) ? GB_BESTIARY : [], toCard: m => {
    const p = Number(m.power) || 0;
    return {
    sbtype: p >= 7 ? 'boss' : (p >= 1 ? 'mob' : 'npc'), name: m.name || '',
    type: (m.role || ''),
    flavor: (m.description || '').slice(0, 120),
    brains: String(m.brains ?? ''), muscles: String(m.muscles ?? ''), moves: String(m.moves ?? ''), cool: String(m.cool ?? ''), power: String(m.power ?? ''), ectopresence: String(m.ectopresence ?? ''),
    abilities: [
      (m.powers && m.powers.length) ? 'Special Abilities: ' + (m.powers || []).join(' · ') : '',
      ...((m.talents || []).map(t => 'Talent: ' + t.name + ' ' + t.value)),
      m.goal ? 'Goal: ' + m.goal : '',
      m.tags ? 'Tags: ' + m.tags : '',
    ].filter(Boolean).join('\n'),
  }; }, sub: m => (m.role || '') + (m.power != null ? ' · Power ' + m.power : '') + (m.ectopresence != null ? ' · Ecto ' + m.ectopresence : '') },
};
