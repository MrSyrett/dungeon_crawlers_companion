// Justice League Unlimited character builder — the "Create" button on the hero
// sheet. Walks the Quickstart's SEVEN creation steps: 1) Tier, 2) Origin,
// 3) Archetype (take 2 of its abilities at Tier D), 4) Attributes, 5) Powers,
// 6) Knowledge/Traits/Limitation, 7) Final Details (Weakness, Soul) + optional
// Gear. Origin freebies (Blood of Krypton, Amazon Armor/Sword + Perennial/
// Affiliation, Human Versatility) are applied for FREE — no PAX. Hands the
// finished hero to applySheet(). Uses the sheet globals (JLU_* data, $, esc,
// applySheet, collectSheet, saveSheet, syncDocTitle, addLog, gearCats,
// gearItems) — load AFTER the sheet script.
(function () {
  'use strict';
  var STEPS = ['Tier', 'Origin', 'Archetype', 'Attributes', 'Powers', 'Skills', 'Details'];
  var ATTR_ORDER = ['potency', 'accuracy', 'agility', 'resistance', 'mind', 'spirit'];
  var ATTR_NAME = { potency: 'Potency', accuracy: 'Accuracy', agility: 'Agility', resistance: 'Resistance', mind: 'Mind', spirit: 'Spirit' };

  function G(x) { return (typeof x !== 'undefined' && Array.isArray(x)) ? x : []; }
  function tiers() { return G(typeof JLU_TIERS !== 'undefined' ? JLU_TIERS : undefined); }
  function origins() { return G(typeof JLU_ORIGINS !== 'undefined' ? JLU_ORIGINS : undefined); }
  function arches() { return G(typeof JLU_ARCHETYPES !== 'undefined' ? JLU_ARCHETYPES : undefined); }
  function powers() { return G(typeof JLU_POWERS !== 'undefined' ? JLU_POWERS : undefined); }
  function knows() { return G(typeof JLU_KNOWLEDGE !== 'undefined' ? JLU_KNOWLEDGE : undefined); }
  function traitsD() { return G(typeof JLU_TRAITS !== 'undefined' ? JLU_TRAITS : undefined); }
  function limsD() { return G(typeof JLU_LIMITATIONS !== 'undefined' ? JLU_LIMITATIONS : undefined); }
  function tObj(k) { return tiers().find(function (t) { return t.key === k; }) || null; }
  function oObj(n) { return origins().find(function (o) { return o.name === n; }) || null; }
  function aObj(n) { return arches().find(function (a) { return a.name === n; }) || null; }
  function pObj(n) { return powers().find(function (p) { return p.name === n; }) || null; }

  var step = 0, _lastStep = -1, ov = null;
  var tier = '', origin = '', arch = '', name = '', secret = '';
  var attrs = {};                 // {key: value in multiples of 3}
  var chosenPowers = {};          // {powerName: true}
  var archAbilities = [];         // [abilityName]
  var chosenKnow = [];            // [knowledgeName]
  var chosenTraits = [];          // [traitName]  (includes Origin-granted)
  var chosenLim = '';             // limitation type (single) or ''
  var weakness = '', soul = '';
  var boughtGear = [];            // [{name, note, paxCost, category}]
  var gearQuery = '', gearCat = '';

  function paxNum(c) { var m = String(c == null ? '' : c).match(/\d+/); return m ? parseInt(m[0], 10) : 0; }
  function equipPax() { return boughtGear.reduce(function (a, e) { return a + (e.paxCost || 0); }, 0); }

  function tierPax() { var t = tObj(tier); return t ? (parseInt(t.pax, 10) || 0) : 0; }
  function tierVal() { var t = tObj(tier); return t ? (parseInt(t.value, 10) || 0) : 0; }
  function attrLimit() { var t = tObj(tier); return t ? (t.attrLimit || 6) : 6; }
  function powerGradeCap() { var t = tObj(tier); return t ? (parseInt(t.powerLimit, 10) || 5) : 5; }
  function archAbilityCap() { return Math.max(2, 1 + tierVal()); }   // 2 at Tier D (value 1); +1 per Tier step

  // ── Origin freebies ──
  function originGivesFreePower() { return !!origin && origin !== 'Meta-Human'; }   // Meta-Human: Limitless Potential = no free Power
  function freeTraitSlots() { return origin === 'Human' ? 1 : 0; }                  // Human Versatility: 1 free Trait
  function freeKnowSlots() { return origin === 'Human' ? 1 : 0; }                   // Human Versatility: 1 free Knowledge
  function grantTraitsFor(o) { return o === 'Amazon' ? ['Perennial', 'Affiliation'] : []; }
  function grantedTraits() { return grantTraitsFor(origin); }
  function freeTraitCount() { return grantedTraits().length + freeTraitSlots(); }
  function canBuyOutside() { var o = oObj(origin); return !o || o.canBuyOutsideKit !== false; }

  function attrPax() { var n = 0; ATTR_ORDER.forEach(function (k) { n += ((attrs[k] || 0) / 3) * 5; }); return n; }
  function inKit(po) { var o = oObj(origin); if (!o) return true; var kit = o.powerKit || []; if (kit.indexOf('Any Superpower') >= 0 && po.category === 'Superpower') return true; return kit.indexOf(po.name) >= 0 || kit.indexOf(po.category) >= 0; }
  function powerPax() {
    var chosen = Object.keys(chosenPowers).filter(function (n) { return chosenPowers[n]; });
    var freeUsed = !originGivesFreePower(), n = 0;   // Meta-Human gets no free grade
    chosen.forEach(function (nm) {
      var po = pObj(nm); if (!po) return;
      var per = parseInt(po.paxPerGrade, 10) || 0;
      var cost = per * (inKit(po) ? 1 : 2);
      if (!freeUsed && inKit(po)) { freeUsed = true; cost = 0; }  // Origin's one free Grade
      n += cost;
    });
    return n;
  }
  function knowPax() { return Math.max(0, chosenKnow.length - freeKnowSlots()) * 4; }
  function traitPax() { return Math.max(0, chosenTraits.length - freeTraitCount()) * 4; }
  function paxSpent() { return attrPax() + powerPax() + knowPax() + traitPax() + equipPax(); }
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

  // Keep the Origin-granted traits present + free, without duplicating.
  function syncGrantedTraits() {
    var g = grantedTraits();
    // strip any grant-only traits from other origins that the player didn't add themselves
    chosenTraits = chosenTraits.filter(function (t) {
      var isAmazonGrant = (t === 'Perennial' || t === 'Affiliation');
      return !isAmazonGrant || g.indexOf(t) >= 0;
    });
    g.forEach(function (t) { if (chosenTraits.indexOf(t) < 0) chosenTraits.push(t); });
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
      b.innerHTML = '<p class="m-hint"><b>Step 1 — Tier.</b> Every Hero has a <b>Tier</b> (E–S) that sets your baseline stats and PAX budget. The Quickstart covers <b>D — Year One</b> and <b>C — Local Hero</b>.</p>'
        + '<div style="display:flex;flex-direction:column;gap:8px;">'
        + playable.map(function (t) {
          return '<div class="jlub-tier" data-t="' + esc(t.key) + '" style="border:1px solid ' + (tier === t.key ? '#2f6fed' : '#26314a') + ';background:' + (tier === t.key ? '#13294f' : '#0d1526') + ';border-radius:6px;padding:10px 12px;cursor:pointer;">'
            + '<div style="display:flex;justify-content:space-between;align-items:baseline;"><b style="font-family:\'Barlow Condensed\',sans-serif;font-size:16px;color:#eef;">' + esc(t.key) + ' — ' + esc(t.name) + '</b><span style="font-size:11px;color:#9fb0d6;">' + esc(t.label || '') + '</span></div>'
            + '<div style="font-size:11px;color:#9fb0d6;margin-top:4px;font-family:\'Share Tech Mono\',monospace;">' + (t.pax || 0) + ' PAX · Resolve ' + (t.resolve || 0) + ' · Defense ' + (t.defense || 0) + ' · Attr cap +' + (t.attrLimit || 6) + ' · Grade cap ' + (t.powerLimit || 2) + '</div></div>';
        }).join('') + '</div>';
      b.querySelectorAll('.jlub-tier').forEach(function (c) { c.addEventListener('click', function () { tier = c.dataset.t; if (archAbilities.length > archAbilityCap()) archAbilities = archAbilities.slice(0, archAbilityCap()); render(); }); });

    } else if (step === 1) {
      note.textContent = 'Name your Hero & choose an Origin';
      var os = origins();
      b.innerHTML = '<p class="m-hint"><b>Step 2 — Origin.</b> Name your Hero, then choose an <b>Origin</b> — where your powers come from. It sets your Power Kit and grants free features.</p>'
        + '<div class="m-lbl">Hero Name</div><input class="m-input" id="jlub-name" value="' + esc(name) + '" placeholder="Codename">'
        + '<div class="m-lbl">Secret Identity</div><input class="m-input" id="jlub-secret" value="' + esc(secret) + '" placeholder="Civilian name">'
        + '<div class="m-lbl">Origin</div><select class="m-input" id="jlub-origin"><option value="">— origin —</option>' + os.map(function (o) { return '<option value="' + esc(o.name) + '"' + (o.name === origin ? ' selected' : '') + '>' + esc(o.name) + '</option>'; }).join('') + '</select>'
        + '<div id="jlub-o-desc" style="font-size:12px;color:#9fb0d6;line-height:1.5;margin:8px 0;"></div>';
      $('jlub-name').addEventListener('input', function () { name = $('jlub-name').value; });
      $('jlub-secret').addEventListener('input', function () { secret = $('jlub-secret').value; });
      $('jlub-origin').addEventListener('change', function () {
        var no = $('jlub-origin').value;
        if (no !== origin) { origin = no; chosenPowers = {}; syncGrantedTraits(); }
        renderOriginDesc();
      });
      renderOriginDesc();

    } else if (step === 2) {
      var a = aObj(arch), cap = archAbilityCap();
      note.textContent = arch ? ('Abilities ' + archAbilities.length + ' / ' + cap) : 'Choose an Archetype';
      var as = arches();
      var h = '<p class="m-hint"><b>Step 3 — Archetype.</b> Your role and signature abilities. Choose <b>' + cap + '</b> of its abilities (free at Tier ' + esc(tier || 'D') + '). Its Drawback always applies.</p>'
        + '<div class="m-lbl">Archetype</div><select class="m-input" id="jlub-arch"><option value="">— archetype —</option>' + as.map(function (x) { return '<option value="' + esc(x.name) + '"' + (x.name === arch ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('') + '</select>'
        + '<div id="jlub-arch-body" style="margin-top:8px;"></div>';
      b.innerHTML = h;
      $('jlub-arch').addEventListener('change', function () { var na = $('jlub-arch').value; if (na !== arch) { arch = na; archAbilities = []; } renderArchBody(); note.textContent = arch ? ('Abilities ' + archAbilities.length + ' / ' + cap) : 'Choose an Archetype'; });
      renderArchBody();

    } else if (step === 3) {
      var lim = attrLimit(), left = paxLeft();
      note.textContent = 'PAX left: ' + left + ' / ' + tierPax();
      var h2 = '<p class="m-hint"><b>Step 4 — Attributes.</b> Attributes rise in <b>+3</b> steps — each costs <b>5 PAX</b>. The Tier ' + esc(tier) + ' cap is <b>+' + lim + '</b>. Leave PAX for Powers, Knowledge and Traits.' + (origin === 'Kryptonian' ? ' <i>Blood of Krypton adds +' + tierVal() + ' Potency on top, free.</i>' : '') + '</p>';
      h2 += '<div style="display:flex;flex-direction:column;gap:4px;">';
      ATTR_ORDER.forEach(function (k) {
        var v = attrs[k] || 0, bon = (origin === 'Kryptonian' && k === 'potency') ? tierVal() : 0;
        h2 += '<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:center;padding:3px 0;border-bottom:1px solid #1a2338;">'
          + '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:15px;color:#eef;">' + ATTR_NAME[k] + (bon ? ' <span style="color:#7db0f0;font-size:10px;">+' + bon + ' origin</span>' : '') + '</span>'
          + '<button class="jlub-attr" data-k="' + k + '" data-d="-3" style="width:26px;height:24px;background:#1f2a40;border:1px solid #34435f;color:#ddd;border-radius:3px;cursor:pointer;font-weight:700;"' + (v <= 0 ? ' disabled' : '') + '>−</button>'
          + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:15px;color:#7db0f0;min-width:34px;text-align:center;">' + (v >= 0 ? '+' : '') + v + '</span>'
          + '<button class="jlub-attr" data-k="' + k + '" data-d="3" style="width:26px;height:24px;background:#1f2a40;border:1px solid #34435f;color:#ddd;border-radius:3px;cursor:pointer;font-weight:700;"' + (v >= lim ? ' disabled' : '') + '>+</button></div>';
      });
      h2 += '</div><div style="margin-top:10px;font-family:\'Share Tech Mono\',monospace;font-size:12px;color:' + (left < 0 ? '#df8a8a' : '#9fb0d6') + ';">Attributes spend: ' + attrPax() + ' PAX</div>';
      b.innerHTML = h2;
      b.querySelectorAll('.jlub-attr').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.dataset.k, d = parseInt(btn.dataset.d, 10);
          var v = (attrs[k] || 0) + d; if (v < 0) v = 0; if (v > lim) v = lim; attrs[k] = v; if (!v) delete attrs[k]; render();
        });
      });

    } else if (step === 4) {
      renderPowersStep(b, note);

    } else if (step === 5) {
      renderSkillsStep(b, note);

    } else {
      renderDetailsStep(b, note);
    }
    if (keep) b.scrollTop = bScroll;
    _lastStep = step; ov.classList.add('open');
  }

  function renderOriginDesc() {
    var host = $('jlub-o-desc'); if (!host) return;
    var o = oObj(origin);
    if (!o) { host.innerHTML = ''; return; }
    var h = '<b style="color:#7db0f0;">' + esc(o.name) + '.</b> ' + esc(o.summary || '')
      + '<br><b style="color:#7db0f0;">Kit:</b> ' + esc((o.powerKit || []).join(', ')) + (o.canBuyOutsideKit ? '' : ' <span style="color:#df8a8a;">(kit only)</span>')
      + '<br><b style="color:#7db0f0;">Free Power:</b> ' + esc(o.freePower || 'None');
    if ((o.features || []).length) { h += '<br><b style="color:#7db0f0;">Features:</b><ul style="margin:4px 0 0 16px;padding:0;">' + o.features.map(function (f) { return '<li><b>' + esc(f.name) + '.</b> ' + esc(f.text) + '</li>'; }).join('') + '</ul>'; }
    if (o.limitation) h += '<div style="color:#df8a8a;margin-top:4px;"><b>Limitation:</b> ' + esc(o.limitation) + '</div>';
    var g = grantTraitsFor(origin);
    if (g.length) h += '<div style="color:#8fd0a0;margin-top:4px;">Grants free traits: ' + esc(g.join(', ')) + '.</div>';
    if (origin === 'Human') h += '<div style="color:#8fd0a0;margin-top:4px;">Versatility grants 1 free Knowledge + 1 free Trait (choose in Step 6).</div>';
    host.innerHTML = h;
  }

  function renderArchBody() {
    var host = $('jlub-arch-body'); if (!host) return;
    var a = aObj(arch), cap = archAbilityCap();
    if (!a) { host.innerHTML = '<div class="m-hint">Pick an Archetype to see its abilities.</div>'; return; }
    var h = '<div style="font-size:12px;color:#9fb0d6;margin-bottom:8px;">' + esc(a.summary || '') + (a.examples ? ' <i>e.g. ' + esc(a.examples) + '</i>' : '') + '</div>';
    h += '<div class="m-lbl">Choose ' + cap + ' abilities (' + archAbilities.length + '/' + cap + ')</div>';
    h += '<div style="display:flex;flex-direction:column;gap:5px;">' + (a.abilities || []).map(function (ab, ix) {
      var on = archAbilities.indexOf(ab.name) >= 0, full = archAbilities.length >= cap && !on;
      return '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#ddd;border:1px solid ' + (on ? '#2f6fed' : '#26314a') + ';border-radius:5px;padding:7px 9px;cursor:pointer;' + (full ? 'opacity:.45;' : '') + '">'
        + '<input type="checkbox" class="jlub-abil" data-ix="' + ix + '"' + (on ? ' checked' : '') + (full ? ' disabled' : '') + ' style="margin-top:2px;">'
        + '<span><b>' + esc(ab.name) + '</b><br><span style="color:#9fb0d6;font-size:11px;">' + esc(ab.text) + '</span></span></label>';
    }).join('') + '</div>';
    if (a.drawback) h += '<div style="margin-top:8px;border-left:2px solid #df8a8a;padding:6px 9px;font-size:12px;color:#e6b0a8;background:#2a1618;border-radius:4px;"><b>Drawback · ' + esc(a.drawback.name) + '.</b> ' + esc(a.drawback.text) + '</div>';
    host.innerHTML = h;
    host.querySelectorAll('.jlub-abil').forEach(function (c) {
      c.addEventListener('change', function () {
        var ix = parseInt(c.dataset.ix, 10), ab = (a.abilities || [])[ix]; if (!ab) return;
        var i = archAbilities.indexOf(ab.name);
        if (i >= 0) archAbilities.splice(i, 1);
        else { if (archAbilities.length >= cap) { c.checked = false; return; } archAbilities.push(ab.name); }
        renderArchBody();
        $('jlub-note').textContent = 'Abilities ' + archAbilities.length + ' / ' + cap;
      });
    });
  }

  function renderPowersStep(b, note) {
    var o = oObj(origin);
    var kit = o ? (o.powerKit || []) : [];
    var kitPowers = [];
    kit.forEach(function (entry) {
      if (entry === 'Any Superpower') { powers().filter(function (p) { return p.category === 'Superpower'; }).forEach(function (p) { kitPowers.push(p); }); return; }
      var po = pObj(entry);
      if (po) kitPowers.push(po);
      else powers().filter(function (p) { return p.category === entry; }).forEach(function (p) { kitPowers.push(p); });
    });
    var seen = {}; kitPowers = kitPowers.filter(function (p) { return seen[p.name] ? false : (seen[p.name] = true); });
    note.textContent = 'PAX left: ' + paxLeft() + ' / ' + tierPax();
    var freeNote = originGivesFreePower() ? '<b>' + esc(origin) + '</b> grants <b>one free Grade</b> in a Kit power; each additional power costs its PAX-per-Grade.' : '<b>Meta-Human</b> gets <b>no</b> free power — any Superpower is bought at normal cost.';
    var hh = '<p class="m-hint"><b>Step 5 — Powers.</b> ' + freeNote + ' Tick the powers you start with at Grade 1 — upgrade Grades later from the sheet (Tier ' + esc(tier) + ' Grade cap ' + powerGradeCap() + ').</p>';
    if (!kitPowers.length) {
      hh += '<p class="m-hint">This Origin has an open Kit — add Powers from the sheet after you finish.</p>';
      b.innerHTML = hh;
      return;
    }
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

  function renderSkillsStep(b, note) {
    syncGrantedTraits();
    note.textContent = 'PAX left: ' + paxLeft() + ' / ' + tierPax();
    var kFree = freeKnowSlots(), tFree = freeTraitCount();
    var hh = '<p class="m-hint"><b>Step 6 — Knowledge, Traits & a Limitation.</b> Knowledge and Traits cost <b>4 PAX</b> each' + ((kFree || tFree) ? ' (Origin gives ' + kFree + ' free Knowledge + ' + tFree + ' free Trait' + (tFree === 1 ? '' : 's') + ')' : '') + '. A Limitation is free flavour.</p>';
    // Knowledge
    hh += '<div class="m-lbl">Knowledge — 4 PAX each</div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
    knows().forEach(function (k) {
      var on = chosenKnow.indexOf(k.name) >= 0;
      hh += '<label style="display:flex;gap:6px;align-items:center;font-size:12px;color:#ddd;border:1px solid ' + (on ? '#2f6fed' : '#26314a') + ';border-radius:5px;padding:5px 8px;cursor:pointer;" title="' + esc(k.summary || '') + '"><input type="checkbox" class="jlub-kn" data-n="' + esc(k.name) + '"' + (on ? ' checked' : '') + '>' + esc(k.name) + '</label>';
    });
    hh += '</div>';
    // Traits
    hh += '<div class="m-lbl" style="margin-top:12px;">Traits — 4 PAX each</div><div style="display:flex;flex-wrap:wrap;gap:6px;">';
    traitsD().forEach(function (t) {
      var granted = grantedTraits().indexOf(t.name) >= 0, on = chosenTraits.indexOf(t.name) >= 0;
      hh += '<label style="display:flex;gap:6px;align-items:center;font-size:12px;color:#ddd;border:1px solid ' + (on ? '#2f6fed' : '#26314a') + ';border-radius:5px;padding:5px 8px;cursor:' + (granted ? 'default' : 'pointer') + ';' + (granted ? 'opacity:.85;' : '') + '" title="' + esc(t.text || '') + '"><input type="checkbox" class="jlub-tr" data-n="' + esc(t.name) + '"' + (on ? ' checked' : '') + (granted ? ' disabled' : '') + '>' + esc(t.name) + (granted ? ' <span style="color:#8fd0a0;font-size:10px;">free</span>' : '') + '</label>';
    });
    hh += '</div>';
    // Limitation
    hh += '<div class="m-lbl" style="margin-top:12px;">Limitation (choose one — free)</div>';
    hh += '<select class="m-input" id="jlub-lim"><option value="">— none —</option>' + limsD().map(function (l) { return '<option value="' + esc(l.name) + '"' + (chosenLim === l.name ? ' selected' : '') + '>' + esc(l.name) + '</option>'; }).join('') + '</select>';
    var limObj = limsD().find(function (l) { return l.name === chosenLim; });
    hh += '<div id="jlub-lim-desc" style="font-size:11px;color:#9fb0d6;margin-top:4px;">' + (limObj ? esc(limObj.text || limObj.summary || '') : '') + '</div>';
    b.innerHTML = hh;
    b.querySelectorAll('.jlub-kn').forEach(function (c) { c.addEventListener('change', function () { var n = c.dataset.n, i = chosenKnow.indexOf(n); if (c.checked && i < 0) chosenKnow.push(n); else if (!c.checked && i >= 0) chosenKnow.splice(i, 1); render(); }); });
    b.querySelectorAll('.jlub-tr').forEach(function (c) { c.addEventListener('change', function () { var n = c.dataset.n, i = chosenTraits.indexOf(n); if (c.checked && i < 0) chosenTraits.push(n); else if (!c.checked && i >= 0) chosenTraits.splice(i, 1); render(); }); });
    $('jlub-lim').addEventListener('change', function () { chosenLim = $('jlub-lim').value; render(); });
  }

  function renderDetailsStep(b, note) {
    note.textContent = 'PAX left: ' + paxLeft() + ' / ' + tierPax();
    var cats = (typeof gearCats === 'function') ? gearCats() : [];
    var catSel = (cats.length > 1)
      ? '<select class="m-input" id="jlub-gear-cat" style="max-width:160px;"><option value="">All categories</option>' + cats.map(function (c) { return '<option value="' + esc(c) + '"' + (gearCat === c ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select>' : '';
    b.innerHTML = '<p class="m-hint"><b>Step 7 — Final Details.</b> Your Hero\'s <b>Weakness</b> (what undoes them) and <b>Soul</b> (what drives them), then optional Gear.</p>'
      + '<div class="m-lbl">Weakness</div><textarea class="m-input" id="jlub-weak" style="min-height:56px;" placeholder="A flaw, a bane, a person…">' + esc(weakness) + '</textarea>'
      + '<div class="m-lbl">Soul</div><textarea class="m-input" id="jlub-soul" style="min-height:56px;" placeholder="Belief, bond, or drive…">' + esc(soul) + '</textarea>'
      + '<div class="m-lbl" style="margin-top:12px;">Gear — spend leftover PAX (optional)</div>'
      + '<div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;flex-wrap:wrap;">'
      + '<input class="m-input" id="jlub-gear-q" placeholder="Search gear…" value="' + esc(gearQuery) + '" style="flex:1;min-width:120px;">'
      + catSel
      + '<span id="jlub-gear-pax" style="font-family:\'Share Tech Mono\',monospace;font-size:12px;white-space:nowrap;color:' + (paxLeft() < 0 ? '#df8a8a' : '#7db0f0') + ';">PAX ' + paxLeft() + ' / ' + tierPax() + '</span>'
      + '</div>'
      + '<div class="brow-list" id="jlub-gear-list" style="max-height:200px;overflow:auto;border:1px solid #26314a;border-radius:6px;"></div>'
      + '<div class="m-lbl" style="margin-top:12px;">Your Gear</div>'
      + '<div id="jlub-gear-owned" style="display:flex;flex-direction:column;gap:5px;"></div>';
    $('jlub-weak').addEventListener('input', function () { weakness = $('jlub-weak').value; });
    $('jlub-soul').addEventListener('input', function () { soul = $('jlub-soul').value; });
    var qEl = $('jlub-gear-q'); if (qEl) qEl.addEventListener('input', function () { gearQuery = qEl.value; paintGearList(); });
    var cEl = $('jlub-gear-cat'); if (cEl) cEl.addEventListener('change', function () { gearCat = cEl.value; paintGearList(); });
    paintGearList(); paintGearOwned();
  }

  // ── Inline Gear shop (Details step) — paints in place, no popup ──
  function gearAll() { return (typeof gearItems === 'function') ? gearItems() : []; }
  function syncGearPax() {
    var el = $('jlub-gear-pax');
    if (el) { el.textContent = 'PAX ' + paxLeft() + ' / ' + tierPax(); el.style.color = paxLeft() < 0 ? '#df8a8a' : '#7db0f0'; }
    var note = $('jlub-note'); if (note && step === STEPS.length - 1) note.textContent = 'PAX left: ' + paxLeft() + ' / ' + tierPax();
  }
  function paintGearList() {
    var host = $('jlub-gear-list'); if (!host) return;
    var q = (gearQuery || '').toLowerCase().trim();
    var items = gearAll().filter(function (it) {
      if (gearCat && (it.cat || '') !== gearCat) return false;
      if (q && (it.name + ' ' + (it.meta || '') + ' ' + (it.desc || '')).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    host.innerHTML = '';
    if (!items.length) { host.innerHTML = '<div class="brow-empty">No matches.</div>'; return; }
    items.forEach(function (it) {
      var can = paxLeft() >= (it._cost || 0);
      var row = document.createElement('div'); row.className = 'brow-item';
      row.innerHTML = '<div class="brow-main"><div class="brow-name">' + esc(it.name) + (it.cost ? '<span class="brow-cost">' + esc(it.cost) + '</span>' : '') + '</div>'
        + (it.meta ? '<div class="brow-meta">' + esc(it.meta) + '</div>' : '')
        + (it.desc ? '<div class="brow-desc">' + esc(it.desc) + '</div>' : '') + '</div>'
        + '<button class="brow-add"' + (can ? '' : ' disabled title="Not enough PAX"') + '>' + (can ? 'Buy' : '✕') + '</button>';
      var btn = row.querySelector('.brow-add');
      if (can) btn.addEventListener('click', function () {
        var e = it._e || {};
        boughtGear.push({ name: e.name, note: e.text || '', paxCost: paxNum(e.cost), category: e.category || 'Gear' });
        paintGearList(); paintGearOwned(); syncGearPax();
      });
      host.appendChild(row);
    });
  }
  function paintGearOwned() {
    var host = $('jlub-gear-owned'); if (!host) return;
    host.innerHTML = '';
    if (!boughtGear.length) { host.innerHTML = '<div class="brow-empty" style="color:#8ba0c0;">No gear yet — optional.</div>'; return; }
    boughtGear.forEach(function (e, i) {
      var row = document.createElement('div'); row.className = 'gear-row';
      row.style.background = '#141c2e'; row.style.borderColor = '#26314a'; row.style.color = '#dde';
      row.innerHTML = '<span>' + esc(e.name) + (e.paxCost ? ' <span style="color:#7db0f0;">' + e.paxCost + ' PAX</span>' : '') + '</span>'
        + '<button class="row-x" style="color:#df8a8a;background:none;border:none;cursor:pointer;font-size:13px;">✕</button>';
      row.querySelector('.row-x').addEventListener('click', function () {
        boughtGear.splice(i, 1); paintGearList(); paintGearOwned(); syncGearPax();
      });
      host.appendChild(row);
    });
  }

  function readIdentity() {
    if ($('jlub-name')) name = $('jlub-name').value;
    if ($('jlub-secret')) secret = $('jlub-secret').value;
    if ($('jlub-origin')) { var no = $('jlub-origin').value; if (no !== origin) { origin = no; chosenPowers = {}; syncGrantedTraits(); } }
  }

  function finish() {
    syncGrantedTraits();
    var built = {
      system: 'JLU', tier: tier || 'D', name: name || '', secret: secret || '',
      origin: origin || '', arch: arch || '',
      attrs: { potency: 0, accuracy: 0, agility: 0, resistance: 0, mind: 0, spirit: 0 },
      resBuy: 0, condLevel: 0,
      ddie: '1d6', datt: 'Potency', dmod: 0, dr: 0, paxTotal: null,
      archAbilities: archAbilities.slice(), grantTraits: grantedTraits().slice(),
      powers: [], knowledge: chosenKnow.slice(), traits: chosenTraits.slice(),
      limitations: [], equipment: [],
      weakness: weakness || '', soul: soul || '', notes: ''
    };
    ATTR_ORDER.forEach(function (k) { built.attrs[k] = attrs[k] || 0; });
    Object.keys(chosenPowers).forEach(function (nm) { if (chosenPowers[nm]) built.powers.push({ name: nm, grade: 1 }); });
    if (chosenLim) built.limitations.push({ type: chosenLim, note: '' });
    built.equipment = boughtGear.map(function (e) { return { name: e.name, note: e.note || '', paxCost: e.paxCost || 0, category: e.category || 'Gear' }; });
    var t = tObj(built.tier);
    built.resCur = (t ? (parseInt(t.resolve, 10) || 0) : 0) + (built.attrs.spirit || 0);
    var prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    built.campaign = prev.campaign || null;
    applySheet(built);
    if (typeof saveSheet === 'function') saveSheet(true);
    if (typeof syncDocTitle === 'function') syncDocTitle();
    if (typeof addLog === 'function') addLog('Character built', '✓', (name || 'Unnamed') + ' — Tier ' + built.tier + (origin ? ' ' + origin : '') + (arch ? ' ' + arch : ''), 'crit');
  }

  window.JLUB = {
    launch: function () {
      step = 0; tier = ''; origin = ''; arch = ''; name = ''; secret = '';
      attrs = {}; chosenPowers = {}; archAbilities = []; chosenKnow = []; chosenTraits = []; chosenLim = '';
      weakness = ''; soul = ''; boughtGear = []; gearQuery = ''; gearCat = ''; _lastStep = -1; render();
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    next: function () {
      if (step === 0 && !tier) { $('jlub-note').textContent = 'Pick a Tier first'; return; }
      if (step === 1) { readIdentity(); if (!origin) { $('jlub-note').textContent = 'Pick an Origin first'; return; } }
      if (step === 2) { if (!arch) { $('jlub-note').textContent = 'Pick an Archetype first'; return; } if (archAbilities.length !== archAbilityCap()) { $('jlub-note').textContent = 'Choose exactly ' + archAbilityCap() + ' abilities'; return; } }
      if (step === STEPS.length - 1) { finish(); this.close(); return; }
      step++; render();
    },
    back: function () { if (step === 1) readIdentity(); if (step > 0) { step--; render(); } }
  };
})();
