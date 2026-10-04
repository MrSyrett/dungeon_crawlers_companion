"use client";

import { useSyncExternalStore } from "react";
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
// panels, just what a list item needs. `vttHref` is where the sheet's campaign
// plays: `vttKind` says whether that's an external OBR room ("owlbear") or
// our own first-party tabletop at /play ("tabletop"); null when unlinked.
export type DocRow = {
  id: string;
  title: string;
  updatedAt: number;
  vttHref: string | null;
  vttKind: "owlbear" | "tabletop" | null;
};
export type Panel = { toolId: string; docs: DocRow[] };
export type SystemPanels = Partial<Record<SystemKey, { character?: Panel; session?: Panel }>>;

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ms));
}

// A friendlier empty state than "No saved X yet." — points at the one thing to
// do next. Kept to a line so it reads as an invitation, not a tutorial.
function emptyLine(kind: "characters" | "adventures", system: SystemKey): string {
  const name = systemName(system);
  return kind === "characters"
    ? `No ${name} characters yet — your party is waiting. Hit + New to roll one up.`
    : `No ${name} adventures yet. Hit + New to start prepping your next session.`;
}

function DocList({
  kind,
  panel,
  system,
}: {
  kind: "characters" | "adventures";
  panel?: Panel;
  system: SystemKey;
}) {
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
          <button className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--sys,var(--gold))] hover:text-[var(--text)] sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-[11px]">
            + New
          </button>
        </form>
      </div>

      {docs.length === 0 ? (
        <p className="px-4 py-5 text-base text-[var(--muted)] sm:text-sm">{emptyLine(kind, system)}</p>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {docs.map((doc) => (
            <li key={doc.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                {/* Plain <a>, NOT next/link: /tools/… is a route handler that
                    builds a full standalone HTML document. <Link> would prefetch
                    it (auth + DB + a 60–520 KB render) for every row on screen,
                    then fetch it a second time on click. */}
                <a
                  href={`/tools/${toolId}/${doc.id}`}
                  className="block truncate py-1 text-lg font-semibold transition-colors hover:text-[var(--sys,var(--gold))] sm:py-0 sm:text-base"
                >
                  {doc.title}
                </a>
                <span className="text-[13px] text-[var(--muted)] sm:text-[11px]">
                  Updated {formatDate(doc.updatedAt)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {doc.vttHref ? (
                  // Our own Tabletop opens in this tab (it's part of the app);
                  // an external OBR room opens in a new one. Same words and
                  // same behavior as the Campaigns page.
                  <a
                    href={doc.vttHref}
                    {...(doc.vttKind === "owlbear" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    title={
                      doc.vttKind === "owlbear"
                        ? "Open this campaign's OBR room in a new tab"
                        : "Open this campaign's VTT"
                    }
                    className="min-h-11 shrink-0 rounded border border-[var(--gold)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:min-h-0 sm:px-2 sm:py-1 sm:text-[11px]"
                  >
                    {doc.vttKind === "owlbear" ? "Open in OBR ↗" : "Open VTT"}
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
      {/* key={system}: remounting the body on a system switch replays the
          fade-in, so changing systems reads as "switching worlds" rather than
          text swapping in place. No system title here — the navbar's system
          chip already says which game this is, and the page's own theme says
          it again. */}
      <div key={system} className="dcc-fade-in">
        <DocList
          kind={view}
          system={system}
          panel={view === "characters" ? panel?.character : panel?.session}
        />
      </div>
    </div>
  );
}
