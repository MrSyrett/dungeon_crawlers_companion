"use client";

// Token Maker — a client-side canvas tool for turning an uploaded image into a
// round VTT token with a colorized ring. No server round-trip: everything runs
// in the browser and the finished token is offered as a transparent WebP
// download (PNG fallback on browsers without canvas WebP encoding).
//
// Ring styles (all driven by a single base color; the disc behind the art is
// always filled with that same color so the background matches the ring):
//   • flat       — a solid band of the chosen color.
//   • beveled    — a rounded, raised band shaded from a light inner lip to a
//                  dark outer edge.
//   • steelglass — the "pack" look: a fixed brushed-steel bezel around a
//                  recessed, domed glass inset tinted by the chosen color, with
//                  a single top-left glint. The color tints the glass, not the
//                  metal ring.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type RingStyle = "flat" | "beveled" | "steelglass";

const EXPORT_SIZE = 512; // finished token dimensions in px
const PREVIEW_SIZE = 440; // on-screen preview canvas (CSS + backing px scaled by DPR)

const STYLES: { id: RingStyle; label: string; hint: string }[] = [
  { id: "steelglass", label: "Steel Glass", hint: "Brushed-steel bezel over tinted glass — the pack look" },
  { id: "flat", label: "Flat", hint: "Simple solid ring" },
  { id: "beveled", label: "Beveled", hint: "Raised, rounded ring" },
];

// A spread of useful ring colors — metals plus a few saturated hues.
const SWATCHES = [
  "#c8a020", // gold (matches the app accent)
  "#b8b8c0", // silver
  "#b06a2c", // bronze
  "#2f6f4f", // emerald
  "#7a1f22", // crimson
  "#274b7a", // steel blue
  "#4a2a6a", // amethyst
  "#1a1a1d", // obsidian
];

// ── Color helpers ────────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  if (Number.isNaN(n) || h.length !== 6) return [200, 160, 32];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Mix a color toward white (amount > 0) or black (amount < 0). amount in [-1, 1].
function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const mix = (c: number) => Math.round((t - c) * p + c);
  const to2 = (c: number) => mix(c).toString(16).padStart(2, "0");
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

const DEFAULT_RING_FRAC = 0.12;

interface DrawParams {
  style: RingStyle;
  color: string;
  ringFrac: number; // ring thickness as a fraction of the token radius
  above: boolean; // draw the art on top of the ring (for transparent-bg minis)
  zoom: number; // 1 = image just covers the inner disc
  offsetX: number; // pan, as a fraction of the token size
  offsetY: number;
}

// Fit-and-draw the art into the current (already-clipped) context. Sizing is
// relative to the inner disc so toggling placement never resizes the art
// (zoom = 1 covers the inner disc of radius `rInner`).
function paintArt(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  rInner: number,
  p: DrawParams,
  image: HTMLImageElement,
) {
  const innerD = rInner * 2;
  const cover = innerD / Math.min(image.width, image.height); // cover fit
  const scale = cover * p.zoom;
  const w = image.width * scale;
  const h = image.height * scale;
  const dx = cx - w / 2 + p.offsetX * size;
  const dy = cy - h / 2 + p.offsetY * size;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, dx, dy, w, h);
}

