// ══ Shadowdark plug-in ══════════════════════════════════════════════════════
// The SD prep's own look for stat blocks, the book generators (sd-prep-tables.js,
// sd-people-tables.js, sd-book-gen.js) wired to the shared template's cards, the
// "Site size (d6)" map option, and the crawl trackers (torch + encounter check).

// Stat block in the Shadowdark style: AC | HP | MV line, six-score table.
function buildSB(s) {
  const div = document.createElement('div');
  // The card's top and bottom bars take the cast-type colour (template .sbt-* rules).
  div.className = 'stat-block sbt-' + (['mob','boss','npc','talk'].indexOf(s.sbtype) >= 0 ? s.sbtype : 'mob') + (s.fullwidth ? ' full-width' : '');

  let html = '';

  // Name (with how many appear)
  const qty = parseInt(s.qty, 10) || 0;
  html += '<div class="sb-name">' + escH(s.name) + (qty > 1 ? ' <span class="sb-qty">×' + qty + '</span>' : '') + '</div>';
  // Talk-only: who they are and how to play them, no stat block.
  if(s.sbtype === 'talk') {
    if(s.flavor) html += '<div class="sb-flavor">' + fmtText(s.flavor) + '</div>';
    const ts=(label,val)=>(val&&String(val).trim())?'<div class="sb-ability"><strong>'+escH(label)+':</strong> '+fmtText(val)+'</div>':'';
    html += ts('Wants',s.wants)+ts('Quirks',s.quirks)+ts('Info / Secrets',s.info)+ts('Inventory',s.inventory)+(s.notes?'<hr class="sb-divider"><div class="sb-notes">'+fmtText(s.notes)+'</div>':'');
    div.innerHTML = html;
    return div;
  }

  // Flavor / Description — italic, right under name
  if(s.flavor) html += '<div class="sb-flavor">' + fmtText(s.flavor) + '</div>';

  html += '<hr class="sb-divider">';

  // AC / HP / MV on one line
  const acHpParts = [];
  if(s.level)   acHpParts.push('<strong>LV</strong> ' + escH(s.level));
  if(s.hpval)   acHpParts.push('<strong>AC</strong> ' + escH(s.hpval));
  if(s.hpcount) acHpParts.push('<strong>HP</strong> ' + escH(s.hpcount));
  if(s.move)    acHpParts.push('<strong>MV</strong> ' + escH(s.move));
  if(acHpParts.length) html += '<div class="sb-stat-line">' + acHpParts.join('&ensp;|&ensp;') + '</div>';

  html += '<hr class="sb-divider">';

  // Six ability scores
  html += '<table class="sb-score-table"><tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>';
  html += '<tr>'
    + '<td>' + escH(s.str||'—') + '</td>'
    + '<td>' + escH(s.dex||'—') + '</td>'
    + '<td>' + escH(s.con||'—') + '</td>'
    + '<td>' + escH(s.int||'—') + '</td>'
    + '<td>' + escH(s.evade||'—') + '</td>'
    + '<td>' + escH(s.cha||'—') + '</td>'
    + '</tr></table>';

  html += '<hr class="sb-divider">';

  // Abilities
  if(s.abilities) {
    s.abilities.split('\n').filter(Boolean).forEach(line => {
      if(/^[-–—]{3,}$/.test(line.trim())) { html += '<hr class="sb-ability-sep">'; return; }
      const ci = line.indexOf(':');
      if(ci < 0 || ci === line.length - 1) {
        html += '<span class="sb-section-label">' + escH(line.replace(':','')) + '</span>';
      } else {
        html += '<div class="sb-ability"><strong>' + escH(line.slice(0,ci)) + '.</strong> ' + fmtText(line.slice(ci+1).trim()) + '</div>';
      }
    });
  }

  // Social (roleplay) sections — only for NPC-typed stat blocks.
  if(s.sbtype==='npc') {
    const socSec=(label,val,cls)=>(val&&String(val).trim())?'<div class="sb-ability'+(cls?' '+cls:'')+'"><strong>'+escH(label)+':</strong> '+fmtText(val)+'</div>':'';
    const soc=socSec('Wants',s.wants)+socSec('Quirks',s.quirks)+socSec('Info / Secrets',s.info)+socSec('Inventory',s.inventory);
    if(soc) html += '<hr class="sb-divider">' + soc;
  }

  // NPC notes
  if(s.isnpc && s.notes) {
    html += '<hr class="sb-divider">';
    html += s.fullwidth
      ? '<div class="sb-notes">' + fmtText(s.notes) + '</div>'
      : '<div class="sb-notes" style="column-count:1;">' + fmtText(s.notes) + '</div>';
  }

  div.innerHTML = html;
  return div;
}

