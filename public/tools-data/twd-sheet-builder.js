// THE WALKING DEAD character builder — single-panel point-buy creation.
// Pick an archetype (sets the key attribute), distribute 13 attribute points
// (2–5, key to 5 / others 4) and 12 skill points (key skill to 3, others 1),
// choose one talent, an Issue, a Drive, and your starting gear, then hand a
// finished character to applySheet(). Health is always 3. Uses sheet globals
// (aliased from TWD_* by the sheet's adapter): YZE_ATTRIBUTES, ALIEN_SKILLS,
// ALIEN_CAREERS (with .issues/.drives), ALIEN_TALENTS, ALIEN_WEAPONS,
// ALIEN_ARMOR, YZE_GEAR, $, esc, applySheet, autoDerive, num, saveSheet, addLog.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  var ATTRS = Array.isArray(W.YZE_ATTRIBUTES) ? W.YZE_ATTRIBUTES : [];
  var ASK = Array.isArray(W.ALIEN_SKILLS) ? W.ALIEN_SKILLS : [];
  var CAREERS = Array.isArray(W.ALIEN_CAREERS) ? W.ALIEN_CAREERS : [];
  var TALENTS = Array.isArray(W.ALIEN_TALENTS) ? W.ALIEN_TALENTS : [];
  var WP = Array.isArray(W.ALIEN_WEAPONS) ? W.ALIEN_WEAPONS : [];
  var AR = Array.isArray(W.ALIEN_ARMOR) ? W.ALIEN_ARMOR : [];
  var GR = Array.isArray(W.YZE_GEAR) ? W.YZE_GEAR : [];
  var ATTR_BUDGET = 13, SKILL_BUDGET = 12;

  var name = '', key = '', career = '', talentPick = '', issue = '', drive = '';
  var attrs = {}, skills = {}, gearSel = {};

  function curSkills() { return ASK; }
  function careerObj(nm) { for (var i = 0; i < CAREERS.length; i++) if (CAREERS[i].name === nm) return CAREERS[i]; return null; }
  function talentDesc(nm) { for (var i = 0; i < TALENTS.length; i++) if (TALENTS[i].name === nm) return TALENTS[i].desc; return ''; }
  function isCareerSkill(nm) { var c = careerObj(career); return !!(c && c.skills.indexOf(nm) >= 0); }
  function skillCap(nm) { return isCareerSkill(nm) ? 3 : 1; }

  function reset() {
    name = ''; key = ''; career = ''; talentPick = ''; issue = ''; drive = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; ASK.forEach(function (s) { skills[s.name] = 0; });
    gearSel = {};
  }
  function attrTotal() { var n = 0; ATTRS.forEach(function (a) { n += attrs[a.key]; }); return n; }
  function skillSpent() { var n = 0; curSkills().forEach(function (s) { n += skills[s.name]; }); return n; }
  function attrMax(k) { return key === k ? 5 : 4; }

  // ── starting gear ──
  function gid(kind, nm) { return kind + '|' + nm; }
  function wpItem(w) { return { kind: 'weapon', equipped: true, name: w.name, bonus: w.bonus || '', damage: w.damage != null ? w.damage : 1, range: w.range || 'Short', weight: w.weight || '1', skill: w.skill || 'Close Combat' }; }
  function arItem(a) { return { kind: 'armor', equipped: true, name: a.name, rating: num(a.rating != null ? a.rating : a.level), weight: a.weight || '1', note: a.note || a.comment || '' }; }
  function grItem(g) { return { kind: 'gear', name: g.name, weight: g.weight || '1', note: g.note || g.bonus || '' }; }
  function toggleGear(kind, nm) {
    var id = gid(kind, nm);
    if (gearSel[id]) { delete gearSel[id]; render(); return; }
    var it = null;
    if (kind === 'weapon') { for (var i = 0; i < WP.length; i++) if (WP[i].name === nm) { it = wpItem(WP[i]); break; } }
    else if (kind === 'armor') { for (var j = 0; j < AR.length; j++) if (AR[j].name === nm) { it = arItem(AR[j]); break; } }
    else { for (var k = 0; k < GR.length; k++) if (GR[k].name === nm) { it = grItem(GR[k]); break; } }
    if (it) { gearSel[id] = it; render(); }
  }
  function rollKit() {
    gearSel = {};
    if (WP.length) { var w = WP[Math.floor(Math.random() * WP.length)]; gearSel[gid('weapon', w.name)] = wpItem(w); }
    var picks = GR.slice();
    for (var n2 = 0; n2 < 2 && picks.length; n2++) { var idx = Math.floor(Math.random() * picks.length); var g = picks.splice(idx, 1)[0]; gearSel[gid('gear', g.name)] = grItem(g); }
    render();
  }

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
    h += '<p class="m-hint">THE WALKING DEAD: everyone has 3 Health. Pick an archetype (it sets your key attribute), spend <b style="color:#d8cfbf;">13</b> attribute points and <b style="color:#d8cfbf;">12</b> skill points (key skill to 3, others to 1), choose one talent, an Issue, a Drive, and your starting gear.</p>';

    h += '<div class="m-lbl" style="margin-top:10px;">Name</div><input class="m-input" id="yzeb-name" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)">';

    h += '<div class="m-lbl" style="margin-top:12px;">Archetype <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(sets your key attribute)</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
    h += CAREERS.map(function (c) { return chip(c.name, career === c.name, "window.YZEB.setCareer('" + c.name.replace(/'/g, "\\'") + "')", 'Key ' + c.key + ' · ' + c.skills.join(', ')); }).join('');
    h += '</div>';
    var cc = careerObj(career);
    if (cc) h += '<p class="m-hint" style="margin:6px 0 0;">Key <b style="color:#d8cfbf;">' + esc(cc.key) + '</b> · key skills: ' + esc(cc.skills.join(', ')) + '</p>';

    h += '<div class="m-lbl" style="margin-top:12px;">Attributes — <span style="color:' + (aLeft < 0 ? '#df6a6a' : '#d8cfbf') + ';">' + aLeft + ' left</span></div><div class="a-skills">';
    h += ATTRS.map(function (a) {
      var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || aLeft <= 0);
    }).join('');
    h += '</div>';

    h += '<div class="m-lbl" style="margin-top:12px;">Skills — <span style="color:' + (sLeft < 0 ? '#df6a6a' : '#d8cfbf') + ';">' + sLeft + ' left</span></div>';
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

    // Issue
    h += '<div class="m-lbl" style="margin-top:12px;">Issue <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(something that complicates you)</span></div>';
    if (c2 && c2.issues && c2.issues.length) h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">' + c2.issues.map(function (x) { return chip(x, issue === x, "window.YZEB.setIssue('" + x.replace(/'/g, "\\'") + "')", x); }).join('') + '</div>';
    h += '<input class="m-input" id="yzeb-issue" value="' + esc(issue) + '" placeholder="Choose a suggestion or write your own" oninput="window.YZEB.setIssueText(this.value)">';

    // Drive
    h += '<div class="m-lbl" style="margin-top:12px;">Drive <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(what keeps you going — once/session, +2)</span></div>';
    if (c2 && c2.drives && c2.drives.length) h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">' + c2.drives.map(function (x) { return chip(x, drive === x, "window.YZEB.setDrive('" + x.replace(/'/g, "\\'") + "')", x); }).join('') + '</div>';
    h += '<input class="m-input" id="yzeb-drive" value="' + esc(drive) + '" placeholder="Choose a suggestion or write your own" oninput="window.YZEB.setDriveText(this.value)">';

    // Starting gear
    var nSel = Object.keys(gearSel).length;
    h += '<div class="m-lbl" style="margin-top:12px;">Starting gear <span style="color:#8ba3a8;font-weight:600;text-transform:none;letter-spacing:0;">(' + nSel + ' selected)</span> <button class="builder-chip" style="margin-left:6px;" onclick="window.YZEB.rollKit()">⚄ Roll a kit</button></div>';
    if (WP.length) { h += '<div class="a-attr">Weapons</div><div style="display:flex;flex-wrap:wrap;gap:6px;max-height:120px;overflow:auto;padding:2px;">' + WP.map(function (w) { return chip(w.name, !!gearSel[gid('weapon', w.name)], "window.YZEB.toggleGear('weapon','" + w.name.replace(/'/g, "\\'") + "')", (w.damage != null ? 'Dmg ' + w.damage + ' · ' : '') + 'bonus ' + (w.bonus || 0)); }).join('') + '</div>'; }
    if (GR.length) { h += '<div class="a-attr">Gear</div><div style="display:flex;flex-wrap:wrap;gap:6px;max-height:120px;overflow:auto;padding:2px;">' + GR.map(function (g) { return chip(g.name, !!gearSel[gid('gear', g.name)], "window.YZEB.toggleGear('gear','" + g.name.replace(/'/g, "\\'") + "')", g.note || g.bonus || ''); }).join('') + '</div>'; }
    if (AR.length) { h += '<div class="a-attr">Armor</div><div style="display:flex;flex-wrap:wrap;gap:6px;">' + AR.map(function (a) { return chip(a.name, !!gearSel[gid('armor', a.name)], "window.YZEB.toggleGear('armor','" + a.name.replace(/'/g, "\\'") + "')", 'Armor ' + (a.rating != null ? a.rating : a.level)); }).join('') + '</div>'; }

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
          if (S.issue) issue = S.issue;
          if (S.drive) drive = S.drive;
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
    setIssue: function (x) { issue = (issue === x) ? '' : x; render(); },
    setIssueText: function (v) { issue = v; },
    setDrive: function (x) { drive = (drive === x) ? '' : x; render(); },
    setDriveText: function (v) { drive = v; },
    toggleGear: function (kind, nm) { toggleGear(kind, nm); },
    rollKit: function () { rollKit(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrTotal()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > skillCap(nm)) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, key: key, variant: 'alien', attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      curSkills().forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      d.career = career; if (talentPick) d.talents = [{ name: talentPick, note: talentDesc(talentPick) }];
      if (issue) d.issue = issue; if (drive) d.drive = drive;
      var gear = []; Object.keys(gearSel).forEach(function (id) { gear.push(gearSel[id]); }); if (gear.length) d.gear = gear;
      try { applySheet(d); } catch (e) {}
      try { autoDerive('health'); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'THE WALKING DEAD · ' + (career || 'Survivor') + ' · 3 Health', 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
