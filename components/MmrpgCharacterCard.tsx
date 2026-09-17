"use client";

import { useRef } from "react";
import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";

const ABIL: [keyof MmrpgCharacter["abilities"], string, string][] = [
  ["melee", "M", "Melee"], ["agility", "A", "Agility"], ["resilience", "R", "Resilience"],
  ["vigilance", "V", "Vigilance"], ["ego", "E", "Ego"], ["logic", "L", "Logic"],
];
const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function MmrpgCharacterCard({ c }: { c: MmrpgCharacter }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const speed = c.speed ?? {};
  const speedKeys = Object.keys(speed);

  return (
    <>
      <button
        type="button"
        onClick={() => dlg.current?.showModal()}
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
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--mmrpg)] opacity-0 transition-opacity group-hover:opacity-100">View full profile →</p>
      </button>

      <dialog
        ref={dlg}
        onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}
        className="m-auto w-[min(92vw,640px)] rounded-lg border border-[var(--mmrpg)] bg-[var(--panel)] p-0 text-[var(--text)] backdrop:bg-black/60"
      >
        <div className="max-h-[86vh] overflow-y-auto p-5">
          <header className="mb-4 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div>
              <h2 className="font-display text-2xl font-black uppercase tracking-wide text-[#f4737a]">{c.name}</h2>
              {c.realName && c.realName !== c.name ? <p className="mt-0.5 text-sm italic text-[var(--muted)]">{c.realName}</p> : null}
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--mmrpg)]">Rank {c.rank}{c.origin ? ` · ${c.origin}` : ""}{c.source ? ` · ${c.source}` : ""}</p>
            </div>
            <button type="button" onClick={() => dlg.current?.close()} aria-label="Close" className="shrink-0 rounded border border-[var(--border)] px-2.5 py-1 text-lg leading-none text-[var(--muted)] hover:border-[var(--mmrpg)] hover:text-[var(--text)]">✕</button>
          </header>

          {(c.occupation || c.teams || c.base) ? (
            <p className="mb-4 text-[12px] leading-relaxed text-[var(--muted)]">
              {c.occupation ? <span><span className="font-semibold text-[var(--text)]">Occupation:</span> {c.occupation}. </span> : null}
              {c.base ? <span><span className="font-semibold text-[var(--text)]">Base:</span> {c.base}. </span> : null}
              {c.teams ? <span><span className="font-semibold text-[var(--text)]">Teams:</span> {c.teams}.</span> : null}
            </p>
          ) : null}

          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Abilities</h3>
          <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {ABIL.map(([k, , full]) => (
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
                    <div className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{g.names.join(" · ")}</div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {c.traits && c.traits.length ? (
              <section>
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Traits</h3>
                <ul className="space-y-1 text-[12px] leading-relaxed text-[var(--muted)]">
                  {c.traits.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </section>
            ) : null}
            {c.tags && c.tags.length ? (
              <section>
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f4737a]">Tags</h3>
                <ul className="space-y-1 text-[12px] leading-relaxed text-[var(--muted)]">
                  {c.tags.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
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
      </dialog>
    </>
  );
}
