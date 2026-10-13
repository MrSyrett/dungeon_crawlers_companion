// THE WALKING DEAD character builder — a single-panel point-buy creation tool.
// Pick an archetype (which sets the key attribute), distribute 14 points across
// the four attributes (2–5, key to 5 / others 4) and 10 across the twelve skills
// (key-skill cap 3, others 1), and choose one starting talent, then hand a
// finished character to applySheet(). Health is always 3. Uses sheet globals
// (aliased from TWD_* by the sheet's adapter): YZE_ATTRIBUTES, ALIEN_SKILLS,
// ALIEN_CAREERS, ALIEN_TALENTS, $, esc, applySheet, autoDerive, num, saveSheet, addLog.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  var ATTRS = Array.isArray(W.YZE_ATTRIBUTES) ? W.YZE_ATTRIBUTES : [];
  var ASK = Array.isArray(W.ALIEN_SKILLS) ? W.ALIEN_SKILLS : [];
  var CAREERS = Array.isArray(W.ALIEN_CAREERS) ? W.ALIEN_CAREERS : [];
  var TALENTS = Array.isArray(W.ALIEN_TALENTS) ? W.ALIEN_TALENTS : [];
  var ATTR_BUDGET = 14, SKILL_BUDGET = 10;

  var name = '', key = '', career = '', talentPick = '';
  var attrs = {}, skills = {};

  function curSkills() { return ASK; }
  function careerObj(nm) { for (var i = 0; i < CAREERS.length; i++) if (CAREERS[i].name === nm) return CAREERS[i]; return null; }
  function talentDesc(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i].desc; return ''; }
  function isCareerSkill(nm) { var c = careerObj(career); return !!(c && c.skills.indexOf(nm) >= 0); }
  function skillCap(nm) { return isCareerSkill(nm) ? 3 : 1; }

  function reset() {
    name = ''; key = ''; career = ''; talentPick = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; ASK.forEach(function (s) { skills[s.name] = 0; });
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; curSkills().forEach(function (s) { n += skills[s.name]; }); return n; }
  function attrMax(k) { return key === k ? 5 : 4; }

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
    h += '<p class="m-hint">THE WALKING DEAD: everyone has 3 Health. Pick an archetype (it sets your key attribute), spend <b style="color:#e2564e;">14</b> attribute points and <b style="color:#e2564e;">10</b> skill points (key skill to 3, others to 1), and choose one starting talent.</p>';

    h += '<div class="m-lbl" style="margin-top:10px;">Name</div><input class="m-input" id="yzeb-name" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)">';

    h += '<div class="m-lbl" style="margin-top:12px;">Archetype <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(sets your key attribute)</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
    h += CAREERS.map(function (c) { return chip(c.name, career === c.name, "window.YZEB.setCareer('" + c.name.replace(/'/g, "\\'") + "')", 'Key ' + c.key + ' · ' + c.skills.join(', ')); }).join('');
    h += '</div>';
    var cc = careerObj(career);
    if (cc) h += '<p class="m-hint" style="margin:6px 0 0;">Key <b style="color:#e2564e;">' + esc(cc.key) + '</b> · key skills: ' + esc(cc.skills.join(', ')) + '</p>';

    h += '<div class="m-lbl" style="margin-top:12px;">Attributes — <span style="color:' + (aLeft < 0 ? '#df6a6a' : '#e2564e') + ';">' + aLeft + ' left</span></div><div class="a-skills">';
    h += ATTRS.map(function (a) {
      var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || aLeft <= 0);
    }).join('');
    h += '</div>';

    h += '<div class="m-lbl" style="margin-top:12px;">Skills — <span style="color:' + (sLeft < 0 ? '#df6a6a' : '#e2564e') + ';">' + sLeft + ' left</span></div>';
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
      h += '<p class="m-hint" style="margin:0;">Pick an archetype first.</p>';
    }

    var ready = aLeft === 0 && sLeft >= 0 && !!career;
    h += '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:8px;">'
      + '<span class="m-hint" style="margin:0;">' + (aLeft === 0 ? 'Attributes set' : aLeft + ' attribute points left') + ' · ' + sLeft + ' skill points left' + (!career ? ' · pick an archetype' : '') + '</span>'
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
          if (S.career) career = S.career;
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
      if (c) { key = c.key; if (attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); }
      render();
    },
    setTalent: function (t) { talentPick = (talentPick === t) ? '' : t; render(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap(nm)) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, key: key, variant: 'alien', attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      curSkills().forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      d.career = career; if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }];
      try { applySheet(d); } catch (e) {}
      try { autoDerive('health'); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'THE WALKING DEAD · ' + (career || 'Survivor') + ' · 3 Health', 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