// ── Treasure generator (ported from GM Screen) ───────────────────────────
function _spbGenTreasureItem(tierKey, type) {
  if(type==='random_all') {
    type = _R(['random','random','Weapon','Armor','Wand','Ring','Cloak','Boots','Potion','Scroll','table','mundane','gem','luxury'].concat(window.SDBookGen ? ['bookmagic','bookmagic'] : []));
  }
  if(type==='bookmagic' && window.SDBookGen) {   // core pp. 282–295
    const m = window.SDBookGen.magicItem();
    return { name: m.name, stats: m.type + '. ' + m.summary + ' · Name idea: ' + m.ideaName };
  }
  if(type==='table') {
    const tier = TREASURE_TIERS[tierKey]||TREASURE_T1;
    const item = _R(tier).replace(/^[PNFL]\. /, '');
    return { name: 'Treasure Roll (Tier '+tierKey+')', stats: item };
  }
  // Unique feature (core p. 278) on mundane treasure.
  const uf = window.SDBookGen ? ' · Unique feature: ' + window.SDBookGen.uniqueFeature() : '';
  if(type==='mundane') { return { name: 'Mundane Loot', stats: _R(MUNDANE_LOOT) + uf }; }
  if(type==='gem')     { const g = _R(GEMS); return { name: 'Gemstone', stats: g && g.name ? g.name + ' (' + g.value + ')' : String(g) }; }
  if(type==='luxury')  {
    const pool = _R(LUX_ITEM_POOLS);
    return { name: 'Luxury Item', stats: _R(LUX_FEAT)+' '+_R(pool) + uf };
  }
  const pool = type==='random' ? MAGIC_ITEM_POOLS[_R(LOOT_TYPES)] : (MAGIC_ITEM_POOLS[type]||POTIONS);
  const item = _R(pool);
  return { name: item.name, stats: item.desc };
}

// ── Random encounter table entry (ported from GM Screen) ─────────────────
function _spbGenEncEntry(type) {
  if(type==='random_all') {
    type = _R(['happens','trap','hazard','Arctic','Cave','Deep Tunnels','Desert','Forest','Grassland','Jungle','Mountain','Ocean','River & Coast','Ruins','Swamp']);
  }
  if(type==='happens')  return { hdr:'Something Happens!', text:_R(HAPPENS) };
  if(type==='rumor')    return { hdr:'Rumor', text:_R(RUMORS) };
  if(type==='secret')   return { hdr:'Secret', text:_R(SECRETS_D1)+' '+_R(SECRETS_D2) };
  if(type==='trap') {
    const trap = TRAPS[Math.ceil(Math.random()*12)-1];
    return { hdr:'Trap: '+trap.trap, text:'Trigger: '+trap.trigger+' — '+trap.damage };
  }
  if(type==='hazard') {
    return { hdr:'Hazard', text:_R(HAZARDS_DMG)+' / '+_R(HAZARDS_WKN)+' / '+_R(HAZARDS_MOV) };
  }
  const pool = BIOME_ENC_TABLES[type];
  if(pool) return { hdr: type, text:_R(pool) };
  return { hdr:'Encounter', text:_R(HAPPENS) };
}



// ── Loot ─────────────────────────────────────────────────────────────────
function randReward() {
  const tier = document.getElementById('reward-tier')?.value || '1';
  const type = document.getElementById('reward-type')?.value || 'random_all';
  const t = _spbGenTreasureItem(tier, type);
  addReward({ name: t.name, flavor: '', stats: t.stats });
  refreshWhereOptions(); autosave();
}

