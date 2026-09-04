// GENERATED-STYLE runtime homebrew loader for the SW system.
// Mirrors dnd-homebrew.js but for pools that are bare `const SW_*`
// lexical globals (NOT on window): each target is a getter that resolves the
// array by name from the shared global scope, and injection mutates it in place
// (strip prior source:"Homebrew", re-inject) so every consumer that reads the
// same array — pickers, datalists, the GM screen — sees the homebrew after the
// onChange re-render. Idempotent; standalone-safe (no /api → no-op).
(function () {
  'use strict';
  var TARGETS = {
    'sw-weapon': function(){ return typeof SW_WEAPONS !== 'undefined' ? SW_WEAPONS : null; },
    'sw-gear': function(){ return typeof SW_GEAR !== 'undefined' ? SW_GEAR : null; },
    'sw-force': function(){ return typeof SW_FORCE !== 'undefined' ? SW_FORCE : null; },
    'sw-character': function(){ return typeof SW_CHARACTERS !== 'undefined' ? SW_CHARACTERS : null; }
  };
  var _busy = false, _pending = null;
  function stripHb(arr) { for (var i = arr.length - 1; i >= 0; i--) { if (arr[i] && arr[i].source === 'Homebrew') arr.splice(i, 1); } }
  function inject(arr, rows) { for (var i = 0; i < rows.length; i++) { if (rows[i] && rows[i].name) arr.push(rows[i]); } }
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
      var pool = null; try { pool = TARGETS[type](); } catch (e) { pool = null; }
      if (!pool || !Array.isArray(pool)) return;
      jobs.push(pull(type).then(function (rows) { stripHb(pool); inject(pool, rows); }));
    });
    if (!jobs.length) return;
    _busy = true;
    Promise.all(jobs).then(
      function () { _busy = false; try { if (typeof onChange === 'function') onChange(); } catch (e) {} if (_pending) { var n = _pending; _pending = null; load(n); } },
      function () { _busy = false; if (_pending) { var n = _pending; _pending = null; load(n); } }
    );
  }
  window.SWHB = { load: load };
})();
