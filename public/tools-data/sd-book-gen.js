// Shadowdark core-rulebook GENERATORS — the book's own random tables, shared by
// the GM Screen and the Shadowdark session-prep builder (loaded with
// <script src="/tools-data/sd-book-gen.js">). Page numbers are the printed pages
// of the Shadowdark RPG core rules.
//
//   Adventure generator + adventuring site name ....... pp. 122–123
//   Shadowdark Maps (dungeon / site generator) ........ pp. 130–131
//   Overland hex maps (hex crawl) ..................... pp. 132–133
//   Settlement maps + districts ....................... pp. 134–135
//   Light mishaps ..................................... p. 110
//   Unique feature (mundane items) .................... p. 278
//   Random magic item (type, qualities, personality,
//     armor / potion / scroll & wand / utility / weapon,
//     magic item idea names) ......................... pp. 282–295
//
// Every table is stored exactly as printed: either a plain list for a die whose
// faces map 1:1 to the rows, or [lo, hi, result] rows for ranged results. Rolls
// are made with real dice (d(n), sum of NdX) so the odds are the book's.
(function (root) {
  'use strict';

  const d = n => 1 + Math.floor(Math.random() * n);
  const nd = (k, n) => { let s = 0; for (let i = 0; i < k; i++) s += d(n); return s; };
  // [lo, hi, value] rows → the value whose range contains r
  const band = (rows, r) => { for (const x of rows) if (r >= x[0] && r <= x[1]) return x[2]; return rows[rows.length - 1][2]; };
  // Roll on a ranged table with dice spec [k, n] (e.g. [2,6] for 2d6)
  const rollBand = (rows, k, n) => { const r = nd(k, n); return { roll: r, value: band(rows, r) }; };
  // A list whose faces map 1:1 (d20 list of 20 entries, etc.)
  const rollList = list => { const r = d(list.length); return { roll: r, value: list[r - 1] }; };

  // Inline sub-rolls printed inside results, e.g. "Immune 5 rounds, 1d4: 1. fire,
  // 2. cold, 3. electricity, 4. poison" or "Two limbs petrify, 1d4: 1-2. arms,
  // 3-4. legs". Resolve the sub-roll and keep the printed die in brackets.
  function resolveSub(text) {
    const m = /(\d)d(\d+):\s*((?:\d+(?:-\d+)?\.\s*[^,]+(?:,\s*)?)+)$/.exec(text);
    if (!m) return text;
    const r = nd(+m[1], +m[2]);
    const opts = [...m[3].matchAll(/(\d+)(?:-(\d+))?\.\s*([^,]+)/g)].map(o => [+o[1], +(o[2] || o[1]), o[3].trim()]);
    const pick = band(opts, r);
    // "Heals, 1d4: …" → "Heals: 2d6";  "Owed a favor by a 1d4: …" → "Owed a favor by a noble"
    const pre = text.slice(0, m.index), joined = /,\s*$/.test(pre) ? pre.replace(/[,\s]+$/, '') + ': ' : pre;
    return joined + pick + ' (' + m[1] + 'd' + m[2] + ' = ' + r + ')';
  }

  // ── ADVENTURES (pp. 122–123) ───────────────────────────────────────────
  const ADV_D1 = ['Rescue the','Find the','Destroy the','Infiltrate the','Bypass the','Return the','Defeat the','Spy on the','Bribe the','Deliver the','Escape the','Imprison the','Stop the','Befriend the','Pacify the','Persuade the','Steal the','Escort the','Banish the','Free the'];
  const ADV_D2 = ['Goblet','Prisoner','Sword','Vault','Cult','Spirit','Killer','Demon','Noble','Hunter','Hostage','Thief','Spy','Werewolf','Relic','High priest','Merchant','Witch','Ritual','Vampire'];
  const ADV_D3 = ['Of the evil wizard','Stalking the wastes','At the bottom of the river','In the city sewers','Under the barrow mounds','Of the fallen hero','In the magical library',"In the king's court",'Of the ancient lineage',"In the sorcerer's tower",'In the Murkwood','Hiding in the slums','Of the Dwarven lord','In the musty tomb','Of the royal knights','Sacrificing innocents','In the catacombs','Blackmailing the baron',"In the Thieves' Guild",'Murdering townsfolk'];
  const SITE_N1 = ['Mines of the','Abbey of the','Tower of the','Caves of the','Barrow of the','Warrens of the','Crypt of the','Monastery of the','Ruin of the','Tunnels of the','Citadel of the','Tomb of the','Castle of the','Temple of the','Fortress of the','Isle of the','Keep of the','Dungeon of the','Necropolis of the','Shrine of the'];
  const SITE_N2 = ['Cursed','Whispering','Bleeding','Shrouded','Lost','Dead','Deepwood','Fallen','Revenant','Frozen','Shimmering','Chaos','Abandoned','Blighted','Forgotten','Slumbering','Savage','Unholy','Enchanted','Immortal'];
  const SITE_N3 = ['Flame','Ghost','Darkness','Peak','Borderlands','King','Twilight','Depths','Jewel','God','Lands','Storm','Swamp','Ravine','Valley','Horde','Skull','Queen','Wastes','Hero'];

  function adventure() {
    const a = [rollList(ADV_D1), rollList(ADV_D2), rollList(ADV_D3)];
    const text = a[0].value + ' ' + a[1].value + ' ' + a[2].value.charAt(0).toLowerCase() + a[2].value.slice(1);
    return { text, parts: a.map(x => x.value), rolls: a.map(x => x.roll) };
  }
  function siteName() {
    const a = [rollList(SITE_N1), rollList(SITE_N2), rollList(SITE_N3)];
    return { text: a.map(x => x.value).join(' '), parts: a.map(x => x.value), rolls: a.map(x => x.roll) };
  }

  // ── SHADOWDARK MAPS (pp. 130–131) ──────────────────────────────────────
  const SITE_SIZE = [[1, 2, { size: 'Small', dice: 5 }], [3, 5, { size: 'Medium', dice: 8 }], [6, 6, { size: 'Large', dice: 12 }]];
  const SITE_TYPE = [[1, 2, 'Cave'], [3, 3, 'Tomb'], [4, 4, 'Deep tunnels'], [5, 6, 'Ruins']];
  const ROOM_TYPE = [[1, 2, 'Empty'], [3, 3, 'Trap'], [4, 4, 'Minor hazard'], [5, 5, 'Solo monster'], [6, 6, 'NPC'], [7, 7, 'Monster mob'], [8, 8, 'Major hazard'], [9, 9, 'Treasure'], [10, 10, 'Boss monster']];
  const DUNGEON_DANGER = [[1, 3, 'Unsafe'], [4, 5, 'Risky'], [6, 6, 'Deadly']];
  // Two-column d6 tables (Trap, Monster mob, Solo monster): both Detail columns
  // share the printed row ranges; each column is rolled separately.
  const TRAP_A = [[1, 1, 'Crude'], [2, 2, 'Ranged'], [3, 4, 'Sturdy'], [5, 5, 'Ancient'], [6, 6, 'Large']];
  const TRAP_B = [[1, 1, 'Ensnaring'], [2, 2, 'Toxic'], [3, 4, 'Mechanical'], [5, 5, 'Magical'], [6, 6, 'Deadly']];
  const MOB_A = [[1, 1, 'Stealthy'], [2, 3, 'Reckless'], [4, 4, 'Magical'], [5, 5, 'Primitive'], [6, 6, 'Organized']];
  const MOB_B = [[1, 1, 'Outcasts'], [2, 3, 'Minions'], [4, 4, 'Tricksters'], [5, 5, 'Vermin'], [6, 6, 'Warriors']];
  const SOLO_A = [[1, 1, 'Sneaky'], [2, 3, 'Mighty'], [4, 5, 'Clever'], [6, 6, 'Mutated']];
  const SOLO_B = [[1, 1, 'Ambusher'], [2, 3, 'Brute'], [4, 5, 'Spellcaster'], [6, 6, 'Pariah']];
  const MINOR_HAZARD = [[1, 1, 'Short fall'], [2, 3, 'Stuck or locked barrier'], [4, 4, 'Dense rubble'], [5, 5, 'Collapsing walls'], [6, 6, 'Enfeebling magic']];
  const MAJOR_HAZARD = [[1, 2, 'Long fall'], [3, 3, 'Toxic gas or vapors'], [4, 4, 'Entrapping terrain'], [5, 5, 'Antimagic zone'], [6, 6, 'Drowning hazard']];
  const TREASURE_ROOM = [[1, 2, 'Hidden'], [3, 4, 'Guarded by monster'], [5, 5, 'Protected by trap'], [6, 6, 'Protected by hazard']];
  const NPC_ROOM = [[1, 1, 'Hiding'], [2, 3, 'Captive'], [4, 5, 'Wounded'], [6, 6, 'Rival crawlers']];
  const BOSS_ROOM = [[1, 1, 'Physically strongest'], [2, 2, 'Religious leader'], [3, 5, 'Guarded by minions'], [6, 6, 'Supreme sorcerer']];

  function roomDetail(type) {
    const one = t => rollBand(t, 1, 6).value;
    switch (type) {
      case 'Trap': return one(TRAP_A) + ', ' + one(TRAP_B).toLowerCase();
      case 'Monster mob': return one(MOB_A) + ' ' + one(MOB_B).toLowerCase();
      case 'Solo monster': return one(SOLO_A) + ' ' + one(SOLO_B).toLowerCase();
      case 'Minor hazard': return one(MINOR_HAZARD);
      case 'Major hazard': return one(MAJOR_HAZARD);
      case 'Treasure': return one(TREASURE_ROOM);
      case 'NPC': return one(NPC_ROOM);
      case 'Boss monster': return one(BOSS_ROOM);
      default: return '';
    }
  }
  // opts: { size: 'roll'|'Small'|'Medium'|'Large'|<number of d10s>, type: 'roll'|'Cave'|'Tomb'|'Deep tunnels'|'Ruins' }
  function dungeon(opts) {
    opts = opts || {};
    let size;
    if (typeof opts.size === 'number' && opts.size > 0) size = { size: opts.size + ' rooms', dice: opts.size, roll: null };
    else if (['Small', 'Medium', 'Large'].indexOf(opts.size) >= 0) size = Object.assign({ roll: null }, SITE_SIZE.find(x => x[2].size === opts.size)[2]);
    else { const r = rollBand(SITE_SIZE, 1, 6); size = Object.assign({ roll: r.roll }, r.value); }
    const typeR = (opts.type && opts.type !== 'roll') ? { roll: null, value: opts.type } : rollBand(SITE_TYPE, 1, 6);
    const danger = rollBand(DUNGEON_DANGER, 1, 6);
    const rooms = [];
    for (let i = 0; i < size.dice; i++) {
      const r = d(10), type = band(ROOM_TYPE, r);
      rooms.push({ n: i + 1, roll: r, type, detail: roomDetail(type), objective: false });
    }
    // The site's objective or boss monster is in the room with the highest room-type roll.
    let hi = -1, at = -1; rooms.forEach((rm, i) => { if (rm.roll > hi) { hi = rm.roll; at = i; } });
    if (at >= 0) rooms[at].objective = true;
    return { name: siteName().text, size: size.size, sizeRoll: size.roll, dice: size.dice, siteType: typeR.value, typeRoll: typeR.roll, danger: danger.value, dangerRoll: danger.roll, rooms };
  }

  // ── OVERLAND HEX MAPS (pp. 132–133) ────────────────────────────────────
  const HEX_STEPS = ['Desert/arctic', 'Swamp', 'Grassland', 'Forest/jungle', 'River/coast', 'Ocean', 'Mountain'];
  const HEX_TERRAIN = [[2, 2, 'Desert/arctic'], [3, 3, 'Swamp'], [4, 6, 'Grassland'], [7, 8, 'Forest/jungle'], [9, 10, 'River/coast'], [11, 11, 'Ocean'], [12, 12, 'Mountain']];
  const HEX_DANGER = [[1, 1, 'Safe'], [2, 3, 'Unsafe'], [4, 5, 'Risky'], [6, 6, 'Deadly']];
  const NEW_HEX = [[2, 3, 1], [4, 8, 0], [9, 11, 2], [12, 12, 'new']];
  const CATACLYSM = ['Volcano', 'Fire', 'Earthquake', 'Storm', 'Flood', 'War', 'Pestilence', 'Magical disaster'];
  const POI_LOC = [[1, 1, 'Small tower'], [2, 2, 'Fortified keep'], [3, 4, 'Natural landmark'], [5, 5, 'Temple'], [6, 6, 'Barrow mounds'], [7, 8, 'Village'], [9, 10, 'Town'], [11, 11, 'City/metropolis'], [12, 12, 'Ravine'], [13, 14, 'Monster nest'], [15, 15, "Hermit's abode"], [16, 17, 'Cave formation'], [18, 18, 'Ancient dolmens'], [19, 19, 'Barbarian camp'], [20, 20, 'Holy shrine']];
  const POI_DEV = [[1, 1, 'Disaster! Roll on Cataclysm table'], [2, 2, 'Over/connected to a large tomb'], [3, 4, 'Being attacked by an invader'], [5, 5, 'Home to an oracle'], [6, 6, 'Around/over a sleeping dragon'], [7, 8, 'Abandoned and in ruins'], [9, 10, 'Guarded by its current residents'], [11, 11, 'Under siege by a warband'], [12, 12, 'Home to a religious cult'], [13, 14, 'Where a secret circle of wizards meets'], [15, 15, 'Occupied by a self-titled king/queen'], [16, 17, 'Controlled by a malevolent sorcerer'], [18, 18, 'Protected by an age-old guardian'], [19, 19, 'Hiding a great treasure'], [20, 20, 'With a door to another plane']];
  const SETTLE_NAME = {
    Village: ["Bruga's Hold", 'Lastwatch', 'Darkwater', 'Ostlin', 'Treefall', 'Vorn', 'Hillshire', 'Nighthaven'],
    Town: ['Fairhollow', "Ivan's Keep", 'Galina', 'Brightlantern', "Corvin's Crest", 'Ironbridge', 'Skalvin', 'Toresk'],
    City: ['Doraine', 'Meridia', "King's Gate", 'Myrkhos', 'Rularn', 'Ordos', 'Thane', 'Rahgbat'],
  };
  function settlementName(kind) {
    const col = /village/i.test(kind) ? 'Village' : /town/i.test(kind) ? 'Town' : 'City';
    return rollList(SETTLE_NAME[col]).value;
  }
  function pointOfInterest() {
    const loc = rollBand(POI_LOC, 1, 20), dev = rollBand(POI_DEV, 1, 20);
    const out = { location: loc.value, development: dev.value, locRoll: loc.roll, devRoll: dev.roll };
    if (dev.roll === 1) { const c = rollList(CATACLYSM); out.cataclysm = c.value; out.cataclysmRoll = c.roll; }
    if (/^(Village|Town|City\/metropolis)$/.test(loc.value)) out.name = settlementName(loc.value);
    return out;
  }
  function hexDetails(terrain) {
    const dg = rollBand(HEX_DANGER, 1, 6);
    const poiRoll = d(6);
    return { terrain, danger: dg.value, dangerRoll: dg.roll, poiRoll, poi: poiRoll === 1 ? pointOfInterest() : null };
  }
  function startHex(terrain) {
    const t = (terrain && HEX_STEPS.indexOf(terrain) >= 0) ? { roll: null, value: terrain } : rollBand(HEX_TERRAIN, 2, 6);
    return Object.assign(hexDetails(t.value), { terrainRoll: t.roll });
  }
  // Roll the next hex from the current terrain. Steps loop circularly.
  function newHex(current) {
    const r = nd(2, 6), step = band(NEW_HEX, r);
    let terrain, how;
    if (step === 'new') { const t = rollBand(HEX_TERRAIN, 2, 6); terrain = t.value; how = 'new terrain (' + t.roll + ')'; }
    else {
      const i = HEX_STEPS.indexOf(current); terrain = HEX_STEPS[((i < 0 ? 0 : i) + step) % HEX_STEPS.length];
      how = step === 0 ? 'same terrain' : 'current terrain +' + step + ' step' + (step > 1 ? 's' : '');
    }
    return Object.assign(hexDetails(terrain), { newHexRoll: r, how });
  }
  function hexCrawl(start, count) {
    const first = startHex(start), out = [first];
    let cur = first.terrain;
    for (let i = 1; i < (count || 1); i++) { const h = newHex(cur); out.push(h); cur = h.terrain; }
    return out;
  }

  // ── SETTLEMENT MAPS (pp. 134–135) ──────────────────────────────────────
  const SETTLE_TYPE = [[1, 1, { type: 'Village', k: 3, n: 4 }], [2, 3, { type: 'Town', k: 4, n: 4 }], [4, 5, { type: 'City', k: 6, n: 6 }], [6, 6, { type: 'Metropolis', k: 8, n: 8 }]];
  const DISTRICTS = ['Slums', 'Low district', 'Artisan district', 'Market', 'High District', 'Temple district', 'University district', 'Castle district'];
  const DISTRICT_POI = {
    'Slums': [[1, 1, 'Seedy flophouse'], [2, 3, 'Poor tavern'], [4, 4, 'Criminal safehouse'], [5, 5, 'Poor shop'], [6, 6, "Witch/warlock's hovel"]],
    'Low district': [[1, 1, 'Graveyard'], [2, 3, 'Poor tavern'], [4, 4, 'Poor shop'], [5, 5, 'Standard shop'], [6, 6, 'Warehouses/sheds']],
    'Artisan district': [[1, 1, 'Stocks and pillories'], [2, 3, 'Modest temple'], [4, 5, 'Standard tavern'], [6, 6, 'Wealthy shop']],
    'Market': [[1, 1, 'Fortune teller'], [2, 4, 'Rare and exotic goods'], [5, 5, 'Apothecary'], [6, 6, 'Illicit black market']],
    'High District': [[1, 1, 'Guildhouse'], [2, 3, 'Wealthy tavern'], [4, 4, 'Manor house'], [5, 5, 'Wealthy shop'], [6, 6, 'City Watch outpost']],
    'Temple district': [[1, 1, 'Ruined temple'], [2, 3, "Minor deity's chapel"], [4, 4, 'Forbidden shrine'], [5, 5, "Major god's temple"], [6, 6, 'Revered holy site']],
    'University district': [[1, 1, 'Library'], [2, 3, 'Lecture hall'], [4, 5, 'Standard tavern'], [6, 6, "Wizard's tower"]],
    'Castle district': [[1, 1, 'Royal bathhouse'], [2, 3, "City Watch's garrison"], [4, 5, 'Theater or coliseum'], [6, 6, 'Royal castle']],
  };
  const ALIGNMENT = [[1, 3, 'Lawful'], [4, 5, 'Neutral'], [6, 6, 'Chaotic']];
  // kind: 'roll' | 'Village' | 'Town' | 'City' | 'Metropolis'; perDistrictAlignment: bool
  function settlement(kind, perDistrictAlignment) {
    const preset = SETTLE_TYPE.find(x => x[2].type === kind);
    const t = preset ? { roll: null, value: preset[2] } : rollBand(SETTLE_TYPE, 1, 6);
    const s = t.value, al = rollBand(ALIGNMENT, 1, 6);
    const districts = [];
    for (let i = 0; i < s.k; i++) {
      const r = d(s.n), name = DISTRICTS[r - 1], nPoi = d(4), poi = [];
      for (let j = 0; j < nPoi; j++) poi.push(rollBand(DISTRICT_POI[name], 1, 6).value);
      const dist = { roll: r, district: name, poi, seat: false };
      if (perDistrictAlignment) dist.alignment = rollBand(ALIGNMENT, 1, 6).value;
      districts.push(dist);
    }
    // Seat of government: the district with the highest roll.
    let hi = -1, at = -1; districts.forEach((x, i) => { if (x.roll > hi) { hi = x.roll; at = i; } });
    if (at >= 0) districts[at].seat = true;
    return { type: s.type, typeRoll: t.roll, dice: s.k + 'd' + s.n, name: settlementName(s.type), alignment: al.value, alignmentRoll: al.roll, districts };
  }

  // ── LIGHT MISHAPS (p. 110) ─────────────────────────────────────────────
  const LIGHT_MISHAPS = [
    'Dud. The light source (even a magical one) goes out and needs to be replaced or recast.',
    'Fire. The light source (even a magical one) flares and burns your hand. Take 1 damage. DC 18 DEX or drop it.',
    'Air. A rogue wind or pocket of thin air blows through. DC 15 DEX or the flames go out.',
    'Water. A sudden rain shower or dripping ceiling hits the light source. DC 15 DEX or the flames go out.',
    'Earth. Falling rocks, mud, leaves, or ash cover the light source. DC 12 DEX to protect it.',
    'Spark. If the light source is open flame, it sparks and catches on 1d4 flammable objects within close. DC 12 DEX to extinguish each one.',
  ];
  function lightMishap() { const r = rollList(LIGHT_MISHAPS); return { roll: r.roll, text: r.value }; }

  // ── UNIQUE FEATURE (mundane items, p. 278) ─────────────────────────────
  const UNIQUE_FEATURE = ['Forgery', 'Misshapen', 'Poorly constructed', 'Blemished', 'Worn smooth', 'Sparkling clean', 'Bite marks', 'Burned', 'Dusty', 'Caked with dry mud', 'Rare artist mark', 'Repaired', 'Chipped', 'Specks of dried blood', 'Unusual material', 'Fragile', 'Rusted/rotted', 'Painted upon', 'Carved with initials', 'Historic/famous'];
  function uniqueFeature() { return rollList(UNIQUE_FEATURE).value; }

  // ── RANDOM MAGIC ITEM (pp. 282–295) ────────────────────────────────────
  const MI_TYPE = ['Armor', 'Potion', 'Scroll', 'Utility', 'Wand', 'Weapon'];
  // Qualities 2d6 → number of benefits / curses
  const MI_QUALITIES = [[2, 3, { b: 0, c: 1 }], [4, 7, { b: 1, c: 1 }], [8, 11, { b: 1, c: 0 }], [12, 12, { b: 2, c: 0 }]];
  // Personality 2d6 → virtues / flaws (none on 4–9)
  const MI_PERSONALITY = [[2, 3, { v: 0, f: 1 }], [4, 9, { v: 0, f: 0 }], [10, 11, { v: 1, f: 1 }], [12, 12, { v: 1, f: 0 }]];
  const MI_IDEA_1 = ['The Crimson', 'The Ashen', "Ortival's", 'The Doom', 'The Twilight', 'The Astral', "Krull's", 'The Vicious', "Memnon's", 'The Blessed', 'The Infernal', "Madeera's", 'The Whispering', 'The Unholy', "Shune's", 'The Lost', "Ord's", 'The Righteous', 'The Demonic', 'The Primordial'];
  const MI_IDEA_2 = ['Blade', 'Poultice', 'Rite', 'Axe', 'Hammer', 'Wand', 'Cape', 'Tome', 'Litany', 'Staff', 'Scroll', 'Skull', 'Bow', 'Sword', 'Shield', 'Dagger', 'Armor', 'Orb', 'Eye', 'Elixir'];
  const MI_IDEA_3 = ['of Thundering Death', 'of Ages', 'of the Archmage', 'of Destruction', 'of Brak', 'of Power', 'of the Covenant', 'of the Wilds', 'of the Horde', 'of Blood', 'of Time', 'of the Lich Queen', 'of the Elders', 'of Madness', 'of Withering', 'of Annihilation', 'of the Dragon', 'of the Risen', 'of Elemental Fury', 'of the Spirits'];
  function itemIdeaName() { return rollList(MI_IDEA_1).value + ' ' + rollList(MI_IDEA_2).value + ' ' + rollList(MI_IDEA_3).value; }

  // Armor (pp. 284–285)
  const ARMOR_TYPE = [[2, 5, 'Leather'], [6, 7, 'Chainmail'], [8, 9, 'Shield'], [10, 11, 'Plate mail'], [12, 12, 'Mithral + reroll']];
  const ARMOR_BONUS = [[2, 5, 0], [6, 8, 1], [9, 11, 2], [12, 12, 3]];
  const ARMOR_FEATURE = ['Demonic horned face', 'Oak leaf motif', 'Studded with shark teeth', 'Dragon scales', 'Bone or metal spikes', 'Faint arcane runes', 'Turtle shell plating', 'Made of scorpion chitin', 'Gilded metal/gold thread', 'Scorched, smells burned', 'Pearl-white fish scales', 'Oozes blood', 'Festooned with fungi', 'Distant sound of ocean', 'Set with crystals', 'Draped in holy symbols', 'Exudes tree sap', 'Blurry, indistinct edges', 'Large golden cat eye', 'Covered in frost'];
  const ARMOR_BENEFIT = ['Once per day, deflect a ranged attack that would hit you', 'Checks to stabilize you are easy (DC 9)', 'You cannot be knocked over while you are conscious', 'Undetected creatures do not have advantage to attack you', 'You know Diabolic and are immune to fire, lava, and magma', 'You are immune to the curses of one item you choose', 'Once per day, gain advantage on all attacks for 3 rounds', 'You have a +4 bonus to your death timers', 'Gain immunity to a poison after suffering its effects once', 'You know Celestial and can fly for 3 rounds once per day', 'Treat critical hits against you as normal hits', 'Ignore any damage dealt to you of 3 points or below'];
  const ARMOR_CURSE = ['You take 2d10 damage if you remove this armor', 'Your party cannot add CHA bonuses to reaction checks', 'Mounts fear you and will not allow you to ride them', 'DC 15 WIS first round of combat or attack nearest creature', 'You take double damage from blunt/bludgeoning weapons', 'Armor uses 5 gear slots and is extremely loud and clunky', 'Ranged attacks against you have advantage', 'Treat a natural 1 attack roll against you as a critical hit', 'Beneficial spells that target you are hard to cast (DC 15)', 'You have disadvantage on Dexterity checks', "There's a secret 1-in-6 chance each NPC ally will betray you", 'You take double damage from silvered weapons'];
  // Potions (pp. 286–287)
  const POTION_F1 = ['Spicy', 'Clear as water', 'Deep blue', 'Citrus smell', 'Sulfurous', 'Fizzy', 'Chilly', 'Blood red'];
  const POTION_F2 = ['Pickled spider inside', 'Green fumes', 'Tiny stars and moon', 'Gold flakes in liquid', 'Swirling vortex', 'Quiet whistling', 'Rattles and shakes', 'Eyeball inside'];
  const POTION_F3 = ['Bubbling', 'Purple streaks', 'Flames on surface', 'Floral smell', 'Skull on bottle', 'Warm', 'Large molar inside', 'Pink starbursts'];
  const POTION_BENEFIT = ['Immune 5 rounds, 1d4: 1. fire, 2. cold, 3. electricity, 4. poison', 'Heals, 1d4: 1. 1d4, 2. 2d6, 3. 3d8, 4. 4d10', 'Read the minds of all creatures within near for 1 hour', 'Fly a near distance for 5 rounds', 'For 5 rounds, move far on your turn and still take an action', 'Become invisible for 5 rounds', 'Breathe underwater and know Merran language for 1 hour', 'A stat becomes 18 (+4) for 5 rounds', 'Turn into purple, flying gas for 5 rounds', 'Cures any disease or affliction affecting drinker', 'Speak to and understand animals for 1 hour', 'You are immune to all damage for 5 rounds'];
  const POTION_CURSE = ['DC 15 WIS check or attack nearest creature for 3 rounds', 'Turn into a 1 HP newt for 3 rounds', 'A stat becomes 3 (-4) for 1 hour', 'DC 15 CON check or take 2d10 damage', 'Forget all languages you know for 1 hour', 'Shrink to half size and disadvantage on attacks for 5 rounds', 'Sing at the top of your lungs for 3 rounds', 'You become magnetic to all metal near to you for 1 hour', 'You are compelled to jump into any pits you see for 1 hour', 'DC 15 CON check or go blind for 5 rounds', 'You are the source of an antimagic shell spell for 1 hour', 'Two limbs petrify for 5 rounds, 1d4: 1-2. arms, 3-4. legs'];
  // Scrolls and wands (pp. 288–289)
  const SCROLL_FEATURE = ['Branded on leather', 'Etched on copper leaf', 'Faded papyrus', 'Stained parchment roll', 'Carved into bone', 'Chiseled on stone slats', 'Etched into glass', 'Tattooed on dragon skin'];
  const WAND_FEATURE = ['Carved from bone', 'Blinking eye in handle', 'Sleek starmetal', 'Polished wood', 'Obsidian with ivory tips', 'Electrical sparks', 'Jagged crystal', 'Made of tiny skulls'];
  const SW_QUALITY_TABLES = [[2, 6, 'Armor'], [7, 8, 'Potion'], [9, 11, 'Utility'], [12, 12, 'Weapon']];
  const SPELL_TIER = [[2, 5, 1], [6, 7, 2], [8, 9, 3], [10, 11, 4], [12, 12, 5]];
  const SPELLS_BY_TIER = {
    1: ['Alarm', 'Burning hands', 'Charm person', 'Detect magic', 'Feather fall', 'Floating disk', 'Hold portal', 'Light', 'Mage armor', 'Magic missile', 'Protection from evil', 'Sleep'],
    2: ['Acid arrow', 'Alter self', 'Detect thoughts', 'Fixed object', 'Hold person', 'Invisibility', 'Knock', 'Levitate', 'Mirror image', 'Misty step', 'Silence', 'Web'],
    3: ['Animate dead', 'Dispel magic', 'Fabricate', 'Fireball', 'Fly', 'Gaseous form', 'Illusion', 'Lightning bolt', 'Magic circle', 'Protection from energy', 'Sending', 'Speak with dead'],
    4: ['Arcane eye', 'Cloudkill', 'Confusion', 'Control water', 'Dimension door', 'Divination', 'Passwall', 'Polymorph', 'Resilient sphere', 'Stoneskin', 'Telekinesis', 'Wall of force'],
    5: ['Antimagic shell', 'Create undead', 'Disintegrate', 'Hold monster', 'Plane shift', 'Power word kill', 'Prismatic orb', 'Scrying', 'Shapechange', 'Summon extraplanar', 'Teleport', 'Wish'],
  };
  // Utility (pp. 290–291)
  const UTILITY_TYPE = ['Brooch', 'Ring', 'Boots', 'Cloak', 'Amulet', 'Flask', 'Tome', 'Circlet', 'Eyepatch', 'Gauntlets', 'Holy symbol', 'Hat', 'Goblet', 'Helm', 'Statuette', 'Goggles', 'Bag', 'Rock', 'Surcoat', 'Mask'];
  const UTILITY_FEATURE = ['Shaped like a raven', 'Iridescent', 'Cruel spikes and spines', 'Made from a big frog', 'Gem-studded', 'Gold thread/hardware', 'Made of basilisk hide', 'Possessed by a spirit', 'Made of shaped smoke', 'Covered in small thorns', 'Made with rare feathers', 'Has tiny wings', 'Slowly changes colors', 'Shaped like a bat', 'Tarnished silver hardware', 'Made of spidersilk', 'Hums quiet, sweet tones', 'Jolt of pain at first touch', 'Throbs like a heart', 'Trails faint mist'];
  const UTILITY_BENEFIT = ["You can't be magically scryed upon or detected", 'Connects to an interdimensional pocket with 5 gear slots', 'A stat becomes 18 (+4) while using/wearing item', 'Once per day, teleport a near distance', 'Harmful spells that target you are DC 15 to cast', "You're immune to 1d4: 1. fire, 2. cold, 3. electricity, 4. poison", "Sense secret doors when they're within close range", 'You can see invisible and incorporeal creatures', "Your movement isn't hindered by any terrain", 'You can hold your breath for 1 hour', 'You do not need to eat or drink to survive', 'You can walk on non-solid surfaces for 2 rounds at a time'];
  const UTILITY_CURSE = ['Slowly rots all other non-magical items that touch it', 'Deals 1d4 damage and leaves blisters whenever used', 'Item attracts bad weather to its location', 'You cannot be healed by magic; only by resting', 'Crashes like a gong whenever wielder slays a creature', 'Item attracts all undead within a far distance', 'Temporarily loses magic if doused in water', 'You have disadvantage on CON checks', 'You are compelled to light parchment objects on fire', 'You must drink blood once a day or take 1d8 damage', 'Item must eat 1d10 gp a day or it loses its magic until fed', 'Item has horrid smell that makes all your CHA checks hard'];
  // Weapons (pp. 292–293)
  const WEAPON_TYPE = [[1, 1, 'Arrows (2d6)'], [2, 3, 'Bastard sword'], [4, 4, 'Club'], [5, 5, 'Crossbow'], [6, 6, 'Crossbow bolts (2d6)'], [7, 8, 'Dagger'], [9, 9, 'Greataxe'], [10, 10, 'Greatsword'], [11, 11, 'Javelin'], [12, 12, 'Longbow'], [13, 14, 'Longsword'], [15, 15, 'Mace'], [16, 16, 'Shortbow'], [17, 18, 'Shortsword'], [19, 19, 'Staff'], [20, 20, 'Warhammer']];
  const WEAPON_BONUS = [[2, 3, 0], [4, 9, 1], [10, 11, 2], [12, 12, 3]];
  const WEAPON_FEATURE = ['Trails sparkles', 'Starmetal', 'Rusted and chipped', 'Gem in pommel/handle', 'Drips green ichor', 'Moon motif and silvered', 'Galaxies swirl on surface', 'Ironwood', 'Rune-scribed', 'Faint, ghostly aura', 'Inlaid with gold', 'Trails incense', 'Studded with gemstones', 'Sparks dance on surface', 'Shaped like an animal', 'Carved from granite', 'Dragonbone hardware', 'Whispers in a language', 'Drips ocean water', 'Turns blood to rose petals'];
  const WEAPON_BENEFIT = ['Cut or smash through any material', 'Once per day, ignites for 5 rounds, deals 1d4 extra damage', 'DC 15 CHA check to command a wild animal within far', 'Behead the enemy on a critical hit', 'When you hit a creature, learn its True Name (see pg. 319)', 'Shoot a bolt of energy near with DEX, 1d6 damage', 'Once per day, deflect a melee attack that would hit you', 'Regain 1d6 hit points when you slay a creature', 'You have advantage on initiative rolls', 'Has thrown property (pg. 37), near distance, returns to you', 'Double damage to 1d4: 1-2. undead, 3. demons, 4. dragons', 'Reroll natural 1s once each when attacking with this weapon'];
  const WEAPON_CURSE = ["You can't see 1d4: 1. undead, 2. demons, 3. snakes, 4. spiders", 'You are compelled to swallow all gemstones at first sight', 'Burn a straw doll daily or weapon temporarily loses magic', 'Any light source you hold immediately extinguishes', 'You must loudly praise a god whenever you see its symbol', 'Venomous creatures always target you with attacks', 'You turn into a rat every day at midnight for one hour', 'Your checks to swim are always extreme (DC 18)', 'You are burned by the touch of gold', 'Bathe weapon in blood daily or it temporarily loses its magic', 'You cannot wear armor while wielding this weapon', 'Weapon can possess you by winning contested CHA (+2)'];
  // Item personality (pp. 294–295)
  const ITEM_VIRTUE = ['Insists on protecting people and creatures it likes', 'Warns its wielder if it senses impending danger', 'Gladly translates Primordial for its wielder', 'Senses hiding creatures within near, but not exact place', 'Owed a favor by a 1d4: 1-2. unicorn, 3. dragon, 4. noble', 'Commands the respect of the followers of a god', 'Occasionally remembers useful ancient history', 'Imparts pleasant dreams and good sleep to its wielder', 'Coaches its wielder on the right things to say in a situation', 'Sometimes provides helpful strategic advice', 'Occasionally notices important details others have missed', 'Tries to mediate disagreements between conscious items', 'Calming presence to 1d4: 1. dogs, 2. horses, 3. cats, 4. birds', 'Has an extremely acute sense of smell', 'Knows the direction of the nearest running water', 'Lawful, intimidating to chaotic creatures', 'Neutral, intimidating to lawful and chaotic creatures', 'Chaotic, intimidating to lawful creatures', "Has legitimate prophecies but isn't sure of their meaning", 'Can undo a great 1d4: 1. evil, 2. lie, 3. spell, 4. alliance'];
  const ITEM_FLAW = ['Afraid of 1d4: 1. the dark, 2. vermin, 3. heights, 4. water', 'Preferred a past owner and always draws comparisons', 'Chatters while wielder is trying to concentrate', 'Dislikes 1d4: 1. elves, 2. dwarves, 3. humans, 4. goblins', 'Tries to get wielder into fights so it "has something to do"', 'Does not want to be separated from wielder for any reason', 'Objects to 1d4: 1. gambling, 2. carousing, 3. stealth, 4. theft', 'Accuses everyone of lying; is correct once in a while', "Won't harm 1d4: 1-2. lawful, 3. neutral, 4. chaotic creatures", 'Believes its wielder is a pawn in its apocalyptic scheme', 'Constantly tries to escape its current wielder', "Demands its wielder observe its god's strict rituals", 'Insists on being reunited with its creator, living or dead', "Can't stand other conscious magic items", 'Refuses to be used for "unimportant" or "boring" tasks', 'Purposefully goes magically inert when mad at its wielder', 'Insists on being meticulously cleaned every day', 'Loves the color purple and despises all other colors', 'Objects to 1d4: 1. negotiating, 2-3. fighting, 4. planning', "Pretends to know information it doesn't know"];
  const TRAIT_GRID = [['Imperious', 'Polite', 'Puritanical', 'Charming'], ['Anxious', 'Righteous', 'Critical', 'Theatrical'], ['Bossy', 'Noble', 'Greedy', 'Protective'], ['Impulsive', 'Brave', 'Vicious', 'Loyal']];

  const QUALITY_TABLES = {
    Armor: { benefit: ARMOR_BENEFIT, curse: ARMOR_CURSE },
    Potion: { benefit: POTION_BENEFIT, curse: POTION_CURSE },
    Utility: { benefit: UTILITY_BENEFIT, curse: UTILITY_CURSE },
    Weapon: { benefit: WEAPON_BENEFIT, curse: WEAPON_CURSE },
  };
  // Roll `n` distinct entries from a d12 list, resolving inline sub-rolls.
  function distinct(list, n) {
    const out = [], seen = new Set();
    while (out.length < n && seen.size < list.length) { const r = d(list.length); if (seen.has(r)) continue; seen.add(r); out.push(resolveSub(list[r - 1])); }
    return out;
  }

  // type: 'random' | 'Armor' | 'Potion' | 'Scroll' | 'Utility' | 'Wand' | 'Weapon'
  // Returns { type, name, base, bonus, feature, benefits[], curses[], spell, tier,
  //           personality: { virtues[], flaws[], trait } | null, ideaName, summary }
  function magicItem(type) {
    const t = MI_TYPE.indexOf(type) >= 0 ? type : MI_TYPE[d(6) - 1];
    const q = band(MI_QUALITIES, nd(2, 6));
    const out = { type: t, bonus: null, base: '', feature: '', benefits: [], curses: [], spell: '', tier: null, personality: null };
    let qt = QUALITY_TABLES[t];
    if (t === 'Armor') {
      let base = band(ARMOR_TYPE, nd(2, 6)), mithral = false;
      while (base === 'Mithral + reroll') { mithral = true; base = band(ARMOR_TYPE, nd(2, 6)); }
      out.base = (mithral ? 'Mithral ' + base.toLowerCase() : base);
      out.bonus = band(ARMOR_BONUS, nd(2, 6));
      out.feature = rollList(ARMOR_FEATURE).value;
    } else if (t === 'Weapon') {
      out.base = band(WEAPON_TYPE, d(20));
      out.bonus = band(WEAPON_BONUS, nd(2, 6));
      out.feature = rollList(WEAPON_FEATURE).value;
    } else if (t === 'Potion') {
      out.base = 'Potion';
      out.feature = [rollList(POTION_F1).value, rollList(POTION_F2).value, rollList(POTION_F3).value].join(', ').toLowerCase();
      out.feature = out.feature.charAt(0).toUpperCase() + out.feature.slice(1);
    } else if (t === 'Utility') {
      out.base = rollList(UTILITY_TYPE).value;
      out.feature = rollList(UTILITY_FEATURE).value;
    } else { // Scroll / Wand
      out.tier = band(SPELL_TIER, nd(2, 6));
      out.spell = rollList(SPELLS_BY_TIER[out.tier]).value;
      out.base = (t === 'Scroll' ? 'Spell scroll' : 'Magic wand') + ' (' + out.spell + ', tier ' + out.tier + ')';
      out.feature = rollList(t === 'Scroll' ? SCROLL_FEATURE : WAND_FEATURE).value;
      qt = QUALITY_TABLES[band(SW_QUALITY_TABLES, nd(2, 6))];
    }
    out.benefits = distinct(qt.benefit, q.b);
    out.curses = distinct(qt.curse, q.c);
    const p = band(MI_PERSONALITY, nd(2, 6));
    if (p.v || p.f) {
      out.personality = {
        virtues: distinct(ITEM_VIRTUE, p.v), flaws: distinct(ITEM_FLAW, p.f),
        trait: TRAIT_GRID[d(4) - 1][d(4) - 1], alignment: 'GM decides',
      };
    }
    out.ideaName = itemIdeaName();
    const bonusTxt = out.bonus != null ? '+' + out.bonus + ' ' : '';
    out.name = bonusTxt + out.base;
    const parts = [];
    if (out.feature) parts.push('Look: ' + out.feature);
    out.benefits.forEach(b => parts.push('Benefit: ' + b));
    out.curses.forEach(c => parts.push('Curse: ' + c));
    if (out.personality) {
      const pp = out.personality;
      parts.push('Personality (' + pp.trait + ')' + (pp.virtues.length ? ' — virtue: ' + pp.virtues.join('; ') : '') + (pp.flaws.length ? ' — flaw: ' + pp.flaws.join('; ') : ''));
    }
    out.summary = parts.join(' · ');
    return out;
  }

  root.SDBookGen = {
    adventure, siteName, dungeon, hexCrawl, startHex, newHex, pointOfInterest, settlement, settlementName,
    lightMishap, uniqueFeature, magicItem, itemIdeaName,
    // exposed for tests / option lists
    tables: { HEX_STEPS, SITE_TYPE: SITE_TYPE.map(x => x[2]), DISTRICTS, MI_TYPE },
  };
})(typeof window !== 'undefined' ? window : globalThis);