// ── Hooks / Strong Open ───────────────────────────────────────────────────
// Shadowdark's Strong Start is now the opening scene (a scene marked opener).
function randStrongOpen() {
  const allOpens = Object.values(ADV_OPENING_SCENES).flat();
  const first = document.querySelector('#locations-list .location-card');
  const card = (addLocation({ name: 'Strong Start', type: 'exploration', tag: '', readaloud: _R(allOpens), desc: '', opener: true }), document.querySelector('#locations-list .location-card:last-child'));
  if(first && card) first.parentNode.insertBefore(card, first);   // the opener goes first
  autosave();
}

// ── Encounters ────────────────────────────────────────────────────────────
// Rooms come from the core rulebook's "Shadowdark Maps" generator (pp. 130–131)
// in /tools-data/sd-book-gen.js: one d10 room-type roll per room (Empty, Trap,
// Minor hazard, Solo monster, NPC, Monster mob, Major hazard, Treasure, Boss
// monster) plus that type's detail table; in a batch the objective/boss sits in
// the room with the highest roll. The Motif adds an optional flavour idea from
// the app's motif room tables (DUN_R1–R5, not book tables), and a motif that is
// also a book biome (e.g. Deep Tunnels, Desert, Ruins) adds a biome encounter.
const BOOK_ROOM_TYPES = ['Empty','Trap','Minor hazard','Solo monster','NPC','Monster mob','Major hazard','Treasure','Boss monster'];
const BOOK_ROOM_LOCTYPE = { 'Solo monster':'combat', 'Monster mob':'combat', 'Boss monster':'combat', 'NPC':'npc' };
const BOOK_ROOM_IDEA = { 'Solo monster':'DUN_R1', 'Monster mob':'DUN_R1', 'Trap':'DUN_R3', 'Minor hazard':'DUN_R3', 'Major hazard':'DUN_R3', 'NPC':'DUN_R2', 'Boss monster':'DUN_R4', 'Treasure':'DUN_R5' };

function _encMotif() {
  const motifSel = document.getElementById('enc-motif');
  const motifs = DUN_MOTIFS.filter(function(m){ return m !== 'none'; });
  return (motifSel && motifSel.value !== 'random') ? motifSel.value : _R(motifs);
}
// One location card for a rolled book room {n, roll, type, detail, objective}.
function _addBookRoom(rm, mot, withNumber) {
  const tables = { DUN_R1: DUN_R1, DUN_R2: DUN_R2, DUN_R3: DUN_R3, DUN_R4: DUN_R4, DUN_R5: DUN_R5 };
  const ideaTbl = tables[BOOK_ROOM_IDEA[rm.type]];
  const ideaPool = ideaTbl ? ideaTbl[mot] : null;
  const lines = [];
  if(rm.objective) lines.push('★ The site\'s objective or boss is here (highest room roll).');
  if(ideaPool && ideaPool.length) lines.push('Idea (' + mot + '): ' + _R(ideaPool));
  const biomePool = BIOME_ENC_TABLES[mot];
  if(biomePool && rm.type !== 'Empty') lines.push('[' + mot + ' encounter] ' + _R(biomePool));
  addLocation({
    name: (withNumber ? 'Room ' + rm.n + ' · ' : '') + rm.type + (rm.detail ? ' — ' + rm.detail : ''),
    type: BOOK_ROOM_LOCTYPE[rm.type] || 'exploration',
    tag: '',
    readaloud: '',
    desc: lines.join('\n\n'),
  });
}

function randEncounter() {
  if(!window.SDBookGen) return;
  const mot = _encMotif();
  const sel = document.getElementById('enc-type');
  const want = sel && sel.value ? sel.value : '';
  // Roll d10 rooms until we hit the requested type (Mixed = the first roll).
  let rm;
  for(let i = 0; i < 200; i++) {
    rm = window.SDBookGen.dungeon({ size: 1 }).rooms[0];
    if(!want || rm.type === want) break;
  }
  rm.objective = false;
  _addBookRoom(rm, mot, false);
  autosave();
}

