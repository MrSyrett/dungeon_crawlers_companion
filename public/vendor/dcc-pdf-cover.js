/* Dungeon Crawler's Companion — Library cover fallback
   ------------------------------------------------------------------
   The Library shelves (the /library page and the GM Screen's Library tool) show
   each book's cover image from /api/rulebooks/<file>/cover. A book with no cover
   image on the server (a PDF dropped in since the covers were made) gets its
   page 1 drawn here instead, with PDF.js — ranged fetches, so only the first
   page's bytes are downloaded, not the whole book.

   API:
     window.DCCPdfCover.draw(imgEl, pdfUrl, onFail?)  // fills imgEl.src with page 1;
                                                     // onFail() if it can't be drawn

   Covers are drawn one at a time (queue) and remembered for the page's lifetime,
   so re-rendering a shelf doesn't redraw them.
*/
(function () {
  if (window.DCCPdfCover) return;

  var WIDTH = 360;            // px — matches the pre-rendered covers' density
  var done = new Map();       // pdfUrl → data URL
  var queue = [];
  var busy = false;
  var loading = null;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var have = document.querySelector('script[data-dcc-src="' + src + '"]');
      if (have) {
        if (have.dataset.loaded === "1") return resolve();
        have.addEventListener("load", function () { resolve(); });
        have.addEventListener("error", function () { reject(new Error(src)); });
        return;
      }
      var s = document.createElement("script");
      s.src = src; s.async = true; s.dataset.dccSrc = src;
      s.addEventListener("load", function () { s.dataset.loaded = "1"; resolve(); });
      s.addEventListener("error", function () { reject(new Error(src)); });
      document.head.appendChild(s);
    });
  }
  function pdfjs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (!loading) loading = loadScript("/vendor/pdfjs/pdf.min.js").then(function () { return window.pdfjsLib; });
    return loading;
  }

  function render(url) {
    return pdfjs().then(function (lib) {
      if (lib.GlobalWorkerOptions && !lib.GlobalWorkerOptions.workerSrc) {
        lib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
      }
      var task = lib.getDocument({ url: url, disableAutoFetch: true, disableStream: true });
      return task.promise.then(function (doc) {
        return doc.getPage(1).then(function (page) {
          var vp1 = page.getViewport({ scale: 1 });
          var vp = page.getViewport({ scale: WIDTH / vp1.width });
          var c = document.createElement("canvas");
          c.width = Math.round(vp.width); c.height = Math.round(vp.height);
          return page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise.then(function () {
            var data = c.toDataURL("image/webp", 0.8);
            if (data.indexOf("data:image/webp") !== 0) data = c.toDataURL("image/jpeg", 0.82);
            try { doc.destroy(); } catch (e) {}
            return data;
          });
        });
      });
    });
  }

  function pump() {
    if (busy || !queue.length) return;
    var job = queue.shift();
    if (!job.img.isConnected) { pump(); return; }   // shelf re-rendered meanwhile
    if (done.has(job.url)) { job.img.src = done.get(job.url); pump(); return; }
    busy = true;
    render(job.url).then(function (data) {
      done.set(job.url, data);
      job.img.src = data;
      job.img.classList.add("is-drawn");
    }, function () {
      job.img.classList.add("is-failed");
      if (job.onFail) { try { job.onFail(); } catch (e) {} }
    }).then(function () { busy = false; pump(); });
  }

  function draw(img, url, onFail) {
    if (!img || !url) return;
    if (done.has(url)) { img.src = done.get(url); return; }
    queue.push({ img: img, url: url, onFail: onFail });
    pump();
  }

  window.DCCPdfCover = { draw: draw };
})();
