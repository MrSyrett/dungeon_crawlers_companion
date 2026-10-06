import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_CHARACTERS } from "@/lib/data/mmrpg-characters";
import type { MmrpgCharacter } from "@/lib/data/mmrpg-types";
import MmrpgCharacterCard from "@/components/MmrpgCharacterCard";
import MmrpgCharacterDetail from "@/components/MmrpgCharacterDetail";
import {
  MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls,
  one, withParams, type Query, type RawQuery,
} from "@/components/MmrpgRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

// The 453 pre-gen characters, server-rendered like every other system's
// bestiary: one card per character with `?m=<name>` for the full profile. It
// used to be a client <dialog> browser, which shipped the whole 1.6MB dataset
// to the browser to filter it in memory; now the dataset stays on the server
// and InstantFilter filters the rendered cards in place.

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/characters";

const ALL = MMRPG_CHARACTERS as MmrpgCharacter[];
// Ranks 1–6 ascending, with "X" (narrative cosmic beings) sorted last.
const rankOrder = (r: number | string) => (String(r).toUpperCase() === "X" ? 99 : Number(r));
const RANKS = Array.from(new Set(ALL.map((c) => c.rank))).sort((a, b) => rankOrder(a) - rankOrder(b));
const SOURCES = Array.from(new Set(ALL.map((c) => c.source ?? "Core"))).sort((a, b) =>
  a === "Core" ? -1 : b === "Core" ? 1 : a.localeCompare(b),
);
const LIST = ALL.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
const SUBTITLE = `${MMRPG_CHARACTERS.length} pre-generated heroes & villains`;

// The fields `q` searches. InstantFilter matches `data-s` + the card's own text,
// so this same string goes on each card as `data-s`: that is the only way the
// client search can agree with the server's, since the card renders neither
// occupation nor teams and only sometimes renders the real name and origin.
const searchText = (c: MmrpgCharacter) =>
  [c.name, c.realName ?? "", c.occupation ?? "", c.origin ?? "", c.teams ?? "", c.source ?? ""].join(" ");

export default async function MmrpgCharactersPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const rawRank = one(raw.rank);
  const rawSource = one(raw.source);
  const pick = one(raw.m);

  // Validated against the option lists the chips actually offer. InstantFilter
  // drops a value no chip offers, so an unvalidated ?rank=/?source= would make
  // the server and the client disagree on the first paint — the server would
  // hide every card and show "Nothing found", and apply() does not run on mount
  // so it would stay wrong until the reader clicked something.
  const rank = RANKS.map(String).includes(rawRank) ? rawRank : "";
  const source = SOURCES.includes(rawSource) ? rawSource : "";

  const selected = pick ? ALL.find((c) => c.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <MmrpgHeader title="Characters" subtitle={SUBTITLE} />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← All characters</a>
        <MmrpgCharacterDetail c={selected} />
      </div>
    );
  }

  // Every character is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses.
  const current: Query = { q, rank, source };
  const facets = (c: MmrpgCharacter) => ({ rank: String(c.rank), source: c.source ?? "Core" });
  const show = (c: MmrpgCharacter) =>
    facetMatch(facets(c), current) && (!needle || searchText(c).toLowerCase().includes(needle));
  const shown = LIST.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Characters" subtitle={SUBTITLE} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Ready-to-play stat blocks from the core rulebook and its supplements. Each lists the six <b>MARVEL</b> abilities (Melee, Agility, Resilience, Vigilance, Ego, Logic) plus Health, Focus, Karma and rank. Click a character for their full profile — defenses, speed, powers, traits and tags. Drop them straight into a scene as allies or opposition.</p>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search characters, teams, real names…" hidden={{ rank, source }} />
      {SOURCES.length > 1 ? <ChipRow label="Source" base={BASE} current={current} param="source" options={SOURCES.map((s) => ({ key: s, label: s }))} active={source} /> : null}
      <ChipRow label="Rank" base={BASE} current={current} param="rank" options={RANKS.map((r) => ({ key: String(r), label: `Rank ${r}` }))} active={rank} />
      <CountLine count={shown} noun="character" base={BASE} filtered={Boolean(needle || rank || source)} />

      <EmptyState noun="character" base={BASE} hidden={shown > 0} />
      {RANKS.map((r) => (
        <section key={String(r)} className={`${cardCls} mb-4`} data-section hidden={!LIST.some((c) => c.rank === r && show(c))}>
          <SectionH>Rank {r}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {/* The wrapper carries the filter attributes so the card component
                stays a plain presentational <a>. `flex` keeps the card stretched
                to its grid row the way the old <button> grid item was; hiding
                still wins over it because globals.css gives [data-f][hidden]
                display:none !important. */}
            {LIST.filter((c) => c.rank === r).map((c) => (
              <div key={c.id} className="flex" hidden={!show(c)} data-f={facetAttr(facets(c))} data-s={searchText(c)}>
                <MmrpgCharacterCard c={c} href={withParams(BASE, {}, { m: c.name })} />
              </div>
            ))}
          </div>
        </section>
      ))}
      </InstantFilter>
    </div>
  );
}