function randEncounterBatch() {
  if(!window.SDBookGen) return;
  const countSel = document.getElementById('enc-count');
  const sel = document.getElementById('enc-type');
  const mot = _encMotif();
  const cv = countSel ? countSel.value : '1';
  if(sel && sel.value) {
    // A specific room type: every room is that type (no objective marking).
    const n = parseInt(cv) || 1;
    for(let i = 0; i < n; i++) randEncounter();
    readFields(); renderPreview();
    return;
  }
  // Mixed: roll a site. "book" = roll the site size (d6 → 5d10 / 8d10 / 12d10).
  const dn = window.SDBookGen.dungeon({ size: cv === 'book' ? 'roll' : (parseInt(cv) || 1) });
  if(dn.rooms.length === 1) dn.rooms[0].objective = false;
  dn.rooms.forEach(function(rm){ _addBookRoom(rm, mot, dn.rooms.length > 1); });
  readFields(); renderPreview();
}


// ── Random NPC (core pp. 124–129) ──
function randNPC() {
  const P = window.SD_PEOPLE;
  if(!P) return;
  const n = P.npc();
  const role = _R(['Villain','Quest Giver','Rival','Ally','Wild Card','Informant','Prisoner','Guardian']);
  const flavor = n.age + ' ' + n.ancestry.toLowerCase() + ', ' + n.alignment.toLowerCase() + ', ' + n.wealth.toLowerCase() + ' means. ' +
    'Appearance: ' + n.appearance.toLowerCase() + '. Does: ' + n.does.toLowerCase() + '.';
  addStatBlock({
    sbtype: role === 'Villain' ? 'boss' : role === 'Rival' ? 'boss' : 'npc',
    name: n.name + ' ' + n.identifier + ' (' + n.ancestry + ')',
    type: n.occupation + ' — ' + role,
    flavor: flavor,
    wants: _R(WANTS), info: 'Secret: ' + n.secret
  });
  autosave();
}

// ── Maps: "Site size (d6)" — core p. 130: small 5, medium 8, large 12 rooms ──
function randMap() {
  if(!window.DungeonEngine) return;
  const v = id => document.getElementById(id);
  const rv = v('mapgen-rooms')?.value;
  const rooms = rv === 'book' ? [5,5,8,8,8,12][Math.floor(Math.random()*6)] : (parseInt(rv) || 5);
  const gen = window.DungeonEngine.generateToPNG({
    rooms,
    size: +(v('mapgen-size')?.value || 3),
    layout: +(v('mapgen-layout')?.value || 3),
    entrances: +(v('mapgen-entrances')?.value || 2),
    mapType: v('mapgen-type')?.value || 'dungeon',
    gridInterior: (v('mapgen-gridint')?.value || '0') === '1',
    theme: v('mapgen-look')?.value || 'light'
  });
  if(!gen || !gen.png) return;
  addMap({ title: rooms + '-Room ' + ((v('mapgen-type')?.value || 'Dungeon').replace(/^\w/, c=>c.toUpperCase())), src: gen.png });
  state.maps = collectMaps();
  renderPreview();
  saveState();
}

// ── Crawl trackers ──
// A torch burns for one hour of real time; the encounter check repeats every
// 3 / 2 / 1 crawling rounds by danger level (Unsafe / Risky / Deadly), rolling the
// prep's random-encounter table when it comes up. Both land in the Trackers list,
// so the GM Screen can start them.
function sdAddCrawlTrackers() {
  const list = document.getElementById('trackers-list'); if(!list) return;
  const every = parseInt((document.getElementById('sd-danger') || {}).value, 10) || 3;
  const label = { 3: 'Unsafe', 2: 'Risky', 1: 'Deadly' }[every] || 'Unsafe';
  const have = readTrackers(list).map(t => t.name.toLowerCase());
  const encTable = tableNames().find(n => /encounter/i.test(n)) || '';
  if(have.indexOf('torch') < 0) addTracker({ name: 'Torch', kind: 'time', size: 60, finish: 'The torch gutters out. Light another or the party is in total darkness.', players: true }, list);
  const encName = 'Encounter check (' + label + ')';
  if(!have.some(n => /^encounter check/.test(n))) addTracker({ name: encName, kind: 'round', size: every, repeat: true, table: encTable, finish: 'Roll a d6: on a 1 a random encounter arrives.' + (encTable ? '' : ' (Add a random-encounter table on the Tables tab to roll it here.)') }, list);
  autosave();
}
