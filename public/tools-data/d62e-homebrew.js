// Runtime homebrew loader for the D6 System 2e sheet. Mirrors yze-homebrew.js:
// fetches the viewer's d62e-skill / d62e-gear / d62e-power / d62e-trait /
// d62e-limitation homebrew from /api/homebrew and injects it into the sheet's
// mutable pools (window.D62E_HB_*) so every picker shows it beside the book
// content. The sheet's central data map (D.skills/equipment/powers/perks/
// limitations) concats these pools, so one injection reaches every picker.
//
// The d62e-creature type is deliberately NOT loaded here: it has no character-
// sheet picker (it's bestiary / GM-prep content). This loader creates the pools
// itself, so the sheet needs only to read them. Idempotent; standalone-safe
// (no /api, or a signed-out 401 → the pools just stay empty).
(function () {
  'use strict';
  // homebrew type  ->  the window pool the sheet's data map reads
  var TARGETS = {
    'd62e-skill': 'D62E_HB_SKILLS',
    'd62e-gear': 'D62E_HB_GEAR',
    'd62e-power': 'D62E_HB_POWERS',
    'd62e-trait': 'D62E_HB_TRAITS',
    'd62e-limitation': 'D62E_HB_LIMITS'
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
  if (typeof window !== 'undefined') window.D62eHomebrew = { load: load };
})();
