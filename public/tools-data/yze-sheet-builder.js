// Year Zero Engine character builder — a single-panel point-buy creation tool
// that also picks the game variant (YZE SRD or ALIEN). Distribute 14 points
// across the four attributes (2–5, key to 5 / others 4) and 10 across the twelve
// skills, then hand a finished character to applySheet(). In Alien mode you also
// pick a career (which sets the key attribute) and one starting talent; career
// skills cap at 3, non-career skills at 1. Uses sheet globals: YZE_ATTRIBUTES,
// YZE_SKILLS, ALIEN_SKILLS, ALIEN_CAREERS, ALIEN_TALENTS, $, esc, applySheet,
// autoDerive, num, setVariant, saveSheet, addLog.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  var ATTRS = Array.isArray(W.YZE_ATTRIBUTES) ? W.YZE_ATTRIBUTES : [];
  var YSK = Array.isArray(W.YZE_SKILLS) ? W.YZE_SKILLS : [];
  var ASK = Array.isArray(W.ALIEN_SKILLS) ? W.ALIEN_SKILLS : [];
  var CAREERS = Array.isArray(W.ALIEN_CAREERS) ? W.ALIEN_CAREERS : [];
  var TALENTS = Array.isArray(W.ALIEN_TALENTS) ? W.ALIEN_TALENTS : [];
  var ATTR_BUDGET = 14, SKILL_BUDGET = 10;

  var variant = 'yze', name = '', key = '', career = '', talentPick = '';
  var attrs = {}, skills = {};

  function curSkills() { return variant === 'alien' ? ASK : YSK; }
  function careerObj(nm) { for (var i = 0; i < CAREERS.length; i++) if (CAREERS[i].name === nm) return CAREERS[i]; return null; }
  function talentDesc(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i].desc; return ''; }
  function isCareerSkill(nm) { var c = careerObj(career); return !!(c && c.skills.indexOf(nm) >= 0); }
  function skillCap(nm) { return (variant === 'alien' && !isCareerSkill(nm)) ? 1 : 3; }

  function reset() {
    name = ''; key = ''; career = ''; talentPick = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; YSK.concat(ASK).forEach(function (s) { skills[s.name] = 0; });
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
    var alien = variant === 'alien';
    var aLeft = ATTR_BUDGET - attrTotal(), sLeft = SKILL_BUDGET - skillSpent();
    var SK = curSkills();

    var h = '';
    // Variant picker
    h += '<div class="m-lbl">Game</div><div style="display:flex;flex-wrap:wrap;gap:6px;">'
      + chip('Year Zero (SRD)', !alien, "window.YZEB.setVariant('yze')", 'Generic YZE dice-pool core')
      + chip('ALIEN', alien, "window.YZEB.setVariant('alien')", 'ALIEN RPG: Stress & Panic, careers, talents') + '</div>';

    h += (alien
      ? '<p class="m-hint" style="margin-top:10px;">ALIEN: Health = your Strength; Stress replaces Resolve. Pick a career (it sets your key attribute), spend <b style="color:#5fd6ea;">14</b> attribute points and <b style="color:#5fd6ea;">10</b> skill points (career skills to 3, others to 1), and choose one career talent.</p>'
      : '<p class="m-hint" style="margin-top:10px;">Spend <b style="color:#5fd6ea;">14 points total</b> across the four attributes (each starts at 2; key to 5, others to 4) and <b style="color:#5fd6ea;">10 points</b> across the twelve skills (cap 3).</p>');

    h += '<div class="m-lbl" style="margin-top:10px;">Name</div><input class="m-input" id="yzeb-name" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)">';

    if (alien) {
      h += '<div class="m-lbl" style="margin-top:12px;">Career <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(sets your key attribute)</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
      h += CAREERS.map(function (c) { return chip(c.name, career === c.name, "window.YZEB.setCareer('" + c.name.replace(/'/g, "\\'") + "')", 'Key ' + c.key + ' · ' + c.skills.join(', ')); }).join('');
      h += '</div>';
      var cc = careerObj(career);
      if (cc) h += '<p class="m-hint" style="margin:6px 0 0;">Key <b style="color:#5fd6ea;">' + esc(cc.key) + '</b> · career skills: ' + esc(cc.skills.join(', ')) + '</p>';
    } else {
      h += '<div class="m-lbl" style="margin-top:12px;">Key attribute <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(may reach 5)</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
      h += ATTRS.map(function (a) { return chip(a.name, key === a.key, "window.YZEB.setKey('" + a.key + "')"); }).join('');
      h += '</div>';
    }

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
        var v = skills[s.name], cap = skillCap(s.name), star = (alien && isCareerSkill(s.name)) ? ' ★' : '';
        return stepper(s.name + star, v, "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',1)", v <= 0, v >= cap || sLeft <= 0);
      }).join('');
      h += '</div>';
    });

    if (alien) {
      var c2 = careerObj(career);
      h += '<div class="m-lbl" style="margin-top:12px;">Starting talent</div>';
      if (c2) {
        h += '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + c2.talents.map(function (t) { return chip(t, talentPick === t, "window.YZEB.setTalent('" + t.replace(/'/g, "\\'") + "')", talentDesc(t)); }).join('') + '</div>';
        if (talentPick) h += '<p class="m-hint" style="margin:6px 0 0;">' + esc(talentDesc(talentPick)) + '</p>';
      } else {
        h += '<p class="m-hint" style="margin:0;">Pick a career first.</p>';
      }
    }

    var ready = aLeft === 0 && sLeft >= 0 && (!alien || !!career);
    h += '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:8px;">'
      + '<span class="m-hint" style="margin:0;">' + (aLeft === 0 ? 'Attributes set' : aLeft + ' attribute points left') + ' · ' + sLeft + ' skill points left' + (alien && !career ? ' · pick a career' : '') + '</span>'
      + '<span style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="window.YZEB.close()">Cancel</button>'
      + '<button class="m-btn" onclick="window.YZEB.apply()"' + (ready ? '' : ' disabled') + '>Apply</button></span></div>';

    $('yzeb-body').innerHTML = h;
  }

  window.YZEB = {
    launch: function () {
      try {
        if (typeof S !== 'undefined' && S) {
          reset();
          variant = (S.variant === 'alien') ? 'alien' : 'yze';
          if (S.name) name = S.name;
          if (S.key) key = S.key;
          if (S.career) career = S.career;
          ATTRS.forEach(function (a) { if (S.attrs && S.attrs[a.key] != null) attrs[a.key] = Math.max(2, num(S.attrs[a.key])); });
          YSK.concat(ASK).forEach(function (s) { if (S.skills && S.skills[s.name] != null) skills[s.name] = num(S.skills[s.name]); });
        } else reset();
      } catch (e) { reset(); }
      ensure(); render(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    setName: function (v) { name = v; },
    setVariant: function (v) { variant = (v === 'alien') ? 'alien' : 'yze'; if (variant !== 'alien') { career = ''; talentPick = ''; } render(); },
    setKey: function (k) { key = (key === k) ? '' : k; if (key && attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); render(); },
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
      var alien = variant === 'alien';
      var d = { name: name, key: key, variant: variant, attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      curSkills().forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      if (alien) { d.career = career; if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }]; }
      try { applySheet(d); } catch (e) {}
      try { autoDerive('health'); if (!alien) autoDerive('resolve'); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', alien ? ('ALIEN · ' + (career || 'crew') + ' · Health = Strength') : 'Attributes & skills set · Health/Resolve derived', 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
