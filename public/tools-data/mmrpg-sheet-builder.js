// Marvel Multiverse RPG character builder — the "Create" button on the sheet.
// A seven-step wizard:
//   1 Character   — start from a pre-made hero/villain, or a custom build
//   2 Basics      — codename, real name, pronouns, rank
//   3 Bio         — origin, occupation, history, personality, features, base…
//   4 Traits & Tags
//   5 Powers & Weapons
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
  function CHARS() { return arr(W.MMRPG_CHARACTERS); }
  var ABIL = (typeof ABILITIES !== 'undefined') ? ABILITIES : [
    { key:'melee', name:'Melee' }, { key:'agility', name:'Agility' }, { key:'resilience', name:'Resilience' },
    { key:'vigilance', name:'Vigilance' }, { key:'ego', name:'Ego' }, { key:'logic', name:'Logic' }];
  function E(s) { return (typeof esc === 'function') ? esc(s) : String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  var SIZES = ['Tiny', 'Little', 'Small', 'Average', 'Big', 'Huge', 'Gigantic'];

  // ── wizard state ──────────────────────────────────────────────────────────
  var B = null;
  function blank() {
    return { step:0, source:null, sourceName:'',
      name:'', real:'', pronouns:'', rank:1,
      origin:'', occupation:'', history:'', personality:'', features:'', base:'', teams:'', size:'Average',
      traits:[], tags:[], powers:[], attacks:[],
      scores:{ melee:0, agility:0, resilience:0, vigilance:0, ego:0, logic:0 },
      health:{ cur:10, max:10 }, focus:{ cur:10, max:10 }, karma:{ cur:1, max:1 }, hfkFromSource:false,
      _q:'' };
  }
  function budget() { return 5 * B.rank; }
  function cap() { return 3 + B.rank; }
  function spent() { var n = 0; ABIL.forEach(function (a) { n += B.scores[a.key]; }); return n; }
  function ptsLeft() { return budget() - spent(); }
  function powerBudget() { return 4 * B.rank; }

  function traitByName(n) { var k = String(n || '').toLowerCase(); return TRAITS().filter(function (t) { return t.name.toLowerCase() === k; })[0]; }
  function tagByName(n) { var k = String(n || '').toLowerCase(); return TAGS().filter(function (t) { return t.name.toLowerCase() === k; })[0]; }
  function powerByName(n) { var k = String(n || '').toLowerCase(); return POWERS().filter(function (p) { return p.name.toLowerCase() === k; })[0]; }

  // Health = Resilience×30 (min 10); Focus = Vigilance×30 (min 10); Karma = Rank.
  function recompute() {
    var h = Math.max(10, B.scores.resilience * 30), f = Math.max(10, B.scores.vigilance * 30);
    B.health = { cur:h, max:h }; B.focus = { cur:f, max:f }; B.karma = { cur:B.rank, max:B.rank };
    B.hfkFromSource = false;
  }

  // ── loading a pre-made character ──────────────────────────────────────────
  function loadChar(c) {
    B.source = c.id; B.sourceName = c.name;
    B.name = c.name || ''; B.real = c.realName || ''; B.pronouns = '';
    B.rank = Math.max(1, Math.min(6, parseInt(c.rank, 10) || 1));
    B.origin = c.origin || ''; B.occupation = c.occupation || ''; B.teams = c.teams || ''; B.base = c.base || '';
    B.history = ''; B.personality = ''; B.features = ''; B.size = 'Average';
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
    B.attacks = [];
    // The sheet always derives Health/Focus/Karma from scores + rank, so mirror
    // that here for a consistent preview (pre-made book bonuses aren't modeled).
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
    else {
      var block = (B.step === 0 && !B.source);
      next = '<button class="m-btn" onclick="window.MMRPGB.next()"' + (block ? ' disabled' : '') + '>Next →</button>';
    }
    return back + next;
  }
  function paint() {
    ensure();
    document.getElementById('mmrpgb-crumbs').innerHTML = crumbs();
    document.getElementById('mmrpgb-body').innerHTML = STEPS[B.step]();
    document.getElementById('mmrpgb-foot').innerHTML = footer();
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

  // ── STEP 1 — Character or Custom ──────────────────────────────────────────
  function stepSource() {
    var q = (B._q || '').toLowerCase();
    var list = CHARS().filter(function (c) {
      return !q || (c.name + ' ' + (c.realName || '') + ' ' + (c.teams || '')).toLowerCase().indexOf(q) >= 0;
    }).sort(function (a, b) { return String(a.name).localeCompare(b.name); });
    var h = '<p class="m-hint">Start from one of the <b>' + CHARS().length + '</b> pre-made heroes &amp; villains — it fills in everything, which you can then tweak — or build one from scratch.</p>';
    var customOn = B.source === 'custom';
    h += '<button onclick="window.MMRPGB.custom()" style="width:100%;text-align:left;border:1px solid ' + (customOn ? 'var(--mv)' : '#2a1416') + ';background:' + (customOn ? '#2a1215' : '#0f1014') + ';border-radius:6px;padding:10px 12px;cursor:pointer;color:#f3e6e7;margin-bottom:10px;">'
      + '<b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;letter-spacing:.05em;">✎ CUSTOM BUILD</b><div class="m-hint" style="margin:2px 0 0;">A blank slate — set your own name, rank, powers and scores.</div></button>';
    h += '<input class="m-input" id="mmrpgb-search" value="' + E(B._q || '') + '" placeholder="Search characters, teams, real names…" oninput="window.MMRPGB.search(this.value)" style="margin-bottom:8px;">';
    h += '<div id="mmrpgb-charlist" style="max-height:38vh;overflow-y:auto;display:flex;flex-direction:column;gap:5px;">' + charRows(list) + '</div>';
    return h;
  }
  function charRows(list) {
    if (!list.length) return '<p class="m-hint" style="color:#7a7e88;">No characters match that search.</p>';
    return list.map(function (c) {
      var on = B.source === c.id;
      var ab = ABIL.map(function (a) { var v = c.abilities ? c.abilities[a.key] : 0; return a.name.slice(0, 1) + (v >= 0 ? '+' + v : v); }).join(' ');
      return '<button onclick="window.MMRPGB.pick(\'' + c.id + '\')" style="text-align:left;border:1px solid ' + (on ? 'var(--mv)' : '#241417') + ';background:' + (on ? '#2a1215' : '#141319') + ';border-radius:5px;padding:8px 10px;cursor:pointer;color:#f3e6e7;">'
        + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;"><b style="color:#f4a6a8;font-family:\'Oswald\',sans-serif;letter-spacing:.04em;">' + E(c.name) + '</b><span style="font-size:10px;color:#8a8e98;text-transform:uppercase;letter-spacing:.1em;">Rank ' + E(c.rank) + '</span></div>'
        + (c.realName && c.realName !== c.name ? '<div class="m-hint" style="margin:1px 0 0;font-style:italic;">' + E(c.realName) + '</div>' : '')
        + '<div style="font-family:\'Share Tech Mono\',monospace;font-size:11px;color:#9aa;letter-spacing:.02em;margin-top:3px;">' + E(ab) + '</div></button>';
    }).join('');
  }

  // ── STEP 2 — Basics ───────────────────────────────────────────────────────
  function stepBasics() {
    var h = '<p class="m-hint">Who are they? Rank sets your power level — it drives your ability points, power picks and derived stats.</p>';
    h += field('Code Name', 'mmrpgb-name', B.name, 'Hero name', 'name');
    h += field('Real Name', 'mmrpgb-real', B.real, 'Secret identity', 'real');
    h += '<div style="display:flex;gap:12px;flex-wrap:wrap;">'
      + '<div style="flex:2;min-width:150px;">' + field('Pronouns', 'mmrpgb-pro', B.pronouns, 'they/them', 'pronouns') + '</div>'
      + '<div style="flex:1;min-width:120px;"><div class="m-hint" style="margin:0 0 4px;"><b>Rank</b></div><select class="m-input" onchange="window.MMRPGB.setRank(this.value)">'
      + [1,2,3,4,5,6].map(function (r) { return '<option value="' + r + '"' + (B.rank === r ? ' selected' : '') + '>Rank ' + r + '</option>'; }).join('') + '</select></div></div>';
    h += '<p class="m-hint" style="margin-top:8px;">At Rank ' + B.rank + ': <b style="color:#f4a6a8;">' + budget() + '</b> ability points (cap +' + cap() + '), <b style="color:#f4a6a8;">' + powerBudget() + '</b> powers, <b style="color:#f4a6a8;">' + B.rank + '</b> extra trait' + (B.rank === 1 ? '' : 's') + '.</p>';
    return h;
  }

  // ── STEP 3 — Bio ──────────────────────────────────────────────────────────
  function stepBio() {
    var oc = OCC().filter(function (o) { return o.name === B.occupation; })[0];
    var orn = ORIG().filter(function (o) { return o.name === B.origin; })[0];
    var h = '<p class="m-hint">Origin and occupation shape the story — and each suggests traits, tags and powers.</p>';
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
    var h = '<p class="m-hint">Traits are knacks and quirks; tags are facts about your hero the story hangs on. You get about <b>' + B.rank + '</b> extra trait' + (B.rank === 1 ? '' : 's') + ' beyond what your origin and occupation grant.</p>';
    h += '<div class="m-hint" style="margin:0 0 2px;"><b>Traits</b> (' + B.traits.length + ')</div>' + chips(B.traits, 'rmTrait');
    h += picker('trait', 'Add a trait…', TRAITS());
    h += '<div class="m-hint" style="margin:14px 0 2px;"><b>Tags</b> (' + B.tags.length + ')</div>' + chips(B.tags, 'rmTag');
    h += picker('tag', 'Add a tag…', TAGS());
    return h;
  }

  // ── STEP 5 — Powers & Weapons ─────────────────────────────────────────────
  function stepPowers() {
    var over = B.powers.length > powerBudget();
    var h = '<p class="m-hint">Pick your powers — a Rank ' + B.rank + ' hero gets about <b style="color:' + (over ? '#df8a8a' : '#f4a6a8') + ';">' + B.powers.length + ' / ' + powerBudget() + '</b>. Add signature weapons below (they roll from the Attacks tab).</p>';
    h += '<div class="m-hint" style="margin:0 0 2px;"><b>Powers</b></div>' + chips(B.powers, 'rmPower');
    h += picker('power', 'Search powers by name or set…', POWERS());
    h += '<div class="m-hint" style="margin:16px 0 2px;"><b>Weapons</b></div>';
    if (!B.attacks.length) h += '<p class="m-hint" style="margin:4px 0;color:#7a7e88;">None yet.</p>';
    else h += B.attacks.map(function (w, i) {
      return '<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;flex-wrap:wrap;">'
        + '<input class="m-input" style="flex:2;min-width:120px;" value="' + E(w.name) + '" placeholder="Weapon name" oninput="window.MMRPGB.wset(' + i + ',\'name\',this.value)">'
        + '<select class="m-input" style="flex:1;min-width:90px;" onchange="window.MMRPGB.wset(' + i + ',\'ability\',this.value)">' + ABIL.map(function (a) { return '<option value="' + a.key + '"' + (w.ability === a.key ? ' selected' : '') + '>' + a.name + '</option>'; }).join('') + '</select>'
        + '<input class="m-input" style="flex:1;min-width:80px;" value="' + E(w.range) + '" placeholder="Range" oninput="window.MMRPGB.wset(' + i + ',\'range\',this.value)">'
        + '<button class="m-btn ghost" style="padding:6px 10px;" onclick="window.MMRPGB.rmWeapon(' + i + ')">✕</button></div>';
    }).join('');
    h += '<button class="m-btn ghost" style="margin-top:4px;" onclick="window.MMRPGB.addWeapon()">+ Add weapon</button>';
    return h;
  }

  // shared searchable picker for traits / tags / powers
  function picker(kind, ph, list) {
    var q = (B._q || '').toLowerCase();
    var filtered = list.filter(function (o) {
      var hay = (o.name + ' ' + (o.powerSet || '') + ' ' + (o.effect || o.description || '')).toLowerCase();
      return !q || hay.indexOf(q) >= 0;
    }).slice(0, 60);
    var rows = filtered.map(function (o) {
      var meta = kind === 'power' ? (o.powerSet && o.powerSet !== 'None' ? o.powerSet : 'Basic') : '';
      return '<button onclick="window.MMRPGB.add' + cap1(kind) + '(\'' + E(o.name).replace(/'/g, "\\'") + '\')" style="text-align:left;border:none;border-bottom:1px solid #201319;background:transparent;color:#e6dcde;padding:7px 8px;cursor:pointer;display:flex;justify-content:space-between;gap:8px;">'
        + '<span>' + E(o.name) + '</span>' + (meta ? '<span style="font-size:10px;color:#8a8e98;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;">' + E(meta) + '</span>' : '') + '</button>';
    }).join('') || '<p class="m-hint" style="padding:8px;color:#7a7e88;">No matches — type a name to add a custom one.</p>';
    return '<input class="m-input" id="mmrpgb-search" value="' + E(B._q || '') + '" placeholder="' + E(ph) + '" oninput="window.MMRPGB.pfilter(this.value)">'
      + '<div style="display:flex;justify-content:flex-end;margin:4px 0;">' + (B._q ? '<button class="m-btn ghost" style="padding:4px 10px;font-size:11px;" onclick="window.MMRPGB.addCustom(\'' + kind + '\')">+ Add “' + E(B._q) + '” as custom</button>' : '') + '</div>'
      + '<div id="mmrpgb-plist" style="max-height:26vh;overflow-y:auto;border:1px solid #201319;border-radius:5px;background:#0d0e12;">' + rows + '</div>';
  }
  function cap1(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // ── STEP 6 — Ability Scores ───────────────────────────────────────────────
  function stepAbilities() {
    var left = ptsLeft();
    var h = '<p class="m-hint">Spend <b style="color:' + (left < 0 ? '#df8a8a' : '#f4a6a8') + ';">' + left + '</b> of ' + budget() + ' points (cap +' + cap() + ', min −3; a negative score refunds points). '
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
    var h = '<p class="m-hint">Looks good? Creating replaces the current sheet with this character.' + (over ? ' <b style="color:#df8a8a;">You&rsquo;ve overspent ability points — go back to Step 6.</b>' : '') + '</p>';
    h += '<div style="background:#141319;border:1px solid #241417;border-radius:6px;padding:12px;">';
    h += '<div style="font-family:\'Oswald\',sans-serif;font-size:20px;font-weight:700;color:#f4a6a8;">' + E(B.name || 'Unnamed') + '</div>';
    var sub = [B.real, 'Rank ' + B.rank, [B.origin, B.occupation].filter(Boolean).join(' · ')].filter(Boolean).join(' · ');
    if (sub) h += '<div class="m-hint" style="margin:2px 0 10px;">' + E(sub) + '</div>';
    h += '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-bottom:10px;">' + ABIL.map(function (a) {
      var v = B.scores[a.key];
      return '<div style="text-align:center;background:#0f1014;border:1px solid #241417;border-radius:4px;padding:4px 2px;"><div style="font-size:9px;color:#8a8e98;text-transform:uppercase;">' + a.name.slice(0, 3) + '</div><div style="font-family:\'Share Tech Mono\',monospace;color:#f4a6a8;">' + (v >= 0 ? '+' : '') + v + '</div><div style="font-size:9px;color:#7a7e88;">def ' + (10 + v) + '</div></div>';
    }).join('') + '</div>';
    h += '<div class="m-hint" style="margin:0 0 8px;"><b>Health</b> ' + B.health.max + ' · <b>Focus</b> ' + B.focus.max + ' · <b>Karma</b> ' + B.karma.max + '</div>';
    h += reviewRow('Powers (' + B.powers.length + ')', B.powers.map(function (p) { return p.name; }));
    h += reviewRow('Traits (' + B.traits.length + ')', B.traits.map(function (t) { return t.name; }));
    h += reviewRow('Tags (' + B.tags.length + ')', B.tags.map(function (t) { return t.name; }));
    if (B.attacks.length) h += reviewRow('Weapons', B.attacks.map(function (w) { return w.name || '—'; }));
    if (B.teams) h += reviewRow('Teams', [B.teams]);
    h += '</div>';
    return h;
  }
  function reviewRow(label, items) {
    if (!items.length) return '';
    return '<div style="margin-top:6px;"><span class="m-hint" style="margin:0;color:#c9b0b2;"><b>' + E(label) + ':</b> ' + E(items.join(', ')) + '</span></div>';
  }

  var STEPS = [stepSource, stepBasics, stepBio, stepTraits, stepPowers, stepAbilities, stepReview];

  // ── public API ────────────────────────────────────────────────────────────
  W.MMRPGB = {
    launch: function () {
      B = blank();
      try {
        if (typeof S !== 'undefined' && S && (S.name || spentOf(S))) {
          // Pre-fill from the live sheet so "Create" can also edit the current hero.
          B.source = 'custom';
          B.name = S.name || ''; B.real = S.real || ''; B.pronouns = S.pronouns || '';
          B.rank = Math.max(1, Math.min(6, parseInt(S.rank, 10) || 1));
          B.origin = S.origin || ''; B.occupation = S.occupation || ''; B.teams = S.teams || ''; B.base = S.base || '';
          B.history = S.history || ''; B.personality = S.personality || ''; B.features = S.features || ''; B.size = S.size || 'Average';
          ABIL.forEach(function (a) { B.scores[a.key] = (S.abilities && S.abilities[a.key] != null) ? parseInt(S.abilities[a.key], 10) || 0 : 0; });
          B.traits = arr(S.traits).map(function (t) { return { name:t.name || '', description:t.description || '' }; });
          B.tags = arr(S.tags).map(function (t) { return { name:t.name || '', description:t.description || '' }; });
          B.powers = arr(S.powers).map(function (p) { return Object.assign({}, p); });
          B.attacks = arr(S.attacks).map(function (w) { return Object.assign({}, w); });
          if (S.health) B.health = { cur:S.health.cur, max:S.health.max };
          if (S.focus) B.focus = { cur:S.focus.cur, max:S.focus.max };
          if (S.karma) B.karma = { cur:S.karma.cur, max:S.karma.max };
        }
      } catch (e) {}
      ensure(); B.step = 0; B._q = ''; paint(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    go: function (n) { if (n < B.step || (B.step === 0 ? B.source : true)) { B.step = Math.max(0, Math.min(STEPS.length - 1, n)); B._q = ''; paint(); } },
    next: function () { if (B.step === 0 && !B.source) return; B.step = Math.min(STEPS.length - 1, B.step + 1); B._q = ''; paint(); },
    back: function () { B.step = Math.max(0, B.step - 1); B._q = ''; paint(); },
    // step 1
    search: function (v) { B._q = v; var el = document.getElementById('mmrpgb-charlist'); if (el) { var q = v.toLowerCase(); var list = CHARS().filter(function (c) { return !q || (c.name + ' ' + (c.realName || '') + ' ' + (c.teams || '')).toLowerCase().indexOf(q) >= 0; }).sort(function (a, b) { return String(a.name).localeCompare(b.name); }); el.innerHTML = charRows(list); } },
    pick: function (id) { var c = CHARS().filter(function (x) { return x.id === id; })[0]; if (c) { loadChar(c); paint(); } },
    custom: function () { var b = blank(); b.step = 0; B = b; B.source = 'custom'; paint(); },
    // generic raw setter (text/select fields)
    raw: function (k, v) { B[k] = v; if (k === 'name' && B.step === 0) return; },
    setRank: function (v) { B.rank = Math.max(1, Math.min(6, parseInt(v, 10) || 1)); ABIL.forEach(function (a) { if (B.scores[a.key] > cap()) B.scores[a.key] = cap(); }); recompute(); paint(); },
    // step 4/5 pickers
    pfilter: function (v) { B._q = v; var el = document.getElementById('mmrpgb-plist'); if (el && document.getElementById('mmrpgb-body')) { paint(); refocus('mmrpgb-search'); } },
    addTrait: function (n) { if (!exists(B.traits, n)) { var d = traitByName(n); B.traits.push({ name:n, description:d ? d.description : '' }); } B._q = ''; paint(); },
    addTag: function (n) { if (!exists(B.tags, n)) { var d = tagByName(n); B.tags.push({ name:n, description:d ? d.description : '' }); } B._q = ''; paint(); },
    addPower: function (n) { if (!exists(B.powers, n)) { var p = powerByName(n) || {}; B.powers.push({ name:n, powerSet:p.powerSet || '', action:p.action || '', duration:p.duration || '', cost:p.cost || '', range:p.range || '', prerequisites:p.prerequisites || '', effect:p.effect || '', fantastic:p.fantastic || '' }); } B._q = ''; paint(); },
    addCustom: function (kind) { var n = (B._q || '').trim(); if (!n) return; if (kind === 'trait') this.addTrait(n); else if (kind === 'tag') this.addTag(n); else this.addPower(n); },
    rmTrait: function (i) { B.traits.splice(i, 1); paint(); },
    rmTag: function (i) { B.tags.splice(i, 1); paint(); },
    rmPower: function (i) { B.powers.splice(i, 1); paint(); },
    // step 5 weapons
    addWeapon: function () { B.attacks.push({ name:'', ability:'melee', range:'', notes:'' }); paint(); },
    wset: function (i, k, v) { if (B.attacks[i]) B.attacks[i][k] = v; },
    rmWeapon: function (i) { B.attacks.splice(i, 1); paint(); },
    // step 6
    adj: function (k, d) { var nv = B.scores[k] + d; if (nv < -3 || nv > cap()) return; B.scores[k] = nv; recompute(); paint(); },
    // finish
    apply: function () {
      var d = {
        name:B.name, real:B.real, pronouns:B.pronouns, rank:B.rank,
        origin:B.origin, occupation:B.occupation, history:B.history, personality:B.personality,
        features:B.features, base:B.base, teams:B.teams, size:B.size,
        abilities:{}, traits:B.traits.slice(), tags:B.tags.slice(), powers:B.powers.slice(), attacks:B.attacks.slice()
      };
      var hp = Math.max(10, B.scores.resilience * 30), fp = Math.max(10, B.scores.vigilance * 30);
      d.health = { cur:hp, max:hp }; d.focus = { cur:fp, max:fp }; d.karma = { cur:B.rank, max:B.rank };
      ABIL.forEach(function (a) { d.abilities[a.key] = B.scores[a.key]; });
      try { applySheet(d); } catch (e) {}
      this.close();
      try { addLog('Hero Built', B.name || 'Unnamed', 'Rank ' + B.rank + (B.origin ? ' · ' + B.origin : '') + (B.source && B.source !== 'custom' ? ' · from ' + B.sourceName : ''), 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
  function exists(list, n) { var k = String(n).toLowerCase(); return list.some(function (x) { return (x.name || '').toLowerCase() === k; }); }
  function spentOf(s) { try { return ABIL.some(function (a) { return s.abilities && s.abilities[a.key]; }); } catch (e) { return false; } }
  function refocus(id) { try { var el = document.getElementById(id); if (el) { el.focus(); var n = el.value.length; el.setSelectionRange(n, n); } } catch (e) {} }
})();
