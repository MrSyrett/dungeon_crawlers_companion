// ─────────────────────────────────────────────────────────────────────────────
// Size the game's title beside the logo (both navbars: components/SiteNav.tsx
// the standalone bar, lib/sitenav.ts, and the GM Screen / VTT bar, lib/minibar.ts,
// which both embed this function's source).
//
// Every game's face has different proportions, so one font-size makes some
// names look tiny. Instead the LETTERS are sized: the title's tallest glyph is
// measured (canvas measureText, in the face actually loaded) and the font-size
// is set so that glyph stands as tall as the logo's visible mark. The visible
// ink is then centred on the logo, whatever the face's ascent/descent.
//
// Only when the name won't fit its zone at that height does it shrink (to a
// readable floor), and past that it wraps to two compact lines — the bar's
// height never changes (the CSS margins hold the box to the 32px row).
//
// Keep this function self-contained and plain JS: lib/sitenav.ts inlines it
// with Function.prototype.toString().
// ─────────────────────────────────────────────────────────────────────────────

export function fitNavTitle(el: HTMLElement, ink?: number): void {
  const INK = ink || 29; // px — the logo's visible mark: 29 beside the 32px logo, 20 beside the bar's 22px one
  const FLOOR = 14;
  el.classList.remove("is-wrap");
  el.style.fontSize = "";
  el.style.transform = "";
  const cs = getComputedStyle(el);
  const base = parseFloat(cs.fontSize) || 30;
  let text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (!text) return;
  if (cs.textTransform === "uppercase") text = text.toUpperCase();
  else if (cs.textTransform === "lowercase") text = text.toLowerCase();

  let ctx: CanvasRenderingContext2D | null = null;
  try { ctx = document.createElement("canvas").getContext("2d"); } catch { ctx = null; }
  let inkEm = 0.72, ascEm = 0.9, descEm = 0.25;
  if (ctx) {
    ctx.font = cs.fontStyle + " " + cs.fontWeight + " 100px " + cs.fontFamily;
    const m = ctx.measureText(text);
    if (m.actualBoundingBoxAscent > 0) inkEm = m.actualBoundingBoxAscent / 100;
    if (m.fontBoundingBoxAscent > 0) { ascEm = m.fontBoundingBoxAscent / 100; descEm = (m.fontBoundingBoxDescent || 0) / 100; }
  }
  // An outline drawn outward (Nimble) adds half its width above the letters.
  const stroke = parseFloat((cs as unknown as Record<string, string>).webkitTextStrokeWidth || "0") || 0;
  inkEm += stroke / base / 2;
  // A coloured plate behind part of the name (Marvel's red MARVEL box) is the
  // tallest thing drawn: size by the plate instead.
  const plate = el.querySelector(".tn-1") as HTMLElement | null;
  let plateEm = 0;
  if (plate) {
    const bg = getComputedStyle(plate).backgroundColor;
    if (bg && bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg)) plateEm = plate.getBoundingClientRect().height / base;
  }
  const target = plateEm > inkEm ? plateEm : inkEm;
  let size = Math.max(FLOOR, Math.min(48, INK / target));
  el.style.fontSize = size + "px";

  // Too wide? Measured exactly: scrollWidth rounds to whole pixels, and a
  // fraction of a pixel over is enough for the browser to draw "…".
  const wide = function () {
    const r = document.createRange();
    r.selectNodeContents(el);
    const c = getComputedStyle(el);
    const room = el.getBoundingClientRect().width - (parseFloat(c.paddingLeft) || 0) - (parseFloat(c.paddingRight) || 0);
    return r.getBoundingClientRect().width > room + 0.01;
  };
  let g = 0;
  while (wide() && size > FLOOR && g++ < 80) { size -= 0.5; el.style.fontSize = size + "px"; }
  // One word can't wrap without breaking mid-word ("Shadowdar|k"): keep it on
  // one line and let it go smaller instead.
  if (wide() && !/\s/.test(text)) {
    g = 0;
    while (wide() && size > 10 && g++ < 40) { size -= 0.5; el.style.fontSize = size + "px"; }
  }
  if (wide() && /\s/.test(text)) {
    // Still too long: two compact lines that fit the bar's height.
    el.classList.add("is-wrap");
    size = 15;
    el.style.fontSize = size + "px";
    g = 0;
    while ((el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight + size * 0.45) && size > 10 && g++ < 40) {
      size -= 0.5; el.style.fontSize = size + "px";
    }
    return;
  }

  // Centre the visible letters (or the plate) on the box, which the flex row
  // centres on the logo. Baseline sits half the leading plus the ascent down.
  const s2 = getComputedStyle(el);
  const padTop = parseFloat(s2.paddingTop) || 0;
  const lineH = parseFloat(s2.lineHeight) || size * 1.2;
  const boxH = el.getBoundingClientRect().height;
  let inkTop: number, inkBot: number;
  if (plateEm > inkEm && plate) {
    const er = el.getBoundingClientRect(), pr = plate.getBoundingClientRect();
    inkTop = pr.top - er.top; inkBot = pr.bottom - er.top;
  } else {
    const baseline = padTop + (lineH - (ascEm + descEm) * size) / 2 + ascEm * size;
    inkTop = baseline - inkEm * size; inkBot = baseline;
  }
  const shift = boxH / 2 - (inkTop + inkBot) / 2;
  if (Math.abs(shift) > 0.5) el.style.transform = "translateY(" + shift.toFixed(1) + "px)";
}
