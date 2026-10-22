// Dragonbane character creation wizard (window.DBB).
// Walks the core book's steps in order — kin (its innate abilities shown with it: they
// aren't a choice), profession, age, name, attributes, trained skills, heroic ability (or a
// mage's school, spells and tricks), weakness, gear, memento, appearance — with a
// "choose or roll" control wherever the book offers a table. Derived ratings (movement,
// damage bonuses, HP, WP) simply compute on the sheet, so they have no step.
// Attributes work the D&D / Shadowdark way: roll all six (4D6, drop the lowest) and keep
// them in order — the book's rule, with its one swap — or assign them; take a standard
// array (a house option); or enter scores. Rules and tables
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
  var STEPS = ['Kin', 'Profession', 'Age', 'Name', 'Attributes', 'Trained Skills', 'Heroic Ability', 'Weakness', 'Gear', 'Memento', 'Appearance'];
  // House standard array (the book has none): the expected sorted result of six 4D6-drop-lowest
  // rolls (15.7, 14.2, 13.0, 11.8, 10.4, 8.5), rounded toward the player.
  var ARRAY = [16, 14, 13, 12, 10, 9];
  var B = null, step = 0;

  function fresh() { return { kin: '', prof: '', age: '', name: '', nick: '', attrs: {}, method: 'roll', order: 'order', pool: null, assign: [0, 1, 2, 3, 4, 5], swap: [], swapped: false, man: {},
    profSkills: [], freeSkills: [], school: '', ability: '', spells: [], tricks: [], kit: -1, kitChoice: {}, food: null, silver: null, foodTxt: '', silverTxt: '',
    weakness: '', memento: '', appearance: '' }; }
  function kin() { return A(window.DB_KIN).find(function (k) { return k.name === B.kin; }) || null; }
  function prof() { return A(window.DB_PROFESSIONS).find(function (p) { return p.name === B.prof; }) || null; }
  function age() { return A(T().ages).find(function (a) { return a.id === B.age; }) || null; }
  function inRoll(r, n) { return Array.isArray(r) ? (n >= r[0] && n <= r[1]) : n === r; }
  // The base score for an attribute: rolled pool (in order, or assigned), the array, or entered.
  function slotOf(a) { var i = ATTRS.indexOf(a); return (B.method === 'array' || B.order === 'assign') ? B.assign[i] : i; }
  function baseAttr(a) { if (B.method === 'manual') return B.man[a] == null ? null : B.man[a];
    if (B.method === 'array') return ARRAY[slotOf(a)];
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
  function box(h) { return '<div class="res-box">' + h + '</div>'; }

  function valid(i) {
    switch (STEPS[i]) {
      case 'Kin': return !!kin(); case 'Profession': return !!prof(); case 'Age': return !!age();
      case 'Name': return !!String(B.name).trim();
      case 'Attributes': return ATTRS.every(function (a) { return B.attrs[a] != null; });
      case 'Trained Skills': return (!prof().mage || !!B.school) && B.profSkills.length === nProf() && B.freeSkills.length === nFree() && (!prof().mage || B.profSkills.indexOf(B.school) >= 0);
      case 'Heroic Ability': var p = prof(); if (p.mage) return B.spells.length === 3 && B.tricks.length === 3; return !p.heroicChoice || !!B.ability;
      case 'Gear': var k = A(prof().kits)[B.kit]; if (!k) return false; return k.items.every(function (it, ix) { return !it.choice || !!B.kitChoice[ix]; }) && B.food != null && B.silver != null;
      default: return true;
    }
  }
  function render() {
    var h = '<div class="m-row" style="gap:4px;margin-bottom:12px;">' + STEPS.map(function (s, i) { return '<span class="bd-step" style="font-family:var(--f-label);font-size:11px;padding:2px 8px;border-radius:12px;border:1px solid ' + (i === step ? 'var(--acc)' : '#3a3a41') + ';color:' + (i === step ? '#ffd5c8' : '#a09d96') + ';background:' + (i === step ? '#3a1611' : 'transparent') + ';' + (i > step ? 'opacity:.5;' : '') + '">' + (i + 1) + '. ' + esc(s) + '</span>'; }).join('') + '</div>';
    h += '<div class="bd-title" style="font-family:var(--f-disp);font-size:24px;margin-bottom:6px;">' + (step + 1) + '. ' + esc(STEPS[step]) + '</div>' + page();
    $('builder-body').innerHTML = h;
    $('builder-title').textContent = 'Create a Character';
    $('builder-ft').innerHTML = '<button class="m-btn ghost" onclick="DBB.back()"' + (step === 0 ? ' disabled' : '') + '>Back</button><span class="m-hint" style="margin:0;align-self:center;">' + (valid(step) ? '' : 'Finish this step to continue') + '</span>' +
      (step < STEPS.length - 1 ? '<button class="m-btn" onclick="DBB.next()"' + (valid(step) ? '' : ' disabled') + '>Next</button>' : '<button class="m-btn" onclick="DBB.finish()"' + (allValid() ? '' : ' disabled') + '>Create Character</button>');
  }
  function allValid() { for (var i = 0; i < STEPS.length; i++) if (!valid(i)) return false; return true; }

  function page() {
    var h = '', k = kin(), p = prof(), a = age();
    switch (STEPS[step]) {
      case 'Kin':
        h += '<p class="m-hint">Choose your kin, or roll a D12.</p><div class="m-row">' + A(window.DB_KIN).map(function (x) { return chip(esc(x.name) + ' <small>(' + (x.roll[0] === x.roll[1] ? x.roll[0] : x.roll.join('–')) + ')</small>', B.kin === x.name, "DBB.set('kin','" + jsq(x.name) + "')"); }).join('') + rollBtn('D12', 'DBB.rollKin()') + '</div>';
        if (k) { h += box('<b>' + esc(k.name) + '</b> — ' + esc(k.text) + '<br>Movement <b>' + k.movement + '</b>.');
          h += '<div class="m-lbl">Innate abilit' + (A(k.abilities).length > 1 ? 'ies' : 'y') + ' — every ' + esc(k.name.toLowerCase()) + ' has ' + (A(k.abilities).length > 1 ? 'these' : 'this') + '</div>' + A(k.abilities).map(function (x) { return box('<b>' + esc(x.name) + '</b>' + (x.wp ? ' · ' + x.wp + ' WP' : '') + '<br>' + esc(x.text)); }).join(''); }
        return h;
      case 'Profession':
        h += '<p class="m-hint">Choose your profession, or roll a D10.</p><div class="m-row">' + A(window.DB_PROFESSIONS).map(function (x) { return chip(esc(x.name) + ' <small>(' + x.roll + ')</small>', B.prof === x.name, "DBB.set('prof','" + jsq(x.name) + "')"); }).join('') + rollBtn('D10', 'DBB.rollProf()') + '</div>';
        if (p) h += box('<b>' + esc(p.name) + '</b> — ' + esc(p.text) + '<br>Key attribute <b>' + p.keyAttribute + '</b>' + (p.mage ? ' · chooses a school of magic' : ' · heroic ability: ' + esc(A(p.heroicAbilities).join(p.heroicChoice ? ' / ' : ', ')) + (p.heroicChoice ? ' (choose one)' : '')));
        return h;
      case 'Age':
        h += '<p class="m-hint">Choose your age, or roll a D6. Age changes your attributes and how many skills you are trained in.</p><div class="m-row">' + A(T().ages).map(function (x) { return chip(esc(x.name) + ' <small>(' + (x.roll[0] === x.roll[1] ? x.roll[0] : x.roll.join('–')) + ')</small>', B.age === x.id, "DBB.set('age','" + x.id + "')"); }).join('') + rollBtn('D6', 'DBB.rollAge()') + '</div>';
        if (a) { var mods = Object.keys(a.mods || {}).map(function (m) { return m + ' ' + (a.mods[m] > 0 ? '+' : '') + a.mods[m]; }); h += box('<b>' + esc(a.name) + '</b> — ' + a.trainedSkills + ' trained skills (' + a.professionSkills + ' from your profession + ' + a.freeSkills + ' of your choice)' + (mods.length ? '<br>Attributes: ' + mods.join(', ') + ' (never above 18).' : '<br>No attribute changes.')); }
        return h;
      case 'Name':
        h += '<div class="m-lbl">Name</div><input class="m-input" id="bd-name" value="' + esc(B.name) + '" oninput="DBB.setq(\'name\',this.value)" placeholder="Your adventurer\'s name">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(k.names).map(function (n, i) { return chip((i + 1) + '. ' + esc(n), B.name === n, "DBB.set('name','" + jsq(n) + "')"); }).join('') + rollBtn('D6 ' + esc(k.name) + ' name', 'DBB.rollName()') + '</div>';
        h += '<div class="m-lbl">Nickname (optional)</div><input class="m-input" id="bd-nick" value="' + esc(B.nick) + '" oninput="DBB.setq(\'nick\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(p.nicknames).map(function (n, i) { return chip((i + 1) + '. ' + esc(n), B.nick === n, "DBB.set('nick','" + jsq(n) + "')"); }).join('') + rollBtn('D6 ' + esc(p.name) + ' nickname', 'DBB.rollNick()') + '</div>';
        return h;
      case 'Attributes': return attrPage();
      case 'Trained Skills': return skillsPage();
      case 'Heroic Ability': return abilityPage();
      case 'Weakness':
        h += '<p class="m-hint">Optional: a weakness that gives you trouble. Giving in to it (or overcoming it) earns advancement marks.</p><div class="m-row">' + rollBtn('D20 weakness', 'DBB.rollTable(\'weakness\')') + chip('None', !B.weakness, "DBB.set('weakness','')") + '</div>';
        h += '<div class="m-lbl">Weakness</div><input class="m-input" value="' + esc(B.weakness) + '" oninput="DBB.setq(\'weakness\',this.value)">';
        h += '<div class="brow-list" style="padding:0;margin-top:8px;max-height:240px;">' + A(window.DB_WEAKNESSES).map(function (w) { return '<div class="brow-item" style="padding:5px 2px;"><div class="brow-main"><div class="brow-name" style="font-size:14px;">' + w.roll + '. ' + esc(w.name) + '</div><div class="brow-desc">' + esc(w.text) + '</div></div><button class="brow-add ghost" onclick="DBB.set(\'weakness\',\'' + jsq(w.name + ' — ' + w.text) + '\')">Pick</button></div>'; }).join('') + '</div>';
        return h;
      case 'Gear': return gearPage();
      case 'Memento':
        h += '<p class="m-hint">Optional: a tiny item of great sentimental value. Once per session it lets you recover an extra condition during a stretch rest.</p><div class="m-row">' + rollBtn('D20 memento', 'DBB.rollTable(\'memento\')') + chip('None', !B.memento, "DBB.set('memento','')") + '</div>';
        h += '<div class="m-lbl">Memento</div><input class="m-input" value="' + esc(B.memento) + '" oninput="DBB.setq(\'memento\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(window.DB_MEMENTOS).map(function (m) { return chip(m.roll + '. ' + esc(m.text), B.memento === m.text, "DBB.set('memento','" + jsq(m.text) + "')"); }).join('') + '</div>';
        return h;
      case 'Appearance':
        h += '<p class="m-hint">One distinctive feature — choose or roll a D20.</p><div class="m-row">' + rollBtn('D20 appearance', 'DBB.rollTable(\'appearance\')') + '</div>';
        h += '<div class="m-lbl">Appearance</div><input class="m-input" value="' + esc(B.appearance) + '" oninput="DBB.setq(\'appearance\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(window.DB_APPEARANCES).map(function (m) { return chip(m.roll + '. ' + esc(m.text), B.appearance === m.text, "DBB.set('appearance','" + jsq(m.text) + "')"); }).join('') + '</div>';
        h += box('<b>' + esc(B.name) + (B.nick ? ' ' + esc(B.nick) : '') + '</b> — ' + esc(B.kin) + ' ' + esc(B.prof) + ', ' + esc(a ? a.name.toLowerCase() : '') + '. ' + ATTRS.map(function (x) { return x + ' ' + finalAttr(x); }).join(', ') + '.');
        return h;
    }
    return '';
  }

  function attrPage() {
    var am = age() && Object.keys(age().mods || {}).length ? age().mods : null;
    var h = '<p class="m-hint">Roll 4D6 for each attribute and drop the lowest die. The book has you keep them in the order rolled and swap two once you are done; you can also assign them where you like, take the standard array, or enter scores your group agreed on (3–18).' + (am ? ' Your age then adjusts them (never above 18).' : '') + '</p>';
    h += '<div class="m-row" style="margin-bottom:8px;">' +
      '<button class="m-btn' + (B.method === 'roll' ? '' : ' ghost') + '" style="flex:1;" onclick="DBB.rollAll()">🎲 Roll 4D6 drop lowest × 6</button>' +
      '<button class="m-btn' + (B.method === 'array' ? '' : ' ghost') + '" style="flex:1;" onclick="DBB.method(\'array\')" title="A house option: Dragonbane has no standard array">Standard Array <small>(house)</small></button>' +
      '<button class="m-btn' + (B.method === 'manual' ? '' : ' ghost') + '" style="flex:0 0 auto;" onclick="DBB.method(\'manual\')">Enter</button></div>';
    if (B.method === 'roll' && B.pool) h += '<div class="m-row" style="margin-bottom:8px;">' + chip('In order (as rolled)', B.order !== 'assign', "DBB.order('order')") + chip('Assign them', B.order === 'assign', "DBB.order('assign')") + '</div>';
    if (B.method === 'array') h += '<p class="m-hint" style="margin-bottom:6px;">Standard array <b>' + ARRAY.join(' · ') + '</b> — a house option (what 4D6-drop-lowest gives on average). Pick a value for each attribute: choosing one already used swaps them.</p>';
    else if (B.method === 'roll' && B.pool && B.order === 'assign') h += '<p class="m-hint" style="margin-bottom:6px;">Rolled: <b>' + B.pool.map(function (r) { return r.v; }).join(' · ') + '</b>. Pick a value for each attribute: choosing one already used swaps them.</p>';
    else if (B.method === 'roll' && B.pool) h += '<p class="m-hint" style="margin-bottom:6px;">' + (B.swapped ? 'Swapped once.' : 'Optional (the book\'s rule): click two attributes to swap their scores, once.') + '</p>';
    else if (B.method === 'roll') h += '<p class="m-hint" style="margin-bottom:6px;">Roll to fill the six attributes.</p>';
    var assignSel = function (a, labels) { var cur = slotOf(a); return '<select class="m-input" style="width:auto;min-width:84px;" onchange="DBB.assign(\'' + a + '\',this.value)">' + labels.map(function (l, i) { return '<option value="' + i + '"' + (i === cur ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select>'; };
    var FULL = { STR: 'Strength', CON: 'Constitution', AGL: 'Agility', INT: 'Intelligence', WIL: 'Willpower', CHA: 'Charisma' };
    h += '<table class="tbl" style="color:#e9e7e3;"><tbody>' + ATTRS.map(function (a) { var bv = baseAttr(a), fv = finalAttr(a), mod = am ? (am[a] || 0) : 0, cell = '';
      if (B.method === 'manual') cell = '<input class="m-input" type="number" min="3" max="18" style="width:72px;text-align:center;" value="' + (bv == null ? '' : bv) + '" onchange="DBB.manual(\'' + a + '\',this.value)">';
      else if (B.method === 'array') cell = assignSel(a, ARRAY.map(String));
      else if (B.pool) { var r = B.pool[slotOf(a)];
        if (B.order === 'assign') cell = assignSel(a, B.pool.map(function (x) { return String(x.v); })) + ' <small style="color:#a09d96;">(' + r.dice.join(', ') + ' — dropped ' + r.drop + ')</small>';
        else { var sel = B.swap.indexOf(a) >= 0; cell = '<button class="chip' + (sel ? ' sel' : '') + '" style="min-width:56px;font-size:16px;"' + (B.swapped ? ' disabled' : '') + ' onclick="DBB.swapPick(\'' + a + '\')" title="Click two attributes to swap them (once)">' + r.v + '</button> <small style="color:#a09d96;">(' + r.dice.join(', ') + ' — dropped ' + r.drop + ')</small>'; } }
      else cell = '<span style="color:#a09d96;">—</span>';
      return '<tr><td style="font-family:var(--f-label);font-size:15px;color:#fff;">' + a + ' <small style="color:#a09d96;">' + FULL[a] + '</small></td><td style="width:50%;">' + cell + '</td><td class="mono" style="color:#a09d96;">' + (mod ? 'age ' + (mod > 0 ? '+' : '') + mod : '') + '</td><td class="mono" style="font-size:20px;font-weight:600;color:#f3e6d4;">' + (fv == null ? '—' : fv) + '</td></tr>'; }).join('') + '</tbody></table>';
    if (B.method === 'roll' && B.pool) h += '<p class="m-hint" style="margin-top:6px;"><a href="#" style="color:#e0614f;" onclick="DBB.rollAll();return false;">Roll again</a></p>';
    return h;
  }
  function skillsPage() {
    var p = prof(), h = '';
    if (p.mage) h += '<div class="m-lbl">School of magic</div><p class="m-hint" style="margin-bottom:4px;">Your school becomes one of your trained skills.</p><div class="m-row">' + Object.keys(p.schoolSkills || {}).map(function (s) { return chip(esc(s), B.school === s, "DBB.school('" + s + "')"); }).join('') + '</div>';
    var list = profList();
    if (!p.mage || B.school) {
      h += '<div class="m-lbl">Profession skills — choose ' + nProf() + ' of ' + list.length + ' (' + B.profSkills.length + ' chosen)</div><div class="m-row">' + list.map(function (s) { var on = B.profSkills.indexOf(s) >= 0; var forced = p.mage && s === B.school;
        return chip(esc(s) + ' <small>' + lvl(s) + '</small>', on, forced ? '' : "DBB.toggleSkill('prof','" + jsq(s) + "')", forced || (!on && B.profSkills.length >= nProf())); }).join('') + '</div>';
      var all = A(window.DB_SKILLS).filter(function (s) { return s.type !== 'secondary' && B.profSkills.indexOf(s.name) < 0; });
      h += '<div class="m-lbl">Free choice — ' + nFree() + ' more of any skill (' + B.freeSkills.length + ' chosen)</div><div class="m-row">' + all.map(function (s) { var on = B.freeSkills.indexOf(s.name) >= 0;
        return chip(esc(s.name) + ' <small>' + lvl(s.name) + '</small>', on, "DBB.toggleSkill('free','" + jsq(s.name) + "')", !on && B.freeSkills.length >= nFree()); }).join('') + '</div>';
      h += '<p class="m-hint" style="margin-top:8px;">A trained skill starts at twice its base chance (shown). Untrained skills use the base chance.</p>';
    }
    return h;
  }
  function abilityPage() {
    var p = prof(), h = '';
    if (p.mage) {
      var sp = A(window.DB_SPELLS).filter(function (s) { return s.rank === 1 && (s.school === B.school || s.school === 'General'); });
      var tr = A(window.DB_MAGIC_TRICKS).filter(function (s) { return s.school === B.school || s.school === 'General'; });
      h += '<p class="m-hint">Mages start without a heroic ability. Instead: three rank 1 spells and three magic tricks from ' + esc(B.school) + ' or General Magic, all written in your grimoire.</p>';
      h += '<div class="m-lbl">Spells (' + B.spells.length + '/3)</div><div class="brow-list" style="padding:0;max-height:260px;">' + sp.map(function (s) { var on = B.spells.indexOf(s.name) >= 0;
        return '<label class="m-check' + (!on && B.spells.length >= 3 ? ' dis' : '') + '"><input type="checkbox" ' + (on ? 'checked' : '') + (!on && B.spells.length >= 3 ? ' disabled' : '') + ' onchange="DBB.toggleList(\'spells\',\'' + jsq(s.name) + '\')"><span><b>' + esc(s.name) + '</b> · ' + esc(s.school) + ' · ' + esc(s.castingTime) + '<small>' + esc(s.text) + '</small></span></label>'; }).join('') + '</div>';
      h += '<div class="m-lbl">Magic tricks (' + B.tricks.length + '/3)</div><div class="brow-list" style="padding:0;max-height:220px;">' + tr.map(function (s) { var on = B.tricks.indexOf(s.name) >= 0;
        return '<label class="m-check' + (!on && B.tricks.length >= 3 ? ' dis' : '') + '"><input type="checkbox" ' + (on ? 'checked' : '') + (!on && B.tricks.length >= 3 ? ' disabled' : '') + ' onchange="DBB.toggleList(\'tricks\',\'' + jsq(s.name) + '\')"><span><b>' + esc(s.name) + '</b> · ' + esc(s.school) + '<small>' + esc(s.text) + '</small></span></label>'; }).join('') + '</div>';
      return h;
    }
    var names = A(p.heroicAbilities);
    h += '<p class="m-hint">' + (p.heroicChoice ? 'Choose one of your profession\'s heroic abilities.' : 'Your profession gives you this heroic ability.') + ' A heroic ability is activated with willpower points.</p>';
    names.forEach(function (n) { var def = SH() ? SH().abilityDef(n) : null; var on = p.heroicChoice ? B.ability === n : true;
      h += '<div class="res-box" style="' + (p.heroicChoice ? 'cursor:pointer;' : '') + (on ? 'border-color:#b3261e;' : '') + '" ' + (p.heroicChoice ? 'onclick="DBB.set(\'ability\',\'' + jsq(n) + '\')"' : '') + '><b>' + esc(n) + '</b>' + (def && def.wp ? ' · ' + esc(def.wp) + ' WP' : '') + (p.heroicChoice ? (on ? ' ✓' : '') : '') + '<br>' + esc(def ? def.text : '') + '</div>'; });
    return h;
  }
  function kitItems(k) { return k.items.map(function (it, ix) { var n = it.choice ? (B.kitChoice[ix] || '') : it.name; return { name: n, qty: it.qty || 1, note: it.note || '', choice: it.choice, ix: ix }; }); }
  function gearPage() {
    var p = prof(), h = '<p class="m-hint">Choose one of your profession\'s three starting kits, or roll a D6. You also have simple clothes.</p><div class="m-row" style="margin-bottom:6px;">' + rollBtn('D6 kit', 'DBB.rollKit()') + '</div>';
    A(p.kits).forEach(function (k, i) { var on = B.kit === i;
      h += '<div class="res-box" style="cursor:pointer;' + (on ? 'border-color:#b3261e;' : '') + '" onclick="DBB.kit(' + i + ')"><b>' + ['1–2', '3–4', '5–6'][i] + '</b> ' + k.items.map(function (it) { return it.choice ? it.choice.join(' or ') : (it.qty > 1 ? it.qty + '× ' : '') + it.name + (it.note ? ' (' + it.note + ')' : ''); }).map(esc).join(', ') + ', ' + esc(k.food) + ' food rations, ' + esc(k.silver) + ' silver' + (on ? ' ✓' : '') + '</div>'; });
    var k = A(p.kits)[B.kit];
    if (k) {
      k.items.forEach(function (it, ix) { if (!it.choice) return; h += '<div class="m-lbl">Choose</div><div class="m-row">' + it.choice.map(function (c) { return chip(esc(c), B.kitChoice[ix] === c, 'DBB.kitChoice(' + ix + ",'" + jsq(c) + "')"); }).join('') + '</div>'; });
      h += box('Food rations: <b>' + (B.food == null ? '—' : B.food) + '</b> ' + esc(B.foodTxt) + ' · Silver: <b>' + (B.silver == null ? '—' : B.silver) + '</b> ' + esc(B.silverTxt) + ' <button class="chip" onclick="event.stopPropagation();DBB.rollSupplies()">Re-roll</button>');
      h += '<p class="m-hint" style="margin-top:8px;">Everything goes into your inventory; weapons start at hand (at most three) and armor worn — the equip pip on the Gear tab changes that. You may go back and adjust your trained skills to fit your gear.</p>';
    }
    return h;
  }

  // ── actions ──
  var api = {
    launch: function () { B = fresh(); step = 0; $('builder-overlay').classList.add('open'); render(); },
    close: function () { $('builder-overlay').classList.remove('open'); },
    next: function () { if (!valid(step)) return; step = Math.min(STEPS.length - 1, step + 1); render(); $('builder-body').scrollTop = 0; },
    back: function () { step = Math.max(0, step - 1); render(); },
    set: function (k, v) { if (k === 'prof' && B.prof !== v) { B.profSkills = []; B.freeSkills = []; B.school = ''; B.ability = ''; B.spells = []; B.tricks = []; B.kit = -1; B.kitChoice = {}; B.food = null; B.silver = null; }
      if (k === 'age' && B.age !== v) { B.freeSkills = B.freeSkills.slice(0, (A(T().ages).find(function (a) { return a.id === v; }) || {}).freeSkills || 4); }
      B[k] = String(v); render(); },
    setq: function (k, v) { B[k] = v; var ft = $('builder-ft'); if (ft) { var nb = ft.querySelector('.m-btn:last-child'); if (nb) nb.disabled = !(step === STEPS.length - 1 ? allValid() : valid(step)); } },
    rollKin: function () { var n = d(12); var k = A(window.DB_KIN).find(function (x) { return inRoll(x.roll, n); }); if (k) { api.set('kin', k.name); log('Kin', k.name, 'd12(' + n + ')'); } },
    rollProf: function () { var n = d(10); var p = A(window.DB_PROFESSIONS).find(function (x) { return x.roll === n; }); if (p) { api.set('prof', p.name); log('Profession', p.name, 'd10(' + n + ')'); } },
    rollAge: function () { var n = d(6); var a = A(T().ages).find(function (x) { return inRoll(x.roll, n); }); if (a) { api.set('age', a.id); log('Age', a.name, 'd6(' + n + ')'); } },
    rollName: function () { var n = d(6); var k = kin(); api.set('name', A(k.names)[n - 1]); },
    rollNick: function () { var n = d(6); api.set('nick', A(prof().nicknames)[n - 1]); },
    method: function (m) { if (m !== B.method) { B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; } B.method = m === 'order' || m === 'pool' ? 'roll' : m; if (m === 'pool') B.order = 'assign'; syncAttrs(); render(); },
    order: function (o) { B.order = o === 'assign' ? 'assign' : 'order'; B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; syncAttrs(); render(); },
    // Give attribute `a` the pool / array slot `idx`; whichever attribute held it takes a's old slot.
    assign: function (a, idx) { var i = ATTRS.indexOf(a), v = parseInt(idx, 10) || 0; var other = B.assign.indexOf(v); if (other >= 0 && other !== i) B.assign[other] = B.assign[i]; B.assign[i] = v; syncAttrs(); render(); },
    resetAttrs: function () { B.pool = null; B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; B.man = {}; syncAttrs(); render(); },
    rollAll: function () { B.method = 'roll'; B.pool = ATTRS.map(function () { return roll4(); }); B.assign = [0, 1, 2, 3, 4, 5]; B.swap = []; B.swapped = false; syncAttrs();
      log('Attributes', B.pool.map(function (r, i) { return ATTRS[i] + ' ' + r.v; }).join(' '), B.pool.map(function (r) { return '4d6(' + r.dice.join(',') + ') drop ' + r.drop; }).join(' · ')); render(); },
    manual: function (a, v) { var n = parseInt(v, 10); if (isNaN(n)) delete B.man[a]; else B.man[a] = Math.max(3, Math.min(18, n)); B.method = 'manual'; syncAttrs(); render(); },
    // In order: the book's single swap of two scores (swaps their pool slots).
    swapPick: function (a) { if (B.swapped || !B.pool || B.order === 'assign') return; var i = B.swap.indexOf(a); if (i >= 0) B.swap.splice(i, 1); else B.swap.push(a);
      if (B.swap.length === 2) { var x = B.swap[0], y = B.swap[1], t = B.pool[ATTRS.indexOf(x)]; B.pool[ATTRS.indexOf(x)] = B.pool[ATTRS.indexOf(y)]; B.pool[ATTRS.indexOf(y)] = t; B.swap = []; B.swapped = true; syncAttrs(); log('Attributes', 'Swapped', x + ' ↔ ' + y); } render(); },
    school: function (s) { B.school = s; B.profSkills = [s]; B.spells = []; B.tricks = []; render(); },
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
    _state: function () { return B; }, _step: function () { return step; }, _go: function (i) { step = i; render(); }
  };
  function roll4() { var r = [d(6), d(6), d(6), d(6)]; var s = r.slice().sort(function (a, b) { return a - b; }); return { v: s[1] + s[2] + s[3], dice: r, drop: s[0] }; }
  window.DBB = api;
})();
