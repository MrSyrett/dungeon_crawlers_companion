/* Dungeon Crawler's Companion — VTT "Align grid" tool.
 *
 * Published and scanned battlemaps almost never have a grid that starts at the
 * image's top-left pixel, and the cell size is rarely a whole number of pixels.
 * Typing "70" into a Grid px box can't fix that. This tool does what other VTTs
 * do: the GM drags a box over any N×N block of squares printed on the map (3×3 by
 * default), lining the box's corners up with the printed grid, and we derive the
 * cell size (fractional) and the grid origin from it:
 *
 *     ppg = box width / N  (averaged with height / N)
 *     gx  = x1 mod ppg,  gy = y1 mod ppg
 *
 * A full-image preview of the resulting grid is drawn live, so the GM sees the
 * whole map snap into alignment as the corners land. Zoom in for precision — the
 * image is shown pixel-for-pixel at 1:1 and beyond — and a magnifier follows a
 * corner while it is dragged. Arrow keys nudge the box by one image pixel (Shift:
 * ten). Numeric fields let the GM fine-tune or type exact values.
 *
 *   VTTGridAlign.open({ image, widthPx, heightPx, ppg, gx, gy, color, opacity,
 *                       cells: 3, onApply: function ({ ppg, gx, gy, cells }) {} })
 *
 * Pure UI: it never touches the board. The scene editor passes the preview board's
 * image and applies the result with board.setGrid2(). Exposes window.VTTGridAlign.
 */
