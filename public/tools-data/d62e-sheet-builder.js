// D6 System: Second Edition (Gallant Knight Games 2024) character builder — the
// "Create" button on the sheet. Two paths mirror the Star Wars builder:
//   (1) pick a Template (fixed attributes) then spend 7D of skill adds, or
//   (2) a la carte — assign 12D of attributes (1D-5D each) then 7D of skill adds.
// Then a details step (name / player / genre) and a starting-equipment step.
// Uses the sheet's globals (D62E_* data, code/pipsFrom, applySheet, collectSheet,
// saveSheet, syncDocTitle, addLog, esc, $, norm, D, CORE_ATTRS). Load after the sheet script.
(function () {
  const ATTR_MIN = 3, ATTR_MAX = 15, ATTR_TOTAL = 36;   // 1D-5D each, 12D total
  const SKILL_TOTAL = 21, SKILL_PER = 6;                 // 7D of adds, max +2D per skill
  let step = 0, mode = null, tpl = null, genre = 'core';
  let attrAlloc = { Agility: 3, Brawn: 3, Knowledge: 3, Perception: 3 };
  let skillAlloc = {}, details = {}, gearPicks = {}, _lastStep = -1;
  let ov = null;

  const templates = () => (typeof D62E_TEMPLATES !== 'undefined' ? D62E_TEMPLATES : []);
  const skillsData = () => (typeof D62E_SKILLS !== 'undefined' ? D62E_SKILLS : []);
  const equipData = () => (typeof D62E_EQUIPMENT !== 'undefined' ? D62E_EQUIPMENT : []);
  const powersData = () => (typeof D62E_POWERS !== 'undefined' ? D62E_POWERS : []);
  const genreOk = item => { const g = item && item.genre; return !g || g === 'core' || g === genre; };

  function steps() { return mode === 'alacarte' ? ['Path', 'Attributes', 'Skills', 'Details', 'Gear'] : ['Path', 'Skills', 'Details', 'Gear']; }
  function charAttrs() {
    if (mode === 'alacarte') return Object.assign({}, attrAlloc);
    return tpl ? Object.assign({}, tpl.attributes) : { Agility: 9, Brawn: 9, Knowledge: 9, Perception: 9 };
  }
  function attrSpent() { return Object.values(attrAlloc).reduce((a, b) => a + b, 0); }
  function skillSpent() { return Object.values(skillAlloc).reduce((a, b) => a + Math.max(0, b), 0); }
  // Additional Attribute Budgets option (read from the sheet's live options): +3D (9 pips)
  // of attribute budget for each attribute the character has beyond the four core.
  const attrBudgetOn = () => (typeof options !== 'undefined' && options && !!options.attrBudget);
  function optionalCount() { return Object.keys(attrAlloc).filter(a => CORE_ATTRS.indexOf(a) < 0).length; }
  function attrTotal() { return ATTR_TOTAL + (attrBudgetOn() ? 9 * optionalCount() : 0); }
  // Recommended skills for a template: structured skills + text in the description / talents field.
  function recSkills(t) {
    const out = new Set();
    (t && t.skills || []).forEach(s => { if (s && s.name) out.add(s.name); });
    const texts = [t && t.description || ''].concat((t && t.talents) || []);
    texts.forEach(txt => {
      const m = /Recommended Skills?:\s*([^.]+)/i.exec(String(txt));
      if (m) m[1].split(',').forEach(part => {
        const name = part.replace(/\(.*?\)/g, '').replace(/must spend.*/i, '').replace(/and\s+/i, '').trim();
        const def = skillsData().find(s => norm(s.name) === norm(name));
        if (def) out.add(def.name);
      });
    });
    return [...out];
  }
  function templatePowers(t) { return (t && t.powers || []).slice(); }

  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'd62eb-overlay'; ov.className = 'ov';
    ov.innerHTML = '<div class="modal wide" style="max-height:94vh;"><div class="modal-hd"><div class="ttl" id="d62eb-title">Character Builder</div><button class="x" onclick="D62EB.close()">&#10005;</button></div>'
      + '<div id="d62eb-steps" style="display:flex;gap:4px;padding:8px 16px 0;flex-wrap:wrap;"></div>'
      + '<div class="modal-bd" id="d62eb-body"></div>'
      + '<div class="modal-ft"><button class="m-btn ghost" id="d62eb-back" onclick="D62EB.back()">← Back</button><span id="d62eb-note" style="font-size:12px;color:#999;align-self:center;flex:1;text-align:center;"></span><button class="m-btn" id="d62eb-next" onclick="D62EB.next()">Next →</button></div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) D62EB.close(); });
    document.body.appendChild(ov);
  }

  function render() {
    ensure();
    const STEPS = steps();
    $('d62eb-steps').innerHTML = STEPS.map((s, i) => '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;border:1px solid ' + (i === step ? '#e07b39' : '#3a2c22') + ';color:' + (i === step ? '#f0a860' : i < step ? '#ccc' : '#666') + ';">' + (i + 1) + '. ' + s + '</span>').join('');
    $('d62eb-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('d62eb-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    const b = $('d62eb-body'), note = $('d62eb-note');
    const keep = _lastStep === step; const bScroll = keep ? b.scrollTop : 0;
    const name = STEPS[step];
    if (name === 'Path') renderPath(b, note);
    else if (name === 'Attributes') renderAttributes(b, note);
    else if (name === 'Skills') renderSkills(b, note);
    else if (name === 'Details') renderDetails(b, note);
    else renderGear(b, note);
    if (keep) b.scrollTop = bScroll;
    _lastStep = step; ov.classList.add('open');
  }

  // ── Step: Path ────────────────────────────────────────────────────────────
  function renderPath(b, note) {
    note.textContent = mode === 'alacarte' ? 'A la carte' : tpl ? tpl.name : 'Pick a starting point';
    const tlist = templates();
    let h = '<p class="m-hint">Start from a <b>template</b> (fixed attributes, recommended skills) and add 7D of skills — or build <b>a la carte</b>, assigning 12D of attributes yourself. Pick a genre to filter what\'s available.</p>';
    h += '<div class="m-lbl">Genre</div><select id="d62eb-genre" class="m-input" style="max-width:200px;">'
      + ['core', 'fantasy', 'scifi', 'superhero'].map(g => '<option value="' + g + '"' + (genre === g ? ' selected' : '') + '>' + (g === 'scifi' ? 'Sci-Fi' : g[0].toUpperCase() + g.slice(1)) + '</option>').join('') + '</select>';
    h += '<div class="tpl-list" style="margin-top:12px;">'
      + '<div class="tpl-card' + (mode === 'alacarte' ? ' sel' : '') + '" data-alacarte="1"><b>⚙ A la carte</b><small>Assign 12D of attributes yourself, then 7D of skills.</small></div>'
      + tlist.filter(t => t.genre === genre || (genre === 'core' && t.genre === 'core')).map(t =>
        '<div class="tpl-card' + (mode === 'template' && tpl && tpl.name === t.name ? ' sel' : '') + '" data-t="' + esc(t.name) + '"><b>' + esc(t.name) + '</b><small>' + Object.keys(t.attributes).map(a => a.slice(0, 3).toUpperCase() + ' ' + code(t.attributes[a])).join(' · ') + (t.archetype ? '<br>' + esc(t.archetype) : '') + '</small></div>').join('')
      + '</div>';
    if (mode === 'template' && tpl) h += '<div style="margin-top:12px;font-size:12px;line-height:1.5;color:#ccc;"><b style="color:#f0a860;">' + esc(tpl.name) + '</b> — ' + esc(String(tpl.description || '').slice(0, 460)) + '</div>';
    b.innerHTML = h;
    $('d62eb-genre').addEventListener('change', e => { genre = e.target.value; if (mode === 'template' && tpl && tpl.genre !== genre) { tpl = null; mode = null; } skillAlloc = {}; render(); });
    b.querySelector('[data-alacarte]').addEventListener('click', () => { mode = 'alacarte'; tpl = null; attrAlloc = { Agility: 3, Brawn: 3, Knowledge: 3, Perception: 3 }; skillAlloc = {}; render(); });
    b.querySelectorAll('[data-t]').forEach(c => c.addEventListener('click', () => { tpl = templates().find(t => t.name === c.dataset.t); mode = 'template'; genre = tpl.genre || genre; skillAlloc = {}; render(); }));
  }

  // ── Step: Attributes (a la carte) ───────────────────────────────────────────
  function renderAttributes(b, note) {
    const budget = attrBudgetOn(); const total = attrTotal(); const left = total - attrSpent();
    note.textContent = 'Attribute dice left: ' + code(Math.max(0, left));
    let h = '<p class="m-hint">Assign <b>' + code(total) + '</b> across your attributes — each between <b>1D and 5D</b>.'
      + (budget ? ' Each optional attribute beyond the core four adds <b>+3D</b> to the budget.' : '') + ' Dice are whole here (fine-tune with pips on the sheet later).</p><div class="alloc">';
    const keys = CORE_ATTRS.concat(Object.keys(attrAlloc).filter(a => CORE_ATTRS.indexOf(a) < 0));
    keys.forEach(a => {
      const v = attrAlloc[a] || 0; const optional = CORE_ATTRS.indexOf(a) < 0;
      h += '<div class="a-attr"><span>' + a + ' <span style="color:#f0a860;">' + code(v) + '</span></span><span>'
        + '<button data-a="' + a + '" data-d="-3"' + (v <= ATTR_MIN ? ' disabled' : '') + '>−</button> '
        + '<button data-a="' + a + '" data-d="3"' + (v >= ATTR_MAX || left < 3 ? ' disabled' : '') + '>+</button>'
        + (optional ? ' <button data-rm="' + a + '" title="Remove attribute (refunds its dice)">✕</button>' : '') + '</span></div>';
    });
    h += '</div>';
    if (budget) {
      const avail = OPTIONAL_ATTRS.filter(a => attrAlloc[a] == null);
      if (avail.length) h += '<div class="m-lbl">Add optional attribute (+3D budget each)</div><div style="display:flex;flex-wrap:wrap;gap:5px;">' + avail.map(a => '<button type="button" class="builder-chip" data-add="' + a + '">＋ ' + a + '</button>').join('') + '</div>';
    }
    b.innerHTML = h;
    b.querySelectorAll('button[data-a]').forEach(btn => btn.addEventListener('click', () => {
      const a = btn.dataset.a, d = Number(btn.dataset.d);
      const nv = (attrAlloc[a] || 0) + d;
      if (nv < ATTR_MIN || nv > ATTR_MAX) return;
      if (d > 0 && attrTotal() - attrSpent() < d) return;
      attrAlloc[a] = nv; render();
    }));
    b.querySelectorAll('button[data-rm]').forEach(btn => btn.addEventListener('click', () => { delete attrAlloc[btn.dataset.rm]; render(); }));
    b.querySelectorAll('button[data-add]').forEach(btn => btn.addEventListener('click', () => { attrAlloc[btn.dataset.add] = ATTR_MIN; render(); }));
  }

  // ── Step: Skills ────────────────────────────────────────────────────────────
  function renderSkills(b, note) {
    const base = charAttrs();
    const left = SKILL_TOTAL - skillSpent();
    note.textContent = 'Skill dice left: ' + code(Math.max(0, left));
    const rec = mode === 'template' ? recSkills(tpl) : [];
    const groups = {};
    skillsData().forEach(s => { if (!genreOk(s)) return; if (base[s.attribute] == null) return; (groups[s.attribute] = groups[s.attribute] || []).push(s); });
    let h = '<p class="m-hint">Spend <b>7D</b> of skill adds — no more than <b>2D</b> on any one skill (pips are fine). A skill\'s code is its attribute plus the adds you put on it.'
      + (rec.length ? ' <b style="color:#f0a860;">Recommended:</b> ' + rec.map(esc).join(', ') + '.' : '') + '</p><div class="alloc">';
    Object.keys(base).forEach(a => {
      const list = groups[a]; if (!list || !list.length) return;
      h += '<div class="a-attr"><span>' + esc(a) + ' ' + code(base[a]) + '</span></div><div class="a-skills">';
      list.forEach(s => {
        const v = skillAlloc[s.name] || 0; const star = rec.indexOf(s.name) >= 0 ? ' <span style="color:#f0a860;">★</span>' : '';
        h += '<div class="a-row"><span class="a-name">' + esc(s.name) + star + '</span><span class="a-code">' + code(base[a] + v) + (v ? ' <span style="color:#f0a860;">' + code(v, true) + '</span>' : '') + '</span>'
          + '<button data-s="' + esc(s.name) + '" data-d="-1"' + (v ? '' : ' disabled') + '>−</button>'
          + '<button data-s="' + esc(s.name) + '" data-d="1"' + (v >= SKILL_PER || left <= 0 ? ' disabled' : '') + '>+</button></div>';
      });
      h += '</div>';
    });
    b.innerHTML = h + '</div>';
    b.querySelectorAll('button[data-s]').forEach(btn => btn.addEventListener('click', () => {
      const k = btn.dataset.s, d = Number(btn.dataset.d);
      const nv = Math.max(0, (skillAlloc[k] || 0) + d);
      if (nv > SKILL_PER) return; if (d > 0 && SKILL_TOTAL - skillSpent() <= 0) return;
      if (nv) skillAlloc[k] = nv; else delete skillAlloc[k]; render();
    }));
  }

  // ── Step: Details ───────────────────────────────────────────────────────────
  function renderDetails(b, note) {
    note.textContent = 'Who are you?';
    const f = (id, lbl, val, ph) => '<div class="m-lbl">' + lbl + '</div><input class="m-input" id="d62eb-' + id + '" value="' + esc(val == null ? '' : val) + '" placeholder="' + esc(ph || '') + '">';
    const ta = (id, lbl, val) => '<div class="m-lbl">' + lbl + '</div><textarea class="m-input" id="d62eb-' + id + '" rows="3">' + esc(val == null ? '' : val) + '</textarea>';
    b.innerHTML = '<p class="m-hint">Name your character. Genre is set from your starting point but you can change it.</p>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 12px;">' + f('name', 'Name', details.name, 'Character name') + f('player', 'Player', details.player, 'optional') + '</div>'
      + '<div class="m-lbl">Genre</div><select class="m-input" id="d62eb-genre2" style="max-width:200px;">' + ['core', 'fantasy', 'scifi', 'superhero'].map(g => '<option value="' + g + '"' + (genre === g ? ' selected' : '') + '>' + (g === 'scifi' ? 'Sci-Fi' : g[0].toUpperCase() + g.slice(1)) + '</option>').join('') + '</select>'
      + ta('background', 'Background', details.background != null ? details.background : (tpl ? tpl.description : ''))
      + ta('personality', 'Personality', details.personality);
    b.querySelector('#d62eb-genre2').addEventListener('change', e => { genre = e.target.value; });
  }
  function readDetails() { ['name', 'player', 'background', 'personality'].forEach(k => { const el = $('d62eb-' + k); if (el) details[k] = el.value; }); const g = $('d62eb-genre2'); if (g) genre = g.value; }

  // ── Step: Gear ──────────────────────────────────────────────────────────────
  function matchEquip(text) {
    const t = String(text).toLowerCase().replace(/\(.*?\)/g, '');
    let best = null; equipData().forEach(g => { const n = g.name.toLowerCase(); if (n.length > 3 && t.includes(n) && (!best || n.length > best.name.length)) best = g; });
    return best;
  }
  function renderGear(b, note) {
    note.textContent = 'Starting equipment';
    const list = equipData().filter(g => genreOk(g)).sort((a, c) => (a.category || '').localeCompare(c.category || '') || a.name.localeCompare(c.name));
    let h = '<p class="m-hint">Tick any starting equipment. Weapons become attack rows; armor fills the Armor box; everything else goes to Gear. You can add more on the sheet at any time.</p>';
    h += '<input class="m-input" id="d62eb-gear-search" placeholder="Filter equipment…" style="margin-bottom:8px;">';
    h += '<div id="d62eb-gear-list" style="display:flex;flex-direction:column;gap:4px;max-height:44vh;overflow:auto;">' + gearListHtml('') + '</div>';
    b.innerHTML = h;
    const search = $('d62eb-gear-search');
    search.addEventListener('input', () => { $('d62eb-gear-list').innerHTML = gearListHtml(norm(search.value)); wireGear(); });
    wireGear();
    function wireGear() { $('d62eb-gear-list').querySelectorAll('input[type=checkbox]').forEach(c => c.addEventListener('change', () => { gearPicks[c.dataset.name] = c.checked; })); }
  }
  function gearListHtml(q) {
    const list = equipData().filter(g => genreOk(g) && (!q || norm(g.name).includes(q) || norm(g.category || '').includes(q))).sort((a, c) => (a.category || '').localeCompare(c.category || '') || a.name.localeCompare(c.name));
    if (!list.length) return '<p class="brow-empty">No equipment matches.</p>';
    return list.map(g => '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#ddd;"><input type="checkbox" data-name="' + esc(g.name) + '"' + (gearPicks[g.name] ? ' checked' : '') + ' style="margin-top:3px;"><span><b style="font-family:\'Barlow Condensed\',sans-serif;">' + esc(g.name) + '</b> <span style="color:#9a8a6a;font-size:11px;">' + esc([g.category, g.damage, g.protection].filter(Boolean).join(' · ')) + '</span></span></label>').join('');
  }

  // ── Finish ──────────────────────────────────────────────────────────────────
  function finish() {
    const attrs = charAttrs();
    // Skills: recommended (template) at 0 + allocated adds.
    const skillMap = {};
    if (mode === 'template') recSkills(tpl).forEach(n => { skillMap[n] = skillMap[n] || 0; });
    Object.entries(skillAlloc).forEach(([n, v]) => { skillMap[n] = (skillMap[n] || 0) + v; });
    const skills = Object.entries(skillMap).map(([name, adds]) => ({ name, attribute: (skillsData().find(s => s.name === name) || {}).attribute || CORE_ATTRS[0], pips: adds }));
    // Equipment picks.
    const weapons = [], gear = []; let armor = { name: '', protection: '' };
    Object.keys(gearPicks).forEach(n => {
      if (!gearPicks[n]) return; const g = equipData().find(x => x.name === n); if (!g) return;
      if (g.category === 'weapon') weapons.push({ name: g.name, damage: g.damage || '', range: g.range || '', skill: (skillsData().find(s => norm(s.name) === norm(g.skill || '')) || {}).name || (g.skill || ''), notes: g.era || '' });
      else if (g.category === 'armor') { if (!armor.name) armor = { name: g.name, protection: g.protection || '' }; }
      else gear.push({ name: g.name, note: [g.era, g.description].filter(Boolean).join(' · ') });
    });
    // Template powers (superhero) → power rows.
    const powers = [];
    if (mode === 'template') templatePowers(tpl).forEach(pName => {
      const def = powersData().find(x => norm(x.name) === norm(String(pName).replace(/\(.*?\)/g, '').trim())) || {};
      powers.push({ name: pName, kind: def.kind || 'superpower', note: [def.difficulty ? 'Diff ' + def.difficulty : '', def.skill || ''].filter(Boolean).join(' · ') });
    });
    const prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    applySheet({
      system: 'D62E', name: details.name || '', player: details.player || '', genre: genre,
      template: mode === 'template' ? tpl.name : '', archetype: mode === 'template' ? (tpl.archetype || '') : '',
      attrs: attrs, skills: skills,
      heroPoints: mode === 'template' ? (tpl.heroPoints || 1) : 1, characterPoints: 0,
      dodgeOverride: null, parryOverride: null, move: '10', wound: 'none',
      weapons: weapons, armor: armor, powers: powers,
      perks: [], flaws: [], talents: [], gear: gear,
      wealth: '', background: details.background || (mode === 'template' ? tpl.description : '') || '', personality: details.personality || '', notes: '',
      campaign: prev.campaign || null,
    });
    if (typeof saveSheet === 'function') saveSheet(true);
    if (typeof syncDocTitle === 'function') syncDocTitle();
    addLog('Character built', '✓', (details.name || 'Unnamed') + (mode === 'template' ? ' — ' + tpl.name : ' — a la carte'), 'crit');
  }

  window.D62EB = {
    launch() { step = 0; mode = null; tpl = null; genre = ((typeof currentGenre === 'function') ? currentGenre() : 'core') || 'core'; attrAlloc = { Agility: 3, Brawn: 3, Knowledge: 3, Perception: 3 }; skillAlloc = {}; details = {}; gearPicks = {}; _lastStep = -1; render(); },
    close() { if (ov) ov.classList.remove('open'); },
    next() {
      const STEPS = steps();
      const name = STEPS[step];
      if (name === 'Path' && !mode) { $('d62eb-note').textContent = 'Pick a template or "A la carte"'; return; }
      if (name === 'Attributes' && attrSpent() !== attrTotal()) { $('d62eb-note').textContent = 'Assign all ' + code(attrTotal()) + ' — ' + code(attrTotal() - attrSpent(), true) + ' remaining'; return; }
      if (name === 'Skills' && skillSpent() < SKILL_TOTAL) { $('d62eb-note').textContent = 'Spend all 7D — ' + code(SKILL_TOTAL - skillSpent()) + ' left'; return; }
      if (name === 'Details') readDetails();
      if (step === STEPS.length - 1) { finish(); D62EB.close(); return; }
      step++; render();
    },
    back() { const STEPS = steps(); if (STEPS[step] === 'Details') readDetails(); if (step > 0) { step--; render(); } },
  };
})();
