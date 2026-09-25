/* Table Tools: vision geometry (plain JS, no OBR calls, so it's unit-testable).
 *
 * Rebuilds what a player would see under Owlbear Rodeo's official Dynamic Fog
 * extension, using the same data it reads:
 *   - WALLS: the edges of every item on the FOG layer. Dynamic Fog turns native
 *     fog shapes into walls.
 *   - DOORS: metadata["rodeo.owlbear.dynamic-fog/doors"] on a wall item, a list
 *     of { open, start:{index,distance}, end:{index,distance} } ranges along
 *     its edges. Open doors don't block.
 *   - LIGHTS: metadata["rodeo.owlbear.dynamic-fog/light"] on any item
 *     { attenuationRadius, lightType, outerAngle?, ... }.
 *       PRIMARY lights reveal everything they can reach.
 *       SECONDARY (and AUXILIARY) lights only show where a primary light has
 *       line of sight: an enemy campfire behind a wall stays dark.
 *
 * compute() returns the visible area as a polygon-clipping MultiPolygon.
 * overlayCommands() turns "everything except that" into OBR PATH commands.
 *
 * Requires window.polygonClipping (vendored alongside).
 */
(function (root) {
  "use strict";

  var DF = "rodeo.owlbear.dynamic-fog";
  var LIGHT = DF + "/light";
  var DOORS = DF + "/doors";
  var CMD = { MOVE: 0, LINE: 1, QUAD: 2, CONIC: 3, CUBIC: 4, CLOSE: 5 };
  var FAR = 200000; // "unlimited" line of sight, in scene pixels
  var ARC_STEPS = 96; // rays around a full circle, for a smooth light edge

  function pc() { return root.polygonClipping; }

  // ------------------------------------------------------------ transforms --

  function transformer(item) {
    var p = item.position || { x: 0, y: 0 };
    var s = item.scale || { x: 1, y: 1 };
    var r = ((item.rotation || 0) * Math.PI) / 180;
    var c = Math.cos(r), sn = Math.sin(r);
    return function (pt) {
      var x = pt.x * s.x, y = pt.y * s.y;
      return { x: p.x + x * c - y * sn, y: p.y + x * sn + y * c };
    };
  }

  function quad(a, b, c, n) {
    var out = [];
    for (var i = 1; i <= n; i++) {
      var t = i / n, u = 1 - t;
      out.push({ x: u * u * a.x + 2 * u * t * b.x + t * t * c.x, y: u * u * a.y + 2 * u * t * b.y + t * t * c.y });
    }
    return out;
  }

  function cubic(a, b, c, d, n) {
    var out = [];
    for (var i = 1; i <= n; i++) {
      var t = i / n, u = 1 - t;
      out.push({
        x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
        y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
      });
    }
    return out;
  }

  // Cardinal spline through pts, approximating Konva's "tension" curves.
  function spline(pts, tension, closed) {
    var n = pts.length;
    if (n < 3 || !tension) return pts.slice();
    var get = function (i) {
      if (closed) return pts[(i + n) % n];
      return pts[Math.max(0, Math.min(n - 1, i))];
    };
    var out = [pts[0]];
    var segs = closed ? n : n - 1;
    for (var i = 0; i < segs; i++) {
      var p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      var c1 = { x: p1.x + (p2.x - p0.x) * tension / 3 * 2, y: p1.y + (p2.y - p0.y) * tension / 3 * 2 };
      var c2 = { x: p2.x - (p3.x - p1.x) * tension / 3 * 2, y: p2.y - (p3.y - p1.y) * tension / 3 * 2 };
      out = out.concat(cubic(p1, c1, c2, p2, 8));
    }
    return out;
  }

  // Item -> list of { pts: [{x,y}] (local space), closed }.
  function localOutlines(item) {
    var list = [];
    if (item.type === "PATH" && Array.isArray(item.commands)) {
      var cur = null, last = null;
      item.commands.forEach(function (c) {
        var k = c[0];
        if (k === CMD.MOVE) {
          cur = { pts: [{ x: c[1], y: c[2] }], closed: false };
          list.push(cur);
          last = cur.pts[0];
          return;
        }
        if (!cur) { cur = { pts: [{ x: 0, y: 0 }], closed: false }; list.push(cur); last = cur.pts[0]; }
        if (k === CMD.LINE) { last = { x: c[1], y: c[2] }; cur.pts.push(last); }
        else if (k === CMD.QUAD || k === CMD.CONIC) {
          var q = quad(last, { x: c[1], y: c[2] }, { x: c[3], y: c[4] }, 8);
          cur.pts = cur.pts.concat(q); last = q[q.length - 1];
        } else if (k === CMD.CUBIC) {
          var b = cubic(last, { x: c[1], y: c[2] }, { x: c[3], y: c[4] }, { x: c[5], y: c[6] }, 10);
          cur.pts = cur.pts.concat(b); last = b[b.length - 1];
        } else if (k === CMD.CLOSE) { cur.closed = true; }
      });
    } else if (item.type === "CURVE" && Array.isArray(item.points)) {
      var closed = !!(item.style && item.style.closed);
      list.push({ pts: spline(item.points, (item.style && item.style.tension) || 0, closed), closed: closed });
    } else if (item.type === "LINE" && item.startPosition && item.endPosition) {
      list.push({ pts: [item.startPosition, item.endPosition], closed: false });
    } else if (item.type === "SHAPE") {
      var w = item.width || 0, h = item.height || 0, pts = [], i;
      if (item.shapeType === "RECTANGLE") pts = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }];
      else if (item.shapeType === "CIRCLE") {
        for (i = 0; i < 40; i++) {
          var a = (i / 40) * Math.PI * 2;
          pts.push({ x: Math.cos(a) * w / 2, y: Math.sin(a) * h / 2 });
        }
      } else if (item.shapeType === "TRIANGLE") pts = [{ x: 0, y: 0 }, { x: w / 2, y: h }, { x: -w / 2, y: h }];
      else if (item.shapeType === "HEXAGON") {
        for (i = 0; i < 6; i++) {
          var b2 = (i / 6) * Math.PI * 2 + Math.PI / 6;
          pts.push({ x: Math.cos(b2) * w / 2, y: Math.sin(b2) * h / 2 });
        }
      }
      if (pts.length) list.push({ pts: pts, closed: true });
    }
    return list;
  }

  // ----------------------------------------------------------------- walls --

  // Blocking segments [ax, ay, bx, by] in scene space for one FOG-layer item,
  // with any OPEN door ranges cut out.
  function itemSegments(item) {
    var tf = transformer(item);
    var edges = []; // { a, b, len, start } in scene space, global edge order
    var cum = 0;
    localOutlines(item).forEach(function (o) {
      var pts = o.pts.map(tf);
      var n = pts.length;
      var count = o.closed ? n : n - 1;
      for (var i = 0; i < count; i++) {
        var a = pts[i], b = pts[(i + 1) % n];
        var len = Math.hypot(b.x - a.x, b.y - a.y);
        edges.push({ a: a, b: b, len: len, start: cum });
        cum += len;
      }
    });

    // Door ranges, measured as (edge index, distance along that edge).
    var cuts = [];
    var doors = item.metadata && item.metadata[DOORS];
    if (Array.isArray(doors)) {
      doors.forEach(function (d) {
        if (!d || !d.open || !d.start || !d.end) return;
        var e1 = edges[d.start.index], e2 = edges[d.end.index];
        if (!e1 || !e2) return;
        var s = e1.start + (d.start.distance || 0);
        var e = e2.start + (d.end.distance || 0);
        cuts.push(s <= e ? [s, e] : [e, s]);
      });
    }

    var segs = [];
    edges.forEach(function (ed) {
      if (ed.len < 1e-6) return;
      // Keep the parts of this edge not covered by an open door.
      var keep = [[ed.start, ed.start + ed.len]];
      cuts.forEach(function (c) {
        var next = [];
        keep.forEach(function (k) {
          if (c[1] <= k[0] || c[0] >= k[1]) { next.push(k); return; }
          if (c[0] > k[0]) next.push([k[0], c[0]]);
          if (c[1] < k[1]) next.push([c[1], k[1]]);
        });
        keep = next;
      });
      keep.forEach(function (k) {
        if (k[1] - k[0] < 1e-6) return;
        var t0 = (k[0] - ed.start) / ed.len, t1 = (k[1] - ed.start) / ed.len;
        segs.push([
          ed.a.x + (ed.b.x - ed.a.x) * t0, ed.a.y + (ed.b.y - ed.a.y) * t0,
          ed.a.x + (ed.b.x - ed.a.x) * t1, ed.a.y + (ed.b.y - ed.a.y) * t1,
        ]);
      });
    });
    return segs;
  }

  function walls(items) {
    var segs = [];
    items.forEach(function (it) {
      if (it.layer !== "FOG") return;
      segs = segs.concat(itemSegments(it));
    });
    return segs;
  }

  // ---------------------------------------------------------------- lights --

  function lights(items) {
    var out = [];
    items.forEach(function (it) {
      var l = it.metadata && it.metadata[LIGHT];
      if (!l || typeof l !== "object") return;
      var outer = typeof l.outerAngle === "number" ? l.outerAngle : 360;
      out.push({
        id: it.id,
        attachedTo: it.attachedTo || null,
        pos: it.position || { x: 0, y: 0 },
        radius: Math.max(0, Number(l.attenuationRadius) || 0),
        type: l.lightType === "SECONDARY" || l.lightType === "AUXILIARY" ? "SECONDARY" : "PRIMARY",
        visible: it.visible !== false,
        // Cones: best guess that rotation 0 faces "up" the screen, like a token.
        cone: outer < 360 ? { dir: ((it.rotation || 0) - 90) * Math.PI / 180, half: (outer / 2) * Math.PI / 180 } : null,
      });
    });
    return out;
  }

  // --------------------------------------------------------- line of sight --

  function segDist2(px, py, s) {
    var dx = s[2] - s[0], dy = s[3] - s[1];
    var l2 = dx * dx + dy * dy;
    var t = l2 ? ((px - s[0]) * dx + (py - s[1]) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    var x = s[0] + t * dx - px, y = s[1] + t * dy - py;
    return x * x + y * y;
  }

  // Distance along ray (ox,oy)+t(dx,dy) to segment s, or Infinity.
  function hit(ox, oy, dx, dy, s) {
    var sx = s[2] - s[0], sy = s[3] - s[1];
    var den = dx * sy - dy * sx;
    if (Math.abs(den) < 1e-12) return Infinity;
    var ax = s[0] - ox, ay = s[1] - oy;
    var t = (ax * sy - ay * sx) / den;
    var u = (ax * dy - ay * dx) / den;
    if (t < 0 || u < -1e-9 || u > 1 + 1e-9) return Infinity;
    return t;
  }

  function normAngle(a) {
    while (a <= -Math.PI) a += Math.PI * 2;
    while (a > Math.PI) a -= Math.PI * 2;
    return a;
  }

  // Visibility polygon from o out to radius R, as a closed ring [[x,y],...].
  function visibility(o, R, segs, cone) {
    if (!(R > 0)) return null;
    var near = segs.filter(function (s) { return segDist2(o.x, o.y, s) < R * R; });
    var angles = [];
    var i;
    for (i = 0; i < ARC_STEPS; i++) angles.push(-Math.PI + (i / ARC_STEPS) * Math.PI * 2);
    var eps = 1e-5;
    near.forEach(function (s) {
      var a1 = Math.atan2(s[1] - o.y, s[0] - o.x), a2 = Math.atan2(s[3] - o.y, s[2] - o.x);
      angles.push(a1 - eps, a1, a1 + eps, a2 - eps, a2, a2 + eps);
    });

    if (cone) {
      var lo = cone.dir - cone.half, hi = cone.dir + cone.half;
      angles = angles.filter(function (a) {
        return Math.abs(normAngle(a - cone.dir)) <= cone.half;
      }).map(function (a) {
        // Unwrap into [lo, hi] so sorting keeps the sweep in order.
        var d = normAngle(a - cone.dir);
        return cone.dir + d;
      });
      angles.push(lo, hi);
    }

    angles.sort(function (a, b) { return a - b; });
    var ring = [];
    if (cone) ring.push([o.x, o.y]);
    var prev = null;
    for (i = 0; i < angles.length; i++) {
      var a = angles[i];
      if (prev !== null && a - prev < 1e-9) continue;
      prev = a;
      var dx = Math.cos(a), dy = Math.sin(a);
      var best = R;
      for (var j = 0; j < near.length; j++) {
        var t = hit(o.x, o.y, dx, dy, near[j]);
        if (t < best) best = t;
      }
      ring.push([o.x + dx * best, o.y + dy * best]);
    }
    if (ring.length < 3) return null;
    ring.push(ring[0].slice());
    return ring;
  }

  function safeUnion(polys) {
    polys = polys.filter(Boolean);
    if (!polys.length) return [];
    try { return pc().union.apply(null, polys); }
    catch (e) {
      // Degenerate geometry: fold one at a time, dropping any that break.
      var acc = [];
      polys.forEach(function (p) {
        try { acc = acc.length ? pc().union(acc, p) : [p]; } catch (e2) { /* skip */ }
      });
      return acc;
    }
  }

  /**
   * items: every scene item. opts: { mode: "token" | "party", tokenId }.
   * Returns { visible: MultiPolygon, primaries, secondaries, walls }.
   */
  function compute(items, opts) {
    var segs = walls(items);
    var all = lights(items);
    var primaries = all.filter(function (l) {
      if (l.type !== "PRIMARY") return false;
      if (opts.mode === "token") return l.id === opts.tokenId || l.attachedTo === opts.tokenId;
      return l.visible; // a hidden primary light doesn't reveal anything for players
    });
    var secondaries = all.filter(function (l) { return l.type === "SECONDARY"; });

    var lit = primaries.map(function (l) {
      var r = visibility(l.pos, l.radius, segs, l.cone);
      return r ? [r] : null;
    });

    if (primaries.length && secondaries.length) {
      // Line of sight only matters as far as the furthest secondary light
      // reaches, so bound it there instead of casting to infinity.
      var sight = safeUnion(primaries.map(function (l) {
        var reach = 0;
        secondaries.forEach(function (s2) {
          reach = Math.max(reach, Math.hypot(s2.pos.x - l.pos.x, s2.pos.y - l.pos.y) + s2.radius);
        });
        var r = visibility(l.pos, Math.min(FAR, reach + 1), segs, null);
        return r ? [r] : null;
      }));
      if (sight.length) {
        secondaries.forEach(function (l) {
          var r = visibility(l.pos, l.radius, segs, l.cone);
          if (!r) return;
          try {
            var seen = pc().intersection([r], sight);
            if (seen.length) lit.push(seen);
          } catch (e) { /* skip degenerate */ }
        });
      }
    }

    return {
      visible: safeUnion(lit),
      primaries: primaries.length,
      secondaries: secondaries.length,
      walls: segs.length,
    };
  }

  // "Everything except the visible area" as OBR PATH commands (evenodd).
  function overlayCommands(visible, extent) {
    var E = extent || FAR;
    var outer = [[[-E, -E], [E, -E], [E, E], [-E, E], [-E, -E]]];
    var dark;
    try { dark = visible.length ? pc().difference(outer, visible) : [outer]; }
    catch (e) { dark = [outer]; }
    var cmds = [];
    dark.forEach(function (poly) {
      poly.forEach(function (ring) {
        if (ring.length < 3) return;
        cmds.push([CMD.MOVE, ring[0][0], ring[0][1]]);
        for (var i = 1; i < ring.length; i++) cmds.push([CMD.LINE, ring[i][0], ring[i][1]]);
        cmds.push([CMD.CLOSE]);
      });
    });
    return cmds;
  }

  root.TTVision = {
    LIGHT_KEY: LIGHT,
    DOORS_KEY: DOORS,
    walls: walls,
    lights: lights,
    visibility: visibility,
    compute: compute,
    overlayCommands: overlayCommands,
  };
})(typeof window !== "undefined" ? window : globalThis);
