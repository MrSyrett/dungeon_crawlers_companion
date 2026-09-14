// Candela Obscura character builder — the stepped creation wizard that sets
// Role, Specialty, action ratings, drives, gilded actions, illumination keys
// and starting abilities/gear, then hands a finished character to applySheet().
// Mirrors icrpg-sheet-builder.js (window.ICRPGB). Uses the sheet globals:
// CO_ROLES, $, esc, applySheet.
(function () {
  'use strict';
  var STEPS = ['Role', 'Actions', 'Drives', 'Gilding', 'Abilities'];
  var ACTION_BUDGET = 4;   // raise one 0-action to 1, then distribute 3 more
  var DRIVE_BUDGET = 6;

  var ROLES = (typeof window !== 'undefined' && Array.isArray(window.CO_ROLES)) ? window.CO_ROLES : [];
  function roleObj(r) { return ROLES.find(function (x) { return x.role === r; }) || ROLES[0]; }
  function specObj(r, s) { var ro = roleObj(r); return ro.specialties.find(function (x) { return x.name === s; }) || ro.specialties[0]; }
  var ACTIONS = (typeof window !== 'undefined' && Array.isArray(window.CO_ACTIONS)) ? window.CO_ACTIONS : [];
  var DRIVES = (typeof window !== 'undefined' && Array.isArray(window.CO_DRIVES)) ? window.CO_DRIVES : [];
  var ACTION_NAMES = ACTIONS.map(function (a) { return a.name; });
  var DRIVE_NAMES = DRIVES.map(function (d) { return d.name; });
  function actionDrive(a) { var f = ACTIONS.find(function (x) { return x.name === a; }); return f ? f.drive : ''; }

  var step = 0, _last = -1;
  var role = '', specialty = '';
  var actions = {}, drives = {}, gilds = {}, extraGild = '';
  var roleAb = '', specAb = '';

  function initFromSpec() {
    var sp = specObj(role, specialty);
    actions = {}; ACTION_NAMES.forEach(function (a) { actions[a] = 0; });
    Object.keys(sp.starting.actions).forEach(function (k) { actions[k] = sp.starting.actions[k]; });
    drives = {}; DRIVE_NAMES.forEach(function (d) { drives[d] = 0; });
    Object.keys(sp.starting.drives).forEach(function (k) { drives[k] = sp.starting.drives[k]; });
    gilds = {}; gilds[sp.gilded] = true; extraGild = '';
    roleAb = roleObj(role).abilities[0].name;
    specAb = sp.abilities[0].name;
  }

  function baseActions() { var sp = specObj(role, specialty); var b = {}; ACTION_NAMES.forEach(function (a) { b[a] = 0; }); Object.keys(sp.starting.actions).forEach(function (k) { b[k] = sp.starting.actions[k]; }); return b; }
  function baseDrives() { var sp = specObj(role, specialty); var b = {}; DRIVE_NAMES.forEach(function (d) { b[d] = 0; }); Object.keys(sp.starting.drives).forEach(function (k) { b[k] = sp.starting.drives[k]; }); return b; }
  function actionsSpent() { var b = baseActions(), n = 0; ACTION_NAMES.forEach(function (a) { n += Math.max(0, actions[a] - b[a]); }); return n; }
  function drivesSpent() { var b = baseDrives(), n = 0; DRIVE_NAMES.forEach(function (d) { n += Math.max(0, drives[d] - b[d]); }); return n; }

  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'cob-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.COB.close(); };
    ov.innerHTML =
      '<div class="modal wide"><div class="modal-hd"><div class="ttl">✦ Build an Investigator</div><button class="x" onclick="window.COB.close()">✕</button></div>'
      + '<div id="cob-steps" style="display:flex;gap:4px;padding:8px 16px 0;flex-wrap:wrap;"></div>'
      + '<div class="modal-bd" id="cob-body"></div>'
      + '<div class="modal-ft"><button class="m-btn ghost" id="cob-back" onclick="window.COB.back()">← Back</button>'
      + '<span id="cob-note" class="m-hint" style="margin:0;flex:1;text-align:center;"></span>'
      + '<button class="m-btn" id="cob-next" onclick="window.COB.next()">Next →</button></div></div>';
    document.body.appendChild(ov);
  }

  function chip(label, sel, onclick) {
    return '<button class="builder-chip' + (sel ? ' sel' : '') + '" onclick="' + onclick + '">' + esc(label) + '</button>';
  }
  function stepper(label, val, minus, plus, minusDis, plusDis) {
    return '<div class="a-row"><span class="a-name">' + label + '</span><span class="a-code">' + val + '</span>'
      + '<button onclick="' + minus + '"' + (minusDis ? ' disabled' : '') + '>−</button>'
      + '<button onclick="' + plus + '"' + (plusDis ? ' disabled' : '') + '>+</button></div>';
  }

  function render() {
    ensure();
    $('cob-steps').innerHTML = STEPS.map(function (s, i) {
      return '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;border:1px solid ' + (i === step ? 'var(--co)' : '#333') + ';color:' + (i === step ? 'var(--co-dk)' : i < step ? '#999' : '#777') + ';">' + (i + 1) + '. ' + s + '</span>';
    }).join('');
    $('cob-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('cob-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    $('cob-note').textContent = '';
    var b = $('cob-body'), keep = _last === step, sc = keep ? b.scrollTop : 0, h = '';

    if (step === 0) {
      h += '<div class="m-lbl">Role</div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
      h += ROLES.map(function (r) { return chip(r.role + ' — ' + r.mastery, role === r.role, "window.COB.setRole('" + r.role + "')"); }).join('');
      h += '</div>';
      if (role) {
        h += '<div class="m-lbl" style="margin-top:12px;">Specialty</div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
        h += roleObj(role).specialties.map(function (sp) { return chip(sp.name, specialty === sp.name, "window.COB.setSpec('" + sp.name + "')"); }).join('');
        h += '</div>';
        if (specialty) {
          var sp2 = specObj(role, specialty);
          h += '<p class="m-hint" style="margin-top:12px;">' + esc(sp2.focus) + ' Primary drive <b>' + sp2.primaryDrive + '</b>, gilded <b>' + sp2.gilded + '</b>.</p>';
        }
      }
    } else if (step === 1) {
      var left = ACTION_BUDGET - actionsSpent(), bA = baseActions();
      h += '<p class="m-hint">Your specialty sets 5 points. Raise one 0-rated action to 1, then distribute 3 more — no action above 2. <b>' + left + '</b> point' + (left === 1 ? '' : 's') + ' left.</p>';
      DRIVE_NAMES.forEach(function (dn) {
        h += '<div class="a-attr">' + dn + '</div><div class="a-skills">';
        ACTIONS.filter(function (a) { return a.drive === dn; }).forEach(function (a) {
          var v = actions[a.name], preset = bA[a.name];
          h += stepper(a.name, v, "window.COB.act('" + a.name + "',-1)", "window.COB.act('" + a.name + "',1)", v <= preset, v >= 2 || left <= 0);
        });
        h += '</div>';
      });
    } else if (step === 2) {
      var leftD = DRIVE_BUDGET - drivesSpent(), bD = baseDrives();
      h += '<p class="m-hint">Your specialty sets 3 drive points. Distribute 6 more — no drive above 6. <b>' + leftD + '</b> left.</p><div class="a-skills">';
      DRIVE_NAMES.forEach(function (dn) {
        var v = drives[dn], preset = bD[dn];
        h += stepper(dn, v, "window.COB.drv('" + dn + "',-1)", "window.COB.drv('" + dn + "',1)", v <= preset, v >= 6 || leftD <= 0);
      });
      h += '</div>';
    } else if (step === 3) {
      var sp3 = specObj(role, specialty);
      h += '<p class="m-hint">Your specialty gilds <b>' + sp3.gilded + '</b>. Gild one more action of your choice (best in a drive you have points to spend).</p><div style="display:flex;flex-wrap:wrap;gap:6px;">';
      h += ACTION_NAMES.filter(function (a) { return a !== sp3.gilded; }).map(function (a) {
        return chip(a + ' · ' + actionDrive(a), extraGild === a, "window.COB.gild('" + a + "')");
      }).join('');
      h += '</div>';
    } else if (step === 4) {
      var ro = roleObj(role), sp4 = specObj(role, specialty);
      h += '<div class="m-lbl">Role ability (' + ro.role + ')</div><div style="display:flex;flex-direction:column;gap:5px;">';
      h += ro.abilities.map(function (a) { return '<label style="display:flex;gap:8px;align-items:flex-start;cursor:pointer;font-size:12px;"><input type="radio" name="cob-roleab" ' + (roleAb === a.name ? 'checked' : '') + ' onchange="window.COB.pickRole(\'' + a.name.replace(/'/g, "\\'") + '\')"><span><b>' + esc(a.name) + '.</b> ' + esc(a.desc) + '</span></label>'; }).join('');
      h += '</div><div class="m-lbl" style="margin-top:12px;">Specialty ability (' + sp4.name + ')</div><div style="display:flex;flex-direction:column;gap:5px;">';
      h += sp4.abilities.map(function (a) { return '<label style="display:flex;gap:8px;align-items:flex-start;cursor:pointer;font-size:12px;"><input type="radio" name="cob-specab" ' + (specAb === a.name ? 'checked' : '') + ' onchange="window.COB.pickSpec(\'' + a.name.replace(/'/g, "\\'") + '\')"><span><b>' + esc(a.name) + '.</b> ' + esc(a.desc) + '</span></label>'; }).join('');
      h += '</div>';
    }
    b.innerHTML = h; if (keep) b.scrollTop = sc; _last = step;
  }

  function finish() {
    var ro = roleObj(role), sp = specObj(role, specialty);
    var gl = {}; ACTION_NAMES.forEach(function (a) { gl[a] = false; });
    gl[sp.gilded] = true; if (extraGild) gl[extraGild] = true;
    var dv = {}; DRIVE_NAMES.forEach(function (d) { dv[d] = { max: drives[d] || 0, cur: drives[d] || 0 }; });
    var roleA = ro.abilities.find(function (x) { return x.name === roleAb; }) || ro.abilities[0];
    var specA = sp.abilities.find(function (x) { return x.name === specAb; }) || sp.abilities[0];
    var built = {
      system: 'CO', role: role, specialty: specialty,
      actions: actions, gilded: gl, drives: dv,
      illumination: sp.illumination.slice(0, 3),
      abilities: [
        { name: roleA.name, tag: ro.role + ' (Role)', note: roleA.desc },
        { name: specA.name, tag: sp.name + ' (Specialty)', note: specA.desc }
      ],
      gear: (sp.gear || []).slice(0, 2).map(function (g) { return { name: g, tag: sp.name + ' gear', note: '' }; })
    };
    applySheet(built);
    if (typeof addLog === 'function') addLog('Character Built', ro.role + ' · ' + sp.name, 'Now spend nothing more — you’re ready to play', 'crit');
  }

  window.COB = {
    launch: function () { step = 0; role = ROLES.length ? ROLES[0].role : ''; specialty = ''; _last = -1; if (role) { specialty = roleObj(role).specialties[0].name; initFromSpec(); } render(); ov.classList.add('open'); },
    close: function () { if (ov) ov.classList.remove('open'); },
    setRole: function (r) { role = r; specialty = ''; render(); },
    setSpec: function (s) { specialty = s; initFromSpec(); render(); },
    act: function (a, d) { var b = baseActions(); var nv = Math.max(b[a], Math.min(2, (actions[a] || 0) + d)); if (d > 0 && actionsSpent() >= ACTION_BUDGET) return; actions[a] = nv; render(); },
    drv: function (dn, d) { var b = baseDrives(); var nv = Math.max(b[dn], Math.min(6, (drives[dn] || 0) + d)); if (d > 0 && drivesSpent() >= DRIVE_BUDGET) return; drives[dn] = nv; render(); },
    gild: function (a) { extraGild = (extraGild === a) ? '' : a; render(); },
    pickRole: function (n) { roleAb = n; },
    pickSpec: function (n) { specAb = n; },
    next: function () {
      if (step === 0 && (!role || !specialty)) { $('cob-note').textContent = 'Choose a role and specialty'; return; }
      if (step === 1 && actionsSpent() < ACTION_BUDGET) { $('cob-note').textContent = 'Spend all ' + ACTION_BUDGET + ' action points'; return; }
      if (step === 2 && drivesSpent() < DRIVE_BUDGET) { $('cob-note').textContent = 'Spend all ' + DRIVE_BUDGET + ' drive points'; return; }
      if (step === 3 && !extraGild) { $('cob-note').textContent = 'Gild one more action'; return; }
      if (step === STEPS.length - 1) { finish(); this.close(); return; }
      step++; render();
    },
    back: function () { if (step > 0) { step--; render(); } }
  };
})();
