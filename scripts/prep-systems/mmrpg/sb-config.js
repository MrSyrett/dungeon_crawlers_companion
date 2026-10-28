const _mvSgn = v => v == null ? '' : ((v >= 0 ? '+' : '') + v);
const SB_CONFIG = {
  typePlaceholder: 'THUG // Rank 1 · Melee +2',
  hp: null,
  // Rank rides in the type line (e.g. "MUTANT // RANK 3"), and Powers are listed in
  // the Attacks & Traits section — so neither gets a duplicate stat box here.
  rows: [
    [{ key:'melee', label:'MEL' }, { key:'agility', label:'AGI' }, { key:'resilience', label:'RES' }],
    [{ key:'vigilance', label:'VIG' }, { key:'ego', label:'EGO' }, { key:'logic', label:'LOG' }],
    [{ key:'health', label:'HEALTH' }, { key:'focus', label:'FOCUS' }],
  ],
  abilitiesLabel: 'Attacks, Traits & Powers', abilitiesPlaceholder: 'One per line — Attack: ability vs defense, dMarvel×rank+ability · Trait: … · Power: …',
  mobs: { placeholder: 'Search the Marvel roster (heroes, villains & NPCs)…', pool: () => (typeof MMRPG_CHARACTERS !== 'undefined' && Array.isArray(MMRPG_CHARACTERS)) ? MMRPG_CHARACTERS.filter(c => String(c.rank).toUpperCase() !== 'X') : [], toCard: m => {
    const A = m.abilities || {};
    const heroic = (m.tags || []).some(t => /^heroic$/i.test(String(t)));
    const rank = parseInt(m.rank, 10) || 0;
    // The Characters list doubles as the bestiary: heroes/allies (Heroic tag) become
    // NPCs, high-rank non-heroes become Threats, the rest become Villains.
    return {
    sbtype: heroic ? 'npc' : (rank >= 5 ? 'boss' : 'mob'), name: m.name || '',
    type: [String(m.origin || '').toUpperCase(), 'RANK ' + (m.rank ?? '')].filter(Boolean).join(' // '),
    flavor: [m.realName && m.realName !== m.name ? m.realName : '', m.occupation || ''].filter(Boolean).join(' · '),
    rank: String(m.rank ?? ''), melee: _mvSgn(A.melee), agility: _mvSgn(A.agility), resilience: _mvSgn(A.resilience),
    vigilance: _mvSgn(A.vigilance), ego: _mvSgn(A.ego), logic: _mvSgn(A.logic),
    health: String(m.health ?? ''), focus: String(m.focus ?? ''),
    powers: (m.powers || []).map(p => (p.set && p.set !== 'None') ? p.set : 'Basic').filter((v, i, a) => a.indexOf(v) === i).join(' · '),
    abilities: (function(){
      const ident = [
        (m.traits && m.traits.length) ? 'Traits: ' + m.traits.join(', ') : '',
        (m.tags && m.tags.length) ? 'Tags: ' + m.tags.join(', ') : '',
        m.teams ? 'Teams: ' + m.teams : '',
      ].filter(Boolean);
      const pow = (m.powers || []).map(p => ((p.set && p.set !== 'None') ? p.set : 'Basic') + ': ' + (p.names || []).join(', ')).filter(Boolean);
      // A "---" line renders as a thin divider, keeping Powers visually apart from Traits/Tags.
      return [...ident, ...(ident.length && pow.length ? ['---'] : []), ...pow].join('\n');
    })(),
  }; }, sub: m => 'Rank ' + (m.rank ?? '') + (m.origin ? ' · ' + m.origin : '') + (m.source && m.source !== 'core' ? ' · ' + m.source : '') },
};
