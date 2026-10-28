const SB_CONFIG = {
  typePlaceholder: 'GRUNT // ELITE',
  hp: null,
  rows: [
    [{ key:'str', label:'STR' }, { key:'agi', label:'AGI' }, { key:'wits', label:'WITS' }, { key:'emp', label:'EMP' }],
    [{ key:'health', label:'HEALTH' }, { key:'armor', label:'ARMOR' }, { key:'skills', label:'KEY SKILLS', ph:'Close Combat 2 · Ranged Combat 1' }],
  ],
  abilitiesLabel: 'Attacks & Notes', abilitiesPlaceholder: 'One per line — Attack: pool, damage · Note: …',
  mobs: { placeholder: 'Search the Alien RPG Bestiary…', pool: () => (typeof ALIEN_BESTIARY !== 'undefined' && Array.isArray(ALIEN_BESTIARY)) ? ALIEN_BESTIARY : [], toCard: m => {
    const isNpc = m.group === 'NPC' || m.str != null;
    return {
    sbtype: isNpc ? 'npc' : (/queen|praetorian|crusher|harvester|swarm/i.test(m.name||'') ? 'boss' : 'mob'),
    name: m.name || '',
    type: [String(m.group||'').toUpperCase(), m.stage ? String(m.stage).toUpperCase() : ''].filter(Boolean).join(' // '),
    flavor: isNpc ? '' : [m.speed ? 'Speed ' + m.speed : '', m.acid && m.acid !== '—' ? 'Acid ' + m.acid : ''].filter(Boolean).join(' · '),
    str: isNpc && m.str != null ? String(m.str) : '', agi: isNpc && m.agi != null ? String(m.agi) : '', wits: isNpc && m.wits != null ? String(m.wits) : '', emp: isNpc && m.emp != null ? String(m.emp) : '',
    health: String(m.health ?? ''), armor: isNpc ? '' : String(m.armor ?? ''), skills: (m.skills && m.skills !== '—') ? m.skills : '',
    abilities: [
      ...((typeof ALIEN_ATTACKS !== 'undefined' && ALIEN_ATTACKS[m.name]) ? ALIEN_ATTACKS[m.name].map(a => 'D6 ' + a.roll + ' ' + a.name + ': ' + a.effect) : []),
      m.talent ? 'Talent: ' + m.talent : '', m.gear ? 'Gear: ' + m.gear : '',
      m.acid && m.acid !== '—' ? 'Acid Splash: ' + m.acid : '', m.notes || ''
    ].filter(Boolean).join('\n'),
  }; }, sub: m => [m.group, m.stage].filter(Boolean).join(' · ') },
};
