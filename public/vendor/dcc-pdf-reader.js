/* Dungeon Crawler's Companion — unified PDF reader (eReader style)
   ------------------------------------------------------------------
   One shared implementation used by BOTH the Rulebook Compendium (/rules) and
   the GM Screen rules tool, so PDF viewing looks and works the same everywhere.

   Features:
     • PDF.js canvas rendering — fit-to-width by default, DPR-aware, single
       render queue so rapid page flips never pile up.
     • Collapsible Chapters panel built from the PDF's own outline/bookmarks;
       click a chapter to jump to its page. Auto-disabled when a PDF has none.
     • Snap paging (one page at a time): wheel / swipe / arrow keys flip pages.
     • Zoom with ctrl/⌘+scroll or pinch; the −/+/Fit buttons; drag (mouse or
       one finger) to pan when a page is zoomed past the viewport.
     • Per-document page memory is delegated to the host via onPage + startPage,
       so the Compendium (localStorage) and the GM Screen (board save) each
       persist position their own way.

   API:
     const reader = window.DCCPdfReader.create(containerEl, {
       pdfjsLib,              // default window.pdfjsLib
       workerSrc,             // default /vendor/pdfjs/pdf.worker.min.js
       onPage(docKey, page),  // called whenever the current page changes
     });
     reader.load({ url, docKey, title, startPage });  // open a book
     reader.setPage(n); reader.getPage();
     reader.refresh();           // re-read the current document from the server
     reader.dropCache(docKey?);  // forget cached parsed docs (all if omitted)
     reader.relayout();          // re-fit after a container resize
     reader.destroy();
*/
(function () {
  if (window.DCCPdfReader) return;

  var STYLE_ID = "dccpdf-styles";
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css =
      ".dccpdf{display:flex;flex-direction:column;flex:1 1 auto;min-height:0;height:100%;position:relative;background:var(--dccpdf-stage,#111);color:var(--text,var(--white,#e5e7eb));overflow:hidden}" +
      ".dccpdf *{box-sizing:border-box}" +
      ".dccpdf-books{display:flex;gap:4px;overflow-x:auto;padding:6px 8px;background:var(--panel,#1a1d24);border-bottom:1px solid var(--border,#2a2f3a);flex-shrink:0;scrollbar-width:thin;scrollbar-color:var(--accent,var(--gold,#d8b45a)) transparent}" +
      ".dccpdf-books:empty{display:none}" +
      ".dccpdf-books::-webkit-scrollbar{height:8px}" +
      ".dccpdf-books::-webkit-scrollbar-track{background:transparent}" +
      ".dccpdf-books::-webkit-scrollbar-thumb{background:var(--border,#2a2f3a);border-radius:999px}" +
      ".dccpdf-books:hover::-webkit-scrollbar-thumb{background:var(--accent,var(--gold,#d8b45a))}" +
      ".dccpdf-booktab{flex-shrink:0;white-space:nowrap;padding:5px 10px;border-radius:6px;background:var(--panel-2,#22262f);border:1px solid var(--border,#2a2f3a);color:var(--muted,#8a93a3);font:700 10.5px/1 'Barlow Condensed','Montserrat',system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}" +
      ".dccpdf-booktab:hover{color:var(--text,var(--white,#fff));border-color:var(--accent,var(--gold,#d8b45a))}" +
      ".dccpdf-booktab.is-active{background:var(--gold,#d8b45a);color:#1a1a1a;border-color:var(--gold,#d8b45a)}" +
      ".dccpdf-empty{flex:1;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:24px;color:var(--muted,#8a93a3);font:500 13px/1.5 'Barlow','Montserrat',system-ui,sans-serif}" +
      ".dccpdf-toolbar{display:flex;align-items:center;gap:6px;padding:5px 8px;background:var(--panel,#1a1d24);border-bottom:1px solid var(--border,#2a2f3a);flex-shrink:0;flex-wrap:wrap}" +
      ".dccpdf-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-width:30px;height:28px;padding:0 9px;border-radius:6px;background:var(--panel-2,#22262f);border:1px solid var(--border,#2a2f3a);color:var(--text,var(--white,#e5e7eb));font:700 12px/1 'Barlow Condensed','Montserrat',system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;white-space:nowrap}" +
      ".dccpdf-btn:hover{border-color:var(--accent,var(--gold,#d8b45a));color:var(--white,#fff)}" +
      ".dccpdf-btn:disabled,.dccpdf-btn.is-disabled{opacity:.4;cursor:default;pointer-events:none}" +
      ".dccpdf-toc-toggle.is-on{background:var(--gold,#d8b45a);color:#1a1a1a;border-color:var(--gold,#d8b45a)}" +
      ".dccpdf-ind{display:inline-flex;align-items:center;gap:4px;font:600 11px/1 'Share Tech Mono',monospace;color:var(--muted,#8a93a3)}" +
      ".dccpdf-inp{width:46px;height:26px;text-align:center;background:var(--panel-2,#22262f);border:1px solid var(--border,#2a2f3a);color:var(--text,var(--white,#e5e7eb));border-radius:5px;font:600 11px/1 'Share Tech Mono',monospace;outline:none}" +
      ".dccpdf-inp:focus{border-color:var(--gold,#d8b45a)}" +
      ".dccpdf-sp{flex:1}" +
      ".dccpdf-body{flex:1;display:flex;min-height:0;position:relative;overflow:hidden}" +
      ".dccpdf-toc{flex:0 0 0;width:0;overflow:hidden;background:var(--panel,#1a1d24);border-right:1px solid var(--border,#2a2f3a);transition:width .18s ease,flex-basis .18s ease;display:flex;flex-direction:column}" +
      ".dccpdf.dccpdf-toc-open .dccpdf-toc{flex-basis:264px;width:264px}" +
      ".dccpdf-toc-head{flex-shrink:0;padding:9px 12px;font:800 11px/1 'Barlow Condensed','Montserrat',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--gold,#d8b45a);border-bottom:1px solid var(--border,#2a2f3a)}" +
      ".dccpdf-toc-list{flex:1;overflow-y:auto;padding:6px 4px}" +
      ".dccpdf-toc-link{display:block;width:100%;text-align:left;background:transparent;border:none;border-radius:5px;color:var(--text,#cdd3dd);font:500 12.5px/1.35 'Barlow','Montserrat',system-ui,sans-serif;padding:6px 8px;cursor:pointer}" +
      ".dccpdf-toc-link:hover{background:var(--panel-2,#22262f);color:var(--white,#fff)}" +
      ".dccpdf-toc-link.is-current{background:var(--panel-2,#22262f);color:var(--gold,#d8b45a)}" +
      ".dccpdf-toc-empty{padding:12px;color:var(--muted,#8a93a3);font:500 12px/1.4 'Barlow','Montserrat',sans-serif}" +
      ".dccpdf-toc-backdrop{display:none;position:absolute;inset:0;z-index:5;background:rgba(0,0,0,.5)}" +
      ".dccpdf-stage{flex:1;min-width:0;overflow:auto;padding:14px;outline:none;-webkit-overflow-scrolling:touch;touch-action:none;position:relative}" +
      ".dccpdf-stage.is-pannable{cursor:grab}" +
      ".dccpdf-stage.is-grabbing{cursor:grabbing}" +
      ".dccpdf-wrap{width:max-content;margin:0 auto;will-change:transform,opacity}" +
      ".dccpdf-canvas{display:block;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.5)}" +
      ".dccpdf-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;color:var(--muted,#8a93a3);font:500 13px/1.5 'Barlow','Montserrat',system-ui,sans-serif;background:var(--dccpdf-stage,#111)}" +
      "@media (max-width:720px){" +
      ".dccpdf-toc{position:absolute;z-index:6;top:0;bottom:0;left:0;width:0;box-shadow:0 0 30px rgba(0,0,0,.6)}" +
      ".dccpdf.dccpdf-toc-open .dccpdf-toc{width:min(82%,290px);flex-basis:auto}" +
      ".dccpdf.dccpdf-toc-open .dccpdf-toc-backdrop{display:block}" +
      "}";
    var el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function create(container, opts) {
    opts = opts || {};
    injectStyles();
    var pdfjsLib = opts.pdfjsLib || window.pdfjsLib;
    var workerSrc = opts.workerSrc || "/vendor/pdfjs/pdf.worker.min.js";
    var showOpen = !!opts.showOpenInNew;   // "New tab" link in the toolbar
    var showDl = !!opts.showDownload;      // "Download" link in the toolbar
    var getStart = typeof opts.getStartPage === "function" ? opts.getStartPage : null;
    var onActive = typeof opts.onActiveBook === "function" ? opts.onActiveBook : null;
    var emptyText = opts.emptyText || "No rulebooks found.";
    if (pdfjsLib && pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
      try { pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc; } catch (e) {}
    }

    // ── state ────────────────────────────────────────────────────────────────
    var docCache = new Map();   // docKey → parsed PDF.js document
    var pdfDoc = null, lastBook = null;
    var docKey = "", pageNum = 1, pageCount = 0;
    var userScale = 0;          // 0 = fit-width; otherwise an absolute PDF scale
    var fitScale = 1;           // last computed fit scale, for zoom math
    var renderSeq = 0, rendering = 0, queued = 0;
    var pendingScroll = null;   // 'top' | 'bottom' after a render
    var pendingRatio = null;    // vertical scroll ratio to keep across a zoom
    var tocAvailable = false, tocOpen = false;
    var lastFlip = 0;
    var wheelAccum = 0;
    var books = [], activeFile = "";   // the tab bar's book list + current book

    // ── DOM ──────────────────────────────────────────────────────────────────
    container.classList.add("dccpdf");
    container.innerHTML =
      '<div class="dccpdf-books"></div>' +
      '<div class="dccpdf-toolbar">' +
        '<button class="dccpdf-btn dccpdf-toc-toggle" type="button" title="Chapters" aria-label="Chapters">☰</button>' +
        '<span class="dccpdf-ind">Page <input class="dccpdf-inp" type="text" inputmode="numeric" value="1" aria-label="Page number"> / <span class="dccpdf-tot">–</span></span>' +
        '<span class="dccpdf-sp"></span>' +
        '<a class="dccpdf-btn dccpdf-open" target="_blank" rel="noreferrer" title="Open in a new tab" aria-label="Open in a new tab" style="display:none;text-decoration:none">New tab</a>' +
        '<a class="dccpdf-btn dccpdf-dl" title="Download the PDF" aria-label="Download the PDF" style="display:none;text-decoration:none">Download</a>' +
        '<button class="dccpdf-btn dccpdf-zoomfit" type="button" title="Fit the whole page" aria-label="Fit the whole page">Fit</button>' +
      '</div>' +
      '<div class="dccpdf-body">' +
        '<aside class="dccpdf-toc" aria-label="Chapters"><div class="dccpdf-toc-head">Chapters</div><div class="dccpdf-toc-list"></div></aside>' +
        '<div class="dccpdf-toc-backdrop"></div>' +
        '<div class="dccpdf-stage" tabindex="0">' +
          '<div class="dccpdf-wrap"><canvas class="dccpdf-canvas"></canvas></div>' +
          '<div class="dccpdf-msg" style="display:none"></div>' +
        '</div>' +
      '</div>' +
      '<div class="dccpdf-empty"></div>';

    var booksBar = container.querySelector(".dccpdf-books");
    var toolbarEl = container.querySelector(".dccpdf-toolbar");
    var bodyEl = container.querySelector(".dccpdf-body");
    var emptyEl = container.querySelector(".dccpdf-empty");
    var tocToggle = container.querySelector(".dccpdf-toc-toggle");
    var pageInp = container.querySelector(".dccpdf-inp");
    var openLink = container.querySelector(".dccpdf-open");
    var dlLink = container.querySelector(".dccpdf-dl");
    var pageTot = container.querySelector(".dccpdf-tot");
    var tocEl = container.querySelector(".dccpdf-toc");
    var tocList = container.querySelector(".dccpdf-toc-list");
    var tocBackdrop = container.querySelector(".dccpdf-toc-backdrop");
    var stage = container.querySelector(".dccpdf-stage");
    var wrap = container.querySelector(".dccpdf-wrap");
    var canvas = container.querySelector(".dccpdf-canvas");
    var msg = container.querySelector(".dccpdf-msg");

    function showMsg(text) { msg.textContent = text || ""; msg.style.display = text ? "flex" : "none"; }
    function effScale() { return userScale > 0 ? userScale : fitScale; }
    function emitPage() { if (opts.onPage) { try { opts.onPage(docKey, pageNum); } catch (e) {} } }

    function updateNav() {
      pageInp.value = pageNum;
      pageTot.textContent = pageCount || "–";
    }

    function setPannable() {
      var over = stage.scrollHeight - stage.clientHeight > 2 || stage.scrollWidth - stage.clientWidth > 2;
      stage.classList.toggle("is-pannable", over);
    }

    function ensureCanvas() {
      if (!wrap.contains(canvas)) {
        canvas = document.createElement("canvas");
        canvas.className = "dccpdf-canvas";
        wrap.innerHTML = "";
        wrap.appendChild(canvas);
      }
    }

    function animateFlip(dir) {
      if (!dir) return;
      wrap.style.transition = "none";
      wrap.style.opacity = "0.35";
      wrap.style.transform = "translateX(" + (dir > 0 ? 20 : -20) + "px)";
      void wrap.offsetWidth; // reflow
      wrap.style.transition = "opacity .16s ease, transform .16s ease";
      wrap.style.opacity = "1";
      wrap.style.transform = "translateX(0)";
    }

    function render(n, dir) {
      if (!pdfDoc) return;
      ensureCanvas();
      if (rendering) { queued = n; return; }
      rendering = n;
      var myseq = renderSeq;
      pdfDoc.getPage(n).then(function (page) {
        if (myseq !== renderSeq) { rendering = 0; return; }
        var dpr = window.devicePixelRatio || 1;
        var availW = Math.max(120, (stage.clientWidth || 600) - 28);
        var availH = Math.max(120, (stage.clientHeight || 600) - 28);
        var base = page.getViewport({ scale: 1 });
        // "Fit" shows the WHOLE page — bounded by both width and height — so a page
        // sits cleanly on screen with no scrolling. This is the default view.
        fitScale = Math.min(availW / base.width, availH / base.height);
        // Never render smaller than fit-to-page — that's the zoomed-out floor.
        var scale = (userScale > 0 ? Math.max(userScale, fitScale) : fitScale) * dpr;
        var vp = page.getViewport({ scale: scale });
        var ctx = canvas.getContext("2d");
        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        canvas.style.width = Math.floor(vp.width / dpr) + "px";
        canvas.style.height = Math.floor(vp.height / dpr) + "px";
        page.render({ canvasContext: ctx, viewport: vp }).promise.then(function () {
          canvas.dataset.page = String(n);
          // restore / set scroll position for this render
          if (pendingRatio != null) {
            stage.scrollTop = clamp(pendingRatio * stage.scrollHeight - stage.clientHeight / 2, 0, stage.scrollHeight);
            stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
            pendingRatio = null;
          } else if (pendingScroll) {
            stage.scrollTop = pendingScroll === "bottom" ? stage.scrollHeight : 0;
            stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
            pendingScroll = null;
          }
          setPannable();
          animateFlip(dir);
          rendering = 0;
          if (queued && queued !== n) { var q = queued; queued = 0; render(q); }
          else queued = 0;
        }).catch(function () { rendering = 0; });
      }).catch(function () { rendering = 0; });
    }

    function setPage(n, dir, scrollTo) {
      if (!pdfDoc) return;
      n = clamp(n || 1, 1, pageCount);
      pageNum = n;
      pendingScroll = scrollTo || "top";
      updateNav();
      highlightToc();
      render(n, dir || 0);
      emitPage();
    }

    function flip(dir) {
      var now = Date.now();
      if (now - lastFlip < 260) return;
      if ((dir < 0 && pageNum <= 1) || (dir > 0 && pageNum >= pageCount)) return;
      lastFlip = now;
      wheelAccum = 0;
      setPage(pageNum + dir, dir, dir < 0 ? "bottom" : "top");
    }

    function setZoom(scale) { userScale = scale > 0 ? scale : 0; pendingScroll = "top"; render(pageNum, 0); }
    function zoomBy(f) {
      var ratio = stage.scrollHeight ? (stage.scrollTop + stage.clientHeight / 2) / stage.scrollHeight : 0;
      // Floor at fit-to-page so you can't zoom out past the default view.
      userScale = clamp(effScale() * f, fitScale, 6);
      pendingRatio = ratio;
      render(pageNum, 0);
    }

    // ── chapters / outline ─────────────────────────────────────────────────────
    var tocEntries = []; // { link, dest, page(null until resolved) }
    function setTocOpen(open) {
      tocOpen = !!open && tocAvailable;
      container.classList.toggle("dccpdf-toc-open", tocOpen);
      tocToggle.classList.toggle("is-on", tocOpen);
      tocToggle.setAttribute("aria-expanded", tocOpen ? "true" : "false");
    }
    function highlightToc() {
      if (!tocEntries.length) return;
      var best = null;
      for (var i = 0; i < tocEntries.length; i++) {
        var e = tocEntries[i];
        if (e.page != null && e.page <= pageNum) best = e;
      }
      tocEntries.forEach(function (e) { e.link.classList.toggle("is-current", e === best); });
    }
    function resolveDest(dest) {
      try {
        var pr = typeof dest === "string" ? pdfDoc.getDestination(dest) : Promise.resolve(dest);
        return pr.then(function (explicit) {
          if (!Array.isArray(explicit) || !explicit.length) return null;
          var ref = explicit[0];
          if (ref && typeof ref === "object") return pdfDoc.getPageIndex(ref).then(function (ix) { return ix + 1; });
          if (typeof ref === "number") return ref + 1;
          return null;
        });
      } catch (e) { return Promise.resolve(null); }
    }
    function buildToc() {
      tocList.innerHTML = "";
      tocEntries = [];
      var mySeq = renderSeq;
      var outlinePromise;
      try { outlinePromise = pdfDoc.getOutline(); } catch (e) { outlinePromise = Promise.resolve(null); }
      outlinePromise.then(function (outline) {
        if (mySeq !== renderSeq) return;
        if (!outline || !outline.length) {
          tocAvailable = false;
          tocToggle.disabled = true;
          tocToggle.classList.add("is-disabled");
          setTocOpen(false);
          tocList.innerHTML = '<div class="dccpdf-toc-empty">This PDF has no embedded chapters.</div>';
          return;
        }
        tocAvailable = true;
        tocToggle.disabled = false;
        tocToggle.classList.remove("is-disabled");
        var frag = document.createDocumentFragment();
        (function add(items, depth) {
          items.forEach(function (it) {
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "dccpdf-toc-link";
            btn.style.paddingLeft = (8 + depth * 14) + "px";
            btn.textContent = it.title || "(untitled)";
            var entry = { link: btn, dest: it.dest, page: null };
            tocEntries.push(entry);
            btn.addEventListener("click", function () {
              resolveDest(it.dest).then(function (p) {
                if (p) { setPage(p, 0, "top"); if (isNarrow()) setTocOpen(false); }
              });
            });
            frag.appendChild(btn);
            if (it.items && it.items.length) add(it.items, depth + 1);
          });
        })(outline, 0);
        tocList.appendChild(frag);
        // Resolve destinations in the background so we can highlight the current
        // chapter (best-effort; never blocks navigation).
        tocEntries.forEach(function (e) {
          resolveDest(e.dest).then(function (p) { if (mySeq === renderSeq) { e.page = p; highlightToc(); } });
        });
      }).catch(function () {
        tocAvailable = false;
        tocToggle.disabled = true;
        tocToggle.classList.add("is-disabled");
      });
    }

    function isNarrow() {
      return window.matchMedia && window.matchMedia("(max-width:720px)").matches;
    }

    // ── wiring: book tabs ────────────────────────────────────────────────────
    emptyEl.textContent = emptyText;
    booksBar.addEventListener("click", function (e) {
      var t = e.target && e.target.closest ? e.target.closest(".dccpdf-booktab") : null;
      if (!t) return;
      var f = t.getAttribute("data-file");
      if (f && f !== activeFile) openBook(f);
    });

    // ── wiring: toolbar ────────────────────────────────────────────────────────
    tocToggle.addEventListener("click", function () { if (tocAvailable) setTocOpen(!tocOpen); });
    tocBackdrop.addEventListener("click", function () { setTocOpen(false); });
    pageInp.addEventListener("change", function () {
      var n = parseInt(pageInp.value, 10);
      if (n) setPage(n, 0, "top"); else pageInp.value = pageNum;
    });
    container.querySelector(".dccpdf-zoomfit").addEventListener("click", function () { setZoom(0); });

    // ── wiring: keyboard ─────────────────────────────────────────────────────
    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "PageDown") { flip(1); e.preventDefault(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { flip(-1); e.preventDefault(); }
      else if (e.key === "Home") { setPage(1, -1, "top"); e.preventDefault(); }
      else if (e.key === "End") { setPage(pageCount, 1, "top"); e.preventDefault(); }
      else if (e.key === "+" || e.key === "=") { zoomBy(1.15); e.preventDefault(); }
      else if (e.key === "-" || e.key === "_") { zoomBy(1 / 1.15); e.preventDefault(); }
    });

    // ── wiring: wheel (flip / pan-edge / ctrl-zoom) ──────────────────────────
    stage.addEventListener("wheel", function (e) {
      if (!pdfDoc) return;
      if (e.ctrlKey || e.metaKey) { e.preventDefault(); zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12); return; }
      var overflowY = stage.scrollHeight - stage.clientHeight > 2;
      if (overflowY) {
        var atTop = stage.scrollTop <= 0;
        var atBottom = stage.scrollTop + stage.clientHeight >= stage.scrollHeight - 1;
        if (e.deltaY > 0 && atBottom) { e.preventDefault(); flip(1); }
        else if (e.deltaY < 0 && atTop) { e.preventDefault(); flip(-1); }
        // otherwise let the browser scroll (pan) the zoomed page
      } else {
        e.preventDefault();
        if ((wheelAccum > 0) !== (e.deltaY > 0)) wheelAccum = 0; // direction change
        wheelAccum += e.deltaY;
        if (Math.abs(wheelAccum) > 36) flip(wheelAccum > 0 ? 1 : -1);
      }
    }, { passive: false });

    // ── wiring: mouse drag to pan ────────────────────────────────────────────
    var drag = { active: false, x: 0, y: 0, sl: 0, st: 0 };
    stage.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return; // touch handled separately
      var over = stage.scrollHeight - stage.clientHeight > 2 || stage.scrollWidth - stage.clientWidth > 2;
      if (!over) return;
      drag.active = true; drag.x = e.clientX; drag.y = e.clientY; drag.sl = stage.scrollLeft; drag.st = stage.scrollTop;
      stage.classList.add("is-grabbing");
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    });
    stage.addEventListener("pointermove", function (e) {
      if (!drag.active) return;
      stage.scrollLeft = drag.sl - (e.clientX - drag.x);
      stage.scrollTop = drag.st - (e.clientY - drag.y);
    });
    function endDrag(e) {
      if (!drag.active) return;
      drag.active = false; stage.classList.remove("is-grabbing");
      try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    // ── wiring: touch (pan / swipe-flip / pinch-zoom) ────────────────────────
    var tc = { mode: "", sx: 0, sy: 0, sl: 0, st: 0, panned: false, d0: 0, s0: 1 };
    function touchDist(t) {
      var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY;
      return Math.hypot(dx, dy);
    }
    stage.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) {
        tc.mode = "pinch"; tc.d0 = touchDist(e.touches); tc.s0 = effScale();
      } else if (e.touches.length === 1) {
        tc.mode = "one"; tc.panned = false;
        tc.sx = e.touches[0].clientX; tc.sy = e.touches[0].clientY;
        tc.sl = stage.scrollLeft; tc.st = stage.scrollTop;
      }
    }, { passive: false });
    stage.addEventListener("touchmove", function (e) {
      if (tc.mode === "pinch" && e.touches.length === 2) {
        e.preventDefault();
        var d = touchDist(e.touches);
        if (tc.d0 > 0) { userScale = clamp(tc.s0 * (d / tc.d0), fitScale, 6); render(pageNum, 0); }
        return;
      }
      if (tc.mode === "one" && e.touches.length === 1) {
        var t = e.touches[0], dx = t.clientX - tc.sx, dy = t.clientY - tc.sy;
        var over = stage.scrollHeight - stage.clientHeight > 2 || stage.scrollWidth - stage.clientWidth > 2;
        if (over) {
          e.preventDefault();
          stage.scrollLeft = tc.sl - dx;
          stage.scrollTop = tc.st - dy;
          tc.panned = true;
        } else if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          // not overflowing → this is a swipe; keep the page from rubber-banding
          e.preventDefault();
        }
      }
    }, { passive: false });
    stage.addEventListener("touchend", function (e) {
      if (tc.mode === "one" && !tc.panned) {
        var t = (e.changedTouches && e.changedTouches[0]) || null;
        if (t) {
          var dx = t.clientX - tc.sx, dy = t.clientY - tc.sy;
          if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) flip(dx < 0 ? 1 : -1);
          else if (Math.abs(dy) > 52 && Math.abs(dy) > Math.abs(dx)) flip(dy < 0 ? 1 : -1);
        }
      }
      tc.mode = "";
    });

    // ── container resize → re-fit ────────────────────────────────────────────
    var ro = null, roT = 0;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(function () {
        clearTimeout(roT);
        roT = setTimeout(function () { if (pdfDoc) render(pageNum, 0); }, 120);
      });
      try { ro.observe(stage); } catch (e) {}
    }

    // ── public: load a book ──────────────────────────────────────────────────
    function load(book) {
      book = book || {};
      lastBook = book;
      var url = book.url;
      var key = book.docKey || book.file || url || "";
      var start = book.startPage || 1;
      if (!pdfjsLib) { showMsg("PDF reader is still loading… give it a moment."); return Promise.resolve(); }
      renderSeq++;
      var mySeq = renderSeq;
      docKey = key; userScale = 0; pdfDoc = null;
      // Point the toolbar's New tab / Download links at this book.
      if (openLink) { openLink.href = url || "#"; openLink.style.display = (showOpen && url) ? "" : "none"; }
      if (dlLink) {
        dlLink.href = url || "#";
        dlLink.setAttribute("download", book.downloadName || "");
        dlLink.style.display = (showDl && url) ? "" : "none";
      }
      setTocOpen(false);
      tocAvailable = false; tocToggle.disabled = true; tocToggle.classList.add("is-disabled");
      showMsg("Loading…");
      var cached = docCache.get(key);
      var p = cached ? Promise.resolve(cached)
        : pdfjsLib.getDocument({ url: url }).promise.then(function (doc) { docCache.set(key, doc); return doc; });
      return p.then(function (doc) {
        if (mySeq !== renderSeq) return;      // switched away mid-load
        pdfDoc = doc; pageCount = doc.numPages || 1;
        pageNum = clamp(start, 1, pageCount);
        showMsg(""); ensureCanvas(); updateNav();
        buildToc();
        pendingScroll = "top";
        render(pageNum, 0);
        emitPage();
      }).catch(function () { if (mySeq === renderSeq) showMsg("Couldn’t open this book."); });
    }

    // ── public: book tabs / library ──────────────────────────────────────────
    // The reader owns the whole shell — tab bar + toolbar + reader + empty state —
    // so both the Compendium and the GM Screen get the identical experience from
    // one place. Hosts just feed it the book list and (optionally) per-book start
    // pages; the reader handles switching, caching and page memory callbacks.
    function markTabs() {
      var tabs = booksBar.querySelectorAll(".dccpdf-booktab");
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.toggle("is-active", tabs[i].getAttribute("data-file") === activeFile);
      }
    }
    function renderTabs() {
      booksBar.innerHTML = books.map(function (b) {
        return '<button class="dccpdf-booktab" type="button" data-file="' + esc(b.file) + '">' +
          esc(b.title || b.file) + "</button>";
      }).join("");
      markTabs();
    }
    function showEmpty(on) {
      emptyEl.style.display = on ? "flex" : "none";
      toolbarEl.style.display = on ? "none" : "";
      bodyEl.style.display = on ? "none" : "";
      if (on) { renderSeq++; pdfDoc = null; }
    }
    function openBook(file) {
      var b = null;
      for (var i = 0; i < books.length; i++) { if (books[i].file === file) { b = books[i]; break; } }
      if (!b) return;
      activeFile = b.file;
      markTabs();
      if (onActive) { try { onActive(b.file); } catch (e) {} }
      load({
        url: b.url,
        docKey: b.file,
        title: b.title,
        downloadName: b.downloadName,
        startPage: getStart ? (getStart(b.file) || 1) : 1,
      });
    }
    // Replace the tab bar's book list and open one. `active` picks the book to
    // show (falls back to the current one, then the first).
    function setBooks(list, active) {
      books = (Array.isArray(list) ? list : []).filter(function (b) { return b && b.url && b.file; });
      renderTabs();
      if (!books.length) { activeFile = ""; showMsg(""); showEmpty(true); return; }
      showEmpty(false);
      var want = (active && books.some(function (b) { return b.file === active; })) ? active
        : (activeFile && books.some(function (b) { return b.file === activeFile; })) ? activeFile
          : books[0].file;
      openBook(want);
    }

    function dropCache(key) {
      if (key) {
        var d = docCache.get(key);
        if (d) { try { d.destroy(); } catch (e) {} docCache.delete(key); }
      } else {
        docCache.forEach(function (d) { try { d.destroy(); } catch (e) {} });
        docCache.clear();
      }
    }
    function refresh() {
      if (activeFile) { dropCache(activeFile); openBook(activeFile); return Promise.resolve(); }
      if (!lastBook) return Promise.resolve();
      dropCache(docKey);
      return load({ url: lastBook.url, docKey: docKey, title: lastBook.title, startPage: pageNum });
    }
    function destroy() {
      renderSeq++;
      if (ro) { try { ro.disconnect(); } catch (e) {} }
      dropCache();
      pdfDoc = null;
      container.classList.remove("dccpdf", "dccpdf-toc-open");
      container.innerHTML = "";
    }

    return {
      // Library API (preferred): feed it the book list; it renders the tabs.
      setBooks: setBooks,
      setActiveFile: function (f) { if (f && f !== activeFile) openBook(f); },
      getActiveFile: function () { return activeFile; },
      // Single-book convenience (no tabs): open one document directly.
      load: load,
      setPage: function (n) { setPage(n, 0, "top"); },
      getPage: function () { return pageNum; },
      pageCount: function () { return pageCount; },
      refresh: refresh,
      refreshCurrent: refresh,
      dropCache: dropCache,
      relayout: function () { if (pdfDoc) render(pageNum, 0); },
      openToc: function (open) { setTocOpen(open !== false); },
      destroy: destroy,
      el: container,
    };
  }

  window.DCCPdfReader = { create: create };
})();
