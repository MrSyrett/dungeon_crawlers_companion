/* Dungeon Crawler's Companion — VTT board.
 *
 * A self-contained, system-agnostic tabletop canvas: an image/UVTT map, a grid,
 * draggable tokens, dynamic fog of war, a ruler, and scene save/load — with NO
 * server and NO framework. Depends only on sibling files uvtt.js + visibility.js.
 *
 * The board knows nothing about rules, stats, dice or game systems. A token is
 * just an image at a position with an optional opaque `characterDocId` the host
 * app can use to open a sheet. Everything system-specific lives elsewhere.
 *
 * Usage:
 *   const board = VTTBoard(canvasEl);
 *   board.loadUvtt(text); board.addToken({ imageUrl, x, y }); board.setTool("ruler");
 *
 * Exposes window.VTTBoard.
 */
(function (root) {
  "use strict";

  var Vis = root.VTTVisibility;
  var Uvtt = root.VTTUvtt;

  var HANDLE_R = 7;         // px, screen-space handle radius
  var ROTATE_OFFSET = 26;   // px above the token top edge
  var MIN_TOKEN = 12;       // px, smallest token side (map space)

  function uid() { return "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function VTTBoard(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var fog = document.createElement("canvas"); // offscreen fog layer
    var fctx = fog.getContext("2d");

    var listeners = {};
    function emit(ev, payload) {
      (listeners[ev] || []).forEach(function (cb) { try { cb(payload); } catch (e) {} });
    }

    var state = {
      cam: { scale: 1, offX: 0, offY: 0 },
      map: { image: null, widthPx: 0, heightPx: 0, ppg: 70, walls: [], doors: [], src: null, srcType: null },
      tokens: [],
      tool: "select",       // select | pan | ruler
      selectedId: null,
      fog: { enabled: false, opacity: 1, showAll: true },
      feetPerCell: 5,
      grid: true,
      ruler: null,          // { ax, ay, bx, by } in world coords
      dpr: opts.dpr || (root.devicePixelRatio || 1),
    };

    // ---- coordinate transforms (world = map pixels) -------------------------
    function w2sX(x) { return x * state.cam.scale + state.cam.offX; }
    function w2sY(y) { return y * state.cam.scale + state.cam.offY; }
    function s2wX(x) { return (x - state.cam.offX) / state.cam.scale; }
    function s2wY(y) { return (y - state.cam.offY) / state.cam.scale; }

    function cssSize() {
      var r = canvas.getBoundingClientRect();
      return { w: r.width || canvas.width, h: r.height || canvas.height };
    }

    function resize() {
      var s = cssSize();
      var dpr = state.dpr;
      canvas.width = Math.max(1, Math.round(s.w * dpr));
      canvas.height = Math.max(1, Math.round(s.h * dpr));
      fog.width = canvas.width; fog.height = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scheduleRender();
    }

    // ---- rendering ----------------------------------------------------------
    var rafPending = false;
    function scheduleRender() {
      if (rafPending) return;
      rafPending = true;
      (root.requestAnimationFrame || function (f) { setTimeout(f, 16); })(function () {
        rafPending = false;
        render();
      });
    }

    function render() {
      var s = cssSize();
      ctx.clearRect(0, 0, s.w, s.h);
      ctx.fillStyle = "#0b0d10";
      ctx.fillRect(0, 0, s.w, s.h);

      var map = state.map;
      if (map.image && map.widthPx) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(map.image, w2sX(0), w2sY(0), map.widthPx * state.cam.scale, map.heightPx * state.cam.scale);
      }
      if (state.grid && map.widthPx) drawGrid();

      // tokens
      state.tokens.forEach(drawToken);

      // fog on top of map + tokens (players can't see hidden tokens either)
      if (state.fog.enabled && !state.fog.showAll && map.widthPx) drawFog();

      if (state.selectedId) drawSelection(byId(state.selectedId));
      if (state.ruler) drawRuler();
      emit("render", null);
    }

    function drawGrid() {
      var map = state.map, ppg = map.ppg, sc = state.cam.scale;
      if (ppg * sc < 6) return; // too dense to be useful
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var x = 0; x <= map.widthPx + 0.5; x += ppg) {
        ctx.moveTo(w2sX(x), w2sY(0)); ctx.lineTo(w2sX(x), w2sY(map.heightPx));
      }
      for (var y = 0; y <= map.heightPx + 0.5; y += ppg) {
        ctx.moveTo(w2sX(0), w2sY(y)); ctx.lineTo(w2sX(map.widthPx), w2sY(y));
      }
      ctx.stroke();
      ctx.restore();
    }

    function drawToken(t) {
      var cx = w2sX(t.x), cy = w2sY(t.y);
      var w = t.w * state.cam.scale, h = t.h * state.cam.scale;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t.rot || 0);
      if (t.image && t.image.complete && t.image.naturalWidth) {
        ctx.drawImage(t.image, -w / 2, -h / 2, w, h);
      } else {
        ctx.fillStyle = t.color || "#c8a24a";
        ctx.beginPath();
        ctx.arc(0, 0, Math.min(w, h) / 2, 0, Math.PI * 2);
        ctx.fill();
        if (t.name) {
          ctx.fillStyle = "#1a1a1a";
          ctx.font = "bold " + Math.max(9, Math.min(w, h) / 3) + "px system-ui, sans-serif";
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(t.name.slice(0, 2).toUpperCase(), 0, 0);
        }
      }
      ctx.restore();
    }

    function blockingSegments() {
      var segs = state.map.walls.slice();
      state.map.doors.forEach(function (d) { if (d.closed) segs.push(d); });
      return segs;
    }

    function viewerTokens() {
      var vs = state.tokens.filter(function (t) { return t.isViewer; });
      return vs.length ? vs : [];
    }

    function drawFog() {
      var s = cssSize();
      fctx.clearRect(0, 0, s.w, s.h);
      // dark everywhere over the map rect
      fctx.save();
      fctx.fillStyle = "rgba(4,5,7," + state.fog.opacity + ")";
      fctx.fillRect(w2sX(0), w2sY(0), state.map.widthPx * state.cam.scale, state.map.heightPx * state.cam.scale);
      // punch out what each viewer sees
      fctx.globalCompositeOperation = "destination-out";
      fctx.fillStyle = "#000";
      var segs = blockingSegments();
      viewerTokens().forEach(function (t) {
        var poly = Vis.compute(segs, { x: t.x, y: t.y }, state.map.widthPx, state.map.heightPx);
        if (poly.length < 3) return;
        fctx.beginPath();
        fctx.moveTo(w2sX(poly[0].x), w2sY(poly[0].y));
        for (var i = 1; i < poly.length; i++) fctx.lineTo(w2sX(poly[i].x), w2sY(poly[i].y));
        fctx.closePath();
        fctx.fill();
      });
      fctx.restore();
      ctx.drawImage(fog, 0, 0, s.w, s.h);
    }

    function drawSelection(t) {
      if (!t) return;
      var cx = w2sX(t.x), cy = w2sY(t.y);
      var w = t.w * state.cam.scale, h = t.h * state.cam.scale;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t.rot || 0);
      ctx.strokeStyle = "#c8a24a"; ctx.lineWidth = 1.5;
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      // resize handle (bottom-right), rotate handle (above top-center)
      handleDot(w / 2, h / 2);
      ctx.beginPath(); ctx.moveTo(0, -h / 2); ctx.lineTo(0, -h / 2 - ROTATE_OFFSET); ctx.stroke();
      handleDot(0, -h / 2 - ROTATE_OFFSET);
      ctx.restore();
    }
    function handleDot(x, y) {
      ctx.fillStyle = "#c8a24a";
      ctx.beginPath(); ctx.arc(x, y, HANDLE_R, 0, Math.PI * 2); ctx.fill();
    }

    function drawRuler() {
      var r = state.ruler;
      var ax = w2sX(r.ax), ay = w2sY(r.ay), bx = w2sX(r.bx), by = w2sY(r.by);
      ctx.save();
      ctx.strokeStyle = "#4ea3ff"; ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
      ctx.setLineDash([]);
      var cells = Math.hypot(r.bx - r.ax, r.by - r.ay) / state.map.ppg;
      var feet = Math.round(cells * state.feetPerCell);
      var label = feet + " ft (" + (Math.round(cells * 10) / 10) + " sq)";
      ctx.font = "bold 13px system-ui, sans-serif";
      var tw = ctx.measureText(label).width + 12;
      ctx.fillStyle = "rgba(10,12,16,0.9)";
      ctx.fillRect(bx + 10, by - 12, tw, 22);
      ctx.fillStyle = "#dfe7f2"; ctx.textBaseline = "middle"; ctx.textAlign = "left";
      ctx.fillText(label, bx + 16, by - 1);
      ctx.restore();
      emit("ruler", { cells: cells, feet: feet, text: label });
    }

    // ---- hit testing --------------------------------------------------------
    function byId(id) { return state.tokens.filter(function (t) { return t.id === id; })[0] || null; }

    // pointer (screen) -> token-local coords, accounting for rotation/scale.
    function toLocal(t, sx, sy) {
      var wx = s2wX(sx) - t.x, wy = s2wY(sy) - t.y;
      var c = Math.cos(-(t.rot || 0)), s = Math.sin(-(t.rot || 0));
      return { x: wx * c - wy * s, y: wx * s + wy * c };
    }
    function tokenAt(sx, sy) {
      for (var i = state.tokens.length - 1; i >= 0; i--) {
        var t = state.tokens[i], l = toLocal(t, sx, sy);
        if (Math.abs(l.x) <= t.w / 2 && Math.abs(l.y) <= t.h / 2) return t;
      }
      return null;
    }
    // Which handle of the selected token (if any) is under the pointer?
    function handleAt(sx, sy) {
      var t = byId(state.selectedId);
      if (!t) return null;
      var cx = w2sX(t.x), cy = w2sY(t.y);
      var w = t.w * state.cam.scale, h = t.h * state.cam.scale;
      var rot = t.rot || 0, c = Math.cos(rot), s = Math.sin(rot);
      function pt(lx, ly) { return { x: cx + lx * c - ly * s, y: cy + lx * s + ly * c }; }
      var resize = pt(w / 2, h / 2);
      var rotate = pt(0, -h / 2 - ROTATE_OFFSET);
      if (Math.hypot(sx - rotate.x, sy - rotate.y) <= HANDLE_R + 3) return "rotate";
      if (Math.hypot(sx - resize.x, sy - resize.y) <= HANDLE_R + 3) return "resize";
      return null;
    }

    // ---- interaction --------------------------------------------------------
    var drag = null;
    function localPoint(e) {
      var r = canvas.getBoundingClientRect();
      var cx = (e.touches ? e.touches[0].clientX : e.clientX);
      var cy = (e.touches ? e.touches[0].clientY : e.clientY);
      return { x: cx - r.left, y: cy - r.top };
    }

    function onDown(e) {
      var p = localPoint(e);
      if (state.tool === "ruler") {
        state.ruler = { ax: s2wX(p.x), ay: s2wY(p.y), bx: s2wX(p.x), by: s2wY(p.y) };
        drag = { mode: "ruler" };
        scheduleRender();
        return;
      }
      if (state.tool === "select") {
        var h = handleAt(p.x, p.y);
        if (h) { drag = { mode: h, id: state.selectedId, sx: p.x, sy: p.y }; return; }
        var t = tokenAt(p.x, p.y);
        if (t) {
          state.selectedId = t.id;
          emit("select", t);
          drag = { mode: "move", id: t.id, dx: s2wX(p.x) - t.x, dy: s2wY(p.y) - t.y };
          scheduleRender();
          return;
        }
        // clicked empty space -> deselect + pan
        state.selectedId = null; emit("select", null);
      }
      drag = { mode: "pan", sx: p.x, sy: p.y, offX: state.cam.offX, offY: state.cam.offY };
      scheduleRender();
    }

    function onMove(e) {
      if (!drag) return;
      var p = localPoint(e);
      if (drag.mode === "pan") {
        state.cam.offX = drag.offX + (p.x - drag.sx);
        state.cam.offY = drag.offY + (p.y - drag.sy);
      } else if (drag.mode === "move") {
        var t = byId(drag.id); if (!t) return;
        t.x = s2wX(p.x) - drag.dx; t.y = s2wY(p.y) - drag.dy;
        emit("token", t);
      } else if (drag.mode === "resize") {
        var rt = byId(drag.id); if (!rt) return;
        var l = toLocal(rt, p.x, p.y);
        rt.w = Math.max(MIN_TOKEN, Math.abs(l.x) * 2);
        rt.h = Math.max(MIN_TOKEN, Math.abs(l.y) * 2);
        emit("token", rt);
      } else if (drag.mode === "rotate") {
        var ro = byId(drag.id); if (!ro) return;
        ro.rot = Math.atan2(s2wY(p.y) - ro.y, s2wX(p.x) - ro.x) + Math.PI / 2;
        emit("token", ro);
      } else if (drag.mode === "ruler") {
        state.ruler.bx = s2wX(p.x); state.ruler.by = s2wY(p.y);
      }
      scheduleRender();
    }

    function onUp() {
      if (drag && drag.mode === "ruler") { /* keep ruler visible until next tool use */ }
      drag = null;
    }

    function onWheel(e) {
      e.preventDefault();
      var p = localPoint(e);
      var before = { x: s2wX(p.x), y: s2wY(p.y) };
      var factor = Math.pow(1.0015, -e.deltaY);
      state.cam.scale = clamp(state.cam.scale * factor, 0.05, 12);
      // keep the world point under the cursor fixed
      state.cam.offX = p.x - before.x * state.cam.scale;
      state.cam.offY = p.y - before.y * state.cam.scale;
      scheduleRender();
    }

    function onKey(e) {
      var t = byId(state.selectedId);
      if (!t) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        removeToken(t.id); e.preventDefault();
      } else if (e.key === "[") { t.rot = (t.rot || 0) - Math.PI / 12; scheduleRender(); }
      else if (e.key === "]") { t.rot = (t.rot || 0) + Math.PI / 12; scheduleRender(); }
    }

    // ---- map + token loading ------------------------------------------------
    function loadImage(src) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () { resolve(img); };
        img.onerror = function () { reject(new Error("Could not load image: " + String(src).slice(0, 80))); };
        if (/^https?:|^data:/.test(src)) img.crossOrigin = "anonymous";
        img.src = src;
      });
    }

    function setMap(fields) {
      state.map = Object.assign(state.map, fields);
      scheduleRender();
    }

    function loadImageMap(src, ppg, srcType) {
      return loadImage(src).then(function (img) {
        setMap({
          image: img,
          widthPx: img.naturalWidth,
          heightPx: img.naturalHeight,
          ppg: ppg || state.map.ppg || 70,
          walls: [], doors: [],
          src: src, srcType: srcType || (/^data:/.test(src) ? "embedded" : "url"),
        });
        fitToMap();
        emit("map", state.map);
        return state.map;
      });
    }

    function loadUvtt(input) {
      var m = Uvtt.parse(input);
      var p = m.imageDataUrl ? loadImage(m.imageDataUrl) : Promise.resolve(null);
      return p.then(function (img) {
        setMap({
          image: img,
          widthPx: img ? img.naturalWidth : m.widthPx,
          heightPx: img ? img.naturalHeight : m.heightPx,
          ppg: m.ppg,
          walls: m.walls,
          doors: m.doors,
          src: m.imageDataUrl, srcType: "embedded",
        });
        fitToMap();
        emit("map", state.map);
        return state.map;
      });
    }

    function addToken(spec) {
      spec = spec || {};
      var ppg = state.map.ppg || 70;
      var t = {
        id: spec.id || uid(),
        name: spec.name || "",
        imageUrl: spec.imageUrl || null,
        image: null,
        x: typeof spec.x === "number" ? spec.x : s2wX(cssSize().w / 2),
        y: typeof spec.y === "number" ? spec.y : s2wY(cssSize().h / 2),
        w: spec.w || ppg, h: spec.h || ppg,
        rot: spec.rot || 0,
        ownerId: spec.ownerId || null,
        characterDocId: spec.characterDocId || null,
        isViewer: !!spec.isViewer,
        color: spec.color || "#c8a24a",
      };
      state.tokens.push(t);
      if (t.imageUrl) loadImage(t.imageUrl).then(function (img) { t.image = img; scheduleRender(); }, function () {});
      scheduleRender();
      emit("token", t);
      return t;
    }

    function removeToken(id) {
      state.tokens = state.tokens.filter(function (t) { return t.id !== id; });
      if (state.selectedId === id) { state.selectedId = null; emit("select", null); }
      scheduleRender();
    }

    // ---- scenes -------------------------------------------------------------
    // A scene is small JSON: map reference (link or embedded data-url) + walls/
    // doors + tokens + fog settings. No server, no storage — the DM saves this to
    // a local file (or the host app persists it to the DM's own account later).
    function toScene(name) {
      var m = state.map;
      return {
        kind: "dcc-vtt-scene",
        version: 1,
        name: name || "Scene",
        map: {
          srcType: m.srcType,           // "url" | "embedded"
          src: m.src,                   // URL, or data-url (embedded)
          ppg: m.ppg,
          widthPx: m.widthPx, heightPx: m.heightPx,
          walls: m.walls, doors: m.doors,
        },
        tokens: state.tokens.map(function (t) {
          return {
            id: t.id, name: t.name, imageUrl: t.imageUrl,
            x: t.x, y: t.y, w: t.w, h: t.h, rot: t.rot,
            ownerId: t.ownerId, characterDocId: t.characterDocId,
            isViewer: t.isViewer, color: t.color,
          };
        }),
        fog: { enabled: state.fog.enabled, opacity: state.fog.opacity },
        feetPerCell: state.feetPerCell,
        grid: state.grid,
      };
    }

    function loadScene(scene) {
      if (!scene || scene.kind !== "dcc-vtt-scene") throw new Error("Not a DCC VTT scene file.");
      state.tokens = [];
      state.selectedId = null;
      state.ruler = null;
      var m = scene.map || {};
      state.feetPerCell = scene.feetPerCell || 5;
      state.grid = scene.grid !== false;
      state.fog.enabled = !!(scene.fog && scene.fog.enabled);
      state.fog.opacity = (scene.fog && scene.fog.opacity) || 1;
      var done = function () {
        setMap({ ppg: m.ppg || 70, walls: m.walls || [], doors: m.doors || [], widthPx: m.widthPx || 0, heightPx: m.heightPx || 0, src: m.src, srcType: m.srcType });
        (scene.tokens || []).forEach(function (ts) { addToken(ts); });
        fitToMap();
        emit("scene", scene);
        return state.map;
      };
      if (m.src) {
        return loadImage(m.src).then(function (img) {
          state.map.image = img;
          if (img) { state.map.widthPx = img.naturalWidth; state.map.heightPx = img.naturalHeight; }
          return done();
        }, function () { state.map.image = null; return done(); });
      }
      state.map.image = null;
      return Promise.resolve(done());
    }

    // read a File (from an <input type=file>) — UVTT/JSON or an image.
    function loadFile(file) {
      var name = (file.name || "").toLowerCase();
      var isJson = /\.(uvtt|dd2vtt|df2vtt|json)$/.test(name) || file.type === "application/json";
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = function () { reject(new Error("Could not read file.")); };
        if (isJson) {
          reader.onload = function () {
            try {
              var obj = JSON.parse(reader.result);
              if (Uvtt.looksLikeUvtt(obj)) resolve(loadUvtt(obj));
              else if (obj && obj.kind === "dcc-vtt-scene") resolve(loadScene(obj));
              else reject(new Error("Unrecognized JSON — expected a UVTT or a DCC scene."));
            } catch (e) { reject(e); }
          };
          reader.readAsText(file);
        } else {
          reader.onload = function () { resolve(loadImageMap(reader.result, state.map.ppg, "embedded")); };
          reader.readAsDataURL(file);
        }
      });
    }

    // ---- camera helpers -----------------------------------------------------
    function fitToMap() {
      var m = state.map; if (!m.widthPx) return;
      var s = cssSize();
      var pad = 0.94;
      var sc = Math.min(s.w / m.widthPx, s.h / m.heightPx) * pad;
      state.cam.scale = clamp(sc, 0.05, 12);
      state.cam.offX = (s.w - m.widthPx * state.cam.scale) / 2;
      state.cam.offY = (s.h - m.heightPx * state.cam.scale) / 2;
      scheduleRender();
    }

    // ---- public API ---------------------------------------------------------
    canvas.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("keydown", onKey);
    root.addEventListener("resize", resize);
    resize();

    return {
      el: canvas,
      state: state,
      on: function (ev, cb) { (listeners[ev] = listeners[ev] || []).push(cb); return this; },
      loadUvtt: loadUvtt,
      loadImageMap: loadImageMap,
      loadFile: loadFile,
      addToken: addToken,
      removeToken: removeToken,
      getToken: byId,
      select: function (id) { state.selectedId = id; emit("select", byId(id)); scheduleRender(); },
      setTool: function (t) { state.tool = t; if (t !== "ruler") state.ruler = null; scheduleRender(); emit("tool", t); },
      getTool: function () { return state.tool; },
      setFog: function (on) { state.fog.enabled = !!on; scheduleRender(); },
      setShowAll: function (on) { state.fog.showAll = !!on; scheduleRender(); },
      setFogOpacity: function (o) { state.fog.opacity = clamp(o, 0.1, 1); scheduleRender(); },
      setGrid: function (on) { state.grid = !!on; scheduleRender(); },
      setPpg: function (n) { state.map.ppg = Math.max(4, n | 0); scheduleRender(); emit("map", state.map); },
      setFeetPerCell: function (n) { state.feetPerCell = Math.max(1, n) || 5; },
      fitToMap: fitToMap,
      toScene: toScene,
      loadScene: loadScene,
      resize: resize,
      render: render,
    };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { VTTBoard: VTTBoard };
  else root.VTTBoard = VTTBoard;
})(typeof window !== "undefined" ? window : this);
