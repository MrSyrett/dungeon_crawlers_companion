// ══ Star Wars d6 plug-in ═══════════════════════════════════════════════════
// Hyperspace jumps (the Travel module): the hyperdrive multiplier and days cut or
// added feed the registry's jump calculator (TRAVEL.SW: time and Astrogation
// difficulty). Difficulty boxes on encounters and hazards come from EXTRA.SW.
PLUG.travel.fields = function(data){
  const M = ['x1/2', 'x1', 'x2', 'x3', 'x4'], cur = data.mult || 'x1';
  return '<div class="field-row2 field-group"><div><label class="field-label">Hyperdrive</label><select class="ui-select tv-mult" onchange="autosave()">' + M.map(m => '<option' + (m === cur ? ' selected' : '') + '>' + m + '</option>').join('') + '</select></div>'
    + '<div><label class="field-label" title="Days cut from the standard duration (+1 difficulty each); a negative number adds days (−1 each)">Days cut (−added)</label><input type="number" class="tv-cut" value="' + escA(String(data.cut || '')) + '" placeholder="0" oninput="autosave()"></div></div>';
};
PLUG.travel.read = c => ({ mult: c.querySelector('.tv-mult')?.value || 'x1', cut: c.querySelector('.tv-cut')?.value || '' });
PLUG.travel.mishapLabel = '';
