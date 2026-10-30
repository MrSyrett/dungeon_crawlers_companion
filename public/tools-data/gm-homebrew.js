// GM Screen homebrew loader for the systems whose book data the GM Screen reads
// but which had no homebrew feed of their own here (the per-sheet loaders —
// twd-homebrew.js, myz-homebrew.js, … — target sheet-only pools, so the GM
// Screen keeps its own). Fetches the viewer's homebrew (own + shared with the
// linked campaign) for the CURRENT system only, keeps the normalised records
// (lib/homebrew.ts shapes) untouched, and lets the GM Screen map them into each
// feature's shape:
//
//   GMHB.get(type)        → [data, …] for that homebrew type ([] until loaded)
//   GMHB.load()           → (re)fetch the current system's types
//   GMHB.onChange(fn)     → called after every load that changed something
//
// Marvel powers / traits / tags are also merged straight into MMRPG_POWERS /
// MMRPG_TRAITS / MMRPG_TAGS (tagged _gmhb so a reload replaces, never
// duplicates), because the henchman builder and the ⓘ detail popover look
// them up there by name. Standalone-safe (no /api → empty lists).
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.GMHB) return;

  var TYPES = {
    TWD: ['twd-weapon', 'twd-gear'],
    MYZ: ['myz-weapon', 'myz-gear'],
    VAE: ['vae-weapon', 'vae-gear'],
    MMRPG: ['mmrpg-power', 'mmrpg-trait', 'mmrpg-tag', 'mmrpg-iconic', 'mmrpg-hq', 'mmrpg-starship'],
    YZE: ['yze-weapon', 'yze-gear'],
    D62E: ['d62e-gear'],
    ICRPG: ['icrpg-gear', 'icrpg-loot'],
    LOTR: ['lotr-weapon', 'lotr-gear'],
    DB: ['db-weapon', 'db-armor', 'db-gear'],
    PB: ['pb-weapon', 'pb-armor', 'pb-gear', 'pb-relic'],
  };
  // Homebrew type → the book pool it is merged into (by name lookup consumers).
  var MERGE = {
    'mmrpg-power': function () { return typeof MMRPG_POWERS !== 'undefined' ? MMRPG_POWERS : window.MMRPG_POWERS; },
    'mmrpg-trait': function () { return typeof MMRPG_TRAITS !== 'undefined' ? MMRPG_TRAITS : window.MMRPG_TRAITS; },
    'mmrpg-tag': function () { return typeof MMRPG_TAGS !== 'undefined' ? MMRPG_TAGS : window.MMRPG_TAGS; },
  };

  var store = {}, loadedKey = {}, watchers = [], seq = 0;

  function sys() { return String(window.GM_SYSTEM || '').toUpperCase(); }
  function campId() {
    try { var c = (typeof GMCamp !== 'undefined' && GMCamp.get) ? GMCamp.get() : null; return c && c.id ? String(c.id) : ''; } catch (e) { return ''; }
  }
  function pull(type, camp) {
    try {
      return fetch('/api/homebrew?type=' + encodeURIComponent(type) + (camp ? '&campaign=' + encodeURIComponent(camp) : ''), { credentials: 'same-origin' })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (j) {
          return (j && Array.isArray(j.items))
            ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && typeof d === 'object' && d.name; })
            : [];
        })
        .catch(function () { return []; });
    } catch (e) { return Promise.resolve([]); }
  }
  function merge(type, rows) {
    var get = MERGE[type]; if (!get) return;
    var pool = null; try { pool = get(); } catch (e) { pool = null; }
    if (!Array.isArray(pool)) return;
    for (var i = pool.length - 1; i >= 0; i--) { if (pool[i] && pool[i]._gmhb) pool.splice(i, 1); }
    rows.forEach(function (d) {
      var row = {}; for (var k in d) row[k] = d[k];
      row._gmhb = true; row.homebrew = true; if (!row.source) row.source = 'Homebrew';
      pool.push(row);
    });
  }
  function load() {
    var s = sys(), types = TYPES[s]; if (!types) return Promise.resolve();
    var camp = campId(), key = s + '|' + camp, my = ++seq;
    return Promise.all(types.map(function (t) { return pull(t, camp); })).then(function (res) {
      if (my !== seq) return;            // a newer load (system / campaign switch) won
      types.forEach(function (t, i) { store[t] = res[i]; merge(t, res[i]); });
      loadedKey[s] = key;
      watchers.forEach(function (fn) { try { fn(s); } catch (e) {} });
    });
  }
  // Re-pull when the system or the linked campaign changes (not on every notify).
  function maybeLoad() { var s = sys(); if (TYPES[s] && loadedKey[s] !== s + '|' + campId()) load(); }

  window.GMHB = {
    get: function (type) { return Array.isArray(store[type]) ? store[type] : []; },
    load: load,
    onChange: function (fn) { if (typeof fn === 'function') watchers.push(fn); },
    types: TYPES,
  };

  function start() {
    maybeLoad();
    try { if (typeof GMCamp !== 'undefined' && GMCamp.onChange) GMCamp.onChange(maybeLoad); } catch (e) {}
    document.addEventListener('gm-system-change', maybeLoad);
  }
  // The MMRPG_* pools are <script src> tags further down the page.
  if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(start, 0);
  else document.addEventListener('DOMContentLoaded', start, { once: true });
})();
