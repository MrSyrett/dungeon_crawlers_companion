// Runtime homebrew loader for the ICRPG sheet. Mirrors yze-homebrew.js: fetches
// the viewer's icrpg-ability / icrpg-spell / icrpg-loot / icrpg-gear homebrew
// from /api/homebrew and injects it into the sheet's mutable pools
// (window.ICRPG_HB_*) so the Abilities, Spells and Loot & Gear pickers show it
// beside the book content. The sheet's pickerPool() concats these pools.
//
// icrpg-type (hero types, a creation-time choice) and icrpg-monster (bestiary /
// GM prep) have no item picker on the sheet, so they are not loaded here. This
// loader creates the pools itself. Idempotent; standalone-safe (no /api, or a
// signed-out 401 → the pools just stay empty).
(function () {
  'use strict';
  var TARGETS = {
    'icrpg-ability': 'ICRPG_HB_ABILITIES',
    'icrpg-spell': 'ICRPG_HB_SPELLS',
    'icrpg-loot': 'ICRPG_HB_LOOT',
    'icrpg-gear': 'ICRPG_HB_GEAR'
  };
  function pool(name) {
    if (typeof window === 'undefined') return [];
    if (!Array.isArray(window[name])) window[name] = [];
    return window[name];
  }
  function pull(type) {
    return fetch('/api/homebrew?type=' + type, { credentials: 'same-origin' })
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (j) { return (j && Array.isArray(j.items)) ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; }) : []; })
      .catch(function () { return []; });
  }
  function load(onChange) {
    var jobs = Object.keys(TARGETS).map(function (type) {
      var p = pool(TARGETS[type]);
      return pull(type).then(function (rows) {
        p.length = 0;
        rows.forEach(function (d) { if (d && d.name) { d.source = 'Homebrew'; p.push(d); } });
      });
    });
    return Promise.all(jobs).then(function () { if (typeof onChange === 'function') try { onChange(); } catch (e) {} });
  }
  if (typeof window !== 'undefined') window.IcrpgHomebrew = { load: load };
})();
