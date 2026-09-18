// Ghostbusters character builder — the "Create" button on the Personnel File.
// Walks creation: assign 12 Trait points (starting at 1 each), pick one Talent
// per Trait (real pickers, not fill-ins), choose a Goal (with a Custom option),
// and shop for starting Gear. Hands the finished Ghostbuster to applySheet().
// Reuses the sheet's shared pickers (openTalentPickerTo / openGoalPickerTo /
// openPickerCfg + gearItems/gearAddTo/carryOf) — load AFTER the sheet script.
(function () {
  'use strict';
  var STEPS = ['Traits', 'Talents', 'Goal', 'Gear'];
  var TKEYS = ['Brains', 'Muscles', 'Moves', 'Cool'];
  var BUDGET = 12, MIN = 1, MAX = 5;

  var step = 0, _lastStep = -1, ov = null;
  var name = '';
  var traits = { Brains: 1, Muscles: 1, Moves: 1, Cool: 1 };
  var talent = { Brains: '', Muscles: '', Moves: '', Cool: '' };
  var goal = '';
  var gear = [];

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
      b.querySelectorAll('button[data-k]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.dataset.k, d = parseInt(btn.dataset.d, 10), nv = traits[k] + d;
          if (nv < MIN || nv > MAX) return; if (d > 0 && spent() >= BUDGET) return;
          traits[k] = nv; render();
        });
      });
    } else if (step === 1) {
      note.textContent = 'One Talent per Trait';
      var hh = '<div style="display:flex;flex-direction:column;gap:8px;">';
      TKEYS.forEach(function (k) {
        hh += '<div class="lv-row" style="grid-template-columns:auto 1fr auto;gap:10px;">'
          + '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:15px;color:#eef;min-width:64px;">' + k + '</span>'
          + '<span style="font-size:13px;color:' + (talent[k] ? '#a6e05a' : '#8f9c78') + ';">' + (talent[k] ? esc(talent[k]) : 'none') + '</span>'
          + '<button class="m-btn ghost gbb-tal" data-k="' + k + '">Choose</button></div>';
      });
      b.innerHTML = hh + '</div>';
      b.querySelectorAll('.gbb-tal').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.dataset.k;
          openTalentPickerTo(k, function () { return talent[k]; }, function (nm) { talent[k] = nm; render(); });
        });
      });
    } else if (step === 2) {
      note.textContent = goal ? goal : 'Pick a Goal';
      var gs = (typeof GOALS !== 'undefined' && Array.isArray(GOALS)) ? GOALS : [];
      var hh2 = '<div class="pk-customrow" style="margin-bottom:10px;"><input class="m-input" id="gbb-goal-custom" placeholder="Custom goal…" style="flex:1;"><button class="m-btn" id="gbb-goal-add">Set</button></div>'
        + '<div style="display:flex;flex-direction:column;gap:7px;">'
        + gs.map(function (g) {
          return '<div class="gbb-goal" data-g="' + esc(g.name) + '" style="border:1px solid ' + (goal === g.name ? '#8bc53f' : '#2b3620') + ';background:' + (goal === g.name ? '#233617' : '#0f150a') + ';border-radius:6px;padding:9px 11px;cursor:pointer;">'
            + '<b style="font-family:\'Barlow Condensed\',sans-serif;font-size:15px;color:#eef;">' + esc(g.name) + '</b>'
            + (g.description ? '<div style="font-size:11px;color:#a9c07f;margin-top:3px;">' + esc(g.description) + '</div>' : '') + '</div>';
        }).join('') + '</div>';
      b.innerHTML = hh2;
      $('gbb-goal-custom').value = (goal && !gs.some(function (g) { return g.name === goal; })) ? goal : '';
      $('gbb-goal-add').addEventListener('click', function () { var v = ($('gbb-goal-custom').value || '').trim(); if (v) { goal = v; render(); } });
      b.querySelectorAll('.gbb-goal').forEach(function (c) { c.addEventListener('click', function () { goal = c.dataset.g; render(); }); });
    } else {
      note.textContent = gear.length + ' item' + (gear.length === 1 ? '' : 's');
      var mus = traits.Muscles, carry = gear.reduce(function (a, g) { return a + (parseFloat(g.muscles) || 0); }, 0);
      var hh3 = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:8px;">'
        + '<button class="m-btn" id="gbb-shop">🛒 Open Shop</button>'
        + '<span class="pk-carry' + (carry > mus ? ' over' : '') + '">Carry ' + carry + ' / ' + mus + ' Muscles</span></div>'
        + '<div style="display:flex;flex-direction:column;gap:5px;">';
      if (!gear.length) hh3 += '<div class="brow-empty">No gear yet — open the shop.</div>';
      gear.forEach(function (g, i) {
        hh3 += '<div class="gear-row" style="background:#182014;border-color:#2b3620;color:#dde;">'
          + '<span>' + esc(g.name) + '</span><span style="display:flex;gap:8px;align-items:center;">'
          + '<span class="gm" style="color:#8f9c78;">' + (g.damage ? 'dmg ' + esc(g.damage) + ' · ' : '') + esc(g.hands || '?') + ' · ' + (g.muscles || 0) + ' Mus</span>'
          + '<button class="row-x" style="color:#df8a8a;" data-i="' + i + '">✕</button></span></div>';
      });
      b.innerHTML = hh3 + '</div>';
      $('gbb-shop').addEventListener('click', function () {
        openPickerCfg({
          title: '🛒 Gear Shop', multi: true, addLabel: 'Add', cats: ['Weapon (ranged)', 'Weapon (melee)', 'Gear'],
          items: gearItems, carry: function () { var c = gear.reduce(function (a, g) { return a + (parseFloat(g.muscles) || 0); }, 0); return { text: 'Carry ' + c + ' / ' + traits.Muscles + ' Muscles', over: c > traits.Muscles }; },
          custom: function (v) { gear.push({ name: v, hands: '', muscles: 0 }); render(); },
          onAdd: function (it) { gearAddTo(gear, it); render(); }
        });
      });
      b.querySelectorAll('.row-x').forEach(function (btn) { btn.addEventListener('click', function () { gear.splice(parseInt(btn.dataset.i, 10), 1); render(); }); });
    }
    if (keep) b.scrollTop = bScroll;
    _lastStep = step; ov.classList.add('open');
  }

  function readName() { if ($('gbb-name')) name = $('gbb-name').value; }

  function finish() {
    var built = {
      system: 'GB', _built: true, name: name || '', goal: goal || '',
      notes: '', tagPhysical: '', tagPersonality: '',
      traits: { Brains: traits.Brains, Muscles: traits.Muscles, Moves: traits.Moves, Cool: traits.Cool },
      talents: { Brains: { name: talent.Brains }, Muscles: { name: talent.Muscles }, Moves: { name: talent.Moves }, Cool: { name: talent.Cool } },
      residence: '', phone: '', telex: '',
      bp: 20, gear: gear.slice()
    };
    var prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    built.campaign = prev.campaign || null;
    applySheet(built);
    if (typeof saveSheet === 'function') saveSheet(true);
    if (typeof syncDocTitle === 'function') syncDocTitle();
    if (typeof addLog === 'function') addLog('Character built', '✓', (name || 'Unnamed') + (goal ? ' — ' + goal : ''), 'crit');
  }

  window.GBB = {
    launch: function () { step = 0; name = ''; traits = { Brains: 1, Muscles: 1, Moves: 1, Cool: 1 }; talent = { Brains: '', Muscles: '', Moves: '', Cool: '' }; goal = ''; gear = []; _lastStep = -1; render(); },
    close: function () { if (ov) ov.classList.remove('open'); },
    next: function () {
      if (step === 0) { readName(); if (spent() !== BUDGET) { $('gbb-note').textContent = 'Spend exactly ' + BUDGET + ' points — ' + (BUDGET - spent()) + ' left'; return; } }
      if (step === STEPS.length - 1) { finish(); this.close(); return; }
      step++; render();
    },
    back: function () { if (step === 0) readName(); if (step > 0) { step--; render(); } }
  };
})();
