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
  // Roll a PB_GM_TABLES table. 2d6 / 3d6 tables sum the dice; dN tables roll N;
  // d66 tables roll two d6 read as tens and units (11–66) and look the code up in
  // the rows — never the row index. A multi-column table that is rolled one die
  // per column (carousing "4d20", the jungle's 4 columns) goes through rollAny.
  function rollTable(t, dieOverride) {
    if (!t || !t.rows || !t.rows.length) return null;
    var die = String(dieOverride || t.die || 'd6').toLowerCase();
    var d = dice(die), v = d.total, rw = rowFor(t.rows, v);
    if (!rw) {
      // Out-of-range result (e.g. a d66 code a sparse table lacks): clamp to the nearest row.
      var lo = Infinity, hi = -Infinity;
      t.rows.forEach(function (x) { var a = Array.isArray(x.roll) ? x.roll : [x.roll, x.roll]; lo = Math.min(lo, +a[0]); hi = Math.max(hi, +(a[1] == null ? a[0] : a[1])); });
      rw = rowFor(t.rows, Math.max(lo, Math.min(hi, v))) || t.rows[0];
    }
    return { table: t, roll: v, die: die, dice: d.dice, code: /d66/.test(die) ? '' + d.dice.join('') : String(v), row: rw };
  }
  function rollRows(key) { return rollTable(T(key)); }
  // One die on each column of a column table (trap details, names, wind, carousing,
  // alchemy "random", jungle points). d66 columns roll tens + units.
  function rollColsOf(t) {
    if (!t || !t.columns) return null;
    return t.columns.map(function (c) {
      var v, label, n = (c.values || []).length;
      if (/d66/i.test(c.die)) { var a = r(6), b = r(6); v = (a - 1) * 6 + (b - 1) + 1; label = '' + a + b; }
      else { v = r(num(String(c.die).replace(/^\d*d/i, ''), n) || n); label = String(v); }
      return { die: c.die, name: c.name, roll: label, n: v, value: c.values[Math.min(n, v) - 1] || '' };
    });
  }
  function rollCols(key) { return rollColsOf(T(key)); }
  // Any table: { kind: 'row', x } (one roll, read across) or { kind: 'cols', cols }
  // (one die per column). Column-per-die when the table says so (`dice` like
  // "4d20", or it has columns and no rows), or when asked (mode 'cols').
  function rollAny(t, mode) {
    if (!t) return null;
    var hasRows = t.rows && t.rows.length, hasCols = t.columns && t.columns.length;
    var perCol = hasCols && (mode === 'cols' || !hasRows || (mode !== 'row' && t.dice && /^\d+d/i.test(String(t.dice)) && num(String(t.dice).split('d')[0], 1) === t.columns.length));
    if (perCol) return { kind: 'cols', table: t, cols: rollColsOf(t) };
    var x = rollTable(t); return x ? { kind: 'row', table: t, x: x } : null;
  }
  function rangeText(x) { return Array.isArray(x) ? (x[0] === x[1] ? String(x[0]) : x[0] + '–' + x[1]) : String(x); }
  // A row's text without its leading "Name: " (the card already shows the name).
  function body(row) { var t = String((row && row.text) || ''); var n = row && row.name; return n && t.indexOf(n + ':') === 0 ? t.slice(n.length + 1).trim() : t; }

  // ── Card helpers (the GM Screen's .gen-card look) ──
  function card(name, tag, inner, extra, attrs) {
    return '<div class="gen-card pb-gen-card' + (extra ? ' ' + extra : '') + '"' + (attrs || '') + '><div class="gen-card-header"><span class="gen-card-name">' + esc(name) + '</span>'
      + (tag ? '<span class="gen-card-tag">' + esc(tag) + '</span>' : '') + '</div>' + (inner || '') + '</div>';
  }
  // Row labels use the Alchemy accent font, which has old-style numerals — dice and
  // numbers inside a label are set in EB Garamond (.pb-nf) so "d12 11" stays legible.
  function row(label, html) { return '<div class="gen-card-row"><span class="gen-card-row-label">' + esc(label).replace(/(\d*d\d+|\d+)/g, '<span class="pb-nf">$1</span>') + '</span><span>' + html + '</span></div>'; }
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
  // Generated foes (Pirate Generator, Make Your Own Enemies) and ships (Ships at
  // Sea, captains' fleets) are kept for the session in window.__PB_GEN_MONSTERS /
  // __PB_GEN_SHIPS so "→ Tracker" and the naval panel can find them by name.
  W.__PB_GEN_MONSTERS = W.__PB_GEN_MONSTERS || [];
  W.__PB_GEN_SHIPS = W.__PB_GEN_SHIPS || [];
  function monsters() {
    return arr(G('PB_MONSTERS')).concat(arr(W.__PB_HB_MONSTERS).map(function (m) { return Object.assign({ homebrew: true }, m); }), arr(W.__PB_GEN_MONSTERS));
  }
  // Base ships (PB_SHIPS + pb-ship homebrew) — what templates are laid over.
  function baseShips() { return arr(G('PB_SHIPS')).concat(arr(W.__PB_HB_SHIPS).map(function (s) { return Object.assign({ homebrew: true }, s); })); }
  // Every vessel the GM can pick: the base ships, the Archetype Captains' fleets
  // (each template on each of its listed base ships), the Naval Combat forms of the
  // big sea monsters, and anything generated this session.
  function ships() { return baseShips().concat(fleetShips(), navalForms(), arr(W.__PB_GEN_SHIPS)); }
  function findMon(name) { return monsters().filter(function (m) { return m.name === name || m.id === name; })[0] || null; }
  function findShip(name) { return ships().filter(function (s) { return s.name === name || s.id === name; })[0] || null; }
  function findBase(id) { return baseShips().filter(function (s) { return s.id === id || s.name === id; })[0] || null; }

  // ── Ship templates (PB_SHIP_TEMPLATES): "use the base stats of another vessel" ──
  var DIE_UP = { d2: 'd4', d4: 'd6', d6: 'd8', d8: 'd10', d10: 'd12', d12: 'd12' }, DIE_DN = { d12: 'd10', d10: 'd8', d8: 'd6', d6: 'd4', d4: 'd2', d2: 'd2' };
  function stepDie(expr, n) {
    if (!expr || !n) return expr;
    return String(expr).replace(/d(\d+)/g, function (a) { var d = a; for (var i = 0; i < Math.abs(n); i++) d = (n > 0 ? DIE_UP : DIE_DN)[d] || d; return d; });
  }
  function templates() { return arr(G('PB_SHIP_TEMPLATES')); }
  function tplById(id) { return templates().filter(function (t) { return t.id === id; })[0] || null; }
  function applyTemplate(base, tpl) {
    if (!base || !tpl) return base;
    var s = JSON.parse(JSON.stringify(base)), chain = [], traits = [];
    if (tpl.template) { var b = tplById(tpl.template); if (b) chain.push(b); }
    chain.push(tpl);
    chain.forEach(function (t) {
      arr(t.traits).forEach(function (tr) {
        traits.push(tr);
        if (tr.attackDieStep) { s.broadsides = stepDie(s.broadsides, tr.attackDieStep); s.smallArms = stepDie(s.smallArms, tr.attackDieStep); s.ram = stepDie(s.ram, tr.attackDieStep); if (s.statText) Object.keys(s.statText).forEach(function (k) { s.statText[k] = stepDie(s.statText[k], tr.attackDieStep); }); }
        if (tr.hullTier) s.hull = s.hull ? { tier: (s.hull.tier || 0) + tr.hullTier, die: stepDie(s.hull.die, tr.hullTier) } : { tier: 1, die: 'd2' };
        if (tr.windImmune) s.windImmune = true;
        if (tr.cheatDeath) s.cheatDeath = tr.cheatDeath;
        if (tr.terrifying) s.terrifying = true;
        if (tr.underwaterSpeed) s.underwaterSpeed = tr.underwaterSpeed;
        if (tr.heal) s.crewHeal = tr.heal;
      });
    });
    s.id = tpl.id + ':' + base.id;
    s.name = base.name + ' — ' + tpl.name.replace(/\s*\(.*\)$/, '');
    s.base = base.name; s.baseId = base.id; s.template = tpl.id; s.templateName = tpl.name; s.traits = traits;
    s.undead = chain.some(function (t) { return t.undead; });
    if (tpl.captain) s.captain = tpl.captain;
    s.baseSpecial = base.special || '';
    s.special = [base.special].concat(traits.map(function (t) { return t.name + ': ' + t.text; })).filter(Boolean).join(' · ');
    s.text = [tpl.text, base.text].filter(Boolean).join(' ');
    s.source = tpl.source || base.source; s.page = tpl.page || base.page;
    return s;
  }
  var _fleet = null;
  function fleetShips() {
    if (_fleet && _fleet.n === baseShips().length) return _fleet.list;
    var list = [];
    templates().forEach(function (t) { arr(t.baseShips).forEach(function (id) { var b = findBase(id); if (b) list.push(Object.assign(applyTemplate(b, t), { fleet: true })); }); });
    _fleet = { n: baseShips().length, list: list };
    return list;
  }
  // A sea monster's Naval Combat block as a ship-shaped stat line (hull = its armor).
  function navalForm(m) {
    var n = m && m.naval; if (!n) return null;
    return { id: 'naval:' + m.id, name: m.name + ' (naval)', type: 'sea monster', seaMonster: true, monster: m.id,
      hp: n.hp, hull: n.armor && n.armor.die ? { tier: n.armor.tier || 1, die: n.armor.die } : null, hullName: n.armor ? n.armor.name : '',
      agility: n.agility, speed: n.speed, skill: null, morale: n.morale, broadsides: null, smallArms: null, ram: null,
      navalAttacks: arr(n.attacks), windImmune: true, crew: null, cargo: null,
      special: 'Sea monster: not affected by wind; moves up to its speed in any direction.', text: m.text || '', source: m.source, page: m.page };
  }
  var _naval = null;
  function navalForms() { var M = arr(G('PB_MONSTERS')); if (_naval && _naval.n === M.length) return _naval.list; _naval = { n: M.length, list: M.filter(function (m) { return m.naval; }).map(navalForm) }; return _naval.list; }
  function uniqueName(name, list) { var n = name, i = 2; while (list.some(function (x) { return x.name === n; })) n = name + ' ' + (i++); return n; }
  function registerMon(m) { W.__PB_GEN_SEQ = (W.__PB_GEN_SEQ || 0) + 1; m.name = uniqueName(m.name, monsters()); m.generated = true; m.homebrew = false; W.__PB_GEN_MONSTERS.push(m); if (W.__PB_GEN_MONSTERS.length > 60) W.__PB_GEN_MONSTERS.shift(); return m; }
  function registerShip(s) { W.__PB_GEN_SEQ = (W.__PB_GEN_SEQ || 0) + 1; s.name = uniqueName(s.name, ships()); s.generated = true; W.__PB_GEN_SHIPS.push(s); if (W.__PB_GEN_SHIPS.length > 40) W.__PB_GEN_SHIPS.shift(); try { W.pbPrimePanels && W.pbPrimePanels(); } catch (e) {} return s; }
  function armorText(a) { return a && a.die ? '−' + a.die + (a.name ? ' (' + a.name + ')' : '') : 'none'; }
  function moraleText(m) { return m == null || m === '' ? '–' : String(m); }
  function monLine(m) {
    if (!m) return '';
    var dr = m.dr || {};
    return '<b>' + esc(m.name) + '</b> — HP ' + esc(m.hpText ? m.hpText + (m.hpDice ? ' (~' + m.hp + ')' : '') : m.hp) + ' · Morale ' + esc(m.moraleText || moraleText(m.morale)) + ' · Armor ' + esc(armorText(m.armor))
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
    var mo = (typeof motivation === 'function') ? motivation() : null;
    return { name: n, reaction: re, stats: stats, motivation: mo };
  }
  function npcCard(o) {
    var n = o.name, re = o.reaction;
    var json = esc(JSON.stringify({ name: n.full, demeanor: re ? re.text : '', occupation: o.stats ? o.stats.name : 'Pirate', quirk: 'Called ' + n.nicknames.join(' / ') + (o.motivation ? '; driven by ' + o.motivation.text : '') }));
    return card(n.full, 'd66 ×4' + (re ? ' · 2d6 ' + re.roll : ''),
      row('Name', '<b>' + esc(n.first) + ' ' + esc(n.surname) + '</b>')
      + row('Nicknames', esc(n.nicknames.join(' · ')))
      + (re ? row('Reaction', '<b>' + esc(re.text) + '</b> <span class="pb-dim">(2d6 ' + re.roll + ')</span>') : '')
      + (o.motivation ? row('Motivation', '<b>' + esc(cap(o.motivation.text)) + '</b> <span class="pb-dim">(d20 ' + o.motivation.roll + ')</span>') : '')
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
    var st = s.statText || {};
    if (s.seaMonster) return '<b>' + esc(s.name) + '</b> — HP ' + s.hp + ' · Morale ' + moraleText(s.morale) + ' · ' + (s.hull ? esc(s.hullName || 'Armor') + ' −' + s.hull.die : 'no armor') + ' · Speed ' + s.speed + ' · AGL ' + sgn(s.agility)
      + '<br><span class="pb-dim">' + esc(arr(s.navalAttacks).map(function (a) { return a.name + (a.damage ? ' ' + a.damage : '') + (a.notes ? ' (' + a.notes + ')' : ''); }).join(' · ')) + ' — ' + esc(s.special) + '</span>';
    return '<b>' + esc(s.name) + '</b> — HP ' + s.hp + ' · Hull ' + (s.hull ? '−' + s.hull.die : '—') + ' · AGL ' + (s.agility == null ? '—' : sgn(s.agility)) + ' · Speed ' + s.speed
      + ' · Skill ' + (s.skill == null ? '—' : sgn(s.skill))
      + '<br><span class="pb-dim">' + esc(['Broadsides ' + (s.broadsides ? (s.broadsidesAttacks > 1 ? s.broadsidesAttacks + ' × ' : '') + s.broadsides : '—'), 'Small arms ' + (s.smallArms ? (s.smallArmsAttacks > 1 ? s.smallArmsAttacks + ' × ' : '') + s.smallArms : '—'), 'Ram ' + (s.ram || '—'), s.crew ? 'Crew ' + s.crew.min + '–' + s.crew.max : '', s.cargo != null ? 'Cargo ' + s.cargo : ''].filter(Boolean).join(' · ')) + '</span>'
      + ((s.traits ? s.baseSpecial : s.special) ? '<br><span class="pb-dim">' + esc(s.traits ? s.baseSpecial : s.special) + '</span>' : '')
      + (s.traits ? '<br><span class="pb-dim">' + esc(s.templateName) + ': ' + esc(s.traits.map(function (t) { return t.name; }).join(', ')) + '</span>' : '');
  }
  // d8: an Inquisitor's Old World Hull on a galleon (−d6 one tier up).
  var HULL_DOWN = { d8: 'd6', d6: 'd4', d4: 'd2', d2: null };
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

  // ════════════════════════════════════════════════════════════════════════════
  // CORE RULES GENERATORS (pg. 2-3, 10, 25, 70-71, 79, 85-91, 108-127, 128-161)
  // ════════════════════════════════════════════════════════════════════════════
  // A table row's text plus whatever it points at: nested d-rolls ("[d6]", "d4
  // adrift sailors" durations), a sub-table, a named creature or ship (with a
  // → Tracker button), a hidden part, a test. Returns { html, acts }.
  function tableByKey(k) {
    var map = { cargo: 'cargoMundane', treasureMaps: null, derelictShip: null, pirateGenerator: null };
    return T(map[k] !== undefined ? map[k] : k);
  }
  function subRoll(key) {
    // A row that says "roll on table X": relics/rituals/shanties/bombs/things/cargoSpecial …
    if (key === 'bombs') { var B = arr(G('PB_BOMBS')); var b = pick(B); return b ? { label: 'Bomb', html: '<b>' + esc(b.name) + '</b>' + (b.damage ? ' ' + esc(b.damage) : '') + (b.effect ? ' — ' + esc(b.effect) : '') } : null; }
    if (key === 'things') { var Th = arr(G('PB_THINGS')); var t = pick(Th); return t ? { label: 'Thing of importance', html: esc(t.text || t.name || '') } : null; }
    if (key === 'treasureMaps') return { label: 'Treasure map', html: '<span class="pb-dim">Use the Treasure Map generator.</span>' };
    if (key === 'derelictShip') return { label: 'Derelict', html: '<span class="pb-dim">Use the Derelict Ship generator.</span>' };
    if (key === 'pirateGenerator') { var p = pirate(); if (p) registerMon(p.mon); return p ? { label: 'Pirate (3d12)', html: monLine(p.mon) + ' <span class="pb-dim">— ' + esc(p.desc) + '</span> ' + sendBtn(p.mon) } : null; }
    if (key === 'alchemy') { var a = potion('fast'); return a ? { label: 'Potion', html: esc(a.summary) } : null; }
    var tb = tableByKey(key); if (!tb || !tb.rows) return null;
    var x = rollTable(tb); if (!x) return null;
    return { label: (tb.name || key) + ' ' + x.die + ' ' + x.code, html: (x.row.name ? '<b>' + esc(x.row.name) + '</b> — ' : '') + esc(rollInline(body(x.row))) };
  }
  // "[d6]", "[2d6]", "[d8 x 10]", "[d100 barrels]" inside a line → the rolled number.
  function rollBrackets(s) {
    return String(s || '').replace(/\[(\d*d\d+)(?:\s*[x×]\s*(\d+))?([^\]]*)\]/gi, function (all, d, mul, rest) {
      var v = dice(d).total * (mul ? +mul : 1); return '[' + d + (mul ? ' × ' + mul : '') + rest + ' → ' + v + ']';
    });
  }
  function rowExtras(rw) {
    var h = '', acts = '';
    if (!rw) return { html: '', acts: '' };
    if (rw.hidden) h += row('Unnoticed', '<i class="pb-dim">' + esc(rw.hidden) + '</i>');
    if (rw.sub && rw.sub.rows) { var s = rollTable(rw.sub); if (s) h += row('Sub-roll ' + rw.sub.die + ' ' + s.roll, esc(s.row.text)); }
    if (rw.table) { var sr = subRoll(rw.table); if (sr) h += row(sr.label, sr.html); }
    if (rw.test && rw.test.ability) h += row('Test', esc(rw.test.ability + ' DR' + rw.test.dr));
    if (rw.monster) { var m = findMon(rw.monster); if (m) { h += row('Creature', monLine(m)); acts += sendBtn(m); } }
    if (rw.captain) { var C = arr(G('PB_CAPTAINS')).filter(function (c) { return c.id === rw.captain; })[0]; var cm = C && findMon(C.captain); if (cm) { h += row('Captain', monLine(cm)); acts += sendBtn(cm); } }
    var shipIds = rw.ships ? rw.ships : rw.ship ? [rw.ship] : [];
    shipIds.forEach(function (id) {
      var sh = findBase(id);
      if (!sh) { var tp = tplById(id); if (tp) { var base = findBase(pick(tp.baseShips && tp.baseShips.length ? tp.baseShips : ['galleon', 'brigantine', 'frigate', 'fluyt'])); if (base) sh = registerShip(applyTemplate(base, tp)); } }
      if (sh) { h += row('Ship', shipLine(sh)); acts += sendBtn(sh); }
    });
    return { html: h, acts: acts };
  }
  function actions(acts) { return acts ? '<div class="gen-card-actions">' + acts + '</div>' : ''; }
  function noteDiv(t) { return t ? '<div class="pb-dim" style="font-size:11px;margin-top:4px;">' + esc(t) + '</div>' : ''; }
  // One table's result as rows of a card.
  function tableRows(t, mode) {
    var res = rollAny(t, mode); if (!res) return { html: '', acts: '' };
    if (res.kind === 'cols') {
      return { html: res.cols.map(function (c) { return row(c.name + ' ' + c.die + ' ' + c.roll, esc(rollInline(rollBrackets(c.value)))); }).join(''), acts: '', cols: res.cols };
    }
    var x = res.x, rw = x.row, ex = rowExtras(rw);
    return { html: row(t.name + ' ' + x.die + ' ' + x.code, (rw.name ? '<b>' + esc(rw.name) + '</b> — ' : '') + esc(rollInline(rollBrackets(body(rw)))) + (rw.answer ? '<br><span class="pb-dim">GM: ' + esc(rw.answer) + '</span>' : '')) + ex.html, acts: ex.acts, x: x };
  }

  // ── A card per PB_GM_TABLES group (pbtables) ──
  var GUIDE_GROUP = 'Guidebook & Trapped in the Tropics';
  function groupOf(t) { return t.group || GUIDE_GROUP; }
  function groups() {
    var Tb = G('PB_GM_TABLES') || {}, seen = [], order = [];
    Object.keys(Tb).forEach(function (k) { var g = groupOf(Tb[k]); if (seen.indexOf(g) < 0) { seen.push(g); order.push(g); } });
    return order.filter(function (g) { return g !== GUIDE_GROUP; }).concat(order.indexOf(GUIDE_GROUP) >= 0 ? [GUIDE_GROUP] : []);
  }
  function groupTables(g) { var Tb = G('PB_GM_TABLES') || {}; return Object.keys(Tb).filter(function (k) { return groupOf(Tb[k]) === g; }); }
  function groupCard(g, key) {
    var keys = key ? [key] : groupTables(g); if (!keys.length) return '';
    var h = '', acts = '', srcT = null;
    keys.forEach(function (k) { var t = T(k); if (!t) return; srcT = srcT || t; var r_ = tableRows(t); h += r_.html; acts += r_.acts; });
    var one = key ? T(key) : null;
    return card(one ? one.name : g, one ? one.die + (one.dice ? ' (' + one.dice + ')' : '') : keys.length + (keys.length === 1 ? ' table' : ' tables'), h + actions(acts) + (one ? noteDiv(one.note) : '') + src(srcT));
  }

  // ── Pirate Generator (pg. 124-125) ──
  function pirate(opts) {
    opts = opts || {};
    var P = G('PB_PIRATE_GEN'); if (!P) return null;
    var d = [r(12), r(12), r(12)], A = rowFor(P.tableA.rows, d[0]), B = rowFor(P.tableB.rows, d[1]), C = rowFor(P.tableC.rows, d[2]);
    var hi = Math.max.apply(null, d), lo = Math.min.apply(null, d);
    // Whichever table rolled highest sets the armor (a tie goes to the later table).
    var hiT = d[2] === hi ? 'C' : d[1] === hi ? 'B' : 'A';
    var armor = P.procedure.armorByHighestTable[hiT] || null;
    var hp = (lo + 2) * (opts.mighty ? 2 : 1);
    var n = name(opts.gender), silver = 0;
    if (n) n.cols.forEach(function (c) { silver = Math.max(silver, num(c.roll, 0)); });
    var wName = String(C.text).replace(/\s*\[.*\]\s*$/, '');
    var atk = { name: cap(wName), damage: C.damage || null, notes: C.closeDamage ? C.closeDamage + ' up close' + (C.blackPowder ? '; black powder' : '') : (C.blackPowder ? 'black powder — ignores armor' : '') };
    var an = function (w) { return /^[aeiou]/i.test(w) ? 'an ' : 'a '; }, wpn = C.text.replace(/\s*\[.*\]\s*$/, '');
    var desc = cap(an(A.text)) + A.text + ' with ' + B.text + ' wielding ' + (/^pair /.test(wpn) ? 'a ' : an(wpn)) + wpn + '.';
    var mon = { id: 'gen-pirate-' + Date.now().toString(36) + r(999), name: n ? n.full : 'Pirate', category: 'npc', group: 'Generated',
      hp: hp, morale: hi, armor: armor ? { name: '', die: armor.die, tier: armor.tier } : null, attacks: [atk], specials: [],
      blackPowder: !!C.blackPowder, text: desc, source: 'Core Rules', page: 124, silver: silver };
    return { dice: d, A: A, B: B, C: C, hiT: hiT, hp: hp, morale: hi, armor: armor, name: n, silver: silver, mon: mon, desc: desc, mighty: !!opts.mighty };
  }
  function pirateCard(opts) {
    var p = pirate(opts); if (!p) return '';
    registerMon(p.mon);
    var social = esc(JSON.stringify({ name: p.mon.name, demeanor: '', occupation: 'Pirate', quirk: p.desc }));
    return card(p.mon.name, '3d12 ' + p.dice.join(' · ') + (p.mighty ? ' · mighty' : ''),
      '<div class="pb-p" style="margin:2px 0 6px;font-size:13px;">' + esc(p.desc) + '</div>'
      + row('Table A d12 ' + p.dice[0], esc(p.A.text)) + row('Table B d12 ' + p.dice[1], esc(p.B.text)) + row('Table C d12 ' + p.dice[2], esc(p.C.text))
      + hr()
      + row('HP', '<b>' + p.hp + '</b> <span class="pb-dim">(lowest die ' + Math.min.apply(null, p.dice) + ' + 2' + (p.mighty ? ', ×2 mighty' : '') + ')</span>')
      + row('Morale', '<b>' + p.morale + '</b> <span class="pb-dim">(highest die)</span>')
      + row('Armor', p.armor ? '<b>−' + esc(p.armor.die) + '</b> <span class="pb-dim">(Table ' + p.hiT + ' rolled highest)</span>' : 'none <span class="pb-dim">(Table A rolled highest)</span>')
      + row('Attack', esc(p.mon.attacks[0].name) + ' <b>' + esc(p.mon.attacks[0].damage || '') + '</b>' + (p.mon.attacks[0].notes ? ' <span class="pb-dim">' + esc(p.mon.attacks[0].notes) + '</span>' : ''))
      + row('Silver', '<b>' + p.silver + 's</b> <span class="pb-dim">(highest name roll)</span>')
      + (p.name ? '<div class="pb-dim" style="font-size:11px;margin-top:4px;">' + p.name.cols.map(function (x) { return x.name.replace(/\s*\(.*\)$/, '') + ' ' + x.roll; }).join(' · ') + '</div>' : '')
      + '<div class="gen-card-actions">' + sendBtn(p.mon) + '<button class="btn small ghost gen-send-social">Send to Social</button></div>', '', ' data-npc="' + social + '"');
  }

  // ── Make Your Own Enemies (pg. 91) ──
  function enemy(opts) {
    opts = opts || {};
    var E = G('PB_ENEMY_BUILDER'); if (!E) return null;
    var tb = E.tables, rolls = {};
    ['hp', 'morale', 'armor', 'damage'].forEach(function (k) { rolls[k] = rollTable(tb[k]); });
    var nSp = Math.max(0, Math.min(3, num(opts.specials, 1))), sp = [], used = {};
    for (var i = 0; i < nSp; i++) { var x = rollTable(tb.special), guard = 0; while (used[x.roll] && guard++ < 10) x = rollTable(tb.special); used[x.roll] = 1; sp.push(x); }
    var hpR = rolls.hp.row.hp || [1, 6], hp = hpR[1] == null ? hpR[0] + r(20) - 1 : hpR[0] + r(hpR[1] - hpR[0] + 1) - 1;
    var dr = {}, aPR = 1, specials = [], relics = [];
    sp.forEach(function (x) {
      var rw = x.row;
      if (rw.dr) dr = Object.assign({}, rw.dr);
      if (rw.attacksPerRound) aPR = rw.attacksPerRound;
      var txt = body(rw);
      if (rw.table === 'relics') { var c = dice('d2').total; for (var j = 0; j < c; j++) { var rl = relic(); if (rl) relics.push(rl.name); } txt += ' — ' + relics.join(', '); }
      if (rw.table === 'rituals') { var rt = ritual(); if (rt) txt += ' — ' + rt.name; }
      specials.push({ name: rw.name, text: txt });
    });
    var dmg = rolls.damage.row.damage, bp = !!rolls.damage.row.blackPowder;
    var nm = String(opts.name || '').trim() || 'Custom enemy';
    var mon = { id: 'gen-enemy-' + Date.now().toString(36) + r(999), name: nm, category: 'monster', group: 'Generated', hp: hp,
      morale: rolls.morale.row.morale == null ? null : rolls.morale.row.morale, armor: rolls.armor.row.armor || null,
      attacks: [{ name: 'Attack', damage: dmg, notes: bp ? 'black powder: ignores armor, Reload 2' : '' }], specials: specials, blackPowder: bp,
      attacksPerRound: aPR > 1 ? aPR : undefined, dr: (dr.attack || dr.defend) ? dr : undefined,
      text: [rolls.hp.row.text, rolls.damage.row.text].map(function (t) { return String(t).replace(/^[^:]*:\s*/, ''); }).join(' '), source: 'Core Rules', page: 91 };
    return { rolls: rolls, sp: sp, mon: mon };
  }
  function enemyCard(opts) {
    var e = enemy(opts); if (!e) return '';
    registerMon(e.mon);
    var R_ = e.rolls, h = row('HP d10 ' + R_.hp.roll, '<b>' + e.mon.hp + '</b> — ' + esc(R_.hp.row.text.replace(/^HP [^:]*:\s*/, '')))
      + row('Morale 2d6 ' + R_.morale.roll, '<b>' + moraleText(e.mon.morale) + '</b> — ' + esc(R_.morale.row.text.replace(/^Morale [^:]*:\s*/, '')))
      + row('Armor d4 ' + R_.armor.roll, esc(R_.armor.row.text))
      + row('Damage d12 ' + R_.damage.roll, esc(R_.damage.row.text));
    e.sp.forEach(function (x, i) { h += row('Special d10 ' + x.roll, '<b>' + esc(e.mon.specials[i].name) + '</b> — ' + esc(e.mon.specials[i].text.replace(/^[^:]*:\s*/, ''))); });
    return card(e.mon.name, 'd10 · 2d6 · d4 · d12 · d10', h + hr() + row('Block', monLine(e.mon)) + actions(sendBtn(e.mon)) + noteDiv(G('PB_ENEMY_BUILDER').note) + src(G('PB_ENEMY_BUILDER')));
  }

  // ── Ships at Sea (pg. 114) → a ship card from PB_SHIPS, optional template ──
  function shipAtSea(opts) {
    opts = opts || {};
    var S = G('PB_SHIPS_AT_SEA'); if (!S) return null;
    var vc = rollTable(S.vesselClass), arm = rollTable(S.armament), cq = rollTable(S.crewQuantity), ql = rollTable(S.crewQuality), nm = rollTable(S.name);
    var base = findBase(opts.base || vc.row.ship); if (!base) return null;
    var s = JSON.parse(JSON.stringify(base));
    if (arm.row.weapons === 'none') { s.broadsides = null; s.smallArms = null; s.broadsidesAttacks = 0; s.smallArmsAttacks = 0; if (s.statText) { delete s.statText.broadsides; delete s.statText.smallArms; } }
    if (arm.row.attackDieStep) { s.broadsides = stepDie(s.broadsides, arm.row.attackDieStep); s.smallArms = stepDie(s.smallArms, arm.row.attackDieStep); if (s.statText) Object.keys(s.statText).forEach(function (k) { s.statText[k] = stepDie(s.statText[k], arm.row.attackDieStep); }); }
    if (arm.row.broadsidesMultiplier && s.broadsides) { s.broadsidesAttacks = (s.broadsidesAttacks || 1) * arm.row.broadsidesMultiplier; if (s.statText && s.statText.broadsides) s.statText.broadsides = s.broadsidesAttacks + ' @ ' + s.broadsides; }
    var crewN = null;
    if (s.crew) { var cm = cq.row.crewMultiplier; crewN = cm === 'max' ? s.crew.max : Math.max(1, Math.round(s.crew.min * (cm || 1))); if (cm !== 'max' && cm > 1) crewN = Math.min(s.crew.max, Math.max(crewN, Math.round((s.crew.min + s.crew.max) / 2))); }
    var tplId = opts.template || '';
    if (tplId === 'random') tplId = pick(['ghost-ship', 'ship-of-bone', 'vessel-from-the-deep']);
    var tpl = tplId ? tplById(tplId) : null;
    if (tpl) s = applyTemplate(s, tpl);
    var shipName = nm.row.text;
    s.name = '"' + shipName + '" (' + base.name + (tpl ? ', ' + tpl.name.replace(/\s*\(.*\)$/, '') : '') + ')';
    s.id = 'gen-ship-' + Date.now().toString(36) + r(999);
    s.shipName = shipName; s.armament = arm.row.text; s.crewNote = cq.row.text + (crewN != null ? ' (' + crewN + ' aboard)' : ''); s.crewQuality = ql.row.text; s.aboard = crewN;
    return { ship: s, base: base, tpl: tpl, rolls: { vc: vc, arm: arm, cq: cq, ql: ql, nm: nm } };
  }
  function tplTraitHtml(s) {
    var h = '', acts = '';
    arr(s.traits).forEach(function (tr) {
      h += row(tr.name, esc(tr.text));
      arr(tr.monsters).forEach(function (mm) { var id = typeof mm === 'string' ? mm : mm.id, m = findMon(id); if (m) { acts += sendBtn(m); } });
      if (tr.summon) { var sr = rollTable(tr.summon), sm = sr && sr.row.monster ? findMon(sr.row.monster) : null; h += row('Summon d6 ' + sr.roll, esc(sr.row.text) + ' <span class="pb-dim">(' + esc(tr.summon.actions) + ' crew actions → ' + dice(tr.summon.actions).total + ')</span>'); if (sm) acts += sendBtn(sm); }
    });
    return { html: h, acts: acts };
  }
  function shipAtSeaCard(opts) {
    var x = shipAtSea(opts); if (!x) return '';
    var s = registerShip(x.ship), R_ = x.rolls, tt = tplTraitHtml(s);
    return card(s.name, 'd10 · d6 · d6 · 2d6 · d66',
      row('Vessel d10 ' + R_.vc.roll, esc(x.base.name) + (opts && opts.base ? ' <span class="pb-dim">(chosen)</span>' : ''))
      + row('Armament d6 ' + R_.arm.roll, esc(R_.arm.row.text)) + row('Crew d6 ' + R_.cq.roll, esc(s.crewNote)) + row('Quality 2d6 ' + R_.ql.roll, esc(R_.ql.row.text))
      + row('Name d66 ' + R_.nm.code, '<b>' + esc(s.shipName) + '</b>') + hr() + row('Ship', shipLine(s)) + tt.html
      + actions(sendBtn(s) + tt.acts) + noteDiv(G('PB_SHIPS_AT_SEA').note) + src(G('PB_SHIPS_AT_SEA')));
  }

  // ── Archetype Captains and their fleets (pg. 110-113) ──
  function captainCard(id, crewN) {
    var CP = arr(G('PB_CAPTAINS')); var c = id ? CP.filter(function (x) { return x.id === id; })[0] : pick(CP); if (!c) return '';
    var cap_ = findMon(c.captain), offs = c.officers.map(findMon).filter(Boolean), crew = c.crew.map(findMon).filter(Boolean);
    var tpl = tplById(c.ships), base = findBase(pick(c.vessels)), ship = tpl && base ? registerShip(Object.assign(applyTemplate(base, tpl), { name: base.name + ' — ' + tpl.name.replace(/\s*\(.*\)$/, '') + ' (' + c.name.replace(/^The /, '') + ')' })) : null;
    var n = Math.max(0, Math.min(20, num(crewN, 4))), names = [];
    if (cap_) names.push(cap_.name); if (offs[0]) names.push(offs[0].name); for (var i = 0; i < n; i++) if (crew.length) names.push(crew[i % crew.length].name);
    var tt = ship ? tplTraitHtml(ship) : { html: '', acts: '' };
    var F = c.faction ? arr(G('PB_FACTIONS')).filter(function (f) { return f.id === c.faction; })[0] : null;
    return card(c.name, (F ? F.name + ' · ' : '') + 'pg. ' + c.page,
      '<div class="pb-p" style="margin:2px 0 6px;font-size:13px;">' + esc(c.text) + '</div>'
      + (cap_ ? row('Captain', monLine(cap_)) : '') + offs.map(function (o) { return row('Officers', monLine(o)); }).join('') + crew.map(function (o) { return row('Crew', monLine(o) + (o.attackChoice ? ' <span class="pb-dim">(pick 1-2 weapons)</span>' : '')); }).join('')
      + row('Aboard', esc(c.aboard)) + hr() + (ship ? row('Flagship d' + c.vessels.length, shipLine(ship)) + tt.html : '')
      + '<div class="gen-card-actions">' + (names.length ? '<button class="btn small primary gen-send-tracker-all" data-src="pb" data-mons="' + esc(names.join('|')) + '">Send captain, officer &amp; ' + n + ' crew</button>' : '')
      + (ship ? sendBtn(ship) : '') + tt.acts + '</div>' + src(c));
  }
  function marrowCard() {
    var MC = G('PB_MARROW_CANNONS'); if (!MC) return '';
    var ms = arr(MC.monsters).map(findMon).filter(Boolean);
    return card('Marrow Cannons', 'by ' + MC.author, '<div class="pb-p" style="margin:2px 0 6px;font-size:13px;">' + esc(MC.text) + '</div>' + ms.map(function (m) { return row(m.name, monLine(m) + '<br><span class="pb-dim">' + esc(arr(m.specials).map(function (s) { return s.name + ': ' + s.text; }).join(' · ')) + '</span>'); }).join('')
      + actions(ms.map(sendBtn).join('')) + src(MC));
  }

  // ── Derelict Ship (pg. 116-117) ──
  function wreckCard() {
    var D = G('PB_DERELICT_GEN'); if (!D) return '';
    var h = '', acts = '', cargoRow = null, cond = null;
    Object.keys(D.tables).forEach(function (k) {
      var t = D.tables[k], x = rollTable(t); if (!x) return;
      if (k === 'originalCargo') cargoRow = x; if (k === 'condition') cond = x;
      var ex = rowExtras(x.row);
      h += row(t.name + ' ' + x.die + ' ' + x.roll, esc(rollInline(rollBrackets(x.row.text)))) + ex.html; acts += ex.acts;
    });
    if (cond && cond.row.valueMultiplier != null && cargoRow) h += row('Cargo', esc(cargoRow.row.text) + ' — worth <b>×' + cond.row.valueMultiplier + '</b> its usual value' + (cond.row.valueMultiplier === 0 ? ' (nothing to sell)' : ''));
    return card('Derelict Ship', '9 tables', h + actions(acts) + noteDiv(D.note) + src(D));
  }
  // ── Uncharted Islands (pg. 122-123) ──
  function islandCard() {
    var I = G('PB_ISLANDS'); if (!I) return '';
    var h = '', acts = '';
    Object.keys(I.tables).forEach(function (k) { var t = I.tables[k], x = rollTable(t); if (!x) return; var ex = rowExtras(x.row); h += row(t.name + ' ' + x.die + ' ' + x.roll, esc(rollInline(rollBrackets(x.row.text)))) + ex.html; acts += ex.acts; });
    return card('Uncharted Island', 'd6 + 10 × 2d6', h + actions(acts) + noteDiv(I.note) + src(I));
  }
  // ── Treasure Maps + riddles (pg. 119-121) and Buried Treasure (pg. 118) ──
  function fillRiddle(text, icon, marker, direction) {
    return String(text || '').replace(/\[icon\]/gi, '[' + icon + ']').replace(/\[marker\]/gi, '[' + marker + ']')
      .replace(/\[direction\]/g, '[' + direction + ']').replace(/\[Direction\]/g, '[' + cap(direction) + ']')
      .replace(/\[(\d*d\d+)(?:\s*[x×]\s*(\d+))?\]/gi, function (a, d, mul) { return '[' + (dice(d).total * (mul ? +mul : 1)) + ']'; })
      .replace(/\b(\d*d\d+)(?=\s+(?:miles?|paces?)\b)/gi, function (a) { return a + ' (' + dice(a).total + ')'; });
  }
  function treasureMap() {
    var TM = G('PB_TREASURE_MAPS'); if (!TM) return null;
    var tb = TM.tables, x = {};
    ['type', 'material', 'geography', 'itStarts', 'invisibleInk', 'complication', 'clueContainer', 'direction'].forEach(function (k) { x[k] = rollTable(tb[k]); });
    var nIcons = x.type.row.name === 'Point Crawl' ? 2 + r(3) : 1, icons = [], markers = [];
    for (var i = 0; i < nIcons; i++) icons.push(rollTable(tb.icons));
    markers.push(rollTable(tb.markers));
    var rd = rollTable(TM.riddles);
    return { x: x, icons: icons, markers: markers, riddle: rd, text: fillRiddle(rd.row.text, icons[icons.length - 1].row.text, markers[0].row.text, x.direction.row.text), answer: rd.row.answer || '' };
  }
  function buried() { var B = G('PB_BURIED_TREASURE'); var x = B && rollTable(B); return x ? { roll: x.roll, text: rollInline(rollBrackets(x.row.text)), row: x.row } : null; }
  function mapCard(withTreasure) {
    var m = treasureMap(); if (!m) return '';
    var X = m.x, h = row('Type d4 ' + X.type.roll, '<b>' + esc(X.type.row.name) + '</b> — ' + esc(body(X.type.row).replace(/^[^.]*\.\s*/, '')))
      + row('Material d12 ' + X.material.roll, esc(X.material.row.text)) + row('Geography d8 ' + X.geography.roll, esc(X.geography.row.text))
      + row('It starts d6 ' + X.itStarts.roll, esc(X.itStarts.row.text)) + row('Invisible ink d10 ' + X.invisibleInk.roll, 'revealed ' + esc(X.invisibleInk.row.text))
      + row('Complication d8 ' + X.complication.roll, esc(X.complication.row.text))
      + row('Icons d20', m.icons.map(function (i) { return esc(i.row.text) + ' <span class="pb-dim">(' + i.roll + ')</span>'; }).join(' → '))
      + row('Marker d20 ' + m.markers[0].roll, esc(m.markers[0].row.text)) + row('Direction d8 ' + X.direction.roll, esc(X.direction.row.text))
      + row('Clue container d10 ' + X.clueContainer.roll, esc(X.clueContainer.row.text))
      + hr() + row('Riddle d12 ' + m.riddle.roll, '<i>' + esc(m.text) + '</i>') + row('GM', '<span class="pb-dim">' + esc(m.answer) + '</span>');
    if (withTreasure) { var b = buried(); if (b) h += hr() + row('Buried treasure d100 ' + b.roll, esc(b.text)); }
    return card('Treasure Map — ' + X.type.row.name, '10 tables + riddle', h + src(G('PB_TREASURE_MAPS')));
  }
  function buriedCard() { var b = buried(); if (!b) return ''; return card('Buried Treasure', 'd100 ' + b.roll, row('In the chest', esc(b.text)) + noteDiv(G('PB_BURIED_TREASURE').note) + src(G('PB_BURIED_TREASURE'))); }

  // ── Cargo (pg. 115) + market rates; ASH market (pg. 10) ──
  function marketSwing() { var C = G('PB_CARGO'), sw = C && C.marketSwing != null ? C.marketSwing : 0.5; var steps = Math.round(sw * 10); return 1 + (r(steps * 2 + 1) - steps - 1) / 10; }
  function cargoSlot() {
    var C = G('PB_CARGO'); if (!C) return null;
    var x = rollTable(C.mundane), sp = null, rw = x.row;
    if (rw.table === 'cargoSpecial') { sp = rollTable(C.special); rw = sp.row; }
    var count = rw.count ? dice(rw.count).total : null, val = null, valText = '';
    if (typeof rw.value === 'number') val = rw.value;
    else if (rw.value && /(\d*d\d+)\s*[x×]\s*(\d+)/.test(rw.value)) { var mm = /(\d*d\d+)\s*[x×]\s*(\d+)/.exec(rw.value), tot = 0; for (var i = 0; i < (count || 1); i++) tot += dice(mm[1]).total * +mm[2]; val = tot; valText = (count || 1) + ' × (' + rw.value + ')'; }
    var extra = '';
    if (rw.table === 'rituals') { var k = dice('d4').total, rs = []; for (var j = 0; j < k; j++) { var rt = ritual(); if (rt) rs.push(rt.name); } extra = 'Tome of ' + k + ': ' + rs.join(', '); }
    return { mundane: x, special: sp, row: rw, count: count, value: val, valueText: valText, ash: !!rw.ash, extra: extra };
  }
  function cargoCard(slots, opts) {
    opts = opts || {};
    var C = G('PB_CARGO'); if (!C) return '';
    var h = '', base = 0, port = 0;
    for (var i = 0; i < slots; i++) {
      var c = cargoSlot(); if (!c) continue;
      var sw = marketSwing(), v = c.value != null ? Math.round(c.value * sw * (opts.qm ? 1.5 : 1)) : null;
      base += c.value || 0; port += v || 0;
      var what = String(c.row.text).replace(/,\s*\d[\d,]*s$/, '').replace(/,\s*\d+d\d+.*$/, '');
      if (c.count != null) what = what.replace(/\bd\d+\b/, c.count);
      h += row('Slot ' + (i + 1) + ' · d12 ' + c.mundane.roll + (c.special ? ' → special d12 ' + c.special.roll : ''),
        '<b>' + esc(cap(what)) + '</b>' + (c.value != null ? ' — ' + c.value.toLocaleString() + 's' + (c.valueText ? ' <span class="pb-dim">(' + esc(c.valueText) + ')</span>' : '') + ' · here <b>' + v.toLocaleString() + 's</b> <span class="pb-dim">(' + (sw >= 1 ? '+' : '−') + Math.round(Math.abs(sw - 1) * 100) + '%' + (opts.qm ? ', +50% QM' : '') + ')</span>' : '')
        + (c.ash ? '<br><span class="pb-dim">ASH: ' + c.count + ' crates — sold by the dose at ' + C.marketRates.ashStandardRate + 's, times the Current ASH Market.</span>' : '')
        + (c.extra ? '<br><span class="pb-dim">' + esc(c.extra) + '</span>' : ''));
    }
    if (opts.twist) { var tw = rollTable(C.plotTwist); if (tw) h += row('Plot twist d8 ' + tw.roll, esc(tw.row.text)); }
    return card('Cargo — ' + slots + ' slot' + (slots === 1 ? '' : 's'), 'd12 each', h + hr() + row('Worth', '<b>' + base.toLocaleString() + 's</b> suggested · <b>' + port.toLocaleString() + 's</b> at this port')
      + noteDiv(C.marketRates.text) + src(C));
  }
  function ashCard(ports, withEffect) {
    var A = G('PB_ASH'); if (!A) return '';
    var rate = A.dose.standardRate, h = '';
    for (var i = 0; i < ports; i++) {
      var x = rollTable(A.market), m = x.row.multiplier;
      var txt = m == null ? 'name your price' : m === 0 ? 'worthless here' : null;
      if (m != null && m !== 0) rate = Math.max(1, Math.round(rate * m));
      h += row('Port ' + (i + 1) + ' · 2d6 ' + x.roll, '<b>' + esc(x.row.name) + '</b> — ' + (txt ? esc(txt) + (m === 0 ? '' : ' (last rate ' + rate + 's)') : '<b>' + rate + 's</b> a dose'));
    }
    if (withEffect) { var e = rollTable(A.effects); if (e) h += hr() + row('Consuming ASH d20 ' + e.roll, esc(rollInline(e.row.text))) + noteDiv(A.effects.duration ? 'Most effects last ' + A.effects.duration + '.' : ''); }
    return card('ASH Market', ports + ' port' + (ports === 1 ? '' : 's') + ' · from ' + A.dose.standardRate + 's', h + noteDiv(A.marketNote + ' One dose: ' + A.dose.text + '.') + src(A));
  }

  // ── Jobs & Quests (pg. 126), Rumors (pg. 127), History d66 (pg. 25) ──
  function job(faction) {
    var J = G('PB_JOBS'); if (!J) return null;
    var o = {}; Object.keys(J.tables).forEach(function (k) { o[k] = rollTable(J.tables[k]); });
    var F = arr(G('PB_FACTIONS')), f = faction === 'random' ? pick(F) : faction ? F.filter(function (x) { return x.id === faction; })[0] : null;
    return { rolls: o, faction: f || null };
  }
  function jobCard(faction) {
    var j = job(faction); if (!j) return '';
    var J = G('PB_JOBS'), h = '';
    Object.keys(j.rolls).forEach(function (k) { var x = j.rolls[k]; h += row(J.tables[k].name + ' ' + x.die + ' ' + x.roll, esc(rollInline(x.row.text))); });
    if (j.faction) h += row('Faction', '<b>' + esc(j.faction.name) + '</b> <span class="pb-dim">(' + esc(j.faction.seat) + ')</span>');
    return card('Job — ' + String(j.rolls.hook.row.text).replace(/\.$/, ''), 'd20 · d10 · d6 · d6 · d6', h + noteDiv(J.note) + src(J));
  }
  function rumorCard(kind) {
    var t = kind === 'history' ? G('PB_HISTORY') : kind ? T(kind) : G('PB_RUMORS'); if (!t) return '';
    var x = rollTable(t); if (!x) return '';
    var h = row(kind === 'history' ? (x.row.storyline + ' · chapter ' + x.row.chapter) : 'Rumor', esc(rollInline(rollBrackets(x.row.text)))), ex = rowExtras(x.row);
    return card(kind === 'history' ? 'A General History' : t.name, x.die + ' ' + x.code, h + ex.html + actions(ex.acts) + (kind === 'history' ? noteDiv(t.note) : '') + src(t));
  }
  // ── Maritime Travel Events (pg. 79) ──
  function travelCard(kind) {
    var TE = G('PB_TRAVEL_EVENTS'); if (!TE) return '';
    var k = kind === 'any' || !kind ? pick(['flotsam', 'encounters', 'events']) : kind, t = TE[k]; if (!t) return '';
    var res = tableRows(t);
    return card(t.name, (res.x ? res.x.die + ' ' + res.x.code : t.die), res.html + actions(res.acts) + noteDiv(TE.note) + src(t));
  }
  // ── Alchemy Potion Generator (pg. 70-71) ──
  function potion(method) {
    var A = G('PB_ALCHEMY'), AT = T('alchemy'); if (!A || !AT) return null;
    var rowsA = A.rows, o;
    if (method === 'random') {
      var c = rollColsOf(AT);
      var dlv = c[3].value, drv = num(c[4].value, 12);
      o = { method: 'Random (6d20)', a: c[0].value, b: c[1].value, color: c[2].value, delivery: dlv, dr: drv, effect: c[5].value, rolls: c.map(function (x) { return x.roll; }), effRow: rowsA[c[5].n - 1] };
    } else {
      var v = r(20), rw = rowsA[v - 1];
      o = { method: 'Fast (1d20)', a: rw.ingredientA, b: rw.ingredientB, color: rw.color, delivery: rw.delivery, dr: rw.dr, effect: rw.effect, rolls: [v], effRow: rw };
    }
    o.effect = rollInline(o.effect);
    if (/roll twice/i.test(o.effect)) { var e1 = rowsA[r(19) - 1], e2 = rowsA[r(19) - 1]; o.effect += ' → ' + rollInline(e1.effect) + ' AND ' + rollInline(e2.effect); }
    o.cost = dice(A.cost).total;
    o.summary = o.color + ' potion of ' + o.a + ' & ' + o.b + ' (' + o.delivery + ', DR' + o.dr + '): ' + o.effect;
    return o;
  }
  function potionCard(method) {
    var p = potion(method); if (!p) return '';
    var A = G('PB_ALCHEMY');
    return card(p.color + ' potion', p.method + ' · ' + p.rolls.join(' · '),
      row('Ingredients', esc(p.a) + ' &amp; ' + esc(p.b)) + row('Color', esc(p.color)) + row('Delivery', esc(p.delivery))
      + row('DR', '<b>' + p.dr + '</b> <span class="pb-dim">TOUGHNESS to resist · PRESENCE to craft</span>') + row('Effect', esc(p.effect))
      + row('Price', '<b>' + p.cost + 's</b> <span class="pb-dim">(' + esc(A.cost) + ', from a reliable source)</span>') + noteDiv(A.notes && A.notes[0]) + src(A));
  }
  // ── Carousing (endpapers, 4d20) ──
  function carouseCard() {
    var t = T('carousing'); if (!t) return '';
    var c = rollColsOf(t), dsum = 0, low = 99;
    c.forEach(function (x) { dsum += x.n; low = Math.min(low, x.n); });
    var sil = t.silver && dsum >= t.silver.spentBelow ? 'won or stole <b>' + dsum + 's</b>' : 'spent or lost <b>' + dsum + 's</b>';
    var last = c[3].value, mech = '';
    var mm = /(\d*d\d+)\s*x\s*10/i.exec(last); if (mm) mech = ' → ' + (dice(mm[1]).total * 10) + 's';
    var story = 'Last night you ' + c[0].value + ' ' + c[1].value.replace(/\.$/, '') + '. You wake up ' + c[2].value + ', and now you are ' + last.replace(/\.$/, '') + mech + '.';
    return card('Carousing', '4d20 ' + c.map(function (x) { return x.n; }).join(' · '), '<div class="pb-p" style="margin:2px 0 6px;font-size:13px;"><i>' + esc(story) + '</i></div>'
      + c.map(function (x) { return row(x.name + ' ' + x.n, esc(x.value)); }).join('') + hr()
      + row('Hangover', '<b>' + low + '</b> hours <span class="pb-dim">(lowest die)</span>') + row('Silver', sil + ' <span class="pb-dim">(sum ' + dsum + '; 4-49 spent, 50+ won)</span>') + src(t));
  }
  // ── Loot the Body (endpapers, d100) ──
  function lootRoll(depth) {
    var t = T('lootTheBody'); if (!t) return [];
    var x = rollTable(t), out = [];
    if (x.row.rollAgain && (depth || 0) < 3) { for (var i = 0; i < x.row.rollAgain; i++) out = out.concat(lootRoll((depth || 0) + 1)); return [{ roll: x.roll, text: x.row.text, again: true }].concat(out); }
    var e = { roll: x.roll, text: rollInline(rollBrackets(x.row.text)), hidden: x.row.hidden || '', extra: '' };
    if (x.row.silver === 'roll') e.extra = x.roll + ' silver';
    if (/^d\d+ gold doubloons/.test(x.row.text)) { var dd = dice(/^(d\d+)/.exec(x.row.text)[1]).total; e.text = e.text.replace(/^d\d+/, dd); e.extra = dd + ' doubloons'; }
    if (x.row.table) { var sr = x.row.table === 'relics' ? (function () { var rl = relic(); return rl ? { label: 'Relic d20 ' + rl.roll, html: '<b>' + esc(rl.name) + '</b> — ' + esc(rl.text) } : null; })() : subRoll(x.row.table); if (sr) e.sub = sr; }
    return [e];
  }
  function lootCard() {
    var t = T('lootTheBody'), L = lootRoll(0); if (!L.length) return '';
    var h = '';
    L.forEach(function (e) {
      if (e.again) { h += row('d100 ' + (e.roll === 100 ? '00' : e.roll), '<i>' + esc(e.text) + '</i>'); return; }
      h += row('d100 ' + e.roll, esc(e.text) + (e.extra ? ' <b>(' + esc(e.extra) + ')</b>' : '')) + (e.hidden ? row('Unnoticed', '<i class="pb-dim">' + esc(e.hidden) + '</i>') : '') + (e.sub ? row(e.sub.label, e.sub.html) : '')
        + (e.extra && /silver$/.test(e.extra) ? '' : row('Extra', '+' + e.roll + 's <span class="pb-dim">(the number rolled, in silver)</span>'));
    });
    return card('Loot the Body', 'd100', h + noteDiv('Italic text is not obvious at first.') + src(t));
  }
  // ── NPC motivation (d20) + a quick name (d12) ──
  function motivation() { var x = rollRows('npcMotivation'); return x ? { roll: x.roll, text: x.row.text } : null; }
  function quickName() { var c = rollCols('namesD12'); if (!c) return null; var a = pick(c), b = pick(c.filter(function (x) { return x !== a; })); return { parts: [a, b] }; }
  function motiveCard() {
    var m = motivation(), q = quickName(), re = reaction(); if (!m) return '';
    var nm = q ? q.parts[0].value.replace(/\(.*?\)/g, '').trim() + ' ' + q.parts[1].value.replace(/\(.*?\)/g, '').trim() : 'NPC';
    var json = esc(JSON.stringify({ name: nm, demeanor: re ? re.text : '', occupation: '', quirk: 'Driven by ' + m.text }));
    return card(nm, 'd20 ' + m.roll + (q ? ' · d12 ' + q.parts.map(function (x) { return x.roll; }).join('/') : ''),
      row('Motivation', '<b>' + esc(cap(m.text)) + '</b>') + (re ? row('Reaction 2d6 ' + re.roll, esc(re.text)) : '')
      + (q ? row('Quick name', esc(nm) + ' <span class="pb-dim">(What\'s in a Name? d12)</span>') : '')
      + '<div class="gen-card-actions"><button class="btn small primary gen-send-social">Send to Social</button></div>' + src(T('npcMotivation')), '', ' data-npc="' + json + '"');
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
      // ── Core Rules generators ──
      if (kind === 'pbtables') { var gg = val(panel, '.pb-grp-group', '') || groups()[0], gk = val(panel, '.pb-grp-table', ''); for (i = 0; i < n; i++) h += groupCard(gg, gk); return put(panel, h); }
      if (kind === 'pbpirate') { for (i = 0; i < n; i++) h += pirateCard({ mighty: !!val(panel, '.pb-mighty', false), gender: val(panel, '.pb-gender', '') }); return put(panel, h); }
      if (kind === 'pbenemy') { for (i = 0; i < n; i++) h += enemyCard({ name: val(panel, '.pb-en-name', ''), specials: val(panel, '.pb-en-sp', 1) }); return put(panel, h); }
      if (kind === 'pbshipsea') { for (i = 0; i < n; i++) h += shipAtSeaCard({ base: val(panel, '.pb-sea-base', ''), template: val(panel, '.pb-sea-tpl', '') }); return put(panel, h); }
      if (kind === 'pbcaptain') { var cp = val(panel, '.pb-cap-pick', ''); for (i = 0; i < n; i++) h += cp === 'marrow' ? marrowCard() : captainCard(cp, val(panel, '.pb-cap-crew', 4)); return put(panel, h); }
      if (kind === 'pbwreck') { for (i = 0; i < n; i++) h += wreckCard(); return put(panel, h); }
      if (kind === 'pbisland') { for (i = 0; i < n; i++) h += islandCard(); return put(panel, h); }
      if (kind === 'pbmap') { var mk = val(panel, '.pb-map-kind', 'map'); for (i = 0; i < n; i++) h += mk === 'treasure' ? buriedCard() : mapCard(mk === 'both'); return put(panel, h); }
      if (kind === 'pbcargo') { var cs = Math.max(1, Math.min(20, num(val(panel, '.pb-cargo-slots', 2), 2))); for (i = 0; i < n; i++) h += cargoCard(cs, { qm: !!val(panel, '.pb-cargo-qm', false), twist: !!val(panel, '.pb-cargo-twist', false) }); return put(panel, h); }
      if (kind === 'pbash') { var ap = Math.max(1, Math.min(12, num(val(panel, '.pb-ash-ports', 3), 3))); for (i = 0; i < n; i++) h += ashCard(ap, !!val(panel, '.pb-ash-effect', false)); return put(panel, h); }
      if (kind === 'pbjob') { for (i = 0; i < n; i++) h += jobCard(val(panel, '.pb-job-faction', '')); return put(panel, h); }
      if (kind === 'pbrumor') { for (i = 0; i < n; i++) h += rumorCard(val(panel, '.pb-rumor-kind', '')); return put(panel, h); }
      if (kind === 'pbtravel') { for (i = 0; i < n; i++) h += travelCard(val(panel, '.pb-travel-kind', 'any')); return put(panel, h); }
      if (kind === 'pbalchemy') { for (i = 0; i < n; i++) h += potionCard(val(panel, '.pb-alc-method', 'fast')); return put(panel, h); }
      if (kind === 'pbmotive') { for (i = 0; i < n; i++) h += motiveCard(); return put(panel, h); }
      if (kind === 'pbcarouse') { for (i = 0; i < n; i++) h += carouseCard(); return put(panel, h); }
      if (kind === 'pbloot') { for (i = 0; i < n; i++) h += lootCard(); return put(panel, h); }
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
      if (a === 'foeatk') return put(panel, foeAttackCard(o), true);
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
    // Ship pickers refill whenever the list grows (fleets, sea monsters, generated ships).
    var opt = function (x) { return '<option value="' + esc(x.name) + '">' + esc(x.name) + '</option>'; };
    var grouped = function () {
      var B = S.filter(function (x) { return !x.fleet && !x.seaMonster && !x.generated; }), F = S.filter(function (x) { return x.fleet; }), N = S.filter(function (x) { return x.seaMonster; }), Gn = S.filter(function (x) { return x.generated; });
      return '<optgroup label="Ships">' + B.map(opt).join('') + '</optgroup>' + (F.length ? '<optgroup label="Captains\' fleets">' + F.map(opt).join('') + '</optgroup>' : '')
        + (N.length ? '<optgroup label="Sea monsters (naval)">' + N.map(opt).join('') + '</optgroup>' : '') + (Gn.length ? '<optgroup label="Generated">' + Gn.map(opt).join('') + '</optgroup>' : '');
    };
    R.querySelectorAll('.pbn-ship, .pbn-foe').forEach(function (s) {
      if (!S.length || +(s.dataset.n || 0) === S.length) return;
      var foe = s.classList.contains('pbn-foe'), cur = s.value;
      s.innerHTML = (foe ? '<option value="">— none —</option>' : '') + grouped();
      s.dataset.n = S.length;
      if (cur && findShip(cur)) s.value = cur;
      else if (foe) { var fl = S.filter(function (x) { return x.id === 'fluyt'; })[0]; if (fl) s.value = fl.name; }
      else { var sl = S.filter(function (x) { return x.id === 'sloop'; })[0]; if (sl) s.value = sl.name; }
    });
    R.querySelectorAll('.pb-morale-mon').forEach(function (s) { if (M.length && +(s.dataset.n || 0) !== M.length) { var cur = s.value; s.innerHTML = '<option value="">— use the Morale value —</option>' + M.filter(function (m) { return m.morale != null; }).map(function (m) { return '<option>' + esc(m.name) + '</option>'; }).join(''); s.dataset.n = M.length; s.value = cur; } });
    R.querySelectorAll('.pb-statsas').forEach(function (s) { if (M.length && s.options.length <= 1) s.insertAdjacentHTML('beforeend', M.filter(function (m) { return m.category === 'npc' && !m.generated; }).map(function (m) { return '<option>' + esc(m.name) + '</option>'; }).join('')); });
    R.querySelectorAll('.pb-shanty-pick').forEach(function (s) { if (Sh && s.options.length <= 1) s.insertAdjacentHTML('beforeend', Sh.rows.map(function (x) { return '<option value="' + x.roll + '">' + x.roll + '. ' + esc(x.name) + '</option>'; }).join('')); });
    // Core Rules pickers.
    R.querySelectorAll('.pb-grp-group').forEach(function (s) { if (s.options.length) return; s.innerHTML = groups().map(function (g) { return '<option>' + esc(g) + '</option>'; }).join(''); fillGroupTables(s); });
    R.querySelectorAll('.pb-sea-base').forEach(function (s) { if (s.options.length > 1) return; s.insertAdjacentHTML('beforeend', baseShips().map(function (x) { return '<option value="' + esc(x.id) + '">' + esc(x.name) + '</option>'; }).join('')); });
    R.querySelectorAll('.pb-sea-tpl').forEach(function (s) { if (s.options.length > 2) return; s.insertAdjacentHTML('beforeend', templates().map(function (t) { return '<option value="' + esc(t.id) + '">' + esc(t.name) + '</option>'; }).join('')); });
    R.querySelectorAll('.pb-cap-pick').forEach(function (s) { if (s.options.length > 1) return; s.insertAdjacentHTML('beforeend', arr(G('PB_CAPTAINS')).map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(c.name) + '</option>'; }).join('') + (G('PB_MARROW_CANNONS') ? '<option value="marrow">Marrow Cannons</option>' : '')); });
    R.querySelectorAll('.pb-job-faction').forEach(function (s) { if (s.options.length > 2) return; s.insertAdjacentHTML('beforeend', arr(G('PB_FACTIONS')).map(function (f) { return '<option value="' + esc(f.id) + '">' + esc(f.name) + '</option>'; }).join('')); });
  };
  function fillGroupTables(sel) {
    var panel = sel.closest('[data-panel]'), tsel = panel && panel.querySelector('.pb-grp-table'); if (!tsel) return;
    tsel.innerHTML = '<option value="">Every table in the group</option>' + groupTables(sel.value).map(function (k) { var t = T(k); return '<option value="' + esc(k) + '">' + esc(t.name) + ' (' + esc(t.dice || t.die) + ')</option>'; }).join('');
  }
  document.addEventListener('change', function (e) { var s = e.target; if (s && s.classList && s.classList.contains('pb-grp-group')) fillGroupTables(s); });
  // A sea monster (naval form) as the foe: its attacks against our hull.
  function foeAttackCard(o) {
    var f = o.foe; if (!f) return card('Foe attacks', '', '<div class="gen-empty">Pick a foe.</div>');
    // Ships fire every broadside / small-arms attack they have ("2 @ d8"); a sea monster's
    // "up to 4 per turn" attack is rolled that many times.
    var atks = f.navalAttacks && f.navalAttacks.length ? f.navalAttacks : [f.broadsides ? { name: 'Broadsides', damage: f.broadsides, n: f.broadsidesAttacks || 1 } : null, f.smallArms ? { name: 'Small arms', damage: f.smallArms, n: f.smallArmsAttacks || 1 } : null].filter(Boolean);
    var h = '';
    atks.forEach(function (a) {
      if (!a.damage) { h += row(a.name, esc(a.notes || '')); return; }
      var pm = /(\d+)\s*(?:per turn|\/turn)/i.exec(a.notes || ''), n = Math.max(1, Math.min(8, a.n || (pm ? +pm[1] : 1)));
      for (var i = 0; i < n; i++) {
        var hd = hullDamage(String(a.damage), o.ship && o.ship.hull ? o.ship.hull.die : null, false);
        h += row(a.name + (n > 1 ? ' ' + (i + 1) : ''), esc(hd.roll.text) + (hd.hull ? ' − hull ' + hd.hull.total + ' (' + o.ship.hull.die + ')' : '') + ' = <b>' + hd.net + '</b>' + (o.ship ? ' to ' + esc(o.ship.name) : '') + (a.notes && i === n - 1 ? '<br><span class="pb-dim">' + esc(a.notes) + '</span>' : ''));
      }
    });
    if (f.attackScaling || f.multiAttackAboveHalfHp) h += noteDiv('Fewer guns as it takes damage: ' + (f.special || ''));
    return card(f.name + ' attacks', f.seaMonster ? 'sea monster' : 'ship', h + noteDiv(f.seaMonster ? 'Enemies never roll to hit people, but at sea the GM rolls the monster\'s damage against the ship; crew actions still need DR12 tests to strike back.' : 'Roll its attacks against your hull.'));
  }

  W.PB_GM = {
    dice: dice, rollInline: rollInline, test: test, rowFor: rowFor, rollTable: rollTable, rollRows: rollRows, rollCols: rollCols,
    name: name, reaction: reaction, npc: npc, morale: morale, startingWeapon: startingWeapon, relic: relic, ritual: ritual,
    plunder: plunderRoll, trap: trap, windDir: windDir, derelict: derelict, shanty: shanty,
    crewAction: crewAction, hullDamage: hullDamage, shipMorale: shipMorale, pointOfSail: pointOfSail, sailSpeed: sailSpeed,
    monsters: monsters, ships: ships, findMon: findMon, findShip: findShip, armorText: armorText, moraleText: moraleText,
    body: body, rangeText: rangeText, ruleTopics: RULE_TOPICS,
    rollAny: rollAny, rollColsOf: rollColsOf, rollBrackets: rollBrackets, baseShips: baseShips, fleetShips: fleetShips, navalForm: navalForm, navalForms: navalForms,
    templates: templates, applyTemplate: applyTemplate, stepDie: stepDie, groups: groups, groupTables: groupTables,
    pirate: pirate, enemy: enemy, shipAtSea: shipAtSea, treasureMap: treasureMap, buried: buried, cargoSlot: cargoSlot, marketSwing: marketSwing,
    job: job, potion: potion, motivation: motivation, quickName: quickName, lootRoll: lootRoll, registerMon: registerMon, registerShip: registerShip,
    cards: { group: groupCard, pirate: pirateCard, enemy: enemyCard, shipAtSea: shipAtSeaCard, captain: captainCard, marrow: marrowCard, wreck: wreckCard, island: islandCard,
      map: mapCard, buried: buriedCard, cargo: cargoCard, ash: ashCard, job: jobCard, rumor: rumorCard, travel: travelCard, potion: potionCard, carouse: carouseCard, loot: lootCard, motive: motiveCard }
  };
})();
