// Dragonbane advancement (window.DBADV) — there are no levels or experience points.
// End of session: answer the book's questions (one advancement mark each; giving
// in to your weakness is one more, overcoming it two), place the marks on skills,
// (or extra ones the GM grants), then roll a D20 for every marked skill — a result above the current level raises
// it by one (to 18). Marks are erased. A skill reaching 18 grants a heroic ability
// of your choice (requirement checked). Also: an extra roll from a teacher, a rare
// GM-reward heroic ability, and learning spells, tricks or a new school.
// Rules from window.DB_ADVANCEMENT; the character is read and written through window.DBSHEET.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  function A(x) { return Array.isArray(x) ? x : []; }
  function SH() { return window.DBSHEET; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function jsq(s) { return esc(String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }
  function d20() { return 1 + Math.floor(Math.random() * 20); }
  function S() { return SH().state; }
  var V = null; // view state
  function skills() { return A(window.DB_SKILLS).filter(function (s) { return s.type !== 'secondary' || SH().knownSchools().indexOf(s.name) >= 0; }); }
  function marked() { var st = S(); return skills().filter(function (s) { return st.skills[s.name] && st.skills[s.name].mark; }).map(function (s) { return s.name; }); }
  function setMark(n, on) { var st = S(); (st.skills[n] = st.skills[n] || {}).mark = !!on; }
  function earned() { var n = 0; V.q.forEach(function (on, i) { if (on && i < 4) n++; }); if (V.weak === 'gave') n += 1; if (V.weak === 'overcame') n += 2; return n + (V.extra || 0); }
  function show(title, body, ft) { $('advance-title').textContent = title; $('advance-body').innerHTML = body; $('advance-ft').innerHTML = ft || '<button class="m-btn ghost" onclick="DBADV.close()">Close</button>'; $('advance-overlay').classList.add('open'); }
  function tabs(active) { return '<div class="m-row" style="margin-bottom:12px;">' + [['session', 'End of Session'], ['teacher', 'Teacher'], ['magic', 'Learn Magic'], ['reward', 'GM Reward']].map(function (t) { return '<button class="chip' + (active === t[0] ? ' sel' : '') + '" onclick="DBADV.tab(\'' + t[0] + '\')">' + t[1] + '</button>'; }).join('') + '</div>'; }

  function renderSession() {
    var qs = A((window.DB_ADVANCEMENT || {}).sessionQuestions); var st = S();
    var h = tabs('session') + '<p class="m-hint">Answer for this session. Each “yes” is an advancement mark to place on a skill you haven\'t marked yet. Skills you rolled a Dragon or Demon on are already marked (✓ on the sheet) — click one here to take back a mark that shouldn\'t count. The sheet has no mark boxes: every manual mark is placed here.</p>';
    qs.slice(0, 4).forEach(function (q, i) { h += '<label class="m-check"><input type="checkbox" ' + (V.q[i] ? 'checked' : '') + ' onchange="DBADV.q(' + i + ',this.checked)"><span>' + esc(q) + '</span></label>'; });
    h += '<div class="m-lbl">Weakness' + (st.weakness ? ' — ' + esc(st.weakness) : ' (none)') + '</div><div class="m-row">' +
      [['none', 'Neither'], ['gave', 'Gave in to it (+1 mark)'], ['overcame', 'Clearly overcame it (+2 marks, weakness removed)']].map(function (o) { return '<button class="chip' + (V.weak === o[0] ? ' sel' : '') + '"' + (!st.weakness && o[0] !== 'none' ? ' disabled' : '') + ' onclick="DBADV.weak(\'' + o[0] + '\')">' + o[1] + '</button>'; }).join('') + '</div>';
    h += '<div class="m-lbl">Other marks — granted by the GM</div><div class="m-row" style="align-items:center;"><button class="chip" onclick="DBADV.extra(-1)"' + (V.extra > 0 ? '' : ' disabled') + '>−</button><b style="min-width:22px;text-align:center;">' + V.extra + '</b><button class="chip" onclick="DBADV.extra(1)">+</button></div>';
    var left = earned() - V.placed.length;
    h += '<div class="m-lbl">Place marks — ' + earned() + ' earned, <b style="color:#f3dca8;">' + Math.max(0, left) + '</b> left</div><div class="m-row">';
    skills().forEach(function (s) { var pre = st.skills[s.name] && st.skills[s.name].mark && V.placed.indexOf(s.name) < 0; var on = V.placed.indexOf(s.name) >= 0;
      h += '<button class="chip' + (on || pre ? ' sel' : '') + '"' + (pre ? ' title="Marked by a Dragon or Demon — click to remove the mark"' : (!on && left <= 0 ? ' disabled' : '')) + ' onclick="DBADV.' + (pre ? 'unmark' : 'place') + '(\'' + jsq(s.name) + '\')">' + esc(s.name) + ' <small>' + SH().skillLevel(s.name) + '</small>' + (pre ? ' ✓' : '') + '</button>'; });
    h += '</div>';
    var m = marked().length;
    show('Advancement', h, '<button class="m-btn ghost" onclick="DBADV.close()">Close</button><button class="m-btn" onclick="DBADV.rollAll()"' + (m ? '' : ' disabled') + '>Roll for ' + m + ' marked skill' + (m === 1 ? '' : 's') + '</button>');
  }
  function rollAll() {
    var st = S(); var list = marked(); var res = [], hit18 = [];
    list.forEach(function (n) { var lv = SH().skillLevel(n); var r = d20(); var up = r > lv && lv < 18;
      if (up) { var rec = st.skills[n] = st.skills[n] || {}; rec.lvl = lv + 1; if (lv + 1 === 18) hit18.push(n); }
      st.skills[n].mark = false; res.push({ n: n, lv: lv, r: r, up: up });
      SH().addLog('Advance · ' + n, up ? (lv + ' → ' + (lv + 1)) : 'No change', 'd20(' + r + ') vs ' + lv + (up ? ' · higher: +1' : ''), up && lv + 1 === 18 ? 'crit' : 'normal'); });
    if (V.weak === 'overcame') { SH().addLog('Weakness overcome', '✓', st.weakness + ' — play a full session without one, then you may pick a new one'); st.weakness = ''; }
    V.q = [false, false, false, false]; V.weak = 'none'; V.placed = []; V.extra = 0; SH().changed();
    var h = '<div class="res-box">' + res.map(function (x) { return '<b>' + esc(x.n) + '</b>: rolled ' + x.r + ' vs ' + x.lv + ' — ' + (x.up ? '<b style="color:#9fdcae;">' + x.lv + ' → ' + (x.lv + 1) + '</b>' : 'no change'); }).join('<br>') + '</div><p class="m-hint" style="margin-top:8px;">All advancement marks are erased.</p>';
    V.pending18 = hit18.length;
    if (hit18.length) h += '<div class="res-box" style="border-color:#c9a14a;"><b>' + esc(hit18.join(', ')) + ' reached 18!</b> Choose a heroic ability.</div>';
    show('Advancement Rolls', h, '<button class="m-btn ghost" onclick="DBADV.close()">Done</button>' + (hit18.length ? '<button class="m-btn" onclick="DBADV.pickAbility(\'18\')">Choose heroic ability</button>' : ''));
  }
  function pickAbility(why) {
    var st = S(); var list = A(window.DB_HEROIC_ABILITIES);
    var h = '<p class="m-hint">' + (why === '18' ? 'A skill reached 18: choose a heroic ability whose requirement you meet.' : 'A rare reward for a grand deed (at most once per standard adventure). You must meet the requirement.') + '</p><div class="brow-list" style="padding:0;">';
    list.forEach(function (x) { var ok = SH().meetsRequirement(x); var have = SH().hasAbility(x.name) && !x.repeatable;
      h += '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(x.name) + '</div><div class="brow-meta">' + esc(SH().reqText(x)) + ' · ' + (x.wp == null || x.wp === '' ? 'passive' : esc(x.wp) + ' WP') + (ok ? '' : ' · <span style="color:#ff9d8a;">not met</span>') + '</div><div class="brow-desc">' + esc(x.text) + '</div></div>' +
        (have ? '<button class="brow-add have" disabled>Have it</button>' : '<button class="brow-add"' + (ok ? '' : ' disabled') + ' onclick="DBADV.takeAbility(\'' + jsq(x.name) + '\',\'' + why + '\')">Take</button>') + '</div>'; });
    h += '</div>';
    show(why === '18' ? 'Heroic Ability' : 'GM Reward', h);
  }
  function takeAbility(n, why) { SH().addAbility(n, 'heroic'); SH().addLog('Heroic ability', n, why === '18' ? 'A skill reached 18' : 'GM reward', 'crit'); SH().changed();
    if (why === '18' && V.pending18 > 1) { V.pending18--; pickAbility('18'); return; } api.close(); }
  function renderTeacher() {
    var h = tabs('teacher') + '<p class="m-hint">A shift of training with a teacher whose skill level is 15 or more (and higher than yours) gives an immediate extra advancement roll. A teacher can raise a skill only one step before you must improve it yourself again.</p><div class="m-row">';
    skills().forEach(function (s) { var lv = SH().skillLevel(s.name); h += '<button class="chip"' + (lv >= 18 ? ' disabled' : '') + ' onclick="DBADV.teach(\'' + jsq(s.name) + '\')">' + esc(s.name) + ' <small>' + lv + '</small></button>'; });
    show('Advancement', h + '</div>');
  }
  function teach(n) { var st = S(); var lv = SH().skillLevel(n); var r = d20(); var up = r > lv && lv < 18; if (up) { (st.skills[n] = st.skills[n] || {}).lvl = lv + 1; }
    SH().addLog('Teacher · ' + n, up ? lv + ' → ' + (lv + 1) : 'No change', 'd20(' + r + ') vs ' + lv, up && lv + 1 === 18 ? 'crit' : 'normal'); SH().changed();
    if (up && lv + 1 === 18) { V.pending18 = 1; pickAbility('18'); return; } renderTeacher(); }
  function renderMagic() {
    var st = S(); var schools = SH().knownSchools(); var h = tabs('magic');
    if (!schools.length && !SH().hasAbility('Magic Talent')) { show('Advancement', h + '<p class="m-hint">You know no school of magic. Take the <b>Magic Talent</b> heroic ability (it has no requirement, but you need a GM reward or a skill at 18 to gain one) to learn a school.</p>'); return; }
    h += '<div class="m-lbl">Learn a spell</div><p class="m-hint">After a shift with a teacher (roll INT with a boon) or with a grimoire (roll Languages), spend the school\'s advancement mark instead of an advancement roll at the end of the session.</p>';
    var sp = A(window.DB_SPELLS).filter(function (s) { return (schools.indexOf(s.school) >= 0 || (s.school === 'General' && schools.length)) && !st.spells.some(function (x) { return x.name === s.name; }); });
    h += '<select class="m-input" id="adv-spell">' + sp.map(function (s) { return '<option value="' + esc(s.name) + '">' + esc(s.name) + ' — ' + esc(s.school) + ' rank ' + s.rank + (s.prerequisite ? ' (needs ' + esc(s.prerequisite) + ')' : '') + '</option>'; }).join('') + '</select>';
    h += '<div class="m-row" style="margin-top:6px;"><button class="m-btn" onclick="DBADV.learn(\'teacher\')"' + (sp.length ? '' : ' disabled') + '>From a teacher (INT, boon)</button><button class="m-btn ghost" onclick="DBADV.learn(\'grimoire\')"' + (sp.length ? '' : ' disabled') + '>From a grimoire (Languages)</button></div>';
    var tr = A(window.DB_MAGIC_TRICKS).filter(function (t) { return (schools.indexOf(t.school) >= 0 || t.school === 'General') && !st.tricks.some(function (x) { return x.name === t.name; }); });
    h += '<div class="m-lbl">Learn a magic trick</div><p class="m-hint">A stretch with a teacher or grimoire — no mark or roll needed.</p><div class="m-row">' + tr.map(function (t) { return '<button class="chip" onclick="DBADV.trick(\'' + jsq(t.name) + '\')">' + esc(t.name) + ' <small>' + esc(t.school) + '</small></button>'; }).join('') + '</div>';
    var newS = A((window.DB_MAGIC_RULES || {}).schools).filter(function (s) { return schools.indexOf(s) < 0; });
    var talents = SH().state.abilities.filter(function (a) { return a.name === 'Magic Talent'; }).length;
    h += '<div class="m-lbl">Learn a new school</div><p class="m-hint">Needs a Magic Talent heroic ability per new school (you have ' + talents + ', and know ' + schools.length + ' school' + (schools.length === 1 ? '' : 's') + '), a week with a teacher, then an INT roll: success gives your INT base chance as the school\'s level.</p><div class="m-row">' +
      newS.map(function (s) { return '<button class="chip"' + (talents > Math.max(0, schools.length - (SH().state.profession === 'Mage' ? 1 : 0)) ? '' : ' disabled') + ' onclick="DBADV.school(\'' + s + '\')">' + s + '</button>'; }).join('') + '</div>';
    show('Advancement', h);
  }
  function learn(how) { var n = ($('adv-spell') || {}).value; if (!n) return; var st = S(); var sp = SH().spellDef(n) || {};
    var skill = how === 'teacher' ? null : 'Languages';
    if (sp.school && sp.school !== 'General') { var rec = st.skills[sp.school] || {}; if (rec.mark) { rec.mark = false; } }
    SH().testRoll({ label: 'Learn ' + n + (how === 'teacher' ? ' (INT, teacher)' : ' (Languages, grimoire)'), target: skill ? SH().skillLevel(skill) : st.attrs.INT, skill: skill || undefined, attr: skill ? undefined : 'INT', boons: how === 'teacher' ? ['Teacher'] : [], noMark: true, noTray: true,
      onDone: function (r) { if (r.ok) { st.spells.push({ name: n, prepared: false }); SH().addLog('Spell learned', n, 'Written in your grimoire — prepare it after a shift rest', 'crit'); SH().changed(); renderMagic(); } } }); }
  function trick(n) { S().tricks.push({ name: n }); SH().addLog('Trick learned', n, ''); SH().changed(); renderMagic(); }
  function school(s) { var st = S(); SH().testRoll({ label: 'Learn ' + s + ' (INT)', target: st.attrs.INT, attr: 'INT', noMark: true, noTray: true, onDone: function (r) {
    if (r.ok) { st.skills[s] = { trained: true, lvl: SH().baseChance(st.attrs.INT) }; SH().addLog('New school', s, 'Level ' + SH().baseChance(st.attrs.INT) + ' (INT base chance)', 'crit'); SH().changed(); renderMagic(); }
    else SH().addLog('New school', 'Not yet', 'Study another week and try again'); } }); }
  var api = {
    open: function () { if (!SH()) return; V = { q: [false, false, false, false], weak: 'none', placed: [], extra: 0, pending18: 0, tab: 'session' }; renderSession(); },
    close: function () { $('advance-overlay').classList.remove('open'); },
    tab: function (t) { V.tab = t; if (t === 'session') renderSession(); else if (t === 'teacher') renderTeacher(); else if (t === 'magic') renderMagic(); else pickAbility('gm'); },
    q: function (i, on) { V.q[i] = !!on; trim(); renderSession(); },
    weak: function (w) { V.weak = w; trim(); renderSession(); },
    extra: function (d) { V.extra = Math.max(0, (V.extra || 0) + d); trim(); renderSession(); },
    unmark: function (n) { setMark(n, false); SH().changed(); renderSession(); },
    place: function (n) { var i = V.placed.indexOf(n); if (i >= 0) { V.placed.splice(i, 1); setMark(n, false); } else if (V.placed.length < earned()) { V.placed.push(n); setMark(n, true); } SH().changed(); renderSession(); },
    rollAll: rollAll, pickAbility: pickAbility, takeAbility: takeAbility, teach: teach, learn: learn, trick: trick, school: school
  };
  function trim() { while (V.placed.length > earned()) { setMark(V.placed.pop(), false); } SH().changed(); }
  window.DBADV = api;
})();
