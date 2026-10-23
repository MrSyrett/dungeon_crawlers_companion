// Pirate Borg character creation wizard (window.PBB).
// Walks the Player's Guidebook procedure (pg. 27) — class (d6, d8 with the optional
// Haunted Soul and Tall Tale, or a landlubber), abilities (3d6 each → modifier;
// landlubbers may roll 4d6 drop lowest — or, like the Shadowdark and D&D wizards, a
// standard array, which Pirate Borg doesn't print: see ARRAY below), HP and Devil's Luck, the class's weapon /
// clothing / hat dice, the class's starting feature rolls (with every sub-roll), the
// container / cheap / fancy gear tables, the background tables and the d66 name
// generator — with a "choose or roll" control at every step. Rules and tables come
// from window.PB_* (pb-data.js); the finished pirate is handed to the sheet through
// window.PBSHEET.applyBuild. Renders into #builder-overlay.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  function A(x) { return Array.isArray(x) ? x : []; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function jsq(s) { return esc(String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }
  function d(n) { return 1 + Math.floor(Math.random() * n); }
  function num(v, dv) { var n = parseInt(v, 10); return isNaN(n) ? (dv || 0) : n; }
  function SH() { return window.PBSHEET; }
  function log(l, r, dt, t) { if (SH()) SH().addLog(l, r, dt, t || 'normal'); }
  function sides(die) { var m = String(die || '').match(/d(\d+)/i); return m ? num(m[1]) : 0; }
  function inRoll(r, n) { return Array.isArray(r) ? (n >= r[0] && n <= r[1]) : n === r; }
  function rowFor(list, n) { return A(list).find(function (x) { return inRoll(x.roll, n); }) || null; }
  function rl(r) { return Array.isArray(r) ? (r[0] === r[1] ? r[0] : r[0] + '–' + r[1]) : r; }
  function sg(n) { n = num(n); return (n >= 0 ? '+' : '−') + Math.abs(n); }
  var ABIL = ['STRENGTH', 'AGILITY', 'PRESENCE', 'TOUGHNESS', 'SPIRIT'];
  var STEPS = ['Class', 'Abilities', 'HP & Luck', 'Weapon & Clothing', 'Class Features', 'Gear', 'Background', 'Name'];
  // House standard array (the book has none). Each is the expected sorted result of the
  // book's own roll for five abilities, rounded toward the player: 3d6 → +1.25, +0.44, 0,
  // −0.44, −1.25 → [+1, +1, 0, 0, −1]; a landlubber's 4d6-drop-lowest → +1.95, +1.15,
  // +0.55, +0.09, −0.55 → [+2, +1, +1, 0, −1]. Class modifiers apply afterwards, as for rolls.
  var ARRAY = [1, 1, 0, 0, -1], ARRAY_LAND = [2, 1, 1, 0, -1];
  var B = null, step = 0;

  function fresh() { return { cls: '', optional: false, ailment: '', base: '', variant: '', ancestry: '', animal: '',
    method: 'roll', drop4: false, rolls: {}, mods: {}, order: 'order', assign: [0, 1, 2, 3, 4], pool: null, hp: null, hpTxt: '', luck: null, luckTxt: '',
    weapon: null, weaponSub: '', trustedName: '', clothing: '', hat: '', monkeyWeapon: null, monkeySub: '',
    feats: {}, deity: '', prayer: '', spell: '', extraRelics: [], extraRituals: [],
    container: '', containerAlt: '', cheap: null, pet: '', fancy: null, fancySub: null,
    bg: '', silver: null, silverTxt: '', bgInstr: '', flaw: '', mark: '', idio: '', incident: '', thing: '',
    first: '', sex: 'any', surname: '', nick: '', name: '' }; }
  function C(id) { var cs = A(window.PB_CLASSES); if ((id || B.cls) === 'landlubber') return window.PB_LANDLUBBER; return cs.find(function (c) { return c.id === (id || B.cls); }) || null; }
  function normal() { return A(window.PB_CLASSES).filter(function (c) { return !c.optional; }); }
  function tall() { return C('tall-tale'); }
  function variant() { var t = tall(); return t ? A(t.variants).find(function (v) { return v.id === B.variant; }) || null : null; }
  function ancestry() { var v = variant(); return v && v.id === 'aquatic-mutant' ? A(v.table.rows).find(function (r) { return r.id === B.ancestry; }) || null : null; }
  function animal() { var v = variant(); return v && v.id === 'sentient-animal' ? A(v.table.rows).find(function (r) { return r.id === B.animal; }) || null : null; }
  function needsBase() { if (B.cls === 'haunted-soul') return true; var v = variant(); return !!(B.cls === 'tall-tale' && v && v.secondaryClass); }
  // The class whose abilities, dice and features apply.
  function M() { if (needsBase()) return B.base ? C(B.base) : null; if (B.cls === 'tall-tale') return null; return C(); }
  function isLand() { return B.cls === 'landlubber'; }
  function classMods() { var a = animal(); if (a) return a.abilities || {}; var m = M(); return (m && m.abilities) || {}; }
  function rawMod(sum) { var r = A(window.PB_ABILITY_TABLE).find(function (x) { return inRoll(x.roll, sum); }); return r ? r.mod : 0; }
  function arr() { return isLand() ? ARRAY_LAND : ARRAY; }
  // Which slot of the rolled pool / the array an ability takes: in order, or as assigned (swaps).
  function slotOf(a) { var i = ABIL.indexOf(a); return (B.method === 'array' || B.order === 'assign') ? B.assign[i] : i; }
  function baseMod(a) { if (B.method === 'manual') return B.mods[a] == null ? null : B.mods[a];
    if (B.method === 'array') return arr()[slotOf(a)];
    if (!B.pool) return null; var r = B.pool[slotOf(a)]; return r ? rawMod(r.sum) : null; }
  function finalMod(a) { var b = baseMod(a); if (b == null) return null; var v = b + num(classMods()[a]); var an = ancestry(); if (an) A(an.effects).forEach(function (e) { if (e.type === 'ability' && e.ability === a) v += num(e.value); }); return Math.max(-3, Math.min(6, v)); }
  function hpDie() { var a = animal(); if (a) return a.hpDie; var m = M(); return (m && m.hpDie) || 'd10'; }
  function luckDie() { var a = animal(); if (a) return a.luckDie || 'd4'; var m = M(); return (m && m.luckDie) || 'd2'; }
  function weaponSpec() { var a = animal(); if (a) return { natural: a.weapon, monkey: a.startingWeaponDie || null }; if (B.cls === 'tall-tale' && !needsBase()) return null; var m = M(); return m ? m.weapon : null; }
  function clothingDie() { if (animal()) return null; var m = M(); return m ? m.clothingDie : null; }
  function hatDie() { if (animal()) return null; var m = M(); return m ? m.hatDie : null; }
  function startTables() { var m = M(); if (!m || animal()) return []; return A(m.tables).filter(function (t) { return (t.when === 'start' || t.when === 'both') && t.id !== 'trustedWeapon'; }); }
  function chip(label, on, act, dis, title) { return '<button class="chip' + (on ? ' sel' : '') + '"' + (dis ? ' disabled' : '') + ' onclick="' + act + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + label + '</button>'; }
  function rollBtn(label, act) { return '<button class="m-btn ghost" style="padding:6px 12px;" onclick="' + act + '">🎲 ' + label + '</button>'; }
  function box(h) { return '<div class="res-box">' + h + '</div>'; }
  function sel(id, list, val, fn, fmt) { return '<select class="m-input" id="' + id + '" onchange="' + fn + '"><option value="">— choose —</option>' + list.map(function (x, i) { var v = fmt ? fmt(x, i) : x; return '<option value="' + i + '"' + (val === i ? ' selected' : '') + '>' + esc(v) + '</option>'; }).join('') + '</select>'; }
  function sw() { return window.PB_STARTING_WEAPONS || { rows: [] }; }

  function valid(i) {
    switch (i) {
      case 0: if (!B.cls) return false; if (B.cls === 'haunted-soul') return !!B.ailment && !!B.base;
        if (B.cls === 'tall-tale') { var v = variant(); if (!v) return false; if (v.id === 'sentient-animal') return !!B.animal; if (v.id === 'aquatic-mutant' && !B.ancestry) return false; return !!B.base; }
        return true;
      case 1: return ABIL.every(function (a) { return baseMod(a) != null; });
      case 2: return B.hp != null && B.luck != null;
      case 3: var ws = weaponSpec(); if (ws && !ws.natural && ws.fixed == null && !B.weapon) return false; if (ws && ws.monkey && !B.monkeyWeapon) return false;
        if (B.weapon && B.weapon.choice && !B.weaponSub) return false; if (B.monkeyWeapon && B.monkeyWeapon.choice && !B.monkeySub) return false;
        if (clothingDie() && !B.clothing) return false; if (hatDie() && !B.hat) return false; return true;
      case 4: return startTables().every(function (t) { if (t.id === 'deity') return !!B.deity; if (t.id === 'prayers') return !!B.prayer; if (t.id === 'spells') return !!B.spell; return !!B.feats[t.id]; });
      case 5: var c = A(window.PB_CONTAINERS).find(function (x) { return x.id === B.container; }); if (!c) return false;
        if (!B.cheap || !B.fancy) return false; if (B.cheap.table === 'pets' && !B.pet) return false; if (B.fancy.table && !B.fancySub) return false; return true;
      case 6: return !!B.bg && B.silver != null && (!bgDef() || !bgDef().table || !!B.bgInstr);
      case 7: return !!String(B.name).trim();
    }
    return true;
  }
  function allValid() { for (var i = 0; i < STEPS.length; i++) if (!valid(i)) return false; return true; }
  function render() {
    var h = '<div class="m-row" style="gap:4px;margin-bottom:12px;">' + STEPS.map(function (s, i) { return '<span style="font-family:var(--f-label);font-size:12.5px;padding:2px 8px;border-radius:12px;border:1px solid ' + (i === step ? 'var(--acc)' : '#3a2424') + ';color:' + (i === step ? '#ffd5c8' : '#a89a8a') + ';background:' + (i === step ? '#3a0f12' : 'transparent') + ';' + (i > step ? 'opacity:.5;' : '') + '"><span style="font-family:var(--f-num);">' + (i + 1) + '.</span> ' + esc(s) + '</span>'; }).join('') + '</div>';
    h += '<div style="font-family:var(--f-disp);font-size:27px;color:#fff;margin-bottom:6px;">' + esc(STEPS[step]) + '</div>' + page();
    // Same step re-rendered (a roll, a pick): keep the dialog where it was; a new step starts at the top.
    var bd = $('builder-body'), keep = bd._step === step ? bd.scrollTop : 0;
    bd.innerHTML = h; bd.scrollTop = keep; bd._step = step;
    $('builder-title').textContent = 'Create a Pirate';
    $('builder-ft').innerHTML = '<button class="m-btn ghost" onclick="PBB.back()"' + (step === 0 ? ' disabled' : '') + '>Back</button><span class="m-hint" style="margin:0;align-self:center;">' + (valid(step) ? '' : 'Finish this step to continue') + '</span>' +
      (step < STEPS.length - 1 ? '<button class="m-btn" onclick="PBB.next()"' + (valid(step) ? '' : ' disabled') + '>Next</button>' : '<button class="m-btn" onclick="PBB.finish()"' + (allValid() ? '' : ' disabled') + '>Create Pirate</button>');
  }

  function page() {
    switch (step) {
      case 0: return classPage(); case 1: return abilPage(); case 2: return hpPage(); case 3: return weaponPage();
      case 4: return featPage(); case 5: return gearPage(); case 6: return bgPage(); case 7: return namePage();
    }
    return '';
  }
  function classPage() {
    var h = '<p class="m-hint">Choose your class or roll for it — d6 for the six classes, d8 to include the optional Haunted Soul and Tall Tale — or play a landlubber with no class.</p><div class="m-row">' +
      A(window.PB_CLASSES).map(function (c) { return chip('<span style="font-family:var(--f-num);">' + c.roll + '.</span> ' + esc(c.name) + (c.optional ? ' <small>(optional)</small>' : ''), B.cls === c.id, "PBB.cls('" + c.id + "')"); }).join('') + chip('Landlubber', B.cls === 'landlubber', "PBB.cls('landlubber')") + '</div>' +
      '<div class="m-row" style="margin-top:8px;">' + rollBtn('d6 class', 'PBB.rollClass(6)') + rollBtn('d8 (with optional)', 'PBB.rollClass(8)') + '</div>';
    var c = C(); if (c) h += box('<b>' + esc(c.name) + '</b>' + (c.tagline ? ' — ' + esc(c.tagline) : '') + '<br>' + esc(c.text || '') + (c.hpDie ? '<br>HP ' + esc(c.hpDie) + ' ± TOUGHNESS · Devil\'s Luck ' + esc(c.luckDie) + (c.abilities ? ' · ' + ABIL.filter(function (a) { return c.abilities[a]; }).map(function (a) { return a + ' ' + sg(c.abilities[a]); }).join(', ') : '') : ''));
    if (B.cls === 'haunted-soul') {
      var ai = A((C().tables[0] || {}).rows);
      h += '<div class="m-lbl">Ailment (d6)</div><div class="m-row">' + ai.map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.name), B.ailment === r.id, "PBB.set('ailment','" + r.id + "')", false, r.short); }).join('') + rollBtn('d6 ailment', "PBB.rollSub('ailment')") + '</div>';
      var a = ai.find(function (r) { return r.id === B.ailment; }); if (a) h += box('<b>' + esc(a.name) + '</b> — ' + esc(a.text));
      h += baseClassPicker();
    }
    if (B.cls === 'tall-tale') {
      var t = tall();
      h += '<div class="m-lbl">Tall Tale (d6)</div><div class="m-row">' + A(t.variants).map(function (v) { return chip('<span style="font-family:var(--f-num);">' + rl(v.roll) + '.</span> ' + esc(v.name), B.variant === v.id, "PBB.variant('" + v.id + "')"); }).join('') + rollBtn('d6', "PBB.rollSub('variant')") + '</div>';
      var v = variant(); if (v) {
        h += box('<b>' + esc(v.name) + '</b> — ' + esc(v.text));
        if (v.id === 'aquatic-mutant') { h += '<div class="m-lbl">Ancestry (d8)</div><div class="m-row">' + A(v.table.rows).map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.name), B.ancestry === r.id, "PBB.set('ancestry','" + r.id + "')", false, r.text); }).join('') + rollBtn('d8', "PBB.rollSub('ancestry')") + '</div>'; var an = ancestry(); if (an) h += box('<b>' + esc(an.name) + '</b> — ' + esc(an.text)); }
        if (v.id === 'sentient-animal') { h += '<div class="m-lbl">Animal (d6)</div><div class="m-row">' + A(v.table.rows).map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.name), B.animal === r.id, "PBB.set('animal','" + r.id + "')"); }).join('') + rollBtn('d6', "PBB.rollSub('animal')") + '</div>';
          var am = animal(); if (am) h += box('<b>' + esc(am.name) + '</b> — ' + ABIL.map(function (x) { return x.slice(0, 3) + ' ' + sg(am.abilities[x]); }).join(' · ') + ' · HP ' + esc(am.hpDie) + ' ± TOU · Luck ' + esc(am.luckDie) + (am.luckDaily ? ' (rolled each day)' : '') + ' · ' + esc(am.weapon.name) + ' ' + esc(am.weapon.damage) + '<br>' + esc(am.text)); }
        if (v.secondaryClass) h += baseClassPicker();
      }
    }
    return h;
  }
  function baseClassPicker() { var h = '<div class="m-lbl">Additional class (d6)</div><div class="m-row">' + normal().map(function (c) { return chip('<span style="font-family:var(--f-num);">' + c.roll + '.</span> ' + esc(c.name), B.base === c.id, "PBB.set('base','" + c.id + "')"); }).join('') + rollBtn('d6 class', "PBB.rollSub('base')") + '</div>';
    var b = B.base ? C(B.base) : null; if (b) h += box('Your abilities, HP, weapon, clothing, hat, Devil\'s Luck and features come from <b>' + esc(b.name) + '</b>: HP ' + esc(b.hpDie) + ' ± TOU, Luck ' + esc(b.luckDie) + '.'); return h; }
  function abilPage() {
    var cm = classMods();
    var h = '<p class="m-hint">Roll 3d6 for each ability and keep only the modifier (3–4 −3, 5–6 −2, 7–8 −1, 9–12 ±0, 13–14 +1, 15–16 +2, 17–18 +3)' + (isLand() ? ' — as a landlubber you may roll 4d6 and drop the lowest die' : '') + ', or take the standard array. Class modifiers then apply; nothing goes below −3 or above +6.</p>';
    h += '<div class="m-row" style="margin-bottom:8px;">' +
      '<button class="m-btn' + (B.method === 'roll' ? '' : ' ghost') + '" style="flex:1;" onclick="PBB.rollAll()">🎲 Roll ' + (B.drop4 && isLand() ? '4d6 drop lowest' : '3d6') + ' × 5</button>' +
      '<button class="m-btn' + (B.method === 'array' ? '' : ' ghost') + '" style="flex:1;" onclick="PBB.method(\'array\')" title="A house option: Pirate Borg has no standard array">Standard Array <small>(house)</small></button>' +
      '<button class="m-btn' + (B.method === 'manual' ? '' : ' ghost') + '" style="flex:0 0 auto;" onclick="PBB.method(\'manual\')">Enter</button></div>';
    if (isLand()) h += '<div class="m-row" style="margin-bottom:8px;">' + chip((B.drop4 ? '✓ ' : '') + 'Landlubber: 4d6, drop the lowest', B.drop4, 'PBB.drop4()') + '</div>';
    if (B.method === 'roll' && B.pool) h += '<div class="m-row" style="margin-bottom:8px;">' + chip('In order (as rolled)', B.order !== 'assign', "PBB.order('order')") + chip('Assign them', B.order === 'assign', "PBB.order('assign')") + '</div>';
    if (B.method === 'array') h += '<p class="m-hint" style="margin-bottom:6px;">Standard array <b style="font-family:var(--f-num);">' + arr().map(sg).join(' · ') + '</b> — a house option (the book has no array; this is what the ' + (isLand() ? 'landlubber\'s 4d6-drop-lowest' : '3d6') + ' roll gives on average). Pick a value for each ability: choosing one already used swaps them.</p>';
    else if (B.method === 'roll' && B.pool && B.order === 'assign') h += '<p class="m-hint" style="margin-bottom:6px;">Rolled: <b style="font-family:var(--f-num);">' + B.pool.map(function (r) { return sg(rawMod(r.sum)); }).join(' · ') + '</b>. Pick a value for each ability: choosing one already used swaps them.</p>';
    else if (B.method === 'roll' && !B.pool) h += '<p class="m-hint" style="margin-bottom:6px;">Roll to fill the five abilities.</p>';
    var assignSel = function (a, labels) { var cur = slotOf(a); return '<select class="m-input" style="width:auto;min-width:84px;font-family:var(--f-num);" onchange="PBB.assign(\'' + a + '\',this.value)">' + labels.map(function (l, i) { return '<option value="' + i + '"' + (i === cur ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select>'; };
    h += '<table class="tbl" style="color:#ece4d4;"><tbody>' + ABIL.map(function (a) { var bm = baseMod(a), fm = finalMod(a); var cmv = num(cm[a]); var cell = '';
      if (B.method === 'manual') cell = '<input class="m-input" type="number" min="-3" max="3" style="width:72px;text-align:center;font-family:var(--f-num);" value="' + (bm == null ? '' : bm) + '" onchange="PBB.manual(\'' + a + '\',this.value)">';
      else if (B.method === 'array') cell = assignSel(a, arr().map(sg));
      else if (B.pool) { var r = B.pool[slotOf(a)];
        cell = (B.order === 'assign' ? assignSel(a, B.pool.map(function (x) { return x.sum + ' → ' + sg(rawMod(x.sum)); })) + ' ' : '<span style="font-family:var(--f-num);">' + r.sum + '</span> → <b style="font-family:var(--f-num);">' + sg(bm) + '</b> ') +
          '<small style="color:#a89a8a;">(' + r.dice.join(', ') + (r.drop ? ' — dropped ' + r.drop : '') + ')</small>'; }
      else cell = '<span style="color:#a89a8a;">—</span>';
      return '<tr><td style="font-family:var(--f-label);font-size:15px;color:#fff;">' + a + '</td><td style="width:46%;">' + cell + '</td><td class="mono" style="color:#a89a8a;">' + (cmv ? 'class ' + sg(cmv) : '') + '</td><td class="mono" style="font-size:20px;font-weight:600;color:#f3e6d4;">' + (fm == null ? '—' : sg(fm)) + '</td></tr>'; }).join('') + '</tbody></table>';
    return h;
  }
  function hpPage() {
    var tou = finalMod('TOUGHNESS'); var hd = hpDie(), ld = luckDie();
    var h = '<p class="m-hint">Hit points: your class die ' + esc(hd) + ' ± TOUGHNESS (' + sg(tou) + '), never less than 1. Devil\'s Luck: roll ' + esc(ld) + '.</p>';
    h += '<div class="m-lbl">Hit points</div><div class="m-row">' + rollBtn(hd + ' ' + sg(tou), 'PBB.rollHp()') + '<input class="m-input" type="number" min="1" style="width:80px;font-family:var(--f-num);" value="' + (B.hp == null ? '' : B.hp) + '" onchange="PBB.setNum(\'hp\',this.value)"><span class="m-hint" style="margin:0;">' + esc(B.hpTxt) + '</span></div>';
    h += '<div class="m-lbl">Devil\'s Luck</div><div class="m-row">' + rollBtn(ld, 'PBB.rollLuck()') + '<input class="m-input" type="number" min="0" style="width:80px;font-family:var(--f-num);" value="' + (B.luck == null ? '' : B.luck) + '" onchange="PBB.setNum(\'luck\',this.value)"><span class="m-hint" style="margin:0;">' + esc(B.luckTxt) + '</span></div>';
    if (animal() && animal().luckDaily) h += '<p class="m-hint" style="margin-top:8px;">Lucky Parrot: you roll d6 Luck again each day.</p>';
    return h;
  }
  function weaponRowsFor(die) { var n = sides(die); return A(sw().rows).filter(function (r) { return num(r.roll) <= n; }); }
  function weaponPage() {
    var ws = weaponSpec(), h = '';
    if (!ws) h += '<p class="m-hint">No weapon roll.</p>';
    else if (ws.natural) { h += box('Natural weapon: <b>' + esc(ws.natural.name) + '</b> ' + esc(ws.natural.damage) + (ws.natural.special ? ' — ' + esc(ws.natural.special) : '')); if (ws.monkey) h += '<div class="m-lbl">Starting weapon (' + esc(ws.monkey) + ')</div>' + weaponChooser(weaponRowsFor(ws.monkey), 'monkeyWeapon', 'monkeySub', ws.monkey); }
    else if (ws.trusted) { var tt = A((M().tables || []).find(function (t) { return t.id === 'trustedWeapon'; }).rows);
      h += '<p class="m-hint">Brute: your trusted weapon (d6). It never breaks (you drop it on a fumble) and attacks with it are DR −2. Name it!</p><div class="m-row">' + tt.map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.name), B.weapon && B.weapon.id === r.id, "PBB.trusted('" + r.id + "')", false, r.text); }).join('') + rollBtn('d6', 'PBB.rollTrusted()') + '</div>';
      if (B.weapon) h += box('<b>' + esc(B.weapon.name) + '</b> — ' + esc(B.weapon.text)) + '<div class="m-lbl">Its name</div><input class="m-input" value="' + esc(B.trustedName) + '" placeholder="e.g. Old Bess" oninput="PBB.setq(\'trustedName\',this.value)">'; }
    else if (ws.fixed) h += box('Buccaneer: a <b>musket</b> (2d6, range 150\', you reload in 1 round) and 10 + PRESENCE = <b>' + Math.max(1, 10 + num(finalMod('PRESENCE'))) + '</b> rounds of shot.');
    else if (ws.choice) { h += '<div class="m-lbl">Weapon</div><div class="m-row">' + ws.choice.map(function (c, i) { var nm = c.name || (window.PBSHEET && PBSHEET.weaponDef(c.weapon) || {}).name || c.weapon; return chip(esc(nm) + ' <small>' + esc(c.damage) + '</small>', B.weapon && B.weapon.ix === i, 'PBB.choiceWeapon(' + i + ')'); }).join('') + rollBtn('d2', 'PBB.choiceWeapon(' + (d(2) - 1) + ')') + '</div>'; }
    else if (ws.die) h += '<div class="m-lbl">Starting weapon (' + esc(ws.die) + ')</div>' + weaponChooser(weaponRowsFor(ws.die), 'weapon', 'weaponSub', ws.die);
    var an = ancestry(); if (an && A(an.effects).some(function (e) { return e.type === 'weapon'; })) h += box('Aquatic ancestry also gives you: ' + A(an.effects).filter(function (e) { return e.type === 'weapon'; }).map(function (e) { return '<b>' + esc(e.name) + '</b> ' + esc(e.damage); }).join(', '));
    var cd = clothingDie(), hd = hatDie();
    if (cd) { var cl = A(window.PB_CLOTHING).filter(function (c) { var r = c.roll; var lo = Array.isArray(r) ? r[0] : r; return lo <= sides(cd); });
      h += '<div class="m-lbl">Clothing (' + esc(cd) + ')</div><div class="m-row">' + cl.map(function (c) { return chip('<span style="font-family:var(--f-num);">' + rl(c.roll) + '.</span> ' + esc(c.name) + (c.tier ? ' <small>tier ' + c.tier + '</small>' : ''), B.clothing === c.id, "PBB.set('clothing','" + c.id + "')"); }).join('') + rollBtn(cd, "PBB.rollWear('clothing')") + '</div>'; }
    else h += '<p class="m-hint" style="margin-top:8px;">No clothing roll.</p>';
    if (hd) { var ht = A(window.PB_HATS).filter(function (c) { var r = c.roll; var lo = Array.isArray(r) ? r[0] : r; return lo <= sides(hd); });
      h += '<div class="m-lbl">Hat (' + esc(hd) + ')</div><div class="m-row">' + ht.map(function (c) { return chip('<span style="font-family:var(--f-num);">' + rl(c.roll) + '.</span> ' + esc(c.name), B.hat === c.id, "PBB.set('hat','" + c.id + "')"); }).join('') + rollBtn(hd, "PBB.rollWear('hat')") + '</div>'; }
    else h += '<p class="m-hint">' + (M() && (M().id === 'zealot' || M().id === 'sorcerer') ? 'Your class starts without a hat.' : 'No hat roll.') + '</p>';
    return h;
  }
  function weaponChooser(rows, key, subKey, die) { var cur = B[key];
    var h = '<div class="m-row">' + rows.map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.text.replace(/\s*\(.*$/, '')) + ' <small>' + esc(r.damage) + '</small>', cur && cur.roll === r.roll, "PBB.weaponRow('" + key + "'," + r.roll + ')'); }).join('') + rollBtn(die, "PBB.rollWeapon('" + key + "','" + die + "')") + '</div>';
    if (cur && cur.choice) h += '<div class="m-row" style="margin-top:6px;">' + cur.choice.map(function (id) { var w = SH().weaponDef(id) || { name: id }; return chip(esc(w.name), B[subKey] === id, "PBB.set('" + subKey + "','" + id + "')"); }).join('') + '</div>';
    if (cur) h += box(esc(cur.text)); return h; }
  function featPage() {
    var ts = startTables(), h = '';
    var ai = B.cls === 'haunted-soul' ? A((C().tables[0] || {}).rows).find(function (r) { return r.id === B.ailment; }) : null;
    if (ai) h += box('Ailment: <b>' + esc(ai.name) + '</b> — ' + esc(ai.short || ''));
    var an = ancestry(), am = animal();
    if (an && A(an.effects).some(function (e) { return e.type === 'ritual'; })) h += tallRoll('extraRituals', 'The Great Old One: one random arcane ritual (d20)', 'PB_RITUALS');
    if (am && A(am.effects).some(function (e) { return e.type === 'relic'; })) { h += tallRoll('extraRelics', 'Foul Fowl: the ability of one random relic (d20)', 'PB_RELICS'); h += tallRoll('extraRituals', 'Foul Fowl: one random arcane ritual (d20)', 'PB_RITUALS'); }
    if (!ts.length && !h) return '<p class="m-hint">No starting class feature to roll — ' + (am ? 'sentient animals have no normal class.' : 'landlubbers have no class.') + '</p>';
    ts.forEach(function (t) {
      var key = t.id === 'deity' ? 'deity' : t.id === 'prayers' ? 'prayer' : t.id === 'spells' ? 'spell' : null; var cur = key ? B[key] : B.feats[t.id];
      h += '<div class="m-lbl">' + esc(t.name) + ' (' + esc(t.die) + ')</div>' + (t.note ? '<p class="m-hint" style="margin-bottom:4px;">' + esc(t.note) + '</p>' : '') + '<div class="m-row">' + A(t.rows).map(function (r) { return chip('<span style="font-family:var(--f-num);">' + (r.numeral || r.roll) + '.</span> ' + esc(r.name), cur === r.id, "PBB.feat('" + t.id + "','" + r.id + "')", false, r.text); }).join('') + rollBtn(t.die, "PBB.rollFeat('" + t.id + "')") + '</div>';
      var r0 = A(t.rows).find(function (r) { return r.id === cur; }); if (r0 && r0.text) h += box('<b>' + esc(r0.name) + '</b> — ' + esc(r0.text));
    });
    return h;
  }
  function tallRoll(key, label, list) { var cur = B[key]; var rows = A(window[list]); var got = cur.map(function (id) { var r = rows.find(function (x) { return x.id === id; }); return r ? r.name : id; });
    return '<div class="m-lbl">' + esc(label) + '</div><div class="m-row">' + rollBtn('d20', "PBB.rollTall('" + key + "','" + list + "')") + '<span class="m-hint" style="margin:0;">' + (got.length ? esc(got.join(', ')) : 'rolled when you create the pirate if you skip this') + '</span></div>'; }
  function gearPage() {
    var h = '<p class="m-hint">Roll once on each starting gear table (pg. 27).</p>';
    var cs = A(window.PB_CONTAINERS); h += '<div class="m-lbl">Container (d6)</div><div class="m-row">' + cs.map(function (c) { return chip('<span style="font-family:var(--f-num);">' + c.roll + '.</span> ' + esc(c.name), B.container === c.id, "PBB.set('container','" + c.id + "')", false, c.text); }).join('') + rollBtn('d6', "PBB.rollGear('container')") + '</div>';
    var c = cs.find(function (x) { return x.id === B.container; }); if (c && c.orChoice) h += '<div class="m-row" style="margin-top:6px;"><span class="m-hint" style="margin:0;">…or one of the above instead:</span>' + cs.filter(function (x) { return !x.orChoice; }).map(function (x) { return chip(esc(x.name), B.containerAlt === x.id, "PBB.set('containerAlt','" + x.id + "')"); }).join('') + chip('Keep the ' + esc(c.name.toLowerCase()), !B.containerAlt, "PBB.set('containerAlt','')") + '</div>';
    h += '<div class="m-lbl">Cheap gear (d12)</div><div class="m-row">' + A(window.PB_CHEAP_GEAR).map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.text.replace(/\s*\(.*$/, '')), B.cheap && B.cheap.roll === r.roll, 'PBB.gearRow(\'cheap\',' + r.roll + ')', false, r.text); }).join('') + rollBtn('d12', "PBB.rollGear('cheap')") + '</div>';
    if (B.cheap) { h += box(esc(B.cheap.text) + (B.cheap.qtyRolled ? ' — <b>' + B.cheap.qtyRolled + '</b>' : ''));
      if (B.cheap.table === 'pets') h += '<div class="m-row" style="margin-top:6px;">' + A(window.PB_PETS).map(function (p) { return chip('<span style="font-family:var(--f-num);">' + p.roll + '.</span> ' + esc(p.name), B.pet === p.name, "PBB.set('pet','" + jsq(p.name) + "')"); }).join('') + rollBtn('d10 pet', "PBB.rollSubTable('pet','PB_PETS',10)") + '</div>'; }
    h += '<div class="m-lbl">Fancy gear (d12)</div><div class="m-row">' + A(window.PB_FANCY_GEAR).map(function (r) { return chip('<span style="font-family:var(--f-num);">' + r.roll + '.</span> ' + esc(r.text.replace(/\s*\(.*$/, '')), B.fancy && B.fancy.roll === r.roll, 'PBB.gearRow(\'fancy\',' + r.roll + ')', false, r.text); }).join('') + rollBtn('d12', "PBB.rollGear('fancy')") + '</div>';
    if (B.fancy) { h += box(esc(B.fancy.text));
      if (B.fancy.table === 'relics') h += '<div class="m-row" style="margin-top:6px;">' + rollBtn('d20 relic', "PBB.rollFancySub('PB_RELICS',20)") + (B.fancySub ? '<span class="m-hint" style="margin:0;"><b>' + esc(B.fancySub.name) + '</b> — ' + esc(B.fancySub.text || '') + '</span>' : '') + '</div><div style="margin-top:6px;">' + sel('bd-relic', A(window.PB_RELICS), B.fancySub ? A(window.PB_RELICS).indexOf(B.fancySub) : -1, 'PBB.pickFancySub(\'PB_RELICS\',this.value)', function (x) { return x.roll + '. ' + x.name; }) + '</div>';
      if (B.fancy.table === 'instruments') h += '<div class="m-row" style="margin-top:6px;">' + A(window.PB_INSTRUMENTS).map(function (p) { return chip('<span style="font-family:var(--f-num);">' + p.roll + '.</span> ' + esc(p.name), B.fancySub && B.fancySub.name === p.name, "PBB.pickFancySub('PB_INSTRUMENTS'," + (p.roll - 1) + ')'); }).join('') + rollBtn('d10', "PBB.rollFancySub('PB_INSTRUMENTS',10)") + '</div>'; }
    return h;
  }
  function bgDef() { return A(window.PB_BACKGROUNDS).find(function (b) { return b.id === B.bg; }) || null; }
  function bgPage() {
    var bs = A(window.PB_BACKGROUNDS); var b = bgDef();
    var h = '<div class="m-lbl">Background &amp; silver (d100)</div><div class="m-row">' + rollBtn('d100', 'PBB.rollBg()') + '</div><div style="margin-top:6px;">' + sel('bd-bg', bs, b ? bs.indexOf(b) : -1, 'PBB.pickBg(this.value)', function (x) { return rl(x.roll) + '. ' + x.name + ' — ' + x.item; }) + '</div>';
    if (b) { h += box('<b>' + esc(b.name) + '</b> — ' + esc(b.item) + '<br>Silver: ' + esc(b.silver) + ' × ' + b.silverMultiplier + ' = <b style="font-family:var(--f-num);">' + (B.silver == null ? '—' : B.silver) + 's</b> <small>' + esc(B.silverTxt) + '</small> <button class="chip" onclick="PBB.rollSilver()">Re-roll</button>');
      if (b.table === 'instruments') h += '<div class="m-row" style="margin-top:6px;">' + A(window.PB_INSTRUMENTS).map(function (p) { return chip(esc(p.name), B.bgInstr === p.name, "PBB.set('bgInstr','" + jsq(p.name) + "')"); }).join('') + rollBtn('d10 instrument', "PBB.rollSubTable('bgInstr','PB_INSTRUMENTS',10)") + '</div>'; }
    [['flaw', 'Distinctive flaw (d20)', 'PB_FLAWS', 20], ['mark', 'Physical trademark (d20)', 'PB_TRADEMARKS', 20], ['idio', 'Idiosyncrasy (d20)', 'PB_IDIOSYNCRASIES', 20], ['incident', 'Unfortunate incident or condition (d20)', 'PB_INCIDENTS', 20], ['thing', 'Thing of importance (d100)', 'PB_THINGS', 100]].forEach(function (t) {
      var list = A(window[t[2]]); var cur = list.findIndex(function (x) { return x.text === B[t[0]]; });
      h += '<div class="m-lbl">' + esc(t[1]) + '</div><div class="m-row" style="flex-wrap:nowrap;">' + rollBtn('d' + t[3], "PBB.rollText('" + t[0] + "','" + t[2] + "'," + t[3] + ')') + '<div style="flex:1;min-width:0;">' + sel('bd-' + t[0], list, cur, "PBB.pickText('" + t[0] + "','" + t[2] + "',this.value)", function (x) { return x.roll + '. ' + x.text; }) + '</div></div>'; });
    return h;
  }
  function namePage() {
    var n = A(window.PB_NAMES);
    var h = '<p class="m-hint">Roll d66 (two d6: tens and ones) for each part on the name generator (Player\'s Guidebook pg. 79 · Core Rules pg. 125), or write your own.</p>';
    h += '<div class="m-row" style="margin-bottom:8px;">' + chip('Any', B.sex === 'any', "PBB.set('sex','any')") + chip('Male names', B.sex === 'male', "PBB.set('sex','male')") + chip('Female names', B.sex === 'female', "PBB.set('sex','female')") + rollBtn('Roll everything', 'PBB.rollName()') + '</div>';
    h += '<div class="m-row">' + rollBtn('d66 first name', "PBB.rollPart('first')") + '<b>' + esc(B.first || '—') + '</b></div>';
    h += '<div class="m-row" style="margin-top:6px;">' + rollBtn('d66 surname', "PBB.rollPart('surname')") + '<b>' + esc(B.surname || '—') + '</b></div>';
    h += '<div class="m-row" style="margin-top:6px;">' + rollBtn('d66 nickname', "PBB.rollPart('nick')") + '<b>' + esc(B.nick || '—') + '</b></div>';
    h += '<div class="m-lbl">Name</div><input class="m-input" id="bd-name" value="' + esc(B.name) + '" oninput="PBB.setq(\'name\',this.value)" placeholder="Your pirate\'s name">';
    h += box(summary());
    return h;
  }
  // A few d66 nicknames offer a choice ("Sir/Madam", "One-Eye/Arm/Leg", "The Bride/Groom"):
  // take one — the gendered ones follow the first name, the rest at random.
  function nickPick(nk) { nk = String(nk || ''); if (nk.indexOf('/') < 0) return nk;
    var pre = (nk.match(/^(The |One-)/) || [''])[0], opts = nk.slice(pre.length).split('/').map(function (x) { return pre + x.trim(); });
    var FEM = /^(The )?(Madam|Mrs\.|Miss|Queen|Bride)$/, MAS = /^(The )?(Sir|Mr\.|King|Groom)$/;
    var fem = B.sex === 'female' || (B.sex !== 'male' && (B.firstFem != null ? B.firstFem : d(2) === 2));
    var g = opts.filter(function (o) { return fem ? FEM.test(o) : MAS.test(o); }); if (g.length) opts = g;
    return opts[d(opts.length) - 1]; }
  function summary() { var c = C(); var parts = [];
    parts.push('<b>' + esc(B.name || '—') + '</b> — ' + esc(labelClass()));
    parts.push(ABIL.map(function (a) { var f = finalMod(a); return a.slice(0, 3) + ' ' + (f == null ? '—' : sg(f)); }).join(' · '));
    parts.push('HP ' + (B.hp == null ? '—' : B.hp) + ' · Devil\'s Luck ' + (B.luck == null ? '—' : B.luck) + ' (' + esc(luckDie()) + ') · ' + (B.silver == null ? '—' : B.silver) + 's');
    var bg = bgDef(); if (bg) parts.push(esc(bg.name) + ' · ' + esc(B.flaw || '') ); return parts.join('<br>'); }
  function labelClass() { var c = C(); if (!c) return ''; if (B.cls === 'haunted-soul') { var ai = A((c.tables[0] || {}).rows).find(function (r) { return r.id === B.ailment; }); return (ai ? ai.name + ' ' : '') + 'Haunted Soul' + (B.base ? ' ' + C(B.base).name : ''); }
    if (B.cls === 'tall-tale') { var v = variant(); var an = animal() || ancestry(); if (!v) return 'Tall Tale'; if (v.id === 'sentient-animal') return an ? an.name : v.name; return v.name + (an ? ' (' + an.name + ')' : '') + (B.base ? ' ' + C(B.base).name : ''); }
    return c.name; }
  function d66() { return d(6) * 10 + d(6); }
  function roll3(drop) { var r = [d(6), d(6), d(6)]; if (drop) r.push(d(6)); var s = r.slice().sort(function (a, b) { return a - b; }); var low = drop ? s[0] : null; var sum = drop ? s[1] + s[2] + s[3] : s[0] + s[1] + s[2]; return { sum: sum, dice: r, drop: low }; }
  function resetAfterClass() { B.rolls = {}; B.mods = {}; B.pool = null; B.assign = [0, 1, 2, 3, 4]; B.hp = null; B.luck = null; B.hpTxt = ''; B.luckTxt = ''; B.weapon = null; B.weaponSub = ''; B.monkeyWeapon = null; B.monkeySub = ''; B.clothing = ''; B.hat = ''; B.feats = {}; B.deity = ''; B.prayer = ''; B.spell = ''; B.extraRelics = []; B.extraRituals = []; }

  // ── actions ──
  var api = {
    launch: function () { B = fresh(); step = 0; $('builder-body')._step = -1; $('builder-overlay').classList.add('open'); render(); },
    close: function () { $('builder-overlay').classList.remove('open'); },
    next: function () { if (!valid(step)) return; step = Math.min(STEPS.length - 1, step + 1); render(); },
    back: function () { step = Math.max(0, step - 1); render(); },
    set: function (k, v) { var keepB = B[k] === v; B[k] = String(v); if (!keepB && (k === 'base' || k === 'animal' || k === 'ancestry')) { var r = B.rolls, m = B.mods, pl = B.pool, as = B.assign; resetAfterClass(); B.rolls = r; B.mods = m; B.pool = pl; B.assign = as; } render(); },
    setq: function (k, v) { B[k] = v; var ft = $('builder-ft'); if (ft) { var nb = ft.querySelector('.m-btn:last-child'); if (nb) nb.disabled = !(step === STEPS.length - 1 ? allValid() : valid(step)); } },
    setNum: function (k, v) { var n = parseInt(v, 10); B[k] = isNaN(n) ? null : Math.max(k === 'hp' ? 1 : 0, n); B[k + 'Txt'] = 'entered'; render(); },
    cls: function (id) { if (B.cls !== id) { B.cls = id; B.ailment = ''; B.base = ''; B.variant = ''; B.ancestry = ''; B.animal = ''; resetAfterClass(); if (id !== 'landlubber') B.drop4 = false; } render(); },
    variant: function (id) { if (B.variant !== id) { B.variant = id; B.ancestry = ''; B.animal = ''; B.base = ''; resetAfterClass(); } render(); },
    rollClass: function (n) { var r = d(n); var c = A(window.PB_CLASSES).find(function (x) { return x.roll === r; }); if (c) { api.cls(c.id); log('Class', c.name, 'd' + n + '(' + r + ')'); } },
    rollSub: function (what) { var n, row;
      if (what === 'ailment') { n = d(6); row = A((C().tables[0] || {}).rows).find(function (r) { return r.roll === n; }); if (row) { B.ailment = row.id; log('Ailment', row.name, 'd6(' + n + ')'); } }
      if (what === 'base') { n = d(6); row = normal().find(function (c) { return c.roll === n; }); if (row) { api.set('base', row.id); log('Additional class', row.name, 'd6(' + n + ')'); return; } }
      if (what === 'variant') { n = d(6); row = A(tall().variants).find(function (v) { return inRoll(v.roll, n); }); if (row) { api.variant(row.id); log('Tall Tale', row.name, 'd6(' + n + ')'); return; } }
      if (what === 'ancestry') { n = d(8); row = rowFor(variant().table.rows, n); if (row) { api.set('ancestry', row.id); log('Aquatic ancestry', row.name, 'd8(' + n + ')'); return; } }
      if (what === 'animal') { n = d(6); row = rowFor(variant().table.rows, n); if (row) { api.set('animal', row.id); log('Sentient animal', row.name, 'd6(' + n + ')'); return; } }
      render(); },
    method: function (m) { if (m !== B.method) B.assign = [0, 1, 2, 3, 4]; B.method = m; render(); },
    order: function (o) { B.order = o === 'assign' ? 'assign' : 'order'; B.assign = [0, 1, 2, 3, 4]; render(); },
    // Give ability `a` the pool / array slot `idx`; whichever ability held it takes a's old slot.
    assign: function (a, idx) { var i = ABIL.indexOf(a), v = num(idx, 0); var other = B.assign.indexOf(v); if (other >= 0 && other !== i) B.assign[other] = B.assign[i]; B.assign[i] = v; render(); },
    drop4: function () { B.drop4 = !B.drop4; B.rolls = {}; B.pool = null; if (B.method === 'roll') B.assign = [0, 1, 2, 3, 4]; render(); },
    rollOne: function (a) { if (!B.pool) { api.rollAll(); return; } var r = roll3(B.drop4 && isLand()); B.pool[slotOf(a)] = r; B.rolls[a] = r; B.method = 'roll'; log(a, String(r.sum) + ' → ' + sg(rawMod(r.sum)), (r.dice.length + 'd6(' + r.dice.join(',') + ')') + (r.drop ? ' drop ' + r.drop : '')); render(); },
    rollAll: function () { B.method = 'roll'; B.pool = ABIL.map(function () { return roll3(B.drop4 && isLand()); }); B.assign = [0, 1, 2, 3, 4]; ABIL.forEach(function (a, i) { B.rolls[a] = B.pool[i]; });
      log('Abilities', B.pool.map(function (r, i) { return ABIL[i].slice(0, 3) + ' ' + sg(rawMod(r.sum)); }).join(' '), B.pool.map(function (r) { return r.dice.length + 'd6(' + r.dice.join(',') + ')' + (r.drop ? ' drop ' + r.drop : ''); }).join(' ')); render(); },
    manual: function (a, v) { var n = parseInt(v, 10); if (isNaN(n)) delete B.mods[a]; else B.mods[a] = Math.max(-3, Math.min(3, n)); render(); },
    rollHp: function () { var n = d(sides(hpDie())); var t = finalMod('TOUGHNESS'); B.hp = Math.max(1, n + t); B.hpTxt = hpDie() + '(' + n + ') ' + sg(t); log('Hit points', String(B.hp), B.hpTxt + (n + t < 1 ? ' (minimum 1)' : '')); render(); },
    rollLuck: function () { var n = d(sides(luckDie())); B.luck = n; B.luckTxt = luckDie() + '(' + n + ')'; log("Devil's Luck", String(n), B.luckTxt); render(); },
    trusted: function (id) { var t = A(M().tables).find(function (x) { return x.id === 'trustedWeapon'; }); var r = A(t.rows).find(function (x) { return x.id === id; }); B.weapon = r; render(); },
    rollTrusted: function () { var t = A(M().tables).find(function (x) { return x.id === 'trustedWeapon'; }); var n = d(6); var r = rowFor(t.rows, n); B.weapon = r; log('Trusted weapon', r.name, 'd6(' + n + ')'); render(); },
    choiceWeapon: function (i) { var c = weaponSpec().choice[i]; B.weapon = Object.assign({ ix: i }, c); render(); },
    weaponRow: function (key, roll) { var r = A(sw().rows).find(function (x) { return x.roll === roll; }); B[key] = r; B[key === 'weapon' ? 'weaponSub' : 'monkeySub'] = r && r.choice ? '' : ''; render(); },
    rollWeapon: function (key, die) { var n = d(sides(die)); var r = A(sw().rows).find(function (x) { return x.roll === n; }); B[key] = r; B[key === 'weapon' ? 'weaponSub' : 'monkeySub'] = ''; log('Starting weapon', r ? r.text.replace(/\s*\(.*$/, '') : '?', die + '(' + n + ')'); render(); },
    rollWear: function (k) { var die = k === 'clothing' ? clothingDie() : hatDie(); var n = d(sides(die)); var r = rowFor(k === 'clothing' ? window.PB_CLOTHING : window.PB_HATS, n); if (r) { B[k] = r.id; log(k === 'clothing' ? 'Clothing' : 'Hat', r.name, die + '(' + n + ')'); } render(); },
    feat: function (tbl, id) { if (tbl === 'deity') B.deity = id; else if (tbl === 'prayers') B.prayer = id; else if (tbl === 'spells') B.spell = id; else B.feats[tbl] = id; render(); },
    rollFeat: function (tbl) { var t = startTables().find(function (x) { return x.id === tbl; }); if (!t) return; var n = d(sides(t.die)); var r = rowFor(t.rows, n); if (!r) return; api.feat(tbl, r.id); log(t.name, r.name, t.die + '(' + n + ')'); },
    rollTall: function (key, list) { var n = d(20); var r = rowFor(window[list], n); if (r) { B[key] = [r.id]; log(list === 'PB_RELICS' ? 'Relic' : 'Ritual', r.name, 'd20(' + n + ')'); } render(); },
    gearRow: function (k, roll) { var r = A(window[k === 'cheap' ? 'PB_CHEAP_GEAR' : 'PB_FANCY_GEAR']).find(function (x) { return x.roll === roll; }); B[k] = Object.assign({}, r); if (k === 'cheap') { B.pet = ''; if (r.qty) { var q = SH().rollExpr(r.qty); B.cheap.qtyRolled = q.total; } } if (k === 'fancy') B.fancySub = null; render(); },
    rollGear: function (k) { if (k === 'container') { var n = d(6); var c = rowFor(window.PB_CONTAINERS, n); B.container = c.id; B.containerAlt = ''; log('Container', c.name, 'd6(' + n + ')'); render(); return; }
      var m = d(12); api.gearRow(k, m); log(k === 'cheap' ? 'Cheap gear' : 'Fancy gear', B[k].text, 'd12(' + m + ')' + (B[k].qtyRolled ? ' · ' + B[k].qty + ': ' + B[k].qtyRolled : '')); },
    rollSubTable: function (k, list, n) { var r = d(n); var row = rowFor(window[list], r); if (row) { B[k] = row.name; log(list === 'PB_PETS' ? 'Pet' : 'Instrument', row.name, 'd' + n + '(' + r + ')'); } render(); },
    rollFancySub: function (list, n) { var r = d(n); var row = rowFor(window[list], r); if (row) { B.fancySub = row; log(list === 'PB_RELICS' ? 'Ancient relic' : 'Instrument', row.name, 'd' + n + '(' + r + ')'); } render(); },
    pickFancySub: function (list, i) { var row = A(window[list])[num(i, -1)]; B.fancySub = row || null; render(); },
    rollBg: function () { var n = d(100); var b = rowFor(window.PB_BACKGROUNDS, n); if (b) { B.bg = b.id; B.bgInstr = ''; api.rollSilver(true); log('Background', b.name, 'd100(' + n + ') · ' + b.item + ' · ' + B.silver + 's'); } render(); },
    pickBg: function (i) { var b = A(window.PB_BACKGROUNDS)[num(i, -1)]; if (!b) return; if (B.bg !== b.id) { B.bg = b.id; B.bgInstr = ''; api.rollSilver(true); } render(); },
    rollSilver: function (quiet) { var b = bgDef(); if (!b) return; var r = SH().rollExpr(b.silver); B.silver = r.total * (b.silverMultiplier || 10); B.silverTxt = '(' + r.text + ' × ' + (b.silverMultiplier || 10) + ')'; if (quiet !== true) render(); },
    rollText: function (k, list, n) { var r = d(n); var row = rowFor(window[list], r); if (row) { B[k] = row.text; log({ flaw: 'Flaw', mark: 'Trademark', idio: 'Idiosyncrasy', incident: 'Unfortunate incident', thing: 'Thing of importance' }[k], row.text, 'd' + n + '(' + r + ')'); } render(); },
    pickText: function (k, list, i) { var row = A(window[list])[num(i, -1)]; B[k] = row ? row.text : ''; render(); },
    rollPart: function (part) { var n = d66(); var row = A(window.PB_NAMES).find(function (x) { return x.roll === n; }); if (!row) return; var v;
      if (part === 'first') { var fem = B.sex === 'female' || (B.sex !== 'male' && d(2) === 2); v = fem ? row.female : row.male; B.firstFem = fem; if (/\//.test(v)) { var vs = v.split('/'); v = vs[d(vs.length) - 1].trim(); } }   // "William/Billy"
      else if (part === 'surname') v = row.surname; else v = nickPick(row.nickname);
      B[part] = v; B.name = [B.first, B.surname].filter(Boolean).join(' ') + (B.nick ? ' "' + B.nick + '"' : ''); log('Name', v, 'd66(' + n + ')'); render(); },
    rollName: function () { ['first', 'surname', 'nick'].forEach(function (p) { api.rollPart(p); }); },
    finish: function () {
      if (!allValid() || !SH()) return; var sh = SH(); var m = M(); var b = bgDef(); var abil = {}; ABIL.forEach(function (a) { abil[a] = finalMod(a); });
      var out = { name: String(B.name).trim(), classId: B.cls, baseClassId: needsBase() ? B.base : '', origin: { kind: B.cls === 'haunted-soul' ? 'haunted' : B.cls === 'tall-tale' ? 'tall' : '', ailment: B.ailment, variant: B.variant, ancestry: B.ancestry, animal: B.animal },
        abilities: abil, hp: B.hp, luck: B.luck, silver: B.silver, weapons: [], gear: [], relics: [], rituals: [], prayers: [], spells: [], features: [],
        background: b ? b.name + ' — ' + b.item + (B.bgInstr ? ' (' + B.bgInstr + ')' : '') : '', flaw: B.flaw, trademark: B.mark, idiosyncrasy: B.idio, incident: B.incident, thing: B.thing, pet: B.pet || '' };
      var pre = Math.max(1, 10 + num(abil.PRESENCE)); var shot = 0;
      var addWeaponRow = function (row, sub) { if (!row) return; var id = sub || row.weapon; var w = sh.weaponDef(id); if (w) { out.weapons.push({ ref: w.id }); if (w.blackPowder) shot = pre; } };
      var ws = weaponSpec();
      if (ws && ws.natural) { out.weapons.push({ ref: 'natural', name: ws.natural.name, damage: ws.natural.damage, extra: { natural: true, metal: false, special: ws.natural.special || null } }); if (ws.monkey) addWeaponRow(B.monkeyWeapon, B.monkeySub); }
      else if (ws && ws.trusted && B.weapon) { var tw = B.weapon; out.weapons.push({ ref: tw.id, name: (B.trustedName ? B.trustedName.trim() + ' (' + tw.name + ')' : tw.name), damage: tw.damage, type: 'melee', extra: { trusted: true, hands: tw.hands || 1, thrown: tw.thrown || null, special: tw.text, metal: !/net/i.test(tw.name) } }); }
      else if (ws && ws.fixed) { ws.fixed.forEach(function (id) { var w = sh.weaponDef(id); if (w) out.weapons.push({ ref: w.id }); }); shot = pre; }
      else if (ws && ws.choice && B.weapon) { if (B.weapon.weapon) out.weapons.push({ ref: B.weapon.weapon }); else out.weapons.push({ ref: 'wooden-knife', name: B.weapon.name, damage: B.weapon.damage, type: 'melee', extra: { metal: false } }); }
      else if (ws && ws.die) addWeaponRow(B.weapon, B.weaponSub);
      var an = ancestry(); if (an) A(an.effects).forEach(function (e) { if (e.type === 'weapon') out.weapons.push({ ref: 'natural', name: e.name, damage: e.damage, extra: { natural: true, metal: false, reach: e.reach || null, special: e.special || null } }); });
      out.shot = shot; out.clothing = B.clothing; out.hat = B.hat;
      // container, cheap & fancy gear
      var cont = A(window.PB_CONTAINERS).find(function (x) { return x.id === (B.containerAlt || B.container); });
      if (cont) out.gear.push({ container: true, ref: cont.id === 'sea-chest-large' ? 'sea-chest-large' : cont.id, name: cont.name, capacity: cont.capacity, carried: !(cont.id === 'sea-chest-large' || cont.id === 'dinghy') });
      var gearFrom = function (r, qty) { if (!r) return; var g = r.item ? (window.PB_GEAR || []).find(function (x) { return x.id === r.item; }) : null; if (g) out.gear.push({ name: g.name, qty: qty || 1 }); else if (!r.table) out.gear.push({ name: r.text, qty: 1 }); if (r.extra) { var e = (window.PB_GEAR || []).find(function (x) { return x.id === r.extra.item; }); if (e) out.gear.push({ name: e.name, qty: 1, note: r.extra.note || '' }); } };
      gearFrom(B.cheap, B.cheap.qtyRolled || 1);
      if (B.fancy.table === 'relics' && B.fancySub) out.relics.push(B.fancySub.id); else if (B.fancy.table === 'instruments' && B.fancySub) out.gear.push({ name: 'Instrument: ' + B.fancySub.name, qty: 1 }); else gearFrom(B.fancy, 1);
      // background items
      if (b) { A(b.gear).forEach(function (id) { var w = sh.weaponDef(id); var g = (window.PB_GEAR || []).find(function (x) { return x.id === id; }); out.gear.push({ name: (w || g || { name: id }).name, qty: 1, note: 'background' }); if (w && w.blackPowder && !shot) shot = pre; });
        A(b.gearChoice).slice(0, 1).forEach(function (id) { var g = (window.PB_GEAR || []).find(function (x) { return x.id === id; }); if (g) out.gear.push({ name: g.name, qty: 1, note: 'background' }); });
        if (B.bgInstr) out.gear.push({ name: 'Instrument: ' + B.bgInstr, qty: 1, note: 'background' });
        if (/rum/i.test(b.item)) out.gear.push({ name: 'Flask of fine rum', qty: 1, note: 'background' }); }
      out.shot = shot;
      // class start tables
      startTables().forEach(function (t) { if (t.id === 'deity') { var dv = A(t.rows).find(function (r) { return r.id === B.deity; }); out.deity = dv ? dv.numeral + ' ' + dv.name : ''; }
        else if (t.id === 'prayers') out.prayers.push(B.prayer); else if (t.id === 'spells') out.spells.push(B.spell); else out.features.push({ tbl: t.id, id: B.feats[t.id] }); });
      // Tall Tale extras (rolled now if the player skipped them)
      var am = animal(); var needRel = am && A(am.effects).some(function (e) { return e.type === 'relic'; }); var needRit = (am && A(am.effects).some(function (e) { return e.type === 'ritual'; })) || (an && A(an.effects).some(function (e) { return e.type === 'ritual'; }));
      if (needRel) { if (!B.extraRelics.length) api.rollTall('extraRelics', 'PB_RELICS'); out.relics = out.relics.concat(B.extraRelics); }
      if (needRit) { if (!B.extraRituals.length) api.rollTall('extraRituals', 'PB_RITUALS'); out.rituals = out.rituals.concat(B.extraRituals); }
      sh.applyBuild(out); api.close();
    },
    _state: function () { return B; }, _step: function () { return step; }, _go: function (i) { step = i; render(); }, _valid: valid
  };
  window.PBB = api;
})();
