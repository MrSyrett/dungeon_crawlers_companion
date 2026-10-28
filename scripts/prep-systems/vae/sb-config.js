const SB_CONFIG = {
  typePlaceholder: 'VAESEN // FEAR 2',
  hp: null,
  rows: [
    [{ key:'might', label:'MIGHT' }, { key:'bodyControl', label:'BODY' }, { key:'magic', label:'MAGIC' }, { key:'manipulation', label:'MANIP' }],
    [{ key:'fear', label:'FEAR' }, { key:'protection', label:'PROT' }, { key:'conditions', label:'CONDITIONS', ph:'Furious +1 · Bleeding −1 · Broken' }],
  ],
  abilitiesLabel: 'Powers, Combat & Ritual', abilitiesPlaceholder: 'One per line — Power / Attack / Ritual / Secret',
  mobs: {
    placeholder: 'Search vaesen, NPCs & animals…',
    pool: function () {
      var vae = (typeof VAE_BESTIARY !== 'undefined' && Array.isArray(VAE_BESTIARY)) ? VAE_BESTIARY : [];
      var npcs = (typeof VAE_NPCS !== 'undefined' && Array.isArray(VAE_NPCS)) ? VAE_NPCS : [];
      var animals = (typeof VAE_ANIMALS !== 'undefined' && Array.isArray(VAE_ANIMALS)) ? VAE_ANIMALS : [];
      return vae.map(function (v) { return Object.assign({ _vaekind: 'vaesen' }, v); })
        .concat(npcs.map(function (n) { return Object.assign({ _vaekind: 'npc' }, n); }))
        .concat(animals.map(function (a) { return Object.assign({ _vaekind: 'animal' }, a); }));
    },
    toCard: function (m) {
      if (m._vaekind === 'npc') {
        return { sbtype: 'npc', name: m.name || '', type: 'NPC', might: '', bodyControl: '', magic: '', manipulation: '', fear: '', protection: '', conditions: 'Tough ' + m.toughPhys + '/' + m.toughMental,
          abilities: ['PHY ' + m.physique + ' · PRE ' + m.precision + ' · LOG ' + m.logic + ' · EMP ' + m.empathy, m.skills ? ('Skills: ' + m.skills) : '', 'Toughness ' + m.toughPhys + ' physical / ' + m.toughMental + ' mental — no Conditions.'].filter(Boolean).join('\n') };
      }
      if (m._vaekind === 'animal') {
        return { sbtype: 'mob', name: m.name || '', type: 'ANIMAL', might: String(m.might), bodyControl: String(m.bodyControl), magic: '', manipulation: '', fear: '', protection: '', conditions: 'Tough ' + m.toughness,
          abilities: ['Attack with Might ' + m.might + ' · Damage ' + m.damage, 'Body Control ' + m.bodyControl + ' to sneak or evade. One slow + one fast action.'].join('\n') };
      }
      var s = m.stats || {};
      var abil = [(m.powers && m.powers.length) ? ('Powers: ' + m.powers.join(' · ')) : '', m.combat ? ('Combat: ' + m.combat) : '', m.weakness ? ('Ritual & Secret: ' + m.weakness) : ''].filter(Boolean).join('\n');
      return { sbtype: 'boss', name: m.name || '', type: 'VAESEN', might: String(s.might != null ? s.might : ''), bodyControl: String(s.bodyControl != null ? s.bodyControl : ''), magic: String(s.magic != null ? s.magic : ''), manipulation: String(s.manipulation != null ? s.manipulation : ''), fear: String(s.fear != null ? s.fear : ''), protection: '', conditions: m.conditions || '', abilities: abil };
    },
    sub: function (m) { return m._vaekind === 'vaesen' ? ('Vaesen · Fear ' + ((m.stats || {}).fear)) : (m._vaekind === 'animal' ? 'Animal' : 'NPC'); }
  },
};
