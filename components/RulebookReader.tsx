"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  subscribeSystem,
  getSystemSnapshot,
  serverSystem,
  setSystem,
  isSystemKey,
  type SystemKey,
} from "@/components/systemStore";

// The Rulebook Compendium's PDF viewer. It mounts the shared, site-wide reader
// (window.DCCPdfReader, /vendor/dcc-pdf-reader.js) — the SAME component,
// toolbar, chapters panel and gestures the GM Screen uses, so there's one system
// to maintain. It opens ONE book: there is no tab bar of every book any more —
// the toolbar's "← Library" button goes back to the system's Library shelf,
// which is where you pick another. Page position is remembered per book in
// localStorage. On desktop the reader is capped to a contained column
// (like the GM Screen pane) rather than spanning the whole window.

type Book = { file: string; title: string; url: string; system: string };
type ReaderInstance = {
  setBooks: (list: Book[], active?: string) => void;
  destroy: () => void;
};
type ReaderOpts = {
  onBack?: () => void;
  backLabel?: string;
  onPage?: (docKey: string, page: number) => void;
  onActiveBook?: (docKey: string) => void;
  getStartPage?: (docKey: string) => number;
  showOpenInNew?: boolean;
  showDownload?: boolean;
  emptyText?: string;
  onSpreadChange?: (on: boolean) => void;
};
type ReaderFactory = { create: (el: HTMLElement, opts: ReaderOpts) => ReaderInstance };
declare global {
  interface Window {
    pdfjsLib?: unknown;
    DCCPdfReader?: ReaderFactory;
  }
}

const posKey = (file: string) => `dcc-rule-pos:${file}`;

// /vendor is cached for a day (+ a week stale-while-revalidate) under a fixed
// name, so a changed reader can keep serving the old copy. Bump this whenever
// public/vendor/dcc-pdf-reader.js changes (the GM Screen loader uses the same).
const READER_V = "2026-10-22b";

// Load a script once and resolve when ready (idempotent across remounts).
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-dcc-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(src)));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.dccSrc = src;
    s.addEventListener("load", () => {
      s.dataset.loaded = "1";
      resolve();
    });
    s.addEventListener("error", () => reject(new Error(src)));
    document.head.appendChild(s);
  });
}

