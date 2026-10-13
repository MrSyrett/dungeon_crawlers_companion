// ALIEN RPG character builder — a MULTI-STEP creation wizard. Steps:
//   1. Name & Career (career sets the key attribute)
//   2. Attributes & Skills (14 attribute points, 10 skill points)
//   3. Talents & Story (career talent, personal agenda, signature item)
//   4. Starting Gear (pick weapons / armor / gear from shop-style lists)
// Talent, agenda, signature and gear choices use the same name-row + details
// picker as the gear shop. Hands a finished character to applySheet().
// Uses sheet globals: YZE_ATTRIBUTES, ALIEN_SKILLS, ALIEN_CAREERS, ALIEN_TALENTS,
// ALIEN_WEAPONS, ALIEN_ARMOR, YZE_GEAR, $, esc, applySheet, autoDerive, num,
// saveSheet, addLog, S.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  function arr(x) { return Array.isArray(x) ? x : []; }
  var ATTRS = arr(W.YZE_ATTRIBUTES);
  var ASK = arr(W.ALIEN_SKILLS);
  var CAREERS = arr(W.ALIEN_CAREERS);
  var TALENTS = arr(W.ALIEN_TALENTS);
  var ATTR_BUDGET = 14, SKILL_BUDGET = 10;
  var STEPS = ['Career', 'Attributes', 'Skills', 'Talents & Story', 'Starting Gear'];

  var step = 0;
  var name = '', pronouns = '', key = '', career = '', talentPick = '';
  var agenda = '', signature = '';
  var attrs = {}, skills = {}, startGear = [], gearTab = 'weap';

  function careerObj(nm) { for (var i = 0; i < CAREERS.length; i++) if (CAREERS[i].name === nm) return CAREERS[i]; return null; }
  function talentObj(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i]; return null; }
  function talentDesc(nm) { var t = talentObj(nm); return t ? t.desc : ''; }
  function isCareerSkill(nm) { var c = careerObj(career); return !!(c && c.skills.indexOf(nm) >= 0); }
  function skillCap(nm) { return isCareerSkill(nm) ? 3 : 1; }

  function reset() {
    step = 0; name = ''; pronouns = ''; key = ''; career = ''; talentPick = '';
    agenda = ''; signature = ''; startGear = []; gearTab = 'weap';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; ASK.forEach(function (s) { skills[s.name] = 0; });
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; ASK.forEach(function (s) { n += skills[s.name]; }); return n; }
  function attrMax(k) { return key === k ? 5 : 4; }

  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'yzeb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.YZEB.close(); };
    ov.innerHTML =
      '<div class="modal wide"><div class="modal-hd"><div class="ttl" id="yzeb-ttl">✦ Build a Character</div><button class="x" onclick="window.YZEB.close()">✕</button></div>'
      + '<div id="yzeb-steps" class="yzeb-steps"></div>'
      + '<div class="modal-bd" id="yzeb-body"></div>'
      + '<div id="yzeb-nav" class="yzeb-nav"></div></div>';
    document.body.appendChild(ov);
  }

  function stepper(label, val, minus, plus, minusDis, plusDis) {
    return '<div class="a-row"><span class="a-name2">' + esc(label) + '</span><span class="a-code">' + val + '</span>'
      + '<button onclick="' + minus + '"' + (minusDis ? ' disabled' : '') + '>−</button>'
      + '<button onclick="' + plus + '"' + (plusDis ? ' disabled' : '') + '>+</button></div>';
  }
  // Shop-style picker row: name + small meta on one line, details below, action at right.
  function prow(nm, meta, desc, sel, onclick, actLabel) {
    return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(nm)
      + (meta ? '<span class="brow-cost">' + esc(meta) + '</span>' : '') + '</div>'
      + (desc ? '<div class="brow-desc">' + esc(desc) + '</div>' : '') + '</div>'
      + '<button class="brow-add' + (sel ? ' have' : '') + '" onclick="' + onclick + '">' + esc(actLabel || (sel ? '✓ Chosen' : '＋ Select')) + '</button></div>';
  }

  function stepIdentity() {
    var h = '<div class="yzeb-2col">';
    h += '<div><div class="m-lbl">Name</div><input class="m-input" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)"></div>';
    h += '<div><div class="m-lbl">Pronouns</div><input class="m-input" value="' + esc(pronouns) + '" placeholder="they / she / he …" oninput="window.YZEB.setPronouns(this.value)"></div>';
    h += '</div>';
    h += '<div class="m-lbl" style="margin-top:14px;">Career <span class="yzeb-sub">(sets your key attribute)</span></div>';
    h += '<div class="yzeb-list">' + CAREERS.map(function (c) {
      return prow(c.name, 'Key ' + c.key, c.skills.join(' · '), career === c.name, "window.YZEB.setCareer('" + c.name.replace(/'/g, "\\'") + "')", career === c.name ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    return h;
  }

  function stepAttrs() {
    var aLeft = ATTR_BUDGET - attrTotal();
    var h = '<p class="m-hint">Distribute <b style="color:#5fd6ea;">14</b> attribute points — each starts at 2; your key attribute ★ may reach 5, the rest 4. <b>Remaining: ' + aLeft + '</b></p>';
    h += '<div class="a-skills" style="grid-template-columns:1fr;">' + ATTRS.map(function (a) {
      var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || aLeft <= 0);
    }).join('') + '</div>';
    return h;
  }
  function stepSkills() {
    var sLeft = SKILL_BUDGET - skillSpent();
    var h = '<p class="m-hint">Distribute <b style="color:#5fd6ea;">10</b> skill points — career skills ★ to 3, the rest to 1. <b>Remaining: ' + sLeft + '</b></p>';
    ATTRS.forEach(function (a) {
      h += '<div class="a-attr">' + esc(a.name) + '</div><div class="a-skills">';
      h += ASK.filter(function (s) { return s.attr === a.key; }).map(function (s) {
        var v = skills[s.name], cap = skillCap(s.name), star = isCareerSkill(s.name) ? ' ★' : '';
        return stepper(s.name + star, v, "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',1)", v <= 0, v >= cap || sLeft <= 0);
      }).join('') + '</div>';
    });
    return h;
  }

  function stepStory() {
    var c = careerObj(career);
    if (!c) return '<p class="m-hint">Go back and pick a career first — your talent and story prompts come from it.</p>';
    var h = '<div class="m-lbl">Starting talent <span class="yzeb-sub">(choose one from your career)</span></div>';
    h += '<div class="yzeb-list">' + c.talents.map(function (t) {
      return prow(t, '', talentDesc(t), talentPick === t, "window.YZEB.pickTalent('" + t.replace(/'/g, "\\'") + "')", talentPick === t ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    h += '<div class="m-lbl" style="margin-top:14px;">Personal agenda</div>';
    h += '<div class="yzeb-list">' + (c.agendas || []).map(function (a, idx) {
      return prow(a, '', '', agenda === a, "window.YZEB.pickAgenda(" + idx + ")", agenda === a ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    h += '<div class="m-lbl" style="margin-top:14px;">Signature item</div>';
    h += '<div class="yzeb-list">' + (c.signature || []).map(function (s, idx) {
      return prow(s, '', '', signature === s, "window.YZEB.pickSig(" + idx + ")", signature === s ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    return h;
  }

  function gearSources() {
    return { weap: arr(W.ALIEN_WEAPONS), armor: arr(W.ALIEN_ARMOR), gear: arr(W.YZE_GEAR) };
  }
  function stepGear() {
    var c = careerObj(career), src = gearSources();
    var h = '';
    if (c && c.gear) h += '<p class="m-hint"><b style="color:#5fd6ea;">Suggested loadout:</b> ' + esc(c.gear) + '</p>';
    else h += '<p class="m-hint">Add your starting weapons, armor, and gear. You can tweak everything on the sheet afterward.</p>';
    if (startGear.length) {
      h += '<div class="m-lbl">Chosen (' + startGear.length + ')</div><div class="yzeb-list">';
      h += startGear.map(function (g, i) {
        var meta = g.kind === 'weapon' ? ('Weapon · ' + (g.damage != null ? g.damage + ' dmg' : '') + (g.range ? ' · ' + g.range : '')) : g.kind === 'armor' ? ('Armor ' + (g.rating != null ? g.rating : '')) : 'Gear';
        return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(g.name) + '<span class="brow-cost">' + esc(meta) + '</span></div></div>'
          + '<button class="brow-add" style="background:#3a1a1a;color:#df8a8a;" onclick="window.YZEB.removeGear(' + i + ')">✕</button></div>';
      }).join('') + '</div>';
    }
    h += '<div class="yzeb-gtabs">'
      + '<button class="builder-chip' + (gearTab === 'weap' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'weap\')">Weapons</button>'
      + '<button class="builder-chip' + (gearTab === 'armor' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'armor\')">Armor</button>'
      + '<button class="builder-chip' + (gearTab === 'gear' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'gear\')">Gear</button></div>';
    var list = src[gearTab] || [];
    if (!list.length) { h += '<p class="m-hint" style="margin-top:8px;">Nothing to add here.</p>'; return h; }
    h += '<div class="yzeb-list" style="margin-top:6px;">' + list.map(function (it, idx) {
      var meta, desc;
      if (gearTab === 'weap') { meta = (it.damage != null ? it.damage + ' dmg' : '') + (it.range ? ' · ' + it.range : ''); desc = (it.class ? it.class + ' · ' : '') + 'bonus ' + (it.bonus || '0') + ' · wt ' + (it.weight || '1') + (it.special ? ' · ' + it.special : ''); }
      else if (gearTab === 'armor') { meta = 'Armor ' + (it.rating != null ? it.rating : ''); desc = ((it.air && it.air !== '—') ? 'Air ' + it.air + ' · ' : '') + 'wt ' + (it.weight || '1') + (it.comment ? ' · ' + it.comment : ''); }
      else { meta = (it.weight != null && it.weight !== '' ? it.weight + ' wt' : ''); desc = it.note || it.desc || ''; }
      return prow(it.name, meta, desc, false, "window.YZEB.addGear('" + gearTab + "'," + idx + ")", '＋ Add');
    }).join('') + '</div>';
    return h;
  }

  function renderSteps() {
    var el = $('yzeb-steps'); if (!el) return;
    el.innerHTML = STEPS.map(function (s, i) {
      return '<button class="yzeb-step' + (i === step ? ' on' : '') + (i < step ? ' done' : '') + '" onclick="window.YZEB.goStep(' + i + ')"><span class="yzeb-step-n">' + (i + 1) + '</span>' + esc(s) + '</button>';
    }).join('');
  }
  function renderNav() {
    var el = $('yzeb-nav'); if (!el) return;
    var aLeft = ATTR_BUDGET - attrTotal(), sLeft = SKILL_BUDGET - skillSpent();
    var ready = aLeft === 0 && sLeft >= 0 && !!career && !!talentPick;
    var msg = '';
    if (step === 1) msg = (aLeft === 0 ? 'Attributes set' : aLeft + ' attribute points left');
    else if (step === 2) msg = (sLeft === 0 ? 'Skills set' : sLeft + ' skill points left');
    else if (step === 0 && !career) msg = 'Pick a career';
    else if (step === 3 && !talentPick) msg = 'Pick a starting talent';
    var left = step > 0 ? '<button class="m-btn ghost" onclick="window.YZEB.back()">‹ Back</button>' : '<button class="m-btn ghost" onclick="window.YZEB.close()">Cancel</button>';
    var right = step < STEPS.length - 1
      ? '<button class="m-btn" onclick="window.YZEB.next()">Next ›</button>'
      : '<button class="m-btn" onclick="window.YZEB.apply()"' + (ready ? '' : ' disabled') + '>Finish</button>';
    el.innerHTML = '<span class="m-hint" style="margin:0;">' + esc(msg) + '</span><span style="display:flex;gap:8px;margin-left:auto;">' + left + right + '</span>';
  }
  function render() {
    ensure();
    var body = step === 0 ? stepIdentity() : step === 1 ? stepAttrs() : step === 2 ? stepSkills() : step === 3 ? stepStory() : stepGear();
    $('yzeb-body').innerHTML = body;
    var t = $('yzeb-ttl'); if (t) t.textContent = '✦ ' + STEPS[step];
    renderSteps(); renderNav();
  }

  window.YZEB = {
    launch: function () {
      try {
        reset();
        if (typeof S !== 'undefined' && S) {
          if (S.name) name = S.name;
          if (S.pronouns) pronouns = S.pronouns;
          if (S.key) key = S.key;
          if (S.career) career = S.career;
          if (S.agenda) agenda = S.agenda;
          if (S.signature) signature = S.signature;
          ATTRS.forEach(function (a) { if (S.attrs && S.attrs[a.key] != null) attrs[a.key] = Math.max(2, num(S.attrs[a.key])); });
          ASK.forEach(function (s) { if (S.skills && S.skills[s.name] != null) skills[s.name] = num(S.skills[s.name]); });
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
    setCareer: function (nm) {
      career = (career === nm) ? '' : nm; talentPick = ''; agenda = ''; signature = '';
      var c = careerObj(career);
      if (c) { key = c.key; if (attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); }
      render();
    },
    pickTalent: function (t) { talentPick = (talentPick === t) ? '' : t; render(); },
    pickAgenda: function (idx) { var c = careerObj(career); if (c && c.agendas && c.agendas[idx] != null) { agenda = (agenda === c.agendas[idx]) ? '' : c.agendas[idx]; render(); } },
    pickSig: function (idx) { var c = careerObj(career); if (c && c.signature && c.signature[idx] != null) { signature = (signature === c.signature[idx]) ? '' : c.signature[idx]; render(); } },
    setGearTab: function (t) { gearTab = t; render(); },
    addGear: function (kind, idx) {
      var src = gearSources(); var it = (src[kind] || [])[idx]; if (!it) return;
      if (kind === 'weap') startGear.push({ kind: 'weapon', name: it.name, bonus: it.bonus || '', damage: it.damage != null ? num(it.damage) : 1, range: it.range || '', weight: it.weight || '1', skill: it.skill || 'Ranged Combat', equipped: false });
      else if (kind === 'armor') startGear.push({ kind: 'armor', name: it.name, rating: num(it.rating), weight: it.weight || '1', note: it.comment || it.note || '', equipped: false });
      else startGear.push({ kind: 'gear', name: it.name, weight: it.weight || '1', note: it.note || it.desc || '' });
      render();
    },
    removeGear: function (i) { startGear.splice(i, 1); render(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap(nm)) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, pronouns: pronouns, key: key, variant: 'alien', career: career, attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      ASK.forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      d.agenda = agenda; d.signature = signature;
      if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }];
      if (startGear.length) d.gear = startGear.map(function (g) { return g; });
      try { applySheet(d); } catch (e) {}
      try { autoDerive('health'); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'ALIEN · ' + (career || 'crew') + ' · Health & Resolve derived from attributes', 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
