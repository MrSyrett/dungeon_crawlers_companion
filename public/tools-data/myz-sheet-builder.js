// MUTANT: YEAR ZERO character builder — a MULTI-STEP creation wizard. Steps:
//   1. Role (sets key attribute + specialist skill + the three role talents)
//   2. Attributes (14 points; each 2–4, key may reach 5)
//   3. Skills (10 points; max 3 each; at least 1 in your specialist skill)
//   4. Talent & Mutation (one of the role's three talents; one random/picked mutation)
//   5. Starting Gear (weapons / gear / armor; grub, water, bullets set on the sheet)
// Hands a finished character to applySheet(). Reads sheet globals:
// MYZ_ATTRIBUTES, MYZ_SKILLS, MYZ_ROLES, MYZ_TALENTS, MYZ_MUTATIONS,
// MYZ_MELEE_WEAPONS, MYZ_RANGED_WEAPONS, MYZ_ARMOR, MYZ_GEAR, $, esc, num,
// applySheet, saveSheet, addLog, S.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  function arr(x) { return Array.isArray(x) ? x : []; }
  var ATTRS = arr(W.MYZ_ATTRIBUTES);
  var SK = arr(W.MYZ_SKILLS);
  var ROLES = arr(W.MYZ_ROLES);
  var TALENTS = arr(W.MYZ_TALENTS);
  var MUT = arr(W.MYZ_MUTATIONS);
  var MELEE = arr(W.MYZ_MELEE_WEAPONS);
  var RANGED = arr(W.MYZ_RANGED_WEAPONS);
  var ARMORS = arr(W.MYZ_ARMOR);
  var GEARS = arr(W.MYZ_GEAR);
  var ATTR_BUDGET = 14, SKILL_BUDGET = 10;
  var STEPS = ['Role', 'Attributes', 'Skills', 'Talent & Mutation', 'Starting Gear'];

  var step = 0;
  var name = '', pronouns = '', role = '', key = '', specialist = '', talentPick = '', mutPick = '';
  var attrs = {}, skills = {}, startGear = [], gearTab = 'weap';

  function roleObj(nm) { for (var i = 0; i < ROLES.length; i++) if (ROLES[i].name === nm) return ROLES[i]; return null; }
  function talentObj(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i]; return null; }
  function talentDesc(nm) { var t = talentObj(nm); return t ? t.desc : ''; }
  function mutObj(nm) { for (var i = 0; i < MUT.length; i++) if (MUT[i].name === nm) return MUT[i]; return null; }
  function skillCap() { return 3; }

  function reset() {
    step = 0; name = ''; pronouns = ''; role = ''; key = ''; specialist = ''; talentPick = ''; mutPick = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; SK.forEach(function (s) { skills[s.name] = 0; });
    startGear = []; gearTab = 'weap';
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; SK.forEach(function (s) { n += skills[s.name]; }); return n; }
  function attrMax(k) { return key === k ? 5 : 4; }

  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'yzeb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.YZEB.close(); };
    ov.innerHTML =
      '<div class="modal wide"><div class="modal-hd"><div class="ttl" id="yzeb-ttl">✦ Build a Mutant</div><button class="x" onclick="window.YZEB.close()">✕</button></div>'
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
  function prow(nm, meta, desc, sel, onclick, actLabel) {
    return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(nm)
      + (meta ? '<span class="brow-cost">' + esc(meta) + '</span>' : '') + '</div>'
      + (desc ? '<div class="brow-desc">' + esc(desc) + '</div>' : '') + '</div>'
      + '<button class="brow-add' + (sel ? ' have' : '') + '" onclick="' + onclick + '">' + esc(actLabel || (sel ? '✓ Chosen' : '＋ Select')) + '</button></div>';
  }

  function stepRole() {
    var h = '<div class="m-lbl">Name</div><input class="m-input" value="' + esc(name) + '" placeholder="Mutant name" oninput="window.YZEB.setName(this.value)">';
    h += '<div class="m-lbl" style="margin-top:12px;">Pronouns</div><input class="m-input" value="' + esc(pronouns) + '" placeholder="they / she / he …" oninput="window.YZEB.setPronouns(this.value)">';
    h += '<div class="m-lbl" style="margin-top:14px;">Role <span class="yzeb-sub">(sets key attribute, specialist skill and talents)</span></div>';
    h += '<div class="yzeb-list">' + ROLES.map(function (r) {
      return prow(r.name, 'Key ' + r.key + ' · ' + r.specialist, (r.talents || []).join(' · '), role === r.name, "window.YZEB.setRole('" + r.name.replace(/'/g, "\\'") + "')", role === r.name ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    return h;
  }
  function stepAttrs() {
    var left = ATTR_BUDGET - attrTotal();
    var h = '<p class="m-hint">Distribute <b style="color:#d8cfbf;">14</b> points. Each attribute 2–4; your key attribute may reach 5. <b>Remaining: ' + left + '</b></p>';
    h += '<div class="a-skills" style="grid-template-columns:1fr;">' + ATTRS.map(function (a) {
      var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || left <= 0);
    }).join('') + '</div>';
    return h;
  }
  function stepSkills() {
    var left = SKILL_BUDGET - skillSpent();
    var h = '<p class="m-hint">Distribute <b style="color:#d8cfbf;">10</b> points. Max 3 each; put at least 1 into your specialist skill <b>' + esc(specialist || '—') + '</b>. <b>Remaining: ' + left + '</b></p>';
    ATTRS.forEach(function (a) {
      var list = SK.filter(function (s) { return s.attr === a.key; });
      h += '<div class="a-attr">' + esc(a.name) + '</div><div class="a-skills">';
      h += list.map(function (s) {
        var v = skills[s.name], cap = skillCap(), spec = (specialist === s.name) ? ' ◆' : '';
        return stepper(s.name + spec, v, "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',1)", v <= 0, v >= cap || left <= 0);
      }).join('');
      h += '</div>';
    });
    if (specialist) {
      var sv = skills[specialist] || 0;
      h += '<div class="a-attr">Specialist — ' + esc(specialist) + '</div><div class="a-skills">'
        + stepper(specialist + ' ◆', sv, "window.YZEB.skill('" + specialist.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + specialist.replace(/'/g, "\\'") + "',1)", sv <= 0, sv >= 3 || left <= 0) + '</div>';
    }
    return h;
  }
  function stepTalentMut() {
    var r = roleObj(role);
    var h = '<div class="m-lbl">Starting talent <span class="yzeb-sub">(one of your role\'s three)</span></div>';
    h += '<div class="yzeb-list">' + ((r && r.talents) || []).map(function (t) {
      return prow(t, '', talentDesc(t), talentPick === t, "window.YZEB.pickTalent('" + t.replace(/'/g, "\\'") + "')", talentPick === t ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    h += '<div class="m-lbl" style="margin-top:14px;">Mutation <span class="yzeb-sub">(begin with one — random or chosen)</span> <button class="builder-chip" style="margin-left:6px;" onclick="window.YZEB.rollMut()">⚄ Random</button></div>';
    h += '<div class="yzeb-list" style="max-height:220px;">' + MUT.map(function (m) {
      return prow(m.name, 'D66 ' + m.roll, m.desc, mutPick === m.name, "window.YZEB.pickMut('" + m.name.replace(/'/g, "\\'") + "')", mutPick === m.name ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    return h;
  }
  function gearSources() {
    return {
      weap: MELEE.map(function (w) { return Object.assign({}, w, { _cc: true }); }).concat(RANGED.map(function (w) { return Object.assign({}, w, { _cc: false }); })),
      gear: GEARS,
      armor: ARMORS
    };
  }
  function wpItem(it) { return { kind: 'weapon', equipped: true, name: it.name, bonus: it.bonus != null ? it.bonus : 0, damage: it.damage != null ? it.damage : 1, range: it.range || '', weight: it.slots != null ? it.slots : '1', skill: it._cc === false ? 'Shoot' : 'Fight' }; }
  function arItem(it) { return { kind: 'armor', equipped: true, name: it.name, rating: (typeof it.rating === 'number' ? it.rating : 0), weight: '1', note: it.comment || '' }; }
  function grItem(it) { return { kind: 'gear', name: it.name, weight: '1', note: it.comment || '' }; }
  function stepGear() {
    var h = '<p class="m-hint">Add starting weapons, gear and armor — your role also grants grub, water and bullets (set those on the sheet). Tweak anything afterward.</p>';
    if (startGear.length) {
      h += '<div class="m-lbl">Chosen (' + startGear.length + ')</div><div class="yzeb-list">';
      h += startGear.map(function (g, i) {
        var meta = g.kind === 'weapon' ? ('bonus ' + g.bonus + ' · ' + g.damage + ' dmg') : g.kind === 'armor' ? ('Armor ' + g.rating) : '';
        return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(g.name) + (meta ? '<span class="brow-cost">' + esc(meta) + '</span>' : '') + '</div></div>'
          + '<button class="brow-add" style="background:#3a1a1a;color:#df8a8a;" onclick="window.YZEB.removeGear(' + i + ')">✕</button></div>';
      }).join('') + '</div>';
    }
    h += '<div class="yzeb-gtabs">'
      + '<button class="builder-chip' + (gearTab === 'weap' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'weap\')">Weapons</button>'
      + '<button class="builder-chip' + (gearTab === 'gear' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'gear\')">Gear</button>'
      + '<button class="builder-chip' + (gearTab === 'armor' ? ' sel' : '') + '" onclick="window.YZEB.setGearTab(\'armor\')">Armor</button></div>';
    var list = gearSources()[gearTab] || [];
    h += '<div class="yzeb-list" style="margin-top:6px;">' + list.map(function (it, idx) {
      var meta = gearTab === 'weap' ? ((it._cc === false ? 'Ranged' : 'Melee') + ' · bonus ' + it.bonus + ' · ' + it.damage + ' dmg') : gearTab === 'armor' ? ('Armor ' + it.rating) : '';
      return prow(it.name, meta, it.comment || '', false, "window.YZEB.addGear('" + gearTab + "'," + idx + ")", '＋ Add');
    }).join('') + '</div>';
    return h;
  }

  function renderSteps() {
    var el = $('yzeb-steps'); if (!el) return;
    el.innerHTML = STEPS.map(function (s, i) {
      return '<button class="yzeb-step' + (i === step ? ' on' : '') + (i < step ? ' done' : '') + '" onclick="window.YZEB.goStep(' + i + ')"><span class="yzeb-step-n">' + (i + 1) + '</span>' + esc(s) + '</button>';
    }).join('');
  }
  function ready() { return !!role && attrTotal() === ATTR_BUDGET && skillSpent() <= SKILL_BUDGET && num(skills[specialist]) >= 1; }
  function renderNav() {
    var el = $('yzeb-nav'); if (!el) return;
    var left = step > 0 ? '<button class="m-btn ghost" onclick="window.YZEB.back()">‹ Back</button>' : '<button class="m-btn ghost" onclick="window.YZEB.close()">Cancel</button>';
    var right = step < STEPS.length - 1
      ? '<button class="m-btn" onclick="window.YZEB.next()">Next ›</button>'
      : '<button class="m-btn" onclick="window.YZEB.apply()"' + (ready() ? '' : ' disabled') + '>Finish</button>';
    el.innerHTML = left + '<div style="flex:1;"></div>' + right;
  }
  function render() {
    var body = step === 0 ? stepRole() : step === 1 ? stepAttrs() : step === 2 ? stepSkills() : step === 3 ? stepTalentMut() : stepGear();
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
          if (S.role) { role = S.role; var r0 = roleObj(role); if (r0) { key = r0.key; specialist = r0.specialist; } }
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
    setRole: function (nm) {
      role = (role === nm) ? '' : nm; talentPick = '';
      var r = roleObj(role);
      if (r) { key = r.key; specialist = r.specialist; if (attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); }
      else { key = ''; specialist = ''; }
      render();
    },
    pickTalent: function (t) { talentPick = (talentPick === t) ? '' : t; render(); },
    pickMut: function (m) { mutPick = (mutPick === m) ? '' : m; render(); },
    rollMut: function () { if (MUT.length) { mutPick = MUT[Math.floor(Math.random() * MUT.length)].name; render(); } },
    setGearTab: function (t) { gearTab = t; render(); },
    addGear: function (kind, idx) {
      var it = (gearSources()[kind] || [])[idx]; if (!it) return;
      if (kind === 'weap') startGear.push(wpItem(it));
      else if (kind === 'armor') startGear.push(arItem(it));
      else startGear.push(grItem(it));
      render();
    },
    removeGear: function (i) { startGear.splice(i, 1); render(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap()) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, pronouns: pronouns, role: role, key: key, specialist: specialist, attrs: {}, skills: {}, trauma: { STR: 0, AGI: 0, WIT: 0, EMP: 0 } };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      SK.forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }];
      if (mutPick) { var mo = mutObj(mutPick); d.mutations = [{ name: mutPick, note: mo ? mo.desc : '', spend: 1 }]; d.mp = 1; }
      if (startGear.length) d.gear = startGear.map(function (g) { return g; });
      try { applySheet(d); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'MUTANT: YEAR ZERO · ' + (role || 'Mutant'), 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
