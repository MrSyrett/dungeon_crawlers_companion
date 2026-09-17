import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";

// Compact summary card. Clicking it asks the parent (MmrpgCharacterBrowser) to
// open the single shared detail modal — the card no longer owns a <dialog>, so
// the Characters page renders 453 light cards instead of 453 full profiles.

const ABIL: [keyof MmrpgCharacter["abilities"], string][] = [
  ["melee", "M"], ["agility", "A"], ["resilience", "R"],
  ["vigilance", "V"], ["ego", "E"], ["logic", "L"],
];
const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export default function MmrpgCharacterCard({ c, onOpen }: { c: MmrpgCharacter; onOpen: (c: MmrpgCharacter) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(c)}
      className="group w-full rounded border border-[var(--border)] bg-[var(--panel-2)] p-3 text-left transition-colors hover:border-[var(--mmrpg)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f4737a] group-hover:text-[var(--mmrpg)]">{c.name}</h3>
        <span className="flex items-center gap-1">
          {c.source ? <span className="rounded bg-[var(--mmrpg)]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--mmrpg)]">{c.source}</span> : null}
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Rank {c.rank}</span>
        </span>
      </div>
      {c.realName && c.realName !== c.name ? <p className="text-[11px] italic text-[var(--muted)]">{c.realName}</p> : null}
      {c.narrative || String(c.rank).toUpperCase() === "X" || !c.abilities || Object.keys(c.abilities).length === 0 ? (
        <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[#f4737a]">Narrative cosmic being</span> — no stat block; Narrator-only.{c.origin ? ` ${c.origin}.` : ""}</p>
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
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--mmrpg)] opacity-0 transition-opacity group-hover:opacity-100">View full profile →</p>
    </button>
  );
}
