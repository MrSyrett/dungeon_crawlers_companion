import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_MONSTERS } from "@/lib/data/icrpg-monsters";
import type { IcrpgMonster } from "@/lib/data/icrpg-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  IcrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  WORLDS, worldName, one, type Query, type RawQuery,
} from "@/components/IcrpgRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/bestiary";

type Row = IcrpgMonster & { homebrew?: boolean };

function hbToMonster(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const n = (k: string) => (typeof data[k] === "number" ? (data[k] as number) : undefined);
  const list = (k: string) => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []).filter((x): x is string => typeof x === "string");
  const stats: Record<string, number> = {};
  if (data.stats && typeof data.stats === "object") {
    for (const [k, v] of Object.entries(data.stats as Record<string, unknown>)) if (typeof v === "number") stats[k] = v;
  }
  const attacks = list("attacks");
  const abilities = list("abilities");
  return {
    name,
    world: s("world") || "core",
    tier: s("tier") || undefined,
    hearts: n("hearts"),
    hp: n("hp"),
    defense: n("defense"),
    stats: Object.keys(stats).length ? stats : undefined,
    attacks: attacks.length ? attacks : undefined,
    abilities: abilities.length ? abilities : undefined,
    desc: s("desc"),
    homebrew: true,
  };
}

export default async function IcrpgBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "icrpg-monster" }),
    ownHomebrew(user.id, "icrpg-monster"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToMonster(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...ICRPG_MONSTERS.map((c) => ({ ...c }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const world = WORLDS.some((w) => w.key === one(raw.world)) ? one(raw.world) : "";
  const current: Query = { q, world };
  // Every monster is rendered; the World chip and the search filter on the
  // client (InstantFilter). `show` applies the URL's filters for the initial
  // paint, through the same facet match the client uses.
  const results = ALL.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
  const facets = (c: Row) => ({ world: c.world ?? "core" });
  const show = (c: Row) =>
    facetMatch(facets(c), current) &&
    (!needle || [c.name, c.tier ?? "", c.desc ?? "", (c.attacks ?? []).join(" "), (c.abilities ?? []).join(" ")].join(" ").toLowerCase().includes(needle));
  const shown = results.filter(show).length;
  const filtered = Boolean(needle || world);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Bestiary" subtitle={`${ICRPG_MONSTERS.length} monsters${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="icrpg-monster" campaigns={campaigns} initial={hbOwn} /></div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search monsters…" hidden={{ world }} />
      <ChipRow label="World" base={BASE} current={current} param="world" options={WORLDS} active={world} />
      <CountLine count={shown} noun="monster" base={BASE} filtered={filtered} />

      <EmptyState noun="monster" base={BASE} hidden={shown > 0} />
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {results.map((c) => (
          <li key={`${c.homebrew ? "hb" : "bk"}-${c.name}`} className={cardCls} hidden={!show(c)} data-f={facetAttr(facets(c))}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className={nameCls}>{c.name}</h2>
              {c.tier ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{c.tier}</span> : null}
              {c.homebrew ? <span className={hbBadge}>Homebrew</span> : (c.world && c.world !== "core") ? <span className={badge}>{worldName(c.world)}</span> : null}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)]">
              {c.hearts != null ? <span><span className="font-semibold text-[var(--text)]">{c.hearts}</span> ♥</span> : null}
              {c.hp != null ? <span><span className="font-semibold text-[var(--text)]">{c.hp}</span> HP</span> : null}
              {c.defense != null ? <span>DEF <span className="font-semibold text-[var(--text)]">{c.defense >= 0 ? `+${c.defense}` : c.defense}</span></span> : null}
            </div>

            {c.stats && Object.keys(c.stats).length ? (
              <dl className="mt-3 grid grid-cols-3 gap-x-4 gap-y-1 sm:grid-cols-6">
                {Object.entries(c.stats).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{k}</dt>
                    <dd className="font-mono text-[13px] text-[#e8823c]">{v >= 0 ? `+${v}` : v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {c.attacks?.length ? <p className="mt-3 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Attacks:</span> {c.attacks.join(", ")}</p> : null}
            {c.abilities?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Abilities:</span> {c.abilities.join(", ")}</p> : null}
            {c.desc ? <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{c.desc}</p> : null}
          </li>
        ))}
      </ul>
      </InstantFilter>
    </div>
  );
}
