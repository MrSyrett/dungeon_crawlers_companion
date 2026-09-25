/* Dungeon Crawler's Companion — VTT: visibility geometry for dynamic fog of war.
 *
 * Pure, dependency-free. Given wall SEGMENTS and a viewer POINT, it returns the
 * polygon of everything that viewer can see (a 2-D visibility polygon), clipped
 * to the map rectangle. The board punches these polygons out of a dark overlay
 * with canvas compositing — so no polygon-boolean library is needed.
 *
 * Algorithm: cast a ray toward every wall endpoint (and a hair to either side so
 * rays slip past corners), keep the nearest hit on each ray, then sort the hits
 * by angle to form the polygon. The map's four edges are always included as walls
 * so vision terminates at the boundary.
 *
 * Exposes window.VTTVisibility in the browser and module.exports under Node.
 */
(function (root) {
  "use strict";

  var EPS = 1e-6;

  function rectSegments(w, h) {
    return [
      { x1: 0, y1: 0, x2: w, y2: 0 },
      { x1: w, y1: 0, x2: w, y2: h },
      { x1: w, y1: h, x2: 0, y2: h },
      { x1: 0, y1: h, x2: 0, y2: 0 },
    ];
  }

  // Nearest intersection of ray (origin -> angle) with a segment.
  // Returns { t, x, y } where t is distance along the ray, or null.
  function rayHit(ox, oy, dx, dy, s) {
    var x1 = s.x1, y1 = s.y1, x2 = s.x2, y2 = s.y2;
    var sdx = x2 - x1, sdy = y2 - y1;
    var denom = dx * sdy - dy * sdx;
    if (Math.abs(denom) < EPS) return null; // parallel
    // param along segment: t2 = ((A-O) x D) / (D x S)
    var t2 = ((x1 - ox) * dy - (y1 - oy) * dx) / denom;
    if (t2 < -EPS || t2 > 1 + EPS) return null;
    var t1; // param along ray
    if (Math.abs(dx) > Math.abs(dy)) t1 = (x1 + sdx * t2 - ox) / dx;
    else t1 = (y1 + sdy * t2 - oy) / dy;
    if (t1 < EPS) return null; // behind or at origin
    return { t: t1, x: ox + dx * t1, y: oy + dy * t1 };
  }

  /**
   * Visibility polygon from `origin` given blocking `segments`, clipped to a
   * width x height rectangle.
   * @param segments [{x1,y1,x2,y2}]  blocking walls (doors included by caller when closed)
   * @param origin   {x,y}
   * @param width,height  map size in pixels
   * @param opts     { radius?: number }  optional max sight radius (pixels)
   * @returns [{x,y}] polygon points in draw order (may be empty if origin invalid)
   */
  function compute(segments, origin, width, height, opts) {
    opts = opts || {};
    var radius = typeof opts.radius === "number" && opts.radius > 0 ? opts.radius : Infinity;
    var ox = origin.x, oy = origin.y;
    if (!isFinite(ox) || !isFinite(oy)) return [];

    var walls = (segments || []).concat(rectSegments(width, height));

    // Candidate angles: every endpoint, plus/minus a sliver.
    var angles = [];
    for (var i = 0; i < walls.length; i++) {
      var w = walls[i];
      var a1 = Math.atan2(w.y1 - oy, w.x1 - ox);
      var a2 = Math.atan2(w.y2 - oy, w.x2 - ox);
      angles.push(a1 - 1e-5, a1, a1 + 1e-5, a2 - 1e-5, a2, a2 + 1e-5);
    }

    var points = [];
    for (var k = 0; k < angles.length; k++) {
      var ang = angles[k];
      var dx = Math.cos(ang), dy = Math.sin(ang);
      var best = null;
      for (var j = 0; j < walls.length; j++) {
        var hit = rayHit(ox, oy, dx, dy, walls[j]);
        if (hit && (!best || hit.t < best.t)) best = hit;
      }
      if (!best) continue;
      if (best.t > radius) {
        best = { t: radius, x: ox + dx * radius, y: oy + dy * radius };
      }
      points.push({ x: best.x, y: best.y, ang: ang });
    }

    points.sort(function (p, q) { return p.ang - q.ang; });

    // Drop near-duplicate consecutive points.
    var out = [];
    for (var m = 0; m < points.length; m++) {
      var p = points[m];
      var prev = out[out.length - 1];
      if (prev && Math.abs(prev.x - p.x) < 1e-3 && Math.abs(prev.y - p.y) < 1e-3) continue;
      out.push({ x: p.x, y: p.y });
    }
    return out;
  }

  // Is point (px,py) inside the visibility polygon? (ray-cast parity test)
  function pointInPolygon(px, py, poly) {
    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
      var hit = ((yi > py) !== (yj > py)) &&
        (px < (xj - xi) * (py - yi) / ((yj - yi) || EPS) + xi);
      if (hit) inside = !inside;
    }
    return inside;
  }

  var api = { compute: compute, pointInPolygon: pointInPolygon, rayHit: rayHit };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.VTTVisibility = api;
})(typeof window !== "undefined" ? window : this);
