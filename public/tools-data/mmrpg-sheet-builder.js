// Marvel Multiverse RPG character builder — the "Create" button on the sheet.
// Point-buy the six abilities (budget 5×rank, cap 3+rank, min −3), pick a rank,
// origin and occupation, then hand a fresh character to applySheet(). Powers,
// traits and tags are added on the sheet via its pickers. Uses sheet globals:
// MMRPG_ORIGINS/OCCUPATIONS, ABILITIES, applySheet, saveSheet, addLog, esc, $.
(function () {
  'use strict';
  var W = (typeof window !== 'undefined') ? window : {};
  function OR() { return Array.isArray(W.MMRPG_ORIGINS) ? W.MMRPG_ORIGINS : []; }
  function OC() { return Array.isArray(W.MMRPG_OCCUPATIONS) ? W.MMRPG_OCCUPATIONS : []; }
  var ABIL = (typeof ABILITIES !== 'undefined') ? ABILITIES : [
    {key:'melee',name:'Melee'},{key:'agility',name:'Agility'},{key:'resilience',name:'Resilience'},
    {key:'vigilance',name:'Vigilance'},{key:'ego',name:'Ego'},{key:'logic',name:'Logic'}];
  var rank = 1, name = '', origin = '', occupation = '';
  var scores = { melee:0, agility:0, resilience:0, vigilance:0, ego:0, logic:0 };
  function budget() { return 5 * rank; }
  function cap() { return 3 + rank; }
  function spent() { var n = 0; ABIL.forEach(function (a) { n += scores[a.key]; }); return n; }
  var ov;
  function ensure() {
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'mmrpgb-overlay'; ov.className = 'ov';
    ov.onclick = function (e) { if (e.target === ov) W.MMRPGB.close(); };
    ov.innerHTML = '<div class="modal wide"><div class="modal-hd"><div class="ttl">✦ Build a Hero</div><button class="x" onclick="window.MMRPGB.close()">✕</button></div><div class="modal-bd" id="mmrpgb-body"></div></div>';
    document.body.appendChild(ov);
  }
  function opt(list, cur) { return '<option value="">—</option>' + list.map(function (o) { return '<option value="' + esc(o.name) + '"' + (cur === o.name ? ' selected' : '') + '>' + esc(o.name) + '</option>'; }).join(''); }
  function stepper(a) {
    var v = scores[a.key];
    return '<div style="display:flex;align-items:center;gap:10px;padding:4px 0;"><span style="flex:1;font-family:\'Oswald\',sans-serif;font-weight:600;">' + esc(a.name) + '</span>'
      + '<button class="m-btn ghost" style="padding:4px 10px;" onclick="window.MMRPGB.adj(\'' + a.key + '\',-1)"' + (v <= -3 ? ' disabled' : '') + '>−</button>'
      + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:18px;color:#f4a6a8;min-width:34px;text-align:center;">' + (v >= 0 ? '+' : '') + v + '</span>'
      + '<button class="m-btn ghost" style="padding:4px 10px;" onclick="window.MMRPGB.adj(\'' + a.key + '\',1)"' + (v >= cap() ? ' disabled' : '') + '>+</button></div>';
  }
  function render() {
    ensure();
    var left = budget() - spent();
    var oc = OR().filter(function (o) { return o.name === origin; })[0];
    var h = '<p class="m-hint">Pick a rank, spend <b style="color:#f4a6a8;">' + budget() + '</b> ability points (cap +' + cap() + ', min −3; lowering a score below 0 refunds points), and choose an origin &amp; occupation. Add powers, traits &amp; tags on the sheet — you get <b>' + (4 * rank) + ' powers</b> and <b>' + rank + ' extra trait' + (rank === 1 ? '' : 's') + '</b> at Rank ' + rank + '.</p>';
    h += '<div class="m-hint" style="margin:0 0 6px;"><b>Codename</b></div><input class="m-input" id="mmrpgb-name" value="' + esc(name) + '" placeholder="Hero name" oninput="window.MMRPGB.setName(this.value)">';
    h += '<div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap;">'
      + '<div style="flex:1;min-width:120px;"><div class="m-hint" style="margin:0 0 4px;"><b>Rank</b></div><select class="m-input" id="mmrpgb-rank" onchange="window.MMRPGB.setRank(this.value)">' + [1,2,3,4,5,6].map(function (r) { return '<option value="' + r + '"' + (rank === r ? ' selected' : '') + '>Rank ' + r + '</option>'; }).join('') + '</select></div>'
      + '<div style="flex:2;min-width:160px;"><div class="m-hint" style="margin:0 0 4px;"><b>Origin</b></div><select class="m-input" id="mmrpgb-origin" onchange="window.MMRPGB.setOrigin(this.value)">' + opt(OR(), origin) + '</select></div>'
      + '<div style="flex:2;min-width:160px;"><div class="m-hint" style="margin:0 0 4px;"><b>Occupation</b></div><select class="m-input" id="mmrpgb-occ" onchange="window.MMRPGB.setOcc(this.value)">' + opt(OC(), occupation) + '</select></div></div>';
    if (oc && (oc.tags || oc.traits)) h += '<p class="m-hint" style="margin:8px 0 0;">' + (oc.tags ? '<b>Tags:</b> ' + esc(oc.tags) + ' ' : '') + (oc.traits ? '<b>Traits:</b> ' + esc(oc.traits) : '') + '</p>';
    h += '<div class="m-hint" style="margin:14px 0 4px;"><b>Abilities</b> — <span style="color:' + (left < 0 ? '#df8a8a' : '#f4a6a8') + ';">' + left + ' point' + (left === 1 ? '' : 's') + ' left</span></div>';
    h += ABIL.map(stepper).join('');
    var ready = left >= 0;
    h += '<div style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px;"><button class="m-btn ghost" onclick="window.MMRPGB.close()">Cancel</button><button class="m-btn" onclick="window.MMRPGB.apply()"' + (ready ? '' : ' disabled') + '>Apply</button></div>';
    document.getElementById('mmrpgb-body').innerHTML = h;
  }
  W.MMRPGB = {
    launch: function () {
      try {
        if (typeof S !== 'undefined' && S) {
          rank = Math.max(1, Math.min(6, parseInt(S.rank, 10) || 1)); name = S.name || ''; origin = S.origin || ''; occupation = S.occupation || '';
          ABIL.forEach(function (a) { scores[a.key] = (S.abilities && S.abilities[a.key] != null) ? parseInt(S.abilities[a.key], 10) || 0 : 0; });
        }
      } catch (e) {}
      ensure(); render(); ov.classList.add('open');
    },
    close: function () { if (ov) ov.classList.remove('open'); },
    setName: function (v) { name = v; },
    setRank: function (v) { rank = Math.max(1, Math.min(6, parseInt(v, 10) || 1)); ABIL.forEach(function (a) { if (scores[a.key] > cap()) scores[a.key] = cap(); }); render(); },
    setOrigin: function (v) { origin = v; render(); },
    setOcc: function (v) { occupation = v; render(); },
    adj: function (k, d) { var nv = scores[k] + d; if (nv < -3 || nv > cap()) return; scores[k] = nv; render(); },
    apply: function () {
      var d = { name: name, rank: rank, origin: origin, occupation: occupation, abilities: {} };
      ABIL.forEach(function (a) { d.abilities[a.key] = scores[a.key]; });
      d.health = { cur: Math.max(10, scores.resilience * 30), max: Math.max(10, scores.resilience * 30) };
      d.focus = { cur: Math.max(10, scores.vigilance * 30), max: Math.max(10, scores.vigilance * 30) };
      d.karma = { cur: rank, max: rank };
      try { applySheet(d); } catch (e) {}
      this.close();
      try { addLog('Hero Built', name || 'Unnamed', 'Rank ' + rank + (origin ? ' · ' + origin : ''), 'crit'); } catch (e) {}
      try { saveSheet(true); } catch (e) {}
    }
  };
})();
