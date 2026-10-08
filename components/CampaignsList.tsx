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
import CampaignDialog from "./CampaignDialog";
import OpenGmScreenButton from "./OpenGmScreenButton";

// The Campaigns body: shows ONE system's campaigns at a time, driven by the same
// shared system store the top navbar writes — exactly how DashboardDocs shows one
// system's Characters/Adventures and how the Rulebooks shelf filters itself. The
// server ships every system's compact campaign data once, so switching system is
// instant and never re-queries.
//
// IT IS LAID OUT AS DashboardDocs IS, deliberately and down to the class names:
// one bordered panel, a header carrying the word and a "+ New", then a divided
// list of rows. The one place it carries MORE than a dashboard row does is the
// party line: a campaign's whole reason to exist is the characters linked to it,
// so they are named, levelled and classed under the counts rather than summed. Campaigns, Characters and Adventures are the three things a GM
// keeps per system and they sit next to each other in the navbar, so looking at
// one should tell you how to read the other two. This page used to be a stack of
// fat cards instead, which made it read like a different product.
//
// A campaign's system is set once, at creation, from whichever system you are in
// and is never editable afterwards. The per-campaign system dropdown is gone.

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

// The row buttons, sized exactly as DashboardDocs sizes its row buttons: a 44px
// tap target on a phone, compact from sm up.
const ACTION =
  "min-h-11 shrink-0 rounded border px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] sm:min-h-0 sm:px-2 sm:py-1 sm:text-[11px]";

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
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-5">
      {/* key={system}: remounting on a system switch replays the fade-in, so
          changing systems reads as "switching worlds" rather than rows swapping
          in place. The navbar's system chip already names the game, and the
          page's own theme says it again, so there's no system title here. */}
      <div key={system} className="dcc-fade-in">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            {/* data-dash-head: the hook a system's theme uses to letter this word
                in its own display face (Ghostbusters, D&D and Star Wars do — see
                globals.css). The dashboard's two headers carry it, and this is
                the third of the same family, so it carries it too. */}
            <h3 data-dash-head className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">
              Campaigns
            </h3>
            {/* "+ New" opens the same dialog Edit does. The system is not a
                choice — it comes from whichever system you are in, the way the
                dashboard's "+ New" carries its panel's tool id — and the server
                validates it against SystemKey before writing. */}
            <CampaignDialog
              mode="create"
              system={system}
              systemLabel={name}
              create={createCampaign}
              className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--sys-hilite)] hover:text-[var(--text)] sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-[11px]"
            />
          </div>

          {campaigns.length === 0 ? (
            <p className="px-4 py-5 text-base text-[var(--muted)] sm:text-sm">
              No {name} campaigns yet. Hit + New to start one — you&apos;ll be its GM, and the join
              code lets your players link their sheets.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {campaigns.map((c) => {
                const links = c.party.length;
                const quiet = c.rolls === 0 && links === 0;
                return (
                  <li
                    key={c.id}
                    className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        {/* Not a link: a campaign has no page of its own. The two
                            things you can open from it are the buttons. */}
                        <span className="truncate text-lg font-semibold sm:text-base">{c.name}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px] font-bold tracking-[0.15em] text-[var(--muted)]">
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
                      {/* The meta line, the way a dashboard row carries "Updated …".
                          It counts the sheets; the line below names them. */}
                      <span className="block text-[13px] text-[var(--muted)] sm:text-[11px]">
                        Created {formatDate(c.createdAt)} · {links} sheet{links === 1 ? "" : "s"} ·{" "}
                        {c.rolls} roll{c.rolls === 1 ? "" : "s"}, last {relative(c.lastRoll)}
                      </span>

                      {/* THE PARTY, on its own line. It was briefly folded into the
                          count above as a bare comma list, which lost the level and
                          the class — and those are the whole point: a GM glancing at
                          this row wants to know the party is third level and has no
                          cleric, not merely that four sheets are attached.
                          Chips rather than prose because the names are a SET, and
                          one run-on sentence of "Brannos LV 3 Fighter, Vel LV 3
                          Thief" is unreadable at this size. Smaller than the chips
                          on the old card: a table row has less room than a card. */}
                      {links > 0 ? (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {c.party.map((m) => (
                            <span
                              key={m.id}
                              className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1.5 py-0.5 text-[11px] text-[var(--text)]"
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

                    {/* WRAPS ON A PHONE, shrink-0 only from sm up. DashboardDocs
                        carries two buttons here and this row carries three, and at
                        390px the third ran clean off the right edge — shrink-0 on
                        a nowrap row means "never give up width", so there was
                        nothing to stop it. Caught by rendering the page at phone
                        width; it is invisible on a desktop. */}
                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:shrink-0">
                      {/* ONE VTT BUTTON, not two. It opens whichever tabletop this
                          campaign actually uses: the built-in one, or the Owlbear
                          room when a URL is set. That is already exactly what a
                          PLAYER gets from the dashboard, so the GM's button agrees
                          with the players' instead of offering both and leaving
                          them to know which one the table is on.

                          Plain <a>: /play is a route handler returning standalone
                          HTML, so <Link> would prefetch a whole document for
                          nothing. The OBR case is external, hence the new tab. */}
                      <a
                        href={c.vttUrl ?? `/play/${c.id}`}
                        {...(c.vttUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        title={
                          c.vttUrl
                            ? "Open this campaign's OBR room in a new tab"
                            : "Open this campaign's VTT"
                        }
                        className={`${ACTION} border-[var(--sys-action)] text-[var(--sys-action)] hover:bg-[var(--panel-2)]`}
                      >
                        {c.vttUrl ? "Open VTT ↗" : "Open VTT"}
                      </a>
                      {/* THE ONLY WAY INTO THE GM SCREEN. It is out of the navbar
                          (see TOOLS_NAV in components/navConfig.ts): a GM Screen
                          is one campaign's party, roll log, board and system data,
                          and a nav link could not say which campaign it meant. */}
                      <OpenGmScreenButton
                        campaign={{ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl }}
                        className={`${ACTION} border-[var(--border)] text-[var(--muted)] hover:border-[var(--sys-hilite)] hover:text-[var(--text)]`}
                      />
                      <CampaignDialog
                        mode="edit"
                        id={c.id}
                        name={c.name}
                        code={c.code}
                        vttUrl={c.vttUrl}
                        rolls={c.rolls}
                        partyNames={c.party.map((m) => m.name)}
                        rename={renameCampaign}
                        setVttUrl={setCampaignVttUrl}
                        remove={deleteCampaign}
                        className={`${ACTION} border-[var(--border)] text-[var(--muted)] hover:border-[var(--sys-hilite)] hover:text-[var(--text)]`}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Campaigns one of your characters is linked to. Same panel, no "+ New"
            and no Edit — the owner manages these, you only play in them. */}
        {joined.length > 0 ? (
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <h3 className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">Joined</h3>
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                View only
              </span>
            </div>
            <ul className="divide-y divide-[var(--border)]">
              {joined.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="truncate text-lg font-semibold sm:text-base">{c.name}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px] font-bold tracking-[0.15em] text-[var(--muted)]">
                          {c.code}
                        </span>
                        <CopyCodeButton value={c.code} label="join code" />
                      </span>
                    </div>
                    {c.chars.length > 0 ? (
                      <span className="block text-[13px] text-[var(--muted)] sm:text-[11px]">
                        Your {c.chars.length === 1 ? "character" : "characters"}: {c.chars.join(", ")}
                      </span>
                    ) : null}
                  </div>
                  <a
                    href={`/play/${c.id}`}
                    className={`${ACTION} border-[var(--sys-action)] text-[var(--sys-action)] hover:bg-[var(--panel-2)]`}
                  >
                    Open VTT
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
