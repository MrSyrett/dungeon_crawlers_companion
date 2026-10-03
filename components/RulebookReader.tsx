"use client";

import { useEffect, useRef } from "react";

// The Rulebook Compendium's PDF viewer. It mounts the shared, site-wide reader
// (window.DCCPdfReader, /vendor/dcc-pdf-reader.js) — the SAME component, tab bar,
// toolbar, chapters panel and gestures the GM Screen uses, so there's one system
// to maintain. We hand it the whole book list (it renders the tabs) and the book
// to open; page position is remembered per book in localStorage.

type Book = { file: string; title: string; url: string };
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
  const hostRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<ReaderInstance | null>(null);

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
          // Keep the URL in sync so refresh / share / back lands on this book.
          try {
            window.history.replaceState(null, "", `/rules?book=${encodeURIComponent(file)}`);
          } catch {
            /* history unavailable — non-fatal */
          }
        },
      });
      readerRef.current = reader;
      reader.setBooks(books, active);
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
    // Mounted once per page load; /rules re-navigates (remounts) to change books.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The reader fills the screen; its own tab bar + toolbar carry everything. The
  // host sits as a flex child of an h-screen column so it has a DEFINITE height —
  // the reader's internal `.dccpdf{height:100%}` then resolves correctly
  // (fit-to-page needs a real viewport height, same as the GM Screen).
  return (
    <div className="flex h-screen flex-col">
      <div ref={hostRef} className="min-h-0 flex-1" />
    </div>
  );
}
