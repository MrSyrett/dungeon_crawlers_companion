// Year Zero Engine character builder — a single-panel point-buy creation tool.
// SRD dice-pool creation: distribute 14 points across the four attributes (2–5,
// key attribute may reach 5, others cap at 4); distribute 10 points across the
// twelve skills (starting skills cap at level 3). Then hands a finished
// character to applySheet(). Uses the sheet globals: YZE_ATTRIBUTES, YZE_SKILLS,
// $, esc, applySheet, autoDerive, num.
(function () {
  'use strict';
  var ATTRS = (typeof window !== 'undefined' && Array.isArray(window.YZE_ATTRIBUTES)) ? window.YZE_ATTRIBUTES : [];
  var SKILLS = (typeof window !== 'undefined' && Array.isArray(window.YZE_SKILLS)) ? window.YZE_SKILLS : [];
  var ATTR_BUDGET = 14, SKILL_BUDGET = 10, SKILL_CAP = 3;

  var name = '', key = '';
  var attrs = {}, skills = {};

  function reset() {
    name = ''; key = '';
    attrs = {}; ATTRS.forEach(function (a) { attrs[a.key] = 2; });
    skills = {}; SKILLS.forEach(function (s) { skills[s.name] = 0; });
  }
  function attrSpent() { var n = 0; ATTRS.forEach(function (a) { n += (attrs[a.key] - 2); }); return n; }
  function skillSpent() { var n = 0; SKILLS.forEach(function (s) { n += skills[s.name]; }); return n; }
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

  function render() {
    ensure();
    var aLeft = ATTR_BUDGET - attrSpent(), sLeft = SKILL_BUDGET - skillSpent();
    var h = '<p class="m-hint">Distribute <b style="color:#e6b45f;">14 points</b> across the four attributes (each 2–5; your key attribute may reach 5, the others cap at 4) and <b style="color:#e6b45f;">10 points</b> across the twelve skills (starting skills cap at 3).</p>';

    h += '<div class="m-lbl">Name</div><input class="m-input" id="yzeb-name" value="' + esc(name) + '" placeholder="Character name" oninput="window.YZEB.setName(this.value)">';

    h += '<div class="m-lbl" style="margin-top:12px;">Key attribute <span style="color:#9d9384;font-weight:600;text-transform:none;letter-spacing:0;">(may reach 5)</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
    h += ATTRS.map(function (a) { return '<button class="builder-chip' + (key === a.key ? ' sel' : '') + '" onclick="window.YZEB.setKey(\'' + a.key + '\')">' + esc(a.name) + '</button>'; }).join('');
    h += '</div>';

    h += '<div class="m-lbl" style="margin-top:12px;">Attributes — <span style="color:' + (aLeft < 0 ? '#df6a6a' : '#e6b45f') + ';">' + aLeft + ' left</span></div><div class="a-skills">';
    h += ATTRS.map(function (a) {
      var v = attrs[a.key];
      return stepper(a.name + (key === a.key ? ' ★' : ''), v, "window.YZEB.attr('" + a.key + "',-1)", "window.YZEB.attr('" + a.key + "',1)", v <= 2, v >= attrMax(a.key) || aLeft <= 0);
    }).join('');
    h += '</div>';

    h += '<div class="m-lbl" style="margin-top:12px;">Skills — <span style="color:' + (sLeft < 0 ? '#df6a6a' : '#e6b45f') + ';">' + sLeft + ' left</span></div>';
    ATTRS.forEach(function (a) {
      h += '<div class="a-attr">' + esc(a.name) + '</div><div class="a-skills">';
      h += SKILLS.filter(function (s) { return s.attr === a.key; }).map(function (s) {
        var v = skills[s.name];
        return stepper(s.name, v, "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',-1)", "window.YZEB.skill('" + s.name.replace(/'/g, "\\'") + "',1)", v <= 0, v >= SKILL_CAP || sLeft <= 0);
      }).join('');
      h += '</div>';
    });

    var ready = aLeft === 0 && sLeft >= 0;
    h += '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:8px;">'
      + '<span class="m-hint" style="margin:0;">' + (aLeft === 0 ? 'Attributes set' : aLeft + ' attribute points left') + ' · ' + sLeft + ' skill points left</span>'
      + '<span style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="window.YZEB.close()">Cancel</button>'
      + '<button class="m-btn" onclick="window.YZEB.apply()"' + (ready ? '' : ' disabled') + '>Apply</button></span></div>';

    $('yzeb-body').innerHTML = h;
  }

  window.YZEB = {
    launch: function () {
      // seed from the live sheet so re-launching keeps existing choices
      try {
        if (typeof S !== 'undefined' && S) {
          reset();
          if (S.name) name = S.name;
          if (S.key) key = S.key;
          ATTRS.forEach(function (a) { if (S.attrs && S.attrs[a.key] != null) attrs[a.key] = Math.max(2, num(S.attrs[a.key])); });
          SKILLS.forEach(function (s) { if (S.skills && S.skills[s.name] != null) skills[s.name] = num(S.skills[s.name]); });
        } else reset();
      } catch (e) { reset(); }
      ensure(); render(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    setName: function (v) { name = v; },
    setKey: function (k) { key = (key === k) ? '' : k; if (key && attrs[key] > 5) attrs[key] = 5; ATTRS.forEach(function (a) { if (a.key !== key && attrs[a.key] > 4) attrs[a.key] = 4; }); render(); },
    attr: function (k, d) { var v = attrs[k] + d; if (v < 2 || v > attrMax(k)) return; if (d > 0 && (ATTR_BUDGET - attrSpent()) <= 0) return; attrs[k] = v; render(); },
    skill: function (nm, d) { var v = skills[nm] + d; if (v < 0 || v > SKILL_CAP) return; if (d > 0 && (SKILL_BUDGET - skillSpent()) <= 0) return; skills[nm] = v; render(); },
    apply: function () {
      var d = { name: name, key: key, attrs: {}, skills: {} };
      ATTRS.forEach(function (a) { d.attrs[a.key] = attrs[a.key]; });
      SKILLS.forEach(function (s) { d.skills[s.name] = skills[s.name]; });
      try { applySheet(d); } catch (e) {}
      try { autoDerive('health'); autoDerive('resolve'); } catch (e) {}
      this.close();
      try { addLog('Character Built', name || 'Unnamed', 'Attributes & skills set · Health/Resolve derived', 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
