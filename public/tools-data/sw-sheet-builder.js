// Star Wars (WEG 1e) character builder — the ✨ Build button on the sheet.
// Walks the core rulebook's creation steps: pick a template, spend 7D of
// skill dice (no more than 2D on one skill), fill in the details and take the
// template's equipment. Uses the sheet's globals (SW_* data, toCode/fromCode,
// applySheet, addLog, esc, $) — load after the sheet script.
(function () {
  const STEPS = ['Template', 'Skills', 'Details', 'Gear'];
  const ATTRS = ['Dexterity', 'Knowledge', 'Mechanical', 'Perception', 'Strength', 'Technical'];
  const MAX_TOTAL = 21, MAX_PER = 6; // 7D, 2D per skill
  let step = 0, tpl = null, alloc = {}, forceAlloc = {}, details = {}, _lastStep = -1;
  let ov = null;

  function templates() { return typeof SW_TEMPLATES !== 'undefined' ? SW_TEMPLATES : []; }
  function skills() { return typeof SW_SKILLS !== 'undefined' ? SW_SKILLS : []; }
  function weapons() { return typeof SW_WEAPONS !== 'undefined' ? SW_WEAPONS : []; }
  // Species options for the picker: Human + playable Aliens + Sourcebook Droids.
  function speciesList() {
    const chars = (typeof SW_CHARACTERS !== 'undefined' ? SW_CHARACTERS : []);
    const aliens = chars.filter(c => c.group === 'Alien').map(c => c.name).sort();
    const droids = chars.filter(c => c.group === 'Droid').map(c => c.name).sort();
    const seen = {}; return ['Human'].concat(aliens, droids).filter(n => n && !seen[n] && (seen[n] = 1));
  }
  function forceSkills(t) {
    const out = {}; const m = /Force skills?:\s*([^.]+)/i.exec((t && t.specialRule) || '');
    if (m) m[1].split(/,|\band\b/).forEach(part => { const mm = /(Control|Sense|Alter)\s*\(?(\d+D(?:\+\d)?)?/i.exec(part); if (mm) out[mm[1][0].toUpperCase() + mm[1].slice(1).toLowerCase()] = fromCode(mm[2] || '1D'); });
    return out;
  }
  function spent() { let n = 0; Object.values(alloc).forEach(v => n += v); Object.values(forceAlloc).forEach(v => n += v); return n; }

  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'swb-overlay'; ov.className = 'ov';
    ov.innerHTML = '<div class="modal wide" style="max-height:94vh;"><div class="modal-hd"><div class="ttl" id="swb-title">Character Builder</div><button class="x" onclick="SWB.close()">&#10005;</button></div>'
      + '<div id="swb-steps" style="display:flex;gap:4px;padding:8px 16px 0;flex-wrap:wrap;"></div>'
      + '<div class="modal-bd" id="swb-body"></div>'
      + '<div class="modal-ft"><button class="m-btn ghost" id="swb-back" onclick="SWB.back()">← Back</button><span id="swb-note" style="font-size:12px;color:#999;align-self:center;flex:1;text-align:center;"></span><button class="m-btn" id="swb-next" onclick="SWB.next()">Next →</button></div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) SWB.close(); });
    document.body.appendChild(ov);
  }
  function render() {
    ensure();
    $('swb-steps').innerHTML = STEPS.map((s, i) => '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;border:1px solid ' + (i === step ? '#f0c020' : '#333') + ';color:' + (i === step ? '#f0c020' : i < step ? '#ccc' : '#666') + ';">' + (i + 1) + '. ' + s + '</span>').join('');
    $('swb-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('swb-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    const b = $('swb-body'); const note = $('swb-note');
    const keep = _lastStep === step;
    const bScroll = keep ? b.scrollTop : 0;
    const lScroll = keep ? [...b.querySelectorAll('.tpl-list, .alloc')].map((e) => e.scrollTop) : [];
    if (step === 0) {
      note.textContent = tpl ? tpl.name : 'Pick a template';
      b.innerHTML = '<p class="m-hint">Every character starts from one of the 24 templates. Attributes are fixed by the template; you\'ll spend 7D of skill dice next.</p><div class="tpl-list">'
        + templates().map(t => '<div class="tpl-card' + (tpl && tpl.name === t.name ? ' sel' : '') + '" data-t="' + esc(t.name) + '"><b>' + esc(t.name) + '</b><small>' + ATTRS.map(a => a.slice(0, 3).toUpperCase() + ' ' + toCode(t.attributes[a])).join(' · ') + '</small></div>').join('') + '</div>'
        + (tpl ? '<div style="margin-top:12px;font-size:12px;line-height:1.5;color:#ccc;"><b style="color:#f0c020;">' + esc(tpl.name) + '</b> — ' + esc(tpl.background.slice(0, 420)) + (tpl.background.length > 420 ? '…' : '') + (tpl.specialRule ? '<br><i>' + esc(tpl.specialRule) + '</i>' : '') + '</div>' : '');
      b.querySelectorAll('.tpl-card').forEach(c => c.addEventListener('click', () => { tpl = templates().find(t => t.name === c.dataset.t); alloc = {}; forceAlloc = forceSkills(tpl); details = {}; render(); }));
    } else if (step === 1) {
      const groups = {}; skills().forEach(s => { (groups[s.attribute] = groups[s.attribute] || []).push(s); });
      const left = MAX_TOTAL - spent(); note.textContent = 'Skill dice left: ' + toCode(Math.max(0, left));
      let h = '<p class="m-hint">Spend 7D among skills, no more than 2D on any one skill (pips are fine: 1D+2 is five pips). A skill starts at its attribute\'s code; the dice you add go on top. Force skills printed on the template already have 1D.</p><div class="alloc">';
      ATTRS.forEach(a => {
        h += '<div class="a-attr">' + a + ' ' + toCode(tpl.attributes[a]) + '</div><div class="a-skills">';
        (groups[a] || []).forEach(s => { const v = alloc[s.name] || 0; h += '<div class="a-row"><span class="a-name">' + esc(s.name) + (s.reaction ? ' <span style="color:#777;">(r)</span>' : '') + '</span><span class="a-code">' + toCode(tpl.attributes[a] + v) + (v ? ' <span style="color:#f0c020;">' + toCode(v, true) + '</span>' : '') + '</span><button data-s="' + esc(s.name) + '" data-d="-1"' + (v ? '' : ' disabled') + '>−</button><button data-s="' + esc(s.name) + '" data-d="1"' + (v >= MAX_PER || left <= 0 ? ' disabled' : '') + '>+</button></div>'; });
        h += '</div>';
      });
      const fk = Object.keys(forceAlloc);
      if (fk.length) { h += '<div class="a-attr">The Force</div><div class="a-skills">'; fk.forEach(f => { const base = forceSkills(tpl)[f], v = forceAlloc[f] - base; h += '<div class="a-row"><span class="a-name">' + f + '</span><span class="a-code">' + toCode(forceAlloc[f]) + (v ? ' <span style="color:#f0c020;">' + toCode(v, true) + '</span>' : '') + '</span><button data-f="' + f + '" data-d="-1"' + (v ? '' : ' disabled') + '>−</button><button data-f="' + f + '" data-d="1"' + (v >= MAX_PER || left <= 0 ? ' disabled' : '') + '>+</button></div>'; }); h += '</div>'; }
      b.innerHTML = h + '</div>';
      b.querySelectorAll('button[data-s]').forEach(btn => btn.addEventListener('click', () => { const k = btn.dataset.s; alloc[k] = Math.max(0, (alloc[k] || 0) + Number(btn.dataset.d)); if (!alloc[k]) delete alloc[k]; render(); }));
      b.querySelectorAll('button[data-f]').forEach(btn => btn.addEventListener('click', () => { forceAlloc[btn.dataset.f] += Number(btn.dataset.d); render(); }));
    } else if (step === 2) {
      note.textContent = 'Who are you?';
      const f = (id, lbl, val, ph) => '<div class="m-lbl">' + lbl + '</div><input class="m-input" id="swb-' + id + '" value="' + esc(val == null ? '' : val) + '" placeholder="' + esc(ph || '') + '">';
      const ta = (id, lbl, val) => '<div class="m-lbl">' + lbl + '</div><textarea class="m-input" id="swb-' + id + '" rows="3">' + esc(val == null ? '' : val) + '</textarea>';
      const curSpecies = details.species != null ? details.species : speciesFor(tpl);
      const speciesPick = '<div class="m-lbl">Species</div><div class="swb-sp-pick" id="swb-species-pick">'
        + speciesList().map(n => '<button type="button" class="swb-sp-chip' + (norm(n) === norm(curSpecies) ? ' sel' : '') + '" data-sp="' + esc(n) + '">' + esc(n) + '</button>').join('') + '</div>';
      b.innerHTML = '<p class="m-hint">Name your character and tweak the template\'s background and personality — they are yours now. Pick your <b>species</b> — Human, a playable alien, or a droid.</p>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 12px;">' + f('name', 'Name', details.name, 'Character name')
        + f('sex', 'Sex', details.sex) + f('age', 'Age', details.age) + f('height', 'Height', details.height) + f('weight', 'Weight', details.weight) + '</div>'
        + speciesPick
        + f('physical', 'Physical description', details.physical, 'What people notice first')
        + ta('background', 'Background', details.background != null ? details.background : tpl.background)
        + ta('personality', 'Personality', details.personality != null ? details.personality : tpl.personality)
        + ta('connection', 'Objectives & connection with other characters', details.connection != null ? details.connection : (tpl.connection || ''))
        + f('quote', 'A quote', details.quote != null ? details.quote : (tpl.quote || ''));
      b.querySelectorAll('.swb-sp-chip').forEach(c => c.addEventListener('click', () => { readDetails(); details.species = c.dataset.sp; render(); }));
    } else {
      note.textContent = 'Starting equipment';
      b.innerHTML = '<p class="m-hint">Your template starts with this gear' + (tpl.credits ? ' and <b style="color:#f0c020;">' + esc(tpl.credits) + '</b>' : '') + '. Items that match the weapon charts become weapon rows; everything else goes in Equipment. Untick anything you\'d rather not carry.</p>'
        + '<div style="display:flex;flex-direction:column;gap:6px;">' + (tpl.equipment || []).map((e, i) => { const w = matchWeapon(e); return '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#ddd;"><input type="checkbox" class="swb-eq" data-i="' + i + '" checked style="margin-top:3px;"><span>' + esc(e) + (w ? ' <span style="color:#f0c020;font-size:11px;">→ weapon ' + esc(w.damageText || toCode(w.damage)) + '</span>' : '') + '</span></label>'; }).join('') + '</div>'
        + (tpl.specialRule ? '<div class="m-lbl">Special</div><p style="font-size:12px;color:#ccc;line-height:1.5;">' + esc(tpl.specialRule) + '</p>' : '');
    }
    if (keep) { b.scrollTop = bScroll; b.querySelectorAll('.tpl-list, .alloc').forEach((e, i) => { if (lScroll[i] != null) e.scrollTop = lScroll[i]; }); }
    _lastStep = step;
    ov.classList.add('open');
  }
  function speciesFor(t) { const n = t.name; if (/Wookiee/i.test(n)) return 'Wookiee'; if (/Ewok/i.test(n)) return 'Ewok'; if (/Mon Calamari/i.test(n)) return 'Mon Calamari'; if (/Alien/i.test(n)) return 'Alien'; return 'Human'; }
  function matchWeapon(text) {
    const t = String(text).toLowerCase().replace(/\(.*?\)/g, '');
    const list = weapons().filter(w => !/^(Starship|Capital|Vehicle|Artillery)$/.test(w.kind));
    let best = null; list.forEach(w => { const n = w.name.toLowerCase().replace(/\(.*?\)/g, '').trim(); if (n.length > 3 && t.includes(n) && (!best || n.length > best.name.length)) best = w; });
    if (!best) { const alias = [[/heavy blaster pistol/, 'Heavy Blaster Pistol'], [/blaster pistol/, 'Blaster Pistol'], [/blaster rifle/, 'Blaster Rifle'], [/hold-?out/, 'Hold-out Blaster'], [/sporting blaster/, 'Sporting Blaster'], [/lightsaber|light saber/, 'Lightsaber'], [/bowcaster/, 'Wookiee Bowcaster'], [/vibro-?blade/, 'Vibroblade'], [/vibro-?axe/, 'Vibroaxe'], [/spear/, 'Spear'], [/knife|dagger/, 'Vibroblade'], [/thermal detonator/, 'Thermal Detonator'], [/grenade/, 'Grenade']]; for (const [re, nm] of alias) if (re.test(t)) { best = list.find(w => w.name === nm) || null; if (best) break; } }
    return best;
  }
  function readDetails() { ['name', 'species', 'sex', 'age', 'height', 'weight', 'physical', 'background', 'personality', 'connection', 'quote'].forEach(k => { const el = $('swb-' + k); if (el) details[k] = el.value; }); }
  function finish() {
    const attrs = {}; ATTRS.forEach(a => attrs[a] = tpl.attributes[a]);
    const sk = Object.entries(alloc).map(([name, adds]) => ({ name, attr: (skills().find(s => s.name === name) || {}).attribute || 'Dexterity', adds }));
    Object.entries(forceAlloc).forEach(([name, pips]) => sk.push({ name, attr: 'Force', adds: pips }));
    const keep = [...document.querySelectorAll('.swb-eq')].filter(c => c.checked).map(c => tpl.equipment[Number(c.dataset.i)]);
    const wp = [], gear = [];
    let ship = {}; const extraNotes = [];
    keep.forEach(e => { if (/credit/i.test(e) && !/blaster|weapon/i.test(e)) { if (/debt|owe/i.test(e)) extraNotes.push(e); return; } });
    keep.forEach(e => { const w = matchWeapon(e); if (w) wp.push({ name: w.name, skill: (skills().find(s => norm(s.name) === norm(w.skill || '')) || {}).name || '', damage: w.damageText || toCode(w.damage), range: w.range || '', notes: e.toLowerCase() !== w.name.toLowerCase() ? e : '' }); else if (/credit/i.test(e)) return; else if (!ship.craft && /freighter|starfighter|fighter|speeder|skiff|shuttle|starship|swoop/i.test(e)) { const v = (typeof SW_VEHICLES !== 'undefined' ? SW_VEHICLES : []).find(x => new RegExp(x.name.replace(/[^a-z0-9 ]/gi, '').split(' ').slice(0, 2).join('.*'), 'i').test(e)); ship = { name: '', craft: v ? v.name : e, speed: v ? [v.speed, v.maneuverability].filter(Boolean).join(' · ') : '', hull: v ? [v.hull, v.shields].filter(Boolean).join(' · ') : '', weapons: v ? (v.weapons || []).map(w => [w.count, w.name, w.fireControl ? 'FC ' + w.fireControl : '', w.damage ? 'dmg ' + w.damage : ''].filter(Boolean).join(' ')).join('; ') : '' }; } else gear.push({ name: e, note: '' }); });
    let armor = { name: '', pips: 0 }; const ai = gear.findIndex(g => /armor|armour|flak vest|protective vest/i.test(g.name)); if (ai >= 0) { const g = gear.splice(ai, 1)[0]; const m = /(\d+D(?:\+\d)?|\+\d)/.exec(g.name); armor = { name: g.name, pips: m ? fromCode(m[1]) || 0 : 3 }; }
    // Credits is a number field now: take the starting amount and keep any
    // descriptive text (e.g. a debt to a crime boss) as a note.
    const creditsText = String(tpl.credits || '');
    const cm = /[\d,]+/.exec(creditsText); const creditsNum = cm ? parseInt(cm[0].replace(/,/g, ''), 10) : 0;
    if (creditsText && /[a-z(]/i.test(creditsText.replace(/^[\s\d,]*credits?/i, ''))) extraNotes.unshift(creditsText);
    const prev = collectSheet();
    applySheet({
      name: details.name || '', template: tpl.name, species: details.species || speciesFor(tpl), sex: details.sex, age: details.age, height: details.height, weight: details.weight, physical: details.physical,
      attrs, skills: sk, wound: 'none', forcePoints: 1, darkSide: 0, skillPoints: 0, credits: creditsNum, armor, move: 10,
      weapons: wp, force: [], gear, ship, background: details.background, personality: details.personality, connection: details.connection, quote: details.quote, special: tpl.specialRule || '', notes: extraNotes.join('\n'),
      campaign: prev.campaign,
    });
    saveSheet(true); syncDocTitle();
    addLog('Character built', '✓', (details.name || 'Unnamed') + ' — ' + tpl.name, 'crit');
  }

  window.SWB = {
    launch() { step = 0; tpl = null; alloc = {}; forceAlloc = {}; details = {}; render(); },
    close() { if (ov) ov.classList.remove('open'); },
    next() {
      if (step === 0 && !tpl) { $('swb-note').textContent = 'Pick a template first'; return; }
      if (step === 1 && spent() < MAX_TOTAL) { $('swb-note').textContent = 'Spend all 7D — ' + toCode(MAX_TOTAL - spent()) + ' left'; return; }
      if (step === 2) readDetails();
      if (step === STEPS.length - 1) { finish(); SWB.close(); return; }
      step++; render();
    },
    back() { if (step === 2) readDetails(); if (step > 0) { step--; render(); } },
  };
})();
