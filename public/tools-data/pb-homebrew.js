// Runtime homebrew loader for PIRATE BORG (window.PBHB).
// Same contract as db-homebrew.js / nimble-homebrew.js: for each homebrew type, fetch
// the viewer's entries from /api/homebrew?type=<type>, strip any rows a previous load
// injected (source:"Homebrew") from the matching window.PB_* pool and push the fresh
// ones in place, so every consumer that reads the same array — the sheet's pickers, the
// creation wizard, the GM Screen — sees them after the onChange re-render. Rows are
// normalised to the shapes in lib/data/pb-types.ts so a sparse entry can't break a
// picker. pb-armor rows with slot "hat" go to PB_HATS, the rest to PB_CLOTHING.
// Idempotent; standalone-safe (no /api → no-op).
(function () {
  'use strict';
  var TARGETS = {
    'pb-weapon': 'PB_WEAPONS',
    'pb-armor': 'PB_CLOTHING',
    'pb-gear': 'PB_GEAR',
    'pb-relic': 'PB_RELICS',
    'pb-ritual': 'PB_RITUALS'
  };
  var DIE_BY_TIER = [null, 'd2', 'd4', 'd6'];
  function n(x, d) { var v = Number(x); return isNaN(v) ? d : v; }
  function str(x) { return x == null ? '' : String(x).trim(); }
  function dice(x) { var s = str(x).toLowerCase().replace(/\s+/g, ''); return s ? s : null; }
  function bool(x) { return x === true || x === 'true' || x === 'yes' || x === 1 || x === '1'; }
  var NORMALISE = {
    'pb-weapon': function (r) {
      r.type = /ranged/i.test(str(r.type)) ? 'ranged' : 'melee';
      r.damage = dice(r.damage || r.dmg) || 'd4';
      r.cost = r.cost === '' || r.cost == null ? null : n(r.cost, null);
      r.hands = n(r.hands, 1) === 2 ? 2 : 1;
      r.reach = r.reach === '' || r.reach == null ? null : n(r.reach, null);
      r.range = r.range === '' || r.range == null ? null : n(r.range, null);
      r.blackPowder = bool(r.blackPowder);
      r.reload = r.reload === '' || r.reload == null ? (r.blackPowder ? 2 : null) : n(r.reload, 2);
      r.ammo = r.blackPowder ? (r.ammo || 'shot') : (r.ammo || null);
      r.special = str(r.special || r.text || r.description) || null;
      if (r.sword != null) r.sword = bool(r.sword);
      // The editor stores a "can be thrown" checkbox; the sheet's attack dialog needs the
      // book's {ability, dr} shape (like the Whaling Harpoon) to offer "Throw it".
      if (r.thrown != null && typeof r.thrown !== 'object') r.thrown = bool(r.thrown) && r.type === 'melee' ? { ability: 'AGILITY', dr: 12 } : null;
      if (r.pistol == null && r.blackPowder && r.type === 'ranged' && /pistol/i.test(str(r.name))) r.pistol = true;
      if (!Array.isArray(r.aliases)) r.aliases = [];
      return r; },
    'pb-armor': function (r) {
      if (r.slot === 'hat') {
        r.damageReduction = n(r.damageReduction != null ? r.damageReduction : r.reduction, 0);
        r.metal = bool(r.metal); r.sacrifice = bool(r.sacrifice);
        r.cost = r.cost === '' || r.cost == null ? null : n(r.cost, null);
        r.special = str(r.special || r.text) || '';
        r.roll = r.roll == null ? 0 : r.roll; return r; }
      var t = Math.max(0, Math.min(3, Math.round(n(r.tier, 0))));
      r.tier = t; r.armorDie = DIE_BY_TIER[t];
      r.agilityDR = n(r.agilityDR, t === 2 ? 2 : t === 3 ? 4 : 0);
      r.defenseDR = n(r.defenseDR, t >= 2 ? 2 : 0);
      r.metal = bool(r.metal);
      r.cost = r.cost === '' || r.cost == null ? null : n(r.cost, null);
      r.special = str(r.special || r.text) || '';
      r.roll = r.roll == null ? 0 : r.roll;
      return r; },
    'pb-gear': function (r) {
      r.category = r.category || 'gear';
      r.cost = r.cost === '' || r.cost == null ? null : n(r.cost, null);
      r.costText = r.costText || (r.cost != null ? r.cost + 's' : '');
      if (r.capacity != null && r.capacity !== '') { r.capacity = n(r.capacity, null); if (r.category === 'gear') r.category = 'container'; }
      if (r.heal) r.heal = dice(r.heal);
      if (r.consumable != null) r.consumable = bool(r.consumable);
      r.effect = str(r.effect || r.text || r.description) || undefined;
      return r; },
    'pb-relic': function (r) { r.text = str(r.text || r.effect || r.description); r.roll = r.roll == null ? 0 : n(r.roll, 0); return r; },
    'pb-ritual': function (r) { r.text = str(r.text || r.effect || r.description); r.roll = r.roll == null ? 0 : n(r.roll, 0); r.numeral = r.numeral || ''; return r; }
  };
  var _busy = false, _pending = null;
  function pool(type) { var p = window[TARGETS[type]]; return Array.isArray(p) ? p : null; }
  function stripHb(a) { for (var i = a.length - 1; i >= 0; i--) { if (a[i] && a[i].source === 'Homebrew') a.splice(i, 1); } }
  function inject(type, a, rows) {
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i]; if (!r || !r.name) continue;
      r = Object.assign({}, r, { source: 'Homebrew' });
      if (!r.id) r.id = 'hb-' + String(r.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      try { r = NORMALISE[type](r); } catch (e) {}
      a.push(r);
    }
  }
  function pull(type) {
    return fetch('/api/homebrew?type=' + type, { credentials: 'same-origin' })
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (j) { return (j && Array.isArray(j.items)) ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; }) : []; })
      .catch(function () { return []; });
  }
  function load(onChange) {
    if (_busy) { _pending = onChange || _pending || function () {}; return; }
    var jobs = [];
    Object.keys(TARGETS).forEach(function (type) {
      var p = pool(type); if (!p) return;
      jobs.push(pull(type).then(function (rows) {
        stripHb(p);
        // Homebrew armor with slot "hat" belongs in PB_HATS, not PB_CLOTHING.
        if (type === 'pb-armor' && Array.isArray(window.PB_HATS)) {
          stripHb(window.PB_HATS);
          inject(type, window.PB_HATS, rows.filter(function (r) { return r.slot === 'hat'; }));
          rows = rows.filter(function (r) { return r.slot !== 'hat'; });
        }
        inject(type, p, rows);
      }));
    });
    if (!jobs.length) return;
    _busy = true;
    Promise.all(jobs).then(
      function () { _busy = false; try { if (typeof onChange === 'function') onChange(); } catch (e) {} if (_pending) { var nx = _pending; _pending = null; load(nx); } },
      function () { _busy = false; if (_pending) { var nx = _pending; _pending = null; load(nx); } }
    );
  }
  window.PBHB = { load: load, types: Object.keys(TARGETS) };
})();
