import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";

// Compact summary card. A plain link to the character's server-rendered profile
// (`?m=<name>`), so the Characters page renders 453 light cards and no dialog —
// and ships none of the dataset to the browser.

const ABIL: [keyof MmrpgCharacter["abilities"], string][] = [
  ["melee", "M"], ["agility", "A"], ["resilience", "R"],
  ["vigilance", "V"], ["ego", "E"], ["logic", "L"],
];
const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export default function MmrpgCharacterCard({ c, href }: { c: MmrpgCharacter; href: string }) {
  return (
    <a
      href={href}
      className="group block w-full rounded border border-[var(--border)] bg-[var(--panel-2)] p-3 text-left transition-colors hover:border-[var(--sys-hilite)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        {/* A character's NAME is red, like every entry name on the Marvel
            compendium (see nameCls in MmrpgRef) — the blue belongs to links and
            to the inline reference tokens, not to titles. It is --mmrpg-ink, the
            lifted red, not the brand --mmrpg, which is 3.2:1 at this size.
            It brightens to --text on hover; it used to go the other way and turn
            red on hover, which inverted the hierarchy and landed on that 3.2:1
            exactly when the pointer was on it. The card edge takes --sys-hilite,
            the same hover token the dashboard rows use. */}
        <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--mmrpg-ink)] group-hover:text-[var(--text)]">{c.name}</h3>
        <span className="flex items-center gap-1">
          {c.source ? <span className="rounded bg-[var(--mmrpg)]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--mmrpg)]">{c.source}</span> : null}
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Rank {c.rank}</span>
        </span>
      </div>
      {c.realName && c.realName !== c.name ? <p className="text-[11px] italic text-[var(--muted)]">{c.realName}</p> : null}
      {c.narrative || String(c.rank).toUpperCase() === "X" || !c.abilities || Object.keys(c.abilities).length === 0 ? (
        <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--sys-link)]">Narrative cosmic being</span> — no stat block; Narrator-only.{c.origin ? ` ${c.origin}.` : ""}</p>
      ) : (
        <>
          <div className="mt-2 grid grid-cols-6 gap-1 text-center">
            {ABIL.map(([k, lbl]) => (
              <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel)] py-1">
                <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">{lbl}</div>
                <div className="text-sm font-bold text-[var(--text)]">{sign(c.abilities[k])}</div>
              </div>
            ))}
          </div>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
            <span><span className="font-semibold text-[var(--text)]">Health</span> {c.health}</span>
            <span><span className="font-semibold text-[var(--text)]">Focus</span> {c.focus}</span>
            <span><span className="font-semibold text-[var(--text)]">Karma</span> {c.karma ?? "—"}</span>
          </p>
        </>
      )}
      {/* The hover affordance, so it takes --sys-hilite like the card edge above.
          Left on the brand red it would be the one red thing on a card whose
          border has gone blue and whose title has gone white. */}
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--sys-hilite)] opacity-0 transition-opacity group-hover:opacity-100">View full profile →</p>
    </a>
  );
}
