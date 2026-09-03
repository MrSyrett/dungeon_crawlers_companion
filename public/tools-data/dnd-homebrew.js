// Shared D&D 2024 homebrew loader for the HTML tools (character sheet + GM
// screen). Fetches the user's saved homebrew (own + campaign-shared) from
// /api/homebrew at load and injects it straight into the window.DND_* pools the
// tool already reads, so every consumer — the item shop, spellbook, scroll
// picker, feat/class/species/background datalists, the creation wizard, the
// level-up wizard, and the GM bestiary + reference — sees homebrew with no
// per-module change. The data files publish each pool as the SAME array on
// window (window.DND_X === DND_X), so mutating the array is visible everywhere.
//
// Idempotent: each run strips the homebrew it previously injected (entries
// tagged source:"Homebrew") before re-adding, so a refresh never duplicates.
// No-ops gracefully when opened standalone (no /api) or when a given pool isn't
// loaded on this page (e.g. the GM screen has no DND_CLASSES).
(function () {
  "use strict";

  // Homebrew type → the window global its entries live in. Equipment is one
  // type whose rows carry an hbKind discriminator and fan out to four pools.
  var TARGETS = {
    "dnd-species": "DND_SPECIES",
    "dnd-background": "DND_BACKGROUNDS",
    "dnd-feat": "DND_FEATS",
    "dnd-spell": "DND_SPELLS",
    "dnd-monster": "DND_MONSTERS",
  };
  var EQUIP_TARGET = { weapon: "DND_WEAPONS", armor: "DND_ARMOR", gear: "DND_GEAR", magic: "DND_MAGIC_ITEMS" };

  function poolFor(name) { return (window[name] && Array.isArray(window[name])) ? window[name] : null; }
  function stripHb(arr) { for (var i = arr.length - 1; i >= 0; i--) { if (arr[i] && arr[i].source === "Homebrew") arr.splice(i, 1); } }
  function inject(arr, rows) { for (var i = 0; i < rows.length; i++) { if (rows[i] && rows[i].name) arr.push(rows[i]); } }

  function pull(type) {
    try {
      return fetch("/api/homebrew?type=" + type, { credentials: "same-origin" })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (j) {
          return (j && Array.isArray(j.items))
            ? j.items.map(function (it) { return it && it.data; }).filter(function (d) { return d && d.name; })
            : [];
        })
        .catch(function () { return []; });
    } catch (e) { return Promise.resolve([]); }
  }

  var _busy = false, _pending = null;

  // Fetch every homebrew type whose target pool exists on this page, inject it,
  // then fire onChange so the tool can refresh anything already on screen. Safe
  // to call again later (e.g. after saving new homebrew) — it replaces, not adds.
  // A call made while one is in flight is queued and runs once the first finishes,
  // so a save during the initial load isn't lost.
  function load(onChange) {
    if (_busy) { _pending = onChange || _pending || function () {}; return; }
    var jobs = [];

    Object.keys(TARGETS).forEach(function (type) {
      var pool = poolFor(TARGETS[type]);
      if (!pool) return;
      jobs.push(pull(type).then(function (rows) { stripHb(pool); inject(pool, rows); }));
    });

    if (poolFor("DND_WEAPONS") || poolFor("DND_ARMOR") || poolFor("DND_GEAR") || poolFor("DND_MAGIC_ITEMS")) {
      jobs.push(pull("dnd-equipment").then(function (rows) {
        Object.keys(EQUIP_TARGET).forEach(function (kind) {
          var pool = poolFor(EQUIP_TARGET[kind]);
          if (!pool) return;
          stripHb(pool);
          inject(pool, rows.filter(function (d) { return d && d.hbKind === kind; }));
        });
      }));
    }

    // dnd-subclass → nested into the matching base class's subclasses[] (by className).
    var classPool = poolFor("DND_CLASSES");
    if (classPool) {
      jobs.push(pull("dnd-subclass").then(function (rows) {
        classPool.forEach(function (c) {
          if (!Array.isArray(c.subclasses)) return;
          for (var i = c.subclasses.length - 1; i >= 0; i--) { if (c.subclasses[i] && c.subclasses[i].source === "Homebrew") c.subclasses.splice(i, 1); }
        });
        rows.forEach(function (sc) {
          if (!sc || !sc.name || !sc.className) return;
          var base = null;
          for (var j = 0; j < classPool.length; j++) { if (String(classPool[j].name).toLowerCase() === String(sc.className).toLowerCase()) { base = classPool[j]; break; } }
          if (!base) { try { console.warn('[homebrew] subclass "' + sc.name + '" references unknown base class "' + sc.className + '" — not shown'); } catch (e) {} return; }
          if (!Array.isArray(base.subclasses)) base.subclasses = [];
          base.subclasses.push(sc);
        });
      }));
    }

    if (!jobs.length) return;
    _busy = true;
    Promise.all(jobs).then(function () {
      _busy = false;
      try { if (typeof onChange === "function") onChange(); } catch (e) {}
      if (_pending) { var next = _pending; _pending = null; load(next); }   // run a call that arrived mid-flight
    }, function () { _busy = false; if (_pending) { var n = _pending; _pending = null; load(n); } });
  }

  window.DNDHB = { load: load };
})();
