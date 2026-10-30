// Dragonbane character creation wizard (window.DBB).
// Walks the core book's steps — kin (its innate abilities shown with it: they aren't a
// choice), profession (with its heroic ability: shown there, and an Artisan picks theirs
// there), age, name, attributes, trained skills, gear, then one Details step for weakness,
// memento and appearance, and a final Review — with a "choose or roll" control wherever the
// book offers a table. A mage gets a Magic step (school, spells, tricks) before Trained
// Skills, since the school decides the profession skill list.
// The step pills are navigation: any step can be opened; a step that needs an earlier
// choice says so. Derived ratings (movement, damage bonuses, HP, WP) simply compute on the
// sheet, so they have no step.
// Attributes work the D&D / Shadowdark way: roll all six (4D6, drop the lowest) and keep
// them in order — the book's rule, with its one swap — or assign them; or take a standard
// array (not in the book). Rules and tables
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
  // 'Heroic Ability' is a mage-only step (shown as "Magic"); everyone else's heroic ability
  // is shown, and chosen if there's a choice, on the Profession step.
  var BASE_STEPS = ['Kin', 'Profession', 'Age', 'Name', 'Attributes', 'Trained Skills', 'Gear', 'Details', 'Review'];
  var MAGE_STEPS = ['Kin', 'Profession', 'Age', 'Name', 'Attributes', 'Heroic Ability', 'Trained Skills', 'Gear', 'Details', 'Review'];
  // a mage picks the school (Magic step) before skills: the school sets the profession skill list
  function steps() { return caster() ? MAGE_STEPS : BASE_STEPS; }
  // Casters: a Mage (any school a new mage may take), or a Bard who gives up Musician for
  // Harmonism (Book of Magic p.46: three rank 1 Harmonism spells, three Harmonism tricks, a grimoire).
  function harmonist() { var p = prof(); return !!(p && !p.mage && B.harmonist && bardSchools(p).length); }
  function caster() { var p = prof(); return !!(p && (p.mage || harmonist())); }
  function bardSchools(p) { return A(((window.DB_MAGIC_RULES || {}).creationSchools || {})[p.name]); }
  function schoolRec(n) { return A(window.DB_MAGIC_SCHOOLS).find(function (x) { return x.name === n; }) || null; }
  // the skill a caster must have trained from the start: the mage's school, or Performance for a harmonist
  function forcedSkill() { var p = prof(); return !p ? '' : p.mage ? B.school : harmonist() ? 'Performance' : ''; }
  function kinRoll(x) { return B.kinSet === 'core' ? x.roll : x.roll20; }
  // Homebrew kin and professions (db-homebrew.js pushes them into DB_KIN / DB_PROFESSIONS, source
  // 'Homebrew') have no table roll: they're picked, and listed with either kin set.
  function isHb(x) { return !!x && x.source === 'Homebrew'; }
  function coreOk(x) { return (x.source || 'core') === 'core' || isHb(x); }
  function kinList() { return A(window.DB_KIN).filter(function (x) { return B.kinSet !== 'core' || coreOk(x); }); }
  function pickOf(list) { list = A(list).filter(Boolean); return list.length ? list[Math.floor(Math.random() * list.length)] : ''; }
  function last() { return steps().length - 1; }
  // School summaries, titles and starting skills come from DB_MAGIC_SCHOOLS (Book of Magic).
  var ENCH_TOOLS = ['Blacksmithing Tools', 'Carpentry Tools', 'Tanning Tools'];
  // Standard array (the book has none): the expected sorted result of six 4D6-drop-lowest
  // rolls (15.7, 14.2, 13.0, 11.8, 10.4, 8.5), rounded toward the player.
  var ARRAY = [16, 14, 13, 12, 10, 9];
  var B = null, step = 0, seen = {};  // seen: steps opened (by name), so an untouched optional step isn't ticked

  function fresh() { return { kin: '', prof: '', age: '', name: '', nick: '', attrs: {}, method: 'roll', order: 'order', pool: null, assign: [0, 1, 2, 3, 4, 5], swap: [], swapped: false,
    profSkills: [], freeSkills: [], school: '', ability: '', spells: [], tricks: [], kit: -1, kitChoice: {}, food: null, silver: null, foodTxt: '', silverTxt: '',
    weakness: '', memento: '', appearance: '', kinSet: 'all', harmonist: '', tools: '' }; }
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
  function enchantOk() { if (B.school !== 'Enchanting') return true; var tr = B.profSkills.concat(B.freeSkills).indexOf('Crafting') >= 0, l = lvl('Crafting'); return tr && typeof l === 'number' && l >= 12; }
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
      case 'Kin': return !!kin(); case 'Profession': return !!p && (p.mage || !p.heroicChoice || !!B.ability); case 'Age': return !!age();
      case 'Name': return !!String(B.name).trim();
      case 'Attributes': return ATTRS.every(function (a) { return B.attrs[a] != null; });
      case 'Trained Skills': if (!p) return false; var fs = forcedSkill(); return (!p.mage || !!B.school) && B.profSkills.length === nProf() && B.freeSkills.length === nFree() && (!fs || B.profSkills.indexOf(fs) >= 0) && enchantOk();
      case 'Heroic Ability': if (!p) return false; if (caster()) return !!B.school && B.spells.length === 3 && B.tricks.length === 3 && (B.school !== 'Enchanting' || !!B.tools); return true;
      case 'Gear': if (!p) return false; var k = A(p.kits)[B.kit]; if (!k) return false; return k.items.every(function (it, ix) { return !it.choice || !!B.kitChoice[ix]; }) && B.food != null && B.silver != null;
      default: return true;
    }
  }
  // a mage's "heroic ability" step is choosing spells and tricks
  function stepName(i) { var s = steps()[i]; return s === 'Heroic Ability' && caster() ? 'Magic' : s; }
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
    var isLast = step === last();
    $('builder-ft').innerHTML = '<button class="m-btn ghost" onclick="DBB.back()"' + (step === 0 ? ' disabled' : '') + '>Back</button><span class="m-hint" style="margin:0;align-self:center;">' + (isLast ? (allValid() ? '' : 'Some steps are unfinished') : (valid(step) ? '' : 'Finish this step to continue')) + '</span>' +
      (!isLast ? '<button class="m-btn" onclick="DBB.next()"' + (valid(step) ? '' : ' disabled') + '>Next</button>' : '<button class="m-btn" onclick="DBB.finish()"' + (allValid() ? '' : ' disabled') + '>Create Character</button>');
  }
  function allValid() { for (var i = 0; i < steps().length; i++) if (!valid(i)) return false; return true; }

  // Big choices (kin, profession, age): rounded cards with a meta line and the table roll.
  function rng(r) { return Array.isArray(r) ? (r[0] === r[1] ? String(r[0]) : r[0] + '–' + r[1]) : String(r == null ? '' : r); }
  function picks(items) { return '<div class="bd-picks">' + items.map(function (it) {
    return '<button class="bd-pick' + (it.on ? ' sel' : '') + '" aria-pressed="' + !!it.on + '" onclick="' + it.act + '"><span class="bd-pick-hd"><b>' + esc(it.name) + '</b>' + (it.roll ? '<span class="bd-pick-roll">' + esc(it.roll) + '</span>' : '') + '</span>' + (it.meta ? '<span class="bd-pick-meta">' + esc(it.meta) + '</span>' : '') + '</button>'; }).join('') + '</div>'; }
  function modsTxt(a) { return Object.keys(a.mods || {}).map(function (m) { return m + ' ' + (a.mods[m] > 0 ? '+' : '') + a.mods[m]; }); }
  function abilDef(n) { return SH() ? SH().abilityDef(n) : null; }
  // the profession's heroic ability with its rules text; a choice (Artisan) is picked here
  function profAbilities(p) {
    if (p.mage) return box('<b>No heroic ability to start with.</b> A mage chooses a school of magic, three rank 1 spells and three magic tricks instead — in the Magic step.');
    var names = A(p.heroicAbilities), ch = !!p.heroicChoice;
    if (bardSchools(p).length) return bardChoice(p, names);
    var h = '<div class="m-lbl">Heroic abilit' + (names.length > 1 ? 'ies' : 'y') + (ch ? ' — choose one' : '') + '</div>';
    if (!ch) return h + names.map(function (n) { var def = abilDef(n); return box('<b>' + esc(n) + '</b>' + (def && def.wp ? ' · ' + esc(def.wp) + ' WP' : '') + '<br>' + esc(def ? def.text : '')); }).join('');
    return h + '<div class="bd-abils">' + names.map(function (n) { var def = abilDef(n), on = B.ability === n;
      return '<button class="bd-abil' + (on ? ' sel' : '') + '" aria-pressed="' + on + '" onclick="DBB.set(\'ability\',\'' + jsq(n) + '\')"><span class="bd-pick-hd"><b>' + esc(n) + '</b><span class="bd-pick-roll">' + (def && def.wp ? esc(def.wp) + ' WP' : '') + (on ? ' ✓' : '') + '</span></span><span class="bd-abil-tx">' + esc(def ? def.text : '') + '</span></button>'; }).join('') + '</div>';
  }
  // A bard keeps Musician, or trades it for Harmonism (music magic cast with Performance).
  function bardChoice(p, names) { var hm = harmonist(), sc = schoolRec('Harmonism') || {};
    var card = function (on, act, title, tag, tx) { return '<button class="bd-abil' + (on ? ' sel' : '') + '" aria-pressed="' + on + '" onclick="' + act + '"><span class="bd-pick-hd"><b>' + esc(title) + '</b><span class="bd-pick-roll">' + esc(tag) + (on ? ' ✓' : '') + '</span></span><span class="bd-abil-tx">' + esc(tx) + '</span></button>'; };
    return '<div class="m-lbl">Heroic ability — or Harmonism</div><div class="bd-abils">' +
      names.map(function (n) { var def = abilDef(n); return card(!hm, "DBB.set('harmonist','')", n, def && def.wp ? def.wp + ' WP' : 'heroic ability', def ? def.text : ''); }).join('') +
      card(hm, "DBB.set('harmonist','1')", 'Harmonist', 'Book of Magic', 'Give up ' + names.join(', ') + ' to start with three rank 1 Harmonism spells, three Harmonism tricks and a grimoire. ' + (sc.summary || '') + ' Spells are cast with Performance; harmonists can\'t learn general magic.') + '</div>'; }
  function page() {
    var h = '', k = kin(), p = prof(), a = age();
    switch (steps()[step]) {
      case 'Kin':
        h += sub(rollBtn(B.kinSet === 'core' ? 'Roll D12' : 'Roll D20', 'DBB.rollKin()') + chip('All kin <small>(Bestiary, D20)</small>', B.kinSet !== 'core', "DBB.set('kinSet','all')") + chip('Core kin only <small>(D12)</small>', B.kinSet === 'core', "DBB.set('kinSet','core')"));
        h += picks(kinList().map(function (x) { return { name: x.name, on: B.kin === x.name, act: "DBB.set('kin','" + jsq(x.name) + "')", roll: rng(kinRoll(x)), meta: 'Movement ' + x.movement + ' · ' + A(x.abilities).map(function (y) { return y.name; }).join(', ') + (x.source === 'bestiary' ? ' · Bestiary' : isHb(x) ? ' · Homebrew' : '') }; }));
        if (k) { h += box('<b>' + esc(k.name) + '</b> — ' + esc(k.text) + '<br>Movement <b>' + k.movement + '</b>.' + (k.source === 'bestiary' ? ' <small>(Bestiary p.' + k.page + ' — playable if your group agrees)</small>' : isHb(k) ? ' <small>(homebrew)</small>' : '') + (A(k.traits).length ? '<br>Traits: ' + A(k.traits).map(esc).join(', ') + '.' : ''));
          h += '<div class="m-lbl">Innate abilit' + (A(k.abilities).length > 1 ? 'ies' : 'y') + '</div>' + A(k.abilities).map(function (x) { return box('<b>' + esc(x.name) + '</b>' + (x.wp === 'varies' ? ' · ' + esc(x.wpNote || 'WP varies') : x.wp ? ' · ' + x.wp + ' WP' : '') + '<br>' + esc(x.text)); }).join('');
          if (k.pcNotes) h += '<div class="m-lbl">As a player character</div>' + box(esc(k.pcNotes)); }
        return h;
      case 'Profession':
        h += sub(rollBtn('Roll D10', 'DBB.rollProf()')) + picks(A(window.DB_PROFESSIONS).map(function (x) { var hs = A(x.heroicAbilities);
          return { name: x.name, on: B.prof === x.name, act: "DBB.set('prof','" + jsq(x.name) + "')", roll: rng(x.roll), meta: 'Key ' + x.keyAttribute + ' · ' + (x.mage ? 'school of magic' : x.heroicChoice ? 'choice of ' + hs.length + ' abilities' : hs.join(', ') + (bardSchools(x).length ? ' or Harmonism' : '')) + (isHb(x) ? ' · Homebrew' : '') }; }));
        if (p) { h += box('<b>' + esc(p.name) + '</b> — ' + esc(p.text) + '<br>Key attribute <b>' + p.keyAttribute + '</b>.'); h += profAbilities(p); }
        return h;
      case 'Age':
        h += sub(rollBtn('Roll D6', 'DBB.rollAge()')) + picks(A(T().ages).map(function (x) { var m = modsTxt(x); return { name: x.name, on: B.age === x.id, act: "DBB.set('age','" + x.id + "')", roll: rng(x.roll), meta: x.trainedSkills + ' trained skills' + (m.length ? ' · ' + m.join(', ') : '') }; }));
        if (a) { var mods = modsTxt(a); h += box('<b>' + esc(a.name) + '</b> — ' + a.trainedSkills + ' trained skills (' + a.professionSkills + ' from your profession + ' + a.freeSkills + ' of your choice)' + (mods.length ? '<br>Attributes: ' + mods.join(', ') + ' (never above 18).' : '<br>No attribute changes.')); }
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
      case 'Gear': return p ? gearPage() : need('Profession', 'for its gear kits');
      case 'Details': return detailsPage();
      case 'Review': return reviewPage();
    }
    return '';
  }
  // Weakness, memento and appearance: each a D20 table as a dropdown, a roll, and a text box
  // to reword the result or write your own. Weakness and memento are optional.
  var DETAILS = [
    { k: 'weakness', label: 'Weakness', list: function () { return window.DB_WEAKNESSES; }, val: function (r) { return r.name + ' — ' + r.text; }, none: 'None' },
    { k: 'memento', label: 'Memento', list: function () { return window.DB_MEMENTOS; }, val: function (r) { return r.text; }, none: 'None' },
    { k: 'appearance', label: 'Appearance', list: function () { return window.DB_APPEARANCES; }, val: function (r) { return r.text; }, none: 'Choose…' }];
  function detailsPage() {
    return '<p class="m-hint" style="margin-bottom:4px;">Pick from each D20 table, roll for it, or write your own. A weakness and a memento are optional.</p>' + DETAILS.map(function (t) { var cur = B[t.k], rows = A(t.list()), match = false;
      var opts = rows.map(function (r) { var v = t.val(r), on = v === cur; if (on) match = true; return '<option value="' + esc(v) + '"' + (on ? ' selected' : '') + '>' + r.roll + '. ' + esc(v) + '</option>'; }).join('');
      var head = '<option value=""' + (!cur ? ' selected' : '') + '>— ' + esc(t.none) + ' —</option>' + (cur && !match ? '<option value="' + esc(cur) + '" selected>Your own: ' + esc(cur) + '</option>' : '');
      return '<div class="bd-detail">' + lblRoll(t.label, rollBtn('Roll D20', "DBB.rollTable('" + t.k + "')")) +
        '<select class="m-input bd-select" onchange="DBB.set(\'' + t.k + '\',this.value)">' + head + opts + '</select>' +
        '<input class="m-input" style="margin-top:6px;" placeholder="Or write your own" value="' + esc(cur) + '" onchange="DBB.set(\'' + t.k + '\',this.value)" oninput="DBB.setq(\'' + t.k + '\',this.value)"></div>'; }).join('');
  }
  function rangeVal(t, v) { return A(t).find(function (x) { return v >= x.min && v <= x.max; }) || null; }
  // The whole character on one page, each part with a link back to its step.
  function reviewPage() {
    var k = kin(), p = prof(), a = age(), h = '';
    var todo = steps().map(function (s, i) { return i; }).filter(function (i) { return i !== step && !valid(i); });
    if (todo.length) h += '<div class="res-box bd-todo">Still to finish: ' + todo.map(function (i) { return '<a href="#" onclick="DBB.go(' + i + ');return false;">' + esc(stepName(i)) + '</a>'; }).join(', ') + '.</div>';
    else h += '<p class="m-hint" style="margin-bottom:4px;">Everything is set. Check it over, then create your character.</p>';
    var edit = function (s) { var i = steps().indexOf(s); return i < 0 ? '' : '<a href="#" class="bd-rev-edit" onclick="DBB.go(' + i + ');return false;">Edit</a>'; };
    var sec = function (title, s, body) { return '<div class="bd-rev"><div class="bd-rev-hd"><span>' + title + '</span>' + edit(s) + '</div>' + body + '</div>'; };
    var dash = '<span class="bd-dim">—</span>';
    h += '<div class="bd-rev-name">' + (B.name ? esc(B.name) : '<span class="bd-dim">Unnamed</span>') + (B.nick ? ' <span class="bd-rev-nick">' + esc(B.nick) + '</span>' : '') + '</div>';
    h += '<div class="bd-rev-sub">' + ([k && k.name, p && (p.mage && B.school && !isHb(p) ? ((schoolRec(B.school) || {}).title || 'Mage') : harmonist() ? 'Bard (Harmonist)' : p.name), a && a.name].filter(Boolean).map(esc).join(' · ') || '—') + ' ' + edit('Kin') + '</div>';
    var fa = {}; ATTRS.forEach(function (x) { fa[x] = finalAttr(x); });
    h += sec('Attributes', 'Attributes', '<div class="bd-attrs">' + ATTRS.map(function (x) { return '<div class="bd-attr"><span>' + x + '</span><b>' + (fa[x] == null ? '—' : fa[x]) + '</b></div>'; }).join('') + '</div>');
    if (ATTRS.every(function (x) { return fa[x] != null; })) {
      var tb = T(), mv = (k ? k.movement : 10) + ((rangeVal(tb.movementAgl, fa.AGL) || {}).mod || 0);
      var db = function (v) { var r = rangeVal(tb.damageBonus, v); return r && r.value ? '+' + r.value : 'none'; };
      h += '<div class="bd-derived"><span>HP <b>' + fa.CON + '</b></span><span>WP <b>' + fa.WIL + '</b></span><span>Movement <b>' + mv + '</b></span><span>Damage bonus STR <b>' + db(fa.STR) + '</b> · AGL <b>' + db(fa.AGL) + '</b></span></div>';
    }
    var ab = A(k && k.abilities).map(function (x) { return esc(x.name) + ' <small>(kin)</small>'; });
    if (p && !p.mage && !harmonist()) (p.heroicChoice ? (B.ability ? [B.ability] : []) : A(p.heroicAbilities)).forEach(function (n) { ab.push(esc(n) + ' <small>(heroic)</small>'); });
    h += sec('Abilities', 'Profession', ab.length ? ab.join(', ') : dash);
    if (p && caster()) h += sec('Magic', 'Heroic Ability', '<div>School: ' + (B.school ? '<b>' + esc(B.school) + '</b>' : dash) + '</div><div>Spells: ' + (B.spells.length ? B.spells.map(esc).join(', ') : dash) + '</div><div>Tricks: ' + (B.tricks.length ? B.tricks.map(esc).join(', ') : dash) + '</div>');
    var sk = function (l) { return l.map(function (n) { return esc(n) + ' <small>' + lvl(n) + '</small>'; }).join(', '); };
    h += sec('Trained skills', 'Trained Skills', '<div>Profession: ' + (B.profSkills.length ? sk(B.profSkills) : dash) + '</div><div>Free choice: ' + (B.freeSkills.length ? sk(B.freeSkills) : dash) + '</div>');
    var kt = p && A(p.kits)[B.kit];
    h += sec('Gear', 'Gear', kt ? kitItems(kt).map(function (x) { return x.name ? (x.qty > 1 ? x.qty + '× ' : '') + esc(x.name) + (x.note ? ' (' + esc(x.note) + ')' : '') : '<span class="bd-dim">' + esc(x.choice.join(' or ')) + ' (not chosen)</span>'; }).join(', ') + '<div style="margin-top:3px;">Food rations <b>' + (B.food == null ? '—' : B.food) + '</b> · Silver <b>' + (B.silver == null ? '—' : B.silver) + '</b></div>' : dash);
    h += sec('Details', 'Details', DETAILS.map(function (t) { return '<div>' + t.label + ': ' + (B[t.k] ? esc(B[t.k]) : dash) + '</div>'; }).join(''));
    return h;
  }

  function attrPage() {
    var am = age() && Object.keys(age().mods || {}).length ? age().mods : null;
    var h = '<div class="m-row bd-sub" style="margin-bottom:8px;">' +
      '<button class="m-btn' + (B.method === 'roll' ? '' : ' ghost') + '" style="flex:1;" onclick="DBB.rollAll()" title="4D6, drop the lowest, for each attribute">🎲 Roll 4D6</button>' +
      '<button class="m-btn' + (B.method === 'array' ? '' : ' ghost') + '" style="flex:1;" onclick="DBB.method(\'array\')" title="Dragonbane has no standard array: this is the average of six 4D6-drop-lowest rolls">Standard Array</button></div>';
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
  // Profession skills first, then the free choices: the free list stays locked until the
  // profession picks are complete, and lists every skill — those already trained from the
  // profession show as taken rather than vanishing, so nothing shifts under the cursor.
  function skillsPage() {
    var p = prof(), h = '';
    if (p.mage && !B.school) return need('Magic', 'to choose your school of magic: it sets your profession skills');
    if (p.mage) h += '<p class="m-hint" style="margin-bottom:4px;">School: <b style="color:#f3dca8;">' + esc(B.school) + '</b> (a trained skill) · <a href="#" style="color:#5cb894;" onclick="DBB.go(' + steps().indexOf('Heroic Ability') + ');return false;">change</a></p>';
    var list = profList(), np = nProf(), nf = nFree(), profDone = B.profSkills.length >= np, fsk = forcedSkill();
    if (harmonist()) h += '<p class="m-hint" style="margin-bottom:4px;">Harmonist: <b style="color:#f3dca8;">Performance</b> is trained — your Harmonism spells are cast with it.</p>';
    if (B.school === 'Enchanting') h += '<div class="res-box' + (enchantOk() ? '' : ' bd-todo') + '" style="margin-top:0;margin-bottom:8px;">Enchanting needs <b>Crafting 12</b> or higher, also for a new character' + (enchantOk() ? ' ✓' : ' — train Crafting (as a profession or free skill) with STR 13 or more') + '.</div>';
    h += '<div class="m-lbl">1 · Profession skills — choose ' + np + ' of ' + list.length + ' <span class="bd-count' + (profDone ? ' ok' : '') + '">' + B.profSkills.length + '/' + np + '</span></div><div class="m-row">' + list.map(function (s) { var on = B.profSkills.indexOf(s) >= 0; var forced = !!fsk && s === fsk;
      return chip(esc(s) + ' <small>' + lvl(s) + '</small>', on, forced ? '' : "DBB.toggleSkill('prof','" + jsq(s) + "')", forced || (!on && profDone), forced ? (p.mage ? 'Your school is always trained' : 'Harmonism is cast with Performance') : ''); }).join('') + '</div>';
    var all = A(window.DB_SKILLS).filter(function (s) { return s.type !== 'secondary'; });
    h += '<div class="m-lbl">2 · Free choice — ' + nf + ' more of any skill <span class="bd-count' + (B.freeSkills.length >= nf ? ' ok' : '') + '">' + B.freeSkills.length + '/' + nf + '</span></div>';
    if (!profDone) h += '<p class="m-hint" style="margin:-2px 0 6px;">Choose your ' + np + ' profession skills first.</p>';
    h += '<div class="m-row' + (profDone ? '' : ' bd-locked') + '">' + all.map(function (s) { var taken = B.profSkills.indexOf(s.name) >= 0, on = B.freeSkills.indexOf(s.name) >= 0;
      if (taken) return '<button class="chip taken" disabled title="Already trained from your profession">' + esc(s.name) + ' <small>✓</small></button>';
      return chip(esc(s.name) + ' <small>' + lvl(s.name) + '</small>', on, "DBB.toggleSkill('free','" + jsq(s.name) + "')", !on && (!profDone || B.freeSkills.length >= nf)); }).join('') + '</div>';
    return h;
  }
  // a "finish that step first" prompt with a link to it
  function need(label, why) { var i = steps().indexOf(label === 'Magic' ? 'Heroic Ability' : label);
    return '<div class="res-box">Choose your <b>' + esc(label === 'Magic' ? 'school of magic' : label.toLowerCase()) + '</b> first, ' + esc(why) + '. <a href="#" style="color:#5cb894;" onclick="DBB.go(' + i + ');return false;">Go to ' + esc(label) + '</a></div>'; }
  function schoolCards(p) {
    // a homebrew caster profession offers only its own school(s)
    var R = window.DB_MAGIC_RULES || {}, schools = isHb(p) && Object.keys(p.schoolSkills || {}).length ? Object.keys(p.schoolSkills) : A((R.creationSchools || {}).Mage).length ? R.creationSchools.Mage : A(R.schools).length ? R.schools : Object.keys(p.schoolSkills || {});
    return '<div class="m-lbl">School of magic</div><div class="bd-schools">' + schools.map(function (s) { var on = B.school === s;
      var sk = A(window.DB_SKILLS).find(function (x) { return x.name === s; });
      var rec = schoolRec(s) || {}, recipe = s === 'Alchemy';
      var sp = A(window.DB_SPELLS).filter(function (x) { return x.school === s; }), r1 = sp.filter(function (x) { return x.rank === 1; });
      var tr = A(window.DB_MAGIC_TRICKS).filter(function (x) { return x.school === s; });
      var skills = A((p.schoolSkills || {})[s]).filter(function (x) { return x !== s; });
      return '<button class="bd-school' + (on ? ' sel' : '') + '" aria-pressed="' + on + '" onclick="DBB.school(\'' + jsq(s) + '\')">' +
        '<div class="bd-school-hd"><b>' + esc(s) + '</b><span>' + esc(rec.title || '') + (rec.source === 'magic' && !rec.existing ? ' · Book of Magic' : '') + (on ? ' ✓' : '') + '</span></div>' +
        '<div class="bd-school-tx">' + esc(rec.summary || (sk && sk.text) || '') + '</div>' +
        (s === 'Enchanting' ? '<div class="bd-school-tx dim">Needs Crafting 12 or higher. Every spell needs tools.</div>' : '') +
        '<div class="bd-school-row"><i>Rank 1 ' + (recipe ? 'recipes' : 'spells') + '</i> ' + r1.map(function (x) { return esc(x.name); }).join(', ') + (sp.length > r1.length ? ' <small>(+' + (sp.length - r1.length) + ' of higher rank)</small>' : '') + '</div>' +
        '<div class="bd-school-row"><i>Tricks</i> ' + (tr.length ? tr.map(function (x) { return esc(x.name); }).join(', ') : 'none of its own — general magic tricks') + '</div>' +
        '<div class="bd-school-row"><i>Profession skills</i> ' + [esc(s) + ' (INT)'].concat(skills.map(esc)).join(', ') + '</div></button>'; }).join('') + '</div>' +
      '<p class="m-hint" style="margin-top:6px;">Your school is a trained skill (INT). Any school can also cast general magic.</p>';
  }
  function abilityPage() {
    var p = prof(), h = '';
    if (caster()) {
      var hm = harmonist();
      if (hm) h += box('<b>Harmonist</b> — three rank 1 Harmonism spells and three Harmonism tricks, plus a grimoire. Spells need a <b>melody</b> (sung or played) and are cast with Performance. Harmonists can\'t learn general magic.');
      else h += schoolCards(p);
      if (!B.school) return h;
      var gen = hm ? [] : ['General'];
      var sp = A(window.DB_SPELLS).filter(function (s) { return s.rank === 1 && (s.school === B.school || gen.indexOf(s.school) >= 0); });
      var tr = A(window.DB_MAGIC_TRICKS).filter(function (s) { return s.school === B.school || gen.indexOf(s.school) >= 0; });
      if (B.school === 'Enchanting') h += '<div class="m-lbl">Your tools</div><div class="m-row">' + ENCH_TOOLS.map(function (t) { return chip(esc(t), B.tools === t, "DBB.set('tools','" + jsq(t) + "')"); }).join('') + '</div><p class="m-hint">Enchanting spells need the tools for the item: blacksmithing for metal, carpentry for wood, tanning for leather.</p>';
      if (B.school === 'Alchemy') h += '<p class="m-hint" style="margin-top:8px;">Alchemy\'s spells are <b>recipes</b>: you brew doses instead of casting. You start with a small field laboratory, D6 doses of general herbs and one dose of each recipe you choose.</p>';
      // the same rows as the sheet's spell picker (name, meta line, text, Learn button)
      var row = function (k, s, meta) { var on = B[k].indexOf(s.name) >= 0, full = !on && B[k].length >= 3;
        var btn = on ? '<button class="brow-add have" style="cursor:pointer;" onclick="DBB.toggleList(\'' + k + '\',\'' + jsq(s.name) + '\')">✓ Learned</button>' : '<button class="brow-add"' + (full ? ' disabled' : '') + ' onclick="DBB.toggleList(\'' + k + '\',\'' + jsq(s.name) + '\')">Learn</button>';
        return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(s.name) + '</div><div class="brow-meta">' + meta + '</div><div class="brow-desc">' + esc(s.text || '') + '</div></div><div class="brow-btns">' + btn + '</div></div>'; };
      var rng = function (r) { return /^\d+$/.test(String(r)) ? r + ' m' : String(r || '').replace(/ meters?$/, ' m'); };
      var cap = function (t) { t = String(t || ''); return t ? t.charAt(0).toUpperCase() + t.slice(1) : ''; };
      h += '<div class="m-lbl">' + (B.school === 'Alchemy' ? 'Recipes & spells' : 'Spells') + ' (' + B.spells.length + '/3)</div><div class="brow-list" style="padding:0;">' + sp.map(function (s) { return row('spells', s, ['Rank ' + s.rank, s.school, cap(s.castingTime), rng(s.range), s.duration].filter(Boolean).map(esc).join(' · ')); }).join('') + '</div>';
      h += '<div class="m-lbl">Magic Tricks (' + B.tricks.length + '/3)</div><div class="brow-list" style="padding:0;">' + tr.map(function (s) { return row('tricks', s, esc(s.school) + ' · 1 WP'); }).join('') + '</div>';
      return h;
    }
    return profAbilities(p);
  }
  function kitItems(k) { return k.items.map(function (it, ix) { var n = it.choice ? (B.kitChoice[ix] || '') : it.name; return { name: n, qty: it.qty || 1, note: it.note || '', choice: it.choice, ix: ix }; }); }
  // Each kit is a card: its D6 range, the items as a list (a choice marked as one), and the
  // food and silver dice; the rolled supplies sit below in a plain box of their own.
  var KIT_NUM = ['I', 'II', 'III'];
  function kitRolls(n) { return n >= 3 ? ['1–2', '3–4', '5–6'] : n === 2 ? ['1–3', '4–6'] : ['1–6']; }
  function gearPage() {
    var p = prof(), h = sub(rollBtn('Roll D6', 'DBB.rollKit()')), KIT_ROLL = kitRolls(A(p.kits).length);
    h += '<div class="bd-kits">' + A(p.kits).map(function (k, i) { var on = B.kit === i;
      return '<button class="bd-kit' + (on ? ' sel' : '') + '" aria-pressed="' + on + '" onclick="DBB.kit(' + i + ')">' +
        '<span class="bd-kit-hd"><b>Kit ' + (KIT_NUM[i] || i + 1) + '</b><span class="bd-kit-roll">D6 · ' + (KIT_ROLL[i] || '') + '</span></span>' +
        '<span class="bd-kit-items">' + k.items.map(function (it, ix) { var t = it.choice ? it.choice.join(' or ') : (it.qty > 1 ? it.qty + '× ' : '') + it.name + (it.note ? ' (' + it.note + ')' : '');
          var picked = on && it.choice && B.kitChoice[ix];
          return '<span class="bd-kit-it' + (it.choice ? ' ch' : '') + '">' + esc(picked || t) + (it.choice ? ' <i>' + (picked ? 'chosen' : 'choose') + '</i>' : '') + '</span>'; }).join('') + '</span>' +
        '<span class="bd-kit-ft"><span>Food <b>' + esc(k.food) + '</b></span><span>Silver <b>' + esc(k.silver) + '</b></span>' + (on ? '<span class="bd-kit-on">✓ Chosen</span>' : '') + '</span></button>'; }).join('') + '</div>';
    var k = A(p.kits)[B.kit];
    if (k) {
      k.items.forEach(function (it, ix) { if (!it.choice) return; h += '<div class="m-lbl">Choose one</div><div class="m-row">' + it.choice.map(function (c) { return chip(esc(c), B.kitChoice[ix] === c, 'DBB.kitChoice(' + ix + ",'" + jsq(c) + "')"); }).join('') + '</div>'; });
      h += '<div class="m-lbl">Rolled supplies</div><div class="bd-supplies"><span>Food rations <b>' + (B.food == null ? '—' : B.food) + '</b> <small>' + esc(B.foodTxt) + '</small></span><span>Silver <b>' + (B.silver == null ? '—' : B.silver) + '</b> <small>' + esc(B.silverTxt) + '</small></span><button class="m-btn ghost" style="padding:4px 10px;" onclick="DBB.rollSupplies()">🎲 Re-roll</button></div>';
    }
    return h;
  }

  // ── actions ──
  var api = {
    launch: function () { B = fresh(); step = 0; seen = {}; render._step = -1; $('builder-overlay').classList.add('open'); render(); },
    close: function () { $('builder-overlay').classList.remove('open'); },
    next: function () { if (!valid(step)) return; step = Math.min(last(), step + 1); render(); },
    back: function () { step = Math.max(0, step - 1); render(); },
    go: function (i) { i = parseInt(i, 10); if (isNaN(i) || i < 0 || i > last()) return; step = i; render(); },
    set: function (k, v) {
      if (k === 'harmonist') { var on = v === '1'; if (!!B.harmonist === on) return; B.harmonist = on ? '1' : ''; B.school = on ? 'Harmonism' : ''; B.spells = []; B.tricks = [];
        if (on) { if (B.profSkills.indexOf('Performance') < 0) { B.profSkills = ['Performance'].concat(B.profSkills).slice(0, nProf()); } B.freeSkills = B.freeSkills.filter(function (x) { return x !== 'Performance'; }); }
        render(); return; }
      if (k === 'kinSet') { B.kinSet = v === 'core' ? 'core' : 'all'; if (B.kinSet === 'core' && kin() && !coreOk(kin())) B.kin = ''; render(); return; } if (k === 'prof' && B.prof !== v) { B.harmonist = ''; B.tools = ''; B.profSkills = []; B.freeSkills = []; B.school = ''; B.ability = ''; B.spells = []; B.tricks = []; B.kit = -1; B.kitChoice = {}; B.food = null; B.silver = null; }
      if (k === 'age' && B.age !== v) { B.freeSkills = B.freeSkills.slice(0, (A(T().ages).find(function (a) { return a.id === v; }) || {}).freeSkills || 4); }
      B[k] = String(v);
      // a homebrew caster profession with a single school: that school is the choice
      if (k === 'prof') { var hp = prof(), ks = hp && isHb(hp) && hp.mage ? Object.keys(hp.schoolSkills || {}) : []; if (ks.length === 1 && !B.school) { B.school = ks[0]; B.profSkills = [ks[0]]; } }
      if (step > last()) step = last(); render(); },
    setq: function (k, v) { B[k] = v; var ft = $('builder-ft'); if (ft) { var nb = ft.querySelector('.m-btn:last-child'); if (nb) nb.disabled = !(step === last() ? allValid() : valid(step)); } },
    rollKin: function () { var core = B.kinSet === 'core', n = d(core ? 12 : 20); var k = kinList().find(function (x) { return inRoll(kinRoll(x), n); }); if (k) { api.set('kin', k.name); log('Kin', k.name, (core ? 'd12(' : 'd20(') + n + ')'); } },
    rollProf: function () { var n = d(10); var p = A(window.DB_PROFESSIONS).find(function (x) { return x.roll === n; }); if (p) { api.set('prof', p.name); log('Profession', p.name, 'd10(' + n + ')'); } },
    rollAge: function () { var n = d(6); var a = A(T().ages).find(function (x) { return inRoll(x.roll, n); }); if (a) { api.set('age', a.id); log('Age', a.name, 'd6(' + n + ')'); } },
    // the book's D6 tables have six entries; a shorter homebrew list rolls among its own
    rollName: function () { var k = kin(); if (!k) return; var l = A(k.names); var v = l.length === 6 ? l[d(6) - 1] : pickOf(l); if (v) api.set('name', v); },
    rollNick: function () { if (!prof()) return; var l = A(prof().nicknames); var v = l.length === 6 ? l[d(6) - 1] : pickOf(l); if (v) api.set('nick', v); },
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
      if (i >= 0) list.splice(i, 1);
      else if (which === 'prof') { if (list.length < nProf()) { list.push(n); B.freeSkills = B.freeSkills.filter(function (x) { return x !== n; }); } }  // a skill can't be both
      else if (B.profSkills.length >= nProf() && B.profSkills.indexOf(n) < 0 && list.length < nFree()) list.push(n);
      render(); },
    toggleList: function (k, n) { n = String(n).replace(/&#39;/g, "'"); var l = B[k]; var i = l.indexOf(n); if (i >= 0) l.splice(i, 1); else if (l.length < 3) l.push(n); render(); },
    rollTable: function (which) { var list = which === 'weakness' ? window.DB_WEAKNESSES : which === 'memento' ? window.DB_MEMENTOS : window.DB_APPEARANCES; var n = d(20);
      var row = A(list).find(function (x) { return x.roll === n; }); if (!row) return; B[which] = which === 'weakness' ? row.name + ' — ' + row.text : row.text; log(which.charAt(0).toUpperCase() + which.slice(1), which === 'weakness' ? row.name : row.text, 'd20(' + n + ')'); render(); },
    // three kits = 1–2 / 3–4 / 5–6 (the book); a homebrew profession may have one or two
    rollKit: function () { var len = Math.max(1, Math.min(3, A(prof() && prof().kits).length)), n = d(6), i = Math.floor((n - 1) * len / 6); api.kit(i); log('Starting gear', 'Kit ' + kitRolls(len)[i], 'd6(' + n + ')'); },
    kit: function (i) { if (B.kit !== i) { B.kit = i; B.kitChoice = {}; api.rollSupplies(true); } render(); },
    kitChoice: function (ix, c) { B.kitChoice[ix] = String(c).replace(/&#39;/g, "'"); render(); },
    rollSupplies: function (quiet) { var k = A(prof().kits)[B.kit]; if (!k) return; var f = SH().rollExpr(k.food), s = SH().rollExpr(k.silver); B.food = f.total; B.silver = s.total; B.foodTxt = '(' + f.text + ')'; B.silverTxt = '(' + s.text + ')'; if (quiet !== true) render(); },
    finish: function () {
      if (!allValid() || !SH()) return; var p = prof(), k = A(p.kits)[B.kit];
      var attrs = {}; ATTRS.forEach(function (a) { attrs[a] = finalAttr(a); });
      var hm = harmonist(), cast = caster();
      var abilities = []; if (!p.mage && !hm) { (p.heroicChoice ? [B.ability] : A(p.heroicAbilities)).forEach(function (n) { if (n) abilities.push({ name: n, kind: 'prof' }); }); }
      var gear = kitItems(k).filter(function (x) { return x.name; }).map(function (x) { return { name: x.name, qty: x.qty, note: x.note }; });
      if (hm && !gear.some(function (g) { return g.name === 'Grimoire'; })) gear.push({ name: 'Grimoire', qty: 1 });
      // Book of Magic starting gear: an alchemist's field lab, herbs and a dose of each recipe; an enchanter's tools
      if (cast && B.school === 'Alchemy') { var hb = d(6); gear.push({ name: 'Small Field Laboratory', qty: 1 }, { name: 'General Herbs', qty: hb, note: 'd6(' + hb + ')' });
        B.spells.forEach(function (n) { var sd = A(window.DB_SPELLS).find(function (x) { return x.name === n; }); if (sd && sd.recipe) gear.push({ name: sd.product, qty: 1 }); }); }
      if (cast && B.school === 'Enchanting' && B.tools) gear.push({ name: B.tools, qty: 1 });
      SH().applyBuild({ name: String(B.name).trim(), nickname: String(B.nick || '').trim(), kin: B.kin, profession: B.prof, age: B.age, attrs: attrs,
        trained: B.profSkills.concat(B.freeSkills, hm ? ['Harmonism'] : []), abilities: abilities, spells: cast ? B.spells : [], tricks: cast ? B.tricks : [],
        gear: gear, food: B.food, silver: B.silver, weakness: B.weakness, memento: B.memento, appearance: B.appearance });
      api.close();
    },
    _state: function () { return B; }, _step: function () { return step; }, _go: function (i) { api.go(i); }, _steps: function () { return steps().slice(); }, _valid: valid
  };
  function roll4() { var r = [d(6), d(6), d(6), d(6)]; var s = r.slice().sort(function (a, b) { return a - b; }); return { v: s[1] + s[2] + s[3], dice: r, drop: s[0] }; }
  window.DBB = api;
})();
