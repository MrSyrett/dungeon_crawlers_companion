"use client";

// Token Maker — a client-side canvas tool for turning an uploaded image into a
// round VTT token with a colorized ring. No server round-trip: everything runs
// in the browser and the finished token is offered as a transparent PNG
// download.
//
// Ring styles (all driven by a single base color; the disc behind the art is
// always filled with that same color so the background matches the ring):
//   • flat     — a solid band of the chosen color.
//   • beveled  — a rounded, raised band shaded from a light inner lip to a dark
//                outer edge.
//   • metallic — the chosen color rendered as polished metal via a banded
//                specular sweep (tinted gold/silver/bronze/etc.).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type RingStyle = "flat" | "beveled" | "metallic";

const EXPORT_SIZE = 256; // finished token dimensions in px
const PREVIEW_SIZE = 440; // on-screen preview canvas (CSS + backing px scaled by DPR)

const STYLES: { id: RingStyle; label: string; hint: string }[] = [
  { id: "flat", label: "Flat", hint: "Simple solid ring" },
  { id: "beveled", label: "Beveled", hint: "Raised, rounded ring" },
  { id: "metallic", label: "Metallic", hint: "Polished tinted metal" },
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

// Draw the complete token into `ctx` at the given square `size`. Pure w.r.t. the
// passed state, so the preview and the export share identical output.
function drawToken(
  ctx: CanvasRenderingContext2D,
  size: number,
  p: DrawParams,
  image: HTMLImageElement | null,
) {
  ctx.clearRect(0, 0, size, size);
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
    } else if (p.style === "beveled") {
      // Concentric shading reads as a rounded, raised band: bright inner lip →
      // base → dark outer edge.
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
    } else {
      // Metallic: a banded specular sweep across the ring, tinted to the color.
      const g = ctx.createLinearGradient(0, 0, size * 0.6, size);
      g.addColorStop(0.0, shade(p.color, -0.45));
      g.addColorStop(0.12, shade(p.color, 0.55));
      g.addColorStop(0.26, shade(p.color, -0.1));
      g.addColorStop(0.4, shade(p.color, 0.4));
      g.addColorStop(0.52, shade(p.color, -0.28));
      g.addColorStop(0.66, shade(p.color, 0.5));
      g.addColorStop(0.8, shade(p.color, -0.2));
      g.addColorStop(1.0, shade(p.color, -0.5));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      // A round cross-section shade on top so the band still reads as raised.
      const bev = ctx.createRadialGradient(cx, cy, rInner, cx, cy, R);
      bev.addColorStop(0, "rgba(255,255,255,0.16)");
      bev.addColorStop(0.5, "rgba(255,255,255,0)");
      bev.addColorStop(1, "rgba(0,0,0,0.3)");
      ctx.fillStyle = bev;
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
  const [style, setStyle] = useState<RingStyle>("beveled");
  const [color, setColor] = useState<string>("#c8a020");
  const [ringFrac, setRingFrac] = useState<number>(DEFAULT_RING_FRAC);
  const [above, setAbove] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dropActive, setDropActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragState = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

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

  // Pan with pointer drag.
  const onPointerDown = (e: React.PointerEvent) => {
    if (!image) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const st = dragState.current;
    if (!st) return;
    const dx = (e.clientX - st.startX) / PREVIEW_SIZE;
    const dy = (e.clientY - st.startY) / PREVIEW_SIZE;
    setOffset({ x: st.ox + dx, y: st.oy + dy });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragState.current = null;
    setDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
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
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName || "token"}-token.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
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
      <div className="flex flex-col items-center gap-4">
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
            width: PREVIEW_SIZE,
            height: PREVIEW_SIZE,
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
                or click to browse · paste works too
              </span>
            </button>
          ) : null}
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`${btnBase} flex-1 border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]`}
          >
            {image ? "Replace image" : "Upload image"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={!image}
            className={`${btnBase} border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40`}
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
      <div className="flex flex-col gap-7">
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
          <ControlHeading>Ring color</ControlHeading>
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
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            The disc behind your art is filled with this same color, so the background always
            matches the ring.
          </p>
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

        <div>
          <ControlHeading>
            Zoom <Value>{zoom.toFixed(2)}×</Value>
          </ControlHeading>
          <Slider
            min={0.5}
            max={5}
            step={0.01}
            value={zoom}
            onChange={setZoom}
            disabled={!image}
          />
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            Drag the token to reposition · scroll to zoom.
          </p>
        </div>

        <div className="mt-1 border-t border-[var(--border)] pt-6">
          <button
            type="button"
            onClick={download}
            disabled={!image}
            className="w-full rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.15em] text-[#141208] transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:bg-[var(--panel)] disabled:text-[var(--muted)]"
          >
            Download PNG · {EXPORT_SIZE}px
          </button>
          <p className="mt-2 text-center text-[12px] text-[var(--muted)]">
            Transparent outside the ring — drops straight onto a VTT map.
          </p>
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
