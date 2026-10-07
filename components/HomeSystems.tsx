"use client";

// The home page's game tiles. A client component for one reason: choosing a
// system is CLIENT state (systemStore -> localStorage), the same store SiteNav's
// dropdown and the dashboard's panels read, so a plain <Link href="/dashboard">
// would land you on whatever system was already stored rather than the one you
// just clicked.
//
// It sets the system exactly the way SiteNav's chooseSystem does — setSystem, then
// navigate — so the two can't drift. The view is deliberately NOT touched: if you
// were last looking at Adventures, picking a system keeps you on Adventures, which
// is the behaviour the dashboard itself was fixed to have.
//
// ALL THE STYLING IS IN app/globals.css, under .home-tile — each tile wears its
// own system's display face, accent and cover texture, and those three facts only
// exist in CSS. This file emits `data-sys` and the name and nothing else; see the
// long note over that block for why the mappings can't just be read from the
// :root[data-system] blocks.
//
// No focus styling: nothing in this codebase defines any (not one focus-visible
// rule in app/ or components/, none in globals.css), and these are native
// <button>s, so the browser's own ring already works. A focus treatment on one
// page would make it the odd one out; it is worth doing site-wide or not at all.

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SYSTEMS, setSystem, type SystemKey } from "./systemStore";

// Smallest and largest a wordmark may be set. The floor keeps a long name in a
// narrow face readable on a phone; the ceiling stops "ACE!" becoming a billboard.
const MIN_PX = 12;
const MAX_PX = 34;

// Size every wordmark to fill its own tile.
//
// Setting all fourteen at one font-size does not look like one size, because the
// faces disagree about what a font-size is: a capital H at 100px measures 60 in
// DnDC and 91 in Shadowdark's blackletter. Length differs too — "ACE!" and
// "Justice League Unlimited" cannot share a size and both look right. Hand-tuning
// per system fixes today's fourteen and silently mis-sizes the fifteenth.
//
// So each name is binary-searched to the largest size whose RENDERED BOX still
// fits the tile's content box, on both axes. That lands on the same answer the
// eye would, from the thing the eye actually judges, and a new system needs no
// entry anywhere.
//
// MEASURED TWO WAYS, AND THE BIGGER ONE WINS. Neither measurement is sufficient
// on its own, and using only the first is a bug this already had:
//
//   - The ELEMENT's own rect catches Marvel's red plate, whose padding is part of
//     the lockup and has to be paid for. But the name carries `max-width: 100%`,
//     so when a single unbreakable word is too wide to fit — "Shadowdark",
//     "Ghostbusters" — the element's box is CLAMPED at the room available while
//     the text spills out of it. Every size then measures as fitting, the search
//     runs all the way up to MAX_PX, and the word is drawn clipped at both ends.
//   - A RANGE over the contents measures the text's real boxes, overflow and all,
//     so it catches exactly that. But a range measures text, not padding, so on
//     its own it would let Marvel's plate run past the edge.
//
// scrollWidth is no use for either: on an inline-block it reports the content
// width and misses horizontal overflow entirely.
function fitTileNames(root: HTMLElement) {
  const range = document.createRange();
  for (const name of Array.from(root.querySelectorAll<HTMLElement>(".home-tile-name"))) {
    const tile = name.parentElement;
    if (!tile) continue;
    const cs = getComputedStyle(tile);
    const roomW = tile.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const roomH = tile.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (!(roomW > 0 && roomH > 0)) continue;

    let lo = MIN_PX;
    let hi = MAX_PX;
    let best = MIN_PX;
    // Eight halvings of a 22px range settles to under a tenth of a pixel, which is
    // finer than anything that can be seen; more passes would only cost layouts.
    for (let i = 0; i < 8; i++) {
      const mid = (lo + hi) / 2;
      name.style.fontSize = `${mid}px`;
      const box = name.getBoundingClientRect();
      range.selectNodeContents(name);
      const ink = range.getBoundingClientRect();
      const w = Math.max(box.width, ink.width);
      const h = Math.max(box.height, ink.height);
      if (w <= roomW + 0.5 && h <= roomH + 0.5) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }
    name.style.fontSize = `${best.toFixed(2)}px`;
  }
}

// Wordmarks that are more than one colour, split into the pieces the stylesheet
// colours (.tn-1 / .tn-2 under .home-tile[data-sys="…"] in app/globals.css).
// Dungeon Crawler Carl is the only one today — gold "Dungeon", magenta "Crawler
// Carl", which is how the cover reads. The parts are joined by a space when
// rendered, so they must spell the system's own name exactly; a system that is
// not listed here just renders SYSTEMS[].name in one colour.
const NAME_PARTS: Partial<Record<SystemKey, [string, string]>> = {
  DCC: ["Dungeon", "Crawler Carl"],
  // Marvel's logo puts only the word MARVEL in the red plate; the rest of the
  // title sits plain beneath it. Splitting here is what lets the stylesheet plate
  // one part and not the other.
  MMRPG: ["Marvel", "Multiverse RPG"],
};

export default function HomeSystems({ hiddenKeys }: { hiddenKeys: SystemKey[] }) {
  const router = useRouter();
  const gridRef = useRef<HTMLUListElement>(null);

  const refit = useCallback(() => {
    if (gridRef.current) fitTileNames(gridRef.current);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    // AFTER the faces load, not before: four of these are self-hosted brand faces,
    // and measuring while a fallback is still showing fits the wrong metrics and
    // leaves every one of those tiles wrong until something else forces a refit.
    let alive = true;
    const run = () => { if (alive) refit(); };
    run();
    if (document.fonts?.ready) document.fonts.ready.then(run).catch(() => {});
    // The tiles reflow at the grid's breakpoints, so the room changes without the
    // text changing. ResizeObserver covers that and the window resize both.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(run) : null;
    ro?.observe(el);
    window.addEventListener("resize", run);
    return () => {
      alive = false;
      ro?.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [refit]);
  // Admin-hidden systems are left out, the same filter SiteNav applies to its
  // dropdown. Falling back to the full list when everything is hidden matches
  // SiteNav too — there is always something to pick.
  const offered = SYSTEMS.filter((s) => !hiddenKeys.includes(s.key));
  const list = offered.length ? offered : SYSTEMS;

  function open(key: SystemKey) {
    setSystem(key);
    router.push("/dashboard");
  }

  // .home-grid (app/globals.css) rather than Tailwind's grid utilities: it is a
  // flex wrap, so a short last row centres instead of hugging the left. A CSS
  // grid can't do that — justify-content centres the whole grid, not its last row.
  return (
    <ul ref={gridRef} className="home-grid">
      {list.map((s) => (
        <li key={s.key}>
          <button type="button" data-sys={s.key} onClick={() => open(s.key)} className="home-tile w-full">
            <span className="home-tile-name">
              {NAME_PARTS[s.key] ? (
                <>
                  <span className="tn-1">{NAME_PARTS[s.key]![0]}</span>{" "}
                  <span className="tn-2">{NAME_PARTS[s.key]![1]}</span>
                </>
              ) : (
                s.name
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
