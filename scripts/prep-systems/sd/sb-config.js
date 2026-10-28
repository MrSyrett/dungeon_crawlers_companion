// Shadowdark stat card. Keys keep the old SD builder's saved names so existing
// preps load unchanged: hpval = AC, hpcount = HP, evade = WIS (the GM Screen's
// PREP_SB_FIELDS.SD reads the same keys).
const SB_CONFIG = {
  typePlaceholder: 'MONSTER // LV 3 // AL C',
  hp: null,
  rows: [
    [{ key:'hpval', label:'AC', ph:'14' }, { key:'hpcount', label:'HP', ph:'15' }, { key:'move', label:'MV', ph:'near' }, { key:'level', label:'LV', ph:'3' }],
    [{ key:'str', label:'STR', ph:'+0' }, { key:'dex', label:'DEX', ph:'+0' }, { key:'con', label:'CON', ph:'+0' }, { key:'int', label:'INT', ph:'+0' }, { key:'evade', label:'WIS', ph:'+0' }, { key:'cha', label:'CHA', ph:'+0' }],
  ],
  abilitiesLabel: 'Attacks, Traits & Abilities', abilitiesPlaceholder: 'One per line — ATK: 2 claw +3 (1d6) · Petrifying Gaze: …',
  mobs: {
    placeholder: 'Search the Shadowdark bestiary…',
    // Core bestiary + the GM's homebrew monsters (homebrew.js).
    pool: () => ((typeof SD_MONSTERS !== 'undefined' && Array.isArray(SD_MONSTERS)) ? SD_MONSTERS : []).concat(_hbMobs),
    typeOf: m => _sdTypeOf(m),
    toCard: m => {
      const lv = parseInt(m.lv, 10) || 0;
      return {
        sbtype: lv >= 4 ? 'boss' : 'mob', name: m.name || '',
        type: [String(_sdTypeOf(m) || 'Monster').toUpperCase(), m.lv != null && m.lv !== '' ? 'LV ' + m.lv : '', m.al ? 'AL ' + m.al : ''].filter(Boolean).join(' // '),
        flavor: 'LV ' + (m.lv ?? '') + ' | AL ' + (m.al ?? '') + ' | MV ' + (m.mv ?? ''),
        hpval: String(m.ac ?? ''), hpcount: String(m.hp ?? ''), move: String(m.mv ?? ''), level: String(m.lv ?? ''),
        str: String(m.s ?? ''), dex: String(m.d ?? ''), con: String(m.c ?? ''), int: String(m.i ?? ''), evade: String(m.w ?? ''), cha: String(m.ch ?? ''),
        abilities: 'ATK: ' + (m.atk || '') + (m.notes ? '\n' + m.notes : ''),
      };
    },
    sub: m => [_sdTypeOf(m), m.lv != null ? 'LV ' + m.lv : ''].filter(Boolean).join(' · '),
  },
};