export default function RulebookReader({
  books,
  active,
  initialSystem,
}: {
  books: Book[];
  active: string;
  initialSystem?: SystemKey;
}) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<ReaderInstance | null>(null);
  const activeFileRef = useRef(active);
  // Two-page spreads need more room than the single-page column.
  const [spread, setSpread] = useState(false);
  // Widen the column up front when spreads are remembered (the reader's own
  // "dccpdf-spread" key), so the first page fit is computed at full width rather
  // than in the narrow single-page column. Done in an effect, not the useState
  // initializer, to keep server and client markup identical.
  useEffect(() => {
    try {
      if (localStorage.getItem("dccpdf-spread") === "1") setSpread(true);
    } catch {
      /* storage unavailable — the reader's onSpreadChange still corrects it */
    }
  }, []);

  // The selected game system (same store the dashboard toggle + grid use).
  const activeSystem = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    serverSystem(initialSystem),
  );
  const sysRef = useRef(activeSystem);
  sysRef.current = activeSystem;

  const openBook = books.find((b) => b.file === active);
  // True when the open book belongs on the selected system's shelf.
  const fitsSystem = (sys: string) => !openBook || openBook.system === "BOTH" || openBook.system === sys;

  // Create the reader once; the Library re-navigates (remounts) to change books.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadScript("/vendor/pdfjs/pdf.min.js");
        await loadScript(`/vendor/dcc-pdf-reader.js?v=${READER_V}`);
      } catch {
        return; // scripts blocked; nothing we can do here
      }
      if (cancelled || !hostRef.current || !window.DCCPdfReader) return;
      const reader = window.DCCPdfReader.create(hostRef.current, {
        showOpenInNew: true,
        showDownload: true,
        emptyText: "No rulebooks available.",
        onSpreadChange: (on: boolean) => setSpread(on),
        onBack: () => router.push("/library"),
        backLabel: "Library",
        getStartPage: (file: string) => {
          try {
            const v = parseInt(localStorage.getItem(posKey(file)) || "", 10);
            return v > 0 ? v : 1;
          } catch {
            return 1;
          }
        },
        onPage: (file: string, page: number) => {
          try {
            localStorage.setItem(posKey(file), String(page));
          } catch {
            /* ignore storage failures */
          }
        },
        onActiveBook: (file: string) => {
          activeFileRef.current = file;
          try {
            window.history.replaceState(null, "", `/library?book=${encodeURIComponent(file)}`);
          } catch {
            /* history unavailable — non-fatal */
          }
        },
      });
      readerRef.current = reader;
      // The book was opened from a system's shelf (or a direct link). Make the
      // global system match it so the nav toggle — and the shelf "← Library"
      // returns to — stay in step.
      if (openBook && isSystemKey(openBook.system) && openBook.system !== sysRef.current) {
        sysRef.current = openBook.system as SystemKey;
        setSystem(openBook.system as SystemKey);
      }
      reader.setBooks(openBook ? [openBook] : [], active);
    })();

    return () => {
      cancelled = true;
      if (readerRef.current) {
        try {
          readerRef.current.destroy();
        } catch {
          /* already torn down */
        }
        readerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switching to a system this book isn't part of goes back to that system's
  // Library shelf (a shared "all systems" book stays open).
  useEffect(() => {
    if (readerRef.current && !fitsSystem(activeSystem)) router.push("/library");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSystem]);

  // Size the reader to exactly the space BELOW the site nav. Using 100vh would
  // overshoot by the nav's height (the nav sits above {children} in the layout),
  // cutting off the bottom of a fit-to-page view and forcing a page scroll.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Measured against the page top (not the viewport) so a scrolled window
    // can't skew it.
    const fit = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const h = Math.max(240, Math.floor(window.innerHeight - top)) + "px";
      if (el.style.height !== h) el.style.height = h;
    };
    fit();
    // The nav above can change height AFTER mount — web fonts finishing, the
    // nav restyling when opening a book switches the system, the title re-fit —
    // and a one-time measurement then overshoots, forcing a page scroll. Re-fit
    // whenever the body's layout changes (setting our own height to the same
    // value is a no-op, so this can't loop) and once fonts are ready.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(document.body);
    const nav = el.previousElementSibling;
    if (nav) ro?.observe(nav);
    document.fonts?.ready.then(fit).catch(() => {});
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  // Full height; on desktop the reader is capped to a contained column (centered,
  // wider while two-page spreads are on,
  // with side rules) instead of spanning the whole window — matching the GM
  // Screen pane. The host has a definite height either way (parent is h-screen;
  // row-flex stretch), so the reader's fit-to-page math works.
  //
  // data-no-pull-refresh: PullToRefresh is mounted in the root layout, so it is on
  // this page too, and it listens on `window` gated only on `window.scrollY <= 0`.
  // This reader is 100dvh and pdf.js scrolls its OWN container, so the window never
  // scrolls, that gate stood permanently open, and every downward drag in here was
  // swallowed as a pull — cancelling the scroll pdf.js needed and reloading the page
  // instead of going back a page. Opting out is unconditional on purpose: even on
  // page 1, a drag downward inside a book should move the book.
  return (
    <div
      ref={wrapRef}
      data-no-pull-refresh
      className="flex justify-center"
      style={{ height: "100dvh" }}
    >
      <div
        ref={hostRef}
        className={`min-h-0 w-full ${spread ? "max-w-[1800px]" : "max-w-[1024px]"} border-[var(--border)] sm:border-x`}
      />
    </div>
  );
}
