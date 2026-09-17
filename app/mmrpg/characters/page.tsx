import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_CHARACTERS } from "@/lib/data/mmrpg-characters";
import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";
import {
  MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls,
  one, type Query, type RawQuery,
} from "@/components/MmrpgRef";
import MmrpgCharacterCard from "@/components/MmrpgCharacterCard";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/characters";

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
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Ready-to-play stat blocks from the core rulebook. Each lists the six <b>MARVEL</b> abilities (Melee, Agility, Resilience, Vigilance, Ego, Logic) plus Health, Focus, Karma and rank. Click a character for their full profile — defenses, speed, powers, traits and tags. Drop them straight into a scene as allies or opposition.</p>

      <SearchForm base={BASE} q={q} placeholder="Search characters, teams, real names…" hidden={{ rank }} />
      <ChipRow label="Rank" base={BASE} current={current} param="rank" options={rankOpts} active={rank} />
      <CountLine count={results.length} noun="character" base={BASE} filtered={Boolean(needle || rank)} />

      {results.length === 0 ? <EmptyState noun="character" base={BASE} /> : null}
      {groups.map((r) => (
        <section key={r} className={`${cardCls} mb-4`}>
          <SectionH>Rank {r}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {results.filter((c) => c.rank === r).map((c) => (
              <MmrpgCharacterCard key={c.id} c={c} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
