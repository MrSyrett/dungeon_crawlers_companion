// Runtime homebrew loader for the Year Zero Engine sheet. Mirrors
// co-homebrew.js: fetches the viewer's yze-weapon / yze-gear homebrew from
// /api/homebrew and injects it into the sheet's mutable pools (window.YZE_HB_*)
// so the Weapons and Gear pickers show it alongside the SRD content.
// Idempotent; standalone-safe (no /api → no-op).
(function () {
  'use strict';
  var TARGETS = {
    'yze-weapon': function () { return (typeof window !== 'undefined' && Array.isArray(window.YZE_HB_WEAPONS)) ? window.YZE_HB_WEAPONS : null; },
    'yze-gear': function () { return (typeof window !== 'undefined' && Array.isArray(window.YZE_HB_GEAR)) ? window.YZE_HB_GEAR : null; }
  };
  function pull(type) {
    return fetch('/api/homebrew?type=' + type, { credentials: 'same-origin' })
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (j) { return (j && Array.isArray(j.items)) ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; }) : []; })
      .catch(function () { return []; });
  }
  function load(onChange) {
    var jobs = Object.keys(TARGETS).map(function (type) {
      var pool = null; try { pool = TARGETS[type](); } catch (e) { pool = null; }
      if (!pool) return Promise.resolve();
      return pull(type).then(function (rows) {
        pool.length = 0;
        rows.forEach(function (d) { if (d && d.name) { d.source = 'Homebrew'; pool.push(d); } });
      });
    });
    return Promise.all(jobs).then(function () { if (typeof onChange === 'function') try { onChange(); } catch (e) {} });
  }
  if (typeof window !== 'undefined') window.YZEHomebrew = { load: load };
})();
