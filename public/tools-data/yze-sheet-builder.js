// ALIEN RPG character builder — a single-panel point-buy creation tool. Pick a
// career (sets the key attribute), distribute 14 attribute points (2–5, key to
// 5 / others 4) and 10 skill points (career skills to 3, others to 1), choose
// one talent, a personal agenda, a signature item, and your starting gear, then
// hand a finished character to applySheet(). Health = Strength; Stress replaces
// Resolve. Uses sheet globals: YZE_ATTRIBUTES, ALIEN_SKILLS, ALIEN_CAREERS (with
// .agendas/.signature/.gear), ALIEN_TALENTS, ALIEN_WEAPONS, ALIEN_ARMOR, $, esc,
// applySheet, autoDerive, num, saveSheet, addLog. (Variant is always 'alien'.)
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  var ATTRS = Array.isArray(W.YZE_ATTRIBUTES) ? W.YZE_ATTRIBUTES : [];
  var ASK = Array.isArray(W.ALIEN_SKILLS) ? W.ALIEN_SKILLS : [];
  var CAREERS = Array.isArray(W.ALIEN_CAREERS) ? W.ALIEN_CAREERS : [];
  var TALENTS = Array.isArray(W.ALIEN_TALENTS) ? W.ALIEN_TALENTS : [];
  var WP = Array.isArray(W.ALIEN_WEAPONS) ? W.ALIEN_WEAPONS : [];
  var AR = Array.isArray(W.ALIEN_ARMOR) ? W.ALIEN_ARMOR : [];
  var ATTR_BUDGET = 14, SKILL_BUDGET = 10;

  var name = '', key = '', career = '', talentPick = '', agenda = '', signature = '';
  var attrs = {}, skills = {}, gearGroups = [], gearChoice = {};

  function curSkills() { return ASK; }
  function careerObj(nm) { for (var i = 0; i < CAREERS.length; i++) if (CAREERS[i].name === nm) return CAREERS[i]; return null; }
  function talentDesc(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i].desc; return ''; }
  function isCareerSkill(nm) { var c = careerObj(career); return !!(c && c.skills.indexOf(nm) >= 0); }
  function skillCap(nm) { return isCareerSkill(nm) ? 3 : 1; }

  function reset() {
    name = ''; key = ''; career = ''; talentPick = ''; agenda = ''; signature = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; ASK.forEach(function (s) { skills[s.name] = 0; });
    gearGroups = []; gearChoice = {};
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; curSkills().forEach(function (s) { n += skills[s.name]; }); return n; }
  function attrMax(k) { return key === k ? 5 : 4; }

  // ── starting gear: parse the career gear string into "A or B; C; …" groups ──
  function parseGear(str) {
    if (!str) return [];
    return str.split(';').map(function (g) { return g.replace(/\.\s*$/, '').trim(); }).filter(Boolean).map(function (grp) {
      var cash = /\$|cash/i.test(grp);
      var opts = grp.split(/\s+or\s+/i).map(function (o) { return o.trim(); }).filter(Boolean);
      return { opts: opts, cash: cash, text: grp };
    });
  }
  function loadGear(c) {
    gearGroups = parseGear(c && c.gear); gearChoice = {};
    gearGroups.forEach(function (g, i) { if (!g.cash) gearChoice[i] = g.opts[0]; });
  }
  function wpItem(w) { return { kind: 'weapon', equipped: true, name: w.name, bonus: w.bonus || '', damage: w.damage != null ? w.damage : 1, range: w.range || 'Engaged', weight: w.weight || '1', skill: w.skill || (w.class && /ranged|rifle|pistol/i.test(w.class) ? 'Ranged Combat' : 'Close Combat') }; }
  function arItem(a) { return { kind: 'armor', equipped: true, name: a.name, rating: num(a.rating != null ? a.rating : a.level), weight: a.weight || '1', note: a.comment || a.note || '' }; }
  function itemFromOption(opt) {
    var low = opt.toLowerCase();
    for (var i = 0; i < WP.length; i++) { if (low.indexOf(WP[i].name.toLowerCase()) >= 0) return wpItem(WP[i]); }
    for (var j = 0; j < AR.length; j++) { if (low.indexOf(AR[j].name.toLowerCase()) >= 0) return arItem(AR[j]); }
    return { kind: 'gear', name: opt, weight: '1', note: '' };
  }
  function rollGear() { gearGroups.forEach(function (g, i) { if (!g.cash) gearChoice[i] = g.opts[Math.floor(Math.random() * g.opts.length)]; }); render(); }

  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'yzeb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.YZEB.close(); };
    ov.innerHTML =
      '<div class="modal wide"><div class="modal-hd"><div class="ttl">✦ Build a Character</div><button class="x" onclick="window.YZEB.close()">✕</button></div>'
      + '<div class="modal-bd" id="yzeb-body"></div></div>';
    document.body.appendChild(ov);
  }

  function stepper(label, val, minus, plus, minusDis, plusDis) {
    return '<div class="a-row"><span class="a-name2">' + esc(label) + '</span><span class="a-code">' + val + '</span>'
      + '<button onclick="' + minus + '"' + (minusDis ? ' disabled' : '') + '>−</button>'
      + '<button onclick="' + plus + '"' + (plusDis ? ' disabled' : '') + '>+</button></div>';
  }
  function chip(label, sel, onclick, title) {
    return '<button class="builder-chip' + (sel ? ' sel' : '') + '" title="' + esc(title || '') + '" onclick="' + onclick + '">' + esc(label) + '</button>';
  }

  function render() {
    ensure();
    var aLeft = ATTR_BUDGET - attrTotal(), sLeft = SKILL_BUDGET - skillSpent();
    var SK = curSkills();

    var h = '';
    h += '<p class="m-hint">ALIEN: Health = your Strength; Stress replaces Resolve. Pick a career (it sets your key attribute), spend <b style="color:#5fd6ea;">14</b> attribute points and <b style="color:#5fd6ea;">10</b> skill points (career skills to 3, others to 1), choose one talent, a personal agenda, a signature item, and your starting gear.</p>';

    h += '<div class="m-lbl" style="margin-top:10px;">Name</div><input class="m-input" id="yzeb-name" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)">';

    h += '<div class="m-lbl" style="margin-top:12px;">Career <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(sets your key attribute)</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
    h += CAREERS.map(function (c) { return chip(c.name, career === c.name, "window.YZEB.setCareer('" + c.name.replace(/'/g, "\\'") + "')", 'Key ' + c.key + ' · ' + c.skills.join(', ')); }).join('');
    h += '</div>';
    var cc = careerObj(career);
    if (cc) h += '<p class="m-hint" style="margin:6px 0 0;">Key <b style="color:#5fd6ea;">' + esc(cc.key) + '</b> · key skills: ' + esc(cc.skills.join(', ')) + '</p>';

    h += '<div class="m-lbl" style="margin-top:12px;">Attributes — <span style="color:' + (aLeft < 0 ? '#df6a6a' : '#5fd6ea') + ';">' + aLeft + ' left</span></div><div class="a-skills">';
    h += ATTRS.map(function (a) {
      var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || aLeft <= 0);
    }).join('');
    h += '</div>';

    h += '<div class="m-lbl" style="margin-top:12px;">Skills — <span style="color:' + (sLeft < 0 ? '#df6a6a' : '#5fd6ea') + ';">' + sLeft + ' left</span></div>';
    ATTRS.forEach(function (a) {
      h += '<div class="a-attr">' + esc(a.name) + '</div><div class="a-skills">';
      h += SK.filter(function (s) { return s.attr === a.key; }).map(function (s) {
        var v = skills[s.name], cap = skillCap(s.name), star = isCareerSkill(s.name) ? ' ★' : '';
        return stepper(s.name + star, v, "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',1)", v <= 0, v >= cap || sLeft <= 0);
      }).join('');
      h += '</div>';
    });

    var c2 = careerObj(career);
    h += '<div class="m-lbl" style="margin-top:12px;">Starting talent</div>';
    if (c2) {
      h += '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + c2.talents.map(function (t) { return chip(t, talentPick === t, "window.YZEB.setTalent('" + t.replace(/'/g, "\\'") + "')", talentDesc(t)); }).join('') + '</div>';
      if (talentPick) h += '<p class="m-hint" style="margin:6px 0 0;">' + esc(talentDesc(talentPick)) + '</p>';
    } else {
      h += '<p class="m-hint" style="margin:0;">Pick a career first.</p>';
    }

    // Personal agenda
    h += '<div class="m-lbl" style="margin-top:12px;">Personal agenda <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(your secret goal)</span></div>';
    if (c2 && c2.agendas && c2.agendas.length) h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">' + c2.agendas.map(function (x) { return chip(x.length > 40 ? x.slice(0, 40) + '…' : x, agenda === x, "window.YZEB.setAgenda('" + x.replace(/'/g, "\\'") + "')", x); }).join('') + '</div>';
    h += '<input class="m-input" id="yzeb-agenda" value="' + esc(agenda) + '" placeholder="Choose a suggestion or write your own" oninput="window.YZEB.setAgendaText(this.value)">';

    // Signature item
    h += '<div class="m-lbl" style="margin-top:12px;">Signature item</div>';
    if (c2 && c2.signature && c2.signature.length) h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">' + c2.signature.map(function (x) { return chip(x, signature === x, "window.YZEB.setSig('" + x.replace(/'/g, "\\'") + "')", x); }).join('') + '</div>';
    h += '<input class="m-input" id="yzeb-sig" value="' + esc(signature) + '" placeholder="Choose a suggestion or write your own" oninput="window.YZEB.setSigText(this.value)">';

    // Starting gear (one choice per "or" group)
    h += '<div class="m-lbl" style="margin-top:12px;">Starting gear <button class="builder-chip" style="margin-left:6px;" onclick="window.YZEB.rollGear()">⚄ Roll</button></div>';
    if (gearGroups.length) {
      gearGroups.forEach(function (g, i) {
        if (g.cash) { h += '<p class="m-hint" style="margin:2px 0;">+ ' + esc(g.text) + '</p>'; return; }
        if (g.opts.length === 1) { h += '<p class="m-hint" style="margin:2px 0;">• ' + esc(g.opts[0]) + '</p>'; return; }
        h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin:2px 0;">' + g.opts.map(function (o) { return chip(o, gearChoice[i] === o, "window.YZEB.pickGear(" + i + ",'" + o.replace(/'/g, "\\'") + "')", o); }).join('') + '</div>';
      });
    } else {
      h += '<p class="m-hint" style="margin:0;">Pick a career to see its starting gear.</p>';
    }

    var ready = aLeft === 0 && sLeft >= 0 && !!career;
    h += '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:8px;">'
      + '<span class="m-hint" style="margin:0;">' + (aLeft === 0 ? 'Attributes set' : aLeft + ' attribute points left') + ' · ' + sLeft + ' skill points left' + (!career ? ' · pick a career' : '') + '</span>'
      + '<span style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="window.YZEB.close()">Cancel</button>'
      + '<button class="m-btn" onclick="window.YZEB.apply()"' + (ready ? '' : ' disabled') + '>Apply</button></span></div>';

    $('yzeb-body').innerHTML = h;
  }

  window.YZEB = {
    launch: function () {
      try {
        if (typeof S !== 'undefined' && S) {
          reset();
          if (S.name) name = S.name;
          if (S.key) key = S.key;
          if (S.career) { career = S.career; loadGear(careerObj(career)); }
          if (S.agenda) agenda = S.agenda;
          if (S.signature) signature = S.signature;
          ATTRS.forEach(function (a) { if (S.attrs && S.attrs[a.key] != null) attrs[a.key] = Math.max(2, num(S.attrs[a.key])); });
          ASK.forEach(function (s) { if (S.skills && S.skills[s.name] != null) skills[s.name] = num(S.skills[s.name]); });
        } else reset();
      } catch (e) { reset(); }
      ensure(); render(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    setName: function (v) { name = v; },
    setCareer: function (nm) {
      career = (career === nm) ? '' : nm; talentPick = '';
      var c = careerObj(career);
      if (c) { key = c.key; if (attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); loadGear(c); }
      else { gearGroups = []; gearChoice = {}; }
      render();
    },
    setTalent: function (t) { talentPick = (talentPick === t) ? '' : t; render(); },
    setAgenda: function (x) { agenda = (agenda === x) ? '' : x; render(); },
    setAgendaText: function (v) { agenda = v; },
    setSig: function (x) { signature = (signature === x) ? '' : x; render(); },
    setSigText: function (v) { signature = v; },
    pickGear: function (i, o) { gearChoice[i] = (gearChoice[i] === o) ? '' : o; render(); },
    rollGear: function () { rollGear(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap(nm)) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, key: key, variant: 'alien', attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      curSkills().forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      d.career = career; if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }];
      if (agenda) d.agenda = agenda; if (signature) d.signature = signature;
      var gear = [];
      gearGroups.forEach(function (g, i) { if (g.cash) return; var opt = gearChoice[i]; if (opt) gear.push(itemFromOption(opt)); });
      if (gear.length) d.gear = gear;
      try { applySheet(d); } catch (e) {}
      try { autoDerive('health'); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'ALIEN RPG · ' + (career || 'crew') + ' · Health = Strength', 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
