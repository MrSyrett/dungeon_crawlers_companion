// Index Card RPG character builder — the "Create" button on the sheet.
// Walks ICRPG creation: pick a World, an identity (Life Form + Type), assign 6
// stat points (up to +3 each at start), and take the Type's starting loot &
// abilities. Uses the sheet's globals (ICRPG_* data, $, esc, applySheet,
// collectSheet, saveSheet, syncDocTitle, addLog, STAT_ABBR) — load after the sheet.
(function () {
  const STEPS = ['World', 'Identity', 'Stats', 'Loadout'];
  const MAX_TOTAL = 6, MAX_PER = 3;
  const ABBR = (typeof STAT_ABBR !== 'undefined' && STAT_ABBR) || ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  let step = 0, world = '', lifeForm = '', type = '', name = '';
  let alloc = {}, picks = { abilities: {}, loot: {} }, _lastStep = -1, ov = null;

  const G = x => (typeof x !== 'undefined' && Array.isArray(x)) ? x : [];
  const worlds = () => G(typeof ICRPG_WORLDS !== 'undefined' ? ICRPG_WORLDS : undefined);
  const lifeforms = () => G(typeof ICRPG_LIFEFORMS !== 'undefined' ? ICRPG_LIFEFORMS : undefined);
  const types = () => G(typeof ICRPG_TYPES !== 'undefined' ? ICRPG_TYPES : undefined);
  const inWorld = (x) => !world || x.world === world || x.world === 'core';
  const worldName = (k) => { const w = worlds().find(x => x.key === k); return w ? w.name : k; };
  const typeObj = () => types().find(t => t.name === type) || null;
  const spent = () => ABBR.reduce((n, a) => n + (alloc[a] || 0), 0);

  // Parse a life-form stat bonus string like "+1 STR, +1 DEX" into {STR:1,DEX:1}.
  function parseBonus(str) {
    const out = {}; const re = /([+-]?\d+)\s*(STR|DEX|CON|INT|WIS|CHA)/gi; let m;
    while ((m = re.exec(String(str || '')))) out[m[2].toUpperCase()] = (out[m[2].toUpperCase()] || 0) + parseInt(m[1], 10);
    return out;
  }

  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'icb-overlay'; ov.className = 'ov';
    ov.innerHTML = '<div class="modal wide" style="max-height:94vh;"><div class="modal-hd"><div class="ttl" id="icb-title">Character Builder</div><button class="x" onclick="ICRPGB.close()">&#10005;</button></div>'
      + '<div id="icb-steps" style="display:flex;gap:4px;padding:8px 16px 0;flex-wrap:wrap;"></div>'
      + '<div class="modal-bd" id="icb-body"></div>'
      + '<div class="modal-ft"><button class="m-btn ghost" id="icb-back" onclick="ICRPGB.back()">← Back</button><span id="icb-note" style="font-size:12px;color:#999;align-self:center;flex:1;text-align:center;"></span><button class="m-btn" id="icb-next" onclick="ICRPGB.next()">Next →</button></div></div>';
    document.body.appendChild(ov);
  }

  function render() {
    ensure();
    $('icb-steps').innerHTML = STEPS.map((s, i) => '<span style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;border:1px solid ' + (i === step ? '#e8823c' : '#333') + ';color:' + (i === step ? '#e8823c' : i < step ? '#ccc' : '#666') + ';">' + (i + 1) + '. ' + s + '</span>').join('');
    $('icb-back').style.visibility = step === 0 ? 'hidden' : 'visible';
    $('icb-next').textContent = step === STEPS.length - 1 ? 'Finish ✓' : 'Next →';
    const b = $('icb-body'), note = $('icb-note');
    const keep = _lastStep === step, bScroll = keep ? b.scrollTop : 0;

    if (step === 0) {
      note.textContent = world ? worldName(world) : 'Pick a world';
      b.innerHTML = '<p class="m-hint">Every ICRPG hero belongs to a World — its own setting, life forms and gear. Pick one (you can reskin any of it to taste).</p><div class="tpl-list">'
        + worlds().map(w => '<div class="tpl-card' + (world === w.key ? ' sel' : '') + '" data-w="' + esc(w.key) + '"><b>' + esc(w.name) + '</b><small>' + esc((w.era || '') + (w.era && w.blurb ? ' — ' : '') + (w.blurb || '').slice(0, 120)) + '</small></div>').join('') + '</div>';
      b.querySelectorAll('.tpl-card').forEach(c => c.addEventListener('click', () => { if (world !== c.dataset.w) { world = c.dataset.w; lifeForm = ''; type = ''; } render(); }));
    } else if (step === 1) {
      note.textContent = 'Who are you?';
      const lfs = lifeforms().filter(inWorld), tys = types().filter(inWorld);
      const lf = lifeForm, ty = type;
      b.innerHTML = '<p class="m-hint">Name your hero, then choose a <b>Life Form</b> (what you are) and a <b>Type</b> (what you do). Both come from <b>' + esc(worldName(world)) + '</b> plus the core options.</p>'
        + '<div class="m-lbl">Name</div><input class="m-input" id="icb-name" value="' + esc(name) + '" placeholder="Hero name">'
        + '<div class="m-lbl">Life Form</div><select class="m-input" id="icb-lifeform"><option value="">— life form —</option>' + lfs.map(x => '<option value="' + esc(x.name) + '"' + (x.name === lf ? ' selected' : '') + '>' + esc(x.name) + (x.statBonus ? ' (' + esc(x.statBonus) + ')' : '') + '</option>').join('') + '</select>'
        + '<div id="icb-lf-desc" style="font-size:12px;color:#a89888;line-height:1.5;margin:6px 0;"></div>'
        + '<div class="m-lbl">Type</div><select class="m-input" id="icb-type"><option value="">— type —</option>' + tys.map(x => '<option value="' + esc(x.name) + '"' + (x.name === ty ? ' selected' : '') + '>' + esc(x.name) + '</option>').join('') + '</select>'
        + '<div id="icb-ty-desc" style="font-size:12px;color:#a89888;line-height:1.5;margin:6px 0;"></div>';
      const upd = () => {
        name = $('icb-name').value; lifeForm = $('icb-lifeform').value; type = $('icb-type').value;
        const lfo = lifeforms().find(x => x.name === lifeForm), tyo = typeObj();
        $('icb-lf-desc').textContent = lfo ? (lfo.desc || '') : '';
        $('icb-ty-desc').innerHTML = tyo ? (esc(tyo.desc || '') + (tyo.statFocus ? '<br><b style="color:#e8823c;">Focus:</b> ' + esc(tyo.statFocus) : '')) : '';
      };
      $('icb-name').addEventListener('input', upd);
      $('icb-lifeform').addEventListener('change', upd);
      $('icb-type').addEventListener('change', upd);
      upd();
    } else if (step === 2) {
      const left = MAX_TOTAL - spent();
      note.textContent = 'Points left: ' + left;
      const lfo = lifeforms().find(x => x.name === lifeForm), bonus = lfo ? parseBonus(lfo.statBonus) : {};
      let h = '<p class="m-hint">Spend <b>' + MAX_TOTAL + '</b> points across your six Stats — up to <b>+' + MAX_PER + '</b> in any one at creation (hard cap is +10; Milestones raise them later). Your Life Form bonus is added on top.</p><div class="alloc"><div class="a-skills" style="grid-template-columns:1fr;">';
      ABBR.forEach(a => {
        const v = alloc[a] || 0, bo = bonus[a] || 0, total = v + bo;
        h += '<div class="a-row"><span class="a-name">' + a + (bo ? ' <span style="color:#8a8a8a;">(+' + bo + ' life form)</span>' : '') + '</span>'
          + '<span class="a-code">+' + total + '</span>'
          + '<button class="a-rk" data-a="' + a + '" data-d="-1"' + (v <= 0 ? ' disabled' : '') + '>−</button>'
          + '<button class="a-rk" data-a="' + a + '" data-d="1"' + (v >= MAX_PER || left <= 0 ? ' disabled' : '') + '>+</button></div>';
      });
      b.innerHTML = h + '</div></div>';
      b.querySelectorAll('button[data-a]').forEach(btn => btn.addEventListener('click', () => { const k = btn.dataset.a; alloc[k] = Math.max(0, (alloc[k] || 0) + Number(btn.dataset.d)); if (!alloc[k]) delete alloc[k]; render(); }));
    } else {
      note.textContent = 'Starting kit';
      const tyo = typeObj();
      const abils = (tyo && Array.isArray(tyo.abilities)) ? tyo.abilities : [];
      const loots = (tyo && Array.isArray(tyo.startingLoot)) ? tyo.startingLoot : [];
      if (!abils.length && !loots.length) {
        b.innerHTML = '<p class="m-hint">Your Type lists no fixed starting kit — add Abilities, Spells and Loot from the sheet after you finish. Click <b>Finish</b> to build the character.</p>';
      } else {
        let h = '<p class="m-hint"><b>' + esc(type || 'Your Type') + '</b> starts with this kit. Untick anything you\'d rather not take; add more from the sheet later.</p>';
        if (abils.length) { h += '<div class="m-lbl">Abilities &amp; Powers</div><div style="display:flex;flex-direction:column;gap:5px;">' + abils.map((a, i) => '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#ddd;"><input type="checkbox" class="icb-ab" data-i="' + i + '"' + (picks.abilities[i] !== false ? ' checked' : '') + ' style="margin-top:3px;"><span>' + esc(a) + '</span></label>').join('') + '</div>'; }
        if (loots.length) { h += '<div class="m-lbl">Loot</div><div style="display:flex;flex-direction:column;gap:5px;">' + loots.map((l, i) => '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#ddd;"><input type="checkbox" class="icb-lt" data-i="' + i + '"' + (picks.loot[i] !== false ? ' checked' : '') + ' style="margin-top:3px;"><span>' + esc(l) + '</span></label>').join('') + '</div>'; }
        b.innerHTML = h;
        b.querySelectorAll('.icb-ab').forEach(c => c.addEventListener('change', () => { picks.abilities[c.dataset.i] = c.checked; }));
        b.querySelectorAll('.icb-lt').forEach(c => c.addEventListener('change', () => { picks.loot[c.dataset.i] = c.checked; }));
      }
    }
    if (keep) b.scrollTop = bScroll;
    _lastStep = step; ov.classList.add('open');
  }

  function readIdentity() { if ($('icb-name')) name = $('icb-name').value; if ($('icb-lifeform')) lifeForm = $('icb-lifeform').value; if ($('icb-type')) type = $('icb-type').value; }

  function finish() {
    const lfo = lifeforms().find(x => x.name === lifeForm), bonus = lfo ? parseBonus(lfo.statBonus) : {};
    const stats = {}; ABBR.forEach(a => { stats[a] = { base: alloc[a] || 0, bonus: bonus[a] || 0 }; });
    const tyo = typeObj();
    const abils = (tyo && Array.isArray(tyo.abilities)) ? tyo.abilities : [];
    const loots = (tyo && Array.isArray(tyo.startingLoot)) ? tyo.startingLoot : [];
    const abilities = abils.filter((a, i) => picks.abilities[i] !== false).map(a => ({ name: a, tag: 'Ability' }));
    const loot = loots.filter((l, i) => picks.loot[i] !== false).map(l => ({ name: l, tag: 'Loot' }));
    const prev = (typeof collectSheet === 'function') ? collectSheet() : {};
    applySheet({
      system: 'ICRPG', name: name || '', world: world, lifeForm: lifeForm, type: type,
      stats: stats, effort: {}, hp: 10, hpMax: 10, armor: 0, target: 12, level: 0,
      abilities: abilities, spells: [], loot: loot,
      story: '', notes: '', dying: false, coin: false,
      campaign: prev.campaign || null,
    });
    saveSheet(true); syncDocTitle();
    addLog('Character built', '✓', (name || 'Unnamed') + ' — ' + (type || worldName(world)), 'crit');
  }

  window.ICRPGB = {
    launch() { step = 0; world = ''; lifeForm = ''; type = ''; name = ''; alloc = {}; picks = { abilities: {}, loot: {} }; _lastStep = -1; render(); },
    close() { if (ov) ov.classList.remove('open'); },
    next() {
      if (step === 0 && !world) { $('icb-note').textContent = 'Pick a world first'; return; }
      if (step === 1) { readIdentity(); }
      if (step === 2 && spent() < MAX_TOTAL) { $('icb-note').textContent = 'Spend all ' + MAX_TOTAL + ' points — ' + (MAX_TOTAL - spent()) + ' left'; return; }
      if (step === STEPS.length - 1) { finish(); this.close(); return; }
      step++; render();
    },
    back() { if (step === 1) readIdentity(); if (step > 0) { step--; render(); } },
  };
})();
