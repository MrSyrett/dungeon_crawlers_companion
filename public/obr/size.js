/* Popover size toggle, shared by the character picker and the sheet itself.
 *
 * Owlbear Rodeo's action popover is sized by the extension, so "desktop mode"
 * is literally a bigger popover: the sheets are already responsive, so widening
 * the frame is what switches them from their phone layout to the full one.
 *
 * Wires up any element carrying [data-vtt-size]. Outside Owlbear Rodeo (opening
 * the sheet URL directly in a tab) there's no popover to resize, so the control
 * hides itself rather than sitting there doing nothing.
 */
(function () {
  var KEY = "dcw_vtt_size";
  // Both character sheets switch layout at 768px, so "mobile" has to sit
  // comfortably below that and "desktop" above it.
  //
  // Desktop has to fit the whole sheet with the roll log open, or the log
  // squeezes the sheet the moment it's opened:
  //   980 sheet + 4 border + 32 wrap padding + 260 roll log + ~10 scrollbar
  //   = 1286px minimum. 1360 leaves room for scrollbar and chrome variation.
  var SIZES = {
    mobile: { w: 460, h: 760 },
    desktop: { w: 1360, h: 920 },
  };

  function current() {
    try {
      return window.localStorage.getItem(KEY) === "desktop" ? "desktop" : "mobile";
    } catch (e) {
      return "mobile";
    }
  }

  function remember(mode) {
    try {
      window.localStorage.setItem(KEY, mode);
    } catch (e) {
      /* partitioned storage may be unavailable; the size still applies now */
    }
  }

  function inOwlbear() {
    return !!(window.OBR && window.OBR.isAvailable);
  }

  function applySize(mode) {
    var s = SIZES[mode] || SIZES.mobile;
    try {
      window.OBR.action.setWidth(s.w);
      window.OBR.action.setHeight(s.h);
    } catch (e) {
      /* ignore — an older host may not support resizing */
    }
  }

  // The control is a switch: it reports the current mode via aria-checked and
  // CSS does the rest. Nothing here writes text, so the markup owns its labels.
  function paint(els, mode) {
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute("aria-checked", mode === "desktop" ? "true" : "false");
      els[i].hidden = false;
    }
  }

  function init() {
    var els = document.querySelectorAll("[data-vtt-size]");
    if (!els.length) return;

    if (!inOwlbear()) {
      // Not framed by Owlbear Rodeo — nothing to resize.
      for (var i = 0; i < els.length; i++) els[i].hidden = true;
      return;
    }

    window.OBR.onReady(function () {
      var mode = current();
      applySize(mode); // restore the last choice on every open
      paint(els, mode);

      for (var j = 0; j < els.length; j++) {
        els[j].addEventListener("click", function () {
          mode = mode === "desktop" ? "mobile" : "desktop";
          remember(mode);
          applySize(mode);
          paint(els, mode);
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
