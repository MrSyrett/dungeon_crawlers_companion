"use client";

import { type SystemKey } from "./systemStore";

// One campaign the viewer PLAYS in — they have a character sheet linked to it.
// `party` is the other characters' names (sheet titles, which the save route
// keeps in step with the character name); `sheet` is the viewer's own sheet in
// this campaign, for the Open button; `vttHref`/`vttKind` is where it plays,
// exactly as the Characters list computes it.
export type PlayerCampaign = {
  id: string;
  name: string;
  system: SystemKey;
  party: string[];
  sheet: { tool: string; id: string } | null;
  vttHref: string | null;
  vttKind: "owlbear" | "tabletop" | null;
};

// "My campaigns" — the player-facing counterpart to the GM's Campaigns page.
// The dashboard already lists your sheets; this says which games they're in and
// who else is at the table, with one tap to your sheet or the VTT. Shown only
// for the system the dashboard is currently showing (it is a per-system page),
// and it renders nothing at all when you're not in any — no empty card.
export default function MyCampaigns({
  campaigns,
  system,
}: {
  campaigns: PlayerCampaign[];
  system: SystemKey;
}) {
  const mine = campaigns.filter((c) => c.system === system);
  if (mine.length === 0) return null;

  return (
    <section className="mb-5">
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
        My campaigns
      </h2>
      <ul className="flex flex-col gap-2">
        {mine.map((c) => (
          <li key={c.id} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="min-w-0 truncate text-base font-bold uppercase tracking-[0.12em]">
                {c.name}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                {c.sheet ? (
                  // Plain <a>, NOT next/link — /tools/… is a route handler that
                  // builds a whole standalone sheet; Link would prefetch it.
                  <a
                    href={`/tools/${c.sheet.tool}/${c.sheet.id}`}
                    className="min-h-11 rounded border border-[var(--border)] px-3 py-2 text-[12px] uppercase tracking-[0.1em] transition-colors hover:border-[var(--sys-hilite)] hover:text-[var(--sys-hilite)] sm:min-h-0 sm:py-1.5"
                  >
                    Open sheet
                  </a>
                ) : null}
                {c.vttHref ? (
                  <a
                    href={c.vttHref}
                    {...(c.vttKind === "owlbear"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    title={
                      c.vttKind === "owlbear"
                        ? "Open this campaign's OBR room in a new tab"
                        : "Open this campaign's VTT"
                    }
                    className="min-h-11 rounded border border-[var(--sys-action)] px-3 py-2 text-[12px] uppercase tracking-[0.1em] text-[var(--sys-action)] transition-colors hover:bg-[var(--sys-action)] hover:text-[var(--on-accent)] sm:min-h-0 sm:py-1.5"
                  >
                    {c.vttKind === "owlbear" ? "VTT ↗" : "VTT"}
                  </a>
                ) : null}
              </span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
              {c.party.length
                ? `Party: ${c.party.join(", ")}`
                : "No one else has linked a character yet."}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
