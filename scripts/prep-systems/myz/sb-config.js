const SB_CONFIG = {
  typePlaceholder: 'BEAST // STR 5 · FIGHT 2',
  hp: null,
  rows: [
    [{ key:'str', label:'STR' }, { key:'agi', label:'AGI' }, { key:'wit', label:'WIT' }, { key:'emp', label:'EMP' }],
    [{ key:'armor', label:'ARMOR' }, { key:'skills', label:'SKILLS', ph:'Fight 2 · Move 3' }],
  ],
  abilitiesLabel: 'Attacks & Notes', abilitiesPlaceholder: 'One per line — Attack: dmg, range · Note: …',
  mobs: {
    placeholder: 'Search monsters, factions & NPCs…',
    pool: function () {
      var mon = (typeof MYZ_BESTIARY !== 'undefined' && Array.isArray(MYZ_BESTIARY)) ? MYZ_BESTIARY : [];
      var fac = (typeof MYZ_FACTIONS !== 'undefined' && Array.isArray(MYZ_FACTIONS)) ? MYZ_FACTIONS : [];
      var npc = (typeof MYZ_NPCS !== 'undefined' && Array.isArray(MYZ_NPCS)) ? MYZ_NPCS : [];
      return mon.map(function (m) { return Object.assign({ _myzkind: 'monster' }, m); })
        .concat(fac.map(function (f) { return Object.assign({ _myzkind: 'humanoid' }, f); }))
        .concat(npc.map(function (n) { return Object.assign({ _myzkind: 'npc' }, n); }));
    },
    toCard: function (m) {
      function pick(re, s) { var x = String(s || '').match(re); return x ? x[1] : ''; }
      if (m._myzkind === 'npc') {
        return { sbtype: 'npc', name: m.role + ' (NPC)', type: 'NPC', str: String(m.str), agi: String(m.agi), wit: String(m.wit), emp: String(m.emp), armor: '', skills: m.skills || '', abilities: 'Typical ' + m.role + ' NPC — one random mutation, 3 MP.' };
      }
      if (m._myzkind === 'humanoid') {
        var abil = [m.weapons ? ('Weapons: ' + m.weapons) : '', (m.mutations && m.mutations !== 'none') ? ('Mutations: ' + m.mutations + (m.mp ? (' (' + m.mp + ' MP)') : '')) : '', m.special ? ('Special: ' + m.special) : '', m.desc || ''].filter(Boolean).join('\n');
        return { sbtype: 'npc', name: m.name || '', type: 'HUMANOID' + (m.mod && m.mod !== '—' ? (' // ' + m.mod) : ''), str: m.str != null ? String(m.str) : '', agi: m.agi != null ? String(m.agi) : '', wit: m.wit != null ? String(m.wit) : '', emp: m.emp != null ? String(m.emp) : '', armor: pick(/Armor\s*(\d+)/i, (m.weapons || '') + ' ' + (m.special || '')), skills: m.skills || '', abilities: abil };
      }
      var s = m.stats || '';
      var skills = s.replace(/STR\s*\d+,?\s*/i, '').replace(/AGI\s*\d+,?\s*/i, '').replace(/WIT\s*\d+,?\s*/i, '').replace(/EMP\s*\d+,?\s*/i, '').replace(/Armor\s*[^;]*;?/i, '').replace(/^[;,\s]+/, '').trim();
      return { sbtype: 'mob', name: m.name || '', type: 'MONSTER' + (m.mod ? (' // ' + m.mod) : ''), str: pick(/(?:STR|Strength)\s*(\d+)/i, s), agi: pick(/(?:AGI|Agility)\s*(\d+)/i, s), wit: pick(/WIT\s*(\d+)/i, s), emp: pick(/EMP\s*(\d+)/i, s), armor: pick(/Armor\s*(\d+)/i, s), skills: skills, abilities: ['Attack: ' + (m.attack || ''), m.desc || ''].filter(Boolean).join('\n') };
    },
    sub: function (m) { return m._myzkind === 'monster' ? ('Monster · ' + m.mod) : (m._myzkind === 'humanoid' ? ('Humanoid · ' + m.mod) : 'NPC'); }
  },
};
