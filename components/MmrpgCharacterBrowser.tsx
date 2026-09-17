"use client";

import { useMemo, useRef, useState } from "react";
import { MMRPG_CHARACTERS } from "@/lib/data/mmrpg-characters";
import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";
import MmrpgCharacterCard from "@/components/MmrpgCharacterCard";
import MmrpgCharacterDetail from "@/components/MmrpgCharacterDetail";

// Client-side browser for the 453 pre-gen characters. Filters in memory (no
// navigation, no server round-trip) and renders one shared <dialog> instead of
// one per card. The data is imported directly here so it ships as a cached JS
// chunk rather than being re-serialized into the page on every filter change.

const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--mmrpg)] hover:text-[var(--text)]";
const chipOn = "border-[var(--mmrpg)] bg-[var(--panel-2)] text-[#f4737a]";
const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";

const ALL = MMRPG_CHARACTERS as MmrpgCharacter[];
// Ranks 1–6 ascending, with "X" (narrative cosmic beings) sorted last.
const rankOrder = (r: number | string) => (String(r).toUpperCase() === "X" ? 99 : Number(r));
const RANKS = Array.from(new Set(ALL.map((c) => c.rank))).sort((a, b) => rankOrder(a) - rankOrder(b));
const SOURCES = Array.from(new Set(ALL.map((c) => c.source ?? "Core"))).sort((a, b) =>
  a === "Core" ? -1 : b === "Core" ? 1 : a.localeCompare(b),
);

function Chips({ label, options, active, onPick }: { label: string; options: { key: string; label: string }[]; active: string; onPick: (k: string) => void }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
      <button type="button" onClick={() => onPick("")} className={`${chipBase} ${active ? chipOff : chipOn}`}>All</button>
      {options.map((o) => (
        <button key={o.key} type="button" onClick={() => onPick(o.key)} className={`${chipBase} ${active === o.key ? chipOn : chipOff}`}>{o.label}</button>
      ))}
    </div>
  );
}

export default function MmrpgCharacterBrowser() {
  const [q, setQ] = useState("");
  const [rank, setRank] = useState("");
  const [source, setSource] = useState("");
  const [sel, setSel] = useState<MmrpgCharacter | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  const open = (c: MmrpgCharacter) => { setSel(c); dlg.current?.showModal(); };
  const close = () => dlg.current?.close();

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL.filter((c) =>
      (!rank || String(c.rank) === rank) &&
      (!source || (c.source ?? "Core") === source) &&
      (!needle || [c.name, c.realName ?? "", c.occupation ?? "", c.origin ?? "", c.teams ?? "", c.source ?? ""].join(" ").toLowerCase().includes(needle)),
    ).sort((a, b) => a.name.localeCompare(b.name, "en"));
  }, [q, rank, source]);

  const groups = RANKS.filter((r) => results.some((c) => c.rank === r));
  const filtered = Boolean(q.trim() || rank || source);

  return (
    <>
      <div className="mb-4 flex gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search characters, teams, real names…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--mmrpg)]"
        />
      </div>
      {SOURCES.length > 1 ? <Chips label="Source" options={SOURCES.map((s) => ({ key: s, label: s }))} active={source} onPick={setSource} /> : null}
      <Chips label="Rank" options={RANKS.map((r) => ({ key: String(r), label: `Rank ${r}` }))} active={rank} onPick={setRank} />

      <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>{results.length} {results.length === 1 ? "character" : "characters"}</span>
        {filtered ? <button type="button" onClick={() => { setQ(""); setRank(""); setSource(""); }} className="text-[var(--mmrpg)] hover:underline">Clear filters</button> : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No character matches those filters. Try a broader search or <button type="button" onClick={() => { setQ(""); setRank(""); setSource(""); }} className="text-[var(--mmrpg)] underline">clear them</button>.</p>
        </div>
      ) : null}

      {groups.map((r) => (
        <section key={r} className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f4737a]">Rank {r}</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {results.filter((c) => c.rank === r).map((c) => (
              <MmrpgCharacterCard key={c.id} c={c} onOpen={open} />
            ))}
          </div>
        </section>
      ))}

      <dialog
        ref={dlg}
        onClick={(e) => { if (e.target === dlg.current) close(); }}
        onClose={() => setSel(null)}
        className="m-auto w-[min(92vw,640px)] rounded-lg border border-[var(--mmrpg)] bg-[var(--panel)] p-0 text-[var(--text)] backdrop:bg-black/60"
      >
        {sel ? <MmrpgCharacterDetail c={sel} onClose={close} /> : null}
      </dialog>
    </>
  );
}
