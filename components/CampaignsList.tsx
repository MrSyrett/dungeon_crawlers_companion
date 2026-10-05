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
import { ConfirmButton } from "./ConfirmButton";
import CopyCodeButton from "./CopyCodeButton";
import { CampaignAutoField } from "./CampaignAutoField";
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
            <button className="shrink-0 rounded border border-[var(--gold)] bg-[var(--gold)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a] hover:opacity-90">
              Create
            </button>
          </form>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
            You&apos;ll be its GM/owner. Share the join code with your players so they can link their
            character sheets. You can rename it below at any time.
          </p>
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
                      {/* Plain <a>s: /play and /gm-screen are route handlers that
                          return standalone HTML, so <Link> would prefetch/RSC-fetch
                          a whole document for nothing. Same words + same behavior
                          as the dashboard: the VTT (ours) opens here; an OBR
                          room (external) opens in a new tab. */}
                      <a
                        href={`/play/${c.id}`}
                        className="min-h-11 rounded border border-[var(--gold)] bg-[var(--gold)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a] hover:opacity-90 sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                      >
                        Open VTT
                      </a>
                      {c.vttUrl ? (
                        <a
                          href={c.vttUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-11 rounded border border-[var(--gold)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                        >
                          Open in OBR ↗
                        </a>
                      ) : null}
                      <OpenGmScreenButton
                        campaign={{ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl }}
                        className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                      />
                      <form action={deleteCampaign} className="shrink-0">
                        <input type="hidden" name="id" value={c.id} />
                        <ConfirmButton
                          message={
                            `Delete "${c.name}" (${c.code})?\n\n` +
                            `This deletes the campaign and its ${c.rolls} shared roll${c.rolls === 1 ? "" : "s"}.\n` +
                            (links > 0
                              ? `${c.party.map((m) => m.name).join(", ")} will stop sharing rolls and will need to join a new campaign.\n\n`
                              : "\n") +
                            `This cannot be undone.`
                          }
                          className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[#f0a8a3] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                        >
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </div>

                  {/* Saves on blur or Enter. A <form action> resets its fields when the
                      action completes, which flashed the old name back after every
                      rename — the bug CampaignAutoField was written for. `required`
                      because renameCampaign falls back to "New Campaign" on a blank,
                      so an auto-saving field must refuse to send one. */}
                  <CampaignAutoField
                    id={c.id}
                    field="name"
                    value={c.name}
                    action={renameCampaign}
                    maxLength={60}
                    ariaLabel={`Rename ${c.name}`}
                    required
                    className="mt-3 flex gap-2 border-t border-[var(--border)] pt-3"
                  />

                  {/* Deliberately NOT required: clearing this field is how you go back
                      to the built-in VTT, so an empty value must save. */}
                  <CampaignAutoField
                    id={c.id}
                    field="vttUrl"
                    value={c.vttUrl ?? ""}
                    action={setCampaignVttUrl}
                    type="url"
                    maxLength={500}
                    placeholder="Virtual tabletop room URL (optional)"
                    ariaLabel={`Virtual tabletop room for ${c.name}`}
                  />
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--muted)]">
                    {c.vttUrl
                      ? "Characters linked to this campaign open this OBR room from the home page (instead of the built-in VTT)."
                      : "Characters linked to this campaign open the built-in VTT from the home page. Paste an OBR room link here to use OBR instead."}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        {campaigns.length > 0 ? (
          <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
            Deleting a campaign removes its shared roll log. Players&apos; character sheets are left
            untouched — they belong to the players — but any sheet still linked will quietly stop
            sharing rolls, so tell your table before clearing one out.
          </p>
        ) : null}

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
