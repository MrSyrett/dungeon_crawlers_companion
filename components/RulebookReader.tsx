"use client";

import { useEffect, useRef } from "react";

// The Rulebook Compendium's PDF viewer. It mounts the shared, site-wide reader
// (window.DCCPdfReader, /vendor/dcc-pdf-reader.js) — the exact same component the
// GM Screen uses — so chapters, snap paging, pinch/ctrl zoom and drag-to-pan
// behave identically in both places. The reader's own toolbar carries New tab /
// Download, so there's no separate header. Page position is remembered per book
// in localStorage, so reopening a book returns to the last page read.

type ReaderInstance = { load: (b: Record<string, unknown>) => void; destroy: () => void };
type ReaderOpts = {
  onPage?: (docKey: string, page: number) => void;
  showOpenInNew?: boolean;
  showDownload?: boolean;
};
type ReaderFactory = { create: (el: HTMLElement, opts: ReaderOpts) => ReaderInstance };
declare global {
  interface Window {
    pdfjsLib?: unknown;
    DCCPdfReader?: ReaderFactory;
  }
}

// Load a script once and resolve when ready (idempotent across remounts/books).
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
  src,
  title,
  docKey,
}: {
  src: string;
  title: string;
  docKey: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<ReaderInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    const posKey = `dcc-rule-pos:${docKey}`;
    let startPage = 1;
    try {
      const v = parseInt(localStorage.getItem(posKey) || "", 10);
      if (v > 0) startPage = v;
    } catch {
      /* private mode / blocked storage — start at page 1 */
    }

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
        onPage: (_k: string, page: number) => {
          try {
            localStorage.setItem(posKey, String(page));
          } catch {
            /* ignore storage failures */
          }
        },
      });
      readerRef.current = reader;
      reader.load({ url: src, docKey, title, startPage });
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
  }, [src, docKey, title]);

  // The reader fills the screen; its own toolbar carries chapters, page, Fit,
  // New tab and Download (no separate header bar). The host sits as a flex child
  // of an h-screen column so it has a DEFINITE height — the reader's internal
  // `.dccpdf{height:100%}` then resolves correctly (fit-to-page needs a real
  // viewport height, same as the GM Screen, where flex:1 provides it).
  return (
    <div className="flex h-screen flex-col">
      <div ref={hostRef} className="min-h-0 flex-1" />
    </div>
  );
}
