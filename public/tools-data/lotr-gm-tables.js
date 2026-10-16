// The Lord of the Rings Roleplaying (5E) — GM Screen tool suite.
//
// Loremaster tools for the GM Screen's Generators window, driven by the window's
// Roll button (window.lotrGenPanel) and by each panel's own buttons:
//   lotrtreasure  Hoard roller (lesser / greater / marvellous → gold, magic d20s,
//                 blessings, Greed Shadow) + precious object + curse, feeding the
//                 shared gear-drop list below it.
//   lotrjourney   Journey event roller (region adv/dis, d3 target role, terrain
//                 DC, season note, fatigue running total, scene idea).
//   lotrcouncil   Council helper (attitude → DC, request → successes, intro result,
//                 progress, outcome + XP).
//   lotreye       Eye Awareness tracker (start calculator, increases, Hunt
//                 threshold by region, Revelation episode on reveal).
//   lotrnameless  Nameless Thing generator (every table → a full stat block that
//                 can be sent to the combat tracker).
//   lotrnpc       NPC generator for Eriador (culture name lists, occupation, two
//                 distinctive features — how the rulebook sketches folk).
//   lotrshadow    Shadow quick reference.  lotrpatron  Patron quick reference.
//
// Numbers and table entries come from /tools-data/lotr-data.js (window.LOTR_*),
// which is a paraphrased data layer; the few lists defined here are our own.
// Every LOTR_* read is guarded — the GM Screen serves only the linked system's
// data files, so these globals may be absent.
(function () {
  'use strict';
  var W = window;
  function G(k) { return (typeof W[k] !== 'undefined' && W[k]) ? W[k] : null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function r(n) { return 1 + Math.floor(Math.random() * n); }
  function pick(a) { return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ''; }
  function num(x) { var n = parseInt(String(x == null ? '' : x).replace('−', '-').replace(/[^\d-]/g, ''), 10); return isNaN(n) ? 0 : n; }
  function rollExpr(expr) {
    var m = /(\d+)d(\d+)\s*([+\-−]\s*\d+)?/.exec(String(expr || ''));
    if (!m) return { total: 0, dice: [] };
    var dice = []; for (var i = 0; i < +m[1]; i++) dice.push(r(+m[2]));
    var t = dice.reduce(function (a, b) { return a + b; }, 0) + (m[3] ? parseInt(m[3].replace('−', '-').replace(/\s+/g, ''), 10) : 0);
    if (/min 0/.test(String(expr))) t = Math.max(0, t);
    return { total: t, dice: dice };
  }
  function regionKey(rg) { return /border/i.test(rg || '') ? 'border' : /dark/i.test(rg || '') ? 'dark' : 'wild'; }
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  // ── Our own short lists ──
  var TABLES = {
    occupations: ['Farmer', 'Innkeeper', 'Pedlar', 'Hunter', 'Shepherd', 'Smith', 'Miller', 'Ferryman', 'Woodcutter', 'Brewer',
      'Night-watchman', 'Herb-wife', 'Potter', 'Carter', 'Fisher', 'Stonemason', 'Pipe-weed grower', 'Bounder', 'Messenger', 'Tinker',
      'Wandering minstrel', 'Beekeeper', 'Ostler', 'Trapper', 'Wool-merchant', 'Toll-keeper', 'Charcoal-burner', 'Old soldier', 'Healer', 'Lore-keeper'],
    wants: ['Safe roads to market', 'News of a missing kinsman', 'Revenge on raiders', 'To be left alone', 'A fair price', 'Help with a sick beast',
      'Word sent to a distant friend', 'Something old dug out of the barrow-field', 'To see the world before the end', 'To keep a secret buried'],
    shadowTips: ['Ask for the save before the narration — failure colours the scene.', 'Misdeeds never get a save: warn the player first.',
      'Spiritual recovery happens only in a Fellowship Phase.', 'A Shadow Scar counts as Shadow until healed at Yule.']
  };

  // "Strike Fear — 1 Shadow (Dread), DC 13 CHA save · …" from a LotR stat block.
  function shadowSummary(m) {
    var ABB = { strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA' };
    var out = [];
    [].concat(m.traits || [], m.actions || [], m.bonusActions || [], m.reactions || []).forEach(function (t) {
      var d = String((t && t.description) || '');
      var x = /(?:gains?\s+)?(\d+|half[^.]*?bonus[^.]*?)\s+Shadow points?\s+(?:from|\()\s*(Dread|Sorcery|Greed|Misdeeds?)/i.exec(d);
      if (!x) return;
      var dc = /resisted by a (?:DC\s*(\d+)\s+)?(\w+)/i.exec(d.slice(x.index).split('.')[0]);
      var amt = /^\d+$/.test(x[1]) ? x[1] : '½ PB';
      out.push(t.name + ' — ' + amt + ' Shadow (' + x[2] + ')' + (dc ? ', ' + (dc[1] ? 'DC ' + dc[1] + ' ' : '') + (ABB[String(dc[2]).toLowerCase()] || dc[2]) + ' save' : ''));
    });
    return out.join(' · ');
  }

  // ── Card markup (the GM Screen's .gen-card family) ──
  function card(name, tag, body, extra) {
    return '<div class="gen-card lotr-gen-card' + (extra ? ' ' + extra : '') + '"><div class="gen-card-header"><span class="gen-card-name">' + esc(name) + '</span>'
      + (tag ? '<span class="gen-card-tag">' + esc(tag) + '</span>' : '') + '</div>' + (body || '') + '</div>';
  }
  function row(label, html) { return '<div class="gen-card-row"><span class="gen-card-row-label">' + esc(label) + '</span><span>' + html + '</span></div>'; }
  function hr() { return '<hr class="gen-card-divider">'; }
  function chip(t, cls) { return '<span class="lotr-chip' + (cls ? ' ' + cls : '') + '">' + t + '</span>'; }
  function out(panel) { return panel && panel.querySelector('.lotr-out'); }
  function val(panel, sel, d) { var el = panel && panel.querySelector(sel); return el ? (el.type === 'checkbox' ? el.checked : el.value) : d; }
  function missing(panel) { var o = out(panel); if (o) o.innerHTML = '<div class="gen-empty">The Lord of the Rings data did not load — open the GM Screen from a LotR campaign.</div>'; }

  // ══ HOARD (lotrtreasure) ══
  function blessings(n) {
    var T = G('LOTR_TREASURE'); if (!T) return { skills: [], object: '' };
    var skills = [], obj = '', guard = 0, rolls = [];
    while (skills.length < n && guard++ < 30) {
      var d = r(20), b = T.blessings[d - 1]; rolls.push(d);
      if (!b || /twice/i.test(b.skill) || skills.indexOf(b.skill) >= 0) continue;
      skills.push(b.skill);
      if (!obj) obj = pick(String(b.objects || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean));
    }
    return { skills: skills, object: obj, rolls: rolls };
  }
  function precious() {
    var T = G('LOTR_TREASURE'); if (!T || !T.precious) return '';
    var P = T.precious;
    return pick(P.form) + ' of ' + String(pick(P.material)).toLowerCase() + ' — ' + pick(P.craft) + ' work';
  }
  function curse() { var T = G('LOTR_TREASURE'); var c = T && pick(T.curses || []); return c ? { name: c.name, text: c.text } : null; }
  function famousSeed() {
    var craft = pick(['Elven', 'Dwarven', 'Númenórean']);
    var banes = craft === 'Elven' ? [pick(['Orcs', 'Wolves', 'Spiders'])] : craft === 'Númenórean' ? (function () { var a = ['Orcs', 'Trolls', 'Wolves', 'Evil Men', 'Undead']; var x = pick(a); return [x, pick(a.filter(function (z) { return z !== x; }))]; })() : [];
    var ER = G('LOTR_ENCHANTED_REWARDS'); var q = ER && ER.length ? pick(ER) : null;
    return craft + ' craftsmanship' + (banes.length ? ' · Bane of ' + banes.join(' & ') : '') + (q ? ' · quality: ' + (q.name || q) : '');
  }
  function rollHoard(rating) {
    var T = G('LOTR_TREASURE'); if (!T) return null;
    var h = T.hoards.filter(function (x) { return x.rating === rating; })[0] || T.hoards[0];
    var v = rollExpr(h.value), finds = [], greed = 0;
    for (var i = 0; i < h.magicRolls; i++) {
      var d = r(20);
      var row0 = T.magical.filter(function (m) { return d >= m.min && d <= m.max; })[0] || T.magical[0];
      var sh = rollExpr(row0.shadow); greed += sh.total;
      var f = { d: d, result: row0.result, shadow: sh.total, shadowExpr: row0.shadow };
      if (/Artefact/.test(row0.result)) f.bless = blessings(1);
      else if (/Wondrous/.test(row0.result)) f.bless = blessings(2);
      else if (/Famous/.test(row0.result)) f.famous = famousSeed();
      finds.push(f);
    }
    return { h: h, value: v.total, dice: v.dice, finds: finds, greed: greed };
  }
  function bdie() { var T = G('LOTR_TREASURE'); return T ? T.blessingDie.map(function (b) { return 'PB +' + b.pb + ' → ' + b.die; }).join(' · ') : ''; }
  function hoardPanel(panel) {
    var o = panel.querySelector('.lotr-hoard-out'); if (!o) return;
    var res = rollHoard(val(panel, '.lh-rating', 'Lesser'));
    if (!res) { o.innerHTML = '<div class="gen-empty">Treasure tables did not load.</div>'; return; }
    var withCurse = !!val(panel, '.lh-cursed', false);
    var body = row('Value', '<b>' + res.value + ' g</b> <span class="lotr-dim">(' + esc(res.h.value) + ': ' + res.dice.join(' + ') + ') — split among the Company</span>')
      + row('Greed', 'Shadow <b>' + res.greed + '</b> to whoever claims it · <b>WIS save DC ' + res.h.greedDC + '</b> <span class="lotr-dim">(success −1, by 5+ −2)</span>');
    body += hr();
    res.finds.forEach(function (f, i) {
      var txt = '<span class="lotr-dim">d20 ' + f.d + ' →</span> <b>' + esc(f.result) + '</b>';
      if (f.bless && f.bless.skills.length) txt += '<br>' + esc(f.bless.object || 'object') + ' blessed with <b>' + esc(f.bless.skills.join(' & ')) + '</b>';
      if (f.famous) txt += '<br>' + esc(f.famous) + ' <span class="lotr-dim">(or take it from the Treasure Index)</span>';
      txt += '<br><span class="lotr-dim">Greed for this find: ' + esc(f.shadowExpr) + ' = ' + f.shadow + '</span>';
      body += row('Magic ' + (i + 1), txt);
    });
    if (res.finds.some(function (f) { return f.bless; })) body += row('Blessing die', esc(bdie()));
    var c = withCurse ? curse() : null;
    if (c) body += hr() + row('Curse', '<b>' + esc(c.name) + '</b> — ' + esc(c.text));
    o.innerHTML = card(res.h.rating + ' hoard', res.h.examples || '', body, 'lotr-hoard-card');
    panel._lotrHoard = { res: res, curse: c };
    var st = panel.querySelector('.lotr-hoard-status'); if (st) st.textContent = '';
  }
  // Push the rolled hoard into the shared drop list (the .xs-tr-* rows below).
  function hoardToDrop(panel) {
    var st = panel.querySelector('.lotr-hoard-status');
    var hd = panel._lotrHoard; if (!hd) { if (st) st.textContent = 'Roll a hoard first.'; return; }
    var add = panel.querySelector('.xs-tr-add'), body = panel.querySelector('.xs-tr-body');
    if (!add || !body) return;
    function addRow(name, qty, notes, cat) {
      add.click();
      var tr = body.lastElementChild; if (!tr) return;
      var inp = tr.querySelectorAll('input');
      inp[0].value = name; inp[1].value = String(qty); inp[2].value = notes || '';
      if (cat) tr.dataset.cat = cat;
    }
    addRow('Gold', hd.res.value, 'g · ' + hd.res.h.rating + ' hoard · Greed WIS DC ' + hd.res.h.greedDC, 'gold');
    hd.res.finds.forEach(function (f) {
      if (f.bless && f.bless.skills.length) addRow((/Wondrous/.test(f.result) ? 'Wondrous ' : 'Marvellous ') + (f.bless.object || 'item'), 1, 'Blessed: ' + f.bless.skills.join(' & ') + (hd.curse ? ' · cursed?' : ''), 'magic');
      else if (f.famous) addRow('Famous weapon or armour', 1, f.famous, 'magic');
    });
    if (st) st.textContent = 'Added to the drop list below — name it, then Send Drop.';
  }
  function hoardPrecious(panel) {
    var o = panel.querySelector('.lotr-hoard-out'); if (!o) return;
    var p = precious(); if (!p) return;
    o.insertAdjacentHTML('afterbegin', card('Precious object', 'd6 × 3', row('Find', esc(p))));
  }
  function hoardCurse(panel) {
    var o = panel.querySelector('.lotr-hoard-out'); if (!o) return;
    var c = curse(); if (!c) return;
    var T = G('LOTR_TREASURE');
    o.insertAdjacentHTML('afterbegin', card('Curse — ' + c.name, '', row('Effect', esc(c.text)) + (T && T.curseNote ? row('Trigger', '<span class="lotr-dim">' + esc(T.curseNote) + '</span>') : '')));
  }

  // ══ JOURNEY (lotrjourney) ══
  function journeyState(panel) { if (!panel._lj) panel._lj = { events: [], fat: 0 }; return panel._lj; }
  function journeyRender(panel, latest) {
    var J = G('LOTR_JOURNEY'); var o = out(panel); if (!o || !J) return;
    var s = journeyState(panel);
    var region = val(panel, '.lj-region', 'Wild Land'), season = val(panel, '.lj-season', 'Summer'), terrain = val(panel, '.lj-terrain', 'Open terrain');
    var tdc = (J.terrainDC.filter(function (t) { return t.terrain === terrain; })[0] || J.terrainDC[1]).dc;
    var cold = /autumn|winter/i.test(season);
    var h = '';
    if (latest) {
      var e = latest;
      var b = row('d20', (e.rolls.length > 1 ? '[' + e.rolls.join(', ') + '] → ' : '') + '<b>' + e.d20 + '</b> <span class="lotr-dim">(' + esc(e.mode) + ')</span>')
        + row('Target', '<b>' + esc(e.role) + '</b> — ' + esc(e.check) + ' <b>DC ' + tdc + '</b>' + (cold ? ' <span class="lotr-warn">with disadvantage (' + esc(season) + ')</span>' : ''))
        + row('Effect', esc(e.effect))
        + (e.idea ? row('Idea', '<i>' + esc(e.idea) + '</i>') : '')
        + row('Fatigue', '+' + e.fatigue + ' → running fatigue save <b>DC ' + (10 + s.fat) + '</b> CON');
      h += card(e.name, region + ' · ' + terrain, b, 'lotr-journey-card');
    }
    var list = s.events.map(function (e, i) { return '<div class="lotr-jrow"><span class="lotr-dim">' + (i + 1) + '.</span> d20 ' + e.d20 + ' — <b>' + esc(e.name) + '</b> · ' + esc(e.role) + ' <span class="lotr-dim">+' + e.fatigue + '</span></div>'; }).join('');
    h += card('This journey', s.events.length + ' event' + (s.events.length === 1 ? '' : 's'),
      row('Fatigue save', '<b>DC ' + (10 + s.fat) + '</b> Constitution at journey’s end <span class="lotr-dim">(fail: 1 exhaustion · by 5+: 2 · by 10+: 3; a mount ridden half the way adds its CON mod)</span>')
      + row('Pathfinding', 'Guide: DC 15 WIS (Travel) — fail by 5+: event in 1 hex · fail: 2 · success: 3 · by 5+: 4')
      + row('Region', esc(J.regionMod || ''))
      + (list ? hr() + list : ''));
    o.innerHTML = h;
  }
  function journeyRoll(panel) {
    var J = G('LOTR_JOURNEY'); if (!J) return missing(panel);
    var s = journeyState(panel);
    var region = val(panel, '.lj-region', 'Wild Land'), k = regionKey(region);
    var a = r(20), b = r(20);
    var d20 = k === 'border' ? Math.max(a, b) : k === 'dark' ? Math.min(a, b) : a;
    var ev = J.events.filter(function (e) { return d20 >= e.min && d20 <= e.max; })[0] || J.events[0];
    var t = J.eventTarget[r(3) - 1];
    var e = { d20: d20, rolls: k === 'wild' ? [a] : [a, b], mode: k === 'border' ? 'advantage — Border Land' : k === 'dark' ? 'disadvantage — Dark Land' : 'Wild Land',
      name: ev.name, effect: ev.effect, fatigue: ev.fatigue, role: t.role, check: t.check, idea: pick((J.eventIdeas || {})[ev.name] || []) };
    s.events.push(e); s.fat += ev.fatigue;
    journeyRender(panel, e);
  }
  function journeyReset(panel) { panel._lj = { events: [], fat: 0 }; journeyRender(panel, null); }

  // ══ COUNCIL (lotrcouncil) ══
  function councilState(panel) { if (!panel._lc) panel._lc = { intro: '', succ: 0, fails: 0, outcome: '' }; return panel._lc; }
  function councilRender(panel) {
    var C = G('LOTR_COUNCIL'); var o = out(panel); if (!o) return; if (!C) return missing(panel);
    var s = councilState(panel);
    var at = C.attitudes.filter(function (a) { return a.name === val(panel, '.lc-att', 'Open'); })[0] || C.attitudes[1];
    var rq = C.requests.filter(function (q) { return q.name === val(panel, '.lc-req', 'Reasonable'); })[0] || C.requests[0];
    var xr = C.xp.filter(function (x) { return x.audience === at.name; })[0] || {};
    var cell = String(xr[rq.name.toLowerCase()] || ''), m = /([\d,]+)\s*\(([\d,]+)\)/.exec(cell);
    var xpS = m ? m[1] : cell, xpW = m ? m[2] : '0';
    var INTRO = { fail5: 'Failed by 5+ — disadvantage on every Interaction check.', fail: 'Failed — no rerolls.', ok: 'Success — reroll one failed Interaction check.', ok5: 'Success by 5+ — reroll up to two failed Interaction checks.' };
    var pips = ''; for (var i = 0; i < rq.successes; i++) pips += '<span class="lotr-pip' + (i < s.succ ? ' on' : '') + '"></span>';
    var done = s.succ >= rq.successes;
    var oc = s.outcome || (done ? 'success' : '');
    var OUT = { success: C.outcomes[0], woe: C.outcomes[1], disaster: C.outcomes[2] };
    var body = row('Audience', '<b>' + esc(at.name) + '</b> — Interaction checks <b>DC ' + at.dc + '</b>')
      + row('Request', '<b>' + esc(rq.name) + '</b> — needs <b>' + rq.successes + '</b> success' + (rq.successes === 1 ? '' : 'es'))
      + row('Introduction', s.intro ? esc(INTRO[s.intro]) : '<span class="lotr-dim">DC 15 Charisma (Intimidation, Persuasion or Deception) — mark the result below.</span>')
      + row('Progress', pips + ' <span class="lotr-dim">' + s.succ + ' / ' + rq.successes + (s.fails ? ' · ' + s.fails + ' failed' : '') + '</span>')
      + row('Disaster at', 'a check that fails by <b>' + (rq.name === 'Outrageous' ? 5 : 10) + '+</b>');
    if (oc && OUT[oc]) body += hr() + row(OUT[oc].name, esc(OUT[oc].text)) + row('XP', oc === 'success' ? '<b>' + esc(xpS) + '</b> split among the heroes present' : oc === 'woe' ? '<b>' + esc(xpW) + '</b> split among the heroes present' : '0');
    else body += hr() + row('XP', 'Success <b>' + esc(xpS) + '</b> · with woe <b>' + esc(xpW) + '</b> <span class="lotr-dim">(only if the council carried real risk)</span>');
    o.innerHTML = card('Council', at.name + ' · ' + rq.name, body, 'lotr-council-card');
  }
  function councilAct(panel, act) {
    var s = councilState(panel);
    if (/^(fail5|fail|ok|ok5)$/.test(act)) s.intro = act;
    else if (act === 'succ') { s.succ++; s.outcome = ''; }
    else if (act === 'unsucc') { s.succ = Math.max(0, s.succ - 1); s.outcome = ''; }
    else if (act === 'failchk') s.fails++;
    else if (act === 'success' || act === 'woe' || act === 'disaster') s.outcome = act;
    else if (act === 'reset') panel._lc = { intro: '', succ: 0, fails: 0, outcome: '' };
    councilRender(panel);
  }

  // ══ EYE AWARENESS (lotreye) ══
  var EYE_KEY = 'lotr_gm_eye';
  function eyeState() { return lsGet(EYE_KEY, { cur: 0, start: 0, log: [] }); }
  function eyeCalcStart(panel) {
    var base = val(panel, '.le-highelf', false) ? 3 : val(panel, '.le-elf', false) ? 2 : val(panel, '.le-dwarf', false) ? 1 : 0;
    return base + num(val(panel, '.le-pb4', 0)) + num(val(panel, '.le-famous', 0));
  }
  function eyeThreshold(panel) {
    var E = G('LOTR_EYE'); if (!E) return { hunt: 16, region: 'Wild Land', mod: 0 };
    var reg = val(panel, '.le-region', 'Wild Land');
    var th = E.thresholds.filter(function (t) { return t.region === reg; })[0] || E.thresholds[1];
    var mod = 0; [].forEach.call(panel.querySelectorAll('.le-mod:checked'), function (c) { mod += num((E.modifiers[+c.value] || {}).mod); });
    return { hunt: th.hunt + mod, base: th.hunt, region: th.region, mod: mod };
  }
  function eyeRender(panel, revealed) {
    var E = G('LOTR_EYE'); var o = out(panel); if (!o) return; if (!E) return missing(panel);
    var s = eyeState(), th = eyeThreshold(panel);
    var pct = Math.max(0, Math.min(100, th.hunt ? (s.cur / th.hunt) * 100 : 0));
    var body = '<div class="lotr-eye-meter"><div class="lotr-eye-num">' + s.cur + '<span> / ' + th.hunt + '</span></div>'
      + '<div class="lotr-eye-bar"><i style="width:' + pct + '%"></i></div></div>'
      + row('Start', '<b>' + s.start + '</b> <span class="lotr-dim">(reset value; recalc each Adventuring Phase)</span>')
      + row('Hunt', '<b>' + th.hunt + '</b> <span class="lotr-dim">' + esc(th.region) + ' ' + th.base + (th.mod ? (th.mod > 0 ? ' +' : ' ') + th.mod : '') + '</span>');
    if (revealed) body += hr() + '<div class="lotr-revealed">Revealed!</div>' + row(revealed.name, esc(revealed.text)) + row('Then', '<span class="lotr-dim">' + esc(E.revelationNote) + '</span>');
    if (s.log && s.log.length) body += hr() + '<div class="lotr-dim" style="font-size:11px;">' + s.log.slice(-8).map(esc).join(' · ') + '</div>';
    o.innerHTML = card('Eye Awareness', s.cur >= th.hunt ? 'HUNT THRESHOLD REACHED' : (th.hunt - s.cur) + ' to the Hunt', body, 'lotr-eye-card' + (revealed ? ' lotr-flash' : ''));
  }
  function eyeRevelation() { var E = G('LOTR_EYE'); return E ? pick(E.revelations) : null; }
  function eyeAdd(panel, n, why) {
    var s = eyeState(); s.cur = Math.max(0, s.cur + n); s.log = (s.log || []).concat([(n >= 0 ? '+' : '') + n + ' ' + why]).slice(-30);
    var th = eyeThreshold(panel), rev = null;
    if (n > 0 && s.cur >= th.hunt) { rev = eyeRevelation(); s.log.push('REVEALED — ' + (rev ? rev.name : '')); s.cur = s.start; }
    lsSet(EYE_KEY, s); eyeRender(panel, rev);
  }
  function eyeAct(panel, act) {
    var s = eyeState();
    if (act === 'start') { s.start = eyeCalcStart(panel); s.cur = s.start; s.log = ['Phase start: ' + s.start]; lsSet(EYE_KEY, s); return eyeRender(panel); }
    if (act === 'one') return eyeAdd(panel, 1, 'a d20 showed 1');
    if (act === 'shadow') { var x = Math.max(1, num(val(panel, '.le-shadow', 1))); return eyeAdd(panel, x, 'Shadow gained'); }
    if (act === 'm1') return eyeAdd(panel, 1, 'lesser magic');
    if (act === 'm2') return eyeAdd(panel, 2, 'major spell');
    if (act === 'm3') return eyeAdd(panel, 3, 'powerful spell');
    if (act === 'minus') return eyeAdd(panel, -1, 'adjust');
    if (act === 'reveal') { var rv = eyeRevelation(); s.cur = s.start; s.log = (s.log || []).concat(['REVEALED — ' + (rv ? rv.name : '')]); lsSet(EYE_KEY, s); return eyeRender(panel, rv); }
    if (act === 'reset') { s.cur = s.start; lsSet(EYE_KEY, s); return eyeRender(panel); }
    eyeRender(panel);
  }

  // ══ NAMELESS THING (lotrnameless) ══
  W.__lotrNamelessThings = W.__lotrNamelessThings || [];
  function sized(txt, huge) {
    return String(txt)
      .replace(/(\d+ ft\.)\s*\(Huge\)\s*\/\s*(\d+ ft\.)\s*\(Gargantuan\)/g, function (_, a, b) { return huge ? a : b; })
      .replace(/(\d+d\d+)\s*\/\s*(\d+d\d+)/g, function (_, a, b) { return huge ? a : b; })
      .replace(/(\d+ ft\.)\s*\/\s*(\d+ ft\.)/g, function (_, a, b) { return huge ? a : b; })
      .replace(/(\d+d\d+)\s*\((\d+d\d+)\)/g, function (_, a, b) { return huge ? a : b; });
  }
  function nameless(extraTraits) {
    var N = G('LOTR_NAMELESS'); if (!N) return null;
    var d12 = function (t) { return t[r(12) - 1]; };
    var title = d12(N.title1) + ' ' + d12(N.title2);
    var namedBy = d12(N.title3);
    var form = d12(N.form), aspect = d12(N.aspect), before = d12(N.before), first = d12(N.first);
    var sd = r(20);
    var st = N.stats.filter(function (s) { var p = String(s.d20).split(/[–-]/).map(Number); return sd >= p[0] && sd <= (p[1] || p[0]); })[0] || N.stats[0];
    var huge = st.size === 'Huge';
    var ab = {}; String(st.abilities).replace(/(STR|DEX|CON)\s+(\d+)/g, function (_, k, v) { ab[k] = +v; });
    ab.INT = 1; ab.WIS = 7; ab.CHA = 3;
    var crM = /^(\d+)\s*\(\+(\d+)\)/.exec(st.cr); var pb = crM ? +crM[2] : 2;
    var strMod = Math.floor(((ab.STR || 10) - 10) / 2);
    var atks = N.attacks.slice(); var prim = atks.splice(r(atks.length) - 1, 1)[0]; var sec = pick(atks);
    function atk(a, label) {
      var t = sized(a.text, huge).replace(/\+\s*STR/g, '+ ' + strMod);
      return { name: a.name + ' (' + label + ')', description: 'Melee Weapon Attack: +' + (pb + strMod) + ' to hit. ' + t };
    }
    var nT = Math.max(1, Math.min(3, extraTraits || 1)), traits = [], seen = {};
    for (var g = 0; traits.length < nT && g < 40; g++) {
      var td = r(20), tr = N.traits.filter(function (x) { return td >= x.min && td <= x.max; })[0];
      if (!tr || seen[tr.name]) continue; seen[tr.name] = 1;
      traits.push({ name: tr.name, description: tr.text.replace(/half its proficiency bonus/g, Math.floor(pb / 2) + ' (half its proficiency bonus)') + (/Strike Fear/.test(tr.name) ? ' Save DC ' + (8 + pb + strMod) + ' (8 + PB + STR).' : ''), d: td });
    }
    var cr = (crM ? (+crM[1] + traits.length) : st.cr);   // every rolled special trait raises CR by 1
    var hp = parseInt(st.hp, 10) || 100;
    var mon = {
      name: title + (W.__lotrNamelessThings.some(function (x) { return x.name === title; }) ? ' ' + (W.__lotrNamelessThings.length + 1) : ''),
      size: st.size, type: 'Monstrosity (Nameless Thing)', group: 'Nameless Things', ac: st.ac, hp: hp, hpFormula: st.hp, speed: '20 ft., burrow 10 ft., climb 20 ft., swim 20 ft.',
      abilities: ab, cr: String(cr), proficiencyBonus: pb, senses: 'Blindsight 120 ft., Passive Perception 8', languages: '—',
      conditionImmunities: 'charmed, exhaustion, frightened, paralyzed, petrified, poisoned',
      traits: [{ name: 'Amphibious', description: 'Breathes air and water.' }, { name: 'Sunlight Sensitivity', description: 'Disadvantage on attacks and sight-based checks in sunlight.' }]
        .concat(traits.map(function (t) { return { name: t.name, description: t.description }; })),
      actions: [{ name: 'Multiattack', description: 'One primary and one secondary natural-weapon attack.' }, atk(prim, 'primary'), atk(sec, 'secondary')],
      description: form + ' ' + aspect + '; named ' + namedBy + '. Before it comes: ' + before + '. First glimpse: ' + first + '.',
      _lotr: { sd: sd, namedBy: namedBy, form: form, aspect: aspect, before: before, first: first, traitRolls: traits.map(function (t) { return t.d; }) }
    };
    W.__lotrNamelessThings.push(mon);
    if (W.__lotrNamelessThings.length > 12) W.__lotrNamelessThings.shift();
    return mon;
  }
  function namelessCard(m) {
    var A = m.abilities, mod = function (v) { var x = Math.floor((v - 10) / 2); return (x >= 0 ? '+' : '') + x; };
    var stats = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(function (k) { return '<div class="gen-card-stat"><span class="gen-card-stat-label">' + k + '</span><span>' + A[k] + ' (' + mod(A[k]) + ')</span></div>'; }).join('');
    var body = '<div class="lotr-nt-flavour">' + esc(m.description) + '</div>'
      + '<div class="gen-card-stats">' + '<div class="gen-card-stat"><span class="gen-card-stat-label">AC</span><span>' + m.ac + '</span></div><div class="gen-card-stat"><span class="gen-card-stat-label">HP</span><span>' + esc(m.hpFormula) + '</span></div>' + stats + '</div>'
      + row('Speed', esc(m.speed)) + row('Senses', esc(m.senses)) + row('Immune', esc(m.conditionImmunities)) + hr()
      + m.traits.map(function (t) { return row(t.name, esc(t.description)); }).join('')
      + m.actions.map(function (a) { return row(a.name, esc(a.description)); }).join('')
      + '<div class="lotr-dim" style="font-size:11px;margin-top:4px;">Size roll d20 ' + m._lotr.sd + ' · trait roll' + (m._lotr.traitRolls.length > 1 ? 's' : '') + ' ' + m._lotr.traitRolls.join(', ') + ' · each extra trait +1 CR</div>'
      + '<div class="gen-card-actions"><button class="btn small primary gen-send-tracker" data-src="lotr" data-mon="' + esc(m.name) + '">Send to Tracker</button></div>';
    return card(m.name, m.size + ' · CR ' + m.cr, body, 'lotr-nt-card');
  }

  // ══ NPC (lotrnpc) ══
  function npc(cultureName, gender) {
    var CU = G('LOTR_CULTURES'), DF = G('LOTR_DISTINCTIVE_FEATURES'); if (!CU || !DF) return null;
    var c = cultureName ? (CU.filter(function (x) { return x.name === cultureName; })[0] || pick(CU)) : pick(CU);
    var g = gender === 'female' || gender === 'male' ? gender : (Math.random() < 0.5 ? 'female' : 'male');
    var names = String((c.names || {})[g] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var first = pick(names) || 'Nameless';
    var fam = String((c.names || {}).family || '');
    var name = first;
    if (/Hobbit|Bree/.test(c.name) && fam.indexOf(',') > 0) name = first + ' ' + pick(fam.split(',').map(function (s) { return s.trim(); }));
    else if (/Barding/.test(c.name)) name = first + ', ' + (g === 'female' ? 'daughter' : 'son') + ' of ' + pick(String(c.names.male || '').split(',').map(function (s) { return s.trim(); }));
    var lin = (c.lineages && c.lineages.length > 1) ? pick(c.lineages).name : '';
    var f1 = pick(DF), f2 = pick(DF.filter(function (x) { return x !== f1; }));
    return { name: name, culture: c.name, lineage: lin, gender: g, occupation: pick(TABLES.occupations), features: [f1, f2], want: pick(TABLES.wants) };
  }

  // ══ QUICK REFS ══
  function shadowRef(sub) {
    var S = G('LOTR_SHADOW'); if (!S) return '';
    var h = '';
    if (!sub || sub === 'sources') h += card('Sources of Shadow', 'save to resist', S.sources.map(function (s) { return row(s.name, '<b>' + esc(s.save) + '</b> — ' + esc(s.description)); }).join('') + hr() + S.rules.slice(0, 4).map(function (t) { return '<div class="lotr-dim" style="font-size:11.5px;margin:2px 0;">• ' + esc(t) + '</div>'; }).join(''));
    if (!sub || sub === 'dread') h += card('Dread', 'CHA save', S.dread.map(function (d) { return row(d.points + ' Shadow', esc(d.source) + ' <span class="lotr-dim">— e.g. ' + esc(d.example) + '</span>'); }).join(''));
    if (!sub || sub === 'misdeeds') h += card('Misdeeds', 'no save', S.misdeeds.map(function (d) { return row(String(d.points), esc(d.action)); }).join('') + row('Intent', '<span class="lotr-dim">' + esc(S.misdeedIntention) + '</span>'));
    if (!sub || sub === 'madness') h += card('Anguish & madness', 'Shadow Paths', (S.madness || []).map(function (t) { return '<div style="font-size:12px;margin:2px 0;">• ' + esc(t) + '</div>'; }).join('') + hr() + (S.paths || []).map(function (p) { return row(p.name, '<span class="lotr-dim">' + esc(p.calling) + ':</span> ' + esc((p.flaws || []).join(' → '))); }).join(''));
    return h;
  }
  function patronRef(name) {
    var P = G('LOTR_PATRONS'); if (!P) return '';
    return P.filter(function (p) { return !name || p.name === name; }).map(function (p) {
      return card(p.name, p.race + ' · Fellowship +' + p.fellowship,
        row('Callings', esc((p.callings || []).join(', '))) + row(p.advantage || 'Advantage', esc(p.advantageText)) + row('Agenda', esc(p.agenda)) + row('Find them', esc(p.where)) + hr() + '<div style="font-size:12px;" class="lotr-dim">' + esc(p.description) + '</div>');
    }).join('');
  }

  // ══ Panel driver (window Roll button) ══
  function qty(panel) { var q = panel && panel.querySelector('.lotr-qty'); return q ? Math.max(1, parseInt(q.value, 10) || 1) : 1; }
  W.lotrGenPanel = function (panel) {
    if (!panel) return;
    var kind = panel.dataset.panel, o = out(panel);
    try {
      if (kind === 'lotrtreasure') return hoardPanel(panel);
      if (kind === 'lotrjourney') return journeyRoll(panel);
      if (kind === 'lotrcouncil') return councilRender(panel);
      if (kind === 'lotreye') { var rv = eyeRevelation(); var o2 = out(panel); eyeRender(panel); if (o2 && rv) o2.insertAdjacentHTML('beforeend', card('Revelation episode', 'rolled', row(rv.name, esc(rv.text)))); return; }
      if (!o) return;
      if (kind === 'lotrnameless') {
        if (!G('LOTR_NAMELESS')) return missing(panel);
        var nt = num(val(panel, '.lotr-nt-traits', 1)) || 1, h = '';
        for (var i = 0; i < qty(panel); i++) { var m = nameless(nt); if (m) h += namelessCard(m); }
        o.innerHTML = h; return;
      }
      if (kind === 'lotrnpc') {
        if (!G('LOTR_CULTURES')) return missing(panel);
        var hh = '';
        for (var j = 0; j < qty(panel); j++) {
          var n = npc(val(panel, '.lotr-npc-culture', ''), val(panel, '.lotr-npc-gender', ''));
          if (!n) continue;
          hh += card(n.name, n.culture + (n.lineage ? ' · ' + n.lineage : ''),
            row('Occupation', esc(n.occupation)) + row('Features', '<b>' + esc(n.features[0]) + '</b> and <b>' + esc(n.features[1]) + '</b>') + row('Wants', esc(n.want)));
        }
        o.innerHTML = hh; return;
      }
      if (kind === 'lotrshadow') { if (!G('LOTR_SHADOW')) return missing(panel); o.innerHTML = shadowRef(val(panel, '.lotr-ref-sub', '')); return; }
      if (kind === 'lotrpatron') { if (!G('LOTR_PATRONS')) return missing(panel); o.innerHTML = patronRef(val(panel, '.lotr-ref-sub', '')); return; }
    } catch (e) { if (o) o.innerHTML = '<div class="gen-empty">Could not roll: ' + esc(e.message) + '</div>'; }
  };

  // Inline buttons inside the LotR panels (delegated; panels are cloned per window).
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-lotr]');
    if (!b) return;
    var panel = b.closest('[data-panel]'); if (!panel) return;
    var a = b.getAttribute('data-lotr');
    if (a === 'hoard') return hoardPanel(panel);
    if (a === 'hoard-drop') return hoardToDrop(panel);
    if (a === 'precious') return hoardPrecious(panel);
    if (a === 'curse') return hoardCurse(panel);
    if (a === 'journey') return journeyRoll(panel);
    if (a === 'journey-reset') return journeyReset(panel);
    if (a.indexOf('council:') === 0) return councilAct(panel, a.slice(8));
    if (a.indexOf('eye:') === 0) return eyeAct(panel, a.slice(4));
  });
  document.addEventListener('change', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var panel = t.closest('[data-panel]'); if (!panel) return;
    var k = panel.dataset.panel;
    if (k === 'lotrcouncil' && /lc-/.test(t.className)) councilRender(panel);
    else if (k === 'lotreye' && /le-(region|mod)/.test(t.className)) eyeRender(panel);
    else if (k === 'lotrjourney' && /lj-/.test(t.className) && panel._lj) journeyRender(panel, null);
    else if ((k === 'lotrshadow' || k === 'lotrpatron') && /lotr-ref-sub/.test(t.className)) W.lotrGenPanel(panel);
  });
  // Fill the patron picker + eye modifier list once the panels exist.
  W.lotrPrimePanels = function (root) {
    var P = G('LOTR_PATRONS'), E = G('LOTR_EYE'), CU = G('LOTR_CULTURES');
    (root || document).querySelectorAll('.lotr-ref-sub.patrons').forEach(function (s) { if (P && s.options.length <= 1) s.insertAdjacentHTML('beforeend', P.map(function (p) { return '<option>' + esc(p.name) + '</option>'; }).join('')); });
    (root || document).querySelectorAll('.lotr-npc-culture').forEach(function (s) { if (CU && s.options.length <= 1) s.insertAdjacentHTML('beforeend', CU.map(function (c) { return '<option>' + esc(c.name) + '</option>'; }).join('')); });
    (root || document).querySelectorAll('.le-mods').forEach(function (d) { if (E && !d.children.length) d.innerHTML = E.modifiers.map(function (m, i) { return '<label class="lotr-ck"><input type="checkbox" class="le-mod" value="' + i + '"> <b>' + esc(m.mod) + '</b> ' + esc(m.text) + '</label>'; }).join(''); });
  };

  W.LOTR_GM_TABLES = TABLES;
  W.LOTR_GM = { shadowSummary: shadowSummary, rollHoard: rollHoard, nameless: nameless, npc: npc, precious: precious, curse: curse };
})();
