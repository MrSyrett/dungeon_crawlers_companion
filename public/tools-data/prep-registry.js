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
    site: 'Sites', travel: 'Travel' };
  // Shared modules that are built so far, in tab order (they sit after Encounters).
  // A system turns one on in SYSTEMS[code].modules; Factions & clocks and Vehicles
  // are listed there already and get their tabs when they are built.
  var MODULE_TABS = ['site', 'travel'];
  // Flavour names (kept per system), loot drops, and the shared modules each system
  // turns on. Modules are set per system, never per adventure: an empty one simply
  // shows nothing on the GM Screen.
  var SYSTEMS = {
    SD:    { labels: { scenes: 'Encounters', cast: 'Monsters', treasure: 'Treasure' }, loot: true, modules: ['site'] },
    DCC:   { labels: { scenes: 'Encounters', cast: 'NPCs/Mobs', treasure: 'Loot' }, loot: true, modules: ['site'] },
    DND:   { labels: { scenes: 'Encounters', cast: 'Monsters/NPCs', treasure: 'Treasure' }, loot: true, modules: ['travel'] },
    DB:    { labels: { adventure: 'Quest', cast: 'Monsters', treasure: 'Treasure', site: 'Site', travel: 'Journey' }, loot: true, modules: ['travel', 'site'] },
    MMRPG: { labels: { cast: 'Villains/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions'] },
    KOB:   { labels: { cast: 'NPCs/Threats', treasure: 'Items' }, loot: false, modules: [] },
    SW:    { labels: { cast: 'Imperials/NPCs', treasure: 'Gear' }, loot: true, modules: ['travel', 'vehicles'] },
    LOTR:  { labels: { cast: 'Adversaries', treasure: 'Treasure', travel: 'Journeys', phase: 'Phase' }, loot: true, modules: ['travel'] },
    YZE:   { labels: { cast: 'Adversaries/NPCs', treasure: 'Gear' }, loot: true, modules: ['vehicles'] },
    TWD:   { labels: { cast: 'Adversaries/NPCs', treasure: 'Gear' }, loot: true, modules: ['factions', 'vehicles'] },
    VAE:   { labels: { cast: 'Vaesen/NPCs', treasure: 'Treasure' }, loot: true, modules: [] },
    MYZ:   { labels: { cast: 'Zone Threats/NPCs', treasure: 'Artifacts' }, loot: true, modules: ['travel'] },
    PB:    { labels: { adventure: 'The Job', cast: 'Foes', treasure: 'Plunder', scenes: 'Places', travel: 'Voyage', ships: 'Ships' }, loot: true, modules: ['travel', 'site', 'vehicles', 'factions'] },
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
        var ships = _arr(ch && ch.pbShips).concat(_arr(typeof PB_SHIPS !== 'undefined' ? PB_SHIPS : null));
        var sh = j.ship ? ships.filter(function (s) { return s && s.name === j.ship; })[0] : null;
        var base = String(j.speed || '').trim() !== '' ? n(j.speed) : (sh ? n(sh.speed) : 0);
        var against = TR.againstTrades.directions.indexOf(j.heading) >= 0;
        var speed = base ? (against ? Math.max(TR.againstTrades.min, base + TR.againstTrades.hexesPerDay) : base) : 0;
        var days = hexes && speed ? Math.ceil(hexes / speed) : 0;
        if (!hexes || !speed) return { lines: ['Set the hexes and a ship (or a speed) to work out the days at sea.'], ticks: 0, tickName: 'day' };
        return { ticks: days, tickName: 'day', lines: [hexes + ' hex' + (hexes === 1 ? '' : 'es') + ' (' + hexes * TR.hexMiles + ' miles) at ' + speed + ' a day' + (against ? ' (' + base + ' −1 against the trade winds)' : '') + ' → ~' + days + ' day' + (days === 1 ? '' : 's') + ' at sea.'] };
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
  //   Dragonbane's dbQuest / dbSite / dbLeaving / dbJourneys / dbTraps → details,
  //   sites, travel and hazards (see _dragonbane). Pirate Borg / LotR keys are left
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
      var nm = _str(S.name) || 'The Adventure Site';
      ch.sites.push({ name: nm, wayin: _str(S.wayin), inside: _str(S.feature), guests: _str(S.guests), challenge: _str(S.challenge), boss: _str(S.boss), wayout: leave, notes: _str(S.notes) });
      ch._dbSite = nm;   // the old builder's rooms were the site's rooms
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
    ch.sites = _arr(ch.sites); ch.travel = _arr(ch.travel);
    _dragonbane(ch, d);
    _lotr(ch);
    _pirateborg(ch, d);
    ch.locations = _arr(ch.locations).map(function (l) {
      if (!l || typeof l !== 'object') return l;
      var L = (l.links && typeof l.links === 'object') ? l.links : {};
      if (typeof L.map !== 'string') L.map = _str(L.map);
      if (typeof L.mapkey !== 'string') L.mapkey = _str(L.mapkey);
      LINK_KEYS.forEach(function (k) { L[k] = _arr(L[k]).map(_str).filter(Boolean); });
      if (typeof L.site !== 'string') L.site = _str(L.site);
      l.links = L; l.trackers = _arr(l.trackers);
      return l;
    });
    if (ch._dbSite) { ch.locations.forEach(function (l) { if (l && typeof l === 'object' && !l.links.site) l.links.site = ch._dbSite; }); delete ch._dbSite; }
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
    travel: travel, travelCalc: travelCalc, hasModule: function (code, m) { return modules(code).indexOf(m) >= 0 && MODULE_TABS.indexOf(m) >= 0; },
    hasItems: function (code) { return !!ITEMS[String(code || '').toUpperCase()]; } };
})();
