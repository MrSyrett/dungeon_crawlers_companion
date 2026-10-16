"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
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
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {list.map((b) => (
                    <li key={b.file} className="min-w-0">
                      <Link
                        href={`/library?book=${encodeURIComponent(b.file)}`}
                        className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--panel)] px-5 py-5 transition-colors hover:border-[var(--gold)] hover:bg-[var(--panel-2)]"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-base font-bold uppercase tracking-[0.12em]">{b.title}</div>
                          <div className="mt-1 text-[11px] text-[var(--muted)]">
                            PDF{b.system === "BOTH" ? " · all systems" : ""}
                          </div>
                        </div>
                        <span className="ml-6 shrink-0 text-xl text-[var(--muted)]">→</span>
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
