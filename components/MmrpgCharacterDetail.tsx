import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";
import MmrpgRefTokens from "@/components/MmrpgRefTokens";

// Full-profile body shown inside the shared Characters modal. Presentational
// only — the <dialog> element and open/close state live in MmrpgCharacterBrowser,
// so the page renders ONE dialog rather than one per character.

const ABIL: [keyof MmrpgCharacter["abilities"], string][] = [
  ["melee", "Melee"], ["agility", "Agility"], ["resilience", "Resilience"],
  ["vigilance", "Vigilance"], ["ego", "Ego"], ["logic", "Logic"],
];
const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function MmrpgCharacterDetail({ c, onClose }: { c: MmrpgCharacter; onClose: () => void }) {
  const speed = c.speed ?? {};
  const speedKeys = Object.keys(speed);
  return (
    <div className="max-h-[86vh] overflow-y-auto p-5">
      <header className="mb-4 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <h2 className="font-display text-2xl font-black uppercase tracking-wide text-[#f4737a]">{c.name}</h2>
          {c.realName && c.realName !== c.name ? <p className="mt-0.5 text-sm italic text-[var(--muted)]">{c.realName}</p> : null}
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--mmrpg)]">Rank {c.rank}{c.origin ? <> · <MmrpgRefTokens text={c.origin} kind="origin" /></> : null}{c.source ? ` · ${c.source}` : ""}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 rounded border border-[var(--border)] px-2.5 py-1 text-lg leading-none text-[var(--muted)] hover:border-[var(--mmrpg)] hover:text-[var(--text)]">✕</button>
      </header>

      {(c.occupation || c.teams || c.base) ? (
        <p className="mb-4 text-[12px] leading-relaxed text-[var(--muted)]">
          {c.occupation ? <span><span className="font-semibold text-[var(--text)]">Occupation:</span> <MmrpgRefTokens text={c.occupation} kind="occupation" />. </span> : null}
          {c.base ? <span><span className="font-semibold text-[var(--text)]">Base:</span> {c.base}. </span> : null}
          {c.teams ? <span><span className="font-semibold text-[var(--text)]">Teams:</span> {c.teams}.</span> : null}
        </p>
      ) : null}

      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Abilities</h3>
      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {ABIL.map(([k, full]) => (
          <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-2 text-center">
            <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">{full}</div>
            <div className="text-lg font-black text-[var(--text)]">{sign(c.abilities[k])}</div>
            <div className="text-[9px] text-[var(--muted)]">def {10 + c.abilities[k]}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {[["Health", c.health], ["Focus", c.focus], ["Karma", c.karma ?? "—"]].map(([lbl, val]) => (
          <span key={lbl} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-1 text-[12px]"><span className="font-semibold text-[#f4737a]">{lbl}</span> {val}</span>
        ))}
        {speedKeys.length ? (
          <span className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-1 text-[12px]">
            <span className="font-semibold text-[#f4737a]">Speed</span> {speedKeys.map((k) => `${cap(k)} ${speed[k]}`).join(" · ")}
          </span>
        ) : null}
      </div>

      {c.powers && c.powers.length ? (
        <section className="mb-4">
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Powers</h3>
          <div className="space-y-2">
            {c.powers.map((g, i) => (
              <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-2.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{g.set || "Basic"}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-[var(--text)]"><MmrpgRefTokens items={g.names} kind="power" sep=" · " /></div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {c.traits && c.traits.length ? (
          <section>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Traits</h3>
            <p className="text-[12px] leading-relaxed text-[var(--muted)]"><MmrpgRefTokens items={c.traits} kind="trait" /></p>
          </section>
        ) : null}
        {c.tags && c.tags.length ? (
          <section>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Tags</h3>
            <p className="text-[12px] leading-relaxed text-[var(--muted)]"><MmrpgRefTokens items={c.tags} kind="tag" /></p>
          </section>
        ) : null}
      </div>

      {c.features ? (
        <p className="mt-4 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Distinguishing features:</span> {c.features}</p>
      ) : null}
      {c.history ? (
        <section className="mt-4">
          <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">History</h3>
          <p className="text-[12px] leading-relaxed text-[var(--muted)]">{c.history}</p>
        </section>
      ) : null}
      {c.personality ? (
        <section className="mt-4">
          <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Personality</h3>
          <p className="text-[12px] leading-relaxed text-[var(--muted)]">{c.personality}</p>
        </section>
      ) : null}
    </div>
  );
}
