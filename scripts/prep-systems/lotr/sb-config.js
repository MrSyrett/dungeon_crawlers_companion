const SB_CONFIG = {
  typePlaceholder: 'HUMANOID // CR 1/4',
  hp: null,
  // CR rides in the type line (e.g. "HUMANOID // CR 1/4"), so it gets no duplicate stat box.
  rows: [
    [{ key:'ac', label:'AC' }, { key:'hp', label:'HP' }, { key:'speed', label:'SPEED' }],
    [{ key:'str', label:'STR', ph:'10' }, { key:'dex', label:'DEX', ph:'10' }, { key:'con', label:'CON', ph:'10' }, { key:'int', label:'INT', ph:'10' }, { key:'wis', label:'WIS', ph:'10' }, { key:'cha', label:'CHA', ph:'10' }],
  ],
  abilitiesLabel: 'Shadow, Traits & Actions', abilitiesPlaceholder: 'One per line — Name: effect  (a "Shadow:" line is highlighted)',
  // LotR adversaries use the D&D monster shape (+ group/description). The Shadow
  // they inflict (Strike Fear, Wight Song …) is summarised into a leading
  // "Shadow:" line so it reads at a glance on the printed block.
  mobs: { placeholder: 'Search the adversaries…', pool: () => ((typeof LOTR_MONSTERS !== 'undefined' && Array.isArray(LOTR_MONSTERS)) ? LOTR_MONSTERS : []).concat(_hbMobs), toCard: m => { const A = m.abilities || {}; const sh = lotrShadowSummary(m); return {
    sbtype: /chief|king|great orc|hound of sauron|captain|bodyguard|búrzgul/i.test(m.name||'') ? 'boss' : (m.group === 'Folk of Eriador' || /lady elwen/i.test(m.name||'')) ? 'npc' : 'mob',
    name: m.name || '',
    type: [String(m.type||'').toUpperCase(), 'CR ' + m.cr, m.xp != null ? m.xp + ' XP' : ''].filter(Boolean).join(' // '), flavor: m.description || String(m.size||''),
    ac: String(m.ac ?? '') + (m.acNote ? ' ' + m.acNote : ''), hp: m.hpFormula ? String(m.hpFormula) : (m.hp != null ? String(m.hp) : ''), speed: (m.speed||'').replace(/ ?ft\./g, ''), cr: String(m.cr ?? ''),
    str: String(A.STR ?? ''), dex: String(A.DEX ?? ''), con: String(A.CON ?? ''), int: String(A.INT ?? ''), wis: String(A.WIS ?? ''), cha: String(A.CHA ?? ''),
    abilities: [sh ? 'Shadow: ' + sh : '', m.savingThrows ? 'Saves: ' + m.savingThrows : '', m.skills ? 'Skills: ' + m.skills : '', m.damageResistances ? 'Resistances: ' + m.damageResistances : '', m.damageImmunities ? 'Immunities: ' + m.damageImmunities : '', m.conditionImmunities ? 'Cond. Immunities: ' + m.conditionImmunities : '', m.senses ? 'Senses: ' + m.senses : '', m.languages ? 'Languages: ' + m.languages : '', '---', ...(m.traits||[]).map(t => t.name + ': ' + t.description), ...(m.actions||[]).map(a => a.name + ': ' + a.description), ...(m.bonusActions||[]).map(a => 'Bonus — ' + a.name + ': ' + a.description), ...(m.reactions||[]).map(a => 'Reaction — ' + a.name + ': ' + a.description)].filter(Boolean).join('\n'),
  }; }, sub: m => [m.group, 'CR ' + m.cr, lotrShadowSummary(m) ? 'Shadow' : ''].filter(Boolean).join(' · '),
    // The picker's group filter (Orcs, Trolls, Wolves, Folk of Eriador …).
    typeOf: m => m.group || '' },
  // The Shadow an adversary inflicts is the line a Loremaster hunts for: highlight it.
  abilityLine: a => {
    const idx = a.indexOf(':'), lab = idx > 0 ? a.slice(0, idx) : '';
    if(!(/^shadow$/i.test(lab.trim()) || /strike fear|wight song|shadow points?/i.test(a))) return '';
    return idx > 0 ? `<div class="sb-ability sb-shadow"><strong>${escH(lab)}:</strong> ${escH(a.slice(idx+1).trim())}</div>` : `<div class="sb-ability sb-shadow">${escH(a)}</div>`;
  },
};
// "Strike Fear — 1 Shadow (Dread), DC 13 CHA · Wight Song — 2 Shadow (Sorcery), DC 13 INT"
function lotrShadowSummary(m) {
  const ABB = { strength:'STR', dexterity:'DEX', constitution:'CON', intelligence:'INT', wisdom:'WIS', charisma:'CHA' };
  const out = [];
  [...(m.traits||[]), ...(m.actions||[]), ...(m.bonusActions||[]), ...(m.reactions||[])].forEach(t => {
    const d = String(t.description || '');
    const x = /(?:gains?\s+)?(\d+|half[^.]*?bonus[^.]*?)\s+Shadow points?\s+(?:from|\()\s*(Dread|Sorcery|Greed|Misdeeds?)/i.exec(d);
    if (!x) return;
    const dc = /resisted by a (?:DC\s*(\d+)\s+)?(\w+)/i.exec(d.slice(x.index).split('.')[0]);
    if (dc) { x[3] = dc[1] || ''; x[4] = dc[2]; }
    const amt = /^\d+$/.test(x[1]) ? x[1] : '½ PB';
    out.push(t.name + ' — ' + amt + ' Shadow (' + x[2] + ')' + (x[4] ? ', ' + (x[3] ? 'DC ' + x[3] + ' ' : '') + (ABB[String(x[4]).toLowerCase()] || x[4]) + ' save' : ''));
  });
  return out.join(' · ');
}
