"use client";

import { useSyncExternalStore } from "react";
import {
  SYSTEMS,
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
  systemName,
  type SystemKey,
} from "./systemStore";
import { createCampaign, deleteCampaign, renameCampaign, setCampaignVttUrl } from "@/app/actions/campaigns";
import CopyCodeButton from "./CopyCodeButton";
import CampaignEditDialog from "./CampaignEditDialog";
import OpenGmScreenButton from "./OpenGmScreenButton";

// The Campaigns body: shows ONE system's campaigns at a time, driven by the same
// shared system store the top navbar writes — exactly how DashboardDocs shows one
// system's Characters/Adventures and how the Rulebooks shelf filters itself. The
// server ships every system's compact campaign data once, so switching system is
// instant and never re-queries.
//
// A campaign's system is set once, at creation, from whichever system you are in
// (the hidden field below) and is never editable afterwards. The per-campaign
// system dropdown this page used to carry is gone with it.

export type PartyMember = { id: string; name: string; cls: string; level: number | null };

// Compact rows the server hands us — no Prisma objects. Dates arrive as epoch ms
// because a Date does not survive the server/client boundary intact.
export type CampaignRow = {
  id: string;
  name: string;
  code: string;
  createdAt: number;
  vttUrl: string | null;
  system: string | null;
  rolls: number;
  lastRoll: number | null;
  party: PartyMember[];
};

export type JoinedRow = { id: string; name: string; code: string; chars: string[] };

export type CampaignsBySystem = Partial<Record<SystemKey, { owned: CampaignRow[]; joined: JoinedRow[] }>>;

// Both helpers are the Campaigns page's own, ported from Date to epoch ms (a Date
// does not survive the server/client boundary). Deliberately NOT the dashboard's
// versions: this page shows a date with no time, and counts in whole days.
function formatDate(ms: number): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(ms));
}

