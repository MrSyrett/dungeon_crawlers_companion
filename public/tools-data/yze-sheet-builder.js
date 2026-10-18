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
  var agenda = '', signature = '', buddy = '', rival = '', cash = '';
  var android = false, androidBonus = [];   // Synthetic: up to 2 attribute keys that gain +3
  var attrs = {}, skills = {}, startGear = [], gearTab = 'weap';

  function careerObj(nm) { for (var i = 0; i < CAREERS.length; i++) if (CAREERS[i].name === nm) return CAREERS[i]; return null; }
  function talentObj(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i]; return null; }
  function talentDesc(nm) { var t = talentObj(nm); return t ? t.desc : ''; }
  function isCareerSkill(nm) { var c = careerObj(career); return !!(c && c.skills.indexOf(nm) >= 0); }
  function skillCap(nm) { return isCareerSkill(nm) ? 3 : 1; }

  function reset() {
    step = 0; name = ''; pronouns = ''; key = ''; career = ''; talentPick = '';
    agenda = ''; signature = ''; buddy = ''; rival = ''; cash = ''; android = false; androidBonus = [];
    startGear = []; gearTab = 'weap';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; ASK.forEach(function (s) { skills[s.name] = 0; });
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; ASK.forEach(function (s) { n += skills[s.name]; }); return n; }
  function attrMax(k) { return key === k ? 5 : 4; }
  function attrEff(k) { return attrs[k] + (androidBonus.indexOf(k) >= 0 ? 3 : 0); }

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
    h += '<div class="m-lbl" style="margin-top:14px;">Character type</div>';
    h += '<div class="yzeb-gtabs">'
      + '<button class="builder-chip' + (!android ? ' sel' : '') + '" onclick="window.YZEB.setAndroid(false)">Human</button>'
      + '<button class="builder-chip' + (android ? ' sel' : '') + '" onclick="window.YZEB.setAndroid(true)">Synthetic</button></div>';
    if (android) h += '<p class="m-hint" style="margin-top:4px;">Synthetics add +3 to two attributes (next step), can’t push, and have no Stress or Panic.</p>';
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
      var v = attrs[a.key], bonus = androidBonus.indexOf(a.key) >= 0;
      var label = a.name + (key === a.key ? ' ★' : '') + (bonus ? ' +3 → ' + attrEff(a.key) : '');
      return stepper(label, v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || aLeft <= 0);
    }).join('') + '</div>';
    if (android) {
      h += '<p class="m-hint" style="margin-top:10px;">Synthetic bonus: choose <b style="color:#5fd6ea;">two</b> attributes to gain <b>+3</b> (beyond the normal caps). <b>Chosen: ' + androidBonus.length + '/2</b></p>';
      h += '<div class="yzeb-gtabs">' + ATTRS.map(function (a) {
        var on = androidBonus.indexOf(a.key) >= 0;
        return '<button class="builder-chip' + (on ? ' sel' : '') + '" onclick="window.YZEB.androidPlus(\'' + a.key + '\')">' + esc(a.name) + (on ? ' +3' : '') + '</button>';
      }).join('') + '</div>';
    }
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
    // Every PC — synthetics included — picks a signature item (core p.28, creation step 9).
    h += '<div class="m-lbl" style="margin-top:14px;">Signature item</div>';
    h += '<div class="yzeb-list">' + (c.signature || []).map(function (s, idx) {
      return prow(s, '', '', signature === s, "window.YZEB.pickSig(" + idx + ")", signature === s ? '✓ Chosen' : 'Choose');
    }).join('') + '</div>';
    h += '<div class="yzeb-2col" style="margin-top:14px;">';
    h += '<div><div class="m-lbl">Buddy</div><input class="m-input" value="' + esc(buddy) + '" placeholder="A crewmate you trust" oninput="window.YZEB.setBuddy(this.value)"></div>';
    h += '<div><div class="m-lbl">Rival</div><input class="m-input" value="' + esc(rival) + '" placeholder="A crewmate you clash with" oninput="window.YZEB.setRival(this.value)"></div>';
    h += '</div>';
    h += '<div class="m-lbl" style="margin-top:14px;">Starting cash <span class="yzeb-sub">(' + esc(cashFormula()) + ' — roll it or take the average)</span></div>';
    h += '<div class="yzeb-gtabs" style="align-items:center;flex-wrap:wrap;">'
      + '<button class="builder-chip" onclick="window.YZEB.rollCash()">🎲 Roll</button>'
      + '<button class="builder-chip" onclick="window.YZEB.avgCash()">Average</button>'
      + '<input class="m-input" style="max-width:130px;" value="' + esc(cash) + '" placeholder="$" oninput="window.YZEB.setCash(this.value)"></div>';
    return h;
  }

  // Career starting-cash formula → parsed {n dice, mult}.
  function cashFormula() { var c = careerObj(career); return (c && c.cashRoll) || 'D6x100'; }
  function cashParse(f) { var m = String(f || 'D6x100').replace(/,/g, '').match(/^(\d*)D6(?:[x×](\d+))?$/i); return { n: (m && m[1]) ? parseInt(m[1], 10) : 1, mult: (m && m[2]) ? parseInt(m[2], 10) : 1 }; }

  // Resolve a career starting-gear option name to its compendium entry.
  function normName(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function resolveItem(name) {
    var n = normName(name).replace(/^\d+\s+/, '').replace(/^d6\s+(doses|flares)\s*/, '').replace(/^d6\s+/, '');
    function find(list) {
      var i, ln, partial = null;
      for (i = 0; i < list.length; i++) { if (normName(list[i].name) === n) return list[i]; }
      for (i = 0; i < list.length; i++) { ln = normName(list[i].name); if (ln.indexOf(n) >= 0 || n.indexOf(ln) >= 0) { if (!partial) partial = list[i]; } }
      return partial;
    }
    var w = find(arr(W.ALIEN_WEAPONS)); if (w) return { kind: 'weapon', it: w };
    var a = find(arr(W.ALIEN_ARMOR)); if (a) return { kind: 'armor', it: a };
    var g = find(arr(W.ALIEN_GEAR)); if (g) return { kind: 'gear', it: g };
    return null;
  }
  function stepGear() {
    var c = careerObj(career);
    if (!c) return '<p class="m-hint">Go back and pick a career first — starting gear comes from it.</p>';
    var opts = arr(c.startGear);
    var h = '<p class="m-hint">Choose <b style="color:#5fd6ea;">two</b> items from your career’s starting gear. You can buy more from the Item Store on the sheet afterward. <b>Chosen: ' + startGear.length + '/2</b></p>';
    if (!opts.length) { h += '<p class="m-hint">This career has no listed starting gear — add items from the Item Store once you finish.</p>'; return h; }
    h += '<div class="yzeb-list">' + opts.map(function (name, idx) {
      var chosen = startGear.some(function (g) { return g.optName === name; });
      var r = resolveItem(name), meta = 'Gear', desc = '';
      if (r && r.kind === 'weapon') { meta = 'Weapon · ' + (r.it.damage != null ? r.it.damage + ' dmg' : '') + (r.it.range ? ' · ' + r.it.range : ''); desc = (r.it.class ? r.it.class + ' · ' : '') + 'bonus ' + (r.it.bonus || '0') + (r.it.special ? ' · ' + r.it.special : ''); }
      else if (r && r.kind === 'armor') { meta = 'Armor ' + (r.it.rating != null ? r.it.rating : ''); desc = ((r.it.air && r.it.air !== '—') ? 'Air ' + r.it.air + ' · ' : '') + (r.it.comment || ''); }
      else if (r && r.kind === 'gear') { meta = (r.it.weight != null && r.it.weight !== '' ? r.it.weight + ' wt' : '') + (r.it.cost ? ' · ' + r.it.cost : ''); desc = r.it.effect || r.it.note || ''; }
      var full = (!chosen && startGear.length >= 2);
      return prow(name, meta, desc, chosen, "window.YZEB.toggleStartGear(" + idx + ")", chosen ? '✓ Chosen' : (full ? 'Full' : '＋ Add'));
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
    var ready = aLeft === 0 && sLeft >= 0 && !!career && !!talentPick && (!android || androidBonus.length === 2) && !!signature;
    var msg = '';
    if (step === 1) msg = (aLeft !== 0 ? aLeft + ' attribute points left' : (android && androidBonus.length < 2 ? 'Choose ' + (2 - androidBonus.length) + ' synthetic bonus attribute' + (2 - androidBonus.length === 1 ? '' : 's') : 'Attributes set'));
    else if (step === 2) msg = (sLeft === 0 ? 'Skills set' : sLeft + ' skill points left');
    else if (step === 0 && !career) msg = 'Pick a career';
    else if (step === 3) msg = (!talentPick ? 'Pick a starting talent' : (!signature ? 'Pick a signature item' : ''));
    else if (step === 4) msg = startGear.length + ' of 2 gear chosen';
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
          if (S.android) android = !!S.android;
          if (S.buddy) buddy = S.buddy; if (S.rival) rival = S.rival; if (S.cash != null) cash = S.cash;
          // Clamp to the base cap so an edited Synthetic drops its baked-in +3 (re-picked below).
          ATTRS.forEach(function (a) { if (S.attrs && S.attrs[a.key] != null) attrs[a.key] = Math.min(attrMax(a.key), Math.max(2, num(S.attrs[a.key]))); });
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
    setAndroid: function (v) { android = !!v; if (!android) { androidBonus = []; } render(); },
    androidPlus: function (k) { if (!android) return; var i = androidBonus.indexOf(k); if (i >= 0) androidBonus.splice(i, 1); else { if (androidBonus.length >= 2) return; androidBonus.push(k); } render(); },
    setBuddy: function (v) { buddy = v; },
    setRival: function (v) { rival = v; },
    setCash: function (v) { cash = v; },
    rollCash: function () { var p = cashParse(cashFormula()), n = p.n, sum = 0; for (var i = 0; i < n; i++) sum += 1 + Math.floor(Math.random() * 6); cash = String(sum * p.mult); render(); },
    avgCash: function () { var p = cashParse(cashFormula()); cash = String(Math.round(p.n * 3.5 * p.mult)); render(); },
    setCareer: function (nm) {
      career = (career === nm) ? '' : nm; talentPick = ''; agenda = ''; signature = '';
      var c = careerObj(career);
      if (c) { key = c.key; if (attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); }
      render();
    },
    pickTalent: function (t) { talentPick = (talentPick === t) ? '' : t; render(); },
    pickAgenda: function (idx) { var c = careerObj(career); if (c && c.agendas && c.agendas[idx] != null) { agenda = (agenda === c.agendas[idx]) ? '' : c.agendas[idx]; render(); } },
    pickSig: function (idx) { var c = careerObj(career); if (c && c.signature && c.signature[idx] != null) { signature = (signature === c.signature[idx]) ? '' : c.signature[idx]; render(); } },
    // Toggle a career starting-gear option (max 2), resolving it to its compendium stats.
    toggleStartGear: function (idx) {
      var c = careerObj(career); if (!c) return;
      var name = arr(c.startGear)[idx]; if (name == null) return;
      var at = -1; for (var i = 0; i < startGear.length; i++) { if (startGear[i].optName === name) { at = i; break; } }
      if (at >= 0) { startGear.splice(at, 1); render(); return; }
      if (startGear.length >= 2) return;
      var r = resolveItem(name), obj;
      if (r && r.kind === 'weapon') { var w = r.it; obj = { kind: 'weapon', optName: name, name: w.name, bonus: w.bonus || '', damage: w.damage != null ? num(w.damage) : 1, range: w.range || '', ammo: w.ammo || '—', weight: w.weight || '1', skill: w.skill || 'Ranged Combat', equipped: false }; }
      else if (r && r.kind === 'armor') { var a = r.it; obj = { kind: 'armor', optName: name, name: a.name, rating: num(a.rating), air: a.air || '', weight: a.weight || '1', note: a.comment || a.note || '', equipped: false }; }
      else if (r && r.kind === 'gear') { var g = r.it; obj = { kind: 'gear', optName: name, name: g.name, weight: g.weight || '1', note: g.effect || g.note || '' }; }
      // "D6 doses Naproleve": roll the doses now; the count rides on the name ("Naproleve ×4"), which the sheet's Action tab uses up one at a time.
      if (obj && obj.kind === 'gear' && /^d6\s+(doses|flares)\b/i.test(name)) { var dq = 1 + Math.floor(Math.random() * 6); obj.name = obj.name + (dq > 1 ? ' ×' + dq : ''); }
      else { obj = { kind: 'gear', optName: name, name: name, weight: '1', note: '' }; }
      startGear.push(obj); render();
    },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap(nm)) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, pronouns: pronouns, key: key, variant: 'alien', career: career, attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key] + (androidBonus.indexOf(a.key) >= 0 ? 3 : 0); });
      ASK.forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      d.android = android; d.buddy = buddy; d.rival = rival; d.cash = cash;
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
