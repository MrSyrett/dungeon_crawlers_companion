const _jlSgn = v => v == null ? '' : ((v >= 0 ? '+' : '') + v);
const SB_CONFIG = {
  typePlaceholder: 'STREET THUG // Tier E · Minion',
  hp: null,
  rows: [
    [{ key:'pot', label:'POT' }, { key:'acc', label:'ACC' }, { key:'agi', label:'AGI' }, { key:'res', label:'RES' }, { key:'spi', label:'SPI' }, { key:'mnd', label:'MND' }],
    [{ key:'resolve', label:'RESOLVE' }, { key:'defense', label:'DEFENSE' }, { key:'dr', label:'DR' }],
  ],
  abilitiesLabel: 'Attacks, Powers & Abilities', abilitiesPlaceholder: 'One per line — Attack: name +bonus, XdY+Z (type) · Power: … · Ability: …',
  mobs: { placeholder: 'Search the JLU Bestiary (minions, threats & villains)…', pool: () => (typeof JLU_BESTIARY !== 'undefined' && Array.isArray(JLU_BESTIARY)) ? JLU_BESTIARY : [], toCard: m => {
    const A = m.attributes || {};
    const role = String(m.role || '');
    const sbtype = /minion|brute|general/i.test(role) ? 'mob' : /villain/i.test(role) ? 'boss' : 'npc';
    return {
    sbtype: sbtype, name: m.name || '',
    type: ['TIER ' + (m.tier || ''), role].filter(Boolean).join(' // '),
    flavor: [m.realName && m.realName !== m.name ? m.realName : '', m.origin || ''].filter(Boolean).join(' · '),
    pot: _jlSgn(A.potency), acc: _jlSgn(A.accuracy), agi: _jlSgn(A.agility), res: _jlSgn(A.resistance), spi: _jlSgn(A.spirit), mnd: _jlSgn(A.mind),
    resolve: String(m.resolve ?? ''), defense: String(m.defense ?? ''), dr: String(m.damageReduction || ''),
    abilities: (function(){
      const combat = [
        ...((m.attacks || []).map(a => 'Attack: ' + a.name + ' ' + _jlSgn(a.bonus) + ', ' + a.damage + (a.type ? ' (' + a.type + ')' : ''))),
        (m.powers && m.powers.length) ? 'Powers: ' + m.powers.join(' · ') : '',
        ...((m.abilities || []).map(a => a.name + ': ' + a.text)),
        ...((m.archetypeSkills || []).map(a => a.name + ': ' + a.text)),
      ].filter(Boolean);
      const desc = [
        (m.knowledge && m.knowledge.length) ? 'Knowledge: ' + m.knowledge.join(', ') : '',
        (m.traits && m.traits.length) ? 'Traits: ' + m.traits.join(', ') : '',
        (m.equipment && m.equipment.length) ? 'Equipment: ' + m.equipment.join(', ') : '',
        ...((m.limitations || []).map(a => 'Limitation — ' + a.name + ': ' + a.text)),
      ].filter(Boolean);
      // "---" renders as a thin divider, keeping Powers/attacks apart from the descriptive lines.
      return [...combat, ...(combat.length && desc.length ? ['---'] : []), ...desc].join('\n');
    })(),
  }; }, sub: m => 'Tier ' + (m.tier || '') + ' · ' + (m.role || '') },
};
