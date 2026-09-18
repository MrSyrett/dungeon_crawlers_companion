// Justice League Unlimited character builder — the "Create" button on the hero
// sheet. Walks JLU creation: pick a Tier, an identity (Origin + Archetype),
// spend PAX on Attributes (in +3 steps), and take starting Powers from your
// Origin's Kit. Hands the finished hero to applySheet(). Uses the sheet globals
// (JLU_* data, $, esc, applySheet, collectSheet, saveSheet, syncDocTitle,
// addLog, tierObj, originObj, powerObj) — load AFTER the sheet script.
(function () {
  'use strict';
  var STEPS = ['Tier', 'Identity', 'Attributes', 'Powers'];
  var ATTR_ORDER = ['potency', 'accuracy', 'agility', 'resistance', 'mind', 'spirit'];
  var ATTR_NAME = { potency: 'Potency', accuracy: 'Accuracy', agility: 'Agility', resistance: 'Resistance', mind: 'Mind', spirit: 'Spirit' };

  function G(x) { return (typeof x !== 'undefined' && Array.isArray(x)) ? x : []; }
  function tiers() { return G(typeof JLU_TIERS !== 'undefined' ? JLU_TIERS : undefined); }
  function origins() { return G(typeof JLU_ORIGINS !== 'undefined' ? JLU_ORIGINS : undefined); }
  function arches() { return G(typeof JLU_ARCHETYPES !== 'undefined' ? JLU_ARCHETYPES : undefined); }
  function powers() { return G(typeof JLU_POWERS !== 'undefined' ? JLU_POWERS : undefined); }
  function tObj(k) { return tiers().find(function (t) { return t.key === k; }) || null; }
  function oObj(n) { return origins().find(function (o) { return o.name === n; }) || null; }
  function pObj(n) { return powers().find(function (p) { return p.name === n; }) || null; }

  var step = 0, _lastStep = -1, ov = null;
  var tier = '', origin = '', arch = '', name = '', secret = '';
  var attrs = {};                 // {key: value in multiples of 3}
  var chosenPowers = {};          // {powerName: true}

  function tierPax() { var t = tObj(tier); return t ? (parseInt(t.pax, 10) || 0) : 0; }
  function attrLimit() { var t = tObj(tier); return t ? (t.attrLimit || 6) : 6; }
  function attrPax() { var n = 0; ATTR_ORDER.forEach(function (k) { n += ((attrs[k] || 0) / 3) * 5; }); return n; }
  // A hero's Origin grants one free Grade in a Kit power; every other chosen
  // Kit power costs its paxPerGrade (×2 if it's outside the Kit).
  function inKit(po) { var o = oObj(origin); if (!o) return true; var kit = o.powerKit || []; if (kit.indexOf('Any Superpower') >= 0 && po.category === 'Superpower') return true; return kit.indexOf(po.name) >= 0 || kit.indexOf(po.category) >= 0; }
  function powerPax() {
    var chosen = Object.keys(chosenPowers).filter(function (n) { return chosenPowers[n]; });
    var freeUsed = false, n = 0;
    chosen.forEach(function (nm) {
      var po = pObj(nm); if (!po) return;
      var per = parseInt(po.paxPerGrade, 10) || 0;
      var cost = per * (inKit(po) ? 1 : 2);
      if (!freeUsed && inKit(po)) { freeUsed = true; cost = 0; }  // Origin's free power
      n += cost;
    });
    return n;
  }
  function paxSpent() { return attrPax() + powerPax(); }
  function paxLeft() { return tierPax() - paxSpent(); }

  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'jlub-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) window.JLUB.close(); };
    ov.innerHTML = '<div class="modal wide" style="max-height:94vh;"><div class="modal-hd"><div class="ttl" id="jlub-title">✦ Build a Hero</div><button class="x" onclick="JLUB.close()">✕</button></div>'
      + '<div id="jlub-steps" style="display:flex;gap:4px;padding:8px 16px 0;flex-wrap:wrap;"></div>'
      + '<div class="modal-bd" id="jlub-body"></div>'
      + '<div class="modal-ft"><button class="m-btn ghost" id="jlub-back" onclick="JLUB.back()">← Back</button><span id="jlub-note" class="m-hint" style="margin:0;flex:1;text-align:center;"></span><button class="m-btn" id="jlub-next" onclick="JLUB.next()">Next →</button></div></div>';
    document.body.appendChild(ov);
  }

  function stepChips() {
    return STEPS.map(function (s, i) {
      var on = i === step, done = i < step;
      return '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;border:1px solid ' + (on ? '#2f6fed' : '#33456c') + ';color:' + (on ? '#7db0f0' : done ? '#cdd' : '#66748f') + ';">' + (i + 1) + '. ' + s + '</span>';
    }).join('');
  }

  function render() {
    ensure();
    $('jlub-steps').innerHTML = stepChips();
    $('jlub-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('jlub-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    var b = $('jlub-body'), note = $('jlub-note');
    var keep = _lastStep === step, bScroll = keep ? b.scrollTop : 0;

    if (step === 0) {
      note.textContent = tier ? (tObj(tier).name) : 'Pick a starting Tier';
      var playable = tiers().filter(function (t) { return t.playable; });
      b.innerHTML = '<p class="m-hint">Every Hero has a <b>Tier</b> (E–S) that sets your baseline stats and PAX budget. The Quickstart covers <b>D — Year One</b> and <b>C — Local Hero</b>.</p>'
        + '<div style="display:flex;flex-direction:column;gap:8px;">'
        + playable.map(function (t) {
          return '<div class="jlub-tier" data-t="' + esc(t.key) + '" style="border:1px solid ' + (tier === t.key ? '#2f6fed' : '#26314a') + ';background:' + (tier === t.key ? '#13294f' : '#0d1526') + ';border-radius:6px;padding:10px 12px;cursor:pointer;">'
            + '<div style="display:flex;justify-content:space-between;align-items:baseline;"><b style="font-family:\'Barlow Condensed\',sans-serif;font-size:16px;color:#eef;">' + esc(t.key) + ' — ' + esc(t.name) + '</b><span style="font-size:11px;color:#9fb0d6;">' + esc(t.label || '') + '</span></div>'
            + '<div style="font-size:11px;color:#9fb0d6;margin-top:4px;font-family:\'Share Tech Mono\',monospace;">' + (t.pax || 0) + ' PAX · Resolve ' + (t.resolve || 0) + ' · Defense ' + (t.defense || 0) + ' · Attr cap +' + (t.attrLimit || 6) + '</div></div>';
        }).join('') + '</div>';
      b.querySelectorAll('.jlub-tier').forEach(function (c) { c.addEventListener('click', function () { tier = c.dataset.t; render(); }); });
    } else if (step === 1) {
      note.textContent = 'Who is your Hero?';
      var os = origins(), as = arches();
      b.innerHTML = '<p class="m-hint">Name your Hero, then choose an <b>Origin</b> (where your powers come from — it sets your Power Kit) and an <b>Archetype</b> (your role and signature abilities).</p>'
        + '<div class="m-lbl">Hero Name</div><input class="m-input" id="jlub-name" value="' + esc(name) + '" placeholder="Codename">'
        + '<div class="m-lbl">Secret Identity</div><input class="m-input" id="jlub-secret" value="' + esc(secret) + '" placeholder="Civilian name">'
        + '<div class="m-lbl">Origin</div><select class="m-input" id="jlub-origin"><option value="">— origin —</option>' + os.map(function (o) { return '<option value="' + esc(o.name) + '"' + (o.name === origin ? ' selected' : '') + '>' + esc(o.name) + '</option>'; }).join('') + '</select>'
        + '<div id="jlub-o-desc" style="font-size:12px;color:#9fb0d6;line-height:1.5;margin:6px 0;"></div>'
        + '<div class="m-lbl">Archetype</div><select class="m-input" id="jlub-arch"><option value="">— archetype —</option>' + as.map(function (a) { return '<option value="' + esc(a.name) + '"' + (a.name === arch ? ' selected' : '') + '>' + esc(a.name) + '</option>'; }).join('') + '</select>'
        + '<div id="jlub-a-desc" style="font-size:12px;color:#9fb0d6;line-height:1.5;margin:6px 0;"></div>';
      var upd = function () {
        name = $('jlub-name').value; secret = $('jlub-secret').value;
        var newOrigin = $('jlub-origin').value; if (newOrigin !== origin) { origin = newOrigin; chosenPowers = {}; }
        arch = $('jlub-arch').value;
        var o = oObj(origin), a = arches().find(function (x) { return x.name === arch; });
        $('jlub-o-desc').innerHTML = o ? (esc(o.summary || '') + '<br><b style="color:#7db0f0;">Kit:</b> ' + esc((o.powerKit || []).join(', ')) + (o.canBuyOutsideKit ? '' : ' <span style="color:#df8a8a;">(kit only)</span>')) : '';
        $('jlub-a-desc').innerHTML = a ? (esc(a.summary || '') + (a.examples ? '<br><b style="color:#7db0f0;">e.g.</b> ' + esc(a.examples) : '')) : '';
      };
      $('jlub-name').addEventListener('input', upd);
      $('jlub-secret').addEventListener('input', upd);
      $('jlub-origin').addEventListener('change', function () { readIdentity(); render(); });
      $('jlub-arch').addEventListener('change', upd);
      upd();
    } else if (step === 2) {
      var lim = attrLimit(), left = paxLeft();
      note.textContent = 'PAX left: ' + left + ' / ' + tierPax();
      var h = '<p class="m-hint">Attributes rise in <b>+3</b> steps — each step costs <b>5 PAX</b>. The Tier ' + esc(tier) + ' cap is <b>+' + lim + '</b>. Leave PAX for Powers, Knowledge and Traits — you don\'t have to spend it all now.</p>';
      h += '<div style="display:flex;flex-direction:column;gap:4px;">';
      ATTR_ORDER.forEach(function (k) {
        var v = attrs[k] || 0;
        h += '<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:center;padding:3px 0;border-bottom:1px solid #1a2338;">'
          + '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:15px;color:#eef;">' + ATTR_NAME[k] + '</span>'
          + '<button class="jlub-attr" data-k="' + k + '" data-d="-3" style="width:26px;height:24px;background:#1f2a40;border:1px solid #34435f;color:#ddd;border-radius:3px;cursor:pointer;font-weight:700;"' + (v <= 0 ? ' disabled' : '') + '>−</button>'
          + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:15px;color:#7db0f0;min-width:34px;text-align:center;">' + (v >= 0 ? '+' : '') + v + '</span>'
          + '<button class="jlub-attr" data-k="' + k + '" data-d="3" style="width:26px;height:24px;background:#1f2a40;border:1px solid #34435f;color:#ddd;border-radius:3px;cursor:pointer;font-weight:700;"' + (v >= lim ? ' disabled' : '') + '>+</button></div>';
      });
      h += '</div><div style="margin-top:10px;font-family:\'Share Tech Mono\',monospace;font-size:12px;color:' + (left < 0 ? '#df8a8a' : '#9fb0d6') + ';">Attributes spend: ' + attrPax() + ' PAX</div>';
      b.innerHTML = h;
      b.querySelectorAll('.jlub-attr').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.dataset.k, d = parseInt(btn.dataset.d, 10);
          var v = (attrs[k] || 0) + d; if (v < 0) v = 0; if (v > lim) v = lim; attrs[k] = v; if (!v) delete attrs[k]; render();
        });
      });
    } else {
      var o = oObj(origin);
      var kit = o ? (o.powerKit || []) : [];
      // Resolve the Kit into concrete power objects (skip the "Any Superpower" wildcard).
      var kitPowers = [];
      kit.forEach(function (entry) {
        if (entry === 'Any Superpower') return;
        var po = pObj(entry);
        if (po) kitPowers.push(po);
        else powers().filter(function (p) { return p.category === entry; }).forEach(function (p) { kitPowers.push(p); });
      });
      // Dedupe by name.
      var seen = {}; kitPowers = kitPowers.filter(function (p) { return seen[p.name] ? false : (seen[p.name] = true); });
      note.textContent = 'PAX left: ' + paxLeft() + ' / ' + tierPax();
      var hh = '<p class="m-hint"><b>' + esc(origin || 'Your Origin') + '</b> grants <b>one free Grade</b> in a Kit power; each additional power costs its PAX-per-Grade. Tick the powers you start with at Grade 1 — add or upgrade more from the sheet later.</p>';
      if (!kitPowers.length) {
        hh += '<p class="m-hint">This Origin has an open Kit — add Powers from the sheet after you finish.</p>';
        b.innerHTML = hh;
      } else {
        hh += '<div style="display:flex;flex-direction:column;gap:5px;">' + kitPowers.map(function (p) {
          var per = parseInt(p.paxPerGrade, 10) || 0;
          return '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#ddd;border:1px solid #26314a;border-radius:5px;padding:7px 9px;cursor:pointer;">'
            + '<input type="checkbox" class="jlub-pw" data-n="' + esc(p.name) + '"' + (chosenPowers[p.name] ? ' checked' : '') + ' style="margin-top:2px;">'
            + '<span><b>' + esc(p.name) + '</b> <span style="color:#9fb0d6;font-size:11px;">' + esc(p.category || '') + ' · ' + per + ' PAX/Grade</span>'
            + (p.summary ? '<br><span style="color:#9fb0d6;font-size:11px;">' + esc(p.summary) + '</span>' : '') + '</span></label>';
        }).join('') + '</div>';
        b.innerHTML = hh;
        b.querySelectorAll('.jlub-pw').forEach(function (c) {
          c.addEventListener('change', function () { if (c.checked) chosenPowers[c.dataset.n] = true; else delete chosenPowers[c.dataset.n]; render(); });
        });
      }
    }
    if (keep) b.scrollTop = bScroll;
    _lastStep = step; ov.classList.add('open');
  }

  function readIdentity() {
    if ($('jlub-name')) name = $('jlub-name').value;
    if ($('jlub-secret')) secret = $('jlub-secret').value;
    if ($('jlub-origin')) { var no = $('jlub-origin').value; if (no !== origin) { origin = no; chosenPowers = {}; } }
    if ($('jlub-arch')) arch = $('jlub-arch').value;
  }

  function finish() {
    var built = {
      system: 'JLU', tier: tier || 'D', name: name || '', secret: secret || '',
      origin: origin || '', arch: arch || '',
      attrs: { potency: 0, accuracy: 0, agility: 0, resistance: 0, mind: 0, spirit: 0 },
      resBuy: 0, condLevel: 0,
      ddie: '1d6', datt: 'Potency', dmod: 0, paxTotal: null,
      powers: [], knowledge: [], traits: [], limitations: [], equipment: [],
      weakness: '', soul: '', notes: ''
    };
    ATTR_ORDER.forEach(function (k) { built.attrs[k] = attrs[k] || 0; });
    Object.keys(chosenPowers).forEach(function (nm) { if (chosenPowers[nm]) built.powers.push({ name: nm, grade: 1 }); });
    var t = tObj(built.tier);
    built.resCur = (t ? (parseInt(t.resolve, 10) || 0) : 0) + (built.attrs.spirit || 0);
    var prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    built.campaign = prev.campaign || null;
    applySheet(built);
    if (typeof saveSheet === 'function') saveSheet(true);
    if (typeof syncDocTitle === 'function') syncDocTitle();
    if (typeof addLog === 'function') addLog('Character built', '✓', (name || 'Unnamed') + ' — Tier ' + built.tier + (origin ? ' ' + origin : ''), 'crit');
  }

  window.JLUB = {
    launch: function () { step = 0; tier = ''; origin = ''; arch = ''; name = ''; secret = ''; attrs = {}; chosenPowers = {}; _lastStep = -1; render(); },
    close: function () { if (ov) ov.classList.remove('open'); },
    next: function () {
      if (step === 0 && !tier) { $('jlub-note').textContent = 'Pick a Tier first'; return; }
      if (step === 1) { readIdentity(); if (!origin) { $('jlub-note').textContent = 'Pick an Origin first'; return; } }
      if (step === STEPS.length - 1) { finish(); this.close(); return; }
      step++; render();
    },
    back: function () { if (step === 1) readIdentity(); if (step > 0) { step--; render(); } }
  };
})();