// The "pack" token: a fixed brushed-steel bezel around a recessed, domed glass
// inset that is tinted by `p.color`. The uploaded art lives inside the glass
// (framed) or floats on top as a mini (above). Mirrors the offline generator:
// tinted interior → art (clipped to the glass) → single top glint → steel ring.
function drawSteelGlass(
  ctx: CanvasRenderingContext2D,
  size: number,
  p: DrawParams,
  image: HTMLImageElement | null,
) {
  // Geometry mirrors the offline generator's 512px source exactly. All lengths
  // are expressed as a fraction of the canvas (k = size/512 equivalents) so the
  // bezel width, glass sheen and hairline arcs scale 1:1 with the pack. The
  // metal band is a FIXED ~18.5% of the radius (the pack thickness) and does not
  // follow the thickness slider — that control is hidden for this style.
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.484; // outer bezel radius (≈248/512), small AA inset
  const rInner = R * 0.812; // glass radius = inner edge of steel band
  const fillAll = () => ctx.fillRect(0, 0, size, size);
  const circle = (r: number) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
  };

  // ── Recessed glass interior (tinted by the chosen color) ──────────────────
  const paintInterior = () => {
    ctx.save();
    circle(rInner);
    ctx.clip();
    circle(rInner);
    ctx.fillStyle = "#101216"; // dark recess base
    ctx.fill();
    const tint = ctx.createRadialGradient(cx, cy - rInner * 0.12, rInner * 0.08, cx, cy, rInner * 1.24);
    tint.addColorStop(0, shade(p.color, 0.0));
    tint.addColorStop(1, shade(p.color, -0.5));
    ctx.fillStyle = tint;
    fillAll();
    const vig = ctx.createRadialGradient(cx, cy, rInner * 0.66, cx, cy, rInner);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.62)");
    ctx.fillStyle = vig;
    fillAll();
    ctx.restore();
  };

  // ── Domed-glass sheen: this is where the highlight lives. A soft inner
  //    shadow, one broad gloss and one bright top-left glint, all clipped to the
  //    glass so the metal band stays matte. Positions match the pack (relative
  //    to the glass radius). ───────────────────────────────────────────────────
  const ellipseGlow = (
    dxFrac: number,
    dyFrac: number,
    rxFrac: number,
    ryFrac: number,
    rotDeg: number,
    a: number,
  ) => {
    const rx = rxFrac * rInner;
    const ry = ryFrac * rInner;
    ctx.save();
    ctx.translate(cx + dxFrac * rInner, cy + dyFrac * rInner);
    ctx.rotate((rotDeg * Math.PI) / 180);
    ctx.scale(rx / ry, 1);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(0.6, `rgba(255,255,255,${a * 0.26})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, ry, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  const paintGlass = () => {
    ctx.save();
    circle(rInner);
    ctx.clip();
    const ish = ctx.createRadialGradient(cx, cy, rInner * 0.74, cx, cy, rInner);
    ish.addColorStop(0, "rgba(0,0,0,0)");
    ish.addColorStop(1, "rgba(0,0,0,0.52)");
    ctx.fillStyle = ish;
    fillAll();
    ellipseGlow(0, -0.4, 0.82, 0.56, 0, 0.2); // broad domed sheen (fills the upper glass)
    ellipseGlow(-0.24, -0.52, 0.5, 0.3, -20, 0.5); // bright glint, clearly inside the glass
    ctx.restore();
  };

  // ── Brushed-steel bezel (fixed grey metal, not the picker color). Its only
  //    highlights are hairline arcs (bright across the top, dark across the
  //    bottom) so the eye reads the gloss on the glass, not the ring. ──────────
  const paintBezel = () => {
    ctx.save();
    circle(R);
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true); // annulus hole
    ctx.clip("evenodd");
    const g = ctx.createLinearGradient(0, cy - R, 0, cy + R);
    g.addColorStop(0, "#c4cbd4");
    g.addColorStop(0.13, "#949ca6");
    g.addColorStop(0.5, "#6a727d");
    g.addColorStop(0.86, "#414751");
    g.addColorStop(1, "#2a2e35");
    ctx.fillStyle = g;
    fillAll();
    const hi = ctx.createRadialGradient(size * 0.35, size * 0.28, size * 0.04, size * 0.35, size * 0.28, size * 0.75);
    hi.addColorStop(0, "rgba(238,242,246,0.4)"); // gentle metal sheen — must not out-shine the glass
    hi.addColorStop(0.5, "rgba(238,242,246,0)");
    hi.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = hi;
    fillAll();
    ctx.restore();
    // Outer dark rim + inner rim that caps the glass edge.
    ctx.strokeStyle = "#1b1e23";
    ctx.lineWidth = Math.max(1, size * 0.008);
    circle(R - ctx.lineWidth / 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(12,14,17,0.9)";
    ctx.lineWidth = Math.max(1.5, size * 0.0135);
    circle(rInner + ctx.lineWidth * 0.3);
    ctx.stroke();
  };

  paintInterior();
  if (image && !p.above) {
    ctx.save();
    circle(rInner);
    ctx.clip();
    paintArt(ctx, size, cx, cy, rInner, p, image);
    ctx.restore();
    paintGlass();
  } else if (!image) {
    paintGlass();
  }
  paintBezel();
  // Mini mode: the art floats on top of the whole token, uncropped.
  if (image && p.above) paintArt(ctx, size, cx, cy, rInner, p, image);
}

// Draw the complete token into `ctx` at the given square `size`. Pure w.r.t. the
// passed state, so the preview and the export share identical output.
function drawToken(
  ctx: CanvasRenderingContext2D,
  size: number,
  p: DrawParams,
  image: HTMLImageElement | null,
) {
  ctx.clearRect(0, 0, size, size);
  if (p.style === "steelglass") {
    drawSteelGlass(ctx, size, p, image);
    return;
  }
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - Math.max(1, size * 0.004); // tiny inset for clean AA
  const ringPx = Math.max(1, p.ringFrac * R);
  const rInner = Math.max(1, R - ringPx);

  // 1) Base disc — fills any gap the art leaves and makes the background match
  //    the ring color.
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = p.color;
  ctx.fill();
  ctx.restore();

  // The art, clipped to `clipR`. Sizing is always relative to the inner disc so
  // toggling placement never resizes it (zoom = 1 covers the inner disc); a
  // larger clip radius simply lets the art spill over the ring.
  const drawArt = (clipR: number | null) => {
    if (!image) return;
    ctx.save();
    if (clipR != null) {
      // null = no clip, so the figure can overhang the token edge.
      ctx.beginPath();
      ctx.arc(cx, cy, clipR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
    }

    const innerD = rInner * 2;
    const cover = innerD / Math.min(image.width, image.height); // cover fit
    const scale = cover * p.zoom;
    const w = image.width * scale;
    const h = image.height * scale;
    const dx = cx - w / 2 + p.offsetX * size;
    const dy = cy - h / 2 + p.offsetY * size;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, dx, dy, w, h);
    ctx.restore();
  };

  // The ring, drawn as an annulus (outer circle CW, inner circle CCW).
  const drawRing = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2, false);
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    if (p.style === "flat") {
      ctx.fillStyle = p.color;
      ctx.fillRect(0, 0, size, size);
    } else {
      // Beveled: concentric shading reads as a rounded, raised band — bright
      // inner lip → base → dark outer edge.
      const g = ctx.createRadialGradient(cx, cy, rInner, cx, cy, R);
      g.addColorStop(0, shade(p.color, 0.34));
      g.addColorStop(0.45, shade(p.color, 0.05));
      g.addColorStop(0.75, shade(p.color, -0.14));
      g.addColorStop(1, shade(p.color, -0.42));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      // A soft top-left highlight for directional light.
      const hl = ctx.createLinearGradient(0, 0, size, size);
      hl.addColorStop(0, "rgba(255,255,255,0.28)");
      hl.addColorStop(0.5, "rgba(255,255,255,0)");
      hl.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = hl;
      ctx.fillRect(0, 0, size, size);
    }
    ctx.restore();
  };

  const line = Math.max(1, size * 0.004);
  const outerRim = () => {
    ctx.lineWidth = line;
    ctx.strokeStyle = shade(p.color, -0.55);
    ctx.beginPath();
    ctx.arc(cx, cy, R - line / 2, 0, Math.PI * 2);
    ctx.stroke();
  };

  // Order depends on placement. Mini mode draws the ring and its rim first, then
  // the art floats on top UNCROPPED so the figure can overhang the token edge.
  // Framed mode clips the art inside the ring, then draws the ring and edges.
  if (p.above) {
    drawRing();
    outerRim();
    drawArt(null);
  } else {
    drawArt(rInner);
    drawRing();
    outerRim();
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.arc(cx, cy, rInner + line / 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export default function TokenMaker() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("token");
  const [style, setStyle] = useState<RingStyle>("steelglass");
  const [color, setColor] = useState<string>("#3a3f47");
  const [ringFrac, setRingFrac] = useState<number>(DEFAULT_RING_FRAC);
  const [above, setAbove] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dropActive, setDropActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragState = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  // Active touch/mouse pointers for multi-touch pinch-zoom + pan.
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchState = useRef<{ dist: number; zoom: number; mx: number; my: number; ox: number; oy: number } | null>(null);

  const params = useMemo<DrawParams>(
    () => ({ style, color, ringFrac, above, zoom, offsetX: offset.x, offsetY: offset.y }),
    [style, color, ringFrac, above, zoom, offset.x, offset.y],
  );

  // Redraw the preview whenever anything changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const px = PREVIEW_SIZE * dpr;
    if (canvas.width !== px) {
      canvas.width = px;
      canvas.height = px;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawToken(ctx, px, params, image);
  }, [params, image]);

  const loadFile = useCallback((file: File | null | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
    const base = file.name.replace(/\.[^.]+$/, "");
    if (base) setFileName(base);
  }, []);

  // Accept a pasted image from the clipboard.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) => i.type.startsWith("image/"));
      if (item) loadFile(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [loadFile]);

  // Drag to pan (one finger / mouse); pinch with two fingers to zoom + pan.
  // Both routes go through pointer events so touch and mouse share one path.
  const twoPointDist = () => {
    const pts = Array.from(pointers.current.values());
    return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  };
  const twoPointMid = () => {
    const pts = Array.from(pointers.current.values());
    return { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (!image) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size >= 2) {
      // Second finger down → start a pinch; freeze the current zoom/offset + the
      // starting finger spread and midpoint to measure against.
      const m = twoPointMid();
      pinchState.current = { dist: twoPointDist() || 1, zoom, mx: m.x, my: m.y, ox: offset.x, oy: offset.y };
      dragState.current = null;
      setDragging(false);
    } else {
      dragState.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
      setDragging(true);
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    // Normalize by the canvas's actual on-screen size so panning stays 1:1 even
    // when the preview is scaled down on small screens.
    const rect = canvasRef.current?.getBoundingClientRect();
    const w = rect?.width || PREVIEW_SIZE;
    const h = rect?.height || PREVIEW_SIZE;
    const ps = pinchState.current;
    if (pointers.current.size >= 2 && ps) {
      // Pinch: zoom by the change in finger spread, and pan by the change in the
      // fingers' midpoint so the gesture tracks under your fingers.
      const ratio = twoPointDist() / ps.dist;
      setZoom(Math.min(5, Math.max(0.5, ps.zoom * ratio)));
      const m = twoPointMid();
      setOffset({ x: ps.ox + (m.x - ps.mx) / w, y: ps.oy + (m.y - ps.my) / h });
      return;
    }
    const st = dragState.current;
    if (!st) return;
    const dx = (e.clientX - st.startX) / w;
    const dy = (e.clientY - st.startY) / h;
    setOffset({ x: st.ox + dx, y: st.oy + dy });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    if (pointers.current.size < 2) pinchState.current = null;
    if (pointers.current.size === 0) {
      dragState.current = null;
      setDragging(false);
    } else {
      // A finger lifted out of a pinch — hand control back to the remaining one
      // so a single-finger pan continues seamlessly.
      const only = Array.from(pointers.current.values())[0];
      dragState.current = { startX: only.x, startY: only.y, ox: offset.x, oy: offset.y };
    }
  };

  // Zoom with the wheel, centered on the token.
  const onWheel = (e: React.WheelEvent) => {
    if (!image) return;
    const next = Math.min(5, Math.max(0.5, zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08)));
    setZoom(next);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropActive(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const download = useCallback(() => {
    const out = document.createElement("canvas");
    out.width = EXPORT_SIZE;
    out.height = EXPORT_SIZE;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    drawToken(ctx, EXPORT_SIZE, params, image);
    // Export WebP, not PNG: a round token is drawn once and then re-uploaded to the
    // VTT and shipped to every player over the live-sync channel, so a smaller file
    // is lighter everywhere it travels. WebP keeps the token's alpha (the circular
    // cutout) and at quality 0.92 is visually identical to the PNG at roughly a
    // third of the size. Browsers without canvas WebP encoding fall back to PNG.
    const save = (blob: Blob | null, ext: string) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName || "token"}-token.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };
    out.toBlob((blob) => {
      if (blob && blob.type === "image/webp") save(blob, "webp");
      else out.toBlob((png) => save(png, "png"), "image/png"); // fallback: encoder ignored WebP
    }, "image/webp", 0.92);
  }, [params, image, fileName]);

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const btnBase =
    "rounded border px-3 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors";

  return (
    <div className="grid gap-8 lg:grid-cols-[440px_1fr]">
      {/* ── Preview ─────────────────────────────────────────────────────── */}
      <div className="flex w-full min-w-0 flex-col items-center gap-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDropActive(true);
          }}
          onDragLeave={() => setDropActive(false)}
          onDrop={onDrop}
          className={`relative overflow-hidden rounded-lg border ${
            dropActive ? "border-[var(--gold)]" : "border-[var(--border)]"
          }`}
          style={{
            // Responsive: fill the column but never exceed PREVIEW_SIZE, and
            // stay square. A fixed px width here overflowed narrow phones.
            width: "100%",
            maxWidth: PREVIEW_SIZE,
            aspectRatio: "1 / 1",
            // Checkerboard so PNG transparency is visible in the preview.
            backgroundColor: "#1a1a1d",
            backgroundImage:
              "linear-gradient(45deg,#232327 25%,transparent 25%),linear-gradient(-45deg,#232327 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#232327 75%),linear-gradient(-45deg,transparent 75%,#232327 75%)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0,0 12px,12px -12px,-12px 0",
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
            className={`absolute inset-0 h-full w-full touch-none select-none ${
              image ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
            }`}
          />
          {!image ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
            >
              <span className="font-display text-lg text-[var(--text)]">Drop an image here</span>
              <span className="text-[12px] uppercase tracking-[0.15em] text-[var(--muted)]">
                or click to browse
              </span>
            </button>
          ) : null}
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={!image}
            className={`${btnBase} flex-1 border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40`}
          >
            Recenter
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => loadFile(e.target.files?.[0])}
        />
      </div>

      {/* ── Controls ────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-col gap-7">
        <div>
          <ControlHeading>Ring style</ControlHeading>
          <div className="grid grid-cols-3 gap-2">
            {STYLES.map((s) => {
              const active = style === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id)}
                  title={s.hint}
                  className={`${btnBase} flex flex-col items-center gap-1 py-3 ${
                    active
                      ? "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]"
                      : "border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]"
                  }`}
                >
                  <RingIcon style={s.id} color={active ? color : "#8a8a93"} />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <ControlHeading>Color</ControlHeading>
          <div className="flex flex-wrap items-center gap-2">
            {SWATCHES.map((sw) => (
              <button
                key={sw}
                type="button"
                aria-label={`Use ${sw}`}
                onClick={() => setColor(sw)}
                className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  color.toLowerCase() === sw.toLowerCase()
                    ? "border-[var(--text)]"
                    : "border-[var(--border)]"
                }`}
                style={{ backgroundColor: sw }}
              />
            ))}
            <label className="ml-1 flex items-center gap-2 rounded border border-[var(--border)] bg-[var(--panel)] px-2 py-1.5">
              <span
                className="h-6 w-6 rounded-full border border-[var(--border)]"
                style={{ backgroundColor: color }}
              />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-6 w-8 cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="font-mono text-[12px] uppercase text-[var(--muted)]">{color}</span>
            </label>
          </div>
        </div>

        <div>
          <ControlHeading>Image placement</ControlHeading>
          <div className="grid grid-cols-2 gap-2">
            {[
              { above: false, label: "Inside ring", hint: "Art is framed inside the ring" },
              { above: true, label: "Above ring · mini", hint: "Art sits on top of the ring — for transparent-background minis" },
            ].map((opt) => {
              const active = above === opt.above;
              return (
                <button
                  key={opt.label}
                  type="button"
                  title={opt.hint}
                  onClick={() => setAbove(opt.above)}
                  className={`${btnBase} py-3 ${
                    active
                      ? "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]"
                      : "border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            Use “Above ring” for top-down art with a transparent background — the figure sits on
            top of the ring, uncropped, and can overhang the token edge like a digital mini.
          </p>
        </div>

        {style !== "steelglass" && (
          <div>
            <ControlHeading>
              Ring thickness <Value>{Math.round(ringFrac * 100)}%</Value>
              <button
                type="button"
                onClick={() => setRingFrac(DEFAULT_RING_FRAC)}
                className="ml-auto text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] underline hover:text-[var(--gold)]"
              >
                Reset
              </button>
            </ControlHeading>
            <Slider min={0.05} max={0.24} step={0.005} value={ringFrac} onChange={setRingFrac} />
          </div>
        )}

        <div className="mt-1 border-t border-[var(--border)] pt-6">
          <button
            type="button"
            onClick={download}
            disabled={!image}
            className="w-full rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.15em] text-[#141208] transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:bg-[var(--panel)] disabled:text-[var(--muted)]"
          >
            Download WebP · {EXPORT_SIZE}px
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Small presentational helpers ─────────────────────────────────────────────
function ControlHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
      {children}
    </h2>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[12px] normal-case tracking-normal text-[var(--gold)]">{children}</span>;
}

function Slider({
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--panel-2)] accent-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
    />
  );
}

// A tiny inline swatch that previews each ring style in the style picker.
function RingIcon({ style, color }: { style: RingStyle; color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const s = 44;
    if (c.width !== s) {
      c.width = s;
      c.height = s;
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    drawToken(ctx, s, { style, color, ringFrac: 0.2, above: false, zoom: 1, offsetX: 0, offsetY: 0 }, null);
  }, [style, color]);
  return <canvas ref={ref} className="h-[22px] w-[22px]" aria-hidden />;
}
