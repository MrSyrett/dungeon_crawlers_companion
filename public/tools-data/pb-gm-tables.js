// Pirate Borg — GM Screen tool suite.
//
// Game Master tools for the GM Screen's Generators window, driven by the
// window's Roll button (window.pbGenPanel) and by each panel's own buttons:
//   pbnpc       Pirate NPC — the d66 name generator (first name, surname, two
//               nicknames) + a Reaction roll; optional "stats as" a bestiary NPC.
//   pbreaction  Reaction (2d6).
//   pbmorale    Morale check — 2d6 against the creature's Morale; demoralized
//               enemies roll d6: 1-3 flee, 4-6 surrender.
//   pbbroken    Broken (d6) at exactly 0 HP, sub-rolls included.
//   pbmisfire   Misfire (d6) — a black powder attack fumble.
//   pbdead      Among the Dead You Find (d6) — weapon / silver / relic / ritual.
//   pbrelic     Ancient Relics (d20).        pbritual   Arcane Rituals (d20).
//   pbmishap    Mystical Mishaps (d20).      pbjoker    Joker Table (d20).
//   pbmaritime  Maritime Events & Encounters (d12) — ships & creatures it names.
//   pbweather   Wind & weather: Foul Weather (2d6), Changing Winds (2d6) and the
//               d6 wind direction (flat-top or pointed-top hexes).
//   pbplunder   Plunder — d12 for each cargo slot with its suggested value.
//   pbtrap      It's a Trap! (d12) + bait / trigger / state / complication.
//   pbzombie    Zombie Appearance (d6).
//   pbshanty    Sea Shanties (d12) — CREW SKILL DR12 to sing it.
//   pbderelict  Derelict Takes More Damage (d8).
//   pbnaval     Naval combat helper — ship initiative (d6 + AGILITY), crew
//               actions (DR12, + the PC's ability), hull damage (minus the hull
//               die), crit / fumble / misfire, derelict d8, ship morale
//               (2d6 + crew skill, under 4), wind direction, point of sail and
//               changing winds.
//   pbrules     Rules quick reference (tests & DR, violence, crit / fumble,
//               misfire, armor, Devil's Luck, Broken, rest, reaction, morale,
//               experience).
//
// Every table and number comes from /tools-data/pb-data.js (window.PB_*), a
// paraphrased data layer: the Player's Guidebook and the Trapped in the
// Tropics adventure (monsters, ships, maritime events, plunder, traps). Nothing
// here invents official content. Every PB_* read is guarded — the GM Screen
// may be opened without the Pirate Borg data.
//
// Pirate Borg vocabulary only: Test, DR, ability, armor tier, Devil's Luck,
// Broken, Morale, crew skill. Enemies never roll in combat — the PC attacks
// and defends.
(function () {
  'use strict';
  var W = window;
  function G(k) { return (typeof W[k] !== 'undefined' && W[k]) ? W[k] : null; }
  function T(k) { var t = G('PB_GM_TABLES'); return t ? t[k] : null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function r(n) { return 1 + Math.floor(Math.random() * n); }
  function pick(a) { return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ''; }
  function num(x, d) { var n = parseInt(String(x == null ? '' : x).replace(/[−–]/g, '-').replace(/[^\d-]/g, ''), 10); return isNaN(n) ? (d == null ? 0 : d) : n; }
  function sgn(n) { n = +n || 0; return (n >= 0 ? '+' : '−') + Math.abs(n); }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

  // ── Dice ── "d6", "2d6", "d4+1", "3d10", "d2", "d66", "d100" → { total, dice, text }.
  // d66 is two d6 read as tens and units (11–66).
  function dice(expr) {
    var s = String(expr || '').replace(/[−–]/g, '-');
    if (/^\s*d66\s*$/i.test(s)) { var a = r(6), b = r(6); return { total: a * 10 + b, dice: [a, b], text: 'd66 → ' + a + b }; }
    var m = /(\d*)\s*d\s*(\d+)\s*([+\-]\s*\d+)?/i.exec(s);
    if (!m) { var flat = num(s, 0); return { total: flat, dice: [], text: String(expr || '') }; }
    var n = Math.max(1, Math.min(40, +(m[1] || 1))), sides = +m[2], out = [];
    for (var i = 0; i < n; i++) out.push(r(sides));
    var mod = m[3] ? parseInt(m[3].replace(/\s+/g, ''), 10) : 0;
    var tot = out.reduce(function (x, y) { return x + y; }, 0) + mod;
    return { total: tot, dice: out, text: (m[1] || '') + 'd' + sides + (mod ? (mod > 0 ? '+' : '') + mod : '') + ' → ' + tot + (out.length > 1 ? ' (' + out.join('+') + ')' : '') };
  }
  // Roll the durations inside a line, keeping the expression: "dead for d6 days" →
  // "dead for d6 (4) days". Only time spans are rolled — damage and other dice are
  // left for the table to roll when they happen.
  function rollInline(s) {
    return String(s || '').replace(/\b(\d*)d(\d+)(?=\s+(?:days?|months?|years?|hours?|rounds?|minutes?|turns?)\b)/gi, function (all) {
      return all + ' (' + dice(all).total + ')';
    });
  }
  // A Test: d20 ± ability ≥ DR. Natural 20 = Crit, natural 1 = Fumble.
  function test(mod, dr) {
    var d = r(20), m = num(mod, 0), target = num(dr, 12), total = d + m;
    var crit = d === 20, fumble = d === 1, ok = total >= target;
    return { die: d, mod: m, dr: target, total: total, success: ok, crit: crit, fumble: fumble,
      word: crit ? 'Crit!' : fumble ? 'Fumble!' : ok ? 'Success' : 'Failure',
      detail: 'd20 ' + d + (m ? ' ' + sgn(m) : '') + ' = ' + total + ' vs DR' + target };
  }
  function testChip(t) {
    var cls = t.crit ? 'pb-crit' : t.fumble ? 'pb-fumble' : t.success ? 'pb-ok' : 'pb-bad';
    return '<span class="pb-roll ' + cls + '">' + esc(t.word) + '</span> <span class="pb-dim">' + esc(t.detail) + '</span>';
  }
  // Row a result lands on (rows carry roll: n or roll: [lo, hi]).
  function rowFor(rows, v) {
    for (var i = 0; i < (rows || []).length; i++) {
      var x = rows[i].roll;
      if (Array.isArray(x) ? (v >= x[0] && v <= x[1]) : +x === v) return rows[i];
    }
    return null;
  }
  // Roll a PB_GM_TABLES table. 2d6 tables sum two dice; dN tables roll N.
  function rollTable(t, dieOverride) {
    if (!t || !t.rows) return null;
    var die = String(dieOverride || t.die || 'd6').toLowerCase();
    var d = dice(die), v = d.total;
    return { table: t, roll: v, die: die, dice: d.dice, row: rowFor(t.rows, v) || t.rows[Math.max(0, Math.min(t.rows.length - 1, v - 1))] };
  }
  function rollRows(key) { return rollTable(T(key)); }
  // One die on each column of a column table (trap details, names, wind).
  function rollCols(key) {
    var t = T(key); if (!t || !t.columns) return null;
    return t.columns.map(function (c) {
      var v, label;
      if (/d66/i.test(c.die)) { var a = r(6), b = r(6); v = (a - 1) * 6 + (b - 1) + 1; label = '' + a + b; }
      else { v = r(num(String(c.die).replace(/^d/i, ''), c.values.length) || c.values.length); label = String(v); }
      return { die: c.die, name: c.name, roll: label, value: c.values[Math.min(c.values.length, v) - 1] || '' };
    });
  }
  function rangeText(x) { return Array.isArray(x) ? (x[0] === x[1] ? String(x[0]) : x[0] + '–' + x[1]) : String(x); }
  // A row's text without its leading "Name: " (the card already shows the name).
  function body(row) { var t = String((row && row.text) || ''); var n = row && row.name; return n && t.indexOf(n + ':') === 0 ? t.slice(n.length + 1).trim() : t; }

  // ── Card helpers (the GM Screen's .gen-card look) ──
  function card(name, tag, inner, extra, attrs) {
    return '<div class="gen-card pb-gen-card' + (extra ? ' ' + extra : '') + '"' + (attrs || '') + '><div class="gen-card-header"><span class="gen-card-name">' + esc(name) + '</span>'
      + (tag ? '<span class="gen-card-tag">' + esc(tag) + '</span>' : '') + '</div>' + (inner || '') + '</div>';
  }
  function row(label, html) { return '<div class="gen-card-row"><span class="gen-card-row-label">' + esc(label) + '</span><span>' + html + '</span></div>'; }
  function hr() { return '<hr class="gen-card-divider">'; }
  function src(t) { return t ? '<div class="pb-dim pb-src">' + esc((t.source || '') + (t.page ? ' p.' + t.page : '')) + '</div>' : ''; }
  function out(panel) { return panel && panel.querySelector('.pb-out'); }
  function val(panel, sel, d) { var el = panel && panel.querySelector(sel); return el ? (el.type === 'checkbox' ? el.checked : el.value) : d; }
  function qty(panel) { var q = panel && panel.querySelector('.pb-qty'); return q ? Math.max(1, Math.min(10, parseInt(q.value, 10) || 1)) : 1; }
  function missing(panel) { var o = out(panel); if (o) o.innerHTML = '<div class="gen-empty">The Pirate Borg data did not load — open the GM Screen from a Pirate Borg campaign.</div>'; }
  function put(panel, html, append) {
    var o = out(panel); if (!o) return;
    if (append) { [].slice.call(o.querySelectorAll(':scope > .gen-empty')).forEach(function (e) { e.remove(); }); o.insertAdjacentHTML('afterbegin', html); while (o.children.length > 12) o.removeChild(o.lastChild); }
    else o.innerHTML = html;
  }

  // ══ Bestiary (PB_MONSTERS + homebrew pb-monster) and ships (PB_SHIPS + pb-ship) ══
  function arr(v) { return Array.isArray(v) ? v : []; }
  function monsters() { return arr(G('PB_MONSTERS')).concat(arr(W.__PB_HB_MONSTERS).map(function (m) { return Object.assign({ homebrew: true }, m); })); }
  function ships() { return arr(G('PB_SHIPS')).concat(arr(W.__PB_HB_SHIPS).map(function (s) { return Object.assign({ homebrew: true }, s); })); }
  function findMon(name) { return monsters().filter(function (m) { return m.name === name || m.id === name; })[0] || null; }
  function findShip(name) { return ships().filter(function (s) { return s.name === name || s.id === name; })[0] || null; }
  function armorText(a) { return a && a.die ? '−' + a.die + (a.name ? ' (' + a.name + ')' : '') : 'none'; }
  function moraleText(m) { return m == null || m === '' ? '–' : String(m); }
  function monLine(m) {
    if (!m) return '';
    var dr = m.dr || {};
    return '<b>' + esc(m.name) + '</b> — HP ' + m.hp + ' · Morale ' + moraleText(m.morale) + ' · Armor ' + esc(armorText(m.armor))
      + (dr.attack || dr.defend ? ' · <span class="pb-warn">' + (dr.attack ? 'DR' + dr.attack + ' to hit' : '') + (dr.attack && dr.defend ? ', ' : '') + (dr.defend ? 'DR' + dr.defend + ' to defend' : '') + '</span>' : '')
      + ((m.attacks || []).length ? '<br><span class="pb-dim">' + esc(m.attacks.map(function (a) { return a.name + (a.damage ? ' ' + a.damage : '') + (a.notes ? ' (' + a.notes + ')' : ''); }).join(' · ')) + '</span>' : '');
  }
  function sendBtn(m) { return m ? '<button class="btn small ghost gen-send-tracker" data-src="pb" data-mon="' + esc(m.name) + '" title="Add ' + esc(m.name) + ' to the Combat Tracker">→ Tracker</button>' : ''; }

  // ══ NPC (pbnpc) — names d66 ×4 + reaction ══
  function name(gender) {
    var c = rollCols('names'); if (!c) return null;
    var first = gender === 'female' ? c[1] : gender === 'male' ? c[0] : (r(2) === 1 ? c[0] : c[1]);
    var nick2 = rollCols('names')[3];
    var n1 = String(c[3].value).split('/')[0], n2 = String(nick2.value).split('/')[0];
    var firstName = String(first.value).split('/')[0];
    return { first: firstName, surname: c[2].value, nicknames: [c[3].value, nick2.value], cols: [first, c[2], c[3], nick2],
      full: firstName + ' "' + n1 + (n2 && n2 !== n1 ? ' ' + n2 : '') + '" ' + c[2].value };
  }
  function reaction() { var x = rollRows('reaction'); return x ? { roll: x.roll, dice: x.dice, text: x.row.text } : null; }
  function npc(opts) {
    opts = opts || {};
    var n = name(opts.gender); if (!n) return null;
    var re = reaction();
    var stats = opts.statsAs ? findMon(opts.statsAs) : null;
    return { name: n, reaction: re, stats: stats };
  }
  function npcCard(o) {
    var n = o.name, re = o.reaction;
    var json = esc(JSON.stringify({ name: n.full, demeanor: re ? re.text : '', occupation: o.stats ? o.stats.name : 'Pirate', quirk: 'Called ' + n.nicknames.join(' / ') }));
    return card(n.full, 'd66 ×4' + (re ? ' · 2d6 ' + re.roll : ''),
      row('Name', '<b>' + esc(n.first) + ' ' + esc(n.surname) + '</b>')
      + row('Nicknames', esc(n.nicknames.join(' · ')))
      + (re ? row('Reaction', '<b>' + esc(re.text) + '</b> <span class="pb-dim">(2d6 ' + re.roll + ')</span>') : '')
      + (o.stats ? hr() + row('Stats as', monLine(o.stats)) : '')
      + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">' + n.cols.map(function (x) { return x.name.replace(/\s*\(.*\)$/, '') + ' ' + x.roll; }).join(' · ') + '</div>'
      + '<div class="gen-card-actions"><button class="btn small primary gen-send-social" title="Send this NPC to the Social station">Send to Social</button>'
      + (o.stats ? sendBtn(o.stats) : '') + '</div>', '', ' data-npc="' + json + '"');
  }
  function reactionCard() {
    var re = reaction(); if (!re) return '';
    return card('Reaction — ' + re.text, '2d6 ' + re.roll, row('Roll', esc(re.dice.join(' + ')) + ' = <b>' + re.roll + '</b>') + row('Result', '<b>' + esc(re.text) + '</b>')
      + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">2-3 bloodthirsty · 4-6 angered or alarmed · 7-8 indifferent · 9-10 almost friendly · 11-12 helpful</div>' + src(T('reaction')));
  }

  // ══ MORALE (pbmorale + tracker cards) ══
  // 2d6 (+ modifier, e.g. −2 near an Intimidating Presence swashbuckler) against Morale:
  // a result GREATER than Morale breaks the creature — d6: 1-3 it flees, 4-6 it surrenders.
  function morale(value, mod) {
    if (value == null || value === '' || /^[–—-]$/.test(String(value).trim())) return { never: true };
    var mv = num(value, 7), md = num(mod, 0), d = dice('2d6'), total = d.total + md;
    var broke = total > mv, x = broke ? rollTable(T('morale'), 'd6') : null;
    return { never: false, morale: mv, mod: md, dice: d.dice, total: total, broke: broke, result: x ? { roll: x.roll, text: x.row.text } : null };
  }
  function moraleCard(label, res) {
    var t = T('morale');
    if (res.never) return card((label ? label + ' — ' : '') + 'Morale', 'never breaks', row('Morale', '<b>–</b> — fights to the end; no morale check.'));
    return card((label ? label + ' — ' : '') + (res.broke ? (res.result.text === 'Flees' ? 'Flees!' : 'Surrenders!') : 'Holds'), '2d6 vs Morale ' + res.morale,
      row('Roll', esc(res.dice.join(' + ')) + (res.mod ? ' ' + sgn(res.mod) : '') + ' = <b>' + res.total + '</b> vs ' + res.morale)
      + row('Result', res.broke ? '<span class="pb-warn"><b>Demoralized</b></span> — d6 ' + res.result.roll + ': <b>' + esc(res.result.text) + '</b>' : 'Keeps fighting.')
      + (t && t.triggers ? '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Check when: ' + esc(t.triggers.join(' · ')) + '</div>' : ''));
  }

  // ══ BROKEN / MISFIRE / AMONG THE DEAD / plain d20 tables ══
  function brokenCard() {
    var x = rollRows('broken'); if (!x) return '';
    var rw = x.row, h = row(rw.name, esc(body(rw)));
    if (rw.sub) { var s = rollTable(rw.sub); if (s) h += row('Sub-roll ' + rw.sub.die + ' ' + s.roll, '<b>' + esc(s.row.text) + '</b>'); }
    var bits = [];
    if (rw.deathIn) bits.push('dies in ' + dice(rw.deathIn).total + ' hours unless treated');
    if (rw.outRounds) bits.push('out for ' + dice(rw.outRounds).total + ' rounds');
    if (rw.hp != null) bits.push('wakes with ' + (typeof rw.hp === 'number' ? rw.hp : dice(rw.hp).total) + ' HP');
    if (rw.luck != null) bits.push((typeof rw.luck === 'number' ? rw.luck : dice(rw.luck).total) + " Devil's Luck");
    if (rw.duration) bits.push('for ' + dice(rw.duration).total + ' days');
    if (bits.length) h += row('Rolled', esc(bits.join(' · ')));
    return card('Broken — ' + rw.name, 'd6 ' + x.roll, h + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Exactly 0 HP is Broken; below 0 HP is Dead.</div>', rw.dead ? 'pb-dead' : '');
  }
  function misfireCard() {
    var x = rollRows('misfire'); if (!x) return '';
    var rw = x.row;
    return card('Misfire — ' + rw.name, 'd6 ' + x.roll, row(rw.name, esc(body(rw))) + (rw.damage ? row('Damage', '<b>' + dice(rw.damage).total + '</b> <span class="pb-dim">(' + esc(rw.damage) + ')</span>') : '')
      + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">A fumbled attack with a black powder weapon rolls here instead of losing the weapon.</div>');
  }
  function startingWeapon() {
    var t = G('PB_STARTING_WEAPONS'); if (!t || !t.rows) return null;
    var v = r(10); return { roll: v, row: rowFor(t.rows, v) };
  }
  function relic() { var x = rollRows('relics'); return x ? { roll: x.roll, name: x.row.name, text: body(x.row) } : null; }
  function ritual() { var x = rollRows('rituals'); return x ? { roll: x.roll, name: x.row.name, numeral: x.row.numeral, text: body(x.row) } : null; }
  function deadCard() {
    var x = rollRows('amongTheDead'); if (!x) return '';
    var rw = x.row, h = row('d6 ' + x.roll, esc(rw.text));
    if (rw.table === 'startingWeapons') { var w = startingWeapon(); if (w && w.row) h += row('Weapon d10 ' + w.roll, '<b>' + esc(w.row.text) + '</b>'); }
    if (rw.silver) { var s = dice(rw.silver); h += row('Silver', '<b>' + s.total + 's</b> <span class="pb-dim">(' + esc(s.text) + ')</span>'); }
    if (rw.table === 'relics') { var rl = relic(); if (rl) h += row('Relic d20 ' + rl.roll, '<b>' + esc(rl.name) + '</b> — ' + esc(rl.text)); }
    if (rw.table === 'rituals') { var rt = ritual(); if (rt) h += row('Ritual d20 ' + rt.roll, '<b>' + esc(rt.name) + '</b> — ' + esc(rt.text)); }
    return card('Among the dead you find…', 'd6 ' + x.roll, h + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Rolled when a character gains experience.</div>');
  }
  function d20Card(key, title, extra) {
    var x = rollRows(key); if (!x) return '';
    var rw = x.row, h = row(rw.name || 'Result', esc(body(rw)));
    if (rw.hidden) h += row('Unnoticed', '<i class="pb-dim">' + esc(rw.hidden) + '</i>');
    return card(title + (rw.name ? ' — ' + rw.name : ''), x.die + ' ' + x.roll + (rw.numeral ? ' · ' + rw.numeral : ''), h + (extra || '') + src(x.table), rw.dead ? 'pb-dead' : '');
  }
  var RELIC_NOTE = '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Use: an action. Afterwards test SPIRIT DR12 — fail: stunned next round and unusable until dawn; fumble: destroyed and lose d2 HP.</div>';
  var RITUAL_NOTE = '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Casts a day: d4 + SPIRIT. Test SPIRIT DR12 — fail: a Mystical Mishap and no more of that ritual until dawn. Cold iron or metal spoils it.</div>';
  var MISHAP_NOTE = '<div class="pb-dim" style="font-size:11px;margin-top:4px;">The same mishap twice: the caster slowly melts into sea water.</div>';

  // ══ MARITIME EVENTS (pbmaritime) ══
  function maritimeCard() {
    var x = rollRows('maritimeEvents'); if (!x) return '';
    var rw = x.row, h = row(rw.name, esc(body(rw))), acts = '';
    if (rw.ship) { var s = findShip(rw.ship); if (s) { h += row('Ship', shipLine(s)); acts += sendBtn(s); } }
    if (rw.monster) { var m = findMon(rw.monster); if (m) { h += row('Creature', monLine(m)); acts += sendBtn(m); } }
    return card(rw.name, 'd12 ' + x.roll, h + (acts ? '<div class="gen-card-actions">' + acts + '</div>' : '')
      + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">' + esc((x.table && x.table.note) || '') + '</div>' + src(x.table));
  }

  // ══ WIND & WEATHER (pbweather + naval) ══
  function windDir(hex) {
    var Wd = G('PB_WIND'); var v = r(6);
    var list = Wd ? (hex === 'pointed' ? Wd.pointed : Wd.flat) : null;
    var d = list ? (list.filter(function (x) { return x.roll === v; })[0] || {}).dir : '';
    return { roll: v, dir: d || '', hex: hex === 'pointed' ? 'pointed-top' : 'flat-top' };
  }
  function windsCard() {
    var x = rollRows('changingWinds'); if (!x) return '';
    var rw = x.row, h = row(rw.name, esc(body(rw)));
    if (rw.rerollDirection === true) { var wd = windDir(); h += row('New direction', 'from <b>' + esc(wd.dir) + '</b> <span class="pb-dim">(d6 ' + wd.roll + ', flat-top)</span>'); }
    return card('Changing Winds — ' + rw.name, '2d6 ' + x.roll, h + src(x.table));
  }
  function weatherCard() {
    var x = rollRows('foulWeather'); if (!x) return '';
    return card('Foul Weather', '2d6 ' + x.roll, row('Weather', '<b>' + esc(x.row.text) + '</b>') + src(x.table));
  }
  function windDirCard(hex) {
    var wd = windDir(hex);
    return card('Wind from the ' + wd.dir, 'd6 ' + wd.roll + ' · ' + wd.hex, row('Wind', 'Blows from the <b>' + esc(wd.dir) + '</b> hex edge.')
      + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Point of sail is set at the start of each ship\'s turn: heading away (3 edges) With the Wind, full speed; the 2 edges either side of the wind Close to the Wind, ½ speed (min 1); straight into it In Irons, speed 0 and one rotation.</div>');
  }

  // ══ PLUNDER (pbplunder) — d12 per cargo slot ══
  function plunderRoll() {
    var x = rollRows('plunder'); if (!x) return null;
    var v = x.row.value, amt = null;
    if (v) { var m = /^(d\d+)\s*×\s*([\d,]+)s/.exec(v); if (m) { var d = dice(m[1]); amt = d.total * num(m[2].replace(/,/g, ''), 1); } }
    return { roll: x.roll, text: x.row.text, value: v || '', silver: amt, empty: /^Empty/i.test(x.row.text) };
  }
  function plunderCard(slots) {
    var t = T('plunder'); if (!t) return '';
    var h = '', total = 0, rows = [];
    for (var i = 0; i < slots; i++) { var p = plunderRoll(); if (!p) continue; rows.push(p); total += p.silver || 0;
      h += row('Slot ' + (i + 1) + ' · d12 ' + p.roll, p.empty ? '<span class="pb-dim">Empty</span>' : '<b>' + esc(p.text.replace(/\s*\(.*\)$/, '')) + '</b>' + (p.silver != null ? ' — <b>' + p.silver.toLocaleString() + 's</b> <span class="pb-dim">(' + esc(p.value) + ')</span>' : '')); }
    return card('Plunder — ' + slots + ' cargo slot' + (slots === 1 ? '' : 's'), 'd12 each', h + hr() + row('Worth', '<b>' + total.toLocaleString() + 's</b> <span class="pb-dim">suggested — a Veteran Quartermaster sells for 50% more</span>') + src(t));
  }

  // ══ TRAPS (pbtrap) ══
  function trap(full) {
    var x = rollRows('traps'); if (!x) return null;
    return { roll: x.roll, name: x.row.name, text: x.row.text, test: x.row.test || null, damage: x.row.damage || '', details: full ? rollCols('trapDetails') : null };
  }
  function trapCard(full) {
    var tp = trap(full); if (!tp) return '';
    var h = row('Trap', esc(tp.text));
    if (tp.details) tp.details.forEach(function (c) { h += row(c.name + ' d12 ' + c.roll, esc(c.value)); });
    return card(tp.name, 'd12 ' + tp.roll + (full ? ' · 5d12' : ''), h + src(T('traps')));
  }

  // ══ ZOMBIE / SHANTY / DERELICT ══
  function zombieCard() {
    var x = rollRows('zombieAppearance'); if (!x) return '';
    return card('Zombie', 'd6 ' + x.roll, row('Appearance', esc(rollInline(x.row.text))) + src(x.table));
  }
  function shanty(skill, mod) {
    var x = rollRows('shanties'); if (!x) return null;
    return { roll: x.roll, name: x.row.name, text: body(x.row), test: test(num(skill, 0) + num(mod, 0), 12) };
  }
  function shantyCard(skill, pick_) {
    var x = pick_ ? { roll: pick_.roll, name: pick_.name, text: body(pick_) } : null;
    var s = x ? Object.assign(x, { test: test(num(skill, 0), 12) }) : shanty(skill);
    if (!s) return '';
    return card(s.name, 'd12 ' + s.roll, row('Effect', esc(rollInline(s.text))) + row('CREW SKILL DR12', testChip(s.test) + (s.test.success ? '' : '<br><span class="pb-dim">Sounds horrible — no effect, and no shanties for the next hour.</span>'))
      + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Shanties a day: 1 ± the Captain\'s SPIRIT. The GM decides a Crit or Fumble.</div>');
  }
  function derelict() { var x = rollRows('derelict'); return x ? { roll: x.roll, row: x.row } : null; }
  function derelictCard() {
    var x = derelict(); if (!x) return '';
    var rw = x.row, h = row('Effect', '<b>' + esc(rw.text) + '</b>');
    if (rw.sinks && /^d/.test(rw.sinks)) h += row('Sinks in', '<b>' + dice(rw.sinks.split(' ')[0]).total + '</b> rounds');
    if (rw.damage) h += row('Damage', 'Each aboard: <b>' + dice(rw.damage).total + '</b> <span class="pb-dim">(' + esc(rw.damage) + (rw.test ? ', ' + rw.test.ability + ' DR' + rw.test.dr + ' avoids' : '') + ')</span>');
    return card('Derelict takes damage', 'd8 ' + x.roll, h + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">At 0 HP or less a ship is derelict: speed 0, no crew actions in combat.</div>', rw.death ? 'pb-dead' : '');
  }

  // ══ NAVAL (pbnaval) ══
  function shipLine(s) {
    if (!s) return '';
    return '<b>' + esc(s.name) + '</b> — HP ' + s.hp + ' · Hull ' + (s.hull ? '−' + s.hull.die : '—') + ' · AGL ' + (s.agility == null ? '—' : sgn(s.agility)) + ' · Speed ' + s.speed
      + ' · Skill ' + (s.skill == null ? '—' : sgn(s.skill))
      + '<br><span class="pb-dim">' + esc(['Broadsides ' + (s.broadsides ? (s.broadsidesAttacks > 1 ? s.broadsidesAttacks + ' × ' : '') + s.broadsides : '—'), 'Small arms ' + (s.smallArms ? (s.smallArmsAttacks > 1 ? s.smallArmsAttacks + ' × ' : '') + s.smallArms : '—'), 'Ram ' + (s.ram || '—'), s.crew ? 'Crew ' + s.crew.min + '–' + s.crew.max : '', s.cargo != null ? 'Cargo ' + s.cargo : ''].filter(Boolean).join(' · ')) + '</span>'
      + (s.special ? '<br><span class="pb-dim">' + esc(s.special) + '</span>' : '');
  }
  var HULL_DOWN = { d6: 'd4', d4: 'd2', d2: null };
  // Specialty crew + drunk crew → DR changes per action kind.
  function specialtyDR(kind, sp) {
    sp = sp || {}; var d = 0;
    if (sp.drunk) d += 2;
    if (sp.gunner && (kind === 'fire-broadsides' || kind === 'fire-small-arms')) d -= 2;
    if (sp.sails && (kind === 'full-sail' || kind === 'come-about')) d -= 2;
    if (sp.carpenter && kind === 'repair') d -= 5;
    return d;
  }
  // A crew action test: d20 + ship CREW SKILL (or ship AGILITY) + the PC's ability vs DR12.
  function crewAction(actionId, ship, pcMod, sp, crewMod) {
    var A = arr(G('PB_CREW_ACTIONS')).filter(function (a) { return a.id === actionId; })[0];
    if (!A) return null;
    if (!A.test) return { action: A, test: null };
    var base = A.test.ship === 'agility' ? num(ship && ship.agility, 0) : num(ship && ship.skill, 0) + num(crewMod, 0);
    var dr = A.test.dr + specialtyDR(actionId, sp);
    return { action: A, base: base, pc: num(pcMod, 0), dr: dr, test: test(base + num(pcMod, 0), dr) };
  }
  // Damage to a target ship: roll the weapon, subtract the hull die (crit: double first,
  // then the hull drops a tier). Black powder on ships is the cannon — the hull still counts.
  function hullDamage(dmgExpr, hullDie, crit) {
    var d = dice(dmgExpr), raw = d.total * (crit ? 2 : 1);
    var h = hullDie ? dice(hullDie) : null, net = Math.max(0, raw - (h ? h.total : 0));
    return { roll: d, raw: raw, hull: h, net: net, crit: !!crit, newHull: crit && hullDie ? (HULL_DOWN[hullDie] === undefined ? hullDie : HULL_DOWN[hullDie]) : hullDie };
  }
  function shipMorale(skill, mod) {
    var d = dice('2d6'), t = d.total + num(skill, 0) + num(mod, 0);
    return { dice: d.dice, skill: num(skill, 0), mod: num(mod, 0), total: t, fails: t < 4 };
  }
  function pointOfSail(windFrom, heading, hex) {
    var Wd = G('PB_WIND'), P = arr(G('PB_POINT_OF_SAIL'));
    var list = (Wd ? (hex === 'pointed' ? Wd.pointed : Wd.flat) : []).map(function (x) { return x.dir; });
    var wi = list.indexOf(windFrom), hi = list.indexOf(heading);
    if (wi < 0 || hi < 0) return null;
    var rel = ((hi - wi + 6) % 6) + 1;
    var p = P.filter(function (x) { return (x.relativeEdges || []).indexOf(rel) >= 0; })[0] || null;
    return { rel: rel, pos: p };
  }
  function sailSpeed(ship, pos, windMod) {
    if (!ship) return null;
    var base = Math.max(0, num(ship.speed, 0) + num(windMod, 0));
    if (ship.windImmune) return { speed: base, why: 'not affected by wind' };
    if (!pos) return { speed: base, why: '' };
    if (pos.id === 'with') return { speed: base, why: 'full speed' };
    if (pos.id === 'close') return ship.closeToWindFullSpeed ? { speed: base, why: 'full speed close to the wind (' + ship.name + ')' } : { speed: Math.max(1, Math.floor(base / 2)), why: '½ speed, round down, min 1' };
    return { speed: 0, why: 'In Irons: speed 0, one rotation only' };
  }
  function navalOpts(panel) {
    return {
      ship: findShip(val(panel, '.pbn-ship', '')), foe: findShip(val(panel, '.pbn-foe', '')),
      pc: num(val(panel, '.pbn-pc', 0), 0), crewMod: num(val(panel, '.pbn-crewmod', 0), 0),
      sp: { gunner: !!val(panel, '.pbn-gunner', false), sails: !!val(panel, '.pbn-sails', false), carpenter: !!val(panel, '.pbn-carpenter', false), drunk: !!val(panel, '.pbn-drunk', false), qm: !!val(panel, '.pbn-qm', false) },
      hex: val(panel, '.pbn-hex', 'flat'), wind: val(panel, '.pbn-wind', ''), heading: val(panel, '.pbn-heading', ''),
    };
  }
  function shipInitCard(o) {
    var a = o.ship, b = o.foe; if (!a) return card('Ship initiative', '', '<div class="gen-empty">Pick your ship.</div>');
    var ra = r(6), rb = r(6), ta = ra + num(a.agility, 0), tb = b ? rb + num(b.agility, 0) : null;
    var first = !b || ta >= tb ? a.name + ' (PC ship — wins ties)' : b.name;
    return card('Ship initiative', 'd6 + ship AGILITY',
      row(a.name, 'd6 ' + ra + ' ' + sgn(num(a.agility, 0)) + ' = <b>' + ta + '</b>')
      + (b ? row(b.name, 'd6 ' + rb + ' ' + sgn(num(b.agility, 0)) + ' = <b>' + tb + '</b>') : '')
      + row('First', '<b>' + esc(first) + '</b>') + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Rerolled every round. Each turn: check point of sail · the Captain moves the ship · each other PC takes one crew action · the ship makes up to 2 crew actions in all.</div>');
  }
  function actionCard(o, id) {
    var ship = o.ship; if (!ship) return card('Crew action', '', '<div class="gen-empty">Pick your ship.</div>');
    var res = crewAction(id, ship, o.pc, o.sp, o.crewMod); if (!res) return '';
    var A = res.action;
    if (!res.test) return card(A.name, ship.name, row('Effect', esc(A.text)));
    var t = res.test, h = row('Test', testChip(t) + '<br><span class="pb-dim">' + (A.test.ship === 'agility' ? 'ship AGILITY ' + sgn(res.base) : 'CREW SKILL ' + sgn(res.base)) + (res.pc ? ' + PC ' + A.test.pc + ' ' + sgn(res.pc) : '') + (res.dr !== 12 ? ' · DR' + res.dr + ' with specialty crew' : '') + '</span>');
    var foe = o.foe;
    if (id === 'fire-broadsides' || id === 'fire-small-arms') {
      var dmg = id === 'fire-broadsides' ? ship.broadsides : ship.smallArms, n = id === 'fire-broadsides' ? (ship.broadsidesAttacks || 1) : (ship.smallArmsAttacks || 1);
      if (!dmg) h += row('Weapons', '<span class="pb-dim">This ship has no ' + (id === 'fire-broadsides' ? 'broadsides' : 'small arms') + '.</span>');
      else if (t.fumble) h += row('Misfire', '<span class="pb-warn">The ' + (id === 'fire-broadsides' ? 'cannons' : 'small arms') + ' misfire — repair them before they fire again.</span>');
      else if (t.success) {
        for (var i = 0; i < n; i++) {
          var hd = hullDamage(dmg, foe && foe.hull ? foe.hull.die : null, t.crit && i === 0);
          h += row((n > 1 ? 'Attack ' + (i + 1) : 'Damage'), esc(hd.roll.text) + (hd.crit ? ' ×2 (crit)' : '') + (hd.hull ? ' − hull ' + hd.hull.total + ' (' + foe.hull.die + ')' : '') + ' = <b>' + hd.net + '</b> ship HP' + (foe ? ' to ' + esc(foe.name) : ''));
          if (hd.crit && foe && foe.hull) h += row('Crit', 'Hull drops a tier: <b>' + (hd.newHull ? '−' + hd.newHull : 'none') + '</b> (no repair at sea).');
        }
        if (!foe) h += '<div class="pb-dim" style="font-size:11px;">Subtract the target\'s hull die. Ship damage vs people is ×5.</div>';
      } else h += row('Miss', 'No hits this turn.');
      if (id === 'fire-broadsides') h += '<div class="pb-dim" style="font-size:11px;margin-top:2px;">Broadsides fire only in a 45° arc off the side; range 12 hexes.</div>';
    } else if (id === 'repair') {
      if (t.success) { var hp = dice('d6'); h += row('Repair', 'Recovers <b>' + hp.total + '</b> HP (d6) or repairs misfired weapons — never above 50% max HP at sea (' + Math.floor(num(ship.hp, 0) / 2) + ').'); }
    } else if (id === 'full-sail') { if (t.success) h += row('Result', 'Move one extra hex.'); }
    else if (id === 'come-about') { if (t.success) h += row('Result', 'Rotate one extra hex face.'); }
    return card(A.name, ship.name, h + (t.crit && id !== 'fire-broadsides' && id !== 'fire-small-arms' ? '<div class="pb-dim" style="font-size:11px;">A Crit on other crew actions: the GM decides.</div>' : ''));
  }
  function ramCard(o, hexes) {
    var a = o.ship, b = o.foe; if (!a) return card('Ram', '', '<div class="gen-empty">Pick your ship.</div>');
    var hx = Math.max(0, num(hexes, 0)), h = '';
    [a, b].forEach(function (s) { if (!s) return;
      var tgt = s === a ? b : a;
      if (!s.ram) { h += row(s.name, '<span class="pb-dim">no ram damage</span>'); return; }
      var hd = hullDamage(s.ram, tgt && tgt.hull ? tgt.hull.die : null, false);
      var bonus = s === a ? hx : 0;
      h += row(s.name, esc(hd.roll.text) + (bonus ? ' +' + bonus + ' (hexes)' : '') + (hd.hull ? ' − hull ' + hd.hull.total : '') + ' = <b>' + Math.max(0, hd.net + bonus) + '</b>' + (tgt ? ' to ' + esc(tgt.name) : ''));
    });
    return card('Ram', 'all ships roll ram damage', h + '<div class="pb-dim" style="font-size:11px;margin-top:4px;">+1 per hex the ship traveled on its last move. A ramming ship takes no other crew actions that turn.</div>');
  }
  function shipMoraleCard(o) {
    var s = o.ship; if (!s) return card('Ship morale', '', '<div class="gen-empty">Pick a ship.</div>');
    var m = shipMorale(num(s.skill, 0) + o.crewMod, o.sp.qm ? 3 : 0), N = G('PB_NAVAL_RULES');
    return card('Ship morale — ' + (m.fails ? 'Surrender or mutiny!' : 'Holds'), '2d6 + crew skill',
      row(s.name, esc(m.dice.join(' + ')) + ' ' + sgn(m.skill) + (m.mod ? ' +3 (Veteran Quartermaster)' : '') + ' = <b>' + m.total + '</b> — ' + (m.fails ? '<span class="pb-warn">under 4: the crew surrenders or mutinies</span>' : '4 or more: they hold'))
      + (N && N.morale ? '<div class="pb-dim" style="font-size:11px;margin-top:4px;">Consider when: ' + esc(N.morale.triggers.join(' · ')) + '.</div>' : ''), m.fails ? 'pb-dead' : '');
  }
  function sailCard(o) {
    var s = o.ship, ps = pointOfSail(o.wind, o.heading, o.hex);
    if (!ps) return card('Point of sail', '', '<div class="gen-empty">Set where the wind comes from and the ship\'s heading.</div>');
    var sp = sailSpeed(s, ps.pos, 0);
    return card('Point of sail — ' + (ps.pos ? ps.pos.name : '?'), 'wind ' + o.wind + ' · heading ' + o.heading,
      row('Point of sail', '<b>' + esc(ps.pos ? ps.pos.name : '') + '</b> — ' + esc(ps.pos ? ps.pos.text : ''))
      + (s ? row(s.name, 'Speed <b>' + sp.speed + '</b> hexes <span class="pb-dim">(' + esc(sp.why) + ')</span>') : ''));
  }
  // Damage to one PC from ship weapons: ×5 (1:5 scaling).
  function scaleNote() { var N = G('PB_NAVAL_RULES'); return N && N.scaling ? N.scaling.text : ''; }

  // ══ RULES QUICK REFERENCE (pbrules) ══
  function ul(items) { return '<ul class="pb-ul">' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  function rowsList(rows) { return ul((rows || []).map(function (x) { return '<b>' + esc(rangeText(x.roll)) + '</b> ' + esc(x.name ? x.name + ' — ' + body(x) : x.text); })); }
  var RULE_TOPICS = [
    ['tests', 'Tests & DR'], ['violence', 'Violence'], ['critfumble', 'Crit & Fumble'], ['armor', 'Armor'], ['luck', "Devil's Luck"],
    ['broken', 'Broken & Death'], ['rest', 'Rest & Healing'], ['reaction', 'Reaction & Morale'], ['experience', 'Getting Better'], ['naval', 'Naval Combat']
  ];
  function rulesCard(topic) {
    var R = G('PB_RULES'); if (!R) return '';
    var D = arr(G('PB_DR')), V = R.violence || {}, h = '';
    if (topic === 'tests') h = '<p class="pb-p">' + esc(R.tests.text) + '</p>' + ul(D.map(function (d) { return '<b>DR' + d.dr + '</b> ' + esc(d.text); }))
      + '<p class="pb-p pb-dim">' + esc(R.abilities.text) + '</p>';
    else if (topic === 'violence') h = '<p class="pb-p">' + esc(V.text) + '</p>'
      + ul([ '<b>Initiative d6:</b> 1-3 enemies first, 4-6 PCs first. Optional individual initiative: ' + esc(V.initiative.individual) + '.' ]
        .concat((V.attacks || []).map(function (a) { return '<b>' + esc(a.name) + ':</b> ' + esc(a.ability) + ' DR' + a.dr + (a.failure ? ' — ' + esc(a.failure) : ''); }))
        .concat(['<b>Rounds:</b> ' + esc(V.rounds.text), '<b>Move:</b> ' + esc(V.movement.text), '<b>Reload:</b> ' + esc(V.reload.text)]));
    else if (topic === 'critfumble') h = ul([
        '<b>Crit (natural 20) on an attack:</b> ' + esc(V.critical.attack), '<b>Crit on defense:</b> ' + esc(V.critical.defense),
        '<b>Fumble (natural 1) on an attack:</b> ' + esc(V.fumble.attack), '<b>Fumble on defense:</b> ' + esc(V.fumble.defense),
        '<b>Black powder:</b> ' + esc(V.fumble.blackPowder) ]) + '<div class="pb-sub">Misfire d6</div>' + rowsList(V.misfire.rows);
    else if (topic === 'armor') h = '<p class="pb-p">' + esc(R.armor.text) + '</p>' + ul(R.armor.tiers.map(function (t) { return '<b>Tier ' + t.tier + '</b> ' + esc(t.name) + (t.die ? ' −' + t.die : ' (no reduction)') + (t.agilityDR ? ' · AGILITY tests DR +' + t.agilityDR : '') + (t.defenseDR ? ' · defense DR +' + t.defenseDR : ''); }))
      + '<p class="pb-p pb-dim">' + esc(R.armor.magic) + '</p>';
    else if (topic === 'luck') { var L = R.devilsLuck; h = ul([esc(L.start), esc(L.recharge)]) + '<div class="pb-sub">Spend 1 Luck to…</div>' + ul(L.uses.map(function (u) { return esc(u.text); })) + '<p class="pb-p pb-dim">' + esc(L.variant) + '</p>'; }
    else if (topic === 'broken') h = '<p class="pb-p">' + esc(R.broken.text) + '</p>' + rowsList(R.broken.rows) + '<p class="pb-p">' + esc(R.death.text) + '</p>';
    else if (topic === 'rest') h = ul(['<b>Short rest</b> (' + esc(R.rest.short.duration) + '): heal ' + esc(R.rest.short.heal) + '.', '<b>Long rest</b> (' + esc(R.rest.long.duration) + '): heal ' + esc(R.rest.long.heal) + '.', esc(R.rest.starvation.text), esc(R.rest.infection.text), '<b>Grog:</b> ' + esc(R.grog.text)]);
    else if (topic === 'reaction') h = '<div class="pb-sub">Reaction 2d6</div>' + rowsList(R.reaction.rows) + '<div class="pb-sub">Morale 2d6</div><p class="pb-p">' + esc(R.morale.text) + '</p>' + ul(R.morale.triggers.map(esc));
    else if (topic === 'experience') { var E = R.experience; h = '<p class="pb-p">' + esc(E.when) + '</p>' + ul(E.steps.map(function (s) { return '<b>' + esc(s.name) + ':</b> ' + esc(s.text); })) + '<div class="pb-sub">Among the dead d6</div>' + rowsList(E.amongTheDead.rows); }
    else if (topic === 'naval') { var N = G('PB_NAVAL_RULES') || {}; h = ul([esc((N.initiative || {}).text || ''), esc(N.crew || ''), esc((N.range || {}).text || ''), esc((N.critical || {}).text || ''), esc((N.fumble || {}).text || ''), esc((N.morale || {}).text || ''), esc((N.scaling || {}).text || '')].filter(Boolean))
      + '<div class="pb-sub">Turn</div>' + ul((N.turnOrder || []).map(function (t) { return esc(t.text); })); }
    var lbl = (RULE_TOPICS.filter(function (x) { return x[0] === topic; })[0] || [topic, topic])[1];
    return card(lbl, 'quick reference', '<div class="pb-rules">' + h + '</div>');
  }

  // ══ Panel driver (window Roll button) ══
  W.pbGenPanel = function (panel) {
    if (!panel) return;
    var kind = panel.dataset.panel, o = out(panel);
    try {
      if (!G('PB_GM_TABLES')) return missing(panel);
      var i, h = '', n = qty(panel);
      if (kind === 'pbnpc') { for (i = 0; i < n; i++) { var p = npc({ gender: val(panel, '.pb-gender', ''), statsAs: val(panel, '.pb-statsas', '') }); if (p) h += npcCard(p); } return put(panel, h); }
      if (kind === 'pbreaction') { for (i = 0; i < n; i++) h += reactionCard(); return put(panel, h); }
      if (kind === 'pbmorale') {
        var mn = val(panel, '.pb-morale-mon', ''), mm = mn ? findMon(mn) : null;
        var mv = mm ? mm.morale : val(panel, '.pb-morale-val', '7');
        for (i = 0; i < n; i++) h += moraleCard(mm ? mm.name : '', morale(mv, val(panel, '.pb-morale-mod', 0)));
        return put(panel, h);
      }
      if (kind === 'pbbroken') { for (i = 0; i < n; i++) h += brokenCard(); return put(panel, h); }
      if (kind === 'pbmisfire') { for (i = 0; i < n; i++) h += misfireCard(); return put(panel, h); }
      if (kind === 'pbdead') { for (i = 0; i < n; i++) h += deadCard(); return put(panel, h); }
      if (kind === 'pbrelic') { for (i = 0; i < n; i++) h += d20Card('relics', 'Ancient Relic', RELIC_NOTE); return put(panel, h); }
      if (kind === 'pbritual') { for (i = 0; i < n; i++) h += d20Card('rituals', 'Arcane Ritual', RITUAL_NOTE); return put(panel, h); }
      if (kind === 'pbmishap') { for (i = 0; i < n; i++) h += d20Card('mishaps', 'Mystical Mishap', MISHAP_NOTE); return put(panel, h); }
      if (kind === 'pbjoker') { for (i = 0; i < n; i++) h += d20Card('joker', 'Joker Table'); return put(panel, h); }
      if (kind === 'pbmaritime') { for (i = 0; i < n; i++) h += maritimeCard(); return put(panel, h); }
      if (kind === 'pbweather') {
        var wk = val(panel, '.pb-weather-kind', 'all'), hex = val(panel, '.pb-hex', 'flat');
        for (i = 0; i < n; i++) {
          if (wk === 'all' || wk === 'weather') h += weatherCard();
          if (wk === 'all' || wk === 'winds') h += windsCard();
          if (wk === 'all' || wk === 'direction') h += windDirCard(hex);
        }
        return put(panel, h);
      }
      if (kind === 'pbplunder') { var sl = Math.max(1, Math.min(20, num(val(panel, '.pb-slots', 2), 2))); for (i = 0; i < n; i++) h += plunderCard(sl); return put(panel, h); }
      if (kind === 'pbtrap') { var full = val(panel, '.pb-trap-mode', 'full') === 'full'; for (i = 0; i < n; i++) h += trapCard(full); return put(panel, h); }
      if (kind === 'pbzombie') { for (i = 0; i < n; i++) h += zombieCard(); return put(panel, h); }
      if (kind === 'pbshanty') {
        var sid = val(panel, '.pb-shanty-pick', ''), Sh = T('shanties'), pk = sid && Sh ? Sh.rows.filter(function (x) { return String(x.roll) === String(sid); })[0] : null;
        for (i = 0; i < n; i++) h += shantyCard(val(panel, '.pb-crewskill', 0), pk);
        return put(panel, h);
      }
      if (kind === 'pbderelict') { for (i = 0; i < n; i++) h += derelictCard(); return put(panel, h); }
      if (kind === 'pbnaval') return put(panel, shipInitCard(navalOpts(panel)), true);
      if (kind === 'pbrules') {
        var tp = val(panel, '.pb-rule-topic', 'all');
        if (tp === 'all') RULE_TOPICS.forEach(function (x) { h += rulesCard(x[0]); }); else h = rulesCard(tp);
        return put(panel, h);
      }
    } catch (e) { if (o) o.innerHTML = '<div class="gen-empty">Could not roll: ' + esc(e.message) + '</div>'; }
  };

  // Inline buttons inside the Pirate Borg panels (delegated; panels are cloned per window).
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-pb]');
    if (!b) return;
    var panel = b.closest('[data-panel]'); if (!panel) return;
    var a = b.getAttribute('data-pb');
    try {
      if (!G('PB_GM_TABLES')) return missing(panel);
      var o = navalOpts(panel);
      if (a === 'init') return put(panel, shipInitCard(o), true);
      if (a === 'ram') return put(panel, ramCard(o, val(panel, '.pbn-hexes', 0)), true);
      if (a === 'morale') return put(panel, shipMoraleCard(o), true);
      if (a === 'derelict') return put(panel, derelictCard(), true);
      if (a === 'wind') return put(panel, windDirCard(o.hex) + windsCard(), true);
      if (a === 'sail') return put(panel, sailCard(o), true);
      if (a === 'shanty') return put(panel, shantyCard(num(o.ship && o.ship.skill, 0) + o.crewMod), true);
      if (a === 'hull') {
        var dm = val(panel, '.pbn-dmg', ''), foe = o.foe, crit = !!val(panel, '.pbn-crit', false);
        if (!dm) return;
        var hd = hullDamage(dm, foe && foe.hull ? foe.hull.die : null, crit);
        return put(panel, card('Hull damage' + (foe ? ' — ' + foe.name : ''), dm + (crit ? ' · crit' : ''), row('Damage', esc(hd.roll.text) + (crit ? ' ×2' : '') + (hd.hull ? ' − hull ' + hd.hull.total + ' (' + foe.hull.die + ')' : '') + ' = <b>' + hd.net + '</b>')
          + (crit && foe && foe.hull ? row('Hull', 'Drops a tier: <b>' + (hd.newHull ? '−' + hd.newHull : 'none') + '</b>') : '') + '<div class="pb-dim" style="font-size:11px;">' + esc(scaleNote()) + '</div>'), true);
      }
      if (a.indexOf('act:') === 0) return put(panel, actionCard(o, a.slice(4)), true);
      if (a === 'clear') { var oo = out(panel); if (oo) oo.innerHTML = '<div class="gen-empty">Cleared.</div>'; return; }
    } catch (err) { var ob = out(panel); if (ob) ob.innerHTML = '<div class="gen-empty">Could not roll: ' + esc(err.message) + '</div>'; }
  });

  // Fill the pickers (ships, monsters with Morale, NPC stat templates, shanties) once the panels exist.
  W.pbPrimePanels = function (root) {
    var R = root || document, M = monsters(), S = ships(), Sh = T('shanties');
    R.querySelectorAll('.pbn-ship, .pbn-foe').forEach(function (s) {
      if (!S.length || s.options.length > 1) return;
      var foe = s.classList.contains('pbn-foe');
      s.innerHTML = (foe ? '<option value="">— none —</option>' : '') + S.map(function (x, i) { return '<option' + ((!foe && x.id === 'sloop') || (foe && false) ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('');
      if (foe) { var fl = S.filter(function (x) { return x.id === 'fluyt'; })[0]; if (fl) s.value = fl.name; }
    });
    R.querySelectorAll('.pb-morale-mon').forEach(function (s) { if (M.length && s.options.length <= 1) s.insertAdjacentHTML('beforeend', M.filter(function (m) { return m.morale != null; }).map(function (m) { return '<option>' + esc(m.name) + '</option>'; }).join('')); });
    R.querySelectorAll('.pb-statsas').forEach(function (s) { if (M.length && s.options.length <= 1) s.insertAdjacentHTML('beforeend', M.filter(function (m) { return m.category === 'npc'; }).map(function (m) { return '<option>' + esc(m.name) + '</option>'; }).join('')); });
    R.querySelectorAll('.pb-shanty-pick').forEach(function (s) { if (Sh && s.options.length <= 1) s.insertAdjacentHTML('beforeend', Sh.rows.map(function (x) { return '<option value="' + x.roll + '">' + x.roll + '. ' + esc(x.name) + '</option>'; }).join('')); });
  };

  W.PB_GM = {
    dice: dice, rollInline: rollInline, test: test, rowFor: rowFor, rollTable: rollTable, rollRows: rollRows, rollCols: rollCols,
    name: name, reaction: reaction, npc: npc, morale: morale, startingWeapon: startingWeapon, relic: relic, ritual: ritual,
    plunder: plunderRoll, trap: trap, windDir: windDir, derelict: derelict, shanty: shanty,
    crewAction: crewAction, hullDamage: hullDamage, shipMorale: shipMorale, pointOfSail: pointOfSail, sailSpeed: sailSpeed,
    monsters: monsters, ships: ships, findMon: findMon, findShip: findShip, armorText: armorText, moraleText: moraleText,
    body: body, rangeText: rangeText, ruleTopics: RULE_TOPICS
  };
})();
