/* Dungeon Crawler's Companion — VTT: Universal VTT (.uvtt / .dd2vtt / .df2vtt) parser.
 *
 * Pure, dependency-free, and system-agnostic. Turns a Universal VTT file (the
 * format Dungeondraft, DungeonFog and our own Map Maker export) into a normalized
 * map object the board understands: the image, the grid size, and the
 * walls / doors / lights in MAP-PIXEL space (so the board never has to think in
 * grid cells).
 *
 * Format reference (dd2vtt 0.3):
 *   resolution     { map_origin{x,y}, map_size{x,y in cells}, pixels_per_grid }
 *   line_of_sight  polylines of wall CENTRELINES, in grid cells from image top-left
 *   objects_line_of_sight  same, for free-standing objects
 *   portals        doors: { position, bounds:[a,b], rotation(rad), closed, freestanding }
 *   lights         { position, range(cells), intensity, color:"aarrggbb", shadows }
 *   environment    { baked_lighting, ambient_light:"aarrggbb" }
 *   image          base64 PNG (NO data-url prefix); colour is AARRGGBB (alpha first)
 *
 * Exposes window.VTTUvtt in the browser and module.exports under Node (for tests).
 */
(function (root) {
  "use strict";

  // A polyline is [{x,y},...] in cells; emit its consecutive segments in pixels.
  function polylineToSegments(poly, ppg, out) {
    if (!Array.isArray(poly) || poly.length < 2) return;
    for (var i = 0; i < poly.length - 1; i++) {
      var a = poly[i], b = poly[i + 1];
      if (!a || !b) continue;
      out.push({
        x1: a.x * ppg, y1: a.y * ppg,
        x2: b.x * ppg, y2: b.y * ppg,
      });
    }
  }

  // line_of_sight may be an array of polylines, or (rarely) a single polyline.
  function collectSegments(los, ppg, out) {
    if (!Array.isArray(los) || !los.length) return;
    var first = los[0];
    if (first && typeof first.x === "number") {
      // A single polyline.
      polylineToSegments(los, ppg, out);
    } else {
      // An array of polylines.
      for (var i = 0; i < los.length; i++) polylineToSegments(los[i], ppg, out);
    }
  }

  // "aarrggbb" (alpha first) -> "#rrggbb" + alpha 0..1. Tolerates missing/short.
  function parseColor(c) {
    if (typeof c !== "string") return { hex: "#ffffff", alpha: 1 };
    var s = c.replace(/^#/, "");
    if (s.length === 8) {
      return {
        hex: "#" + s.slice(2),
        alpha: parseInt(s.slice(0, 2), 16) / 255,
      };
    }
    if (s.length === 6) return { hex: "#" + s, alpha: 1 };
    return { hex: "#ffffff", alpha: 1 };
  }

  function isDataUrl(s) {
    return typeof s === "string" && /^data:image\//i.test(s);
  }

  /**
   * Parse a Universal VTT file.
   * @param input  the file's text, or an already-parsed object.
   * @returns normalized map:
   *   {
   *     ppg, mapSize:{x,y}, origin:{x,y}, widthPx, heightPx,
   *     imageDataUrl,                         // "data:image/png;base64,..."  (or null)
   *     walls:  [{x1,y1,x2,y2}],              // map-pixel space
   *     doors:  [{x1,y1,x2,y2, closed, id}],  // map-pixel space
   *     lights: [{x,y,range,intensity,color,alpha}],
   *     ambient:{hex,alpha},
   *   }
   * @throws if the input is not a recognizable UVTT object.
   */
  function parse(input) {
    var data = input;
    if (typeof input === "string") {
      try { data = JSON.parse(input); }
      catch (e) { throw new Error("Not valid JSON — is this a .uvtt/.dd2vtt file?"); }
    }
    if (!data || typeof data !== "object") throw new Error("Empty UVTT input.");

    var res = data.resolution || {};
    var ppg = Number(res.pixels_per_grid) || 0;
    if (!ppg) throw new Error("UVTT is missing resolution.pixels_per_grid.");
    var mapSize = {
      x: Number((res.map_size || {}).x) || 0,
      y: Number((res.map_size || {}).y) || 0,
    };
    var origin = {
      x: Number((res.map_origin || {}).x) || 0,
      y: Number((res.map_origin || {}).y) || 0,
    };

    var walls = [];
    collectSegments(data.line_of_sight, ppg, walls);
    collectSegments(data.objects_line_of_sight, ppg, walls);

    var doors = (Array.isArray(data.portals) ? data.portals : []).map(function (p, i) {
      var b = Array.isArray(p.bounds) ? p.bounds : [];
      var a = b[0] || p.position || { x: 0, y: 0 };
      var c = b[1] || p.position || { x: 0, y: 0 };
      return {
        id: "door-" + i,
        x1: a.x * ppg, y1: a.y * ppg,
        x2: c.x * ppg, y2: c.y * ppg,
        // A UVTT portal is authored closed unless it explicitly says otherwise.
        closed: p.closed !== false,
      };
    });

    var lights = (Array.isArray(data.lights) ? data.lights : []).map(function (l) {
      var col = parseColor(l.color);
      var pos = l.position || { x: 0, y: 0 };
      return {
        x: pos.x * ppg, y: pos.y * ppg,
        range: (Number(l.range) || 0) * ppg,
        intensity: Number(l.intensity) || 1,
        color: col.hex, alpha: col.alpha,
      };
    });

    var ambient = parseColor((data.environment || {}).ambient_light);

    // image: base64 PNG without the data-url prefix (our Map Maker export), OR an
    // already-formed data URL, OR absent (map supplied separately by link).
    var imageDataUrl = null;
    if (isDataUrl(data.image)) imageDataUrl = data.image;
    else if (typeof data.image === "string" && data.image.length) {
      imageDataUrl = "data:image/png;base64," + data.image.replace(/\s+/g, "");
    }

    return {
      ppg: ppg,
      mapSize: mapSize,
      origin: origin,
      widthPx: mapSize.x * ppg,
      heightPx: mapSize.y * ppg,
      imageDataUrl: imageDataUrl,
      walls: walls,
      doors: doors,
      lights: lights,
      ambient: ambient,
    };
  }

  // Heuristic: does this look like a UVTT payload (vs. one of our scene files)?
  function looksLikeUvtt(obj) {
    return !!(obj && typeof obj === "object" && obj.resolution &&
      typeof obj.resolution.pixels_per_grid !== "undefined");
  }

  var api = { parse: parse, looksLikeUvtt: looksLikeUvtt, parseColor: parseColor };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.VTTUvtt = api;
})(typeof window !== "undefined" ? window : this);
