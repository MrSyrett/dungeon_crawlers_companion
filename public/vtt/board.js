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

  function uid() { return "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function VTTBoard(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var fog = document.createElement("canvas"); // offscreen fog layer
    var fctx = fog.getContext("2d");

    var listeners = {};
    function emit(ev, payload) {
      // While applying remote (synced) state, don't re-fire change events — that
      // would make the network layer echo the update straight back out.
      if (state._remote && (ev === "token" || ev === "map" || ev === "scene")) return;
      (listeners[ev] || []).forEach(function (cb) { try { cb(payload); } catch (e) {} });
    }

    var state = {
      cam: { scale: 1, offX: 0, offY: 0 },
      map: { image: null, widthPx: 0, heightPx: 0, ppg: 70, walls: [], windows: [], doors: [], lights: [], src: null, srcType: null },
      tokens: [],
      tool: "select",       // select | lasso | pan | ruler | movement | rings | pointer | laser
      selectedId: null,
      selection: [],        // multi-select: ids of all selected tokens (lasso / shift)
      marquee: null,        // in-progress lasso rect { x1,y1,x2,y2 } in world coords
      fog: { enabled: false, opacity: 1, showAll: true },
      feetPerCell: 5,
      grid: true,
      ruler: null,          // { ax, ay, bx, by } in world coords
      moveMeas: null,       // live movement measurement while dragging { ax,ay,bx,by }
      rings: null,          // range-rings center { x, y } in world coords (transient)
      laser: null,          // local laser pointer { x, y } in world coords (transient)
      overlays: {},         // remote presence overlays, keyed by senderId (shared live)
      pings: [],            // transient "look here" markers
      snap: true,           // snap tokens to the grid
      fogSetup: false,      // GM: show walls / edit doors
      setupTool: "select",  // select | wall | window | door | erase (setup sub-tool)
      segDraft: null,       // barrier being drawn in setup mode { x1,y1,x2,y2,kind }
      wallPath: null,       // in-progress polygon wall { pts:[{x,y}] } (Wall tool)
      wallHover: null,      // {x,y} cursor point for the wall rubber-band
      gm: false,            // this board belongs to the GM (sees hidden tokens)
      collide: false,       // enforce barrier collision on this board's own moves
      dpr: opts.dpr || (root.devicePixelRatio || 1),
      _remote: false,
      _geomVer: 0,          // bumped on any wall/window/door structural change (fog cache key)
    };
    function bumpGeom() { state._geomVer++; }
    var canMove = opts.canMove || function () { return true; };
    function snapTok(t) {
      if (!state.snap || !state.map.ppg) return;
      var g = state.map.ppg;
      t.x = Math.round((t.x - t.w / 2) / g) * g + t.w / 2;
      t.y = Math.round((t.y - t.h / 2) / g) * g + t.h / 2;
    }
    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    // snap a world point to the nearest grid vertex (for clean wall drawing)
    function snapVertex(x, y) {
      if (!state.snap || !state.map.ppg) return { x: x, y: y };
      var g = state.map.ppg; return { x: Math.round(x / g) * g, y: Math.round(y / g) * g };
    }
    function segDist(px, py, s) {
      var vx = s.x2 - s.x1, vy = s.y2 - s.y1, wx = px - s.x1, wy = py - s.y1;
      var L = vx * vx + vy * vy, t = L ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / L)) : 0;
      var dx = s.x1 + t * vx - px, dy = s.y1 + t * vy - py;
      return Math.hypot(dx, dy);
    }
    // Remove the nearest barrier of ANY kind (wall, window, or drawn door) near
    // a world point — used by the setup Erase tool and a short "click" draw.
    function removeSegNear(x, y) {
      var g = state.map.ppg || 70, best = null, bi = -1, bd = g * 0.45;
      ["walls", "windows", "doors"].forEach(function (key) {
        var arr = state.map[key] || [];
        for (var i = 0; i < arr.length; i++) {
          var d = segDist(x, y, arr[i]);
          if (d < bd) { bd = d; best = key; bi = i; }
        }
      });
      if (best) { state.map[best].splice(bi, 1); bumpGeom(); return true; }
      return false;
    }
    // For the Select tool: find the barrier endpoint(s) near a world point. Any
    // endpoints sharing that location (a polygon corner) are grouped so they move
    // together. Returns [{seg, kx, ky}] or null.
    function pickVertices(wx, wy) {
      var g = state.map.ppg || 70, thr = g * 0.4, best = null, bd = thr;
      ["walls", "windows", "doors"].forEach(function (kk) {
        (state.map[kk] || []).forEach(function (seg) {
          [["x1", "y1"], ["x2", "y2"]].forEach(function (e) {
            var d = Math.hypot(seg[e[0]] - wx, seg[e[1]] - wy);
            if (d < bd) { bd = d; best = { x: seg[e[0]], y: seg[e[1]] }; }
          });
        });
      });
      if (!best) return null;
      var group = [];
      ["walls", "windows", "doors"].forEach(function (kk) {
        (state.map[kk] || []).forEach(function (seg) {
          [["x1", "y1"], ["x2", "y2"]].forEach(function (e) {
            if (Math.hypot(seg[e[0]] - best.x, seg[e[1]] - best.y) < 1) group.push({ seg: seg, kx: e[0], ky: e[1] });
          });
        });
      });
      return group.length ? group : null;
    }
    // Finish (or cancel) an in-progress polygon-wall being drawn with the Wall tool.
    function finishWallPath() {
      if (!state.wallPath) return;
      state.wallPath = null; state.wallHover = null;
      emit("map", state.map); scheduleRender();
    }
    // Segment/segment intersection: returns the parameter t in [0,1] along a->b
    // at which it crosses c->d, or null if they don't cross.
    function segHit(ax, ay, bx, by, cx, cy, dx, dy) {
      var r_x = bx - ax, r_y = by - ay, s_x = dx - cx, s_y = dy - cy;
      var denom = r_x * s_y - r_y * s_x;
      if (Math.abs(denom) < 1e-9) return null; // parallel
      var t = ((cx - ax) * s_y - (cy - ay) * s_x) / denom;
      var u = ((cx - ax) * r_y - (cy - ay) * r_x) / denom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return t;
      return null;
    }
    // Barriers that stop MOVEMENT: walls + windows + shut doors. (Windows stop
    // movement but not sight; sight uses blockingSegments() which omits windows.)
    function movementSegments() {
      var segs = state.map.walls.slice();
      (state.map.windows || []).forEach(function (w) { segs.push(w); });
      state.map.doors.forEach(function (d) { if (d.closed || d.locked) segs.push(d); });
      return segs;
    }
    // Movement is tested along the token's CENTRE plus, for a token wider than a
    // point, two rays offset by `rad` perpendicular to the direction of travel —
    // so a large (2×2+) token's leading edges can't clip a wall corner the centre
    // would clear. `rad` defaults to 0 (a point).
    function moveRays(ax, ay, bx, by, rad) {
      if (!rad) return [[ax, ay, bx, by]];
      var dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1;
      var nx = -dy / L * rad, ny = dx / L * rad;
      return [[ax, ay, bx, by], [ax + nx, ay + ny, bx + nx, by + ny], [ax - nx, ay - ny, bx - nx, by - ny]];
    }
    // Does the token (centre a->b, half-width `rad`) cross any movement barrier?
    function pathBlocked(ax, ay, bx, by, rad) {
      var segs = movementSegments(), rays = moveRays(ax, ay, bx, by, rad);
      for (var r = 0; r < rays.length; r++) {
        var q = rays[r];
        for (var i = 0; i < segs.length; i++) {
          var s = segs[i];
          if (segHit(q[0], q[1], q[2], q[3], s.x1, s.y1, s.x2, s.y2) !== null) return true;
        }
      }
      return false;
    }
    // Furthest point along the centre path a->b that keeps the token (half-width
    // `rad`) clear of every barrier, stopping a hair short so it never sits on a
    // line — a grid-snap onto a wall can't leave it straddling.
    function clampMove(ax, ay, bx, by, rad) {
      var segs = movementSegments(), rays = moveRays(ax, ay, bx, by, rad), best = Infinity;
      for (var r = 0; r < rays.length; r++) {
        var q = rays[r];
        for (var i = 0; i < segs.length; i++) {
          var t = segHit(q[0], q[1], q[2], q[3], segs[i].x1, segs[i].y1, segs[i].x2, segs[i].y2);
          if (t !== null && t < best) best = t;
        }
      }
      if (best === Infinity) return { x: bx, y: by, hit: false };
      // Pull back a fixed ~2px along the path (independent of move length) so the
      // stop point is just shy of the barrier regardless of how far the drag was.
      var len = Math.hypot(bx - ax, by - ay) || 1;
      var t2 = Math.max(0, best - 2 / len);
      return { x: ax + (bx - ax) * t2, y: ay + (by - ay) * t2, hit: true };
    }
    // Half-width used for a token's collision rays (a bit inside its disc).
    function tokMoveRad(t) { return Math.max(0, Math.min(t.w, t.h) / 2 - state.map.ppg * 0.08); }
    function now() { return root.performance && root.performance.now ? root.performance.now() : Date.now(); }

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

      // doors sit above the map/tokens but below the fog, so a player can't see
      // a door in an unrevealed area.
      if (map.doors && map.doors.length && map.ppg * state.cam.scale > 8) drawDoors();

      // fog on top of map + tokens (players can't see hidden tokens either)
      if (state.fog.enabled && !state.fog.showAll && map.widthPx) drawFog();

      // fog setup overlay (GM): show the walls so they can be seen while prepping
      if (state.fogSetup && map.widthPx) drawSetup();

      drawSelections();
      if (state.ruler) drawRuler();
      if (state.moveMeas) drawMeasureLine(state.moveMeas.ax, state.moveMeas.ay, state.moveMeas.bx, state.moveMeas.by, "#7fd6a1");
      if (state.rings) drawRings(state.rings, null);
      drawMarquee();
      drawOverlays();
      if (state.laser) drawLaser(state.laser.x, state.laser.y, "#ff5a5a");
      drawPings();
      emit("render", null);
    }

    // ---- doors --------------------------------------------------------------
    function doorMid(d) { return { x: (d.x1 + d.x2) / 2, y: (d.y1 + d.y2) / 2 }; }
    function doorBadgeR() { return Math.max(9, Math.min(15, state.map.ppg * state.cam.scale * 0.22)); }
    function drawDoors() {
      var R = doorBadgeR();
      state.map.doors.forEach(function (d) {
        var m = doorMid(d), cx = w2sX(m.x), cy = w2sY(m.y);
        var closed = d.closed || d.locked;
        var col = d.locked ? "#c8503a" : closed ? "#c8a24a" : "#5ac26a";
        ctx.save();
        ctx.translate(cx, cy);
        // the door leaf, along the doorway, dimmed when open
        var ang = Math.atan2(d.y2 - d.y1, d.x2 - d.x1);
        ctx.rotate(ang);
        var half = Math.max(R, Math.hypot(d.x2 - d.x1, d.y2 - d.y1) * state.cam.scale / 2);
        ctx.globalAlpha = closed ? 0.9 : 0.28;
        ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(-half, 0); ctx.lineTo(half, 0); ctx.stroke();
        ctx.rotate(-ang);
        // badge
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10,12,16,0.92)"; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = col; ctx.stroke();
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = Math.max(1.5, R * 0.16);
        if (d.locked) { // padlock
          ctx.strokeRect(-R * 0.32, -R * 0.05, R * 0.64, R * 0.5);
          ctx.beginPath(); ctx.arc(0, -R * 0.05, R * 0.28, Math.PI, 0); ctx.stroke();
        } else if (closed) { // closed bar
          ctx.fillRect(-R * 0.42, -R * 0.14, R * 0.84, R * 0.28);
        } else { // open (ajar) chevron
          ctx.beginPath(); ctx.moveTo(-R * 0.3, -R * 0.35); ctx.lineTo(R * 0.35, 0); ctx.lineTo(-R * 0.3, R * 0.35); ctx.stroke();
        }
        ctx.restore();
      });
    }
    function doorAt(sx, sy) {
      if (!state.map.doors) return -1;
      var R = doorBadgeR() + 4;
      for (var i = state.map.doors.length - 1; i >= 0; i--) {
        var m = doorMid(state.map.doors[i]);
        if (Math.hypot(sx - w2sX(m.x), sy - w2sY(m.y)) <= R) return i;
      }
      return -1;
    }
    function drawSetup() {
      ctx.save();
      ctx.lineCap = "round";
      // walls — solid blue
      ctx.strokeStyle = "rgba(78,163,255,0.75)"; ctx.lineWidth = 3;
      ctx.beginPath();
      state.map.walls.forEach(function (w) { ctx.moveTo(w2sX(w.x1), w2sY(w.y1)); ctx.lineTo(w2sX(w.x2), w2sY(w.y2)); });
      ctx.stroke();
      // windows — dashed cyan (block movement, transparent to sight)
      ctx.strokeStyle = "rgba(90,220,235,0.9)"; ctx.lineWidth = 3; ctx.setLineDash([7, 5]);
      ctx.beginPath();
      (state.map.windows || []).forEach(function (w) { ctx.moveTo(w2sX(w.x1), w2sY(w.y1)); ctx.lineTo(w2sX(w.x2), w2sY(w.y2)); });
      ctx.stroke(); ctx.setLineDash([]);
      // doors — faint gold underline beneath their badges so they read as barriers
      ctx.strokeStyle = "rgba(230,198,106,0.55)"; ctx.lineWidth = 3;
      ctx.beginPath();
      state.map.doors.forEach(function (d) { ctx.moveTo(w2sX(d.x1), w2sY(d.y1)); ctx.lineTo(w2sX(d.x2), w2sY(d.y2)); });
      ctx.stroke();
      // endpoints for walls + windows
      ctx.fillStyle = "#4ea3ff";
      state.map.walls.forEach(function (w) {
        ctx.beginPath(); ctx.arc(w2sX(w.x1), w2sY(w.y1), 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(w2sX(w.x2), w2sY(w.y2), 2.5, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = "#5adceb";
      (state.map.windows || []).forEach(function (w) {
        ctx.beginPath(); ctx.arc(w2sX(w.x1), w2sY(w.y1), 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(w2sX(w.x2), w2sY(w.y2), 2.5, 0, Math.PI * 2); ctx.fill();
      });
      // draft being drawn (colour hints the kind)
      if (state.segDraft) {
        var d = state.segDraft;
        ctx.strokeStyle = d.kind === "window" ? "#5adceb" : d.kind === "door" ? "#e6c66a" : "#e6c66a";
        ctx.lineWidth = 3;
        if (d.kind === "window") ctx.setLineDash([7, 5]);
        ctx.beginPath(); ctx.moveTo(w2sX(d.x1), w2sY(d.y1)); ctx.lineTo(w2sX(d.x2), w2sY(d.y2)); ctx.stroke();
        ctx.setLineDash([]);
      }
      // in-progress polygon wall (Wall tool): committed segments already show as
      // walls; here we draw the rubber-band from the last point to the cursor and
      // a marker on the first point (click it to close).
      if (state.wallPath && state.wallPath.pts.length) {
        var pts = state.wallPath.pts, lastP = pts[pts.length - 1];
        if (state.wallHover) {
          ctx.strokeStyle = "#e6c66a"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
          ctx.beginPath(); ctx.moveTo(w2sX(lastP.x), w2sY(lastP.y)); ctx.lineTo(w2sX(state.wallHover.x), w2sY(state.wallHover.y)); ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.fillStyle = "#e6c66a";
        pts.forEach(function (pt) { ctx.beginPath(); ctx.arc(w2sX(pt.x), w2sY(pt.y), 3, 0, Math.PI * 2); ctx.fill(); });
        // ring the first point so it reads as "click here to close"
        ctx.strokeStyle = "#e6c66a"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(w2sX(pts[0].x), w2sY(pts[0].y), 6, 0, Math.PI * 2); ctx.stroke();
      }
      // Select tool: enlarge the grab handles so endpoints are easy to hit.
      if (state.setupTool === "select") {
        ctx.fillStyle = "#e6c66a";
        ["walls", "windows", "doors"].forEach(function (kk) {
          (state.map[kk] || []).forEach(function (w) {
            ctx.beginPath(); ctx.arc(w2sX(w.x1), w2sY(w.y1), 4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(w2sX(w.x2), w2sY(w.y2), 4, 0, Math.PI * 2); ctx.fill();
          });
        });
      }
      ctx.restore();
    }

    function drawPings() {
      if (!state.pings.length) return;
      var t = now(), alive = [];
      for (var i = 0; i < state.pings.length; i++) {
        var p = state.pings[i], age = t - p.t0;
        if (age > 1100) continue;
        alive.push(p);
        var k = age / 1100, r = 8 + 34 * k;
        ctx.save();
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = p.color || "#4ea3ff";
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(w2sX(p.x), w2sY(p.y), r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }
      state.pings = alive;
      if (alive.length) scheduleRender();
    }

    function ping(x, y, color) {
      state.pings.push({ x: x, y: y, color: color || "#4ea3ff", t0: now() });
      scheduleRender();
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
      // Hidden tokens are invisible to players; the GM sees them ghosted.
      if (t.hidden && !state.gm) return;
      var cx = w2sX(t.x), cy = w2sY(t.y);
      var w = t.w * state.cam.scale, h = t.h * state.cam.scale;
      var r = Math.min(w, h) / 2;
      var ring = t.color || "#c8a24a";
      ctx.save();
      ctx.translate(cx, cy);
      if (t.hidden) ctx.globalAlpha = 0.42; // GM-only ghost
      // drop shadow disc
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.55)"; ctx.shadowBlur = Math.min(10, r * 0.4); ctx.shadowOffsetY = 2;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = "#10141a"; ctx.fill();
      ctx.restore();
      if (t.image && t.image.complete && t.image.naturalWidth) {
        ctx.save();
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip();
        ctx.rotate(t.rot || 0);
        var iw = t.image.naturalWidth, ih = t.image.naturalHeight;
        var s = Math.max((2 * r) / iw, (2 * r) / ih); // cover-fit
        ctx.drawImage(t.image, -iw * s / 2, -ih * s / 2, iw * s, ih * s);
        ctx.restore();
      } else {
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = ring; ctx.fill();
        if (t.name && r > 8) {
          ctx.fillStyle = "#12151a";
          ctx.font = "800 " + Math.max(9, r * 0.85) + "px 'Barlow Condensed', system-ui, sans-serif";
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(t.name.slice(0, 2).toUpperCase(), 0, 1);
        }
      }
      // Optional colored ring — OFF by default, turned on per-token from the
      // right-click menu (with a color). An imageless token still shows its disc
      // fill (above) so it's always visible.
      if (t.ring) {
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.lineWidth = Math.max(2, r * 0.09); ctx.strokeStyle = t.ringColor || ring; ctx.stroke();
      }
      ctx.restore();
      if (r > 11) {
        if (t.hidden) { ctx.save(); ctx.globalAlpha = 0.42; drawNamePlate(t, cx, cy, r); ctx.restore(); }
        else drawNamePlate(t, cx, cy, r);
      }
    }

    function drawNamePlate(t, cx, cy, r) {
      var y = cy + r + 4;
      ctx.save();
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      if (t.name) {
        ctx.font = "600 " + Math.min(13, Math.max(10, r * 0.5)) + "px system-ui, sans-serif";
        var tw = ctx.measureText(t.name).width, bw = tw + 12, bh = 16;
        ctx.fillStyle = "rgba(9,11,15,0.86)"; roundRect(cx - bw / 2, y, bw, bh, 4); ctx.fill();
        ctx.fillStyle = "#e6ebf2"; ctx.fillText(t.name, cx, y + bh / 2 + 0.5);
        y += bh + 3;
      }
      if (t.hp && t.hp.max > 0) {
        var w2 = Math.max(30, r * 2), h2 = 5, k = Math.max(0, Math.min(1, t.hp.cur / t.hp.max));
        ctx.fillStyle = "rgba(0,0,0,0.6)"; roundRect(cx - w2 / 2, y, w2, h2, 2); ctx.fill();
        ctx.fillStyle = k > 0.5 ? "#5ac26a" : k > 0.25 ? "#d8b24a" : "#c8503a";
        roundRect(cx - w2 / 2, y, w2 * k, h2, 2); ctx.fill();
      }
      ctx.restore();
    }

    function blockingSegments() {
      var segs = state.map.walls.slice();
      state.map.doors.forEach(function (d) { if (d.closed || d.locked) segs.push(d); });
      return segs;
    }

    function viewerTokens() {
      var vs = state.tokens.filter(function (t) { return t.isViewer; });
      return vs.length ? vs : [];
    }

    // A cheap signature of everything that changes what's visible EXCEPT camera and
    // token positions: wall/window counts, each door's shut state, grid, map
    // size. Visibility polygons live in world space, so panning/zooming doesn't
    // change them — only a viewer moving or this signature changing does. We key
    // the polygon cache on it so a pan/zoom just re-blits instead of recomputing.
    function geomSig() {
      var m = state.map, ds = "";
      for (var i = 0; i < m.doors.length; i++) { var d = m.doors[i]; ds += (d.closed || d.locked) ? "1" : "0"; }
      // Two structural components so ANY mutation path invalidates the cache:
      // wall/window COUNTS catch a direct push/splice, and _geomVer catches a
      // same-count array swap (e.g. an edit or a wholesale replace over the wire).
      // Door open/close is an in-place flag, captured separately in `ds`.
      return state._geomVer + "|" + m.walls.length + "|" + (m.windows ? m.windows.length : 0) + "|" +
        ds + "|" + m.ppg + "|" + m.widthPx + "x" + m.heightPx;
    }
    function fillFogPoly(poly) { fillPolyInto(fctx, poly); }
    function fillPolyInto(c, poly) {
      if (!poly || poly.length < 3) return;
      c.beginPath();
      c.moveTo(w2sX(poly[0].x), w2sY(poly[0].y));
      for (var i = 1; i < poly.length; i++) c.lineTo(w2sX(poly[i].x), w2sY(poly[i].y));
      c.closePath();
      c.fill();
    }

    // Fog of war via a simple VISION model: each viewer sees its line of sight
    // (walls + closed/locked doors block; windows are transparent to sight),
    // clamped to that token's vision distance — `null`/unset = unlimited, else a
    // number of cells. Scene lights don't affect vision. The union of all viewers'
    // visible areas is punched out of the fog.
    function visionRadius(t) {
      return (typeof t.vision === "number" && t.vision > 0) ? t.vision * state.map.ppg : Infinity;
    }
    function drawFog() {
      var s = cssSize();
      fctx.clearRect(0, 0, s.w, s.h);
      fctx.save();
      fctx.fillStyle = "rgba(4,5,7," + state.fog.opacity + ")";
      fctx.fillRect(w2sX(0), w2sY(0), state.map.widthPx * state.cam.scale, state.map.heightPx * state.cam.scale);

      var sig = geomSig(), mapW = state.map.widthPx, mapH = state.map.heightPx;
      var segs = null;
      function segsOnce() { if (!segs) segs = blockingSegments(); return segs; }

      fctx.globalCompositeOperation = "destination-out";
      fctx.fillStyle = "#000";
      viewerTokens().forEach(function (t) {
        var radius = visionRadius(t);
        // Cache the polygon by position + vision + geometry; a pan/zoom just re-blits.
        var key = t.x + "," + t.y + "," + radius + "|" + sig;
        if (t._fogKey !== key || !t._fogPoly) {
          t._fogPoly = Vis.compute(segsOnce(), { x: t.x, y: t.y }, mapW, mapH, { radius: radius });
          t._fogKey = key;
        }
        fillFogPoly(t._fogPoly);
      });
      fctx.restore();
      ctx.drawImage(fog, 0, 0, s.w, s.h);
    }

    function drawSelection(t) {
      if (!t) return;
      var cx = w2sX(t.x), cy = w2sY(t.y);
      var w = t.w * state.cam.scale, h = t.h * state.cam.scale, r = Math.min(w, h) / 2;
      ctx.save();
      // A clean selection halo — no rotate/resize handles (size is set from the
      // right-click menu; move with drag or the arrow keys).
      ctx.strokeStyle = "#e6c66a"; ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.arc(cx, cy, r + 3, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
    // Halo every selected token. `selection` is the multi-select set; for a single
    // click-select we fall back to selectedId so old callers keep working.
    function selectedList() {
      if (state.selection && state.selection.length) return state.selection.map(byId).filter(Boolean);
      var t = byId(state.selectedId); return t ? [t] : [];
    }
    function drawSelections() { selectedList().forEach(drawSelection); }

    // The lasso marquee rectangle while dragging it out.
    function drawMarquee() {
      var m = state.marquee; if (!m) return;
      var x = w2sX(Math.min(m.x1, m.x2)), y = w2sY(Math.min(m.y1, m.y2));
      var w = Math.abs(m.x2 - m.x1) * state.cam.scale, h = Math.abs(m.y2 - m.y1) * state.cam.scale;
      ctx.save();
      ctx.fillStyle = "rgba(120,170,255,0.12)";
      ctx.strokeStyle = "#6ea8ff"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 3]);
      ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]); ctx.restore();
    }

    // A measuring line + distance chip between two WORLD points (shared by the
    // ruler, the movement overlay and remote overlays).
    function drawMeasureLine(ax, ay, bx, by, color) {
      var sax = w2sX(ax), say = w2sY(ay), sbx = w2sX(bx), sby = w2sY(by);
      ctx.save();
      ctx.strokeStyle = color || "#4ea3ff"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(sax, say); ctx.lineTo(sbx, sby); ctx.stroke();
      ctx.setLineDash([]);
      // Round to whole squares (feet follow as whole squares × ft/cell, i.e. the
      // nearest 5 ft by default) so measurements read in clean grid steps.
      var cells = Math.round(Math.hypot(bx - ax, by - ay) / (state.map.ppg || 70));
      var feet = cells * state.feetPerCell;
      var label = feet + " ft (" + cells + " sq)";
      ctx.font = "bold 13px system-ui, sans-serif";
      var tw = ctx.measureText(label).width + 12;
      ctx.fillStyle = "rgba(10,12,16,0.9)"; ctx.fillRect(sbx + 10, sby - 12, tw, 22);
      ctx.fillStyle = "#dfe7f2"; ctx.textBaseline = "middle"; ctx.textAlign = "left";
      ctx.fillText(label, sbx + 16, sby - 1);
      ctx.restore();
      return { cells: cells, feet: feet, text: label };
    }

    // Range rings at a WORLD center: Close 1sq/5ft, Near 6sq/30ft, Far 12sq/60ft.
    var RING_BANDS = [{ sq: 1, name: "Close" }, { sq: 6, name: "Near" }, { sq: 12, name: "Far" }];
    function drawRings(c, color) {
      var ppg = state.map.ppg || 70, sc = state.cam.scale, cx = w2sX(c.x), cy = w2sY(c.y);
      ctx.save();
      ctx.textBaseline = "middle"; ctx.textAlign = "center"; ctx.font = "bold 12px system-ui, sans-serif";
      for (var i = RING_BANDS.length - 1; i >= 0; i--) {
        // Draw half a square larger than the band so a token that many squares away
        // sits INSIDE the ring (measured from the source token's edge).
        var b = RING_BANDS[i], rad = (b.sq + 0.5) * ppg * sc;
        ctx.strokeStyle = color || "#7fd6a1"; ctx.globalAlpha = 0.85; ctx.lineWidth = 1.6;
        ctx.setLineDash([7, 5]);
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        var label = b.name + " · " + (b.sq * state.feetPerCell) + " ft";
        var tw = ctx.measureText(label).width + 10;
        ctx.globalAlpha = 1; ctx.fillStyle = "rgba(10,12,16,0.85)";
        ctx.fillRect(cx - tw / 2, cy - rad - 9, tw, 18);
        ctx.fillStyle = "#dfe7f2"; ctx.fillText(label, cx, cy - rad);
      }
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fillStyle = color || "#7fd6a1"; ctx.fill();
      ctx.restore();
    }

    // A laser-pointer dot (glowing) at a WORLD point.
    function drawLaser(wx, wy, color) {
      var x = w2sX(wx), y = w2sY(wy);
      ctx.save();
      var grd = ctx.createRadialGradient(x, y, 0, x, y, 16);
      grd.addColorStop(0, color || "#ff5a5a"); grd.addColorStop(1, "rgba(255,90,90,0)");
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = color || "#ff5a5a"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }

    // Remote presence overlays (shared live from other peers): a laser dot, a
    // measure line, or range rings, each keyed by the sender. Stale ones expire.
    function drawOverlays() {
      var keys = Object.keys(state.overlays), any = false;
      for (var i = 0; i < keys.length; i++) {
        var o = state.overlays[keys[i]];
        if (!o) continue;
        if (o.exp && now() > o.exp) { delete state.overlays[keys[i]]; continue; }
        any = true;
        if (o.kind === "laser") drawLaser(o.x, o.y, o.color || "#ff5a5a");
        else if (o.kind === "measure") drawMeasureLine(o.ax, o.ay, o.bx, o.by, o.color || "#4ea3ff");
        else if (o.kind === "rings") drawRings({ x: o.x, y: o.y }, o.color || "#7fd6a1");
      }
      if (any) scheduleRender();
    }

    function drawRuler() {
      var r = state.ruler;
      var m = drawMeasureLine(r.ax, r.ay, r.bx, r.by, r.color || "#4ea3ff");
      emit("ruler", m);
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

    // ---- interaction --------------------------------------------------------
    var drag = null;
    var pointers = {}; // active pointerId -> {x,y} in canvas space (for pinch)
    var pinch = null;  // two-finger gesture baseline
    function activePointers() { return Object.keys(pointers); }
    function beginPinch() {
      drag = null; state.segDraft = null; // a second finger cancels any 1-finger action
      var ids = activePointers(), a = pointers[ids[0]], b = pointers[ids[1]];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      pinch = { scale0: state.cam.scale, dist0: Math.hypot(a.x - b.x, a.y - b.y) || 1, worldX: s2wX(mx), worldY: s2wY(my) };
    }
    function updatePinch() {
      var ids = activePointers(); if (ids.length < 2) return;
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      var ns = clamp(pinch.scale0 * (dist / pinch.dist0), 0.05, 12);
      state.cam.scale = ns;
      // keep the world point first under the two fingers pinned to their moving
      // midpoint — so a pinch both zooms and pans naturally.
      state.cam.offX = mx - pinch.worldX * ns;
      state.cam.offY = my - pinch.worldY * ns;
    }
    function localPoint(e) {
      var r = canvas.getBoundingClientRect();
      var cx = (e.touches ? e.touches[0].clientX : e.clientX);
      var cy = (e.touches ? e.touches[0].clientY : e.clientY);
      return { x: cx - r.left, y: cy - r.top };
    }

    // Setup-mode pointer-down: behaviour depends on the active sub-tool.
    function setupDown(p) {
      var wx = s2wX(p.x), wy = s2wY(p.y);

      // SELECT: click a door badge to open/close it; grab a barrier endpoint to
      // move it; otherwise pan the map.
      if (state.setupTool === "select") {
        var dp = doorAt(p.x, p.y);
        if (dp >= 0) { emit("doorclick", { index: dp }); return; }
        var grp = pickVertices(wx, wy);
        if (grp) { drag = { mode: "vertex", grp: grp }; return; }
        drag = { mode: "pan", sx: p.x, sy: p.y, offX: state.cam.offX, offY: state.cam.offY };
        return;
      }

      // ERASE: delete whatever barrier you click.
      if (state.setupTool === "erase") {
        if (removeSegNear(wx, wy)) emit("map", state.map);
        scheduleRender(); return;
      }

      // WALL: click-to-place polygon, like a map-maker polygon tool. Each click
      // drops a vertex and draws a segment from the previous one; click back on the
      // first point (or Esc / right-click) to finish.
      if (state.setupTool === "wall") {
        var v = snapVertex(wx, wy);
        if (!state.wallPath) { state.wallPath = { pts: [v] }; state.wallHover = v; scheduleRender(); return; }
        var pts = state.wallPath.pts, first = pts[0], last = pts[pts.length - 1];
        var closing = pts.length >= 2 && Math.hypot(v.x - first.x, v.y - first.y) < (state.map.ppg || 70) * 0.4;
        var target = closing ? first : v;
        if (target.x !== last.x || target.y !== last.y) { state.map.walls.push({ x1: last.x, y1: last.y, x2: target.x, y2: target.y }); bumpGeom(); }
        if (closing) { finishWallPath(); } else { pts.push(v); emit("map", state.map); scheduleRender(); }
        return;
      }

      // WINDOW / DOOR: drag out a single segment.
      var sv = snapVertex(wx, wy);
      var kind = state.setupTool;
      drag = { mode: "seg", kind: kind, x1: sv.x, y1: sv.y, x2: sv.x, y2: sv.y };
      state.segDraft = { x1: sv.x, y1: sv.y, x2: sv.x, y2: sv.y, kind: kind };
      scheduleRender();
    }

    function emitOverlay(kind, data) {
      emit("overlay", kind ? Object.assign({ kind: kind }, data) : { kind: null });
    }

    function onDown(e) {
      // Right/middle mouse buttons belong to the contextmenu handler (token options
      // / door lock). Without this guard a right-click would ALSO run a left-click
      // action first — e.g. toggling a door open a frame before locking it.
      if (typeof e.button === "number" && e.button > 0) return;
      // Multi-touch: two fingers = pinch-zoom + two-finger pan (tablets/phones).
      if (typeof e.pointerId !== "undefined") pointers[e.pointerId] = localPoint(e);
      if (activePointers().length >= 2) { beginPinch(); return; }
      var p = localPoint(e), tool = state.tool, wx = s2wX(p.x), wy = s2wY(p.y);

      if (tool === "ruler") {
        state.ruler = { ax: wx, ay: wy, bx: wx, by: wy };
        drag = { mode: "ruler" }; emitOverlay("measure", { ax: wx, ay: wy, bx: wx, by: wy });
        scheduleRender(); return;
      }
      if (tool === "rings") {
        state.rings = { x: wx, y: wy };
        drag = { mode: "rings" }; emitOverlay("rings", { x: wx, y: wy });
        scheduleRender(); return;
      }
      if (tool === "pointer") { ping(wx, wy, "#4ea3ff"); emit("ping", { x: wx, y: wy }); return; }
      if (tool === "laser") {
        state.laser = { x: wx, y: wy };
        drag = { mode: "laser" }; emitOverlay("laser", { x: wx, y: wy });
        scheduleRender(); return;
      }
      if (tool === "lasso") {
        if (state.fogSetup) { setupDown(p); return; }
        state.marquee = { x1: wx, y1: wy, x2: wx, y2: wy };
        drag = { mode: "lasso" }; scheduleRender(); return;
      }
      if (tool === "select" || tool === "movement") {
        // Fog setup mode owns clicks: draw/erase/lock barriers by sub-tool.
        if (state.fogSetup) { setupDown(p); return; }
        // door badges are interactive UI on the map (open/close/lock)
        var di = doorAt(p.x, p.y);
        if (di >= 0) { emit("doorclick", { index: di }); return; }
        var t = tokenAt(p.x, p.y);
        if (t) {
          // Grabbing a token that's part of a multi-selection drags the whole
          // group; otherwise it becomes the single selection.
          var inSel = state.selection.indexOf(t.id) >= 0 && state.selection.length > 1;
          if (!inSel) { state.selection = [t.id]; }
          state.selectedId = t.id;
          emit("select", t);
          if (canMove(t)) {
            var ids = inSel ? state.selection.filter(function (id) { var m = byId(id); return m && canMove(m); }) : [t.id];
            var members = ids.map(function (id) { var m = byId(id); return { id: id, ox: m.x, oy: m.y, lastX: m.x, lastY: m.y }; });
            drag = { mode: "move", id: t.id, dx: s2wX(p.x) - t.x, dy: s2wY(p.y) - t.y, gx0: t.x, gy0: t.y, members: members, measure: tool === "movement" };
            if (tool === "movement") { state.moveMeas = { ax: t.x, ay: t.y, bx: t.x, by: t.y }; emitOverlay("measure", state.moveMeas); }
          }
          scheduleRender();
          return;
        }
        // clicked empty space -> deselect + pan
        state.selectedId = null; state.selection = []; emit("select", null);
      }
      drag = { mode: "pan", sx: p.x, sy: p.y, offX: state.cam.offX, offY: state.cam.offY };
      scheduleRender();
    }

    function onMove(e) {
      if (typeof e.pointerId !== "undefined" && pointers[e.pointerId]) pointers[e.pointerId] = localPoint(e);
      if (pinch) { updatePinch(); scheduleRender(); return; }
      // Wall tool: track the cursor for the rubber-band even without a button down.
      if (!drag && state.fogSetup && state.setupTool === "wall" && state.wallPath) {
        var hp = localPoint(e); state.wallHover = { x: s2wX(hp.x), y: s2wY(hp.y) }; scheduleRender(); return;
      }
      if (!drag) return;
      var p = localPoint(e);
      if (drag.mode === "vertex") {
        var vv = snapVertex(s2wX(p.x), s2wY(p.y));
        drag.grp.forEach(function (m) { m.seg[m.kx] = vv.x; m.seg[m.ky] = vv.y; });
      } else if (drag.mode === "pan") {
        state.cam.offX = drag.offX + (p.x - drag.sx);
        state.cam.offY = drag.offY + (p.y - drag.sy);
      } else if (drag.mode === "move") {
        var t = byId(drag.id); if (!t) return;
        // World delta the grabbed token wants to travel; every group member moves
        // by the same delta from its own origin (each clamped on its own path).
        var gnx = s2wX(p.x) - drag.dx, gny = s2wY(p.y) - drag.dy;
        var ddx = gnx - drag.gx0, ddy = gny - drag.gy0;
        drag.members.forEach(function (mm) {
          var mt = byId(mm.id); if (!mt) return;
          var tx = mm.ox + ddx, ty = mm.oy + ddy;
          if (state.collide) {
            var c = clampMove(mm.lastX, mm.lastY, tx, ty, tokMoveRad(mt));
            mt.x = c.x; mt.y = c.y;         // no mid-drag grid snap while colliding
          } else {
            mt.x = tx; mt.y = ty; snapTok(mt);
          }
          mm.lastX = mt.x; mm.lastY = mt.y;
          emit("token", mt);
        });
        if (drag.measure) {
          var gm = byId(drag.id);
          state.moveMeas = { ax: drag.gx0, ay: drag.gy0, bx: gm.x, by: gm.y };
          emitOverlay("measure", state.moveMeas);
        }
      } else if (drag.mode === "ruler") {
        state.ruler.bx = s2wX(p.x); state.ruler.by = s2wY(p.y);
        emitOverlay("measure", { ax: state.ruler.ax, ay: state.ruler.ay, bx: state.ruler.bx, by: state.ruler.by });
      } else if (drag.mode === "rings") {
        state.rings = { x: s2wX(p.x), y: s2wY(p.y) };
        emitOverlay("rings", { x: state.rings.x, y: state.rings.y });
      } else if (drag.mode === "laser") {
        state.laser = { x: s2wX(p.x), y: s2wY(p.y) };
        emitOverlay("laser", { x: state.laser.x, y: state.laser.y });
      } else if (drag.mode === "lasso") {
        state.marquee.x2 = s2wX(p.x); state.marquee.y2 = s2wY(p.y);
      } else if (drag.mode === "seg") {
        var v = snapVertex(s2wX(p.x), s2wY(p.y));
        drag.x2 = v.x; drag.y2 = v.y; state.segDraft.x2 = v.x; state.segDraft.y2 = v.y;
      }
      scheduleRender();
    }

    function onUp(e) {
      if (e && typeof e.pointerId !== "undefined") delete pointers[e.pointerId];
      if (pinch && activePointers().length < 2) { pinch = null; drag = null; }
      if (drag && drag.mode === "seg") {
        var len = Math.hypot(drag.x2 - drag.x1, drag.y2 - drag.y1);
        // A too-short drag is just a mis-click — cancel it (no erase). Erasing is
        // only ever the Erase tool now, so a stray click can't delete a barrier.
        if (len >= (state.map.ppg || 70) * 0.3) {
          if (drag.kind === "window") state.map.windows.push({ x1: drag.x1, y1: drag.y1, x2: drag.x2, y2: drag.y2 });
          else if (drag.kind === "door") state.map.doors.push({ x1: drag.x1, y1: drag.y1, x2: drag.x2, y2: drag.y2, closed: true, locked: false });
          else state.map.walls.push({ x1: drag.x1, y1: drag.y1, x2: drag.x2, y2: drag.y2 });
          bumpGeom();
          emit("map", state.map);
        }
        state.segDraft = null;
        scheduleRender();
      } else if (drag && drag.mode === "vertex") {
        bumpGeom(); emit("map", state.map); scheduleRender();
      } else if (drag && drag.mode === "move") {
        // Snap each moved token to grid on drop, but only if the snapped square is
        // reachable without crossing a barrier — otherwise keep the clamped spot.
        if (state.collide) {
          drag.members.forEach(function (mm) {
            var mt = byId(mm.id); if (!mt) return;
            var ox = mt.x, oy = mt.y;
            snapTok(mt);
            if (pathBlocked(ox, oy, mt.x, mt.y, tokMoveRad(mt))) { mt.x = ox; mt.y = oy; }
            emit("token", mt);
          });
        }
        if (drag.measure) { state.moveMeas = null; emitOverlay(null); scheduleRender(); }
      } else if (drag && drag.mode === "ruler") {
        // The ruler line stays up locally, but the live copy players see clears.
        emitOverlay(null);
      } else if (drag && drag.mode === "rings") {
        state.rings = null; emitOverlay(null); scheduleRender();
      } else if (drag && drag.mode === "laser") {
        state.laser = null; emitOverlay(null); scheduleRender();
      } else if (drag && drag.mode === "lasso") {
        var mq = state.marquee;
        if (mq) {
          var x1 = Math.min(mq.x1, mq.x2), x2 = Math.max(mq.x1, mq.x2), y1 = Math.min(mq.y1, mq.y2), y2 = Math.max(mq.y1, mq.y2);
          // Select the tokens this client may move whose centre lies in the box.
          var picked = state.tokens.filter(function (t) { return canMove(t) && t.x >= x1 && t.x <= x2 && t.y >= y1 && t.y <= y2; }).map(function (t) { return t.id; });
          state.selection = picked;
          state.selectedId = picked.length ? picked[picked.length - 1] : null;
          emit("select", state.selectedId ? byId(state.selectedId) : null);
          emit("lasso", { count: picked.length });
        }
        state.marquee = null; scheduleRender();
      }
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
      var a = document.activeElement, tag = a && a.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (a && a.isContentEditable)) return;
      // Esc finishes an in-progress polygon wall.
      if (e.key === "Escape" && state.wallPath) { finishWallPath(); e.preventDefault(); return; }
      var t = byId(state.selectedId);
      if (!t) return;
      var g = state.map.ppg || 70;
      if (e.key === "Delete" || e.key === "Backspace") {
        if (canMove(t)) { removeToken(t.id); emit("token", null); }
        e.preventDefault();
      } else if (e.key.indexOf("Arrow") === 0) {
        if (!canMove(t)) return;
        var step = e.shiftKey ? Math.max(2, Math.round(g / 10)) : g;
        var nx = t.x, ny = t.y;
        if (e.key === "ArrowLeft") nx -= step; else if (e.key === "ArrowRight") nx += step;
        else if (e.key === "ArrowUp") ny -= step; else if (e.key === "ArrowDown") ny += step; else return;
        // A player can't step through a barrier; the GM's board (collide=false) can.
        if (state.collide && pathBlocked(t.x, t.y, nx, ny, tokMoveRad(t))) { e.preventDefault(); return; }
        t.x = nx; t.y = ny;
        if (!e.shiftKey) snapTok(t);
        emit("token", t); scheduleRender(); e.preventDefault();
      }
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
      // Any map change may swap the wall/window/door arrays wholesale — invalidate
      // the fog cache even if counts happen to match.
      if (fields && (fields.walls || fields.windows || fields.doors || "ppg" in fields || "widthPx" in fields)) bumpGeom();
      scheduleRender();
    }

    function loadImageMap(src, ppg, srcType) {
      return loadImage(src).then(function (img) {
        setMap({
          image: img,
          widthPx: img.naturalWidth,
          heightPx: img.naturalHeight,
          ppg: ppg || state.map.ppg || 70,
          walls: [], windows: [], doors: [], lights: [],
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
          windows: [],
          doors: m.doors,
          lights: m.lights || [],
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
        vision: (typeof spec.vision === "number" && spec.vision > 0) ? spec.vision : null, // cells of sight; null = unlimited
        hp: spec.hp || null,
        hidden: !!spec.hidden, // GM-only: not drawn for players, ghosted for GM
        ring: !!spec.ring,     // optional colored outline (off by default)
        ringColor: spec.ringColor || null,
      };
      state.tokens.push(t);
      if (t.imageUrl) loadImage(t.imageUrl).then(function (img) { t.image = img; scheduleRender(); }, function () {});
      scheduleRender();
      emit("token", t);
      return t;
    }

    function removeToken(id) {
      state.tokens = state.tokens.filter(function (t) { return t.id !== id; });
      state.selection = state.selection.filter(function (sid) { return sid !== id; });
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
          walls: m.walls, windows: m.windows, doors: m.doors, lights: m.lights,
        },
        tokens: state.tokens.map(function (t) {
          return {
            id: t.id, name: t.name, imageUrl: t.imageUrl,
            x: t.x, y: t.y, w: t.w, h: t.h, rot: t.rot,
            ownerId: t.ownerId, characterDocId: t.characterDocId,
            isViewer: t.isViewer, color: t.color, vision: t.vision, hp: t.hp, hidden: t.hidden, ring: t.ring, ringColor: t.ringColor,
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
      state.selectedId = null; state.selection = [];
      state.ruler = null; state.moveMeas = null; state.rings = null; state.laser = null; state.overlays = {};
      var m = scene.map || {};
      state.feetPerCell = scene.feetPerCell || 5;
      state.grid = scene.grid !== false;
      state.fog.enabled = !!(scene.fog && scene.fog.enabled);
      state.fog.opacity = (scene.fog && scene.fog.opacity) || 1;
      var done = function () {
        setMap({ ppg: m.ppg || 70, walls: m.walls || [], windows: m.windows || [], doors: m.doors || [], lights: m.lights || [], widthPx: m.widthPx || 0, heightPx: m.heightPx || 0, src: m.src, srcType: m.srcType });
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

    // ---- sync helpers (used by the network layer) ---------------------------
    // Apply a map coming from the host over the wire: {src, srcType, ppg, walls,
    // doors, widthPx, heightPx}. Same shape toScene().map produces.
    function loadMapState(m) {
      var fields = {
        ppg: m.ppg || 70, walls: m.walls || [], windows: m.windows || [], doors: m.doors || [], lights: m.lights || [],
        widthPx: m.widthPx || 0, heightPx: m.heightPx || 0, src: m.src, srcType: m.srcType,
      };
      if (m.src) {
        return loadImage(m.src).then(function (img) {
          fields.image = img;
          if (img) { fields.widthPx = img.naturalWidth; fields.heightPx = img.naturalHeight; }
          setMap(fields); fitToMap(); return state.map;
        }, function () { fields.image = null; setMap(fields); return state.map; });
      }
      fields.image = null; setMap(fields); scheduleRender();
      return Promise.resolve(state.map);
    }

    // Apply map metadata only (walls/doors/lights/ppg) without touching the
    // image — used when the host syncs a wall/door/light change so the whole map
    // picture isn't re-shipped over the wire.
    function applyMapMeta(m) {
      var f = {};
      if (m.ppg) f.ppg = m.ppg;
      if (m.walls) f.walls = m.walls;
      if (m.windows) f.windows = m.windows;
      if (m.doors) f.doors = m.doors;
      if (m.lights) f.lights = m.lights;
      setMap(f);
    }

    // Reconcile the token list against an authoritative array (host -> guests):
    // update in place, add new, drop removed — reloading an image only when its
    // URL actually changed, so synced tokens don't flicker every frame.
    function syncTokens(list) {
      var byId2 = {}; state.tokens.forEach(function (t) { byId2[t.id] = t; });
      var keep = {};
      (list || []).forEach(function (spec) {
        keep[spec.id] = true;
        var t = byId2[spec.id];
        if (!t) { addToken(spec); return; }
        if (t.imageUrl !== spec.imageUrl) {
          t.imageUrl = spec.imageUrl; t.image = null;
          if (spec.imageUrl) loadImage(spec.imageUrl).then(function (img) { t.image = img; scheduleRender(); }, function () {});
        }
        // Don't let a host echo fight the token this client is actively dragging —
        // that's the rubber-band jitter. Keep the local position until the drag ends.
        var dragging = drag && drag.mode === "move" && drag.id === spec.id;
        t.name = spec.name; if (!dragging) { t.x = spec.x; t.y = spec.y; } t.w = spec.w; t.h = spec.h;
        t.rot = spec.rot || 0; t.ownerId = spec.ownerId; t.characterDocId = spec.characterDocId;
        t.isViewer = !!spec.isViewer; t.color = spec.color || t.color;
        t.vision = (typeof spec.vision === "number" && spec.vision > 0) ? spec.vision : null; t.hp = spec.hp; t.hidden = !!spec.hidden; t.ring = !!spec.ring; t.ringColor = spec.ringColor || null;
      });
      state.tokens = state.tokens.filter(function (t) { return keep[t.id]; });
      scheduleRender();
    }

    // ---- camera helpers -----------------------------------------------------
    function centerOn(id) {
      var t = byId(id); if (!t) return;
      var s = cssSize();
      state.cam.offX = s.w / 2 - t.x * state.cam.scale;
      state.cam.offY = s.h / 2 - t.y * state.cam.scale;
      scheduleRender();
    }

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

    function makeThumb(maxW) {
      var m = state.map; if (!m.widthPx) return null;
      var sc = Math.min(maxW / m.widthPx, maxW / m.heightPx);
      var tw = Math.max(1, Math.round(m.widthPx * sc)), th = Math.max(1, Math.round(m.heightPx * sc));
      var c = document.createElement("canvas"); c.width = tw; c.height = th;
      var g = c.getContext("2d");
      g.fillStyle = "#0b0d10"; g.fillRect(0, 0, tw, th);
      if (m.image && m.image.complete && m.image.naturalWidth) g.drawImage(m.image, 0, 0, tw, th);
      state.tokens.forEach(function (t) {
        g.fillStyle = t.color || "#c8a24a";
        g.beginPath(); g.arc(t.x * sc, t.y * sc, Math.max(2, (t.w / 2) * sc), 0, Math.PI * 2); g.fill();
      });
      try { return c.toDataURL("image/jpeg", 0.55); } catch (e) { return null; }
    }
    function cursorFor(t) { return (t === "ruler" || t === "pointer" || t === "rings" || t === "laser" || t === "lasso" || t === "movement") ? "crosshair" : "default"; }

    // ---- public API ---------------------------------------------------------
    canvas.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("keydown", onKey);
    root.addEventListener("resize", resize);
    canvas.addEventListener("dblclick", function (e) {
      var p = localPoint(e); var t = tokenAt(p.x, p.y);
      if (t) emit("open", { token: t });
    });
    canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      var p = localPoint(e);
      // In setup mode: right-click finishes an in-progress polygon wall; else a
      // right-click on a door locks/unlocks it (left-click opens/closes). No menu.
      if (state.fogSetup) {
        if (state.wallPath) { finishWallPath(); return; }
        var dis = doorAt(p.x, p.y);
        if (dis >= 0) { emit("doorlock", { index: dis }); return; }
        return; // setup mode: no token context menu
      }
      // Normal mode: right-click a token -> options; a door -> lock/unlock; empty -> nothing.
      var t = tokenAt(p.x, p.y);
      if (t) { state.selectedId = t.id; emit("select", t); scheduleRender(); emit("context", { token: t, sx: e.clientX, sy: e.clientY, wx: s2wX(p.x), wy: s2wY(p.y) }); return; }
      var di = doorAt(p.x, p.y);
      if (di >= 0) { emit("doorlock", { index: di }); return; }
    });
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
      setHidden: function (id, on) { var t = byId(id); if (!t) return; t.hidden = !!on; scheduleRender(); emit("token", t); },
      setRing: function (id, on, color) { var t = byId(id); if (!t) return; t.ring = !!on; if (color !== undefined) t.ringColor = color; scheduleRender(); emit("token", t); },
      select: function (id) { state.selectedId = id; state.selection = id ? [id] : []; emit("select", byId(id)); scheduleRender(); },
      getSelection: function () { return state.selection.slice(); },
      clearSelection: function () { state.selection = []; state.selectedId = null; emit("select", null); scheduleRender(); },
      setTool: function (t) {
        state.tool = t;
        // Switching tools drops any transient overlay this tool owned and tells
        // peers to clear the live copy they were shown.
        if (t !== "ruler") state.ruler = null;
        state.rings = null; state.laser = null; state.marquee = null; state.moveMeas = null;
        emitOverlay(null);
        try { canvas.style.cursor = cursorFor(t); } catch (e) {}
        scheduleRender(); emit("tool", t);
      },
      // Apply / clear a remote peer's live overlay (laser, measure line, rings).
      setOverlay: function (senderId, o) {
        if (!o || o.kind == null) { delete state.overlays[senderId]; }
        else { o.exp = now() + 4000; state.overlays[senderId] = o; }
        scheduleRender();
      },
      dropOverlay: function (senderId) { delete state.overlays[senderId]; scheduleRender(); },
      getTool: function () { return state.tool; },
      setFog: function (on) { state.fog.enabled = !!on; scheduleRender(); },
      setShowAll: function (on) { state.fog.showAll = !!on; scheduleRender(); },
      setFogOpacity: function (o) { state.fog.opacity = clamp(o, 0.1, 1); scheduleRender(); },
      setGrid: function (on) { state.grid = !!on; scheduleRender(); },
      setSnap: function (on) { state.snap = !!on; },
      getSnap: function () { return state.snap; },
      setFogSetup: function (on) { state.fogSetup = !!on; if (!on) { state.segDraft = null; state.wallPath = null; state.wallHover = null; } scheduleRender(); },
      getFogSetup: function () { return state.fogSetup; },
      setSetupTool: function (t) { if (["select", "wall", "window", "door", "erase"].indexOf(t) >= 0) { if (t !== "wall") finishWallPath(); state.setupTool = t; } },
      getSetupTool: function () { return state.setupTool; },
      setGm: function (b) { state.gm = !!b; scheduleRender(); },
      getGm: function () { return state.gm; },
      setCollision: function (b) { state.collide = !!b; },
      getCollision: function () { return state.collide; },
      // Barrier tests exposed for the network host to validate guest moves.
      movementBlocked: function (ax, ay, bx, by, rad) { return pathBlocked(ax, ay, bx, by, rad || 0); },
      clampMovement: function (ax, ay, bx, by, rad) { return clampMove(ax, ay, bx, by, rad || 0); },
      moveRadius: function (t) { return tokMoveRad(t); },
      setDoor: function (i, fields) { var d = state.map.doors[i]; if (!d) return; if (fields.closed !== undefined) d.closed = !!fields.closed; if (fields.locked !== undefined) d.locked = !!fields.locked; scheduleRender(); },
      getDoor: function (i) { return state.map.doors[i]; },
      doorCount: function () { return state.map.doors ? state.map.doors.length : 0; },
      centerOn: centerOn,
      setCanMove: function (fn) { canMove = fn || function () { return true; }; },
      setPpg: function (n) { state.map.ppg = Math.max(4, n | 0); scheduleRender(); emit("map", state.map); },
      setFeetPerCell: function (n) { state.feetPerCell = Math.max(1, n) || 5; },
      screenToWorld: function (sx, sy) { var r = canvas.getBoundingClientRect(); return { x: s2wX(sx - r.left), y: s2wY(sy - r.top) }; },
      addTokenAtScreen: function (spec, sx, sy) {
        var r = canvas.getBoundingClientRect(); spec = spec || {};
        spec.x = s2wX(sx - r.left); spec.y = s2wY(sy - r.top);
        var g = state.map.ppg, w = spec.w || g || 70, h = spec.h || g || 70;
        if (state.snap && state.map.ppg) { spec.x = Math.round((spec.x - w / 2) / g) * g + w / 2; spec.y = Math.round((spec.y - h / 2) / g) * g + h / 2; }
        return addToken(spec);
      },
      zoomBy: function (f, sx, sy) {
        var s = cssSize(); var px = sx == null ? s.w / 2 : sx, py = sy == null ? s.h / 2 : sy;
        var before = { x: s2wX(px), y: s2wY(py) };
        state.cam.scale = clamp(state.cam.scale * f, 0.05, 12);
        state.cam.offX = px - before.x * state.cam.scale; state.cam.offY = py - before.y * state.cam.scale;
        scheduleRender();
      },
      thumbnail: function (maxW) { return makeThumb(maxW || 200); },
      fitToMap: fitToMap,
      toScene: toScene,
      loadScene: loadScene,
      loadMapState: loadMapState,
      applyMapMeta: applyMapMeta,
      syncTokens: syncTokens,
      setRemoteApply: function (b) { state._remote = !!b; },
      ping: ping,
      resize: resize,
      render: render,
    };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { VTTBoard: VTTBoard };
  else root.VTTBoard = VTTBoard;
})(typeof window !== "undefined" ? window : this);