// "3 months ago" reads faster than a date when you're deciding what's dead.
function relative(ms: number | null): string {
  if (ms === null) return "never";
  const days = Math.floor((Date.now() - ms) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function CampaignsList({
  bySystem,
  hiddenKeys = [],
}: {
  bySystem: CampaignsBySystem;
  hiddenKeys?: SystemKey[];
}) {
  const storedSystem = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);

  // Same fallback chain as DashboardDocs: never land on a system an admin has
  // hidden, and never end up with no system at all.
  const hidden = new Set(hiddenKeys);
  const visible = SYSTEMS.map((s) => s.key).filter((k) => !hidden.has(k));
  const list = visible.length ? visible : SYSTEMS.map((s) => s.key);
  const system: SystemKey = list.includes(storedSystem) ? storedSystem : list[0];

  const group = bySystem[system];
  const campaigns = group?.owned ?? [];
  const joined = group?.joined ?? [];
  const name = systemName(system);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      {/* key={system}: remounting on a system switch replays the fade-in, so
          changing systems reads as "switching worlds" rather than rows swapping
          in place. The navbar's system chip already names the game, and the
          page's own theme says it again, so there's no system title here. */}
      <div key={system} className="dcc-fade-in">
        <section className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
            Create a {name} campaign
          </h2>
          <form action={createCampaign} className="mt-3 flex flex-col gap-2 sm:flex-row">
            {/* The system is not a choice. It comes from whichever system you are
                in, the way the dashboard's "+ New" carries its panel's tool id,
                and the server validates it against SystemKey before writing. */}
            <input type="hidden" name="system" value={system} />
            <input
              type="text"
              name="name"
              required
              maxLength={60}
              placeholder="Campaign name…"
              aria-label="New campaign name"
              className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
            />
            <button className="shrink-0 rounded border border-[var(--gold)] bg-[var(--gold)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--on-accent)] hover:opacity-90">
              Create
            </button>
          </form>
        </section>

        {campaigns.length === 0 ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
            <h2 className="text-base font-bold uppercase tracking-[0.15em]">No {name} campaigns yet</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Use the <span className="text-[var(--gold)]">Create a {name} campaign</span> box above
              to start one. You&apos;ll be its GM/owner — give the join code to your players and they
              can link their character sheets to it from their own sheet.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              This page shows one system at a time. Campaigns in your other systems are under their
              own system in the navbar, and ones you joined but don&apos;t own appear below rather
              than here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {campaigns.map((c) => {
              const links = c.party.length;
              const quiet = c.rolls === 0 && links === 0;

              return (
                <li
                  key={c.id}
                  className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                          {c.name}
                        </h2>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-bold tracking-[0.15em] text-[var(--text)]">
                            {c.code}
                          </span>
                          <CopyCodeButton value={c.code} label="join code" />
                        </span>
                        {quiet ? (
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                            · unused
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)]">
                        <span>Created {formatDate(c.createdAt)}</span>
                        <span>
                          {links} character sheet{links === 1 ? "" : "s"} linked
                        </span>
                        <span>
                          {c.rolls} roll{c.rolls === 1 ? "" : "s"} · last {relative(c.lastRoll)}
                        </span>
                      </div>

                      {c.party.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {c.party.map((m) => (
                            <span
                              key={m.id}
                              className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1 text-[11px] text-[var(--text)]"
                            >
                              {m.name}
                              {m.level !== null || m.cls ? (
                                <span className="text-[var(--muted)]">
                                  {" "}
                                  {[m.level !== null ? `LV ${m.level}` : "", m.cls]
                                    .filter(Boolean)
                                    .join(" ")}
                                </span>
                              ) : null}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {/* THREE BUTTONS, and only three. Open the table, open the
                          GM's screen for it, or change the thing. Everything you
                          can CHANGE moved behind Edit — the rename box, the
                          Owlbear URL and Delete — because a page listing four
                          campaigns was four blocks of settings nobody was reading
                          sitting on top of the two buttons they came for.

                          ONE VTT BUTTON, not two. It opens whichever tabletop this
                          campaign actually uses: the built-in one, or the Owlbear
                          room when a URL is set. That is already exactly what a
                          PLAYER gets from the dashboard, so the GM's button now
                          agrees with the players' instead of offering both and
                          leaving them to know which one the table is on.

                          Plain <a>: /play is a route handler returning standalone
                          HTML, so <Link> would prefetch a whole document for
                          nothing. The OBR case is external, hence the new tab. */}
                      {c.vttUrl ? (
                        <a
                          href={c.vttUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-11 rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--on-accent)] hover:opacity-90 sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                        >
                          Open VTT ↗
                        </a>
                      ) : (
                        <a
                          href={`/play/${c.id}`}
                          className="min-h-11 rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--on-accent)] hover:opacity-90 sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                        >
                          Open VTT
                        </a>
                      )}
                      {/* THE ONLY WAY INTO THE GM SCREEN. It is out of the navbar
                          (see TOOLS_NAV in components/navConfig.ts): a GM Screen
                          is one campaign's party, roll log, board and system data,
                          and a nav link could not say which campaign it meant. */}
                      <OpenGmScreenButton
                        campaign={{ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl }}
                        className="min-h-11 rounded border border-[var(--gold)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                      />
                      <CampaignEditDialog
                        id={c.id}
                        name={c.name}
                        code={c.code}
                        vttUrl={c.vttUrl}
                        rolls={c.rolls}
                        partyNames={c.party.map((m) => m.name)}
                        rename={renameCampaign}
                        setVttUrl={setCampaignVttUrl}
                        remove={deleteCampaign}
                        className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                      />
                    </div>
                  </div>

                </li>
              );
            })}
          </ul>
        )}

        {joined.length > 0 ? (
          <section className="mt-12">
            <div className="mb-4 border-b border-[var(--border)] pb-3">
              <h2 className="font-display text-xl font-black tracking-wide">Campaigns you&apos;ve joined</h2>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
                Campaigns one of your characters is linked to. These are view-only — the owner
                manages them.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {joined.map((c) => (
                <li
                  key={c.id}
                  className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                      {c.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-bold tracking-[0.15em] text-[var(--text)]">
                        {c.code}
                      </span>
                      <CopyCodeButton value={c.code} label="join code" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                      · view only
                    </span>
                  </div>
                  {c.chars.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.chars.map((n, i) => (
                        <span
                          key={`${c.id}-${i}`}
                          className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1 text-[11px] text-[var(--text)]"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-3">
                    <a
                      href={`/play/${c.id}`}
                      className="inline-block rounded border border-[var(--gold)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--gold)] hover:bg-[var(--panel-2)]"
                    >
                      Open VTT
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
