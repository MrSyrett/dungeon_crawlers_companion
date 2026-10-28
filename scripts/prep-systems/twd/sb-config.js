const SB_CONFIG = {
  typePlaceholder: 'SURVIVOR // THREAT',
  hp: null,
  // TWD adversaries aren't attribute-based: humans are a dice-pool tier (Trained 5 /
  // Expert 8) with 3 Health, animals have Attack Dice / Damage / Health, and walkers
  // have no stats at all. So the card tracks Health / Armor + a Skills (dice pool) line.
  rows: [
    [{ key:'health', label:'HEALTH', ph:'3' }, { key:'armor', label:'ARMOR', ph:'—' }],
    [{ key:'skills', label:'SKILLS / DICE POOL', ph:'Expert: Ranged Combat (8 dice) · Trained: Stealth (5)' }],
  ],
  abilitiesLabel: 'Attacks & Notes', abilitiesPlaceholder: 'One per line — e.g. Attack: 6 dice, Damage 2 · Issue: … · Gear: …',
  mobs: {
    placeholder: 'Search NPCs, animals & the dead…',
    pool: function () {
      var npcs = (typeof TWD_NPCS !== 'undefined' && Array.isArray(TWD_NPCS)) ? TWD_NPCS : [];
      var animals = (typeof TWD_ANIMALS !== 'undefined' && Array.isArray(TWD_ANIMALS)) ? TWD_ANIMALS : [];
      return [{ _twdkind: 'walker', name: 'Walker (the Dead)' }]
        .concat(npcs.map(function (n) { return Object.assign({ _twdkind: 'npc' }, n); }))
        .concat(animals.map(function (a) { return Object.assign({ _twdkind: 'animal' }, a); }));
    },
    toCard: function (m) {
      if (m._twdkind === 'walker') return { sbtype: 'boss', name: 'Walker (the Dead)', type: 'THE DEAD', health: '', armor: '', skills: '', abilities: 'No stat block — the dead are measured by Threat Level (0–6) + Swarm Size.\nOn a hit, roll Walker Attack (D66).' };
      if (m._twdkind === 'animal') return { sbtype: 'mob', name: m.name || '', type: 'ANIMAL', health: String(m.health != null ? m.health : ''), armor: '', skills: '', abilities: ['Attack: ' + m.attackDice + ' dice · Damage ' + m.damage, m.note].filter(Boolean).join('\n') };
      var skills = [(m.expert && m.expert.length) ? ('Expert: ' + m.expert.join(', ') + ' (8 dice)') : '', (m.trained && m.trained.length) ? ('Trained: ' + m.trained.join(', ') + ' (5 dice)') : ''].filter(Boolean).join(' · ');
      var abil = [m.issue ? ('Issue: ' + m.issue) : '', m.secretIssue ? ('Secret: ' + m.secretIssue) : '', m.gear ? ('Gear: ' + m.gear) : ''].filter(Boolean).join('\n');
      return { sbtype: 'npc', name: m.name || '', type: [m.role, m.group].filter(Boolean).join(' // ').toUpperCase(), health: '3', armor: '', skills: skills, abilities: abil };
    },
    sub: function (m) { return m._twdkind === 'walker' ? 'The Dead' : (m._twdkind === 'animal' ? 'Animal' : [m.role, m.group].filter(Boolean).join(' · ')); }
  },
};
