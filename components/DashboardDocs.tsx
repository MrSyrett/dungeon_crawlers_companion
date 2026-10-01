"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  SYSTEMS,
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
  subscribeView,
  getViewSnapshot,
  getViewServerSnapshot,
  systemName,
  type SystemKey,
} from "./systemStore";
import { createDocument, deleteDocument } from "@/app/actions/documents";
import { ConfirmButton } from "./ConfirmButton";

// Compact per-document row the server hands us — no Prisma objects, no rendered
// panels, just what a list item needs. `vttHref` is the campaign's Owlbear room
// if one is set, otherwise our own tabletop, or null when the sheet isn't linked.
export type DocRow = { id: string; title: string; updatedAt: number; vttHref: string | null };
export type Panel = { toolId: string; docs: DocRow[] };
export type SystemPanels = Partial<Record<SystemKey, { character?: Panel; session?: Panel }>>;

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ms));
}

function DocList({ kind, panel }: { kind: "characters" | "adventures"; panel?: Panel }) {
  const noun = kind === "characters" ? "characters" : "adventures";
  if (!panel) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
        No {noun} tool for this system yet.
      </div>
    );
  }
  const { toolId, docs } = panel;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <h3 className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">
          {kind === "characters" ? "Characters" : "Adventures"}
        </h3>
        <form action={createDocument}>
          <input type="hidden" name="tool" value={toolId} />
          <button className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-[11px]">
            + New
          </button>
        </form>
      </div>

      {docs.length === 0 ? (
        <p className="px-4 py-5 text-base text-[var(--muted)] sm:text-sm">No saved {noun} yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {docs.map((doc) => (
            <li key={doc.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link
                  href={`/tools/${toolId}/${doc.id}`}
                  className="block truncate py-1 text-lg font-semibold hover:text-[var(--gold)] sm:py-0 sm:text-base"
                >
                  {doc.title}
                </Link>
                <span className="text-[13px] text-[var(--muted)] sm:text-[11px]">
                  Updated {formatDate(doc.updatedAt)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {doc.vttHref ? (
                  <a
                    href={doc.vttHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open this campaign's virtual tabletop in a new tab"
                    className="min-h-11 shrink-0 rounded border border-[var(--gold)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:min-h-0 sm:px-2 sm:py-1 sm:text-[11px]"
                  >
                    Launch VTT
                  </a>
                ) : null}
                <form action={deleteDocument}>
                  <input type="hidden" name="id" value={doc.id} />
                  <ConfirmButton
                    message={`Delete "${doc.title}"? This cannot be undone.`}
                    className="min-h-11 shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[#f0a8a3] sm:min-h-0 sm:px-2 sm:py-1 sm:text-[11px]"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// The homepage body: shows ONE system's ONE tab (Characters or Adventures) at a
// time, driven by the shared system/view stores the top navbar also writes. The
// server ships every system's compact doc data once, so switching system or tab
// is instant and never re-queries.
export default function DashboardDocs({
  panels,
  hiddenKeys = [],
}: {
  panels: SystemPanels;
  hiddenKeys?: SystemKey[];
}) {
  const storedSystem = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);
  const view = useSyncExternalStore(subscribeView, getViewSnapshot, getViewServerSnapshot);

  const hidden = new Set(hiddenKeys);
  const visible = SYSTEMS.map((s) => s.key).filter((k) => !hidden.has(k));
  const list = visible.length ? visible : SYSTEMS.map((s) => s.key);
  const system: SystemKey = list.includes(storedSystem) ? storedSystem : list[0];

  const panel = panels[system];
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-5">
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-xl font-black tracking-wide sm:text-2xl">
          {systemName(system)}
        </h2>
        <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
          {view === "characters" ? "Characters" : "Adventures"}
        </span>
      </div>
      <DocList kind={view} panel={view === "characters" ? panel?.character : panel?.session} />
    </div>
  );
}
