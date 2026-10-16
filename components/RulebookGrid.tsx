"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  SYSTEMS,
  subscribeSystem,
  getSystemSnapshot,
  serverSystem,
  type SystemKey,
} from "./systemStore";
import type { RulebookSystem, RulebookCategory } from "@/lib/rulebooks";

export type RulebookListItem = { file: string; title: string; system: RulebookSystem; category: RulebookCategory };

// Display order of the Library's three sections (mirrors LIBRARY_CATEGORIES in
// lib/rulebooks.ts — duplicated here because that module is server-only).
const SECTIONS: { key: RulebookCategory; blurb: string }[] = [
  { key: "Core Rules", blurb: "The rulebooks and quickstarts you play from" },
  { key: "Expansions", blurb: "Sourcebooks, supplements and companions" },
  { key: "Adventures", blurb: "Modules, scenarios and campaigns to run" },
];

declare global {
  interface Window {
    DCCPdfCover?: { draw: (img: HTMLImageElement, pdfUrl: string, onFail?: () => void) => void };
  }
}

let coverScript: Promise<void> | null = null;
function loadCoverScript(): Promise<void> {
  if (window.DCCPdfCover) return Promise.resolve();
  if (!coverScript) {
    coverScript = new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = "/vendor/dcc-pdf-cover.js";
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error("cover script"));
      document.head.appendChild(el);
    });
  }
  return coverScript;
}

/**
 * A book's cover: the server's cover image (/api/rulebooks/<file>/cover), or —
 * when there isn't one — page 1 drawn in the browser (public/vendor/dcc-pdf-cover.js),
 * or failing that a plain title plate.
 */
function BookCover({ file, title }: { file: string; title: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [mode, setMode] = useState<"server" | "draw" | "plate">("server");
  const enc = encodeURIComponent(file);
  useEffect(() => {
    if (mode !== "draw") return;
    let live = true;
    loadCoverScript().then(
      () => {
        const img = imgRef.current;
        if (!live || !img || !window.DCCPdfCover) return;
        window.DCCPdfCover.draw(img, `/api/rulebooks/${enc}`, () => live && setMode("plate"));
      },
      () => live && setMode("plate"),
    );
    return () => {
      live = false;
    };
  }, [mode, enc]);
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-[var(--border)] bg-[var(--panel-2)] shadow-[0_6px_18px_rgba(0,0,0,.45)] transition-[border-color,transform] duration-150 group-hover:-translate-y-0.5 group-hover:border-[var(--gold)]">
      {mode === "plate" ? (
        <div className="flex h-full items-center justify-center p-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
          {title}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- auth-gated API image, not a static asset
        <img
          ref={imgRef}
          src={mode === "server" ? `/api/rulebooks/${enc}/cover` : undefined}
          alt=""
          loading="lazy"
          decoding="async"
          onError={mode === "server" ? () => setMode("draw") : undefined}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

/**
 * The Library shelf (/library), filtered by the selected system (shared
 * localStorage store) and grouped into Core Rules / Expansions / Adventures.
 * A book tagged BOTH shows on every shelf. This only hides cards — access
 * control happened on the server, so `books` already contains only what this
 * user may read. The Book type chips narrow it to one section; the choice
 * lives in the URL (?type=Expansions) so it survives a reload or a shared link.
 */
export default function RulebookGrid({
  books,
  initialSystem,
  initialType = null,
}: {
  books: RulebookListItem[];
  initialSystem?: SystemKey;
  initialType?: RulebookCategory | null;
}) {
  const active = useSyncExternalStore(subscribeSystem, getSystemSnapshot, serverSystem(initialSystem));
  const [type, setType] = useState<RulebookCategory | null>(initialType);
  const pickType = (t: RulebookCategory | null) => {
    setType(t);
    try {
      const url = new URL(window.location.href);
      if (t) url.searchParams.set("type", t);
      else url.searchParams.delete("type");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch {
      /* URL sync is a convenience only */
    }
  };
  const shown = books.filter((b) => b.system === "BOTH" || b.system === active);
  const hidden = books.length - shown.length;
  const activeName = SYSTEMS.find((s) => s.key === active)?.name ?? active;

  if (shown.length === 0) {
    return (
      <>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing on the {activeName} shelf yet</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Add {activeName} PDFs under{" "}
            <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
              protected/rulebooks/{activeName}/Core Rules
            </code>{" "}
            (or <span className="text-[var(--text)]">Expansions</span> /{" "}
            <span className="text-[var(--text)]">Adventures</span>) and they&apos;ll appear here. Switch
            systems above to browse the other shelves.
          </p>
        </div>
        {hidden > 0 ? <p className="mt-4 text-right text-[11px] text-[var(--muted)]">{hidden} more on other shelves</p> : null}
      </>
    );
  }

  const typeHref = (t: RulebookCategory | null) => (t ? `/library?type=${encodeURIComponent(t)}` : "/library");
  const chip = (t: RulebookCategory | null, label: string, count: number) => {
    const on = type === t;
    return (
      <a
        key={label}
        href={typeHref(t)}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
          e.preventDefault();
          pickType(t);
        }}
        aria-pressed={on}
        className={
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors " +
          (on
            ? "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]"
            : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]")
        }
      >
        {label}
        <span className={on ? "" : "opacity-70"}>{count}</span>
      </a>
    );
  };
  const sections = type ? SECTIONS.filter((s) => s.key === type) : SECTIONS;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by book type">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Book type</span>
        {chip(null, "All", shown.length)}
        {SECTIONS.map((sec) => chip(sec.key, sec.key, shown.filter((b) => b.category === sec.key).length))}
      </div>
      <div className="flex flex-col gap-10">
        {sections.map((sec) => {
          const list = shown.filter((b) => b.category === sec.key);
          return (
            <section key={sec.key} aria-labelledby={`lib-${sec.key.replace(/\s+/g, "-")}`}>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--border)] pb-2">
                <h2
                  id={`lib-${sec.key.replace(/\s+/g, "-")}`}
                  className="text-lg font-bold tracking-[0.06em] text-[var(--sys-head,var(--text))]"
                >
                  {sec.key}
                </h2>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  {list.length ? `${list.length} ${list.length === 1 ? "book" : "books"}` : sec.blurb}
                </span>
              </div>
              {list.length === 0 ? (
                <p className="text-[13px] italic text-[var(--muted)]">
                  {type ? `No ${sec.key.toLowerCase()} on the ${activeName} shelf yet.` : "None yet."}
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {list.map((b) => (
                    <li key={b.file} className="min-w-0">
                      <Link
                        href={`/library?book=${encodeURIComponent(b.file)}`}
                        className="group block rounded-md outline-offset-4"
                        title={b.title}
                      >
                        <BookCover file={b.file} title={b.title} />
                        <div className="mt-2 line-clamp-2 text-center text-[12px] font-bold uppercase leading-snug tracking-[0.08em] text-[var(--text)] group-hover:text-[var(--gold)]">
                          {b.title}
                        </div>
                        {b.system === "BOTH" ? (
                          <div className="mt-0.5 text-center text-[10px] text-[var(--muted)]">All systems</div>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {hidden > 0 ? (
        <p className="mt-6 text-right text-[11px] text-[var(--muted)]">{hidden} more on other systems&apos; shelves</p>
      ) : null}
    </>
  );
}
