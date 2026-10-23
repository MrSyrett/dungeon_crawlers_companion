// Pirate Borg — Getting Better (window.PBADV). There are no levels or points: when the
// GM says the crew improves (after taking a prize, raiding a port, dividing the plunder,
// burying treasure, exploring a temple…) every pirate runs the book's procedure (pg. 33):
//   1. d6 for every ability — abilities from −3 to +1 rise by 1 unless the die shows 1
//      (then they drop by 1, never below −3); +2 and up rise if the d6 is equal or higher,
//      otherwise drop (never above +6);
//   2. maximum HP + d6 (current HP only rises by resting or healing);
//   3. a class feature (rerolling repeats where the class says so, the Buccaneer's
//      "each twice", the Rapscallion's "taken again" upgrades, the Sorcerer's rank-ups);
//   4. among the dead you find (d6) — nothing, a weapon, 3d10 silver, a relic, a ritual.
// Each step is rolled (or chosen) here and applied at once; a summary lists what changed
// and Undo restores the sheet as it was. The character is read and written through
// window.PBSHEET.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  function A(x) { return Array.isArray(x) ? x : []; }
  function SH() { return window.PBSHEET; }
  function S() { return SH().state; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function d(n) { return 1 + Math.floor(Math.random() * n); }
  function num(v, dv) { var n = parseInt(v, 10); return isNaN(n) ? (dv || 0) : n; }
  function sg(n) { n = num(n); return (n >= 0 ? '+' : '−') + Math.abs(n); }
  function sides(die) { var m = String(die || '').match(/d(\d+)/i); return m ? num(m[1]) : 6; }
  function log(l, r, dt, t) { SH().addLog(l, r, dt, t || 'normal'); }
  var ABIL = ['STRENGTH', 'AGILITY', 'PRESENCE', 'TOUGHNESS', 'SPIRIT'];
  var V = null;

  function proc() { var e = ((window.PB_RULES || {}).experience || {}).abilityProcedure || {}; return { low: A(e.lowRange).length ? e.lowRange : [-3, 1], failOn: e.lowFailOn || 1, min: e.min != null ? e.min : -3, max: e.max != null ? e.max : 6 }; }
  function expTables() { return SH().featureTables().filter(function (t) { return t.when === 'experience' || t.when === 'both'; }); }
  // Can this row be gained right now? Returns '' or the reason it is rerolled.
  function blocked(t, r) { var st = S();
    if (t.id === 'prayers') return st.prayers.indexOf(r.id) >= 0 ? 'already known' : '';
    if (t.id === 'spells') { var s = SH().spellRec(r.id); return s && num(s.rank) >= 3 ? 'already rank III' : ''; }
    var p = SH().picks(r.id); var max = r.maxPicks || t.maxPicksEach || (t.repeatUpgrades ? 2 : 1);
    if (t.rerollRepeats && p >= 1) return 'already taken';
    if (p >= max) return 'taken ' + (max === 1 ? 'already' : max + ' times');
    return ''; }
  function gain(t, r, how) { var st = S(); var txt = '';
    if (t.id === 'prayers') { st.prayers.push(r.id); txt = 'learned the prayer ' + r.name; }
    else if (t.id === 'spells') { var s = SH().spellRec(r.id); if (s) { s.rank = Math.min(3, num(s.rank, 1) + 1); txt = r.name + ' rises to rank ' + SH().rankName(s.rank); } else { st.spells.push({ id: r.id, rank: 1 }); txt = 'learned ' + r.name + ' (rank I)'; } }
    else { var res = SH().gainFeature(t.id, r.id, { log: false }); txt = r.name + (res && res.again ? ' (taken again: ' + (res.def.again ? res.def.again.text : '') + ')' : '') + (res && res.notes.length ? ' — ' + res.notes.join(', ') : ''); }
    V.feature = { tbl: t.name, name: r.name, text: txt, how: how };
    log('Getting better · ' + t.name, r.name, how + ' · ' + txt, 'crit'); SH().changed(); render(); }
  function rollFeature(tid) { var t = expTables().find(function (x) { return x.id === tid; }); if (!t || V.feature) return;
    var tries = [], guard = 0; while (guard++ < 60) { var n = d(sides(t.die)); var r = SH().rowFor(t.rows, n); if (!r) continue; var why = blocked(t, r); if (!why) { gain(t, r, t.die + '(' + n + ')' + (tries.length ? ' after rerolling ' + tries.join(', ') : '')); return; } tries.push(n + ' ' + r.name + ' — ' + why); if (A(t.rows).every(function (x) { return blocked(t, x); })) break; }
    V.feature = { tbl: t.name, name: '—', text: 'Every option on this table is already yours — nothing new.', how: '' }; log('Getting better · ' + t.name, 'Nothing new', 'Every entry is already taken'); render(); }
  function pickFeature(tid, rid) { var t = expTables().find(function (x) { return x.id === tid; }); if (!t || V.feature) return; var r = A(t.rows).find(function (x) { return x.id === rid; }); if (!r || blocked(t, r)) return; gain(t, r, 'chosen'); }

  function rollAbilities() { if (V.abil) return; var st = S(); var p = proc(); var out = [];
    ABIL.forEach(function (a) { var v = num(st.abilities[a]); var n = d(6); var nv;
      if (v >= p.low[0] && v <= p.low[1]) nv = n === p.failOn ? v - 1 : v + 1; else nv = n >= v ? v + 1 : v - 1;
      nv = Math.max(p.min, Math.min(p.max, nv)); st.abilities[a] = nv; out.push({ a: a, from: v, to: nv, n: n }); });
    V.abil = out; log('Getting better · abilities', out.map(function (x) { return x.a.slice(0, 3) + ' ' + sg(x.to); }).join(' '), out.map(function (x) { return x.a.slice(0, 3) + ' d6(' + x.n + ') ' + sg(x.from) + '→' + sg(x.to); }).join(' · '), 'crit'); SH().changed(); render(); }
  function rollHp() { if (V.hp) return; var st = S(); var n = d(6); var was = SH().hpMax(); st.hpMax = was + n; V.hp = { n: n, from: was, to: st.hpMax }; log('Getting better · HP', '+' + n + ' max HP', 'd6(' + n + ') · ' + was + ' → ' + st.hpMax + ' (current HP rises only by resting or healing)', 'crit'); SH().changed(); render(); }
  function rollDead() { if (V.dead) return; var st = S(); var t = ((window.PB_RULES || {}).experience || {}).amongTheDead || { rows: [] }; var n = d(6); var row = SH().rowFor(t.rows, n) || {}; var got = '';
    if (row.table === 'startingWeapons') { var sw = window.PB_STARTING_WEAPONS || { rows: [] }; var m = d(10); var wr = A(sw.rows).find(function (x) { return x.roll === m; }); var id = wr.choice ? wr.choice[d(2) - 1] : wr.weapon; var w = SH().weaponDef(id); if (w) { SH().addByName(w.name, 1, 'among the dead'); got = w.name + ' (d10: ' + m + ')'; if (w.blackPowder) got += ' — with what shot it carried'; } }
    else if (row.silver) { var s = SH().rollExpr(row.silver); st.silver = num(st.silver) + s.total; got = s.total + ' silver (' + s.text + ')'; }
    else if (row.table === 'relics') { var rn = d(20); var rel = SH().rowFor(window.PB_RELICS, rn); if (rel) { SH().addRelic(rel.id); got = 'the relic ' + rel.name + ' (d20: ' + rn + ')'; } }
    else if (row.table === 'rituals') { var tn = d(20); var rit = SH().rowFor(window.PB_RITUALS, tn); if (rit) { SH().addRitual(rit.id); got = 'the ritual ' + rit.name + ' (d20: ' + tn + ')'; } }
    else got = 'nothing';
    V.dead = { n: n, text: row.text || '', got: got }; log('Among the dead', got, 'd6(' + n + ') · ' + (row.text || ''), n >= 3 ? 'crit' : 'normal'); SH().changed(); render(); }

  function render() {
    var st = S(); var tables = expTables(); var h = '';
    // 1 abilities
    h += '<div class="m-lbl">1 · Ability changes</div>';
    if (!V.abil) h += '<p class="m-hint" style="margin-bottom:6px;">d6 for each ability: −3 to +1 rise unless the die shows 1; +2 and up rise on a d6 equal or higher, otherwise fall. Never below −3 or above +6.</p><button class="m-btn" onclick="PBADV.abil()">Roll d6 × 5</button>';
    else h += '<div class="res-box">' + V.abil.map(function (x) { return '<b>' + x.a + '</b> <span style="font-family:var(--f-num);">d6 ' + x.n + ': ' + sg(x.from) + ' → <b style="color:' + (x.to > x.from ? '#9fdcae' : x.to < x.from ? '#ff9d8a' : '#f3e6d4') + ';">' + sg(x.to) + '</b></span>'; }).join('<br>') + '</div>';
    // 2 HP
    h += '<div class="m-lbl">2 · More HP</div>';
    if (!V.hp) h += '<button class="m-btn" onclick="PBADV.hp()">Roll d6 max HP</button>'; else h += '<div class="res-box" style="font-family:var(--f-num);">d6 ' + V.hp.n + ': max HP ' + V.hp.from + ' → <b>' + V.hp.to + '</b></div>';
    // 3 feature
    h += '<div class="m-lbl">3 · A class feature</div>';
    if (V.feature) h += '<div class="res-box"><b>' + esc(V.feature.tbl) + ':</b> ' + esc(V.feature.text) + (V.feature.how ? ' <small style="color:#a89a8a;">(' + esc(V.feature.how) + ')</small>' : '') + '</div>';
    else if (!tables.length) h += '<p class="m-hint">' + (st.classId === 'landlubber' ? 'Landlubbers have no class features.' : 'No class feature table applies (sentient animals have no normal class).') + '</p>';
    else tables.forEach(function (t) {
      h += '<p class="m-hint" style="margin:4px 0;"><b>' + esc(t.name) + '</b> (' + esc(t.die) + ')' + (t.note ? ' — ' + esc(t.note) : '') + '</p><div class="m-row" style="margin-bottom:6px;"><button class="m-btn" onclick="PBADV.roll(\'' + t.id + '\')">Roll ' + esc(t.die) + '</button>' +
        A(t.rows).map(function (r) { var why = blocked(t, r); var have = t.id === 'prayers' ? st.prayers.indexOf(r.id) >= 0 : t.id === 'spells' ? !!SH().spellRec(r.id) : SH().picks(r.id) > 0;
          return '<button class="chip' + (have ? ' sel' : '') + '"' + (why ? ' disabled title="' + esc(why) + '"' : ' title="' + esc(r.text || '') + '"') + ' onclick="PBADV.pick(\'' + t.id + '\',\'' + r.id + '\')"><span style="font-family:var(--f-num);">' + (r.numeral || r.roll) + '.</span> ' + esc(r.name) + (have && !why ? ' <small>(again)</small>' : '') + '</button>'; }).join('') + '</div>'; });
    // 4 among the dead
    h += '<div class="m-lbl">4 · Among the dead you find</div>';
    if (!V.dead) h += '<p class="m-hint" style="margin-bottom:6px;">d6: 1–2 nothing · 3 a weapon (d10) · 4 3d10 silver · 5 an ancient relic · 6 an arcane ritual.</p><button class="m-btn" onclick="PBADV.dead()">Roll d6</button>';
    else h += '<div class="res-box"><span style="font-family:var(--f-num);">d6 ' + V.dead.n + '</span>: ' + esc(V.dead.got) + '</div>';
    var done = V.abil && V.hp && V.dead && (V.feature || !tables.length);
    h += '<div class="m-lbl">Summary</div><div class="res-box">' + [V.abil ? 'Abilities: ' + V.abil.map(function (x) { return x.a.slice(0, 3) + ' ' + sg(x.to); }).join(', ') : 'Abilities: —', V.hp ? 'Max HP ' + V.hp.to + ' (+' + V.hp.n + ')' : 'HP: —', 'Feature: ' + (V.feature ? V.feature.name : '—'), 'Found: ' + (V.dead ? V.dead.got : '—')].map(esc).join('<br>') + '</div>';
    $('advance-title').textContent = 'Getting Better';
    // Each roll re-renders the dialog: keep its scroll position (open() starts at the top).
    var bd = $('advance-body'), keep = bd.scrollTop; bd.innerHTML = h; bd.scrollTop = keep;
    $('advance-ft').innerHTML = '<button class="m-btn warn" onclick="PBADV.undo()">Undo all</button><button class="m-btn ghost" onclick="PBADV.all()"' + (done ? ' disabled' : '') + '>Roll everything left</button><button class="m-btn" onclick="PBADV.close()">' + (done ? 'Done' : 'Close') + '</button>';
    $('advance-overlay').classList.add('open');
  }
  var api = {
    open: function () { if (!SH()) return; V = { snap: SH().snapshot(), abil: null, hp: null, feature: null, dead: null }; $('advance-body').scrollTop = 0; render(); },
    close: function () { $('advance-overlay').classList.remove('open'); },
    abil: rollAbilities, hp: rollHp, dead: rollDead, roll: rollFeature, pick: pickFeature,
    all: function () { if (!V.abil) rollAbilities(); if (!V.hp) rollHp(); if (!V.feature) { var t = expTables()[0]; if (t) rollFeature(t.id); } if (!V.dead) rollDead(); },
    undo: function () { if (!V) return; SH().restore(V.snap); log('Getting better', 'Undone', 'The sheet is back as it was'); V = { snap: V.snap, abil: null, hp: null, feature: null, dead: null }; render(); },
    _state: function () { return V; }
  };
  window.PBADV = api;
})();
