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
      ".dccpdf-toc{position:absolute;z-index:6;top:0;bottom:0;left:0;width:0;overflow:hidden;background:var(--panel,#1a1d24);border-right:1px solid var(--border,#2a2f3a);box-shadow:0 0 30px rgba(0,0,0,.55);transition:width .18s ease;display:flex;flex-direction:column}" +
      ".dccpdf.dccpdf-toc-open .dccpdf-toc{width:min(86%,300px)}" +
      ".dccpdf-toc-head{flex-shrink:0;padding:9px 12px;font:800 11px/1 'Barlow Condensed','Montserrat',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--gold,#d8b45a);border-bottom:1px solid var(--border,#2a2f3a)}" +
      ".dccpdf-toc-list{flex:1;overflow-y:auto;padding:6px 4px;scrollbar-width:thin;scrollbar-color:var(--border,#2a2f3a) transparent}" +
      ".dccpdf-toc-list::-webkit-scrollbar{width:9px}" +
      ".dccpdf-toc-list::-webkit-scrollbar-track{background:transparent}" +
      ".dccpdf-toc-list::-webkit-scrollbar-thumb{background:var(--border,#2a2f3a);border-radius:999px;border:2px solid transparent;background-clip:padding-box}" +
      ".dccpdf-toc-list:hover::-webkit-scrollbar-thumb{background:var(--accent,var(--gold,#d8b45a));background-clip:padding-box}" +
      ".dccpdf-toc-link{display:block;width:100%;text-align:left;background:transparent;border:none;border-radius:5px;color:var(--text,#cdd3dd);font:500 12.5px/1.35 'Barlow','Montserrat',system-ui,sans-serif;padding:6px 8px;cursor:pointer}" +
      ".dccpdf-toc-link:hover{background:var(--panel-2,#22262f);color:var(--white,#fff)}" +
      ".dccpdf-toc-link.is-current{background:var(--panel-2,#22262f);color:var(--gold,#d8b45a)}" +
      ".dccpdf-toc-empty{padding:12px;color:var(--muted,#8a93a3);font:500 12px/1.4 'Barlow','Montserrat',sans-serif}" +
      ".dccpdf-toc-backdrop{display:none;position:absolute;inset:0;z-index:5;background:rgba(0,0,0,.5)}" +
      ".dccpdf.dccpdf-toc-open .dccpdf-toc-backdrop{display:block}" +
      ".dccpdf-stage{flex:1;min-width:0;overflow:auto;padding:14px;outline:none;-webkit-overflow-scrolling:touch;touch-action:none;position:relative}" +
      ".dccpdf-stage.is-pannable{cursor:grab}" +
      ".dccpdf-stage.is-grabbing{cursor:grabbing}" +
      ".dccpdf-wrap{width:max-content;margin:0 auto;will-change:transform,opacity}" +
      ".dccpdf-canvas{display:block;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.5)}" +
      ".dccpdf-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;color:var(--muted,#8a93a3);font:500 13px/1.5 'Barlow','Montserrat',system-ui,sans-serif;background:var(--dccpdf-stage,#111)}";
    var el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }

  // Curated chapter outlines (hand-verified from each book's real Table of
  // Contents), keyed by filename. Fetched once and shared across reader instances.
  var CURATED_URL = "/vendor/rulebook-outlines.json";
  var _curated = null, _curatedP = null;
  function loadCurated() {
    if (_curated) return Promise.resolve(_curated);
    if (_curatedP) return _curatedP;
    _curatedP = fetch(CURATED_URL, { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (j) { _curated = j || {}; return _curated; })
      .catch(function () { _curated = {}; return _curated; });
    return _curatedP;
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
        // Render into an OFFSCREEN canvas and swap it in only once it's painted, so
        // the visible page never clears to white mid-zoom / mid-flip.
        var c = document.createElement("canvas");
        c.className = "dccpdf-canvas";
        c.width = Math.floor(vp.width);
        c.height = Math.floor(vp.height);
        c.style.width = Math.floor(vp.width / dpr) + "px";
        c.style.height = Math.floor(vp.height / dpr) + "px";
        page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise.then(function () {
          if (myseq !== renderSeq) { rendering = 0; return; }
          wrap.innerHTML = "";
          wrap.appendChild(c);
          canvas = c;
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
    var tocEntries = [];          // { link, page(null until known) }
    var genCache = new Map();     // docKey → generated outline (so re-open is instant)
    function setTocOpen(open) {
      tocOpen = !!open && tocAvailable;
      container.classList.toggle("dccpdf-toc-open", tocOpen);
      tocToggle.classList.toggle("is-on", tocOpen);
      tocToggle.setAttribute("aria-expanded", tocOpen ? "true" : "false");
    }
    function tocEnable(on) {
      tocAvailable = on;
      tocToggle.disabled = !on;
      tocToggle.classList.toggle("is-disabled", !on);
      if (!on) setTocOpen(false);
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

    // Build the TOC DOM from a normalized list: [{ title, dest?, page?, depth }].
    // `page` entries already know their target (generated outline); `dest` entries
    // resolve it lazily (embedded outline).
    function populateToc(items) {
      tocList.innerHTML = "";
      tocEntries = [];
      var mySeq = renderSeq;
      var frag = document.createDocumentFragment();
      items.forEach(function (it) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "dccpdf-toc-link";
        btn.style.paddingLeft = (8 + (it.depth || 0) * 14) + "px";
        btn.textContent = it.title || "(untitled)";
        var entry = { link: btn, page: it.page != null ? it.page : null };
        tocEntries.push(entry);
        btn.addEventListener("click", function () {
          if (entry.page != null) { setPage(entry.page, 0, "top"); if (isNarrow()) setTocOpen(false); return; }
          resolveDest(it.dest).then(function (p) {
            if (p) { entry.page = p; setPage(p, 0, "top"); if (isNarrow()) setTocOpen(false); }
          });
        });
        frag.appendChild(btn);
      });
      tocList.appendChild(frag);
      // Resolve dest-based entries in the background for current-chapter highlight.
      items.forEach(function (it, i) {
        if (tocEntries[i].page == null && it.dest != null) {
          resolveDest(it.dest).then(function (p) { if (mySeq === renderSeq) { tocEntries[i].page = p; highlightToc(); } });
        }
      });
      highlightToc();
    }

    // Flatten an embedded PDF outline (nested via `.items`) to a depth list.
    function flattenOutline(outline) {
      var out = [];
      (function walk(items, depth) {
        items.forEach(function (it) {
          out.push({ title: it.title, dest: it.dest, depth: depth });
          if (it.items && it.items.length) walk(it.items, depth + 1);
        });
      })(outline, 0);
      return out;
    }

    function buildToc() {
      tocList.innerHTML = "";
      tocEntries = [];
      tocEnable(false);
      var mySeq = renderSeq;
      var key = docKey, doc = pdfDoc;
      var outlinePromise;
      try { outlinePromise = doc.getOutline(); } catch (e) { outlinePromise = Promise.resolve(null); }
      outlinePromise.then(function (outline) {
        if (mySeq !== renderSeq) return;
        if (outline && outline.length) { tocEnable(true); populateToc(flattenOutline(outline)); return; }
        // No embedded outline. Prefer a CURATED outline (hand-verified from the
        // book's real Table of Contents, shipped as /vendor/rulebook-outlines.json
        // keyed by file), then fall back to runtime generation.
        loadCurated().then(function (map) {
          if (mySeq !== renderSeq) return;
          var cur = map && map[key];
          if (cur && cur.length) { tocEnable(true); populateToc(cur); return; }
          buildGeneratedToc(doc, key, mySeq);
        });
      }).catch(function () { tocEnable(false); });
    }

    // Runtime fallback: generate (and cache) chapters by parsing the TOC / scanning.
    function buildGeneratedToc(doc, key, mySeq) {
        var cached = genCache.get(key);
        if (cached) {
          if (cached.length) { tocEnable(true); populateToc(cached); }
          else { tocEnable(false); tocToggle.disabled = true; tocToggle.classList.add("is-disabled"); tocList.innerHTML = '<div class="dccpdf-toc-empty">No chapters found in this PDF.</div>'; }
          return;
        }
        // Let the panel be opened to show progress while we scan.
        tocAvailable = true; tocToggle.disabled = false; tocToggle.classList.remove("is-disabled");
        tocList.innerHTML = '<div class="dccpdf-toc-empty">Building chapters…</div>';
        generateOutline(doc, mySeq).then(function (entries) {
          if (mySeq !== renderSeq) return;
          genCache.set(key, entries);
          if (entries.length) { tocEnable(true); populateToc(entries); }
          else { tocList.innerHTML = '<div class="dccpdf-toc-empty">No chapters found in this PDF.</div>'; }
        }).catch(function () { if (mySeq === renderSeq) tocList.innerHTML = '<div class="dccpdf-toc-empty">Couldn’t build chapters.</div>'; });
    }

    // Build a chapter list for a PDF with no embedded outline. PREFER the book's
    // own printed Table of Contents (clean chapter names + page numbers); only if
    // one can't be parsed do we fall back to scanning for large heading text.
    function generateOutline(doc, mySeq) {
      return extractPrintedToc(doc, mySeq).then(function (toc) {
        if (toc && toc.length >= 3) return toc;
        return headingScan(doc, mySeq);
      });
    }

    // Collapse a page's text items into lines ([{ y, size, x, text }]), top → down.
    function pageLines(tc) {
      var byLine = {};
      tc.items.forEach(function (it) {
        if (!it.str || !it.str.trim()) return;
        var tr = it.transform || [1, 0, 0, 1, 0, 0];
        var y = Math.round(tr[5]);
        var L = byLine[y] || (byLine[y] = { y: y, size: 0, x: Infinity, parts: [] });
        var size = Math.hypot(tr[2], tr[3]) || it.height || 0;
        if (size > L.size) L.size = size;
        if (tr[4] < L.x) L.x = tr[4];
        L.parts.push({ x: tr[4], s: it.str });
      });
      return Object.keys(byLine).map(function (y) {
        var L = byLine[y];
        L.parts.sort(function (a, b) { return a.x - b.x; });
        L.text = L.parts.map(function (q) { return q.s; }).join("").replace(/\s+/g, " ").trim();
        return L;
      }).sort(function (a, b) { return b.y - a.y; }); // PDF y grows upward → top line first
    }

    // Parse the printed Table of Contents from the first pages — lines like
    // "Combat .......... 45" (dotted leader) or "Combat 45". Then map each printed
    // page number to a physical page index (PDF page labels, else a detected
    // front-matter offset). Returns [{title, page, depth}] or null.
    function extractPrintedToc(doc, mySeq) {
      var N = doc.numPages || 0;
      if (!N) return Promise.resolve(null);
      var scanTo = Math.min(N, 30);
      var raw = [], sawToc = false, done = false;
      var labelsP = (doc.getPageLabels ? doc.getPageLabels() : Promise.resolve(null)).catch(function () { return null; });
      var p = 0;
      function nextPage() {
        if (mySeq !== renderSeq || done || p >= scanTo) return Promise.resolve();
        p++;
        return doc.getPage(p).then(function (page) {
          return page.getTextContent().then(function (tc) {
            var all = tc.items.map(function (i) { return i.str; }).join(" ");
            var hasContents = /contents/i.test(all);
            var hits = 0;
            pageLines(tc).forEach(function (L) {
              var t = L.text;
              var m = t.match(/^(.{2,}?)[\s.·…]{2,}(\d{1,4})$/) || t.match(/^(.{2,}?)\s(\d{1,4})$/);
              if (!m) return;
              var title = m[1].replace(/[\s.·…]+$/, "").trim();
              var num = parseInt(m[2], 10);
              if (title.length < 2 || title.length > 90 || !/[A-Za-z]/.test(title)) return;
              if (!(num >= 1 && num <= 4000)) return;
              raw.push({ printed: num, title: title, dotted: /[.·…]{2,}/.test(t) });
              hits++;
            });
            if (hasContents || hits >= 4) sawToc = true;
            if (page.cleanup) { try { page.cleanup(); } catch (e) {} }
            if (sawToc && hits === 0 && raw.length) { done = true; return; } // TOC block ended
            return nextPage();
          });
        }).catch(function () { return nextPage(); });
      }
      return nextPage().then(function () {
        return labelsP.then(function (labels) {
          if (mySeq !== renderSeq) return null;
          // Dotted-leader rows are the real TOC; prefer them when we have enough.
          var dotted = raw.filter(function (r) { return r.dotted; });
          var entries = dotted.length >= 3 ? dotted : raw;
          if (entries.length < 3) return null;
          var seen = {};
          entries = entries.filter(function (e) { var k = e.title.toLowerCase() + "|" + e.printed; if (seen[k]) return false; seen[k] = 1; return true; });
          entries.sort(function (a, b) { return a.printed - b.printed; });
          var map = null;
          if (labels && labels.length) { map = {}; for (var i = 0; i < labels.length; i++) if (map[labels[i]] == null) map[labels[i]] = i; }
          var mapped = 0;
          entries.forEach(function (e) { if (map && map[String(e.printed)] != null) { e.page = map[String(e.printed)] + 1; mapped++; } });
          if (mapped >= entries.length * 0.6) return finishToc(entries, N);
          return tocOffset(doc, entries, mySeq, N).then(function (off) {
            if (off == null) return null;
            entries.forEach(function (e) { e.page = Math.max(1, Math.min(N, e.printed + off)); });
            return finishToc(entries, N);
          });
        });
      });
    }

    function finishToc(entries, N) {
      entries = entries.filter(function (e) { return e.page != null && e.page >= 1 && e.page <= N; });
      entries.sort(function (a, b) { return a.page - b.page; });
      var seen = {}, out = [];
      entries.forEach(function (e) { var k = e.page + "|" + e.title.toLowerCase(); if (seen[k]) return; seen[k] = 1; out.push(e); });
      if (!out.length) return null;
      if (out.length > 300) out = out.slice(0, 300);
      return out.map(function (e) { return { title: e.title, page: e.page, depth: 0 }; });
    }

    // Front-matter offset (physical − printed): locate the first few TOC titles on
    // nearby physical pages and take the first match's offset.
    function tocOffset(doc, entries, mySeq, N) {
      var i = 0;
      function tryEntry() {
        if (mySeq !== renderSeq || i >= Math.min(entries.length, 5)) return Promise.resolve(null);
        var e = entries[i++];
        var needle = e.title.toLowerCase().replace(/\s+/g, " ").slice(0, 28);
        if (needle.length < 4) return tryEntry();
        var hi = Math.min(N, e.printed + 25), q = Math.max(1, e.printed) - 1;
        function scan() {
          if (mySeq !== renderSeq || q >= hi) return tryEntry();
          q++;
          var no = q;
          return doc.getPage(no).then(function (page) {
            return page.getTextContent().then(function (tc) {
              var txt = tc.items.map(function (it) { return it.str; }).join(" ").replace(/\s+/g, " ").toLowerCase();
              if (page.cleanup) { try { page.cleanup(); } catch (ee) {} }
              if (txt.indexOf(needle) >= 0) return no - e.printed;
              return scan();
            });
          }).catch(scan);
        }
        return scan();
      }
      return tryEntry();
    }

    // Fallback: derive chapters by scanning for lines rendered noticeably larger
    // than the body text. Sequential and in the background; aborts on book switch.
    function headingScan(doc, mySeq) {
      var N = Math.min(doc.numPages || 0, 800);
      if (!N) return Promise.resolve([]);
      var lines = [];        // { page, size, text }
      var sizeWeight = {};   // rounded font size → total chars (to find the body size)
      var p = 0;
      function nextPage() {
        if (mySeq !== renderSeq || p >= N) return Promise.resolve();
        p++;
        var pageNo = p;
        return doc.getPage(pageNo).then(function (page) {
          return page.getTextContent().then(function (tc) {
            var byLine = {};
            tc.items.forEach(function (it) {
              if (!it.str || !it.str.trim()) return;
              var tr = it.transform || [1, 0, 0, 1, 0, 0];
              var size = Math.hypot(tr[2], tr[3]) || it.height || 0;
              var y = Math.round(tr[5]);
              var L = byLine[y] || (byLine[y] = { size: 0, parts: [] });
              if (size > L.size) L.size = size;
              L.parts.push({ x: tr[4], s: it.str });
            });
            Object.keys(byLine).forEach(function (y) {
              var L = byLine[y];
              L.parts.sort(function (a, b) { return a.x - b.x; });
              var text = L.parts.map(function (q) { return q.s; }).join("").replace(/\s+/g, " ").trim();
              if (!text) return;
              var sz = Math.round(L.size);
              sizeWeight[sz] = (sizeWeight[sz] || 0) + text.length;
              lines.push({ page: pageNo, size: sz, text: text });
            });
            if (page.cleanup) { try { page.cleanup(); } catch (e) {} }
            return nextPage();
          });
        }).catch(function () { return nextPage(); });
      }
      return nextPage().then(function () {
        if (mySeq !== renderSeq || !lines.length) return [];
        // Body text size = the size carrying the most characters.
        var bodySize = 0, bodyW = -1;
        Object.keys(sizeWeight).forEach(function (s) { if (sizeWeight[s] > bodyW) { bodyW = sizeWeight[s]; bodySize = +s; } });
        var threshold = Math.max(bodySize * 1.25, bodySize + 1);
        var cand = lines.filter(function (l) {
          return l.size >= threshold && l.text.length >= 2 && l.text.length <= 80 &&
            /[A-Za-z]/.test(l.text) && !/^[\d.\s]+$/.test(l.text);
        });
        if (!cand.length) return [];
        // Drop running headers/footers: identical text repeating on many pages.
        var freq = {};
        cand.forEach(function (c) { var k = c.text.toLowerCase(); freq[k] = (freq[k] || 0) + 1; });
        var maxRepeat = Math.max(4, Math.floor(N * 0.15));
        cand = cand.filter(function (c) { return freq[c.text.toLowerCase()] <= maxRepeat; });
        // Collapse an identical heading repeated on the same page.
        var dedup = [];
        cand.forEach(function (c) {
          var prev = dedup[dedup.length - 1];
          if (prev && prev.text === c.text && prev.page === c.page) return;
          dedup.push(c);
        });
        // Cap the count: keep the largest size tiers first.
        var MAXN = 300;
        if (dedup.length > MAXN) {
          var sizes = dedup.map(function (c) { return c.size; }).sort(function (a, b) { return b - a; });
          var cut = sizes[MAXN - 1];
          dedup = dedup.filter(function (c) { return c.size >= cut; }).slice(0, MAXN);
        }
        // Depth by size tier (largest = depth 0), capped at 2.
        var uniq = [];
        dedup.forEach(function (c) { if (uniq.indexOf(c.size) < 0) uniq.push(c.size); });
        uniq.sort(function (a, b) { return b - a; });
        var depthOf = {};
        uniq.forEach(function (s, i) { depthOf[s] = Math.min(i, 2); });
        return dedup.map(function (c) { return { title: c.text, page: c.page, depth: depthOf[c.size] || 0 }; });
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
      // Keep reader gestures from reaching the page's pull-to-refresh (it listens
      // on window and treats any downward swipe at scrollTop 0 as a pull).
      e.stopPropagation();
      if (e.touches.length === 2) {
        tc.mode = "pinch"; tc.d0 = touchDist(e.touches); tc.s0 = effScale();
      } else if (e.touches.length === 1) {
        tc.mode = "one"; tc.panned = false;
        tc.sx = e.touches[0].clientX; tc.sy = e.touches[0].clientY;
        tc.sl = stage.scrollLeft; tc.st = stage.scrollTop;
      }
    }, { passive: false });
    stage.addEventListener("touchmove", function (e) {
      e.stopPropagation();
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
      e.stopPropagation();
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
        genCache.delete(key);
      } else {
        docCache.forEach(function (d) { try { d.destroy(); } catch (e) {} });
        docCache.clear();
        genCache.clear();
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
