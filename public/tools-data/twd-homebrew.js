// Runtime homebrew loader for The Walking Dead sheet. Mirrors yze-homebrew.js:
// fetches the viewer's twd-weapon / twd-gear homebrew from /api/homebrew and
// fills window.TWD_HB_WEAPONS / TWD_HB_GEAR / TWD_HB_ARMOR (twd-gear records
// built as armor, kind "armor", go to the Armor tab) so the sheet's Add Gear
// picker lists them beside the book content. Shapes: components/hb/twd/rules.ts.
// Idempotent; standalone-safe (no /api → empty pools).
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  ['TWD_HB_WEAPONS', 'TWD_HB_GEAR', 'TWD_HB_ARMOR'].forEach(function (k) { if (!Array.isArray(window[k])) window[k] = []; });
  function pull(type) {
    return fetch('/api/homebrew?type=' + type, { credentials: 'same-origin' })
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (j) { return (j && Array.isArray(j.items)) ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; }) : []; })
      .catch(function () { return []; });
  }
  function load(onChange) {
    var W = window.TWD_HB_WEAPONS, G = window.TWD_HB_GEAR, A = window.TWD_HB_ARMOR;
    return Promise.all([pull('twd-weapon'), pull('twd-gear')]).then(function (res) {
      W.length = 0; G.length = 0; A.length = 0;
      res[0].forEach(function (d) { d.source = 'Homebrew'; W.push(d); });
      res[1].forEach(function (d) { d.source = 'Homebrew'; (d.kind === 'armor' ? A : G).push(d); });
      if (typeof onChange === 'function') try { onChange(); } catch (e) {}
    });
  }
  window.TWDHomebrew = { load: load };
})();
