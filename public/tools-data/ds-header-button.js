/* DarkSpace — Create / Level header-button routing.
   Loaded AFTER sd-sheet-levelup.js in the DarkSpace sheet, this overrides the
   shared (Shadowdark-only) updateHeaderButton so the header button launches the
   DarkSpace builder and DarkSpace level-up. Keeping this here — rather than in
   the shared sd-sheet-levelup.js — means the Shadowdark engine carries no
   DarkSpace code, so the two systems stay fully separate. */
(function(){
'use strict';
function updateHeaderButtonDS(){
  var btn = document.getElementById('hdr-create-btn');
  if(!btn) return;
  var nameEl = document.getElementById('f-name'), classEl = document.getElementById('f-class');
  var hasChar = (nameEl && nameEl.value.trim()) && (classEl && classEl.value.trim());
  if(hasChar){
    btn.textContent = 'Level'; btn.title = 'Level up'; btn.setAttribute('aria-label', 'Level up');
    btn.onclick = (typeof startDarkSpaceLevelUp === 'function') ? startDarkSpaceLevelUp
                : (typeof startLevelUp === 'function' ? startLevelUp : null);
  } else {
    btn.textContent = 'Create'; btn.title = 'Create character'; btn.setAttribute('aria-label', 'Create character');
    btn.onclick = (typeof startDarkSpaceWizard === 'function') ? startDarkSpaceWizard
                : (typeof startCharWizard === 'function' ? startCharWizard : null);
  }
}
// Replace the shared implementation (the levelup file's listeners call it via window).
window.updateHeaderButton = updateHeaderButtonDS;
try { updateHeaderButtonDS(); } catch(e){}
})();
