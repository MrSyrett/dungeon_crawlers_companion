"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// The Rulebook Compendium's PDF viewer. It mounts the shared, site-wide reader
// (window.DCCPdfReader, /vendor/dcc-pdf-reader.js) — the exact same component the
// GM Screen uses — so chapters, snap paging, pinch/ctrl zoom and drag-to-pan
// behave identically in both places. Page position is remembered per book in
// localStorage, so reopening a book returns to the last page read.

type ReaderInstance = { load: (b: Record<string, unknown>) => void; destroy: () => void };
type ReaderFactory = {
  create: (el: HTMLElement, opts: { onPage?: (docKey: string, page: number) => void }) => ReaderInstance;
};
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

  const linkCls =
    "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";

  return (
    <div className="flex h-screen flex-col">
      <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--panel)] px-4 py-2">
        <Link href="/rules" className={`${linkCls} shrink-0`}>
          ← Rulebooks
        </Link>
        <span className="min-w-0 flex-1 truncate text-sm font-bold uppercase tracking-[0.1em]">
          {title}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a href={src} target="_blank" rel="noreferrer" className={linkCls}>
            New tab
          </a>
          <a href={src} download className={linkCls}>
            Download
          </a>
        </div>
      </header>
      <div ref={hostRef} className="min-h-0 flex-1" />
    </div>
  );
}
