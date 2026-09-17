import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_CHARACTERS } from "@/lib/data/mmrpg-characters";
import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";
import {
  MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge,
  one, type Query, type RawQuery,
} from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/characters";
const ABIL: [keyof MmrpgCharacter["abilities"], string][] = [
  ["melee", "M"], ["agility", "A"], ["resilience", "R"], ["vigilance", "V"], ["ego", "E"], ["logic", "L"],
];

export default async function MmrpgCharactersPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ALL = MMRPG_CHARACTERS as MmrpgCharacter[];
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const ranks = Array.from(new Set(ALL.map((c) => c.rank))).sort((a, b) => a - b);
  const rankOpts = ranks.map((r) => ({ key: String(r), label: `Rank ${r}` }));
  const rank = ranks.map(String).includes(one(raw.rank)) ? one(raw.rank) : "";
  const current: Query = { q, rank };

  const results = ALL.filter((c) =>
    (!rank || String(c.rank) === rank) &&
    (!needle || [c.name, c.realName ?? "", c.occupation ?? "", c.origin ?? "", c.teams ?? ""].join(" ").toLowerCase().includes(needle)),
  ).sort((a, b) => a.name.localeCompare(b.name, "en"));

  const groups = ranks.filter((r) => results.some((c) => c.rank === r));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Characters" subtitle={`${ALL.length} pre-generated heroes & villains`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Ready-to-play stat blocks from the core rulebook. Each lists the six <b>MARVEL</b> abilities (Melee, Agility, Resilience, Vigilance, Ego, Logic) plus Health, Focus, Karma and rank. Drop them straight into a scene as allies or opposition.</p>

      <SearchForm base={BASE} q={q} placeholder="Search characters, teams, real names…" hidden={{ rank }} />
      <ChipRow label="Rank" base={BASE} current={current} param="rank" options={rankOpts} active={rank} />
      <CountLine count={results.length} noun="character" base={BASE} filtered={Boolean(needle || rank)} />

      {results.length === 0 ? <EmptyState noun="character" base={BASE} /> : null}
      {groups.map((r) => (
        <section key={r} className={`${cardCls} mb-4`}>
          <SectionH>Rank {r}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {results.filter((c) => c.rank === r).map((c) => (
              <article key={c.id} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className={nameCls}>{c.name}</h3>
                  <span className={badge}>Rank {c.rank}</span>
                </div>
                {c.realName && c.realName !== c.name ? <p className="text-[11px] italic text-[var(--muted)]">{c.realName}</p> : null}
                <div className="mt-2 grid grid-cols-6 gap-1 text-center">
                  {ABIL.map(([k, lbl]) => (
                    <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel)] py-1">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">{lbl}</div>
                      <div className="text-sm font-bold text-[var(--text)]">{c.abilities[k] > 0 ? `+${c.abilities[k]}` : c.abilities[k]}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                  <span><span className="font-semibold text-[var(--text)]">Health</span> {c.health}</span>
                  <span><span className="font-semibold text-[var(--text)]">Focus</span> {c.focus}</span>
                  <span><span className="font-semibold text-[var(--text)]">Karma</span> {c.karma ?? "—"}</span>
                </p>
                {c.occupation || c.origin ? (
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--muted)]">
                    {c.origin ? <span><span className="font-semibold text-[var(--text)]">Origin:</span> {c.origin} </span> : null}
                    {c.occupation ? <span><span className="font-semibold text-[var(--text)]">Occupation:</span> {c.occupation}</span> : null}
                  </p>
                ) : null}
                {c.teams ? <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Teams:</span> {c.teams}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
