// Adventure Prep registry — the ONE place that says which tabs a prep has, what
// each system calls them, which shared modules a system turns on, whether its
// treasure can be dropped onto character sheets, and where its item list lives.
// Read by every Adventure Prep builder (tools/templates/_prep_template.html and the
// builders generated from it) and by the GM Screen's Adventure Hub, so the two
// always agree. Systems are keyed by the code in lib/tools.ts (DCC, SD, NIM, …).
(function () {
  'use strict';
  // The baseline: eight tabs, same order in every system — the builder's tabs, the
  // GM Screen's Hub tabs and the printed prep all follow it.
  var TABS = ['adventure', 'tables', 'clues', 'treasure', 'scenes', 'cast', 'maps'];
  var LABELS = { adventure: 'Adventure', tables: 'Tables', clues: 'Clues', treasure: 'Treasure', scenes: 'Encounters', cast: 'Monsters/NPCs', maps: 'Maps',
    travel: 'Travel', factions: 'Factions', vehicles: 'Vehicles' };
  // Shared modules. Travel, Factions and Vehicles are on for every system (user,
  // 2026-10-28/29) so every sheet has the same tabs. A system with its own journey
  // rules adds a calculator in TRAVEL; the rest get plain legs. Tab order = print order: Treasure,
  // Factions, Travel, Encounters, Cast, Vehicles. (A Sites module was tried and dropped: a chapter is one
  // site, and the Adventure tab holds it — see siteText.)
  var MODULE_TABS = ['travel', 'factions', 'vehicles'];
  // Tab names — the same ten tabs, in the same order, on every Adventure Prep and on
  // the GM Screen (user, 2026-10-29). Section headings inside keep each system's own words.
  var TAB_ORDER = ['adventure', 'tables', 'clues', 'treasure', 'factions', 'travel', 'scenes', 'cast', 'vehicles', 'maps'];
  var TAB_NAMES = { adventure: 'Adventure', tables: 'Tables', clues: 'Clues', treasure: 'Treasure', factions: 'Factions', travel: 'Journey', scenes: 'Encounters', cast: 'NPCs', vehicles: 'Vehicles', maps: 'Maps' };
  function tabName(k) { return TAB_NAMES[k] || k; }
  // Flavour names (kept per system), loot drops, and the shared modules each system
  // turns on. Modules are set per system, never per adventure: an empty one simply
  // shows nothing on the GM Screen.
  var SYSTEMS = {
    SD:    { labels: { scenes: 'Encounters', cast: 'Monsters', treasure: 'Treasure' }, loot: true, modules: [] },
    DCC:   { labels: { scenes: 'Encounters', cast: 'NPCs/Mobs', treasure: 'Loot' }, loot: true, modules: [] },
    DND:   { labels: { scenes: 'Encounters', cast: 'Monsters/NPCs', treasure: 'Treasure' }, loot: true, modules: ['travel'] },
    DB:    { labels: { adventure: 'Quest', cast: 'Monsters', treasure: 'Treasure', travel: 'Journey' }, loot: true, modules: ['travel'] },
    MMRPG: { labels: { cast: 'Villains/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions', 'vehicles'] },
    KOB:   { labels: { cast: 'NPCs/Threats', treasure: 'Items' }, loot: false, modules: [] },
    SW:    { labels: { cast: 'Imperials/NPCs', treasure: 'Gear' }, loot: true, modules: ['travel', 'vehicles'] },
    LOTR:  { labels: { cast: 'Adversaries', treasure: 'Treasure', travel: 'Journeys', phase: 'Phase' }, loot: true, modules: ['travel'] },
    YZE:   { labels: { cast: 'Adversaries/NPCs', treasure: 'Gear' }, loot: true, modules: ['vehicles'] },
    TWD:   { labels: { cast: 'Adversaries/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions', 'vehicles'] },
    VAE:   { labels: { cast: 'Vaesen/NPCs', treasure: 'Treasure' }, loot: true, modules: [] },
    MYZ:   { labels: { cast: 'Zone Threats/NPCs', treasure: 'Artifacts' }, loot: true, modules: ['travel'] },
    PB:    { labels: { adventure: 'The Job', cast: 'Foes', treasure: 'Plunder', scenes: 'Places', travel: 'Voyage', vehicles: 'Ships' }, loot: true, modules: ['travel', 'factions', 'vehicles'] },
    CO:    { labels: { cast: 'Threats/NPCs', treasure: 'Items' }, loot: true, modules: ['factions'] },
    GB:    { labels: { cast: 'Ghosts/Extras', treasure: 'Gear' }, loot: true, modules: [] },
    ACE:   { labels: { cast: 'Extras', treasure: 'Treasure' }, loot: true, modules: [] },
    D62E:  { labels: { cast: 'Foes/NPCs', treasure: 'Gear' }, loot: true, modules: ['vehicles'] },
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
  // Dragonbane: valuables (the GM suite's list), weapons, armor, helmets and gear.
  ITEMS.DB = { scripts: ["/tools-data/db-data.js", "/tools-data/db-gm-tables.js"], list: function () {
    var A = function (v) { return Array.isArray(v) ? v : []; };
    var cost = function (c) { return c && c.amount != null ? c.amount + ' ' + c.unit : ''; };
    var G = (typeof window !== 'undefined' && window.DB_GM) || null;
    return [].concat(A(G && G.valuables).map(function (x) { return { name: x.name, category: 'valuable', desc: 'Worth ' + x.value }; }))
      .concat(A(typeof DB_WEAPONS !== 'undefined' ? DB_WEAPONS : null).filter(function (w) { return !w.natural && w.cost; }).map(function (w) { return { name: w.name, category: 'weapon', desc: [w.skill, w.damage ? 'Damage ' + w.damage : '', w.grip, w.range ? 'Range ' + w.range : '', w.durability ? 'Durability ' + w.durability : '', (w.features || []).join(', '), cost(w.cost)].filter(Boolean).join(' · ') }; }))
      .concat(A(typeof DB_ARMOR !== 'undefined' ? DB_ARMOR : null).map(function (a) { return { name: a.name, category: 'armor', desc: ['Armor ' + a.rating, (a.banes || []).length ? 'Bane on ' + a.banes.join(', ') : '', cost(a.cost)].filter(Boolean).join(' · ') }; }))
      .concat(A(typeof DB_HELMETS !== 'undefined' ? DB_HELMETS : null).map(function (a) { return { name: a.name, category: 'armor', desc: ['Helmet · Armor +' + a.rating, (a.banes || []).length ? 'Bane on ' + a.banes.join(', ') : '', cost(a.cost)].filter(Boolean).join(' · ') }; }))
      .concat(A(typeof DB_GEAR !== 'undefined' ? DB_GEAR : null).filter(function (g) { return !/^(Services|Animals)$/.test(g.category); }).map(function (g) { return { name: g.name, category: 'gear', desc: [g.category, g.effect, cost(g.cost)].filter(Boolean).join(' · ') }; }));
  } };

  // ── Travel calculators (the Travel module) ─────────────────────────────────
  // A leg is { name, from, to, distance, terrain, navigator, opts{}, mishaps,
  // encounters, notes }. A system's calculator reads the distance and its own
  // options and returns plain lines for the builder, the print and the Hub, plus
  // the number of travel periods (Dragonbane's shifts, D&D's days) that the GM
  // Screen can start as a Ticks tracker.
  //   unit     what the distance is measured in
  //   opts     the system's own checkboxes on a leg: [key, label, default]
  //   navigator  the label for who leads the way
  //   calc(leg) → { lines:[…], ticks:n, tickName:'shift' } or null
  var TRAVEL = {
    DB: { unit: 'km', navigator: 'Pathfinder', navigatorPh: 'Who leads (BUSHCRAFT)',
      opts: [['offroad', 'Off the road', true], ['map', 'Map', false], ['hard', 'Very difficult terrain', false], ['mounted', 'Mounted', false]],
      calc: function (j) {
        var J = (typeof DB_JOURNEY !== 'undefined' && DB_JOURNEY && DB_JOURNEY.pace) ? DB_JOURNEY : { pace: { foot: 15, mounted: 30 } };
        var o = j.opts || {}, km = parseInt(String(j.distance || '').replace(/[^\d]/g, ''), 10) || 0;
        var pace = o.mounted ? J.pace.mounted : J.pace.foot;
        if (!km) return { lines: ['Set the distance to work out shifts and days.'], ticks: 0, tickName: 'shift' };
        var shifts = Math.ceil(km / pace), days = Math.ceil(shifts / 2);
        var net = o.offroad ? (o.map ? 0 : -1) + (o.hard ? -1 : 0) : 0;
        var bt = net > 0 ? net + ' boon' + (net > 1 ? 's' : '') : net < 0 ? (-net) + ' bane' + (net < -1 ? 's' : '') : 'no boon or bane';
        return { ticks: shifts, tickName: 'shift', lines: [
          km + ' km at ' + pace + ' km a shift' + (o.mounted ? ' (mounted)' : '') + ' → ' + shifts + ' shift' + (shifts === 1 ? '' : 's') + ' (~' + days + ' day' + (days === 1 ? '' : 's') + ')',
          o.offroad ? 'Pathfinder: ' + shifts + ' BUSHCRAFT roll' + (shifts === 1 ? '' : 's') + ' with ' + bt + '. A failure is a mishap (D12); a Dragon finds a shortcut.' : 'On a road or path — no pathfinder rolls.',
          'Random encounters: up to one a shift.'] };
      } },
    // The Lord of the Rings 5e: hexes by terrain (road / open / hard) plus Perilous
    // Areas (their Peril rating in hexes and events); XP per hex by region; the
    // fatigue save is DC 10 + the events' fatigue. The leg carries region, season,
    // road, open, hard, perils[] and events[] (the builder's LotR fields).
    LOTR: { unit: 'hexes', navigator: 'Guide', navigatorPh: 'The Guide (pathfinding DC 15 WIS)', hide: ['distance', 'terrain', 'mishaps', 'encounters'], opts: [],
      calc: function (j) {
        var J = (typeof LOTR_JOURNEY !== 'undefined' && LOTR_JOURNEY) ? LOTR_JOURNEY : null;
        var n = function (x) { var v = parseInt(String(x == null ? '' : x).replace(/[^\d-]/g, ''), 10); return isNaN(v) ? 0 : v; };
        var rk = /border/i.test(j.region || '') ? 'border' : /dark/i.test(j.region || '') ? 'dark' : 'wild';
        var xr = function (i) { return (J && J.xp && J.xp[i]) ? (J.xp[i][rk] || 0) : 0; };
        var TI = { road: 0, open: 1, hard: 2 };
        var road = n(j.road), open = n(j.open), hard = n(j.hard), hexes = road + open + hard;
        var perils = Array.isArray(j.perils) ? j.perils : [], events = Array.isArray(j.events) ? j.events : [];
        var ph = perils.reduce(function (s, p) { return s + n(p && p.rating); }, 0);
        if (!hexes && !ph) return { lines: ['Count the hexes by terrain to work out the days, events and XP.'], ticks: 0, tickName: 'day' };
        var xp = road * xr(0) + open * xr(1) + hard * xr(2) + perils.reduce(function (s, p) { return s + n(p && p.rating) * xr(TI[p && p.terrain] != null ? TI[p.terrain] : 2); }, 0);
        var fat = events.reduce(function (s, e) { var ev = J && e && J.events.filter(function (x) { return x.name === e.name; })[0]; return s + (ev ? (ev.fatigue || 0) : 0); }, 0);
        var est = hexes ? Math.max(1, Math.round(hexes / 3)) + ph : ph, days = hexes + ph;
        var lines = [hexes + ' hexes' + (ph ? ' + Peril ' + ph : '') + ' · ~' + days + ' days · ~' + est + ' events',
          'Journey XP ' + xp + ' (split among the Company) · Fatigue save DC ' + (10 + fat) + ' CON' + (fat ? ' (10 + ' + fat + ' from events)' : ''),
          (rk === 'border' ? 'Border Land — event d20 with advantage.' : rk === 'dark' ? 'Dark Land — event d20 with disadvantage.' : 'Wild Land — event d20 rolled normally.') + ' Event checks: road DC 10 · open DC 15 · hard DC 20.'];
        var season = j.season || j._phaseSeason || '';
        if (/autumn|winter/i.test(season)) lines.push(season + ': event checks and their saves at disadvantage.');
        return { lines: lines, ticks: days, tickName: 'day' };
      } },
    // Pirate Borg: a ship sails up to its speed in 50-mile hexes a day; heading NE,
    // E or SE in the Dark Caribbean costs 1 hex a day against the trade winds (min 1).
    // The leg carries heading, ship, speed, weather, winds and events; the ship's
    // speed comes from the prep's ships (ch.pbShips) or the book's ship list.
    PB: { unit: 'hexes', navigator: 'Navigator', hide: ['navigator', 'terrain', 'mishaps', 'encounters'], opts: [],
      calc: function (j, ch) {
        var TR = (typeof PB_TRAVEL !== 'undefined' && PB_TRAVEL) ? PB_TRAVEL : { hexMiles: 50, againstTrades: { directions: ['NE', 'E', 'SE'], hexesPerDay: -1, min: 1 } };
        var n = function (x) { var v = parseInt(String(x == null ? '' : x).replace(/[−–]/g, '-').replace(/[^\d-]/g, ''), 10); return isNaN(v) ? 0 : v; };
        var hexes = n(j.distance);
        var ships = _arr(ch && ch.vehicles).map(function (v) { return { name: v.name, speed: (v.stats || {}).speed }; }).concat(_arr(ch && ch.pbShips), _arr(typeof PB_SHIPS !== 'undefined' ? PB_SHIPS : null));
        var sh = j.ship ? ships.filter(function (s) { return s && s.name === j.ship; })[0] : null;
        var base = String(j.speed || '').trim() !== '' ? n(j.speed) : (sh ? n(sh.speed) : 0);
        var against = TR.againstTrades.directions.indexOf(j.heading) >= 0;
        var speed = base ? (against ? Math.max(TR.againstTrades.min, base + TR.againstTrades.hexesPerDay) : base) : 0;
        var days = hexes && speed ? Math.ceil(hexes / speed) : 0;
        if (!hexes || !speed) return { lines: ['Set the hexes and a ship (or a speed) to work out the days at sea.'], ticks: 0, tickName: 'day' };
        return { ticks: days, tickName: 'day', lines: [hexes + ' hex' + (hexes === 1 ? '' : 'es') + ' (' + hexes * TR.hexMiles + ' miles) at ' + speed + ' a day' + (against ? ' (' + base + ' −1 against the trade winds)' : '') + ' → ~' + days + ' day' + (days === 1 ? '' : 's') + ' at sea.'] };
      } },
    // Star Wars d6: a hyperspace jump. Its standard duration × the hyperdrive multiplier;
    // Astrogation difficulty 15 (30 with no nav computer), +1 per day cut / −1 per day
    // added, ×2 for a hasty jump, +5 / +10 for light / heavy damage. The leg carries
    // mult (x1/2 … x4) and cut (days cut, negative = days added).
    SW: { unit: 'days, standard', navigator: 'Astrogator', navigatorPh: 'Who plots the jump (Astrogation)',
      opts: [['nonav', 'No nav computer or astromech', false], ['hasty', 'Hasty jump', false], ['light', 'Light damage', false], ['heavy', 'Heavy damage', false]],
      calc: function (j) {
        var o = j.opts || {}, base = parseFloat(String(j.distance || '').replace(',', '.')) || 0;
        var m = String(j.mult || 'x1').replace(/^x/i, ''), mult = m === '1/2' ? 0.5 : (parseFloat(m) || 1);
        var cut = parseInt(j.cut, 10) || 0;
        if (!base) return { lines: ['Set the standard duration to work out the jump.'], ticks: 0, tickName: 'day' };
        var days = Math.max(0, base * mult - cut);
        var dc = (o.nonav ? 30 : 15) + cut; if (o.hasty) dc *= 2; if (o.heavy) dc += 10; else if (o.light) dc += 5;
        return { ticks: Math.ceil(days), tickName: 'day', lines: [base + ' × hyperdrive x' + m + (cut ? (cut > 0 ? ' − ' + cut + ' cut' : ' + ' + (-cut) + ' added') : '') + ' → ' + (Math.round(days * 10) / 10) + ' days in hyperspace',
          'Astrogation difficulty ' + dc + (o.nonav ? ' (no nav computer)' : '') + (o.hasty ? ' (hasty ×2)' : '') + (o.heavy ? ' (+10 heavy damage)' : o.light ? ' (+5 light damage)' : '') + '. Failure: roll 2D on the mishap table.'] };
      } },
    // Mutant: Year Zero: sectors of the Zone and their Rot level (0 oasis · 1 weak, a Rot
    // Point a day · 2 strong, one an hour · 3 hotspot, one a minute).
    MYZ: { unit: 'sectors', navigator: 'Pathfinder', navigatorPh: 'Who finds the path (Stalker)', hide: ['mishaps'], opts: [],
      calc: function (j) {
        var R = _arr(typeof MYZ_ROT !== 'undefined' ? MYZ_ROT : null), n = parseInt(j.distance, 10) || 0, lv = parseInt(j.rot, 10);
        var r = R.filter(function (x) { return x.level === lv; })[0];
        var lines = [n ? n + ' sector' + (n === 1 ? '' : 's') + ' to cross' : 'Set the number of sectors.'];
        if (!isNaN(lv)) lines.push('Rot level ' + lv + (r ? ' (' + r.name + '): ' + r.effect : ''));
        return { lines: lines, ticks: 0, tickName: 'sector' };
      } },
    // D&D: overland pace (miles a day) — Fast 30, Normal 24, Slow 18.
    DND: { unit: 'miles', navigator: 'Navigator',
      opts: [['fast', 'Fast pace', false], ['slow', 'Slow pace', false], ['difficult', 'Difficult terrain', false]],
      calc: function (j) {
        var o = j.opts || {}, mi = parseInt(String(j.distance || '').replace(/[^\d]/g, ''), 10) || 0;
        if (!mi) return { lines: ['Set the distance to work out the days.'], ticks: 0, tickName: 'day' };
        var perDay = o.fast ? 30 : o.slow ? 18 : 24; if (o.difficult) perDay = perDay / 2;
        var days = Math.ceil(mi / perDay);
        return { ticks: days, tickName: 'day', lines: [mi + ' miles at ' + perDay + ' miles a day (' + (o.fast ? 'fast' : o.slow ? 'slow' : 'normal') + ' pace' + (o.difficult ? ', difficult terrain' : '') + ') → ' + days + ' day' + (days === 1 ? '' : 's')] };
      } }
  };
  function travel(code) { return TRAVEL[String(code || '').toUpperCase()] || null; }
  function travelCalc(code, leg, ch) { var t = travel(code); try { return t && t.calc ? t.calc(leg || {}, ch || null) : null; } catch (e) { return null; } }

  // ── Factions & clocks (the Factions module) ───────────────────────────────
  // A faction is { name, attitude, goal, assets, moves (one per line, next first),
  // clock (boxes), ticks (what fills a box), full (what happens when it fills), notes }.
  // The clock is a Ticks tracker the GM Screen can start. A system can offer its
  // book's factions to pick from.
  var ATTITUDES = ['Allied', 'Friendly', 'Neutral', 'Wary', 'Hostile'];
  var FACTION_LISTS = {
    PB: { scripts: ['/tools-data/pb-data.js'], list: function () { return _arr(typeof PB_FACTIONS !== 'undefined' ? PB_FACTIONS : null).map(function (f) { return { name: f.name, notes: [f.seat ? 'Seat: ' + f.seat : '', f.text, f.page ? (f.source || 'Core Rules') + ' p. ' + f.page : ''].filter(Boolean).join('\n') }; }); } }
  };
  function factionList(code) { var f = FACTION_LISTS[String(code || '').toUpperCase()]; try { return f ? f.list() : []; } catch (e) { return []; } }
  function factionTracker(f) {
    var n = Math.max(1, Math.min(30, parseInt(f && f.clock, 10) || 0)); if (!f || !(parseInt(f.clock, 10) > 0)) return null;
    return { name: _str(f.name) + ' — clock', kind: 'ticks', size: n, finish: _str(f.full) || (_str(f.name) + ' achieves its goal') };
  }

  // ── Vehicles (the Vehicles module) ──────────────────────────────────────────
  // A vehicle is { name, role (party | foe | other), type, stats{}, crew, cargo,
  // weapons (one per line), notes }. Each system names its stat boxes and may offer
  // its book's vehicles (loaded on first use). hp = the stat that becomes the combat
  // tracker's damage track when a vehicle is sent to combat.
  var VEHICLE_DEFAULT = { fields: [['speed', 'Speed'], ['armor', 'Armor'], ['hull', 'Hull']], hp: 'hull' };
  var VEHICLES = {
    // The Walking Dead (Core Rules p. 75–76): Maneuverability (gear bonus to Mobility when
    // driving), Damage (when ramming), Hull (its Health) and Armor (dice vs damage), plus Issues.
    TWD: { fields: [['maneuver', 'Maneuver'], ['damage', 'Damage'], ['hull', 'Hull'], ['armor', 'Armor']], hp: 'hull',
      list: function () { return [['Car', '+2', '2', '4', '4', 'Will run out of gas'], ['Bicycle', '+2', '0', '2', '0', 'Easily gets a flat tire'], ['Horse', '+2', '1', '4', '0', 'Needs to be fed, easily scared'],
        ['Motorcycle', '+3', '2', '3', '2', 'Will run out of gas'], ['Battle Tank', '+1', '4', '10', '8', 'Will run out of gas, loud']].map(function (r) { return { name: r[0], sub: 'Hull ' + r[3] + ' · Armor ' + r[4],
          make: function () { return { name: r[0], type: r[0], stats: { maneuver: r[1], damage: r[2] + (r[0] === 'Battle Tank' ? ' (not including weapons)' : ''), hull: r[3], armor: r[4] }, crew: '', cargo: '', weapons: '', notes: 'Issue: ' + r[5] }; } }; }); } },
    // Marvel Multiverse: size, speed, Health and damage reduction (the book's and expansions' vehicles).
    MMRPG: { fields: [['size', 'Size'], ['speed', 'Speed'], ['health', 'Health'], ['dr', 'Damage Red.']], hp: 'health',
      scripts: ['/tools-data/mmrpg-vehicles.js'],
      list: function () { return _arr(typeof MMRPG_VEHICLES !== 'undefined' ? MMRPG_VEHICLES : null).map(function (v) { return { name: v.name, sub: [v.tier, v.size, v.source].filter(Boolean).join(' · '),
        make: function () { return { name: v.name, type: [v.tier, v.size].filter(Boolean).join(' · '), stats: { size: _str(v.size), speed: _str(v.speed), health: _str(v.health), dr: _str(v.damageReduction) },
          crew: v.passengers ? v.passengers + (String(v.passengers) === '1' ? ' passenger' : ' passengers') : '', cargo: '', weapons: String(v.weapons || '').split(/\s*;\s*/).filter(Boolean).join('\n'),
          notes: [v.powers ? 'Powers: ' + v.powers : '', v.notes, v.description, v.source].filter(Boolean).join('\n') }; } }; }); } },
    // D6 System 2e: scale, speed, maneuverability, body and shields (dice codes).
    D62E: { fields: [['scale', 'Scale'], ['speed', 'Speed'], ['maneuver', 'Maneuver'], ['body', 'Body'], ['shields', 'Shields']], hp: 'body',
      scripts: ['/tools-data/d62e-vehicles.js'],
      list: function () { return _arr(typeof D62E_VEHICLES !== 'undefined' ? D62E_VEHICLES : null).map(function (v) { return { name: v.name, sub: [v.kind, v.genre].filter(Boolean).join(' · '),
        make: function () { return { name: v.name, type: _str(v.kind), stats: { scale: _str(v.scale), speed: _str(v.speed), maneuver: _str(v.maneuver), body: _str(v.body), shields: _str(v.shields) },
          crew: v.crew ? 'Crew ' + v.crew : '', cargo: '', weapons: _arr(v.weapons).map(function (w) { return w.name + ': damage ' + w.damage + (w.range ? ', range ' + w.range : ''); }).join('\n'),
          notes: [v.description, v.page ? 'Core p. ' + v.page : ''].filter(Boolean).join('\n') }; } }; }); } },
    // Pirate Borg: ships (the PB plug-in draws the full ship card — crew skill, modifiers,
    // specialty crew, shanties). Speed is what the Voyage calculator reads.
    PB: { fields: [['hp', 'HP'], ['hpMax', 'Max HP'], ['hull', 'Hull'], ['agility', 'AGL'], ['speed', 'Speed'], ['skill', 'Skill'], ['broadsides', 'Broadsides'], ['smallArms', 'Small arms'], ['ram', 'Ram'], ['cargoSlots', 'Cargo slots'], ['crewMin', 'Crew min'], ['crewMax', 'Crew max'], ['aboard', 'Aboard'], ['capSpirit', 'Captain SPI']], hp: 'hp' },
    // Star Wars d6: scale, speed code, maneuverability, hull and shields (dice codes).
    SW: { fields: [['scale', 'Scale'], ['speed', 'Speed'], ['maneuver', 'Maneuver'], ['hull', 'Hull'], ['shields', 'Shields']], hp: 'hull',
      scripts: ['/tools-data/sw-vehicles.js'],
      list: function () { return _arr(typeof SW_VEHICLES !== 'undefined' ? SW_VEHICLES : null).map(function (v) { return { name: v.name, sub: [v.kind, v.scale].filter(Boolean).join(' · '),
        make: function () { return { name: v.name, type: [v.kind, v.craft].filter(Boolean).join(' — '), stats: { scale: _str(v.scale), speed: _str(v.speed), maneuver: _str(v.maneuverability), hull: _str(v.hull), shields: _str(v.shields) },
          crew: [_str(v.crew), v.passengers && v.passengers !== 'None' ? 'passengers: ' + v.passengers : ''].filter(Boolean).join('; '), cargo: _str(v.cargo),
          weapons: _arr(v.weapons).map(function (w) { return w.name + (w.count ? ' (' + w.count + ')' : '') + ': ' + [w.fireControl ? 'fire control ' + w.fireControl : '', w.damage ? 'damage ' + w.damage : '', w.range ? 'range ' + w.range : ''].filter(Boolean).join(', ') + (w.notes ? '. ' + w.notes : ''); }).join('\n'),
          notes: [v.hyperdrive ? 'Hyperdrive ' + v.hyperdrive : '', v.nav ? 'Nav: ' + v.nav : '', v.consumables ? 'Consumables: ' + v.consumables : '', v.description].filter(Boolean).join('\n') }; } }; }); } },
    // Alien: maneuverability, speed, hull and armor; weapons from the vehicle weapons list.
    YZE: { fields: [['maneuver', 'Maneuver'], ['speed', 'Speed'], ['hull', 'Hull'], ['armor', 'Armor']], hp: 'hull',
      scripts: ['/tools-data/yze-alien-data.js'],
      list: function () {
        var W = _arr(typeof ALIEN_VEHICLE_WEAPONS !== 'undefined' ? ALIEN_VEHICLE_WEAPONS : null);
        return _arr(typeof ALIEN_VEHICLES !== 'undefined' ? ALIEN_VEHICLES : null).map(function (v) { return { name: v.name, sub: 'Hull ' + v.hull + ' · Armor ' + v.armor,
          make: function () { return { name: v.name, type: 'Vehicle' + (v.cost ? ' — ' + v.cost : ''), stats: { maneuver: _str(v.maneuver), speed: _str(v.speed), hull: _str(v.hull), armor: _str(v.armor) },
            crew: v.passengers ? v.passengers + ' passengers' : '', cargo: '',
            weapons: String(v.weapons || '').split(/\s*;\s*/).filter(Boolean).map(function (n) {
              var m = /^(\d+)×\s*(.*)$/.exec(n), nm = (m ? m[2] : n).toLowerCase();
              // Match on the distinctive words ("Hellhound II Missiles" → "AGM-220C Hellhound II Tactical Missile").
              var key = nm.split(/[^a-z0-9.]+/).filter(function (t) { return t.length >= 2 && !/^(mm|missiles?|turret|launcher|cannon|guns?|tactical)$/.test(t); });
              var w = W.filter(function (x) { var xn = x.name.toLowerCase(); return xn === nm || nm.indexOf(xn) === 0 || (key.length && key.every(function (t) { return xn.indexOf(t) >= 0; })); })[0];
              return n + (w ? ': Bonus ' + w.bonus + ', Damage ' + w.damage + ', ' + w.range + (w.ammo ? ', ammo ' + w.ammo : '') + (w.special ? ' — ' + w.special : '') : '');
            }).join('\n'), notes: '' }; } }; });
      } }
  };
  function vehicleCfg(code) { return VEHICLES[String(code || '').toUpperCase()] || VEHICLE_DEFAULT; }
  function loadList(cfg, cb) {
    if (!cfg || !cfg.scripts) { if (cb) cb(); return; }
    var left = cfg.scripts.length; if (!left) { if (cb) cb(); return; }
    if (cfg._ready) { if (cb) cb(); return; }
    var done = function () { if (--left > 0) return; cfg._ready = true; if (cb) cb(); };
    cfg.scripts.forEach(function (src) {
      var have = [].slice.call(document.scripts).some(function (x) { return x.src && x.src.indexOf(src) >= 0; });
      if (have) { done(); return; }
      var el = document.createElement('script'); el.src = src; el.async = false; el.onload = done; el.onerror = done; document.head.appendChild(el);
    });
  }
  function vehicleList(code, cb) { var c = VEHICLES[String(code || '').toUpperCase()]; if (!c || !c.list) { cb([]); return; } loadList(c, function () { var l = []; try { l = c.list(); } catch (e) {} cb(l); }); }
  function factionListLoad(code, cb) { var c = FACTION_LISTS[String(code || '').toUpperCase()]; if (!c) { cb([]); return; } loadList(c, function () { cb(factionList(code)); }); }
  // A vehicle as a prep stat block, so the combat tracker can take it like any foe.
  function vehicleToStatblock(v, code) {
    var C = vehicleCfg(code), st = v.stats || {};
    var dmg = _str(st[C.hp]);
    return { name: _str(v.name) || 'Vehicle', sbtype: v.role === 'party' ? 'npc' : 'mob', type: ['VEHICLE', _str(v.type).toUpperCase()].filter(Boolean).join(' // '),
      flavor: _str(v.notes), hp: dmg, health: dmg,
      abilities: C.fields.filter(function (f) { return _str(st[f[0]]); }).map(function (f) { return f[1] + ': ' + _str(st[f[0]]); })
        .concat(_str(v.crew) ? ['Crew: ' + _str(v.crew)] : [], _str(v.cargo) ? ['Cargo: ' + _str(v.cargo)] : [], String(v.weapons || '').split('\n').map(_str).filter(Boolean)).join('\n') };
  }

  // ── Per-system extras ─────────────────────────────────────────────────────
  // EXTRA[code].scenes / .hazards / .rewards: extra boxes on those cards, stored in
  // the item's `x` object and shown in the print and on the GM Screen.
  //   [key, label, placeholder, kind]   kind: 'text' (default) | 'area' | 'select:a|b|c'
  var EXTRA = {
    SD:   { rewards: [['xp', 'XP', 'Poor 0 · Normal 1 · Fabulous 3 · Legendary 10']] },
    SW:   { scenes: [['difficulty', 'Difficulty', 'e.g. Moderate 11–15 (Search), Difficult 16–20 (Climbing)']], hazards: [['difficulty', 'Difficulty', 'e.g. 15 (Dexterity to dodge)']] },
    D62E: { scenes: [['difficulty', 'Difficulty', 'e.g. Moderate 15 (Search), Difficult 20']], hazards: [['difficulty', 'Difficulty', 'e.g. 15 (Reflexes to dodge)']] },
    TWD:  { scenes: [['threat', 'Threat Level', '', 'select:|0|1|2|3|4|5|6'], ['swarm', 'Swarm Size', '', 'select:|1 (5–10)|2 (11–20)|3 (21–50)|4 (51–100)|5 (100+)|6 (1000+)']] },
    CO:   { scenes: [['bleed', 'Bleed / risk', 'How the phenomenon bleeds through here, and what it costs']] },
    GB:   { scenes: [['bust', 'The bust', 'Is this the bust? How the ghost is trapped and contained here']] },
    ICRPG:{ scenes: [['target', 'Target', 'e.g. 12 (the room\'s Target number)']] }
  };
  function extra(code, kind) { var e = EXTRA[String(code || '').toUpperCase()]; return (e && e[kind]) || []; }

  // SECTIONS[code]: small system blocks stored in chapter.sys[key] — single (one
  // object) or a list. tab = where the builder shows it (adventure, clues, scenes,
  // treasure, cast, travel). tracker(obj) → a Trackers entry the GM Screen can start.
  //   fields: [key, label, placeholder, kind]   kind: text | area | lines | num | select:a|b | check
  var linesOf = function (v) { return String(v || '').split('\n').map(_str).filter(Boolean); };
  var SECTIONS = {
    // Dungeon Crawler Carl: the floor — its number sets the Difficulties; the floor timer is a tracker.
    DCC: [{ key: 'floor', title: 'The floor', tab: 'adventure', single: true, hint: 'Difficulties come from the floor number: Stat Check 10 + Floor · Opposed 10 + the antagonist\'s Stat Mod + Floor · Unopposed 10 + (Floor × 2). A dungeon day is 30 hours.',
      fields: [['number', 'Floor', '1', 'num'], ['theme', 'Theme', 'What this floor is'], ['days', 'Days until the stairwells close', 'e.g. 5', 'num'], ['notes', 'Notes', 'Bosses, safe rooms, the Show…', 'area']],
      tracker: function (o) { var n = parseInt(o.days, 10); return n > 0 ? { name: 'Floor ' + (o.number || '') + ' — days left', kind: 'ticks', size: Math.min(30, n), finish: 'The floor collapses: anyone not down a stairwell is gone' } : null; } }],
    // Marvel: the villain's plan, its steps a Ticks tracker; the story's acts.
    MMRPG: [{ key: 'plan', title: 'The villain\'s plan', tab: 'adventure', single: true, hint: 'Each step the heroes don\'t stop fills a box; when the last fills, the villain wins.',
      fields: [['villain', 'Villain', 'Who'], ['goal', 'Goal', 'What they want'], ['steps', 'Steps (one per line, in order)', 'What they do next…', 'lines'], ['acts', 'Acts (one per line)', 'Act 1: the hook · Act 2: … · Act 3: the showdown', 'lines']],
      tracker: function (o) { var n = linesOf(o.steps).length; return n ? { name: (o.villain ? o.villain + '\'s plan' : 'The villain\'s plan'), kind: 'ticks', size: n, finish: o.goal ? 'The villain wins: ' + o.goal : 'The villain wins' } : null; } }],
    KOB: [{ key: 'town', title: 'The town', tab: 'adventure', single: true,
      fields: [['name', 'Town', 'Name'], ['places', 'Places (one per line)', 'The arcade, the quarry…', 'lines'], ['people', 'People (one per line)', 'Who the kids know', 'lines'], ['rumors', 'Rumors & secrets', 'What everyone whispers', 'area']] }],
    // Alien: each PC's secret agenda per act; timed events as trackers.
    YZE: [{ key: 'agendas', title: 'Personal agendas', tab: 'adventure', item: 'Agenda', hint: 'Secret — hand each player theirs. One per act.',
      fields: [['pc', 'Character', 'Who'], ['act1', 'Act I', 'Agenda', 'area'], ['act2', 'Act II', 'Agenda', 'area'], ['act3', 'Act III', 'Agenda', 'area']] },
      { key: 'events', title: 'Event countdown', tab: 'adventure', item: 'Event', hint: 'Things that happen at a set time unless the crew stops them. Each is a tracker on the GM Screen.',
      fields: [['name', 'Event', 'e.g. The reactor overloads'], ['kind', 'Counts', '', 'select:Time (minutes)|Rounds'], ['size', 'How long', '30', 'num'], ['what', 'What happens', 'When it runs out', 'area']],
      tracker: function (o) { var n = parseInt(o.size, 10); return n > 0 ? { name: o.name || 'Event', kind: /round/i.test(o.kind) ? 'round' : 'time', size: n, finish: o.what || '' } : null; } }],
    // The Walking Dead: havens.
    TWD: [{ key: 'havens', title: 'Havens', tab: 'adventure', item: 'Haven',
      fields: [['name', 'Haven', 'Name'], ['where', 'Where', 'The old prison, a farm…'], ['defense', 'Defenses', 'Walls, guards, traps'], ['needs', 'Needs & issues', 'Food, water, a leaky roof', 'area'], ['people', 'Who lives there', '', 'area']] }],
    // Vaesen: the vaesen and the mystery's countdown (one box a day).
    VAE: [{ key: 'dossier', title: 'The vaesen', tab: 'adventure', single: true,
      fields: [['name', 'Vaesen', 'What it is'], ['signs', 'Signs', 'How its presence shows', 'area'], ['weakness', 'Weaknesses', 'What harms or binds it', 'area'], ['banish', 'How to end it', 'Banish, destroy, appease…', 'area']] },
      { key: 'countdown', title: 'Countdown', tab: 'adventure', single: true, hint: 'What happens each day the investigators don\'t stop it — one line per step. On the GM Screen it is a tracker, one box per step.',
      fields: [['steps', 'Steps (one per line)', 'Day 1: a cow dies…', 'lines']],
      tracker: function (o) { var l = linesOf(o.steps); return l.length ? { name: 'Countdown', kind: 'ticks', size: l.length, finish: l[l.length - 1] } : null; } }],
    // Mutant: Year Zero: the Ark's projects.
    MYZ: [{ key: 'projects', title: 'Ark projects', tab: 'adventure', item: 'Project',
      fields: [['name', 'Project', 'e.g. Windmill'], ['dev', 'Development', '', 'select:Food Supply|Culture|Technology|Warfare'], ['req', 'Requirement', 'e.g. Technology 10'], ['work', 'Work points', 'e.g. 3 of 10'], ['bonus', 'Bonus when done', 'e.g. Food Supply +D6'], ['notes', 'Notes', '', 'area']] }],
    // Candela Obscura: the case file.
    CO: [{ key: 'casefile', title: 'Case file', tab: 'adventure', single: true,
      fields: [['phenomenon', 'The phenomenon', 'What it is'], ['signs', 'Signs', 'How it shows itself', 'area'], ['wants', 'What it wants', '', 'area'], ['end', 'How to end it', '', 'area']] }],
    // Ghostbusters: the ghosts on the job.
    GB: [{ key: 'ghosts', title: 'Ghost dossier', tab: 'cast', item: 'Ghost',
      fields: [['name', 'Ghost', 'Name'], ['class', 'Class', 'e.g. Class 5 Full-Roaming Vapor'], ['signs', 'Signs', 'Slime, cold spots…', 'area'], ['trap', 'How it\'s trapped', '', 'area']] }],
    // JLU: the crisis track — escalating stakes, one per box.
    JLU: [{ key: 'crisis', title: 'Crisis track', tab: 'adventure', single: true, hint: 'One line per box: what gets worse each time the heroes fall behind.',
      fields: [['stakes', 'Stakes (one per line)', 'The bridge falls…', 'lines']],
      tracker: function (o) { var l = linesOf(o.stakes); return l.length ? { name: 'Crisis track', kind: 'ticks', size: l.length, finish: l[l.length - 1] } : null; } }]
  };
  function sections(code) { return SECTIONS[String(code || '').toUpperCase()] || []; }

  // No encounter difficulty ratings on any system (user, 2026-10-28). encounterInfo
  // stays as a no-op so older builders and the GM Screen keep working; CR_XP is
  // still exported for the GM Screen's own tools.
  var CR_XP = { '0': 10, '1/8': 25, '1/4': 50, '1/2': 100, '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800, '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900, '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000, '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000, '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000, '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000 };
  function encounterInfo() { return null; }
  // A scene's own tracker from its extras (The Walking Dead: the Threat Level).
  function sceneTrackers(code, scene) {
    var C = String(code || '').toUpperCase(), x = (scene && scene.x) || {};
    if (C === 'TWD' && _str(x.threat) !== '') return [{ name: 'Threat Level (starts at ' + x.threat + ')', kind: 'ticks', size: Math.max(1, 6 - (parseInt(x.threat, 10) || 0)), finish: 'Threat Level 6: the dead are in your face, surrounding you' }];
    return [];
  }

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
  function modules(code) { var s = sys(code), m = ((s && s.modules) || []).slice(); ['travel', 'factions', 'vehicles'].forEach(function (x) { if (m.indexOf(x) < 0) m.push(x); }); return m; }
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
  //   Dragonbane's dbQuest / dbSite / dbLeaving / dbJourneys / dbTraps → details,
  //   overview + notes, travel and hazards (see _dragonbane, _foldSites). Pirate Borg / LotR keys are left
  //   alone until those builders move onto the template.
  var DETAIL_KEYS = ['questgiver', 'hooks', 'goal', 'prize', 'stakes', 'opposition'];
  var LINK_KEYS = ['cast', 'clues', 'treasure', 'tables', 'hazards'];
  function _arr(v) { return Array.isArray(v) ? v : []; }
  function _str(v) { return v == null ? '' : String(v).trim(); }
  // Dragonbane's own sections → the shared shape: the Quest → Adventure Details,
  // the Adventure Site (+ Leaving the Site) → a Site, journey legs → Travel, traps
  // → Hazards. Nothing is dropped; each old key is removed once it is moved.
  function _dragonbane(ch, d) {
    var Q = ch.dbQuest;
    if (Q && typeof Q === 'object') {
      if (_str(Q.name) && !d.name) d.name = _str(Q.name);
      if (_str(Q.patron) && !d.questgiver) d.questgiver = _str(Q.patron);
      if (_str(Q.hook)) d.hooks = [_str(Q.hook)].concat(d.hooks ? [d.hooks] : []).join('\n');
      if (_str(Q.goal)) d.goal = d.goal ? d.goal + ' ' + _str(Q.goal) : _str(Q.goal);
      if (_str(Q.reward)) d.prize = d.prize ? d.prize + ' · ' + _str(Q.reward) : _str(Q.reward);
      if (_str(Q.notes)) ch.notes = (ch.notes && ch.notes.trim() ? ch.notes.replace(/\s+$/, '') + '\n\n' : '') + 'Quest notes: ' + _str(Q.notes);
    }
    delete ch.dbQuest;
    var S = ch.dbSite, leave = _str(ch.dbLeaving);
    if ((S && typeof S === 'object' && ['name', 'wayin', 'feature', 'guests', 'challenge', 'boss', 'notes'].some(function (k) { return _str(S[k]); })) || leave) {
      S = S || {};
      ch.sites.push({ name: _str(S.name) || 'The Adventure Site', wayin: _str(S.wayin), inside: _str(S.feature), guests: _str(S.guests), challenge: _str(S.challenge), boss: _str(S.boss), wayout: leave, notes: _str(S.notes) });
    }
    delete ch.dbSite; delete ch.dbLeaving;
    _arr(ch.dbJourneys).forEach(function (j) {
      if (!j || typeof j !== 'object') return;
      ch.travel.push({ name: _str(j.name), from: _str(j.from), to: _str(j.to), distance: _str(j.km), terrain: '', navigator: _str(j.pathfinder),
        opts: { offroad: j.offroad !== false && j.offroad !== '', map: !!j.map, hard: !!j.hard, mounted: !!j.mounted },
        mishaps: _str(j.mishaps), encounters: _str(j.encounters), notes: _str(j.notes) });
    });
    delete ch.dbJourneys;
    var names = _arr(ch.locations).map(function (l) { return l && _str(l.name).toLowerCase(); });
    _arr(ch.dbTraps).forEach(function (t) {
      if (!t || typeof t !== 'object') return;
      var w = _str(t.where), hit = w && names.indexOf(w.toLowerCase()) >= 0;
      ch.hazards.push({ name: _str(t.name), trigger: hit ? '' : w, effect: [_str(t.text), _str(t.damage) ? 'Damage: ' + _str(t.damage) : ''].filter(Boolean).join('\n'),
        spot: _str(t.spot), where: hit ? w : '' });
    });
    delete ch.dbTraps;
  }
  // The Lord of the Rings 5e: journey legs → Travel (their hexes, Perilous Areas and
  // events ride on the leg). Phase, schemes, rumours, councils, landmarks, hoards,
  // the Treasure Index, the Fellowship Phase and the Eye stay as the LotR plug-in's own keys.
  function _lotr(ch) {
    _arr(ch.journeys).forEach(function (j) {
      if (!j || typeof j !== 'object') return;
      ch.travel.push({ name: _str(j.name), from: _str(j.from), to: _str(j.to), distance: '', terrain: '', navigator: _str(j.guide), opts: {},
        mishaps: '', encounters: '', notes: _str(j.notes), region: _str(j.region) || 'Wild Land', season: _str(j.season),
        road: _str(j.road), open: _str(j.open), hard: _str(j.hard), perils: _arr(j.perils), events: _arr(j.events), _phaseSeason: _str(ch.phase && ch.phase.season) });
    });
    delete ch.journeys;
  }
  // A Pirate Borg ship (the old builder's flat shape) ↔ a vehicle.
  var PB_SHIP_STATS = ['hp', 'hpMax', 'hull', 'agility', 'speed', 'skill', 'broadsides', 'smallArms', 'ram', 'cargoSlots', 'crewMin', 'crewMax', 'capSpirit'];
  function pbShipToVehicle(sh) {
    var st = {}; PB_SHIP_STATS.forEach(function (k) { if (_str(sh[k])) st[k] = _str(sh[k]); }); if (_str(sh.crew)) st.aboard = _str(sh.crew);
    return { name: _str(sh.name), role: sh.role || 'party', type: _str(sh.base || sh.type), stats: st, crew: '', cargo: _str(sh.cargo), weapons: '', notes: _str(sh.notes),
      special: _str(sh.special), specialty: _arr(sh.specialty), mods: (sh.mods && typeof sh.mods === 'object') ? sh.mods : {}, shanties: _arr(sh.shanties) };
  }
  function pbVehicleToShip(v) {
    var st = v.stats || {}, o = { role: v.role || 'party', name: _str(v.name), base: _str(v.type), crew: _str(st.aboard), cargo: _str(v.cargo), notes: _str(v.notes),
      special: _str(v.special), specialty: _arr(v.specialty), mods: v.mods || {}, shanties: _arr(v.shanties) };
    PB_SHIP_STATS.forEach(function (k) { o[k] = _str(st[k]); });
    return o;
  }
  // Pirate Borg: the Job → Adventure Details (+ faction and port), voyage legs →
  // Travel, traps → Hazards. Ships stay as the PB plug-in's own list (pbShips).
  function _pirateborg(ch, d) {
    var J = ch.pbJob;
    if (J && typeof J === 'object') {
      if (_str(J.name) && !d.name) d.name = _str(J.name);
      if (_str(J.patron) && !d.questgiver) d.questgiver = _str(J.patron);
      if (_str(J.hook)) d.hooks = [_str(J.hook)].concat(d.hooks ? [d.hooks] : []).join('\n');
      if (_str(J.goal)) d.goal = d.goal ? d.goal + ' ' + _str(J.goal) : _str(J.goal);
      if (_str(J.prize)) d.prize = d.prize ? d.prize + ' · ' + _str(J.prize) : _str(J.prize);
      if (_str(J.rivals)) d.opposition = d.opposition ? d.opposition + ' · ' + _str(J.rivals) : _str(J.rivals);
      if (_str(J.faction) && !d.faction) d.faction = _str(J.faction);
      if (_str(J.port) && !d.port) d.port = _str(J.port);
      if (_str(J.notes)) ch.notes = (ch.notes && ch.notes.trim() ? ch.notes.replace(/\s+$/, '') + '\n\n' : '') + 'Job notes: ' + _str(J.notes);
    }
    delete ch.pbJob;
    _arr(ch.pbVoyages).forEach(function (j) {
      if (!j || typeof j !== 'object') return;
      ch.travel.push({ name: _str(j.name), from: _str(j.from), to: _str(j.to), distance: _str(j.hexes), terrain: '', navigator: '', opts: {}, mishaps: '', encounters: '',
        notes: _str(j.notes), heading: _str(j.heading), ship: _str(j.ship), speed: _str(j.speed), weather: _str(j.weather), winds: _str(j.winds), events: _str(j.events) });
    });
    delete ch.pbVoyages;
    var names = _arr(ch.locations).map(function (l) { return l && _str(l.name).toLowerCase(); });
    _arr(ch.pbTraps).forEach(function (t) {
      if (!t || typeof t !== 'object') return;
      var w = _str(t.where), hit = w && names.indexOf(w.toLowerCase()) >= 0;
      ch.hazards.push({ name: _str(t.name), trigger: [hit ? '' : w, _str(t.trigger)].filter(Boolean).join(' — '),
        effect: [_str(t.text), _str(t.damage) ? 'Damage: ' + _str(t.damage) : '', _str(t.bait) ? 'Bait: ' + _str(t.bait) : '', _str(t.state) ? 'State: ' + _str(t.state) : '', _str(t.complication) ? 'Complication: ' + _str(t.complication) : ''].filter(Boolean).join('\n'),
        spot: _str(t.test), where: hit ? w : '' });
    });
    delete ch.pbTraps;
    // Ships → the Vehicles module (labelled Ships for Pirate Borg).
    _arr(ch.pbShips).forEach(function (sh) { if (sh && typeof sh === 'object') ch.vehicles.push(pbShipToVehicle(sh)); });
    delete ch.pbShips;
  }
  // A site (Dragonbane's Adventure Site, or a card from the short-lived Sites tab)
  // → the Adventure tab: its description into the Overview, its boss into the
  // Opposition, what happens on leaving and its notes into the GM Notes.
  function siteText(x) {
    var L = [['The way in', x.wayin], ['Inside', x.inside], ['Who is there', x.guests], ['The challenge', x.challenge], ['The boss', x.boss]]
      .filter(function (r) { return _str(r[1]); }).map(function (r) { return r[0] + ': ' + _str(r[1]); });
    return [_str(x.name)].concat(L).filter(Boolean).join('\n');
  }
  function _foldSites(ch, d) {
    _arr(ch.sites).forEach(function (x) {
      if (!x || typeof x !== 'object') return;
      var t = siteText(x);
      if (t) ch.overview = (_str(ch.overview) ? String(ch.overview).replace(/\s+$/, '') + '\n\n' : '') + t;
      if (_str(x.boss) && !d.opposition) d.opposition = _str(x.boss);
      var n = [_str(x.wayout) ? 'If they leave' + (x.name ? ' ' + _str(x.name) : '') + ' and come back:\n' + _str(x.wayout) : '', _str(x.notes) ? (x.name ? _str(x.name) + ' — ' : '') + _str(x.notes) : ''].filter(Boolean).join('\n\n');
      if (n) ch.notes = (_str(ch.notes) ? String(ch.notes).replace(/\s+$/, '') + '\n\n' : '') + n;
    });
    delete ch.sites;
  }
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
    // An older converter wrote every table under both names; keep one of each.
    var _seenT = {};
    tables = tables.filter(function (t) { if (!t) return false; var k = JSON.stringify([_str(t.title).toLowerCase(), _str(t.die), _arr(t.rows).map(function (r) { return [_str(r && r.roll), _str(r && r.result)]; })]); if (_seenT[k]) return false; _seenT[k] = 1; return true; });
    ch.rollTables = tables; delete ch.rolltables; ch.randenc = [];
    // Shadowdark's Strong Start scenes become the opening scenes.
    var so = _arr(ch.strongopen).filter(function (x) { return x && (x.name || x.readaloud || x.desc || x.tag); });
    if (so.length) ch.locations = so.map(function (x) { var o = {}; for (var k in x) o[k] = x[k]; o.opener = true; return o; }).concat(_arr(ch.locations));
    ch.strongopen = [];
    ch.trackers = _arr(ch.trackers);
    ch.hazards = _arr(ch.hazards);
    // The separate Notes tab (session log) was folded into the Adventure tab's GM Notes.
    if (typeof ch.notes !== 'string') ch.notes = _str(ch.notes);
    var _log = _str(ch.log).trim();
    if (_log) ch.notes = ch.notes.trim() ? ch.notes.replace(/\s+$/, '') + '\n\n' + _log : _log;
    ch.log = '';
    ch.clues = _arr(ch.clues); ch.rewards = _arr(ch.rewards); ch.statblocks = _arr(ch.statblocks); ch.maps = _arr(ch.maps);
    if (!ch.sys || typeof ch.sys !== 'object') ch.sys = {};
    ch.sites = _arr(ch.sites); ch.travel = _arr(ch.travel); ch.factions = _arr(ch.factions); ch.vehicles = _arr(ch.vehicles);
    _dragonbane(ch, d);
    _lotr(ch);
    _pirateborg(ch, d);
    _foldSites(ch, d);
    ch.locations = _arr(ch.locations).map(function (l) {
      if (!l || typeof l !== 'object') return l;
      var L = (l.links && typeof l.links === 'object') ? l.links : {};
      if (typeof L.map !== 'string') L.map = _str(L.map);
      if (typeof L.mapkey !== 'string') L.mapkey = _str(L.mapkey);
      LINK_KEYS.forEach(function (k) { L[k] = _arr(L[k]).map(_str).filter(Boolean); });
      delete L.site;
      l.links = L; l.trackers = _arr(l.trackers);
      return l;
    });
    // Links live in ONE place — on the encounter. Older preps also wrote a "where"
    // on clues, treasure and hazards; fold each into the matching encounter's links
    // (a clue's unmatched "where" was usually a person, so it becomes "held by").
    var locs = ch.locations.filter(function (l) { return l && typeof l === 'object'; });
    var findLoc = function (n) { n = _str(n).toLowerCase(); return n ? locs.filter(function (l) { return _str(l.name).toLowerCase() === n; })[0] : null; };
    var fold = function (list, key, nameKey, onMiss) {
      list.forEach(function (x) {
        if (!x || typeof x !== 'object' || x._linked) return;
        var nm = _str(x[nameKey]); var w = _str(x.where);
        if (nm && w) {
          var hit = findLoc(w);
          if (hit) { if (hit.links[key].map(function (v) { return v.toLowerCase(); }).indexOf(nm.toLowerCase()) < 0) hit.links[key].push(nm); }
          else if (onMiss) onMiss(x, w);
        }
        x._linked = 1;
      });
    };
    // Who holds a clue or a treasure is a list of Monsters/NPCs names (heldBy).
    var held = function (x) { if (!Array.isArray(x.heldBy)) { var h = _str(x.holder); x.heldBy = h ? [h] : []; } delete x.holder; };
    ch.clues.forEach(function (x) { if (x && typeof x === 'object') held(x); });
    ch.rewards.forEach(function (x) { if (x && typeof x === 'object') held(x); });
    fold(ch.clues, 'clues', 'header', function (x, w) { if (!x.heldBy.some(function (v) { return v.toLowerCase() === w.toLowerCase(); })) x.heldBy.push(w); });
    fold(ch.rewards, 'treasure', 'name', function (x, w) { x.legacyWhere = w; });
    fold(ch.hazards, 'hazards', 'name', function (x, w) { x.legacyWhere = w; });
    // Hazards & traps are an encounter type now (yellow): each old hazard becomes a
    // "hazard" encounter right after the first encounter that linked it (else at
    // the end). Trigger → Interactions, Effect / Damage → Consequences, Spot /
    // Disarm → Notes. The encounters' hazard links are dropped with them.
    _arr(ch.hazards).forEach(function (z) {
      if (!z || typeof z !== 'object') return;
      var nm = _str(z.name);
      var enc = { name: nm || 'Hazard', type: 'hazard', tag: '', readaloud: '',
        desc: _str(z.trigger) ? 'Trigger: ' + _str(z.trigger) : '',
        consequences: _str(z.effect),
        notes: [_str(z.spot) ? 'Spot / disarm: ' + _str(z.spot) : '', _str(z.legacyWhere) ? 'Where: ' + _str(z.legacyWhere) : ''].filter(Boolean).join('\n'),
        links: { map: '', mapkey: '', cast: [], clues: [], treasure: [], tables: [], hazards: [] }, trackers: [] };
      if (z.x && typeof z.x === 'object') enc.x = z.x;
      var at = -1;
      if (nm) ch.locations.forEach(function (l, i) { if (at < 0 && l && l.links && l.links.hazards.some(function (v) { return v.toLowerCase() === nm.toLowerCase(); })) at = i; });
      if (at < 0) ch.locations.push(enc); else ch.locations.splice(at + 1, 0, enc);
    });
    ch.hazards = [];
    ch.locations.forEach(function (l) { if (l && l.links) l.links.hazards = []; });
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

  window.PREP_REGISTRY = { TABS: TABS, LABELS: LABELS, SYSTEMS: SYSTEMS, ITEMS: ITEMS, TRACKER_KINDS: TRACKER_KINDS, DETAIL_KEYS: DETAIL_KEYS, MODULE_TABS: MODULE_TABS, TRAVEL: TRAVEL,
    sys: sys, label: label, loot: loot, modules: modules, itemList: itemList, loadItems: loadItems, migrate: migrate, trackerToTool: trackerToTool,
    travel: travel, travelCalc: travelCalc, siteText: siteText,
    ATTITUDES: ATTITUDES, factionList: factionList, factionListLoad: factionListLoad, factionTracker: factionTracker,
    TAB_ORDER: TAB_ORDER, TAB_NAMES: TAB_NAMES, tabName: tabName,
    EXTRA: EXTRA, SECTIONS: SECTIONS, extra: extra, sections: sections, encounterInfo: encounterInfo, sceneTrackers: sceneTrackers, CR_XP: CR_XP,
    loadScripts: function (srcs, cb) { loadList({ scripts: srcs }, cb); },
    vehicleCfg: vehicleCfg, vehicleList: vehicleList, vehicleToStatblock: vehicleToStatblock, pbShipToVehicle: pbShipToVehicle, pbVehicleToShip: pbVehicleToShip, hasModule: function (code, m) { return modules(code).indexOf(m) >= 0 && MODULE_TABS.indexOf(m) >= 0; },
    hasItems: function (code) { return !!ITEMS[String(code || '').toUpperCase()]; } };
})();
