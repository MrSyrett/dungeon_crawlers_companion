"use client";

import { useSyncExternalStore } from "react";
import {
  SYSTEMS,
  subscribeSystem,
  getSystemSnapshot,
  serverSystem,
  subscribeView,
  getViewSnapshot,
  serverView,
  systemName,
  type SystemKey,
  type DashView,
} from "./systemStore";
import { createDocument, deleteDocument } from "@/app/actions/documents";
import { ConfirmButton } from "./ConfirmButton";
import CharacterCard from "./CharacterCard";
import type { CharCardData } from "@/lib/rosters";

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
/** `cards` (characters only): the shared Character cards, the same ones My
 *  Characters shows — see components/CharacterCard.tsx. */
export type Panel = { toolId: string; docs: DocRow[]; cards?: CharCardData[] };
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
        {/* data-dash-head: the hook a system's theme uses to letter these two
            words in its own display face (Ghostbusters does — see globals.css).
            An attribute rather than a class so it survives any Tailwind churn. */}
        <h3 data-dash-head className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">
          {kind === "characters" ? "Characters" : "Adventures"}
        </h3>
        <form action={createDocument}>
          <input type="hidden" name="tool" value={toolId} />
          <button className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--sys-hilite)] hover:text-[var(--text)] sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-[11px]">
            + New
          </button>
        </form>
      </div>

      {docs.length === 0 ? (
        <p className="px-4 py-5 text-base text-[var(--muted)] sm:text-sm">{emptyLine(kind, system)}</p>
      ) : kind === "characters" && panel.cards ? (
        // Characters: the same cards as My Characters, in this system's identity.
        <div className="roster-panel-cards home-roster" data-sys={system}>
          <ul className="roster-cards">
            {panel.cards.map((c) => (
              <li key={c.id} className="min-w-0">
                <CharacterCard c={c} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Adventures: the same tile cards, title + when it was last touched,
        // with Open and Delete — so all three lists read as one family.
        <div className="roster-panel-cards home-roster" data-sys={system}>
          <ul className="roster-cards">
            {docs.map((doc) => (
              <li key={doc.id} className="min-w-0">
                <div className="roster-card" id={`adv-${doc.id}`}>
                  {/* Plain <a>, NOT next/link: /tools/… is a route handler that
                      builds a full standalone HTML document; <Link> would
                      prefetch it for every card on screen. */}
                  <a href={`/tools/${toolId}/${doc.id}`} className="roster-card-name roster-card-link" title={`Open ${doc.title}`}>
                    {doc.title}
                  </a>
                  <span className="roster-card-meta">Adventure Prep</span>
                  <span className="roster-card-camp">Updated {formatDate(doc.updatedAt)}</span>
                  <div className="roster-actions">
                    <a href={`/tools/${toolId}/${doc.id}`} className="roster-btn roster-btn-go">
                      Open
                    </a>
                    <form action={deleteDocument} className="contents">
                      <input type="hidden" name="id" value={doc.id} />
                      <ConfirmButton message={`Delete "${doc.title}"? This cannot be undone.`} className="roster-btn roster-btn-danger">
                        Delete
                      </ConfirmButton>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
  initialSystem,
  initialView,
}: {
  panels: SystemPanels;
  hiddenKeys?: SystemKey[];
  // What the server rendered, read from the cookie the store mirrors
  // (lib/system-cookie.ts). Hydration must match the server's HTML, so the
  // server snapshot is this value, not Shadowdark; the live store takes over
  // after hydration as before.
  initialSystem?: SystemKey;
  initialView?: DashView;
}) {
  const storedSystem = useSyncExternalStore(subscribeSystem, getSystemSnapshot, serverSystem(initialSystem));
  const view = useSyncExternalStore(subscribeView, getViewSnapshot, serverView(initialView));

  const hidden = new Set(hiddenKeys);
  const visible = SYSTEMS.map((s) => s.key).filter((k) => !hidden.has(k));
  const list = visible.length ? visible : SYSTEMS.map((s) => s.key);
  const system: SystemKey = list.includes(storedSystem) ? storedSystem : list[0];

  const panel = panels[system];
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-5">
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
