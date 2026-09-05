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
  let step = 0, mode = null, tpl = null, genre = 'all', maxStep = 0;
  let attrAlloc = { Agility: 3, Brawn: 3, Knowledge: 3, Perception: 3 };
  let skillAlloc = {}, details = {}, gearPicks = {}, _lastStep = -1;
  // traitPicks / powerPicks map name -> chosen rank (number, >=1). Absent = not picked.
  let traitPicks = {}, traitKind = '', traitQ = '';
  let powerPicks = {}, powerLevel = 'none', powerKind = '', powerQ = '';
  let bopts = {}, bgearCat = '', bgearQ = '', bgearEra = '';
  let ov = null;
  const STEP_LABELS = { Extras: 'Troubles & Assets' };
  // Replace a scrollable list's contents in place, preserving its scroll position + focus.
  function relist(id, html, wire) { const el = $(id); if (!el) { if (wire) wire(); return; } const sp = el.scrollTop; el.innerHTML = html; el.scrollTop = sp; if (wire) wire(); }
  function freshOpts() { return (typeof defaultOptions === 'function') ? defaultOptions() : { noDodge:false, wildDie:'core', heroModel:'basic', advancement:'none', magicPoints:false, specialization:false, attrBudget:true, powerLevel:'none', xp:0, milestones:0, arcs:[], magicAlignment:0, magicCurrent:0 }; }
  // ── Power Levels (pg 212): key, label, superpower-dice pool ──
  const POWER_LEVELS = [['none','None',0],['young','Young Heroes',8],['street','Street Level',10],['standard','Standard Hero',12],['national','National Heroic Team',16],['worldwide','Worldwide Heroic Team',20],['galactic','Galactic & Cosmic Heroes',24]];
  function powerLevelDice() { const r = POWER_LEVELS.find(l => l[0] === powerLevel); return r ? r[2] : 0; }

  const templates = () => (typeof D62E_TEMPLATES !== 'undefined' ? D62E_TEMPLATES : []);
  const skillsData = () => (typeof D62E_SKILLS !== 'undefined' ? D62E_SKILLS : []);
  const equipData = () => (typeof D62E_EQUIPMENT !== 'undefined' ? D62E_EQUIPMENT : []);
  const powersData = () => (typeof D62E_POWERS !== 'undefined' ? D62E_POWERS : []);
  const genreOk = item => { const g = item && item.genre; if (genre === 'all') return true; return !g || g === 'core' || g === genre; };
  // Templates only: All shows everything, Core shows only core, a specific genre shows only that genre (no core).
  const templateGenreOk = t => { const g = t && t.genre; if (genre === 'all') return true; if (genre === 'core') return g === 'core'; return g === genre; };

  function steps() { const s = ['Options', 'Path']; if (mode === 'alacarte') s.push('Attributes'); s.push('Traits', 'Powers', 'Skills', 'Extras', 'Details', 'Gear'); return s; }
  function perksData() { return (typeof D !== 'undefined' && D.perks) ? D.perks() : (typeof D62E_PERKS !== 'undefined' ? D62E_PERKS : []); }
  // ── Perk/flaw/talent cost parsing (pg 102) ──
  function parseRankRange(costStr) {
    const s = String(costStr == null ? '' : costStr);
    let m = /\(R(\d+)\s*[-–]\s*R?(\d+)\)/.exec(s); if (m) return { min: +m[1], max: +m[2] };
    m = /\(R(\d+)\s*or\s*more\)/i.exec(s); if (m) return { min: +m[1], max: 5 };
    m = /\(R(\d+)\)/.exec(s); if (m) return { min: +m[1], max: +m[1] };
    return { min: 1, max: 1 };
  }
  function isPerRank(costStr) { return /per\s*rank/i.test(String(costStr == null ? '' : costStr)); }
  function leadingInt(costStr) { const m = /(\d+)/.exec(String(costStr == null ? '' : costStr)); return m ? +m[1] : 0; }
  function talentCostFor(t, rank) { if (t.cost == null || String(t.cost).trim() === '') return 0; return isPerRank(t.cost) ? leadingInt(t.cost) * (rank || 1) : leadingInt(t.cost); }
  function traitRankBounds(t) { if (t.kind === 'perk' || t.kind === 'flaw') return parseRankRange(t.cost); if (t.kind === 'talent' && isPerRank(t.cost)) return { min: 1, max: 5 }; return { min: 1, max: 1 }; }
  function traitHasStepper(t) { const b = traitRankBounds(t); return (t.kind === 'perk' || t.kind === 'flaw' || (t.kind === 'talent' && isPerRank(t.cost))) && b.max > b.min; }
  // Skill-die delta (dice) from picked perks/flaws/talents. Troubles & assets: 0.
  function traitDeltaDice() {
    let d = 0;
    Object.keys(traitPicks).forEach(n => { const t = perksData().find(x => x.name === n); if (!t) return; const r = traitPicks[n] || 1;
      if (t.kind === 'perk') d -= r; else if (t.kind === 'flaw') d += r; else if (t.kind === 'talent') d -= talentCostFor(t, r); });
    return d;
  }
  function skillBudgetPips() { return Math.max(0, SKILL_TOTAL + traitDeltaDice() * 3); }
  function perkPoints() { let n = 0; Object.keys(traitPicks).forEach(k => { const t = perksData().find(x => x.name === k); if (t && t.kind === 'perk') n += traitPicks[k] || 1; }); return n; }
  function flawPoints() { let n = 0; Object.keys(traitPicks).forEach(k => { const t = perksData().find(x => x.name === k); if (t && t.kind === 'flaw') n += traitPicks[k] || 1; }); return n; }
  // ── Power cost parsing (pg 212) — only superpowers spend from the pool ──
  function powerCostFor(p, rank) { if (p.kind !== 'superpower' || p.cost == null) return 0; return isPerRank(p.cost) ? leadingInt(p.cost) * (rank || 1) : leadingInt(p.cost); }
  function powerPerRank(p) { return p.kind === 'superpower' && isPerRank(p.cost); }
  function powerPoolSpent() { let s = 0; Object.keys(powerPicks).forEach(n => { const p = powersData().find(x => x.name === n); if (p) s += powerCostFor(p, powerPicks[n] || 1); }); return s; }
  function charAttrs() {
    if (mode === 'alacarte') return Object.assign({}, attrAlloc);
    return tpl ? Object.assign({}, tpl.attributes) : { Agility: 9, Brawn: 9, Knowledge: 9, Perception: 9 };
  }
  function attrSpent() { return Object.values(attrAlloc).reduce((a, b) => a + b, 0); }
  function skillSpent() { return Object.values(skillAlloc).reduce((a, b) => a + Math.max(0, b), 0); }
  // Additional Attribute Budgets option (read from the sheet's live options): +3D (9 pips)
  // of attribute budget for each attribute the character has beyond the four core.
  const attrBudgetOn = () => !!(bopts && bopts.attrBudget);
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
    if (maxStep > STEPS.length - 1) maxStep = STEPS.length - 1;
    // Step breadcrumb — click any reached step to jump straight to it (data kept).
    $('d62eb-steps').innerHTML = STEPS.map((s, i) => {
      const label = STEP_LABELS[s] || s; const reachable = i <= maxStep;
      return '<span data-stepidx="' + i + '" style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;cursor:' + (reachable ? 'pointer' : 'default') + ';border:1px solid ' + (i === step ? '#e07b39' : '#3a2c22') + ';color:' + (i === step ? '#f0a860' : reachable ? '#ccc' : '#666') + ';">' + (i + 1) + '. ' + esc(label) + '</span>';
    }).join('');
    $('d62eb-steps').querySelectorAll('[data-stepidx]').forEach(el => el.addEventListener('click', () => {
      const i = +el.dataset.stepidx; if (i > maxStep || i === step) return;
      if (STEPS[step] === 'Details') readDetails();
      step = i; render();
    }));
    $('d62eb-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('d62eb-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    const b = $('d62eb-body'), note = $('d62eb-note');
    const keep = _lastStep === step;
    const bScroll = keep ? b.scrollTop : 0;
    const innerScroll = keep ? [...b.querySelectorAll('.brow-list,.alloc,.tpl-list')].map(e => e.scrollTop) : [];
    const name = STEPS[step];
    if (name === 'Options') renderOptionsStep(b, note);
    else if (name === 'Path') renderPath(b, note);
    else if (name === 'Attributes') renderAttributes(b, note);
    else if (name === 'Traits') renderTraits(b, note);
    else if (name === 'Powers') renderPowers(b, note);
    else if (name === 'Skills') renderSkills(b, note);
    else if (name === 'Extras') renderExtras(b, note);
    else if (name === 'Details') renderDetails(b, note);
    else renderGear(b, note);
    if (keep) { b.scrollTop = bScroll; [...b.querySelectorAll('.brow-list,.alloc,.tpl-list')].forEach((e, i) => { if (innerScroll[i] != null) e.scrollTop = innerScroll[i]; }); }
    _lastStep = step; ov.classList.add('open');
  }

  // ── Step: Options (table rules — reuses the sheet's options model) ──────────
  function optRow(name, note2, control) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #2a221c;"><div style="flex:1;min-width:0;"><div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:800;font-size:14px;color:#f0e2d6;letter-spacing:.02em;">' + esc(name) + '</div><div style="font-size:11px;color:#a89888;line-height:1.35;margin-top:2px;">' + note2 + '</div></div>' + control + '</div>';
  }
  function bchk(key) { return '<button type="button" class="opt-check' + (bopts[key] ? ' on' : '') + '" data-optk="' + key + '" aria-label="toggle"></button>'; }
  function bsel(key, opts) { return '<select class="m-input" data-opts="' + key + '" style="width:auto;min-width:120px;flex:0 0 auto;">' + opts.map(o => '<option value="' + o[0] + '"' + (bopts[key] === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>'; }
  function renderOptionsStep(b, note) {
    note.textContent = 'Genre & table rules';
    let h = '<p class="m-hint">Pick a <b>genre</b> to focus the builder, then set the optional rules your table uses. Genre filters the skills, templates, perks/flaws/talents and powers you\'ll see (Core content always shows; <b>All</b> shows everything).</p>';
    h += '<div class="m-lbl">Genre</div><select class="m-input" id="d62eb-bgenre" style="max-width:220px;margin-bottom:12px;">'
      + [['all','All'],['core','Core'],['fantasy','Fantasy'],['scifi','Sci-Fi'],['superhero','Superhero']].map(o => '<option value="' + o[0] + '"' + (genre === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select>';
    h += optRow('No Dodge Defense', 'Ranged attacks use fixed difficulties instead of a Dodge score.', bchk('noDodge'));
    h += optRow('Alt Wild Die', 'Core / Basic / Classic / Simple behaviour on a natural 1.', bsel('wildDie', [['core','Core'],['basic','Basic'],['classic','Classic'],['simple','Simple']]));
    h += optRow('Hero Point Model', 'Heroic / Basic / Classic / Superheroic spend effect.', bsel('heroModel', [['heroic','Heroic'],['basic','Basic'],['classic','Classic'],['superheroic','Superheroic']]));
    h += optRow('Advancement', 'Growth tracker shown on the sheet.', bsel('advancement', [['none','None'],['xp','XP'],['milestone','Milestone'],['narrative','Narrative']]));
    h += optRow('Magic Points Casting', 'Cast from a points pool instead of straight rolls.', bchk('magicPoints'));
    h += optRow('Skill Specializations & Advanced Skills', 'Adds Adv / Spec controls to each skill on the sheet.', bchk('specialization'));
    h += optRow('Additional Attribute Budgets', 'Scales the a-la-carte attribute budget +3D per attribute beyond the core four.', bchk('attrBudget'));
    b.innerHTML = h;
    $('d62eb-bgenre').addEventListener('change', e => { genre = e.target.value; if (mode === 'template' && tpl && !templateGenreOk(tpl)) { tpl = null; mode = null; } render(); });
    b.querySelectorAll('[data-optk]').forEach(el => el.addEventListener('click', () => { bopts[el.dataset.optk] = !bopts[el.dataset.optk]; render(); }));
    b.querySelectorAll('[data-opts]').forEach(el => el.addEventListener('change', () => { bopts[el.dataset.opts] = el.value; render(); }));
  }

  // ── Step: Path ────────────────────────────────────────────────────────────
  function renderPath(b, note) {
    note.textContent = mode === 'alacarte' ? 'A la carte' : tpl ? tpl.name : 'Pick a starting point';
    // Templates filter differently: a specific non-core genre HIDES core templates.
    const tlist = templates().filter(templateGenreOk);
    let h = '<p class="m-hint">Start from a <b>template</b> (fixed attributes, recommended skills) and add 7D of skills — or build <b>a la carte</b>, assigning 12D of attributes yourself. Change the genre back on the Options step.</p>';
    h += '<div class="tpl-list">'
      + '<div class="tpl-card' + (mode === 'alacarte' ? ' sel' : '') + '" data-alacarte="1"><b>⚙ A la carte</b><small>Assign 12D of attributes yourself, then 7D of skills.</small></div>'
      + tlist.map(t =>
        '<div class="tpl-card' + (mode === 'template' && tpl && tpl.name === t.name ? ' sel' : '') + '" data-t="' + esc(t.name) + '"><b>' + esc(t.name) + '</b><small>' + Object.keys(t.attributes).map(a => a.slice(0, 3).toUpperCase() + ' ' + code(t.attributes[a])).join(' · ') + (t.archetype ? '<br>' + esc(t.archetype) : '') + ' · ' + esc(t.genre || 'core') + '</small></div>').join('')
      + '</div>';
    if (mode === 'template' && tpl) h += '<div style="margin-top:12px;font-size:12px;line-height:1.5;color:#ccc;"><b style="color:#f0a860;">' + esc(tpl.name) + '</b> — ' + esc(String(tpl.description || '').slice(0, 460)) + '</div>';
    b.innerHTML = h;
    b.querySelector('[data-alacarte]').addEventListener('click', () => { mode = 'alacarte'; tpl = null; attrAlloc = { Agility: 3, Brawn: 3, Knowledge: 3, Perception: 3 }; skillAlloc = {}; render(); });
    b.querySelectorAll('[data-t]').forEach(c => c.addEventListener('click', () => { tpl = templates().find(t => t.name === c.dataset.t); mode = 'template'; skillAlloc = {}; render(); }));
  }

  // ── Step: Attributes (a la carte) ───────────────────────────────────────────
  function renderAttributes(b, note) {
    const budget = attrBudgetOn(); const total = attrTotal(); const left = total - attrSpent();
    note.textContent = left < 0 ? 'Over budget by ' + code(-left) + ' — lower an attribute' : 'Attribute dice left: ' + code(left);
    let h = '<p class="m-hint">Assign <b>' + code(total) + '</b> across your attributes — each between <b>1D and 5D</b>.'
      + (budget ? ' Each optional attribute beyond the core four adds <b>+3D</b> to the budget.' : '') + ' Dice are whole here (fine-tune with pips on the sheet later).</p><div class="alloc">';
    const keys = CORE_ATTRS.concat(Object.keys(attrAlloc).filter(a => CORE_ATTRS.indexOf(a) < 0));
    keys.forEach(a => {
      const v = attrAlloc[a] || 0;
      // Name on the left; the die code sits large, right next to the +/− buttons.
      h += '<div class="a-attr"><span>' + a + '</span><span style="display:flex;align-items:center;gap:10px;">'
        + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:18px;font-weight:700;color:#f0a860;min-width:52px;text-align:right;">' + code(v) + '</span>'
        + '<button data-a="' + a + '" data-d="-3"' + (v <= ATTR_MIN ? ' disabled' : '') + '>−</button>'
        + '<button data-a="' + a + '" data-d="3"' + (v >= ATTR_MAX || left < 3 ? ' disabled' : '') + '>+</button></span></div>';
    });
    h += '</div>';
    // Optional attributes as toggle badges: click to add, click again to remove.
    h += '<div class="m-lbl">Optional attributes' + (budget ? ' (+3D budget each)' : ' (draws from the base budget)') + '</div><div style="display:flex;flex-wrap:wrap;gap:5px;">'
      + OPTIONAL_ATTRS.map(a => '<button type="button" class="builder-chip' + (attrAlloc[a] != null ? ' sel' : '') + '" data-toggle="' + a + '">' + (attrAlloc[a] != null ? '✓ ' : '＋ ') + a + '</button>').join('') + '</div>';
    b.innerHTML = h;
    b.querySelectorAll('button[data-a]').forEach(btn => btn.addEventListener('click', () => {
      const a = btn.dataset.a, d = Number(btn.dataset.d);
      const nv = (attrAlloc[a] || 0) + d;
      if (nv < ATTR_MIN || nv > ATTR_MAX) return;
      if (d > 0 && attrTotal() - attrSpent() < d) return;
      attrAlloc[a] = nv; render();
    }));
    b.querySelectorAll('button[data-toggle]').forEach(btn => btn.addEventListener('click', () => { const a = btn.dataset.toggle; if (attrAlloc[a] != null) delete attrAlloc[a]; else attrAlloc[a] = ATTR_MIN; render(); }));
  }

  // ── Step: Skills ────────────────────────────────────────────────────────────
  function renderSkills(b, note) {
    const base = charAttrs();
    const budget = skillBudgetPips();
    const left = budget - skillSpent();
    note.textContent = 'Skill dice left: ' + code(Math.max(0, left));
    const rec = mode === 'template' ? recSkills(tpl) : [];
    const groups = {};
    skillsData().forEach(s => { if (!genreOk(s)) return; if (base[s.attribute] == null) return; (groups[s.attribute] = groups[s.attribute] || []).push(s); });
    const delta = traitDeltaDice();
    let h = '<p class="m-hint">Spend <b>' + code(budget) + '</b> of skill adds — no more than <b>2D</b> on any one skill (pips are fine)'
      + (delta ? '. Base 7D ' + (delta < 0 ? '−' : '+') + ' ' + code(Math.abs(delta) * 3) + ' from your perks/flaws/talents = ' + code(budget) : '') + '. A skill\'s code is its attribute plus the adds you put on it.'
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
      if (nv > SKILL_PER) return; if (d > 0 && skillBudgetPips() - skillSpent() <= 0) return;
      if (nv) skillAlloc[k] = nv; else delete skillAlloc[k]; render();
    }));
  }

  // ── Step: Details ───────────────────────────────────────────────────────────
  function renderDetails(b, note) {
    note.textContent = 'Who are you?';
    const f = (id, lbl, val, ph) => '<div class="m-lbl">' + lbl + '</div><input class="m-input" id="d62eb-' + id + '" value="' + esc(val == null ? '' : val) + '" placeholder="' + esc(ph || '') + '">';
    const ta = (id, lbl, val) => '<div class="m-lbl">' + lbl + '</div><textarea class="m-input" id="d62eb-' + id + '" rows="3">' + esc(val == null ? '' : val) + '</textarea>';
    b.innerHTML = '<p class="m-hint">Name your character. The genre was set on the Options step.</p>'
      + f('name', 'Name', details.name, 'Character name')
      + ta('background', 'Background', details.background != null ? details.background : (tpl ? tpl.description : ''))
      + ta('personality', 'Personality', details.personality);
  }
  function readDetails() { ['name', 'background', 'personality'].forEach(k => { const el = $('d62eb-' + k); if (el) details[k] = el.value; }); }

  // ── Step: Traits (perks / flaws / talents) — adjust the skill-dice pool ──────
  function traitEffectLabel(t, r) {
    if (t.kind === 'perk') return '<span style="color:#df8a8a;">−' + r + 'D skill</span>';
    if (t.kind === 'flaw') return '<span style="color:#8ad48a;">+' + r + 'D skill</span>';
    if (t.kind === 'talent') { const c = talentCostFor(t, r); return c ? '<span style="color:#df8a8a;">−' + c + 'D skill</span>' : '<span style="color:#999;">no skill cost</span>'; }
    return '<span style="color:#c8a24a;">' + (t.kind === 'asset' ? 'asset (no skill cost)' : 'grants Hero Points (no skill cost)') + '</span>';
  }
  const TRAIT_KINDS = ['perk', 'flaw', 'talent'];
  function renderTraits(b, note) {
    const budget = skillBudgetPips();
    note.textContent = 'Skill dice for later: ' + code(budget) + (perkPoints() > 5 || flawPoints() > 5 ? '  ⚠ soft cap 5/5' : '');
    let h = '<p class="m-hint">Pick perks, flaws, and talents (pg 102). <b>Perks cost 1 skill die per rank</b>, <b>flaws grant 1 back per rank</b>, <b>talents cost a fixed number</b>. Recommended soft cap: 5 points of perks / 5 of flaws. (Troubles &amp; assets come after Skills.)</p>';
    h += '<div style="display:flex;gap:6px;margin-bottom:8px;"><input class="m-input" id="d62eb-trait-search" placeholder="Search…" value="' + esc(traitQ) + '" style="flex:1;"><select class="m-input" id="d62eb-trait-kind" style="width:auto;min-width:120px;flex:0 0 auto;">'
      + [['','All kinds'],['perk','Perks'],['flaw','Flaws'],['talent','Talents']].map(o => '<option value="' + o[0] + '"' + (traitKind === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div>';
    h += '<div style="font-family:\'Barlow Condensed\',sans-serif;font-size:12px;color:#f0a860;margin-bottom:6px;">Skill dice available: <b>' + code(budget) + '</b> · perks ' + perkPoints() + 'pt · flaws ' + flawPoints() + 'pt</div>';
    h += '<div class="brow-list" id="d62eb-trait-list" style="max-height:42vh;overflow:auto;padding:0;">' + traitListHtml() + '</div>';
    b.innerHTML = h;
    const s = $('d62eb-trait-search'), k = $('d62eb-trait-kind');
    s.addEventListener('input', () => { traitQ = norm(s.value); relist('d62eb-trait-list', traitListHtml(), wire); });
    k.addEventListener('change', () => { traitKind = k.value; relist('d62eb-trait-list', traitListHtml(), wire); });
    wire();
    function wire() {
      const box = $('d62eb-trait-list');
      box.querySelectorAll('[data-trait]').forEach(btn => btn.addEventListener('click', () => {
        const t = perksData().find(x => x.name === btn.dataset.trait); if (!t) return;
        if (traitPicks[t.name] != null) delete traitPicks[t.name]; else traitPicks[t.name] = traitRankBounds(t).min;
        render();
      }));
      box.querySelectorAll('[data-trrank]').forEach(btn => btn.addEventListener('click', () => {
        const t = perksData().find(x => x.name === btn.dataset.trrank); if (!t || traitPicks[t.name] == null) return;
        const bnd = traitRankBounds(t); const nv = (traitPicks[t.name] || bnd.min) + Number(btn.dataset.d);
        traitPicks[t.name] = Math.max(bnd.min, Math.min(bnd.max, nv)); render();
      }));
    }
  }
  function traitListHtml() {
    const list = perksData().filter(t => TRAIT_KINDS.indexOf(t.kind) >= 0 && genreOk(t) && (!traitKind || t.kind === traitKind) && (!traitQ || norm(t.name).includes(traitQ) || norm(t.kind || '').includes(traitQ))).sort((a, c) => (a.kind || '').localeCompare(c.kind || '') || a.name.localeCompare(c.name));
    if (!list.length) return '<p class="brow-empty">No entries match.</p>';
    return list.map(t => {
      const on = traitPicks[t.name] != null; const r = traitPicks[t.name] || traitRankBounds(t).min; const bnd = traitRankBounds(t);
      const stepper = (on && traitHasStepper(t)) ? '<span style="display:inline-flex;align-items:center;gap:4px;margin-right:6px;"><button class="a-rk" data-trrank="' + esc(t.name) + '" data-d="-1"' + (r <= bnd.min ? ' disabled' : '') + '>−</button><span style="font-family:\'Share Tech Mono\',monospace;color:#f0a860;">R' + r + '</span><button class="a-rk" data-trrank="' + esc(t.name) + '" data-d="1"' + (r >= bnd.max ? ' disabled' : '') + '>+</button></span>' : '';
      const btn = '<button class="brow-add" data-trait="' + esc(t.name) + '"' + (on ? ' style="background:#5a3a1a;color:#f0c9a0;"' : '') + '>' + (on ? 'Added ✓' : '+ Add') + '</button>';
      const eff = on ? ' · ' + traitEffectLabel(t, r) : '';
      return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(t.name) + (t.cost ? '<span class="brow-cost">' + esc(t.cost) + '</span>' : '') + '</div><div class="brow-meta">' + esc(t.kind || '') + eff + '</div>' + (t.description ? '<div class="brow-desc">' + esc(t.description) + '</div>' : '') + '</div><span style="display:flex;align-items:center;">' + stepper + btn + '</span></div>';
    }).join('');
  }

  // ── Step: Troubles & Assets (no skill-pool effect; grant Hero Points / an asset) ──
  const EXTRA_KINDS = ['trouble', 'asset'];
  function renderExtras(b, note) {
    note.textContent = 'Troubles & Assets (optional)';
    let h = '<p class="m-hint">Troubles &amp; assets don\'t spend skill dice — troubles grant extra Hero Points (a complication the GM can invoke), assets give a special benefit or resource. Pick any that fit your character.</p>';
    h += '<input class="m-input" id="d62eb-extra-search" placeholder="Search…" value="' + esc(traitQ) + '" style="margin-bottom:8px;">';
    h += '<div class="brow-list" id="d62eb-extra-list" style="max-height:48vh;overflow:auto;padding:0;">' + extraListHtml() + '</div>';
    b.innerHTML = h;
    const s = $('d62eb-extra-search');
    s.addEventListener('input', () => { traitQ = norm(s.value); relist('d62eb-extra-list', extraListHtml(), wire); });
    wire();
    function wire() {
      $('d62eb-extra-list').querySelectorAll('[data-extra]').forEach(btn => btn.addEventListener('click', () => {
        const t = perksData().find(x => x.name === btn.dataset.extra); if (!t) return;
        if (traitPicks[t.name] != null) delete traitPicks[t.name]; else traitPicks[t.name] = 1;
        relist('d62eb-extra-list', extraListHtml(), wire);
      }));
    }
  }
  function extraListHtml() {
    const list = perksData().filter(t => EXTRA_KINDS.indexOf(t.kind) >= 0 && genreOk(t) && (!traitQ || norm(t.name).includes(traitQ) || norm(t.kind || '').includes(traitQ))).sort((a, c) => (a.kind || '').localeCompare(c.kind || '') || a.name.localeCompare(c.name));
    if (!list.length) return '<p class="brow-empty">No entries match.</p>';
    return list.map(t => {
      const on = traitPicks[t.name] != null;
      const btn = '<button class="brow-add" data-extra="' + esc(t.name) + '"' + (on ? ' style="background:#5a3a1a;color:#f0c9a0;"' : '') + '>' + (on ? 'Added ✓' : '+ Add') + '</button>';
      return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(t.name) + (t.cost ? '<span class="brow-cost">' + esc(t.cost) + '</span>' : '') + '</div><div class="brow-meta">' + esc(t.kind || '') + ' · <span style="color:#c8a24a;">' + (t.kind === 'asset' ? 'asset' : 'grants Hero Points') + '</span></div>' + (t.description ? '<div class="brow-desc">' + esc(t.description) + '</div>' : '') + '</div>' + btn + '</div>';
    }).join('');
  }

  // ── Step: Powers (own dice pool by Power Level, pg 212) ─────────────────────
  function renderPowers(b, note) {
    const total = powerLevelDice(), spent = powerPoolSpent();
    note.textContent = powerLevel === 'none' ? 'Powers (optional)' : 'Power dice: ' + spent + ' / ' + total + (spent > total ? '  ⚠ over pool' : '');
    let h = '<p class="m-hint">Pick a <b>Power Level</b> to get a Superpower Dice pool (pg 212). Superpowers spend from it; magic &amp; psionic powers are free (GM\'s call). Picked powers go on the sheet.</p>';
    h += '<div class="m-lbl">Power Level</div><select class="m-input" id="d62eb-plevel" style="max-width:280px;">'
      + POWER_LEVELS.map(l => '<option value="' + l[0] + '"' + (powerLevel === l[0] ? ' selected' : '') + '>' + esc(l[1]) + (l[2] ? ' (' + l[2] + ')' : '') + '</option>').join('') + '</select>';
    if (powerLevel !== 'none') h += '<div style="font-family:\'Barlow Condensed\',sans-serif;font-size:13px;color:#f0a860;margin:8px 0 4px;">Superpower dice: <b>' + spent + ' / ' + total + '</b>' + (spent > total ? ' <span style="color:#df8a8a;">— over pool</span>' : '') + '</div>';
    h += '<div style="display:flex;gap:6px;margin:8px 0;"><input class="m-input" id="d62eb-power-search" placeholder="Search powers…" value="' + esc(powerQ) + '" style="flex:1;"><select class="m-input" id="d62eb-power-kind" style="width:auto;min-width:120px;flex:0 0 auto;">'
      + [['','All kinds'],['superpower','Superpower'],['magic','Magic'],['psionic','Psionic']].map(o => '<option value="' + o[0] + '"' + (powerKind === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div>';
    h += '<div class="brow-list" id="d62eb-power-list" style="max-height:40vh;overflow:auto;padding:0;">' + powerListHtml() + '</div>';
    b.innerHTML = h;
    $('d62eb-plevel').addEventListener('change', e => { powerLevel = e.target.value; render(); });
    const s = $('d62eb-power-search'), k = $('d62eb-power-kind');
    s.addEventListener('input', () => { powerQ = norm(s.value); relist('d62eb-power-list', powerListHtml(), wire); });
    k.addEventListener('change', () => { powerKind = k.value; relist('d62eb-power-list', powerListHtml(), wire); });
    wire();
    function wire() {
      const box = $('d62eb-power-list');
      box.querySelectorAll('[data-power]').forEach(btn => btn.addEventListener('click', () => {
        const p = powersData().find(x => x.name === btn.dataset.power); if (!p) return;
        if (powerPicks[p.name] != null) delete powerPicks[p.name]; else powerPicks[p.name] = 1;
        render();
      }));
      box.querySelectorAll('[data-prank]').forEach(btn => btn.addEventListener('click', () => {
        const p = powersData().find(x => x.name === btn.dataset.prank); if (!p || powerPicks[p.name] == null) return;
        const nv = (powerPicks[p.name] || 1) + Number(btn.dataset.d); powerPicks[p.name] = Math.max(1, Math.min(5, nv)); render();
      }));
    }
  }
  function powerListHtml() {
    const list = powersData().filter(p => genreOk(p) && (!powerKind || p.kind === powerKind) && (!powerQ || norm(p.name).includes(powerQ) || norm(p.skill || '').includes(powerQ))).sort((a, c) => (a.kind || '').localeCompare(c.kind || '') || a.name.localeCompare(c.name));
    if (!list.length) return '<p class="brow-empty">No powers match.</p>';
    return list.map(p => {
      const on = powerPicks[p.name] != null; const r = powerPicks[p.name] || 1;
      const costLabel = p.kind === 'superpower' ? (p.cost != null ? esc(String(p.cost)) : 'free') : 'free';
      const stepper = (on && powerPerRank(p)) ? '<span style="display:inline-flex;align-items:center;gap:4px;margin-right:6px;"><button class="a-rk" data-prank="' + esc(p.name) + '" data-d="-1"' + (r <= 1 ? ' disabled' : '') + '>−</button><span style="font-family:\'Share Tech Mono\',monospace;color:#f0a860;">R' + r + '</span><button class="a-rk" data-prank="' + esc(p.name) + '" data-d="1"' + (r >= 5 ? ' disabled' : '') + '>+</button></span>' : '';
      const spend = (on && p.kind === 'superpower') ? ' · spends ' + powerCostFor(p, r) : '';
      const btn = '<button class="brow-add" data-power="' + esc(p.name) + '"' + (on ? ' style="background:#5a3a1a;color:#f0c9a0;"' : '') + '>' + (on ? 'Added ✓' : '+ Add') + '</button>';
      return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(p.name) + '<span class="brow-cost">' + costLabel + '</span></div><div class="brow-meta">' + [p.kind, p.genre].filter(Boolean).map(esc).join(' · ') + spend + '</div>' + (p.description ? '<div class="brow-desc">' + esc(p.description) + '</div>' : '') + '</div><span style="display:flex;align-items:center;">' + stepper + btn + '</span></div>';
    }).join('');
  }

  // ── Step: Gear (same picker as the sheet's Equipment browser) ───────────────
  function toggleGear(name) {
    const g = equipData().find(x => x.name === name); if (!g) return;
    if (g.category === 'armor') { const was = !!gearPicks[name]; equipData().forEach(x => { if (x.category === 'armor') delete gearPicks[x.name]; }); if (!was) gearPicks[name] = true; }
    else gearPicks[name] = !gearPicks[name];
  }
  function gearEras() { return [...new Set(equipData().map(g => g.era))].filter(Boolean).sort(); }
  function renderGear(b, note) {
    note.textContent = 'Starting equipment';
    let h = '<p class="m-hint">Add starting equipment — the same picker as the sheet. Weapons become attack rows, armor fills the Armor box, everything else goes to Gear. You can add more on the sheet anytime.</p>';
    h += '<div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;"><input class="m-input" id="d62eb-gear-search" placeholder="Search equipment…" value="' + esc(bgearQ) + '" style="flex:1;min-width:140px;"><select class="m-input" id="d62eb-gear-cat" style="width:auto;min-width:130px;flex:0 0 auto;"></select>'
      + '<select class="m-input" id="d62eb-gear-era" style="width:auto;min-width:120px;flex:0 0 auto;"></select></div>';
    h += '<div class="brow-list" id="d62eb-gear-list" style="max-height:46vh;overflow:auto;padding:0;">' + gearListHtml() + '</div>';
    b.innerHTML = h;
    const cats = [...new Set(equipData().map(g => g.category))].filter(Boolean).sort();
    $('d62eb-gear-cat').innerHTML = '<option value="">All categories</option>' + cats.map(c => '<option value="' + esc(c) + '"' + (bgearCat === c ? ' selected' : '') + '>' + esc(c[0].toUpperCase() + c.slice(1)) + '</option>').join('');
    $('d62eb-gear-era').innerHTML = '<option value="">All eras</option>' + gearEras().map(e => '<option value="' + esc(e) + '"' + (bgearEra === e ? ' selected' : '') + '>' + esc(e) + '</option>').join('');
    const s = $('d62eb-gear-search'), cat = $('d62eb-gear-cat'), era = $('d62eb-gear-era');
    s.addEventListener('input', () => { bgearQ = norm(s.value); relist('d62eb-gear-list', gearListHtml(), wireGear); });
    cat.addEventListener('change', () => { bgearCat = cat.value; relist('d62eb-gear-list', gearListHtml(), wireGear); });
    era.addEventListener('change', () => { bgearEra = era.value; relist('d62eb-gear-list', gearListHtml(), wireGear); });
    wireGear();
    function wireGear() { $('d62eb-gear-list').querySelectorAll('[data-gname]').forEach(btn => btn.addEventListener('click', () => { toggleGear(btn.dataset.gname); relist('d62eb-gear-list', gearListHtml(), wireGear); })); }
  }
  function gearListHtml() {
    const list = equipData().filter(g => (!bgearEra || g.era === bgearEra) && (!bgearCat || g.category === bgearCat) && (!bgearQ || norm(g.name).includes(bgearQ) || norm(g.category || '').includes(bgearQ))).sort((a, c) => (a.category || '').localeCompare(c.category || '') || a.name.localeCompare(c.name));
    if (!list.length) return '<p class="brow-empty">No equipment matches.</p>';
    return list.map(g => {
      const on = !!gearPicks[g.name];
      let cost = '', label = on ? 'Added ✓' : '+ Add';
      if (g.category === 'weapon') { cost = g.damage || ''; label = on ? 'On attacks ✓' : '+ Attack'; }
      else if (g.category === 'armor') { cost = g.protection || ''; label = on ? 'Worn ✓' : 'Wear'; }
      const meta = [g.category, g.era, g.range].filter(Boolean).map(esc).join(' · ');
      const btn = '<button class="brow-add" data-gname="' + esc(g.name) + '"' + (on ? ' style="background:#5a3a1a;color:#f0c9a0;"' : '') + '>' + label + '</button>';
      return '<div class="brow-item"><div class="brow-main"><div class="brow-name">' + esc(g.name) + (cost ? '<span class="brow-cost">' + esc(cost) + '</span>' : '') + '</div><div class="brow-meta">' + meta + '</div>' + (g.description ? '<div class="brow-desc">' + esc(g.description) + '</div>' : '') + '</div>' + btn + '</div>';
    }).join('');
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
    // Powers: template powers (superhero) + those picked in the Powers step.
    const powers = [];
    if (mode === 'template') templatePowers(tpl).forEach(pName => {
      const def = powersData().find(x => norm(x.name) === norm(String(pName).replace(/\(.*?\)/g, '').trim())) || {};
      powers.push({ name: pName, kind: def.kind || 'superpower', note: [def.difficulty ? 'Diff ' + def.difficulty : '', def.skill || ''].filter(Boolean).join(' · ') });
    });
    Object.keys(powerPicks).forEach(n => {
      if (powerPicks[n] == null) return; const p = powersData().find(x => x.name === n); if (!p) return;
      const r = powerPicks[n] || 1; let nm = p.name; if (powerPerRank(p)) nm += ' (R' + r + ')';
      const note = [(p.kind === 'superpower' && p.cost != null) ? 'Cost ' + powerCostFor(p, r) : '', p.difficulty ? 'Diff ' + p.difficulty : '', p.skill || ''].filter(Boolean).join(' · ');
      powers.push({ name: nm, kind: p.kind || 'superpower', note: note });
    });
    // Perks / Flaws / Talents picked in the Traits step, routed to buckets by kind, rank noted.
    const perks = [], flaws = [], talents = [];
    Object.keys(traitPicks).forEach(n => {
      if (traitPicks[n] == null) return; const t = perksData().find(x => x.name === n); if (!t) return;
      const r = traitPicks[n] || 1; const bucket = (typeof traitBucketOf === 'function') ? traitBucketOf(t.kind) : 'perks';
      let nm = t.name;
      if ((t.kind === 'perk' || t.kind === 'flaw') && (traitRankBounds(t).max > 1 || r > 1)) nm += ' (R' + r + ')';
      else if (t.kind === 'talent' && isPerRank(t.cost)) nm += ' (×' + r + ')';
      const obj = { name: nm, note: [t.cost ? 'Cost ' + t.cost : '', t.description || ''].filter(Boolean).join(' · ') };
      if (bucket === 'flaws') flaws.push(obj); else if (bucket === 'talents') talents.push(obj); else perks.push(obj);
    });
    const prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    applySheet({
      system: 'D62E', name: details.name || '', genre: genre,
      template: mode === 'template' ? tpl.name : '', archetype: mode === 'template' ? (tpl.archetype || '') : '',
      attrs: attrs, skills: skills,
      heroPoints: mode === 'template' ? (tpl.heroPoints || 1) : 1, characterPoints: 0,
      dodgeOverride: null, parryOverride: null, move: '10', wound: 'none',
      weapons: weapons, armor: armor, powers: powers,
      perks: perks, flaws: flaws, talents: talents, gear: gear,
      wealth: '', background: details.background || (mode === 'template' ? tpl.description : '') || '', personality: details.personality || '', notes: '',
      options: Object.assign(freshOpts(), bopts, { powerLevel: powerLevel }),
      campaign: prev.campaign || null,
    });
    if (typeof saveSheet === 'function') saveSheet(true);
    if (typeof syncDocTitle === 'function') syncDocTitle();
    addLog('Character built', '✓', (details.name || 'Unnamed') + (mode === 'template' ? ' — ' + tpl.name : ' — a la carte'), 'crit');
  }

  window.D62EB = {
    launch() {
      step = 0; maxStep = 0; mode = null; tpl = null; genre = 'all';
      attrAlloc = { Agility: 3, Brawn: 3, Knowledge: 3, Perception: 3 }; skillAlloc = {}; details = {}; gearPicks = {};
      traitPicks = {}; traitKind = ''; traitQ = ''; powerPicks = {}; powerLevel = 'none'; powerKind = ''; powerQ = '';
      bgearCat = ''; bgearQ = ''; bgearEra = '';
      bopts = Object.assign(freshOpts(), (typeof options !== 'undefined' && options) ? JSON.parse(JSON.stringify(options)) : {});
      powerLevel = bopts.powerLevel || 'none';
      _lastStep = -1; render();
    },
    close() { if (ov) ov.classList.remove('open'); },
    next() {
      const STEPS = steps();
      const name = STEPS[step];
      if (name === 'Path' && !mode) { $('d62eb-note').textContent = 'Pick a template or "A la carte"'; return; }
      if (name === 'Attributes' && attrSpent() !== attrTotal()) { $('d62eb-note').textContent = 'Assign all ' + code(attrTotal()) + ' — ' + code(attrTotal() - attrSpent(), true) + ' remaining'; return; }
      if (name === 'Skills' && skillSpent() < skillBudgetPips()) { $('d62eb-note').textContent = 'Spend all ' + code(skillBudgetPips()) + ' — ' + code(skillBudgetPips() - skillSpent()) + ' left'; return; }
      if (name === 'Details') readDetails();
      if (step === STEPS.length - 1) { finish(); D62EB.close(); return; }
      step++; maxStep = Math.max(maxStep, step); render();
    },
    back() { const STEPS = steps(); if (STEPS[step] === 'Details') readDetails(); if (step > 0) { step--; render(); } },
  };
})();