(function (root) {
  "use strict";

  var HANDLE_R = 8;      // screen px, corner handle radius
  var GRAB = 14;         // screen px, how close counts as "on the handle"
  var MAG_R = 64;        // screen px, magnifier radius
  var MAG_ZOOM = 3;      // magnifier zoom relative to the current view

  var styled = false;
  function injectStyles() {
    if (styled) return; styled = true;
    var css = [
      ".vtt-ga{position:fixed;inset:0;z-index:1000;background:rgba(6,8,11,.92);display:flex;flex-direction:column;color:#e6ebf2;font:14px/1.4 'Montserrat',system-ui,sans-serif;-webkit-user-select:none;user-select:none}",
      ".vtt-ga-head{display:flex;align-items:center;gap:14px;padding:10px 14px;border-bottom:1px solid #2a323d;background:rgba(15,18,23,.97)}",
      ".vtt-ga-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#c8a24a;font-size:16px}",
      ".vtt-ga-hint{color:#8b97a7;font-size:12px;flex:1;min-width:0}",
      ".vtt-ga-hint b{color:#e6ebf2}",
      ".vtt-ga-stage{position:relative;flex:1;min-height:0;overflow:hidden}",
      ".vtt-ga-stage canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;cursor:grab}",
      ".vtt-ga-stage canvas.hand{cursor:move}.vtt-ga-stage canvas.corner{cursor:crosshair}.vtt-ga-stage canvas.panning{cursor:grabbing}",
      ".vtt-ga-zoom{position:absolute;right:12px;bottom:12px;display:flex;flex-direction:column;gap:7px}",
      ".vtt-ga-foot{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:10px 14px;border-top:1px solid #2a323d;background:rgba(15,18,23,.97)}",
      ".vtt-ga-foot label{display:flex;align-items:center;gap:6px;color:#8b97a7;font-size:12px}",
      ".vtt-ga-foot input[type=number]{width:74px;background:#1b212a;color:#e6ebf2;border:1px solid #2a323d;border-radius:4px;padding:4px 6px;font:600 12px/1 system-ui}",
      ".vtt-ga-foot select{background:#1b212a;color:#e6ebf2;border:1px solid #2a323d;border-radius:4px;padding:4px 6px;font:600 12px/1 system-ui}",
      ".vtt-ga-read{font:700 12px/1 system-ui;color:#c8a24a;min-width:150px}",
      ".vtt-ga-warn{font:600 11.5px/1.3 system-ui;color:#e6b24a}",
      ".vtt-ga-sp{flex:1}",
      ".vtt-ga-btn{background:#1b212a;color:#e6ebf2;border:1px solid #2a323d;border-radius:6px;padding:7px 12px;font:700 12px/1 system-ui;cursor:pointer}",
      ".vtt-ga-btn:hover{border-color:#8b97a7}.vtt-ga-btn.primary{background:#c8a24a;color:#14181e;border-color:#c8a24a}",
      ".vtt-ga-tb{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(20,24,30,.92);color:#c3ccd8;border:1px solid #2a323d;border-radius:9px;cursor:pointer;font:800 18px/1 system-ui}",
      "@media(max-width:640px){.vtt-ga-hint{display:none}.vtt-ga-read{min-width:0}}",
    ].join("");
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }

  function rgba(hex, a) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return hex || "rgba(255,255,255,0.5)";
    var n = parseInt(m[1], 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }

  // Pure math: box + cell count -> grid. Exposed for tests.
  function derive(box, cells) {
    var N = Math.max(1, cells | 0);
    var w = Math.abs(box.x2 - box.x1), h = Math.abs(box.y2 - box.y1);
    var cw = w / N, ch = h / N;
    var ppg = (cw + ch) / 2;
    var x1 = Math.min(box.x1, box.x2), y1 = Math.min(box.y1, box.y2);
    var gx = ppg > 0 ? ((x1 % ppg) + ppg) % ppg : 0, gy = ppg > 0 ? ((y1 % ppg) + ppg) % ppg : 0;
    return { ppg: ppg, gx: gx, gy: gy, cellW: cw, cellH: ch, skew: ppg > 0 ? Math.abs(cw - ch) / ppg : 0 };
  }
  // The inverse: a grid -> a cell-aligned N×N box near a point (initial placement).
  function boxFor(grid, cells, cx, cy, W, H) {
    var p = grid.ppg > 0 ? grid.ppg : 70, N = Math.max(1, cells | 0);
    var gx = grid.gx || 0, gy = grid.gy || 0;
    var kx = Math.floor((cx - gx) / p) - Math.floor(N / 2), ky = Math.floor((cy - gy) / p) - Math.floor(N / 2);
    var x1 = gx + kx * p, y1 = gy + ky * p;
    // Keep it on the image.
    if (W > 0) { x1 = Math.max(0, Math.min(W - N * p, x1)); }
    if (H > 0) { y1 = Math.max(0, Math.min(H - N * p, y1)); }
    return { x1: x1, y1: y1, x2: x1 + N * p, y2: y1 + N * p };
  }

  function open(opts) {
    opts = opts || {};
    var img = opts.image || null;
    var W = opts.widthPx || (img && img.naturalWidth) || 0, H = opts.heightPx || (img && img.naturalHeight) || 0;
    if (!W || !H) return null;
    injectStyles();

    var cells = opts.cells || 3;
    var color = opts.color || "#ffffff", opacity = typeof opts.opacity === "number" ? opts.opacity : 0.1;
    var box = boxFor({ ppg: opts.ppg || 70, gx: opts.gx || 0, gy: opts.gy || 0 }, cells, W / 2, H / 2, W, H);

    var wrap = document.createElement("div"); wrap.className = "vtt-ga";
    wrap.innerHTML =
      '<div class="vtt-ga-head"><span class="vtt-ga-title">Align grid</span>' +
        '<span class="vtt-ga-hint">Drag the corners of the gold box onto the corners of any <b class="ga-n">3×3</b> block of squares printed on the map. The whole grid follows. Scroll to zoom, drag the map to pan, arrow keys nudge the box (Shift: ×10).</span>' +
        '<button class="vtt-ga-btn ga-cancel" type="button">Cancel</button>' +
        '<button class="vtt-ga-btn primary ga-apply" type="button">Apply grid</button></div>' +
      '<div class="vtt-ga-stage"><canvas></canvas>' +
        '<div class="vtt-ga-zoom"><button class="vtt-ga-tb ga-zin" title="Zoom in">+</button><button class="vtt-ga-tb ga-zfit" title="Fit">⊡</button><button class="vtt-ga-tb ga-zout" title="Zoom out">−</button></div></div>' +
      '<div class="vtt-ga-foot">' +
        '<label>Block <select class="ga-cells"><option value="2">2×2</option><option value="3" selected>3×3</option><option value="4">4×4</option><option value="5">5×5</option></select></label>' +
        '<label>Cell px <input type="number" class="ga-ppg" step="0.01" min="4"></label>' +
        '<label>Offset x <input type="number" class="ga-gx" step="0.1"></label>' +
        '<label>Offset y <input type="number" class="ga-gy" step="0.1"></label>' +
        '<span class="vtt-ga-read"></span><span class="vtt-ga-warn"></span><span class="vtt-ga-sp"></span>' +
      "</div>";
    document.body.appendChild(wrap);
    var canvas = wrap.querySelector("canvas"), ctx = canvas.getContext("2d");
    var $ = function (c) { return wrap.querySelector("." + c); };
    $("ga-cells").value = String(cells);

    // ---- camera ---------------------------------------------------------------
    var cam = { x: 0, y: 0, s: 1 }, DPR = 1, cw = 0, ch = 0;
    function w2sX(x) { return (x - cam.x) * cam.s; }
    function w2sY(y) { return (y - cam.y) * cam.s; }
    function s2wX(x) { return x / cam.s + cam.x; }
    function s2wY(y) { return y / cam.s + cam.y; }
    function resize() {
      var r = canvas.getBoundingClientRect(); cw = r.width; ch = r.height;
      DPR = Math.min(2, root.devicePixelRatio || 1);
      canvas.width = Math.round(cw * DPR); canvas.height = Math.round(ch * DPR);
      draw();
    }
    function fit() {
      if (!cw || !ch) return;
      cam.s = Math.min(cw / W, ch / H) * 0.95;
      cam.x = (W - cw / cam.s) / 2; cam.y = (H - ch / cam.s) / 2;
      draw();
    }
    function zoomAt(f, sx, sy) {
      var wx = s2wX(sx), wy = s2wY(sy);
      cam.s = Math.max(0.02, Math.min(40, cam.s * f));
      cam.x = wx - sx / cam.s; cam.y = wy - sy / cam.s;
      draw();
    }
    // Zoom so the box fills a good part of the view — the precise work happens here.
    function zoomToBox() {
      var bw = Math.abs(box.x2 - box.x1), bh = Math.abs(box.y2 - box.y1);
      if (!bw || !bh) return;
      cam.s = Math.min(cw / bw, ch / bh) * 0.55;
      cam.x = (box.x1 + box.x2) / 2 - cw / cam.s / 2; cam.y = (box.y1 + box.y2) / 2 - ch / cam.s / 2;
      draw();
    }

    // ---- drawing --------------------------------------------------------------
    var drag = null; // { kind: "pan"|"move"|"corner", corner, sx, sy, start:{...} }
    function current() { return derive(box, cells); }
    function draw() {
      if (!cw || !ch) return;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = cam.s < 1;
      if (img) { try { ctx.drawImage(img, w2sX(0), w2sY(0), W * cam.s, H * cam.s); } catch (e) {} }
      var g = current();
      // Whole-map preview of the grid that would result (always visible enough to judge).
      if (g.ppg > 0 && g.ppg * cam.s >= 5) {
        ctx.save();
        ctx.strokeStyle = rgba(color, Math.max(0.35, opacity)); ctx.lineWidth = 1;
        ctx.beginPath();
        var x0 = ((g.gx % g.ppg) + g.ppg) % g.ppg - g.ppg, y0 = ((g.gy % g.ppg) + g.ppg) % g.ppg - g.ppg;
        // Only lines on screen.
        var vx1 = Math.max(0, s2wX(0)), vx2 = Math.min(W, s2wX(cw)), vy1 = Math.max(0, s2wY(0)), vy2 = Math.min(H, s2wY(ch));
        var kx = Math.floor((vx1 - x0) / g.ppg), ky = Math.floor((vy1 - y0) / g.ppg);
        for (var x = x0 + kx * g.ppg; x <= vx2; x += g.ppg) { if (x < 0) continue; ctx.moveTo(w2sX(x), w2sY(Math.max(0, vy1))); ctx.lineTo(w2sX(x), w2sY(vy2)); }
        for (var y = y0 + ky * g.ppg; y <= vy2; y += g.ppg) { if (y < 0) continue; ctx.moveTo(w2sX(Math.max(0, vx1)), w2sY(y)); ctx.lineTo(w2sX(vx2), w2sY(y)); }
        ctx.stroke();
        ctx.restore();
      }
      // The alignment box: gold outline, dashed inner divisions, corner handles.
      var x1 = w2sX(Math.min(box.x1, box.x2)), y1 = w2sY(Math.min(box.y1, box.y2)), x2 = w2sX(Math.max(box.x1, box.x2)), y2 = w2sY(Math.max(box.y1, box.y2));
      ctx.save();
      ctx.strokeStyle = "rgba(200,162,74,0.55)"; ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
      ctx.beginPath();
      for (var i = 1; i < cells; i++) {
        var fx = x1 + (x2 - x1) * i / cells, fy = y1 + (y2 - y1) * i / cells;
        ctx.moveTo(fx, y1); ctx.lineTo(fx, y2); ctx.moveTo(x1, fy); ctx.lineTo(x2, fy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "#c8a24a"; ctx.lineWidth = 2; ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      [[x1, y1], [x2, y1], [x1, y2], [x2, y2]].forEach(function (p, idx) {
        var active = drag && drag.kind === "corner" && drag.corner === idx;
        ctx.beginPath(); ctx.arc(p[0], p[1], HANDLE_R, 0, Math.PI * 2);
        ctx.fillStyle = active ? "#ffe08a" : "#c8a24a"; ctx.fill();
        ctx.strokeStyle = "#14181e"; ctx.lineWidth = 2; ctx.stroke();
        // crosshair through the handle so the exact corner is visible under the dot
        ctx.strokeStyle = "rgba(20,24,30,0.9)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p[0] - HANDLE_R, p[1]); ctx.lineTo(p[0] + HANDLE_R, p[1]); ctx.moveTo(p[0], p[1] - HANDLE_R); ctx.lineTo(p[0], p[1] + HANDLE_R); ctx.stroke();
      });
      ctx.restore();
      // Magnifier while a corner is being dragged.
      if (drag && drag.kind === "corner" && img) drawMagnifier(cornerPt(drag.corner));
      readout(g);
    }
    function cornerPt(idx) {
      var xs = [Math.min(box.x1, box.x2), Math.max(box.x1, box.x2)], ys = [Math.min(box.y1, box.y2), Math.max(box.y1, box.y2)];
      return { x: xs[idx % 2], y: ys[idx >> 1] };
    }
    function drawMagnifier(pw) {
      var sx = w2sX(pw.x), sy = w2sY(pw.y);
      // Put the lens above-right of the handle, flipping if it would leave the view.
      var mx = sx + MAG_R + 24, my = sy - MAG_R - 24;
      if (mx + MAG_R > cw) mx = sx - MAG_R - 24;
      if (my - MAG_R < 0) my = sy + MAG_R + 24;
      var zs = cam.s * MAG_ZOOM, half = MAG_R / zs; // world half-size shown
      ctx.save();
      ctx.beginPath(); ctx.arc(mx, my, MAG_R, 0, Math.PI * 2); ctx.closePath();
      ctx.fillStyle = "#0b0d10"; ctx.fill(); ctx.clip();
      ctx.imageSmoothingEnabled = false;
      try { ctx.drawImage(img, pw.x - half, pw.y - half, half * 2, half * 2, mx - MAG_R, my - MAG_R, MAG_R * 2, MAG_R * 2); } catch (e) {}
      // grid lines through the lens
      var g = current();
      if (g.ppg > 0) {
        ctx.strokeStyle = rgba(color, 0.7); ctx.lineWidth = 1; ctx.beginPath();
        var x0 = ((g.gx % g.ppg) + g.ppg) % g.ppg, y0 = ((g.gy % g.ppg) + g.ppg) % g.ppg;
        var kx = Math.floor((pw.x - half - x0) / g.ppg), ky = Math.floor((pw.y - half - y0) / g.ppg);
        for (var x = x0 + kx * g.ppg; x <= pw.x + half; x += g.ppg) { var lx = mx + (x - pw.x) * zs; ctx.moveTo(lx, my - MAG_R); ctx.lineTo(lx, my + MAG_R); }
        for (var y = y0 + ky * g.ppg; y <= pw.y + half; y += g.ppg) { var ly = my + (y - pw.y) * zs; ctx.moveTo(mx - MAG_R, ly); ctx.lineTo(mx + MAG_R, ly); }
        ctx.stroke();
      }
      // crosshair = the corner itself
      ctx.strokeStyle = "#ffe08a"; ctx.lineWidth = 1.5; ctx.beginPath();
      ctx.moveTo(mx - MAG_R, my); ctx.lineTo(mx + MAG_R, my); ctx.moveTo(mx, my - MAG_R); ctx.lineTo(mx, my + MAG_R); ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, MAG_R, 0, Math.PI * 2); ctx.strokeStyle = "#c8a24a"; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    }
    var syncing = false;
    function readout(g) {
      $("vtt-ga-read").textContent = "Cell " + g.ppg.toFixed(2) + " px · origin " + g.gx.toFixed(1) + ", " + g.gy.toFixed(1);
      $("vtt-ga-warn").textContent = g.skew > 0.03 ? "Box isn't square (" + g.cellW.toFixed(1) + " × " + g.cellH.toFixed(1) + ") — line the corners up on the printed grid, or the cells are really rectangular." : "";
      if (!syncing) {
        syncing = true;
        var fp = $("ga-ppg"), fx = $("ga-gx"), fy = $("ga-gy");
        if (document.activeElement !== fp) fp.value = g.ppg.toFixed(2);
        if (document.activeElement !== fx) fx.value = g.gx.toFixed(1);
        if (document.activeElement !== fy) fy.value = g.gy.toFixed(1);
        syncing = false;
      }
    }
    // Typing exact numbers rebuilds the box from them (keeping its top-left cell).
    function fromFields() {
      var p = parseFloat($("ga-ppg").value), gx = parseFloat($("ga-gx").value), gy = parseFloat($("ga-gy").value);
      if (!(p >= 4)) return;
      gx = isFinite(gx) ? ((gx % p) + p) % p : 0; gy = isFinite(gy) ? ((gy % p) + p) % p : 0;
      var x1 = Math.min(box.x1, box.x2), y1 = Math.min(box.y1, box.y2);
      var kx = Math.round((x1 - gx) / p), ky = Math.round((y1 - gy) / p);
      box = { x1: gx + kx * p, y1: gy + ky * p, x2: gx + kx * p + cells * p, y2: gy + ky * p + cells * p };
      draw();
    }
    ["ga-ppg", "ga-gx", "ga-gy"].forEach(function (c) { $(c).addEventListener("change", fromFields); });
    $("ga-cells").onchange = function () {
      // Keep the top-left corner and the cell size; grow/shrink the box.
      var g = current(); cells = parseInt(this.value, 10) || 3;
      $("ga-n").textContent = cells + "×" + cells;
      var x1 = Math.min(box.x1, box.x2), y1 = Math.min(box.y1, box.y2);
      box = { x1: x1, y1: y1, x2: x1 + cells * g.ppg, y2: y1 + cells * g.ppg };
      draw();
    };

    // ---- pointer interaction ---------------------------------------------------
    var pointers = {}; var pinch = null;
    function hitCorner(sx, sy) {
      var best = -1, bd = GRAB;
      for (var i = 0; i < 4; i++) { var p = cornerPt(i); var d = Math.hypot(w2sX(p.x) - sx, w2sY(p.y) - sy); if (d < bd) { bd = d; best = i; } }
      return best;
    }
    function inBox(sx, sy) {
      var wx = s2wX(sx), wy = s2wY(sy);
      return wx > Math.min(box.x1, box.x2) && wx < Math.max(box.x1, box.x2) && wy > Math.min(box.y1, box.y2) && wy < Math.max(box.y1, box.y2);
    }
    function pos(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    canvas.addEventListener("pointerdown", function (e) {
      var p = pos(e); pointers[e.pointerId] = p;
      canvas.setPointerCapture(e.pointerId);
      var ids = Object.keys(pointers);
      if (ids.length === 2) { // pinch: cancel any drag
        drag = null; var a = pointers[ids[0]], b = pointers[ids[1]];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: cam.s, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
        return;
      }
      var c = hitCorner(p.x, p.y);
      // Normalise the box so corner index math (0 tl,1 tr,2 bl,3 br) is stable.
      box = { x1: Math.min(box.x1, box.x2), y1: Math.min(box.y1, box.y2), x2: Math.max(box.x1, box.x2), y2: Math.max(box.y1, box.y2) };
      if (c >= 0) drag = { kind: "corner", corner: c, sx: p.x, sy: p.y, start: Object.assign({}, box) };
      else if (inBox(p.x, p.y)) drag = { kind: "move", sx: p.x, sy: p.y, start: Object.assign({}, box) };
      else drag = { kind: "pan", sx: p.x, sy: p.y, start: { x: cam.x, y: cam.y } };
      canvas.className = drag.kind === "pan" ? "panning" : drag.kind === "move" ? "hand" : "corner";
      draw();
    });
    canvas.addEventListener("pointermove", function (e) {
      var p = pos(e);
      if (pointers[e.pointerId]) pointers[e.pointerId] = p;
      if (pinch) {
        var ids = Object.keys(pointers); if (ids.length < 2) return;
        var a = pointers[ids[0]], b = pointers[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
        var f = (d / pinch.d) * pinch.s / cam.s;
        zoomAt(f, (a.x + b.x) / 2, (a.y + b.y) / 2);
        return;
      }
      if (!drag) {
        var c = hitCorner(p.x, p.y);
        canvas.className = c >= 0 ? "corner" : inBox(p.x, p.y) ? "hand" : "";
        return;
      }
      var dx = (p.x - drag.sx) / cam.s, dy = (p.y - drag.sy) / cam.s, s = drag.start;
      if (drag.kind === "pan") { cam.x = s.x - dx; cam.y = s.y - dy; }
      else if (drag.kind === "move") { box = { x1: s.x1 + dx, y1: s.y1 + dy, x2: s.x2 + dx, y2: s.y2 + dy }; }
      else {
        var b2 = Object.assign({}, s), c2 = drag.corner;
        if (c2 % 2 === 0) b2.x1 = s.x1 + dx; else b2.x2 = s.x2 + dx;
        if (c2 < 2) b2.y1 = s.y1 + dy; else b2.y2 = s.y2 + dy;
        // Don't let a corner cross its opposite (min 4px cells).
        if (b2.x2 - b2.x1 < 4 * cells) { if (c2 % 2 === 0) b2.x1 = b2.x2 - 4 * cells; else b2.x2 = b2.x1 + 4 * cells; }
        if (b2.y2 - b2.y1 < 4 * cells) { if (c2 < 2) b2.y1 = b2.y2 - 4 * cells; else b2.y2 = b2.y1 + 4 * cells; }
        box = b2;
      }
      draw();
    });
    function up(e) {
      delete pointers[e.pointerId];
      if (Object.keys(pointers).length < 2) pinch = null;
      if (drag) { drag = null; canvas.className = ""; draw(); }
    }
    canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("wheel", function (e) { e.preventDefault(); var p = pos(e); zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, p.x, p.y); }, { passive: false });
    canvas.addEventListener("dblclick", function (e) { var p = pos(e); zoomAt(2, p.x, p.y); });

    // Arrow keys nudge the whole box by one image pixel (Shift: ten); with Alt,
    // resize from the bottom-right corner instead (fine cell-size tuning).
    function onKey(e) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "SELECT") return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Enter") { apply(); return; }
      var d = e.shiftKey ? 10 : 1, dx = 0, dy = 0;
      if (e.key === "ArrowLeft") dx = -d; else if (e.key === "ArrowRight") dx = d; else if (e.key === "ArrowUp") dy = -d; else if (e.key === "ArrowDown") dy = d; else return;
      e.preventDefault();
      if (e.altKey) { box.x2 += dx; box.y2 += dy; } else { box.x1 += dx; box.x2 += dx; box.y1 += dy; box.y2 += dy; }
      draw();
    }
    document.addEventListener("keydown", onKey, true);

    // ---- buttons ----------------------------------------------------------------
    var onApply = opts.onApply || function () {}, onClose = opts.onClose || function () {};
    function close() { document.removeEventListener("keydown", onKey, true); root.removeEventListener("resize", resize); try { wrap.remove(); } catch (e) {} onClose(); }
    function apply() { var g = current(); onApply({ ppg: g.ppg, gx: g.gx, gy: g.gy, cells: cells }); close(); }
    $("ga-cancel").onclick = close;
    $("ga-apply").onclick = apply;
    $("ga-zin").onclick = function () { zoomAt(1.4, cw / 2, ch / 2); };
    $("ga-zout").onclick = function () { zoomAt(1 / 1.4, cw / 2, ch / 2); };
    $("ga-zfit").onclick = fit;
    root.addEventListener("resize", resize);

    resize(); fit(); zoomToBox();
    return { close: close, box: function () { return box; }, grid: current, setBox: function (b) { box = b; draw(); } };
  }

  root.VTTGridAlign = { open: open, derive: derive, boxFor: boxFor };
})(typeof window !== "undefined" ? window : this);
