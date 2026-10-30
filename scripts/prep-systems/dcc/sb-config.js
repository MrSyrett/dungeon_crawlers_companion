const SB_CONFIG = {
  typePlaceholder: 'MOB // PETITE (3) // HUMANOID',
  hp: { valueLabel: 'HP Value', countLabel: 'HP Count' },   // pip row; null = no pips
  rows: [
    [{ key:'level', label:'LVL', th:'Level' }, { key:'surprise', label:'SURP', th:'Surprise' }, { key:'evade', label:'EVADE', th:'Evade' }, { key:'move', label:'MOVE', th:'Move' }, { key:'dr', label:'DR', th:'DR' }],
    [{ key:'str', label:'STR' }, { key:'int', label:'INT' }, { key:'con', label:'CON' }, { key:'dex', label:'DEX' }, { key:'cha', label:'CHA' }],
  ],
  abilitiesLabel: 'Abilities', abilitiesPlaceholder: 'One per line — Name: stats, range, effect',
  mobs: { placeholder: 'Search the DCC Bestiary…', pool: () => ((typeof DCC_MONSTERS !== 'undefined' && Array.isArray(DCC_MONSTERS)) ? DCC_MONSTERS : []).concat(_hbMobs), toCard: m => dccMobToCard(m), sub: m => String(m.role||'') + (m.level!=null ? ' · L'+m.level : '') },
};
const _DCC_SIZE_NAMES = {1:'Tiny',2:'Small',3:'Petite',4:'Medium',5:'Large',6:'Huge',7:'Colossal',8:'Gargantuan'};
// Map a DCC bestiary entry onto the stat-block card fields.
function dccMobToCard(m) {
  const role = String(m.role || 'Mob');
  const sbtype = /boss/i.test(role) ? 'boss' : (/npc|rival/i.test(role) ? 'npc' : 'mob');
  const sizeName = _DCC_SIZE_NAMES[m.size] || '';
  const typeLine = [role.toUpperCase(), sizeName ? (sizeName + ' (' + m.size + ')') : '', (m.tags||[]).join(', ')].filter(Boolean).join(' // ');
  const hb = Array.isArray(m.hbSlots) ? m.hbSlots : [];
  const st = m.stats || {};
  const mod = k => { const s = st[k]; if(s == null) return ''; const v = (s && typeof s.mod === 'number') ? s.mod : s; return (v >= 0 ? '+' : '') + v; };
  const atkLines = (m.attacks||[]).map(a => {
    const bits = [a.toHit ? ('to hit '+a.toHit) : '', a.damage ? (a.damage + (a.damageType ? ' '+a.damageType : '')) : '', a.range || '', a.rider || ''].filter(Boolean).join(', ');
    return a.name + (bits ? ': ' + bits : '');
  });
  return {
    sbtype, name: m.name || '', type: typeLine, flavor: String(m.flavor || ''),
    hpval: hb.length ? String(hb[0]) : '', hpcount: hb.length ? String(hb.length) : '',
    level: (m.level != null ? String(m.level) : ''), surprise: String(m.surprise || ''),
    evade: String(m.evade || ''), move: String(m.move || ''), dr: String(m.dr != null ? m.dr : ''),
    str: mod('STR'), int: mod('INT'), con: mod('CON'), dex: mod('DEX'), cha: mod('CHA'),
    abilities: [...atkLines, ...(m.notes||[])].join('\n')
  };
}
