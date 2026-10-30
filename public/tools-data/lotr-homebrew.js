// The Lord of the Rings 5E homebrew loader for the LotR character sheet.
// Fetches the user's saved homebrew (own + campaign-shared) from /api/homebrew
// and injects it into the window.LOTR_* pools the sheet, its creation wizard and
// its level-up wizard already read (D.virtues(), D.weapons()…), so homebrew
// virtues, backgrounds, weapons, gear and adversaries (companion autofill) show
// up with no per-module change. Entries are tagged source:"Homebrew"; each run
// strips the previously injected ones first, so a refresh never duplicates.
// No-ops when opened standalone (no /api) or when a pool isn't on the page.
(function () {
  "use strict";
  var TARGETS = {
    "lotr-virtue": "LOTR_VIRTUES",
    "lotr-background": "LOTR_BACKGROUNDS",
    "lotr-weapon": "LOTR_WEAPONS",
    "lotr-gear": "LOTR_GEAR",
    "lotr-monster": "LOTR_MONSTERS",
  };
  function poolFor(name) { return (window[name] && Array.isArray(window[name])) ? window[name] : null; }
  function stripHb(arr) { for (var i = arr.length - 1; i >= 0; i--) { if (arr[i] && arr[i].source === "Homebrew") arr.splice(i, 1); } }
  function pull(type) {
    try {
      return fetch("/api/homebrew?type=" + type, { credentials: "same-origin" })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (j) {
          return (j && Array.isArray(j.items)) ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; }) : [];
        })
        .catch(function () { return []; });
    } catch (e) { return Promise.resolve([]); }
  }
  function load(onChange) {
    var jobs = [];
    Object.keys(TARGETS).forEach(function (type) {
      var pool = poolFor(TARGETS[type]); if (!pool) return;
      jobs.push(pull(type).then(function (rows) {
        stripHb(pool);
        var seen = {}; pool.forEach(function (x) { if (x && x.name) seen[String(x.name).toLowerCase()] = 1; });
        rows.forEach(function (d) { var k = String(d.name).toLowerCase(); if (seen[k]) return; seen[k] = 1; pool.push(Object.assign({}, d, { source: "Homebrew" })); });
      }));
    });
    Promise.all(jobs).then(function () { if (typeof onChange === "function") { try { onChange(); } catch (e) {} } });
  }
  window.LOTRHB = { load: load };
})();
