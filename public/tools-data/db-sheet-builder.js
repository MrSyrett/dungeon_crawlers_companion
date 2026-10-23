// Dragonbane character creation wizard (window.DBB).
// Walks the core book's steps in order — kin (its innate abilities shown with it: they
// aren't a choice), profession, age, name, attributes, trained skills, heroic ability,
// weakness, gear, memento, appearance — with a "choose or roll" control wherever the book
// offers a table. A mage's heroic-ability step is the Magic step (school, spells, tricks)
// and comes before Trained Skills, since the school decides the profession skill list.
// The step pills are navigation: any step can be opened; a step that needs an earlier
// choice says so. Derived ratings (movement, damage bonuses, HP, WP) simply compute on the
// sheet, so they have no step.
// Attributes work the D&D / Shadowdark way: roll all six (4D6, drop the lowest) and keep
// them in order — the book's rule, with its one swap — or assign them; or take a standard
// array (a house option). Rules and tables
// come from window.DB_* (db-data.js); the finished character is handed to the
// sheet through window.DBSHEET.applyBuild. Renders into #builder-overlay.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  function A(x) { return Array.isArray(x) ? x : []; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function jsq(s) { return esc(String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }  // a string inside a JS literal inside an HTML attribute
  function d(n) { return 1 + Math.floor(Math.random() * n); }
  function T() { return window.DB_TABLES || {}; }
  function SH() { return window.DBSHEET; }
  function log(l, r, dt, t) { if (SH()) SH().addLog(l, r, dt, t || 'normal'); }
  var ATTRS = ['STR', 'CON', 'AGL', 'INT', 'WIL', 'CHA'];
  var BASE_STEPS = ['Kin', 'Profession', 'Age', 'Name', 'Attributes', 'Trained Skills', 'Heroic Ability', 'Weakness', 'Gear', 'Memento', 'Appearance'];
  var MAGE_STEPS = ['Kin', 'Profession', 'Age', 'Name', 'Attributes', 'Heroic Ability', 'Trained Skills', 'Weakness', 'Gear', 'Memento', 'Appearance'];
  // a mage picks the school (Magic step) before skills: the school sets the profession skill list
  function steps() { return prof() && prof().mage ? MAGE_STEPS : BASE_STEPS; }
  var STEPS = { get length() { return BASE_STEPS.length; } };
  // Each school's focus, in a line (from the book's spell lists); the rest comes from the data.
  var SCHOOL_FOCUS = { Animism: 'Nature, beasts and healing — roots that ensnare, lightning, banishing the undead, mending wounds.', Elementalism: 'Fire, frost, wind and stone — fireballs, gusts, stone walls and shields, summoned elementals.', Mentalism: 'Mind over body — far sight, levitation, a stone-hard skin, a fist of force, telepathy and flight.' };
  var SCHOOL_TITLE = { Animism: 'Animist', Elementalism: 'Elementalist', Mentalism: 'Mentalist' };
  // House standard array (the book has none): the expected sorted result of six 4D6-drop-lowest
  // rolls (15.7, 14.2, 13.0, 11.8, 10.4, 8.5), rounded toward the player.
  var ARRAY = [16, 14, 13, 12, 10, 9];
  var B = null, step = 0, seen = {};  // seen: steps opened (by name), so an untouched optional step isn't ticked

  function fresh() { return { kin: '', prof: '', age: '', name: '', nick: '', attrs: {}, method: 'roll', order: 'order', pool: null, assign: [0, 1, 2, 3, 4, 5], swap: [], swapped: false,
    profSkills: [], freeSkills: [], school: '', ability: '', spells: [], tricks: [], kit: -1, kitChoice: {}, food: null, silver: null, foodTxt: '', silverTxt: '',
    weakness: '', memento: '', appearance: '' }; }
  function kin() { return A(window.DB_KIN).find(function (k) { return k.name === B.kin; }) || null; }
  function prof() { return A(window.DB_PROFESSIONS).find(function (p) { return p.name === B.prof; }) || null; }
  function age() { return A(T().ages).find(function (a) { return a.id === B.age; }) || null; }
  function inRoll(r, n) { return Array.isArray(r) ? (n >= r[0] && n <= r[1]) : n === r; }
  // The base score for an attribute: rolled pool (in order, or assigned), or the array.
  function slotOf(a) { var i = ATTRS.indexOf(a); return (B.method === 'array' || B.order === 'assign') ? B.assign[i] : i; }
  function baseAttr(a) { if (B.method === 'array') return ARRAY[slotOf(a)];
    if (!B.pool) return null; var r = B.pool[slotOf(a)]; return r ? r.v : null; }
  function syncAttrs() { B.attrs = {}; ATTRS.forEach(function (a) { var v = baseAttr(a); if (v != null) B.attrs[a] = v; }); }
  function finalAttr(a) { var v = B.attrs[a]; if (v == null) return null; var m = (age() && age().mods && age().mods[a]) || 0; return Math.max(3, Math.min(18, v + m)); }
  function base(v) { return SH() ? SH().baseChance(v) : 5; }
  function skillAttr(n) { var s = A(window.DB_SKILLS).find(function (x) { return x.name === n; }); return s ? s.attribute : 'STR'; }
  function lvl(n) { var v = finalAttr(skillAttr(n)); return v == null ? '—' : 2 * base(v); }
  function profList() { var p = prof(); if (!p) return []; if (p.mage) return B.school ? A((p.schoolSkills || {})[B.school]) : []; return A(p.skills); }
  function nProf() { var a = age(); return a ? a.professionSkills || 6 : 6; }
  function nFree() { var a = age(); return a ? a.freeSkills : 4; }
  function chip(label, on, act, dis, title) { return '<button class="chip' + (on ? ' sel' : '') + '"' + (dis ? ' disabled' : '') + ' onclick="' + act + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + label + '</button>'; }
  function rollBtn(label, act) { return '<button class="m-btn ghost" style="padding:6px 12px;" onclick="' + act + '">🎲 ' + label + '</button>'; }
  // The step's subtitle line: the roll button stands where the "choose or roll" text was.
  function sub(btns) { return '<div class="m-row bd-sub" style="margin-bottom:10px;">' + btns + '</div>'; }
  // a label line with its roll button at the right
  function lblRoll(label, btn) { return '<div class="m-lbl" style="display:flex;align-items:center;justify-content:space-between;gap:8px;"><span>' + label + '</span>' + btn + '</div>'; }
  function box(h) { return '<div class="res-box">' + h + '</div>'; }

  function valid(i) {
    var p = prof();
    switch (steps()[i]) {
      case 'Kin': return !!kin(); case 'Profession': return !!prof(); case 'Age': return !!age();
      case 'Name': return !!String(B.name).trim();
      case 'Attributes': return ATTRS.every(function (a) { return B.attrs[a] != null; });
      case 'Trained Skills': if (!p) return false; return (!p.mage || !!B.school) && B.profSkills.length === nProf() && B.freeSkills.length === nFree() && (!p.mage || B.profSkills.indexOf(B.school) >= 0);
      case 'Heroic Ability': if (!p) return false; if (p.mage) return !!B.school && B.spells.length === 3 && B.tricks.length === 3; return !p.heroicChoice || !!B.ability;
      case 'Gear': if (!p) return false; var k = A(p.kits)[B.kit]; if (!k) return false; return k.items.every(function (it, ix) { return !it.choice || !!B.kitChoice[ix]; }) && B.food != null && B.silver != null;
      default: return true;
    }
  }
  // a mage's "heroic ability" step is choosing spells and tricks
  function stepName(i) { var s = steps()[i]; return s === 'Heroic Ability' && prof() && prof().mage ? 'Magic' : s; }
  // the step pills double as navigation (as in the YZE-family wizards): click to open a step;
  // a finished (opened and complete) step carries a check
  function render() {
    seen[steps()[step]] = true;
    var h = '<nav class="bd-steps" aria-label="Steps">' + steps().map(function (s, i) { var ok = i !== step && !!seen[s] && valid(i), cls = 'bd-step' + (i === step ? ' on' : '') + (ok ? ' done' : '');
      return '<button class="' + cls + '"' + (i === step ? ' aria-current="step"' : '') + ' onclick="DBB.go(' + i + ')">' + (i + 1) + '. ' + esc(stepName(i)) + (ok ? ' <span class="bd-ck">✓</span>' : '') + '</button>'; }).join('') + '</nav>';
    h += '<div class="bd-title" style="font-family:var(--f-disp);font-size:24px;margin-bottom:6px;">' + (step + 1) + '. ' + esc(stepName(step)) + '</div>' + page();
    // same step re-rendered (a pick, a roll): keep the modal body where it was; a new step starts at the top
    var body = $('builder-body'), same = render._step === step, prev = body.scrollTop;
    body.innerHTML = h;
    body.scrollTop = same ? prev : 0;
    render._step = step;
    $('builder-title').textContent = 'Create a Character';
    $('builder-ft').innerHTML = '<button class="m-btn ghost" onclick="DBB.back()"' + (step === 0 ? ' disabled' : '') + '>Back</button><span class="m-hint" style="margin:0;align-self:center;">' + (valid(step) ? '' : 'Finish this step to continue') + '</span>' +
      (step < STEPS.length - 1 ? '<button class="m-btn" onclick="DBB.next()"' + (valid(step) ? '' : ' disabled') + '>Next</button>' : '<button class="m-btn" onclick="DBB.finish()"' + (allValid() ? '' : ' disabled') + '>Create Character</button>');
  }
  function allValid() { for (var i = 0; i < STEPS.length; i++) if (!valid(i)) return false; return true; }

  function page() {
    var h = '', k = kin(), p = prof(), a = age();
    switch (steps()[step]) {
      case 'Kin':
        h += sub(rollBtn('Roll D12', 'DBB.rollKin()')) + '<div class="m-row">' + A(window.DB_KIN).map(function (x) { return chip(esc(x.name), B.kin === x.name, "DBB.set('kin','" + jsq(x.name) + "')"); }).join('') + '</div>';
        if (k) { h += box('<b>' + esc(k.name) + '</b> — ' + esc(k.text) + '<br>Movement <b>' + k.movement + '</b>.');
          h += '<div class="m-lbl">Innate abilit' + (A(k.abilities).length > 1 ? 'ies' : 'y') + '</div>' + A(k.abilities).map(function (x) { return box('<b>' + esc(x.name) + '</b>' + (x.wp ? ' · ' + x.wp + ' WP' : '') + '<br>' + esc(x.text)); }).join(''); }
        return h;
      case 'Profession':
        h += sub(rollBtn('Roll D10', 'DBB.rollProf()')) + '<div class="m-row">' + A(window.DB_PROFESSIONS).map(function (x) { return chip(esc(x.name), B.prof === x.name, "DBB.set('prof','" + jsq(x.name) + "')"); }).join('') + '</div>';
        if (p) h += box('<b>' + esc(p.name) + '</b> — ' + esc(p.text) + '<br>Key attribute <b>' + p.keyAttribute + '</b>' + (p.mage ? ' · chooses a school of magic (in the Magic step)' : ' · heroic ability: ' + esc(A(p.heroicAbilities).join(p.heroicChoice ? ' / ' : ', ')) + (p.heroicChoice ? ' (choose one)' : '')));
        return h;
      case 'Age':
        h += sub(rollBtn('Roll D6', 'DBB.rollAge()')) + '<div class="m-row">' + A(T().ages).map(function (x) { return chip(esc(x.name), B.age === x.id, "DBB.set('age','" + x.id + "')"); }).join('') + '</div>';
        if (a) { var mods = Object.keys(a.mods || {}).map(function (m) { return m + ' ' + (a.mods[m] > 0 ? '+' : '') + a.mods[m]; }); h += box('<b>' + esc(a.name) + '</b> — ' + a.trainedSkills + ' trained skills (' + a.professionSkills + ' from your profession + ' + a.freeSkills + ' of your choice)' + (mods.length ? '<br>Attributes: ' + mods.join(', ') + ' (never above 18).' : '<br>No attribute changes.')); }
        return h;
      case 'Name':
        if (!k || !p) h += need(!k ? 'Kin' : 'Profession', 'for its name table');
        h += lblRoll('Name', k ? rollBtn('Roll D6', 'DBB.rollName()') : '') + '<input class="m-input" id="bd-name" value="' + esc(B.name) + '" oninput="DBB.setq(\'name\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(k && k.names).map(function (n) { return chip(esc(n), B.name === n, "DBB.set('name','" + jsq(n) + "')"); }).join('') + '</div>';
        h += lblRoll('Nickname', p ? rollBtn('Roll D6', 'DBB.rollNick()') : '') + '<input class="m-input" id="bd-nick" value="' + esc(B.nick) + '" oninput="DBB.setq(\'nick\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(p && p.nicknames).map(function (n) { return chip(esc(n), B.nick === n, "DBB.set('nick','" + jsq(n) + "')"); }).join('') + '</div>';
        return h;
      case 'Attributes': return attrPage();
      case 'Trained Skills': return p ? skillsPage() : need('Profession', 'for its skill list');
      case 'Heroic Ability': return p ? abilityPage() : need('Profession', 'for its heroic ability');
      case 'Weakness':
        h += sub(rollBtn('Roll D20', 'DBB.rollTable(\'weakness\')') + chip('None', !B.weakness, "DBB.set('weakness','')"));
        h += '<div class="m-lbl">Weakness</div><input class="m-input" value="' + esc(B.weakness) + '" oninput="DBB.setq(\'weakness\',this.value)">';
        h += '<div class="brow-list" style="padding:0;margin-top:8px;max-height:240px;">' + A(window.DB_WEAKNESSES).map(function (w) { return '<div class="brow-item" style="padding:5px 2px;"><div class="brow-main"><div class="brow-name" style="font-size:14px;">' + esc(w.name) + '</div><div class="brow-desc">' + esc(w.text) + '</div></div><button class="brow-add ghost" onclick="DBB.set(\'weakness\',\'' + jsq(w.name + ' — ' + w.text) + '\')">Pick</button></div>'; }).join('') + '</div>';
        return h;
      case 'Gear': return p ? gearPage() : need('Profession', 'for its gear kits');
      case 'Memento':
        h += sub(rollBtn('Roll D20', 'DBB.rollTable(\'memento\')') + chip('None', !B.memento, "DBB.set('memento','')"));
        h += '<div class="m-lbl">Memento</div><input class="m-input" value="' + esc(B.memento) + '" oninput="DBB.setq(\'memento\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(window.DB_MEMENTOS).map(function (m) { return chip(esc(m.text), B.memento === m.text, "DBB.set('memento','" + jsq(m.text) + "')"); }).join('') + '</div>';
        return h;
      case 'Appearance':
        h += sub(rollBtn('Roll D20', 'DBB.rollTable(\'appearance\')'));
        h += '<div class="m-lbl">Appearance</div><input class="m-input" value="' + esc(B.appearance) + '" oninput="DBB.setq(\'appearance\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(window.DB_APPEARANCES).map(function (m) { return chip(esc(m.text), B.appearance === m.text, "DBB.set('appearance','" + jsq(m.text) + "')"); }).join('') + '</div>';
        h += box('<b>' + esc(B.name || 'Unnamed') + (B.nick ? ' ' + esc(B.nick) : '') + '</b> — ' + [esc(B.kin), esc(B.prof)].filter(Boolean).join(' ') + (a ? ', ' + esc(a.name.toLowerCase()) : '') + '. ' + ATTRS.map(function (x) { var v = finalAttr(x); return x + ' ' + (v == null ? '—' : v); }).join(', ') + '.');
        var todo = steps().map(function (s, i) { return i; }).filter(function (i) { return i !== step && !valid(i); });
        if (todo.length) h += '<p class="m-hint" style="margin-top:8px;">Still to finish: ' + todo.map(function (i) { return '<a href="#" style="color:#5cb894;" onclick="DBB.go(' + i + ');return false;">' + esc(stepName(i)) + '</a>'; }).join(', ') + '.</p>';
        return h;
    }
    return '';
  }

  function attrPage() {
    var am = age() && Object.keys(age().mods || {}).length ? age().mods : null;
    var h = '<div class="m-row bd-sub" style="margin-bottom:8px;">' +
      '<button class="m-btn' + (B.method === 'roll' ? '' : ' ghost') + '" style="flex:1;" onclick="DBB.rollAll()" title="4D6, drop the lowest, for each attribute">🎲 Roll 4D6</button>' +
      '<button class="m-btn' + (B.method === 'array' ? '' : ' ghost') + '" style="flex:1;" onclick="DBB.method(\'array\')" title="A house option: Dragonbane has no standard array">Standard Array <small>(house)</small></button></div>';
    if (B.method === 'roll' && B.pool) h += '<div class="m-row" style="margin-bottom:8px;">' + chip('In order (as rolled)', B.order !== 'assign', "DBB.order('order')") + chip('Assign them', B.order === 'assign', "DBB.order('assign')") + '</div>';
    if (B.method === 'roll' && B.pool && B.order !== 'assign') h += '<p class="m-hint" style="margin-bottom:6px;">' + (B.swapped ? 'Swapped' : 'Swap two (once)') + '</p>';
    var assignSel = function (a, labels) { var cur = slotOf(a); return '<select class="m-input" style="width:auto;min-width:84px;" onchange="DBB.assign(\'' + a + '\',this.value)">' + labels.map(function (l, i) { return '<option value="' + i + '"' + (i === cur ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select>'; };
    var FULL = { STR: 'Strength', CON: 'Constitution', AGL: 'Agility', INT: 'Intelligence', WIL: 'Willpower', CHA: 'Charisma' };
    h += '<table class="tbl" style="color:#e9e7e3;"><tbody>' + ATTRS.map(function (a) { var bv = baseAttr(a), fv = finalAttr(a), mod = am ? (am[a] || 0) : 0, cell = '';
      if (B.method === 'array') cell = assignSel(a, ARRAY.map(String));
      else if (B.pool) { var r = B.pool[slotOf(a)];
        if (B.order === 'assign') cell = assignSel(a, B.pool.map(function (x) { return String(x.v); })) + ' <small style="color:#a09d96;">(' + r.dice.join(', ') + ' — dropped ' + r.drop + ')</small>';
        else { var sel = B.swap.indexOf(a) >= 0; cell = '<button class="chip' + (sel ? ' sel' : '') + '" style="min-width:56px;font-size:16px;"' + (B.swapped ? ' disabled' : '') + ' onclick="DBB.swapPick(\'' + a + '\')" title="Click two attributes to swap them (once)">' + r.v + '</button> <small style="color:#a09d96;">(' + r.dice.join(', ') + ' — dropped ' + r.drop + ')</small>'; } }
      else cell = '<span style="color:#a09d96;">—</span>';
      return '<tr><td style="font-family:var(--f-label);font-size:15px;color:#fff;">' + a + ' <small style="color:#a09d96;">' + FULL[a] + '</small></td><td style="width:50%;">' + cell + '</td><td class="mono" style="color:#a09d96;">' + (mod ? 'age ' + (mod > 0 ? '+' : '') + mod : '') + '</td><td class="mono" style="font-size:20px;font-weight:600;color:#f3e6d4;">' + (fv == null ? '—' : fv) + '</td></tr>'; }).join('') + '</tbody></table>';
    if (B.method === 'roll' && B.pool) h += '<p class="m-hint" style="margin-top:6px;"><a href="#" style="color:#5cb894;" onclick="DBB.rollAll();return false;">Roll again</a></p>';
    return h;
  }
  function skillsPage() {
    var p = prof(), h = '';
    if (p.mage && !B.school) return need('Magic', 'to choose your school of magic: it sets your profession skills');
    if (p.mage) h += '<p class="m-hint" style="margin-bottom:4px;">School: <b style="color:#f3dca8;">' + esc(B.school) + '</b> (a trained skill) · <a href="#" style="color:#5cb894;" onclick="DBB.go(' + steps().indexOf('Heroic Ability') + ');return false;">change</a></p>';
    var list = profList();
    if (!p.mage || B.school) {
      h += '<div class="m-lbl">Profession skills — choose ' + nProf() + ' of ' + list.length + ' (' + B.profSkills.length + ' chosen)</div><div class="m-row">' + list.map(function (s) { var on = B.profSkills.indexOf(s) >= 0; var forced = p.mage && s === B.school;
        return chip(esc(s) + ' <small>' + lvl(s) + '</small>', on, forced ? '' : "DBB.toggleSkill('prof','" + jsq(s) + "')", forced || (!on && B.profSkills.length >= nProf())); }).join('') + '</div>';
      var all = A(window.DB_SKILLS).filter(function (s) { return s.type !== 'secondary' && B.profSkills.indexOf(s.name) < 0; });
      h += '<div class="m-lbl">Free choice — ' + nFree() + ' more of any skill (' + B.freeSkills.length + ' chosen)</div><div class="m-row">' + all.map(function (s) { var on = B.freeSkills.indexOf(s.name) >= 0;
        return chip(esc(s.name) + ' <small>' + lvl(s.name) + '</small>', on, "DBB.toggleSkill('free','" + jsq(s.name) + "')", !on && B.freeSkills.length >= nFree()); }).join('') + '</div>';
    }
    return h;
  }
  // a "finish that step first" prompt with a link to it
  function need(label, why) { var i = steps().indexOf(label === 'Magic' ? 'Heroic Ability' : label);
    return '<div class="res-box">Choose your <b>' + esc(label === 'Magic' ? 'school of magic' : label.toLowerCase()) + '</b> first, ' + esc(why) + '. <a href="#" style="color:#5cb894;" onclick="DBB.go(' + i + ');return false;">Go to ' + esc(label) + '</a></div>'; }
  function schoolCards(p) {
    var R = window.DB_MAGIC_RULES || {}, schools = A(R.schools).length ? R.schools : Object.keys(p.schoolSkills || {});
    return '<div class="m-lbl">School of magic</div><div class="bd-schools">' + schools.map(function (s) { var on = B.school === s;
      var sk = A(window.DB_SKILLS).find(function (x) { return x.name === s; });
      var sp = A(window.DB_SPELLS).filter(function (x) { return x.school === s; }), r1 = sp.filter(function (x) { return x.rank === 1; });
      var tr = A(window.DB_MAGIC_TRICKS).filter(function (x) { return x.school === s; });
      var skills = A((p.schoolSkills || {})[s]).filter(function (x) { return x !== s; });
      return '<button class="bd-school' + (on ? ' sel' : '') + '" aria-pressed="' + on + '" onclick="DBB.school(\'' + jsq(s) + '\')">' +
        '<div class="bd-school-hd"><b>' + esc(s) + '</b><span>' + esc(SCHOOL_TITLE[s] || '') + (on ? ' ✓' : '') + '</span></div>' +
        (sk && sk.text ? '<div class="bd-school-tx">' + esc(sk.text) + '</div>' : '') +
        (SCHOOL_FOCUS[s] ? '<div class="bd-school-tx dim">' + esc(SCHOOL_FOCUS[s]) + '</div>' : '') +
        '<div class="bd-school-row"><i>Rank 1 spells</i> ' + r1.map(function (x) { return esc(x.name); }).join(', ') + (sp.length > r1.length ? ' <small>(+' + (sp.length - r1.length) + ' of higher rank)</small>' : '') + '</div>' +
        '<div class="bd-school-row"><i>Tricks</i> ' + tr.map(function (x) { return esc(x.name); }).join(', ') + '</div>' +
        '<div class="bd-school-row"><i>Profession skills</i> ' + [esc(s) + ' (INT)'].concat(skills.map(esc)).join(', ') + '</div></button>'; }).join('') + '</div>' +
      '<p class="m-hint" style="margin-top:6px;">Your school is a trained skill (INT). Any school can also cast general magic.</p>';
  }
  function abilityPage() {
    var p = prof(), h = '';
    if (p.mage) {
      h += schoolCards(p);
      if (!B.school) return h;
      var sp = A(window.DB_SPELLS).filter(function (s) { return s.rank === 1 && (s.school === B.school || s.school === 'General'); });
      var tr = A(window.DB_MAGIC_TRICKS).filter(function (s) { return s.school === B.school || s.school === 'General'; });
      // the same rows as the sheet's spell picker (name, meta line, text, Learn button)
      var row = function (k, s, meta) { var on = B[k].indexOf(s.name) >= 0, full = !on && B[k].length >= 3;
        var btn = on ? '<button class="brow-add have" style="cursor:pointer;" onclick="DBB.toggleList(\'' + k + '\',\'' + jsq(s.name) + '\')">✓ Learned</button>' : '<button class="brow-add"' + (full ? ' disabled' : '') + ' onclick="DBB.toggleList(\'' + k + '\',\'' + jsq(s.name) + '\')">Learn</button>';
        return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(s.name) + '</div><div class="brow-meta">' + meta + '</div><div class="brow-desc">' + esc(s.text || '') + '</div></div><div class="brow-btns">' + btn + '</div></div>'; };
      var rng = function (r) { return /^\d+$/.test(String(r)) ? r + ' m' : String(r || '').replace(/ meters?$/, ' m'); };
      var cap = function (t) { t = String(t || ''); return t ? t.charAt(0).toUpperCase() + t.slice(1) : ''; };
      h += '<div class="m-lbl">Spells (' + B.spells.length + '/3)</div><div class="brow-list" style="padding:0;">' + sp.map(function (s) { return row('spells', s, ['Rank ' + s.rank, s.school, cap(s.castingTime), rng(s.range), s.duration].filter(Boolean).map(esc).join(' · ')); }).join('') + '</div>';
      h += '<div class="m-lbl">Magic Tricks (' + B.tricks.length + '/3)</div><div class="brow-list" style="padding:0;">' + tr.map(function (s) { return row('tricks', s, esc(s.school) + ' · 1 WP'); }).join('') + '</div>';
      return h;
    }
    var names = A(p.heroicAbilities);
    names.forEach(function (n) { var def = SH() ? SH().abilityDef(n) : null; var on = p.heroicChoice ? B.ability === n : true;
      h += '<div class="res-box" style="' + (p.heroicChoice ? 'cursor:pointer;' : '') + (on ? 'border-color:#236855;' : '') + '" ' + (p.heroicChoice ? 'onclick="DBB.set(\'ability\',\'' + jsq(n) + '\')"' : '') + '><b>' + esc(n) + '</b>' + (def && def.wp ? ' · ' + esc(def.wp) + ' WP' : '') + (p.heroicChoice ? (on ? ' ✓' : '') : '') + '<br>' + esc(def ? def.text : '') + '</div>'; });
    return h;
  }
  function kitItems(k) { return k.items.map(function (it, ix) { var n = it.choice ? (B.kitChoice[ix] || '') : it.name; return { name: n, qty: it.qty || 1, note: it.note || '', choice: it.choice, ix: ix }; }); }
  function gearPage() {
    var p = prof(), h = sub(rollBtn('Roll D6', 'DBB.rollKit()'));
    A(p.kits).forEach(function (k, i) { var on = B.kit === i;
      h += '<div class="res-box" style="cursor:pointer;' + (on ? 'border-color:#236855;' : '') + '" onclick="DBB.kit(' + i + ')">' + k.items.map(function (it) { return it.choice ? it.choice.join(' or ') : (it.qty > 1 ? it.qty + '× ' : '') + it.name + (it.note ? ' (' + it.note + ')' : ''); }).map(esc).join(', ') + ', ' + esc(k.food) + ' food rations, ' + esc(k.silver) + ' silver' + (on ? ' ✓' : '') + '</div>'; });
    var k = A(p.kits)[B.kit];
    if (k) {
      k.items.forEach(function (it, ix) { if (!it.choice) return; h += '<div class="m-lbl">Choose</div><div class="m-row">' + it.choice.map(function (c) { return chip(esc(c), B.kitChoice[ix] === c, 'DBB.kitChoice(' + ix + ",'" + jsq(c) + "')"); }).join('') + '</div>'; });
      h += box('Food rations: <b>' + (B.food == null ? '—' : B.food) + '</b> ' + esc(B.foodTxt) + ' · Silver: <b>' + (B.silver == null ? '—' : B.silver) + '</b> ' + esc(B.silverTxt) + ' <button class="chip" onclick="event.stopPropagation();DBB.rollSupplies()">Re-roll</button>');
    }
    return h;
  }

  // ── actions ──
  var api = {
    launch: function () { B = fresh(); step = 0; seen = {}; render._step = -1; $('builder-overlay').classList.add('open'); render(); },
    close: function () { $('builder-overlay').classList.remove('open'); },
    next: function () { if (!valid(step)) return; step = Math.min(STEPS.length - 1, step + 1); render(); },
    back: function () { step = Math.max(0, step - 1); render(); },
    go: function (i) { i = parseInt(i, 10); if (isNaN(i) || i < 0 || i >= STEPS.length) return; step = i; render(); },
    set: function (k, v) { if (k === 'prof' && B.prof !== v) { B.profSkills = []; B.freeSkills = []; B.school = ''; B.ability = ''; B.spells = []; B.tricks = []; B.kit = -1; B.kitChoice = {}; B.food = null; B.silver = null; }
      if (k === 'age' && B.age !== v) { B.freeSkills = B.freeSkills.slice(0, (A(T().ages).find(function (a) { return a.id === v; }) || {}).freeSkills || 4); }
      B[k] = String(v); render(); },
    setq: function (k, v) { B[k] = v; var ft = $('builder-ft'); if (ft) { var nb = ft.querySelector('.m-btn:last-child'); if (nb) nb.disabled = !(step === STEPS.length - 1 ? allValid() : valid(step)); } },
    rollKin: function () { var n = d(12); var k = A(window.DB_KIN).find(function (x) { return inRoll(x.roll, n); }); if (k) { api.set('kin', k.name); log('Kin', k.name, 'd12(' + n + ')'); } },
    rollProf: function () { var n = d(10); var p = A(window.DB_PROFESSIONS).find(function (x) { return x.roll === n; }); if (p) { api.set('prof', p.name); log('Profession', p.name, 'd10(' + n + ')'); } },
    rollAge: function () { var n = d(6); var a = A(T().ages).find(function (x) { return inRoll(x.roll, n); }); if (a) { api.set('age', a.id); log('Age', a.name, 'd6(' + n + ')'); } },
    rollName: function () { var n = d(6); var k = kin(); if (!k) return; api.set('name', A(k.names)[n - 1]); },
    rollNick: function () { var n = d(6); if (!prof()) return; api.set('nick', A(prof().nicknames)[n - 1]); },
    method: function (m) { if (m !== B.method) { B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; } B.method = m === 'order' || m === 'pool' ? 'roll' : m; if (m === 'pool') B.order = 'assign'; syncAttrs(); render(); },
    order: function (o) { B.order = o === 'assign' ? 'assign' : 'order'; B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; syncAttrs(); render(); },
    // Give attribute `a` the pool / array slot `idx`; whichever attribute held it takes a's old slot.
    assign: function (a, idx) { var i = ATTRS.indexOf(a), v = parseInt(idx, 10) || 0; var other = B.assign.indexOf(v); if (other >= 0 && other !== i) B.assign[other] = B.assign[i]; B.assign[i] = v; syncAttrs(); render(); },
    resetAttrs: function () { B.pool = null; B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; syncAttrs(); render(); },
    rollAll: function () { B.method = 'roll'; B.pool = ATTRS.map(function () { return roll4(); }); B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; syncAttrs();
      log('Attributes', B.pool.map(function (r, i) { return ATTRS[i] + ' ' + r.v; }).join(' '), B.pool.map(function (r) { return '4d6(' + r.dice.join(',') + ') drop ' + r.drop; }).join(' · ')); render(); },
    // In order: the book's single swap of two scores (swaps their pool slots).
    swapPick: function (a) { if (B.swapped || !B.pool || B.order === 'assign') return; var i = B.swap.indexOf(a); if (i >= 0) B.swap.splice(i, 1); else B.swap.push(a);
      if (B.swap.length === 2) { var x = B.swap[0], y = B.swap[1], t = B.pool[ATTRS.indexOf(x)]; B.pool[ATTRS.indexOf(x)] = B.pool[ATTRS.indexOf(y)]; B.pool[ATTRS.indexOf(y)] = t; B.swap = []; B.swapped = true; syncAttrs(); log('Attributes', 'Swapped', x + ' ↔ ' + y); } render(); },
    // Changing school keeps the profession skills the new school's list also has, and the
    // general spells / tricks (only the old school's own ones go).
    school: function (s) { s = String(s).replace(/&#39;/g, "'"); if (B.school === s) return; var p = prof(), list = A(p && (p.schoolSkills || {})[s]);
      B.profSkills = [s].concat(B.profSkills.filter(function (x) { return x !== B.school && x !== s && list.indexOf(x) >= 0; })).slice(0, nProf());
      var keep = function (src) { return function (n) { var x = A(src).find(function (y) { return y.name === n; }); return !!x && x.school === 'General'; }; };
      B.spells = B.spells.filter(keep(window.DB_SPELLS)); B.tricks = B.tricks.filter(keep(window.DB_MAGIC_TRICKS)); B.school = s; render(); },
    toggleSkill: function (which, n) { n = String(n).replace(/&#39;/g, "'"); var list = which === 'prof' ? B.profSkills : B.freeSkills; var i = list.indexOf(n);
      if (i >= 0) list.splice(i, 1); else if (list.length < (which === 'prof' ? nProf() : nFree())) list.push(n); render(); },
    toggleList: function (k, n) { n = String(n).replace(/&#39;/g, "'"); var l = B[k]; var i = l.indexOf(n); if (i >= 0) l.splice(i, 1); else if (l.length < 3) l.push(n); render(); },
    rollTable: function (which) { var list = which === 'weakness' ? window.DB_WEAKNESSES : which === 'memento' ? window.DB_MEMENTOS : window.DB_APPEARANCES; var n = d(20);
      var row = A(list).find(function (x) { return x.roll === n; }); if (!row) return; B[which] = which === 'weakness' ? row.name + ' — ' + row.text : row.text; log(which.charAt(0).toUpperCase() + which.slice(1), which === 'weakness' ? row.name : row.text, 'd20(' + n + ')'); render(); },
    rollKit: function () { var n = d(6); api.kit(Math.floor((n - 1) / 2)); log('Starting gear', 'Kit ' + ['1–2', '3–4', '5–6'][Math.floor((n - 1) / 2)], 'd6(' + n + ')'); },
    kit: function (i) { if (B.kit !== i) { B.kit = i; B.kitChoice = {}; api.rollSupplies(true); } render(); },
    kitChoice: function (ix, c) { B.kitChoice[ix] = String(c).replace(/&#39;/g, "'"); render(); },
    rollSupplies: function (quiet) { var k = A(prof().kits)[B.kit]; if (!k) return; var f = SH().rollExpr(k.food), s = SH().rollExpr(k.silver); B.food = f.total; B.silver = s.total; B.foodTxt = '(' + f.text + ')'; B.silverTxt = '(' + s.text + ')'; if (quiet !== true) render(); },
    finish: function () {
      if (!allValid() || !SH()) return; var p = prof(), k = A(p.kits)[B.kit];
      var attrs = {}; ATTRS.forEach(function (a) { attrs[a] = finalAttr(a); });
      var abilities = []; if (!p.mage) { (p.heroicChoice ? [B.ability] : A(p.heroicAbilities)).forEach(function (n) { if (n) abilities.push({ name: n, kind: 'prof' }); }); }
      var gear = kitItems(k).filter(function (x) { return x.name; }).map(function (x) { return { name: x.name, qty: x.qty, note: x.note }; });
      SH().applyBuild({ name: String(B.name).trim(), nickname: String(B.nick || '').trim(), kin: B.kin, profession: B.prof, age: B.age, attrs: attrs,
        trained: B.profSkills.concat(B.freeSkills), abilities: abilities, spells: p.mage ? B.spells : [], tricks: p.mage ? B.tricks : [],
        gear: gear, food: B.food, silver: B.silver, weakness: B.weakness, memento: B.memento, appearance: B.appearance });
      api.close();
    },
    _state: function () { return B; }, _step: function () { return step; }, _go: function (i) { api.go(i); }, _steps: function () { return steps().slice(); }, _valid: valid
  };
  function roll4() { var r = [d(6), d(6), d(6), d(6)]; var s = r.slice().sort(function (a, b) { return a - b; }); return { v: s[1] + s[2] + s[3], dice: r, drop: s[0] }; }
  window.DBB = api;
})();
