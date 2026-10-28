// Adventure Prep registry — the ONE place that says which tabs a prep has, what
// each system calls them, which shared modules a system turns on, whether its
// treasure can be dropped onto character sheets, and where its item list lives.
// Read by every Adventure Prep builder (tools/templates/_prep_template.html and the
// builders generated from it) and by the GM Screen's Adventure Hub, so the two
// always agree. Systems are keyed by the code in lib/tools.ts (DCC, SD, NIM, …).
(function () {
  'use strict';
  // The baseline: eight tabs, same order in every system.
  var TABS = ['adventure', 'clues', 'scenes', 'cast', 'treasure', 'maps', 'tables', 'notes'];
  var LABELS = { adventure: 'Adventure', clues: 'Clues', scenes: 'Scenes', cast: 'Cast', treasure: 'Treasure', maps: 'Maps', tables: 'Tables', notes: 'Notes' };
  // Flavour names (kept per system), loot drops, and the shared modules each system
  // turns on. Modules are set per system, never per adventure: an empty one simply
  // shows nothing on the GM Screen.
  var SYSTEMS = {
    SD:    { labels: { scenes: 'Encounters', cast: 'Monsters', treasure: 'Treasure' }, loot: true, modules: ['site'] },
    DCC:   { labels: { scenes: 'Encounters', cast: 'NPCs/Mobs', treasure: 'Loot' }, loot: true, modules: ['site'] },
    DND:   { labels: { scenes: 'Encounters', cast: 'Monsters/NPCs', treasure: 'Treasure' }, loot: true, modules: ['travel'] },
    DB:    { labels: { adventure: 'Quest', cast: 'Monsters', treasure: 'Treasure' }, loot: true, modules: ['travel', 'site'] },
    MMRPG: { labels: { cast: 'Villains/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions'] },
    KOB:   { labels: { cast: 'NPCs/Threats', treasure: 'Items' }, loot: false, modules: [] },
    SW:    { labels: { cast: 'Imperials/NPCs', treasure: 'Gear' }, loot: true, modules: ['travel', 'vehicles'] },
    LOTR:  { labels: { cast: 'Adversaries', treasure: 'Treasure' }, loot: true, modules: ['travel'] },
    YZE:   { labels: { cast: 'Adversaries/NPCs', treasure: 'Gear' }, loot: true, modules: ['vehicles'] },
    TWD:   { labels: { cast: 'Adversaries/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions', 'vehicles'] },
    VAE:   { labels: { cast: 'Vaesen/NPCs', treasure: 'Treasure' }, loot: true, modules: [] },
    MYZ:   { labels: { cast: 'Zone Threats/NPCs', treasure: 'Artifacts' }, loot: true, modules: ['travel'] },
    PB:    { labels: { adventure: 'The Job', cast: 'Foes', treasure: 'Plunder' }, loot: true, modules: ['travel', 'site', 'vehicles', 'factions'] },
    CO:    { labels: { cast: 'Threats/NPCs', treasure: 'Items' }, loot: true, modules: ['factions'] },
    GB:    { labels: { cast: 'Ghosts/Extras', treasure: 'Gear' }, loot: true, modules: [] },
    ACE:   { labels: { cast: 'Extras', treasure: 'Treasure' }, loot: true, modules: [] },
    D62E:  { labels: { cast: 'Foes/NPCs', treasure: 'Gear' }, loot: true, modules: [] },
    NIM:   { labels: { cast: 'Monsters/NPCs', treasure: 'Treasure' }, loot: true, modules: [] },
    ICRPG: { labels: { cast: 'Monsters', treasure: 'Loot' }, loot: true, modules: [] },
    JLU:   { labels: { cast: 'Villains/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions'] }
  };
  // Item lists for the Treasure picker: the scripts that define the data (loaded on
  // first use, not on page load) and an adapter to { name, category, desc } — the same
  // mapping the GM Screen's treasure panels use, so an item looks the same in both.
  var ITEMS = {
    ACE: { scripts: ["/tools-data/ace-gear.js"], list: () => ((typeof ACE_GEAR !== 'undefined' && Array.isArray(ACE_GEAR)) ? ACE_GEAR : []).map(g => ({ name: g.name, category: g.category, desc: [g.description, g.damage != null ? g.damage + ' damage' : '', g.tier && g.tier !== 'Normal' ? g.tier + ' (TN ' + g.tn + ')' : ''].filter(Boolean).join(' · '), setting: g.setting })) },
    NIM: { scripts: ["/tools-data/nimble-items.js"], list: () => ((typeof NIMBLE_ITEMS !== 'undefined' && Array.isArray(NIMBLE_ITEMS)) ? NIMBLE_ITEMS : []).map(g => ({ name: g.name, category: /Weapon/.test(g.category) ? 'weapon' : /Cloth|Leather|Mail|Plate|Shield/.test(g.category) ? 'armor' : /Magic|Scroll|Wand/.test(g.category) ? 'magic' : 'gear', desc: [g.damage, g.armor && 'Armor ' + g.armor, g.properties, g.rarity, g.description].filter(Boolean).join(' · ').slice(0, 160) })) },
    SW: { scripts: ["/tools-data/sw-weapons.js", "/tools-data/sw-gear.js"], list: () => ((typeof SW_WEAPONS !== 'undefined' && Array.isArray(SW_WEAPONS)) ? SW_WEAPONS : []).filter(w => !/^(Starship|Capital|Vehicle|Artillery|Droid)$/.test(w.kind)).map(w => ({ name: w.name, category: 'weapon', desc: [w.damageText || _swPipsCode(w.damage), w.range, w.cost && w.cost + ' cr'].filter(Boolean).join(' · ') }))
            .concat(((typeof SW_GEAR !== 'undefined' && Array.isArray(SW_GEAR)) ? SW_GEAR : []).filter(g => !/^(Vehicle|Housing)$/.test(g.category) && !/^(Armor improvement|Equipment availability codes|Capital ship template|Droid equipment \(building dice\)|Medpac \(revised use\)|Passage \(starliner ticket\))$|Services$/.test(g.name) /* rules entries and services aren't loot */).map(g => ({ name: g.name, category: g.category === 'Armor' ? 'Armor' : g.category === 'Droid' ? 'Droid' : 'gear', desc: [g.stats, g.cost && g.cost + ' cr', g.description].filter(Boolean).join(' · ').slice(0, 160) })))
            .concat(((typeof SW_GEAR !== 'undefined' && Array.isArray(SW_GEAR)) ? SW_GEAR : []).map(g => ({ name: g.name, category: /armor/i.test(g.category || '') ? 'armor' : 'gear', desc: [g.category, g.description].filter(Boolean).join(' · ').slice(0, 160) }))) },
    DND: { scripts: ["/tools-data/dnd-weapons.js", "/tools-data/dnd-armor.js", "/tools-data/dnd-gear.js", "/tools-data/dnd-magic-items.js"], list: () => []
            .concat(((typeof DND_WEAPONS !== 'undefined' && Array.isArray(DND_WEAPONS)) ? DND_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: [w.damage + ' ' + w.damageType, (w.properties || []).join(', '), w.mastery && 'Mastery: ' + w.mastery, w.cost].filter(Boolean).join(' · ') })))
            .concat(((typeof DND_ARMOR !== 'undefined' && Array.isArray(DND_ARMOR)) ? DND_ARMOR : []).map(a => ({ name: a.name, category: 'armor', desc: ['AC ' + a.baseAC, a.category, a.cost].filter(Boolean).join(' · ') })))
            .concat(((typeof DND_GEAR !== 'undefined' && Array.isArray(DND_GEAR)) ? DND_GEAR : []).map(g => ({ name: g.name, category: 'gear', desc: [g.cost, g.description].filter(Boolean).join(' · ').slice(0, 160) })))
            .concat(((typeof DND_MAGIC_ITEMS !== 'undefined' && Array.isArray(DND_MAGIC_ITEMS)) ? DND_MAGIC_ITEMS : []).map(m => ({ name: m.name, category: 'magic', desc: [m.rarity, m.type, m.attunement ? 'attunement' : '', m.description].filter(Boolean).join(' · ').slice(0, 160) }))) },
    D62E: { scripts: ["/tools-data/d62e-equipment.js"], list: () => ((typeof D62E_EQUIPMENT !== 'undefined' && Array.isArray(D62E_EQUIPMENT)) ? D62E_EQUIPMENT : []).map(e => ({ name: e.name, category: (e.category === 'weapon' || e.category === 'armor') ? e.category : 'gear', desc: [e.damage ? e.damage + ' dmg' : '', e.protection ? '+' + e.protection + ' prot' : '', e.range, e.era && e.era !== 'core' ? e.era : '', e.cost != null ? e.cost + ' cr' : '', e.description].filter(Boolean).join(' · ').slice(0, 160) })) },
    MMRPG: { scripts: ["/tools-data/mmrpg-equipment.js"], list: () => ((typeof MMRPG_EQUIPMENT !== 'undefined' && Array.isArray(MMRPG_EQUIPMENT)) ? MMRPG_EQUIPMENT : []).map(e => {
            const t = String(e.tier || 'Common').toLowerCase();
            const cat = t === 'iconic' ? 'iconic' : t === 'narrative' ? 'narrative' : t === 'vehicle' ? 'vehicle' : 'common';
            const desc = [ (e.type || e.category || ''), e.owner && e.owner !== '—' ? e.owner : '', e.range ? 'Range ' + e.range : '', (e.damageBonus && e.damageBonus !== '—') ? 'Dmg ' + e.damageBonus : '', e.powerValue ? 'PV ' + e.powerValue : '', e.special || e.notes || '' ].filter(Boolean).join(' · ').slice(0, 180);
            return { name: e.name, category: cat, desc };
          }) },
    ICRPG: { scripts: ["/tools-data/icrpg-gear.js", "/tools-data/icrpg-loot.js"], list: () => []
            .concat(((typeof ICRPG_GEAR !== 'undefined' && Array.isArray(ICRPG_GEAR)) ? ICRPG_GEAR : []).map(g => ({ name: g.name, category: /gun|weapon/i.test(g.category) ? 'weapon' : /armor/i.test(g.category) ? 'armor' : 'gear', desc: [g.category, g.world && g.world !== 'core' ? g.world : '', (g.effects || []).join('; '), g.desc].filter(Boolean).join(' · ').slice(0, 160) })))
            .concat(((typeof ICRPG_LOOT !== 'undefined' && Array.isArray(ICRPG_LOOT)) ? ICRPG_LOOT : []).map(l => ({ name: l.name, category: 'loot', desc: [l.table, (l.effects || []).join('; '), l.desc].filter(Boolean).join(' · ').slice(0, 160) }))) },
    YZE: { scripts: ["/tools-data/yze-alien-data.js"], list: () => []
            .concat(((typeof ALIEN_WEAPONS !== 'undefined' && Array.isArray(ALIEN_WEAPONS)) ? ALIEN_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: [w.bonus ? 'Bonus ' + w.bonus : '', w.damage != null ? 'Dmg ' + w.damage : '', w.range, w.class, w.cost].filter(Boolean).join(' · ').slice(0, 160) })))
            .concat(((typeof ALIEN_ARMOR !== 'undefined' && Array.isArray(ALIEN_ARMOR)) ? ALIEN_ARMOR : []).map(a => ({ name: a.name, category: 'armor', desc: ['Armor ' + a.rating, (a.air && a.air !== '—') ? 'Air ' + a.air : '', a.cost, a.comment].filter(Boolean).join(' · ').slice(0, 160) })))
            .concat(((typeof ALIEN_GEAR !== 'undefined' && Array.isArray(ALIEN_GEAR)) ? ALIEN_GEAR : []).map(g => ({ name: g.name, category: 'gear', desc: [g.category, g.cost, g.effect].filter(Boolean).join(' · ').slice(0, 160) }))) },
    TWD: { scripts: ["/tools-data/twd-data.js"], list: () => []
            .concat(((typeof TWD_CLOSE_WEAPONS !== 'undefined' && Array.isArray(TWD_CLOSE_WEAPONS)) ? TWD_CLOSE_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: ['Dmg ' + w.damage, w.bonus ? 'Bonus ' + w.bonus : '', 'Close', w.slots ? w.slots + ' slots' : ''].filter(Boolean).join(' · ') })))
            .concat(((typeof TWD_RANGED_WEAPONS !== 'undefined' && Array.isArray(TWD_RANGED_WEAPONS)) ? TWD_RANGED_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: ['Dmg ' + w.damage, w.bonus ? 'Bonus ' + w.bonus : '', w.range, w.slots ? w.slots + ' slots' : ''].filter(Boolean).join(' · ') })))
            .concat(((typeof TWD_ARMOR !== 'undefined' && Array.isArray(TWD_ARMOR)) ? TWD_ARMOR : []).map(a => ({ name: a.name, category: 'armor', desc: ['Armor ' + a.level, a.penalty ? 'Mobility ' + a.penalty : ''].filter(Boolean).join(' · ') })))
            .concat(((typeof TWD_GEAR !== 'undefined' && Array.isArray(TWD_GEAR)) ? TWD_GEAR : []).map(g => ({ name: g.name, category: 'gear', desc: [g.bonus, g.slots ? g.slots + ' slots' : ''].filter(Boolean).join(' · ') }))) },
    VAE: { scripts: ["/tools-data/vae-data.js"], list: () => []
            .concat(((typeof VAE_MELEE_WEAPONS !== 'undefined' && Array.isArray(VAE_MELEE_WEAPONS)) ? VAE_MELEE_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: ['Dmg ' + w.damage, w.bonus ? 'Bonus ' + w.bonus : '', 'Melee', w.skill || ''].filter(Boolean).join(' · ') })))
            .concat(((typeof VAE_RANGED_WEAPONS !== 'undefined' && Array.isArray(VAE_RANGED_WEAPONS)) ? VAE_RANGED_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: ['Dmg ' + w.damage, w.bonus ? 'Bonus ' + w.bonus : '', w.range != null ? 'Range ' + w.range : '', w.skill || ''].filter(Boolean).join(' · ') })))
            .concat(((typeof VAE_ARMOR !== 'undefined' && Array.isArray(VAE_ARMOR)) ? VAE_ARMOR : []).map(a => ({ name: a.name, category: 'armor', desc: ['Protection ' + a.protection, a.comment].filter(Boolean).join(' · ') })))
            .concat(((typeof VAE_GEAR !== 'undefined' && Array.isArray(VAE_GEAR)) ? VAE_GEAR : []).map(g => ({ name: g.name, category: 'gear', desc: [g.comment || g.effect || '', g.cost != null && g.cost !== '' ? 'cost ' + g.cost : ''].filter(Boolean).join(' · ') })))
            .concat(((typeof VAE_ITEMS_OF_POWER !== 'undefined' && Array.isArray(VAE_ITEMS_OF_POWER)) ? VAE_ITEMS_OF_POWER : []).map(p => ({ name: p.name, category: 'power', desc: ['Item of Power', p.effect || ''].filter(Boolean).join(' · ') })))
            .concat(((typeof VAE_MAGIC_ITEMS !== 'undefined' && Array.isArray(VAE_MAGIC_ITEMS)) ? VAE_MAGIC_ITEMS : []).map(p => ({ name: p.name, category: 'magic', desc: ['Magic Item', p.effect || '', p.risk ? 'Risk: ' + p.risk : ''].filter(Boolean).join(' · ') }))) },
    MYZ: { scripts: ["/tools-data/myz-data.js"], list: () => []
            .concat(((typeof MYZ_MELEE_WEAPONS !== 'undefined' && Array.isArray(MYZ_MELEE_WEAPONS)) ? MYZ_MELEE_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: ['Dmg ' + w.damage, w.bonus != null ? 'Bonus ' + w.bonus : '', 'Melee', w.comment].filter(Boolean).join(' · ') })))
            .concat(((typeof MYZ_RANGED_WEAPONS !== 'undefined' && Array.isArray(MYZ_RANGED_WEAPONS)) ? MYZ_RANGED_WEAPONS : []).map(w => ({ name: w.name, category: 'weapon', desc: ['Dmg ' + w.damage, w.bonus != null ? 'Bonus ' + w.bonus : '', w.range, w.comment].filter(Boolean).join(' · ') })))
            .concat(((typeof MYZ_ARMOR !== 'undefined' && Array.isArray(MYZ_ARMOR)) ? MYZ_ARMOR : []).map(a => ({ name: a.name, category: 'armor', desc: ['Armor ' + (a.rating != null ? a.rating : ''), a.comment].filter(Boolean).join(' · ') })))
            .concat(((typeof MYZ_GEAR !== 'undefined' && Array.isArray(MYZ_GEAR)) ? MYZ_GEAR : []).map(g => ({ name: g.name, category: 'gear', desc: [g.comment || g.effect || '', g.bonus ? 'Bonus ' + g.bonus : ''].filter(Boolean).join(' · ') })))
            .concat(((typeof MYZ_ARTIFACTS !== 'undefined' && Array.isArray(MYZ_ARTIFACTS)) ? MYZ_ARTIFACTS : []).map(a => ({ name: a.name, category: 'artifact', desc: ['Artifact', a.roll ? 'D666 ' + a.roll : '', (typeof MYZ_VALUES !== 'undefined' && MYZ_VALUES[a.name] != null) ? MYZ_VALUES[a.name] + ' bullets' : '', a.desc].filter(Boolean).join(' · ') }))) },
    SD: { scripts: ["/tools-data/sd-gear.js"], list: () => ((typeof SD_GEAR !== 'undefined' && Array.isArray(SD_GEAR)) ? SD_GEAR : []).map(g => ({ name: g.name, category: g.category || 'gear', desc: [g.desc, g.cost, g.qty ? 'qty ' + g.qty : ''].filter(Boolean).join(' · ').slice(0, 160) })) },
    DCC: { scripts: ["/tools-data/dcc-items.js"], list: () => ((typeof DCC_ITEMS !== 'undefined' && Array.isArray(DCC_ITEMS)) ? DCC_ITEMS : []).map(g => ({ name: g.name, category: g.category || 'item', desc: [g.tier, g.effect].filter(Boolean).join(' · ').slice(0, 160) })) },
    GB: { scripts: ["/tools-data/gb-equipment.js"], list: () => ((typeof GB_EQUIPMENT !== 'undefined' && Array.isArray(GB_EQUIPMENT)) ? GB_EQUIPMENT : []).map(g => ({ name: g.name, category: /weapon/i.test(g.category || '') ? 'weapon' : 'gear', desc: [g.special, g.damage ? 'Dmg ' + g.damage : '', g.description].filter(Boolean).join(' · ').slice(0, 160) })) },
    JLU: { scripts: ["/tools-data/jlu-equipment.js"], list: () => ((typeof JLU_EQUIPMENT !== 'undefined' && Array.isArray(JLU_EQUIPMENT)) ? JLU_EQUIPMENT : []).map(g => ({ name: g.name, category: 'gear', desc: [g.cost, g.text].filter(Boolean).join(' · ').slice(0, 160) })) }
  };
  // Tracker kinds — the GM Screen's Trackers tool (Time / Rounds / Ticks).
  var TRACKER_KINDS = [
    { key: 'time', label: 'Time', unit: 'min', hint: 'Real-time countdown' },
    { key: 'round', label: 'Rounds', unit: 'rounds', hint: 'Counts down as combat advances' },
    { key: 'ticks', label: 'Ticks', unit: 'boxes', hint: 'A row of boxes to fill' }
  ];

  function _swPipsCode(p) { p = Math.round(Number(p) || 0); var d = Math.floor(p / 3), r = p % 3; return d ? d + 'D' + (r ? '+' + r : '') : (r ? '+' + r : ''); }
  function sys(code) { return SYSTEMS[String(code || '').toUpperCase()] || null; }
  function label(code, tab) { var s = sys(code); return (s && s.labels && s.labels[tab]) || LABELS[tab] || tab; }
  function loot(code) { var s = sys(code); return s ? s.loot !== false : true; }
  function modules(code) { var s = sys(code); return (s && s.modules) || []; }
  function itemList(code) {
    var it = ITEMS[String(code || '').toUpperCase()];
    if (!it) return [];
    try { return (it.list() || []).filter(function (x) { return x && x.name; }); } catch (e) { return []; }
  }
  // Load a system's item data once, then call back. Already-present globals (a page
  // that loads the data itself) skip the fetch.
  var _loading = {};
  function loadItems(code, cb) {
    var k = String(code || '').toUpperCase(), it = ITEMS[k];
    if (!it) { if (cb) cb([]); return; }
    if (itemList(k).length) { if (cb) cb(itemList(k)); return; }
    if (_loading[k]) { _loading[k].push(cb); return; }
    _loading[k] = [cb];
    var left = it.scripts.length;
    var done = function () { if (--left > 0) return; var q = _loading[k] || []; _loading[k] = null; var l = itemList(k); q.forEach(function (f) { if (f) f(l); }); };
    it.scripts.forEach(function (src) {
      var el = document.createElement('script'); el.src = src; el.async = false;
      el.onload = done; el.onerror = done; document.head.appendChild(el);
    });
  }
  // ── Migration ────────────────────────────────────────────────────────────
  // Brings one chapter saved by any older builder up to the eight-tab shape, in
  // place, without dropping anything. Safe to run more than once. Used on load and
  // import by the builders and on load by the GM Screen, so both read the same data.
  //   hooks[] (unused UI)          → details.hooks (one per line)
  //   strongopen[] (Shadowdark)    → the first scenes, marked opener
  //   rolltables / randenc (SD)    → rollTables
  // Dragonbane / Pirate Borg / LotR keys are left alone until those builders move
  // onto the template; the Hub still shows their own sections.
  var DETAIL_KEYS = ['questgiver', 'hooks', 'goal', 'prize', 'stakes', 'opposition'];
  var LINK_KEYS = ['cast', 'clues', 'tables', 'hazards'];
  function _arr(v) { return Array.isArray(v) ? v : []; }
  function _str(v) { return v == null ? '' : String(v).trim(); }
  function migrate(ch) {
    if (!ch || typeof ch !== 'object') return ch;
    var d = (ch.details && typeof ch.details === 'object') ? ch.details : {};
    DETAIL_KEYS.forEach(function (k) { if (typeof d[k] !== 'string') d[k] = _str(d[k]); });
    var hookLines = _arr(ch.hooks).map(function (h) {
      if (typeof h === 'string') return _str(h);
      return h ? [_str(h.header), _str(h.text)].filter(Boolean).join(' — ') : '';
    }).filter(Boolean);
    if (hookLines.length) d.hooks = [d.hooks].concat(hookLines).filter(Boolean).join('\n');
    ch.details = d; ch.hooks = [];
    // Roll tables: one list, whatever it was called.
    var tables = _arr(ch.rollTables).concat(_arr(ch.rolltables));
    var re = _arr(ch.randenc).filter(function (r) { return r && (r.header || r.text); });
    if (re.length) tables.push({ title: 'Random Encounters', die: re.length <= 6 ? 'd6' : re.length <= 8 ? 'd8' : re.length <= 10 ? 'd10' : re.length <= 12 ? 'd12' : 'd20',
      rows: re.map(function (r, i) { return { roll: String(i + 1), result: [_str(r.header), _str(r.text)].filter(Boolean).join(': ') }; }) });
    // Shadowdark stored a row's roll as `range`; everything else uses `roll`.
    tables.forEach(function (t) { if (t && Array.isArray(t.rows)) t.rows = t.rows.map(function (r) { if (!r || typeof r !== 'object') return r; if (r.roll == null && r.range != null) { r.roll = r.range; } return r; }); });
    ch.rollTables = tables; delete ch.rolltables; ch.randenc = [];
    // Shadowdark's Strong Start scenes become the opening scenes.
    var so = _arr(ch.strongopen).filter(function (x) { return x && (x.name || x.readaloud || x.desc || x.tag); });
    if (so.length) ch.locations = so.map(function (x) { var o = {}; for (var k in x) o[k] = x[k]; o.opener = true; return o; }).concat(_arr(ch.locations));
    ch.strongopen = [];
    ch.trackers = _arr(ch.trackers);
    ch.hazards = _arr(ch.hazards);
    if (typeof ch.log !== 'string') ch.log = _str(ch.log);
    ch.clues = _arr(ch.clues); ch.rewards = _arr(ch.rewards); ch.statblocks = _arr(ch.statblocks); ch.maps = _arr(ch.maps);
    ch.locations = _arr(ch.locations).map(function (l) {
      if (!l || typeof l !== 'object') return l;
      var L = (l.links && typeof l.links === 'object') ? l.links : {};
      if (typeof L.map !== 'string') L.map = _str(L.map);
      if (typeof L.mapkey !== 'string') L.mapkey = _str(L.mapkey);
      LINK_KEYS.forEach(function (k) { L[k] = _arr(L[k]).map(_str).filter(Boolean); });
      l.links = L; l.trackers = _arr(l.trackers);
      return l;
    });
    ch._v = 2;
    return ch;
  }
  // A clock/timer/countdown as the prep stores it → the Trackers tool's shape.
  function trackerToTool(t) {
    var n = Math.max(0, parseInt(t && t.size, 10) || 0);
    var kind = (t && t.kind) || 'ticks';
    if (kind === 'time') { var secs = (n || 10) * 60; return { kind: 'time', name: _str(t.name), totalSeconds: secs, remainingSeconds: secs, running: false }; }
    if (kind === 'round') { var r = n || 3; return { kind: 'round', name: _str(t.name), totalRounds: r, remainingRounds: r }; }
    return { kind: 'ticks', name: _str(t.name), count: Math.min(30, n || 4), filled: 0 };
  }

  window.PREP_REGISTRY = { TABS: TABS, LABELS: LABELS, SYSTEMS: SYSTEMS, ITEMS: ITEMS, TRACKER_KINDS: TRACKER_KINDS, DETAIL_KEYS: DETAIL_KEYS,
    sys: sys, label: label, loot: loot, modules: modules, itemList: itemList, loadItems: loadItems, migrate: migrate, trackerToTool: trackerToTool,
    hasItems: function (code) { return !!ITEMS[String(code || '').toUpperCase()]; } };
})();
