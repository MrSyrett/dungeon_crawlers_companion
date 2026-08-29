// Dungeon Crawler Carl — Passive skill buffs → Evade / DR
// Loaded by tools/templates/dcc_character_sheet.html as <script src>, after
// /tools-data/dcc-skills.js (DCC_SKILLS) and the sheet's own scripts.
//
// Some skills grant an ALWAYS-ON bonus to a derived combat stat — Dodge gives a
// "+1 Evade Buff" (rising with its Rank 5/10/15 upgrades), and several weapon skills
// (Longsword, Rapier, Quarterstaff) plus Jumping / Catlike Reflexes hand out Evade
// buffs at high rank too. This module reads the skill rows and folds those always-on
// Evade / DR bonuses into the sheet's Evade Buffs and DR Buffs fields so the totals
// are right without hand-entry.
//
// It touches ONLY #evade-buffs and #dr-buffs (never dr-armor / *-enh — those belong
// to the equip module), so the two systems never collide. The bonus is a RUNTIME
// OVERLAY: it is re-applied every load and is stripped back out at save time (see
// manualValue), so the player's own hand-entered buff amount is what's stored and
// the skill contribution can never double up across reloads or rank changes.
//
// Conservative on purpose: a bonus is applied only when it is unconditional. A DR
// that reads "+5 DR when using this Skill" (Catcher) or an Evade rider that only
// works "vs. Ranged Attacks" stays in the skill text for the player to invoke.

(function () {
  "use strict";

  function num(v) { var n = parseInt(String(v == null ? "" : v).replace(/[^0-9-]/g, ""), 10); return isNaN(n) ? 0 : n; }
  function norm(s) { return String(s == null ? "" : s).trim(); }

  function hbSkills() { return Array.isArray(window.__DCC_HB_SKILLS) ? window.__DCC_HB_SKILLS : []; }
  function skillLookup(name) {
    var t = norm(name).toLowerCase(); if (!t) return null;
    var strip = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ""); };
    var all = (typeof DCC_SKILLS !== "undefined" ? DCC_SKILLS : []).concat(hbSkills());
    return all.find(function (x) { return x.name && x.name.toLowerCase() === t; }) ||
      all.find(function (x) { return x.name && strip(x.name) === strip(t); }) || null;
  }

  // Split into clauses so a conditional qualifier ("…when using this Skill") only
  // disqualifies its OWN clause — Dodge's "Gain a +1 Evade Buff, and you may Step …
  // when you perform the Evade Action" still yields the +1.
  function clauses(text) {
    return String(text || "").split(/[,.;]|\band\b/i).map(function (s) { return s.trim(); }).filter(Boolean);
  }
  var COND = /\bwhen\b|\bwhile\b|\bif\b|\bvs\.?\b|\bversus\b|\bagainst\b|\bonce per\b|\bper (floor|day|combat|encounter|round|rest|turn)\b|\d+\s*\/\s*(floor|day|combat|encounter|round|rest|turn)/i;

  // Always-on Evade / DR a skill grants at a given Rank: the base desc always applies,
  // plus each Rank 5/10/15 upgrade once its rank is reached (buffs accumulate). This is
  // clause-driven, not gated on the "passive" flag — that flag says whether the skill's
  // CHECK is rolled, not whether a buff it grants is always-on. Active weapon skills
  // (Longsword, Rapier, Quarterstaff…) hand out "+1 Evade Buff" upgrades at high rank,
  // and those are as always-on as Dodge's.
  function skillContribution(sk, rank) {
    var out = { evade: 0, dr: 0 };
    if (!sk) return out;
    var segs = [sk.desc || ""];
    (sk.upgrades || []).forEach(function (u) { if (Number(u.rank) <= rank) segs.push(u.text || ""); });
    segs.forEach(function (seg) {
      clauses(seg).forEach(function (cl) {
        if (COND.test(cl)) return;                       // conditional → not always-on
        var em = cl.match(/\+(\d+)\s*(?:to\s+)?(?:your\s+)?evade\b/i); if (em) out.evade += parseInt(em[1], 10);
        var dm = cl.match(/\+(\d+)\s*(?:to\s+)?(?:your\s+)?(?:DR\b|damage resistance)/i); if (dm) out.dr += parseInt(dm[1], 10);
      });
    });
    return out;
  }

  // Sum contributions over every passive skill row currently on the sheet.
  function desiredTotals() {
    var tot = { evade: 0, dr: 0 };
    [].slice.call(document.querySelectorAll("#skills-body tr")).forEach(function (tr) {
      var ins = tr.querySelectorAll('input[type="text"]');   // [name, rank, checkType, notes]
      if (!ins[0]) return;
      var name = norm(ins[0].value); if (!name) return;
      var src = (tr.dataset && tr.dataset.src) ? tr.dataset.src : "";
      var sk = skillLookup(src) || skillLookup(name);
      if (!sk) return;
      var c = skillContribution(sk, ins[1] ? num(ins[1].value) : 0);
      tot.evade += c.evade; tot.dr += c.dr;
    });
    return tot;
  }

  // Overlay `desired` onto a buff field, reversing whatever this module last put
  // there. A blank field means no hand-entered amount, so stale tracking can't leak
  // a negative — the overlay is simply (re)applied.
  function overlayField(id, desired) {
    var el = document.getElementById(id); if (!el) return;
    var raw = norm(el.value);
    var prev = num(el.dataset.skillContrib || 0);
    var manual = raw === "" ? 0 : (num(el.value) - prev);
    var val = manual + desired;
    el.value = (val === 0 && manual === 0) ? "" : String(val);
    el.dataset.skillContrib = String(desired);
  }

  function refresh() {
    var d = desiredTotals();
    overlayField("evade-buffs", d.evade);
    overlayField("dr-buffs", d.dr);
    try { if (typeof calcEvadeTotal === "function") calcEvadeTotal(); } catch (e) {}
    try { if (typeof calcDR === "function") calcDR(); } catch (e) {}
  }

  // The hand-entered portion of a buff field (value minus this module's overlay),
  // so collectSheet stores the player's own amount and never bakes in the skill
  // contribution — it is recomputed fresh on the next load.
  function manualValue(id) {
    var el = document.getElementById(id); if (!el) return "";
    var raw = norm(el.value); if (raw === "") return "";
    var m = num(el.value) - num(el.dataset.skillContrib || 0);
    return m ? String(m) : "";
  }

  // Clear this module's tracking on a field (used before a load/reset sets a raw value).
  function resetTracking(id) { var el = document.getElementById(id); if (el) el.dataset.skillContrib = "0"; }

  window.DCCSkillBuff = { refresh: refresh, manualValue: manualValue, resetTracking: resetTracking, _contribution: skillContribution };

  // Recompute whenever the skills table changes: input covers name/rank/type edits
  // and picker adds (which fire input); the observer covers row removal (the ✕ button
  // just calls tr.remove(), which fires no input) and bulk clears/restores.
  function wire() {
    var body = document.getElementById("skills-body");
    if (body && !body.dataset.skillBuffWired) {
      body.dataset.skillBuffWired = "1";
      body.addEventListener("input", refresh);
      try { new MutationObserver(function () { refresh(); }).observe(body, { childList: true }); } catch (e) {}
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
})();
