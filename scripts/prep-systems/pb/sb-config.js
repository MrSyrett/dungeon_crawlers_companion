const SB_CONFIG = {
  typePlaceholder: 'UNDEAD // ZOMBIES // TRAPPED IN THE TROPICS',
  hp: null,
  // Pirate Borg (MÖRK BORG-style) block: HP, Morale (2–12, or – for never breaks),
  // armor die, and the PC-side DRs — to hit it and to defend against it (12
  // unless the block says otherwise). Attacks ("Cutlass: d6") and specials go one
  // per line in the box below; a d6 attack table reads "1-2. Sandblast: …".
  rows: [
    [{ key:'hp', label:'HP' }, { key:'morale', label:'MORALE', ph:'7 or –' }, { key:'armor', label:'ARMOR', ph:'−d2' }, { key:'atkdr', label:'TO HIT', ph:'DR12' }, { key:'defdr', label:'DEFEND', ph:'DR12' }],
  ],
  abilitiesLabel: 'Attacks & Specials',
  abilitiesPlaceholder: 'One per line — Cutlass: d6 · Musket: 2d6 (Reload 2) · Zombie Infection: … · a d6 attack table: 1-2. Sandblast: …',
  mobs: { placeholder: 'Search the bestiary…', pool: () => pbMobPool(), toCard: m => pbMobToCard(m),
    sub: m => [m.group || pbCat(m), 'HP ' + m.hp, 'Morale ' + pbMorale(m.morale)].filter(Boolean).join(' · '),
    // The type filter: a group name, "cat:<category>" or "src:<book>".
    match: (m, g) => {
      if(!g) return true;
      if(g.indexOf('cat:') === 0) return String(m.category || '') === g.slice(4);
      if(g.indexOf('src:') === 0) { const b = g.slice(4); return b === 'Homebrew' ? !!m.homebrew : (m.source === b || (Array.isArray(m.sources) && m.sources.some(x => x.source === b))); }
      return String(m.group || '') === g;
    },
    typeOptions: cur => {
      const P = pbMobPool(), uniq = a => [...new Set(a.filter(Boolean))];
      const o = (v, l) => '<option value="' + escA(v) + '"' + (v === cur ? ' selected' : '') + '>' + escH(l) + '</option>';
      return '<option value="">All types (' + P.length + ')</option>'
        + '<optgroup label="Group">' + uniq(P.map(m => m.group)).map(g => o(g, g)).join('') + '</optgroup>'
        + '<optgroup label="Category">' + uniq(P.map(m => m.category)).map(c => o('cat:' + c, c === 'npc' ? 'NPC' : String(c).charAt(0).toUpperCase() + String(c).slice(1))).join('') + '</optgroup>'
        + '<optgroup label="Book">' + uniq(P.map(m => m.homebrew ? 'Homebrew' : m.source)).map(b => o('src:' + b, b)).join('') + '</optgroup>';
    } },
  // "1-2. Sandblast: …" is a row of a creature's d6 attack table.
  abilityLine: a => { const mt = /^([1-6](?:[–-][1-6])?)\.\s*([^:]+):\s*([\s\S]*)$/.exec(String(a).trim());
    return mt ? `<div class="sb-ability sb-matk"><span class="sb-d6">d6 ${escH(mt[1])}</span><span><strong>${escH(mt[2])}:</strong> ${escH(mt[3])}</span></div>` : ''; },
};
// The bestiary: Trapped in the Tropics creatures and NPCs, the Guidebook's
// summoned things (Skeletal Thrall, Phantasmal Fauna, mishap birds) and the
// viewer's pb-monster homebrew.
function pbCat(m) { const c = String(m.category || 'monster'); return c === 'npc' ? 'NPC' : c.charAt(0).toUpperCase() + c.slice(1); }
function pbMorale(v) { return v == null || v === '' ? '–' : String(v); }
function pbArmorTxt(a) { return a && a.die ? '−' + String(a.die).replace(/^[-−]/, '') : '—'; }
function pbMobPool() {
  const arr = v => Array.isArray(v) ? v : [];
  return arr(typeof PB_MONSTERS !== 'undefined' ? PB_MONSTERS : null).map(m => Object.assign({}, m, { group: m.group || pbCat(m) }))
    .concat(_hbMobs);
}
function pbMobToCard(m) {
  const dr = m.dr || {};
  const atk = (m.attacks || []).map(a => a.name + ': ' + (a.damage || '—') + (a.notes ? ' (' + a.notes + ')' : ''));
  const tbl = m.attackTable && Array.isArray(m.attackTable.rows) ? m.attackTable.rows.map(r => {
    const g = Array.isArray(r.roll) ? r.roll[0] + '-' + r.roll[1] : String(r.roll);
    return g + '. ' + (r.name || 'Attack') + ': ' + (r.text || '');
  }) : [];
  const extra = [];
  if (m.attacksPerRound && m.attacksPerRound !== 1) extra.push('Attacks: ' + m.attacksPerRound + ' a round' + (m.attackTable && m.attackTable.note ? ' — ' + m.attackTable.note : ''));
  else if (m.attackTable && m.attackTable.note) extra.push('Attacks: ' + m.attackTable.note);
  if (m.attackChoice) extra.push(m.attackChoice === 'pick 1-2' ? 'Attacks: armed with 1 or 2 of the following' : 'Attacks: one of the following each round');
  if (m.hpText && String(m.hpText) !== String(m.hp)) extra.push('HP: ' + m.hpText + (m.hpDice ? ' (roll when it appears; ~' + m.hp + ')' : ''));
  if (m.moraleText && String(m.moraleText) !== String(m.morale)) extra.push('Morale: ' + m.moraleText);
  if (m.blackPowder) extra.push('Black powder: its guns ignore armor');
  if (m.ignoresArmor) extra.push('Ignores armor: its damage ignores the target\'s armor');
  if (m.count) extra.push('Appears: ' + m.count);
  if (Array.isArray(m.loot) && m.loot.length) extra.push('Loot: ' + m.loot.map(l => l.name + (l.value ? ' ' + l.value : '')).join(', '));
  // In-block tables (belly of a seagull, omens, despair…) and a sea monster's Naval Combat block.
  const tables = ['lootTable', 'omenTable', 'effectTable'].map(k => m[k]).filter(t => t && Array.isArray(t.rows) && t.rows.length)
    .map(t => (t.name || 'Table') + ' (' + (t.die || 'd6') + '): ' + t.rows.map(r => (Array.isArray(r.roll) ? r.roll[0] + '-' + r.roll[1] : r.roll) + ' ' + String(r.text || r.name || '').replace(/\.$/, '')).join(' · '));
  const nv = m.naval;
  const naval = nv ? ['Naval Combat: HP ' + nv.hp + ' · Morale ' + pbMorale(nv.morale) + ' · ' + (nv.armor ? (nv.armor.name || 'Armor') + ' −' + nv.armor.die : 'no armor') + ' · Speed ' + nv.speed + ' · AGL ' + (nv.agility >= 0 ? '+' : '−') + Math.abs(nv.agility || 0) + ' — ' + (nv.attacks || []).map(a => a.name + (a.damage ? ' ' + a.damage : '') + (a.notes ? ' (' + a.notes + ')' : '')).join(', ')] : [];
  const notes = [m.drNote, m.armorNote].filter(Boolean).map(x => 'Note: ' + x);
  const defWith = m.defendWith && m.defendWith !== 'AGILITY' ? m.defendWith + ' ' : '';
  return {
    sbtype: m.boss ? 'boss' : (m.named && m.category === 'npc') ? 'npc' : 'mob', name: m.name || '',
    type: [pbCat(m).toUpperCase(), m.group && m.group !== pbCat(m) ? String(m.group).toUpperCase() : '', m.homebrew ? 'HOMEBREW' : String(m.source || '').toUpperCase()].filter(Boolean).join(' // '),
    flavor: m.text || '',
    hp: String(m.hp ?? ''), morale: pbMorale(m.morale), armor: m.armor && m.armor.die ? pbArmorTxt(m.armor) + (m.armor.name ? ' ' + m.armor.name : '') : '—',
    atkdr: 'DR' + (dr.attack || 12), defdr: defWith + 'DR' + (dr.defend || 12),
    abilities: extra.concat(atk, tbl, (m.specials || []).map(s => (s.name ? s.name + ': ' : '') + (s.text || '')), tables, naval, notes).join('\n')
  };
}
