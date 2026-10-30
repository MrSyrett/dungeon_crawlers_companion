// Runtime homebrew loader for DRAGONBANE (window.DBHB).
// Same contract as nimble-homebrew.js / dnd-homebrew.js: for each homebrew type,
// fetch the viewer's entries from /api/homebrew?type=<type>, strip any rows a
// previous load injected (source:"Homebrew") from the matching window.DB_* pool
// and push the fresh ones in place, so every consumer that reads the same array —
// the sheet's pickers, the creation wizard, the GM Screen — sees them after the
// onChange re-render. Rows are normalised to the shapes in lib/data/db-types.ts
// (arrays that the sheet iterates are always arrays) so a sparse homebrew entry
// can't break a picker. Idempotent; standalone-safe (no /api → no-op).
(function () {
  'use strict';
  var TARGETS = {
    'db-ability': 'DB_HEROIC_ABILITIES',
    'db-spell': 'DB_SPELLS',
    'db-weapon': 'DB_WEAPONS',
    'db-armor': 'DB_ARMOR',
    'db-gear': 'DB_GEAR',
    'db-monster': 'DB_MONSTERS',
    'db-npc': 'DB_NPCS',
    'db-kin': 'DB_KIN',
    'db-profession': 'DB_PROFESSIONS'
  };
  function arr(x) { return Array.isArray(x) ? x : (x == null || x === '' ? [] : String(x).split(/\s*,\s*/).filter(Boolean)); }
  function n(x, d) { var v = Number(x); return isNaN(v) ? d : v; }
  var NORMALISE = {
    'db-ability': function (r) { r.tags = arr(r.tags); r.timing = r.timing || 'free'; if (r.requirement === undefined) r.requirement = null; return r; },
    'db-spell': function (r) { r.school = r.school || 'General'; r.rank = n(r.rank, 1); r.requirements = arr(r.requirements); r.castingTime = r.castingTime || 'action'; if (r.powerLevels == null) r.powerLevels = true; return r; },
    'db-weapon': function (r) { r.features = arr(r.features); r.damage = r.damage || 'D6'; if (!r.melee && !r.ranged) r.melee = true; return r; },
    'db-armor': function (r) { r.banes = arr(r.banes); r.rating = n(r.rating, 1); r.metal = !!r.metal; return r; },
    'db-gear': function (r) { r.category = r.category || 'Homebrew'; if (r.weight === undefined || r.weight === '') r.weight = 1; else if (r.weight !== null) r.weight = n(r.weight, 1); return r; },
    'db-monster': function (r) { r.attacks = Array.isArray(r.attacks) ? r.attacks : []; return r; },
    'db-npc': function (r) { r.weapons = Array.isArray(r.weapons) ? r.weapons : []; r.abilities = arr(r.abilities); r.traits = arr(r.traits); r.skills = (r.skills && typeof r.skills === 'object') ? r.skills : {}; return r; },
    // Kin / professions: the wizard and sheet read them like book entries (no table roll).
    'db-kin': function (r) { r.abilities = Array.isArray(r.abilities) ? r.abilities : []; r.names = arr(r.names); r.movement = n(r.movement, 10); r.text = r.text || ''; return r; },
    'db-profession': function (r) { r.skills = arr(r.skills); r.heroicAbilities = arr(r.heroicAbilities); r.nicknames = arr(r.nicknames); r.kits = Array.isArray(r.kits) ? r.kits : []; r.keyAttribute = r.keyAttribute || 'STR'; r.text = r.text || ''; return r; }
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
        // Homebrew armor with slot "helmet" belongs in DB_HELMETS, not DB_ARMOR.
        if (type === 'db-armor' && Array.isArray(window.DB_HELMETS)) {
          stripHb(window.DB_HELMETS);
          inject(type, window.DB_HELMETS, rows.filter(function (r) { return r.slot === 'helmet'; }));
          rows = rows.filter(function (r) { return r.slot !== 'helmet'; });
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
  window.DBHB = { load: load, types: Object.keys(TARGETS) };
})();
