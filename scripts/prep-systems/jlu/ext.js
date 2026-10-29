// ══ JLU plug-in ═════════════════════════════════════════════════════════════
// The crisis track (registry SECTIONS.JLU) gets a roll on the Crisis table
// (/tools-data/jlu-crisis.js) that adds a line to the stakes.
PLUG.sectionTools = function(){
  const box = document.querySelector('.sys-sec-tools[data-key="crisis"]'); if(!box) return;
  box.innerHTML = '<button class="btn-add btn-roll" onclick="jluRollCrisis()">🎲 Roll a crisis (d20)</button>';
};
function jluRollCrisis(){
  const T = (typeof JLU_CRISIS !== 'undefined' && Array.isArray(JLU_CRISIS)) ? JLU_CRISIS : []; if(!T.length) return;
  const n = 1 + Math.floor(Math.random() * 20), r = T.find(x => +x.roll === n) || T[n % T.length];
  _appendLine(document.querySelector('.sys-sec[data-key="crisis"] .sx-in[data-k="stakes"]'), r.name + ' ' + r.effect + ' (d20 ' + n + ')');
}
