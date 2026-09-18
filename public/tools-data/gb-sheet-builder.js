// Ghostbusters character builder — the "Create" button on the Personnel File.
// Walks creation: assign 12 Trait points (1–5 each), pick one Talent per Trait,
// choose a Goal, and take starting Gear. Hands the finished Ghostbuster to
// applySheet(). Uses the sheet globals (GB_* data, $, esc, applySheet,
// collectSheet, saveSheet, syncDocTitle, addLog) — load AFTER the sheet script.
(function () {
  'use strict';
  var STEPS = ['Traits', 'Talents', 'Goal', 'Gear'];
  var TKEYS = ['Brains', 'Muscles', 'Moves', 'Cool'];
  var BUDGET = 12, MIN = 1, MAX = 5;

  function G(x) { return (typeof x !== 'undefined' && Array.isArray(x)) ? x : []; }
  function talents() { return G(typeof GB_TALENTS !== 'undefined' ? GB_TALENTS : undefined); }
  function goals() { return G(typeof GB_GOALS !== 'undefined' ? GB_GOALS : undefined); }
  function equip() { return G(typeof GB_EQUIPMENT !== 'undefined' ? GB_EQUIPMENT : undefined); }
  function goalObj(n) { return goals().find(function (g) { return g.name === n; }) || null; }

  var step = 0, _lastStep = -1, ov = null;
  var name = '', alias = '';
  var traits = { Brains: 3, Muscles: 3, Moves: 3, Cool: 3 };
  var talent = { Brains: '', Muscles: '', Moves: '', Cool: '' };
  var goal = '';
  var gearPick = {};   // {name: true}

  function spent() { return TKEYS.reduce(function (a, k) { return a + traits[k]; }, 0); }

  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'gbb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.GBB.close(); };
    ov.innerHTML = '<div class="modal wide" style="max-height:94vh;"><div class="modal-hd"><div class="ttl" id="gbb-title">✦ New Ghostbuster</div><button class="x" onclick="GBB.close()">✕</button></div>'
      + '<div id="gbb-steps" style="display:flex;gap:4px;padding:8px 16px 0;flex-wrap:wrap;"></div>'
      + '<div class="modal-bd" id="gbb-body"></div>'
      + '<div class="modal-ft"><button class="m-btn ghost" id="gbb-back" onclick="GBB.back()">← Back</button><span id="gbb-note" class="m-hint" style="margin:0;flex:1;text-align:center;"></span><button class="m-btn" id="gbb-next" onclick="GBB.next()">Next →</button></div></div>';
    document.body.appendChild(ov);
  }

  function stepChips() {
    return STEPS.map(function (s, i) {
      var on = i === step, done = i < step;
      return '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;border:1px solid ' + (on ? '#8bc53f' : '#33471f') + ';color:' + (on ? '#a6e05a' : done ? '#cdd' : '#6a7a52') + ';">' + (i + 1) + '. ' + s + '</span>';
    }).join('');
  }

  function render() {
    ensure();
    $('gbb-steps').innerHTML = stepChips();
    $('gbb-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('gbb-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    var b = $('gbb-body'), note = $('gbb-note');
    var keep = _lastStep === step, bScroll = keep ? b.scrollTop : 0;

    if (step === 0) {
      var left = BUDGET - spent();
      note.textContent = 'Points left: ' + left;
      var h = '<div class="m-lbl">Name</div><input class="m-input" id="gbb-name" value="' + esc(name) + '" placeholder="Ghostbuster">'
        + '<div class="m-lbl">Alias (player)</div><input class="m-input" id="gbb-alias" value="' + esc(alias) + '" placeholder="Your name">'
        + '<div class="m-lbl">Traits — spend ' + BUDGET + ' points, 1–5 each</div><div style="display:flex;flex-direction:column;gap:4px;">';
      TKEYS.forEach(function (k) {
        var v = traits[k];
        h += '<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:center;padding:3px 0;border-bottom:1px solid #232b18;">'
          + '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:16px;color:#eef;">' + k + '</span>'
          + '<button class="lv-step" data-k="' + k + '" data-d="-1"' + (v <= MIN ? ' disabled' : '') + '>−</button>'
          + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:15px;color:#a6e05a;min-width:24px;text-align:center;">' + v + '</span>'
          + '<button class="lv-step" data-k="' + k + '" data-d="1"' + (v >= MAX || left <= 0 ? ' disabled' : '') + '>+</button></div>';
      });
      b.innerHTML = h + '</div>';
      $('gbb-name').addEventListener('input', function () { name = this.value; });
      $('gbb-alias').addEventListener('input', function () { alias = this.value; });
      b.querySelectorAll('button[data-k]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.dataset.k, d = parseInt(btn.dataset.d, 10), nv = traits[k] + d;
          if (nv < MIN || nv > MAX) return; if (d > 0 && spent() >= BUDGET) return;
          traits[k] = nv; render();
        });
      });
    } else if (step === 1) {
      note.textContent = 'One Talent per Trait';
      var hh = '<p class="m-hint">A Talent is a specialty inside a Trait — roll 3 extra dice when it applies. Pick one for each.</p>';
      TKEYS.forEach(function (k) {
        var list = talents().filter(function (t) { return t.trait === k; });
        hh += '<div class="m-lbl">' + k + ' (' + traits[k] + 'd → ' + (traits[k] + 3) + 'd with talent)</div>'
          + '<input class="m-input gbb-tal" list="gbbtl-' + k + '" data-k="' + k + '" value="' + esc(talent[k]) + '" placeholder="e.g. ' + esc(list.length ? list[0].name : '') + '">'
          + '<datalist id="gbbtl-' + k + '">' + list.map(function (t) { return '<option value="' + esc(t.name) + '">'; }).join('') + '</datalist>';
      });
      b.innerHTML = hh;
      b.querySelectorAll('.gbb-tal').forEach(function (inp) { inp.addEventListener('input', function () { talent[inp.dataset.k] = inp.value; }); });
    } else if (step === 2) {
      note.textContent = goal ? goal : 'Pick a Goal';
      var gs = goals();
      b.innerHTML = '<p class="m-hint">Your Goal is what drives your Ghostbuster — it earns Brownie Points when you pursue it.</p>'
        + '<div style="display:flex;flex-direction:column;gap:7px;">'
        + gs.map(function (g) {
          return '<div class="gbb-goal" data-g="' + esc(g.name) + '" style="border:1px solid ' + (goal === g.name ? '#8bc53f' : '#2b3620') + ';background:' + (goal === g.name ? '#233617' : '#0f150a') + ';border-radius:6px;padding:9px 11px;cursor:pointer;">'
            + '<b style="font-family:\'Barlow Condensed\',sans-serif;font-size:15px;color:#eef;">' + esc(g.name) + '</b>'
            + (g.description ? '<div style="font-size:11px;color:#a9c07f;margin-top:3px;">' + esc(g.description) + '</div>' : '') + '</div>';
        }).join('') + '</div>';
      b.querySelectorAll('.gbb-goal').forEach(function (c) { c.addEventListener('click', function () { goal = c.dataset.g; render(); }); });
    } else {
      note.textContent = 'Starting gear';
      var eq = equip();
      b.innerHTML = '<p class="m-hint">Tick the gear you start with — add more from the sheet later. Watch your Muscles carry limit.</p>'
        + '<div style="display:flex;flex-direction:column;gap:5px;">' + eq.map(function (e) {
          return '<label style="display:flex;gap:8px;align-items:center;font-size:13px;color:#ddd;border:1px solid #2b3620;border-radius:5px;padding:7px 9px;cursor:pointer;">'
            + '<input type="checkbox" class="gbb-gear" data-n="' + esc(e.name) + '"' + (gearPick[e.name] ? ' checked' : '') + '>'
            + '<span>' + esc(e.name) + (e.muscles ? ' <span style="color:#a9c07f;font-size:11px;">' + e.muscles + ' Mus</span>' : '') + (e.hands ? ' <span style="color:#a9c07f;font-size:11px;">· ' + esc(e.hands) + '</span>' : '') + '</span></label>';
        }).join('') + '</div>';
      b.querySelectorAll('.gbb-gear').forEach(function (c) { c.addEventListener('change', function () { if (c.checked) gearPick[c.dataset.n] = true; else delete gearPick[c.dataset.n]; }); });
    }
    if (keep) b.scrollTop = bScroll;
    _lastStep = step; ov.classList.add('open');
  }

  function readStep0() { if ($('gbb-name')) name = $('gbb-name').value; if ($('gbb-alias')) alias = $('gbb-alias').value; }

  function finish() {
    var eq = equip();
    var gear = Object.keys(gearPick).filter(function (n) { return gearPick[n]; }).map(function (n) {
      var e = eq.find(function (x) { return x.name === n; }) || {};
      return { name: n, hands: e.hands || '', muscles: e.muscles || 0 };
    });
    var built = {
      system: 'GB', _built: true, name: name || '', alias: alias || '', goal: goal || '',
      notes: '', tagPhysical: '', tagPersonality: '',
      traits: { Brains: traits.Brains, Muscles: traits.Muscles, Moves: traits.Moves, Cool: traits.Cool },
      current: { Brains: null, Muscles: null, Moves: null, Cool: null },
      talents: { Brains: { name: talent.Brains }, Muscles: { name: talent.Muscles }, Moves: { name: talent.Moves }, Cool: { name: talent.Cool } },
      bp: 20, gear: gear
    };
    var prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    built.campaign = prev.campaign || null;
    applySheet(built);
    if (typeof saveSheet === 'function') saveSheet(true);
    if (typeof syncDocTitle === 'function') syncDocTitle();
    if (typeof addLog === 'function') addLog('Character built', '✓', (name || 'Unnamed') + (goal ? ' — ' + goal : ''), 'crit');
  }

  window.GBB = {
    launch: function () { step = 0; name = ''; alias = ''; traits = { Brains: 3, Muscles: 3, Moves: 3, Cool: 3 }; talent = { Brains: '', Muscles: '', Moves: '', Cool: '' }; goal = ''; gearPick = {}; _lastStep = -1; render(); },
    close: function () { if (ov) ov.classList.remove('open'); },
    next: function () {
      if (step === 0) { readStep0(); if (spent() !== BUDGET) { $('gbb-note').textContent = 'Spend exactly ' + BUDGET + ' points — ' + (BUDGET - spent()) + ' left'; return; } }
      if (step === STEPS.length - 1) { finish(); this.close(); return; }
      step++; render();
    },
    back: function () { if (step === 0) readStep0(); if (step > 0) { step--; render(); } }
  };
})();
