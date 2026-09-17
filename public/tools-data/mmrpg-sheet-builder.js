// Marvel Multiverse RPG character builder — the "Create" button on the sheet.
// A seven-step wizard:
//   1 Character   — start from a pre-made hero/villain (highlight for detail), or custom
//   2 Basics      — codename, real name, pronouns, rank
//   3 Bio         — origin, occupation, history, personality, features, base…
//   4 Traits & Tags — shows origin/occupation grants; extra traits capped at rank
//   5 Powers & Weapons — filter by set, only powers you can access, detail on
//                        highlight; convert unused power picks to ability points/traits
//   6 Ability Scores — point-buy, showing score / defense / non-combat check
//   7 Review      — hand the finished character to applySheet()
// Uses sheet globals: MMRPG_ORIGINS/OCCUPATIONS/TRAITS/TAGS/POWERS/CHARACTERS,
// ABILITIES, applySheet, saveSheet, addLog, esc, $ .
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  function arr(x) { return Array.isArray(x) ? x : []; }
  function ORIG() { return arr(W.MMRPG_ORIGINS); }
  function OCC() { return arr(W.MMRPG_OCCUPATIONS); }
  function TRAITS() { return arr(W.MMRPG_TRAITS); }
  function TAGS() { return arr(W.MMRPG_TAGS); }
  function POWERS() { return arr(W.MMRPG_POWERS); }
  function EQUIP() { return arr(W.MMRPG_EQUIPMENT); }
  function equipByName(n) { var k = String(n || '').toLowerCase(); return EQUIP().filter(function (e) { return (e.name || '').toLowerCase() === k; })[0]; }
  // Build a sheet equipment entry from an MMRPG_EQUIPMENT record.
  function mkEquip(x, equipped) { x = x || {}; return { name:x.name || '', tier:x.tier || 'Common', type:x.type || x.category || 'Weapon', category:x.type || x.category || 'Weapon', owner:x.owner || '', ability:x.ability || 'melee', range:x.range || '', notes:x.notes || '', special:x.special || '', damageBonus:x.damageBonus || '', multBonus:parseInt(x.multBonus, 10) || 0, multAbilities:Array.isArray(x.multAbilities) ? x.multAbilities.slice() : null, flatMult:parseInt(x.flatMult, 10) || 0, noDamage:!!x.noDamage, grantsMovement:Array.isArray(x.grantsMovement) ? x.grantsMovement : null, equipped:!!equipped }; }
  function CHARS() { return arr(W.MMRPG_CHARACTERS); }
  var ABIL = (typeof ABILITIES !== 'undefined') ? ABILITIES : [
    { key:'melee', name:'Melee' }, { key:'agility', name:'Agility' }, { key:'resilience', name:'Resilience' },
    { key:'vigilance', name:'Vigilance' }, { key:'ego', name:'Ego' }, { key:'logic', name:'Logic' }];
  function E(s) { return (typeof esc === 'function') ? esc(s) : String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function jq(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  var SIZES = ['Tiny', 'Little', 'Small', 'Average', 'Big', 'Huge', 'Gigantic'];

  // ── wizard state ──────────────────────────────────────────────────────────
  var B = null;
  function blank() {
    return { step:0, source:null, sourceName:'',
      name:'', real:'', pronouns:'', rank:1,
      origin:'', occupation:'', history:'', personality:'', features:'', base:'', teams:'', size:'Average',
      traits:[], tags:[], powers:[], attacks:[], iconics:[],
      scores:{ melee:0, agility:0, resilience:0, vigilance:0, ego:0, logic:0 },
      convAbility:0, convTraits:0,
      _q:'', _focus:'', _pset:'', _showLocked:false, _iq:'', _ifocus:'' };
  }
  // budgets ------------------------------------------------------------------
  function cap() { return 3 + B.rank; }
  function abilityBudget() { return 5 * B.rank + B.convAbility; }
  function spent() { var n = 0; ABIL.forEach(function (a) { n += B.scores[a.key]; }); return n; }
  function ptsLeft() { return abilityBudget() - spent(); }
  function setsUsed() { var s = {}; B.powers.forEach(function (p) { var ps = p.powerSet; if (ps && ps !== 'None' && ps !== 'Basic') s[ps] = 1; }); return Object.keys(s).length; }
  function thematicBonus() { return Math.max(0, B.rank - setsUsed()); }
  function powerBudget() { return 4 * B.rank + thematicBonus(); }
  function powerSpent() { return B.powers.length + B.convAbility + B.convTraits + iconicCost(); }
  function powersUnused() { return powerBudget() - powerSpent(); }
  function traitLimit() { return B.rank + B.convTraits; }
  // Owning an iconic item costs power picks equal to its Power Value, minus any
  // of its granted powers you already picked yourself (min 1) — Avengers Exp. p102.
  function iconicCost() { var total = 0; (B.iconics || []).forEach(function (it) { total += iconicEffCost(it); }); return total; }
  function iconicEffCost(it) {
    var pv = parseInt(it.powerValue, 10) || 1, owned = 0;
    splitGrant(it.grantsPowers).forEach(function (nm) { if (hasPower(nm)) owned++; });
    // A battle suit (High-Tech: Battle Suit origin) gets its first power pick free.
    var suit = /Battle Suit/i.test(String(it.grantsOrigin || '')) ? 1 : 0;
    return Math.max(1, pv - owned - suit);
  }
  function iconOwned(name) { var k = String(name).toLowerCase(); return (B.iconics || []).some(function (it) { return (it.name || '').toLowerCase() === k; }); }
  // Full granted-power records across all owned iconics, deduped (rank-suffix-
  // insensitive) against picks and each other. Each carries `from` so grants can
  // be told apart from freely-picked powers on rebuild.
  function iconicGrantedPowers() {
    var out = [], seen = {};
    B.powers.forEach(function (p) { seen[String(p.name).toLowerCase().replace(/\s+\d+$/, '')] = 1; });
    (B.iconics || []).forEach(function (it) {
      splitGrant(it.grantsPowers).forEach(function (nm) {
        var key = String(nm).toLowerCase().replace(/\s+\d+$/, ''); if (seen[key]) return; seen[key] = 1;
        var p = powerByName(nm) || {};
        out.push({ name:nm, powerSet:p.powerSet || '', action:p.action || '', duration:p.duration || '', cost:p.cost || '', range:p.range || '', prerequisites:p.prerequisites || '', effect:p.effect || '', fantastic:p.fantastic || '', from:it.name });
      });
    });
    return out;
  }
  // Reliance + Extraordinary Origin traits an owned iconic brings (Avengers Exp.).
  function iconicDerivedTraits() {
    var out = [], seen = {};
    function add(name, desc) { var k = name.toLowerCase(); if (seen[k]) return; seen[k] = 1; var d = traitByName(name); out.push({ name:name, description:(d && d.description) || desc || '' }); }
    (B.iconics || []).forEach(function (it) {
      var o = String(it.grantsOrigin || '');
      if (o && o !== B.origin) add('Extraordinary Origin', 'Gained from an iconic item (' + it.name + ', ' + o + ').');
      if (/High.?Tech|Battle Suit|Cybernetics/i.test(o)) add('Tech Reliance', 'The item relies on technology for its powers.');
      else if (/Magic|Mythic|Asgardian|Sorcery/i.test(o)) add('Magic Item Reliance', 'The item relies on magic for its powers.');
    });
    return out;
  }

  // origin + occupation grants (comma lists like "Fearless, Connections: X.")
  function splitGrant(str) { return String(str || '').replace(/\.\s*$/, '').split(',').map(function (s) { return s.trim(); }).filter(Boolean); }
  function grantSource(which) {
    var out = [];
    var o = ORIG().filter(function (x) { return x.name === B.origin; })[0];
    var c = OCC().filter(function (x) { return x.name === B.occupation; })[0];
    if (o && o[which]) splitGrant(o[which]).forEach(function (n) { out.push({ name:n, from:B.origin }); });
    if (c && c[which]) splitGrant(c[which]).forEach(function (n) { out.push({ name:n, from:B.occupation }); });
    return out;
  }
  function grantedTraits() { return grantSource('traits'); }
  function grantedTags() { return grantSource('tags'); }

  function traitByName(n) { var k = String(n || '').toLowerCase(); return TRAITS().filter(function (t) { return t.name.toLowerCase() === k; })[0]; }
  function tagByName(n) { var k = String(n || '').toLowerCase(); return TAGS().filter(function (t) { return t.name.toLowerCase() === k; })[0]; }
  function powerByName(n) { var k = String(n || '').toLowerCase(); return POWERS().filter(function (p) { return p.name.toLowerCase() === k; })[0]; }

  // power prerequisites: "Accuracy 1, Rank 2" → { rank:2, powers:['Accuracy 1'] }
  function parsePrereq(p) {
    var out = { rank:1, powers:[] };
    var s = p.prerequisites;
    if (!s || s === 'None') return out;
    s.split(',').forEach(function (tok) {
      tok = tok.trim(); if (!tok) return;
      var m = /^Rank\s+(\d)/i.exec(tok);
      if (m) { out.rank = parseInt(m[1], 10); return; }
      if (/^(Action|Trigger|Duration|Range|Cost|Effect)\s*:/i.test(tok) || tok.length > 40) return; // parse junk
      out.powers.push(tok);
    });
    return out;
  }
  function hasPower(nm) { var k = String(nm).toLowerCase().replace(/\s+\d+$/, ''); return B.powers.some(function (p) { var pn = (p.name || '').toLowerCase(); return pn === String(nm).toLowerCase() || pn.replace(/\s+\d+$/, '') === k; }); }
  function accessible(p) {
    var pr = parsePrereq(p);
    if (B.rank < pr.rank) return false;
    for (var i = 0; i < pr.powers.length; i++) { if (!hasPower(pr.powers[i])) return false; }
    return true;
  }

  // Health = Resilience×30 (min 10); Focus = Vigilance×30 (min 10); Karma = Rank.
  function recompute() {
    var h = Math.max(10, B.scores.resilience * 30), f = Math.max(10, B.scores.vigilance * 30);
    B.health = { cur:h, max:h }; B.focus = { cur:f, max:f }; B.karma = { cur:B.rank, max:B.rank };
  }

  // ── loading a pre-made character ──────────────────────────────────────────
  function loadChar(c) {
    B.source = c.id; B.sourceName = c.name;
    B.name = c.name || ''; B.real = c.realName || ''; B.pronouns = '';
    B.rank = Math.max(1, Math.min(6, parseInt(c.rank, 10) || 1));
    B.origin = c.origin || ''; B.occupation = c.occupation || ''; B.teams = c.teams || ''; B.base = c.base || '';
    B.history = c.history || ''; B.personality = c.personality || ''; B.features = c.features || ''; B.size = 'Average';
    B.convAbility = 0; B.convTraits = 0;
    ABIL.forEach(function (a) { B.scores[a.key] = (c.abilities && c.abilities[a.key] != null) ? (parseInt(c.abilities[a.key], 10) || 0) : 0; });
    B.traits = arr(c.traits).map(function (t) { var d = traitByName(t); return { name:t, description: d ? d.description : '' }; });
    B.tags = arr(c.tags).map(function (t) { var d = tagByName(t); return { name:t, description: d ? d.description : '' }; });
    B.powers = [];
    arr(c.powers).forEach(function (g) {
      arr(g.names).forEach(function (nm) {
        var p = powerByName(nm) || {};
        B.powers.push({ name:nm, powerSet: g.set || p.powerSet || '', action:p.action || '', duration:p.duration || '', cost:p.cost || '', range:p.range || '', prerequisites:p.prerequisites || '', effect:p.effect || '', fantastic:p.fantastic || '' });
      });
    });
    // Attach the character's starting equipment (e.g. their iconic weapon),
    // auto-equipped so its bonuses/movement apply immediately.
    B.attacks = arr(c.equipment).map(function (nm) { return mkEquip(equipByName(nm) || { name:nm }, true); });
    recompute();
  }

  // ── overlay shell ─────────────────────────────────────────────────────────
  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'mmrpgb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) W.MMRPGB.close(); };
    ov.innerHTML = '<div class="modal wide"><div class="modal-hd"><div class="ttl">✦ Build a Hero</div><button class="x" onclick="window.MMRPGB.close()">✕</button></div>'
      + '<div id="mmrpgb-crumbs" style="display:flex;flex-wrap:wrap;gap:4px;padding:8px 16px;background:#0c0d11;border-bottom:1px solid #241417;"></div>'
      + '<div class="modal-bd" id="mmrpgb-body"></div>'
      + '<div id="mmrpgb-foot" style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;background:#0f1014;border-top:1px solid #241417;flex-shrink:0;"></div></div>';
    document.body.appendChild(ov);
  }
  var STEP_TITLES = ['Character', 'Basics', 'Bio', 'Traits & Tags', 'Powers & Weapons', 'Ability Scores', 'Review'];
  function crumbs() {
    return STEP_TITLES.map(function (t, i) {
      var on = i === B.step, done = i < B.step;
      var bg = on ? 'var(--mv)' : done ? '#2a1c1f' : '#191a20';
      var col = on ? '#fff' : done ? '#f4a6a8' : '#7a7e88';
      return '<button onclick="window.MMRPGB.go(' + i + ')" style="border:none;border-radius:3px;cursor:pointer;padding:4px 8px;font-family:\'Barlow Condensed\',sans-serif;font-weight:800;font-size:11px;letter-spacing:.06em;text-transform:uppercase;background:' + bg + ';color:' + col + ';">' + (i + 1) + '. ' + E(t) + '</button>';
    }).join('');
  }
  function footer() {
    var back = B.step > 0 ? '<button class="m-btn ghost" onclick="window.MMRPGB.back()">← Back</button>' : '<span></span>';
    var next;
    if (B.step === STEP_TITLES.length - 1) next = '<button class="m-btn" onclick="window.MMRPGB.apply()">✦ Create Character</button>';
    else next = '<button class="m-btn" onclick="window.MMRPGB.next()"' + ((B.step === 0 && !B.source) ? ' disabled' : '') + '>Next →</button>';
    return back + next;
  }
  // paint, preserving scroll position of the modal body and any inner list
  function paint() {
    ensure();
    var body = document.getElementById('mmrpgb-body');
    var sBody = body ? body.scrollTop : 0;
    var sc = document.getElementById('mmrpgb-list'); var sList = sc ? sc.scrollTop : 0;
    document.getElementById('mmrpgb-crumbs').innerHTML = crumbs();
    body.innerHTML = STEPS[B.step]();
    document.getElementById('mmrpgb-foot').innerHTML = footer();
    body.scrollTop = sBody;
    var ns = document.getElementById('mmrpgb-list'); if (ns) ns.scrollTop = sList;
  }

  // ── small UI helpers ──────────────────────────────────────────────────────
  function field(label, id, val, ph, setter) {
    return '<div style="margin-bottom:10px;"><div class="m-hint" style="margin:0 0 4px;"><b>' + E(label) + '</b></div>'
      + '<input class="m-input" id="' + id + '" value="' + E(val || '') + '" placeholder="' + E(ph || '') + '" oninput="window.MMRPGB.raw(\'' + setter + '\',this.value)"></div>';
  }
  function area(label, id, val, setter) {
    return '<div style="margin-bottom:10px;"><div class="m-hint" style="margin:0 0 4px;"><b>' + E(label) + '</b></div>'
      + '<textarea class="m-input" id="' + id + '" rows="3" style="resize:vertical;" oninput="window.MMRPGB.raw(\'' + setter + '\',this.value)">' + E(val || '') + '</textarea></div>';
  }
  function selectFrom(label, list, cur, setter, flex) {
    var opts = '<option value="">—</option>' + list.map(function (o) { var nm = o.name || o; return '<option value="' + E(nm) + '"' + (cur === nm ? ' selected' : '') + '>' + E(nm) + '</option>'; }).join('');
    return '<div style="flex:' + (flex || 1) + ';min-width:150px;"><div class="m-hint" style="margin:0 0 4px;"><b>' + E(label) + '</b></div><select class="m-input" onchange="window.MMRPGB.raw(\'' + setter + '\',this.value)">' + opts + '</select></div>';
  }
  function chips(items, remover) {
    if (!items.length) return '<p class="m-hint" style="margin:6px 0;color:#7a7e88;">None yet.</p>';
    return '<div style="display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px;">' + items.map(function (it, i) {
      return '<span style="display:inline-flex;align-items:center;gap:6px;background:#221316;border:1px solid #3a2126;border-radius:14px;padding:3px 6px 3px 11px;font-size:12px;color:#f3e6e7;">' + E(it.name || it)
        + '<button onclick="window.MMRPGB.' + remover + '(' + i + ')" style="border:none;background:#3a2126;color:#f4a6a8;border-radius:50%;width:17px;height:17px;cursor:pointer;font-size:11px;line-height:1;">✕</button></span>';
    }).join('') + '</div>';
  }
  function grantPanel(label, items) {
    if (!items.length) return '';
    return '<div style="background:#12100f;border:1px solid #2a2320;border-radius:6px;padding:8px 10px;margin:2px 0 10px;">'
      + '<div class="m-hint" style="margin:0 0 4px;color:#c9b0b2;"><b>' + E(label) + '</b> <span style="color:#7a7e88;">— included automatically</span></div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + items.map(function (it) {
        return '<span style="background:#1c1712;border:1px solid #3a2f22;border-radius:12px;padding:2px 9px;font-size:11px;color:#e8d9c2;">' + E(it.name) + '</span>';
      }).join('') + '</div></div>';
  }

  // ── STEP 1 — Character or Custom ──────────────────────────────────────────
  function stepSource() {
    var q = (B._q || '').toLowerCase();
    var list = CHARS().filter(function (c) { return !q || (c.name + ' ' + (c.realName || '') + ' ' + (c.teams || '')).toLowerCase().indexOf(q) >= 0; })
      .sort(function (a, b) { return String(a.name).localeCompare(b.name); });
    var h = '<p class="m-hint">Start from one of the <b>' + CHARS().length + '</b> pre-made heroes &amp; villains — highlight one to see the full profile, then use it (everything is editable after) — or build from scratch.</p>';
    var customOn = B.source === 'custom';
    h += '<button onclick="window.MMRPGB.custom()" style="width:100%;text-align:left;border:1px solid ' + (customOn ? 'var(--mv)' : '#2a1416') + ';background:' + (customOn ? '#2a1215' : '#0f1014') + ';border-radius:6px;padding:10px 12px;cursor:pointer;color:#f3e6e7;margin-bottom:10px;">'
      + '<b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;letter-spacing:.05em;">✎ CUSTOM BUILD</b><div class="m-hint" style="margin:2px 0 0;">A blank slate — set your own name, rank, powers and scores.</div></button>';
    h += '<input class="m-input" value="' + E(B._q || '') + '" placeholder="Search characters, teams, real names…" oninput="window.MMRPGB.search(this.value)" style="margin-bottom:8px;">';
    if (B._focus) { var fc = CHARS().filter(function (c) { return c.id === B._focus; })[0]; if (fc) h += charDetail(fc); }
    h += '<div id="mmrpgb-list" style="max-height:34vh;overflow-y:auto;display:flex;flex-direction:column;gap:5px;">' + charRows(list) + '</div>';
    return h;
  }
  function charRows(list) {
    if (!list.length) return '<p class="m-hint" style="color:#7a7e88;">No characters match that search.</p>';
    return list.map(function (c) {
      var on = B._focus === c.id, sel = B.source === c.id;
      var ab = ABIL.map(function (a) { var v = c.abilities ? c.abilities[a.key] : 0; return a.name.slice(0, 1) + (v >= 0 ? '+' + v : v); }).join(' ');
      return '<button onclick="window.MMRPGB.focusChar(\'' + jq(c.id) + '\')" style="text-align:left;border:1px solid ' + (sel ? 'var(--mv)' : on ? '#7a4046' : '#241417') + ';background:' + (sel ? '#2a1215' : on ? '#1f1418' : '#141319') + ';border-radius:5px;padding:8px 10px;cursor:pointer;color:#f3e6e7;">'
        + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;"><b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;letter-spacing:.04em;">' + E(c.name) + (sel ? ' <span style="font-size:10px;color:#7dc47d;">✓ selected</span>' : '') + '</b><span style="font-size:10px;color:#8a8e98;text-transform:uppercase;letter-spacing:.1em;">' + (c.source ? '<span style="color:var(--mv);">' + E(c.source) + '</span> · ' : '') + 'Rank ' + E(c.rank) + '</span></div>'
        + (c.realName && c.realName !== c.name ? '<div class="m-hint" style="margin:1px 0 0;font-style:italic;">' + E(c.realName) + '</div>' : '')
        + '<div style="font-family:\'Share Tech Mono\',monospace;font-size:11px;color:#9aa;letter-spacing:.02em;margin-top:3px;">' + E(ab) + '</div></button>';
    }).join('');
  }
  function charDetail(c) {
    var powers = arr(c.powers).map(function (g) { return '<b style="color:#c9b0b2;">' + E(g.set || 'Basic') + ':</b> ' + E(g.names.join(', ')); }).join('<br>');
    var h = '<div style="background:#0f1014;border:1px solid var(--mv);border-radius:6px;padding:10px 12px;margin-bottom:10px;">'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;"><b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;font-size:16px;">' + E(c.name) + '</b><span style="font-size:10px;color:#8a8e98;text-transform:uppercase;letter-spacing:.1em;">' + (c.source ? '<span style="color:var(--mv);">' + E(c.source) + '</span> · ' : '') + 'Rank ' + E(c.rank) + '</span></div>'
      + (c.realName ? '<div class="m-hint" style="margin:1px 0 6px;font-style:italic;">' + E(c.realName) + '</div>' : '');
    h += '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:6px 0;">' + ABIL.map(function (a) {
      var v = c.abilities ? c.abilities[a.key] : 0;
      return '<div style="text-align:center;background:#161318;border:1px solid #2a1c1f;border-radius:4px;padding:3px 1px;"><div style="font-size:9px;color:#8a8e98;text-transform:uppercase;">' + a.name.slice(0, 3) + '</div><div style="font-family:\'Share Tech Mono\',monospace;color:#f4a6a8;font-size:13px;">' + (v >= 0 ? '+' + v : v) + '</div><div style="font-size:8px;color:#7a7e88;">def ' + (10 + (v || 0)) + '</div></div>';
    }).join('') + '</div>';
    h += '<div class="m-hint" style="margin:0 0 4px;"><b>Health</b> ' + E(c.health) + ' · <b>Focus</b> ' + E(c.focus) + ' · <b>Karma</b> ' + E(c.karma == null ? '—' : c.karma) + (c.origin ? ' · <b>Origin</b> ' + E(c.origin) : '') + (c.occupation ? ' · ' + E(c.occupation) : '') + '</div>';
    if (powers) h += '<div class="m-hint" style="margin:4px 0 0;line-height:1.5;">' + powers + '</div>';
    if (arr(c.traits).length) h += '<div class="m-hint" style="margin:4px 0 0;"><b style="color:#c9b0b2;">Traits:</b> ' + E(c.traits.join(', ')) + '</div>';
    if (arr(c.tags).length) h += '<div class="m-hint" style="margin:2px 0 0;"><b style="color:#c9b0b2;">Tags:</b> ' + E(c.tags.join(', ')) + '</div>';
    h += '<button class="m-btn" style="margin-top:10px;" onclick="window.MMRPGB.useChar(\'' + jq(c.id) + '\')">✦ Use this character</button>';
    h += '</div>';
    return h;
  }

  // ── STEP 2 — Basics ───────────────────────────────────────────────────────
  function stepBasics() {
    var h = '<p class="m-hint">Who are they? Rank sets your power level — it drives your ability points, power picks and extra traits.</p>';
    h += field('Code Name', 'mmrpgb-name', B.name, 'Hero name', 'name');
    h += field('Real Name', 'mmrpgb-real', B.real, 'Secret identity', 'real');
    h += '<div style="display:flex;gap:12px;flex-wrap:wrap;">'
      + '<div style="flex:2;min-width:150px;">' + field('Pronouns', 'mmrpgb-pro', B.pronouns, 'they/them', 'pronouns') + '</div>'
      + '<div style="flex:1;min-width:120px;"><div class="m-hint" style="margin:0 0 4px;"><b>Rank</b></div><select class="m-input" onchange="window.MMRPGB.setRank(this.value)">'
      + [1,2,3,4,5,6].map(function (r) { return '<option value="' + r + '"' + (B.rank === r ? ' selected' : '') + '>Rank ' + r + '</option>'; }).join('') + '</select></div></div>';
    h += '<p class="m-hint" style="margin-top:8px;">At Rank ' + B.rank + ': <b style="color:#f4a6a8;">' + (5 * B.rank) + '</b> ability points (cap +' + cap() + '), <b style="color:#f4a6a8;">' + (4 * B.rank) + '</b> powers, <b style="color:#f4a6a8;">' + B.rank + '</b> extra trait' + (B.rank === 1 ? '' : 's') + '.</p>';
    return h;
  }

  // ── STEP 3 — Bio ──────────────────────────────────────────────────────────
  function stepBio() {
    var oc = OCC().filter(function (o) { return o.name === B.occupation; })[0];
    var orn = ORIG().filter(function (o) { return o.name === B.origin; })[0];
    var h = '<p class="m-hint">Origin and occupation shape the story — and each grants traits, tags and sometimes powers.</p>';
    h += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;">' + selectFrom('Origin', ORIG(), B.origin, 'origin', 2) + selectFrom('Occupation', OCC(), B.occupation, 'occupation', 2) + '</div>';
    var notes = [];
    if (orn && (orn.tags || orn.traits || orn.powers)) notes.push('<b>Origin</b> — ' + [orn.powers ? 'Powers: ' + E(orn.powers) : '', orn.traits ? 'Traits: ' + E(orn.traits) : '', orn.tags ? 'Tags: ' + E(orn.tags) : ''].filter(Boolean).join(' · '));
    if (oc && (oc.tags || oc.traits)) notes.push('<b>Occupation</b> — ' + [oc.traits ? 'Traits: ' + E(oc.traits) : '', oc.tags ? 'Tags: ' + E(oc.tags) : ''].filter(Boolean).join(' · '));
    if (notes.length) h += '<p class="m-hint" style="margin:0 0 10px;color:#c9b0b2;">' + notes.join('<br>') + '</p>';
    h += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:2px;">'
      + '<div style="flex:2;min-width:160px;">' + field('Teams &amp; Affiliations', 'mmrpgb-teams', B.teams, 'Avengers…', 'teams') + '</div>'
      + '<div style="flex:2;min-width:160px;">' + field('Base of Operations', 'mmrpgb-base', B.base, 'Mobile', 'base') + '</div>'
      + '<div style="flex:1;min-width:110px;"><div class="m-hint" style="margin:0 0 4px;"><b>Size</b></div><select class="m-input" onchange="window.MMRPGB.raw(\'size\',this.value)">'
      + SIZES.map(function (s) { return '<option' + (B.size === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div></div>';
    h += area('History', 'mmrpgb-hist', B.history, 'history');
    h += area('Personality', 'mmrpgb-pers', B.personality, 'personality');
    h += area('Distinguishing Features', 'mmrpgb-feat', B.features, 'features');
    return h;
  }

  // ── STEP 4 — Traits & Tags ────────────────────────────────────────────────
  function stepTraits() {
    var lim = traitLimit(), atLimit = B.traits.length >= lim;
    var h = '<p class="m-hint">Traits are knacks and quirks; tags are facts the story hangs on. You may choose up to <b style="color:' + (B.traits.length > lim ? '#df8a8a' : '#f4a6a8') + ';">' + B.traits.length + ' / ' + lim + '</b> extra traits (rank ' + B.rank + (B.convTraits ? ' + ' + B.convTraits + ' converted' : '') + '). Origin &amp; occupation traits are on top of that.</p>';
    h += grantPanel('From your origin & occupation (traits)', grantedTraits());
    h += '<div class="m-hint" style="margin:0 0 2px;"><b>Chosen traits</b></div>' + chips(B.traits, 'rmTrait');
    h += pickerBlock('trait', 'Search traits…', TRAITS(), atLimit ? 'You&rsquo;ve reached your trait limit — remove one or convert power picks (Step 5).' : '');
    h += grantPanel('From your origin & occupation (tags)', grantedTags());
    h += '<div class="m-hint" style="margin:14px 0 2px;"><b>Tags</b> (' + B.tags.length + ')</div>' + chips(B.tags, 'rmTag');
    h += pickerBlock('tag', 'Search tags…', TAGS(), '');
    return h;
  }

  // ── STEP 5 — Powers & Weapons ─────────────────────────────────────────────
  function stepPowers() {
    var unused = powersUnused(), over = unused < 0, bonus = thematicBonus();
    var h = '<p class="m-hint">A Rank ' + B.rank + ' hero gets <b>' + (4 * B.rank) + '</b> power picks'
      + (bonus ? ' + <b>' + bonus + '</b> thematic bonus (using ' + setsUsed() + ' set' + (setsUsed() === 1 ? '' : 's') + ')' : '')
      + ' = <b style="color:' + (over ? '#df8a8a' : '#f4a6a8') + ';">' + powerSpent() + ' / ' + powerBudget() + '</b> spent.</p>';
    h += '<div class="m-hint" style="margin:0 0 2px;"><b>Powers</b></div>' + chips(B.powers, 'rmPower');
    // set filter + access toggle
    var sets = {}; POWERS().forEach(function (p) { var s = (p.powerSet && p.powerSet !== 'None') ? p.powerSet : 'Basic'; sets[s] = 1; });
    var setList = Object.keys(sets).sort(function (a, b) { return a === 'Basic' ? -1 : b === 'Basic' ? 1 : a.localeCompare(b); });
    h += '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:4px 0;">'
      + '<select class="m-input" style="flex:2;min-width:150px;" onchange="window.MMRPGB.psetFilter(this.value)"><option value="">All types</option>'
      + setList.map(function (s) { return '<option value="' + E(s) + '"' + (B._pset === s ? ' selected' : '') + '>' + E(s) + '</option>'; }).join('') + '</select>'
      + '<label style="display:flex;align-items:center;gap:5px;font-size:11px;color:#c9b0b2;cursor:pointer;"><input type="checkbox"' + (B._showLocked ? ' checked' : '') + ' onchange="window.MMRPGB.toggleLocked(this.checked)">Show locked</label></div>';
    h += pickerBlock('power', 'Search powers…', POWERS(), unused <= 0 && !over ? 'All power picks are spent — remove a power or a conversion below.' : '');
    // conversion
    h += '<div style="background:#111013;border:1px solid #2a1c1f;border-radius:6px;padding:10px;margin-top:14px;">'
      + '<div class="m-hint" style="margin:0 0 6px;"><b>Trade unused power picks</b> — <span style="color:' + (unused < 0 ? '#df8a8a' : '#f4a6a8') + ';">' + unused + ' left</span>. One-for-one into ability points or extra traits.</div>'
      + '<div style="display:flex;gap:16px;flex-wrap:wrap;">'
      + convCtl('Ability points', 'Ability', B.convAbility)
      + convCtl('Extra traits', 'Traits', B.convTraits) + '</div></div>';
    h += iconicSection();
    // weapons
    h += '<div class="m-hint" style="margin:16px 0 2px;"><b>Weapons</b></div>';
    if (!B.attacks.length) h += '<p class="m-hint" style="margin:4px 0;color:#7a7e88;">None yet.</p>';
    else h += B.attacks.map(function (w, i) {
      var badge = (w.tier === 'Iconic' || w.owner) ? '<span style="font:800 9px/1 \'Barlow Condensed\',sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#f4a6a8;align-self:center;">Iconic' + (w.owner ? ' · ' + E(w.owner) : '') + '</span>' : '';
      var note = w.special ? '<div class="m-hint" style="flex-basis:100%;margin:0 0 2px;color:#8a8e98;">' + E(w.special) + '</div>' : '';
      return '<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;flex-wrap:wrap;">'
        + '<input class="m-input" style="flex:2;min-width:120px;" value="' + E(w.name) + '" placeholder="Weapon name" oninput="window.MMRPGB.wset(' + i + ',\'name\',this.value)">'
        + '<select class="m-input" style="flex:1;min-width:90px;" onchange="window.MMRPGB.wset(' + i + ',\'ability\',this.value)">' + ABIL.map(function (a) { return '<option value="' + a.key + '"' + (w.ability === a.key ? ' selected' : '') + '>' + a.name + '</option>'; }).join('') + '</select>'
        + '<input class="m-input" style="flex:1;min-width:80px;" value="' + E(w.range) + '" placeholder="Range" oninput="window.MMRPGB.wset(' + i + ',\'range\',this.value)">'
        + badge
        + '<button class="m-btn ghost" style="padding:6px 10px;" onclick="window.MMRPGB.rmWeapon(' + i + ')">✕</button>'
        + note + '</div>';
    }).join('');
    h += '<button class="m-btn ghost" style="margin-top:4px;" onclick="window.MMRPGB.addWeapon()">+ Add weapon</button>';
    return h;
  }
  // Iconic-item ownership sub-section (Step 5).
  function iconicSection() {
    var owned = B.iconics || [], cost = iconicCost();
    var h = '<div class="m-hint" style="margin:16px 0 2px;"><b>Iconic Items</b>' + (cost ? ' — <span style="color:#f4a6a8;">' + cost + ' pick' + (cost === 1 ? '' : 's') + ' spent</span>' : '') + '</div>';
    h += '<p class="m-hint" style="margin:0 0 6px;color:#8a8e98;">Signature gear (book or your homebrew) that grants an origin and powers for a Power Value cost. Already-picked powers reduce the cost.</p>';
    if (owned.length) h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px;">' + owned.map(function (it, i) {
      return '<span style="display:inline-flex;align-items:center;gap:6px;background:#221316;border:1px solid #3a2126;border-radius:14px;padding:3px 6px 3px 11px;font-size:12px;color:#f3e6e7;">' + E(it.name) + ' <span style="color:#8a8e98;">PV ' + (parseInt(it.powerValue, 10) || 1) + '</span><button onclick="window.MMRPGB.unownIconic(' + i + ')" style="border:none;background:#3a2126;color:#f4a6a8;border-radius:50%;width:17px;height:17px;cursor:pointer;font-size:11px;line-height:1;">✕</button></span>';
    }).join('') + '</div>';
    var iq = (B._iq || '').toLowerCase();
    var list = EQUIP().filter(function (e) { return e.tier === 'Iconic' && !iconOwned(e.name); }).filter(function (e) {
      var hay = (e.name + ' ' + (e.owner || '') + ' ' + (e.grantsPowers || '') + ' ' + (e.grantsOrigin || '')).toLowerCase();
      return !iq || hay.indexOf(iq) >= 0;
    });
    h += '<input class="m-input" value="' + E(B._iq || '') + '" placeholder="Search iconic items…" oninput="window.MMRPGB.ifilter(this.value)">';
    var focus = B._ifocus ? EQUIP().filter(function (e) { return e.name === B._ifocus; })[0] : null;
    if (focus) h += iconicDetail(focus);
    h += '<div style="max-height:22vh;overflow-y:auto;border:1px solid #201319;border-radius:5px;background:#0d0e12;margin-top:4px;">'
      + (list.length ? list.slice(0, 80).map(function (e) {
        var on = B._ifocus === e.name;
        return '<button onclick="window.MMRPGB.ifocus(\'' + jq(e.name) + '\')" style="width:100%;text-align:left;border:none;border-bottom:1px solid #201319;background:' + (on ? '#1f1418' : 'transparent') + ';color:#e6dcde;padding:7px 8px;cursor:pointer;display:flex;justify-content:space-between;gap:8px;align-items:center;">'
          + '<span>' + E(e.name) + (e._hb ? ' <span style="font-size:9px;color:#f4a6a8;letter-spacing:.08em;">HB</span>' : '') + '</span><span style="font-size:10px;color:#8a8e98;white-space:nowrap;">' + (e.owner ? E(e.owner) + ' · ' : '') + 'PV ' + (parseInt(e.powerValue, 10) || 1) + '</span></button>';
      }).join('') : '<p class="m-hint" style="padding:8px;color:#7a7e88;">No iconic items match.</p>')
      + '</div>';
    return h;
  }
  function iconicDetail(e) {
    var eff = iconicEffCost(e), can = powersUnused() >= eff;
    var h = '<div style="background:#0f1014;border:1px solid var(--mv);border-radius:6px;padding:10px 12px;margin:6px 0;">'
      + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;"><b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;">' + E(e.name) + '</b>'
      + (can ? '<button class="m-btn" style="padding:5px 12px;" onclick="window.MMRPGB.ownIconic(\'' + jq(e.name) + '\')">＋ Own (−' + eff + ')</button>' : '<span class="m-hint" style="margin:0;color:#df8a8a;">Need ' + eff + ' pick' + (eff === 1 ? '' : 's') + '</span>') + '</div>';
    var meta = [(e.type || 'Item'), e.grantsOrigin ? 'Origin: ' + e.grantsOrigin : '', 'Power Value ' + (parseInt(e.powerValue, 10) || 1)].filter(Boolean).join(' · ');
    h += '<div class="m-hint" style="margin:3px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8a8e98;">' + E(meta) + '</div>';
    if (e.grantsPowers) h += '<div class="m-hint" style="margin:5px 0 0;line-height:1.5;color:#cdc3c5;"><b style="color:#c9b0b2;">Grants:</b> ' + E(e.grantsPowers) + '</div>';
    var restr = Array.isArray(e.restrictions) ? e.restrictions.join(', ') : '';
    if (restr) h += '<div class="m-hint" style="margin:3px 0 0;"><b style="color:#c9b0b2;">Restrictions:</b> ' + E(restr) + '</div>';
    if (e.special) h += '<div class="m-hint" style="margin:3px 0 0;color:#8a8e98;">' + E(e.special) + '</div>';
    h += '</div>';
    return h;
  }
  function convCtl(label, key, val) {
    return '<div style="display:flex;align-items:center;gap:6px;"><span class="m-hint" style="margin:0;">' + E(label) + '</span>'
      + '<button class="m-btn ghost" style="padding:3px 9px;" onclick="window.MMRPGB.conv(\'' + key + '\',-1)"' + (val <= 0 ? ' disabled' : '') + '>−</button>'
      + '<b style="font-family:\'Share Tech Mono\',monospace;color:#f4a6a8;min-width:20px;text-align:center;display:inline-block;">' + val + '</b>'
      + '<button class="m-btn ghost" style="padding:3px 9px;" onclick="window.MMRPGB.conv(\'' + key + '\',1)"' + (powersUnused() <= 0 ? ' disabled' : '') + '>+</button></div>';
  }

  // shared searchable picker with focus→detail; kind = trait|tag|power
  function pickerBlock(kind, ph, list, note) {
    var q = (B._q || '').toLowerCase();
    var filtered = list.filter(function (o) {
      if (kind === 'power') {
        var setName = (o.powerSet && o.powerSet !== 'None') ? o.powerSet : 'Basic';
        if (B._pset && setName !== B._pset) return false;
        if (!B._showLocked && !accessible(o)) return false;
      }
      var hay = (o.name + ' ' + (o.powerSet || '') + ' ' + (o.effect || o.description || '')).toLowerCase();
      return !q || hay.indexOf(q) >= 0;
    });
    var shown = filtered.slice(0, 80);
    var focus = B._focus ? list.filter(function (o) { return o.name === B._focus; })[0] : null;
    var h = '';
    if (note) h += '<div class="m-hint" style="margin:2px 0;color:#df8a8a;">' + note + '</div>';
    h += '<input class="m-input" value="' + E(B._q || '') + '" placeholder="' + E(ph) + '" oninput="window.MMRPGB.pfilter(this.value)">';
    if (focus) h += itemDetail(kind, focus);
    else if (B._q) h += '<div style="display:flex;justify-content:flex-end;margin:4px 0;"><button class="m-btn ghost" style="padding:4px 10px;font-size:11px;" onclick="window.MMRPGB.addCustom(\'' + kind + '\')">+ Add “' + E(B._q) + '” as custom</button></div>';
    h += '<div id="mmrpgb-list" style="max-height:24vh;overflow-y:auto;border:1px solid #201319;border-radius:5px;background:#0d0e12;margin-top:4px;">'
      + (shown.length ? shown.map(function (o) {
        var on = B._focus === o.name;
        var meta = kind === 'power' ? ((o.powerSet && o.powerSet !== 'None' ? o.powerSet : 'Basic')) : '';
        var lock = (kind === 'power' && !accessible(o)) ? '<span style="font-size:10px;color:#8a6a6a;">🔒 ' + E(shortPrereq(o)) + '</span>' : '';
        return '<button onclick="window.MMRPGB.focusItem(\'' + jq(o.name) + '\')" style="width:100%;text-align:left;border:none;border-bottom:1px solid #201319;background:' + (on ? '#1f1418' : 'transparent') + ';color:#e6dcde;padding:7px 8px;cursor:pointer;display:flex;justify-content:space-between;gap:8px;align-items:center;">'
          + '<span>' + E(o.name) + '</span><span style="display:flex;gap:8px;align-items:center;">' + lock + (meta ? '<span style="font-size:10px;color:#8a8e98;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;">' + E(meta) + '</span>' : '') + '</span></button>';
      }).join('') : '<p class="m-hint" style="padding:8px;color:#7a7e88;">No matches' + (kind === 'power' && !B._showLocked ? ' you can access — try “Show locked”.' : '.') + '</p>')
      + '</div>';
    return h;
  }
  function shortPrereq(p) { var pr = parsePrereq(p); var bits = []; if (pr.powers.length) bits.push(pr.powers.join(', ')); if (pr.rank > B.rank) bits.push('Rank ' + pr.rank); return bits.join(' · ') || 'locked'; }
  function itemDetail(kind, o) {
    var canAdd = true, why = '';
    if (kind === 'trait') { if (B.traits.length >= traitLimit()) { canAdd = false; why = 'At trait limit'; } }
    if (kind === 'power') { if (!accessible(o)) { canAdd = false; why = 'Prereq: ' + shortPrereq(o); } else if (powersUnused() <= 0) { canAdd = false; why = 'No picks left'; } }
    var meta = kind === 'power' ? [((o.powerSet && o.powerSet !== 'None') ? o.powerSet : 'Basic'), o.action, o.duration, o.cost, o.range].filter(Boolean).join(' · ') : '';
    var body = kind === 'power' ? (o.effect || '') : (o.description || '');
    var h = '<div style="background:#0f1014;border:1px solid var(--mv);border-radius:6px;padding:10px 12px;margin:6px 0;">'
      + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;"><b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;">' + E(o.name) + '</b>'
      + (canAdd ? '<button class="m-btn" style="padding:5px 12px;" onclick="window.MMRPGB.add' + cap1(kind) + '(\'' + jq(o.name) + '\')">＋ Add</button>' : '<span class="m-hint" style="margin:0;color:#df8a8a;">' + E(why) + '</span>') + '</div>';
    if (meta) h += '<div class="m-hint" style="margin:3px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8a8e98;">' + E(meta) + '</div>';
    if (o.prerequisites && o.prerequisites !== 'None') h += '<div class="m-hint" style="margin:3px 0 0;"><b>Prereq:</b> ' + E(o.prerequisites) + '</div>';
    if (body) h += '<div class="m-hint" style="margin:5px 0 0;line-height:1.5;color:#cdc3c5;">' + E(body) + '</div>';
    if (kind === 'power' && o.fantastic) h += '<div class="m-hint" style="margin:4px 0 0;color:#f4737a;"><b>Fantastic:</b> ' + E(o.fantastic) + '</div>';
    h += '</div>';
    return h;
  }
  function cap1(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // ── STEP 6 — Ability Scores ───────────────────────────────────────────────
  function stepAbilities() {
    var left = ptsLeft();
    var h = '<p class="m-hint">Spend <b style="color:' + (left < 0 ? '#df8a8a' : '#f4a6a8') + ';">' + left + '</b> of ' + abilityBudget() + ' points'
      + (B.convAbility ? ' (5×rank + ' + B.convAbility + ' converted)' : '') + ' (cap +' + cap() + ', min −3). '
      + '<b>Defense</b> = 10 + score. <b>Non-combat check</b> = the score you add to a d616 action check.</p>';
    h += '<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:6px 10px;align-items:center;">'
      + '<div></div><div class="m-hint" style="margin:0;text-align:center;"><b>Score</b></div><div class="m-hint" style="margin:0;text-align:center;"><b>Defense</b></div><div class="m-hint" style="margin:0;text-align:center;"><b>Non-combat</b></div>';
    ABIL.forEach(function (a) {
      var v = B.scores[a.key];
      h += '<div style="display:flex;align-items:center;gap:8px;"><button class="m-btn ghost" style="padding:3px 9px;" onclick="window.MMRPGB.adj(\'' + a.key + '\',-1)"' + (v <= -3 ? ' disabled' : '') + '>−</button>'
        + '<span style="font-family:\'Oswald\',sans-serif;font-weight:600;min-width:78px;">' + E(a.name) + '</span>'
        + '<button class="m-btn ghost" style="padding:3px 9px;" onclick="window.MMRPGB.adj(\'' + a.key + '\',1)"' + (v >= cap() ? ' disabled' : '') + '>+</button></div>'
        + '<div style="text-align:center;font-family:\'Share Tech Mono\',monospace;font-size:18px;color:#f4a6a8;">' + (v >= 0 ? '+' : '') + v + '</div>'
        + '<div style="text-align:center;font-family:\'Share Tech Mono\',monospace;font-size:16px;color:#cdd;">' + (10 + v) + '</div>'
        + '<div style="text-align:center;font-family:\'Share Tech Mono\',monospace;font-size:16px;color:#9aa;">' + (v >= 0 ? '+' : '') + v + '</div>';
    });
    h += '</div>';
    var hp = Math.max(10, B.scores.resilience * 30), fp = Math.max(10, B.scores.vigilance * 30);
    h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">'
      + statChip('Health', hp, 'Resilience × 30') + statChip('Focus', fp, 'Vigilance × 30') + statChip('Karma', B.rank, 'Rank') + '</div>';
    return h;
  }
  function statChip(l, v, sub) {
    return '<div style="flex:1;min-width:96px;background:#141319;border:1px solid #241417;border-radius:6px;padding:8px 10px;text-align:center;">'
      + '<div class="m-hint" style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#8a8e98;">' + E(l) + '</div>'
      + '<div style="font-family:\'Oswald\',sans-serif;font-size:22px;font-weight:700;color:#f4a6a8;">' + v + '</div>'
      + '<div class="m-hint" style="margin:0;font-size:10px;color:#7a7e88;">' + E(sub) + '</div></div>';
  }

  // ── STEP 7 — Review ───────────────────────────────────────────────────────
  function stepReview() {
    var over = ptsLeft() < 0 && B.source === 'custom';
    var allTraits = mergeGrant(B.traits, grantedTraits()), allTags = mergeGrant(B.tags, grantedTags());
    var h = '<p class="m-hint">Looks good? Creating replaces the current sheet with this character.' + (over ? ' <b style="color:#df8a8a;">You&rsquo;ve overspent ability points — go back to Step 6.</b>' : '') + '</p>';
    h += '<div style="background:#141319;border:1px solid #241417;border-radius:6px;padding:12px;">';
    h += '<div style="font-family:\'Oswald\',sans-serif;font-size:20px;font-weight:700;color:#f4a6a8;">' + E(B.name || 'Unnamed') + '</div>';
    var sub = [B.real, 'Rank ' + B.rank, [B.origin, B.occupation].filter(Boolean).join(' · ')].filter(Boolean).join(' · ');
    if (sub) h += '<div class="m-hint" style="margin:2px 0 10px;">' + E(sub) + '</div>';
    h += '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-bottom:10px;">' + ABIL.map(function (a) {
      var v = B.scores[a.key];
      return '<div style="text-align:center;background:#0f1014;border:1px solid #241417;border-radius:4px;padding:4px 2px;"><div style="font-size:9px;color:#8a8e98;text-transform:uppercase;">' + a.name.slice(0, 3) + '</div><div style="font-family:\'Share Tech Mono\',monospace;color:#f4a6a8;">' + (v >= 0 ? '+' : '') + v + '</div><div style="font-size:9px;color:#7a7e88;">def ' + (10 + v) + '</div></div>';
    }).join('') + '</div>';
    h += '<div class="m-hint" style="margin:0 0 8px;"><b>Health</b> ' + Math.max(10, B.scores.resilience * 30) + ' · <b>Focus</b> ' + Math.max(10, B.scores.vigilance * 30) + ' · <b>Karma</b> ' + B.rank + '</div>';
    h += reviewRow('Powers (' + B.powers.length + ')', B.powers.map(function (p) { return p.name; }));
    if (B.iconics.length) h += reviewRow('Iconic items', B.iconics.map(function (it) { return it.name + ' (PV ' + (parseInt(it.powerValue, 10) || 1) + ')'; }));
    var _gp = iconicGrantedPowers(); if (_gp.length) h += reviewRow('Granted by iconics', _gp.map(function (p) { return p.name; }));
    h += reviewRow('Traits (' + allTraits.length + ')', allTraits.map(function (t) { return t.name; }));
    h += reviewRow('Tags (' + allTags.length + ')', allTags.map(function (t) { return t.name; }));
    if (B.attacks.length) h += reviewRow('Weapons', B.attacks.map(function (w) { return w.name || '—'; }));
    if (B.teams) h += reviewRow('Teams', [B.teams]);
    h += '</div>';
    return h;
  }
  function reviewRow(label, items) {
    if (!items.length) return '';
    return '<div style="margin-top:6px;"><span class="m-hint" style="margin:0;color:#c9b0b2;"><b>' + E(label) + ':</b> ' + E(items.join(', ')) + '</span></div>';
  }
  function mergeGrant(chosen, granted) {
    var out = chosen.slice(), seen = {}; out.forEach(function (t) { seen[(t.name || '').toLowerCase()] = 1; });
    granted.forEach(function (g) { var k = g.name.toLowerCase(); if (!seen[k]) { seen[k] = 1; var d = (chosen === B.traits ? traitByName : tagByName)(g.name); out.push({ name:g.name, description: d ? d.description : '' }); } });
    return out;
  }

  var STEPS = [stepSource, stepBasics, stepBio, stepTraits, stepPowers, stepAbilities, stepReview];

  // ── public API ────────────────────────────────────────────────────────────
  W.MMRPGB = {
    launch: function () {
      B = blank();
      try {
        if (typeof S !== 'undefined' && S && (S.name || spentOf(S))) {
          B.source = 'custom';
          B.name = S.name || ''; B.real = S.real || ''; B.pronouns = S.pronouns || '';
          B.rank = Math.max(1, Math.min(6, parseInt(S.rank, 10) || 1));
          B.origin = S.origin || ''; B.occupation = S.occupation || ''; B.teams = S.teams || ''; B.base = S.base || '';
          B.history = S.history || ''; B.personality = S.personality || ''; B.features = S.features || ''; B.size = S.size || 'Average';
          ABIL.forEach(function (a) { B.scores[a.key] = (S.abilities && S.abilities[a.key] != null) ? parseInt(S.abilities[a.key], 10) || 0 : 0; });
          B.traits = arr(S.traits).map(function (t) { return { name:t.name || '', description:t.description || '' }; });
          B.tags = arr(S.tags).map(function (t) { return { name:t.name || '', description:t.description || '' }; });
          // Owned iconic items are first-class; their granted powers carry a `from`
          // marker, so exclude those here (they're re-derived from B.iconics) and
          // keep only the freely-picked powers.
          B.iconics = arr(S.iconics).map(function (r) { return Object.assign({}, r); });
          B.powers = arr(S.powers).filter(function (p) { return !p.from; }).map(function (p) { return Object.assign({}, p); });
          B.attacks = arr(S.attacks).filter(function (w) { return !w._iconic; }).map(function (w) { return Object.assign({}, w); });
        }
      } catch (e) {}
      ensure(); B.step = 0; B._q = ''; B._focus = ''; paint(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    go: function (n) { if (n > B.step && B.step === 0 && !B.source) return; B.step = Math.max(0, Math.min(STEPS.length - 1, n)); B._q = ''; B._focus = ''; B._iq = ''; B._ifocus = ''; paint(); },
    next: function () { if (B.step === 0 && !B.source) return; B.step = Math.min(STEPS.length - 1, B.step + 1); B._q = ''; B._focus = ''; B._iq = ''; B._ifocus = ''; paint(); },
    back: function () { B.step = Math.max(0, B.step - 1); B._q = ''; B._focus = ''; B._iq = ''; B._ifocus = ''; paint(); },
    // step 1
    search: function (v) { B._q = v; var el = document.getElementById('mmrpgb-list'); if (el) { var q = v.toLowerCase(); var list = CHARS().filter(function (c) { return !q || (c.name + ' ' + (c.realName || '') + ' ' + (c.teams || '')).toLowerCase().indexOf(q) >= 0; }).sort(function (a, b) { return String(a.name).localeCompare(b.name); }); el.innerHTML = charRows(list); } },
    focusChar: function (id) { B._focus = (B._focus === id ? '' : id); paint(); },
    useChar: function (id) { var c = CHARS().filter(function (x) { return x.id === id; })[0]; if (c) { loadChar(c); B._focus = ''; paint(); } },
    custom: function () { var keepStep = B.step; B = blank(); B.source = 'custom'; B.step = keepStep; paint(); },
    // generic setters
    raw: function (k, v) { B[k] = v; },
    setRank: function (v) { B.rank = Math.max(1, Math.min(6, parseInt(v, 10) || 1)); ABIL.forEach(function (a) { if (B.scores[a.key] > cap()) B.scores[a.key] = cap(); }); recompute(); paint(); },
    // pickers
    pfilter: function (v) { B._q = v; B._focus = ''; paint(); refocusSearch(); },
    psetFilter: function (v) { B._pset = v; B._focus = ''; paint(); },
    toggleLocked: function (on) { B._showLocked = !!on; paint(); },
    focusItem: function (n) { B._focus = (B._focus === n ? '' : n); paint(); },
    addTrait: function (n) { if (B.traits.length >= traitLimit()) return; if (!exists(B.traits, n)) { var d = traitByName(n); B.traits.push({ name:n, description:d ? d.description : '' }); } B._q = ''; B._focus = ''; paint(); },
    addTag: function (n) { if (!exists(B.tags, n)) { var d = tagByName(n); B.tags.push({ name:n, description:d ? d.description : '' }); } B._q = ''; B._focus = ''; paint(); },
    addPower: function (n) { if (powersUnused() <= 0) return; if (!exists(B.powers, n)) { var p = powerByName(n) || {}; B.powers.push({ name:n, powerSet:p.powerSet || '', action:p.action || '', duration:p.duration || '', cost:p.cost || '', range:p.range || '', prerequisites:p.prerequisites || '', effect:p.effect || '', fantastic:p.fantastic || '' }); } B._q = ''; B._focus = ''; paint(); },
    addCustom: function (kind) { var n = (B._q || '').trim(); if (!n) return; if (kind === 'trait') this.addTrait(n); else if (kind === 'tag') this.addTag(n); else this.addPower(n); },
    rmTrait: function (i) { B.traits.splice(i, 1); paint(); },
    rmTag: function (i) { B.tags.splice(i, 1); paint(); },
    rmPower: function (i) { B.powers.splice(i, 1); paint(); },
    // conversion (power picks → ability points / trait slots)
    conv: function (kind, d) {
      if (d > 0 && powersUnused() <= 0) return;
      var key = 'conv' + kind; if (B[key] + d < 0) return;
      B[key] += d; if (kind === 'Ability') recompute(); paint();
    },
    // weapons
    addWeapon: function () { B.attacks.push(mkEquip({ name:'', damageBonus:'+1', multBonus:1 }, false)); paint(); },
    wset: function (i, k, v) { if (B.attacks[i]) B.attacks[i][k] = v; },
    rmWeapon: function (i) { B.attacks.splice(i, 1); paint(); },
    // iconic items
    ifilter: function (v) { B._iq = v; B._ifocus = ''; paint(); refocusBy('Search iconic'); },
    ifocus: function (n) { B._ifocus = (B._ifocus === n ? '' : n); paint(); },
    ownIconic: function (n) { var e = equipByName(n); if (!e || e.tier !== 'Iconic' || iconOwned(n)) return; if (powersUnused() < iconicEffCost(e)) return; B.iconics.push(Object.assign({}, e)); B._iq = ''; B._ifocus = ''; paint(); },
    unownIconic: function (i) { B.iconics.splice(i, 1); paint(); },
    // step 6
    adj: function (k, d) { var nv = B.scores[k] + d; if (nv < -3 || nv > cap()) return; B.scores[k] = nv; recompute(); paint(); },
    // finish
    apply: function () {
      var d = {
        name:B.name, real:B.real, pronouns:B.pronouns, rank:B.rank,
        origin:B.origin, occupation:B.occupation, history:B.history, personality:B.personality,
        features:B.features, base:B.base, teams:B.teams, size:B.size,
        abilities:{}, traits:mergeGrant(B.traits, grantedTraits().concat(iconicDerivedTraits())), tags:mergeGrant(B.tags, grantedTags()),
        powers:B.powers.concat(iconicGrantedPowers()),
        attacks:B.attacks.concat((B.iconics || []).filter(function (it) { return !exists(B.attacks, it.name); }).map(function (it) { var e = mkEquip(it, true); e._iconic = true; return e; })),
        iconics:B.iconics.slice()
      };
      ABIL.forEach(function (a) { d.abilities[a.key] = B.scores[a.key]; });
      var hp = Math.max(10, B.scores.resilience * 30), fp = Math.max(10, B.scores.vigilance * 30);
      d.health = { cur:hp, max:hp }; d.focus = { cur:fp, max:fp }; d.karma = { cur:B.rank, max:B.rank };
      try { applySheet(d); } catch (e) {}
      this.close();
      try { addLog('Hero Built', B.name || 'Unnamed', 'Rank ' + B.rank + (B.origin ? ' · ' + B.origin : '') + (B.source && B.source !== 'custom' ? ' · from ' + B.sourceName : ''), 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
  function exists(list, n) { var k = String(n).toLowerCase(); return list.some(function (x) { return (x.name || '').toLowerCase() === k; }); }
  function spentOf(s) { try { return ABIL.some(function (a) { return s.abilities && s.abilities[a.key]; }); } catch (e) { return false; } }
  function refocusSearch() { refocusBy('Search'); }
  function refocusBy(prefix) { try { var b = document.getElementById('mmrpgb-body'); if (!b) return; var inp = b.querySelector('input[placeholder^="' + prefix + '"]'); if (inp) { inp.focus(); var n = inp.value.length; inp.setSelectionRange(n, n); } } catch (e) {} }
})();
