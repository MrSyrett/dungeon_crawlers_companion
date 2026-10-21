// Dragonbane character creation wizard (window.DBB).
// Walks the core book's thirteen steps in order — kin, innate ability, profession,
// age, name, attributes, derived ratings, trained skills, heroic ability (or a
// mage's school, spells and tricks), weakness, gear, memento, appearance — with a
// "choose or roll" control wherever the book offers a table. Rules and tables
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
  var STEPS = ['Kin', 'Innate Ability', 'Profession', 'Age', 'Name', 'Attributes', 'Derived Ratings', 'Trained Skills', 'Heroic Ability', 'Weakness', 'Gear', 'Memento', 'Appearance'];
  var B = null, step = 0;

  function fresh() { return { kin: '', prof: '', age: '', name: '', nick: '', attrs: {}, method: 'order', pend: null, pool: [], swap: [], swapped: false,
    profSkills: [], freeSkills: [], school: '', ability: '', spells: [], tricks: [], kit: -1, kitChoice: {}, food: null, silver: null, foodTxt: '', silverTxt: '',
    weakness: '', memento: '', appearance: '' }; }
  function kin() { return A(window.DB_KIN).find(function (k) { return k.name === B.kin; }) || null; }
  function prof() { return A(window.DB_PROFESSIONS).find(function (p) { return p.name === B.prof; }) || null; }
  function age() { return A(T().ages).find(function (a) { return a.id === B.age; }) || null; }
  function inRoll(r, n) { return Array.isArray(r) ? (n >= r[0] && n <= r[1]) : n === r; }
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
    switch (i) {
      case 0: return !!kin(); case 2: return !!prof(); case 3: return !!age();
      case 4: return !!String(B.name).trim();
      case 5: return ATTRS.every(function (a) { return B.attrs[a] != null; });
      case 7: return (!prof().mage || !!B.school) && B.profSkills.length === nProf() && B.freeSkills.length === nFree() && (!prof().mage || B.profSkills.indexOf(B.school) >= 0);
      case 8: var p = prof(); if (p.mage) return B.spells.length === 3 && B.tricks.length === 3; return !p.heroicChoice || !!B.ability;
      case 10: var k = A(prof().kits)[B.kit]; if (!k) return false; return k.items.every(function (it, ix) { return !it.choice || !!B.kitChoice[ix]; }) && B.food != null && B.silver != null;
      default: return true;
    }
  }
  function render() {
    var h = '<div class="m-row" style="gap:4px;margin-bottom:12px;">' + STEPS.map(function (s, i) { return '<span class="bd-step" style="font-family:var(--f-label);font-size:11px;padding:2px 8px;border-radius:12px;border:1px solid ' + (i === step ? 'var(--acc)' : '#3d2e20') + ';color:' + (i === step ? '#ffd5c8' : '#a8987d') + ';background:' + (i === step ? '#3a1611' : 'transparent') + ';' + (i > step ? 'opacity:.5;' : '') + '">' + (i + 1) + '. ' + esc(s) + '</span>'; }).join('') + '</div>';
    h += '<div style="font-family:var(--f-disp);font-size:24px;color:#f3dca8;margin-bottom:6px;">' + (step + 1) + '. ' + esc(STEPS[step]) + '</div>' + page();
    $('builder-body').innerHTML = h;
    $('builder-title').textContent = 'Create a Character';
    $('builder-ft').innerHTML = '<button class="m-btn ghost" onclick="DBB.back()"' + (step === 0 ? ' disabled' : '') + '>Back</button><span class="m-hint" style="margin:0;align-self:center;">' + (valid(step) ? '' : 'Finish this step to continue') + '</span>' +
      (step < STEPS.length - 1 ? '<button class="m-btn" onclick="DBB.next()"' + (valid(step) ? '' : ' disabled') + '>Next</button>' : '<button class="m-btn" onclick="DBB.finish()"' + (allValid() ? '' : ' disabled') + '>Create Character</button>');
  }
  function allValid() { for (var i = 0; i < STEPS.length; i++) if (!valid(i)) return false; return true; }

  function page() {
    var h = '', k = kin(), p = prof(), a = age();
    switch (step) {
      case 0:
        h += '<p class="m-hint">Choose your kin, or roll a D12.</p><div class="m-row">' + A(window.DB_KIN).map(function (x) { return chip(esc(x.name) + ' <small>(' + (x.roll[0] === x.roll[1] ? x.roll[0] : x.roll.join('–')) + ')</small>', B.kin === x.name, "DBB.set('kin','" + jsq(x.name) + "')"); }).join('') + rollBtn('D12', 'DBB.rollKin()') + '</div>';
        if (k) h += box('<b>' + esc(k.name) + '</b> — ' + esc(k.text) + '<br>Movement <b>' + k.movement + '</b>.');
        return h;
      case 1:
        return '<p class="m-hint">Every kin has an innate ability.</p>' + A(k.abilities).map(function (x) { return box('<b>' + esc(x.name) + '</b>' + (x.wp ? ' · ' + x.wp + ' WP' : '') + '<br>' + esc(x.text)); }).join('');
      case 2:
        h += '<p class="m-hint">Choose your profession, or roll a D10.</p><div class="m-row">' + A(window.DB_PROFESSIONS).map(function (x) { return chip(esc(x.name) + ' <small>(' + x.roll + ')</small>', B.prof === x.name, "DBB.set('prof','" + jsq(x.name) + "')"); }).join('') + rollBtn('D10', 'DBB.rollProf()') + '</div>';
        if (p) h += box('<b>' + esc(p.name) + '</b> — ' + esc(p.text) + '<br>Key attribute <b>' + p.keyAttribute + '</b>' + (p.mage ? ' · chooses a school of magic' : ' · heroic ability: ' + esc(A(p.heroicAbilities).join(p.heroicChoice ? ' / ' : ', ')) + (p.heroicChoice ? ' (choose one)' : '')));
        return h;
      case 3:
        h += '<p class="m-hint">Choose your age, or roll a D6. Age changes your attributes and how many skills you are trained in.</p><div class="m-row">' + A(T().ages).map(function (x) { return chip(esc(x.name) + ' <small>(' + (x.roll[0] === x.roll[1] ? x.roll[0] : x.roll.join('–')) + ')</small>', B.age === x.id, "DBB.set('age','" + x.id + "')"); }).join('') + rollBtn('D6', 'DBB.rollAge()') + '</div>';
        if (a) { var mods = Object.keys(a.mods || {}).map(function (m) { return m + ' ' + (a.mods[m] > 0 ? '+' : '') + a.mods[m]; }); h += box('<b>' + esc(a.name) + '</b> — ' + a.trainedSkills + ' trained skills (' + a.professionSkills + ' from your profession + ' + a.freeSkills + ' of your choice)' + (mods.length ? '<br>Attributes: ' + mods.join(', ') + ' (never above 18).' : '<br>No attribute changes.')); }
        return h;
      case 4:
        h += '<div class="m-lbl">Name</div><input class="m-input" id="bd-name" value="' + esc(B.name) + '" oninput="DBB.setq(\'name\',this.value)" placeholder="Your adventurer\'s name">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(k.names).map(function (n, i) { return chip((i + 1) + '. ' + esc(n), B.name === n, "DBB.set('name','" + jsq(n) + "')"); }).join('') + rollBtn('D6 ' + esc(k.name) + ' name', 'DBB.rollName()') + '</div>';
        h += '<div class="m-lbl">Nickname (optional)</div><input class="m-input" id="bd-nick" value="' + esc(B.nick) + '" oninput="DBB.setq(\'nick\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(p.nicknames).map(function (n, i) { return chip((i + 1) + '. ' + esc(n), B.nick === n, "DBB.set('nick','" + jsq(n) + "')"); }).join('') + rollBtn('D6 ' + esc(p.name) + ' nickname', 'DBB.rollNick()') + '</div>';
        return h;
      case 5: return attrPage();
      case 6:
        var str = finalAttr('STR'), con = finalAttr('CON'), agl = finalAttr('AGL'), wil = finalAttr('WIL');
        var dmg = function (v) { var r = A(T().damageBonus).find(function (x) { return v >= x.min && v <= x.max; }); return r && r.value ? '+' + r.value : 'none'; };
        var mv = (function () { var r = A(T().movementAgl).find(function (x) { return agl >= x.min && agl <= x.max; }); return k.movement + (r ? r.mod : 0); })();
        h += '<p class="m-hint">Worked out from your attributes' + (a && Object.keys(a.mods || {}).length ? ' (after the ' + esc(a.name.toLowerCase()) + ' age changes)' : '') + '.</p>';
        h += box(ATTRS.map(function (x) { return x + ' <b>' + finalAttr(x) + '</b>'; }).join(' · ') + '<br>Movement <b>' + mv + '</b> (kin ' + k.movement + ', AGL ' + agl + ')<br>Damage bonus STR <b>' + dmg(str) + '</b> · AGL <b>' + dmg(agl) + '</b><br>Hit points <b>' + con + '</b> (CON) · Willpower points <b>' + wil + '</b> (WIL)');
        return h;
      case 7: return skillsPage();
      case 8: return abilityPage();
      case 9:
        h += '<p class="m-hint">Optional: a weakness that gives you trouble. Giving in to it (or overcoming it) earns advancement marks.</p><div class="m-row">' + rollBtn('D20 weakness', 'DBB.rollTable(\'weakness\')') + chip('None', !B.weakness, "DBB.set('weakness','')") + '</div>';
        h += '<div class="m-lbl">Weakness</div><input class="m-input" value="' + esc(B.weakness) + '" oninput="DBB.setq(\'weakness\',this.value)">';
        h += '<div class="brow-list" style="padding:0;margin-top:8px;max-height:240px;">' + A(window.DB_WEAKNESSES).map(function (w) { return '<div class="brow-item" style="padding:5px 2px;"><div class="brow-main"><div class="brow-name" style="font-size:14px;">' + w.roll + '. ' + esc(w.name) + '</div><div class="brow-desc">' + esc(w.text) + '</div></div><button class="brow-add ghost" onclick="DBB.set(\'weakness\',\'' + jsq(w.name + ' — ' + w.text) + '\')">Pick</button></div>'; }).join('') + '</div>';
        return h;
      case 10: return gearPage();
      case 11:
        h += '<p class="m-hint">Optional: a tiny item of great sentimental value. Once per session it lets you recover an extra condition during a stretch rest.</p><div class="m-row">' + rollBtn('D20 memento', 'DBB.rollTable(\'memento\')') + chip('None', !B.memento, "DBB.set('memento','')") + '</div>';
        h += '<div class="m-lbl">Memento</div><input class="m-input" value="' + esc(B.memento) + '" oninput="DBB.setq(\'memento\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(window.DB_MEMENTOS).map(function (m) { return chip(m.roll + '. ' + esc(m.text), B.memento === m.text, "DBB.set('memento','" + jsq(m.text) + "')"); }).join('') + '</div>';
        return h;
      case 12:
        h += '<p class="m-hint">One distinctive feature — choose or roll a D20.</p><div class="m-row">' + rollBtn('D20 appearance', 'DBB.rollTable(\'appearance\')') + '</div>';
        h += '<div class="m-lbl">Appearance</div><input class="m-input" value="' + esc(B.appearance) + '" oninput="DBB.setq(\'appearance\',this.value)">';
        h += '<div class="m-row" style="margin-top:8px;">' + A(window.DB_APPEARANCES).map(function (m) { return chip(m.roll + '. ' + esc(m.text), B.appearance === m.text, "DBB.set('appearance','" + jsq(m.text) + "')"); }).join('') + '</div>';
        h += box('<b>' + esc(B.name) + (B.nick ? ' ' + esc(B.nick) : '') + '</b> — ' + esc(B.kin) + ' ' + esc(B.prof) + ', ' + esc(a ? a.name.toLowerCase() : '') + '. ' + ATTRS.map(function (x) { return x + ' ' + finalAttr(x); }).join(', ') + '.');
        return h;
    }
    return '';
  }

  function attrPage() {
    var h = '<p class="m-hint">Roll 4D6 and drop the lowest die for each score. ' + (B.method === 'order' ? 'Assign each score to an attribute as you roll it; once all six are placed you may swap two.' : B.method === 'pool' ? 'Roll all six, then place them where you like.' : 'Enter scores your group agreed on (3–18).') + '</p>';
    h += '<div class="m-row" style="margin-bottom:8px;">' + chip('As rolled (book)', B.method === 'order', "DBB.method('order')") + chip('Roll six, then assign', B.method === 'pool', "DBB.method('pool')") + chip('Enter manually', B.method === 'manual', "DBB.method('manual')") + '</div>';
    var placed = ATTRS.filter(function (a) { return B.attrs[a] != null; }).length;
    if (B.method === 'manual') {
      h += '<div class="m-row">' + ATTRS.map(function (a) { return '<label style="display:flex;flex-direction:column;align-items:center;gap:3px;font-family:var(--f-label);font-size:12px;">' + a + '<input class="m-input" type="number" min="3" max="18" style="width:64px;text-align:center;" value="' + (B.attrs[a] == null ? '' : B.attrs[a]) + '" onchange="DBB.manual(\'' + a + '\',this.value)"></label>'; }).join('') + '</div>';
    } else {
      if (B.method === 'order') {
        if (placed < 6) {
          if (B.pend) h += box('Rolled <b style="font-size:20px;">' + B.pend.v + '</b> <small>(' + B.pend.dice.join(', ') + ' — dropped ' + B.pend.drop + ')</small><br>Place it on:') + '<div class="m-row" style="margin-top:6px;">' + ATTRS.filter(function (a) { return B.attrs[a] == null; }).map(function (a) { return chip(a, false, "DBB.place('" + a + "')"); }).join('') + '</div>';
          else h += '<div class="m-row">' + rollBtn('Roll 4D6 (score ' + (placed + 1) + ' of 6)', 'DBB.rollAttr()') + '</div>';
        }
      } else {
        if (!B.pool.length && placed === 0) h += '<div class="m-row">' + rollBtn('Roll six scores', 'DBB.rollPool()') + '</div>';
        if (B.pool.length) h += '<div class="m-lbl">Unplaced scores</div><div class="m-row">' + B.pool.map(function (v, i) { return chip(String(v.v), B.pend && B.pend.i === i, 'DBB.pickPool(' + i + ')', false, v.dice.join(', ')); }).join('') + '</div>' + (B.pend ? '<div class="m-lbl">Place ' + B.pend.v + ' on</div><div class="m-row">' + ATTRS.filter(function (a) { return B.attrs[a] == null; }).map(function (a) { return chip(a, false, "DBB.place('" + a + "')"); }).join('') + '</div>' : '');
      }
    }
    h += '<div class="m-lbl">Your attributes</div><div class="m-row">' + ATTRS.map(function (a) { var v = B.attrs[a], f = finalAttr(a); var sel = B.swap.indexOf(a) >= 0;
      return '<button class="chip' + (sel ? ' sel' : '') + '" style="min-width:76px;" ' + (placed === 6 && B.method !== 'manual' && !B.swapped ? 'onclick="DBB.swapPick(\'' + a + '\')"' : 'disabled') + '>' + a + ' <b>' + (v == null ? '—' : v) + '</b>' + (v != null && f !== v ? ' → ' + f : '') + '</button>'; }).join('') + '</div>';
    if (placed === 6 && B.method !== 'manual') h += '<p class="m-hint" style="margin-top:6px;">' + (B.swapped ? 'Swapped once.' : 'Optional: click two attributes to swap their scores (once).') + ' ' + '<a href="#" style="color:#e0614f;" onclick="DBB.resetAttrs();return false;">Start over</a></p>';
    if (age() && Object.keys(age().mods || {}).length) h += '<p class="m-hint">Age adjustments (' + esc(age().name) + ') are shown after the arrow.</p>';
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
      var w = A(window.DB_WEAPONS);
      var weaps = kitItems(k).filter(function (x) { return w.some(function (y) { return y.name === x.name; }); });
      if (weaps.length) h += '<p class="m-hint" style="margin-top:8px;">Weapons go to your hands (at most three); the rest to your inventory. You may go back and adjust your trained skills to fit your gear.</p>';
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
    method: function (m) { B.method = m; api.resetAttrs(); },
    resetAttrs: function () { B.attrs = {}; B.pend = null; B.pool = []; B.swap = []; B.swapped = false; render(); },
    rollAttr: function () { var r = roll4(); B.pend = r; log('Attribute roll', String(r.v), '4d6(' + r.dice.join(',') + ') drop ' + r.drop); render(); },
    rollPool: function () { B.pool = []; for (var i = 0; i < 6; i++) B.pool.push(roll4()); log('Attribute rolls', B.pool.map(function (x) { return x.v; }).join(', '), 'six × 4D6 drop lowest'); render(); },
    pickPool: function (i) { B.pend = Object.assign({ i: i }, B.pool[i]); render(); },
    place: function (a) { if (!B.pend) return; B.attrs[a] = B.pend.v; if (B.method === 'pool' && B.pend.i != null) B.pool.splice(B.pend.i, 1); B.pend = null; render(); },
    manual: function (a, v) { var n = parseInt(v, 10); B.attrs[a] = isNaN(n) ? null : Math.max(3, Math.min(18, n)); if (B.attrs[a] == null) delete B.attrs[a]; render(); },
    swapPick: function (a) { if (B.swapped) return; var i = B.swap.indexOf(a); if (i >= 0) B.swap.splice(i, 1); else B.swap.push(a);
      if (B.swap.length === 2) { var x = B.swap[0], y = B.swap[1], t = B.attrs[x]; B.attrs[x] = B.attrs[y]; B.attrs[y] = t; B.swap = []; B.swapped = true; log('Attributes', 'Swapped', x + ' ↔ ' + y); } render(); },
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
