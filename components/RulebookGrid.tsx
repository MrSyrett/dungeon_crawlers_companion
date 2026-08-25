"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  SYSTEMS,
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
} from "./systemStore";
import SystemToggle from "./SystemToggle";
import type { RulebookSystem } from "@/lib/rulebooks";

export type RulebookListItem = { file: string; title: string; system: RulebookSystem };

/**
 * The /rules book list, filtered by the same Shadowdark / Crawler Carl toggle
 * the dashboard uses (shared localStorage store). A book tagged BOTH shows on
 * either tab. This only hides cards — access control happened on the server,
 * so `books` already contains only what this user may read.
 */
export default function RulebookGrid({ books }: { books: RulebookListItem[] }) {
  const active = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);
  const shown = books.filter((b) => b.system === "BOTH" || b.system === active);
  const hidden = books.length - shown.length;
  const activeName = SYSTEMS.find((s) => s.key === active)?.name ?? active;
  const otherName = SYSTEMS.find((s) => s.key !== active)?.name ?? "the other system";

  return (
    <>
      <div className="mb-8 flex justify-center">
        <SystemToggle />
      </div>

      {shown.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">
            No {activeName} rulebooks
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            None of your rulebooks are tagged for {activeName}. Switch the toggle above to see the{" "}
            {otherName} shelf.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {shown.map((b) => (
            <li key={b.file}>
              <Link
                href={`/rules?book=${encodeURIComponent(b.file)}`}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--panel)] px-5 py-5 transition-colors hover:border-[var(--gold)] hover:bg-[var(--panel-2)]"
              >
                <div className="min-w-0">
                  <div className="truncate text-base font-bold uppercase tracking-[0.12em]">
                    {b.title}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--muted)]">PDF</div>
                </div>
                <span className="ml-6 shrink-0 text-xl text-[var(--muted)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hidden > 0 ? (
        <p className="mt-4 text-right text-[11px] text-[var(--muted)]">
          {hidden} more on the {otherName} shelf
        </p>
      ) : null}
    </>
  );
}
