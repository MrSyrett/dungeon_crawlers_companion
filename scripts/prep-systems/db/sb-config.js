const SB_CONFIG = {
  typePlaceholder: 'MONSTER // LARGE // FEROCITY 2',
  hp: null,
  // Dragonbane stat line: HP, WP, Armor, Movement and Ferocity (initiative cards
  // a round — 1 for everyone but monsters). Skills, weapons, the D6 monster-attack
  // table and traits go one per line in the box below.
  rows: [
    [{ key:'hp', label:'HP' }, { key:'wp', label:'WP' }, { key:'armor', label:'ARMOR' }, { key:'move', label:'MOVE' }, { key:'ferocity', label:'FEROCITY', ph:'1' }],
  ],
  abilitiesLabel: 'Skills, Weapons, Attacks & Traits',
  abilitiesPlaceholder: 'One per line — Skills: Awareness 12, Evade 10 · Broadsword: skill 14, 2D6 + D4 · monster attacks as a D6 table: 1. Claw: …',
  mobs: { placeholder: 'Search monsters, NPCs & animals…', pool: () => dbMobPool(), toCard: m => dbMobToCard(m),
    sub: m => [m.group, m._dbkind === 'monster' ? 'Ferocity ' + m.ferocity : '', m.hp != null ? 'HP ' + m.hp : ''].filter(Boolean).join(' · '),
    // The picker's type filter: Monster (by category), NPC, Boss, Animal, the kin…
    typeOf: m => m.group || '' },
  // "1. Claw Attack: …" / "1–2. Swirling Horror: …" is a row of a monster's D6 attack table.
  abilityLine: a => { const mt = /^([1-6](?:[–-][1-6])?)\.\s*([^:]+):\s*([\s\S]*)$/.exec(String(a).trim());
    return mt ? `<div class="sb-ability sb-matk"><span class="sb-d6">D6 ${escH(mt[1])}</span><span><strong>${escH(mt[2])}:</strong> ${escH(mt[3])}</span></div>` : ''; },
};
// Monsters (D6 attack table + Ferocity), typical NPCs (skills, weapons, heroic
// abilities; bosses flagged) and common animals, plus the viewer's homebrew.
function dbMobPool() {
  const arr = v => Array.isArray(v) ? v : [];
  const npcGroup = n => n.boss ? 'Boss' : (!n.kind || n.kind === 'Typical') ? 'NPC' : String(n.kind);
  return []
    .concat(arr(typeof DB_MONSTERS !== 'undefined' ? DB_MONSTERS : null).map(m => Object.assign({}, m, { _dbkind: 'monster', group: m.category ? 'Monster · ' + m.category : 'Monster' })))
    .concat(arr(typeof DB_NPCS !== 'undefined' ? DB_NPCS : null).map(n => Object.assign({}, n, { _dbkind: 'npc', group: npcGroup(n) })))
    .concat(arr(typeof DB_ANIMALS !== 'undefined' ? DB_ANIMALS : null).map(a => Object.assign({}, a, { _dbkind: 'animal', group: 'Animal' })))
    .concat(_hbMobs);
}
// "1. Claw Attack: Slashes one character for 2D10…" (a "1–2." range for a swarm).
function dbAttackLines(m) {
  return (m.attacks || []).map((a, i) => {
    const g = Array.isArray(a.rolls) ? a.rolls : (Array.isArray(m.attackRolls) && m.attackRolls[i]) ? m.attackRolls[i] : [a.roll || i + 1, a.roll || i + 1];
    return (g[0] === g[1] ? g[0] : g[0] + '–' + g[1]) + '. ' + a.name + ': ' + (a.text || '');
  });
}
function dbMobToCard(m) {
  const kind = m._dbkind || (Array.isArray(m.attacks) && m.ferocity != null ? 'monster' : m.attack ? 'animal' : 'npc');
  const bonus = m.damageBonus ? Object.keys(m.damageBonus).map(k => m.damageBonus[k]).filter(Boolean).join(' + ') : '';
  const TR = (typeof DB_NPC_TRAITS !== 'undefined' && DB_NPC_TRAITS) || {};
  const skills = Object.keys(m.skills || {}).map(k => k + ' ' + m.skills[k]).join(', ');
  if(kind === 'monster') {
    return {
      sbtype: m.ferocity >= 3 || /dragon|demon/i.test(m.name || '') ? 'boss' : 'mob', name: m.name || '',
      type: ['MONSTER', String(m.size || '').toUpperCase(), 'FEROCITY ' + (m.ferocity ?? 1)].filter(Boolean).join(' // '), flavor: m.text || '',
      hp: String(m.hp ?? '') + (m.hpPer ? ' per ' + m.hpPer : ''), wp: '', armor: m.armor == null ? '—' : String(m.armor), move: String(m.movement ?? '') + (m.flying ? ' (fly)' : ''), ferocity: String(m.ferocity ?? 1),
      abilities: dbAttackLines(m).concat(
        (m.traits || []).map(t => t.name + ': ' + t.text),
        m.resistances && m.resistances.length ? ['Resistant: ' + m.resistances.join(', ')] : [],
        m.immunities && m.immunities.length ? ['Immune: ' + m.immunities.join(', ')] : [],
        m.gear && m.gear.length ? ['Gear: ' + [].concat(m.gear).join(', ')] : [],
        ['Dodge: 15 (uses one of its turns)']).join('\n')
    };
  }
  if(kind === 'animal') {
    const a = m.attack || {};
    return { sbtype: 'mob', name: m.name || '', type: 'ANIMAL', flavor: '', hp: String(m.hp ?? ''), wp: '', armor: '—', move: String(m.movement ?? ''), ferocity: '1',
      abilities: [skills ? 'Skills: ' + skills : '', a.name ? a.name + ': skill ' + a.skill + ', ' + a.damage : ''].filter(Boolean).join('\n') };
  }
  return {
    sbtype: m.boss ? 'boss' : (m.kind === 'Typical' || !m.kind) ? 'npc' : 'mob', name: m.name || '',
    type: [String(m.kind && m.kind !== 'Typical' ? m.kind : 'NPC').toUpperCase(), m.boss ? 'BOSS' : ''].filter(Boolean).join(' // '), flavor: '',
    hp: String(m.hp ?? ''), wp: m.wp != null ? String(m.wp) : '', armor: m.armor ? m.armor.rating + ' (' + m.armor.name + ')' : '—', move: String(m.movement ?? ''), ferocity: '1',
    abilities: [skills ? 'Skills: ' + skills : '']
      .concat((m.weapons || []).map(w => w.name + (w.qty > 1 ? ' ×' + w.qty : '') + ': skill ' + w.skill + ', ' + [w.damage, bonus].filter(Boolean).join(' + ')))
      .concat(m.spells && m.spells.length ? ['Spells: ' + m.spells.join(', ')] : [])
      .concat(m.abilities && m.abilities.length ? ['Heroic abilities: ' + m.abilities.join(', ')] : [])
      .concat((m.traits || []).map(t => t + ': ' + (TR[t] || '')))
      .concat(m.gear && m.gear.length ? ['Gear: ' + [].concat(m.gear).join(', ')] : [])
      .filter(Boolean).join('\n')
  };
}
