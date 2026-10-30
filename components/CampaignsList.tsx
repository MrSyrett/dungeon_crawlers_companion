"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  SYSTEMS,
  subscribeSystem,
  getSystemSnapshot,
  serverSystem,
  systemName,
  type SystemKey,
} from "./systemStore";
import { createCampaign } from "@/app/actions/campaigns";
import CampaignDialog from "./CampaignDialog";
import CampaignCard from "./CampaignCard";
import type { CampCardData } from "@/lib/rosters";

// The Campaigns body: shows ONE system's campaigns at a time, driven by the same
// shared system store the top navbar writes — exactly how DashboardDocs shows one
// system's Characters/Adventures. The server ships every system's campaign cards
// once, so switching system is instant and never re-queries.
//
// THE CARDS ARE MY CAMPAIGNS' CARDS (components/CampaignCard.tsx). This page and
// My Campaigns used to be built separately and said different things about the
// same campaign — a player saw the rest of the party on one and only their own
// character on the other. Now there is one card, and this page only adds the
// panel around it: "Campaigns" with + New (the ones you run), then "Playing in".
//
// A campaign's system is set once, at creation, from whichever system you are in
// and is never editable afterwards.

export type CampaignsBySystem = Partial<Record<SystemKey, { owned: CampCardData[]; joined: CampCardData[] }>>;

export default function CampaignsList({
  bySystem,
  hiddenKeys = [],
  initialSystem,
}: {
  initialSystem?: SystemKey;
  bySystem: CampaignsBySystem;
  hiddenKeys?: SystemKey[];
}) {
  const storedSystem = useSyncExternalStore(subscribeSystem, getSystemSnapshot, serverSystem(initialSystem));

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

  // A Character card's "Campaign" button lands here as /campaigns#camp-<id>.
  // That is a client-side navigation, so the browser never applies :target or
  // scrolls to it — do both here: bring the card into view and ring it.
  useEffect(() => {
    const id = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!/^camp-[\w-]+$/.test(id)) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    el.classList.add("roster-hit");
    const t = window.setTimeout(() => el.classList.remove("roster-hit"), 2600);
    return () => window.clearTimeout(t);
  }, [system]);

  return (
    <div className="home-roster mx-auto w-full max-w-3xl px-4 py-8 sm:px-5">
      {/* key={system}: remounting on a system switch replays the fade-in, so
          changing systems reads as "switching worlds" rather than rows swapping
          in place. */}
      <div key={system} className="dcc-fade-in">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            {/* data-dash-head: the hook a system's theme uses to letter this word
                in its own display face (see globals.css). */}
            <h3 data-dash-head className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">
              Campaigns
            </h3>
            {/* "+ New" opens the same dialog Edit does. The system is not a
                choice — it comes from whichever system you are in. */}
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
              {`No ${name} campaigns yet.`} Hit + New to start one — you&apos;ll be its GM, with an invite
              link to send your players. Playing in someone else&apos;s game? Ask your GM for their
              invite link, or use Link campaign on your character.
            </p>
          ) : (
            <div className="roster-panel-cards" data-sys={system}>
              <ul className="roster-cards">
                {campaigns.map((c) => (
                  <li key={c.id} className="min-w-0">
                    <CampaignCard c={c} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Campaigns one of your characters is linked to — someone else is the GM. */}
        {joined.length > 0 ? (
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <h3 data-dash-head className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">
                Playing in
              </h3>
            </div>
            <div className="roster-panel-cards" data-sys={system}>
              <ul className="roster-cards">
                {joined.map((c) => (
                  <li key={c.id} className="min-w-0">
                    <CampaignCard c={c} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
