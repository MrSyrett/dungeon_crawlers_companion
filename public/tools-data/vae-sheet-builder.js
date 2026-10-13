// VAESEN character builder — a MULTI-STEP creation wizard. Steps:
//   1. Archetype & Age (archetype sets key attribute/skill + talents; age sets point budgets)
//   2. Attributes (Young 15 / Middle-aged 14 / Old 13; each 2–4, key may reach 5)
//   3. Skills (Young 10 / Middle 12 / Old 14; cap 2, key skill 3; max 5)
//   4. Talent (one of the archetype's three)
//   5. Equipment (weapons / armor / gear)
// Hands a finished character to applySheet(). Reads sheet globals VAE_* , $, esc,
// num, applySheet, saveSheet, addLog, S.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  function arr(x) { return Array.isArray(x) ? x : []; }
  var ATTRS = arr(W.VAE_ATTRIBUTES);
  var SK = arr(W.VAE_SKILLS);
  var ARCH = arr(W.VAE_ARCHETYPES);
  var TALENTS = arr(W.VAE_TALENTS);
  var MELEE = arr(W.VAE_MELEE_WEAPONS);
  var RANGED = arr(W.VAE_RANGED_WEAPONS);
  var ARMORS = arr(W.VAE_ARMOR);
  var GEARS = arr(W.VAE_GEAR);
  var AGES = { 'Young': { a: 15, s: 10 }, 'Middle-aged': { a: 14, s: 12 }, 'Old': { a: 13, s: 14 } };
  var STEPS = ['Archetype & Age', 'Attributes', 'Skills', 'Talent', 'Equipment'];
  // archetype.key is a full attribute NAME ("Logic"); map to key code.
  function keyCodeFor(nameOrKey) { for (var i = 0; i < ATTRS.length; i++) { if (ATTRS[i].key === nameOrKey || ATTRS[i].name === nameOrKey) return ATTRS[i].key; } return ''; }

  var step = 0;
  var name = '', pronouns = '', age = 'Middle-aged', archetype = '', key = '', keySkill = '', talentPick = '';
  var attrs = {}, skills = {}, startGear = [], gearTab = 'weap';

  function archObj(nm) { for (var i = 0; i < ARCH.length; i++) if (ARCH[i].name === nm) return ARCH[i]; return null; }
  function talentDesc(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i].desc; return ''; }
  function skillCap(nm) { return keySkill === nm ? 3 : 2; }
  function attrBudget() { return (AGES[age] || AGES['Middle-aged']).a; }
  function skillBudget() { return (AGES[age] || AGES['Middle-aged']).s; }
  function attrMax(k) { return key === k ? 5 : 4; }

  function reset() {
    step = 0; name = ''; pronouns = ''; age = 'Middle-aged'; archetype = ''; key = ''; keySkill = ''; talentPick = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; SK.forEach(function (s) { skills[s.name] = 0; });
    startGear = []; gearTab = 'weap';
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; SK.forEach(function (s) { n += skills[s.name]; }); return n; }

  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'yzeb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.YZEB.close(); };
    ov.innerHTML = '<div class="modal wide"><div class="modal-hd"><div class="ttl" id="yzeb-ttl">✦ Build a Character</div><button class="x" onclick="window.YZEB.close()">✕</button></div>'
      + '<div id="yzeb-steps" class="yzeb-steps"></div><div class="modal-bd" id="yzeb-body"></div><div id="yzeb-nav" class="yzeb-nav"></div></div>';
    document.body.appendChild(ov);
  }
  function stepper(label, val, minus, plus, minusDis, plusDis) {
    return '<div class="a-row"><span class="a-name2">' + esc(label) + '</span><span class="a-code">' + val + '</span>'
      + '<button onclick="' + minus + '"' + (minusDis ? ' disabled' : '') + '>−</button>'
      + '<button onclick="' + plus + '"' + (plusDis ? ' disabled' : '') + '>+</button></div>';
  }
  function prow(nm, meta, desc, sel, onclick, actLabel) {
    return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(nm)
      + (meta ? '<span class="brow-cost">' + esc(meta) + '</span>' : '') + '</div>'
      + (desc ? '<div class="brow-desc">' + esc(desc) + '</div>' : '') + '</div>'
      + '<button class="brow-add' + (sel ? ' have' : '') + '" onclick="' + onclick + '">' + esc(actLabel || (sel ? '✓ Chosen' : '＋ Select')) + '</button></div>';
  }

  function stepArch() {
    var h = '<div class="m-lbl">Name</div><input class="m-input" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)">';
    h += '<div class="m-lbl" style="margin-top:12px;">Pronouns</div><input class="m-input" value="' + esc(pronouns) + '" placeholder="they / she / he …" oninput="window.YZEB.setPronouns(this.value)">';
    h += '<div class="m-lbl" style="margin-top:14px;">Age <span class="yzeb-sub">(youth = attributes, age = skills)</span></div><div class="yzeb-chips">';
    h += Object.keys(AGES).map(function (g) { return '<button class="builder-chip' + (age === g ? ' sel' : '') + '" onclick="window.YZEB.setAge(\'' + g + '\')">' + g + ' (' + AGES[g].a + '/' + AGES[g].s + ')</button>'; }).join('');
    h += '</div>';
    h += '<div class="m-lbl" style="margin-top:14px;">Archetype</div><div class="yzeb-list">';
    h += ARCH.map(function (a) { return prow(a.name, 'Key ' + a.key + ' · ' + a.keySkill, (a.talents || []).join(' · '), archetype === a.name, "window.YZEB.setArch('" + a.name.replace(/'/g, "\\'") + "')", archetype === a.name ? '✓ Chosen' : 'Choose'); }).join('');
    h += '</div>';
    return h;
  }
  function stepAttrs() {
    var left = attrBudget() - attrTotal();
    var h = '<p class="m-hint">Distribute <b style="color:#d8cfbf;">' + attrBudget() + '</b> points. Each 2–4; your key attribute may reach 5. <b>Remaining: ' + left + '</b></p>';
    h += '<div class="a-skills" style="grid-template-columns:1fr;">' + ATTRS.map(function (a) { var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || left <= 0); }).join('') + '</div>';
    return h;
  }
  function stepSkills() {
    var left = skillBudget() - skillSpent();
    var h = '<p class="m-hint">Distribute <b style="color:#d8cfbf;">' + skillBudget() + '</b> points. Cap 2 (3 in your key skill <b>' + esc(keySkill || '—') + '</b>). <b>Remaining: ' + left + '</b></p>';
    ATTRS.forEach(function (a) { var list = SK.filter(function (s) { return s.attr === a.key; });
      h += '<div class="a-attr">' + esc(a.name) + '</div><div class="a-skills">';
      h += list.map(function (s) { var v = skills[s.name], cap = skillCap(s.name), kk = (keySkill === s.name) ? ' ◆' : '';
        return stepper(s.name + kk, v, "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',1)", v <= 0, v >= cap || left <= 0); }).join('');
      h += '</div>'; });
    return h;
  }
  function stepTalent() {
    var a = archObj(archetype);
    var h = '<div class="m-lbl">Starting talent <span class="yzeb-sub">(one of your archetype\'s three)</span></div>';
    h += '<div class="yzeb-list">' + ((a && a.talents) || []).map(function (t) { return prow(t, '', talentDesc(t), talentPick === t, "window.YZEB.pickTalent('" + t.replace(/'/g, "\\'") + "')", talentPick === t ? '✓ Chosen' : 'Choose'); }).join('') + '</div>';
    if (a) h += '<p class="m-hint" style="margin-top:12px;"><b>Suggested equipment:</b> ' + esc(a.equipment) + '</p>';
    return h;
  }
  function gearSources() {
    return { weap: MELEE.map(function (w) { return Object.assign({}, w, { _ranged: false }); }).concat(RANGED.map(function (w) { return Object.assign({}, w, { _ranged: true }); })), gear: GEARS, armor: ARMORS };
  }
  function wpItem(it) { return { kind: 'weapon', equipped: true, name: it.name, bonus: (String(it.bonus).match(/-?\d+/) || [0])[0], damage: it.damage != null ? it.damage : 1, range: it.range != null ? String(it.range) : '0', weight: it.cost != null ? it.cost : '', skill: it.skill || (it._ranged ? 'Ranged Combat' : 'Close Combat') }; }
  function arItem(it) { return { kind: 'armor', equipped: true, name: it.name, rating: it.protection != null ? it.protection : 0, weight: '', note: it.comment || '' }; }
  function grItem(it) { return { kind: 'gear', name: it.name, weight: it.cost != null ? it.cost : '', note: (it.comment || '') + (it.bonus && it.bonus !== '—' ? ' (' + it.bonus + ')' : '') }; }
  function stepGear() {
    var h = '<p class="m-hint">Add starting weapons, armor and gear. You can tweak everything on the sheet afterward.</p>';
    if (startGear.length) {
      h += '<div class="m-lbl">Chosen (' + startGear.length + ')</div><div class="yzeb-list">';
      h += startGear.map(function (g, i) { var meta = g.kind === 'weapon' ? (g.damage + ' dmg · bonus ' + g.bonus) : g.kind === 'armor' ? ('Protection ' + g.rating) : '';
        return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(g.name) + (meta ? '<span class="brow-cost">' + esc(meta) + '</span>' : '') + '</div></div><button class="brow-add" style="background:#3a1a1a;color:#df8a8a;" onclick="window.YZEB.removeGear(' + i + ')">✕</button></div>'; }).join('') + '</div>';
    }
    h += '<div class="yzeb-gtabs"><button class="builder-chip' + (gearTab === 'weap' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'weap\')">Weapons</button>'
      + '<button class="builder-chip' + (gearTab === 'gear' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'gear\')">Gear</button>'
      + '<button class="builder-chip' + (gearTab === 'armor' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'armor\')">Armor</button></div>';
    var list = gearSources()[gearTab] || [];
    h += '<div class="yzeb-list" style="margin-top:6px;">' + list.map(function (it, idx) {
      var meta = gearTab === 'weap' ? ((it._ranged ? 'Ranged' : 'Melee') + ' · ' + it.damage + ' dmg · bonus ' + it.bonus) : gearTab === 'armor' ? ('Protection ' + it.protection) : (it.bonus && it.bonus !== '—' ? it.bonus + ' · cost ' + it.cost : 'cost ' + it.cost);
      return prow(it.name, meta, it.comment || '', false, "window.YZEB.addGear('" + gearTab + "'," + idx + ")", '＋ Add');
    }).join('') + '</div>';
    return h;
  }

  function renderSteps() { var el = $('yzeb-steps'); if (!el) return; el.innerHTML = STEPS.map(function (s, i) { return '<button class="yzeb-step' + (i === step ? ' on' : '') + (i < step ? ' done' : '') + '" onclick="window.YZEB.goStep(' + i + ')"><span class="yzeb-step-n">' + (i + 1) + '</span>' + esc(s) + '</button>'; }).join(''); }
  function ready() { return !!archetype && attrTotal() === attrBudget() && skillSpent() <= skillBudget(); }
  function renderNav() {
    var el = $('yzeb-nav'); if (!el) return;
    var left = step > 0 ? '<button class="m-btn ghost" onclick="window.YZEB.back()">‹ Back</button>' : '<button class="m-btn ghost" onclick="window.YZEB.close()">Cancel</button>';
    var right = step < STEPS.length - 1 ? '<button class="m-btn" onclick="window.YZEB.next()">Next ›</button>' : '<button class="m-btn" onclick="window.YZEB.apply()"' + (ready() ? '' : ' disabled') + '>Finish</button>';
    el.innerHTML = left + '<div style="flex:1;"></div>' + right;
  }
  function render() {
    var body = step === 0 ? stepArch() : step === 1 ? stepAttrs() : step === 2 ? stepSkills() : step === 3 ? stepTalent() : stepGear();
    $('yzeb-body').innerHTML = body;
    var t = $('yzeb-ttl'); if (t) t.textContent = '✦ ' + STEPS[step];
    renderSteps(); renderNav();
  }

  window.YZEB = {
    launch: function () {
      try {
        reset();
        if (typeof S !== 'undefined' && S) {
          if (S.name) name = S.name; if (S.pronouns) pronouns = S.pronouns; if (S.age && AGES[S.age]) age = S.age;
          if (S.archetype) { archetype = S.archetype; var a0 = archObj(archetype); if (a0) { key = keyCodeFor(a0.key); keySkill = a0.keySkill; } }
          ATTRS.forEach(function (a) { if (S.attrs && S.attrs[a.key] != null) attrs[a.key] = Math.max(2, num(S.attrs[a.key])); });
          SK.forEach(function (s) { if (S.skills && S.skills[s.name] != null) skills[s.name] = num(S.skills[s.name]); });
        }
      } catch (e) { reset(); }
      ensure(); render(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    goStep: function (i) { if (i >= 0 && i < STEPS.length) { step = i; render(); } },
    next: function () { if (step < STEPS.length - 1) { step++; render(); } },
    back: function () { if (step > 0) { step--; render(); } },
    setName: function (v) { name = v; },
    setPronouns: function (v) { pronouns = v; },
    setAge: function (g) { age = g; render(); },
    setArch: function (nm) {
      archetype = (archetype === nm) ? '' : nm; talentPick = '';
      var a = archObj(archetype);
      if (a) { key = keyCodeFor(a.key); keySkill = a.keySkill; if (attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (x) { if (x.key !== key && attrs[x.key] > 4) attrs[x.key] = 4; }); }
      else { key = ''; keySkill = ''; }
      render();
    },
    pickTalent: function (t) { talentPick = (talentPick === t) ? '' : t; render(); },
    setGearTab: function (t) { gearTab = t; render(); },
    addGear: function (kind, idx) { var it = (gearSources()[kind] || [])[idx]; if (!it) return; if (kind === 'weap') startGear.push(wpItem(it)); else if (kind === 'armor') startGear.push(arItem(it)); else startGear.push(grItem(it)); render(); },
    removeGear: function (i) { startGear.splice(i, 1); render(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (attrBudget() - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap(nm)) return; if (d > 0 && (skillBudget() - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var a = archObj(archetype);
      var resLow = a && a.resources ? num(String(a.resources).split(/[–-]/)[0]) : 3;
      var d = { name: name, pronouns: pronouns, age: age, archetype: archetype, key: key, keySkill: keySkill, resources: resLow || 3, attrs: {}, skills: {} };
      ATTRS.forEach(function (x) { d.attrs[x.key] = attrs[x.key]; });
      SK.forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }];
      if (startGear.length) d.gear = startGear.map(function (g) { return g; });
      try { applySheet(d); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'VAESEN · ' + (archetype || 'Investigator'), 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
