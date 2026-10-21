// Dragonbane — GM Screen tool suite.
//
// Game Master tools for the GM Screen's Generators window, driven by the
// window's Roll button (window.dbGenPanel) and by each panel's own buttons:
//   dbnpc        NPC generator — the book's six-die NPC table (attitude, kin,
//                motivation, profession, trait, name) + a typical stat block.
//   dbadventure  Adventure generator — the Quest, Journey and Adventure Site
//                tables (one die of each type, read as a sentence).
//   dbjourney    Journey helper — pathfinder BUSHCRAFT per shift (map / spyglass
//                / terrain), journey mishaps (D12), hunting (D6), fishing,
//                foraging, cold and making camp.
//   dbfear       Fear attack — WIL roll, then the Fear table (D8) on a failure.
//   dbinjury     Severe injury — CON roll, then the D20 table + healing time.
//   dbmishap     Magical mishap (D20) for a Demon on a spell.
//   dbdemon      Weapon Demons — melee / ranged mishap (D6).
//   dbtrap       Typical traps (with damage rolled).
//   dbleaving    Leaving the adventure site (D6).
//   dbattack     Monster-attack roller — D6 on a monster's attack table, never
//                the same attack twice in a row (a repeat becomes the next
//                entry, 6 becomes 1).
// The Combat Tracker's monster cards roll their attacks through the same
// window.DB_GM.attack() so the no-repeat memory is shared across the screen.
//
// Numbers and table entries come from /tools-data/db-data.js (window.DB_*),
// a paraphrased data layer. Every DB_* read is guarded — the GM Screen serves
// only the linked system's data files, so these globals may be absent.
(function () {
  'use strict';
  var W = window;
  function G(k) { return (typeof W[k] !== 'undefined' && W[k]) ? W[k] : null; }
  function T(k) { var t = G('DB_GM_TABLES'); return t ? t[k] : null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function r(n) { return 1 + Math.floor(Math.random() * n); }
  function pick(a) { return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ''; }
  function num(x, d) { var n = parseInt(String(x == null ? '' : x).replace(/[^\d-]/g, ''), 10); return isNaN(n) ? (d == null ? 0 : d) : n; }

  // "2D6", "D3", "3D6+2" → { total, dice, text }. Dragonbane writes dice as D6 / 2D8.
  function dice(expr) {
    var m = /(\d*)\s*[dD]\s*(\d+)\s*([+\-−]\s*\d+)?/.exec(String(expr || ''));
    if (!m) return { total: 0, dice: [], text: String(expr || '') };
    var n = Math.max(1, Math.min(40, +(m[1] || 1))), s = +m[2], out = [];
    for (var i = 0; i < n; i++) out.push(r(s));
    var mod = m[3] ? parseInt(m[3].replace('−', '-').replace(/\s+/g, ''), 10) : 0;
    var tot = out.reduce(function (a, b) { return a + b; }, 0) + mod;
    return { total: tot, dice: out, text: (m[1] || '') + 'D' + s + (mod ? (mod > 0 ? '+' : '') + mod : '') + ' → ' + tot + (out.length > 1 ? ' (' + out.join('+') + ')' : '') };
  }
  // Roll every "D6" / "2D8" inside a line of text, keeping the expression:
  // "2D8 goblins and" → "2D8 (11) goblins and".
  // Left alone: dice the reader rolls later ("roll D4 each morning", "D6 per power level").
  function rollInline(s) {
    return String(s || '').replace(/\b(\d*)D(\d+)\b/g, function (all, n, d, at, str) {
      var before = str.slice(Math.max(0, at - 5), at), after = str.slice(at + all.length, at + all.length + 6);
      if (/roll\s$/i.test(before) || /^\s(per|each)\b/i.test(after)) return all;
      return all + ' (' + dice(all).total + ')';
    });
  }

  // ── Skill roll: D20 at or under the level. Boons and banes cancel one for
  // one; each net boon adds a die and keeps the lowest, each net bane adds a die
  // and keeps the highest. 1 = Dragon, 20 = Demon (never a success). ──
  function skill(level, net) {
    var lv = Math.max(1, Math.min(20, num(level, 10))), k = Math.max(-3, Math.min(3, num(net, 0)));
    var n = 1 + Math.abs(k), rolls = [];
    for (var i = 0; i < n; i++) rolls.push(r(20));
    var kept = k > 0 ? Math.min.apply(null, rolls) : k < 0 ? Math.max.apply(null, rolls) : rolls[0];
    var dragon = kept === 1, demon = kept === 20, ok = !demon && kept <= lv;
    return { level: lv, net: k, rolls: rolls, kept: kept, success: ok, dragon: dragon, demon: demon,
      word: dragon ? 'Dragon!' : demon ? 'Demon!' : ok ? 'Success' : 'Failure',
      detail: 'D20' + (n > 1 ? '×' + n + ' (' + rolls.join(', ') + ') keep ' + (k > 0 ? 'low' : 'high') + ' ' + kept : ' ' + kept) + ' vs ' + lv + (k > 0 ? ' · ' + k + ' boon' + (k > 1 ? 's' : '') : k < 0 ? ' · ' + (-k) + ' bane' + (k < -1 ? 's' : '') : '') };
  }
  function skillChip(s) {
    var cls = s.dragon ? 'db-dragon' : s.demon ? 'db-demon' : s.success ? 'db-ok' : 'db-bad';
    return '<span class="db-roll ' + cls + '">' + esc(s.word) + '</span> <span class="db-dim">' + esc(s.detail) + '</span>';
  }

  // Find the row a die result lands on (rows carry roll: n or roll: [lo, hi]).
  function rowFor(rows, v) {
    for (var i = 0; i < (rows || []).length; i++) {
      var x = rows[i].roll;
      if (Array.isArray(x) ? (v >= x[0] && v <= x[1]) : +x === v) return rows[i];
    }
    return null;
  }
  function rollRows(key) {
    var t = T(key); if (!t || !t.rows) return null;
    var sides = num(String(t.die || '').replace(/^D/i, ''), t.rows.length) || t.rows.length;
    var v = r(sides);
    return { table: t, roll: v, die: 'D' + sides, row: rowFor(t.rows, v) || t.rows[Math.min(t.rows.length - 1, v - 1)] };
  }
  // One die of each type on a column table (NPC, Quest, Journey, Site).
  function rollCols(key) {
    var t = T(key); if (!t || !t.columns) return null;
    return t.columns.map(function (c) { var sides = num(String(c.die).replace(/^D/i, ''), c.values.length); var v = r(sides); return { die: c.die, name: c.name, roll: v, value: c.values[Math.min(c.values.length, v) - 1] || '' }; });
  }

  // ── Card helpers (match the GM Screen's .gen-card look) ──
  function card(name, tag, body, extra) {
    return '<div class="gen-card db-gen-card' + (extra ? ' ' + extra : '') + '"><div class="gen-card-header"><span class="gen-card-name">' + esc(name) + '</span>'
      + (tag ? '<span class="gen-card-tag">' + esc(tag) + '</span>' : '') + '</div>' + (body || '') + '</div>';
  }
  function row(label, html) { return '<div class="gen-card-row"><span class="gen-card-row-label">' + esc(label) + '</span><span>' + html + '</span></div>'; }
  function hr() { return '<hr class="gen-card-divider">'; }
  function die(d, v) { return '<span class="db-die" title="' + esc(d) + '">' + esc(d) + ' ' + v + '</span>'; }
  function out(panel) { return panel && panel.querySelector('.db-out'); }
  function val(panel, sel, d) { var el = panel && panel.querySelector(sel); return el ? (el.type === 'checkbox' ? el.checked : el.value) : d; }
  function qty(panel) { var q = panel && panel.querySelector('.db-qty'); return q ? Math.max(1, Math.min(10, parseInt(q.value, 10) || 1)) : 1; }
  function missing(panel) { var o = out(panel); if (o) o.innerHTML = '<div class="gen-empty">The Dragonbane data did not load — open the GM Screen from a Dragonbane campaign.</div>'; }
  function put(panel, html, append) { var o = out(panel); if (!o) return; if (append) { [].slice.call(o.querySelectorAll(':scope > .gen-empty')).forEach(function (e) { e.remove(); }); o.insertAdjacentHTML('afterbegin', html); while (o.children.length > 12) o.removeChild(o.lastChild); } else o.innerHTML = html; }

  // ══ NPC (dbnpc) ══
  // Our own steer from the rolled profession to the closest typical NPC stat
  // block in the book (NPCs without a listed skill use 5).
  var PROF_STATS = { Bard: 'Villager', Artisan: 'Villager', Hunter: 'Hunter', Fighter: 'Adventurer', Scholar: 'Scholar', Mage: 'Scholar', Merchant: 'Villager', Knight: 'Guard', Mariner: 'Adventurer', Thief: 'Thief' };
  function npc() {
    var c = rollCols('npc'); if (!c) return null;
    var by = {}; c.forEach(function (x) { by[x.name.replace(/\s*\(.*\)$/, '')] = x; });
    var names = String((by.Name || {}).value || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var prof = (by.Profession || {}).value || '';
    var NP = G('DB_NPCS') || [];
    var stats = NP.filter(function (n) { return n.name === PROF_STATS[prof]; })[0] || null;
    return { cols: c, attitude: (by.Attitude || {}).value, kin: (by.Kin || {}).value, motivation: (by.Motivation || {}).value, profession: prof,
      trait: (by.Trait || {}).value, names: names, name: pick(names) || 'Stranger', stats: stats };
  }
  function npcStatLine(n) {
    if (!n) return '';
    var w = (n.weapons || []).map(function (x) { return x.name + ' ' + x.skill + ' (' + x.damage + ')'; }).join(', ');
    var sk = Object.keys(n.skills || {}).map(function (k) { return k + ' ' + n.skills[k]; }).join(', ');
    return '<b>' + esc(n.name) + '</b> — HP ' + n.hp + (n.wp ? ' · WP ' + n.wp : '') + (n.armor ? ' · Armor ' + n.armor.rating : '') + (n.damageBonus ? ' · +' + esc(Object.keys(n.damageBonus).map(function (k) { return n.damageBonus[k] + ' ' + k; }).join(', ')) : '')
      + (sk ? '<br><span class="db-dim">' + esc(sk) + '</span>' : '') + (w ? '<br><span class="db-dim">' + esc(w) + '</span>' : '');
  }
  function npcCard(n) {
    // Field names the GM Screen's Social station reader (npcObjToSocial) knows.
    var json = esc(JSON.stringify({ name: n.name, ancestry: n.kin, occupation: n.profession, demeanor: n.attitude, wants: n.motivation, quirk: n.trait }));
    return card(n.name, [n.kin, n.profession].filter(Boolean).join(' · '),
      row('Attitude', '<b>' + esc(n.attitude) + '</b>') + row('Motivation', esc(n.motivation)) + row('Trait', esc(n.trait))
      + row('Name', n.names.map(function (x) { return x === n.name ? '<b>' + esc(x) + '</b>' : esc(x); }).join(' · '))
      + (n.stats ? hr() + row('Stats as', npcStatLine(n.stats)) : '')
      + '<div class="db-dim" style="font-size:11px;margin-top:4px;">' + n.cols.map(function (x) { return x.die + ' ' + x.roll; }).join(' · ') + ' · skills not listed are 5</div>'
      + '<div class="gen-card-actions"><button class="btn small primary gen-send-social" title="Send this NPC to the Social station">Send to Social</button>'
      + (n.stats ? '<button class="btn small ghost gen-send-tracker" data-src="db" data-mon="' + esc(n.stats.name) + '" title="Add the matching typical NPC to the Combat Tracker">Stats → Tracker</button>' : '') + '</div>',
      '').replace('class="gen-card db-gen-card"', 'class="gen-card db-gen-card" data-npc="' + json + '"');
  }

  // ══ ADVENTURE (dbadventure) ══
  function sentence(cols, key) {
    var v = cols.map(function (c) { return c.value; });
    if (key === 'quest') return v[0] + ', the characters come across ' + v[1] + ' from/about/with ' + v[2] + ' who wants to ' + v[3] + ' a ' + v[4] + ' called ' + v[5] + '.';
    if (key === 'journey') return 'The journey is ' + v[0] + ', and ends ' + v[1] + '. There is ' + (/^[aeiou]/i.test(v[2]) ? 'an ' : 'a ') + v[2] + ' ' + v[3] + ' surrounded by ' + v[4] + '. The place is called ' + v[5] + '.';
    if (key === 'site') return 'The way in is ' + v[0] + '. There is ' + v[1] + ', but also unexpected guests in the form of ' + rollInline(v[2] + ' ' + v[3]) + '. There is a deadly challenge in the form of ' + v[4] + '. Finally, the player characters must defeat ' + v[5] + '.';
    return v.join(' ');
  }
  function adventure(key) {
    var c = rollCols(key); if (!c) return null;
    var t = sentence(c, key);
    return { key: key, cols: c, text: t.charAt(0).toUpperCase() + t.slice(1) };
  }
  var ADV_TITLE = { quest: 'The Quest', journey: 'The Journey', site: 'The Adventure Site' };
  function adventureCard(a) {
    return card(ADV_TITLE[a.key], 'D4 · D6 · D8 · D10 · D12 · D20',
      '<div class="db-tale">' + esc(a.text) + '</div>'
      + '<div class="db-cols">' + a.cols.map(function (c) { return '<div class="db-col">' + die(c.die, c.roll) + ' <span>' + esc(c.value) + '</span></div>'; }).join('') + '</div>');
  }

  // ══ JOURNEY (dbjourney) ══
  function mishap() { var x = rollRows('journeyMishaps'); return x ? { roll: x.roll, name: x.row.name, text: x.row.text } : null; }
  function mishapRow(m) { return m ? row('Mishap D12 ' + m.roll, '<b>' + esc(m.name) + '</b> — ' + esc(m.text)) : ''; }
  function journeyShift(o) {
    var J = G('DB_JOURNEY') || { pace: { foot: 15, mounted: 30 } };
    var km = o.mounted ? J.pace.mounted : J.pace.foot;
    if (!o.offroad) return { km: km, roll: null, text: 'On a road or path no pathfinder roll is needed.', mishap: null };
    var net = (o.map ? 0 : -1) + (o.spy ? 1 : 0) + (o.hard ? -1 : 0);
    var s = skill(o.skill, net), m = null, dist = km, note = '';
    if (s.dragon) { dist = km * 2; note = 'A shortcut — the distance covered is doubled.'; }
    else if (!s.success) { m = mishap(); note = 'The pathfinder fails: a mishap.'; if (m && /halves/i.test(m.text)) dist = km / 2; else if (m && /no progress/i.test(m.text)) dist = 0; }
    else note = 'The way is found.';
    return { km: dist, base: km, roll: s, text: note, mishap: m, net: net };
  }
  function journeyCard(o, n) {
    var h = '', total = 0;
    for (var i = 0; i < n; i++) {
      var sh = journeyShift(o); total += sh.km;
      h += row('Shift ' + (i + 1), (sh.roll ? skillChip(sh.roll) + '<br>' : '') + esc(sh.text) + ' <b>' + sh.km + ' km</b>' + (sh.km !== sh.base && sh.base ? ' <span class="db-dim">(of ' + sh.base + ')</span>' : ''));
      if (sh.mishap) h += mishapRow(sh.mishap);
    }
    if (n >= 3) h += row('Forced march', '<span class="db-warn">A third shift in a day makes everyone Exhausted.</span>');
    var mods = [o.offroad ? (o.map ? 'map' : 'no map: bane') : 'road', o.spy ? 'spyglass: boon' : '', o.hard ? 'very difficult terrain: bane' : '', o.mounted ? 'mounted 30 km' : 'on foot 15 km'].filter(Boolean).join(' · ');
    return card('Journey — ' + n + ' shift' + (n > 1 ? 's' : ''), 'BUSHCRAFT ' + num(o.skill, 10), h + hr() + row('Covered', '<b>' + total + ' km</b> <span class="db-dim">' + esc(mods) + '</span>')
      + '<div class="db-dim" style="font-size:11px;margin-top:4px;">Roll for a random encounter once per shift, or when it suits you.</div>');
  }
  function huntCard(o) {
    var s = skill(o.hunt, 0), h = row('Track', skillChip(s));
    if (s.success) {
      var x = rollRows('hunting');
      if (x) { var ra = String(x.row.rations || ''); var got = /D/i.test(ra) ? dice(ra).total : num(ra, 1);
        h += row('Game D6 ' + x.roll, '<b>' + esc(x.row.name) + '</b> — ' + esc(x.row.text) + '<br>Kill it with a second roll (weapon, or HUNTING &amp; FISHING with a trap): <b>' + got + '</b> ration' + (got === 1 ? '' : 's') + (/D/i.test(ra) ? ' <span class="db-dim">(' + esc(ra) + ')</span>' : '')); }
    } else h += row('Result', 'No game found this shift.');
    return card('Hunting', 'a shift, no progress', h);
  }
  function fishCard(o) {
    var s = skill(o.hunt, 0), net = o.gear === 'net', got = s.success ? r(net ? 6 : 4) : 0;
    return card('Fishing', net ? 'fishing net' : 'fishing rod', row('Roll', skillChip(s)) + row('Catch', s.success ? '<b>' + got + '</b> ration' + (got === 1 ? '' : 's') + ' <span class="db-dim">(' + (net ? 'D6' : 'D4') + ')</span>' : 'Nothing bites.'));
  }
  function forageCard(o) {
    var net = o.season === 'winter' ? -1 : o.season === 'autumn' ? 1 : 0;
    var s = skill(o.bush, net), got = s.success ? r(3) : 0;
    return card('Foraging', o.season === 'winter' ? 'winter: bane' : o.season === 'autumn' ? 'autumn: boon' : 'spring / summer', row('BUSHCRAFT', skillChip(s)) + row('Found', s.success ? '<b>' + got + '</b> ration' + (got === 1 ? '' : 's') + ' of plants <span class="db-dim">(D3)</span>' : 'Nothing edible.'));
  }
  function coldCard(o) {
    var net = o.cold === 'fur' ? 1 : o.cold === 'none' ? -1 : 0;
    var s = skill(o.bush, net), h = row('BUSHCRAFT', skillChip(s));
    if (!s.success) { var hp = r(6), wp = r(6); h += row('Cold', 'Lose <b>' + hp + ' HP</b> and <b>' + wp + ' WP</b>; no healing until warm. At zero HP the next failed roll kills.'); }
    else h += row('Cold', 'Withstands the cold this shift.');
    return card('Withstand cold', o.cold === 'fur' ? 'fur: boon' : o.cold === 'none' ? 'no blanket: bane' : 'blanket', h);
  }
  function campCard(o) {
    var net = (o.tent ? 1 : 0) + (o.pelt ? 0 : -1);
    var s = skill(o.bush, net);
    return card('Making camp', [o.tent ? 'tent: boon' : '', o.pelt ? '' : 'no sleeping pelt: bane'].filter(Boolean).join(' · ') || 'sleeping pelt',
      row('BUSHCRAFT', skillChip(s)) + row('Result', s.success ? (o.tent ? 'A good spot — everyone in the tent sleeps without rolling.' : 'A resting place is found.') : 'The shift counts neither as sleep nor as a shift rest.')
      + '<div class="db-dim" style="font-size:11px;margin-top:4px;">No camping in dangerous places (e.g. a dungeon full of enemies).</div>');
  }

  // ══ FEAR / INJURY / MISHAPS / TRAPS / LEAVING ══
  function fearCard(level) {
    var h = '', resisted = false;
    if (String(level || '').trim()) { var s = skill(level, 0); resisted = s.success; h += row('WIL roll', skillChip(s)); }
    if (resisted) return card('Fear attack', 'resisted', h + row('Result', 'The fear is shaken off.'));
    var x = rollRows('fear'); if (!x) return '';
    var t = esc(x.row.text);
    if (x.row.wpLoss) t += ' <span class="db-dim">(' + esc(dice(x.row.wpLoss).text) + ' WP)</span>';
    return card('Fear — ' + x.row.name, 'D8 ' + x.roll, h + row(x.row.name, t) + ((x.row.conditions || []).length ? row('Condition', '<b>' + esc(x.row.conditions.join(', ')) + '</b>') : ''));
  }
  function injuryCard(level) {
    var h = '';
    if (String(level || '').trim()) { var s = skill(level, 0); h += row('CON roll', skillChip(s)); if (s.success) return card('Severe injury', 'avoided', h + row('Result', 'No lasting injury.')); }
    var x = rollRows('severeInjuries'); if (!x) return '';
    var heal = x.row.heal ? esc(x.row.heal) + ' → <b>' + dice(x.row.heal).total + ' days</b>' : (x.row.permanent ? '<span class="db-warn">Permanent</span>' : '—');
    return card('Severe injury — ' + x.row.name, 'D20 ' + x.roll, h + row(x.row.name, esc(x.row.text)) + row('Healing', heal)
      + '<div class="db-dim" style="font-size:11px;margin-top:4px;">A shift of daily care from someone who passes a HEALING roll halves the time.</div>');
  }
  function plainTable(key, title) {
    var x = rollRows(key); if (!x) return '';
    return card(title + (x.row.name ? ' — ' + x.row.name : ''), x.die + ' ' + x.roll, row(x.row.name || 'Result', esc(rollInline(x.row.text))) + ((x.row.conditions || []).length ? row('Condition', '<b>' + esc(x.row.conditions.join(', ')) + '</b>') : ''));
  }
  function trapCard(name) {
    var t = T('traps'); if (!t) return '';
    var tr = name ? (t.rows.filter(function (x) { return x.name === name; })[0] || pick(t.rows)) : pick(t.rows);
    return card(tr.name, 'typical trap', row('Effect', esc(tr.text)) + (tr.damage ? row('Damage', esc(dice(tr.damage).text)) : '')
      + '<div class="db-dim" style="font-size:11px;margin-top:4px;">Spotting it in time: SPOT HIDDEN; disarming: SLEIGHT OF HAND (GM\'s call).</div>');
  }

  // ══ MONSTER ATTACKS (dbattack + tracker cards) ══
  // Last attack index per key (the combatant's name) so the same attack is
  // never rolled twice in a row anywhere on the screen.
  var LAST = W.__dbAtkLast || (W.__dbAtkLast = {});
  function ranges(m) {
    return (m.attacks || []).map(function (a, i) {
      if (Array.isArray(a.rolls)) return a.rolls;
      if (Array.isArray(m.attackRolls) && m.attackRolls[i]) return m.attackRolls[i];
      return [num(a.roll, i + 1), num(a.roll, i + 1)];
    });
  }
  // table: [{name, rolls:[lo,hi]}…] in order. Returns { roll, idx, bumped }.
  function attackIndex(table, key) {
    var v = r(6), idx = 0;
    for (var i = 0; i < table.length; i++) { var g = table[i].rolls || [table[i].roll, table[i].roll]; if (v >= g[0] && v <= g[1]) { idx = i; break; } }
    var bumped = false;
    if (key && LAST[key] === idx && table.length > 1) { idx = (idx + 1) % table.length; bumped = true; }
    if (key) LAST[key] = idx;
    return { roll: v, idx: idx, bumped: bumped };
  }
  function attack(m, key) {
    var rg = ranges(m), table = (m.attacks || []).map(function (a, i) { return { name: a.name, rolls: rg[i] }; });
    if (!table.length) return null;
    var k = attackIndex(table, key || m.name), a = m.attacks[k.idx];
    return { roll: k.roll, idx: k.idx, bumped: k.bumped, attack: a, damage: a.damage ? dice(a.damage) : null };
  }
  function attackFlags(a) {
    var f = [];
    if (a.fear) f.push('fear attack');
    if (a.damage && a.type) f.push(a.type);
    if (a.targets && a.targets !== 'one') f.push('targets ' + a.targets);
    if (a.range) f.push(a.range + ' m');
    f.push(a.dodge === false ? 'can’t be dodged' : 'can be dodged');
    if (a.parry) f.push('can be parried');
    if ((a.conditions || []).length) f.push(a.conditions.join(', '));
    if (a.prone) f.push('knocks prone');
    return f;
  }
  function attackCard(m, res) {
    var a = res.attack, g = ranges(m)[res.idx];
    var rl = g[0] === g[1] ? String(g[0]) : g[0] + '–' + g[1];
    return card(m.name + ' — ' + a.name, 'D6 ' + res.roll + (res.bumped ? ' → ' + rl : ''),
      (res.bumped ? '<div class="db-warn" style="font-size:11.5px;margin-bottom:4px;">Same attack as last time — moves on to the next entry.</div>' : '')
      + row('Attack', esc(a.text)) + (res.damage ? row('Damage', '<b>' + res.damage.total + '</b> <span class="db-dim">' + esc(res.damage.text) + '</span>') : '')
      + row('Notes', '<span class="db-dim">' + esc(attackFlags(a).join(' · ')) + '</span>')
      + (a.curses && a.curse ? row('Curse D6', esc(pick(a.curses))) : ''), 'db-atk-card');
  }

  // ══ Panel driver (window Roll button) ══
  function journeyOpts(panel) {
    return { skill: val(panel, '.dbj-skill', 12), map: !!val(panel, '.dbj-map', false), spy: !!val(panel, '.dbj-spy', false), hard: !!val(panel, '.dbj-hard', false),
      mounted: !!val(panel, '.dbj-mounted', false), offroad: !!val(panel, '.dbj-offroad', true), hunt: val(panel, '.dbj-hunt', 12), bush: val(panel, '.dbj-skill', 12),
      gear: val(panel, '.dbj-gear', 'rod'), season: val(panel, '.dbj-season', 'summer'), cold: val(panel, '.dbj-cold', 'blanket'),
      tent: !!val(panel, '.dbj-tent', false), pelt: !!val(panel, '.dbj-pelt', true) };
  }
  function monsters() { return G('DB_MONSTERS') || []; }
  W.dbGenPanel = function (panel) {
    if (!panel) return;
    var kind = panel.dataset.panel, o = out(panel);
    try {
      if (!G('DB_GM_TABLES')) return missing(panel);
      var i, h = '';
      if (kind === 'dbnpc') { for (i = 0; i < qty(panel); i++) { var n = npc(); if (n) h += npcCard(n); } return put(panel, h); }
      if (kind === 'dbadventure') {
        var k = val(panel, '.db-adv-kind', 'all');
        for (i = 0; i < qty(panel); i++) (k === 'all' ? ['quest', 'journey', 'site'] : [k]).forEach(function (kk) { var a = adventure(kk); if (a) h += adventureCard(a); });
        return put(panel, h);
      }
      if (kind === 'dbjourney') return put(panel, journeyCard(journeyOpts(panel), Math.max(1, Math.min(3, num(val(panel, '.dbj-shifts', 1), 1)))));
      if (kind === 'dbfear') { for (i = 0; i < qty(panel); i++) h += fearCard(val(panel, '.db-resist', '')); return put(panel, h); }
      if (kind === 'dbinjury') { for (i = 0; i < qty(panel); i++) h += injuryCard(val(panel, '.db-resist', '')); return put(panel, h); }
      if (kind === 'dbmishap') { for (i = 0; i < qty(panel); i++) h += plainTable('magicalMishaps', 'Magical mishap'); return put(panel, h); }
      if (kind === 'dbdemon') { var dk = val(panel, '.db-demon-kind', 'demonMelee'); for (i = 0; i < qty(panel); i++) h += plainTable(dk, dk === 'demonRanged' ? 'Demon — ranged' : 'Demon — melee'); return put(panel, h); }
      if (kind === 'dbtrap') { for (i = 0; i < qty(panel); i++) h += trapCard(val(panel, '.db-trap-kind', '')); return put(panel, h); }
      if (kind === 'dbleaving') { for (i = 0; i < qty(panel); i++) h += plainTable('leavingSite', 'Leaving the site'); return put(panel, h); }
      if (kind === 'dbattack') {
        var nm = val(panel, '.dbatk-mon', ''), m = monsters().filter(function (x) { return x.name === nm; })[0] || monsters()[0];
        if (!m) return missing(panel);
        var res = attack(m, 'gen:' + m.name);
        if (res) put(panel, attackCard(m, res), true);
        return;
      }
    } catch (e) { if (o) o.innerHTML = '<div class="gen-empty">Could not roll: ' + esc(e.message) + '</div>'; }
  };

  // Inline buttons inside the Dragonbane panels (delegated; panels are cloned per window).
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-db]');
    if (!b) return;
    var panel = b.closest('[data-panel]'); if (!panel) return;
    var a = b.getAttribute('data-db'), o = journeyOpts(panel);
    try {
      if (a === 'journey') return W.dbGenPanel(panel);
      if (a === 'mishap') { var m = mishap(); return put(panel, card('Journey mishap — ' + (m ? m.name : ''), 'D12 ' + (m ? m.roll : ''), mishapRow(m))); }
      if (a === 'hunt') return put(panel, huntCard(o));
      if (a === 'fish') return put(panel, fishCard(o));
      if (a === 'forage') return put(panel, forageCard(o));
      if (a === 'cold') return put(panel, coldCard(o));
      if (a === 'camp') return put(panel, campCard(o));
      if (a === 'atk-clear') { Object.keys(LAST).forEach(function (k) { if (k.indexOf('gen:') === 0) delete LAST[k]; }); var oo = out(panel); if (oo) oo.innerHTML = '<div class="gen-empty">Cleared — the next roll has no previous attack.</div>'; return; }
      if (a === 'atk-table') {
        var nm = val(panel, '.dbatk-mon', ''), mm = monsters().filter(function (x) { return x.name === nm; })[0] || monsters()[0]; if (!mm) return;
        var rg = ranges(mm);
        return put(panel, card(mm.name, 'Ferocity ' + mm.ferocity + ' · HP ' + mm.hp + (mm.armor ? ' · Armor ' + mm.armor : ''),
          mm.attacks.map(function (x, i) { var g = rg[i]; return row('D6 ' + (g[0] === g[1] ? g[0] : g[0] + '–' + g[1]) + ' · ' + x.name, esc(x.text)); }).join('')
          + (mm.traits || []).map(function (t) { return row(t.name, '<span class="db-dim">' + esc(t.text) + '</span>'); }).join('')));
      }
    } catch (err) { var ob = out(panel); if (ob) ob.innerHTML = '<div class="gen-empty">Could not roll: ' + esc(err.message) + '</div>'; }
  });
  // Fill the monster and trap pickers once the panels exist.
  W.dbPrimePanels = function (root) {
    var M = monsters(), TR = T('traps');
    (root || document).querySelectorAll('.dbatk-mon').forEach(function (s) { if (M.length && s.options.length <= 1) s.innerHTML = M.map(function (m) { return '<option>' + esc(m.name) + '</option>'; }).join(''); });
    (root || document).querySelectorAll('.db-trap-kind').forEach(function (s) { if (TR && s.options.length <= 1) s.insertAdjacentHTML('beforeend', TR.rows.map(function (t) { return '<option>' + esc(t.name) + '</option>'; }).join('')); });
  };

  // Valuables without practical use — the book treats them as coins whose worth
  // the players simply know. A short list of our own for the treasure drop and
  // the prep builder's treasure picker (the book's treasure cards are not in the
  // app; build hauls from coins, valuables and gear instead).
  var VALUABLES = [
    { name: 'Silver ring', value: '1 gold' }, { name: 'Copper bracelet', value: '5 silver' }, { name: 'Amber pendant', value: '3 gold' },
    { name: 'Garnet', value: '5 gold' }, { name: 'Pearl', value: '8 gold' }, { name: 'Gold-chased drinking horn', value: '12 gold' },
    { name: 'Silver goblet', value: '4 gold' }, { name: 'Jade figurine', value: '10 gold' }, { name: 'Embroidered silk cloth', value: '2 gold' },
    { name: 'Ivory comb', value: '15 silver' }, { name: 'Gilded holy symbol', value: '6 gold' }, { name: 'Sapphire', value: '20 gold' },
    { name: 'Crown of beaten gold', value: '40 gold' }, { name: 'Pouch of river gold', value: '2D6 gold' }, { name: 'Jewelled dagger hilt', value: '15 gold' },
    { name: 'Old coin hoard (tarnished)', value: '3D10 silver' }
  ];
  // A coin find (GM aid, not a book table): pick a size, roll the coins.
  var PURSES = [
    { name: 'A few coppers', expr: '3D6', unit: 'copper' }, { name: 'A purse', expr: '2D10', unit: 'silver' },
    { name: 'A fat purse', expr: '2D6', unit: 'gold' }, { name: 'A strongbox', expr: '4D10', unit: 'gold' }
  ];
  function coins(size) {
    var p = PURSES.filter(function (x) { return x.name === size; })[0] || pick(PURSES);
    var d = dice(p.expr);
    return { name: p.name, amount: d.total, unit: p.unit, text: d.total + ' ' + p.unit + ' (' + p.expr + ')' };
  }

  W.DB_GM = {
    dice: dice, rollInline: rollInline, skill: skill, rollRows: rollRows, rollCols: rollCols,
    npc: npc, adventure: adventure, sentence: sentence, mishap: mishap, journeyShift: journeyShift,
    attack: attack, attackIndex: attackIndex, attackRanges: ranges, attackFlags: attackFlags,
    valuables: VALUABLES, purses: PURSES, coins: coins, profStats: PROF_STATS
  };
})();
