"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
  setSystem,
  isSystemKey,
  type SystemKey,
} from "@/components/systemStore";

// The Rulebook Compendium's PDF viewer. It mounts the shared, site-wide reader
// (window.DCCPdfReader, /vendor/dcc-pdf-reader.js) — the SAME component, tab bar,
// toolbar, chapters panel and gestures the GM Screen uses, so there's one system
// to maintain. We hand it the book list (it renders the tabs) filtered to the
// selected game system, and the book to open; page position is remembered per
// book in localStorage. On desktop the reader is capped to a contained column
// (like the GM Screen pane) rather than spanning the whole window.

type Book = { file: string; title: string; url: string; system: string };
type ReaderInstance = {
  setBooks: (list: Book[], active?: string) => void;
  destroy: () => void;
};
type ReaderOpts = {
  onPage?: (docKey: string, page: number) => void;
  onActiveBook?: (docKey: string) => void;
  getStartPage?: (docKey: string) => number;
  showOpenInNew?: boolean;
  showDownload?: boolean;
  emptyText?: string;
};
type ReaderFactory = { create: (el: HTMLElement, opts: ReaderOpts) => ReaderInstance };
declare global {
  interface Window {
    pdfjsLib?: unknown;
    DCCPdfReader?: ReaderFactory;
  }
}

const posKey = (file: string) => `dcc-rule-pos:${file}`;

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
}: {
  books: Book[];
  active: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<ReaderInstance | null>(null);
  const activeFileRef = useRef(active);

  // The selected game system (same store the dashboard toggle + grid use).
  const activeSystem = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getSystemServerSnapshot,
  );
  const sysRef = useRef(activeSystem);
  sysRef.current = activeSystem;

  // Only tabs for the SELECTED system ("BOTH" always shows). On a system swap the
  // current book is intentionally dropped if it isn't in the new system — setBooks
  // then opens that system's first book, which (after lib ordering) is its core
  // rule book.
  function applyBooks(reader: ReaderInstance) {
    const sys = sysRef.current;
    const shown = books.filter((b) => b.system === "BOTH" || b.system === sys);
    reader.setBooks(shown, activeFileRef.current);
  }

  // Create the reader once; /rules re-navigates (remounts) to change books.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadScript("/vendor/pdfjs/pdf.min.js");
        await loadScript("/vendor/dcc-pdf-reader.js");
      } catch {
        return; // scripts blocked; nothing we can do here
      }
      if (cancelled || !hostRef.current || !window.DCCPdfReader) return;
      const reader = window.DCCPdfReader.create(hostRef.current, {
        showOpenInNew: true,
        showDownload: true,
        emptyText: "No rulebooks available.",
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
            window.history.replaceState(null, "", `/rules?book=${encodeURIComponent(file)}`);
          } catch {
            /* history unavailable — non-fatal */
          }
        },
      });
      readerRef.current = reader;
      // The book was opened from a system-filtered grid (or a direct link). Make
      // the global system match it so the tabs filter to the right system and the
      // nav toggle stays in step.
      const openedBook = books.find((b) => b.file === active);
      if (openedBook && isSystemKey(openedBook.system) && openedBook.system !== sysRef.current) {
        sysRef.current = openedBook.system as SystemKey;
        setSystem(openedBook.system as SystemKey);
      }
      applyBooks(reader);
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

  // Re-filter the tabs when the selected system changes.
  useEffect(() => {
    if (readerRef.current) applyBooks(readerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSystem]);

  // Size the reader to exactly the space BELOW the site nav. Using 100vh would
  // overshoot by the nav's height (the nav sits above {children} in the layout),
  // cutting off the bottom of a fit-to-page view and forcing a page scroll.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const top = el.getBoundingClientRect().top;
      el.style.height = Math.max(240, window.innerHeight - top) + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  // Full height; on desktop the reader is capped to a contained column (centered,
  // with side rules) instead of spanning the whole window — matching the GM
  // Screen pane. The host has a definite height either way (parent is h-screen;
  // row-flex stretch), so the reader's fit-to-page math works.
  return (
    <div ref={wrapRef} className="flex justify-center" style={{ height: "100dvh" }}>
      <div
        ref={hostRef}
        className="min-h-0 w-full max-w-[1024px] border-[var(--border)] sm:border-x"
      />
    </div>
  );
}
